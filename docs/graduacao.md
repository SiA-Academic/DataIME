# Graduação · Dados do IME

O painel **Dados do IME** reúne as consultas de Graduação e Pós-graduação. [Abrir a consulta de graduação](../index.html#graduation/series).

## Uso

Selecione cursos, departamentos e anos para comparar os indicadores. Os gráficos mostram a evolução anual ou semestral e permitem consultar a origem de cada ponto ou baixar a imagem em SVG. Indicadores como matrículas por turma e dimensão média das turmas aparecem em tabelas. O CSV da consulta inclui os valores observados e as médias do período selecionado.

Nos gráficos de evolução, **Mediana móvel · 3 anos** começa desligada. Ao ativá-la, cada série ganha uma linha de traço contínuo com 40% de opacidade. A série original e seus pontos permanecem opacos. A mediana usa o valor central entre o ano anterior, o atual e o seguinte, dentro do período selecionado. A linha só aparece onde os três anos têm dados da mesma série e, nos gráficos semestrais, do mesmo semestre. O SVG exporta a visualização escolhida.

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

O arquivo `dados/graduacao.js` contém dados agregados para consulta pública. Não inclui nomes ou identificadores de alunos e docentes, credenciais, cookies, estado de sessão ou caminhos locais privados. Os documentos autenticados e as fontes de trabalho não são distribuídos neste repositório; uma referência de origem não implica que o arquivo correspondente esteja disponível publicamente para download.

Na graduação, a coleta comum de 09/11/2026 usou dez CSV do Júpiter autenticado, no Relatório de Disciplinas e Turmas. As leituras anônimas dessa rota redirecionaram ao login. O acesso verificado não permitiu obter os resultados históricos por departamento. O PDF MAT preexistente, embora identifique o Júpiter, não documenta a obtenção original e foi excluído junto com os CSV MAC e seus derivados. Vagas e concluintes usam exclusivamente as fontes oficiais públicas. O histórico de proveniência da manutenção distingue envio pelo usuário de cópia encontrada no Drive.

## Atualização

1. Priorizar fontes oficiais públicas fora deste repositório, preservando URL, data, localizador e hash. Os coletores públicos não recorrem a sessões autenticadas quando um dado falta; registram a lacuna para revisão.
2. Conferir programas, períodos, versões, multiplicidades e universos; registrar lacunas e hipóteses sem preencher ausências com zero.
3. Gerar uma nova base agregada, revisar cálculos e referências e retirar metadados privados.
4. Substituir `dados/graduacao.js` pela versão revisada. Alterações na interface devem manter os arquivos de dados, apresentação e interação compatíveis.
5. Verificar cálculos, filtros, exportações, referências e apresentação antes de publicar a atualização.
