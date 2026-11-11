$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "gerar-publicacoes-lattes.ps1") -SomenteFuncoes

$tested = 0
foreach ($tipo in @("periodico", "anais_congressos")) {
  $start = if ($tipo -eq "periodico") { "Artigos completos publicados em periódicos" } else { "Trabalhos completos publicados em anais de congressos" }
  foreach ($stop in (Get-PublicationStopHeadings $tipo)) {
    $text = "$start`n1. AUTOR, A.. Artigo publicado. Revista Exemplo, v. 1, p. 1, 2025.`n$stop`n1. AUTOR, A.. Item fora da seção. Outra fonte, 2024.`n"
    $section = Extract-Section $text $start (Get-PublicationStopHeadings $tipo)
    $items = @(Extract-Items $section $tipo 2022 2026)
    if ($items.Count -ne 1 -or $items[0].referencia -match "fora da seção" -or $items[0].ano -ne 2025) {
      throw "Limite incorreto para $tipo antes de $stop"
    }
    $tested++
  }
}
$sameLineTitle = "Artigos completos publicados em periódicos`n1. AUTOR, A.. Apresentações de Trabalho e artigos: um estudo. Revista Exemplo, 2025.`nProdução técnica`n1. Outro item, 2024."
$section = Extract-Section $sameLineTitle "Artigos completos publicados em periódicos" (Get-PublicationStopHeadings "periodico")
if ($section -notmatch "Apresentações de Trabalho e artigos" -or $section -match "Outro item") {
  throw "O limite deve reconhecer cabeçalhos completos, não palavras dentro dos títulos."
}
Write-Output "OK: $tested limites de seção e título contendo palavras de cabeçalho."

$referencias = @'
1. CHANG, Y. ; KOHAYAKAWA, Y. . Factors in randomly perturbed hypergraphs. RANDOM STRUCTURES & ALGORITHMS, v. 60, p. 153-165, 2021.
2. CHANG, Y. ; MOTA, G. . Factors in randomly perturbed hypergraphs. Random Structures & Algorithms, v. 60, p. 153-165, 2022.
3. AUTOR, A. . Factors in randomly perturbed hypergraphs. Revista Exemplo, v. 60, p. 153-165, 2021.
'@
$antes = @(Extract-Items $referencias "periodico" 2021 2021)
$depois = @(Extract-Items $referencias "periodico" 2022 2022)
if ($antes.Count -ne 1 -or $antes[0].veiculo -ne "Revista Exemplo" -or
    $depois.Count -ne 1 -or $depois[0].ano -ne 2022 -or $depois[0].referencia -notmatch '2021\.') {
  throw "O ano confirmado deve ser aplicado antes do recorte, uma vez por obra, preservando a referência do currículo."
}

$dordrecht = Extract-PeriodicoFields "AUTOR, A. . Título correto do artigo. JOURNAL OF OPTIMIZATION THEORY AND APPLICATIONS (DORDRECHT. ONLINE) , v. 206, p. 57, 2025." 2025
if ($dordrecht.titulo -ne "Título correto do artigo" -or $dordrecht.veiculo -ne "JOURNAL OF OPTIMIZATION THEORY AND APPLICATIONS (DORDRECHT. ONLINE)") {
  throw "Ponto no qualificador de suporte truncou título ou periódico."
}
Write-Output "OK: veículo com ponto dentro de parênteses preservado."

# Casos reais dos PDFs: o ano, um número dentro do título ou um DOI podem
# ocupar a primeira posição de uma linha do corpo, à direita da numeração.
$numbered = @'
   1.
        AUTOR, A. . Separating the edges of a graph by a linear number of paths.
        Advances in Combinatorics, v. 1, p. 1-7,
        2023.
   2. AUTOR, B. . Biclique immersions in graphs with independence number
        2. European Conference on Combinatorics, Graph Theory and Applications, v. 1, p. 1, 2023.
   3.
        AUTOR, C. . Artigo recente. Revista Exemplo, v. 31, p. P1.70,
        2024. Citações: 2
   4. AUTOR, D. . Artigo fora da janela. Revista Exemplo, v. 2022, p. 11011-11055,
        2021.
'@
$items = @(Extract-Items $numbered "periodico" 2022 2026)
if ($items.Count -ne 3 -or $items[0].ano -ne 2023 -or $items[1].referencia -notmatch "independence number 2\. European" -or $items[2].ano -ne 2024) {
  throw "Anos e números no corpo da referência foram confundidos com itens."
}
if ($items | Where-Object { $_.titulo -eq "Artigo fora da janela" }) {
  throw "O volume 2022 não pode substituir o ano 2021 da referência completa."
}
$events = @'
  1. AUTOR, A. . Content-Based Lawsuits Document Image Retrieval. In: EPIA, 2022, Lisboa. Proceedings, doi
       10.1007/978-3-031-16474-3_3, 2022. v. 1. p. 1.
  2. AUTOR, B. . Intrusion Detection System. In: Workshop,
       2023. Proceedings of IEEE INFOCOM Workshops,
       2023.
