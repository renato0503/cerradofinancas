"""Gera as imagens estáticas dos objetos (versão sem 3D) e a imagem de compartilhamento (og-fabrica.jpg).

Uso (na raiz do worktree): python fabrica-estudio/stills.py
Saída: assets/fabrica/stills/<id>.webp (800 x 533) e assets/fabrica/og-fabrica.jpg (1200 x 630).
"""
import io
import sys
import time
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

sys.path.insert(0, str(Path(__file__).parent))
from pagina import ARGS_GPU, servidor  # noqa: E402

RAIZ = Path(__file__).resolve().parent.parent
DEST = RAIZ / "assets" / "fabrica" / "stills"


def main():
    DEST.mkdir(parents=True, exist_ok=True)
    srv, porta = servidor()
    with sync_playwright() as pw:
        nav = pw.chromium.launch(args=ARGS_GPU)
        pg = nav.new_page(viewport={"width": 1200, "height": 800})
        pg.goto(f"http://127.0.0.1:{porta}/fabrica-estudio/mostruario.html?captura=1")
        pg.wait_for_function("window.pronto === true", timeout=30000)
        pg.add_style_tag(content=".rot{display:none}")
        for oid in pg.evaluate("window.objetos"):
            pg.evaluate(f"window.quadro('{oid}', 1, 0, 1.3)")
            im = Image.open(io.BytesIO(pg.screenshot())).convert("RGB").resize((800, 533), Image.LANCZOS)
            im.save(DEST / f"{oid}.webp", quality=78, method=6)
            print(f"  {oid}.webp: {(DEST / f'{oid}.webp').stat().st_size // 1024} KB")
        # imagem de compartilhamento: a abertura da página depois da animação
        pg2 = nav.new_page(viewport={"width": 1200, "height": 630})
        pg2.goto(f"http://127.0.0.1:{porta}/fabrica.html")
        pg2.wait_for_function("window.__fabrica")
        time.sleep(4.2)
        pg2.add_style_tag(content=".rolar,.lead,.selos,.acoes{display:none!important}")
        time.sleep(0.3)
        im = Image.open(io.BytesIO(pg2.screenshot())).convert("RGB")
        im.save(RAIZ / "assets" / "fabrica" / "og-fabrica.jpg", quality=84, optimize=True, progressive=True)
        print("  og-fabrica.jpg:", (RAIZ / "assets" / "fabrica" / "og-fabrica.jpg").stat().st_size // 1024, "KB")
        nav.close()
    srv.shutdown()


if __name__ == "__main__":
    main()
