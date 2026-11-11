"""Analise local de um PDF Lattes, sem cadastrar ou alterar docentes.

CLI:
  python scripts/analisar-lattes-avulso.py --pdf CV.pdf --output-dir PASTA
      --ano-inicio 2022 --ano-fim 2026 [--nome "Nome do docente"] [--root SIADOCE]

API analisar_pdf(pdf, output_dir, ano_inicio, ano_fim, nome=None, *, root=None).
Saidas privadas: analise-lattes.json (schema_version=2, modo=analise_avulsa,
docentes com exatamente um elemento), extracao-lattes.json (referencias usadas)
e relatorio-analise.txt. O JSON usa classify/annual_summary do SIADoce, incluindo
os mesmos estados de ausencia de cobertura e pontos nulos.

A ponte PowerShell importa gerar-publicacoes-lattes.ps1 -SomenteFuncoes.
Requer Python 3.10+, PowerShell 7 e pdftotext no PATH.
Nao escreve em data, content, static ou public, nem faz chamadas de rede.
"""
import argparse
import collections
import copy
from datetime import date, datetime, timezone
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile


SCRIPT_DIR = Path(__file__).resolve().parent
DEFAULT_ROOT = SCRIPT_DIR.parent
RESULT_NAME = "analise-lattes.json"
EXTRACTION_NAME = "extracao-lattes.json"
MAX_RESULT_BYTES = 8 * 1024 * 1024
MAX_RECORDS = 20000


def load_engine():
    name = "siadoce_producao_avulsa"
    if name in sys.modules:
        return sys.modules[name]
    if str(SCRIPT_DIR) not in sys.path:
        sys.path.insert(0, str(SCRIPT_DIR))
    spec = importlib.util.spec_from_file_location(name, SCRIPT_DIR / "gerar-producao-docente.py")
    engine = importlib.util.module_from_spec(spec)
    sys.modules[name] = engine
    spec.loader.exec_module(engine)
    return engine


def file_hash(path):
    digest = hashlib.sha256()
    with Path(path).open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def validate_years(ano_inicio, ano_fim):
    if (type(ano_inicio) is not int or type(ano_fim) is not int
            or not 1900 <= ano_inicio <= ano_fim <= 2099):
        raise ValueError("Intervalo inválido: use anos inteiros entre 1900 e 2099, com início menor ou igual ao fim.")
    if ano_fim - ano_inicio >= 100:
        raise ValueError("Escolha uma janela de até 100 anos, limite da página de análise avulsa.")
    return list(range(ano_inicio, ano_fim + 1))


def validate_destination(root, output_dir):
    root, output_dir = Path(root).resolve(), Path(output_dir).resolve()
    for folder in ("data", "content", "static", "public", "scripts"):
        forbidden = (root / folder).resolve()
        if output_dir == forbidden or output_dir.is_relative_to(forbidden):
            raise ValueError(f"Escolha uma pasta privada fora de {folder}; a análise avulsa não altera o site nem o cadastro.")
    return output_dir


def validate_pdf(pdf):
    pdf = Path(pdf).resolve()
    if not pdf.is_file() or pdf.suffix.casefold() != ".pdf":
        raise ValueError("Selecione um arquivo PDF existente exportado pelo Lattes.")
    with pdf.open("rb") as handle:
        if not handle.read(1024).lstrip().startswith(b"%PDF-"):
            raise ValueError("O arquivo não possui um cabeçalho PDF válido.")
    return pdf


def resolve_powershell():
    candidates = [
        os.environ.get("SIADOCE_POWERSHELL"),
        shutil.which("pwsh"),
        str(Path(os.environ.get("USERPROFILE", "")) /
            ".cache/codex-runtimes/codex-primary-runtime/dependencies/native/powershell/pwsh.exe"),
    ]
    for candidate in candidates:
        if candidate and Path(candidate).is_file():
            return str(Path(candidate).resolve())
    raise ValueError("PowerShell 7 (pwsh) não encontrado. Instale-o ou defina SIADOCE_POWERSHELL.")


