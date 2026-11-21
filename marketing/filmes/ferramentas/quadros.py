"""Tira quadros de um filme de frente sem renderizar o vídeo: python ferramentas/quadros.py <slug> <formato> <t1,t2,...> <saida.png>"""
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from checar_texto3d import RAIZ, abrir  # noqa: E402

slug, fmt, tempos, saida = sys.argv[1], sys.argv[2], [float(x) for x in sys.argv[3].split(",")], Path(sys.argv[4])
from playwright.sync_api import sync_playwright  # noqa: E402
from PIL import Image  # noqa: E402
import io  # noqa: E402
w, h = (1920, 1080) if fmt == "16x9" else (1080, 1920)
with sync_playwright() as p:
    b = p.chromium.launch(args=["--ignore-gpu-blocklist", "--enable-unsafe-swiftshader"])
    page = abrir(b, RAIZ / f"frente-{slug}" / fmt, w, h)
    ims = []
    for t in tempos:
        page.evaluate("""(t) => { const tl = window.__timelines.main; tl.seek(t, false);
          for (const el of document.querySelectorAll('#root [data-start]')) { if (el.id === 'tela') continue;
            const a = +el.dataset.start, f = a + +(el.dataset.duration || 1e9); el.style.visibility = (t >= a && t < f) ? '' : 'hidden'; }
          window.dispatchEvent(new CustomEvent('hf-seek', { detail: { time: t } })); }""", t)
        page.wait_for_timeout(50)
        im = Image.open(io.BytesIO(page.screenshot())).convert("RGB")
        ims.append(im.resize((w // 2, h // 2)))
    b.close()
cols = min(len(ims), 4 if fmt == "16x9" else 6)
rows = (len(ims) + cols - 1) // cols
folha = Image.new("RGB", (cols * w // 2, rows * h // 2), "white")
for i, im in enumerate(ims):
    folha.paste(im, ((i % cols) * w // 2, (i // cols) * h // 2))
folha.save(saida)
print(saida)
