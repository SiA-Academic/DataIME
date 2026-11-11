param(
  [string]$DocentesPath,
  [string]$ConfigPath,
  [string]$PeriodicosPath,
  [string]$ConferenciasPath,
  [string]$OutputPdf,
  [string]$OutputHtml = ""
)

$ErrorActionPreference = "Stop"

if (-not $OutputHtml) {
  $OutputHtml = [IO.Path]::ChangeExtension($OutputPdf, ".html")
}

function Require-File([string]$Path, [string]$Label) {
  if (-not (Test-Path -LiteralPath $Path)) {
    throw "$Label nao encontrado: $Path"
  }
}

function Unquote([string]$Value) {
  if ($null -eq $Value) { return "" }
  $text = ($Value -replace '\s+#.*$', '').Trim()
  if ($text -eq '""') { return "" }
  if ($text.StartsWith('"') -and $text.EndsWith('"')) {
    try { return ($text | ConvertFrom-Json) } catch { return $text.Trim('"') }
  }
  return $text.Trim("'")
}

function Html([object]$Value) {
  return [Net.WebUtility]::HtmlEncode([string]$Value)
}

function Get-Number([object]$Value) {
  if ($null -eq $Value) { return $null }
  if ($Value -is [int] -or $Value -is [double] -or $Value -is [decimal]) { return [double]$Value }
  $match = [regex]::Match([string]$Value, '-?\d+(?:[\.,]\d+)?')
  if (-not $match.Success) { return $null }
  return [double]($match.Value -replace ',', '.')
}

function Get-ValueAtIndent([string]$Text, [int]$Indent, [string]$Key) {
  $pattern = '(?m)^\s{' + $Indent + '}' + [regex]::Escape($Key) + ':\s*(.*?)\s*$'
  $match = [regex]::Match($Text, $pattern)
  if ($match.Success) { return Unquote $match.Groups[1].Value }
  return ""
}

function Get-BoolValue([string]$Value) {
  return (([string]$Value).Trim().ToLowerInvariant() -eq "true")
}

function Normalize-Color([string]$Value) {
  $text = (([string]$Value).Trim().ToLowerInvariant() -replace '\s+', '-')
  if ($text -in @("vermelho", "red", "vermelho-escuro", "dark-red", "darkred")) { return "red" }
  if ($text -in @("amarelo", "yellow")) { return "yellow" }
  if ($text -in @("verde", "green")) { return "green" }
  return ""
}

function Read-Ranges([string]$ConfigText) {
  $result = @{}
  $keys = @(
    "ativo",
    "desligado",
    "evasao",
    "tempo_medio_mestrado",
    "tempo_medio_doutorado",
    "tempo_medio_doutorado_direto",
    "publicacoes",
    "disciplinas",
    "credenciamento_vencimento_meses"
  )
  foreach ($key in $keys) {
    $section = [regex]::Match($ConfigText, '(?ms)^\s{4}' + [regex]::Escape($key) + ':\r?\n(?<body>.*?)(?=^\s{4}[a-zA-Z_].*?:|^---\s*$|\z)')
    $items = New-Object System.Collections.Generic.List[object]
    if ($section.Success) {
      $entries = [regex]::Matches($section.Groups["body"].Value, '(?ms)^\s{6}-\s+min:.*?(?=^\s{6}-\s+min:|\z)')
      foreach ($entry in $entries) {
        $minMatch = [regex]::Match($entry.Value, '(?m)^\s*-\s*min:\s*(.*?)\s*$')
        $maxMatch = [regex]::Match($entry.Value, '(?m)^\s*max:\s*(.*?)\s*$')
        $corMatch = [regex]::Match($entry.Value, '(?m)^\s*cor:\s*(.*?)\s*$')
        $items.Add([pscustomobject]@{
          Min = if ($minMatch.Success) { Get-Number (Unquote $minMatch.Groups[1].Value) } else { $null }
          Max = if ($maxMatch.Success) { Get-Number (Unquote $maxMatch.Groups[1].Value) } else { $null }
          Cor = if ($corMatch.Success) { Normalize-Color (Unquote $corMatch.Groups[1].Value) } else { "" }
        })
      }
    }
    $result[$key] = $items.ToArray()
  }
  return $result
}

function Get-Range([hashtable]$Ranges, [string]$Key, [object]$Value) {
  $number = Get-Number $Value
  if ($null -eq $number -or -not $Ranges.ContainsKey($Key)) { return $null }
  foreach ($range in $Ranges[$Key]) {
    $afterMin = ($null -eq $range.Min) -or ($number -ge $range.Min)
    $beforeMax = ($null -eq $range.Max) -or ($number -le $range.Max)
    if ($afterMin -and $beforeMax) { return $range }
  }
  return $null
}

