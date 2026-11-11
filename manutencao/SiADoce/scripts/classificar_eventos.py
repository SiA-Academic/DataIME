"""Pure, evidence-gated event classification for CAPES Computing 2025–2028.

Public API: read_event_catalog(path), classify_event(publication, catalog).
No network calls, writes, approximate matching or inherited workshop metrics.

JSON contract (optional evidence blocks may be omitted):
  schema_version: 1
  ciclo: "2025-2028"
  ano_referencia: 2026
  eventos: [
    {id, nome, aliases: [exact strings], trilha,
     desde_ano?, ate_ano?,
     h5_status?: "disponivel" | "nao_consultado" | "nao_localizado",
     h5?: {valor: nonnegative integer, ano, periodo?, consultado_em?, fontes},
     h5_busca?: {fontes, nota, consultado_em},
     ce_sbc?: {categoria: "top10" | "top20" | "top" | "relevante", fontes, nota?},
     inducao?: {sociedade: "SBC" | "outra", nome_sociedade?,
                principal_nacional: bool, tradicao_anos, ano_referencia,
                aderencia_computacao: bool, fontes, nota},
     gt: {atende: true | false | null, fontes: [], nota?, anos_validos?: [year]}}
  ]
  publicacoes_verificadas: [
    {titulo, ano, veiculo, evento_id,
     tipo: "artigo_completo" | "resumo" | "resumo_expandido" |
           "apresentacao" | "poster" | "demo" | "outro",
     fontes, nota}
  ]
  publicacoes_em_verificacao: [
    {titulo, ano, veiculo, evento_id, fontes, nota, bloquear_faixa: bool}
  ]

Every fonte is a URL string or {url, titulo}. Positive/negative factual
assertions require nonempty evidence. Unknown GT is not a positive assertion.
An absent H5 is unknown by default. "nao_localizado" requires documented search;
a rate-limited lookup does not establish absence. CE/induction can supply a
candidate lower bound when H5 is unknown, but it cannot enter the points sum.
The catalogue year is a declared local snapshot, not a historical classification.
"""

from dataclasses import dataclass, field
from datetime import date
import json
from pathlib import Path
import re
import unicodedata
from urllib.parse import urlparse


AREA_URL = (
    "https://www.gov.br/capes/pt-br/acesso-a-informacao/acoes-e-programas/"
    "avaliacao/sobre-a-avaliacao/areas-avaliacao/sobre-as-areas-de-avaliacao/"
    "colegio-de-ciencias-exatas-tecnologicas-e-multidisciplinar/"
    "ciencias-exatas-e-da-terra/COMPUTACAO_DOCAREA_2025_2028.pdf/@@display-file/file"
)
GT_URL = (
    "https://www.gov.br/capes/pt-br/centrais-de-conteudo/"
    "10062019-qualis-artistico-classificacao-de-eventos-pdf"
)
WEIGHTS = {"A1": 1, "A2": .875, "A3": .75, "A4": .625}
H5_CUTS = ((35, "A1"), (25, "A2"), (20, "A3"), (15, "A4"),
           (12, "A5"), (9, "A6"), (6, "A7"))
WORK_TYPES = {
    "artigo_completo", "resumo", "resumo_expandido", "apresentacao",
    "poster", "demo", "outro",
}


@dataclass(frozen=True)
class EventCatalog:
    ano_referencia: int
    eventos: dict
    aliases: dict
    publicacoes_verificadas: dict
    publicacoes_em_verificacao: dict = field(default_factory=dict)


def normalize(value):
    value = unicodedata.normalize("NFKD", value).casefold()
    value = "".join(c for c in value if not unicodedata.combining(c))
    return re.sub(r"[^a-z0-9]+", " ", value.replace("&", " and ")).strip()


def _text(value, where):
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{where}: texto não vazio obrigatório.")
    return value.strip()