'@
$items = @(Extract-Items $events "anais_congressos" 2022 2026)
if ($items.Count -ne 2 -or $items[0].referencia -notmatch "doi 10\.1007/" -or $items[1].veiculo -ne "Workshop") {
  throw "DOI ou ano quebrado criou um falso trabalho em evento."
}
$longList = (1..101 | ForEach-Object {
  $indent = if ($_ -ge 100) { "  " } else { "   " }
  "$indent$_. AUTOR, A. . Artigo $_. Revista Exemplo, v. 1, p. 1, 2025."
}) -join "`n"
if (@(Extract-Items $longList "periodico" 2022 2026).Count -ne 101) {
  throw "A mudança de recuo em itens de três dígitos perdeu referências."
}
Write-Output "OK: anos quebrados, números no título, DOI, volume distinto do ano, itens inline e numeração de três dígitos."

$uk = Extract-PeriodicoFields "AUTOR, A. . Networks Across Development in Two U.K. Cohorts. AMERICAN JOURNAL OF PSYCHIATRY , v. 180, p. 755-765, 2023." 2023
$renote = Extract-PeriodicoFields "AUTOR, A. . An approach to assess chatbots. RENOTE. REVISTA NOVAS TECNOLOGIAS NA EDUCAÇÃO, v. 24, p. 174-185, 2025." 2025
$notices = Extract-PeriodicoFields "BIRGIN, ERNESTO G; LAURAIN, ANTOINE . Shape Optimization for Covering Problems. American Mathematical Society. Notices, v. 70, p. 1-1591, 2023." 2023
$singleAuthor = Extract-PeriodicoFields "Bumpus, Benjamin Merlin. Spined categories: Generalizing tree-width beyond graphs. EUROPEAN JOURNAL OF COMBINATORICS , v. 114, p. 103794, 2023." 2023
if ($uk.titulo -ne "Networks Across Development in Two U.K. Cohorts" -or $renote.titulo -ne "An approach to assess chatbots" -or $renote.veiculo -ne "RENOTE. REVISTA NOVAS TECNOLOGIAS NA EDUCAÇÃO" -or $notices.titulo -ne "Shape Optimization for Covering Problems" -or $notices.veiculo -ne "American Mathematical Society. Notices" -or $singleAuthor.titulo -ne "Spined categories: Generalizing tree-width beyond graphs") {
  throw "A separação de autores, título e periódico perdeu trechos da referência."
}
$volumeEvent = Extract-EventoFields "AUTOR, A. . Implementação de um método. In: v. 11 n. 1 (2025): CNMAC 2024, 2025, Porto de Galinhas, 2024. v. 11." 2024
if ($volumeEvent.veiculo -ne "v. 11 n. 1 (2025): CNMAC 2024") { throw "Ponto dentro do nome do evento truncou o veículo." }
if ((Extract-Year "AUTOR, A. . Título 2026. Revista, v. 2022, p. 2000-2001, 2021.") -ne 2021) { throw "Volume/páginas/título foram confundidos com o ano bibliográfico." }
if ((Extract-Year "AUTOR, A. . Título. In: Evento, 2024, Brasil. Anais. p. 2025.") -ne 2024) { throw "Página foi confundida com ano de evento." }
if ((Extract-Year "AUTOR, A. . Título 2025. Revista, v. 2024, p. 2001-2002.") -ne 0) { throw "Referência sem campo de ano recebeu um ano inferido de outro campo." }
Write-Output "OK: título com abreviação, nome composto RENOTE, autor único, evento com pontos e ano bibliográfico."

$previousPage = "        Anais do evento`n        Computacionais de Alto Desempenho (WSCAD Estendido 2022),`n54 of 167 29/06/2026"
$badHeader = @'
                  Lattes (Alfredo Goldman
Currículo do Sistema de Currículos Computacionais vel Lejbman)
                  de Alto https://buscatextual.cnpq.br/buscatextual/visualizacv.do
                  Desempenho (WSCAD Estendido 2022),
        2022. p. 17.
   20.
        AUTOR, A. . Próximo artigo.
