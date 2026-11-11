# SIA · Sistema de Informações Acadêmicas

O SIA do IME-USP tem um painel conjunto de graduação e pós-graduação e um sistema de acompanhamento docente. O acesso é direto pelos endereços abaixo.

| Endereço | Consultas | Documentação |
| --- | --- | --- |
| [SIAPos](https://sia-academic.github.io/SIA/SIAPos/) e [SIAGrad](https://sia-academic.github.io/SIA/SIAGrad/) | Os dois endereços abrem o mesmo painel. O menu de Graduação reúne vagas, ingressantes, matrículas, concluintes, disciplinas e estatísticas do Anuário. O menu de Pós-graduação reúne titulações, matrículas e disciplinas por programa, nível e período. | [Pós-graduação](SIAPos/README.md) · [Graduação](SIAGrad/README.md) |
| [SIADoce](https://sia-academic.github.io/SIA/SIADoce/) | Acompanhamento do PPGCC, produção docente, análise das publicações, titulações, alertas e quadro de credenciamento. | [Manutenção do SIADoce](manutencao/SIADoce/README.md) |

## Uso local

Abra `SIAPos/index.html`, `SIAGrad/index.html` ou `SIADoce/index.html`. Para usar HTTP, execute `python -m http.server 8000 --bind 127.0.0.1` na raiz deste repositório e abra o diretório do sistema. Na instalação com os dados institucionais, use `SIADoce-institucional/index.html`.

## Dados e manutenção

Os dois menus do painel conjunto têm bases, filtros, referências e exportações próprios. Links diretos para seções, como `SIAPos/#graduation/coverage`, abrem a consulta correspondente. O atalho anterior `#docentes` leva ao [quadro de credenciamento do SIADoce](SIADoce/credenciamento/index.html).

O SIADoce usa páginas estáticas e inclui as rotinas de atualização no repositório. A análise das publicações começa com quatro artigos. Em **Mais critérios**, é possível ajustar os estratos, os mínimos de periódicos e congressos e os critérios de orientação do Janus. Os registros individuais dos alunos e os relatórios nominais permanecem na instalação institucional. O guia de manutenção descreve as fontes, a reconstrução sem Hugo e a recuperação da distribuição histórica.

O GitHub Pages publica os arquivos da branch `main`.
