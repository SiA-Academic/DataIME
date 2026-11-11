(() => {
  "use strict";

  const institutional = window.SIADOCE_DADOS?.simulador;
  const publicData = window.SIADOCE_PUBLICACOES;
  let data = institutional || publicData;
  if (!Array.isArray(data?.docentes)) {
    document.getElementById("sim-sem-base").hidden = false;
    return;
  }
  const engine = window.SiADoceSimulador;
  const defaults = engine.padrao(data.anos);
  const form = document.getElementById("sim-regras");
  const results = document.getElementById("sim-resultados");
  const list = document.getElementById("sim-lista");
  const search = document.getElementById("sim-busca");
  const category = document.getElementById("sim-categoria");
  const status = document.getElementById("sim-situacao");
  const balance = document.getElementById("sim-balanco");
  const error = document.getElementById("sim-erro");
  const count = document.getElementById("sim-exibidos");
  const upload = document.getElementById("sim-arquivo");
  const remove = document.getElementById("sim-remover");
  const importStatus = document.getElementById("sim-status-importacao");
  const janusInputs = ["maxEvasao", "minTitulados", "minAtivos", "minEncerrados"];
  const situationNames = { atingiu: "Atingiram os critérios", em_aberto: "Em aberto", abaixo: "Abaixo dos critérios" };
  const categories = { pleno: "Pleno", especifico: "Específico", vencido_com_orientando: "Vencido com orientando" };
  const numerical = ["inicio", "fim", "minTotal", "minPeriodicos", "minCongressos", "maxEvasao", "minTitulados", "minAtivos", "minEncerrados"];
  const bands = ["faixasPeriodicos", "faixasCongressos"];
  const percent = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 });
  let faculty = [];
  let cohorts = [];
  let appliedRules = defaults;
  let hasJanus = Boolean(institutional);
  let fileRevision = 0;

  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text != null) node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  function link(label, url) {
    const node = element("a", label);
    node.href = url;
    return node;
  }

  function numberLabel(value, singular, plural) {
    return value + " " + (value === 1 ? singular : plural);
  }

  function rotuloEvasao(janus) {
    if (janus.evasaoAplicavel === false) return "Evasão não avaliada (" + numberLabel(janus.alunosDistintos, "aluno", "alunos") + ")";
    return "Evasão " + (janus.evasao == null ? "indisponível" : percent.format(janus.evasao) + "%");
  }

  function normalized(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  }

  function shortDate(date) {
    return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date.split("-").reverse().join("/") : date;
  }

  function controls(name) {
    return form.querySelectorAll('input[name="' + name + '"]');
  }

  function writeRules(values) {
    for (const key of numerical) form.elements[key].value = values[key] ?? "";
    form.elements.incluirExternos.checked = values.incluirExternos;
    for (const key of bands) {
      for (const input of controls(key)) input.checked = values[key].includes(input.value);
    }
  }

  function readRules() {
    const rules = { incluirExternos: form.elements.incluirExternos.checked };
    for (const key of numerical) {
      const value = form.elements[key].value;
      rules[key] = form.elements[key].disabled ? defaults[key] : value === "" ? null : Number(value);
    }
    for (const key of bands) {
      rules[key] = [...controls(key)].filter(input => input.checked).map(input => input.value);
    }
    return rules;
  }

  function publications(title, records, pending) {
    const section = element("details", null, "sim-pubs");
    section.append(element("summary", title + " (" + records.length + ")"));
    const items = element("ul");
    for (const record of records) {
      const item = element("li");
      item.append(element("strong", record.titulo));
      const kind = record.tipo === "periodico" ? "Periódico" : "Congresso";
      const meta = [record.ano, kind, record.faixa, record.veiculo].filter(Boolean).join(" · ");
      const source = element("span", meta, "sim-sources");
      if (record.fonte) source.append(" · ", link(record.externo ? "Fonte editorial" : "Consultar fonte", record.fonte));
      if (pending && record.motivo) item.append(element("span", record.motivo, "sim-sources"));
      item.append(source);
      items.append(item);
    }
    section.append(items);
    return section;
  }

  function personDetails(person) {
    const detail = element("div", null, "sim-detail");
    const intro = element("p", hasJanus ? categories[person.categoria] : null, "sim-note");
    if (person.dataCV) intro.append((intro.textContent ? " · " : "") + "Lattes de " + shortDate(person.dataCV));
    if (person.lattes) intro.append(intro.textContent ? " · " : "", link("Abrir Lattes", person.lattes));
    if (intro.textContent) detail.append(intro);
    if (person.motivos.length) {
      const why = element("ul");
      for (const reason of person.motivos) why.append(element("li", reason));
      detail.append(why);
    }
    detail.append(element("p", [
      numberLabel(person.periodicos, "artigo em periódico", "artigos em periódicos"),
      numberLabel(person.congressos, "em congresso", "em congressos"),
      numberLabel(person.pendentes, "pendência", "pendências")
    ].join(" · ")));
    if (person.artigos.length) detail.append(publications("Artigos confirmados", person.artigos, false));
    if (person.aConferir.length) detail.append(publications("Publicações a conferir", person.aConferir, true));
    if (!hasJanus) return detail;
    const j = person.janus;
    const dataJanus = [
      "Titulações " + (j.titulados ?? "—"), "Desligamentos " + (j.desligados ?? "—"),
      "Orientandos ativos " + (j.ativos ?? "—"), "Encerradas " + (j.encerrados ?? "—"),
      rotuloEvasao(j)
    ];
    detail.append(element("p", dataJanus.join(" · "), "sim-note"));
    return detail;
  }

  function personRow(person) {
    const row = element("details", null, "sim-person");
    row.dataset.docenteId = person.id;
    row.dataset.situacao = person.situacao;
    const summary = element("summary");
    const name = element("span", null, "sim-name");
    if (person.atualizar) {
      name.append(element("span", person.nome, "quadrienio-nome-destacado"),
                  element("small", "Atualizar Lattes", "quadrienio-acao-lattes"));
    } else {
      name.textContent = person.nome;
    }
    if (person.grupoAnalise === "plenos" && person.categoria === "vencido_com_orientando") {
      name.append(element("small", "Credenciamento vencido", "quadrienio-credenciamento-vencido"));
    }
    const metrics = element("span", null, "sim-pubcount");
    metrics.append(element("strong", numberLabel(person.total, "artigo", "artigos")));
    if (person.pendentes) metrics.append(element("span", numberLabel(person.pendentes, "pendência", "pendências")));
    if (appliedRules.minPeriodicos) metrics.append(element("span", "Periódicos " + person.periodicos));
    if (appliedRules.minCongressos) metrics.append(element("span", "Congressos " + person.congressos));
    const j = person.janus;
    if (appliedRules.maxEvasao != null) {
      metrics.append(element("span", rotuloEvasao(j)));
    }
    if (appliedRules.minTitulados) metrics.append(element("span", "Titulações " + (j.titulados ?? "—")));
    if (appliedRules.minAtivos) metrics.append(element("span", "Ativos " + (j.ativos ?? "—")));
    if (appliedRules.minEncerrados) metrics.append(element("span", "Encerradas " + (j.encerrados ?? "—")));
    summary.append(name, metrics);
    row.append(summary);
    row.addEventListener("toggle", () => {
      if (row.open && row.childElementCount === 1) row.append(personDetails(person));
    });
    return row;
  }

  function showList() {
    const terms = normalized(search.value).split(/\s+/).filter(Boolean);
    function matchesFilters(person) {
      const name = normalized(person.nome);
      return (!category.value || person.categoria === category.value) &&
        (!status.value || person.situacao === status.value) && terms.every(term => name.includes(term));
    }
    const fragment = document.createDocumentFragment();
    let visibleCount = 0;
    for (const cohort of cohorts) {
      const visible = cohort.people.filter(matchesFilters);
      const headingId = "sim-grupo-" + cohort.id;
      const link = cohort.scoreRow.querySelector("a");
      if (!visible.length) {
        link.removeAttribute("href");
        continue;
      }
      link.href = "#" + headingId;
      visibleCount += visible.length;
      const section = element("section");
      section.setAttribute("aria-labelledby", headingId);
      const heading = element("h3", cohort.nome + " (" + visible.length + ")", "sim-cohort-heading");
      heading.id = headingId;
      section.append(heading);
      for (const [key, label] of Object.entries(situationNames)) {
        const group = visible.filter(person => person.situacao === key);
        if (!group.length) continue;
        section.append(element("h4", label + " (" + group.length + ")", "sim-group-heading"));
        for (const person of group) section.append(personRow(person));
      }
      fragment.append(section);
    }
    list.replaceChildren(fragment);
    count.textContent = visibleCount === faculty.length
      ? numberLabel(faculty.length, "docente com Lattes", "docentes com Lattes")
      : visibleCount + " de " + faculty.length + " docentes";
    if (!visibleCount) list.append(element("p", "Nenhum docente corresponde aos filtros.", "sim-empty"));
  }

  function evaluate() {
    const rules = readRules();
    const end = form.elements.fim;
    end.setCustomValidity(rules.fim < rules.inicio ? "O ano final deve ser igual ou posterior ao inicial." : "");
    const invalid = form.querySelector("input:invalid, select:invalid");
    error.hidden = !invalid;
    results.hidden = Boolean(invalid);
    balance.hidden = Boolean(invalid);
    if (invalid) {
      error.textContent = invalid.validationMessage;
      faculty = [];
      cohorts = [];
      list.replaceChildren();
      count.textContent = "";
      balance.querySelector("tbody").replaceChildren();
      return;
    }
    const bandSummary = key => rules[key].length ? rules[key].join(", ") : "nenhuma faixa";
    document.getElementById("sim-resumo-regras").textContent =
      "Periódicos " + bandSummary("faixasPeriodicos") + " · Congressos " + bandSummary("faixasCongressos") +
      (rules.fim === 2026 ? " · 2026 parcial" : "");
    appliedRules = rules;
    faculty = engine.avaliar(data, rules);
    const scoreBody = balance.querySelector("tbody");
    scoreBody.replaceChildren();
    cohorts = data.gruposCredenciamento.map(cohort => {
      const people = faculty.filter(person => person.grupoAnalise === cohort.id);
      const scoreRow = scoreBody.insertRow();
      scoreRow.dataset.grupo = cohort.id;
      const heading = element("th");
      heading.scope = "row";
      heading.append(element("a", cohort.nome));
      scoreRow.append(heading);
      for (const key of Object.keys(situationNames)) {
        const score = scoreRow.insertCell();
        score.dataset.placar = key;
        score.textContent = people.filter(person => person.situacao === key).length;
      }
      return { ...cohort, people, scoreRow };
    });
    showList();
  }

  for (const year of data.anos) {
    for (const key of ["inicio", "fim"]) form.elements[key].add(new Option(String(year), String(year)));
  }
  function setJanusControls() {
    const selectedCategory = category.value;
    category.replaceChildren(new Option("Todos", ""));
    document.getElementById("sim-orientacoes").hidden = !hasJanus;
    document.getElementById("sim-filtro-credenciamento").hidden = !hasJanus;
    document.getElementById("sim-periodo-janus").textContent = hasJanus ? data.periodoJanus : "";
    for (const name of janusInputs) {
      form.elements[name].disabled = !hasJanus;
      if (!hasJanus) form.elements[name].value = defaults[name] ?? "";
    }
    if (hasJanus) {
      const available = [...new Set(data.docentes.map(person => person.categoria))].sort();
      for (const key of available) category.add(new Option(categories[key] || key, key));
      if (available.includes(selectedCategory)) category.value = selectedCategory;
    }
    remove.hidden = Boolean(institutional) || !hasJanus;
  }

  function readLocalAnalysis(fileData) {
    if (fileData?.schema_version !== 1 || typeof publicData.snapshot !== "string" ||
        fileData.snapshot !== publicData.snapshot) {
      throw new Error("O arquivo pertence a outra versão da base de publicações.");
    }
    const fail = () => { throw new Error("O arquivo institucional está incompleto ou não corresponde a esta base."); };
    const local = fileData.simulador;
    if (!local || !Array.isArray(local.docentes) || local.docentes.length !== publicData.docentes.length ||
        !Array.isArray(local.anos) || local.anos.length !== publicData.anos.length ||
        !local.anos.every((year, i) => year === publicData.anos[i]) ||
        local.fimAnosCompletos !== publicData.fimAnosCompletos ||
        typeof local.periodoJanus !== "string" || !local.periodoJanus.trim() ||
        !Array.isArray(local.gruposCredenciamento) || local.gruposCredenciamento.length !== publicData.gruposCredenciamento.length) fail();
    const groupIds = new Set(publicData.gruposCredenciamento.map(group => group.id));
    const importedIds = new Set(local.gruposCredenciamento.map(group => group?.id));
    if (importedIds.size !== groupIds.size || ![...importedIds].every(id => groupIds.has(id))) fail();
    const byId = new Map(publicData.docentes.map(person => [person.id, person]));
    const docentes = local.docentes.map(person => {
      const bibliografia = byId.get(person?.id);
      if (!bibliografia || bibliografia.nome !== person.nome || bibliografia.grupoAnalise !== person.grupoAnalise ||
          !Object.hasOwn(categories, person.categoria) || !groupIds.has(person.grupoAnalise) ||
          !person.janus || typeof person.janus !== "object") fail();
      byId.delete(person.id);
      const janus = {};
      for (const key of ["alunosDistintos", "titulados", "desligados", "ativos"]) {
        const value = person.janus[key];
        if (value !== null && (!Number.isSafeInteger(value) || value < 0)) fail();
        janus[key] = value;
      }
      return {...bibliografia, categoria: person.categoria, janus};
    });
    return {...publicData, periodoJanus: local.periodoJanus, docentes};
  }

  async function importFile() {
    const revision = ++fileRevision;
    const file = upload.files[0];
    if (!file) return;
    try {
      let parsed;
      try { parsed = JSON.parse((await file.text()).replace(/^\uFEFF/, "")); }
      catch { throw new Error("Não foi possível ler o JSON institucional."); }
      if (revision !== fileRevision) return;
      const combined = readLocalAnalysis(parsed);
      data = combined;
      hasJanus = true;
      setJanusControls();
      evaluate();
      importStatus.textContent = "Critérios de orientação e credenciamento disponíveis para " + combined.docentes.length + " docentes.";
    } catch (err) {
      if (revision === fileRevision) importStatus.textContent = err.message;
    } finally {
      if (revision === fileRevision) upload.value = "";
    }
  }

  if (!institutional) {
    document.getElementById("sim-importacao").hidden = false;
    upload.addEventListener("change", importFile);
    remove.addEventListener("click", () => {
      ++fileRevision;
      upload.value = "";
      data = publicData;
      hasJanus = false;
      setJanusControls();
      evaluate();
      importStatus.textContent = "Arquivo removido. Os critérios bibliográficos foram mantidos.";
    });
  }
  writeRules(defaults);
  setJanusControls();
  form.hidden = false;
  evaluate();
  form.addEventListener("input", event => { if (event.target !== upload) evaluate(); });
  form.addEventListener("submit", event => event.preventDefault());
  form.addEventListener("reset", event => {
    event.preventDefault();
    writeRules(defaults);
    evaluate();
  });
  search.addEventListener("input", showList);
  const toggleFilters = document.getElementById("sim-abrir-filtros");
  const filters = document.getElementById("sim-filtros");
  toggleFilters.addEventListener("click", () => {
    filters.hidden = !filters.hidden;
    toggleFilters.setAttribute("aria-expanded", String(!filters.hidden));
  });
  category.addEventListener("change", showList);
  status.addEventListener("change", showList);
})();
