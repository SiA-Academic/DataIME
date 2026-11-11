"""Validate the local catalogue snapshot across its five sheets, without saving it.

The Google spreadsheet is maintained as a snapshot. This guard prevents importing
a stale Consulta after somebody edits only one of its supporting sheets.
"""
import argparse
from collections import Counter, defaultdict
from datetime import datetime, timedelta
import json
import math
from pathlib import Path
import re


CUTOFFS = {"A1": 87.5, "A2": 75, "A3": 62.5, "A4": 50,
           "A5": 37.5, "A6": 25, "A7": 12.5, "A8": 0}
SHEETS = ("Consulta", "Periódicos", "Critérios e fontes",
          "JCR — resumo", "JCR por categoria")
SHEET_WIDTHS = dict(zip(SHEETS, (11, 20, 26, 11, 13)))
SPREADSHEET_ID = "1TF6Fhi7EjhiSU59mGqVsbbR55OeQdjZiTvHvhSxLeOc"
SPREADSHEET_URL = f"https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit"
SNAPSHOT_KIND = "siadoce.catalogo-periodicos"
MAX_JSON_BYTES = 32 * 1024 * 1024
MAX_SHEET_ROWS = 20_000
MAX_CELLS = 1_000_000
SHEET_ERRORS = {"#N/A", "#REF!", "#VALUE!", "#DIV/0!", "#NUM!", "#NAME?",
                "#ERROR!", "#NULL!", "#SPILL!", "#CALC!", "#LOADING!"}


def fail(location, detail):
    raise ValueError(f"Catálogo inconsistente — {location}: {detail}")


def empty(value):
    return value is None or value == ""


def equal(actual, expected, location):
    if not ((empty(actual) and empty(expected)) or actual == expected):
        fail(location, f"esperado {expected!r}; encontrado {actual!r}. "
             "Atualize todas as abas relacionadas e exporte novamente.")


def percentile(value, location):
    if empty(value):
        return None
    if (isinstance(value, bool) or not isinstance(value, (int, float))
            or not math.isfinite(value) or not 0 <= value <= 100):
        fail(location, "o percentil deve ser número finito entre 0 e 100 ou vazio.")
    return value


def band(value):
    if value is None:
        return None
    return next(label for label, minimum in CUTOFFS.items() if value >= minimum)


def metric_year(value, location):
    if (isinstance(value, bool) or not isinstance(value, (int, float))
            or not math.isfinite(value) or not 1900 <= value <= 2200
            or value != int(value)):
        fail(location, "ano da métrica ausente ou inválido.")
    return int(value)


def identifier(value, location):
    if not isinstance(value, str) or not re.fullmatch(r"[1-9]\d*", value):
        fail(location, "Scopus Source ID deve ser texto com um identificador numérico válido.")
    return value


def issn(value, location):
    if empty(value):
        return ""
    if not isinstance(value, str):
        fail(location, "ISSN/eISSN deve ser texto, preservando zeros iniciais.")
    value = value.replace("-", "").upper().strip()
    if not re.fullmatch(r"\d{7}[\dX]", value):
        fail(location, "ISSN/eISSN inválido.")
    if sum((10 if char == "X" else int(char)) * (8 - i)
           for i, char in enumerate(value)) % 11:
        fail(location, "dígito verificador do ISSN/eISSN inválido.")
    return value


def sheet_rows(sheets, title, header_row, columns):
    rows = sheets[title]
    if len(rows) < header_row:
        fail(title, "cabeçalho ausente.")
    if len(rows[header_row - 1]) != columns:
        fail(title, f"esperadas {columns} colunas.")
    header = tuple(rows[header_row - 1])
    if any(not isinstance(value, str) or not value.strip() for value in header):
        fail(title, "cabeçalho vazio ou não textual.")
    if len(set(header)) != len(header):
        fail(title, "cabeçalhos repetidos.")
    for rn, row in enumerate(rows[header_row:], header_row + 1):
        if not any(not empty(v) for v in row):
            continue
        if len(row) != columns or not isinstance(row[0], str) or not row[0].strip():
            fail(f"{title}!{rn}", "linha incompleta ou estrutura inesperada.")
        yield rn, row, header


def split_categories(value):
    return {part.strip() for part in str(value or "").split(";") if part.strip()}


