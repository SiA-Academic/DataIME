# Contagem mensal de titulações pela data de situação no Janus, sem nomes de alunos.
function NewMonthlyIndicators($Titulados, [datetime]$Today = (Get-Date), $Roster = $null) {
  $analysisIndex = NewAnalysisRosterIndex $Roster
  if (-not $Titulados.Inicio -or -not $Titulados.Fim -or $Titulados.Inicio -gt $Titulados.Fim) {
    throw 'Período inválido para o gráfico anual de titulados.'
  }
  $students = New-Object System.Collections.Generic.List[object]
  $outsideScope = 0
  foreach ($student in $Titulados.Alunos) {
    $date = ParseDateValue $student.data_situacao
    if (-not $date) { throw 'Data de titulação inválida no painel mensal.' }
    if ($date -lt $Titulados.Inicio -or $date -gt $Titulados.Fim -or $date -gt $Today.Date) { continue }
    if (-not (FindAnalysisAdvisor $student $analysisIndex)) { $outsideScope++; continue }
    $students.Add($student)
  }
  # Anos completos no eixo: meses fora da cobertura permanecem desconhecidos.
  $firstMonth = [datetime]::new($Titulados.Inicio.Year, 1, 1)
  $lastMonth = [datetime]::new($Titulados.Fim.Year, 12, 1)
  $monthCount = ($lastMonth.Year - $firstMonth.Year + 1) * 12
  $months = @()
  for ($i = 0; $i -lt $monthCount; $i++) {
    $start = $firstMonth.AddMonths($i)
    $end = $start.AddMonths(1).AddDays(-1)
    $key = $start.ToString('yyyy-MM')
    $coverageStart = if ($Titulados.Inicio -gt $start) { $Titulados.Inicio } else { $start }
    $coverageEnd = if ($Titulados.Fim -lt $end) { $Titulados.Fim } else { $end }
    if ($coverageEnd -gt $Today.Date) { $coverageEnd = $Today.Date }
    $available = $coverageStart -le $coverageEnd
    $counts = @{ ME = 0; DO_DD = 0 }
    if ($available) {
      foreach ($student in $students) {
        $date = ParseDateValue $student.data_situacao
        if (-not $date) { throw 'Data de titulação inválida no painel mensal.' }
        if ($date -ge $coverageStart -and $date -le $coverageEnd) {
          if ($student.curso -eq 'ME') { $counts.ME++ }
          elseif ($student.curso -in @('DO', 'DD', 'DO/DD')) { $counts.DO_DD++ }
          else { throw "Modalidade não identificada no painel mensal: $($student.curso)" }
        }
      }
    }
    $row = [ordered]@{
      mes = $key
      rotulo = $start.ToString('MMM/yy', [Globalization.CultureInfo]::GetCultureInfo('pt-BR'))
      corrente = $key -eq $Today.ToString('yyyy-MM')
      mes_parcial = ($key -eq $Today.ToString('yyyy-MM')) -and $Today.Date -lt $end
      titulados = if ($available) { $counts.ME + $counts.DO_DD } else { $null }
      titulados_me = if ($available) { $counts.ME } else { $null }
      titulados_do_dd = if ($available) { $counts.DO_DD } else { $null }
      titulados_parcial = $available -and ($coverageStart -gt $start -or $coverageEnd -lt $end)
      titulados_inicio = if ($available) { $coverageStart.ToString('yyyy-MM-dd') } else { '' }
      titulados_fim = if ($available) { $coverageEnd.ToString('yyyy-MM-dd') } else { '' }
    }
    $months += [pscustomobject]$row
  }
  return [pscustomobject][ordered]@{
    atualizado_em = $Today.ToString('yyyy-MM-dd')
    inicio = $firstMonth.ToString('yyyy-MM')
    fim = $lastMonth.ToString('yyyy-MM')
    fonte_titulados_periodo = $Titulados.Periodo
    fonte = 'static/janus.pdf + static/orientadores.pdf'
    escopo = 'docentes_acompanhados'
    categorias_incluidas = $analysisIndex.Categories
    total_docentes_fonte = $analysisIndex.SourceCount
    total_orientadores = $analysisIndex.Rows.Count
    docentes_excluidos = $analysisIndex.Excluded
    total_titulacoes_fonte = $students.Count + $outsideScope
    titulacoes_fora_escopo = $outsideScope
    total = $students.Count
    anos = @($firstMonth.Year..$lastMonth.Year)
    meses = $months
  }
}
