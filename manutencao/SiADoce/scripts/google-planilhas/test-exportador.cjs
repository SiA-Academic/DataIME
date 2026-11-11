'use strict';
// Exportação real do Apps Script e janela HTML, com serviços simulados e sem rede.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const code = fs.readFileSync(path.join(__dirname, 'Code.gs'), 'utf8');
const html = fs.readFileSync(path.join(__dirname, 'Exportar.html'), 'utf8');
const ID = '1TF6Fhi7EjhiSU59mGqVsbbR55OeQdjZiTvHvhSxLeOc';
const clone = v => JSON.parse(JSON.stringify(v));

function fixture() {
  return {
    Consulta: [
      ['Periódico', 'Faixa de referência', 'Percentil usado', 'Base do maior',
        'Percentil Scopus 2025', 'Percentil JCR 2025', 'ISSN', 'EISSN', 'Área', 'Disponibilidade', 'Scopus Source ID'],
      ['Jornal <x>', 'A8', 0, 'Scopus', 0, '', '0360-0300', '1557-7341', 'Computação', 'Disponível', '23038'],
      ['', '', '', '', '', '', '', '', '', '', '']
    ],
    'Periódicos': [[], [], [], [], [],
      ['Periódico', 'Faixa Scopus', 'Percentil (0–100)', 'CiteScore 2025', 'Área', 'Status',
        'ISSN', 'EISSN', 'Categoria', 'Posição', 'Total', 'Ano da métrica', 'Scopus Source ID'],
      ['Jornal <x>', 'A8', 0, 0, 'Computação', 'Active', '03600300', '15577341', 'Cat', 100, 100, 2025, '23038']
    ],
    'Critérios e fontes': [['Critério', '', 'Fonte'], ['Texto', '', 'Ç ã Δ'], ['Valor lógico', '', false]],
    'JCR — resumo': [
      ['Periódico', 'Faixa JCR', 'Percentil', 'JIF 2025', 'ISSN', 'EISSN'],
      ['Jornal <x>', '', '', 'N/A', '0360-0300', '1557-7341']
    ],
    'JCR por categoria': [
      ['Periódico', 'ISSN', 'EISSN', 'Ano da métrica', 'Categoria', 'Edição', 'JIF',
        'Percentil', 'Faixa', 'Posição', 'Total', 'Scopus Source ID', 'Lote'],
      ['Jornal <x>', '0360-0300', '1557-7341', 2025, 'Cat', 'SCIE', 'N/A', '', '', '', '', '23038', 1]
    ]
  };
}

function ambiente(dados = fixture()) {
  const estado = {id: ID, bloqueio: true, locks: 0, releases: 0, reads: 0, menus: [], bytes: null};
  const planilha = {getId: () => estado.id, getSheetByName: nome => {
    const valores = dados[nome];
    if (!valores) return null;
    return {
      getLastRow: () => valores.length,
      getLastColumn: () => Math.max(...valores.map(l => l.length)),
      getRange: (r, c, nr, nc) => ({getValues: () => {
        estado.reads++;
        assert.equal(r, 1); assert.equal(c, 1);
        return Array.from({length: nr}, (_, i) => Array.from({length: nc}, (_, j) => valores[i]?.[j] ?? ''));
      }})
    };
  }};
  const contexto = vm.createContext({console, Date, Number, JSON, Object, Array, String, Math, Error,
    SpreadsheetApp: {getActiveSpreadsheet: () => planilha, getUi: () => ({createMenu: nome => {
      assert.equal(nome, 'SiADoce');
      const menu = {addItem: (titulo, fn) => {estado.menus.push([titulo, fn]); return menu;}, addToUi: () => {}};
      return menu;
    }})},
    LockService: {getDocumentLock: () => ({tryLock: () => {estado.locks++; return estado.bloqueio;},
      releaseLock: () => {estado.releases++;}})},
    Utilities: {newBlob: texto => ({getBytes: () => ({length: estado.bytes ?? Buffer.byteLength(texto)})})}
  });
  vm.runInContext(code, contexto);
  return {contexto, estado, dados};
}

