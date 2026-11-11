"""Data-contract, provenance and regeneration checks for the Google package."""

from copy import deepcopy
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

SCRIPT = Path(__file__).with_name("preparar-atualizacao-planilha.py")
SPEC = importlib.util.spec_from_file_location("siadoce_sheet_package_tests", SCRIPT)
package = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(package)
ROOT = SCRIPT.parents[1]
FIXED_TIME = "2027-03-12T12:00:00+00:00"
SOURCE_URL = "https://example.org/evidence"


def write_json(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")


def journal(title="Publication", year=2027, status="fora_catalogo"):
    return {"ano": year, "titulo": title, "tipo": "periodico",
            "veiculo": "Journal X", "status": status, "faixa": None, "pontos": None,
            "motivo": "Evidência ainda não localizada."}


def event_catalog(with_proof=False):
    raw = {
        "schema_version": 1, "ciclo": "2025-2028", "ano_referencia": 2027,
        "atualizado_em": "2027-03-12", "eventos": [], "publicacoes_verificadas": [],
        "publicacoes_em_verificacao": [],
    }
    if with_proof:
        raw["eventos"] = [{
            "id": "conf-x", "nome": "Conference X", "aliases": ["Conference X"],
            "trilha": "principal", "h5_status": "nao_consultado",
            "gt": {"atende": None, "fontes": []},
        }]
        raw["publicacoes_verificadas"] = [{
            "evento_id": "conf-x", "ano": 2027, "titulo": "An event article",
            "veiculo": "Conference X", "tipo": "artigo_completo",
            "fontes": [SOURCE_URL], "nota": "Complete article verified.",
            "verificado_em": "2027-03-12",
        }]
    return raw


def make_fixture(root, publications=None, with_pdf=False, with_event_proof=False):
    years = [2026, 2027]
    faculty = {
        "id": "doc-1", "nome": "Example Faculty", "categoria": "pleno",
        "lattes_status": "disponivel" if with_pdf else "ausente",
        "lattes_atualizado_em": "2027-03-12" if with_pdf else None,
        "anos": [
            {"ano": year, "pontos_status": "parcial" if with_pdf else "cv_ausente",
             "publicacoes": [p for p in (publications or []) if p["ano"] == year]}
            for year in years
        ],
    }
    if with_pdf:
        pdf = root / "static/CVS_LATTES/Example.pdf"
        pdf.parent.mkdir(parents=True, exist_ok=True)
        pdf.write_bytes(b"fixture PDF content")
        faculty["lattes_pdf"] = "CVS_LATTES/Example.pdf"
        faculty["lattes_pdf_sha256"] = package.sha256(pdf)
    production = {
        "schema_version": 2, "periodo": "01/01/2026 a 12/03/2027", "anos": years,
        "atualizado_em": "2027-03-12T12:00:00Z", "snapshot_ano": 2025,
        "docentes": [faculty], "fontes": {}, "metodologia": {},
    }
    for name in sorted(package.REQUIRED_SOURCES):
        path = (root / "data/controle/eventos-capes.json" if name == "catalogo_eventos"
                else root / "fixture-inputs" / (name + ".txt"))
        if name == "catalogo_eventos":
            write_json(path, event_catalog(with_event_proof))
        else:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text("fixture " + name, encoding="utf-8")
        production["fontes"][name] = {
            "arquivo": path.relative_to(root).as_posix(), "sha256": package.sha256(path),
        }
    write_json(root / "data/controle/producao-docente.json", production)
    write_json(root / "data/controle/ranking-periodicos-revisoes.json", {
        "schema_version": 1, "publicacoes": [], "identificacoes_periodicos": [],
        "nomes_exibicao": {},
    })
    return production


class PackageTests(unittest.TestCase):
    def setUp(self):
        staging = (ROOT / "tmp/sheet-package-tests").resolve()
        staging.mkdir(parents=True, exist_ok=True)
        self.temp = tempfile.TemporaryDirectory(prefix="siadoce-package-", dir=staging)
        self.root = Path(self.temp.name)
        self.assertTrue(self.root.resolve().is_relative_to(staging))
        self.addCleanup(self.temp.cleanup)

    def test_future_years_and_five_journal_pending_states(self):
        statuses = ["fora_catalogo", "sem_percentil", "ambiguo", "conflito_identificacao", "pendente_tipo"]
        pubs = [journal(f"Paper {index}", status=status) for index, status in enumerate(statuses)]
        make_fixture(self.root, pubs)
        result = package.prepare_package(self.root, FIXED_TIME)
        ranking, pending = result["tabs"][:2]
        self.assertEqual(result["anos"], [2026, 2027])
        self.assertEqual(ranking["headers"][2:4], ["2026", "2027"])
        self.assertEqual(ranking["rows"][0][1:4], [5, 0, 5])
        self.assertEqual(len(pending["rows"]), 5)
        self.assertEqual({r[5] for r in pending["rows"]},
                         {package.STATUS[s] for s in statuses})
        self.assertIn("Modalidade em revisão", {r[5] for r in pending["rows"]})
        self.assertEqual(result["resumo"]["pendentes_periodicos"], 5)
        self.assertEqual(result["resumo"]["docentes_com_publicacao_periodico"], 1)
        self.assertEqual(result["resumo"]["cvs_ausentes"], 1)
        self.assertNotIn("2022", ranking["headers"])

    def test_event_null_metrics_and_points_are_not_zero(self):
        make_fixture(self.root, with_event_proof=True)
        result = package.prepare_package(self.root, FIXED_TIME)
        events, works = result["tabs"][2:]
        self.assertIsNone(events["rows"][0][4])
        self.assertIsNone(works["rows"][0][4])
        self.assertIsNone(works["rows"][0][5])
        self.assertEqual(works["rows"][0][6], "Artigo completo")
        self.assertEqual(events["rows"][0][18:20], [1, 0])
        self.assertEqual(works["headers"][0:6], package.WORK_HEADERS[0:6])
        self.assertIn(SOURCE_URL, works["rows"][0][15])

    def test_pending_summary_does_not_repeat_detailed_reasons(self):
        pub = journal("Pending conference paper", status="pendente_evento")
        pub["tipo"] = "anais_congressos"
        pub["pendencias_evento"] = [
            "Critérios do GT ainda não verificados.",
            "Falta comprovar a modalidade de artigo completo.",
        ]
        pub["motivo"] = "  ".join(pub["pendencias_evento"])
        data = make_fixture(self.root, [pub])
        row = package.pending_tab(data)["rows"][0]
        self.assertEqual(row[6], "\n".join(pub["pendencias_evento"]))
        pub["motivo"] = "Também falta identificar a trilha."
        data = make_fixture(self.root, [pub])
        row = package.pending_tab(data)["rows"][0]
        self.assertEqual(row[6], "\n".join([pub["motivo"], *pub["pendencias_evento"]]))

    def test_changed_source_stops_export(self):
        data = make_fixture(self.root)
        changed = self.root / data["fontes"]["periodicos"]["arquivo"]
        changed.write_text("new extraction", encoding="utf-8")
        with self.assertRaisesRegex(ValueError, "Produção desatualizada"):
            package.prepare_package(self.root, FIXED_TIME)

    def test_changed_pdf_stops_export_even_with_unchanged_extractions(self):
        make_fixture(self.root, with_pdf=True)
        (self.root / "static/CVS_LATTES/Example.pdf").write_bytes(b"new CV")
        with self.assertRaisesRegex(ValueError, "CVS_LATTES/Example.pdf"):
            package.prepare_package(self.root, FIXED_TIME)

    def test_missing_source_provenance_stops_export(self):
        data = make_fixture(self.root)
        del data["fontes"]["aliases"]
        write_json(self.root / "data/controle/producao-docente.json", data)
        with self.assertRaisesRegex(ValueError, "inventário completo"):
            package.prepare_package(self.root, FIXED_TIME)

    def test_hash_path_cannot_escape_root(self):
        data = make_fixture(self.root)
        data["fontes"]["aliases"]["arquivo"] = "../outside.txt"
        with self.assertRaisesRegex(ValueError, "fora da pasta"):
            package.validate_sources(self.root, data)

    def test_package_has_only_generated_tabs_and_managed_methodology(self):
        make_fixture(self.root, [journal()])
        result = package.prepare_package(self.root, FIXED_TIME)
        self.assertEqual(tuple(t["key"] for t in result["tabs"]), package.TAB_KEYS)
        self.assertEqual([t["title"] for t in result["tabs"]],
                         ["Periódicos dos docentes", "Pendências", "Eventos", "Eventos — trabalhos"])
        self.assertEqual(len(result["methodology"]), 7)
        self.assertIn("Periódicos dos docentes: atualização",
                      [m["label"] for m in result["methodology"]])
        self.assertEqual(result["resumo"]["publicacoes_periodicos_unicas"], 1)
        self.assertTrue(all(isinstance(h, str) for t in result["tabs"] for h in t["headers"]))

    def test_idempotence_ignores_only_generation_clock(self):
        make_fixture(self.root, [journal()])
        a = package.prepare_package(self.root, FIXED_TIME)
        b = package.prepare_package(self.root, "2027-03-13T12:00:00+00:00")
        self.assertEqual(a["content_sha256"], b["content_sha256"])
        a.pop("generated_at")
        b.pop("generated_at")
        self.assertEqual(a, b)

    def test_report_compares_previous_manifest_and_retains_literal_text(self):
        make_fixture(self.root, [journal("=untrusted title")])
        out = self.root / "output"
        first = package.write_package(self.root, out, FIXED_TIME)
        second = package.write_package(self.root, out, FIXED_TIME)
        self.assertEqual(first, second)
        report = (out / package.REPORT_NAME).read_text(encoding="utf-8")
        self.assertIn("dados idênticos", report)
        self.assertIn("Fontes com hash novo: nenhuma", report)
        self.assertEqual(second["tabs"][1]["rows"][0][4], "=untrusted title")

    def test_failure_does_not_replace_previous_package(self):
        make_fixture(self.root, [journal()])
        out = self.root / "output"
        package.write_package(self.root, out, FIXED_TIME)
        before = (out / package.PACKAGE_NAME).read_bytes()
        report = (out / package.REPORT_NAME).read_bytes()
        with patch.object(package, "load_ranking_module") as load:
            load.return_value.gerar_payload.side_effect = ValueError("Conflito bibliográfico")
            with self.assertRaisesRegex(ValueError, "Conflito bibliográfico"):
                package.write_package(self.root, out, FIXED_TIME)
        self.assertEqual((out / package.PACKAGE_NAME).read_bytes(), before)
        self.assertEqual((out / package.REPORT_NAME).read_bytes(), report)

    def test_pending_points_or_wrong_year_cannot_be_exported(self):
        data = make_fixture(self.root, [journal()])
        bad = deepcopy(data)
        bad["docentes"][0]["anos"][1]["publicacoes"][0]["pontos"] = 1
        with self.assertRaisesRegex(ValueError, "não classificado"):
            package.validate_production(bad)
        bad = deepcopy(data)
        bad["docentes"][0]["anos"][1]["publicacoes"][0]["ano"] = 2026
        with self.assertRaisesRegex(ValueError, "Ano da publicação"):
            package.validate_production(bad)

    def test_changed_record_count_is_visible_in_report(self):
        make_fixture(self.root, [journal()])
        before = package.prepare_package(self.root, FIXED_TIME)
        make_fixture(self.root, [journal(), journal("New publication")])
        after = package.prepare_package(self.root, FIXED_TIME)
        report = package.render_report(after, before)
        self.assertIn("total_registros: 1 → 2 (+1)", report)
        self.assertIn("Periódicos dos docentes: dados alterados", report)

    def test_external_previous_package_and_invalid_history_are_optional(self):
        make_fixture(self.root, [journal()])
        previous_dir = self.root / "old-output"
        package.write_package(self.root, previous_dir, FIXED_TIME)
        new_dir = self.root / "new-output"
        package.write_package(self.root, new_dir, FIXED_TIME,
                              previous_package=previous_dir / package.PACKAGE_NAME)
        self.assertIn("dados idênticos", (new_dir / package.REPORT_NAME).read_text(encoding="utf-8"))
        (previous_dir / package.PACKAGE_NAME).write_text("{invalid", encoding="utf-8")
        package.write_package(self.root, new_dir, FIXED_TIME,
                              previous_package=previous_dir / package.PACKAGE_NAME)
        self.assertIn("Comparação indisponível",
                      (new_dir / package.REPORT_NAME).read_text(encoding="utf-8"))

    def test_remote_string_limits_include_utf16_characters(self):
        make_fixture(self.root, [journal()])
        result = package.prepare_package(self.root, FIXED_TIME)
        tabs = deepcopy(result["tabs"])
        tabs[1]["rows"][0][4] = "😀" * 15000
        package.validate_tabs(tabs)
        tabs[1]["rows"][0][4] += "x"
        with self.assertRaisesRegex(ValueError, "30 mil"):
            package.validate_tabs(tabs)
        tabs = deepcopy(result["tabs"])
        tabs[1]["rows"][0][4] = "text\x00"
        with self.assertRaisesRegex(ValueError, "NUL"):
            package.validate_tabs(tabs)
        result["methodology"][0]["text"] = "x" * 10001
        with self.assertRaisesRegex(ValueError, "10 mil"):
            package.validate_import_contract(result)

    def test_remote_row_column_cell_and_numeric_limits(self):
        make_fixture(self.root, [journal()])
        result = package.prepare_package(self.root, FIXED_TIME)
        tabs = deepcopy(result["tabs"])
        tabs[1]["rows"] *= 10001
        with self.assertRaisesRegex(ValueError, "10 mil linhas"):
            package.validate_tabs(tabs)
        tabs = deepcopy(result["tabs"])
        tabs[1]["headers"] = [str(i) for i in range(41)]
        with self.assertRaisesRegex(ValueError, "Cabeçalhos"):
            package.validate_tabs(tabs)
        tabs = deepcopy(result["tabs"])
        for tab in tabs:
            tab["headers"] = [str(i) for i in range(20)]
            tab["rows"] = [[None] * 20] * 4000
        with self.assertRaisesRegex(ValueError, "250 mil células"):
            package.validate_tabs(tabs)
        tabs = deepcopy(result["tabs"])
        tabs[0]["rows"][0][1] = 2**53
        with self.assertRaisesRegex(ValueError, "limite seguro"):
            package.validate_tabs(tabs)

    def test_remote_byte_and_year_limits(self):
        with self.assertRaisesRegex(ValueError, "8 MiB"):
            package.serialized_package({"text": "é" * (package.MAX_BYTES // 2)})
        data = make_fixture(self.root)
        data["anos"] = list(range(1900, 2001))
        with self.assertRaisesRegex(ValueError, "Janela de anos"):
            package.validate_production(data)


class CurrentDataIntegrationTests(unittest.TestCase):
    def test_actual_sources_read_only_and_all_counts_reconcile(self):
        production_path = ROOT / "data/controle/producao-docente.json"
        if not production_path.exists():
            self.skipTest("Base local do SIADoce não está disponível.")
        before = package.sha256(production_path)
        data = package.read_json(production_path)
        actual = package.prepare_package(ROOT, FIXED_TIME)
        self.assertEqual(package.sha256(production_path), before)
        self.assertEqual(actual["production_sha256"], before)
        self.assertEqual(actual["resumo"]["total_registros"],
                         sum(len(y["publicacoes"]) for d in data["docentes"] for y in d["anos"]))
        by_key = {t["key"]: t for t in actual["tabs"]}
        self.assertEqual(actual["resumo"]["pendentes_total"], len(by_key["pendencias"]["rows"]))
        self.assertEqual(sum(r[1] for r in by_key["ranking_periodicos"]["rows"]),
                         actual["resumo"]["publicacoes_periodicos_unicas"])
        counts = [r[1] for r in by_key["ranking_periodicos"]["rows"]]
        self.assertEqual(counts, sorted(counts, reverse=True))
        events_raw = package.read_json(ROOT / "data/controle/eventos-capes.json")
        self.assertEqual(len(by_key["eventos"]["rows"]), len(events_raw["eventos"]))
        self.assertEqual(len(by_key["eventos_trabalhos"]["rows"]),
                         len(events_raw["publicacoes_verificadas"])
                         + len(events_raw["publicacoes_em_verificacao"]))
        self.assertEqual(len(actual["source_hashes"]),
                         len(data["fontes"]) + actual["resumo"]["cvs_disponiveis"] + 1)


if __name__ == "__main__":
    unittest.main()
