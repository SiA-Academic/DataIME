# Atualizar as publicações e a planilha do SIADoce

A mesma [planilha Google de periódicos e eventos](https://docs.google.com/spreadsheets/d/1TF6Fhi7EjhiSU59mGqVsbbR55OeQdjZiTvHvhSxLeOc/edit) continua sendo usada. Não crie outra a cada atualização.

Há dois caminhos: **métricas de periódicos: Google → SIADoce**; **publicações e evidências de eventos: SIADoce → abas geradas do Google**. Ambos usam o menu **SIADoce**. A planilha Google é o único local de edição das métricas de periódicos; os JSONs são arquivos de transferência, não planilhas para editar.

Não é necessário fornecer senha ao SIADoce, chave de API ou acesso público à planilha. Se o menu não mostrar **Exportar catálogo para o SIADoce**, atualize a instalação conforme as instruções abaixo.

## Atualizar as métricas de periódicos

1. Faça e confira as correções na planilha Google, mantendo coerentes **Consulta**, **Periódicos**, **Critérios e fontes**, **JCR — resumo** e **JCR por categoria**.
2. Use **SIADoce → Exportar catálogo para o SIADoce → Preparar download → Baixar catálogo JSON**.
3. Abra o PowerShell na pasta do SIADoce e execute, ajustando o caminho do arquivo baixado:

   ```powershell
   .\importar-catalogo-google.ps1 "C:\caminho\catalogo-periodicos-google.json"
   .\build-public.ps1
   ```

O primeiro comando confere origem, estrutura, identificadores, percentis e faixas entre as cinco abas antes de gravar `data/controle/catalogo-periodicos-google.json`. O segundo recalcula e gera o site. Não edite esse JSON; corrija a planilha e exporte novamente. Não há sincronização contínua.

**A referência de métricas continua sendo 2025**, inclusive para publicações novas. A integração bloqueia outro ano: migrar para percentis de 2026 ou posteriores exige revisar a configuração e os textos do classificador. Isso é separado da atualização dos currículos.

## Daqui a alguns meses: três passos

### 1. Trocar os arquivos de entrada

Na pasta `SIADoce/static/CVS_LATTES/`, substitua os PDFs antigos pelos currículos Lattes atualizados dos mesmos docentes. Preserve os nomes existentes e mantenha apenas um PDF por docente. Baixe o currículo completo; confirme a data de atualização do Lattes dentro do PDF. Imprimir novamente um currículo desatualizado não acrescenta publicações.

**Para avançar o período analisado**, atualize também `static/janus.pdf`: no Janus, gere **Estatísticas por orientador**, com **todas as situações** e o intervalo desejado. O período vem desse relatório; trocar apenas os Lattes não estende a janela de anos. Para manter um histórico desde 2022, por exemplo, escolha de 01/01/2022 até a nova data. As publicações do Lattes têm granularidade anual: a rotina não comprova a data exata de publicação dentro do primeiro ou do último ano.

Atualize `static/orientadores.pdf` se o quadro de credenciados mudou e `static/disciplinas.pdf` para atualizar também essa parte do site. Novos docentes precisam de um PDF identificável pelo cadastro. Confira os ausentes no relatório final; ausência de currículo não significa produção zero.

Se houve alterações nas métricas **na planilha Google**, exporte e importe o catálogo conforme a seção anterior antes de continuar. O comando do passo 2 já gera o site, dispensando um build separado nesse caso.

### 2. Executar a atualização local

Na pasta do SIADoce, dê dois cliques em **`Atualizar planilha.cmd`**. A janela mostra as etapas, aguarda ao final e abre a pasta dos resultados quando tudo termina corretamente.

Alternativa pelo PowerShell, aberto nessa pasta:

```powershell
.\atualizar-planilha.ps1
```

A rotina:

1. Preserva uma cópia das entradas, evidências, scripts e dados anteriores.
2. Extrai os PDFs, recalcula as classificações e gera o site.
3. Agrupa os periódicos, deduplica publicações compartilhadas e valida as fontes.
4. Gera `atualizacao-planilha.json` e `relatorio-atualizacao.txt`.

Abra o relatório e confira **período, docentes, CVs ausentes, quantidades e pendências**. Ele compara os totais com a última execução concluída, quando houver. Uma redução inesperada pode resultar de currículo incompleto, mudança de quadro docente ou mudança do período; confirme antes de importar.

Os resultados ficam em:

```text
SIADoce/
  atualizacoes/
    AAAAMMDD-HHMMSS-identificador/
      backup/                  entradas e dados anteriores
      envio/
        atualizacao-planilha.json
        relatorio-atualizacao.txt
        ranking_periodicos.csv
        outros arquivos de auditoria
      execucao.json            situação da execução
      execucao.log             mensagens e eventuais erros
    ultima-execucao-concluida.json
```

O histórico é local e fica fora da edição distribuída no Git. Pode conter dados pessoais dos relatórios originais: mantenha as permissões da pasta institucional e não publique esse diretório. Nada é apagado automaticamente.

### 3. Importar na mesma planilha Google

Abra a planilha e escolha **SIADoce → Importar atualização**. Se o menu ainda não existir, faça a instalação abaixo.

Selecione o **`atualizacao-planilha.json`** da pasta `envio` criada agora. Confira a prévia e confirme a importação. Aguarde a mensagem de conclusão.

Como alternativa ao seletor de arquivos, abra **Colar conteúdo do arquivo**, cole o conteúdo completo do JSON e clique em **Usar conteúdo colado**. A conferência e a importação são as mesmas.

São atualizadas as abas:

| Aba | Conteúdo |
|---|---|
| Periódicos dos docentes | Revistas em ordem decrescente de publicações únicas, anos e contagens por docente. |
| Pendências | Registros cuja classificação exige revisão, com seus motivos. |
| Eventos | Evidências e regras documentadas do catálogo de eventos. |
| Eventos — trabalhos | Trabalhos com verificação individual documentada. |

Também são atualizadas sete linhas identificadas da metodologia em **Critérios e fontes**. As abas de métricas **Consulta, Periódicos, JCR — resumo e JCR por categoria** são preservadas. As quatro abas geradas são substituídas integralmente: faça correções na fonte apropriada, não diretamente nessas saídas.

A planilha cria cópias ocultas das abas afetadas antes de escrever. O menu de restauração permite desfazer a última importação. Importar novamente exatamente o mesmo pacote é detectado; as cópias de segurança anteriores não são apagadas.

## Instalar ou atualizar o menu

1. Na própria planilha Google, abra **Extensões → Apps Script**.
2. Substitua o código de exemplo, ou a instalação anterior do SIADoce, pelo conteúdo completo de **`scripts/google-planilhas/InstalacaoUnica.gs`** e salve. Se houver outras automações no projeto, preserve-as e siga o [guia da integração](../scripts/google-planilhas/README.md), especialmente para combinar funções `onOpen`.
3. Recarregue a planilha. Aparecerá o menu **SIADoce**.
4. Na primeira utilização, o Google poderá pedir que sua conta autorize o script vinculado à planilha. Leia a solicitação no próprio Google. O código limita seu acesso ao documento atual; não exige implantação como aplicativo web nem uma chave de API.

O arquivo inclui as janelas de importação e exportação. Não é necessário criar arquivos HTML separados nem outra planilha. Outras pessoas com acesso de edição à mesma planilha podem usar o menu, após a autorização que o Google pedir para a própria conta.

## O que é automático e o que ainda precisa de conferência

**Automático:** extração dos PDFs fornecidos, enquadramento com as evidências existentes, contagens por ano, agrupamento de revistas, deduplicação documentada de coautorias, relatório de pendências e preparação das quatro abas. Os anos e o quadro docente são lidos dos dados; não é necessário editar o script quando eles mudam.

**Não automático:** baixar currículos, percentis Scopus/JCR ou H5; conferir novas identidades de periódicos, modalidades de artigos e edições de eventos; interpretar uma mudança nas regras da CAPES. Publicações sem correspondência segura continuam nas pendências, sem receber uma faixa inventada.

O ranking conta cada publicação uma vez no total do periódico e mantém uma coluna separada de registros nos currículos. Uma publicação compartilhada por dois docentes pode aparecer duas vezes nos currículos e apenas uma vez no ranking. Identificações e anos reconciliados com fontes estão documentados em `data/controle/ranking-periodicos-revisoes.json`. Um conflito novo que impeça uma deduplicação segura interrompe a geração para revisão.

As referências atuais não equivalem à classificação final da CAPES nem, isoladamente, a uma decisão de recredenciamento. Ao mudar a metodologia de avaliação, revise o classificador e suas evidências antes de reutilizar as pontuações.

## Onde fazer cada correção

| Dados | Local de edição | Como incorporar |
|---|---|---|
| Métricas de periódicos | As cinco abas do catálogo na planilha Google | Exportar catálogo → `importar-catalogo-google.ps1` → build. |
| Currículos, orientadores, período e disciplinas | PDFs de entrada do SIADoce | `atualizar-planilha.ps1` → Importar atualização no Google. |
| Evidências de eventos e trabalhos | `data/controle/eventos-capes.json`, com fontes | `atualizar-planilha.ps1` → Importar atualização no Google. |

As abas **Eventos** e **Eventos — trabalhos** são saídas para consulta. Sua edição na planilha não muda a classificação local. A exportação das métricas de periódicos não altera essas evidências.

## Se algo der errado

- **Mensagem vermelha no computador:** não importe arquivos daquela execução. Abra `execucao.log`. O último pacote concluído e os backups anteriores continuam guardados. Um build interrompido pode deixar o site local parcialmente atualizado; corrija a causa e execute novamente.
- **Arquivo em uso por outro processo:** a gravação da configuração tenta novamente, por tempo limitado, quando encontra bloqueio temporário. Se a falha persistir, feche o arquivo nos editores, aguarde a sincronização do OneDrive e execute novamente. A rotina não força a liberação nem ignora a falha de gravação.
- **Fontes modificadas ou conflitantes:** não edite o JSON gerado para contornar a validação. Confira os PDFs, a planilha Google e os catálogos de evidências; exporte e importe novamente quando a correção envolver métricas.
- **Catálogo recusado:** confira a célula ou aba indicada. Corrija fórmulas, percentis, faixas ou identificadores na planilha Google e exporte novamente. Source IDs e ISSNs devem estar como texto, preservando zeros iniciais. Use `catalogo-periodicos-google.json` no comando de importação do catálogo.
- **CV ausente ou quantidade inesperada:** confira o nome e o conteúdo do PDF, o cadastro de orientadores e o intervalo do Janus.
- **Identidade, numeração ou ano do Lattes não reconhecido:** confira o PDF indicado na mensagem e exporte novamente o currículo completo com texto selecionável. O script interrompe a atualização para evitar atribuir artigos à pessoa errada ou descartar referências.
- **Google rejeitou o arquivo:** use `atualizacao-planilha.json`, não o CSV, relatório ou manifesto da execução. Não altere o conteúdo manualmente. Se o erro ocorrer durante a escrita, confira a mensagem de recuperação e use o menu de restauração, conforme o [guia do importador](../scripts/google-planilhas/README.md).
- **Execução de scripts bloqueada pelo Windows:** peça ao suporte que autorize o script conforme a política da instituição. Não é necessário desativar globalmente a política de segurança.

## Preparar outro computador

Em um novo computador, obtenha o repositório do SIA e importe as entradas institucionais conforme o [guia de manutenção](../README.md). Para recalcular todos os indicadores, instale PowerShell 7, Python 3.10 ou superior com PyYAML, `pdftotext` e Edge ou Chrome para o relatório em PDF.

Para indicar um executável específico, sem alterar configurações globais:

```powershell
.\atualizar-planilha.ps1 -PythonPath "C:\caminho\python.exe"
```

Para execução por terminal sem abrir a pasta ao final:

```powershell
.\atualizar-planilha.ps1 -NaoAbrirPasta
```

Os testes ficam em `scripts/test_ranking_periodicos.py`, `scripts/test_atualizacao_planilha.py`, `scripts/test-atualizar-planilha.ps1` e `scripts/google-planilhas/`. Não execute testes que leem os dados reais durante um build: as fontes ficam em transição até a geração terminar. A rotina não configura uma tarefa agendada: execute-a quando os arquivos de entrada tiverem sido atualizados.
