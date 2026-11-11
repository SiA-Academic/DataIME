"""Gera o ranking bibliográfico sem alterar a produção nem o catálogo.

Uso: python scripts/gerar-ranking-periodicos.py --root CAMINHO --output-dir SAIDA
O root é a pasta SiADoce (por padrão, a pasta pai de scripts).

Entradas: data/controle/producao-docente.json e ranking-periodicos-revisoes.json.
Saídas (UTF-8; CSV com BOM):
  ranking_payload.json: schema_version, headers, values (sem cabeçalho), resumo,
    metodologia, ressalvas e proveniência. Os anos são colunas dinâmicas.
  ranking_periodicos_payload.json: mesmo conteúdo, acrescido de ranking,
    articles (com cada registro original) e auditoria.
  ranking_periodicos.csv: headers + values, separado por vírgula.
  auditoria_resumo.json: totais e decisões usadas/não usadas nesta execução.
  ranking_conflitos.json: resultado da validação, vazio em caso de sucesso.

Conflitos de identidade, DOI, ano ou duplicação no mesmo docente abortam a
geração ANTES de substituir qualquer ranking. O relatório de conflitos indica
os registros a revisar; não é autorização para editar/reclassificar a fonte.
Ausência de classificação CAPES não exclui uma publicação deste ranking.

API: gerar_payload(data, revisoes, *, source_sha256=None,
                  source_updated_at=None) -> dict
     gerar_arquivos(root, output_dir) -> dict (payload completo)
RankingConflict.conflitos contém a lista de diagnósticos.
Só utiliza a biblioteca padrão do Python.
"""
import argparse
import collections
import copy
import csv
import hashlib
import io
import json
import os
from pathlib import Path
import re
import sys
import tempfile
import unicodedata


SOURCE = Path("data/controle/producao-docente.json")
REVIEWS = Path("data/controle/ranking-periodicos-revisoes.json")
SCHEMA_VERSION = 1


class RankingConflict(ValueError):
    """Entrada incompleta/ambígua: nunca publicar um ranking com estes conflitos."""

    def __init__(self, conflitos):
        self.conflitos = conflitos
        super().__init__("Ranking não gerado: " + "; ".join(c["mensagem"] for c in conflitos))


def norm(value):
    value = unicodedata.normalize("NFKD", str(value or ""))
    value = "".join(c for c in value if not unicodedata.combining(c))
    return re.sub(r"[^a-z0-9]", "", value.lower())


def normalize_doi(value):
    value = re.sub(r"^(?:https?://(?:dx\.)?doi\.org/|doi:\s*)", "",
                   str(value or "").strip(), flags=re.I).lower()
    if value and not re.fullmatch(r"10\.\d{4,9}/\S+", value):
        raise ValueError("DOI malformado: " + value)
    return value


def _diagnostic(code, message, records=(), **details):
    return {
        "codigo": code, "mensagem": message,
        "registros": [{
            "fonte": r.get("source_pointer"),
            "docente": r.get("docente"),
            "titulo": r.get("titulo"),
            "ano": r.get("ano"),
            "periodico": r.get("journal_ranking", r.get("veiculo")),
            "source_id": r.get("source_id"),
            "doi": r.get("doi_ranking"),
        } for r in records],
        **details,
    }


def _abort(code, message, records=(), **details):
    raise RankingConflict([_diagnostic(code, message, records, **details)])


class UnionFind:
    def __init__(self, size):
        self.parent = list(range(size))

    def find(self, index):
        while self.parent[index] != index:
            self.parent[index] = self.parent[self.parent[index]]
            index = self.parent[index]
        return index

    def union(self, a, b):
        self.parent[self.find(b)] = self.find(a)

    def groups(self, records):
        result = collections.defaultdict(list)
        for index, record in enumerate(records):
            result[self.find(index)].append(record)
        return result


