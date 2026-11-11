import json
import unittest
from pathlib import Path

from publicacoes_site import fonte_do_historico, historico_publico


class HistoricoPublicoTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        arquivo = Path(__file__).resolve().parents[3] / 'SIADoce/dados/producao.js'
        script = arquivo.read_text(encoding='utf-8').strip()
        cls.historico = json.loads(script.removeprefix('window.SIADOCE_PRODUCAO = ').removesuffix(';'))

    def test_projecao_preserva_dados_publicados(self):
        self.assertEqual(historico_publico(self.historico), self.historico)
        docentes = self.historico['docentes']
        self.assertTrue(docentes)
        self.assertEqual(len({d['id'] for d in docentes}), len(docentes))
        for d in docentes:
            for a in d['anos']:
                self.assertIn(a['ano'], self.historico['anos'])
                if d['lattes_status'] != 'disponivel':
                    self.assertEqual(a['pontos_status'], 'cv_ausente')
                    self.assertIsNone(a['pontos_referencia'])

    def test_novos_campos_na_origem_nao_sao_publicados(self):
        docente = next(d for d in self.historico['docentes'] if any(a['publicacoes'] for a in d['anos']))
        ano = next(a for a in docente['anos'] if a['publicacoes'])
        registro = {
            **ano['publicacoes'][0], 'campo_interno': 'somente-local',
            'fontes_evento': [
                {'url': 'https://example.org/anais', 'titulo': 'Anais', 'origem': 'somente-local'},
                'https://example.org/artigo?token=somente-local',
            ],
        }
        ano = {**ano, 'campo_interno': 'somente-local', 'publicacoes': [registro]}
        docente = {**docente, 'lattes_pdf': 'somente-local', 'anos': [ano]}
        entrada = {'anos': [ano['ano']], 'docentes': [docente], 'auditoria': 'somente-local'}
        saida = historico_publico(entrada)
        self.assertNotIn('somente-local', json.dumps(saida))
        artigo = saida['docentes'][0]['anos'][0]['publicacoes'][0]
        self.assertEqual(artigo['fontes_evento'], [{'url': 'https://example.org/anais', 'titulo': 'Anais'}])

    def test_consulta_publica_ao_h5(self):
        url = 'https://scholar.google.com/citations?hl=en&view_op=search_venues&vq=algorithms'
        self.assertEqual(fonte_do_historico(url), url)
        self.assertFalse(fonte_do_historico(url + '&token=invalido'))


if __name__ == '__main__':
    unittest.main()