def _integer(value, where, minimum=0, maximum=None):
    if isinstance(value, bool) or not isinstance(value, int) or value < minimum:
        raise ValueError(f"{where}: inteiro >= {minimum} obrigatório.")
    if maximum is not None and value > maximum:
        raise ValueError(f"{where}: valor acima de {maximum}.")
    return value


def _year(value, where):
    return _integer(value, where, 1900, 2200)


def _boolean(value, where, nullable=False):
    if nullable and value is None:
        return None
    if not isinstance(value, bool):
        raise ValueError(f"{where}: booleano obrigatório.")
    return value


def _date(value, where):
    if not isinstance(value, str) or not re.fullmatch(r"\d{4}-\d{2}-\d{2}", value):
        raise ValueError(f"{where}: data ISO YYYY-MM-DD obrigatória.")
    try:
        date.fromisoformat(value)
    except ValueError as error:
        raise ValueError(f"{where}: data inválida.") from error
    return value


def _object(value, where):
    if not isinstance(value, dict):
        raise ValueError(f"{where}: objeto obrigatório.")
    return value


def _sources(value, where, required=True):
    if not isinstance(value, list) or (required and not value):
        raise ValueError(f"{where}: lista de fontes {'não vazia ' if required else ''}obrigatória.")
    sources, seen = [], set()
    for item in value:
        if isinstance(item, str):
            url, title = item, item
        else:
            item = _object(item, where)
            url = item.get("url")
            title = item.get("titulo") or url
        url, title = _text(url, where), _text(title, where)
        parsed = urlparse(url)
        if parsed.scheme not in ("http", "https") or not parsed.netloc or parsed.username:
            raise ValueError(f"{where}: URL HTTP(S) inválida.")
        if url not in seen:
            sources.append({"url": url, "titulo": title})
            seen.add(url)
    return sources


def _publication_key(publication):
    return (publication["titulo"], publication["ano"], publication["veiculo"])


