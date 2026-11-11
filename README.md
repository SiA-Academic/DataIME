# Dados do IME

[Painel de indicadores da graduação e da pós-graduação do IME-USP](https://sia-academic.github.io/DataIME/). A navegação lateral reúne titulações e matrículas, disciplinas e fontes. Consulte o [guia da graduação](docs/graduacao.md) ou o [guia da pós-graduação](docs/pos-graduacao.md) para interpretar os números.

Para abrir o painel offline, abra `index.html`. Este repositório contém o site pronto; os arquivos originais e os coletores ficam na base de manutenção local, `SiAPos-base/`.

**Para atualizar:** siga o `README.md` da base de manutenção para obter as tabelas do Anuário USP, os dados do Inep e DataUSP e os relatórios de Júpiter e Janus. Dentro de `SiAPos-base/`, execute `python scripts/construir.py`. Confira o site gerado em `../outputs/SiA/` e publique as alterações na branch `main` deste repositório. O GitHub Pages serve os arquivos estáticos diretamente.
