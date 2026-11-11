// Gerado por gerar-instalacao.cjs; editar Code.gs, Importar.html e Exportar.html.
/**
 * SIADoce — importação e exportação na planilha à qual este script está vinculado.
 * @OnlyCurrentDoc
 */
const SIADOCE_ABAS = Object.freeze({
  ranking_periodicos: 'Periódicos dos docentes',
  pendencias: 'Pendências',
  eventos: 'Eventos',
  eventos_trabalhos: 'Eventos — trabalhos'
});
const SIADOCE_LIMITE_BYTES = 8 * 1024 * 1024;
const SIADOCE_CATALOGO_ID = '1TF6Fhi7EjhiSU59mGqVsbbR55OeQdjZiTvHvhSxLeOc';
const SIADOCE_CATALOGO_URL = 'https://docs.google.com/spreadsheets/d/' + SIADOCE_CATALOGO_ID + '/edit';
const SIADOCE_CATALOGO_LIMITE_BYTES = 32 * 1024 * 1024;
const SIADOCE_CATALOGO_ABAS = Object.freeze([
  {nome: 'Consulta', colunas: 11, cabecalho: 1, identificador: 10, issns: [6, 7]},
  {nome: 'Periódicos', colunas: 20, cabecalho: 6, identificador: 12, issns: [6, 7]},
  {nome: 'Critérios e fontes', colunas: 26, cabecalho: 0, issns: []},
  {nome: 'JCR — resumo', colunas: 11, cabecalho: 1, issns: [4, 5]},
  {nome: 'JCR por categoria', colunas: 13, cabecalho: 1, identificador: 11, issns: [1, 2]}
]);
const SIADOCE_ATUAL = 'SIADOCE_IMPORTACAO_ATUAL_V1';
const SIADOCE_ULTIMA = 'SIADOCE_IMPORTACAO_ULTIMA_V1';
const SIADOCE_ANTERIOR = 'SIADOCE_IMPORTACAO_ANTERIOR_V1';
const SIADOCE_METODOS = Object.freeze({
  eventos_escopo: 'Eventos: Escopo',
  eventos_trabalhos: 'Eventos: Trabalhos',
  eventos_atualizacao: 'Eventos: Fontes e atualização',
  ranking_escopo: 'Periódicos dos docentes: escopo',
  ranking_contagem: 'Periódicos dos docentes: contagem',
  ranking_reconciliacoes: 'Periódicos dos docentes: anos reconciliados',
  ranking_atualizacao: 'Periódicos dos docentes: atualização'
});
const SIADOCE_CRITERIOS = 'Critérios e fontes';
const SIADOCE_EVENTOS_HEADERS = [
  'Evento', 'ID do evento', 'Trilha / série', 'Faixa candidata — condicional', 'H5', 'Situação do H5',
  'Critérios GT', 'Edições com GT verificado', 'Faixa pelo H5', 'Edição e período da métrica',
  'Data da consulta', 'Recomendação CE-SBC', 'Indução documentada', 'Critério da faixa candidata',
  'Outras grafias reconhecidas', 'Fontes de métricas e critérios', 'Fontes da verificação GT',
  'Notas de evidência', 'Trabalhos verificados', 'Trabalhos em revisão'
];
const SIADOCE_TRABALHOS_HEADERS = [
  'Ano', 'Título exato do trabalho', 'Evento / trilha identificados', 'Resultado atual no SIADoce',
  'Faixa aplicada ao trabalho', 'Peso na fórmula A1–A4', 'Modalidade comprovada', 'GT da edição',
  'Revisão bloqueia a faixa', 'Veículo exato do currículo', 'ID do evento', 'Situação da evidência',
  'Faixa candidata do evento — condicional', 'Pendências para classificação', 'Nota da verificação / revisão',
  'Fontes da comprovação', 'Fontes dos critérios aplicados', 'Data da verificação',
  'Aderência documentada', 'Correção do tipo no currículo'
];

function onOpen() {
  SpreadsheetApp.getUi().createMenu('SIADoce')
    .addItem('Importar atualização', 'abrirImportacao')
    .addItem('Exportar catálogo para o SIADoce', 'abrirExportacaoCatalogo')
    .addItem('Restaurar última importação', 'restaurarUltimaImportacao')
    .addToUi();
}

