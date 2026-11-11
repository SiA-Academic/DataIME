# SIA-Doce · Quadro e credenciamento

Abra [a consulta](index.html) ou retorne ao [SIA-Doce](../index.html).

O painel de quadro e credenciamento apresenta uma posição de 10/11/2026 do quadro docente por departamento e do credenciamento vigente no Janus nos cinco programas do IME. Seniores ficam excluídos de todas as contagens desta visão. O critério de participação na pós é o credenciamento vigente; não exige orientação em andamento ou disciplina ministrada. Inclui os tipos Pleno, Específico, Coorientador e Acadêmico vigentes; exclui vínculos futuros, encerrados e do tipo Vencido com Orientando.

As contagens distinguem o total do departamento, pessoas credenciadas nos programas associados, nos demais programas do IME, em algum dos cinco programas e sem credenciamento nesse conjunto. Os programas associados são Ciência da Computação para MAC, Matemática e Mestrado Profissional em Ensino de Matemática para MAT, Matemática Aplicada para MAP e Probabilidade e Estatística para MAE. O vínculo é uma regra explícita da comparação; programas de pós-graduação não equivalem a departamentos. A matriz por programa conserva cada vínculo observado. Programas de outras unidades e interunidades, como Bioinformática, ficam fora desta versão.

As colunas de programas associados e de outros programas podem conter as mesmas pessoas. Credenciamentos em mais de um nível, área ou programa não multiplicam a contagem de pessoas em cada grupo. Os totais de pessoas são calculados na preparação dos dados; a interface não soma as colunas da matriz para reconstruí-los. A ausência de credenciamento só se refere aos programas com cobertura comprovada; nenhuma lacuna de consulta é tratada como zero.

Os dois gráficos apresentam uma linha para cada um dos cinco programas associados. O primeiro mostra o percentual dos docentes do departamento com credenciamento naquele programa. Na tabela do quadro docente, a célula do MAT discrimina Matemática (58) e MPEM (11), ambas sobre 81 docentes. Uma pessoa credenciada nos dois programas entra em cada linha.

No segundo gráfico, cada barra reparte o quadro do departamento entre docentes credenciados naquele programa, docentes credenciados somente em outros dos cinco programas e docentes sem credenciamento nesse conjunto. Para o MAT, as três parcelas são 58, 9 e 14 em Matemática e 11, 56 e 14 no MPEM. Cada linha usa o quadro completo de 81 docentes como denominador. O CSV reúne 56 linhas de dados com os quatro departamentos selecionados. Nas cinco linhas de programa associado, inclui também as duas últimas parcelas e seus percentuais.

Cada contagem abre seus critérios, fontes, data de consulta e cobertura. `ND` identifica contagem não determinada; `NA`, recorte não aplicável; zero exige comprovação. O filtro de departamentos e o CSV desta visão são independentes dos filtros de graduação e pós. O CSV inclui as contagens, a matriz por programa e as referências da seleção, conservando o código do programa e sua unidade para distinguir programas homônimos. A unidade informada nos dados também aparece nos cabeçalhos e detalhes de origem. O arquivo público `docentes-data.js` contém somente agregados, sem nomes ou identificadores de docentes.


## Atualização

1. Priorizar fontes oficiais públicas fora deste repositório, preservando URL, data, localizador e hash. Os coletores públicos não recorrem a sessões autenticadas quando um dado falta; registram a lacuna para revisão.
2. Conferir programas, períodos, versões, multiplicidades e universos; registrar lacunas e hipóteses sem preencher ausências com zero.
3. Gerar uma nova base agregada, revisar cálculos e referências e retirar metadados privados.
4. Substituir `docentes-data.js` pela versão revisada. Alterações na interface devem manter os arquivos de dados, apresentação e interação compatíveis.
5. Verificar cálculos, filtros, exportações, referências e apresentação antes de publicar a atualização.
