param(
  [string]$LattesDir = "",
  [string]$DocentesCsv = "",
  [string]$PeriodicosMd = "",
  [string]$ConferenciasMd = "",
  [string]$PublicacoesMd = "",
  [string]$EventosMd = "",
  [string]$StaticPublicacoesMd = "",
  [string]$StaticEventosMd = "",
  [string]$Periodo = "",
  [int]$AnoInicio = 0,
  [int]$AnoFim = 0,
  [switch]$SomenteFuncoes
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
if (-not $LattesDir) { $LattesDir = Join-Path $root "static\CVS_LATTES" }
if (-not $DocentesCsv) { $DocentesCsv = Join-Path $root "content\controle\lattes-docentes.csv" }
if (-not $PeriodicosMd) { $PeriodicosMd = Join-Path $root "content\controle\publicacoes-periodicos.md" }
if (-not $ConferenciasMd) { $ConferenciasMd = Join-Path $root "content\controle\publicacoes-conferencias.md" }
if (-not $PublicacoesMd) { $PublicacoesMd = Join-Path $root "publicacoes.md" }
if (-not $EventosMd) { $EventosMd = Join-Path $root "eventos.md" }
if (-not $StaticPublicacoesMd) { $StaticPublicacoesMd = Join-Path $root "static\publicacoes.md" }
if (-not $StaticEventosMd) { $StaticEventosMd = Join-Path $root "static\eventos.md" }

$catalogoVerificado = Get-Content -LiteralPath (Join-Path $root "data/controle/publicacoes-verificadas.json") -Raw -Encoding UTF8 | ConvertFrom-Json
$anosConfirmados = @{}
foreach ($obra in $catalogoVerificado.anos_confirmados) {
  $anosConfirmados.Add("$($obra.titulo)`n$($obra.veiculo)", [int]$obra.ano)
}

function Normalize-Text([string]$Value) {
  if ($null -eq $Value) { return "" }
  $text = $Value.Normalize([Text.NormalizationForm]::FormD)
  $builder = New-Object System.Text.StringBuilder
  foreach ($char in $text.ToCharArray()) {
    if ([Globalization.CharUnicodeInfo]::GetUnicodeCategory($char) -ne [Globalization.UnicodeCategory]::NonSpacingMark) {
      [void]$builder.Append($char)
    }
  }
  return (($builder.ToString().ToLowerInvariant() -replace '[^a-z0-9]+', ' ') -replace '\s+', ' ').Trim()
}

function Q([string]$Value) {
  if ($null -eq $Value) { $Value = "" }
  return '"' + (($Value -replace '\\', '\\') -replace '"', '\"') + '"'
}

function SlugId([string]$Value) {
  $slug = (Normalize-Text $Value) -replace '[^a-z0-9]+', '-'
  $slug = $slug.Trim('-')
  if ($slug) { return "lattes-$slug" }
  return "lattes-sem-nome"
}

function Read-Docentes([string]$Path) {
  if (-not (Test-Path -LiteralPath $Path)) { return @() }
  Import-Csv -LiteralPath $Path | ForEach-Object {
    [pscustomobject]@{
      docente_id = $_.docente_id
      nome = $_.nome
      lattes_id = $_.lattes_id
      lattes_url = $_.lattes_url
    }
  }
}

function Read-ExcludedLattesIds([string]$Path) {
  if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) {
    throw "Lista de docentes excluídos não encontrada: $Path"
  }
  $config = Get-Content -LiteralPath $Path -Raw | ConvertFrom-Json
  if ($config.schema_version -ne 1 -or $config.docentes -isnot [System.Array]) {
    throw "Lista de docentes excluídos inválida: use schema_version 1 e a lista docentes."
  }
  $ids = New-Object 'System.Collections.Generic.HashSet[string]'
  foreach ($item in $config.docentes) {
    if ($item.lattes_id -isnot [string] -or $item.lattes_id -notmatch '^\d{16}$') {
      throw "ID Lattes inválido na lista de docentes excluídos: informe uma string de 16 dígitos."
    }
    if (-not $ids.Add($item.lattes_id)) {
      throw "ID Lattes duplicado na lista de docentes excluídos: $($item.lattes_id)"
    }
  }
  # Não enumere o HashSet no pipeline: lista vazia também deve manter Contains().
  return ,$ids
}