def _validate_reviews(reviews):
    if not isinstance(reviews, dict) or reviews.get("schema_version") != 1:
        _abort("revisoes_invalidas", "Arquivo de revisões ausente ou schema_version diferente de 1.")
    for section in ("publicacoes", "identificacoes_periodicos"):
        if not isinstance(reviews.get(section), list):
            _abort("revisoes_invalidas", f"Revisões precisam da lista {section}.")
        for decision in reviews[section]:
            if (not isinstance(decision, dict) or not decision.get("reason")
                    or not isinstance(decision.get("sources"), list) or not decision["sources"]
                    or any(not isinstance(source, str) or not source.strip() for source in decision["sources"])):
                _abort("revisao_sem_fonte", f"Decisão em {section} exige motivo e fontes.")
            required = ("source_id", "titles", "title", "year", "years") if section == "publicacoes" else (
                "title", "year", "original", "journal")
            if any(not decision.get(key) for key in required):
                _abort("revisoes_invalidas", f"Decisão incompleta em {section}.")
            if section == "publicacoes" and (
                    not isinstance(decision["titles"], list)
                    or not isinstance(decision["years"], list)
                    or any(not isinstance(y, int) or isinstance(y, bool) for y in decision["years"])):
                _abort("revisoes_invalidas", "Uma revisão de publicação precisa de listas titles e years (anos originais).")
    if not isinstance(reviews.get("nomes_exibicao"), dict):
        _abort("revisoes_invalidas", "nomes_exibicao precisa ser um objeto de rótulos.")
    if any(not isinstance(label, str) or not label.strip()
           for label in reviews["nomes_exibicao"].values()):
        _abort("revisoes_invalidas", "Cada nome de exibição precisa ser um texto não vazio.")


