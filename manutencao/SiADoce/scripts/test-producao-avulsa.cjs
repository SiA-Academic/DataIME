// Offline DOM checks: no browser, network, storage or canonical-data writes.
"use strict";
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const root = path.resolve(__dirname, "..");
class Element {
  constructor(tag) {
    this.tagName = tag; this.textContent = ""; this.children = [];
    this.dataset = {}; this.attrs = {}; this.handlers = {}; this.value = "";
    this.hidden = false; this.disabled = false; this.classes = new Set();
    this.classList = { add: name => this.classes.add(name),
      toggle: (name, on) => on ? this.classes.add(name) : this.classes.delete(name) };
  }
  append(...nodes) { for (const node of nodes) { node.parent = this; this.children.push(node); } }
  replaceChildren(...nodes) { this.children = []; this.append(...nodes); }
  setAttribute(key, value) { this.attrs[key] = value; }
  removeAttribute(key) { delete this.attrs[key]; }
  addEventListener(type, fn) { this.handlers[type] = fn; }
  remove() { this.parent.children = this.parent.children.filter(node => node !== this); }
  closest(tag) { return this.tagName === tag ? this : this.parent?.closest(tag); }
  querySelectorAll(tag) { return descendants(this).filter(node => node.tagName === tag); }
  scrollIntoView() {}
  focus() {}
}
const descendants = node => node.children.flatMap(child => [child, ...descendants(child)]);
const texts = node => descendants(node).map(child => String(child.textContent));
const joinedText = node => texts(node).join("\n");
const copy = value => JSON.parse(JSON.stringify(value));
const bands = Array.from({length: 8}, (_, i) => `A${i + 1}`);
const counts = (publications, type) => Object.fromEntries(bands.map(band => [band,
  publications.filter(pub => pub.status === "classificado" && pub.faixa === band && (!type || pub.tipo === type)).length]));
