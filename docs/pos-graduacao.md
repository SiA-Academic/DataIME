# Pós-graduação · Dados do IME

O painel **Dados do IME** reúne as consultas de Graduação e Pós-graduação. [Abrir a consulta de pós-graduação](../index.html#series).

## Uso

Em **Titulações e matrículas** e **Disciplinas**, os gráficos abrem com os cinco programas e todo o período. Clique em um ponto para ver a fonte. O botão SVG baixa o gráfico; o CSV no fim da página reúne as séries, inclusive indicadores sem gráfico, e as médias do período. Em **Fontes e critérios** estão as referências e a cobertura de cada indicador.

Nos gráficos de evolução, **Mediana móvel · 3 anos** começa desligada. Ao ativá-la, cada série ganha uma linha de traço contínuo com 40% de opacidade. A série original e seus pontos permanecem opacos. A mediana usa o valor central entre o ano anterior, o atual e o seguinte, dentro do período selecionado. A linha só aparece onde os três anos têm dados da mesma série e, nos gráficos semestrais, do mesmo semestre. O SVG exporta a visualização escolhida.

## Pós-graduação: cobertura e leitura

- **Titulações e matrículas:** a primeira linha compara as titulações de mestrado e doutorado; a segunda, suas matrículas regulares. O CSV também traz os totais, as matrículas de alunos especiais e a participação de cada programa.
- **Disciplinas:** a linha separadora distingue os três gráficos de tamanho de turma dos demais. O CSV inclui as contagens aproximadas de aprovações e as matrículas médias por turma. A taxa de aprovação continua visível no gráfico próprio.
- As séries de titulações e matrículas vêm do DataUSP e do Anuário USP. Oferta, participação em disciplinas, créditos, carga curricular e tamanho das turmas usam os relatórios gerais do Janus e as fichas de disciplinas.

Titulações são diplomas concedidos. Matrículas regulares anuais e matrículas em disciplinas são universos diferentes. Matrículas em disciplinas representam vínculos estudante–turma, não pessoas distintas. Nas titulações, o doutorado reúne DO e DD quando indicado; a série de matrículas regulares segue a classificação da fonte.

`ND` significa informação não disponível ou não determinada; `NA`, indicador não aplicável; zero significa zero documentado. A aplicabilidade vem dos níveis e das regras configurados para cada programa; zeros publicados são preservados. Aproximações conservam o sinal `≈`. Anos ausentes não entram como zero nas médias. As médias principais usam cobertura comum entre os programas aplicáveis.

A carga curricular total é o campo histórico da oferta, incluindo estudos; não mede horas efetivamente ministradas por docente. A classificação de ofertas pela área atual da ficha adota a hipótese de manutenção do vínculo histórico, quando indicada na origem. O prefixo do código de disciplina não define o programa.

As faixas de tamanho são: menos de cinco; de cinco a trinta, incluindo os dois limites; e mais de trinta. A faixa intermediária é o total menos as duas faixas externas, somente com contagens completas e conciliadas. As três faixas somam o total de turmas. Contagens individuais não são reconstruídas a partir de desvios padrão arredondados. Ofertas encontradas no catálogo e ausentes do relatório anual não são convertidas em matrículas zero nem incorporadas automaticamente à atividade observada.

## Fontes e recorte público

As referências de cada valor preservam o arquivo e a localização de origem: aba/célula de planilha ou localizador de relatório HTML. Hashes e notas registram a procedência quando disponíveis. O painel também documenta as ressalvas das fontes históricas.

O arquivo `dados/pos-graduacao.js` contém dados agregados para consulta pública. Não inclui nomes ou identificadores de alunos e docentes, credenciais, cookies, estado de sessão ou caminhos locais privados. Os documentos autenticados e as fontes de trabalho não são distribuídos neste repositório; uma referência de origem não implica que o arquivo correspondente esteja disponível publicamente para download.
