param(
  [string]$Programa = "USP",
  [string]$ConfigBase = "",
  [string]$AreasMd = "",
  [string]$JanusPdf = "",
  [string]$OrientadoresPdf = "",
  [string]$DisciplinasPdf = "",
  [string]$LattesDir = "",
  [string]$LattesDocentesCsv = ""
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$staticDir = Join-Path $root "static"
$contentControle = Join-Path $root "content\controle"

if ($Programa -notin @("USP", "Federal")) {
  throw "Programa invalido: $Programa. Use USP ou Federal."
}
if ($Programa -eq "Federal") {
  throw "Fluxo para programas federais ainda nao implementado. Por enquanto, selecione USP."
}

function First-ExistingPath([string[]]$Paths, [string]$Fallback) {
  foreach ($path in $Paths) {
    if ($path -and (Test-Path -LiteralPath $path)) { return $path }
  }
  return $Fallback
}

if (-not $AreasMd -and (Test-Path -LiteralPath (Join-Path $staticDir "areas.md"))) { $AreasMd = Join-Path $staticDir "areas.md" }
if (-not $ConfigBase) {
  $configCandidates = if ($AreasMd) {
    @((Join-Path $staticDir "configuracoes.md"), (Join-Path $staticDir "configuracoes_padrao.md"))
  } else {
    @((Join-Path $staticDir "configuracoes_padrao.md"), (Join-Path $staticDir "configuracoes.md"))
  }
  $ConfigBase = First-ExistingPath $configCandidates (Join-Path $staticDir "configuracoes.md")
}
if (-not $JanusPdf) { $JanusPdf = Join-Path $staticDir "janus.pdf" }
if (-not $OrientadoresPdf) { $OrientadoresPdf = Join-Path $staticDir "orientadores.pdf" }
if (-not $DisciplinasPdf) { $DisciplinasPdf = Join-Path $staticDir "disciplinas.pdf" }
if (-not $LattesDir) { $LattesDir = Join-Path $staticDir "CVS_LATTES" }
if (-not $LattesDocentesCsv) { $LattesDocentesCsv = Join-Path $contentControle "lattes-docentes.csv" }

$contentConfig = Join-Path $contentControle "configuracoes.md"
$contentDocentes = Join-Path $contentControle "docentes.md"
$contentAlunosAtivos = Join-Path $contentControle "alunos-ativos.md"
$contentLattesCsv = Join-Path $contentControle "lattes-docentes.csv"
$periodicosMd = Join-Path $contentControle "publicacoes-periodicos.md"
$conferenciasMd = Join-Path $contentControle "publicacoes-conferencias.md"
$dataDir = Join-Path $root "data\controle"
$lattesAusentesData = Join-Path $dataDir "lattes-ausentes.json"
$staticConfig = Join-Path $staticDir "configuracoes.md"
$staticAreas = Join-Path $staticDir "areas.md"

function Require-File([string]$Path, [string]$Label) {
  if (-not (Test-Path -LiteralPath $Path)) {
    throw "$Label nao encontrado: $Path"
  }
}

function Invoke-ConfigFileLockRetry([scriptblock]$Action) {
  # OneDrive/editor pode manter um handle breve. Repita só os erros Windows
  # de compartilhamento (32) e bloqueio (33); permissão e demais falhas saem.
  for ($attempt = 0; $attempt -lt 6; $attempt++) {
    try {
      return (& $Action)
    } catch {
      $cause = $_.Exception
      while ($cause.InnerException -and $cause -isnot [IO.IOException]) { $cause = $cause.InnerException }
      $lockViolation = $cause -is [IO.IOException] -and (($cause.HResult -band 0xffff) -in @(32, 33))
      if (-not $lockViolation -or $attempt -eq 5) { throw }
      Start-Sleep -Milliseconds ([Math]::Min(1000, 200 * [Math]::Pow(2, $attempt)))
    }
  }
}

function Write-ConfigIfChanged([string]$Path, [string]$Text) {
  $target = [IO.Path]::GetFullPath($Path)
  $previous = Invoke-ConfigFileLockRetry {
    if ([IO.File]::Exists($target)) { [IO.File]::ReadAllText($target) }
  }
  if ($null -ne $previous -and [string]::Equals($previous, $Text, [StringComparison]::Ordinal)) { return }
  # Nunca trunque o arquivo vigente. O temporário fica no mesmo diretório,
  # permitindo substituição atômica; se o bloqueio persistir, o original fica.
  $temporary = Join-Path ([IO.Path]::GetDirectoryName($target)) ("." + [IO.Path]::GetFileName($target) + "." + [Guid]::NewGuid().ToString("N") + ".tmp")
  try {
    [IO.File]::WriteAllText($temporary, $Text, [Text.UTF8Encoding]::new($false))
    Invoke-ConfigFileLockRetry {
      if ([IO.File]::Exists($target)) {
        [IO.File]::Replace($temporary, $target, [NullString]::Value)
      } else {
        [IO.File]::Move($temporary, $target)
      }
    }
  } finally {
    if ([IO.File]::Exists($temporary)) { [IO.File]::Delete($temporary) }
  }
}

function Unquote([string]$Value) {
  $text = ($Value -replace '\s+#.*$', '').Trim()
  if ($text -eq '""') { return "" }
  if ($text.StartsWith('"') -and $text.EndsWith('"')) {
    try { return ($text | ConvertFrom-Json) } catch { return $text.Trim('"') }
  }
  return $text.Trim("'")
}

function Q([string]$Value) {
  if ($null -eq $Value) { $Value = "" }
  return '"' + (($Value -replace '\\', '\\') -replace '"', '\"') + '"'
}

function Get-YamlSection([string]$Text, [string]$Name) {
  $pattern = '(?ms)^' + [regex]::Escape($Name) + ':\r?\n.*?(?=^[a-zA-Z_][\w-]*:|^---\s*$|\z)'
  $match = [regex]::Match($Text, $pattern)
  if ($match.Success) { return $match.Value.TrimEnd() + "`r`n" }
  return ""
}

function Replace-YamlSection([string]$Text, [string]$Name, [string]$Section) {
  if (-not $Section) { return $Text }
  $pattern = '(?ms)^' + [regex]::Escape($Name) + ':\r?\n.*?(?=^[a-zA-Z_][\w-]*:|^---\s*$|\z)'
  if ([regex]::IsMatch($Text, $pattern)) {
    return [regex]::Replace($Text, $pattern, $Section, 1)
  }
  if ([regex]::IsMatch($Text, '(?m)^resumo_docentes:')) {
    return [regex]::Replace($Text, '(?m)^resumo_docentes:', $Section + 'resumo_docentes:', 1)
  }
  return [regex]::Replace($Text, '(?m)^---\s*$', $Section + '---', 1)
}

function Merge-AreasIntoConfig([string]$TemplatePath, [string]$AreasPath, [string]$OutputPath) {
  $template = Get-Content -LiteralPath $TemplatePath -Raw
  if (-not $AreasPath -or -not (Test-Path -LiteralPath $AreasPath)) {
    Write-ConfigIfChanged $OutputPath $template
    return
  }

  $areasText = Get-Content -LiteralPath $AreasPath -Raw
  $areasSection = Get-YamlSection $areasText "areas"
  $docentesSection = Get-YamlSection $areasText "docentes_areas"
  if (-not $docentesSection) {
    $docentesSection = Get-YamlSection $areasText "areas_docentes"
    if ($docentesSection) {
      $docentesSection = [regex]::Replace($docentesSection, '^areas_docentes:', 'docentes_areas:', 1)
    }
  }
  if (-not $areasSection -and -not $docentesSection) {
    throw "areas.md precisa conter os blocos YAML 'areas:' e/ou 'docentes_areas:'."
  }

  $merged = Replace-YamlSection $template "areas" $areasSection
  $merged = Replace-YamlSection $merged "docentes_areas" $docentesSection
  Write-ConfigIfChanged $OutputPath $merged
}

function Sync-StaticDirectory([string]$Name) {
  $source = Join-Path $root $Name
  $target = Join-Path $staticDir $Name
  if (-not (Test-Path -LiteralPath $source)) { return }
  if ((Resolve-Path -LiteralPath $source).Path -eq (Resolve-Path -LiteralPath $target -ErrorAction SilentlyContinue).Path) { return }
  if (-not (Test-Path -LiteralPath $target)) {
    New-Item -ItemType Directory -Path $target | Out-Null
  }
  Copy-Item -Path (Join-Path $source "*") -Destination $target -Recurse -Force
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

function Read-DocenteBasics([string]$Path) {
  $items = New-Object System.Collections.Generic.List[object]
  $text = Get-Content -LiteralPath $Path -Raw
  $blocks = [regex]::Matches($text, '(?ms)^  - id:.*?(?=^  - id:|^---\s*$)')
  foreach ($blockMatch in $blocks) {
    $block = $blockMatch.Value
    $idMatch = [regex]::Match($block, '(?m)^\s+- id:\s*(.+?)\s*$')
    $nameMatch = [regex]::Match($block, '(?m)^\s+nome:\s*(.+?)\s*$')
    if (-not $idMatch.Success -or -not $nameMatch.Success) { continue }
    $credentialCategoryMatch = [regex]::Match($block, '(?ms)^\s+credenciamento:\r?\n.*?^\s+categoria:\s*(.+?)\s*$')
    $items.Add([pscustomobject]@{
      docente_id = Unquote $idMatch.Groups[1].Value
      nome = Unquote $nameMatch.Groups[1].Value
      lattes_id = if ([regex]::Match($block, '(?m)^\s+lattes_id:\s*(.+?)\s*$').Success) { Unquote ([regex]::Match($block, '(?m)^\s+lattes_id:\s*(.+?)\s*$').Groups[1].Value) } else { "" }
      lattes_url = if ([regex]::Match($block, '(?m)^\s+lattes_url:\s*(.+?)\s*$').Success) { Unquote ([regex]::Match($block, '(?m)^\s+lattes_url:\s*(.+?)\s*$').Groups[1].Value) } else { "" }
      credenciamento_categoria = if ($credentialCategoryMatch.Success) { Unquote $credentialCategoryMatch.Groups[1].Value } else { "" }
    })
  }
  return $items.ToArray()
}

function Write-LattesDocentesCsv([string]$Path, $Docentes) {
  $Docentes |
    Sort-Object docente_id |
    Select-Object docente_id, nome, lattes_id, lattes_url |
    Export-Csv -LiteralPath $Path -NoTypeInformation -Encoding UTF8
}

function Get-LattesPdfNameCandidates($PdfFile) {
  $names = New-Object System.Collections.Generic.List[string]
  $stem = [IO.Path]::GetFileNameWithoutExtension($PdfFile.Name)
  if ($stem) { $names.Add($stem) }

  $nameMatch = [regex]::Match($stem, '\((?<name>[^()]*)\)\s*$')
  if ($nameMatch.Success) {
    $names.Add($nameMatch.Groups["name"].Value.Trim())
  }

  return $names.ToArray()
}

function Write-LattesAusentesData([string]$Path, $Docentes, $LattesPdfs, [string]$LattesDir) {
  $availableNames = New-Object System.Collections.Generic.HashSet[string]
  foreach ($pdf in $LattesPdfs) {
    foreach ($name in (Get-LattesPdfNameCandidates $pdf)) {
      $key = Normalize-Text $name
      if ($key) { [void]$availableNames.Add($key) }
    }
  }

  $orientadores = @($Docentes | Where-Object {
    $_.credenciamento_categoria -and $_.credenciamento_categoria -ne "sem_credenciamento"
  } | Sort-Object nome)

  $ausentes = @($orientadores | Where-Object {
    -not $availableNames.Contains((Normalize-Text $_.nome))
  } | ForEach-Object {
    [pscustomobject][ordered]@{
      docente_id = $_.docente_id
      nome = $_.nome
      credenciamento_categoria = $_.credenciamento_categoria
    }
  })

  $targetDir = Split-Path -Parent $Path
  if (-not (Test-Path -LiteralPath $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir | Out-Null
  }

  $dataObject = [pscustomobject][ordered]@{
    title = "CV Lattes ausentes"
    fonte = "CVS_LATTES"
    diretorio = $LattesDir
    escopo = "Orientadores com credenciamento ativo em orientadores.pdf"
    total_orientadores = $orientadores.Count
    total_ausentes = $ausentes.Count
    docentes = $ausentes
  }
  $json = $dataObject | ConvertTo-Json -Depth 8
  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $json, $utf8NoBom)
}

function Read-AreaAliases([string]$Text) {
  $aliases = @{}
  $sectionMatch = [regex]::Match($Text, '(?ms)^areas:\r?\n(?<body>.*?)(?=^[a-zA-Z_][\w-]*:|^---\s*$|\z)')
  if (-not $sectionMatch.Success) { return $aliases }

  $entries = [regex]::Matches($sectionMatch.Groups["body"].Value, '(?ms)^\s+-\s+.*?(?=^\s+-\s+|\z)')
  foreach ($entry in $entries) {
    $block = $entry.Value
    $nameMatch = [regex]::Match($block, '(?m)^\s*(?:-\s*)?nome:\s*(.+?)\s*$')
    $siglaMatch = [regex]::Match($block, '(?m)^\s*sigla:\s*(.+?)\s*$')
    if (-not $nameMatch.Success) { continue }

    $nome = Unquote $nameMatch.Groups[1].Value
    $sigla = if ($siglaMatch.Success) { Unquote $siglaMatch.Groups[1].Value } else { "" }
    if ($nome) { $aliases[(Normalize-Text $nome)] = $nome }
    if ($sigla) { $aliases[(Normalize-Text $sigla)] = $nome }
  }
  return $aliases
}

function Resolve-AreaName([hashtable]$Aliases, [string]$Value) {
  if (-not $Value) { return "" }
  $key = Normalize-Text $Value
  if ($key -and $Aliases.ContainsKey($key)) { return $Aliases[$key] }
  return $Value
}

function Read-ConfiguredAreas([string]$Path) {
  $byId = @{}
  $byName = @{}
  if (-not (Test-Path -LiteralPath $Path)) { return [pscustomobject]@{ ById = $byId; ByName = $byName } }
  $text = Get-Content -LiteralPath $Path -Raw
  $areaAliases = Read-AreaAliases $text
  $sectionMatch = [regex]::Match($text, '(?ms)^docentes_areas:\r?\n(?<body>.*?)(?=^[a-zA-Z_][\w-]*:|^---\s*$)')
  if (-not $sectionMatch.Success) { return [pscustomobject]@{ ById = $byId; ByName = $byName } }
  $entries = [regex]::Matches($sectionMatch.Groups["body"].Value, '(?ms)^\s+-\s+.*?(?=^\s+-\s+|\z)')
  foreach ($entry in $entries) {
    $block = $entry.Value
    $idMatch = [regex]::Match($block, '(?m)^\s*(?:-\s*)?docente_id:\s*(.+?)\s*$')
    $nameMatch = [regex]::Match($block, '(?m)^\s*(?:-\s*)?(?:nome|docente):\s*(.+?)\s*$')
    $areaMatch = [regex]::Match($block, '(?m)^\s*(?:-\s*)?area:\s*(.+?)\s*$')
    if (-not $areaMatch.Success) { continue }
    $id = if ($idMatch.Success) { Unquote $idMatch.Groups[1].Value } else { "" }
    $nome = if ($nameMatch.Success) { Unquote $nameMatch.Groups[1].Value } else { "" }
    $area = Resolve-AreaName $areaAliases (Unquote $areaMatch.Groups[1].Value)
    if ($id) { $byId[$id] = $area }
    if ($nome) { $byName[(Normalize-Text $nome)] = $area }
  }
  return [pscustomobject]@{ ById = $byId; ByName = $byName }
}

function Update-ConfigDocenteAreas([string]$Path, $Docentes, $Areas) {
  $text = Get-Content -LiteralPath $Path -Raw
  $lines = New-Object System.Collections.Generic.List[string]
  $lines.Add("docentes_areas:")
  foreach ($docente in $Docentes) {
    $area = if ($Areas.ById.ContainsKey($docente.docente_id)) {
      $Areas.ById[$docente.docente_id]
    } elseif ($Areas.ByName.ContainsKey((Normalize-Text $docente.nome))) {
      $Areas.ByName[(Normalize-Text $docente.nome)]
    } else {
      ""
    }
    $lines.Add("  - docente_id: $(Q $docente.docente_id)")
    $lines.Add("    nome: $(Q $docente.nome)")
    $lines.Add("    area: $(Q $area)")
  }
  $section = ($lines -join "`r`n") + "`r`n"
  if ([regex]::IsMatch($text, '(?ms)^docentes_areas:\r?\n.*?(?=^[a-zA-Z_][\w-]*:|^---\s*$)')) {
    $text = [regex]::Replace($text, '(?ms)^docentes_areas:\r?\n.*?(?=^[a-zA-Z_][\w-]*:|^---\s*$)', $section, 1)
  } elseif ([regex]::IsMatch($text, '(?m)^resumo_docentes:')) {
    $text = [regex]::Replace($text, '(?m)^resumo_docentes:', $section + 'resumo_docentes:', 1)
  } else {
    $text = [regex]::Replace($text, '(?m)^---\s*$', $section + '---', 1)
  }
  Write-ConfigIfChanged $Path $text
}

Require-File $ConfigBase "Configuracao base"
Require-File $JanusPdf "PDF Janus canonico"
Require-File $OrientadoresPdf "PDF Janus de orientadores"
Require-File $DisciplinasPdf "PDF Janus de disciplinas"
if (-not (Test-Path -LiteralPath $LattesDir)) {
  throw "Diretorio CVS_LATTES nao encontrado: $LattesDir"
}

if (-not (Test-Path -LiteralPath $contentControle)) {
  New-Item -ItemType Directory -Path $contentControle | Out-Null
}

Sync-StaticDirectory "NORMAS"
Sync-StaticDirectory "DIRETRIZES"

Merge-AreasIntoConfig $ConfigBase $AreasMd $contentConfig
if ($AreasMd -and (Test-Path -LiteralPath $AreasMd)) {
  $sourceAreas = (Resolve-Path -LiteralPath $AreasMd).Path
  $targetAreas = if (Test-Path -LiteralPath $staticAreas) { (Resolve-Path -LiteralPath $staticAreas).Path } else { "" }
  if ($sourceAreas -ne $targetAreas) {
    Copy-Item -LiteralPath $AreasMd -Destination $staticAreas -Force
  }
}

$janusResult = & (Join-Path $PSScriptRoot "atualizar-docentes-janus.ps1") `
  -PdfPath $JanusPdf `
  -OrientadoresPath $OrientadoresPdf `
  -DisciplinasPath $DisciplinasPdf `
  -DocentesPath $contentDocentes `
  -AlunosAtivosPath $contentAlunosAtivos `
  -MappingCsv $LattesDocentesCsv

$docentes = @(Read-DocenteBasics $contentDocentes)
Write-LattesDocentesCsv $contentLattesCsv $docentes
$areas = Read-ConfiguredAreas $contentConfig
Update-ConfigDocenteAreas $contentConfig $docentes $areas
Copy-Item -LiteralPath $contentConfig -Destination $staticConfig -Force

$lattesPdfs = @(Get-ChildItem -LiteralPath $LattesDir -File -Filter *.pdf -ErrorAction SilentlyContinue)
if (-not $lattesPdfs.Count) {
  throw "Nenhum PDF Lattes encontrado em CVS_LATTES: $LattesDir"
}
Write-LattesAusentesData $lattesAusentesData $docentes $lattesPdfs $LattesDir

$pubResult = & (Join-Path $PSScriptRoot "gerar-publicacoes-lattes.ps1") `
  -LattesDir $LattesDir `
  -DocentesCsv $contentLattesCsv `
  -PeriodicosMd $periodicosMd `
  -ConferenciasMd $conferenciasMd `
  -PublicacoesMd (Join-Path $root "publicacoes.md") `
  -EventosMd (Join-Path $root "eventos.md") `
  -StaticPublicacoesMd (Join-Path $staticDir "publicacoes.md") `
  -StaticEventosMd (Join-Path $staticDir "eventos.md") `
  -Periodo $janusResult.Periodo

$producaoDocenteResult = & (Join-Path $PSScriptRoot "gerar-producao-docente.ps1")

$relatorioAlertasPdf = Join-Path $staticDir "relatorio-alertas-docentes.pdf"
$relatorioAlertasHtml = Join-Path $staticDir "relatorio-alertas-docentes.html"
$relatorioAlertasResult = & (Join-Path $PSScriptRoot "gerar-relatorio-alertas-docentes.ps1") `
  -DocentesPath $contentDocentes `
  -ConfigPath $contentConfig `
  -PeriodicosPath $periodicosMd `
  -ConferenciasPath $conferenciasMd `
  -OutputPdf $relatorioAlertasPdf `
  -OutputHtml $relatorioAlertasHtml

[pscustomobject]@{
  Programa = $Programa
  Areas = if ($AreasMd) { $AreasMd } else { $ConfigBase }
  Lattes = $LattesDir
  Configuracoes = $staticConfig
  ConfiguracoesProcessadas = $contentConfig
  Docentes = $contentDocentes
  AlunosAtivos = $contentAlunosAtivos
  PublicacoesPeriodicos = $periodicosMd
  PublicacoesConferencias = $conferenciasMd
  LattesAusentes = $lattesAusentesData
  PublicacoesMd = Join-Path $root "publicacoes.md"
  EventosMd = Join-Path $root "eventos.md"
  RelatorioAlertasPdf = $relatorioAlertasPdf
  RelatorioAlertasHtml = $relatorioAlertasHtml
  Janus = $janusResult
  Disciplinas = $DisciplinasPdf
  Publicacoes = $pubResult
  ProducaoDocente = $producaoDocenteResult
  RelatorioAlertas = $relatorioAlertasResult
}