def _records(data, reviews):
    if not isinstance(data, dict) or not isinstance(data.get("docentes"), list):
        _abort("fonte_invalida", "A produção deve conter a lista docentes.")
    if not data["docentes"]:
        _abort("fonte_sem_docentes", "A fonte está sem docentes; verificar a extração antes de substituir o ranking.")
    if not isinstance(data.get("anos"), list):
        _abort("fonte_invalida", "A produção deve conter a lista anos.")
    records = []
    faculty_ids = set()
    years = set()
    for year in data.get("anos", []):
        if not isinstance(year, int) or isinstance(year, bool):
            _abort("ano_invalido", f"Ano da base inválido: {year!r}.")
        years.add(year)
    for faculty in data["docentes"]:
        if (not isinstance(faculty, dict) or not isinstance(faculty.get("id"), str)
                or not faculty["id"].strip() or not isinstance(faculty.get("nome"), str)
                or not faculty["nome"].strip()):
            _abort("docente_invalido", "Cada docente deve ter id e nome.")
        if faculty["id"] in faculty_ids:
            _abort("docente_duplicado", f"ID de docente duplicado: {faculty['id']}.")
        faculty_ids.add(faculty["id"])
        if not isinstance(faculty.get("anos"), list):
            _abort("fonte_invalida", f"Falta a lista anual do docente {faculty['nome']}.")
        annual_years = set()
        for annual in faculty["anos"]:
            if not isinstance(annual, dict):
                _abort("fonte_invalida", f"Agrupamento anual inválido em {faculty['nome']}.")
            annual_year = annual.get("ano")
            if not isinstance(annual_year, int) or isinstance(annual_year, bool):
                _abort("ano_invalido", f"Ano anual inválido em {faculty['nome']}.")
            if annual_year in annual_years:
                _abort("ano_duplicado", f"Ano {annual_year} repetido em {faculty['nome']}.")
            annual_years.add(annual_year)
            years.add(annual_year)
            if not isinstance(annual.get("publicacoes"), list):
                _abort("fonte_invalida", f"Faltam publicações de {faculty['nome']}/{annual_year}.")
            for index, pub in enumerate(annual["publicacoes"]):
                if not isinstance(pub, dict) or not pub.get("tipo"):
                    _abort("publicacao_invalida", f"Publicação sem tipo em {faculty['nome']}/{annual_year}/{index}.")
                if pub["tipo"] != "periodico":
                    continue
                item = copy.deepcopy(pub)
                item.update(
                    docente=faculty["nome"], docente_id=faculty["id"],
                    categoria=faculty.get("categoria"),
                    source_pointer=f"{faculty['id']}/{annual_year}/{index}",
                )
                if not norm(pub.get("titulo")) or not norm(pub.get("veiculo")):
                    _abort("identificacao_ausente", "Periódico sem título do artigo ou nome do veículo.", [item])
                if pub.get("ano") != annual_year:
                    _abort("ano_inconsistente", "Ano do artigo difere do agrupamento anual.", [item])
                item["title_ranking"] = pub["titulo"]
                item["year_ranking"] = pub["ano"]
                item["journal_ranking"] = pub.get("titulo_catalogo") or reviews["nomes_exibicao"].get(
                    norm(pub["veiculo"]), pub["veiculo"])
                item["decision"] = None
                matching = [d for d in reviews["publicacoes"]
                            if str(pub.get("source_id")) == str(d["source_id"])
                            and norm(pub["titulo"]) in {norm(t) for t in d["titles"]}]
                if len(matching) > 1:
                    _abort("revisoes_ambiguas", "Mais de uma decisão de ano/título corresponde ao artigo.", [item])
                doi = pub.get("identificacao_doi") or pub.get("doi") or ""
                try:
                    dois_informados = {normalize_doi(pub[k]) for k in ("identificacao_doi", "doi") if pub.get(k)}
                except ValueError as exc:
                    _abort("doi_invalido", str(exc), [item])
                if len(dois_informados) > 1:
                    _abort("dois_conflitantes_no_registro", "DOI explícito diverge do DOI da identificação.", [item])
                if matching:
                    decision = matching[0]
                    if pub["ano"] not in decision["years"]:
                        _abort("revisao_fora_escopo_temporal",
                               "Artigo de uma decisão anterior apareceu com ano ainda não documentado.", [item])
                    item.update(title_ranking=decision["title"], year_ranking=decision["year"],
                                decision=copy.deepcopy(decision))
                    try:
                        if doi and decision.get("doi") and normalize_doi(doi) != normalize_doi(decision["doi"]):
                            _abort("doi_conflitante_com_revisao", "DOI novo diverge da decisão documentada.", [item])
                    except ValueError as exc:
                        if isinstance(exc, RankingConflict):
                            raise
                        _abort("doi_invalido", str(exc), [item])
                    doi = decision.get("doi") or doi
                matching = [d for d in reviews["identificacoes_periodicos"]
                            if (pub["titulo"], pub["ano"], pub["veiculo"]) == (
                                d["title"], d["year"], d["original"])]
                if len(matching) > 1:
                    _abort("revisoes_ambiguas", "Mais de uma identificação individual corresponde ao artigo.", [item])
                if matching:
                    decision = matching[0]
                    if pub.get("titulo_catalogo") and norm(pub["titulo_catalogo"]) != norm(decision["journal"]):
                        _abort("identidade_conflitante_com_revisao", "Novo catálogo diverge da identificação individual.", [item])
                    item["journal_ranking"] = decision["journal"]
                    item["identification_decision"] = copy.deepcopy(decision)
                    try:
                        if doi and decision.get("doi") and normalize_doi(doi) != normalize_doi(decision["doi"]):
                            _abort("doi_conflitante_com_revisao", "DOI novo diverge da identificação documentada.", [item])
                    except ValueError as exc:
                        if isinstance(exc, RankingConflict):
                            raise
                        _abort("doi_invalido", str(exc), [item])
                    doi = decision.get("doi") or doi
                try:
                    item["doi_ranking"] = normalize_doi(doi)
                except ValueError as exc:
                    _abort("doi_invalido", str(exc), [item])
                item["issns_ranking"] = []
                for value in (pub.get("issn"), pub.get("eissn"),
                              item.get("identification_decision", {}).get("issn")):
                    if not value:
                        continue
                    cleaned = str(value).strip().replace("-", "").upper()
                    if not re.fullmatch(r"\d{7}[\dX]", cleaned):
                        _abort("issn_invalido", f"ISSN malformado: {value}.", [item])
                    item["issns_ranking"].append(cleaned)
                final_year = item["year_ranking"]
                if not isinstance(final_year, int) or isinstance(final_year, bool):
                    _abort("ano_invalido", "A revisão precisa fornecer um ano inteiro.", [item])
                years.add(final_year)
                records.append(item)
    return records, sorted(years)