def _event(raw, index):
    where = f"eventos[{index}]"
    raw = _object(raw, where)
    identity = _text(raw.get("id"), where + ".id")
    if not re.fullmatch(r"[a-z0-9][a-z0-9._-]*", identity):
        raise ValueError(f"{where}.id: use identificador estável sem espaços.")
    name = _text(raw.get("nome"), where + ".nome")
    track = _text(raw.get("trilha"), where + ".trilha")
    aliases = raw.get("aliases")
    if not isinstance(aliases, list) or any(not isinstance(x, str) or not x.strip() for x in aliases):
        raise ValueError(f"{where}.aliases: lista de nomes exatos obrigatória.")
    keys = {normalize(name)}
    for alias in aliases:
        key = normalize(alias)
        if not key:
            raise ValueError(f"{where}.aliases: alias vazio após normalização.")
        keys.add(key)
    event = {
        "id": identity, "nome": name, "trilha": track, "alias_keys": keys,
        "desde_ano": None, "ate_ano": None, "h5": None, "h5_busca": None,
        "ce_sbc": None, "inducao": None,
    }
    for key in ("desde_ano", "ate_ano"):
        if raw.get(key) is not None:
            event[key] = _year(raw[key], where + "." + key)
    if event["desde_ano"] and event["ate_ano"] and event["desde_ano"] > event["ate_ano"]:
        raise ValueError(f"{where}: intervalo de anos invertido.")
    metric = raw.get("h5")
    status = raw.get("h5_status", "disponivel" if metric is not None else "nao_consultado")
    if status not in ("disponivel", "nao_consultado", "nao_localizado"):
        raise ValueError(f"{where}.h5_status: estado desconhecido.")
    if (metric is not None) != (status == "disponivel"):
        raise ValueError(f"{where}: valor H5 e h5_status contraditórios.")
    event["h5_status"] = status
    if metric is not None:
        metric = _object(metric, where + ".h5")
        event["h5"] = {
            "valor": _integer(metric.get("valor"), where + ".h5.valor"),
            "ano": _year(metric.get("ano"), where + ".h5.ano"),
            "fontes": _sources(metric.get("fontes"), where + ".h5.fontes"),
            "periodo": _text(metric["periodo"], where + ".h5.periodo") if metric.get("periodo") is not None else None,
            "consultado_em": _date(metric["consultado_em"], where + ".h5.consultado_em") if metric.get("consultado_em") is not None else None,
        }
    if status == "nao_localizado" or raw.get("h5_busca") is not None:
        search = _object(raw.get("h5_busca"), where + ".h5_busca")
        event["h5_busca"] = {
            "fontes": _sources(search.get("fontes"), where + ".h5_busca.fontes"),
            "nota": _text(search.get("nota"), where + ".h5_busca.nota"),
            "consultado_em": _date(search.get("consultado_em"), where + ".h5_busca.consultado_em"),
        }
    if raw.get("ce_sbc") is not None:
        ce = _object(raw["ce_sbc"], where + ".ce_sbc")
        if ce.get("categoria") not in ("top10", "top20", "top", "relevante"):
            raise ValueError(f"{where}.ce_sbc.categoria: categoria desconhecida.")
        event["ce_sbc"] = {
            "categoria": ce["categoria"],
            "fontes": _sources(ce.get("fontes"), where + ".ce_sbc.fontes"),
            "nota": str(ce.get("nota") or ""),
        }
    if raw.get("inducao") is not None:
        induction = _object(raw["inducao"], where + ".inducao")
        if induction.get("sociedade") not in ("SBC", "outra"):
            raise ValueError(f"{where}.inducao.sociedade: SBC ou outra obrigatório.")
        society_name = "SBC" if induction["sociedade"] == "SBC" else _text(
            induction.get("nome_sociedade"), where + ".inducao.nome_sociedade")
        event["inducao"] = {
            "sociedade": induction["sociedade"], "nome_sociedade": society_name,
            "principal_nacional": _boolean(induction.get("principal_nacional"), where + ".inducao.principal_nacional"),
            "tradicao_anos": _integer(induction.get("tradicao_anos"), where + ".inducao.tradicao_anos"),
            "ano_referencia": _year(induction.get("ano_referencia"), where + ".inducao.ano_referencia"),
            "aderencia_computacao": _boolean(induction.get("aderencia_computacao"), where + ".inducao.aderencia_computacao"),
            "fontes": _sources(induction.get("fontes"), where + ".inducao.fontes"),
            "nota": _text(induction.get("nota"), where + ".inducao.nota"),
        }
    gt = _object(raw.get("gt", {"atende": None, "fontes": []}), where + ".gt")
    meets_gt = _boolean(gt.get("atende"), where + ".gt.atende", nullable=True)
    event["gt"] = {
        "atende": meets_gt,
        "fontes": _sources(gt.get("fontes", []), where + ".gt.fontes", required=meets_gt is not None),
        "nota": str(gt.get("nota") or ""),
        "anos_validos": None,
    }
    if gt.get("anos_validos") is not None:
        years = gt["anos_validos"]
        if not isinstance(years, list) or not years:
            raise ValueError(f"{where}.gt.anos_validos: lista não vazia de anos obrigatória.")
        event["gt"]["anos_validos"] = sorted({
            _year(y, where + ".gt.anos_validos") for y in years
        })
    return event


