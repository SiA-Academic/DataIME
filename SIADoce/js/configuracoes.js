(function () {
  const DEFAULT_ALERT_RULES = {
    publicacoes_4_anos_min: 2,
    alunos_ativos_min: 1,
    projetos_sem_coordenar_anos_vermelho: 3
  };

  const GENERAL_FIELDS = [
    ["interface.instituicao", "Instituição", "text"],
    ["interface.instancia", "Instância atual", "text"],
    ["interface.logo", "Arquivo do logo", "text"],
    ["interface.rodape", "Rodapé", "text"]
  ];

  const SCORE_LABELS = {
    ativo: "Alunos ativos",
    desligado: "Desligamentos",
    evasao: "Evasão (%)",
    tempo_medio_mestrado: "Tempo médio ME",
    tempo_medio_doutorado: "Tempo médio DO",
    tempo_medio_doutorado_direto: "Tempo médio DD",
    publicacoes: "Publicações totais",
    disciplinas: "Turmas ministradas",
    credenciamento_vencimento_meses: "Fim do credenciamento"
  };

  const SCORE_SECTIONS = [
    {
      title: "",
      description: "",
      keys: ["ativo", "desligado", "evasao", "tempo_medio_mestrado", "tempo_medio_doutorado", "tempo_medio_doutorado_direto", "publicacoes", "disciplinas", "credenciamento_vencimento_meses"]
    }
  ];


  const SCORE_FALLBACK_RANGES = {
    disciplinas: [
      { min: 0, max: 0, cor: "red" },
      { min: 1, max: 2, cor: "yellow" },
      { min: 3, max: "", cor: "green" }
    ],
    credenciamento_vencimento_meses: [
      { min: 0, max: 3, cor: "red" },
      { min: 4, max: 8, cor: "yellow" },
      { min: 9, max: "", cor: "green" }
    ]
  };  const DEPRECATED_SCORE_KEYS = new Set([
    "periodicos",
    "anais_congressos",
    "tempo_medio",
    "tempo_medio_area",
    "docentes_area",
    "ativos_area",
    "titulacoes_area",
    "desligamentos_area",
    "evasao_area",
    "publicacoes_area",
    "tempo_medio_mestrado_area",
    "tempo_medio_doutorado_area",
    "tempo_medio_doutorado_direto_area",
    "poucos_ativos_area",
    "evasao_alta_area",
    "sem_publicacoes_area",
    "sem_titulacoes_area",
    "sobrecarga_area",
    "alerta_sem_ativos",
    "alerta_sem_titulacoes",
    "alerta_sem_publicacoes",
    "alerta_evasao_alta"
  ]);

  let seed = {};
  let state = {};
  let draft = {};
  const el = {};

  if (document.readyState !== "complete") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }

  function init() {
    seed = readSeed();
    state = normalizeState(seed);
    draft = cloneConfig(state.configuracoes);
    cache();
    bind();
    renderAll();
  }

  function readSeed() {
    const dados = window.SIADOCE_DADOS;
    return dados.institucional ? dados : {configuracoes: window.SIADOCE_CONFIG_PADRAO};
  }

  function normalizeState(data) {
    const config = normalizeConfig(data.configuracoes || {});
    const docentes = normalizeDocentes(data.docentes || {});
    if (!config.alertas_docentes) {
      config.alertas_docentes = normalizeAlertRules(docentes.alertas_docentes || {});
    }
    return { configuracoes: config, docentes };
  }

  function normalizeConfig(config) {
    return {
      title: config.title || "Configurações",
      build: { render: "never", list: "never", ...(config.build || {}) },
      interface: clone(config.interface || {}),
      areas: normalizeAreas(config.areas || []),
      alertas_docentes: config.alertas_docentes ? normalizeAlertRules(config.alertas_docentes) : null,
      docentes_areas: normalizeDocenteAreas(config.docentes_areas || []),
      resumo_docentes: normalizeResumoDocentesConfig(config.resumo_docentes || {})
    };
  }

  function normalizeDocentes(section) {
    return {
      alertas_docentes: section.alertas_docentes || null,
      docentes: (section.docentes || []).map((docente) => ({
        id: docente.id || "",
        nome: docente.nome || "",
        area: docente.area || ""
      }))
    };
  }

  function normalizeAreas(items) {
    return (Array.isArray(items) ? items : []).map((item) => ({
      nome: item.nome || "",
      sigla: item.sigla || ""
    }));
  }

  function normalizeDocenteAreas(items) {
    return (Array.isArray(items) ? items : []).map((item) => ({
      docente_id: item.docente_id || "",
      nome: item.nome || "",
      area: item.area || ""
    }));
  }

  function normalizeResumoDocentesConfig(config) {
    const defaults = defaultScoreConfig();
    return {
      ...defaults,
      ...clone(config || {}),
      cores: normalizeScoreGroups({
        ...(defaults.cores || {}),
        ...((config && config.cores) || {})
      })
    };
  }

  function defaultScoreConfig() {
    return clone(window.CONTROLE_DEFAULT_RESUMO_SCORE_CONFIG || { cores: {} });
  }

  function normalizeScoreGroups(groups) {
    return Object.fromEntries(Object.entries(groups || {}).filter(([key]) => !/^titulado(?:_|$)/.test(key)).map(([key, ranges]) => [
      key,
      (Array.isArray(ranges) ? ranges : []).map((range) => ({
        min: normalizeMaybeNumber(range.min),
        max: normalizeMaybeNumber(range.max),
        cor: normalizeStatus(range.cor || range.color || range.status || "green")
      }))
    ]));
  }

  function cache() {
    [
      "configPanel", "configSummary", "configGeneralForm",
      "configScoreRules", "configAreasList", "configDocenteAreas",
      "configAreaSearch", "configMarkdownPreview",
      "configDownload", "configCopy", "configReset", "configAddArea",
      "configStatus"
    ].forEach((id) => {
      el[id] = document.getElementById(id);
    });
  }

  function bind() {
    if (!el.configPanel) return;
    el.configPanel.addEventListener("input", handleInput);
    el.configPanel.addEventListener("change", handleInput);
    el.configPanel.addEventListener("click", handleClick);
    el.configAreaSearch && el.configAreaSearch.addEventListener("input", renderDocenteAreas);
    el.configDownload && el.configDownload.addEventListener("click", downloadMarkdown);
    el.configCopy && el.configCopy.addEventListener("click", copyMarkdown);
    el.configReset && el.configReset.addEventListener("click", resetDraft);
    el.configAddArea && el.configAddArea.addEventListener("click", addArea);
  }

  function renderAll() {
    if (!el.configPanel) return;
    renderSummary();
    renderGeneral();
    renderScoreRules();
    renderAreas();
    renderDocenteAreas();
    renderPreview();
  }

  function renderSummary() {
    if (!el.configSummary) return;
    const docentes = docenteAreaRecords();
    const mapped = docentes.filter((item) => item.area).length;
    const groups = visibleScoreGroups();
    const rangeCount = Object.values(groups).reduce((sum, ranges) => sum + (Array.isArray(ranges) ? ranges.length : 0), 0);
    el.configSummary.innerHTML = [
      metric("Áreas", draft.areas.length),
      metric("Docentes mapeados", `${mapped}/${docentes.length}`),
      metric("Alertas", Object.keys(groups).length),
      metric("Faixas", rangeCount)
    ].join("");
  }

  function metric(label, value) {
    return `<div class="metric"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></div>`;
  }

  function renderGeneral() {
    if (!el.configGeneralForm) return;
    el.configGeneralForm.innerHTML = GENERAL_FIELDS.map(([path, label, type]) => fieldHtml(path, label, type)).join("");
  }

  function renderScoreRules() {
    if (!el.configScoreRules) return;
    const groups = visibleScoreGroups();
    const used = new Set();
    const sections = SCORE_SECTIONS.map((section) => {
      const keys = section.keys.filter((key) => Object.prototype.hasOwnProperty.call(groups, key));
      keys.forEach((key) => used.add(key));
      return { ...section, keys };
    }).filter((section) => section.keys.length);
    const extraKeys = Object.keys(groups).filter((key) => !used.has(key));
    if (extraKeys.length) {
      sections.push({ title: "Outros indicadores", description: "Regras preservadas do arquivo de configuração.", keys: extraKeys });
    }

    el.configScoreRules.innerHTML = sections.map((section) => `
      <div class="config-rule-group">
        ${section.title || section.description ? `
          <div class="config-rule-group-title">
            ${section.title ? `<h4>${escapeHtml(section.title)}</h4>` : ""}
            ${section.description ? `<span>${escapeHtml(section.description)}</span>` : ""}
          </div>
        ` : ""}
        <div class="config-rule-group-grid">
          ${section.keys.map((key) => {
            const ranges = groups[key] || [];
            return `
              <details class="config-rule-card" data-score-card="${escapeAttr(key)}" open>
                <summary>
                  <strong>${escapeHtml(scoreLabel(key))}</strong>
                  <span>${escapeHtml(key)} · ${ranges.length} faixas</span>
                </summary>
                <p class="config-validation" data-score-error-for="${escapeAttr(key)}"></p>
                <div class="config-range-list">
                  ${ranges.map((range, index) => scoreRangeHtml(key, range, index)).join("")}
                </div>
              </details>
            `;
          }).join("")}
        </div>
      </div>
    `).join("");
    validateScoreGroups();
  }

  function renderAreas() {
    if (!el.configAreasList) return;
    el.configAreasList.innerHTML = (draft.areas || []).map((area, index) => `
      <div class="config-area-row">
        <label>
          <span>Nome</span>
          <input type="text" value="${escapeAttr(area.nome)}" data-area-index="${index}" data-area-field="nome">
        </label>
        <label>
          <span>Sigla</span>
          <input type="text" value="${escapeAttr(area.sigla)}" data-area-index="${index}" data-area-field="sigla">
        </label>
        <button class="button quiet" type="button" data-config-action="remove-area" data-area-index="${index}">Remover</button>
      </div>
    `).join("");
  }

  function renderDocenteAreas() {
    if (!el.configDocenteAreas) return;
    const query = normalized(el.configAreaSearch && el.configAreaSearch.value);
    const areas = draft.areas || [];
    const options = ['<option value="">Sem área</option>'].concat(areas.map((area) => (
      `<option value="${escapeAttr(area.nome)}">${escapeHtml(area.sigla ? `${area.sigla} · ${area.nome}` : area.nome)}</option>`
    ))).join("");
    el.configDocenteAreas.innerHTML = docenteAreaRecords()
      .filter((item) => !query || normalized(item.nome).includes(query))
      .map((item) => `
        <tr>
          <td><strong>${escapeHtml(item.nome)}</strong><small>${escapeHtml(item.docente_id)}</small></td>
          <td>
            <select data-docente-area-id="${escapeAttr(item.docente_id)}" data-docente-area-name="${escapeAttr(item.nome)}">
              ${options}
            </select>
          </td>
        </tr>
      `).join("");
    el.configDocenteAreas.querySelectorAll("select[data-docente-area-id]").forEach((select) => {
      const record = docenteAreaRecords().find((item) => item.docente_id === select.dataset.docenteAreaId);
      select.value = record ? record.area : "";
    });
  }

  function renderPreview() {
    if (!el.configMarkdownPreview) return;
    el.configMarkdownPreview.value = buildConfigMarkdown(outputConfig());
    renderSummary();
    validateScoreGroups();
  }

  function fieldHtml(path, label, type) {
    const value = valueAt(draft, path) ?? "";
    if (type === "textarea") {
      return `
        <label class="wide-field">
          <span>${escapeHtml(label)}</span>
          <textarea rows="2" data-config-path="${escapeAttr(path)}">${escapeHtml(value)}</textarea>
        </label>
      `;
    }
    return `
      <label>
        <span>${escapeHtml(label)}</span>
        <input type="${escapeAttr(type)}" value="${escapeAttr(value)}" data-config-path="${escapeAttr(path)}">
      </label>
    `;
  }

  function scoreRangeHtml(key, range, index) {
    const status = normalizeStatus(range.cor);
    return `
      <div class="config-range-row" data-score-row-key="${escapeAttr(key)}" data-score-row-index="${index}">
        <strong class="score-chip score-chip-single score-chip-${escapeAttr(status)}">${escapeHtml(statusLabel(status, key))}</strong>
        <label>
          <span>Mín.</span>
          ${scoreStepperHtml(key, index, "min", range.min, `mínimo de ${scoreLabel(key)}`)}
        </label>
        <label>
          <span>Máx.</span>
          ${scoreStepperHtml(key, index, "max", range.max, `máximo de ${scoreLabel(key)}`)}
        </label>
      </div>
    `;
  }

  function scoreStepperHtml(key, index, field, value, label) {
    const attrs = `data-score-key="${escapeAttr(key)}" data-score-index="${index}" data-score-field="${escapeAttr(field)}"`;
    return `
      <div class="config-number-stepper">
        <button class="config-step-button" type="button" data-config-action="score-step" ${attrs} data-step-delta="-1" aria-label="Reduzir ${escapeAttr(label)}">-</button>
        <input type="number" step="1" inputmode="numeric" value="${escapeAttr(emptyIfNull(value))}" ${attrs}>
        <button class="config-step-button" type="button" data-config-action="score-step" ${attrs} data-step-delta="1" aria-label="Aumentar ${escapeAttr(label)}">+</button>
      </div>
    `;
  }

  function handleInput(event) {
    const target = event.target;
    if (!target || !target.matches("input, select, textarea")) return;

    if (target.dataset.configPath) {
      setPath(draft, target.dataset.configPath, inputValue(target));
      markDirty();
      renderPreview();
      return;
    }
    if (target.dataset.scoreKey) {
      const ranges = scoreGroups()[target.dataset.scoreKey] || [];
      const range = ranges[Number(target.dataset.scoreIndex)];
      if (range) range[target.dataset.scoreField] = normalizeMaybeNumber(target.value);
      markDirty();
      renderPreview();
      return;
    }
    if (target.dataset.areaIndex) {
      const area = draft.areas[Number(target.dataset.areaIndex)];
      if (area) area[target.dataset.areaField] = target.value;
      markDirty();
      renderPreview();
      return;
    }
    if (target.dataset.docenteAreaId) {
      setDocenteArea(target.dataset.docenteAreaId, target.dataset.docenteAreaName, target.value);
      markDirty();
      renderPreview();
    }
  }

  function handleClick(event) {
    const button = event.target.closest("[data-config-action]");
    if (!button) return;
    const action = button.dataset.configAction;
    if (action === "remove-area") {
      removeArea(Number(button.dataset.areaIndex));
      return;
    }
    if (action === "score-step") {
      stepScoreRange(button);
    }
  }

  function stepScoreRange(button) {
    const key = button.dataset.scoreKey;
    const index = Number(button.dataset.scoreIndex);
    const field = button.dataset.scoreField;
    const delta = Number(button.dataset.stepDelta || 0);
    const range = (scoreGroups()[key] || [])[index];
    if (!range || !field || !Number.isFinite(delta)) return;

    const current = normalizeMaybeNumber(range[field]);
    const next = (current === "" ? 0 : Number(current)) + delta;
    range[field] = next;

    const input = el.configScoreRules && el.configScoreRules.querySelector(`input[data-score-key="${cssEscape(key)}"][data-score-index="${cssEscape(index)}"][data-score-field="${cssEscape(field)}"]`);
    if (input) {
      input.value = String(next);
      input.focus();
    }

    markDirty();
    renderPreview();
  }

  function addArea() {
    draft.areas.push({ nome: "Nova área", sigla: "NA" });
    markDirty();
    renderAreas();
    renderDocenteAreas();
    renderPreview();
  }

  function removeArea(index) {
    const [removed] = draft.areas.splice(index, 1);
    if (removed && removed.nome) {
      draft.docentes_areas.forEach((item) => {
        if (item.area === removed.nome) item.area = "";
      });
    }
    markDirty();
    renderAreas();
    renderDocenteAreas();
    renderPreview();
  }

  function setDocenteArea(id, name, area) {
    const records = draft.docentes_areas;
    let record = records.find((item) => item.docente_id === id);
    if (!record) {
      record = { docente_id: id, nome: name, area: "" };
      records.push(record);
    }
    record.nome = name || record.nome;
    record.area = area || "";
  }

  function downloadMarkdown() {
    if (!canExportConfig()) return;
    const markdown = buildConfigMarkdown(outputConfig());
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "configuracoes.md";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
    setStatus("Arquivo gerado.");
  }

  async function copyMarkdown() {
    if (!canExportConfig()) return;
    try {
      await navigator.clipboard.writeText(buildConfigMarkdown(outputConfig()));
      setStatus("Markdown copiado.");
    } catch (_) {
      setStatus("Não foi possível copiar automaticamente.");
    }
  }

  function resetDraft() {
    draft = cloneConfig(state.configuracoes);
    renderAll();
    setStatus("Valores restaurados.");
  }

  function outputConfig() {
    ensureAlertRules();
    const docentesAreas = docenteAreaRecords()
      .filter((item) => item.docente_id || item.nome)
      .map((item) => ({ docente_id: item.docente_id, nome: item.nome, area: item.area || "" }));
    return {
      title: "Configurações",
      build: { render: "never", list: "never" },
      interface: clone(draft.interface || {}),
      areas: (draft.areas || []).filter((area) => area.nome || area.sigla).map((area) => ({ nome: area.nome || "", sigla: area.sigla || "" })),
      alertas_docentes: normalizeAlertRules(draft.alertas_docentes || {}),
      docentes_areas: docentesAreas,
      resumo_docentes: { cores: cleanScoreGroups(visibleScoreGroups()) }
    };
  }

  function canExportConfig() {
    const errors = validateScoreGroups();
    if (errors.length) {
      setStatus("Corrija as faixas dos indicadores antes de gerar o arquivo.");
      return false;
    }
    return true;
  }

  function buildConfigMarkdown(config) {
    const lines = ["---"];
    writeYamlValue(lines, "title", config.title, 0);
    writeYamlValue(lines, "build", config.build, 0);
    writeYamlValue(lines, "interface", config.interface, 0);
    writeYamlValue(lines, "areas", config.areas, 0);
    writeYamlValue(lines, "alertas_docentes", config.alertas_docentes, 0);
    writeYamlValue(lines, "docentes_areas", config.docentes_areas, 0);
    writeYamlValue(lines, "resumo_docentes", config.resumo_docentes, 0);
    lines.push("---", "", "Arquivo de configurações do SIADoce.", "");
    return lines.join("\n");
  }

  function writeYamlValue(lines, key, value, indent) {
    const space = " ".repeat(indent);
    if (Array.isArray(value)) {
      if (!value.length) {
        lines.push(`${space}${key}: []`);
        return;
      }
      lines.push(`${space}${key}:`);
      writeYamlArray(lines, value, indent + 2);
      return;
    }
    if (isPlainObject(value)) {
      const keys = Object.keys(value).filter((childKey) => value[childKey] !== undefined);
      if (!keys.length) {
        lines.push(`${space}${key}: {}`);
        return;
      }
      lines.push(`${space}${key}:`);
      keys.forEach((childKey) => writeYamlValue(lines, childKey, value[childKey], indent + 2));
      return;
    }
    lines.push(`${space}${key}: ${yamlScalar(value)}`);
  }

  function writeYamlArray(lines, items, indent) {
    const space = " ".repeat(indent);
    items.forEach((item) => {
      if (!isPlainObject(item)) {
        lines.push(`${space}- ${yamlScalar(item)}`);
        return;
      }
      const keys = Object.keys(item).filter((key) => item[key] !== undefined);
      if (!keys.length) {
        lines.push(`${space}- {}`);
        return;
      }
      const [first, ...rest] = keys;
      if (isComplex(item[first])) {
        lines.push(`${space}- ${first}:`);
        writeNested(lines, item[first], indent + 4);
      } else {
        lines.push(`${space}- ${first}: ${yamlScalar(item[first])}`);
      }
      rest.forEach((key) => writeYamlValue(lines, key, item[key], indent + 2));
    });
  }

  function writeNested(lines, value, indent) {
    if (Array.isArray(value)) {
      writeYamlArray(lines, value, indent);
      return;
    }
    if (isPlainObject(value)) {
      Object.keys(value).forEach((key) => writeYamlValue(lines, key, value[key], indent));
    }
  }

  function yamlScalar(value) {
    if (value === null || value === undefined || value === "") return "\"\"";
    if (typeof value === "number" && Number.isFinite(value)) return String(value);
    if (typeof value === "boolean") return value ? "true" : "false";
    return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, "\\\"")}"`;
  }

  function docenteAreaRecords() {
    const configured = new Map((draft.docentes_areas || []).map((item) => [item.docente_id || normalized(item.nome), item]));
    const docentes = (state.docentes.docentes || []).map((docente) => {
      const record = configured.get(docente.id) || configured.get(normalized(docente.nome)) || {};
      return {
        docente_id: docente.id || record.docente_id || "",
        nome: docente.nome || record.nome || "",
        area: record.area || docente.area || ""
      };
    });
    const extra = (draft.docentes_areas || []).filter((item) => {
      const key = item.docente_id || normalized(item.nome);
      return !docentes.some((docente) => (docente.docente_id || normalized(docente.nome)) === key);
    });
    return docentes.concat(extra);
  }

  function cleanScoreGroups(groups) {
    const result = {};
    Object.entries(groups || {}).forEach(([key, ranges]) => {
      result[key] = (ranges || []).map((range) => {
        const clean = { min: normalizeMaybeNumber(range.min) };
        const max = normalizeMaybeNumber(range.max);
        if (max !== "") clean.max = max;
        clean.cor = normalizeStatus(range.cor || "green");
        return clean;
      });
    });
    return result;
  }

  function scoreGroups() {
    if (!draft.resumo_docentes) draft.resumo_docentes = defaultScoreConfig();
    if (!draft.resumo_docentes.cores) draft.resumo_docentes.cores = defaultScoreConfig().cores || {};
    Object.entries(SCORE_FALLBACK_RANGES).forEach(([key, ranges]) => {
      if (!draft.resumo_docentes.cores[key]) draft.resumo_docentes.cores[key] = clone(ranges);
    });    return draft.resumo_docentes.cores;
  }

  function visibleScoreGroups() {
    return Object.fromEntries(
      Object.entries(scoreGroups()).filter(([key]) => !DEPRECATED_SCORE_KEYS.has(key) && !/^titulado(?:_|$)/.test(key))
    );
  }

  function validateScoreGroups() {
    const errors = scoreRangeErrors(visibleScoreGroups());
    const invalidRows = new Set();
    const messages = new Map();

    if (el.configScoreRules) {
      el.configScoreRules.querySelectorAll(".config-range-row").forEach((row) => row.classList.remove("is-invalid"));
      el.configScoreRules.querySelectorAll(".config-rule-card").forEach((card) => card.classList.remove("is-invalid"));
      el.configScoreRules.querySelectorAll(".config-validation").forEach((message) => {
        message.textContent = "";
        message.setAttribute("aria-hidden", "true");
      });
      el.configScoreRules.querySelectorAll("input[data-score-key]").forEach((input) => input.setCustomValidity(""));
    }

    errors.forEach((error) => {
      error.rows.forEach((index) => invalidRows.add(`${error.key}:${index}`));
      const previous = messages.get(error.key) || [];
      previous.push(error.message);
      messages.set(error.key, previous);
    });

    invalidRows.forEach((rowKey) => {
      const [key, index] = rowKey.split(":");
      const row = el.configScoreRules && el.configScoreRules.querySelector(`[data-score-row-key="${cssEscape(key)}"][data-score-row-index="${cssEscape(index)}"]`);
      if (row) {
        row.classList.add("is-invalid");
        row.querySelectorAll("input").forEach((input) => input.setCustomValidity("Faixa inválida ou sobreposta."));
      }
    });

    messages.forEach((items, key) => {
      const card = el.configScoreRules && el.configScoreRules.querySelector(`[data-score-card="${cssEscape(key)}"]`);
      const message = el.configScoreRules && el.configScoreRules.querySelector(`[data-score-error-for="${cssEscape(key)}"]`);
      if (card) {
        card.classList.add("is-invalid");
      }
      if (message) {
        message.removeAttribute("aria-hidden");
        message.textContent = [...new Set(items)].join(" ");
      }
    });

    const hasErrors = errors.length > 0;
    [el.configDownload, el.configCopy].forEach((button) => {
      if (button) button.disabled = hasErrors;
    });
    if (hasErrors) {
      setStatus("Corrija faixas vazias, invertidas ou sobrepostas.");
    } else if ((el.configStatus && el.configStatus.textContent || "").startsWith("Corrija faixas")) {
      setStatus("");
    }
    return errors;
  }

  function scoreRangeErrors(groups) {
    const errors = [];
    Object.entries(groups || {}).forEach(([key, ranges]) => {
      const normalizedRanges = (ranges || []).map((range, index) => {
        const min = normalizeMaybeNumber(range.min);
        const max = normalizeMaybeNumber(range.max);
        const start = min === "" ? -Infinity : Number(min);
        const end = max === "" ? Infinity : Number(max);
        return { index, min, max, start, end };
      });

      normalizedRanges.forEach((range) => {
        if (range.min === "") {
          errors.push({ key, rows: [range.index], message: "Informe o mínimo de todas as faixas." });
        } else if (Number.isFinite(range.end) && range.start > range.end) {
          errors.push({ key, rows: [range.index], message: "O mínimo não pode ser maior que o máximo." });
        }
      });

      for (let i = 0; i < normalizedRanges.length; i++) {
        for (let j = i + 1; j < normalizedRanges.length; j++) {
          const a = normalizedRanges[i];
          const b = normalizedRanges[j];
          if (a.start <= b.end && b.start <= a.end) {
            errors.push({ key, rows: [a.index, b.index], message: "Há faixas sobrepostas neste indicador." });
          }
        }
      }
    });
    return errors;
  }

  function ensureAlertRules() {
    draft.alertas_docentes = normalizeAlertRules(draft.alertas_docentes || {});
  }

  function normalizeAlertRules(rules) {
    const normalizedRules = { ...DEFAULT_ALERT_RULES, ...rules };
    delete normalizedRules.alunos_formados_4_anos_min;
    return normalizedRules;
  }

  function cloneConfig(config) {
    const cloned = normalizeConfig(clone(config || {}));
    if (!cloned.alertas_docentes) cloned.alertas_docentes = { ...DEFAULT_ALERT_RULES };
    return cloned;
  }

  function inputValue(input) {
    if (input.type === "number") return normalizeMaybeNumber(input.value);
    return input.value;
  }

  function valueAt(root, path) {
    return String(path).split(".").reduce((acc, key) => (acc && typeof acc === "object" ? acc[key] : undefined), root);
  }

  function setPath(root, path, value) {
    const parts = String(path).split(".");
    let current = root;
    parts.slice(0, -1).forEach((part) => {
      if (!current[part] || typeof current[part] !== "object") current[part] = {};
      current = current[part];
    });
    current[parts[parts.length - 1]] = value;
  }

  function normalizeMaybeNumber(value) {
    if (value === "" || value === null || value === undefined) return "";
    const number = Number(value);
    return Number.isFinite(number) ? number : "";
  }

  function normalizeStatus(value) {
    const text = normalized(value).replace(/\s+/g, "-");
    return {
      ok: "green",
      verde: "green",
      green: "green",
      atencao: "yellow",
      atenção: "yellow",
      amarelo: "yellow",
      yellow: "yellow",
      critico: "red",
      crítico: "red",
      vermelho: "red",
      red: "red",
      "critico-alto": "dark-red",
      "crítico-alto": "dark-red",
      "vermelho-escuro": "dark-red",
      "dark-red": "dark-red",
      darkred: "dark-red"
    }[text] || "green";
  }

  function statusLabel(status, key) {
    if (key === "ativo" && status === "red") return "Crítico: poucos";
    if (key === "ativo" && status === "dark-red") return "Crítico: muitos";
    if (status === "green") return "Ok";
    if (status === "yellow") return "Atenção";
    return "Crítico";
  }

  function scoreLabel(key) {
    return SCORE_LABELS[key] || key.replace(/_/g, " ");
  }

  function emptyIfNull(value) {
    return value === null || value === undefined ? "" : value;
  }

  function markDirty() {
    setStatus("Alterações não salvas.");
  }

  function setStatus(message) {
    if (el.configStatus) el.configStatus.textContent = message || "";
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value || {}));
  }

  function isPlainObject(value) {
    return value && typeof value === "object" && !Array.isArray(value);
  }

  function isComplex(value) {
    return Array.isArray(value) || isPlainObject(value);
  }

  function normalized(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function escapeHtml(value) {
    return String(value === null || value === undefined ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeAttr(value) {
    return escapeHtml(value);
  }

  function cssEscape(value) {
    return String(value).replace(/["\\]/g, "\\$&");
  }
})();
