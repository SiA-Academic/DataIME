# Instrucoes: docs/ATUALIZAR_PLANILHA.md
[CmdletBinding()]
param([string]$PythonPath = "", [switch]$NaoAbrirPasta)

$ErrorActionPreference = "Stop"
$siteRoot = [IO.Path]::GetFullPath($PSScriptRoot)
$historyRoot = Join-Path $siteRoot "atualizacoes"
$latestPath = Join-Path $historyRoot "ultima-execucao-concluida.json"
$oldPython = $env:SIADOCE_PYTHON
$oldEncoding = $env:PYTHONIOENCODING
$lock = $null
$transcriptStarted = $false
$runPath = $null
$manifest = $null
$exitCode = 1

function Write-JsonFile($Value, [string]$Path) {
  $temporary = "$Path.tmp"
  [IO.File]::WriteAllText($temporary, ($Value | ConvertTo-Json -Depth 20) + [Environment]::NewLine, [Text.UTF8Encoding]::new($false))
  if ($PSVersionTable.PSVersion.Major -ge 7) {
    # A troca por rename funciona também em volumes sincronizados pelo OneDrive.
    [IO.File]::Move($temporary, $Path, $true)
  } elseif (Test-Path -LiteralPath $Path) {
    [IO.File]::Replace($temporary, $Path, [NullString]::Value)
  } else {
    [IO.File]::Move($temporary, $Path)
  }
}

function Select-Python {
  $candidates = @()
  if ($PythonPath) { $candidates = @($PythonPath) }
  elseif ($env:SIADOCE_PYTHON) { $candidates = @($env:SIADOCE_PYTHON) }
  else {
    $command = Get-Command python -ErrorAction SilentlyContinue
    if ($command) { $candidates += $command.Source }
    $candidates += Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
  }
  foreach ($candidate in ($candidates | Select-Object -Unique)) {
    if (-not (Test-Path -LiteralPath $candidate -PathType Leaf)) { continue }
    $oldPreference = $ErrorActionPreference
    try {
      $ErrorActionPreference = "Continue"
      & $candidate -c "import sys; assert sys.version_info >= (3, 10)" 2>$null
      if ($LASTEXITCODE -eq 0) { return [IO.Path]::GetFullPath($candidate) }
    } finally { $ErrorActionPreference = $oldPreference }
  }
  throw "Python 3.10 ou superior nao encontrado. Consulte docs/ATUALIZAR_PLANILHA.md ou informe -PythonPath com o caminho de python.exe."
}

function Backup-Inputs([string]$Destination) {
  $paths = @(
    "static\CVS_LATTES", "static\janus.pdf", "static\orientadores.pdf",
    "static\disciplinas.pdf", "static\areas.md", "static\configuracoes.md",
    "static\configuracoes_padrao.md", "data\controle\catalogo-periodicos-google.json",
    "data\controle", "content\controle", "scripts", "docs", "atualizar-planilha.ps1",
    "importar-catalogo-google.ps1",
    "Atualizar planilha.cmd", "build-public.ps1", "programa.ps1", "importar-entradas.ps1"
  )
  $files = @()
  foreach ($relative in $paths) {
    $source = Join-Path $siteRoot $relative
    if (-not (Test-Path -LiteralPath $source)) { continue }
    if (Test-Path -LiteralPath $source -PathType Container) {
      $files += Get-ChildItem -LiteralPath $source -Recurse -File |
        Where-Object { $_.FullName -notmatch '[\\/]__pycache__[\\/]' }
    } else { $files += Get-Item -LiteralPath $source }
  }
  $inventory = @()
  foreach ($file in ($files | Sort-Object FullName -Unique)) {
    $relative = $file.FullName.Substring($siteRoot.Length + 1)
    $target = Join-Path $Destination $relative
    New-Item -ItemType Directory -Path (Split-Path -Parent $target) -Force | Out-Null
    Copy-Item -LiteralPath $file.FullName -Destination $target
    $inventory += [ordered]@{
      arquivo = $relative; bytes = $file.Length
      sha256 = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash.ToLowerInvariant()
    }
  }
  Write-JsonFile $inventory (Join-Path $Destination "inventario.json")
  return $inventory.Count
}

