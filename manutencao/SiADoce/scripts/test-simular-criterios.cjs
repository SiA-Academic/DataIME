const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { padrao, avaliar } = require("../../../SiADoce/js/simular-criterios.js");

const root = path.resolve(__dirname, "..");
const source = fs.readFileSync(path.join(root, "../../SiADoce-institucional/dados/dados.js"), "utf8");
const prefix = "window.SIADOCE_DADOS = ";
assert.ok(source.startsWith(prefix), "A instância deve conter os dados do simulador.");
const data = JSON.parse(source.slice(prefix.length).trim().replace(/;$/, "")).simulador;
const dadosFixos = JSON.parse(fs.readFileSync(path.join(root, "data/controle/producao-docente.json")));
const regras = padrao(data.anos);
assert.equal(regras.minTotal, 4, "A análise geral deve abrir com mínimo de quatro artigos.");
const cadastro = JSON.parse(fs.readFileSync(path.join(root, "data/controle/docentes.json"))).docentes;
const janusPorId = new Map(cadastro.map(docente => [docente.id, docente.janus]));
const credenciamentoPorId = new Map(cadastro.map(docente => [docente.id, docente.credenciamento.categoria]));
const excecoes = JSON.parse(fs.readFileSync(path.join(root, "data/controle/grupos-analise.json"), "utf8"));
assert.deepEqual(data.gruposCredenciamento.map(g => [g.id, g.categorias]), [
  ["plenos", ["pleno"]], ["demais", ["especifico", "vencido_com_orientando"]],
]);
for (const docente of data.docentes) {
  assert.equal(docente.categoria, credenciamentoPorId.get(docente.id), docente.nome);
  const excecao = excecoes.find(regra => regra.id === docente.id && regra.categoria === docente.categoria);
  const usual = data.gruposCredenciamento.find(grupo => grupo.categorias.includes(docente.categoria));
  assert.equal(docente.grupoAnalise, excecao ? excecao.grupo : usual.id, docente.nome);
  const alunos = janusPorId.get(docente.id).alunos;
  const distintos = new Set(alunos.map(aluno => aluno.nusp || aluno.nome));
  assert.equal(docente.janus.alunosDistintos, distintos.size, docente.nome);
  assert.equal(docente.janus.desligados, alunos.filter(aluno => aluno.categoria === "desligado").length, docente.nome);
}
const comLattes = dadosFixos.docentes.filter(p => p.lattes_status === "disponivel");
const situacoes = ["atingiu", "em_aberto", "abaixo"];
for (const minimo of dadosFixos.criterio_quadrienio.minimos) {
  const resultados = avaliar(data, { ...regras, minTotal: minimo });
  assert.equal(resultados.length, comLattes.length);
  const esperados = [...comLattes].sort((a, b) =>
    situacoes.indexOf(a.quadrienio.situacoes[minimo]) - situacoes.indexOf(b.quadrienio.situacoes[minimo]) ||
    Number(!!b.quadrienio.confirmados_fora_lattes) - Number(!!a.quadrienio.confirmados_fora_lattes) ||
    a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" }));
  resultados.forEach((r, i) => {
    const p = esperados[i], q = p.quadrienio;
    assert.deepEqual([r.id, r.situacao, r.periodicos, r.congressos, r.total, r.pendentes, r.atualizar],
      [p.id, q.situacoes[minimo], q.periodicos, q.congressos, q.total, q.pendentes, !!q.confirmados_fora_lattes], p.nome);
    assert.equal(r.artigos.length, r.total);
    assert.equal(r.aConferir.length, r.pendentes);
  });
}

const perfil = { id: "exemplo", nome: "Docente", dataCV: "2026-06-15", anos: data.anos,
  janus: { titulados: 2, desligados: 1, ativos: 2 }, artigos: [
    { ano: 2022, tipo: "periodico", faixa: "A3" },
    { ano: 2025, tipo: "anais_congressos", faixa: "A2", externo: true },
    { ano: 2026, tipo: "periodico", faixa: "A4" },
    { ano: 2026, tipo: "anais_congressos", faixa: "A3", pendente: true },
  ] };
function simular(opcoes, pessoa = perfil) {
  return avaliar({ ...data, docentes: [pessoa] }, { ...regras, minTotal: 0, ...opcoes })[0];
}
const publicacoes = { ...perfil, artigos: [
  { ano: 2025, tipo: "periodico", faixa: "A4" },
  { ano: 2025, tipo: "anais_congressos", faixa: "A4" },
  { ano: 2025, tipo: "periodico", faixa: "A5" },
  { ano: 2025, tipo: "anais_congressos", faixa: "A8", pendente: true },
] };
const ateA4 = simular({ minTotal: 2, faixasPeriodicos: ["A4", "A5"], faixasCongressos: ["A4", "A8"] }, publicacoes);
assert.deepEqual([ateA4.periodicos, ateA4.congressos, ateA4.pendentes, ateA4.situacao], [1, 1, 0, "atingiu"]);
assert.equal(simular({ minTotal: 2 }).situacao, "atingiu");
assert.equal(simular({ minTotal: 2, incluirExternos: false }).situacao, "abaixo");
assert.equal(simular({ minTotal: 2, inicio: 2025 }).situacao, "abaixo");
assert.equal(simular({ minPeriodicos: 2 }).situacao, "abaixo");
assert.equal(simular({ minCongressos: 2, faixasCongressos: ["A2", "A3"] }).situacao, "em_aberto");
assert.equal(simular({ minAtivos: 2, minTitulados: 2, minEncerrados: 3, maxEvasao: 34 }).situacao, "atingiu");
assert.equal(simular({ maxEvasao: 33.33 }).situacao, "abaixo");
// Uma pessoa pode ter dois vínculos com o mesmo docente.
const doisAlunos = { ...perfil, janus: { alunosDistintos: 2, titulados: 1, desligados: 1, ativos: 1 } };
const dispensado = simular({ maxEvasao: 0 }, doisAlunos);
assert.equal(dispensado.situacao, "atingiu");
assert.equal(dispensado.janus.evasao, null);
assert.equal(simular({ maxEvasao: 0, minTotal: 3 }, doisAlunos).situacao, "abaixo");
assert.equal(simular({ maxEvasao: 0, minEncerrados: 3 }, doisAlunos).situacao, "abaixo");
const tresAlunos = { ...perfil, janus: { titulados: 1, desligados: 1, ativos: 1 } };
assert.equal(simular({ maxEvasao: 50 }, tresAlunos).situacao, "atingiu");
assert.equal(simular({ maxEvasao: 49 }, tresAlunos).situacao, "abaixo");
const semEncerrados = { ...perfil, janus: { titulados: 0, desligados: 0, ativos: 3 } };
assert.equal(simular({ maxEvasao: 100 }, semEncerrados).situacao, "em_aberto");
assert.equal(simular({ maxEvasao: 100, minAtivos: 4 }, semEncerrados).situacao, "abaixo");
const semTotal = { ...perfil, janus: { titulados: 1, desligados: 0 } };
assert.equal(simular({ maxEvasao: 0 }, semTotal).situacao, "em_aberto");
assert.equal(simular({ minTotal: 3 }, { ...perfil, dataCV: "2024-01-01" }).situacao, "em_aberto");
console.log("OK: os três cenários fixos coincidem por docente; filtros de produção e orientação verificados.");