def extrair_pdf(pdf, working_dir, ano_inicio, ano_fim):
    working_dir = Path(working_dir).resolve()
    output = working_dir / EXTRACTION_NAME
    env = os.environ.copy()
    # The canonical extractor also uses .NET temporary files. Keep all its
    # copies in this private, short-lived directory, never in static/public.
    env["TEMP"] = str(working_dir)
    env["TMP"] = str(working_dir)
    env["TMPDIR"] = str(working_dir)  # .NET temporary files on macOS/Linux.
    env["PYTHONIOENCODING"] = "utf-8"
    command = [
        resolve_powershell(), "-NoProfile", "-File",
        str(SCRIPT_DIR / "extrair-lattes-avulso.ps1"),
        "-PdfPath", str(pdf), "-OutputJson", str(output),
        "-Inicio", str(ano_inicio), "-Fim", str(ano_fim),
    ]
    try:
        result = subprocess.run(
            command, env=env, capture_output=True, text=True, encoding="utf-8",
            errors="replace", timeout=600,
            creationflags=getattr(subprocess, "CREATE_NO_WINDOW", 0),
        )
    except subprocess.TimeoutExpired as exc:
        raise ValueError("A leitura do PDF excedeu 10 minutos; verifique o arquivo e tente novamente.") from exc
    if result.returncode != 0 or not output.is_file():
        message = (result.stderr or result.stdout).strip()
        raise ValueError("Não foi possível extrair o currículo. " + message[-6000:])
    return json.loads(output.read_text(encoding="utf-8-sig"))


def carregar_fontes(root):
    root = Path(root).resolve()
    engine = load_engine()
    paths = {
        "catalogo": root / "data/controle/catalogo-periodicos-google.json",
        "aliases": root / "data/controle/periodicos-aliases.json",
        "publicacoes_verificadas": root / "data/controle/publicacoes-verificadas.json",
        "catalogo_eventos": root / "data/controle/eventos-capes.json",
        "classificador": SCRIPT_DIR / "gerar-producao-docente.py",
        "classificador_eventos": SCRIPT_DIR / "classificar_eventos.py",
        "extrator": SCRIPT_DIR / "gerar-publicacoes-lattes.ps1",
        "ponte_extracao": SCRIPT_DIR / "extrair-lattes-avulso.ps1",
        "analisador": Path(__file__).resolve(),
    }
    for path in paths.values():
        if not path.is_file():
            raise ValueError(f"Fonte local necessária não encontrada: {path.name}.")
    hashes = {name: file_hash(path) for name, path in paths.items()}
    catalog, titles, identifiers = engine.read_catalog(paths["catalogo"])
    aliases = engine.read_aliases(paths["aliases"], catalog)
    verified, homonyms = engine.read_verified_publications(paths["publicacoes_verificadas"], catalog)
    events = engine.read_event_catalog(paths["catalogo_eventos"])
    metadata = {
        name: {
            "arquivo": path.relative_to(root).as_posix() if path.is_relative_to(root) else path.name,
            "sha256": hashes[name],
        } for name, path in paths.items()
    }
    return {
        "catalogo": catalog, "titulos": titles, "identificadores": identifiers,
        "aliases": aliases, "verificadas": verified, "homonimos": homonyms,
        "eventos": events, "fontes": metadata, "_paths": paths,
    }


