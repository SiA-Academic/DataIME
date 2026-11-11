"""Compile annual faculty production from the local SIADoce inputs.

This is a local estimate using journal metrics, not a final CAPES classification.
The journal JSON snapshot is an exported copy of the primary Google Sheets catalogue.
This generator reads that local copy; it does not synchronize with Google Drive.
The reader accepts only the narrow frontmatter written by gerar-publicacoes-lattes.ps1.
It deliberately fails on unfamiliar structures instead of guessing YAML semantics.
"""
import argparse
import collections
from datetime import date
import hashlib
import json
import math
from pathlib import Path
import re
import sys
import unicodedata

from validar_catalogo_periodicos import load_catalog_snapshot, validate_snapshot
from classificar_eventos import read_event_catalog, classify_event

WEIGHTS = {"A1": 1, "A2": .875, "A3": .75, "A4": .625}
BANDS = tuple(f"A{i}" for i in range(1, 9))
ACTIVE = {"pleno", "especifico", "vencido_com_orientando"}
FICHA_URL = (
    "https://www.gov.br/capes/pt-br/acesso-a-informacao/acoes-e-programas/"
    "avaliacao/sobre-a-avaliacao/areas-avaliacao/sobre-as-areas-de-avaliacao/"
    "colegio-de-ciencias-exatas-tecnologicas-e-multidisciplinar/"
    "ciencias-exatas-e-da-terra/COMPUTACAO_FICHA_2025_2028.pdf/@@display-file/file"
)


def normalize(value):
    value = unicodedata.normalize("NFKD", str(value or "")).casefold()
    value = "".join(c for c in value if not unicodedata.combining(c))
    value = value.replace("&", " and ")
    return re.sub(r"[^a-z0-9]+", " ", value).strip()


def issn(value):
    candidate = re.sub(r"[^0-9Xx]", "", str(value or "")).upper()
    return candidate if len(candidate) == 8 else ""


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def scalar(value, path, number):
    value = value.strip()
    if value == "":
        return None
    try:
        return json.loads(value)
    except json.JSONDecodeError:
        if re.fullmatch(r"[a-zA-Z_][a-zA-Z0-9_-]*", value):
            return value
        raise ValueError(f"{path}:{number}: valor de frontmatter inesperado")


def read_publications(path):
    text = path.read_text(encoding="utf-8-sig")
    if not text.startswith("---\n"):
        raise ValueError(f"Frontmatter ausente: {path}")
    front = text.split("---", 2)[1]
    top, records, current, item = {}, [], None, None
    in_records = False
    empty_unassigned_section = False
    for number, line in enumerate(front.splitlines(), 2):
        if not line.strip():
            continue
        if line == "publicacoes_por_docente:":
            in_records = True
            continue
        if line == "publicacoes_sem_docente:":
            empty_unassigned_section = True
            continue
        if empty_unassigned_section:
            if line.strip() != "[]":
                raise ValueError(f"{path}:{number}: publicações sem docente exigem revisão.")
            continue
        if not in_records:
            if not line.startswith(" "):
                key, sep, value = line.partition(":")
                if not sep:
                    raise ValueError(f"{path}:{number}: chave inválida")
                top[key] = scalar(value, path, number)
            # Nested build keys are irrelevant to the data and are not interpreted.
            continue
        match = re.fullmatch(r"  - docente_id: (.+)", line)
        if match:
            current = {"docente_id": scalar(match.group(1), path, number),
                       "publicacoes": []}
            records.append(current)
            item = None
            continue
        match = re.fullmatch(r"      - ano: (\d{4})", line)
        if match and current is not None:
            item = {"ano": int(match.group(1))}
            current["publicacoes"].append(item)
            continue
        match = re.fullmatch(r"    ([a-z_]+):(.*)", line)
        if match and current is not None:
            key, value = match.groups()
            if key == "publicacoes":
                if value.strip() not in ("", "[]"):
                    raise ValueError(f"{path}:{number}: lista inesperada")
            else:
                current[key] = scalar(value, path, number)
            continue
        match = re.fullmatch(r"        ([a-z_]+):(.*)", line)
        if match and item is not None:
            item[match.group(1)] = scalar(match.group(2), path, number)
            continue
        raise ValueError(f"{path}:{number}: estrutura de frontmatter inesperada")
    if top.get("gerado_por") != "scripts/gerar-publicacoes-lattes.ps1":
        raise ValueError(f"Fonte não reconhecida: {path}")
    index = {}
    for row in records:
        if row["docente_id"] in index:
            raise ValueError(f"Docente duplicado: {row['docente_id']}")
        if row.get("total") != len(row["publicacoes"]):
            raise ValueError(f"Total de publicações inconsistente: {row['docente_id']}")
        index[row["docente_id"]] = row
    return top, index


