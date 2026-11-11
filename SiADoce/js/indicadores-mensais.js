(() => {
  "use strict";
  const data = window.SIADOCE_DADOS.mensal;
  if (!data) return;
  const rows = data.meses;
  const byId = id => document.getElementById(id);
  const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const number = value => value == null ? "—" : value.toLocaleString("pt-BR");
  const date = value => value ? value.split("-").reverse().join("/") : "não informada";
  const known = key => rows.filter(row => row[key] != null);
  const sum = key => known(key).reduce((n,row) => n + row[key],0);
  const partial = (row,key) => row[key] != null && row.titulados_parcial;
  const scope = "plenos, específicos e vencidos com orientando";
  const source = row => row.titulados == null ? "Fora da cobertura de janus.pdf" : "janus.pdf · Data situação · " + date(row.titulados_inicio) + " a " + date(row.titulados_fim) + " · " + scope;
  const card = (label,value,detail) => '<article><span>'+label+'</span><strong'+(typeof value==="string"?' class="missing-number"':'')+'>'+number(value)+'</strong><small>'+detail+'</small></article>';
  byId("monthly-period").textContent = data.fonte_titulados_periodo + " · todos os anos do período";
  const coverage = known("titulados").length+" de "+rows.length+" meses com informação";
  byId("monthly-summary").innerHTML =
    card("Mestrado",known("titulados").length ? sum("titulados_me") : "Sem dados",coverage) +
    card("Doutorado / direto",known("titulados").length ? sum("titulados_do_dd") : "Sem dados",coverage) +
    card("Total de titulados",known("titulados").length ? sum("titulados") : "Sem dados",coverage);
  byId("monthly-coverage").textContent = "Cobertura: "+coverage+". “—” significa mês fora da cobertura do PDF, não zero. * identifica um mês parcialmente coberto.";
  byId("titulados-coverage").textContent=data.anos.length+" anos";
  const fields=["titulados_me","titulados_do_dd","titulados"];
  byId("monthly-rows").innerHTML=rows.map(row=>'<tr'+(row.corrente?' class="is-current"':'')+'><th scope="row">'+esc(row.rotulo)+(row.corrente?'<small>mês corrente</small>':'')+'</th>'+fields.map(key=>'<td'+(row[key]==null?' class="unavailable"':'')+'><abbr tabindex="0" title="'+esc(source(row,key))+'">'+number(row[key])+(partial(row,key)?"*":"")+'</abbr></td>').join("")+'</tr>').join("");

  function chart(id,series) {
    const container=byId("chart-"+id);
    const years=data.anos;
    const monthNames=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];
    const W=1120,L=75,R=118,rowH=180,T=32,B=29,plotW=W-L-R,plotH=rowH-T-B,step=plotW/12;
    const rawMax=Math.max(...rows.map(row=>row.titulados??0),1);
    const tick=Math.max(1,Math.ceil(rawMax/3)),max=tick*3;
    const annualMax=Math.max(...years.map(year=>rows.filter(row=>row.mes.startsWith(year+"-")).reduce((n,row)=>n+(row.titulados??0),0)),1);
    const annualTick=Math.max(1,Math.ceil(annualMax/3)),annualScale=annualTick*3;
    const totalX=W-39,totalWidth=36;
    const x=i=>L+step*(i+.5);
    let svg='<svg viewBox="0 0 '+W+' '+(years.length*rowH)+'" role="img" aria-label="Titulações por mês e total de cada ano; totais com escala própria"><title>Janeiro a dezembro e total alinhados em cada ano</title>';
    years.forEach((year,index)=>{
      const top=index*rowH;
      const y=n=>top+T+plotH-(n/max)*plotH;
      const yearRows=rows.filter(row=>row.mes.startsWith(year+"-"));
      const available=yearRows.filter(row=>row.titulados!=null);
      const isPartial=available.length<12||available.some(row=>row.titulados_parcial);
      const total=available.length?available.reduce((n,row)=>n+row.titulados,0):null;
      svg+='<g data-chart-year="'+year+'"><text class="chart-year" x="8" y="'+(top+20)+'">'+year+'</text>';
      svg+='<text x="'+(W-10)+'" y="'+(top+14)+'" text-anchor="end">'+available.length+'/12 meses</text>';
      for(let n=0;n<=max;n+=tick)svg+='<line class="grid-line" x1="'+L+'" x2="'+(W-R)+'" y1="'+y(n)+'" y2="'+y(n)+'"/><text x="'+(L-9)+'" y="'+(y(n)+4)+'" text-anchor="end">'+n+'</text>';
      yearRows.forEach(row=>{
        const i=Number(row.mes.slice(5))-1;
        if(row.corrente)svg+='<rect class="current-month" x="'+(L+i*step)+'" y="'+(top+T)+'" width="'+step+'" height="'+plotH+'"/>';
        svg+='<text x="'+x(i)+'" y="'+(top+rowH-10)+'" text-anchor="middle">'+monthNames[i]+'</text>';
        if(row.titulados==null){
          svg+='<text x="'+x(i)+'" y="'+(y(0)-8)+'" text-anchor="middle"><title>'+esc(row.rotulo)+': fora da cobertura</title>—</text>';
          return;
        }
        let stacked=0;
        series.forEach(s=>{
          const value=row[s.key];
          if(value===0)return;
          const tip=row.rotulo+' · '+s.label+': '+value+(partial(row,s.key)?'*':'')+' · '+source(row);
          svg+='<rect class="chart-point" tabindex="0" aria-label="'+esc(tip)+'" x="'+(x(i)-step*.26)+'" y="'+y(stacked+value)+'" width="'+(step*.52)+'" height="'+(value/max*plotH)+'" fill="'+s.color+'"'+(partial(row,s.key)?' opacity=".65"':'')+'><title>'+esc(tip)+'</title></rect>';
          stacked+=value;
        });
        svg+='<text class="chart-count" x="'+x(i)+'" y="'+(y(stacked)-7)+'" text-anchor="middle">'+row.titulados+(row.titulados_parcial?'*':'')+'</text>';
      });
      const annualY=n=>top+T+plotH-(n/annualScale)*plotH;
      svg+='<g data-chart-total="'+year+'"><line class="grid-line" x1="'+(W-R+12)+'" x2="'+(W-R+12)+'" y1="'+(top+T)+'" y2="'+(top+rowH-3)+'"/>';
      for(let n=0;n<=annualScale;n+=annualTick)svg+='<line class="grid-line" x1="'+(totalX-totalWidth/2-5)+'" x2="'+(totalX+totalWidth/2+5)+'" y1="'+annualY(n)+'" y2="'+annualY(n)+'"/><text x="'+(totalX-totalWidth/2-9)+'" y="'+(annualY(n)+4)+'" text-anchor="end">'+n+'</text>';
      let annualStacked=0;
      if(total!=null)series.forEach(s=>{
        const value=available.reduce((n,row)=>n+(row[s.key]??0),0);
        if(value===0)return;
        const tip=year+' · Total '+s.label+': '+value+(isPartial?' (parcial)':'')+' · '+available.length+'/12 meses · janus.pdf';
        svg+='<rect class="chart-point" tabindex="0" aria-label="'+esc(tip)+'" x="'+(totalX-totalWidth/2)+'" y="'+annualY(annualStacked+value)+'" width="'+totalWidth+'" height="'+(value/annualScale*plotH)+'" fill="'+s.color+'"'+(isPartial?' opacity=".65"':'')+'><title>'+esc(tip)+'</title></rect>';
        annualStacked+=value;
      });
      svg+='<text class="chart-year-total" x="'+totalX+'" y="'+(annualY(annualStacked)-7)+'" text-anchor="middle">'+number(total)+(total!=null&&isPartial?'*':'')+'</text><text class="chart-count" x="'+totalX+'" y="'+(top+rowH-10)+'" text-anchor="middle">Total</text></g>';
      svg+='</g>';
    });
    container.innerHTML=svg+'</svg>';
  }
  chart("titulados",[{key:"titulados_me",label:"ME",color:"#217eac"},{key:"titulados_do_dd",label:"DO/DD",color:"#855485"}]);

  const from=byId("compare-from"),to=byId("compare-to");
  [from,to].forEach(select=>{select.innerHTML=rows.map(row=>'<option value="'+row.mes+'">'+esc(row.rotulo)+'</option>').join("");});
  const complete=rows.filter(row=>row.titulados!=null&&!row.titulados_parcial);
  to.value=(complete.at(-1)||rows.at(-1)).mes;
  const previousYear=String(Number(to.value.slice(0,4))-1)+to.value.slice(4);
  from.value=(complete.find(row=>row.mes===previousYear)||complete.at(-2)||rows.at(-2)).mes;
  function compare(){
    const a=rows.find(row=>row.mes===from.value),b=rows.find(row=>row.mes===to.value);
    byId("monthly-comparisons").innerHTML=[["titulados_me","Mestrado"],["titulados_do_dd","Doutorado / direto"],["titulados","Total"]].map(([key,label])=>{
      const ready=a[key]!=null&&b[key]!=null&&!partial(a,key)&&!partial(b,key);
      const diff=ready?b[key]-a[key]:null;
      const change=ready?(diff>0?"+":"")+diff+(a[key]>0?" ("+(diff>0?"+":"")+((diff/a[key])*100).toLocaleString("pt-BR",{maximumFractionDigits:1})+"%)":""):"Sem par comparável";
      return '<article><strong>'+label+'</strong><small>'+esc(a.rotulo)+': '+number(a[key])+(partial(a,key)?"*":"")+' → '+esc(b.rotulo)+': '+number(b[key])+(partial(b,key)?"*":"")+'</small><b>'+change+'</b><small>'+(ready?'Variação entre meses completos':'Dados ausentes ou mês parcialmente coberto')+'</small></article>';
    }).join("");
  }
  from.addEventListener("change",compare);to.addEventListener("change",compare);compare();
  byId("monthly-export").addEventListener("click",()=>{
    const quote=value=>'"'+String(value??"").replaceAll('"','""')+'"';
    const header=["mes",...fields,"titulados_parcial","titulados_inicio","titulados_fim","fonte","escopo_docentes"];
    const csv=[header,...rows.map(row=>[row.mes,...fields.map(key=>row[key]),row.titulados_parcial,row.titulados_inicio,row.titulados_fim,data.fonte,scope])].map(row=>row.map(quote).join(",")).join("\r\n");
    const url=URL.createObjectURL(new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8;"}));
    const link=document.createElement("a");link.href=url;link.download="siadoce-titulados-por-mes.csv";link.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
})();