function Get-Score([hashtable]$Ranges, [string]$Key, [object]$Value) {
  $range = Get-Range $Ranges $Key $Value
  if ($range) { return $range.Cor }
  return ""
}

function Is-AlertScore([string]$Score) {
  return $Score -in @("red", "yellow")
}

function Format-Value([object]$Value, [string]$Unit = "") {
  $number = Get-Number $Value
  if ($null -eq $number) { return "-" }
  $text = if ([math]::Abs($number - [math]::Round($number)) -lt 0.0001) { [string][int][math]::Round($number) } else { "{0:N1}" -f $number }
  if (-not $Unit) { return $text }
  if ($Unit -eq "%") { return "$text%" }
  return "$text $Unit"
}

function Format-Range([object]$Range, [string]$Unit = "") {
  if (-not $Range) { return "regra configurada" }
  if ($null -ne $Range.Min -and $null -ne $Range.Max) { return "$(Format-Value $Range.Min $Unit) a $(Format-Value $Range.Max $Unit)" }
  if ($null -ne $Range.Min) { return ">= $(Format-Value $Range.Min $Unit)" }
  if ($null -ne $Range.Max) { return "<= $(Format-Value $Range.Max $Unit)" }
  return "sem limite numerico"
}

function Alert-Detail([hashtable]$Ranges, [string]$Key, [object]$Value, [string]$Label, [string]$Unit = "", [string]$Extra = "") {
  $range = Get-Range $Ranges $Key $Value
  $score = if ($range) { $range.Cor } else { "" }
  $rangeLabel = if ($score -eq "red") { "limite critico" } elseif ($score -eq "yellow") { "faixa de atencao" } else { "faixa configurada" }
  $parts = New-Object System.Collections.Generic.List[string]
  $parts.Add("${Label}: $(Format-Value $Value $Unit)")
  $parts.Add("${rangeLabel}: $(Format-Range $range $Unit)")
  if ($Extra) { $parts.Add($Extra) }
  return ($parts -join "; ")
}

function Green-Bounds([hashtable]$Ranges, [string]$Key) {
  $green = @($Ranges[$Key] | Where-Object { $_.Cor -eq "green" })
  $mins = @($green | Where-Object { $null -ne $_.Min } | ForEach-Object { $_.Min })
  $maxes = @($green | Where-Object { $null -ne $_.Max } | ForEach-Object { $_.Max })
  return [pscustomobject]@{
    Min = if ($mins.Count) { ($mins | Measure-Object -Minimum).Minimum } else { $null }
    Max = if ($maxes.Count) { ($maxes | Measure-Object -Maximum).Maximum } else { $null }
  }
}

function Read-AreaMap([string]$ConfigText) {
  $map = @{}
  $section = [regex]::Match($ConfigText, '(?ms)^docentes_areas:\r?\n(?<body>.*?)(?=^resumo_docentes:|^[a-zA-Z_][\w-]*:|^---\s*$|\z)')
  if (-not $section.Success) { return $map }
  $entries = [regex]::Matches($section.Groups["body"].Value, '(?ms)^\s+-\s+docente_id:.*?(?=^\s+-\s+docente_id:|\z)')
  foreach ($entry in $entries) {
    $idMatch = [regex]::Match($entry.Value, '(?m)^\s*-\s*docente_id:\s*(.*?)\s*$')
    $areaMatch = [regex]::Match($entry.Value, '(?m)^\s*area:\s*(.*?)\s*$')
    if ($idMatch.Success) {
      $id = Unquote $idMatch.Groups[1].Value
      $area = if ($areaMatch.Success) { Unquote $areaMatch.Groups[1].Value } else { "" }
      $map[$id] = $area
    }
  }
  return $map
}

function Read-PublicationTotals([string]$Path, [string]$TotalKey) {
  $map = @{}
  if (-not (Test-Path -LiteralPath $Path)) { return $map }
  $text = Get-Content -LiteralPath $Path -Raw
  $entries = [regex]::Matches($text, '(?ms)^\s+-\s+docente_id:.*?(?=^\s+-\s+docente_id:|^publicacoes_sem_docente:|^---\s*$|\z)')
  foreach ($entry in $entries) {
    $idMatch = [regex]::Match($entry.Value, '(?m)^\s*-\s*docente_id:\s*(.*?)\s*$')
    $totalMatch = [regex]::Match($entry.Value, '(?m)^\s*' + [regex]::Escape($TotalKey) + ':\s*(.*?)\s*$')
    if ($idMatch.Success) {
      $id = Unquote $idMatch.Groups[1].Value
      $total = if ($totalMatch.Success) { [int](Get-Number (Unquote $totalMatch.Groups[1].Value)) } else { 0 }
      $map[$id] = $total
    }
  }
  return $map
}

