"""Captura o mostruário 3D: prancha com todos os objetos e vídeo de giro de cada um.

Uso (na raiz do worktree):
    python fabrica-estudio/capturar.py                 # prancha + vídeos de todos
    python fabrica-estudio/capturar.py notebook celular  # só alguns
    python fabrica-estudio/capturar.py --so-prancha
Saída em fabrica-estudio/out/ (não publicado). Força a GPU NVIDIA (ver memória gpu-notebook-webgl).
"""
import http.server
import shutil
import subprocess
import sys
import threading
from functools import partial
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont
from playwright.sync_api import sync_playwright

RAIZ = Path(__file__).resolve().parent.parent
OUT = RAIZ / "fabrica-estudio" / "out"
ARGS_GPU = ["--use-angle=d3d11", "--ignore-gpu-blocklist", "--enable-gpu", "--force_high_performance_gpu"]


def servidor():
    h = partial(http.server.SimpleHTTPRequestHandler, directory=str(RAIZ))
    h.log_message = lambda *a: None
    s = http.server.ThreadingHTTPServer(("127.0.0.1", 0), h)
    threading.Thread(target=s.serve_forever, daemon=True).start()
    return s, s.server_address[1]


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    so_prancha = "--so-prancha" in sys.argv
    OUT.mkdir(parents=True, exist_ok=True)
    srv, porta = servidor()
    with sync_playwright() as pw:
        nav = pw.chromium.launch(args=ARGS_GPU)
        pg = nav.new_page(viewport={"width": 960, "height": 640}, device_scale_factor=1)
        erros = []
        pg.on("console", lambda m: erros.append(m.text) if m.type == "error" else None)
        pg.on("pageerror", lambda e: erros.append(str(e)))
        pg.goto(f"http://127.0.0.1:{porta}/fabrica-estudio/mostruario.html?captura=1")
        pg.wait_for_function("window.pronto === true", timeout=30000)
        gpu = pg.evaluate("""() => { const g = document.createElement('canvas').getContext('webgl2');
            const e = g.getExtension('WEBGL_debug_renderer_info'); return e ? g.getParameter(e.UNMASKED_RENDERER_WEBGL) : '?'; }""")
        print("GPU:", gpu)
        ids = [i for i in pg.evaluate("window.objetos") if not args or i in args]
        stills = []
        for oid in ids:
            for k, (pp, giro) in enumerate([(1.0, 0.0), (0.45, -0.5), (1.0, 0.7)]):
                pg.evaluate(f"window.quadro('{oid}', {pp}, {giro}, 1.3)")
                arq = OUT / f"{oid}-{k}.png"
                pg.screenshot(path=str(arq))
                stills.append((oid, k, arq))
            if so_prancha:
                continue
            tmp = OUT / f"_{oid}"
            shutil.rmtree(tmp, ignore_errors=True); tmp.mkdir()
            n = 150  # 5 s a 30 fps: o objeto "acontece" (p 0→1) enquanto a câmera dá meia volta
            for f in range(n):
                x = f / (n - 1)
                pp = min(1.0, x / 0.8)
                pg.evaluate(f"window.quadro('{oid}', {pp}, {-0.6 + 1.2 * x}, {x * 5})")
                pg.screenshot(path=str(tmp / f"{f:04d}.png"))
            subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", "30", "-i", str(tmp / "%04d.png"),
                            "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", str(OUT / f"giro-{oid}.mp4")], check=True)
            shutil.rmtree(tmp)
            print("  vídeo:", oid)
        nav.close()
    srv.shutdown()
    if erros:
        print("ERROS NO NAVEGADOR:"); [print("  ", e) for e in erros[:20]]
    # prancha: uma linha por objeto, 3 vistas
    if stills:
        ids_ok = sorted({s[0] for s in stills}, key=[s[0] for s in stills].index)
        w, h = 480, 320
        pr = Image.new("RGB", (w * 3, h * len(ids_ok)), "#030a1c")
        for oid, k, arq in stills:
            im = Image.open(arq).convert("RGB").resize((w, h), Image.LANCZOS)
            pr.paste(im, (k * w, ids_ok.index(oid) * h))
        pr.save(OUT / ("prancha.png" if not args else f"prancha-{'-'.join(args)}.png"))
        print("prancha:", OUT / "prancha.png")


if __name__ == "__main__":
    main()
