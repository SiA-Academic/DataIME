'use strict';
// Testes locais do contrato e das transações. Não fazem chamadas à conta Google.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const code = fs.readFileSync(path.join(__dirname, 'Code.gs'), 'utf8');
const clone = value => JSON.parse(JSON.stringify(value));
let testes = 0;

function ambiente() {
  let next = 10;
  const props = {};
  const controle = {writes: 0, failOn: null, failProperty: null, menuChoice: 'YES', alerts: []};
  function col(n) { let out = ''; do { n--; out = String.fromCharCode(65 + n % 26) + out; n = Math.floor(n / 26); } while(n); return out; }
  function parse(a1) {
    const m = /^([A-Z]+)(\d+)(?::([A-Z]+)(\d+))?$/.exec(a1);
    const idx = s => [...s].reduce((a, c) => a * 26 + c.charCodeAt(0) - 64, 0);
    return [Number(m[2]), idx(m[1]), Number(m[4] || m[2]) - Number(m[2]) + 1, idx(m[3] || m[1]) - idx(m[1]) + 1];
  }
  class Range {
    constructor(sheet, r, c, nr = 1, nc = 1) { Object.assign(this, {sheet,r,c,nr,nc}); }
    getValues() { return Array.from({length:this.nr},(_,i)=>Array.from({length:this.nc},(_,j)=>this.sheet.values[this.r+i-1]?.[this.c+j-1] ?? '')); }
    getFormulas() { return this.getValues().map(row => row.map(v => typeof v === 'object' && v.formula ? v.formula : '')); }
    getValue() { return this.getValues()[0][0]; }
    getFormula() { return this.getFormulas()[0][0]; }
    setValues(values) {
      controle.writes++;
      if (controle.failOn === this.sheet.name) { controle.failOn = null; throw Error('falha simulada'); }
      for (let i=0;i<this.nr;i++) for(let j=0;j<this.nc;j++) {
        let v = values[i][j];
        if (typeof v === 'string' && v.startsWith("'")) v = v.slice(1);
        else if (typeof v === 'string' && /^\s*=/.test(v)) v = {formula:v};
        this.sheet.values[this.r+i-1] ||= [];
        this.sheet.values[this.r+i-1][this.c+j-1] = v;
      }
      return this;
    }
    setValue(value) { return this.setValues([[value]]); }
    setNumberFormats(values) {
      for(let i=0;i<this.nr;i++)for(let j=0;j<this.nc;j++) {
        this.sheet.numberFormats[this.r+i-1] ||= [];
        this.sheet.numberFormats[this.r+i-1][this.c+j-1] = values[i][j];
      }
      return this;
    }
    setBackgrounds(values) {
      for(let i=0;i<this.nr;i++)for(let j=0;j<this.nc;j++) {
        this.sheet.backgrounds[this.r+i-1] ||= [];
        this.sheet.backgrounds[this.r+i-1][this.c+j-1] = values[i][j];
      }
      return this;
    }
    setBackground(value) {return this.setBackgrounds(Array.from({length:this.nr},()=>Array(this.nc).fill(value)));}
    clear() { for(let i=0;i<this.nr;i++) for(let j=0;j<this.nc;j++) {
      if(this.sheet.values[this.r+i-1])this.sheet.values[this.r+i-1][this.c+j-1]='';
    } return this; }
    copyTo(destination) {
      const values=this.getValues();
      for (let i=0;i<this.nr;i++) for(let j=0;j<this.nc;j++) {
        destination.sheet.values[destination.r+i-1] ||= [];
        destination.sheet.values[destination.r+i-1][destination.c+j-1] = clone(values[i][j]);
      }
      destination.sheet.notes=clone(this.sheet.notes);
      return this;
    }
    setNote(v) { this.sheet.notes[this.r+','+this.c]=v; return this; }
    getNumRows(){return this.nr;} getNumColumns(){return this.nc;}
    getColumn(){return this.c;} getLastColumn(){return this.c+this.nc-1;}
    getA1Notation(){return col(this.c)+this.r+':'+col(this.c+this.nc-1)+(this.r+this.nr-1);}
    createFilter(){ const filter = {a1:this.getA1Notation(), criteria:{},getRange:()=>this,
      remove:()=>{this.sheet.filter=null;},getColumnFilterCriteria:c=>filter.criteria[c],
      setColumnFilterCriteria:(c,v)=>{filter.criteria[c]=v;return filter;}};
      this.sheet.filter=filter;return filter;
    }
  }
  for (const method of ['setNumberFormat','setFontFamily','setFontSize','setVerticalAlignment','setHorizontalAlignment','setWrap','setFontWeight']) Range.prototype[method]=function(){return this;};
  class Sheet {
    constructor(name){Object.assign(this,{name,id:next++,values:[],notes:{},backgrounds:[],numberFormats:[],rows:1000,cols:26,frozenRows:0,frozenColumns:0,widths:{},heights:{},filter:null});}
    getName(){return this.name;} setName(n){this.name=n;return this;} getSheetId(){return this.id;}
    getMaxRows(){return this.rows;}getMaxColumns(){return this.cols;}
    getLastRow(){let n=0;this.values.forEach((r,i)=>{if(r.some(v=>v!==''&&v!==null&&v!==undefined))n=i+1;});return n;}
    getLastColumn(){let n=0;this.values.forEach(r=>r.forEach((v,i)=>{if(v!==''&&v!==null&&v!==undefined)n=Math.max(n,i+1);}));return n;}
    getRange(...args){return new Range(this,...(typeof args[0]==='string'?parse(args[0]):args));}
    getDataRange(){return this.getRange(1,1,Math.max(1,this.getLastRow()),Math.max(1,this.getLastColumn()));}
    getFilter(){return this.filter;}
    getFrozenRows(){return this.frozenRows;}getFrozenColumns(){return this.frozenColumns;}
    setFrozenRows(v){this.frozenRows=v;return this;}setFrozenColumns(v){this.frozenColumns=v;return this;}
    getColumnWidth(c){return this.widths[c]||100;}getRowHeight(r){return this.heights[r]||21;}
    setColumnWidth(c,w){this.widths[c]=w;return this;}setRowHeight(r,h){this.heights[r]=h;return this;}
    setColumnWidths(c,n,w){for(let i=c;i<c+n;i++)this.widths[i]=w;return this;}
    setRowHeights(r,n,h){for(let i=r;i<r+n;i++)this.heights[i]=h;return this;}
    autoResizeRows(){return this;}
    insertRowsAfter(_,n){this.rows+=n;return this;}insertColumnsAfter(_,n){this.cols+=n;return this;}
    clear(){this.values=[];this.notes={};return this;}hideSheet(){this.hidden=true;return this;}
    copyTo(ss){const copy=ss.insertSheet('Cópia de '+this.name);Object.assign(copy,{
      values:clone(this.values),notes:clone(this.notes),rows:this.rows,cols:this.cols,
      frozenRows:this.frozenRows,frozenColumns:this.frozenColumns,widths:clone(this.widths),heights:clone(this.heights)});
      if(this.filter){const f=copy.getRange(this.filter.a1).createFilter();f.criteria=clone(this.filter.criteria);}return copy;}
  }
  const sheets = [];
  const spreadsheet={getName:()=> 'Planilha de teste',getSheetByName:n=>sheets.find(s=>s.name===n)||null,
    getSheetById:id=>sheets.find(s=>s.id===id)||null,insertSheet:n=>{const s=new Sheet(n);sheets.push(s);return s;},
    deleteSheet:s=>{sheets.splice(sheets.indexOf(s),1);}};
  const context=vm.createContext({
    console,Number,JSON,Date,Set,Array,Object,String,Math,Error,
    SpreadsheetApp:{getActiveSpreadsheet:()=>spreadsheet,flush:()=>{},getUi:()=>({
      ButtonSet:{YES_NO:'YES_NO'},Button:{YES:'YES'},alert:(...args)=>{controle.alerts.push(args);return controle.menuChoice;}})},
    LockService:{getDocumentLock:()=>({tryLock:()=>true,releaseLock:()=>{}})},
    PropertiesService:{getDocumentProperties:()=>({getProperty:k=>props[k]||null,deleteProperty:k=>{delete props[k];},
      setProperty:(k,v)=>{if(controle.failProperty===k){controle.failProperty=null;throw Error('property fail');}
        assert.ok(Buffer.byteLength(v)<9000,'Limite de tamanho da propriedade');props[k]=v;}})},
    Utilities:{DigestAlgorithm:{SHA_256:'sha256'},Charset:{UTF_8:'utf8'},
      newBlob:s=>({getBytes:()=>[...Buffer.from(s)]}),getUuid:()=>crypto.randomUUID(),
      computeDigest:(_,s)=>[...crypto.createHash('sha256').update(s).digest()]}
  });
  vm.runInContext(code,context);
  return {context,spreadsheet,sheets,props,controle};
}

