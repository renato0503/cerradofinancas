#!/bin/bash
# Renderiza os filmes 3D das frentes (16:9 e 9:16) em out/frente-<slug>-<formato>.mp4, sem áudio, crf 24.
# Uso: bash ferramentas/render-frentes.sh [slug ...]   (sem argumento: as 8 frentes)
cd "$(dirname "$0")/.." || exit 1
export HYPERFRAMES_NO_TELEMETRY=1
node ferramentas/montar-frentes.mjs "$@" >/dev/null
slugs=${@:-cerraai tech cerraclass guiacademico cerrafood contabilidade credito consultoria}
mkdir -p out
for s in $slugs; do for f in 16x9 9x16; do
  ini=$(date +%s)
  (cd frente-$s/$f && npx hyperframes render --crf 24 --quiet -o ../../out/frente-$s-$f.mp4 . >/dev/null 2>&1)
  echo "frente-$s-$f: $(( $(date +%s) - ini ))s $( [ -f out/frente-$s-$f.mp4 ] && du -h out/frente-$s-$f.mp4 | cut -f1 || echo FALHOU)"
done; done