function abrirImportacao() {
  SpreadsheetApp.getUi().showModalDialog(
    HtmlService.createHtmlOutput("<!DOCTYPE html>\n<html lang=\"pt-BR\">\n<head>\n  <meta charset=\"utf-8\">\n  <base target=\"_top\">\n  <style>\n    body { font: 14px Arial, sans-serif; color: #243440; margin: 24px; line-height: 1.5; }\n    h1 { font-size: 20px; margin: 0 0 12px; }\n    p { margin: 10px 0; }\n    label { display: block; font-weight: bold; margin-top: 18px; }\n    input { margin: 8px 0; max-width: 100%; }\n    details { margin: 12px 0; }\n    summary { cursor: pointer; color: #29465b; }\n    textarea { box-sizing: border-box; width: 100%; min-height: 120px; resize: vertical;\n      border: 1px solid #b9c6ce; border-radius: 4px; padding: 8px; font: 12px monospace; }\n    button { border: 1px solid #b9c6ce; border-radius: 5px; background: #f0f3f5; color: #243440;\n      padding: 9px 14px; margin: 8px 8px 8px 0; cursor: pointer; font-size: 14px; }\n    button.primary { color: white; background: #29465b; border-color: #29465b; }\n    button:disabled { opacity: .5; cursor: default; }\n    #status { white-space: pre-wrap; border-left: 3px solid #7d9bae; padding-left: 12px; }\n    #status.error { border-color: #a93333; color: #8a2424; }\n    table { width: 100%; border-collapse: collapse; margin: 12px 0; }\n    th, td { border-bottom: 1px solid #dce3e7; padding: 6px; text-align: left; }\n    th { background: #eef2f4; }\n    .small { font-size: 12px; color: #536674; }\n    #result { border: 1px solid #cad9d0; background: #f4f9f5; padding: 12px; white-space: pre-wrap; }\n    [hidden] { display: none !important; }\n  </style>\n</head>\n<body>\n  <h1>Importar atualização do SIADoce</h1>\n  <p>Escolha o JSON gerado no computador e confira os totais antes de importar.</p>\n  <p class=\"small\">Serão substituídas apenas as quatro abas geradas: Periódicos dos docentes,\n    Pendências, Eventos e Eventos — trabalhos. As notas correspondentes em Critérios e fontes\n    também serão atualizadas. O catálogo de métricas não será alterado.</p>\n  <label for=\"arquivo\">Arquivo de atualização (.json, até 8 MiB)</label>\n  <input id=\"arquivo\" type=\"file\" accept=\".json,application/json\">\n  <details>\n    <summary>Colar conteúdo do arquivo</summary>\n    <p id=\"ajudaTexto\" class=\"small\">Se preferir, abra o arquivo JSON em um editor de texto,\n      copie seu conteúdo completo e cole abaixo. A conferência e a importação são as mesmas.</p>\n    <label for=\"textoAlternativo\">Conteúdo completo do arquivo JSON</label>\n    <textarea id=\"textoAlternativo\" rows=\"7\" spellcheck=\"false\" aria-describedby=\"ajudaTexto\"></textarea>\n    <button id=\"usarTexto\" disabled>Usar conteúdo colado</button>\n  </details>\n  <div><button id=\"conferir\" disabled>Conferir arquivo</button></div>\n  <p id=\"status\" role=\"status\" aria-live=\"polite\">Selecione o arquivo para começar.</p>\n  <section id=\"previa\" hidden aria-label=\"Prévia da atualização\">\n    <p id=\"origem\"></p>\n    <table><thead><tr><th>Aba</th><th>Linhas de dados</th></tr></thead><tbody id=\"abas\"></tbody></table>\n    <p id=\"totais\"></p>\n    <p class=\"small\">A importação preserva cópias ocultas da versão anterior. Evite editar essas abas\n      enquanto a atualização estiver em andamento. Importar novamente o mesmo arquivo não duplica registros.</p>\n    <button id=\"importar\" class=\"primary\" disabled>Importar atualização</button>\n  </section>\n  <p id=\"result\" hidden></p>\n  <button id=\"fechar\">Fechar</button>\n  <script>\n    'use strict';\n    let texto = '';\n    let token = '';\n    let versao = 0;\n    let ocupado = false;\n    const el = id => document.getElementById(id);\n    function mensagem(msg, erro = false) {\n      el('status').textContent = msg;\n      el('status').className = erro ? 'error' : '';\n    }\n    function bloquear(b) {\n      ocupado = b;\n      el('arquivo').disabled = b;\n      el('textoAlternativo').disabled = b;\n      el('usarTexto').disabled = b || !el('textoAlternativo').value.trim();\n      el('conferir').disabled = b || !texto;\n      el('importar').disabled = b || !token;\n      el('fechar').disabled = b;\n    }\n    function erro(e) {\n      bloquear(false);\n      mensagem(e && e.message ? e.message : String(e), true);\n    }\n    function invalidarSelecao() {\n      versao++;\n      texto = ''; token = '';\n      el('previa').hidden = true;\n      el('result').hidden = true;\n      bloquear(false);\n      return versao;\n    }\n    function usarConteudo(conteudo, aviso) {\n      if (!conteudo.trim()) { erro('O conteúdo está vazio. Selecione ou cole o arquivo JSON completo.'); return; }\n      if (conteudo.length > 8 * 1024 * 1024 || new Blob([conteudo]).size > 8 * 1024 * 1024) {\n        erro('O conteúdo excede 8 MiB.'); return;\n      }\n      texto = conteudo;\n      bloquear(false);\n      mensagem(aviso + ' Clique em Conferir arquivo.');\n    }\n    el('textoAlternativo').addEventListener('input', function () {\n      if (ocupado) return;\n      invalidarSelecao();\n      mensagem(this.value.trim() ? 'Clique em Usar conteúdo colado para selecionar este texto.' :\n        'Selecione o arquivo ou cole seu conteúdo para começar.');\n    });\n    el('usarTexto').addEventListener('click', function () {\n      if (ocupado) return;\n      invalidarSelecao();\n      el('arquivo').value = '';\n      usarConteudo(el('textoAlternativo').value, 'Conteúdo selecionado.');\n    });\n    el('arquivo').addEventListener('change', async function () {\n      if (ocupado) return;\n      el('textoAlternativo').value = '';\n      const minhaVersao = invalidarSelecao();\n      const arquivo = this.files[0];\n      if (!arquivo) { mensagem('Selecione o arquivo para começar.'); return; }\n      if (arquivo.size > 8 * 1024 * 1024) { erro('O arquivo excede 8 MiB.'); return; }\n      if (!arquivo.name.toLowerCase().endsWith('.json')) { erro('Selecione o arquivo .json gerado pelo SIADoce.'); return; }\n      mensagem('Lendo o arquivo selecionado…');\n      try {\n        const lido = await arquivo.text();\n        if (minhaVersao !== versao) return;\n        usarConteudo(lido, 'Arquivo selecionado.');\n      } catch (e) { if (minhaVersao === versao) erro(e); }\n    });\n    el('conferir').addEventListener('click', function () {\n      if (ocupado || !texto) return;\n      token = ''; bloquear(true);\n      mensagem('Conferindo formato, contagens e abas…');\n      google.script.run.withSuccessHandler(function (p) {\n        token = p.token;\n        el('origem').textContent = 'Planilha: ' + p.arquivo + '\\nPeríodo: ' + p.periodo +\n          ' · Gerado em: ' + new Date(p.generated_at).toLocaleString('pt-BR');\n        el('abas').replaceChildren();\n        p.tabs.forEach(function (aba) {\n          const linha = document.createElement('tr');\n          [aba.title, String(aba.rows)].forEach(function (valor) {\n            const celula = document.createElement('td');\n            celula.textContent = valor;\n            linha.appendChild(celula);\n          });\n          el('abas').appendChild(linha);\n        });\n        el('totais').textContent = p.resumo.total_registros + ' registros por docente; ' +\n          p.resumo.publicacoes_periodicos_unicas + ' publicações únicas em periódicos; ' +\n          (p.resumo.pendentes_periodicos + p.resumo.pendentes_eventos) + ' pendências.';\n        el('previa').hidden = false;\n        mensagem('Conferência concluída. Confira os números e clique em Importar atualização.');\n        bloquear(false);\n      }).withFailureHandler(erro).validarAtualizacao(texto);\n    });\n    el('importar').addEventListener('click', function () {\n      if (ocupado || !token) return;\n      bloquear(true);\n      mensagem('Criando cópias de segurança e atualizando as abas. Aguarde sem fechar esta janela…');\n      google.script.run.withSuccessHandler(function (r) {\n        token = '';\n        bloquear(false);\n        el('previa').hidden = true;\n        mensagem(r.unchanged ? 'A planilha já estava atualizada.' : 'Atualização concluída.');\n        el('result').textContent = r.message + '\\nData: ' + new Date(r.updated_at).toLocaleString('pt-BR') +\n          '\\nIdentificador: ' + r.id;\n        el('result').hidden = false;\n      }).withFailureHandler(function (e) { token = ''; erro(e); }).importarAtualizacao(texto, token);\n    });\n    el('fechar').addEventListener('click', () => google.script.host.close());\n  </script>\n</body>\n</html>\n").setWidth(620).setHeight(620),
    'Atualizar a planilha do SIADoce'
  );
}