def validate_extraction(extraction, ano_inicio, ano_fim, nome=None):
    if not isinstance(extraction, dict) or extraction.get("schema_version") != 1:
        raise ValueError("Formato de extração não reconhecido.")
    if (extraction.get("ano_inicio"), extraction.get("ano_fim")) != (ano_inicio, ano_fim):
        raise ValueError("A janela da extração difere da janela solicitada.")
    if not re.fullmatch(r"\d{16}", str(extraction.get("lattes_id") or "")):
        raise ValueError("ID Lattes ausente ou inválido; a identidade não pode vir somente do nome do arquivo.")
    detected = extraction.get("nome_detectado")
    if detected is not None and not isinstance(detected, str):
        raise ValueError("Nome detectado inválido.")
    detected = (detected or "").strip()
    supplied = (nome or "").strip()
    if nome is not None and not supplied:
        raise ValueError("O nome informado está vazio.")
    if detected and supplied and load_engine().normalize(detected) != load_engine().normalize(supplied):
        raise ValueError(f"Nome informado diverge do PDF: o currículo foi identificado como {detected}.")
    if not detected and not supplied:
        raise ValueError("Nome do docente não reconhecido no PDF; confirme a identidade e informe --nome.")
    updated = extraction.get("lattes_atualizado_em")
    if updated:
        try:
            if date.fromisoformat(updated).isoformat() != updated:
                raise ValueError()
        except (TypeError, ValueError) as exc:
            raise ValueError("Data de atualização do currículo inválida.") from exc
    sections = extraction.get("secoes")
    if (not isinstance(sections, dict) or set(sections) != {"periodicos", "eventos"}
            or any(type(value) is not bool for value in sections.values())):
        raise ValueError("Diagnóstico das seções do currículo ausente.")
    publications = extraction.get("publicacoes")
    if not isinstance(publications, list):
        raise ValueError("Lista de publicações ausente na extração.")
    if len(publications) > MAX_RECORDS:
        raise ValueError("A extração excede 20 mil registros; reduza a janela de anos para abrir o resultado na página.")
    for pub in publications:
        if not isinstance(pub, dict) or pub.get("tipo") not in ("periodico", "anais_congressos"):
            raise ValueError("Tipo de publicação não reconhecido na extração.")
        if type(pub.get("ano")) is not int or not ano_inicio <= pub["ano"] <= ano_fim:
            raise ValueError("Ano de publicação fora da janela solicitada.")
        if any(not isinstance(pub.get(field), str) or not pub[field].strip()
               for field in ("titulo", "referencia")):
            raise ValueError("Referência extraída sem título ou texto; revise o PDF.")
        if pub.get("veiculo") is not None and not isinstance(pub["veiculo"], str):
            raise ValueError("Veículo bibliográfico inválido.")
    return detected or supplied, updated or None


