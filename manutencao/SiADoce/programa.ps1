param([string]$Programa = 'USP', [switch]$SomenteDados)

$ErrorActionPreference = 'Stop'
if ($Programa -in @('Federal', 'Federais', 'F')) {
    Write-Host 'Fluxo para programas federais ainda não implementado.'
    return
}
if ($Programa -notin @('USP', 'U')) { throw 'Escolha USP ou Federal.' }
& (Join-Path $PSScriptRoot 'build-public.ps1') -SomenteDados:$SomenteDados
