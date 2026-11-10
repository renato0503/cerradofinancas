"""Gera a peça global do CerraFood: "a plataforma inteira" em 8 slides, com ilustrações e coreografia própria.

Saída: posts/2026-11-cerrafood-plataforma/ (carrossel.html e story.html) e entregas/2026-11-cerrafood-plataforma/
(legendas e info.json). O movimento está em filmes/coreografias/2026-11-cerrafood-plataforma.mjs.
Mesmas regras da série (brand/cerrafood/README.md): só o que o sistema faz, nenhum cliente, tudo ilustrativo.

Uso:
    python tools/gerar_cerrafood_plataforma.py
    python tools/exportar.py posts/2026-11-cerrafood-plataforma/carrossel.html posts/2026-11-cerrafood-plataforma/story.html
    cd filmes && node ferramentas/animar-carrossel.mjs ../posts/2026-11-cerrafood-plataforma/carrossel.html --render
"""
import json
import math
import random
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
PASTA = "2026-11-cerrafood-plataforma"
SIMBOLO = "../../brand/cerrafood/simbolo.png"
LINK = "cerradofinancas.com.br/cerrafood"
WHATS = "(67) 99351-5206"
WHATS_URL = "https://api.whatsapp.com/send?phone=5567993515206"


def pizza_svg(fatias=8, semente=7):
    """Pizza vista de cima: borda, molho, queijo, cortes e coberturas (cada uma com classe própria para animar)."""
    rnd = random.Random(semente)
    c = 200
    partes = [
        f'<circle class="crosta" cx="{c}" cy="{c}" r="196" fill="#d99a3b"/>',
        f'<circle class="crosta" cx="{c}" cy="{c}" r="184" fill="#e8b25a"/>',
        f'<circle class="molho" cx="{c}" cy="{c}" r="168" fill="#e0472b"/>',
    ]
    # queijo com borda ondulada
    pts = []
    for i in range(72):
        a = 2 * math.pi * i / 72
        r = 156 + 7 * math.sin(i * 1.7) + 4 * math.sin(i * 3.1)
        pts.append(f"{c + r * math.cos(a):.1f},{c + r * math.sin(a):.1f}")
    partes.append(f'<polygon class="queijo" points="{" ".join(pts)}" fill="#f6cf5c"/>')
    for i in range(14):
        a, d = rnd.uniform(0, 2 * math.pi), rnd.uniform(20, 130)
        partes.append(f'<ellipse class="queijo" cx="{c + d * math.cos(a):.0f}" cy="{c + d * math.sin(a):.0f}" rx="{rnd.randint(10, 22)}" ry="{rnd.randint(7, 14)}" fill="#fbe08a" transform="rotate({rnd.randint(0, 180)} {c + d * math.cos(a):.0f} {c + d * math.sin(a):.0f})"/>')
    # coberturas: calabresa, manjericão e azeitona, espalhadas sem encostar
    usados = []
    def lugar(rmin, rmax, dist):
        for _ in range(200):
            a, d = rnd.uniform(0, 2 * math.pi), rnd.uniform(rmin, rmax)
            x, y = c + d * math.cos(a), c + d * math.sin(a)
            if all(math.hypot(x - ux, y - uy) > dist for ux, uy in usados):
                usados.append((x, y))
                return x, y
        return None
    cob = []
    for _ in range(11):
        p = lugar(30, 128, 52)
        if p:
            x, y = p
            cob.append(f'<g class="cob" style="transform-origin: {x:.0f}px {y:.0f}px"><circle cx="{x:.0f}" cy="{y:.0f}" r="22" fill="#b8321c"/>'
                       f'<circle cx="{x - 7:.0f}" cy="{y - 5:.0f}" r="3.5" fill="#7a1d0f"/><circle cx="{x + 6:.0f}" cy="{y + 6:.0f}" r="3" fill="#7a1d0f"/>'
                       f'<circle cx="{x + 8:.0f}" cy="{y - 8:.0f}" r="2.5" fill="#7a1d0f"/></g>')
    for _ in range(7):
        p = lugar(20, 135, 40)
        if p:
            x, y = p
            ang = rnd.randint(0, 180)
            cob.append(f'<g class="cob" style="transform-origin: {x:.0f}px {y:.0f}px"><ellipse cx="{x:.0f}" cy="{y:.0f}" rx="17" ry="9" fill="#2f9e2a" transform="rotate({ang} {x:.0f} {y:.0f})"/>'
                       f'<line x1="{x - 12 * math.cos(math.radians(ang)):.0f}" y1="{y - 12 * math.sin(math.radians(ang)):.0f}" x2="{x + 12 * math.cos(math.radians(ang)):.0f}" y2="{y + 12 * math.sin(math.radians(ang)):.0f}" stroke="#1d6b1a" stroke-width="2"/></g>')
    for _ in range(8):
        p = lugar(25, 140, 34)
        if p:
            x, y = p
            cob.append(f'<g class="cob" style="transform-origin: {x:.0f}px {y:.0f}px"><circle cx="{x:.0f}" cy="{y:.0f}" r="9" fill="none" stroke="#1b1712" stroke-width="6"/></g>')
    rnd.shuffle(cob)
    partes += cob
    for i in range(fatias):
        a = 2 * math.pi * i / fatias + 0.2
        partes.append(f'<line class="corte" x1="{c}" y1="{c}" x2="{c + 190 * math.cos(a):.1f}" y2="{c + 190 * math.sin(a):.1f}" stroke="#c98a32" stroke-width="3.5" stroke-linecap="round" pathLength="1"/>')
    return f'<svg viewBox="0 0 400 400" aria-hidden="true"><g class="giro" style="transform-origin: 200px 200px">{"".join(partes)}</g></svg>'