def _journals(records):
    uf = UnionFind(len(records))
    index = {}
    for i, record in enumerate(records):
        tokens = [("issn", value) for value in record["issns_ranking"]]
        if record.get("source_id"):
            tokens.append(("source", str(record["source_id"])))
        for token in tokens:
            if token in index:
                uf.union(i, index[token])
            else:
                index[token] = i
    groups = uf.groups(records)
    for group in groups.values():
        ids = {str(r["source_id"]) for r in group if r.get("source_id")}
        if len(ids) > 1:
            _abort("identificadores_conflitantes", "Um ISSN conecta Source IDs diferentes; revisar identidade.", group,
                   source_ids=sorted(ids))

    # Missing identifiers may inherit only an unambiguous exact title. Two
    # identified homonyms remain separate; disjoint ISSNs never merge by title.
    by_title = collections.defaultdict(set)
    for i, record in enumerate(records):
        by_title[norm(record["journal_ranking"])].add(uf.find(i))
    for title, candidates in sorted(by_title.items()):
        candidates = sorted({uf.find(i) for i in candidates})
        if len(candidates) <= 1:
            continue
        groups = uf.groups(records)
        identified = [i for i in candidates if any(r.get("source_id") or r["issns_ranking"] for r in groups[i])]
        unknown = [i for i in candidates if i not in identified]
        if len(identified) > 1:
            if unknown:
                _abort("periodico_homonimo_sem_id", "Título homônimo sem identificador: não é possível escolher o periódico.",
                       [r for i in candidates for r in groups[i]], titulo_normalizado=title)
            continue
        anchor = identified[0] if identified else candidates[0]
        for candidate in candidates:
            uf.union(anchor, candidate)
    for group in uf.groups(records).values():
        ids = sorted({str(r["source_id"]) for r in group if r.get("source_id")})
        issns = sorted({value for r in group for value in r["issns_ranking"]})
        canonical_names = sorted({r.get("titulo_catalogo") for r in group if r.get("titulo_catalogo")}, key=lambda x: (norm(x), x))
        canonical = canonical_names[0] if canonical_names else sorted(
            {r["journal_ranking"] for r in group}, key=lambda x: (norm(x), x))[0]
        key = "source:" + ids[0] if ids else "issn:" + issns[0] if issns else "title:" + norm(canonical)
        for record in group:
            record["journal_key"] = key
            record["journal_ranking"] = canonical


