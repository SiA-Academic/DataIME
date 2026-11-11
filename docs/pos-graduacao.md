# Pós-graduação · Dados do IME

O painel **Dados do IME** reúne as consultas de Graduação e Pós-graduação. [Abrir a consulta de pós-graduação](../index.html#series).

## Uso

A pós-graduação abre em Titulações e matrículas. Selecione programas e anos para comparar as séries. As visões principais usam os programas configurados e os mesmos critérios de cobertura para cada indicador e período. A base principal admite fontes públicas e consultas do Janus independentes da coleção original de CC/MAT. O item Dados de acesso específico, destacado em outra cor, reúne os dados de acesso específico, com filtros e exportações próprios. Fontes e critérios reúne as referências. Valores e marcadores abrem os detalhes da fonte. Os filtros usam barras compactas fixas durante a rolagem, com as seleções e o período na primeira linha e as opções da visão na segunda, quando existem. Borda e sombra destacam a barra quando ela chega ao topo. As tabelas das visões principais ficam reunidas em um botão de download CSV por seção, respeitando os filtros. Os arquivos incluem valores, médias e suas coberturas, além das fontes; Cobertura e Fontes também exportam seus quadros detalhados. Os gráficos podem ser baixados em SVG. As tabelas de comprovação permanecem nos detalhes de origem abertos pelos valores dos gráficos.

Em Disciplinas, o CSV inclui a média de matrículas por turma por ano e programa. Em Dados de acesso específico, a tabela dessa coleção permite abrir a origem de cada valor.

Nos gráficos de evolução, **Mediana móvel · 3 anos** começa desligada. Ao ativá-la, cada série ganha uma linha de traço contínuo com 40% de opacidade. A série original e seus pontos permanecem opacos. A mediana usa o valor central entre o ano anterior, o atual e o seguinte, dentro do período selecionado. A linha só aparece onde os três anos têm dados da mesma série e, nos gráficos semestrais, do mesmo semestre. O SVG exporta a visualização escolhida.

## Pós-graduação: cobertura e leitura

- Em Titulações e matrículas, cada linha compara mestrado e doutorado. A primeira mostra titulações e a segunda, matrículas regulares. O filtro permite alternar entre contagem e participação percentual. O CSV também inclui os totais e as matrículas de alunos especiais.
- Em Disciplinas, os gráficos aparecem aos pares após os filtros. Os três últimos mostram quantas turmas têm menos de 5 matrículas, de 5 a 30 ou mais de 30. O CSV fica ao fim da página. Em telas estreitas, os gráficos ficam em uma coluna.
- Titulações e matrículas anuais: fontes públicas, 2012–2025 nos cinco programas atualmente configurados.
- Oferta e participação em disciplinas, créditos, carga curricular, tamanho das turmas: 2012–2025, com fontes independentes e as situações NA documentadas. A coleção original de CC/MAT não define quais turmas entram na base principal.
- Dados de acesso específico: 168 valores anuais dos seis indicadores mantidos dos relatórios originais de CC/MAT em 2012–2025, isolados de todos os cálculos principais. O destaque identifica a permissão necessária para obter as fontes; não representa uma proteção de acesso aos agregados exibidos no site.
- Novos programas: nomes, áreas, níveis e período são definidos na configuração dos insumos. A coleção específica é opcional e não precisa existir para gerar o sistema principal.

Titulações são diplomas concedidos. Matrículas regulares anuais e matrículas em disciplinas são universos diferentes. Matrículas em disciplinas representam vínculos estudante–turma, não pessoas distintas. Nas titulações, o doutorado reúne DO e DD quando indicado; a série de matrículas regulares segue a classificação da fonte.

`ND` significa informação não disponível ou não determinada; `NA`, indicador não aplicável; zero significa zero documentado. A aplicabilidade vem dos níveis e das regras configurados para cada programa; zeros publicados são preservados. Aproximações conservam o sinal `≈`. Anos ausentes não entram como zero nas médias. As médias principais usam cobertura comum entre os programas aplicáveis. Os arquivos de perfil específico mantêm seus próprios períodos e não alteram essa cobertura.

A carga curricular total é o campo histórico da oferta, incluindo estudos; não mede horas efetivamente ministradas por docente. A classificação de ofertas pela área atual da ficha adota a hipótese de manutenção do vínculo histórico, quando indicada na origem. O prefixo do código de disciplina não define o programa.

As faixas de tamanho são: menos de cinco; de cinco a trinta, incluindo os dois limites; e mais de trinta. A faixa intermediária é o total menos as duas faixas externas, somente com contagens completas e conciliadas. As três faixas somam o total de turmas. Contagens individuais não são reconstruídas a partir de desvios padrão arredondados. Ofertas encontradas no catálogo e ausentes do relatório anual não são convertidas em matrículas zero nem incorporadas automaticamente à atividade observada.

## Fontes e recorte público

As referências de cada valor preservam o arquivo e a localização de origem: aba/célula de planilha ou localizador de relatório HTML. Hashes e notas registram a procedência quando disponíveis. O painel também documenta as ressalvas das fontes históricas.

O arquivo `dados/pos-graduacao.js` contém dados agregados para consulta pública. Não inclui nomes ou identificadores de alunos e docentes, credenciais, cookies, estado de sessão ou caminhos locais privados. Os documentos autenticados e as fontes de trabalho não são distribuídos neste repositório; uma referência de origem não implica que o arquivo correspondente esteja disponível publicamente para download.

## Atualização

1. Priorizar fontes oficiais públicas fora deste repositório, preservando URL, data, localizador e hash. Os coletores públicos não recorrem a sessões autenticadas quando um dado falta; registram a lacuna para revisão.
2. Conferir programas, períodos, versões, multiplicidades e universos; registrar lacunas e hipóteses sem preencher ausências com zero.
3. Gerar uma nova base agregada, revisar cálculos e referências e retirar metadados privados.
4. Substituir `dados/pos-graduacao.js` pela versão revisada. Alterações na interface devem manter os arquivos de dados, apresentação e interação compatíveis.
5. Verificar cálculos, filtros, exportações, referências e apresentação antes de publicar a atualização.
