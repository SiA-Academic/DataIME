# Integração com a planilha Google

O passo a passo de uso está em [ATUALIZAR_PLANILHA.md](../../docs/ATUALIZAR_PLANILHA.md).

Para a instalação única, copie **todo o conteúdo de `InstalacaoUnica.gs`** para o
projeto Apps Script **vinculado à planilha existente** (Extensões → Apps Script).
O arquivo já inclui as janelas de importação e exportação: não é necessário criar arquivos HTML,
publicar aplicação web, configurar Cloud, guardar senha ou habilitar serviços
avançados. Depois de salvar e recarregar a planilha, o menu **SiADoce** aparece.
A primeira execução pode pedir autorização do Google para o arquivo atual.
Se já houver outra automação vinculada à planilha, integre o `onOpen` existente
em vez de apagar seu código.

Para atualizar uma instalação anterior, substitua o código antigo do SiADoce pelo
conteúdo completo do novo `InstalacaoUnica.gs`, salve e recarregue a planilha.
Não crie outra planilha nem publique uma aplicação web. A instalação pode continuar
pedindo apenas acesso ao documento atual; a exportação não altera compartilhamento.

## Catálogo Google → SiADoce

1. Abra a [planilha principal](https://docs.google.com/spreadsheets/d/1TF6Fhi7EjhiSU59mGqVsbbR55OeQdjZiTvHvhSxLeOc/edit).
2. Escolha **SiADoce → Exportar catálogo para o SiADoce → Preparar download**.
3. Clique em **Baixar catálogo JSON** e use `catalogo-periodicos-google.json` na
   atualização local descrita no [guia](../../docs/ATUALIZAR_PLANILHA.md).

A planilha Google é a única fonte de edição. O JSON é somente uma entrada técnica
para o site estático e os scripts; não deve ser corrigido manualmente. Sempre
corrija a planilha e exporte novamente. Não há sincronização contínua.

O exportador lê os valores atuais de **Consulta**, **Periódicos**, **Critérios e fontes**,
**JCR — resumo** e **JCR por categoria**, sem escrever células. `getValues()` preserva
números, inclusive percentil zero, e usa os resultados calculados das fórmulas.
ISSNs e Source IDs precisam ser texto na planilha, preservando zeros e precisão.
Células vazias tornam-se `null`; cada linha tem a largura definida no contrato
(11, 20, 26, 11 e 13 colunas), e somente linhas vazias ao final são retiradas.

O formato é `siadoce.catalogo-periodicos`, versão 1, com `spreadsheet_id`,
`spreadsheet_url`, `exported_at` em UTC e as cinco matrizes em `sheets`.
O cabeçalho de **Periódicos** permanece na linha 6. O download contém apenas valores,
não formatação, fórmulas executáveis nem credenciais.

A leitura rejeita outra planilha, abas ausentes, cabeçalhos deslocados, erros como
`#REF!`, identificadores numéricos, datas que não estejam escritas como texto ISO,
mais de 20 mil linhas por aba, 1 milhão de células no conjunto ou JSON acima de 32 MiB.
O atualizador local ainda confere percentis, faixas e consistência entre as cinco abas
antes de aceitar o catálogo. Evite editar durante a exportação: o bloqueio impede
outras operações do script, mas não edições humanas simultâneas.

As abas **Eventos** e **Eventos — trabalhos** continuam sendo visões das evidências
produzidas pelo SiADoce, trazidas pela importação abaixo. Elas não integram este
catálogo de métricas de periódicos.

## O que o importador faz

- Lê o JSON escolhido na janela, apresenta as contagens e só importa após o clique
  em **Importar atualização**.
- Valida o formato `siadoce.planilha`, os totais, a ordem do ranking, o H5, as
  faixas e seus pesos e o tamanho do pacote antes de alterar células.
- Atualiza **Periódicos dos docentes**, **Pendências**, **Eventos** e
  **Eventos — trabalhos**, conservando os identificadores das abas existentes.
- Acrescenta **Faixa de referência** e **Percentil usado** logo após o título do
  periódico, lendo os valores atuais de **Consulta** a cada importação. Usa o
  título único ou o Source ID nos rótulos homônimos; ambiguidades interrompem a
  importação antes de qualquer alteração. Sem correspondência, as duas células
  ficam vazias; sem métrica, conserva **Sem percentil** e deixa o percentil vazio.
  O percentil zero, quando numérico, é preservado.
  Essas duas colunas não são somadas na linha Total. O JSON mantém seu formato
  original: as colunas adicionais são preenchidas pelo importador.
- Reaplica o fundo vermelho claro nas linhas de **Periódicos dos docentes** sem
  correspondência no catálogo da aba **Consulta**. A falta de percentil não
  aciona essa cor. O destaque indica ausência no catálogo consultado, não prova
  ausência global de indexação no Scopus ou Web of Science.
- Atualiza somente sete rótulos autorizados na coluna A e seus textos na coluna C
  de **Critérios e fontes**. Os demais critérios permanecem como estão.
- Preserva números como números e ISSNs, identificadores e títulos como texto.
  Conteúdo do JSON não pode introduzir fórmulas executáveis.
- Guarda cópias ocultas das cinco abas envolvidas. As cópias de importações
  anteriores permanecem disponíveis; não são apagadas por uma nova importação.
- Confere os valores escritos. Se ocorrer falha recuperável, restaura o conteúdo
  anterior. Uma interrupção abrupta exige usar **Restaurar última importação**
  antes da próxima tentativa.

O menu **Restaurar última importação** reverte as cinco abas ao estado anterior à
última atualização. Também desfaz alterações manuais posteriores nessas abas,
conforme a confirmação mostrada na tela. Catálogos, abas de JCR, compartilhamento
e outras abas não são alterados.

O pacote idêntico é ignorado somente se as células, as referências atuais da aba
**Consulta** e os textos de metodologia ainda conferirem. Se houve edição manual,
a importação atualiza as abas a partir do JSON e das referências de **Consulta**.
Os limites são 8 MiB, 10 mil linhas por aba, 40 colunas e 250 mil células ao todo.
Não edite as abas durante a importação: o bloqueio protege execuções concorrentes
do script, mas não impede edições humanas na interface do Google.

## Manutenção do código

Fontes: `Code.gs`, `Importar.html` e `Exportar.html`. Após editar, gere novamente
o arquivo único e execute os testes:

```powershell
node scripts/google-planilhas/gerar-instalacao.cjs
node scripts/google-planilhas/test-importador.cjs
node scripts/google-planilhas/test-interface.cjs
node scripts/google-planilhas/test-exportador.cjs
```

Para conferir também um pacote real, passe o caminho do JSON como segundo argumento:

```powershell
node scripts/google-planilhas/test-importador.cjs "caminho/atualizacao-planilha.json"
```

Os testes usam simulações de Apps Script, sem acesso à conta Google. Cobrem
validação, preservação de abas/identificadores, dados sem fórmulas, reimportação,
falhas durante escrita e confirmação, restauração e execução com o pacote real.
O teste do exportador confere a origem, o contrato, os limites, os tipos dos valores,
os identificadores, os erros de fórmula, o bloqueio e o download da janela.
Não equivalem a um teste executado dentro do Google. O primeiro uso deve conferir
o resultado e os totais na própria planilha.

As funções públicas da janela são `validarAtualizacao(texto)` e
`importarAtualizacao(texto, tokenPrevia)`. O token vincula a importação ao mesmo JSON
mostrado na prévia. As propriedades do documento armazenam apenas identificadores,
datas e informações necessárias à recuperação; os dados ficam nas abas.
`exportarCatalogo()` devolve o conteúdo e o nome do download à janela de exportação;
nenhuma propriedade ou célula é gravada por essa função.

## Referências oficiais consultadas

- [Autorização restrita ao documento atual (`@OnlyCurrentDoc`)](https://developers.google.com/apps-script/guides/services/authorization).
- [Comunicação da janela HTML com o script](https://developers.google.com/apps-script/guides/html/communication).
- [Cópias de abas e acesso à planilha](https://developers.google.com/apps-script/reference/spreadsheet/sheet).
- [Leitura, escrita e fórmulas em intervalos](https://developers.google.com/apps-script/reference/spreadsheet/range).
- [Bloqueio de execuções concorrentes](https://developers.google.com/apps-script/reference/lock/lock-service).
- [Propriedades do documento](https://developers.google.com/apps-script/reference/properties/properties-service).
