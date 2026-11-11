"""Checks for ambiguous identification, missing metrics and CAPES boundaries."""
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import Mock

from quadrienio import analysis_criteria, quadrennial_summary

spec = importlib.util.spec_from_file_location(
    "producao_docente", Path(__file__).with_name("gerar-producao-docente.py"))
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


def catalog_row(identifier="source-1", percentile=50, title="Example Journal"):
    return {
        "source_id": identifier, "titulo_catalogo": title,
        "faixa": module.band(percentile), "percentil": percentile,
        "base": "Scopus" if percentile is not None else None,
        "scopus": percentile, "jcr": None,
        "issn": "1234-5678", "eissn": None, "disponibilidade": "Teste",
    }


def publication(**changes):
    return {"titulo": "An example article", "veiculo": "Example Journal",
            "ano": 2025, "tipo": "periodico", "referencia": "Example Journal.",
            **changes}


class JsonCatalogueTests(unittest.TestCase):
    def read_fixture(self, snapshot):
        temp_parent = Path(__file__).resolve().parents[1] / "tmp/catalogue-json-tests"
        temp_parent.mkdir(parents=True, exist_ok=True)
        with tempfile.TemporaryDirectory(dir=temp_parent) as folder:
            path = Path(folder) / "catalogo-periodicos-google.json"
            path.write_text(json.dumps(snapshot, ensure_ascii=False), encoding="utf-8")
            return module.read_catalog(path)

    def test_json_preserves_classification_missing_metrics_and_issn_lookup(self):
        from test_validar_catalogo_periodicos import fixture
        catalog, titles, identifiers = self.read_fixture(fixture())
        self.assertEqual(len(catalog), 2)
        self.assertEqual(catalog[0]["source_id"], "23038")
        self.assertEqual(catalog[0]["issn"], "0360-0300")
        self.assertEqual(identifiers["03600300"], [catalog[0]])
        classified = module.classify(publication(veiculo="ACM Computing Surveys"),
                                     titles, identifiers)
        self.assertEqual((classified["status"], classified["faixa"], classified["pontos"]),
                         ("classificado", "A2", 0.875))
        missing = module.classify(publication(veiculo="4OR"), titles, identifiers)
        self.assertEqual(missing["status"], "sem_percentil")
        self.assertIsNone(missing["faixa"])
        self.assertIsNone(missing["pontos"])

    def test_reader_checks_support_sheets_before_scoring_consulta(self):
        from test_validar_catalogo_periodicos import fixture
        snapshot = fixture()
        snapshot["sheets"]["JCR por categoria"][1][7] = 61
        with self.assertRaisesRegex(ValueError, "JCR — resumo!C2"):
            self.read_fixture(snapshot)