function Read-DisciplineInfo([string]$DocenteBlock) {
  $section = [regex]::Match($DocenteBlock, '(?ms)^\s{4}disciplinas:\r?\n(?<body>.*?)(?=^\s{4}[a-zA-Z_].*?:|\z)')
  if (-not $section.Success) {
    return [pscustomobject]@{ Total = $null; Periodo = "" }
  }
  $body = $section.Groups["body"].Value
  $totalMatch = [regex]::Match($body, '(?m)^\s{6}total:\s*(.*?)\s*$')
  $periodoMatch = [regex]::Match($body, '(?m)^\s{6}periodo_pdf:\s*(.*?)\s*$')
  return [pscustomobject]@{
    Total = if ($totalMatch.Success) { Get-Number (Unquote $totalMatch.Groups[1].Value) } else { $null }
    Periodo = if ($periodoMatch.Success) { Unquote $periodoMatch.Groups[1].Value } else { "" }
  }
}

function Parse-DateValue([string]$Value) {
  $text = ([string]$Value).Trim()
  if (-not $text) { return $null }
  $iso = [regex]::Match($text, '^(\d{4})-(\d{2})-(\d{2})$')
  if ($iso.Success) {
    return [datetime]::new([int]$iso.Groups[1].Value, [int]$iso.Groups[2].Value, [int]$iso.Groups[3].Value)
  }
  $br = [regex]::Match($text, '^(\d{2})/(\d{2})/(\d{4})$')
  if ($br.Success) {
    return [datetime]::new([int]$br.Groups[3].Value, [int]$br.Groups[2].Value, [int]$br.Groups[1].Value)
  }
  return $null
}

function Months-Until([datetime]$Date) {
  if (-not $Date) { return $null }
  $now = Get-Date
  $months = (($Date.Year - $now.Year) * 12) + ($Date.Month - $now.Month)
  if ($Date.Day -lt $now.Day) { $months -= 1 }
  return $months
}

function Get-CredentialEndDates([string]$DocenteBlock) {
  $dates = New-Object System.Collections.Generic.List[datetime]
  $entries = [regex]::Matches($DocenteBlock, '(?ms)^\s{8}-\s+curso:.*?(?=^\s{8}-\s+curso:|^\s{4}[a-zA-Z_].*?:|^  - id:|\z)')
  foreach ($entry in $entries) {
    $date = Parse-DateValue (Get-ValueAtIndent $entry.Value 10 "data_final")
    if ($date) { $dates.Add($date) }
  }
  return $dates.ToArray()
}

function Credential-ExpirationSummary([string]$DocenteBlock) {
  $dates = @(Get-CredentialEndDates $DocenteBlock)
  if (-not $dates.Count) {
    return [pscustomobject]@{ HasData = $false; Date = $null; Months = $null; ScoreValue = $null; Expired = $false; Label = "" }
  }
  $today = (Get-Date).Date
  $futureDates = @($dates | Where-Object { $_.Date -ge $today } | Sort-Object)
  $date = if ($futureDates.Count) { $futureDates[0] } else { @($dates | Sort-Object -Descending)[0] }
  $months = Months-Until $date
  return [pscustomobject]@{
    HasData = $true
    Date = $date
    Months = $months
    ScoreValue = [math]::Max(0, $months)
    Expired = ($months -lt 0)
    Label = $date.ToString("dd/MM/yyyy")
  }
}
function Get-StudentBlocks([string]$DocenteBlock) {
  return [regex]::Matches($DocenteBlock, '(?ms)^\s{8}-\s+nusp:.*?(?=^\s{8}-\s+nusp:|^\s{4}[a-zA-Z_].*?:|^  - id:|\z)')
}

function Get-EvasionStudentCount([string]$Janus, $Total) {
  $students = @(Get-StudentBlocks $Janus)
  if ($null -eq $Total -or $students.Count -ne $Total) { return $Total }
  $identities = @{}
  foreach ($student in $students) {
    $nusp = Unquote ([regex]::Match($student.Value, '(?m)^ {8}- nusp:[ \t]*(.*?)\r?$').Groups[1].Value)
    if ($nusp) {
      $identities["nusp:$nusp"] = $true
    } else {
      $name = (Get-ValueAtIndent $student.Value 10 "nome") -replace '\s+', ' '
      if (-not $name) { return $Total }
      $identities["nome:$name"] = $true
    }
  }
  return $identities.Count
}