def classificar_extracao(extraction, sources, pdf_sha256, pdf_nome,
                        ano_inicio, ano_fim, nome=None, atualizado_em=None):
    """Pure calculation, using the same classification and annual aggregation."""
    years = validate_years(ano_inicio, ano_fim)
    name, cv_updated = validate_extraction(extraction, ano_inicio, ano_fim, nome)
    if not re.fullmatch(r"[a-f0-9]{64}", pdf_sha256):
        raise ValueError("SHA-256 do PDF inválido.")
    engine = load_engine()
    generated_at = atualizado_em or datetime.now(timezone.utc).isoformat(timespec="seconds")
    publications, duplicates, seen = [], [], {}
    for index, pub in enumerate(extraction["publicacoes"]):
        key = (pub["ano"], pub["tipo"], engine.normalize(pub["referencia"]))
        if key in seen:
            duplicates.append({
                "indice_extracao": index, "mesma_referencia_do_indice": seen[key],
                "titulo": pub["titulo"], "ano": pub["ano"],
            })
            continue
        seen[key] = index
        classified = engine.classify(
            pub, sources["titulos"], sources["identificadores"], sources["aliases"],
            sources["verificadas"], sources["homonimos"], sources["eventos"],
        )
        classified["fonte_extracao"] = {
            "arquivo": EXTRACTION_NAME, "ponteiro": f"/publicacoes/{index}",
            "pdf_sha256": pdf_sha256, "tipo_extraido": pub["tipo"],
        }
        publications.append(classified)
    sections_found = any(extraction["secoes"].values())
    warnings = []
    if not sections_found:
        warnings.append(
            "Nenhuma das duas seções de artigos completos foi reconhecida. "
            "Isso não comprova ausência de produção; os anos ficam sem pontuação."
        )
    if not cv_updated:
        warnings.append(
            "A data de atualização do currículo não foi localizada. "
            "Anos sem registros ficam sem pontuação."
        )
    if not extraction.get("nome_detectado"):
        warnings.append("Nome informado pelo operador; o ID Lattes foi lido no conteúdo do PDF.")
    annual = [
        engine.annual_summary(
            year, [p for p in publications if p["ano"] == year], True,
            cv_updated if sections_found else None,
        ) for year in years
    ]
    faculty = {
        "id": "avulso-" + extraction["lattes_id"], "nome": name,
        "categoria": "analise_avulsa", "lattes_status": "disponivel",
        "lattes_id": extraction["lattes_id"],
        "lattes_atualizado_em": cv_updated,
        "lattes_url": "http://lattes.cnpq.br/" + extraction["lattes_id"],
        "lattes_pdf": Path(pdf_nome).name, "lattes_pdf_sha256": pdf_sha256,
        "extracao_atualizada_em": generated_at,
        "cobertura": (
            "Análise avulsa dos registros localizados neste PDF, sem vínculo com o cadastro "
            "de docentes. O arquivo e sua data de atualização não comprovam completude."
        ),
        "anos": annual,
    }
    metadata = copy.deepcopy(sources["fontes"])
    metadata["pdf_avulso"] = {"arquivo": Path(pdf_nome).name, "sha256": pdf_sha256}
    payload = {
        "schema_version": 2, "modo": "analise_avulsa",
        "periodo": f"01/01/{ano_inicio} a 31/12/{ano_fim}", "anos": years,
        # read_catalog rejects any metric year other than this configured
        # integration. This does not infer the metric year from the CV.
        "snapshot_ano": 2025, "atualizado_em": generated_at,
        "gerado_por": "scripts/analisar-lattes-avulso.py",
        "fonte": "Um PDF Lattes e as referências locais de periódicos e eventos do SIADoce.",
        "pesos": dict(engine.WEIGHTS), "faixas": list(engine.BANDS),
        "metodologia": {
            "nome_indicador": "Soma bibliográfica estimada — análise avulsa",
            "ficha_url": engine.FICHA_URL, "ficha_pagina": 7, "ficha_item": "2.4",
            "aviso": (
                "Análise avulsa, sem credenciamento ou alteração do cadastro. "
                "Estimativa local: a avaliação oficial considera seleção institucional de "
                "4N produções e ajustes dos artigos. A soma não determina recredenciamento."
            ),
            "faixas": "Referência inicial pelo maior percentil CiteScore/JIF disponível nas métricas locais de 2025; não é classificação final CAPES.",
            "a5_a8": "A5–A8 são exibidos, mas não recebem peso inventado na fórmula A1–A4.",
            "ausentes": "Sem identificação ou percentil permanece pendente; não recebe A8 ou zero automaticamente.",
            "eventos": "Mesmas regras locais de H5, CE-SBC, indução, comprovação de artigo completo e critérios GT da edição usadas no SIADoce.",
            "eventos_temporal": "Regras 2025–2028 aplicadas aos anos exibidos; não representa reconstrução do Qualis histórico.",
            "matching": "Identificação exata, ISSN e evidências individuais dos classificadores existentes; homônimos e conflitos ficam pendentes.",
            "periodo": "Janela anual escolhida para esta análise, sem depender do período Janus.",
            "atualizacao_cv": "Anos sem registros posteriores à atualização do CV, ou com data desconhecida, ficam sem pontuação.",
            "zero": "Zero significa ausência de contribuição A1–A4 nos registros localizados, não ausência comprovada de produção.",
            "limite_catalogo": f"{len(sources['catalogo'])} periódicos no catálogo local; métricas não foram consultadas nem atualizadas na internet.",
            "privacidade": "Processamento local. O JSON não cadastra o docente nem envia o currículo para a planilha Google.",
        },
        "fontes": metadata, "catalogo_registros": len(sources["catalogo"]),
        "docentes": [faculty],
        "extracao": {
            "arquivo": EXTRACTION_NAME, "secoes": copy.deepcopy(extraction["secoes"]),
            "total_localizado_sem_recorte": extraction.get("total_localizado_sem_recorte"),
            "total_fora_recorte": extraction.get("total_fora_recorte"),
            "registros_extraidos": len(extraction["publicacoes"]),
            "registros_apos_duplicatas_exatas": len(publications),
            "nome_origem": "conteudo_pdf" if extraction.get("nome_detectado") else "operador",
        },
        "auditoria": {
            "docentes_incluidos": 1, "docentes_excluidos": [],
            "duplicatas_exatas_removidas": duplicates, "avisos": warnings,
            "status_publicacoes": dict(collections.Counter(p["status"] for p in publications)),
            "status_eventos": dict(collections.Counter(
                p["status"] for p in publications if p["tipo"] == "anais_congressos")),
        },
    }
    if len(json.dumps(payload, ensure_ascii=False, indent=2, allow_nan=False).encode("utf-8")) + 1 > MAX_RESULT_BYTES:
        raise ValueError("O resultado excede 8 MiB, limite da página. Reduza a janela de anos e tente novamente.")
    return payload