const contract = ambiente().context;
const eventosHeaders = clone(vm.runInContext('SIADOCE_EVENTOS_HEADERS', contract));
const trabalhosHeaders = clone(vm.runInContext('SIADOCE_TRABALHOS_HEADERS', contract));
function evento(nome = 'Congresso', id = 'congresso', h5 = null) {
  const row = Array(20).fill(null);
  row[0]=nome;row[1]=id;row[4]=h5;row[18]=0;row[19]=0;return row;
}
function trabalho() {
  const row=Array(20).fill(null);row[0]=2026;row[1]='Artigo';row[8]=true;return row;
}
function pacote() {
  return {schema_version:1,kind:'siadoce.planilha',generated_at:'2026-10-20T15:00:00Z',periodo:'2025–2026',anos:[2025,2026],
    production_sha256:'a'.repeat(64),resumo:{total_registros:5,periodicos_registros:3,eventos_registros:2,
      pendentes_periodicos:1,pendentes_eventos:1,periodicos_unicos:2,publicacoes_periodicos_unicas:3,
      docentes_com_publicacao_periodico:1},
    tabs:[
      {key:'ranking_periodicos',title:'Periódicos dos docentes',headers:['Periódico','Publicações únicas','2025','2026','Docentes distintos','Registros por docente'],
        rows:[['Jornal A',2,1,1,1,2],['Jornal B',1,0,1,1,1]]},
      {key:'pendencias',title:'Pendências',headers:['Docente','Ano','Tipo de publicação','Veículo informado','Título','Situação','O que falta'],
        rows:[['Ana',2025,'Periódico','Jornal A','Título','Pendente','Percentil'],['Bia',2026,'Evento','Congresso','Texto','Pendente','Modalidade']]},
      {key:'eventos',title:'Eventos',headers:eventosHeaders,rows:[evento()]},
      {key:'eventos_trabalhos',title:'Eventos — trabalhos',headers:trabalhosHeaders,rows:[trabalho()]}
    ],methodology:[
      ['eventos_escopo','Eventos: Escopo'],['eventos_trabalhos','Eventos: Trabalhos'],['eventos_atualizacao','Eventos: Fontes e atualização'],
      ['ranking_escopo','Periódicos dos docentes: escopo'],['ranking_contagem','Periódicos dos docentes: contagem'],
      ['ranking_reconciliacoes','Periódicos dos docentes: anos reconciliados'],['ranking_atualizacao','Periódicos dos docentes: atualização']
    ].map(([key,label])=>({key,label,text:'Nota atualizada: '+label}))};
}

