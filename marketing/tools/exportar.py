"""Exporta peças HTML (posts, carrosséis, stories) para PNG com o Chrome headless.

Uso:
    python tools/exportar.py posts/2026-10-lancamento-4-frentes/carrossel.html
    python tools/exportar.py stories/2026-10-lancamento-4-frentes.html

Cada peça declara o tamanho em <meta name="formato" content="1080x1350"> e
cada slide é um elemento com class="slide". O arquivo é aberto com ?s=N e o
CSS da peça mostra só o slide N. Os PNGs saem em <pasta da peça>/out/.
"""
import re
import subprocess
import sys
from pathlib import Path

CHROMES = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
]


def achar_chrome():
    for c in CHROMES:
        if Path(c).exists():
            return c
    sys.exit("Chrome ou Edge não encontrado.")


def exportar(peca: Path):
    html = peca.read_text(encoding="utf-8")
    formato = re.search(r'<meta name="formato" content="(\d+)x(\d+)"', html)
    if not formato:
        sys.exit(f'{peca}: falta <meta name="formato" content="LARGURAxALTURA">')
    largura, altura = formato.groups()
    total = len(re.findall(r'class="slide[\s"]', html))
    if total == 0:
        sys.exit(f'{peca}: nenhum elemento com class="slide"')

    saida = peca.resolve().parent / "out"
    saida.mkdir(exist_ok=True)
    chrome = achar_chrome()
    url_base = peca.resolve().as_uri()

    for n in range(1, total + 1):
        sufixo = f"-{n:02d}" if total > 1 else ""
        png = saida / f"{peca.stem}{sufixo}.png"
        subprocess.run(
            [
                chrome, "--headless=new", "--disable-gpu", "--hide-scrollbars",
                "--force-device-scale-factor=1", "--virtual-time-budget=6000",
                f"--window-size={largura},{altura}",
                f"--screenshot={png}", f"{url_base}?s={n}",
            ],
            check=True, capture_output=True,
        )
        if not png.exists():
            sys.exit(f"Falha ao gerar {png}")
        print(f"  {png.relative_to(saida.parent.parent)}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    for arg in sys.argv[1:]:
        print(arg)
        exportar(Path(arg))
