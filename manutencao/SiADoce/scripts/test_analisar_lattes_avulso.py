"""Análise avulsa: mesmo motor, cobertura incerta e isolamento do cadastro."""
import copy
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch


SPEC = importlib.util.spec_from_file_location(
    "analisar_lattes_avulso", Path(__file__).with_name("analisar-lattes-avulso.py"))
module = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(module)
engine = module.load_engine()
PDF_HASH = "a" * 64
NOW = "2026-10-20T12:00:00+00:00"


def publication(**changes):
    return {
        "ano": 2025, "tipo": "periodico", "titulo": "A journal article",
        "veiculo": "Example Journal",
        "referencia": "AUTHOR . A journal article. Example Journal, v. 1, p. 1-9, 2025.",
        **changes,
    }


def extraction(publications=None, **changes):
    return {
        "schema_version": 1, "nome_detectado": "A New Faculty",
        "lattes_id": "1234567890123456",
        "lattes_atualizado_em": "2025-06-01",
        "ano_inicio": 2025, "ano_fim": 2026,
        "secoes": {"periodicos": True, "eventos": False},
        "total_localizado_sem_recorte": 1, "total_fora_recorte": 0,
        "publicacoes": publications if publications is not None else [publication()],
        **changes,
    }


def sources(percentile=95):
    row = {
        "titulo_catalogo": "Example Journal", "source_id": "11",
        "issn": "1234-5678", "eissn": None,
        "percentil": percentile, "scopus": percentile, "jcr": None,
        "faixa": engine.band(percentile), "base": "Scopus" if percentile is not None else None,
        "disponibilidade": "Fixture",
    }
    return {
        "catalogo": [row], "titulos": {"example journal": [row]},
        "identificadores": {"12345678": [row]},
        "aliases": {}, "verificadas": {}, "homonimos": {},
        "eventos": None, "fontes": {"catalogo": {"arquivo": "fixture-catalogo.json", "sha256": "b" * 64}},
        "_paths": {},
    }


