"""Cria o pacote público do analisador a partir de uma lista fixa de arquivos.

Uso: python scripts/empacotar-analisador-lattes.py
Usa apenas a biblioteca padrão do Python 3.10+.
"""

import argparse
import json
from pathlib import Path
import re
import tempfile
from zipfile import ZIP_DEFLATED, ZipFile, ZipInfo

from validar_catalogo_periodicos import load_catalog_snapshot


FILES = (
    "analisar-lattes.sh",
    "analisar-lattes.ps1",
    "requirements-lattes.txt",
    "docs/ANALISAR_LATTES_AVULSO.md",
    "scripts/analisar-lattes-avulso.py",
    "scripts/extrair-lattes-avulso.ps1",
    "scripts/gerar-publicacoes-lattes.ps1",
    "scripts/gerar-producao-docente.py",
    "scripts/classificar_eventos.py",
    "scripts/validar_catalogo_periodicos.py",
    "data/controle/catalogo-periodicos-google.json",
    "data/controle/periodicos-aliases.json",
    "data/controle/publicacoes-verificadas.json",
    "data/controle/eventos-capes.json",
)

README = r"""SiADoce - Análise de um currículo Lattes

1. Extraia este pacote.
2. No primeiro uso, prepare Python 3.10+, PowerShell 7 e pdftotext conforme
   docs/ANALISAR_LATTES_AVULSO.md. Não há bibliotecas Python extras a instalar.
3. Salve o PDF do Lattes nesta pasta e abra o terminal nela.

Windows (PowerShell):
  .\analisar-lattes.ps1 walner.pdf -Inicio 2022 -Fim 2026

Mac / Linux (Terminal):
  bash analisar-lattes.sh walner.pdf -Inicio 2022 -Fim 2026

Troque walner.pdf pelo nome do seu PDF. Use aspas se houver espaços.
Ao terminar, abra analise-lattes.json no SiADoce, em:
Produção docente > Analisar outro currículo > Abrir resultado da análise.

O PDF é processado localmente. Não é necessário instalar servidor.
O catálogo de periódicos vem da exportação da planilha Google incluída no pacote.
As métricas e as evidências dos eventos correspondem à versão incluída.
"""


def package(root: Path, output: Path) -> None:
    root = root.resolve(strict=True)
    output = output.resolve()
    if output.suffix.lower() != ".zip":
        raise ValueError("O arquivo de saída deve ter extensão .zip.")
    load_catalog_snapshot(root / "data/controle/catalogo-periodicos-google.json")

    # Não percorra pastas: currículos pessoais, resultados, cadastros e backups
    # nunca entram no pacote, mesmo que estejam ao lado dos arquivos permitidos.
    entries = {}
    for relative in FILES:
        source = (root / relative).resolve(strict=True)
        if not source.is_relative_to(root) or not source.is_file():
            raise ValueError(f"Arquivo permitido fora do projeto: {relative}")
        content = source.read_bytes()
        text = content.decode("utf-8-sig")
        # As evidências dos eventos podem citar arquivos publicados pela SBC.
        # Essas URLs não são dependências locais do analisador.
        local_text = re.sub(r"https?://[^\s\"'<>]+", "", text)
        if re.search(r"openpyxl|\.xlsx\b", local_text, re.IGNORECASE):
            raise ValueError(f"Referência ao formato anterior em {relative}.")
        if source.suffix == ".json":
            json.loads(text)
        entries[relative] = content
    entries["LEIA-ME.txt"] = README.encode("utf-8")

    output.parent.mkdir(parents=True, exist_ok=True)
    temporary = None
    try:
        with tempfile.NamedTemporaryFile(dir=output.parent, suffix=".zip", delete=False) as handle:
            temporary = Path(handle.name)
        with ZipFile(temporary, "w", compression=ZIP_DEFLATED, compresslevel=9) as archive:
            for relative, content in entries.items():
                info = ZipInfo(f"Analisador-Lattes/{relative}", date_time=(1980, 1, 1, 0, 0, 0))
                info.compress_type = ZIP_DEFLATED
                info.create_system = 3
                info.external_attr = (0o100755 if relative.endswith(".sh") else 0o100644) << 16
                archive.writestr(info, content, compresslevel=9)
        with ZipFile(temporary) as archive:
            if archive.testzip() is not None:
                raise ValueError("Falha na verificação do pacote compactado.")
        temporary.replace(output)
    finally:
        if temporary is not None:
            temporary.unlink(missing_ok=True)
    print(f"Pacote criado: {output} ({len(entries)} arquivos)")


def publish_downloads(root: Path, archive: Path) -> None:
    """Publica somente o pacote completo e o guia, sem copiar pastas de trabalho."""
    destination = root / "static/downloads"
    destination.mkdir(parents=True, exist_ok=True)
    for source, name in ((archive, "analisador-lattes.zip"),
                         (root / "docs/ANALISAR_LATTES_AVULSO.md", "guia-analisar-lattes.md")):
        content = source.read_bytes()
        target = destination / name
        if target.is_file() and target.read_bytes() == content:
            continue
        temporary = None
        try:
            with tempfile.NamedTemporaryFile(dir=destination, suffix=".tmp", delete=False) as handle:
                temporary = Path(handle.name)
                handle.write(content)
            temporary.replace(target)
        finally:
            if temporary is not None:
                temporary.unlink(missing_ok=True)
    print(f"Downloads preparados: {destination}")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--output", type=Path)
    parser.add_argument("--publicar", action="store_true",
                        help="Inclui o pacote e o guia em static/downloads para distribuição com o SIA-Doce.")
    args = parser.parse_args()
    output = args.output or args.root / "distribuicao/analisador-lattes.zip"
    package(args.root, output)
    if args.publicar:
        publish_downloads(args.root, output)


if __name__ == "__main__":
    main()
