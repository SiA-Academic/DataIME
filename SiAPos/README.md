# SiAPos

Painel de indicadores agregados de docentes, graduação e pós-graduação do IME-USP.

## Uso

O menu esquerdo mantém Geral, Graduação e Pós-graduação sempre disponíveis. Geral reúne o item Docentes; graduação e pós mantêm suas visões próprias. Cada item abre sua visão diretamente, sem um seletor prévio de área.

Abra `index.html` no endereço publicado ou localmente. Mantenha `app.js`, `model.js`, `styles.css`, `data.js`, `grad.js`, `grad.css`, `graduacao-data.js`, `docentes.js`, `docentes.css` e `docentes-data.js` na mesma pasta. Os arquivos usam referências relativas, sem CDN ou consultas externas durante a navegação.

A pós-graduação abre em Titulações e matrículas. Selecione programas e anos para comparar as séries. As visões principais usam os programas configurados e os mesmos critérios de cobertura para cada indicador e período. A base principal admite fontes públicas e consultas do Janus independentes da coleção original de CC/MAT. O item 3 do menu, destacado em outra cor, reúne os dados de acesso específico, com filtros e exportações próprios. Fontes e critérios fica no item 4, em cinza discreto. Valores e marcadores abrem os detalhes da fonte. Os filtros da graduação e da pós usam barras compactas fixas durante a rolagem, com as seleções e o período na primeira linha e as opções da visão na segunda, quando existem. Borda e sombra destacam a barra quando ela chega ao topo. As tabelas das visões principais ficam reunidas em um botão de download CSV por seção, respeitando os filtros. Os arquivos incluem valores, médias e suas coberturas, além das fontes; Cobertura e Fontes também exportam seus quadros detalhados. Os gráficos podem ser baixados em SVG. As tabelas de comprovação permanecem nos detalhes de origem abertos pelos valores dos gráficos.

## Docentes

O item Geral → Docentes (`#docentes`) apresenta uma posição de 10/11/2026 do quadro docente por departamento e do credenciamento vigente no Janus nos cinco programas do IME. Seniores ficam excluídos de todas as contagens desta visão. O critério de participação na pós é o credenciamento vigente; não exige orientação em andamento ou disciplina ministrada. Inclui os tipos Pleno, Específico, Coorientador e Acadêmico vigentes; exclui vínculos futuros, encerrados e do tipo Vencido com Orientando.

As contagens distinguem o total do departamento, pessoas credenciadas nos programas associados, nos demais programas do IME, em algum dos cinco programas e sem credenciamento nesse conjunto. Os programas associados são Ciência da Computação para MAC, Matemática e Mestrado Profissional em Ensino de Matemática para MAT, Matemática Aplicada para MAP e Probabilidade e Estatística para MAE. O vínculo é uma regra explícita da comparação; programas de pós-graduação não equivalem a departamentos. A matriz por programa conserva cada vínculo observado. Programas de outras unidades e interunidades, como Bioinformática, ficam fora desta versão.

As colunas de programas associados e de outros programas podem conter as mesmas pessoas. Credenciamentos em mais de um nível, área ou programa não multiplicam a contagem de pessoas em cada grupo. Os totais de pessoas são calculados na preparação dos dados; a interface não soma as colunas da matriz para reconstruí-los. A ausência de credenciamento só se refere aos programas com cobertura comprovada; nenhuma lacuna de consulta é tratada como zero.

O primeiro gráfico mostra, para cada programa associado, o percentual do quadro do departamento credenciado nele, incluindo quem atua em outras pós. No MAT, a linha “Total · Matemática ou MPEM” conta cada docente uma vez, mesmo com credenciamento nos dois programas. O CSV reúne as contagens, os denominadores e os percentuais.

Na distribuição do credenciamento, cada barra representa 100% do quadro de um departamento. Os quatro percentuais indicam credenciamento só na pós associada, na associada e em outras, só em outras ou em nenhum dos cinco programas. Os percentuais aparecem na barra ou, nos segmentos estreitos e nas categorias com 0%, logo abaixo. Ao abrir a linha, aparecem também as contagens.

Cada contagem abre seus critérios, fontes, data de consulta e cobertura. `ND` identifica contagem não determinada; `NA`, recorte não aplicável; zero exige comprovação. O filtro de departamentos e o CSV desta visão são independentes dos filtros de graduação e pós. O CSV inclui as contagens, a matriz por programa e as referências da seleção, conservando o código do programa e sua unidade para distinguir programas homônimos. A unidade informada nos dados também aparece nos cabeçalhos e detalhes de origem. O arquivo público `docentes-data.js` contém somente agregados, sem nomes ou identificadores de docentes.

