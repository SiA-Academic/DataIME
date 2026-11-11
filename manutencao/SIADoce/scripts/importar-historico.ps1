[CmdletBinding()]
param([Parameter(Mandatory)][string]$Origem)

$ErrorActionPreference = 'Stop'
$Origem = (Resolve-Path -LiteralPath $Origem).Path
$destino = Split-Path -Parent $PSScriptRoot

function Copiar-SeAusente([string]$arquivo, [string]$alvo) {
    if (Test-Path -LiteralPath $alvo) { return }
    New-Item -ItemType Directory -Path (Split-Path -Parent $alvo) -Force | Out-Null
    $temporario = "$alvo.$([guid]::NewGuid()).tmp"
    try {
        Copy-Item -LiteralPath $arquivo -Destination $temporario
        [IO.File]::Move($temporario, $alvo)
    } finally {
        if ([IO.File]::Exists($temporario)) { [IO.File]::Delete($temporario) }
    }
}

foreach ($nome in 'atualizacoes', 'analises-avulsas', 'layouts', 'server') {
    $fonte = Join-Path $Origem $nome
    if (-not (Test-Path -LiteralPath $fonte -PathType Container)) { continue }
    $pasta = if ($nome -in 'layouts', 'server') { Join-Path $destino "referencia-anterior/$nome" } else { Join-Path $destino $nome }
    foreach ($arquivo in (Get-ChildItem -LiteralPath $fonte -File -Recurse -Force)) {
        if ($arquivo.Name -eq 'desktop.ini' -or $arquivo.Extension -in '.lock', '.tmp') { continue }
        $relativo = [IO.Path]::GetRelativePath($fonte, $arquivo.FullName)
        $alvo = Join-Path $pasta $relativo
        Copiar-SeAusente $arquivo.FullName $alvo
    }
}

if (Test-Path -LiteralPath (Join-Path $Origem 'hugo.toml')) {
    foreach ($nome in 'hugo.toml', 'README.md', 'scripts/demonstracao-anonimizar.ps1',
                      'scripts/demonstracao-restaurar.ps1', 'scripts/test-producao-pagina.py') {
        $fonte = Join-Path $Origem $nome
        if (Test-Path -LiteralPath $fonte -PathType Leaf) {
            Copiar-SeAusente $fonte (Join-Path $destino "referencia-anterior/$nome")
        }
    }
}
