# SIA-Doce · Sistema de Informações Acadêmicas – Docentes

Abra [a página inicial](index.html) para consultar o acompanhamento do Programa de Pós-Graduação em Ciência da Computação do IME-USP. O [quadro e credenciamento](credenciamento/index.html) compara o quadro departamental e os credenciamentos dos cinco programas do IME. As duas consultas têm escopos e datas de referência próprios.

## Consultas

| Seção | Edição pública | Cópia institucional |
|---|---|---|
| [Docentes](docentes/index.html) | Contagens por credenciamento e modalidade dos alunos ativos | Filtros, ordenação, gráficos por área, fichas nominais, orientações, turmas e exportação PDF |
| [Produção docente](producao/index.html) | Contagens anuais, critérios, analisador de um currículo externo | Tabela por docente, detalhes por ano, artigos, fontes e currículos |
| [Análise geral das publicações](producao/analise-geral/index.html) | Simulador iniciado em 4 artigos, com resultados por grupo, busca por docente e fichas de artigos e pendências | A mesma consulta com filtros de credenciamento e critérios de orientação do Janus |
| [Titulações](titulados/index.html) | Totais por ano e modalidade, evolução mensal, comparação de dois meses e CSV | Também permite buscar e ordenar a tabela por orientador |
| [Alertas](alertas/index.html) | Contagens por tipo e gravidade | Busca por docente, motivo e área, fichas e relatório PDF |
| [Configurações](configuracoes/index.html) | Modelo editável para download | Critérios da instância e associação de áreas aos docentes |

O acompanhamento considera docentes plenos, específicos e vencidos com orientando. Cada seção informa sua cobertura. As somas de publicações por docente podem contar um trabalho em coautoria mais de uma vez. O painel mensal identifica os meses fora do período do Janus e os totais de anos parciais.

## Execução e atualização

O navegador abre as páginas HTML diretamente do disco ou em um servidor estático. Os gráficos, filtros e arquivos de dados são locais. As páginas usam a identidade visual em `../assets/sia.css` e os dados em `dados/dados.js`.

Os [arquivos de manutenção](../manutencao/SiADoce/README.md) preparam os dados e geram a cópia institucional. Na análise geral, o campo **Mínimo de artigos** começa em quatro. Cada alteração de período, tipo de publicação, faixa ou mínimo recalcula o placar no navegador. **Restaurar proposta** recupera os critérios iniciais.

A lista **Docentes** aparece logo abaixo dos critérios. Busque um nome ou use **Filtros** para selecionar a situação. Abra o nome do docente para consultar os artigos confirmados, as publicações a conferir e suas fontes. Na edição institucional também é possível filtrar pelo credenciamento e aplicar critérios de orientação. Quem dispõe dessa edição pode habilitar essas opções no navegador em **Mais critérios**, carregando o arquivo local `SiADoce-institucional/dados/analise-publicacoes.json`.

Para atualizar as contagens públicas a partir de uma pasta de trabalho já processada, execute na raiz do repositório:

```powershell
python SiADoce/dados/resumir.py manutencao/SiADoce --saida SiADoce/dados/dados.js
```