def _articles(records):
    uf = UnionFind(len(records))
    index = {}
    for i, item in enumerate(records):
        tokens = [("title", item["journal_key"], norm(item["title_ranking"]))]
        if item["doi_ranking"]:
            tokens.append(("doi", item["doi_ranking"]))
        for token in tokens:
            if token in index:
                uf.union(i, index[token])
            else:
                index[token] = i
    articles = []
    conflicts = []
    for group in uf.groups(records).values():
        checks = [
            ("artigo_periodicos_conflitantes", "Mesmo DOI aparece em periódicos de identidades distintas.",
             {r["journal_key"] for r in group}),
            ("dois_conflitantes", "Mesmo título/periódico possui DOIs diferentes.",
             {r["doi_ranking"] for r in group if r["doi_ranking"]}),
            ("titulo_conflitante", "Mesmo DOI possui títulos diferentes; requer identificação documentada.",
             {norm(r["title_ranking"]) for r in group}),
            ("ano_conflitante", "Mesmo artigo possui anos diferentes; confirmar ano do volume/fascículo.",
             {r["year_ranking"] for r in group}),
            ("faixa_conflitante", "Mesmo artigo possui faixas distintas; revisar classificação na fonte.",
             {r.get("faixa") for r in group if r.get("faixa")}),
        ]
        for code, message, values in checks:
            if len(values) > 1:
                conflicts.append(_diagnostic(code, message, group, valores=sorted(values)))
        ids = [r["docente_id"] for r in group]
        if len(ids) != len(set(ids)):
            conflicts.append(_diagnostic(
                "duplicata_mesmo_docente", "Mesmo artigo repetido no mesmo docente; revisar a fonte.", group))
        if any(len(values) > 1 for _, _, values in checks) or len(ids) != len(set(ids)):
            continue
        group.sort(key=lambda r: (str(r["docente_id"]), r["source_pointer"]))
        doi = next((r["doi_ranking"] for r in group if r["doi_ranking"]), "")
        title = sorted({r["title_ranking"] for r in group}, key=lambda x: (norm(x), x))[0]
        year = group[0]["year_ranking"]
        article = {
            "id": doi or hashlib.sha256(
                f"{group[0]['journal_key']}|{norm(title)}|{year}".encode()).hexdigest()[:24],
            "periodico": group[0]["journal_ranking"], "journal_key": group[0]["journal_key"],
            "titulo": title, "ano": year, "anos_originais": sorted({r["ano"] for r in group}),
            "doi": doi or None,
            "docentes": sorted({r["docente"] for r in group}, key=lambda x: (norm(x), x)),
            "docente_ids": sorted(set(ids)), "registros_por_docente": len(group),
            "faixas": sorted({r["faixa"] for r in group if r.get("faixa")}),
            "status": sorted({r.get("status") or "sem_status" for r in group}),
            "decisao_ano_titulo": next((r["decision"] for r in group if r["decision"]), None),
            "registros": group,
        }
        articles.append(article)
    if conflicts:
        raise RankingConflict(conflicts)
    return sorted(articles, key=lambda a: (norm(a["periodico"]), a["journal_key"], a["ano"], norm(a["titulo"])))


