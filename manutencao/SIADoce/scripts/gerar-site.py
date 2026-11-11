"""Gera a instância institucional do SIADoce com as páginas estáticas do SIA."""
import argparse
import json
import shutil
import subprocess
import sys
import tempfile
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPO = ROOT.parents[1]
PUBLIC = REPO / 'SIADoce'
DEFAULT_OUTPUT = REPO / 'SIADoce-institucional'
MARKER = '.sia-doce-institucional'
from grupos_analise import GRUPOS, carregar_excecoes, grupo_analise
from publicacoes_site import exportar_analise, perfil_lattes

sys.path.append(str(ROOT / '.trabalho/dependencias'))
try:
    import yaml
except ImportError:
    sys.exit('Instale o leitor das configurações com: python -m pip install PyYAML')


def texto_configuracao(file):
    # Converte somente os rótulos da instalação original e conserva as personalizações.
    text = file.read_text(encoding='utf-8-sig')
    for anterior in ('SiADoce', 'SIA-Doce'):
        text = text.replace(f'"{anterior}"', '"SIADoce"').replace(
            f'"{anterior} — Sistema de Acompanhamento Docente"',
            '"SIADoce · Sistema de Informações Acadêmicas – Docentes"')
        text = text.replace(f'do {anterior}.', 'do SIADoce.').replace(f'O {anterior} ', 'O SIADoce ')
    return text.replace('"Sistema de Acompanhamento Docente"', '"Sistema de Informações Acadêmicas – Docentes"')


def frontmatter(file):
    text = texto_configuracao(file) if file.name == 'configuracoes.md' else file.read_text(encoding='utf-8-sig')
    lines = text.splitlines()
    if not lines or lines[0].strip() != '---':
        raise ValueError(f'Cabeçalho YAML ausente em {file.name}')
    end = lines.index('---', 1)
    fields = yaml.safe_load('\n'.join(lines[1:end]))
    if not isinstance(fields, dict):
        raise ValueError(f'Cabeçalho YAML inválido em {file.name}')
    return fields


def article_records(faculty):
    articles = []
    replaced = set()
    for item in faculty['quadrienio']['complementos']:
        reference = item.get('referencia_cv')
        if reference:
            replaced.add((reference['ano'], reference['indice']))
        articles.append({
            **{key: item.get(key) for key in ('titulo', 'veiculo', 'ano', 'tipo', 'faixa', 'fonte')},
            'pendente': item['estado'] == 'pendente', 'externo': not reference,
            'motivo': item.get('nota'),
        })
    for year in faculty['anos']:
        for index, item in enumerate(year['publicacoes']):
            if (year['ano'], index) in replaced:
                continue
            event = item['tipo'] == 'anais_congressos' and item['status'] in ('classificado', 'pendente_evento')
            if item['tipo'] != 'periodico' and not event:
                continue
            band = item.get('faixa')
            verified = item.get('match_method') in ('publicacao_evento_verificada', 'publicacao_evento_em_verificacao')
            if (not band and not item.get('faixa_evento_bloqueada') and verified
                    and item.get('h5_status') in ('disponivel', 'nao_localizado')):
                band = item.get('faixa_evento_referencia')
            doi = item.get('identificacao_doi')
            pending = item['status'] != 'classificado'
            articles.append({
                **{key: item.get(key) for key in ('titulo', 'veiculo', 'tipo')},
                'ano': year['ano'], 'faixa': band, 'pendente': pending, 'externo': False,
                'fonte': f'https://doi.org/{doi}' if doi else (item.get('fonte_artigo_evento') or ''),
                'motivo': (item.get('motivo') or '') if pending else '',
            })
    return articles


def simulation(production, register):
    orientation = {doc['id']: doc['janus'] for doc in register['docentes']}
    faculty = []
    period = ''
    for doc in production['docentes']:
        if doc['lattes_status'] != 'disponivel':
            continue
        janus = orientation[doc['id']]
        total = janus.get('total')
        students = janus.get('alunos') or []
        if students and total is not None and len(students) == int(total):
            keys = {str(s.get('nusp') or (s.get('nome') or '').strip().lower()) for s in students}
            total = len(keys - {''})
        period = janus.get('periodo_pdf') or period
        faculty.append({
            **{key: doc.get(key) for key in ('id', 'nome', 'categoria', 'grupoAnalise')},
            'dataCV': doc.get('lattes_atualizado_em'), 'lattes': doc.get('lattes_pdf'),
            'anos': [row['ano'] for row in doc['anos']], 'artigos': article_records(doc),
            'janus': {'alunosDistintos': total, 'titulados': janus.get('titulados'),
                      'desligados': janus.get('desligados'), 'ativos': janus.get('orientandos_area')},
        })
    return {'anos': production['anos'], 'fimAnosCompletos': production['criterio_quadrienio']['fim_anos_completos'],
            'gruposCredenciamento': GRUPOS,
            'periodoJanus': period, 'docentes': faculty}