class ClassificationTests(unittest.TestCase):
    def test_documented_proceedings_correction_requires_explicit_exact_evidence(self):
        from test_classificar_eventos import EventTests, event, proof
        p = publication()
        row = catalog_row(percentile=99)
        for authorize, expected_type in ((False, "periodico"), (True, "anais_congressos")):
            ec = EventTests().load([event(6)], [proof(p, corrigir_tipo_origem=authorize)])
            r = module.classify(p, {"example journal": [row]}, {}, event_catalog=ec)
            self.assertEqual(r["tipo"], expected_type)
            self.assertEqual(r["faixa"], "A7" if authorize else "A1")
            if authorize:
                self.assertEqual(r["tipo_origem"], "periodico")
                self.assertIsNone(r["pontos"])
            other = module.classify(publication(titulo="Different article"),
                                    {"example journal": [row]}, {}, event_catalog=ec)
            self.assertEqual(other["tipo"], "periodico")

    def test_missing_percentile_is_not_a8_but_real_zero_is(self):
        for percentile, expected in [(None, None), (0, "A8"), (12.4999, "A8"),
                                     (12.5, "A7"), (37.4999, "A6"), (37.5, "A5"),
                                     (50, "A4"), (62.5, "A3"), (75, "A2"), (87.5, "A1")]:
            self.assertEqual(module.band(percentile), expected)

    def test_a5_is_classified_without_an_invented_article_weight(self):
        row = catalog_row(percentile=49)
        result = module.classify(publication(), {"example journal": [row]}, {})
        self.assertEqual(result["status"], "classificado")
        self.assertEqual(result["faixa"], "A5")
        self.assertIsNone(result["pontos"])
        self.assertTrue(result["fora_formula"])

    def test_unknown_explicit_issn_blocks_title_fallback(self):
        row = catalog_row()
        result = module.classify(publication(issn="9999-9999"),
                                 {"example journal": [row]}, {"12345678": [row]})
        self.assertEqual(result["status"], "conflito_identificacao")
        self.assertIsNone(result["faixa"])

    def test_known_and_unknown_issns_are_a_conflict(self):
        row = catalog_row()
        result = module.classify(publication(issn="1234-5678", eissn="9999-9999"),
                                 {"example journal": [row]}, {"12345678": [row]})
        self.assertEqual(result["status"], "conflito_identificacao")

    def test_disagreeing_issn_and_title_are_a_conflict(self):
        first, second = catalog_row(), catalog_row(identifier="source-2", title="Other Journal")
        result = module.classify(publication(issn="8765-4321"),
                                 {"example journal": [first]}, {"87654321": [second]})
        self.assertEqual(result["status"], "conflito_identificacao")

    def test_known_issn_conflict_with_support_qualified_title_is_rejected(self):
        first, second = catalog_row(), catalog_row(identifier="source-2", title="Other Journal")
        result = module.classify(publication(veiculo="Example Journal (Online)", issn="8765-4321"),
                                 {"example journal": [first]}, {"87654321": [second]})
        self.assertEqual(result["status"], "conflito_identificacao")
        self.assertIsNone(result["pontos"])

    def test_known_issn_conflict_with_validated_alias_is_rejected(self):
        first, second = catalog_row(title="Canonical Journal"), catalog_row(identifier="source-2", title="Other Journal")
        aliases = {"example journal": {"registro": first, "evidencia": {}}}
        result = module.classify(publication(issn="8765-4321"), {},
                                 {"87654321": [second]}, aliases)
        self.assertEqual(result["status"], "conflito_identificacao")
        self.assertIsNone(result["pontos"])

    def test_electronic_issn_reference_cannot_be_ignored(self):
        first, second = catalog_row(), catalog_row(identifier="source-2", title="Other Journal")
        for label in ("eISSN", "e-ISSN", "E ISSN", "pISSN"):
            with self.subTest(label=label):
                result = module.classify(
                    publication(referencia=f"Example Journal. {label}: 8765-4321"),
                    {"example journal": [first]}, {"87654321": [second]})
                self.assertEqual(result["status"], "conflito_identificacao")
                self.assertIsNone(result["pontos"])

    def test_malformed_explicit_identifier_cannot_fall_back_to_title(self):
        for field in ("issn", "eissn"):
            with self.subTest(field=field):
                result = module.classify(publication(**{field: "1234"}),
                                         {"example journal": [catalog_row()]}, {})
                self.assertEqual(result["status"], "conflito_identificacao")
                self.assertEqual(result["issns_invalidos"], ["1234"])
                self.assertIsNone(result["pontos"])

    def test_valid_explicit_identifier_agrees_with_qualified_title(self):
        row = catalog_row()
        result = module.classify(publication(veiculo="Example Journal (Online)", issn="1234-5678"),
                                 {"example journal": [row]}, {"12345678": [row]})
        self.assertEqual(result["status"], "classificado")
        self.assertEqual(result["match_method"], "issn_explicito")

    def test_ambiguous_normalized_title_is_never_scored(self):
        result = module.classify(
            publication(), {"example journal": [catalog_row(), catalog_row("source-2")]}, {})
        self.assertEqual(result["status"], "ambiguo")
        self.assertIsNone(result["pontos"])

    def test_presentation_is_not_a_complete_article(self):
        result = module.classify(publication(
            tipo="anais_congressos",
            referencia="A talk. (Apresentação de Trabalho/Conferência ou palestra)."), {}, {})
        self.assertEqual(result["tipo"], "apresentacao")
        self.assertEqual(result["status"], "nao_pontuado")
        self.assertIsNone(result["faixa"])

    def test_event_without_current_evidence_stays_pending(self):
        result = module.classify(publication(tipo="anais_congressos"), {}, {})
        self.assertEqual(result["status"], "pendente_evento")
        self.assertIsNone(result["pontos"])

    def test_near_title_is_not_automatically_matched(self):
        row = catalog_row()
        result = module.classify(publication(veiculo="Example Journals"),
                                 {"example journal": [row]}, {})
        self.assertEqual(result["status"], "fora_catalogo")

    def test_validated_alias_preserves_original_and_provenance(self):
        row = catalog_row(title="Canonical Journal")
        aliases = {"example journal": {
            "registro": row,
            "evidencia": {"fontes": ["https://example.org/issn"],
                         "verificado_em": "2026-10-20", "nota": "Fonte primária"},
        }}
        result = module.classify(publication(), {}, {}, aliases)
        self.assertEqual(result["match_method"], "alias_validado")
        self.assertEqual(result["veiculo"], "Example Journal")
        self.assertEqual(result["titulo_catalogo"], "Canonical Journal")
        self.assertEqual(result["alias_fontes"], ["https://example.org/issn"])

    def test_alias_does_not_override_conflicting_explicit_issn(self):
        aliases = {"example journal": {"registro": catalog_row(), "evidencia": {}}}
        result = module.classify(publication(issn="9999-9999"), {}, {}, aliases)
        self.assertEqual(result["status"], "conflito_identificacao")

    def test_known_dordrecht_support_qualifier_preserves_original(self):
        original = "Example Journal (DORDRECHT. ONLINE)"
        result = module.classify(publication(veiculo=original),
                                 {"example journal": [catalog_row()]}, {})
        self.assertEqual(result["match_method"], "titulo_sem_qualificador_suporte")
        self.assertEqual(result["veiculo"], original)
        self.assertEqual(result["status"], "classificado")

    def test_arbitrary_parentheses_are_not_removed(self):
        result = module.classify(publication(veiculo="Example Journal (Mathematics)"),
                                 {"example journal": [catalog_row()]}, {})
        self.assertEqual(result["status"], "fora_catalogo")