'@
$rawPage = @'
Computacionais de Alto Desempenho (WSCAD Estendido 2022),
2022. p. 17.
20.
AUTOR, A. . Próximo artigo.
Currículo do Sistema de Currículos Lattes (Alfredo Goldman vel Lejbman) https://buscatextual.cnpq.br/buscatextual/visualizacv.do
55 of 167 29/06/2026
'@
$repaired = Repair-LattesPageHeader $badHeader $rawPage $previousPage
if ($repaired -match 'Lattes|Currículo|https|Computacionais' -or $repaired -notmatch '2022\. p\. 17\.' -or $repaired -notmatch '   20\.') {
  throw "Recuperação do cabeçalho apagou continuação legítima ou manteve texto sobreposto."
}
$withoutOverlap = Repair-LattesPageHeader $badHeader $rawPage "Outro trecho da página anterior."
if ($withoutOverlap -notmatch 'Computacionais de Alto Desempenho') { throw "Texto sem repetição exata foi removido indevidamente." }
Write-Output "OK: cabeçalho sobreposto recuperado em modo raw, continuação preservada e repetição exata controlada."

$dated = Get-LattesMeta "30/06/2026, 15:35`nÚltima atualização do currículo em`n21/11/2025`nID Lattes: 123456789" "Currículo (Docente Exemplo).pdf"
if ($dated.LattesAtualizadoEm -ne "2025-11-21") {
  throw "A data de atualização do currículo deve ser distinta da impressão."
}
$undated = Get-LattesMeta "30/06/2026, 15:35`nID Lattes: 123456789" "Currículo (Docente Exemplo).pdf"
if ($null -ne $undated.LattesAtualizadoEm) { throw "CV sem data explícita não pode usar a impressão como atualização." }
$invalidDate = Get-LattesMeta "Última atualização do currículo em 31/02/2025" "Currículo (Docente Exemplo).pdf"
if ($null -ne $invalidDate.LattesAtualizadoEm) { throw "Data de atualização inválida não deve ser aceita." }
$testRecords = @{}
$testDocente = [pscustomobject]@{ docente_id = "teste"; nome = "Docente Exemplo"; lattes_id = ""; lattes_url = "" }
[void](Ensure-Record $testRecords $testDocente $undated)
[void](Ensure-Record $testRecords $testDocente $dated)
if ($testRecords["teste"].lattes_atualizado_em -ne "2025-11-21") { throw "Metadado de atualização não foi propagado ao registro." }
Write-Output "OK: atualização histórica, ausência, data inválida e propagação do metadado."

# Regressão da p. 56 do PDF de Anarosa: uma linha de continuação do item 32
# reaparece no item 33. Ancorar na segunda ocorrência apagava o item 33.
$repeatLayout = @'
            Lattes (AnarosaMulti-Agent
Currículo do Sistema de Currículos Engineering Alves Franco Brandão)
        EMAS@AAMAS2017 - Proceedings, 2017. p. 33-48.
   33.
        AUTOR, A. . Artigo seguinte. In: Workshop, 2017, Sao Paulo.
        Engineering Multi-Agent Systems (EMAS 2017), 2017, Sao Paulo.
        Anais, 2017. p. 113-128.
   34.
        AUTOR, B. . Outro artigo. In: Workshop, 2017, Sao Paulo. Anais, 2017.
'@
$repeatRaw = @'
Engineering Multi-Agent Systems (EMAS 2017), 2017, Sao Paulo.
EMAS@AAMAS2017 - Proceedings, 2017. p. 33-48.
33.
AUTOR, A. . Artigo seguinte. In: Workshop, 2017, Sao Paulo.
Engineering Multi-Agent Systems (EMAS 2017), 2017, Sao Paulo.
Anais, 2017. p. 113-128.
34.
AUTOR, B. . Outro artigo. In: Workshop, 2017, Sao Paulo. Anais, 2017.
'@
$repeatRepaired = Repair-LattesPageHeader $repeatLayout $repeatRaw ""
if ($repeatRepaired -notmatch '(?m)^\s*33\.' -or $repeatRepaired -notmatch 'p\. 33-48' -or $repeatRepaired -notmatch 'p\. 113-128') {
  throw "A linha repetida de um evento apagou o artigo seguinte durante reparação."
}
Write-Output "OK: ancoragem preserva itens quando a mesma continuação reaparece adiante."

function Assert-ExtractionFails([scriptblock]$Action, [string]$ExpectedMessage) {
  $caught = $null
  try { & $Action | Out-Null } catch { $caught = $_.Exception.Message }
  if (-not $caught -or $caught -notmatch $ExpectedMessage) { throw "Falha esperada não ocorreu: $ExpectedMessage ($caught)" }
}
Assert-ExtractionFails {
  Extract-Items "1. AUTOR . Artigo sem data. Revista, v. 2024, p. 1-2." "periodico" 2022 2026
} "Ano bibliográfico não reconhecido"
Assert-ExtractionFails {
  Extract-Items "1. AUTOR . Artigo. Revista, 2025.`n3. AUTOR . Outro. Revista, 2024." "periodico" 2022 2026
} "Numeração descontínua"
Assert-ExtractionFails {
  Extract-Items "2. AUTOR . Artigo. Revista, 2025." "periodico" 2022 2026
} "sem numeração inicial"
Assert-ExtractionFails {
  Extract-Items "1.`n2. AUTOR . Artigo. Revista, 2025." "periodico" 2022 2026
} "Referência vazia"
Write-Output "OK: numeração rompida, referência vazia e ano não reconhecido interrompem a análise sem descartar produção."

