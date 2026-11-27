"""Testa a versão de celular da /fabrica no Chrome instalado (o Chromium do Playwright não toca MP4).
Uso (na raiz do worktree): python fabrica-estudio/celular.py [url]"""
import sys
import time
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

sys.path.insert(0, str(Path(__file__).parent))
from pagina import OUT, ir_para, servidor  # noqa: E402


def main():
    srv, porta = servidor()
    url = sys.argv[1] if len(sys.argv) > 1 else f"http://127.0.0.1:{porta}/fabrica.html"
    ok = []
    with sync_playwright() as pw:
        nav = pw.chromium.launch(channel="chrome")
        ctx = nav.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=3, is_mobile=True, has_touch=True,
                              user_agent="Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Mobile Safari/537.36")
        pg = ctx.new_page()
        erros, pedidos = [], []
        pg.on("pageerror", lambda e: erros.append(str(e)))
        pg.on("request", lambda r: pedidos.append(r.url))
        pg.goto(url); time.sleep(2.5)
        fotos = []
        def foto(nome):
            arq = OUT / f"cel-{nome}.png"; pg.screenshot(path=str(arq)); fotos.append(arq)
        foto("00-abertura")
        estado = lambda sel: pg.evaluate("""(sel) => { const v = document.querySelector(sel + ' video');
            return v ? { tocando: !v.paused && v.currentTime > 0, t: +v.currentTime.toFixed(1), pronto: v.readyState } : null; }""", sel)  # noqa: E731
        e0 = estado(".hero .vitrine")
        print("  abertura:", e0); ok.append(bool(e0 and e0["tocando"]))
        for k, pid in enumerate(["estoque", "celular", "servidor", "maquininha", "auditoria", "monitor", "cyber", "switch", "prancheta"], 1):
            ir_para(pg, f"[data-parada='{pid}'] .vitrine"); time.sleep(2.2)
            e = estado(f"[data-parada='{pid}'] .vitrine")
            print(f"  {pid}:", e); ok.append(bool(e and e["tocando"] or (e and e["t"] > 0)))
            if pid in ("estoque", "servidor", "auditoria"):
                foto(f"{k:02d}-{pid}")
        ir_para(pg, ".tela2d"); time.sleep(1.8)
        foto("10-monte")
        pg.click(".modulos >> text=CRM"); pg.click(".modulos >> text=IA offline"); time.sleep(1.8)
        foto("11-monte-escolha")
        ir_para(pg, ".compara"); time.sleep(1); foto("12-compara")
        three = [u for u in pedidos if "three.module" in u]
        print("  Three.js baixado no celular:", bool(three)); ok.append(not three)
        mp4 = [u for u in pedidos if u.endswith(".mp4")]
        print("  vídeos pedidos:", len(set(mp4)))
        print("  erros:", erros[:3]); ok.append(not erros)
        nav.close()
    srv.shutdown()
    ims = [Image.open(f).convert("RGB") for f in fotos]
    ims = [im.resize((260, int(im.height * 260 / im.width))) for im in ims]
    pr = Image.new("RGB", (260 * len(ims), ims[0].height), "#000")
    for i, im in enumerate(ims):
        pr.paste(im, (i * 260, 0))
    pr.save(OUT / "celular.png")
    print("RESULTADO:", "tudo certo" if all(ok) else f"{ok.count(False)} falha(s)", "·", OUT / "celular.png")


if __name__ == "__main__":
    main()
