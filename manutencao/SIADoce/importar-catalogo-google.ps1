param(
  [Parameter(Mandatory = $true, Position = 0)][string]$Arquivo,
  [string]$PythonPath = ""
)
$ErrorActionPreference = "Stop"
$candidates = [System.Collections.Generic.List[string]]::new()
if ($PythonPath) { $candidates.Add($PythonPath) }
if ($env:SIADOCE_PYTHON) { $candidates.Add($env:SIADOCE_PYTHON) }
$pythonCommand = Get-Command python -ErrorAction SilentlyContinue
if ($pythonCommand) { $candidates.Add($pythonCommand.Source) }
$bundled = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
if (Test-Path -LiteralPath $bundled) { $candidates.Add($bundled) }
$selected = $null
foreach ($candidate in ($candidates | Select-Object -Unique)) {
  if (-not (Test-Path -LiteralPath $candidate -PathType Leaf)) { continue }
  $previousPreference = $ErrorActionPreference
  try {
    $ErrorActionPreference = "Continue"
    & $candidate -c "import sys; assert sys.version_info >= (3, 10)" 2>$null
    if ($LASTEXITCODE -eq 0) { $selected = $candidate; break }
  } finally { $ErrorActionPreference = $previousPreference }
}
if (-not $selected) { throw "Python 3.10 ou superior não encontrado. Informe -PythonPath ou SIADOCE_PYTHON." }
& $selected (Join-Path $PSScriptRoot "scripts/importar-catalogo-google.py") $Arquivo --root $PSScriptRoot
if ($LASTEXITCODE -ne 0) { throw "O catálogo não foi importado. Confira a mensagem acima." }