class CalculationTests(unittest.TestCase):
    def analyze(self, extracted=None, source=None, **kwargs):
        return module.classificar_extracao(
            extracted or extraction(), source or sources(), PDF_HASH,
            "curriculo.pdf", 2025, 2026, atualizado_em=NOW, **kwargs)

    def test_uses_existing_classifier_and_annual_summary(self):
        with patch.object(engine, "classify", wraps=engine.classify) as classify:
            with patch.object(engine, "annual_summary", wraps=engine.annual_summary) as annual:
                result = self.analyze()
        self.assertEqual(classify.call_count, 1)
        self.assertEqual(annual.call_count, 2)
        faculty = result["docentes"][0]
        self.assertEqual(result["modo"], "analise_avulsa")
        self.assertEqual(faculty["categoria"], "analise_avulsa")
        self.assertNotIn(faculty["categoria"], engine.ACTIVE)
        self.assertEqual(faculty["anos"][0]["pontos_referencia"], 1)
        self.assertIsNone(faculty["anos"][1]["pontos_referencia"])
        self.assertEqual(faculty["anos"][1]["pontos_status"], "ano_sem_cobertura_cv")

    def test_pending_journal_is_not_zero_or_a8(self):
        result = self.analyze(extraction([publication(veiculo="Unknown journal")]))
        annual = result["docentes"][0]["anos"][0]
        self.assertEqual(annual["pendentes"], 1)
        self.assertIsNone(annual["pontos_referencia"])
        self.assertIsNone(annual["publicacoes"][0]["faixa"])
        self.assertEqual(annual["pontos_status"], "parcial")

    def test_known_journal_without_percentile_is_not_zero(self):
        result = self.analyze(source=sources(None))
        pub = result["docentes"][0]["anos"][0]["publicacoes"][0]
        self.assertEqual(pub["status"], "sem_percentil")
        self.assertIsNone(pub["pontos"])
        self.assertIsNone(pub["faixa"])

    def test_unverified_event_remains_pending(self):
        result = self.analyze(extraction(
            [publication(tipo="anais_congressos", veiculo="Conference X")],
            secoes={"periodicos": False, "eventos": True}))
        annual = result["docentes"][0]["anos"][0]
        self.assertEqual(annual["eventos_pendentes"], 1)
        self.assertIsNone(annual["pontos_referencia"])
        self.assertEqual(annual["periodicos_total"], 0)

    def test_no_sections_keeps_known_cv_date_but_does_not_invent_zero(self):
        result = self.analyze(extraction([], secoes={"periodicos": False, "eventos": False}))
        faculty = result["docentes"][0]
        self.assertEqual(faculty["lattes_atualizado_em"], "2025-06-01")
        self.assertTrue(all(a["pontos_referencia"] is None for a in faculty["anos"]))
        self.assertTrue(all(a["pontos_status"] == "cobertura_temporal_desconhecida" for a in faculty["anos"]))
        self.assertIn("Nenhuma das duas seções", result["auditoria"]["avisos"][0])

    def test_no_update_date_preserves_found_papers_and_unknown_empty_years(self):
        result = self.analyze(extraction(lattes_atualizado_em=None))
        annual = result["docentes"][0]["anos"]
        self.assertEqual(annual[0]["pontos_referencia"], 1)
        self.assertIsNone(annual[1]["pontos_referencia"])
        self.assertEqual(annual[1]["pontos_status"], "cobertura_temporal_desconhecida")

    def test_exact_duplicate_is_audited_with_original_pointer(self):
        original = extraction([publication(), publication()])
        before = copy.deepcopy(original)
        result = self.analyze(original)
        annual = result["docentes"][0]["anos"][0]
        self.assertEqual(annual["pontos_referencia"], 1)
        self.assertEqual(len(annual["publicacoes"]), 1)
        self.assertEqual(result["auditoria"]["duplicatas_exatas_removidas"][0]["indice_extracao"], 1)
        self.assertEqual(annual["publicacoes"][0]["fonte_extracao"], {
            "arquivo": "extracao-lattes.json", "ponteiro": "/publicacoes/0",
            "pdf_sha256": PDF_HASH, "tipo_extraido": "periodico",
        })
        self.assertEqual(before, original)

    def test_supplied_wrong_name_is_rejected(self):
        with self.assertRaisesRegex(ValueError, "diverge do PDF"):
            self.analyze(nome="Different person")

    def test_name_matching_is_accent_and_case_insensitive(self):
        result = self.analyze(extraction(nome_detectado="José Silva"), nome="JOSE SILVA")
        self.assertEqual(result["docentes"][0]["nome"], "José Silva")

    def test_name_must_not_be_taken_only_from_pdf_filename(self):
        with self.assertRaisesRegex(ValueError, "informe --nome"):
            self.analyze(extraction(nome_detectado=""))
        result = self.analyze(extraction(nome_detectado=""), nome="Confirmed Name")
        self.assertEqual(result["docentes"][0]["nome"], "Confirmed Name")
        self.assertEqual(result["extracao"]["nome_origem"], "operador")

    def test_invalid_identity_date_and_year_are_rejected(self):
        for changes in (
            {"lattes_id": ""}, {"lattes_id": "123"},
            {"lattes_atualizado_em": "2025-02-31"}, {"ano_inicio": 2024},
        ):
            with self.subTest(changes=changes), self.assertRaises(ValueError):
                self.analyze(extraction(**changes))
        with self.assertRaisesRegex(ValueError, "fora da janela"):
            self.analyze(extraction([publication(ano=2027)]))

    def test_ui_limits_are_checked(self):
        for years in ((2026, 2025), (1899, 2025), (2025, 2100), (1900, 2099), (True, 2025)):
            with self.subTest(years=years), self.assertRaises(ValueError):
                module.validate_years(*years)
        self.assertEqual(len(module.validate_years(2000, 2099)), 100)
        with patch.object(module, "MAX_RESULT_BYTES", 100):
            with self.assertRaisesRegex(ValueError, "8 MiB"):
                self.analyze()
        with patch.object(module, "MAX_RECORDS", 1):
            with self.assertRaisesRegex(ValueError, "20 mil"):
                self.analyze(extraction([publication(), publication(titulo="Other")]))

    def test_report_distinguishes_absent_points_from_zero(self):
        report = module.render_report(self.analyze())
        self.assertIn("2025 | 1", report)
        self.assertIn("sem pontuação", report)
        self.assertIn("Analisar outro currículo", report)
        self.assertIn("não determina recredenciamento", report)