def read_event_catalog(path):
    """Load and validate evidence. Does not consult, infer or modify any source."""
    data = json.loads(Path(path).read_text(encoding="utf-8-sig"))
    _object(data, "catálogo")
    if type(data.get("schema_version")) is not int or data["schema_version"] != 1:
        raise ValueError("schema_version deve ser 1.")
    if data.get("ciclo") != "2025-2028":
        raise ValueError("Este módulo implementa somente o ciclo 2025-2028.")
    year = _year(data.get("ano_referencia"), "ano_referencia")
    if not isinstance(data.get("eventos"), list):
        raise ValueError("eventos deve ser uma lista.")
    events, aliases = {}, {}
    for index, raw in enumerate(data["eventos"]):
        event = _event(raw, index)
        if event["id"] in events:
            raise ValueError(f"Evento duplicado: {event['id']}")
        events[event["id"]] = event
        for key in event["alias_keys"]:
            aliases.setdefault(key, []).append(event["id"])
    verified = {}
    publications = data.get("publicacoes_verificadas", [])
    if not isinstance(publications, list):
        raise ValueError("publicacoes_verificadas deve ser uma lista.")
    for index, raw in enumerate(publications):
        where = f"publicacoes_verificadas[{index}]"
        raw = _object(raw, where)
        entry = {
            "titulo": _text(raw.get("titulo"), where + ".titulo"),
            "ano": _year(raw.get("ano"), where + ".ano"),
            "veiculo": _text(raw.get("veiculo"), where + ".veiculo"),
            "evento_id": _text(raw.get("evento_id"), where + ".evento_id"),
            "tipo": raw.get("tipo"),
            "fontes": _sources(raw.get("fontes"), where + ".fontes"),
            "nota": _text(raw.get("nota"), where + ".nota"),
            "corrigir_tipo_origem": _boolean(raw.get("corrigir_tipo_origem", False),
                                             where + ".corrigir_tipo_origem"),
        }
        if entry["evento_id"] not in events or entry["tipo"] not in WORK_TYPES:
            raise ValueError(f"{where}: evento ou tipo de trabalho desconhecido.")
        key = _publication_key(entry)
        if key in verified:
            raise ValueError(f"{where}: chave bibliográfica duplicada.")
        verified[key] = entry
    reviews = {}
    publications = data.get("publicacoes_em_verificacao", [])
    if not isinstance(publications, list):
        raise ValueError("publicacoes_em_verificacao deve ser uma lista.")
    for index, raw in enumerate(publications):
        where = f"publicacoes_em_verificacao[{index}]"
        raw = _object(raw, where)
        entry = {
            "titulo": _text(raw.get("titulo"), where + ".titulo"),
            "ano": _year(raw.get("ano"), where + ".ano"),
            "veiculo": _text(raw.get("veiculo"), where + ".veiculo"),
            "evento_id": _text(raw.get("evento_id"), where + ".evento_id"),
            "fontes": _sources(raw.get("fontes"), where + ".fontes"),
            "nota": _text(raw.get("nota"), where + ".nota"),
            "bloquear_faixa": _boolean(raw.get("bloquear_faixa"), where + ".bloquear_faixa"),
        }
        if any(raw[key] != entry[key] for key in ("titulo", "veiculo")):
            raise ValueError(f"{where}: título e veículo devem ser chaves literais sem espaços externos.")
        if entry["evento_id"] not in events:
            raise ValueError(f"{where}: evento desconhecido.")
        key = _publication_key(entry)
        if key in reviews or key in verified:
            raise ValueError(f"{where}: chave bibliográfica duplicada ou já verificada.")
        reviews[key] = entry
    return EventCatalog(year, events, {k: tuple(v) for k, v in aliases.items()}, verified, reviews)


def _h5_band(value):
    if value is None or value <= 0:
        return None
    for minimum, band in H5_CUTS:
        if value >= minimum:
            return band
    return "A8"


def _better(first, second):
    if first is None:
        return second
    if second is None:
        return first
    return first if int(first[1:]) <= int(second[1:]) else second


