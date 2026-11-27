"""Testa as interações da /fabrica: Monte o seu sistema, arrastar para girar, clicar no objeto e a versão sem 3D."""
import sys
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

sys.path.insert(0, str(Path(__file__).parent))
from pagina import ARGS_GPU, OUT, ir_para, servidor  # noqa: E402

ok = []


def confere(nome, cond, extra=""):
    ok.append(cond)
    print(("  OK   " if cond else "  FALHA") + f" {nome} {extra}")


def main():
    srv, porta = servidor()
    base = f"http://127.0.0.1:{porta}/fabrica.html"
    with sync_playwright() as pw:
        nav = pw.chromium.launch(args=ARGS_GPU)
        pg = nav.new_page(viewport={"width": 1440, "height": 900})
        erros = []
        pg.on("pageerror", lambda e: erros.append(str(e)) if "Transition was skipped" not in str(e) else None)
        pg.goto(base); pg.wait_for_function("window.__fabrica"); time.sleep(1)

        # 1. Monte o seu sistema
        ir_para(pg, "#monte"); time.sleep(1.8)
        pg.click(".modulos >> text=Vendas"); pg.click(".modulos >> text=CRM"); pg.click(".modulos >> text=IA offline"); time.sleep(0.8)
        href = pg.get_attribute("#monte-whats", "href")
        campo = pg.input_value("#form-modulos")
        confere("link do WhatsApp com os módulos", "CRM" in href and "Cerra.AI" in href and "Vendas" not in href, f"({campo})")
        pg.screenshot(path=str(OUT / "int-monte.png"))

        # 2. arrastar para girar (no servidor)
        ir_para(pg, "[data-parada='servidor']"); pg.mouse.move(1100, 500); time.sleep(2)
        antes = pg.evaluate("window.__fabrica.palco.camera.position.toArray()")
        pg.mouse.move(1100, 500); pg.mouse.down(); pg.mouse.move(900, 500, steps=12); time.sleep(0.6)
        meio = pg.evaluate("window.__fabrica.palco.camera.position.toArray()")
        pg.screenshot(path=str(OUT / "int-giro.png"))
        pg.mouse.up(); pg.mouse.move(1100, 500); time.sleep(3)
        depois = pg.evaluate("window.__fabrica.palco.camera.position.toArray()")
        dist = lambda a, b: sum((x - y) ** 2 for x, y in zip(a, b)) ** 0.5  # noqa: E731
        confere("arrastar gira a câmera", dist(antes, meio) > 0.2, f"(deslocou {dist(antes, meio):.2f} m)")
        confere("soltar volta ao lugar", dist(antes, depois) < 0.05, f"(sobra {dist(antes, depois):.3f} m)")

        # 3. clicar no objeto abre o serviço (estoque → ERP)
        ir_para(pg, "[data-parada='estoque']"); time.sleep(2)
        xy = pg.evaluate("""() => { const f = window.__fabrica, THREE_ = f.palco.camera.constructor;
            const g = f.esc.paradas.estoque.inst.grupo; const v = g.getWorldPosition(g.position.clone());
            v.y += 0.6; v.project(f.palco.camera); return [(v.x + 1) / 2 * innerWidth, (1 - v.y) / 2 * innerHeight]; }""")
        print("   ponto", [round(v) for v in xy], pg.evaluate(f"document.elementFromPoint({xy[0]},{xy[1]}).className"), pg.evaluate(f"window.__fabrica.atual()"), pg.evaluate(f"!!window.__fabrica.objetoSob({xy[0]},{xy[1]})"))
        pg.mouse.click(xy[0], xy[1])
        try:
            pg.wait_for_url("**/erp-customizado.html", timeout=10000)
        except Exception:
            pass
        confere("clique no objeto abre a página do serviço", pg.url.endswith("erp-customizado.html"), f"({pg.url.split('/')[-1]})")
        confere("sem erros de JavaScript", not erros, str(erros[:3]))

        # 4. versão sem 3D
        pg3 = nav.new_page(viewport={"width": 1440, "height": 900})
        pg3.goto(base + "?nivel=estatico"); time.sleep(1.5)
        confere("versão sem 3D marca a página", pg3.evaluate("document.documentElement.classList.contains('sem3d')"))
        visiveis = pg3.evaluate("[...document.querySelectorAll('.still')].filter(i => getComputedStyle(i).display !== 'none').length")
        confere("imagens dos objetos aparecem sem 3D", visiveis == 10, f"({visiveis})")
        pg3.screenshot(path=str(OUT / "int-estatico.png"))
        pg3.evaluate("document.querySelector('#erp').scrollIntoView()"); time.sleep(1)
        pg3.screenshot(path=str(OUT / "int-estatico-2.png"))
        nav.close()
    srv.shutdown()
    print("RESULTADO:", "tudo certo" if all(ok) else f"{ok.count(False)} falha(s)")


if __name__ == "__main__":
    main()
