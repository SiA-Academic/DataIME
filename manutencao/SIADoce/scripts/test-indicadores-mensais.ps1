$ErrorActionPreference = 'Stop'
$tokens = $null
$errors = $null
$ast = [Management.Automation.Language.Parser]::ParseFile((Join-Path $PSScriptRoot 'atualizar-docentes-janus.ps1'), [ref]$tokens, [ref]$errors)
if ($errors.Count) { throw ($errors.Message -join [Environment]::NewLine) }
foreach ($definition in $ast.FindAll({ param($node) $node -is [Management.Automation.Language.FunctionDefinitionAst] }, $false)) {
  . ([scriptblock]::Create($definition.Extent.Text))
}
. (Join-Path $PSScriptRoot 'titulados-por-ano.ps1')
. (Join-Path $PSScriptRoot 'indicadores-mensais.ps1')
function Assert($Condition, [string]$Message) { if (-not $Condition) { throw $Message } }
$roster = @(
  [pscustomobject]@{ nome = 'Álvaro Silva'; nusp = '1'; categoria = 'pleno' },
  [pscustomobject]@{ nome = 'Bruna Melo'; nusp = '2'; categoria = 'especifico' },
  [pscustomobject]@{ nome = 'Carla Nunes'; nusp = '3'; categoria = 'vencido_com_orientando' },
  [pscustomobject]@{ nome = 'Docente excluído'; nusp = '4'; categoria = 'sem_credenciamento' }
)
$fixture = [pscustomobject]@{
  Inicio = [datetime]'2024-02-10'; Fim = [datetime]'2026-01-15'; Periodo = '10/02/2024 a 15/01/2026'
  Alunos = @(
    [pscustomobject]@{ orientador='Álvaro Silva'; orientador_nusp='1'; curso='ME'; data_situacao='2024-02-29' },
    [pscustomobject]@{ orientador='Bruna Melo'; orientador_nusp='2'; curso='DO/DD'; data_situacao='2024-03-01' },
    [pscustomobject]@{ orientador='Carla Nunes'; orientador_nusp='3'; curso='DD'; data_situacao='2025-12-31' },
    [pscustomobject]@{ orientador='Álvaro Silva'; orientador_nusp='1'; curso='DO'; data_situacao='2026-01-15' },
    [pscustomobject]@{ orientador='Docente excluído'; orientador_nusp='4'; curso='ME'; data_situacao='2024-02-29' },
    [pscustomobject]@{ orientador='Álvaro Silva'; orientador_nusp='4'; curso='DO'; data_situacao='2024-03-01' }
  )
}
$sourceBefore = $fixture | ConvertTo-Json -Depth 10
$result = NewMonthlyIndicators $fixture ([datetime]'2026-01-20') $roster
Assert ($result.fonte -eq 'static/janus.pdf + static/orientadores.pdf') 'O painel mensal deve usar titulações do Janus e o escopo de credenciamento.'
Assert ($result.meses.Count -eq 36 -and $result.inicio -eq '2024-01' -and $result.fim -eq '2026-12') 'Todos os anos devem ter janeiro a dezembro.'
Assert (($result.anos -join ',') -eq '2024,2025,2026') 'Lista de anos incorreta.'
Assert ($null -eq $result.meses[0].titulados) 'Mês anterior à cobertura não pode virar zero.'
Assert ($result.meses[1].titulados -eq 1 -and $result.meses[1].titulados_parcial) 'Cobertura parcial e ano bissexto.'
Assert ($result.meses[2].titulados_do_dd -eq 1) 'Doutorado combinado não contado.'
Assert ($result.meses[24].titulados -eq 1 -and $result.meses[24].titulados_parcial) 'Corte parcial no mês atual.'
Assert ($result.meses[24].mes_parcial -and $result.meses[24].corrente) 'Mês corrente incorreto.'
Assert (-not $result.meses[35].corrente -and $null -eq $result.meses[35].titulados) 'Dezembro futuro não pode ter valor nem ser mês corrente.'
Assert ($result.meses[3].titulados -eq 0) 'Zero dentro da cobertura deveria ser conhecido.'
$next = NewMonthlyIndicators $fixture ([datetime]'2028-02-20') $roster
Assert ($next.meses.Count -eq 36 -and $next.fim -eq '2026-12') 'O ano atual não deve expandir o período do PDF.'
foreach ($year in $result.anos) {
  $yearRows = @($result.meses | Where-Object { $_.mes.StartsWith("$year-") })
  Assert ($yearRows.Count -eq 12) 'Cada ano deve ter exatamente 12 posições.'
}
Assert ($result.total -eq 4 -and ($result.meses | Measure-Object titulados -Sum).Sum -eq 4) 'Atividades dos excluídos não podem entrar nos totais mensais.'
Assert ($result.total_orientadores -eq 3 -and $result.docentes_excluidos -eq 1 -and $result.total_docentes_fonte -eq 4) 'As categorias acompanhadas e excluídas devem permanecer explícitas.'
Assert ($result.total_titulacoes_fonte -eq 6 -and $result.titulacoes_fora_escopo -eq 2) 'As atividades fora de escopo devem permanecer auditáveis.'
Assert (($fixture | ConvertTo-Json -Depth 10) -eq $sourceBefore) 'A análise mensal não pode modificar os registros de origem.'
$noRosterError = $null
try { NewMonthlyIndicators $fixture | Out-Null } catch { $noRosterError = $_.Exception.Message }
Assert ($noRosterError -match 'lista.*categoria') 'Sem lista categorizada a análise deve falhar, em vez de voltar a incluir todos.'
$actualRows = ReadPdfRows (Join-Path (Split-Path -Parent $PSScriptRoot) 'static/janus.pdf')
$actualCredentials = ReadCredentialRows (Join-Path (Split-Path -Parent $PSScriptRoot) 'static/orientadores.pdf')
$actualNusps = @(@($actualRows.Keys) + @($actualCredentials.Keys) | Sort-Object -Unique)
$actualRoster = @($actualNusps | ForEach-Object {
  $janus = $actualRows[$_]
  $credential = $actualCredentials[$_]
  [pscustomobject]@{
    nome = if ($janus) { $janus.Nome } else { $credential.Nome }
    nusp = [string]$_
    categoria = DocenteCredentialCategory ([pscustomobject]@{ credenciamento = $credential })
  }
})
$actualPeriod = @($actualRows.Values | Select-Object -First 1)[0].Periodo
$actual = NewJanusTituladosResult $actualRows $actualPeriod
$referenceDate = $actual.Fim
$live = NewMonthlyIndicators $actual $referenceDate $actualRoster
$eligibleNusps = @($actualRoster | Where-Object categoria -in @('pleno', 'especifico', 'vencido_com_orientando') | ForEach-Object nusp)
$expected = @($actual.Alunos | Where-Object { $_.orientador_nusp -in $eligibleNusps -and $_.data_situacao -ge $actual.Inicio.ToString('yyyy-MM-dd') -and $_.data_situacao -le $referenceDate.ToString('yyyy-MM-dd') }).Count
Assert (($live.meses | Measure-Object titulados -Sum).Sum -eq $expected) 'Total mensal diverge das titulações dos docentes acompanhados.'
Assert (($live.total + $live.titulacoes_fora_escopo) -eq $actual.Alunos.Count) 'Contagens acompanhadas e excluídas devem reconciliar o PDF completo.'
Assert (($live | ConvertTo-Json -Depth 12) -notmatch '"nome"|"alunos_ativos"|"docentes_plenos"|"ingressantes"|"retratos"') 'Painel deve conter apenas contagens de titulados.'
'PASS: todos os anos, cobertura, cursos, zeros, lacunas, exclusão por credenciamento e reconciliação do PDF.'