def _candidate_band(event):
    metric = event["h5"]
    base = _h5_band(metric["valor"] if metric else None)
    candidate = base
    steps = [f"H5={metric['valor']}: {base or 'sem faixa por H5'}"] if metric else []
    ce = event["ce_sbc"]
    if ce and base:
        levels = {"top10": 2, "top20": 1}.get(ce["categoria"], 0)
        if levels:
            promoted = f"A{max(3, int(base[1:]) - levels)}"
            candidate = _better(base, promoted)
            steps.append(f"CE-SBC {ce['categoria']}: elevação de até {levels} nível(is), teto A3")
    elif ce and event["h5_status"] in ("nao_localizado", "nao_consultado"):
        candidate = "A8" if ce["categoria"] == "relevante" else "A7"
        steps.append(f"CE-SBC {ce['categoria']}: referência {'mínima candidata' if event['h5_status'] == 'nao_consultado' else 'sem H5 localizado'} {candidate}")
    induction = event["inducao"]
    if induction:
        eligible = induction["aderencia_computacao"] and (
            induction["sociedade"] != "SBC" or induction["principal_nacional"])
        years = induction["tradicao_anos"]
        induced = "A4" if years >= 20 else "A5" if years >= 10 else None
        if eligible and induced:
            candidate = _better(candidate, induced)
            steps.append(f"Referência por indução {induction['nome_sociedade']}: tradição documentada de {years} anos ({induced})")
    if event["h5_status"] == "nao_consultado":
        steps.append("H5 não verificado; faixa candidata não entra na soma")
    return base, candidate, "; ".join(steps) or "Sem critério bibliométrico/qualitativo documentado."


def _in_year(event, year):
    return (event["desde_ano"] is None or year >= event["desde_ano"]) and (
        event["ate_ano"] is None or year <= event["ate_ano"])


def _unresolved_track_marker(publication, event):
    """Do not apply main-event metrics to a subsidiary track named in proceedings."""
    if normalize(event["trilha"]) not in ("principal", "pesquisa", "research", "main", "research track"):
        return None
    reference = str(publication.get("referencia") or "")
    parts = re.split(r"\.\s+(?:In|Em):\s+", reference, maxsplit=1, flags=re.I)
    # With no identifiable venue segment, never scan the article title for
    # words such as "workshop": it may be the subject of the research itself.
    venue_segment = parts[1] if len(parts) == 2 else str(publication.get("veiculo") or "")
    text, own_name = normalize(venue_segment), normalize(event["nome"])
    markers = (
        (r"\bworkshops?\b", "workshop"),
        (r"\bcompanion\b", "companion"),
        (r"\bwork in progress\b|\bwip\b", "work in progress"),
        (r"\bposters?\b", "pôster"),
        (r"\bdemos?\b|\bdemonstrations?\b", "demonstração"),
        (r"\bdoctoral symposium\b|\bdoctoral consortium\b", "trilha de doutorado"),
        (r"\bsoftware engineering in society\b|\bseis\b", "SEIS"),
        (r"\bsoftware engineering in practice\b|\bseip\b", "SEIP"),
        (r"\bsoftware engineering education and training\b|\bseet\b", "SEET"),
        (r"\bnew ideas and emerging results\b|\bnier\b", "NIER"),
        (r"\babstracts?\b|\banais estendidos\b|\bresumos\b|\bshort papers?\b", "resumos/anais estendidos"),
        (r"\btutorials?\b", "tutorial"),
    )
    for pattern, label in markers:
        if re.search(pattern, text) and not re.search(pattern, own_name):
            return label
    return None


