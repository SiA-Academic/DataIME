param(
  [string]$PdfPath = "",
  [switch]$SkipRealPdf
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
if (-not $PdfPath) { $PdfPath = Join-Path $root "static\janus.pdf" }

# Load definitions only, without running the updater or changing source PDFs/data.
$parseTokens = $null
$parseErrors = $null
$updaterAst = [System.Management.Automation.Language.Parser]::ParseFile(
  (Join-Path $PSScriptRoot "atualizar-docentes-janus.ps1"),
  [ref]$parseTokens,
  [ref]$parseErrors
)
if ($parseErrors.Count) { throw ($parseErrors.Message -join "`n") }
foreach ($definition in $updaterAst.FindAll({ param($node)
  $node -is [System.Management.Automation.Language.FunctionDefinitionAst]
}, $false)) {
  . ([scriptblock]::Create($definition.Extent.Text))
}
$originalPdfConverter = (Get-Command ConvertPdfToTextLines).ScriptBlock
$script:passedTests = 0
$script:fixturePeriod = '01/01/2022 a 20/10/2026'

function Assert-Equal($Actual, $Expected, [string]$Message) {
  if ($Actual -ne $Expected) { throw "$Message (actual: $Actual; expected: $Expected)" }
}

function Assert-True($Condition, [string]$Message) {
  if (-not $Condition) { throw $Message }
}

function Assert-Throws([scriptblock]$Action, [string]$Pattern) {
  $errorMessage = $null
  try { & $Action | Out-Null } catch { $errorMessage = $_.Exception.Message }
  if (-not $errorMessage -or $errorMessage -notmatch $Pattern) {
    throw "Expected an error matching '$Pattern'; received '$errorMessage'."
  }
}

function Test-Case([string]$Name, [scriptblock]$Action) {
  & $Action
  $script:passedTests += 1
  Write-Host "PASS $Name"
}

function New-TextHeader([string]$Period = $script:fixturePeriod, [int]$Advisors = 1) {
  @(
    'Estatísticas por orientador'
    'Área: 45134 - Ciência da Computação'
    "Período: $Period"
    'Cursos: Mestrado, Doutorado, Doutorado Direto'
    "Orientadores: $Advisors"
  )
}

function New-TextStudent(
  [string]$Nusp = '101',
  [string]$Name = 'Bruna Silva',
  [string]$Course = 'ME',
  [string]$Date = '10/06/2024',
  [string]$Status = 'Titulado em 30 meses'
) {
  "45134 $Nusp $Name $Course $Date $Status"
}

function New-TextTotals([int]$Active = 0, [int]$Titled = 0, [int]$Withdrawn = 0, [int]$Total = -1) {
  if ($Total -lt 0) { $Total = $Active + $Titled + $Withdrawn }
  "Orientandos: $Active Titulados: $Titled Desligados: $Withdrawn Total: $Total alunos Taxa de evasão: 0%"
}

function Read-TextFixture([string[]]$Lines) {
  $script:fixtureLines = $Lines
  ReadPdfRows 'fixture-text-only'
}

function Read-TitledFixture([string[]]$Lines, [string]$Period = $script:fixturePeriod) {
  $rows = Read-TextFixture $Lines
  NewJanusTituladosResult $rows $Period
}

if (-not $SkipRealPdf) {
  Test-Case 'real Janus PDF reconciles advisor totals and retains exact degree identities' {
    $rows = ReadPdfRows $PdfPath
    Assert-True ($rows.Count -gt 0) 'The real PDF must contain advisors'
    $period = @($rows.Values | Select-Object -First 1)[0].Periodo
    $actual = NewJanusTituladosResult $rows $period
    $expectedTotal = [int](($rows.Values | Measure-Object Titulados -Sum).Sum)
    Assert-Equal $actual.Alunos.Count $expectedTotal 'All declared titles must be accounted for'
    Assert-Equal $actual.Totais.total $expectedTotal 'Aggregate title total'
    Assert-Equal @($actual.Alunos | Where-Object curso -eq 'ME').Count $actual.Totais.mestrado 'Master degrees'
    Assert-Equal @($actual.Alunos | Where-Object curso -eq 'DO').Count $actual.Totais.doutorado 'Doctoral degrees'
    Assert-Equal @($actual.Alunos | Where-Object curso -eq 'DD').Count $actual.Totais.doutorado_direto 'Direct doctoral degrees'
    Assert-Equal @($actual.Alunos | Where-Object { -not $_.nusp -or -not $_.orientador -or $_.fonte -ne 'static/janus.pdf' }).Count 0 'Student identity, advisor and source come from Janus'
    Assert-Equal @($actual.Alunos | Where-Object categoria -ne 'titulado').Count 0 'Only titled students enter the title series'
    foreach ($advisor in $rows.Values) {
      Assert-Equal $advisor.Alunos.Count $advisor.Total "Advisor $($advisor.Nusp) total"
    }
  }
}

try {
  Set-Item Function:ConvertPdfToTextLines -Value {
    param([string]$Path, [string]$Label)
    return $script:fixtureLines
  }

  Test-Case 'Janus supplies exact ME DO DD degrees while retaining active and withdrawn rows' {
    $lines = @(New-TextHeader) + 'Orientador: 1 - Álvaro de Souza' + @(
      New-TextStudent '101' 'Bruna Silva' 'ME'
      New-TextStudent '102' 'Carlos Lima' 'DO' '11/06/2024' 'Titulado em 60 meses'
      New-TextStudent '103' 'Daniela Reis' 'DD' '12/06/2024' 'Titulado em 48 meses'
      New-TextStudent '104' 'Aluno ativo' 'ME' '14/08/2026' 'Ativo'
      New-TextStudent '105' 'Aluno desligado' 'DO' '15/08/2026' 'Desligado'
      New-TextTotals -Active 1 -Titled 3 -Withdrawn 1
    )
    $rows = Read-TextFixture $lines
    $result = NewJanusTituladosResult $rows $script:fixturePeriod
    Assert-Equal $rows['1'].Alunos.Count 5 'All situations retained'
    Assert-Equal $rows['1'].OrientandosArea 1 'Active count'
    Assert-Equal $rows['1'].Desligados 1 'Withdrawn count'
    Assert-Equal $result.Totais.total 3 'Only titled students in title result'
    Assert-Equal $result.Totais.mestrado 1 'ME total'
    Assert-Equal $result.Totais.doutorado 1 'DO total'
    Assert-Equal $result.Totais.doutorado_direto 1 'DD total'
    $bruna = @($result.Alunos | Where-Object nusp -eq '101')[0]
    Assert-Equal $bruna.tempo_titulacao_meses 30 'Duration imported from Janus'
    Assert-Equal $bruna.orientador 'Álvaro de Souza' 'Advisor imported from Janus'
    Assert-Equal $bruna.fonte 'static/janus.pdf' 'Single student source'
    Assert-Equal $result.Inicio ([datetime]'2022-01-01') 'Coverage start'
    Assert-Equal $result.Fim ([datetime]'2026-10-20') 'Coverage end'
  }

  Test-Case 'two degrees for one NUSP are retained separately' {
    $lines = @(New-TextHeader) + 'Orientador: 1 - Álvaro de Souza' + @(
      New-TextStudent '101' 'Bruna Silva' 'ME' '10/06/2022'
      New-TextStudent '101' 'Bruna Silva' 'DO' '10/06/2026'
      New-TextTotals -Titled 2
    )
    $result = Read-TitledFixture $lines
    Assert-Equal $result.Alunos.Count 2 'Both degrees retained'
    Assert-Equal $result.Totais.mestrado 1 'Master degree retained'
    Assert-Equal $result.Totais.doutorado 1 'Doctoral degree retained'
  }

  Test-Case 'identical repeated table lines count once' {
    $student = New-TextStudent
    $lines = @(New-TextHeader) + 'Orientador: 1 - Álvaro de Souza' + @(
      $student
      '1 of 2'
      "`fEstatísticas por orientador"
      $student
      New-TextTotals -Titled 1
    )
    $result = Read-TitledFixture $lines
    Assert-Equal $result.Alunos.Count 1 'Repeated rendered line is deduplicated'
    Assert-Equal $result.Totais.total 1 'Repeated line is not double counted'
  }

  Test-Case 'conflicting duplicate student records fail explicitly' {
    $lines = @(New-TextHeader) + 'Orientador: 1 - Álvaro de Souza' + @(
      New-TextStudent
      New-TextStudent -Name 'Outro nome'
      New-TextTotals -Titled 1
    )
    Assert-Throws { Read-TitledFixture $lines } 'diverg|conflit|duplic'
  }

  Test-Case 'one degree cannot silently count under two advisors' {
    $lines = @(New-TextHeader -Advisors 2) + @(
      'Orientador: 1 - Álvaro de Souza'
      New-TextStudent
      New-TextTotals -Titled 1
      'Orientador: 2 - Beatriz Costa'
      New-TextStudent
      New-TextTotals -Titled 1
    )
    Assert-Throws { Read-TitledFixture $lines } 'diverg|conflit|duplic|orientador'
  }

  Test-Case 'active-only exports are rejected instead of representing missing titles as zero' {
    $lines = @(New-TextHeader) + @(
      'Situação: Ativos'
      'Orientador: 1 - Álvaro de Souza'
      New-TextStudent -Status 'Ativo'
      New-TextTotals -Active 1
    )
    Assert-Throws { Read-TitledFixture $lines } 'situa|filtro|todos|completo'
  }

  Test-Case 'incomplete and inconsistent advisor totals fail explicitly' {
    $base = @(New-TextHeader) + 'Orientador: 1 - Álvaro de Souza' + (New-TextStudent)
    Assert-Throws { Read-TitledFixture ($base + (New-TextTotals -Titled 2)) } 'diverg|total|contagem'
    Assert-Throws { Read-TitledFixture ($base + (New-TextTotals -Titled 1 -Total 2)) } 'diverg|total|contagem'
    Assert-Throws { Read-TitledFixture $base } 'ausente|total|incomplet'
    $wrongAdvisorCount = @(New-TextHeader -Advisors 2) + 'Orientador: 1 - Álvaro de Souza' + @(
      New-TextStudent
      New-TextTotals -Titled 1
    )
    Assert-Throws { Read-TitledFixture $wrongAdvisorCount } 'diverg|total|orientador|contagem'
  }

  Test-Case 'zero titles are valid only with reconciled Janus totals' {
    $lines = @(New-TextHeader) + 'Orientador: 1 - Álvaro de Souza' + @(
      New-TextStudent -Status 'Ativo'
      New-TextTotals -Active 1
    )
    $result = Read-TitledFixture $lines
    Assert-Equal $result.Alunos.Count 0 'No title records'
    Assert-Equal $result.Totais.total 0 'Known zero titles'
    Assert-Equal $result.Totais.mestrado 0 'Known zero master degrees'
  }

  Test-Case 'invalid and out-of-coverage title dates fail explicitly' {
    foreach ($date in @('31/02/2024', '31/12/2021', '21/10/2026')) {
      $lines = @(New-TextHeader) + 'Orientador: 1 - Álvaro de Souza' + @(
        New-TextStudent -Date $date
        New-TextTotals -Titled 1
      )
      Assert-Throws { Read-TitledFixture $lines } 'data|período|cobertura'
    }
  }

  Test-Case 'invalid report coverage fails explicitly' {
    foreach ($period in @('texto sem datas', '20/10/2026 a 01/01/2022', '31/02/2022 a 20/10/2026')) {
      $lines = @(New-TextHeader -Period $period) + 'Orientador: 1 - Álvaro de Souza' + @(
        New-TextStudent
        New-TextTotals -Titled 1
      )
      Assert-Throws { Read-TitledFixture $lines $period } 'período|data|cobertura'
    }
  }
} finally {
  Set-Item Function:ConvertPdfToTextLines -Value $originalPdfConverter
}

Write-Host "$script:passedTests Janus title-import regression cases passed."
