"""Testa a nova /fabrica: capturas em cada parada no PC e no celular, erros do console e vídeo de rolagem.

Uso (na raiz do worktree):
    python fabrica-estudio/pagina.py            # capturas PC + celular
    python fabrica-estudio/pagina.py --video    # também grava a rolagem (out/rolagem-pc.webm, out/rolagem-celular.webm)
"""
import http.server
import sys
import threading
import time
from functools import partial
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

RAIZ = Path(__file__).resolve().parent.parent
OUT = RAIZ / "fabrica-estudio" / "out"
ARGS_GPU = ["--use-angle=d3d11", "--ignore-gpu-blocklist", "--enable-gpu", "--force_high_performance_gpu"]


class Silencioso(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


def servidor():
    s = http.server.ThreadingHTTPServer(("127.0.0.1", 0), partial(Silencioso, directory=str(RAIZ)))
    threading.Thread(target=s.serve_forever, daemon=True).start()
    return s, s.server_address[1]


def ir_para(pg, seletor):
    pg.evaluate("""(sel) => { const el = document.querySelector(sel); const r = el.getBoundingClientRect();
        window.scrollTo({ top: scrollY + r.top + r.height / 2 - innerHeight / 2, behavior: 'instant' }); }""", seletor)


def rodar(nav, nome, viewport, mobile, porta, video):
    ctx_args = dict(viewport=viewport, device_scale_factor=2 if mobile else 1, is_mobile=mobile, has_touch=mobile)
    if video:
        ctx_args["record_video_dir"] = str(OUT / f"_video-{nome}")
        ctx_args["record_video_size"] = viewport
    ctx = nav.new_context(**ctx_args)
    pg = ctx.new_page()
    erros = []
    pg.on("console", lambda m: erros.append(m.text) if m.type == "error" else None)
    pg.on("pageerror", lambda e: erros.append(str(e)))
    pg.goto(f"http://127.0.0.1:{porta}/fabrica.html")
    pg.wait_for_function("window.__fabrica || document.documentElement.classList.contains('sem3d')", timeout=30000)
    print(f"[{nome}] nível:", pg.evaluate("window.__fabrica ? window.__fabrica.nivel : 'estatico'"))
    time.sleep(3.8)
    fotos = []
    alvos = ["section.hero", ".sol-cab"] + [f"[data-parada='{i}']" for i in
                                            ["estoque", "celular", "servidor", "maquininha", "auditoria", "monitor", "cyber", "switch", "prancheta", "notebook-monte"]] + [".compara", ".equipe", "#contato"]
    for k, sel in enumerate(alvos):
        if k:
            ir_para(pg, sel)
            time.sleep(2.6 if sel == "#contato" else 1.6)
        arq = OUT / f"pag-{nome}-{k:02d}.png"
        pg.screenshot(path=str(arq))
        fotos.append(arq)
    if video:  # rolagem contínua de cima a baixo
        pg.evaluate("window.scrollTo({ top: 0, behavior: 'instant' })")
        time.sleep(1.5)
        total = pg.evaluate("document.documentElement.scrollHeight - innerHeight")
        passos = 420
        for i in range(passos + 1):
            pg.evaluate(f"window.scrollTo({{ top: {total * i / passos}, behavior: 'instant' }})")
            time.sleep(0.045)
        time.sleep(1)
    ctx.close()
    if erros:
        print(f"[{nome}] ERROS:"); [print("   ", e) for e in erros[:15]]
    # prancha
    ims = [Image.open(f).convert("RGB") for f in fotos]
    larg = 480 if not mobile else 220
    ims = [im.resize((larg, int(im.height * larg / im.width)), Image.LANCZOS) for im in ims]
    col = 5
    w, h = ims[0].size
    pr = Image.new("RGB", (w * col, h * ((len(ims) + col - 1) // col)), "#000")
    for i, im in enumerate(ims):
        pr.paste(im, ((i % col) * w, (i // col) * h))
    pr.save(OUT / f"pagina-{nome}.png")
    print(f"[{nome}] prancha:", OUT / f"pagina-{nome}.png")


def main():
    video = "--video" in sys.argv
    OUT.mkdir(parents=True, exist_ok=True)
    srv, porta = servidor()
    with sync_playwright() as pw:
        nav = pw.chromium.launch(args=ARGS_GPU)
        rodar(nav, "pc", {"width": 1440, "height": 900}, False, porta, video)
        # o celular não usa 3D ao vivo (vídeos curtos): ver fabrica-estudio/celular.py
        nav.close()
    srv.shutdown()
    if video:
        for nome in ("pc", "celular"):
            vids = sorted((OUT / f"_video-{nome}").glob("*.webm"))
            if vids:
                vids[-1].replace(OUT / f"rolagem-{nome}.webm")
                print("vídeo:", OUT / f"rolagem-{nome}.webm")


if __name__ == "__main__":
    main()