function Parse-PeriodYears([string]$Value) {
  $result = [ordered]@{ Inicio = 0; Fim = 0 }
  if (-not $Value) { return [pscustomobject]$result }
  $matches = [regex]::Matches($Value, '\b\d{2}/\d{2}/(\d{4})\b')
  if ($matches.Count -ge 1) { $result.Inicio = [int]$matches[0].Groups[1].Value }
  if ($matches.Count -ge 2) { $result.Fim = [int]$matches[$matches.Count - 1].Groups[1].Value }
  if (-not $result.Inicio) {
    $years = [regex]::Matches($Value, '\b(19|20)\d{2}\b')
    if ($years.Count -ge 1) { $result.Inicio = [int]$years[0].Value }
    if ($years.Count -ge 2) { $result.Fim = [int]$years[$years.Count - 1].Value }
  }
  return [pscustomobject]$result
}

function Convert-PdfToText([string]$Path) {
  $pdftotext = Get-Command pdftotext -ErrorAction SilentlyContinue
  if (-not $pdftotext) {
    throw "pdftotext nao encontrado; nao foi possivel ler os PDFs Lattes."
  }

  $tmp = [System.IO.Path]::GetTempFileName()
  $sourceCopy = Join-Path ([System.IO.Path]::GetTempPath()) ("controle-lattes-" + [guid]::NewGuid().ToString("N") + ".pdf")
  try {
    # O pdftotext instalado no Windows pode não receber corretamente caminhos UTF-8.
    # A cópia temporária com nome ASCII preserva a leitura de currículos com acentos.
    Copy-Item -LiteralPath $Path -Destination $sourceCopy -Force
    $processInfo = New-Object System.Diagnostics.ProcessStartInfo
    $processInfo.FileName = $pdftotext.Source
    if ($null -ne $processInfo.PSObject.Properties['ArgumentList']) {
      # .NET preserva cada caminho sem reinterpretar espaços, aspas ou barras.
      foreach ($value in @('-layout', '-enc', 'UTF-8', $sourceCopy, $tmp)) {
        $processInfo.ArgumentList.Add($value)
      }
    } else {
      # Compatibilidade com o gerador canônico no Windows PowerShell 5.1.
      $processInfo.Arguments = '-layout -enc UTF-8 "{0}" "{1}"' -f ($sourceCopy -replace '"', '\"'), ($tmp -replace '"', '\"')
    }
    $processInfo.UseShellExecute = $false
    $processInfo.RedirectStandardOutput = $true
    $processInfo.RedirectStandardError = $true
    $process = [System.Diagnostics.Process]::Start($processInfo)
    $stderr = $process.StandardError.ReadToEnd()
    $process.StandardOutput.ReadToEnd() | Out-Null
    $process.WaitForExit()
    if ($process.ExitCode -ne 0) {
      throw "pdftotext falhou ao ler $Path. $stderr"
    }
    $layoutText = Get-Content -LiteralPath $tmp -Raw
    $pages = $layoutText -split "`f"
    for ($pageIndex = 0; $pageIndex -lt $pages.Count; $pageIndex++) {
      # Em alguns PDFs impressos o cabeçalho se sobrepõe ao corpo. O modo
      # layout intercala suas palavras; o modo raw mantém os objetos separados.
      # Releia só a página afetada e substitua apenas o prefixo corrompido.
      if ($pages[$pageIndex] -notmatch '(?s)^\s*Lattes\s+\(.{0,500}Currículo do Sistema de Currículos') { continue }
      $pageNumber = $pageIndex + 1
      if ($null -ne $processInfo.PSObject.Properties['ArgumentList']) {
        $processInfo.ArgumentList.Clear()
        foreach ($value in @('-f', "$pageNumber", '-l', "$pageNumber", '-raw', '-enc', 'UTF-8', $sourceCopy, $tmp)) {
          $processInfo.ArgumentList.Add($value)
        }
      } else {
        $processInfo.Arguments = '-f {0} -l {0} -raw -enc UTF-8 "{1}" "{2}"' -f $pageNumber, ($sourceCopy -replace '"', '\"'), ($tmp -replace '"', '\"')
      }
      $process = [System.Diagnostics.Process]::Start($processInfo)
      $stderr = $process.StandardError.ReadToEnd()
      $process.StandardOutput.ReadToEnd() | Out-Null
      $process.WaitForExit()
      if ($process.ExitCode -ne 0) { throw "Falha ao separar cabeçalho da página $pageNumber de $Path. $stderr" }
      $rawPage = Get-Content -LiteralPath $tmp -Raw
      $previousPage = if ($pageIndex -gt 0) { $pages[$pageIndex - 1] } else { "" }
      $pages[$pageIndex] = Repair-LattesPageHeader $pages[$pageIndex] $rawPage $previousPage
    }
    return $pages -join "`f"
  } finally {
    Remove-Item -LiteralPath $tmp -Force -ErrorAction SilentlyContinue
    Remove-Item -LiteralPath $sourceCopy -Force -ErrorAction SilentlyContinue
  }
}

