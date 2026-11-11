# Funções usadas pelo importador Janus. Não executa nem grava dados ao carregar.
function ReadOrientadoresAnnualRoster([string]$Path) {
  $rows = @{}
  foreach ($line in (ConvertPdfToTextLines $Path 'a lista de nomes de orientadores')) {
    if ($line -match '^\s*\d+\s+(\d+)\s+(.+?)\s+(ME|DO|DD)\s+') {
      $nusp = $matches[1]
      $nome = ($matches[2] -replace '\s+', ' ').Trim()
      if ($rows.ContainsKey($nusp) -and (Normalize-Text $rows[$nusp].nome) -ne (Normalize-Text $nome)) {
        throw "Nomes divergentes para NUSP $nusp em static/orientadores.pdf."
      }
      $rows[$nusp] = [pscustomobject]@{ nusp = $nusp; nome = $nome }
    } elseif ($line -match '^\s*\d+\s+\d+\s+') {
      throw "Linha de orientador não reconhecida em static/orientadores.pdf: $line"
    }
  }
  if (-not $rows.Count) { throw 'Nenhum nome encontrado em static/orientadores.pdf.' }
  return @($rows.Values | Sort-Object nome)
}

function NewAnalysisRosterIndex($Roster) {
  if ($null -eq $Roster) { throw 'Informe a lista de docentes com categoria de credenciamento para definir o escopo da análise.' }
  $allowedCategories = @('pleno', 'especifico', 'vencido_com_orientando')
  $byName = @{}
  $byNusp = @{}
  $rows = New-Object System.Collections.Generic.List[object]
  $sourceCount = 0
  $excluded = 0
  foreach ($advisor in $Roster) {
    $sourceCount++
    if (-not $advisor.categoria -or $advisor.categoria -notin ($allowedCategories + 'sem_credenciamento')) {
      throw "Categoria de credenciamento ausente ou inválida no escopo da análise: $($advisor.nome)."
    }
    if ($advisor.categoria -eq 'sem_credenciamento') { $excluded++; continue }
    $nameKey = Normalize-Text $advisor.nome
    if (-not $nameKey) { throw 'Nome de docente ausente no escopo da análise.' }
    if ($byName.ContainsKey($nameKey)) { throw "Nome de orientador ambíguo no escopo da análise: $($advisor.nome)" }
    $byName[$nameKey] = $advisor
    if ($advisor.nusp) {
      $nuspKey = [string]$advisor.nusp
      if ($byNusp.ContainsKey($nuspKey)) { throw "NUSP de orientador duplicado no escopo da análise: $nuspKey." }
      $byNusp[$nuspKey] = $advisor
    }
    $rows.Add($advisor)
  }
  return [pscustomobject]@{
    Rows = @($rows | Sort-Object nome)
    ByName = $byName
    ByNusp = $byNusp
    Categories = $allowedCategories
    SourceCount = $sourceCount
    Excluded = $excluded
  }
}

function FindAnalysisAdvisor($Student, $Index) {
  if ($Student.orientador_nusp) {
    $key = [string]$Student.orientador_nusp
    if ($Index.ByNusp.ContainsKey($key)) { return $Index.ByNusp[$key] }
    return $null
  }
  $key = Normalize-Text $Student.orientador
  if ($Index.ByName.ContainsKey($key)) { return $Index.ByName[$key] }
  return $null
}

