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


def fonte_bibliografica(url, lattes, parametros_adicionais=()):
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
    public_keys.update(parametros_adicionais)
    if any(key.lower() not in public_keys for key, value in parse_qsl(parts.query, keep_blank_values=True)):
        return lattes
    return url


def json_canonico(data):
    return json.dumps(data, ensure_ascii=False, separators=(',', ':'), sort_keys=True)


def fonte_do_historico(url):
    # Consultas públicas dos catálogos, editoras e repositórios que acompanham a ficha.
    partes = urlsplit(url)
    parametros = {
        'scholar.google.com': ('hl', 'view_op', 'venue', 'vq'),
        'cbsoft.sbc.org.br': ('lang',),
        'iceis.scitevents.org': ('y',),
        'journals.sagepub.com': ('download',),
        'ri.conicet.gov.ar': ('isallowed', 'sequence'),
        'www.mdpi.com': ('version',),
    }.get(partes.hostname, ())
    if (partes.hostname == 'cgi.cse.unsw.edu.au' and partes.path == '/~eptcs/paper.cgi'
            and re.fullmatch(r'[A-Za-z0-9._-]+\.pdf=?', partes.query)):
        parametros = (partes.query.rstrip('=').lower(),)
    return fonte_bibliografica(url, '', parametros)


def registro_publico(registro):
    campos = (
        'ano', 'tipo', 'status', 'titulo', 'veiculo', 'referencia', 'doi', 'motivo',
        'faixa', 'pontos', 'percentil', 'base', 'scopus', 'jcr', 'source_id', 'issn', 'eissn',
        'titulo_catalogo', 'match_method', 'identificacao_doi', 'identificacao_nota',
        'evento_canonico', 'evento_trilha', 'faixa_evento_referencia', 'criterio_evento',
        'gt_anos_validos', 'h5', 'h5_ano', 'h5_periodo', 'h5_consultado_em', 'h5_nota',
        'pendencias_evento', 'revisao_artigo_nota', 'verificacao_artigo_nota',
    )
    resultado = {k: registro[k] for k in campos if k in registro}
    for key in ('alias_fontes', 'fontes_evento', 'identificacao_fontes'):
        fontes = []
        for fonte in registro.get(key) or []:
            url = fonte_do_historico(fonte if isinstance(fonte, str) else fonte['url'])
            if url:
                fontes.append({'url': url, 'titulo': fonte['titulo']} if isinstance(fonte, dict) and fonte.get('titulo') else url)
        if fontes:
            resultado[key] = fontes
    return resultado


def historico_publico(producao):
    campos_ano = (
        'ano', 'pontos_referencia', 'pontos_status', 'periodicos_total', 'periodicos_classificados',
        'pendentes', 'eventos_total', 'eventos_classificados', 'eventos_pendentes',
        'eventos_nao_elegiveis', 'apresentacoes_total',
    )
    docentes = []
    for origem in producao['docentes']:
        docente = {k: origem[k] for k in ('id', 'nome', 'categoria', 'lattes_status',
                                          'lattes_atualizado_em', 'extracao_atualizada_em')}
        if origem.get('lattes_url'):
            docente['lattes_url'] = perfil_lattes(origem['lattes_url'])
        anos = []
        for origem_ano in origem['anos']:
            ano = {k: origem_ano[k] for k in campos_ano}
            contagens = origem_ano['contagens']
            ano['contagens'] = {f'A{i}': contagens[f'A{i}'] for i in range(1, 9)} if contagens else contagens
            ano['publicacoes'] = [registro_publico(r) for r in origem_ano['publicacoes']]
            anos.append(ano)
        docentes.append({**docente, 'anos': anos})
    return {'anos': producao['anos'], 'docentes': docentes}


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
    (directory / 'producao.js').write_text(
        'window.SIADOCE_PRODUCAO = ' + json_canonico(historico_publico(data['producao'])) + ';\n', encoding='utf-8')
    simulador = data['simulador']
    bibliografia = bibliografia_publica(data['producao'], simulador)
    (directory / 'publicacoes.js').write_text(
        'window.SIADOCE_PUBLICACOES = ' + json_canonico(bibliografia) + ';\n', encoding='utf-8')
    individual = consulta_institucional(bibliografia, simulador)
    (directory / 'analise-publicacoes.json').write_text(
        json.dumps(individual, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
