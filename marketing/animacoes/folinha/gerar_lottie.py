"""Gera as animações Lottie da folinha (logo da Cerrado Finanças & Tech).

Filosofia (skill wiggle): marca de finanças + tecnologia → confiança com crescimento.
Metáfora: folha que brota. Entrada que sobe, gira até o lugar e assenta com um leve
excesso; loop de respiração calma. Nada linear.

Saídas (em marketing/entregas/folinha-animada/):
  folinha-entrada.json   1,5s, entra e para
  folinha-loop.json      3s, loop contínuo sem emenda

Uso:
    python animacoes/folinha/gerar_lottie.py
"""
import base64
import io
import json
from pathlib import Path

from PIL import Image

RAIZ = Path(__file__).resolve().parents[3]          # repositório do site
SAIDA = RAIZ / "marketing" / "entregas" / "folinha-animada"
FPS = 60
TELA = 512
LADO_FOLHA = 360                                     # maior lado da folha na tela

# Curvas (bezier x1/y1 x2/y2), como na tabela da skill wiggle
EASE_OUT = ((0.16, 1.0), (0.3, 1.0))                 # entrada confiante, sem tranco
EASE_INOUT = ((0.42, 0.0), (0.58, 1.0))              # padrão corporativo
EASE_SUAVE = ((0.37, 0.0), (0.63, 1.0))              # respiração do loop


def imagem_embutida():
    folha = Image.open(RAIZ / "img" / "folinha-hero.png").convert("RGBA")
    folha.thumbnail((LADO_FOLHA, LADO_FOLHA), Image.LANCZOS)
    buf = io.BytesIO()
    folha.save(buf, "PNG", optimize=True)
    dados = base64.b64encode(buf.getvalue()).decode()
    return folha.size, {"id": "folha", "w": folha.width, "h": folha.height, "u": "",
                        "p": f"data:image/png;base64,{dados}", "e": 1}


def anim(keys, dims):
    """keys: lista de (frame, valor, curva_saida). Valor escalar ou lista."""
    k = []
    for i, (t, v, curva) in enumerate(keys):
        s = v if isinstance(v, list) else [v]
        kf = {"t": t, "s": s}
        if i < len(keys) - 1:
            (ox, oy), (ix, iy) = curva
            kf["o"] = {"x": [ox] * dims, "y": [oy] * dims}
            kf["i"] = {"x": [ix] * dims, "y": [iy] * dims}
        k.append(kf)
    return {"a": 1, "k": k}


def fixo(v):
    return {"a": 0, "k": v}


def documento(nome, duracao, transform, tamanho, asset):
    w, h = tamanho
    camada = {
        "ddd": 0, "ind": 1, "ty": 2, "nm": "folha", "refId": "folha",
        "sr": 1, "ip": 0, "op": duracao, "st": 0, "bm": 0,
        "ks": {"a": fixo([w / 2, h / 2, 0]), **transform},
    }
    return {"v": "5.7.4", "fr": FPS, "ip": 0, "op": duracao, "w": TELA, "h": TELA,
            "nm": nome, "ddd": 0, "assets": [asset], "layers": [camada]}


def main():
    tamanho, asset = imagem_embutida()
    c = TELA / 2
    f = lambda seg: round(seg * FPS)

    entrada = documento("Folinha - entrada", f(1.5), {
        "o": anim([(0, 0, EASE_OUT), (f(0.4), 100, EASE_OUT)], 1),
        "p": anim([(0, [c, c + 46, 0], EASE_OUT), (f(0.6), [c, c, 0], EASE_OUT)], 3),
        "s": anim([(0, [62, 62, 100], EASE_OUT), (f(0.5), [104, 104, 100], EASE_INOUT),
                   (f(0.8), [100, 100, 100], EASE_INOUT)], 3),
        "r": anim([(0, -14, EASE_OUT), (f(0.55), 2, EASE_INOUT), (f(0.85), 0, EASE_INOUT)], 1),
    }, tamanho, asset)

    loop = documento("Folinha - loop", f(3), {
        "o": fixo(100),
        "p": anim([(0, [c, c, 0], EASE_SUAVE), (f(1.5), [c, c - 8, 0], EASE_SUAVE),
                   (f(3), [c, c, 0], EASE_SUAVE)], 3),
        "s": anim([(0, [100, 100, 100], EASE_SUAVE), (f(1.5), [103, 103, 100], EASE_SUAVE),
                   (f(3), [100, 100, 100], EASE_SUAVE)], 3),
        "r": anim([(0, 0, EASE_SUAVE), (f(0.75), 1.2, EASE_SUAVE), (f(2.25), -1.2, EASE_SUAVE),
                   (f(3), 0, EASE_SUAVE)], 1),
    }, tamanho, asset)

    SAIDA.mkdir(parents=True, exist_ok=True)
    for nome, doc in [("folinha-entrada.json", entrada), ("folinha-loop.json", loop)]:
        destino = SAIDA / nome
        destino.write_text(json.dumps(doc, separators=(",", ":")), encoding="utf-8")
        print(f"{destino.relative_to(RAIZ)}  {destino.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