def number(value):
    if value is None or value == "":
        return None
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise ValueError(f"Percentil não numérico: {value!r}")
    if not math.isfinite(value) or not 0 <= value <= 100:
        raise ValueError(f"Percentil fora do intervalo: {value}")
    return value


def band(value):
    if value is None:
        return None
    for threshold, label in [(87.5, "A1"), (75, "A2"), (62.5, "A3"),
                             (50, "A4"), (37.5, "A5"), (25, "A6"), (12.5, "A7")]:
        if value >= threshold:
            return label
    return "A8"


def read_catalog(path):
    snapshot = load_catalog_snapshot(path)
    validation = validate_snapshot(snapshot)
    if validation["ano_metrica"] != 2025:
        raise ValueError("Esta integração usa métricas de 2025. Revise a configuração e os textos antes de importar outro ano.")
    rows = iter(snapshot["sheets"]["Consulta"])
    header = list(next(rows))
    if len(header) != 11 or header[0] != "Periódico" or header[10] != "Scopus Source ID":
        raise ValueError("Estrutura inesperada da aba Consulta; integração requer revisão.")
    catalog = []
    for source in rows:
        if not source[0]:
            continue
        title, expected_band, pct, base, scopus, jcr, print_issn, electronic, _, availability, sid = source
        scopus, jcr, pct = number(scopus), number(jcr), number(pct)
        available = [x for x in (scopus, jcr) if x is not None]
        if pct != (max(available) if available else None):
            raise ValueError(f"Máximo inconsistente na planilha: {title}")
        computed = band(pct)
        if expected_band != (computed or "Sem percentil"):
            raise ValueError(f"Faixa inconsistente na planilha: {title}")
        catalog.append({
            "titulo_catalogo": title, "faixa": computed, "percentil": pct,
            "base": base or None, "scopus": scopus, "jcr": jcr,
            "source_id": str(sid), "issn": print_issn or None,
            "eissn": electronic or None, "disponibilidade": availability,
        })
    if len({r["source_id"] for r in catalog}) != len(catalog):
        raise ValueError("Source IDs duplicados na planilha.")
    titles, identifiers = collections.defaultdict(list), collections.defaultdict(list)
    for row in catalog:
        titles[normalize(row["titulo_catalogo"])].append(row)
        for value in {issn(row["issn"]), issn(row["eissn"])} - {""}:
            identifiers[value].append(row)
    return catalog, titles, identifiers


def read_aliases(path, catalog):
    entries = json.loads(path.read_text(encoding="utf-8-sig"))["aliases"]
    by_id = {r["source_id"]: r for r in catalog}
    aliases = {}
    for entry in entries:
        key = normalize(entry["alias"])
        if not key or key in aliases:
            raise ValueError("Alias de periódico vazio ou duplicado.")
        destination = by_id.get(entry["source_id"])
        if destination is None:
            raise ValueError(f"Alias com destino ausente: {entry['alias']}")
        if normalize(destination["titulo_catalogo"]) != normalize(entry["titulo_catalogo_esperado"]):
            raise ValueError(f"Título do destino do alias mudou: {entry['alias']}")
        expected = {issn(value) for value in entry["issns_esperados"]}
        actual = {issn(destination["issn"]), issn(destination["eissn"])}
        if not expected or not expected.issubset(actual) or not entry.get("fontes"):
            raise ValueError(f"Identificadores/fontes do alias inconsistentes: {entry['alias']}")
        aliases[key] = {"registro": destination, "evidencia": entry}
    return aliases