function Clean-LattesText([string]$Text) {
  $lines = New-Object System.Collections.Generic.List[string]
  $normalizedText = $Text -replace "`f", "`n"
  foreach ($line in ($normalizedText -split "`n")) {
    if ($line -match '^\s*Currículo do Sistema de Currículos Lattes') { continue }
    if ($line -match '^\s*\d+\s+of\s+\d+\s+') { continue }
    if ($line -match '^\s*https://buscatextual\.cnpq\.br') { continue }
    $lines.Add($line.TrimEnd())
  }
  return ($lines -join "`n")
}

function Repair-LattesPageHeader([string]$LayoutPage, [string]$RawPage, [string]$PreviousPage) {
  $rawLines = @((Clean-LattesText $RawPage) -split "\r?\n" | Where-Object { $_.Trim() })
  $layoutLines = @($LayoutPage -split "\r?\n")
  $anchorRaw = -1
  $anchorLayout = -1
  # Escolha a primeira linha intacta na ordem do layout. Uma continuação do
  # raw pode reaparecer em outro artigo mais abaixo; procurar primeiro no raw
  # apagava o intervalo entre as duas ocorrências (Anarosa, página 56).
  # A correspondência é exata após normalização de espaços; não há fuzzy.
  for ($layoutIndex = 0; $layoutIndex -lt [Math]::Min(30, $layoutLines.Count) -and $anchorRaw -lt 0; $layoutIndex++) {
    $layoutKey = ($layoutLines[$layoutIndex] -replace '\s+', ' ').Trim()
    if (-not $layoutKey) { continue }
    for ($rawIndex = 0; $rawIndex -lt [Math]::Min(10, $rawLines.Count); $rawIndex++) {
      if (($rawLines[$rawIndex] -replace '\s+', ' ').Trim() -ceq $layoutKey) {
        $anchorRaw = $rawIndex
        $anchorLayout = $layoutIndex
        break
      }
    }
  }
  if ($anchorRaw -lt 0) { throw "Cabeçalho sobreposto sem ponto seguro de recuperação; revise o PDF Lattes." }
  $prefix = @()
  if ($anchorRaw -gt 0) { $prefix = @($rawLines[0..($anchorRaw - 1)]) }
  $previousLines = @((Clean-LattesText $PreviousPage) -split "\r?\n" | Where-Object { $_.Trim() })
  # O mecanismo de impressão pode repetir a última linha na página seguinte.
  # Remova somente a repetição exata entre o fim e o início dessas páginas.
  $overlap = 0
  for ($size = 1; $size -le [Math]::Min($prefix.Count, $previousLines.Count); $size++) {
    $left = (($previousLines[($previousLines.Count - $size)..($previousLines.Count - 1)] -join " ") -replace '\s+', ' ').Trim()
    $right = (($prefix[0..($size - 1)] -join " ") -replace '\s+', ' ').Trim()
    if ($left -ceq $right) { $overlap = $size }
  }
  if ($overlap -gt 0) {
    $prefix = if ($overlap -lt $prefix.Count) { @($prefix[$overlap..($prefix.Count - 1)]) } else { @() }
  }
  return (@($prefix) + @($layoutLines[$anchorLayout..($layoutLines.Count - 1)])) -join "`n"
}

function Get-LattesMeta([string]$Text, [string]$FileName) {
  $nome = ""
  $id = ""
  $url = ""
  $atualizadoEm = $null
  if ($FileName -match '\((?<nome>.+?)\)\.pdf$') {
    $nome = $matches["nome"].Trim()
  }
  if ($Text -match 'ID Lattes:\s*(\d+)') {
    $id = $matches[1]
  } elseif ($Text -match 'lattes\.cnpq\.br/(\d+)') {
    $id = $matches[1]
  }
  if ($id) { $url = "http://lattes.cnpq.br/$id" }
  if (-not $nome -and $Text -match '(?m)^\s{10,}([A-ZÁÉÍÓÚÂÊÔÃÕÇ][^\r\n]{5,80})\s*$') {
    $nome = $matches[1].Trim()
  }
  # A data de impressão/extração do PDF não é a atualização do currículo.
  if ($Text -match '(?i)Última\s+atualização\s+do\s+currículo\s+em\s+(\d{2}/\d{2}/\d{4})') {
    $parsedDate = [DateTime]::MinValue
    if ([DateTime]::TryParseExact($matches[1], "dd/MM/yyyy", [Globalization.CultureInfo]::InvariantCulture, [Globalization.DateTimeStyles]::None, [ref]$parsedDate)) {
      $atualizadoEm = $parsedDate.ToString("yyyy-MM-dd")
    }
  }
  return [pscustomobject]@{ Nome = $nome; LattesId = $id; LattesUrl = $url; LattesAtualizadoEm = $atualizadoEm }
}

