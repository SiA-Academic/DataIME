#!/usr/bin/env bash
# macOS/Linux: o PDF relativo deve ficar junto deste script.
set -euo pipefail

usage() {
  cat <<'EOF'
SiADoce - análise de um currículo Lattes

Uso: bash analisar-lattes.sh walner.pdf -Inicio 2022 -Fim 2026

Coloque o PDF na mesma pasta do script ou informe o caminho completo.
Use aspas para nomes com espaços: "curriculo do docente.pdf".
Sem -Inicio/-Fim, usa a janela da base ou, na ausência dela, os últimos cinco anos.

Opções: -Nome "Nome do docente"  -NaoAbrirPasta  -PythonPath /caminho/python3
Ajuda:  bash analisar-lattes.sh --help

Requisitos: Python 3.10+, PowerShell 7 (pwsh) e pdftotext.
Preparo: docs/ANALISAR_LATTES_AVULSO.md
Resultado: analises-avulsas/<execução>/analise-lattes.json
Abra esse JSON no SiADoce, em Produção docente > Analisar outro currículo.
EOF
}

if (( $# == 0 )); then
  usage >&2
  exit 2
fi
case "$1" in
  -h|--help|-Ajuda) usage; exit 0 ;;
esac

script_dir="$(CDPATH= cd -- "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
if [[ ! -f "$script_dir/analisar-lattes.ps1" ]]; then
  printf '%s\n' 'Pacote incompleto: analisar-lattes.ps1 deve estar junto deste script.' >&2
  exit 1
fi

powershell_command="${SIADOCE_POWERSHELL:-pwsh}"
if ! command -v "$powershell_command" >/dev/null 2>&1; then
  printf '%s\n' 'PowerShell 7 (pwsh) não encontrado.' \
    'Instale as dependências conforme docs/ANALISAR_LATTES_AVULSO.md e tente novamente.' >&2
  exit 1
fi

# Cada argumento segue separado, inclusive nomes com espaços ou acentos.
# O wrapper comum preserva extração, classificação, validações e resultados.
exec "$powershell_command" -NoLogo -NoProfile -File "$script_dir/analisar-lattes.ps1" "$@"