class VerifiedPublicationTests(unittest.TestCase):
    def setUp(self):
        self.japanese = catalog_row(identifier="japanese", title="Information", percentile=5)
        self.mdpi = catalog_row(identifier="mdpi", title="Information (Switzerland)", percentile=79)
        self.mdpi.update(issn=None, eissn="2078-2489")
        self.pub = publication(titulo="Precisely verified article", veiculo="INFORMATION", ano=2025)
        self.titles = {"information": [self.japanese],
                       "information switzerland": [self.mdpi]}
        self.ids = {"12345678": [self.japanese], "20782489": [self.mdpi]}
        self.evidence = {"fontes": ["https://doi.org/10.3390/example"],
                         "verificado_em": "2026-10-20", "doi": "10.3390/example",
                         "nota": "Artigo identificado na página editorial"}
        self.verified = {module.publication_key(self.pub): {
            "registro": self.mdpi, "evidencia": self.evidence}}
        self.homonyms = {"information": {"fontes": ["https://example.org/journals"],
                                         "motivo": "Revistas homônimas"}}

    def classify(self, pub, verified=None):
        return module.classify(pub, self.titles, self.ids, {},
                               self.verified if verified is None else verified, self.homonyms)

    def test_homonymous_title_without_individual_evidence_remains_pending(self):
        for vehicle in ("INFORMATION", "Information (Online)"):
            with self.subTest(vehicle=vehicle):
                result = self.classify({**self.pub, "veiculo": vehicle}, verified={})
                self.assertEqual(result["status"], "ambiguo")
                self.assertIsNone(result["pontos"])

    def test_individual_identification_preserves_original_and_evidence(self):
        result = self.classify(self.pub)
        self.assertEqual(result["source_id"], "mdpi")
        self.assertEqual(result["veiculo"], "INFORMATION")
        self.assertEqual(result["titulo_catalogo"], "Information (Switzerland)")
        self.assertEqual(result["match_method"], "publicacao_verificada")
        self.assertEqual(result["faixa"], "A2")
        self.assertEqual(result["pontos"], .875)
        self.assertEqual(result["identificacao_doi"], self.evidence["doi"])
        self.assertEqual(result["identificacao_fontes"], self.evidence["fontes"])

    def test_changed_article_title_or_year_cannot_use_individual_evidence(self):
        for changes in ({"titulo": self.pub["titulo"] + " II"}, {"ano": 2024}):
            with self.subTest(changes=changes):
                result = self.classify({**self.pub, **changes})
                self.assertEqual(result["status"], "ambiguo")
                self.assertIsNone(result["pontos"])

    def test_evidence_applies_to_all_coauthors_with_same_bibliographic_key(self):
        first = self.classify({**self.pub, "docente_id": "first"})
        second = self.classify({**self.pub, "docente_id": "second"})
        self.assertEqual(first, second)
        self.assertEqual(first["source_id"], "mdpi")

    def test_conflicting_explicit_issn_is_not_overridden_by_individual_evidence(self):
        result = self.classify({**self.pub, "issn": "1234-5678"})
        self.assertEqual(result["status"], "conflito_identificacao")
        self.assertIsNone(result["pontos"])
        self.assertIsNone(result["source_id"])

    def test_precise_issn_can_resolve_homonym_without_individual_override(self):
        result = self.classify({**self.pub, "eissn": "2078-2489"}, verified={})
        self.assertEqual(result["status"], "classificado")
        self.assertEqual(result["source_id"], "mdpi")
        self.assertEqual(result["match_method"], "issn_explicito")

    def test_event_to_journal_requires_explicit_individual_authorization(self):
        p = {**self.pub, "tipo": "anais_congressos"}
        self.assertEqual(self.classify(p)["status"], "pendente_evento")
        self.evidence["corrigir_tipo_origem"] = "anais_congressos"
        result = self.classify(p)
        self.assertEqual(result["tipo"], "periodico")
        self.assertEqual(result["tipo_origem"], "anais_congressos")
        self.assertEqual(result["source_id"], "mdpi")
        self.assertEqual(result["pontos"], .875)
        for changes in ({"titulo": p["titulo"]+" II"}, {"ano": 2024},
                        {"veiculo": "INFORMATION (Online)"}):
            self.assertEqual(self.classify({**p, **changes})["status"], "pendente_evento")

    def test_event_to_journal_preserves_identifier_conflict_checks(self):
        self.evidence["corrigir_tipo_origem"] = "anais_congressos"
        result = self.classify({**self.pub, "tipo": "anais_congressos", "issn": "1234-5678"})
        self.assertEqual(result["status"], "conflito_identificacao")
        self.assertIsNone(result["pontos"])

    def test_presentation_is_not_promoted_by_journal_evidence(self):
        self.evidence["corrigir_tipo_origem"] = "anais_congressos"
        result = self.classify({**self.pub, "tipo": "anais_congressos",
                                "referencia": "(Apresentação de Trabalho/Conferência)."})
        self.assertEqual(result["tipo"], "apresentacao")
        self.assertIsNone(result["pontos"])

    def test_news_exclusion_is_individual_and_retains_evidence(self):
        self.evidence["tipo_trabalho"] = "noticia"
        result = self.classify(self.pub)
        self.assertEqual(result["tipo"], "noticia")
        self.assertEqual(result["status"], "nao_pontuado")
        self.assertTrue(result["fora_formula"])
        self.assertIsNone(result["faixa"])
        self.assertIsNone(result["pontos"])
        self.assertEqual(result["identificacao_doi"], self.evidence["doi"])
        other = self.classify({**self.pub, "titulo": "A full research article",
                               "eissn": "2078-2489"})
        self.assertEqual(other["status"], "classificado")
        self.assertEqual(other["pontos"], .875)
        annual = module.annual_summary(2025, [result], True, "2026-10-20")
        self.assertEqual(annual["pendentes"], 0)
        self.assertEqual(annual["periodicos_classificados"], 0)
        self.assertEqual(annual["pontos_referencia"], 0)
        self.assertEqual(len(annual["publicacoes"]), 1)

    def test_correction_title_needs_article_level_type_review(self):
        for prefix in ("Correction to:", "Erratum to:", "Corrigendum to:"):
            with self.subTest(prefix=prefix):
                result = self.classify(
                    {**self.pub, "titulo": f"{prefix} An earlier paper", "eissn": "2078-2489"})
                self.assertEqual(result["status"], "pendente_tipo")
                self.assertIsNone(result["faixa"])
                self.assertIsNone(result["pontos"])
                annual = module.annual_summary(2025, [result], True, "2026-10-20")
                self.assertEqual(annual["pendentes"], 1)
                self.assertIsNone(annual["pontos_referencia"])
                self.assertEqual(annual["pontos_status"], "parcial")

    def test_documented_correction_stays_pending_even_with_journal_identification(self):
        self.evidence["tipo_trabalho"] = "correcao_editorial"
        result = self.classify(self.pub)
        self.assertEqual(result["status"], "pendente_tipo")
        self.assertEqual(result["source_id"], "mdpi")
        self.assertEqual(result["identificacao_fontes"], self.evidence["fontes"])
        self.assertIsNone(result["pontos"])
        conflict = self.classify({**self.pub, "issn": "1234-5678"})
        self.assertEqual(conflict["status"], "conflito_identificacao")

    def test_erratum_with_documented_original_research_can_be_classified(self):
        pub = {**self.pub, "titulo": "Erratum to: An earlier paper"}
        self.evidence["tipo_trabalho"] = "artigo_completo"
        verified = {module.publication_key(pub): {
            "registro": self.mdpi, "evidencia": self.evidence}}
        result = self.classify(pub, verified)
        self.assertEqual(result["status"], "classificado")
        self.assertEqual(result["pontos"], .875)
        changed = self.classify({**pub, "ano": 2024, "eissn": "2078-2489"}, verified)
        self.assertEqual(changed["status"], "pendente_tipo")

    def test_research_about_error_correction_is_not_editorial_correction(self):
        result = self.classify({**self.pub, "titulo": "Error correction for quantum codes",
                                "eissn": "2078-2489"})
        self.assertEqual(result["status"], "classificado")

    def test_loader_validates_explicit_type_override_values(self):
        base = {**self.evidence, "titulo": self.pub["titulo"], "ano": self.pub["ano"],
                "veiculo_original": self.pub["veiculo"], "source_id": "mdpi",
                "titulo_catalogo_esperado": self.mdpi["titulo_catalogo"],
                "issns_esperados": ["20782489"]}
        path = Mock(spec=Path)
        for field,value in (("corrigir_tipo_origem", True),
                            ("corrigir_tipo_origem", "apresentacao"),
                            ("tipo_trabalho", "artigo"),
                            ("tipo_trabalho", False)):
            with self.subTest(field=field, value=value):
                path.read_text.return_value = json.dumps({"publicacoes":[{**base,field:value}]})
                with self.assertRaises(ValueError):
                    module.read_verified_publications(path, [self.mdpi])
        for field,value in (("corrigir_tipo_origem", "anais_congressos"),
                            ("tipo_trabalho", "noticia")):
            path.read_text.return_value = json.dumps({"publicacoes":[{**base,field:value}]})
            verified,_ = module.read_verified_publications(path, [self.mdpi])
            self.assertEqual(verified[module.publication_key(self.pub)]["evidencia"][field],value)


