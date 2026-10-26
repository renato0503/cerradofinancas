"""Verifica se alguma peça tem conteúdo invadindo o rodapé ou fora da área segura do story.

Uso:
    python tools/verificar.py posts/2026-10-curso-*/carrossel.html posts/2026-10-curso-*/story.html
"""
import re
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from exportar import achar_chrome  # noqa: E402


def verificar(peca: Path):
    html = peca.read_text(encoding="utf-8")
    largura, altura = re.search(r'<meta name="formato" content="(\d+)x(\d+)"', html).groups()
    total = len(re.findall(r'class="slide[\s"]', html))
    problemas = []
    for n in range(1, total + 1):
        out = subprocess.run(
            [achar_chrome(), "--headless=new", "--disable-gpu", "--virtual-time-budget=6000",
             f"--window-size={largura},{altura}", "--dump-dom", f"{peca.resolve().as_uri()}?s={n}&check=1"],
            capture_output=True, text=True, encoding="utf-8", errors="replace").stdout
        titulo = re.search(r"<title>(.*?)</title>", out, re.S)
        resultado = titulo.group(1).strip() if titulo else "sem resultado"
        if resultado != "OK":
            problemas.append(f"  slide {n}: {resultado}")
    print(f"{'OK ' if not problemas else 'ERRO'} {peca}")
    for p in problemas:
        print(p)
    return not problemas


if __name__ == "__main__":
    pecas = [Path(a) for a in sys.argv[1:]]
    ok = all([verificar(p) for p in pecas])
    sys.exit(0 if ok else 1)
