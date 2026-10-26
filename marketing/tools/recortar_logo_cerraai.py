# Recorta o fundo da logo do Cerra.AI (img/logo_cerraai.png) e devolve uma versão
# com transparência, para usar nas peças de marketing e no app de vídeo.
#
# A logo original é um quadro escuro com a marca em dourado e verde-escuro. Como o
# fundo é opaco, a marca precisa ser isolada do fundo (flood fill a partir das
# bordas) antes de entrar nas peças, senão aparece um retângulo preto no post.
#
# Uso: python tools/recortar_logo_cerraai.py
from collections import deque
from pathlib import Path

from PIL import Image

RAIZ = Path(__file__).resolve().parents[2]
ORIGEM = RAIZ / "img" / "logo_cerraai.png"
DESTINO = RAIZ / "img" / "logo_cerraai-icone.png"
COPIA_VIDEO = RAIZ / "marketing" / "videos" / "public" / "cerraai.png"

# pixel do fundo: escuro e quase neutro (maximo dos canais abaixo de 70)
LIMITE = 70


def main():
    im = Image.open(ORIGEM).convert("RGBA")
    w, h = im.size
    px = im.load()

    def escuro(x, y):
        r, g, b, _ = px[x, y]
        return max(r, g, b) < LIMITE and abs(r - g) < 26 and abs(g - b) < 26

    # flood fill a partir das bordas: so o fundo contiguo chega aqui
    visitados = bytearray(w * h)
    fila = deque()
    for x in range(w):
        for y in (0, h - 1):
            if escuro(x, y) and not visitados[y * w + x]:
                visitados[y * w + x] = 1
                fila.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            if escuro(x, y) and not visitados[y * w + x]:
                visitados[y * w + x] = 1
                fila.append((x, y))

    while fila:
        x, y = fila.popleft()
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and not visitados[ny * w + nx] and escuro(nx, ny):
                visitados[ny * w + nx] = 1
                fila.append((nx, ny))

    dados = list(im.getdata())
    for y in range(h):
        for x in range(w):
            if visitados[y * w + x]:
                i = y * w + x
                r, g, b, _ = dados[i]
                dados[i] = (r, g, b, 0)
    im.putdata(dados)

    # apara a borda transparente
    caixa = im.getbbox()
    if caixa:
        im = im.crop(caixa)

    im.save(DESTINO)
    print(f"{DESTINO.name}: {im.size[0]}x{im.size[1]}")

    COPIA_VIDEO.parent.mkdir(parents=True, exist_ok=True)
    im.save(COPIA_VIDEO)
    print(f"{COPIA_VIDEO.relative_to(RAIZ)} atualizado")


if __name__ == "__main__":
    main()