class TemporalCoverageTests(unittest.TestCase):
    def test_year_after_cv_update_without_records_is_unknown(self):
        result = module.annual_summary(2026, [], True, "2025-11-21")
        self.assertIsNone(result["pontos_referencia"])
        self.assertEqual(result["pontos_status"], "ano_sem_cobertura_cv")

    def test_unknown_cv_date_without_records_is_not_zero(self):
        result = module.annual_summary(2024, [], True, None)
        self.assertIsNone(result["pontos_referencia"])
        self.assertEqual(result["pontos_status"], "cobertura_temporal_desconhecida")

    def test_covered_year_without_records_reports_local_zero(self):
        result = module.annual_summary(2024, [], True, "2025-11-21")
        self.assertEqual(result["pontos_referencia"], 0)
        self.assertEqual(result["pontos_status"], "registros_localizados")

    def test_known_article_after_cv_update_is_preserved(self):
        article = module.classify(publication(ano=2026),
                                  {"example journal": [catalog_row()]}, {})
        result = module.annual_summary(2026, [article], True, "2025-11-21")
        self.assertEqual(result["pontos_referencia"], .625)
        self.assertEqual(result["cobertura_temporal"], "apos_atualizacao_cv")

    def test_known_article_with_unknown_cv_date_is_preserved(self):
        article = module.classify(publication(),
                                  {"example journal": [catalog_row()]}, {})
        result = module.annual_summary(2025, [article], True, None)
        self.assertEqual(result["pontos_referencia"], .625)
        self.assertEqual(result["cobertura_temporal"], "desconhecida")

    def test_missing_cv_stays_unknown_even_with_date_or_record(self):
        article = module.classify(publication(),
                                  {"example journal": [catalog_row()]}, {})
        result = module.annual_summary(2025, [article], False, "2026-01-01")
        self.assertIsNone(result["pontos_referencia"])
        self.assertEqual(result["pontos_status"], "cv_ausente")

    def test_only_events_remain_partial_without_score(self):
        event = module.classify(publication(tipo="anais_congressos"), {}, {})
        result = module.annual_summary(2025, [event], True, "2026-01-01")
        self.assertIsNone(result["pontos_referencia"])
        self.assertEqual(result["pontos_status"], "parcial")


