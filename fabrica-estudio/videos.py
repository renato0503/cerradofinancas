"""Grava os vídeos curtos da versão de celular da /fabrica, a partir do mostruário 3D (mesmos objetos do PC).

Cada vídeo: o objeto "acontece" (animação p 0 → 1) enquanto a câmera gira de leve, e segura o final.
Saída em assets/fabrica/videos/: <id>.mp4 (H.264, 720 x 540), <id>-ini.webp (primeiro quadro) e <id>-fim.webp (último).

Uso (na raiz do worktree): python fabrica-estudio/videos.py [ids...]
"""
import io
import shutil
import subprocess
import sys
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

sys.path.insert(0, str(Path(__file__).parent))
from pagina import ARGS_GPU, servidor  # noqa: E402

RAIZ = Path(__file__).resolve().parent.parent
DEST = RAIZ / "assets" / "fabrica" / "videos"
TMP = RAIZ / "fabrica-estudio" / "out" / "_frames"
FUNDO = "#07132e"   # igual ao painel de mídia do celular (fabrica.css → --painel)
FPS, DUR, DUR_ANIM = 30, 4.6, 3.2


def suave(x):
    return x * x * (3 - 2 * x)


def main():
    ids_pedidos = [a for a in sys.argv[1:] if not a.startswith("--")]
    DEST.mkdir(parents=True, exist_ok=True)
    srv, porta = servidor()
    with sync_playwright() as pw:
        nav = pw.chromium.launch(args=ARGS_GPU)
        pg = nav.new_page(viewport={"width": 960, "height": 720})
        pg.goto(f"http://127.0.0.1:{porta}/fabrica-estudio/mostruario.html?captura=1&folga=0.8")
        pg.wait_for_function("window.pronto === true", timeout=30000)
        pg.add_style_tag(content=f".rot{{display:none}} html,body{{background:{FUNDO}!important}}")
        for oid in [i for i in pg.evaluate("window.objetos") if not ids_pedidos or i in ids_pedidos]:
            shutil.rmtree(TMP, ignore_errors=True); TMP.mkdir(parents=True)
            n = int(FPS * DUR)
            for f in range(n):
                t = f / FPS
                p = min(1.0, t / DUR_ANIM)
                giro = -0.38 + 0.55 * suave(min(1.0, t / DUR))
                pg.evaluate(f"window.quadro('{oid}', {p}, {giro}, {t})")
                Image.open(io.BytesIO(pg.screenshot(type="png"))).convert("RGB").resize((720, 540), Image.LANCZOS).save(TMP / f"{f:04d}.png")
            subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(FPS), "-i", str(TMP / "%04d.png"),
                            "-c:v", "libx264", "-preset", "slow", "-crf", "27", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
                            "-profile:v", "main", str(DEST / f"{oid}.mp4")], check=True)
            Image.open(TMP / "0000.png").save(DEST / f"{oid}-ini.webp", quality=72, method=6)
            Image.open(TMP / f"{n - 1:04d}.png").save(DEST / f"{oid}-fim.webp", quality=76, method=6)
            kb = lambda p: (DEST / p).stat().st_size // 1024  # noqa: E731
            print(f"  {oid}: mp4 {kb(oid + '.mp4')} KB · pôsteres {kb(oid + '-ini.webp')} + {kb(oid + '-fim.webp')} KB")
        nav.close()
    srv.shutdown()
    shutil.rmtree(TMP, ignore_errors=True)


if __name__ == "__main__":
    main()
