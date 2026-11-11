"""Focused regression tests for the cross-sheet catalogue import guard."""
import copy
import json
from pathlib import Path
import tempfile
import unittest

from validar_catalogo_periodicos import (CUTOFFS, SNAPSHOT_KIND, SPREADSHEET_ID,
                                         SPREADSHEET_URL, load_catalog_snapshot,
                                         validate_snapshot)


def fixture():
    p_header = ["Periódico", "Faixa Scopus", "Percentil (0–100)", "CiteScore 2025",
                "Área", "Status no cadastro", "ISSN", "EISSN", "Categoria do percentil",
                "Posição", "Total na categoria", "Ano da métrica", "Scopus Source ID",
                "Editora", "Cobertura Scopus", "Flag de descontinuação", "ASJC",
                "Categorias do cadastro", "Perfil Scopus", "Disponibilidade da métrica"]
    return {
        "schema_version": 1, "kind": SNAPSHOT_KIND,
        "spreadsheet_id": SPREADSHEET_ID, "spreadsheet_url": SPREADSHEET_URL,
        "exported_at": "2026-10-20T12:00:00Z", "sheets": {
        "Periódicos": [[None] * 20 for _ in range(5)] + [p_header,
            ["ACM Computing Surveys", "A2", 80, 5, "Computação", "Active",
             "03600300", "15577341", "Computer Science", 20, 100, 2025, "23038",
             "ACM", "2020-2026", None, "1700", "1700: Computer Science", "", "Disponível"],
            ["4OR", "Sem percentil", None, None, "Matemática", "Active",
             "16194500", "16142411", None, None, None, None, "145295",
             "Springer", "2020-2026", None, "2600", "2600: Mathematics", "", "Sem percentil"],
        ],
        "Consulta": [
            ["Periódico", "Faixa de referência", "Percentil usado", "Base do maior",
             "Percentil Scopus 2025", "Percentil JCR 2025", "ISSN", "EISSN", "Área",
             "Disponibilidade", "Scopus Source ID"],
            ["ACM Computing Surveys", "A2", 80, "Scopus", 80, 60,
             "0360-0300", "1557-7341", "Computação", "Percentil nas duas bases", "23038"],
            ["4OR", "Sem percentil", None, None, None, None, "1619-4500", "1614-2411",
             "Matemática", "Sem percentil disponível", "145295"],
        ],
        "JCR — resumo": [
            ["Periódico", "Faixa JCR", "Maior percentil JCR (0–100)", "JIF 2025",
             "ISSN", "EISSN", "Categoria(s) do maior percentil", "Posição / total",
             "Ano da métrica", "Disponibilidade JCR", "Categorias consultadas"],
            ["ACM Computing Surveys", "A4", 60, 5, "0360-0300", "1557-7341",
             "COMPUTER SCIENCE", "40/100", 2025, "Percentil disponível", "COMPUTER SCIENCE"],
            ["4OR", None, None, None, "1619-4500", "1614-2411", "", "", 2025,
             "Não encontrado no resultado JCR 2025", ""],
        ],
        "JCR por categoria": [
            ["Periódico", "ISSN", "EISSN", "Ano da métrica", "Categoria JCR", "Edição",
             "JIF 2025", "JIF Percentile (0–100)", "Faixa JCR", "Posição",
             "Total na categoria", "Scopus Source ID", "Lote"],
            ["ACM Computing Surveys", "0360-0300", "1557-7341", 2025,
             "COMPUTER SCIENCE", "SCIE", 5, 60, "A4", 40, 100, "23038", 1],
        ],
        "Critérios e fontes": [
            ["Percentil mínimo (inclusive)", "Faixa", "Limite superior"] + [None] * 23,
            *[[minimum, label, 100 if label == "A1" else minimum + 12.5] + [None] * 23
              for label, minimum in CUTOFFS.items()],
        ],
    }}