def render_report(payload):
    faculty = payload["docentes"][0]
    rows = [
        "SIADoce — análise avulsa de PDF Lattes",
        f"Docente: {faculty['nome']}",
        f"ID Lattes: {faculty['lattes_id']}",
        f"Período solicitado: {payload['periodo']}",
        f"Atualização do CV: {faculty['lattes_atualizado_em'] or 'não localizada'}",
        f"SHA-256 do PDF: {faculty['lattes_pdf_sha256']}",
        "",
        "Ano | A1 | A2 | A3 | A4 | A5 | A6 | A7 | A8 | Soma de referência | Pendências | Situação",
    ]
    for annual in faculty["anos"]:
        points = annual["pontos_referencia"]
        rows.append(" | ".join([
            str(annual["ano"]), *[str(annual["contagens"][band]) for band in payload["faixas"]],
            "sem pontuação" if points is None else f"{points:g}",
            str(annual["pendentes"] + annual["eventos_pendentes"]), annual["pontos_status"],
        ]))
    rows += [
        "", *payload["auditoria"]["avisos"], "",
        payload["metodologia"]["aviso"],
        "A frequência e a soma não substituem a leitura dos artigos ou a decisão do programa.",
        "No SIADoce, abra Produção docente > Analisar outro currículo e escolha analise-lattes.json.",
        "As referências completas ficam em extracao-lattes.json; cada item classificado aponta para sua origem.",
        "Nenhum cadastro ou arquivo público foi modificado. Nenhuma chamada de rede foi feita.",
        "",
    ]
    return "\n".join(rows)


def _write_outputs(output_dir, outputs):
    output_dir.mkdir(parents=True, exist_ok=True)
    staged = []
    try:
        for name, value in outputs.items():
            with tempfile.NamedTemporaryFile("w", encoding="utf-8", newline="",
                                             dir=output_dir, prefix=name + ".",
                                             suffix=".tmp", delete=False) as handle:
                handle.write(value)
                staged.append((Path(handle.name), output_dir / name))
        for temporary, target in staged:
            os.replace(temporary, target)
    finally:
        for temporary, _ in staged:
            if temporary.exists():
                temporary.unlink()


def analisar_pdf(pdf, output_dir, ano_inicio, ano_fim, nome=None, *, root=None):
    root = Path(root or DEFAULT_ROOT).resolve()
    validate_years(ano_inicio, ano_fim)
    output_dir = validate_destination(root, output_dir)
    pdf = validate_pdf(pdf)
    pdf_sha = file_hash(pdf)
    sources = carregar_fontes(root)
    temp_parent = validate_destination(root, root / "tmp/analise-lattes-avulso")
    temp_parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="cv-", dir=temp_parent) as working_dir:
        extraction = extrair_pdf(pdf, working_dir, ano_inicio, ano_fim)
    if file_hash(pdf) != pdf_sha:
        raise ValueError("O PDF foi modificado durante a leitura; execute a análise novamente.")
    for name, path in sources["_paths"].items():
        if file_hash(path) != sources["fontes"][name]["sha256"]:
            raise ValueError(f"A fonte {name} mudou durante a leitura; execute a análise novamente.")
    payload = classificar_extracao(
        extraction, sources, pdf_sha, pdf.name, ano_inicio, ano_fim, nome)
    extraction["pdf_sha256"] = pdf_sha
    extraction["pdf_nome"] = pdf.name
    serialize = lambda value: json.dumps(value, ensure_ascii=False, indent=2, allow_nan=False) + "\n"
    _write_outputs(output_dir, {
        EXTRACTION_NAME: serialize(extraction),
        RESULT_NAME: serialize(payload),
        "relatorio-analise.txt": render_report(payload),
    })
    return payload


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--pdf", type=Path, required=True)
    parser.add_argument("--output-dir", type=Path, required=True)
    parser.add_argument("--ano-inicio", type=int, required=True)
    parser.add_argument("--ano-fim", type=int, required=True)
    parser.add_argument("--nome")
    parser.add_argument("--root", type=Path, default=DEFAULT_ROOT)
    args = parser.parse_args(argv)
    payload = analisar_pdf(
        args.pdf, args.output_dir, args.ano_inicio, args.ano_fim, args.nome, root=args.root)
    print(json.dumps({
        "arquivo": str(args.output_dir.resolve() / RESULT_NAME),
        "modo": payload["modo"], "docente": payload["docentes"][0]["nome"],
        "anos": payload["anos"], "status": payload["auditoria"]["status_publicacoes"],
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    try:
        main()
    except (ValueError, OSError, KeyError) as exc:
        raise SystemExit(f"Não foi possível analisar o PDF: {exc}")