## Pós-graduação: cobertura e leitura

- Titulações e matrículas reúne Titulações, Matrículas regulares e Alunos especiais na mesma página, com Total, Mestrado e Doutorado apresentados em blocos quando disponíveis. A opção Contagem/% do total se aplica a todos os blocos. Disciplinas apresenta juntos os indicadores de oferta, participação, créditos, carga curricular e tamanho de turma. Os atalhos da barra fixa apenas navegam entre os blocos; o download único de cada visão inclui todos eles com os filtros aplicados.
- Titulações e matrículas anuais: fontes públicas, 2012–2025 nos cinco programas atualmente configurados.
- Oferta e participação em disciplinas, créditos, carga curricular, tamanho das turmas: 2012–2025, com fontes independentes e as situações NA documentadas. A coleção original de CC/MAT não define quais turmas entram na base principal.
- Dados de acesso específico: 168 valores anuais dos seis indicadores mantidos dos relatórios originais de CC/MAT em 2012–2025, isolados de todos os cálculos principais. O destaque identifica a permissão necessária para obter as fontes; não representa uma proteção de acesso aos agregados exibidos no site.
- Novos programas: nomes, áreas, níveis e período são definidos na configuração dos insumos. A coleção específica é opcional e não precisa existir para gerar o sistema principal.

Titulações são diplomas concedidos. Matrículas regulares anuais e matrículas em disciplinas são universos diferentes. Matrículas em disciplinas representam vínculos estudante–turma, não pessoas distintas. Nas titulações, o doutorado reúne DO e DD quando indicado; a série de matrículas regulares segue a classificação da fonte.

`ND` significa informação não disponível ou não determinada; `NA`, indicador não aplicável; zero significa zero documentado. A aplicabilidade vem dos níveis e das regras configurados para cada programa; zeros publicados são preservados. Aproximações conservam o sinal `≈`. Anos ausentes não entram como zero nas médias. As médias principais usam cobertura comum entre os programas aplicáveis. Os arquivos de perfil específico mantêm seus próprios períodos e não alteram essa cobertura.

A carga curricular total é o campo histórico da oferta, incluindo estudos; não mede horas efetivamente ministradas por docente. A classificação de ofertas pela área atual da ficha adota a hipótese de manutenção do vínculo histórico, quando indicada na origem. O prefixo do código de disciplina não define o programa.

As faixas de tamanho são: menos de cinco; de cinco a trinta, incluindo os dois limites; e mais de trinta. A faixa intermediária é o total menos as duas faixas externas, somente com contagens completas e conciliadas. As três faixas somam o total de turmas. Contagens individuais não são reconstruídas a partir de desvios padrão arredondados. Ofertas encontradas no catálogo e ausentes do relatório anual não são convertidas em matrículas zero nem incorporadas automaticamente à atividade observada.

## Graduação

A graduação usa cinco grupos em todas as análises: BCC, BM, **BMAC + BMA**, BE e LM. BMAC e BMA têm um único filtro, série, legenda e linha de exportação por indicador e período. As contagens são somadas no mesmo ano e semestre, com as fontes dos dois componentes disponíveis nos detalhes e no CSV. Se faltar um componente, o total fica ND; as médias usam somente os anos com o total completo. As referências curriculares dos dois cursos ficam sob o mesmo grupo, preservando as variantes e suas cargas individuais.

A área de graduação abre em Titulações e matrículas e tem quatro itens no menu: Titulações e matrículas, Disciplinas, Estatísticas do Anuário e Fontes e critérios. Cobertura e lacunas fica dentro de Fontes e critérios, com seu conteúdo e seus dados incluídos no download único da página. Dados complementares e Currículos foram retirados do menu; seus recortes anteriores continuam preservados. As explicações metodológicas ficam em Fontes e critérios e nos detalhes de origem; as telas de dados mantêm as indicações de cobertura e de valores indisponíveis.

Todos os dados de graduação usam exclusivamente fontes oficiais públicas ou consultas autenticadas comprovadas do Júpiter. Isso inclui os recortes, cálculos derivados, comparações e exportações. Resultados de arquivos enviados anteriormente ou recuperados do Drive não integram o painel quando sua obtenção não satisfaz esse critério.

