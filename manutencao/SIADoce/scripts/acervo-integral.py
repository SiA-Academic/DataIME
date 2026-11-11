"""Arquiva, verifica e recompõe a árvore anterior do sistema no acervo local."""
import argparse
from collections import defaultdict
from contextlib import contextmanager
import hashlib
import json
import os
from pathlib import Path, PurePosixPath
from tempfile import TemporaryDirectory
import time
from zipfile import ZIP_DEFLATED, ZipFile


MANUTENCAO = Path(__file__).resolve().parents[1]
PACOTE = MANUTENCAO / 'acervo-historico' / 'siadoce-original.zip'
ESTAVEIS = ('atualizacoes', 'analises-avulsas', 'referencia-anterior')


def copiar_e_calcular(entrada, saida=None):
    digest = hashlib.sha256()
    while bloco := entrada.read(1024 * 1024):
        digest.update(bloco)
        if saida is not None:
            saida.write(bloco)
    return digest.hexdigest()


def sha256(arquivo):
    with arquivo.open('rb') as entrada:
        return copiar_e_calcular(entrada)


def arquivar(origem):
    origem = origem.resolve(strict=True)
    if MANUTENCAO.is_relative_to(origem) or origem.is_relative_to(MANUTENCAO):
        raise ValueError('A origem da migração deve ser externa à pasta de manutenção.')
    if PACOTE.exists():
        raise FileExistsError('O acervo integral já existe. Use o comando verificar.')
    existentes = {}
    for nome in ESTAVEIS:
        for item in sorted((MANUTENCAO / nome).rglob('*')):
            if not item.is_file() or item.is_symlink():
                continue
            if nome == 'atualizacoes' and item.parent == MANUTENCAO / nome:
                continue  # A última execução e o arquivo de controle podem mudar.
            existentes.setdefault(sha256(item), item.relative_to(MANUTENCAO).as_posix())

    manifesto = {'versao': 1, 'diretorios': [], 'arquivos': {}, 'referencias': {}}
    gravados = set()
    PACOTE.parent.mkdir(exist_ok=True)
    with TemporaryDirectory(dir=PACOTE.parent) as tmp:
        temporario = Path(tmp) / 'acervo.zip'
        with ZipFile(temporario, 'w', compression=ZIP_DEFLATED) as pacote:
            for item in sorted(origem.rglob('*')):
                nome = item.relative_to(origem).as_posix()
                if item.is_symlink():
                    raise ValueError('A árvore de origem contém um link simbólico.')
                if item.is_dir():
                    manifesto['diretorios'].append(nome)
                    continue
                digest = sha256(item)
                stat = item.stat()
                manifesto['arquivos'][nome] = [digest, stat.st_size, stat.st_mtime_ns]
                if digest in existentes:
                    manifesto['referencias'][digest] = existentes[digest]
                elif digest not in gravados:
                    with item.open('rb') as entrada, pacote.open(f'conteudo/{digest}', 'w') as saida:
                        if copiar_e_calcular(entrada, saida) != digest:
                            raise ValueError('O conteúdo da origem mudou durante a cópia.')
                    gravados.add(digest)
            pacote.writestr('manifesto.json', json.dumps(manifesto, ensure_ascii=False, indent=1))
        with ZipFile(temporario) as pacote:
            conferir(pacote, manifesto)
        temporario.rename(PACOTE)


def resolver(raiz, relativo):
    nome = PurePosixPath(relativo)
    if '\\' in relativo or ':' in relativo or nome.is_absolute() or '..' in nome.parts or not nome.parts:
        raise ValueError('Caminho inválido no manifesto.')
    alvo = raiz.joinpath(*nome.parts)
    if not alvo.resolve().is_relative_to(raiz.resolve()):
        raise ValueError('O caminho do manifesto está fora do acervo.')
    return alvo


@contextmanager
def abrir_conteudo(pacote, referencias, digest):
    if digest in referencias:
        local = referencias[digest]
        if PurePosixPath(local).parts[0] not in ESTAVEIS:
            raise ValueError('Referência fora das pastas de histórico.')
        with resolver(MANUTENCAO, local).open('rb') as entrada:
            yield entrada
    else:
        with pacote.open(f'conteudo/{digest}') as entrada:
            yield entrada


def conferir(pacote, manifesto):
    if manifesto['versao'] != 1:
        raise ValueError('Versão de manifesto não reconhecida.')
    tamanhos = {}
    for digest, tamanho, _ in manifesto['arquivos'].values():
        if tamanhos.setdefault(digest, tamanho) != tamanho:
            raise ValueError('Tamanhos incompatíveis para o mesmo conteúdo.')
    for digest in tamanhos:
        with abrir_conteudo(pacote, manifesto['referencias'], digest) as entrada:
            if copiar_e_calcular(entrada) != digest or entrada.tell() != tamanhos[digest]:
                raise ValueError('O conteúdo arquivado diverge do manifesto.')
    print(f"{len(manifesto['arquivos'])} arquivos, {len(manifesto['diretorios'])} diretórios, "
          f"{len(tamanhos)} conteúdos distintos e {len(manifesto['referencias'])} conteúdos "
          "reutilizados dos históricos locais. SHA-256 conferido.")


def restaurar(pacote, manifesto, destino):
    destino = destino.resolve()
    if destino.exists():
        raise FileExistsError('Escolha uma pasta nova para a restauração.')
    destino.parent.mkdir(parents=True, exist_ok=True)
    with TemporaryDirectory(dir=destino.parent) as tmp:
        raiz = Path(tmp) / 'original'
        raiz.mkdir()
        for nome in manifesto['diretorios']:
            resolver(raiz, nome).mkdir(parents=True, exist_ok=True)
        pelos_dados = defaultdict(list)
        for nome, (digest, tamanho, mtime) in manifesto['arquivos'].items():
            pelos_dados[digest].append((nome, tamanho, mtime))
        for digest, arquivos in pelos_dados.items():
            with abrir_conteudo(pacote, manifesto['referencias'], digest) as entrada:
                conteudo = entrada.read()
            if hashlib.sha256(conteudo).hexdigest() != digest:
                raise ValueError('O conteúdo encontrado para restauração diverge do manifesto.')
            for nome, tamanho, mtime in arquivos:
                if len(conteudo) != tamanho:
                    raise ValueError('O tamanho restaurado diverge do manifesto.')
                arquivo = resolver(raiz, nome)
                arquivo.write_bytes(conteudo)
                os.utime(arquivo, ns=(mtime, mtime))
        for espera in (.25, .5, 1, 2, 4):
            try:
                raiz.rename(destino)
                return
            except OSError as erro:
                if getattr(erro, 'winerror', None) not in (5, 32, 33):
                    raise
                time.sleep(espera)
        raiz.rename(destino)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    comandos = parser.add_subparsers(dest='comando', required=True)
    comandos.add_parser('arquivar').add_argument('origem', type=Path)
    comandos.add_parser('verificar')
    comandos.add_parser('restaurar').add_argument('destino', type=Path)
    args = parser.parse_args()
    if args.comando == 'arquivar':
        arquivar(args.origem)
    else:
        with ZipFile(PACOTE) as pacote:
            manifesto = json.loads(pacote.read('manifesto.json'))
            conferir(pacote, manifesto)
            if args.comando == 'restaurar':
                restaurar(pacote, manifesto, args.destino)


if __name__ == '__main__':
    main()
