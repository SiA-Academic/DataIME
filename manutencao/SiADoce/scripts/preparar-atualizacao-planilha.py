"""Prepare the four generated Google Sheets tabs without network access.

CLI: python preparar-atualizacao-planilha.py --root SITE --output-dir PASTA
     [--previous-package PACOTE_ANTERIOR]

Output contract (UTF-8 JSON, no spreadsheet formulas):
  schema_version: 1; kind: "siadoce.planilha"; generated_at: ISO-8601 UTC;
  periodo: str; anos: [int]; production_sha256: str; content_sha256: str;
  source_hashes: {name: {arquivo: site-relative path, sha256: str}};
  resumo: dynamically computed counts, including coverage and pending records;
  tabs: [{key, title, headers: [str], rows: [[str|number|bool|null]],
          summary: str}];
  methodology: [{key: str, label: str, text: str}].

The only tab keys are ranking_periodicos, pendencias, eventos,
eventos_trabalhos. Rows exclude headers. Null means an absent value, never zero.
Importers must write literal values (RAW), not interpret strings as formulas.
The reviewed Scopus/JCR metric tabs are intentionally not in this package.

The production file must match its recorded input hashes and available PDF
hashes. Generation fails before replacing an existing package on stale inputs,
ranking conflicts, malformed data or incomplete source provenance.
The previous package, when present, supplies comparisons in the TXT report.
It is not an input to the new tables, so data remain idempotent.
"""

import argparse
from collections import Counter
from datetime import datetime, timezone
import hashlib
import importlib.util
import json
import math
from pathlib import Path
import sys

import classificar_eventos as engine

PACKAGE_NAME = "atualizacao-planilha.json"
REPORT_NAME = "relatorio-atualizacao.txt"
REQUIRED_SOURCES = {
    "docentes", "ausentes", "periodicos", "eventos", "catalogo", "aliases",
    "publicacoes_verificadas", "catalogo_eventos",
}
TAB_KEYS = ("ranking_periodicos", "pendencias", "eventos", "eventos_trabalhos")
MAX_BYTES = 8 * 1024 * 1024
MAX_SAFE_INTEGER = 2**53 - 1
PENDING_HEADERS = [
    "Docente", "Ano", "Tipo de publicação", "Veículo informado", "Título",
    "Situação", "O que falta",
]
EVENT_HEADERS = [
    "Evento", "ID do evento", "Trilha / série", "Faixa candidata — condicional",
    "H5", "Situação do H5", "Critérios GT", "Edições com GT verificado",
    "Faixa pelo H5", "Edição e período da métrica", "Data da consulta",
    "Recomendação CE-SBC", "Indução documentada", "Critério da faixa candidata",
    "Outras grafias reconhecidas", "Fontes de métricas e critérios",
    "Fontes da verificação GT", "Notas de evidência", "Trabalhos verificados",
    "Trabalhos em revisão",
]
WORK_HEADERS = [
    "Ano", "Título exato do trabalho", "Evento / trilha identificados",
    "Resultado atual no SiADoce", "Faixa aplicada ao trabalho",
    "Peso na fórmula A1–A4", "Modalidade comprovada", "GT da edição",
    "Revisão bloqueia a faixa", "Veículo exato do currículo", "ID do evento",
    "Situação da evidência", "Faixa candidata do evento — condicional",
    "Pendências para classificação", "Nota da verificação / revisão",
    "Fontes da comprovação", "Fontes dos critérios aplicados",
    "Data da verificação", "Aderência documentada", "Correção do tipo no currículo",
]
H5_STATUS = {
    "disponivel": "Disponível", "nao_consultado": "Não verificado",
    "nao_localizado": "Não localizado em busca documentada",
}
TRAIL = {
    "principal": "Principal", "trilha_especifica": "Trilha específica",
    "workshop": "Workshop", "estendidos": "Anais estendidos",
}
CE = {"top10": "Top 10", "top20": "Top 20", "top": "Top", "relevante": "Relevante"}
TYPES = {
    "artigo_completo": "Artigo completo", "resumo": "Resumo",
    "resumo_expandido": "Resumo expandido", "apresentacao": "Apresentação",
    "poster": "Pôster", "demo": "Demonstração", "outro": "Outro (ver nota)",
}
STATUS = {
    "classificado": "Classificado", "pendente_evento": "Pendente de verificação",
    "evento_nao_elegivel": "Não elegível como artigo completo",
    "fora_catalogo": "Fora do catálogo", "sem_percentil": "Sem percentil",
    "ambiguo": "Identificação ambígua",
    "conflito_identificacao": "Conflito de identificação",
    "pendente_tipo": "Modalidade em revisão",
}