function abrirExportacaoCatalogo() {
  SpreadsheetApp.getUi().showModalDialog(
    HtmlService.createHtmlOutput("<!DOCTYPE html>\n<html lang=\"pt-BR\">\n<head>\n  <meta charset=\"utf-8\">\n  <base target=\"_top\">\n  <style>\n    body { font: 14px Arial, sans-serif; color: #243440; margin: 24px; line-height: 1.5; }\n    h1 { font-size: 20px; margin: 0 0 12px; }\n    p { margin: 10px 0; }\n    button, a.download { display: inline-block; border: 1px solid #b9c6ce; border-radius: 5px;\n      background: #f0f3f5; color: #243440; padding: 9px 14px; margin: 8px 8px 8px 0;\n      cursor: pointer; font: inherit; text-decoration: none; }\n    a.download { background: #29465b; border-color: #29465b; color: white; }\n    button:disabled { opacity: .5; cursor: default; }\n    #status { white-space: pre-wrap; border-left: 3px solid #7d9bae; padding-left: 12px; }\n    #status.error { border-color: #a93333; color: #8a2424; }\n    .small { font-size: 12px; color: #536674; }\n    [hidden] { display: none !important; }\n  </style>\n</head>\n<body>\n  <h1>Catálogo para o SIADoce</h1>\n  <p>A planilha Google é o local de edição. Este download leva os valores atuais\n    das cinco abas do catálogo para o processamento do SIADoce.</p>\n  <p class=\"small\">Evite editar o catálogo durante a exportação. Erros de fórmula e\n    identificadores inválidos precisam ser corrigidos na própria planilha.</p>\n  <button id=\"preparar\">Preparar download</button>\n  <p id=\"status\" role=\"status\" aria-live=\"polite\">Clique em Preparar download para ler a planilha atual.</p>\n  <div id=\"resultado\" hidden>\n    <a id=\"download\" class=\"download\" download=\"catalogo-periodicos-google.json\">Baixar catálogo JSON</a>\n    <p class=\"small\">Use o arquivo baixado para atualizar o SIADoce. Não o edite: faça as\n      correções na planilha Google e exporte novamente. A conferência cruzada das abas\n      será feita pelo atualizador antes de aceitar o catálogo.</p>\n  </div>\n  <button id=\"fechar\">Fechar</button>\n  <script>\n    'use strict';\n    const el = id => document.getElementById(id);\n    let ocupado = false;\n    let arquivoUrl = '';\n    function mensagem(texto, erro = false) {\n      el('status').textContent = texto;\n      el('status').className = erro ? 'error' : '';\n    }\n    function bloquear(valor) {\n      ocupado = valor;\n      el('preparar').disabled = valor;\n      el('fechar').disabled = valor;\n    }\n    function descartar() {\n      el('resultado').hidden = true;\n      el('download').removeAttribute('href');\n      if (arquivoUrl) URL.revokeObjectURL(arquivoUrl);\n      arquivoUrl = '';\n    }\n    function falha(erro) {\n      descartar();\n      bloquear(false);\n      mensagem(erro && erro.message ? erro.message : String(erro), true);\n    }\n    el('preparar').addEventListener('click', function () {\n      if (ocupado) return;\n      descartar();\n      bloquear(true);\n      mensagem('Lendo e conferindo as cinco abas do catálogo…');\n      google.script.run.withSuccessHandler(function (resultado) {\n        try {\n          if (!resultado || resultado.filename !== 'catalogo-periodicos-google.json' ||\n              typeof resultado.content !== 'string' || !Array.isArray(resultado.sheets)) {\n            throw new Error('Resposta de exportação inválida. Tente novamente.');\n          }\n          const blob = new Blob([resultado.content], {type: 'application/json;charset=utf-8'});\n          if (blob.size > 32 * 1024 * 1024) throw new Error('O catálogo excede 32 MiB.');\n          arquivoUrl = URL.createObjectURL(blob);\n          el('download').href = arquivoUrl;\n          el('resultado').hidden = false;\n          mensagem('Download preparado em ' + new Date(resultado.exported_at).toLocaleString('pt-BR') +\n            '.\\n' + resultado.sheets.map(aba => aba.title + ': ' + aba.rows + ' linhas').join(' · '));\n          bloquear(false);\n        } catch (erro) { falha(erro); }\n      }).withFailureHandler(falha).exportarCatalogo();\n    });\n    el('fechar').addEventListener('click', () => { descartar(); google.script.host.close(); });\n    window.addEventListener('unload', descartar);\n  </script>\n</body>\n</html>\n").setWidth(620).setHeight(450),
    'Exportar catálogo para o SIADoce'
  );
}

function celulaCatalogo_(valor, local) {
  if (valor === '' || valor === null || valor === undefined) return null;
  exigir_(typeof valor === 'string' || typeof valor === 'boolean' ||
    (typeof valor === 'number' && Number.isFinite(valor)),
    local + ': valor incompatível com o catálogo. Datas devem estar escritas como texto ISO, não como células de data.');
  if (typeof valor === 'string') {
    exigir_(valor.length <= 50000, local + ': texto acima do limite de 50 mil caracteres.');
    exigir_(!/^#(?:N\/A|N\/D|REF!|VALUE!|VALOR!|DIV\/0!|NAME\?|NOME\?|NUM!|NÚM!|NULL!|NULO!|ERROR!|ERRO!|SPILL!|CALC!|LOADING!|GETTING_DATA)$/i.test(valor.trim()),
      local + ': erro de fórmula (' + valor + '). Corrija a célula antes de exportar.');
  }
  return valor;
}

function lerAbaCatalogo_(aba, definicao) {
  const linhas = aba.getLastRow();
  const colunas = aba.getLastColumn();
  exigir_(linhas > definicao.cabecalho && linhas <= 20000,
    definicao.nome + ': aba vazia ou acima do limite de 20 mil linhas.');
  exigir_(colunas > 0 && colunas <= definicao.colunas,
    definicao.nome + ': esperadas no máximo ' + definicao.colunas + ' colunas de dados.');
  // getValues traz números e resultados calculados, sem converter percentis para texto.
  const valores = aba.getRange(1, 1, linhas, colunas).getValues().map(function (linha, i) {
    return Array.from({length: definicao.colunas}, function (_, j) {
      return celulaCatalogo_(linha[j], definicao.nome + '!R' + (i + 1) + 'C' + (j + 1));
    });
  });
  while (valores.length && valores[valores.length - 1].every(function (v) { return v === null; })) valores.pop();
  exigir_(valores.length > definicao.cabecalho, definicao.nome + ': não há dados para exportar.');
  if (definicao.cabecalho) {
    const cabecalho = valores[definicao.cabecalho - 1];
    exigir_(cabecalho[0] === 'Periódico' &&
      (definicao.identificador === undefined || cabecalho[definicao.identificador] === 'Scopus Source ID'),
      definicao.nome + ': cabeçalho não reconhecido. Restaure a estrutura do catálogo antes de exportar.');
    definicao.issns.forEach(function (c, i) {
      exigir_(cabecalho[c] === (i ? 'EISSN' : 'ISSN'), definicao.nome + ': coluna de ISSN/eISSN fora da posição esperada.');
    });
    valores.slice(definicao.cabecalho).forEach(function (linha, i) {
      if (linha.every(function (v) { return v === null; })) return;
      const local = definicao.nome + '!R' + (i + definicao.cabecalho + 1);
      if (definicao.identificador !== undefined) {
        const identificador = linha[definicao.identificador];
        exigir_(typeof identificador === 'string' && /^[1-9]\d*$/.test(identificador),
          local + ': Scopus Source ID deve estar como texto, sem arredondamento. Corrija na planilha; o exportador não converte identificadores.');
      }
      definicao.issns.forEach(function (c) {
        exigir_(linha[c] === null || (typeof linha[c] === 'string' && /^\d{4}-?\d{3}[\dXx]$/.test(linha[c].trim())),
          local + ': ISSN/eISSN deve estar como texto, preservando zeros iniciais.');
      });
    });
  }
  return valores;
}

