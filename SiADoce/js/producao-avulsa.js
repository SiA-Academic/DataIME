(function () {
  "use strict";
  const MAX_BYTES = 8 * 1024 * 1024;
  const METRIC_YEAR = 2025;
  const weights = Object.freeze({ A1: 1, A2: .875, A3: .75, A4: .625 });
  const bands = Array.from({ length: 8 }, (_, i) => `A${i + 1}`);
  const journalMinimums = [87.5, 75, 62.5, 50, 37.5, 25, 12.5, 0];
  const statuses = {
    periodico: ["classificado", "fora_catalogo", "sem_percentil", "ambiguo", "conflito_identificacao", "pendente_tipo"],
    anais_congressos: ["classificado", "pendente_evento", "evento_nao_elegivel"],
    apresentacao: ["nao_pontuado"], noticia: ["nao_pontuado"]
  };
  function require(condition, message) { if (!condition) throw new Error(message); }
  function object(value) { return value !== null && typeof value === "object" && !Array.isArray(value); }
  function text(value, max = 50000) { return typeof value === "string" && value.length <= max; }
  function integer(value) { return Number.isSafeInteger(value) && value >= 0; }
  function year(value) { return Number.isInteger(value) && value >= 1900 && value <= 2200; }
  function nullableNumber(value, min, max) {
    return value === null || (typeof value === "number" && Number.isFinite(value) && value >= min && value <= max);
  }
  function date(value) {
    return value === null || value === undefined || (text(value, 40) &&
      /^\d{4}-\d{2}-\d{2}(T.*)?$/.test(value) && Number.isFinite(Date.parse(value)));
  }
  function webUrl(value) {
    if (!text(value, 10000)) return false;
    try { const url = new URL(value); return ["http:", "https:"].includes(url.protocol) && !url.username && !url.password; }
    catch (_) { return false; }
  }
  function validateSources(value, label) {
    if (value === null || value === undefined) return;
    require(Array.isArray(value) && value.length <= 1000, `Lista de fontes inválida: ${label}.`);
    value.forEach(source => require(
      typeof source === "string" ? webUrl(source)
        : object(source) && webUrl(source.url) && (source.titulo === undefined || text(source.titulo, 10000)),
      `Fonte inválida em ${label}; são aceitos apenas endereços HTTP(S).`
    ));
  }
  function validatePublication(pub, expectedYear) {
    require(object(pub) && pub.ano === expectedYear && text(pub.titulo) && pub.titulo.trim(),
      "Há uma publicação sem título ou com ano inconsistente.");
    require(Object.prototype.hasOwnProperty.call(statuses, pub.tipo) && statuses[pub.tipo].includes(pub.status),
      "Tipo ou situação de publicação não reconhecido. Gere a análise novamente com o script atual.");
    const strings = ["veiculo", "referencia", "doi", "identificacao_doi", "issn", "eissn", "base",
      "titulo_catalogo", "match_method", "evento_canonico", "evento_trilha", "verificacao_artigo_nota",
      "revisao_artigo_nota", "h5_periodo", "h5_nota", "criterio_evento", "motivo"];
    strings.forEach(key => require(pub[key] === null || pub[key] === undefined || text(pub[key]),
      `Campo textual inválido na publicação: ${key}.`));
    require(pub.source_id === null || pub.source_id === undefined || text(pub.source_id, 200) || integer(pub.source_id),
      "Identificador do periódico inválido.");
    ["percentil", "scopus", "jcr"].forEach(key => require(
      pub[key] === undefined || nullableNumber(pub[key], 0, 100), `Percentil inválido: ${key}.`
    ));
    require(pub.h5 === undefined || pub.h5 === null || integer(pub.h5), "H5 inválido.");
    require(pub.h5_ano === undefined || pub.h5_ano === null || year(pub.h5_ano), "Ano da métrica H5 inválido.");
    require(date(pub.h5_consultado_em), "Data de consulta H5 inválida.");
    require(pub.gt_anos_validos === undefined || pub.gt_anos_validos === null ||
      (Array.isArray(pub.gt_anos_validos) && pub.gt_anos_validos.length <= 301 && pub.gt_anos_validos.every(year)),
    "Edições de evento inválidas.");
    require(pub.pendencias_evento === undefined || pub.pendencias_evento === null ||
      (Array.isArray(pub.pendencias_evento) && pub.pendencias_evento.length <= 1000 && pub.pendencias_evento.every(v => text(v))),
    "Motivos de pendência inválidos.");
    ["fontes_evento", "alias_fontes", "identificacao_fontes"].forEach(key => validateSources(pub[key], key));
    require(pub.faixa_evento_referencia === undefined || pub.faixa_evento_referencia === null ||
      bands.includes(pub.faixa_evento_referencia), "Faixa candidata inválida.");
    if (pub.status === "classificado") {
      require(bands.includes(pub.faixa), "Publicação classificada sem faixa válida.");
      if (pub.tipo === "periodico") {
        const available = [pub.scopus, pub.jcr].filter(value => typeof value === "number");
        require(available.length > 0 && pub.percentil === Math.max(...available),
          "O percentil do periódico não corresponde ao maior percentil disponível entre Scopus e JCR.");
        const expectedBand = bands[journalMinimums.findIndex(minimum => pub.percentil >= minimum)];
        require(pub.faixa === expectedBand,
          "A faixa do periódico não corresponde ao percentil informado. Gere novamente o resultado.");
        const expectedBase = pub.scopus === pub.jcr ? "Scopus e JCR"
          : pub.scopus === pub.percentil ? "Scopus" : "JCR";
        require(pub.base === expectedBase,
          "A base do maior percentil do periódico está inconsistente.");
      }
      require(pub.pontos === (weights[pub.faixa] === undefined ? null : weights[pub.faixa]),
        "O peso da publicação não corresponde à faixa. Gere novamente o resultado.");
    } else {
      require((pub.faixa === null || pub.faixa === undefined) && (pub.pontos === null || pub.pontos === undefined),
        "Uma publicação pendente ou não elegível não pode receber faixa aplicada ou pontos.");
    }
  }
  function validate(data) {
    require(object(data) && data.schema_version === 2 && data.modo === "analise_avulsa",
      "Este não é um resultado de análise avulsa. Execute analisar-lattes.ps1 no PDF e selecione analise-lattes.json.");
    require(Array.isArray(data.anos) && data.anos.length > 0 && data.anos.length <= 100 &&
      data.anos.every((value, i) => year(value) && (!i || value > data.anos[i - 1])),
    "A janela de anos do arquivo é inválida.");
    require(text(data.periodo, 300) && data.periodo.trim(), "O período da análise não foi informado.");
    require(data.snapshot_ano === METRIC_YEAR,
      `Esta versão usa métricas de ${METRIC_YEAR}. Gere a análise com o catálogo e o script vigentes.`);
    require(object(data.pesos) && Object.keys(data.pesos).length === 4 &&
      Object.keys(weights).every(band => data.pesos[band] === weights[band]),
    "Os pesos deste arquivo não correspondem ao classificador atual.");
    require(Array.isArray(data.faixas) && JSON.stringify(data.faixas) === JSON.stringify(bands),
      "As faixas do arquivo não correspondem ao classificador atual.");
    require(Array.isArray(data.docentes) && data.docentes.length === 1,
      "A análise avulsa deve conter exatamente um currículo.");
    const person = data.docentes[0];
    require(object(person) && text(person.id, 500) && person.id.trim() && text(person.nome, 1000) && person.nome.trim(),
      "O currículo não possui identificação válida.");
    require(person.categoria === "analise_avulsa" && person.lattes_status === "disponivel",
      "O arquivo precisa ter sido produzido como análise avulsa de um PDF disponível.");
    require(date(person.lattes_atualizado_em) && date(person.extracao_atualizada_em),
      "A data do currículo ou da extração é inválida.");
    require(person.lattes_url === undefined || person.lattes_url === null || webUrl(person.lattes_url),
      "O endereço Lattes não é válido.");
    require(data.auditoria === undefined || (object(data.auditoria) &&
      (data.auditoria.avisos === undefined || (Array.isArray(data.auditoria.avisos) &&
        data.auditoria.avisos.length <= 1000 && data.auditoria.avisos.every(value => text(value))))),
    "Os avisos da extração são inválidos.");
    require(Array.isArray(person.anos) && person.anos.length === data.anos.length,
      "O histórico não contém exatamente os anos indicados.");
    const coverageStatuses = ["ano_sem_cobertura_cv", "cobertura_temporal_desconhecida",
      "parcial", "registros_localizados"];
    let total = 0;
    person.anos.forEach((record, index) => {
      require(object(record) && record.ano === data.anos[index] && coverageStatuses.includes(record.pontos_status),
        "Ano ou situação de cobertura inválido no histórico.");
      require(Array.isArray(record.publicacoes), "Falta a lista de publicações do ano.");
      total += record.publicacoes.length;
      require(total <= 20000, "O arquivo excede o limite de 20 mil registros.");
      record.publicacoes.forEach(pub => validatePublication(pub, record.ano));
      const publications = record.publicacoes;
      const classified = publications.filter(pub => pub.status === "classificado");
      require(object(record.contagens) && Object.keys(record.contagens).length === bands.length &&
        bands.every(band => integer(record.contagens[band]) &&
        record.contagens[band] === classified.filter(pub => pub.faixa === band).length),
      "As contagens de faixas não conferem com as publicações.");
      const journal = publications.filter(pub => pub.tipo === "periodico");
      const events = publications.filter(pub => pub.tipo === "anais_congressos");
      [["contagens_periodicos", journal], ["contagens_eventos", events]].forEach(([key, subset]) => {
        require(object(record[key]) && Object.keys(record[key]).length === bands.length &&
          bands.every(band => integer(record[key][band]) &&
          record[key][band] === subset.filter(pub => pub.status === "classificado" && pub.faixa === band).length),
        `As contagens ${key} não conferem com as publicações.`);
      });
      const expected = {
        periodicos_total: journal.length, periodicos_classificados: journal.filter(pub => pub.status === "classificado").length,
        pendentes: journal.filter(pub => pub.status !== "classificado").length,
        eventos_total: events.length, eventos_classificados: events.filter(pub => pub.status === "classificado").length,
        eventos_pendentes: events.filter(pub => pub.status === "pendente_evento").length,
        eventos_nao_elegiveis: events.filter(pub => pub.status === "evento_nao_elegivel").length,
        apresentacoes_total: publications.filter(pub => pub.tipo === "apresentacao").length
      };
      Object.keys(expected).forEach(key => require(record[key] === expected[key],
        `A contagem ${key} não confere com os registros de ${record.ano}.`));
      const sum = classified.reduce((value, pub) => value + (weights[pub.faixa] || 0), 0);
      const uncovered = ["cv_ausente", "ano_sem_cobertura_cv", "cobertura_temporal_desconhecida"].includes(record.pontos_status);
      const pending = expected.pendentes + expected.eventos_pendentes;
      const expectedPoints = uncovered ? null : classified.length ? sum : pending ? null : 0;
      require(record.pontos_referencia === expectedPoints,
        "A soma de pontos não confere com os artigos classificados.");
      require(!uncovered || publications.length === 0, "Há registros conhecidos em um ano marcado sem cobertura.");
      require(uncovered || record.pontos_status === (pending ? "parcial" : "registros_localizados"),
        "O aviso de soma parcial não corresponde às pendências.");
    });
    return data;
  }
  // The controller reads only a user-selected file; no fetch, storage or upload.
  const input = document.getElementById("avulsa-file");
  const views = window.SiADoceProductionViews;
  window.SiADoceAvulsa = Object.freeze({ validate });
  if (!input || !views) return;
  const byId = id => document.getElementById(id);
  let revision = 0;
  function message(value, error = false) {
    byId("avulsa-status").textContent = value;
    byId("avulsa-status").classList.toggle("is-error", error);
  }
  function clear(resetInput = true) {
    revision += 1;
    if (resetInput) input.value = "";
    byId("avulsa-result").hidden = true;
    byId("avulsa-clear").hidden = true;
    byId("avulsa-rows").querySelectorAll("tbody").forEach(body => body.remove());
    byId("avulsa-warnings").replaceChildren();
    byId("avulsa-warnings").hidden = true;
    message("");
  }
  input.addEventListener("change", async () => {
    clear(false);
    const version = revision, file = input.files && input.files[0];
    if (!file) return;
    if (!/\.json$/i.test(file.name)) {
      message("Selecione analise-lattes.json. O PDF precisa ser processado primeiro pelo script no computador.", true); return;
    }
    if (file.size > MAX_BYTES) { message("O JSON excede o limite de 8 MiB.", true); return; }
    message("Lendo e conferindo o resultado…");
    try {
      const source = await file.text();
      if (version !== revision) return;
      let parsed;
      try { parsed = JSON.parse(source.replace(/^\uFEFF/, "")); }
      catch (_) { throw new Error("O arquivo não contém JSON válido. Gere novamente a análise do PDF."); }
      const analysis = validate(parsed);
      const person = analysis.docentes[0];
      const warnings = (analysis.auditoria && analysis.auditoria.avisos) || [];
      warnings.forEach(value => {
        const item = document.createElement("li"); item.textContent = value; byId("avulsa-warnings").append(item);
      });
      byId("avulsa-warnings").hidden = warnings.length === 0;
      byId("avulsa-rows").append(views.facultyGroup(person, person.anos, { nameLink: false, includeTotal: true }));
      byId("avulsa-result").hidden = false;
      byId("avulsa-clear").hidden = false;
      message("");
    } catch (error) {
      message(error.message || "Não foi possível abrir a análise.", true);
    }
  });
  byId("avulsa-clear").addEventListener("click", () => clear());
})();