def validate_snapshot(snapshot):
    """Validate source identity, JSON shapes and all cross-sheet values.

    Return compact counts without changing the snapshot or coercing identifiers.
    This is also the validation entry point for a freshly downloaded Google export.
    """
    sheets = snapshot_sheets(snapshot)
    records, title_keys, years, metric_headers = {}, {}, set(), {}
    for rn, row, header in sheet_rows(sheets, "Periódicos", 6, 20):
        if header[0] != "Periódico" or header[12] != "Scopus Source ID":
            fail("Periódicos", "cabeçalhos não reconhecidos.")
        metric_headers["CiteScore"] = header[3]
        sid = identifier(row[12], f"Periódicos!M{rn}")
        if sid in records:
            fail(f"Periódicos!M{rn}", f"Source ID duplicado: {sid}.")
        p = percentile(row[2], f"Periódicos!C{rn}")
        equal(row[1], band(p) or "Sem percentil", f"Periódicos!B{rn} (faixa/cache)")
        if p is not None:
            years.add(metric_year(row[11], f"Periódicos!L{rn}"))
        key = (row[0], issn(row[6], f"Periódicos!G{rn}"),
               issn(row[7], f"Periódicos!H{rn}"))
        if key in title_keys:
            fail(f"Periódicos!A{rn}", "título e ISSNs duplicados para Source IDs diferentes.")
        title_keys[key] = sid
        records[sid] = {"title": row[0], "issn": key[1], "eissn": key[2],
                        "area": row[4], "scopus": p}
    if not records:
        fail("Periódicos", "nenhum periódico encontrado.")

    groups, category_keys = defaultdict(list), set()
    for rn, row, header in sheet_rows(sheets, "JCR por categoria", 1, 13):
        if header[0] != "Periódico" or header[11] != "Scopus Source ID":
            fail("JCR por categoria", "cabeçalhos não reconhecidos.")
        metric_headers["JIF por categoria"] = header[6]
        sid = identifier(row[11], f"JCR por categoria!L{rn}")
        if sid not in records:
            fail(f"JCR por categoria!L{rn}", f"Source ID fora do catálogo: {sid}.")
        c = records[sid]
        equal(row[0], c["title"], f"JCR por categoria!A{rn}")
        current_ids = {c["issn"], c["eissn"]} - {""}
        exported_ids = {issn(row[1], f"JCR por categoria!B{rn}"),
                        issn(row[2], f"JCR por categoria!C{rn}")} - {""}
        # Original JCR may carry an old print ISSN and the current eISSN.
        if not current_ids.intersection(exported_ids):
            fail(f"JCR por categoria!B{rn}:C{rn}", "nenhum ISSN corresponde ao periódico.")
        if empty(row[4]) or (sid, row[4]) in category_keys:
            fail(f"JCR por categoria!E{rn}", "categoria vazia ou repetida para o periódico.")
        category_keys.add((sid, row[4]))
        p = percentile(row[7], f"JCR por categoria!H{rn}")
        equal(row[8], band(p), f"JCR por categoria!I{rn}")
        years.add(metric_year(row[3], f"JCR por categoria!D{rn}"))
        rank, total = row[9:11]
        if not (empty(rank) and empty(total)):
            if (not all(isinstance(x, (int, float)) and not isinstance(x, bool)
                        and math.isfinite(x) and x == int(x) for x in (rank, total))
                    or not 1 <= rank <= total):
                fail(f"JCR por categoria!J{rn}:K{rn}", "posição/total inválidos.")
        groups[sid].append({"category": row[4], "percentile": p,
                            "jif": row[6], "rank": rank, "total": total})

    seen_summary = set()
    for rn, row, header in sheet_rows(sheets, "JCR — resumo", 1, 11):
        if header[0] != "Periódico" or header[4:6] != ("ISSN", "EISSN"):
            fail("JCR — resumo", "cabeçalhos não reconhecidos.")
        metric_headers["JIF resumo"] = header[3]
        key = (row[0], issn(row[4], f"JCR — resumo!E{rn}"),
               issn(row[5], f"JCR — resumo!F{rn}"))
        sid = title_keys.get(key)
        if sid is None or sid in seen_summary:
            fail(f"JCR — resumo!A{rn}", "título/ISSNs fora do catálogo ou repetidos.")
        seen_summary.add(sid)
        group = groups[sid]
        maximum = max((g["percentile"] for g in group if g["percentile"] is not None), default=None)
        records[sid]["jcr"] = maximum
        equal(percentile(row[2], f"JCR — resumo!C{rn}"), maximum, f"JCR — resumo!C{rn}")
        equal(row[1], band(maximum), f"JCR — resumo!B{rn}")
        winners = [g for g in group if maximum is not None and g["percentile"] == maximum]
        equal(split_categories(row[6]), {g["category"] for g in winners}, f"JCR — resumo!G{rn}")
        equal(split_categories(row[10]), {g["category"] for g in group}, f"JCR — resumo!K{rn}")
        expected_positions = Counter(
            f'{int(g["rank"])}/{int(g["total"])}' if not empty(g["rank"]) else "N/A"
            for g in winners)
        actual_positions = Counter(
            part.strip() for part in str(row[7] or "").split(";") if part.strip())
        equal(actual_positions, expected_positions, f"JCR — resumo!H{rn}")
        if group:
            if any(g["jif"] != group[0]["jif"] for g in group):
                fail(f"JCR — resumo!D{rn}", "JIF divergente entre categorias.")
            equal(row[3], group[0]["jif"], f"JCR — resumo!D{rn}")
        else:
            equal(row[3], None, f"JCR — resumo!D{rn}")
        row_year = metric_year(row[8], f"JCR — resumo!I{rn}")
        years.add(row_year)
        allowed_status = ({"Percentil disponível"} if maximum is not None
                          else {"JCR sem percentil numérico"} if group
                          else {f"Não encontrado no resultado JCR {row_year}",
                                "Título anterior; sem correspondência atual"})
        if row[9] not in allowed_status:
            fail(f"JCR — resumo!J{rn}", "disponibilidade não corresponde às categorias.")
    if seen_summary != set(records):
        fail("JCR — resumo", "o conjunto de periódicos difere de Periódicos.")
    if len(years) != 1:
        fail("ano da métrica", f"anos misturados ou ausentes: {sorted(years)}.")
    year = next(iter(years))
    equal(metric_headers.get("CiteScore"), f"CiteScore {year}", "Periódicos!D6 (ano do cabeçalho)")
    equal(metric_headers.get("JIF resumo"), f"JIF {year}", "JCR — resumo!D1 (ano do cabeçalho)")
    if category_keys:
        equal(metric_headers.get("JIF por categoria"), f"JIF {year}",
              "JCR por categoria!G1 (ano do cabeçalho)")

    seen_consulta = set()
    for rn, row, header in sheet_rows(sheets, "Consulta", 1, 11):
        if (header[0] != "Periódico" or header[10] != "Scopus Source ID"
                or header[4] not in (f"Scopus {year}", f"Percentil Scopus {year}")
                or header[5] not in (f"JCR {year}", f"Percentil JCR {year}")):
            fail("Consulta", "cabeçalhos de percentil/ano não reconhecidos.")
        sid = identifier(row[10], f"Consulta!K{rn}")
        if sid not in records or sid in seen_consulta:
            fail(f"Consulta!K{rn}", "Source ID fora do catálogo ou repetido.")
        seen_consulta.add(sid)
        c = records[sid]
        for actual, expected, col in [(row[0], c["title"], "A"),
                                      (issn(row[6], f"Consulta!G{rn}"), c["issn"], "G"),
                                      (issn(row[7], f"Consulta!H{rn}"), c["eissn"], "H"),
                                      (row[8], c["area"], "I")]:
            equal(actual, expected, f"Consulta!{col}{rn}")
        sp, jp = c["scopus"], c["jcr"]
        equal(percentile(row[4], f"Consulta!E{rn}"), sp, f"Consulta!E{rn} versus Periódicos")
        equal(percentile(row[5], f"Consulta!F{rn}"), jp, f"Consulta!F{rn} versus JCR por categoria")
        available = [v for v in (sp, jp) if v is not None]
        maximum = max(available) if available else None
        basis = None if maximum is None else "Scopus e JCR" if sp == jp else "Scopus" if sp == maximum else "JCR"
        availability = ("Percentil nas duas bases" if sp is not None and jp is not None
                        else "Percentil somente no Scopus" if sp is not None
                        else "Percentil somente no JCR" if jp is not None
                        else "Sem percentil disponível")
        equal(percentile(row[2], f"Consulta!C{rn}"), maximum, f"Consulta!C{rn}")
        equal(row[1], band(maximum) or "Sem percentil", f"Consulta!B{rn}")
        equal(row[3], basis, f"Consulta!D{rn}")
        equal(row[9], availability, f"Consulta!J{rn}")
    if seen_consulta != set(records):
        fail("Consulta", "o conjunto de Source IDs difere de Periódicos.")

    # The explanatory cutoffs must agree with the calculation implemented above.
    method_rows = sheets["Critérios e fontes"]
    found_cutoffs = {}
    for row in method_rows:
        if len(row) >= 3 and row[1] in CUTOFFS:
            if row[1] in found_cutoffs:
                fail("Critérios e fontes", "faixa repetida na tabela de cortes.")
            found_cutoffs[row[1]] = percentile(row[0], f"Critérios e fontes (mínimo {row[1]})")
            minimum = CUTOFFS[row[1]]
            equal(percentile(row[2], f"Critérios e fontes (máximo {row[1]})"),
                  100 if row[1] == "A1" else minimum + 12.5,
                  f"Critérios e fontes (limite superior {row[1]})")
    equal(found_cutoffs, CUTOFFS, "Critérios e fontes (cortes A1–A8)")
    return {"periodicos": len(records), "categorias_jcr": len(category_keys),
            "ano_metrica": year, "abas_validadas": len(SHEETS)}