function Extract-Section([string]$Text, [string]$StartHeading, [string[]]$StopHeadings) {
  $start = [regex]::Match($Text, '(?im)^\s*' + [regex]::Escape($StartHeading) + '\s*$')
  if (-not $start.Success) { return "" }
  $tail = $Text.Substring($start.Index + $start.Length)
  $stopIndex = $tail.Length
  foreach ($heading in $StopHeadings) {
    $stop = [regex]::Match($tail, '(?im)^\s*' + [regex]::Escape($heading) + '\s*$')
    if ($stop.Success -and $stop.Index -lt $stopIndex) {
      $stopIndex = $stop.Index
    }
  }
  return $tail.Substring(0, $stopIndex)
}

function Clean-Reference([string]$Value) {
  $text = $Value -replace "-\s*\r?\n\s*", "-"
  $text = $text -replace '\s+', ' '
  $text = $text -replace '^\s*\d+\.\s*', ''
  $text = $text -replace '\s*Citações:\s*.*$', ''
  return $text.Trim()
}

function Extract-Year([string]$Reference) {
  # O ano bibliográfico é um campo da referência, não qualquer número de
  # quatro dígitos (que também pode ser volume, página, título ou DOI).
  $years = [regex]::Matches($Reference, ',\s*((?:19|20)\d{2})\s*(?:\.|$)')
  if ($years.Count) { return [int]$years[$years.Count - 1].Groups[1].Value }
  # Alguns trabalhos em anais omitem o ano da edição depois da editora.
  # Nesses casos, usamos o ano explícito do evento depois de "In:"/"Em:".
  $event = [regex]::Match($Reference, '\.\s+(?:In|Em):\s+.*?,\s*((?:19|20)\d{2})\s*(?:,|\.|$)', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
  if ($event.Success) { return [int]$event.Groups[1].Value }
  return 0
}

function Last-SentenceSplit([string]$Text) {
  # Qualificadores Lattes como "(DORDRECHT. ONLINE)" pertencem ao veículo.
  # Um ponto dentro de parênteses não separa título e periódico.
  $depth = 0
  for ($idx = $Text.Length - 1; $idx -ge 0; $idx--) {
    if ($Text[$idx] -eq ')') { $depth++; continue }
    if ($Text[$idx] -eq '(') { $depth = [Math]::Max(0, $depth - 1); continue }
    if ($depth -eq 0 -and $Text[$idx] -eq '.' -and $idx + 1 -lt $Text.Length -and $Text[$idx + 1] -eq ' ') {
      return @($Text.Substring(0, $idx).Trim(), $Text.Substring($idx + 2).Trim())
    }
  }
  return @("", $Text.Trim())
}

function Extract-TitleAfterAuthors([string]$Text) {
  # O delimitador isolado do Lattes encerra a lista de autores. Preservar o
  # restante evita cortar títulos que contêm abreviações como "U.K. Cohorts".
  $authorEnd = [regex]::Match($Text, '\s\.\s+')
  if ($authorEnd.Success) { return $Text.Substring($authorEnd.Index + $authorEnd.Length).Trim() }
  # Há currículos com um único autor sem o delimitador isolado.
  return (Last-SentenceSplit $Text)[1]
}

function Extract-PeriodicoFields([string]$Reference, [int]$Ano) {
  $withoutCitations = ($Reference -replace '\s*Citações:.*$', '').Trim()
  $metrics = [regex]::Match($withoutCitations, '\s*,\s*(v\.|n\.|p\.|art\.)\s*')
  $beforeMetrics = if ($metrics.Success) { $withoutCitations.Substring(0, $metrics.Index).Trim() } else { ($withoutCitations -replace ',?\s*(19|20)\d{2}.*$', '').Trim() }
  $parts1 = Last-SentenceSplit $beforeMetrics
  $veiculo = $parts1[1]
  $titleWithAuthors = $parts1[0]
  # Nome composto observado no Lattes; o ponto pertence ao nome do periódico.
  if ($veiculo -eq "REVISTA NOVAS TECNOLOGIAS NA EDUCAÇÃO" -and $titleWithAuthors -match '\.\s+RENOTE$') {
    $veiculo = "RENOTE. $veiculo"
    $titleWithAuthors = $titleWithAuthors -replace '\.\s+RENOTE$', ''
  }
  if ($veiculo -eq "Notices" -and $titleWithAuthors -match '\.\s+American Mathematical Society$') {
    $veiculo = "American Mathematical Society. $veiculo"
    $titleWithAuthors = $titleWithAuthors -replace '\.\s+American Mathematical Society$', ''
  }
  $titulo = Extract-TitleAfterAuthors $titleWithAuthors
  if (-not $titulo) { $titulo = $withoutCitations }
  return [pscustomobject]@{
    ano = $Ano
    tipo = "periodico"
    titulo = $titulo
    veiculo = $veiculo
    referencia = $Reference
  }
}

function Extract-EventoFields([string]$Reference, [int]$Ano) {
  $withoutCitations = ($Reference -replace '\s*Citações:.*$', '').Trim()
  $inMatch = [regex]::Match($withoutCitations, '\.\s+(In|Em):\s+', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
  $titulo = ""
  $veiculo = ""
  if ($inMatch.Success) {
    $before = $withoutCitations.Substring(0, $inMatch.Index).Trim()
    $after = $withoutCitations.Substring($inMatch.Index + $inMatch.Length).Trim()
    $titulo = Extract-TitleAfterAuthors $before
    $vehicleMatch = [regex]::Match($after, '^(.*?)(?:,\s*(19|20)\d{2}\b|$)')
    if ($vehicleMatch.Success) { $veiculo = $vehicleMatch.Groups[1].Value.Trim() }
  }
  if (-not $titulo) { $titulo = $withoutCitations }
  return [pscustomobject]@{
    ano = $Ano
    tipo = "anais_congressos"
    titulo = $titulo
    veiculo = $veiculo
    referencia = $Reference
  }
}

function Extract-Items([string]$SectionText, [string]$Tipo, [int]$Inicio, [int]$Fim) {
  $items = New-Object System.Collections.Generic.List[object]
  $confirmadosNoCv = [Collections.Generic.HashSet[string]]::new([StringComparer]::OrdinalIgnoreCase)
  if (-not $SectionText) { return @() }
  $section = $SectionText -replace '(?im)^\s*Ordenar por\s*$', ''
  $section = $section -replace '(?im)^\s*Ordem Cronológica\s*$', ''
  # O PDF coloca a numeração à esquerda do texto da referência. Anos,
  # páginas, títulos ("independence number 2.") e DOIs também podem iniciar
  # uma linha; não são novos itens. A numeração real começa em 1 e é contínua.
  # Aceitamos texto na mesma linha do número e o recuo menor de 100., 101., ...
  $candidates = [regex]::Matches($section, '(?m)^(?<indent>[ \t]*)(?<n>\d+)\.(?=[ \t]|\r?$)')
  $first = @($candidates | Where-Object { $_.Groups["n"].Value -eq "1" } | Select-Object -First 1)
  if (-not $first.Count) {
    if ($section.Trim()) { throw "Seção de $Tipo encontrada, mas sem numeração inicial reconhecida. Revise o PDF; não será atribuída produção zero." }
    return @()
  }
  $numberColumn = $first[0].Groups["indent"].Length
  $markers = New-Object System.Collections.Generic.List[object]
  $expectedNumber = 1
  foreach ($candidate in $candidates) {
    if ($candidate.Groups["indent"].Length -gt $numberColumn) { continue }
    if ([int]$candidate.Groups["n"].Value -ne $expectedNumber) {
      throw "Numeração descontínua na seção de ${Tipo}: esperado $expectedNumber, encontrado $($candidate.Groups['n'].Value). Revise o PDF; referências não serão mescladas."
    }
    $markers.Add($candidate)
    $expectedNumber++
  }
  for ($itemIndex = 0; $itemIndex -lt $markers.Count; $itemIndex++) {
    $marker = $markers[$itemIndex]
    $bodyStart = $marker.Index + $marker.Length
    $bodyEnd = if ($itemIndex + 1 -lt $markers.Count) { $markers[$itemIndex + 1].Index } else { $section.Length }
    $reference = Clean-Reference $section.Substring($bodyStart, $bodyEnd - $bodyStart)
    if (-not $reference) { throw "Referência vazia no item $($marker.Groups['n'].Value) de $Tipo. Revise o PDF." }
    $year = Extract-Year $reference
    if (-not $year) {
      throw "Ano bibliográfico não reconhecido no item $($marker.Groups['n'].Value) de $Tipo. Revise a referência; ela não será descartada silenciosamente: $($reference.Substring(0, [Math]::Min(240, $reference.Length)))"
    }
    if ($Tipo -eq "periodico") {
      $item = Extract-PeriodicoFields $reference $year
      $chave = "$($item.titulo)`n$($item.veiculo)"
      if ($anosConfirmados.ContainsKey($chave)) {
        $item.ano = $anosConfirmados[$chave]
        if (-not $confirmadosNoCv.Add($chave)) { continue }
      }
    } else {
      $item = Extract-EventoFields $reference $year
    }
    if ($Inicio -and $item.ano -lt $Inicio) { continue }
    if ($Fim -and $item.ano -gt $Fim) { continue }
    $items.Add($item)
  }
  return $items.ToArray()
}

function Find-DocenteForName([string]$Name, $Docentes, $ByName) {
  $norm = Normalize-Text $Name
  if (-not $norm) { throw "Nome do docente não identificado no PDF Lattes." }
  if ($ByName.ContainsKey($norm)) { return $ByName[$norm] }
  # Um nome abreviado pode ser parte do nome de mais de um docente.
  # Sem correspondência exata não atribua a produção ao primeiro candidato.
  return [pscustomobject]@{
    docente_id = SlugId $Name
    nome = $Name
    lattes_id = ""
    lattes_url = ""
  }
}

function Confirm-LattesIdentity([string]$Text, $Meta, $Docente, [string]$PdfName) {
  $ids = @([regex]::Matches($Text, '(?i)(?:ID\s+Lattes:\s*|lattes\.cnpq\.br/)(\d{16})(?!\d)') |
    ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique)
  if ($ids.Count -ne 1 -or $Meta.LattesId -ne $ids[0]) {
    throw "Identidade Lattes não confirmada em ${PdfName}: é necessário um único ID de 16 dígitos no conteúdo."
  }
  if ($Docente.lattes_id -and $Docente.lattes_id -ne $ids[0]) {
    throw "ID Lattes do PDF $PdfName diverge do cadastro de $($Docente.nome). Confira o arquivo antes de atribuir publicações."
  }
  $contentMeta = Get-LattesMeta $Text "entrada-sem-nome.pdf"
  if (-not $contentMeta.Nome -or (Normalize-Text $contentMeta.Nome) -ne (Normalize-Text $Meta.Nome)) {
    throw "Nome no conteúdo do PDF $PdfName diverge do nome do arquivo, ou não foi reconhecido. Confira a identidade antes de atribuir publicações."
  }
}

function Confirm-LattesPublicationCoverage([string]$Text, [string]$PdfName) {
  $headings = @("Artigos completos publicados em periódicos", "Trabalhos completos publicados em anais de congressos")
  foreach ($heading in $headings) {
    if ([regex]::IsMatch($Text, '(?im)^\s*' + [regex]::Escape($heading) + '\s*$')) { return }
  }
  throw "Nenhuma seção de artigos completos foi reconhecida em $PdfName. A ausência de cabeçalhos não comprova ausência de produção; revise o PDF antes de atualizar a tabela."
}

function Ensure-Record($Records, $Docente, $Meta) {
  $key = if ($Docente.docente_id) { $Docente.docente_id } else { SlugId $Docente.nome }
  if (-not $Records.ContainsKey($key)) {
    $Records[$key] = [pscustomobject]@{
      docente_id = $key
      nome = $Docente.nome
      lattes_id = if ($Docente.lattes_id) { $Docente.lattes_id } else { $Meta.LattesId }
      lattes_url = if ($Docente.lattes_url) { $Docente.lattes_url } else { $Meta.LattesUrl }
      lattes_atualizado_em = $Meta.LattesAtualizadoEm
      periodicos = New-Object System.Collections.Generic.List[object]
      eventos = New-Object System.Collections.Generic.List[object]
    }
  } else {
    if (-not $Records[$key].lattes_id -and $Meta.LattesId) { $Records[$key].lattes_id = $Meta.LattesId }
    if (-not $Records[$key].lattes_url -and $Meta.LattesUrl) { $Records[$key].lattes_url = $Meta.LattesUrl }
    if (-not $Records[$key].lattes_atualizado_em -and $Meta.LattesAtualizadoEm) { $Records[$key].lattes_atualizado_em = $Meta.LattesAtualizadoEm }
  }
  return $Records[$key]
}

function Add-YamlPublicacao($Lines, $Publication, [string]$Fonte, [string]$Indent = "      ") {
  $fieldIndent = "$Indent  "
  $Lines.Add("${Indent}- ano: $($Publication.ano)")
  $Lines.Add("${fieldIndent}tipo: $(Q $Publication.tipo)")
  $Lines.Add("${fieldIndent}titulo: $(Q $Publication.titulo)")
  $Lines.Add("${fieldIndent}veiculo: $(Q $Publication.veiculo)")
  $Lines.Add("${fieldIndent}fonte: $(Q $Fonte)")
  $Lines.Add("${fieldIndent}referencia: $(Q $Publication.referencia)")
}

function Write-PublicationMarkdown($Records, [string]$Tipo, [string]$Title, [string]$OutputPath, [string]$PeriodoTexto, [int]$Inicio, [int]$Fim) {
  $lines = New-Object System.Collections.Generic.List[string]
  $lines.Add("---")
  $lines.Add("title: $(Q $Title)")
  $lines.Add("build:")
  $lines.Add("  render: never")
  $lines.Add("  list: never")
  $lines.Add('fonte: "CVS_LATTES"')
  $lines.Add('gerado_por: "scripts/gerar-publicacoes-lattes.ps1"')
  $lines.Add("atualizado_em: $(Q ([DateTime]::UtcNow.ToString('s') + 'Z'))")
  $lines.Add("periodo_analise: $(Q $PeriodoTexto)")
  if ($Inicio) { $lines.Add("desde_ano: $Inicio") }
  if ($Fim) { $lines.Add("ate_ano: $Fim") }
  $lines.Add("tipo: $(Q $Tipo)")
  $lines.Add("publicacoes_por_docente:")
  foreach ($record in @($Records.Values | Sort-Object nome)) {
    if ($Tipo -eq "periodico") {
      $items = @($record.periodicos | ForEach-Object { $_ })
    } else {
      $items = @($record.eventos | ForEach-Object { $_ })
    }
    $items = @($items | Sort-Object @{Expression="ano";Descending=$true}, titulo)
    $periodicos = if ($Tipo -eq "periodico") { $items.Count } else { 0 }
    $anais = if ($Tipo -eq "anais_congressos") { $items.Count } else { 0 }
    $lines.Add("  - docente_id: $(Q $record.docente_id)")
    $lines.Add("    nome: $(Q $record.nome)")
    $lines.Add("    lattes_id: $(Q $record.lattes_id)")
    $lines.Add("    lattes_url: $(Q $record.lattes_url)")
    $lines.Add("    lattes_atualizado_em: $(if ($record.lattes_atualizado_em) { Q $record.lattes_atualizado_em } else { 'null' })")
    $lines.Add("    total: $($items.Count)")
    $lines.Add("    total_periodicos: $periodicos")
    $lines.Add("    total_anais_congressos: $anais")
    if ($items.Count) {
      $lines.Add("    publicacoes:")
      foreach ($item in $items) { Add-YamlPublicacao $lines $item "CVS_LATTES" "      " }
    } else {
      $lines.Add("    publicacoes: []")
    }
  }
  $lines.Add("publicacoes_sem_docente:")
  $lines.Add("  []")
  $lines.Add("---")
  $lines.Add("")
  $lines.Add("Arquivo gerado automaticamente a partir dos PDFs em `CVS_LATTES`.")

  $targetDir = Split-Path -Parent $OutputPath
  if (-not (Test-Path -LiteralPath $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir | Out-Null
  }
  Set-Content -LiteralPath $OutputPath -Value ($lines -join "`r`n") -Encoding UTF8
}

function Copy-GeneratedFile([string]$Source, [string]$Destination) {
  $dir = Split-Path -Parent $Destination
  if (-not (Test-Path -LiteralPath $dir)) {
    New-Item -ItemType Directory -Path $dir | Out-Null
  }
  Copy-Item -LiteralPath $Source -Destination $Destination -Force
}

function Get-PublicationStopHeadings([string]$Tipo) {
  # Lattes intercala estas seções conforme o conteúdo de cada currículo.
  # O primeiro cabeçalho posterior encerra a lista de artigos completos.
  $headings = @(
    "Artigos aceitos para publicação",
    "Resumos publicados em anais de congressos",
    "Resumos expandidos publicados em anais de congressos",
    "Apresentações de Trabalho",
    "Apresentação de trabalho e palestra",
    "Outras produções bibliográficas",
    "Livros publicados/organizados ou edições",
    "Capítulos de livros publicados",
    "Textos em jornais de notícias/revistas",
    "Produção técnica",
    "Produção artística/cultural",
    "Demais tipos de produção técnica",
    "Eventos",
    "Orientações",
    "Bancas"
  )
  if ($Tipo -eq "periodico") { return @("Trabalhos completos publicados em anais de congressos") + $headings }
  return @("Artigos completos publicados em periódicos") + $headings
}

if ($SomenteFuncoes) { return }

if (-not (Test-Path -LiteralPath $LattesDir)) {
  throw "Diretorio CVS_LATTES nao encontrado: $LattesDir"
}

$periodYears = Parse-PeriodYears $Periodo
if (-not $AnoInicio) { $AnoInicio = $periodYears.Inicio }
if (-not $AnoFim) { $AnoFim = $periodYears.Fim }

$excludedLattesIds = Read-ExcludedLattesIds (Join-Path $root "data\controle\docentes-excluidos.json")
$docentes = @(Read-Docentes $DocentesCsv | Where-Object { -not $excludedLattesIds.Contains([string]$_.lattes_id) })
$byName = @{}
foreach ($docente in $docentes) {
  if ($docente.nome) { $byName[(Normalize-Text $docente.nome)] = $docente }
}

$records = @{}
foreach ($docente in $docentes) {
  [void](Ensure-Record $records $docente ([pscustomobject]@{ LattesId = $docente.lattes_id; LattesUrl = $docente.lattes_url; LattesAtualizadoEm = $null }))
}

$periodicoStops = Get-PublicationStopHeadings "periodico"
$eventoStops = Get-PublicationStopHeadings "anais_congressos"

$pdfs = @(Get-ChildItem -LiteralPath $LattesDir -File -Filter *.pdf | Sort-Object Name)
if (-not $pdfs.Count) {
  throw "Nenhum PDF encontrado em CVS_LATTES: $LattesDir"
}

foreach ($pdf in $pdfs) {
  $raw = Convert-PdfToText $pdf.FullName
  $text = Clean-LattesText $raw
  $meta = Get-LattesMeta $text $pdf.Name
  $docente = Find-DocenteForName $meta.Nome $docentes $byName
  Confirm-LattesIdentity $text $meta $docente $pdf.Name
  # A exclusão é de cadastro, por identidade confirmada; o PDF e referências
  # coautorais existentes nos currículos dos demais docentes são preservados.
  if ($excludedLattesIds.Contains([string]$meta.LattesId)) { continue }
  Confirm-LattesPublicationCoverage $text $pdf.Name
  $record = Ensure-Record $records $docente $meta
  $periodicosSection = Extract-Section $text "Artigos completos publicados em periódicos" $periodicoStops
  $eventosSection = Extract-Section $text "Trabalhos completos publicados em anais de congressos" $eventoStops
  foreach ($item in (Extract-Items $periodicosSection "periodico" $AnoInicio $AnoFim)) { $record.periodicos.Add($item) }
  foreach ($item in (Extract-Items $eventosSection "anais_congressos" $AnoInicio $AnoFim)) { $record.eventos.Add($item) }
}

Write-PublicationMarkdown $records "periodico" "Publicações em periódicos" $PeriodicosMd $Periodo $AnoInicio $AnoFim
Write-PublicationMarkdown $records "anais_congressos" "Eventos e anais de congressos" $ConferenciasMd $Periodo $AnoInicio $AnoFim
Copy-GeneratedFile $PeriodicosMd $PublicacoesMd
Copy-GeneratedFile $ConferenciasMd $EventosMd
Copy-GeneratedFile $PeriodicosMd $StaticPublicacoesMd
Copy-GeneratedFile $ConferenciasMd $StaticEventosMd

$totalPeriodicos = 0
$totalEventos = 0
foreach ($record in $records.Values) {
  $totalPeriodicos += $record.periodicos.Count
  $totalEventos += $record.eventos.Count
}

[pscustomobject]@{
  Fonte = "CVS_LATTES"
  Diretorio = $LattesDir
  Periodo = $Periodo
  AnoInicio = $AnoInicio
  AnoFim = $AnoFim
  Docentes = $records.Count
  ArquivosLattes = $pdfs.Count
  PublicacoesPeriodicos = $totalPeriodicos
  PublicacoesEventos = $totalEventos
  PublicacoesMd = $PublicacoesMd
  EventosMd = $EventosMd
}