def publication_key(publication):
    """Literal bibliographic key: never infer a verified article from a near title."""
    return (publication.get("titulo"), publication.get("ano"),
            publication.get("veiculo", publication.get("veiculo_original")))


def read_verified_publications(path, catalog):
    data = json.loads(path.read_text(encoding="utf-8-sig"))
    by_id = {r["source_id"]: r for r in catalog}
    verified, homonyms = {}, {}
    for entry in data.get("titulos_com_homonimos", []):
        key = normalize(entry["titulo"])
        if not key or key in homonyms or not entry.get("fontes") or not entry.get("motivo"):
            raise ValueError("Regra de título homônimo inválida ou duplicada.")
        homonyms[key] = entry
    for entry in data.get("publicacoes", []):
        key = publication_key(entry)
        if (not key[0] or not key[2] or isinstance(key[1], bool)
                or not isinstance(key[1], int) or key in verified):
            raise ValueError("Chave de publicação verificada inválida ou duplicada.")
        if (entry.get("corrigir_tipo_origem") not in (None, "anais_congressos")
                or entry.get("tipo_trabalho") not in (None, "noticia", "artigo_completo", "correcao_editorial")):
            raise ValueError(f"Correção individual de tipo inválida: {key[0]}")
        destination = by_id.get(entry["source_id"])
        expected = {issn(value) for value in entry["issns_esperados"]}
        if (destination is None
                or destination["titulo_catalogo"] != entry["titulo_catalogo_esperado"]
                or not expected or "" in expected
                or not expected.issubset({issn(destination["issn"]), issn(destination["eissn"])})
                or not re.fullmatch(r"10\.\d{4,9}/\S+", entry.get("doi", ""))
                or not entry.get("fontes") or not entry.get("verificado_em")
                or not entry.get("nota")):
            raise ValueError(f"Evidência/destino de publicação verificada inconsistente: {key[0]}")
        verified[key] = {"registro": destination, "evidencia": entry}
    return verified, homonyms


def without_support_qualifier(vehicle):
    return re.sub(r"\s*\((?:online|on-line|print|impresso|electronic|eletronico|eletrônico|dordrecht\.\s*online)\)\s*$",
                  "", str(vehicle or ""), flags=re.I)


def resolve_title(vehicle, titles, aliases):
    """Use the same conservative title resolution for matches and ISSN conflicts."""
    key = normalize(vehicle)
    candidates = titles.get(key, [])
    method, evidence = "titulo_normalizado", None
    if not candidates:
        cleaned = without_support_qualifier(vehicle)
        if cleaned != vehicle:
            candidates = titles.get(normalize(cleaned), [])
            method = "titulo_sem_qualificador_suporte"
    if not candidates and key in (aliases or {}):
        entry = aliases[key]
        candidates, evidence = [entry["registro"]], entry["evidencia"]
        method = "alias_validado"
    return candidates, method, evidence