def snapshot_sheets(snapshot):
    """Check the versioned Google source and the rectangular evaluated matrices."""
    if not isinstance(snapshot, dict):
        fail("JSON", "objeto raiz ausente ou inválido.")
    if type(snapshot.get("schema_version")) is not int or snapshot["schema_version"] != 1:
        fail("schema_version", "versão de catálogo não reconhecida.")
    for key, expected in (("kind", SNAPSHOT_KIND), ("spreadsheet_id", SPREADSHEET_ID),
                          ("spreadsheet_url", SPREADSHEET_URL)):
        if snapshot.get(key) != expected:
            fail(key, "identidade da planilha Google não reconhecida.")
    exported_at = snapshot.get("exported_at")
    if not isinstance(exported_at, str) or not re.fullmatch(
            r"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|\+00:00)", exported_at):
        fail("exported_at", "data de exportação deve usar ISO 8601 em UTC.")
    try:
        stamp = datetime.fromisoformat(exported_at.replace("Z", "+00:00"))
    except ValueError:
        fail("exported_at", "data de exportação inválida.")
    if stamp.utcoffset() != timedelta(0):
        fail("exported_at", "data de exportação deve estar em UTC.")
    sheets = snapshot.get("sheets")
    if not isinstance(sheets, dict):
        fail("abas", "objeto sheets ausente ou inválido.")
    missing = set(SHEETS) - sheets.keys()
    if missing:
        fail("abas", "ausentes: " + ", ".join(sorted(missing)))
    if set(sheets) - set(SHEETS):
        fail("abas", "abas inesperadas na exportação do catálogo.")
    cells = 0
    for title, width in SHEET_WIDTHS.items():
        rows = sheets[title]
        if not isinstance(rows, list) or not rows:
            fail(title, "matriz de células vazia ou inválida.")
        cells += len(rows) * width
        if len(rows) > MAX_SHEET_ROWS or cells > MAX_CELLS:
            fail(title, "o catálogo excede o limite de linhas ou células permitido.")
        for rn, row in enumerate(rows, 1):
            if not isinstance(row, list) or len(row) != width:
                fail(f"{title}!{rn}", f"esperadas {width} colunas em cada linha.")
            for cn, value in enumerate(row, 1):
                location = f"{title}!linha {rn}, coluna {cn}"
                if value is not None and type(value) not in (str, int, float, bool):
                    fail(location, "a célula deve conter um valor escalar JSON.")
                if type(value) in (int, float):
                    try:
                        finite = math.isfinite(value)
                    except OverflowError:
                        finite = False
                    if not finite:
                        fail(location, "a célula deve conter número finito representável.")
                if isinstance(value, str) and value.strip().upper() in SHEET_ERRORS:
                    fail(location, "célula contém erro de cálculo da planilha.")
    return sheets


