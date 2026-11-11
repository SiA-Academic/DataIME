# Uso: .\analisar-lattes.ps1 walner.pdf -Inicio 2022 -Fim 2026
# macOS/Linux: pwsh -NoProfile -File ./analisar-lattes.ps1 walner.pdf -Inicio 2022 -Fim 2026
# PDF relativo: procurado na pasta deste script. Caminho absoluto tambem aceito.
# Opcional: -Nome "Nome" -NaoAbrirPasta; nomes antigos AnoInicio/AnoFim continuam validos.
# Analise privada: nao cadastra docente, nao modifica o site ou a planilha Google.
[CmdletBinding()]
param(
  [Parameter(Mandatory = $true, Position = 0)][string]$ArquivoPDF,
  [Alias("Inicio")][int]$AnoInicio = 0,
  [Alias("Fim")][int]$AnoFim = 0,
  [string]$Nome = "",
  [string]$PythonPath = "",
  [switch]$NaoAbrirPasta
)

$ErrorActionPreference = "Stop"
$analysisRoot = [IO.Path]::GetFullPath($PSScriptRoot)
$analysisOnWindows = [Environment]::OSVersion.Platform -eq [PlatformID]::Win32NT
$previousEncoding = $env:PYTHONIOENCODING
$previousShell = $env:SIADOCE_POWERSHELL
$transcriptStarted = $false
$resultDirectory = $null
$resultCode = 1

function Select-AnalysisPython {
  $candidates = @()
  if ($PythonPath) { $candidates = @($PythonPath) }
  elseif ($env:SIADOCE_PYTHON) { $candidates = @($env:SIADOCE_PYTHON) }
  else {
    $venvPython = if ($analysisOnWindows) { ".venv-lattes/Scripts/python.exe" } else { ".venv-lattes/bin/python" }
    $candidates += Join-Path $analysisRoot $venvPython
    $candidates += if ($analysisOnWindows) { @("python", "python3") } else { @("python3", "python") }
    if ($analysisOnWindows -and $env:USERPROFILE) {
      $candidates += Join-Path $env:USERPROFILE ".cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe"
    }
  }
  foreach ($candidate in ($candidates | Select-Object -Unique)) {
    $executable = $null
    if (Test-Path -LiteralPath $candidate -PathType Leaf) {
      $executable = (Resolve-Path -LiteralPath $candidate).Path
    } else {
      $pythonCommand = Get-Command -Name $candidate -CommandType Application -ErrorAction SilentlyContinue | Select-Object -First 1
      if ($pythonCommand) { $executable = $pythonCommand.Source }
    }
    if (-not $executable) { continue }
    # Os atalhos da Microsoft Store nao sao uma instalacao Python utilizavel.
    if ($analysisOnWindows -and $executable -match '[\\/]Microsoft[\\/]WindowsApps[\\/]python(?:3)?\.exe$') { continue }
    $savedPreference = $ErrorActionPreference
    try {
      $ErrorActionPreference = "Continue"
      & $executable -c "import sys; assert sys.version_info >= (3,10)" 2>$null
      if ($? -and $LASTEXITCODE -eq 0) { return [IO.Path]::GetFullPath($executable) }
    } finally { $ErrorActionPreference = $savedPreference }
  }
  throw "Python 3.10+ nao encontrado. Informe -PythonPath ou consulte docs/ANALISAR_LATTES_AVULSO.md."
}

