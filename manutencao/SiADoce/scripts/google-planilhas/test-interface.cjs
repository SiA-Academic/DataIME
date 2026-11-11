'use strict';
// Exercita o JavaScript real da janela, com DOM e chamadas Apps Script simulados.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html = fs.readFileSync(path.join(__dirname, 'Importar.html'), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const texto = '{"kind":"siadoce.planilha","titulo":"<img src=x onerror=alert(1)>"}';

function ambiente() {
  const elementos = {};
  class Elemento {
    constructor(id) { Object.assign(this, {id, value:'', textContent:'', disabled:false, hidden:false,
      className:'', files:[], listeners:{}, children:[]}); }
    addEventListener(name, fn) { this.listeners[name]=fn; }
    async dispatch(name) { if(this.disabled)return;return this.listeners[name]?.call(this); }
    appendChild(child) { this.children.push(child); }
    replaceChildren(...children) { this.children=children; }
  }
  for(const m of html.matchAll(/\bid="([^"]+)"/g)) elementos[m[1]]=new Elemento(m[1]);
  elementos.conferir.disabled=true;elementos.importar.disabled=true;elementos.usarTexto.disabled=true;
  const chamadas=[];
  function runner() {
    const r={};
    r.withSuccessHandler=fn=>{r.success=fn;return r;};
    r.withFailureHandler=fn=>{r.failure=fn;return r;};
    r.validarAtualizacao=value=>chamadas.push({method:'validar',value,success:r.success,failure:r.failure});
    r.importarAtualizacao=(value,token)=>chamadas.push({method:'importar',value,token,success:r.success,failure:r.failure});
    return r;
  }
  const run=new Proxy({}, {get:(_,property)=>runner()[property]});
  const contexto=vm.createContext({
    Blob,Date,String,document:{getElementById:id=>elementos[id],createElement:tag=>new Elemento(tag)},
    google:{script:{run,host:{close:()=>{}}}},console
  });
  vm.runInContext(script,contexto);
  return {elementos,chamadas};
}
function previa() {return {token:'abc123',arquivo:'Planilha existente',periodo:'2022–2026',
  generated_at:'2026-10-20T18:00:00Z',tabs:[{title:'Eventos <script>',rows:146}],
  resumo:{total_registros:688,publicacoes_periodicos_unicas:298,pendentes_periodicos:27,pendentes_eventos:182}};}
async function colar(env,conteudo=texto) {
  env.elementos.textoAlternativo.value=conteudo;
  await env.elementos.textoAlternativo.dispatch('input');
  await env.elementos.usarTexto.dispatch('click');
}
let testes=0;
async function teste(nome,fn){await fn();testes++;console.log('OK '+nome);}
(async function(){
  await teste('conteúdo colado usa a mesma prévia e importação, sem executar a entrada',async()=>{
    const e=ambiente();await colar(e);
    assert.equal(e.elementos.conferir.disabled,false);assert.equal(e.chamadas.length,0);
    await e.elementos.conferir.dispatch('click');
    assert.equal(e.chamadas[0].method,'validar');assert.equal(e.chamadas[0].value,texto);
    assert.equal(e.elementos.textoAlternativo.disabled,true);
    e.chamadas[0].success(previa());
    assert.equal(e.elementos.importar.disabled,false);
    assert.equal(e.elementos.abas.children[0].children[0].textContent,'Eventos <script>');
    await e.elementos.importar.dispatch('click');
    assert.equal(e.chamadas[1].method,'importar');assert.equal(e.chamadas[1].value,texto);
    assert.equal(e.chamadas[1].token,'abc123');
    e.chamadas[1].success({unchanged:false,message:'Conferido',updated_at:'2026-10-20T18:01:00Z',id:'teste'});
    assert.equal(e.elementos.result.hidden,false);assert.match(e.elementos.result.textContent,/Conferido/);
    assert.equal(e.elementos.importar.disabled,true);
  });
  await teste('alterar texto depois da prévia invalida o token e exige nova conferência',async()=>{
    const e=ambiente();await colar(e);await e.elementos.conferir.dispatch('click');
    e.chamadas[0].success(previa());
    e.elementos.textoAlternativo.value='{"novo":true}';
    await e.elementos.textoAlternativo.dispatch('input');
    assert.equal(e.elementos.importar.disabled,true);assert.equal(e.elementos.previa.hidden,true);
    assert.equal(e.elementos.conferir.disabled,true);
    await e.elementos.usarTexto.dispatch('click');
    assert.equal(e.elementos.conferir.disabled,false);
    await e.elementos.conferir.dispatch('click');
    assert.equal(e.chamadas.at(-1).value,'{"novo":true}');
  });
  await teste('limite de tamanho considera bytes UTF-8, e conteúdo vazio não é selecionado',async()=>{
    const e=ambiente();await colar(e,'é'.repeat(4*1024*1024+1));
    assert.equal(e.elementos.conferir.disabled,true);assert.match(e.elementos.status.textContent,/8 MiB/);
    await colar(e,' \n ');assert.equal(e.elementos.conferir.disabled,true);
    assert.equal(e.chamadas.length,0);
  });
  await teste('seleção de arquivo continua disponível e passa pelo mesmo fluxo',async()=>{
    const e=ambiente();e.elementos.arquivo.files=[{name:'atualizacao.json',size:100,text:async()=>texto}];
    await e.elementos.arquivo.dispatch('change');
    assert.equal(e.elementos.conferir.disabled,false);
    await e.elementos.conferir.dispatch('click');assert.equal(e.chamadas[0].value,texto);
  });
  await teste('colar texto invalida leitura assíncrona de arquivo anterior',async()=>{
    const e=ambiente();let resolver;
    e.elementos.arquivo.files=[{name:'antigo.json',size:20,text:()=>new Promise(r=>{resolver=r;})}];
    const leitura=e.elementos.arquivo.dispatch('change');
    await colar(e,'{"novo":true}');resolver('{"antigo":true}');await leitura;
    await e.elementos.conferir.dispatch('click');
    assert.equal(e.chamadas[0].value,'{"novo":true}');
  });
  await teste('falha na validação não habilita importação',async()=>{
    const e=ambiente();await colar(e,'não é JSON');await e.elementos.conferir.dispatch('click');
    e.chamadas[0].failure({message:'JSON inválido'});
    assert.equal(e.elementos.importar.disabled,true);assert.equal(e.elementos.textoAlternativo.disabled,false);
    assert.match(e.elementos.status.textContent,/JSON inválido/);
  });
  console.log(`${testes} testes da interface passaram.`);
})().catch(error=>{console.error(error);process.exitCode=1;});