class CatalogueGuardTests(unittest.TestCase):
    def setUp(self):
        self.temp_parent = Path(__file__).resolve().parents[1] / "tmp/catalogue-json-tests"
        self.temp_parent.mkdir(parents=True, exist_ok=True)

    def test_coherent_snapshot_and_reordered_rows(self):
        book = fixture()
        for title, start in [("Consulta", 1), ("Periódicos", 6), ("JCR — resumo", 1)]:
            book["sheets"][title][start:] = reversed(book["sheets"][title][start:])
        self.assertEqual(validate_snapshot(book)["periodicos"], 2)

    def test_stale_consulta_after_scopus_change_is_rejected(self):
        book = fixture()
        book["sheets"]["Periódicos"][6][2] = 85  # Still A2; catches source drift, not only a band change.
        with self.assertRaisesRegex(ValueError, "Consulta!E2 versus Periódicos"):
            validate_snapshot(book)

    def test_stale_jcr_summary_after_category_change_is_rejected(self):
        book = fixture()
        book["sheets"]["JCR por categoria"][1][7] = 61  # Still A4.
        with self.assertRaisesRegex(ValueError, "JCR — resumo!C2"):
            validate_snapshot(book)

    def test_stale_consulta_after_coherent_jcr_update_is_rejected(self):
        book = fixture()
        book["sheets"]["JCR por categoria"][1][7] = 61
        book["sheets"]["JCR — resumo"][1][2] = 61
        with self.assertRaisesRegex(ValueError, "Consulta!F2 versus JCR por categoria"):
            validate_snapshot(book)

    def test_unknown_source_id_and_duplicate_source_id_are_rejected(self):
        for changed in ("999999", "23038"):
            with self.subTest(changed=changed):
                book = fixture()
                book["sheets"]["Consulta"][2][10] = changed
                with self.assertRaisesRegex(ValueError, "Source ID fora do catálogo ou repetido"):
                    validate_snapshot(book)

    def test_mismatched_category_identity_is_rejected(self):
        book = fixture()
        book["sheets"]["JCR por categoria"][1][11] = "145295"
        with self.assertRaisesRegex(ValueError, "JCR por categoria!A2"):
            validate_snapshot(book)

    def test_missing_percentile_is_not_a8_or_zero(self):
        for col, value in [(1, "A8"), (2, 0)]:
            with self.subTest(col=col):
                book = fixture()
                book["sheets"]["Consulta"][2][col] = value
                with self.assertRaisesRegex(ValueError, "Consulta!"):
                    validate_snapshot(book)

    def test_invalid_percentile_and_mixed_year_are_rejected(self):
        book = fixture()
        book["sheets"]["Periódicos"][6][2] = 101
        with self.assertRaisesRegex(ValueError, "entre 0 e 100"):
            validate_snapshot(book)
        book = fixture()
        book["sheets"]["JCR por categoria"][1][3] = 2026
        with self.assertRaisesRegex(ValueError, "anos misturados"):
            validate_snapshot(book)

    def test_documented_cutoffs_must_agree(self):
        book = fixture()
        book["sheets"]["Critérios e fontes"][5][0] = 38
        with self.assertRaisesRegex(ValueError, "cortes A1–A8"):
            validate_snapshot(book)

    def test_evaluated_band_must_agree_with_scopus_percentile(self):
        book = fixture()
        book["sheets"]["Periódicos"][6][1] = None
        with self.assertRaisesRegex(ValueError, "faixa/cache"):
            validate_snapshot(book)

    def test_legacy_headers_and_future_metric_year(self):
        book = fixture()
        book["sheets"]["Consulta"][0][4:6] = ["Scopus 2026", "JCR 2026"]
        book["sheets"]["Periódicos"][5][3] = "CiteScore 2026"
        book["sheets"]["Periódicos"][6][11] = 2026
        book["sheets"]["JCR por categoria"][0][6] = "JIF 2026"
        book["sheets"]["JCR por categoria"][1][3] = 2026
        book["sheets"]["JCR — resumo"][0][3] = "JIF 2026"
        for row in book["sheets"]["JCR — resumo"][1:]:
            row[8] = 2026
        book["sheets"]["JCR — resumo"][2][9] = "Não encontrado no resultado JCR 2026"
        self.assertEqual(validate_snapshot(book)["ano_metrica"], 2026)

    def test_na_jif_is_preserved_without_becoming_percentile(self):
        book = fixture()
        book["sheets"]["JCR por categoria"][1][6:9] = ["N/A", None, None]
        summary = book["sheets"]["JCR — resumo"][1]
        summary[1:4] = [None, None, "N/A"]
        summary[6:8] = ["", ""]
        summary[9] = "JCR sem percentil numérico"
        book["sheets"]["Consulta"][1][5] = None
        book["sheets"]["Consulta"][1][9] = "Percentil somente no Scopus"
        self.assertEqual(validate_snapshot(book)["periodicos"], 2)

    def test_source_identity_and_export_timestamp_are_required(self):
        cases = [("schema_version", True), ("schema_version", 2), ("kind", "other"),
                 ("spreadsheet_id", "other"), ("spreadsheet_url", "https://example.org"),
                 ("exported_at", "2026-10-20T12:00:00"),
                 ("exported_at", "2026-13-20T12:00:00Z"),
                 ("exported_at", "2026-10-20T12:00:00-03:00")]
        for key, value in cases:
            with self.subTest(key=key, value=value):
                snapshot = fixture()
                snapshot[key] = value
                with self.assertRaisesRegex(ValueError, key):
                    validate_snapshot(snapshot)

    def test_missing_extra_or_nonrectangular_sheets_are_rejected(self):
        for mutation in (lambda sheets: sheets.pop("Consulta"),
                         lambda sheets: sheets.update({"Outra": [[None]]}),
                         lambda sheets: sheets["Consulta"][1].pop(),
                         lambda sheets: sheets["Critérios e fontes"][0].pop(),
                         lambda sheets: sheets.update({"Consulta": []}),
                         lambda sheets: sheets["Consulta"].append("row")):
            snapshot = fixture()
            mutation(snapshot["sheets"])
            with self.assertRaises(ValueError):
                validate_snapshot(snapshot)

    def test_nonfinite_values_and_google_error_cells_are_rejected_anywhere(self):
        for value in (float("nan"), float("inf"), -float("inf"), 10 ** 400,
                      "#REF!", " #N/A ", "#VALUE!", {"formula": "=1+1"}):
            with self.subTest(value=value):
                snapshot = fixture()
                snapshot["sheets"]["Critérios e fontes"][0][25] = value
                with self.assertRaises(ValueError):
                    validate_snapshot(snapshot)

    def test_identifiers_must_remain_text_in_every_source_sheet(self):
        for title, row, col, value in (("Consulta", 1, 10, 23038),
                                       ("Periódicos", 6, 12, 23038),
                                       ("JCR por categoria", 1, 11, 23038),
                                       ("Consulta", 1, 6, 3600300),
                                       ("Periódicos", 6, 6, 3600300),
                                       ("JCR — resumo", 1, 4, 3600300),
                                       ("JCR por categoria", 1, 1, 3600300)):
            with self.subTest(sheet=title, col=col):
                snapshot = fixture()
                snapshot["sheets"][title][row][col] = value
                with self.assertRaisesRegex(ValueError, "texto"):
                    validate_snapshot(snapshot)

    def test_missing_headers_and_partial_rows_are_rejected(self):
        for row, col in ((0, 0), (0, 5), (1, 0)):
            snapshot = fixture()
            snapshot["sheets"]["Consulta"][row][col] = None
            with self.assertRaises(ValueError):
                validate_snapshot(snapshot)
        snapshot = fixture()
        snapshot["sheets"]["Consulta"].append([None] * 11)
        self.assertEqual(validate_snapshot(snapshot)["periodicos"], 2)

    def test_load_json_preserves_identifiers_and_does_not_mutate_source(self):
        snapshot = fixture()
        before = copy.deepcopy(snapshot)
        with tempfile.TemporaryDirectory(dir=self.temp_parent) as folder:
            path = Path(folder) / "catalogo.json"
            contents = json.dumps(snapshot, ensure_ascii=False).encode("utf-8")
            path.write_bytes(contents)
            loaded = load_catalog_snapshot(path)
            self.assertEqual(loaded, snapshot)
            self.assertEqual(loaded["sheets"]["Periódicos"][6][6], "03600300")
            self.assertEqual(path.read_bytes(), contents)
        self.assertEqual(snapshot, before)

    def test_json_loader_rejects_duplicates_nonfinite_and_bad_encoding(self):
        for contents in (b'{"schema_version": 1, "schema_version": 1}',
                         b'{"value": NaN}', b'{"value": Infinity}',
                         b'{"value": -Infinity}', b'{"value": 1e400}',
                         b'{"broken":', b'\xff'):
            with self.subTest(contents=contents):
                with tempfile.TemporaryDirectory(dir=self.temp_parent) as folder:
                    path = Path(folder) / "catalogo.json"
                    path.write_bytes(contents)
                    with self.assertRaises(ValueError):
                        load_catalog_snapshot(path)


if __name__ == "__main__":
    unittest.main()