def gerar_payload(data, revisoes, *, source_sha256=None, source_updated_at=None):
    """Calcula o ranking; não altera os argumentos e não escreve arquivos."""
    _validate_reviews(revisoes)
    records, years = _records(data, revisoes)
    _journals(records)
    articles = _articles(records)
    by_journal = collections.defaultdict(list)
    for article in articles:
        by_journal[article["journal_key"]].append(article)
    ranking = []
    for key, group in by_journal.items():
        originals = [r for article in group for r in article["registros"]]
        ranking.append({
            "periodico": group[0]["periodico"], "artigos_unicos": len(group),
            "por_ano": {str(year): sum(a["ano"] == year for a in group) for year in years},
            "docentes_distintos": len({r["docente_id"] for r in originals}),
            "registros_por_docente": len(originals),
            "docentes": sorted({r["docente"] for r in originals}, key=lambda x: (norm(x), x)),
            "docente_ids": sorted({r["docente_id"] for r in originals}),
            "issns": sorted({value for r in originals for value in r["issns_ranking"]}),
            "faixas": sorted({r["faixa"] for r in originals if r.get("faixa")}),
            "situacao": sorted({r.get("status") or "sem_status" for r in originals}),
            "source_ids": sorted({str(r["source_id"]) for r in originals if r.get("source_id")}),
            "variantes_originais": sorted({r["veiculo"] for r in originals}, key=lambda x: (norm(x), x)),
            "journal_key": key,
        })
    ranking.sort(key=lambda r: (-r["artigos_unicos"], norm(r["periodico"]), r["journal_key"]))
    # Make two real homonyms visibly distinct without changing their identity.
    names = collections.Counter(norm(row["periodico"]) for row in ranking)
    for row in ranking:
        row["rotulo"] = row["periodico"]
        if names[norm(row["periodico"])] > 1:
            row["rotulo"] += f" [{row['journal_key']}]"
    headers = ["Periódico", "Publicações únicas", *years, "Docentes distintos", "Registros por docente"]
    values = [[row["rotulo"], row["artigos_unicos"],
               *[row["por_ano"][str(y)] for y in years],
               row["docentes_distintos"], row["registros_por_docente"]] for row in ranking]
    accepted = [r["source_pointer"] for r in records
                if re.search(r"aceit|accepted|no prelo|in press|forthcoming|ahead.of.print",
                             r.get("referencia", ""), re.I)]
    totals = {
        "periodicos": len(ranking), "artigos_unicos": len(articles),
        "publicacoes_unicas": len(articles),
        "correcoes_editoriais_incluidas": sum(a["titulo"].lower().startswith("correction to:") for a in articles),
        "registros_por_docente": len(records),
        "excedentes_por_coautoria_removidos": len(records) - len(articles),
        "artigos_com_mais_de_um_docente": sum(a["registros_por_docente"] > 1 for a in articles),
        "docentes_com_publicacao_periodico": len({r["docente_id"] for r in records}),
        "docentes_na_base": len(data["docentes"]),
        "por_ano": {str(year): sum(a["ano"] == year for a in articles) for year in years},
        "registros_classificacao_pendente_incluidos": sum(r.get("status") != "classificado" for r in records),
        "conflitos_ano_resolvidos": sum(len(a["anos_originais"]) > 1 for a in articles),
        "conflitos_ano_nao_resolvidos": 0,
        "registros_com_rotulo_aceito_no_prelo": len(accepted),
    }
    if accepted:
        _abort("publicacao_sem_ano_definitivo", "Há registros rotulados como aceitos/no prelo; verificar publicação e ano.",
               [r for r in records if r["source_pointer"] in accepted])
    used = [d for d in revisoes["publicacoes"] if any(r["decision"] == d for r in records)]
    identified = [d for d in revisoes["identificacoes_periodicos"]
                  if any(r.get("identification_decision") == d for r in records)]
    return {
        "schema_version": SCHEMA_VERSION,
        "source_path": SOURCE.as_posix(), "source_sha256": source_sha256,
        "source_updated_at": source_updated_at or data.get("atualizado_em"),
        "periodo": years, "headers": headers, "values": values, "resumo": totals, "totais": totals,
        "metodologia": [
            "Todos os registros do tipo periodico presentes na base SiADoce, incluindo classificação pendente; anais e notícias ficam fora deste ranking.",
            "Os anos e os docentes são obtidos da base atual, sem janela ou totais fixos. A cobertura depende dos currículos e da extração disponíveis.",
            "Publicações únicas são reunidas pelo DOI ou pelo título normalizado dentro da mesma identidade de periódico. Ano, DOI e identidade conflitantes exigem revisão.",
            "Periódicos são identificados por Source ID ou ISSN. Título exato só reúne registros quando não há identificadores incompatíveis ou homônimos ambíguos.",
            "Coautorias entre docentes contam uma única vez em Publicações únicas; Registros por docente conserva cada ocorrência da fonte.",
            "Decisões humanas de ano, título e identificação individual ficam no arquivo ranking-periodicos-revisoes.json, com motivo e fontes.",
            "Correções editoriais são publicações distintas do artigo original. A frequência bibliográfica não determina pontuação, elegibilidade CAPES ou recredenciamento.",
        ],
        "ressalvas": [
            "A ausência de registros não comprova ausência de produção. O último ano pode ter cobertura parcial.",
            "Identificações individuais documentadas não criam aliases globais nem alteram a classificação CAPES.",
        ],
        "ranking": ranking, "articles": articles,
        "auditoria": {
            "decisoes_aplicadas": used, "identificacoes_aplicadas": identified,
            "decisoes_nao_aplicadas": [d for d in revisoes["publicacoes"] if d not in used],
            "identificacoes_nao_aplicadas": [d for d in revisoes["identificacoes_periodicos"] if d not in identified],
            "conflitos_nao_resolvidos": [],
        },
    }


