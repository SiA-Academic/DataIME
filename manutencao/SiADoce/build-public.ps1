[CmdletBinding()]
param(
    [string]$Saida = '',
    [switch]$SomenteDados,
    [switch]$UsarDadosPreparados,
    [switch]$AtualizarPortal
)

$ErrorActionPreference = 'Stop'
$python = if ($env:SIADOCE_PYTHON) { $env:SIADOCE_PYTHON } else { 'python' }
$renderer = Join-Path $PSScriptRoot 'scripts/gerar-site.py'
$arguments = @($renderer)
if ($Saida) { $arguments += @('--saida', $Saida) }

# Falhar antes da extração se a dependência ou o destino não estiver disponível.
& $python @arguments --verificar
if ($LASTEXITCODE -ne 0) { throw 'Falha na verificação da geração estática.' }
if (-not $UsarDadosPreparados) {
    & (Join-Path $PSScriptRoot 'scripts/preparar-dados.ps1') -Programa USP | Out-Null
}
if (-not $SomenteDados) {
    if ($AtualizarPortal) { $arguments += '--atualizar-portal' }
    & $python @arguments
    if ($LASTEXITCODE -ne 0) { throw 'A geração da instância SIA-Doce falhou.' }
}
