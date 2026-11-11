"""Focused tests for evidence, event identity and CAPES 2025–2028 boundaries."""
from copy import deepcopy
import json
from pathlib import Path
import tempfile
import unittest

from classificar_eventos import classify_event, read_event_catalog


SOURCE = [{"url": "https://example.org/evidence", "titulo": "Primary evidence fixture"}]
PUBLICATION = {
    "titulo": "A complete research article", "ano": 2025, "veiculo": "Conference X",
    "referencia": "AUTHOR. A complete research article. In: Conference X, 2025. Proceedings. p. 1–12.",
}


def event(h5=35, **updates):
    result = {
        "id": "event-x", "nome": "Conference X", "aliases": ["Conference X"],
        "trilha": "principal", "desde_ano": 2022, "ate_ano": 2026,
        "h5": None if h5 is None else {
            "valor": h5, "ano": 2025, "periodo": "2020–2024",
            "consultado_em": "2026-10-20", "fontes": SOURCE,
        },
        "gt": {"atende": True, "fontes": SOURCE, "nota": "Full event criteria verified."},
    }
    result.update(updates)
    return deepcopy(result)


def proof(publication=None, **updates):
    p = publication or PUBLICATION
    result = {k: p[k] for k in ("titulo", "ano", "veiculo")}
    result.update(evento_id="event-x", tipo="artigo_completo", fontes=SOURCE,
                  nota="Exact article and track verified in the proceedings.")
    result.update(updates)
    return deepcopy(result)


def ce(category):
    return {"categoria": category, "fontes": SOURCE}


def search():
    return {"fontes": SOURCE, "nota": "Exact event was searched; result unavailable.",
            "consultado_em": "2026-10-20"}


def induction(years, **updates):
    result = {"sociedade": "SBC", "principal_nacional": True, "tradicao_anos": years,
              "ano_referencia": 2026, "aderencia_computacao": True,
              "fontes": SOURCE, "nota": "Documented tradition, not first-edition arithmetic."}
    result.update(updates)
    return result


