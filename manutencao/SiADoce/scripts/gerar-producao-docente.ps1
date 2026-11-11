param(
  [string]$PythonPath = ""
)

$ErrorActionPreference = "Stop"
$siteRoot = Split-Path -Parent $PSScriptRoot
$candidates = [System.Collections.Generic.List[string]]::new()
if ($PythonPath) { $candidates.Add($PythonPath) }
if ($env:SIADOCE_PYTHON) { $candidates.Add($env:SIADOCE_PYTHON) }
$pythonCommand = Get-Command python -ErrorAction SilentlyContinue
if ($pythonCommand) { $candidates.Add($pythonCommand.Source) }
$bundledPython = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
if (Test-Path -LiteralPath $bundledPython) { $candidates.Add($bundledPython) }

$selectedPython = $null
foreach ($candidate in ($candidates | Select-Object -Unique)) {
  if (-not (Test-Path -LiteralPath $candidate -PathType Leaf)) { continue }
  $previousPreference = $ErrorActionPreference
  try {
    $ErrorActionPreference = "Continue"
    & $candidate -c "import sys; assert sys.version_info >= (3, 10)" 2>$null
    if ($LASTEXITCODE -eq 0) { $selectedPython = $candidate; break }
  } finally {
    $ErrorActionPreference = $previousPreference
  }
}
if (-not $selectedPython) {
  throw "Python 3.10 ou superior nao encontrado. Informe -PythonPath ou defina SIADOCE_PYTHON com o caminho de um Python compatível."
}

& $selectedPython (Join-Path $PSScriptRoot "gerar-producao-docente.py") --root $siteRoot
if ($LASTEXITCODE -ne 0) {
  throw "Falha ao gerar data/controle/producao-docente.json (codigo $LASTEXITCODE)."
}

& $selectedPython (Join-Path $PSScriptRoot "empacotar-analisador-lattes.py") --root $siteRoot --publicar
if ($LASTEXITCODE -ne 0) {
  throw "Falha ao preparar os downloads do analisador Lattes (codigo $LASTEXITCODE)."
}