- Titulações e matrículas: Alunos matriculados, Concluintes, Vagas oferecidas e Ingressantes aparecem juntos. Matriculados apresenta sempre o primeiro e o segundo semestre, separadamente. Uma barra compacta fixa durante a rolagem reúne cursos, período e atalhos para os quatro blocos. As tabelas ficam disponíveis em um único CSV ao final da página, com os quatro indicadores e os filtros de cursos e anos aplicados. Os indicadores de não matriculados/trancamentos e total cadastrado permanecem no acervo de origem, sem opção de exibição. Nomes de fontes aparecem nas referências, não nos rótulos dos indicadores.
- Vagas oferecidas: total anual de ingresso regular, reunindo as vias de seleção documentadas. Em 2016, a tabela do Anuário coincide com as 317 vagas Fuvest do IME e omite as 23 vagas SiSU. A série foi conciliada para 340: BCC 50, BM 30, BMAC + BMA 70, BE 40 e LM 150. O valor anterior e a soma por via ficam nos detalhes de origem, nas referências copiadas e nos CSVs. O aumento de 340 para 350 em 2017 decorre das dez vagas adicionais do BCC. Vagas remanescentes, transferências e vagas adicionais de processos olímpicos não integram este indicador.
- Ingressantes de 2012–2024. BCC, BM, BE e LM têm 52 contagens anuais do Inep, campo `QT_ING`, nos códigos 2883, 2903, 2889 e 2921. A consulta anual seleciona a USP (instituição 55), o município de São Paulo e a modalidade presencial. O código 2921 reúne os turnos da licenciatura em Matemática. BMAC + BMA usa as áreas básicas dos dois cursos (2901 e 63898) e Métodos Matemáticos do IME (118462 e 63911), exceto em 2021. Em 2012 o valor é estimado em 75 (faixa de 71 a 75), e em 2013 em 66 (61 a 66). **Em 2021, o gráfico usa 86 ingressos do Júpiter**, 28 do BMA e 58 do BMAC, correspondentes a 63 pela Fuvest, 7 pelo SiSU e 16 por transferência da USP. A origem de cada valor apresenta a fonte e o recorte utilizado. Os cinco grupos têm ingresso `ND` em 2025. [Parecer CEE 280/2024, p. 7](https://www.ceesp.sp.gov.br/wp-content/uploads/2024/11/2022-00547-par-280-24.pdf#page=7) e [Parecer CEE 77/2026, p. 7](https://www.ceesp.sp.gov.br/wp-content/uploads/2024/11/2021-00058-par-77-26-retificado-pelo-par-149-26.pdf#page=7).
- Cadastro comum do Júpiter: MAC, MAT, MAP e MAE em 2012–2025, com 7.158 turmas no conjunto dos cinco prefixos. O código 450 tem nove turmas observadas em 2017–2025, no segundo semestre. Matrículas por categoria, vagas, turmas, disciplinas e cargas cadastradas usam o mesmo relatório e método. As situações são conservadas literalmente. Anos e semestres ausentes permanecem ND.
- Os seletores do Júpiter exibem somente indicadores com algum valor documentado no conjunto correspondente. Indicadores sem nenhum dado ficam fora do menu; lacunas de anos específicos e valores zero documentados são preservados.
- O cadastro não contém aprovações, reprovações, notas ou trancamentos. Seus indicadores e taxas permanecem ND. As cargas teórica/prática cadastradas são campos próprios, sem equivalência automática a créditos ou carga docente efetiva.
- Créditos-aula e carga nominal dessas turmas foram comprovados por fichas públicas da versão explícita em 127 de 186 recortes anuais/semestrais; os outros 59 conservam ND, sem soma parcial como total. Esses 254 campos têm origem mista: cadastro autenticado e fichas públicas. A comparação dos quatro departamentos usa apenas os 17 recortes completos para todos, com 136 valores. Outros 82 valores comprovados dos departamentos ficam em Dados complementares; o prefixo 450 é interdepartamental e separado da interseção.
- Dados complementares contêm somente os créditos/cargas comprovados fora da interseção comum e o prefixo interdepartamental 450. Os resultados dos arquivos MAC/MAT anteriores, os recortes por ministrantes e seus cálculos derivados foram excluídos; as versões anteriores ficam no arquivo histórico de manutenção.
- Estatísticas do Anuário, 2012–2025: disciplinas, turmas e dimensões médias por departamento, conforme a tabela 3.02. O código interdepartamental 450 tem cobertura a partir de 2017.
- Referências curriculares de 2024 e 2025: 36 variantes de curso, habilitação ou turno. Essas alternativas não são somadas; os subtotais impressos e as ressalvas das fontes são preservados.

Estoques do primeiro e do segundo semestre permanecem separados. Vagas não equivalem a ingressantes. Os prefixos de disciplinas não identificam o curso de cada aluno nem certificam a lotação dos ministrantes.

As lacunas de ingresso, créditos e resultados departamentais aparecem como `ND`. Em 2012 e 2013, a faixa do Inep reflete a possível sobreposição entre a área básica e a habilitação em Métodos Matemáticos. O gráfico mostra o limite superior, e os detalhes de origem informam os limites por curso. Em 2021, o valor vem das formas de ingresso discriminadas pelo Júpiter nos dois cursos. A soma entre BMA e BMAC é feita por curso. Matrículas, vagas e concluintes mantêm o recorte do Anuário.

As versões históricas das fichas confirmam créditos válidos no período da oferta obtida no cadastro autenticado. Não se aplicou indiscriminadamente a ficha atual aos anos anteriores. A carga nominal corresponde a 15 horas-aula por crédito-aula e por turma; não representa a carga efetivamente ministrada por professor. Resultados, notas e trancamentos departamentais não foram recuperados no relatório acessível e não são preenchidos por arquivos anteriores.

As estatísticas por departamento seguem o recorte da tabela 3.02. Dimensões médias arredondadas não permitem reconstruir matrículas exatas; disciplinas nos dois semestres não são códigos únicos no ano. Cada gráfico, tabela e exportação mantém o escopo e o semestre correspondentes.

Divergências dos catálogos públicos permanecem sinalizadas: cinco inconsistências em campos e subtotais curriculares. Não se completam campos ausentes por extrapolação de outra edição.

## Fontes e recorte público

As referências de cada valor preservam o arquivo e a localização de origem: aba/célula de planilha ou localizador de relatório HTML. Hashes e notas registram a procedência quando disponíveis. O painel também documenta as ressalvas das fontes históricas.

`data.js`, `graduacao-data.js` e `docentes-data.js` são recortes agregados para consulta pública. Não contêm nomes ou identificadores de alunos e docentes, credenciais, cookies, estado de sessão ou caminhos locais privados. Os documentos autenticados e as fontes de trabalho não são distribuídos neste repositório; uma referência de origem não implica que o arquivo correspondente esteja disponível publicamente para download. Na graduação, a visão de fontes distingue fontes públicas, consultas autenticadas comprovadas e origens mistas entre essas duas categorias.

Na graduação, a coleta comum de 09/11/2026 usou dez CSV do Júpiter autenticado, no Relatório de Disciplinas e Turmas. As leituras anônimas dessa rota redirecionaram ao login. O acesso verificado não permitiu obter os resultados históricos por departamento. O PDF MAT preexistente, embora identifique o Júpiter, não documenta a obtenção original e foi excluído junto com os CSV MAC e seus derivados. Vagas e concluintes usam exclusivamente as fontes oficiais públicas. O histórico de proveniência da manutenção distingue envio pelo usuário de cópia encontrada no Drive.

## Atualização

1. Priorizar fontes oficiais públicas fora deste repositório, preservando URL, data, localizador e hash. Os coletores públicos não recorrem a sessões autenticadas quando um dado falta; registram a lacuna para revisão.
2. Conferir programas, períodos, versões, multiplicidades e universos; registrar lacunas e hipóteses sem preencher ausências com zero.
3. Gerar uma nova base agregada, revisar cálculos e referências e retirar metadados privados.
4. Substituir `data.js`, `graduacao-data.js` ou `docentes-data.js` pela versão revisada. Alterações na interface devem manter os arquivos de dados, apresentação e interação compatíveis.
5. Verificar cálculos, filtros, exportações, referências e apresentação antes de publicar a atualização.

O ambiente de manutenção conserva as entradas canônicas admitidas e um construtor reproduzível, com auditorias dos valores, fontes, lacunas e exportações. As versões públicas das fichas são coletadas sem autenticação e cruzadas com as turmas autenticadas. Coletas completas, materiais excluídos, arquivos redundantes e estratégias anteriores ficam no arquivo histórico. A coleta não atualiza este painel automaticamente.
