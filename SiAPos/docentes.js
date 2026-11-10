(function(){
  'use strict';

  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeURL=value=>/^https?:\/\//i.test(String(value||''))?String(value):null;
  const numeric=cell=>cell?.status==='verified'&&Number.isInteger(cell.value)&&cell.value>=0;
  const date=value=>/^\d{4}-\d{2}-\d{2}$/.test(String(value||''))?value.split('-').reverse().join('/'):String(value||'Não informada');
  const format=cell=>numeric(cell)?new Intl.NumberFormat('pt-BR').format(cell.value):cell?.status==='NA'?'NA':'ND';
  const countLabels={total:'Total do departamento',own:'Na pós associada',other:'Em outras pós',any:'Em alguma pós',none:'Sem credenciamento nos programas consultados'};
  const countNotes={total:'Docentes lotados no departamento, segundo o universo e a data da fonte do quadro docente.',own:'Pessoas distintas com credenciamento vigente em pelo menos um programa associado ao departamento.',other:'Pessoas distintas com credenciamento vigente em pelo menos um dos demais programas consultados.',any:'Pessoas distintas com credenciamento vigente em pelo menos um programa consultado. Quem está em vários programas é contado uma única vez.',none:'Docentes do quadro sem credenciamento vigente nos programas consultados. Não afirma ausência de credenciamento em programas fora da cobertura.'};
  let root=null,dataset=null,selected=null,sources=new Map(),references=new Map(),referenceId=0;

  function accessLabel(access){return access==='public'?'Fonte pública':/authentic|janus/.test(String(access||''))?'Consulta autenticada':'Fonte documentada';}
  function getCell(value){return value&&typeof value==='object'?value:{value:null,status:'ND',source_ids:[],note:'Não há contagem comprovada para este recorte.'};}
  function programLabel(program){return (program.name||program.id)+(program.unit_label?' · '+program.unit_label:'');}
  function programName(id){const p=(dataset.programs||[]).find(p=>p.id===id);return p?programLabel(p):id;}
  function ownLabel(department){return (department.own_program_ids||[]).map(programName).join('; ')||'Sem associação definida';}
  function activeDepartments(){return dataset.departments.filter(d=>selected.has(d.id));}
  function cellHTML(raw,department,label,definition){
    const cell=getCell(raw),id='doc-'+referenceId++;
    references.set(id,{cell,department,label,definition});
    return `<button class="metric-cell docente-metric" data-docente-source="${id}" aria-label="${esc(department.id+' · '+label+': '+format(cell)+'. Consultar origem e critério.')}">${numeric(cell)?esc(format(cell)):`<span class="${cell.status==='NA'?'na':'nd'}">${format(cell)}</span>`}</button>`;
  }
  function filterHTML(){
    return `<section class="filters sticky-filters docentes-filters" aria-label="Filtros dos docentes"><div class="filter-control-row"><div class="filter-options" role="group" aria-label="Departamentos"><span class="filter-label">Departamentos</span>${dataset.departments.map(d=>`<label class="program-chip" title="${esc(d.name)}"><input type="checkbox" data-docente-department="${esc(d.id)}" aria-label="${esc(d.name||d.id)}" ${selected.has(d.id)?'checked':''}><strong>${esc(d.id)}</strong></label>`).join('')}<button type="button" class="text-button" data-docente-all>Todos</button></div><span class="docentes-date">Referência: <strong>${esc(date(dataset.as_of))}</strong></span></div></section>`;
  }
  function summaryHTML(departments){
    return `<section aria-labelledby="docentes-summary-title"><div class="section-heading"><div><h2 id="docentes-summary-title">Quadro docente e participação na pós</h2><p>Credenciamento vigente · ${esc(dataset.scope?.label||'Programas com cobertura documentada')}${dataset.scope?.roster_label?' · '+esc(dataset.scope.roster_label):''}</p></div></div><div class="panel"><div class="table-wrap docentes-table-wrap" tabindex="0" role="region" aria-label="Quadro docente por departamento; role horizontalmente para consultar todas as colunas"><table class="data-table docentes-summary-table"><caption class="docentes-visually-hidden">Docentes por departamento em ${esc(date(dataset.as_of))}. As colunas de pós associada e outras pós podem se sobrepor.</caption><thead><tr><th scope="col">Departamento</th>${Object.entries(countLabels).map(([key,label])=>`<th scope="col"${key==='none'?' class="docentes-wide-heading"':''}>${esc(label)}</th>`).join('')}</tr></thead><tbody>${departments.map(d=>`<tr><th scope="row"><strong>${esc(d.id)}</strong><span class="docentes-department-name">${esc(d.name||'')}</span></th>${Object.entries(countLabels).map(([key,label])=>`<td>${cellHTML(d.counts?.[key],d,label,countNotes[key])}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div><p class="docentes-reading-note">“Na pós associada” e “Em outras pós” podem incluir as mesmas pessoas. “Em alguma pós” conta cada docente uma única vez no conjunto consultado. Os valores abrem suas fontes e critérios.</p></section>`;
  }
  function matrixHTML(departments){
    const programs=dataset.programs||[];
    if(!programs.length)return '';
    return `<section aria-labelledby="docentes-matrix-title"><div class="section-heading"><div><h2 id="docentes-matrix-title">Credenciamento por programa</h2><p>Docentes do departamento com credenciamento vigente em cada programa consultado.</p></div></div><div class="panel"><div class="table-wrap docentes-table-wrap" tabindex="0" role="region" aria-label="Matriz de credenciamento; role horizontalmente para consultar todos os programas"><table class="data-table docentes-matrix-table"><caption class="docentes-visually-hidden">Credenciamentos vigentes por departamento de lotação e programa de pós-graduação.</caption><thead><tr><th scope="col">Departamento</th>${programs.map(p=>`<th scope="col"><span>${esc(p.short_name||p.id)}</span><small class="docentes-program-name">${esc(p.name||p.id)}</small>${p.unit_label?`<small class="docentes-program-unit">${esc(p.unit_label)}</small>`:''}${p.interdepartmental?'<small class="docentes-program-kind">Interdepartamental</small>':''}</th>`).join('')}</tr></thead><tbody>${departments.map(d=>`<tr><th scope="row">${esc(d.id)}</th>${programs.map(p=>{const own=(d.own_program_ids||[]).includes(p.id);return `<td${own?' class="docentes-own-program"':''}>${cellHTML(d.program_counts?.[p.id],d,programLabel(p),'Pessoas distintas do departamento com credenciamento vigente neste programa, na data de referência.')}${own?'<small class="docentes-own-label">Associada</small>':''}</td>`;}).join('')}</tr>`).join('')}</tbody></table></div></div><p class="docentes-reading-note">Uma pessoa pode aparecer em mais de um programa. A soma das colunas não corresponde ao total de docentes credenciados.</p></section>`;
  }
  function sourceHTML(source){
    const url=safeURL(source.url);
    return `<article class="source-card"><span class="status-tag">${esc(accessLabel(source.access))}</span><h3>${esc(source.title||source.id)}</h3>${source.locator?`<p>${esc(source.locator)}</p>`:''}<p>Consulta: ${esc(date(source.retrieved_on))}</p>${source.note?`<p>${esc(source.note)}</p>`:''}${url?`<a class="text-button" href="${esc(url)}" target="_blank" rel="noopener noreferrer">Abrir fonte ↗</a>`:''}${source.sha256?`<details><summary>Identidade da evidência</summary><code>${esc(source.sha256)}</code></details>`:''}</article>`;
  }
  function methodsHTML(departments){
    const usedIds=new Set(departments.flatMap(d=>[...Object.values(d.counts||{}),...Object.values(d.program_counts||{})].flatMap(c=>c?.source_ids||[])));
    const usedSources=[...sources.values()].filter(s=>usedIds.has(s.id));
    const notes=Array.isArray(dataset.notes)?dataset.notes:[];
    return `<details class="table-disclosure docentes-methods"><summary>Fontes e critérios</summary><div class="docentes-methods-body"><div class="methods-grid"><article class="method"><h3>O que significa atuar na pós</h3><p>Credenciamento vigente no Janus, na data de referência. A contagem não exige disciplina ministrada ou orientação em andamento.</p></article><article class="method"><h3>Programas associados</h3><p>${departments.map(d=>`<strong>${esc(d.id)}:</strong> ${esc(ownLabel(d))}.`).join(' ')}</p><p>Os demais programas consultados entram em “Em outras pós”. Programas interdepartamentais só entram como associados quando essa relação está explicitamente definida.</p></article><article class="method"><h3>Cobertura</h3><p>${esc(dataset.scope?.description||dataset.scope?.label||'Consulte a fonte de cada contagem.')}</p><p>“Sem credenciamento” se limita aos programas consultados. Nenhuma ausência de consulta é interpretada como zero.</p></article><article class="method"><h3>Contagem de pessoas</h3><p>Cada docente é contado uma vez em cada grupo. Credenciamentos em mais de um nível, área ou programa não multiplicam o total de pessoas do grupo.</p><p><strong>ND:</strong> contagem não determinada. <strong>NA:</strong> recorte não aplicável. <strong>0:</strong> zero comprovado.</p></article></div>${notes.length?`<div class="callout">${notes.map(note=>`<p>${esc(typeof note==='string'?note:note.text||note.note||'')}</p>`).join('')}</div>`:''}<div class="source-grid">${usedSources.map(sourceHTML).join('')}</div></div></details>`;
  }
  function render(){
    if(!root)return;
    dataset=window.DOCENTES_DATA;
    if(!dataset||!Array.isArray(dataset.departments)||!dataset.departments.length){
      root.innerHTML='<div class="empty-state"><h2>Dados docentes indisponíveis</h2><p>A base de docentes ainda não está disponível nesta versão do painel. Nenhuma ausência é apresentada como zero.</p></div>';
      return;
    }
    if(!selected)selected=new Set(dataset.departments.map(d=>d.id));
    sources=new Map((dataset.sources||[]).map(s=>[s.id,s]));references=new Map();referenceId=0;
    const focused=document.activeElement?.dataset?.docenteDepartment,departments=activeDepartments();
    root.innerHTML=filterHTML()+(departments.length?`${dataset.scope?.complete===false?`<div class="callout warning"><strong>Cobertura parcial.</strong> ${esc(dataset.scope.description||'As contagens se limitam aos programas efetivamente consultados. Consulte as fontes e os valores ND.')}</div>`:''}${summaryHTML(departments)}${matrixHTML(departments)}${methodsHTML(departments)}<section class="panel indicators-download" aria-label="Download dos dados docentes"><div><h2>Dados desta seleção</h2><p>Quadro docente, credenciamentos por programa, data de referência e fontes no mesmo arquivo.</p></div><button class="button" type="button" data-docente-csv>Baixar tabelas CSV ↓</button></section>`:'<div class="empty-state"><h2>Selecione pelo menos um departamento</h2><button class="button" type="button" data-docente-all>Selecionar todos</button></div>');
    if(focused)root.querySelector('[data-docente-department="'+CSS.escape(focused)+'"]')?.focus({preventScroll:true});
    window.SIAPOS_FILTERS?.refresh();
  }
  function csvRows(){
    const rows=[['data_referencia','departamento','nome_departamento','indicador','programa','programa_associado','valor','status','escopo','cobertura_completa','criterio','fontes','urls','data_consulta','localizadores','sha256','recorte_quadro','cobertura_detalhada','programa_id','unidade_programa']];
    const add=(department,key,program,raw,definition)=>{
      const cell=getCell(raw),refs=(cell.source_ids||[]).map(id=>sources.get(id)).filter(Boolean);
      rows.push([dataset.as_of,department.id,department.name||'',key,program?.name||'',program?(department.own_program_ids||[]).includes(program.id)?'sim':'não':ownLabel(department),numeric(cell)?cell.value:'',numeric(cell)?'verified':cell.status==='NA'?'NA':'ND',dataset.scope?.label||'',dataset.scope?.complete===true?'sim':dataset.scope?.complete===false?'não':'não informada',[definition,cell.note||''].filter(Boolean).join(' '),refs.map(s=>s.title||s.id).join(' | '),refs.map(s=>safeURL(s.url)||'').join(' | '),refs.map(s=>s.retrieved_on||'').join(' | '),refs.map(s=>s.locator||'').join(' | '),refs.map(s=>s.sha256||'').join(' | '),dataset.scope?.roster_label||'',dataset.scope?.description||'',program?.id||'',program?.unit_label||'']);
    };
    activeDepartments().forEach(d=>{Object.entries(countLabels).forEach(([key,label])=>add(d,label,null,d.counts?.[key],countNotes[key]));(dataset.programs||[]).forEach(p=>add(d,'Credenciamento por programa',p,d.program_counts?.[p.id],'Pessoas distintas com credenciamento vigente no programa.'));});
    return rows;
  }
  function exportCSV(){
    const text=csvRows().map(row=>row.map(value=>'"'+String(value??'').replace(/"/g,'""')+'"').join(';')).join('\r\n');
    const url=URL.createObjectURL(new Blob(['\uFEFF'+text],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');
    a.href=url;a.download='sia-docentes-'+dataset.as_of+'.csv';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  const dialog=document.createElement('dialog');dialog.id='docentes-source-dialog';dialog.setAttribute('aria-labelledby','docentes-source-title');dialog.innerHTML='<div class="dialog-header"><h2 id="docentes-source-title">Origem da contagem</h2><button class="icon-button" type="button" data-docente-close aria-label="Fechar detalhes">×</button></div><div class="docentes-source-content"></div><div class="dialog-actions"><button class="button" type="button" data-docente-close>Fechar</button></div>';document.body.appendChild(dialog);
  function showSource(id){
    const ref=references.get(id);if(!ref)return;
    const {cell,department,label,definition}=ref,refs=(cell.source_ids||[]).map(sourceId=>sources.get(sourceId)).filter(Boolean);
    dialog.querySelector('#docentes-source-title').textContent=label+' · '+department.id;
    dialog.querySelector('.docentes-source-content').innerHTML=`<p>${esc(department.name||department.id)} · ${esc(date(dataset.as_of))}</p><div class="source-value">${esc(format(cell))}</div><p>${esc(definition)}</p>${cell.note?`<div class="callout">${esc(cell.note)}</div>`:''}<p><strong>Cobertura:</strong> ${esc(dataset.scope?.label||'Não informada')}</p>${refs.length?refs.map(sourceHTML).join(''):'<p>Não há fonte comprovada vinculada a esta contagem.</p>'}`;
    dialog.showModal();
  }
  document.addEventListener('click',event=>{
    if(event.target.closest('[data-docente-close]')){dialog.close();return;}
    const source=event.target.closest('[data-docente-source]');if(source){showSource(source.dataset.docenteSource);return;}
    if(event.target.closest('[data-docente-all]')&&dataset){selected=new Set(dataset.departments.map(d=>d.id));render();return;}
    if(event.target.closest('[data-docente-csv]')&&dataset)exportCSV();
  });
  document.addEventListener('change',event=>{const id=event.target.dataset?.docenteDepartment;if(!id)return;if(event.target.checked)selected.add(id);else selected.delete(id);render();});
  dialog.addEventListener('click',event=>{if(event.target===dialog){const bounds=dialog.getBoundingClientRect();if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)dialog.close();}});
  window.SIAPOS_DOCENTES={mount(container){root=container;render();},csvRows};
})();
