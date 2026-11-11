# Dados do IME

[Painel de indicadores da graduação, da pós-graduação e dos docentes do IME-USP](https://sia-academic.github.io/DataIME/). A navegação lateral reúne as três áreas. Consulte os guias da [graduação](docs/graduacao.md), da [pós-graduação](docs/pos-graduacao.md) e do [quadro docente](docs/docentes.md) para interpretar os números.

Para abrir o painel offline, abra `index.html`. Este repositório contém o site pronto; os arquivos originais e os coletores ficam na base de manutenção local, `SiAPos-base/`.

**Para atualizar:** siga o `README.md` da base de manutenção para obter as tabelas do Anuário USP, os dados do Inep e DataUSP e os relatórios de Júpiter e Janus. Dentro de `SiAPos-base/`, execute `python scripts/construir.py`. Confira o site gerado em `../outputs/SiA/` e publique as alterações na branch `main` deste repositório. O GitHub Pages serve os arquivos estáticos diretamente.
