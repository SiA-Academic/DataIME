# Ponte privada: carrega somente as funcoes do extrator canonico.
# Nao cria cadastro, markdown, relatorio publico ou copia permanente do PDF.
[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)][string]$PdfPath,
  [Parameter(Mandatory = $true)][string]$OutputJson,
  [Parameter(Mandatory = $true)][int]$Inicio,
  [Parameter(Mandatory = $true)][int]$Fim
)

$ErrorActionPreference = "Stop"
if ($PSVersionTable.PSVersion.Major -lt 7) {
  throw "A analise avulsa exige PowerShell 7 (pwsh), para preservar os caracteres do PDF."
}
$canonicalExtractor = Join-Path $PSScriptRoot "gerar-publicacoes-lattes.ps1"
. $canonicalExtractor -SomenteFuncoes

if ($Inicio -lt 1900 -or $Fim -gt 2099 -or $Inicio -gt $Fim) {
  throw "Intervalo de anos invalido; use 1900 a 2099, inicio menor ou igual ao fim."
}
if (-not (Test-Path -LiteralPath $PdfPath -PathType Leaf)) { throw "PDF nao encontrado." }

$rawText = Convert-PdfToText ([IO.Path]::GetFullPath($PdfPath))
$cleanText = Clean-LattesText $rawText
# Nao usar o nome do arquivo como identidade: ele pode ter sido renomeado.
$cvMeta = Get-LattesMeta $cleanText "entrada-avulsa.pdf"
$lattesIds = @([regex]::Matches($cleanText, '(?i)(?:ID\s+Lattes:\s*|lattes\.cnpq\.br/)(\d{16})(?!\d)') |
  ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique)
if ($lattesIds.Count -ne 1 -or $cvMeta.LattesId -ne $lattesIds[0]) {
  throw "Nao foi possivel identificar um unico ID Lattes no PDF. Use o curriculo completo exportado pelo Lattes."
}

$periodicalHeading = "Artigos completos publicados em periódicos"
$eventHeading = "Trabalhos completos publicados em anais de congressos"
$periodicalSection = Extract-Section $cleanText $periodicalHeading (Get-PublicationStopHeadings "periodico")
$eventSection = Extract-Section $cleanText $eventHeading (Get-PublicationStopHeadings "anais_congressos")
$foundPeriodicals = [regex]::IsMatch($cleanText, '(?im)^\s*' + [regex]::Escape($periodicalHeading) + '\s*$')
$foundEvents = [regex]::IsMatch($cleanText, '(?im)^\s*' + [regex]::Escape($eventHeading) + '\s*$')
$allPeriodicals = @(Extract-Items $periodicalSection "periodico" 0 0)
$allEvents = @(Extract-Items $eventSection "anais_congressos" 0 0)
# Se ha uma lista, um resultado vazio do parser nao significa zero producao.
foreach ($check in @(
  @{ Nome = "periodicos"; Secao = $periodicalSection; Total = $allPeriodicals.Count },
  @{ Nome = "eventos"; Secao = $eventSection; Total = $allEvents.Count }
)) {
  if ($check.Total -eq 0 -and [regex]::IsMatch($check.Secao, '(?m)^\s*1\.(?=[ \t]|\r?$)')) {
    throw "Ha uma lista de $($check.Nome), mas suas referencias nao foram reconhecidas. Revise o PDF; nao sera atribuido zero."
  }
}
$selected = @($allPeriodicals + $allEvents | Where-Object { $_.ano -ge $Inicio -and $_.ano -le $Fim })
$payload = [ordered]@{
  schema_version = 1
  extrator = "scripts/gerar-publicacoes-lattes.ps1 -SomenteFuncoes"
  nome_detectado = $cvMeta.Nome
  lattes_id = $cvMeta.LattesId
  lattes_url = $cvMeta.LattesUrl
  lattes_atualizado_em = $cvMeta.LattesAtualizadoEm
  ano_inicio = $Inicio
  ano_fim = $Fim
  secoes = [ordered]@{ periodicos = $foundPeriodicals; eventos = $foundEvents }
  total_localizado_sem_recorte = $allPeriodicals.Count + $allEvents.Count
  total_fora_recorte = $allPeriodicals.Count + $allEvents.Count - $selected.Count
  publicacoes = $selected
}
$outputFull = [IO.Path]::GetFullPath($OutputJson)
[IO.File]::WriteAllText($outputFull, ($payload | ConvertTo-Json -Depth 12), [Text.UTF8Encoding]::new($false))
