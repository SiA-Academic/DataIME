// Executa apenas com os arquivos do Git. O acervo institucional é opcional no uso do site.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { padrao, avaliar } = require("../../../SiADoce/js/simular-criterios.js");

const site = path.resolve(__dirname, "../../../SiADoce");
const entrada = path.join(site, "producao/analise-geral/index.html");
const html = fs.readFileSync(entrada, "utf8");
assert.match(html, /<a\b[^>]*href="[^"]*analise-geral\/index\.html"[^>]*>Análise geral<\/a>/);
assert.doesNotMatch(html, /href="[^"]*quadrienio\//);
assert.match(html, /id="sim-min-total"/);
assert.doesNotMatch(html.match(/<form\b[^>]*id="sim-regras"[^>]*>/)[0], /somente-institucional/);

const prefixo = "window.SIADOCE_PUBLICACOES = ";
const script = fs.readFileSync(path.join(site, "dados/publicacoes.js"), "utf8").trim();
assert(script.startsWith(prefixo) && script.endsWith(";"));
const base = JSON.parse(script.slice(prefixo.length, -1));
const regras = padrao(base.anos);
assert.equal(regras.minTotal, 4);
assert.deepEqual(Object.keys(base).sort(), ["anos", "docentes", "fimAnosCompletos", "gruposCredenciamento", "snapshot"]);
assert.match(base.snapshot, /^[0-9a-f]{64}$/);
assert(base.docentes.length > 0);
assert.equal(new Set(base.docentes.map(docente => docente.id)).size, base.docentes.length);
const grupos = new Set(base.gruposCredenciamento.map(grupo => {
  assert.deepEqual(Object.keys(grupo).sort(), ["id", "nome"]);
  return grupo.id;
}));
for (const docente of base.docentes) {
  assert.deepEqual(Object.keys(docente).sort(), ["anos", "artigos", "dataCV", "grupoAnalise", "id", "lattes", "nome"]);
  assert(docente.nome.trim() && docente.id.trim());
  assert(grupos.has(docente.grupoAnalise));
  assert(docente.anos.every(ano => base.anos.includes(ano)));
  assert.match(docente.lattes, /^https:\/\/(?:lattes|buscatextual)\.cnpq\.br\//);
  for (const artigo of docente.artigos) {
    assert.deepEqual(Object.keys(artigo).sort(), ["ano", "externo", "faixa", "fonte", "motivo", "pendente", "tipo", "titulo", "veiculo"]);
    assert(artigo.titulo.trim());
    assert(Number.isInteger(artigo.ano));
    assert(["periodico", "anais_congressos"].includes(artigo.tipo));
    assert.equal(typeof artigo.externo, "boolean");
    assert.equal(typeof artigo.pendente, "boolean");
    assert.match(artigo.fonte, /^https?:\/\//);
  }
}
const resultados = avaliar(base, regras);
assert.equal(resultados.length, base.docentes.length);
for (const ficha of resultados) {
  assert.equal(ficha.total, ficha.artigos.length);
  assert.equal(ficha.pendentes, ficha.aConferir.length);
  assert.equal(ficha.situacao === "atingiu", ficha.total >= 4);
}

for (const rota of ["quadrienio", "quadrienio/minimo-3", "quadrienio/minimo-5"]) {
  const arquivo = path.join(site, "producao", rota, "index.html");
  const anterior = fs.readFileSync(arquivo, "utf8");
  const destino = /http-equiv="refresh"\s+content="0;\s*url=([^"]+)"/i.exec(anterior);
  assert(destino, rota);
  assert.equal(path.resolve(path.dirname(arquivo), destino[1]), entrada, rota);
}
console.log("Análise geral pública: menu, mínimo inicial, endereços antigos e fichas bibliográficas conferidos.");