def meio_a_meio_svg():
    return ('<svg viewBox="0 0 200 200" aria-hidden="true">'
            '<g class="metade-a"><path d="M100 4 A96 96 0 0 0 100 196 Z" fill="#d99a3b"/><path d="M98 18 A82 82 0 0 0 98 182 Z" fill="#e0472b"/>'
            '<circle cx="62" cy="70" r="13" fill="#b8321c"/><circle cx="46" cy="112" r="13" fill="#b8321c"/><circle cx="70" cy="146" r="13" fill="#b8321c"/><circle cx="78" cy="104" r="11" fill="#b8321c"/></g>'
            '<g class="metade-b"><path d="M104 4 A96 96 0 0 1 104 196 Z" fill="#d99a3b"/><path d="M106 18 A82 82 0 0 1 106 182 Z" fill="#f6cf5c"/>'
            '<ellipse cx="138" cy="66" rx="16" ry="10" fill="#fbe08a"/><ellipse cx="150" cy="118" rx="18" ry="11" fill="#fff3c4"/><ellipse cx="128" cy="150" rx="14" ry="9" fill="#e9b949"/><ellipse cx="124" cy="104" rx="12" ry="8" fill="#fff3c4"/></g>'
            '</svg>')


def hamburguer_svg():
    """Hambúrguer de lado, em camadas (cada camada um <g class="camada">, de cima para baixo, para empilhar no vídeo)."""
    gergelim = "".join(f'<ellipse cx="{x}" cy="{y}" rx="6" ry="3.5" fill="#fff3d6" transform="rotate({r} {x} {y})"/>'
                       for x, y, r in [(105, 62, -20), (140, 48, 10), (178, 55, 25), (210, 75, -10), (90, 92, 15), (160, 82, -25), (230, 100, 20), (125, 100, 5)])
    camadas = [
        f'<path d="M28 128 Q28 34 150 34 Q272 34 272 128 Z" fill="#e8a54b"/><path d="M40 118 Q60 60 150 52" fill="none" stroke="#f6c97a" stroke-width="8" stroke-linecap="round"/>{gergelim}',
        '<path d="M20 132 Q40 118 60 132 T100 132 T140 132 T180 132 T220 132 T260 132 T290 132 L284 150 L16 150 Z" fill="#3dbb2f"/>',
        '<rect x="34" y="146" width="232" height="16" rx="8" fill="#e0472b"/>',
        '<path d="M26 160 H274 L262 178 L240 172 L222 194 L204 176 L120 178 L98 198 L80 176 L38 178 Z" fill="#f6cf5c"/>',
        '<rect x="22" y="172" width="256" height="40" rx="20" fill="#6b3a1e"/><path d="M50 186 H250 M60 198 H240" stroke="#4d2814" stroke-width="3" stroke-linecap="round"/>',
        '<path d="M30 214 H270 Q270 246 240 246 H60 Q30 246 30 214 Z" fill="#e8a54b"/>',
    ]
    return ('<svg viewBox="0 0 300 260" aria-hidden="true">'
            + "".join(f'<g class="camada">{c}</g>' for c in camadas) + "</svg>")