class QuadrennialTests(unittest.TestCase):
    def summary(self, papers=(), years=range(2021, 2028), updated="2025-12-31", available=True):
        rows = [module.annual_summary(year, [p for p in papers if p["ano"] == year],
                                      available, updated) for year in years]
        return quadrennial_summary(rows, available, updated)

    def paper(self, kind, band, year=2025, status="classificado"):
        return publication(tipo=kind, faixa=band, ano=year, status=status)

    def test_three_unweighted_articles_become_four_with_partial_2026(self):
        papers = [self.paper("periodico", "A3", 2022), self.paper("periodico", "A1"),
                  self.paper("anais_congressos", "A1"),
                  self.paper("periodico", "A4"), self.paper("anais_congressos", "A3"),
                  self.paper("periodico", "A1", 2021), self.paper("periodico", "A1", 2027)]
        q = self.summary(papers)
        self.assertEqual((q["periodicos"], q["congressos"], q["total"]), (2, 1, 3))
        self.assertEqual(q["situacoes"], {"3": "atingiu", "4": "abaixo", "5": "abaixo"})
        papers.append(self.paper("anais_congressos", "A2", 2026))
        q = self.summary(papers)
        self.assertEqual((q["periodicos"], q["congressos"], q["total"]), (2, 2, 4))
        self.assertEqual(q["situacoes"], {"3": "atingiu", "4": "atingiu", "5": "abaixo"})
        self.assertEqual(q["confirmados_fora_lattes"], 0)
        self.assertEqual(self.summary(papers, updated="2025-01-01")["situacoes"],
                         {"3": "atingiu", "4": "atingiu", "5": "em_aberto"})

    def test_cutoff_comes_from_extraction_without_inventing_a_date(self):
        self.assertEqual(analysis_criteria("01/01/2022 a 20/10/2026")["data_corte"], "2026-10-20")
        self.assertEqual(analysis_criteria("01/01/2021 a 15/01/2027")["data_corte"], "2026-12-31")
        self.assertIsNone(analysis_criteria("2022–2026")["data_corte"])

    def test_fourth_pending_is_open_but_ineligible_or_presentation_cannot_count(self):
        papers = [self.paper("periodico", "A2") for _ in range(2)]
        papers += [self.paper("apresentacao", None, status="nao_pontuado"),
                   self.paper("noticia", None, status="nao_pontuado"),
                   self.paper("anais_congressos", None, status="evento_nao_elegivel"),
                   self.paper("periodico", None, status="pendente_tipo")]
        q = self.summary(papers)
        self.assertEqual((q["total"], q["pendentes"]), (2, 1))
        self.assertEqual(q["situacoes"], {"3": "em_aberto", "4": "abaixo", "5": "abaixo"})
        papers.append(self.paper("anais_congressos", None, status="pendente_evento"))
        q = self.summary(papers)
        self.assertEqual((q["total"], q["pendentes"]), (2, 2))
        self.assertEqual(q["situacoes"], {"3": "em_aberto", "4": "em_aberto", "5": "abaixo"})
        self.assertEqual(len(q["a_conferir"]), 2)

    def test_partial_last_day_old_cv_and_missing_extraction_years(self):
        for updated, years in (("2025-12-30", range(2022, 2026)),
                               ("2026-01-01", range(2023, 2027))):
            q = self.summary(years=years, updated=updated)
            self.assertEqual((q["total"], q["cobertura_completa"]), (0, False))
            self.assertEqual(q["situacoes"], {"3": "em_aberto", "4": "em_aberto", "5": "em_aberto"})
        q = self.summary()
        self.assertEqual((q["total"], q["cobertura_completa"]), (0, True))
        self.assertEqual(q["situacoes"], {"3": "abaixo", "4": "abaixo", "5": "abaixo"})

    def test_entirely_uncovered_window_is_unavailable(self):
        for args in ({"years": [2027]}, {"updated": None}, {"updated": "2021-06-01"}):
            q = self.summary(**args)
            self.assertEqual((q["periodicos"], q["congressos"], q["total"], q["pendentes"]),
                             (None, None, None, None))
            self.assertEqual(q["situacoes"], {"3": "sem_dados", "4": "sem_dados", "5": "sem_dados"})
        q = self.summary([self.paper("periodico", "A3")], updated=None)
        self.assertEqual(q["total"], 1)
        self.assertEqual(q["situacoes"], {"3": "em_aberto", "4": "em_aberto", "5": "em_aberto"})

    def test_absent_cv_excluded_even_with_external_publication(self):
        extra = [{"estado": "incluido", "tipo": "periodico", "faixa": "A3"}]
        self.assertIsNone(quadrennial_summary([], False, None, extra))
        q = quadrennial_summary([], True, None, extra)
        self.assertEqual((q["total"], q["pendentes"], q["cobertura_completa"]), (1, 0, False))
        self.assertEqual(q["confirmados_fora_lattes"], 1)

    def test_editorial_confirmation_of_an_existing_record_requires_no_cv_update(self):
        paper = self.paper("periodico", None, status="fora_catalogo")
        rows = [module.annual_summary(2025, [paper], True, "2026-02-01")]
        proof = {"tipo": "periodico", "faixa": "A3", "estado": "incluido",
                 "referencia_cv": {"ano": 2025, "indice": 0}}
        q = quadrennial_summary(rows, True, "2026-02-01", [proof])
        self.assertEqual((q["total"], q["pendentes"], q["confirmados_fora_lattes"]), (1, 0, 0))

    def test_pending_supplement_without_cv_reference_does_not_trigger_update(self):
        pending = {"tipo": "periodico", "faixa": "A3", "estado": "pendente"}
        q = quadrennial_summary([], True, None, [pending])
        self.assertEqual((q["total"], q["pendentes"], q["confirmados_fora_lattes"]), (0, 1, 0))

    def test_boundary_date_review_moves_cv_article_to_pending_only_in_quadrennium(self):
        paper = self.paper("periodico", "A3", 2022)
        rows = [module.annual_summary(year, [paper] if year == 2022 else [], True, "2026-02-01")
                for year in range(2022, 2026)]
        review = {"estado": "pendente", "tipo": "periodico", "faixa": "A3",
                  "referencia_cv": {"ano": 2022, "indice": 0}}
        q = quadrennial_summary(rows, True, "2026-02-01", [review])
        self.assertEqual((q["total"], q["pendentes"], q["artigos"], q["a_conferir"]), (0, 1, [], []))
        self.assertEqual(q["confirmados_fora_lattes"], 0)
        self.assertEqual(rows[0]["contagens_periodicos"]["A3"], 1)