def classify_event(publication, catalog):
    """Return a candidate venue band; assign points only with article and GT proof."""
    if not isinstance(catalog, EventCatalog):
        raise TypeError("Use o catálogo retornado por read_event_catalog.")
    _object(publication, "publicação")
    title = _text(publication.get("titulo"), "publicação.titulo")
    year = _year(publication.get("ano"), "publicação.ano")
    vehicle = publication.get("veiculo") or ""
    if not isinstance(vehicle, str):
        raise ValueError("publicação.veiculo deve ser texto.")
    result = {k: publication.get(k) for k in ("titulo", "veiculo", "ano", "referencia")}
    result.update(
        tipo="anais_congressos", faixa=None, percentil=None, base=None,
        scopus=None, jcr=None, source_id=None, issn=None, eissn=None,
        pontos=None, fora_formula=False, match_method=None,
        evento_id=None, evento_canonico=None, evento_trilha=None,
        h5=None, h5_ano=None, h5_periodo=None, h5_consultado_em=None,
        h5_status="nao_consultado", h5_nota=None, faixa_evento_h5=None,
        faixa_evento_referencia=None, criterio_evento=None,
        fontes_evento=[], pendencias_evento=[], pendencias_evento_codigos=[],
        evento_ano_referencia=catalog.ano_referencia, gt_anos_validos=None,
        verificacao_artigo_nota=None, tipo_trabalho_verificado=None,
        revisao_artigo_nota=None, faixa_evento_bloqueada=False,
        verificacao_gt_nota=None,
        status="pendente_evento", motivo=None,
    )

    def pending(code, message):
        result["pendencias_evento_codigos"].append(code)
        result["pendencias_evento"].append(message)

    candidates = [catalog.eventos[eid] for eid in catalog.aliases.get(normalize(vehicle), ())
                  if _in_year(catalog.eventos[eid], year)]
    verification = catalog.publicacoes_verificadas.get((title, year, vehicle))
    review = catalog.publicacoes_em_verificacao.get((publication["titulo"], year, vehicle))
    evidence = verification or review
    if evidence:
        result["fonte_artigo_evento"] = evidence["fontes"][0]["url"]
    if review:
        result.update(revisao_artigo_nota=review["nota"],
                      faixa_evento_bloqueada=review["bloquear_faixa"],
                      fontes_evento=review["fontes"])
        selected = catalog.eventos[review["evento_id"]]
        if review["bloquear_faixa"]:
            # Exact article evidence may reveal a subsidiary track even when
            # the Lattes reference only names the principal conference.
            result.update(evento_id=selected["id"], evento_canonico=selected["nome"],
                          evento_trilha=selected["trilha"],
                          match_method="publicacao_evento_em_verificacao",
                          criterio_evento="Revisão documentada da modalidade/trilha; métrica do evento principal não aplicada.")
            pending("trilha_nao_confirmada", review["nota"])
            result["motivo"] = review["nota"]
            return result
        pending("publicacao_em_verificacao", review["nota"])
        if not _in_year(selected, year):
            pending("fora_periodo_catalogo", "Revisão documentada fora do intervalo de anos do catálogo.")
            result["motivo"] = " ".join(result["pendencias_evento"])
            return result
        if candidates and selected["id"] not in {e["id"] for e in candidates}:
            pending("identificacao_conflitante", "Alias do veículo e revisão documentada apontam para eventos/trilhas diferentes.")
            result["motivo"] = " ".join(result["pendencias_evento"])
            return result
        candidates = [selected]
        result["match_method"] = "publicacao_evento_em_verificacao"
    if verification:
        result.update(verificacao_artigo_nota=verification["nota"],
                      tipo_trabalho_verificado=verification["tipo"])
        selected = catalog.eventos[verification["evento_id"]]
        if not _in_year(selected, year):
            pending("fora_periodo_catalogo", "Identificação documentada fora do intervalo de anos do catálogo.")
            result["motivo"] = result["pendencias_evento"][0]
            return result
        # An exact, sourced article verification identifies the actual track.
        # A generic venue name in the CV is weaker evidence and cannot override
        # a documented workshop/companion identification for this one article.
        candidates = [selected]
        result["match_method"] = "publicacao_evento_verificada"
    elif candidates and not review:
        result["match_method"] = "alias_evento_exato"
    if len(candidates) != 1:
        ambiguous = len(candidates) > 1
        code = "alias_ambiguo" if ambiguous else "evento_nao_localizado"
        pending(code, "Alias corresponde a mais de um evento/trilha; confirme a identidade." if ambiguous
                else "Evento/trilha não localizado por nome exato no catálogo; nenhuma classificação foi herdada.")
        result["candidatos_evento"] = [{"id": e["id"], "nome": e["nome"], "trilha": e["trilha"]} for e in candidates]
        result["motivo"] = result["pendencias_evento"][0]
        return result
    event = candidates[0]
    result.update(verificacao_gt_nota=event["gt"]["nota"],
                  gt_anos_validos=event["gt"]["anos_validos"])
    unresolved_track = _unresolved_track_marker(publication, event)
    if unresolved_track and not verification:
        # A generic Lattes venue can hide SEIS/SEET/companion proceedings.
        # Even the candidate band must not inherit the principal event's H5.
        result.update(evento_id=event["id"], evento_canonico=event["nome"],
                      evento_trilha=event["trilha"],
                      criterio_evento="Referência indica modalidade/trilha distinta; métrica do evento principal não aplicada.")
        pending("trilha_nao_confirmada", f"A referência menciona {unresolved_track}; confirme o evento/trilha deste artigo em fonte primária.")
        result["motivo"] = result["pendencias_evento"][0]
        return result
    base, candidate, criterion = _candidate_band(event)
    metric = event["h5"]
    result.update(
        evento_id=event["id"], evento_canonico=event["nome"], evento_trilha=event["trilha"],
        h5=metric["valor"] if metric else None, h5_ano=metric["ano"] if metric else None,
        h5_periodo=metric["periodo"] if metric else None,
        h5_consultado_em=metric["consultado_em"] if metric else (
            event["h5_busca"]["consultado_em"] if event["h5_busca"] else None),
        h5_status=event["h5_status"],
        h5_nota=event["h5_busca"]["nota"] if event["h5_busca"] else None,
        gt_anos_validos=event["gt"]["anos_validos"],
        faixa_evento_h5=base,
        faixa_evento_referencia=candidate, criterio_evento=criterion,
    )
    sources = [{"url": AREA_URL, "titulo": "CAPES Computação 2025–2028, pp. 22–23"},
               {"url": GT_URL, "titulo": "Relatório CAPES do GT de classificação de eventos"}]
    for block in (metric, event["h5_busca"], event["ce_sbc"], event["inducao"], event["gt"], verification, review):
        if block:
            sources.extend(block.get("fontes", []))
    result["fontes_evento"] = _sources(sources, "fontes_evento")
    gt_years = event["gt"]["anos_validos"]
    if gt_years is not None and year not in gt_years:
        pending("gt_edicao_nao_verificada", "Evidência dos critérios do GT não cobre a edição do ano deste artigo.")
    elif event["gt"]["atende"] is False:
        pending("gt_nao_atendido", "Evidência registra que o evento/trilha não atende aos critérios qualitativos do GT.")
        result["status"] = "evento_nao_elegivel"
    elif event["gt"]["atende"] is None:
        pending("gt_nao_verificado", "Critérios qualitativos do GT ainda não foram verificados para este evento/trilha.")
    if not verification:
        pending("tipo_trabalho_nao_verificado", "Não foi confirmado que este registro é artigo completo da trilha identificada.")
    elif verification["tipo"] != "artigo_completo":
        pending("trabalho_nao_completo", f"Tipo documentado: {verification['tipo']}; não contado como artigo completo.")
        result["status"] = "evento_nao_elegivel"
    if event["h5_status"] == "nao_consultado":
        pending("h5_nao_verificado", "H5 não consultado/verificado; ausência local não significa evento sem H5.")
    if candidate is None:
        pending("sem_faixa_documentada", "Nenhuma faixa de referência pôde ser atribuída pelas evidências disponíveis.")
    if not result["pendencias_evento"]:
        result.update(status="classificado", faixa=candidate, base="Evento: H5/CE-SBC/indução",
                      pontos=WEIGHTS.get(candidate), fora_formula=candidate not in WEIGHTS,
                      motivo="Artigo completo e critérios editoriais do evento verificados; estimativa local, não classificação final CAPES. A aderência à linha/projeto do PPG depende de apreciação institucional.")
    else:
        result["motivo"] = " ".join(result["pendencias_evento"])
    return result