def _json(value):
    return json.dumps(value, ensure_ascii=False, indent=2) + "\n"


def _write_atomic(path, text, encoding="utf-8"):
    path.parent.mkdir(parents=True, exist_ok=True)
    temp = None
    try:
        with tempfile.NamedTemporaryFile(mode="w", encoding=encoding, newline="",
                                         dir=path.parent, prefix=path.name + ".", suffix=".tmp",
                                         delete=False) as handle:
            temp = Path(handle.name)
            handle.write(text)
        os.replace(temp, path)
    finally:
        if temp is not None and temp.exists():
            temp.unlink()


def gerar_arquivos(root, output_dir):
    """Lê a fonte, valida tudo e só então substitui os arquivos de saída."""
    root, output_dir = Path(root).resolve(), Path(output_dir).resolve()
    try:
        inputs = {}
        for relative in (SOURCE, REVIEWS):
            path = root / relative
            if not path.is_file():
                _abort("fonte_ausente", f"Arquivo obrigatório ausente: {relative.as_posix()}.")
            try:
                raw = path.read_bytes()
                inputs[relative] = (json.loads(raw.decode("utf-8-sig")), hashlib.sha256(raw).hexdigest())
            except (OSError, UnicodeError, json.JSONDecodeError) as exc:
                _abort("fonte_ilegivel", f"Não foi possível ler {relative.as_posix()}: {exc}.")
        data, source_hash = inputs[SOURCE]
        reviews, review_hash = inputs[REVIEWS]
        payload = gerar_payload(data, reviews, source_sha256=source_hash)
        payload["revisoes_path"] = REVIEWS.as_posix()
        payload["revisoes_sha256"] = review_hash
    except RankingConflict as exc:
        _write_atomic(output_dir / "ranking_conflitos.json", _json({
            "schema_version": 1, "status": "erro", "ranking_atualizado": False,
            "conflitos": exc.conflitos,
        }))
        raise
    compact = {key: value for key, value in payload.items() if key not in ("ranking", "articles", "totais")}
    csv_text = io.StringIO(newline="")
    csv.writer(csv_text).writerows([payload["headers"], *payload["values"]])
    outputs = {
        "ranking_payload.json": _json(compact),
        "ranking_periodicos_payload.json": _json(payload),
        "ranking_periodicos.csv": "\ufeff" + csv_text.getvalue(),
        "auditoria_resumo.json": _json({
            "totais": payload["resumo"], "ressalvas": payload["ressalvas"],
            "auditoria": payload["auditoria"], "source_sha256": source_hash,
            "revisoes_sha256": review_hash,
        }),
        "ranking_conflitos.json": _json({
            "schema_version": 1, "status": "ok", "ranking_atualizado": True,
            "source_sha256": source_hash, "conflitos": [],
        }),
    }
    for name, text in outputs.items():
        _write_atomic(output_dir / name, text)
    return payload


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--output-dir", type=Path, required=True)
    args = parser.parse_args(argv)
    try:
        payload = gerar_arquivos(args.root, args.output_dir)
    except RankingConflict as exc:
        print(str(exc), file=sys.stderr)
        print(f"Detalhes: {args.output_dir.resolve() / 'ranking_conflitos.json'}", file=sys.stderr)
        return 2
    print(_json({"status": "ok", "resumo": payload["resumo"],
                 "output_dir": str(args.output_dir.resolve())}))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
