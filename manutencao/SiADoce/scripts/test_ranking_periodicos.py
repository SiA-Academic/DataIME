"""Regressões da contagem e proteção de saídas válidas; sem acesso à rede."""
import copy
import hashlib
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest


spec = importlib.util.spec_from_file_location(
    "ranking_periodicos", Path(__file__).with_name("gerar-ranking-periodicos.py"))
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


def reviews():
    return {"schema_version": 1, "publicacoes": [],
            "identificacoes_periodicos": [], "nomes_exibicao": {}}


def publication(**changes):
    return {"tipo": "periodico", "titulo": "A published article", "veiculo": "Journal",
            "titulo_catalogo": "Journal", "source_id": "11", "ano": 2025,
            "referencia": "A published article. Journal, 2025.",
            "status": "classificado", "faixa": "A2", **changes}


def faculty(identifier="d1", publications=None, name=None):
    groups = {}
    for item in publications if publications is not None else [publication()]:
        groups.setdefault(item["ano"], []).append(item)
    return {"id": identifier, "nome": name or identifier, "categoria": "pleno",
            "anos": [{"ano": year, "publicacoes": items} for year, items in sorted(groups.items())]}


def data(*teachers, years=None):
    return {"anos": years or [2025], "atualizado_em": "2025-06-01T12:00:00Z",
            "docentes": list(teachers or [faculty()])}