let testes = 0;
function teste(nome, fn) { fn(); testes++; console.log('OK ' + nome); }
teste('menu contém importação, exportação e restauração', () => {
  const e = ambiente(); e.contexto.onOpen();
  assert.deepEqual(e.estado.menus.map(l => l[1]), ['abrirImportacao', 'abrirExportacaoCatalogo', 'restaurarUltimaImportacao']);
});
teste('contrato, origem, cinco abas, padding, zero, texto e remoção de vazios finais', () => {
  const e = ambiente(); const antes = clone(e.dados);
  const r = e.contexto.exportarCatalogo(); const p = JSON.parse(r.content);
  assert.equal(r.filename, 'catalogo-periodicos-google.json');
  assert.equal(p.schema_version, 1); assert.equal(p.kind, 'siadoce.catalogo-periodicos');
  assert.equal(p.spreadsheet_id, ID); assert.equal(p.spreadsheet_url, 'https://docs.google.com/spreadsheets/d/' + ID + '/edit');
  assert.match(p.exported_at, /^\d{4}-\d\d-\d\dT.*Z$/);
  const larguras = {'Consulta': 11, 'Periódicos': 20, 'Critérios e fontes': 26, 'JCR — resumo': 11, 'JCR por categoria': 13};
  assert.deepEqual(Object.keys(p.sheets), Object.keys(larguras));
  for (const [nome, largura] of Object.entries(larguras)) {
    assert.ok(p.sheets[nome].every(l => l.length === largura));
  }
  assert.equal(p.sheets.Consulta.length, 2); assert.equal(p.sheets.Consulta[1][2], 0);
  assert.equal(p.sheets.Consulta[1][5], null); assert.equal(p.sheets.Consulta[1][6], '0360-0300');
  assert.equal(p.sheets.Consulta[1][10], '23038'); assert.equal(p.sheets['Periódicos'][6][6], '03600300');
  assert.equal(p.sheets['Critérios e fontes'][1][2], 'Ç ã Δ');
  assert.equal(p.sheets['Critérios e fontes'][2][2], false);
  assert.equal(p.sheets['JCR — resumo'][1][3], 'N/A');
  assert.deepEqual(e.dados, antes); assert.equal(e.estado.reads, 5); assert.equal(e.estado.releases, 1);
});
teste('nunca exporta uma planilha diferente', () => {
  const e = ambiente(); e.estado.id = 'outra';
  assert.throws(() => e.contexto.exportarCatalogo(), /catálogo principal/);
  assert.equal(e.estado.reads, 0); assert.equal(e.estado.locks, 0);
});
teste('aba ausente e cabeçalho deslocado interrompem exportação', () => {
  const e = ambiente(); delete e.dados['JCR — resumo'];
  assert.throws(() => e.contexto.exportarCatalogo(), /ausente/); assert.equal(e.estado.releases, 1);
  const f = ambiente(); f.dados['Periódicos'][5][12] = 'Mudou';
  assert.throws(() => f.contexto.exportarCatalogo(), /cabeçalho/);
});
teste('erros de fórmula são rejeitados; textos não executam código', () => {
  for (const valor of ['#REF!', '#N/A', '#DIV/0!', '#VALUE!', '#ERRO!']) {
    const e = ambiente(); e.dados.Consulta[1][2] = valor;
    assert.throws(() => e.contexto.exportarCatalogo(), /erro de fórmula/);
  }
  const e = ambiente(); e.dados['Critérios e fontes'][1][2] = '=IMPORTXML("https://example.invalid")';
  const p = JSON.parse(e.contexto.exportarCatalogo().content);
  assert.equal(p.sheets['Critérios e fontes'][1][2], e.dados['Critérios e fontes'][1][2]);
});
teste('identificadores exigem texto e os zeros do ISSN são preservados', () => {
  const e = ambiente(); e.dados.Consulta[1][10] = 23038;
  assert.throws(() => e.contexto.exportarCatalogo(), /Source ID deve estar como texto/);
  const f = ambiente(); f.dados['Periódicos'][6][6] = 3600300;
  assert.throws(() => f.contexto.exportarCatalogo(), /ISSN\/eISSN deve estar como texto/);
});
teste('tipos inválidos, não finitos, excesso de colunas, linhas e bytes são recusados', () => {
  for (const valor of [new Date(), NaN, Infinity, {}]) {
    const e = ambiente(); e.dados['Critérios e fontes'][1][2] = valor;
    assert.throws(() => e.contexto.exportarCatalogo(), /valor incompatível/);
  }
  const e = ambiente(); e.dados.Consulta[1][11] = 'Extra';
  assert.throws(() => e.contexto.exportarCatalogo(), /11 colunas/);
  const f = ambiente(); f.dados.Consulta.length = 20001;
  assert.throws(() => f.contexto.exportarCatalogo(), /20 mil linhas/);
  const g = ambiente(); g.estado.bytes = 32 * 1024 * 1024 + 1;
  assert.throws(() => g.contexto.exportarCatalogo(), /32 MiB/);
});
teste('bloqueio impede exportar no meio da importação', () => {
  const e = ambiente(); e.estado.bloqueio = false;
  assert.throws(() => e.contexto.exportarCatalogo(), /Outra operação/);
  assert.equal(e.estado.reads, 0); assert.equal(e.estado.releases, 0);
});

