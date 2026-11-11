"""Publicações por docente e suplemento local de orientação do Janus."""
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


def bibliografia_publica(producao, simulador):
    curriculos = {d['id']: perfil_lattes(d['lattes_url']) for d in producao['docentes']
                  if d['lattes_status'] == 'disponivel'}
    docentes = []
    for docente in simulador['docentes']:
        cv = curriculos[docente['id']]
        dados = {k: docente[k] for k in ('id', 'nome', 'anos', 'dataCV', 'grupoAnalise')}
        dados['lattes'] = cv
        artigos = []
        for registro in docente['artigos']:
            artigo = {k: registro[k] for k in ('titulo', 'veiculo', 'ano', 'tipo', 'faixa', 'pendente', 'externo', 'motivo')}
            artigo['fonte'] = fonte_bibliografica(registro.get('fonte'), cv)
            artigos.append(artigo)
        dados['artigos'] = artigos
        docentes.append(dados)
    resultado = {k: simulador[k] for k in ('anos', 'fimAnosCompletos')}
    resultado['gruposCredenciamento'] = [{k: grupo[k] for k in ('id', 'nome')}
                                         for grupo in simulador['gruposCredenciamento']]
    resultado['docentes'] = docentes
    resultado['snapshot'] = hashlib.sha256(json_canonico(resultado).encode('utf-8')).hexdigest()
    return resultado


def consulta_institucional(bibliografia, simulador):
    cadastro = {docente['id']: docente for docente in simulador['docentes']}
    docentes = []
    for ficha in bibliografia['docentes']:
        docente = cadastro[ficha['id']]
        janus = {k: docente['janus'][k] for k in ('alunosDistintos', 'ativos', 'titulados', 'desligados')}
        docentes.append({**ficha, 'categoria': docente['categoria'], 'janus': janus})
    parametros = {k: simulador[k] for k in ('anos', 'fimAnosCompletos', 'periodoJanus', 'gruposCredenciamento')}
    return {'schema_version': 1, 'snapshot': bibliografia['snapshot'], 'simulador': {**parametros, 'docentes': docentes}}


def exportar_analise(directory, data):
    simulador = data['simulador']
    bibliografia = bibliografia_publica(data['producao'], simulador)
    (directory / 'publicacoes.js').write_text(
        'window.SIADOCE_PUBLICACOES = ' + json_canonico(bibliografia) + ';\n', encoding='utf-8')
    individual = consulta_institucional(bibliografia, simulador)
    (directory / 'analise-publicacoes.json').write_text(
        json.dumps(individual, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
