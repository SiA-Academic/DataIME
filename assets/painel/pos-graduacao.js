(function(){

 'use strict';

 const D=window.PAINEL_DATA,M=window.PAINEL_MATH;

 if(!D||!Array.isArray(D.metrics))return;

 const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];

 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

 const basename=v=>String(v??'').split(/[\\/]/).pop();

 const RD=window.PAINEL_RESTRICTED_DATA||{programs:[],metrics:[],period:[]};

 const programColors=['#245da8','#d27a31','#21877e','#8a61a5','#b38c25','#a65c69','#477b65'];

 function datasetPrograms(dataset){const configured=Array.isArray(dataset.programs)?dataset.programs:[],rows=Array.isArray(dataset.metrics)?dataset.metrics:[],entries=configured.length?configured:[...new Set(rows.map(r=>r.program||r.program_key).filter(Boolean))].map(id=>({id}));return entries.map((p,i)=>{const id=String(p.id||p.program_key||p.code);return {...p,id,name:p.name||p.label||p.short_label||id,color:p.color||programColors[i%programColors.length]};});}

 const programs=datasetPrograms(D),restrictedPrograms=datasetPrograms(RD),programOrder=programs.map(p=>p.id);

 const names=Object.fromEntries(programs.map(p=>[p.id,p.name])),restrictedNames=Object.fromEntries(restrictedPrograms.map(p=>[p.id,p.name]));

 const periodYears=(dataset,rows)=>{const explicit=Array.isArray(dataset.period)?dataset.period:[dataset.period?.start,dataset.period?.end],found=rows.map(r=>Number(r.year)).filter(Number.isFinite),start=Number(explicit[0])||Math.min(...found),end=Number(explicit[1])||Math.max(...found);return Number.isFinite(start)&&Number.isFinite(end)&&start<=end?Array.from({length:end-start+1},(_,i)=>start+i):[];};

 function sourceRegistry(dataset){return new Map((Array.isArray(dataset.sources)?dataset.sources:Object.values(dataset.sources||{})).filter(s=>s.id).map(s=>[s.id,s]));}

 const mainSources=sourceRegistry(D),restrictedSources=sourceRegistry(RD);

 const definitions=D.metric_definitions||D.definitions||D.metrics_definitions||[];

 const defList=Array.isArray(definitions)?definitions:Object.entries(definitions).map(([id,v])=>({id,...v}));

 const defs=new Map(defList.map(d=>[d.id,d]));

 const allowedMainAccess=new Set(D.allowed_access_classes||['public','janus_authenticated']),sourceAdmissionMemo=new Map();

 function sourceAdmittedRecursively(id,stack=new Set()){

  if(sourceAdmissionMemo.has(id))return sourceAdmissionMemo.get(id);

  const source=mainSources.get(id);if(!source||source.admissible_for_main!==true||!allowedMainAccess.has(source.access)||/specific|restric/i.test(String(source.access))||stack.has(id))return false;

  const parents=source.depends_on||[];if(!Array.isArray(parents))return false;

  const next=new Set(stack);next.add(id);const admitted=parents.every(parent=>sourceAdmittedRecursively(typeof parent==='string'?parent:parent?.id,next));sourceAdmissionMemo.set(id,admitted);return admitted;

 }

 const admissionAllowed=r=>{const p=r.provenance,ids=p?.source_ids||[];return p?.admissible_for_main===true&&!/specific|restric/i.test(String(p.access||''))&&Array.isArray(ids)&&ids.length>0&&ids.every(id=>sourceAdmittedRecursively(id));};

 const excludedMetrics=new Set(['active_april1','nominal_class_hours','applications']);
 const records=D.metrics.filter(r=>!excludedMetrics.has(r.metric)&&admissionAllowed(r)).map((r,i)=>({...r,_id:i,program:r.program||r.program_key,level:r.level??null}));

 const restrictedRecords=(RD.metrics||[]).filter(r=>!excludedMetrics.has(r.metric)).map(r=>({...r,_id:null,_restricted:true,program:r.program||r.program_key,level:r.level??null}));

 const restrictedIndex=new Map(restrictedRecords.map(r=>[[r.section,r.metric,r.year,r.program,r.level||''].join('|'),r]));

 const rDefinitions=RD.metric_definitions||RD.definitions||RD.metrics_definitions||[];

 const restrictedDefs=new Map((Array.isArray(rDefinitions)?rDefinitions:Object.entries(rDefinitions).map(([id,v])=>({id,...v}))).map(d=>[d.id,d]));

 const restrictedYears=periodYears(RD,restrictedRecords);



 const index=new Map(records.map(r=>[[r.section,r.metric,r.year,r.program,r.level||''].join('|'),r]));

 const bucketKey=(section,metric,year,level=null)=>[section,metric,year,level||''].join('|');

 const buckets=new Map();records.forEach(r=>{const key=bucketKey(r.section,r.metric,r.year,r.level);if(!buckets.has(key))buckets.set(key,new Map());buckets.get(key).set(r.program,r);});

 const sharedBuckets=new Set([...buckets].filter(([,rows])=>programs.every(p=>{const r=rows.get(p.id);return M.numeric(r)||r?.status==='NA';})&&[...rows.values()].some(M.numeric)).map(([key])=>key));

 const additionalRecords=[]; // Main records are never reclassified as restricted by coverage.

 const additionalYears=new Set();

 const years=periodYears(D,records),periodStart=years[0]??2012,periodEnd=years.at(-1)??periodStart;

 const fullPeriod=periodStart===periodEnd?String(periodStart):periodStart+'–'+periodEnd;

 const unitLabel=D.unit_label||D.unit_name||D.unit?.name||D.unit?.short_name||D.institution?.unit_label||D.institution?.unit_name||'programas configurados';

 const titles={series:['TITULAÇÕES E MATRÍCULAS · 2012–2025','Titulações e matrículas',''],disciplines:['OFERECIMENTO E PARTICIPAÇÃO','Disciplinas e turmas',''],sources:['TRANSPARÊNCIA DOS INDICADORES','Fontes, cobertura e critérios','Cada número conserva sua referência. Ausência de informação não é zero.']};

 titles.restricted=['ARQUIVOS COM PERFIL ESPECÍFICO','Arquivos com acesso específico','Séries anuais de disciplinas da coleção original.'];

 titles.series[0]='TITULAÇÕES E MATRÍCULAS · '+fullPeriod;

 const graduationPanel=window.SIAPOS_GRADUACAO;
 const graduationLinks=$$('#graduation-nav a');
 const graduationTitles=Object.fromEntries(graduationLinks.map(link=>[link.dataset.gradView,link.querySelector('strong').textContent]));
 graduationTitles.additional='Dados complementares';
 graduationTitles.curricula='Currículos';
 const departmentNote=$('#graduation-nav [data-grad-view="department"] small');
 departmentNote.textContent=graduationPanel.hasCommonDepartments&&graduationPanel.departmentDatasetKind!=='course_section_registry'?'Relatórios do Júpiter':'Cadastro de turmas';

 const levels={ME:'Mestrado',DO:'Doutorado',DD:'Doutorado direto',DO_DD:'Doutorado (DO + DD)',total:'Total'};

 const disciplineLabels={courses:'Disciplinas oferecidas',sections:'Turmas',enrollments:'Matrículas em disciplinas',approvals:'Aprovações aproximadas',enrollments_per_section:'Matrículas médias por turma',approval_rate:'Taxa de aprovação aproximada'};

 const requestedLabels={sections:'Número de turmas',enrollments:'Matrículas em disciplinas',sections_lt5:'Turmas com menos de 5 matriculados',sections_5_to_30:'Turmas com 5 a 30 matriculados',sections_gt30:'Turmas com mais de 30 matriculados',degrees:'Diplomados',credits_offered:'Créditos ofertados',curricular_hours:'Carga horária curricular total'};

 const extendedDisciplineMetrics=['credits_offered','curricular_hours','sections_lt5','sections_5_to_30','sections_gt30'];
 const disciplineMetricLabels={...disciplineLabels,...Object.fromEntries(extendedDisciplineMetrics.map(metric=>[metric,requestedLabels[metric]]))};

 const state={view:'series',gradTab:'series',start:periodStart,end:periodEnd,selected:new Set(programOrder),seriesMode:'count',restrictedStart:restrictedYears[0]??periodStart,restrictedEnd:restrictedYears.at(-1)??periodEnd,restrictedSelected:new Set(restrictedPrograms.map(p=>p.id)),restrictedMetric:null};

 let derived=new Map(),nextDerived=0,chartCount=0,exportRows=[],copyText='',toastTimer,postControls='';

 const sourceRef=r=>{const inline=r?.source&&typeof r.source==='object'?r.source:{},id=typeof r?.source==='string'?r.source:r?.source_id||inline.id;return {...((r?._restricted?restrictedSources:mainSources).get(id)||{}),...inline};};

 function rawGet(section,metric,year,program,level=null){return index.get([section,metric,year,program,level||''].join('|'));}

 function originFor(r){

  if(r?._restricted)return 'Janus · perfil específico · arquivo original fornecido';

  if(r?.origin_label)return r.origin_label;

  if(r?.status==='NA')return 'Não se aplica';

  if(r?.status==='ND')return r.coverage_restricted?'Fora da cobertura comum':'Falta obter / não disponível';

  const access=String(r?.provenance?.access||sourceRef(r).access||'');

  if(/specific|restric/.test(access))return 'Janus · perfil específico';

  if(access==='public')return 'Fonte pública';

  if(access.startsWith('mixed'))return 'Mista · fontes públicas e Janus autenticado';

  if(/janus|authentic/.test(access))return 'Janus autenticado · conforme perfil autorizado';

  if(r?.section==='degrees'||r?.metric==='degrees')return 'Pública · DataUSP';

  if(r?.section==='enrollment')return 'Pública · Anuário USP';

  return 'Janus autenticado · conforme perfil autorizado';

 }

 function coverageGap(section,metric,year,program,level,raw=null){

  const exists=M.numeric(raw);return {section,metric,year,program,level,value:null,status:'ND',coverage_restricted:exists,additional_available:false,available_value:exists?raw.value:null,available_status:exists?raw.status:null,provenance:exists?raw.provenance:undefined,source:exists?sourceRef(raw):{},origin_label:exists?'Fora da cobertura comum':'Falta obter / não disponível',semantic_note:exists?'Há um valor obtido por fonte admitida para este programa, mas falta cobertura equivalente dos demais programas configurados neste indicador/ano. Ele não entra na comparação comum e não foi transferido aos arquivos com perfil específico.':'Falta obter um valor documentado deste indicador, ano e programa pelas fontes admitidas. Ausência não é zero.'};

 }

 function get(section,metric,year,program,level=null){const raw=rawGet(section,metric,year,program,level),common=sharedBuckets.has(bucketKey(section,metric,year,level));return common&&raw?raw:coverageGap(section,metric,year,program,level,raw);}

 function metricRecord(section,metric,year,program,level=null){
  if(section==='requested_2024_2025'||(section==='disciplines'&&extendedDisciplineMetrics.includes(metric))){const r=requestedRecord(metric,year,program,level);return {...r,original_section:r.original_section||r.section,section};}
  return get(section,metric,year,program,level);
 }

 function shareMode(){return state.view==='series'&&state.seriesMode==='share';}

 function viewMetric(section,metric,year,program,level=null){

  const numerator=metricRecord(section,metric,year,program,level);if(!shareMode())return numerator;if(numerator.status==='NA')return {...numerator,unit:'ratio'};

  const all=programs.map(p=>metricRecord(section,metric,year,p.id,level)),ratio=M.share(numerator,all);

  return {...numerator,...ratio,_id:null,unit:'ratio',derived_kind:'ime_share',numerator:numerator.value,records:all,n:all.filter(M.numeric).length,expected_n:all.filter(r=>r.status!=='NA').length,semantic_note:'Participação no total de '+unitLabel+', para o mesmo ano, indicador e nível. O filtro de programas não altera esse denominador.'};

 }

 function label(section,metric,level=null){let name=(state.view==='restricted'?restrictedDefs.get(section+'.'+metric):null)?.label||defs.get(section+'.'+metric)?.label||disciplineLabels[metric]||requestedLabels[metric]||metric;return name+(level&&level!=='total'?' · '+(levels[level]||level):'');}

 const selected=()=>programs.filter(p=>state.selected.has(p.id));

 const selectedYears=()=>years.filter(y=>y>=state.start&&y<=state.end);

 const rangeLabel=()=>state.start===state.end?String(state.start):`${state.start}–${state.end}`;

 const isRatio=r=>r?.metric==='approval_rate'||['ratio','proportion','fraction'].includes(r?.unit);

 function number(value,digits=0){return new Intl.NumberFormat('pt-BR',{minimumFractionDigits:digits,maximumFractionDigits:digits}).format(value);}

 function format(r,options={}){

  if(!M.numeric(r))return r?.status==='NA'?'NA':'ND';

  const digits=options.mean?2:isRatio(r)?1:r.metric==='enrollments_per_section'?2:Number.isInteger(r.value)?0:1;

  return (r.status==='approximate'?'≈ ':'')+number(isRatio(r)?r.value*100:r.value,digits)+(isRatio(r)?'%':'');

 }

 function cell(r,mean=false){let id=r._id;if(id==null){id='d'+nextDerived++;derived.set(id,r);}return `<button class="metric-cell ${r.status==='approximate'?'approx':''}" data-source="${esc(id)}" aria-label="${esc(format(r,{mean}))}; consultar origem">${!M.numeric(r)?`<span class="${r.status==='NA'?'na':'nd'}">${r.status==='NA'?'NA':'ND'}</span>`:esc(format(r,{mean}))}</button>`;}

 function average(section,metric,program,level){const rs=selectedYears().map(y=>viewMetric(section,metric,y,program,level));return {...M.average(rs),section,metric,program,level,unit:shareMode()?'ratio':rs[0]?.unit,year:rangeLabel(),derived_kind:'mean',semantic_note:'Média aritmética dos valores anuais disponíveis. Não é a razão entre os totais acumulados. Anos sem informação são excluídos e a cobertura é indicada.'};}


 function empty(message='Selecione pelo menos um programa para visualizar os indicadores.'){return `<div class="empty-state"><h2>Nenhum dado nesta seleção</h2><p>${esc(message)}</p><button class="button" data-action="reset">Restaurar filtros</button></div>`;}

 function legend(ps=selected()){return `<div class="legend">${ps.map(p=>`<span title="${esc(p.name)}"><i class="legend-dot" style="background:${p.color}"></i>${p.id}</span>`).join('')}</div>`;}

 function chart(section,metric,level,title,groupId,jumpId){

  const id='chart-'+(++chartCount), ps=selected(), ys=selectedYears();
  const period=rangeLabel()+(shareMode()?' · % do total dos programas':'');
  const chartDescription=title+' · '+period;

  const records=ps.flatMap(p=>ys.map(year=>viewMetric(section,metric,year,p.id,level)));
  const values=records.filter(M.numeric).map(record=>isRatio(record)?record.value*100:record.value);

  const W=464,H=203;
  const L=51,R=18,T=29,B=43,iw=W-L-R,ih=H-T-B;

  let inner='',trendControl='';

  if(values.length){

   const max=Math.max(...values),rough=(max||1)/4,power=10**Math.floor(Math.log10(rough)),nice=[1,2,2.5,5,10].find(v=>v*power>=rough)*power,top=Math.ceil((max||1)/nice)*nice;

   const y=v=>T+ih-(v/top)*ih;

   let tickDecimals=0;while(tickDecimals<8&&Math.abs(nice*10**tickDecimals-Math.round(nice*10**tickDecimals))>1e-8)tickDecimals++;

   for(let v=0;v<=top+nice/10;v+=nice){inner+=`<line x1="${L}" y1="${y(v)}" x2="${W-R}" y2="${y(v)}" class="chart-gridline"/><text x="${L-9}" y="${y(v)+4}" text-anchor="end" class="chart-text">${number(v,tickDecimals)}${metric==='approval_rate'||shareMode()?'%':''}</text>`;}

   inner+=`<line x1="${L}" y1="${T+ih}" x2="${W-R}" y2="${T+ih}" class="chart-axis"/>`;

    const x=i=>ys.length===1?L+iw/2:L+i*iw/(ys.length-1);

    ys.forEach((year,i)=>{if(ys.length<=8||i%2===0||i===ys.length-1)inner+=`<text x="${x(i)}" y="${H-18}" text-anchor="middle" class="chart-text">${year}</text>`;});

    const trend=window.SIAPOS_TREND;
    let observedLines='',medianCurves='',pointMarks='';
    ps.forEach(p=>{
     let path='',connected=false;
     const annualValues=[];
     ys.forEach((year,i)=>{
      const r=viewMetric(section,metric,year,p.id,level);
      const value=M.numeric(r)?(isRatio(r)?r.value*100:r.value):null;
      annualValues.push(value);
      if(value===null){connected=false;return;}
      const yy=y(value),xx=x(i);
      path+=(connected?'L':'M')+xx+','+yy+' ';
      connected=true;
      let rid=r._id;
      if(rid==null){rid='d'+nextDerived++;derived.set(rid,r);}
      pointMarks+=`<circle cx="${xx}" cy="${yy}" r="3.4" fill="${p.color}" class="chart-point" tabindex="0" role="button" data-source="${esc(rid)}" data-tip="${esc(p.id+' · '+year+'|'+format(r))}" aria-label="${esc(p.name+' '+year+': '+format(r)+'. Consultar fonte.')}"><title>${esc(p.id+' · '+year+': '+format(r))}</title></circle>`;
     });
     observedLines+=`<path data-observed-line d="${path}" stroke="${p.color}" fill="none" stroke-width="2.2" stroke-linejoin="round"/>`;
     if(trend)medianCurves+=trend.series(ys,annualValues,x,y,p.color,p.id);
    });
    if(medianCurves){
     inner+=`<g class="chart-median-layer" pointer-events="none">${medianCurves}${trend.svgKey(W-R)}</g>`;
     trendControl=trend.control(['pos',section,metric,level||''].join('|'),id);
    }
    inner+=observedLines+pointMarks;

  }else inner=`<text x="${W/2}" y="${H/2}" text-anchor="middle" class="chart-text">Sem valores documentados para esta seleção.</text>`;

  const groupAttribute=section==='disciplines'?'data-post-discipline':'data-post-series';
  const headingTarget=jumpId?` id="${esc(jumpId)}" tabindex="-1"`:'';
  return `<article class="panel" data-post-section="${esc(section)}" data-post-metric="${esc(metric)}" data-post-level="${esc(level)}" ${groupAttribute}="${esc(groupId)}"><div class="panel-heading"><div><h2${headingTarget}>${esc(title)}</h2><p>${esc(period)}</p></div><div class="chart-actions">${trendControl}<button class="chart-action" data-export-svg="${id}" aria-label="Baixar SVG: ${esc(chartDescription)}">SVG ↓</button></div></div><div class="chart-container"><svg id="${id}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(chartDescription)}" xmlns="http://www.w3.org/2000/svg"><title>${esc(chartDescription)}</title>${inner}</svg></div>${legend(ps)}</article>`;

 }

 function startTableExport(){

  exportRows=[['Tabela','Indicador','Código do indicador','Seção','Nível','Programa','Ano ou período','Valor','Situação','Unidade','Quantidade disponível','Quantidade esperada','Anos com valor','Anos ND','Anos NA','Origem','Arquivo','Referência','URL','Ressalvas','Fontes de apoio','Composição']];

 }

 function exportTableRecord(table,r,options={}){

  const source=sourceFor(r),parts=r.records||[],support=sourceChain(r),description=options.description??[r.semantic_note||r.note||'',...(r.qualifiers||[])].filter(Boolean).join(' | ');

  const composition=parts.map(part=>({programa:part.program,ano:part.year,valor:part.value??null,situacao:part.status,origem:originFor(part),referencia:sourceCitation(sourceFor(part)),fontes:sourceChain(part).map(item=>({id:item.id,referencia:sourceCitation(item),url:item.url||''}))}));

  exportRows.push([table,options.label||label(r.section,r.metric,r.level),r.metric||'',r.section||'',r.level||'',r.program||'',r.year??'',r.value??'',r.status||'',r.unit||'',r.n??'',r.expected_n??'',options.validYears?.join(', ')||'',options.missingYears?.join(', ')||'',options.naYears?.join(', ')||'',options.origin??originFor(r),basename(source.file||source.filename||source.path),sourceLocator(source),source.url||'',description,support.length?JSON.stringify(support.map(item=>({id:item.id,titulo:item.title||item.label,acesso:item.access,referencia:sourceCitation(item),url:item.url||''}))):'',composition.length?JSON.stringify(composition):'']);

 }

 function exportCoverage(table,rows,ys,metadata){

  const valid=rows.filter(M.numeric).map(r=>r.year),missing=rows.filter(r=>r.status==='ND').map(r=>r.year),na=rows.filter(r=>r.status==='NA').map(r=>r.year);

  exportTableRecord(table,{...metadata,year:yearList(ys),value:valid.length,status:'exact',unit:'years',n:valid.length,expected_n:ys.length,records:rows,semantic_note:'Quantidade de anos com valor numérico no período indicado; ND e NA são discriminados nas colunas próprias.'},{validYears:valid,missingYears:missing,naYears:na,origin:'Cobertura dos registros desta visão'});

 }

 function appendAnnualExport(section,metric,level){

  const ps=selected(),ys=selectedYears();

  for(const p of ps){

   const rows=ys.map(year=>viewMetric(section,metric,year,p.id,level));

   rows.forEach(r=>exportTableRecord('Valores anuais',r));

   exportTableRecord('Médias anuais',average(section,metric,p.id,level));

   exportCoverage('Cobertura anual',rows,ys,{section,metric,program:p.id,level});

  }

 }

 function tableDownloadButton(disabled=false){return `<button class="button secondary" data-action="csv"${disabled?' disabled':''}>Baixar dados (CSV) ↓</button>`;}

 function annualTable(section,metric,level){

  startTableExport();appendAnnualExport(section,metric,level);

  return `<div class="toolbar">${tableDownloadButton()}</div>`;

 }

 function sourceLimits(section){const notes=(D.source_limits||[]).filter(n=>n.section===section&&(!/^20\d\d:/.test(n.text)||(+n.text.slice(0,4)>=state.start&&+n.text.slice(0,4)<=state.end)));return notes.length?`<div class="callout"><strong>Conferência das fontes · ${esc(unitLabel)}</strong>${notes.map(n=>`<p>${esc(n.text)} <span class="mini-note">${esc([n.source?.sheet,n.source?.cell].filter(Boolean).join('!'))}</span></p>`).join('')}</div>`:'';}

 const seriesGroups=[
  {id:'degrees',title:'Titulações',short:'Titulações',section:'degrees',metric:'degrees',levels:['total','ME','DO_DD']},
  {id:'regular',title:'Matrículas regulares',short:'Regulares',section:'enrollment',metric:'regular_enrollment',levels:['total','ME','DO']},
  {id:'special',title:'Matrículas de alunos especiais',short:'Especiais',section:'enrollment',metric:'special_enrollment',levels:[null]}
 ];
 const disciplineShortLabels={courses:'Disciplinas',sections:'Turmas',enrollments:'Matrículas',approvals:'Aprovações',enrollments_per_section:'Matrículas/turma',approval_rate:'Taxa de aprovação',credits_offered:'Créditos',curricular_hours:'Carga curricular',sections_lt5:'Turmas < 5',sections_5_to_30:'Turmas 5–30',sections_gt30:'Turmas > 30'};
 const hasMetricData=(section,metric,level)=>records.some(r=>r.section===section&&r.metric===metric&&r.level===(level??null)&&M.numeric(r));
 function indicatorIndex(items,extra=''){
  return `<nav class="indicator-index" aria-label="Indicadores nesta página">${items.map(item=>`<button data-post-jump="${esc(item.id)}" title="Ir para ${esc(item.title)}">${esc(item.short||item.title)}</button>`).join('')}</nav>${extra}`;
 }
 function enrollmentsPerSectionTable(ps,ys,getRecord){
  const headings=ps.map(p=>`<th scope="col" title="${esc(p.name)}">${esc(p.id)}</th>`).join('');
  const rows=ys.map(year=>{
   const cells=ps.map(p=>`<td>${cell(getRecord('disciplines','enrollments_per_section',year,p.id))}</td>`).join('');
   return `<tr><th scope="row">${esc(year)}</th>${cells}</tr>`;
  }).join('');
  return `<div class="table-wrap"><table class="data-table" data-post-mean-table="enrollments_per_section" aria-label="Matrículas médias por turma por ano e programa"><thead><tr><th scope="col">Ano</th>${headings}</tr></thead><tbody>${rows}</tbody></table></div>`;
 }
 function indicatorsDownload(note=''){
  return `<section class="panel indicators-download"><div><h2>Tabelas para download</h2><p>Todos os dados dos indicadores em um único arquivo · ${selected().length} programa(s) · ${esc(rangeLabel())}.</p>${note?`<p>${esc(note)}</p>`:''}</div>${tableDownloadButton()}</section>`;
 }
 function series(){
  const groups=seriesGroups.map(group=>({...group,levels:group.levels.filter(level=>group.always||hasMetricData(group.section,group.metric,level))})).filter(group=>group.levels.length);
  const mode=`<div class="segmented" aria-label="Unidade de comparação"><button data-series-mode="count" class="${!shareMode()?'active':''}">Contagem</button><button data-series-mode="share" class="${shareMode()?'active':''}" title="Participação no total dos programas configurados">% do total</button></div>`;
  const chartGroups=groups.map(group=>({...group,levels:group.levels.filter(level=>level&&level!=='total')})).filter(group=>group.levels.length);
  postControls=chartGroups.length?indicatorIndex(chartGroups.map(group=>({id:'post-series-'+group.id,title:group.title,short:group.short})),mode):'';
  startTableExport();
  if(!groups.length)return empty('Não há indicadores documentados nesta área.');
  for(const group of groups)for(const level of group.levels)appendAnnualExport(group.section,group.metric,level);
  const charts=chartGroups.flatMap(group=>group.levels.map((level,i)=>
   chart(group.section,group.metric,level,group.title+' · '+levels[level],group.id,i===0?'post-series-'+group.id:null)
  )).join('');
  const totalsOnly=groups.filter(group=>group.levels.every(level=>!level||level==='total'));
  const note=totalsOnly.length?'O CSV traz apenas o total para '+totalsOnly.map(group=>group.title.toLocaleLowerCase('pt-BR')).join(', ')+'.':'';
  return (charts?`<div class="chart-grid charts-first-grid">${charts}</div>`:'')+indicatorsDownload(note);
 }
 function disciplines(){
  const metrics=Object.keys(disciplineMetricLabels).filter(metric=>extendedDisciplineMetrics.includes(metric)||hasMetricData('disciplines',metric,null));
  postControls=metrics.length?indicatorIndex(metrics.map(metric=>({id:'post-disciplines-'+metric,title:disciplineMetricLabels[metric],short:disciplineShortLabels[metric]}))):'';
  startTableExport();
  if(!metrics.length)return empty('Não há indicadores documentados nesta área.');
  for(const metric of metrics)appendAnnualExport('disciplines',metric,null);
  const tableMetric='enrollments_per_section';
  const charts=metrics.filter(metric=>metric!==tableMetric).map(metric=>
   chart('disciplines',metric,null,disciplineMetricLabels[metric],metric,'post-disciplines-'+metric)
  ).join('');
  const table=metrics.includes(tableMetric)?`<section class="post-indicator-section" data-post-discipline="${tableMetric}" aria-labelledby="post-disciplines-${tableMetric}"><div class="section-heading"><h2 id="post-disciplines-${tableMetric}" tabindex="-1">${esc(disciplineMetricLabels[tableMetric])}</h2></div>${enrollmentsPerSectionTable(selected(),selectedYears(),viewMetric)}</section>`:'';
  return (charts?`<div class="chart-grid charts-first-grid">${charts}</div>`:'')+table+indicatorsDownload();
 }

 function yearList(ys){const runs=[];ys.forEach(y=>{const last=runs.at(-1);if(last&&last[1]===y-1)last[1]=y;else runs.push([y,y]);});return runs.map(([a,b])=>a===b?String(a):a+'–'+b).join(', ')||'nenhum';}

 function requestedCandidate(metric,year,program,level=null){return requestedApplicability(metric,year,program,level)||rawGet('requested_2024_2025',metric,year,program,level)||(['degrees','sections','enrollments'].includes(metric)?rawGet(metric==='degrees'?'degrees':'disciplines',metric,year,program,level):null);}

 function requestedApplicability(metric,year,program,level=null){

  const metadata=programs.find(p=>p.id===program),rules=metadata?.not_applicable||[],rule=rules.find(r=>(!r.section||r.section==='requested_2024_2025')&&r.metric===metric&&(r.level??null)===(level??null));

  const original=rawGet('requested_2024_2025',metric,year,program,level);if(M.numeric(original))return null;

  if(rule)return {...(original||{section:'requested_2024_2025',metric,year,program,level,unit:'count'}),_id:null,value:null,status:'NA',applicability_rule:true,source:rule?.source||original?.source||{file:'programas.json',locator:'Regra de aplicabilidade configurada para '+program},origin_label:'Não se aplica · configuração do programa',semantic_note:rule?.note||'O nível não é oferecido por este programa, conforme a configuração de aplicabilidade. Esta linha não é uma lacuna de coleta; valores publicados das outras séries são preservados.'};

  return null;

 }

 function requestedRecord(metric,year,program,level=null){

  const applicability=requestedApplicability(metric,year,program,level);if(applicability)return applicability;

  const raw=requestedCandidate(metric,year,program,level),candidates=programs.map(p=>requestedCandidate(metric,year,p.id,level));

  const common=candidates.every(r=>M.numeric(r)||r?.status==='NA')&&candidates.some(M.numeric);

  if(common&&raw)return {...raw,_id:null,original_section:raw.section,section:'requested_2024_2025',origin_label:originFor(raw),semantic_note:(raw.semantic_note||raw.note||'Valor documentado na fonte indicada.')+(raw.section==='requested_2024_2025'?'':' Reutilizado da série histórica equivalente, com a referência original preservada.')};

  const gap=coverageGap('requested_2024_2025',metric,year,program,level,raw);

  if(!M.numeric(raw))gap.semantic_note=['sections_lt5','sections_5_to_30','sections_gt30'].includes(metric)?'Falta obter a distribuição de matrículas por turma deste ano e programa. Totais, médias e desvios-padrão não determinam os cortes de tamanho.':['credits_offered','curricular_hours'].includes(metric)?'Falta conciliar o histórico de ofertas e seus créditos ou cargas neste recorte. Consulte as pendências em Fontes.':'Falta obter o relatório anual de disciplinas com o mesmo recorte para todos os programas configurados. O valor permanece ND; ausência não é zero.';

  return gap;

 }

 const restrictedParticipationMetrics=['enrollments','approvals'];

 const restrictedParticipationLabel='Matrículas e aprovações em disciplinas';

 function restrictedChoice(){

  const choicesMap=new Map();for(const r of restrictedRecords){const grouped=r.section==='disciplines'&&restrictedParticipationMetrics.includes(r.metric),metric=grouped?'participation':r.metric,id=[r.section,metric,r.level||''].join('|');if(!choicesMap.has(id))choicesMap.set(id,{section:r.section,metric,level:r.level,...(grouped?{metrics:[...restrictedParticipationMetrics],label:restrictedParticipationLabel}:{})});}

  const choices=[...choicesMap.entries()],previous=String(state.restrictedMetric||'').split('|');if(previous[0]==='disciplines'&&restrictedParticipationMetrics.includes(previous[1]))state.restrictedMetric=[previous[0],'participation',previous[2]||''].join('|');

  if(!choicesMap.has(state.restrictedMetric))state.restrictedMetric=choices[0]?.[0]||null;return {choices,choice:choicesMap.get(state.restrictedMetric)};

 }

 function restrictedGet(section,metric,year,program,level=null){return restrictedIndex.get([section,metric,year,program,level||''].join('|'))||{section,metric,year,program,level,value:null,status:'ND',_id:null,_restricted:true,origin_label:'Sem registro neste arquivo original',semantic_note:'Não há valor documentado neste conjunto de arquivos com perfil específico. Nenhuma fonte da análise principal foi usada para preencher esta ausência.'};}

 function restrictedRef(r){const id='d'+nextDerived++;derived.set(id,{...r,_id:null,_restricted:true});return id;}

 function restrictedCombinedChart(choice,ps,ys,sharedMax=null){

  const metrics=choice.metrics||restrictedParticipationMetrics,family=choice.family||'participation',chartLabel=choice.label||restrictedParticipationLabel;
  const styles={enrollments:{dash:'',name:'Matrículas'},approvals:{dash:'7 4',name:'Aprovações',hollow:true},sections:{dash:'',name:'Turmas oferecidas (turmas)'}};
  const series=ps.flatMap(p=>metrics.map(metric=>({p,metric,style:styles[metric]||{dash:'',name:label(choice.section,metric,choice.level)},color:p.color})));
  const values=series.flatMap(s=>ys.map(year=>restrictedGet(choice.section,s.metric,year,s.p.id,choice.level))).filter(M.numeric).map(r=>r.value);

  const W=480,L=54,R=18,T=26,B=35,plotH=157,legendStep=16;
  const legendColumns=Math.min(2,Math.max(1,series.length)),legendRows=Math.ceil(series.length/legendColumns);
  const H=T+plotH+B+legendRows*legendStep+6,iw=W-L-R,max=Number.isFinite(sharedMax)?Math.max(sharedMax,0):Math.max(...values,0),rough=(max||1)/4,power=10**Math.floor(Math.log10(rough)),step=[1,2,2.5,5,10].find(v=>v*power>=rough)*power,top=Math.ceil((max||1)/step)*step,x=i=>ys.length===1?L+iw/2:L+i*iw/(ys.length-1),y=v=>T+plotH-v/top*plotH,id='chart-'+(++chartCount);let svg='',digits=0;

  while(digits<8&&Math.abs(step*10**digits-Math.round(step*10**digits))>1e-8)digits++;

  for(let tick=0;tick<=top+step/10;tick+=step)svg+=`<line x1="${L}" x2="${W-R}" y1="${y(tick)}" y2="${y(tick)}" class="chart-gridline"/><text x="${L-8}" y="${y(tick)+4}" text-anchor="end" class="chart-text">${number(tick,digits)}</text>`;

  ys.forEach((year,i)=>{if(ys.length<=8||i%2===0||i===ys.length-1)svg+=`<text x="${x(i)}" y="${T+plotH+22}" text-anchor="middle" class="chart-text">${year}</text>`;});

  const trend=window.SIAPOS_TREND;
  let observedLines='',medianCurves='',pointMarks='',legendMarkup='',trendControl='';
  series.forEach((s,seriesIndex)=>{
   let path='',connected=false;
   const annualValues=[];
   ys.forEach((year,i)=>{
    const r=restrictedGet(choice.section,s.metric,year,s.p.id,choice.level);
    const value=M.numeric(r)?r.value:null;
    annualValues.push(value);
    if(value===null){connected=false;return;}
    const xx=x(i),yy=y(value);
    path+=(connected?'L':'M')+xx+','+yy+' ';
    connected=true;
    pointMarks+=`<circle cx="${xx}" cy="${yy}" r="3.4" fill="${s.style.hollow?'var(--surface)':s.color}" stroke="${s.color}" stroke-width="1.7" style="stroke:${s.color};stroke-width:1.7" class="chart-point" tabindex="0" role="button" data-source="${restrictedRef(r)}" data-restricted-metric="${esc(s.metric)}" data-restricted-program="${esc(s.p.id)}" data-tip="${esc(s.p.id+' · '+s.style.name+' · '+year+'|'+format(r))}" aria-label="${esc(s.p.name+' · '+s.style.name+' · '+year+': '+format(r)+'. Consultar origem.')}"/>`;
   });
   const dash=s.style.dash?` stroke-dasharray="${s.style.dash}"`:'';
   observedLines+=`<path data-observed-line d="${path}" fill="none" stroke="${s.color}" stroke-width="2.7"${dash} data-restricted-series="${esc(s.p.id+'|'+s.metric)}"/>`;
   if(trend)medianCurves+=trend.series(ys,annualValues,x,y,s.color,s.p.id);
   const lx=L+(seriesIndex%legendColumns)*iw/legendColumns,ly=T+plotH+B+Math.floor(seriesIndex/legendColumns)*legendStep;
   const legendLabel=metrics.length===1?s.p.id:s.p.id+' · '+s.style.name;
   legendMarkup+=`<g data-restricted-legend-series="${esc(s.p.id+'|'+s.metric)}"><line x1="${lx}" x2="${lx+24}" y1="${ly}" y2="${ly}" stroke="${s.color}" stroke-width="2.7"${dash}/><circle cx="${lx+12}" cy="${ly}" r="3.1" fill="${s.style.hollow?'var(--surface)':s.color}" stroke="${s.color}" stroke-width="1.5"/><text x="${lx+32}" y="${ly+4}" class="chart-text"><title>${esc(s.p.name+' · '+s.style.name)}</title>${esc(legendLabel)}</text></g>`;
  });
  if(medianCurves){
   svg+=`<g class="chart-median-layer" pointer-events="none">${medianCurves}${trend.svgKey(W-R)}</g>`;
   trendControl=trend.control(['pos','restricted',choice.section,metrics.join(','),choice.level||''].join('|'),id);
  }
  svg+=observedLines+pointMarks+legendMarkup;

  if(!values.length)svg+=`<text x="${L+iw/2}" y="${T+plotH/2}" text-anchor="middle" class="chart-text">Sem valores documentados nesta seleção.</text>`;

  return `<article class="panel"><div class="panel-heading"><div><h3>${esc(chartLabel)}</h3><p>${esc(ps.map(p=>p.id).join(' · '))} · ${esc(yearList(ys))}</p></div><div class="chart-actions">${trendControl}<button class="chart-action" data-export-svg="${id}">SVG ↓</button></div></div><div class="chart-container"><svg id="${id}" viewBox="0 0 ${W} ${H}" role="img" data-restricted-dashboard-chart ${family==='participation'?'data-restricted-participation-chart':'data-restricted-occupation-chart'} data-restricted-family="${family}" data-restricted-chart-metric="${esc(metrics.join(','))}" data-restricted-chart-program="${esc(ps.map(p=>p.id).join(','))}" data-restricted-scale-max="${top}" aria-label="${esc((ps.length===1?ps[0].name+' · ':'')+chartLabel+' · '+yearList(ys))}" xmlns="http://www.w3.org/2000/svg"><title>${esc(chartLabel)}</title>${svg}</svg></div></article>`;

 }

 function restricted(){

  restrictedChoice();

  const ps=restrictedPrograms.filter(p=>state.restrictedSelected.has(p.id)),ys=restrictedYears.filter(y=>y>=state.restrictedStart&&y<=state.restrictedEnd),allMetrics=['courses','sections','enrollments','approvals','enrollments_per_section','approval_rate'],tableChoices=[...new Map([...allMetrics.map(metric=>({section:'disciplines',metric,level:null})),...restrictedRecords.map(r=>({section:r.section,metric:r.metric,level:r.level}))].map(r=>[[r.section,r.metric,r.level||''].join('|'),r])).values()];

  const yearsSelect=(id,value)=>`<select id="${id}">${restrictedYears.map(y=>`<option value="${y}" ${y===value?'selected':''}>${y}</option>`).join('')}</select>`;

  const filters=`<section class="filters restricted-filters sticky-filters" aria-label="Filtros dos arquivos com perfil específico"><div class="filter-control-row"><div class="filter-options" role="group" aria-label="Programas presentes nestes arquivos"><span class="filter-label">Programas</span>${restrictedPrograms.map(p=>`<label class="program-chip" title="${esc(p.name)}"><input type="checkbox" data-restricted-program="${esc(p.id)}" aria-label="${esc(p.name)}" ${state.restrictedSelected.has(p.id)?'checked':''}><i class="program-dot" style="background:${p.color}"></i><strong>${esc(p.id)}</strong></label>`).join('')}</div><div class="year-controls filter-control-group"><label>De ${yearsSelect('restricted-start',state.restrictedStart)}</label><span>—</span><label>Até ${yearsSelect('restricted-end',state.restrictedEnd)}</label><button class="text-button" data-action="restricted-reset">Restaurar</button></div></div></section>`;

  if(!restrictedRecords.length)return '<div class="empty-state"><h2>Nenhum arquivo deste tipo incorporado</h2></div>';

  const controls=`<div class="toolbar"><span class="note">${restrictedRecords.length} registros agregados · ${esc(restrictedPrograms.map(p=>p.id).join(', '))}</span>${tableDownloadButton(!ps.length||!ys.length)}</div>`;

  if(!ps.length||!ys.length)return filters+'<div class="empty-state"><h2>Selecione programas e anos deste conjunto</h2><button class="button" data-action="restricted-reset">Restaurar esta área</button></div>'+controls;

  startTableExport();

  for(const year of ys)for(const p of ps)for(const choice of tableChoices){

   exportTableRecord('Arquivos com perfil específico',restrictedGet(choice.section,choice.metric,year,p.id,choice.level));

  }

  const charts=[{metric:'enrollments',family:'participation',label:'Matrículas em disciplinas'},{metric:'approvals',family:'participation',label:'Aprovações em disciplinas'},{metric:'sections',family:'occupation',label:'Turmas oferecidas'}],participationMax=Math.max(0,...ps.flatMap(p=>restrictedParticipationMetrics.flatMap(metric=>ys.map(year=>restrictedGet('disciplines',metric,year,p.id)))).filter(M.numeric).map(r=>r.value)),panels=charts.map(chart=>restrictedCombinedChart({section:'disciplines',level:null,...chart,metrics:[chart.metric]},ps,ys,chart.family==='participation'?participationMax:null)).join('');
  const means=`<section class="post-indicator-section" aria-labelledby="restricted-class-size"><div class="section-heading"><h2 id="restricted-class-size">Matrículas médias por turma</h2></div>${enrollmentsPerSectionTable(ps,ys,restrictedGet)}</section>`;

  return filters+`<div class="chart-grid charts-first-grid" data-restricted-dashboard>${panels}</div>`+means+controls;

 }

 function sources(){

  const descriptionFor=s=>[s.description,s.semantic_note,s.note,s.scope].find(value=>typeof value==='string'&&value.trim())||'';

  const sources=Array.isArray(D.sources)?D.sources:Object.values(D.sources||{});

  const collection=D.collection||{},collectionGaps=Array.isArray(collection.gaps)?collection.gaps:[];
  const pendingDetails=(metric,program,missing)=>{
   const reasonByMetric={credits_offered:'credits_and_curricular_hours_history_incomplete',curricular_hours:'credits_and_curricular_hours_history_incomplete',sections_lt5:'individual_section_counts_incomplete',sections_5_to_30:'individual_section_counts_incomplete',sections_gt30:'individual_section_counts_incomplete'},reason=reasonByMetric[metric];
   if(!reason)return '';
   const rows=collectionGaps.filter(g=>g.program===program&&g.reason===reason&&missing.includes(g.year));
   if(!rows.length)return '';
   const describe=g=>{
    if(reason==='credits_and_curricular_hours_history_incomplete')return 'Conciliar as ofertas históricas com o relatório anual'+(g.course_codes?.length?': '+g.course_codes.join(', '):'')+'.';
    return (Number.isFinite(g.missing)?'Falta a contagem individual de matrículas em '+g.missing+' turma(s). ':'')+(g.annual_groups_without_reconciled_history?'Há '+g.annual_groups_without_reconciled_history+' grupo(s) anual(is) com histórico de ofertas ainda não conciliado. ':'')+(g.course_codes?.length?'Disciplinas com contagem pendente: '+g.course_codes.join(', ')+'.':'');
   };
   return `<details class="coverage-pending"><summary>O que falta comprovar</summary>${rows.map(g=>`<p><strong>${esc(g.year)}:</strong> ${esc(describe(g)||'Concluir a comprovação deste recorte.')}</p>`).join('')}</details>`;
  };

  startTableExport();

  for(const source of sources)exportTableRecord('Fontes',{section:'sources',metric:source.id||'',source,status:'',semantic_note:descriptionFor(source)},{label:source.label||source.title||source.id||'Fonte admitida',origin:sourceAccessLabel(source.access)});

  const coverageFamilies=[...seriesGroups.flatMap(group=>group.levels.map(level=>[group.section,group.metric,level])),...Object.keys(disciplineMetricLabels).map(metric=>['disciplines',metric,null])];
  const coverageGroups=coverageFamilies.map(([section,metric,level])=>{
   const perProgram=programs.map(p=>{
    const rows=years.map(year=>metricRecord(section,metric,year,p.id,level));
    exportCoverage('Cobertura das fontes',rows,years,{section,metric,program:p.id,level});
    const valid=rows.filter(M.numeric).map(r=>r.year),na=rows.filter(r=>r.status==='NA').map(r=>r.year),outside=rows.filter(r=>r.coverage_restricted).map(r=>r.year),missing=rows.filter(r=>r.status==='ND'&&!r.coverage_restricted).map(r=>r.year),publicSeries=section==='degrees'||section==='enrollment';
    return `<article data-coverage-program="${esc(p.id)}"><h4>${esc(p.id)} · ${esc(p.name)}</h4><p>Na comparação comum: <strong>${valid.length}/${years.length}</strong> anos · ${esc(yearList(valid))}.</p>${missing.length?`<p><strong>${publicSeries?'Fonte pública ainda não localizada':'Pendente de comprovação ou conciliação'}:</strong> ${esc(yearList(missing))}.</p>${pendingDetails(metric,p.id,missing)}`:''}${outside.length?`<p>Valor individual obtido; falta cobertura comum: ${esc(yearList(outside))}.</p>`:''}${na.length?`<p><strong>Não se aplica (NA):</strong> ${esc(yearList(na))}.</p>`:''}</article>`;
   }).join('');
   return `<details class="table-disclosure" data-coverage-metric="${esc(metric)}" data-coverage-level="${esc(level||'')}"><summary>${esc(label(section,metric,level))}</summary><div class="coverage-program-grid">${perProgram}</div></details>`;
  }).join('');
  const collectedReports=collection.annual_report_years?.length?`<p class="mini-note" data-collected-reports>Relatórios incorporados do Janus autenticado: disciplinas anuais (${esc(yearList(collection.annual_report_years))}) e histórico de ofertas (${esc(yearList(collection.offering_years||[]))}). As ofertas e as contagens individuais são conciliadas com o universo do relatório anual.</p>`:'';
  const coverage=`<section class="coverage-inventory" data-main-coverage><div class="section-heading"><div><h2>Cobertura e lacunas · ${esc(fullPeriod)}</h2><p>Por indicador e programa. ND indica informação insuficiente após a conferência; NA indica que o recorte não se aplica.</p>${collectedReports}</div></div>${coverageGroups}</section>`;

  const sourceRows=sources.map(s=>{
   const title=esc(s.label||s.title||s.id||'Fonte'),url=safeSourceURL(s.url);
   return `<li class="source-row">${url?`<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${title} ↗</a>`:`<span>${title}</span>`}<small>${esc(sourceAccessLabel(s.access))}</small></li>`;
  }).join('');

  return `<div class="toolbar">${tableDownloadButton()}</div>${coverage}<ul class="source-list" aria-label="Fontes da pós-graduação">${sourceRows}</ul><div class="section-heading"><div><h2>Critérios de leitura</h2></div></div><div class="methods-grid"><article class="method"><h3>ND, NA, zero e estimativa</h3><p><strong>ND</strong>: não há informação suficiente na base. <strong>NA</strong>: o indicador não se aplica. <strong>0</strong>: zero documentado. <strong>≈</strong>: valor aproximado, com método indicado. Ausências não são convertidas em zero nem incluídas no denominador das médias.</p></article><article class="method"><h3>Titulações e matrículas</h3><p>Titulações são diplomas concedidos; doutorado agrega DO e DD (doutorado direto). Matrículas regulares são contagens anuais nos programas, separadas dos alunos especiais.</p></article><article class="method"><h3>Disciplinas e participação</h3><p>Matrículas em disciplinas são vínculos com turmas, não pessoas distintas. Produtos de turmas × médias publicadas são aproximações; matrículas e aprovações assim derivadas preservam o arredondamento.</p></article><article class="method"><h3>Participações percentuais</h3><p>Denominador fixo: ${esc(unitLabel)}. Cada percentual usa todos os programas configurados no mesmo ano e nível, mesmo quando alguns estão desmarcados. A média dos percentuais anuais não é a participação nos totais acumulados.</p></article><article class="method"><h3>Médias e taxas</h3><p>O CSV inclui a média aritmética dos indicadores anuais no intervalo selecionado e a quantidade de anos com dados. Matrículas por turma usam a soma dos produtos de turmas × médias dividida pelo número de turmas dentro de cada ano; a taxa de aprovação usa os vínculos aprovados e matriculados.</p></article><article class="method"><h3>Cortes de tamanho das turmas</h3><p>Menos de cinco inclui zero e exclui cinco; a faixa de cinco a trinta inclui os dois limites; mais de trinta exclui trinta. As três faixas particionam o total de turmas e usam contagens por turma. Relatórios gerais por período podem comprovar uma turma; para exatamente duas, o complemento usa a média e uma contagem independente, sob a precisão explicitada. Desvio-padrão e ausência de linha não criam contagens.</p></article><article class="method"><h3>Cobertura e períodos sem dados</h3><p>A comparação usa o mesmo recorte dos programas configurados. As pendências de comprovação ou conciliação são detalhadas por ano e programa nesta página. Valores obtidos fora da interseção comum permanecem identificados como disponíveis individualmente. Arquivos com perfil específico ficam no módulo próprio e não completam automaticamente a base principal.</p></article><article class="method"><h3>Programa e associação histórica</h3><p>Programa não é departamento. A associação histórica de uma oferta depende da fonte do programa ou da área. O prefixo do código não define programa. Quando indicado na origem, a associação aplica ao histórico a área da ficha atual ou o vínculo unívoco nas relações públicas atuais de disciplinas, sob hipótese de manutenção. Essa classificação é indicada como hipótese, sem alegar comprovação da área histórica. Ofertas compartilhadas conservam os vínculos documentados.</p></article></div>${sourceLimits('degrees')}${(D.notes||D.methodology_notes||[]).length?`<details class="table-disclosure"><summary>Observações documentadas na extração</summary><div class="panel" style="padding:18px">${(D.notes||D.methodology_notes||[]).map(n=>`<p class="mini-note" style="margin-bottom:8px">${esc(typeof n==='string'?n:JSON.stringify(n))}</p>`).join('')}</div></details>`:''}`;

 }

 function render(){

  derived=new Map();nextDerived=0;chartCount=0;exportRows=[];postControls='';
  const active=document.activeElement,focusId=active?.id,focusData=[['restricted-program',active?.dataset?.restrictedProgram],['series-mode',active?.dataset?.seriesMode]].find(([,value])=>value);

  const restrictedLink=$('#main-nav [data-view="restricted"]');
  if(restrictedLink){
    restrictedLink.hidden=!restrictedRecords.length;
    restrictedLink.querySelector('small').textContent='Originais fornecidos'+(restrictedPrograms.length?' · '+restrictedPrograms.map(p=>p.id).join('/'):'');
  }
  const graduation=state.view==='graduation';
  const activeTab=graduation?graduationPanel.setTab(state.gradTab):null;
  for(const link of [...$$('#main-nav a'),...graduationLinks]){
    const current=graduation?link.dataset.gradView===activeTab:link.dataset.view===state.view;
    link.classList.toggle('active',current);
    if(current)link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  }

  const area=graduation?'Graduação':'Pós-graduação';
  const t=graduation?['Dados do IME · Graduação',graduationTitles[activeTab],'Indicadores dos cursos de graduação e das disciplinas oferecidas pelo IME-USP.']:titles[state.view];
  $('#page-eyebrow').textContent=t[0];$('#page-eyebrow').hidden=!t[0];$('#page-title').textContent=t[1];$('#page-description').textContent=t[2];$('#page-description').hidden=!t[2];
  document.title=t[1]+' · '+area+' · Dados do IME';

  $('#filters').hidden=graduation||['sources','restricted'].includes(state.view);$('#year-controls').hidden=false;

  $('#filter-caption').textContent=`${selectedYears().length} ano(s) · ${state.selected.size} programa(s)`;

  if(graduation){
    $('#view-content').innerHTML='<div id="grad-root"></div>';
    graduationPanel.mount($('#grad-root'));
  }else{
    $('#view-content').innerHTML=!['sources','restricted'].includes(state.view)&&!state.selected.size?empty():({series,disciplines,restricted,sources})[state.view]();
  }
  $('.page-footer span:first-child').textContent='Dados do IME · IME-USP';
  $('.page-footer span:last-child').textContent=(graduation?'2012–2025':fullPeriod)+' · Fontes e limites acompanham os indicadores';

  $('#post-view-controls').innerHTML=postControls;$('#post-view-controls').hidden=!postControls;
  if(focusId)document.getElementById(focusId)?.focus({preventScroll:true});
  else if(focusData)document.querySelector('[data-'+focusData[0]+'="'+esc(focusData[1])+'"]')?.focus({preventScroll:true});
  window.SIAPOS_FILTERS?.refresh();
  $('#chart-tooltip').hidden=true;

 }

 function sourceFor(record){return sourceRef(record);}

 function sourceAccessLabel(access){const value=String(access||'');return value==='public'?'Pública':/specific|restric/.test(value)?'Janus · perfil específico':value.startsWith('mixed')?'Mista':/authentic|janus/.test(value)?'Janus autenticado':/config|metadata/.test(value)?'Configuração':'Acesso não identificado';}

 const safeSourceURL=url=>/^https?:\/\//i.test(String(url||''))?String(url):null;

 function sourceChain(record){const registry=record._restricted?restrictedSources:mainSources,found=new Map();function visit(id){if(found.has(id))return;const source=registry.get(id);if(!source)return;found.set(id,source);for(const parent of Array.isArray(source.depends_on)?source.depends_on:[])visit(typeof parent==='string'?parent:parent?.id);}for(const id of record.provenance?.source_ids||[])visit(id);return [...found.values()];}



 function sourceLocator(s){return s.kind==='janus_html'||s.locator?String(s.locator||'Relatório Janus'): [s.sheet,s.cell||s.range].filter(Boolean).join('!');}

 function sourceCitation(s){return [basename(s.file||s.filename||s.path),sourceLocator(s)].filter(Boolean).join(' · ');}

 function sourceSummary(record){
  const {status,metric,derived_kind,n,expected_n}=record;
  if(record.coverage_restricted&&typeof record.available_value==='number'){
   const individual=format({...record,value:record.available_value,status:record.available_status||'exact'});
   return `Valor individual de ${individual}, fora da comparação por falta de cobertura comum.`;
  }
  if(derived_kind==='mean'){
   const participation=record.records.some(r=>r.derived_kind==='ime_share');
   return `Média ${participation?'das participações anuais':'anual'} com dados em ${n} de ${expected_n} anos.`;
  }
  if(derived_kind==='ime_share'){
   if(!M.numeric(record))return record.denominator===0?'O total dos programas é zero.':'Faltam dados para calcular a participação no total dos programas.';
   return `${number(record.numerator)} de ${number(record.denominator)} no conjunto dos programas.`;
  }
  if(status==='NA')return record.applicability_rule?'O programa não oferece esse nível.':'O indicador não se aplica a este recorte.';
  if(status==='ND')return 'Sem valor documentado neste recorte.';
  const qualifiers=record.qualifiers||[];
  const rounded=qualifiers.some(q=>/arredondamento da média|média publicada.*arredondamento/i.test(q));
  const notes=[];
  if(metric==='enrollments_per_section')notes.push('Matrículas divididas pelo número de turmas.');
  if(metric==='enrollments')notes.push('Cada matrícula é um vínculo com uma turma.');
  if(metric==='approval_rate')notes.push('Aprovações divididas pelas matrículas em disciplinas.');
  if(rounded||(record._restricted&&status==='approximate'))notes.push('Cálculo com médias publicadas arredondadas.');
  else if(status==='approximate')notes.push('Valor estimado.');
  if(qualifiers.some(q=>/manutenção (?:da área|do vínculo)/i.test(q)))notes.push('O programa da oferta histórica foi inferido pelo vínculo atual da disciplina.');
  return notes.join(' ');
 }

 function showSource(record){
  if(!record)return;
  const s=sourceFor(record),der=record.records||[],name=label(record.section,record.metric,record.level);
  const program=(record._restricted?restrictedNames:names)[record.program]||record.program;
  const context=[program,record.year].filter(Boolean).join(' · ');
  const value=format(record,{mean:record.derived_kind==='mean'});
  const unit=M.numeric(record)?({hours:' h',credits:' créditos'}[record.unit]||''):'';
  const note=record.semantic_note||record.note||defs.get(record.section+'.'+record.metric)?.semantic_note;
  const summary=sourceSummary(record);
  const sourceName=source=>String(source.title||source.label||basename(source.file||source.filename||source.path)).replace(/ · \d{4}-\d\d-\d\d a \d{4}-\d\d-\d\d$/,'');
  const sources=der.length?der.filter(M.numeric).map(sourceFor):[s];
  const titles=[...new Set(sources.map(sourceName).filter(Boolean))];
  const urls=[...new Set(sources.map(part=>safeSourceURL(part.url)))];
  const sourceLabel=record._restricted&&titles.length?'Janus · relatório com perfil específico':titles.length===1?titles[0]:titles.length?'Fontes dos valores que compõem o cálculo':'';
  const href=titles.length===1&&urls.length===1?urls[0]:null;

  let content=`<p>${esc(context)}</p><div class="source-value">${esc(value+unit)}</div>`;
  if(summary)content+=`<p>${esc(summary)}</p>`;
  if(sourceLabel)content+=`<p>Fonte · ${href?`<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(sourceLabel)} ↗</a>`:esc(sourceLabel)}</p>`;

  let details=note?`<p>${esc(note)}</p>`:'';
  for(const q of record.qualifiers||[])details+=`<p>${esc(q)}</p>`;
  if(der.length){
   const byYear=record.derived_kind==='mean';
   const rows=der.map(r=>{
    const source=sourceFor(r),url=safeSourceURL(source.url),citation=sourceCitation(source);
    return `<tr><td>${esc(byYear?r.year:r.program)}</td><td>${esc(format(r))}</td><td>${url?`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(citation||sourceName(source))} ↗</a>`:esc(citation)}</td></tr>`;
   });
   details+=`<div class="table-wrap"><table class="data-table"><thead><tr><th>${byYear?'Ano':'Programa'}</th><th>Valor</th><th>Referência</th></tr></thead><tbody>${rows.join('')}</tbody></table></div>`;
  }else{
   const reference=sourceCitation(s);
   const fields=[['Origem',originFor(record)],['Referência',reference],['Unidade',record.unit||defs.get(record.section+'.'+record.metric)?.unit]];
   details+=`<dl class="source-details">${fields.filter(([,v])=>v).map(([k,v])=>`<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>`;
  }
  const chain=sourceChain(record);
  if(chain.length)details+=`<div class="table-wrap"><table class="data-table"><caption>Fontes de apoio</caption><thead><tr><th>Fonte</th><th>Acesso</th><th>Referência</th></tr></thead><tbody>${chain.map(c=>`<tr><td>${safeSourceURL(c.url)?`<a href="${esc(c.url)}" target="_blank" rel="noopener noreferrer">${esc(c.title||c.label||c.id)} ↗</a>`:esc(c.title||c.label||c.id)}</td><td>${esc(sourceAccessLabel(c.access))}</td><td>${esc(sourceCitation(c))}</td></tr>`).join('')}</tbody></table></div>`;
  if(s.course_codes?.length)details+=`<p><strong>Disciplinas incluídas</strong> · ${esc(s.course_codes.join(', '))}</p>`;
  if(s.classification_sources?.length)details+=`<p><strong>Fontes da associação aos programas</strong></p>${s.classification_sources.map(c=>`<p>${esc(typeof c==='string'?c:JSON.stringify(c))}</p>`).join('')}`;
  if(details)content+=`<details class="source-more"><summary>Detalhes da fonte</summary>${details}</details>`;
  $('#source-title').textContent=name;
  $('#source-content').innerHTML=content;
  copyText=[name,originFor(record),record.program,record.year,value+unit,summary,record.semantic_note||record.note||'',...(record.qualifiers||[]),der.length?der.map(r=>`${r.year} ${r.program}: ${format(r)}; ${sourceCitation(sourceFor(r))}`).join('\n'):sourceCitation(s),s.classification_sources?.length?JSON.stringify(s.classification_sources):''].filter(v=>v!=null&&v!=='').join('\n');
  $('#source-dialog').showModal();
 }

 function notify(message){const el=$('#toast');el.textContent=message;el.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.hidden=true,2600);}

 function download(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}

 function exportSVG(id){const src=document.getElementById(id),svg=src.cloneNode(true),original=[src,...src.querySelectorAll('*')],clones=[svg,...svg.querySelectorAll('*')];original.forEach((el,i)=>{const cs=getComputedStyle(el);['fill','stroke','font-family','font-size','font-weight','display','opacity'].forEach(k=>clones[i].style.setProperty(k,cs.getPropertyValue(k)));clones[i].removeAttribute('tabindex');clones[i].removeAttribute('data-source');clones[i].removeAttribute('data-tip');});download(new Blob([new XMLSerializer().serializeToString(svg)],{type:'image/svg+xml;charset=utf-8'}),`dados-ime-pos-${state.view}-${state.view==='restricted'?state.restrictedStart+'-'+state.restrictedEnd:rangeLabel()}-${id}.svg`);}

 function exportCSV(){const csv=exportRows.map(row=>row.map(v=>'"'+(typeof v==='number'?String(v).replace('.',','):String(v??'')).replace(/"/g,'""')+'"').join(';')).join('\r\n');download(new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'}),`dados-ime-pos-${state.view}-${state.view==='restricted'?state.restrictedStart+'-'+state.restrictedEnd:state.view==='sources'?fullPeriod:rangeLabel()}.csv`);}

 function reset(){state.start=periodStart;state.end=periodEnd;state.selected=new Set(programOrder);$('#start-year').value=state.start;$('#end-year').value=state.end;$$('#program-filters input').forEach(x=>x.checked=true);render();}

 $('#program-filters').innerHTML=programs.map(p=>`<label class="program-chip" title="${esc(p.name)}"><input type="checkbox" value="${p.id}" aria-label="${esc(p.name)}" checked><span class="program-dot" style="background:${p.color}"></span><strong>${p.id}</strong><span class="full-name">${esc(p.name)}</span></label>`).join('');

 ['start-year','end-year'].forEach(id=>$('#'+id).innerHTML=years.map(y=>`<option value="${y}">${y}</option>`).join(''));$('#start-year').value=state.start;$('#end-year').value=state.end;

 $('#program-filters').addEventListener('change',e=>{if(e.target.checked)state.selected.add(e.target.value);else state.selected.delete(e.target.value);render();});

 $('#select-all').addEventListener('click',()=>{state.selected=new Set(programOrder);$$('#program-filters input').forEach(x=>x.checked=true);render();});

 $('#start-year').addEventListener('change',e=>{state.start=+e.target.value;if(state.start>state.end){state.end=state.start;$('#end-year').value=state.end;}render();});

 $('#end-year').addEventListener('change',e=>{state.end=+e.target.value;if(state.end<state.start){state.start=state.end;$('#start-year').value=state.start;}render();});

 $('#reset-filters').addEventListener('click',reset);

 document.addEventListener('click',e=>{const a=e.target.closest('[data-source]');if(a){const key=a.dataset.source;showSource(key[0]==='d'?derived.get(key):records[+key]);return;}const svg=e.target.closest('[data-export-svg]');if(svg){exportSVG(svg.dataset.exportSvg);return;}const jump=e.target.closest('[data-post-jump]');if(jump){const heading=document.getElementById(jump.dataset.postJump),bar=$('#filters');if(heading){heading.style.scrollMarginTop=((bar?.getBoundingClientRect().height||0)+16)+'px';heading.scrollIntoView({block:'start'});heading.focus({preventScroll:true});}return;}const mode=e.target.closest('[data-series-mode]');if(mode){state.seriesMode=mode.dataset.seriesMode;render();return;}const action=e.target.closest('[data-action]')?.dataset.action;if(action==='restricted-reset'){state.restrictedStart=restrictedYears[0]??periodStart;state.restrictedEnd=restrictedYears.at(-1)??periodEnd;state.restrictedSelected=new Set(restrictedPrograms.map(p=>p.id));render();}if(action==='reset')reset();if(action==='csv')exportCSV();});

 document.addEventListener('change',e=>{if(e.target.id==='restricted-metric'){state.restrictedMetric=e.target.value;render();}if(e.target.id==='restricted-start'){state.restrictedStart=+e.target.value;if(state.restrictedStart>state.restrictedEnd)state.restrictedEnd=state.restrictedStart;render();}if(e.target.id==='restricted-end'){state.restrictedEnd=+e.target.value;if(state.restrictedEnd<state.restrictedStart)state.restrictedStart=state.restrictedEnd;render();}if(e.target.dataset.restrictedProgram){if(e.target.checked)state.restrictedSelected.add(e.target.dataset.restrictedProgram);else state.restrictedSelected.delete(e.target.dataset.restrictedProgram);render();}});

 document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('svg [data-source]')){e.preventDefault();e.target.dispatchEvent(new MouseEvent('click',{bubbles:true}));}});

 const close=()=>$('#source-dialog').close();$('#close-dialog').addEventListener('click',close);$('#done-dialog').addEventListener('click',close);$('#source-dialog').addEventListener('click',e=>{if(e.target===$('#source-dialog')){const b=e.target.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)close();}});

 $('#copy-source').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(copyText);notify('Referência copiada.');}catch{const t=document.createElement('textarea');t.value=copyText;$('#source-dialog').appendChild(t);t.select();const ok=document.execCommand('copy');t.remove();notify(ok?'Referência copiada.':'Selecione e copie a referência exibida.');}});

 function viewFromHash(){
  const value=location.hash.slice(1);
  const [area,tab]=value.split('/');
  const route=value==='requested'?'disciplines':value==='additional'?'restricted':value;
  if(area==='graduation'){
   state.view='graduation';
   state.gradTab=tab==='mac-adicional'&&!graduationPanel.hasCommonDepartments?'department':tab||'series';
  }else{
   state.view=Object.hasOwn(titles,route)?route:'series';
  }
  render();
 }
 window.addEventListener('hashchange',viewFromHash);
 viewFromHash();

})();