def prato_svg():
    """Prato feito visto de cima: arroz, feijão, bife e salada (cada um num <g class="item">)."""
    graos = "".join(f'<ellipse cx="{x}" cy="{y}" rx="4" ry="2" fill="#fffaf0" transform="rotate({r} {x} {y})"/>'
                    for x, y, r in [(92, 120, 20), (105, 140, -30), (120, 112, 60), (80, 150, 0), (130, 150, 40), (98, 168, -10), (115, 128, 80), (140, 132, -50)])
    itens = [
        f'<path d="M62 150 Q60 96 116 92 Q160 96 158 140 Q150 186 104 184 Q66 182 62 150 Z" fill="#f7f1df"/>{graos}',
        '<circle cx="190" cy="112" r="36" fill="#5a2d17"/>' + "".join(f'<ellipse cx="{x}" cy="{y}" rx="6" ry="4" fill="#7a3e20"/>' for x, y in [(178, 100), (196, 96), (204, 116), (186, 124), (172, 116), (198, 132)]),
        '<path d="M140 196 Q150 168 196 166 Q240 168 240 200 Q236 232 190 232 Q146 230 140 196 Z" fill="#8a4a22"/><path d="M158 186 L222 214 M162 204 L214 228 M170 172 L232 198" stroke="#5e2f14" stroke-width="5" stroke-linecap="round"/>',
        '<ellipse cx="92" cy="214" rx="30" ry="18" fill="#3dbb2f" transform="rotate(-20 92 214)"/><ellipse cx="114" cy="232" rx="24" ry="14" fill="#2f9e2a" transform="rotate(25 114 232)"/><circle cx="76" cy="236" r="12" fill="#e0472b"/><circle cx="76" cy="236" r="6" fill="#f2826b"/>',
    ]
    return ('<svg viewBox="0 0 300 300" aria-hidden="true"><circle cx="150" cy="150" r="146" fill="#f4efe2"/><circle cx="150" cy="150" r="146" fill="none" stroke="#d9d1bd" stroke-width="4"/>'
            '<circle cx="150" cy="150" r="118" fill="#fffdf7"/>' + "".join(f'<g class="item">{i}</g>' for i in itens) + "</svg>")


CAIXA_PIZZA = ('<svg class="caixa-pizza" viewBox="0 0 92 70" aria-hidden="true"><rect x="3" y="14" width="86" height="52" rx="6" fill="#fbf6ea" stroke="#16130e" stroke-width="4"/>'
               '<path d="M3 26 H89" stroke="#16130e" stroke-width="4"/><circle cx="46" cy="46" r="11" fill="#f39200"/><path d="M28 6 Q46 -2 64 6" fill="none" stroke="#f39200" stroke-width="4" stroke-linecap="round"/></svg>')


def rodape(primeiro):
    direita = '<span class="arraste">arraste →</span>' if primeiro else "<span data-pagina></span>"
    return f"""    <div class="rodape">
      <span class="marca"><span class="selo-logo"><img src="{SIMBOLO}" alt=""></span><span class="nome">Cerra<span class="food">Food</span></span><small>by Cerrado Tech</small></span>
      {direita}
    </div>"""


def slide(miolo, classe="", primeiro=False):
    return f'  <section class="slide {classe}">\n{miolo}\n{rodape(primeiro)}\n  </section>\n'