function preparar(env,p){
  for(const t of p.tabs){const s=env.spreadsheet.insertSheet(t.title);s.values=[['Antigo '+t.title],['Registro anterior']];}
  const c=env.spreadsheet.insertSheet('Critérios e fontes');c.values=[['Regra manual','','Preservar esta regra'],
    ...p.methodology.map(m=>[m.label,'','Nota antiga'])];
  env.spreadsheet.insertSheet('Periódicos').values=[['Catálogo intocável','0199-1234']];
  env.spreadsheet.insertSheet('JCR — resumo').values=[['JCR intocável']];
}
const consultaHeaders = ['Periódico','Faixa de referência','Percentil usado','Base do maior',
  'Percentil Scopus 2025','Percentil JCR 2025','ISSN','EISSN','Área','Disponibilidade','Scopus Source ID'];
function referencia(titulo,faixa,percentil,id='') {
  return [titulo,faixa,percentil,'','','','','','','',id];
}
function catalogo(env,linhas) {
  const aba=env.spreadsheet.getSheetByName('Consulta')||env.spreadsheet.insertSheet('Consulta');
  aba.values=[consultaHeaders,...linhas];return aba;
}
function importar(env,p){const text=JSON.stringify(p);const preview=env.context.validarAtualizacao(text);return env.context.importarAtualizacao(text,preview.token);}
function teste(nome,fn){fn();testes++;console.log('OK '+nome);}

