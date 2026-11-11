'use strict';
// Gera um único arquivo para copiar e colar no editor vinculado à planilha.
const fs = require('node:fs');
const path = require('node:path');
const pasta = __dirname;
let saida = fs.readFileSync(path.join(pasta, 'Code.gs'), 'utf8');
for (const nome of ['Importar', 'Exportar']) {
  const html = fs.readFileSync(path.join(pasta, nome + '.html'), 'utf8');
  const assinatura = "HtmlService.createHtmlOutputFromFile('" + nome + "')";
  if (saida.split(assinatura).length !== 2) throw new Error('Ponto de inclusão de ' + nome + ' não encontrado uma única vez.');
  saida = saida.replace(assinatura, 'HtmlService.createHtmlOutput(' + JSON.stringify(html) + ')');
}
fs.writeFileSync(path.join(pasta, 'InstalacaoUnica.gs'),
  '// Gerado por gerar-instalacao.cjs; editar Code.gs, Importar.html e Exportar.html.\n' + saida, 'utf8');
console.log('InstalacaoUnica.gs gerado.');