try {
  $pdfCandidate = if ([IO.Path]::IsPathRooted($ArquivoPDF)) {
    $ArquivoPDF
  } else {
    Join-Path $analysisRoot $ArquivoPDF
  }
  if (-not (Test-Path -LiteralPath $pdfCandidate -PathType Leaf)) {
    throw "PDF nao encontrado: $pdfCandidate"
  }
  $pdfFull = (Resolve-Path -LiteralPath $pdfCandidate).Path
  if ([IO.Path]::GetExtension($pdfFull).ToLowerInvariant() -ne ".pdf") {
    throw "Selecione um arquivo .pdf exportado pelo Lattes."
  }
  $python = Select-AnalysisPython
  $referenceYears = @()
  $referencePath = Join-Path $analysisRoot "data/controle/producao-docente.json"
  if (Test-Path -LiteralPath $referencePath -PathType Leaf) {
    try {
      $reference = Get-Content -LiteralPath $referencePath -Raw -Encoding UTF8 | ConvertFrom-Json
      $referenceYears = @($reference.anos | Where-Object { $_ -ge 1900 -and $_ -le 2099 } | Sort-Object -Unique)
    } catch { Write-Warning "Nao foi possivel ler a janela atual do SIADoce; sera usada a janela dos ultimos cinco anos." }
  }
  if (-not $referenceYears.Count) {
    $currentYear = (Get-Date).Year
    $referenceYears = @(($currentYear - 4)..$currentYear)
  }
  if (-not $AnoInicio) { $AnoInicio = [int]$referenceYears[0] }
  if (-not $AnoFim) { $AnoFim = [int]$referenceYears[$referenceYears.Count - 1] }
  if ($AnoInicio -lt 1900 -or $AnoFim -gt 2099 -or $AnoInicio -gt $AnoFim -or ($AnoFim - $AnoInicio) -ge 100) {
    throw "Intervalo invalido. Use -Inicio e -Fim entre 1900 e 2099, em ordem, com ate 100 anos."
  }
  $privateRoot = Join-Path $analysisRoot "analises-avulsas"
  $runName = (Get-Date -Format "yyyyMMdd-HHmmss") + "-" + [Guid]::NewGuid().ToString("N").Substring(0, 8)
  $resultDirectory = Join-Path $privateRoot $runName
  New-Item -ItemType Directory -Path $resultDirectory -Force | Out-Null
  Start-Transcript -Path (Join-Path $resultDirectory "execucao.log") | Out-Null
  $transcriptStarted = $true
  $env:PYTHONIOENCODING = "utf-8"
  if ($PSVersionTable.PSVersion.Major -ge 7) {
    $shellExecutable = if ($analysisOnWindows) { "pwsh.exe" } else { "pwsh" }
    $env:SIADOCE_POWERSHELL = Join-Path $PSHOME $shellExecutable
  }
  Write-Host "Analisando o PDF local, sem cadastrar docente."
  Write-Host "Janela escolhida: $AnoInicio a $AnoFim."
  $arguments = @(
    (Join-Path $analysisRoot "scripts/analisar-lattes-avulso.py"),
    "--root", $analysisRoot, "--pdf", $pdfFull, "--output-dir", $resultDirectory,
    "--ano-inicio", "$AnoInicio", "--ano-fim", "$AnoFim"
  )
  if ($Nome) { $arguments += @("--nome", $Nome) }
  & $python @arguments
  if ($LASTEXITCODE -ne 0) { throw "O analisador interrompeu a leitura (codigo $LASTEXITCODE). Consulte a mensagem acima." }
  $resultPath = Join-Path $resultDirectory "analise-lattes.json"
  if (-not (Test-Path -LiteralPath $resultPath -PathType Leaf)) { throw "O arquivo de resultado nao foi gerado." }
  Write-Host ""
  Write-Host "Analise avulsa concluida."
  Write-Host "No SIADoce, abra Producao docente > Analisar outro curriculo e escolha:"
  Write-Host $resultPath
  Write-Host "Resumo legivel: $(Join-Path $resultDirectory 'relatorio-analise.txt')"
  Write-Host "O cadastro e a planilha Google nao foram alterados."
  $resultCode = 0
} catch {
  Write-Host "ANALISE INTERROMPIDA: $($_.Exception.Message)" -ForegroundColor Red
  if ($resultDirectory) { Write-Host "Diagnostico privado: $resultDirectory" }
} finally {
  $env:PYTHONIOENCODING = $previousEncoding
  $env:SIADOCE_POWERSHELL = $previousShell
  if ($transcriptStarted) { Stop-Transcript | Out-Null }
}
if ($resultCode -eq 0 -and -not $NaoAbrirPasta) {
  try {
    if ($analysisOnWindows) {
      Invoke-Item -LiteralPath $resultDirectory
    } else {
      $openerName = if ([Runtime.InteropServices.RuntimeInformation]::IsOSPlatform([Runtime.InteropServices.OSPlatform]::OSX)) { "open" } else { "xdg-open" }
      $folderOpener = Get-Command -Name $openerName -CommandType Application -ErrorAction SilentlyContinue | Select-Object -First 1
      if (-not $folderOpener) { throw "Abridor de pastas indisponivel." }
      $savedPreference = $ErrorActionPreference
      try {
        $ErrorActionPreference = "Continue"
        & $folderOpener.Source $resultDirectory 2>$null | Out-Null
        if ($LASTEXITCODE -ne 0) { throw "Nao foi possivel abrir a interface grafica." }
      } finally { $ErrorActionPreference = $savedPreference }
    }
  } catch {
    Write-Warning "A analise foi concluida. Abra manualmente a pasta: $resultDirectory. Em ambiente sem interface grafica, use -NaoAbrirPasta."
  }
}
exit $resultCode