def classify(publication, titles, identifiers, aliases=None,
             verified_publications=None, homonymous_titles=None, event_catalog=None):
    result = {k: publication.get(k) for k in ("titulo", "veiculo", "ano", "tipo", "referencia")}
    result.update({k: None for k in ("faixa", "percentil", "base", "scopus", "jcr",
                                     "source_id", "issn", "eissn", "match_method", "pontos")})
    result["fora_formula"] = False
    reference = str(result["referencia"] or "")
    event_proof = (event_catalog.publicacoes_verificadas.get(publication_key(publication))
                   if event_catalog is not None else None)
    if publication.get("tipo") == "periodico" and event_proof and event_proof["corrigir_tipo_origem"]:
        corrected = classify_event(publication, event_catalog)
        corrected.update(tipo_origem="periodico",
                         correcao_tipo_nota=event_proof["nota"])
        return corrected
    if re.search(r"apresenta[çc][aã]o\s+de\s+trabalho", reference, re.I):
        result.update(tipo="apresentacao", status="nao_pontuado",
                      motivo="Apresentação de trabalho; não tratada como artigo completo.")
        return result
    verification = (verified_publications or {}).get(publication_key(publication))
    if verification:
        evidence = verification["evidencia"]
        if evidence.get("tipo_trabalho") == "noticia":
            result.update(
                tipo="noticia", tipo_origem=publication.get("tipo"),
                tipo_trabalho="noticia", status="nao_pontuado", fora_formula=True,
                match_method="publicacao_verificada",
                motivo="Notícia identificada na fonte editorial; fora da contagem de artigos completos.",
                identificacao_fontes=evidence["fontes"],
                identificacao_verificado_em=evidence["verificado_em"],
                identificacao_nota=evidence["nota"], identificacao_doi=evidence["doi"],
            )
            return result
        if (publication.get("tipo") == "anais_congressos"
                and evidence.get("corrigir_tipo_origem") == "anais_congressos"):
            publication = {**publication, "tipo": "periodico"}
            result.update(tipo="periodico", tipo_origem="anais_congressos",
                          correcao_tipo_nota=evidence["nota"])
    if publication.get("tipo") != "periodico":
        if event_catalog is not None:
            return classify_event(publication, event_catalog)
        result.update(tipo="anais_congressos", status="pendente_evento",
                      motivo="Catálogo de eventos não fornecido; classificação pendente.")
        return result
    title_candidates, title_method, title_evidence = resolve_title(
        publication.get("veiculo"), titles, aliases)
    homonym = (homonymous_titles or {}).get(
        normalize(without_support_qualifier(publication.get("veiculo"))))
    # A homonymous bare name cannot contradict a precise identifier or identify
    # an article merely because one journal has the shorter catalogue title.
    reliable_title_candidates = [] if homonym else title_candidates
    candidates, method, alias_evidence = [], None, None
    explicit_ids, malformed_ids = set(), []
    for key in ("issn", "eissn"):
        value = publication.get(key)
        if value is None or (isinstance(value, str) and not value.strip()):
            continue
        if not isinstance(value, str) or not re.fullmatch(r"\s*\d{4}[- ]?\d{3}[\dXx]\s*", value):
            malformed_ids.append(str(value))
        else:
            explicit_ids.add(issn(value))
    for value in re.findall(r"\b(?:[ep][- ]?)?ISSN\s*[:=]?\s*(\d{4}[- ]?\d{3}[\dXx])\b", reference, re.I):
        explicit_ids.add(issn(value))
    if malformed_ids:
        result.update(
            status="conflito_identificacao", match_method="issn_explicito",
            motivo="ISSN/eISSN explícito malformado; correspondência por título não aplicada.",
            issns_invalidos=malformed_ids,
        )
        return result
    unknown_ids = []
    for identifier in explicit_ids:
        identifier_candidates = identifiers.get(identifier, [])
        candidates.extend(identifier_candidates)
        if not identifier_candidates:
            unknown_ids.append(identifier)
    candidates = list({r["source_id"]: r for r in candidates}.values())
    if explicit_ids and unknown_ids:
        result.update(
            status="conflito_identificacao", match_method="issn_explicito",
            motivo="ISSN explícito não localizado no catálogo; correspondência por título não aplicada.",
            issns_nao_localizados=sorted(unknown_ids),
        )
        return result
    if explicit_ids:
        method = "issn_explicito"
        if verification and any(candidate["source_id"] != verification["registro"]["source_id"]
                                for candidate in candidates):
            result.update(status="conflito_identificacao", match_method=method,
                          motivo="ISSN explícito e identificação individual documentada apontam para periódicos diferentes.")
            return result
    elif verification:
        candidates = [verification["registro"]]
        method = "publicacao_verificada"
        if reliable_title_candidates and candidates[0]["source_id"] not in {
                row["source_id"] for row in reliable_title_candidates}:
            result.update(status="conflito_identificacao", match_method=method,
                          motivo="Título do veículo e identificação individual documentada apontam para periódicos diferentes.")
            return result
    elif homonym:
        result.update(
            status="ambiguo", match_method="titulo_homonimo",
            motivo="Título de periódico homônimo; é necessário confirmar o ISSN/eISSN ou a identificação individual do artigo.",
            candidatos=[{"source_id": r["source_id"], "titulo": r["titulo_catalogo"]}
                        for r in title_candidates],
            identificacao_fontes=homonym["fontes"],
        )
        return result
    else:
        candidates, method, alias_evidence = title_candidates, title_method, title_evidence
    if len(candidates) != 1:
        result.update(status="ambiguo" if candidates else "fora_catalogo",
                      motivo="Mais de um título candidato; revisão necessária." if candidates
                      else "Periódico não localizado por correspondência exata no catálogo; não é prova de ausência de indicador.",
                      match_method=method,
                      candidatos=[{"source_id": r["source_id"], "titulo": r["titulo_catalogo"]}
                                  for r in candidates])
        return result
    chosen = candidates[0]
    if explicit_ids and reliable_title_candidates and chosen["source_id"] not in {
            row["source_id"] for row in reliable_title_candidates}:
        result.update(status="conflito_identificacao", match_method="issn_explicito",
                      motivo="ISSN e título apontam para periódicos diferentes; revisão necessária.")
        return result
    result.update(chosen, match_method=method)
    if alias_evidence:
        result.update(alias_fontes=alias_evidence["fontes"],
                      alias_verificado_em=alias_evidence["verificado_em"],
                      alias_nota=alias_evidence["nota"])
    if verification:
        evidence = verification["evidencia"]
        result.update(
            identificacao_fontes=evidence["fontes"],
            identificacao_verificado_em=evidence["verificado_em"],
            identificacao_nota=evidence["nota"], identificacao_doi=evidence["doi"],
        )
        if evidence.get("tipo_trabalho"):
            result["tipo_trabalho"] = evidence["tipo_trabalho"]
    # A title is a reason to review the publication type, never proof of
    # ineligibility. Some papers titled "Erratum to" contain original research.
    # Only exact, sourced article-level evidence may resolve this review.
    type_review = re.match(
        r"^\s*(?:correction|erratum|corrigendum)\s+to\s*:",
        str(publication.get("titulo") or ""), re.I,
    )
    verified_type = verification["evidencia"].get("tipo_trabalho") if verification else None
    if verified_type == "correcao_editorial" or (type_review and verified_type != "artigo_completo"):
        result.update(
            status="pendente_tipo", faixa=None, pontos=None,
            motivo="Registro de correção/errata: confirmar se constitui artigo completo de pesquisa "
                   "admissível na avaliação. O título ou o percentil do periódico não resolvem essa "
                   "questão. Sem pontos enquanto a modalidade estiver em revisão; o artigo original "
                   "continua sendo analisado separadamente.",
        )
        return result
    if chosen["faixa"] is None:
        result.update(status="sem_percentil",
                      motivo="Periódico localizado, mas sem percentil numérico disponível nas exportações.")
    else:
        result.update(status="classificado",
                      motivo="Faixa inicial estimada com métricas de 2025; ajustes CAPES por artigo não aplicados.",
                      pontos=WEIGHTS.get(chosen["faixa"]),
                      fora_formula=chosen["faixa"] not in WEIGHTS)
    return result