APARELHOS = [("Site", "Seu Restaurante", "#e0472b", "#fff"), ("App", "Sua Marca", "#1f4fd1", "#fff"), ("Totem", "Seu Nome Aqui", "#111111", "#f39200")]


def aparelhos():
    out = []
    for i, (tipo, nome, cor, ct) in enumerate(APARELHOS):
        out.append(f"""<div class="aparelho{' alto' if i == 1 else ''}" style="--c: {cor}; --ct: {ct}">
        <div class="barra">{nome}</div>
        <div class="corpo"><div class="item"><i></i><span></span></div><div class="item"><i></i><span class="curta"></span></div><div class="item"><i></i><span></span></div><div class="botao">Pedir</div></div>
        <span class="tipo">{tipo}</span>
      </div>""")
    return '<div class="aparelhos">' + "".join(out) + "</div>"


def kds():
    colunas = [
        ("Confirmado", [("#0051", 2, "", "1 Pizza Grande ½ Calabresa ½ Frango", "Iniciar preparo"),
                        ("#0052", 17, "atencao", "2 X-Salada", "Iniciar preparo")]),
        ("Preparando", [("#0048", 27, "atraso", "1 Parmegiana com fritas", "Pronto"),
                        ("#0050", 9, "", "1 Porção de fritas", "Pronto")]),
        ("Pronto", [("#0047", 12, "", "1 Prato executivo", None)]),
    ]
    cols = []
    for titulo, cards in colunas:
        cs = "".join(
            f'<div class="card {cls}"><span class="n"><span>{n}</span><span class="t"><span class="m">{t}</span> min</span></span><p>{txt}</p>'
            + (f'<span class="acao">{acao}</span>' if acao else "") + "</div>"
            for n, t, cls, txt, acao in cards)
        cols.append(f'<div class="col"><h4>{titulo}</h4>{cs}</div>')
    return '<div class="kds">' + "".join(cols) + "</div>"


