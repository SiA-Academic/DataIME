# Teste funcional isolado do wrapper. Usa dados de teste, localmente.
# Uso em PowerShell 7:
#   pwsh -NoProfile -File scripts/test-atualizar-planilha.ps1 [-PythonPath ...]
# As fixtures ficam em SiADoce/tmp, fora de static/public, e sao removidas
# somente depois da verificacao do caminho absoluto. Em falha, ficam para analise.
[CmdletBinding()]
param([string]$PythonPath = "")

$ErrorActionPreference = "Stop"
$siteRoot = [IO.Path]::GetFullPath((Split-Path -Parent $PSScriptRoot))
$testParent = [IO.Path]::GetFullPath((Join-Path $siteRoot "tmp\wrapper-tests"))
$fixtureRoot = $null
$testSucceeded = $false

function Assert-True([bool]$Condition, [string]$Message) {
  if (-not $Condition) { throw "TESTE FALHOU: $Message" }
}

function Write-Utf8([string]$Path, [string]$Text) {
  New-Item -ItemType Directory -Path (Split-Path -Parent $Path) -Force | Out-Null
  [IO.File]::WriteAllText($Path, $Text, [Text.UTF8Encoding]::new($false))
}

function Read-Json([string]$Path) {
  return (Get-Content -LiteralPath $Path -Raw -Encoding UTF8 | ConvertFrom-Json)
}

function File-Sha256([string]$Path) {
  return (Get-FileHash -LiteralPath $Path -Algorithm SHA256).Hash.ToLowerInvariant()
}

