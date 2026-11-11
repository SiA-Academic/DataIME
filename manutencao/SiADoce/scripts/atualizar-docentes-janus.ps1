param(
  [string]$PdfPath = "",
  [string]$OrientadoresPath = "",
  [string]$DisciplinasPath = "",
  [string]$DocentesPath = "",
  [string]$AlunosAtivosPath = "",
  [string]$MappingCsv = ""
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
. (Join-Path $PSScriptRoot 'titulados-por-ano.ps1')
. (Join-Path $PSScriptRoot 'indicadores-mensais.ps1')
$staticDir = Join-Path $root "static"
$canonicalPdfPath = Join-Path $staticDir "janus.pdf"
$canonicalOrientadoresPath = Join-Path $staticDir "orientadores.pdf"
$canonicalDisciplinasPath = Join-Path $staticDir "disciplinas.pdf"
if (-not $DocentesPath) {
  $DocentesPath = Join-Path $root "content\controle\docentes.md"
}
if (-not $AlunosAtivosPath) {
  $AlunosAtivosPath = Join-Path $root "content\controle\alunos-ativos.md"
}
if (-not $MappingCsv) {
  $MappingCsv = Join-Path $root "content\controle\lattes-docentes.csv"
}
if (-not $PdfPath) {
  $PdfPath = $canonicalPdfPath
}
if (-not $OrientadoresPath) {
  $OrientadoresPath = $canonicalOrientadoresPath
}
if (-not $DisciplinasPath) {
  $DisciplinasPath = $canonicalDisciplinasPath
}
if (-not (Test-Path -LiteralPath $PdfPath)) {
  throw "Nenhum PDF do Janus encontrado. Salve o arquivo como static/janus.pdf."
}
if (-not (Test-Path -LiteralPath $OrientadoresPath)) {
  throw "Nenhum PDF de orientadores encontrado. Salve o arquivo como static/orientadores.pdf."
}
if (-not (Test-Path -LiteralPath $DisciplinasPath)) {
  throw "Nenhum PDF de disciplinas encontrado. Salve o arquivo como static/disciplinas.pdf."
}
if ((Resolve-Path -LiteralPath $PdfPath).Path -ne (Resolve-Path -LiteralPath $canonicalPdfPath -ErrorAction SilentlyContinue).Path) {
  Copy-Item -LiteralPath $PdfPath -Destination $canonicalPdfPath -Force
  $PdfPath = $canonicalPdfPath
}
if ((Resolve-Path -LiteralPath $OrientadoresPath).Path -ne (Resolve-Path -LiteralPath $canonicalOrientadoresPath -ErrorAction SilentlyContinue).Path) {
  Copy-Item -LiteralPath $OrientadoresPath -Destination $canonicalOrientadoresPath -Force
  $OrientadoresPath = $canonicalOrientadoresPath
}
if ((Resolve-Path -LiteralPath $DisciplinasPath).Path -ne (Resolve-Path -LiteralPath $canonicalDisciplinasPath -ErrorAction SilentlyContinue).Path) {
  Copy-Item -LiteralPath $DisciplinasPath -Destination $canonicalDisciplinasPath -Force
  $DisciplinasPath = $canonicalDisciplinasPath
}

function Q([string]$Value) {
  if ($null -eq $Value) { $Value = "" }
  return '"' + (($Value -replace '\\', '\\') -replace '"', '\"') + '"'
}

function Unquote([string]$Value) {
  $text = ($Value -replace '\s+#.*$', '').Trim()
  if ($text -eq '""') { return "" }
  if ($text.StartsWith('"') -and $text.EndsWith('"')) {
    try { return ($text | ConvertFrom-Json) } catch { return $text.Trim('"') }
  }
  return $text.Trim("'")
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

function YamlNumber($Value) {
  if ($null -eq $Value -or ($Value -is [string] -and $Value -eq "")) { return '""' }
  return [string]$Value
}

function YamlBool($Value) {
  if ($Value) { return "true" }
  return "false"
}

function IsoDate([string]$Value) {
  if ($Value -match '^(\d{2})/(\d{2})/(\d{4})$') {
    return "$($matches[3])-$($matches[2])-$($matches[1])"
  }
  return $Value
}

function ParseDateValue([string]$Value) {
  if (-not $Value) { return $null }
  $formats = @("yyyy-MM-dd", "dd/MM/yyyy")
  foreach ($format in $formats) {
    try {
      return [DateTime]::ParseExact($Value, $format, [Globalization.CultureInfo]::InvariantCulture)
    } catch {}
  }
  return $null
}

function DateToIso($Value) {
  if ($null -eq $Value) { return "" }
  return ([DateTime]$Value).ToString("yyyy-MM-dd")
}

function YearsBetweenDates($Start, $End) {
  if ($null -eq $Start -or $null -eq $End) { return $null }
  $years = $End.Year - $Start.Year
  if ($End.Month -lt $Start.Month -or ($End.Month -eq $Start.Month -and $End.Day -lt $Start.Day)) {
    $years -= 1
  }
  return [Math]::Max(0, $years)
}

function CredentialReferenceDate($CredentialRow, [string]$Periodo) {
  $text = if ($Periodo) { $Periodo } elseif ($CredentialRow) { $CredentialRow.Periodo } else { "" }
  $dates = [regex]::Matches($text, '\d{2}/\d{2}/\d{4}') | ForEach-Object { ParseDateValue $_.Value } | Where-Object { $_ }
  if (@($dates).Count) { return @($dates)[-1] }
  return [DateTime]::Today
}

function CredentialFirstDate($Items) {
  $dates = @($Items | ForEach-Object { ParseDateValue $_.data_inicial } | Where-Object { $_ } | Sort-Object)
  if ($dates.Count) { return $dates[0] }
  return $null
}

function HasPreRecentOrientationEvidence($PdfRow, $Threshold) {
  if (-not $PdfRow -or -not $PdfRow.Alunos) { return $false }
  foreach ($student in @($PdfRow.Alunos.Values)) {
    $statusDate = ParseDateValue $student.data_situacao
    if ($statusDate -and $statusDate -lt $Threshold) { return $true }
    if ($student.categoria -eq "titulado" -and $statusDate -and $null -ne $student.tempo_titulacao_meses) {
      $estimatedStart = $statusDate.AddMonths(-1 * [int]$student.tempo_titulacao_meses)
      if ($estimatedStart -lt $Threshold) { return $true }
    }
  }
  return $false
}

function CredentialFreshness($Items, $CredentialRow, $PdfRow, [int]$Years = 3) {
  $reference = CredentialReferenceDate $CredentialRow ""
  $first = CredentialFirstDate $Items
  $yearsSince = YearsBetweenDates $first $reference
  $threshold = $reference.AddYears(-1 * $Years)
  $hasPreRecentOrientationEvidence = HasPreRecentOrientationEvidence $PdfRow $threshold
  $recent = $false
  if ($first) {
    $recent = ($first -ge $threshold) -and (-not $hasPreRecentOrientationEvidence)
  }
  return [pscustomobject]@{
    DataPrimeiroCredenciamento = DateToIso $first
    DataInicioCredenciamentoPdf = DateToIso $first
    Referencia = DateToIso $reference
    Corte = DateToIso $threshold
    Anos = if ($null -eq $yearsSince) { "" } else { $yearsSince }
    LimiteAnos = $Years
    TemEvidenciaOrientacaoAnterior = $hasPreRecentOrientationEvidence
    EntradaRecente = $recent
  }
}

function StudentCategory([string]$Situacao) {
  if ($Situacao -match '^Ativo') { return "ativo" }
  if ($Situacao -match '^Titulado') { return "titulado" }
  if ($Situacao -match '^Desligado') { return "desligado" }
  return "outro"
}

function StudentTime([string]$Situacao) {
  if ($Situacao -match '(\d+)\s+meses') { return [int]$matches[1] }
  return $null
}

function ConvertPdfToTextLines([string]$Path, [string]$Label) {
  $pdftotext = Get-Command pdftotext -ErrorAction SilentlyContinue
  if (-not $pdftotext) {
    throw "pdftotext nao encontrado; nao foi possivel ler $Label."
  }

  $tmp = [System.IO.Path]::GetTempFileName()
  try {
    $processInfo = New-Object System.Diagnostics.ProcessStartInfo
    $processInfo.FileName = $pdftotext.Source
    $processInfo.Arguments = '-layout -enc UTF-8 "{0}" "{1}"' -f ($Path -replace '"', '\"'), ($tmp -replace '"', '\"')
    $processInfo.UseShellExecute = $false
    $processInfo.RedirectStandardOutput = $true
    $processInfo.RedirectStandardError = $true
    $process = [System.Diagnostics.Process]::Start($processInfo)
    $stderr = $process.StandardError.ReadToEnd()
    $process.StandardOutput.ReadToEnd() | Out-Null
    $process.WaitForExit()
    if ($process.ExitCode -ne 0) {
      throw "pdftotext falhou ao ler $Label. $stderr"
    }
    return @(Get-Content -LiteralPath $tmp -Encoding UTF8)
  } finally {
    Remove-Item -LiteralPath $tmp -Force -ErrorAction SilentlyContinue
  }
}

function GetPdfRow($Rows, [string]$Nusp, [string]$Nome, [string]$Periodo) {
  if (-not $Rows.ContainsKey($Nusp)) {
    $Rows[$Nusp] = @{
      Nusp = $Nusp
      Nome = $Nome
      Periodo = $Periodo
      OrientandosArea = $null
      Titulados = $null
      Desligados = $null
      Total = $null
      TaxaEvasao = ""
      TempoMestrado = ""
      TempoDoutorado = ""
      TempoDoutoradoDireto = ""
      Alunos = @{}
    }
  }
  return $Rows[$Nusp]
}

function New-EmptyPdfRow([string]$Nusp, [string]$Nome, [string]$Periodo) {
  return @{
    Nusp = $Nusp
    Nome = $Nome
    Periodo = $Periodo
    OrientandosArea = 0
    Titulados = 0
    TituladosArquivo = 'janus.pdf'
    TituladosPeriodo = $Periodo
    Desligados = 0
    Total = 0
    TaxaEvasao = ""
    TempoMestrado = ""
    TempoDoutorado = ""
    TempoDoutoradoDireto = ""
    Alunos = @{}
  }
}

function ReadPdfRows([string]$Path) {
  $rows = @{}
  $lines = ConvertPdfToTextLines $Path "o PDF do Janus"
  $periodo = ""
  $current = $null
  $expectedAdvisors = $null
  $areaSeen = $false
  $coursesSeen = $false
  foreach ($line in $lines) {
    if ($line -match '^\s*Área:\s*(\d+)') {
      if ($matches[1] -ne '45134') { throw "Área inesperada em static/janus.pdf: $line" }
      $areaSeen = $true
      continue
    }
    if ($line -match '^\s*Situação:\s*(.+?)\s*$') {
      if ((Normalize-Text $matches[1]) -notin @('todos', 'todas', 'todas as situacoes', 'todos os alunos')) {
        throw 'Relatório Janus filtrado por situação. Inclua todas as situações: ativos, titulados e desligados.'
      }
      continue
    }
    if ($line -match '^\s*Cursos:\s*(.+?)\s*$') {
      if ((Normalize-Text $matches[1]) -ne 'mestrado doutorado doutorado direto') {
        throw 'Inclua Mestrado, Doutorado e Doutorado Direto em static/janus.pdf.'
      }
      $coursesSeen = $true
      continue
    }
    if ($line -match '^\s*Período:\s*(.+?)\s*$') {
      $value = $matches[1].Trim()
      if ($periodo -and $periodo -ne $value) { throw 'Períodos divergentes entre páginas de static/janus.pdf.' }
      $periodo = $value
      continue
    }
    if ($line -match '^\s*Orientadores:\s*(\d+)\s*$') {
      $value = [int]$matches[1]
      if ($null -ne $expectedAdvisors -and $expectedAdvisors -ne $value) { throw 'Totais de orientadores divergentes em static/janus.pdf.' }
      $expectedAdvisors = $value
      continue
    }
    if ($line -match '^\s*Orientador:\s*(\d+)\s+-\s+(.+?)\s*$') {
      $nusp = $matches[1]
      $nome = $matches[2].Trim()
      if ($rows.ContainsKey($nusp) -and (Normalize-Text $rows[$nusp].Nome) -ne (Normalize-Text $nome)) {
        throw "Nome divergente para o orientador $nusp em static/janus.pdf."
      }
      $current = GetPdfRow $rows $nusp $nome $periodo
      continue
    }
    if ($current -and $line -match '^\s*45134\s+(\d+)\s+(.+?)\s+(ME|DO|DD)\s+(\d{2}/\d{2}/\d{4})\s+(.+?)\s*$') {
      $studentNusp = $matches[1]
      $studentName = ($matches[2] -replace '\s{2,}', ' ').Trim()
      $course = $matches[3]
      $date = IsoDate $matches[4]
      $situacao = ($matches[5] -replace '\s{2,}', ' ').Trim()
      $category = StudentCategory $situacao
      if ($category -eq 'outro') { throw "Situação de aluno não reconhecida em static/janus.pdf: $situacao" }
      if (-not (ParseDateValue $date)) { throw "Data de situação inválida em static/janus.pdf: $line" }
      $student = [pscustomobject]@{
        nusp = $studentNusp
        nome = $studentName
        curso = $course
        data_situacao = $date
        situacao = $situacao
        categoria = $category
        tempo_titulacao_meses = StudentTime $situacao
        fonte = 'static/janus.pdf'
        orientador = $current.Nome
        orientador_nusp = $current.Nusp
      }
      $key = "$studentNusp|$course|$date|$category"
      if ($current.Alunos.ContainsKey($key)) {
        $previous = $current.Alunos[$key]
        if ((Normalize-Text $previous.nome) -ne (Normalize-Text $studentName) -or $previous.situacao -ne $situacao) {
          throw "Registro duplicado conflitante em static/janus.pdf: $studentName, $course, $date."
        }
      } else {
        $current.Alunos[$key] = $student
      }
      continue
    }
    if ($line -match '^\s*\d{5}\s+\d+\s+') {
      throw "Linha de aluno não reconhecida em static/janus.pdf: $line"
    }
    if ($current -and $line -match 'Orientandos:\s*(\d+)\s+Titulados:\s*(\d+)\s+Desligados:\s*(\d+)\s+Total:\s*(\d+)\s+alunos\s+Taxa de evasão:\s*(\S+)') {
      $summary = @([int]$matches[1], [int]$matches[2], [int]$matches[3], [int]$matches[4], $matches[5])
      if ($null -ne $current.Total -and ((@($current.OrientandosArea, $current.Titulados, $current.Desligados, $current.Total, $current.TaxaEvasao) -join '|') -ne ($summary -join '|'))) {
        throw "Resumos divergentes para $($current.Nome) em static/janus.pdf."
      }
      $current.OrientandosArea = $summary[0]
      $current.Titulados = $summary[1]
      $current.Desligados = $summary[2]
      $current.Total = $summary[3]
      $current.TaxaEvasao = $summary[4]
      continue
    }
    if ($current -and $line -match 'Tempo médio de titulação \(meses\):\s*(.+?)\s*$') {
      $tail = $matches[1]
      if ($tail -match 'Mestrado:\s*(\d+)') { $current.TempoMestrado = [int]$matches[1] }
      if ($tail -match 'Doutorado Direto:\s*(\d+)') { $current.TempoDoutoradoDireto = [int]$matches[1] }
      if ($tail -match 'Doutorado:\s*(\d+)') { $current.TempoDoutorado = [int]$matches[1] }
    }
  }
  $dates = @([regex]::Matches($periodo, '\d{2}/\d{2}/\d{4}') | ForEach-Object { ParseDateValue $_.Value })
  if ($dates.Count -ne 2 -or -not $dates[0] -or -not $dates[1] -or $dates[0] -gt $dates[1]) {
    throw 'Período inválido ou ausente em static/janus.pdf.'
  }
  if (-not $areaSeen -or -not $coursesSeen -or $null -eq $expectedAdvisors) { throw 'Cabeçalho incompleto em static/janus.pdf.' }
  if ($rows.Count -ne $expectedAdvisors) { throw "Total de orientadores divergente em static/janus.pdf: lidos $($rows.Count), esperados $expectedAdvisors." }
  foreach ($row in $rows.Values) {
    if ($null -eq $row.Total) { throw "Resumo completo ausente para $($row.Nome). Exporte todas as situações em static/janus.pdf." }
    $students = @($row.Alunos.Values)
    $counts = @(@($students | Where-Object categoria -eq 'ativo').Count, @($students | Where-Object categoria -eq 'titulado').Count, @($students | Where-Object categoria -eq 'desligado').Count, $students.Count)
    $expected = @($row.OrientandosArea, $row.Titulados, $row.Desligados, $row.Total)
    if (($counts -join '|') -ne ($expected -join '|')) {
      throw "Contagens divergentes para $($row.Nome): lidas $($counts -join '/'); impressas $($expected -join '/')."
    }
    $row.Periodo = $periodo
    $row.TituladosArquivo = 'janus.pdf'
    $row.TituladosPeriodo = $periodo
    foreach ($student in $students) {
      if ($student.categoria -in @('titulado', 'desligado')) {
        $date = ParseDateValue $student.data_situacao
        if ($date -lt $dates[0] -or $date -gt $dates[1]) { throw "Situação fora do período de static/janus.pdf: $($student.nome), $($student.data_situacao)." }
      }
    }
  }
  return $rows
}

function NewJanusTituladosResult($Rows, [string]$Periodo) {
  $dates = @([regex]::Matches($Periodo, '\d{2}/\d{2}/\d{4}') | ForEach-Object { ParseDateValue $_.Value })
  if ($dates.Count -ne 2 -or -not $dates[0] -or -not $dates[1] -or $dates[0] -gt $dates[1]) {
    throw 'Período inválido para as titulações de static/janus.pdf.'
  }
  $students = New-Object System.Collections.Generic.List[object]
  $keys = New-Object System.Collections.Generic.HashSet[string]
  foreach ($row in $Rows.Values) {
    foreach ($student in $row.Alunos.Values) {
      if ($student.categoria -ne 'titulado') { continue }
      $date = ParseDateValue $student.data_situacao
      if (-not $date -or $date -lt $dates[0] -or $date -gt $dates[1]) { throw "Titulação fora do período ou com data inválida: $($student.nome)." }
      if ($student.curso -notin @('ME', 'DO', 'DD')) { throw "Curso inválido na titulação: $($student.curso)." }
      $key = "$($student.nusp)|$($student.curso)|$($student.data_situacao)"
      if (-not $keys.Add($key)) { throw "Titulação duplicada entre orientadores em static/janus.pdf: $($student.nome)." }
      $students.Add($student)
    }
  }
  return [pscustomobject]@{
    Inicio = $dates[0]
    Fim = $dates[1]
    Periodo = $Periodo
    Alunos = @($students | Sort-Object data_situacao, nome)
    Totais = [pscustomobject][ordered]@{
      mestrado = @($students | Where-Object curso -eq 'ME').Count
      doutorado = @($students | Where-Object curso -eq 'DO').Count
      doutorado_direto = @($students | Where-Object curso -eq 'DD').Count
      total = $students.Count
    }
  }
}

function CredentialCategory([string]$Tipo) {
  $norm = Normalize-Text $Tipo
  if ($norm -match 'vencido') { return "vencido_com_orientando" }
  if ($norm -match 'especific') { return "especifico" }
  if ($norm -match 'pleno') { return "pleno" }
  return "sem_credenciamento"
}

function CredentialRank([string]$Tipo) {
  $cat = CredentialCategory $Tipo
  if ($cat -eq "pleno") { return 1 }
  if ($cat -eq "especifico") { return 2 }
  if ($cat -eq "vencido_com_orientando") { return 3 }
  return 4
}

function NormalizeCredentialType([string]$Tipo) {
  $cat = CredentialCategory $Tipo
  if ($cat -eq "pleno") { return "Pleno" }
  if ($cat -eq "especifico") { return "Específico" }
  if ($cat -eq "vencido_com_orientando") { return "Vencido com Orientando" }
  return ""
}

function GetCredentialRecord($Rows, [string]$Nusp, [string]$Nome) {
  if (-not $Rows.ContainsKey($Nusp)) {
    $Rows[$Nusp] = @{
      Nusp = $Nusp
      Nome = $Nome
      Periodo = ""
      Credenciamentos = New-Object System.Collections.Generic.List[object]
    }
  }
  return $Rows[$Nusp]
}

function ReadCredentialRows([string]$Path) {
  $rows = @{}
  $lines = ConvertPdfToTextLines $Path "o PDF de orientadores"
  $periodo = ""
  $pendingVencido = $false
  foreach ($line in $lines) {
    if (-not $periodo -and $line -match 'Período de:\s+(.+?)\s*$') {
      $periodo = $matches[1].Trim()
      continue
    }
    if ($line -match 'Vencido\s+com\s*$') {
      $pendingVencido = $true
      continue
    }
    if ($line -match '^\s*Orientando\s*$') {
      continue
    }
    if ($line -match '^\s*45134\s+(\d+)\s+(.+?)\s+(ME|DO|DD)\s+(Pleno|Específico|Especifico)\s+(\d{2}/\d{2}/\d{4})(?:\s+(\d{2}/\d{2}/\d{4}))?\s*$') {
      $record = GetCredentialRecord $rows $matches[1] (($matches[2] -replace '\s{2,}', ' ').Trim())
      $record.Periodo = $periodo
      $record.Credenciamentos.Add([pscustomobject]@{
        curso = $matches[3]
        tipo = NormalizeCredentialType $matches[4]
        categoria = CredentialCategory $matches[4]
        data_inicial = IsoDate $matches[5]
        data_final = if ($matches[6]) { IsoDate $matches[6] } else { "" }
      })
      $pendingVencido = $false
      continue
    }
    if ($line -match '^\s*45134\s+(\d+)\s+(.+?)\s+(ME|DO|DD)\s+Vencido\s+com\s+Orientando\s+(\d{2}/\d{2}/\d{4})(?:\s+(\d{2}/\d{2}/\d{4}))?\s*$') {
      $record = GetCredentialRecord $rows $matches[1] (($matches[2] -replace '\s{2,}', ' ').Trim())
      $record.Periodo = $periodo
      $record.Credenciamentos.Add([pscustomobject]@{
        curso = $matches[3]
        tipo = "Vencido com Orientando"
        categoria = "vencido_com_orientando"
        data_inicial = IsoDate $matches[4]
        data_final = if ($matches[5]) { IsoDate $matches[5] } else { "" }
      })
      $pendingVencido = $false
      continue
    }
    if ($pendingVencido -and $line -match '^\s*45134\s+(\d+)\s+(.+?)\s+(ME|DO|DD)\s+(\d{2}/\d{2}/\d{4})(?:\s+(\d{2}/\d{2}/\d{4}))?\s*$') {
      $record = GetCredentialRecord $rows $matches[1] (($matches[2] -replace '\s{2,}', ' ').Trim())
      $record.Periodo = $periodo
      $record.Credenciamentos.Add([pscustomobject]@{
        curso = $matches[3]
        tipo = "Vencido com Orientando"
        categoria = "vencido_com_orientando"
        data_inicial = IsoDate $matches[4]
        data_final = if ($matches[5]) { IsoDate $matches[5] } else { "" }
      })
      $pendingVencido = $false
      continue
    }
  }
  return $rows
}

function GetDisciplineRow($Rows, [string]$Nusp, [string]$Nome, [string]$Periodo) {
  if (-not $Rows.ContainsKey($Nusp)) {
    $Rows[$Nusp] = @{
      Nusp = $Nusp
      Nome = $Nome
      Periodo = $Periodo
      Turmas = @{}
    }
  }
  return $Rows[$Nusp]
}

function New-EmptyDisciplineRow([string]$Nusp, [string]$Nome, [string]$Periodo) {
  return @{
    Nusp = $Nusp
    Nome = $Nome
    Periodo = $Periodo
    Turmas = @{}
  }
}

function DisciplineDates([string]$Periodo) {
  $dates = @([regex]::Matches($Periodo, '\d{2}/\d{2}/\d{4}') | ForEach-Object { $_.Value })
  return [pscustomobject]@{
    Inicio = if ($dates.Count) { IsoDate $dates[0] } else { "" }
    Fim = if ($dates.Count -gt 1) { IsoDate $dates[1] } else { "" }
  }
}

function ReadDisciplineRows([string]$Path) {
  $rows = @{}
  $lines = ConvertPdfToTextLines $Path "o PDF de disciplinas"
  $periodoFonte = ""
  $current = $null
  $collectingMinistrantes = $false

  foreach ($line in $lines) {
    if (-not $periodoFonte -and $line -match '^\s*Período:\s*(\d{2}/\d{2}/\d{4})\s+a:?\s*(\d{2}/\d{2}/\d{4})') {
      $periodoFonte = "$($matches[1]) a $($matches[2])"
    }

    if ($line -match '^\s*Sigla:\s*(.+?)\s+Turma:\s*(.+?)\s*$') {
      $current = @{
        Sigla = (($matches[1] -replace '\s{2,}', ' ').Trim())
        Turma = (($matches[2] -replace '\s{2,}', ' ').Trim())
        Disciplina = ""
        Periodo = ""
      }
      $collectingMinistrantes = $false
      continue
    }

    if (-not $current) { continue }

    if ($line -match '^\s*Disciplina:\s*(.+?)\s*$') {
      $current.Disciplina = (($matches[1] -replace '\s{2,}', ' ').Trim())
      continue
    }
    if ($line -match '^\s*Período:\s*(\d{2}/\d{2}/\d{4})\s+a:?\s*(\d{2}/\d{2}/\d{4})') {
      $current.Periodo = "$($matches[1]) a $($matches[2])"
      continue
    }
    if ($line -match '^\s*Ministrantes:\s*$') {
      $collectingMinistrantes = $true
      continue
    }
    if (-not $collectingMinistrantes) { continue }
    if ($line -match '^\s*(Horário|Créditos:|Idioma ministrado:|Forma de oferecimento:)') {
      $collectingMinistrantes = $false
      continue
    }
    if ($line -notmatch '^\s*(\d+)\s+-\s+(.+?)\s*$') { continue }

    $nusp = $matches[1]
    $nome = (($matches[2] -replace '\s{2,}', ' ').Trim())
    $row = GetDisciplineRow $rows $nusp $nome $periodoFonte
    $dates = DisciplineDates $current.Periodo
    $key = "$($current.Sigla)|$($current.Turma)|$($current.Periodo)|$($current.Disciplina)"
    $row.Turmas[$key] = [pscustomobject]@{
      sigla = $current.Sigla
      turma = $current.Turma
      disciplina = $current.Disciplina
      periodo = $current.Periodo
      data_inicio = $dates.Inicio
      data_fim = $dates.Fim
    }
  }

  return [pscustomobject]@{
    Periodo = $periodoFonte
    Rows = $rows
  }
}

function StudentYaml($Students) {
  $values = @($Students.Values | Sort-Object categoria, nome, data_situacao)
  if (-not $values.Count) {
    return "      alunos: []"
  }
  $lines = New-Object System.Collections.Generic.List[string]
  $lines.Add("      alunos:")
  foreach ($student in $values) {
    $lines.Add("        - nusp: $(Q $student.nusp)")
    $lines.Add("          nome: $(Q $student.nome)")
    $lines.Add("          curso: $(Q $student.curso)")
    $lines.Add("          data_situacao: $(Q $student.data_situacao)")
    $lines.Add("          situacao: $(Q $student.situacao)")
    $lines.Add("          categoria: $(Q $student.categoria)")
    if ($student.fonte) { $lines.Add("          fonte: $(Q $student.fonte)") }
    if ($null -ne $student.tempo_titulacao_meses) {
      $lines.Add("          tempo_titulacao_meses: $($student.tempo_titulacao_meses)")
    }
  }
  return ($lines -join "`r`n")
}

function JanusBlock($PdfRow, [string]$PdfFile) {
  $lines = New-Object System.Collections.Generic.List[string]
  $lines.Add("    janus:")
  $lines.Add("      arquivo: $(Q $PdfFile)")
  $lines.Add("      arquivo_pdf: $(Q $PdfFile)")
  $lines.Add("      periodo_pdf: $(Q $PdfRow.Periodo)")
  $lines.Add("      nusp: $(Q $PdfRow.Nusp)")
  $lines.Add("      orientandos_area: $(YamlNumber $PdfRow.OrientandosArea)")
  $lines.Add("      titulados: $(YamlNumber $PdfRow.Titulados)")
  $lines.Add("      titulados_arquivo_pdf: $(Q $PdfRow.TituladosArquivo)")
  $lines.Add("      titulados_periodo_pdf: $(Q $PdfRow.TituladosPeriodo)")
  $lines.Add("      desligados: $(YamlNumber $PdfRow.Desligados)")
  $lines.Add("      total: $(YamlNumber $PdfRow.Total)")
  $lines.Add("      taxa_evasao: $(Q $PdfRow.TaxaEvasao)")
  $lines.Add("      tempo_medio_mestrado: $(YamlNumber $PdfRow.TempoMestrado)")
  $lines.Add("      tempo_medio_doutorado: $(YamlNumber $PdfRow.TempoDoutorado)")
  $lines.Add("      tempo_medio_doutorado_direto: $(YamlNumber $PdfRow.TempoDoutoradoDireto)")
  $lines.Add((StudentYaml $PdfRow.Alunos))
  return ($lines -join "`r`n")
}

function CredentialBlock($CredentialRow, [string]$PdfFile, $PdfRow) {
  $items = @()
  if ($CredentialRow) { $items = @($CredentialRow.Credenciamentos | Sort-Object @{Expression={ CredentialRank $_.tipo }}, curso) }
  $tipo = ""
  if ($items.Count) {
    $tipo = (@($items | Sort-Object @{Expression={ CredentialRank $_.tipo }} | Select-Object -First 1)[0]).tipo
  }
  $categoria = if ($tipo) { CredentialCategory $tipo } else { "sem_credenciamento" }
  $periodo = if ($CredentialRow) { $CredentialRow.Periodo } else { "" }
  $freshness = CredentialFreshness $items $CredentialRow $PdfRow 3
  $lines = New-Object System.Collections.Generic.List[string]
  $lines.Add("    credenciamento:")
  $lines.Add("      arquivo: $(Q $PdfFile)")
  $lines.Add("      arquivo_pdf: $(Q $PdfFile)")
  $lines.Add("      periodo_pdf: $(Q $periodo)")
  $lines.Add("      tipo: $(Q $tipo)")
  $lines.Add("      categoria: $(Q $categoria)")
  $lines.Add("      data_primeiro_credenciamento: $(Q $freshness.DataPrimeiroCredenciamento)")
  $lines.Add("      data_inicio_credenciamento_pdf: $(Q $freshness.DataInicioCredenciamentoPdf)")
  $lines.Add("      referencia_entrada_recente: $(Q $freshness.Referencia)")
  $lines.Add("      corte_entrada_recente: $(Q $freshness.Corte)")
  $lines.Add("      anos_desde_primeiro_credenciamento: $(YamlNumber $freshness.Anos)")
  $lines.Add("      entrada_recente_anos: $($freshness.LimiteAnos)")
  $lines.Add("      evidencia_orientacao_anterior: $(YamlBool $freshness.TemEvidenciaOrientacaoAnterior)")
  $lines.Add("      entrada_recente: $(YamlBool $freshness.EntradaRecente)")
  if ($items.Count) {
    $lines.Add("      credenciamentos:")
    foreach ($item in $items) {
      $lines.Add("        - curso: $(Q $item.curso)")
      $lines.Add("          tipo: $(Q $item.tipo)")
      $lines.Add("          categoria: $(Q $item.categoria)")
      $lines.Add("          data_inicial: $(Q $item.data_inicial)")
      $lines.Add("          data_final: $(Q $item.data_final)")
    }
  } else {
    $lines.Add("      credenciamentos: []")
  }
  return ($lines -join "`r`n")
}

function DisciplineBlock($DisciplineRow, [string]$PdfFile) {
  $items = @($DisciplineRow.Turmas.Values | Sort-Object data_inicio, sigla, turma, disciplina)
  $lines = New-Object System.Collections.Generic.List[string]
  $lines.Add("    disciplinas:")
  $lines.Add("      arquivo: $(Q $PdfFile)")
  $lines.Add("      arquivo_pdf: $(Q $PdfFile)")
  $lines.Add("      periodo_pdf: $(Q $DisciplineRow.Periodo)")
  $lines.Add("      total: $($items.Count)")
  if ($items.Count) {
    $lines.Add("      turmas:")
    foreach ($item in $items) {
      $lines.Add("        - sigla: $(Q $item.sigla)")
      $lines.Add("          turma: $(Q $item.turma)")
      $lines.Add("          disciplina: $(Q $item.disciplina)")
      $lines.Add("          periodo: $(Q $item.periodo)")
      $lines.Add("          data_inicio: $(Q $item.data_inicio)")
      $lines.Add("          data_fim: $(Q $item.data_fim)")
    }
  } else {
    $lines.Add("      turmas: []")
  }
  return ($lines -join "`r`n")
}

function OptionalJsonValue($Value) {
  if ($null -eq $Value) { return "" }
  return $Value
}

function StudentObject($Student) {
  $item = [ordered]@{
    nusp = OptionalJsonValue $Student.nusp
    nome = OptionalJsonValue $Student.nome
    curso = OptionalJsonValue $Student.curso
    data_situacao = OptionalJsonValue $Student.data_situacao
    situacao = OptionalJsonValue $Student.situacao
    categoria = OptionalJsonValue $Student.categoria
  }
  if ($null -ne $Student.tempo_titulacao_meses) {
    $item.tempo_titulacao_meses = $Student.tempo_titulacao_meses
  }
  if ($Student.fonte) { $item.fonte = $Student.fonte }
  return [pscustomobject]$item
}

function CourseRank([string]$Curso) {
  if ($Curso -eq "ME") { return 1 }
  if ($Curso -eq "DO") { return 2 }
  if ($Curso -eq "DD") { return 3 }
  return 9
}

function CourseGroupKey([string]$Curso) {
  if ($Curso -eq "ME") { return "mestrado" }
  if ($Curso -eq "DO") { return "doutorado" }
  if ($Curso -eq "DD") { return "doutorado_direto" }
  return "outros"
}

function New-ActiveStudentTotals($Students) {
  $totals = [ordered]@{
    mestrado = 0
    doutorado = 0
    doutorado_direto = 0
    total = 0
  }
  foreach ($student in $Students) {
    $key = CourseGroupKey $student.curso
    if ($totals.Contains($key)) {
      $totals[$key] += 1
    }
    $totals.total += 1
  }
  return [pscustomobject]$totals
}

function New-ActiveStudentObject($Student) {
  return [pscustomobject][ordered]@{
    nusp = OptionalJsonValue $Student.nusp
    nome = OptionalJsonValue $Student.nome
    curso = OptionalJsonValue $Student.curso
    data_situacao = OptionalJsonValue $Student.data_situacao
    situacao = OptionalJsonValue $Student.situacao
    orientadores = @($Student.orientadores | ForEach-Object {
      [pscustomobject][ordered]@{
        docente_id = OptionalJsonValue $_.docente_id
        nome = OptionalJsonValue $_.nome
      }
    })
  }
}

function New-ActiveStudentGroups($Students) {
  $groups = [ordered]@{
    mestrado = @()
    doutorado = @()
    doutorado_direto = @()
  }
  foreach ($student in ($Students | Sort-Object @{Expression={ CourseRank $_.curso }}, nome, nusp)) {
    $key = CourseGroupKey $student.curso
    if ($groups.Contains($key)) {
      $groups[$key] = @($groups[$key]) + (New-ActiveStudentObject $student)
    }
  }
  return [pscustomobject]$groups
}

function DocenteCredentialCategory($Docente) {
  if (-not $Docente -or -not $Docente.credenciamento) { return "sem_credenciamento" }
  $items = $Docente.credenciamento.Credenciamentos
  if (-not $items -or -not $items.Count) { return "sem_credenciamento" }
  $item = @($items | Sort-Object @{Expression={ CredentialRank $_.tipo }} | Select-Object -First 1)[0]
  return CredentialCategory $item.tipo
}

function Collect-ActiveStudents($Docentes) {
  $byKey = @{}
  foreach ($docente in $Docentes) {
    if ((DocenteCredentialCategory $docente) -eq "sem_credenciamento") { continue }
    $alunos = @()
    if ($docente.janus -and $docente.janus.Alunos) {
      $alunos = @($docente.janus.Alunos.Values)
    }
    foreach ($student in $alunos) {
      $categoria = if ($student.categoria) { $student.categoria } else { StudentCategory $student.situacao }
      if ($categoria -ne "ativo") { continue }
      $curso = $student.curso
      $key = if ($student.nusp) { "$($student.nusp)|$curso" } else { "$(Normalize-Text $student.nome)|$curso" }
      if (-not $byKey.ContainsKey($key)) {
        $byKey[$key] = [pscustomobject]@{
          chave = $key
          nusp = $student.nusp
          nome = $student.nome
          curso = $curso
          data_situacao = $student.data_situacao
          situacao = $student.situacao
          orientadores = New-Object System.Collections.Generic.List[object]
          docente_ids = New-Object System.Collections.Generic.HashSet[string]
        }
      }
      $entry = $byKey[$key]
      if ($docente.id -and $entry.docente_ids.Add($docente.id)) {
        $entry.orientadores.Add([pscustomobject]@{
          docente_id = $docente.id
          nome = $docente.nome
        })
      }
    }
  }
  return @($byKey.Values | Sort-Object @{Expression={ CourseRank $_.curso }}, nome, nusp)
}

function Add-ActiveStudentsYamlGroup($Lines, [string]$Key, $Students) {
  $items = @($Students | ForEach-Object { $_ })
  if (-not $items.Count) {
    $Lines.Add("  ${Key}: []")
    return
  }
  $Lines.Add("  ${Key}:")
  foreach ($student in $items) {
    $Lines.Add("    - nusp: $(Q $student.nusp)")
    $Lines.Add("      nome: $(Q $student.nome)")
    $Lines.Add("      curso: $(Q $student.curso)")
    $Lines.Add("      data_situacao: $(Q $student.data_situacao)")
    $Lines.Add("      situacao: $(Q $student.situacao)")
    $Lines.Add("      orientadores:")
    foreach ($orientador in ($student.orientadores | ForEach-Object { $_ })) {
      $Lines.Add("        - docente_id: $(Q $orientador.docente_id)")
      $Lines.Add("          nome: $(Q $orientador.nome)")
    }
  }
}

function Write-ActiveStudentsFiles([string]$MarkdownPath, [string]$JsonPath, $Students, [string]$UpdatedAt, [string]$Periodo) {
  $totals = New-ActiveStudentTotals $Students
  $groups = New-ActiveStudentGroups $Students
  $dedupe = "NUSP + curso; se nao houver NUSP, nome normalizado + curso"
  $scope = "Docentes plenos, especificos e vencidos com orientando; sem credenciamento ativo fica fora das analises"

  $lines = New-Object System.Collections.Generic.List[string]
  $lines.Add("---")
  $lines.Add('title: "Alunos ativos"')
  $lines.Add("build:")
  $lines.Add("  render: never")
  $lines.Add("  list: never")
  $lines.Add('fonte: "static/janus.pdf"')
  $lines.Add('gerado_por: "scripts/atualizar-docentes-janus.ps1"')
  $lines.Add("atualizado_em: $(Q $UpdatedAt)")
  $lines.Add("periodo_pdf: $(Q $Periodo)")
  $lines.Add("criterio_deduplicacao: $(Q $dedupe)")
  $lines.Add("escopo: $(Q $scope)")
  $lines.Add("totais:")
  $lines.Add("  mestrado: $($totals.mestrado)")
  $lines.Add("  doutorado: $($totals.doutorado)")
  $lines.Add("  doutorado_direto: $($totals.doutorado_direto)")
  $lines.Add("  total: $($totals.total)")
  $lines.Add("alunos_ativos:")
  Add-ActiveStudentsYamlGroup $lines "mestrado" $groups.mestrado
  Add-ActiveStudentsYamlGroup $lines "doutorado" $groups.doutorado
  Add-ActiveStudentsYamlGroup $lines "doutorado_direto" $groups.doutorado_direto
  $lines.Add("---")
  $lines.Add("")
  $lines.Add("Arquivo gerado automaticamente a partir de `static/janus.pdf`.")
  $lines.Add("")
  $lines.Add("| Curso | Alunos ativos |")
  $lines.Add("|---|---:|")
  $lines.Add("| Mestrado | $($totals.mestrado) |")
  $lines.Add("| Doutorado | $($totals.doutorado) |")
  $lines.Add("| Doutorado direto | $($totals.doutorado_direto) |")
  $lines.Add("| Total | $($totals.total) |")

  $targetDir = Split-Path -Parent $MarkdownPath
  if (-not (Test-Path -LiteralPath $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir | Out-Null
  }
  Set-Content -LiteralPath $MarkdownPath -Value ($lines -join "`r`n") -Encoding UTF8

  $dataObject = [pscustomobject][ordered]@{
    title = "Alunos ativos"
    build = [pscustomobject][ordered]@{
      render = "never"
      list = "never"
    }
    fonte = "static/janus.pdf"
    gerado_por = "scripts/atualizar-docentes-janus.ps1"
    atualizado_em = $UpdatedAt
    periodo_pdf = $Periodo
    criterio_deduplicacao = $dedupe
    escopo = $scope
    totais = $totals
    alunos_ativos = $groups
  }
  $json = $dataObject | ConvertTo-Json -Depth 12
  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($JsonPath, $json, $utf8NoBom)
}

function JanusObject($PdfRow, [string]$PdfFile) {
  return [pscustomobject][ordered]@{
    arquivo = $PdfFile
    arquivo_pdf = $PdfFile
    periodo_pdf = OptionalJsonValue $PdfRow.Periodo
    nusp = OptionalJsonValue $PdfRow.Nusp
    orientandos_area = OptionalJsonValue $PdfRow.OrientandosArea
    titulados = OptionalJsonValue $PdfRow.Titulados
    titulados_arquivo_pdf = $PdfRow.TituladosArquivo
    titulados_periodo_pdf = $PdfRow.TituladosPeriodo
    desligados = OptionalJsonValue $PdfRow.Desligados
    total = OptionalJsonValue $PdfRow.Total
    taxa_evasao = OptionalJsonValue $PdfRow.TaxaEvasao
    tempo_medio_mestrado = OptionalJsonValue $PdfRow.TempoMestrado
    tempo_medio_doutorado = OptionalJsonValue $PdfRow.TempoDoutorado
    tempo_medio_doutorado_direto = OptionalJsonValue $PdfRow.TempoDoutoradoDireto
    alunos = @($PdfRow.Alunos.Values | Sort-Object categoria, nome, data_situacao | ForEach-Object { StudentObject $_ })
  }
}

function CredentialObject($CredentialRow, [string]$PdfFile, $PdfRow) {
  $items = @()
  if ($CredentialRow) { $items = @($CredentialRow.Credenciamentos | Sort-Object @{Expression={ CredentialRank $_.tipo }}, curso) }
  $tipo = ""
  if ($items.Count) {
    $tipo = (@($items | Sort-Object @{Expression={ CredentialRank $_.tipo }} | Select-Object -First 1)[0]).tipo
  }
  $categoria = if ($tipo) { CredentialCategory $tipo } else { "sem_credenciamento" }
  $periodo = if ($CredentialRow) { $CredentialRow.Periodo } else { "" }
  $freshness = CredentialFreshness $items $CredentialRow $PdfRow 3
  return [pscustomobject][ordered]@{
    arquivo = $PdfFile
    arquivo_pdf = $PdfFile
    periodo_pdf = OptionalJsonValue $periodo
    tipo = OptionalJsonValue $tipo
    categoria = $categoria
    data_primeiro_credenciamento = OptionalJsonValue $freshness.DataPrimeiroCredenciamento
    data_inicio_credenciamento_pdf = OptionalJsonValue $freshness.DataInicioCredenciamentoPdf
    referencia_entrada_recente = OptionalJsonValue $freshness.Referencia
    corte_entrada_recente = OptionalJsonValue $freshness.Corte
    anos_desde_primeiro_credenciamento = OptionalJsonValue $freshness.Anos
    entrada_recente_anos = $freshness.LimiteAnos
    evidencia_orientacao_anterior = $freshness.TemEvidenciaOrientacaoAnterior
    entrada_recente = $freshness.EntradaRecente
    credenciamentos = @($items | ForEach-Object {
      [pscustomobject][ordered]@{
        curso = OptionalJsonValue $_.curso
        tipo = OptionalJsonValue $_.tipo
        categoria = OptionalJsonValue $_.categoria
        data_inicial = OptionalJsonValue $_.data_inicial
        data_final = OptionalJsonValue $_.data_final
      }
    })
  }
}

function DisciplineObject($DisciplineRow, [string]$PdfFile) {
  $items = @($DisciplineRow.Turmas.Values | Sort-Object data_inicio, sigla, turma, disciplina)
  return [pscustomobject][ordered]@{
    arquivo = $PdfFile
    arquivo_pdf = $PdfFile
    periodo_pdf = OptionalJsonValue $DisciplineRow.Periodo
    total = $items.Count
    turmas = @($items | ForEach-Object {
      [pscustomobject][ordered]@{
        sigla = OptionalJsonValue $_.sigla
        turma = OptionalJsonValue $_.turma
        disciplina = OptionalJsonValue $_.disciplina
        periodo = OptionalJsonValue $_.periodo
        data_inicio = OptionalJsonValue $_.data_inicio
        data_fim = OptionalJsonValue $_.data_fim
      }
    })
  }
}

function Read-ExistingMetadata([string]$Path) {
  $byName = @{}
  $byNusp = @{}
  $maxId = 0
  if (-not (Test-Path -LiteralPath $Path)) {
    return [pscustomobject]@{ ByName = $byName; ByNusp = $byNusp; MaxId = $maxId }
  }
  $text = Get-Content -LiteralPath $Path -Raw
  $blocks = [regex]::Matches($text, '(?ms)^  - id:.*?(?=^  - id:|^---\s*$)')
  foreach ($blockMatch in $blocks) {
    $block = $blockMatch.Value
    $idMatch = [regex]::Match($block, '(?m)^\s+- id:\s*(.+?)\s*$')
    $nameMatch = [regex]::Match($block, '(?m)^\s+nome:\s*(.+?)\s*$')
    if (-not $idMatch.Success -or -not $nameMatch.Success) { continue }
    $id = Unquote $idMatch.Groups[1].Value
    $name = Unquote $nameMatch.Groups[1].Value
    $nuspMatch = [regex]::Match($block, '(?m)^\s+nusp:\s*(.+?)\s*$')
    $lattesIdMatch = [regex]::Match($block, '(?m)^\s+lattes_id:\s*(.+?)\s*$')
    $lattesUrlMatch = [regex]::Match($block, '(?m)^\s+lattes_url:\s*(.+?)\s*$')
    if ($id -match '^doc-(\d+)$') { $maxId = [Math]::Max($maxId, [int]$matches[1]) }
    $meta = [pscustomobject]@{
      id = $id
      nome = $name
      nusp = if ($nuspMatch.Success) { Unquote $nuspMatch.Groups[1].Value } else { "" }
      lattes_id = if ($lattesIdMatch.Success) { Unquote $lattesIdMatch.Groups[1].Value } else { "" }
      lattes_url = if ($lattesUrlMatch.Success) { Unquote $lattesUrlMatch.Groups[1].Value } else { "" }
    }
    $byName[(Normalize-Text $name)] = $meta
    if ($meta.nusp) { $byNusp[$meta.nusp] = $meta }
  }
  return [pscustomobject]@{ ByName = $byName; ByNusp = $byNusp; MaxId = $maxId }
}

function Read-LattesMapping([string]$Path) {
  $byName = @{}
  $byId = @{}
  if (-not (Test-Path -LiteralPath $Path)) {
    return [pscustomobject]@{ ByName = $byName; ById = $byId }
  }
  Import-Csv -LiteralPath $Path | ForEach-Object {
    $item = [pscustomobject]@{
      docente_id = $_.docente_id
      nome = $_.nome
      lattes_id = $_.lattes_id
      lattes_url = $_.lattes_url
    }
    if ($item.nome) { $byName[(Normalize-Text $item.nome)] = $item }
    if ($item.docente_id) { $byId[$item.docente_id] = $item }
  }
  return [pscustomobject]@{ ByName = $byName; ById = $byId }
}

$pdfRows = ReadPdfRows $PdfPath
if (-not $pdfRows.Count) {
  throw "Nenhum orientador encontrado em static/janus.pdf."
}
$credentialRows = ReadCredentialRows $OrientadoresPath
if (-not $credentialRows.Count) {
  throw "Nenhum credenciamento encontrado em static/orientadores.pdf."
}
$disciplineResult = ReadDisciplineRows $DisciplinasPath
if (-not $disciplineResult.Rows.Count) {
  throw "Nenhuma turma com ministrante encontrada em static/disciplinas.pdf."
}

$existing = Read-ExistingMetadata $DocentesPath
$mapping = Read-LattesMapping $MappingCsv
$exclusionsPath = Join-Path $root "data\controle\docentes-excluidos.json"
$excludedNusps = New-Object System.Collections.Generic.HashSet[string]
if (-not (Test-Path -LiteralPath $exclusionsPath -PathType Leaf)) {
  throw "Lista de exclusões ausente: data/controle/docentes-excluidos.json. Use docentes: [] para uma lista vazia."
}
$exclusions = Get-Content -LiteralPath $exclusionsPath -Raw | ConvertFrom-Json
if ($exclusions.schema_version -ne 1 -or $exclusions.docentes -isnot [System.Array]) {
  throw "Formato inválido em data/controle/docentes-excluidos.json."
}
foreach ($entry in $exclusions.docentes) {
  if ([string]$entry.nusp -notmatch '^\d+$' -or -not $excludedNusps.Add([string]$entry.nusp)) {
    throw "NUSP ausente, inválido ou duplicado em data/controle/docentes-excluidos.json."
  }
}
$usedIds = New-Object System.Collections.Generic.HashSet[string]
$nextId = [Math]::Max(1, $existing.MaxId + 1)
$docentes = New-Object System.Collections.Generic.List[object]
$periodoJanus = (@($pdfRows.Values | Select-Object -First 1)[0]).Periodo
$periodoDisciplinas = $disciplineResult.Periodo
$tituladosResult = NewJanusTituladosResult $pdfRows $periodoJanus

$allNusps = New-Object System.Collections.Generic.HashSet[string]
foreach ($key in $pdfRows.Keys) { [void]$allNusps.Add($key) }
foreach ($key in $credentialRows.Keys) { [void]$allNusps.Add($key) }

$sourceRows = @($allNusps | ForEach-Object {
  $nusp = [string]$_
  $janusRow = if ($pdfRows.ContainsKey($nusp)) { $pdfRows[$nusp] } else { $null }
  $credentialRow = if ($credentialRows.ContainsKey($nusp)) { $credentialRows[$nusp] } else { $null }
  $nome = if ($janusRow) { $janusRow.Nome } elseif ($credentialRow) { $credentialRow.Nome } else { "" }
  [pscustomobject]@{
    Nusp = if ($janusRow) { $janusRow.Nusp } else { $nusp }
    Nome = $nome
    Janus = $janusRow
    Credenciamento = $credentialRow
  }
} | Sort-Object Nome, Nusp)

foreach ($source in $sourceRows) {
  # Exclusão de exibição persistente; os relatórios Janus originais permanecem intactos.
  if ($excludedNusps.Contains([string]$source.Nusp)) { continue }
  $row = if ($source.Janus) { $source.Janus } else { New-EmptyPdfRow $source.Nusp $source.Nome $periodoJanus }
  $disciplineRow = if ($disciplineResult.Rows.ContainsKey($source.Nusp)) {
    $disciplineResult.Rows[$source.Nusp]
  } else {
    New-EmptyDisciplineRow $source.Nusp $source.Nome $periodoDisciplinas
  }
  $keyName = Normalize-Text $row.Nome
  $meta = if ($existing.ByNusp.ContainsKey($row.Nusp)) { $existing.ByNusp[$row.Nusp] } elseif ($existing.ByName.ContainsKey($keyName)) { $existing.ByName[$keyName] } else { $null }
  $map = if ($mapping.ByName.ContainsKey($keyName)) { $mapping.ByName[$keyName] } else { $null }
  $id = if ($meta -and $meta.id) { $meta.id } elseif ($map -and $map.docente_id) { $map.docente_id } else { "" }
  if (-not $id -or $usedIds.Contains($id)) {
    do {
      $id = "doc-{0:D3}" -f $nextId
      $nextId++
    } while ($usedIds.Contains($id))
  }
  [void]$usedIds.Add($id)
  $lattesId = if ($map -and $map.lattes_id) { $map.lattes_id } elseif ($meta) { $meta.lattes_id } else { "" }
  $lattesUrl = if ($map -and $map.lattes_url) { $map.lattes_url } elseif ($meta) { $meta.lattes_url } else { "" }
  $docentes.Add([pscustomobject]@{
    id = $id
    nome = $row.Nome
    lattes_id = $lattesId
    lattes_url = $lattesUrl
    janus = $row
    credenciamento = $source.Credenciamento
    disciplinas = $disciplineRow
  })
}

$analysisRoster = @($docentes | ForEach-Object {
  [pscustomobject]@{
    nome = $_.nome
    nusp = $_.janus.Nusp
    categoria = DocenteCredentialCategory $_
  }
})
$annualSummary = NewTituladosAnnualSummary $analysisRoster $tituladosResult $periodoJanus
$tituladosNoPeriodo = $annualSummary.total
$tituladosForaEscopo = $tituladosResult.Alunos.Count - $tituladosNoPeriodo
$analysisScope = "Docentes plenos, específicos e vencidos com orientando; sem credenciamento ativo ou excluídos do site ficam fora das análises."

$updatedAt = [DateTime]::UtcNow.ToString('s') + 'Z'
$dataDir = Join-Path $root "data\controle"
if (-not (Test-Path -LiteralPath $dataDir)) {
  New-Item -ItemType Directory -Path $dataDir | Out-Null
}
$alunosAtivos = @(Collect-ActiveStudents $docentes)
$alunosAtivosDataPath = Join-Path $dataDir "alunos-ativos.json"
Write-ActiveStudentsFiles $AlunosAtivosPath $alunosAtivosDataPath $alunosAtivos $updatedAt $periodoJanus
$alunosAtivosTotais = New-ActiveStudentTotals $alunosAtivos

$lines = New-Object System.Collections.Generic.List[string]
$description = "Base gerada a partir dos PDFs Janus canônicos em static/janus.pdf, static/orientadores.pdf e static/disciplinas.pdf."
$lines.Add("---")
$lines.Add('title: "Docentes"')
$lines.Add("build:")
$lines.Add("  render: never")
$lines.Add("  list: never")
$lines.Add('fonte: "static/janus.pdf + static/orientadores.pdf + static/disciplinas.pdf"')
$lines.Add('gerado_por: "scripts/atualizar-docentes-janus.ps1"')
$lines.Add("atualizado_em: $(Q $updatedAt)")
$lines.Add("descricao: $(Q $description)")
$lines.Add("titulados_fonte:")
$lines.Add('  arquivo_pdf: "janus.pdf"')
$lines.Add("  periodo_pdf: $(Q $tituladosResult.Periodo)")
$lines.Add("  totais_pdf:")
foreach ($property in $tituladosResult.Totais.PSObject.Properties) {
  $lines.Add("    $($property.Name): $($property.Value)")
}
$lines.Add("  total_no_periodo: $tituladosNoPeriodo")
$lines.Add("  total_fora_escopo: $tituladosForaEscopo")
$lines.Add("  escopo: $(Q $analysisScope)")
$lines.Add("docentes:")
foreach ($docente in $docentes) {
  $lines.Add("  - id: $(Q $docente.id)")
  $lines.Add("    nome: $(Q $docente.nome)")
  if ($docente.lattes_id) { $lines.Add("    lattes_id: $(Q $docente.lattes_id)") }
  if ($docente.lattes_url) { $lines.Add("    lattes_url: $(Q $docente.lattes_url)") }
  $lines.Add((JanusBlock $docente.janus "janus.pdf"))
  $lines.Add((CredentialBlock $docente.credenciamento "orientadores.pdf" $docente.janus))
  $lines.Add((DisciplineBlock $docente.disciplinas "disciplinas.pdf"))
}
$lines.Add("---")
$lines.Add("")
$lines.Add('Arquivo gerado automaticamente a partir de `static/janus.pdf`, `static/orientadores.pdf` e `static/disciplinas.pdf`.')

$targetDir = Split-Path -Parent $DocentesPath
if (-not (Test-Path -LiteralPath $targetDir)) {
  New-Item -ItemType Directory -Path $targetDir | Out-Null
}
Set-Content -LiteralPath $DocentesPath -Value ($lines -join "`r`n") -Encoding UTF8

$dataPath = Join-Path $dataDir "docentes.json"
$dataDocentes = @($docentes | ForEach-Object {
  $item = [ordered]@{
    id = $_.id
    nome = $_.nome
  }
  if ($_.lattes_id) { $item.lattes_id = $_.lattes_id }
  if ($_.lattes_url) { $item.lattes_url = $_.lattes_url }
  $item.janus = JanusObject $_.janus "janus.pdf"
  $item.credenciamento = CredentialObject $_.credenciamento "orientadores.pdf" $_.janus
  $item.disciplinas = DisciplineObject $_.disciplinas "disciplinas.pdf"
  [pscustomobject]$item
})
$dataObject = [pscustomobject][ordered]@{
  title = "Docentes"
  build = [pscustomobject][ordered]@{
    render = "never"
    list = "never"
  }
  fonte = "static/janus.pdf + static/orientadores.pdf + static/disciplinas.pdf"
  gerado_por = "scripts/atualizar-docentes-janus.ps1"
  atualizado_em = $updatedAt
  descricao = $description
  titulados_fonte = [pscustomobject][ordered]@{
    arquivo_pdf = "janus.pdf"
    periodo_pdf = $tituladosResult.Periodo
    totais_pdf = $tituladosResult.Totais
    total_no_periodo = $tituladosNoPeriodo
    total_fora_escopo = $tituladosForaEscopo
    escopo = $analysisScope
  }
  docentes = $dataDocentes
}
$json = $dataObject | ConvertTo-Json -Depth 12
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($dataPath, $json, $utf8NoBom)
$annualPath = Join-Path $dataDir 'titulados-por-ano.json'
$annualSummary | Add-Member -NotePropertyName atualizado_em -NotePropertyValue $updatedAt
[System.IO.File]::WriteAllText($annualPath, ($annualSummary | ConvertTo-Json -Depth 10), $utf8NoBom)

$monthly = NewMonthlyIndicators $tituladosResult -Roster $analysisRoster
$monthlyPath = Join-Path $dataDir 'indicadores-mensais.json'
[IO.File]::WriteAllText($monthlyPath, ($monthly | ConvertTo-Json -Depth 12), $utf8NoBom)

[pscustomobject]@{
  Pdf = "janus.pdf"
  Orientadores = "orientadores.pdf"
  Disciplinas = "disciplinas.pdf"
  Titulados = "janus.pdf"
  PeriodoTitulados = $tituladosResult.Periodo
  TituladosLidos = $tituladosResult.Alunos.Count
  TituladosNoPeriodo = $tituladosNoPeriodo
  DadosTituladosPorAno = $annualPath
  Docentes = $docentes.Count
  Credenciamentos = $credentialRows.Count
  Periodo = (@($pdfRows.Values | Select-Object -First 1)[0]).Periodo
  PeriodoDisciplinas = $periodoDisciplinas
  DocentesComDisciplinas = @($docentes | Where-Object { $_.disciplinas.Turmas.Count -gt 0 }).Count
  AtribuicoesDeDisciplinas = @($docentes | ForEach-Object { $_.disciplinas.Turmas.Count } | Measure-Object -Sum).Sum
  Arquivo = $DocentesPath
  Dados = $dataPath
  AlunosAtivos = $alunosAtivos.Count
  AlunosAtivosTotais = $alunosAtivosTotais
  ArquivoAlunosAtivos = $AlunosAtivosPath
  DadosAlunosAtivos = $alunosAtivosDataPath
}