def dataset(root):
    json_sources = {'docentes': 'docentes', 'alunos_ativos': 'alunos-ativos',
                    'producao': 'producao-docente', 'mensal': 'indicadores-mensais',
                    'lattes_ausentes': 'lattes-ausentes', 'titulados': 'titulados-por-ano'}
    data = {'institucional': True}
    for key, name in json_sources.items():
        data[key] = json.loads((root / 'data/controle' / f'{name}.json').read_text(encoding='utf-8-sig'))
    for key in ('configuracoes', 'publicacoes_periodicos', 'publicacoes_conferencias'):
        name = key.replace('_', '-')
        data[key] = frontmatter(root / 'content/controle' / f'{name}.md')
    exceptions = carregar_excecoes(root)
    for faculty in data['producao']['docentes']:
        faculty['grupoAnalise'] = grupo_analise(faculty, exceptions)
    data['simulador'] = simulation(data['producao'], data['docentes'])
    data['lattes_ausentes']['diretorio'] = 'CVS_LATTES'
    return data


def validate_destination(destination):
    if destination == REPO or REPO.is_relative_to(destination):
        raise ValueError('Escolha uma pasta dedicada à instância institucional.')
    if destination.is_relative_to(REPO) and destination != DEFAULT_OUTPUT:
        raise ValueError(f'Dentro do repositório, use o destino institucional: {DEFAULT_OUTPUT}')
    if destination.exists() and (not destination.is_dir() or
            (any(destination.iterdir()) and not (destination / MARKER).is_file())):
        raise ValueError(f'O destino contém outros arquivos. Escolha uma pasta vazia: {destination}')


def exportar_extratos(directory, data):
    cadastro = {docente['id']: docente for docente in data['producao']['docentes']}
    for base, arquivo in (('publicacoes_periodicos', 'publicacoes.md'), ('publicacoes_conferencias', 'eventos.md')):
        fonte = data[base]
        extrato = {k: fonte[k] for k in ('title', 'fonte', 'atualizado_em', 'periodo_analise', 'desde_ano', 'ate_ano', 'tipo')}
        docentes = []
        for ficha in fonte['publicacoes_por_docente']:
            docente = cadastro.get(ficha['docente_id'])
            if docente is None:
                continue
            registros = [{k: item[k] for k in ('ano', 'tipo', 'titulo', 'veiculo', 'fonte', 'referencia')}
                         for item in ficha['publicacoes']]
            campos = {k: ficha[k] for k in ('docente_id', 'total', 'total_periodicos', 'total_anais_congressos')}
            campos.update(nome=docente['nome'], lattes_atualizado_em=docente.get('lattes_atualizado_em'),
                          lattes_url=perfil_lattes(docente['lattes_url']) if docente.get('lattes_url') else None,
                          publicacoes=registros)
            docentes.append(campos)
        extrato['publicacoes_por_docente'] = docentes
        extrato['publicacoes_sem_docente'] = []
        cabecalho = yaml.safe_dump(extrato, allow_unicode=True, sort_keys=False, width=120)
        (directory / arquivo).write_text('---\n' + cabecalho + '---\n\nExtração dos Lattes dos docentes acompanhados.\n',
                                         encoding='utf-8', newline='\n')


def stage_site(staging, root, data):
    # A interface distribuída é a mesma nas duas edições. Os recursos de acesso
    # institucional são acrescentados a partir de uma lista explícita.
    shutil.copytree(PUBLIC, staging, dirs_exist_ok=True,
                    ignore=shutil.ignore_patterns('*.py', '__pycache__', '.gitignore', 'desktop.ini'))
    for name in ('janus.pdf', 'orientadores.pdf', 'disciplinas.pdf', 'areas.md', 'configuracoes.md',
                 'configuracoes_padrao.md', 'relatorio-alertas-docentes.html', 'relatorio-alertas-docentes.pdf',
                 'publicacoes.md', 'eventos.md'):
        source = root / 'static' / name
        if source.is_file() and name in ('configuracoes.md', 'configuracoes_padrao.md'):
            (staging / name).write_text(texto_configuracao(source), encoding='utf-8')
        elif source.is_file():
            shutil.copy2(source, staging / name)
    for folder in ('CVS_LATTES', 'NORMAS', 'DIRETRIZES', 'downloads'):
        source = root / 'static' / folder
        if source.is_dir():
            target = staging / folder
            target.mkdir(exist_ok=True)
            for file in source.iterdir():
                if file.is_file() and file.suffix.lower() in ('.pdf', '.zip', '.md'):
                    shutil.copy2(file, target / file.name)
    target = staging / 'dados/dados.js'
    target.parent.mkdir(exist_ok=True)
    target.write_text('window.SIADOCE_DADOS = ' + json.dumps(data, ensure_ascii=False, separators=(',', ':'))
                      + ';\n', encoding='utf-8')
    exportar_analise(target.parent, data)
    exportar_extratos(staging / 'downloads', data)
    (staging / 'controle').mkdir(exist_ok=True)
    shutil.copy2(root / 'content/controle/lattes-docentes.csv', staging / 'controle/lattes-docentes.csv')
    (staging / MARKER).write_text('Instância institucional gerada pelo SIADoce.\n', encoding='utf-8')


