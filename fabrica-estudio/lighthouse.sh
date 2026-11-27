#!/usr/bin/env bash
# Lighthouse da /fabrica (celular e PC) contra o servidor com gzip (fabrica-estudio/servidor_gzip.py 8091).
# Uso: bash fabrica-estudio/lighthouse.sh
set -e
OUT="$(dirname "$0")/out"
mkdir -p "$OUT"
export CHROME_PATH="${CHROME_PATH:-$(python -c "from playwright.sync_api import sync_playwright as s; p=s().start(); print(p.chromium.executable_path); p.stop()" 2>/dev/null)}"
URL="${1:-http://127.0.0.1:8091/fabrica.html}"
for modo in celular pc; do
  extra=""; [ "$modo" = pc ] && extra="--preset=desktop"
  npx -y lighthouse@12.2.1 "$URL" --quiet $extra --chrome-flags="--headless=new --use-angle=d3d11 --enable-gpu --ignore-gpu-blocklist --force_high_performance_gpu" \
    --only-categories=performance,accessibility,best-practices,seo --output=json --output=html --output-path="$OUT/lh-$modo" >/dev/null 2>&1
  python - "$OUT/lh-$modo.report.json" "$modo" <<'PY'
import json, sys
d = json.load(open(sys.argv[1], encoding="utf-8")); a = d["audits"]
print(sys.argv[2].upper(), {k: round(v["score"] * 100) for k, v in d["categories"].items()})
for k in ["first-contentful-paint", "largest-contentful-paint", "total-blocking-time", "cumulative-layout-shift", "speed-index", "total-byte-weight"]:
    print("   ", k, a[k]["displayValue"])
PY
done