def sha256(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def json_bytes(value):
    return json.dumps(value, ensure_ascii=False, sort_keys=True,
                      separators=(",", ":"), allow_nan=False).encode("utf-8")


def js_length(value):
    """Match JavaScript string.length, including two UTF-16 units per emoji."""
    return len(value.encode("utf-16-le", errors="surrogatepass")) // 2


def serialized_package(payload):
    text = json.dumps(payload, ensure_ascii=False, indent=2, allow_nan=False) + "\n"
    if len(text.encode("utf-8")) > MAX_BYTES:
        raise ValueError("O pacote excede o limite de 8 MiB do importador Google.")
    return text


def read_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8-sig"))


def within(root, relative, label):
    if not isinstance(relative, str) or not relative or Path(relative).is_absolute():
        raise ValueError(f"{label}: caminho relativo inválido.")
    candidate = (root / relative).resolve()
    if not candidate.is_relative_to(root):
        raise ValueError(f"{label}: caminho fora da pasta do SiADoce.")
    return candidate


def validate_sources(root, production):
    """Check every recorded source and each available faculty CV before export."""
    sources = production.get("fontes")
    if not isinstance(sources, dict) or not REQUIRED_SOURCES <= sources.keys():
        raise ValueError("Produção sem o inventário completo de fontes; gere a produção novamente.")
    checked = {}
    stale = []
    for name, source in sorted(sources.items()):
        if not isinstance(source, dict):
            raise ValueError(f"Fonte inválida: {name}")
        path = within(root, source.get("arquivo"), name)
        expected = source.get("sha256")
        if not isinstance(expected, str) or len(expected) != 64:
            raise ValueError(f"Fonte sem SHA-256 válido: {name}")
        actual = sha256(path)
        if actual != expected:
            stale.append(source["arquivo"])
        checked[name] = {"arquivo": path.relative_to(root).as_posix(), "sha256": actual}
    for faculty in production["docentes"]:
        if faculty.get("lattes_status") != "disponivel":
            continue
        relative = faculty.get("lattes_pdf")
        expected = faculty.get("lattes_pdf_sha256")
        if not relative or not expected:
            raise ValueError(f"CV disponível sem arquivo/hash: {faculty['nome']}")
        path = within(root / "static", relative, faculty["nome"])
        actual = sha256(path)
        if actual != expected:
            stale.append(path.relative_to(root).as_posix())
        checked[f"cv:{faculty['id']}"] = {
            "arquivo": path.relative_to(root).as_posix(), "sha256": actual,
        }
    if stale:
        raise ValueError(
            "Produção desatualizada: as seguintes fontes mudaram desde a última "
            "geração. Execute a atualização completa antes de preparar a planilha:\n- "
            + "\n- ".join(stale)
        )
    return checked


def validate_production(data):
    if data.get("schema_version") != 2:
        raise ValueError("Versão da produção não suportada; esperado schema_version=2.")
    years = data.get("anos")
    if (not isinstance(years, list) or not 1 <= len(years) <= 100
            or any(type(y) is not int or not 1900 <= y <= 2200 for y in years)
            or years != sorted(set(years))):
        raise ValueError("Janela de anos inválida na produção.")
    faculty_ids = set()
    for faculty in data["docentes"]:
        if not faculty.get("id") or faculty["id"] in faculty_ids:
            raise ValueError("Docente sem ID ou duplicado na produção.")
        faculty_ids.add(faculty["id"])
        if sorted(y["ano"] for y in faculty["anos"]) != years:
            raise ValueError(f"Janela incompleta ou duplicada: {faculty['nome']}")
        for annual in faculty["anos"]:
            for pub in annual["publicacoes"]:
                if pub.get("ano") != annual["ano"]:
                    raise ValueError(f"Ano da publicação inconsistente: {pub.get('titulo')}")
                if not pub.get("titulo") or not pub.get("status") or not pub.get("tipo"):
                    raise ValueError("Publicação sem título, situação ou tipo.")
                if pub["status"] != "classificado" and (
                    pub.get("faixa") or pub.get("pontos") not in (None, 0)
                ):
                    raise ValueError(f"Registro não classificado com faixa/pontos: {pub['titulo']}")


def records(data):
    for faculty in data["docentes"]:
        for annual in faculty["anos"]:
            for pub in annual["publicacoes"]:
                yield faculty, annual, pub


def is_pending(pub):
    return pub["status"] not in {"classificado", "evento_nao_elegivel", "nao_pontuado"}


def unique(items):
    return list(dict.fromkeys(items))


def urls(value):
    found = []
    if isinstance(value, dict):
        for item in value.values():
            found.extend(urls(item))
    elif isinstance(value, list):
        for item in value:
            found.extend(urls(item))
    elif isinstance(value, str) and value.startswith(("https://", "http://")):
        found.append(value)
    return unique(found)


def notes(value):
    result = []
    if isinstance(value, dict):
        for key, item in value.items():
            if key in ("nota", "cautela") and isinstance(item, str) and item.strip():
                result.append(item.strip())
            elif isinstance(item, (dict, list)):
                result.extend(notes(item))
    elif isinstance(value, list):
        for item in value:
            result.extend(notes(item))
    return unique(result)


def lines(items):
    return "\n".join(str(item) for item in items) or None


def pending_tab(data):
    rows = []
    type_names = {"periodico": "Periódico", "anais_congressos": "Evento",
                  "apresentacao": "Apresentação", "noticia": "Notícia"}
    for faculty, annual, pub in records(data):
        if not is_pending(pub):
            continue
        event_reasons = unique(
            reason.strip() for reason in pub.get("pendencias_evento", [])
            if reason and reason.strip()
        )
        reason = (pub.get("motivo") or "").strip()
        # The classifier's summary often joins the same detailed reasons.
        # Keep the detailed list once, while preserving any different summary.
        summary_repeats_details = (
            " ".join(reason.split()) == " ".join(" ".join(event_reasons).split())
        )
        reasons = unique(
            ([] if not reason or summary_repeats_details else [reason])
            + event_reasons
        )
        rows.append([
            faculty["nome"], annual["ano"], type_names.get(pub["tipo"], pub["tipo"]),
            pub.get("veiculo") or None, pub["titulo"],
            STATUS.get(pub["status"], pub["status"]),
            lines(reasons) or "Revisar a identificação e as evidências do registro.",
        ])
    rows.sort(key=lambda r: (r[0].casefold(), r[1], r[2], r[4].casefold()))
    return {
        "key": "pendencias", "title": "Pendências", "headers": PENDING_HEADERS,
        "rows": rows,
        "summary": (
            f"{len(rows)} registros pendentes por docente no período {data['periodo']}. "
            "Coautorias entre docentes podem aparecer mais de uma vez. "
            "Pendência não significa pontuação zero nem avaliação negativa da CAPES."
        ),
    }


def event_tabs(path):
    raw = read_json(path)
    catalog = engine.read_event_catalog(path)
    verified = raw.get("publicacoes_verificadas", [])
    reviewed = raw.get("publicacoes_em_verificacao", [])
    verified_count = Counter(p["evento_id"] for p in verified)
    review_count = Counter(p["evento_id"] for p in reviewed)
    event_rows = []
    for event in sorted(raw["eventos"], key=lambda e: (e["nome"].casefold(), e["id"])):
        canonical = catalog.eventos[event["id"]]
        h5, ce, induction = (event.get(k) or {} for k in ("h5", "ce_sbc", "inducao"))
        gt = event["gt"]
        base, candidate, criterion = engine._candidate_band(canonical)
        recommendations = [
            f"{r['ce']}: {CE.get(r['categoria'], r['categoria'])} "
            f"(lista {r['versao_lista']}, linha {r['linha']})"
            for r in ce.get("recomendacoes", [])
        ]
        ce_text = lines(([CE[ce["categoria"]]] if ce.get("categoria") else []) + recommendations)
        induction_text = None
        if induction:
            induction_text = (
                f"{induction.get('nome_sociedade') or induction['sociedade']}; "
                f"tradição: {induction['tradicao_anos']} anos em {induction['ano_referencia']}; "
                f"principal nacional: {'sim' if induction['principal_nacional'] else 'não'}; "
                f"aderência à Computação: {'sim' if induction['aderencia_computacao'] else 'não'}"
            )
        metric_sources = []
        for field in ("h5", "h5_busca", "evidencias_h5", "ce_sbc", "inducao",
                      "reconciliacao_series", "identificacao"):
            metric_sources.extend(urls(event.get(field)))
        gt_state = ("Verificados nas edições indicadas" if gt.get("atende") is True
                    else "Não atendidos" if gt.get("atende") is False else "Não verificados")
        years = gt.get("anos_validos")
        if gt.get("atende") is True and years is None:
            gt_state = "Verificados; escopo de anos não delimitado"
        event_rows.append([
            event["nome"], event["id"], TRAIL.get(event["trilha"], event["trilha"]),
            f"{candidate} — condicional" if candidate else "Sem faixa candidata",
            h5.get("valor"), H5_STATUS[canonical["h5_status"]],
            gt_state, lines(years) if years is not None else None, base,
            f"{h5['ano']} ({h5.get('periodo', '')})" if h5 else None,
            h5.get("consultado_em") or (event.get("h5_busca") or {}).get("consultado_em"),
            ce_text, induction_text, criterion, lines(event["aliases"]),
            lines(unique(metric_sources)), lines(urls(gt)), "\n\n".join(notes(event)) or None,
            verified_count[event["id"]], review_count[event["id"]],
        ])
    work_rows = []
    for collection, label in ((verified, "Verificado"), (reviewed, "Em revisão")):
        for pub in collection:
            event = catalog.eventos[pub["evento_id"]]
            result = engine.classify_event(pub, catalog)
            if result.get("evento_id") != pub["evento_id"]:
                raise ValueError(f"Evidência identificada em outro evento: {pub['titulo']}")
            _, candidate, _ = engine._candidate_band(event)
            gt = event["gt"]
            if gt["anos_validos"] is not None and pub["ano"] not in gt["anos_validos"]:
                gt_state = "Edição não verificada"
            elif gt["atende"] is None:
                gt_state = "Não verificado"
            elif gt["atende"] is False:
                gt_state = "Não atendido"
            else:
                gt_state = ("Verificado" if gt["anos_validos"] is not None
                            else "Verificado; anos não delimitados")
            actual_status = STATUS.get(result["status"], result["status"])
            if result.get("fora_formula"):
                actual_status += " — fora da fórmula A1–A4"
            blocked = pub.get("bloquear_faixa") if label == "Em revisão" else None
            candidate_text = f"{candidate} — condicional" if candidate else None
            if result.get("faixa_evento_bloqueada"):
                candidate_text = "Bloqueada pela revisão"
            correction = pub.get("corrigir_tipo_origem")
            if isinstance(correction, bool):
                correction = "Sim" if correction else "Não"
            work_rows.append([
                pub["ano"], pub["titulo"], event["nome"], actual_status,
                result.get("faixa"), result.get("pontos"),
                TYPES.get(pub.get("tipo"), "Ainda não comprovada"), gt_state,
                "Sim" if blocked is True else "Não" if blocked is False else "Não se aplica",
                pub["veiculo"], pub["evento_id"], label, candidate_text,
                lines(result.get("pendencias_evento", [])), pub["nota"],
                lines(urls(pub["fontes"])), lines(urls(result.get("fontes_evento", []))),
                pub.get("verificado_em"), pub.get("aderencia"), correction,
            ])
    work_rows.sort(key=lambda r: (r[2].casefold(), r[0], r[1].casefold(), r[9]))
    if len({(r[1], r[0], r[9]) for r in work_rows}) != len(work_rows):
        raise ValueError("Evidência de evento duplicada por título, ano e veículo.")
    all_sources = set(urls(raw))
    exported_sources = {
        line for row in event_rows + work_rows for cell in row if isinstance(cell, str)
        for line in cell.splitlines() if line.startswith(("http://", "https://"))
    }
    if not all_sources <= exported_sources:
        raise ValueError("Há fontes de eventos não representadas nas abas; revisar o exportador.")
    scope = (
        f"{len(event_rows)} eventos/trilhas no catálogo de evidências, ciclo {raw['ciclo']}. "
        "Faixa candidata é condicional: exige comprovação da modalidade de artigo completo, "
        "dos critérios GT da edição e de métrica/critério admissível. "
        "H5 não verificado não equivale a zero. Workshops não herdam a faixa principal. "
        "Alterações precisam de validação e atualização conjunta do sistema; "
        "não há sincronização automática de edições feitas na planilha para o SiADoce."
    )
    works_scope = (
        f"{len(work_rows)} chaves bibliográficas de evidências: {len(verified)} verificadas "
        f"e {len(reviewed)} em revisão. Não é o inventário completo da produção. "
        "Uma linha por título, ano e veículo exatos, sem multiplicar coautorias docentes. "
        "Verificado não significa elegível: resumos e outras modalidades são identificados. "
        "A5–A8 ficam fora da fórmula A1–A4; peso ausente não significa zero."
    )
    return [
        {"key": "eventos", "title": "Eventos", "headers": EVENT_HEADERS,
         "rows": event_rows, "summary": scope},
        {"key": "eventos_trabalhos", "title": "Eventos — trabalhos", "headers": WORK_HEADERS,
         "rows": work_rows, "summary": works_scope},
    ]


def load_ranking_module():
    path = Path(__file__).with_name("gerar-ranking-periodicos.py")
    spec = importlib.util.spec_from_file_location("siadoce_ranking_for_package", path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


def summarize(production, ranking, tabs):
    all_records = list(records(production))
    type_counts = Counter(p["tipo"] for _, _, p in all_records)
    status_counts = Counter(p["status"] for _, _, p in all_records)
    annual_status = Counter(y["pontos_status"] for d in production["docentes"] for y in d["anos"])
    return {
        "total_registros": len(all_records),
        "periodicos_registros": type_counts["periodico"],
        "eventos_registros": type_counts["anais_congressos"],
        "pendentes_periodicos": sum(p["tipo"] == "periodico" and is_pending(p)
                                    for _, _, p in all_records),
        "pendentes_eventos": sum(p["tipo"] == "anais_congressos" and is_pending(p)
                               for _, _, p in all_records),
        "pendentes_total": sum(is_pending(p) for _, _, p in all_records),
        "periodicos_unicos": len(ranking["values"]),
        "publicacoes_periodicos_unicas": len(ranking["articles"]),
        "docentes_com_publicacao_periodico": ranking["resumo"]["docentes_com_publicacao_periodico"],
        "docentes": len(production["docentes"]),
        "docentes_ano": sum(len(d["anos"]) for d in production["docentes"]),
        "cvs_disponiveis": sum(d["lattes_status"] == "disponivel" for d in production["docentes"]),
        "cvs_ausentes": sum(d["lattes_status"] != "disponivel" for d in production["docentes"]),
        "cvs_sem_data": sum(not d.get("lattes_atualizado_em") for d in production["docentes"]),
        "ano_metrica_periodicos": production.get("snapshot_ano"),
        "registros_por_tipo": dict(sorted(type_counts.items())),
        "registros_por_status": dict(sorted(status_counts.items())),
        "cobertura_docente_ano": dict(sorted(annual_status.items())),
        "linhas_por_aba": {t["key"]: len(t["rows"]) for t in tabs},
    }


def validate_tabs(tabs):
    if tuple(t["key"] for t in tabs) != TAB_KEYS:
        raise ValueError("Conjunto ou ordem das abas do pacote inválido.")
    cell_count = 0
    for tab in tabs:
        headers = tab["headers"]
        if (not 1 <= len(headers) <= 40
                or any(not isinstance(h, str) or not 1 <= js_length(h) <= 200
                       or h != h.strip() or h.startswith(("=", "'")) for h in headers)
                or len(set(headers)) != len(headers)):
            raise ValueError(f"Cabeçalhos inválidos: {tab['title']}")
        if len(tab["rows"]) > 10000:
            raise ValueError(f"{tab['title']}: limite de 10 mil linhas excedido.")
        if tab.get("summary") is not None and (
            not isinstance(tab["summary"], str) or js_length(tab["summary"]) > 5000
        ):
            raise ValueError(f"{tab['title']}: descrição excede 5 mil caracteres ou não é texto.")
        cell_count += (len(tab["rows"]) + 1) * len(headers)
        for index, row in enumerate(tab["rows"], 2):
            if len(row) != len(headers):
                raise ValueError(f"{tab['title']}, linha {index}: número incorreto de colunas.")
            for cell in row:
                if cell is not None and type(cell) not in (str, int, float, bool):
                    raise ValueError(f"{tab['title']}, linha {index}: tipo de célula inválido.")
                if isinstance(cell, float) and not math.isfinite(cell):
                    raise ValueError("A planilha não aceita números infinitos ou NaN.")
                if type(cell) in (int, float) and abs(cell) > MAX_SAFE_INTEGER:
                    raise ValueError(f"{tab['title']}, linha {index}: número fora do limite seguro.")
                if isinstance(cell, str) and (js_length(cell) > 30000 or "\x00" in cell):
                    raise ValueError(f"{tab['title']}, linha {index}: texto excede 30 mil caracteres ou contém NUL.")
    if cell_count > 250000:
        raise ValueError("O pacote excede o limite de 250 mil células do importador Google.")


def validate_import_contract(payload):
    """Reject locally anything beyond the Apps Script importer's fixed limits."""
    validate_tabs(payload["tabs"])
    if not isinstance(payload["periodo"], str) or not 1 <= js_length(payload["periodo"]) <= 200:
        raise ValueError("Período ausente ou acima de 200 caracteres.")
    generated = payload["generated_at"]
    if not isinstance(generated, str) or not 1 <= js_length(generated) <= 40 or "T" not in generated:
        raise ValueError("Data de geração inválida.")
    try:
        datetime.fromisoformat(generated.replace("Z", "+00:00"))
    except ValueError as error:
        raise ValueError("Data de geração inválida.") from error
    methods = payload["methodology"]
    if len(methods) != 7:
        raise ValueError("A metodologia deve conter os sete rótulos gerenciados.")
    for method in methods:
        text = method["text"]
        if not isinstance(text, str) or not 1 <= js_length(text) <= 10000:
            raise ValueError(f"Metodologia '{method['label']}': limite de 10 mil caracteres excedido.")
    by_key = {tab["key"]: tab for tab in payload["tabs"]}
    summary = payload["resumo"]
    if len(by_key["pendencias"]["rows"]) != (
        summary["pendentes_periodicos"] + summary["pendentes_eventos"]
    ):
        raise ValueError("Há pendências de tipo não suportado pelo importador Google.")


def managed_methodology(production, ranking, tabs):
    """Only these seven labels are managed in the existing criteria sheet."""
    by_key = {tab["key"]: tab for tab in tabs}
    totals = ranking["resumo"]
    summary = summarize(production, ranking, tabs)
    reconciliations = []
    for decision in ranking["auditoria"].get("decisoes_aplicadas", []):
        title = decision.get("title") or "; ".join(decision.get("titles", []))
        details = (
            f"{title}: ano adotado {decision['year']}; DOI {decision.get('doi') or 'não informado'}. "
            f"{decision['reason']}"
        )
        if decision.get("sources"):
            details += "\nFontes: " + "\n".join(decision["sources"])
        reconciliations.append(details)
    reconciliation_text = (
        f"{len(reconciliations)} decisões bibliográficas aplicadas nesta atualização; "
        f"{totals['conflitos_ano_resolvidos']} artigos com divergência de ano reconciliada. "
        "As decisões pertencem ao levantamento e não alteram os registros originais dos currículos."
    )
    if reconciliations:
        reconciliation_text += "\n\n" + "\n\n".join(reconciliations)
    events_rows = by_key["eventos"]["rows"]
    verified = sum(row[18] for row in events_rows)
    reviewed = sum(row[19] for row in events_rows)
    return [
        {"key": "eventos_escopo", "label": "Eventos: Escopo",
         "text": by_key["eventos"]["summary"] + "\nFonte: " + engine.AREA_URL},
        {"key": "eventos_trabalhos", "label": "Eventos: Trabalhos",
         "text": by_key["eventos_trabalhos"]["summary"] + "\nFonte: " + engine.GT_URL},
        {"key": "eventos_atualizacao", "label": "Eventos: Fontes e atualização",
         "text": (
             f"Produção de referência atualizada em {production['atualizado_em']}: "
             f"{len(events_rows)} eventos/trilhas, {verified} verificações e {reviewed} revisões. "
             "Notas e fontes completas ficam nas abas Eventos e Eventos — trabalhos. "
             f"Pendências reúne {summary['pendentes_total']} registros por docente ainda sem "
             "classificação. Nenhum registro pendente recebe pontos."
         )},
        {"key": "ranking_escopo", "label": "Periódicos dos docentes: escopo",
         "text": (
             f"Levantamento da produção de referência atualizada em {production['atualizado_em']}: "
             f"{summary['periodicos_unicos']} periódicos e "
             f"{summary['publicacoes_periodicos_unicas']} publicações únicas no período "
             f"{production['periodo']}, incluindo classificação pendente. "
             f"A base acompanha {summary['docentes']} docentes; "
             f"{totals['docentes_com_publicacao_periodico']} têm registros de periódicos e "
             f"{summary['cvs_ausentes']} estão sem currículo disponível. "
             "As contagens descrevem os registros localizados e não certificam completude. "
             "O último ano pode ter cobertura parcial."
         )},
        {"key": "ranking_contagem", "label": "Periódicos dos docentes: contagem",
         "text": (
             "Ordenação decrescente por Publicações únicas, com desempate alfabético. "
             "Coautorias entre docentes contam uma vez no total e no ano. "
             "Identificação por DOI ou título normalizado dentro da mesma identidade de periódico, "
             "com correções individuais documentadas. Registros por docente preserva "
             f"{summary['periodicos_registros']} ocorrências; a deduplicação resulta em "
             f"{summary['publicacoes_periodicos_unicas']} publicações. "
             f"Docentes distintos na base: {totals['docentes_com_publicacao_periodico']}, sem somar "
             "a mesma pessoa em periódicos diferentes. "
             f"Correções editoriais incluídas: {totals['correcoes_editoriais_incluidas']}; "
             "são publicações distintas do artigo original. Zero significa nenhum registro localizado. "
             "Frequência bibliográfica não determina pontuação CAPES ou recredenciamento."
         )},
        {"key": "ranking_reconciliacoes", "label": "Periódicos dos docentes: anos reconciliados",
         "text": reconciliation_text},
        {"key": "ranking_atualizacao", "label": "Periódicos dos docentes: atualização",
         "text": (
             "Atualize os PDFs dos currículos e execute o procedimento documentado no SiADoce. "
             "O script consolida a produção, valida as fontes e prepara o JSON das quatro abas "
             "geradas. Revise a prévia e importe esse JSON pelo atualizador da planilha Google. "
             "A planilha não consulta novos currículos automaticamente. "
             "Correções de identidade, ano e título devem ser registradas nas fontes do sistema "
             "para serem preservadas. As abas de métricas Scopus/JCR não são sobrescritas. "
             "Percentis e H5 continuam usando a referência cadastrada; mudar a edição das métricas "
             "é uma atualização separada. Dados ausentes permanecem vazios, sem inventar zero ou A8."
         )},
    ]


def prepare_package(root, generated_at=None):
    root = Path(root).resolve()
    production_path = root / "data/controle/producao-docente.json"
    production = read_json(production_path)
    validate_production(production)
    checked = validate_sources(root, production)
    production_hash = sha256(production_path)
    revision_path = root / "data/controle/ranking-periodicos-revisoes.json"
    revisions = read_json(revision_path)
    ranking = load_ranking_module().gerar_payload(
        production, revisions, source_sha256=production_hash,
        source_updated_at=production.get("atualizado_em"),
    )
    if ranking.get("conflitos"):
        raise ValueError("O ranking possui conflitos bibliográficos; revise antes de importar.")
    ranking_tab = {
        "key": "ranking_periodicos", "title": "Periódicos dos docentes",
        "headers": [str(header) for header in ranking["headers"]], "rows": ranking["values"],
        "summary": (
            "Publicações únicas em periódicos, ordenadas pela quantidade decrescente. "
            "Coautorias entre docentes contam uma única vez; variantes bibliográficas "
            "exigem identidade segura ou revisão explícita."
        ),
    }
    tabs = [ranking_tab, pending_tab(production)]
    tabs.extend(event_tabs(root / "data/controle/eventos-capes.json"))
    validate_tabs(tabs)
    checked["ranking_revisoes"] = {
        "arquivo": revision_path.relative_to(root).as_posix(), "sha256": sha256(revision_path),
    }
    methodology = managed_methodology(production, ranking, tabs)
    payload = {
        "schema_version": 1, "kind": "siadoce.planilha",
        "generated_at": generated_at or datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "periodo": production["periodo"], "anos": production["anos"],
        "production_sha256": production_hash, "source_hashes": checked,
        "resumo": summarize(production, ranking, tabs),
        "tabs": tabs, "methodology": methodology,
    }
    validate_import_contract(payload)
    stable = {k: v for k, v in payload.items() if k != "generated_at"}
    payload["content_sha256"] = hashlib.sha256(json_bytes(stable)).hexdigest()
    serialized_package(payload)
    return payload


def comparison_report(current, previous):
    if previous is None:
        return ["Primeiro pacote nesta pasta; não há comparação anterior."]
    if not isinstance(previous, dict) or (
        previous.get("kind") != "siadoce.planilha" or previous.get("schema_version") != 1
        or not isinstance(previous.get("resumo"), dict)
        or not isinstance(previous.get("tabs"), list)
        or not isinstance(previous.get("source_hashes", {}), dict)
        or any(not isinstance(source, dict) for source in previous.get("source_hashes", {}).values())
    ):
        return ["Comparação indisponível: o pacote anterior não tem um esquema reconhecido. "
                "As novas tabelas foram calculadas e validadas sem usar esse histórico."]
    out = ["Comparação com o pacote anterior:"]
    for field in ("total_registros", "periodicos_registros", "eventos_registros",
                  "periodicos_unicos", "publicacoes_periodicos_unicas",
                  "pendentes_periodicos", "pendentes_eventos"):
        before, after = previous["resumo"].get(field), current["resumo"][field]
        delta = f" ({after - before:+d})" if type(before) is int else ""
        out.append(f"- {field}: {before} → {after}{delta}")
    prior_tabs = {t["key"]: t for t in previous.get("tabs", [])
                  if isinstance(t, dict) and isinstance(t.get("key"), str)}
    for tab in current["tabs"]:
        prior = prior_tabs.get(tab["key"])
        changed = prior is None or (prior.get("headers"), prior.get("rows")) != (tab["headers"], tab["rows"])
        out.append(f"- {tab['title']}: {'dados alterados' if changed else 'dados idênticos'}; "
                   f"{len(tab['rows'])} linhas.")
    changed_sources = [
        name for name, source in current["source_hashes"].items()
        if previous.get("source_hashes", {}).get(name, {}).get("sha256") != source["sha256"]
    ]
    out.append("- Fontes com hash novo: " + (", ".join(changed_sources) or "nenhuma") + ".")
    return out


def render_report(payload, previous=None):
    r = payload["resumo"]
    out = [
        "SiADoce — atualização da planilha Google",
        f"Gerado em (UTC): {payload['generated_at']}",
        f"Período: {payload['periodo']}",
        f"Anos: {', '.join(map(str, payload['anos']))}",
        f"SHA-256 da produção: {payload['production_sha256']}",
        f"SHA-256 do conteúdo estável: {payload['content_sha256']}",
        "",
        f"Docentes: {r['docentes']}; registros por docente: {r['total_registros']}.",
        f"Periódicos: {r['periodicos_registros']} registros por docente; "
        f"{r['publicacoes_periodicos_unicas']} publicações únicas em {r['periodicos_unicos']} periódicos.",
        f"Eventos: {r['eventos_registros']} registros por docente.",
        f"Pendências: {r['pendentes_periodicos']} de periódicos e {r['pendentes_eventos']} "
        f"de eventos; total {r['pendentes_total']}.",
        "",
        f"Cobertura: {r['cvs_disponiveis']} CVs disponíveis; {r['cvs_ausentes']} ausentes; "
        f"{r['cvs_sem_data']} docentes sem data de atualização do CV.",
        "Situação por docente/ano:",
    ]
    out += [f"- {key}: {value}" for key, value in r["cobertura_docente_ano"].items()]
    out += [
        "Os registros localizados não comprovam completude do currículo.",
        "",
        f"Ano da referência de métricas de periódicos: {r['ano_metrica_periodicos']}.",
        "Este processo atualiza publicações e recalcula resultados com as evidências locais.",
        "Não consulta Scopus/JCR, não atualiza percentis/H5 e não resolve novas pendências sozinho.",
        "As faixas são referências locais, não uma classificação final da CAPES.",
        "",
        "Abas preparadas:",
    ]
    out += [f"- {tab['title']}: {len(tab['rows'])} linhas de dados, "
            f"{len(tab['headers'])} colunas." for tab in payload["tabs"]]
    out += ["", *comparison_report(payload, previous), "",
            "Nenhuma chamada de rede foi feita. As fontes originais não foram alteradas.",
            "Importe atualizacao-planilha.json pelo atualizador da planilha Google após conferir esta prévia.",
            "Valores ausentes seguem vazios; não transformar pendências em zero ou faixa A8.", ""]
    return "\n".join(out)


def write_package(root, output_dir, generated_at=None, previous_package=None):
    """Validate completely, then replace output files; never rewrite source data."""
    output_dir = Path(output_dir).resolve()
    target = output_dir / PACKAGE_NAME
    previous_path = Path(previous_package).resolve() if previous_package else target
    try:
        previous = read_json(previous_path) if previous_path.exists() else None
    except (ValueError, OSError):
        previous = {"historico_invalido": True}
    payload = prepare_package(root, generated_at)
    report = render_report(payload, previous)
    output_dir.mkdir(parents=True, exist_ok=True)
    content = serialized_package(payload)
    staged = []
    for path, text in ((output_dir / REPORT_NAME, report), (target, content)):
        temporary = path.with_suffix(path.suffix + ".tmp")
        temporary.write_text(text, encoding="utf-8")
        staged.append((temporary, path))
    for temporary, path in staged:
        temporary.replace(path)
    return payload


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--output-dir", type=Path, required=True)
    parser.add_argument("--previous-package", type=Path,
                        help="Pacote de uma execução anterior, usado apenas para comparação.")
    args = parser.parse_args(argv)
    payload = write_package(args.root, args.output_dir, previous_package=args.previous_package)
    print(json.dumps({
        "arquivo": str(args.output_dir.resolve() / PACKAGE_NAME),
        "relatorio": str(args.output_dir.resolve() / REPORT_NAME),
        "resumo": payload["resumo"], "content_sha256": payload["content_sha256"],
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    try:
        main()
    except (ValueError, OSError, KeyError) as error:
        conflicts = getattr(error, "conflitos", None)
        if conflicts:
            print(json.dumps({"conflitos": conflicts}, ensure_ascii=False, indent=2), file=sys.stderr)
        raise SystemExit(f"Não foi possível preparar a atualização: {error}")