def build(destination):
    data = dataset(ROOT)
    destination.parent.mkdir(parents=True, exist_ok=True)
    # Mantém as entradas temporárias igualmente fora do índice do repositório.
    work = ROOT / '.trabalho' if destination == DEFAULT_OUTPUT else destination.parent
    work.mkdir(parents=True, exist_ok=True)
    temp = Path(tempfile.mkdtemp(dir=work, prefix='sia-doce-'))
    stage, previous = temp / 'novo', temp / 'anterior'
    instalado = False
    try:
        stage_site(stage, ROOT, data)
        if destination != DEFAULT_OUTPUT:
            adapt_external_paths(stage)
        if destination.exists():
            mover_instalacao(destination, previous)
        try:
            mover_instalacao(stage, destination)
            instalado = True
        except OSError:
            if previous.exists():
                try:
                    mover_instalacao(previous, destination)
                except OSError as error:
                    raise OSError(f'A instalação anterior está preservada em {previous}.') from error
            raise
    finally:
        if instalado or not previous.exists():
            shutil.rmtree(temp)
    print(f'Instância institucional: {destination / "index.html"}')


def mover_instalacao(origem, destino):
    # A sincronização do Windows pode manter um arquivo aberto logo após a cópia.
    for espera in (0.2, 0.5, 1, 2, 4):
        try:
            origem.rename(destino)
            return
        except OSError as erro:
            if getattr(erro, 'winerror', None) not in (5, 32, 33):
                raise
            time.sleep(espera)
    origem.rename(destino)


def refresh_portal(destination):
    # O agregador é o próprio gerador do portal, com seleção explícita dos campos.
    downloads = ('analisador-lattes.zip', 'guia-analisar-lattes.md')
    extratos = ('publicacoes.md', 'eventos.md')
    work = ROOT / '.trabalho'
    work.mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory(dir=work) as temp:
        staging = Path(temp)
        target = staging / 'dados.js'
        subprocess.run([sys.executable, PUBLIC / 'dados/resumir.py', ROOT, '--saida', target], check=True)
        bases_bibliograficas = ('publicacoes.js', 'producao.js')
        for name in bases_bibliograficas:
            shutil.copy2(destination / 'dados' / name, staging / name)
        for name in downloads:
            shutil.copy2(ROOT / 'static/downloads' / name, staging / name)
        for name in extratos:
            shutil.copy2(destination / 'downloads' / name, staging / name)
        target.replace(PUBLIC / 'dados/dados.js')
        for name in bases_bibliograficas:
            (staging / name).replace(PUBLIC / 'dados' / name)
        for name in downloads + extratos:
            (staging / name).replace(PUBLIC / 'downloads' / name)
    print(f'Resumos e analisador atualizados em {PUBLIC}.')


def adapt_external_paths(stage):
    """Portais externos continuam acessíveis quando a edição é copiada sozinha."""
    import re
    import posixpath
    from urllib.parse import urlsplit

    base_url = 'https://sia-academic.github.io/SiA/'
    shutil.copytree(REPO / 'assets', stage / 'assets-sia', dirs_exist_ok=True)
    attributes = re.compile(r"""(\b(?:href|src)=)(["'])([^"']+)\2""", re.IGNORECASE)
    for page in stage.rglob('*.html'):
        local = page.parent.relative_to(stage).as_posix()
        def resolve(match):
            prefix, quote, url = match.groups()
            if not url.startswith('../'):
                return match.group(0)
            parts = urlsplit(url)
            path = posixpath.normpath(posixpath.join(local, parts.path))
            if path == '..' or path.startswith('../'):
                relative = path.removeprefix('..').lstrip('/')
                if relative.startswith('assets/'):
                    new_url = posixpath.relpath('assets-sia/' + relative[len('assets/'):], local)
                elif relative.lower().startswith(('siadoce/', 'siadoce-institucional/')):
                    new_url = posixpath.relpath(relative.split('/', 1)[1] or 'index.html', local)
                else:
                    new_url = base_url + relative
                if parts.query:
                    new_url += '?' + parts.query
                if parts.fragment:
                    new_url += '#' + parts.fragment
                return prefix + quote + new_url + quote
            return match.group(0)
        text = page.read_text(encoding='utf-8')
        updated = attributes.sub(resolve, text)
        if updated != text:
            page.write_text(updated, encoding='utf-8')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--saida', type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument('--verificar', action='store_true', help='Verifica o destino e as dependências.')
    parser.add_argument('--atualizar-portal', action='store_true', help='Atualiza também o resumo agregado e o analisador no portal.')
    args = parser.parse_args()
    destination = args.saida.resolve()
    try:
        validate_destination(destination)
        if not args.verificar:
            build(destination)
            if args.atualizar_portal:
                refresh_portal(destination)
    except (OSError, ValueError, KeyError, subprocess.CalledProcessError, yaml.YAMLError) as error:
        sys.exit(str(error))