function Invoke-Wrapper([string]$Label, [int]$ExpectedCode) {
  $logPath = Join-Path $fixtureRoot "$Label.log"
  & $shellExecutable -NoProfile -File (Join-Path $fixtureRoot "atualizar-planilha.ps1") `
    -PythonPath $selectedPython -NaoAbrirPasta *> $logPath
  $actualCode = $LASTEXITCODE
  Assert-True ($actualCode -eq $ExpectedCode) "Execucao $Label retornou $actualCode; esperado $ExpectedCode. Log: $logPath"
}

try {
  Assert-True ($PSVersionTable.PSVersion.Major -ge 7) "Use PowerShell 7 para este teste."
  $shellExecutable = Join-Path $PSHOME "pwsh.exe"
  Assert-True (Test-Path -LiteralPath $shellExecutable -PathType Leaf) "pwsh.exe nao encontrado em PSHOME."
  if ($PythonPath) {
    $selectedPython = [IO.Path]::GetFullPath($PythonPath)
  } elseif ($env:SIADOCE_PYTHON) {
    $selectedPython = [IO.Path]::GetFullPath($env:SIADOCE_PYTHON)
  } else {
    $pythonCommand = Get-Command python -ErrorAction SilentlyContinue
    $selectedPython = if ($pythonCommand) { $pythonCommand.Source } else {
      Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
    }
  }
  Assert-True (Test-Path -LiteralPath $selectedPython -PathType Leaf) "Python nao encontrado; informe -PythonPath."
  & $selectedPython -c "import sys; assert sys.version_info >= (3,10)"
  Assert-True ($LASTEXITCODE -eq 0) "O teste exige Python 3.10+, como o wrapper real."

  New-Item -ItemType Directory -Path $testParent -Force | Out-Null
  $fixtureRoot = [IO.Path]::GetFullPath((Join-Path $testParent ("fixture com espacos-" + [Guid]::NewGuid().ToString("N"))))
  Assert-True ($fixtureRoot.StartsWith($testParent + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) "Fixture fora da pasta de testes."
  New-Item -ItemType Directory -Path $fixtureRoot | Out-Null
  Copy-Item -LiteralPath (Join-Path $siteRoot "atualizar-planilha.ps1") -Destination (Join-Path $fixtureRoot "atualizar-planilha.ps1")
  foreach ($relative in @(
    "static\janus.pdf", "static\orientadores.pdf", "static\disciplinas.pdf",
    "data\controle\catalogo-periodicos-google.json", "static\CVS_LATTES\Docente Exemplo.pdf",
    "content\controle\entrada.md", "importar-entradas.ps1"
  )) {
    Write-Utf8 (Join-Path $fixtureRoot $relative) "Fixture do teste: $relative"
  }
  Write-Utf8 (Join-Path $fixtureRoot "data\controle\producao-docente.json") '{"geracao":0}'

  Write-Utf8 (Join-Path $fixtureRoot "build-public.ps1") @'
$ErrorActionPreference = "Stop"
if (Test-Path -LiteralPath (Join-Path $PSScriptRoot "falhar-build.flag")) { exit 7 }
if (-not $env:SIADOCE_PYTHON -or $env:PYTHONIOENCODING -ne "utf-8") {
  throw "Wrapper nao configurou o ambiente Python."
}
$source = Join-Path $PSScriptRoot "data\controle\producao-docente.json"
$data = Get-Content -LiteralPath $source -Raw | ConvertFrom-Json
$data.geracao = [int]$data.geracao + 1
[IO.File]::WriteAllText($source, ($data | ConvertTo-Json), [Text.UTF8Encoding]::new($false))
Write-Host "Build simulado concluido: geracao $($data.geracao)"
exit 0
'@
  Write-Utf8 (Join-Path $fixtureRoot "scripts\gerar-ranking-periodicos.py") @'
import argparse, json
from pathlib import Path
parser = argparse.ArgumentParser()
parser.add_argument("--root", type=Path, required=True)
parser.add_argument("--output-dir", type=Path, required=True)
args = parser.parse_args()
source = json.loads((args.root / "data/controle/producao-docente.json").read_text(encoding="utf-8"))
(args.output_dir / "ranking_payload.json").write_text(json.dumps(source), encoding="utf-8")
print("Ranking simulado concluido.")
'@
  Write-Utf8 (Join-Path $fixtureRoot "scripts\preparar-atualizacao-planilha.py") @'
import argparse, json
from pathlib import Path
parser = argparse.ArgumentParser()
parser.add_argument("--root", type=Path, required=True)
parser.add_argument("--output-dir", type=Path, required=True)
parser.add_argument("--previous-package", type=Path)
args = parser.parse_args()
source = json.loads((args.root / "data/controle/producao-docente.json").read_text(encoding="utf-8"))
assert (args.output_dir / "ranking_payload.json").is_file(), "Ranking deve preceder o pacote."
if args.previous_package:
    assert args.previous_package.is_file(), "Comparacao recebeu caminho inexistente."
    previous = json.loads(args.previous_package.read_text(encoding="utf-8"))
else:
    previous = None
payload = {"schema_version": 1, "kind": "fixture.wrapper", "geracao": source["geracao"],
           "previous_package": str(args.previous_package) if args.previous_package else None,
           "geracao_anterior": previous["geracao"] if previous else None}
(args.output_dir / "atualizacao-planilha.json").write_text(json.dumps(payload), encoding="utf-8")
(args.output_dir / "relatorio-atualizacao.txt").write_text("Fixture; nenhuma rede ou extracao real.", encoding="utf-8")
print("Pacote simulado concluido.")
'@

  $latestPath = Join-Path $fixtureRoot "atualizacoes\ultima-execucao-concluida.json"

  Invoke-Wrapper "01-primeira" 0
  $first = Read-Json $latestPath
  Assert-True ($first.status -eq "concluida") "Primeira execucao nao foi marcada concluida."
  Assert-True (Test-Path -LiteralPath $first.pacote -PathType Leaf) "Primeiro pacote nao existe."
  Assert-True ($first.pacote_sha256 -eq (File-Sha256 $first.pacote)) "Hash do primeiro pacote incorreto."
  $firstPackage = Read-Json $first.pacote
  Assert-True ($firstPackage.geracao -eq 1 -and $null -eq $firstPackage.previous_package) "Primeira execucao deve gerar dados novos sem comparacao."
  $firstManifestHash = File-Sha256 (Join-Path $first.diretorio "execucao.json")
  $firstPackageHash = File-Sha256 $first.pacote
  $backupSource = Join-Path $first.diretorio "backup\data\controle\producao-docente.json"
  Assert-True ((Read-Json $backupSource).geracao -eq 0) "Backup deve preceder a mutacao pelo build."
  $inventory = @(Read-Json (Join-Path $first.diretorio "backup\inventario.json"))
  Assert-True ($inventory.Count -ge 10) "Backup incompleto na fixture."
  foreach ($entry in $inventory) {
    Assert-True ($entry.sha256 -eq (File-Sha256 (Join-Path (Join-Path $first.diretorio "backup") $entry.arquivo))) "Hash divergente no inventario: $($entry.arquivo)"
  }

  Invoke-Wrapper "02-repeticao" 0
  $second = Read-Json $latestPath
  Assert-True ($second.status -eq "concluida" -and $second.diretorio -ne $first.diretorio) "Repeticao deve criar outra execucao concluida."
  $secondPackage = Read-Json $second.pacote
  Assert-True ($secondPackage.geracao -eq 2) "Segundo build nao atualizou os dados."
  Assert-True ($secondPackage.previous_package -eq $first.pacote -and $secondPackage.geracao_anterior -eq 1) "Wrapper nao encaminhou o pacote anterior para comparacao."
  Assert-True ((File-Sha256 $first.pacote) -eq $firstPackageHash) "Repeticao alterou o primeiro pacote."
  Assert-True ((File-Sha256 (Join-Path $first.diretorio "execucao.json")) -eq $firstManifestHash) "Repeticao alterou o manifesto historico."
  Assert-True ($second.pacote_sha256 -eq (File-Sha256 $second.pacote)) "Hash do segundo pacote incorreto."
  $latestHash = File-Sha256 $latestPath
  $secondPackageHash = File-Sha256 $second.pacote

  Write-Utf8 (Join-Path $fixtureRoot "falhar-build.flag") "Falha intencional de teste."
  Invoke-Wrapper "03-falha-build" 1
  Assert-True ((File-Sha256 $latestPath) -eq $latestHash) "Falha substituiu o ultimo manifesto concluido."
  Assert-True ((File-Sha256 $second.pacote) -eq $secondPackageHash) "Falha alterou o ultimo pacote valido."
  $runs = @(Get-ChildItem -LiteralPath (Join-Path $fixtureRoot "atualizacoes") -Directory)
  $failedRuns = @($runs | Where-Object { (Read-Json (Join-Path $_.FullName "execucao.json")).status -eq "falhou" })
  Assert-True ($runs.Count -eq 3 -and $failedRuns.Count -eq 1) "Falha deve ter seu proprio manifesto, sem apagar o historico."
  $failedManifest = Read-Json (Join-Path $failedRuns[0].FullName "execucao.json")
  Assert-True ($failedManifest.erro -match "codigo 7") "Diagnostico nao preservou o codigo de falha do build."
  Assert-True (-not (Test-Path -LiteralPath (Join-Path $failedRuns[0].FullName "envio\atualizacao-planilha.json"))) "Pacote foi gerado apesar da falha do build."
  Assert-True (-not (Test-Path -LiteralPath (Join-Path $failedRuns[0].FullName "envio\ranking_payload.json"))) "Ranking foi executado apesar da falha do build."

  Remove-Item -LiteralPath (Join-Path $fixtureRoot "falhar-build.flag")
  Invoke-Wrapper "04-recuperacao" 0
  $recovered = Read-Json $latestPath
  $recoveredPackage = Read-Json $recovered.pacote
  Assert-True ($recovered.status -eq "concluida" -and $recoveredPackage.geracao -eq 3) "Nao foi possivel executar novamente depois da falha."
  Assert-True ($recoveredPackage.previous_package -eq $second.pacote) "Recuperacao usou a execucao falha como referencia."
  Assert-True (-not (Test-Path -LiteralPath (Join-Path $fixtureRoot "public\atualizacoes"))) "Historico nao pode ficar no site publico."
  Assert-True (-not (Test-Path -LiteralPath (Join-Path $fixtureRoot "static\atualizacoes"))) "Historico nao pode ficar em static."

  $testSucceeded = $true
  Write-Host "PASS: wrapper isolado; primeira geracao, repeticao/comparacao, backups/hashes, falha preservando ultimo resultado e recuperacao."
} finally {
  if ($testSucceeded -and $fixtureRoot) {
    $resolvedFixture = [IO.Path]::GetFullPath($fixtureRoot)
    $resolvedParent = [IO.Path]::GetFullPath($testParent).TrimEnd([IO.Path]::DirectorySeparatorChar)
    if (-not $resolvedFixture.StartsWith($resolvedParent + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) {
      throw "Recusa ao limpar fixture fora da pasta de testes: $resolvedFixture"
    }
    Remove-Item -LiteralPath $resolvedFixture -Recurse -Force
  } elseif ($fixtureRoot) {
    Write-Host "Fixture preservada para diagnostico: $fixtureRoot"
  }
}
