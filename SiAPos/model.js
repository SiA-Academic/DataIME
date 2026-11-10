(function(root){
  'use strict';
  const numeric = r => r && !['ND','NA'].includes(r.status) && typeof r.value === 'number' && Number.isFinite(r.value);
  function average(records){
    const valid=records.filter(numeric);
    if(!valid.length)return {value:null,status:records.length&&records.every(r=>r.status==='NA')?'NA':'ND',n:0,expected_n:records.length,records};
    return {value:valid.reduce((a,r)=>a+r.value,0)/valid.length,status:valid.some(r=>r.status==='approximate')?'approximate':'exact',n:valid.length,expected_n:records.length,records};
  }
  function sum(records){
    if(!records.length)return {value:null,status:'ND',n:0,expected_n:0,records};
    const relevant=records.filter(r=>r.status!=='NA');
    if(!relevant.length)return {value:null,status:'NA',n:0,expected_n:0,records};
    const valid=relevant.filter(numeric);
    if(valid.length!==relevant.length)return {value:null,status:'ND',n:valid.length,expected_n:relevant.length,records};
    return {value:valid.reduce((a,r)=>a+r.value,0),status:valid.some(r=>r.status==='approximate')?'approximate':'exact',n:valid.length,expected_n:relevant.length,records};
  }
  function share(numerator,allPrograms){
    const denominator=sum(allPrograms);
    if(!numeric(numerator)||!numeric(denominator))return {value:null,status:'ND',denominator:denominator.value};
    if(denominator.value===0)return {value:null,status:'NA',denominator:0};
    return {value:numerator.value/denominator.value,status:numerator.status==='approximate'||denominator.status==='approximate'?'approximate':'exact',denominator:denominator.value};
  }
  function centeredMedian3(years,values){
    return years.map((year,i)=>{
      if(years[i-1]!==year-1||years[i+1]!==year+1)return null;
      const windowValues=[values[i-1],values[i],values[i+1]];
      return windowValues.every(Number.isFinite)?windowValues.sort((a,b)=>a-b)[1]:null;
    });
  }
  root.PAINEL_MATH={numeric,average,sum,share,centeredMedian3};
})(typeof window==='undefined'?globalThis:window);

(function(root){
  'use strict';
  const choices=new Map();
  const esc=text=>String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const explanation='Em cada ano, a linha tracejada mostra a mediana dos valores do ano anterior, do próprio ano e do seguinte. Os três precisam ter dados.';
  function series(years,values,x,y,color,name){
    const medians=root.PAINEL_MATH.centeredMedian3(years,values);
    let path='',isolated='';
    medians.forEach((value,i)=>{
      if(value===null)return;
      const xx=x(i),yy=y(value);
      if(medians[i-1]==null&&medians[i+1]==null){
        isolated+=`<circle data-median-year="${years[i]}" cx="${xx}" cy="${yy}" r="4.6" stroke="${esc(color)}" stroke-width="2" fill="none"/>`;
      }else{
        path+=(medians[i-1]==null?'M':'L')+xx+','+yy+' ';
      }
    });
    if(!path&&!isolated)return '';
    const line=path?`<path d="${path.trim()}" fill="none" stroke="${esc(color)}" stroke-width="2.6" stroke-dasharray="7 4" stroke-linecap="round" stroke-linejoin="round"/>`:'';
    return `<g data-median-series="${esc(name)}"><title>${esc(name)} · Mediana móvel de 3 anos</title>${line}${isolated}</g>`;
  }
  function control(key,id,defaultOn=false){
    const enabled=choices.get(key)??defaultOn;
    return `<label class="chart-trend-control" title="${explanation}"><input type="checkbox" data-trend-toggle="${esc(key)}" aria-controls="${esc(id)}" aria-description="${explanation}" ${enabled?'checked':''}>Mediana móvel · 3 anos</label>`;
  }
  function svgKey(rightX){
    return `<desc>${explanation}</desc><g transform="translate(${rightX-212},13)" aria-hidden="true"><line x1="0" x2="18" y1="0" y2="0" stroke="currentColor" opacity=".34"/><circle cx="9" cy="0" r="2.7" fill="currentColor"/><text x="23" y="4" class="chart-text">Série original</text><line x1="100" x2="120" y1="0" y2="0" stroke="currentColor" stroke-width="2" stroke-dasharray="7 4"/><text x="125" y="4" class="chart-text">Mediana de 3 anos</text></g>`;
  }
  if(typeof document!=='undefined')document.addEventListener('change',e=>{
    const key=e.target.dataset?.trendToggle;
    if(key)choices.set(key,e.target.checked);
  });
  root.SIAPOS_TREND={series,control,svgKey};
})(typeof window==='undefined'?globalThis:window);

(function(root){
  'use strict';
  function refresh(){
    if(typeof document==='undefined')return;
    document.querySelectorAll?.('.sticky-filters').forEach(bar=>{
      const stuck=!bar.hidden&&bar.isConnected!==false&&root.scrollY>0&&bar.getBoundingClientRect().top<=0.5;
      bar.classList.toggle('is-stuck',stuck);
    });
  }
  root.SIAPOS_FILTERS={refresh};
  root.addEventListener?.('scroll',refresh,{passive:true});
  root.addEventListener?.('resize',refresh);
})(typeof window==='undefined'?globalThis:window);