class EventTests(unittest.TestCase):
    def load(self, events=None, proofs=None, **updates):
        raw = {"schema_version": 1, "ciclo": "2025-2028", "ano_referencia": 2026,
               "eventos": events if events is not None else [event()],
               "publicacoes_verificadas": proofs if proofs is not None else [proof()]}
        raw.update(updates)
        staging = Path(__file__).resolve().parent.parent / "tmp" / "event-classifier-tests"
        staging.mkdir(parents=True, exist_ok=True)
        with tempfile.TemporaryDirectory(dir=staging) as folder:
            path = Path(folder) / "catalog.json"
            path.write_text(json.dumps(raw), encoding="utf-8")
            return read_event_catalog(path)

    def classify(self, e=None, publication=None, proofs=None):
        return classify_event(publication or PUBLICATION,
                              self.load([e or event()], proofs))

    def test_h5_every_boundary(self):
        cases = [(1, "A8"), (5, "A8"), (6, "A7"), (8, "A7"),
                 (9, "A6"), (11, "A6"), (12, "A5"), (14, "A5"),
                 (15, "A4"), (19, "A4"), (20, "A3"), (24, "A3"),
                 (25, "A2"), (34, "A2"), (35, "A1"), (999, "A1")]
        for h5, band in cases:
            with self.subTest(h5=h5):
                r = self.classify(event(h5))
                self.assertEqual((r["status"], r["faixa"]), ("classificado", band))
                self.assertEqual(r["faixa_evento_h5"], band)

    def test_points_and_outside_formula(self):
        for h5, weight in ((35, 1), (25, .875), (20, .75), (15, .625)):
            r = self.classify(event(h5))
            self.assertEqual(r["pontos"], weight)
            self.assertFalse(r["fora_formula"])
        for h5 in (12, 9, 6, 1):
            r = self.classify(event(h5))
            self.assertIsNone(r["pontos"])
            self.assertTrue(r["fora_formula"])

    def test_ce_promotions_preserve_superior_and_cap_a3(self):
        for h5, category, expected in (
            (35, "top10", "A1"), (25, "top10", "A2"), (20, "top10", "A3"),
            (15, "top10", "A3"), (12, "top10", "A3"), (9, "top10", "A4"),
            (6, "top20", "A6"), (1, "top20", "A7"), (12, "top20", "A4"),
            (12, "relevante", "A5"), (12, "top", "A5"),
        ):
            with self.subTest(h5=h5, category=category):
                self.assertEqual(self.classify(event(h5, ce_sbc=ce(category)))["faixa"], expected)

    def test_confirmed_absence_fallback(self):
        for category, expected in (("top10", "A7"), ("top20", "A7"),
                                   ("top", "A7"), ("relevante", "A8")):
            r = self.classify(event(None, h5_status="nao_localizado",
                                    h5_busca=search(), ce_sbc=ce(category)))
            self.assertEqual(r["faixa"], expected)
            self.assertEqual(r["h5_consultado_em"], "2026-10-20")
            self.assertIsNone(r["h5"])

    def test_unknown_h5_only_candidate(self):
        for category, band in (("top10", "A7"), ("relevante", "A8")):
            r = self.classify(event(None, ce_sbc=ce(category)))
            self.assertEqual(r["faixa_evento_referencia"], band)
            self.assertEqual(r["status"], "pendente_evento")
            self.assertIsNone(r["faixa"])
            self.assertIsNone(r["pontos"])
            self.assertIn("h5_nao_verificado", r["pendencias_evento_codigos"])

    def test_conflicting_h5_lookup_note_preserved(self):
        note = search()
        note["nota"] = "Two non-equivalent Google series; scope unresolved."
        r = self.classify(event(None, h5_status="nao_consultado", h5_busca=note))
        self.assertEqual(r["h5_nota"], note["nota"])
        self.assertIsNone(r["faixa"])
        self.assertIn(SOURCE[0], r["fontes_evento"])

    def test_zero_is_not_missing_h5(self):
        r = self.classify(event(0, ce_sbc=ce("top")))
        self.assertEqual(r["h5"], 0)
        self.assertEqual(r["h5_status"], "disponivel")
        self.assertIsNone(r["faixa_evento_referencia"])
        self.assertIn("sem_faixa_documentada", r["pendencias_evento_codigos"])
        self.assertNotIn("h5_nao_verificado", r["pendencias_evento_codigos"])

    def test_induction_boundaries_and_best_band(self):
        for years, h5, expected in ((9, 1, "A8"), (10, 1, "A5"),
                                     (19, 1, "A5"), (20, 1, "A4"),
                                     (20, 35, "A1")):
            self.assertEqual(self.classify(event(h5, inducao=induction(years)))["faixa"], expected)

    def test_induction_requires_eligibility(self):
        for overrides in ({"principal_nacional": False}, {"aderencia_computacao": False}):
            self.assertEqual(self.classify(event(1, inducao=induction(20, **overrides)))["faixa"], "A8")
        other = induction(20, sociedade="outra", nome_sociedade="Scientific Society",
                          principal_nacional=False)
        self.assertEqual(self.classify(event(1, inducao=other))["faixa"], "A4")

    def test_unknown_h5_induction_stays_candidate(self):
        r = self.classify(event(None, inducao=induction(20)))
        self.assertEqual(r["faixa_evento_referencia"], "A4")
        self.assertIsNone(r["pontos"])
        self.assertIsNone(r["faixa"])

    def test_gt_and_article_evidence_required_independently(self):
        r = self.classify(event(gt={"atende": None, "fontes": []}), proofs=[])
        self.assertEqual(r["faixa_evento_referencia"], "A1")
        self.assertEqual(set(r["pendencias_evento_codigos"]),
                         {"gt_nao_verificado", "tipo_trabalho_nao_verificado"})
        self.assertIsNone(r["pontos"])
        for e, p, expected in (
            (event(gt={"atende": False, "fontes": SOURCE}), [proof()], "gt_nao_atendido"),
            (event(), [proof(tipo="resumo")], "trabalho_nao_completo"),
            (event(), [proof(tipo="apresentacao")], "trabalho_nao_completo"),
        ):
            r = self.classify(e, proofs=p)
            self.assertEqual(r["status"], "evento_nao_elegivel")
            self.assertIn(expected, r["pendencias_evento_codigos"])
            self.assertIsNone(r["faixa"])

    def test_gt_evidence_scope_is_by_edition(self):
        e = event(gt={"atende": True, "fontes": SOURCE, "anos_validos": [2025, 2025]})
        r = self.classify(e)
        self.assertEqual(r["status"], "classificado")
        self.assertEqual(r["gt_anos_validos"], [2025])
        p = {**PUBLICATION, "ano": 2024}
        r = self.classify(e, p, [proof(p)])
        self.assertIn("gt_edicao_nao_verificada", r["pendencias_evento_codigos"])
        self.assertEqual(r["faixa_evento_referencia"], "A1")
        self.assertIsNone(r["faixa"])
        self.assertIsNone(r["pontos"])
        e["gt"]["atende"] = False
        r = self.classify(e, p, [proof(p)])
        self.assertEqual(r["status"], "pendente_evento")
        for invalid in ([], "2025", [True], [2025.5]):
            with self.subTest(invalid=invalid), self.assertRaises(ValueError):
                self.load([event(gt={"atende": True, "fontes": SOURCE, "anos_validos": invalid})])

    def test_exact_normalized_alias_and_no_partial(self):
        p = {**PUBLICATION, "veiculo": "  CONFERÊNCE—X "}
        r = self.classify(publication=p, proofs=[])
        self.assertEqual(r["match_method"], "alias_evento_exato")
        self.assertEqual(r["faixa_evento_referencia"], "A1")
        for vehicle in ("X", "Conference", "Conference X Workshop", "Conference XYZ"):
            r = self.classify(publication={**p, "veiculo": vehicle}, proofs=[])
            self.assertIsNone(r["faixa_evento_referencia"])
            self.assertIn("evento_nao_localizado", r["pendencias_evento_codigos"])

    def test_ambiguous_alias_requires_exact_proof(self):
        other = event(id="event-y", nome="Different track")
        catalog = self.load([event(), other], [])
        r = classify_event(PUBLICATION, catalog)
        self.assertIn("alias_ambiguo", r["pendencias_evento_codigos"])
        self.assertIsNone(r["faixa_evento_referencia"])
        r = classify_event(PUBLICATION, self.load([event(), other], [proof(evento_id="event-y")]))
        self.assertEqual(r["evento_id"], "event-y")
        self.assertEqual(r["status"], "classificado")

    def test_individual_identity_is_exact_not_title_fuzzy(self):
        for override in ({"titulo": "A complete research Article"},
                         {"ano": 2024}, {"veiculo": "CONFERENCE X"}):
            r = self.classify(publication={**PUBLICATION, **override})
            self.assertIn("tipo_trabalho_nao_verificado", r["pendencias_evento_codigos"])

    def test_exact_proof_overrides_generic_alias_without_inheriting_main_metric(self):
        p = {**PUBLICATION, "veiculo": "Unlisted exact proceedings"}
        r = self.classify(publication=p, proofs=[proof(p)])
        self.assertEqual(r["status"], "classificado")
        other = event(6, id="event-y", nome="Different workshop", aliases=["Different"],
                      trilha="workshop")
        r = classify_event(PUBLICATION, self.load([event(), other], [proof(evento_id="event-y")]))
        self.assertEqual((r["evento_id"], r["faixa"], r["pontos"]), ("event-y", "A7", None))
        self.assertEqual(r["match_method"], "publicacao_evento_verificada")
        # Another article with the same generic venue keeps the original alias,
        # but has no verified full-paper status and receives no points.
        unverified = classify_event({**PUBLICATION, "titulo": "Another article"},
                                    self.load([event(), other], [proof(evento_id="event-y")]))
        self.assertEqual(unverified["evento_id"], "event-x")
        self.assertEqual(unverified["status"], "pendente_evento")

    def test_year_limits(self):
        for year in (2022, 2026):
            p = {**PUBLICATION, "ano": year}
            self.assertEqual(self.classify(publication=p, proofs=[proof(p)])["status"], "classificado")
        for year in (2021, 2027):
            p = {**PUBLICATION, "ano": year}
            r = self.classify(publication=p, proofs=[proof(p)])
            self.assertIn("fora_periodo_catalogo", r["pendencias_evento_codigos"])

    def test_main_track_reference_guard_blocks_candidate(self):
        for label in ("Software Engineering in Society", "SEIS",
                      "Software Engineering in Practice", "SEIP",
                      "Software Engineering Education and Training", "SEET",
                      "Companion", "Work in Progress", "Workshops", "Short Papers",
                      "Extended Abstracts", "Abstracts", "Doctoral Symposium"):
            with self.subTest(track=label):
                p = {**PUBLICATION, "referencia": f"AUTHOR. Article. In: Conference X. Proceedings: {label}."}
                r = self.classify(publication=p, proofs=[])
                self.assertIn("trilha_nao_confirmada", r["pendencias_evento_codigos"])
                self.assertIsNone(r["faixa_evento_referencia"])
                self.assertIsNone(r["h5"])

    def test_individual_proof_resolves_track_marker(self):
        p = {**PUBLICATION, "referencia": "AUTHOR. Article. In: Conference X. Companion."}
        r = self.classify(publication=p, proofs=[proof(p)])
        self.assertEqual(r["status"], "classificado")

    def test_documented_track_review_blocks_candidate_and_requires_exact_evidence(self):
        review = {**proof(), "bloquear_faixa": True,
                  "nota": "Primary proceedings identify a student track; principal H5 does not apply."}
        catalog = self.load(proofs=[], publicacoes_em_verificacao=[review])
        r = classify_event(PUBLICATION, catalog)
        self.assertEqual(r["status"], "pendente_evento")
        self.assertEqual(r["pendencias_evento_codigos"], ["trilha_nao_confirmada"])
        self.assertEqual(r["revisao_artigo_nota"], review["nota"])
        self.assertTrue(r["faixa_evento_bloqueada"])
        self.assertEqual(r["fontes_evento"], SOURCE)
        for field in ("faixa", "pontos", "h5", "faixa_evento_h5", "faixa_evento_referencia"):
            self.assertIsNone(r[field])
        for update in ({"titulo": "A complete research Article"},
                       {"titulo": " " + PUBLICATION["titulo"]}, {"ano": 2024},
                       {"veiculo": "CONFERENCE X"}):
            other = classify_event({**PUBLICATION, **update}, catalog)
            self.assertIsNone(other["revisao_artigo_nota"])
            self.assertFalse(other["faixa_evento_bloqueada"])
            self.assertEqual(other["faixa_evento_referencia"], "A1")
        for update in ({"fontes": []}, {"fontes": ["javascript:alert(1)"]},
                       {"evento_id": "unknown"}, {"nota": ""}, {"bloquear_faixa": 1},
                       {"ano": True}, {"titulo": " " + PUBLICATION["titulo"]}):
            with self.subTest(update=update), self.assertRaises(ValueError):
                self.load(proofs=[], publicacoes_em_verificacao=[{**review, **update}])
        with self.assertRaises(ValueError):
            self.load(proofs=[], publicacoes_em_verificacao=[review, review])
        with self.assertRaises(ValueError):
            self.load(publicacoes_em_verificacao=[review])
        with self.assertRaises(ValueError):
            self.load(proofs=[], publicacoes_em_verificacao={})

    def test_documented_nonblocking_review_keeps_candidate_without_points(self):
        review = {**proof(), "bloquear_faixa": False,
                  "nota": "Proceedings found; the paper type still requires confirmation."}
        catalog = self.load(proofs=[], publicacoes_em_verificacao=[review])
        before = deepcopy(catalog)
        r = classify_event(PUBLICATION, catalog)
        self.assertEqual(r["status"], "pendente_evento")
        self.assertEqual(r["faixa_evento_referencia"], "A1")
        self.assertEqual(r["h5"], 35)
        self.assertIn("publicacao_em_verificacao", r["pendencias_evento_codigos"])
        self.assertEqual(r["revisao_artigo_nota"], review["nota"])
        self.assertFalse(r["faixa_evento_bloqueada"])
        self.assertIn(SOURCE[0], r["fontes_evento"])
        self.assertIsNone(r["verificacao_artigo_nota"])
        self.assertIsNone(r["faixa"])
        self.assertIsNone(r["pontos"])
        self.assertEqual(catalog, before)

    def test_independent_workshop_does_not_inherit_or_get_globally_banned(self):
        e = event(nome="Workshop on X", aliases=["Workshop on X"], trilha="principal")
        p = {**PUBLICATION, "veiculo": "Workshop on X",
             "referencia": "AUTHOR. Article. In: Workshop on X. Proceedings."}
        r = self.classify(e, p, [proof(p)])
        self.assertEqual(r["status"], "classificado")

    def test_article_title_keywords_not_track_markers(self):
        for reference in ("AUTHOR. Workshops as a research method. In: Conference X. Proceedings.",
                          "AUTHOR. Workshop study with no recognizable venue delimiter."):
            r = self.classify(publication={**PUBLICATION, "referencia": reference}, proofs=[])
            self.assertNotIn("trilha_nao_confirmada", r["pendencias_evento_codigos"])
            self.assertEqual(r["faixa_evento_referencia"], "A1")

    def test_no_input_mutation_and_output_provenance(self):
        p, e = deepcopy(PUBLICATION), event()
        original_p, original_e = deepcopy(p), deepcopy(e)
        catalog = self.load([e])
        before = deepcopy(catalog)
        r = classify_event(p, catalog)
        self.assertEqual(p, original_p)
        self.assertEqual(e, original_e)
        self.assertEqual(catalog, before)
        self.assertEqual((r["h5_ano"], r["h5_periodo"], r["h5_consultado_em"]),
                         (2025, "2020–2024", "2026-10-20"))
        self.assertEqual(r["verificacao_artigo_nota"], proof()["nota"])
        self.assertEqual(r["tipo_trabalho_verificado"], "artigo_completo")
        self.assertEqual(r["verificacao_gt_nota"], e["gt"]["nota"])
        self.assertTrue(all(set(s) == {"url", "titulo"} for s in r["fontes_evento"]))

    def test_invalid_h5_values(self):
        for invalid in (-1, True, 2.5, "35"):
            with self.subTest(invalid=invalid), self.assertRaises(ValueError):
                self.load([event(invalid)])

    def test_invalid_evidence_and_states(self):
        cases = [
            event(h5_status="nao_consultado"), event(None, h5_status="disponivel"),
            event(None, h5_status="nao_localizado"),
            event(None, h5_status="inventado"),
            event(ce_sbc=ce("top5")),
            event(gt={"atende": True, "fontes": []}),
            event(gt={"atende": "true", "fontes": SOURCE}),
            event(inducao=induction(20, nota="")),
            event(inducao=induction(20, tradicao_anos=True)),
            event(inducao=induction(20, sociedade="outra")),
            event(desde_ano=2027, ate_ano=2022),
            event(aliases=["..."]),
        ]
        for i, e in enumerate(cases):
            with self.subTest(i=i), self.assertRaises(ValueError):
                self.load([e])
        for update in ({"fontes": []}, {"fontes": ["javascript:alert(1)"]},
                       {"fontes": ["https://user:password@example.org/"]},
                       {"ano": True}, {"consultado_em": "2026-02-31"}):
            e = event()
            e["h5"].update(update)
            with self.subTest(update=update), self.assertRaises(ValueError):
                self.load([e])

    def test_invalid_top_level_and_duplicate_keys(self):
        for updates in ({"schema_version": True}, {"schema_version": 2},
                        {"ciclo": "2021-2024"}, {"ano_referencia": False},
                        {"eventos": {}}, {"publicacoes_verificadas": {}}):
            with self.subTest(updates=updates), self.assertRaises(ValueError):
                self.load(**updates)
        with self.assertRaises(ValueError):
            self.load([event(), event()])
        with self.assertRaises(ValueError):
            self.load(proofs=[proof(), proof()])
        with self.assertRaises(ValueError):
            self.load(proofs=[proof(evento_id="unknown")])
        with self.assertRaises(ValueError):
            self.load(proofs=[proof(fontes=[])])
        with self.assertRaises(ValueError):
            self.load(proofs=[proof(tipo="full_maybe")])


if __name__ == "__main__":
    unittest.main(verbosity=2)
