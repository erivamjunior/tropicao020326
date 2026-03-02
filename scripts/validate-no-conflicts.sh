#!/usr/bin/env bash
set -euo pipefail

if git grep -nE '^(<<<<<<<|=======|>>>>>>>)' -- . >/tmp/conflict_markers.txt; then
  echo "[ERRO] Marcadores de conflito encontrados. Resolva antes de fazer deploy."
  cat /tmp/conflict_markers.txt
  exit 1
fi

echo "[OK] Nenhum marcador de conflito encontrado."
