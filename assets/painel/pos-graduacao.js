(function(){

 'use strict';

 const D=window.PAINEL_DATA,M=window.PAINEL_MATH;

 if(!D||!Array.isArray(D.metrics))return;

 const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];

 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

 const basename=v=>String(v??'').split(/[\\/]/).pop();

 const programColors=['#245da8','#d27a31','#21877e','#8a61a5','#b38c25','#a65c69','#477b65'];

 function datasetPrograms(dataset){const configured=Array.isArray(dataset.programs)?dataset.programs:[],rows=Array.isArray(dataset.metrics)?dataset.metrics:[],entries=configured.length?configured:[...new Set(rows.map(r=>r.program||r.program_key).filter(Boolean))].map(id=>({id}));return entries.map((p,i)=>{const id=String(p.id||p.program_key||p.code);return {...p,id,name:p.name||p.label||p.short_label||id,color:p.color||programColors[i%programColors.length]};});}

 const programs=datasetPrograms(D);

 const names=Object.fromEntries(programs.map(p=>[p.id,p.name]));

 const periodYears=(dataset,rows)=>{const explicit=Array.isArray(dataset.period)?dataset.period:[dataset.period?.start,dataset.period?.end],found=rows.map(r=>Number(r.year)).filter(Number.isFinite),start=Number(explicit[0])||Math.min(...found),end=Number(explicit[1])||Math.max(...found);return Number.isFinite(start)&&Number.isFinite(end)&&start<=end?Array.from({length:end-start+1},(_,i)=>start+i):[];};

 function sourceRegistry(dataset){return new Map((Array.isArray(dataset.sources)?dataset.sources:Object.values(dataset.sources||{})).filter(s=>s.id).map(s=>[s.id,s]));}

 const mainSources=sourceRegistry(D);

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

 const index=new Map(records.map(r=>[[r.section,r.metric,r.year,r.program,r.level||''].join('|'),r]));

 const bucketKey=(section,metric,year,level=null)=>[section,metric,year,level||''].join('|');

 const buckets=new Map();records.forEach(r=>{const key=bucketKey(r.section,r.metric,r.year,r.level);if(!buckets.has(key))buckets.set(key,new Map());buckets.get(key).set(r.program,r);});

 const sharedBuckets=new Set([...buckets].filter(([,rows])=>programs.every(p=>{const r=rows.get(p.id);return M.numeric(r)||r?.status==='NA';})&&[...rows.values()].some(M.numeric)).map(([key])=>key));

 const years=periodYears(D,records),periodStart=years[0]??2012,periodEnd=years.at(-1)??periodStart;

 const fullPeriod=periodStart===periodEnd?String(periodStart):periodStart+'–'+periodEnd;

 const unitLabel=D.unit_label||D.unit_name||D.unit?.name||D.unit?.short_name||D.institution?.unit_label||D.institution?.unit_name||'programas configurados';

 const titles={series:['TITULAÇÕES E MATRÍCULAS · 2012–2025','Titulações e matrículas',''],disciplines:['OFERECIMENTO E PARTICIPAÇÃO','Disciplinas e turmas',''],sources:['TRANSPARÊNCIA DOS INDICADORES','Fontes, cobertura e critérios','Cada número conserva sua referência. Ausência de informação não é zero.']};

 titles.series[0]='TITULAÇÕES E MATRÍCULAS · '+fullPeriod;

 const graduationPanel=window.SIAPOS_GRADUACAO;
 const graduationLinks=$$('#graduation-nav a');
 const graduationTitles=Object.fromEntries(graduationLinks.map(link=>[link.dataset.gradView,link.querySelector('strong').textContent]));
 graduationTitles.additional='Dados complementares';
 graduationTitles.curricula='Currículos';

 const levels={ME:'Mestrado',DO:'Doutorado',DD:'Doutorado direto',DO_DD:'Doutorado (DO + DD)',total:'Total'};

 const disciplineLabels={courses:'Disciplinas oferecidas',sections:'Turmas',enrollments:'Matrículas em disciplinas',approvals:'Aprovações aproximadas',enrollments_per_section:'Matrículas médias por turma',approval_rate:'Taxa de aprovação aproximada'};

 const requestedLabels={sections:'Número de turmas',enrollments:'Matrículas em disciplinas',sections_lt5:'Turmas com menos de 5 alunos',sections_5_to_30:'Turmas com 5 a 30 alunos',sections_gt30:'Turmas com mais de 30 alunos',degrees:'Diplomados',credits_offered:'Créditos ofertados',curricular_hours:'Carga horária curricular total'};

 const sectionSizeMetrics=['sections_lt5','sections_5_to_30','sections_gt30'];
 const extendedDisciplineMetrics=['credits_offered','curricular_hours',...sectionSizeMetrics];
 const disciplineMetricLabels={...disciplineLabels,...Object.fromEntries(extendedDisciplineMetrics.map(metric=>[metric,requestedLabels[metric]]))};

 const state={view:'series',gradTab:'series'};

 let derived=new Map(),nextDerived=0,chartCount=0,exportRows=[],copyText='',toastTimer;

 const sourceRef=r=>{const inline=r?.source&&typeof r.source==='object'?r.source:{},id=typeof r?.source==='string'?r.source:r?.source_id||inline.id;return {...(mainSources.get(id)||{}),...inline};};

 function rawGet(section,metric,year,program,level=null){return index.get([section,metric,year,program,level||''].join('|'));}

 function originFor(r){

  if(r?.origin_label)return r.origin_label;

  if(r?.status==='NA')return 'Não se aplica';

  if(r?.status==='ND')return r.coverage_restricted?'Fora da cobertura comum':'Falta obter / não disponível';

  const access=String(r?.provenance?.access||sourceRef(r).access||'');

  if(access==='public')return 'Fonte pública';

  if(access.startsWith('mixed'))return 'Mista · fontes públicas e Janus autenticado';

  if(/janus|authentic/.test(access))return 'Janus autenticado · conforme perfil autorizado';

  if(r?.section==='degrees'||r?.metric==='degrees')return 'Pública · DataUSP';

  if(r?.section==='enrollment')return 'Pública · Anuário USP';

  return 'Janus autenticado · conforme perfil autorizado';

 }

 function coverageGap(section,metric,year,program,level,raw=null){

  const exists=M.numeric(raw);return {section,metric,year,program,level,value:null,status:'ND',coverage_restricted:exists,available_value:exists?raw.value:null,available_status:exists?raw.status:null,provenance:exists?raw.provenance:undefined,source:exists?sourceRef(raw):{},origin_label:exists?'Fora da cobertura comum':'Falta obter / não disponível',semantic_note:exists?'Há um valor obtido por fonte admitida para este programa, mas falta cobertura equivalente dos demais programas configurados neste indicador/ano. Ele não entra na comparação comum.':'Falta obter um valor documentado deste indicador, ano e programa pelas fontes admitidas. Ausência não é zero.'};

 }

 function get(section,metric,year,program,level=null){const raw=rawGet(section,metric,year,program,level),common=sharedBuckets.has(bucketKey(section,metric,year,level));return common&&raw?raw:coverageGap(section,metric,year,program,level,raw);}

 function metricRecord(section,metric,year,program,level=null){
  if(section==='requested_2024_2025'||(section==='disciplines'&&extendedDisciplineMetrics.includes(metric))){const r=requestedRecord(metric,year,program,level);return {...r,original_section:r.original_section||r.section,section};}
  return get(section,metric,year,program,level);
 }

 function label(section,metric,level=null){let name=defs.get(section+'.'+metric)?.label||disciplineLabels[metric]||requestedLabels[metric]||metric;return name+(level&&level!=='total'?' · '+(levels[level]||level):'');}

 const isRatio=r=>r?.metric==='approval_rate'||['ratio','proportion','fraction'].includes(r?.unit);

 function number(value,digits=0){return new Intl.NumberFormat('pt-BR',{minimumFractionDigits:digits,maximumFractionDigits:digits}).format(value);}

 function format(r,options={}){

  if(!M.numeric(r))return r?.status==='NA'?'NA':'ND';

  const digits=options.mean?2:isRatio(r)?1:r.metric==='enrollments_per_section'?2:Number.isInteger(r.value)?0:1;

  return (r.status==='approximate'?'≈ ':'')+number(isRatio(r)?r.value*100:r.value,digits)+(isRatio(r)?'%':'');

 }

 function empty(message){return `<div class="empty-state"><h2>${esc(message)}</h2></div>`;}

 function legend(ps){return `<div class="legend">${ps.map(p=>`<span title="${esc(p.name)}"><i class="legend-dot" style="background:${p.color}"></i>${p.id}</span>`).join('')}</div>`;}

 function chart(section,metric,level,title,groupId){

  const id='chart-'+(++chartCount), ps=programs, ys=years;
  const period=fullPeriod;
  const chartDescription=title+' · '+period;

  const records=ps.flatMap(p=>ys.map(year=>metricRecord(section,metric,year,p.id,level)));
  const values=records.filter(M.numeric).map(record=>isRatio(record)?record.value*100:record.value);

  const W=464,H=203;
  const L=51,R=18,T=29,B=43,iw=W-L-R,ih=H-T-B;

  let inner='',trendControl='';

  if(values.length){

   const max=Math.max(...values),rough=(max||1)/4,power=10**Math.floor(Math.log10(rough)),nice=[1,2,2.5,5,10].find(v=>v*power>=rough)*power,top=Math.ceil((max||1)/nice)*nice;

   const y=v=>T+ih-(v/top)*ih;

   let tickDecimals=0;while(tickDecimals<8&&Math.abs(nice*10**tickDecimals-Math.round(nice*10**tickDecimals))>1e-8)tickDecimals++;

   for(let v=0;v<=top+nice/10;v+=nice){inner+=`<line x1="${L}" y1="${y(v)}" x2="${W-R}" y2="${y(v)}" class="chart-gridline"/><text x="${L-9}" y="${y(v)+4}" text-anchor="end" class="chart-text">${number(v,tickDecimals)}${metric==='approval_rate'?'%':''}</text>`;}

   inner+=`<line x1="${L}" y1="${T+ih}" x2="${W-R}" y2="${T+ih}" class="chart-axis"/>`;

    const x=i=>ys.length===1?L+iw/2:L+i*iw/(ys.length-1);

    ys.forEach((year,i)=>{if(ys.length<=8||i%2===0||i===ys.length-1)inner+=`<text x="${x(i)}" y="${H-18}" text-anchor="middle" class="chart-text">${year}</text>`;});

    const trend=window.SIAPOS_TREND;
    let observedLines='',medianCurves='',pointMarks='';
    ps.forEach(p=>{
     let path='',connected=false;
     const annualValues=[];
     ys.forEach((year,i)=>{
      const r=metricRecord(section,metric,year,p.id,level);
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
  return `<article class="panel" data-post-section="${esc(section)}" data-post-metric="${esc(metric)}" data-post-level="${esc(level)}" ${groupAttribute}="${esc(groupId)}"><div class="panel-heading"><div><h2>${esc(title)}</h2><p>${esc(period)}</p></div><div class="chart-actions">${trendControl}<button class="chart-action" data-export-svg="${id}" aria-label="Baixar SVG: ${esc(chartDescription)}">SVG ↓</button></div></div><div class="chart-container"><svg id="${id}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(chartDescription)}" xmlns="http://www.w3.org/2000/svg"><title>${esc(chartDescription)}</title>${inner}</svg></div>${legend(ps)}</article>`;

 }

 function startTableExport(){

  exportRows=[['Tabela','Indicador','Código do indicador','Seção','Nível','Programa','Ano ou período','Valor','Situação','Unidade','Quantidade disponível','Quantidade esperada','Anos com valor','Anos ND','Anos NA','Origem','Arquivo','Referência','URL','Ressalvas','Fontes de apoio','Composição']];
  if(state.view==='series')exportRows[0].push('Participação no total dos programas (%)','Situação da participação','Total dos programas no ano','Anos com participação calculável');

 }

 function exportTableRecord(table,r,options={}){

  const source=sourceFor(r),parts=r.records||[],support=sourceChain(r),description=options.description??[r.semantic_note||r.note||'',...(r.qualifiers||[])].filter(Boolean).join(' | ');

  const composition=parts.map(part=>({programa:part.program,ano:part.year,valor:part.value??null,situacao:part.status,origem:originFor(part),referencia:sourceCitation(sourceFor(part)),fontes:sourceChain(part).map(item=>({id:item.id,referencia:sourceCitation(item),url:item.url||''}))}));

  const cells=[table,options.label||label(r.section,r.metric,r.level),r.metric||'',r.section||'',r.level||'',r.program||'',r.year??'',r.value??'',r.status||'',r.unit||'',r.n??'',r.expected_n??'',options.validYears?.join(', ')||'',options.missingYears?.join(', ')||'',options.naYears?.join(', ')||'',options.origin??originFor(r),basename(source.file||source.filename||source.path),sourceLocator(source),source.url||'',description,support.length?JSON.stringify(support.map(item=>({id:item.id,titulo:item.title||item.label,acesso:item.access,referencia:sourceCitation(item),url:item.url||''}))):'',composition.length?JSON.stringify(composition):''];
  if(state.view==='series'){
   const share=options.share;
   cells.push(M.numeric(share)?100*share.value:'',share?.status??'',share?.denominator??'',share?.n??'');
  }
  exportRows.push(cells);

 }

 function exportCoverage(table,rows,ys,metadata){

  const valid=rows.filter(M.numeric).map(r=>r.year),missing=rows.filter(r=>r.status==='ND').map(r=>r.year),na=rows.filter(r=>r.status==='NA').map(r=>r.year);

  exportTableRecord(table,{...metadata,year:yearList(ys),value:valid.length,status:'exact',unit:'years',n:valid.length,expected_n:ys.length,records:rows,semantic_note:'Quantidade de anos com valor numérico no período indicado; ND e NA são discriminados nas colunas próprias.'},{validYears:valid,missingYears:missing,naYears:na,origin:'Cobertura dos registros desta visão'});

 }

 function appendAnnualExport(section,metric,level){

  const ps=programs,ys=years;

  for(const p of ps){

   const rows=ys.map(year=>metricRecord(section,metric,year,p.id,level));

   const shares=state.view==='series'?rows.map(row=>{
    if(row.status==='NA')return {value:null,status:'NA'};
    return M.share(row,programs.map(program=>metricRecord(section,metric,row.year,program.id,level)));
   }):null;
   rows.forEach((row,index)=>exportTableRecord('Valores anuais',row,{share:shares?.[index]}));

   const annualMean={...M.average(rows),section,metric,program:p.id,level,unit:rows[0]?.unit,year:fullPeriod,derived_kind:'mean',semantic_note:'Média aritmética dos valores anuais disponíveis. Não é a razão entre os totais acumulados. Anos sem informação são excluídos e a cobertura é indicada.'};
   exportTableRecord('Médias anuais',annualMean,{share:shares?M.average(shares):null});

   exportCoverage('Cobertura anual',rows,ys,{section,metric,program:p.id,level});

  }

 }

 function tableDownloadButton(disabled=false){return `<button class="button secondary" data-action="csv"${disabled?' disabled':''}>Baixar dados (CSV) ↓</button>`;}

 function sourceLimits(section){const notes=(D.source_limits||[]).filter(n=>n.section===section&&(!/^20\d\d:/.test(n.text)||(+n.text.slice(0,4)>=periodStart&&+n.text.slice(0,4)<=periodEnd)));return notes.length?`<div class="callout"><strong>Conferência das fontes · ${esc(unitLabel)}</strong>${notes.map(n=>`<p>${esc(n.text)} <span class="mini-note">${esc([n.source?.sheet,n.source?.cell].filter(Boolean).join('!'))}</span></p>`).join('')}</div>`:'';}

 const seriesGroups=[
  {id:'degrees',title:'Titulações',section:'degrees',metric:'degrees',levels:['total','ME','DO_DD']},
  {id:'regular',title:'Matrículas regulares',section:'enrollment',metric:'regular_enrollment',levels:['total','ME','DO']},
  {id:'special',title:'Matrículas de alunos especiais',section:'enrollment',metric:'special_enrollment',levels:[null]}
 ];
 const hasMetricData=(section,metric,level)=>records.some(r=>r.section===section&&r.metric===metric&&r.level===(level??null)&&M.numeric(r));
 function indicatorsDownload(note=''){
  return `<section class="panel indicators-download"><div><h2>Tabelas para download</h2><p>Todos os dados dos indicadores em um único arquivo · ${programs.length} programa(s) · ${esc(fullPeriod)}.</p>${note?`<p>${esc(note)}</p>`:''}</div>${tableDownloadButton()}</section>`;
 }
 function series(){
  const groups=seriesGroups.map(group=>({...group,levels:group.levels.filter(level=>hasMetricData(group.section,group.metric,level))})).filter(group=>group.levels.length);
  const chartGroups=groups.map(group=>({...group,levels:group.levels.filter(level=>level&&level!=='total')})).filter(group=>group.levels.length);
  startTableExport();
  if(!groups.length)return empty('Não há indicadores documentados nesta área.');
  for(const group of groups)for(const level of group.levels)appendAnnualExport(group.section,group.metric,level);
  const charts=chartGroups.flatMap(group=>group.levels.map(level=>
   chart(group.section,group.metric,level,group.title+' · '+levels[level],group.id)
  ));
  const totalsOnly=groups.filter(group=>group.levels.every(level=>!level||level==='total'));
  const note=totalsOnly.length?'O CSV traz apenas o total para '+totalsOnly.map(group=>group.title.toLocaleLowerCase('pt-BR')).join(', ')+'.':'';
  return (charts.length?`<div class="chart-grid charts-first-grid">${window.SIAPOS_CHARTS.rows(charts)}</div>`:'')+indicatorsDownload(note);
 }
 function disciplines(){
  const metrics=Object.keys(disciplineMetricLabels).filter(metric=>extendedDisciplineMetrics.includes(metric)||hasMetricData('disciplines',metric,null));
  const chartMetrics=metrics.filter(metric=>metric!=='enrollments_per_section'&&metric!=='approvals');
  startTableExport();
  if(!metrics.length)return empty('Não há indicadores documentados nesta área.');
  for(const metric of metrics)appendAnnualExport('disciplines',metric,null);
  const charts=chartMetrics.map(metric=>
   chart('disciplines',metric,null,disciplineMetricLabels[metric],metric)
  );
  const sectionBreak=chartMetrics.findIndex(metric=>sectionSizeMetrics.includes(metric));
  return (charts.length?`<div class="chart-grid charts-first-grid">${window.SIAPOS_CHARTS.rows(charts,sectionBreak)}</div>`:'')+indicatorsDownload();
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

  return `<div class="toolbar">${tableDownloadButton()}</div>${coverage}<ul class="source-list" aria-label="Fontes da pós-graduação">${sourceRows}</ul><div class="section-heading"><div><h2>Critérios de leitura</h2></div></div><div class="methods-grid"><article class="method"><h3>ND, NA, zero e estimativa</h3><p><strong>ND</strong>: não há informação suficiente na base. <strong>NA</strong>: o indicador não se aplica. <strong>0</strong>: zero documentado. <strong>≈</strong>: valor aproximado, com método indicado. Ausências não são convertidas em zero nem incluídas no denominador das médias.</p></article><article class="method"><h3>Titulações e matrículas</h3><p>Titulações são diplomas concedidos; doutorado agrega DO e DD (doutorado direto). Matrículas regulares são contagens anuais nos programas, separadas dos alunos especiais.</p></article><article class="method"><h3>Disciplinas e participação</h3><p>Matrículas em disciplinas são vínculos com turmas, não pessoas distintas. Produtos de turmas × médias publicadas são aproximações; matrículas e aprovações assim derivadas preservam o arredondamento.</p></article><article class="method"><h3>Participações percentuais</h3><p>O CSV de titulações e matrículas inclui a participação no total de ${esc(unitLabel)}. Cada percentual usa todos os programas no mesmo ano e nível. A média dos percentuais anuais não é a participação nos totais acumulados.</p></article><article class="method"><h3>Médias e taxas</h3><p>O CSV inclui a média aritmética dos indicadores anuais no período da consulta e a quantidade de anos com dados. Matrículas por turma usam a soma dos produtos de turmas × médias dividida pelo número de turmas dentro de cada ano; a taxa de aprovação usa os vínculos aprovados e matriculados.</p></article><article class="method"><h3>Cortes de tamanho das turmas</h3><p>Menos de cinco inclui zero e exclui cinco; a faixa de cinco a trinta inclui os dois limites; mais de trinta exclui trinta. As três faixas particionam o total de turmas e usam contagens por turma. Relatórios gerais por período podem comprovar uma turma; para exatamente duas, o complemento usa a média e uma contagem independente, sob a precisão explicitada. Desvio-padrão e ausência de linha não criam contagens.</p></article><article class="method"><h3>Cobertura e períodos sem dados</h3><p>A comparação usa o mesmo recorte dos programas configurados. As pendências de comprovação ou conciliação são detalhadas por ano e programa nesta página. Valores obtidos fora da interseção comum permanecem identificados como disponíveis individualmente.</p></article><article class="method"><h3>Programa e associação histórica</h3><p>Programa não é departamento. A associação histórica de uma oferta depende da fonte do programa ou da área. O prefixo do código não define programa. Quando indicado na origem, a associação aplica ao histórico a área da ficha atual ou o vínculo unívoco nas relações públicas atuais de disciplinas, sob hipótese de manutenção. Essa classificação é indicada como hipótese, sem alegar comprovação da área histórica. Ofertas compartilhadas conservam os vínculos documentados.</p></article></div>${sourceLimits('degrees')}${(D.notes||D.methodology_notes||[]).length?`<details class="table-disclosure"><summary>Observações documentadas na extração</summary><div class="panel" style="padding:18px">${(D.notes||D.methodology_notes||[]).map(n=>`<p class="mini-note" style="margin-bottom:8px">${esc(typeof n==='string'?n:JSON.stringify(n))}</p>`).join('')}</div></details>`:''}`;

 }

 function render(){

  derived=new Map();nextDerived=0;chartCount=0;exportRows=[];
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

  if(graduation){
    $('#view-content').innerHTML='<div id="grad-root"></div>';
    graduationPanel.mount($('#grad-root'));
  }else{
    $('#view-content').innerHTML=({series,disciplines,sources})[state.view]();
  }
  $('.page-footer span:first-child').textContent='Dados do IME · IME-USP';
  $('.page-footer span:last-child').textContent=(graduation?'2012–2025':fullPeriod)+' · Fontes e limites acompanham os indicadores';

  window.SIAPOS_FILTERS?.refresh();
  $('#chart-tooltip').hidden=true;

 }

 function sourceFor(record){return sourceRef(record);}

 function sourceAccessLabel(access){const value=String(access||'');return value==='public'?'Pública':value.startsWith('mixed')?'Mista':/authentic|janus/.test(value)?'Janus autenticado':/config|metadata/.test(value)?'Configuração':'Acesso não identificado';}

 const safeSourceURL=url=>/^https?:\/\//i.test(String(url||''))?String(url):null;

 function sourceChain(record){const found=new Map();function visit(id){if(found.has(id))return;const source=mainSources.get(id);if(!source)return;found.set(id,source);for(const parent of Array.isArray(source.depends_on)?source.depends_on:[])visit(typeof parent==='string'?parent:parent?.id);}for(const id of record.provenance?.source_ids||[])visit(id);return [...found.values()];}



 function sourceLocator(s){return s.kind==='janus_html'||s.locator?String(s.locator||'Relatório Janus'): [s.sheet,s.cell||s.range].filter(Boolean).join('!');}

 function sourceCitation(s){return [basename(s.file||s.filename||s.path),sourceLocator(s)].filter(Boolean).join(' · ');}

 function sourceSummary(record){
  const {status,metric,derived_kind,n,expected_n}=record;
  if(record.coverage_restricted&&typeof record.available_value==='number'){
   const individual=format({...record,value:record.available_value,status:record.available_status||'exact'});
   return `Valor individual de ${individual}, fora da comparação por falta de cobertura comum.`;
  }
  if(derived_kind==='mean'){
   return `Média anual com dados em ${n} de ${expected_n} anos.`;
  }
  if(status==='NA')return record.applicability_rule?'O programa não oferece esse nível.':'O indicador não se aplica a este recorte.';
  if(status==='ND')return 'Sem valor documentado neste recorte.';
  const qualifiers=record.qualifiers||[];
  const rounded=qualifiers.some(q=>/arredondamento da média|média publicada.*arredondamento/i.test(q));
  const notes=[];
  if(metric==='enrollments_per_section')notes.push('Matrículas divididas pelo número de turmas.');
  if(metric==='enrollments')notes.push('Cada matrícula é um vínculo com uma turma.');
  if(metric==='approval_rate')notes.push('Aprovações divididas pelas matrículas em disciplinas.');
  if(rounded)notes.push('Cálculo com médias publicadas arredondadas.');
  else if(status==='approximate')notes.push('Valor estimado.');
  if(qualifiers.some(q=>/manutenção (?:da área|do vínculo)/i.test(q)))notes.push('O programa da oferta histórica foi inferido pelo vínculo atual da disciplina.');
  return notes.join(' ');
 }

 function showSource(record){
  if(!record)return;
  const s=sourceFor(record),der=record.records||[],name=label(record.section,record.metric,record.level);
  const program=names[record.program]||record.program;
  const context=[program,record.year].filter(Boolean).join(' · ');
  const value=format(record,{mean:record.derived_kind==='mean'});
  const unit=M.numeric(record)?({hours:' h',credits:' créditos'}[record.unit]||''):'';
  const note=record.semantic_note||record.note||defs.get(record.section+'.'+record.metric)?.semantic_note;
  const summary=sourceSummary(record);
  const sourceName=source=>String(source.title||source.label||basename(source.file||source.filename||source.path)).replace(/ · \d{4}-\d\d-\d\d a \d{4}-\d\d-\d\d$/,'');
  const sources=der.length?der.filter(M.numeric).map(sourceFor):[s];
  const titles=[...new Set(sources.map(sourceName).filter(Boolean))];
  const urls=[...new Set(sources.map(part=>safeSourceURL(part.url)))];
  const sourceLabel=titles.length===1?titles[0]:titles.length?'Fontes dos valores que compõem o cálculo':'';
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

 function exportSVG(id){const src=document.getElementById(id),svg=src.cloneNode(true),original=[src,...src.querySelectorAll('*')],clones=[svg,...svg.querySelectorAll('*')];original.forEach((el,i)=>{const cs=getComputedStyle(el);['fill','stroke','font-family','font-size','font-weight','display','opacity'].forEach(k=>clones[i].style.setProperty(k,cs.getPropertyValue(k)));clones[i].removeAttribute('tabindex');clones[i].removeAttribute('data-source');clones[i].removeAttribute('data-tip');});download(new Blob([new XMLSerializer().serializeToString(svg)],{type:'image/svg+xml;charset=utf-8'}),`dados-ime-pos-${state.view}-${fullPeriod}-${id}.svg`);}

 function exportCSV(){const csv=exportRows.map(row=>row.map(v=>'"'+(typeof v==='number'?String(v).replace('.',','):String(v??'')).replace(/"/g,'""')+'"').join(';')).join('\r\n');download(new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'}),`dados-ime-pos-${state.view}-${fullPeriod}.csv`);}

 document.addEventListener('click',e=>{const a=e.target.closest('[data-source]');if(a){const key=a.dataset.source;showSource(key[0]==='d'?derived.get(key):records[+key]);return;}const svg=e.target.closest('[data-export-svg]');if(svg){exportSVG(svg.dataset.exportSvg);return;}const action=e.target.closest('[data-action]')?.dataset.action;if(action==='csv')exportCSV();});

 document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('svg [data-source]')){e.preventDefault();e.target.dispatchEvent(new MouseEvent('click',{bubbles:true}));}});

 const close=()=>$('#source-dialog').close();$('#close-dialog').addEventListener('click',close);$('#done-dialog').addEventListener('click',close);$('#source-dialog').addEventListener('click',e=>{if(e.target===$('#source-dialog')){const b=e.target.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)close();}});

 $('#copy-source').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(copyText);notify('Referência copiada.');}catch{const t=document.createElement('textarea');t.value=copyText;$('#source-dialog').appendChild(t);t.select();const ok=document.execCommand('copy');t.remove();notify(ok?'Referência copiada.':'Selecione e copie a referência exibida.');}});

 function viewFromHash(){
  const value=location.hash.slice(1);
  const [area,tab]=value.split('/');
  const retiredView=value==='restricted'||value==='additional';
  const route=retiredView||value==='requested'?'disciplines':value;
  if(area==='graduation'){
   state.view='graduation';
   if(tab==='anuario'){
    state.gradTab='department';
    history.replaceState(history.state,'','#graduation/department');
   }else state.gradTab=tab==='mac-adicional'&&!graduationPanel.hasCommonDepartments?'department':tab||'series';
  }else{
   state.view=Object.hasOwn(titles,route)?route:'series';
   if(retiredView)history.replaceState(history.state,'','#disciplines');
  }
  render();
 }
 window.addEventListener('hashchange',viewFromHash);
 viewFromHash();

})();