function exportarCatalogo() {
  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  exigir_(planilha && planilha.getId() === SIADOCE_CATALOGO_ID,
    'Abra o catálogo principal do SIADoce no Google Drive. Este exportador está vinculado à planilha oficial existente.');
  const lock = LockService.getDocumentLock();
  exigir_(lock && lock.tryLock(30000), 'Outra operação do SIADoce está em andamento. Tente novamente depois.');
  try {
    const abas = {};
    let celulas = 0;
    SIADOCE_CATALOGO_ABAS.forEach(function (definicao) {
      const aba = planilha.getSheetByName(definicao.nome);
      exigir_(aba, 'A aba ' + definicao.nome + ' está ausente. Nenhum arquivo foi gerado.');
      celulas += aba.getLastRow() * definicao.colunas;
      exigir_(celulas <= 1000000, 'O catálogo excede o limite de 1 milhão de células.');
      abas[definicao.nome] = lerAbaCatalogo_(aba, definicao);
    });
    const pacote = {schema_version: 1, kind: 'siadoce.catalogo-periodicos',
      spreadsheet_id: SIADOCE_CATALOGO_ID, spreadsheet_url: SIADOCE_CATALOGO_URL,
      exported_at: new Date().toISOString(), sheets: abas};
    const texto = JSON.stringify(pacote);
    exigir_(texto.length <= SIADOCE_CATALOGO_LIMITE_BYTES &&
      Utilities.newBlob(texto).getBytes().length <= SIADOCE_CATALOGO_LIMITE_BYTES,
      'O catálogo excede o limite de 32 MiB.');
    return {filename: 'catalogo-periodicos-google.json', content: texto, exported_at: pacote.exported_at,
      sheets: SIADOCE_CATALOGO_ABAS.map(function (definicao) {
        return {title: definicao.nome, rows: abas[definicao.nome].length, columns: definicao.colunas};
      })};
  } finally { lock.releaseLock(); }
}

function exigir_(condicao, mensagem) {
  if (!condicao) throw new Error(mensagem);
}

function objeto_(valor) {
  return valor !== null && typeof valor === 'object' && !Array.isArray(valor);
}

function texto_(valor, limite) {
  return typeof valor === 'string' && valor.length > 0 && valor.length <= limite;
}

function inteiro_(valor) {
  return Number.isSafeInteger(valor) && valor >= 0;
}

function hash_(texto) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, texto, Utilities.Charset.UTF_8)
    .map(function (n) { return ('0' + (n & 255).toString(16)).slice(-2); }).join('');
}

