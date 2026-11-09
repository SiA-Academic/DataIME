window.PAINEL_DATA = {
  "schema_version": "1.0",
  "generated_at": "2026-11-09T15:56:34.682899+00:00",
  "period": [
    2012,
    2025
  ],
  "programs": [
    {
      "id": "CC",
      "label": "Ciência da Computação",
      "short_label": "Computação",
      "code": 45005
    },
    {
      "id": "MAT",
      "label": "Matemática",
      "short_label": "Matemática",
      "code": 45002
    },
    {
      "id": "MAP",
      "label": "Matemática Aplicada",
      "short_label": "Mat. Aplicada",
      "code": 45003
    },
    {
      "id": "PE",
      "label": "Probabilidade e Estatística",
      "short_label": "Prob. e Estatística",
      "code": 45004
    },
    {
      "id": "MPEM",
      "label": "Ensino de Matemática (profissional)",
      "short_label": "Ensino de Matemática",
      "code": 45006
    }
  ],
  "level_labels": {
    "ME": "Mestrado",
    "DO": "Doutorado",
    "DD": "Doutorado direto",
    "DO_DD": "Doutorado + doutorado direto",
    "total": "Total"
  },
  "metrics_definitions": [
    {
      "id": "degrees.degrees",
      "section": "degrees",
      "metric": "degrees",
      "label": "Titulações",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes."
    },
    {
      "id": "enrollment.regular_enrollment",
      "section": "enrollment",
      "metric": "regular_enrollment",
      "label": "Matrículas regulares",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril."
    },
    {
      "id": "enrollment.special_enrollment",
      "section": "enrollment",
      "metric": "special_enrollment",
      "label": "Matrículas de especiais",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares."
    },
    {
      "id": "enrollment.published_enrollment_total",
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "label": "Total publicado de matrículas",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas."
    },
    {
      "id": "disciplines.courses",
      "section": "disciplines",
      "metric": "courses",
      "label": "Disciplinas oferecidas",
      "unit": "count",
      "semantic_note": "Contagem anual de códigos de disciplinas."
    },
    {
      "id": "disciplines.sections",
      "section": "disciplines",
      "metric": "sections",
      "label": "Turmas oferecidas",
      "unit": "count",
      "semantic_note": "Contagem anual de turmas oferecidas."
    },
    {
      "id": "disciplines.applications",
      "section": "disciplines",
      "metric": "applications",
      "label": "Inscrições em disciplinas",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas."
    },
    {
      "id": "disciplines.enrollments",
      "section": "disciplines",
      "metric": "enrollments",
      "label": "Matrículas em disciplinas",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas."
    },
    {
      "id": "disciplines.approvals",
      "section": "disciplines",
      "metric": "approvals",
      "label": "Aprovações em disciplinas",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas."
    },
    {
      "id": "disciplines.enrollments_per_section",
      "section": "disciplines",
      "metric": "enrollments_per_section",
      "label": "Matriculados por turma",
      "unit": "count",
      "semantic_note": "Total aproximado de matrículas dividido pelo número de turmas no ano; média ponderada, não média simples entre disciplinas."
    },
    {
      "id": "disciplines.approval_rate",
      "section": "disciplines",
      "metric": "approval_rate",
      "label": "Taxa agregada de aprovação",
      "unit": "ratio",
      "semantic_note": "Aprovações aproximadas divididas pelas matrículas aproximadas no ano. Valor armazenado como fração de 0 a 1."
    },
    {
      "id": "requested_2024_2025.nominal_class_hours",
      "section": "requested_2024_2025",
      "metric": "nominal_class_hours",
      "label": "Carga horária nominal de aulas",
      "unit": "hours",
      "semantic_note": "Carga nominal de aulas: (horas semanais teóricas + práticas) × semanas, somada por turma. Exclui estudos. Não mede horas efetivamente ministradas por docente. Componentes de versões atualizadas usam a hipótese autorizada de manutenção da carga entre versões."
    },
    {
      "id": "requested_2024_2025.sections",
      "section": "requested_2024_2025",
      "metric": "sections",
      "label": "Turmas de pós-graduação",
      "unit": "count",
      "semantic_note": "Número de ofertas/turmas no ano; uma disciplina pode ter mais de uma turma."
    },
    {
      "id": "requested_2024_2025.enrollments",
      "section": "requested_2024_2025",
      "metric": "enrollments",
      "label": "Matrículas em disciplinas",
      "unit": "count",
      "semantic_note": "Totais anuais calculados como número de turmas × média publicada de matriculados por disciplina. São vínculos estudante–turma, não pessoas distintas. A disponibilidade do total não implica conhecer a distribuição entre turmas."
    },
    {
      "id": "requested_2024_2025.sections_lt5",
      "section": "requested_2024_2025",
      "metric": "sections_lt5",
      "label": "Turmas com menos de 5 matriculados",
      "unit": "count",
      "semantic_note": "Contagem de turmas com 0 a 4 matriculados; exclui turmas com exatamente 5. ND quando a distribuição individual ainda não foi determinada."
    },
    {
      "id": "requested_2024_2025.sections_gt30",
      "section": "requested_2024_2025",
      "metric": "sections_gt30",
      "label": "Turmas com mais de 30 matriculados",
      "unit": "count",
      "semantic_note": "Contagem de turmas com pelo menos 31 matriculados; exclui turmas com exatamente 30. Não se reconstrói a distribuição individual a partir de desvio padrão."
    },
    {
      "id": "requested_2024_2025.active_april1",
      "section": "requested_2024_2025",
      "metric": "active_april1",
      "label": "Estudantes ativos em 1º de abril",
      "unit": "count",
      "semantic_note": "Posição em 1º de abril de cada ano, publicada no Janus. Doutorado inclui DO + DD. É uma contagem agregada publicada, sem auditoria nominal de duplicidades."
    },
    {
      "id": "requested_2024_2025.degrees",
      "section": "requested_2024_2025",
      "metric": "degrees",
      "label": "Diplomados",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano segundo o DataUSP. Doutorado inclui DO + DD."
    },
    {
      "id": "requested_2024_2025.credits_offered",
      "section": "requested_2024_2025",
      "metric": "credits_offered",
      "label": "Créditos das turmas oferecidas",
      "unit": "credits",
      "semantic_note": "Soma dos créditos das ofertas/turmas do ano; não multiplicada pelo número de alunos. Disciplinas repetidas em turmas distintas contribuem uma vez por turma."
    },
    {
      "id": "requested_2024_2025.curricular_hours",
      "section": "requested_2024_2025",
      "metric": "curricular_hours",
      "label": "Carga horária curricular total",
      "unit": "hours",
      "semantic_note": "Carga curricular total somada por turma, incluindo horas de estudos. Diferente de horas de aula e de carga docente efetiva."
    }
  ],
  "metrics": [
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2012,
      "program": "CC",
      "level": "ME",
      "value": 43,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D7"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2012,
      "program": "CC",
      "level": "DO",
      "value": 13,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E7"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2012,
      "program": "CC",
      "level": "DD",
      "value": 1,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F7"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2012,
      "program": "CC",
      "level": "DO_DD",
      "value": 14,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G7"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2012,
      "program": "CC",
      "level": "total",
      "value": 57,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H7"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2012,
      "program": "MPEM",
      "level": "ME",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D8"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2012,
      "program": "MPEM",
      "level": "DO",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E8"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2012,
      "program": "MPEM",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F8"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2012,
      "program": "MPEM",
      "level": "DO_DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G8"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2012,
      "program": "MPEM",
      "level": "total",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H8"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2012,
      "program": "MAT",
      "level": "ME",
      "value": 8,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D9"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2012,
      "program": "MAT",
      "level": "DO",
      "value": 18,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E9"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2012,
      "program": "MAT",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F9"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2012,
      "program": "MAT",
      "level": "DO_DD",
      "value": 18,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G9"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2012,
      "program": "MAT",
      "level": "total",
      "value": 26,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H9"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2012,
      "program": "MAP",
      "level": "ME",
      "value": 5,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D10"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2012,
      "program": "MAP",
      "level": "DO",
      "value": 7,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E10"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2012,
      "program": "MAP",
      "level": "DD",
      "value": 1,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F10"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2012,
      "program": "MAP",
      "level": "DO_DD",
      "value": 8,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G10"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2012,
      "program": "MAP",
      "level": "total",
      "value": 13,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H10"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2012,
      "program": "PE",
      "level": "ME",
      "value": 11,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D11"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2012,
      "program": "PE",
      "level": "DO",
      "value": 14,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E11"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2012,
      "program": "PE",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F11"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2012,
      "program": "PE",
      "level": "DO_DD",
      "value": 14,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G11"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2012,
      "program": "PE",
      "level": "total",
      "value": 25,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H11"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2013,
      "program": "CC",
      "level": "ME",
      "value": 44,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D12"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2013,
      "program": "CC",
      "level": "DO",
      "value": 8,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E12"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2013,
      "program": "CC",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F12"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2013,
      "program": "CC",
      "level": "DO_DD",
      "value": 8,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G12"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2013,
      "program": "CC",
      "level": "total",
      "value": 52,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H12"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2013,
      "program": "MPEM",
      "level": "ME",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D13"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2013,
      "program": "MPEM",
      "level": "DO",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E13"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2013,
      "program": "MPEM",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F13"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2013,
      "program": "MPEM",
      "level": "DO_DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G13"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2013,
      "program": "MPEM",
      "level": "total",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H13"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2013,
      "program": "MAT",
      "level": "ME",
      "value": 8,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D14"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2013,
      "program": "MAT",
      "level": "DO",
      "value": 11,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E14"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2013,
      "program": "MAT",
      "level": "DD",
      "value": 1,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F14"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2013,
      "program": "MAT",
      "level": "DO_DD",
      "value": 12,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G14"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2013,
      "program": "MAT",
      "level": "total",
      "value": 20,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H14"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2013,
      "program": "MAP",
      "level": "ME",
      "value": 5,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D15"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2013,
      "program": "MAP",
      "level": "DO",
      "value": 7,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E15"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2013,
      "program": "MAP",
      "level": "DD",
      "value": 1,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F15"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2013,
      "program": "MAP",
      "level": "DO_DD",
      "value": 8,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G15"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2013,
      "program": "MAP",
      "level": "total",
      "value": 13,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H15"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2013,
      "program": "PE",
      "level": "ME",
      "value": 18,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D16"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2013,
      "program": "PE",
      "level": "DO",
      "value": 11,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E16"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2013,
      "program": "PE",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F16"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2013,
      "program": "PE",
      "level": "DO_DD",
      "value": 11,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G16"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2013,
      "program": "PE",
      "level": "total",
      "value": 29,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H16"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2014,
      "program": "CC",
      "level": "ME",
      "value": 29,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D17"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2014,
      "program": "CC",
      "level": "DO",
      "value": 7,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E17"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2014,
      "program": "CC",
      "level": "DD",
      "value": 2,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F17"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2014,
      "program": "CC",
      "level": "DO_DD",
      "value": 9,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G17"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2014,
      "program": "CC",
      "level": "total",
      "value": 38,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H17"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2014,
      "program": "MPEM",
      "level": "ME",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D18"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2014,
      "program": "MPEM",
      "level": "DO",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E18"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2014,
      "program": "MPEM",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F18"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2014,
      "program": "MPEM",
      "level": "DO_DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G18"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2014,
      "program": "MPEM",
      "level": "total",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H18"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2014,
      "program": "MAT",
      "level": "ME",
      "value": 11,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D19"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2014,
      "program": "MAT",
      "level": "DO",
      "value": 13,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E19"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2014,
      "program": "MAT",
      "level": "DD",
      "value": 2,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F19"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2014,
      "program": "MAT",
      "level": "DO_DD",
      "value": 15,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G19"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2014,
      "program": "MAT",
      "level": "total",
      "value": 26,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H19"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2014,
      "program": "MAP",
      "level": "ME",
      "value": 5,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D20"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2014,
      "program": "MAP",
      "level": "DO",
      "value": 4,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E20"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2014,
      "program": "MAP",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F20"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2014,
      "program": "MAP",
      "level": "DO_DD",
      "value": 4,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G20"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2014,
      "program": "MAP",
      "level": "total",
      "value": 9,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H20"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2014,
      "program": "PE",
      "level": "ME",
      "value": 10,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D21"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2014,
      "program": "PE",
      "level": "DO",
      "value": 11,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E21"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2014,
      "program": "PE",
      "level": "DD",
      "value": 3,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F21"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2014,
      "program": "PE",
      "level": "DO_DD",
      "value": 14,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G21"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2014,
      "program": "PE",
      "level": "total",
      "value": 24,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H21"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2015,
      "program": "CC",
      "level": "ME",
      "value": 28,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D22"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2015,
      "program": "CC",
      "level": "DO",
      "value": 12,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E22"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2015,
      "program": "CC",
      "level": "DD",
      "value": 1,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F22"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2015,
      "program": "CC",
      "level": "DO_DD",
      "value": 13,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G22"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2015,
      "program": "CC",
      "level": "total",
      "value": 41,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H22"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2015,
      "program": "MPEM",
      "level": "ME",
      "value": 3,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D23"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2015,
      "program": "MPEM",
      "level": "DO",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E23"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2015,
      "program": "MPEM",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F23"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2015,
      "program": "MPEM",
      "level": "DO_DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G23"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2015,
      "program": "MPEM",
      "level": "total",
      "value": 3,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H23"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2015,
      "program": "MAT",
      "level": "ME",
      "value": 17,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D24"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2015,
      "program": "MAT",
      "level": "DO",
      "value": 12,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E24"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2015,
      "program": "MAT",
      "level": "DD",
      "value": 1,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F24"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2015,
      "program": "MAT",
      "level": "DO_DD",
      "value": 13,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G24"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2015,
      "program": "MAT",
      "level": "total",
      "value": 30,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H24"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2015,
      "program": "MAP",
      "level": "ME",
      "value": 11,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D25"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2015,
      "program": "MAP",
      "level": "DO",
      "value": 11,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E25"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2015,
      "program": "MAP",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F25"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2015,
      "program": "MAP",
      "level": "DO_DD",
      "value": 11,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G25"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2015,
      "program": "MAP",
      "level": "total",
      "value": 22,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H25"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2015,
      "program": "PE",
      "level": "ME",
      "value": 13,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D26"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2015,
      "program": "PE",
      "level": "DO",
      "value": 13,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E26"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2015,
      "program": "PE",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F26"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2015,
      "program": "PE",
      "level": "DO_DD",
      "value": 13,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G26"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2015,
      "program": "PE",
      "level": "total",
      "value": 26,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H26"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2016,
      "program": "CC",
      "level": "ME",
      "value": 20,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D27"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2016,
      "program": "CC",
      "level": "DO",
      "value": 26,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E27"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2016,
      "program": "CC",
      "level": "DD",
      "value": 1,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F27"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2016,
      "program": "CC",
      "level": "DO_DD",
      "value": 27,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G27"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2016,
      "program": "CC",
      "level": "total",
      "value": 47,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H27"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2016,
      "program": "MPEM",
      "level": "ME",
      "value": 16,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D28"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2016,
      "program": "MPEM",
      "level": "DO",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E28"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2016,
      "program": "MPEM",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F28"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2016,
      "program": "MPEM",
      "level": "DO_DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G28"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2016,
      "program": "MPEM",
      "level": "total",
      "value": 16,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H28"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2016,
      "program": "MAT",
      "level": "ME",
      "value": 9,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D29"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2016,
      "program": "MAT",
      "level": "DO",
      "value": 15,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E29"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2016,
      "program": "MAT",
      "level": "DD",
      "value": 2,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F29"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2016,
      "program": "MAT",
      "level": "DO_DD",
      "value": 17,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G29"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2016,
      "program": "MAT",
      "level": "total",
      "value": 26,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H29"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2016,
      "program": "MAP",
      "level": "ME",
      "value": 10,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D30"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2016,
      "program": "MAP",
      "level": "DO",
      "value": 7,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E30"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2016,
      "program": "MAP",
      "level": "DD",
      "value": 1,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F30"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2016,
      "program": "MAP",
      "level": "DO_DD",
      "value": 8,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G30"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2016,
      "program": "MAP",
      "level": "total",
      "value": 18,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H30"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2016,
      "program": "PE",
      "level": "ME",
      "value": 14,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D31"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2016,
      "program": "PE",
      "level": "DO",
      "value": 12,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E31"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2016,
      "program": "PE",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F31"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2016,
      "program": "PE",
      "level": "DO_DD",
      "value": 12,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G31"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2016,
      "program": "PE",
      "level": "total",
      "value": 26,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H31"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2017,
      "program": "CC",
      "level": "ME",
      "value": 36,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D32"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2017,
      "program": "CC",
      "level": "DO",
      "value": 14,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E32"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2017,
      "program": "CC",
      "level": "DD",
      "value": 4,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F32"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2017,
      "program": "CC",
      "level": "DO_DD",
      "value": 18,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G32"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2017,
      "program": "CC",
      "level": "total",
      "value": 54,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H32"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2017,
      "program": "MPEM",
      "level": "ME",
      "value": 13,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D33"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2017,
      "program": "MPEM",
      "level": "DO",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E33"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2017,
      "program": "MPEM",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F33"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2017,
      "program": "MPEM",
      "level": "DO_DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G33"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2017,
      "program": "MPEM",
      "level": "total",
      "value": 13,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H33"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2017,
      "program": "MAT",
      "level": "ME",
      "value": 11,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D34"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2017,
      "program": "MAT",
      "level": "DO",
      "value": 13,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E34"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2017,
      "program": "MAT",
      "level": "DD",
      "value": 4,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F34"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2017,
      "program": "MAT",
      "level": "DO_DD",
      "value": 17,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G34"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2017,
      "program": "MAT",
      "level": "total",
      "value": 28,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H34"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2017,
      "program": "MAP",
      "level": "ME",
      "value": 8,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D35"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2017,
      "program": "MAP",
      "level": "DO",
      "value": 3,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E35"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2017,
      "program": "MAP",
      "level": "DD",
      "value": 1,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F35"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2017,
      "program": "MAP",
      "level": "DO_DD",
      "value": 4,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G35"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2017,
      "program": "MAP",
      "level": "total",
      "value": 12,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H35"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2017,
      "program": "PE",
      "level": "ME",
      "value": 9,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D36"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2017,
      "program": "PE",
      "level": "DO",
      "value": 14,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E36"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2017,
      "program": "PE",
      "level": "DD",
      "value": 2,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F36"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2017,
      "program": "PE",
      "level": "DO_DD",
      "value": 16,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G36"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2017,
      "program": "PE",
      "level": "total",
      "value": 25,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H36"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2018,
      "program": "CC",
      "level": "ME",
      "value": 22,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D37"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2018,
      "program": "CC",
      "level": "DO",
      "value": 15,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E37"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2018,
      "program": "CC",
      "level": "DD",
      "value": 2,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F37"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2018,
      "program": "CC",
      "level": "DO_DD",
      "value": 17,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G37"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2018,
      "program": "CC",
      "level": "total",
      "value": 39,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H37"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2018,
      "program": "MPEM",
      "level": "ME",
      "value": 6,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D38"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2018,
      "program": "MPEM",
      "level": "DO",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E38"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2018,
      "program": "MPEM",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F38"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2018,
      "program": "MPEM",
      "level": "DO_DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G38"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2018,
      "program": "MPEM",
      "level": "total",
      "value": 6,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H38"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2018,
      "program": "MAT",
      "level": "ME",
      "value": 10,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D39"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2018,
      "program": "MAT",
      "level": "DO",
      "value": 10,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E39"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2018,
      "program": "MAT",
      "level": "DD",
      "value": 7,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F39"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2018,
      "program": "MAT",
      "level": "DO_DD",
      "value": 17,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G39"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2018,
      "program": "MAT",
      "level": "total",
      "value": 27,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H39"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2018,
      "program": "MAP",
      "level": "ME",
      "value": 7,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D40"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2018,
      "program": "MAP",
      "level": "DO",
      "value": 7,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E40"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2018,
      "program": "MAP",
      "level": "DD",
      "value": 1,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F40"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2018,
      "program": "MAP",
      "level": "DO_DD",
      "value": 8,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G40"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2018,
      "program": "MAP",
      "level": "total",
      "value": 15,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H40"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2018,
      "program": "PE",
      "level": "ME",
      "value": 5,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D41"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2018,
      "program": "PE",
      "level": "DO",
      "value": 12,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E41"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2018,
      "program": "PE",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F41"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2018,
      "program": "PE",
      "level": "DO_DD",
      "value": 12,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G41"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2018,
      "program": "PE",
      "level": "total",
      "value": 17,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H41"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2019,
      "program": "CC",
      "level": "ME",
      "value": 22,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D42"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2019,
      "program": "CC",
      "level": "DO",
      "value": 10,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E42"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2019,
      "program": "CC",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F42"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2019,
      "program": "CC",
      "level": "DO_DD",
      "value": 10,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G42"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2019,
      "program": "CC",
      "level": "total",
      "value": 32,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H42"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2019,
      "program": "MPEM",
      "level": "ME",
      "value": 12,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D43"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2019,
      "program": "MPEM",
      "level": "DO",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E43"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2019,
      "program": "MPEM",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F43"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2019,
      "program": "MPEM",
      "level": "DO_DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G43"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2019,
      "program": "MPEM",
      "level": "total",
      "value": 12,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H43"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2019,
      "program": "MAT",
      "level": "ME",
      "value": 22,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D44"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2019,
      "program": "MAT",
      "level": "DO",
      "value": 9,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E44"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2019,
      "program": "MAT",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F44"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2019,
      "program": "MAT",
      "level": "DO_DD",
      "value": 9,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G44"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2019,
      "program": "MAT",
      "level": "total",
      "value": 31,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H44"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2019,
      "program": "MAP",
      "level": "ME",
      "value": 9,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D45"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2019,
      "program": "MAP",
      "level": "DO",
      "value": 8,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E45"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2019,
      "program": "MAP",
      "level": "DD",
      "value": 2,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F45"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2019,
      "program": "MAP",
      "level": "DO_DD",
      "value": 10,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G45"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2019,
      "program": "MAP",
      "level": "total",
      "value": 19,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H45"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2019,
      "program": "PE",
      "level": "ME",
      "value": 15,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D46"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2019,
      "program": "PE",
      "level": "DO",
      "value": 16,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E46"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2019,
      "program": "PE",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F46"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2019,
      "program": "PE",
      "level": "DO_DD",
      "value": 16,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G46"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2019,
      "program": "PE",
      "level": "total",
      "value": 31,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H46"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2020,
      "program": "CC",
      "level": "ME",
      "value": 13,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D47"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2020,
      "program": "CC",
      "level": "DO",
      "value": 11,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E47"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2020,
      "program": "CC",
      "level": "DD",
      "value": 1,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F47"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2020,
      "program": "CC",
      "level": "DO_DD",
      "value": 12,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G47"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2020,
      "program": "CC",
      "level": "total",
      "value": 25,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H47"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2020,
      "program": "MPEM",
      "level": "ME",
      "value": 5,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D48"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2020,
      "program": "MPEM",
      "level": "DO",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E48"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2020,
      "program": "MPEM",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F48"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2020,
      "program": "MPEM",
      "level": "DO_DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G48"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2020,
      "program": "MPEM",
      "level": "total",
      "value": 5,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H48"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2020,
      "program": "MAT",
      "level": "ME",
      "value": 10,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D49"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2020,
      "program": "MAT",
      "level": "DO",
      "value": 11,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E49"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2020,
      "program": "MAT",
      "level": "DD",
      "value": 1,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F49"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2020,
      "program": "MAT",
      "level": "DO_DD",
      "value": 12,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G49"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2020,
      "program": "MAT",
      "level": "total",
      "value": 22,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H49"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2020,
      "program": "MAP",
      "level": "ME",
      "value": 7,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D50"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2020,
      "program": "MAP",
      "level": "DO",
      "value": 6,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E50"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2020,
      "program": "MAP",
      "level": "DD",
      "value": 1,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F50"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2020,
      "program": "MAP",
      "level": "DO_DD",
      "value": 7,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G50"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2020,
      "program": "MAP",
      "level": "total",
      "value": 14,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H50"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2020,
      "program": "PE",
      "level": "ME",
      "value": 11,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D51"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2020,
      "program": "PE",
      "level": "DO",
      "value": 8,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E51"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2020,
      "program": "PE",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F51"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2020,
      "program": "PE",
      "level": "DO_DD",
      "value": 8,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G51"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2020,
      "program": "PE",
      "level": "total",
      "value": 19,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H51"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2021,
      "program": "CC",
      "level": "ME",
      "value": 23,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D52"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2021,
      "program": "CC",
      "level": "DO",
      "value": 11,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E52"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2021,
      "program": "CC",
      "level": "DD",
      "value": 3,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F52"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2021,
      "program": "CC",
      "level": "DO_DD",
      "value": 14,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G52"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2021,
      "program": "CC",
      "level": "total",
      "value": 37,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H52"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2021,
      "program": "MPEM",
      "level": "ME",
      "value": 1,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D53"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2021,
      "program": "MPEM",
      "level": "DO",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E53"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2021,
      "program": "MPEM",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F53"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2021,
      "program": "MPEM",
      "level": "DO_DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G53"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2021,
      "program": "MPEM",
      "level": "total",
      "value": 1,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H53"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2021,
      "program": "MAT",
      "level": "ME",
      "value": 8,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D54"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2021,
      "program": "MAT",
      "level": "DO",
      "value": 10,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E54"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2021,
      "program": "MAT",
      "level": "DD",
      "value": 1,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F54"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2021,
      "program": "MAT",
      "level": "DO_DD",
      "value": 11,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G54"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2021,
      "program": "MAT",
      "level": "total",
      "value": 19,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H54"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2021,
      "program": "MAP",
      "level": "ME",
      "value": 7,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D55"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2021,
      "program": "MAP",
      "level": "DO",
      "value": 8,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E55"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2021,
      "program": "MAP",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F55"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2021,
      "program": "MAP",
      "level": "DO_DD",
      "value": 8,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G55"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2021,
      "program": "MAP",
      "level": "total",
      "value": 15,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H55"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2021,
      "program": "PE",
      "level": "ME",
      "value": 14,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D56"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2021,
      "program": "PE",
      "level": "DO",
      "value": 7,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E56"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2021,
      "program": "PE",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F56"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2021,
      "program": "PE",
      "level": "DO_DD",
      "value": 7,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G56"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2021,
      "program": "PE",
      "level": "total",
      "value": 21,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H56"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2022,
      "program": "CC",
      "level": "ME",
      "value": 19,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D57"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2022,
      "program": "CC",
      "level": "DO",
      "value": 4,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E57"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2022,
      "program": "CC",
      "level": "DD",
      "value": 1,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F57"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2022,
      "program": "CC",
      "level": "DO_DD",
      "value": 5,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G57"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2022,
      "program": "CC",
      "level": "total",
      "value": 24,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H57"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2022,
      "program": "MPEM",
      "level": "ME",
      "value": 4,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D58"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2022,
      "program": "MPEM",
      "level": "DO",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E58"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2022,
      "program": "MPEM",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F58"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2022,
      "program": "MPEM",
      "level": "DO_DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G58"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2022,
      "program": "MPEM",
      "level": "total",
      "value": 4,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H58"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2022,
      "program": "MAT",
      "level": "ME",
      "value": 6,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D59"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2022,
      "program": "MAT",
      "level": "DO",
      "value": 9,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E59"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2022,
      "program": "MAT",
      "level": "DD",
      "value": 1,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F59"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2022,
      "program": "MAT",
      "level": "DO_DD",
      "value": 10,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G59"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2022,
      "program": "MAT",
      "level": "total",
      "value": 16,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H59"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2022,
      "program": "MAP",
      "level": "ME",
      "value": 5,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D60"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2022,
      "program": "MAP",
      "level": "DO",
      "value": 3,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E60"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2022,
      "program": "MAP",
      "level": "DD",
      "value": 2,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F60"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2022,
      "program": "MAP",
      "level": "DO_DD",
      "value": 5,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G60"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2022,
      "program": "MAP",
      "level": "total",
      "value": 10,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H60"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2022,
      "program": "PE",
      "level": "ME",
      "value": 7,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D61"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2022,
      "program": "PE",
      "level": "DO",
      "value": 6,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E61"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2022,
      "program": "PE",
      "level": "DD",
      "value": 1,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F61"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2022,
      "program": "PE",
      "level": "DO_DD",
      "value": 7,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G61"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2022,
      "program": "PE",
      "level": "total",
      "value": 14,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H61"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2023,
      "program": "CC",
      "level": "ME",
      "value": 23,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D62"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2023,
      "program": "CC",
      "level": "DO",
      "value": 14,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E62"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2023,
      "program": "CC",
      "level": "DD",
      "value": 2,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F62"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2023,
      "program": "CC",
      "level": "DO_DD",
      "value": 16,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G62"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2023,
      "program": "CC",
      "level": "total",
      "value": 39,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H62"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2023,
      "program": "MPEM",
      "level": "ME",
      "value": 12,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D63"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2023,
      "program": "MPEM",
      "level": "DO",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E63"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2023,
      "program": "MPEM",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F63"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2023,
      "program": "MPEM",
      "level": "DO_DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G63"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2023,
      "program": "MPEM",
      "level": "total",
      "value": 12,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H63"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2023,
      "program": "MAT",
      "level": "ME",
      "value": 14,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D64"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2023,
      "program": "MAT",
      "level": "DO",
      "value": 15,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E64"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2023,
      "program": "MAT",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F64"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2023,
      "program": "MAT",
      "level": "DO_DD",
      "value": 15,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G64"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2023,
      "program": "MAT",
      "level": "total",
      "value": 29,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H64"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2023,
      "program": "MAP",
      "level": "ME",
      "value": 9,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D65"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2023,
      "program": "MAP",
      "level": "DO",
      "value": 6,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E65"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2023,
      "program": "MAP",
      "level": "DD",
      "value": 2,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F65"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2023,
      "program": "MAP",
      "level": "DO_DD",
      "value": 8,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G65"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2023,
      "program": "MAP",
      "level": "total",
      "value": 17,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H65"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2023,
      "program": "PE",
      "level": "ME",
      "value": 6,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D66"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2023,
      "program": "PE",
      "level": "DO",
      "value": 7,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E66"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2023,
      "program": "PE",
      "level": "DD",
      "value": 1,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F66"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2023,
      "program": "PE",
      "level": "DO_DD",
      "value": 8,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G66"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2023,
      "program": "PE",
      "level": "total",
      "value": 14,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H66"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2024,
      "program": "CC",
      "level": "ME",
      "value": 23,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D67"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2024,
      "program": "CC",
      "level": "DO",
      "value": 6,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E67"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2024,
      "program": "CC",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F67"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2024,
      "program": "CC",
      "level": "DO_DD",
      "value": 6,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G67"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2024,
      "program": "CC",
      "level": "total",
      "value": 29,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H67"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2024,
      "program": "MPEM",
      "level": "ME",
      "value": 18,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D68"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2024,
      "program": "MPEM",
      "level": "DO",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E68"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2024,
      "program": "MPEM",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F68"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2024,
      "program": "MPEM",
      "level": "DO_DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G68"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2024,
      "program": "MPEM",
      "level": "total",
      "value": 18,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H68"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2024,
      "program": "MAT",
      "level": "ME",
      "value": 15,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D69"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2024,
      "program": "MAT",
      "level": "DO",
      "value": 13,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E69"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2024,
      "program": "MAT",
      "level": "DD",
      "value": 1,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F69"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2024,
      "program": "MAT",
      "level": "DO_DD",
      "value": 14,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G69"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2024,
      "program": "MAT",
      "level": "total",
      "value": 29,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H69"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2024,
      "program": "MAP",
      "level": "ME",
      "value": 6,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D70"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2024,
      "program": "MAP",
      "level": "DO",
      "value": 12,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E70"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2024,
      "program": "MAP",
      "level": "DD",
      "value": 3,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F70"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2024,
      "program": "MAP",
      "level": "DO_DD",
      "value": 15,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G70"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2024,
      "program": "MAP",
      "level": "total",
      "value": 21,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H70"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2024,
      "program": "PE",
      "level": "ME",
      "value": 7,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D71"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2024,
      "program": "PE",
      "level": "DO",
      "value": 9,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E71"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2024,
      "program": "PE",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F71"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2024,
      "program": "PE",
      "level": "DO_DD",
      "value": 9,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G71"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2024,
      "program": "PE",
      "level": "total",
      "value": 16,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H71"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2025,
      "program": "CC",
      "level": "ME",
      "value": 39,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D72"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2025,
      "program": "CC",
      "level": "DO",
      "value": 9,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E72"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2025,
      "program": "CC",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F72"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2025,
      "program": "CC",
      "level": "DO_DD",
      "value": 9,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G72"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2025,
      "program": "CC",
      "level": "total",
      "value": 48,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H72"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2025,
      "program": "MPEM",
      "level": "ME",
      "value": 16,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D73"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2025,
      "program": "MPEM",
      "level": "DO",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E73"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2025,
      "program": "MPEM",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F73"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2025,
      "program": "MPEM",
      "level": "DO_DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G73"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2025,
      "program": "MPEM",
      "level": "total",
      "value": 16,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H73"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2025,
      "program": "MAT",
      "level": "ME",
      "value": 16,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D74"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2025,
      "program": "MAT",
      "level": "DO",
      "value": 8,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E74"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2025,
      "program": "MAT",
      "level": "DD",
      "value": 1,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F74"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2025,
      "program": "MAT",
      "level": "DO_DD",
      "value": 9,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G74"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2025,
      "program": "MAT",
      "level": "total",
      "value": 25,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H74"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2025,
      "program": "MAP",
      "level": "ME",
      "value": 10,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D75"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2025,
      "program": "MAP",
      "level": "DO",
      "value": 7,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E75"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2025,
      "program": "MAP",
      "level": "DD",
      "value": 1,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F75"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2025,
      "program": "MAP",
      "level": "DO_DD",
      "value": 8,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G75"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2025,
      "program": "MAP",
      "level": "total",
      "value": 18,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H75"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2025,
      "program": "PE",
      "level": "ME",
      "value": 10,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "D76"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2025,
      "program": "PE",
      "level": "DO",
      "value": 10,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "E76"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2025,
      "program": "PE",
      "level": "DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "F76"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2025,
      "program": "PE",
      "level": "DO_DD",
      "value": 10,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "G76"
      }
    },
    {
      "section": "degrees",
      "metric": "degrees",
      "year": 2025,
      "program": "PE",
      "level": "total",
      "value": 20,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano, segundo o DataUSP. Doutorado agregado corresponde a DO + DD; não é contagem de ingressantes.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "H76"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2012,
      "program": "CC",
      "level": "ME",
      "value": 176,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D7"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2012,
      "program": "CC",
      "level": "DO",
      "value": 115,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E7"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2012,
      "program": "CC",
      "level": "total",
      "value": 291,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H7"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2012,
      "program": "CC",
      "level": null,
      "value": 26,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F7"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2012,
      "program": "CC",
      "level": "total",
      "value": 317,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G7"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2012,
      "program": "MPEM",
      "level": "ME",
      "value": 12,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D8"
      },
      "qualifiers": [
        "Primeiro ano do MPEM, iniciado em agosto de 2012."
      ]
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2012,
      "program": "MPEM",
      "level": "DO",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E8"
      },
      "qualifiers": [
        "Primeiro ano do MPEM, iniciado em agosto de 2012."
      ]
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2012,
      "program": "MPEM",
      "level": "total",
      "value": 12,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H8"
      },
      "qualifiers": [
        "Primeiro ano do MPEM, iniciado em agosto de 2012."
      ]
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2012,
      "program": "MPEM",
      "level": null,
      "value": 2,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F8"
      },
      "qualifiers": [
        "Primeiro ano do MPEM, iniciado em agosto de 2012."
      ]
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2012,
      "program": "MPEM",
      "level": "total",
      "value": 14,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G8"
      },
      "qualifiers": [
        "Primeiro ano do MPEM, iniciado em agosto de 2012."
      ]
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2012,
      "program": "MAT",
      "level": "ME",
      "value": 40,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D9"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2012,
      "program": "MAT",
      "level": "DO",
      "value": 93,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E9"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2012,
      "program": "MAT",
      "level": "total",
      "value": 133,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H9"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2012,
      "program": "MAT",
      "level": null,
      "value": 41,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F9"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2012,
      "program": "MAT",
      "level": "total",
      "value": 174,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G9"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2012,
      "program": "MAP",
      "level": "ME",
      "value": 36,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D10"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2012,
      "program": "MAP",
      "level": "DO",
      "value": 51,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E10"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2012,
      "program": "MAP",
      "level": "total",
      "value": 87,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H10"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2012,
      "program": "MAP",
      "level": null,
      "value": 28,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F10"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2012,
      "program": "MAP",
      "level": "total",
      "value": 115,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G10"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2012,
      "program": "PE",
      "level": "ME",
      "value": 54,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D11"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2012,
      "program": "PE",
      "level": "DO",
      "value": 71,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E11"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2012,
      "program": "PE",
      "level": "total",
      "value": 125,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H11"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2012,
      "program": "PE",
      "level": null,
      "value": 22,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F11"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2012,
      "program": "PE",
      "level": "total",
      "value": 147,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G11"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2013,
      "program": "CC",
      "level": "ME",
      "value": 153,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D12"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2013,
      "program": "CC",
      "level": "DO",
      "value": 107,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E12"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2013,
      "program": "CC",
      "level": "total",
      "value": 260,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H12"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2013,
      "program": "CC",
      "level": null,
      "value": 28,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F12"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2013,
      "program": "CC",
      "level": "total",
      "value": 288,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G12"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2013,
      "program": "MPEM",
      "level": "ME",
      "value": 35,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D13"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2013,
      "program": "MPEM",
      "level": "DO",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E13"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2013,
      "program": "MPEM",
      "level": "total",
      "value": 35,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H13"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2013,
      "program": "MPEM",
      "level": null,
      "value": 11,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F13"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2013,
      "program": "MPEM",
      "level": "total",
      "value": 46,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G13"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2013,
      "program": "MAT",
      "level": "ME",
      "value": 46,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D14"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2013,
      "program": "MAT",
      "level": "DO",
      "value": 85,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E14"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2013,
      "program": "MAT",
      "level": "total",
      "value": 131,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H14"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2013,
      "program": "MAT",
      "level": null,
      "value": 36,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F14"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2013,
      "program": "MAT",
      "level": "total",
      "value": 167,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G14"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2013,
      "program": "MAP",
      "level": "ME",
      "value": 43,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D15"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2013,
      "program": "MAP",
      "level": "DO",
      "value": 49,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E15"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2013,
      "program": "MAP",
      "level": "total",
      "value": 92,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H15"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2013,
      "program": "MAP",
      "level": null,
      "value": 11,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F15"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2013,
      "program": "MAP",
      "level": "total",
      "value": 103,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G15"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2013,
      "program": "PE",
      "level": "ME",
      "value": 56,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D16"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2013,
      "program": "PE",
      "level": "DO",
      "value": 73,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E16"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2013,
      "program": "PE",
      "level": "total",
      "value": 129,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H16"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2013,
      "program": "PE",
      "level": null,
      "value": 23,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F16"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2013,
      "program": "PE",
      "level": "total",
      "value": 152,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G16"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2014,
      "program": "CC",
      "level": "ME",
      "value": 137,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D17"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2014,
      "program": "CC",
      "level": "DO",
      "value": 108,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E17"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2014,
      "program": "CC",
      "level": "total",
      "value": 245,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H17"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2014,
      "program": "CC",
      "level": null,
      "value": 22,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F17"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2014,
      "program": "CC",
      "level": "total",
      "value": 267,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G17"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2014,
      "program": "MPEM",
      "level": "ME",
      "value": 53,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D18"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2014,
      "program": "MPEM",
      "level": "DO",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E18"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2014,
      "program": "MPEM",
      "level": "total",
      "value": 53,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H18"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2014,
      "program": "MPEM",
      "level": null,
      "value": 4,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F18"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2014,
      "program": "MPEM",
      "level": "total",
      "value": 57,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G18"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2014,
      "program": "MAT",
      "level": "ME",
      "value": 41,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D19"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2014,
      "program": "MAT",
      "level": "DO",
      "value": 86,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E19"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2014,
      "program": "MAT",
      "level": "total",
      "value": 127,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H19"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2014,
      "program": "MAT",
      "level": null,
      "value": 32,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F19"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2014,
      "program": "MAT",
      "level": "total",
      "value": 159,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G19"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2014,
      "program": "MAP",
      "level": "ME",
      "value": 42,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D20"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2014,
      "program": "MAP",
      "level": "DO",
      "value": 47,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E20"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2014,
      "program": "MAP",
      "level": "total",
      "value": 89,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H20"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2014,
      "program": "MAP",
      "level": null,
      "value": 18,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F20"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2014,
      "program": "MAP",
      "level": "total",
      "value": 107,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G20"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2014,
      "program": "PE",
      "level": "ME",
      "value": 51,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D21"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2014,
      "program": "PE",
      "level": "DO",
      "value": 81,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E21"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2014,
      "program": "PE",
      "level": "total",
      "value": 132,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H21"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2014,
      "program": "PE",
      "level": null,
      "value": 18,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F21"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2014,
      "program": "PE",
      "level": "total",
      "value": 150,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G21"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2015,
      "program": "CC",
      "level": "ME",
      "value": 114,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D22"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2015,
      "program": "CC",
      "level": "DO",
      "value": 114,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E22"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2015,
      "program": "CC",
      "level": "total",
      "value": 228,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H22"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2015,
      "program": "CC",
      "level": null,
      "value": 47,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F22"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2015,
      "program": "CC",
      "level": "total",
      "value": 275,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G22"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2015,
      "program": "MPEM",
      "level": "ME",
      "value": 53,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D23"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2015,
      "program": "MPEM",
      "level": "DO",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E23"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2015,
      "program": "MPEM",
      "level": "total",
      "value": 53,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H23"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2015,
      "program": "MPEM",
      "level": null,
      "value": 11,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F23"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2015,
      "program": "MPEM",
      "level": "total",
      "value": 64,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G23"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2015,
      "program": "MAT",
      "level": "ME",
      "value": 45,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D24"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2015,
      "program": "MAT",
      "level": "DO",
      "value": 92,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E24"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2015,
      "program": "MAT",
      "level": "total",
      "value": 137,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H24"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2015,
      "program": "MAT",
      "level": null,
      "value": 47,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F24"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2015,
      "program": "MAT",
      "level": "total",
      "value": 184,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G24"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2015,
      "program": "MAP",
      "level": "ME",
      "value": 49,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D25"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2015,
      "program": "MAP",
      "level": "DO",
      "value": 53,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E25"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2015,
      "program": "MAP",
      "level": "total",
      "value": 102,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H25"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2015,
      "program": "MAP",
      "level": null,
      "value": 27,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F25"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2015,
      "program": "MAP",
      "level": "total",
      "value": 129,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G25"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2015,
      "program": "PE",
      "level": "ME",
      "value": 47,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D26"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2015,
      "program": "PE",
      "level": "DO",
      "value": 81,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E26"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2015,
      "program": "PE",
      "level": "total",
      "value": 128,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H26"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2015,
      "program": "PE",
      "level": null,
      "value": 39,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F26"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2015,
      "program": "PE",
      "level": "total",
      "value": 167,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G26"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2016,
      "program": "CC",
      "level": "ME",
      "value": 113,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D27"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2016,
      "program": "CC",
      "level": "DO",
      "value": 120,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E27"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2016,
      "program": "CC",
      "level": "total",
      "value": 233,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H27"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2016,
      "program": "CC",
      "level": null,
      "value": 81,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F27"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2016,
      "program": "CC",
      "level": "total",
      "value": 314,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G27"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2016,
      "program": "MPEM",
      "level": "ME",
      "value": 68,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D28"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2016,
      "program": "MPEM",
      "level": "DO",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E28"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2016,
      "program": "MPEM",
      "level": "total",
      "value": 68,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H28"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2016,
      "program": "MPEM",
      "level": null,
      "value": 18,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F28"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2016,
      "program": "MPEM",
      "level": "total",
      "value": 86,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G28"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2016,
      "program": "MAT",
      "level": "ME",
      "value": 44,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D29"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2016,
      "program": "MAT",
      "level": "DO",
      "value": 90,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E29"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2016,
      "program": "MAT",
      "level": "total",
      "value": 134,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H29"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2016,
      "program": "MAT",
      "level": null,
      "value": 43,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F29"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2016,
      "program": "MAT",
      "level": "total",
      "value": 177,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G29"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2016,
      "program": "MAP",
      "level": "ME",
      "value": 49,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D30"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2016,
      "program": "MAP",
      "level": "DO",
      "value": 49,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E30"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2016,
      "program": "MAP",
      "level": "total",
      "value": 98,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H30"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2016,
      "program": "MAP",
      "level": null,
      "value": 28,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F30"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2016,
      "program": "MAP",
      "level": "total",
      "value": 126,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G30"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2016,
      "program": "PE",
      "level": "ME",
      "value": 40,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D31"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2016,
      "program": "PE",
      "level": "DO",
      "value": 80,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E31"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2016,
      "program": "PE",
      "level": "total",
      "value": 120,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H31"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2016,
      "program": "PE",
      "level": null,
      "value": 46,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F31"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2016,
      "program": "PE",
      "level": "total",
      "value": 166,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G31"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2017,
      "program": "CC",
      "level": "ME",
      "value": 130,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D32"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2017,
      "program": "CC",
      "level": "DO",
      "value": 108,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E32"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2017,
      "program": "CC",
      "level": "total",
      "value": 238,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H32"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2017,
      "program": "CC",
      "level": null,
      "value": 64,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F32"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2017,
      "program": "CC",
      "level": "total",
      "value": 302,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G32"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2017,
      "program": "MPEM",
      "level": "ME",
      "value": 69,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D33"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2017,
      "program": "MPEM",
      "level": "DO",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E33"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2017,
      "program": "MPEM",
      "level": "total",
      "value": 69,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H33"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2017,
      "program": "MPEM",
      "level": null,
      "value": 20,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F33"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2017,
      "program": "MPEM",
      "level": "total",
      "value": 89,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G33"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2017,
      "program": "MAT",
      "level": "ME",
      "value": 52,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D34"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2017,
      "program": "MAT",
      "level": "DO",
      "value": 88,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E34"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2017,
      "program": "MAT",
      "level": "total",
      "value": 140,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H34"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2017,
      "program": "MAT",
      "level": null,
      "value": 35,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F34"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2017,
      "program": "MAT",
      "level": "total",
      "value": 175,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G34"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2017,
      "program": "MAP",
      "level": "ME",
      "value": 44,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D35"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2017,
      "program": "MAP",
      "level": "DO",
      "value": 53,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E35"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2017,
      "program": "MAP",
      "level": "total",
      "value": 97,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H35"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2017,
      "program": "MAP",
      "level": null,
      "value": 31,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F35"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2017,
      "program": "MAP",
      "level": "total",
      "value": 128,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G35"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2017,
      "program": "PE",
      "level": "ME",
      "value": 42,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D36"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2017,
      "program": "PE",
      "level": "DO",
      "value": 75,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E36"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2017,
      "program": "PE",
      "level": "total",
      "value": 117,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H36"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2017,
      "program": "PE",
      "level": null,
      "value": 37,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F36"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2017,
      "program": "PE",
      "level": "total",
      "value": 154,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G36"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2018,
      "program": "CC",
      "level": "ME",
      "value": 130,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D37"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2018,
      "program": "CC",
      "level": "DO",
      "value": 101,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E37"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2018,
      "program": "CC",
      "level": "total",
      "value": 231,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H37"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2018,
      "program": "CC",
      "level": null,
      "value": 121,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F37"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2018,
      "program": "CC",
      "level": "total",
      "value": 352,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G37"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2018,
      "program": "MPEM",
      "level": "ME",
      "value": 68,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D38"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2018,
      "program": "MPEM",
      "level": "DO",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E38"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2018,
      "program": "MPEM",
      "level": "total",
      "value": 68,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H38"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2018,
      "program": "MPEM",
      "level": null,
      "value": 30,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F38"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2018,
      "program": "MPEM",
      "level": "total",
      "value": 98,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G38"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2018,
      "program": "MAT",
      "level": "ME",
      "value": 49,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D39"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2018,
      "program": "MAT",
      "level": "DO",
      "value": 87,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E39"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2018,
      "program": "MAT",
      "level": "total",
      "value": 136,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H39"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2018,
      "program": "MAT",
      "level": null,
      "value": 38,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F39"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2018,
      "program": "MAT",
      "level": "total",
      "value": 174,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G39"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2018,
      "program": "MAP",
      "level": "ME",
      "value": 46,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D40"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2018,
      "program": "MAP",
      "level": "DO",
      "value": 61,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E40"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2018,
      "program": "MAP",
      "level": "total",
      "value": 107,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H40"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2018,
      "program": "MAP",
      "level": null,
      "value": 64,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F40"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2018,
      "program": "MAP",
      "level": "total",
      "value": 171,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G40"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2018,
      "program": "PE",
      "level": "ME",
      "value": 44,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D41"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2018,
      "program": "PE",
      "level": "DO",
      "value": 68,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E41"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2018,
      "program": "PE",
      "level": "total",
      "value": 112,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H41"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2018,
      "program": "PE",
      "level": null,
      "value": 46,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F41"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2018,
      "program": "PE",
      "level": "total",
      "value": 158,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G41"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2019,
      "program": "CC",
      "level": "ME",
      "value": 132,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D42"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2019,
      "program": "CC",
      "level": "DO",
      "value": 82,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E42"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2019,
      "program": "CC",
      "level": "total",
      "value": 214,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H42"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2019,
      "program": "CC",
      "level": null,
      "value": 122,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F42"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2019,
      "program": "CC",
      "level": "total",
      "value": 336,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G42"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2019,
      "program": "MPEM",
      "level": "ME",
      "value": 77,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D43"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2019,
      "program": "MPEM",
      "level": "DO",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E43"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2019,
      "program": "MPEM",
      "level": "total",
      "value": 77,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H43"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2019,
      "program": "MPEM",
      "level": null,
      "value": 10,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F43"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2019,
      "program": "MPEM",
      "level": "total",
      "value": 87,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G43"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2019,
      "program": "MAT",
      "level": "ME",
      "value": 48,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D44"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2019,
      "program": "MAT",
      "level": "DO",
      "value": 91,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E44"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2019,
      "program": "MAT",
      "level": "total",
      "value": 139,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H44"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2019,
      "program": "MAT",
      "level": null,
      "value": 65,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F44"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2019,
      "program": "MAT",
      "level": "total",
      "value": 204,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G44"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2019,
      "program": "MAP",
      "level": "ME",
      "value": 44,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D45"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2019,
      "program": "MAP",
      "level": "DO",
      "value": 63,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E45"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2019,
      "program": "MAP",
      "level": "total",
      "value": 107,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H45"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2019,
      "program": "MAP",
      "level": null,
      "value": 90,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F45"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2019,
      "program": "MAP",
      "level": "total",
      "value": 197,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G45"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2019,
      "program": "PE",
      "level": "ME",
      "value": 50,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D46"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2019,
      "program": "PE",
      "level": "DO",
      "value": 71,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E46"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2019,
      "program": "PE",
      "level": "total",
      "value": 121,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H46"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2019,
      "program": "PE",
      "level": null,
      "value": 62,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F46"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2019,
      "program": "PE",
      "level": "total",
      "value": 183,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G46"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2020,
      "program": "CC",
      "level": "ME",
      "value": 138,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D47"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2020,
      "program": "CC",
      "level": "DO",
      "value": 72,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E47"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2020,
      "program": "CC",
      "level": "total",
      "value": 210,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H47"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2020,
      "program": "CC",
      "level": null,
      "value": 104,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F47"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2020,
      "program": "CC",
      "level": "total",
      "value": 314,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G47"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2020,
      "program": "MPEM",
      "level": "ME",
      "value": 67,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D48"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2020,
      "program": "MPEM",
      "level": "DO",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E48"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2020,
      "program": "MPEM",
      "level": "total",
      "value": 67,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H48"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2020,
      "program": "MPEM",
      "level": null,
      "value": 12,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F48"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2020,
      "program": "MPEM",
      "level": "total",
      "value": 79,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G48"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2020,
      "program": "MAT",
      "level": "ME",
      "value": 41,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D49"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2020,
      "program": "MAT",
      "level": "DO",
      "value": 82,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E49"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2020,
      "program": "MAT",
      "level": "total",
      "value": 123,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H49"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2020,
      "program": "MAT",
      "level": null,
      "value": 81,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F49"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2020,
      "program": "MAT",
      "level": "total",
      "value": 204,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G49"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2020,
      "program": "MAP",
      "level": "ME",
      "value": 43,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D50"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2020,
      "program": "MAP",
      "level": "DO",
      "value": 63,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E50"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2020,
      "program": "MAP",
      "level": "total",
      "value": 106,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H50"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2020,
      "program": "MAP",
      "level": null,
      "value": 114,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F50"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2020,
      "program": "MAP",
      "level": "total",
      "value": 220,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G50"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2020,
      "program": "PE",
      "level": "ME",
      "value": 38,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D51"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2020,
      "program": "PE",
      "level": "DO",
      "value": 60,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E51"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2020,
      "program": "PE",
      "level": "total",
      "value": 98,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H51"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2020,
      "program": "PE",
      "level": null,
      "value": 96,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F51"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2020,
      "program": "PE",
      "level": "total",
      "value": 194,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G51"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2021,
      "program": "CC",
      "level": "ME",
      "value": 152,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D52"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2021,
      "program": "CC",
      "level": "DO",
      "value": 82,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E52"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2021,
      "program": "CC",
      "level": "total",
      "value": 234,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H52"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2021,
      "program": "CC",
      "level": null,
      "value": 132,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F52"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2021,
      "program": "CC",
      "level": "total",
      "value": 366,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G52"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2021,
      "program": "MPEM",
      "level": "ME",
      "value": 92,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D53"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2021,
      "program": "MPEM",
      "level": "DO",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E53"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2021,
      "program": "MPEM",
      "level": "total",
      "value": 92,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H53"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2021,
      "program": "MPEM",
      "level": null,
      "value": 21,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F53"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2021,
      "program": "MPEM",
      "level": "total",
      "value": 113,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G53"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2021,
      "program": "MAT",
      "level": "ME",
      "value": 48,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D54"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2021,
      "program": "MAT",
      "level": "DO",
      "value": 84,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E54"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2021,
      "program": "MAT",
      "level": "total",
      "value": 132,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H54"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2021,
      "program": "MAT",
      "level": null,
      "value": 110,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F54"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2021,
      "program": "MAT",
      "level": "total",
      "value": 242,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G54"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2021,
      "program": "MAP",
      "level": "ME",
      "value": 44,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D55"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2021,
      "program": "MAP",
      "level": "DO",
      "value": 66,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E55"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2021,
      "program": "MAP",
      "level": "total",
      "value": 110,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H55"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2021,
      "program": "MAP",
      "level": null,
      "value": 101,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F55"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2021,
      "program": "MAP",
      "level": "total",
      "value": 211,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G55"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2021,
      "program": "PE",
      "level": "ME",
      "value": 28,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D56"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2021,
      "program": "PE",
      "level": "DO",
      "value": 59,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E56"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2021,
      "program": "PE",
      "level": "total",
      "value": 87,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H56"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2021,
      "program": "PE",
      "level": null,
      "value": 97,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F56"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2021,
      "program": "PE",
      "level": "total",
      "value": 184,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G56"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2022,
      "program": "CC",
      "level": "ME",
      "value": 162,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D57"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2022,
      "program": "CC",
      "level": "DO",
      "value": 72,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E57"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2022,
      "program": "CC",
      "level": "total",
      "value": 234,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H57"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2022,
      "program": "CC",
      "level": null,
      "value": 52,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F57"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2022,
      "program": "CC",
      "level": "total",
      "value": 286,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G57"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2022,
      "program": "MPEM",
      "level": "ME",
      "value": 107,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D58"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2022,
      "program": "MPEM",
      "level": "DO",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E58"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2022,
      "program": "MPEM",
      "level": "total",
      "value": 107,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H58"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2022,
      "program": "MPEM",
      "level": null,
      "value": 15,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F58"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2022,
      "program": "MPEM",
      "level": "total",
      "value": 122,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G58"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2022,
      "program": "MAT",
      "level": "ME",
      "value": 54,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D59"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2022,
      "program": "MAT",
      "level": "DO",
      "value": 81,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E59"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2022,
      "program": "MAT",
      "level": "total",
      "value": 135,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H59"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2022,
      "program": "MAT",
      "level": null,
      "value": 64,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F59"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2022,
      "program": "MAT",
      "level": "total",
      "value": 199,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G59"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2022,
      "program": "MAP",
      "level": "ME",
      "value": 43,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D60"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2022,
      "program": "MAP",
      "level": "DO",
      "value": 68,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E60"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2022,
      "program": "MAP",
      "level": "total",
      "value": 111,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H60"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2022,
      "program": "MAP",
      "level": null,
      "value": 54,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F60"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2022,
      "program": "MAP",
      "level": "total",
      "value": 165,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G60"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2022,
      "program": "PE",
      "level": "ME",
      "value": 32,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D61"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2022,
      "program": "PE",
      "level": "DO",
      "value": 62,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E61"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2022,
      "program": "PE",
      "level": "total",
      "value": 94,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H61"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2022,
      "program": "PE",
      "level": null,
      "value": 56,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F61"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2022,
      "program": "PE",
      "level": "total",
      "value": 150,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G61"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2023,
      "program": "CC",
      "level": "ME",
      "value": 163,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D62"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2023,
      "program": "CC",
      "level": "DO",
      "value": 74,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E62"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2023,
      "program": "CC",
      "level": "total",
      "value": 237,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H62"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2023,
      "program": "CC",
      "level": null,
      "value": 98,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F62"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2023,
      "program": "CC",
      "level": "total",
      "value": 335,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G62"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2023,
      "program": "MPEM",
      "level": "ME",
      "value": 106,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D63"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2023,
      "program": "MPEM",
      "level": "DO",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E63"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2023,
      "program": "MPEM",
      "level": "total",
      "value": 106,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H63"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2023,
      "program": "MPEM",
      "level": null,
      "value": 2,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F63"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2023,
      "program": "MPEM",
      "level": "total",
      "value": 108,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G63"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2023,
      "program": "MAT",
      "level": "ME",
      "value": 61,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D64"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2023,
      "program": "MAT",
      "level": "DO",
      "value": 86,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E64"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2023,
      "program": "MAT",
      "level": "total",
      "value": 147,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H64"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2023,
      "program": "MAT",
      "level": null,
      "value": 40,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F64"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2023,
      "program": "MAT",
      "level": "total",
      "value": 187,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G64"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2023,
      "program": "MAP",
      "level": "ME",
      "value": 52,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D65"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2023,
      "program": "MAP",
      "level": "DO",
      "value": 73,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E65"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2023,
      "program": "MAP",
      "level": "total",
      "value": 125,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H65"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2023,
      "program": "MAP",
      "level": null,
      "value": 96,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F65"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2023,
      "program": "MAP",
      "level": "total",
      "value": 221,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G65"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2023,
      "program": "PE",
      "level": "ME",
      "value": 47,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D66"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2023,
      "program": "PE",
      "level": "DO",
      "value": 53,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E66"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2023,
      "program": "PE",
      "level": "total",
      "value": 100,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H66"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2023,
      "program": "PE",
      "level": null,
      "value": 83,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F66"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2023,
      "program": "PE",
      "level": "total",
      "value": 183,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G66"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2024,
      "program": "CC",
      "level": "ME",
      "value": 177,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D67"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2024,
      "program": "CC",
      "level": "DO",
      "value": 68,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E67"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2024,
      "program": "CC",
      "level": "total",
      "value": 245,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H67"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2024,
      "program": "CC",
      "level": null,
      "value": 105,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F67"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2024,
      "program": "CC",
      "level": "total",
      "value": 350,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G67"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2024,
      "program": "MPEM",
      "level": "ME",
      "value": 101,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D68"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2024,
      "program": "MPEM",
      "level": "DO",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E68"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2024,
      "program": "MPEM",
      "level": "total",
      "value": 101,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H68"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2024,
      "program": "MPEM",
      "level": null,
      "value": 16,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F68"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2024,
      "program": "MPEM",
      "level": "total",
      "value": 117,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G68"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2024,
      "program": "MAT",
      "level": "ME",
      "value": 55,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D69"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2024,
      "program": "MAT",
      "level": "DO",
      "value": 79,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E69"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2024,
      "program": "MAT",
      "level": "total",
      "value": 134,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H69"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2024,
      "program": "MAT",
      "level": null,
      "value": 38,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F69"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2024,
      "program": "MAT",
      "level": "total",
      "value": 172,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G69"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2024,
      "program": "MAP",
      "level": "ME",
      "value": 50,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D70"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2024,
      "program": "MAP",
      "level": "DO",
      "value": 73,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E70"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2024,
      "program": "MAP",
      "level": "total",
      "value": 123,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H70"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2024,
      "program": "MAP",
      "level": null,
      "value": 62,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F70"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2024,
      "program": "MAP",
      "level": "total",
      "value": 185,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G70"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2024,
      "program": "PE",
      "level": "ME",
      "value": 56,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D71"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2024,
      "program": "PE",
      "level": "DO",
      "value": 54,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E71"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2024,
      "program": "PE",
      "level": "total",
      "value": 110,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H71"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2024,
      "program": "PE",
      "level": null,
      "value": 27,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F71"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2024,
      "program": "PE",
      "level": "total",
      "value": 137,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G71"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2025,
      "program": "CC",
      "level": "ME",
      "value": 169,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D72"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2025,
      "program": "CC",
      "level": "DO",
      "value": 70,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E72"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2025,
      "program": "CC",
      "level": "total",
      "value": 239,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H72"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2025,
      "program": "CC",
      "level": null,
      "value": 144,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F72"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2025,
      "program": "CC",
      "level": "total",
      "value": 383,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G72"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2025,
      "program": "MPEM",
      "level": "ME",
      "value": 99,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D73"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2025,
      "program": "MPEM",
      "level": "DO",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E73"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2025,
      "program": "MPEM",
      "level": "total",
      "value": 99,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H73"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2025,
      "program": "MPEM",
      "level": null,
      "value": 11,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F73"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2025,
      "program": "MPEM",
      "level": "total",
      "value": 110,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G73"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2025,
      "program": "MAT",
      "level": "ME",
      "value": 63,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D74"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2025,
      "program": "MAT",
      "level": "DO",
      "value": 78,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E74"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2025,
      "program": "MAT",
      "level": "total",
      "value": 141,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H74"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2025,
      "program": "MAT",
      "level": null,
      "value": 47,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F74"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2025,
      "program": "MAT",
      "level": "total",
      "value": 188,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G74"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2025,
      "program": "MAP",
      "level": "ME",
      "value": 45,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D75"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2025,
      "program": "MAP",
      "level": "DO",
      "value": 63,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E75"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2025,
      "program": "MAP",
      "level": "total",
      "value": 108,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H75"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2025,
      "program": "MAP",
      "level": null,
      "value": 31,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F75"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2025,
      "program": "MAP",
      "level": "total",
      "value": 139,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G75"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2025,
      "program": "PE",
      "level": "ME",
      "value": 65,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "D76"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2025,
      "program": "PE",
      "level": "DO",
      "value": 55,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "E76"
      }
    },
    {
      "section": "enrollment",
      "metric": "regular_enrollment",
      "year": 2025,
      "program": "PE",
      "level": "total",
      "value": 120,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Anuário USP, tabela 2.04: matrículas regulares anuais. Total regular = mestrado + doutorado. Não corresponde à posição de estudantes ativos em 1º de abril.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "H76"
      }
    },
    {
      "section": "enrollment",
      "metric": "special_enrollment",
      "year": 2025,
      "program": "PE",
      "level": null,
      "value": 46,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Matrículas de alunos especiais do Anuário USP, separadas das matrículas regulares.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "F76"
      }
    },
    {
      "section": "enrollment",
      "metric": "published_enrollment_total",
      "year": 2025,
      "program": "PE",
      "level": "total",
      "value": 166,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Total anual publicado no Anuário USP: regulares + especiais. Não confundir com matrículas em disciplinas.",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Matrículas",
        "cell": "G76"
      }
    },
    {
      "section": "disciplines",
      "metric": "courses",
      "year": 2012,
      "program": "CC",
      "level": null,
      "value": 42,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de códigos de disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "B8"
      }
    },
    {
      "section": "disciplines",
      "metric": "courses",
      "year": 2013,
      "program": "CC",
      "level": null,
      "value": 40,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de códigos de disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "C8"
      }
    },
    {
      "section": "disciplines",
      "metric": "courses",
      "year": 2014,
      "program": "CC",
      "level": null,
      "value": 36,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de códigos de disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "D8"
      }
    },
    {
      "section": "disciplines",
      "metric": "courses",
      "year": 2015,
      "program": "CC",
      "level": null,
      "value": 38,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de códigos de disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "E8"
      }
    },
    {
      "section": "disciplines",
      "metric": "courses",
      "year": 2016,
      "program": "CC",
      "level": null,
      "value": 39,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de códigos de disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "F8"
      }
    },
    {
      "section": "disciplines",
      "metric": "courses",
      "year": 2017,
      "program": "CC",
      "level": null,
      "value": 42,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de códigos de disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "G8"
      }
    },
    {
      "section": "disciplines",
      "metric": "courses",
      "year": 2018,
      "program": "CC",
      "level": null,
      "value": 57,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de códigos de disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "H8"
      }
    },
    {
      "section": "disciplines",
      "metric": "courses",
      "year": 2019,
      "program": "CC",
      "level": null,
      "value": 46,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de códigos de disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "I8"
      }
    },
    {
      "section": "disciplines",
      "metric": "courses",
      "year": 2020,
      "program": "CC",
      "level": null,
      "value": 47,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de códigos de disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "J8"
      }
    },
    {
      "section": "disciplines",
      "metric": "courses",
      "year": 2021,
      "program": "CC",
      "level": null,
      "value": 42,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de códigos de disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "K8"
      }
    },
    {
      "section": "disciplines",
      "metric": "courses",
      "year": 2022,
      "program": "CC",
      "level": null,
      "value": 48,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de códigos de disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "L8"
      }
    },
    {
      "section": "disciplines",
      "metric": "courses",
      "year": 2023,
      "program": "CC",
      "level": null,
      "value": 49,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de códigos de disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "M8"
      }
    },
    {
      "section": "disciplines",
      "metric": "courses",
      "year": 2024,
      "program": "CC",
      "level": null,
      "value": 38,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de códigos de disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "N8"
      }
    },
    {
      "section": "disciplines",
      "metric": "courses",
      "year": 2025,
      "program": "CC",
      "level": null,
      "value": 43,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de códigos de disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "O8"
      }
    },
    {
      "section": "disciplines",
      "metric": "courses",
      "year": 2012,
      "program": "MAT",
      "level": null,
      "value": 41,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de códigos de disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "B9"
      }
    },
    {
      "section": "disciplines",
      "metric": "courses",
      "year": 2013,
      "program": "MAT",
      "level": null,
      "value": 30,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de códigos de disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "C9"
      }
    },
    {
      "section": "disciplines",
      "metric": "courses",
      "year": 2014,
      "program": "MAT",
      "level": null,
      "value": 38,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de códigos de disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "D9"
      }
    },
    {
      "section": "disciplines",
      "metric": "courses",
      "year": 2015,
      "program": "MAT",
      "level": null,
      "value": 39,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de códigos de disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "E9"
      }
    },
    {
      "section": "disciplines",
      "metric": "courses",
      "year": 2016,
      "program": "MAT",
      "level": null,
      "value": 32,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de códigos de disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "F9"
      }
    },
    {
      "section": "disciplines",
      "metric": "courses",
      "year": 2017,
      "program": "MAT",
      "level": null,
      "value": 33,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de códigos de disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "G9"
      }
    },
    {
      "section": "disciplines",
      "metric": "courses",
      "year": 2018,
      "program": "MAT",
      "level": null,
      "value": 40,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de códigos de disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "H9"
      }
    },
    {
      "section": "disciplines",
      "metric": "courses",
      "year": 2019,
      "program": "MAT",
      "level": null,
      "value": 42,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de códigos de disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "I9"
      }
    },
    {
      "section": "disciplines",
      "metric": "courses",
      "year": 2020,
      "program": "MAT",
      "level": null,
      "value": 39,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de códigos de disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "J9"
      }
    },
    {
      "section": "disciplines",
      "metric": "courses",
      "year": 2021,
      "program": "MAT",
      "level": null,
      "value": 37,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de códigos de disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "K9"
      }
    },
    {
      "section": "disciplines",
      "metric": "courses",
      "year": 2022,
      "program": "MAT",
      "level": null,
      "value": 43,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de códigos de disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "L9"
      }
    },
    {
      "section": "disciplines",
      "metric": "courses",
      "year": 2023,
      "program": "MAT",
      "level": null,
      "value": 36,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de códigos de disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "M9"
      }
    },
    {
      "section": "disciplines",
      "metric": "courses",
      "year": 2024,
      "program": "MAT",
      "level": null,
      "value": 37,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de códigos de disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "N9"
      }
    },
    {
      "section": "disciplines",
      "metric": "courses",
      "year": 2025,
      "program": "MAT",
      "level": null,
      "value": 37,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de códigos de disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "O9"
      }
    },
    {
      "section": "disciplines",
      "metric": "sections",
      "year": 2012,
      "program": "CC",
      "level": null,
      "value": 44,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de turmas oferecidas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "B12"
      }
    },
    {
      "section": "disciplines",
      "metric": "sections",
      "year": 2013,
      "program": "CC",
      "level": null,
      "value": 40,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de turmas oferecidas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "C12"
      }
    },
    {
      "section": "disciplines",
      "metric": "sections",
      "year": 2014,
      "program": "CC",
      "level": null,
      "value": 36,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de turmas oferecidas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "D12"
      }
    },
    {
      "section": "disciplines",
      "metric": "sections",
      "year": 2015,
      "program": "CC",
      "level": null,
      "value": 38,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de turmas oferecidas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "E12"
      }
    },
    {
      "section": "disciplines",
      "metric": "sections",
      "year": 2016,
      "program": "CC",
      "level": null,
      "value": 41,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de turmas oferecidas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "F12"
      }
    },
    {
      "section": "disciplines",
      "metric": "sections",
      "year": 2017,
      "program": "CC",
      "level": null,
      "value": 52,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de turmas oferecidas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "G12"
      }
    },
    {
      "section": "disciplines",
      "metric": "sections",
      "year": 2018,
      "program": "CC",
      "level": null,
      "value": 64,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de turmas oferecidas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "H12"
      }
    },
    {
      "section": "disciplines",
      "metric": "sections",
      "year": 2019,
      "program": "CC",
      "level": null,
      "value": 56,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de turmas oferecidas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "I12"
      }
    },
    {
      "section": "disciplines",
      "metric": "sections",
      "year": 2020,
      "program": "CC",
      "level": null,
      "value": 48,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de turmas oferecidas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "J12"
      }
    },
    {
      "section": "disciplines",
      "metric": "sections",
      "year": 2021,
      "program": "CC",
      "level": null,
      "value": 50,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de turmas oferecidas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "K12"
      }
    },
    {
      "section": "disciplines",
      "metric": "sections",
      "year": 2022,
      "program": "CC",
      "level": null,
      "value": 50,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de turmas oferecidas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "L12"
      }
    },
    {
      "section": "disciplines",
      "metric": "sections",
      "year": 2023,
      "program": "CC",
      "level": null,
      "value": 50,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de turmas oferecidas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "M12"
      }
    },
    {
      "section": "disciplines",
      "metric": "sections",
      "year": 2024,
      "program": "CC",
      "level": null,
      "value": 44,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de turmas oferecidas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "N12"
      }
    },
    {
      "section": "disciplines",
      "metric": "sections",
      "year": 2025,
      "program": "CC",
      "level": null,
      "value": 46,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de turmas oferecidas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "O12"
      }
    },
    {
      "section": "disciplines",
      "metric": "sections",
      "year": 2012,
      "program": "MAT",
      "level": null,
      "value": 41,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de turmas oferecidas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "B13"
      }
    },
    {
      "section": "disciplines",
      "metric": "sections",
      "year": 2013,
      "program": "MAT",
      "level": null,
      "value": 31,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de turmas oferecidas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "C13"
      }
    },
    {
      "section": "disciplines",
      "metric": "sections",
      "year": 2014,
      "program": "MAT",
      "level": null,
      "value": 38,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de turmas oferecidas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "D13"
      }
    },
    {
      "section": "disciplines",
      "metric": "sections",
      "year": 2015,
      "program": "MAT",
      "level": null,
      "value": 41,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de turmas oferecidas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "E13"
      }
    },
    {
      "section": "disciplines",
      "metric": "sections",
      "year": 2016,
      "program": "MAT",
      "level": null,
      "value": 32,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de turmas oferecidas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "F13"
      }
    },
    {
      "section": "disciplines",
      "metric": "sections",
      "year": 2017,
      "program": "MAT",
      "level": null,
      "value": 34,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de turmas oferecidas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "G13"
      }
    },
    {
      "section": "disciplines",
      "metric": "sections",
      "year": 2018,
      "program": "MAT",
      "level": null,
      "value": 44,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de turmas oferecidas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "H13"
      }
    },
    {
      "section": "disciplines",
      "metric": "sections",
      "year": 2019,
      "program": "MAT",
      "level": null,
      "value": 52,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de turmas oferecidas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "I13"
      }
    },
    {
      "section": "disciplines",
      "metric": "sections",
      "year": 2020,
      "program": "MAT",
      "level": null,
      "value": 41,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de turmas oferecidas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "J13"
      }
    },
    {
      "section": "disciplines",
      "metric": "sections",
      "year": 2021,
      "program": "MAT",
      "level": null,
      "value": 37,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de turmas oferecidas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "K13"
      }
    },
    {
      "section": "disciplines",
      "metric": "sections",
      "year": 2022,
      "program": "MAT",
      "level": null,
      "value": 43,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de turmas oferecidas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "L13"
      }
    },
    {
      "section": "disciplines",
      "metric": "sections",
      "year": 2023,
      "program": "MAT",
      "level": null,
      "value": 37,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de turmas oferecidas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "M13"
      }
    },
    {
      "section": "disciplines",
      "metric": "sections",
      "year": 2024,
      "program": "MAT",
      "level": null,
      "value": 37,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de turmas oferecidas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "N13"
      }
    },
    {
      "section": "disciplines",
      "metric": "sections",
      "year": 2025,
      "program": "MAT",
      "level": null,
      "value": 38,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem anual de turmas oferecidas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "O13"
      }
    },
    {
      "section": "disciplines",
      "metric": "applications",
      "year": 2012,
      "program": "CC",
      "level": null,
      "value": 545,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "B16"
      }
    },
    {
      "section": "disciplines",
      "metric": "applications",
      "year": 2013,
      "program": "CC",
      "level": null,
      "value": 460,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "C16"
      }
    },
    {
      "section": "disciplines",
      "metric": "applications",
      "year": 2014,
      "program": "CC",
      "level": null,
      "value": 499,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "D16"
      }
    },
    {
      "section": "disciplines",
      "metric": "applications",
      "year": 2015,
      "program": "CC",
      "level": null,
      "value": 403,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "E16"
      }
    },
    {
      "section": "disciplines",
      "metric": "applications",
      "year": 2016,
      "program": "CC",
      "level": null,
      "value": 488,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "F16"
      }
    },
    {
      "section": "disciplines",
      "metric": "applications",
      "year": 2017,
      "program": "CC",
      "level": null,
      "value": 504,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "G16"
      }
    },
    {
      "section": "disciplines",
      "metric": "applications",
      "year": 2018,
      "program": "CC",
      "level": null,
      "value": 600.9,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "H16"
      }
    },
    {
      "section": "disciplines",
      "metric": "applications",
      "year": 2019,
      "program": "CC",
      "level": null,
      "value": 460.9,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "I16"
      }
    },
    {
      "section": "disciplines",
      "metric": "applications",
      "year": 2020,
      "program": "CC",
      "level": null,
      "value": 452,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "J16"
      }
    },
    {
      "section": "disciplines",
      "metric": "applications",
      "year": 2021,
      "program": "CC",
      "level": null,
      "value": 550,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "K16"
      }
    },
    {
      "section": "disciplines",
      "metric": "applications",
      "year": 2022,
      "program": "CC",
      "level": null,
      "value": 428,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "L16"
      }
    },
    {
      "section": "disciplines",
      "metric": "applications",
      "year": 2023,
      "program": "CC",
      "level": null,
      "value": 513,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "M16"
      }
    },
    {
      "section": "disciplines",
      "metric": "applications",
      "year": 2024,
      "program": "CC",
      "level": null,
      "value": 524,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "N16"
      }
    },
    {
      "section": "disciplines",
      "metric": "applications",
      "year": 2025,
      "program": "CC",
      "level": null,
      "value": 721,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "O16"
      }
    },
    {
      "section": "disciplines",
      "metric": "applications",
      "year": 2012,
      "program": "MAT",
      "level": null,
      "value": 490,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "B17"
      }
    },
    {
      "section": "disciplines",
      "metric": "applications",
      "year": 2013,
      "program": "MAT",
      "level": null,
      "value": 426,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "C17"
      }
    },
    {
      "section": "disciplines",
      "metric": "applications",
      "year": 2014,
      "program": "MAT",
      "level": null,
      "value": 396,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "D17"
      }
    },
    {
      "section": "disciplines",
      "metric": "applications",
      "year": 2015,
      "program": "MAT",
      "level": null,
      "value": 451,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "E17"
      }
    },
    {
      "section": "disciplines",
      "metric": "applications",
      "year": 2016,
      "program": "MAT",
      "level": null,
      "value": 433,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "F17"
      }
    },
    {
      "section": "disciplines",
      "metric": "applications",
      "year": 2017,
      "program": "MAT",
      "level": null,
      "value": 439,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "G17"
      }
    },
    {
      "section": "disciplines",
      "metric": "applications",
      "year": 2018,
      "program": "MAT",
      "level": null,
      "value": 419.1,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "H17"
      }
    },
    {
      "section": "disciplines",
      "metric": "applications",
      "year": 2019,
      "program": "MAT",
      "level": null,
      "value": 444,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "I17"
      }
    },
    {
      "section": "disciplines",
      "metric": "applications",
      "year": 2020,
      "program": "MAT",
      "level": null,
      "value": 454,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "J17"
      }
    },
    {
      "section": "disciplines",
      "metric": "applications",
      "year": 2021,
      "program": "MAT",
      "level": null,
      "value": 478,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "K17"
      }
    },
    {
      "section": "disciplines",
      "metric": "applications",
      "year": 2022,
      "program": "MAT",
      "level": null,
      "value": 369,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "L17"
      }
    },
    {
      "section": "disciplines",
      "metric": "applications",
      "year": 2023,
      "program": "MAT",
      "level": null,
      "value": 327,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "M17"
      }
    },
    {
      "section": "disciplines",
      "metric": "applications",
      "year": 2024,
      "program": "MAT",
      "level": null,
      "value": 335,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "N17"
      }
    },
    {
      "section": "disciplines",
      "metric": "applications",
      "year": 2025,
      "program": "MAT",
      "level": null,
      "value": 332,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "O17"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments",
      "year": 2012,
      "program": "CC",
      "level": null,
      "value": 466,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "B20"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments",
      "year": 2013,
      "program": "CC",
      "level": null,
      "value": 392,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "C20"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments",
      "year": 2014,
      "program": "CC",
      "level": null,
      "value": 422,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "D20"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments",
      "year": 2015,
      "program": "CC",
      "level": null,
      "value": 352,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "E20"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments",
      "year": 2016,
      "program": "CC",
      "level": null,
      "value": 417,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "F20"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments",
      "year": 2017,
      "program": "CC",
      "level": null,
      "value": 422,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "G20"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments",
      "year": 2018,
      "program": "CC",
      "level": null,
      "value": 530,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "H20"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments",
      "year": 2019,
      "program": "CC",
      "level": null,
      "value": 399,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "I20"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments",
      "year": 2020,
      "program": "CC",
      "level": null,
      "value": 384,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "J20"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments",
      "year": 2021,
      "program": "CC",
      "level": null,
      "value": 477,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "K20"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments",
      "year": 2022,
      "program": "CC",
      "level": null,
      "value": 333,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "L20"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments",
      "year": 2023,
      "program": "CC",
      "level": null,
      "value": 408,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "M20"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments",
      "year": 2024,
      "program": "CC",
      "level": null,
      "value": 424,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "N20"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments",
      "year": 2025,
      "program": "CC",
      "level": null,
      "value": 579,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "O20"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments",
      "year": 2012,
      "program": "MAT",
      "level": null,
      "value": 429,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "B21"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments",
      "year": 2013,
      "program": "MAT",
      "level": null,
      "value": 347,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "C21"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments",
      "year": 2014,
      "program": "MAT",
      "level": null,
      "value": 358,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "D21"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments",
      "year": 2015,
      "program": "MAT",
      "level": null,
      "value": 412,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "E21"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments",
      "year": 2016,
      "program": "MAT",
      "level": null,
      "value": 387,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "F21"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments",
      "year": 2017,
      "program": "MAT",
      "level": null,
      "value": 387,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "G21"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments",
      "year": 2018,
      "program": "MAT",
      "level": null,
      "value": 363.9,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "H21"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments",
      "year": 2019,
      "program": "MAT",
      "level": null,
      "value": 400,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "I21"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments",
      "year": 2020,
      "program": "MAT",
      "level": null,
      "value": 397,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "J21"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments",
      "year": 2021,
      "program": "MAT",
      "level": null,
      "value": 441,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "K21"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments",
      "year": 2022,
      "program": "MAT",
      "level": null,
      "value": 322,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "L21"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments",
      "year": 2023,
      "program": "MAT",
      "level": null,
      "value": 266,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "M21"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments",
      "year": 2024,
      "program": "MAT",
      "level": null,
      "value": 302,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "N21"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments",
      "year": 2025,
      "program": "MAT",
      "level": null,
      "value": 299,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "O21"
      }
    },
    {
      "section": "disciplines",
      "metric": "approvals",
      "year": 2012,
      "program": "CC",
      "level": null,
      "value": 412,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "B24"
      }
    },
    {
      "section": "disciplines",
      "metric": "approvals",
      "year": 2013,
      "program": "CC",
      "level": null,
      "value": 355,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "C24"
      }
    },
    {
      "section": "disciplines",
      "metric": "approvals",
      "year": 2014,
      "program": "CC",
      "level": null,
      "value": 365,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "D24"
      }
    },
    {
      "section": "disciplines",
      "metric": "approvals",
      "year": 2015,
      "program": "CC",
      "level": null,
      "value": 290,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "E24"
      }
    },
    {
      "section": "disciplines",
      "metric": "approvals",
      "year": 2016,
      "program": "CC",
      "level": null,
      "value": 353,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "F24"
      }
    },
    {
      "section": "disciplines",
      "metric": "approvals",
      "year": 2017,
      "program": "CC",
      "level": null,
      "value": 365,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "G24"
      }
    },
    {
      "section": "disciplines",
      "metric": "approvals",
      "year": 2018,
      "program": "CC",
      "level": null,
      "value": 425,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "H24"
      }
    },
    {
      "section": "disciplines",
      "metric": "approvals",
      "year": 2019,
      "program": "CC",
      "level": null,
      "value": 310.1,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "I24"
      }
    },
    {
      "section": "disciplines",
      "metric": "approvals",
      "year": 2020,
      "program": "CC",
      "level": null,
      "value": 337,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "J24"
      }
    },
    {
      "section": "disciplines",
      "metric": "approvals",
      "year": 2021,
      "program": "CC",
      "level": null,
      "value": 390,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "K24"
      }
    },
    {
      "section": "disciplines",
      "metric": "approvals",
      "year": 2022,
      "program": "CC",
      "level": null,
      "value": 291,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "L24"
      }
    },
    {
      "section": "disciplines",
      "metric": "approvals",
      "year": 2023,
      "program": "CC",
      "level": null,
      "value": 337,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "M24"
      }
    },
    {
      "section": "disciplines",
      "metric": "approvals",
      "year": 2024,
      "program": "CC",
      "level": null,
      "value": 355,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "N24"
      }
    },
    {
      "section": "disciplines",
      "metric": "approvals",
      "year": 2025,
      "program": "CC",
      "level": null,
      "value": 489,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "O24"
      }
    },
    {
      "section": "disciplines",
      "metric": "approvals",
      "year": 2012,
      "program": "MAT",
      "level": null,
      "value": 370,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "B25"
      }
    },
    {
      "section": "disciplines",
      "metric": "approvals",
      "year": 2013,
      "program": "MAT",
      "level": null,
      "value": 307,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "C25"
      }
    },
    {
      "section": "disciplines",
      "metric": "approvals",
      "year": 2014,
      "program": "MAT",
      "level": null,
      "value": 322,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "D25"
      }
    },
    {
      "section": "disciplines",
      "metric": "approvals",
      "year": 2015,
      "program": "MAT",
      "level": null,
      "value": 347,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "E25"
      }
    },
    {
      "section": "disciplines",
      "metric": "approvals",
      "year": 2016,
      "program": "MAT",
      "level": null,
      "value": 334,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "F25"
      }
    },
    {
      "section": "disciplines",
      "metric": "approvals",
      "year": 2017,
      "program": "MAT",
      "level": null,
      "value": 336,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "G25"
      }
    },
    {
      "section": "disciplines",
      "metric": "approvals",
      "year": 2018,
      "program": "MAT",
      "level": null,
      "value": 328.9,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "H25"
      }
    },
    {
      "section": "disciplines",
      "metric": "approvals",
      "year": 2019,
      "program": "MAT",
      "level": null,
      "value": 337,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "I25"
      }
    },
    {
      "section": "disciplines",
      "metric": "approvals",
      "year": 2020,
      "program": "MAT",
      "level": null,
      "value": 318,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "J25"
      }
    },
    {
      "section": "disciplines",
      "metric": "approvals",
      "year": 2021,
      "program": "MAT",
      "level": null,
      "value": 322,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "K25"
      }
    },
    {
      "section": "disciplines",
      "metric": "approvals",
      "year": 2022,
      "program": "MAT",
      "level": null,
      "value": 265,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "L25"
      }
    },
    {
      "section": "disciplines",
      "metric": "approvals",
      "year": 2023,
      "program": "MAT",
      "level": null,
      "value": 224,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "M25"
      }
    },
    {
      "section": "disciplines",
      "metric": "approvals",
      "year": 2024,
      "program": "MAT",
      "level": null,
      "value": 277,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "N25"
      }
    },
    {
      "section": "disciplines",
      "metric": "approvals",
      "year": 2025,
      "program": "MAT",
      "level": null,
      "value": 259,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Agregado do relatório de disciplinas, com aproximação decorrente das médias publicadas por disciplina. Matrículas são vínculos estudante–turma; não pessoas distintas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "O25"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments_per_section",
      "year": 2012,
      "program": "CC",
      "level": null,
      "value": 10.590909090909092,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Total aproximado de matrículas dividido pelo número de turmas no ano; média ponderada, não média simples entre disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "B28"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments_per_section",
      "year": 2013,
      "program": "CC",
      "level": null,
      "value": 9.8,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Total aproximado de matrículas dividido pelo número de turmas no ano; média ponderada, não média simples entre disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "C28"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments_per_section",
      "year": 2014,
      "program": "CC",
      "level": null,
      "value": 11.722222222222221,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Total aproximado de matrículas dividido pelo número de turmas no ano; média ponderada, não média simples entre disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "D28"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments_per_section",
      "year": 2015,
      "program": "CC",
      "level": null,
      "value": 9.263157894736842,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Total aproximado de matrículas dividido pelo número de turmas no ano; média ponderada, não média simples entre disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "E28"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments_per_section",
      "year": 2016,
      "program": "CC",
      "level": null,
      "value": 10.170731707317072,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Total aproximado de matrículas dividido pelo número de turmas no ano; média ponderada, não média simples entre disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "F28"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments_per_section",
      "year": 2017,
      "program": "CC",
      "level": null,
      "value": 8.115384615384615,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Total aproximado de matrículas dividido pelo número de turmas no ano; média ponderada, não média simples entre disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "G28"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments_per_section",
      "year": 2018,
      "program": "CC",
      "level": null,
      "value": 8.28125,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Total aproximado de matrículas dividido pelo número de turmas no ano; média ponderada, não média simples entre disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "H28"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments_per_section",
      "year": 2019,
      "program": "CC",
      "level": null,
      "value": 7.125,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Total aproximado de matrículas dividido pelo número de turmas no ano; média ponderada, não média simples entre disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "I28"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments_per_section",
      "year": 2020,
      "program": "CC",
      "level": null,
      "value": 8,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Total aproximado de matrículas dividido pelo número de turmas no ano; média ponderada, não média simples entre disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "J28"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments_per_section",
      "year": 2021,
      "program": "CC",
      "level": null,
      "value": 9.54,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Total aproximado de matrículas dividido pelo número de turmas no ano; média ponderada, não média simples entre disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "K28"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments_per_section",
      "year": 2022,
      "program": "CC",
      "level": null,
      "value": 6.66,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Total aproximado de matrículas dividido pelo número de turmas no ano; média ponderada, não média simples entre disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "L28"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments_per_section",
      "year": 2023,
      "program": "CC",
      "level": null,
      "value": 8.16,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Total aproximado de matrículas dividido pelo número de turmas no ano; média ponderada, não média simples entre disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "M28"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments_per_section",
      "year": 2024,
      "program": "CC",
      "level": null,
      "value": 9.636363636363637,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Total aproximado de matrículas dividido pelo número de turmas no ano; média ponderada, não média simples entre disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "N28"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments_per_section",
      "year": 2025,
      "program": "CC",
      "level": null,
      "value": 12.58695652173913,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Total aproximado de matrículas dividido pelo número de turmas no ano; média ponderada, não média simples entre disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "O28"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments_per_section",
      "year": 2012,
      "program": "MAT",
      "level": null,
      "value": 10.463414634146341,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Total aproximado de matrículas dividido pelo número de turmas no ano; média ponderada, não média simples entre disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "B29"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments_per_section",
      "year": 2013,
      "program": "MAT",
      "level": null,
      "value": 11.193548387096774,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Total aproximado de matrículas dividido pelo número de turmas no ano; média ponderada, não média simples entre disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "C29"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments_per_section",
      "year": 2014,
      "program": "MAT",
      "level": null,
      "value": 9.421052631578947,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Total aproximado de matrículas dividido pelo número de turmas no ano; média ponderada, não média simples entre disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "D29"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments_per_section",
      "year": 2015,
      "program": "MAT",
      "level": null,
      "value": 10.048780487804878,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Total aproximado de matrículas dividido pelo número de turmas no ano; média ponderada, não média simples entre disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "E29"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments_per_section",
      "year": 2016,
      "program": "MAT",
      "level": null,
      "value": 12.09375,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Total aproximado de matrículas dividido pelo número de turmas no ano; média ponderada, não média simples entre disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "F29"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments_per_section",
      "year": 2017,
      "program": "MAT",
      "level": null,
      "value": 11.382352941176471,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Total aproximado de matrículas dividido pelo número de turmas no ano; média ponderada, não média simples entre disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "G29"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments_per_section",
      "year": 2018,
      "program": "MAT",
      "level": null,
      "value": 8.270454545454545,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Total aproximado de matrículas dividido pelo número de turmas no ano; média ponderada, não média simples entre disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "H29"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments_per_section",
      "year": 2019,
      "program": "MAT",
      "level": null,
      "value": 7.6923076923076925,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Total aproximado de matrículas dividido pelo número de turmas no ano; média ponderada, não média simples entre disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "I29"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments_per_section",
      "year": 2020,
      "program": "MAT",
      "level": null,
      "value": 9.682926829268293,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Total aproximado de matrículas dividido pelo número de turmas no ano; média ponderada, não média simples entre disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "J29"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments_per_section",
      "year": 2021,
      "program": "MAT",
      "level": null,
      "value": 11.91891891891892,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Total aproximado de matrículas dividido pelo número de turmas no ano; média ponderada, não média simples entre disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "K29"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments_per_section",
      "year": 2022,
      "program": "MAT",
      "level": null,
      "value": 7.488372093023256,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Total aproximado de matrículas dividido pelo número de turmas no ano; média ponderada, não média simples entre disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "L29"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments_per_section",
      "year": 2023,
      "program": "MAT",
      "level": null,
      "value": 7.1891891891891895,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Total aproximado de matrículas dividido pelo número de turmas no ano; média ponderada, não média simples entre disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "M29"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments_per_section",
      "year": 2024,
      "program": "MAT",
      "level": null,
      "value": 8.162162162162161,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Total aproximado de matrículas dividido pelo número de turmas no ano; média ponderada, não média simples entre disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "N29"
      }
    },
    {
      "section": "disciplines",
      "metric": "enrollments_per_section",
      "year": 2025,
      "program": "MAT",
      "level": null,
      "value": 7.868421052631579,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Total aproximado de matrículas dividido pelo número de turmas no ano; média ponderada, não média simples entre disciplinas.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "O29"
      }
    },
    {
      "section": "disciplines",
      "metric": "approval_rate",
      "year": 2012,
      "program": "CC",
      "level": null,
      "value": 0.8841201716738197,
      "status": "approximate",
      "unit": "ratio",
      "semantic_note": "Aprovações aproximadas divididas pelas matrículas aproximadas no ano. Valor armazenado como fração de 0 a 1.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "B32"
      }
    },
    {
      "section": "disciplines",
      "metric": "approval_rate",
      "year": 2013,
      "program": "CC",
      "level": null,
      "value": 0.9056122448979592,
      "status": "approximate",
      "unit": "ratio",
      "semantic_note": "Aprovações aproximadas divididas pelas matrículas aproximadas no ano. Valor armazenado como fração de 0 a 1.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "C32"
      }
    },
    {
      "section": "disciplines",
      "metric": "approval_rate",
      "year": 2014,
      "program": "CC",
      "level": null,
      "value": 0.8649289099526066,
      "status": "approximate",
      "unit": "ratio",
      "semantic_note": "Aprovações aproximadas divididas pelas matrículas aproximadas no ano. Valor armazenado como fração de 0 a 1.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "D32"
      }
    },
    {
      "section": "disciplines",
      "metric": "approval_rate",
      "year": 2015,
      "program": "CC",
      "level": null,
      "value": 0.8238636363636364,
      "status": "approximate",
      "unit": "ratio",
      "semantic_note": "Aprovações aproximadas divididas pelas matrículas aproximadas no ano. Valor armazenado como fração de 0 a 1.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "E32"
      }
    },
    {
      "section": "disciplines",
      "metric": "approval_rate",
      "year": 2016,
      "program": "CC",
      "level": null,
      "value": 0.8465227817745803,
      "status": "approximate",
      "unit": "ratio",
      "semantic_note": "Aprovações aproximadas divididas pelas matrículas aproximadas no ano. Valor armazenado como fração de 0 a 1.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "F32"
      }
    },
    {
      "section": "disciplines",
      "metric": "approval_rate",
      "year": 2017,
      "program": "CC",
      "level": null,
      "value": 0.8649289099526066,
      "status": "approximate",
      "unit": "ratio",
      "semantic_note": "Aprovações aproximadas divididas pelas matrículas aproximadas no ano. Valor armazenado como fração de 0 a 1.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "G32"
      }
    },
    {
      "section": "disciplines",
      "metric": "approval_rate",
      "year": 2018,
      "program": "CC",
      "level": null,
      "value": 0.8018867924528302,
      "status": "approximate",
      "unit": "ratio",
      "semantic_note": "Aprovações aproximadas divididas pelas matrículas aproximadas no ano. Valor armazenado como fração de 0 a 1.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "H32"
      }
    },
    {
      "section": "disciplines",
      "metric": "approval_rate",
      "year": 2019,
      "program": "CC",
      "level": null,
      "value": 0.7771929824561404,
      "status": "approximate",
      "unit": "ratio",
      "semantic_note": "Aprovações aproximadas divididas pelas matrículas aproximadas no ano. Valor armazenado como fração de 0 a 1.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "I32"
      }
    },
    {
      "section": "disciplines",
      "metric": "approval_rate",
      "year": 2020,
      "program": "CC",
      "level": null,
      "value": 0.8776041666666666,
      "status": "approximate",
      "unit": "ratio",
      "semantic_note": "Aprovações aproximadas divididas pelas matrículas aproximadas no ano. Valor armazenado como fração de 0 a 1.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "J32"
      }
    },
    {
      "section": "disciplines",
      "metric": "approval_rate",
      "year": 2021,
      "program": "CC",
      "level": null,
      "value": 0.8176100628930818,
      "status": "approximate",
      "unit": "ratio",
      "semantic_note": "Aprovações aproximadas divididas pelas matrículas aproximadas no ano. Valor armazenado como fração de 0 a 1.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "K32"
      }
    },
    {
      "section": "disciplines",
      "metric": "approval_rate",
      "year": 2022,
      "program": "CC",
      "level": null,
      "value": 0.8738738738738738,
      "status": "approximate",
      "unit": "ratio",
      "semantic_note": "Aprovações aproximadas divididas pelas matrículas aproximadas no ano. Valor armazenado como fração de 0 a 1.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "L32"
      }
    },
    {
      "section": "disciplines",
      "metric": "approval_rate",
      "year": 2023,
      "program": "CC",
      "level": null,
      "value": 0.8259803921568627,
      "status": "approximate",
      "unit": "ratio",
      "semantic_note": "Aprovações aproximadas divididas pelas matrículas aproximadas no ano. Valor armazenado como fração de 0 a 1.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "M32"
      }
    },
    {
      "section": "disciplines",
      "metric": "approval_rate",
      "year": 2024,
      "program": "CC",
      "level": null,
      "value": 0.8372641509433962,
      "status": "approximate",
      "unit": "ratio",
      "semantic_note": "Aprovações aproximadas divididas pelas matrículas aproximadas no ano. Valor armazenado como fração de 0 a 1.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "N32"
      }
    },
    {
      "section": "disciplines",
      "metric": "approval_rate",
      "year": 2025,
      "program": "CC",
      "level": null,
      "value": 0.844559585492228,
      "status": "approximate",
      "unit": "ratio",
      "semantic_note": "Aprovações aproximadas divididas pelas matrículas aproximadas no ano. Valor armazenado como fração de 0 a 1.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "O32"
      }
    },
    {
      "section": "disciplines",
      "metric": "approval_rate",
      "year": 2012,
      "program": "MAT",
      "level": null,
      "value": 0.8624708624708625,
      "status": "approximate",
      "unit": "ratio",
      "semantic_note": "Aprovações aproximadas divididas pelas matrículas aproximadas no ano. Valor armazenado como fração de 0 a 1.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "B33"
      }
    },
    {
      "section": "disciplines",
      "metric": "approval_rate",
      "year": 2013,
      "program": "MAT",
      "level": null,
      "value": 0.8847262247838616,
      "status": "approximate",
      "unit": "ratio",
      "semantic_note": "Aprovações aproximadas divididas pelas matrículas aproximadas no ano. Valor armazenado como fração de 0 a 1.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "C33"
      }
    },
    {
      "section": "disciplines",
      "metric": "approval_rate",
      "year": 2014,
      "program": "MAT",
      "level": null,
      "value": 0.8994413407821229,
      "status": "approximate",
      "unit": "ratio",
      "semantic_note": "Aprovações aproximadas divididas pelas matrículas aproximadas no ano. Valor armazenado como fração de 0 a 1.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "D33"
      }
    },
    {
      "section": "disciplines",
      "metric": "approval_rate",
      "year": 2015,
      "program": "MAT",
      "level": null,
      "value": 0.8422330097087378,
      "status": "approximate",
      "unit": "ratio",
      "semantic_note": "Aprovações aproximadas divididas pelas matrículas aproximadas no ano. Valor armazenado como fração de 0 a 1.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "E33"
      }
    },
    {
      "section": "disciplines",
      "metric": "approval_rate",
      "year": 2016,
      "program": "MAT",
      "level": null,
      "value": 0.8630490956072352,
      "status": "approximate",
      "unit": "ratio",
      "semantic_note": "Aprovações aproximadas divididas pelas matrículas aproximadas no ano. Valor armazenado como fração de 0 a 1.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "F33"
      }
    },
    {
      "section": "disciplines",
      "metric": "approval_rate",
      "year": 2017,
      "program": "MAT",
      "level": null,
      "value": 0.8682170542635659,
      "status": "approximate",
      "unit": "ratio",
      "semantic_note": "Aprovações aproximadas divididas pelas matrículas aproximadas no ano. Valor armazenado como fração de 0 a 1.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "G33"
      }
    },
    {
      "section": "disciplines",
      "metric": "approval_rate",
      "year": 2018,
      "program": "MAT",
      "level": null,
      "value": 0.9038197306952459,
      "status": "approximate",
      "unit": "ratio",
      "semantic_note": "Aprovações aproximadas divididas pelas matrículas aproximadas no ano. Valor armazenado como fração de 0 a 1.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "H33"
      }
    },
    {
      "section": "disciplines",
      "metric": "approval_rate",
      "year": 2019,
      "program": "MAT",
      "level": null,
      "value": 0.8425,
      "status": "approximate",
      "unit": "ratio",
      "semantic_note": "Aprovações aproximadas divididas pelas matrículas aproximadas no ano. Valor armazenado como fração de 0 a 1.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "I33"
      }
    },
    {
      "section": "disciplines",
      "metric": "approval_rate",
      "year": 2020,
      "program": "MAT",
      "level": null,
      "value": 0.801007556675063,
      "status": "approximate",
      "unit": "ratio",
      "semantic_note": "Aprovações aproximadas divididas pelas matrículas aproximadas no ano. Valor armazenado como fração de 0 a 1.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "J33"
      }
    },
    {
      "section": "disciplines",
      "metric": "approval_rate",
      "year": 2021,
      "program": "MAT",
      "level": null,
      "value": 0.7301587301587301,
      "status": "approximate",
      "unit": "ratio",
      "semantic_note": "Aprovações aproximadas divididas pelas matrículas aproximadas no ano. Valor armazenado como fração de 0 a 1.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "K33"
      }
    },
    {
      "section": "disciplines",
      "metric": "approval_rate",
      "year": 2022,
      "program": "MAT",
      "level": null,
      "value": 0.8229813664596274,
      "status": "approximate",
      "unit": "ratio",
      "semantic_note": "Aprovações aproximadas divididas pelas matrículas aproximadas no ano. Valor armazenado como fração de 0 a 1.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "L33"
      }
    },
    {
      "section": "disciplines",
      "metric": "approval_rate",
      "year": 2023,
      "program": "MAT",
      "level": null,
      "value": 0.8421052631578947,
      "status": "approximate",
      "unit": "ratio",
      "semantic_note": "Aprovações aproximadas divididas pelas matrículas aproximadas no ano. Valor armazenado como fração de 0 a 1.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "M33"
      }
    },
    {
      "section": "disciplines",
      "metric": "approval_rate",
      "year": 2024,
      "program": "MAT",
      "level": null,
      "value": 0.9172185430463576,
      "status": "approximate",
      "unit": "ratio",
      "semantic_note": "Aprovações aproximadas divididas pelas matrículas aproximadas no ano. Valor armazenado como fração de 0 a 1.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "N33"
      }
    },
    {
      "section": "disciplines",
      "metric": "approval_rate",
      "year": 2025,
      "program": "MAT",
      "level": null,
      "value": 0.8662207357859532,
      "status": "approximate",
      "unit": "ratio",
      "semantic_note": "Aprovações aproximadas divididas pelas matrículas aproximadas no ano. Valor armazenado como fração de 0 a 1.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "O33"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "nominal_class_hours",
      "year": 2024,
      "program": "CC",
      "level": null,
      "value": 3012,
      "status": "exact",
      "unit": "hours",
      "semantic_note": "Carga nominal de aulas: (horas semanais teóricas + práticas) × semanas, somada por turma. Exclui estudos. Não mede horas efetivamente ministradas por docente. Componentes de versões atualizadas usam a hipótese autorizada de manutenção da carga entre versões.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "B7"
      },
      "qualifiers": [
        "Carga nominal curricular, não carga docente efetiva.",
        "Hipótese autorizada: cargas mantidas quando a disciplina foi atualizada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "sections",
      "year": 2024,
      "program": "CC",
      "level": null,
      "value": 44,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Número de ofertas/turmas no ano; uma disciplina pode ter mais de uma turma.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "B8"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "enrollments",
      "year": 2024,
      "program": "CC",
      "level": null,
      "value": 424,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Totais anuais calculados como número de turmas × média publicada de matriculados por disciplina. São vínculos estudante–turma, não pessoas distintas. A disponibilidade do total não implica conhecer a distribuição entre turmas.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "B9"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "sections_lt5",
      "year": 2024,
      "program": "CC",
      "level": null,
      "value": 19,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem de turmas com 0 a 4 matriculados; exclui turmas com exatamente 5. ND quando a distribuição individual ainda não foi determinada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "B10"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "sections_gt30",
      "year": 2024,
      "program": "CC",
      "level": null,
      "value": 3,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem de turmas com pelo menos 31 matriculados; exclui turmas com exatamente 30. Não se reconstrói a distribuição individual a partir de desvio padrão.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "B11"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "active_april1",
      "year": 2024,
      "program": "CC",
      "level": "ME",
      "value": 141,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Posição em 1º de abril de cada ano, publicada no Janus. Doutorado inclui DO + DD. É uma contagem agregada publicada, sem auditoria nominal de duplicidades.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "B12"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "active_april1",
      "year": 2024,
      "program": "CC",
      "level": "DO_DD",
      "value": 63,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Posição em 1º de abril de cada ano, publicada no Janus. Doutorado inclui DO + DD. É uma contagem agregada publicada, sem auditoria nominal de duplicidades.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "B13"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "degrees",
      "year": 2024,
      "program": "CC",
      "level": "ME",
      "value": 23,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano segundo o DataUSP. Doutorado inclui DO + DD.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "B14"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "degrees",
      "year": 2024,
      "program": "CC",
      "level": "DO_DD",
      "value": 6,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano segundo o DataUSP. Doutorado inclui DO + DD.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "B15"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "credits_offered",
      "year": 2024,
      "program": "CC",
      "level": null,
      "value": 334,
      "status": "exact",
      "unit": "credits",
      "semantic_note": "Soma dos créditos das ofertas/turmas do ano; não multiplicada pelo número de alunos. Disciplinas repetidas em turmas distintas contribuem uma vez por turma.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "B16"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "curricular_hours",
      "year": 2024,
      "program": "CC",
      "level": null,
      "value": 5010,
      "status": "exact",
      "unit": "hours",
      "semantic_note": "Carga curricular total somada por turma, incluindo horas de estudos. Diferente de horas de aula e de carga docente efetiva.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "B17"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "nominal_class_hours",
      "year": 2024,
      "program": "MAT",
      "level": null,
      "value": 1860,
      "status": "exact",
      "unit": "hours",
      "semantic_note": "Carga nominal de aulas: (horas semanais teóricas + práticas) × semanas, somada por turma. Exclui estudos. Não mede horas efetivamente ministradas por docente. Componentes de versões atualizadas usam a hipótese autorizada de manutenção da carga entre versões.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "C7"
      },
      "qualifiers": [
        "Carga nominal curricular, não carga docente efetiva.",
        "Hipótese autorizada: cargas mantidas quando a disciplina foi atualizada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "sections",
      "year": 2024,
      "program": "MAT",
      "level": null,
      "value": 37,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Número de ofertas/turmas no ano; uma disciplina pode ter mais de uma turma.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "C8"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "enrollments",
      "year": 2024,
      "program": "MAT",
      "level": null,
      "value": 302,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Totais anuais calculados como número de turmas × média publicada de matriculados por disciplina. São vínculos estudante–turma, não pessoas distintas. A disponibilidade do total não implica conhecer a distribuição entre turmas.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "C9"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "sections_lt5",
      "year": 2024,
      "program": "MAT",
      "level": null,
      "value": 11,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem de turmas com 0 a 4 matriculados; exclui turmas com exatamente 5. ND quando a distribuição individual ainda não foi determinada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "C10"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "sections_gt30",
      "year": 2024,
      "program": "MAT",
      "level": null,
      "value": 1,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem de turmas com pelo menos 31 matriculados; exclui turmas com exatamente 30. Não se reconstrói a distribuição individual a partir de desvio padrão.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "C11"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "active_april1",
      "year": 2024,
      "program": "MAT",
      "level": "ME",
      "value": 46,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Posição em 1º de abril de cada ano, publicada no Janus. Doutorado inclui DO + DD. É uma contagem agregada publicada, sem auditoria nominal de duplicidades.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "C12"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "active_april1",
      "year": 2024,
      "program": "MAT",
      "level": "DO_DD",
      "value": 76,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Posição em 1º de abril de cada ano, publicada no Janus. Doutorado inclui DO + DD. É uma contagem agregada publicada, sem auditoria nominal de duplicidades.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "C13"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "degrees",
      "year": 2024,
      "program": "MAT",
      "level": "ME",
      "value": 15,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano segundo o DataUSP. Doutorado inclui DO + DD.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "C14"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "degrees",
      "year": 2024,
      "program": "MAT",
      "level": "DO_DD",
      "value": 14,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano segundo o DataUSP. Doutorado inclui DO + DD.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "C15"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "credits_offered",
      "year": 2024,
      "program": "MAT",
      "level": null,
      "value": 251,
      "status": "exact",
      "unit": "credits",
      "semantic_note": "Soma dos créditos das ofertas/turmas do ano; não multiplicada pelo número de alunos. Disciplinas repetidas em turmas distintas contribuem uma vez por turma.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "C16"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "curricular_hours",
      "year": 2024,
      "program": "MAT",
      "level": null,
      "value": 3765,
      "status": "exact",
      "unit": "hours",
      "semantic_note": "Carga curricular total somada por turma, incluindo horas de estudos. Diferente de horas de aula e de carga docente efetiva.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "C17"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "nominal_class_hours",
      "year": 2024,
      "program": "MAP",
      "level": null,
      "value": 1072,
      "status": "exact",
      "unit": "hours",
      "semantic_note": "Carga nominal de aulas: (horas semanais teóricas + práticas) × semanas, somada por turma. Exclui estudos. Não mede horas efetivamente ministradas por docente. Componentes de versões atualizadas usam a hipótese autorizada de manutenção da carga entre versões. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "D7"
      },
      "qualifiers": [
        "Carga nominal curricular, não carga docente efetiva.",
        "Hipótese autorizada: cargas mantidas quando a disciplina foi atualizada.",
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "sections",
      "year": 2024,
      "program": "MAP",
      "level": null,
      "value": 19,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Número de ofertas/turmas no ano; uma disciplina pode ter mais de uma turma. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "D8"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "enrollments",
      "year": 2024,
      "program": "MAP",
      "level": null,
      "value": 188,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Totais anuais calculados como número de turmas × média publicada de matriculados por disciplina. São vínculos estudante–turma, não pessoas distintas. A disponibilidade do total não implica conhecer a distribuição entre turmas. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "D9"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "sections_lt5",
      "year": 2024,
      "program": "MAP",
      "level": null,
      "value": 5,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem de turmas com 0 a 4 matriculados; exclui turmas com exatamente 5. ND quando a distribuição individual ainda não foi determinada. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "D10"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "sections_gt30",
      "year": 2024,
      "program": "MAP",
      "level": null,
      "value": 1,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem de turmas com pelo menos 31 matriculados; exclui turmas com exatamente 30. Não se reconstrói a distribuição individual a partir de desvio padrão. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "D11"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "active_april1",
      "year": 2024,
      "program": "MAP",
      "level": "ME",
      "value": 46,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Posição em 1º de abril de cada ano, publicada no Janus. Doutorado inclui DO + DD. É uma contagem agregada publicada, sem auditoria nominal de duplicidades.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "D12"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "active_april1",
      "year": 2024,
      "program": "MAP",
      "level": "DO_DD",
      "value": 67,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Posição em 1º de abril de cada ano, publicada no Janus. Doutorado inclui DO + DD. É uma contagem agregada publicada, sem auditoria nominal de duplicidades.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "D13"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "degrees",
      "year": 2024,
      "program": "MAP",
      "level": "ME",
      "value": 6,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano segundo o DataUSP. Doutorado inclui DO + DD.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "D14"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "degrees",
      "year": 2024,
      "program": "MAP",
      "level": "DO_DD",
      "value": 15,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano segundo o DataUSP. Doutorado inclui DO + DD.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "D15"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "credits_offered",
      "year": 2024,
      "program": "MAP",
      "level": null,
      "value": 138,
      "status": "exact",
      "unit": "credits",
      "semantic_note": "Soma dos créditos das ofertas/turmas do ano; não multiplicada pelo número de alunos. Disciplinas repetidas em turmas distintas contribuem uma vez por turma. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "D16"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "curricular_hours",
      "year": 2024,
      "program": "MAP",
      "level": null,
      "value": 2070,
      "status": "exact",
      "unit": "hours",
      "semantic_note": "Carga curricular total somada por turma, incluindo horas de estudos. Diferente de horas de aula e de carga docente efetiva. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "D17"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "nominal_class_hours",
      "year": 2024,
      "program": "PE",
      "level": null,
      "value": 1630,
      "status": "exact",
      "unit": "hours",
      "semantic_note": "Carga nominal de aulas: (horas semanais teóricas + práticas) × semanas, somada por turma. Exclui estudos. Não mede horas efetivamente ministradas por docente. Componentes de versões atualizadas usam a hipótese autorizada de manutenção da carga entre versões. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "E7"
      },
      "qualifiers": [
        "Carga nominal curricular, não carga docente efetiva.",
        "Hipótese autorizada: cargas mantidas quando a disciplina foi atualizada.",
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "sections",
      "year": 2024,
      "program": "PE",
      "level": null,
      "value": 23,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Número de ofertas/turmas no ano; uma disciplina pode ter mais de uma turma. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "E8"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "enrollments",
      "year": 2024,
      "program": "PE",
      "level": null,
      "value": 225,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Totais anuais calculados como número de turmas × média publicada de matriculados por disciplina. São vínculos estudante–turma, não pessoas distintas. A disponibilidade do total não implica conhecer a distribuição entre turmas. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "E9"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "sections_lt5",
      "year": 2024,
      "program": "PE",
      "level": null,
      "value": 5,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem de turmas com 0 a 4 matriculados; exclui turmas com exatamente 5. ND quando a distribuição individual ainda não foi determinada. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "E10"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "sections_gt30",
      "year": 2024,
      "program": "PE",
      "level": null,
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem de turmas com pelo menos 31 matriculados; exclui turmas com exatamente 30. Não se reconstrói a distribuição individual a partir de desvio padrão. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "E11"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "active_april1",
      "year": 2024,
      "program": "PE",
      "level": "ME",
      "value": 49,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Posição em 1º de abril de cada ano, publicada no Janus. Doutorado inclui DO + DD. É uma contagem agregada publicada, sem auditoria nominal de duplicidades.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "E12"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "active_april1",
      "year": 2024,
      "program": "PE",
      "level": "DO_DD",
      "value": 55,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Posição em 1º de abril de cada ano, publicada no Janus. Doutorado inclui DO + DD. É uma contagem agregada publicada, sem auditoria nominal de duplicidades.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "E13"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "degrees",
      "year": 2024,
      "program": "PE",
      "level": "ME",
      "value": 7,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano segundo o DataUSP. Doutorado inclui DO + DD.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "E14"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "degrees",
      "year": 2024,
      "program": "PE",
      "level": "DO_DD",
      "value": 9,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano segundo o DataUSP. Doutorado inclui DO + DD.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "E15"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "credits_offered",
      "year": 2024,
      "program": "PE",
      "level": null,
      "value": 182,
      "status": "exact",
      "unit": "credits",
      "semantic_note": "Soma dos créditos das ofertas/turmas do ano; não multiplicada pelo número de alunos. Disciplinas repetidas em turmas distintas contribuem uma vez por turma. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "E16"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "curricular_hours",
      "year": 2024,
      "program": "PE",
      "level": null,
      "value": 2730,
      "status": "exact",
      "unit": "hours",
      "semantic_note": "Carga curricular total somada por turma, incluindo horas de estudos. Diferente de horas de aula e de carga docente efetiva. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "E17"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "nominal_class_hours",
      "year": 2024,
      "program": "MPEM",
      "level": null,
      "value": 714,
      "status": "exact",
      "unit": "hours",
      "semantic_note": "Carga nominal de aulas: (horas semanais teóricas + práticas) × semanas, somada por turma. Exclui estudos. Não mede horas efetivamente ministradas por docente. Componentes de versões atualizadas usam a hipótese autorizada de manutenção da carga entre versões. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "F7"
      },
      "qualifiers": [
        "Carga nominal curricular, não carga docente efetiva.",
        "Hipótese autorizada: cargas mantidas quando a disciplina foi atualizada.",
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "sections",
      "year": 2024,
      "program": "MPEM",
      "level": null,
      "value": 13,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Número de ofertas/turmas no ano; uma disciplina pode ter mais de uma turma. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "F8"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "enrollments",
      "year": 2024,
      "program": "MPEM",
      "level": null,
      "value": 175,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Totais anuais calculados como número de turmas × média publicada de matriculados por disciplina. São vínculos estudante–turma, não pessoas distintas. A disponibilidade do total não implica conhecer a distribuição entre turmas. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "F9"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "sections_lt5",
      "year": 2024,
      "program": "MPEM",
      "level": null,
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem de turmas com 0 a 4 matriculados; exclui turmas com exatamente 5. ND quando a distribuição individual ainda não foi determinada. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "F10"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "sections_gt30",
      "year": 2024,
      "program": "MPEM",
      "level": null,
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem de turmas com pelo menos 31 matriculados; exclui turmas com exatamente 30. Não se reconstrói a distribuição individual a partir de desvio padrão. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "F11"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "active_april1",
      "year": 2024,
      "program": "MPEM",
      "level": "ME",
      "value": 107,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Posição em 1º de abril de cada ano, publicada no Janus. Doutorado inclui DO + DD. É uma contagem agregada publicada, sem auditoria nominal de duplicidades.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "F12"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "active_april1",
      "year": 2024,
      "program": "MPEM",
      "level": "DO_DD",
      "value": null,
      "status": "NA",
      "unit": "count",
      "semantic_note": "Posição em 1º de abril de cada ano, publicada no Janus. Doutorado inclui DO + DD. É uma contagem agregada publicada, sem auditoria nominal de duplicidades.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "F13"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "degrees",
      "year": 2024,
      "program": "MPEM",
      "level": "ME",
      "value": 18,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano segundo o DataUSP. Doutorado inclui DO + DD.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "F14"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "degrees",
      "year": 2024,
      "program": "MPEM",
      "level": "DO_DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano segundo o DataUSP. Doutorado inclui DO + DD.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "F15"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "credits_offered",
      "year": 2024,
      "program": "MPEM",
      "level": null,
      "value": 88,
      "status": "exact",
      "unit": "credits",
      "semantic_note": "Soma dos créditos das ofertas/turmas do ano; não multiplicada pelo número de alunos. Disciplinas repetidas em turmas distintas contribuem uma vez por turma. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "F16"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "curricular_hours",
      "year": 2024,
      "program": "MPEM",
      "level": null,
      "value": 1320,
      "status": "exact",
      "unit": "hours",
      "semantic_note": "Carga curricular total somada por turma, incluindo horas de estudos. Diferente de horas de aula e de carga docente efetiva. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "F17"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "nominal_class_hours",
      "year": 2025,
      "program": "CC",
      "level": null,
      "value": 3092,
      "status": "exact",
      "unit": "hours",
      "semantic_note": "Carga nominal de aulas: (horas semanais teóricas + práticas) × semanas, somada por turma. Exclui estudos. Não mede horas efetivamente ministradas por docente. Componentes de versões atualizadas usam a hipótese autorizada de manutenção da carga entre versões.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "B21"
      },
      "qualifiers": [
        "Carga nominal curricular, não carga docente efetiva.",
        "Hipótese autorizada: cargas mantidas quando a disciplina foi atualizada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "sections",
      "year": 2025,
      "program": "CC",
      "level": null,
      "value": 46,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Número de ofertas/turmas no ano; uma disciplina pode ter mais de uma turma.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "B22"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "enrollments",
      "year": 2025,
      "program": "CC",
      "level": null,
      "value": 579,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Totais anuais calculados como número de turmas × média publicada de matriculados por disciplina. São vínculos estudante–turma, não pessoas distintas. A disponibilidade do total não implica conhecer a distribuição entre turmas.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "B23"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "sections_lt5",
      "year": 2025,
      "program": "CC",
      "level": null,
      "value": 14,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem de turmas com 0 a 4 matriculados; exclui turmas com exatamente 5. ND quando a distribuição individual ainda não foi determinada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "B24"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "sections_gt30",
      "year": 2025,
      "program": "CC",
      "level": null,
      "value": 4,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem de turmas com pelo menos 31 matriculados; exclui turmas com exatamente 30. Não se reconstrói a distribuição individual a partir de desvio padrão.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "B25"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "active_april1",
      "year": 2025,
      "program": "CC",
      "level": "ME",
      "value": 144,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Posição em 1º de abril de cada ano, publicada no Janus. Doutorado inclui DO + DD. É uma contagem agregada publicada, sem auditoria nominal de duplicidades.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "B26"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "active_april1",
      "year": 2025,
      "program": "CC",
      "level": "DO_DD",
      "value": 65,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Posição em 1º de abril de cada ano, publicada no Janus. Doutorado inclui DO + DD. É uma contagem agregada publicada, sem auditoria nominal de duplicidades.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "B27"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "degrees",
      "year": 2025,
      "program": "CC",
      "level": "ME",
      "value": 39,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano segundo o DataUSP. Doutorado inclui DO + DD.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "B28"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "degrees",
      "year": 2025,
      "program": "CC",
      "level": "DO_DD",
      "value": 9,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano segundo o DataUSP. Doutorado inclui DO + DD.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "B29"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "credits_offered",
      "year": 2025,
      "program": "CC",
      "level": null,
      "value": 350,
      "status": "exact",
      "unit": "credits",
      "semantic_note": "Soma dos créditos das ofertas/turmas do ano; não multiplicada pelo número de alunos. Disciplinas repetidas em turmas distintas contribuem uma vez por turma.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "B30"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "curricular_hours",
      "year": 2025,
      "program": "CC",
      "level": null,
      "value": 5250,
      "status": "exact",
      "unit": "hours",
      "semantic_note": "Carga curricular total somada por turma, incluindo horas de estudos. Diferente de horas de aula e de carga docente efetiva.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "B31"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "nominal_class_hours",
      "year": 2025,
      "program": "MAT",
      "level": null,
      "value": 2144,
      "status": "exact",
      "unit": "hours",
      "semantic_note": "Carga nominal de aulas: (horas semanais teóricas + práticas) × semanas, somada por turma. Exclui estudos. Não mede horas efetivamente ministradas por docente. Componentes de versões atualizadas usam a hipótese autorizada de manutenção da carga entre versões.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "C21"
      },
      "qualifiers": [
        "Carga nominal curricular, não carga docente efetiva.",
        "Hipótese autorizada: cargas mantidas quando a disciplina foi atualizada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "sections",
      "year": 2025,
      "program": "MAT",
      "level": null,
      "value": 38,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Número de ofertas/turmas no ano; uma disciplina pode ter mais de uma turma.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "C22"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "enrollments",
      "year": 2025,
      "program": "MAT",
      "level": null,
      "value": 299,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Totais anuais calculados como número de turmas × média publicada de matriculados por disciplina. São vínculos estudante–turma, não pessoas distintas. A disponibilidade do total não implica conhecer a distribuição entre turmas.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "C23"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "sections_lt5",
      "year": 2025,
      "program": "MAT",
      "level": null,
      "value": 8,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem de turmas com 0 a 4 matriculados; exclui turmas com exatamente 5. ND quando a distribuição individual ainda não foi determinada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "C24"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "sections_gt30",
      "year": 2025,
      "program": "MAT",
      "level": null,
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem de turmas com pelo menos 31 matriculados; exclui turmas com exatamente 30. Não se reconstrói a distribuição individual a partir de desvio padrão.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "C25"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "active_april1",
      "year": 2025,
      "program": "MAT",
      "level": "ME",
      "value": 43,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Posição em 1º de abril de cada ano, publicada no Janus. Doutorado inclui DO + DD. É uma contagem agregada publicada, sem auditoria nominal de duplicidades.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "C26"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "active_april1",
      "year": 2025,
      "program": "MAT",
      "level": "DO_DD",
      "value": 72,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Posição em 1º de abril de cada ano, publicada no Janus. Doutorado inclui DO + DD. É uma contagem agregada publicada, sem auditoria nominal de duplicidades.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "C27"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "degrees",
      "year": 2025,
      "program": "MAT",
      "level": "ME",
      "value": 16,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano segundo o DataUSP. Doutorado inclui DO + DD.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "C28"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "degrees",
      "year": 2025,
      "program": "MAT",
      "level": "DO_DD",
      "value": 9,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano segundo o DataUSP. Doutorado inclui DO + DD.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "C29"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "credits_offered",
      "year": 2025,
      "program": "MAT",
      "level": null,
      "value": 279,
      "status": "exact",
      "unit": "credits",
      "semantic_note": "Soma dos créditos das ofertas/turmas do ano; não multiplicada pelo número de alunos. Disciplinas repetidas em turmas distintas contribuem uma vez por turma.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "C30"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "curricular_hours",
      "year": 2025,
      "program": "MAT",
      "level": null,
      "value": 4185,
      "status": "exact",
      "unit": "hours",
      "semantic_note": "Carga curricular total somada por turma, incluindo horas de estudos. Diferente de horas de aula e de carga docente efetiva.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "C31"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "nominal_class_hours",
      "year": 2025,
      "program": "MAP",
      "level": null,
      "value": 1116,
      "status": "exact",
      "unit": "hours",
      "semantic_note": "Carga nominal de aulas: (horas semanais teóricas + práticas) × semanas, somada por turma. Exclui estudos. Não mede horas efetivamente ministradas por docente. Componentes de versões atualizadas usam a hipótese autorizada de manutenção da carga entre versões. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "D21"
      },
      "qualifiers": [
        "Carga nominal curricular, não carga docente efetiva.",
        "Hipótese autorizada: cargas mantidas quando a disciplina foi atualizada.",
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "sections",
      "year": 2025,
      "program": "MAP",
      "level": null,
      "value": 19,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Número de ofertas/turmas no ano; uma disciplina pode ter mais de uma turma. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "D22"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "enrollments",
      "year": 2025,
      "program": "MAP",
      "level": null,
      "value": 122,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Totais anuais calculados como número de turmas × média publicada de matriculados por disciplina. São vínculos estudante–turma, não pessoas distintas. A disponibilidade do total não implica conhecer a distribuição entre turmas. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "D23"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "sections_lt5",
      "year": 2025,
      "program": "MAP",
      "level": null,
      "value": 4,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem de turmas com 0 a 4 matriculados; exclui turmas com exatamente 5. ND quando a distribuição individual ainda não foi determinada. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "D24"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "sections_gt30",
      "year": 2025,
      "program": "MAP",
      "level": null,
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem de turmas com pelo menos 31 matriculados; exclui turmas com exatamente 30. Não se reconstrói a distribuição individual a partir de desvio padrão. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "D25"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "active_april1",
      "year": 2025,
      "program": "MAP",
      "level": "ME",
      "value": 39,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Posição em 1º de abril de cada ano, publicada no Janus. Doutorado inclui DO + DD. É uma contagem agregada publicada, sem auditoria nominal de duplicidades.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "D26"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "active_april1",
      "year": 2025,
      "program": "MAP",
      "level": "DO_DD",
      "value": 63,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Posição em 1º de abril de cada ano, publicada no Janus. Doutorado inclui DO + DD. É uma contagem agregada publicada, sem auditoria nominal de duplicidades.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "D27"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "degrees",
      "year": 2025,
      "program": "MAP",
      "level": "ME",
      "value": 10,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano segundo o DataUSP. Doutorado inclui DO + DD.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "D28"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "degrees",
      "year": 2025,
      "program": "MAP",
      "level": "DO_DD",
      "value": 8,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano segundo o DataUSP. Doutorado inclui DO + DD.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "D29"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "credits_offered",
      "year": 2025,
      "program": "MAP",
      "level": null,
      "value": 138,
      "status": "exact",
      "unit": "credits",
      "semantic_note": "Soma dos créditos das ofertas/turmas do ano; não multiplicada pelo número de alunos. Disciplinas repetidas em turmas distintas contribuem uma vez por turma. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "D30"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "curricular_hours",
      "year": 2025,
      "program": "MAP",
      "level": null,
      "value": 2070,
      "status": "exact",
      "unit": "hours",
      "semantic_note": "Carga curricular total somada por turma, incluindo horas de estudos. Diferente de horas de aula e de carga docente efetiva. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "D31"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "nominal_class_hours",
      "year": 2025,
      "program": "PE",
      "level": null,
      "value": 1504,
      "status": "exact",
      "unit": "hours",
      "semantic_note": "Carga nominal de aulas: (horas semanais teóricas + práticas) × semanas, somada por turma. Exclui estudos. Não mede horas efetivamente ministradas por docente. Componentes de versões atualizadas usam a hipótese autorizada de manutenção da carga entre versões. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "E21"
      },
      "qualifiers": [
        "Carga nominal curricular, não carga docente efetiva.",
        "Hipótese autorizada: cargas mantidas quando a disciplina foi atualizada.",
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "sections",
      "year": 2025,
      "program": "PE",
      "level": null,
      "value": 22,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Número de ofertas/turmas no ano; uma disciplina pode ter mais de uma turma. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "E22"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "enrollments",
      "year": 2025,
      "program": "PE",
      "level": null,
      "value": 262,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Totais anuais calculados como número de turmas × média publicada de matriculados por disciplina. São vínculos estudante–turma, não pessoas distintas. A disponibilidade do total não implica conhecer a distribuição entre turmas. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "E23"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "sections_lt5",
      "year": 2025,
      "program": "PE",
      "level": null,
      "value": 5,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem de turmas com 0 a 4 matriculados; exclui turmas com exatamente 5. ND quando a distribuição individual ainda não foi determinada. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "E24"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "sections_gt30",
      "year": 2025,
      "program": "PE",
      "level": null,
      "value": 1,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem de turmas com pelo menos 31 matriculados; exclui turmas com exatamente 30. Não se reconstrói a distribuição individual a partir de desvio padrão. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "E25"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "active_april1",
      "year": 2025,
      "program": "PE",
      "level": "ME",
      "value": 59,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Posição em 1º de abril de cada ano, publicada no Janus. Doutorado inclui DO + DD. É uma contagem agregada publicada, sem auditoria nominal de duplicidades.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "E26"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "active_april1",
      "year": 2025,
      "program": "PE",
      "level": "DO_DD",
      "value": 50,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Posição em 1º de abril de cada ano, publicada no Janus. Doutorado inclui DO + DD. É uma contagem agregada publicada, sem auditoria nominal de duplicidades.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "E27"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "degrees",
      "year": 2025,
      "program": "PE",
      "level": "ME",
      "value": 10,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano segundo o DataUSP. Doutorado inclui DO + DD.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "E28"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "degrees",
      "year": 2025,
      "program": "PE",
      "level": "DO_DD",
      "value": 10,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano segundo o DataUSP. Doutorado inclui DO + DD.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "E29"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "credits_offered",
      "year": 2025,
      "program": "PE",
      "level": null,
      "value": 176,
      "status": "exact",
      "unit": "credits",
      "semantic_note": "Soma dos créditos das ofertas/turmas do ano; não multiplicada pelo número de alunos. Disciplinas repetidas em turmas distintas contribuem uma vez por turma. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "E30"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "curricular_hours",
      "year": 2025,
      "program": "PE",
      "level": null,
      "value": 2640,
      "status": "exact",
      "unit": "hours",
      "semantic_note": "Carga curricular total somada por turma, incluindo horas de estudos. Diferente de horas de aula e de carga docente efetiva. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "E31"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "nominal_class_hours",
      "year": 2025,
      "program": "MPEM",
      "level": null,
      "value": 792,
      "status": "exact",
      "unit": "hours",
      "semantic_note": "Carga nominal de aulas: (horas semanais teóricas + práticas) × semanas, somada por turma. Exclui estudos. Não mede horas efetivamente ministradas por docente. Componentes de versões atualizadas usam a hipótese autorizada de manutenção da carga entre versões. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "F21"
      },
      "qualifiers": [
        "Carga nominal curricular, não carga docente efetiva.",
        "Hipótese autorizada: cargas mantidas quando a disciplina foi atualizada.",
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "sections",
      "year": 2025,
      "program": "MPEM",
      "level": null,
      "value": 14,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Número de ofertas/turmas no ano; uma disciplina pode ter mais de uma turma. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "F22"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "enrollments",
      "year": 2025,
      "program": "MPEM",
      "level": null,
      "value": 242,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Totais anuais calculados como número de turmas × média publicada de matriculados por disciplina. São vínculos estudante–turma, não pessoas distintas. A disponibilidade do total não implica conhecer a distribuição entre turmas. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "F23"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "sections_lt5",
      "year": 2025,
      "program": "MPEM",
      "level": null,
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem de turmas com 0 a 4 matriculados; exclui turmas com exatamente 5. ND quando a distribuição individual ainda não foi determinada. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "F24"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "sections_gt30",
      "year": 2025,
      "program": "MPEM",
      "level": null,
      "value": 2,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Contagem de turmas com pelo menos 31 matriculados; exclui turmas com exatamente 30. Não se reconstrói a distribuição individual a partir de desvio padrão. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "F25"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "active_april1",
      "year": 2025,
      "program": "MPEM",
      "level": "ME",
      "value": 109,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Posição em 1º de abril de cada ano, publicada no Janus. Doutorado inclui DO + DD. É uma contagem agregada publicada, sem auditoria nominal de duplicidades.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "F26"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "active_april1",
      "year": 2025,
      "program": "MPEM",
      "level": "DO_DD",
      "value": null,
      "status": "NA",
      "unit": "count",
      "semantic_note": "Posição em 1º de abril de cada ano, publicada no Janus. Doutorado inclui DO + DD. É uma contagem agregada publicada, sem auditoria nominal de duplicidades.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "F27"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "degrees",
      "year": 2025,
      "program": "MPEM",
      "level": "ME",
      "value": 16,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano segundo o DataUSP. Doutorado inclui DO + DD.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "F28"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "degrees",
      "year": 2025,
      "program": "MPEM",
      "level": "DO_DD",
      "value": 0,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Títulos concedidos no ano segundo o DataUSP. Doutorado inclui DO + DD.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "F29"
      }
    },
    {
      "section": "requested_2024_2025",
      "metric": "credits_offered",
      "year": 2025,
      "program": "MPEM",
      "level": null,
      "value": 96,
      "status": "exact",
      "unit": "credits",
      "semantic_note": "Soma dos créditos das ofertas/turmas do ano; não multiplicada pelo número de alunos. Disciplinas repetidas em turmas distintas contribuem uma vez por turma. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "F30"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "section": "requested_2024_2025",
      "metric": "curricular_hours",
      "year": 2025,
      "program": "MPEM",
      "level": null,
      "value": 1440,
      "status": "exact",
      "unit": "hours",
      "semantic_note": "Carga curricular total somada por turma, incluindo horas de estudos. Diferente de horas de aula e de carga docente efetiva. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada.",
      "source": {
        "file": "quadro_solicitado_pos_2024_2025.xlsx",
        "sheet": "Quadro 2024 e 2025",
        "cell": "F31"
      },
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; a hipótese de carga entre versões é separada."
      ]
    },
    {
      "year": 2024,
      "program": "MAP",
      "metric": "courses",
      "value": 19,
      "status": "exact",
      "semantic_note": "Número de códigos de disciplinas distintos no relatório anual atribuído ao programa. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2024.html",
        "sha256": "fd4ca6214830a9e2f9ccdd20aa3d24ce1f1c9884b4a2cb6e27f46455e78dae37",
        "window_start": "2024-01-01",
        "window_end": "2024-12-31",
        "locator": "CPG45; 19 linhas de disciplinas atribuídas a MAP; coorte conciliada com 19 ofertas históricas.",
        "course_codes": [
          "MAP5004",
          "MAP5005",
          "MAP5014",
          "MAP5711",
          "MAP5712",
          "MAP5724",
          "MAP5725",
          "MAP5729",
          "MAP5732",
          "MAP5747",
          "MAP5762",
          "MAP5856",
          "MAP5902",
          "MAP5904",
          "MAP5906",
          "MAP5909",
          "MAP5915",
          "MAP5918",
          "MAP5922"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MAP5005.html",
            "sha256": "65c25c4806eaac35fc8ffa77914d280df513e9536985adbe6df401cca1d3af22",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "JANUS-ficha-MAP5918-v2.html",
            "sha256": "e0155e928a95dec518c7bae9473c1a4fe3dc863ff6ca4b52f834ea953252f357",
            "area_code": "45132",
            "locator": "Version 2; area 45132; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAP5711.html",
            "sha256": "53d7b0b306d54618fb90e2759dd1c8a8ab39ea57500b11b086414cbc281bd3ae",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5729.html",
            "sha256": "4c04ce94a0e46ca9c02f44527748e18592a356c687970b0b600bfa40347c0808",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5922.html",
            "sha256": "94f87e2cbe024d12f20449add9c847aae1236b588f3302a23fdd6f366202acfc",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5915.html",
            "sha256": "997632a4a806f89bc5ae5fa59a977143432a28794b39ad7b3afa59c3451dd5f0",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5004.html",
            "sha256": "e1add8377fe2ad42ffe0d6c3f83b8d51c8340b9a8bdb70c676f2c125c38b730a",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5725.html",
            "sha256": "089e570e5cb70ab600f3aa4df6111baa71a481227b4d0eceb1e4eba307c64d5f",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "JANUS-ficha-MAP5747-v4.html",
            "sha256": "4dbadf79d11b5e5167dff647c6d726fc07d304751d0c99caae4eae93c8a36873",
            "area_code": "45132",
            "locator": "Version 4; area 45132; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAP5724.html",
            "sha256": "8632693a5c66d9a8be7ef235b587c14edfafed8fa972f01845dd7e5ed96896ee",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5904.html",
            "sha256": "480a0fb36ea77c1936689f8b31b22bd6089a6ea32791e5bdcbcf3f4a22e0d2e9",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5732.html",
            "sha256": "ff934bc3b536c3a2fb6eff95e1c1dbaa607b9fff50be272c0290bdb49bdb50a1",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5856.html",
            "sha256": "a2a1c124a0b5ed7205e25f15f8fd91f15bbda11f9e94fe75bbceda10280426ac",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5712.html",
            "sha256": "7fb73da1671456e151b3277d764c48289749ff710bd2ab1c5e14e56821f225d9",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "JANUS-ficha-MAP5909-v2.html",
            "sha256": "53992e6e5826a8c61a77ba75437d0a8172ebc411aec3b95bf3d99949896bcd7e",
            "area_code": "45132",
            "locator": "Version 2; area 45132; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAP5902.html",
            "sha256": "22d3187b23e5851b769bf978570a789bd2a239a62c800121886d5e073336c878",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5906.html",
            "sha256": "a20acd59f24f2b73d17762400228dbd7f3dd22b17769e284f6ddd6796480f440",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5762.html",
            "sha256": "684701902f42aaed414e67c6b97e470658896ba551f6b02a9b8b86003ef623d0",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5014.html",
            "sha256": "81ed26c190cecdd4ddd3ec28c99281e355e9ad533a8d297a821ef9706de943c6",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2024,
      "program": "MAP",
      "metric": "sections",
      "value": 19,
      "status": "exact",
      "semantic_note": "Soma do número de turmas publicado por disciplina. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2024.html",
        "sha256": "fd4ca6214830a9e2f9ccdd20aa3d24ce1f1c9884b4a2cb6e27f46455e78dae37",
        "window_start": "2024-01-01",
        "window_end": "2024-12-31",
        "locator": "CPG45; 19 linhas de disciplinas atribuídas a MAP; coorte conciliada com 19 ofertas históricas.",
        "course_codes": [
          "MAP5004",
          "MAP5005",
          "MAP5014",
          "MAP5711",
          "MAP5712",
          "MAP5724",
          "MAP5725",
          "MAP5729",
          "MAP5732",
          "MAP5747",
          "MAP5762",
          "MAP5856",
          "MAP5902",
          "MAP5904",
          "MAP5906",
          "MAP5909",
          "MAP5915",
          "MAP5918",
          "MAP5922"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MAP5005.html",
            "sha256": "65c25c4806eaac35fc8ffa77914d280df513e9536985adbe6df401cca1d3af22",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "JANUS-ficha-MAP5918-v2.html",
            "sha256": "e0155e928a95dec518c7bae9473c1a4fe3dc863ff6ca4b52f834ea953252f357",
            "area_code": "45132",
            "locator": "Version 2; area 45132; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAP5711.html",
            "sha256": "53d7b0b306d54618fb90e2759dd1c8a8ab39ea57500b11b086414cbc281bd3ae",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5729.html",
            "sha256": "4c04ce94a0e46ca9c02f44527748e18592a356c687970b0b600bfa40347c0808",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5922.html",
            "sha256": "94f87e2cbe024d12f20449add9c847aae1236b588f3302a23fdd6f366202acfc",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5915.html",
            "sha256": "997632a4a806f89bc5ae5fa59a977143432a28794b39ad7b3afa59c3451dd5f0",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5004.html",
            "sha256": "e1add8377fe2ad42ffe0d6c3f83b8d51c8340b9a8bdb70c676f2c125c38b730a",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5725.html",
            "sha256": "089e570e5cb70ab600f3aa4df6111baa71a481227b4d0eceb1e4eba307c64d5f",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "JANUS-ficha-MAP5747-v4.html",
            "sha256": "4dbadf79d11b5e5167dff647c6d726fc07d304751d0c99caae4eae93c8a36873",
            "area_code": "45132",
            "locator": "Version 4; area 45132; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAP5724.html",
            "sha256": "8632693a5c66d9a8be7ef235b587c14edfafed8fa972f01845dd7e5ed96896ee",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5904.html",
            "sha256": "480a0fb36ea77c1936689f8b31b22bd6089a6ea32791e5bdcbcf3f4a22e0d2e9",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5732.html",
            "sha256": "ff934bc3b536c3a2fb6eff95e1c1dbaa607b9fff50be272c0290bdb49bdb50a1",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5856.html",
            "sha256": "a2a1c124a0b5ed7205e25f15f8fd91f15bbda11f9e94fe75bbceda10280426ac",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5712.html",
            "sha256": "7fb73da1671456e151b3277d764c48289749ff710bd2ab1c5e14e56821f225d9",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "JANUS-ficha-MAP5909-v2.html",
            "sha256": "53992e6e5826a8c61a77ba75437d0a8172ebc411aec3b95bf3d99949896bcd7e",
            "area_code": "45132",
            "locator": "Version 2; area 45132; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAP5902.html",
            "sha256": "22d3187b23e5851b769bf978570a789bd2a239a62c800121886d5e073336c878",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5906.html",
            "sha256": "a20acd59f24f2b73d17762400228dbd7f3dd22b17769e284f6ddd6796480f440",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5762.html",
            "sha256": "684701902f42aaed414e67c6b97e470658896ba551f6b02a9b8b86003ef623d0",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5014.html",
            "sha256": "81ed26c190cecdd4ddd3ec28c99281e355e9ad533a8d297a821ef9706de943c6",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2024,
      "program": "MAP",
      "metric": "applications",
      "value": 208,
      "status": "exact",
      "semantic_note": "Soma de turmas × média publicada de inscritos. Inscrições não equivalem a matrículas até o final do oferecimento. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão. Cálculo aritmético com grupos de uma ou duas turmas e totais inteiros; nenhuma inferência de distribuição por desvio padrão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2024.html",
        "sha256": "fd4ca6214830a9e2f9ccdd20aa3d24ce1f1c9884b4a2cb6e27f46455e78dae37",
        "window_start": "2024-01-01",
        "window_end": "2024-12-31",
        "locator": "CPG45; 19 linhas de disciplinas atribuídas a MAP; coorte conciliada com 19 ofertas históricas.",
        "course_codes": [
          "MAP5004",
          "MAP5005",
          "MAP5014",
          "MAP5711",
          "MAP5712",
          "MAP5724",
          "MAP5725",
          "MAP5729",
          "MAP5732",
          "MAP5747",
          "MAP5762",
          "MAP5856",
          "MAP5902",
          "MAP5904",
          "MAP5906",
          "MAP5909",
          "MAP5915",
          "MAP5918",
          "MAP5922"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MAP5005.html",
            "sha256": "65c25c4806eaac35fc8ffa77914d280df513e9536985adbe6df401cca1d3af22",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "JANUS-ficha-MAP5918-v2.html",
            "sha256": "e0155e928a95dec518c7bae9473c1a4fe3dc863ff6ca4b52f834ea953252f357",
            "area_code": "45132",
            "locator": "Version 2; area 45132; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAP5711.html",
            "sha256": "53d7b0b306d54618fb90e2759dd1c8a8ab39ea57500b11b086414cbc281bd3ae",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5729.html",
            "sha256": "4c04ce94a0e46ca9c02f44527748e18592a356c687970b0b600bfa40347c0808",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5922.html",
            "sha256": "94f87e2cbe024d12f20449add9c847aae1236b588f3302a23fdd6f366202acfc",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5915.html",
            "sha256": "997632a4a806f89bc5ae5fa59a977143432a28794b39ad7b3afa59c3451dd5f0",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5004.html",
            "sha256": "e1add8377fe2ad42ffe0d6c3f83b8d51c8340b9a8bdb70c676f2c125c38b730a",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5725.html",
            "sha256": "089e570e5cb70ab600f3aa4df6111baa71a481227b4d0eceb1e4eba307c64d5f",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "JANUS-ficha-MAP5747-v4.html",
            "sha256": "4dbadf79d11b5e5167dff647c6d726fc07d304751d0c99caae4eae93c8a36873",
            "area_code": "45132",
            "locator": "Version 4; area 45132; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAP5724.html",
            "sha256": "8632693a5c66d9a8be7ef235b587c14edfafed8fa972f01845dd7e5ed96896ee",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5904.html",
            "sha256": "480a0fb36ea77c1936689f8b31b22bd6089a6ea32791e5bdcbcf3f4a22e0d2e9",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5732.html",
            "sha256": "ff934bc3b536c3a2fb6eff95e1c1dbaa607b9fff50be272c0290bdb49bdb50a1",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5856.html",
            "sha256": "a2a1c124a0b5ed7205e25f15f8fd91f15bbda11f9e94fe75bbceda10280426ac",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5712.html",
            "sha256": "7fb73da1671456e151b3277d764c48289749ff710bd2ab1c5e14e56821f225d9",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "JANUS-ficha-MAP5909-v2.html",
            "sha256": "53992e6e5826a8c61a77ba75437d0a8172ebc411aec3b95bf3d99949896bcd7e",
            "area_code": "45132",
            "locator": "Version 2; area 45132; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAP5902.html",
            "sha256": "22d3187b23e5851b769bf978570a789bd2a239a62c800121886d5e073336c878",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5906.html",
            "sha256": "a20acd59f24f2b73d17762400228dbd7f3dd22b17769e284f6ddd6796480f440",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5762.html",
            "sha256": "684701902f42aaed414e67c6b97e470658896ba551f6b02a9b8b86003ef623d0",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5014.html",
            "sha256": "81ed26c190cecdd4ddd3ec28c99281e355e9ad533a8d297a821ef9706de943c6",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2024,
      "program": "MAP",
      "metric": "enrollments",
      "value": 188,
      "status": "exact",
      "semantic_note": "Soma de turmas × média publicada de matriculados que permaneceram até o final do oferecimento. São vínculos estudante–turma, não estudantes distintos. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão. Cálculo aritmético com grupos de uma ou duas turmas e totais inteiros; nenhuma inferência de distribuição por desvio padrão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2024.html",
        "sha256": "fd4ca6214830a9e2f9ccdd20aa3d24ce1f1c9884b4a2cb6e27f46455e78dae37",
        "window_start": "2024-01-01",
        "window_end": "2024-12-31",
        "locator": "CPG45; 19 linhas de disciplinas atribuídas a MAP; coorte conciliada com 19 ofertas históricas.",
        "course_codes": [
          "MAP5004",
          "MAP5005",
          "MAP5014",
          "MAP5711",
          "MAP5712",
          "MAP5724",
          "MAP5725",
          "MAP5729",
          "MAP5732",
          "MAP5747",
          "MAP5762",
          "MAP5856",
          "MAP5902",
          "MAP5904",
          "MAP5906",
          "MAP5909",
          "MAP5915",
          "MAP5918",
          "MAP5922"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MAP5005.html",
            "sha256": "65c25c4806eaac35fc8ffa77914d280df513e9536985adbe6df401cca1d3af22",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "JANUS-ficha-MAP5918-v2.html",
            "sha256": "e0155e928a95dec518c7bae9473c1a4fe3dc863ff6ca4b52f834ea953252f357",
            "area_code": "45132",
            "locator": "Version 2; area 45132; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAP5711.html",
            "sha256": "53d7b0b306d54618fb90e2759dd1c8a8ab39ea57500b11b086414cbc281bd3ae",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5729.html",
            "sha256": "4c04ce94a0e46ca9c02f44527748e18592a356c687970b0b600bfa40347c0808",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5922.html",
            "sha256": "94f87e2cbe024d12f20449add9c847aae1236b588f3302a23fdd6f366202acfc",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5915.html",
            "sha256": "997632a4a806f89bc5ae5fa59a977143432a28794b39ad7b3afa59c3451dd5f0",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5004.html",
            "sha256": "e1add8377fe2ad42ffe0d6c3f83b8d51c8340b9a8bdb70c676f2c125c38b730a",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5725.html",
            "sha256": "089e570e5cb70ab600f3aa4df6111baa71a481227b4d0eceb1e4eba307c64d5f",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "JANUS-ficha-MAP5747-v4.html",
            "sha256": "4dbadf79d11b5e5167dff647c6d726fc07d304751d0c99caae4eae93c8a36873",
            "area_code": "45132",
            "locator": "Version 4; area 45132; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAP5724.html",
            "sha256": "8632693a5c66d9a8be7ef235b587c14edfafed8fa972f01845dd7e5ed96896ee",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5904.html",
            "sha256": "480a0fb36ea77c1936689f8b31b22bd6089a6ea32791e5bdcbcf3f4a22e0d2e9",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5732.html",
            "sha256": "ff934bc3b536c3a2fb6eff95e1c1dbaa607b9fff50be272c0290bdb49bdb50a1",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5856.html",
            "sha256": "a2a1c124a0b5ed7205e25f15f8fd91f15bbda11f9e94fe75bbceda10280426ac",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5712.html",
            "sha256": "7fb73da1671456e151b3277d764c48289749ff710bd2ab1c5e14e56821f225d9",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "JANUS-ficha-MAP5909-v2.html",
            "sha256": "53992e6e5826a8c61a77ba75437d0a8172ebc411aec3b95bf3d99949896bcd7e",
            "area_code": "45132",
            "locator": "Version 2; area 45132; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAP5902.html",
            "sha256": "22d3187b23e5851b769bf978570a789bd2a239a62c800121886d5e073336c878",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5906.html",
            "sha256": "a20acd59f24f2b73d17762400228dbd7f3dd22b17769e284f6ddd6796480f440",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5762.html",
            "sha256": "684701902f42aaed414e67c6b97e470658896ba551f6b02a9b8b86003ef623d0",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5014.html",
            "sha256": "81ed26c190cecdd4ddd3ec28c99281e355e9ad533a8d297a821ef9706de943c6",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2024,
      "program": "MAP",
      "metric": "approvals",
      "value": 141,
      "status": "exact",
      "semantic_note": "Soma de turmas × média publicada de aprovados em disciplinas, não diplomas/titulações. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão. Cálculo aritmético com grupos de uma ou duas turmas e totais inteiros; nenhuma inferência de distribuição por desvio padrão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2024.html",
        "sha256": "fd4ca6214830a9e2f9ccdd20aa3d24ce1f1c9884b4a2cb6e27f46455e78dae37",
        "window_start": "2024-01-01",
        "window_end": "2024-12-31",
        "locator": "CPG45; 19 linhas de disciplinas atribuídas a MAP; coorte conciliada com 19 ofertas históricas.",
        "course_codes": [
          "MAP5004",
          "MAP5005",
          "MAP5014",
          "MAP5711",
          "MAP5712",
          "MAP5724",
          "MAP5725",
          "MAP5729",
          "MAP5732",
          "MAP5747",
          "MAP5762",
          "MAP5856",
          "MAP5902",
          "MAP5904",
          "MAP5906",
          "MAP5909",
          "MAP5915",
          "MAP5918",
          "MAP5922"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MAP5005.html",
            "sha256": "65c25c4806eaac35fc8ffa77914d280df513e9536985adbe6df401cca1d3af22",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "JANUS-ficha-MAP5918-v2.html",
            "sha256": "e0155e928a95dec518c7bae9473c1a4fe3dc863ff6ca4b52f834ea953252f357",
            "area_code": "45132",
            "locator": "Version 2; area 45132; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAP5711.html",
            "sha256": "53d7b0b306d54618fb90e2759dd1c8a8ab39ea57500b11b086414cbc281bd3ae",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5729.html",
            "sha256": "4c04ce94a0e46ca9c02f44527748e18592a356c687970b0b600bfa40347c0808",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5922.html",
            "sha256": "94f87e2cbe024d12f20449add9c847aae1236b588f3302a23fdd6f366202acfc",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5915.html",
            "sha256": "997632a4a806f89bc5ae5fa59a977143432a28794b39ad7b3afa59c3451dd5f0",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5004.html",
            "sha256": "e1add8377fe2ad42ffe0d6c3f83b8d51c8340b9a8bdb70c676f2c125c38b730a",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5725.html",
            "sha256": "089e570e5cb70ab600f3aa4df6111baa71a481227b4d0eceb1e4eba307c64d5f",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "JANUS-ficha-MAP5747-v4.html",
            "sha256": "4dbadf79d11b5e5167dff647c6d726fc07d304751d0c99caae4eae93c8a36873",
            "area_code": "45132",
            "locator": "Version 4; area 45132; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAP5724.html",
            "sha256": "8632693a5c66d9a8be7ef235b587c14edfafed8fa972f01845dd7e5ed96896ee",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5904.html",
            "sha256": "480a0fb36ea77c1936689f8b31b22bd6089a6ea32791e5bdcbcf3f4a22e0d2e9",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5732.html",
            "sha256": "ff934bc3b536c3a2fb6eff95e1c1dbaa607b9fff50be272c0290bdb49bdb50a1",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5856.html",
            "sha256": "a2a1c124a0b5ed7205e25f15f8fd91f15bbda11f9e94fe75bbceda10280426ac",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5712.html",
            "sha256": "7fb73da1671456e151b3277d764c48289749ff710bd2ab1c5e14e56821f225d9",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "JANUS-ficha-MAP5909-v2.html",
            "sha256": "53992e6e5826a8c61a77ba75437d0a8172ebc411aec3b95bf3d99949896bcd7e",
            "area_code": "45132",
            "locator": "Version 2; area 45132; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAP5902.html",
            "sha256": "22d3187b23e5851b769bf978570a789bd2a239a62c800121886d5e073336c878",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5906.html",
            "sha256": "a20acd59f24f2b73d17762400228dbd7f3dd22b17769e284f6ddd6796480f440",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5762.html",
            "sha256": "684701902f42aaed414e67c6b97e470658896ba551f6b02a9b8b86003ef623d0",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5014.html",
            "sha256": "81ed26c190cecdd4ddd3ec28c99281e355e9ad533a8d297a821ef9706de943c6",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2024,
      "program": "MAP",
      "metric": "enrollments_per_section",
      "value": 9.894736842105264,
      "status": "exact",
      "semantic_note": "Total de matrículas dividido pelo número de turmas; média ponderada, não média simples entre disciplinas. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão. Cálculo aritmético com grupos de uma ou duas turmas e totais inteiros; nenhuma inferência de distribuição por desvio padrão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2024.html",
        "sha256": "fd4ca6214830a9e2f9ccdd20aa3d24ce1f1c9884b4a2cb6e27f46455e78dae37",
        "window_start": "2024-01-01",
        "window_end": "2024-12-31",
        "locator": "CPG45; 19 linhas de disciplinas atribuídas a MAP; coorte conciliada com 19 ofertas históricas.",
        "course_codes": [
          "MAP5004",
          "MAP5005",
          "MAP5014",
          "MAP5711",
          "MAP5712",
          "MAP5724",
          "MAP5725",
          "MAP5729",
          "MAP5732",
          "MAP5747",
          "MAP5762",
          "MAP5856",
          "MAP5902",
          "MAP5904",
          "MAP5906",
          "MAP5909",
          "MAP5915",
          "MAP5918",
          "MAP5922"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MAP5005.html",
            "sha256": "65c25c4806eaac35fc8ffa77914d280df513e9536985adbe6df401cca1d3af22",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "JANUS-ficha-MAP5918-v2.html",
            "sha256": "e0155e928a95dec518c7bae9473c1a4fe3dc863ff6ca4b52f834ea953252f357",
            "area_code": "45132",
            "locator": "Version 2; area 45132; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAP5711.html",
            "sha256": "53d7b0b306d54618fb90e2759dd1c8a8ab39ea57500b11b086414cbc281bd3ae",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5729.html",
            "sha256": "4c04ce94a0e46ca9c02f44527748e18592a356c687970b0b600bfa40347c0808",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5922.html",
            "sha256": "94f87e2cbe024d12f20449add9c847aae1236b588f3302a23fdd6f366202acfc",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5915.html",
            "sha256": "997632a4a806f89bc5ae5fa59a977143432a28794b39ad7b3afa59c3451dd5f0",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5004.html",
            "sha256": "e1add8377fe2ad42ffe0d6c3f83b8d51c8340b9a8bdb70c676f2c125c38b730a",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5725.html",
            "sha256": "089e570e5cb70ab600f3aa4df6111baa71a481227b4d0eceb1e4eba307c64d5f",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "JANUS-ficha-MAP5747-v4.html",
            "sha256": "4dbadf79d11b5e5167dff647c6d726fc07d304751d0c99caae4eae93c8a36873",
            "area_code": "45132",
            "locator": "Version 4; area 45132; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAP5724.html",
            "sha256": "8632693a5c66d9a8be7ef235b587c14edfafed8fa972f01845dd7e5ed96896ee",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5904.html",
            "sha256": "480a0fb36ea77c1936689f8b31b22bd6089a6ea32791e5bdcbcf3f4a22e0d2e9",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5732.html",
            "sha256": "ff934bc3b536c3a2fb6eff95e1c1dbaa607b9fff50be272c0290bdb49bdb50a1",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5856.html",
            "sha256": "a2a1c124a0b5ed7205e25f15f8fd91f15bbda11f9e94fe75bbceda10280426ac",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5712.html",
            "sha256": "7fb73da1671456e151b3277d764c48289749ff710bd2ab1c5e14e56821f225d9",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "JANUS-ficha-MAP5909-v2.html",
            "sha256": "53992e6e5826a8c61a77ba75437d0a8172ebc411aec3b95bf3d99949896bcd7e",
            "area_code": "45132",
            "locator": "Version 2; area 45132; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAP5902.html",
            "sha256": "22d3187b23e5851b769bf978570a789bd2a239a62c800121886d5e073336c878",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5906.html",
            "sha256": "a20acd59f24f2b73d17762400228dbd7f3dd22b17769e284f6ddd6796480f440",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5762.html",
            "sha256": "684701902f42aaed414e67c6b97e470658896ba551f6b02a9b8b86003ef623d0",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5014.html",
            "sha256": "81ed26c190cecdd4ddd3ec28c99281e355e9ad533a8d297a821ef9706de943c6",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2024,
      "program": "MAP",
      "metric": "approval_rate",
      "value": 0.75,
      "status": "exact",
      "semantic_note": "Aprovações em disciplinas divididas pelas matrículas até o final do oferecimento. Armazenada como fração0–1; ND se denominador zero. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão. Cálculo aritmético com grupos de uma ou duas turmas e totais inteiros; nenhuma inferência de distribuição por desvio padrão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2024.html",
        "sha256": "fd4ca6214830a9e2f9ccdd20aa3d24ce1f1c9884b4a2cb6e27f46455e78dae37",
        "window_start": "2024-01-01",
        "window_end": "2024-12-31",
        "locator": "CPG45; 19 linhas de disciplinas atribuídas a MAP; coorte conciliada com 19 ofertas históricas.",
        "course_codes": [
          "MAP5004",
          "MAP5005",
          "MAP5014",
          "MAP5711",
          "MAP5712",
          "MAP5724",
          "MAP5725",
          "MAP5729",
          "MAP5732",
          "MAP5747",
          "MAP5762",
          "MAP5856",
          "MAP5902",
          "MAP5904",
          "MAP5906",
          "MAP5909",
          "MAP5915",
          "MAP5918",
          "MAP5922"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MAP5005.html",
            "sha256": "65c25c4806eaac35fc8ffa77914d280df513e9536985adbe6df401cca1d3af22",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "JANUS-ficha-MAP5918-v2.html",
            "sha256": "e0155e928a95dec518c7bae9473c1a4fe3dc863ff6ca4b52f834ea953252f357",
            "area_code": "45132",
            "locator": "Version 2; area 45132; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAP5711.html",
            "sha256": "53d7b0b306d54618fb90e2759dd1c8a8ab39ea57500b11b086414cbc281bd3ae",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5729.html",
            "sha256": "4c04ce94a0e46ca9c02f44527748e18592a356c687970b0b600bfa40347c0808",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5922.html",
            "sha256": "94f87e2cbe024d12f20449add9c847aae1236b588f3302a23fdd6f366202acfc",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5915.html",
            "sha256": "997632a4a806f89bc5ae5fa59a977143432a28794b39ad7b3afa59c3451dd5f0",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5004.html",
            "sha256": "e1add8377fe2ad42ffe0d6c3f83b8d51c8340b9a8bdb70c676f2c125c38b730a",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5725.html",
            "sha256": "089e570e5cb70ab600f3aa4df6111baa71a481227b4d0eceb1e4eba307c64d5f",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "JANUS-ficha-MAP5747-v4.html",
            "sha256": "4dbadf79d11b5e5167dff647c6d726fc07d304751d0c99caae4eae93c8a36873",
            "area_code": "45132",
            "locator": "Version 4; area 45132; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAP5724.html",
            "sha256": "8632693a5c66d9a8be7ef235b587c14edfafed8fa972f01845dd7e5ed96896ee",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5904.html",
            "sha256": "480a0fb36ea77c1936689f8b31b22bd6089a6ea32791e5bdcbcf3f4a22e0d2e9",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5732.html",
            "sha256": "ff934bc3b536c3a2fb6eff95e1c1dbaa607b9fff50be272c0290bdb49bdb50a1",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5856.html",
            "sha256": "a2a1c124a0b5ed7205e25f15f8fd91f15bbda11f9e94fe75bbceda10280426ac",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5712.html",
            "sha256": "7fb73da1671456e151b3277d764c48289749ff710bd2ab1c5e14e56821f225d9",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "JANUS-ficha-MAP5909-v2.html",
            "sha256": "53992e6e5826a8c61a77ba75437d0a8172ebc411aec3b95bf3d99949896bcd7e",
            "area_code": "45132",
            "locator": "Version 2; area 45132; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAP5902.html",
            "sha256": "22d3187b23e5851b769bf978570a789bd2a239a62c800121886d5e073336c878",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5906.html",
            "sha256": "a20acd59f24f2b73d17762400228dbd7f3dd22b17769e284f6ddd6796480f440",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5762.html",
            "sha256": "684701902f42aaed414e67c6b97e470658896ba551f6b02a9b8b86003ef623d0",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5014.html",
            "sha256": "81ed26c190cecdd4ddd3ec28c99281e355e9ad533a8d297a821ef9706de943c6",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "ratio"
    },
    {
      "year": 2024,
      "program": "PE",
      "metric": "courses",
      "value": 23,
      "status": "exact",
      "semantic_note": "Número de códigos de disciplinas distintos no relatório anual atribuído ao programa. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2024.html",
        "sha256": "fd4ca6214830a9e2f9ccdd20aa3d24ce1f1c9884b4a2cb6e27f46455e78dae37",
        "window_start": "2024-01-01",
        "window_end": "2024-12-31",
        "locator": "CPG45; 23 linhas de disciplinas atribuídas a PE; coorte conciliada com 23 ofertas históricas.",
        "course_codes": [
          "MAE5702",
          "MAE5703",
          "MAE5705",
          "MAE5709",
          "MAE5741",
          "MAE5748",
          "MAE5753",
          "MAE5755",
          "MAE5763",
          "MAE5776",
          "MAE5811",
          "MAE5834",
          "MAE5835",
          "MAE5870",
          "MAE5879",
          "MAE5882",
          "MAE5896",
          "MAE5902",
          "MAE5904",
          "MAE5905",
          "MAE5910",
          "MAE5911",
          "MAE5913"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MAE5905.html",
            "sha256": "2541253042ae6a30220e45f42275cd7f505a31caae0ca3f72d03f05606401661",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5702.html",
            "sha256": "0081326630e98448577aa23cdb6cdc43af39519deadc22f1cd2c0572b98e7e6e",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5870.html",
            "sha256": "77fff2107a5ca006fb0537c0396354047db8a040972281b49645c072ff456f33",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5911.html",
            "sha256": "555a53e7c553d11d08560b57975e5244c52de6f7b2a5c3fbaf11b3c730a45282",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5910.html",
            "sha256": "05cb364c3147de853fa3fa59e85e4ccf0e0029ae9cc725985ddfffc9ff44ef33",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5834.html",
            "sha256": "7bad337365b098e9c5dfdd305f242103d788871781efb5eb07abb8dce3dcb95d",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5705.html",
            "sha256": "90872e8401b32cd466ae8f2c01e4263a3fc162ec3a183f7bcd297f5cde93e8c2",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "JANUS-ficha-MAE5753-v5.html",
            "sha256": "c6b8d4fd363864723784e7b477257aa92ecc74b71307d02422803e51dfd56bbf",
            "area_code": "45133",
            "locator": "Version 5; area 45133; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAE5755.html",
            "sha256": "7115bc48df82b0a65e2fd136eaaf91dfea0bc13e82d71d7bf14d1c352e5d7a1b",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5811.html",
            "sha256": "3e2662b16b6909e0a2bd5a80f2a46484356dd0936075d94ee508d5face2dd038",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5748.html",
            "sha256": "813b0ceb31f99407e2635dd8b7cf30eded4c8674eb35a4adf8c2cbdb0634d578",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5882.html",
            "sha256": "5dedd1098de5ae06520508dd404e30cef50c354436a0592b6edd2cc6517bd162",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "JANUS-ficha-MAE5763-v8.html",
            "sha256": "f062ef91dbb16e39055bf8e0856a97f0529eb6793685423650865a4c7da8d6c0",
            "area_code": "45133",
            "locator": "Version 8; area 45133; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAE5709.html",
            "sha256": "34bde3f4161f1cfb7cb7a7136b01c4062e56324c2ea2f6afa87170696f313cc0",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5904.html",
            "sha256": "e198a4e9d605fab1133514ae1d465b2f9c4714951921432dcd6f8f93f55dc69e",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5913.html",
            "sha256": "4e08f3b7685a76b0c865d07fe6f46b917fea66412629cebd687a5e8a480ab604",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5902.html",
            "sha256": "a1c19bf6e56e8cf706c9aa190f2b037c73c8ac9fb9039beb7ada1fbf5d80bf13",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5703.html",
            "sha256": "929742e7ce6854129c1c7574883f9ff994759fc9371c00099f9579fb078b5746",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5741.html",
            "sha256": "96e70b1afa6d779a6819beeec6f861a69c79b6d0e37b75b2c73836d2335b1635",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5776.html",
            "sha256": "971912a078d7ee7757319ca055b2da4444e1e12c7c9f4fbf8ad1b20055ac7143",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5896.html",
            "sha256": "0d58c5d8d70e4b5f2b15fecdb552f9dd03ea09d185989efcc0621ae2410d4d17",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5835.html",
            "sha256": "842ec6fca4c96a7f85ec59ec62cb152b84bca5b31cf1f9b33613d621fc30a9f8",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "JANUS-ficha-MAE5879-v5.html",
            "sha256": "a5a790a2c12052e4448d100e6848c8095ab640a2c48f9925cf77a112069856e4",
            "area_code": "45133",
            "locator": "Version 5; area 45133; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2024,
      "program": "PE",
      "metric": "sections",
      "value": 23,
      "status": "exact",
      "semantic_note": "Soma do número de turmas publicado por disciplina. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2024.html",
        "sha256": "fd4ca6214830a9e2f9ccdd20aa3d24ce1f1c9884b4a2cb6e27f46455e78dae37",
        "window_start": "2024-01-01",
        "window_end": "2024-12-31",
        "locator": "CPG45; 23 linhas de disciplinas atribuídas a PE; coorte conciliada com 23 ofertas históricas.",
        "course_codes": [
          "MAE5702",
          "MAE5703",
          "MAE5705",
          "MAE5709",
          "MAE5741",
          "MAE5748",
          "MAE5753",
          "MAE5755",
          "MAE5763",
          "MAE5776",
          "MAE5811",
          "MAE5834",
          "MAE5835",
          "MAE5870",
          "MAE5879",
          "MAE5882",
          "MAE5896",
          "MAE5902",
          "MAE5904",
          "MAE5905",
          "MAE5910",
          "MAE5911",
          "MAE5913"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MAE5905.html",
            "sha256": "2541253042ae6a30220e45f42275cd7f505a31caae0ca3f72d03f05606401661",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5702.html",
            "sha256": "0081326630e98448577aa23cdb6cdc43af39519deadc22f1cd2c0572b98e7e6e",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5870.html",
            "sha256": "77fff2107a5ca006fb0537c0396354047db8a040972281b49645c072ff456f33",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5911.html",
            "sha256": "555a53e7c553d11d08560b57975e5244c52de6f7b2a5c3fbaf11b3c730a45282",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5910.html",
            "sha256": "05cb364c3147de853fa3fa59e85e4ccf0e0029ae9cc725985ddfffc9ff44ef33",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5834.html",
            "sha256": "7bad337365b098e9c5dfdd305f242103d788871781efb5eb07abb8dce3dcb95d",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5705.html",
            "sha256": "90872e8401b32cd466ae8f2c01e4263a3fc162ec3a183f7bcd297f5cde93e8c2",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "JANUS-ficha-MAE5753-v5.html",
            "sha256": "c6b8d4fd363864723784e7b477257aa92ecc74b71307d02422803e51dfd56bbf",
            "area_code": "45133",
            "locator": "Version 5; area 45133; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAE5755.html",
            "sha256": "7115bc48df82b0a65e2fd136eaaf91dfea0bc13e82d71d7bf14d1c352e5d7a1b",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5811.html",
            "sha256": "3e2662b16b6909e0a2bd5a80f2a46484356dd0936075d94ee508d5face2dd038",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5748.html",
            "sha256": "813b0ceb31f99407e2635dd8b7cf30eded4c8674eb35a4adf8c2cbdb0634d578",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5882.html",
            "sha256": "5dedd1098de5ae06520508dd404e30cef50c354436a0592b6edd2cc6517bd162",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "JANUS-ficha-MAE5763-v8.html",
            "sha256": "f062ef91dbb16e39055bf8e0856a97f0529eb6793685423650865a4c7da8d6c0",
            "area_code": "45133",
            "locator": "Version 8; area 45133; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAE5709.html",
            "sha256": "34bde3f4161f1cfb7cb7a7136b01c4062e56324c2ea2f6afa87170696f313cc0",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5904.html",
            "sha256": "e198a4e9d605fab1133514ae1d465b2f9c4714951921432dcd6f8f93f55dc69e",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5913.html",
            "sha256": "4e08f3b7685a76b0c865d07fe6f46b917fea66412629cebd687a5e8a480ab604",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5902.html",
            "sha256": "a1c19bf6e56e8cf706c9aa190f2b037c73c8ac9fb9039beb7ada1fbf5d80bf13",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5703.html",
            "sha256": "929742e7ce6854129c1c7574883f9ff994759fc9371c00099f9579fb078b5746",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5741.html",
            "sha256": "96e70b1afa6d779a6819beeec6f861a69c79b6d0e37b75b2c73836d2335b1635",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5776.html",
            "sha256": "971912a078d7ee7757319ca055b2da4444e1e12c7c9f4fbf8ad1b20055ac7143",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5896.html",
            "sha256": "0d58c5d8d70e4b5f2b15fecdb552f9dd03ea09d185989efcc0621ae2410d4d17",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5835.html",
            "sha256": "842ec6fca4c96a7f85ec59ec62cb152b84bca5b31cf1f9b33613d621fc30a9f8",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "JANUS-ficha-MAE5879-v5.html",
            "sha256": "a5a790a2c12052e4448d100e6848c8095ab640a2c48f9925cf77a112069856e4",
            "area_code": "45133",
            "locator": "Version 5; area 45133; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2024,
      "program": "PE",
      "metric": "applications",
      "value": 268,
      "status": "exact",
      "semantic_note": "Soma de turmas × média publicada de inscritos. Inscrições não equivalem a matrículas até o final do oferecimento. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão. Cálculo aritmético com grupos de uma ou duas turmas e totais inteiros; nenhuma inferência de distribuição por desvio padrão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2024.html",
        "sha256": "fd4ca6214830a9e2f9ccdd20aa3d24ce1f1c9884b4a2cb6e27f46455e78dae37",
        "window_start": "2024-01-01",
        "window_end": "2024-12-31",
        "locator": "CPG45; 23 linhas de disciplinas atribuídas a PE; coorte conciliada com 23 ofertas históricas.",
        "course_codes": [
          "MAE5702",
          "MAE5703",
          "MAE5705",
          "MAE5709",
          "MAE5741",
          "MAE5748",
          "MAE5753",
          "MAE5755",
          "MAE5763",
          "MAE5776",
          "MAE5811",
          "MAE5834",
          "MAE5835",
          "MAE5870",
          "MAE5879",
          "MAE5882",
          "MAE5896",
          "MAE5902",
          "MAE5904",
          "MAE5905",
          "MAE5910",
          "MAE5911",
          "MAE5913"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MAE5905.html",
            "sha256": "2541253042ae6a30220e45f42275cd7f505a31caae0ca3f72d03f05606401661",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5702.html",
            "sha256": "0081326630e98448577aa23cdb6cdc43af39519deadc22f1cd2c0572b98e7e6e",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5870.html",
            "sha256": "77fff2107a5ca006fb0537c0396354047db8a040972281b49645c072ff456f33",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5911.html",
            "sha256": "555a53e7c553d11d08560b57975e5244c52de6f7b2a5c3fbaf11b3c730a45282",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5910.html",
            "sha256": "05cb364c3147de853fa3fa59e85e4ccf0e0029ae9cc725985ddfffc9ff44ef33",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5834.html",
            "sha256": "7bad337365b098e9c5dfdd305f242103d788871781efb5eb07abb8dce3dcb95d",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5705.html",
            "sha256": "90872e8401b32cd466ae8f2c01e4263a3fc162ec3a183f7bcd297f5cde93e8c2",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "JANUS-ficha-MAE5753-v5.html",
            "sha256": "c6b8d4fd363864723784e7b477257aa92ecc74b71307d02422803e51dfd56bbf",
            "area_code": "45133",
            "locator": "Version 5; area 45133; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAE5755.html",
            "sha256": "7115bc48df82b0a65e2fd136eaaf91dfea0bc13e82d71d7bf14d1c352e5d7a1b",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5811.html",
            "sha256": "3e2662b16b6909e0a2bd5a80f2a46484356dd0936075d94ee508d5face2dd038",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5748.html",
            "sha256": "813b0ceb31f99407e2635dd8b7cf30eded4c8674eb35a4adf8c2cbdb0634d578",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5882.html",
            "sha256": "5dedd1098de5ae06520508dd404e30cef50c354436a0592b6edd2cc6517bd162",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "JANUS-ficha-MAE5763-v8.html",
            "sha256": "f062ef91dbb16e39055bf8e0856a97f0529eb6793685423650865a4c7da8d6c0",
            "area_code": "45133",
            "locator": "Version 8; area 45133; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAE5709.html",
            "sha256": "34bde3f4161f1cfb7cb7a7136b01c4062e56324c2ea2f6afa87170696f313cc0",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5904.html",
            "sha256": "e198a4e9d605fab1133514ae1d465b2f9c4714951921432dcd6f8f93f55dc69e",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5913.html",
            "sha256": "4e08f3b7685a76b0c865d07fe6f46b917fea66412629cebd687a5e8a480ab604",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5902.html",
            "sha256": "a1c19bf6e56e8cf706c9aa190f2b037c73c8ac9fb9039beb7ada1fbf5d80bf13",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5703.html",
            "sha256": "929742e7ce6854129c1c7574883f9ff994759fc9371c00099f9579fb078b5746",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5741.html",
            "sha256": "96e70b1afa6d779a6819beeec6f861a69c79b6d0e37b75b2c73836d2335b1635",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5776.html",
            "sha256": "971912a078d7ee7757319ca055b2da4444e1e12c7c9f4fbf8ad1b20055ac7143",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5896.html",
            "sha256": "0d58c5d8d70e4b5f2b15fecdb552f9dd03ea09d185989efcc0621ae2410d4d17",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5835.html",
            "sha256": "842ec6fca4c96a7f85ec59ec62cb152b84bca5b31cf1f9b33613d621fc30a9f8",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "JANUS-ficha-MAE5879-v5.html",
            "sha256": "a5a790a2c12052e4448d100e6848c8095ab640a2c48f9925cf77a112069856e4",
            "area_code": "45133",
            "locator": "Version 5; area 45133; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2024,
      "program": "PE",
      "metric": "enrollments",
      "value": 225,
      "status": "exact",
      "semantic_note": "Soma de turmas × média publicada de matriculados que permaneceram até o final do oferecimento. São vínculos estudante–turma, não estudantes distintos. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão. Cálculo aritmético com grupos de uma ou duas turmas e totais inteiros; nenhuma inferência de distribuição por desvio padrão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2024.html",
        "sha256": "fd4ca6214830a9e2f9ccdd20aa3d24ce1f1c9884b4a2cb6e27f46455e78dae37",
        "window_start": "2024-01-01",
        "window_end": "2024-12-31",
        "locator": "CPG45; 23 linhas de disciplinas atribuídas a PE; coorte conciliada com 23 ofertas históricas.",
        "course_codes": [
          "MAE5702",
          "MAE5703",
          "MAE5705",
          "MAE5709",
          "MAE5741",
          "MAE5748",
          "MAE5753",
          "MAE5755",
          "MAE5763",
          "MAE5776",
          "MAE5811",
          "MAE5834",
          "MAE5835",
          "MAE5870",
          "MAE5879",
          "MAE5882",
          "MAE5896",
          "MAE5902",
          "MAE5904",
          "MAE5905",
          "MAE5910",
          "MAE5911",
          "MAE5913"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MAE5905.html",
            "sha256": "2541253042ae6a30220e45f42275cd7f505a31caae0ca3f72d03f05606401661",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5702.html",
            "sha256": "0081326630e98448577aa23cdb6cdc43af39519deadc22f1cd2c0572b98e7e6e",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5870.html",
            "sha256": "77fff2107a5ca006fb0537c0396354047db8a040972281b49645c072ff456f33",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5911.html",
            "sha256": "555a53e7c553d11d08560b57975e5244c52de6f7b2a5c3fbaf11b3c730a45282",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5910.html",
            "sha256": "05cb364c3147de853fa3fa59e85e4ccf0e0029ae9cc725985ddfffc9ff44ef33",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5834.html",
            "sha256": "7bad337365b098e9c5dfdd305f242103d788871781efb5eb07abb8dce3dcb95d",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5705.html",
            "sha256": "90872e8401b32cd466ae8f2c01e4263a3fc162ec3a183f7bcd297f5cde93e8c2",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "JANUS-ficha-MAE5753-v5.html",
            "sha256": "c6b8d4fd363864723784e7b477257aa92ecc74b71307d02422803e51dfd56bbf",
            "area_code": "45133",
            "locator": "Version 5; area 45133; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAE5755.html",
            "sha256": "7115bc48df82b0a65e2fd136eaaf91dfea0bc13e82d71d7bf14d1c352e5d7a1b",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5811.html",
            "sha256": "3e2662b16b6909e0a2bd5a80f2a46484356dd0936075d94ee508d5face2dd038",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5748.html",
            "sha256": "813b0ceb31f99407e2635dd8b7cf30eded4c8674eb35a4adf8c2cbdb0634d578",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5882.html",
            "sha256": "5dedd1098de5ae06520508dd404e30cef50c354436a0592b6edd2cc6517bd162",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "JANUS-ficha-MAE5763-v8.html",
            "sha256": "f062ef91dbb16e39055bf8e0856a97f0529eb6793685423650865a4c7da8d6c0",
            "area_code": "45133",
            "locator": "Version 8; area 45133; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAE5709.html",
            "sha256": "34bde3f4161f1cfb7cb7a7136b01c4062e56324c2ea2f6afa87170696f313cc0",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5904.html",
            "sha256": "e198a4e9d605fab1133514ae1d465b2f9c4714951921432dcd6f8f93f55dc69e",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5913.html",
            "sha256": "4e08f3b7685a76b0c865d07fe6f46b917fea66412629cebd687a5e8a480ab604",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5902.html",
            "sha256": "a1c19bf6e56e8cf706c9aa190f2b037c73c8ac9fb9039beb7ada1fbf5d80bf13",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5703.html",
            "sha256": "929742e7ce6854129c1c7574883f9ff994759fc9371c00099f9579fb078b5746",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5741.html",
            "sha256": "96e70b1afa6d779a6819beeec6f861a69c79b6d0e37b75b2c73836d2335b1635",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5776.html",
            "sha256": "971912a078d7ee7757319ca055b2da4444e1e12c7c9f4fbf8ad1b20055ac7143",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5896.html",
            "sha256": "0d58c5d8d70e4b5f2b15fecdb552f9dd03ea09d185989efcc0621ae2410d4d17",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5835.html",
            "sha256": "842ec6fca4c96a7f85ec59ec62cb152b84bca5b31cf1f9b33613d621fc30a9f8",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "JANUS-ficha-MAE5879-v5.html",
            "sha256": "a5a790a2c12052e4448d100e6848c8095ab640a2c48f9925cf77a112069856e4",
            "area_code": "45133",
            "locator": "Version 5; area 45133; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2024,
      "program": "PE",
      "metric": "approvals",
      "value": 200,
      "status": "exact",
      "semantic_note": "Soma de turmas × média publicada de aprovados em disciplinas, não diplomas/titulações. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão. Cálculo aritmético com grupos de uma ou duas turmas e totais inteiros; nenhuma inferência de distribuição por desvio padrão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2024.html",
        "sha256": "fd4ca6214830a9e2f9ccdd20aa3d24ce1f1c9884b4a2cb6e27f46455e78dae37",
        "window_start": "2024-01-01",
        "window_end": "2024-12-31",
        "locator": "CPG45; 23 linhas de disciplinas atribuídas a PE; coorte conciliada com 23 ofertas históricas.",
        "course_codes": [
          "MAE5702",
          "MAE5703",
          "MAE5705",
          "MAE5709",
          "MAE5741",
          "MAE5748",
          "MAE5753",
          "MAE5755",
          "MAE5763",
          "MAE5776",
          "MAE5811",
          "MAE5834",
          "MAE5835",
          "MAE5870",
          "MAE5879",
          "MAE5882",
          "MAE5896",
          "MAE5902",
          "MAE5904",
          "MAE5905",
          "MAE5910",
          "MAE5911",
          "MAE5913"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MAE5905.html",
            "sha256": "2541253042ae6a30220e45f42275cd7f505a31caae0ca3f72d03f05606401661",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5702.html",
            "sha256": "0081326630e98448577aa23cdb6cdc43af39519deadc22f1cd2c0572b98e7e6e",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5870.html",
            "sha256": "77fff2107a5ca006fb0537c0396354047db8a040972281b49645c072ff456f33",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5911.html",
            "sha256": "555a53e7c553d11d08560b57975e5244c52de6f7b2a5c3fbaf11b3c730a45282",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5910.html",
            "sha256": "05cb364c3147de853fa3fa59e85e4ccf0e0029ae9cc725985ddfffc9ff44ef33",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5834.html",
            "sha256": "7bad337365b098e9c5dfdd305f242103d788871781efb5eb07abb8dce3dcb95d",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5705.html",
            "sha256": "90872e8401b32cd466ae8f2c01e4263a3fc162ec3a183f7bcd297f5cde93e8c2",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "JANUS-ficha-MAE5753-v5.html",
            "sha256": "c6b8d4fd363864723784e7b477257aa92ecc74b71307d02422803e51dfd56bbf",
            "area_code": "45133",
            "locator": "Version 5; area 45133; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAE5755.html",
            "sha256": "7115bc48df82b0a65e2fd136eaaf91dfea0bc13e82d71d7bf14d1c352e5d7a1b",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5811.html",
            "sha256": "3e2662b16b6909e0a2bd5a80f2a46484356dd0936075d94ee508d5face2dd038",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5748.html",
            "sha256": "813b0ceb31f99407e2635dd8b7cf30eded4c8674eb35a4adf8c2cbdb0634d578",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5882.html",
            "sha256": "5dedd1098de5ae06520508dd404e30cef50c354436a0592b6edd2cc6517bd162",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "JANUS-ficha-MAE5763-v8.html",
            "sha256": "f062ef91dbb16e39055bf8e0856a97f0529eb6793685423650865a4c7da8d6c0",
            "area_code": "45133",
            "locator": "Version 8; area 45133; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAE5709.html",
            "sha256": "34bde3f4161f1cfb7cb7a7136b01c4062e56324c2ea2f6afa87170696f313cc0",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5904.html",
            "sha256": "e198a4e9d605fab1133514ae1d465b2f9c4714951921432dcd6f8f93f55dc69e",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5913.html",
            "sha256": "4e08f3b7685a76b0c865d07fe6f46b917fea66412629cebd687a5e8a480ab604",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5902.html",
            "sha256": "a1c19bf6e56e8cf706c9aa190f2b037c73c8ac9fb9039beb7ada1fbf5d80bf13",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5703.html",
            "sha256": "929742e7ce6854129c1c7574883f9ff994759fc9371c00099f9579fb078b5746",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5741.html",
            "sha256": "96e70b1afa6d779a6819beeec6f861a69c79b6d0e37b75b2c73836d2335b1635",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5776.html",
            "sha256": "971912a078d7ee7757319ca055b2da4444e1e12c7c9f4fbf8ad1b20055ac7143",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5896.html",
            "sha256": "0d58c5d8d70e4b5f2b15fecdb552f9dd03ea09d185989efcc0621ae2410d4d17",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5835.html",
            "sha256": "842ec6fca4c96a7f85ec59ec62cb152b84bca5b31cf1f9b33613d621fc30a9f8",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "JANUS-ficha-MAE5879-v5.html",
            "sha256": "a5a790a2c12052e4448d100e6848c8095ab640a2c48f9925cf77a112069856e4",
            "area_code": "45133",
            "locator": "Version 5; area 45133; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2024,
      "program": "PE",
      "metric": "enrollments_per_section",
      "value": 9.782608695652174,
      "status": "exact",
      "semantic_note": "Total de matrículas dividido pelo número de turmas; média ponderada, não média simples entre disciplinas. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão. Cálculo aritmético com grupos de uma ou duas turmas e totais inteiros; nenhuma inferência de distribuição por desvio padrão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2024.html",
        "sha256": "fd4ca6214830a9e2f9ccdd20aa3d24ce1f1c9884b4a2cb6e27f46455e78dae37",
        "window_start": "2024-01-01",
        "window_end": "2024-12-31",
        "locator": "CPG45; 23 linhas de disciplinas atribuídas a PE; coorte conciliada com 23 ofertas históricas.",
        "course_codes": [
          "MAE5702",
          "MAE5703",
          "MAE5705",
          "MAE5709",
          "MAE5741",
          "MAE5748",
          "MAE5753",
          "MAE5755",
          "MAE5763",
          "MAE5776",
          "MAE5811",
          "MAE5834",
          "MAE5835",
          "MAE5870",
          "MAE5879",
          "MAE5882",
          "MAE5896",
          "MAE5902",
          "MAE5904",
          "MAE5905",
          "MAE5910",
          "MAE5911",
          "MAE5913"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MAE5905.html",
            "sha256": "2541253042ae6a30220e45f42275cd7f505a31caae0ca3f72d03f05606401661",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5702.html",
            "sha256": "0081326630e98448577aa23cdb6cdc43af39519deadc22f1cd2c0572b98e7e6e",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5870.html",
            "sha256": "77fff2107a5ca006fb0537c0396354047db8a040972281b49645c072ff456f33",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5911.html",
            "sha256": "555a53e7c553d11d08560b57975e5244c52de6f7b2a5c3fbaf11b3c730a45282",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5910.html",
            "sha256": "05cb364c3147de853fa3fa59e85e4ccf0e0029ae9cc725985ddfffc9ff44ef33",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5834.html",
            "sha256": "7bad337365b098e9c5dfdd305f242103d788871781efb5eb07abb8dce3dcb95d",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5705.html",
            "sha256": "90872e8401b32cd466ae8f2c01e4263a3fc162ec3a183f7bcd297f5cde93e8c2",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "JANUS-ficha-MAE5753-v5.html",
            "sha256": "c6b8d4fd363864723784e7b477257aa92ecc74b71307d02422803e51dfd56bbf",
            "area_code": "45133",
            "locator": "Version 5; area 45133; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAE5755.html",
            "sha256": "7115bc48df82b0a65e2fd136eaaf91dfea0bc13e82d71d7bf14d1c352e5d7a1b",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5811.html",
            "sha256": "3e2662b16b6909e0a2bd5a80f2a46484356dd0936075d94ee508d5face2dd038",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5748.html",
            "sha256": "813b0ceb31f99407e2635dd8b7cf30eded4c8674eb35a4adf8c2cbdb0634d578",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5882.html",
            "sha256": "5dedd1098de5ae06520508dd404e30cef50c354436a0592b6edd2cc6517bd162",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "JANUS-ficha-MAE5763-v8.html",
            "sha256": "f062ef91dbb16e39055bf8e0856a97f0529eb6793685423650865a4c7da8d6c0",
            "area_code": "45133",
            "locator": "Version 8; area 45133; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAE5709.html",
            "sha256": "34bde3f4161f1cfb7cb7a7136b01c4062e56324c2ea2f6afa87170696f313cc0",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5904.html",
            "sha256": "e198a4e9d605fab1133514ae1d465b2f9c4714951921432dcd6f8f93f55dc69e",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5913.html",
            "sha256": "4e08f3b7685a76b0c865d07fe6f46b917fea66412629cebd687a5e8a480ab604",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5902.html",
            "sha256": "a1c19bf6e56e8cf706c9aa190f2b037c73c8ac9fb9039beb7ada1fbf5d80bf13",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5703.html",
            "sha256": "929742e7ce6854129c1c7574883f9ff994759fc9371c00099f9579fb078b5746",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5741.html",
            "sha256": "96e70b1afa6d779a6819beeec6f861a69c79b6d0e37b75b2c73836d2335b1635",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5776.html",
            "sha256": "971912a078d7ee7757319ca055b2da4444e1e12c7c9f4fbf8ad1b20055ac7143",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5896.html",
            "sha256": "0d58c5d8d70e4b5f2b15fecdb552f9dd03ea09d185989efcc0621ae2410d4d17",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5835.html",
            "sha256": "842ec6fca4c96a7f85ec59ec62cb152b84bca5b31cf1f9b33613d621fc30a9f8",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "JANUS-ficha-MAE5879-v5.html",
            "sha256": "a5a790a2c12052e4448d100e6848c8095ab640a2c48f9925cf77a112069856e4",
            "area_code": "45133",
            "locator": "Version 5; area 45133; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2024,
      "program": "PE",
      "metric": "approval_rate",
      "value": 0.8888888888888888,
      "status": "exact",
      "semantic_note": "Aprovações em disciplinas divididas pelas matrículas até o final do oferecimento. Armazenada como fração0–1; ND se denominador zero. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão. Cálculo aritmético com grupos de uma ou duas turmas e totais inteiros; nenhuma inferência de distribuição por desvio padrão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2024.html",
        "sha256": "fd4ca6214830a9e2f9ccdd20aa3d24ce1f1c9884b4a2cb6e27f46455e78dae37",
        "window_start": "2024-01-01",
        "window_end": "2024-12-31",
        "locator": "CPG45; 23 linhas de disciplinas atribuídas a PE; coorte conciliada com 23 ofertas históricas.",
        "course_codes": [
          "MAE5702",
          "MAE5703",
          "MAE5705",
          "MAE5709",
          "MAE5741",
          "MAE5748",
          "MAE5753",
          "MAE5755",
          "MAE5763",
          "MAE5776",
          "MAE5811",
          "MAE5834",
          "MAE5835",
          "MAE5870",
          "MAE5879",
          "MAE5882",
          "MAE5896",
          "MAE5902",
          "MAE5904",
          "MAE5905",
          "MAE5910",
          "MAE5911",
          "MAE5913"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MAE5905.html",
            "sha256": "2541253042ae6a30220e45f42275cd7f505a31caae0ca3f72d03f05606401661",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5702.html",
            "sha256": "0081326630e98448577aa23cdb6cdc43af39519deadc22f1cd2c0572b98e7e6e",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5870.html",
            "sha256": "77fff2107a5ca006fb0537c0396354047db8a040972281b49645c072ff456f33",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5911.html",
            "sha256": "555a53e7c553d11d08560b57975e5244c52de6f7b2a5c3fbaf11b3c730a45282",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5910.html",
            "sha256": "05cb364c3147de853fa3fa59e85e4ccf0e0029ae9cc725985ddfffc9ff44ef33",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5834.html",
            "sha256": "7bad337365b098e9c5dfdd305f242103d788871781efb5eb07abb8dce3dcb95d",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5705.html",
            "sha256": "90872e8401b32cd466ae8f2c01e4263a3fc162ec3a183f7bcd297f5cde93e8c2",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "JANUS-ficha-MAE5753-v5.html",
            "sha256": "c6b8d4fd363864723784e7b477257aa92ecc74b71307d02422803e51dfd56bbf",
            "area_code": "45133",
            "locator": "Version 5; area 45133; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAE5755.html",
            "sha256": "7115bc48df82b0a65e2fd136eaaf91dfea0bc13e82d71d7bf14d1c352e5d7a1b",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5811.html",
            "sha256": "3e2662b16b6909e0a2bd5a80f2a46484356dd0936075d94ee508d5face2dd038",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5748.html",
            "sha256": "813b0ceb31f99407e2635dd8b7cf30eded4c8674eb35a4adf8c2cbdb0634d578",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5882.html",
            "sha256": "5dedd1098de5ae06520508dd404e30cef50c354436a0592b6edd2cc6517bd162",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "JANUS-ficha-MAE5763-v8.html",
            "sha256": "f062ef91dbb16e39055bf8e0856a97f0529eb6793685423650865a4c7da8d6c0",
            "area_code": "45133",
            "locator": "Version 8; area 45133; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAE5709.html",
            "sha256": "34bde3f4161f1cfb7cb7a7136b01c4062e56324c2ea2f6afa87170696f313cc0",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5904.html",
            "sha256": "e198a4e9d605fab1133514ae1d465b2f9c4714951921432dcd6f8f93f55dc69e",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5913.html",
            "sha256": "4e08f3b7685a76b0c865d07fe6f46b917fea66412629cebd687a5e8a480ab604",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5902.html",
            "sha256": "a1c19bf6e56e8cf706c9aa190f2b037c73c8ac9fb9039beb7ada1fbf5d80bf13",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5703.html",
            "sha256": "929742e7ce6854129c1c7574883f9ff994759fc9371c00099f9579fb078b5746",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5741.html",
            "sha256": "96e70b1afa6d779a6819beeec6f861a69c79b6d0e37b75b2c73836d2335b1635",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5776.html",
            "sha256": "971912a078d7ee7757319ca055b2da4444e1e12c7c9f4fbf8ad1b20055ac7143",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5896.html",
            "sha256": "0d58c5d8d70e4b5f2b15fecdb552f9dd03ea09d185989efcc0621ae2410d4d17",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5835.html",
            "sha256": "842ec6fca4c96a7f85ec59ec62cb152b84bca5b31cf1f9b33613d621fc30a9f8",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "JANUS-ficha-MAE5879-v5.html",
            "sha256": "a5a790a2c12052e4448d100e6848c8095ab640a2c48f9925cf77a112069856e4",
            "area_code": "45133",
            "locator": "Version 5; area 45133; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "ratio"
    },
    {
      "year": 2024,
      "program": "MPEM",
      "metric": "courses",
      "value": 11,
      "status": "exact",
      "semantic_note": "Número de códigos de disciplinas distintos no relatório anual atribuído ao programa. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2024.html",
        "sha256": "fd4ca6214830a9e2f9ccdd20aa3d24ce1f1c9884b4a2cb6e27f46455e78dae37",
        "window_start": "2024-01-01",
        "window_end": "2024-12-31",
        "locator": "CPG45; 11 linhas de disciplinas atribuídas a MPEM; coorte conciliada com 13 ofertas históricas.",
        "course_codes": [
          "MPM5601",
          "MPM5602",
          "MPM5604",
          "MPM5605",
          "MPM5606",
          "MPM5607",
          "MPM5608",
          "MPM5609",
          "MPM5610",
          "MPM5613",
          "MPM5614"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MPM5604.html",
            "sha256": "7333e1b32f4825df981866b9cab07a0a1bf8d1374dde940d444c097be23660b9",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5614.html",
            "sha256": "20815bd3c74f9fba4d8c5549d37417b355fbb07d0dc7b344f2edda5d0fa124ba",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5602.html",
            "sha256": "7529a229a445504853c396204c9231e4c53f09eef3d207ded2a8b5116d4bd8c1",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5605.html",
            "sha256": "6b2b49a4d862fc09af11a5b40c88cbc584fea9ca9a4e10fa5623fe73f8c54df6",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5613.html",
            "sha256": "34979971b77e0bf1296578fcb39dd28c9c52fc4857a72a422b15da3fc8c35386",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "fichas_janus_recuperadas_5606_5608.json",
            "sha256": "c532adff51998deb265c985a469a8f080b5e587629b8c4953d364f82235b8cde",
            "area_code": "45135",
            "locator": "Extrato factual oficial indexado; rows[course_code=MPM5606].area_code=45135; URL https://uspdigital.usp.br/janus/Disciplina?sgldis=MPM5606"
          },
          {
            "file": "MPM5609.html",
            "sha256": "1e373d76fdc93ac6d33db10d2dca1d75fc5694242bd202c25ae84ad443d4de62",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5607.html",
            "sha256": "d86daa31bd5bbaef0ddb8356f3cf72f3544927d737d2b07fb3357ec217b4c154",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5601.html",
            "sha256": "a3a548e63af0ac29d7404aea68f175a3900f273d6c8051ed0ba9495df97c4a68",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "JANUS-ficha-MPM5610-v3.html",
            "sha256": "2a4096d7e7d8e4c58deac2320c838b48e47234e3088579274280573a0e8213e8",
            "area_code": "45135",
            "locator": "Version 3; area 45135; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2024,
      "program": "MPEM",
      "metric": "sections",
      "value": 13,
      "status": "exact",
      "semantic_note": "Soma do número de turmas publicado por disciplina. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2024.html",
        "sha256": "fd4ca6214830a9e2f9ccdd20aa3d24ce1f1c9884b4a2cb6e27f46455e78dae37",
        "window_start": "2024-01-01",
        "window_end": "2024-12-31",
        "locator": "CPG45; 11 linhas de disciplinas atribuídas a MPEM; coorte conciliada com 13 ofertas históricas.",
        "course_codes": [
          "MPM5601",
          "MPM5602",
          "MPM5604",
          "MPM5605",
          "MPM5606",
          "MPM5607",
          "MPM5608",
          "MPM5609",
          "MPM5610",
          "MPM5613",
          "MPM5614"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MPM5604.html",
            "sha256": "7333e1b32f4825df981866b9cab07a0a1bf8d1374dde940d444c097be23660b9",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5614.html",
            "sha256": "20815bd3c74f9fba4d8c5549d37417b355fbb07d0dc7b344f2edda5d0fa124ba",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5602.html",
            "sha256": "7529a229a445504853c396204c9231e4c53f09eef3d207ded2a8b5116d4bd8c1",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5605.html",
            "sha256": "6b2b49a4d862fc09af11a5b40c88cbc584fea9ca9a4e10fa5623fe73f8c54df6",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5613.html",
            "sha256": "34979971b77e0bf1296578fcb39dd28c9c52fc4857a72a422b15da3fc8c35386",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "fichas_janus_recuperadas_5606_5608.json",
            "sha256": "c532adff51998deb265c985a469a8f080b5e587629b8c4953d364f82235b8cde",
            "area_code": "45135",
            "locator": "Extrato factual oficial indexado; rows[course_code=MPM5606].area_code=45135; URL https://uspdigital.usp.br/janus/Disciplina?sgldis=MPM5606"
          },
          {
            "file": "MPM5609.html",
            "sha256": "1e373d76fdc93ac6d33db10d2dca1d75fc5694242bd202c25ae84ad443d4de62",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5607.html",
            "sha256": "d86daa31bd5bbaef0ddb8356f3cf72f3544927d737d2b07fb3357ec217b4c154",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5601.html",
            "sha256": "a3a548e63af0ac29d7404aea68f175a3900f273d6c8051ed0ba9495df97c4a68",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "JANUS-ficha-MPM5610-v3.html",
            "sha256": "2a4096d7e7d8e4c58deac2320c838b48e47234e3088579274280573a0e8213e8",
            "area_code": "45135",
            "locator": "Version 3; area 45135; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2024,
      "program": "MPEM",
      "metric": "applications",
      "value": 202,
      "status": "exact",
      "semantic_note": "Soma de turmas × média publicada de inscritos. Inscrições não equivalem a matrículas até o final do oferecimento. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão. Cálculo aritmético com grupos de uma ou duas turmas e totais inteiros; nenhuma inferência de distribuição por desvio padrão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2024.html",
        "sha256": "fd4ca6214830a9e2f9ccdd20aa3d24ce1f1c9884b4a2cb6e27f46455e78dae37",
        "window_start": "2024-01-01",
        "window_end": "2024-12-31",
        "locator": "CPG45; 11 linhas de disciplinas atribuídas a MPEM; coorte conciliada com 13 ofertas históricas.",
        "course_codes": [
          "MPM5601",
          "MPM5602",
          "MPM5604",
          "MPM5605",
          "MPM5606",
          "MPM5607",
          "MPM5608",
          "MPM5609",
          "MPM5610",
          "MPM5613",
          "MPM5614"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MPM5604.html",
            "sha256": "7333e1b32f4825df981866b9cab07a0a1bf8d1374dde940d444c097be23660b9",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5614.html",
            "sha256": "20815bd3c74f9fba4d8c5549d37417b355fbb07d0dc7b344f2edda5d0fa124ba",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5602.html",
            "sha256": "7529a229a445504853c396204c9231e4c53f09eef3d207ded2a8b5116d4bd8c1",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5605.html",
            "sha256": "6b2b49a4d862fc09af11a5b40c88cbc584fea9ca9a4e10fa5623fe73f8c54df6",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5613.html",
            "sha256": "34979971b77e0bf1296578fcb39dd28c9c52fc4857a72a422b15da3fc8c35386",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "fichas_janus_recuperadas_5606_5608.json",
            "sha256": "c532adff51998deb265c985a469a8f080b5e587629b8c4953d364f82235b8cde",
            "area_code": "45135",
            "locator": "Extrato factual oficial indexado; rows[course_code=MPM5606].area_code=45135; URL https://uspdigital.usp.br/janus/Disciplina?sgldis=MPM5606"
          },
          {
            "file": "MPM5609.html",
            "sha256": "1e373d76fdc93ac6d33db10d2dca1d75fc5694242bd202c25ae84ad443d4de62",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5607.html",
            "sha256": "d86daa31bd5bbaef0ddb8356f3cf72f3544927d737d2b07fb3357ec217b4c154",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5601.html",
            "sha256": "a3a548e63af0ac29d7404aea68f175a3900f273d6c8051ed0ba9495df97c4a68",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "JANUS-ficha-MPM5610-v3.html",
            "sha256": "2a4096d7e7d8e4c58deac2320c838b48e47234e3088579274280573a0e8213e8",
            "area_code": "45135",
            "locator": "Version 3; area 45135; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2024,
      "program": "MPEM",
      "metric": "enrollments",
      "value": 175,
      "status": "exact",
      "semantic_note": "Soma de turmas × média publicada de matriculados que permaneceram até o final do oferecimento. São vínculos estudante–turma, não estudantes distintos. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão. Cálculo aritmético com grupos de uma ou duas turmas e totais inteiros; nenhuma inferência de distribuição por desvio padrão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2024.html",
        "sha256": "fd4ca6214830a9e2f9ccdd20aa3d24ce1f1c9884b4a2cb6e27f46455e78dae37",
        "window_start": "2024-01-01",
        "window_end": "2024-12-31",
        "locator": "CPG45; 11 linhas de disciplinas atribuídas a MPEM; coorte conciliada com 13 ofertas históricas.",
        "course_codes": [
          "MPM5601",
          "MPM5602",
          "MPM5604",
          "MPM5605",
          "MPM5606",
          "MPM5607",
          "MPM5608",
          "MPM5609",
          "MPM5610",
          "MPM5613",
          "MPM5614"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MPM5604.html",
            "sha256": "7333e1b32f4825df981866b9cab07a0a1bf8d1374dde940d444c097be23660b9",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5614.html",
            "sha256": "20815bd3c74f9fba4d8c5549d37417b355fbb07d0dc7b344f2edda5d0fa124ba",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5602.html",
            "sha256": "7529a229a445504853c396204c9231e4c53f09eef3d207ded2a8b5116d4bd8c1",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5605.html",
            "sha256": "6b2b49a4d862fc09af11a5b40c88cbc584fea9ca9a4e10fa5623fe73f8c54df6",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5613.html",
            "sha256": "34979971b77e0bf1296578fcb39dd28c9c52fc4857a72a422b15da3fc8c35386",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "fichas_janus_recuperadas_5606_5608.json",
            "sha256": "c532adff51998deb265c985a469a8f080b5e587629b8c4953d364f82235b8cde",
            "area_code": "45135",
            "locator": "Extrato factual oficial indexado; rows[course_code=MPM5606].area_code=45135; URL https://uspdigital.usp.br/janus/Disciplina?sgldis=MPM5606"
          },
          {
            "file": "MPM5609.html",
            "sha256": "1e373d76fdc93ac6d33db10d2dca1d75fc5694242bd202c25ae84ad443d4de62",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5607.html",
            "sha256": "d86daa31bd5bbaef0ddb8356f3cf72f3544927d737d2b07fb3357ec217b4c154",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5601.html",
            "sha256": "a3a548e63af0ac29d7404aea68f175a3900f273d6c8051ed0ba9495df97c4a68",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "JANUS-ficha-MPM5610-v3.html",
            "sha256": "2a4096d7e7d8e4c58deac2320c838b48e47234e3088579274280573a0e8213e8",
            "area_code": "45135",
            "locator": "Version 3; area 45135; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2024,
      "program": "MPEM",
      "metric": "approvals",
      "value": 153,
      "status": "exact",
      "semantic_note": "Soma de turmas × média publicada de aprovados em disciplinas, não diplomas/titulações. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão. Cálculo aritmético com grupos de uma ou duas turmas e totais inteiros; nenhuma inferência de distribuição por desvio padrão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2024.html",
        "sha256": "fd4ca6214830a9e2f9ccdd20aa3d24ce1f1c9884b4a2cb6e27f46455e78dae37",
        "window_start": "2024-01-01",
        "window_end": "2024-12-31",
        "locator": "CPG45; 11 linhas de disciplinas atribuídas a MPEM; coorte conciliada com 13 ofertas históricas.",
        "course_codes": [
          "MPM5601",
          "MPM5602",
          "MPM5604",
          "MPM5605",
          "MPM5606",
          "MPM5607",
          "MPM5608",
          "MPM5609",
          "MPM5610",
          "MPM5613",
          "MPM5614"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MPM5604.html",
            "sha256": "7333e1b32f4825df981866b9cab07a0a1bf8d1374dde940d444c097be23660b9",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5614.html",
            "sha256": "20815bd3c74f9fba4d8c5549d37417b355fbb07d0dc7b344f2edda5d0fa124ba",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5602.html",
            "sha256": "7529a229a445504853c396204c9231e4c53f09eef3d207ded2a8b5116d4bd8c1",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5605.html",
            "sha256": "6b2b49a4d862fc09af11a5b40c88cbc584fea9ca9a4e10fa5623fe73f8c54df6",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5613.html",
            "sha256": "34979971b77e0bf1296578fcb39dd28c9c52fc4857a72a422b15da3fc8c35386",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "fichas_janus_recuperadas_5606_5608.json",
            "sha256": "c532adff51998deb265c985a469a8f080b5e587629b8c4953d364f82235b8cde",
            "area_code": "45135",
            "locator": "Extrato factual oficial indexado; rows[course_code=MPM5606].area_code=45135; URL https://uspdigital.usp.br/janus/Disciplina?sgldis=MPM5606"
          },
          {
            "file": "MPM5609.html",
            "sha256": "1e373d76fdc93ac6d33db10d2dca1d75fc5694242bd202c25ae84ad443d4de62",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5607.html",
            "sha256": "d86daa31bd5bbaef0ddb8356f3cf72f3544927d737d2b07fb3357ec217b4c154",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5601.html",
            "sha256": "a3a548e63af0ac29d7404aea68f175a3900f273d6c8051ed0ba9495df97c4a68",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "JANUS-ficha-MPM5610-v3.html",
            "sha256": "2a4096d7e7d8e4c58deac2320c838b48e47234e3088579274280573a0e8213e8",
            "area_code": "45135",
            "locator": "Version 3; area 45135; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2024,
      "program": "MPEM",
      "metric": "enrollments_per_section",
      "value": 13.461538461538462,
      "status": "exact",
      "semantic_note": "Total de matrículas dividido pelo número de turmas; média ponderada, não média simples entre disciplinas. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão. Cálculo aritmético com grupos de uma ou duas turmas e totais inteiros; nenhuma inferência de distribuição por desvio padrão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2024.html",
        "sha256": "fd4ca6214830a9e2f9ccdd20aa3d24ce1f1c9884b4a2cb6e27f46455e78dae37",
        "window_start": "2024-01-01",
        "window_end": "2024-12-31",
        "locator": "CPG45; 11 linhas de disciplinas atribuídas a MPEM; coorte conciliada com 13 ofertas históricas.",
        "course_codes": [
          "MPM5601",
          "MPM5602",
          "MPM5604",
          "MPM5605",
          "MPM5606",
          "MPM5607",
          "MPM5608",
          "MPM5609",
          "MPM5610",
          "MPM5613",
          "MPM5614"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MPM5604.html",
            "sha256": "7333e1b32f4825df981866b9cab07a0a1bf8d1374dde940d444c097be23660b9",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5614.html",
            "sha256": "20815bd3c74f9fba4d8c5549d37417b355fbb07d0dc7b344f2edda5d0fa124ba",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5602.html",
            "sha256": "7529a229a445504853c396204c9231e4c53f09eef3d207ded2a8b5116d4bd8c1",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5605.html",
            "sha256": "6b2b49a4d862fc09af11a5b40c88cbc584fea9ca9a4e10fa5623fe73f8c54df6",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5613.html",
            "sha256": "34979971b77e0bf1296578fcb39dd28c9c52fc4857a72a422b15da3fc8c35386",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "fichas_janus_recuperadas_5606_5608.json",
            "sha256": "c532adff51998deb265c985a469a8f080b5e587629b8c4953d364f82235b8cde",
            "area_code": "45135",
            "locator": "Extrato factual oficial indexado; rows[course_code=MPM5606].area_code=45135; URL https://uspdigital.usp.br/janus/Disciplina?sgldis=MPM5606"
          },
          {
            "file": "MPM5609.html",
            "sha256": "1e373d76fdc93ac6d33db10d2dca1d75fc5694242bd202c25ae84ad443d4de62",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5607.html",
            "sha256": "d86daa31bd5bbaef0ddb8356f3cf72f3544927d737d2b07fb3357ec217b4c154",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5601.html",
            "sha256": "a3a548e63af0ac29d7404aea68f175a3900f273d6c8051ed0ba9495df97c4a68",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "JANUS-ficha-MPM5610-v3.html",
            "sha256": "2a4096d7e7d8e4c58deac2320c838b48e47234e3088579274280573a0e8213e8",
            "area_code": "45135",
            "locator": "Version 3; area 45135; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2024,
      "program": "MPEM",
      "metric": "approval_rate",
      "value": 0.8742857142857143,
      "status": "exact",
      "semantic_note": "Aprovações em disciplinas divididas pelas matrículas até o final do oferecimento. Armazenada como fração0–1; ND se denominador zero. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão. Cálculo aritmético com grupos de uma ou duas turmas e totais inteiros; nenhuma inferência de distribuição por desvio padrão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2024.html",
        "sha256": "fd4ca6214830a9e2f9ccdd20aa3d24ce1f1c9884b4a2cb6e27f46455e78dae37",
        "window_start": "2024-01-01",
        "window_end": "2024-12-31",
        "locator": "CPG45; 11 linhas de disciplinas atribuídas a MPEM; coorte conciliada com 13 ofertas históricas.",
        "course_codes": [
          "MPM5601",
          "MPM5602",
          "MPM5604",
          "MPM5605",
          "MPM5606",
          "MPM5607",
          "MPM5608",
          "MPM5609",
          "MPM5610",
          "MPM5613",
          "MPM5614"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MPM5604.html",
            "sha256": "7333e1b32f4825df981866b9cab07a0a1bf8d1374dde940d444c097be23660b9",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5614.html",
            "sha256": "20815bd3c74f9fba4d8c5549d37417b355fbb07d0dc7b344f2edda5d0fa124ba",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5602.html",
            "sha256": "7529a229a445504853c396204c9231e4c53f09eef3d207ded2a8b5116d4bd8c1",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5605.html",
            "sha256": "6b2b49a4d862fc09af11a5b40c88cbc584fea9ca9a4e10fa5623fe73f8c54df6",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5613.html",
            "sha256": "34979971b77e0bf1296578fcb39dd28c9c52fc4857a72a422b15da3fc8c35386",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "fichas_janus_recuperadas_5606_5608.json",
            "sha256": "c532adff51998deb265c985a469a8f080b5e587629b8c4953d364f82235b8cde",
            "area_code": "45135",
            "locator": "Extrato factual oficial indexado; rows[course_code=MPM5606].area_code=45135; URL https://uspdigital.usp.br/janus/Disciplina?sgldis=MPM5606"
          },
          {
            "file": "MPM5609.html",
            "sha256": "1e373d76fdc93ac6d33db10d2dca1d75fc5694242bd202c25ae84ad443d4de62",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5607.html",
            "sha256": "d86daa31bd5bbaef0ddb8356f3cf72f3544927d737d2b07fb3357ec217b4c154",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5601.html",
            "sha256": "a3a548e63af0ac29d7404aea68f175a3900f273d6c8051ed0ba9495df97c4a68",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "JANUS-ficha-MPM5610-v3.html",
            "sha256": "2a4096d7e7d8e4c58deac2320c838b48e47234e3088579274280573a0e8213e8",
            "area_code": "45135",
            "locator": "Version 3; area 45135; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "ratio"
    },
    {
      "year": 2025,
      "program": "MAP",
      "metric": "courses",
      "value": 19,
      "status": "exact",
      "semantic_note": "Número de códigos de disciplinas distintos no relatório anual atribuído ao programa. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2025.html",
        "sha256": "080414250650a7135cbae8e4177ddfacff0bf076f67a49cec9b5d464c9a7580e",
        "window_start": "2025-01-01",
        "window_end": "2025-12-31",
        "locator": "CPG45; 19 linhas de disciplinas atribuídas a MAP; coorte conciliada com 19 ofertas históricas.",
        "course_codes": [
          "MAP4002",
          "MAP5001",
          "MAP5006",
          "MAP5007",
          "MAP5709",
          "MAP5711",
          "MAP5712",
          "MAP5724",
          "MAP5729",
          "MAP5747",
          "MAP5763",
          "MAP5900",
          "MAP5902",
          "MAP5908",
          "MAP5932",
          "MAP5933",
          "MAP5934",
          "MAP5935",
          "MAT6709"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MAP5711.html",
            "sha256": "53d7b0b306d54618fb90e2759dd1c8a8ab39ea57500b11b086414cbc281bd3ae",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5729.html",
            "sha256": "4c04ce94a0e46ca9c02f44527748e18592a356c687970b0b600bfa40347c0808",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5934.html",
            "sha256": "389fe3ebb23c47c4afb204137cdaf38cb2df770b58ed6d94992a2718f27cb30d",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAT6709.html",
            "sha256": "af3ab2cccba1514ead9d191af11e19235d569f4fd9c4b1cac7918636dc478de2",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5763.html",
            "sha256": "8b612f3caaff1fa3f2173b4e24ae2f6ea1f834998a2d3dcc38ec95f524d9735f",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5001.html",
            "sha256": "2587e455f2642cf31552b4da8957f8c52df9ce7541550d1fb09f449106055145",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5900.html",
            "sha256": "033c8f20977b46cd8cdf7b298599c91eed7df1c88d8d84938dc11c85cfcea6ba",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5712.html",
            "sha256": "7fb73da1671456e151b3277d764c48289749ff710bd2ab1c5e14e56821f225d9",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5724.html",
            "sha256": "8632693a5c66d9a8be7ef235b587c14edfafed8fa972f01845dd7e5ed96896ee",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5908.html",
            "sha256": "f4d05fcef40cb7f8f4e3c983cbe4217e734ea8362e7478ffb02ecb0b7cb39fd3",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5709.html",
            "sha256": "94439e7028ffca6d7468f14270e6d7032af69db15440384488ed5e946607346c",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "JANUS-ficha-MAP5747-v4.html",
            "sha256": "4dbadf79d11b5e5167dff647c6d726fc07d304751d0c99caae4eae93c8a36873",
            "area_code": "45132",
            "locator": "Version 4; area 45132; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAP5932.html",
            "sha256": "e1001d726b959985ae7c4e1316533d5c7d5b3a002ef0df65de4e35a0523753b6",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5007.html",
            "sha256": "c7a4289aa360187bae09e796e6b6fbd29ed457a1f5f7fb9550d3574369f19dd6",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5933.html",
            "sha256": "9625be01bbfcb7915f8a6c40b02cdf79e696687f85c674c0ee6857d1a52474e2",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5935.html",
            "sha256": "a4d9850987216d90c4889ee0364a7ff7e84830884eb38121e45ec73c7b97d742",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5902.html",
            "sha256": "22d3187b23e5851b769bf978570a789bd2a239a62c800121886d5e073336c878",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP4002.html",
            "sha256": "d51fa0d557172d0b171bf8188e493b25492f4a4af66002f535417d6a291cc8ad",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5006.html",
            "sha256": "e46b209d1217bfb2143ed287920fd601c2b2003c2cf362ca2e99f1b7c973ed85",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2025,
      "program": "MAP",
      "metric": "sections",
      "value": 19,
      "status": "exact",
      "semantic_note": "Soma do número de turmas publicado por disciplina. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2025.html",
        "sha256": "080414250650a7135cbae8e4177ddfacff0bf076f67a49cec9b5d464c9a7580e",
        "window_start": "2025-01-01",
        "window_end": "2025-12-31",
        "locator": "CPG45; 19 linhas de disciplinas atribuídas a MAP; coorte conciliada com 19 ofertas históricas.",
        "course_codes": [
          "MAP4002",
          "MAP5001",
          "MAP5006",
          "MAP5007",
          "MAP5709",
          "MAP5711",
          "MAP5712",
          "MAP5724",
          "MAP5729",
          "MAP5747",
          "MAP5763",
          "MAP5900",
          "MAP5902",
          "MAP5908",
          "MAP5932",
          "MAP5933",
          "MAP5934",
          "MAP5935",
          "MAT6709"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MAP5711.html",
            "sha256": "53d7b0b306d54618fb90e2759dd1c8a8ab39ea57500b11b086414cbc281bd3ae",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5729.html",
            "sha256": "4c04ce94a0e46ca9c02f44527748e18592a356c687970b0b600bfa40347c0808",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5934.html",
            "sha256": "389fe3ebb23c47c4afb204137cdaf38cb2df770b58ed6d94992a2718f27cb30d",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAT6709.html",
            "sha256": "af3ab2cccba1514ead9d191af11e19235d569f4fd9c4b1cac7918636dc478de2",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5763.html",
            "sha256": "8b612f3caaff1fa3f2173b4e24ae2f6ea1f834998a2d3dcc38ec95f524d9735f",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5001.html",
            "sha256": "2587e455f2642cf31552b4da8957f8c52df9ce7541550d1fb09f449106055145",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5900.html",
            "sha256": "033c8f20977b46cd8cdf7b298599c91eed7df1c88d8d84938dc11c85cfcea6ba",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5712.html",
            "sha256": "7fb73da1671456e151b3277d764c48289749ff710bd2ab1c5e14e56821f225d9",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5724.html",
            "sha256": "8632693a5c66d9a8be7ef235b587c14edfafed8fa972f01845dd7e5ed96896ee",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5908.html",
            "sha256": "f4d05fcef40cb7f8f4e3c983cbe4217e734ea8362e7478ffb02ecb0b7cb39fd3",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5709.html",
            "sha256": "94439e7028ffca6d7468f14270e6d7032af69db15440384488ed5e946607346c",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "JANUS-ficha-MAP5747-v4.html",
            "sha256": "4dbadf79d11b5e5167dff647c6d726fc07d304751d0c99caae4eae93c8a36873",
            "area_code": "45132",
            "locator": "Version 4; area 45132; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAP5932.html",
            "sha256": "e1001d726b959985ae7c4e1316533d5c7d5b3a002ef0df65de4e35a0523753b6",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5007.html",
            "sha256": "c7a4289aa360187bae09e796e6b6fbd29ed457a1f5f7fb9550d3574369f19dd6",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5933.html",
            "sha256": "9625be01bbfcb7915f8a6c40b02cdf79e696687f85c674c0ee6857d1a52474e2",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5935.html",
            "sha256": "a4d9850987216d90c4889ee0364a7ff7e84830884eb38121e45ec73c7b97d742",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5902.html",
            "sha256": "22d3187b23e5851b769bf978570a789bd2a239a62c800121886d5e073336c878",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP4002.html",
            "sha256": "d51fa0d557172d0b171bf8188e493b25492f4a4af66002f535417d6a291cc8ad",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5006.html",
            "sha256": "e46b209d1217bfb2143ed287920fd601c2b2003c2cf362ca2e99f1b7c973ed85",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2025,
      "program": "MAP",
      "metric": "applications",
      "value": 142,
      "status": "exact",
      "semantic_note": "Soma de turmas × média publicada de inscritos. Inscrições não equivalem a matrículas até o final do oferecimento. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão. Cálculo aritmético com grupos de uma ou duas turmas e totais inteiros; nenhuma inferência de distribuição por desvio padrão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2025.html",
        "sha256": "080414250650a7135cbae8e4177ddfacff0bf076f67a49cec9b5d464c9a7580e",
        "window_start": "2025-01-01",
        "window_end": "2025-12-31",
        "locator": "CPG45; 19 linhas de disciplinas atribuídas a MAP; coorte conciliada com 19 ofertas históricas.",
        "course_codes": [
          "MAP4002",
          "MAP5001",
          "MAP5006",
          "MAP5007",
          "MAP5709",
          "MAP5711",
          "MAP5712",
          "MAP5724",
          "MAP5729",
          "MAP5747",
          "MAP5763",
          "MAP5900",
          "MAP5902",
          "MAP5908",
          "MAP5932",
          "MAP5933",
          "MAP5934",
          "MAP5935",
          "MAT6709"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MAP5711.html",
            "sha256": "53d7b0b306d54618fb90e2759dd1c8a8ab39ea57500b11b086414cbc281bd3ae",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5729.html",
            "sha256": "4c04ce94a0e46ca9c02f44527748e18592a356c687970b0b600bfa40347c0808",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5934.html",
            "sha256": "389fe3ebb23c47c4afb204137cdaf38cb2df770b58ed6d94992a2718f27cb30d",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAT6709.html",
            "sha256": "af3ab2cccba1514ead9d191af11e19235d569f4fd9c4b1cac7918636dc478de2",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5763.html",
            "sha256": "8b612f3caaff1fa3f2173b4e24ae2f6ea1f834998a2d3dcc38ec95f524d9735f",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5001.html",
            "sha256": "2587e455f2642cf31552b4da8957f8c52df9ce7541550d1fb09f449106055145",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5900.html",
            "sha256": "033c8f20977b46cd8cdf7b298599c91eed7df1c88d8d84938dc11c85cfcea6ba",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5712.html",
            "sha256": "7fb73da1671456e151b3277d764c48289749ff710bd2ab1c5e14e56821f225d9",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5724.html",
            "sha256": "8632693a5c66d9a8be7ef235b587c14edfafed8fa972f01845dd7e5ed96896ee",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5908.html",
            "sha256": "f4d05fcef40cb7f8f4e3c983cbe4217e734ea8362e7478ffb02ecb0b7cb39fd3",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5709.html",
            "sha256": "94439e7028ffca6d7468f14270e6d7032af69db15440384488ed5e946607346c",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "JANUS-ficha-MAP5747-v4.html",
            "sha256": "4dbadf79d11b5e5167dff647c6d726fc07d304751d0c99caae4eae93c8a36873",
            "area_code": "45132",
            "locator": "Version 4; area 45132; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAP5932.html",
            "sha256": "e1001d726b959985ae7c4e1316533d5c7d5b3a002ef0df65de4e35a0523753b6",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5007.html",
            "sha256": "c7a4289aa360187bae09e796e6b6fbd29ed457a1f5f7fb9550d3574369f19dd6",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5933.html",
            "sha256": "9625be01bbfcb7915f8a6c40b02cdf79e696687f85c674c0ee6857d1a52474e2",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5935.html",
            "sha256": "a4d9850987216d90c4889ee0364a7ff7e84830884eb38121e45ec73c7b97d742",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5902.html",
            "sha256": "22d3187b23e5851b769bf978570a789bd2a239a62c800121886d5e073336c878",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP4002.html",
            "sha256": "d51fa0d557172d0b171bf8188e493b25492f4a4af66002f535417d6a291cc8ad",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5006.html",
            "sha256": "e46b209d1217bfb2143ed287920fd601c2b2003c2cf362ca2e99f1b7c973ed85",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2025,
      "program": "MAP",
      "metric": "enrollments",
      "value": 122,
      "status": "exact",
      "semantic_note": "Soma de turmas × média publicada de matriculados que permaneceram até o final do oferecimento. São vínculos estudante–turma, não estudantes distintos. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão. Cálculo aritmético com grupos de uma ou duas turmas e totais inteiros; nenhuma inferência de distribuição por desvio padrão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2025.html",
        "sha256": "080414250650a7135cbae8e4177ddfacff0bf076f67a49cec9b5d464c9a7580e",
        "window_start": "2025-01-01",
        "window_end": "2025-12-31",
        "locator": "CPG45; 19 linhas de disciplinas atribuídas a MAP; coorte conciliada com 19 ofertas históricas.",
        "course_codes": [
          "MAP4002",
          "MAP5001",
          "MAP5006",
          "MAP5007",
          "MAP5709",
          "MAP5711",
          "MAP5712",
          "MAP5724",
          "MAP5729",
          "MAP5747",
          "MAP5763",
          "MAP5900",
          "MAP5902",
          "MAP5908",
          "MAP5932",
          "MAP5933",
          "MAP5934",
          "MAP5935",
          "MAT6709"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MAP5711.html",
            "sha256": "53d7b0b306d54618fb90e2759dd1c8a8ab39ea57500b11b086414cbc281bd3ae",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5729.html",
            "sha256": "4c04ce94a0e46ca9c02f44527748e18592a356c687970b0b600bfa40347c0808",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5934.html",
            "sha256": "389fe3ebb23c47c4afb204137cdaf38cb2df770b58ed6d94992a2718f27cb30d",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAT6709.html",
            "sha256": "af3ab2cccba1514ead9d191af11e19235d569f4fd9c4b1cac7918636dc478de2",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5763.html",
            "sha256": "8b612f3caaff1fa3f2173b4e24ae2f6ea1f834998a2d3dcc38ec95f524d9735f",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5001.html",
            "sha256": "2587e455f2642cf31552b4da8957f8c52df9ce7541550d1fb09f449106055145",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5900.html",
            "sha256": "033c8f20977b46cd8cdf7b298599c91eed7df1c88d8d84938dc11c85cfcea6ba",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5712.html",
            "sha256": "7fb73da1671456e151b3277d764c48289749ff710bd2ab1c5e14e56821f225d9",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5724.html",
            "sha256": "8632693a5c66d9a8be7ef235b587c14edfafed8fa972f01845dd7e5ed96896ee",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5908.html",
            "sha256": "f4d05fcef40cb7f8f4e3c983cbe4217e734ea8362e7478ffb02ecb0b7cb39fd3",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5709.html",
            "sha256": "94439e7028ffca6d7468f14270e6d7032af69db15440384488ed5e946607346c",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "JANUS-ficha-MAP5747-v4.html",
            "sha256": "4dbadf79d11b5e5167dff647c6d726fc07d304751d0c99caae4eae93c8a36873",
            "area_code": "45132",
            "locator": "Version 4; area 45132; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAP5932.html",
            "sha256": "e1001d726b959985ae7c4e1316533d5c7d5b3a002ef0df65de4e35a0523753b6",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5007.html",
            "sha256": "c7a4289aa360187bae09e796e6b6fbd29ed457a1f5f7fb9550d3574369f19dd6",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5933.html",
            "sha256": "9625be01bbfcb7915f8a6c40b02cdf79e696687f85c674c0ee6857d1a52474e2",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5935.html",
            "sha256": "a4d9850987216d90c4889ee0364a7ff7e84830884eb38121e45ec73c7b97d742",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5902.html",
            "sha256": "22d3187b23e5851b769bf978570a789bd2a239a62c800121886d5e073336c878",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP4002.html",
            "sha256": "d51fa0d557172d0b171bf8188e493b25492f4a4af66002f535417d6a291cc8ad",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5006.html",
            "sha256": "e46b209d1217bfb2143ed287920fd601c2b2003c2cf362ca2e99f1b7c973ed85",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2025,
      "program": "MAP",
      "metric": "approvals",
      "value": 101,
      "status": "exact",
      "semantic_note": "Soma de turmas × média publicada de aprovados em disciplinas, não diplomas/titulações. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão. Cálculo aritmético com grupos de uma ou duas turmas e totais inteiros; nenhuma inferência de distribuição por desvio padrão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2025.html",
        "sha256": "080414250650a7135cbae8e4177ddfacff0bf076f67a49cec9b5d464c9a7580e",
        "window_start": "2025-01-01",
        "window_end": "2025-12-31",
        "locator": "CPG45; 19 linhas de disciplinas atribuídas a MAP; coorte conciliada com 19 ofertas históricas.",
        "course_codes": [
          "MAP4002",
          "MAP5001",
          "MAP5006",
          "MAP5007",
          "MAP5709",
          "MAP5711",
          "MAP5712",
          "MAP5724",
          "MAP5729",
          "MAP5747",
          "MAP5763",
          "MAP5900",
          "MAP5902",
          "MAP5908",
          "MAP5932",
          "MAP5933",
          "MAP5934",
          "MAP5935",
          "MAT6709"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MAP5711.html",
            "sha256": "53d7b0b306d54618fb90e2759dd1c8a8ab39ea57500b11b086414cbc281bd3ae",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5729.html",
            "sha256": "4c04ce94a0e46ca9c02f44527748e18592a356c687970b0b600bfa40347c0808",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5934.html",
            "sha256": "389fe3ebb23c47c4afb204137cdaf38cb2df770b58ed6d94992a2718f27cb30d",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAT6709.html",
            "sha256": "af3ab2cccba1514ead9d191af11e19235d569f4fd9c4b1cac7918636dc478de2",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5763.html",
            "sha256": "8b612f3caaff1fa3f2173b4e24ae2f6ea1f834998a2d3dcc38ec95f524d9735f",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5001.html",
            "sha256": "2587e455f2642cf31552b4da8957f8c52df9ce7541550d1fb09f449106055145",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5900.html",
            "sha256": "033c8f20977b46cd8cdf7b298599c91eed7df1c88d8d84938dc11c85cfcea6ba",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5712.html",
            "sha256": "7fb73da1671456e151b3277d764c48289749ff710bd2ab1c5e14e56821f225d9",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5724.html",
            "sha256": "8632693a5c66d9a8be7ef235b587c14edfafed8fa972f01845dd7e5ed96896ee",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5908.html",
            "sha256": "f4d05fcef40cb7f8f4e3c983cbe4217e734ea8362e7478ffb02ecb0b7cb39fd3",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5709.html",
            "sha256": "94439e7028ffca6d7468f14270e6d7032af69db15440384488ed5e946607346c",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "JANUS-ficha-MAP5747-v4.html",
            "sha256": "4dbadf79d11b5e5167dff647c6d726fc07d304751d0c99caae4eae93c8a36873",
            "area_code": "45132",
            "locator": "Version 4; area 45132; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAP5932.html",
            "sha256": "e1001d726b959985ae7c4e1316533d5c7d5b3a002ef0df65de4e35a0523753b6",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5007.html",
            "sha256": "c7a4289aa360187bae09e796e6b6fbd29ed457a1f5f7fb9550d3574369f19dd6",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5933.html",
            "sha256": "9625be01bbfcb7915f8a6c40b02cdf79e696687f85c674c0ee6857d1a52474e2",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5935.html",
            "sha256": "a4d9850987216d90c4889ee0364a7ff7e84830884eb38121e45ec73c7b97d742",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5902.html",
            "sha256": "22d3187b23e5851b769bf978570a789bd2a239a62c800121886d5e073336c878",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP4002.html",
            "sha256": "d51fa0d557172d0b171bf8188e493b25492f4a4af66002f535417d6a291cc8ad",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5006.html",
            "sha256": "e46b209d1217bfb2143ed287920fd601c2b2003c2cf362ca2e99f1b7c973ed85",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2025,
      "program": "MAP",
      "metric": "enrollments_per_section",
      "value": 6.421052631578948,
      "status": "exact",
      "semantic_note": "Total de matrículas dividido pelo número de turmas; média ponderada, não média simples entre disciplinas. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão. Cálculo aritmético com grupos de uma ou duas turmas e totais inteiros; nenhuma inferência de distribuição por desvio padrão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2025.html",
        "sha256": "080414250650a7135cbae8e4177ddfacff0bf076f67a49cec9b5d464c9a7580e",
        "window_start": "2025-01-01",
        "window_end": "2025-12-31",
        "locator": "CPG45; 19 linhas de disciplinas atribuídas a MAP; coorte conciliada com 19 ofertas históricas.",
        "course_codes": [
          "MAP4002",
          "MAP5001",
          "MAP5006",
          "MAP5007",
          "MAP5709",
          "MAP5711",
          "MAP5712",
          "MAP5724",
          "MAP5729",
          "MAP5747",
          "MAP5763",
          "MAP5900",
          "MAP5902",
          "MAP5908",
          "MAP5932",
          "MAP5933",
          "MAP5934",
          "MAP5935",
          "MAT6709"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MAP5711.html",
            "sha256": "53d7b0b306d54618fb90e2759dd1c8a8ab39ea57500b11b086414cbc281bd3ae",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5729.html",
            "sha256": "4c04ce94a0e46ca9c02f44527748e18592a356c687970b0b600bfa40347c0808",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5934.html",
            "sha256": "389fe3ebb23c47c4afb204137cdaf38cb2df770b58ed6d94992a2718f27cb30d",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAT6709.html",
            "sha256": "af3ab2cccba1514ead9d191af11e19235d569f4fd9c4b1cac7918636dc478de2",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5763.html",
            "sha256": "8b612f3caaff1fa3f2173b4e24ae2f6ea1f834998a2d3dcc38ec95f524d9735f",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5001.html",
            "sha256": "2587e455f2642cf31552b4da8957f8c52df9ce7541550d1fb09f449106055145",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5900.html",
            "sha256": "033c8f20977b46cd8cdf7b298599c91eed7df1c88d8d84938dc11c85cfcea6ba",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5712.html",
            "sha256": "7fb73da1671456e151b3277d764c48289749ff710bd2ab1c5e14e56821f225d9",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5724.html",
            "sha256": "8632693a5c66d9a8be7ef235b587c14edfafed8fa972f01845dd7e5ed96896ee",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5908.html",
            "sha256": "f4d05fcef40cb7f8f4e3c983cbe4217e734ea8362e7478ffb02ecb0b7cb39fd3",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5709.html",
            "sha256": "94439e7028ffca6d7468f14270e6d7032af69db15440384488ed5e946607346c",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "JANUS-ficha-MAP5747-v4.html",
            "sha256": "4dbadf79d11b5e5167dff647c6d726fc07d304751d0c99caae4eae93c8a36873",
            "area_code": "45132",
            "locator": "Version 4; area 45132; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAP5932.html",
            "sha256": "e1001d726b959985ae7c4e1316533d5c7d5b3a002ef0df65de4e35a0523753b6",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5007.html",
            "sha256": "c7a4289aa360187bae09e796e6b6fbd29ed457a1f5f7fb9550d3574369f19dd6",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5933.html",
            "sha256": "9625be01bbfcb7915f8a6c40b02cdf79e696687f85c674c0ee6857d1a52474e2",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5935.html",
            "sha256": "a4d9850987216d90c4889ee0364a7ff7e84830884eb38121e45ec73c7b97d742",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5902.html",
            "sha256": "22d3187b23e5851b769bf978570a789bd2a239a62c800121886d5e073336c878",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP4002.html",
            "sha256": "d51fa0d557172d0b171bf8188e493b25492f4a4af66002f535417d6a291cc8ad",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5006.html",
            "sha256": "e46b209d1217bfb2143ed287920fd601c2b2003c2cf362ca2e99f1b7c973ed85",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2025,
      "program": "MAP",
      "metric": "approval_rate",
      "value": 0.8278688524590164,
      "status": "exact",
      "semantic_note": "Aprovações em disciplinas divididas pelas matrículas até o final do oferecimento. Armazenada como fração0–1; ND se denominador zero. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão. Cálculo aritmético com grupos de uma ou duas turmas e totais inteiros; nenhuma inferência de distribuição por desvio padrão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2025.html",
        "sha256": "080414250650a7135cbae8e4177ddfacff0bf076f67a49cec9b5d464c9a7580e",
        "window_start": "2025-01-01",
        "window_end": "2025-12-31",
        "locator": "CPG45; 19 linhas de disciplinas atribuídas a MAP; coorte conciliada com 19 ofertas históricas.",
        "course_codes": [
          "MAP4002",
          "MAP5001",
          "MAP5006",
          "MAP5007",
          "MAP5709",
          "MAP5711",
          "MAP5712",
          "MAP5724",
          "MAP5729",
          "MAP5747",
          "MAP5763",
          "MAP5900",
          "MAP5902",
          "MAP5908",
          "MAP5932",
          "MAP5933",
          "MAP5934",
          "MAP5935",
          "MAT6709"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MAP5711.html",
            "sha256": "53d7b0b306d54618fb90e2759dd1c8a8ab39ea57500b11b086414cbc281bd3ae",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5729.html",
            "sha256": "4c04ce94a0e46ca9c02f44527748e18592a356c687970b0b600bfa40347c0808",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5934.html",
            "sha256": "389fe3ebb23c47c4afb204137cdaf38cb2df770b58ed6d94992a2718f27cb30d",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAT6709.html",
            "sha256": "af3ab2cccba1514ead9d191af11e19235d569f4fd9c4b1cac7918636dc478de2",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5763.html",
            "sha256": "8b612f3caaff1fa3f2173b4e24ae2f6ea1f834998a2d3dcc38ec95f524d9735f",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5001.html",
            "sha256": "2587e455f2642cf31552b4da8957f8c52df9ce7541550d1fb09f449106055145",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5900.html",
            "sha256": "033c8f20977b46cd8cdf7b298599c91eed7df1c88d8d84938dc11c85cfcea6ba",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5712.html",
            "sha256": "7fb73da1671456e151b3277d764c48289749ff710bd2ab1c5e14e56821f225d9",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5724.html",
            "sha256": "8632693a5c66d9a8be7ef235b587c14edfafed8fa972f01845dd7e5ed96896ee",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5908.html",
            "sha256": "f4d05fcef40cb7f8f4e3c983cbe4217e734ea8362e7478ffb02ecb0b7cb39fd3",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5709.html",
            "sha256": "94439e7028ffca6d7468f14270e6d7032af69db15440384488ed5e946607346c",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "JANUS-ficha-MAP5747-v4.html",
            "sha256": "4dbadf79d11b5e5167dff647c6d726fc07d304751d0c99caae4eae93c8a36873",
            "area_code": "45132",
            "locator": "Version 4; area 45132; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAP5932.html",
            "sha256": "e1001d726b959985ae7c4e1316533d5c7d5b3a002ef0df65de4e35a0523753b6",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5007.html",
            "sha256": "c7a4289aa360187bae09e796e6b6fbd29ed457a1f5f7fb9550d3574369f19dd6",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5933.html",
            "sha256": "9625be01bbfcb7915f8a6c40b02cdf79e696687f85c674c0ee6857d1a52474e2",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5935.html",
            "sha256": "a4d9850987216d90c4889ee0364a7ff7e84830884eb38121e45ec73c7b97d742",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5902.html",
            "sha256": "22d3187b23e5851b769bf978570a789bd2a239a62c800121886d5e073336c878",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP4002.html",
            "sha256": "d51fa0d557172d0b171bf8188e493b25492f4a4af66002f535417d6a291cc8ad",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          },
          {
            "file": "MAP5006.html",
            "sha256": "e46b209d1217bfb2143ed287920fd601c2b2003c2cf362ca2e99f1b7c973ed85",
            "area_code": "45132",
            "locator": "Área de Concentração: 45132"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "ratio"
    },
    {
      "year": 2025,
      "program": "PE",
      "metric": "courses",
      "value": 22,
      "status": "exact",
      "semantic_note": "Número de códigos de disciplinas distintos no relatório anual atribuído ao programa. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2025.html",
        "sha256": "080414250650a7135cbae8e4177ddfacff0bf076f67a49cec9b5d464c9a7580e",
        "window_start": "2025-01-01",
        "window_end": "2025-12-31",
        "locator": "CPG45; 22 linhas de disciplinas atribuídas a PE; coorte conciliada com 22 ofertas históricas.",
        "course_codes": [
          "IME4003",
          "MAE5702",
          "MAE5703",
          "MAE5704",
          "MAE5705",
          "MAE5709",
          "MAE5748",
          "MAE5755",
          "MAE5763",
          "MAE5783",
          "MAE5811",
          "MAE5815",
          "MAE5834",
          "MAE5870",
          "MAE5871",
          "MAE5890",
          "MAE5905",
          "MAE5910",
          "MAE5911",
          "MAE5914",
          "MAE5915",
          "MAE5916"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MAE5702.html",
            "sha256": "0081326630e98448577aa23cdb6cdc43af39519deadc22f1cd2c0572b98e7e6e",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5905.html",
            "sha256": "2541253042ae6a30220e45f42275cd7f505a31caae0ca3f72d03f05606401661",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5705.html",
            "sha256": "90872e8401b32cd466ae8f2c01e4263a3fc162ec3a183f7bcd297f5cde93e8c2",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5748.html",
            "sha256": "813b0ceb31f99407e2635dd8b7cf30eded4c8674eb35a4adf8c2cbdb0634d578",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5911.html",
            "sha256": "555a53e7c553d11d08560b57975e5244c52de6f7b2a5c3fbaf11b3c730a45282",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5704.html",
            "sha256": "34745af9510c7e020ecc37e95b8934c67254962a18c206b914a3a0f6054888b9",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5811.html",
            "sha256": "3e2662b16b6909e0a2bd5a80f2a46484356dd0936075d94ee508d5face2dd038",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5890.html",
            "sha256": "1f33fa12b619d3dae7179be2c73b374684b6f2dc33a1e30d939eba90dbd907d3",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5910.html",
            "sha256": "05cb364c3147de853fa3fa59e85e4ccf0e0029ae9cc725985ddfffc9ff44ef33",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5763.html",
            "sha256": "97cc2b962ce4dd9501ee3ab26de433fee126934a31cdf01d9362ab8180d5e1b4",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5834.html",
            "sha256": "7bad337365b098e9c5dfdd305f242103d788871781efb5eb07abb8dce3dcb95d",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5914.html",
            "sha256": "31ed0230b1bd1bc78c7e5da2e0e79226b72fbf6e11901cead221a345dd7f1571",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "IME4003.html",
            "sha256": "7e5aaa90cc198b664c49c1550e47198e9528e0bfaf71456e3905a9815857c7eb",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5755.html",
            "sha256": "7115bc48df82b0a65e2fd136eaaf91dfea0bc13e82d71d7bf14d1c352e5d7a1b",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "JANUS-ficha-MAE5871-v4.html",
            "sha256": "711c8d0e4dadfe23d584c93a29676f41a5f0a1405030c6dfe0c02f11b71adf6a",
            "area_code": "45133",
            "locator": "Version 4; area 45133; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAE5783.html",
            "sha256": "a0dd7fb826bc7fc9cba64242c79e503eb9e56be641c2ff4291d0c02bd388ff13",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5870.html",
            "sha256": "77fff2107a5ca006fb0537c0396354047db8a040972281b49645c072ff456f33",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5709.html",
            "sha256": "34bde3f4161f1cfb7cb7a7136b01c4062e56324c2ea2f6afa87170696f313cc0",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5703.html",
            "sha256": "929742e7ce6854129c1c7574883f9ff994759fc9371c00099f9579fb078b5746",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5915.html",
            "sha256": "5db194a8ac9a3ba4702b11c8944fb1144307ef76f7d58715877e0294357a9f4a",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5815.html",
            "sha256": "f6b546d66f9b83d0a78cfa6af498a215359065d2bf68add12b0b53459e7a0900",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5916.html",
            "sha256": "3792821bb651521ae7432e0fb84e4b5e64efff6b0f2211e9804f39c2c59419d6",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2025,
      "program": "PE",
      "metric": "sections",
      "value": 22,
      "status": "exact",
      "semantic_note": "Soma do número de turmas publicado por disciplina. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2025.html",
        "sha256": "080414250650a7135cbae8e4177ddfacff0bf076f67a49cec9b5d464c9a7580e",
        "window_start": "2025-01-01",
        "window_end": "2025-12-31",
        "locator": "CPG45; 22 linhas de disciplinas atribuídas a PE; coorte conciliada com 22 ofertas históricas.",
        "course_codes": [
          "IME4003",
          "MAE5702",
          "MAE5703",
          "MAE5704",
          "MAE5705",
          "MAE5709",
          "MAE5748",
          "MAE5755",
          "MAE5763",
          "MAE5783",
          "MAE5811",
          "MAE5815",
          "MAE5834",
          "MAE5870",
          "MAE5871",
          "MAE5890",
          "MAE5905",
          "MAE5910",
          "MAE5911",
          "MAE5914",
          "MAE5915",
          "MAE5916"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MAE5702.html",
            "sha256": "0081326630e98448577aa23cdb6cdc43af39519deadc22f1cd2c0572b98e7e6e",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5905.html",
            "sha256": "2541253042ae6a30220e45f42275cd7f505a31caae0ca3f72d03f05606401661",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5705.html",
            "sha256": "90872e8401b32cd466ae8f2c01e4263a3fc162ec3a183f7bcd297f5cde93e8c2",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5748.html",
            "sha256": "813b0ceb31f99407e2635dd8b7cf30eded4c8674eb35a4adf8c2cbdb0634d578",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5911.html",
            "sha256": "555a53e7c553d11d08560b57975e5244c52de6f7b2a5c3fbaf11b3c730a45282",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5704.html",
            "sha256": "34745af9510c7e020ecc37e95b8934c67254962a18c206b914a3a0f6054888b9",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5811.html",
            "sha256": "3e2662b16b6909e0a2bd5a80f2a46484356dd0936075d94ee508d5face2dd038",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5890.html",
            "sha256": "1f33fa12b619d3dae7179be2c73b374684b6f2dc33a1e30d939eba90dbd907d3",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5910.html",
            "sha256": "05cb364c3147de853fa3fa59e85e4ccf0e0029ae9cc725985ddfffc9ff44ef33",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5763.html",
            "sha256": "97cc2b962ce4dd9501ee3ab26de433fee126934a31cdf01d9362ab8180d5e1b4",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5834.html",
            "sha256": "7bad337365b098e9c5dfdd305f242103d788871781efb5eb07abb8dce3dcb95d",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5914.html",
            "sha256": "31ed0230b1bd1bc78c7e5da2e0e79226b72fbf6e11901cead221a345dd7f1571",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "IME4003.html",
            "sha256": "7e5aaa90cc198b664c49c1550e47198e9528e0bfaf71456e3905a9815857c7eb",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5755.html",
            "sha256": "7115bc48df82b0a65e2fd136eaaf91dfea0bc13e82d71d7bf14d1c352e5d7a1b",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "JANUS-ficha-MAE5871-v4.html",
            "sha256": "711c8d0e4dadfe23d584c93a29676f41a5f0a1405030c6dfe0c02f11b71adf6a",
            "area_code": "45133",
            "locator": "Version 4; area 45133; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAE5783.html",
            "sha256": "a0dd7fb826bc7fc9cba64242c79e503eb9e56be641c2ff4291d0c02bd388ff13",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5870.html",
            "sha256": "77fff2107a5ca006fb0537c0396354047db8a040972281b49645c072ff456f33",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5709.html",
            "sha256": "34bde3f4161f1cfb7cb7a7136b01c4062e56324c2ea2f6afa87170696f313cc0",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5703.html",
            "sha256": "929742e7ce6854129c1c7574883f9ff994759fc9371c00099f9579fb078b5746",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5915.html",
            "sha256": "5db194a8ac9a3ba4702b11c8944fb1144307ef76f7d58715877e0294357a9f4a",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5815.html",
            "sha256": "f6b546d66f9b83d0a78cfa6af498a215359065d2bf68add12b0b53459e7a0900",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5916.html",
            "sha256": "3792821bb651521ae7432e0fb84e4b5e64efff6b0f2211e9804f39c2c59419d6",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2025,
      "program": "PE",
      "metric": "applications",
      "value": 305,
      "status": "exact",
      "semantic_note": "Soma de turmas × média publicada de inscritos. Inscrições não equivalem a matrículas até o final do oferecimento. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão. Cálculo aritmético com grupos de uma ou duas turmas e totais inteiros; nenhuma inferência de distribuição por desvio padrão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2025.html",
        "sha256": "080414250650a7135cbae8e4177ddfacff0bf076f67a49cec9b5d464c9a7580e",
        "window_start": "2025-01-01",
        "window_end": "2025-12-31",
        "locator": "CPG45; 22 linhas de disciplinas atribuídas a PE; coorte conciliada com 22 ofertas históricas.",
        "course_codes": [
          "IME4003",
          "MAE5702",
          "MAE5703",
          "MAE5704",
          "MAE5705",
          "MAE5709",
          "MAE5748",
          "MAE5755",
          "MAE5763",
          "MAE5783",
          "MAE5811",
          "MAE5815",
          "MAE5834",
          "MAE5870",
          "MAE5871",
          "MAE5890",
          "MAE5905",
          "MAE5910",
          "MAE5911",
          "MAE5914",
          "MAE5915",
          "MAE5916"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MAE5702.html",
            "sha256": "0081326630e98448577aa23cdb6cdc43af39519deadc22f1cd2c0572b98e7e6e",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5905.html",
            "sha256": "2541253042ae6a30220e45f42275cd7f505a31caae0ca3f72d03f05606401661",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5705.html",
            "sha256": "90872e8401b32cd466ae8f2c01e4263a3fc162ec3a183f7bcd297f5cde93e8c2",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5748.html",
            "sha256": "813b0ceb31f99407e2635dd8b7cf30eded4c8674eb35a4adf8c2cbdb0634d578",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5911.html",
            "sha256": "555a53e7c553d11d08560b57975e5244c52de6f7b2a5c3fbaf11b3c730a45282",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5704.html",
            "sha256": "34745af9510c7e020ecc37e95b8934c67254962a18c206b914a3a0f6054888b9",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5811.html",
            "sha256": "3e2662b16b6909e0a2bd5a80f2a46484356dd0936075d94ee508d5face2dd038",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5890.html",
            "sha256": "1f33fa12b619d3dae7179be2c73b374684b6f2dc33a1e30d939eba90dbd907d3",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5910.html",
            "sha256": "05cb364c3147de853fa3fa59e85e4ccf0e0029ae9cc725985ddfffc9ff44ef33",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5763.html",
            "sha256": "97cc2b962ce4dd9501ee3ab26de433fee126934a31cdf01d9362ab8180d5e1b4",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5834.html",
            "sha256": "7bad337365b098e9c5dfdd305f242103d788871781efb5eb07abb8dce3dcb95d",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5914.html",
            "sha256": "31ed0230b1bd1bc78c7e5da2e0e79226b72fbf6e11901cead221a345dd7f1571",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "IME4003.html",
            "sha256": "7e5aaa90cc198b664c49c1550e47198e9528e0bfaf71456e3905a9815857c7eb",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5755.html",
            "sha256": "7115bc48df82b0a65e2fd136eaaf91dfea0bc13e82d71d7bf14d1c352e5d7a1b",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "JANUS-ficha-MAE5871-v4.html",
            "sha256": "711c8d0e4dadfe23d584c93a29676f41a5f0a1405030c6dfe0c02f11b71adf6a",
            "area_code": "45133",
            "locator": "Version 4; area 45133; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAE5783.html",
            "sha256": "a0dd7fb826bc7fc9cba64242c79e503eb9e56be641c2ff4291d0c02bd388ff13",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5870.html",
            "sha256": "77fff2107a5ca006fb0537c0396354047db8a040972281b49645c072ff456f33",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5709.html",
            "sha256": "34bde3f4161f1cfb7cb7a7136b01c4062e56324c2ea2f6afa87170696f313cc0",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5703.html",
            "sha256": "929742e7ce6854129c1c7574883f9ff994759fc9371c00099f9579fb078b5746",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5915.html",
            "sha256": "5db194a8ac9a3ba4702b11c8944fb1144307ef76f7d58715877e0294357a9f4a",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5815.html",
            "sha256": "f6b546d66f9b83d0a78cfa6af498a215359065d2bf68add12b0b53459e7a0900",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5916.html",
            "sha256": "3792821bb651521ae7432e0fb84e4b5e64efff6b0f2211e9804f39c2c59419d6",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2025,
      "program": "PE",
      "metric": "enrollments",
      "value": 262,
      "status": "exact",
      "semantic_note": "Soma de turmas × média publicada de matriculados que permaneceram até o final do oferecimento. São vínculos estudante–turma, não estudantes distintos. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão. Cálculo aritmético com grupos de uma ou duas turmas e totais inteiros; nenhuma inferência de distribuição por desvio padrão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2025.html",
        "sha256": "080414250650a7135cbae8e4177ddfacff0bf076f67a49cec9b5d464c9a7580e",
        "window_start": "2025-01-01",
        "window_end": "2025-12-31",
        "locator": "CPG45; 22 linhas de disciplinas atribuídas a PE; coorte conciliada com 22 ofertas históricas.",
        "course_codes": [
          "IME4003",
          "MAE5702",
          "MAE5703",
          "MAE5704",
          "MAE5705",
          "MAE5709",
          "MAE5748",
          "MAE5755",
          "MAE5763",
          "MAE5783",
          "MAE5811",
          "MAE5815",
          "MAE5834",
          "MAE5870",
          "MAE5871",
          "MAE5890",
          "MAE5905",
          "MAE5910",
          "MAE5911",
          "MAE5914",
          "MAE5915",
          "MAE5916"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MAE5702.html",
            "sha256": "0081326630e98448577aa23cdb6cdc43af39519deadc22f1cd2c0572b98e7e6e",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5905.html",
            "sha256": "2541253042ae6a30220e45f42275cd7f505a31caae0ca3f72d03f05606401661",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5705.html",
            "sha256": "90872e8401b32cd466ae8f2c01e4263a3fc162ec3a183f7bcd297f5cde93e8c2",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5748.html",
            "sha256": "813b0ceb31f99407e2635dd8b7cf30eded4c8674eb35a4adf8c2cbdb0634d578",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5911.html",
            "sha256": "555a53e7c553d11d08560b57975e5244c52de6f7b2a5c3fbaf11b3c730a45282",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5704.html",
            "sha256": "34745af9510c7e020ecc37e95b8934c67254962a18c206b914a3a0f6054888b9",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5811.html",
            "sha256": "3e2662b16b6909e0a2bd5a80f2a46484356dd0936075d94ee508d5face2dd038",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5890.html",
            "sha256": "1f33fa12b619d3dae7179be2c73b374684b6f2dc33a1e30d939eba90dbd907d3",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5910.html",
            "sha256": "05cb364c3147de853fa3fa59e85e4ccf0e0029ae9cc725985ddfffc9ff44ef33",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5763.html",
            "sha256": "97cc2b962ce4dd9501ee3ab26de433fee126934a31cdf01d9362ab8180d5e1b4",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5834.html",
            "sha256": "7bad337365b098e9c5dfdd305f242103d788871781efb5eb07abb8dce3dcb95d",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5914.html",
            "sha256": "31ed0230b1bd1bc78c7e5da2e0e79226b72fbf6e11901cead221a345dd7f1571",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "IME4003.html",
            "sha256": "7e5aaa90cc198b664c49c1550e47198e9528e0bfaf71456e3905a9815857c7eb",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5755.html",
            "sha256": "7115bc48df82b0a65e2fd136eaaf91dfea0bc13e82d71d7bf14d1c352e5d7a1b",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "JANUS-ficha-MAE5871-v4.html",
            "sha256": "711c8d0e4dadfe23d584c93a29676f41a5f0a1405030c6dfe0c02f11b71adf6a",
            "area_code": "45133",
            "locator": "Version 4; area 45133; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAE5783.html",
            "sha256": "a0dd7fb826bc7fc9cba64242c79e503eb9e56be641c2ff4291d0c02bd388ff13",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5870.html",
            "sha256": "77fff2107a5ca006fb0537c0396354047db8a040972281b49645c072ff456f33",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5709.html",
            "sha256": "34bde3f4161f1cfb7cb7a7136b01c4062e56324c2ea2f6afa87170696f313cc0",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5703.html",
            "sha256": "929742e7ce6854129c1c7574883f9ff994759fc9371c00099f9579fb078b5746",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5915.html",
            "sha256": "5db194a8ac9a3ba4702b11c8944fb1144307ef76f7d58715877e0294357a9f4a",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5815.html",
            "sha256": "f6b546d66f9b83d0a78cfa6af498a215359065d2bf68add12b0b53459e7a0900",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5916.html",
            "sha256": "3792821bb651521ae7432e0fb84e4b5e64efff6b0f2211e9804f39c2c59419d6",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2025,
      "program": "PE",
      "metric": "approvals",
      "value": 235,
      "status": "exact",
      "semantic_note": "Soma de turmas × média publicada de aprovados em disciplinas, não diplomas/titulações. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão. Cálculo aritmético com grupos de uma ou duas turmas e totais inteiros; nenhuma inferência de distribuição por desvio padrão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2025.html",
        "sha256": "080414250650a7135cbae8e4177ddfacff0bf076f67a49cec9b5d464c9a7580e",
        "window_start": "2025-01-01",
        "window_end": "2025-12-31",
        "locator": "CPG45; 22 linhas de disciplinas atribuídas a PE; coorte conciliada com 22 ofertas históricas.",
        "course_codes": [
          "IME4003",
          "MAE5702",
          "MAE5703",
          "MAE5704",
          "MAE5705",
          "MAE5709",
          "MAE5748",
          "MAE5755",
          "MAE5763",
          "MAE5783",
          "MAE5811",
          "MAE5815",
          "MAE5834",
          "MAE5870",
          "MAE5871",
          "MAE5890",
          "MAE5905",
          "MAE5910",
          "MAE5911",
          "MAE5914",
          "MAE5915",
          "MAE5916"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MAE5702.html",
            "sha256": "0081326630e98448577aa23cdb6cdc43af39519deadc22f1cd2c0572b98e7e6e",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5905.html",
            "sha256": "2541253042ae6a30220e45f42275cd7f505a31caae0ca3f72d03f05606401661",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5705.html",
            "sha256": "90872e8401b32cd466ae8f2c01e4263a3fc162ec3a183f7bcd297f5cde93e8c2",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5748.html",
            "sha256": "813b0ceb31f99407e2635dd8b7cf30eded4c8674eb35a4adf8c2cbdb0634d578",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5911.html",
            "sha256": "555a53e7c553d11d08560b57975e5244c52de6f7b2a5c3fbaf11b3c730a45282",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5704.html",
            "sha256": "34745af9510c7e020ecc37e95b8934c67254962a18c206b914a3a0f6054888b9",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5811.html",
            "sha256": "3e2662b16b6909e0a2bd5a80f2a46484356dd0936075d94ee508d5face2dd038",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5890.html",
            "sha256": "1f33fa12b619d3dae7179be2c73b374684b6f2dc33a1e30d939eba90dbd907d3",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5910.html",
            "sha256": "05cb364c3147de853fa3fa59e85e4ccf0e0029ae9cc725985ddfffc9ff44ef33",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5763.html",
            "sha256": "97cc2b962ce4dd9501ee3ab26de433fee126934a31cdf01d9362ab8180d5e1b4",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5834.html",
            "sha256": "7bad337365b098e9c5dfdd305f242103d788871781efb5eb07abb8dce3dcb95d",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5914.html",
            "sha256": "31ed0230b1bd1bc78c7e5da2e0e79226b72fbf6e11901cead221a345dd7f1571",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "IME4003.html",
            "sha256": "7e5aaa90cc198b664c49c1550e47198e9528e0bfaf71456e3905a9815857c7eb",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5755.html",
            "sha256": "7115bc48df82b0a65e2fd136eaaf91dfea0bc13e82d71d7bf14d1c352e5d7a1b",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "JANUS-ficha-MAE5871-v4.html",
            "sha256": "711c8d0e4dadfe23d584c93a29676f41a5f0a1405030c6dfe0c02f11b71adf6a",
            "area_code": "45133",
            "locator": "Version 4; area 45133; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAE5783.html",
            "sha256": "a0dd7fb826bc7fc9cba64242c79e503eb9e56be641c2ff4291d0c02bd388ff13",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5870.html",
            "sha256": "77fff2107a5ca006fb0537c0396354047db8a040972281b49645c072ff456f33",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5709.html",
            "sha256": "34bde3f4161f1cfb7cb7a7136b01c4062e56324c2ea2f6afa87170696f313cc0",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5703.html",
            "sha256": "929742e7ce6854129c1c7574883f9ff994759fc9371c00099f9579fb078b5746",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5915.html",
            "sha256": "5db194a8ac9a3ba4702b11c8944fb1144307ef76f7d58715877e0294357a9f4a",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5815.html",
            "sha256": "f6b546d66f9b83d0a78cfa6af498a215359065d2bf68add12b0b53459e7a0900",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5916.html",
            "sha256": "3792821bb651521ae7432e0fb84e4b5e64efff6b0f2211e9804f39c2c59419d6",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2025,
      "program": "PE",
      "metric": "enrollments_per_section",
      "value": 11.909090909090908,
      "status": "exact",
      "semantic_note": "Total de matrículas dividido pelo número de turmas; média ponderada, não média simples entre disciplinas. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão. Cálculo aritmético com grupos de uma ou duas turmas e totais inteiros; nenhuma inferência de distribuição por desvio padrão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2025.html",
        "sha256": "080414250650a7135cbae8e4177ddfacff0bf076f67a49cec9b5d464c9a7580e",
        "window_start": "2025-01-01",
        "window_end": "2025-12-31",
        "locator": "CPG45; 22 linhas de disciplinas atribuídas a PE; coorte conciliada com 22 ofertas históricas.",
        "course_codes": [
          "IME4003",
          "MAE5702",
          "MAE5703",
          "MAE5704",
          "MAE5705",
          "MAE5709",
          "MAE5748",
          "MAE5755",
          "MAE5763",
          "MAE5783",
          "MAE5811",
          "MAE5815",
          "MAE5834",
          "MAE5870",
          "MAE5871",
          "MAE5890",
          "MAE5905",
          "MAE5910",
          "MAE5911",
          "MAE5914",
          "MAE5915",
          "MAE5916"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MAE5702.html",
            "sha256": "0081326630e98448577aa23cdb6cdc43af39519deadc22f1cd2c0572b98e7e6e",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5905.html",
            "sha256": "2541253042ae6a30220e45f42275cd7f505a31caae0ca3f72d03f05606401661",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5705.html",
            "sha256": "90872e8401b32cd466ae8f2c01e4263a3fc162ec3a183f7bcd297f5cde93e8c2",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5748.html",
            "sha256": "813b0ceb31f99407e2635dd8b7cf30eded4c8674eb35a4adf8c2cbdb0634d578",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5911.html",
            "sha256": "555a53e7c553d11d08560b57975e5244c52de6f7b2a5c3fbaf11b3c730a45282",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5704.html",
            "sha256": "34745af9510c7e020ecc37e95b8934c67254962a18c206b914a3a0f6054888b9",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5811.html",
            "sha256": "3e2662b16b6909e0a2bd5a80f2a46484356dd0936075d94ee508d5face2dd038",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5890.html",
            "sha256": "1f33fa12b619d3dae7179be2c73b374684b6f2dc33a1e30d939eba90dbd907d3",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5910.html",
            "sha256": "05cb364c3147de853fa3fa59e85e4ccf0e0029ae9cc725985ddfffc9ff44ef33",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5763.html",
            "sha256": "97cc2b962ce4dd9501ee3ab26de433fee126934a31cdf01d9362ab8180d5e1b4",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5834.html",
            "sha256": "7bad337365b098e9c5dfdd305f242103d788871781efb5eb07abb8dce3dcb95d",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5914.html",
            "sha256": "31ed0230b1bd1bc78c7e5da2e0e79226b72fbf6e11901cead221a345dd7f1571",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "IME4003.html",
            "sha256": "7e5aaa90cc198b664c49c1550e47198e9528e0bfaf71456e3905a9815857c7eb",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5755.html",
            "sha256": "7115bc48df82b0a65e2fd136eaaf91dfea0bc13e82d71d7bf14d1c352e5d7a1b",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "JANUS-ficha-MAE5871-v4.html",
            "sha256": "711c8d0e4dadfe23d584c93a29676f41a5f0a1405030c6dfe0c02f11b71adf6a",
            "area_code": "45133",
            "locator": "Version 4; area 45133; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAE5783.html",
            "sha256": "a0dd7fb826bc7fc9cba64242c79e503eb9e56be641c2ff4291d0c02bd388ff13",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5870.html",
            "sha256": "77fff2107a5ca006fb0537c0396354047db8a040972281b49645c072ff456f33",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5709.html",
            "sha256": "34bde3f4161f1cfb7cb7a7136b01c4062e56324c2ea2f6afa87170696f313cc0",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5703.html",
            "sha256": "929742e7ce6854129c1c7574883f9ff994759fc9371c00099f9579fb078b5746",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5915.html",
            "sha256": "5db194a8ac9a3ba4702b11c8944fb1144307ef76f7d58715877e0294357a9f4a",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5815.html",
            "sha256": "f6b546d66f9b83d0a78cfa6af498a215359065d2bf68add12b0b53459e7a0900",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5916.html",
            "sha256": "3792821bb651521ae7432e0fb84e4b5e64efff6b0f2211e9804f39c2c59419d6",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2025,
      "program": "PE",
      "metric": "approval_rate",
      "value": 0.8969465648854962,
      "status": "exact",
      "semantic_note": "Aprovações em disciplinas divididas pelas matrículas até o final do oferecimento. Armazenada como fração0–1; ND se denominador zero. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão. Cálculo aritmético com grupos de uma ou duas turmas e totais inteiros; nenhuma inferência de distribuição por desvio padrão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2025.html",
        "sha256": "080414250650a7135cbae8e4177ddfacff0bf076f67a49cec9b5d464c9a7580e",
        "window_start": "2025-01-01",
        "window_end": "2025-12-31",
        "locator": "CPG45; 22 linhas de disciplinas atribuídas a PE; coorte conciliada com 22 ofertas históricas.",
        "course_codes": [
          "IME4003",
          "MAE5702",
          "MAE5703",
          "MAE5704",
          "MAE5705",
          "MAE5709",
          "MAE5748",
          "MAE5755",
          "MAE5763",
          "MAE5783",
          "MAE5811",
          "MAE5815",
          "MAE5834",
          "MAE5870",
          "MAE5871",
          "MAE5890",
          "MAE5905",
          "MAE5910",
          "MAE5911",
          "MAE5914",
          "MAE5915",
          "MAE5916"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MAE5702.html",
            "sha256": "0081326630e98448577aa23cdb6cdc43af39519deadc22f1cd2c0572b98e7e6e",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5905.html",
            "sha256": "2541253042ae6a30220e45f42275cd7f505a31caae0ca3f72d03f05606401661",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5705.html",
            "sha256": "90872e8401b32cd466ae8f2c01e4263a3fc162ec3a183f7bcd297f5cde93e8c2",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5748.html",
            "sha256": "813b0ceb31f99407e2635dd8b7cf30eded4c8674eb35a4adf8c2cbdb0634d578",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5911.html",
            "sha256": "555a53e7c553d11d08560b57975e5244c52de6f7b2a5c3fbaf11b3c730a45282",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5704.html",
            "sha256": "34745af9510c7e020ecc37e95b8934c67254962a18c206b914a3a0f6054888b9",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5811.html",
            "sha256": "3e2662b16b6909e0a2bd5a80f2a46484356dd0936075d94ee508d5face2dd038",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5890.html",
            "sha256": "1f33fa12b619d3dae7179be2c73b374684b6f2dc33a1e30d939eba90dbd907d3",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5910.html",
            "sha256": "05cb364c3147de853fa3fa59e85e4ccf0e0029ae9cc725985ddfffc9ff44ef33",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5763.html",
            "sha256": "97cc2b962ce4dd9501ee3ab26de433fee126934a31cdf01d9362ab8180d5e1b4",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5834.html",
            "sha256": "7bad337365b098e9c5dfdd305f242103d788871781efb5eb07abb8dce3dcb95d",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5914.html",
            "sha256": "31ed0230b1bd1bc78c7e5da2e0e79226b72fbf6e11901cead221a345dd7f1571",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "IME4003.html",
            "sha256": "7e5aaa90cc198b664c49c1550e47198e9528e0bfaf71456e3905a9815857c7eb",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5755.html",
            "sha256": "7115bc48df82b0a65e2fd136eaaf91dfea0bc13e82d71d7bf14d1c352e5d7a1b",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "JANUS-ficha-MAE5871-v4.html",
            "sha256": "711c8d0e4dadfe23d584c93a29676f41a5f0a1405030c6dfe0c02f11b71adf6a",
            "area_code": "45133",
            "locator": "Version 4; area 45133; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MAE5783.html",
            "sha256": "a0dd7fb826bc7fc9cba64242c79e503eb9e56be641c2ff4291d0c02bd388ff13",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5870.html",
            "sha256": "77fff2107a5ca006fb0537c0396354047db8a040972281b49645c072ff456f33",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5709.html",
            "sha256": "34bde3f4161f1cfb7cb7a7136b01c4062e56324c2ea2f6afa87170696f313cc0",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5703.html",
            "sha256": "929742e7ce6854129c1c7574883f9ff994759fc9371c00099f9579fb078b5746",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5915.html",
            "sha256": "5db194a8ac9a3ba4702b11c8944fb1144307ef76f7d58715877e0294357a9f4a",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5815.html",
            "sha256": "f6b546d66f9b83d0a78cfa6af498a215359065d2bf68add12b0b53459e7a0900",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          },
          {
            "file": "MAE5916.html",
            "sha256": "3792821bb651521ae7432e0fb84e4b5e64efff6b0f2211e9804f39c2c59419d6",
            "area_code": "45133",
            "locator": "Área de Concentração: 45133"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "ratio"
    },
    {
      "year": 2025,
      "program": "MPEM",
      "metric": "courses",
      "value": 13,
      "status": "exact",
      "semantic_note": "Número de códigos de disciplinas distintos no relatório anual atribuído ao programa. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2025.html",
        "sha256": "080414250650a7135cbae8e4177ddfacff0bf076f67a49cec9b5d464c9a7580e",
        "window_start": "2025-01-01",
        "window_end": "2025-12-31",
        "locator": "CPG45; 13 linhas de disciplinas atribuídas a MPEM; coorte conciliada com 14 ofertas históricas.",
        "course_codes": [
          "MPM5601",
          "MPM5602",
          "MPM5604",
          "MPM5605",
          "MPM5606",
          "MPM5607",
          "MPM5608",
          "MPM5609",
          "MPM5610",
          "MPM5612",
          "MPM5613",
          "MPM5614",
          "MPM5617"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MPM5617.html",
            "sha256": "f9ce0cbe70868b3dcc202425fe404cc6d38c0b7c5bb20fdf61e74f8d2951ca67",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5607.html",
            "sha256": "d86daa31bd5bbaef0ddb8356f3cf72f3544927d737d2b07fb3357ec217b4c154",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "fichas_janus_recuperadas_5606_5608.json",
            "sha256": "c532adff51998deb265c985a469a8f080b5e587629b8c4953d364f82235b8cde",
            "area_code": "45135",
            "locator": "Extrato factual oficial indexado; rows[course_code=MPM5608].area_code=45135; URL https://uspdigital.usp.br/janus/Disciplina?sgldis=MPM5608"
          },
          {
            "file": "MPM5602.html",
            "sha256": "7529a229a445504853c396204c9231e4c53f09eef3d207ded2a8b5116d4bd8c1",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "JANUS-ficha-MPM5610-v3.html",
            "sha256": "2a4096d7e7d8e4c58deac2320c838b48e47234e3088579274280573a0e8213e8",
            "area_code": "45135",
            "locator": "Version 3; area 45135; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MPM5605.html",
            "sha256": "6b2b49a4d862fc09af11a5b40c88cbc584fea9ca9a4e10fa5623fe73f8c54df6",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5604.html",
            "sha256": "7333e1b32f4825df981866b9cab07a0a1bf8d1374dde940d444c097be23660b9",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5614.html",
            "sha256": "20815bd3c74f9fba4d8c5549d37417b355fbb07d0dc7b344f2edda5d0fa124ba",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5609.html",
            "sha256": "1e373d76fdc93ac6d33db10d2dca1d75fc5694242bd202c25ae84ad443d4de62",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5601.html",
            "sha256": "a3a548e63af0ac29d7404aea68f175a3900f273d6c8051ed0ba9495df97c4a68",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5612.html",
            "sha256": "aa5074b190f5fc792cf1b89ec5aef930c9c5659065e48ccf05295d84f38b6096",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5613.html",
            "sha256": "34979971b77e0bf1296578fcb39dd28c9c52fc4857a72a422b15da3fc8c35386",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2025,
      "program": "MPEM",
      "metric": "sections",
      "value": 14,
      "status": "exact",
      "semantic_note": "Soma do número de turmas publicado por disciplina. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2025.html",
        "sha256": "080414250650a7135cbae8e4177ddfacff0bf076f67a49cec9b5d464c9a7580e",
        "window_start": "2025-01-01",
        "window_end": "2025-12-31",
        "locator": "CPG45; 13 linhas de disciplinas atribuídas a MPEM; coorte conciliada com 14 ofertas históricas.",
        "course_codes": [
          "MPM5601",
          "MPM5602",
          "MPM5604",
          "MPM5605",
          "MPM5606",
          "MPM5607",
          "MPM5608",
          "MPM5609",
          "MPM5610",
          "MPM5612",
          "MPM5613",
          "MPM5614",
          "MPM5617"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MPM5617.html",
            "sha256": "f9ce0cbe70868b3dcc202425fe404cc6d38c0b7c5bb20fdf61e74f8d2951ca67",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5607.html",
            "sha256": "d86daa31bd5bbaef0ddb8356f3cf72f3544927d737d2b07fb3357ec217b4c154",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "fichas_janus_recuperadas_5606_5608.json",
            "sha256": "c532adff51998deb265c985a469a8f080b5e587629b8c4953d364f82235b8cde",
            "area_code": "45135",
            "locator": "Extrato factual oficial indexado; rows[course_code=MPM5608].area_code=45135; URL https://uspdigital.usp.br/janus/Disciplina?sgldis=MPM5608"
          },
          {
            "file": "MPM5602.html",
            "sha256": "7529a229a445504853c396204c9231e4c53f09eef3d207ded2a8b5116d4bd8c1",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "JANUS-ficha-MPM5610-v3.html",
            "sha256": "2a4096d7e7d8e4c58deac2320c838b48e47234e3088579274280573a0e8213e8",
            "area_code": "45135",
            "locator": "Version 3; area 45135; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MPM5605.html",
            "sha256": "6b2b49a4d862fc09af11a5b40c88cbc584fea9ca9a4e10fa5623fe73f8c54df6",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5604.html",
            "sha256": "7333e1b32f4825df981866b9cab07a0a1bf8d1374dde940d444c097be23660b9",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5614.html",
            "sha256": "20815bd3c74f9fba4d8c5549d37417b355fbb07d0dc7b344f2edda5d0fa124ba",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5609.html",
            "sha256": "1e373d76fdc93ac6d33db10d2dca1d75fc5694242bd202c25ae84ad443d4de62",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5601.html",
            "sha256": "a3a548e63af0ac29d7404aea68f175a3900f273d6c8051ed0ba9495df97c4a68",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5612.html",
            "sha256": "aa5074b190f5fc792cf1b89ec5aef930c9c5659065e48ccf05295d84f38b6096",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5613.html",
            "sha256": "34979971b77e0bf1296578fcb39dd28c9c52fc4857a72a422b15da3fc8c35386",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2025,
      "program": "MPEM",
      "metric": "applications",
      "value": 282,
      "status": "exact",
      "semantic_note": "Soma de turmas × média publicada de inscritos. Inscrições não equivalem a matrículas até o final do oferecimento. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão. Cálculo aritmético com grupos de uma ou duas turmas e totais inteiros; nenhuma inferência de distribuição por desvio padrão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2025.html",
        "sha256": "080414250650a7135cbae8e4177ddfacff0bf076f67a49cec9b5d464c9a7580e",
        "window_start": "2025-01-01",
        "window_end": "2025-12-31",
        "locator": "CPG45; 13 linhas de disciplinas atribuídas a MPEM; coorte conciliada com 14 ofertas históricas.",
        "course_codes": [
          "MPM5601",
          "MPM5602",
          "MPM5604",
          "MPM5605",
          "MPM5606",
          "MPM5607",
          "MPM5608",
          "MPM5609",
          "MPM5610",
          "MPM5612",
          "MPM5613",
          "MPM5614",
          "MPM5617"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MPM5617.html",
            "sha256": "f9ce0cbe70868b3dcc202425fe404cc6d38c0b7c5bb20fdf61e74f8d2951ca67",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5607.html",
            "sha256": "d86daa31bd5bbaef0ddb8356f3cf72f3544927d737d2b07fb3357ec217b4c154",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "fichas_janus_recuperadas_5606_5608.json",
            "sha256": "c532adff51998deb265c985a469a8f080b5e587629b8c4953d364f82235b8cde",
            "area_code": "45135",
            "locator": "Extrato factual oficial indexado; rows[course_code=MPM5608].area_code=45135; URL https://uspdigital.usp.br/janus/Disciplina?sgldis=MPM5608"
          },
          {
            "file": "MPM5602.html",
            "sha256": "7529a229a445504853c396204c9231e4c53f09eef3d207ded2a8b5116d4bd8c1",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "JANUS-ficha-MPM5610-v3.html",
            "sha256": "2a4096d7e7d8e4c58deac2320c838b48e47234e3088579274280573a0e8213e8",
            "area_code": "45135",
            "locator": "Version 3; area 45135; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MPM5605.html",
            "sha256": "6b2b49a4d862fc09af11a5b40c88cbc584fea9ca9a4e10fa5623fe73f8c54df6",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5604.html",
            "sha256": "7333e1b32f4825df981866b9cab07a0a1bf8d1374dde940d444c097be23660b9",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5614.html",
            "sha256": "20815bd3c74f9fba4d8c5549d37417b355fbb07d0dc7b344f2edda5d0fa124ba",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5609.html",
            "sha256": "1e373d76fdc93ac6d33db10d2dca1d75fc5694242bd202c25ae84ad443d4de62",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5601.html",
            "sha256": "a3a548e63af0ac29d7404aea68f175a3900f273d6c8051ed0ba9495df97c4a68",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5612.html",
            "sha256": "aa5074b190f5fc792cf1b89ec5aef930c9c5659065e48ccf05295d84f38b6096",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5613.html",
            "sha256": "34979971b77e0bf1296578fcb39dd28c9c52fc4857a72a422b15da3fc8c35386",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2025,
      "program": "MPEM",
      "metric": "enrollments",
      "value": 242,
      "status": "exact",
      "semantic_note": "Soma de turmas × média publicada de matriculados que permaneceram até o final do oferecimento. São vínculos estudante–turma, não estudantes distintos. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão. Cálculo aritmético com grupos de uma ou duas turmas e totais inteiros; nenhuma inferência de distribuição por desvio padrão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2025.html",
        "sha256": "080414250650a7135cbae8e4177ddfacff0bf076f67a49cec9b5d464c9a7580e",
        "window_start": "2025-01-01",
        "window_end": "2025-12-31",
        "locator": "CPG45; 13 linhas de disciplinas atribuídas a MPEM; coorte conciliada com 14 ofertas históricas.",
        "course_codes": [
          "MPM5601",
          "MPM5602",
          "MPM5604",
          "MPM5605",
          "MPM5606",
          "MPM5607",
          "MPM5608",
          "MPM5609",
          "MPM5610",
          "MPM5612",
          "MPM5613",
          "MPM5614",
          "MPM5617"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MPM5617.html",
            "sha256": "f9ce0cbe70868b3dcc202425fe404cc6d38c0b7c5bb20fdf61e74f8d2951ca67",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5607.html",
            "sha256": "d86daa31bd5bbaef0ddb8356f3cf72f3544927d737d2b07fb3357ec217b4c154",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "fichas_janus_recuperadas_5606_5608.json",
            "sha256": "c532adff51998deb265c985a469a8f080b5e587629b8c4953d364f82235b8cde",
            "area_code": "45135",
            "locator": "Extrato factual oficial indexado; rows[course_code=MPM5608].area_code=45135; URL https://uspdigital.usp.br/janus/Disciplina?sgldis=MPM5608"
          },
          {
            "file": "MPM5602.html",
            "sha256": "7529a229a445504853c396204c9231e4c53f09eef3d207ded2a8b5116d4bd8c1",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "JANUS-ficha-MPM5610-v3.html",
            "sha256": "2a4096d7e7d8e4c58deac2320c838b48e47234e3088579274280573a0e8213e8",
            "area_code": "45135",
            "locator": "Version 3; area 45135; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MPM5605.html",
            "sha256": "6b2b49a4d862fc09af11a5b40c88cbc584fea9ca9a4e10fa5623fe73f8c54df6",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5604.html",
            "sha256": "7333e1b32f4825df981866b9cab07a0a1bf8d1374dde940d444c097be23660b9",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5614.html",
            "sha256": "20815bd3c74f9fba4d8c5549d37417b355fbb07d0dc7b344f2edda5d0fa124ba",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5609.html",
            "sha256": "1e373d76fdc93ac6d33db10d2dca1d75fc5694242bd202c25ae84ad443d4de62",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5601.html",
            "sha256": "a3a548e63af0ac29d7404aea68f175a3900f273d6c8051ed0ba9495df97c4a68",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5612.html",
            "sha256": "aa5074b190f5fc792cf1b89ec5aef930c9c5659065e48ccf05295d84f38b6096",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5613.html",
            "sha256": "34979971b77e0bf1296578fcb39dd28c9c52fc4857a72a422b15da3fc8c35386",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2025,
      "program": "MPEM",
      "metric": "approvals",
      "value": 221,
      "status": "exact",
      "semantic_note": "Soma de turmas × média publicada de aprovados em disciplinas, não diplomas/titulações. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão. Cálculo aritmético com grupos de uma ou duas turmas e totais inteiros; nenhuma inferência de distribuição por desvio padrão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2025.html",
        "sha256": "080414250650a7135cbae8e4177ddfacff0bf076f67a49cec9b5d464c9a7580e",
        "window_start": "2025-01-01",
        "window_end": "2025-12-31",
        "locator": "CPG45; 13 linhas de disciplinas atribuídas a MPEM; coorte conciliada com 14 ofertas históricas.",
        "course_codes": [
          "MPM5601",
          "MPM5602",
          "MPM5604",
          "MPM5605",
          "MPM5606",
          "MPM5607",
          "MPM5608",
          "MPM5609",
          "MPM5610",
          "MPM5612",
          "MPM5613",
          "MPM5614",
          "MPM5617"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MPM5617.html",
            "sha256": "f9ce0cbe70868b3dcc202425fe404cc6d38c0b7c5bb20fdf61e74f8d2951ca67",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5607.html",
            "sha256": "d86daa31bd5bbaef0ddb8356f3cf72f3544927d737d2b07fb3357ec217b4c154",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "fichas_janus_recuperadas_5606_5608.json",
            "sha256": "c532adff51998deb265c985a469a8f080b5e587629b8c4953d364f82235b8cde",
            "area_code": "45135",
            "locator": "Extrato factual oficial indexado; rows[course_code=MPM5608].area_code=45135; URL https://uspdigital.usp.br/janus/Disciplina?sgldis=MPM5608"
          },
          {
            "file": "MPM5602.html",
            "sha256": "7529a229a445504853c396204c9231e4c53f09eef3d207ded2a8b5116d4bd8c1",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "JANUS-ficha-MPM5610-v3.html",
            "sha256": "2a4096d7e7d8e4c58deac2320c838b48e47234e3088579274280573a0e8213e8",
            "area_code": "45135",
            "locator": "Version 3; area 45135; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MPM5605.html",
            "sha256": "6b2b49a4d862fc09af11a5b40c88cbc584fea9ca9a4e10fa5623fe73f8c54df6",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5604.html",
            "sha256": "7333e1b32f4825df981866b9cab07a0a1bf8d1374dde940d444c097be23660b9",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5614.html",
            "sha256": "20815bd3c74f9fba4d8c5549d37417b355fbb07d0dc7b344f2edda5d0fa124ba",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5609.html",
            "sha256": "1e373d76fdc93ac6d33db10d2dca1d75fc5694242bd202c25ae84ad443d4de62",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5601.html",
            "sha256": "a3a548e63af0ac29d7404aea68f175a3900f273d6c8051ed0ba9495df97c4a68",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5612.html",
            "sha256": "aa5074b190f5fc792cf1b89ec5aef930c9c5659065e48ccf05295d84f38b6096",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5613.html",
            "sha256": "34979971b77e0bf1296578fcb39dd28c9c52fc4857a72a422b15da3fc8c35386",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2025,
      "program": "MPEM",
      "metric": "enrollments_per_section",
      "value": 17.285714285714285,
      "status": "exact",
      "semantic_note": "Total de matrículas dividido pelo número de turmas; média ponderada, não média simples entre disciplinas. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão. Cálculo aritmético com grupos de uma ou duas turmas e totais inteiros; nenhuma inferência de distribuição por desvio padrão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2025.html",
        "sha256": "080414250650a7135cbae8e4177ddfacff0bf076f67a49cec9b5d464c9a7580e",
        "window_start": "2025-01-01",
        "window_end": "2025-12-31",
        "locator": "CPG45; 13 linhas de disciplinas atribuídas a MPEM; coorte conciliada com 14 ofertas históricas.",
        "course_codes": [
          "MPM5601",
          "MPM5602",
          "MPM5604",
          "MPM5605",
          "MPM5606",
          "MPM5607",
          "MPM5608",
          "MPM5609",
          "MPM5610",
          "MPM5612",
          "MPM5613",
          "MPM5614",
          "MPM5617"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MPM5617.html",
            "sha256": "f9ce0cbe70868b3dcc202425fe404cc6d38c0b7c5bb20fdf61e74f8d2951ca67",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5607.html",
            "sha256": "d86daa31bd5bbaef0ddb8356f3cf72f3544927d737d2b07fb3357ec217b4c154",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "fichas_janus_recuperadas_5606_5608.json",
            "sha256": "c532adff51998deb265c985a469a8f080b5e587629b8c4953d364f82235b8cde",
            "area_code": "45135",
            "locator": "Extrato factual oficial indexado; rows[course_code=MPM5608].area_code=45135; URL https://uspdigital.usp.br/janus/Disciplina?sgldis=MPM5608"
          },
          {
            "file": "MPM5602.html",
            "sha256": "7529a229a445504853c396204c9231e4c53f09eef3d207ded2a8b5116d4bd8c1",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "JANUS-ficha-MPM5610-v3.html",
            "sha256": "2a4096d7e7d8e4c58deac2320c838b48e47234e3088579274280573a0e8213e8",
            "area_code": "45135",
            "locator": "Version 3; area 45135; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MPM5605.html",
            "sha256": "6b2b49a4d862fc09af11a5b40c88cbc584fea9ca9a4e10fa5623fe73f8c54df6",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5604.html",
            "sha256": "7333e1b32f4825df981866b9cab07a0a1bf8d1374dde940d444c097be23660b9",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5614.html",
            "sha256": "20815bd3c74f9fba4d8c5549d37417b355fbb07d0dc7b344f2edda5d0fa124ba",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5609.html",
            "sha256": "1e373d76fdc93ac6d33db10d2dca1d75fc5694242bd202c25ae84ad443d4de62",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5601.html",
            "sha256": "a3a548e63af0ac29d7404aea68f175a3900f273d6c8051ed0ba9495df97c4a68",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5612.html",
            "sha256": "aa5074b190f5fc792cf1b89ec5aef930c9c5659065e48ccf05295d84f38b6096",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5613.html",
            "sha256": "34979971b77e0bf1296578fcb39dd28c9c52fc4857a72a422b15da3fc8c35386",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "count"
    },
    {
      "year": 2025,
      "program": "MPEM",
      "metric": "approval_rate",
      "value": 0.9132231404958677,
      "status": "exact",
      "semantic_note": "Aprovações em disciplinas divididas pelas matrículas até o final do oferecimento. Armazenada como fração0–1; ND se denominador zero. Universo: disciplinas e turmas presentes no relatório anual de alunos por disciplina e conciliadas com os oferecimentos históricos. Ofertas históricas ausentes do relatório não são acrescidas nem tratadas como zero. Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão. Cálculo aritmético com grupos de uma ou duas turmas e totais inteiros; nenhuma inferência de distribuição por desvio padrão.",
      "qualifiers": [
        "Hipótese expressamente autorizada: área/vínculo ATUAL da ficha aplicado à oferta histórica; não é comprovação do vínculo histórico da versão.",
        "Classificação registrada com fichas-fonte e hash do catálogo de áreas."
      ],
      "source": {
        "kind": "janus_html",
        "file": "JANUS-disciplinas-TODOS-2025.html",
        "sha256": "080414250650a7135cbae8e4177ddfacff0bf076f67a49cec9b5d464c9a7580e",
        "window_start": "2025-01-01",
        "window_end": "2025-12-31",
        "locator": "CPG45; 13 linhas de disciplinas atribuídas a MPEM; coorte conciliada com 14 ofertas históricas.",
        "course_codes": [
          "MPM5601",
          "MPM5602",
          "MPM5604",
          "MPM5605",
          "MPM5606",
          "MPM5607",
          "MPM5608",
          "MPM5609",
          "MPM5610",
          "MPM5612",
          "MPM5613",
          "MPM5614",
          "MPM5617"
        ],
        "classification_catalogue_sha256": "ff3939af8f2948f89dbaed68c56694f0e250d6bac74ebeee9a1ad6c0cddba621",
        "classification_sources": [
          {
            "file": "MPM5617.html",
            "sha256": "f9ce0cbe70868b3dcc202425fe404cc6d38c0b7c5bb20fdf61e74f8d2951ca67",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5607.html",
            "sha256": "d86daa31bd5bbaef0ddb8356f3cf72f3544927d737d2b07fb3357ec217b4c154",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "fichas_janus_recuperadas_5606_5608.json",
            "sha256": "c532adff51998deb265c985a469a8f080b5e587629b8c4953d364f82235b8cde",
            "area_code": "45135",
            "locator": "Extrato factual oficial indexado; rows[course_code=MPM5608].area_code=45135; URL https://uspdigital.usp.br/janus/Disciplina?sgldis=MPM5608"
          },
          {
            "file": "MPM5602.html",
            "sha256": "7529a229a445504853c396204c9231e4c53f09eef3d207ded2a8b5116d4bd8c1",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "JANUS-ficha-MPM5610-v3.html",
            "sha256": "2a4096d7e7d8e4c58deac2320c838b48e47234e3088579274280573a0e8213e8",
            "area_code": "45135",
            "locator": "Version 3; area 45135; /html/body/table/tbody/tr/td/form/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]"
          },
          {
            "file": "MPM5605.html",
            "sha256": "6b2b49a4d862fc09af11a5b40c88cbc584fea9ca9a4e10fa5623fe73f8c54df6",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5604.html",
            "sha256": "7333e1b32f4825df981866b9cab07a0a1bf8d1374dde940d444c097be23660b9",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5614.html",
            "sha256": "20815bd3c74f9fba4d8c5549d37417b355fbb07d0dc7b344f2edda5d0fa124ba",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5609.html",
            "sha256": "1e373d76fdc93ac6d33db10d2dca1d75fc5694242bd202c25ae84ad443d4de62",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5601.html",
            "sha256": "a3a548e63af0ac29d7404aea68f175a3900f273d6c8051ed0ba9495df97c4a68",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5612.html",
            "sha256": "aa5074b190f5fc792cf1b89ec5aef930c9c5659065e48ccf05295d84f38b6096",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          },
          {
            "file": "MPM5613.html",
            "sha256": "34979971b77e0bf1296578fcb39dd28c9c52fc4857a72a422b15da3fc8c35386",
            "area_code": "45135",
            "locator": "Área de Concentração: 45135"
          }
        ]
      },
      "section": "disciplines",
      "level": null,
      "unit": "ratio"
    }
  ],
  "averages": [
    {
      "section": "disciplines",
      "metric": "courses",
      "year": null,
      "program": "CC",
      "level": null,
      "value": 43.357142857142854,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Média aritmética dos 14 valores anuais, de 2012 a 2025. Médias de taxas não equivalem à razão dos totais de todos os anos.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "P8"
      },
      "period": [
        2012,
        2025
      ],
      "aggregation": "annual_mean"
    },
    {
      "section": "disciplines",
      "metric": "courses",
      "year": null,
      "program": "MAT",
      "level": null,
      "value": 37.42857142857143,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Média aritmética dos 14 valores anuais, de 2012 a 2025. Médias de taxas não equivalem à razão dos totais de todos os anos.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "P9"
      },
      "period": [
        2012,
        2025
      ],
      "aggregation": "annual_mean"
    },
    {
      "section": "disciplines",
      "metric": "sections",
      "year": null,
      "program": "CC",
      "level": null,
      "value": 47.07142857142857,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Média aritmética dos 14 valores anuais, de 2012 a 2025. Médias de taxas não equivalem à razão dos totais de todos os anos.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "P12"
      },
      "period": [
        2012,
        2025
      ],
      "aggregation": "annual_mean"
    },
    {
      "section": "disciplines",
      "metric": "sections",
      "year": null,
      "program": "MAT",
      "level": null,
      "value": 39,
      "status": "exact",
      "unit": "count",
      "semantic_note": "Média aritmética dos 14 valores anuais, de 2012 a 2025. Médias de taxas não equivalem à razão dos totais de todos os anos.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "P13"
      },
      "period": [
        2012,
        2025
      ],
      "aggregation": "annual_mean"
    },
    {
      "section": "disciplines",
      "metric": "applications",
      "year": null,
      "program": "CC",
      "level": null,
      "value": 510.62857142857143,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Média aritmética dos 14 valores anuais, de 2012 a 2025. Médias de taxas não equivalem à razão dos totais de todos os anos.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "P16"
      },
      "period": [
        2012,
        2025
      ],
      "aggregation": "annual_mean"
    },
    {
      "section": "disciplines",
      "metric": "applications",
      "year": null,
      "program": "MAT",
      "level": null,
      "value": 413.79285714285714,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Média aritmética dos 14 valores anuais, de 2012 a 2025. Médias de taxas não equivalem à razão dos totais de todos os anos.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "P17"
      },
      "period": [
        2012,
        2025
      ],
      "aggregation": "annual_mean"
    },
    {
      "section": "disciplines",
      "metric": "enrollments",
      "year": null,
      "program": "CC",
      "level": null,
      "value": 428.92857142857144,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Média aritmética dos 14 valores anuais, de 2012 a 2025. Médias de taxas não equivalem à razão dos totais de todos os anos.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "P20"
      },
      "period": [
        2012,
        2025
      ],
      "aggregation": "annual_mean"
    },
    {
      "section": "disciplines",
      "metric": "enrollments",
      "year": null,
      "program": "MAT",
      "level": null,
      "value": 365.0642857142857,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Média aritmética dos 14 valores anuais, de 2012 a 2025. Médias de taxas não equivalem à razão dos totais de todos os anos.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "P21"
      },
      "period": [
        2012,
        2025
      ],
      "aggregation": "annual_mean"
    },
    {
      "section": "disciplines",
      "metric": "approvals",
      "year": null,
      "program": "CC",
      "level": null,
      "value": 362.4357142857143,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Média aritmética dos 14 valores anuais, de 2012 a 2025. Médias de taxas não equivalem à razão dos totais de todos os anos.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "P24"
      },
      "period": [
        2012,
        2025
      ],
      "aggregation": "annual_mean"
    },
    {
      "section": "disciplines",
      "metric": "approvals",
      "year": null,
      "program": "MAT",
      "level": null,
      "value": 310.49285714285713,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Média aritmética dos 14 valores anuais, de 2012 a 2025. Médias de taxas não equivalem à razão dos totais de todos os anos.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "P25"
      },
      "period": [
        2012,
        2025
      ],
      "aggregation": "annual_mean"
    },
    {
      "section": "disciplines",
      "metric": "enrollments_per_section",
      "year": null,
      "program": "CC",
      "level": null,
      "value": 9.260855406333759,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Média aritmética dos 14 valores anuais, de 2012 a 2025. Médias de taxas não equivalem à razão dos totais de todos os anos.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "P28"
      },
      "period": [
        2012,
        2025
      ],
      "aggregation": "annual_mean"
    },
    {
      "section": "disciplines",
      "metric": "enrollments_per_section",
      "year": null,
      "program": "MAT",
      "level": null,
      "value": 9.49111796891136,
      "status": "approximate",
      "unit": "count",
      "semantic_note": "Média aritmética dos 14 valores anuais, de 2012 a 2025. Médias de taxas não equivalem à razão dos totais de todos os anos.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "P29"
      },
      "period": [
        2012,
        2025
      ],
      "aggregation": "annual_mean"
    },
    {
      "section": "disciplines",
      "metric": "approval_rate",
      "year": null,
      "program": "CC",
      "level": null,
      "value": 0.8461391901107349,
      "status": "approximate",
      "unit": "ratio",
      "semantic_note": "Média aritmética dos 14 valores anuais, de 2012 a 2025. Médias de taxas não equivalem à razão dos totais de todos os anos.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "P32"
      },
      "period": [
        2012,
        2025
      ],
      "aggregation": "annual_mean"
    },
    {
      "section": "disciplines",
      "metric": "approval_rate",
      "year": null,
      "program": "MAT",
      "level": null,
      "value": 0.8532963938282327,
      "status": "approximate",
      "unit": "ratio",
      "semantic_note": "Média aritmética dos 14 valores anuais, de 2012 a 2025. Médias de taxas não equivalem à razão dos totais de todos os anos.",
      "source": {
        "file": "relatorio_disciplinas_2012_2025.xlsx",
        "sheet": "Resumo",
        "cell": "P33"
      },
      "period": [
        2012,
        2025
      ],
      "aggregation": "annual_mean"
    }
  ],
  "source_limits": [
    {
      "section": "degrees",
      "text": "2018: DataUSP = 104 títulos (50 ME + 54 DO+DD). Anuário 2.05 e 3.12 = 103 (50 ME + 53 DO+DD).",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "A97"
      }
    },
    {
      "section": "degrees",
      "text": "2021: DataUSP e Anuário 3.12 = 93 títulos (53 ME + 40 DO+DD). Anuário 2.05 histórico = 92 (53 ME + 39 DO+DD).",
      "source": {
        "file": "consultas_pos_ime_2012_2025.xlsx",
        "sheet": "Titulações",
        "cell": "A98"
      }
    }
  ],
  "sources": [
    {
      "id": "general",
      "kind": "workbook",
      "file": "consultas_pos_ime_2012_2025.xlsx",
      "sha256": "07bf791d924f2f991de512fe04a5e7e3e86312751e213de27898a054f38c0bd6"
    },
    {
      "id": "disciplines",
      "kind": "workbook",
      "file": "relatorio_disciplinas_2012_2025.xlsx",
      "sha256": "d1b5640d5336c1c3effcf0074ed6c8c02548a7f875f06258ce457851f5478a41"
    },
    {
      "id": "requested",
      "kind": "workbook",
      "file": "quadro_solicitado_pos_2024_2025.xlsx",
      "sha256": "a6fd0a63b294cffff652e221aefcd84fdb20cac249ccc335b65d21bf21a7ae30"
    },
    {
      "file": "JANUS-disciplinas-TODOS-2024.html",
      "sha256": "fd4ca6214830a9e2f9ccdd20aa3d24ce1f1c9884b4a2cb6e27f46455e78dae37",
      "kind": "janus_html",
      "year": 2024,
      "window_start": "2024-01-01",
      "window_end": "2024-12-31",
      "cpg_code": "45",
      "scope": "Relatório anual de toda a CPG45; cabeçalho publicado sem restrição de programa/área. Linhas não informam a área; associação registrada separadamente."
    },
    {
      "file": "JANUS-disciplinas-TODOS-2025.html",
      "sha256": "080414250650a7135cbae8e4177ddfacff0bf076f67a49cec9b5d464c9a7580e",
      "kind": "janus_html",
      "year": 2025,
      "window_start": "2025-01-01",
      "window_end": "2025-12-31",
      "cpg_code": "45",
      "scope": "Relatório anual de toda a CPG45; cabeçalho publicado sem restrição de programa/área. Linhas não informam a área; associação registrada separadamente."
    }
  ],
  "coverage": {
    "degrees": {
      "programs": [
        "CC",
        "MAT",
        "MAP",
        "PE",
        "MPEM"
      ],
      "years": [
        2012,
        2025
      ]
    },
    "enrollment": {
      "programs": [
        "CC",
        "MAT",
        "MAP",
        "PE",
        "MPEM"
      ],
      "years": [
        2012,
        2025
      ]
    },
    "disciplines": {
      "programs": [
        "CC",
        "MAT",
        "MAP",
        "PE",
        "MPEM"
      ],
      "years": [
        2012,
        2025
      ],
      "program_years": {
        "CC": [
          2012,
          2025
        ],
        "MAT": [
          2012,
          2025
        ],
        "MAP": [
          2024,
          2025
        ],
        "PE": [
          2024,
          2025
        ],
        "MPEM": [
          2024,
          2025
        ]
      },
      "note": "CC/MAT: série 2012–2025 da planilha histórica. MAP/PE/MPEM: somente 2024–2025 dos relatórios anuais Janus, sob a hipótese autorizada de atribuir o programa da ficha atual à oferta histórica. Anos ausentes não são zero."
    },
    "requested_2024_2025": {
      "programs": [
        "CC",
        "MAT",
        "MAP",
        "PE",
        "MPEM"
      ],
      "years": [
        2024,
        2025
      ]
    }
  },
  "status_definitions": {
    "exact": "Valor publicado ou calculado exatamente conforme a metodologia declarada; hipóteses e tipo de população permanecem explicitados.",
    "approximate": "Aproximação indicada na planilha de origem.",
    "ND": "Não disponível ou não determinado nos arquivos consultados.",
    "NA": "Não se aplica."
  },
  "notes": [
    "Período de análise: 2012 a 2025.",
    "O painel contém somente agregados; não incorpora identificadores ou nomes de estudantes e docentes.",
    "Matrículas regulares anuais, matrículas em disciplinas e estudantes ativos em 1º de abril representam medidas diferentes.",
    "Zeros publicados são preservados. ND e NA não são convertidos em zero.",
    "A série histórica preserva as aproximações indicadas na planilha de origem; o quadro 2024–2025 explicita totais calculados e informações complementares.",
    "2018: DataUSP = 104 títulos (50 ME + 54 DO+DD). Anuário 2.05 e 3.12 = 103 (50 ME + 53 DO+DD).",
    "2021: DataUSP e Anuário 3.12 = 93 títulos (53 ME + 40 DO+DD). Anuário 2.05 histórico = 92 (53 ME + 39 DO+DD).",
    "As estatísticas de disciplinas de MAP, PE e MPEM cobrem somente 2024 e 2025 e usam, sob hipótese autorizada, o vínculo de programa indicado na ficha atual. O universo é o dos relatórios anuais de alunos em disciplinas, não todas as ofertas do histórico.",
    "Conjunto agregado preparado para distribuição pública. A proveniência usa nomes de arquivos, hashes e localizadores; caminhos locais e metadados internos de contato não integram os dados distribuídos."
  ],
  "privacy_mode": "public_aggregate_only"
};
