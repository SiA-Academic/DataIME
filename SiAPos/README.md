# SiAPos

Painel de indicadores agregados da graduação e da pós-graduação do IME-USP.

## Uso

Abra `index.html` no endereço publicado ou localmente. Mantenha `app.js`, `model.js`, `styles.css`, `data.js`, `grad.js`, `grad.css` e `graduacao-data.js` na mesma pasta. Os arquivos usam referências relativas, sem CDN ou consultas externas durante a navegação.

Selecione programas e anos para comparar as séries. A visão geral apresenta um quadro por programa e, separadamente, os totais da seleção. O quadro de 2024–2025 mantém seu próprio filtro de ano e mostra todos os indicadores em gráficos. Valores e marcadores abrem os detalhes da fonte. Há exportação de tabelas em CSV e de gráficos em SVG.

## Pós-graduação: cobertura e leitura

- Titulações e matrículas anuais nos programas: 2012–2025, cinco programas do IME.
- Disciplinas: CC e MAT em 2012–2025; MAP, PE e MPEM em 2024–2025. A cobertura de cada média é indicada no painel.
- Quadro comparativo: 2024 e 2025, incluindo ativos na data exata de 1º de abril, cargas, créditos, matrículas em disciplinas e cortes de tamanho das turmas.

Titulações são diplomas concedidos. Matrículas regulares anuais, matrículas em disciplinas e ativos em 1º de abril são universos diferentes. Matrículas em disciplinas representam vínculos estudante–turma, não pessoas distintas. Nas titulações e nos ativos, o doutorado reúne DO e DD quando indicado; a série de matrículas regulares segue a classificação da fonte.

`ND` significa informação não disponível ou não determinada; `NA`, indicador não aplicável; zero significa zero documentado. No quadro, os ativos de doutorado do MPEM são `NA`; as titulações conservam o zero informado pela fonte. Aproximações conservam o sinal `≈`. Anos ausentes não entram como zero nas médias. As médias são aritméticas dos valores anuais disponíveis, com aviso quando os programas têm coberturas diferentes.

O quadro usa cargas nominais curriculares, não horas efetivamente ministradas por docente. Quando necessário, os componentes de uma ficha são aplicados a uma versão anterior sob a hipótese de manutenção da carga. A classificação de ofertas dos demais programas pela área atual da ficha adota a hipótese de manutenção do vínculo histórico, quando indicada na origem. O prefixo do código de disciplina não define o programa.

Os cortes são estritos: menos de cinco exclui cinco; mais de trinta exclui trinta. Contagens individuais não são reconstruídas a partir de desvios padrão arredondados. Ofertas encontradas no catálogo e ausentes do relatório anual não são convertidas em matrículas zero nem incorporadas automaticamente à atividade observada.

## Graduação