class RankingTests(unittest.TestCase):
    def payload(self, source=None, corrections=None):
        return module.gerar_payload(source or data(), corrections or reviews())

    def assertConflict(self, code, source, corrections=None):
        with self.assertRaises(module.RankingConflict) as caught:
            self.payload(source, corrections)
        self.assertIn(code, {d["codigo"] for d in caught.exception.conflitos})

    def test_coauthors_count_once_even_when_only_one_has_doi(self):
        source = data(faculty("a", [publication(identificacao_doi="https://doi.org/10.1234/AbC")]),
                      faculty("b"))
        result = self.payload(source)
        self.assertEqual(result["resumo"]["publicacoes_unicas"], 1)
        self.assertEqual(result["resumo"]["registros_por_docente"], 2)
        self.assertEqual(result["ranking"][0]["docentes_distintos"], 2)
        self.assertEqual(result["articles"][0]["doi"], "10.1234/abc")

    def test_new_years_and_faculty_are_dynamic_and_input_is_unchanged(self):
        source = data(faculty("a"), faculty("new", [publication(titulo="New work", ano=2030)]))
        snapshot = copy.deepcopy(source)
        result = self.payload(source)
        self.assertEqual(result["periodo"], [2025, 2030])
        self.assertEqual(result["headers"][2:4], [2025, 2030])
        self.assertEqual(result["resumo"]["por_ano"], {"2025": 1, "2030": 1})
        self.assertEqual(result["resumo"]["docentes_na_base"], 2)
        self.assertEqual(source, snapshot)

    def test_pending_journals_included_and_non_journals_excluded(self):
        source = data(faculty(publications=[
            publication(status="fora_catalogo", faixa=None),
            publication(tipo="anais_congressos", titulo="Conference"),
            publication(tipo="noticia", titulo="News"),
        ]))
        result = self.payload(source)
        self.assertEqual(result["resumo"]["publicacoes_unicas"], 1)
        self.assertEqual(result["resumo"]["registros_classificacao_pendente_incluidos"], 1)

    def test_identified_homonymous_journals_remain_distinct_and_visible(self):
        source = data(faculty(publications=[
            publication(source_id="11"), publication(source_id="22"),
        ]))
        result = self.payload(source)
        self.assertEqual(result["resumo"]["periodicos"], 2)
        self.assertEqual(result["resumo"]["publicacoes_unicas"], 2)
        self.assertEqual(len({row[0] for row in result["values"]}), 2)

    def test_homonym_without_id_is_blocked(self):
        source = data(faculty("a", [publication(source_id="11")]),
                      faculty("b", [publication(source_id="22")]),
                      faculty("c", [publication(source_id=None)]))
        self.assertConflict("periodico_homonimo_sem_id", source)

    def test_distinct_issns_do_not_merge_only_by_title(self):
        source = data(faculty(publications=[
            publication(source_id=None, issn="1234-5678"),
            publication(source_id=None, issn="8765-4321"),
        ]))
        self.assertEqual(self.payload(source)["resumo"]["periodicos"], 2)

    def test_shared_issn_with_conflicting_source_ids_requires_review(self):
        source = data(faculty("a", [publication(issn="1234-5678")]),
                      faculty("b", [publication(source_id="22", issn="1234-5678")]))
        self.assertConflict("identificadores_conflitantes", source)

    def test_missing_id_can_join_one_unambiguous_exact_journal(self):
        source = data(faculty("a"), faculty("b", [publication(source_id=None)]))
        result = self.payload(source)
        self.assertEqual(result["resumo"]["publicacoes_unicas"], 1)
        self.assertEqual(result["resumo"]["periodicos"], 1)

    def test_duplicate_within_same_faculty_is_not_silently_discarded(self):
        self.assertConflict("duplicata_mesmo_docente", data(
            faculty(publications=[publication(), publication()])))

    def test_same_title_with_two_dois_is_blocked(self):
        source = data(faculty("a", [publication(doi="10.1234/a")]),
                      faculty("b", [publication(doi="10.1234/b")]))
        self.assertConflict("dois_conflitantes", source)

    def test_explicit_and_verified_doi_conflict_is_blocked(self):
        self.assertConflict("dois_conflitantes_no_registro", data(
            faculty(publications=[publication(doi="10.1234/a", identificacao_doi="10.1234/b")])))

    def test_same_doi_in_different_journals_is_blocked(self):
        source = data(faculty("a", [publication(doi="10.1234/a")]),
                      faculty("b", [publication(source_id="22", doi="10.1234/a")]))
        self.assertConflict("artigo_periodicos_conflitantes", source)

    def test_same_doi_with_different_titles_is_blocked(self):
        source = data(faculty("a", [publication(doi="10.1234/a")]),
                      faculty("b", [publication(titulo="A different title", doi="10.1234/a")]))
        self.assertConflict("titulo_conflitante", source)

    def test_same_title_with_different_years_is_blocked(self):
        source = data(faculty("a"), faculty("b", [publication(ano=2026)]))
        self.assertConflict("ano_conflitante", source)

    def test_documented_year_decision_is_applied_and_retained(self):
        source = data(faculty("a"), faculty("b", [publication(ano=2026)]))
        corrections = reviews()
        corrections["publicacoes"] = [{
            "source_id": "11", "titles": ["A published article"],
            "title": "A published article", "year": 2026, "years": [2025, 2026],
            "doi": "10.1234/a", "reason": "Ano do volume confirmado.",
            "sources": ["https://example.org/volume"],
        }]
        result = self.payload(source, corrections)
        self.assertEqual(result["resumo"]["publicacoes_unicas"], 1)
        self.assertEqual(result["resumo"]["conflitos_ano_resolvidos"], 1)
        self.assertEqual(result["articles"][0]["ano"], 2026)
        self.assertEqual(result["auditoria"]["decisoes_aplicadas"], corrections["publicacoes"])
        self.assertConflict("revisao_fora_escopo_temporal",
                            data(faculty(publications=[publication(ano=2027)])), corrections)

    def test_human_decision_without_sources_is_rejected(self):
        corrections = reviews()
        corrections["publicacoes"] = [{"title": "A published article", "reason": "A guess"}]
        self.assertConflict("revisao_sem_fonte", data(), corrections)

    def test_individual_identification_does_not_create_global_alias(self):
        source = data(faculty(publications=[
            publication(titulo_catalogo=None, source_id=None, veiculo="Generic"),
            publication(titulo="Another article", titulo_catalogo=None, source_id=None, veiculo="Generic"),
        ]))
        corrections = reviews()
        corrections["identificacoes_periodicos"] = [{
            "title": "A published article", "year": 2025, "original": "Generic",
            "journal": "Exact Journal", "reason": "Identificação individual.",
            "sources": ["https://example.org/article"],
        }]
        result = self.payload(source, corrections)
        self.assertEqual({r["periodico"] for r in result["ranking"]}, {"Exact Journal", "Generic"})

    def test_people_with_same_name_use_distinct_ids(self):
        result = self.payload(data(faculty("a", name="Alex"), faculty("b", name="Alex")))
        self.assertEqual(result["resumo"]["publicacoes_unicas"], 1)
        self.assertEqual(result["ranking"][0]["docentes_distintos"], 2)

    def test_empty_publication_collection_is_valid(self):
        result = self.payload(data(faculty(publications=[]), years=[2028]))
        self.assertEqual(result["values"], [])
        self.assertEqual(result["resumo"]["publicacoes_unicas"], 0)
        self.assertIn(2028, result["headers"])

    def test_ranking_descending_and_ties_by_title(self):
        source = data(faculty(publications=[
            publication(titulo="X", titulo_catalogo="B Journal", source_id="2"),
            publication(titulo="Y", titulo_catalogo="A Journal", source_id="1"),
            publication(titulo="Z", titulo_catalogo="B Journal", source_id="2"),
        ]))
        self.assertEqual([row[1] for row in self.payload(source)["values"]], [2, 1])


class OutputTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Explicit workspace location also works in a restricted Windows
        # process, whose redirected system TEMP can be inaccessible.
        cls.temp_parent = Path(__file__).resolve().parents[1] / "tmp"
        cls.temp_parent.mkdir(exist_ok=True)

    def write_source(self, root, source=None):
        for relative, value in ((module.SOURCE, source or data()), (module.REVIEWS, reviews())):
            target = root / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text(json.dumps(value), encoding="utf-8")

    def test_repeated_run_is_byte_reproducible(self):
        with tempfile.TemporaryDirectory(dir=self.temp_parent, prefix="test-ranking-") as folder:
            root = Path(folder)
            output = root / "output"
            self.write_source(root)
            module.gerar_arquivos(root, output)
            first = {p.name: p.read_bytes() for p in output.iterdir()}
            module.gerar_arquivos(root, output)
            self.assertEqual(first, {p.name: p.read_bytes() for p in output.iterdir()})
            compact = json.loads((output / "ranking_payload.json").read_text(encoding="utf-8"))
            self.assertEqual(compact["source_path"], "data/controle/producao-docente.json")
            self.assertEqual(compact["resumo"]["publicacoes_unicas"], 1)
            self.assertTrue((output / "ranking_periodicos.csv").read_bytes().startswith(b"\xef\xbb\xbf"))

    def test_conflict_preserves_all_previous_ranking_files(self):
        with tempfile.TemporaryDirectory(dir=self.temp_parent, prefix="test-ranking-") as folder:
            root = Path(folder)
            output = root / "output"
            self.write_source(root)
            module.gerar_arquivos(root, output)
            first = {p.name: p.read_bytes() for p in output.iterdir() if p.name != "ranking_conflitos.json"}
            self.write_source(root, data(faculty(publications=[publication(), publication()])))
            with self.assertRaises(module.RankingConflict):
                module.gerar_arquivos(root, output)
            self.assertEqual(first, {p.name: p.read_bytes() for p in output.iterdir()
                                    if p.name != "ranking_conflitos.json"})
            report = json.loads((output / "ranking_conflitos.json").read_text(encoding="utf-8"))
            self.assertFalse(report["ranking_atualizado"])
            self.assertEqual(report["conflitos"][0]["codigo"], "duplicata_mesmo_docente")

    def test_missing_source_produces_diagnostic_without_empty_ranking(self):
        with tempfile.TemporaryDirectory(dir=self.temp_parent, prefix="test-ranking-") as folder:
            root = Path(folder)
            output = root / "output"
            with self.assertRaises(module.RankingConflict):
                module.gerar_arquivos(root, output)
            self.assertFalse((output / "ranking_payload.json").exists())
            report = json.loads((output / "ranking_conflitos.json").read_text(encoding="utf-8"))
            self.assertEqual(report["conflitos"][0]["codigo"], "fonte_ausente")

    def test_malformed_source_is_reported(self):
        with tempfile.TemporaryDirectory(dir=self.temp_parent, prefix="test-ranking-") as folder:
            root = Path(folder)
            self.write_source(root)
            (root / module.SOURCE).write_text("{broken", encoding="utf-8")
            with self.assertRaises(module.RankingConflict) as caught:
                module.gerar_arquivos(root, root / "output")
            self.assertEqual(caught.exception.conflitos[0]["codigo"], "fonte_ilegivel")


class CurrentSnapshotTests(unittest.TestCase):
    def test_audited_snapshot_188_journals_298_publications_321_records(self):
        # A photograph of the audited input, not a required total for later data.
        # After a legitimate source update this check skips; dynamic tests above
        # continue to exercise the generator without freezing faculty or years.
        root = Path(__file__).resolve().parents[1]
        raw = (root / module.SOURCE).read_bytes()
        if hashlib.sha256(raw).hexdigest() != "f4b36159f80f23a5a8fb7ddd42d21798a5e4591f3214ec61c6d986c6549a9adb":
            self.skipTest("A base foi atualizada após a fotografia auditada de 20/10/2026.")
        corrections = json.loads((root / module.REVIEWS).read_text(encoding="utf-8"))
        result = module.gerar_payload(json.loads(raw), corrections)
        self.assertEqual(result["resumo"]["periodicos"], 188)
        self.assertEqual(result["resumo"]["publicacoes_unicas"], 298)
        self.assertEqual(result["resumo"]["registros_por_docente"], 321)
        self.assertEqual(result["resumo"]["conflitos_ano_resolvidos"], 3)
        self.assertEqual(len(result["auditoria"]["identificacoes_aplicadas"]), 4)
        self.assertEqual(sum(row["artigos_unicos"] for row in result["ranking"]), 298)
        self.assertEqual(sum(len(a["registros"]) for a in result["articles"]), 321)


if __name__ == "__main__":
    unittest.main()
