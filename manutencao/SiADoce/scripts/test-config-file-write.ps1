# Teste isolado: carrega só os helpers via AST; não executa preparar-dados.
$ErrorActionPreference = "Stop"
$testSite = Split-Path -Parent $PSScriptRoot
$tokens = $null
$parseErrors = $null
$tree = [Management.Automation.Language.Parser]::ParseFile((Join-Path $PSScriptRoot "preparar-dados.ps1"), [ref]$tokens, [ref]$parseErrors)
if ($parseErrors.Count) { throw "Erro de sintaxe em preparar-dados.ps1: $parseErrors" }
foreach ($helperName in @("Invoke-ConfigFileLockRetry", "Write-ConfigIfChanged")) {
  $helper = $tree.Find({ param($node) $node -is [Management.Automation.Language.FunctionDefinitionAst] -and $node.Name -eq $helperName }, $true)
  if (-not $helper) { throw "Helper não encontrado: $helperName" }
  . ([scriptblock]::Create($helper.Extent.Text))
}
$fixture = Join-Path $testSite ("tmp\config-write-tests\" + [Guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Path $fixture -Force | Out-Null
$config = Join-Path $fixture "configuracoes.md"
Write-ConfigIfChanged $config "configuração inicial`r`n"
$stamp = [IO.File]::GetLastWriteTimeUtc($config)
$handle = [IO.File]::Open($config, [IO.FileMode]::Open, [IO.FileAccess]::Read, [IO.FileShare]::Read)
try {
  Write-ConfigIfChanged $config "configuração inicial`r`n"
  if ([IO.File]::GetLastWriteTimeUtc($config) -ne $stamp) { throw "Conteúdo igual foi regravado." }
  $caught = $null
  try { Write-ConfigIfChanged $config "conteúdo alterado" } catch { $caught = $_ }
  if (-not $caught) { throw "Bloqueio real persistente deveria interromper a escrita." }
  if ([IO.File]::ReadAllText($config) -cne "configuração inicial`r`n") { throw "Falha de escrita alterou o arquivo original." }
} finally { $handle.Dispose() }
Write-ConfigIfChanged $config "conteúdo alterado"
if ([IO.File]::ReadAllText($config) -cne "conteúdo alterado") { throw "Substituição após desbloqueio falhou." }
if (@(Get-ChildItem -LiteralPath $fixture -Filter *.tmp -Force).Count) { throw "Temporário ficou após falha/êxito." }
Write-Output "OK: conteúdo igual não regrava; bloqueio real preserva original; desbloqueio permite substituição atômica."

foreach ($code in @(32, 33)) {
  $state = @{ Attempts = 0 }
  $result = Invoke-ConfigFileLockRetry {
    $state.Attempts++
    if ($state.Attempts -eq 1) {
      throw [IO.IOException]::new("bloqueio transitório", [int](-2147024896 + $code))
    }
    "concluído"
  }
  if ($state.Attempts -ne 2 -or $result -ne "concluído") { throw "Retry de erro $code falhou." }
}
foreach ($kind in @("permission", "other_io")) {
  $state = @{ Attempts = 0 }
  $caught = $null
  try {
    Invoke-ConfigFileLockRetry {
      $state.Attempts++
      if ($kind -eq "permission") { throw [UnauthorizedAccessException]::new("sem permissão") }
      throw [IO.IOException]::new("outro erro de E/S", -2147024784)
    }
  } catch { $caught = $_ }
  if (-not $caught -or $state.Attempts -ne 1) { throw "Falha $kind não foi propagada imediatamente." }
}
Write-Output "OK: apenas sharing/lock violation são repetidas; permissão e demais erros são propagados."
