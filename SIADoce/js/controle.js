(function () {
  const THEME_KEY = "controle-docentes-theme";
  const DEFAULT_VERIFICATION_YEAR = 2025;
  const MIN_ALUNOS_EVASAO = 3;
  const SCRIPT_URL = document.currentScript && document.currentScript.src ? document.currentScript.src : "";
  const ROOT_URL = SCRIPT_URL ? new URL("../", SCRIPT_URL) : new URL("./", window.location.href);

  const ALERT_RULES = {
    publicacoes_4_anos_min: 2,
    alunos_ativos_min: 1,
    projetos_sem_coordenar_anos_vermelho: 3
  };

  const DEFAULT_INTERFACE_CONFIG = {
    marca_sistema: "SIADoce",
    nome_sistema: "Sistema de Informações Acadêmicas – Docentes",
    titulo_sistema: "SIADoce · Sistema de Informações Acadêmicas – Docentes",
    instituicao: "Universidade de São Paulo",
    instancia: "Programa de pós-graduação da Universidade de São Paulo",
    logo: "img/usp_horizontal.svg",
    rodape: "Universidade de São Paulo",
    navegacao: {
      docentes: "Docentes",
      tema: "Tema",
      tecnologia: "SIADoce"
    },
    inicio: {},
    docentes: {
      periodo_sem_pdf: "Sem período no PDF",
      periodo_prefixo: "Período",
      enviado_em: "Gerado em",
      area_todas: "Todas",
      status_ok: "Ok",
      status_atencao: "Atenção",
      status_critico: "Crítico",
      status_calculado_prefixo: "Status calculado",
      sem_docente_encontrado: "Nenhum docente encontrado.",
      sem_area: "Sem área",
      sem_dados: "Sem dados.",
      sem_alerta: "Sem alerta",
      total_label: "Total",
      metrica_docentes: "Docentes",
      metrica_ok: "Ok",
      metrica_atencao: "Atenção",
      metrica_criticos: "Críticos",
      metrica_orientandos_ativos: "Orientandos ativos",
      metrica_titulacoes_janus: "Titulações Janus",
      metrica_disciplinas: "Turmas ministradas",
      metrica_sem_disciplinas: "Sem turma",
      metrica_poucas_disciplinas: "1--2 turmas",
      metrica_disciplinas_adequadas: "3+ turmas",
      metrica_plenos: "Plenos",
      metrica_especificos: "Específicos",
      metrica_vencidos: "Vencidos",
      graficos_titulo: "Visualizações agregadas",
      graficos_descricao: "Leituras rápidas para carga de orientação, titulações, evasão e produção.",
      graficos_area_titulo: "Gráficos por área",
      graficos_area_descricao: "Comparações agregadas entre áreas de concentração.",
      graficos_alertas_titulo: "Alertas",
      graficos_alertas_descricao: "Leituras para localizar riscos de baixa orientação, evasão alta e produção ausente.",
      grafico_docentes_area_titulo: "Docentes por área",
      grafico_credenciamento_titulo: "Credenciamento",
      grafico_formacao_titulo: "Titulações por área",
      grafico_desligamentos_titulo: "Desligamentos por área",
      grafico_tempo_area_titulo: "Tempo médio por área",
      grafico_tempo_mestrado_area_titulo: "Tempo médio ME por área",
      grafico_tempo_doutorado_area_titulo: "Tempo médio DO por área",
      grafico_tempo_doutorado_direto_area_titulo: "Tempo médio DD por área",
      grafico_poucos_ativos_titulo: "Quantidade de alunos",
      grafico_poucos_ativos_subtitulo: "Poucos alunos",
      grafico_muitos_ativos_subtitulo: "Muitos alunos",
      grafico_evasao_alta_titulo: "Evasão alta (%)",
      grafico_sem_publicacao_titulo: "Poucas publicações",
      grafico_disciplinas_titulo: "Poucas disciplinas",
      grafico_projetos_titulo: "Projetos coordenados",
      grafico_credenciamento_vencimento_titulo: "Credenciamento a vencer",
      grafico_sobrecarga_titulo: "Possível sobrecarga",
      detalhe_nao_encontrado: "Docente não encontrado",
      detalhe_nao_encontrado_descricao: "Volte à lista e escolha um docente.",
      voltar: "Voltar",
      detalhe_ativos: "Ativos",
      detalhe_titulados: "Titulados",
      detalhe_desligados: "Desligados",
      detalhe_total_janus: "Total Janus",
      detalhe_evasao: "Evasão (%)",
      detalhe_disciplinas: "Turmas ministradas",
      tempo_medio_titulo: "Tempo médio de formação",
      mestrado_label: "Mestrado",
      doutorado_label: "Doutorado",
      doutorado_direto_label: "Doutorado direto",
      sem_registro: "sem registro",
      meses_label: "meses",
      alunos_ativos_titulo: "Alunos ativos",
      titulados_titulo: "Titulados",
      desligamentos_titulo: "Desligamentos",
      publicacoes_lattes_titulo: "Publicações Lattes",
      disciplinas_ministradas_titulo: "Disciplinas ministradas",
      coluna_aluno: "Aluno",
      coluna_nusp: "NUSP",
      coluna_curso: "Curso",
      coluna_data: "Data",
      coluna_data_ano: "Data/ano",
      coluna_situacao: "Situação",
      coluna_ativos: "Ativos",
      coluna_titulados: "Titulados",
      coluna_desligados: "Desligados",
      coluna_tipo: "Tipo",
      coluna_credenciamento: "Credenciamento",
      coluna_evasao: "Evasão",
      coluna_tempo_medio: "Tempo médio",
      coluna_titulo: "Título",
      coluna_veiculo: "Veículo",
      coluna_fonte: "Fonte",
      resumo_alertas_titulo: "Resumo dos docentes com alertas",
      resumo_alertas_pdf: "Imprimir PDF",
      resumo_alertas_pdf_indisponivel: "PDF gerado pelo programa",
      resumo_alertas_vazio: "Nenhum docente com alerta nos filtros atuais.",
      sem_registro_janus: "Nenhum registro no PDF do Janus.",
      nenhum_item: "Nenhum item cadastrado.",
      pdf_titulo: "SIADoce · Sistema de Informações Acadêmicas – Docentes",
      pdf_subtitulo_prefixo: "Janus e Lattes",
      pdf_periodo_nao_informado: "não informado",
      pdf_sumario_titulo: "Sumário",
      pdf_docentes_titulo: "Docentes",
      pdf_docentes_plenos_titulo: "Docentes plenos",
      pdf_docentes_especificos_titulo: "Docentes específicos",
      pdf_docentes_vencidos_titulo: "Vencidos com orientando",
      pdf_docentes_sem_credenciamento_titulo: "Sem credenciamento ativo"
    },
    pdf: { marca: "SIADoce", submarca: "Acompanhamento Docente" }
  };

  const DEFAULT_RESUMO_SCORE_CONFIG = {
    cores: {
      ativo: [
        { min: 0, max: 1, cor: "red" },
        { min: 2, max: 4, cor: "yellow" },
        { min: 5, max: 7, cor: "green" },
        { min: 8, max: 9, cor: "yellow" },
        { min: 10, cor: "dark-red" }
      ],
      desligado: [
        { min: 0, max: 0, cor: "green" },
        { min: 1, max: 1, cor: "yellow" },
        { min: 2, cor: "red" }
      ],
      evasao: [
        { min: 0, max: 10, cor: "green" },
        { min: 11, max: 30, cor: "yellow" },
        { min: 31, max: 100, cor: "red" }
      ],
      tempo_medio_mestrado: [
        { min: 0, max: 48, cor: "green" },
        { min: 49, max: 60, cor: "yellow" },
        { min: 61, cor: "red" }
      ],
      tempo_medio_doutorado: [
        { min: 0, max: 48, cor: "green" },
        { min: 49, max: 60, cor: "yellow" },
        { min: 61, cor: "red" }
      ],
      tempo_medio_doutorado_direto: [
        { min: 0, max: 48, cor: "green" },
        { min: 49, max: 60, cor: "yellow" },
        { min: 61, cor: "red" }
      ],
      publicacoes: [
        { min: 0, max: 1, cor: "red" },
        { min: 2, max: 4, cor: "yellow" },
        { min: 5, cor: "green" }
      ],
      disciplinas: [
        { min: 0, max: 0, cor: "red" },
        { min: 1, max: 2, cor: "yellow" },
        { min: 3, cor: "green" }
      ],
      credenciamento_vencimento_meses: [
        { min: 0, max: 3, cor: "red" },
        { min: 4, max: 8, cor: "yellow" },
        { min: 9, cor: "green" }
      ]
    }
  };
  window.CONTROLE_DEFAULT_RESUMO_SCORE_CONFIG = JSON.parse(JSON.stringify(DEFAULT_RESUMO_SCORE_CONFIG));

  let seedRaw = {};
  let state = {};
  let selectedDocenteId = "";
  let docenteSortKey = "";
  let docenteSortDirection = "desc";
  const el = {};

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {
    seedRaw = readSeed();
    state = normalizeState(seedRaw);
    cache();
    ensureSelectedDocenteFromUrl();
    initTheme();
    initLayout();
    bind();
    render();
  }

  function readSeed() {
    return window.SIADOCE_DADOS || {};
  }

  function normalizeState(data) {
    const configuracoes = normalizeConfiguracoes(data.configuracoes || {});
    const docentes = normalizeDocentesSection(data.docentes || {}, configuracoes);
    const alunosAtivos = normalizeAlunosAtivos(data.alunos_ativos || {});
    const publicacoes = publicationSeedData(data);
    applyLattesPublicacoes(docentes, publicacoes);
    return {
      docentes,
      alunos_ativos: alunosAtivos,
      configuracoes,
      publicacoes_lattes: publicacoes,
      publicacoes_periodicos: data.publicacoes_periodicos || {},
      publicacoes_conferencias: data.publicacoes_conferencias || {}
    };
  }

  function publicationSeedData(data = seedRaw) {
    const periodicos = data.publicacoes_periodicos || {};
    const conferencias = data.publicacoes_conferencias || {};
    const hasManualSources = hasPublicationRecords(periodicos) || hasPublicationRecords(conferencias);
    return hasManualSources ? mergePublicationSources([periodicos, conferencias]) : (data.publicacoes_lattes || {});
  }

  function hasPublicationRecords(source) {
    return Boolean(source && Array.isArray(source.publicacoes_por_docente) && source.publicacoes_por_docente.length);
  }

  function mergePublicationSources(sources) {
    const recordsByKey = new Map();
    const sourceNames = [];
    const updated = [];
    const years = [];
    sources.filter(hasPublicationRecords).forEach((source) => {
      if (source.fonte) sourceNames.push(source.fonte);
      if (source.atualizado_em) updated.push(source.atualizado_em);
      if (source.desde_ano !== undefined && source.desde_ano !== null && source.desde_ano !== "") years.push(Number(source.desde_ano));
      (source.publicacoes_por_docente || []).forEach((record) => {
        const key = record.docente_id || normalized(record.nome || "");
        if (!key) return;
        if (!recordsByKey.has(key)) {
          recordsByKey.set(key, {
            docente_id: record.docente_id || "",
            nome: record.nome || "",
            lattes_id: record.lattes_id || "",
            lattes_url: record.lattes_url || "",
            total: 0,
            total_periodicos: 0,
            total_anais_congressos: 0,
            publicacoes: []
          });
        }
        const target = recordsByKey.get(key);
        target.docente_id = target.docente_id || record.docente_id || "";
        target.nome = target.nome || record.nome || "";
        target.lattes_id = target.lattes_id || record.lattes_id || "";
        target.lattes_url = target.lattes_url || record.lattes_url || "";
        const items = Array.isArray(record.publicacoes) ? record.publicacoes : [];
        target.publicacoes.push(...items);
        target.total_periodicos += optionalNumber(record.total_periodicos) || items.filter((item) => normalized(item.tipo || "").includes("periodico")).length;
        target.total_anais_congressos += optionalNumber(record.total_anais_congressos) || items.filter((item) => normalized(item.tipo || "").includes("anais")).length;
      });
    });
    const records = Array.from(recordsByKey.values()).map((record) => ({
      ...record,
      total: record.publicacoes.length || record.total_periodicos + record.total_anais_congressos
    }));
    return {
      title: "Publicações Lattes",
      fonte: sourceNames.length ? sourceNames.join(" + ") : "content/controle/publicacoes-periodicos.md + content/controle/publicacoes-conferencias.md",
      atualizado_em: updated.sort().slice(-1)[0] || "",
      desde_ano: years.length ? Math.min(...years.filter(Number.isFinite)) : "",
      publicacoes_por_docente: records
    };
  }

  function normalizeConfiguracoes(config) {
    return {
      title: config.title || "Configurações",
      interface: normalizeInterfaceConfig(config.interface || {}),
      areas: normalizeAreasConfig(config.areas || []),
      alertas_docentes: config.alertas_docentes ? normalizeAlertRules(config.alertas_docentes) : null,
      docentes_areas: normalizeDocenteAreasConfig(config.docentes_areas || config.areas_docentes || []),
      resumo_docentes: normalizeResumoDocentesConfig(config.resumo_docentes || {})
    };
  }

  function normalizeInterfaceConfig(config) {
    return {
      ...DEFAULT_INTERFACE_CONFIG,
      ...config,
      navegacao: { ...DEFAULT_INTERFACE_CONFIG.navegacao, ...(config.navegacao || {}) },
      inicio: { ...DEFAULT_INTERFACE_CONFIG.inicio, ...(config.inicio || {}) },
      docentes: { ...DEFAULT_INTERFACE_CONFIG.docentes, ...(config.docentes || {}) },
      pdf: { ...DEFAULT_INTERFACE_CONFIG.pdf, ...(config.pdf || {}) }
    };
  }

  function normalizeAreasConfig(items) {
    return (Array.isArray(items) ? items : [])
      .map((item) => ({
        nome: item.nome || item.name || "",
        sigla: item.sigla || item.codigo || item.code || ""
      }))
      .filter((item) => item.nome || item.sigla);
  }

  function normalizeDocenteAreasConfig(items) {
    return (Array.isArray(items) ? items : [])
      .map((item) => ({
        docente_id: item.docente_id || item.id || "",
        nome: item.nome || "",
        area: item.area || ""
      }))
      .filter((item) => item.area && (item.docente_id || item.nome));
  }

  function normalizeResumoDocentesConfig(config) {
    return {
      ...DEFAULT_RESUMO_SCORE_CONFIG,
      ...config,
      cores: Object.fromEntries(Object.entries({
        ...DEFAULT_RESUMO_SCORE_CONFIG.cores,
        ...(config.cores || {})
      }).filter(([key]) => !/^titulado(?:_|$)/.test(key)))
    };
  }

  function normalizeAlertRules(rules = {}) {
    const normalizedRules = { ...ALERT_RULES, ...rules };
    delete normalizedRules.alunos_formados_4_anos_min;
    return normalizedRules;
  }

  function normalizeDocentesSection(section, configuracoes) {
    const docentes = (section.docentes || []).map(normalizeDocente).filter(isAnalyzedDocente);
    const normalized = {
      title: section.title || "Docentes",
      fonte: section.fonte || "",
      descricao: section.descricao || "",
      alertas_docentes: normalizeAlertRules({ ...(section.alertas_docentes || {}), ...((configuracoes && configuracoes.alertas_docentes) || {}) }),
      fontes_janus: normalizeJanusSources(section.fontes_janus || {}),
      fonte_lattes: normalizeLattesSource(section.fonte_lattes || {}),
      docentes
    };
    applyConfiguredDocenteAreas(normalized, configuracoes);
    return normalized;
  }

  function normalizeJanusSources(sources) {
    return {
      pdf: normalizeSource(sources.pdf || {})
    };
  }

  function normalizeSource(source) {
    return {
      nome: source.nome || source.name || "",
      url: source.url || "",
      submetido_em: source.submetido_em || source.submitted_at || "",
      periodo: source.periodo || ""
    };
  }

  function normalizeLattesSource(source) {
    return {
      atualizado_em: source.atualizado_em || source.updated_at || "",
      desde_ano: source.desde_ano || "",
      fonte: source.fonte || ""
    };
  }

  function normalizeDocente(item) {
    return {
      ...item,
      id: item.id || slugId(item.nome || "docente"),
      nome: item.nome || "",
      area: item.area || "",
      janus: normalizeJanus(item.janus || {}),
      credenciamento: normalizeCredenciamento(item.credenciamento || {}),
      disciplinas: normalizeDisciplinas(item.disciplinas || {}),
      publicacoes_lattes: (item.publicacoes_lattes || []).map(normalizePublicacao),
      lattes_totais: normalizeLattesTotals(item.lattes_totais || item)
    };
  }

  function normalizeAlunosAtivos(section) {
    const groups = section.alunos_ativos || {};
    const grouped = [
      ...(Array.isArray(groups.mestrado) ? groups.mestrado : []),
      ...(Array.isArray(groups.doutorado) ? groups.doutorado : []),
      ...(Array.isArray(groups.doutorado_direto) ? groups.doutorado_direto : [])
    ];
    const flat = Array.isArray(section.alunos) ? section.alunos : [];
    const alunos = [...grouped, ...flat].map(normalizeAlunoAtivo);
    const totais = section.totais || {};
    return {
      title: section.title || "Alunos ativos",
      fonte: section.fonte || "",
      atualizado_em: section.atualizado_em || "",
      periodo_pdf: section.periodo_pdf || "",
      totais: {
        mestrado: normalizeOptionalNumber(totais.mestrado),
        doutorado: normalizeOptionalNumber(totais.doutorado),
        doutorado_direto: normalizeOptionalNumber(totais.doutorado_direto),
        total: normalizeOptionalNumber(totais.total)
      },
      alunos
    };
  }

  function normalizeAlunoAtivo(item) {
    return {
      nusp: item.nusp || "",
      nome: item.nome || "",
      curso: normalizeCurso(item.curso || ""),
      data_situacao: item.data_situacao || "",
      situacao: item.situacao || "",
      orientadores: (Array.isArray(item.orientadores) ? item.orientadores : []).map((orientador) => ({
        docente_id: orientador.docente_id || orientador.id || "",
        nome: orientador.nome || ""
      }))
    };
  }

  function normalizeJanus(item) {
    const alunos = (item.alunos || []).map(normalizeJanusAluno);
    const ativosInformados = optionalNumber(item.orientandos_area);
    return {
      ...item,
      orientandos_area: ativosInformados ?? (Array.isArray(item.alunos) ? alunos.filter(student => student.categoria === "ativo").length : ""),
      alunos
    };
  }

  function normalizeJanusAluno(item) {
    return {
      nusp: item.nusp || "",
      nome: item.nome || "",
      curso: item.curso || "",
      data_situacao: item.data_situacao || "",
      situacao: item.situacao || "",
      categoria: item.categoria || studentCategory(item.situacao),
      fonte: item.fonte || "",
      tempo_titulacao_meses: normalizeOptionalNumber(item.tempo_titulacao_meses)
    };
  }

  function normalizeCredenciamento(item) {
    const entries = Array.isArray(item.credenciamentos) ? item.credenciamentos.map(normalizeCredentialEntry) : [];
    const tipo = credentialTypeLabel(item.tipo || (entries[0] && entries[0].tipo) || "");
    const categoria = credentialCategory(item.categoria || tipo);
    const entradaRecenteAnos = optionalNumber(item.entrada_recente_anos);
    const recentYears = entradaRecenteAnos === null ? 3 : entradaRecenteAnos;
    const dataInicioCredenciamentoPdf = item.data_inicio_credenciamento_pdf || item.data_primeiro_credenciamento || firstCredentialDate(entries) || "";
    const dataPrimeiroCredenciamento = item.data_primeiro_credenciamento || dataInicioCredenciamentoPdf;
    const referenciaEntradaRecente = item.referencia_entrada_recente || credentialReferenceDate(item.periodo_pdf || item.periodo || "");
    const hasGeneratedRecentFlag = item.entrada_recente !== undefined && item.entrada_recente !== null && item.entrada_recente !== "";
    return {
      arquivo: item.arquivo || item.arquivo_pdf || "",
      arquivo_pdf: item.arquivo_pdf || item.arquivo || "",
      periodo_pdf: item.periodo_pdf || item.periodo || "",
      tipo: tipo || credentialLabel(categoria),
      categoria,
      data_primeiro_credenciamento: dataPrimeiroCredenciamento,
      data_inicio_credenciamento_pdf: dataInicioCredenciamentoPdf,
      referencia_entrada_recente: referenciaEntradaRecente,
      corte_entrada_recente: item.corte_entrada_recente || "",
      anos_desde_primeiro_credenciamento: optionalNumber(item.anos_desde_primeiro_credenciamento),
      entrada_recente_anos: recentYears,
      evidencia_orientacao_anterior: boolValue(item.evidencia_orientacao_anterior),
      entrada_recente: hasGeneratedRecentFlag ? boolValue(item.entrada_recente) : isRecentCredentialDate(dataPrimeiroCredenciamento, referenciaEntradaRecente, recentYears),
      credenciamentos: entries
    };
  }

  function normalizeDisciplinas(item) {
    const turmas = (Array.isArray(item.turmas) ? item.turmas : []).map((turma) => ({
      sigla: turma.sigla || "",
      turma: turma.turma || "",
      disciplina: turma.disciplina || "",
      periodo: turma.periodo || "",
      data_inicio: turma.data_inicio || "",
      data_fim: turma.data_fim || ""
    }));
    const total = normalizeOptionalNumber(item.total);
    return {
      arquivo: item.arquivo || item.arquivo_pdf || "",
      arquivo_pdf: item.arquivo_pdf || item.arquivo || "",
      periodo_pdf: item.periodo_pdf || item.periodo || "",
      total: total === "" ? turmas.length : total,
      turmas
    };
  }

  function normalizeCredentialEntry(item) {
    const tipo = credentialTypeLabel(item.tipo || "");
    return {
      curso: item.curso || "",
      tipo,
      categoria: credentialCategory(item.categoria || tipo),
      data_inicial: item.data_inicial || "",
      data_final: item.data_final || ""
    };
  }

  function boolValue(value) {
    if (value === true) return true;
    if (value === false || value === null || value === undefined) return false;
    return ["true", "1", "sim", "yes"].includes(normalized(value));
  }

  function firstCredentialDate(entries) {
    const dates = (entries || [])
      .map((entry) => parseDateLike(entry.data_inicial))
      .filter(Boolean)
      .sort((a, b) => a - b);
    return dates.length ? isoDateString(dates[0]) : "";
  }

  function credentialReferenceDate(periodo) {
    const dates = String(periodo || "")
      .match(/\d{2}\/\d{2}\/\d{4}|\d{4}-\d{2}-\d{2}/g);
    if (!dates || !dates.length) return "";
    const parsed = parseDateLike(dates[dates.length - 1]);
    return parsed ? isoDateString(parsed) : "";
  }

  function isRecentCredentialDate(firstDateValue, referenceDateValue, years = 3) {
    const firstDate = parseDateLike(firstDateValue);
    const referenceDate = parseDateLike(referenceDateValue);
    if (!firstDate || !referenceDate) return false;
    const threshold = new Date(referenceDate.getFullYear() - Number(years || 3), referenceDate.getMonth(), referenceDate.getDate());
    return firstDate >= threshold;
  }

  function normalizePublicacao(item) {
    return {
      ano: item.ano || "",
      data: item.data || "",
      titulo: item.titulo || "",
      veiculo: item.veiculo || item.journal || item.conferencia || "",
      tipo: item.tipo || "",
      fonte: item.fonte || "",
      referencia: item.referencia || "",
      url: item.url || ""
    };
  }

  function normalizeLattesTotals(item) {
    return {
      total: normalizeOptionalNumber(item.total),
      periodicos: normalizeOptionalNumber(item.periodicos || item.total_periodicos),
      anais_congressos: normalizeOptionalNumber(item.anais_congressos || item.total_anais_congressos)
    };
  }

  function normalizeOptionalNumber(value) {
    if (value === "" || value === undefined || value === null) return "";
    const number = Number(value);
    return Number.isFinite(number) ? number : "";
  }

  function applyConfiguredDocenteAreas(docentesSection, configuracoes) {
    const entries = configuracoes && Array.isArray(configuracoes.docentes_areas) ? configuracoes.docentes_areas : [];
    if (!entries.length) return;
    const byId = new Map(entries.filter((item) => item.docente_id).map((item) => [item.docente_id, item.area]));
    const byName = new Map(entries.filter((item) => item.nome).map((item) => [normalized(item.nome), item.area]));
    docentesSection.docentes.forEach((docente) => {
      docente.area = byId.get(docente.id) || byName.get(normalized(docente.nome)) || docente.area || "";
    });
  }

  function applyLattesPublicacoes(docentesSection, lattesData) {
    const records = lattesData.publicacoes_por_docente || lattesData.docentes || [];
    const byId = new Map();
    const byName = new Map();
    records.forEach((record) => {
      if (record.docente_id) byId.set(record.docente_id, record);
      if (record.nome) byName.set(normalized(record.nome), record);
    });
    docentesSection.docentes.forEach((docente) => {
      const record = byId.get(docente.id) || byName.get(normalized(docente.nome));
      if (!record) return;
      docente.lattes_id = record.lattes_id || docente.lattes_id || "";
      docente.lattes_url = record.lattes_url || docente.lattes_url || "";
      docente.publicacoes_lattes = (record.publicacoes || []).map((item) => normalizePublicacao({ ...item, fonte: item.fonte || "Lattes" }));
      docente.lattes_totais = normalizeLattesTotals({
        total: record.total,
        total_periodicos: record.total_periodicos,
        total_anais_congressos: record.total_anais_congressos
      });
    });
    docentesSection.fonte_lattes = normalizeLattesSource(lattesData);
  }

  function cache() {
    [
      "docenteMetrics", "docenteSearch", "areaFilter", "docenteStatusFilter",
      "docenteSortNote",
      "janusPeriodoResumo",
      "alertsMetrics", "alertsSearch", "alertsSeverity", "alertsType", "alertsClear", "alertsCount", "alertsList", "alertsScope",
      "docenteAreaFacultyChart", "docenteAreaChart", "docenteFormationChart",
      "docenteDisconnectionChart", "docenteTimeMeChart", "docenteTimeDoChart", "docenteTimeDdChart",
      "docenteLowActiveChart", "docenteHighEvasionChart", "docenteNoPublicationChart", "docenteDisciplinesChart", "docenteProjectsChart", "docenteCredentialExpirationChart", "docenteOverloadChart",
      "docentesTable", "docenteAlertSummary", "docenteDetail", "docenteDetailContent",
      "themeToggle", "exportDocentesPdf", "appShell", "siteSidebar",
      "mobileMenuToggle", "mobileMenuClose", "sidebarScrim"
    ].forEach((id) => {
      el[id] = document.getElementById(id);
    });
  }

  function render() {
    if (!seedRaw.institucional) {
      if (el.janusPeriodoResumo) el.janusPeriodoResumo.textContent = seedRaw.resumo?.periodo || "Sem período informado";
      return;
    }
    if (hasDocentes()) {
      renderDocenteOverview();
      renderFilters();
      renderDocenteMetrics();
      renderDocenteCharts();
      renderDocentes();
    }
    if (hasDocenteDetail()) renderDocenteDetail();
    if (el.alertsList) renderAlertsPage();
  }

  function renderAlertsPage() {
    renderDocenteOverview();
    const docentes = summaryDocentes();
    el.alertsScope.textContent = `${docentes.length} docentes acompanhados: plenos, específicos e vencidos com orientando.`;
    const all = docentes.flatMap(docente => docenteAlertas(docente).map(alerta => ({ docente, alerta })));
    const types = [...new Set(all.map(item => item.alerta.text))].sort((a,b) => a.localeCompare(b,"pt-BR"));
    if (!el.alertsType.dataset.ready) {
      el.alertsType.innerHTML = '<option value="">Todos</option>' + types.map(type => `<option value="${escapeAttr(type)}">${escapeHtml(type)}</option>`).join("");
      el.alertsType.dataset.ready = "true";
    }
    const counts = [
      ["Alertas no total", all.length],
      ["Docentes com alerta", new Set(all.map(item => item.docente.id)).size],
      ["Alertas críticos", all.filter(item => item.alerta.level === "red").length],
      ["Alertas de atenção", all.filter(item => item.alerta.level === "yellow").length]
    ];
    el.alertsMetrics.innerHTML = counts.map(([label,value]) => `<article><strong>${value}</strong><span>${label}</span></article>`).join("");
    const query = normalized(el.alertsSearch.value.trim());
    const items = all.filter(({docente,alerta}) =>
      (!el.alertsSeverity.value || alerta.level === el.alertsSeverity.value) &&
      (!el.alertsType.value || alerta.text === el.alertsType.value) &&
      (!query || normalized([docente.nome,docente.area,alerta.text,alerta.detail].join(" ")).includes(query))
    ).sort((a,b) => alertStatusWeight(b.alerta.level) - alertStatusWeight(a.alerta.level) || a.docente.nome.localeCompare(b.docente.nome,"pt-BR"));
    el.alertsCount.textContent = `${items.length} de ${all.length} alertas · ${new Set(items.map(item => item.docente.id)).size} docentes nesta seleção`;
    el.alertsList.innerHTML = types.map(type => {
      const group = items.filter(item => item.alerta.text === type);
      if (!group.length) return "";
      return `<section class="alerts-group"><h2>${escapeHtml(type)}<span>${group.length} ${group.length === 1 ? "alerta" : "alertas"}</span></h2><ul>${group.map(({docente,alerta}) =>
        `<li class="alerts-row"><span class="alert-badge alert-${escapeAttr(alerta.level)}">${escapeHtml(situacaoLabel(alerta.level))}</span><div class="alerts-person"><a href="${escapeAttr(docenteDetailUrl(docente.id))}">${escapeHtml(docente.nome)}</a><small>${escapeHtml([areaShortLabel(docente.area),credentialLabel(docente.credenciamento.categoria)].filter(Boolean).join(" · "))}</small></div><p class="alerts-reason">${escapeHtml(alerta.detail || alerta.text)}</p></li>`
      ).join("")}</ul></section>`;
    }).join("") || '<p class="cell-muted">Nenhum alerta encontrado nesta seleção.</p>';
  }

  function hasDocentes() {
    return Boolean(el.docenteMetrics && el.docentesTable);
  }

  function hasDocenteDetail() {
    return Boolean(el.docenteDetail && el.docenteDetailContent);
  }

  function renderDocenteMetrics() {
    const docentesAnalise = summaryDocentes();
    const docentes = countDocenteSituacao(docentesAnalise);
    const credentials = credentialGroupCounts(docentesAnalise);
    const ativos = activeStudentsTotal(docentesAnalise);
    const ativosCursos = activeStudentsCourseTotals(docentesAnalise);
    const titulacoes = sumDocenteResumo("titulado", docentesAnalise);
    const disciplinas = disciplineTotals(docentesAnalise);
    el.docenteMetrics.innerHTML = [
      metricSummary(uiText("docentes.metrica_docentes", "Docentes"), docentesAnalise.length, [
        { label: uiText("docentes.metrica_plenos", "Plenos"), value: credentials.pleno || 0, status: "green" },
        { label: uiText("docentes.metrica_ok", "Ok"), value: docentes.green || 0, status: "green" },
        { label: uiText("docentes.metrica_especificos", "Específicos"), value: credentials.especifico || 0, status: "yellow" },
        { label: uiText("docentes.metrica_atencao", "Atenção"), value: docentes.yellow || 0, status: "yellow" },
        { label: uiText("docentes.metrica_vencidos", "Vencidos"), value: credentials.vencido_com_orientando || 0, status: "red" },
        { label: uiText("docentes.metrica_criticos", "Críticos"), value: docentes.red || 0, status: "red" }
      ]),
      metricSummary(uiText("docentes.metrica_orientandos_ativos", "Orientandos ativos"), ativos, [
        { label: "ME", value: ativosCursos.ME || 0, status: "green" },
        { label: "DO", value: ativosCursos.DO || 0, status: "green" },
        { label: "DD", value: ativosCursos.DD || 0, status: "green" }
      ], {
        className: "metric-summary-activity",
        secondary: {
          label: uiText("docentes.metrica_titulacoes_periodo", "Titulações no período"),
          value: titulacoes
        }
      }),
      metricSummary(uiText("docentes.metrica_disciplinas", "Turmas ministradas"), disciplinas.total, [
        { label: uiText("docentes.metrica_sem_disciplinas", "Sem turma"), value: disciplinas.semTurma, status: "red" },
        { label: uiText("docentes.metrica_poucas_disciplinas", "1--2 turmas"), value: disciplinas.poucas, status: "yellow" },
        { label: uiText("docentes.metrica_disciplinas_adequadas", "3+ turmas"), value: disciplinas.adequadas, status: "green" }
      ])
    ].join("");
  }

  function metric(label, value, status) {
    return `<div class="metric ${status ? `metric-${status}` : ""}"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></div>`;
  }

  function metricSummary(label, value, items, options = {}) {
    const className = options.className ? ` ${escapeAttr(options.className)}` : "";
    const heading = options.secondary ? `
        <div class="metric-highlight-grid">
          <div class="metric-highlight">
            <strong>${escapeHtml(value)}</strong>
            <span>${escapeHtml(label)}</span>
          </div>
          <div class="metric-highlight">
            <strong>${escapeHtml(options.secondary.value)}</strong>
            <span>${escapeHtml(options.secondary.label)}</span>
          </div>
        </div>
      ` : `
        <strong>${escapeHtml(value)}</strong>
        <span>${escapeHtml(label)}</span>
      `;
    return `
      <div class="metric metric-summary${className}">
        ${heading}
        <div class="metric-detail-grid">
          ${items.map((item) => `
            <div class="metric-detail ${item.status ? `metric-detail-${escapeAttr(item.status)}` : ""}">
              <strong>${escapeHtml(item.value)}</strong>
              <em>${escapeHtml(item.label)}</em>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  function countDocenteSituacao(items = state.docentes.docentes) {
    return items.reduce((acc, docente) => {
      const status = docenteSituacao(docente);
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
  }

  function credentialGroupCounts(items = state.docentes.docentes) {
    return items.reduce((acc, docente) => {
      const category = credentialCategory(docente.credenciamento && docente.credenciamento.categoria);
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});
  }

  function sumDocenteResumo(categoria, items = analysisDocentes()) {
    return items.reduce((sum, docente) => {
      const resumo = docenteResumo(docente);
      return sum + resumoTotal(resumo[categoria]);
    }, 0);
  }

  function activeStudentsTotal(fallbackItems = summaryDocentes()) {
    const total = optionalNumber(state.alunos_ativos && state.alunos_ativos.totais && state.alunos_ativos.totais.total);
    if (total !== null) return total;
    const alunos = state.alunos_ativos && Array.isArray(state.alunos_ativos.alunos) ? state.alunos_ativos.alunos : [];
    if (alunos.length) return alunos.length;
    return sumDocenteResumo("ativo", fallbackItems);
  }

  function activeStudentsCourseTotals(fallbackItems = summaryDocentes()) {
    const totals = courseCounts();
    const stored = state.alunos_ativos && state.alunos_ativos.totais ? state.alunos_ativos.totais : {};
    const mestrado = optionalNumber(stored.mestrado);
    const doutorado = optionalNumber(stored.doutorado);
    const doutoradoDireto = optionalNumber(stored.doutorado_direto);
    if (mestrado !== null || doutorado !== null || doutoradoDireto !== null) {
      totals.ME = mestrado || 0;
      totals.DO = doutorado || 0;
      totals.DD = doutoradoDireto || 0;
      return totals;
    }
    fallbackItems.forEach((docente) => {
      const resumo = docenteResumo(docente).ativo;
      totals.ME += resumo.ME || 0;
      totals.DO += resumo.DO || 0;
      totals.DD += resumo.DD || 0;
    });
    return totals;
  }

  function disciplineTotals(items = analysisDocentes()) {
    return items.reduce((totals, docente) => {
      const total = disciplineTotal(docente);
      totals.total += total;
      if (total === 0) totals.semTurma += 1;
      else if (total <= 2) totals.poucas += 1;
      else totals.adequadas += 1;
      return totals;
    }, { total: 0, semTurma: 0, poucas: 0, adequadas: 0 });
  }

  function activeStudentsAreaCounts() {
    const alunos = state.alunos_ativos && Array.isArray(state.alunos_ativos.alunos) ? state.alunos_ativos.alunos : [];
    if (!alunos.length) return null;
    const docentesById = new Map(state.docentes.docentes.map((docente) => [docente.id, docente]));
    const docentesByName = new Map(state.docentes.docentes.map((docente) => [normalized(docente.nome), docente]));
    const counts = new Map();
    areaDocentes().forEach((docente) => {
      if (!counts.has(docente.area)) counts.set(docente.area, 0);
    });
    alunos.forEach((student) => {
      const orientadores = Array.isArray(student.orientadores) ? student.orientadores : [];
      const docente = orientadores
        .map((orientador) => docentesById.get(orientador.docente_id) || docentesByName.get(normalized(orientador.nome || "")))
        .find(isAreaDocente);
      if (!docente || !docente.area || !counts.has(docente.area)) return;
      counts.set(docente.area, counts.get(docente.area) + 1);
    });
    return counts;
  }

  function renderFilters() {
    fillSelect(el.areaFilter, unique(state.docentes.docentes.map((docente) => docente.area)), uiText("docentes.area_todas", "Todas"));
  }

  function fillSelect(select, values, allLabel) {
    if (!select) return;
    const current = select.value;
    select.innerHTML = `<option value="">${escapeHtml(allLabel)}</option>` +
      values.map((value) => `<option value="${escapeAttr(value)}">${escapeHtml(value)}</option>`).join("");
    if (values.includes(current)) select.value = current;
  }

  function unique(values) {
    return Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b, "pt-BR"));
  }

  function credentialCategory(value) {
    const text = normalized(value);
    if (text.includes("vencido")) return "vencido_com_orientando";
    if (text.includes("especific")) return "especifico";
    if (text.includes("pleno")) return "pleno";
    if (text.includes("sem_credenciamento")) return "sem_credenciamento";
    return "sem_credenciamento";
  }

  function credentialTypeLabel(value) {
    const category = credentialCategory(value);
    return category === "pleno" ? "Pleno"
      : category === "especifico" ? "Específico"
        : category === "vencido_com_orientando" ? "Vencido com Orientando"
          : "";
  }

  function credentialLabel(value) {
    const category = credentialCategory(value);
    return category === "pleno" ? "Pleno"
      : category === "especifico" ? "Específico"
        : category === "vencido_com_orientando" ? "Vencido com Orientando"
          : "Sem credenciamento";
  }

  function credentialRank(value) {
    const category = credentialCategory(value && value.credenciamento ? value.credenciamento.categoria : value);
    return category === "pleno" ? 1
      : category === "especifico" ? 2
        : category === "vencido_com_orientando" ? 3
          : 4;
  }

  function isAnalyzedDocente(docente) {
    return Boolean(docente) &&
      credentialCategory(docente.credenciamento && docente.credenciamento.categoria) !== "sem_credenciamento";
  }

  function analysisDocentes(items = state.docentes.docentes) {
    return items.filter(isAnalyzedDocente);
  }

  function isAreaDocente(docente) {
    return isAnalyzedDocente(docente) && Boolean(docente.area);
  }

  function areaDocentes(items = state.docentes.docentes) {
    return items.filter(isAreaDocente);
  }

  function isRecentCredentialDocente(docente) {
    return Boolean(docente && docente.credenciamento && docente.credenciamento.entrada_recente);
  }

  function isOrientationAlertDocente(docente) {
    return !isRecentCredentialDocente(docente);
  }

  function isSummaryDocente(docente) {
    const category = credentialCategory(docente && docente.credenciamento && docente.credenciamento.categoria);
    return category !== "sem_credenciamento";
  }

  function summaryDocentes(items = state.docentes.docentes) {
    return items.filter(isSummaryDocente);
  }

  function credentialGroups(items = state.docentes.docentes) {
    return credentialGroupDefinitions().map(([category, label]) => ({
      category,
      label,
      docentes: items
        .filter((docente) => credentialCategory(docente.credenciamento && docente.credenciamento.categoria) === category)
        .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"))
    })).filter((group) => group.docentes.length);
  }

  function credentialGroupDefinitions() {
    return [
      ["pleno", uiText("docentes.pdf_docentes_plenos_titulo", "Docentes plenos")],
      ["especifico", uiText("docentes.pdf_docentes_especificos_titulo", "Docentes específicos")],
      ["vencido_com_orientando", uiText("docentes.pdf_docentes_vencidos_titulo", "Vencidos com orientando")]
    ];
  }

  function renderDocenteOverview() {
    if (el.janusPeriodoResumo) el.janusPeriodoResumo.textContent = janusPeriod() || uiText("docentes.periodo_sem_pdf", "Sem período no PDF");
  }

  function filteredDocentes() {
    const query = normalized(el.docenteSearch ? el.docenteSearch.value : "");
    const area = el.areaFilter ? el.areaFilter.value : "";
    const status = el.docenteStatusFilter ? el.docenteStatusFilter.value : "";
    return state.docentes.docentes
      .filter((docente) => !area || docente.area === area)
      .filter((docente) => !status || docenteSituacao(docente) === status)
      .filter((docente) => matches(docente, query));
  }

  function docenteSortValue(docente, key) {
    const course = /^(ativo|titulado|desligado)_(total|me|do|dd|do_dd)$/.exec(key);
    if (course) {
      const counts = docenteResumo(docente)[course[1]];
      return course[2] === "total" ? resumoTotal(counts) : course[2] === "do_dd" ? resumoDoutoradoTotal(counts) : counts[course[2].toUpperCase()];
    }
    const tempo = { tempo_me: "tempo_medio_mestrado", tempo_do: "tempo_medio_doutorado", tempo_dd: "tempo_medio_doutorado_direto" };
    if (tempo[key]) return optionalNumber(docente.janus[tempo[key]]);
    switch (key) {
      case "nome": return docente.nome;
      case "area": return docente.area ? areaShortLabel(docente.area) : null;
      case "tipo": return credentialLabel(docente.credenciamento.categoria);
      case "evasao": return janusEvasion(docente.janus).value;
      case "lattes": return publicacaoAlertTotal(docente);
      case "disciplinas": return disciplineTotal(docente);
      case "alertas": return docenteAlertas(docente).length;
      default: return docente.nome;
    }
  }

  function sortDocentes(items, key, order) {
    const direction = order === "asc" ? 1 : -1;
    const collator = new Intl.Collator("pt-BR", { sensitivity: "base", numeric: true });
    return items.map(docente => ({ docente, value: docenteSortValue(docente, key) })).sort((a, b) => {
      const aMissing = a.value === null || a.value === undefined || a.value === "";
      const bMissing = b.value === null || b.value === undefined || b.value === "";
      if (aMissing !== bMissing) return aMissing ? 1 : -1;
      const diff = aMissing ? 0 : typeof a.value === "number" ? a.value - b.value : collator.compare(a.value, b.value);
      return direction * diff || collator.compare(a.docente.nome, b.docente.nome);
    }).map(item => item.docente);
  }

  function renderDocentes() {
    const docentes = filteredDocentes();
    const sortKey = docenteSortKey;
    const order = docenteSortDirection;
    const sortButton = Array.from(el.docentesTable.querySelectorAll("[data-docente-sort]")).find(button => button.dataset.docenteSort === sortKey);
    if (el.docenteSortNote) el.docenteSortNote.textContent = sortKey
      ? `${docentes.length} docentes · ${sortButton ? sortButton.dataset.sortLabel : sortKey} · ${order === "asc" ? "crescente" : "decrescente"}. Clique novamente no cabeçalho para inverter.`
      : "Clique nos cabeçalhos para ordenar. Em Ativos, a ordenação usa o total de alunos.";
    el.docentesTable.querySelectorAll("thead th").forEach(header => header.removeAttribute("aria-sort"));
    el.docentesTable.querySelectorAll("[data-docente-sort]").forEach(button => {
      const active = button.dataset.docenteSort === sortKey;
      button.setAttribute("aria-pressed", String(active));
      button.querySelector(".docente-sort-arrow").textContent = active ? (order === "asc" ? "↑" : "↓") : "↕";
      if (active) button.closest("th").setAttribute("aria-sort", order === "asc" ? "ascending" : "descending");
    });
    const groups = !docentes.length ? [] : sortKey ? [{ label: "", docentes: sortDocentes(docentes, sortKey, order) }] : credentialGroups(docentes);
    const html = groups.map((group) => {
      const rows = group.docentes.map((docente) => {
        const resumo = docenteResumo(docente);
        const alertas = docenteAlertas(docente);
        return `
          <tr data-open-docente="${escapeAttr(docente.id)}" tabindex="0">
            <td>${escapeHtml(docente.nome || "")}</td>
            <td>${areaCodeHtml(docente.area)}</td>
            <td>${credentialHtml(docente, alertas)}</td>
            <td>${courseCountHtml("ativo", resumo.ativo, alertas)}</td>
            <td>${courseCountHtml("titulado", resumo.titulado, alertas)}</td>
            <td>${courseCountHtml("desligado", resumo.desligado, alertas)}</td>
            <td>${compactScoreHtml("evasao", resumo.evasao.value, "%", alertas, resumo.evasao.label)}</td>
            <td>${tempoMedioHtml(docente.janus, alertas)}</td>
            <td>${publicacaoCountsHtml(docente, alertas)}</td>
            <td>${compactScoreHtml("disciplinas", disciplineTotal(docente), "turmas", alertas)}</td>
            <td class="docente-alert-cell">${alertBadges(alertas)}</td>
          </tr>
        `;
      }).join("");
      return `
        ${group.label ? `<tr class="docente-group-row">
          <td colspan="11">${escapeHtml(group.label)} <span>${escapeHtml(group.docentes.length)} docentes</span></td>
        </tr>` : ""}
        ${rows}
      `;
    }).join("");
    el.docentesTable.querySelector("tbody").innerHTML = html || tableEmpty(11, uiText("docentes.sem_docente_encontrado", "Nenhum docente encontrado."));
    renderDocenteAlertSummary(docentes);
  }

  function renderDocenteAlertSummary(docentes = filteredDocentes()) {
    if (!el.docenteAlertSummary) return;
    const items = docentes.map((docente) => {
      const alertas = docenteAlertas(docente);
      return { docente, alertas, status: docenteSituacao(docente, alertas) };
    }).filter((item) => item.alertas.length).sort((a, b) => {
      const severityDiff = alertStatusWeight(b.status) - alertStatusWeight(a.status);
      const credentialDiff = credentialRank(a.docente) - credentialRank(b.docente);
      return severityDiff || credentialDiff || (a.docente.nome || "").localeCompare(b.docente.nome || "", "pt-BR");
    });

    if (!items.length) {
      el.docenteAlertSummary.innerHTML = `<p class="cell-muted">${escapeHtml(uiText("docentes.resumo_alertas_vazio", "Nenhum docente com alerta nos filtros atuais."))}</p>`;
      return;
    }

    el.docenteAlertSummary.innerHTML = `
      <div class="docente-alert-summary-list">
        ${items.map(({ docente, alertas, status }) => `
          <article class="docente-alert-summary-item alert-summary-${escapeAttr(status)}">
            <div class="docente-alert-summary-head">
              <strong>${escapeHtml(docente.nome || "Docente")}</strong>
              <span>${escapeHtml([areaShortLabel(docente.area), credentialLabel(docente.credenciamento && docente.credenciamento.categoria)].filter(Boolean).join(" · "))}</span>
            </div>
            <ul>
              ${alertas.map((alerta) => `
                <li>
                  <span class="alert-badge alert-${escapeAttr(alerta.level)}">${escapeHtml(alerta.text)}</span>
                  <span>${escapeHtml(alerta.detail || alerta.text)}</span>
                </li>
              `).join("")}
            </ul>
          </article>
        `).join("")}
      </div>
    `;
  }

  function renderDocenteCharts() {
    renderAreaFacultyChart();
    renderAreaChart();
    renderFormationChart();
    renderDisconnectionChart();
    renderTimeChart();
    renderLowActiveChart();
    renderHighEvasionChart();
    renderNoPublicationChart();
    renderDisciplinesChart();
    renderProjectsChart();
    renderCredentialExpirationChart();
    renderOverloadChart();
  }

  function renderAreaChart() {
    if (!el.docenteAreaChart) return;
    el.docenteAreaChart.innerHTML = chartRows(areaActiveRows(), 8);
  }

  function renderAreaFacultyChart() {
    if (!el.docenteAreaFacultyChart) return;
    el.docenteAreaFacultyChart.innerHTML = chartRows(areaFacultyRows(), 8);
  }

  function renderFormationChart() {
    if (!el.docenteFormationChart) return;
    el.docenteFormationChart.innerHTML = chartRows(areaFormationRows(), 8);
  }

  function renderDisconnectionChart() {
    if (!el.docenteDisconnectionChart) return;
    el.docenteDisconnectionChart.innerHTML = chartRows(areaDisconnectionRows(), 8);
  }

  function renderTimeChart() {
    if (el.docenteTimeMeChart) el.docenteTimeMeChart.innerHTML = chartRows(areaTimeRows("mestrado"), 8);
    if (el.docenteTimeDoChart) el.docenteTimeDoChart.innerHTML = chartRows(areaTimeRows("doutorado"), 8);
    if (el.docenteTimeDdChart) el.docenteTimeDdChart.innerHTML = chartRows(areaTimeRows("doutorado_direto"), 8);
  }

  function areaFacultyRows() {
    return areaSummaries().map((item) => [areaChartLabel(item.area), item.docentes, "blue", areaChartNote()]);
  }

  function areaActiveRows() {
    return areaSummaries().map((item) => [areaChartLabel(item.area), item.ativos, chartStatus("ativo", item.ativos), areaChartNote()]);
  }

  function areaFormationRows() {
    return areaSummaries().map((item) => [
      areaChartLabel(item.area),
      item.titulados,
      "blue",
      areaChartNote(`${item.docentes} docentes`)
    ]);
  }

  function areaDisconnectionRows() {
    return areaSummaries().map((item) => [
      areaChartLabel(item.area),
      item.desligados,
      chartStatus("desligado", item.desligados),
      areaChartNote(`${item.docentes} docentes`)
    ]);
  }

  function areaTimeRows(kind) {
    const field = {
      mestrado: "tempo_medio_mestrado",
      doutorado: "tempo_medio_doutorado",
      doutorado_direto: "tempo_medio_doutorado_direto"
    }[kind] || "tempo_medio";
    const scoreKey = {
      mestrado: "tempo_medio_mestrado",
      doutorado: "tempo_medio_doutorado",
      doutorado_direto: "tempo_medio_doutorado_direto"
    }[kind] || "tempo_medio_mestrado";
    const countField = {
      mestrado: "tempo_medio_mestrado_alunos",
      doutorado: "tempo_medio_doutorado_alunos",
      doutorado_direto: "tempo_medio_doutorado_direto_alunos"
    }[kind] || "tempo_medio_alunos";
    return areaSummaries().map((item) => {
      const raw = item[field];
      const value = raw === null ? 0 : raw;
      const alunos = optionalNumber(item[countField]) || 0;
      return [
        areaChartLabel(item.area),
        raw === null ? "-" : value,
        raw === null ? "" : chartStatus(scoreKey, value),
        areaChartNote(`Alunos: ${alunos}`)
      ];
    });
  }

  function renderLowActiveChart() {
    if (!el.docenteLowActiveChart) return;
    el.docenteLowActiveChart.innerHTML = alertDocenteList(lowActiveAlertRows(), "Nenhum docente com poucos alunos.");
  }

  function renderHighEvasionChart() {
    if (!el.docenteHighEvasionChart) return;
    el.docenteHighEvasionChart.innerHTML = alertDocenteList(highEvasionAlertRows(), "Nenhum docente com evasão alta (%).");
  }

  function renderNoPublicationChart() {
    if (!el.docenteNoPublicationChart) return;
    el.docenteNoPublicationChart.innerHTML = alertDocenteList(noPublicationAlertRows(), "Nenhum docente com poucas publicações.");
  }

  function renderDisciplinesChart() {
    if (!el.docenteDisciplinesChart) return;
    el.docenteDisciplinesChart.innerHTML = alertDocenteList(disciplineAlertRows(), "Nenhum orientador com poucas disciplinas no período.");
  }

  function renderProjectsChart() {
    if (!el.docenteProjectsChart) return;
    el.docenteProjectsChart.innerHTML = alertDocenteList(projectAlertRows(), "Sem dados ou sem docentes em alerta de projetos coordenados.");
  }


  function renderCredentialExpirationChart() {
    if (!el.docenteCredentialExpirationChart) return;
    el.docenteCredentialExpirationChart.innerHTML = alertDocenteList(credentialExpirationAlertRows(), "Nenhum credenciamento perto de vencer.");
  }

  function renderOverloadChart() {
    if (!el.docenteOverloadChart) return;
    el.docenteOverloadChart.innerHTML = alertDocenteList(overloadAlertRows(), "Nenhum docente com muitos alunos.");
  }

  function lowActiveAlertRows() {
    return alertDocenteRows({
      include: ({ docente, ativos }) => isOrientationAlertDocente(docente) && isAlertChartStatus(chartStatus("ativo", ativos)),
      value: ({ ativos }) => ativos,
      status: ({ ativos }) => chartStatus("ativo", ativos),
      sort: "asc"
    });
  }

  function highEvasionAlertRows() {
    return alertDocenteRows({
      include: ({ docente, evasao }) => isOrientationAlertDocente(docente) && evasao !== null && isAlertChartStatus(chartStatus("evasao", evasao, evasionStatus(evasao))),
      value: ({ evasao }) => evasao,
      display: ({ evasao }) => `${evasao}%`,
      status: ({ evasao }) => chartStatus("evasao", evasao, evasionStatus(evasao)),
      sort: "desc"
    });
  }

  function noPublicationAlertRows() {
    return alertDocenteRows({
      include: ({ docente, pubs }) => credentialCategory(docente.credenciamento && docente.credenciamento.categoria) !== "especifico" && isAlertChartStatus(chartStatus("publicacoes", publicacaoAlertTotalFromCounts(pubs))),
      value: ({ pubs }) => publicacaoAlertTotalFromCounts(pubs),
      status: ({ pubs }) => chartStatus("publicacoes", publicacaoAlertTotalFromCounts(pubs)),
      sort: "asc"
    });
  }

  function disciplineAlertRows() {
    return alertDocenteRows({
      include: ({ docente }) => isAnalyzedDocente(docente) && isOrientationAlertDocente(docente) && isAlertChartStatus(chartStatus("disciplinas", disciplineTotal(docente))),
      value: ({ docente }) => disciplineTotal(docente),
      display: ({ docente }) => `${disciplineTotal(docente)} turmas`,
      status: ({ docente }) => chartStatus("disciplinas", disciplineTotal(docente)),
      sort: "asc"
    });
  }

  function projectAlertRows() {
    return analysisDocentes().map((docente) => {
      const alerta = docenteProjectAlert(docente);
      if (!alerta || !isAlertChartStatus(alerta.status)) return null;
      return {
        label: docente.nome || "Docente",
        value: alerta.value,
        display: alerta.display,
        status: alerta.status,
        note: [credentialLabel(docente.credenciamento && docente.credenciamento.categoria), alerta.note].filter(Boolean).join(" · "),
        credentialCategory: credentialCategory(docente.credenciamento && docente.credenciamento.categoria),
        credentialRank: credentialRank(docente)
      };
    }).filter(Boolean).sort((a, b) => {
      const credentialDiff = (a.credentialRank || 99) - (b.credentialRank || 99);
      const statusDiff = alertStatusWeight(b.status) - alertStatusWeight(a.status);
      const valueDiff = (Number(b.value) || 0) - (Number(a.value) || 0);
      return credentialDiff || statusDiff || valueDiff || a.label.localeCompare(b.label, "pt-BR");
    });
  }


  function credentialExpirationAlertRows() {
    return analysisDocentes().map((docente) => {
      const alerta = docenteCredentialExpirationAlert(docente);
      if (!alerta || !isAlertChartStatus(alerta.status)) return null;
      return {
        label: docente.nome || "Docente",
        value: alerta.value,
        display: alerta.display,
        status: alerta.status,
        note: [credentialLabel(docente.credenciamento && docente.credenciamento.categoria), alerta.note].filter(Boolean).join(" · "),
        credentialCategory: credentialCategory(docente.credenciamento && docente.credenciamento.categoria),
        credentialRank: credentialRank(docente)
      };
    }).filter(Boolean).sort((a, b) => {
      const credentialDiff = (a.credentialRank || 99) - (b.credentialRank || 99);
      const statusDiff = alertStatusWeight(b.status) - alertStatusWeight(a.status);
      const valueDiff = (Number(a.value) || 0) - (Number(b.value) || 0);
      return credentialDiff || statusDiff || valueDiff || a.label.localeCompare(b.label, "pt-BR");
    });
  }

  function overloadAlertRows() {
    const limit = highActiveLimit();
    return alertDocenteRows({
      include: ({ docente, ativos }) => isOrientationAlertDocente(docente) && limit !== null && ativos >= limit,
      value: ({ ativos }) => ativos,
      status: ({ ativos }) => chartStatus("ativo", ativos),
      sort: "desc"
    });
  }

  function alertDocenteRows(options = {}) {
    const sort = options.sort || "desc";
    return analysisDocentes().map((docente) => {
      const resumo = docenteResumo(docente);
      const pubs = publicacaoTypeCounts(docente);
      const context = {
        docente,
        resumo,
        pubs,
        ativos: resumoTotal(resumo.ativo),
        titulados: resumoTotal(resumo.titulado),
        evasao: resumo.evasao.value
      };
      if (options.include && !options.include(context)) return null;
      const numericValue = options.value ? options.value(context) : 0;
      return {
        label: docente.nome || "Docente",
        value: numericValue,
        display: options.display ? options.display(context) : numericValue,
        status: options.status ? options.status(context) : "yellow",
        note: credentialLabel(docente.credenciamento && docente.credenciamento.categoria),
        credentialCategory: credentialCategory(docente.credenciamento && docente.credenciamento.categoria),
        credentialRank: credentialRank(docente)
      };
    }).filter(Boolean).sort((a, b) => {
      const aValue = Number(a.value) || 0;
      const bValue = Number(b.value) || 0;
      const credentialDiff = (a.credentialRank || 99) - (b.credentialRank || 99);
      const diff = sort === "asc" ? aValue - bValue : bValue - aValue;
      return credentialDiff || diff || a.label.localeCompare(b.label, "pt-BR");
    });
  }

  function isAlertChartStatus(status) {
    return status === "red" || status === "yellow" || status === "dark-red";
  }

  function alertStatusWeight(status) {
    return status === "red" || status === "dark-red" ? 2 : status === "yellow" ? 1 : 0;
  }

  function alertDocenteList(rows, emptyText) {
    const total = rows.length;
    const rowsHtml = groupedAlertRowsHtml(rows);
    return `
      <div class="alert-docente-chart">
        <div class="alert-docente-total">
          <strong>${escapeHtml(total)}</strong>
          <span>${escapeHtml(total === 1 ? "docente" : "docentes")}</span>
        </div>
        <div class="alert-docente-list" role="list" tabindex="0" aria-label="Docentes neste alerta">
          ${rowsHtml || `<p class="cell-muted">${escapeHtml(emptyText || uiText("docentes.sem_dados", "Sem dados."))}</p>`}
        </div>
      </div>
    `;
  }

  function groupedAlertRowsHtml(rows) {
    return credentialGroupDefinitions().map(([category, label]) => {
      const groupRows = rows.filter((row) => credentialCategory(row.credentialCategory) === category);
      if (!groupRows.length) return "";
      return `
        <div class="alert-docente-group">${escapeHtml(label)} <span>${escapeHtml(groupRows.length)}</span></div>
        ${groupRows.map((row) => {
          const categoryLabel = credentialLabel(row.credentialCategory);
          const note = String(row.note || "");
          const detail = note === categoryLabel ? ""
            : note.startsWith(`${categoryLabel} · `) ? note.slice(categoryLabel.length + 3) : note;
          return `
          <div class="alert-docente-row" role="listitem">
            <span class="alert-docente-name"><em>${escapeHtml(row.label)}</em>${detail ? `<small>${escapeHtml(detail)}</small>` : ""}</span>
            <strong class="${escapeAttr(row.status)}">${escapeHtml(row.display)}</strong>
          </div>
        `; }).join("")}
      `;
    }).join("");
  }

  function areaSummaries() {
    const byArea = new Map();
    areaDocentes().forEach((docente) => {
      const area = docente.area;
      if (!byArea.has(area)) {
        byArea.set(area, {
          area,
          docentes: 0,
          ativos: 0,
          titulados: 0,
          desligados: 0,
          publicacoes: 0,
          periodicos: 0,
          anais: 0,
          semAtivos: 0,
          semPublicacoes: 0,
          poucosAtivos: 0,
          evasaoAlta: 0,
          sobrecarga: 0,
          tempos: [],
          temposMestrado: [],
          temposDoutorado: [],
          temposDoutoradoDireto: [],
          alunosTempoMestrado: 0,
          alunosTempoDoutorado: 0,
          alunosTempoDoutoradoDireto: 0,
          evasoes: []
        });
      }
      const item = byArea.get(area);
      const resumo = docenteResumo(docente);
      const pubs = publicacaoTypeCounts(docente);
      const ativos = resumoTotal(resumo.ativo);
      const titulados = resumoTotal(resumo.titulado);
      const orientationAlerts = isOrientationAlertDocente(docente);
      item.docentes += 1;
      item.ativos += ativos;
      item.titulados += titulados;
      item.desligados += resumoTotal(resumo.desligado);
      item.publicacoes += pubs.total;
      item.periodicos += pubs.periodicos;
      item.anais += pubs.anais;
      if (orientationAlerts && !ativos) item.semAtivos += 1;
      if (!pubs.total) item.semPublicacoes += 1;
      if (orientationAlerts && ativos <= lowActiveLimit()) item.poucosAtivos += 1;
      const activeHigh = highActiveLimit();
      if (orientationAlerts && activeHigh !== null && ativos >= activeHigh) item.sobrecarga += 1;
      const evasao = resumo.evasao.value;
      if (evasao !== null) item.evasoes.push(evasao);
      if (orientationAlerts && evasao !== null && evasionStatus(evasao) === "red") item.evasaoAlta += 1;
      const tempoMestrado = optionalNumber(docente.janus && docente.janus.tempo_medio_mestrado);
      const tempoDoutorado = optionalNumber(docente.janus && docente.janus.tempo_medio_doutorado);
      const tempoDoutoradoDireto = optionalNumber(docente.janus && docente.janus.tempo_medio_doutorado_direto);
      const alunosTempo = tempoAlunoCounts(docente);
      if (tempoMestrado !== null) item.temposMestrado.push(tempoMestrado);
      if (tempoDoutorado !== null) item.temposDoutorado.push(tempoDoutorado);
      if (tempoDoutoradoDireto !== null) item.temposDoutoradoDireto.push(tempoDoutoradoDireto);
      item.alunosTempoMestrado += alunosTempo.ME;
      item.alunosTempoDoutorado += alunosTempo.DO;
      item.alunosTempoDoutoradoDireto += alunosTempo.DD;
      item.tempos.push(...[tempoMestrado, tempoDoutorado, tempoDoutoradoDireto].filter((value) => value !== null));
    });
    const activeByArea = activeStudentsAreaCounts();
    return Array.from(byArea.values()).map((item) => ({
      ...item,
      ativos: activeByArea && activeByArea.has(item.area) ? activeByArea.get(item.area) : item.ativos,
      evasao_media: item.evasoes.length ? Math.round(item.evasoes.reduce((sum, value) => sum + value, 0) / item.evasoes.length) : null,
      tempo_medio_mestrado: item.temposMestrado.length ? Math.round(item.temposMestrado.reduce((sum, value) => sum + value, 0) / item.temposMestrado.length) : null,
      tempo_medio_doutorado: item.temposDoutorado.length ? Math.round(item.temposDoutorado.reduce((sum, value) => sum + value, 0) / item.temposDoutorado.length) : null,
      tempo_medio_doutorado_direto: item.temposDoutoradoDireto.length ? Math.round(item.temposDoutoradoDireto.reduce((sum, value) => sum + value, 0) / item.temposDoutoradoDireto.length) : null,
      tempo_medio: item.tempos.length ? Math.round(item.tempos.reduce((sum, value) => sum + value, 0) / item.tempos.length) : null,
      tempo_medio_mestrado_alunos: item.alunosTempoMestrado,
      tempo_medio_doutorado_alunos: item.alunosTempoDoutorado,
      tempo_medio_doutorado_direto_alunos: item.alunosTempoDoutoradoDireto,
      tempo_medio_alunos: item.alunosTempoMestrado + item.alunosTempoDoutorado + item.alunosTempoDoutoradoDireto
    })).sort((a, b) => a.area.localeCompare(b.area, "pt-BR"));
  }

  function tempoAlunoCounts(docente) {
    const counts = courseCounts();
    const alunos = docente && docente.janus && Array.isArray(docente.janus.alunos) ? docente.janus.alunos : [];
    alunos.forEach((student) => {
      const categoria = ["ativo", "titulado", "desligado"].includes(student.categoria) ? student.categoria : studentCategory(student.situacao);
      if (categoria !== "titulado") return;
      if (optionalNumber(student.tempo_titulacao_meses) === null) return;
      const curso = normalizeCurso(student.curso);
      if (counts[curso] !== undefined) counts[curso] += 1;
    });
    return counts;
  }

  function attentionSummaries() {
    const docentesAnalise = analysisDocentes();
    const docentesOrientacao = docentesAnalise.filter(isOrientationAlertDocente);
    const semAtivos = docentesOrientacao.filter((docente) => !resumoTotal(docenteResumo(docente).ativo)).length;
    const poucasPublicacoes = noPublicationAlertRows().length;
    const evasaoAlta = highEvasionAlertRows().length;
    const projetos = projectAlertRows().length;
    const credenciamentosAVencer = credentialExpirationAlertRows().length;
    return [
      { label: "Sem ativos", value: semAtivos, status: aggregateAlertStatus(semAtivos), note: "docentes sem orientação ativa Janus" },
      { label: "Poucas publicações", value: poucasPublicacoes, status: aggregateAlertStatus(poucasPublicacoes), note: "abaixo da configuração" },
      { label: "Evasão alta (%)", value: evasaoAlta, status: aggregateAlertStatus(evasaoAlta), note: `taxa amarela ou vermelha entre docentes com ${MIN_ALUNOS_EVASAO} ou mais alunos` },
      { label: "Projetos", value: projetos, status: aggregateAlertStatus(projetos), note: "sem coordenação atual ou há mais de 3 anos" },
      { label: "Credenciamento", value: credenciamentosAVencer, status: aggregateAlertStatus(credenciamentosAVencer), note: "fim em até 8 meses" }
    ];
  }

  function aggregateAlertStatus(value) {
    return value ? "yellow" : "green";
  }

  function janusCount(value) {
    const count = optionalNumber(typeof value === "string" ? value.trim() : value);
    return Number.isInteger(count) && count >= 0 ? count : null;
  }

  function totalAlunosJanus(janus) {
    const total = janusCount(janus.total);
    if (total === null) return null;
    if (!Array.isArray(janus.alunos) || janus.alunos.length !== total) return total;

    const numerosUSP = new Set();
    const nomesComNumero = new Set();
    const nomesSemNumero = new Set();
    for (const aluno of janus.alunos) {
      const numero = String(aluno.nusp || "").trim();
      const nome = normalized(aluno.nome).replace(/\s+/g, " ");
      if (numero) {
        numerosUSP.add(numero);
        if (nome) nomesComNumero.add(nome);
      } else if (nome) {
        nomesSemNumero.add(nome);
      } else {
        return total;
      }
    }
    for (const nome of nomesComNumero) nomesSemNumero.delete(nome);
    return numerosUSP.size + nomesSemNumero.size;
  }

  function janusEvasion(janus = {}) {
    const total = totalAlunosJanus(janus);
    const unavailable = { value: null, label: "Sem dados Janus" };
    if (total === null) return unavailable;
    if (total < MIN_ALUNOS_EVASAO) return { value: null, label: `Menos de ${MIN_ALUNOS_EVASAO} alunos` };

    const titulados = janusCount(janus.titulados);
    const desligados = janusCount(janus.desligados);
    if (titulados === null || desligados === null) return unavailable;
    if (titulados + desligados === 0) return { value: null, label: "Sem encerramentos" };
    const value = parseResumoNumber(janus.taxa_evasao);
    return value === null ? unavailable : { value, label: `${value.toLocaleString("pt-BR")}%` };
  }

  function evasionStatus(value) {
    if (value === null) return "neutral";
    if (value >= 31) return "red";
    if (value >= 11) return "yellow";
    return "green";
  }

  function disconnectionStatus(value) {
    if (value >= 2) return "red";
    if (value >= 1) return "yellow";
    return "green";
  }

  function timeStatus(value) {
    return resumoScore("tempo_medio_mestrado", value) || "green";
  }

  function chartStatus(key, value, fallback = "green") {
    const score = resumoScore(key, value);
    if (score === "dark-red") return "red";
    if (["green", "yellow", "red"].includes(score)) return score;
    return fallback;
  }

  function lowActiveLimit() {
    const ranges = resumoRanges("ativo").filter((item) => normalizeResumoColor(item.cor || item.color || item.status) === "red" && item.max !== undefined && item.max !== null);
    if (!ranges.length) return 1;
    const values = ranges.map((item) => Number(item.max)).filter(Number.isFinite);
    return values.length ? Math.max(...values) : 1;
  }

  function highActiveLimit() {
    const ranges = resumoRanges("ativo").filter((item) => normalizeResumoColor(item.cor || item.color || item.status) === "dark-red" && item.min !== undefined && item.min !== null);
    if (!ranges.length) return 8;
    const values = ranges.map((item) => Number(item.min)).filter(Number.isFinite);
    return values.length ? Math.min(...values) : null;
  }

  function chartRows(rows, limit) {
    const visible = limit ? rows.slice(0, limit) : rows;
    const max = Math.max(1, ...visible.map((row) => Number(row[1]) || 0));
    return `
      <div class="mini-chart">
        ${visible.map(([label, value, status, note]) => `
          <div class="chart-row">
            <span>${escapeHtml(label)}${note ? `<small class="chart-subvalue">${escapeHtml(note)}</small>` : ""}</span>
            <div class="chart-track"><i class="${escapeAttr(status)}" style="width: ${escapeAttr(Math.max(4, Math.round((Number(value) || 0) / max * 100)))}%"></i></div>
            <strong>${escapeHtml(value)}</strong>
          </div>
        `).join("") || `<p class="cell-muted">${escapeHtml(uiText("docentes.sem_dados", "Sem dados."))}</p>`}
      </div>
    `;
  }

  function docenteResumo(docente) {
    const janus = docente.janus || {};
    const resumo = {
      ativo: courseCounts(),
      titulado: courseCounts(),
      desligado: courseCounts(),
      evasao: janusEvasion(janus),
      tempo: temposMediosMeses(janus),
      publicacoes: allPublicacoes(docente).length
    };
    (janus.alunos || []).forEach((student) => {
      const categoria = ["ativo", "titulado", "desligado"].includes(student.categoria) ? student.categoria : studentCategory(student.situacao);
      const curso = normalizeCurso(student.curso);
      if (resumo[categoria] && resumo[categoria][curso] !== undefined) resumo[categoria][curso] += 1;
    });
    return resumo;
  }

  function courseCounts() {
    return { ME: 0, DO: 0, DD: 0, "DO/DD": 0 };
  }

  function courseCountHtml(category, counts, alertas = []) {
    counts = counts || courseCounts();
    const doutorado = resumoDoutoradoTotal(counts);
    const total = resumoTotal(counts);
    const items = [
      tableBlockItem(category, counts.ME, "ME", alertas)
    ];
    if (counts["DO/DD"]) {
      const combined = tableBlockItem(category, doutorado, "DO/DD", alertas);
      combined.title += "; soma de doutorado e doutorado direto";
      items.push(combined);
    } else {
      items.push(
        tableBlockItem(category, counts.DO, "DO", alertas),
        tableBlockItem(category, counts.DD, "DD", alertas)
      );
    }
    items.push(tableBlockItem(category, total, "Tot", alertas));
    return tableBlockLine(items, "table-blocks-four table-blocks-stacked");
  }

  function resumoTotal(counts) {
    return (counts.ME || 0) + resumoDoutoradoTotal(counts);
  }

  function resumoDoutoradoTotal(counts = {}) {
    return (parseResumoNumber(counts.DO) || 0) + (parseResumoNumber(counts.DD) || 0) + (parseResumoNumber(counts["DO/DD"]) || 0);
  }

  function courseCountText(counts) {
    return counts["DO/DD"]
      ? `ME ${counts.ME} · DO/DD ${resumoDoutoradoTotal(counts)}`
      : `ME ${counts.ME} · DO ${counts.DO} · DD ${counts.DD}`;
  }

  function scoreChip(key, value, label, scoreValue = value, scoreTitleLabel = label, extraClass = "") {
    const score = resumoScore(key, scoreValue);
    const className = ["score-chip", score ? `score-chip-${score}` : "", extraClass].filter(Boolean).join(" ");
    const title = score ? resumoScoreTitle(key, scoreValue, score, scoreTitleLabel) : "Sem regra ou sem valor numérico para colorir";
    return `<span class="${escapeAttr(className)}" title="${escapeAttr(title)}"><em>${escapeHtml(label)}</em><strong>${escapeHtml(value === null || value === undefined || value === "" ? "-" : value)}</strong></span>`;
  }

  function resumoScore(key, value) {
    const range = resumoRange(key, value);
    return normalizeResumoColor(range && (range.cor || range.color || range.status));
  }

  function resumoRange(key, value) {
    const number = parseResumoNumber(value);
    if (number === null) return null;
    return resumoRanges(key).find((item) => {
      const min = parseResumoNumber(item.min);
      const max = parseResumoNumber(item.max);
      return (min === null || number >= min) && (max === null || number <= max);
    }) || null;
  }

  function resumoRanges(key) {
    const colors = state.configuracoes && state.configuracoes.resumo_docentes ? state.configuracoes.resumo_docentes.cores || {} : {};
    const groupKey = String(key || "").replace(/_(me|do|dd)$/i, "");
    return colors[key] || colors[groupKey] || [];
  }

  function resumoScoreTitle(key, value, score, label = "") {
    const number = parseResumoNumber(value);
    const groupKey = String(key || "").replace(/_(me|do|dd)$/i, "");
    return `${scoreLabel(score)}: ${label || groupKey} = ${number}`;
  }

  function scoreLabel(score) {
    return { green: "Verde", yellow: "Amarelo", red: "Vermelho", "dark-red": "Vermelho" }[score] || score;
  }

  function alertLevel(score) {
    return score === "dark-red" ? "red" : score;
  }

  function alertSeverityLabel(score) {
    const level = alertLevel(score);
    if (level === "red") return "limite crítico";
    if (level === "yellow") return "faixa de atenção";
    return "faixa configurada";
  }

  function alertDetail(key, value, label, unit = "", extra = "") {
    const range = resumoRange(key, value);
    const status = normalizeResumoColor(range && (range.cor || range.color || range.status));
    const valueText = formatAlertValue(value, unit);
    const rangeText = range ? `${alertSeverityLabel(status)}: ${formatAlertRange(range, unit)}` : "regra configurada";
    return [label ? `${label}: ${valueText}` : valueText, rangeText, extra].filter(Boolean).join("; ");
  }

  function formatAlertValue(value, unit = "") {
    const number = parseResumoNumber(value);
    const text = number === null ? "-" : String(number);
    if (!unit) return text;
    return unit === "%" ? `${text}%` : `${text} ${unit}`;
  }

  function formatAlertRange(range, unit = "") {
    const min = parseResumoNumber(range && range.min);
    const max = parseResumoNumber(range && range.max);
    if (min !== null && max !== null) return `${formatAlertValue(min, unit)} a ${formatAlertValue(max, unit)}`;
    if (min !== null) return `>= ${formatAlertValue(min, unit)}`;
    if (max !== null) return `<= ${formatAlertValue(max, unit)}`;
    return "sem limite numérico";
  }

  function greenRangeBounds(key) {
    const greenRanges = resumoRanges(key).filter((item) => normalizeResumoColor(item.cor || item.color || item.status) === "green");
    const mins = greenRanges.map((item) => parseResumoNumber(item.min)).filter((value) => value !== null);
    const maxes = greenRanges.map((item) => parseResumoNumber(item.max)).filter((value) => value !== null);
    return {
      min: mins.length ? Math.min(...mins) : null,
      max: maxes.length ? Math.max(...maxes) : null
    };
  }

  function lowHighAlertText(key, value, lowText, highText, middleText) {
    const number = parseResumoNumber(value);
    const bounds = greenRangeBounds(key);
    if (number !== null && bounds.max !== null && number > bounds.max) return highText;
    if (number !== null && bounds.min !== null && number < bounds.min) return lowText;
    return middleText;
  }

  function normalizeResumoColor(value) {
    const text = normalized(value).replace(/\s+/g, "-");
    return {
      verde: "green",
      green: "green",
      amarelo: "yellow",
      yellow: "yellow",
      vermelho: "red",
      red: "red",
      "vermelho-escuro": "dark-red",
      "dark-red": "dark-red",
      darkred: "dark-red"
    }[text] || "";
  }

  function parseResumoNumber(value) {
    if (value === "" || value === undefined || value === null) return null;
    if (typeof value === "number") return Number.isFinite(value) ? value : null;
    const match = String(value).trim().replace(",", ".").match(/-?\d+(?:\.\d+)?/);
    if (!match) return null;
    const number = Number(match[0]);
    return Number.isFinite(number) ? number : null;
  }

  function normalizeCurso(curso) {
    const text = normalized(curso).replace(/\s+/g, "");
    if (text === "do/dd") return "DO/DD";
    if (text === "dd" || text.includes("direto")) return "DD";
    if (text === "do" || text.includes("doutorado")) return "DO";
    return "ME";
  }

  function credentialHtml(docente, alertas = []) {
    const cred = docente.credenciamento || {};
    const category = credentialCategory(cred.categoria || cred.tipo);
    const entries = Array.isArray(cred.credenciamentos) ? cred.credenciamentos : [];
    const courses = entries.map((item) => [item.curso, item.tipo].filter(Boolean).join(" ")).filter(Boolean).join(" · ");
    const label = credentialLabel(category);
    const recent = isRecentCredentialDocente(docente);
    const recentText = recent ? "Entrada recente" : "";
    const alerta = tableIndicatorAlert("credenciamento_vencimento_meses", alertas);
    return `
      <span class="credential-badge credential-alert-${escapeAttr(alerta ? alerta.level : "neutral")}" title="${escapeAttr(alerta ? alerta.detail : "Sem alerta de credenciamento")}">${escapeHtml(label)}</span>
      ${courses ? `<div class="row-subtitle" title="${escapeAttr(courses)}">${escapeHtml(courses)}</div>` : ""}
      ${recentText ? `<div class="row-subtitle" title="Alertas de orientação desconsiderados">${escapeHtml(recentText)}</div>` : ""}
    `;
  }

  function tempoMedioHtml(janus = {}, alertas = []) {
    return tableBlockLine([
      tableBlockItem("tempo_medio_mestrado", mesesLabel(janus.tempo_medio_mestrado, false), "ME", alertas),
      tableBlockItem("tempo_medio_doutorado", mesesLabel(janus.tempo_medio_doutorado, false), "DO", alertas),
      tableBlockItem("tempo_medio_doutorado_direto", mesesLabel(janus.tempo_medio_doutorado_direto, false), "DD", alertas)
    ], "table-blocks-tempo table-blocks-stacked");
  }

  function temposMediosMeses(janus = {}) {
    return [
      `ME ${mesesLabel(janus.tempo_medio_mestrado)}`,
      `DO ${mesesLabel(janus.tempo_medio_doutorado)}`,
      `DD ${mesesLabel(janus.tempo_medio_doutorado_direto)}`
    ].join(" / ");
  }

  function mesesLabel(value, includeUnit = true) {
    const meses = optionalNumber(value);
    if (meses === null) return "-";
    return includeUnit ? `${meses} meses` : String(meses);
  }

  function publicacaoCountsHtml(docente, alertas = []) {
    const counts = publicacaoTypeCounts(docente);
    const alertTotal = publicacaoAlertTotalFromCounts(counts);
    return tableBlockLine([
      tableBlockItem("publicacoes", alertTotal, "Tot", alertas)
    ], "table-blocks-single");
  }

  function publicacaoTypeCounts(docente) {
    const totals = docente.lattes_totais || {};
    const totalPeriodicos = optionalNumber(totals.periodicos);
    const totalAnais = optionalNumber(totals.anais_congressos);
    const total = optionalNumber(totals.total);
    if (totalPeriodicos !== null || totalAnais !== null || total !== null) {
      const periodicos = totalPeriodicos || 0;
      const anais = totalAnais || 0;
      return { periodicos, anais, outros: Math.max(0, (total || periodicos + anais) - periodicos - anais), total: total || periodicos + anais };
    }
    return publicacoesDesdeAno(docente).reduce((acc, item) => {
      const tipo = normalized(item.tipo || item.categoria || "");
      if (tipo.includes("periodico") || tipo.includes("artigo")) acc.periodicos += 1;
      else if (tipo.includes("congresso") || tipo.includes("anais") || tipo.includes("conferencia")) acc.anais += 1;
      else acc.outros += 1;
      acc.total += 1;
      return acc;
    }, { periodicos: 0, anais: 0, outros: 0, total: 0 });
  }

  function publicacaoAlertTotal(docente) {
    return publicacaoAlertTotalFromCounts(publicacaoTypeCounts(docente));
  }

  function publicacaoAlertTotalFromCounts(counts = {}) {
    return (optionalNumber(counts.periodicos) || 0) + (optionalNumber(counts.anais) || 0);
  }

  function allPublicacoes(docente) {
    return [...(docente.publicacoes_lattes || [])];
  }

  function publicacoesDesdeAno(docente) {
    const anoInicio = verificationStartYear();
    return allPublicacoes(docente).filter((item) => isSinceYear(item.data || item.ano, anoInicio));
  }

  function docenteStats(docente) {
    const publicacoesDiretas = publicacaoAlertTotal(docente);
    return {
      alunosAtivos: optionalNumber(docente.janus && docente.janus.orientandos_area),
      publicacoes4anos: publicacoesDiretas
    };
  }

  function disciplineSummary(docente) {
    const disciplinas = docente && docente.disciplinas ? docente.disciplinas : {};
    const turmas = Array.isArray(disciplinas.turmas) ? disciplinas.turmas : [];
    const total = optionalNumber(disciplinas.total);
    return {
      total: total === null ? turmas.length : total,
      periodo: disciplinas.periodo_pdf || "",
      turmas
    };
  }

  function disciplineTotal(docente) {
    return disciplineSummary(docente).total;
  }

  function disciplineScoreTitle(docente) {
    const resumo = disciplineSummary(docente);
    return resumo.periodo
      ? `turmas ministradas no período ${resumo.periodo}`
      : "turmas ministradas no período do PDF de disciplinas";
  }

  function docenteProjectAlert(docente) {
    const resumo = docenteProjectSummary(docente);
    if (!resumo.hasData) return null;
    if (resumo.current > 0) return null;
    const threshold = projectRedThreshold();
    if (!resumo.lastDate) {
      return {
        status: "red",
        value: threshold + 1,
        display: "sem registro",
        note: "nenhum projeto coordenado informado",
        text: "sem registro de projeto coordenado"
      };
    }
    const years = yearsSince(resumo.lastDate);
    if (years > threshold) {
      return {
        status: "red",
        value: years,
        display: `${years} anos`,
        note: `último em ${resumo.lastDate.getFullYear()}`,
        text: `sem coordenar projeto há ${years} anos`
      };
    }
    return {
      status: "yellow",
      value: years,
      display: "0 atual",
      note: `último em ${resumo.lastDate.getFullYear()}`,
      text: "sem projeto coordenado atual"
    };
  }

  function docenteProjectSummary(docente) {
    const source = docenteProjectSource(docente);
    if (!source.hasData) return { hasData: false, current: 0, lastDate: null };
    const current = source.items.filter(projectIsCurrent).length;
    const dates = source.items.map(projectLastDate).filter(Boolean).sort((a, b) => b - a);
    return { hasData: true, current, lastDate: dates[0] || null };
  }

  function docenteProjectSource(docente) {
    const sources = [
      { items: docente.projetos_coordenados, coordinated: true },
      { items: docente.projetos_coordenados_lattes, coordinated: true },
      { items: docente.lattes_projetos_coordenados, coordinated: true },
      { items: docente.lattes && docente.lattes.projetos_coordenados, coordinated: true },
      { items: docente.projetos, coordinated: false },
      { items: docente.lattes_projetos, coordinated: false },
      { items: docente.lattes && docente.lattes.projetos, coordinated: false }
    ];
    let hasData = false;
    const items = [];
    sources.forEach((source) => {
      if (!Array.isArray(source.items)) return;
      hasData = true;
      source.items.forEach((item) => {
        if (source.coordinated || projectIsCoordinated(item)) items.push(item || {});
      });
    });
    return { hasData, items };
  }

  function projectIsCoordinated(project = {}) {
    if (project.coordenador === true || project.coordenado === true || project.coordena === true) return true;
    const role = normalized([project.papel, project.funcao, project.função, project.participacao, project.participação, project.tipo].filter(Boolean).join(" "));
    return !role || role.includes("coordena");
  }

  function projectIsCurrent(project = {}) {
    if (project.atual === true || project.vigente === true || project.em_andamento === true) return true;
    const status = normalized([project.status, project.situacao, project.situação, project.estado].filter(Boolean).join(" "));
    if (status.includes("conclu") || status.includes("encer") || status.includes("finaliz")) return false;
    if (status.includes("andamento") || status.includes("vigente") || status.includes("atual")) return true;
    const end = projectEndDate(project);
    return Boolean(end && end >= new Date());
  }

  function projectLastDate(project = {}) {
    return projectEndDate(project) || projectStartDate(project);
  }

  function projectEndDate(project = {}) {
    return firstProjectDate(project, ["data_fim", "fim", "termino", "término", "ano_fim", "ano_termino", "ano_término"]);
  }

  function projectStartDate(project = {}) {
    return firstProjectDate(project, ["data_inicio", "data_início", "inicio", "início", "ano_inicio", "ano_início", "ano"]);
  }

  function firstProjectDate(project, keys) {
    for (const key of keys) {
      const date = parseDateLike(project[key]);
      if (date) return date;
    }
    return null;
  }

  function yearsSince(date) {
    const now = new Date();
    let years = now.getFullYear() - date.getFullYear();
    const beforeAnniversary = now.getMonth() < date.getMonth() || (now.getMonth() === date.getMonth() && now.getDate() < date.getDate());
    if (beforeAnniversary) years -= 1;
    return Math.max(0, years);
  }


  function monthsUntil(date) {
    const now = new Date();
    let months = (date.getFullYear() - now.getFullYear()) * 12 + (date.getMonth() - now.getMonth());
    if (date.getDate() < now.getDate()) months -= 1;
    return months;
  }

  function docenteCredentialExpirationSummary(docente) {
    const cred = docente.credenciamento || {};
    const category = credentialCategory(cred.categoria || cred.tipo);
    if (category === "sem_credenciamento") return { hasData: false, date: null, months: null, scoreValue: null, expired: false, label: "" };
    const dates = (Array.isArray(cred.credenciamentos) ? cred.credenciamentos : [])
      .map((item) => parseDateLike(item && item.data_final))
      .filter(Boolean)
      .sort((a, b) => a - b);
    if (!dates.length) return { hasData: false, date: null, months: null, scoreValue: null, expired: false, label: "" };

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextDate = dates.find((date) => {
      const candidate = new Date(date.getTime());
      candidate.setHours(0, 0, 0, 0);
      return candidate >= today;
    }) || dates[dates.length - 1];
    const months = monthsUntil(nextDate);
    const expired = months < 0;
    const label = displayDate(isoDateString(nextDate));
    return {
      hasData: true,
      date: nextDate,
      months,
      scoreValue: Math.max(0, months),
      expired,
      label
    };
  }

  function docenteCredentialExpirationAlert(docente) {
    const resumo = docenteCredentialExpirationSummary(docente);
    if (!resumo.hasData || resumo.scoreValue === null) return null;
    const status = resumo.expired ? "red" : chartStatus("credenciamento_vencimento_meses", resumo.scoreValue);
    if (!isAlertChartStatus(status)) return null;
    const extra = resumo.expired ? `fim: ${resumo.label}; credenciamento vencido` : `fim: ${resumo.label}`;
    return {
      status,
      value: resumo.scoreValue,
      display: resumo.expired ? "vencido" : `${resumo.scoreValue} meses`,
      note: resumo.expired ? `vencido em ${resumo.label}` : `vence em ${resumo.label}`,
      text: resumo.expired ? "credenciamento vencido" : "credenciamento a vencer",
      detail: alertDetail("credenciamento_vencimento_meses", resumo.scoreValue, "meses até o fim do credenciamento", "meses", extra)
    };
  }

  function projectRedThreshold() {
    const rules = state.docentes.alertas_docentes || ALERT_RULES;
    const value = optionalNumber(rules.projetos_sem_coordenar_anos_vermelho);
    return value === null ? 3 : value;
  }

  function docenteAlertas(docente, stats = docenteStats(docente)) {
    const rules = state.docentes.alertas_docentes || ALERT_RULES;
    const alertas = [];
    const resumo = docenteResumo(docente);
    if (isOrientationAlertDocente(docente)) {
      if (stats.alunosAtivos === null) {
        alertas.push({
          metric: "ativo",
          level: "yellow",
          text: "alunos ativos pendente",
          detail: `orientandos ativos sem total informado no Janus; tabela mostra ${resumoTotal(resumo.ativo)} ativos`
        });
      } else {
        const activeFallback = stats.alunosAtivos < Number(rules.alunos_ativos_min || 0) ? "red" : "green";
        const activeLevel = chartStatus("ativo", stats.alunosAtivos, activeFallback);
        if (isAlertChartStatus(activeLevel)) {
          alertas.push({
            metric: "ativo",
            level: alertLevel(activeLevel),
            text: lowHighAlertText("ativo", stats.alunosAtivos, "poucos alunos", "muitos alunos", "alunos ativos em atenção"),
            detail: alertDetail("ativo", stats.alunosAtivos, "orientandos ativos")
          });
        }
      }

      const desligados = resumoTotal(resumo.desligado);
      const disconnectionLevel = chartStatus("desligado", desligados, disconnectionStatus(desligados));
      if (isAlertChartStatus(disconnectionLevel)) {
        alertas.push({
          metric: "desligado",
          level: alertLevel(disconnectionLevel),
          text: "muitos desligamentos",
          detail: alertDetail("desligado", desligados, "desligamentos")
        });
      }

      const evasao = resumo.evasao.value;
      if (evasao !== null) {
        const evasionLevel = chartStatus("evasao", evasao, evasionStatus(evasao));
        if (isAlertChartStatus(evasionLevel)) {
          alertas.push({
            metric: "evasao",
            level: alertLevel(evasionLevel),
            text: "evasão alta",
            detail: alertDetail("evasao", evasao, "evasão", "%")
          });
        }
      }

      alertas.push(...tempoMedioAlertas(docente));
    }
    const publicacoes = publicacaoTypeCounts(docente);
    const publicacoesTotal = publicacaoAlertTotalFromCounts(publicacoes);
    const publicationFallback = publicacoesTotal < Number(rules.publicacoes_4_anos_min || 0) ? "red" : "green";
    const publicationLevel = chartStatus("publicacoes", publicacoesTotal, publicationFallback);
    if (isAlertChartStatus(publicationLevel)) {
      alertas.push({
        metric: "publicacoes",
        level: alertLevel(publicationLevel),
        text: "poucas publicações",
        detail: alertDetail("publicacoes", publicacoesTotal, "periódicos + anais", "", `periódicos: ${publicacoes.periodicos || 0}; anais: ${publicacoes.anais || 0}`)
      });
    }
    if (isAnalyzedDocente(docente) && isOrientationAlertDocente(docente)) {
      const disciplinas = disciplineSummary(docente);
      const disciplineLevel = chartStatus("disciplinas", disciplinas.total);
      if (isAlertChartStatus(disciplineLevel)) {
        alertas.push({
          metric: "disciplinas",
          level: alertLevel(disciplineLevel),
          text: "poucas disciplinas",
          detail: alertDetail("disciplinas", disciplinas.total, "turmas ministradas", "", disciplinas.periodo ? `período: ${disciplinas.periodo}` : "")
        });
      }
    }
    const credentialExpirationAlert = docenteCredentialExpirationAlert(docente);
    if (credentialExpirationAlert) {
      alertas.push({
        metric: "credenciamento_vencimento_meses",
        level: alertLevel(credentialExpirationAlert.status),
        text: credentialExpirationAlert.text,
        detail: credentialExpirationAlert.detail
      });
    }
    const projectAlert = docenteProjectAlert(docente);
    if (projectAlert) {
      alertas.push({
        metric: "projetos",
        level: alertLevel(projectAlert.status),
        text: projectAlert.text,
        detail: [projectAlert.display, projectAlert.note, projectAlert.status === "red" ? `limite crítico: mais de ${projectRedThreshold()} anos sem coordenar` : "sem projeto coordenado atual"].filter(Boolean).join("; ")
      });
    }
    return alertas;
  }

  function tempoMedioAlertas(docente) {
    const janus = docente.janus || {};
    const counts = tempoAlunoCounts(docente);
    return [
      { key: "tempo_medio_mestrado", value: optionalNumber(janus.tempo_medio_mestrado), label: "tempo médio ME", text: "tempo médio ME alto", count: counts.ME },
      { key: "tempo_medio_doutorado", value: optionalNumber(janus.tempo_medio_doutorado), label: "tempo médio DO", text: "tempo médio DO alto", count: counts.DO },
      { key: "tempo_medio_doutorado_direto", value: optionalNumber(janus.tempo_medio_doutorado_direto), label: "tempo médio DD", text: "tempo médio DD alto", count: counts.DD }
    ].map((item) => {
      if (item.value === null) return null;
      const level = chartStatus(item.key, item.value);
      if (!isAlertChartStatus(level)) return null;
      const extra = item.count
        ? `${item.count} titulações com tempo informado`
        : "tempo médio informado pelo Janus";
      return {
        metric: item.key,
        level: alertLevel(level),
        text: item.text,
        detail: alertDetail(item.key, item.value, item.label, "meses", extra)
      };
    }).filter(Boolean);
  }

  function alertBadges(alertas) {
    return alertas.length
      ? alertas.map((alerta) => `<span class="alert-badge alert-${escapeAttr(alerta.level)}">${escapeHtml(alerta.text)}</span>`).join("")
      : `<span class="cell-muted">${escapeHtml(uiText("docentes.sem_alerta", "Sem alerta"))}</span>`;
  }

  function tableIndicatorAlert(key, alertas) {
    return alertas.filter((alerta) => alerta.metric === key)
      .sort((a, b) => alertStatusWeight(b.level) - alertStatusWeight(a.level))[0] || null;
  }

  function tableBlockItem(key, value, label, alertas = []) {
    const alerta = tableIndicatorAlert(key, alertas);
    const missing = value === null || value === undefined || value === "" || value === "-";
    return {
      label,
      value: missing ? "-" : value,
      score: alerta ? alerta.level : "",
      title: alerta ? alerta.detail : missing ? "Sem valor informado" : "Sem alerta para este indicador"
    };
  }

  function tableBlockInfoItem(value, label, title = label) {
    return {
      label,
      value: value === null || value === undefined || value === "" ? "-" : value,
      score: "",
      title
    };
  }

  function tableBlockLine(items, extraClass = "") {
    const className = ["table-blocks", extraClass].filter(Boolean).join(" ");
    return `
      <span class="${escapeAttr(className)}">
        ${items.map((item) => {
          const blockClass = `table-block table-block-${item.score || "neutral"}`;
          return `<span class="${escapeAttr(blockClass)}"${item.wide ? ' style="width: calc(2 * var(--table-block-width) + 3px)"' : ""} title="${escapeAttr(item.title)}"><em>${escapeHtml(item.label)}</em><strong>${escapeHtml(item.value)}</strong></span>`;
        }).join("")}
      </span>
    `;
  }

  function compactScoreHtml(key, value, label, alertas = [], missingReason = "") {
    const item = value === null && missingReason
      ? tableBlockInfoItem("—", label, missingReason)
      : tableBlockItem(key, value, label, alertas);
    return tableBlockLine([item], "table-blocks-single");
  }

  function docenteSituacao(docente, alertas = docenteAlertas(docente)) {
    if (alertas.some((item) => item.level === "red")) return "red";
    if (alertas.length) return "yellow";
    return "green";
  }

  function situacaoLabel(status) {
    return {
      green: uiText("docentes.status_ok", "Ok"),
      yellow: uiText("docentes.status_atencao", "Atenção"),
      red: uiText("docentes.status_critico", "Crítico")
    }[status] || uiText("docentes.status_atencao", "Atenção");
  }

  function statusIndicator(status) {
    const label = situacaoLabel(status);
    const prefix = uiText("docentes.status_calculado_prefixo", "Status calculado");
    return `<span class="status-square status-readonly ${escapeAttr(status || "red")}" aria-label="${escapeAttr(prefix)}: ${escapeAttr(label)}" title="${escapeAttr(prefix)}: ${escapeAttr(label)}"></span>`;
  }

  function areaCodeHtml(area) {
    const full = area || uiText("docentes.sem_area", "Sem área");
    const code = areaShortLabel(area);
    return `<span class="area-code" title="${escapeAttr(full)}">${escapeHtml(code)}</span>`;
  }

  function areaShortLabel(area) {
    const configured = areaConfig(area);
    return configured && configured.sigla ? configured.sigla : (area || uiText("docentes.sem_area", "Sem área"));
  }

  function areaChartLabel(area) {
    return areaShortLabel(area);
  }

  function areaChartNote(detail = "") {
    return detail || "";
  }

  function areaConfig(area) {
    const text = normalized(area);
    if (!text) return null;
    const areas = state.configuracoes && Array.isArray(state.configuracoes.areas) ? state.configuracoes.areas : [];
    return areas.find((item) => normalized(item.nome) === text || normalized(item.sigla) === text) || null;
  }

  function renderDocenteDetail() {
    const docente = state.docentes.docentes.find((item) => item.id === selectedDocenteId);
    el.docenteDetail.classList.remove("hidden");
    if (!docente) {
      el.docenteDetailContent.innerHTML = `
        <div class="detail-header">
          <div class="detail-title-block">
            <p class="eyebrow">${escapeHtml(uiText("docentes.eyebrow", "Docentes"))}</p>
            <div class="detail-title-line">
              <h2 id="docenteDetailTitle">${escapeHtml(uiText("docentes.detalhe_nao_encontrado", "Docente não encontrado"))}</h2>
            </div>
            <p>${escapeHtml(uiText("docentes.detalhe_nao_encontrado_descricao", "Volte à lista e escolha um docente."))}</p>
          </div>
          <a class="button quiet detail-back" href="${escapeAttr(docentesListUrl())}">${escapeHtml(uiText("docentes.voltar", "Voltar"))}</a>
        </div>
      `;
      return;
    }
    const stats = docenteStats(docente);
    const janus = docente.janus || {};
    const desligadosTotal = optionalNumber(janus.desligados) ?? resumoTotal(docenteResumo(docente).desligado);
    const credentialExpiration = docenteCredentialExpirationSummary(docente);
    const disciplinas = disciplineSummary(docente);
    el.docenteDetailContent.innerHTML = `
      <div class="detail-header">
        <div class="detail-title-block">
          <p class="eyebrow">${escapeHtml(uiText("docentes.eyebrow", "Docentes"))}</p>
          <div class="detail-title-line">
            <h2 id="docenteDetailTitle">${escapeHtml(docente.nome)}</h2>
            <span class="detail-area-pill">${escapeHtml(areaShortLabel(docente.area))}</span>
          </div>
          <p>${escapeHtml(docente.area || uiText("docentes.sem_area", "Sem área"))}</p>
        </div>
        <a class="button quiet detail-back" href="${escapeAttr(docentesListUrl())}">${escapeHtml(uiText("docentes.voltar", "Voltar"))}</a>
      </div>
      <div class="detail-metrics">
        ${detailMetric(uiText("docentes.detalhe_ativos", "Ativos"), stats.alunosAtivos)}
        ${detailMetric(uiText("docentes.detalhe_titulados", "Titulados"), optionalNumber(janus.titulados))}
        ${detailMetric(uiText("docentes.detalhe_desligados", "Desligados"), desligadosTotal)}
        ${detailMetric(uiText("docentes.detalhe_total_janus", "Total Janus"), optionalNumber(janus.total))}
        ${detailMetric(uiText("docentes.detalhe_evasao", "Evasão (%)"), janusEvasion(janus).label)}
        ${detailMetric(uiText("docentes.coluna_credenciamento", "Credenciamento"), credentialLabel(docente.credenciamento && docente.credenciamento.categoria))}
        ${detailMetric("Fim do credenciamento", credentialExpiration.hasData ? credentialExpiration.label : "-")}
        ${detailMetric(uiText("docentes.detalhe_disciplinas", "Turmas ministradas"), disciplinas.total)}
      </div>
      ${credentialDetailSection(docente)}
      ${disciplineDetailSection(docente)}
      <section class="detail-section">
        <h3>${escapeHtml(uiText("docentes.tempo_medio_titulo", "Tempo médio de formação"))}</h3>
        <div class="tempo-cards">
          ${tempoCard(uiText("docentes.mestrado_label", "Mestrado"), janus.tempo_medio_mestrado)}
          ${tempoCard(uiText("docentes.doutorado_label", "Doutorado"), janus.tempo_medio_doutorado)}
          ${tempoCard(uiText("docentes.doutorado_direto_label", "Doutorado direto"), janus.tempo_medio_doutorado_direto)}
        </div>
        <p class="cell-muted">${escapeHtml(janus.periodo_pdf || "")}${janus.arquivo_pdf ? ` · ${escapeHtml(janus.arquivo_pdf)}` : ""}</p>
      </section>
      ${studentsSection(uiText("docentes.alunos_ativos_titulo", "Alunos ativos"), janusStudents(docente, "ativo"))}
      ${studentsSection(uiText("docentes.titulados_titulo", "Titulados"), janusStudents(docente, "titulado"), tituladosSourceNote(janus), "Data situação")}
      ${studentsSection(uiText("docentes.desligamentos_titulo", "Desligamentos"), janusStudents(docente, "desligado"))}
      <div class="detail-grid">
        ${simpleListSection(uiText("docentes.publicacoes_lattes_titulo", "Publicações Lattes"), allPublicacoes(docente), formatPublicacaoLinha)}
      </div>
    `;
  }

  function detailMetric(label, value) {
    const missing = value === null || value === undefined || value === "";
    return `<div class="detail-metric"><strong${missing ? ' class="detail-metric-missing"' : ""}>${missing ? "Não informado" : displayNumber(value)}</strong><span>${escapeHtml(label)}</span></div>`;
  }

  function tempoCard(label, value) {
    const meses = optionalNumber(value);
    return `<div class="tempo-card"><span>${escapeHtml(label)}</span><strong>${escapeHtml(mesesLabel(value, false))}</strong><small>${escapeHtml(meses === null ? uiText("docentes.sem_registro", "sem registro") : uiText("docentes.meses_label", "meses"))}</small></div>`;
  }

  function credentialDetailSection(docente) {
    const cred = docente.credenciamento || {};
    const items = Array.isArray(cred.credenciamentos) ? cred.credenciamentos : [];
    return `
      <section class="detail-section">
        <h3>${escapeHtml(uiText("docentes.coluna_credenciamento", "Credenciamento"))}</h3>
        <div class="table-scroll">
          <table class="data-table detail-table">
            <thead>
              <tr>
                <th>${escapeHtml(uiText("docentes.coluna_curso", "Curso"))}</th>
                <th>${escapeHtml(uiText("docentes.coluna_situacao", "Situação"))}</th>
                <th>${escapeHtml(uiText("docentes.coluna_data", "Data"))}</th>
                <th>Fim</th>
              </tr>
            </thead>
            <tbody>
              ${items.map((item) => `
                <tr>
                  <td>${escapeHtml(item.curso || "-")}</td>
                  <td>${escapeHtml(item.tipo || credentialLabel(item.categoria))}</td>
                  <td>${escapeHtml(displayDate(item.data_inicial))}</td>
                  <td>${escapeHtml(displayDate(item.data_final))}</td>
                </tr>
              `).join("") || tableEmpty(4, uiText("docentes.pdf_docentes_sem_credenciamento_titulo", "Sem credenciamento ativo"))}
            </tbody>
          </table>
        </div>
        <p class="cell-muted">${escapeHtml(cred.periodo_pdf || "")}${cred.arquivo_pdf ? ` · ${escapeHtml(cred.arquivo_pdf)}` : ""}${cred.entrada_recente ? ` · ${escapeHtml("entrada recente: alertas de orientação desconsiderados")}` : ""}</p>
      </section>
    `;
  }

  function disciplineDetailSection(docente) {
    const resumo = disciplineSummary(docente);
    return `
      <section class="detail-section">
        <h3>${escapeHtml(uiText("docentes.disciplinas_ministradas_titulo", "Disciplinas ministradas"))}</h3>
        <div class="table-scroll">
          <table class="data-table detail-table">
            <thead>
              <tr>
                <th>Sigla</th>
                <th>Turma</th>
                <th>Disciplina</th>
                <th>${escapeHtml(uiText("docentes.coluna_data", "Data"))}</th>
              </tr>
            </thead>
            <tbody>
              ${resumo.turmas.map((turma) => `
                <tr>
                  <td>${escapeHtml(turma.sigla || "-")}</td>
                  <td>${escapeHtml(turma.turma || "-")}</td>
                  <td>${escapeHtml(turma.disciplina || "-")}</td>
                  <td>${escapeHtml(turma.periodo || [displayDate(turma.data_inicio), displayDate(turma.data_fim)].filter(Boolean).join(" a ") || "-")}</td>
                </tr>
              `).join("") || tableEmpty(4, "Nenhuma turma ministrada no período do PDF de disciplinas.")}
            </tbody>
          </table>
        </div>
        <p class="cell-muted">${escapeHtml(resumo.periodo || "Período não informado no PDF de disciplinas.")}</p>
      </section>
    `;
  }

  function tituladosSourceNote(janus = {}) {
    const source = janus.arquivo_pdf || "janus.pdf";
    const period = janus.periodo_pdf ? ` · ${janus.periodo_pdf}` : "";
    return `Fonte: ${source}${period}. Janus: Estatísticas por orientador. A data corresponde à Data situação da titulação. Os registros preservam o NUSP, a modalidade ME, DO ou DD e o tempo de titulação informado no relatório.`;
  }

  function studentCourseLabel(student) {
    return normalizeCurso(student.curso) === "DO/DD" ? "DO/DD" : student.curso || "-";
  }

  function studentsSection(title, students, sourceNote = "", dateLabel = "") {
    return `
      <section class="detail-section">
        <h3>${escapeHtml(title)}</h3>
        <div class="table-scroll">
          <table class="data-table detail-table">
            <thead>
              <tr>
                <th>${escapeHtml(uiText("docentes.coluna_aluno", "Aluno"))}</th>
                <th>${escapeHtml(uiText("docentes.coluna_nusp", "NUSP"))}</th>
                <th>${escapeHtml(uiText("docentes.coluna_curso", "Curso"))}</th>
                <th>${escapeHtml(dateLabel || uiText("docentes.coluna_data", "Data"))}</th>
                <th>${escapeHtml(uiText("docentes.coluna_situacao", "Situação"))}</th>
              </tr>
            </thead>
            <tbody>
              ${students.map((student) => `
                <tr>
                  <td><strong>${escapeHtml(student.nome)}</strong></td>
                  <td>${escapeHtml(student.nusp || "-")}</td>
                  <td>${escapeHtml(studentCourseLabel(student))}</td>
                  <td>${escapeHtml(displayDate(student.data_situacao))}</td>
                  <td>${escapeHtml(student.situacao || "-")}</td>
                </tr>
              `).join("") || tableEmpty(5, uiText("docentes.sem_registro_janus", "Nenhum registro no PDF do Janus."))}
            </tbody>
          </table>
        </div>
        ${sourceNote ? `<p class="cell-muted">${escapeHtml(sourceNote)}</p>` : ""}
      </section>
    `;
  }

  function simpleListSection(title, items, formatter) {
    return `
      <section class="detail-section">
        <h3>${escapeHtml(title)}</h3>
        <ul class="detail-list">
          ${(items || []).map((item) => `<li>${escapeHtml(formatter(item))}</li>`).join("") || `<li class="cell-muted">${escapeHtml(uiText("docentes.nenhum_item", "Nenhum item cadastrado."))}</li>`}
        </ul>
      </section>
    `;
  }

  function formatPublicacaoLinha(item) {
    const data = item.data || item.ano || "-";
    const fonte = item.fonte ? ` · ${item.fonte}` : "";
    return `${data} · ${item.titulo || item.referencia || ""}${item.veiculo ? ` · ${item.veiculo}` : ""}${fonte}`;
  }

  function janusStudents(docente, categoria) {
    const alunos = (docente.janus && docente.janus.alunos) || [];
    return alunos
      .filter((student) => !categoria || student.categoria === categoria)
      .slice()
      .sort((a, b) => String(b.data_situacao).localeCompare(String(a.data_situacao)) || a.nome.localeCompare(b.nome, "pt-BR"));
  }

  function studentCategory(situacao) {
    const text = normalized(situacao);
    if (text.startsWith("ativo")) return "ativo";
    if (text.startsWith("titulado")) return "titulado";
    if (text.startsWith("desligado")) return "desligado";
    return "outro";
  }

  function bind() {
    document.addEventListener("click", (event) => {
      const row = event.target.closest("[data-open-docente]");
      if (row && !event.target.closest("button, a, input, select, textarea")) openDocente(row.dataset.openDocente);
    });
    document.addEventListener("keydown", (event) => {
      if (!["Enter", " "].includes(event.key)) return;
      const row = event.target.closest("[data-open-docente]");
      if (!row) return;
      event.preventDefault();
      openDocente(row.dataset.openDocente);
    });
    [el.docenteSearch, el.areaFilter, el.docenteStatusFilter].forEach((control) => {
      control && control.addEventListener("input", render);
    });
    if (el.docentesTable) {
      el.docentesTable.querySelectorAll("[data-docente-sort]").forEach(button => {
        button.addEventListener("click", () => {
          const key = button.dataset.docenteSort;
          docenteSortDirection = docenteSortKey === key
            ? (docenteSortDirection === "asc" ? "desc" : "asc")
            : (["nome", "area", "tipo"].includes(key) ? "asc" : "desc");
          docenteSortKey = key;
          renderDocentes();
        });
      });
    }
    [el.alertsSearch, el.alertsSeverity, el.alertsType].forEach(control => {
      if (control) control.addEventListener("input", renderAlertsPage);
    });
    if (el.alertsClear) el.alertsClear.addEventListener("click", () => {
      [el.alertsSearch, el.alertsSeverity, el.alertsType].forEach(control => { control.value = ""; });
      renderAlertsPage();
    });
    el.exportDocentesPdf && el.exportDocentesPdf.addEventListener("click", exportDocentesPdf);
    el.themeToggle && el.themeToggle.addEventListener("click", toggleTheme);
    el.mobileMenuToggle && el.mobileMenuToggle.addEventListener("click", toggleMobileMenu);
    el.mobileMenuClose && el.mobileMenuClose.addEventListener("click", () => setMobileMenu(false));
    el.sidebarScrim && el.sidebarScrim.addEventListener("click", () => setMobileMenu(false));
    document.querySelectorAll("#siteSidebar a").forEach((link) => {
      link.addEventListener("click", () => setMobileMenu(false, false));
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setMobileMenu(false);
    });
    window.addEventListener("resize", syncLayoutForViewport);
  }

  function openDocente(id) {
    window.location.href = docenteDetailUrl(id);
  }

  function ensureSelectedDocenteFromUrl() {
    if (selectedDocenteId) return;
    const params = new URLSearchParams(window.location.search);
    selectedDocenteId = params.get("id") || decodeURIComponent((window.location.hash || "").replace(/^#/, ""));
  }

  function docenteDetailUrl(id) {
    return new URL(`docentes/detalhe/index.html?id=${encodeURIComponent(id)}`, ROOT_URL).href;
  }

  function docentesListUrl() {
    return new URL("docentes/index.html", ROOT_URL).href;
  }

  function exportDocentesPdf() {
    const title = uiText("docentes.pdf_titulo", "SIADoce · Sistema de Informações Acadêmicas – Docentes");
    const subtitle = `${uiText("docentes.pdf_subtitulo_prefixo", "Janus e Lattes")} · ${uiText("docentes.periodo_prefixo", "Período")} ${janusPeriod() || uiText("docentes.pdf_periodo_nao_informado", "não informado")}`;
    const draft = createPdfLayout(title, subtitle, true);
    beginPdfPage(draft);
    renderPdfContent(draft);
    finishPdfPage(draft);
    const tocOffset = estimatePdfTocPages(draft.toc);
    const layout = createPdfLayout(title, subtitle);
    beginPdfPage(layout);
    renderPdfToc(layout, draft.toc, tocOffset);
    finishPdfPage(layout);
    beginPdfPage(layout);
    renderPdfContent(layout);
    finishPdfPage(layout);
    downloadBlob("docentes.pdf", createPdfBlob(layout));
  }

  function renderPdfContent(layout) {
    renderPdfSummary(layout);
    renderPdfAreaSummary(layout);
    renderPdfAlertSummary(layout);
    renderPdfDocentes(layout);
  }

  function createPdfLayout(title, subtitle, collectToc = false) {
    return {
      page: { width: 842, height: 595 },
      margin: 34,
      title,
      subtitle,
      y: 34,
      pageNumber: 0,
      collectToc,
      toc: [],
      commands: [],
      pages: []
    };
  }

  function beginPdfPage(layout) {
    layout.commands = [];
    layout.pageNumber += 1;
    layout.y = layout.margin;
    drawPdfRect(layout, layout.margin, layout.y, 92, 34, [230, 175, 60], null);
    drawPdfText(layout, layout.margin + 10, layout.y + 13, uiText("pdf.marca", "SIADoce"), 15, "bold", [8, 19, 47]);
    drawPdfText(layout, layout.margin + 10, layout.y + 26, uiText("pdf.submarca", "Acompanhamento Docente"), 7, "regular", [8, 19, 47]);
    drawPdfText(layout, layout.margin + 108, layout.y + 12, layout.title, 17, "bold", [20, 45, 105]);
    drawPdfText(layout, layout.margin + 108, layout.y + 28, layout.subtitle, 8, "regular", [85, 91, 105]);
    drawPdfText(layout, layout.page.width - layout.margin - 110, layout.y + 28, `p. ${layout.pageNumber}`, 7, "regular", [85, 91, 105]);
    drawPdfLine(layout, layout.margin, layout.y + 44, layout.page.width - layout.margin, layout.y + 44, [20, 45, 105], 1.1);
    layout.y += 60;
  }

  function finishPdfPage(layout) {
    if (!layout.commands.length) return;
    layout.pages.push(layout.commands.join("\n"));
    layout.commands = [];
  }

  function ensurePdfSpace(layout, height) {
    if (layout.y + height <= layout.page.height - layout.margin) return;
    finishPdfPage(layout);
    beginPdfPage(layout);
  }

  function addPdfTocEntry(layout, title, level = 0) {
    if (!layout.collectToc) return;
    layout.toc.push({ title: String(title || ""), page: layout.pageNumber, level });
  }

  function estimatePdfTocPages(entries) {
    return Math.max(1, Math.ceil((entries || []).length / pdfTocRowsPerPage()));
  }

  function pdfTocRowsPerPage() {
    return 33;
  }

  function renderPdfToc(layout, entries, pageOffset) {
    const title = uiText("docentes.pdf_sumario_titulo", "Sumário");
    const rowsPerPage = pdfTocRowsPerPage();
    const items = entries && entries.length ? entries : [{ title: "Resumo geral", page: 1, level: 0 }];
    items.forEach((entry, index) => {
      if (index > 0 && index % rowsPerPage === 0) {
        finishPdfPage(layout);
        beginPdfPage(layout);
      }
      if (index % rowsPerPage === 0) {
        drawPdfSectionTitle(layout, title);
        drawPdfLine(layout, layout.margin, layout.y, layout.page.width - layout.margin, layout.y, [229, 231, 235], .6);
        layout.y += 8;
      }
      const y = layout.y + 10;
      const indent = entry.level ? 14 : 0;
      const page = Number(entry.page || 1) + pageOffset;
      const textWidth = layout.page.width - layout.margin * 2 - 58 - indent;
      const label = wrapPdfText(entry.title, textWidth, entry.level ? 7 : 7.4)[0] || "";
      drawPdfText(layout, layout.margin + indent, y, label, entry.level ? 7 : 7.4, entry.level ? "regular" : "bold", [31, 41, 55]);
      drawPdfText(layout, layout.page.width - layout.margin - 28, y, page, 7.4, "bold", [31, 41, 55]);
      layout.y += 13;
    });
  }

  function renderPdfSummary(layout) {
    addPdfTocEntry(layout, "Resumo geral", 0);
    const docentesAnalise = summaryDocentes();
    const counts = countDocenteSituacao(docentesAnalise);
    const credentials = credentialGroupCounts(docentesAnalise);
    drawPdfSectionTitle(layout, "Resumo geral");
    drawPdfCards(layout, [
      ["Docentes", docentesAnalise.length, "blue"],
      [uiText("docentes.status_ok", "Ok"), counts.green || 0, "green"],
      [uiText("docentes.status_atencao", "Atenção"), counts.yellow || 0, "yellow"],
      [uiText("docentes.status_critico", "Crítico"), counts.red || 0, "red"],
      ["Ativos", activeStudentsTotal(docentesAnalise), "blue"],
      ["Titulações", sumDocenteResumo("titulado", docentesAnalise), "blue"],
      ["Desligamentos", sumDocenteResumo("desligado", docentesAnalise), "red"],
      ["Publicações", docentesAnalise.reduce((sum, docente) => sum + publicacaoTypeCounts(docente).total, 0), "green"],
      ["Plenos", credentials.pleno || 0, "green"],
      ["Específicos", credentials.especifico || 0, "yellow"],
      ["Vencidos", credentials.vencido_com_orientando || 0, "red"]
    ], 5);
  }

  function renderPdfAreaSummary(layout) {
    addPdfTocEntry(layout, uiText("docentes.graficos_area_titulo", "Gráficos por área"), 0);
    const rows = areaSummaries().map((item) => [
      areaPdfLabel(item.area),
      item.docentes,
      item.ativos,
      item.titulados,
      item.desligados,
      item.evasao_media === null ? "-" : `${item.evasao_media}%`,
      item.tempo_medio_mestrado === null ? "-" : `${item.tempo_medio_mestrado}`,
      item.tempo_medio_doutorado === null ? "-" : `${item.tempo_medio_doutorado}`,
      item.tempo_medio_doutorado_direto === null ? "-" : `${item.tempo_medio_doutorado_direto}`,
      item.publicacoes
    ]);
    drawPdfSectionTitle(layout, uiText("docentes.graficos_area_titulo", "Gráficos por área"));
    drawPdfChartGrid(layout, [
      { title: uiText("docentes.grafico_docentes_area_titulo", "Docentes por área"), rows: areaFacultyRows(), maxRows: 8 },
      { title: uiText("docentes.grafico_area_titulo", "Alunos ativos por área"), rows: areaActiveRows(), maxRows: 8 },
      { title: uiText("docentes.grafico_formacao_titulo", "Titulações por área"), rows: areaFormationRows(), maxRows: 8 },
      { title: uiText("docentes.grafico_desligamentos_titulo", "Desligamentos por área"), rows: areaDisconnectionRows(), maxRows: 8 },
      { title: uiText("docentes.grafico_tempo_mestrado_area_titulo", "Tempo médio ME por área"), rows: areaTimeRows("mestrado"), maxRows: 8 },
      { title: uiText("docentes.grafico_tempo_doutorado_area_titulo", "Tempo médio DO por área"), rows: areaTimeRows("doutorado"), maxRows: 8 },
      { title: uiText("docentes.grafico_tempo_doutorado_direto_area_titulo", "Tempo médio DD por área"), rows: areaTimeRows("doutorado_direto"), maxRows: 8 }
    ], 2);
    drawPdfTable(layout, "Indicadores por área", ["Área", "Doc.", "Ativ.", "Tit.", "Desl.", "Evas.", "ME", "DO", "DD", "Pub."], rows, [170, 36, 40, 36, 36, 42, 34, 34, 34, 44], 6.7);
    drawPdfNote(layout, `Evasão média entre docentes com pelo menos ${MIN_ALUNOS_EVASAO} alunos distintos e alguma orientação encerrada no período do Janus.`);
  }

  function renderPdfAlertSummary(layout) {
    addPdfTocEntry(layout, uiText("docentes.graficos_alertas_titulo", "Alertas"), 0);
    drawPdfSectionTitle(layout, uiText("docentes.graficos_alertas_titulo", "Alertas"));
    drawPdfCards(layout, attentionSummaries().map((item) => [item.label, item.value, item.status]), 4, true);
    drawPdfChartGrid(layout, [
      { title: uiText("docentes.grafico_poucos_ativos_titulo", "Quantidade de alunos"), rows: lowActiveAlertRows(), maxRows: 10 },
      { title: uiText("docentes.grafico_evasao_alta_titulo", "Evasão alta (%)"), rows: highEvasionAlertRows(), maxRows: 10 },
      { title: uiText("docentes.grafico_sem_publicacao_titulo", "Poucas publicações"), rows: noPublicationAlertRows(), maxRows: 10 },
      { title: uiText("docentes.grafico_projetos_titulo", "Projetos coordenados"), rows: projectAlertRows(), maxRows: 10 },
      { title: uiText("docentes.grafico_credenciamento_vencimento_titulo", "Credenciamento a vencer"), rows: credentialExpirationAlertRows(), maxRows: 10 },
      { title: uiText("docentes.grafico_sobrecarga_titulo", "Possível sobrecarga"), rows: overloadAlertRows(), maxRows: 10 }
    ], 2);
    const rows = [
      ...pdfAlertDocenteRows("Poucos ativos", lowActiveAlertRows()),
      ...pdfAlertDocenteRows("Evasão alta (%)", highEvasionAlertRows()),
      ...pdfAlertDocenteRows("Poucas publicações", noPublicationAlertRows()),
      ...pdfAlertDocenteRows("Projetos coordenados", projectAlertRows()),
      ...pdfAlertDocenteRows("Credenciamento a vencer", credentialExpirationAlertRows()),
      ...pdfAlertDocenteRows("Possível sobrecarga", overloadAlertRows())
    ];
    drawPdfTable(layout, "Docentes por alerta", ["Alerta", "Docente", "Valor"], rows.length ? rows : [["Sem alertas", "", "0"]], [130, 330, 58], 6.7);
  }

  function pdfAlertDocenteRows(label, rows) {
    return rows.map((row) => [label, row.label, row.display]);
  }

  function renderPdfDocentes(layout) {
    let firstGroup = true;
    credentialGroups(analysisDocentes()).forEach((group) => {
      if (layout.commands.length) {
        finishPdfPage(layout);
        beginPdfPage(layout);
      }
      addPdfTocEntry(layout, group.label, firstGroup ? 0 : 1);
      firstGroup = false;
      drawPdfSectionTitle(layout, `${group.label} (${group.docentes.length})`);
      group.docentes.forEach((docente, index) => {
        if (index > 0) {
          finishPdfPage(layout);
          beginPdfPage(layout);
        }
        addPdfTocEntry(layout, docente.nome || "Docente", 2);
        renderPdfDocente(layout, docente);
      });
    });
  }

  function renderPdfDocente(layout, docente) {
    const resumo = docenteResumo(docente);
    const pubs = publicacaoTypeCounts(docente);
    const publicacoesAlerta = publicacaoAlertTotalFromCounts(pubs);
    const status = docenteSituacao(docente);
    const janus = docente.janus || {};
    ensurePdfSpace(layout, 96);
    drawPdfRect(layout, layout.margin, layout.y, layout.page.width - layout.margin * 2, 28, statusFill(status), [219, 224, 234]);
    drawPdfText(layout, layout.margin + 8, layout.y + 12, docente.nome || "", 11, "bold", [17, 24, 39]);
    drawPdfText(layout, layout.margin + 8, layout.y + 24, `${docente.area || uiText("docentes.sem_area", "Sem área")} · ${credentialLabel(docente.credenciamento && docente.credenciamento.categoria)} · ${situacaoLabel(status)}`, 7, "regular", [75, 85, 99]);
    layout.y += 36;
    drawPdfCards(layout, [
      ["Ativos", courseCountText(resumo.ativo), "blue"],
      ["Titulados", courseCountText(resumo.titulado), "blue"],
      ["Desligados", resumoTotal(resumo.desligado), "red"],
      ["Evasão (%)", resumo.evasao.label, evasionStatus(resumo.evasao.value)],
      ["Tempo", resumo.tempo, "blue"],
      ["Lattes", `${publicacoesAlerta} total`, chartStatus("publicacoes", publicacoesAlerta)]
    ], 4, true);
    drawPdfCredentialSection(layout, docente);
    const alertas = docenteAlertas(docente).map((item) => item.text).join("; ") || uiText("docentes.sem_alerta", "Sem alerta");
    drawPdfNote(layout, `Alertas: ${alertas}`);
    drawPdfStudentsSection(layout, uiText("docentes.alunos_ativos_titulo", "Alunos ativos"), janusStudents(docente, "ativo"));
    drawPdfStudentsSection(layout, uiText("docentes.titulados_titulo", "Titulados"), janusStudents(docente, "titulado"), tituladosSourceNote(janus), "Data situação");
    drawPdfStudentsSection(layout, uiText("docentes.desligamentos_titulo", "Desligamentos"), janusStudents(docente, "desligado"));
    drawPdfPublicacoesSection(layout, docente);
  }

  function drawPdfCredentialSection(layout, docente) {
    const cred = docente.credenciamento || {};
    const items = Array.isArray(cred.credenciamentos) ? cred.credenciamentos : [];
    const rows = items.length
      ? items.map((item) => [item.curso || "-", item.tipo || credentialLabel(item.categoria), displayDate(item.data_inicial), displayDate(item.data_final)])
      : [[credentialLabel(cred.categoria), "", "", ""]];
    drawPdfTable(layout, uiText("docentes.coluna_credenciamento", "Credenciamento"), ["Curso", "Tipo", "Início", "Fim"], rows, [58, 210, 72, 72], 6.7);
  }

  function drawPdfStudentsSection(layout, title, students, sourceNote = "", dateLabel = "") {
    const rows = students.length
      ? students.map((student) => [student.nome || "", student.nusp || "-", student.curso || "-", displayDate(student.data_situacao), student.situacao || "-"])
      : [["0 registros", "", "", "", ""]];
    drawPdfTable(layout, title, ["Aluno", "NUSP", "Curso", dateLabel || "Data", "Situação"], rows, [245, 64, 38, 58, 120], 6.6);
    if (sourceNote) drawPdfNote(layout, sourceNote);
  }

  function drawPdfPublicacoesSection(layout, docente) {
    const publicacoes = allPublicacoes(docente);
    if (!publicacoes.length) {
      const pubs = publicacaoTypeCounts(docente);
      drawPdfNote(layout, `${uiText("docentes.publicacoes_lattes_titulo", "Publicações Lattes")}: ${publicacaoAlertTotalFromCounts(pubs)} total. Sem itens detalhados carregados.`);
      return;
    }
    const rows = publicacoes.map((item) => [
      item.data || item.ano || "-",
      item.titulo || item.referencia || "",
      item.veiculo || "",
      item.fonte || ""
    ]);
    drawPdfTable(layout, uiText("docentes.publicacoes_lattes_titulo", "Publicações Lattes"), ["Data/ano", "Título", "Veículo", "Fonte"], rows, [58, 300, 130, 50], 6.2);
  }

  function drawPdfSectionTitle(layout, title) {
    ensurePdfSpace(layout, 26);
    drawPdfText(layout, layout.margin, layout.y + 12, title, 13, "bold", [20, 45, 105]);
    layout.y += 20;
  }

  function drawPdfCards(layout, cards, columns, compact = false) {
    const gap = 7;
    const width = (layout.page.width - layout.margin * 2 - gap * (columns - 1)) / columns;
    const height = compact ? 34 : 42;
    cards.forEach((card, index) => {
      if (index % columns === 0) ensurePdfSpace(layout, height + 10);
      const x = layout.margin + (index % columns) * (width + gap);
      const y = layout.y;
      drawPdfRect(layout, x, y, width, height, [248, 250, 252], [219, 224, 234]);
      drawPdfRect(layout, x, y, 4, height, statusStroke(card[2]), null);
      drawPdfText(layout, x + 9, y + 12, card[0], 6.5, "regular", [85, 91, 105]);
      drawPdfText(layout, x + 9, y + (compact ? 27 : 31), card[1], compact ? 9 : 12, "bold", [17, 24, 39]);
      if (index % columns === columns - 1 || index === cards.length - 1) layout.y += height + 10;
    });
  }

  function drawPdfChartGrid(layout, charts, columns = 2) {
    const gap = 12;
    const width = (layout.page.width - layout.margin * 2 - gap * (columns - 1)) / columns;
    for (let index = 0; index < charts.length; index += columns) {
      const group = charts.slice(index, index + columns);
      const heights = group.map((chart) => pdfChartHeight(chart.rows || [], chart.maxRows));
      const height = Math.max(...heights);
      ensurePdfSpace(layout, height + 10);
      const y = layout.y;
      group.forEach((chart, offset) => {
        const x = layout.margin + offset * (width + gap);
        drawPdfBarChartAt(layout, x, y, width, height, chart.title, chart.rows || [], chart.maxRows);
      });
      layout.y = y + height + 10;
    }
  }

  function pdfChartHeight(rows, maxRows = 8) {
    const visible = Math.max(1, Math.min(rows.length || 0, maxRows || rows.length || 1));
    const hasHidden = rows.length > visible;
    return 31 + visible * 18 + (hasHidden ? 11 : 0);
  }

  function drawPdfBarChartAt(layout, x, y, width, height, title, rows, maxRows = 8) {
    const visible = (rows || []).slice(0, maxRows || rows.length);
    const normalizedRows = visible.map(normalizePdfChartRow);
    const max = Math.max(1, ...normalizedRows.map((row) => Number(row.value) || 0));
    drawPdfRect(layout, x, y, width, height, [248, 250, 252], [219, 224, 234]);
    drawPdfText(layout, x + 8, y + 13, title, 7.5, "bold", [20, 45, 105]);
    drawPdfLine(layout, x + 8, y + 21, x + width - 8, y + 21, [229, 231, 235], .5);
    if (!normalizedRows.length) {
      drawPdfText(layout, x + 8, y + 39, uiText("docentes.sem_dados", "Sem dados."), 6.5, "regular", [100, 116, 139]);
      return;
    }
    const labelWidth = Math.min(118, width * .34);
    const valueWidth = 38;
    const trackX = x + 10 + labelWidth;
    const trackWidth = Math.max(60, width - labelWidth - valueWidth - 24);
    normalizedRows.forEach((row, index) => {
      const rowY = y + 36 + index * 18;
      const label = wrapPdfText(row.label, labelWidth, 6.2)[0] || "";
      const note = row.note ? wrapPdfText(row.note, labelWidth, 5.5)[0] : "";
      const value = Number(row.value) || 0;
      const barWidth = value ? Math.max(3, Math.round(value / max * trackWidth)) : 0;
      drawPdfText(layout, x + 8, rowY, label, 6.2, "regular", [31, 41, 55]);
      if (note) drawPdfText(layout, x + 8, rowY + 7, note, 5.5, "regular", [100, 116, 139]);
      drawPdfRect(layout, trackX, rowY - 7, trackWidth, 6, [226, 232, 240], null);
      if (barWidth) drawPdfRect(layout, trackX, rowY - 7, barWidth, 6, statusStroke(row.status), null);
      drawPdfText(layout, x + width - valueWidth, rowY, row.display, 6.4, "bold", statusStroke(row.status));
    });
    if ((rows || []).length > normalizedRows.length) {
      drawPdfText(layout, x + 8, y + height - 7, `+ ${(rows || []).length - normalizedRows.length} itens`, 5.8, "regular", [100, 116, 139]);
    }
  }

  function normalizePdfChartRow(row) {
    if (Array.isArray(row)) {
      return {
        label: row[0],
        value: Number(row[1]) || 0,
        status: row[2] || "yellow",
        note: row[3] || "",
        display: row[4] || row[1]
      };
    }
    return {
      label: row.label || "",
      value: Number(row.value) || 0,
      status: row.status || "yellow",
      note: row.note || "",
      display: row.display === undefined || row.display === null ? row.value : row.display
    };
  }

  function drawPdfNote(layout, text) {
    const lines = wrapPdfText(text, layout.page.width - layout.margin * 2 - 14, 7);
    const height = 12 + lines.length * 9;
    ensurePdfSpace(layout, height + 4);
    drawPdfRect(layout, layout.margin, layout.y, layout.page.width - layout.margin * 2, height, [248, 250, 252], [229, 231, 235]);
    lines.forEach((line, index) => drawPdfText(layout, layout.margin + 8, layout.y + 13 + index * 9, line, 7, "regular", [75, 85, 99]));
    layout.y += height + 8;
  }

  function drawPdfTable(layout, title, headers, rows, widths, fontSize = 7, maxRows = Infinity) {
    const lineHeight = fontSize + 2.8;
    const tableWidth = widths.reduce((sum, value) => sum + value, 0);
    const visibleRows = rows.slice(0, maxRows);
    ensurePdfSpace(layout, 28);
    drawPdfText(layout, layout.margin, layout.y + 11, title, 9, "bold", [20, 45, 105]);
    layout.y += 16;
    ensurePdfSpace(layout, 18);
    drawPdfRect(layout, layout.margin, layout.y, tableWidth, 17, [20, 45, 105], null);
    let x = layout.margin;
    headers.forEach((header, index) => {
      drawPdfText(layout, x + 4, layout.y + 11, header, fontSize, "bold", [255, 255, 255]);
      x += widths[index];
    });
    layout.y += 17;
    visibleRows.forEach((row, rowIndex) => {
      const wrapped = row.map((cell, index) => wrapPdfText(cell, widths[index] - 8, fontSize).slice(0, 3));
      const rowHeight = Math.max(17, 7 + Math.max(...wrapped.map((lines) => lines.length)) * lineHeight);
      ensurePdfSpace(layout, rowHeight);
      drawPdfRect(layout, layout.margin, layout.y, tableWidth, rowHeight, rowIndex % 2 ? [255, 255, 255] : [248, 250, 252], [229, 231, 235]);
      x = layout.margin;
      wrapped.forEach((lines, index) => {
        lines.forEach((line, lineIndex) => drawPdfText(layout, x + 4, layout.y + 11 + lineIndex * lineHeight, line, fontSize, "regular", [31, 41, 55]));
        x += widths[index];
      });
      layout.y += rowHeight;
    });
    if (rows.length > visibleRows.length) {
      drawPdfNote(layout, `Mais ${rows.length - visibleRows.length} registros omitidos nesta seção para manter o relatório compacto.`);
    } else {
      layout.y += 8;
    }
  }

  function drawPdfText(layout, x, y, text, size, weight = "regular", color = [0, 0, 0]) {
    const font = weight === "bold" ? "F2" : "F1";
    layout.commands.push(`${pdfColor(color)} BT /${font} ${round(size)} Tf 1 0 0 1 ${round(x)} ${round(layout.page.height - y)} Tm (${escapePdfText(text)}) Tj ET`);
  }

  function drawPdfRect(layout, x, y, width, height, fill, stroke) {
    const bottom = layout.page.height - y - height;
    if (fill) layout.commands.push(`${pdfColor(fill)} ${round(x)} ${round(bottom)} ${round(width)} ${round(height)} re f`);
    if (stroke) layout.commands.push(`${pdfColor(stroke, "RG")} ${round(x)} ${round(bottom)} ${round(width)} ${round(height)} re S`);
  }

  function drawPdfLine(layout, x1, y1, x2, y2, color = [0, 0, 0], width = 0.5) {
    layout.commands.push(`${pdfColor(color, "RG")} ${round(width)} w ${round(x1)} ${round(layout.page.height - y1)} m ${round(x2)} ${round(layout.page.height - y2)} l S`);
  }

  function wrapPdfText(value, maxWidth, size) {
    const words = String(value === null || value === undefined ? "" : value).split(/\s+/).filter(Boolean);
    const lines = [];
    let current = "";
    words.forEach((word) => {
      const candidate = current ? `${current} ${word}` : word;
      if (pdfTextWidth(candidate, size) <= maxWidth || !current) {
        current = candidate;
      } else {
        lines.push(current);
        current = word;
      }
    });
    if (current) lines.push(current);
    return lines.length ? lines : [""];
  }

  function pdfTextWidth(value, size) {
    return String(value || "").length * size * 0.48;
  }

  function createPdfBlob(layout) {
    const objects = ["", "", "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>", "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>"];
    const addObject = (content) => {
      objects.push(content);
      return objects.length;
    };
    const pageIds = [];
    layout.pages.forEach((stream) => {
      const contentId = addObject(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
      const pageId = addObject(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${layout.page.width} ${layout.page.height}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentId} 0 R >>`);
      pageIds.push(pageId);
    });
    objects[0] = "<< /Type /Catalog /Pages 2 0 R >>";
    objects[1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;
    return new Blob([buildPdf(objects)], { type: "application/pdf" });
  }

  function buildPdf(objects) {
    let pdf = "%PDF-1.4\n";
    const offsets = [0];
    objects.forEach((object, index) => {
      offsets.push(pdf.length);
      pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
    });
    const xref = pdf.length;
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    for (let i = 1; i < offsets.length; i += 1) {
      pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
    }
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
    return pdf;
  }

  function escapePdfText(value) {
    return String(value === null || value === undefined ? "" : value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\x20-\x7E]/g, " ")
      .replace(/\\/g, "\\\\")
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)");
  }

  function pdfColor(color, operator = "rg") {
    return `${color.map((value) => round(value / 255)).join(" ")} ${operator}`;
  }

  function statusFill(status) {
    return {
      green: [229, 245, 238],
      yellow: [255, 243, 208],
      red: [245, 231, 236],
      "dark-red": [245, 231, 236],
      blue: [220, 238, 247]
    }[status] || [244, 246, 249];
  }

  function statusStroke(status) {
    return {
      green: [20, 90, 67],
      yellow: [117, 85, 12],
      red: [130, 20, 60],
      "dark-red": [93, 13, 43],
      blue: [0, 100, 160]
    }[status] || [89, 101, 122];
  }

  function areaPdfLabel(area) {
    return areaShortLabel(area);
  }

  function round(value) {
    return Math.round(Number(value) * 1000) / 1000;
  }

  function downloadBlob(filename, blob) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function verificationStartYear() {
    const period = janusPeriod();
    const match = String(period || "").match(/\b\d{2}\/\d{2}\/(\d{4})\b/);
    if (match) return Number(match[1]);
    const lattesYear = state.docentes && state.docentes.fonte_lattes ? optionalNumber(state.docentes.fonte_lattes.desde_ano) : null;
    return lattesYear || DEFAULT_VERIFICATION_YEAR;
  }

  function janusPeriod() {
    const source = state.docentes && state.docentes.fontes_janus && state.docentes.fontes_janus.pdf;
    if (source && source.periodo) return source.periodo;
    const docente = state.docentes.docentes.find((item) => item.janus && item.janus.periodo_pdf);
    return docente && docente.janus ? docente.janus.periodo_pdf : "";
  }

  function isSinceYear(value, year) {
    const date = parseDateLike(value);
    return Boolean(date && date.getFullYear() >= Number(year || DEFAULT_VERIFICATION_YEAR));
  }

  function parseDateLike(value) {
    const text = String(value || "").trim();
    if (!text) return null;
    const year = text.match(/^(20\d{2})$/);
    if (year) return new Date(Number(year[1]), 0, 1);
    const iso = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (iso) return new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));
    const br = text.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (br) return new Date(Number(br[3]), Number(br[2]) - 1, Number(br[1]));
    const date = new Date(text);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function isoDateString(date) {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function optionalNumber(value) {
    if (value === "" || value === undefined || value === null) return null;
    const number = Number(value);
    return Number.isFinite(number) ? number : null;
  }

  function displayNumber(value) {
    return value === null || value === undefined || value === "" ? "?" : escapeHtml(value);
  }

  function displayDate(value) {
    const text = String(value || "");
    const match = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    return match ? `${match[3]}/${match[2]}/${match[1]}` : (text || "-");
  }

  function displayDateTime(value) {
    const text = String(value || "");
    if (!text) return "-";
    const date = new Date(text);
    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
    }
    return displayDate(text);
  }

  function matches(item, query) {
    if (!query) return true;
    return normalized(searchableText(item)).includes(query);
  }

  function searchableText(value) {
    if (value === null || value === undefined) return "";
    if (Array.isArray(value)) return value.map(searchableText).join(" ");
    if (typeof value === "object") return Object.values(value).map(searchableText).join(" ");
    return String(value);
  }

  function tableEmpty(colspan, text) {
    return `<tr><td colspan="${escapeAttr(colspan)}" class="cell-muted">${escapeHtml(text)}</td></tr>`;
  }

  function uiText(path, fallback = "") {
    const root = state.configuracoes && state.configuracoes.interface ? state.configuracoes.interface : {};
    const value = String(path || "").split(".").filter(Boolean).reduce((acc, key) => {
      if (!acc || typeof acc !== "object") return undefined;
      return acc[key];
    }, root);
    return value === undefined || value === null || value === "" ? fallback : value;
  }

  function slugId(value) {
    return normalized(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `docente-${Date.now()}`;
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

  function initTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    const theme = stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    applyTheme(theme);
  }

  function toggleTheme() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute("content", theme === "dark" ? "#08132f" : "#183644");
  }

  function initLayout() {
    if (!el.appShell) return;
    el.appShell.classList.add("has-rail-controls");
    syncLayoutForViewport();
  }

  function toggleMobileMenu() {
    if (!el.appShell) return;
    setMobileMenu(!el.appShell.classList.contains("is-mobile-open"));
  }

  function setMobileMenu(open, manageFocus = true) {
    if (!el.appShell) return;
    const wasOpen = el.appShell.classList.contains("is-mobile-open");
    const mobile = window.matchMedia("(max-width: 980px)").matches;
    el.appShell.classList.toggle("is-mobile-open", Boolean(open));
    document.documentElement.classList.toggle("nav-open", Boolean(open));
    syncLayoutControls();
    if (!mobile || wasOpen === Boolean(open)) return;
    if (open) {
      window.requestAnimationFrame(() => {
        if (el.mobileMenuClose) el.mobileMenuClose.focus();
      });
    } else if (manageFocus && el.mobileMenuToggle) {
      el.mobileMenuToggle.focus();
    }
  }

  function syncLayoutForViewport() {
    if (!el.appShell) return;
    const desktop = window.matchMedia("(min-width: 981px)").matches;
    if (desktop) {
      setMobileMenu(false, false);
    }
    syncLayoutControls();
  }

  function syncLayoutControls() {
    if (!el.appShell) return;
    const mobileOpen = el.appShell.classList.contains("is-mobile-open");
    const mobile = window.matchMedia("(max-width: 980px)").matches;
    if (el.mobileMenuToggle) {
      el.mobileMenuToggle.setAttribute("aria-expanded", mobileOpen ? "true" : "false");
      el.mobileMenuToggle.setAttribute("aria-label", mobileOpen ? "Fechar menu" : "Abrir menu");
    }
    if (el.siteSidebar) {
      if (mobile) {
        el.siteSidebar.toggleAttribute("inert", !mobileOpen);
        el.siteSidebar.setAttribute("aria-hidden", mobileOpen ? "false" : "true");
      } else {
        el.siteSidebar.removeAttribute("inert");
        el.siteSidebar.removeAttribute("aria-hidden");
      }
    }
    const drawerOpen = mobile && mobileOpen;
    el.appShell.querySelector(".content-shell")?.toggleAttribute("inert", drawerOpen);
    el.appShell.querySelector(".site-header")?.toggleAttribute("inert", drawerOpen);
  }
})();
