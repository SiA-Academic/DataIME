"""Cenários de produção em 2022–2025, acrescidos dos registros disponíveis de 2026."""
from datetime import date, datetime
import re

QUADRENNIUM = {
    "inicio": 2022, "fim_anos_completos": 2025, "fim": 2026, "minimos": [3, 4, 5],
    "faixas_periodicos": ["A1", "A2", "A3"],
    "faixas_congressos": ["A1", "A2"],
}


def analysis_criteria(extraction_period):
    """Preserve the Janus cutoff when the extraction reports exact dates."""
    dates = re.findall(r"\b\d{2}/\d{2}/\d{4}\b", extraction_period or "")
    cutoff = None
    if len(dates) >= 2:
        cutoff = min(datetime.strptime(dates[-1], "%d/%m/%Y").date(), date(QUADRENNIUM["fim"], 12, 31))
    return {**QUADRENNIUM, "data_corte": cutoff.isoformat() if cutoff else None}


def threshold_status(minimum, total, pending, complete):
    if total is None:
        return "sem_dados"
    if total >= minimum:
        return "atingiu"
    if not complete or total + pending >= minimum:
        return "em_aberto"
    return "abaixo"


def quadrennial_summary(annual, cv_available, cv_updated_at, complements=()):
    """Evaluate both thresholds on the same articles, preserving the annual references."""
    if not cv_available:
        return None
    start, end = QUADRENNIUM["inicio"], QUADRENNIUM["fim"]
    full_year_end = QUADRENNIUM["fim_anos_completos"]
    rows = [row for row in annual if start <= row["ano"] <= end]
    missing_years = sorted(set(range(start, full_year_end + 1)) - {row["ano"] for row in rows})
    coverage_notes = []
    if missing_years:
        coverage_notes.append("Anos fora da extração: " + ", ".join(map(str, missing_years)) + ".")
    if not cv_updated_at:
        coverage_notes.append("Data de atualização do currículo desconhecida.")
    elif date.fromisoformat(cv_updated_at) < date(full_year_end, 12, 31):
        coverage_notes.append(f"O currículo foi atualizado antes de 31/12/{full_year_end}.")

    available_cv_year = any(
        row["cobertura_temporal"] == "ate_atualizacao_cv" or row["publicacoes"] for row in rows
    )
    articles, pending = [], []
    journals = 0
    replaced = {
        (c["referencia_cv"]["ano"], c["referencia_cv"]["indice"]) for c in complements
        if "referencia_cv" in c
    }
    if available_cv_year:
        for row in rows:
            for index, pub in enumerate(row["publicacoes"]):
                if (row["ano"], index) in replaced:
                    continue
                journal = pub["tipo"] == "periodico"
                if not journal and pub["tipo"] != "anais_congressos":
                    continue
                ref = {"ano": row["ano"], "indice": index}
                if pub["status"] == "classificado":
                    bands = QUADRENNIUM["faixas_periodicos" if journal else "faixas_congressos"]
                    if pub["faixa"] in bands:
                        articles.append(ref)
                        if journal:
                            journals += 1
                elif journal or (pub["status"] == "pendente_evento" and not (
                    pub.get("match_method") in ("publicacao_evento_verificada", "publicacao_evento_em_verificacao")
                    and not pub.get("faixa_evento_bloqueada")
                    and pub.get("h5_status") in ("disponivel", "nao_localizado")
                    and pub.get("faixa_evento_referencia")
                    and pub["faixa_evento_referencia"] not in QUADRENNIUM["faixas_congressos"]
                )):
                    pending.append(ref)

    included = [c for c in complements if c["estado"] == "incluido"]
    journals += sum(c["tipo"] == "periodico" for c in included)
    total = len(articles) + len(included)
    pending_count = len(pending) + sum(c["estado"] == "pendente" for c in complements)
    available = available_cv_year or bool(complements)
    complete = not coverage_notes
    confirmed_total = total if available else None
    return {
        "periodicos": journals if available else None,
        "congressos": total - journals if available else None,
        "total": confirmed_total,
        "confirmados_fora_lattes": sum("referencia_cv" not in c for c in included),
        "pendentes": pending_count if available else None,
        "situacoes": {str(n): threshold_status(n, confirmed_total, pending_count, complete)
                      for n in QUADRENNIUM["minimos"]},
        "cobertura_completa": complete,
        "motivo_cobertura": " ".join(coverage_notes),
        "artigos": articles, "a_conferir": pending, "complementos": list(complements),
    }
