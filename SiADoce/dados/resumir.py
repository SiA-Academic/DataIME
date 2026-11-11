"""Exporta apenas contagens agregadas do acompanhamento para o portal público."""

import argparse
from collections import Counter
from html.parser import HTMLParser
import json
from pathlib import Path
import re


class Alertas(HTMLParser):
    def __init__(self):
        super().__init__()
        self.gravidade = None
        self.tipos = {}
        self.em_alerta = False
        self.docentes = 0

    def handle_starttag(self, tag, attrs):
        classes = dict(attrs).get("class", "").split()
        if "teacher" in classes:
            self.docentes += 1
        if tag == "div" and "alert" in classes:
            self.em_alerta = True
        if self.em_alerta and tag == "span" and "tag" in classes:
            self.gravidade = next((s for s in ("red", "yellow") if s in classes), None)

    def handle_data(self, data):
        if self.gravidade:
            self.tipos.setdefault(data.strip(), Counter())[self.gravidade] += 1

    def handle_endtag(self, tag):
        if tag == "span":
            self.gravidade = None
        if tag == "div":
            self.em_alerta = False

    @classmethod
    def ler(cls, caminho):
        html = caminho.read_text("utf-8-sig")
        resumo = re.search(r'<section\s+class="summary"\s*>(.*?)</section>', html, re.S)
        if not resumo:
            raise ValueError("Resumo ausente no relatório de alertas.")
        totais = dict(re.findall(r'<span>([^<]+)</span>\s*<strong>(\d+)</strong>', resumo[1]))
        dados = cls()
        dados.feed(html)
        ocorrencias = sum(sum(t.values()) for t in dados.tipos.values())
        if str(ocorrencias) != totais.get("Alertas listados") or str(dados.docentes) != totais.get("Docentes com alerta"):
            raise ValueError("As contagens de alertas e docentes divergem do resumo do relatório.")
        return dados


def resumo(base):
    def ler(nome):
        return json.loads((base / "data" / "controle" / (nome + ".json")).read_text("utf-8-sig"))

    producao = ler("producao-docente")
    docentes = producao["docentes"]
    cadastro_publicacoes = {d["id"]: d["nome"] for d in docentes}
    lattes_ausentes = ler("lattes-ausentes")
    ativos = ler("alunos-ativos")["totais"]
    mensal = ler("indicadores-mensais")
    titulos = ler("titulados-por-ano")
    totais_por_ano = []
    for ano in producao["anos"]:
        sem_cobertura = {"cv_ausente", "ano_sem_cobertura_cv", "cobertura_temporal_desconhecida"}
        registros = [r for docente in docentes if docente["lattes_status"] == "disponivel"
                     for r in docente["anos"] if r["ano"] == ano and r["pontos_status"] not in sem_cobertura]
        campos = ("periodicos_classificados", "pendentes", "eventos_total", "eventos_classificados")
        linha = {"ano": ano, "curriculos_com_dados": len(registros), "docentes": len(docentes)}
        for campo in campos:
            valores = [r[campo] for r in registros if isinstance(r.get(campo), (int, float))]
            linha[campo] = sum(valores) if valores else None
        totais_por_ano.append(linha)

    alertas = Alertas.ler(base / "static" / "relatorio-alertas-docentes.html")
    return {
        "institucional": False,
        "resumo": {
            "periodo": producao["periodo"],
            "categorias": Counter(d["categoria"] for d in docentes),
            "alunos": {k: ativos[k] for k in ("mestrado", "doutorado", "doutorado_direto", "total")},
            "ausentes": lattes_ausentes["total_ausentes"],
            "curriculos_pendentes": [{"docente_id": d["docente_id"], "nome": cadastro_publicacoes[d["docente_id"]]}
                                    for d in lattes_ausentes["docentes"] if d["docente_id"] in cadastro_publicacoes],
            "producao": totais_por_ano,
            "criterio": {k: producao["criterio_quadrienio"][k] for k in ("inicio", "fim")},
            "alertas": {"docentes": alertas.docentes, "tipos": alertas.tipos},
        },
        "mensal": {k: mensal[k] for k in ("fonte", "fonte_titulados_periodo", "anos", "meses")},
        "titulados": {k: titulos[k] for k in (
            "periodo", "anos", "totais_anuais", "total_orientadores", "total_me", "total_do_dd", "total"
        )},
    }


if __name__ == "__main__":
    cli = argparse.ArgumentParser(description=__doc__)
    cli.add_argument("base", type=Path, help="Pasta de trabalho institucional com data/controle e static")
    cli.add_argument("--saida", type=Path, required=True, help="Arquivo dados.js público")
    args = cli.parse_args()
    resultado = json.dumps(resumo(args.base), ensure_ascii=False, indent=2)
    args.saida.write_text("window.SIADOCE_DADOS = " + resultado + ";\n", encoding="utf-8")