def annual_summary(year, items, cv_available, cv_updated_at):
    """Summarize found records without treating unknown CV years as zeros."""
    update_year = date.fromisoformat(cv_updated_at).year if cv_updated_at else None
    temporal_coverage = (
        "desconhecida" if update_year is None else
        "apos_atualizacao_cv" if year > update_year else "ate_atualizacao_cv"
    )
    journals = [p for p in items if p["tipo"] == "periodico"]
    classified_journals = [p for p in journals if p["status"] == "classificado"]
    pending = [p for p in journals if p["status"] != "classificado"]
    event_items = [p for p in items if p["tipo"] == "anais_congressos"]
    classified_events = [p for p in event_items if p["status"] == "classificado"]
    pending_events = [p for p in event_items if p["status"] == "pendente_evento"]
    ineligible_events = [p for p in event_items if p["status"] == "evento_nao_elegivel"]
    classified = classified_journals + classified_events
    presentations = [p for p in items if p["tipo"] == "apresentacao"]
    if not cv_available:
        points, status = None, "cv_ausente"
    elif not items and update_year is None:
        points, status = None, "cobertura_temporal_desconhecida"
    elif not items and year > update_year:
        points, status = None, "ano_sem_cobertura_cv"
    else:
        points = sum(WEIGHTS.get(p["faixa"], 0) for p in classified) if classified else (
            0 if not pending and not pending_events else None)
        status = "parcial" if pending or pending_events else "registros_localizados"
    return {
        "ano": year,
        "cobertura_temporal": temporal_coverage,
        "contagens": {b: sum(p["faixa"] == b for p in classified) for b in BANDS},
        "contagens_periodicos": {b: sum(p["faixa"] == b for p in classified_journals) for b in BANDS},
        "contagens_eventos": {b: sum(p["faixa"] == b for p in classified_events) for b in BANDS},
        "pontos_referencia": points,
        "pontos_status": status,
        "periodicos_total": len(journals),
        "periodicos_classificados": len(classified_journals),
        "pendentes": len(pending),
        "eventos_total": len(event_items),
        "eventos_classificados": len(classified_events),
        "eventos_pendentes": len(pending_events),
        "eventos_nao_elegiveis": len(ineligible_events),
        "apresentacoes_total": len(presentations),
        "publicacoes": sorted(items, key=lambda p: (p["tipo"], normalize(p["titulo"]))),
    }


