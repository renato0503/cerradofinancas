# Recorta a logo do CerraFood (img/cerrafood.png, fundo branco opaco) para as peças de marketing.
#
# O fundo branco vira transparência por "cor para alfa" (como no GIMP): cada pixel perde o branco
# que tem, então as bordas antialiasadas ficam limpas sobre qualquer fundo. Saem dois arquivos:
#   brand/cerrafood/simbolo.png  a árvore (sem o nome), para o rodapé e os emblemas
#   brand/cerrafood/logo.png     a árvore com o nome "CerraFood", para fundos claros
#
# O nome tem "Cerra" em verde-escuro: sobre o fundo verde-mata das peças ele some, por isso
# nas peças escuras o nome é escrito em texto (Outfit) e só o símbolo vem da imagem.
#
# Uso: python tools/recortar_logo_cerrafood.py
from pathlib import Path

from PIL import Image

RAIZ = Path(__file__).resolve().parents[2]
ORIGEM = RAIZ / "img" / "cerrafood.png"
DESTINO = RAIZ / "marketing" / "brand" / "cerrafood"
CORTE_NOME = 1015  # linha (px da original) entre a árvore e o nome


def cor_para_alfa(im):
    im = im.convert("RGBA")
    dados = []
    for r, g, b, _ in im.getdata():
        a = max(255 - r, 255 - g, 255 - b)
        if a <= 6:
            dados.append((255, 255, 255, 0))
            continue
        f = 255 / a
        dados.append(tuple(max(0, min(255, round(255 - (255 - c) * f))) for c in (r, g, b)) + (a,))
    im.putdata(dados)
    return im


def main():
    DESTINO.mkdir(parents=True, exist_ok=True)
    im = cor_para_alfa(Image.open(ORIGEM))
    logo = im.crop(im.getbbox())
    logo.save(DESTINO / "logo.png")
    arvore = im.crop((0, 0, im.width, CORTE_NOME))
    arvore = arvore.crop(arvore.getbbox())
    arvore.save(DESTINO / "simbolo.png")
    print(f"logo.png {logo.size}, simbolo.png {arvore.size}")


if __name__ == "__main__":
    main()