function NewTituladosAnnualSummary($Roster, $Titulados, [string]$Periodo, [int]$CurrentYear = (Get-Date).Year) {
  $analysisIndex = NewAnalysisRosterIndex $Roster
  $dates = @([regex]::Matches($Periodo, '\d{2}/\d{2}/\d{4}') | ForEach-Object { ParseDateValue $_.Value })
  if ($dates.Count -ne 2 -or -not $dates[0] -or -not $dates[1] -or $dates[0] -gt $dates[1]) {
    throw "Período inválido para a tabela anual: $Periodo"
  }
  if ($Titulados.Inicio -gt $dates[0] -or $Titulados.Fim -lt $dates[1]) {
    throw 'static/janus.pdf não cobre o período da tabela anual.'
  }
  $years = @([Math]::Min($dates[0].Year, $CurrentYear)..[Math]::Max($dates[1].Year, $CurrentYear))
  $coverage = @($years | ForEach-Object {
    $yearStart = [DateTime]::new($_, 1, 1)
    $yearEnd = [DateTime]::new($_, 12, 31)
    $start = if ($dates[0] -gt $yearStart) { $dates[0] } else { $yearStart }
    $end = if ($dates[1] -lt $yearEnd) { $dates[1] } else { $yearEnd }
    $available = $start -le $end
    [pscustomobject][ordered]@{
      ano = $_
      corrente = $_ -eq $CurrentYear
      disponivel = $available
      parcial = $available -and ($start -gt $yearStart -or $end -lt $yearEnd)
      inicio = if ($available) { $start.ToString('dd/MM/yyyy') } else { '' }
      fim = if ($available) { $end.ToString('dd/MM/yyyy') } else { '' }
    }
  })
  $byName = @{}
  $rows = @($analysisIndex.Rows | ForEach-Object {
    $nameKey = Normalize-Text $_.nome
    if ($byName.ContainsKey($nameKey)) { throw "Nome de orientador ambíguo na tabela anual: $($_.nome)" }
    $row = [pscustomobject][ordered]@{
      nome = $_.nome
      nusp = $_.nusp
      anos = @($coverage | ForEach-Object {
        [pscustomobject][ordered]@{
          ano = $_.ano
          me = if ($_.disponivel) { 0 } else { $null }
          do_dd = if ($_.disponivel) { 0 } else { $null }
        }
      })
      total_me = 0
      total_do_dd = 0
      total = 0
    }
    $byName[$nameKey] = $row
    $row
  })
  $outsideRoster = 0
  foreach ($student in $Titulados.Alunos) {
    $date = ParseDateValue $student.data_situacao
    if (-not $date) { throw 'Data de titulação inválida na tabela anual.' }
    if ($date -lt $dates[0] -or $date -gt $dates[1]) { continue }
    $advisor = FindAnalysisAdvisor $student $analysisIndex
    if (-not $advisor) { $outsideRoster++; continue }
    $nameKey = Normalize-Text $advisor.nome
    $row = $byName[$nameKey]
    $cell = $row.anos[$date.Year - $years[0]]
    if ($student.curso -eq 'ME') {
      $cell.me++
      $row.total_me++
    } elseif ($student.curso -in @('DO', 'DD', 'DO/DD')) {
      $cell.do_dd++
      $row.total_do_dd++
    } else {
      throw "Curso desconhecido na tabela anual: $($student.curso)"
    }
    $row.total++
  }
  $totals = @($coverage | ForEach-Object {
    $index = $_.ano - $years[0]
    [pscustomobject][ordered]@{
      ano = $_.ano
      me = if ($_.disponivel) { [int](($rows | ForEach-Object { $_.anos[$index].me } | Measure-Object -Sum).Sum) } else { $null }
      do_dd = if ($_.disponivel) { [int](($rows | ForEach-Object { $_.anos[$index].do_dd } | Measure-Object -Sum).Sum) } else { $null }
    }
  })
  return [pscustomobject][ordered]@{
    fonte = 'static/orientadores.pdf + static/janus.pdf'
    escopo = 'docentes_acompanhados'
    categorias_incluidas = $analysisIndex.Categories
    total_docentes_fonte = $analysisIndex.SourceCount
    docentes_excluidos = $analysisIndex.Excluded
    periodo = $Periodo
    ano_corrente = $CurrentYear
    anos = $coverage
    orientadores = $rows
    totais_anuais = $totals
    total_orientadores = $rows.Count
    total_me = [int](($rows | Measure-Object total_me -Sum).Sum)
    total_do_dd = [int](($rows | Measure-Object total_do_dd -Sum).Sum)
    total = [int](($rows | Measure-Object total -Sum).Sum)
    total_titulacoes_fonte = [int](($rows | Measure-Object total -Sum).Sum) + $outsideRoster
    titulacoes_fora_escopo = $outsideRoster
    titulacoes_fora_lista = $outsideRoster
  }
}
