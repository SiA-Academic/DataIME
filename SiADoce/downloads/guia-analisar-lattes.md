# Analisar o Lattes de outro docente

Use este procedimento para consultar a produção de **qualquer docente**, mesmo que ele não esteja cadastrado no SiADoce. O resultado aparece no bloco **Analisar outro currículo**, no fim de **Produção docente**, no mesmo formato da tabela dos docentes do programa.

O site permanece inteiramente estático: o PDF é processado no computador pelo script, e o JSON resultante é aberto apenas no navegador, sem envio ao servidor. O procedimento não cadastra o docente, não modifica os totais oficiais e não envia a análise à planilha Google.

## Fazer a análise

No SiADoce, vá a **Produção docente → Analisar outro currículo → Baixar scripts e catálogo (ZIP)**. Extraia o pacote e abra a pasta **Analisador-Lattes**. No primeiro uso em outro computador, faça a [instalação inicial](#instalação-inicial).

1. Salve o **PDF completo do Lattes em português, com texto selecionável**, junto de `analisar-lattes.ps1` e `analisar-lattes.sh`. Confira a data de atualização informada dentro dele. PDFs escaneados não são suportados.
2. Abra o terminal nessa pasta e use o comando do seu sistema, trocando `walner.pdf` pelo nome do arquivo e ajustando os anos. Aguarde a conclusão.

   **Windows — PowerShell:**

   ```powershell
   .\analisar-lattes.ps1 walner.pdf -Inicio 2022 -Fim 2026
   ```

   **Mac ou Linux — Terminal:**

   ```bash
   bash analisar-lattes.sh walner.pdf -Inicio 2022 -Fim 2026
   ```

   Não é necessário executar `chmod`. O `.sh` chama o mesmo analisador usado no Windows.

3. Confira `relatorio-analise.txt` na pasta de resultados indicada no terminal. O script também tenta abrir essa pasta.
4. Abra o SiADoce em **Produção docente → Analisar outro currículo**. No campo **Abrir resultado da análise**, escolha **`analise-lattes.json`** dessa pasta.

A tabela identifica o docente e a data do CV e mostra uma linha por ano, com **Registros no CV**, **A1–A8**, **pontos**, **pendências** e **eventos**. A linha **Total** reúne o período analisado. As referências dos artigos e os detalhes técnicos continuam no JSON; não aparecem como lista na página.

Todos os anos do arquivo aparecem juntos, sem abrir detalhes ao clicar. Para incluir outros anos, reexecute o script com o intervalo desejado.

O botão **Limpar análise** remove essa tabela. Recarregar ou fechar a página também descarta a análise da tela; os arquivos de resultado continuam na pasta local. A tabela dos docentes do programa permanece inalterada.

O intervalo inclui os dois anos indicados e se aplica aos anos de publicação informados pelo currículo. Se omitir `-Inicio` e `-Fim`, serão usados os anos da produção atual do SiADoce. Quando o pacote não inclui esse arquivo de referência, o padrão é o ano corrente e os quatro anteriores.

## Nomes de arquivo e opções

Para nomes com espaços, use aspas:

```bash
bash analisar-lattes.sh "curriculo do docente.pdf" -Inicio 2022 -Fim 2026
```

Um nome ou caminho relativo do PDF é sempre procurado na pasta do script. Se o PDF estiver em outro local, informe o caminho completo, por exemplo `/home/docente/curriculos/walner.pdf` no Linux ou `C:\curriculos\walner.pdf` no Windows. Para os exemplos desta seção no Windows, substitua `bash analisar-lattes.sh` por `.\analisar-lattes.ps1`.

Os parâmetros antigos `-ArquivoPDF`, `-AnoInicio` e `-AnoFim` continuam funcionando.

Se o nome não for reconhecido automaticamente, confirme a identidade pelo ID Lattes do PDF e informe-o explicitamente:

```bash
bash analisar-lattes.sh walner.pdf -Nome "Nome do docente"
```

Essa opção não substitui um nome divergente já identificado no PDF.

Para não abrir a pasta no final, acrescente `-NaoAbrirPasta`; use essa opção em terminais sem interface gráfica. Para escolher um Python instalado, acrescente `-PythonPath "/caminho/python3"` (ou `-PythonPath "C:\caminho\python.exe"` no Windows).

## Onde ficam os resultados

Cada execução usa uma pasta diferente:

```text
SiADoce/
  analises-avulsas/
    AAAAMMDD-HHMMSS-identificador/
      analise-lattes.json
      relatorio-analise.txt
      extracao-lattes.json
      execucao.log
```

**`analise-lattes.json` é o arquivo que deve ser aberto na página.** Não selecione o PDF, o relatório textual, `extracao-lattes.json` ou o pacote de atualização da planilha.

A pasta `analises-avulsas` fica fora de `static` e `public`; seu conteúdo não faz parte do site gerado. Ela pode conter referências bibliográficas e dados pessoais extraídos do currículo. Preserve os arquivos no local institucional apropriado.

## Como interpretar

- Os artigos passam pelos mesmos classificadores de periódicos e eventos usados no SiADoce, com o catálogo e as evidências locais disponíveis.
- A análise não busca percentis, H5 ou informações novas na internet. Atualizar publicações não atualiza automaticamente as métricas.
- Sem correspondência segura, percentil ou evidência suficiente, a publicação permanece pendente. Uma faixa candidata de evento não recebe pontos.
- A1–A8 contam os artigos classificados. A soma de referência usa A1 = 1; A2 = 0,875; A3 = 0,750; A4 = 0,625. A5–A8 ficam fora dessa soma.
- Um ano sem registros não comprova ausência de produção. Se a data ou a cobertura do currículo for desconhecida, a página informa a limitação e não inventa pontuação zero.

O resultado é uma referência bibliográfica para análise, não uma classificação final da CAPES nem uma decisão automática de credenciamento. Para integrar novas evidências ao catálogo oficial, é necessário documentá-las nas fontes do sistema e executar a atualização regular.

## Se não funcionar

- **PDF recusado ou sem texto legível:** exporte novamente o currículo completo em português pelo Lattes, com texto selecionável. Arquivos escaneados e cabeçalhos em outros idiomas não são suportados pelo extrator atual.
- **Poucos artigos ou nenhum artigo:** confira o intervalo solicitado, a data do CV, as seções de produção no PDF e as observações do relatório. Não interprete automaticamente o resultado como produção zero.
- **Arquivo recusado pela página:** use `analise-lattes.json` de uma execução concluída. A página valida o formato, as faixas, as somas e a composição dos contadores. Não edite o resultado para contornar uma inconsistência; execute novamente e confira `execucao.log`.
- **Numeração ou ano bibliográfico não reconhecido:** confira a referência indicada e gere novamente o PDF completo. O script interrompe a análise para não perder nem mesclar artigos silenciosamente.
- **Script bloqueado pelo Windows:** peça ao suporte para autorizar o procedimento conforme a política institucional.
- **`pwsh` ou `pdftotext` não encontrado:** conclua a instalação abaixo e abra novamente o terminal. Os comandos precisam estar disponíveis no `PATH`.
- **Python não encontrado ou antigo:** instale Python 3.10 ou superior, ou indique um executável compatível com `-PythonPath`.
- **Catálogo ausente ou inconsistente:** peça uma versão atualizada do pacote. O catálogo é gerado a partir da planilha Google; não corrija o JSON manualmente.

## Instalação inicial

Faça uma vez em cada computador. São necessários **Python 3.10 ou superior**, **PowerShell 7 (`pwsh`)** e **Poppler (`pdftotext`)**. O Python usa apenas sua biblioteca padrão: não é necessário instalar pacotes com `pip` nem criar um ambiente virtual. O processamento continua local e o site permanece estático.

### Mac

Com o [Homebrew](https://brew.sh/) instalado, execute no Terminal:

```bash
brew install python3 poppler powershell
```

Consulte as instruções de [Poppler](https://formulae.brew.sh/formula/poppler) e [PowerShell via Homebrew](https://learn.microsoft.com/en-us/powershell/scripting/install/alternate-install-methods#install-on-macos-using-homebrew). Se preferir, o PowerShell também pode ser instalado pelo [pacote oficial da Microsoft para Mac](https://learn.microsoft.com/en-us/powershell/scripting/install/install-powershell-on-macos); escolha a arquitetura do computador.

### Linux

No Ubuntu ou Debian, instale Python e Poppler:

```bash
sudo apt-get update
sudo apt-get install python3 poppler-utils
```

Instale também o PowerShell 7 seguindo a página oficial correspondente: [Ubuntu](https://learn.microsoft.com/en-us/powershell/scripting/install/install-ubuntu), [Debian](https://learn.microsoft.com/en-us/powershell/scripting/install/install-debian) ou [outra distribuição](https://learn.microsoft.com/en-us/powershell/scripting/install/linux-overview). Em outras distribuições, use os pacotes equivalentes de Python e Poppler. O pacote `poppler-utils` fornece o [comando `pdftotext`](https://packages.debian.org/stable/poppler-utils).

### Windows

Mantenha Python 3.10 ou superior, PowerShell 7 e `pdftotext` instalados e disponíveis no `PATH`. Abra um novo terminal depois da instalação. Se o Python estiver fora do `PATH`, informe seu caminho com `-PythonPath`.

## Arquivos para compartilhar

O pacote `distribuicao/analisador-lattes.zip` reúne o analisador para Windows, Mac e Linux, o catálogo e este guia. O build também o inclui em `public/downloads/analisador-lattes.zip`, junto de `guia-analisar-lattes.md`, para download no site. Extraia-o antes de usar. As dependências da instalação inicial precisam ser instaladas no computador de cada docente.

**O `.sh` ou `.ps1` isolado não basta.** Envie os seguintes arquivos, preservando a estrutura de pastas:

```text
SiADoce/
  analisar-lattes.sh
  analisar-lattes.ps1
  docs/
    ANALISAR_LATTES_AVULSO.md
  scripts/
    analisar-lattes-avulso.py
    extrair-lattes-avulso.ps1
    gerar-publicacoes-lattes.ps1
    gerar-producao-docente.py
    classificar_eventos.py
    validar_catalogo_periodicos.py
  data/controle/
    catalogo-periodicos-google.json
    periodicos-aliases.json
    publicacoes-verificadas.json
    eventos-capes.json
    producao-docente.json         opcional: define os anos padrão
```

O docente coloca seu PDF nessa pasta e segue os comandos do início deste guia. Não inclua os PDFs de outros docentes, resultados anteriores ou ambientes Python locais. Os critérios e as métricas serão os do pacote enviado. Informar `-Inicio` e `-Fim` dispensa o arquivo opcional de anos padrão.

Para preparar uma nova distribuição após corrigir métricas, faça as edições na planilha Google e use **SiADoce → Exportar catálogo para o SiADoce**. Importe o download antes de gerar o site e refazer o pacote:

```powershell
.\importar-catalogo-google.ps1 "C:\caminho\catalogo-periodicos-google.json"
.\build-public.ps1
```

A atualização recria o ZIP e o guia em `static/downloads`, usando os scripts e o catálogo atuais, e os inclui na instância institucional. Os mesmos dois arquivos podem ser renovados em `SiADoce/downloads/` para distribuição pelo portal. O catálogo validado fica em `data/controle/catalogo-periodicos-google.json` e acompanha o ZIP. O Google é o único local de edição das métricas; o JSON serve ao processamento. As evidências de eventos continuam em `data/controle/eventos-capes.json` e suas abas no Google são atualizadas pelo fluxo regular do SiADoce.