A área de [graduação](https://sia-academic.github.io/SiA/SiAPos/#graduation) tem filtros próprios e seis visões: retrato por curso, séries, conjuntos de disciplinas, estatísticas do Anuário, currículos e fontes.

- Seis cursos do IME, 2012–2025: matriculados, não matriculados/trancamentos e cadastrados em cada semestre; vagas e concluintes anuais do Anuário USP.
- Ingressantes de 2012–2024 no Censo da Educação Superior/Inep: 52 contagens anuais para BCC, BM, BE e LM. Os 26 totais de BMA/BMAC permanecem `ND`, com as contagens públicas da área básica de ingresso (ABI) consultáveis na origem. Os seis valores de 2025 também permanecem `ND`.
- Disciplinas MAC em 2020–2025 e MAT em 2024–2025, a partir dos arquivos fornecidos. O conjunto adicional de ministrantes MAC se sobrepõe aos dois anteriores e é apresentado separadamente.
- Os 132 campos históricos de créditos-aula e carga nominal desses conjuntos foram preenchidos cruzando as ofertas fornecidas com as versões públicas datadas do Júpiter e o calendário oficial. A carga nominal corresponde a 15 horas-aula por crédito-aula e por oferta.
- Estatísticas do Anuário, 2012–2025: disciplinas, turmas e dimensões médias dos quatro departamentos, na tabela 3.02; matrículas em disciplinas, aprovações e reprovações do IME como unidade, na tabela 3.07. O código interdepartamental 450 tem cobertura a partir de 2017.
- Referências curriculares de 2024 e 2025: 36 variantes de curso, habilitação ou turno. Essas alternativas não são somadas; os subtotais impressos e as ressalvas das fontes são preservados.

Estoques do primeiro e do segundo semestre permanecem separados. Vagas não equivalem a ingressantes. Os conjuntos de disciplinas não identificam o curso de cada aluno nem certificam a lotação dos ministrantes. O grupo de turmas com sufixos 45/52 conserva o critério da planilha fornecida.

As lacunas de ingresso e de ofertas anteriores aos arquivos fornecidos permanecem `ND`. As contagens ABI não foram convertidas em ingresso total de BMA/BMAC, pois a passagem da ABI às habilitações impede uma soma sem risco de duplicidade. A série do Inep mantém sua definição própria e suas fontes; os demais indicadores do Anuário foram preservados.

As versões históricas das fichas confirmam créditos válidos no período da oferta. Não se aplicou indiscriminadamente a ficha atual aos anos anteriores. A carga é curricular nominal, não a carga efetivamente ministrada por professor. A média de notas é a média das médias publicadas por turma, ponderada pelos matriculados; não reconstrói notas individuais. As taxas conservam os denominadores descritos no painel.

As estatísticas por departamento e por unidade não são repartidas pelos seis cursos. Dimensões médias arredondadas não permitem reconstruir matrículas exatas; disciplinas nos dois semestres não são códigos únicos no ano. Cada gráfico, tabela e exportação mantém o escopo e o semestre correspondentes.

As comparações Anuário/DataUSP e arquivos fornecidos/Anuário ficam na visão de fontes. Divergências publicadas permanecem sinalizadas: cinco em subtotais curriculares e uma turma MAC de 2023 com 59 matrículas e 58 resultados. Os números originais foram preservados.

## Fontes e recorte público

As referências de cada valor preservam o arquivo e a localização de origem: aba/célula de planilha ou localizador de relatório HTML. Hashes e notas registram a procedência quando disponíveis. O painel também documenta as ressalvas das fontes históricas.

`data.js` e `graduacao-data.js` são recortes agregados para consulta pública. Não contêm nomes ou identificadores de alunos e docentes, credenciais, cookies, estado de sessão ou caminhos locais privados. Os documentos autenticados e as fontes de trabalho não são distribuídos neste repositório; uma referência de origem não implica que o arquivo correspondente esteja disponível publicamente para download. Fontes oficiais abertas e arquivos fornecidos são identificados separadamente.

Na graduação, os resultados não públicos ainda necessários vêm dos relatórios detalhados MAC 2020–2025 e MAT 2024–2025. Seus agregados incluem matrículas, resultados, notas, trancamentos e cortes de tamanho. O arquivo do conjunto adicional MAC 2024–2025 delimita um recorte sobreposto, sem acrescentar resultados independentes aos dois relatórios principais. Créditos e cargas dessas ofertas têm origem mista: créditos públicos e turmas fornecidas. Arquivos de concluintes/vagas recebidos serviram apenas de conferência; os indicadores principais usam o Anuário público. A visão de fontes permite filtrar origens públicas, fornecidas não públicas e mistas, com prioridade inicial às públicas.

## Atualização

1. Priorizar fontes oficiais públicas fora deste repositório, preservando URL, data, localizador e hash. Os coletores públicos não recorrem a sessões autenticadas quando um dado falta; registram a lacuna para revisão.
2. Conferir programas, períodos, versões, multiplicidades e universos; registrar lacunas e hipóteses sem preencher ausências com zero.
3. Gerar uma nova base agregada, revisar cálculos e referências e retirar metadados privados.
4. Substituir `data.js` ou `graduacao-data.js` pela versão revisada. Alterações na interface devem manter os oito arquivos compatíveis.
5. Verificar cálculos, filtros, exportações, referências e apresentação antes de publicar a atualização.

O ambiente de manutenção conserva seis entradas canônicas e um construtor reproduzível, com auditorias dos valores, fontes, lacunas e exportações. Coletas completas, arquivos redundantes e estratégias anteriores ficam no arquivo histórico. A coleta não atualiza este painel automaticamente.