$identityText = "                    Docente Exemplo`nID Lattes: 1234567890123456`nÚltima atualização do currículo em 20/10/2026"
$identityMeta = Get-LattesMeta $identityText "Currículo (Docente Exemplo).pdf"
$identityDocente = [pscustomobject]@{ docente_id = "teste"; nome = "Docente Exemplo"; lattes_id = "1234567890123456"; lattes_url = "" }
Confirm-LattesIdentity $identityText $identityMeta $identityDocente "Currículo (Docente Exemplo).pdf"
Assert-ExtractionFails {
  Confirm-LattesIdentity $identityText (Get-LattesMeta $identityText "Currículo (Outro Docente).pdf") $identityDocente "Currículo (Outro Docente).pdf"
} "Nome no conteúdo"
$wrongIdDocente = [pscustomobject]@{ docente_id = "teste"; nome = "Docente Exemplo"; lattes_id = "9999999999999999"; lattes_url = "" }
Assert-ExtractionFails {
  Confirm-LattesIdentity $identityText $identityMeta $wrongIdDocente "Currículo (Docente Exemplo).pdf"
} "ID Lattes do PDF"
Assert-ExtractionFails {
  Confirm-LattesIdentity ($identityText + "`nID Lattes: 9999999999999999") $identityMeta $identityDocente "Currículo (Docente Exemplo).pdf"
} "único ID"
Assert-ExtractionFails { Find-DocenteForName "" @($identityDocente) @{} } "Nome do docente"
$partial = Find-DocenteForName "Docente" @($identityDocente) @{ "docente exemplo" = $identityDocente }
if ($partial.docente_id -eq "teste") { throw "Nome parcial atribuiu produção ao primeiro candidato." }
Write-Output "OK: troca de PDF, ID divergente/ambíguo e nome parcial não atribuem produção a outro docente."
Confirm-LattesPublicationCoverage "Artigos completos publicados em periódicos`n1. AUTOR . Artigo. Revista, 2025." "Currículo.pdf"
Assert-ExtractionFails {
  Confirm-LattesPublicationCoverage "Currículo em outro formato sem seções reconhecidas." "Currículo.pdf"
} "Nenhuma seção"
Write-Output "OK: ausência de cabeçalhos canônicos impede atribuição silenciosa de produção zero."

$exclusionFixture = [IO.Path]::GetTempFileName()
try {
  [IO.File]::WriteAllText($exclusionFixture, '{"schema_version":1,"docentes":[{"nome":"Docente Exemplo","lattes_id":"1234567890123456"}]}')
  $excludedIds = Read-ExcludedLattesIds $exclusionFixture
  if (-not $excludedIds.Contains("1234567890123456") -or $excludedIds.Contains("9999999999999999") -or $excludedIds.Contains("Docente Exemplo")) {
    throw "Exclusão deve usar somente a identidade Lattes exata, nunca o nome ou outro ID."
  }
  [IO.File]::WriteAllText($exclusionFixture, '{"schema_version":1,"docentes":[]}')
  $emptyIds = Read-ExcludedLattesIds $exclusionFixture
  if ($null -eq $emptyIds -or $emptyIds.Count -ne 0 -or $emptyIds.Contains("1234567890123456")) {
    throw "Lista de exclusões vazia deve preservar o conjunto vazio."
  }
  foreach ($badConfig in @(
    '{"schema_version":1,"docentes":{"lattes_id":"1234567890123456"}}',
    '{"schema_version":2,"docentes":[]}'
  )) {
    [IO.File]::WriteAllText($exclusionFixture, $badConfig)
    Assert-ExtractionFails { Read-ExcludedLattesIds $exclusionFixture } "Lista de docentes excluídos inválida"
  }
  foreach ($badId in @('"123456789"', '1234567890123456', 'null')) {
    [IO.File]::WriteAllText($exclusionFixture, ('{"schema_version":1,"docentes":[{"lattes_id":' + $badId + '}]}'))
    Assert-ExtractionFails { Read-ExcludedLattesIds $exclusionFixture } "ID Lattes inválido"
  }
  [IO.File]::WriteAllText($exclusionFixture, '{"schema_version":1,"docentes":[{"lattes_id":"1234567890123456"},{"lattes_id":"1234567890123456"}]}')
  Assert-ExtractionFails { Read-ExcludedLattesIds $exclusionFixture } "ID Lattes duplicado"
} finally {
  Remove-Item -LiteralPath $exclusionFixture -Force
}
Write-Output "OK: exclusão por ID Lattes exato, lista vazia e rejeição de configuração inválida/duplicada."
