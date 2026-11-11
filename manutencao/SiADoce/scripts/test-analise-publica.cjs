// Executa apenas com os arquivos do Git. O acervo institucional é opcional no uso do site.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { padrao } = require("../../../SiADoce/js/simular-criterios.js");

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
assert.equal(padrao(base.anos).minTotal, 4);
assert(base.perfis.length > 0);
for (const perfil of base.perfis) {
  assert.deepEqual(Object.keys(perfil).sort(), ["anoCV", "anos", "contagens", "grupoAnalise", "quantidade", "ultimoAnoCompleto"]);
  for (const registro of perfil.contagens) {
    const [ano, tipo, faixa, pendente, externo, total] = registro;
    assert.equal(registro.length, 6);
    assert(Number.isInteger(ano) && Number.isInteger(total) && total > 0);
    assert(["periodico", "anais_congressos"].includes(tipo));
    assert([null, "A1", "A2", "A3", "A4"].includes(faixa));
    assert.equal(typeof pendente, "boolean");
    assert.equal(typeof externo, "boolean");
  }
}

for (const rota of ["quadrienio", "quadrienio/minimo-3", "quadrienio/minimo-5"]) {
  const arquivo = path.join(site, "producao", rota, "index.html");
  const anterior = fs.readFileSync(arquivo, "utf8");
  const destino = /http-equiv="refresh"\s+content="0;\s*url=([^"]+)"/i.exec(anterior);
  assert(destino, rota);
  assert.equal(path.resolve(path.dirname(arquivo), destino[1]), entrada, rota);
}
console.log("Análise geral pública: menu, mínimo inicial, endereços antigos e base de contagens conferidos.");
