import json
import unittest
from pathlib import Path
from unittest.mock import Mock

from complementos_quadrienio import load_complements, validate_record, matches_work


class ComplementTests(unittest.TestCase):
    def setUp(self):
        self.path = Mock(spec=Path)
        self.person = {"id": "doc-novo", "nusp": "123", "lattes_url": None, "anos": []}
        self.coauthor = {"id": "doc-02", "lattes_url": "http://lattes.cnpq.br/1234567890123456", "anos": []}
        self.record = {
            "nusp": "123", "ano": 2024, "tipo": "periodico", "titulo": "Uma publicação",
            "veiculo": "Revista", "doi": "10.1234/teste", "fonte": "https://doi.org/10.1234/teste",
            "estado": "incluido", "nota": "Publicação confirmada pela revista.", "source_id": "42",
        }
        self.journal = {"source_id": "42", "faixa": "A3"}
        self.pub = {"titulo": "UMA PUBLICAÇÃO", "tipo": "periodico", "veiculo": "Revista",
                    "source_id": "42", "status": "classificado", "faixa": "A3"}

    def calculate(self, records=None):
        self.path.read_text.return_value = json.dumps({"schema_version": 1, "registros": records or [self.record]})
        return load_complements(self.path, [self.person, self.coauthor], [self.journal]).get("doc-novo", [])

    def test_without_curriculum_and_catalog_change(self):
        self.assertEqual(self.calculate()[0]["faixa"], "A3")
        self.journal["faixa"] = "A4"
        self.assertEqual(self.calculate(), [])
        self.journal["faixa"] = None
        self.assertEqual(self.calculate()[0]["estado"], "pendente")

    def test_deduplicate_with_cv_and_resolve_pending(self):
        self.person["anos"] = [{"ano": 2024, "publicacoes": [self.pub]}]
        self.assertEqual(self.calculate(), [])
        self.pub.update(status="fora_catalogo", faixa=None)
        item = self.calculate()[0]
        self.assertEqual(item["referencia_cv"], {"ano": 2024, "indice": 0})
        self.assertEqual(item["estado"], "incluido")
        self.pub.update(titulo="Grafia diferente", identificacao_doi="10.1234/TESTE",
                        faixa="A3", status="classificado")
        self.assertEqual(self.calculate(), [])

    def test_year_disagreement_is_shared_with_original_author(self):
        self.record["estado"] = "pendente"
        self.person["anos"] = [{"ano": 2024, "publicacoes": [self.pub]}]
        item = self.calculate()[0]
        self.assertEqual(item["estado"], "pendente")
        self.assertEqual(item["referencia_cv"], {"ano": 2024, "indice": 0})
        self.person["anos"][0]["ano"] = 2021
        self.assertNotIn("referencia_cv", self.calculate()[0])

    def test_online_2025_and_issue_2026_count_once_when_both_dates_qualify(self):
        self.record.update(ano=2025, estado="incluido", nota="Online em 2025, fascículo em 2026.")
        self.person["anos"] = [{"ano": 2026, "publicacoes": [self.pub]}]
        self.assertEqual(self.calculate(), [])  # The qualified CV article is already counted for 2026.
        self.pub.update(status="fora_catalogo", faixa=None)
        supplement = self.calculate()[0]
        self.assertEqual((supplement["estado"], supplement["referencia_cv"]), ("incluido", {"ano": 2026, "indice": 0}))

    def test_use_current_congress_classification(self):
        del self.record["source_id"]
        self.record.update(coautor_lattes_id="1234567890123456", tipo="anais_congressos", veiculo="FIE")
        self.pub.update(tipo="anais_congressos", veiculo="FIE", faixa="A2", evento_id="fie")
        self.coauthor["anos"] = [{"ano": 2024, "publicacoes": [self.pub]}]
        self.assertEqual(self.calculate()[0]["faixa"], "A2")
        self.pub["faixa"] = "A3"
        self.assertEqual(self.calculate(), [])
        self.pub.update(status="pendente_evento", faixa=None)
        self.assertEqual(self.calculate()[0]["estado"], "pendente")

    def test_duplicate_record_rejected(self):
        with self.assertRaisesRegex(ValueError, "DOI duplicado"):
            self.calculate([self.record, self.record.copy()])

    def test_journal_rechecked_by_issn(self):
        self.record.pop("source_id")
        self.record["issn"] = "1234-567X"
        self.assertEqual(self.calculate()[0]["estado"], "pendente")
        self.journal["eissn"] = "1234567X"
        self.assertEqual(self.calculate()[0]["estado"], "incluido")

    def test_paper_in_proceedings_without_doi(self):
        self.record.pop("source_id")
        self.record.pop("doi")
        self.record.update(tipo="anais_congressos", evento_id="evento", id_anais="evento-2024-paper7")
        self.assertEqual(validate_record(self.record), ("nusp", "123"))
        later = dict(self.pub, tipo="anais_congressos", evento_id="evento", identificacao_doi="10.1234/novo")
        self.assertTrue(matches_work(later, self.record, event_id="evento"))
        self.record["doi"] = "10.1234/outro"
        with self.assertRaises(ValueError):
            validate_record(self.record)

    def test_duplicate_across_nusp_and_lattes_rejected(self):
        self.person["lattes_url"] = "https://lattes.cnpq.br/9999999999999999"
        another = self.record.copy()
        del another["nusp"]
        another["lattes_id"] = "9999999999999999"
        with self.assertRaisesRegex(ValueError, "DOI duplicado"):
            self.calculate([self.record, another])


if __name__ == "__main__":
    unittest.main()
