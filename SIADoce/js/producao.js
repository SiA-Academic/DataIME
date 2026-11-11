(function () {
  "use strict";
  const app = document.getElementById("production-app");
  const data = window.SIADOCE_DADOS?.producao || window.SIADOCE_PRODUCAO || {};
  const people = data.docentes || [];
  const years = [...new Set((data.anos || []).map(Number))].sort((a, b) => a - b);
  const yearSelect = document.getElementById("production-year");
  const search = document.getElementById("production-search");
  const table = document.getElementById("production-rows");
  const detail = document.getElementById("production-detail");
  const rootUrl = document.currentScript && document.currentScript.src
    ? new URL("../", document.currentScript.src)
    : new URL("../", window.location.href);
  const format = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 3, maximumFractionDigits: 3 });
  const number = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 });
  const labels = { pleno: "Pleno", especifico: "Específico", vencido_com_orientando: "Vencido com orientando" };
  let sortKey = "nome", sortDirection = 1, selectedId = "", selectedYear = null;

  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined && text !== null) node.textContent = String(text);
    if (className) node.className = className;
    return node;
  }
  function normalize(value) {
    return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");
  }
  function annual(person, year) {
    return (person.anos || []).find((record) => Number(record.ano) === Number(year)) || {};
  }
  function selectedYears() {
    const count = { last3: 3, last2: 2, last1: 1 }[yearSelect.value];
    if (!count) return years;
    const latest = years[years.length - 1];
    return years.filter(year => year >= latest - count + 1);
  }
  function visibleYears(person) {
    const selected = selectedYears();
    return (person.anos || []).filter(record => selected.includes(Number(record.ano))).sort((a, b) => a.ano - b.ano);
  }
  function initialDetailYear(person) {
    const records = visibleYears(person), populated = records.filter(record => (record.publicacoes || []).length);
    return Math.max(...(populated.length ? populated : records).map(record => Number(record.ano)));
  }
  function knownCv(person) { return person.lattes_status === "disponivel"; }
  function uncoveredYear(record) { return ["ano_sem_cobertura_cv", "cobertura_temporal_desconhecida"].includes(record.pontos_status); }
  function dateText(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(value || ""));
    return match ? `${match[3]}/${match[2]}/${match[1]}` : "não informada";
  }
  function coverageMessage(person, record) {
    if (record.pontos_status === "ano_sem_cobertura_cv") return `O currículo foi atualizado em ${dateText(person.lattes_atualizado_em)} e não contém registros de ${record.ano}. A produção deste ano está indisponível.`;
    if (record.pontos_status === "cobertura_temporal_desconhecida") return person.lattes_atualizado_em
      ? "Não foi possível confirmar a cobertura da extração do currículo. Não há soma disponível para este ano."
      : "Não foi identificada a data de atualização do currículo. Sem registros neste ano, a cobertura temporal permanece desconhecida.";
    return "";
  }
  function eventCounts(record) {
    const events = (record.publicacoes || []).filter((pub) => pub.tipo === "anais_congressos");
    const classified = Number(record.eventos_classificados ?? events.filter((pub) => pub.status === "classificado").length);
    const ineligible = Number(record.eventos_nao_elegiveis ?? events.filter((pub) => pub.status === "evento_nao_elegivel").length);
    const total = Number(record.eventos_total ?? events.length);
    return { classified, ineligible, pending: Number(record.eventos_pendentes ?? total - classified - ineligible), total };
  }
  function partial(record) { return record.pontos_status === "parcial" || Number(record.pendentes || 0) > 0 || eventCounts(record).pending > 0; }
  function recordCount(record) { return (record.publicacoes || []).length; }
  function classifiedCount(record) { return Object.values(record.contagens || {}).reduce((sum, count) => sum + Number(count || 0), 0); }
  function bandText(record, band, covered) {
    if (!covered || !recordCount(record) || !classifiedCount(record)) return "—";
    return metric((record.contagens || {})[band]);
  }
  function pointText(record) {
    if (record.pontos_status === "cv_ausente" || uncoveredYear(record)) return "—";
    if (!recordCount(record)) return "Sem registros";
    if (record.pontos_referencia == null) return partial(record) ? "A classificar" : "—";
    if (!classifiedCount(record) && !partial(record)) return "Fora da soma";
    return `${format.format(record.pontos_referencia)}${partial(record) ? "*" : ""}`;
  }
  function sortablePoints(record) { return recordCount(record) ? record.pontos_referencia : null; }
  function metric(value) { return value === null || value === undefined ? "—" : number.format(value); }
  function totalRow(person, records) {
    const covered = knownCv(person) ? records.filter(record => record.pontos_status !== "cv_ausente" && !uncoveredYear(record)) : [];
    const available = covered.length > 0, incomplete = covered.length < records.length;
    const sum = get => covered.reduce((total, record) => total + Number(get(record) || 0), 0);
    const located = sum(recordCount), classified = sum(classifiedCount);
    const pending = sum(record => record.pendentes), eventsPending = sum(record => eventCounts(record).pending);
    const isPartial = incomplete || covered.some(partial);
    const countText = value => available ? `${metric(value)}${incomplete ? "*" : ""}` : "—";
    let points = "—";
    if (available) {
      if (classified) points = `${format.format(sum(record => record.pontos_referencia))}${isPartial ? "*" : ""}`;
      else if (pending || eventsPending) points = "A classificar";
      else if (located) points = "Fora da soma";
      else if (!incomplete) points = "Sem registros";
    }
    const tr = element("tr", undefined, "production-total-row");
    tr.dataset.docenteId = person.id;
    tr.dataset.total = "true";
    const notes = [];
    if (!knownCv(person)) notes.push("Currículo indisponível; não há total calculável.");
    else {
      if (incomplete) notes.push("Total parcial: anos sem cobertura não são tratados como zero.");
      if (pending || eventsPending) notes.push(`Pontos parciais: ${pending} artigo(s) em periódicos e ${eventsPending} em eventos pendente(s).`);
    }
    tr.title = notes.join(" ") || "Soma dos registros localizados nos anos exibidos.";
    const label = element("th", "Total", "production-year"); label.scope = "row";
    tr.append(label, element("td", countText(located), "production-records"));
    for (let i = 1; i <= 8; i += 1) {
      tr.append(element("td", classified ? countText(sum(record => (record.contagens || {})[`A${i}`])) : "—"));
    }
    const pointCell = element("td", points, "production-points");
    pointCell.title = tr.title;
    tr.append(pointCell, element("td", countText(pending), pending ? "production-pending" : ""));
    tr.append(element("td", countText(sum(record => eventCounts(record).classified))));
    const eventCell = element("td", countText(eventsPending), eventsPending ? "production-pending" : "");
    const ineligible = sum(record => eventCounts(record).ineligible);
    if (ineligible) eventCell.append(element("small", `${ineligible} não elegível(is)`, "production-event-excluded"));
    tr.append(eventCell);
    return tr;
  }
  function facultyGroup(person, records, { onSelectYear = null, nameLink = true, includeTotal = records.length > 1 } = {}) {
    const cv = knownCv(person), selectable = typeof onSelectYear === "function";
    const group = element("tbody", undefined, "production-faculty-group");
    group.dataset.docenteId = person.id;
    const nameCell = element("th", undefined, "production-name");
    nameCell.scope = "rowgroup";
    nameCell.rowSpan = records.length + (includeTotal ? 1 : 0);
    const name = element(nameLink && selectable ? "button" : "span", person.nome);
    if (nameLink && selectable) {
      name.type = "button";
      name.setAttribute("aria-label", `Ver histórico de ${person.nome}`);
      name.addEventListener("click", () => {
        const populated = records.filter(record => recordCount(record));
        onSelectYear(Math.max(...(populated.length ? populated : records).map(record => Number(record.ano))));
      });
    }
    const cvText = person.lattes_atualizado_em ? `CV ${dateText(person.lattes_atualizado_em)}` : "CV sem data de atualização";
    const category = labels[person.categoria];
    const metadata = element("small", cv ? [category, cvText].filter(Boolean).join(" · ") : "Currículo indisponível");
    if (person.extracao_atualizada_em) metadata.title = `Extração dos dados: ${dateText(person.extracao_atualizada_em)}.`;
    nameCell.append(name, metadata);
    records.forEach((a, index) => {
      const covered = cv && !uncoveredYear(a), pending = Number(a.pendentes || 0), events = eventCounts(a);
      const tr = element("tr");
      tr.dataset.docenteId = person.id;
      tr.dataset.ano = a.ano;
      if (index === 0) tr.append(nameCell);
      const yearCell = element("th", undefined, "production-year");
      yearCell.scope = "row";
      if (selectable) {
        const yearButton = element("button", a.ano, "production-year-link");
        yearButton.type = "button";
        yearButton.setAttribute("aria-label", `Ver publicações de ${person.nome} em ${a.ano}`);
        yearButton.addEventListener("click", () => onSelectYear(a.ano));
        yearCell.append(yearButton);
      } else yearCell.textContent = String(a.ano);
      tr.append(yearCell);
      const located = element("td", cv ? recordCount(a) || (uncoveredYear(a) ? "—" : "0") : "—", "production-records");
      if (covered && !recordCount(a)) located.title = `Sem registros no currículo atualizado em ${dateText(person.lattes_atualizado_em)}; não comprova ausência de produção no ano.`;
      tr.append(located);
      for (let i = 1; i <= 8; i += 1) {
        const count = bandText(a, `A${i}`, covered);
        const cell = element("td", count, count === "—" || count === "0" ? "production-count-zero" : "");
        if (count === "—" && covered && partial(a)) cell.title = "Classificação pendente; não significa zero artigos nessa faixa.";
        tr.append(cell);
      }
      const points = element("td", pointText(a), "production-points");
      if (a.pontos_referencia == null) points.title = cv ? coverageMessage(person, a) || "Não há artigo classificado para calcular a soma" : "Currículo indisponível";
      else if (partial(a)) points.title = `Soma parcial; ${pending} artigo(s) em periódicos e ${events.pending} em eventos pendente(s)`;
      else if (Number(a.periodicos_total || 0) + events.total === 0) points.title = "Nenhum artigo localizado neste ano no currículo disponível";
      tr.append(points);
      tr.append(element("td", covered ? pending : "—", pending ? "production-pending" : "production-count-zero"));
      tr.append(element("td", covered ? events.classified : "—"));
      const eventPendingCell = element("td", covered ? events.pending : "—", events.pending ? "production-pending" : "production-count-zero");
      if (covered && events.ineligible) {
        eventPendingCell.append(element("small", `${events.ineligible} não elegível(is)`, "production-event-excluded"));
        eventPendingCell.title = "Registros não elegíveis ficam fora das pendências, das contagens A1–A8 e da soma.";
      }
      tr.append(eventPendingCell);
      group.append(tr);
    });
    if (includeTotal) group.append(totalRow(person, records));
    return group;
  }
  function safeLink(text, url, className) {
    const link = element("a", text, className);
    try {
      const address = new URL(url, String(url).startsWith("#") ? window.location.href : rootUrl);
      if (!["http:", "https:", "file:"].includes(address.protocol)) return element("span", text);
      link.href = address.href;
      if (address.origin !== window.location.origin) link.rel = "external noopener";
    } catch (_) { return element("span", text); }
    return link;
  }
  function rows() {
    const term = normalize(search.value), selected = selectedYears();
    return people.filter((p) => normalize(p.nome).includes(term)).sort((a, b) => {
      if (sortKey === "pontos") {
        const x = sortablePoints(annual(a, selected[0])), y = sortablePoints(annual(b, selected[0]));
        if (x == null && y != null) return 1;
        if (x != null && y == null) return -1;
        if (x != null && y != null && x !== y) return sortDirection * (x - y);
      }
      return (sortKey === "nome" ? sortDirection : 1) * a.nome.localeCompare(b.nome, "pt-BR");
    });
  }
  function render() {
    const list = rows();
    table.querySelectorAll("tbody").forEach((group) => group.remove());
    const allYears = yearSelect.value === "all", periodYears = selectedYears(), multipleYears = periodYears.length > 1;
    const pointsSort = document.querySelector('[data-production-sort="pontos"]');
    pointsSort.disabled = multipleYears;
    pointsSort.title = multipleYears ? "Selecione Último ano para ordenar pelos pontos daquele ano." : "Ordenar pelos pontos do ano selecionado";
    const totals = { classified: 0, pending: 0, events: 0, eventsClassified: 0, eventsPending: 0, eventsIneligible: 0, presentations: 0, missing: 0, uncovered: 0 };
    list.forEach((person) => {
      const cv = knownCv(person), records = visibleYears(person);
      table.append(facultyGroup(person, records, {
        onSelectYear: year => showDetail(person.id, year, true)
      }));
      if (!cv) totals.missing += 1;
      records.forEach((a) => {
        const covered = cv && !uncoveredYear(a), pending = Number(a.pendentes || 0), events = eventCounts(a);
        totals.classified += Number(a.periodicos_classificados || 0);
        totals.pending += pending;
        totals.events += events.total;
        totals.eventsClassified += events.classified;
        totals.eventsPending += events.pending;
        totals.eventsIneligible += events.ineligible;
        totals.presentations += Number(a.apresentacoes_total || 0);
        if (cv && !covered) totals.uncovered += 1;
      });
    });
    document.getElementById("production-count").textContent = list.length;
    document.getElementById("production-classified").textContent = totals.classified;
    document.getElementById("production-pending").textContent = totals.pending;
    document.getElementById("production-missing-cv").textContent = [
      totals.missing && `${totals.missing} ${totals.missing === 1 ? "CV indisponível" : "CVs indisponíveis"}`,
      totals.uncovered && (multipleYears
        ? `${totals.uncovered} ${totals.uncovered === 1 ? "par docente/ano" : "pares docente/ano"} sem cobertura`
        : `${totals.uncovered} docente${totals.uncovered === 1 ? "" : "s"} sem cobertura no ano`)
    ].filter(Boolean).join(" · ");
    document.getElementById("production-events").textContent = totals.events;
    document.getElementById("production-events-summary").textContent = `${totals.eventsClassified} classificados · ${totals.eventsPending} pendentes${totals.eventsIneligible ? ` · ${totals.eventsIneligible} não elegíveis` : ""}`;
    const periodLabel = multipleYears ? `${periodYears[0]}–${periodYears[periodYears.length - 1]}` : periodYears[0];
    document.getElementById("production-result-count").textContent = `${list.length} ${list.length === 1 ? "docente" : "docentes"}${allYears ? "" : ` · ${periodLabel}`}`;
    document.getElementById("production-empty").hidden = list.length !== 0;
    if (selectedId) {
      const person = list.find(p => p.id === selectedId);
      if (person) showDetail(selectedId, visibleYears(person).some(record => Number(record.ano) === Number(selectedYear)) ? selectedYear : initialDetailYear(person), false);
      else { selectedId = ""; detail.hidden = true; }
    }
  }
  function publicationNode(pub, { compact = false } = {}) {
    const li = element("li", undefined, "production-publication");
    if (compact) li.classList.add("production-publication-compact");
    const body = element("div");
    const isEvent = pub.tipo === "anais_congressos";
    const heading = element("h4", pub.titulo || "Título não identificado");
    if (pub.doi) {
      heading.replaceChildren(safeLink(pub.titulo || pub.doi, `https://doi.org/${String(pub.doi).replace(/^https?:\/\/doi.org\//, "")}`));
    }
    const displayTitle = value => String(value || "").trim().replace(/\s+/g, " ").toLocaleLowerCase("pt-BR");
    const sameJournalTitle = pub.titulo_catalogo && displayTitle(pub.titulo_catalogo) === displayTitle(pub.veiculo);
    const metadata = element("p", compact && sameJournalTitle ? pub.titulo_catalogo : pub.veiculo || "Veículo não identificado", "production-publication-metadata");
    const summary = compact ? element("div", undefined, "production-publication-summary") : null;
    if (compact) {
      summary.append(metadata);
      body.append(heading, summary);
    } else body.append(heading, metadata);
    if (isEvent) {
      if (pub.evento_canonico) body.append(element("p", `Evento identificado: ${pub.evento_canonico}`));
      if (pub.evento_trilha && pub.evento_trilha !== "principal") {
        body.append(element("p", `Trilha/modalidade do evento: ${pub.evento_trilha}`));
      }
      if (pub.verificacao_artigo_nota) body.append(element("p", `Conferência do artigo: ${pub.verificacao_artigo_nota}`));
      if (pub.revisao_artigo_nota) body.append(element("p", `Verificação em andamento: ${pub.revisao_artigo_nota}`));
      if (pub.gt_anos_validos && pub.gt_anos_validos.includes(Number(pub.ano))) {
        body.append(element("p", `Critérios editoriais do GT: evidências conferidas para a edição de ${pub.ano}.`));
      }
      const h5Context = [
        pub.h5_ano && `edição ${pub.h5_ano}`,
        pub.h5_periodo && `período ${pub.h5_periodo}`,
        pub.h5_consultado_em && `consultado em ${dateText(pub.h5_consultado_em)}`
      ].filter(Boolean);
      body.append(element("p", `H5 do evento: ${metric(pub.h5)}${h5Context.length ? ` · ${h5Context.join(" · ")}` : ""}`));
      if (pub.h5_nota) body.append(element("p", pub.h5_nota, "production-pending"));
      if (pub.criterio_evento) body.append(element("p", `Critério da faixa de referência: ${pub.criterio_evento}`));
      if (pub.fontes_evento && pub.fontes_evento.length) {
        const sources = element("p", "Fontes do evento: ");
        pub.fontes_evento.forEach((source, index) => {
          if (index) sources.append(document.createTextNode(" · "));
          sources.append(safeLink(typeof source === "string" ? `fonte ${index + 1}` : source.titulo || `fonte ${index + 1}`,
            typeof source === "string" ? source : source.url));
        });
        body.append(sources);
      }
      const issues = Array.isArray(pub.pendencias_evento) ? pub.pendencias_evento : pub.pendencias_evento ? [pub.pendencias_evento] : [];
      if (issues.length) {
        const pending = element("ul", undefined, "production-event-pending");
        issues.forEach((issue) => pending.append(element("li", issue)));
        body.append(element("p", pub.status === "evento_nao_elegivel"
          ? "Motivos e verificações registradas:" : "Ainda precisa de conferência:", "production-pending"), pending);
      }
    } else if (pub.tipo === "periodico" && pub.source_id) {
      if (pub.titulo_catalogo && pub.titulo_catalogo !== pub.veiculo && !(compact && sameJournalTitle)) body.append(element("p", `Título identificado no catálogo: ${pub.titulo_catalogo}`));
      const vehicle = compact ? metadata : element("p");
      if (compact) vehicle.append(document.createTextNode(" · "));
      const sourceLink = safeLink(compact ? "Scopus" : "Consultar veículo no Scopus", `https://www.scopus.com/sourceid/${encodeURIComponent(pub.source_id)}`);
      if (compact) sourceLink.setAttribute("aria-label", `Consultar ${pub.titulo_catalogo || pub.veiculo || "periódico"} no Scopus`);
      vehicle.append(sourceLink);
      const ids = [pub.issn && `ISSN${compact ? "" : " do catálogo"} ${pub.issn}`, pub.eissn && `eISSN${compact ? "" : " do catálogo"} ${pub.eissn}`].filter(Boolean);
      if (compact) ids.forEach(id => vehicle.append(document.createTextNode(" · "), element("span", id, "production-publication-id")));
      else if (ids.length) vehicle.append(document.createTextNode(` · ${ids.join(" · ")}`));
      if (!compact) body.append(vehicle);
      if (!compact) body.append(element("p", `Percentis 2025: Scopus ${metric(pub.scopus)} · JCR ${metric(pub.jcr)} · Base do maior: ${pub.base || "—"}`));
      const match = { issn: "ISSN exato", issn_explicito: "ISSN explícito", titulo: "título único", titulo_unico: "título único", titulo_normalizado: "título normalizado único", titulo_sem_qualificador_suporte: "título único, removido apenas o qualificador de suporte", alias_validado: "variante de título validada por fonte", publicacao_verificada: "identificação deste artigo conferida em fonte primária", title_exact: "título único", issn_exact: "ISSN exato" }[pub.match_method] || pub.match_method;
      if (!compact && match) body.append(element("p", `Correspondência: ${match}.`));
      if (!compact && pub.alias_fontes && pub.alias_fontes.length) {
        const sources = element("p", "Verificação do título: ");
        pub.alias_fontes.forEach((source, index) => {
          if (index) sources.append(document.createTextNode(" · "));
          sources.append(safeLink(`fonte ${index + 1}`, typeof source === "string" ? source : source.url));
        });
        body.append(sources);
      }
    }
    if (!compact && pub.identificacao_fontes && pub.identificacao_fontes.length) {
      const sources = element("p", pub.identificacao_doi ? "Verificação deste artigo: " : "Fontes para verificar a identificação: ");
      pub.identificacao_fontes.forEach((source, index) => {
        if (index) sources.append(document.createTextNode(" · "));
        sources.append(safeLink(`fonte ${index + 1}`, typeof source === "string" ? source : source.url));
      });
      if (pub.identificacao_doi) sources.append(document.createTextNode(` · DOI ${pub.identificacao_doi}`));
      body.append(sources);
    }
    if (!compact && pub.identificacao_nota) body.append(element("p", `Conferência individual: ${pub.identificacao_nota}`));
    if (pub.motivo && !(compact && pub.status === "classificado") && !(isEvent && pub.pendencias_evento && pub.pendencias_evento.length)) {
      body.append(element("p", pub.motivo, pub.status === "classificado" ? "" : "production-pending"));
    }
    if (!compact && pub.referencia) {
      const reference = element("details");
      reference.append(element("summary", "Referência extraída do currículo"), element("p", pub.referencia));
      body.append(reference);
    }
    const score = element("div", undefined, "production-publication-score");
    if (pub.status === "classificado" && pub.faixa) {
      score.append(element("strong", pub.faixa), element("small", isEvent ? "Faixa preliminar do evento" : `Percentil ${metric(pub.percentil)}`));
      if (["A1", "A2", "A3", "A4"].includes(pub.faixa)) score.append(element("small", pub.pontos == null ? "Pontos indisponíveis" : `${format.format(pub.pontos)} ponto(s)`));
      else score.append(element("small", "Fora da soma A1–A4"));
      score.append(safeLink("Ver critério", app ? "#criterios-producao" : "producao/index.html#criterios-producao"));
    } else if (pub.status === "pendente_tipo") {
      score.append(element("strong", "Em revisão"), element("small", "Modalidade do trabalho"),
        element("small", "Sem pontos atribuídos"));
    } else if (isEvent && pub.status === "evento_nao_elegivel") {
      score.append(element("strong", "Não elegível"), element("small", "Fora da contagem e dos pontos"));
    } else if (isEvent && pub.status === "pendente_evento" && pub.faixa_evento_referencia) {
      score.append(element("strong", pub.faixa_evento_referencia), element("small", "Faixa candidata · não pontuada"),
        element("small", "Sem pontos atribuídos"), safeLink("Ver critério", app ? "#criterios-producao" : "producao/index.html#criterios-producao"));
    } else {
      score.append(element("strong", "—"), element("small", "Sem pontos atribuídos"));
    }
    if (compact) { summary.append(score); li.append(body); }
    else li.append(body, score);
    return li;
  }
  function historyNode(person, selected, onSelectYear) {
    const history = element("div", undefined, "production-history");
    history.append(element("h3", "Histórico por ano"), element("p", "A1–A8 contam artigos classificados em periódicos e eventos. Selecione um ano para abrir os artigos que compõem a linha."));
    const historyScroll = element("div", undefined, "production-table-scroll");
    const historyTable = element("table", undefined, "production-table production-history-table");
    historyTable.append(element("caption", `Histórico anual de ${person.nome}`, "sr-only"));
    const historyHead = element("thead"), historyHeadRow = element("tr");
    ["Ano", "Registros no CV", ...Array.from({ length: 8 }, (_, i) => `A${i + 1}`), "Pontos", "Periódicos pendentes", "Eventos classificados", "Eventos pendentes"].forEach((text) => {
      const th = element("th", text); th.scope = "col"; historyHeadRow.append(th);
    });
    historyHead.append(historyHeadRow); historyTable.append(historyHead);
    const historyBody = element("tbody");
    (person.anos || []).forEach((record) => {
      const tr = element("tr");
      if (Number(record.ano) === Number(selected)) tr.classList.add("is-selected");
      const th = element("th"); th.scope = "row";
      const button = element("button", record.ano, "production-year-link");
      button.type = "button";
      button.setAttribute("aria-label", `Abrir publicações de ${person.nome} em ${record.ano}`);
      button.addEventListener("click", () => onSelectYear(record.ano));
      th.append(button); tr.append(th);
      const covered = knownCv(person) && !uncoveredYear(record);
      if (uncoveredYear(record)) tr.title = coverageMessage(person, record);
      tr.append(element("td", knownCv(person) ? recordCount(record) || (uncoveredYear(record) ? "—" : "0") : "—", "production-records"));
      for (let i = 1; i <= 8; i += 1) tr.append(element("td", bandText(record, `A${i}`, covered)));
      tr.append(element("td", pointText(record), "production-points"));
      tr.append(element("td", covered ? record.pendentes || 0 : "—"));
      const yearlyEvents = eventCounts(record);
      tr.append(element("td", covered ? yearlyEvents.classified : "—"));
      const pendingCell = element("td", covered ? yearlyEvents.pending : "—");
      if (covered && yearlyEvents.ineligible) pendingCell.append(element("small", `${yearlyEvents.ineligible} não elegível(is)`, "production-event-excluded"));
      tr.append(pendingCell);
      historyBody.append(tr);
    });
    historyTable.append(historyBody); historyScroll.append(historyTable); history.append(historyScroll);
    return history;
  }
  function appendClassifiedJournals(content, person, options = {}) {
    let count = 0;
    (person.anos || []).slice().sort((a, b) => b.ano - a.ano).forEach((record) => {
      const journals = (record.publicacoes || []).filter((pub) => pub.tipo === "periodico" && pub.status === "classificado");
      if (!journals.length) return;
      count += journals.length;
      const section = element("section", undefined, options.compact ? "production-publication-group production-journal-year" : "production-publication-group");
      const countLabel = `${journals.length} ${journals.length === 1 ? "artigo" : "artigos"}`;
      const heading = element("h3", options.compact ? `${record.ano} ` : `${record.ano} · ${countLabel}`);
      if (options.compact) heading.append(element("small", countLabel));
      section.append(heading);
      const list = element("ul", undefined, "production-publication-list");
      journals.forEach((pub) => list.append(publicationNode(pub, options)));
      section.append(list); content.append(section);
    });
    if (!count) content.append(element("p", "Nenhum artigo em periódico classificado no período analisado. Consulte o histórico para ver pendências e outros registros.", "production-empty"));
    return count;
  }
  function appendPublicationGroups(content, person, year, options = {}) {
    const a = annual(person, year), pubs = a.publicacoes || [];
    const groups = [
      { title: "Artigos em periódicos · classificados", items: pubs.filter((p) => p.tipo === "periodico" && p.status === "classificado") },
      { title: "Artigos em periódicos · pendentes", items: pubs.filter((p) => p.tipo === "periodico" && p.status !== "classificado") },
      { title: "Artigos em eventos · classificados", items: pubs.filter((p) => p.tipo === "anais_congressos" && p.status === "classificado") },
      { title: "Registros em eventos · pendentes", items: pubs.filter((p) => p.tipo === "anais_congressos" && p.status === "pendente_evento") },
      { title: "Registros em eventos · não elegíveis", items: pubs.filter((p) => p.tipo === "anais_congressos" && p.status === "evento_nao_elegivel") },
      { title: "Apresentações · fora da contagem de artigos", items: pubs.filter((p) => p.tipo === "apresentacao") },
      { title: "Notícias · fora da contagem de artigos", items: pubs.filter((p) => p.tipo === "noticia") }
    ];
    groups.forEach((group) => {
      if (!group.items.length) return;
      const section = element("div", undefined, "production-publication-group");
      section.append(element("h3", `${group.title} (${group.items.length})`));
      const ul = element("ul", undefined, "production-publication-list");
      group.items.forEach((pub) => ul.append(publicationNode(pub, options)));
      section.append(ul); content.append(section);
    });
    if (!pubs.length) content.append(element("p", knownCv(person)
      ? coverageMessage(person, a) || "Nenhuma publicação localizada neste ano nos dados extraídos do currículo. Esse resultado depende da atualização e da extração do Lattes."
      : "Adicione o PDF do Lattes às fontes e regenere o site para consultar este docente.", "production-empty"));
  }
  function showDetail(id, year, focus) {
    const person = people.find((p) => p.id === id);
    if (!person) return;
    selectedId = id;
    selectedYear = Number(year);
    const a = annual(person, selectedYear), events = eventCounts(a);
    document.querySelectorAll("#production-rows tbody tr").forEach((tr) => tr.classList.toggle("is-selected", tr.dataset.docenteId === id && Number(tr.dataset.ano) === selectedYear));
    document.getElementById("production-detail-year").textContent = `Publicações · ${selectedYear}`;
    const title = document.getElementById("production-detail-title");
    title.textContent = person.nome;
    document.getElementById("production-detail-summary").textContent = knownCv(person)
      ? coverageMessage(person, a) || (!recordCount(a)
        ? `Sem registros de ${selectedYear} no currículo atualizado em ${dateText(person.lattes_atualizado_em)}. Isso não comprova ausência de produção no ano.`
        : `Registros localizados: ${recordCount(a)}. Classificados: ${a.periodicos_classificados || 0} em periódicos e ${events.classified} em eventos. Pendentes: ${a.pendentes || 0} em periódicos e ${events.pending} em eventos.${events.ineligible ? ` Eventos não elegíveis: ${events.ineligible}.` : ""} ${a.pontos_referencia == null ? "A classificar; não há soma disponível." : `Pontos de referência: ${format.format(a.pontos_referencia)}${partial(a) ? " (parcial)" : ""}.`}`)
      : "Currículo indisponível. Não é possível concluir ausência de produção ou calcular os pontos.";
    document.getElementById("production-detail-cv-date").textContent = `Atualização do currículo: ${dateText(person.lattes_atualizado_em)} · Extração dos dados: ${dateText(person.extracao_atualizada_em)}.`;
    const links = document.getElementById("production-detail-links");
    links.replaceChildren(safeLink("Perfil do docente", `${app.dataset.detailUrl}?id=${encodeURIComponent(person.id)}`, "button quiet"));
    if (person.lattes_url) links.append(safeLink("Lattes", person.lattes_url, "button quiet"));
    if (person.lattes_pdf) links.append(safeLink("Currículo usado (PDF)", person.lattes_pdf, "button quiet"));
    const content = document.getElementById("production-detail-content");
    content.replaceChildren(historyNode(person, selectedYear, (year) => showDetail(person.id, year, false)));
    appendPublicationGroups(content, person, selectedYear);
    detail.hidden = false;
    if (focus) { detail.scrollIntoView({ block: "start", behavior: "smooth" }); title.focus({ preventScroll: true }); }
  }
  window.SiADoceProductionViews = Object.freeze({
    facultyGroup, historyNode, appendPublicationGroups, appendClassifiedJournals, annual, dateText, coverageMessage, pointText, eventCounts
  });
  if (!app) return;
  yearSelect.value = "all";
  yearSelect.addEventListener("change", () => {
    if (selectedYears().length > 1 && sortKey === "pontos") {
      sortKey = "nome"; sortDirection = 1;
      document.querySelectorAll(".production-table th[aria-sort]").forEach((th) => th.removeAttribute("aria-sort"));
      document.querySelector('[data-production-sort="nome"]').closest("th").setAttribute("aria-sort", "ascending");
    }
    render();
  });
  search.addEventListener("input", render);
  document.querySelectorAll("[data-production-sort]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = button.dataset.productionSort;
      sortDirection = next === sortKey ? -sortDirection : (next === "pontos" ? -1 : 1);
      sortKey = next;
      document.querySelectorAll(".production-table th[aria-sort]").forEach((th) => th.removeAttribute("aria-sort"));
      button.closest("th").setAttribute("aria-sort", sortDirection === 1 ? "ascending" : "descending");
      render();
    });
  });
  if (Array.isArray(data.docentes)) {
    const requested = new URL(window.location.href).searchParams.get("docente");
    const person = requested && people.find(item => item.id === requested);
    if (person) search.value = person.nome;
    render();
  } else {
    const notice = element("p", "Não foi possível carregar o histórico de produção docente.", "production-empty");
    notice.setAttribute("role", "alert");
    app.prepend(notice);
    app.querySelector(".production-metrics").hidden = true;
    table.closest(".production-card").hidden = true;
  }
})();