def mapa():
    horas = ["18h", "19h", "20h", "21h", "22h", "23h"]
    base = [.12, .25, .3, .2, .1, .05]
    peso = [.4, .45, .55, .8, 1, 1, .85]
    cel = '<span></span>' + "".join(f'<span class="h">{h}</span>' for h in horas)
    for i, dia in enumerate(["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]):
        cel += f'<span class="d">{dia}</span>' + "".join(
            f'<span class="q" style="--o: {max(.1, min(1, b * 3.2 * peso[i])):.2f}"></span>' for b in base)
    return f'<div class="mapa">{cel}</div>'


SLIDES = [
    # 1. capa
    slide(f"""    <div class="topo"><p class="rotulo">CerraFood · a plataforma</p></div>
    <h1 class="mega" style="font-size: 108px">O restaurante inteiro, <span class="c">num só sistema.</span></h1>
    <p class="sub" style="margin-top: 40px; max-width: 470px">Pizzaria, hamburgueria, restaurante ou delivery. <b>Com a sua marca.</b></p>
    <div class="pizza-capa" data-sangra style="width: 700px; height: 700px; bottom: 70px; right: -230px">{pizza_svg()}</div>
    <div class="prato-capa" data-sangra>{prato_svg()}</div>
    <div class="hamb-capa" data-sangra>{hamburguer_svg()}</div>""", primeiro=True),
    # 2. white label
    slide(f"""    <p class="rotulo">01 · White label</p>
    <h2 class="titulo" style="font-size: 88px">Um sistema. <span class="c">A sua marca.</span></h2>
    <p class="sub" style="font-size: 32px">Site, app e totem com o seu nome, a sua logo e as suas cores. O app instala pelo navegador, sem loja de aplicativos.</p>
    <div class="base">{aparelhos()}<span class="selo">Exemplo ilustrativo</span></div>""", "papel"),
    # 3. totem + comanda
    slide(f"""    <p class="rotulo">02 · Totem e caixa</p>
    <h2 class="titulo" style="font-size: 96px">O cliente monta. <span class="c">A comanda sai.</span></h2>
    <div class="base">
      <div class="dupla">
        <div class="monta">
          <div class="totem-topo"><span>Monte seu pedido</span><span>Ex.: pizzaria</span></div>
          <div class="opcoes"><span class="op">Média</span><span class="op on">Grande</span><span class="op">Família</span></div>
          <div class="meio"><span class="disco">{meio_a_meio_svg()}</span><p>Metade <b>Calabresa</b><br>Metade <b>Quatro queijos</b></p></div>
          <div class="opcoes"><span class="op">Tradicional</span><span class="op on">Recheada</span></div>
          <div class="total"><span>Total na tela</span><b>Confirmar</b></div>
        </div>
        <div class="comanda">
          <div class="cab"><span>PEDIDO #0042</span><span class="canal">Totem</span></div>
          <div class="sep"></div>
          <div class="it"><span class="q">1x</span><span>Pizza Grande</span></div>
          <div class="obs">1/2 Calabresa</div><div class="obs">1/2 Quatro queijos</div><div class="obs">Borda recheada</div>
          <div class="it"><span class="q">1x</span><span>X-Burguer</span></div>
          <div class="sep"></div>
          <div class="pe">enviado à cozinha</div>
        </div>
      </div>
      <span class="selo">Exemplo ilustrativo</span>
    </div>"""),
    # 4. cozinha
    slide(f"""    <p class="rotulo">03 · Cozinha</p>
    <h2 class="titulo" style="font-size: 96px">Cada pedido <span class="c">na tela da cozinha.</span></h2>
    <div class="base">
      <div class="kds-moldura"><div class="barra-tela"><span>Tela da cozinha</span><b>● ao vivo</b></div>{kds()}</div>
      <div class="legenda-kds"><span style="--c: var(--folha)">até 15 min</span><span style="--c: var(--laranja)">até 25 min</span><span style="--c: var(--tomate)">passou de 25</span></div>
    </div>"""),
    # 5. custo + estoque
    slide(f"""    <p class="rotulo">04 · Custo e estoque</p>
    <h2 class="titulo" style="font-size: 92px">Vendeu, <span class="c">o estoque baixou.</span></h2>
    <div class="base">
      <div class="custo-estoque">
        <div><div class="pizza" style="width: 340px; height: 340px; border-radius: 50%; position: relative; background: conic-gradient(var(--laranja) 0 28%, var(--folha) 28% 50%, var(--tomate) 50% 66%, #f2c14e 66% 86%, var(--creme-suave) 86%); box-shadow: 0 0 0 10px var(--mata), 0 0 0 14px var(--linha)"></div><p class="rotulo-pizza">Custo de cada prato</p></div>
        <div class="estoque">
          <div class="ing"><span class="nome">Carne <small>ok</small></span><span class="nivel"><i style="--w: 78%"></i></span></div>
          <div class="ing"><span class="nome">Pão <small>ok</small></span><span class="nivel"><i style="--w: 61%"></i></span></div>
          <div class="ing"><span class="nome">Molho <small>ok</small></span><span class="nivel"><i style="--w: 52%"></i></span></div>
          <div class="ing baixo"><span class="nome">Queijo <span class="alerta">abaixo do mínimo</span></span><span class="nivel"><i style="--w: 14%"></i></span></div>
        </div>
      </div>
      <p class="legenda-baixa">A ficha técnica dá o custo de cada prato e baixa cada ingrediente a cada venda.</p>
      <span class="selo">Exemplo ilustrativo</span>
    </div>"""),
    # 6. entrega
    slide(f"""    <p class="rotulo">05 · Entrega</p>
    <h2 class="titulo" style="font-size: 92px">Do forno à porta, <span class="c">etapa por etapa.</span></h2>
    <div class="base">
      <div class="caminho">
        {CAIXA_PIZZA}
        <div class="paradas">
          <div class="parada feita"><span class="ponto">01</span><b>Confirmado</b></div>
          <div class="parada feita"><span class="ponto">02</span><b>Preparando</b></div>
          <div class="parada feita"><span class="ponto">03</span><b>Saiu para entrega</b></div>
          <div class="parada"><span class="ponto">04</span><b>Entregue</b></div>
        </div>
      </div>
      <div class="celular">
        <span class="url">seurestaurante.com.br/pedido/…</span>
        <span class="status">Saiu para entrega</span>
        <span class="info">Pedido #0042 · taxa e tempo de entrega pelo seu bairro</span>
        <span class="zap">Falar com a loja no WhatsApp</span>
      </div>
    </div>""", "papel"),
    # 7. gestão
    slide(f"""    <p class="rotulo">06 · Gestão</p>
    <h2 class="titulo" style="font-size: 92px">Cliente fiel, <span class="c">conta fechada.</span></h2>
    <div class="base">
      <div class="gestao">
        <div class="col"><h4>Fidelidade</h4><div class="niveis">
          <div class="n" style="--c: #cd8a4b; --h: 46%"><b>Bronze</b></div><div class="n" style="--c: #c9cdd1; --h: 62%"><b>Prata</b></div>
          <div class="n" style="--c: #f2c14e; --h: 80%"><b>Ouro</b></div><div class="n" style="--c: #e8ecef; --h: 100%"><b>Platina</b></div>
        </div></div>
        <div class="col"><h4>Horários que lotam</h4>{mapa()}</div>
      </div>
      <div class="chips" style="justify-content: flex-start"><span class="chip">Caixa com conferência</span><span class="chip">DRE</span><span class="chip">Curva ABC</span><span class="chip">Equipe e acessos</span></div>
      <span class="selo">Exemplo ilustrativo</span>
    </div>"""),
    # 8. CTA
    slide(f"""    <div class="topo"><p class="rotulo">Demonstração</p></div>
    <h2 class="mega" style="font-size: 108px">Veja o CerraFood <span class="c">com a sua marca.</span></h2>
    <div class="base">
      <p class="sub" style="max-width: 560px">Demonstração gratuita, com o seu cardápio e a sua logo.</p>
      <span class="contato principal">{LINK}</span>
      <span class="contato">WhatsApp {WHATS}</span>
    </div>
    <div class="pizza-mini" data-sangra>{pizza_svg(semente=11)}</div>""", "laranja"),
]

CAB = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="entrega" content="{entrega}">
  <meta name="formato" content="{formato}">
  <title>{titulo}</title>
  <link rel="stylesheet" href="../../brand/cerrafood/marca.css">
  <link rel="stylesheet" href="../../brand/cerrafood/plataforma.css">
</head>
<body>
"""
FIM = """  <script src="../../brand/slides.js"></script>
</body>
</html>
"""

STORY = f"""  <!-- área segura: ~250px livres no topo e na base -->
  <section class="slide story">
    <div class="topo"><p class="rotulo">CerraFood · a plataforma</p></div>
    <h1 class="mega" style="font-size: 112px">O restaurante inteiro, <span class="c">num só sistema.</span></h1>
    <p class="sub" style="margin-top: 44px; max-width: 520px">Pizzaria, hamburgueria, restaurante ou delivery. <b>Com a sua marca.</b></p>
    <div class="base">
      <div class="chips" style="justify-content: flex-start"><span class="chip">Totem</span><span class="chip">Caixa</span><span class="chip">Cozinha</span><span class="chip">Ficha técnica</span><span class="chip">Estoque</span><span class="chip">Entrega</span><span class="chip">Fidelidade</span><span class="chip">Relatórios</span></div>
      <span class="contato principal">{LINK}</span>
    </div>
    <div class="pizza-capa" data-sangra style="width: 620px; height: 620px; bottom: 540px; right: -230px">{pizza_svg()}</div>
  </section>
"""

LEGENDA_IG = f"""O restaurante inteiro, num só sistema. Com a sua marca.

O CerraFood é a plataforma de gestão de restaurantes da Cerrado Tech, para pizzaria, hamburgueria, restaurante e delivery. É white label: site, app, totem e painel saem com o seu nome, a sua logo e as suas cores.

🍔 Totem e caixa: o cliente monta o pedido com as opções da casa (na pizzaria, até o meio a meio) e a comanda sai impressa
🍳 Cozinha: cada pedido na tela, com a cor pelo tempo de espera
🧾 Custo e estoque: a ficha técnica dá o custo de cada prato e baixa os ingredientes a cada venda
🛵 Entrega: taxa e tempo por bairro, e o cliente acompanha cada etapa pelo link
📊 Gestão: fidelidade por níveis, caixa com conferência, DRE, curva ABC e mapa de horários

Agende uma demonstração gratuita, com o seu cardápio e a sua logo: WhatsApp {WHATS}
🔗 {LINK}

#CerraFood #SistemaParaRestaurante #GestaoDeRestaurante #Pizzaria #Hamburgueria #Delivery #WhiteLabel #CerradoTech
"""
LEGENDA_LI = f"""O restaurante inteiro, num só sistema. Com a marca da casa.

O CerraFood é a plataforma de gestão de restaurantes da Cerrado Tech (pizzaria, hamburgueria, restaurante e delivery), entregue em white label: site, app, totem e painel com o nome, a logo e as cores do cliente.

1. Totem e caixa, com comanda impressa
2. Tela da cozinha, com a cor pelo tempo de espera
3. Ficha técnica com o custo de cada prato e baixa automática de estoque
4. Entrega com taxa por bairro e acompanhamento pelo link
5. Fidelidade, caixa com conferência, DRE, curva ABC e mapa de horários

Demonstração: https://www.{LINK}
"""
LEGENDA_FB = LEGENDA_IG.split("Agende")[0] + f"""Agende uma demonstração gratuita, com o seu cardápio e a sua logo.
Fale com a gente no WhatsApp: {WHATS_URL}
Saiba mais: https://www.{LINK}
"""


def main():
    post, ent = RAIZ / "posts" / PASTA, RAIZ / "entregas" / PASTA
    post.mkdir(parents=True, exist_ok=True)
    ent.mkdir(parents=True, exist_ok=True)
    (post / "carrossel.html").write_text(CAB.format(entrega=PASTA, formato="1080x1350", titulo="Carrossel: CerraFood, a plataforma inteira")
                                         + "\n".join(SLIDES) + FIM, encoding="utf-8")
    (post / "story.html").write_text(CAB.format(entrega=PASTA, formato="1080x1920", titulo="Story: CerraFood, a plataforma inteira") + STORY + FIM, encoding="utf-8")
    (ent / "legenda-instagram.txt").write_text(LEGENDA_IG, encoding="utf-8")
    (ent / "legenda-linkedin.txt").write_text(LEGENDA_LI, encoding="utf-8")
    (ent / "legenda-facebook.txt").write_text(LEGENDA_FB, encoding="utf-8")
    info = {
        "titulo": "CerraFood · A plataforma inteira",
        "serie": "Visão geral",
        "data": "2026-11-11",
        "descricao": "Peça global do CerraFood: a plataforma inteira em 8 slides, com ilustrações e carrossel animado com coreografia própria.",
        "orientacoes": [
            "Carrossel: postar os 8 PNGs na ordem (carrossel-01 a 08).",
            "Carrossel animado (carrossel-animado.mp4, sem áudio): a mesma peça em movimento, para Reel ou para o Facebook.",
            f"Story: adicionar o sticker de link para https://www.{LINK}",
            "Telas, comandas e gráficos são exemplos ilustrativos: não citar cliente nem resultado.",
            "Legendas prontas abaixo, uma para cada rede (a do Facebook já traz o link do WhatsApp).",
        ],
    }
    arq = ent / "info.json"
    if arq.exists():  # mantém a data e a conta que o agendar.py gravou
        velho = json.loads(arq.read_text(encoding="utf-8"))
        if velho.get("conta"):
            info["data"], info["conta"] = velho["data"], velho["conta"]
            info["orientacoes"] = [o for o in velho["orientacoes"] if o.startswith("Postar em")] + info["orientacoes"]
    arq.write_text(json.dumps(info, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(PASTA)


if __name__ == "__main__":
    main()
