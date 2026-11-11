# Manutenção do SIA-Doce

A interface em `SiADoce/` usa HTML, CSS e JavaScript. O portal distribui os totais do programa e as referências bibliográficas por docente para a análise das publicações. A instância institucional usa as mesmas páginas com o cadastro docente, as orientações, os currículos e os relatórios de conferência. As duas abrem diretamente em um navegador.

## Atualização neste checkout

Abra o PowerShell na pasta que contém este guia. Coloque os novos relatórios e currículos nas entradas indicadas abaixo.

```powershell
.\build-public.ps1 -AtualizarPortal
```

O comando lê os PDFs, recalcula os indicadores, gera a instância institucional em `../../SiADoce-institucional/` e atualiza os resumos e o analisador em `../../SiADoce/`. Confira os resultados antes de enviar as alterações ao Git. Para atualizar somente a instância institucional, execute `.\build-public.ps1`. Para repor apenas o HTML e os dados do navegador após alterar a interface, use `-UsarDadosPreparados`.

A análise geral começa com o mínimo de quatro artigos. A atualização grava os nomes, as referências, as classificações e os links bibliográficos em `../../SiADoce/dados/publicacoes.js`. O navegador usa esses dados para calcular o placar e mostrar as fichas por docente. O arquivo local `../../SiADoce-institucional/dados/analise-publicacoes.json` acrescenta os filtros de credenciamento e os critérios de orientação em **Mais critérios**.

Para gerar a instância em outro diretório de acesso institucional, informe uma pasta dedicada à instalação.

```powershell
.\build-public.ps1 -Saida 'D:\ConsultaInstitucional\SIA-Doce'
```

A página inicial dessa instalação fica em `index.html`. O CSS e os documentos acompanham a cópia.

## Preparar outro computador

Para abrir um site já gerado basta o navegador. Para recalcular a base use PowerShell 7, Python 3.10 ou superior, PyYAML para ler as configurações, `pdftotext` para a extração dos relatórios e Edge ou Chrome para imprimir o relatório de alertas. O analisador Lattes distribuído em ZIP usa a biblioteca padrão do Python.

```powershell
python -m pip install PyYAML
.\importar-entradas.ps1 -Origem 'D:\AcervoInstitucional\SiADoce'
.\build-public.ps1 -AtualizarPortal
```

A importação inicial lê o acervo na estrutura abaixo. Ela preserva as correspondências já estabelecidas entre docentes e currículos, as exclusões de cadastro e as conferências editoriais. Depois dessa primeira cópia, as atualizações usam os arquivos presentes nesta pasta de manutenção.

| Entrada de trabalho | Uso |
| --- | --- |
| `static/janus.pdf` | Estatísticas por orientador, com todos os estados e o período selecionado. A importação reconcilia as listas de alunos com os totais de cada orientador. |
| `static/orientadores.pdf` e `static/disciplinas.pdf` | Credenciamentos e turmas oferecidas. |
| `static/CVS_LATTES/` | Currículos completos em PDF. Substitua arquivos antigos sem manter duas versões do mesmo currículo na pasta. |
| `content/controle/lattes-docentes.csv` e `content/controle/docentes.md` | Associação inicial entre o cadastro local, as identificações anteriores e o Lattes. |
| `static/configuracoes.md`, `static/configuracoes_padrao.md` e `static/areas.md` | Limiares dos alertas, áreas e vinculações docentes. |
| `data/controle/docentes-excluidos.json` | Exclusões explícitas aplicadas a cada nova extração. |
| `data/controle/grupos-analise.json` | Exceções de agrupamento da apresentação por docente e categoria. O cadastro preserva a categoria do Janus. |
| `data/controle/complementos-quadrienio.json` e `ranking-periodicos-revisoes.json` | Conferências individuais e revisões documentadas das publicações. |
| `data/controle/catalogo-periodicos-google.json` | Exportação validada da planilha de métricas. |
| `static/NORMAS/` e `static/DIRETRIZES/` | Documentos que acompanham a consulta institucional. |
| `static/modelos-maycon/` | Protótipos do painel preservados no acervo de referência local. |

O cadastro institucional, PDFs de origem, listas de alunos e orientadores do Janus, relatórios individuais do programa e históricos de execução permanecem no acervo local. O `.gitignore` diferencia essas entradas dos programas e dos catálogos que já acompanham a distribuição do analisador. Mantenha o acervo institucional na rotina de backup do programa.

## Critérios e ferramentas

O grupo de acompanhamento compreende docentes plenos, específicos e vencidos com orientando. A modalidade e a data de situação do Janus prevalecem nas titulações. Os resultados de produção conservam a distinção entre ausência de registros, cobertura desconhecida e classificação pendente.

- [Critérios de produção, eventos e titulações](docs/CRITERIOS.md)
- [Atualizar publicações e a planilha Google](docs/ATUALIZAR_PLANILHA.md)
- [Analisar um currículo avulso](docs/ANALISAR_LATTES_AVULSO.md)
- [Manter a integração com o Google Planilhas](scripts/google-planilhas/README.md)

Após gerar os dados, os testes abaixo conferem classificações, contagens de alunos distintos, resultados dos cenários de produção e comparação da análise avulsa com o cadastro do programa.

```powershell
python -m unittest discover -s scripts -p 'test_*.py'
.\scripts\test-titulados.ps1
.\scripts\test-indicadores-mensais.ps1
node scripts/test-simular-criterios.cjs
node scripts/test-analise-publica.cjs
node scripts/test-producao-avulsa.cjs
```