class EventAggregationTests(unittest.TestCase):
    def test_validated_event_and_journal_contribute_once_each(self):
        journal = module.classify(publication(),
                                  {"example journal": [catalog_row()]}, {})
        event = {**publication(tipo="anais_congressos"), "faixa": "A2",
                 "status": "classificado", "pontos": .875}
        result = module.annual_summary(2025, [journal, event], True, "2026-01-01")
        self.assertEqual(result["pontos_referencia"], 1.5)
        self.assertEqual(result["periodicos_classificados"], 1)
        self.assertEqual(result["eventos_classificados"], 1)
        self.assertEqual(result["contagens"]["A2"], 1)
        self.assertEqual(result["contagens_eventos"]["A2"], 1)
        self.assertEqual(result["contagens_periodicos"]["A4"], 1)
        self.assertEqual(result["pontos_status"], "registros_localizados")

    def test_candidate_event_band_never_contributes(self):
        event = {**publication(tipo="anais_congressos"), "faixa": None,
                 "faixa_evento_referencia": "A1", "status": "pendente_evento",
                 "pontos": None}
        result = module.annual_summary(2025, [event], True, "2026-01-01")
        self.assertIsNone(result["pontos_referencia"])
        self.assertEqual(sum(result["contagens"].values()), 0)
        self.assertEqual(result["eventos_pendentes"], 1)

    def test_ineligible_event_is_separate_from_pending(self):
        event = {**publication(tipo="anais_congressos"), "faixa": None,
                 "status": "evento_nao_elegivel", "pontos": None}
        result = module.annual_summary(2025, [event], True, "2026-01-01")
        self.assertEqual(result["eventos_nao_elegiveis"], 1)
        self.assertEqual(result["eventos_pendentes"], 0)
        self.assertEqual(result["pontos_referencia"], 0)

    def test_a5_event_counts_but_has_no_invented_weight(self):
        event = {**publication(tipo="anais_congressos"), "faixa": "A5",
                 "status": "classificado", "pontos": None, "fora_formula": True}
        result = module.annual_summary(2025, [event], True, "2026-01-01")
        self.assertEqual(result["contagens"]["A5"], 1)
        self.assertEqual(result["pontos_referencia"], 0)


if __name__ == "__main__":
    unittest.main()