function Count-Students([string]$DocenteBlock, [string]$Category, [int]$StartYear = 0) {
  $count = 0
  foreach ($student in Get-StudentBlocks $DocenteBlock) {
    $cat = Get-ValueAtIndent $student.Value 10 "categoria"
    if ($cat -ne $Category) { continue }
    if ($StartYear -gt 0) {
      $date = Get-ValueAtIndent $student.Value 10 "data_situacao"
      $yearMatch = [regex]::Match($date, '\b(20\d{2})\b')
      if (-not $yearMatch.Success -or [int]$yearMatch.Groups[1].Value -lt $StartYear) { continue }
    }
    $count++
  }
  return $count
}

function Credential-Label([string]$Category) {
  if ($Category -eq "pleno") { return "Pleno" }
  if ($Category -eq "especifico") { return "Especifico" }
  if ($Category -eq "vencido_com_orientando") { return "Vencido com orientando" }
  return "Sem credenciamento"
}

function Credential-Rank([string]$Category) {
  if ($Category -eq "pleno") { return 1 }
  if ($Category -eq "especifico") { return 2 }
  if ($Category -eq "vencido_com_orientando") { return 3 }
  return 4
}

function Severity-Rank([string]$Level) {
  if ($Level -eq "red") { return 2 }
  if ($Level -eq "yellow") { return 1 }
  return 0
}

function Add-Alert($List, [string]$Level, [string]$Text, [string]$Detail) {
  $List.Add([pscustomobject]@{
    Level = $Level
    Text = $Text
    Detail = $Detail
  })
}

function Find-Browser {
  foreach ($name in @("chrome", "msedge", "chromium")) {
    $cmd = Get-Command $name -ErrorAction SilentlyContinue
    if ($cmd) { return $cmd.Source }
  }
  $paths = @(
    (Join-Path $env:ProgramFiles "Google\Chrome\Application\chrome.exe"),
    (Join-Path ${env:ProgramFiles(x86)} "Google\Chrome\Application\chrome.exe"),
    (Join-Path $env:ProgramFiles "Microsoft\Edge\Application\msedge.exe"),
    (Join-Path ${env:ProgramFiles(x86)} "Microsoft\Edge\Application\msedge.exe")
  )
  foreach ($path in $paths) {
    if ($path -and (Test-Path -LiteralPath $path)) { return $path }
  }
  return ""
}

