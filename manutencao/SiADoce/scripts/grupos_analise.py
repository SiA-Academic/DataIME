"""Agrupamentos de apresentação, preservando a categoria do cadastro Janus."""
import json

GRUPOS = (
    {'id': 'plenos', 'nome': 'Plenos', 'categorias': ['pleno']},
    {'id': 'demais', 'nome': 'Específicos e vencidos com orientando',
     'categorias': ['especifico', 'vencido_com_orientando']},
)
POR_CATEGORIA = {category: group['id'] for group in GRUPOS for category in group['categorias']}


def carregar_excecoes(base):
    file = base / 'data/controle/grupos-analise.json'
    rows = json.loads(file.read_text(encoding='utf-8-sig'))
    if not isinstance(rows, list):
        raise ValueError(f'Esperada lista de exceções em {file.name}')
    exceptions = {}
    for row in rows:
        key = row['id'], row['categoria']
        group = row['grupo']
        if (not key[0] or key[1] not in POR_CATEGORIA or group not in POR_CATEGORIA.values()
                or key in exceptions):
            raise ValueError(f'Exceção inválida ou duplicada em {file.name}.')
        exceptions[key] = group
    return exceptions


def grupo_analise(docente, excecoes):
    category = docente['categoria']
    return excecoes.get((docente['id'], category), POR_CATEGORIA[category])
