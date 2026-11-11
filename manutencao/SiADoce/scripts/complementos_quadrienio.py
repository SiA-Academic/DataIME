"""Evidências bibliográficas verificadas usadas na análise das publicações."""
import json
import re
import unicodedata
from collections import defaultdict
from urllib.parse import urlsplit

from classificar_eventos import classify_event
from quadrienio import QUADRENNIUM


def normalized(value):
    text = unicodedata.normalize("NFKD", str(value or "").casefold())
    return "".join(c for c in text if c.isalnum())


def faculty_index(faculty):
    """Resolve chaves persistentes sem inferir a identidade pelo nome do autor."""
    result = {}
    for person in faculty:
        keys = []
        if person.get("nusp"):
            keys.append(("nusp", str(person["nusp"])))
        link = urlsplit(person.get("lattes_url") or "")
        lattes_id = link.path.strip("/")
        if link.hostname == "lattes.cnpq.br" and re.fullmatch(r"\d{16}", lattes_id):
            keys.append(("lattes_id", lattes_id))
        for key in keys:
            if key in result:
                raise ValueError(f"Identificador docente duplicado na produção: {key}")
            result[key] = person
    return result


def validate_record(entry):
    identity = [key for key in ("lattes_id", "nusp") if key in entry]
    sources = [key for key in ("source_id", "issn", "evento_id", "coautor_lattes_id") if key in entry]
    if len(identity) != 1 or len(sources) != 1:
        raise ValueError("Complemento sem identificador único de pessoa ou de origem da faixa.")
    for field in (identity[0], sources[0]):
        pattern = {"issn": r"\d{4}-\d{3}[\dX]", "evento_id": r"[a-z0-9][a-z0-9._-]*"}.get(
            field, r"\d{16}" if "lattes" in field else r"\d+")
        if not isinstance(entry[field], str) or not re.fullmatch(pattern, entry[field]):
            raise ValueError(f"Identificador inválido em complemento: {field}.")
    if (entry.get("tipo") not in ("periodico", "anais_congressos") or
            (entry["tipo"] != "periodico" and sources[0] in ("source_id", "issn")) or
            (entry["tipo"] != "anais_congressos" and "evento_id" in entry) or
            entry.get("estado") not in ("incluido", "pendente") or
            type(entry.get("ano")) is not int or
            not QUADRENNIUM["inicio"] <= entry["ano"] <= QUADRENNIUM["fim"]):
        raise ValueError("Tipo, estado ou ano inválido em complemento da análise de publicações.")
    if not all(isinstance(entry.get(k), str) and entry[k].strip()
               for k in ("titulo", "veiculo", "nota", "fonte")):
        raise ValueError("Complemento sem identificação bibliográfica, fonte ou justificativa.")
    url = urlsplit(entry["fonte"])
    has_doi = isinstance(entry.get("doi"), str) and re.fullmatch(r"10\.\d{4,9}/\S+", entry["doi"], re.I)
    has_paper_id = (entry["tipo"] == "anais_congressos" and "evento_id" in entry and
                    isinstance(entry.get("id_anais"), str) and re.fullmatch(r"[a-z0-9][a-z0-9._-]*", entry["id_anais"]))
    if (("doi" in entry) == ("id_anais" in entry) or not (has_doi or has_paper_id)
            or not url.hostname or url.scheme != "https"):
        raise ValueError("Complemento sem identificação bibliográfica, fonte ou justificativa.")
    return identity[0], entry[identity[0]]


def matches_work(pub, entry, source_id=None, event_id=None):
    doi = str(pub.get("identificacao_doi") or "").casefold()
    expected_doi = entry.get("doi", "").casefold()
    if doi and expected_doi:
        return doi == expected_doi
    reference_dois = re.findall(r"\b10\.\d{4,9}/[^\s<>]+", pub.get("referencia") or "", re.I)
    if reference_dois and expected_doi:
        return expected_doi in {d.rstrip(".,;").casefold() for d in reference_dois}
    if normalized(pub["titulo"]) != normalized(entry["titulo"]):
        return False
    return (source_id is not None and pub.get("source_id") == source_id or
            event_id is not None and pub.get("evento_id") == event_id or
            normalized(entry["veiculo"]) in {normalized(pub.get("veiculo")), normalized(pub.get("titulo_catalogo"))})


