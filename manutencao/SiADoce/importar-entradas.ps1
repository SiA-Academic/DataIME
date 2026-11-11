[CmdletBinding()]
param([Parameter(Mandatory, Position = 0)][string]$Origem)

$ErrorActionPreference = 'Stop'
$source = (Resolve-Path -LiteralPath $Origem).Path
if ($source -eq $PSScriptRoot) { throw 'A pasta de origem já é a pasta de manutenção.' }

# Inclui o cadastro anterior para preservar os identificadores e o histórico
# Lattes nas importações seguintes. As entradas ficam fora do índice do Git.
$required = @(
    'static/janus.pdf', 'static/orientadores.pdf', 'static/disciplinas.pdf',
    'static/CVS_LATTES', 'static/configuracoes.md',
    'content/controle/lattes-docentes.csv', 'content/controle/docentes.md',
    'data/controle/docentes-excluidos.json', 'data/controle/complementos-quadrienio.json',
    'data/controle/ranking-periodicos-revisoes.json'
)
$optional = @(
    'static/areas.md', 'static/configuracoes_padrao.md', 'static/NORMAS', 'static/DIRETRIZES',
    'static/modelos-maycon'
)
foreach ($name in $required) {
    if (-not (Test-Path -LiteralPath (Join-Path $source $name))) { throw "Entrada ausente na origem: $name" }
}
foreach ($name in ($required + $optional)) {
    $path = Join-Path $source $name
    if (-not (Test-Path -LiteralPath $path)) { continue }
    $target = Join-Path $PSScriptRoot $name
    if (Test-Path -LiteralPath $path -PathType Container) {
        New-Item -ItemType Directory -Path $target -Force | Out-Null
        $extensions = if ($name -eq 'static/modelos-maycon') { @('.html', '.css') } else { @('.pdf') }
        foreach ($file in (Get-ChildItem -File -LiteralPath $path)) {
            if ($file.Extension -in $extensions) { Copy-Item -LiteralPath $file.FullName -Destination $target -Force }
        }
    } else {
        New-Item -ItemType Directory -Path (Split-Path -Parent $target) -Force | Out-Null
        Copy-Item -LiteralPath $path -Destination $target -Force
    }
}
# O grupo de apresentação pode ter exceções institucionais. O acervo atual
# guarda o cadastro em JSON; a implantação anterior o guardava em um parcial.
$groups = 'data/controle/grupos-analise.json'
$groupsSource = Join-Path $source $groups
$groupsTarget = Join-Path $PSScriptRoot $groups
if (Test-Path -LiteralPath $groupsSource -PathType Leaf) {
    Copy-Item -LiteralPath $groupsSource -Destination $groupsTarget -Force
} else {
    $partial = Join-Path $source 'layouts/partials/grupo-analise-docente.html'
    $exceptions = @()
    if (Test-Path -LiteralPath $partial -PathType Leaf) {
        $text = [IO.File]::ReadAllText($partial)
        $rules = [regex]::Matches($text, 'if and \(eq \.id "([^"]+)"\) \(eq \.categoria "([^"]+)"\)\s*-?\}\}\s*\{\{-?\s*\$grupo = "([^"]+)"')
        if ($rules.Count -ne [regex]::Matches($text, 'eq \.id ').Count) {
            throw 'Regra de grupo institucional não reconhecida. Forneça data/controle/grupos-analise.json no acervo.'
        }
        foreach ($rule in $rules) {
            $exceptions += [ordered]@{ id=$rule.Groups[1].Value; categoria=$rule.Groups[2].Value; grupo=$rule.Groups[3].Value }
        }
    }
    [IO.File]::WriteAllText($groupsTarget, (ConvertTo-Json -InputObject $exceptions), [Text.UTF8Encoding]::new($false))
}
Write-Host 'Entradas institucionais copiadas para a pasta de manutenção.'
