$ErrorActionPreference = 'Stop'
$tokens = $null
$errors = $null
$ast = [System.Management.Automation.Language.Parser]::ParseFile((Join-Path $PSScriptRoot 'atualizar-docentes-janus.ps1'), [ref]$tokens, [ref]$errors)
if ($errors.Count) { throw ($errors.Message -join "`n") }
foreach ($definition in $ast.FindAll({ param($node) $node -is [System.Management.Automation.Language.FunctionDefinitionAst] }, $false)) {
  . ([scriptblock]::Create($definition.Extent.Text))
}
. (Join-Path $PSScriptRoot 'titulados-por-ano.ps1')
function Assert($Condition, [string]$Message) { if (-not $Condition) { throw $Message } }

# A lista é literal: aceita coorientadores e deduplica cursos por número USP.
function ConvertPdfToTextLines([string]$Path, [string]$Label) {
  @(
    '45134 123 Álvaro Silva DO Pleno 01/01/2024 01/01/2027',
    '45134 123 Álvaro Silva ME Coorientador 01/01/2024',
    '45134 456 Bruna Melo ME Coorientador 01/01/2024'
  )
}
$roster = @(ReadOrientadoresAnnualRoster 'fixture')
Assert ($roster.Count -eq 2) 'A lista deve deduplicar pessoas e incluir todos os nomes do PDF.'
# O escopo é fornecido pelo importador após classificar o credenciamento principal.
$roster[0] | Add-Member -NotePropertyName categoria -NotePropertyValue 'pleno'
$roster[1] | Add-Member -NotePropertyName categoria -NotePropertyValue 'especifico'
$result = [pscustomobject]@{
  Inicio = [datetime]'2022-01-01'; Fim = [datetime]'2024-08-31'
  Alunos = @(
    [pscustomobject]@{ nome = 'Aluno A'; orientador = 'ALVARO SILVA'; curso = 'ME'; data_situacao = '2022-01-01' },
    [pscustomobject]@{ nome = 'Aluno B'; orientador = 'Álvaro Silva'; curso = 'DO'; data_situacao = '2023-03-20' },
    [pscustomobject]@{ nome = 'Aluno C'; orientador = 'Álvaro Silva'; curso = 'DD'; data_situacao = '2023-04-20' },
    [pscustomobject]@{ nome = 'Aluno D'; orientador = 'Álvaro Silva'; curso = 'DO/DD'; data_situacao = '2024-08-31' },
    [pscustomobject]@{ nome = 'Aluno E'; orientador = 'Fora da lista'; curso = 'ME'; data_situacao = '2024-06-20' }
  )
}
$summary = NewTituladosAnnualSummary $roster $result '01/01/2022 a 31/08/2024' 2026
Assert ($summary.fonte -eq 'static/orientadores.pdf + static/janus.pdf') 'A fonte anual deve usar as titulações do Janus.'
Assert (($summary.anos.ano -join ',') -eq '2022,2023,2024,2025,2026') 'Os anos devem incluir lacunas e ano corrente.'
Assert ($summary.anos[4].corrente -and -not $summary.anos[4].disponivel) 'Ano corrente sem cobertura deve estar identificado.'
Assert ($summary.anos[2].parcial -and $summary.anos[2].fim -eq '31/08/2024') 'Ano parcial deve ter data de corte.'
Assert ($summary.total_orientadores -eq 2 -and $summary.total -eq 4 -and $summary.titulacoes_fora_lista -eq 1) 'Totais ou filtro de orientadores incorretos.'
$alvaro = @($summary.orientadores | Where-Object nome -eq 'Álvaro Silva')[0]
$bruna = @($summary.orientadores | Where-Object nome -eq 'Bruna Melo')[0]
Assert ($alvaro.anos[0].me -eq 1 -and $alvaro.anos[1].do_dd -eq 2 -and $alvaro.anos[2].do_dd -eq 1) 'Distribuição por ano e curso incorreta.'
Assert ($bruna.total -eq 0 -and $bruna.anos[0].me -eq 0) 'Orientador sem defesa deve permanecer com zero.'
Assert ($null -eq $bruna.anos[4].me -and $null -eq $alvaro.anos[3].do_dd) 'Ausência de cobertura não pode virar zero.'
Assert ($summary.total_me -eq 1 -and $summary.total_do_dd -eq 3) 'DO, DD e DO/DD precisam entrar na mesma coluna.'
Assert (($summary | ConvertTo-Json -Depth 10) -notmatch 'Aluno [A-E]') 'A base anual não deve carregar nomes de alunos.'
$subset = NewTituladosAnnualSummary $roster $result '01/01/2023 a 31/12/2023' 2023
Assert ($subset.total -eq 2 -and $subset.anos.Count -eq 1 -and -not $subset.anos[0].parcial) 'Filtro do intervalo anual incorreto.'
foreach ($year in $summary.totais_anuais) {
  $cells = @($summary.orientadores | ForEach-Object { $_.anos } | Where-Object ano -eq $year.ano)
  if ($null -ne $year.me) {
    Assert ($year.me -eq ($cells | Measure-Object me -Sum).Sum) 'Total anual ME divergente.'
    Assert ($year.do_dd -eq ($cells | Measure-Object do_dd -Sum).Sum) 'Total anual DO/DD divergente.'
  }
}