def publication_matches(person, entry, source_id=None, event_id=None):
    if person is None:
        return []
    return [(year["ano"], index, pub) for year in person["anos"]
            for index, pub in enumerate(year["publicacoes"])
            if matches_work(pub, entry, source_id, event_id)]


def load_complements(path, faculty_output, catalog, event_catalog=None):
    """Anexa provas individuais, deduplica com o CV e reavalia as faixas a cada geração."""
    data = json.loads(path.read_text(encoding="utf-8-sig"))
    if data.get("schema_version") != 1 or not isinstance(data.get("registros"), list):
        raise ValueError("Formato do catálogo de complementos não reconhecido.")
    people = faculty_index(faculty_output)
    journals = {row["source_id"]: row for row in catalog}
    result = defaultdict(list)
    seen = set()
    for entry in data["registros"]:
        person_key = validate_record(entry)
        person = people.get(person_key)
        identifier_key = "doi" if "doi" in entry else "id_anais"
        identifier = entry[identifier_key]
        identity = (person["id"] if person is not None else person_key, identifier.casefold())
        if identity in seen:
            raise ValueError(f"{identifier_key.upper()} duplicado em complementos da mesma pessoa: {identifier}")
        seen.add(identity)
        if person is None:  # A pessoa pode ter saído do grupo atual.
            continue
        item = {key: entry[key] for key in ("ano", "titulo", "veiculo", "tipo", "estado", identifier_key, "fonte", "nota")}
        source_id = entry.get("source_id")
        event_id = entry.get("evento_id")
        if source_id is not None:
            band = journals.get(source_id, {}).get("faixa")
        elif "issn" in entry:
            issn = entry["issn"].replace("-", "")
            matches = [j for j in catalog if issn in {
                str(j.get(field) or "").replace("-", "").upper() for field in ("issn", "eissn")}]
            band = matches[0]["faixa"] if len(matches) == 1 else None
            if len(matches) == 1:
                source_id = matches[0]["source_id"]
        elif event_id:
            verified = classify_event(entry, event_catalog)
            if verified["evento_id"] != event_id:
                raise ValueError(f"Identificação conflitante do evento no complemento {identifier}.")
            if verified["status"] == "evento_nao_elegivel":
                continue
            band = verified["faixa"]
        else:
            source = people.get(("lattes_id", entry["coautor_lattes_id"]))
            records = [p for year, _, p in publication_matches(source, entry)
                       if year == entry["ano"] and p["tipo"] == entry["tipo"] and p["status"] == "classificado"]
            band = None
            if len(records) == 1:
                band = records[0]["faixa"]
                source_id = records[0].get("source_id")
                event_id = records[0].get("evento_id")
        allowed = QUADRENNIUM["faixas_periodicos" if entry["tipo"] == "periodico" else "faixas_congressos"]
        if band is not None and band not in allowed:
            continue
        item["faixa"] = band
        if band is None:
            item["estado"] = "pendente"
            item["nota"] += " Falta confirmar a faixa na base atual."
        own = publication_matches(person, entry, source_id, event_id)
        within = [(year, index, p) for year, index, p in own
                  if QUADRENNIUM["inicio"] <= year <= QUADRENNIUM["fim"]]
        if len(within) > 1:
            raise ValueError(f"Mais de uma correspondência no CV para {identifier}.")
        if within:
            year, index, pub = within[0]
            if pub["status"] == "classificado":
                if entry["estado"] != "pendente" or pub["faixa"] not in allowed:
                    continue
                # A divergência de ano vale igualmente para todos os coautores.
                item["referencia_cv"] = {"ano": year, "indice": index}
            elif pub["tipo"] == "periodico" or pub["status"] == "pendente_evento":
                item["referencia_cv"] = {"ano": year, "indice": index}
            else:
                # A evidência de modalidade no currículo pode contradizer o complemento.
                item["estado"] = "pendente"
                item["nota"] += " A modalidade no currículo exige conferência."
        elif own and item["estado"] == "incluido":
            item["estado"] = "pendente"
            item["nota"] += " O mesmo trabalho consta do CV com ano fora do período analisado."
        result[person["id"]].append(item)
    return dict(result)