class FilesystemTests(unittest.TestCase):
    def test_sources_load_google_json_and_record_its_exact_hash(self):
        from test_validar_catalogo_periodicos import fixture
        root = self.root
        data = root / "data/controle"
        data.mkdir(parents=True)
        catalog_path = data / "catalogo-periodicos-google.json"
        catalog_path.write_text(json.dumps(fixture(), ensure_ascii=False), encoding="utf-8")
        for name in ("periodicos-aliases.json", "publicacoes-verificadas.json", "eventos-capes.json"):
            (data / name).write_text("{}", encoding="utf-8")
        with patch.object(engine, "read_aliases", return_value={}):
            with patch.object(engine, "read_verified_publications", return_value=({}, {})):
                with patch.object(engine, "read_event_catalog", return_value=None):
                    loaded = module.carregar_fontes(root)
        self.assertEqual(len(loaded["catalogo"]), 2)
        self.assertEqual(loaded["fontes"]["catalogo"], {
            "arquivo": "data/controle/catalogo-periodicos-google.json",
            "sha256": module.file_hash(catalog_path),
        })
        self.assertEqual(loaded["identificadores"]["03600300"][0]["source_id"], "23038")

    def setUp(self):
        temp_parent = (Path(__file__).resolve().parents[1] / "tmp/avulso-tests").resolve()
        temp_parent.mkdir(parents=True, exist_ok=True)
        self.temp = tempfile.TemporaryDirectory(prefix="case-", dir=temp_parent)
        self.root = Path(self.temp.name)
        self.assertTrue(self.root.resolve().is_relative_to(temp_parent))
        self.addCleanup(self.temp.cleanup)
        self.pdf = self.root / "Currículo com espaços.pdf"
        self.pdf.write_bytes(b"%PDF-1.7\nfixture for mocked extraction\n")

    def test_pdf_header_and_existing_file_are_required(self):
        self.assertEqual(module.validate_pdf(self.pdf), self.pdf)
        for name, contents in (("not-a-pdf.pdf", b"not pdf"), ("text.txt", b"%PDF-1.7")):
            path = self.root / name
            path.write_bytes(contents)
            with self.assertRaises(ValueError):
                module.validate_pdf(path)
        with self.assertRaises(ValueError):
            module.validate_pdf(self.root / "missing.pdf")

    def test_child_extraction_uses_private_temp_directory_on_every_platform(self):
        working = self.root / "temporário privado"
        working.mkdir()
        expected = extraction()
        parent_temp = {"TEMP": "parent-temp", "TMP": "parent-tmp", "TMPDIR": "parent-tmpdir"}

        def run_child(command, **options):
            self.assertEqual(command[command.index("-PdfPath") + 1], str(self.pdf))
            self.assertEqual(command[command.index("-OutputJson") + 1], str(working / module.EXTRACTION_NAME))
            for key in parent_temp:
                self.assertEqual(options["env"][key], str(working))
            (working / module.EXTRACTION_NAME).write_text(json.dumps(expected), encoding="utf-8")
            return module.subprocess.CompletedProcess(command, 0, "", "")

        with patch.dict(module.os.environ, parent_temp), \
                patch.object(module, "resolve_powershell", return_value="pwsh"), \
                patch.object(module.subprocess, "run", side_effect=run_child):
            self.assertEqual(module.extrair_pdf(self.pdf, working, 2025, 2026), expected)
            self.assertEqual({key: module.os.environ[key] for key in parent_temp}, parent_temp)

    def test_public_or_canonical_output_directories_are_rejected(self):
        for folder in ("data", "content", "static", "public", "scripts"):
            for relative in (folder, folder + "/nested"):
                with self.subTest(relative=relative), self.assertRaises(ValueError):
                    module.validate_destination(self.root, self.root / relative)

    def test_success_does_not_read_or_modify_faculty_registration(self):
        protected = {}
        for folder in ("data", "content", "static", "public"):
            path = self.root / folder / "sentinel.txt"
            path.parent.mkdir(parents=True)
            path.write_text("must remain untouched", encoding="utf-8")
            protected[path] = path.read_bytes()
        output = self.root / "analises-avulsas/result"
        with patch.object(module, "carregar_fontes", return_value=sources()):
            with patch.object(module, "extrair_pdf", return_value=extraction()):
                result = module.analisar_pdf(self.pdf, output, 2025, 2026, root=self.root)
        self.assertEqual(len(result["docentes"]), 1)
        self.assertTrue((output / "analise-lattes.json").is_file())
        self.assertTrue((output / "extracao-lattes.json").is_file())
        self.assertTrue((output / "relatorio-analise.txt").is_file())
        self.assertEqual(protected, {path: path.read_bytes() for path in protected})
        self.assertFalse((self.root / "data/controle/docentes.json").exists())
        self.assertEqual(result["docentes"][0]["lattes_pdf_sha256"], module.file_hash(self.pdf))
        self.assertNotIn(str(self.pdf), json.dumps(result, ensure_ascii=False))
        self.assertFalse(list((self.root / "tmp/analise-lattes-avulso").iterdir()))

    def test_extraction_error_preserves_previous_result(self):
        output = self.root / "private"
        output.mkdir()
        target = output / "analise-lattes.json"
        target.write_text("previous valid result", encoding="utf-8")
        with patch.object(module, "carregar_fontes", return_value=sources()):
            with patch.object(module, "extrair_pdf", side_effect=ValueError("Unreadable PDF")):
                with self.assertRaisesRegex(ValueError, "Unreadable PDF"):
                    module.analisar_pdf(self.pdf, output, 2025, 2026, root=self.root)
        self.assertEqual(target.read_text(encoding="utf-8"), "previous valid result")

    def test_modified_pdf_during_extraction_is_rejected(self):
        def modify(*args):
            self.pdf.write_bytes(b"%PDF-1.7\nnew contents")
            return extraction()
        with patch.object(module, "carregar_fontes", return_value=sources()):
            with patch.object(module, "extrair_pdf", side_effect=modify):
                with self.assertRaisesRegex(ValueError, "PDF foi modificado"):
                    module.analisar_pdf(self.pdf, self.root / "private", 2025, 2026, root=self.root)
        self.assertFalse((self.root / "private/analise-lattes.json").exists())

    def test_modified_reference_source_during_extraction_is_rejected(self):
        source = sources()
        catalog = self.root / "fixture-catalog.json"
        catalog.write_text("before", encoding="utf-8")
        source["_paths"] = {"catalogo": catalog}
        source["fontes"]["catalogo"]["sha256"] = module.file_hash(catalog)
        def modify(*args):
            catalog.write_text("after", encoding="utf-8")
            return extraction()
        with patch.object(module, "carregar_fontes", return_value=source):
            with patch.object(module, "extrair_pdf", side_effect=modify):
                with self.assertRaisesRegex(ValueError, "fonte catalogo mudou"):
                    module.analisar_pdf(self.pdf, self.root / "private", 2025, 2026, root=self.root)

    def test_missing_catalog_stops_before_output(self):
        with self.assertRaisesRegex(ValueError, "Fonte local necessária"):
            module.analisar_pdf(self.pdf, self.root / "private", 2025, 2026, root=self.root)
        self.assertFalse((self.root / "private").exists())


if __name__ == "__main__":
    unittest.main()