$scopeRoster = @($roster) + @(
  [pscustomobject]@{ nome = 'Carla Nunes'; nusp = '789'; categoria = 'vencido_com_orientando' },
  [pscustomobject]@{ nome = 'Docente excluído'; nusp = '999'; categoria = 'sem_credenciamento' }
)
$scopeResult = [pscustomobject]@{
  Inicio = $result.Inicio; Fim = $result.Fim
  Alunos = @($result.Alunos) + @(
    [pscustomobject]@{ nome = 'Aluno F'; orientador = 'Bruna Melo'; orientador_nusp = '456'; curso = 'ME'; data_situacao = '2023-03-20' },
    [pscustomobject]@{ nome = 'Aluno G'; orientador = 'Carla Nunes'; orientador_nusp = '789'; curso = 'DD'; data_situacao = '2023-03-20' },
    [pscustomobject]@{ nome = 'Aluno H'; orientador = 'Docente excluído'; orientador_nusp = '999'; curso = 'DO'; data_situacao = '2023-03-20' },
    [pscustomobject]@{ nome = 'Aluno I'; orientador = 'Álvaro Silva'; orientador_nusp = '999'; curso = 'ME'; data_situacao = '2023-03-20' }
  )
}
$sourceBefore = $scopeResult | ConvertTo-Json -Depth 10
$scopeSummary = NewTituladosAnnualSummary $scopeRoster $scopeResult '01/01/2022 a 31/08/2024' 2024
Assert ($scopeSummary.total_orientadores -eq 3 -and $scopeSummary.docentes_excluidos -eq 1 -and $scopeSummary.total_docentes_fonte -eq 4) 'A tabela deve conter apenas as três categorias acompanhadas.'
Assert (@($scopeSummary.orientadores | Where-Object nusp -eq '999').Count -eq 0) 'O docente sem credenciamento não deve aparecer na tabela.'
Assert ($scopeSummary.total -eq 6 -and $scopeSummary.total_me -eq 2 -and $scopeSummary.total_do_dd -eq 4) 'As titulações do docente excluído não podem vazar nos totais.'
Assert ($scopeSummary.total_titulacoes_fonte -eq 9 -and $scopeSummary.titulacoes_fora_escopo -eq 3 -and $scopeSummary.titulacoes_fora_lista -eq 3) 'Os registros fora de escopo devem permanecer contabilizados para auditoria.'
Assert (($scopeSummary.total / $scopeSummary.total_orientadores) -eq 2) 'O denominador da média deve incluir apenas docentes acompanhados.'
Assert (($scopeSummary.totais_anuais | Where-Object ano -eq 2023).me -eq 1) 'NUSP excluído não pode ser readmitido por coincidência de nome.'
Assert (($scopeResult | ConvertTo-Json -Depth 10) -eq $sourceBefore) 'A análise não pode modificar os registros de origem.'
Assert ($scopeSummary.escopo -eq 'docentes_acompanhados') 'O escopo deve ser explícito.'
$noRosterError = $null
try { NewTituladosAnnualSummary $null $result '01/01/2022 a 31/08/2024' | Out-Null } catch { $noRosterError = $_.Exception.Message }
Assert ($noRosterError -match 'lista.*categoria') 'A análise sem classificação de credenciamento deve falhar claramente.'
'PASS: lista literal, deduplicação, anos, cobertura, cursos, somas, exclusão por credenciamento e preservação da fonte.'
