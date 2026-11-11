/* Elementos anteriormente preenchidos durante a geração das páginas. */
(() => {
  "use strict";
  const dados = window.SIADOCE_DADOS;
  const institucional = dados?.institucional === true;
  document.documentElement.dataset.acesso = institucional ? "institucional" : "publico";
  const raiz = new URL("../", document.currentScript.src);
  const rota = document.body.dataset.pagina;
  const $ = seletor => document.querySelector(seletor);
  const painel = $("#consulta-agregada");
  const categorias = {pleno: "Plenos", especifico: "Específicos", vencido_com_orientando: "Vencidos com orientando"};
  const soma = itens => itens.reduce((a, b) => a + b, 0);

  function el(tag, texto, classe) {
    const node = document.createElement(tag);
    if (texto != null) node.textContent = texto;
    if (classe) node.className = classe;
    return node;
  }
  function link(texto, href, classe) {
    const a = el("a", texto, classe);
    const alvo = new URL(href, raiz);
    if (["http:", "https:", "file:"].includes(alvo.protocol)) a.href = alvo.href;
    return a;
  }
  function cartoes(container, pares) {
    const grid = el("div", null, "painel-numeros");
    for (const [rotulo, valor] of pares) {
      const card = el("article");
      card.append(el("span", rotulo), el("strong", valor ?? "—"));
      grid.append(card);
    }
    container.append(grid);
  }
  function tabela(container, titulo, colunas, linhas) {
    const scroll = el("div", null, "consulta-scroll");
    const t = el("table");
    t.append(el("caption", titulo));
    const cab = t.createTHead().insertRow();
    colunas.forEach(rotulo => {
      const th = el("th", rotulo);
      th.scope = "col";
      cab.append(th);
    });
    const tbody = t.createTBody();
    for (const linha of linhas) {
      const tr = tbody.insertRow();
      linha.forEach((valor, i) => {
        const cel = el(i === 0 ? "th" : "td", valor ?? "—");
        if (i === 0) cel.scope = "row";
        tr.append(cel);
      });
    }
    scroll.append(t);
    container.append(scroll);
  }
  function resumoInstitucional() {
    const grupo = dados.docentes.docentes.filter(d => d.credenciamento.categoria in categorias);
    const contagens = {};
    grupo.forEach(d => { const cat = d.credenciamento.categoria; contagens[cat] = (contagens[cat] || 0) + 1; });
    return {periodo: dados.producao.periodo, categorias: contagens, alunos: dados.alunos_ativos.totais,
      ausentes: dados.lattes_ausentes.total_ausentes, criterio: dados.producao.criterio_quadrienio};
  }
  if (!dados) {
    const erro = el("p", "Não foi possível carregar a base de dados do SIA-Doce.");
    erro.setAttribute("role", "alert");
    $("#conteudo").prepend(erro);
    return;
  }
  const resumo = institucional ? resumoInstitucional() : dados.resumo;
  if (institucional) {
    document.querySelectorAll("[data-arquivo-institucional]").forEach(a => {
      a.href = a.dataset.arquivoInstitucional;
      if (a.hasAttribute("data-download")) a.setAttribute("download", "");
    });
  }

  function inicio() {
    const grupo = Object.values(resumo.categorias);
    $(".home-stat-period strong").textContent = resumo.periodo;
    $(".home-stat-docentes strong").textContent = soma(grupo);
    $(".home-stat-alunos strong").textContent = resumo.alunos.total;
    $(".home-stat-lattes strong").textContent = resumo.ausentes;
    document.querySelectorAll(".home-stat-breakdown b").forEach((b, i) => b.textContent = resumo.categorias[Object.keys(categorias)[i]] || 0);
    if (institucional) {
      $(".home-lattes-missing-heading > span").textContent = resumo.ausentes;
      $(".home-missing-list").replaceChildren(...dados.lattes_ausentes.docentes.map(d => el("li", d.nome)));
    }
  }

  function docentes() {
    painel.append(el("h2", "Docentes acompanhados"), el("p", resumo.periodo));
    cartoes(painel, Object.entries(categorias).map(([key, label]) => [label, resumo.categorias[key] || 0]));
    tabela(painel, "Alunos ativos por modalidade", ["Modalidade", "Alunos"], [
      ["Mestrado", resumo.alunos.mestrado], ["Doutorado", resumo.alunos.doutorado], ["Doutorado direto", resumo.alunos.doutorado_direto]
    ]);
    painel.append(link("Quadro e credenciamento dos cinco programas do IME", "credenciamento/index.html", "button quiet"));
    painel.append(el("p", "As fichas por docente, a busca, a ordenação e a exportação individual estão disponíveis na cópia institucional."));
  }

  function alertas() {
    const dadosAlertas = resumo.alertas;
    const tipos = Object.entries(dadosAlertas.tipos);
    const contar = k => soma(tipos.map(([, v]) => v[k] || 0));
    painel.append(el("h2", "Alertas por critério"), el("p", resumo.periodo + " · Resumo do relatório de acompanhamento."));
    cartoes(painel, [["Docentes com alertas", dadosAlertas.docentes], ["Alertas críticos", contar("red")], ["Alertas de atenção", contar("yellow")]]);
    const nomes = {"tempo medio ME alto":"Tempo médio de mestrado alto", "tempo medio DO alto":"Tempo médio de doutorado alto", "tempo medio DD alto":"Tempo médio de doutorado direto alto", "evasao alta":"Evasão alta", "poucas publicacoes":"Poucas publicações"};
    const label = el("label", "Gravidade ", "filtro-agregado");
    const select = el("select");
    select.add(new Option("Todas", ""));
    select.add(new Option("Crítico", "red"));
    select.add(new Option("Atenção", "yellow"));
    label.append(select);
    const resultado = el("div");
    painel.append(label, resultado);
    function filtrar() {
      const niveis = select.value ? [select.value] : ["red", "yellow"];
      const linhas = tipos.map(([k, v]) => [nomes[k] || k[0].toUpperCase() + k.slice(1), ...niveis.map(n => v[n] || 0)])
        .filter(r => soma(r.slice(1)) > 0).sort((a, b) => soma(b.slice(1)) - soma(a.slice(1)) || a[0].localeCompare(b[0], "pt-BR"));
      resultado.replaceChildren();
      tabela(resultado, "Ocorrências no programa", ["Critério", ...niveis.map(n => n === "red" ? "Críticos" : "Atenção")], linhas);
    }
    select.addEventListener("change", filtrar);
    filtrar();
  }

  function producao() {
    for (const code of document.querySelectorAll(".production-script-command code")) {
      code.textContent = code.textContent.replace("{inicio}", resumo.criterio.inicio).replace("{fim}", resumo.criterio.fim);
    }
    if (institucional) return;
    painel.append(el("h2", "Produção por ano"), el("p", resumo.periodo + " · Soma dos registros de cada docente. Um trabalho em coautoria pode aparecer em mais de um currículo."));
    tabela(painel, "Publicações nos currículos acompanhados", ["Ano", "Currículos com dados", "Periódicos classificados", "Periódicos pendentes", "Registros em eventos", "Eventos classificados"],
      resumo.producao.map(a => [a.ano, a.curriculos_com_dados + " de " + a.docentes, a.periodicos_classificados, a.pendentes, a.eventos_total, a.eventos_classificados]));
    painel.append(el("p", "As somas incluem apenas currículos com dados no ano. Traço indica que o indicador está indisponível."));
  }

  function titulados() {
    const d = dados.titulados;
    $(".annual-period strong").textContent = d.periodo;
    const valores = [d.total_orientadores, d.total_me, d.total_do_dd, d.total];
    document.querySelectorAll(".annual-metrics strong").forEach((m, i) => m.textContent = valores[i]);
    const cobertura = $(".annual-coverage");
    cobertura.append(el("strong", "Cobertura dos dados"));
    d.anos.filter(a => a.parcial || !a.disponivel).forEach(a => cobertura.append(el("p", a.ano + " · " + (a.disponivel ? a.inicio + " a " + a.fim + " (ano parcial)." : "Sem dados no período."))));
    cobertura.append(el("p", "Fonte: relatório Estatísticas por orientador do Janus. As contagens usam a data da titulação e consideram somente a orientação principal de docentes plenos, específicos ou vencidos com orientando."));
    if (!institucional) {
      tabela(painel, "Titulações do grupo acompanhado", ["Ano", "Mestrado", "Doutorado e direto", "Total"], d.totais_anuais.map(a => [a.ano, a.me, a.do_dd, a.me == null || a.do_dd == null ? null : a.me + a.do_dd]));
      return;
    }
    $(".titulations-nav a").textContent = $(".titulations-section-heading h2").textContent = "Por orientador e ano";
    const t = $(".annual-table");
    const h1 = t.tHead.insertRow(), h2 = t.tHead.insertRow();
    function coluna(tr, label, index, estilo, linhas = 1) {
      const th = el("th", label, estilo);
      th.scope = "col"; th.rowSpan = linhas;
      th.dataset.sortColumn = index;
      th.dataset.sortLabel = label;
      tr.append(th);
      return th;
    }
    coluna(h1, "Orientador", 0, "annual-name", 2);
    d.anos.forEach((a, i) => {
      const th = el("th", null, "annual-year" + (a.corrente ? " annual-current" : ""));
      th.colSpan = 2; th.scope = "colgroup";
      th.append(el("span", a.ano), el("small", a.corrente ? "Ano corrente" : a.disponivel ? (a.parcial ? "Parcial" : "Ano completo") : "Sem cobertura"));
      h1.append(th);
      coluna(h2, "ME", 2*i+1, "annual-sub-me annual-year-start").dataset.sortLabel = "ME de " + a.ano;
      coluna(h2, "DO/DD", 2*i+2, "annual-sub-do").dataset.sortLabel = "DO/DD de " + a.ano;
    });
    coluna(h1, "Total", d.anos.length*2+1, "annual-total", 2);
    $("#annual-row-count").textContent = d.orientadores.length + " orientadores";
    d.orientadores.forEach(d => {
      const tr = t.tBodies[0].insertRow(); tr.dataset.annualRow = ""; tr.dataset.name = d.nome;
      const th = el("th", d.nome, "annual-name"); th.scope = "row"; tr.append(th);
      d.anos.forEach(a => ["me","do_dd"].forEach((k, i) => {
        const td = tr.insertCell(); td.dataset.count = a[k] ?? "";
        if (i === 0) td.className = "annual-year-start";
        td.append(el("span", a[k] ?? "—", "annual-count annual-count-" + (i ? "do" : "me") + (!a[k] ? " annual-zero" : "")));
      }));
      const total = tr.insertCell(); total.className = "annual-total"; total.dataset.count = d.total; total.textContent = d.total;
    });
    const foot = t.tFoot.insertRow();
    foot.append(el("th", "Total exibido", "annual-name"));
    [...d.totais_anuais.flatMap(a => [a.me, a.do_dd]), d.total].forEach(n => {
      const td = foot.insertCell(); td.dataset.annualSum = ""; td.textContent = n ?? "—";
    });
  }

  if (rota === ".") inicio();
  else if (rota === "titulados") titulados();
  else if (rota === "producao") producao();
  else if (!institucional && rota === "alertas") alertas();
  else if (!institucional && rota.startsWith("docentes")) docentes();
})();
