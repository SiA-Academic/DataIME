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
  root.PAINEL_MATH={numeric,average,sum,share};
})(typeof window==='undefined'?globalThis:window);