try {
  $python = Select-Python
  foreach ($required in @(
    "build-public.ps1", "scripts\gerar-ranking-periodicos.py",
    "scripts\preparar-atualizacao-planilha.py",
    "static\janus.pdf", "static\orientadores.pdf", "static\disciplinas.pdf",
    "data\controle\catalogo-periodicos-google.json"
  )) {
    if (-not (Test-Path -LiteralPath (Join-Path $siteRoot $required) -PathType Leaf)) {
      throw "Arquivo necessario nao encontrado: $required"
    }
  }
  if (-not (Test-Path -LiteralPath (Join-Path $siteRoot "static\CVS_LATTES") -PathType Container)) {
    throw "Pasta static\CVS_LATTES nao encontrada."
  }
  New-Item -ItemType Directory -Path $historyRoot -Force | Out-Null
  try {
    $lock = [IO.File]::Open((Join-Path $historyRoot ".atualizacao.lock"), [IO.FileMode]::OpenOrCreate, [IO.FileAccess]::ReadWrite, [IO.FileShare]::None)
  } catch { throw "Nao foi possivel obter acesso exclusivo. Feche outra atualizacao em andamento e tente novamente. Detalhe: $($_.Exception.Message)" }
  $previousPackage = $null
  if (Test-Path -LiteralPath $latestPath) {
    try {
      $previousManifest = Get-Content -LiteralPath $latestPath -Raw -Encoding UTF8 | ConvertFrom-Json
      if ($previousManifest.pacote_relativo) {
        $candidatePath = [IO.Path]::GetFullPath((Join-Path $historyRoot $previousManifest.pacote_relativo))
        if ($candidatePath.StartsWith($historyRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase) -and
            (Test-Path -LiteralPath $candidatePath -PathType Leaf)) {
          $previousPackage = $candidatePath
        }
      }
      if (-not $previousPackage -and $previousManifest.pacote -and (Test-Path -LiteralPath $previousManifest.pacote -PathType Leaf)) {
        $previousPackage = $previousManifest.pacote
      }
    } catch { Write-Warning "Historico anterior ilegivel; a geracao prosseguira sem comparacao." }
  }
  $runName = (Get-Date -Format "yyyyMMdd-HHmmss") + "-" + [Guid]::NewGuid().ToString("N").Substring(0, 6)
  $runPath = Join-Path $historyRoot $runName
  $sendPath = Join-Path $runPath "envio"
  New-Item -ItemType Directory -Path $sendPath -Force | Out-Null
  Start-Transcript -Path (Join-Path $runPath "execucao.log") | Out-Null
  $transcriptStarted = $true
  $manifest = [ordered]@{
    schema_version = 1; status = "em_andamento"; iniciado_em = (Get-Date).ToString("o")
    python = $python; diretorio = $runPath; pacote = $null; pacote_relativo = $null
    pacote_sha256 = $null; concluido_em = $null; erro = $null
  }
  Write-JsonFile $manifest (Join-Path $runPath "execucao.json")
  Write-Host "1/4 - Guardando entradas e dados anteriores em copia de seguranca..."
  $backupCount = Backup-Inputs (Join-Path $runPath "backup")
  Write-Host "$backupCount arquivos preservados. O historico fica fora do site publico."

  Write-Host "2/4 - Extraindo os curriculos e atualizando o SiADoce..."
  $env:SIADOCE_PYTHON = $python
  $env:PYTHONIOENCODING = "utf-8"
  $shellExecutable = Join-Path $PSHOME "pwsh.exe"
  if (-not (Test-Path -LiteralPath $shellExecutable)) { $shellExecutable = Join-Path $PSHOME "powershell.exe" }
  & $shellExecutable -NoProfile -File (Join-Path $siteRoot "build-public.ps1")
  if ($LASTEXITCODE -ne 0) { throw "Falha na geracao do SiADoce (codigo $LASTEXITCODE). Veja execucao.log." }

  Write-Host "3/4 - Conferindo fontes, agrupando periodicos e preparando a planilha..."
  & $python (Join-Path $siteRoot "scripts\gerar-ranking-periodicos.py") --root $siteRoot --output-dir $sendPath
  if ($LASTEXITCODE -ne 0) { throw "Falha no ranking. Nenhuma atualizacao deve ser importada. Veja execucao.log." }
  $packageArguments = @((Join-Path $siteRoot "scripts\preparar-atualizacao-planilha.py"), "--root", $siteRoot, "--output-dir", $sendPath)
  if ($previousPackage) { $packageArguments += @("--previous-package", $previousPackage) }
  & $python @packageArguments
  if ($LASTEXITCODE -ne 0) { throw "Falha na validacao do pacote. Nenhuma atualizacao deve ser importada. Veja execucao.log." }
  $packagePath = Join-Path $sendPath "atualizacao-planilha.json"
  if (-not (Test-Path -LiteralPath $packagePath -PathType Leaf)) { throw "O pacote de atualizacao nao foi gerado." }
  $packageData = Get-Content -LiteralPath $packagePath -Raw -Encoding UTF8 | ConvertFrom-Json
  if ($packageData.anos -and ($packageData.anos | Measure-Object -Maximum).Maximum -lt (Get-Date).Year) {
    Write-Warning "O periodo termina antes do ano atual. Se deseja incluir novos anos, atualize static\janus.pdf e execute novamente."
  }
  $manifest.status = "concluida"
  $manifest.pacote = $packagePath
  $manifest.pacote_relativo = Join-Path $runName "envio\atualizacao-planilha.json"
  $manifest.pacote_sha256 = (Get-FileHash -LiteralPath $packagePath -Algorithm SHA256).Hash.ToLowerInvariant()
  $manifest.concluido_em = (Get-Date).ToString("o")
  Write-JsonFile $manifest (Join-Path $runPath "execucao.json")
  Write-JsonFile $manifest $latestPath
  Write-Host ""
  Write-Host "4/4 - Atualizacao local concluida."
  Write-Host "Confira: $(Join-Path $sendPath 'relatorio-atualizacao.txt')"
  Write-Host "Na planilha Google, use SiADoce > Importar atualizacao e escolha:"
  Write-Host $packagePath
  Write-Host "A planilha Google ainda nao foi alterada por este comando."
  $exitCode = 0
} catch {
  $failureMessage = $_.Exception.Message
  if ($manifest) {
    $manifest.status = "falhou"
    $manifest.erro = $failureMessage
    $manifest.concluido_em = (Get-Date).ToString("o")
    try { Write-JsonFile $manifest (Join-Path $runPath "execucao.json") } catch { }
  }
  Write-Host ""
  Write-Host "ATUALIZACAO INTERROMPIDA: $failureMessage" -ForegroundColor Red
  Write-Host "Nao importe arquivos desta execucao. A ultima execucao concluida e seus backups foram preservados."
  if ($runPath) { Write-Host "Diagnostico: $runPath" }
} finally {
  $env:SIADOCE_PYTHON = $oldPython
  $env:PYTHONIOENCODING = $oldEncoding
  if ($transcriptStarted) { Stop-Transcript | Out-Null }
  if ($lock) { $lock.Dispose() }
}
if ($exitCode -eq 0 -and -not $NaoAbrirPasta) {
  try { Invoke-Item -LiteralPath $sendPath } catch { Write-Warning "Abra manualmente a pasta: $sendPath" }
}
exit $exitCode