def main():
    from quadrienio import analysis_criteria, quadrennial_summary
    from complementos_quadrienio import load_complements

    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    args = parser.parse_args()
    root = args.root.resolve()
    inputs = {
        "docentes": root / "data/controle/docentes.json",
        "ausentes": root / "data/controle/lattes-ausentes.json",
        "periodicos": root / "content/controle/publicacoes-periodicos.md",
        "eventos": root / "content/controle/publicacoes-conferencias.md",
        "catalogo": root / "data/controle/catalogo-periodicos-google.json",
        "aliases": root / "data/controle/periodicos-aliases.json",
        "publicacoes_verificadas": root / "data/controle/publicacoes-verificadas.json",
        "catalogo_eventos": root / "data/controle/eventos-capes.json",
        "complementos_quadrienio": root / "data/controle/complementos-quadrienio.json",
    }
    faculty = json.loads(inputs["docentes"].read_text(encoding="utf-8-sig"))["docentes"]
    missing_data = json.loads(inputs["ausentes"].read_text(encoding="utf-8-sig"))
    missing = {r["docente_id"] for r in missing_data["docentes"]}
    periodic_meta, periodic = read_publications(inputs["periodicos"])
    event_meta, events = read_publications(inputs["eventos"])
    for key in ("desde_ano", "ate_ano", "periodo_analise"):
        if periodic_meta[key] != event_meta[key]:
            raise ValueError(f"Janelas inconsistentes entre periódicos e eventos: {key}")
    years = list(range(periodic_meta["desde_ano"], periodic_meta["ate_ano"] + 1))
    catalog, titles, identifiers = read_catalog(inputs["catalogo"])
    aliases = read_aliases(inputs["aliases"], catalog)
    verified_publications, homonymous_titles = read_verified_publications(
        inputs["publicacoes_verificadas"], catalog)
    event_catalog = read_event_catalog(inputs["catalogo_eventos"])
    pdf_index = collections.defaultdict(list)
    for pdf in (root / "static/CVS_LATTES").glob("*.pdf"):
        match = re.search(r"\(([^()]*)\)\.pdf$", pdf.name, re.I)
        if match:
            pdf_index[normalize(match.group(1))].append(pdf)
    output, excluded, unresolved = [], [], []
    duplicates = []
    for docente in faculty:
        category = docente.get("credenciamento", {}).get("categoria")
        if category not in ACTIVE:
            excluded.append({"id": docente["id"], "nome": docente["nome"], "categoria": category})
            continue
        sid = docente["id"]
        if sid not in periodic or sid not in events:
            raise ValueError(f"Docente ativo sem registro na extração: {sid}")
        cv_updated_at = periodic[sid].get("lattes_atualizado_em") or None
        if cv_updated_at != (events[sid].get("lattes_atualizado_em") or None):
            raise ValueError(f"Datas de atualização do CV inconsistentes nas extrações: {sid}")
        if cv_updated_at:
            parsed_cv_date = date.fromisoformat(cv_updated_at)
            if parsed_cv_date.isoformat() != cv_updated_at:
                raise ValueError(f"Data de atualização do CV fora do formato ISO: {sid}")
        cv_paths = pdf_index.get(normalize(docente["nome"]), [])
        cv_available = sid not in missing and len(cv_paths) == 1
        if not cv_available and sid not in missing:
            unresolved.append({"id": sid, "nome": docente["nome"],
                               "motivo": "PDF do CV sem correspondência única por nome"})
        publications = []
        seen = set()
        for pub in periodic[sid]["publicacoes"] + events[sid]["publicacoes"]:
            if pub["ano"] not in years:
                raise ValueError(f"Registro fora da janela: {sid}, {pub['ano']}")
            # Only identical references from the same extraction are deduplicated.
            key = (pub["ano"], pub.get("tipo"), normalize(pub.get("referencia")))
            if key in seen:
                duplicates.append({"docente_id": sid, "ano": pub["ano"], "titulo": pub["titulo"]})
                continue
            seen.add(key)
            publications.append(classify(pub, titles, identifiers, aliases,
                                         verified_publications, homonymous_titles, event_catalog))
        annual = [
            annual_summary(year, [p for p in publications if p["ano"] == year],
                           cv_available, cv_updated_at)
            for year in years
        ]
        source_record = periodic[sid]
        output.append({
            "id": sid, "nome": docente["nome"], "categoria": category,
            "lattes_status": "disponivel" if cv_available else "ausente",
            "lattes_atualizado_em": cv_updated_at,
            "lattes_url": source_record.get("lattes_url") or docente.get("lattes_url") or None,
            "lattes_pdf": cv_paths[0].relative_to(root / "static").as_posix() if cv_available else None,
            "lattes_pdf_sha256": sha(cv_paths[0]) if cv_available else None,
            "extracao_atualizada_em": periodic_meta["atualizado_em"],
            "cobertura": "Registros localizados na extração dos PDFs Lattes; a presença e a data de atualização do CV não comprovam completude.",
            "anos": annual,
        })
    nusp_by_id = {person["id"]: person.get("janus", {}).get("nusp") for person in faculty}
    faculty_for_review = [dict(person, nusp=nusp_by_id[person["id"]]) for person in output
                          if person["lattes_status"] == "disponivel"]
    complements = load_complements(inputs["complementos_quadrienio"], faculty_for_review, catalog, event_catalog)
    for person in output:
        summary = quadrennial_summary(
            person["anos"], person["lattes_status"] == "disponivel", person["lattes_atualizado_em"],
            complements.get(person["id"], []),
        )
        if summary is not None:
            person["quadrienio"] = summary
    payload = {
        "schema_version": 2,
        "periodo": periodic_meta["periodo_analise"], "anos": years, "snapshot_ano": 2025,
        "atualizado_em": max(periodic_meta["atualizado_em"], event_meta["atualizado_em"]),
        "gerado_por": "scripts/gerar-producao-docente.py",
        "fonte": "Extrações canônicas Lattes + exportação da planilha Google de periódicos + catálogo de eventos com evidências",
        "pesos": WEIGHTS, "faixas": BANDS, "criterio_quadrienio": analysis_criteria(periodic_meta["periodo_analise"]),
        "metodologia": {
            "nome_indicador": "Soma bibliográfica estimada — pesos CAPES",
            "ficha_url": FICHA_URL, "ficha_pagina": 7, "ficha_item": "2.4",
            "aviso": "Estimativa local por docente. O indicador oficial usa seleção de 4N produções do programa, N médio no quadriênio e ajustes da avaliação dos artigos; esta soma não determina recredenciamento.",
            "faixas": "Referência inicial de periódicos, maior percentil CiteScore/JIF disponível, métricas de 2025; não é classificação final CAPES.",
            "limites_qualitativos": "A identificação do periódico e seu percentil não certificam a modalidade do trabalho, a aderência à Computação e ao PPG, a ausência de retratação ou de más práticas editoriais. Essas condições exigem conferência institucional. Ajustes qualitativos de periódicos SBC e por FWCI não são calculados. Correções/erratas identificadas ficam em revisão até evidência individual de artigo completo; não se exclui o artigo original nem se julga elegibilidade apenas pelo título ou pela editora.",
            "coautoria": "Contagem integral por docente; totais entre docentes não podem ser somados sem deduplicar as produções.",
            "a5_a8": "A5–A8 são mostrados, mas não integram a fórmula bibliográfica do item 2.4 e não recebem um peso oficial inventado.",
            "ausentes": "Sem correspondência ou sem percentil permanece pendente, sem atribuição automática de A8 ou zero.",
            "eventos": "Eventos são analisados por H5, recomendações CE-SBC e indução, conforme o Documento de Área 2025–2028. A faixa do veículo só entra na soma após validação documentada do artigo completo e dos critérios editoriais do GT. A aderência à linha de pesquisa e a seleção institucional dependem de avaliação do programa. Faixas candidatas e pendências não pontuam; resumos e outras modalidades confirmadas são separados.",
            "eventos_temporal": "Aplicação local das regras 2025–2028 aos anos exibidos; o ano e a data de consulta de cada evidência são registrados. Não representa reconstrução do Qualis histórico nem classificação final da CAPES.",
            "eventos_matching": "Nome/alias completo normalizado ou identificação individual documentada. Workshops, anais estendidos e trilhas não herdam a classificação do evento principal.",
            "periodo": "Janela anual derivada do período Janus; Lattes informa ano, sem garantir corte exato de dia/mês ou completude.",
            "atualizacao_cv": "Anos sem registros posteriores à última atualização do currículo ficam sem pontuação. Quando a data do CV é desconhecida, anos sem registros também ficam sem pontuação. Registros conhecidos são preservados; a data do CV não garante completude.",
            "zero": "Zero significa ausência de contribuição A1–A4 entre os registros localizados, não ausência comprovada de produção.",
            "limite_catalogo": (
                f"{len(catalog):,}".replace(",", ".") + " periódicos Scopus: "
                "4.334 do recorte original ASJC 17xx/26xx e "
                f"{len(catalog) - 4334} acrescentados a partir da produção docente. "
                "Busca JCR pelos ISSNs desse catálogo ampliado; não é cobertura exaustiva da WoS."
            ),
            "matching": "ISSN explícito; identificação individual documentada por título, ano e veículo exatos; senão título normalizado único, qualificador de suporte ou alias verificado. Títulos homônimos exigem identificação precisa. Identificadores conflitantes ou malformados ficam pendentes. Sem similaridade aproximada.",
        },
        "fontes": {name: {"arquivo": p.relative_to(root).as_posix(), "sha256": sha(p)}
                   for name, p in inputs.items()},
        "catalogo_registros": len(catalog), "docentes": output,
        "auditoria": {
            "docentes_incluidos": len(output), "docentes_excluidos": excluded,
            "cv_sem_mapeamento_unico": unresolved, "duplicatas_exatas_removidas": duplicates,
            "status_publicacoes": dict(collections.Counter(
                p["status"] for d in output for y in d["anos"] for p in y["publicacoes"])),
            "titulos_periodicos_pendentes": dict(collections.Counter(
                p["veiculo"] or "(sem veículo)" for d in output for y in d["anos"]
                for p in y["publicacoes"] if p["tipo"] == "periodico" and p["status"] != "classificado")),
            "status_eventos": dict(collections.Counter(
                p["status"] for d in output for y in d["anos"] for p in y["publicacoes"]
                if p["tipo"] == "anais_congressos")),
            "motivos_eventos_pendentes": dict(collections.Counter(
                reason for d in output for y in d["anos"] for p in y["publicacoes"]
                if p["tipo"] == "anais_congressos" and p["status"] == "pendente_evento"
                for reason in p.get("pendencias_evento", [p["motivo"]]))),
        },
    }
    target = root / "data/controle/producao-docente.json"
    target.parent.mkdir(parents=True, exist_ok=True)
    temporary = target.with_suffix(".json.tmp")
    temporary.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    temporary.replace(target)
    print(json.dumps({"arquivo": str(target), "docentes": len(output),
                      "anos": years, "status": payload["auditoria"]["status_publicacoes"],
                      "cv_sem_mapeamento_unico": len(unresolved)}, ensure_ascii=False))


if __name__ == "__main__":
    try:
        main()
    except (ValueError, OSError, KeyError) as error:
        raise SystemExit(f"Não foi possível gerar a produção docente: {error}")
