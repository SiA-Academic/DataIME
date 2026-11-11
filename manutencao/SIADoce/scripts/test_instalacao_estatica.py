import importlib.util
from pathlib import Path
import tempfile
import unittest
from unittest.mock import Mock, patch


spec = importlib.util.spec_from_file_location('site_estatico', Path(__file__).with_name('gerar-site.py'))
site = importlib.util.module_from_spec(spec)
spec.loader.exec_module(site)


class InstalacaoEstaticaTest(unittest.TestCase):
    def test_repete_renomeacao_bloqueada_pelo_windows(self):
        origem = Mock()
        bloqueio = PermissionError('arquivo em uso')
        bloqueio.winerror = 32
        origem.rename.side_effect = [bloqueio, None]
        with patch.object(site.time, 'sleep') as aguardar:
            site.mover_instalacao(origem, 'destino')
        self.assertEqual(origem.rename.call_count, 2)
        aguardar.assert_called_once_with(0.2)

    def test_preserva_edicao_anterior_quando_a_instalacao_falha(self):
        pasta_testes = site.ROOT / 'tmp'
        pasta_testes.mkdir(exist_ok=True)
        for falha_ao_restaurar in (False, True):
            with self.subTest(falha_ao_restaurar=falha_ao_restaurar), tempfile.TemporaryDirectory(dir=pasta_testes) as temp:
                destino = Path(temp) / 'site'
                destino.mkdir()
                (destino / 'anterior.html').write_text('original')

                def mover(origem, alvo):
                    if origem.name == 'novo' or (origem.name == 'anterior' and falha_ao_restaurar):
                        raise PermissionError('diretório em uso')
                    origem.rename(alvo)

                with (patch.object(site, 'dataset', return_value={}),
                      patch.object(site, 'stage_site', side_effect=lambda pasta, *_: pasta.mkdir()),
                      patch.object(site, 'adapt_external_paths'), patch.object(site, 'mover_instalacao', mover)):
                    with self.assertRaises(OSError):
                        site.build(destino)
                copias = list(Path(temp).rglob('anterior.html'))
                self.assertEqual(len(copias), 1)
                self.assertEqual(copias[0].read_text(), 'original')
                self.assertEqual(copias[0].parent == destino, not falha_ao_restaurar)
