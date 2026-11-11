# SIA · Sistema de Informações Acadêmicas

O SIA do IME-USP reúne três sistemas independentes. Cada sistema é acessado por seu endereço direto.

| Sistema | Consultas | Documentação |
| --- | --- | --- |
| [SIA-Doce · Docentes](https://sia-academic.github.io/SiA/SiADoce/) | Acompanhamento do PPGCC, produção docente, titulações e quadro de credenciamento por departamento e programa. | [Manutenção do SIA-Doce](manutencao/SiADoce/README.md) |
| [SIA-Grad · Graduação](https://sia-academic.github.io/SiA/SiAGrad/) | Vagas, ingressantes, matrículas, concluintes, disciplinas e estatísticas do Anuário. | [Dados e critérios da graduação](SiAGrad/README.md) |
| [SIA-Pos · Pós-graduação](https://sia-academic.github.io/SiA/SiAPos/) | Titulações, matrículas e disciplinas por programa, nível e período. | [Dados e critérios da pós-graduação](SiAPos/README.md) |

## Uso local

Abra `index.html` no diretório do sistema desejado. O navegador carrega as páginas, estilos, scripts e bases estáticas diretamente. Os arquivos em `assets/` são compartilhados pelos sistemas. Para servir os módulos por HTTP, execute `python -m http.server 8000 --bind 127.0.0.1` na raiz do repositório e abra, por exemplo, `http://127.0.0.1:8000/SiADoce/`. Para usar os dados institucionais no computador de trabalho, abra `SiADoce-institucional/index.html`.

## Dados e manutenção

Este repositório reúne as interfaces e a manutenção do SIA-Doce, sem etapa de compilação com Hugo. A edição pública apresenta indicadores do programa e permite consultar as publicações de cada docente, com links para o Lattes e as fontes bibliográficas. Com os insumos institucionais, a rotina local gera `SiADoce-institucional/index.html` com as orientações e os relatórios do programa. Os registros individuais do Janus e a edição institucional ficam fora do Git e do GitHub Pages. O guia de manutenção descreve as entradas e os comandos.

Graduação e pós-graduação carregam suas próprias bases. Os filtros, as referências das fontes e as exportações acompanham cada painel. O quadro departamental e de credenciamento do antigo painel está em [SIA-Doce](SiADoce/credenciamento/index.html). Os links anteriores de graduação e credenciamento em `SiAPos/#graduation/…` e `SiAPos/#docentes` encaminham para a página correspondente.

O GitHub Pages serve a raiz da branch `main`. Uma atualização da interface ou dos indicadores pode ser conferida localmente antes de ser publicada.
