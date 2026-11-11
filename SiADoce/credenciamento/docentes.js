(function(){
  'use strict';

  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeURL=value=>/^https?:\/\//i.test(String(value||''))?String(value):null;
  const numeric=cell=>cell?.status==='verified'&&Number.isInteger(cell.value)&&cell.value>=0;
  const date=value=>/^\d{4}-\d{2}-\d{2}$/.test(String(value||''))?value.split('-').reverse().join('/'):String(value||'Não informada');
  const format=cell=>numeric(cell)?new Intl.NumberFormat('pt-BR').format(cell.value):cell?.status==='NA'?'NA':'ND';
  const countLabels={total:'Total do departamento',own:'Na pós associada',other:'Em outras pós',any:'Em alguma pós',none:'Sem credenciamento nos programas consultados'};
  const countNotes={total:'Docentes lotados no departamento, segundo o universo e a data da fonte do quadro docente.',own:'Pessoas distintas com credenciamento vigente em pelo menos um programa associado ao departamento.',other:'Pessoas distintas com credenciamento vigente em pelo menos um dos demais programas consultados.',any:'Pessoas distintas com credenciamento vigente em pelo menos um programa consultado. Quem está em vários programas é contado uma única vez.',none:'Docentes do quadro sem credenciamento vigente nos programas consultados. Não afirma ausência de credenciamento em programas fora da cobertura.'};
  const unaccredited={id:'none',label:'Sem credenciamento',formula:'Total do departamento menos Em alguma pós, considerando os programas consultados.'};
  const categories=[{id:'own',label:'No programa'},{id:'other_only',label:'Só em outros programas'},unaccredited];
  const csvBreakdown=[
    {id:'own_only',label:'Só na pós associada',formula:'Em alguma pós menos Em outras pós.'},
    {id:'both',label:'Na associada e em outras',formula:'Na pós associada mais Em outras pós menos Em alguma pós.'},
    {id:'other_only',label:'Só em outras',formula:'Em alguma pós menos Na pós associada.'},
    unaccredited
  ];
  const percent=new Intl.NumberFormat('pt-BR',{style:'percent',maximumFractionDigits:1});
  let root=null,dataset=null,selected=null,sources=new Map(),references=new Map(),referenceId=0;

  function accessLabel(access){return access==='public'?'Fonte pública':/authentic|janus/.test(String(access||''))?'Consulta autenticada':'Fonte documentada';}
  function getCell(value){return value&&typeof value==='object'?value:{value:null,status:'ND',source_ids:[],note:'Não há contagem comprovada para este recorte.'};}
  function programLabel(program){return (program.name||program.id)+(program.unit_label?' · '+program.unit_label:'');}
  function programName(id){const p=(dataset.programs||[]).find(p=>p.id===id);return p?programLabel(p):id;}
  function ownLabel(department){return (department.own_program_ids||[]).map(programName).join('; ')||'Sem associação definida';}
  function activeDepartments(){return dataset.departments.filter(d=>selected.has(d.id));}
  function associatedPrograms(department){
    return (department.own_program_ids||[]).map(id=>dataset.programs?.find(p=>p.id===id)||{id});
  }
  function departmentShare(count,total){
    return Number.isInteger(count)&&count>=0&&total>0&&count<=total?count/total:null;
  }
  function associatedHTML(departments){
    const rows=[];
    for(const d of departments){
      const total=numeric(d.counts?.total)?d.counts.total.value:null;
      for(const p of associatedPrograms(d)){
        const acronym=p.short_name;
        const name=p.name||p.id;
        const label=acronym&&acronym!==name&&/^[A-Z]{2,}$/.test(acronym)?name+' ('+acronym+')':name;
        const cell=getCell(d.program_counts?.[p.id]),count=numeric(cell)?cell.value:null;
        const share=departmentShare(count,total);
        const fraction=share!==null||(total===0&&count===0)?count+' de '+total:'';
        const display=share!==null?percent.format(share):cell.status==='NA'||(total===0&&count===0)?'NA':'ND';
        rows.push(`<li class="docentes-associada-row" data-docente-associada="${esc(d.id)}" data-programa="${esc(p.id)}"><b class="docentes-associada-dept">${esc(d.id)}</b><span class="docentes-associada-programa">${esc(label)}</span><span class="docentes-associada-track" aria-hidden="true">${share===null?'':`<span style="width:${share*100}%"></span>`}</span><strong class="docentes-associada-pct">${display}</strong><span class="docentes-associada-fracao">${fraction}</span></li>`);
      }
    }
    return rows.length?`<section class="docentes-associada" aria-labelledby="docentes-associada-title"><div class="section-heading"><div><h2 id="docentes-associada-title">Docentes credenciados na pós associada</h2><p>Percentual do quadro de cada departamento. Inclui quem também atua em outros programas.</p></div></div><ul>${rows.join('')}</ul></section>`:'';
  }
  function facultyComposition(department){
    const counts=department.counts||{};
    const cells=['total','own','other','any'].map(key=>getCell(counts[key]));
    const [total,own,other,any]=cells.map(cell=>cell.value);
    const sourceIds=[...new Set(cells.flatMap(cell=>cell.source_ids||[]))];
    let note='';
    if(dataset.scope?.complete!==true)note='Cobertura incompleta dos programas consultados.';
    else if(!cells.every(numeric))note='Faltam contagens verificadas para a distribuição.';
    else if(any>total||any<Math.max(own,other)||any>own+other||
            (numeric(counts.none)&&counts.none.value!==total-any))note='As contagens do departamento são incompatíveis entre si.';
    const values=note?{}:{own,own_only:any-other,both:own+other-any,other_only:any-own,none:total-any};
    return {total:numeric(cells[0])?total:null,values,sourceIds,note};
  }
  function programComposition(department,program){
    const counts=department.counts||{};
    const roster=counts.total,anyProgram=counts.any,inProgram=department.program_counts?.[program.id];
    const total=numeric(roster)?roster.value:null;
    let note='';
    if(dataset.scope?.complete!==true)note='Cobertura incompleta dos programas consultados.';
    else if(total===null||!numeric(anyProgram)||!numeric(inProgram))note='Faltam contagens verificadas para a distribuição.';
    else if(inProgram.value>anyProgram.value||anyProgram.value>total||
            (numeric(counts.own)&&inProgram.value>counts.own.value)||
            (numeric(counts.none)&&counts.none.value!==total-anyProgram.value))note='As contagens do programa e do departamento são incompatíveis.';
    const values=note?{}:{own:inProgram.value,other_only:anyProgram.value-inProgram.value,none:total-anyProgram.value};
    return {total,values,note};
  }
  // Keep each percentage visible once, including shares too small to fit on the bar.
  const barObserver=window.ResizeObserver&&new window.ResizeObserver(entries=>{
    for(const {target:bar} of entries){
      const summary=bar.closest('summary');
      for(const segment of bar.children){
        const label=segment.firstElementChild;
        const fits=segment.clientWidth>=label.offsetWidth+4;
        label.classList.toggle('is-inline',fits);
        summary.querySelector('[data-docente-share="'+segment.dataset.category+'"]').classList.toggle('docentes-visually-hidden',fits);
      }
    }
  });
  function compositionHTML(departments){
    const legend=categories.map(c=>`<li><i class="docentes-category-swatch" data-category="${c.id}" aria-hidden="true"></i>${esc(c.label)}</li>`).join('');
    const rows=departments.flatMap(d=>associatedPrograms(d).map(p=>{
      const {total,values,note}=programComposition(d,p);
      const hasBar=!note&&total>0;
      const share=c=>percent.format(values[c.id]/total);
      const bar=hasBar?`<span class="docentes-composition-bar" aria-hidden="true">${categories.map(c=>
        `<span class="docentes-composition-segment" data-category="${c.id}" data-value="${values[c.id]}" style="flex-grow:${values[c.id]}"><span class="docentes-segment-label">${share(c)}</span></span>`).join('')}</span>`:
        `<span class="docentes-composition-message">${note?'ND · '+esc(note):'Nenhum docente no quadro.'}</span>`;
      const shares=hasBar?`<span class="docentes-composition-shares">${categories.map(c=>
        `<span data-docente-share="${c.id}"><i class="docentes-category-swatch" data-category="${c.id}" aria-hidden="true"></i>${esc(c.label)} <b>${share(c)}</b></span>`).join('')}</span>`:'';
      const details=categories.map(c=>{
        const count=values[c.id];
        const value=note?'ND':total===0?'0 · percentual indefinido':`${count} de ${total} · ${percent.format(count/total)}`;
        return `<div><dt>${esc(c.label)}</dt><dd>${esc(value)}</dd></div>`;
      }).join('');
      const program=p.short_name||p.name||p.id;
      return `<details class="docentes-composition-row" data-docente-composition="${esc(d.id)}" data-programa="${esc(p.id)}"><summary><span class="docentes-composition-label"><strong>${esc(d.id)}</strong> · ${esc(program)}</span>${bar}<span class="docentes-composition-total">${total===null?'Total ND':esc(total)+' docentes'}</span>${shares}</summary><dl class="docentes-composition-details">${details}</dl></details>`;
    })).join('');
    const scope=dataset.scope?.label;
    return `<section class="docentes-composition" aria-labelledby="docentes-composition-title"><div class="section-heading"><div><h2 id="docentes-composition-title">Distribuição do credenciamento</h2><p>Percentual do quadro por departamento${scope?' · '+esc(scope):''}</p></div></div><ul class="docentes-composition-legend" aria-label="Categorias de credenciamento">${legend}</ul>${rows}</section>`;
  }
  function cellHTML(raw,department,label,definition){
    const cell=getCell(raw),id='doc-'+referenceId++;
    references.set(id,{cell,department,label,definition});
    return `<button class="metric-cell docente-metric" data-docente-source="${id}" aria-label="${esc(department.id+' · '+label+': '+format(cell)+'. Consultar origem e critério.')}">${numeric(cell)?esc(format(cell)):`<span class="${cell.status==='NA'?'na':'nd'}">${format(cell)}</span>`}</button>`;
  }
  function filterHTML(){
    return `<section class="filters sticky-filters docentes-filters" aria-label="Filtros dos docentes"><div class="filter-control-row"><div class="filter-options" role="group" aria-label="Departamentos"><span class="filter-label">Departamentos</span>${dataset.departments.map(d=>`<label class="program-chip" title="${esc(d.name)}"><input type="checkbox" data-docente-department="${esc(d.id)}" aria-label="${esc(d.name||d.id)}" ${selected.has(d.id)?'checked':''}><strong>${esc(d.id)}</strong></label>`).join('')}<button type="button" class="text-button" data-docente-all>Todos</button></div><span class="docentes-date">Referência: <strong>${esc(date(dataset.as_of))}</strong></span></div></section>`;
  }
  function summaryValue(department,key,label){
    if(key==='own'){
      const programs=associatedPrograms(department);
      if(programs.length>1){
        const entries=programs.map(p=>{
          const metric=cellHTML(department.program_counts?.[p.id],department,programLabel(p),'Docentes deste departamento com credenciamento vigente neste programa.');
          return `<span class="docentes-summary-program"><span>${esc(p.short_name||p.name||p.id)}</span>${metric}</span>`;
        });
        return `<span class="docentes-summary-programs">${entries.join('')}</span>`;
      }
    }
    return cellHTML(department.counts?.[key],department,label,countNotes[key]);
  }
  function summaryHTML(departments){
    return `<section aria-labelledby="docentes-summary-title"><div class="section-heading"><div><h2 id="docentes-summary-title">Quadro docente e participação na pós</h2></div></div><div class="panel"><div class="table-wrap docentes-table-wrap" tabindex="0" role="region" aria-label="Quadro docente por departamento; role horizontalmente para consultar todas as colunas"><table class="data-table docentes-summary-table"><caption class="docentes-visually-hidden">Docentes por departamento em ${esc(date(dataset.as_of))}. As colunas de pós associada e outras pós podem se sobrepor.</caption><thead><tr><th scope="col">Departamento</th>${Object.entries(countLabels).map(([key,label])=>`<th scope="col"${key==='none'?' class="docentes-wide-heading"':''}>${esc(label)}</th>`).join('')}</tr></thead><tbody>${departments.map(d=>`<tr><th scope="row"><strong>${esc(d.id)}</strong><span class="docentes-department-name">${esc(d.name||'')}</span></th>${Object.entries(countLabels).map(([key,label])=>`<td>${summaryValue(d,key,label)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div><p class="docentes-reading-note">Cada linha considera os docentes do departamento. “Em outras pós” conta quem atua em algum programa consultado fora das pós associadas. Um docente pode aparecer em vários programas e conta uma vez em “Em alguma pós”.</p></section>`;
  }
  function matrixHTML(departments){
    const programs=dataset.programs||[];
    if(!programs.length)return '';
    return `<section aria-labelledby="docentes-matrix-title"><div class="section-heading"><div><h2 id="docentes-matrix-title">Credenciamento por programa</h2></div></div><div class="panel"><div class="table-wrap docentes-table-wrap" tabindex="0" role="region" aria-label="Matriz de credenciamento; role horizontalmente para consultar todos os programas"><table class="data-table docentes-matrix-table"><caption class="docentes-visually-hidden">Credenciamentos vigentes por departamento de lotação e programa de pós-graduação.</caption><thead><tr><th scope="col">Departamento</th>${programs.map(p=>`<th scope="col"><span>${esc(p.short_name||p.id)}</span><small class="docentes-program-name">${esc(p.name||p.id)}</small>${p.unit_label?`<small class="docentes-program-unit">${esc(p.unit_label)}</small>`:''}${p.interdepartmental?'<small class="docentes-program-kind">Interdepartamental</small>':''}</th>`).join('')}</tr></thead><tbody>${departments.map(d=>`<tr><th scope="row">${esc(d.id)}</th>${programs.map(p=>{const own=(d.own_program_ids||[]).includes(p.id);return `<td${own?' class="docentes-own-program"':''}>${cellHTML(d.program_counts?.[p.id],d,programLabel(p),'Pessoas distintas do departamento com credenciamento vigente neste programa, na data de referência.')}${own?'<small class="docentes-own-label">Associada</small>':''}</td>`;}).join('')}</tr>`).join('')}</tbody></table></div></div></section>`;
  }
  function sourceHTML(source){
    const url=safeURL(source.url);
    const title=esc(source.title||source.id);
    return `<li class="source-row">${url?`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${title} ↗</a>`:`<span>${title}</span>`}<small>${esc(accessLabel(source.access))}</small></li>`;
  }
  function methodsHTML(departments){
    const usedIds=new Set(departments.flatMap(d=>[...Object.values(d.counts||{}),...Object.values(d.program_counts||{})].flatMap(c=>c?.source_ids||[])));
    const usedSources=[...sources.values()].filter(s=>usedIds.has(s.id));
    return `<details class="table-disclosure docentes-methods"><summary>Fontes e critérios</summary><div class="docentes-methods-body"><div class="methods-grid"><article class="method"><h3>Quadro docente</h3><p>${esc(dataset.scope?.roster_label||'Docentes do departamento')}.</p></article><article class="method"><h3>Atuação na pós</h3><p>Credenciamento vigente no Janus na data de referência. Cada docente conta uma vez por programa e por grupo.</p></article><article class="method"><h3>Programas associados</h3><p>${departments.map(d=>`<strong>${esc(d.id)}</strong> · ${esc(ownLabel(d))}`).join('<br>')}</p></article></div><ul class="source-list" aria-label="Fontes dos docentes">${usedSources.map(sourceHTML).join('')}</ul></div></details>`;
  }
  function render(){
    if(!root)return;
    barObserver?.disconnect();
    dataset=window.DOCENTES_DATA;
    if(!dataset||!Array.isArray(dataset.departments)||!dataset.departments.length){
      root.innerHTML='<div class="empty-state"><h2>Dados docentes indisponíveis</h2><p>A base de docentes ainda não está disponível nesta versão do painel. Nenhuma ausência é apresentada como zero.</p></div>';
      return;
    }
    if(!selected)selected=new Set(dataset.departments.map(d=>d.id));
    sources=new Map((dataset.sources||[]).map(s=>[s.id,s]));references=new Map();referenceId=0;
    const focused=document.activeElement?.dataset?.docenteDepartment,departments=activeDepartments();
    root.innerHTML=filterHTML()+(departments.length?`${dataset.scope?.complete===false?`<div class="callout warning"><strong>Cobertura parcial.</strong> ${esc(dataset.scope.description||'As contagens se limitam aos programas efetivamente consultados. Consulte as fontes e os valores ND.')}</div>`:''}${associatedHTML(departments)}${summaryHTML(departments)}${compositionHTML(departments)}${matrixHTML(departments)}${methodsHTML(departments)}<section class="panel indicators-download" aria-label="Download dos dados docentes"><div><h2>Dados desta seleção</h2><p>Quadro docente, credenciamentos por programa, data de referência e fontes no mesmo arquivo.</p></div><button class="button" type="button" data-docente-csv>Baixar tabelas CSV ↓</button></section>`:'<div class="empty-state"><h2>Selecione pelo menos um departamento</h2><button class="button" type="button" data-docente-all>Selecionar todos</button></div>');
    if(focused)root.querySelector('[data-docente-department="'+CSS.escape(focused)+'"]')?.focus({preventScroll:true});
    if(barObserver)root.querySelectorAll('.docentes-composition-bar').forEach(bar=>barObserver.observe(bar));
    window.SIAPOS_FILTERS?.refresh();
  }
  function csvRows(){
    const rows=[['data_referencia','departamento','nome_departamento','indicador','programa','programa_associado','valor','status','escopo','cobertura_completa','criterio','fontes','urls','data_consulta','localizadores','recorte_quadro','cobertura_detalhada','programa_id','unidade_programa','denominador_docentes','percentual_do_departamento','docentes_so_em_outros_programas','percentual_so_em_outros_programas','docentes_sem_credenciamento','percentual_sem_credenciamento']];
    const percentage=(count,total)=>{
      const ratio=departmentShare(count,total);
      return ratio===null?'':Number((100*ratio).toFixed(6));
    };
    const add=(department,key,program,raw,definition,composition)=>{
      const cell=getCell(raw),refs=(cell.source_ids||[]).map(id=>sources.get(id)).filter(Boolean);
      const hasValue=composition?cell.status==='calculated':numeric(cell);
      const associated=key===countLabels.own||(program&&(department.own_program_ids||[]).includes(program.id));
      const total=composition?composition.total:associated&&numeric(department.counts?.total)?department.counts.total.value:null;
      const share=hasValue?percentage(cell.value,total):'';
      const distribution=program&&associated?programComposition(department,program):null;
      const otherOnly=distribution?.values.other_only??'';
      const none=distribution?.values.none??'';
      rows.push([dataset.as_of,department.id,department.name||'',key,program?.name||'',program?(department.own_program_ids||[]).includes(program.id)?'sim':'não':ownLabel(department),hasValue?cell.value:'',hasValue?cell.status:cell.status==='NA'?'NA':'ND',dataset.scope?.label||'',dataset.scope?.complete===true?'sim':dataset.scope?.complete===false?'não':'não informada',[definition,hasValue?'':cell.note].filter(Boolean).join(' '),refs.map(s=>s.title||s.id).join(' | '),refs.map(s=>safeURL(s.url)||'').join(' | '),refs.map(s=>s.retrieved_on||'').join(' | '),refs.map(s=>s.locator||'').join(' | '),dataset.scope?.roster_label||'',dataset.scope?.description||'',program?.id||'',program?.unit_label||'',total??'',share,otherOnly,percentage(otherOnly,total),none,percentage(none,total)]);
    };
    activeDepartments().forEach(d=>{Object.entries(countLabels).forEach(([key,label])=>add(d,label,null,d.counts?.[key],countNotes[key]));(dataset.programs||[]).forEach(p=>add(d,'Credenciamento por programa',p,d.program_counts?.[p.id],'Pessoas distintas com credenciamento vigente no programa.'));});
    for(const department of activeDepartments()){
      const composition=facultyComposition(department);
      for(const category of csvBreakdown){
        const cell={value:composition.values[category.id],status:composition.note?'ND':'calculated',
          note:composition.note,source_ids:composition.sourceIds};
        add(department,category.label,null,cell,category.formula+' Percentual sobre o total do departamento.',composition);
      }
    }
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
    const roster=department.counts?.total;
    const known=numeric(cell),total=numeric(roster)?roster.value:null;
    const share=known&&cell!==roster?departmentShare(cell.value,total):null;
    let reading=cell.status==='NA'?'Não se aplica a este recorte.':'Contagem indisponível.';
    if(known){
      const unit=cell.value===1?'docente':'docentes';
      reading=share===null?unit:`${unit} de um quadro de ${total} (${percent.format(share)}).`;
      if(cell===roster&&dataset.scope?.roster_label)reading+=` · ${dataset.scope.roster_label}`;
    }
    if(cell!==roster&&dataset.scope?.complete===false)reading+=' Cobertura parcial.';
    const shortSources=[...new Set(refs.map(s=>(s.title||s.id).split(' — ')[0]))].join(' e ');
    const context=[department.id,date(dataset.as_of)].filter(Boolean).join(' · ');
    const details=[definition,cell.note,cell!==roster?dataset.scope?.description:''].filter(Boolean);
    dialog.querySelector('#docentes-source-title').textContent=label;
    dialog.querySelector('.docentes-source-content').innerHTML=`<p>${esc(context)}</p>
      <div class="source-value">${esc(format(cell))}</div><p>${esc(reading)}</p>
      <p>${shortSources?esc((refs.length===1?'Fonte · ':'Fontes · ')+shortSources):'Fonte não informada.'}</p>
      <details class="source-more"><summary>Detalhes da fonte</summary>
        ${details.map(note=>`<p>${esc(note)}</p>`).join('')}
        ${refs.length?`<ul class="source-list" aria-label="Fontes da contagem">${refs.map(sourceHTML).join('')}</ul>`:''}
      </details>`;
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