teste('rejeita pacote inválido antes de qualquer escrita',()=>{
  const env=ambiente();const p=pacote();p.tabs[0].rows[0].push('extra');
  assert.throws(()=>importar(env,p),/colunas/);assert.equal(env.controle.writes,0);assert.equal(env.sheets.length,0);
});
teste('rejeita métricas, ordens, abas, metodologia e cabeçalhos incompatíveis',()=>{
  const mutacoes=[
    p=>p.resumo.publicacoes_periodicos_unicas=20,p=>p.tabs[0].rows.reverse(),
    p=>p.tabs[2].title='Periódicos',p=>p.tabs[0].headers[0]='=1+1',
    p=>p.methodology[0].label='Regra manual',p=>p.tabs[0].rows[0][2]=2,
    p=>p.tabs[1].rows.pop(),p=>p.production_sha256='abc',p=>p.anos=[2026,2025],
    p=>p.tabs[0].rows[0][1]=Infinity,p=>p.tabs[2].rows[0][4]=-1,
    p=>{p.tabs[3].rows[0][4]='A8';p.tabs[3].rows[0][5]=0;},
    p=>{p.tabs[3].rows[0][4]='A1';p.tabs[3].rows[0][5]=0.875;}
  ];
  for(const mutar of mutacoes){const env=ambiente();const p=pacote();mutar(p);assert.throws(()=>importar(env,p));assert.equal(env.controle.writes,0);}
});
teste('importa dados, mantém gids e preserva catálogo e notas não gerenciadas',()=>{
  const env=ambiente();const p=pacote();preparar(env,p);
  const ids=p.tabs.map(t=>env.spreadsheet.getSheetByName(t.title).id);
  const resultado=importar(env,p);assert.equal(resultado.ok,true);
  assert.deepEqual(p.tabs.map(t=>env.spreadsheet.getSheetByName(t.title).id),ids);
  assert.deepEqual(env.spreadsheet.getSheetByName('Periódicos').values,[['Catálogo intocável','0199-1234']]);
  assert.equal(env.spreadsheet.getSheetByName('Critérios e fontes').getRange(1,3).getValue(),'Preservar esta regra');
  assert.equal(env.sheets.filter(s=>s.hidden).length,5);
});
teste('strings de fórmula, apóstrofos, zeros e ausência conservam seus tipos',()=>{
  const env=ambiente();const p=pacote();preparar(env,p);
  p.tabs[2].rows=[evento('=IMPORTXML("https://example.invalid","//x")','formula',null),
    evento("'texto literal",'aspas',0),evento('  =1+1','espacos',3)];
  importar(env,p);
  const v=env.spreadsheet.getSheetByName('Eventos').getDataRange().getValues();
  assert.equal(v[1][0],p.tabs[2].rows[0][0]);assert.equal(v[1][4],'');
  assert.equal(v[2][0],"'texto literal");assert.equal(v[2][4],0);assert.equal(v[3][0],'  =1+1');
});
teste('reimportação idêntica não escreve nem cria cópias; edição manual é detectada',()=>{
  const env=ambiente();const p=pacote();preparar(env,p);importar(env,p);
  const writes=env.controle.writes;const count=env.sheets.length;
  assert.equal(importar(env,p).unchanged,true);assert.equal(env.controle.writes,writes);assert.equal(env.sheets.length,count);
  env.spreadsheet.getSheetByName('Eventos').values[1][0]='Alterado à mão';
  assert.equal(importar(env,p).unchanged,false);
  assert.equal(env.spreadsheet.getSheetByName('Eventos').values[1][0],'Congresso');
});
teste('ranking inclui Total fora do filtro, docentes distintos e larguras compactas por ano',()=>{
  const env=ambiente();const p=pacote();preparar(env,p);importar(env,p);
  const s=env.spreadsheet.getSheetByName('Periódicos dos docentes');
  assert.deepEqual(s.getDataRange().getValues()[0],['Periódico','Faixa de referência','Percentil usado',
    'Publicações únicas','2025','2026','Docentes distintos','Registros por docente']);
  assert.deepEqual(s.getDataRange().getValues().at(-1),['Total','','',3,1,2,1,3]);
  assert.equal(s.getFilter().getRange().getNumRows(),3);
  assert.equal(s.getFilter().getRange().getNumColumns(),8);
  assert.equal(s.getRowHeight(1),64);assert.equal(s.getRowHeight(2),40);
  assert.equal(s.getColumnWidth(1),400);assert.equal(s.getColumnWidth(2),130);
  assert.equal(s.getColumnWidth(3),110);assert.equal(s.getColumnWidth(4),116);
  assert.equal(s.getColumnWidth(5),72);assert.equal(s.getColumnWidth(6),72);
  assert.equal(s.getColumnWidth(7),112);assert.equal(s.getColumnWidth(8),140);
  s.values.at(-1)[3]=99;
  assert.equal(importar(env,p).unchanged,false);
  assert.equal(s.getDataRange().getValues().at(-1)[3],3);
});
teste('ranking copia a referência por título único e mantém percentil zero numérico',()=>{
  const env=ambiente();const p=pacote();preparar(env,p);
  const c=catalogo(env,[referencia('  JORNAL A  ','A2',80.625,'11'),referencia('Jornal B','A8',0,'12')]);
  const antes=clone(c.values);
  const previa=env.context.validarAtualizacao(JSON.stringify(p));
  assert.equal(previa.tabs[0].columns,8);
  importar(env,p);
  const s=env.spreadsheet.getSheetByName('Periódicos dos docentes');
  assert.deepEqual(s.values[1],['Jornal A','A2',80.625,2,1,1,1,2]);
  assert.deepEqual(s.values[2],['Jornal B','A8',0,1,0,1,1,1]);
  assert.equal(s.numberFormats[1][2],'0.0########');
  assert.equal(s.numberFormats[2][2],'0');
  assert.equal(s.numberFormats[1][3],'0');
  assert.deepEqual(s.backgrounds[1],Array(8).fill('#ffffff'));
  assert.deepEqual(c.values,antes);
  assert.equal(importar(env,p).unchanged,true);
  c.values[1][1]='A1';c.values[1][2]=99;
  assert.equal(importar(env,p).unchanged,false);
  assert.deepEqual(s.values[1].slice(1,3),['A1',99]);
});
teste('métrica ausente preserva Sem percentil e só ausência no catálogo colore a linha',()=>{
  const env=ambiente();const p=pacote();preparar(env,p);
  catalogo(env,[referencia('Jornal A','Sem percentil',null,'11')]);
  importar(env,p);
  const s=env.spreadsheet.getSheetByName('Periódicos dos docentes');
  assert.deepEqual(s.values[1].slice(1,3),['Sem percentil','']);
  assert.deepEqual(s.values[2].slice(1,3),['','']);
  assert.deepEqual(s.backgrounds[1],Array(8).fill('#ffffff'));
  assert.deepEqual(s.backgrounds[2],Array(8).fill('#fce8e6'));
  assert.deepEqual(s.backgrounds[3],Array(8).fill('#e6ebed'));
});
teste('sem aba Consulta mantém métricas vazias sem marcar todos como fora do catálogo',()=>{
  const env=ambiente();const p=pacote();preparar(env,p);importar(env,p);
  const s=env.spreadsheet.getSheetByName('Periódicos dos docentes');
  assert.deepEqual(s.values[1].slice(1,3),['','']);
  assert.deepEqual(s.backgrounds[1],Array(8).fill('#ffffff'));
});
teste('Source ID explícito distingue homônimos e nunca recorre ao primeiro título',()=>{
  const env=ambiente();const p=pacote();preparar(env,p);
  p.tabs[0].rows[0][0]='Homônimo [source:22]';
  p.tabs[0].rows[1][0]='Homônimo [source:99]';
  catalogo(env,[referencia('Homônimo','A1',95,'11'),referencia('Homônimo','A3',70,'22')]);
  importar(env,p);
  const s=env.spreadsheet.getSheetByName('Periódicos dos docentes');
  assert.deepEqual(s.values[1].slice(1,3),['A3',70]);
  assert.deepEqual(s.values[2].slice(1,3),['','']);
  assert.deepEqual(s.backgrounds[2],Array(8).fill('#fce8e6'));
});
teste('ambiguidade, identidade divergente e percentil inválido abortam antes da escrita',()=>{
  const casos=[
    {titulo:'Jornal A',linhas:[referencia('Jornal A','A1',95,'11'),referencia('Jornal A','A3',70,'22')],erro:/ambígua/},
    {titulo:'Jornal A [source:11]',linhas:[referencia('Jornal A','A1',95,'11'),referencia('Jornal A','A3',70,'11')],erro:/ambígua/},
    {titulo:'Jornal A [source:11]',linhas:[referencia('Outro jornal','A1',95,'11')],erro:/não correspondem/},
    {titulo:'Jornal A',linhas:[referencia('Jornal A','A1','95','11')],erro:/Percentil inválido/},
    {titulo:'Jornal A',linhas:[referencia('Jornal A','A1',101,'11')],erro:/Percentil inválido/},
    {titulo:'Jornal A',linhas:[referencia('Jornal A','Sem percentil',80,'11')],erro:/Faixa de referência inválida/},
    {titulo:'Jornal A',linhas:[referencia('Jornal A','A1',null,'11')],erro:/Faixa de referência inválida/},
  ];
  for(const caso of casos) {
    const env=ambiente();const p=pacote();preparar(env,p);p.tabs[0].rows[0][0]=caso.titulo;
    catalogo(env,caso.linhas);const quantidade=env.sheets.length;
    assert.throws(()=>importar(env,p),caso.erro);
    assert.equal(env.controle.writes,0);assert.equal(env.sheets.length,quantidade);
    // O caminho de importação direto também valida o catálogo, sem depender da prévia.
    const token=env.context.lerPacote_(JSON.stringify(p))._hash;
    assert.throws(()=>env.context.importarAtualizacao(JSON.stringify(p),token),caso.erro);
    assert.equal(env.controle.writes,0);assert.equal(env.sheets.length,quantidade);
  }
});
teste('falha em uma aba restaura todas as anteriores e seus gids',()=>{
  const env=ambiente();const p=pacote();preparar(env,p);
  const antes=env.sheets.map(s=>({name:s.name,id:s.id,values:clone(s.values)}));
  env.controle.failOn='Eventos';
  assert.throws(()=>importar(env,p),/restaurado/);
  for(const s of antes){const atual=env.spreadsheet.getSheetByName(s.name);assert.equal(atual.id,s.id);
    assert.deepEqual(atual.getDataRange().getValues(),s.values.map(r=>r.concat(Array(Math.max(...s.values.map(x=>x.length))-r.length).fill(''))));}
  assert.equal(env.props.SIADOCE_IMPORTACAO_ATUAL_V1,undefined);
});
teste('restauração por menu desfaz atualização sem recriar abas existentes',()=>{
  const env=ambiente();const p=pacote();preparar(env,p);const id=env.spreadsheet.getSheetByName('Eventos').id;
  importar(env,p);env.context.restaurarUltimaImportacao();
  assert.equal(env.spreadsheet.getSheetByName('Eventos').id,id);
  assert.equal(env.spreadsheet.getSheetByName('Eventos').values[0][0],'Antigo Eventos');
  assert.equal(env.spreadsheet.getSheetByName('Critérios e fontes').values[1][2],'Nota antiga');
  assert.equal(env.props.SIADOCE_IMPORTACAO_ULTIMA_V1,undefined);
});
teste('recusa arquivo alterado depois da prévia',()=>{
  const env=ambiente();const p=pacote();const token=env.context.validarAtualizacao(JSON.stringify(p)).token;
  p.tabs[2].rows[0][0]='Novo';assert.throws(()=>env.context.importarAtualizacao(JSON.stringify(p),token),/mudou/);
  assert.equal(env.sheets.length,0);
});
teste('falha ao registrar conclusão restaura dados e histórico anteriores',()=>{
  const env=ambiente();const p=pacote();preparar(env,p);importar(env,p);
  const ultima=env.props.SIADOCE_IMPORTACAO_ULTIMA_V1;
  p.tabs[2].rows[0][0]='Novo';env.controle.failProperty='SIADOCE_IMPORTACAO_ULTIMA_V1';
  assert.throws(()=>importar(env,p),/restaurado/);
  assert.equal(env.spreadsheet.getSheetByName('Eventos').values[1][0],'Congresso');
  assert.equal(env.props.SIADOCE_IMPORTACAO_ULTIMA_V1,ultima);
});
teste('primeira importação pode criar abas; restauração remove somente as criadas',()=>{
  const env=ambiente();const p=pacote();env.spreadsheet.insertSheet('Periódicos').values=[['Original']];
  importar(env,p);assert.equal(env.sheets.length,6);
  env.context.restaurarUltimaImportacao();assert.equal(env.sheets.length,1);assert.equal(env.sheets[0].name,'Periódicos');
});
teste('importação interrompida exige recuperação antes de nova escrita',()=>{
  const env=ambiente();const p=pacote();env.props.SIADOCE_IMPORTACAO_ATUAL_V1=JSON.stringify({id:'interrompida',abas:[]});
  assert.throws(()=>importar(env,p),/interrompida/);assert.equal(env.controle.writes,0);
  env.context.restaurarUltimaImportacao();assert.equal(env.props.SIADOCE_IMPORTACAO_ATUAL_V1,undefined);
});
teste('recuperação após interrupção mantém a importação anterior disponível',()=>{
  const env=ambiente();const p=pacote();preparar(env,p);importar(env,p);
  const primeira=env.props.SIADOCE_IMPORTACAO_ULTIMA_V1;
  p.tabs[2].rows[0][0]='Segunda versão';importar(env,p);
  // Simula interrupção depois de gravar a conclusão e antes de limpar o estado em andamento.
  env.props.SIADOCE_IMPORTACAO_ATUAL_V1=env.props.SIADOCE_IMPORTACAO_ULTIMA_V1;
  env.context.restaurarUltimaImportacao();
  assert.equal(env.spreadsheet.getSheetByName('Eventos').values[1][0],'Congresso');
  assert.equal(env.props.SIADOCE_IMPORTACAO_ULTIMA_V1,primeira);
  env.context.restaurarUltimaImportacao();
  assert.equal(env.spreadsheet.getSheetByName('Eventos').values[0][0],'Antigo Eventos');
});
teste('metodologia duplicada na planilha aborta antes de alterações',()=>{
  const env=ambiente();const p=pacote();preparar(env,p);
  env.spreadsheet.getSheetByName('Critérios e fontes').values.push([p.methodology[0].label,'','Outra']);
  assert.throws(()=>importar(env,p),/repetido/);assert.equal(env.controle.writes,0);
});

if (process.argv[2]) teste('pacote real do SIADoce passa validação e gravação/conferência de todas as células',()=>{
  const env=ambiente();const p=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));preparar(env,p);
  if(process.argv[3]) {
    const valores=JSON.parse(fs.readFileSync(process.argv[3],'utf8'));
    env.spreadsheet.insertSheet('Consulta').values=valores;
  }
  assert.equal(importar(env,p).ok,true);
  const conferido=env.context.lerPacote_(JSON.stringify(p));
  env.context.prepararReferenciasRanking_(conferido,env.spreadsheet);
  for(const t of p.tabs) {
    const atual=env.spreadsheet.getSheetByName(t.title).getDataRange().getValues();
    const expected=clone(env.context.linhasExibidas_(t,conferido));
    assert.deepEqual(atual,expected.map(r=>r.map(v=>v===null?'':v)));
  }
  assert.equal(importar(env,p).unchanged,true);
});
console.log(`${testes} testes passaram.`);
