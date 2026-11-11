"""Importa uma exportação validada da planilha Google, sem alterar a fonte."""
import argparse
import json
import os
from pathlib import Path
import tempfile

from validar_catalogo_periodicos import load_catalog_snapshot, validate_snapshot


def import_catalog(source, root):
    snapshot = load_catalog_snapshot(source)
    summary = validate_snapshot(snapshot)
    if summary['ano_metrica'] != 2025:
        raise ValueError('O classificador atual exige métricas de 2025. Revise a metodologia antes de mudar o ano.')
    destination = Path(root) / 'data' / 'controle' / 'catalogo-periodicos-google.json'
    if not destination.parent.is_dir():
        raise ValueError('Pasta data/controle não encontrada. Informe a raiz do SiADoce.')
    # Serialize the already validated object; never copy a source changed after validation.
    payload = json.dumps(snapshot, ensure_ascii=False, separators=(',', ':'), allow_nan=False) + '\n'
    temporary = None
    try:
        with tempfile.NamedTemporaryFile(mode='w', encoding='utf-8', newline='\n',
                                         dir=destination.parent, prefix='.catalogo-', suffix='.tmp',
                                         delete=False) as handle:
            temporary = Path(handle.name)
            handle.write(payload)
            handle.flush()
            os.fsync(handle.fileno())
        os.replace(temporary, destination)
    finally:
        if temporary is not None and temporary.exists():
            temporary.unlink()
    return destination, summary


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('arquivo', type=Path, help='JSON baixado pelo menu SiADoce da planilha Google')
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[1])
    args = parser.parse_args()
    try:
        path, summary = import_catalog(args.arquivo, args.root)
    except (ValueError, OSError, KeyError) as exc:
        parser.exit(1, f'Importação cancelada; o catálogo anterior foi preservado.\n{exc}\n')
    print(f"Catálogo importado: {summary['periodicos']} periódicos; {summary['categorias_jcr']} categorias JCR; métricas {summary['ano_metrica']}.")
    print(path)
    print('Execute build-public.ps1 para atualizar o site. Edite os dados somente na planilha Google.')


if __name__ == '__main__':
    main()
