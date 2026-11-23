"""Stills 3D para os folders: quadros das cenas Three.js dos filmes das frentes, sem texto e com fundo transparente.

Abre filmes/frente-<cena>/16x9/index.html no Chromium (servido por rota local), troca o palco por um com
alpha e pixel ratio 2, esconde os planos de texto, posiciona a cena no tempo t e recorta o objeto.

    python tools/gerar_stills3d.py            # todos
    python tools/gerar_stills3d.py credito    # só uma frente

Saída: conteudo/2026-11-formatos/img/3d-<slug>-<n>.png (usada pelo gerar_formatos.py).
Pré-requisito: filmes/frente-*/16x9 montados (npm run montar:frentes, em filmes/).
"""
import io
import mimetypes
import sys
from pathlib import Path

from PIL import Image

RAIZ = Path(__file__).resolve().parents[1]
FILMES = RAIZ / "filmes"
SAIDA = RAIZ / "conteudo" / "2026-11-formatos" / "img"
GSAP = RAIZ / "palestras" / "2026-10-palestra-carreira-ia" / "apresentacao" / "vendor" / "gsap.min.js"

# slug do folder -> [(cena do filme, tempo em segundos[, corte à esquerda]), ...]  (1 = capa, 2 = miolo)
STILLS = {
    "institucional": [("tech", 10.5), ("tech", 18.5)],
    "tech": [("tech", 15.5), ("tech", 22.5)],
    "cerraai": [("cerraai", 4.5), ("cerraai", 12.5)],
    "cerraclass": [("cerraclass", 10.5), ("cerraclass", 22.5)],
    "credito": [("credito", 26.5), ("credito", 10.5)],
    "contabilidade": [("contabilidade", 24.6), ("contabilidade", 22.2, 0.47)],
    "consultorias": [("consultoria", 26.5), ("consultoria", 6.5)],
    "guiacademico": [("guiacademico", 10.5), ("guiacademico", 14.5)],
    "cerrafood": [("cerrafood", 8.5), ("cerrafood", 12.5)],
}

CSS = """html, body, #root { background: transparent !important; }
#root > *:not(#tela) { visibility: hidden !important; }"""


def patch_palco(js: str) -> str:
    js = js.replace("alpha: false", "alpha: true, premultipliedAlpha: false")
    js = js.replace("renderer.setPixelRatio(1);", "renderer.setPixelRatio(2); renderer.setClearColor(0x000000, 0);")
    js = js.replace("render: () => renderer.render(cena, camera)",
                    "render: () => { const bg = cena.background; cena.background = null; renderer.render(cena, camera); cena.background = bg; }")
    return js


def recortar(png: bytes, destino: Path, margem=0.04, lado_max=1900, esq=0.40):
    im = Image.open(io.BytesIO(png)).convert("RGBA")
    # no 16:9 a cena fica à direita (a coluna da esquerda é do texto): só essa área entra
    im = im.crop((int(im.width * esq), 0, im.width, im.height))
    a = im.getchannel("A").point(lambda v: 255 if v > 14 else 0)
    box = a.getbbox()
    if not box:
        raise RuntimeError(f"quadro vazio: {destino.name}")
    w, h = box[2] - box[0], box[3] - box[1]
    m = int(max(w, h) * margem)
    box = (max(0, box[0] - m), max(0, box[1] - m), min(im.width, box[2] + m), min(im.height, box[3] + m))
    im = im.crop(box)
    if max(im.size) > lado_max:
        r = lado_max / max(im.size)
        im = im.resize((round(im.width * r), round(im.height * r)), Image.LANCZOS)
    im.save(destino, optimize=True)
    return im.size


def main():
    from playwright.sync_api import sync_playwright
    alvo = [s for s in sys.argv[1:]] or list(STILLS)
    SAIDA.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(args=["--ignore-gpu-blocklist", "--enable-unsafe-swiftshader"])
        for slug in alvo:
            for n, (cena, t, *esq) in enumerate(STILLS[slug], 1):
                pasta = FILMES / f"frente-{cena}" / "16x9"

                def rota(route, *_, pasta=pasta):
                    if "jsdelivr" in route.request.url and "gsap" in route.request.url:
                        return route.fulfill(status=200, body=GSAP.read_bytes(), headers={"Content-Type": "text/javascript"})
                    if not route.request.url.startswith("http://f.local/"):
                        return route.fulfill(status=404, body="")
                    rel = route.request.url.split("http://f.local/", 1)[1].split("?")[0]
                    arq = pasta / rel
                    if not arq.is_file():
                        return route.fulfill(status=404, body="")
                    corpo = arq.read_bytes()
                    if arq.name == "palco3d.js":
                        corpo = patch_palco(corpo.decode("utf-8")).encode("utf-8")
                    tipo = mimetypes.guess_type(arq.name)[0] or "application/octet-stream"
                    if arq.suffix in (".js", ".mjs"):
                        tipo = "text/javascript"
                    route.fulfill(status=200, body=corpo, headers={"Content-Type": tipo})

                page = browser.new_page(viewport={"width": 1920, "height": 1080})
                page.route("**/*", rota)
                page.goto("http://f.local/index.html", wait_until="domcontentloaded")
                page.add_style_tag(content=CSS)
                page.wait_for_function("window.__hf && window.__hf.buildReady && window.__hf.buildReady.tres")
                url = page.evaluate("""async (t) => {
                    await window.__hf.buildReady.tres;
                    // esconde chão e papel (planos enormes); a sombra (ShadowMaterial) fica
                    const { cena } = window.__palco;
                    const chaos = [];
                    cena.traverse(o => { if (o.isMesh && o.geometry.type === 'PlaneGeometry' && !o.material.isShadowMaterial) {
                      const p = o.geometry.parameters; if (Math.max(p.width, p.height) >= 12) chaos.push(o); }
                      if (o.type === 'GridHelper') chaos.push(o); });
                    window.dispatchEvent(new CustomEvent('hf-seek', { detail: { time: t } }));
                    chaos.forEach(o => (o.visible = false));
                    cena.fog = null;
                    window.dispatchEvent(new CustomEvent('hf-seek', { detail: { time: t } }));
                    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
                    return document.getElementById('tela').toDataURL('image/png');
                }""", t)
                import base64
                png = base64.b64decode(url.split(",", 1)[1])
                destino = SAIDA / f"3d-{slug}-{n}.png"
                tam = recortar(png, destino, esq=esq[0] if esq else 0.40)
                print(f"{destino.name}: {cena} t={t} -> {tam[0]}x{tam[1]}")
                page.close()
        browser.close()


if __name__ == "__main__":
    main()