function janela() {
  const elementos = {}, chamadas = [], urls = [], descartados = [];
  class Elemento {
    constructor() {Object.assign(this, {hidden: false, disabled: false, textContent: '', className: '', listeners: {}});}
    addEventListener(nome, fn) {this.listeners[nome] = fn;}
    click() {if (!this.disabled) this.listeners.click?.call(this);}
    removeAttribute(nome) {delete this[nome];}
  }
  for (const m of html.matchAll(/\bid="([^"]+)"/g)) elementos[m[1]] = new Elemento();
  elementos.resultado.hidden = true;
  const run = {};
  run.withSuccessHandler = fn => {run.success = fn; return run;};
  run.withFailureHandler = fn => {run.failure = fn; return run;};
  run.exportarCatalogo = () => {chamadas.push({success: run.success, failure: run.failure});};
  const contexto = vm.createContext({Blob, Date, String, Array, Error,
    document: {getElementById: id => elementos[id]}, window: {addEventListener: () => {}},
    URL: {createObjectURL: blob => {urls.push(blob); return 'blob:local-' + urls.length;},
      revokeObjectURL: url => descartados.push(url)},
    google: {script: {run, host: {close: () => {}}}}
  });
  vm.runInContext(html.match(/<script>([\s\S]*?)<\/script>/)[1], contexto);
  return {elementos, chamadas, urls, descartados};
}
teste('janela prepara download por clique e remove arquivo antigo ao repetir', () => {
  const e = janela(); e.elementos.preparar.click();
  assert.equal(e.chamadas.length, 1); assert.equal(e.elementos.preparar.disabled, true);
  const resultado = ambiente().contexto.exportarCatalogo(); e.chamadas[0].success(resultado);
  assert.equal(e.elementos.download.href, 'blob:local-1'); assert.equal(e.elementos.resultado.hidden, false);
  assert.equal(e.urls[0].type, 'application/json;charset=utf-8');
  assert.equal(e.elementos.preparar.disabled, false);
  e.elementos.preparar.click(); assert.deepEqual(e.descartados, ['blob:local-1']);
  assert.equal(e.elementos.resultado.hidden, true); assert.equal(e.elementos.download.href, undefined);
  e.chamadas[1].failure({message: 'Erro <script>'});
  assert.equal(e.elementos.status.textContent, 'Erro <script>'); assert.equal(e.elementos.status.className, 'error');
  assert.equal(e.elementos.preparar.disabled, false);
});
teste('janela não oferece download de resposta inválida', () => {
  const e = janela(); e.elementos.preparar.click();
  e.chamadas[0].success({filename: 'outro.json', content: '{}', sheets: []});
  assert.equal(e.elementos.resultado.hidden, true); assert.equal(e.urls.length, 0);
});

console.log(testes + ' testes do exportador concluídos.');