function Convert-HtmlToPdf([string]$HtmlPath, [string]$PdfPath) {
  $browser = Find-Browser
  if (-not $browser) {
    throw "Nao foi possivel gerar o PDF: Edge/Chrome nao encontrado."
  }
  $pdfFullPath = [IO.Path]::GetFullPath($PdfPath)
  if (Test-Path -LiteralPath $pdfFullPath) {
    Remove-Item -LiteralPath $pdfFullPath -Force
  }
  $profile = Join-Path ([IO.Path]::GetTempPath()) ("controle-relatorio-alertas-" + [guid]::NewGuid().ToString("N"))
  New-Item -ItemType Directory -Path $profile | Out-Null
  try {
    $htmlUri = (New-Object Uri ((Resolve-Path -LiteralPath $HtmlPath).Path)).AbsoluteUri
    $args = @(
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--allow-file-access-from-files",
      "--no-pdf-header-footer",
      "--user-data-dir=$profile",
      "--print-to-pdf=$pdfFullPath",
      $htmlUri
    )
    $processInfo = New-Object System.Diagnostics.ProcessStartInfo
    $processInfo.FileName = $browser
    $processInfo.Arguments = (($args | ForEach-Object { '"' + ($_ -replace '"', '\"') + '"' }) -join " ")
    $processInfo.UseShellExecute = $false
    $processInfo.CreateNoWindow = $true
    $processInfo.RedirectStandardOutput = $true
    $processInfo.RedirectStandardError = $true
    $process = [System.Diagnostics.Process]::Start($processInfo)
    $stdout = $process.StandardOutput.ReadToEnd()
    $stderr = $process.StandardError.ReadToEnd()
    $process.WaitForExit()
    if ($process.ExitCode -ne 0) {
      throw "Navegador retornou codigo $($process.ExitCode) ao imprimir o PDF. $stderr $stdout"
    }
  } finally {
    $profileFull = [IO.Path]::GetFullPath($profile)
    $tempRootFull = [IO.Path]::GetFullPath([IO.Path]::GetTempPath()).TrimEnd('\', '/')
    if (-not $profileFull.StartsWith($tempRootFull + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase) -or [IO.Path]::GetFileName($profileFull) -notmatch '^controle-relatorio-alertas-[0-9a-f]{32}$') {
      throw "Recusa ao remover perfil temporário fora do diretório esperado: $profileFull"
    }
    Remove-Item -LiteralPath $profile -Recurse -Force -ErrorAction SilentlyContinue
  }
  if (-not (Test-Path -LiteralPath $pdfFullPath) -or (Get-Item -LiteralPath $pdfFullPath).Length -lt 1000) {
    throw "PDF nao foi criado corretamente: $PdfPath"
  }
}

Require-File $DocentesPath "Base de docentes"
Require-File $ConfigPath "Configuracoes"
Require-File $PeriodicosPath "Publicacoes em periodicos"
Require-File $ConferenciasPath "Publicacoes em conferencias"

$docentesText = Get-Content -LiteralPath $DocentesPath -Raw
$configText = Get-Content -LiteralPath $ConfigPath -Raw
$ranges = Read-Ranges $configText
$areaMap = Read-AreaMap $configText
$periodicos = Read-PublicationTotals $PeriodicosPath "total_periodicos"
$anais = Read-PublicationTotals $ConferenciasPath "total_anais_congressos"

$periodoMatch = [regex]::Match($docentesText, '(?m)^ {6}periodo_pdf:\s*"?(\d{2}/\d{2}/(\d{4})\s+a\s+\d{2}/\d{2}/\d{4})"?\s*$')
$periodo = if ($periodoMatch.Success) { $periodoMatch.Groups[1].Value } else { "periodo nao informado" }
$startYear = if ($periodoMatch.Success) { [int]$periodoMatch.Groups[2].Value } else { 2025 }

$items = New-Object System.Collections.Generic.List[object]
$docenteBlocks = [regex]::Matches($docentesText, '(?ms)^  - id:.*?(?=^  - id:|^---\s*$|\z)')
foreach ($docenteBlock in $docenteBlocks) {
  $block = $docenteBlock.Value
  $idMatch = [regex]::Match($block, '(?m)^\s+-\s*id:\s*(.*?)\s*$')
  if (-not $idMatch.Success) { continue }
  $id = Unquote $idMatch.Groups[1].Value
  $nome = Get-ValueAtIndent $block 4 "nome"
  $area = if ($areaMap.ContainsKey($id)) { $areaMap[$id] } else { "" }
  $cred = Get-ValueAtIndent $block 6 "categoria"
  if ($cred -eq "sem_credenciamento") { continue }
  if (-not $area) { $area = "Sem área" }

  $recent = Get-BoolValue (Get-ValueAtIndent $block 6 "entrada_recente")
  $orientandosRaw = Get-ValueAtIndent $block 6 "orientandos_area"
  $orientandos = Get-Number $orientandosRaw
  $ativosTabela = Count-Students $block "ativo"
  $tituladosRecentes = Count-Students $block "titulado" $startYear
  $janus = [regex]::Match($block, '(?ms)^ {4}janus:\r?\n(.*?)(?=^ {4}\S|\z)').Groups[1].Value
  $totalJanus = Get-Number (Get-ValueAtIndent $janus 6 "total")
  $titulados = Get-Number (Get-ValueAtIndent $janus 6 "titulados")
  $desligados = Get-Number (Get-ValueAtIndent $janus 6 "desligados")
  if ($null -eq $totalJanus -and $null -ne $orientandos -and $null -ne $titulados -and $null -ne $desligados) {
    $totalJanus = $orientandos + $titulados + $desligados
  }
  $totalAlunos = Get-EvasionStudentCount $janus $totalJanus
  $evasao = $null
  $evasaoTexto = "Sem dados"
  if ($null -ne $totalAlunos -and $totalAlunos -lt 3) {
    $evasaoTexto = "Não se aplica (menos de 3 alunos)"
  } elseif ($totalAlunos -ge 3 -and $null -ne $titulados -and $null -ne $desligados) {
    if (($titulados + $desligados) -eq 0) {
      $evasaoTexto = "Sem orientações encerradas"
    } else {
      $evasao = Get-Number (Get-ValueAtIndent $janus 6 "taxa_evasao")
      if ($null -ne $evasao) { $evasaoTexto = Format-Value $evasao "%" }
    }
  }
  if ($null -eq $desligados) { $desligados = Count-Students $block "desligado" }
  $tempoMe = Get-Number (Get-ValueAtIndent $block 6 "tempo_medio_mestrado")
  $tempoDo = Get-Number (Get-ValueAtIndent $block 6 "tempo_medio_doutorado")
  $tempoDd = Get-Number (Get-ValueAtIndent $block 6 "tempo_medio_doutorado_direto")
  $periodicosTotal = if ($periodicos.ContainsKey($id)) { $periodicos[$id] } else { 0 }
  $anaisTotal = if ($anais.ContainsKey($id)) { $anais[$id] } else { 0 }
  $publicacoesTotal = $periodicosTotal + $anaisTotal
  $disciplinas = Read-DisciplineInfo $block
  $credentialExpiration = Credential-ExpirationSummary $block

  $alerts = New-Object System.Collections.Generic.List[object]
  if (-not $recent) {
    if ($null -eq $orientandos) {
      Add-Alert $alerts "yellow" "alunos ativos pendente" "orientandos ativos sem total informado no Janus; tabela mostra $ativosTabela ativos"
    } else {
      $score = Get-Score $ranges "ativo" $orientandos
      if (Is-AlertScore $score) {
        $bounds = Green-Bounds $ranges "ativo"
        $text = if ($null -ne $bounds.Max -and $orientandos -gt $bounds.Max) { "muitos alunos" } elseif ($null -ne $bounds.Min -and $orientandos -lt $bounds.Min) { "poucos alunos" } else { "alunos ativos em atencao" }
        Add-Alert $alerts $score $text (Alert-Detail $ranges "ativo" $orientandos "orientandos ativos")
      }
    }

    foreach ($tuple in @(
      @("desligado", $desligados, "muitos desligamentos", "desligamentos", ""),
      @("evasao", $evasao, "evasao alta", "evasao", "%"),
      @("tempo_medio_mestrado", $tempoMe, "tempo medio ME alto", "tempo medio ME", "meses"),
      @("tempo_medio_doutorado", $tempoDo, "tempo medio DO alto", "tempo medio DO", "meses"),
      @("tempo_medio_doutorado_direto", $tempoDd, "tempo medio DD alto", "tempo medio DD", "meses")
    )) {
      $key = $tuple[0]
      $value = $tuple[1]
      if ($null -eq $value) { continue }
      $score = Get-Score $ranges $key $value
      if (Is-AlertScore $score) {
        Add-Alert $alerts $score $tuple[2] (Alert-Detail $ranges $key $value $tuple[3] $tuple[4])
      }
    }
  }

  $publicationScore = Get-Score $ranges "publicacoes" $publicacoesTotal
  if (Is-AlertScore $publicationScore) {
    Add-Alert $alerts $publicationScore "poucas publicacoes" (Alert-Detail $ranges "publicacoes" $publicacoesTotal "periodicos + anais" "" "periodicos: $periodicosTotal; anais: $anaisTotal")
  }
  if (-not $recent -and $null -ne $disciplinas.Total) {
    $disciplineScore = Get-Score $ranges "disciplinas" $disciplinas.Total
    if (Is-AlertScore $disciplineScore) {
      $disciplineExtra = if ($disciplinas.Periodo) { "periodo: $($disciplinas.Periodo)" } else { "periodo do PDF de disciplinas" }
      Add-Alert $alerts $disciplineScore "poucas disciplinas" (Alert-Detail $ranges "disciplinas" $disciplinas.Total "turmas ministradas" "" $disciplineExtra)
    }
  }
  if ($credentialExpiration.HasData) {
    $credentialExpirationScore = if ($credentialExpiration.Expired) { "red" } else { Get-Score $ranges "credenciamento_vencimento_meses" $credentialExpiration.ScoreValue }
    if (Is-AlertScore $credentialExpirationScore) {
      $credentialExpirationExtra = if ($credentialExpiration.Expired) { "fim: $($credentialExpiration.Label); credenciamento vencido" } else { "fim: $($credentialExpiration.Label)" }
      $credentialExpirationText = if ($credentialExpiration.Expired) { "credenciamento vencido" } else { "credenciamento a vencer" }
      Add-Alert $alerts $credentialExpirationScore $credentialExpirationText (Alert-Detail $ranges "credenciamento_vencimento_meses" $credentialExpiration.ScoreValue "meses ate o fim do credenciamento" "meses" $credentialExpirationExtra)
    }
  }

  if ($alerts.Count) {
    $level = if (@($alerts | Where-Object { $_.Level -eq "red" }).Count) { "red" } else { "yellow" }
    $items.Add([pscustomobject]@{
      Id = $id
      Nome = $nome
      Area = $area
      Credenciamento = Credential-Label $cred
      CredenciamentoRank = Credential-Rank $cred
      Level = $level
      Alerts = $alerts.ToArray()
      Orientandos = if ($null -eq $orientandos) { "-" } else { [int]$orientandos }
      Titulacoes = $tituladosRecentes
      Desligados = [int]$desligados
      Evasao = $evasaoTexto
      Tempo = "ME $(Format-Value $tempoMe "meses") / DO $(Format-Value $tempoDo "meses") / DD $(Format-Value $tempoDd "meses")"
      Publicacoes = "$publicacoesTotal total ($periodicosTotal periodicos, $anaisTotal anais)"
      Disciplinas = if ($null -eq $disciplinas.Total) { "-" } elseif ($disciplinas.Periodo) { "$($disciplinas.Total) turmas ($($disciplinas.Periodo))" } else { "$($disciplinas.Total) turmas" }
      CredenciamentoFim = if ($credentialExpiration.HasData) { if ($credentialExpiration.Expired) { "vencido em $($credentialExpiration.Label)" } else { "$($credentialExpiration.ScoreValue) meses ($($credentialExpiration.Label))" } } else { "-" }
    })
  }
}

$orderedItems = @($items | Sort-Object @{ Expression = { -(Severity-Rank $_.Level) } }, CredenciamentoRank, Area, Nome)
$criticos = @($orderedItems | Where-Object { $_.Level -eq "red" }).Count
$atencao = @($orderedItems | Where-Object { $_.Level -eq "yellow" }).Count
$alertCount = @($orderedItems | ForEach-Object { $_.Alerts.Count } | Measure-Object -Sum).Sum
if ($null -eq $alertCount) { $alertCount = 0 }

$targetDir = Split-Path -Parent $OutputPdf
if (-not (Test-Path -LiteralPath $targetDir)) {
  New-Item -ItemType Directory -Path $targetDir | Out-Null
}

$now = Get-Date -Format "dd/MM/yyyy HH:mm"
$html = New-Object System.Text.StringBuilder
[void]$html.AppendLine('<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">')
[void]$html.AppendLine('<title>SIADoce — Resumo dos docentes com alertas</title>')
[void]$html.AppendLine('<style>')
[void]$html.AppendLine('@page{size:A4;margin:12mm}*{box-sizing:border-box}body{margin:0;color:#17213a;background:#fff;font-family:Aptos,"Segoe UI",Arial,sans-serif;font-size:11px;line-height:1.42}header{position:relative;overflow:hidden;padding:13px 15px 12px;margin-bottom:14px;color:#fff;background:linear-gradient(125deg,#08132f,#142d69 68%,#174c82);border-radius:10px}header:after{position:absolute;width:120px;height:120px;right:-62px;bottom:-74px;border:1px solid rgba(255,255,255,.18);border-radius:50%;box-shadow:0 0 0 24px rgba(255,255,255,.025);content:""}.report-brand{margin:0 0 4px;color:#9ed7e4;font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase}h1,h2,h3{font-family:"Palatino Linotype","Book Antiqua",Palatino,Georgia,serif;font-weight:400}h1{position:relative;z-index:1;margin:0 0 4px;color:#fff;font-size:24px;line-height:1.08}h2{margin:19px 0 8px;color:#0d1d45;font-size:16px;break-after:avoid}.muted{color:#59657a}header .muted{position:relative;z-index:1;color:rgba(255,255,255,.74)}.summary{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:10px 0 15px}.summary div{padding:9px;background:#eef3fa;border:1px solid #d9dee8;border-top:3px solid #0064a0;border-radius:8px}.summary div:nth-child(2){border-top-color:#82143c}.summary div:nth-child(3){border-top-color:#e6af3c}.summary div:nth-child(4){border-top-color:#087487}.summary strong{display:block;color:#0d1d45;font-family:"Palatino Linotype","Book Antiqua",Palatino,Georgia,serif;font-size:21px;font-weight:400}.summary span{color:#59657a;font-size:9px;font-weight:700;letter-spacing:.05em;text-transform:uppercase}.teacher{break-inside:avoid;margin:0 0 9px;padding:10px;background:#fff;border:1px solid #d9dee8;border-left:5px solid #e6af3c;border-radius:8px}.teacher.red{border-left-color:#82143c}.teacher-head{display:flex;justify-content:space-between;gap:10px;align-items:flex-start;margin-bottom:7px}.teacher h3{margin:0;color:#0d1d45;font-size:14px}.chips{display:flex;flex-wrap:wrap;gap:5px;justify-content:flex-end}.chip{padding:2px 7px;color:#59657a;background:#f4f6f9;border:1px solid #d9dee8;border-radius:999px;font-size:8.5px;white-space:nowrap}.chip.red{color:#76233f;background:#f5e7ec;border-color:#d9aabb}.chip.yellow{color:#75550c;background:#fbf2db;border-color:#ead49b}.metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin:6px 0 8px}.metric{padding:5px;background:#f4f6f9;border:1px solid #e8ebf0;border-radius:6px}.metric b{display:block;color:#0d1d45}.alerts{display:grid;gap:5px}.alert{display:grid;grid-template-columns:110px 1fr;gap:7px;align-items:start;padding-top:5px;border-top:1px solid #e8ebf0}.tag{padding:2px 7px;border-radius:999px;font-size:8.5px;font-weight:700;text-align:center;text-transform:uppercase}.tag.red{color:#76233f;background:#f5e7ec;border:1px solid #d9aabb}.tag.yellow{color:#75550c;background:#fbf2db;border:1px solid #ead49b}.empty{padding:16px;color:#59657a;text-align:center;border:1px solid #d9dee8;border-radius:8px}.footer{margin-top:4px;padding-top:4px;color:#59657a;border-top:1px solid #d9dee8;font-size:9px}')
[void]$html.AppendLine('</style></head><body>')
[void]$html.AppendLine('<header>')
[void]$html.AppendLine('<p class="report-brand">SIADoce · Sistema de Informações Acadêmicas – Docentes</p>')
[void]$html.AppendLine('<h1>Resumo dos docentes com alertas</h1>')
[void]$html.AppendLine("<div class=""muted"">Periodo Janus: $(Html $periodo) &middot; Gerado em $(Html $now)</div>")
[void]$html.AppendLine('</header>')
[void]$html.AppendLine('<section class="summary">')
[void]$html.AppendLine("<div><span>Docentes com alerta</span><strong>$($orderedItems.Count)</strong></div>")
[void]$html.AppendLine("<div><span>Criticos</span><strong>$criticos</strong></div>")
[void]$html.AppendLine("<div><span>Atencao</span><strong>$atencao</strong></div>")
[void]$html.AppendLine("<div><span>Alertas listados</span><strong>$alertCount</strong></div>")
[void]$html.AppendLine('</section>')

foreach ($group in @(
  @{ Title = "Alertas criticos"; Level = "red" },
  @{ Title = "Alertas de atencao"; Level = "yellow" }
)) {
  $groupItems = @($orderedItems | Where-Object { $_.Level -eq $group.Level })
  if (-not $groupItems.Count) { continue }
    [void]$html.AppendLine("<h2>$(Html $group.Title)</h2>")
  foreach ($item in $groupItems) {
    [void]$html.AppendLine("<article class=""teacher $($item.Level)"">")
    [void]$html.AppendLine('<div class="teacher-head">')
    [void]$html.AppendLine("<div><h3>$(Html $item.Nome)</h3><div class=""muted"">$(Html $item.Area) &middot; $(Html $item.Credenciamento)</div></div>")
    [void]$html.AppendLine('<div class="chips">')
    foreach ($alert in $item.Alerts) {
      [void]$html.AppendLine("<span class=""chip $($alert.Level)"">$(Html $alert.Text)</span>")
    }
    [void]$html.AppendLine('</div></div>')
    [void]$html.AppendLine('<div class="metrics">')
    [void]$html.AppendLine("<div class=""metric""><b>Orientandos</b>$(Html $item.Orientandos)</div>")
    [void]$html.AppendLine("<div class=""metric""><b>Titulacoes</b>$(Html $item.Titulacoes)</div>")
    [void]$html.AppendLine("<div class=""metric""><b>Desligamentos</b>$(Html $item.Desligados)</div>")
    [void]$html.AppendLine("<div class=""metric""><b>Evasao</b>$(Html $item.Evasao)</div>")
    [void]$html.AppendLine("<div class=""metric""><b>Tempo medio</b>$(Html $item.Tempo)</div>")
    [void]$html.AppendLine("<div class=""metric""><b>Publicacoes</b>$(Html $item.Publicacoes)</div>")
    [void]$html.AppendLine("<div class=""metric""><b>Disciplinas</b>$(Html $item.Disciplinas)</div>")
    [void]$html.AppendLine("<div class=""metric""><b>Credenciamento</b>$(Html $item.CredenciamentoFim)</div>")
    [void]$html.AppendLine('</div><div class="alerts">')
    foreach ($alert in $item.Alerts) {
      [void]$html.AppendLine("<div class=""alert""><span class=""tag $($alert.Level)"">$(Html $alert.Text)</span><span>$(Html $alert.Detail)</span></div>")
    }
    [void]$html.AppendLine('</div></article>')
  }
}

if (-not $orderedItems.Count) {
  [void]$html.AppendLine('<div class="empty">Nenhum docente com alerta nos dados atuais.</div>')
}

[void]$html.AppendLine('<div class="footer">Relatório gerado automaticamente pelo SIADoce a partir das bases Janus, Titulados (Lista de teses e dissertações), Orientadores, Disciplinas, Configurações e Currículos Lattes.</div>')
[void]$html.AppendLine('</body></html>')

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[IO.File]::WriteAllText($OutputHtml, $html.ToString(), $utf8NoBom)
Convert-HtmlToPdf $OutputHtml $OutputPdf

[pscustomobject]@{
  Pdf = $OutputPdf
  Html = $OutputHtml
  DocentesComAlerta = $orderedItems.Count
  Criticos = $criticos
  Atencao = $atencao
  Alertas = $alertCount
}
