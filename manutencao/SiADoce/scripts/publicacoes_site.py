"""Perfis coletivos do simulador e arquivo local de consulta institucional."""
from collections import Counter
from datetime import date
import hashlib
import json
import re
from urllib.parse import parse_qsl, urlsplit, urlunsplit


def perfil_lattes(url):
    parts = urlsplit(url)
    if parts.scheme in ('https', 'http'):
        if parts.netloc == 'lattes.cnpq.br' and re.fullmatch(r'/[0-9]{16}/?', parts.path):
            return 'https://lattes.cnpq.br/' + parts.path.strip('/')
        if (parts.netloc == 'buscatextual.cnpq.br' and parts.path == '/buscatextual/visualizacv.do'
                and re.fullmatch(r'id=K[A-Z0-9]+', parts.query)):
            return urlunsplit(('https', parts.netloc, parts.path, parts.query, ''))
    raise ValueError('O currículo usado na análise precisa de um endereço público verificável do CNPq.')


def fonte_bibliografica(url, lattes):
    if not url:
        return lattes
    parts = urlsplit(url)
    host = parts.hostname or ''
    if (parts.scheme not in ('http', 'https') or not re.fullmatch(r'[a-z0-9.-]+\.[a-z]{2,}', host)
            or host.endswith(('.local', '.internal', '.localhost', '.test', '.invalid'))
            or parts.netloc != host or any(char.isspace() or char == '\\' for char in url)):
        return lattes
    # Fontes editoriais às vezes precisam de um identificador público da obra.
    # Outros parâmetros (por exemplo, links de sessão) não são distribuídos.
    public_keys = {'id', 'idevent', 'papernum', 'page_id', 'action', 'module', 'p', 'doi', 'article', 'articleid'}
    if any(key.lower() not in public_keys for key, value in parse_qsl(parts.query, keep_blank_values=True)):
        return lattes
    return url


def json_canonico(data):
    return json.dumps(data, ensure_ascii=False, separators=(',', ':'), sort_keys=True)


def perfil_coletivo(docente, inicio, fim, ultimo_fechado):
    atualizacao = date.fromisoformat(docente['dataCV']) if docente['dataCV'] else None
    ultimo_ano = None
    ano_corrente = None
    if atualizacao:
        completo = atualizacao.year if (atualizacao.month, atualizacao.day) == (12, 31) else atualizacao.year - 1
        if completo >= inicio and ultimo_fechado >= inicio:
            ultimo_ano = min(completo, ultimo_fechado, fim)
        # A data de janeiro só é consultada para janelas inteiramente posteriores
        # aos anos fechados. Fora dessa janela, basta indicar falta de cobertura.
        if fim > ultimo_fechado and atualizacao.year >= max(inicio, ultimo_fechado + 1):
            ano_corrente = min(atualizacao.year, fim)
    contagens = Counter()
    for artigo in docente['artigos']:
        # A análise aceita apenas A1–A4. Uma pendência sem faixa pode contribuir
        # para o máximo possível sempre que o usuário seleciona faixas do tipo.
        faixa = artigo['faixa']
        if faixa not in ('A1', 'A2', 'A3', 'A4') and (faixa or not artigo['pendente']):
            continue
        chave = (artigo['ano'], artigo['tipo'], faixa or None, artigo['pendente'], artigo['externo'])
        contagens[chave] += 1
    registros = sorted(([*chave, total] for chave, total in contagens.items()), key=json_canonico)
    return {'grupoAnalise': docente['grupoAnalise'], 'anos': sorted(docente['anos']),
            'anoCV': ano_corrente,
            'ultimoAnoCompleto': ultimo_ano, 'contagens': registros}


def dados_coletivos(simulador):
    # A ordem é canônica e perfis iguais ocupam uma única entrada. A chave
    # temporária representa somente contagens públicas; não usa o cadastro.
    inicio, fim = min(simulador['anos']), max(simulador['anos'])
    iguais = Counter(json_canonico(perfil_coletivo(d, inicio, fim, simulador['fimAnosCompletos']))
                     for d in simulador['docentes'])
    perfis = [dict(json.loads(perfil), quantidade=iguais[perfil]) for perfil in sorted(iguais)]
    dados = {**{k: simulador[k] for k in ('anos', 'fimAnosCompletos', 'gruposCredenciamento')}, 'perfis': perfis}
    dados['snapshot'] = hashlib.sha256(json_canonico(dados).encode('utf-8')).hexdigest()
    return dados


def consulta_institucional(producao, simulador, snapshot):
    curriculos = {d['id']: perfil_lattes(d['lattes_url']) for d in producao['docentes']
                  if d['lattes_status'] == 'disponivel'}
    docentes = []
    for docente in simulador['docentes']:
        cv = curriculos[docente['id']]
        dados = {k: docente[k] for k in ('id', 'nome', 'anos', 'dataCV', 'categoria', 'grupoAnalise')}
        dados['lattes'] = cv
        dados['janus'] = {k: docente['janus'][k] for k in ('alunosDistintos', 'ativos', 'titulados', 'desligados')}
        artigos = []
        for registro in docente['artigos']:
            artigo = {k: registro[k] for k in ('titulo', 'veiculo', 'ano', 'tipo', 'faixa', 'pendente', 'externo', 'motivo')}
            artigo['fonte'] = fonte_bibliografica(registro.get('fonte'), cv)
            artigos.append(artigo)
        dados['artigos'] = artigos
        docentes.append(dados)
    parametros = {k: simulador[k] for k in ('anos', 'fimAnosCompletos', 'periodoJanus', 'gruposCredenciamento')}
    return {'schema_version': 1, 'snapshot': snapshot, 'simulador': {**parametros, 'docentes': docentes}}


def exportar_analise(directory, data):
    simulador = data['simulador']
    coletivo = dados_coletivos(simulador)
    (directory / 'publicacoes.js').write_text(
        'window.SIADOCE_PUBLICACOES = ' + json_canonico(coletivo) + ';\n', encoding='utf-8')
    individual = consulta_institucional(data['producao'], simulador, coletivo['snapshot'])
    (directory / 'analise-publicacoes.json').write_text(
        json.dumps(individual, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