function annual(year, publications) {
  const journals = publications.filter(pub => pub.tipo === "periodico");
  const events = publications.filter(pub => pub.tipo === "anais_congressos");
  const pending = journals.filter(pub => pub.status !== "classificado").length;
  const eventPending = events.filter(pub => pub.status === "pendente_evento").length;
  return {ano: year, publicacoes: publications, pontos_status: pending + eventPending ? "parcial" : "registros_localizados",
    contagens: counts(publications), contagens_periodicos: counts(publications, "periodico"),
    contagens_eventos: counts(publications, "anais_congressos"),
    pontos_referencia: publications.filter(pub => pub.status === "classificado").reduce((sum, pub) => sum + (pub.pontos || 0), 0),
    periodicos_total: journals.length, periodicos_classificados: journals.length - pending, pendentes: pending,
    eventos_total: events.length, eventos_classificados: events.filter(pub => pub.status === "classificado").length,
    eventos_pendentes: eventPending, eventos_nao_elegiveis: events.filter(pub => pub.status === "evento_nao_elegivel").length,
    apresentacoes_total: 0};
}
function fixture() {
  const journal = {ano: 2027, titulo: '<img src=x onerror="danger()"> Research', veiculo: "Journal X",
    tipo: "periodico", status: "classificado", faixa: "A2", pontos: .875, percentil: 80, scopus: 80, jcr: null, base: "Scopus",
    referencia: "<script>danger()</script>", source_id: "123", issn: "12345679", eissn: "87654321",
    titulo_catalogo: "Journal X", match_method: "titulo_normalizado",
    motivo: "Faixa inicial estimada com métricas de 2025; ajustes CAPES por artigo não aplicados."};
  const olderJournal = {...journal, ano: 2026, titulo: "Earlier classified journal article"};
  const event = {ano: 2027, titulo: "Workshop article", veiculo: "Workshop X", tipo: "anais_congressos",
    status: "pendente_evento", faixa: null, pontos: null, faixa_evento_referencia: "A3", h5: 20,
    h5_ano: 2025, h5_periodo: "2020–2024", h5_consultado_em: "2026-10-20",
    fontes_evento: [{url: "https://example.org/evidence", titulo: "Primary evidence"}],
    pendencias_evento: ["Confirmar artigo completo."], motivo: "Pendente"};
  const classifiedEvent = {...event, titulo: "Classified conference article", status: "classificado",
    faixa: "A3", pontos: .75, pendencias_evento: [], motivo: "Evento classificado."};
  return {schema_version: 2, modo: "analise_avulsa", anos: [2026, 2027], periodo: "2026 a 2027",
    snapshot_ano: 2025, pesos: {A1: 1, A2: .875, A3: .75, A4: .625}, faixas: bands,
    docentes: [{id: "external-42", nome: "External <b>Professor</b>", categoria: "analise_avulsa",
      lattes_status: "disponivel", lattes_atualizado_em: "2027-03-12", extracao_atualizada_em: "2027-03-12T12:00:00Z",
      anos: [annual(2026, [olderJournal]), annual(2027, [journal, event, classifiedEvent])]}]};
}
function harness(sourceOverride) {
  const source = sourceOverride || JSON.parse(fs.readFileSync(path.join(root, "data/controle/producao-docente.json"), "utf8"));
  const ids = {};
  for (const name of ["data", "app", "year", "search", "rows", "detail", "count", "classified", "pending",
    "missing-cv", "events", "events-summary", "result-count", "empty", "detail-year", "detail-title",
    "detail-summary", "detail-cv-date", "detail-links", "detail-content"]) {
    ids[`production-${name}`] = new Element(name === "rows" ? "table" : "div");
  }
  for (const name of ["file", "clear", "status", "result", "warnings", "rows"]) {
    ids[`avulsa-${name}`] = new Element(name === "file" ? "input" : name === "rows" ? "table" : name === "warnings" ? "ul" : "div");
  }
  const avulsaHeader = new Element("thead"), avulsaHeaderRow = new Element("tr");
  for (const label of ["Docente", "Ano", "Registros no CV", ...bands, "Pontos", "Periódicos pendentes", "Eventos classificados", "Eventos pendentes"]) {
    const cell = new Element("th"); cell.textContent = label; avulsaHeaderRow.append(cell);
  }
  avulsaHeader.append(avulsaHeaderRow);
  const avulsaCaption = new Element("caption"); avulsaCaption.textContent = "Produção anual do currículo analisado";
  ids["avulsa-rows"].className = "production-table";
  ids["avulsa-rows"].append(avulsaCaption, avulsaHeader, new Element("tbody"));
  ids["avulsa-result"].append(ids["avulsa-warnings"], ids["avulsa-rows"]);
  ids["production-data"].textContent = JSON.stringify(source);
  ids["production-app"].dataset.detailUrl = "docentes/detalhe/index.html";
  const sorters = ["nome", "pontos"].map(key => {
    const th = new Element("th"), button = new Element("button");
    button.dataset.productionSort = key; th.append(button); return button;
  });
  const mainRows = () => descendants(ids["production-rows"]).filter(node => node.tagName === "tr");
  const document = {
    currentScript: {src: "file:///C:/SIA/SiADoce-institucional/js/producao.js"},
    getElementById: id => ids[id], createElement: tag => new Element(tag),
    createTextNode: text => {const node = new Element("#text"); node.textContent = text; return node;},
    querySelector: selector => sorters.find(button => selector.includes(`"${button.dataset.productionSort}"`)),
    querySelectorAll: selector => {
      if (selector === "#production-rows tbody tr") return mainRows();
      if (selector === "[data-production-sort]") return sorters;
      if (selector === ".production-table th[aria-sort]") return sorters.map(button => button.parent).filter(node => "aria-sort" in node.attrs);
      throw Error(`Unexpected selector ${selector}`);
    }
  };
  const window = {SIADOCE_DADOS: {institucional: true, producao: source},
    location: {href: "file:///C:/SIA/SiADoce-institucional/producao/index.html", origin: "null"}};
  const context = vm.createContext({document, window, URL, Intl, console,
    fetch() { throw Error("No network is permitted in the standalone view."); }});
  for (const name of ["producao.js", "producao-avulsa.js"]) {
    vm.runInContext(fs.readFileSync(path.join(root, "../../SiADoce/js", name), "utf8"), context);
  }
  const input = ids["avulsa-file"];
  async function load(value, name = "analise-lattes.json") {
    const content = JSON.stringify(value);
    input.files = [{name, size: Buffer.byteLength(content), text: async () => content}];
    await input.handlers.change();
  }
  return {ids, window, mainRows, load, input, sorters, official: JSON.stringify(source)};
}
function testMainTableTotals() {
  const h = harness(), source = JSON.parse(h.official);
  const allPublications = source.docentes.flatMap(person => person.anos.flatMap(record => record.publicacoes));
  const displayInteger = value => new Intl.NumberFormat("pt-BR").format(value);
  const displayPoints = value => new Intl.NumberFormat("pt-BR", {minimumFractionDigits: 3, maximumFractionDigits: 3}).format(value);
  const cellValue = cell => String(cell.textContent).replace(/\*$/, "");
  const groups = () => h.ids["production-rows"].children.filter(node => node.tagName === "tbody");
  const totals = () => h.mainRows().filter(row => row.dataset.total === "true");
  function verifyVisibleYears(expectedYears) {
  const multi = expectedYears.length > 1;
  assert.equal(groups().length, source.docentes.length);
  assert.equal(totals().length, multi ? source.docentes.length : 0, "Only multi-year faculty groups get a Total row");
  assert.equal(h.mainRows().length, source.docentes.length * (expectedYears.length + (multi ? 1 : 0)));
  assert.equal(h.sorters.find(button => button.dataset.productionSort === "pontos").disabled, multi);
  for (const person of source.docentes) {
    const records = person.anos.filter(record => expectedYears.includes(record.ano));
    const group = groups().find(node => node.dataset.docenteId === person.id);
    assert.equal(group.children[0].children[0].rowSpan, records.length + (multi ? 1 : 0));
    assert.deepEqual(group.children.filter(row => row.dataset.total !== "true").map(row => Number(row.dataset.ano)), expectedYears);
    if (!multi) continue;
    const total = group.children.at(-1);
    assert.equal(total.className, "production-total-row");
    assert.equal(total.dataset.docenteId, person.id);
    assert.equal(total.dataset.total, "true");
    assert.equal(total.dataset.ano, undefined, "Total is not another annual record");
    assert.equal(total.children.length, 14);
    assert.equal(total.children[0].textContent, "Total");
    assert.equal(descendants(total).filter(node => node.tagName === "button").length, 0);
    if (person.lattes_status !== "disponivel") {
      assert.ok(total.children.slice(1).every(cell => cell.textContent === "—"), "Missing CV never becomes zero in totals");
      continue;
    }
    // Use the raw publication list as independent evidence, rather than adding
    // already aggregated annual counts or invoking the implementation's helpers.
    const publications = records.flatMap(record => record.publicacoes);
    const classified = publications.filter(pub => pub.status === "classificado");
    const journalsPending = publications.filter(pub => pub.tipo === "periodico" && pub.status !== "classificado").length;
    const eventsPending = publications.filter(pub => pub.tipo === "anais_congressos" && pub.status === "pendente_evento").length;
    const uncovered = records.some(record => ["ano_sem_cobertura_cv", "cobertura_temporal_desconhecida"].includes(record.pontos_status));
    if (publications.length) assert.equal(cellValue(total.children[1]), displayInteger(publications.length));
    if (classified.length) {
      bands.forEach((band, i) => assert.equal(cellValue(total.children[i + 2]), displayInteger(classified.filter(pub => pub.faixa === band).length), `${person.nome}: total ${band}`));
      const points = classified.reduce((sum, pub) => sum + (pub.pontos ?? 0), 0);
      assert.equal(cellValue(total.children[10]), displayPoints(points), `${person.nome}: sum of assigned publication points`);
      assert.equal(String(total.children[10].textContent).endsWith("*"), Boolean(journalsPending || eventsPending || uncovered), `${person.nome}: partial total marker`);
    } else {
      assert.ok(total.children.slice(2, 10).every(cell => cell.textContent === "—"), "No classified articles means unknown band counts, not zero");
    }
    if (publications.length) {
      assert.equal(cellValue(total.children[11]), displayInteger(journalsPending));
      assert.equal(cellValue(total.children[12]), displayInteger(publications.filter(pub => pub.tipo === "anais_congressos" && pub.status === "classificado").length));
      assert.equal(cellValue(total.children[13]), displayInteger(eventsPending));
    }
  }
  const visiblePublications = allPublications.filter(pub => expectedYears.includes(pub.ano));
  assert.equal(Number(h.ids["production-count"].textContent), source.docentes.length);
  assert.equal(Number(h.ids["production-classified"].textContent), visiblePublications.filter(pub => pub.tipo === "periodico" && pub.status === "classificado").length, "The card counts only the selected years, once");
  assert.equal(Number(h.ids["production-pending"].textContent), visiblePublications.filter(pub => pub.tipo === "periodico" && pub.status !== "classificado").length);
  assert.equal(Number(h.ids["production-events"].textContent), visiblePublications.filter(pub => pub.tipo === "anais_congressos").length);
  }
  verifyVisibleYears(source.anos);
  const summaryIds = ["count", "classified", "pending", "events", "events-summary"];
  const allYearSummary = summaryIds.map(id => h.ids[`production-${id}`].textContent);
  const latest = Math.max(...source.anos);
  for (const count of [3, 2, 1]) {
    h.ids["production-year"].value = `last${count}`;
    h.ids["production-year"].handlers.change();
    verifyVisibleYears(source.anos.filter(year => year > latest - count));
  }
  h.ids["production-year"].value = "all";
  h.ids["production-year"].handlers.change();
  assert.deepEqual(summaryIds.map(id => h.ids[`production-${id}`].textContent), allYearSummary);
  const chosen = source.docentes.find(person => person.lattes_status === "disponivel");
  h.ids["production-search"].value = chosen.nome;
  h.ids["production-search"].handlers.input();
  assert.equal(groups().length, 1);
  assert.equal(totals().length, 1, "Search keeps the total with its faculty group");
  const firstAnnual = groups()[0].children[0];
  firstAnnual.children[1].children[0].handlers.click();
  assert.equal(h.ids["production-detail-year"].textContent, `Publicações · ${chosen.anos[0].ano}`);
  assert.equal(h.ids["production-detail-title"].textContent, chosen.nome);
  assert.ok(!totals()[0].classes.has("is-selected"));
  const detailHistory = descendants(h.ids["production-detail-content"]).find(node => node.tagName === "tbody");
  assert.equal(detailHistory.children.length, chosen.anos.length, "The detail history retains only annual rows");
  assert.equal(h.ids["production-data"].textContent, h.official, "Rendering totals never edits the canonical data");

  // Hand-calculated examples cover absent/partial data and bands outside the
  // weighted A1-A4 formula, even if the current production snapshot changes.
  const seed = fixture(), base = seed.docentes[0];
  const journal = base.anos[0].publicacoes[0], event = base.anos[1].publicacoes[1];
  const withoutCoverage = {...annual(2027, []), pontos_status: "ano_sem_cobertura_cv", pontos_referencia: null};
  const missingYears = [2026, 2027].map(year => ({...annual(year, []), pontos_status: "cv_ausente", pontos_referencia: null}));
  const pendingJournal = {...journal, status: "fora_catalogo", faixa: null, pontos: null};
  const pendingYears = [annual(2026, [pendingJournal]), annual(2027, [event])].map(record => ({...record, pontos_referencia: null}));
  const lowerYears = [annual(2026, [{...journal, faixa: "A5", pontos: null}]), annual(2027, [{...journal, ano: 2027, faixa: "A8", pontos: null}])];
  const cases = [
    ["partial", base.anos, "disponivel", "2,500*"],
    ["uncovered", [base.anos[0], withoutCoverage], "disponivel", "0,875*"],
    ["missing", missingYears, "ausente", "—"],
    ["pending", pendingYears, "disponivel", "A classificar"],
    ["empty-uncovered", [annual(2026, []), withoutCoverage], "disponivel", "—"],
    ["lower-bands", lowerYears, "disponivel", "0,000"]
  ];
  seed.docentes = cases.map(([id, anos, status]) => ({...base, id, nome: id, categoria: "pleno", lattes_status: status, anos}));
  const fixtureBefore = JSON.stringify(seed), special = harness(seed);
  for (const [id, , , expected] of cases) {
    const row = special.mainRows().find(item => item.dataset.docenteId === id && item.dataset.total === "true");
    assert.equal(row.children[10].textContent, expected, `Total point state: ${id}`);
    if (id === "lower-bands") {
      assert.equal(row.children[6].textContent, "1", "A5 articles are counted");
      assert.equal(row.children[9].textContent, "1", "A8 articles are counted");
    }
  }
  assert.equal(JSON.stringify(seed), fixtureBefore);
  console.log(`PASS: ${source.docentes.length} faculty totals match publications, bands, assigned points and pending/event counts; year filter, search, detail and missing/partial cases preserve their meaning.`);
}
function testRollingPeriodFilters() {
  const seed = fixture(), base = seed.docentes[0], journal = base.anos[0].publicacoes[0];
  const event = base.anos[1].publicacoes[1];
  const conference = {...event, ano: 2034, status: "classificado", faixa: "A3", pontos: .75};
  const a1 = {...journal, ano: 2034, faixa: "A1", pontos: 1, percentil: 90, scopus: 90};
  seed.anos = [2030, 2031, 2032, 2033, 2034];
  seed.periodo = "2030 a 2034";
  const person = (id, nome, publications) => ({...base, id, nome, categoria: "pleno", lattes_atualizado_em: "2034-12-31",
    anos: seed.anos.map(year => {
      const result = annual(year, publications.filter(pub => pub.ano === year));
      if (result.eventos_pendentes && !result.eventos_classificados && !result.periodicos_classificados) result.pontos_referencia = null;
      return result;
    })});
  seed.docentes = [
    person("alpha", "Alpha", [{...journal, ano: 2030}, {...journal, ano: 2032}, conference]),
    person("beta", "Beta", [{...journal, ano: 2031}, {...event, ano: 2033}, a1]),
    person("gamma", "Gamma", [])
  ];
  const before = JSON.stringify(seed), h = harness(seed);
  const period = value => { h.ids["production-year"].value = value; h.ids["production-year"].handlers.change(); };
  const rowsFor = id => h.mainRows().filter(row => row.dataset.docenteId === id);
  const yearsFor = id => rowsFor(id).filter(row => !row.dataset.total).map(row => Number(row.dataset.ano));
  const totalPoints = id => rowsFor(id).find(row => row.dataset.total === "true").children[10].textContent;
  const pointsSort = h.sorters.find(button => button.dataset.productionSort === "pontos");
  const groupOrder = () => h.ids["production-rows"].children.filter(node => node.tagName === "tbody").map(node => node.dataset.docenteId);
  const clickYear = (id, year) => {
    const row = rowsFor(id).find(node => Number(node.dataset.ano) === year);
    descendants(row).find(node => node.tagName === "button" && String(node.textContent) === String(year)).handlers.click();
  };
  clickYear("alpha", 2030);
  period("last3");
  assert.deepEqual(yearsFor("alpha"), [2032, 2033, 2034], "Recent periods follow the dataset's latest year, not today's year");
  assert.equal(totalPoints("alpha"), "1,625");
  assert.equal(totalPoints("beta"), "1,000*");
  assert.equal(Number(h.ids["production-classified"].textContent), 2);
  assert.equal(Number(h.ids["production-events"].textContent), 2);
  assert.equal(h.ids["production-detail-year"].textContent, "Publicações · 2034", "An excluded detail year moves to a populated year in the new period");
  clickYear("alpha", 2032);
  period("all");
  assert.equal(h.ids["production-detail-year"].textContent, "Publicações · 2032", "A detail year still in the selected period is retained");
  assert.deepEqual(yearsFor("alpha"), [2030, 2031, 2032, 2033, 2034]);
  assert.equal(totalPoints("alpha"), "2,500");
  period("last2");
  assert.deepEqual(yearsFor("alpha"), [2033, 2034]);
  assert.equal(totalPoints("alpha"), "0,750", "Older journal points do not leak into the recent total");
  assert.equal(totalPoints("beta"), "1,000*");
  assert.equal(pointsSort.disabled, true);
  h.ids["production-search"].value = "Alpha";
  h.ids["production-search"].handlers.input();
  assert.equal(h.ids["production-year"].value, "last2");
  assert.deepEqual(yearsFor("alpha"), [2033, 2034], "Searching keeps the selected period");
  assert.deepEqual(groupOrder(), ["alpha"]);
  rowsFor("alpha")[0].children[0].children[0].handlers.click();
  assert.equal(h.ids["production-detail-year"].textContent, "Publicações · 2034", "Clicking a faculty name opens a visible year");
  h.ids["production-search"].value = "";
  h.ids["production-search"].handlers.input();
  period("last1");
  assert.deepEqual(yearsFor("alpha"), [2034]);
  assert.equal(h.mainRows().length, 3);
  assert.ok(h.mainRows().every(row => !row.dataset.total));
  assert.equal(pointsSort.disabled, false);
  assert.equal(Number(h.ids["production-events"].textContent), 1, "The pending event from the earlier year is excluded");
  pointsSort.handlers.click();
  assert.deepEqual(groupOrder(), ["beta", "alpha", "gamma"], "Latest-year sorting uses that year's points and places absent scores last");
  period("last3");
  assert.equal(pointsSort.disabled, true);
  assert.deepEqual(groupOrder(), ["alpha", "beta", "gamma"], "Returning to multiple years resets sorting by name");
  const gammaFirstRow = rowsFor("gamma")[0];
  gammaFirstRow.children[0].children[0].handlers.click();
  assert.equal(h.ids["production-detail-year"].textContent, "Publicações · 2034", "An empty CV opens the most recent visible year");
  assert.equal(JSON.stringify(seed), before);
  console.log("PASS: rolling periods follow dataset years, sum only visible publications, preserve search/detail and switch point sorting correctly.");
}
(async () => {
  const {ids, window, mainRows, load, input} = harness();
  const validate = window.SiADoceAvulsa.validate;
  const inputData = fixture(), originalData = JSON.stringify(inputData);
  validate(inputData);
  assert.equal(JSON.stringify(inputData), originalData, "Validator may not modify analysis input");
  const officialRows = mainRows().map(row => `${row.dataset.docenteId}:${row.dataset.ano}`);
  const summaryIds = ["count", "classified", "pending", "events", "events-summary"];
  const officialSummary = summaryIds.map(id => ids[`production-${id}`].textContent);
  const table = ids["avulsa-rows"], originalHeader = table.children.find(node => node.tagName === "thead");
  const staticParts = table.children.filter(node => node.tagName !== "tbody");
  const bodyRows = () => table.children.find(node => node.tagName === "tbody")?.children || [];
  const cellText = node => [String(node.textContent), ...texts(node)].join("").trim();
  const rowValues = row => row.children.slice(row.children.length === 15 ? 1 : 0).map(cellText);
  function assertOfficialUnchanged() {
    assert.deepEqual(mainRows().map(row => `${row.dataset.docenteId}:${row.dataset.ano}`), officialRows);
    assert.deepEqual(summaryIds.map(id => ids[`production-${id}`].textContent), officialSummary);
  }
  function assertTableOnly(data) {
    const person = data.docentes[0], rows = bodyRows();
    assert.equal(ids["avulsa-result"].hidden, false);
    assert.equal(ids["avulsa-clear"].hidden, false);
    assert.equal(table.children.filter(node => node.tagName === "tbody").length, 1);
    assert.deepEqual(table.children.filter(node => node.tagName !== "tbody"), staticParts, "The caption and static header are preserved on each load");
    assert.equal(originalHeader.children[0].children.length, 15);
    assert.equal(rows.length, person.anos.length + 1, "Every annual record plus Total is shown, even for one year");
    assert.equal(rows[0].children.length, 15);
    assert.equal(rows[0].children[0].rowSpan, rows.length);
    assert.ok(cellText(rows[0].children[0]).includes(person.nome), "Faculty names are rendered literally in the shared name cell");
    assert.deepEqual(rows.slice(0, -1).map(row => Number(row.dataset.ano)), person.anos.map(record => record.ano));
    assert.ok(rows.every(row => row.dataset.docenteId === person.id));
    assert.ok(rows.slice(1).every(row => row.children.length === 14));
    assert.equal(rows.at(-1).dataset.total, "true");
    assert.equal(rows.at(-1).dataset.ano, undefined);
    assert.equal(rowValues(rows.at(-1))[0], "Total");
    assert.equal(descendants(ids["avulsa-result"]).filter(node => node.tagName === "table").length, 1);
    assert.ok(!descendants(ids["avulsa-result"]).some(node => ["button", "a", "h2", "h3", "h4", "details", "article", "script", "img", "b"].includes(node.tagName)),
      "Standalone results contain only the summary table and optional audit warnings, without clickable years or article lists");
    assertOfficialUnchanged();
  }
  await load(inputData);
  assertTableOnly(inputData);
  assert.equal(ids["avulsa-warnings"].hidden, true);
  assert.match(cellText(bodyRows()[0].children[0]), /External <b>Professor<\/b>/);
  assert.match(cellText(bodyRows()[0].children[0]), /12\/03\/2027/, "The curriculum date stays with the faculty name");
  assert.deepEqual(rowValues(bodyRows()[0]), ["2026", "1", "0", "1", "0", "0", "0", "0", "0", "0", "0,875", "0", "0", "0"]);
  assert.deepEqual(rowValues(bodyRows()[1]), ["2027", "3", "0", "1", "1", "0", "0", "0", "0", "0", "1,625*", "0", "1", "1"]);
  assert.deepEqual(rowValues(bodyRows()[2]), ["Total", "4", "0", "2", "1", "0", "0", "0", "0", "0", "2,500*", "0", "1", "1"]);
  assert.doesNotMatch(joinedText(ids["avulsa-result"]), /Workshop article|Earlier classified journal article|Research|Classified conference article/);
  const oneYear = copy(inputData);
  oneYear.anos = [2026]; oneYear.periodo = "2026"; oneYear.docentes[0].anos = [oneYear.docentes[0].anos[0]];
  await load(oneYear);
  assertTableOnly(oneYear);
  assert.equal(bodyRows().length, 2);
  assert.equal(rowValues(bodyRows()[1])[10], "0,875");
  const officialDetail = new Element("div");
  window.SiADoceProductionViews.appendPublicationGroups(officialDetail, inputData.docentes[0], 2027);
  const fullDetailText = joinedText(officialDetail);
  for (const detail of [/Percentis 2025:/, /Correspondência:/, /Faixa inicial estimada com métricas/, /Referência extraída do currículo/]) {
    assert.match(fullDetailText, detail, "The official view retains full publication details");
  }
  assert.ok(!descendants(officialDetail).some(node => node.className === "production-publication-summary"), "The full view keeps its original structure");
  for (const publication of descendants(officialDetail).filter(node => node.className === "production-publication")) {
    assert.equal(publication.children.length, 2);
    assert.equal(publication.children[1].className, "production-publication-score");
  }
  ids["avulsa-clear"].handlers.click();
  assert.equal(ids["avulsa-result"].hidden, true);
  assert.deepEqual(table.children, staticParts, "Clearing removes only the dynamic tbody, retaining caption and header");
  assert.equal(input.value, "");
  const invalidCases = [
    [data => {data.modo = "oficial";}, /análise avulsa/],
    [data => {data.snapshot_ano = 2024;}, /métricas de 2025/],
    [data => {data.snapshot_ano = 2026;}, /métricas de 2025/],
    [data => {data.docentes.push(copy(data.docentes[0]));}, /exatamente um/],
    [data => {data.docentes[0].anos[1].publicacoes[1].fontes_evento = ["javascript:alert(1)"];}, /HTTP/],
    [data => {data.docentes[0].anos[1].publicacoes[1].fontes_evento = ["file:///C:/private"];}, /HTTP/],
    [data => {data.docentes[0].anos[1].publicacoes[0].pontos = 1;}, /peso/],
    [data => {data.docentes[0].anos[1].publicacoes[0].percentil = 0;}, /maior percentil/],
    [data => {const pub = data.docentes[0].anos[1].publicacoes[0]; pub.percentil = pub.scopus = 74;}, /faixa/],
    [data => {data.docentes[0].anos[1].publicacoes[0].jcr = 90;}, /maior percentil/],
    [data => {const pub = data.docentes[0].anos[1].publicacoes[0]; pub.scopus = pub.jcr = null;}, /maior percentil/],
    [data => {data.docentes[0].anos[1].publicacoes[0].base = "JCR";}, /base/],
    [data => {data.docentes[0].anos[1].contagens.A1 = 1;}, /contagens/],
    [data => {data.docentes[0].anos[1].contagens.FAKE = 1;}, /contagens/],
    [data => {data.docentes[0].anos[1].pontos_referencia = null;}, /soma/],
    [data => {data.docentes[0].anos[1].eventos_pendentes = 0;}, /contagem/],
    [data => {data.docentes[0].anos[1].publicacoes[1].faixa = "A3";}, /pendente/],
    [data => {data.docentes[0].anos[0].ano = 2027;}, /Ano/],
    [data => {data.docentes[0].anos[1].publicacoes[1].pendencias_evento = {};}, /Motivos/]
  ];
  for (const [mutate, error] of invalidCases) {
    const bad = fixture(); mutate(bad); assert.throws(() => validate(bad), error);
  }
  // Classification uses exact boundaries, without rounding or treating zero as absent.
  const metricCases = [
    [100, "A1"], [87.5, "A1"], [87.499, "A2"], [75, "A2"], [74.999, "A3"],
    [62.5, "A3"], [50, "A4"], [37.5, "A5"], [25, "A6"], [12.5, "A7"], [0, "A8"]
  ];
  const weights = {A1: 1, A2: .875, A3: .75, A4: .625};
  for (const [percentile, band] of metricCases) {
    for (const base of ["Scopus", "JCR", "Scopus e JCR"]) {
      const data = fixture(), pub = data.docentes[0].anos[1].publicacoes[0];
      Object.assign(pub, {percentil: percentile, faixa: band, pontos: weights[band] ?? null, base,
        scopus: base === "JCR" ? null : percentile,
        jcr: base === "Scopus" ? null : percentile});
      data.docentes[0].anos[1] = annual(2027, [pub]);
      validate(data);
    }
  }
  const pendingType = fixture(), pendingPublication = pendingType.docentes[0].anos[1].publicacoes[0];
  Object.assign(pendingPublication, {status: "pendente_tipo", faixa: null, pontos: null,
    motivo: "Falta comprovar que a correção editorial é um artigo completo."});
  pendingType.docentes[0].anos[1] = annual(2027, [pendingPublication]);
  pendingType.docentes[0].anos[1].pontos_referencia = null;
  validate(pendingType); await load(pendingType);
  assertTableOnly(pendingType);
  assert.equal(rowValues(bodyRows()[1])[10], "A classificar");
  assert.equal(rowValues(bodyRows()[1])[11], "1");
  assert.equal(rowValues(bodyRows()[2])[10], "0,875*");
  assert.doesNotMatch(joinedText(ids["avulsa-result"]), /Falta comprovar|Referência extraída|Percentis 2025:/);
  const noCoverage = fixture();
  noCoverage.docentes[0].lattes_atualizado_em = null;
  noCoverage.docentes[0].anos[0] = annual(2026, []);
  noCoverage.docentes[0].anos[0].pontos_status = "cobertura_temporal_desconhecida";
  noCoverage.docentes[0].anos[0].pontos_referencia = null;
  validate(noCoverage); await load(noCoverage);
  assertTableOnly(noCoverage);
  assert.equal(rowValues(bodyRows()[0])[10], "—", "Unknown coverage is not converted to zero points");
  const noSections = fixture();
  noSections.docentes[0].anos = [annual(2026, []), annual(2027, [])];
  noSections.docentes[0].anos.forEach(record => {
    record.pontos_status = "cobertura_temporal_desconhecida"; record.pontos_referencia = null;
  });
  noSections.auditoria = {avisos: ["Nenhuma seção de artigos completos foi reconhecida.",
    "A data de atualização do currículo não foi localizada."]};
  await load(noSections);
  assertTableOnly(noSections);
  assert.equal(ids["avulsa-warnings"].hidden, false);
  assert.deepEqual(texts(ids["avulsa-warnings"]), noSections.auditoria.avisos, "Extraction warnings remain visible when present");
  assert.ok(bodyRows().every(row => rowValues(row)[10] === "—"));
  await load(inputData);
  assert.equal(ids["avulsa-warnings"].hidden, true);
  assert.equal(ids["avulsa-warnings"].children.length, 0, "Loading a valid new CV removes earlier warnings");
  assertTableOnly(inputData);
  await load(inputData, "curriculo.pdf");
  assert.equal(ids["avulsa-result"].hidden, true);
  assert.equal(bodyRows().length, 0);
  assert.match(ids["avulsa-status"].textContent, /PDF precisa ser processado/);
  let resolveRead;
  input.files = [{name: "analise-lattes.json", size: 100, text: () => new Promise(resolve => {resolveRead = resolve;})}];
  const reading = input.handlers.change();
  ids["avulsa-clear"].handlers.click();
  resolveRead(JSON.stringify(inputData)); await reading;
  assert.equal(ids["avulsa-result"].hidden, true, "Clearing during read cancels the late result");
  assert.equal(bodyRows().length, 0);
  let resolveOld;
  input.files = [{name: "antigo.json", size: 100, text: () => new Promise(resolve => {resolveOld = resolve;})}];
  const oldReading = input.handlers.change();
  const newer = copy(oneYear); newer.docentes[0].nome = "Currículo mais recente";
  await load(newer);
  resolveOld(JSON.stringify(inputData)); await oldReading;
  assertTableOnly(newer);
  assert.doesNotMatch(joinedText(table), /External <b>Professor/);
  assertOfficialUnchanged();
  testMainTableTotals();
  testRollingPeriodFilters();
  if (process.argv[2]) {
    const real = JSON.parse(fs.readFileSync(path.resolve(process.argv[2]), "utf8"));
    validate(real); await load(real);
    assertTableOnly(real);
    console.log("PASS: generated standalone Lattes JSON validates and renders as a single faculty table.");
  }
  console.log("PASS: standalone table, all years plus Total, literal name and CV date, clear/header preservation, no article lists, URL checks, count/point coherence and read races.");
})().catch(error => {console.error(error); process.exitCode = 1;});
