/* Motor usado pela Análise geral, sem acesso a serviços externos. */
(function () {
  "use strict";
  const base = typeof document !== "undefined" && document.currentScript
    ? new URL("../", document.currentScript.src)
    : null;
  const faixasAceitas = new Set(["A1", "A2", "A3", "A4"]);
  const grupos = ["atingiu", "em_aberto", "abaixo"];
  const ordenarNome = new Intl.Collator("pt-BR", { sensitivity: "base" });

  function padrao(anos) {
    return {
      inicio: Math.min(...anos), fim: Math.max(...anos),
      minTotal: 4, minPeriodicos: 0, minCongressos: 0,
      faixasPeriodicos: ["A1", "A2", "A3"], faixasCongressos: ["A1", "A2"],
      incluirExternos: true, maxEvasao: null, minTitulados: 0, minAtivos: 0, minEncerrados: 0,
    };
  }

  function avaliarDocente(docente, regras, fimAnosCompletos) {
    const artigos = [], aConferir = [];
    const lattes = docente.lattes && base ? new URL(docente.lattes, base).href : docente.lattes;
    let periodicos = 0, periodicosPendentes = 0;
    for (const registro of docente.artigos) {
      if (registro.ano < regras.inicio || registro.ano > regras.fim ||
          (registro.externo && !regras.incluirExternos)) continue;
      const periodico = registro.tipo === "periodico";
      const faixas = periodico ? regras.faixasPeriodicos : regras.faixasCongressos;
      if (!faixas.length || (registro.faixa && !faixas.includes(registro.faixa))) continue;
      const item = { ...registro, fonte: registro.fonte || lattes };
      if (registro.pendente) {
        aConferir.push(item);
        if (periodico) periodicosPendentes++;
      } else if (registro.faixa) {
        artigos.push(item);
        if (periodico) periodicos++;
      }
    }
    const total = artigos.length, pendentes = aConferir.length;
    const congressos = total - periodicos;
    const motivos = [];
    let situacao = "atingiu";
    function registrar(motivo, aberta) {
      motivos.push(motivo);
      if (!aberta) situacao = "abaixo";
      else if (situacao === "atingiu") situacao = "em_aberto";
    }

    const fimFechado = Math.min(fimAnosCompletos, regras.fim);
    const semAno = Array.from({ length: Math.max(0, fimFechado - regras.inicio + 1) },
      (_, i) => regras.inicio + i).some(ano => !docente.anos.includes(ano));
    const dataMinima = fimFechado >= regras.inicio ? fimFechado + "-12-31" : regras.inicio + "-01-01";
    const coberturaParcial = semAno || !docente.dataCV || docente.dataCV < dataMinima;

    function testarArtigos(nome, confirmados, pendentesDoTipo, minimo, habilitado) {
      if (confirmados >= minimo) return;
      const aberta = habilitado && (confirmados + pendentesDoTipo >= minimo || coberturaParcial);
      registrar(nome + ": " + confirmados + " de " + minimo + " confirmados.", aberta);
      if (aberta && coberturaParcial && confirmados + pendentesDoTipo < minimo) {
        if (!motivos.includes("Cobertura parcial do Lattes no período selecionado.")) {
          motivos.push("Cobertura parcial do Lattes no período selecionado.");
        }
      }
    }
    testarArtigos("Artigos", total, pendentes, regras.minTotal,
      regras.faixasPeriodicos.length + regras.faixasCongressos.length > 0);
    testarArtigos("Periódicos", periodicos, periodicosPendentes, regras.minPeriodicos, regras.faixasPeriodicos.length > 0);
    testarArtigos("Congressos", congressos, pendentes - periodicosPendentes, regras.minCongressos, regras.faixasCongressos.length > 0);

    const janus = { ...docente.janus };
    janus.encerrados = Number.isInteger(janus.titulados) && Number.isInteger(janus.desligados)
      ? janus.titulados + janus.desligados : null;
    if (!Number.isInteger(janus.alunosDistintos)) {
      janus.alunosDistintos = Number.isInteger(janus.ativos) && janus.encerrados != null ? janus.ativos + janus.encerrados : null;
    }
    janus.evasaoAplicavel = janus.alunosDistintos == null ? null : janus.alunosDistintos >= 3;
    janus.evasao = janus.evasaoAplicavel && janus.encerrados > 0 ? 100 * janus.desligados / janus.encerrados : null;
    for (const [campo, minimo, rotulo] of [
      ["titulados", regras.minTitulados, "Titulações"], ["ativos", regras.minAtivos, "Orientandos ativos"],
      ["encerrados", regras.minEncerrados, "Orientações encerradas"],
    ]) {
      if (minimo <= 0) continue;
      if (janus[campo] == null) registrar(rotulo + " sem informação no Janus.", true);
      else if (janus[campo] < minimo) registrar(rotulo + ": " + janus[campo] + " de " + minimo + ".", false);
    }
    if (regras.maxEvasao != null && janus.evasaoAplicavel !== false) {
      if (janus.alunosDistintos == null) registrar("Total de alunos indisponível no Janus para avaliar a evasão.", true);
      else if (janus.evasao == null) registrar("Evasão indisponível sem um total positivo de orientações encerradas.", true);
      else if (janus.evasao > regras.maxEvasao) registrar("Evasão acima do limite de " + regras.maxEvasao + "%.", false);
    }
    return { id: docente.id, nome: docente.nome, categoria: docente.categoria, grupoAnalise: docente.grupoAnalise, situacao,
      periodicos, congressos, total, pendentes, atualizar: artigos.some(a => a.externo),
      motivos, artigos, aConferir, janus, dataCV: docente.dataCV, lattes };
  }

  function avaliar(dados, regras) {
    const selecao = {
      ...regras,
      faixasPeriodicos: regras.faixasPeriodicos.filter(faixa => faixasAceitas.has(faixa)),
      faixasCongressos: regras.faixasCongressos.filter(faixa => faixasAceitas.has(faixa)),
    };
    return dados.docentes.map(docente => avaliarDocente(docente, selecao, dados.fimAnosCompletos))
      .sort((a, b) => grupos.indexOf(a.situacao) - grupos.indexOf(b.situacao) ||
        Number(b.atualizar) - Number(a.atualizar) || ordenarNome.compare(a.nome, b.nome));
  }

  const api = { padrao, avaliar };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (typeof window !== "undefined") window.SiADoceSimulador = api;
})();
