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
  const situacoes = { atingiu: "Atingiu o mínimo", em_aberto: "Em aberto", abaixo: "Abaixo do mínimo nos registros disponíveis", sem_dados: "Sem dados" };
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

  function criterioTexto(c) {
    return "Artigos em periódicos " + c.faixas_periodicos.join(", ") + " e em congressos " + c.faixas_congressos.join(", ") + ". Anos completos de " + c.inicio + " a " + c.fim_anos_completos + " e registros disponíveis de " + c.fim + ".";
  }
  function nomeDocente(person, grupo) {
    const wrap = el("span", person.nome);
    if (person.quadrienio.confirmados_fora_lattes) {
      wrap.className = "quadrienio-nome-destacado";
      wrap.append(el("small", "Atualizar Lattes", "quadrienio-acao-lattes"));
    }
    if (grupo === "plenos" && person.categoria === "vencido_com_orientando") {
      wrap.append(el("small", "Credenciamento vencido", "quadrienio-credenciamento-vencido"));
    }
    return wrap;
  }
  function referencias(ficha, d, grupo, estado) {
    const q = d.quadrienio;
    const externos = q.complementos.filter(c => c.estado === estado);
    const refs = q[grupo];
    if (!refs.length && !externos.length) return;
    ficha.append(el("h4", (grupo === "artigos" ? "Artigos contados" : "Registros pendentes") + " (" + (refs.length + externos.length) + ")"));
    const ul = el("ul"); ul.dataset.grupo = grupo;
    function registro(pub, ano) {
      const li = el("li"); li.dataset.ano = ano;
      li.append(el("strong", ano + " · " + pub.titulo), el("span", (pub.tipo === "periodico" ? "Periódico" : "Congresso") + " · " + pub.veiculo + (pub.faixa ? " · " + pub.faixa : "")));
      ul.append(li);
      return li;
    }
    for (const ref of refs) {
      const pub = d.anos.find(a => a.ano === ref.ano).publicacoes[ref.indice];
      const li = registro(pub, ref.ano); li.dataset.indice = ref.indice;
      if (grupo !== "artigos") li.append(el("span", pub.motivo));
      if (pub.fonte_artigo_evento) li.append(link("Consultar fonte", pub.fonte_artigo_evento));
    }
    for (const pub of externos) {
      const li = registro(pub, pub.ano);
      if (pub.doi) li.dataset.doi = pub.doi;
      else if (pub.id_anais) li.dataset.idAnais = pub.id_anais;
      li.append(el("span", pub.estado === "incluido" && !pub.referencia_cv ? "Contado fora do Lattes importado" : "Verificação editorial"));
      if (pub.fonte) li.append(link("Consultar fonte", pub.fonte));
      if (pub.doi) li.append(el("span", "DOI " + pub.doi));
      li.append(el("span", pub.nota));
    }
    ficha.append(ul);
  }

  function balanco(container, grupos, contagens) {
    tabela(container, "Docentes por credenciamento no Janus e situação",
      ["Vínculo no Janus", "Atingiram", "Em aberto", "Abaixo", "Sem dados"],
      grupos.map(g => [g.nome, ...Object.keys(situacoes).map(k => contagens[g.id][k] || 0)]));
    Array.from(container.lastElementChild.querySelectorAll("tbody tr")).forEach((tr,i) => {
      tr.dataset.credenciamento = grupos[i].id;
      Object.keys(situacoes).forEach((k,j) => { tr.cells[j+1].dataset.situacao = k; });
    });
  }

  function quadrienio() {
    const minimo = $(".production-page").dataset.minimo;
    $(".production-heading .lead").textContent = criterioTexto(resumo.criterio);
    const grupo = institucional ? dados.producao.docentes.filter(d => d.lattes_status === "disponivel") : [];
    const ordem = Object.keys(situacoes);
    const grupos = institucional ? dados.simulador.gruposCredenciamento : resumo.grupos;
    const grupoPorDocente = institucional ? new Map(dados.simulador.docentes.map(d => [d.id, d.grupoAnalise])) : null;
    const contagens = institucional ? Object.fromEntries(grupos.map(g => [g.id, Object.fromEntries(ordem.map(k =>
      [k, grupo.filter(d => grupoPorDocente.get(d.id) === g.id && d.quadrienio.situacoes[minimo] === k).length]))])) : resumo.cortes_por_grupo[minimo];
    const quadro = $(".quadrienio-metrics");
    quadro.className = "quadrienio-balanco";
    balanco(quadro, grupos, contagens);
    if (!institucional) return;
    grupo.sort((a, b) => ordem.indexOf(a.quadrienio.situacoes[minimo]) - ordem.indexOf(b.quadrienio.situacoes[minimo]) ||
      Number(Boolean(b.quadrienio.confirmados_fora_lattes)) - Number(Boolean(a.quadrienio.confirmados_fora_lattes)) || a.nome.localeCompare(b.nome, "pt-BR"));
    $("#quadrienio-titulo + p").textContent = grupo.length + " docentes com Lattes disponível. Selecione o nome para conferir os artigos e as fontes.";
    $("#quadrienio-conferencia + p").textContent = "Base de referência: " + resumo.criterio.data_corte.split("-").reverse().join("/") + ".";
    $(".production-table-footnote").textContent = "O mínimo selecionado é de " + minimo + " artigos confirmados. A situação fica em aberto quando há pendências suficientes para atingir esse mínimo ou quando a cobertura dos anos completos é parcial.";
    const tabelaDocentes = $("#quadrienio-rows");
    const fichas = $(".quadrienio-details");
    tabelaDocentes.tBodies[0].remove();
    const secoes = grupos.map(g => {
      const total = soma(Object.values(contagens[g.id]));
      const titulo = g.nome + " (" + total + ")";
      const corpo = tabelaDocentes.createTBody(); corpo.dataset.credenciamento = g.id;
      const linha = corpo.insertRow(); linha.className = "quadrienio-group";
      const cab = el("th", titulo); cab.colSpan = 6; cab.scope = "rowgroup"; cab.id = "grupo-tabela-" + g.id;
      corpo.setAttribute("aria-labelledby", cab.id); linha.append(cab);
      const secao = el("section", null, "quadrienio-details"); secao.dataset.credenciamento = g.id;
      const h = el("h3", titulo, "quadrienio-group"); h.id = "grupo-fichas-" + g.id;
      secao.setAttribute("aria-labelledby", h.id); secao.append(h); fichas.before(secao);
      return {grupo: g, corpo, secao};
    });
    fichas.remove();
    grupo.forEach(d => {
      const q = d.quadrienio, estado = q.situacoes[minimo];
      const grupoId = grupoPorDocente.get(d.id);
      const {corpo, secao} = secoes.find(s => s.grupo.id === grupoId);
      const tr = corpo.insertRow(); tr.id = "linha-" + d.id; tr.dataset.docenteId = d.id; tr.dataset.situacao = estado;
      const th = el("th"); th.scope = "row";
      const a = el("a"); a.href = "#registros-" + d.id; a.append(nomeDocente(d, grupoId)); th.append(a); tr.append(th);
      [["Periódicos",q.periodicos],["Congressos",q.congressos],["Total confirmado",q.total],["Pendentes",q.pendentes],["Situação",situacoes[estado]]].forEach(([rotulo,v]) => {
        const cell = tr.insertCell(); cell.dataset.label = rotulo; cell.textContent = v ?? "—";
      });
      if (!q.cobertura_completa) tr.lastElementChild.append(el("small","Cobertura parcial","quadrienio-coverage"));
      const details = el("details"); details.id = "detalhes-" + d.id; details.dataset.situacao = estado;
      const summary = el("summary"); summary.append(nomeDocente(d, grupoId)); details.append(summary);
      const ficha = el("div", null, "quadrienio-records"); ficha.id = "registros-" + d.id; ficha.tabIndex = -1;
      a.addEventListener("click", () => { details.open = true; });
      if (location.hash === "#" + ficha.id) details.open = true;
      if (d.lattes_atualizado_em) ficha.append(el("p", "Lattes atualizado em " + d.lattes_atualizado_em.split("-").reverse().join("/") + "."));
      ficha.append(el("p", q.motivo_cobertura));
      if (d.lattes_pdf) ficha.append(link("Abrir currículo (PDF)", d.lattes_pdf));
      if (q.total === 0) ficha.append(el("p", "Nenhum artigo confirmado nas faixas da proposta."));
      referencias(ficha, d, "artigos", "incluido");
      referencias(ficha, d, "a_conferir", "pendente");
      const voltar = el("a", "Voltar à linha de " + d.nome); voltar.href = "#" + tr.id; ficha.append(voltar);
      details.append(ficha); secao.append(details);
    });
  }

  function analise() {
    painel.append(el("h2", "Mínimo de artigos por docente"), el("p", criterioTexto(resumo.criterio)));
    const label = el("label", "Mínimo proposto ", "filtro-agregado");
    const select = el("select");
    for (const n of resumo.criterio.minimos) select.add(new Option(n + " artigos", n));
    select.value = "4"; label.append(select); painel.append(label);
    const resultado = el("div"); resultado.setAttribute("aria-live", "polite"); painel.append(resultado);
    function atualizar() {
      resultado.replaceChildren();
      balanco(resultado, resumo.grupos, resumo.cortes_por_grupo[select.value]);
      const caminho = "producao/quadrienio/" + (select.value === "4" ? "" : "minimo-" + select.value + "/");
      resultado.append(link("Consultar este critério", caminho + "index.html", "button quiet"));
    }
    select.addEventListener("change", atualizar); atualizar();
    painel.append(el("p", "A cópia institucional permite editar períodos, faixas e critérios de orientação e consultar os artigos que compõem cada resultado."));
  }

  if (rota === ".") inicio();
  else if (rota === "titulados") titulados();
  else if (rota === "producao") producao();
  else if (rota.startsWith("producao/quadrienio")) quadrienio();
  else if (!institucional && rota === "producao/analise-geral") analise();
  else if (!institucional && rota === "alertas") alertas();
  else if (!institucional && rota.startsWith("docentes")) docentes();
})();
