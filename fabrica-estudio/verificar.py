"""Verificação F4 da /fabrica: navegadores, fluidez (GPU NVIDIA, Intel e celular lento), reduzir movimento e links.
Uso (na raiz do worktree): python fabrica-estudio/verificar.py"""
import re
import sys
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

sys.path.insert(0, str(Path(__file__).parent))
from pagina import ARGS_GPU, OUT, RAIZ, servidor  # noqa: E402

res = []


def confere(nome, cond, extra=""):
    res.append(cond)
    print(("  OK   " if cond else "  FALHA") + f" {nome} {extra}")


MEDIR_FPS = """async (ms) => {
  const total = document.documentElement.scrollHeight - innerHeight; const t0 = performance.now(); const quadros = [];
  let ult = t0;
  await new Promise((fim) => { function q(agora) { quadros.push(agora - ult); ult = agora;
      window.scrollTo(0, total * Math.min(1, (agora - t0) / ms));
      if (agora - t0 < ms) requestAnimationFrame(q); else fim(); } requestAnimationFrame(q); });
  quadros.sort((a, b) => a - b);
  const media = quadros.reduce((a, b) => a + b, 0) / quadros.length;
  return { fps: Math.round(1000 / media), p95: Math.round(quadros[Math.floor(quadros.length * 0.95)]) };
}"""


def main():
    srv, porta = servidor()
    url = f"http://127.0.0.1:{porta}/fabrica.html"
    with sync_playwright() as pw:
        # 1. navegadores
        for nome, tipo in (("Chromium", pw.chromium), ("Firefox", pw.firefox), ("WebKit (Safari)", pw.webkit)):
            try:
                nav = tipo.launch()
            except Exception as e:
                print(f"  --   {nome}: não instalado ({str(e).splitlines()[0][:60]})"); continue
            for vp, rot in (({"width": 1440, "height": 900}, "PC"), ({"width": 390, "height": 844}, "celular")):
                pg = nav.new_page(viewport=vp)
                erros = []
                pg.on("pageerror", lambda e: erros.append(str(e)))
                pg.goto(url)
                try:
                    pg.wait_for_function("document.documentElement.classList.contains('com3d') || document.documentElement.classList.contains('sem3d')", timeout=25000)
                except Exception:
                    pg.mouse.wheel(0, 400); time.sleep(1)  # no celular o 3D espera o primeiro gesto
                    try:
                        pg.wait_for_function("document.documentElement.classList.contains('com3d') || document.documentElement.classList.contains('sem3d')", timeout=25000)
                    except Exception:
                        pass
                estado = pg.evaluate("document.documentElement.classList.contains('com3d') ? '3D' : document.documentElement.classList.contains('sem3d') ? 'sem 3D' : 'carregando'")
                pg.evaluate("document.querySelector('#monte').scrollIntoView()"); time.sleep(1.5)
                pg.screenshot(path=str(OUT / f"nav-{nome.split()[0].lower()}-{rot}.png"))
                confere(f"{nome} · {rot}", not erros and estado != "carregando", f"({estado}{'; ' + erros[0][:80] if erros else ''})")
                pg.close()
            nav.close()

        # 2. fluidez da rolagem
        casos = [("GPU NVIDIA · PC", ARGS_GPU, {"width": 1440, "height": 900}, 1, False),
                 ("sem placa de vídeo (software) · PC", [], {"width": 1440, "height": 900}, 1, False),
                 ("celular lento (CPU 4x) · NVIDIA", ARGS_GPU, {"width": 390, "height": 844}, 4, True)]
        for nome, args, vp, cpu, movel in casos:
            nav = pw.chromium.launch(args=args)
            ctx = nav.new_context(viewport=vp, is_mobile=movel, has_touch=movel, device_scale_factor=2 if movel else 1)
            pg = ctx.new_page()
            pg.goto(url)
            if movel:
                time.sleep(0.5); pg.mouse.wheel(0, 10)
            pg.wait_for_function("window.__fabrica", timeout=30000)
            gpu = pg.evaluate("""() => { const g = document.createElement('canvas').getContext('webgl2'); const e = g && g.getExtension('WEBGL_debug_renderer_info');
                return e ? g.getParameter(e.UNMASKED_RENDERER_WEBGL) : '?'; }""")
            if cpu > 1:
                cdp = ctx.new_cdp_session(pg); cdp.send("Emulation.setCPUThrottlingRate", {"rate": cpu})
            time.sleep(3.6)
            m = pg.evaluate(MEDIR_FPS, 12000)
            confere(f"fluidez · {nome}", m["fps"] >= 30, f"({m['fps']} fps, 95% dos quadros em até {m['p95']} ms · {gpu.split('(')[1].split(',')[1].strip() if '(' in gpu else gpu})")
            nav.close()

        # 3. reduzir movimento
        nav = pw.chromium.launch(args=ARGS_GPU)
        ctx = nav.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce")
        pg = ctx.new_page(); pg.goto(url); time.sleep(1.5)
        confere("reduzir movimento → versão estática", pg.evaluate("document.documentElement.classList.contains('sem3d')"))
        pg.screenshot(path=str(OUT / "reduzir-movimento.png"))
        nav.close()
    srv.shutdown()

    # 4. links internos
    html = (RAIZ / "fabrica.html").read_text(encoding="utf-8")
    faltando = []
    for alvo in set(re.findall(r'(?:href|src)="([^"#:][^"]*)"', html)):
        if ":" in alvo:
            continue  # externos (WhatsApp, LinkedIn, e-mail, canonical)
        caminho = alvo.split("?")[0].lstrip("/")
        if caminho and not (RAIZ / caminho).exists() and not (RAIZ / (caminho + ".html")).exists():
            faltando.append(alvo)
    ancoras = set(re.findall(r'href="#([^"]+)"', html)); ids = set(re.findall(r'id="([^"]+)"', html))
    confere("links e arquivos existem", not faltando, str(faltando))
    confere("âncoras apontam para seções que existem", ancoras <= ids, str(ancoras - ids))
    print("RESULTADO:", "tudo certo" if all(res) else f"{res.count(False)} falha(s)")


if __name__ == "__main__":
    main()