def load_catalog_snapshot(path):
    """Read and fully validate a JSON Google snapshot; return its unmodified dict."""
    def reject_constant(value):
        fail("JSON", f"constante numérica não finita: {value}.")

    def unique_keys(pairs):
        result = {}
        for key, value in pairs:
            if key in result:
                fail("JSON", f"chave duplicada: {key}.")
            result[key] = value
        return result

    try:
        with Path(path).open("rb") as handle:
            payload = handle.read(MAX_JSON_BYTES + 1)
        if len(payload) > MAX_JSON_BYTES:
            fail("JSON", "o arquivo excede o limite de 32 MiB.")
        snapshot = json.loads(payload.decode("utf-8-sig"),
                              parse_constant=reject_constant, object_pairs_hook=unique_keys)
    except (json.JSONDecodeError, UnicodeError) as exc:
        raise ValueError(f"Catálogo JSON inválido: {path}: {exc}") from exc
    validate_snapshot(snapshot)
    return snapshot


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("json", type=Path)
    args = parser.parse_args()
    try:
        result = validate_snapshot(load_catalog_snapshot(args.json))
    except (ValueError, KeyError, OSError) as exc:
        parser.exit(1, str(exc) + "\n")
    print(json.dumps(result, ensure_ascii=False))


if __name__ == "__main__":
    main()
