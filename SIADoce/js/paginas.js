/* Elementos anteriormente preenchidos durante a geração das páginas. */
(() => {
  "use strict";
  const dados = window.SIADOCE_DADOS;
  const institucional = dados?.institucional === true;
  document.documentElement.dataset.acesso = institucional ? "institucional" : "publico";
  if (!institucional) {
    document.querySelectorAll("a[data-ancora-publica]").forEach(a => { a.hash = a.dataset.ancoraPublica; });
  }
  const raiz = new URL("../", document.currentScript.src);
  const rota = document.body.dataset.pagina;
  const $ = seletor => document.querySelector(seletor);
  const painel = $("#consulta-agregada");
  const categorias = {pleno: "Plenos", especifico: "Específicos", vencido_com_orientando: "Vencidos com orientando"};
  const categoriaDocente = {pleno: "Pleno", especifico: "Específico", vencido_com_orientando: "Vencido com orientando"};
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
    const erro = el("p", "Não foi possível carregar a base de dados do SIADoce.");
    erro.setAttribute("role", "alert");
    $("#conteudo").prepend(erro);
    return;
  }
  const resumo = institucional ? resumoInstitucional() : dados.resumo;
  if (institucional) {
    const titulacoes = $("#docente-titulacoes-fonte");
    const total = dados.docentes.titulados_fonte?.total_no_periodo;
    if (titulacoes && Number.isInteger(total)) {
      titulacoes.querySelector("span").textContent = total;
      titulacoes.hidden = false;
    }
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
    $(".home-lattes-missing-heading > span").textContent = resumo.ausentes;
    const pendentes = institucional ? dados.lattes_ausentes.docentes : resumo.curriculos_pendentes || [];
    const lista = $(".home-missing-list");
    lista.replaceChildren(...pendentes.map(d => {
      const item = el("li");
      item.append(link(d.nome, "docentes/detalhe/index.html?id=" + encodeURIComponent(d.docente_id)));
      return item;
    }));
    lista.hidden = pendentes.length === 0;
    $(".home-ok-note").hidden = resumo.ausentes !== 0;
  }

  function docentes() {
    painel.append(el("h2", "Indicadores do grupo acompanhado"), el("p", resumo.periodo));
    cartoes(painel, Object.entries(categorias).map(([key, label]) => [label, resumo.categorias[key] || 0]));
    tabela(painel, "Alunos ativos por modalidade", ["Modalidade", "Alunos"], [
      ["Mestrado", resumo.alunos.mestrado], ["Doutorado", resumo.alunos.doutorado], ["Doutorado direto", resumo.alunos.doutorado_direto]
    ]);
    painel.append(link("Quadro e credenciamento dos cinco programas do IME", "credenciamento/index.html", "button quiet"));
    const lista = $("#lista-publica-docentes");
    const contagem = $("#lista-publica-contagem");
    const nomes = window.SIADOCE_PRODUCAO?.docentes;
    if (!nomes) {
      contagem.textContent = "Não foi possível carregar a lista de docentes.";
      return;
    }
    const buscar = $("#lista-publica-busca");
    const categoria = $("#lista-publica-categoria");
    for (const chave of Object.keys(categoriaDocente)) {
      if (nomes.some(d => d.categoria === chave)) categoria.add(new Option(categoriaDocente[chave], chave));
    }
    const porNome = nomes.slice().sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    const normalizar = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    function filtrar() {
      const termos = normalizar(buscar.value).split(/\s+/).filter(Boolean);
      const visiveis = porNome.filter(d => (!categoria.value || d.categoria === categoria.value) &&
        termos.every(termo => normalizar(d.nome).includes(termo)));
      lista.replaceChildren();
      for (const docente of visiveis) {
        const linha = lista.insertRow();
        const nome = el("th");
        nome.scope = "row";
        nome.append(link(docente.nome, "docentes/detalhe/index.html?id=" + encodeURIComponent(docente.id)));
        linha.append(nome);
        linha.insertCell().textContent = categoriaDocente[docente.categoria] || "—";
        const cv = linha.insertCell();
        if (docente.lattes_url) cv.append(link("Lattes", docente.lattes_url));
        else cv.textContent = "Indisponível";
      }
      contagem.textContent = visiveis.length === porNome.length ? porNome.length + " docentes"
        : visiveis.length ? visiveis.length + " de " + porNome.length + " docentes" : "Nenhum docente encontrado.";
    }
    buscar.addEventListener("input", filtrar);
    categoria.addEventListener("change", filtrar);
    filtrar();
    const anterior = {"#docentesTable": "#lista-publica-titulo", "#docenteMetrics": "#consulta-agregada"};
    function abrirAncoraAnterior() {
      if (Object.hasOwn(anterior, location.hash)) location.replace(anterior[location.hash]);
    }
    window.addEventListener("hashchange", abrirAncoraAnterior);
    abrirAncoraAnterior();
  }

  function perfilPublico() {
    const id = new URLSearchParams(location.search).get("id");
    const base = window.SIADOCE_PRODUCAO;
    const pessoa = base?.docentes.find(d => d.id === id);
    const nome = $("#perfil-publico-nome");
    const resumoPerfil = $("#perfil-publico-resumo");
    if (!pessoa) {
      nome.textContent = base ? "Docente não encontrado" : "Perfil indisponível";
      resumoPerfil.textContent = base ? "Volte à lista e escolha um docente." : "Não foi possível carregar a base de produção docente.";
      return;
    }
    nome.textContent = pessoa.nome;
    const visoes = window.SiADoceProductionViews;
    const temCV = pessoa.lattes_status === "disponivel";
    const textoCV = temCV ? "Atualização do Lattes: " + visoes.dateText(pessoa.lattes_atualizado_em) : "Currículo indisponível";
    resumoPerfil.textContent = [categoriaDocente[pessoa.categoria], textoCV].filter(Boolean).join(" · ");
    const links = $("#perfil-publico-links");
    if (pessoa.lattes_url) links.append(link("Lattes", pessoa.lattes_url, "button quiet"));
    links.append(link("Produção por ano", "producao/index.html?docente=" + encodeURIComponent(id) + "#production-rows", "button quiet"));
    if (!temCV || !pessoa.anos.length) return;
    const anosComRegistros = pessoa.anos.filter(a => a.publicacoes.length);
    const anoInicial = Math.max(...(anosComRegistros.length ? anosComRegistros : pessoa.anos).map(a => a.ano));
    const historico = $("#perfil-publico-historico");
    const artigos = $("#perfil-publico-artigos");
    function selecionarAno(ano) {
      for (const botao of historico.querySelectorAll(".production-year-link")) {
        const ativo = Number(botao.textContent) === ano;
        botao.closest("tr").classList.toggle("is-selected", ativo);
        botao.setAttribute("aria-pressed", String(ativo));
      }
      artigos.replaceChildren(el("h3", "Publicações de " + ano));
      visoes.appendPublicationGroups(artigos, pessoa, ano);
    }
    historico.append(visoes.historyNode(pessoa, anoInicial, selecionarAno));
    selecionarAno(anoInicial);
  }

  function alertas() {
    const dadosAlertas = resumo.alertas;
    const tipos = Object.entries(dadosAlertas.tipos);
    const contar = k => soma(tipos.map(([, v]) => v[k] || 0));
    painel.append(el("h2", "Alertas por critério"), el("p", resumo.periodo + " · Resumo do relatório de acompanhamento."));
    cartoes(painel, [["Alertas no total", contar("red") + contar("yellow")], ["Docentes com alertas", dadosAlertas.docentes], ["Alertas críticos", contar("red")], ["Alertas de atenção", contar("yellow")]]);
    const nomes = {"tempo medio ME alto":"Tempo médio de mestrado alto", "tempo medio DO alto":"Tempo médio de doutorado alto", "tempo medio DD alto":"Tempo médio de doutorado direto alto", "evasao alta":"Evasão alta", "poucas publicacoes":"Poucas publicações"};
    const filtros = el("div", null, "alerts-filters");
    const label = el("label", "Gravidade ");
    const select = el("select");
    select.add(new Option("Todas", ""));
    select.add(new Option("Crítico", "red"));
    select.add(new Option("Atenção", "yellow"));
    label.append(select);
    const tipo = el("select");
    tipo.add(new Option("Todos", ""));
    const tituloTipo = k => nomes[k] || k[0].toUpperCase() + k.slice(1);
    tipos.map(([k]) => k).sort((a,b) => tituloTipo(a).localeCompare(tituloTipo(b), "pt-BR"))
      .forEach(k => tipo.add(new Option(tituloTipo(k), k)));
    const criterio = el("label", "Tipo de alerta ");
    criterio.append(tipo);
    const limpar = el("button", "Limpar filtros", "button quiet");
    limpar.type = "button";
    filtros.append(label, criterio, limpar);
    const resultado = el("div");
    painel.append(filtros, resultado);
    function filtrar() {
      const niveis = select.value ? [select.value] : ["red", "yellow"];
      const linhas = tipos.filter(([k]) => !tipo.value || tipo.value === k).map(([k, v]) => [tituloTipo(k), ...niveis.map(n => v[n] || 0)])
        .filter(r => soma(r.slice(1)) > 0).sort((a, b) => soma(b.slice(1)) - soma(a.slice(1)) || a[0].localeCompare(b[0], "pt-BR"));
      resultado.replaceChildren();
      tabela(resultado, "Ocorrências no programa", ["Critério", ...niveis.map(n => n === "red" ? "Críticos" : "Atenção")], linhas);
      if (!linhas.length) resultado.append(el("p", "Nenhum alerta encontrado nesta seleção."));
    }
    select.addEventListener("change", filtrar);
    tipo.addEventListener("change", filtrar);
    limpar.addEventListener("click", () => { select.value = ""; tipo.value = ""; filtrar(); });
    filtrar();
  }

  function producao() {
    for (const code of document.querySelectorAll(".production-script-command code")) {
      code.textContent = code.textContent.replace("{inicio}", resumo.criterio.inicio).replace("{fim}", resumo.criterio.fim);
    }
  }

  function titulados() {
    const d = dados.titulados;
    $(".annual-period strong").textContent = d.periodo;
    const valores = [d.total_orientadores, d.total_me, d.total_do_dd, d.total];
    document.querySelectorAll(".annual-metrics strong").forEach((m, i) => m.textContent = valores[i]);
    const cobertura = $("#annual-coverage-years");
    d.anos.filter(a => a.parcial || !a.disponivel).forEach(a => cobertura.append(el("p", a.ano + " · " + (a.disponivel ? a.inicio + " a " + a.fim + " (ano parcial)." : "Sem cobertura. O traço indica que a contagem está indisponível."))));
    if (!institucional) {
      const t = $(".annual-program-table");
      const periodos = new Map(d.anos.map(a => [a.ano, a]));
      for (const a of d.totais_anuais) {
        const tr = t.tBodies[0].insertRow();
        const ano = el("th", a.ano); ano.scope = "row";
        const periodo = periodos.get(a.ano);
        if (!periodo.disponivel || periodo.parcial) ano.append(el("small", periodo.disponivel ? "Parcial" : "Sem cobertura"));
        tr.append(ano);
        for (const [i, valor] of [a.me, a.do_dd].entries()) {
          const td = tr.insertCell();
          td.append(el("span", valor ?? "—", "annual-count annual-count-" + (i ? "do" : "me") + (valor ? "" : " annual-zero")));
        }
        tr.insertCell().textContent = a.me == null || a.do_dd == null ? "—" : a.me + a.do_dd;
      }
      const total = t.tFoot.insertRow();
      const titulo = el("th", "Total"); titulo.scope = "row"; total.append(titulo);
      [d.total_me, d.total_do_dd, d.total].forEach(n => total.insertCell().textContent = n ?? "—");
      return;
    }
    $(".titulations-nav a").textContent = $(".titulations-section-heading h2").textContent = "Por orientador e ano";
    const t = $(".annual-table-scroll.somente-institucional .annual-table");
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
      const atual = a.corrente ? " annual-current" : "";
      coluna(h2, "ME", 2*i+1, "annual-sub-me annual-year-start" + atual).dataset.sortLabel = "ME de " + a.ano;
      coluna(h2, "DO/DD", 2*i+2, "annual-sub-do" + atual).dataset.sortLabel = "DO/DD de " + a.ano;
    });
    coluna(h1, "Total", d.anos.length*2+1, "annual-total", 2);
    $("#annual-row-count").textContent = d.orientadores.length + " orientadores";
    d.orientadores.forEach(d => {
      const tr = t.tBodies[0].insertRow(); tr.dataset.annualRow = ""; tr.dataset.name = d.nome;
      const th = el("th", d.nome, "annual-name"); th.scope = "row"; tr.append(th);
      d.anos.forEach(a => ["me","do_dd"].forEach((k, i) => {
        const td = tr.insertCell(); td.dataset.count = a[k] ?? "";
        if (i === 0) td.className = "annual-year-start";
        const valor = el("span", a[k], "annual-count annual-count-" + (i ? "do" : "me") + (!a[k] ? " annual-zero" : ""));
        if (a[k] == null) {
          const nd = el("abbr", "—"); nd.title = "Ano fora do período coberto pelos dados"; valor.append(nd);
        }
        td.append(valor);
      }));
      const total = tr.insertCell(); total.className = "annual-total"; total.dataset.count = d.total; total.append(el("strong", d.total));
    });
    const foot = t.tFoot.insertRow();
    const titulo = el("th", "Total exibido", "annual-name"); titulo.scope = "row"; foot.append(titulo);
    [...d.totais_anuais.flatMap(a => [a.me, a.do_dd]), d.total].forEach((n, i) => {
      const td = foot.insertCell(); td.dataset.annualSum = ""; td.textContent = n ?? "—";
      if (i === d.anos.length * 2) td.className = "annual-total";
      else if (i % 2 === 0) td.className = "annual-year-start";
    });
  }

  if (rota === ".") inicio();
  else if (rota === "titulados") titulados();
  else if (rota === "producao") producao();
  else if (!institucional && rota === "alertas") alertas();
  else if (!institucional && rota === "docentes") docentes();
  else if (!institucional && rota === "docentes/detalhe") perfilPublico();
})();
