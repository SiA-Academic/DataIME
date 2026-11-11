(function(){
 'use strict';
 const D=window.GRADUACAO_DATA||{},M=window.PAINEL_MATH;
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const base=v=>String(v??'').split(/[\\/]/).pop();
 const numberFormats=new Map();
 function number(v,d=0){
  if(!numberFormats.has(d))numberFormats.set(d,new Intl.NumberFormat('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d}));
  return numberFormats.get(d).format(v);
 }
 const colors=['#245da8','#a65c69','#21877e','#7962a6','#ce792b','#a18a22'];
 const courses=(D.courses||[]).map((c,i)=>({...c,color:colors[i%colors.length]}));
 const metricDefs=D.definitions?.metrics||{};
 const courseMetricIds=['matriculados','concluintes','vagas_oferecidas','ingressantes'];
 const meanMetricIds=new Set(['dimensao_media_teoricas','dimensao_media_praticas','matriculas_por_turma','media_notas_ponderada']);
 const hiddenCourseMetricIds=new Set(['nao_matriculados_trancamentos','cadastrados_total']);
 const commonMetricDefs=D.jupiter_metric_definitions||D.jupiter_collection?.metric_definitions||{};
 const sources=new Map((D.sources||[]).map(s=>[s.id,s]));
 const records=(D.metrics||[]).map((r,i)=>({...r,_gradId:'g'+i,semester:r.semester??null}));
 const jupiterRecords=records.filter(r=>r.section==='departamento_jupiter');
 const commonDatasetKind=D.jupiter_collection?.dataset_kind||'';
 const isSectionRegistry=commonDatasetKind==='course_section_registry';
 const commonDepartmentTitle='Disciplinas';
 const hasCommonDepartments=Array.isArray(D.jupiter_departments)&&D.jupiter_departments.length>0&&jupiterRecords.some(r=>typeof r.value==='number'&&Number.isFinite(r.value)&&!['ND','NA'].includes(r.status));
 const key=(section,metric,year,semester,entity,group='',scope='')=>[section,metric,year,semester??'',entity??'',group,scope].join('|');
 const index=new Map(records.map(r=>[key(r.section,r.metric,r.year,r.semester,r.course||r.department,r.group||'',r.scope||''),r]));
 const years=Array.from({length:14},(_,i)=>2012+i);
 const state={tab:'series',selected:new Set(courses.map(c=>c.id)),start:2012,end:2025,additionalView:'credits',interdepartmentalMetric:'matriculas',interdepartmentalSemester:'both',anuarioMetric:null,anuarioSemester:'both',anuarioDepartments:new Set(['MAC','MAT','MAP','MAE']),sourceAccess:'public',coverageOpen:false};
 const tabs=[['series','Titulações e matrículas'],['department',commonDepartmentTitle],['anuario','Estatísticas do Anuário'],['sources','Fontes e critérios']];
 let root=null,refs=new Map(),refId=0,chartId=0,csvRows=[],copyText='',viewControls='',viewOptions='';
 const numeric=r=>!!r&&typeof r.value==='number'&&Number.isFinite(r.value)&&!['ND','NA'].includes(r.status);
 const selectedYears=()=>state.tab==='series'||state.tab==='department'?years:years.filter(y=>y>=state.start&&y<=state.end);
 const range=()=>{
  const visibleYears=selectedYears(),first=visibleYears[0],last=visibleYears.at(-1);
  return first===last?String(first):first+'–'+last;
 };
 const semLabel=s=>s==null?'Anual':s+'º semestre';
 const definition=(metric,section='cursos')=>section==='departamento_jupiter'?(commonMetricDefs[metric]||metricDefs[metric]||metricDefs[section+'.'+metric]||{}):(metricDefs[metric]||metricDefs[section+'.'+metric]||{});
 const metricLabel=(metric,section='cursos')=>metric==='media_notas_ponderada'?'Média das médias de notas':definition(metric,section).label||metric;
 const ratio=r=>['ratio','fraction','proportion'].includes(r?.unit);
 const reportedIntake=r=>r?.intake_basis==='jupiter_reported_routes'||Boolean(r?.student_intake_review);
 const estimated=r=>!reportedIntake(r)&&(r?.estimate===true||r?.inep_consolidation?.estimate===true);
 const reportedIntakeLabel='Júpiter · pareceres do CEE-SP';
 function intakeOrigin(r){
  if(reportedIntake(r))return reportedIntakeLabel;
  const years=(r.records||[]).filter(reportedIntake).map(v=>v.year);
  return years.length?years.join(', ')+' · '+reportedIntakeLabel:'';
 }
 const estimateBound=(r,key)=>r?.[key]??r?.inep_consolidation?.[key];
 function estimateRange(r){
  const lower=estimateBound(r,'lower_bound'),upper=estimateBound(r,'upper_bound');
  if(!estimated(r)||!Number.isFinite(lower)||!Number.isFinite(upper))return '';
  const digits=r.derived_kind==='mean'?2:0;
  return number(lower,digits)+'–'+number(upper,digits);
 }
 function estimateDescription(r){
  if(!estimated(r))return '';
  const label=r.derived_kind==='mean'?`Média com ${r.estimated_n} ${r.estimated_n===1?'ano estimado':'anos estimados'}.`:'Estimativa pela soma bruta dos ingressos. Pode haver sobreposição entre a área básica e a habilitação.';
  const interval=estimateRange(r);
  return interval?`${label} Intervalo ${interval}.`:label;
 }
 const format=(r,mean=false)=>!numeric(r)?(r?.status==='NC'?'NC':r?.status==='NA'?'NA':'ND'):(estimated(r)||r.status==='approximate'?'≈ ':'')+number(ratio(r)?r.value*100:r.value,mean?2:ratio(r)?r.status==='published_rounded'?2:1:Number.isInteger(r.value)?0:2)+(ratio(r)?'%':'');
 const source=r=>{const inline=r?.source&&typeof r.source==='object'?r.source:{},id=typeof r?.source==='string'?r.source:r?.source_id||inline.id;return {...(id?{id}:{}),...(sources.get(id)||{}),...inline,...(r?.source_locator!=null?{locator:r.source_locator}:{}),...(r?.source_pages!=null?{pages:r.source_pages}:{}),...(r?.source_page!=null?{page:r.source_page}:{}),...(r?.source_table!=null?{table:r.source_table}:{})};};
 const creditProof=r=>r?.credit_proof||D.jupiter_credit_proofs?.[r?.credit_proof_id]||null;
 const comparisonDepartments=['MAC','MAT','MAP','MAE'];
 const creditMetricIds=['creditos_aula_historicos','carga_horaria_aula_historica'];
 const outcomeMetricIds=['aprovados','reprovados_nota','reprovados_frequencia','reprovados_ambas','trancados','taxa_aprovacao','taxa_trancamento','media_notas_ponderada'];
 const creditPeriodKey=(year,semester)=>year+'|'+(semester??'annual');
 const commonCreditPeriods=new Set(years.flatMap(year=>[null,1,2].filter(semester=>comparisonDepartments.every(department=>creditMetricIds.every(metric=>numeric(index.get(key('departamento_jupiter',metric,year,semester,department)))))).map(semester=>creditPeriodKey(year,semester))));
 const sourceAccess=s=>{const a=s.access||s.source_access||'';return a==='public'?'public':a.startsWith('mixed')?'mixed':a.startsWith('authenticated')?'authenticated':'unknown';};
 const accessLabels={public:'Fonte pública',mixed:'Origem mista',authenticated:'Consulta autenticada',unknown:'Acesso não informado'};
 const accessLabel=s=>accessLabels[sourceAccess(s)];
 const locator=s=>s.locator||[s.table,s.pages?.length?'pp. '+s.pages.join(', '):s.page!=null?'p. '+s.page:null,s.sheet,s.cell||s.range].filter(Boolean).join(' · ');
 const safeURL=url=>/^https?:\/\//i.test(String(url||''))?String(url):null;
 const sourceText=s=>[s.title,accessLabel(s),base(s.file),locator(s),s.url].filter(Boolean).join(' · ');
 const aggregationComponents=r=>Array.isArray(r?.aggregation_components)?r.aggregation_components:[];
 const abiComponents=r=>reportedIntake(r)?[]:Array.isArray(r?.abi_components)?r.abi_components:r?.abi_component?[r.abi_component]:aggregationComponents(r).flatMap(abiComponents);
 const abiField=(items,field)=>!items.length?'':items.length===1?items[0][field]??'':items.map(item=>(item.course||item.inep_course_code||'ABI')+': '+(item[field]??'ND')).join(' | ');
 const abiReferenceText=r=>abiComponents(r).map(v=>(v.course||v.inep_course_code||'ABI')+' · componente ABI '+format(v)+': '+sourceText(source(v))).join(' | ');
 const inepScopeNote='BMAC + BMA: áreas básicas e Métodos Matemáticos.';
 const inepResolutionLabels={no_habilitation_entrants:'Habilitação do recorte sem ingressantes no ano.',no_origin_transfers:'Origem sem transferências no ano.',unresolved_overlap:'Sobreposição entre ABI e habilitação ainda não resolvida.',possible_overlap:'Possível sobreposição entre ABI e habilitação.'};
 const inepCode=v=>typeof v==='object'&&v!==null?[v.inep_course_code||v.code||v.id,v.name].filter(Boolean).join(' · '):String(v??'');
 const inepScopeSources=c=>(c?.scope_sources||[]).map(s=>typeof s==='string'&&safeURL(s)?{url:s}:source({source:s}));
 function inepConsolidations(r){if(reportedIntake(r))return [];return [...(r.inep_consolidation?[r]:[]),...aggregationComponents(r).flatMap(inepConsolidations),...(r.records||[]).flatMap(inepConsolidations)];}
 const intakeRoutes=[['fuvest','Fuvest'],['sisu','SiSU'],['transfer_usp','Transferência USP'],['graduates','Portadores de diploma'],['transfer_external','Transferência externa']];
 function intakeReference(r){
  const review=r.student_intake_review;
  if(!review)return aggregationComponents(r).map(intakeReference).join(' | ');
  const routes=intakeRoutes.map(([id,label])=>label+': '+(review.counts[id]??'em branco')).join(', ');
  return [r.course+' · '+format(r),routes,sourceText(review.source)].join(' · ');
 }
 function intakeDetails(r){
  if(!reportedIntake(r))return '';
  const parts=r.student_intake_review?[r]:aggregationComponents(r);
  const routesTable=intakeRoutes.map(([id,label])=>`<tr><th scope="row">${esc(label)}</th>${parts.map(p=>`<td>${esc(p.student_intake_review.counts[id]??'Em branco')}</td>`).join('')}</tr>`).join('');
  const refs=parts.map(p=>{const s=p.student_intake_review.source;return `<li>${safeURL(s.url)?`<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title||p.course)} ↗</a>`:esc(s.title||p.course)} · ${esc(locator(s))}</li>`;}).join('');
  const cells=parts.flatMap(p=>p.inep_consolidation?.components||[]),places=cells.map(c=>c.entrants_by_place);
  const split=places.length&&places.every(v=>Number.isFinite(v?.QT_ING_VG_NOVA)&&Number.isFinite(v?.QT_ING_VG_REMANESC))?` (${places.reduce((n,v)=>n+v.QT_ING_VG_NOVA,0)} em vagas novas e ${places.reduce((n,v)=>n+v.QT_ING_VG_REMANESC,0)} em remanescentes)`:'';
  const bounds=r.inep_range,s=cells[0]?source(cells[0]):{};
  const comparison=Array.isArray(bounds)&&cells.length?`<details data-grad-inep-comparison><summary>Comparação com o Censo da Educação Superior</summary><p>O Inep registra ${cells.reduce((n,c)=>n+c.value,0)} ingressos${esc(split)}. A possível sobreposição entre área básica e habilitação resulta no intervalo ${esc(bounds.join('–'))} nessa fonte.</p>${safeURL(s.url)?`<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">Consultar o Censo ↗</a>`:''}</details>`:'';
  return `<section data-grad-intake-routes><h3>Ingressantes por forma de ingresso · ${esc(r.year)}</h3><div class="table-wrap"><table class="data-table"><thead><tr><th scope="col">Forma de ingresso</th>${parts.map(p=>`<th scope="col">${esc(p.course)}</th>`).join('')}</tr></thead><tbody>${routesTable}<tr><th scope="row">Total informado nas modalidades</th>${parts.map(p=>`<td>${esc(format(p))}</td>`).join('')}</tr></tbody></table></div><ul>${refs}</ul>${comparison}</section>`;
 }
 function inepResolutionText(c){const result=estimated(c)?estimateDescription(c):c.resolved?'Total validado no recorte IME.':'Total ND no recorte IME.';return [result,inepResolutionLabels[c.resolution]||c.resolution,c.note].filter(Boolean).join(' ');}
 function inepReferenceText(r){const c=r.inep_consolidation;if(!c)return '';return [inepScopeNote,inepResolutionText(c),'Códigos incluídos: '+(c.included_codes||[]).map(inepCode).join(', '),'Códigos excluídos do recorte: '+((c.excluded_codes||[]).map(inepCode).join(', ')||'nenhum'),...(c.components||[]).map(v=>[v.role,'código '+inepCode(v.inep_course_code),v.name,'QT_ING: '+format(v),'Transferidos (todas as coortes): '+(v.transferred_total??'ND'),sourceText(source(v))].filter(Boolean).join(' · ')),...inepScopeSources(c).map(s=>'Comprovação do recorte: '+sourceText(s))].filter(Boolean).join(' | ');}
 function directSupportingSources(r){const s=source(r);return [...(r.supporting_sources||[]),...(s.supporting_sources||[]),...(r.public_credit_source_urls||[]),...(s.public_credit_source_urls||[])].map(v=>typeof v==='string'?{url:v}:v).filter(v=>safeURL(v?.url));}
 function complementarySources(r){
  const items=[];
  function visit(v,includeOwn=false){
   if(reportedIntake(v)){for(const p of v.student_intake_review?[v]:aggregationComponents(v))items.push(p.student_intake_review.source);return;}
   if(includeOwn)items.push(source(v));items.push(...directSupportingSources(v));
   if(v.section!=='cursos')return;
   aggregationComponents(v).forEach(c=>visit(c,true));
   if(v.metric==='ingressantes'&&v.inep_consolidation){items.push(...inepScopeSources(v.inep_consolidation));for(const c of v.inep_consolidation.components||[])items.push(source(c));}
   if(!['vagas_oferecidas','ingressantes'].includes(v.metric))return;
   (v.records||[]).forEach(c=>visit(c,true));
   const review=v.vacancy_reconciliation;if(review){for(const c of review.components||[])items.push(source(c));if(review.original_observation)visit(review.original_observation,true);}
  }
  visit(r);return [...new Map(items.filter(v=>safeURL(v?.url)).map(v=>[[v.url,locator(v)].join('|'),v])).values()];
 }
 function vacancyReviews(r){if(r.section!=='cursos'||r.metric!=='vagas_oferecidas')return [];return [...(r.vacancy_reconciliation?[r]:[]),...aggregationComponents(r).flatMap(vacancyReviews),...(r.records||[]).flatMap(vacancyReviews)];}
 function vacancyReferenceText(r){const review=r.vacancy_reconciliation;if(!review)return '';const original=review.original_observation;return ['Vagas de ingresso regular: '+format(r),review.note,...(review.components||[]).map(v=>v.route+': '+format(v)+'; '+sourceText(source(v))),original?'Valor anterior do Anuário: '+format(original)+'; '+sourceText(source(original)):''].filter(Boolean).join(' | ');}
 function recordSourceText(r){if(reportedIntake(r))return reportedIntakeLabel+' · '+intakeReference(r);return [sourceText(source(r)),estimateDescription(r),aggregationComponents(r).length?'Componentes: '+aggregationComponents(r).map(v=>(v.course||'Curso')+' · '+format(v)+': '+recordSourceText(v)).join(' | '):'',vacancyReferenceText(r),inepReferenceText(r),r.section==='cursos'?directSupportingSources(r).map(sourceText).join(' | '):'',abiReferenceText(r)].filter(Boolean).join(' | ');}
 function exportComponentSources(r){if(reportedIntake(r))return recordSourceText(r);const details=r.records?r.records.map(v=>v.year+': '+recordSourceText(v)).join(' | '):aggregationComponents(r).length?aggregationComponents(r).map(v=>(v.course||'Curso')+' · '+format(v)+': '+recordSourceText(v)).join(' | '):r.vacancy_reconciliation||r.inep_consolidation?recordSourceText(r):abiReferenceText(r);return [estimateDescription(r),details].filter(Boolean).join(' | ');}
 function vacancyDetails(r){return vacancyReviews(r).map(v=>{const review=v.vacancy_reconciliation,original=review.original_observation;return `<section data-grad-vacancy-reconciliation><h3>Vagas de ingresso regular · ${esc(v.course)} · ${esc(v.year)}</h3><p>${esc(review.note||'Total das vias de ingresso documentadas.')}</p><div class="table-wrap"><table class="data-table"><thead><tr><th>Via de ingresso</th><th>Vagas</th><th>Fonte</th></tr></thead><tbody>${(review.components||[]).map(c=>`<tr><td>${esc(c.route)}</td><td>${esc(format(c))}</td><td class="grad-source-ref">${esc(sourceText(source(c)))}</td></tr>`).join('')}<tr><th>Total de ingresso regular</th><th>${esc(format(v))}</th><td>Soma das vias documentadas</td></tr></tbody></table></div>${original?`<p><strong>Valor anterior do Anuário: ${esc(format(original))}.</strong> Preservado para conferência; não é somado ao total acima.</p><p class="grad-source-ref">${esc(sourceText(source(original)))}</p>`:''}</section>`;}).join('');}
 function inepConsolidationDetails(r){return inepConsolidations(r).map(v=>{const c=v.inep_consolidation,title=`Consolidação Inep · ${v.course||c.course} · ${v.year||c.year}`,body=`<p>${esc(inepScopeNote)}</p><p><strong>${esc(inepResolutionText(c))}</strong></p><p>Códigos incluídos: ${esc((c.included_codes||[]).map(inepCode).join(', '))}. Códigos excluídos do recorte: ${esc((c.excluded_codes||[]).map(inepCode).join(', ')||'nenhum')}.</p><div class="table-wrap"><table class="data-table"><thead><tr><th>Componente</th><th>Código Inep</th><th>Nome</th><th>QT_ING</th><th>Transferidos · todas as coortes</th><th>Fonte</th></tr></thead><tbody>${(c.components||[]).map(item=>`<tr data-grad-inep-component><td>${esc(item.role)}</td><td>${esc(inepCode(item.inep_course_code))}</td><td>${esc(item.name)}</td><td>${esc(format(item))}</td><td>${esc(item.transferred_total??'ND')}</td><td class="grad-source-ref">${esc(sourceText(source(item)))}</td></tr>`).join('')}</tbody></table></div><p>${c.resolved?'O total usa os componentes cuja ausência de sobreposição foi validada neste ano.':estimated(c)?'O limite superior corresponde à soma bruta dos componentes.':'Os componentes estão disponíveis para conferência. O total permanece ND.'} As transferências abrangem todas as coortes e não são subtraídas de QT_ING.</p>${inepScopeSources(c).map(s=>`<p class="grad-source-ref">Comprovação do recorte: ${esc(sourceText(s))}</p>`).join('')}`;return r.records?`<details data-grad-inep-consolidation><summary>${esc(title)}</summary>${body}</details>`:`<section data-grad-inep-consolidation><h3>${esc(title)}</h3>${body}</section>`;}).join('');}
 function courseComponentDetails(r){const components=aggregationComponents(r),abis=abiComponents(r);return (components.length?`<h3>Valores que compõem ${esc(r.course||'o grupo')}</h3><div class="table-wrap"><table class="data-table"><thead><tr><th>Componente</th><th>Valor</th><th>Fonte</th></tr></thead><tbody>${components.map(v=>`<tr><td>${esc(v.course)}</td><td>${esc([format(v),estimateRange(v)].filter(Boolean).join(' · '))}</td><td class="grad-source-ref">${esc(sourceText(source(v)))}</td></tr>`).join('')}</tbody></table></div>`:'')+(abis.length&&!inepConsolidations(r).length?`<h3>Componentes de ingresso na ABI</h3><p>Estas contagens são referências da fonte. A referência do total informa quais componentes entram na contagem.</p><div class="table-wrap"><table class="data-table"><thead><tr><th>Componente</th><th>Ingressantes na ABI</th><th>Fonte</th></tr></thead><tbody>${abis.map(v=>`<tr><td>${esc(v.course||v.inep_course_code||'ABI')}</td><td>${esc([format(v),estimateRange(v)].filter(Boolean).join(' · '))}</td><td class="grad-source-ref">${esc(sourceText(source(v)))}</td></tr>`).join('')}</tbody></table></div>`:'');}
 function linkedSources(r){const unique=complementarySources(r);return unique.length?`<details class="grad-linked-sources"><summary>Fontes complementares · ${unique.length}</summary><ul>${unique.map(v=>`<li><a href="${esc(v.url)}" target="_blank" rel="noopener noreferrer">${esc(v.title||v.label||(/sgldis=([^&]+)/.exec(v.url)?.[1]||'Abrir fonte'))} ↗</a>${locator(v)?` <span>${esc(locator(v))}</span>`:''}</li>`).join('')}</ul></details>`:'';}
 function offeringSources(r){const s=source(r),items=[r.offering_source,s.offering_source].filter(Boolean).flat();return items.length?`<details class="grad-linked-sources"><summary>Origem das turmas utilizadas</summary>${items.map(v=>`<div class="grad-offering-source"><p><strong>${esc(v.title||'Fonte das ofertas')}</strong></p><p>${esc(base(v.file))}${locator(v)?' · '+esc(locator(v)):''}</p><p>${esc(accessLabel(v))}. A referência das ofertas é distinta das fichas públicas de créditos.</p></div>`).join('')}</details>`:'';}
 function ingressoNote(all=false){const ingressos=records.filter(r=>r.section==='cursos'&&r.metric==='ingressantes'),rs=ingressos.filter(r=>all||state.selected.has(r.course)&&selectedYears().includes(r.year)),missing=rs.filter(r=>!numeric(r)),latestYear=ingressos.length?Math.max(...ingressos.map(r=>r.year)):null,latest=latestYear==null?[]:courses.map(c=>get('cursos','ingressantes',latestYear,null,c.id)),latestMissing=latest.filter(r=>!numeric(r));const latestNote=latest.length?(latestMissing.length===latest.length?` O ano de ${latestYear} permanece ND.`:latestMissing.length?` Em ${latestYear}, ${latestMissing.length} de ${latest.length} totais por curso permanecem ND.`:` Em ${latestYear}, os ${latest.length} cursos têm totais documentados.`):'';return `<div class="callout ${missing.length?'warning':''}"><strong>Fontes dos ingressantes.</strong> Censo da Educação Superior (Inep).${rs.filter(reportedIntake).map(r=>' '+esc(r.course)+' em '+esc(r.year)+': '+esc(reportedIntakeLabel)+'.').join('')}${latestNote}${all||state.selected.has('BMAC + BMA')?' '+esc(inepScopeNote):''} Os totais com possível sobreposição entre ABI e habilitação usam a soma bruta como estimativa e mostram um intervalo. Os componentes de cada ano estão na referência do valor.${missing.length?` ${missing.length} de ${rs.length} valores ${all?'da base':'desta seleção'} estão indisponíveis.`:''}</div>`;}
 function rawGet(section,metric,year,semester,entity){return index.get(key(section,metric,year,semester,entity,'',''))||{section,metric,year,semester,course:section==='cursos'?entity:null,department:section!=='cursos'?entity:null,group:null,scope:null,value:null,status:'ND',semantic_note:'Não há valor documentado para esta combinação de indicador, ano, semestre e entidade. É necessário obter uma fonte desse recorte; a ausência não comprova zero.'};}
 const obtainedCreditPeriods=new Set(jupiterRecords.filter(r=>comparisonDepartments.includes(r.department)&&creditMetricIds.includes(r.metric)&&numeric(r)).map(r=>creditPeriodKey(r.year,r.semester)));
 function comparisonCreditRecord(r){if(!isSectionRegistry||!creditMetricIds.includes(r.metric)||!comparisonDepartments.includes(r.department)||commonCreditPeriods.has(creditPeriodKey(r.year,r.semester))||!obtainedCreditPeriods.has(creditPeriodKey(r.year,r.semester)))return r;return {...r,value:null,status:'NC',comparison_original_record:r,semantic_note:'NC — fora da cobertura comum dos quatro departamentos. '+(numeric(r)?'Este valor já foi obtido e está preservado em Dados complementares; não falta coletá-lo.':'Neste departamento também falta comprovar o total: consulte as versões e vigências pendentes abaixo. Os valores já obtidos nos outros departamentos estão em Dados complementares.')+' A seleção de departamentos não altera a cobertura comum.'};}
 function get(section,metric,year,semester,entity){const r=rawGet(section,metric,year,semester,entity);return state.tab==='department'&&section==='departamento_jupiter'?comparisonCreditRecord(r):r;}
 function ref(r){const id=r._gradId||'gd'+refId++;refs.set(id,r);return id;}
 function cell(r,mean=false){return `<button class="metric-cell ${r.status==='approximate'?'approx':''}" data-grad-source="${ref(r)}" aria-label="${esc(format(r,mean))}; consultar origem">${!numeric(r)?`<span class="${r.status==='NC'?'grad-nc':r.status==='NA'?'na':'nd'}">${format(r)}</span>`:esc(format(r,mean))}</button>`;}
 function average(section,metric,semester,entity){
  const rs=selectedYears().map(y=>get(section,metric,y,semester,entity)),valid=rs.filter(numeric),estimates=valid.filter(estimated);
  const mean={section,metric,semester,course:section==='cursos'?entity:null,department:section!=='cursos'?entity:null,year:range(),value:valid.length?valid.reduce((s,r)=>s+r.value,0)/valid.length:null,status:valid.length?(estimates.length||valid.some(r=>r.status==='approximate')?'approximate':'derived'):rs.some(r=>r.status==='NC')?'NC':'ND',unit:valid[0]?.unit,n:valid.length,expected_n:rs.length,records:rs,derived_kind:'mean',semantic_note:state.tab==='department'&&section==='departamento_jupiter'&&creditMetricIds.includes(metric)?'Média apenas dos anos com a mesma cobertura comprovada nos quatro departamentos, para este indicador e período. Recortes NC ficam fora do cálculo; os valores adicionais já obtidos estão preservados em Dados complementares.':'Média aritmética dos anos com valor disponível, para este mesmo indicador e semestre.'};
  if(estimates.length){
   mean.estimate=true;mean.estimated_n=estimates.length;
   for(const key of ['lower_bound','upper_bound'])if(estimates.every(r=>Number.isFinite(estimateBound(r,key))))mean[key]=valid.reduce((sum,r)=>sum+(estimated(r)?estimateBound(r,key):r.value),0)/valid.length;
  }
  return mean;
 }
 function differentCoverage(section,metric,semester,entities){
  const available=entities.map(entity=>selectedYears().filter(year=>numeric(get(section,metric,year,semester,entity.id))).join(','));
  return new Set(available).size>1;
 }
 function legend(entities,showEstimates=false,showReported=false){return `<div class="legend">${entities.map(c=>`<span title="${esc(c.name)}"><i class="legend-dot" style="background:${c.color}"></i>${esc(c.id)}</span>`).join('')}${showEstimates?'<span data-grad-estimate-legend><b aria-hidden="true">◇</b> Estimativa por soma bruta · traço vertical indica o intervalo</span>':''}${showReported?'<span data-grad-intake-legend><b aria-hidden="true">■</b> Júpiter · pareceres do CEE-SP</span>':''}</div>`;}
 function annualMark(record,entity,x,y,scaleY,semester){
  const title=`${entity.id} · ${record.year} · ${semLabel(semester)}`;
  const description=[format(record),estimateDescription(record),intakeOrigin(record)].filter(Boolean).join(' · ');
  const attributes=`role="button" tabindex="0" data-grad-source="${ref(record)}" data-tip="${esc(title+'|'+description)}" aria-label="${esc(title+' · '+description)}"`;
  const svgTitle=`<title>${esc(title+' · '+description)}</title>`;
  if(reportedIntake(record))return `<rect data-grad-intake-point x="${x-4.5}" y="${y-4.5}" width="9" height="9" fill="${entity.color}" stroke="white" stroke-width="1.3" ${attributes}>${svgTitle}</rect>`;
  if(!estimated(record))return `<circle cx="${x}" cy="${y}" r="3.5" fill="${entity.color}" class="chart-point" ${attributes}>${svgTitle}</circle>`;
  let interval='';
  if(estimateRange(record)){
   const top=scaleY(estimateBound(record,'upper_bound')),bottom=scaleY(estimateBound(record,'lower_bound'));
   interval=`<path d="M${x-4},${top}h8 M${x},${top}V${bottom} M${x-4},${bottom}h8" fill="none" stroke="${entity.color}" stroke-width="1.6"/>`;
  }
  return `<g data-grad-estimate-point ${attributes} style="cursor:pointer">${svgTitle}${interval}<path d="M${x},${y-5}l5,5 -5,5 -5,-5Z" stroke="${entity.color}" stroke-width="2" fill="white"/></g>`;
 }
 function graph(section,metric,semester,entities,firstPeriod){
  const ys=selectedYears(),ps=entities.map(p=>({...p,records:ys.map(year=>get(section,metric,year,semester,p.id))}));
  const sourceLabel=state.tab==='department'?(section==='anuario_departamento'?'Anuário USP':'Júpiter'):'';
  const title=[metricLabel(metric,section),sourceLabel].filter(Boolean).join(' · '),periodTitle=semLabel(semester)+' · '+range();
  const courseMetric=section==='cursos'?` data-grad-series-metric="${esc(metric)}"`:'';
  const anchor=courseMetric&&firstPeriod?` id="grad-series-${esc(metric)}" tabindex="-1"`:'';
  const points=ps.flatMap(p=>p.records.map(r=>({p,r})));
  const vals=points.filter(x=>numeric(x.r)).map(x=>ratio(x.r)?x.r.value*100:x.r.value),id='grad-chart-'+(++chartId),W=480,H=210,L=55,R=20,T=32,B=45,iw=W-L-R,ih=H-T-B;
  let svg='',trendControl='';
  if(vals.length){
   const max=Math.max(...vals),rough=(max||1)/4,power=10**Math.floor(Math.log10(rough)),step=[1,2,2.5,5,10].find(v=>v*power>=rough)*power,top=Math.ceil((max||1)/step)*step,y=v=>T+ih-v/top*ih;let digits=0;
   while(digits<8&&Math.abs(step*10**digits-Math.round(step*10**digits))>1e-8)digits++;
   for(let v=0;v<=top+step/10;v+=step)svg+=`<line x1="${L}" x2="${W-R}" y1="${y(v)}" y2="${y(v)}" class="chart-gridline"/><text x="${L-9}" y="${y(v)+4}" text-anchor="end" class="chart-text">${number(v,digits)}${ratio(points.find(x=>numeric(x.r))?.r)?'%':''}</text>`;
   const x=i=>ys.length===1?L+iw/2:L+i*iw/(ys.length-1);
   ys.forEach((yr,i)=>{if(ys.length<=8||i%2===0||i===ys.length-1)svg+=`<text x="${x(i)}" y="${H-17}" text-anchor="middle" class="chart-text">${yr}</text>`;});
   const trend=window.SIAPOS_TREND;
   let observedLines='',marks='',medians='';
   for(const p of ps){
    let d='',connected=false;
    const values=p.records.map((r,i)=>{
     if(!numeric(r)){connected=false;return null;}
     const value=ratio(r)?r.value*100:r.value,xx=x(i),yy=y(value);
     d+=(connected?'L':'M')+xx+','+yy+' ';
     connected=true;marks+=annualMark(r,p,xx,yy,y,semester);
     return value;
    });
    observedLines+=`<path data-observed-line d="${d}" fill="none" stroke="${p.color}" stroke-width="2.2"/>`;
    if(trend)medians+=trend.series(ys,values,x,y,p.color,p.id);
   }
   if(medians){
    const key=['grad',section,metric,semester??'annual'].join('|')+(state.tab==='additional'&&state.additionalView==='interdepartmental'?'|450':'');
    trendControl=trend.control(key,id);
    svg+=`<g class="chart-median-layer" pointer-events="none">${medians}${trend.svgKey(W-R)}</g>`;
   }
   svg+=observedLines+marks;
  }else svg=`<text x="${W/2}" y="${H/2}" text-anchor="middle" class="chart-text">${state.tab==='department'&&section==='departamento_jupiter'&&creditMetricIds.includes(metric)?'Sem recortes com cobertura comum nesta seleção.':'Sem valores documentados nesta seleção.'}</text>`;
  const containsEstimates=points.some(({r})=>estimated(r));
  const chartLegend=legend(ps,containsEstimates,points.some(({r})=>reportedIntake(r)));
  return `<article class="panel"${courseMetric} data-grad-chart-section="${esc(section)}" data-grad-chart-metric="${esc(metric)}" data-grad-semester="${semester??'annual'}"><div class="panel-heading"><div><h2${anchor}>${esc(title)}</h2><p>${esc(periodTitle)}</p></div><div class="chart-actions">${trendControl}<button class="chart-action" data-grad-svg="${id}">SVG ↓</button></div></div><div class="chart-container"><svg id="${id}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(title+' · '+semLabel(semester))}"><title>${esc(title+' · '+semLabel(semester)+' · '+range())}</title>${containsEstimates?`<desc>${esc(points.filter(({r})=>estimated(r)).map(({r})=>r.course+' · '+r.year+' · '+estimateDescription(r)).join(' '))}</desc>`:''}${svg}</svg></div>${chartLegend}</article>`;
 }
 function meanTable(section,metric,semesters,entities){
  const label=esc(metricLabel(metric,section));
  const columns=entities.map(entity=>`<th scope="col" title="${esc(entity.name)}">${esc(entity.id)}</th>`).join('');
  const rows=selectedYears().flatMap(year=>semesters.map(semester=>{
   const values=entities.map(entity=>`<td>${cell(get(section,metric,year,semester,entity.id))}</td>`).join('');
   return `<tr><th scope="row">${year} · ${semLabel(semester)}</th>${values}</tr>`;
  })).join('');
  return `<article class="panel grad-data-panel" data-grad-mean-table="${esc(metric)}"><div class="panel-heading"><h2>${label}</h2></div><div class="table-wrap"><table class="data-table" aria-label="${label}"><thead><tr><th scope="col">Período</th>${columns}</tr></thead><tbody>${rows}</tbody></table></div></article>`;
 }
 function periodPanels(items,details=''){
  const charts=[];
  for(const {section,metric,sems,entities} of items){
   const different=sems.filter(semester=>differentCoverage(section,metric,semester,entities));
   if(different.length)details+=`<div class="callout warning"><strong>${esc(metricLabel(metric,section))}.</strong> Os anos com dados variam entre as séries selecionadas (${different.map(semLabel).join(', ')}).</div>`;
   if(meanMetricIds.has(metric))details+=meanTable(section,metric,sems,entities);
   else charts.push(...sems.map((semester,i)=>graph(section,metric,semester,entities,i===0)));
  }
  return (charts.length?`<div class="chart-grid charts-first-grid">${window.SIAPOS_CHARTS.rows(charts)}</div>`:'')+details;
 }
 const estimateColumns=['Estimativa por possível sobreposição','Limite inferior','Limite superior'];
 const estimateCells=r=>estimated(r)?['Sim',estimateBound(r,'lower_bound')??'',estimateBound(r,'upper_bound')??'']:['','',''];
 function csvRecords(rs){
  const includeBounds=rs.some(r=>r.metric==='ingressantes');
  csvRows=[['Seção','Indicador','Curso, departamento ou prefixo','Conjunto','Grupo','Ano','Semestre','Valor','Situação','Unidade','Arquivo','Referência','URL','Ressalva','Tipo de valor','Anos com dados','Anos esperados','Fontes dos componentes',...(includeBounds?estimateColumns:[])],...rs.map(r=>{const s=source(r),notes=[r.semantic_note,estimateDescription(r),intakeOrigin(r),...new Set(vacancyReviews(r).map(v=>v.vacancy_reconciliation.note))].filter(Boolean).join(' | ');return [r.section,metricLabel(r.metric,r.section),r.course||r.department,r.scope||'',r.group||'',r.year,r.semester??'',r.value??'',r.status,r.unit||definition(r.metric,r.section).unit||'',base(s.file),locator(s),s.url||'',notes,r.derived_kind==='mean'?'Média':'Observação',r.n??'',r.expected_n??'',exportComponentSources(r),...(includeBounds?estimateCells(r):[])];})];
 }
 function metricExportRecords(section,metric,sems,entities){return [...sems.flatMap(s=>selectedYears().flatMap(y=>entities.map(e=>get(section,metric,y,s,e.id)))),...sems.flatMap(s=>entities.map(e=>average(section,metric,s,e.id)))];}
 function tableDownload(){
  if(csvRows.length<2)return '';
  const description=state.tab==='series'?`Todos os dados dos indicadores em um único arquivo · ${courses.length} cursos · ${range()}.`:'Todos os dados das tabelas em um único arquivo.';
  return `<section class="panel grad-series-download"><div><h2>Tabelas para download</h2><p>${esc(description)}</p></div><button class="button" data-grad-action="csv">Baixar todas as tabelas (CSV)</button></section>`;
 }
 function series(){
  const entities=courses,items=courseMetricIds.map(metric=>({section:'cursos',metric,entities,sems:metric==='matriculados'?[1,2]:[null]}));
  csvRecords(items.flatMap(({metric,sems})=>metricExportRecords('cursos',metric,sems,entities)));
  const scopeNote=entities.some(c=>c.id==='BMAC + BMA')&&selectedYears().some(y=>!reportedIntake(get('cursos','ingressantes',y,null,'BMAC + BMA')))?`<p class="note" data-grad-inep-scope>Ingressantes · Inep · ${esc(inepScopeNote)}</p>`:'';
  return periodPanels(items,scopeNote);
 }
 const departmentNames={MAC:'Ciência da Computação',MAT:'Matemática',MAP:'Matemática Aplicada',MAE:'Estatística','450':'Disciplinas interdepartamentais'};
 const departmentColors={MAC:colors[0],MAT:colors[1],MAP:colors[2],MAE:colors[3],'450':colors[4]};
 function jupiterEntities(){
  return (D.jupiter_departments||[]).map(d=>({...d,id:String(d.id),name:departmentNames[String(d.id)]||d.name||d.label||String(d.id),color:departmentColors[String(d.id)]||colors[5]})).filter(d=>!isSectionRegistry||comparisonDepartments.includes(d.id));
 }
 function department(){
  const items=[],entities=jupiterEntities(),entityIds=new Set(entities.map(d=>d.id));
  const periodsByMetric=new Map(),available=new Set();
  for(const record of jupiterRecords){
   if(!entityIds.has(record.department))continue;
   if(!periodsByMetric.has(record.metric))periodsByMetric.set(record.metric,new Set());
   periodsByMetric.get(record.metric).add(record.semester);
   if(numeric(comparisonCreditRecord(record)))available.add(record.metric);
  }
  for(const [metric,periods] of periodsByMetric){
   if(available.has(metric))items.push({section:'departamento_jupiter',metric,entities,sems:[null,1,2].filter(semester=>periods.has(semester))});
  }
  const yearbook=records.filter(r=>r.section==='anuario_departamento'&&r.metric==='disciplinas_ministradas');
  if(yearbook.some(numeric)){
   const departments=new Set(yearbook.map(r=>r.department));
   const periods=new Set(yearbook.map(r=>r.semester));
   items.push({section:'anuario_departamento',metric:'disciplinas_ministradas',entities:allAnuarioEntities().filter(d=>departments.has(d.id)),sems:[1,2].filter(semester=>periods.has(semester))});
  }
  if(!items.length){csvRecords([]);return '<div class="empty-state"><h2>Nenhum indicador com dados neste conjunto</h2></div>';}
  csvRecords(items.flatMap(({section,metric,sems,entities})=>metricExportRecords(section,metric,sems,entities)));
  const coverageLink='<p class="note" data-grad-common-comparison><a class="text-button" href="#graduation/coverage">Cobertura e lacunas →</a></p>';
  const nominal=creditMetricIds.some(metric=>available.has(metric))?`<p class="note" data-grad-credit-comparison>${commonCreditPeriods.size} recortes com cobertura comum de créditos e carga nominal · NC: fora da comparação · <a href="#graduation/additional">Ver valores complementares</a></p>`:'';
  return periodPanels(items,coverageLink+nominal);
 }
 function creditComplementRecords(){return jupiterRecords.filter(r=>comparisonDepartments.includes(r.department)&&years.includes(r.year)&&creditMetricIds.includes(r.metric)&&numeric(r)&&!commonCreditPeriods.has(creditPeriodKey(r.year,r.semester)));}
 function coverageSummary(){
  const registryMetricIds=[...new Set(jupiterRecords.map(r=>r.metric))].filter(m=>!creditMetricIds.includes(m)&&!outcomeMetricIds.includes(m));
  const extra=creditComplementRecords(),unresolved=new Map();
  const departments=comparisonDepartments.map(id=>{
   const rs=jupiterRecords.filter(r=>r.department===id&&years.includes(r.year)),credits=rs.filter(r=>r.metric===creditMetricIds[0]&&numeric(r));
   rs.filter(r=>r.metric===creditMetricIds[0]).forEach(r=>(creditProof(r)?.unresolved||[]).forEach(v=>unresolved.set([id,v.code,v.version,v.reason].join('|'),{...v,department:id})));
   const publicPeriods=years.flatMap(y=>[1,2].filter(s=>{const ars=records.filter(r=>r.section==='anuario_departamento'&&r.department===id&&r.year===y&&r.semester===s);return ars.length>0&&ars.every(numeric);}).map(s=>creditPeriodKey(y,s)));
   const registryPeriods=years.flatMap(y=>[null,1,2].filter(s=>registryMetricIds.length>0&&registryMetricIds.every(m=>numeric(rawGet('departamento_jupiter',m,y,s,id)))).map(s=>creditPeriodKey(y,s)));
   return {id,name:departmentNames[id],sections:rs.filter(r=>r.metric==='turmas'&&r.semester==null&&numeric(r)).reduce((sum,r)=>sum+r.value,0),publicPeriods:publicPeriods.length,registryPeriods:registryPeriods.length,creditPeriods:credits.length,missingCreditPeriods:years.length*3-credits.length,additionalCreditPeriods:extra.filter(r=>r.department===id&&r.metric===creditMetricIds[0]).length};
  });
  return {departments,registryMetricIds,commonCreditPeriodCount:commonCreditPeriods.size,commonCreditCells:commonCreditPeriods.size*comparisonDepartments.length*creditMetricIds.length,additionalCreditCells:extra.length,missingCreditPeriods:departments.reduce((sum,d)=>sum+d.missingCreditPeriods,0),unavailableVersions:[...unresolved.values()].filter(v=>v.reason==='public_exact_version_unavailable'),validityConflicts:[...unresolved.values()].filter(v=>v.reason==='section_ends_after_public_deactivation')};
 }
 function creditStatusCell(department,year,semester){const r=rawGet('departamento_jupiter',creditMetricIds[0],year,semester,department),kind=numeric(r)?commonCreditPeriods.has(creditPeriodKey(year,semester))?'common':'additional':'missing',label={common:'Comum',additional:'Complementar',missing:'Falta prova'}[kind];return `<button class="grad-coverage-status grad-coverage-${kind}" data-grad-credit-state="${kind}" data-grad-source="${ref(r)}" aria-label="${esc(department+' '+year+' '+semLabel(semester)+': '+label+'; consultar comprovação')}">${label}</button>`;}

// Helpers para copiar para a closure de grad.js; não alteram os dados de origem.
function coverageExport(summary){
  csvRows=[['Tabela','Entidade','Nome','Ano','Período','Indicador','Valor','Situação','Unidade','Universo de recortes','Fonte','Acesso','Arquivo','Referência','URL','Componente ABI','Situação ABI','Unidade ABI','Fonte ABI','Observações',...estimateColumns]];
  const add=(table,entity,name,year,period,metric,value,status,unit,universe,s={},notes='',abis=[],record=null)=>csvRows.push([table,entity,name,year,period,metric,value??'',status,unit,universe,s.title||s.id||'',accessLabel(s),base(s.file),locator(s),s.url||'',abiField(abis,'value'),abiField(abis,'status'),abiField(abis,'unit'),abis.map(abi=>(abis.length>1?(abi.course||'ABI')+': ':'')+sourceText(source(abi))).join(' | '),notes,...estimateCells(record)]);
  const target=years[0]+'–'+years.at(-1),pub={title:'Anuário USP — tabela 3.02',access:'public'},mixed={title:'Fichas públicas × cadastro autenticado do Júpiter',access:'mixed'};
  const publicMetricCount=new Set(records.filter(r=>r.section==='anuario_departamento'&&comparisonDepartments.includes(r.department)).map(r=>r.metric)).size;
  summary.departments.forEach(d=>{
    const auth={title:'Júpiter — Relatório de Disciplinas e Turmas',access:'authenticated',url:source(jupiterRecords.find(r=>r.department===d.id)).url};
    const counts=[['Turmas cadastradas',d.sections,'turmas','',auth],['Indicadores públicos do Anuário',publicMetricCount,'indicadores','',pub],['Recortes públicos do Anuário',d.publicPeriods,'recortes',years.length*2,pub],['Indicadores do cadastro autenticado',summary.registryMetricIds.length,'indicadores','',auth],['Recortes do cadastro autenticado',d.registryPeriods,'recortes',years.length*3,auth],['Recortes de créditos obtidos',d.creditPeriods,'recortes',years.length*3,mixed],['Recortes de créditos comuns',summary.commonCreditPeriodCount,'recortes',years.length*3,mixed],['Recortes de créditos complementares',d.additionalCreditPeriods,'recortes',years.length*3,mixed],['Recortes de créditos ainda sem prova',d.missingCreditPeriods,'recortes',years.length*3,mixed]];
    counts.forEach(([metric,value,unit,universe,s])=>add('Resumo departamental',d.id,d.name,target,'',metric,value,'calculated',unit,universe,s,'Anual e semestres se sobrepõem; estes recortes não devem ser somados.'));
  });
  comparisonDepartments.forEach(department=>years.forEach(year=>[null,1,2].forEach(semester=>{
    const credit=rawGet('departamento_jupiter',creditMetricIds[0],year,semester,department);
    const status=numeric(credit)?commonCreditPeriods.has(creditPeriodKey(year,semester))?'Comum':'Complementar':'Falta prova';
    creditMetricIds.forEach(metric=>{
      const r=rawGet('departamento_jupiter',metric,year,semester,department),name=summary.departments.find(d=>d.id===department)?.name||department;
      add('Créditos por período',department,name,year,semLabel(semester),metricLabel(metric,'departamento_jupiter'),numeric(r)?r.value:null,status,r.unit||'',years.length*3,source(r),['Situação do indicador: '+(r.status||'ND'),r.semantic_note,...(r.qualifiers||[])].filter(Boolean).join(' | '));
    });
  })));
  courses.forEach(c=>years.forEach(year=>{
    const r=rawGet('cursos','ingressantes',year,null,c.id);
    const abis=abiComponents(r);
    add('Ingressantes por curso',c.id,c.name,year,'Anual','Ingressantes',numeric(r)?r.value:null,r.status||'ND',r.unit||'ingressantes',years.length,source(r),[r.semantic_note,estimateDescription(r),...(r.qualifiers||[]),abis.length&&!numeric(r)?'Sem comprovação da ausência de sobreposição, ABI e habilitações não são somadas; o total permanece ND.':'',exportComponentSources(r)].filter(Boolean).join(' | '),abis,r);
  }));
}

function sourcesExport(visibleSources,collection){
  csvRows=[['Tabela','Entidade','Nome','Ano','Indicador','Valor','Situação','Unidade','Fonte','Acesso','Arquivo','Referência','URL','Observações']];
  const joined=(ss,fn)=>[...new Set(ss.map(fn).filter(v=>v!==undefined&&v!==null&&v!==''))].join(' | ');
  const add=(table,entity,name,year,metric,value,status,unit,ss=[],notes='')=>csvRows.push([table,entity,name,year,metric,value??'',status,unit,joined(ss,s=>s.title||s.id),joined(ss,accessLabel),joined(ss,s=>base(s.file)),joined(ss,locator),joined(ss,s=>s.url),notes]);
  visibleSources.forEach(s=>add('Fontes',s.id||'',s.title||s.id||'','','Referência da fonte','','','',[s],s.description||''));
  (collection.coverage||[]).forEach(c=>{
    const name=(D.jupiter_departments||[]).find(d=>String(d.id)===String(c.department))?.name||c.department;
    const s={title:'Júpiter — Relatório de Disciplinas e Turmas',access:c.access,url:source(jupiterRecords.find(r=>r.department===c.department)).url};
    const complete=c.completeness==='observed_registry_rows_only'?'Registros observados no cadastro; não certifica cobertura universal.':c.completeness||'Não informada';
    add('Cobertura da coleta Júpiter',c.department,name,(c.observed_years||[]).join(', '),collection.dataset_kind==='course_section_registry'?'Turmas no lote':'Registros no lote',c.row_count,Number.isFinite(c.row_count)?'observed':'ND','registros',[s],['Cobertura: '+complete,collection.description,collection.methodology,...(collection.notes||[])].filter(Boolean).join(' | '));
  });
}

 function coverageView(embedded=false){
  const summary=coverageSummary(),publicMetricIds=[...new Set(records.filter(r=>r.section==='anuario_departamento'&&comparisonDepartments.includes(r.department)).map(r=>r.metric))],missingResults=outcomeMetricIds.map(m=>metricLabel(m,'departamento_jupiter'));
  coverageExport(summary);
  const periodLists=[null,1,2].map(s=>`${semLabel(s)}: ${years.filter(y=>commonCreditPeriods.has(creditPeriodKey(y,s))).join(', ')||'nenhum'}`).join(' · ');
  const courseIngressos=courses.map(c=>({c,rs:records.filter(r=>r.section==='cursos'&&r.course===c.id&&r.metric==='ingressantes')}));
  return `${embedded?'':`<div class="section-heading" data-grad-coverage><div><h2>Cobertura e lacunas · graduação</h2><p>2012–2025 · mesma estrutura para MAC, MAT, MAP e MAE. Este quadro mostra o acervo obtido e o que ainda precisa de fonte ou comprovação.</p></div></div>`}${!hasCommonDepartments?'<div class="callout warning">O cadastro comum ainda não está incorporado nesta versão. Ausências não equivalem a zero.</div>':''}<div class="grad-coverage-key"><span class="grad-access-label">Pública · sem login</span><span class="grad-access-label">Autenticada · sessão Júpiter</span><span class="grad-access-label">Mista · catálogo público × turmas autenticadas</span></div><div class="methods-grid"><article class="method"><h3>Público · Anuário USP</h3><p>${esc(publicMetricIds.map(m=>metricLabel(m,'anuario_departamento')).join('; '))||'Disciplinas ministradas, turmas teóricas/práticas e suas dimensões médias.'} A publicação aberta tem fonte institucional Sistema Júpiter e dispensa autenticação.</p><a class="text-button" href="#graduation/anuario">Ver as séries públicas →</a></article><article class="method"><h3>Autenticado · cadastro Júpiter</h3><p>Os CSV do Relatório de Disciplinas e Turmas foram obtidos na sessão autorizada. Contêm disciplinas, turmas, matrículas e vagas por categoria, tamanho de turma e cargas cadastradas.</p><p>Matrículas são vínculos; os prefixos não comprovam lotação docente, curso do estudante, pessoas únicas ou carga docente efetiva.</p><a class="text-button" href="#graduation/department">Ver a comparação comum →</a></article><article class="method"><h3>Mista · créditos e carga nominal</h3><p>As fichas de disciplinas com versões datadas são públicas. Sua multiplicação pelas turmas históricas utiliza o cadastro autenticado. Só se publica total quando toda a composição e a vigência estão comprovadas.</p><p>A comparação retém ${summary.commonCreditPeriodCount} recortes igualmente comprovados nos quatro departamentos (${summary.commonCreditCells} valores). Os ${summary.additionalCreditCells} valores adicionais já obtidos ficam separados.</p></article></div><div class="callout" data-grad-equal-credit-periods><strong>Cobertura comum dos créditos e da carga nominal.</strong> ${esc(periodLists)}. Selecionar menos departamentos não amplia essa cobertura. NC = fora da cobertura comum; ND = dado ou prova ainda ausente. Os excedentes já obtidos não são lacunas de coleta.</div><section class="grad-coverage-gaps" data-grad-missing-data><h3>O que falta obter</h3><div class="callout warning"><strong>1. Relatórios de aproveitamento comparáveis de 2012–2025 para todos os departamentos.</strong> Ainda faltam no conjunto comum: ${esc(missingResults.join('; '))}. O CSV consultado não contém esses campos. A incorporação depende de fonte pública ou relatório autenticado equivalente para todos os departamentos.</div><div class="callout warning"><strong>2. Prova integral de créditos/carga em ${summary.missingCreditPeriods} recortes departamentais.</strong> As pendências identificadas abrangem ${summary.unavailableVersions.length} versões exatas ainda não obtidas publicamente e ${summary.validityConflicts.length} pares disciplina/versão com término de turma posterior à desativação publicada. Estes últimos exigem reconciliar vigências e datas da oferta; baixar a mesma ficha novamente não resolve o conflito. O detalhamento por período está no arquivo para download.</div></section><div class="callout" data-grad-interdepartmental-coverage><strong>450 · interdepartamental, fora dos quatro departamentos comparados.</strong> O cadastro autenticado contém nove turmas, uma por ano de 2017–2025, somente no S2. Os anos 2012–2016 e os S1 sem registros permanecem lacunas desse cadastro, sem inferir zero. O Anuário tem uma série pública própria desde 2017, inclusive zeros publicados no S1; as fontes e definições permanecem separadas.</div><p class="note">Ingressantes: ${courseIngressos.reduce((total,item)=>total+item.rs.filter(numeric).length,0)} valores disponíveis para ${courses.length} cursos, dos quais ${courseIngressos.reduce((total,item)=>total+item.rs.filter(estimated).length,0)} são estimados.</p>`;
 }
 function creditComplements(){
  const rs=creditComplementRecords().filter(r=>selectedYears().includes(r.year)).sort((a,b)=>comparisonDepartments.indexOf(a.department)-comparisonDepartments.indexOf(b.department)||a.year-b.year||(a.semester??0)-(b.semester??0)||creditMetricIds.indexOf(a.metric)-creditMetricIds.indexOf(b.metric));
  csvRecords(rs);const rows=rs.filter(r=>r.metric===creditMetricIds[0]);
  return rows.length?`<p class="note" data-grad-credit-additional>${rows.length} recortes departamentais · ${rs.length} valores complementares nesta seleção.</p>`:'<div class="empty-state"><h3>Não há valores complementares neste intervalo</h3><p>Os valores comuns estão na comparação; provas ainda ausentes estão em Cobertura e lacunas.</p></div>';
 }
 function interdepartmental(context){
  const section='departamento_jupiter',rs=jupiterRecords.filter(r=>r.department==='450'),available=[...new Set(rs.filter(numeric).map(r=>r.metric))];
  if(!available.length){csvRecords([]);return context+'<div class="empty-state"><h2>Nenhum indicador com dados para o prefixo 450</h2></div>';}
  if(!available.includes(state.interdepartmentalMetric))state.interdepartmentalMetric=available[0];
  const metric=state.interdepartmentalMetric,sems=state.interdepartmentalSemester==='annual'?[null]:state.interdepartmentalSemester==='both'?[1,2]:[+state.interdepartmentalSemester],entities=[{id:'450',name:departmentNames['450'],color:departmentColors['450']}];
  csvRecords(metricExportRecords(section,metric,sems,entities));
  viewControls+=`<div class="filter-control-group"><label>Indicador <select id="grad-interdepartmental-metric" class="select-control">${available.map(m=>`<option value="${esc(m)}" ${m===metric?'selected':''}>${esc(metricLabel(m,section))}</option>`).join('')}</select></label><label>Período <select id="grad-interdepartmental-semester" class="select-control">${[['annual','Anual'],['both','Semestres separados'],['1','1º semestre'],['2','2º semestre']].map(([id,label])=>`<option value="${id}" ${state.interdepartmentalSemester===id?'selected':''}>${label}</option>`).join('')}</select></label></div>`;
  const note='<p class="note" data-grad-interdepartmental>Prefixo interdepartamental 450 · cobertura do cadastro: 2017–2025, 2º semestre.</p>';
  return periodPanels([{section,metric,sems,entities}],context+note);
 }
 function additional(){
  if(!hasCommonDepartments)return '<div class="empty-state"><h2>Cadastro do Júpiter ainda não incorporado</h2></div>';
  const views=[['credits','Créditos/carga adicionais por departamento'],['interdepartmental','Prefixo interdepartamental 450']];
  if(!views.some(([id])=>id===state.additionalView))state.additionalView='credits';
  const context='<p class="note" data-grad-additional>Créditos, cargas e ofertas interdepartamentais. <a class="text-button" href="#graduation/coverage">Cobertura e lacunas →</a></p>';
  viewControls=`<div class="filter-control-group"><label>Dados <select id="grad-additional-view" class="select-control">${views.map(([id,label])=>`<option value="${id}" ${id===state.additionalView?'selected':''}>${label}</option>`).join('')}</select></label></div>`;
  return state.additionalView==='interdepartmental'?interdepartmental(context):context+creditComplements();
 }
 const anuarioFallbackDepartments=[{id:'MAC',name:'Ciência da Computação'},{id:'MAT',name:'Matemática'},{id:'MAP',name:'Matemática Aplicada'},{id:'MAE',name:'Estatística'},{id:'450',name:'Disciplinas interdepartamentais'}];
 function allAnuarioEntities(){return (D.anuario_departments||anuarioFallbackDepartments).map((d,i)=>({...d,color:colors[i%colors.length]}));}
 function anuarioEntities(){return allAnuarioEntities().filter(d=>state.anuarioDepartments.has(d.id));}
 function anuario(){
  const section='anuario_departamento',subset=records.filter(r=>r.section===section&&r.metric!=='disciplinas_ministradas'),available=[...new Set(subset.map(r=>r.metric))];
  if(!subset.length)return '<div class="empty-state"><h2>Nenhum indicador disponível nesta consulta</h2><a class="text-button" href="#graduation/department">Consultar disciplinas →</a></div>';
  if(!available.includes(state.anuarioMetric))state.anuarioMetric=available[0];
  const metric=state.anuarioMetric,entities=anuarioEntities(),sems=state.anuarioSemester==='both'?[1,2]:[+state.anuarioSemester];
  const departments=D.anuario_departments||anuarioFallbackDepartments;
  viewControls=`<div class="filter-control-group"><label>Indicador <select id="grad-anuario-metric" class="select-control">${available.map(m=>`<option value="${esc(m)}" ${m===metric?'selected':''}>${esc(metricLabel(m,section))}</option>`).join('')}</select></label><label>Semestre <select id="grad-anuario-semester" class="select-control">${[['both','Ambos, separados'],['1','1º semestre'],['2','2º semestre']].map(([s,label])=>`<option value="${s}" ${state.anuarioSemester===s?'selected':''}>${label}</option>`).join('')}</select></label></div>`;
  viewOptions=selectionOptions(departments.map((d,i)=>({...d,color:colors[i%colors.length]})),state.anuarioDepartments,'grad-anuario-department','Departamentos','Departamentos do Anuário');
  csvRecords(metricExportRecords(section,metric,sems,entities));
  if(!entities.length)return '<div class="empty-state"><h2>Selecione pelo menos um departamento</h2><p>Os filtros de cursos não se aplicam a esta visão.</p></div>';
  return periodPanels([{section,metric,sems,entities}]);
 }
 const curriculumFields=[['class_hours','Horas de aula'],['class_credits','Créditos aula'],['work_hours','Horas de trabalho'],['work_credits','Créditos trabalho'],['printed_table_subtotal_hours','Subtotal impresso (h)'],['printed_credits_total','Total impresso (créditos)']];
 const issueLabels={printed_credit_components_do_not_sum_to_printed_total:'Os componentes de créditos não somam o total impresso.',printed_hour_components_do_not_sum_to_printed_total:'Os componentes de horas não somam o total impresso.'};
 function curriculumRecord(c,field,label){return {...c,section:'curriculos',metric:field,title:label+' · '+c.variant_label,value:c.values?.[field]??null,status:c.values?.[field]==null?'ND':c.status,unit:field.includes('hours')?'horas':'créditos',semantic_note:'Referência curricular publicada, não carga ministrada. Subtotal de tabela não equivale necessariamente ao total integral do curso.',qualifiers:[...(c.qualifiers||[]),...(c.issues||[]).map(i=>issueLabels[i]||'Divergência registrada na fonte; os valores originais foram mantidos.')]};}
 function curricula(){
  const rows=(D.curricula||[]).filter(c=>state.selected.has(c.course)&&c.year>=state.start&&c.year<=state.end);
  csvRows=[['Curso','Ano','Habilitação/variante',...curriculumFields.map(f=>f[1]),'Situação','Ressalvas','Fonte','Curso componente da referência'],...rows.map(c=>[c.course,c.year,c.variant_label,...curriculumFields.map(([f])=>c.values?.[f]??''),c.status,[...(c.issues||[]),...(c.qualifiers||[])].join(' | '),sourceText(source(c)),c.component_course||c.course])];
  if(!rows.length)return '<div class="empty-state"><h2>Nenhuma referência curricular nesta seleção</h2><p>Os catálogos incorporados são de 2024 e 2025. Não se presume uma versão curricular para cada ano.</p></div>';
  return `<div class="section-heading"><h2>Currículos</h2></div><p class="note">${rows.length} variantes nesta seleção · ${rows.filter(c=>c.status==='published_inconsistent').length} com divergência publicada sinalizada.</p>`;
 }
 function mergeCsvRows(...tables){
  const columns=[...new Set(tables.flatMap(table=>table[0]||[]))];
  return [columns,...tables.flatMap(table=>table.slice(1).map(row=>columns.map(column=>{const index=table[0].indexOf(column);return index<0?'':row[index]??'';})))];
 }
 function sourcesView(){
  const aggregationLabels={sum_courses_same_year_and_semester_only:'Somar cursos somente dentro do mesmo ano e semestre; semestres permanecem separados.',sum_courses_same_year:'Somar cursos dentro do mesmo ano, sem misturar universos.',unavailable:'Não substituir por outro indicador.'};
  const allSources=D.sources||[],visibleSources=allSources.filter(s=>state.sourceAccess==='all'||sourceAccess(s)===state.sourceAccess),accessTypes=[...new Set(allSources.map(sourceAccess))];
  const collection=D.jupiter_collection||{},commonCollection=hasCommonDepartments?`<details class="table-disclosure grad-data-panel"><summary>Coleta do Júpiter · cobertura e critérios</summary><div class="callout">${[collection.description,collection.methodology,...(collection.notes||[])].filter(Boolean).map(n=>`<p>${esc(n)}</p>`).join('')}</div></details>`:'';
  const readingCriteria=`<div class="methods-grid"><article class="method"><h3>Créditos e cobertura comum</h3><p>A comparação de créditos e carga nominal usa somente os recortes integralmente comprovados nos quatro departamentos. Selecionar menos departamentos não amplia essa cobertura. NC identifica recortes fora da comparação; ND indica falta de dado ou prova. Os valores adicionais documentados estão em Dados complementares.</p><p>Recortes anuais e semestrais se sobrepõem: não somar anual e semestres, nem somar os valores complementares à comparação comum.</p></article><article class="method"><h3>Prefixo interdepartamental 450</h3><p>O prefixo 450 é interdepartamental e fica separado de MAC, MAT, MAP e MAE. O cadastro incorporado contém nove turmas, uma por ano de 2017–2025, no segundo semestre. Anos e semestres sem registro permanecem ND.</p></article><article class="method"><h3>Referências curriculares</h3><p>As referências de 2024 e 2025 descrevem currículos, não aulas ministradas. Habilitações e turnos são alternativas e não se somam. Subtotais impressos podem excluir AAC ou extensão apresentadas separadamente. Consulte o Júpiter para as versões oficiais.</p></article><article class="method"><h3>Recortes do Anuário</h3><p>A Tabela 3.02 reúne disciplinas, turmas e dimensões médias por departamento. As médias são arredondadas. Uma disciplina oferecida nos dois semestres aparece em ambas as contagens.</p></article></div>`;
  const commonMethods=hasCommonDepartments&&Object.keys(commonMetricDefs).length?`<div class="section-heading"><div><h2>Critérios · ${esc(commonDepartmentTitle)}</h2><p>Definições próprias da fonte comum do Júpiter.</p></div></div><div class="methods-grid">${Object.entries(commonMetricDefs).map(([id,d])=>`<article class="method"><h3>${esc(d.label||id)}</h3><p>${esc(d.description||'Consulte a origem de cada valor.')}</p></article>`).join('')}</div>`:'';
  viewControls=`<div class="filter-control-group"><label>Origem <select id="grad-source-access" class="select-control"><option value="all" ${state.sourceAccess==='all'?'selected':''}>Todas as fontes</option>${accessTypes.map(a=>`<option value="${a}" ${a===state.sourceAccess?'selected':''}>${esc(accessLabels[a])}</option>`).join('')}</select></label><span class="note">${visibleSources.length} de ${allSources.length} fontes</span></div>`;
  const coverageHTML=coverageView(true),coverageRows=csvRows;
  sourcesExport(visibleSources,collection);
  csvRows=mergeCsvRows(csvRows,coverageRows);
  return `<details class="table-disclosure grad-coverage-panel" data-grad-coverage-details${state.coverageOpen?' open':''}><summary>Cobertura e lacunas</summary>${coverageHTML}</details><ul class="source-list" aria-label="Fontes da graduação">${visibleSources.map(s=>`<li class="source-row">${safeURL(s.url)?`<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title||s.id)} ↗</a>`:`<span>${esc(s.title||s.id)}</span>`}<small>${esc(accessLabel(s))}</small></li>`).join('')}</ul><div class="methods-grid">${Object.entries(metricDefs).filter(([id])=>!hiddenCourseMetricIds.has(id)).map(([id,d])=>`<article class="method"><h3>${esc(metricLabel(id))}</h3><p>${esc(d.description||'')}</p>${aggregationLabels[d.aggregation]?`<p>${esc(aggregationLabels[d.aggregation])}</p>`:''}</article>`).join('')}</div>${readingCriteria}${commonCollection}${commonMethods}`;
 }
 function selectionOptions(entities,selected,attribute,label,accessibleLabel=label){
  return `<div class="filter-options" role="group" aria-label="${esc(accessibleLabel)}"><span class="filter-label">${esc(label)}</span>${entities.map(e=>`<label class="program-chip" title="${esc(e.name)}"><input type="checkbox" data-${attribute}="${esc(e.id)}" aria-label="${esc(e.name)}" ${selected.has(e.id)?'checked':''}><i class="program-dot" style="background:${e.color||colors[0]}"></i><strong>${esc(e.short_name||e.id)}</strong></label>`).join('')}</div>`;
 }
 function filters(){
  if(state.tab==='series'||state.tab==='department'||state.tab==='coverage')return '';
  if(state.tab==='sources')return `<section class="filters sticky-filters grad-filters" aria-label="Filtros das fontes"><div class="filter-control-row">${viewControls}</div></section>`;
  const options=viewOptions||(state.tab==='curricula'?selectionOptions(courses,state.selected,'grad-course','Cursos','Cursos de graduação'):`<span class="filter-label">${state.tab==='additional'?'Dados complementares':'Graduação'}</span>`);
  const yearsRow=`<div class="year-controls filter-control-group"><label>De <select id="grad-start">${years.map(y=>`<option ${y===state.start?'selected':''}>${y}</option>`).join('')}</select></label><span>—</span><label>Até <select id="grad-end">${years.map(y=>`<option ${y===state.end?'selected':''}>${y}</option>`).join('')}</select></label><button class="text-button reset-button" data-grad-action="reset">Restaurar</button></div>`;
  const controls=viewControls?`<div class="filter-control-row">${viewControls}</div>`:'';
  return `<section class="filters sticky-filters grad-filters" aria-label="Filtros de graduação"><div class="filter-control-row">${options}${yearsRow}</div>${controls}</section>`;
 }
 function render(){
  if(!root)return;refs=new Map();refId=0;chartId=0;csvRows=[];viewControls='';viewOptions='';
  const active=document.activeElement,focusId=active?.id,focusData=[['grad-course',active?.dataset?.gradCourse],['grad-anuario-department',active?.dataset?.gradAnuarioDepartment]].find(([,value])=>value);
  if(!courses.length){root.innerHTML='<div class="empty-state"><h2>Base de graduação ainda não incorporada</h2><p>A seção permanece separada dos dados da pós-graduação.</p></div>';return;}
  const content=state.tab==='curricula'&&!state.selected.size?'<div class="empty-state"><h2>Selecione pelo menos um curso</h2><button class="button" data-grad-action="all">Selecionar todos</button></div>':({series,department,additional,coverage:coverageView,anuario,curricula,sources:sourcesView})[state.tab]();
  root.innerHTML=`${filters()}${state.tab==='sources'?ingressoNote(true):''}${content}${tableDownload()}`;
  if(focusData)root.querySelector('[data-'+focusData[0]+'="'+esc(focusData[1])+'"]')?.focus({preventScroll:true});else if(focusId?.startsWith('grad-'))document.getElementById(focusId)?.focus({preventScroll:true});
  window.SIAPOS_FILTERS?.refresh();
 }
 function creditProofDetails(r){const p=creditProof(r);if(!p)return '';const count=v=>typeof v==='number'&&Number.isFinite(v)?number(v):'ND',reasons={public_exact_version_unavailable:'Versão exata não disponível na consulta pública.',section_ends_after_public_deactivation:'A oferta termina após a desativação publicada da versão.'},evidence=p.version_evidence||[],unresolved=p.unresolved||[];return `<details class="grad-linked-sources"><summary>Comprovação por versão · ${count(p.sections_matched)} de ${count(p.sections_expected)} turmas</summary><p>${p.complete?'As versões documentadas cobrem todas as turmas deste recorte.':'A comprovação é parcial; as pendências permanecem identificadas e não estabelecem um total histórico completo.'}</p><p>Créditos-aula nominais: ${count(p.class_credits_total)} · Carga nominal de aulas: ${count(p.class_hours_total)} h.</p>${evidence.length?`<div class="table-wrap"><table class="data-table"><thead><tr><th>Disciplina</th><th>Versão</th><th>Turmas</th><th>Créditos-aula</th><th>Vigência da ficha</th><th>Ofertas consideradas</th><th>Ficha pública</th></tr></thead><tbody>${evidence.map(v=>`<tr><td>${esc(v.code)}</td><td>${esc(v.version)}</td><td>${count(v.sections)}</td><td>${count(v.class_credits)}</td><td>${esc(v.activation||'Não informada')} — ${esc(v.deactivation||'Sem desativação publicada')}</td><td>${esc(v.min_section_start||'Não informado')} — ${esc(v.max_section_end||'Não informado')}</td><td>${safeURL(v.source_url)?`<a href="${esc(v.source_url)}" target="_blank" rel="noopener noreferrer">Abrir ficha ↗</a>`:'ND'}</td></tr>`).join('')}</tbody></table></div>`:''}${unresolved.length?`<h3>Pendências da comprovação</h3><div class="table-wrap"><table class="data-table"><thead><tr><th>Disciplina</th><th>Versão</th><th>Turmas</th><th>Motivo</th></tr></thead><tbody>${unresolved.map(v=>`<tr><td>${esc(v.code)}</td><td>${esc(v.version)}</td><td>${count(v.sections)}</td><td>${esc(reasons[v.reason]||v.reason||'Não informado')}</td></tr>`).join('')}</tbody></table></div>`:''}</details>`;}
 function briefSource(r,s){
  if(r.records)return '';
  if(reportedIntake(r))return '<p class="source-credit">Fonte · '+esc(reportedIntakeLabel)+'</p>';
  const routes=[...new Set(vacancyReviews(r).flatMap(v=>(v.vacancy_reconciliation.components||[]).map(c=>c.route)).filter(Boolean))];
  if(routes.length)return '<p class="source-credit">Vias de ingresso · '+esc(routes.join(' e '))+'</p>';
  const title=s.title||base(s.file);
  if(!title)return '';
  const name=isSectionRegistry&&r.section==='departamento_jupiter'?title.replace(/ — prefixo [^·]+$/i,''):title;
  const link=safeURL(s.url)?`<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(name)} ↗</a>`:esc(name);
  const access=sourceAccess(s);
  return `<p class="source-credit">Fonte · ${link}${access==='authenticated'?' · Consulta autenticada':access==='mixed'?' · Origem mista':''}</p>`;
 }
 function briefReading(r){
  const notes=[];
  if(r.derived_kind==='mean')notes.push(`Média de ${r.n} de ${r.expected_n} anos com dados.`);
  if(r.status==='NC'){
   const original=r.comparison_original_record;
   notes.push(numeric(original)?`Fora da comparação comum. Valor documentado neste departamento: ${format(original)}.`:'Sem cobertura comum para comparar os departamentos.');
  }else if(r.status==='NA')notes.push('O indicador não se aplica a este recorte.');
  else if(!numeric(r)&&r.metric!=='curriculo'){
   const proof=creditProof(r);
   notes.push(Number.isFinite(proof?.sections_matched)&&Number.isFinite(proof?.sections_expected)?`Cobertura documental de ${proof.sections_matched} de ${proof.sections_expected} turmas. Total indisponível.`:'Dado indisponível para este recorte.');
  }else if(estimated(r)){
   const interval=estimateRange(r);
   notes.push(interval?`Estimativa entre ${interval.split('–').join(' e ')}.`:'O valor inclui estimativa.');
  }else if(r.status==='published_inconsistent')notes.push('A fonte apresenta uma divergência neste valor.');
  else if(r.status==='published_rounded')notes.push('Média arredondada na fonte.');
  if(r.section==='departamento_jupiter'&&isSectionRegistry&&r.metric==='matriculas')notes.push('Soma das cinco categorias de matrícula. Um aluno pode aparecer em várias turmas.');
  return notes.map(note=>`<p>${esc(note)}</p>`).join('');
 }
 function modal(r){
  if(!r)return;const s=source(r),def=definition(r.metric,r.section),entity=courses.find(c=>c.id===r.course)?.name||(isSectionRegistry&&r.section==='departamento_jupiter'?'Prefixo '+r.department+' · '+(departmentNames[r.department]||r.department):'')||departmentNames[r.department]||(D.anuario_departments||[]).find(d=>d.id===r.department)?.name||r.department||r.course||'',label=def.label||r.title||r.metric;
  const isPrefix=isSectionRegistry&&r.section==='departamento_jupiter';
  const title=isPrefix&&r.metric==='matriculas'?'Matrículas nas turmas':label;
  const period=r.semester&&r.year?`${semLabel(r.semester)} de ${r.year}`:r.year;
  const context=[isPrefix?'Prefixo '+r.department:entity,period].filter(Boolean).join(' · ');
  const note=r.semantic_note||r.description||r.note||def.description;
  let details=note?`<p>${esc(note)}</p>`:'';
  if(estimated(r))details+=`<p data-grad-estimate-detail>${esc(estimateDescription(r))}</p>`;
  if(!reportedIntake(r)&&r.qualifiers?.length)details+=`<ul>${r.qualifiers.map(q=>`<li>${esc(q)}</li>`).join('')}</ul>`;
  if(r.records){details+=`<div class="table-wrap"><table class="data-table"><thead><tr><th>Ano</th><th>Valor</th><th>Fonte</th></tr></thead><tbody>${r.records.map(v=>`<tr><td>${esc(v.year)}</td><td>${esc([format(v),estimateRange(v)].filter(Boolean).join(' · '))}</td><td class="grad-source-ref">${esc(recordSourceText(v))}</td></tr>`).join('')}</tbody></table></div>`;}
  else if(!reportedIntake(r))details+=`<dl class="source-details"><dt>Fonte</dt><dd>${esc(s.title||base(s.file)||'Não disponível')}</dd><dt>Acesso</dt><dd>${esc(accessLabel(s))}</dd><dt>Referência</dt><dd>${esc(locator(s)||'Não disponível')}</dd></dl>${offeringSources(r)}${linkedSources(r)}`;
  details+=(reportedIntake(r)?intakeDetails(r):courseComponentDetails(r)+inepConsolidationDetails(r))+vacancyDetails(r)+(r.records&&(vacancyReviews(r).length||inepConsolidations(r).length)?linkedSources(r):'')+creditProofDetails(r);
  const body=`<p class="source-context">${esc(context)}</p>${r.metric==='curriculo'?'':`<div class="source-value">${esc(format(r,r.derived_kind==='mean'))}</div>`}${briefReading(r)}${r.status==='NC'?'<p><a href="#graduation/additional" data-grad-close>Ver dados complementares →</a></p>':''}${briefSource(r,s)}${details?`<details class="source-more"><summary>Detalhes da fonte</summary>${details}</details>`:''}`;
  copyText=[label,entity,r.year,semLabel(r.semester),format(r,r.derived_kind==='mean'),estimateDescription(r)||null,r.semantic_note||def.description,r.status==='NC'&&numeric(r.comparison_original_record)?'Valor documentado em Dados complementares: '+format(r.comparison_original_record):null,...(reportedIntake(r)?[]:r.qualifiers||[]),r.records?r.records.map(v=>v.year+': '+format(v)+'; '+recordSourceText(v)).join('\n'):recordSourceText(r)].filter(v=>v!=null).join('\n');
  document.getElementById('grad-source-title').textContent=title;document.getElementById('grad-source-content').innerHTML=body;document.getElementById('grad-source-dialog').showModal();
 }
 function download(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
 function exportCSV(){const text=csvRows.map(r=>r.map(v=>'"'+(typeof v==='number'?String(v).replace('.',','):String(v??'')).replace(/"/g,'""')+'"').join(';')).join('\r\n');download(new Blob(['\uFEFF'+text],{type:'text/csv;charset=utf-8'}),'dados-ime-grad-'+state.tab+(state.tab==='additional'?'-'+state.additionalView:'')+'-'+(state.tab==='coverage'?'2012-2025':range())+'.csv');}
 function exportSVG(id){const original=document.getElementById(id),clone=original.cloneNode(true),a=[original,...original.querySelectorAll('*')],b=[clone,...clone.querySelectorAll('*')];a.forEach((e,i)=>{const cs=getComputedStyle(e);['display','opacity','fill','stroke','font-size','font-weight','font-family'].forEach(k=>b[i].style.setProperty(k,cs.getPropertyValue(k)));['data-grad-source','data-tip','tabindex'].forEach(k=>b[i].removeAttribute(k));});download(new Blob([new XMLSerializer().serializeToString(clone)],{type:'image/svg+xml;charset=utf-8'}),'dados-ime-grad-'+state.tab+'-'+range()+'-'+id+'.svg');}
 const dialog=document.createElement('dialog');dialog.id='grad-source-dialog';dialog.setAttribute('aria-labelledby','grad-source-title');dialog.innerHTML='<div class="dialog-header"><h2 id="grad-source-title">Origem do indicador</h2><button class="icon-button" data-grad-close aria-label="Fechar origem">×</button></div><div id="grad-source-content"></div><div class="dialog-actions"><button class="button secondary" data-grad-copy>Copiar referência</button><button class="button" data-grad-close>Fechar</button></div>';document.body.appendChild(dialog);
 document.addEventListener('click',async e=>{
  const a=e.target.closest('[data-grad-source]');if(a){modal(refs.get(a.dataset.gradSource));return;}const svg=e.target.closest('[data-grad-svg]');if(svg){exportSVG(svg.dataset.gradSvg);return;}
  const period=e.target.closest('[data-grad-period]');if(period){[state.start,state.end]=period.dataset.gradPeriod.split(':').map(Number);render();return;}
  if(e.target.closest('[data-grad-close]')){dialog.close();return;}if(e.target.closest('[data-grad-copy]')){try{await navigator.clipboard.writeText(copyText);}catch{const t=document.createElement('textarea');t.value=copyText;dialog.appendChild(t);t.select();document.execCommand('copy');t.remove();}return;}
  const action=e.target.closest('[data-grad-action]')?.dataset.gradAction;if(action==='all'){state.selected=new Set(courses.map(c=>c.id));render();}if(action==='reset'){state.start=2012;state.end=2025;state.selected=new Set(courses.map(c=>c.id));state.anuarioSemester='both';state.anuarioDepartments=new Set(['MAC','MAT','MAP','MAE']);render();}if(action==='csv')exportCSV();
 });
 document.addEventListener('change',e=>{const t=e.target;if(t.id==='grad-additional-view'){state.additionalView=t.value;render();}if(t.id==='grad-interdepartmental-metric'){state.interdepartmentalMetric=t.value;render();}if(t.id==='grad-interdepartmental-semester'){state.interdepartmentalSemester=t.value;render();}if(t.dataset.gradCourse){if(t.checked)state.selected.add(t.dataset.gradCourse);else state.selected.delete(t.dataset.gradCourse);render();}if(t.id==='grad-start'){state.start=+t.value;if(state.start>state.end)state.end=state.start;render();}if(t.id==='grad-end'){state.end=+t.value;if(state.end<state.start)state.start=state.end;render();}if(t.id==='grad-anuario-metric'){state.anuarioMetric=t.value;render();}if(t.id==='grad-anuario-semester'){state.anuarioSemester=t.value;render();}if(t.dataset.gradAnuarioDepartment){if(t.checked)state.anuarioDepartments.add(t.dataset.gradAnuarioDepartment);else state.anuarioDepartments.delete(t.dataset.gradAnuarioDepartment);render();}if(t.id==='grad-source-access'){state.sourceAccess=t.value;render();}});
 document.addEventListener('toggle',e=>{if(e.target.matches?.('[data-grad-coverage-details]'))state.coverageOpen=e.target.open;},true);
 document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('svg [data-grad-source]')){e.preventDefault();e.target.dispatchEvent(new MouseEvent('click',{bubbles:true}));}});
 dialog.addEventListener('click',e=>{if(e.target===dialog){const b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)dialog.close();}});
 window.SIAPOS_GRADUACAO={hasCommonDepartments,departmentTitle:commonDepartmentTitle,departmentDatasetKind:commonDatasetKind,coverageSummary,creditComparisonPeriods:[...commonCreditPeriods],setTab(tab){state.coverageOpen=tab==='coverage';if(tab==='coverage')tab='sources';if(tab==='mac-adicional'){state.additionalView='credits';tab='additional';}state.tab=tabs.some(([id])=>id===tab)||['additional','curricula'].includes(tab)?tab:'series';return state.tab;},mount(container){root=container;render();}};
})();