function lerPacote_(texto) {
  exigir_(typeof texto === 'string' && texto.length <= SIADOCE_LIMITE_BYTES,
    'Selecione um arquivo JSON de até 8 MiB.');
  exigir_(Utilities.newBlob(texto).getBytes().length <= SIADOCE_LIMITE_BYTES,
    'O arquivo excede o limite de 8 MiB.');
  let pacote;
  try { pacote = JSON.parse(texto.replace(/^\uFEFF/, '')); }
  catch (_) { throw new Error('O arquivo não contém JSON válido. Gere novamente a atualização.'); }
  exigir_(objeto_(pacote) && pacote.schema_version === 1 && pacote.kind === 'siadoce.planilha',
    'Formato desconhecido. Use o JSON gerado pelo atualizador do SIADoce.');
  exigir_(texto_(pacote.generated_at, 40) && /^\d{4}-\d{2}-\d{2}T/.test(pacote.generated_at) &&
    Number.isFinite(Date.parse(pacote.generated_at)), 'Data de geração inválida.');
  exigir_(texto_(pacote.periodo, 200), 'Período ausente ou inválido.');
  exigir_(Array.isArray(pacote.anos) && pacote.anos.length > 0 && pacote.anos.length <= 100 &&
    pacote.anos.every(function (a, i) {
      return Number.isInteger(a) && a >= 1900 && a <= 2200 && (i === 0 || a > pacote.anos[i - 1]);
    }), 'A lista de anos deve conter anos distintos em ordem crescente.');
  exigir_(typeof pacote.production_sha256 === 'string' && /^[a-f0-9]{64}$/i.test(pacote.production_sha256),
    'O identificador da base de publicações está ausente ou inválido.');
  exigir_(objeto_(pacote.resumo), 'O resumo de conferência está ausente.');
  ['total_registros', 'periodicos_registros', 'eventos_registros', 'pendentes_periodicos',
    'pendentes_eventos', 'periodicos_unicos', 'publicacoes_periodicos_unicas',
    'docentes_com_publicacao_periodico'].forEach(function (chave) {
    exigir_(inteiro_(pacote.resumo[chave]), 'Contagem inválida no resumo: ' + chave + '.');
  });
  const r = pacote.resumo;
  exigir_(r.periodicos_registros + r.eventos_registros <= r.total_registros &&
    r.pendentes_periodicos <= r.periodicos_registros && r.pendentes_eventos <= r.eventos_registros &&
    r.periodicos_unicos <= r.publicacoes_periodicos_unicas &&
    r.publicacoes_periodicos_unicas <= r.periodicos_registros &&
    r.docentes_com_publicacao_periodico <= r.periodicos_registros &&
    ((r.periodicos_registros === 0) === (r.docentes_com_publicacao_periodico === 0)),
    'As contagens do resumo são inconsistentes.');
  exigir_(Array.isArray(pacote.tabs) && pacote.tabs.length === 4,
    'O pacote deve conter exatamente as quatro abas geradas pelo SIADoce.');
  const vistas = {};
  let celulas = 0;
  pacote.tabs.forEach(function (aba) {
    exigir_(objeto_(aba) && Object.prototype.hasOwnProperty.call(SIADOCE_ABAS, aba.key) &&
      !vistas[aba.key] && aba.title === SIADOCE_ABAS[aba.key], 'Aba desconhecida, repetida ou com título incorreto.');
    vistas[aba.key] = aba;
    exigir_(Array.isArray(aba.headers) && aba.headers.length > 0 && aba.headers.length <= 40 &&
      aba.headers.every(function (h) { return texto_(h, 200) && h.trim() === h && !/^[=']/.test(h); }) &&
      new Set(aba.headers).size === aba.headers.length, 'Cabeçalhos inválidos na aba ' + aba.title + '.');
    exigir_(Array.isArray(aba.rows) && aba.rows.length <= 10000, 'Quantidade excessiva de linhas em ' + aba.title + '.');
    exigir_(aba.summary === undefined || (typeof aba.summary === 'string' && aba.summary.length <= 5000),
      'Descrição inválida na aba ' + aba.title + '.');
    celulas += (aba.rows.length + 1) * aba.headers.length;
    aba.rows.forEach(function (linha, i) {
      exigir_(Array.isArray(linha) && linha.length === aba.headers.length,
        'Número incorreto de colunas em ' + aba.title + ', linha ' + (i + 2) + '.');
      linha.forEach(function (v) {
        exigir_(v === null || typeof v === 'boolean' ||
          (typeof v === 'number' && Number.isFinite(v) && Math.abs(v) <= Number.MAX_SAFE_INTEGER) ||
          (typeof v === 'string' && v.length <= 30000 && !v.includes('\u0000')),
          'Valor inválido em ' + aba.title + ', linha ' + (i + 2) + '.');
      });
    });
  });
  exigir_(celulas <= 250000, 'O pacote excede o limite de 250 mil células.');
  exigir_(vistas.ranking_periodicos.rows.length === r.periodicos_unicos,
    'O número de periódicos não confere com o resumo.');
  exigir_(vistas.pendencias.rows.length === r.pendentes_periodicos + r.pendentes_eventos,
    'O número de pendências não confere com o resumo.');
  const ranking = vistas.ranking_periodicos;
  const cabecalhoRanking = ['Periódico', 'Publicações únicas'].concat(pacote.anos.map(String))
    .concat(['Docentes distintos', 'Registros por docente']);
  exigir_(JSON.stringify(ranking.headers) === JSON.stringify(cabecalhoRanking),
    'O cabeçalho do ranking não corresponde aos anos do pacote.');
  exigir_(JSON.stringify(vistas.pendencias.headers) === JSON.stringify(
    ['Docente', 'Ano', 'Tipo de publicação', 'Veículo informado', 'Título', 'Situação', 'O que falta']),
    'O cabeçalho de Pendências não corresponde ao formato esperado.');
  let totalUnicas = 0;
  let totalRegistros = 0;
  ranking.rows.forEach(function (linha, i) {
    exigir_(texto_(linha[0], 30000) && linha.slice(1).every(inteiro_) && linha[1] > 0,
      'Há contagem inválida no ranking de periódicos.');
    exigir_(i === 0 || linha[1] <= ranking.rows[i - 1][1], 'O ranking não está em ordem decrescente.');
    exigir_(linha.slice(2, -2).reduce(function (a, b) { return a + b; }, 0) === linha[1] &&
      linha[linha.length - 1] >= linha[1] && linha[linha.length - 2] > 0 &&
      linha[linha.length - 2] <= linha[linha.length - 1] &&
      linha[linha.length - 2] <= r.docentes_com_publicacao_periodico,
      'As quantidades por ano de um periódico não conferem.');
    totalUnicas += linha[1];
    totalRegistros += linha[linha.length - 1];
  });
  exigir_(totalUnicas === r.publicacoes_periodicos_unicas && totalRegistros === r.periodicos_registros,
    'Os totais do ranking não conferem com o resumo do pacote.');
  // Pacotes de atualização gerados antes da migração usam a grafia anterior.
  const cabecalhoTrabalhos = vistas.eventos_trabalhos.headers.slice();
  if (cabecalhoTrabalhos[3] === 'Resultado atual no SiADoce') {
    cabecalhoTrabalhos[3] = SIADOCE_TRABALHOS_HEADERS[3];
  }
  exigir_(JSON.stringify(vistas.eventos.headers) === JSON.stringify(SIADOCE_EVENTOS_HEADERS) &&
    JSON.stringify(cabecalhoTrabalhos) === JSON.stringify(SIADOCE_TRABALHOS_HEADERS),
    'Os cabeçalhos das abas de eventos não correspondem ao formato esperado.');
  const idsEventos = new Set();
  vistas.eventos.rows.forEach(function (linha) {
    exigir_(texto_(linha[0], 30000) && texto_(linha[1], 200) && !idsEventos.has(linha[1]),
      'O cadastro contém um evento sem nome/identificador ou com identificador repetido.');
    idsEventos.add(linha[1]);
    exigir_((linha[4] === null || inteiro_(linha[4])) && inteiro_(linha[18]) && inteiro_(linha[19]),
      'H5 ou contagens inválidas no cadastro de eventos.');
    exigir_(linha[8] === null || linha[8] === '' || /^A[1-8]$/.test(linha[8]),
      'Faixa H5 inválida no cadastro de eventos.');
  });
  const pesos = {A1: 1, A2: 0.875, A3: 0.75, A4: 0.625};
  vistas.eventos_trabalhos.rows.forEach(function (linha) {
    exigir_(Number.isInteger(linha[0]) && linha[0] >= 1900 && linha[0] <= 2200 &&
      texto_(linha[1], 30000), 'Ano ou título inválido nas evidências de trabalhos.');
    const faixa = linha[4];
    exigir_(faixa === null || faixa === '' || /^A[1-8]$/.test(faixa), 'Faixa aplicada inválida.');
    exigir_(linha[5] === (pesos[faixa] === undefined ? null : pesos[faixa]),
      'O peso de um trabalho não corresponde à faixa aplicada; A5–A8 e pendências devem ficar sem peso.');
  });
  if (r.linhas_por_aba !== undefined) {
    exigir_(objeto_(r.linhas_por_aba) && Object.keys(vistas).every(function (key) {
      return r.linhas_por_aba[key] === vistas[key].rows.length;
    }), 'As contagens de linhas por aba são inconsistentes.');
  }
  exigir_(Array.isArray(pacote.methodology) && pacote.methodology.length === 7,
    'A metodologia do pacote está ausente ou inválida.');
  const metodos = new Set();
  pacote.methodology.forEach(function (m) {
    exigir_(objeto_(m) && Object.prototype.hasOwnProperty.call(SIADOCE_METODOS, m.key) &&
      !metodos.has(m.key) && m.label === SIADOCE_METODOS[m.key] &&
      texto_(m.text, 10000), 'Item de metodologia inválido.');
    metodos.add(m.key);
  });
  pacote._hash = hash_(texto);
  return pacote;
}

function previa_(pacote, planilha) {
  return {
    token: pacote._hash,
    arquivo: planilha.getName(),
    generated_at: pacote.generated_at,
    periodo: pacote.periodo,
    resumo: pacote.resumo,
    tabs: pacote.tabs.map(function (a) {
      return {title: a.title, rows: a.rows.length, columns: cabecalhosExibidos_(a).length};
    }),
    methodology: pacote.methodology
  };
}

function validarAtualizacao(texto) {
  const pacote = lerPacote_(texto);
  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  prepararReferenciasRanking_(pacote, planilha);
  return previa_(pacote, planilha);
}

function lerEstado_(propriedades, chave) {
  const bruto = propriedades.getProperty(chave);
  return bruto ? JSON.parse(bruto) : null;
}

function salvarEstado_(propriedades, chave, estado) {
  propriedades.setProperty(chave, JSON.stringify(estado));
}

function celulaSegura_(v) {
  if (v === null) return '';
  // Não confiar em fórmulas fornecidas pelo arquivo; preservar também aspas iniciais.
  if (typeof v === 'string' && (/^\s*=/.test(v) || v.startsWith("'"))) return "'" + v;
  return v;
}

function tamanho_(aba, linhas, colunas) {
  if (aba.getMaxRows() < linhas) aba.insertRowsAfter(aba.getMaxRows(), linhas - aba.getMaxRows());
  if (aba.getMaxColumns() < colunas) aba.insertColumnsAfter(aba.getMaxColumns(), colunas - aba.getMaxColumns());
}

function cabecalhosExibidos_(dados) {
  if (dados.key !== 'ranking_periodicos') return dados.headers;
  return [dados.headers[0], 'Faixa de referência', 'Percentil usado'].concat(dados.headers.slice(1));
}

function prepararReferenciasRanking_(pacote, planilha) {
  const dados = pacote.tabs.find(function (a) { return a.key === 'ranking_periodicos'; });
  const consulta = planilha.getSheetByName('Consulta');
  const disponivel = !!(consulta && consulta.getLastRow() >= 2);
  const catalogo = disponivel ? consulta.getRange(2, 1, consulta.getLastRow() - 1, 11).getValues() : [];
  if (disponivel) {
    const cabecalho = consulta.getRange(1, 1, 1, 11).getValues()[0];
    exigir_(cabecalho[0] === 'Periódico' && cabecalho[1] === 'Faixa de referência' &&
      cabecalho[2] === 'Percentil usado' && cabecalho[10] === 'Scopus Source ID',
      'A estrutura da aba Consulta mudou. Confira as colunas A, B, C e K antes de importar.');
  }
  const normalizar = function (v) { return String(v === null ? '' : v).trim().toLowerCase(); };
  const porTitulo = new Map();
  const porId = new Map();
  function indexar(indice, chave, linha) {
    if (!chave) return;
    if (!indice.has(chave)) indice.set(chave, []);
    indice.get(chave).push(linha);
  }
  catalogo.forEach(function (linha) {
    if (!normalizar(linha[0])) return;
    indexar(porTitulo, normalizar(linha[0]), linha);
    indexar(porId, String(linha[10] === null ? '' : linha[10]).trim(), linha);
  });
  pacote._rankingReferencias = dados.rows.map(function (r) {
    const titulo = String(r[0]);
    // A identidade acrescentada pelo ranking desambigua títulos homônimos.
    const identidade = /^(.*) \[source:([^\]]+)\]$/.exec(titulo);
    const candidatas = (identidade ? porId.get(identidade[2].trim()) : porTitulo.get(normalizar(titulo))) || [];
    exigir_(candidatas.length <= 1, 'Correspondência ambígua na aba Consulta para "' + titulo +
      '". Corrija o catálogo ou use o Source ID correto antes de importar.');
    const linha = candidatas[0];
    if (!linha) return {catalogoDisponivel: disponivel, encontrado: false, faixa: '', percentil: ''};
    exigir_(!identidade || normalizar(linha[0]) === normalizar(identidade[1]),
      'O título e o Source ID não correspondem na aba Consulta: ' + titulo + '.');
    const percentil = linha[2];
    const ausente = percentil === '' || percentil === null;
    exigir_(ausente || (typeof percentil === 'number' && Number.isFinite(percentil) &&
      percentil >= 0 && percentil <= 100), 'Percentil inválido na aba Consulta para "' + titulo + '".');
    exigir_(ausente ? (linha[1] === '' || linha[1] === null || linha[1] === 'Sem percentil') : /^A[1-8]$/.test(linha[1]),
      'Faixa de referência inválida na aba Consulta para "' + titulo + '".');
    // Preservar "Sem percentil" como em Consulta, sem atribuir faixa ou transformar ausência em zero.
    return {catalogoDisponivel: disponivel, encontrado: true,
      faixa: linha[1] === null ? '' : linha[1], percentil: ausente ? '' : percentil};
  });
}

function linhasExibidas_(dados, pacote) {
  if (dados.key !== 'ranking_periodicos') return [dados.headers].concat(dados.rows);
  exigir_(Array.isArray(pacote._rankingReferencias) && pacote._rankingReferencias.length === dados.rows.length,
    'As referências de periódicos não foram conferidas na aba Consulta.');
  const valores = [cabecalhosExibidos_(dados)].concat(dados.rows.map(function (linha, i) {
    const referencia = pacote._rankingReferencias[i];
    return [linha[0], referencia.faixa, referencia.percentil].concat(linha.slice(1));
  }));
  // Os totais vêm de código confiável; jamais de fórmulas fornecidas no JSON.
  const total = Array(dados.headers.length).fill(0);
  total[0] = 'Total';
  dados.rows.forEach(function (linha) {
    for (let col = 1; col < linha.length; col++) total[col] += linha[col];
  });
  // Docentes distintos não são a soma da contagem de docentes dos periódicos.
  total[total.length - 2] = pacote.resumo.docentes_com_publicacao_periodico;
  valores.push([total[0], '', ''].concat(total.slice(1)));
  return valores;
}

function destacarPeriodicosForaCatalogo_(aba, dados, pacote) {
  if (!dados.rows.length) return;
  const colunas = cabecalhosExibidos_(dados).length;
  const cores = pacote._rankingReferencias.map(function (referencia) {
    // Sem catálogo não se pode concluir que todos os títulos estão ausentes.
    return Array(colunas).fill(referencia.catalogoDisponivel && !referencia.encontrado ? '#fce8e6' : '#ffffff');
  });
  aba.getRange(2, 1, dados.rows.length, colunas).setBackgrounds(cores);
}

function escreverAba_(aba, dados, pacote) {
  const valores = linhasExibidas_(dados, pacote);
  const colunas = valores[0].length;
  const antigasLinhas = Math.max(1, aba.getLastRow());
  const antigasColunas = Math.max(1, aba.getLastColumn());
  const filtro = aba.getFilter();
  if (filtro) filtro.remove();
  tamanho_(aba, valores.length, colunas);
  aba.getRange(1, 1, Math.max(antigasLinhas, valores.length),
    Math.max(antigasColunas, colunas)).clear();
  const faixa = aba.getRange(1, 1, valores.length, colunas);
  faixa.setNumberFormats(valores.map(function (linha) {
    return linha.map(function (v) {
      if (typeof v !== 'number') return '@';
      if (dados.key === 'ranking_periodicos') return Number.isInteger(v) ? '0' : '0.0########';
      return '0.########';
    });
  }));
  faixa.setValues(valores.map(function (linha) { return linha.map(celulaSegura_); }));
  faixa.setFontFamily('Arial').setFontSize(10).setVerticalAlignment('top').setWrap(true);
  aba.getRange(1, 1, 1, colunas).setFontWeight('bold').setBackground('#e6ebed');
  aba.setFrozenRows(1);
  aba.setFrozenColumns(Math.min(2, colunas));
  if (dados.key === 'ranking_periodicos') {
    destacarPeriodicosForaCatalogo_(aba, dados, pacote);
    aba.setRowHeight(1, 64);
    // A variante não forçada permite crescer para acomodar o conteúdo com quebra de linha.
    aba.setRowHeights(2, valores.length - 1, 40);
    aba.setColumnWidth(1, 400);
    aba.setColumnWidth(2, 130);
    aba.setColumnWidth(3, 110);
    aba.setColumnWidth(4, 116);
    aba.setColumnWidths(5, pacote.anos.length, 72);
    aba.setColumnWidth(colunas - 1, 112);
    aba.setColumnWidth(colunas, 140);
    aba.getRange(2, 2, valores.length - 1, colunas - 1).setHorizontalAlignment('center');
    aba.getRange(valores.length, 1, 1, colunas)
      .setFontWeight('bold').setBackground('#e6ebed');
  } else {
    aba.setRowHeight(1, 52);
    if (valores.length > antigasLinhas) {
      aba.setRowHeights(Math.max(2, antigasLinhas + 1), valores.length - antigasLinhas, 72);
    }
    aba.setColumnWidths(1, dados.headers.length, 150);
    aba.setColumnWidth(1, 180);
    if (dados.headers.length >= 2) aba.setColumnWidth(2, dados.key === 'eventos_trabalhos' ? 420 : 180);
  }
  // A linha Total fica fora do filtro e não se mistura aos periódicos ao ordenar.
  aba.getRange(1, 1, dados.rows.length + 1, colunas).createFilter();
  const nota = 'Atualização SIADoce: ' + pacote.generated_at + '\nPeríodo: ' + pacote.periodo +
    '\n' + (dados.summary || '') +
    (dados.key === 'ranking_periodicos' ? '\n\nFaixa de referência e Percentil usado: valores da aba Consulta na importação; ' +
      'a correspondência usa título único ou o Source ID indicado nos rótulos homônimos. Sem métrica, ' +
      'preserva-se "Sem percentil" e o percentil fica vazio; sem correspondência, ambos ficam vazios.' +
      '\nVermelho claro: sem correspondência no catálogo Scopus/JCR consultado. ' +
      'A ausência neste catálogo não comprova ausência global de indexação. A falta de percentil, por si só, não aciona o destaque.' : '') + '\n\n' +
    pacote.methodology.map(function (m) { return m.label + ': ' + m.text; }).join('\n\n');
  aba.getRange(1, 1).setNote(nota.slice(0, 50000));
}

function conferirAba_(aba, dados, pacote) {
  const esperados = linhasExibidas_(dados, pacote);
  const colunas = esperados[0].length;
  const faixa = aba.getRange(1, 1, esperados.length, colunas);
  const formulas = faixa.getFormulas();
  const obtidos = faixa.getValues();
  for (let i = 0; i < esperados.length; i++) {
    for (let j = 0; j < colunas; j++) {
      exigir_(!formulas[i][j], 'Foi detectada uma fórmula inesperada em ' + dados.title + '.');
      exigir_(obtidos[i][j] === (esperados[i][j] === null ? '' : esperados[i][j]),
        'A conferência de valores falhou em ' + dados.title + ', linha ' + (i + 1) + '.');
    }
  }
}

function localizarMetodos_(aba, pacote) {
  if (!aba) return pacote.methodology.map(function (m, i) { return {metodo: m, linha: i + 1}; });
  const rotulos = aba.getRange(1, 1, Math.max(1, aba.getLastRow()), 1).getValues();
  let seguinte = aba.getLastRow() + 1;
  return pacote.methodology.map(function (m) {
    const encontrados = [];
    rotulos.forEach(function (linha, i) { if (linha[0] === m.label) encontrados.push(i + 1); });
    exigir_(encontrados.length <= 1, 'Há um rótulo repetido em Critérios e fontes: ' + m.label + '.');
    return {metodo: m, linha: encontrados.length ? encontrados[0] : seguinte++};
  });
}

function escreverMetodos_(aba, localizacoes) {
  localizacoes.forEach(function (l) {
    tamanho_(aba, l.linha, 3);
    aba.getRange(l.linha, 1).setNumberFormat('@').setValue(l.metodo.label);
    aba.getRange(l.linha, 3).setNumberFormat('@').setValue(celulaSegura_(l.metodo.text)).setWrap(true);
    aba.autoResizeRows(l.linha, 1);
  });
}

function conferirMetodos_(aba, localizacoes) {
  exigir_(aba, 'A aba Critérios e fontes está ausente.');
  localizacoes.forEach(function (l) {
    exigir_(aba.getRange(l.linha, 1).getValue() === l.metodo.label &&
      aba.getRange(l.linha, 3).getValue() === l.metodo.text &&
      !aba.getRange(l.linha, 3).getFormula(), 'A conferência da metodologia falhou: ' + l.metodo.label + '.');
  });
}

function removerCopias_(planilha, estado) {
  if (!estado) return;
  estado.abas.forEach(function (item) {
    if (!item.backupId) return;
    const copia = planilha.getSheetById(item.backupId);
    // Apagar somente uma cópia criada e identificada por esta execução.
    if (copia && copia.getName() === item.backupName && item.backupName.startsWith('_SiADoce_')) {
      planilha.deleteSheet(copia);
    }
  });
}

function restaurarEstado_(planilha, estado) {
  estado.abas.forEach(function (item) {
    if (!item.modificada) return;
    const destino = item.sheetId ? planilha.getSheetById(item.sheetId) : null;
    if (item.criada && !destino) return; // Permite repetir recuperação interrompida.
    exigir_(destino && destino.getName() === item.title,
      'A aba ' + item.title + ' foi removida ou renomeada. Restauração manual necessária.');
    if (item.criada) {
      planilha.deleteSheet(destino);
      return;
    }
    const copia = planilha.getSheetById(item.backupId);
    exigir_(copia && copia.getName() === item.backupName, 'Cópia de segurança ausente para ' + item.title + '.');
    const filtro = destino.getFilter();
    if (filtro) filtro.remove();
    destino.clear();
    // Copiar a grade original preserva também notas e formatos em células vazias.
    const origem = copia.getRange(1, 1, copia.getMaxRows(), copia.getMaxColumns());
    tamanho_(destino, origem.getNumRows(), origem.getNumColumns());
    origem.copyTo(destino.getRange(1, 1));
    destino.setFrozenRows(item.frozenRows);
    destino.setFrozenColumns(item.frozenColumns);
    if (item.filter) {
      const recuperado = destino.getRange(item.filter.a1).createFilter();
      // Os critérios são lidos da cópia, pois objetos Apps Script não cabem em JSON.
      const filtroBackup = copia.getFilter();
      if (filtroBackup) {
        for (let c = item.filter.firstColumn; c <= item.filter.lastColumn; c++) {
          const criterio = filtroBackup.getColumnFilterCriteria(c);
          if (criterio) recuperado.setColumnFilterCriteria(c, criterio);
        }
      }
    }
    item.widths.forEach(function (largura, i) { destino.setColumnWidth(i + 1, largura); });
    destino.setRowHeight(1, item.headerHeight);
  });
  SpreadsheetApp.flush();
}

function importarAtualizacao(texto, tokenPrevia) {
  const pacote = lerPacote_(texto);
  exigir_(tokenPrevia === pacote._hash, 'O arquivo mudou. Clique novamente em Conferir arquivo.');
  const lock = LockService.getDocumentLock();
  exigir_(lock && lock.tryLock(30000), 'Outra importação está em andamento. Tente novamente depois.');
  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  const props = PropertiesService.getDocumentProperties();
  let estado;
  let anterior;
  try {
    exigir_(!lerEstado_(props, SIADOCE_ATUAL),
      'Há uma importação interrompida. Use SIADoce > Restaurar última importação antes de continuar.');
    // Resolver ambiguidades e métricas antes de fazer cópias ou alterar qualquer aba.
    prepararReferenciasRanking_(pacote, planilha);
    anterior = lerEstado_(props, SIADOCE_ULTIMA);
    const localizacoes = localizarMetodos_(planilha.getSheetByName(SIADOCE_CRITERIOS), pacote);
    if (anterior && anterior.hash === pacote._hash) {
      // Não ignorar alterações manuais feitas depois da importação.
      const iguais = pacote.tabs.every(function (dados) {
        const aba = planilha.getSheetByName(dados.title);
        if (!aba) return false;
        try {
          conferirAba_(aba, dados, pacote);
          return aba.getLastRow() === linhasExibidas_(dados, pacote).length &&
            aba.getLastColumn() === cabecalhosExibidos_(dados).length;
        } catch (_) { return false; }
      });
      let metodosIguais = false;
      try {
        conferirMetodos_(planilha.getSheetByName(SIADOCE_CRITERIOS), localizacoes);
        metodosIguais = true;
      } catch (_) { /* A nota manual será atualizada junto ao pacote. */ }
      if (iguais && metodosIguais) return {ok: true, unchanged: true, id: anterior.id, updated_at: anterior.updatedAt,
        message: 'Este mesmo arquivo já foi importado e os dados continuam iguais. Nenhuma alteração foi feita.'};
    }
    estado = {id: Utilities.getUuid(), hash: pacote._hash, productionHash: pacote.production_sha256,
      generatedAt: pacote.generated_at, startedAt: new Date().toISOString(), status: 'preparando', abas: []};
    if (anterior) salvarEstado_(props, SIADOCE_ANTERIOR, anterior);
    else props.deleteProperty(SIADOCE_ANTERIOR);
    salvarEstado_(props, SIADOCE_ATUAL, estado);
    const alvos = pacote.tabs.concat([{title: SIADOCE_CRITERIOS, headers: ['Item', '', 'Descrição'], rows: []}]);
    alvos.forEach(function (dados, i) {
      let aba = planilha.getSheetByName(dados.title);
      const item = {title: dados.title, criada: !aba, modificada: false};
      if (!aba) {
        // Registrar a intenção antes de criar; não se altera nenhuma aba já existente aqui.
        item.sheetId = null;
        estado.abas.push(item);
        salvarEstado_(props, SIADOCE_ATUAL, estado);
        aba = planilha.insertSheet(dados.title);
        item.sheetId = aba.getSheetId();
        item.modificada = true;
      } else {
        item.sheetId = aba.getSheetId();
        item.frozenRows = aba.getFrozenRows();
        item.frozenColumns = aba.getFrozenColumns();
        // O histórico armazena apenas metadados; dados completos ficam na cópia oculta.
        item.widths = Array.from({length: Math.max(aba.getLastColumn(), cabecalhosExibidos_(dados).length)},
          function (_, c) { return aba.getColumnWidth(Math.min(c + 1, aba.getMaxColumns())); });
        item.headerHeight = aba.getRowHeight(1);
        const f = aba.getFilter();
        item.filter = f ? {a1: f.getRange().getA1Notation(), firstColumn: f.getRange().getColumn(),
          lastColumn: f.getRange().getLastColumn()} : null;
        item.backupName = '_SiADoce_' + estado.id.slice(0, 8) + '_' + i;
        estado.abas.push(item);
        salvarEstado_(props, SIADOCE_ATUAL, estado);
        const copia = aba.copyTo(planilha).setName(item.backupName);
        item.backupId = copia.getSheetId();
        salvarEstado_(props, SIADOCE_ATUAL, estado);
        copia.hideSheet();
      }
      salvarEstado_(props, SIADOCE_ATUAL, estado);
    });
    estado.status = 'gravando';
    salvarEstado_(props, SIADOCE_ATUAL, estado);
    pacote.tabs.forEach(function (dados, i) {
      estado.abas[i].modificada = true;
      salvarEstado_(props, SIADOCE_ATUAL, estado);
      escreverAba_(planilha.getSheetById(estado.abas[i].sheetId), dados, pacote);
    });
    estado.abas[4].modificada = true;
    salvarEstado_(props, SIADOCE_ATUAL, estado);
    escreverMetodos_(planilha.getSheetById(estado.abas[4].sheetId), localizacoes);
    SpreadsheetApp.flush();
    pacote.tabs.forEach(function (dados, i) {
      conferirAba_(planilha.getSheetById(estado.abas[i].sheetId), dados, pacote);
    });
    conferirMetodos_(planilha.getSheetById(estado.abas[4].sheetId), localizacoes);
    estado.status = 'concluida';
    estado.updatedAt = new Date().toISOString();
    salvarEstado_(props, SIADOCE_ULTIMA, estado);
    props.deleteProperty(SIADOCE_ATUAL);
    return {ok: true, unchanged: false, id: estado.id, updated_at: estado.updatedAt,
      message: 'As quatro abas e suas notas em Critérios e fontes foram atualizadas e conferidas. A versão anterior está nas cópias ocultas.'};
  } catch (erro) {
    if (estado) {
      try {
        restaurarEstado_(planilha, estado);
        if (anterior) salvarEstado_(props, SIADOCE_ULTIMA, anterior);
        else props.deleteProperty(SIADOCE_ULTIMA);
        props.deleteProperty(SIADOCE_ATUAL);
        try { removerCopias_(planilha, estado); } catch (_) { /* Cópias extras são recuperáveis. */ }
      } catch (falhaRestauro) {
        estado.status = 'recuperacao_necessaria';
        salvarEstado_(props, SIADOCE_ATUAL, estado);
        throw new Error('A importação falhou e a recuperação automática não terminou. Use o menu Restaurar última importação. ' +
          'Identificador: ' + estado.id + '. Motivo: ' + falhaRestauro.message);
      }
    }
    throw new Error('Importação não concluída. ' + (estado ? 'O conteúdo anterior foi restaurado. ' : '') + erro.message);
  } finally {
    lock.releaseLock();
  }
}

function restaurarUltimaImportacao() {
  const ui = SpreadsheetApp.getUi();
  const escolha = ui.alert('Restaurar a versão anterior',
    'Isso restaura as quatro abas geradas e Critérios e fontes ao estado anterior à última importação. Alterações manuais posteriores nessas cinco abas também serão desfeitas. Continuar?',
    ui.ButtonSet.YES_NO);
  if (escolha !== ui.Button.YES) return;
  const lock = LockService.getDocumentLock();
  exigir_(lock && lock.tryLock(30000), 'Outra importação está em andamento.');
  try {
    const props = PropertiesService.getDocumentProperties();
    const pendente = lerEstado_(props, SIADOCE_ATUAL);
    const estado = pendente || lerEstado_(props, SIADOCE_ULTIMA);
    exigir_(estado, 'Não há importação anterior disponível para restaurar.');
    restaurarEstado_(SpreadsheetApp.getActiveSpreadsheet(), estado);
    if (pendente) {
      const anterior = lerEstado_(props, SIADOCE_ANTERIOR);
      if (anterior) salvarEstado_(props, SIADOCE_ULTIMA, anterior);
      else props.deleteProperty(SIADOCE_ULTIMA);
      props.deleteProperty(SIADOCE_ATUAL);
    } else props.deleteProperty(SIADOCE_ULTIMA);
    ui.alert('Versão anterior restaurada. Identificador: ' + estado.id);
  } finally {
    lock.releaseLock();
  }
}
