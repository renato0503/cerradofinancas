"""Gera as artes de impressão e de site de cada frente (aba "Formatos" da Central de Marketing).

Por frente:
- as versões de cartão de visita de cada frente (uma na maioria; a Contabilidade tem 3 e o CerraFood 5),
  frente e verso, em PDF vetorial para a gráfica, nos tamanhos pedidos:
  9 x 5 cm, 8,8 x 4,8 cm e 8,6 x 4,8 cm (este pedido em 25/11/2026), cada um com 3 mm de sangria por lado
  (96 x 56, 94 x 54 e 92 x 54 mm). PNG de prévia (300 dpi).
- Anúncio de jornal 25,5 x 36 cm (PDF + PNG de prévia).
- Banners de site 1200 x 90 e 300 x 250 (PNG em 1x e 2x).

Fontes (HTML) em conteudo/2026-11-formatos/<frente>.html; abrir no navegador mostra todas as peças com a linha de corte
tracejada. Saída publicada em formatos/<frente>/ + formatos/<frente>.zip + formatos/formatos.json (a página lê).

Textos: só o que já está no site, nas legendas institucionais e nos guias de marca (nada inventado, sem preço).
Crédito leva o aviso legal em toda peça. Cartões são institucionais (sem nome de pessoa), com uma exceção pedida pelo
Renato em 22/11/2026: os 3 cartões da Contabilidade apresentam o contador responsável (fotinha, nome e CRC,
como pede o CFC); as 5 versões institucionais antigas da Contabilidade foram retiradas a pedido dele.

Uso:
    python tools/gerar_formatos.py            # gera os HTML
    python tools/gerar_formatos.py --render   # gera os HTML e renderiza PDF/PNG (Playwright)
    python tools/gerar_formatos.py --render cerraai credito   # só algumas frentes
"""
import json
import re
import sys
import zipfile
from html import escape
from pathlib import Path

import qrcode
from PIL import Image

MARKETING = Path(__file__).resolve().parent.parent
RAIZ = MARKETING.parent
FONTE = MARKETING / "conteudo" / "2026-11-formatos"
SAIDA = MARKETING / "formatos"
IMG = FONTE / "img"

WHATS = "(67) 99351-5206"
EMAIL = "comercial@cerradofinancas.com.br"
CIDADE = "Cuiabá · MT"
AVISO_CREDITO = ("Cerrado Finanças, em parceria com a LS Intermediação Financeira, atua como correspondente bancário e "
                 "não é instituição financeira. Crédito sujeito a análise e aprovação. Taxas e condições variam conforme "
                 "o perfil e a instituição.")
TAMANHOS = [(90, 50), (88, 48), (86, 48)]
SANGRIA = 3

# Assinatura "folinha + Cerrado Tech" que vai em todas as artes da CerraFood (produto da fábrica).
ASSINATURA_TECH = '<span class="assin"><img src="img/folinha.png" alt="Cerrado Tech"><b>Cerrado Tech</b></span>'

# --------------------------------------------------------------------------- imagens (cópias leves para o PDF)

LOGOS = {
    "folinha": (RAIZ / "img/folinha-hero.png", 500),
    "logo-tech": (RAIZ / "img/logo-tech.png", 900),
    "cerraai": (RAIZ / "img/logo_cerraai-icone.png", 700),
    "cerraclass": (MARKETING / "brand/cerraclass/logo.png", 600),
    "cerrafood": (MARKETING / "brand/cerrafood/simbolo.png", 700),
    "guiacademico": (MARKETING / "brand/guiacademico/logo.png", 900),
    "bussola": (MARKETING / "brand/guiacademico/logo-icone.png", 600),
    # Contabilidade v1-v3: o contador responsável (foto autorizada pelo Renato, 22/11/2026)
    "renato-foto": (RAIZ / "img/renato.jpg", 320),                     # fotinha de até 22 mm (3x4) ≈ 260 px a 300 dpi; sai em JPEG
}


def preparar_imagens():
    IMG.mkdir(parents=True, exist_ok=True)
    for nome, (origem, lado) in LOGOS.items():
        destino = IMG / f"{nome}.{'jpg' if origem.suffix.lower() in ('.jpg', '.jpeg') else 'png'}"
        if destino.exists() and destino.stat().st_mtime > origem.stat().st_mtime:
            continue
        im = Image.open(origem).convert("RGBA")
        im = im.crop(im.getchannel("A").point(lambda a: 255 if a > 8 else 0).getbbox())
        im.thumbnail((lado, lado), Image.LANCZOS)
        if origem.suffix.lower() in (".jpg", ".jpeg"):  # foto sem transparência: JPEG (o PDF fica leve)
            destino = destino.with_suffix(".jpg")
            im.convert("RGB").save(destino, quality=88, optimize=True)
            continue
        im.save(destino, optimize=True)


# --------------------------------------------------------------------------- utilitários de HTML

ICONES = {
    "whats": '<path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.6-5.4A8.4 8.4 0 1 1 21 11.5z"/><path d="M9 8.6c.2 2.6 3.6 6 6.3 6.3l1.1-1.4-1.9-1-.9.8c-1-.4-2.4-1.8-2.8-2.8l.8-.9-1-1.9z" fill="currentColor" stroke="none"/>',
    "email": '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>',
    "site": '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.8 3.8 5.8 3.8 9s-1.2 6.2-3.8 9c-2.6-2.8-3.8-5.8-3.8-9S9.4 5.8 12 3z"/>',
    "insta": '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/>',
    "local": '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
}


def ico(nome):
    return (f'<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
            f'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{ICONES[nome]}</svg>')


def contatos(b, campos=("whats", "email", "site", "insta"), cls="ct", icones=True):
    linhas = []
    for c in campos:
        valor = b.get(c)
        if not valor:
            continue
        i = ico(c) if icones else ""
        linhas.append(f'<li>{i}<span>{escape(valor)}</span></li>')
    return f'<ul class="{cls}">' + "".join(linhas) + "</ul>"


def contatos_mono(b, campos=("whats", "email", "site", "insta")):
    """Contatos como pares chave: valor (usado nas versões técnicas)."""
    nomes = {"whats": "whatsapp", "email": "email", "site": "site", "insta": "instagram", "local": "base"}
    return '<dl class="kv">' + "".join(
        f'<div><dt>{nomes[c]}</dt><dd>{escape(b[c])}</dd></div>' for c in campos if b.get(c)) + "</dl>"


def qr(url, tinta="#000", papel="#fff", cls="qr"):
    q = qrcode.QRCode(border=1, error_correction=qrcode.constants.ERROR_CORRECT_M)
    q.add_data(url)
    q.make(fit=True)
    m = q.get_matrix()
    n = len(m)
    d = "".join(f"M{x} {y}h1v1h-1z" for y, linha in enumerate(m) for x, v in enumerate(linha) if v)
    return (f'<svg class="{cls}" viewBox="0 0 {n} {n}" shape-rendering="crispEdges" aria-label="QR Code">'
            f'<rect width="{n}" height="{n}" fill="{papel}"/><path d="{d}" fill="{tinta}"/></svg>')


def face(grupo, lado, cls, corpo, rotulo=""):
    return (f'<section class="peca face {cls}" data-grupo="{grupo}" data-id="{grupo}-{lado}" '
            f'data-rotulo="{escape(rotulo or grupo + " · " + lado)}">{corpo}<i class="corte"></i></section>\n')


def cartao(v, frente_cls, frente, verso_cls, verso, nome=""):
    g = f"cartao-v{v}"
    return (face(g, "frente", frente_cls, frente, f"Cartão v{v} · frente · {nome}") +
            face(g, "verso", verso_cls, verso, f"Cartão v{v} · verso · {nome}"))


def peca(pid, cls, corpo, rotulo):
    return f'<section class="peca {cls}" data-grupo="{pid}" data-id="{pid}" data-rotulo="{escape(rotulo)}">{corpo}</section>\n'


def s(corpo, cls=""):
    """Área segura do cartão (4 mm para dentro do corte)."""
    return f'<div class="s {cls}">{corpo}</div>'


# --------------------------------------------------------------------------- CSS comum

CSS_BASE = """
@page { margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html { --w: 90mm; --h: 50mm; --sg: 3mm; }
body { background: #8a8f98; font-family: system-ui, sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body:not(.render) { padding: 12mm 0 30mm; }
body:not(.render) .peca { margin: 0 auto 4mm; box-shadow: 0 2mm 6mm rgba(0,0,0,.25); }
body:not(.render) .peca::before { content: attr(data-rotulo); position: absolute; left: 0; top: -5mm; font: 600 9pt system-ui; color: #fff; }
body:not(.render) .peca { margin-top: 9mm; overflow: visible; }
body:not(.render) .peca > .clip { overflow: hidden; }
body.render { background: transparent; }
body.render .peca:not(.on) { display: none; }
body.render .peca.on + .peca.on { break-before: page; }
.peca { position: relative; overflow: hidden; }
.face { width: calc(var(--w) + 2 * var(--sg)); height: calc(var(--h) + 2 * var(--sg)); }
.corte { position: absolute; inset: var(--sg); border: .2mm dashed rgba(255, 0, 140, .9); pointer-events: none; z-index: 50; }
body.render .corte { display: none; }
.s { position: absolute; inset: calc(var(--sg) + 4mm); display: flex; flex-direction: column; }
.ico { width: 1.15em; height: 1.15em; flex-shrink: 0; }
.ct { list-style: none; display: flex; flex-direction: column; gap: .9mm; }
.ct li { display: flex; align-items: center; gap: 1.4mm; white-space: nowrap; }
.kv div { display: flex; gap: 2mm; }
.kv dt { min-width: 15mm; opacity: .6; }
.qr { display: block; }
.jornal { width: 255mm; height: 360mm; }
.b1200 { width: 1200px; height: 90px; }
.b300 { width: 300px; height: 250px; }
img { display: block; }
.fill { position: absolute; inset: 0; }
.cresce { flex: 1; }
.lin { display: flex; align-items: center; }
.entre { justify-content: space-between; }
.fim { align-items: flex-end; }
.assin { display: inline-flex; align-items: center; gap: 1.6mm; font-weight: 800; letter-spacing: -.02em; color: currentColor; white-space: nowrap; }
.assin img { height: 1.5em; width: auto; }
"""

FONTES = """
@font-face { font-family: 'Archivo'; src: url('../../brand/fontes/archivo.woff2') format('woff2'); font-weight: 100 900; font-stretch: 62% 125%; }
@font-face { font-family: 'JetBrains Mono'; src: url('../../brand/fontes/jetbrains-mono.woff2') format('woff2'); font-weight: 100 800; }
@font-face { font-family: 'Bricolage Grotesque'; src: url('../../brand/fontes/bricolage.woff2') format('woff2'); font-weight: 200 800; font-stretch: 75% 100%; }
@font-face { font-family: 'Schibsted Grotesk'; src: url('../../brand/fontes/schibsted.woff2') format('woff2'); font-weight: 400 900; }
@font-face { font-family: 'Caveat'; src: url('../../brand/fontes/caveat.woff2') format('woff2'); font-weight: 700; }
@font-face { font-family: 'Plex Cond'; src: url('../../brand/fontes/plex-cond-500.woff2') format('woff2'); font-weight: 500; }
@font-face { font-family: 'Plex Cond'; src: url('../../brand/fontes/plex-cond-700.woff2') format('woff2'); font-weight: 700; }
@font-face { font-family: 'Plex Mono'; src: url('../../brand/fontes/plex-mono-500.woff2') format('woff2'); font-weight: 500; }
@font-face { font-family: 'Plex Mono'; src: url('../../brand/fontes/plex-mono-600.woff2') format('woff2'); font-weight: 600; }
@font-face { font-family: 'Fraunces'; src: url('../../brand/fontes/fraunces-400.woff2') format('woff2'); font-weight: 400; }
@font-face { font-family: 'Fraunces'; src: url('../../brand/fontes/fraunces-600.woff2') format('woff2'); font-weight: 600; }
@font-face { font-family: 'Fraunces'; src: url('../../brand/fontes/fraunces-400-italic.woff2') format('woff2'); font-weight: 400; font-style: italic; }
@font-face { font-family: 'Instrument Sans'; src: url('../../brand/fontes/instrument-sans-400.woff2') format('woff2'); font-weight: 400; }
@font-face { font-family: 'Instrument Sans'; src: url('../../brand/fontes/instrument-sans-600.woff2') format('woff2'); font-weight: 600; }
@font-face { font-family: 'DM Mono'; src: url('../../brand/fontes/dm-mono-400.woff2') format('woff2'); font-weight: 400; }
@font-face { font-family: 'DM Mono'; src: url('../../brand/fontes/dm-mono-500.woff2') format('woff2'); font-weight: 500 700; }
@font-face { font-family: 'Newsreader'; src: url('../../brand/fontes/newsreader-400-normal.woff2') format('woff2'); font-weight: 400; }
@font-face { font-family: 'Newsreader'; src: url('../../brand/fontes/newsreader-400-italic.woff2') format('woff2'); font-weight: 400; font-style: italic; }
@font-face { font-family: 'Newsreader'; src: url('../../brand/fontes/newsreader-600-normal.woff2') format('woff2'); font-weight: 600; }
@font-face { font-family: 'Newsreader'; src: url('../../brand/fontes/newsreader-600-italic.woff2') format('woff2'); font-weight: 600; font-style: italic; }
@font-face { font-family: 'Outfit'; src: url('../../brand/fontes/outfit.woff2') format('woff2'); font-weight: 300 900; }
"""

# Jornal e banners: um molde comum, vestido pelas variáveis de cada marca (--fundo, --tinta, --acento...).
CSS_MOLDES = """
.jornal { background: var(--fundo); color: var(--tinta); font-family: var(--fb); }
.jornal .j { position: absolute; inset: 14mm; display: flex; flex-direction: column; }
.jornal .j-topo { display: flex; justify-content: space-between; align-items: center; padding-bottom: 7mm; border-bottom: .6mm solid var(--linha); }
.jornal .j-topo-dir { display: flex; align-items: center; gap: 6mm; }
.jornal .assin { font-size: 12pt; }
.jornal .j-rot { font: 500 11pt var(--fm); letter-spacing: .12em; text-transform: uppercase; color: var(--acento-texto); }
.jornal h1 { font-family: var(--ft); font-weight: var(--ft-peso); font-stretch: var(--ft-larg, 100%); text-transform: var(--ft-caixa, none);
  font-size: 54pt; line-height: .98; letter-spacing: var(--ft-esp, -0.02em); margin-top: 14mm; }
.jornal h1 em { font-style: var(--em-estilo, normal); color: var(--acento-texto); }
.jornal .j-sub { font-size: 17pt; line-height: 1.4; margin-top: 8mm; max-width: 190mm; opacity: .9; }
.jornal .j-lista { list-style: none; margin-top: 12mm; display: grid; gap: 5mm; }
.jornal .j-lista li { display: grid; grid-template-columns: 11mm 1fr; align-items: baseline; font-size: 16pt; line-height: 1.3; }
.jornal .j-lista li b { font: 500 12pt var(--fm); color: var(--acento-texto); }
.jornal .j-motivo { flex: 1; display: flex; align-items: center; justify-content: center; min-height: 0; }
.jornal .j-base { display: flex; justify-content: space-between; align-items: flex-end; gap: 10mm; padding-top: 8mm; border-top: .6mm solid var(--linha); }
.jornal .j-cta { font-family: var(--ft); font-weight: var(--ft-peso); font-stretch: var(--ft-larg, 100%); text-transform: var(--ft-caixa, none); font-size: 22pt; line-height: 1.05; }
.jornal .j-base .ct { font-size: 14pt; gap: 3mm; margin-top: 6mm; }
.jornal .j-qr { width: 40mm; text-align: center; font: 500 9pt var(--fm); }
.jornal .j-qr .qr { width: 40mm; height: 40mm; margin-bottom: 2mm; }
.jornal .j-aviso { font-size: 9pt; line-height: 1.35; margin-top: 5mm; opacity: .8; }

.jornal.folha { width: 154mm; height: 216mm; }
.jornal.folha .j { inset: 13mm; }
.jornal.folha h1 { font-size: 32pt; margin-top: 6mm; }
.jornal.folha > .j > .j-rot:first-child { font-size: 12pt; }
.jornal.folha .j-sub { font-size: 16pt; line-height: 1.38; margin-top: 6mm; }
.jornal.folha .j-lista { grid-template-columns: 1fr; gap: 6mm; margin-top: 10mm; }
.jornal.folha .j-lista li { font-size: 15pt; grid-template-columns: 9mm 1fr; }
.jornal.folha .j-cta { font-size: 17pt; }
.jornal.folha .ct { font-size: 11pt; gap: 2.6mm; margin-top: 5mm; }
.jornal.folha .j-qr { width: 34mm; } .jornal.folha .j-qr .qr { width: 34mm; height: 34mm; }
.jornal.folha .j-aviso { font-size: 7.5pt; margin-top: 6mm; }
body.render .jornal.folha .corte, body.render .corte { display: none; }
.b1200 { background: var(--fundo); color: var(--tinta); font-family: var(--fb); display: flex; align-items: center; gap: 26px; padding: 0 22px 0 24px; }
.b1200 .bt { flex: 1; font-family: var(--ft); font-weight: var(--ft-peso); font-stretch: var(--ft-larg, 100%); text-transform: var(--ft-caixa, none);
  font-size: 27px; line-height: 1.05; letter-spacing: var(--ft-esp, -0.01em); }
.b1200 .bt em { font-style: var(--em-estilo, normal); color: var(--acento-texto); }
.b1200 .bt small { display: block; font: 500 13px var(--fb); text-transform: none; letter-spacing: 0; opacity: .85; margin-top: 5px; font-stretch: 100%; }
.cta { background: var(--acento); color: var(--sobre-acento); font: 700 15px var(--fb); padding: 13px 20px; border-radius: var(--raio, 999px); white-space: nowrap; }
.b1200 .av { position: absolute; left: 0; right: 0; bottom: 3px; text-align: center; font-size: 8.5px; opacity: .75; }
.b1200 .assin { font-size: 11px; }
.b300 .assin { font-size: 9px; }
.b300 { background: var(--fundo); color: var(--tinta); font-family: var(--fb); padding: 18px 18px 16px; display: flex; flex-direction: column; }
.b300 .bt { font-family: var(--ft); font-weight: var(--ft-peso); font-stretch: var(--ft-larg, 100%); text-transform: var(--ft-caixa, none);
  font-size: 27px; line-height: 1.02; letter-spacing: var(--ft-esp, -0.01em); margin-top: 14px; }
.b300 .bt em { font-style: var(--em-estilo, normal); color: var(--acento-texto); }
.b300 .bs { font-size: 12.5px; line-height: 1.35; margin-top: 7px; opacity: .88; }
.b300 .cta { align-self: flex-start; margin-top: auto; flex-shrink: 0; font-size: 14px; padding: 10px 16px; }
.b300 .av { font-size: 7.2px; line-height: 1.25; opacity: .78; margin-top: 7px; }
"""


ULTIMO_JORNAL = {}


def jornal(marca, rotulo, titulo, sub, itens, motivo, cta, b, url, aviso="", campos=("whats", "email", "site", "insta"),
           assinatura=""):
    ULTIMO_JORNAL.clear()
    ULTIMO_JORNAL.update(marca=marca, rotulo=rotulo, titulo=titulo, b=b, url=url, aviso=aviso, campos=campos)
    lista = "".join(f"<li><b>{i + 1:02d}</b><span>{t}</span></li>" for i, t in enumerate(itens))
    av = f'<p class="j-aviso">{escape(aviso)}</p>' if aviso else ""
    topo = f'<span class="j-rot">{rotulo}</span>'
    if assinatura:
        topo = f'<span class="j-topo-dir">{topo}{assinatura}</span>'
    return peca("jornal", "jornal", f"""<div class="j">
  <div class="j-topo">{marca}{topo}</div>
  <h1>{titulo}</h1>
  <p class="j-sub">{sub}</p>
  <ul class="j-lista">{lista}</ul>
  <div class="j-motivo">{motivo}</div>
  <div class="j-base">
    <div><p class="j-cta">{cta}</p>{contatos(b, campos)}</div>
    <div class="j-qr">{qr(url, b["qr_tinta"], b["qr_papel"])}aponte a câmera</div>
  </div>{av}
</div>""", "Jornal · 25,5 x 36 cm")


def folder(slug, j, d, assinatura=""):
    """Folder de 4 páginas A5 (A4 dobrada ao meio), feito para converter:
    1 capa com o 3D da frente e o botão do WhatsApp · 2 o que fazemos (cartões que ocupam a página) ·
    3 como funciona + o segundo 3D + diferenciais · 4 bloco de chamada, QR grande e contatos.
    Textos só dos filmes das frentes e do site (FOLDER, abaixo)."""
    b, marca = j["b"], j["marca"]
    av = f'<p class="fd-aviso">{escape(j["aviso"])}</p>' if j["aviso"] else ""
    rodape_assin = f'<div class="fd-assina">{assinatura}</div>' if assinatura else ""

    def pg(n, corpo, rot, cls=""):
        return (f'<section class="peca jornal folha fd {cls}" data-grupo="folder" data-id="folder-p{n}" data-rotulo="Folder · página {n} · {rot}">'
                f'<div class="fd-pg">{corpo}{rodape_assin}</div><i class="corte"></i></section>\n')

    def cartoes(itens, cls=""):
        return f'<div class="fd-cards {cls}">' + "".join(
            f'<div class="fd-card"><b class="fd-n">{i + 1:02d}</b><div><p class="fd-ct">{t_}</p>' + (f'<p class="fd-cd">{d_}</p>' if d_ else "") + "</div></div>"
            for i, (t_, d_) in enumerate(itens)) + "</div>"

    def passos(itens):
        return '<ol class="fd-passos">' + "".join(
            f'<li><b>{i + 1}</b><div><p class="fd-ct">{t_}</p>' + (f'<p class="fd-cd">{d_}</p>' if d_ else "") + "</div></li>"
            for i, (t_, d_) in enumerate(itens)) + "</ol>"

    chips = '<div class="fd-chips">' + "".join(f"<span>{c}</span>" for c in d["provas"]) + "</div>"
    whats = f'<span class="fd-btn">{ico("whats")} {escape(b["whats"])}</span>'
    colunas = " duas" if len(d["servicos"]) > 5 else ""
    return (
        pg(1, f"""<div class="fd-topo"><div class="fd-marca">{marca}</div><span class="j-rot">{j["rotulo"]}</span></div>
  <div class="fd-hero"><img src="img/3d-{slug}-1.png" alt=""></div>
  <h1 class="fd-h1">{j["titulo"]}</h1><p class="fd-sub">{d["sub"]}</p>
  <div class="fd-acao">{whats}<span class="fd-mini">{d["acao"]}</span></div>""", "capa") +
        pg(2, f"""<p class="j-rot">{d["s_rot"]}</p><h2 class="fd-h2">{d["s_tit"]}</h2>
  {cartoes(d["servicos"], colunas)}
  <div class="fd-faixa">{d["destaque"]}</div>""", "o que fazemos") +
        pg(3, f"""<p class="j-rot">{d["p_rot"]}</p><h2 class="fd-h2">{d["p_tit"]}</h2>
  {passos(d["passos"])}
  <div class="fd-hero fd-hero2"><img src="img/3d-{slug}-2.png" alt=""></div>{chips}""", "como funciona") +
        pg(4, f"""<div class="fd-cta"><p class="j-rot">{d["cta_rot"]}</p><p class="fd-cta-t">{d["cta"]}</p><p class="fd-cta-s">{d["cta_sub"]}</p>{whats}</div>
  <div class="cresce"></div><div class="fd-base"><div class="fd-qr">{qr(j["url"], b["qr_tinta"], b["qr_papel"])}<span>aponte a câmera</span></div>
  <div class="fd-ctt">{contatos(b, j["campos"])}</div></div>
  <div class="cresce"></div>{chips}<div class="fd-rodape" style="margin-top:6mm"><div class="fd-marca">{marca}</div></div>{av}""", "contracapa"))


def banners(marca_l, marca_q, titulo, sub, cta, aviso=""):
    av1 = f'<p class="av">{escape(aviso)}</p>' if aviso else ""
    av3 = f'<p class="av">{escape(aviso)}</p>' if aviso else ""
    return (peca("banner-1200x90", "b1200", f'{marca_l}<p class="bt">{titulo}<small>{sub}</small></p><span class="cta">{cta}</span>{av1}',
                 "Site · 1200 x 90") +
            peca("banner-300x250", "b300", f'{marca_q}<p class="bt">{titulo}</p><p class="bs">{sub}</p><span class="cta">{cta}</span>{av3}',
                 "Site · 300 x 250"))


# =========================================================================== 1. Cerrado Finanças (institucional)

def institucional():
    b = dict(whats=WHATS, email=EMAIL, site="cerradofinancas.com.br", insta="@cerradofinancas", local=CIDADE,
             qr_tinta="#001f5c", qr_papel="#ffffff")
    url = "https://www.cerradofinancas.com.br"
    nome = "Cerrado Finanças"
    frentes = ["Fábrica de Software", "Contabilidade", "Crédito", "Cursos", "Consultorias"]
    css = """
body { font-family: 'Inter', sans-serif; }
.az { background: radial-gradient(circle at 88% 12%, rgba(254,203,0,.38), transparent 46%), linear-gradient(140deg, #003399 -20%, #001f5c 35%, #000f2e); color: #fff; }
.noite { background: #000f2e; color: #fff; }
.branco { background: #fff; color: #0f172a; }
.ouro { background: #fecb00; color: #001f5c; }
.nome { font-weight: 900; letter-spacing: -.03em; line-height: .95; }
.nome span { color: #fecb00; }
.ouro .nome span, .branco .nome span { color: #006430; }
.tag { font-size: 6.4pt; line-height: 1.35; font-weight: 500; }
.rot { font-size: 5.2pt; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; color: #fecb00; }
.branco .rot { color: #006430; }
.ct { font-size: 6.6pt; font-weight: 500; }
.ct .ico { color: #fecb00; }
.branco .ct .ico { color: #006430; }
.mini { display: flex; align-items: center; gap: 1.6mm; font-weight: 900; font-size: 8pt; letter-spacing: -.02em; }
.mini img { height: 6.5mm; }
.pilulas { display: flex; flex-wrap: wrap; gap: 1mm; }
.pilulas span { border: .25mm solid #fecb00; color: #fff; border-radius: 9mm; padding: .5mm 1.8mm; font-size: 5.6pt; font-weight: 600; }
.qrbox { background: #fff; padding: 1mm; border-radius: 1.2mm; }
.servicos { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5mm 3mm; align-content: center; margin: 1.6mm 0; }
.sv { font-size: 4.9pt; line-height: 1.28; }
.sv b { display: block; font-size: 5.3pt; font-weight: 800; color: #fecb00; letter-spacing: .02em; }
.sv span { opacity: .88; }
.ct.linha { flex-direction: row; justify-content: space-between; font-size: 5pt; border-top: .2mm solid rgba(254,203,0,.45); padding-top: 1.4mm; }
.ct.linha li { gap: 1mm; }
"""
    c = []
    # frente da antiga v2 + verso da antiga v4 com tudo o que o escritório faz (serviços tirados das páginas do site)
    servicos = [
        ("Fábrica de Software", "ERPs, CRMs, IA offline, e-commerce, dashboards e cyber security"),
        ("Contabilidade", "abertura de empresa, tributos, folha e eSocial, BPO e BI"),
        ("Crédito", "empréstimos, consignados, financiamentos, seguros e consórcios"),
        ("Cursos", "IA na prática, IA na gestão, Excel com IA, dados e automação"),
        ("Consultorias", "CSC, BPO financeiro, controladoria, tributário, GRC, GovTech e Web3"),
    ]
    lista_sv = "".join(f'<div class="sv"><b>{t}</b><span>{d}</span></div>' for t, d in servicos)
    c.append(cartao(1, "noite", """<img src="img/folinha.png" style="position:absolute;height:44mm;right:-8mm;bottom:-6mm;opacity:.95" alt="">""" + s("""
      <p class="rot">Finanças &amp; Tech</p><div class="cresce"></div>
      <p class="nome" style="font-size:17pt">Cerrado<br><span>Finanças</span></p>
      <i style="display:block;width:9mm;height:.7mm;background:#fecb00;margin:2.2mm 0 1.6mm"></i>
      <p class="tag" style="max-width:40mm;opacity:.85">Um só parceiro para o seu negócio crescer</p>"""),
        "noite", s(f"""<div class="lin entre"><div class="mini"><img src="img/folinha.png" alt="">Cerrado <span style="color:#fecb00">Finanças</span></div><p class="rot">{CIDADE}</p></div>
      <div class="servicos cresce">{lista_sv}<div class="qrbox" style="width:12.5mm;align-self:end;justify-self:end">{qr(url, "#001f5c")}</div></div>
      {contatos(b, ("whats", "email", "site"), cls="ct linha")}"""), nome))

    marca_j = '<div class="mini" style="font-size:20pt;gap:4mm"><img src="img/folinha.png" style="height:16mm" alt="">Cerrado&nbsp;<span style="color:#fecb00">Finanças</span></div>'
    motivo = f'<div class="pilulas" style="gap:3mm;justify-content:center">{"".join(f"<span style=\'font-size:14pt;padding:2mm 6mm\'>{f}</span>" for f in frentes)}</div>'
    j = jornal(marca_j, "Finanças &amp; Tech", "Um só parceiro para o seu negócio <em>crescer.</em>",
               "Software sob medida, contabilidade inteligente, crédito multi bancos e formação prática.",
               ["<b style='font-family:Inter;color:#fff;font-size:16pt'>Fábrica de Software:</b> ERPs, CRMs, IA e dashboards sob medida",
                "<b style='font-family:Inter;color:#fff;font-size:16pt'>Contabilidade:</b> do MEI ao Lucro Presumido",
                "<b style='font-family:Inter;color:#fff;font-size:16pt'>Crédito:</b> uma consulta, vários bancos comparados",
                "<b style='font-family:Inter;color:#fff;font-size:16pt'>Cursos:</b> IA na prática, em turma de até 10 alunos",
                "<b style='font-family:Inter;color:#fff;font-size:16pt'>Consultorias</b> especializadas"],
               motivo, "Fale com a gente pelo WhatsApp", b, url, campos=("whats", "email", "site", "insta", "local"))
    ban = banners('<div class="mini" style="font-size:17px;gap:9px"><img src="img/folinha.png" style="height:52px" alt="">Cerrado <span style="color:#fecb00">Finanças</span></div>',
                  '<div class="mini" style="font-size:15px;gap:8px"><img src="img/folinha.png" style="height:34px" alt="">Cerrado <span style="color:#fecb00">Finanças</span></div>',
                  "Um só parceiro para o seu negócio <em>crescer.</em>", "Software, contabilidade, crédito, cursos e consultorias.",
                  "Fale no WhatsApp")
    vars_ = """.jornal, .b1200, .b300 { --fundo: radial-gradient(circle at 90% 8%, rgba(254,203,0,.30), transparent 40%), linear-gradient(160deg, #001f5c, #000f2e);
  --tinta: #fff; --acento: #fecb00; --acento-texto: #fecb00; --sobre-acento: #001f5c; --linha: rgba(254,203,0,.5);
  --ft: 'Inter'; --ft-peso: 900; --fb: 'Inter'; --fm: 'Inter'; }
.jornal .ct .ico { color: #fecb00; }"""
    return dict(slug="institucional", nome="Cerrado Finanças (institucional)", cor="#001f5c", css=css + vars_,
                head='<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap">',
                pecas="".join(c) + j + ban)


# =========================================================================== 2. Cerrado Tech

def circuito(cor, op=.55):
    caminhos = ["M0 40 H18 L24 34 H44", "M0 46 H30 L36 52 H70 L76 46 H100", "M100 10 H80 L74 16 H58", "M100 22 H86 L80 28 H66",
                "M52 0 V8 L58 14", "M12 56 V50 L18 44 H26", "M88 56 V48 L94 42 H100", "M0 6 H10 L16 12 V20"]
    pontos = [(44, 34), (58, 16), (66, 28), (58, 14), (26, 44), (16, 20), (70, 52)]
    return (f'<svg class="fill" viewBox="0 0 100 56" preserveAspectRatio="none" style="opacity:{op}" aria-hidden="true">'
            + "".join(f'<path d="{p}" fill="none" stroke="{cor}" stroke-width=".35"/>' for p in caminhos)
            + "".join(f'<circle cx="{x}" cy="{y}" r="1" fill="none" stroke="{cor}" stroke-width=".35"/>' for x, y in pontos) + "</svg>")


def tech():
    b = dict(whats=WHATS, email=EMAIL, site="cerradofinancas.com.br/fabrica", insta="@cerradofinancas", local=CIDADE,
             qr_tinta="#001f5c", qr_papel="#ffffff")
    url = "https://www.cerradofinancas.com.br/fabrica"
    nome = "Cerrado Tech"
    css = """
body { font-family: 'Inter', sans-serif; }
.noite { background: #000f2e; color: #fff; }
.az { background: linear-gradient(140deg, #003399, #001f5c 55%, #000f2e); color: #fff; }
.branco { background: #fff; color: #0f172a; }
.ouro { background: #fecb00; color: #001f5c; }
.nome { font-weight: 900; letter-spacing: -.03em; line-height: .95; }
.nome span { color: #fecb00; }
.mono { font-family: 'JetBrains Mono', monospace; }
.rot { font: 600 5.2pt 'JetBrains Mono', monospace; letter-spacing: .08em; color: #fecb00; }
.branco .rot { color: #003399; }
.tag { font-size: 6.4pt; line-height: 1.35; font-weight: 500; }
.ct { font-size: 6.5pt; font-weight: 500; }
.ct .ico { color: #fecb00; }
.branco .ct .ico { color: #003399; }
.kv { font: 500 5.9pt 'JetBrains Mono', monospace; display: grid; gap: .8mm; }
.kv dt { color: #7dd3fc; opacity: 1; min-width: 13mm; }
.kv dd { color: #fde68a; }
.mini { display: flex; align-items: center; gap: 1.6mm; font-weight: 900; font-size: 8pt; letter-spacing: -.02em; }
.mini img { height: 6.5mm; }
.qrbox { background: #fff; padding: 1mm; border-radius: 1.2mm; }
.codigo { font: 500 6.4pt/1.65 'JetBrains Mono', monospace; counter-reset: l; }
.codigo p { counter-increment: l; white-space: nowrap; }
.codigo p::before { content: counter(l); display: inline-block; width: 4mm; color: #475569; }
.codigo .f { color: #7dd3fc; } .codigo .t { color: #fde68a; } .codigo .k { color: #fecb00; }
.n3 { display: grid; gap: 1.6mm; }
.n3 p { display: grid; grid-template-columns: 6mm 1fr; font-size: 7pt; font-weight: 700; line-height: 1.2; }
.n3 b { font: 600 6pt 'JetBrains Mono', monospace; color: #fecb00; }
.pilulas { display: flex; flex-wrap: wrap; gap: 1mm; }
.pilulas span { border: .25mm solid #003399; color: #001f5c; border-radius: 9mm; padding: .45mm 1.7mm; font-size: 5.3pt; font-weight: 700; }
"""
    c = []
    softwares = ["ERPs e CRMs", "IA offline", "E-commerce e vendas", "Compliance e auditoria", "Dashboards e BI", "Cyber security"]
    c.append(cartao(1, "noite", circuito("#fecb00") + s("""<div class="cresce lin" style="justify-content:center;gap:3mm">
      <img src="img/folinha.png" style="height:15mm" alt=""><div><p class="nome" style="font-size:16pt">Cerrado <span>Tech</span></p>
      <p class="rot" style="margin-top:1.4mm">// fábrica de software</p></div></div>
      <p class="tag" style="text-align:center;opacity:.8">Software feito em torno do seu negócio</p>"""),
        "branco", s(f"""<img src="img/logo-tech.png" style="height:9mm;align-self:flex-start" alt="Cerrado Tech">
      <div class="cresce" style="display:flex;flex-direction:column;justify-content:center;gap:1.4mm">
      <p class="rot">// o que a gente constrói</p>
      <div class="pilulas">{''.join(f'<span>{x}</span>' for x in softwares)}</div></div>
      <div class="lin entre fim">{contatos(b)}<div style="width:14mm">{qr(url, "#001f5c")}</div></div>"""), nome))

    marca_j = '<div class="mini" style="font-size:20pt;gap:4mm"><img src="img/folinha.png" style="height:16mm" alt="">Cerrado&nbsp;<span style="color:#fecb00">Tech</span></div>'
    motivo = '<div class="codigo" style="font-size:17pt;line-height:1.7;background:rgba(0,0,0,.25);padding:8mm 12mm;border-radius:4mm;border:.3mm solid rgba(254,203,0,.35)">' \
             '<p><span class="f">fabrica</span>.de(<span class="t">"software"</span>)</p><p>&nbsp;&nbsp;.<span class="f">sobMedida</span>()</p>' \
             '<p>&nbsp;&nbsp;.<span class="f">integraCom</span>([<span class="t">"SAP®"</span>, <span class="t">"TOTVS"</span>, <span class="t">"Power BI"</span>])</p>' \
             '<p>&nbsp;&nbsp;.<span class="f">entrega</span>({ <span class="k">codigo</span>: <span class="t">"é seu"</span> })</p></div>'
    j = jornal(marca_j, "// fábrica de software", "Software feito em torno do <em>seu negócio.</em>",
               "ERPs, CRMs, IA (inclusive offline), e-commerce, compliance e dashboards, para empresas e para a gestão pública.",
               ["100% customizado: cada função nasce de uma necessidade real", "O código é seu, sem amarras de fornecedor",
                "Integra com SAP®, TOTVS, Power BI, bancos e notas fiscais"],
               motivo, "Conte o seu processo pelo WhatsApp", b, url)
    ban = banners('<div class="mini" style="font-size:17px;gap:9px"><img src="img/folinha.png" style="height:52px" alt="">Cerrado <span style="color:#fecb00">Tech</span></div>',
                  '<div class="mini" style="font-size:15px;gap:8px"><img src="img/folinha.png" style="height:34px" alt="">Cerrado <span style="color:#fecb00">Tech</span></div>',
                  "Software feito em torno do <em>seu negócio.</em>", "ERPs, CRMs, IA e dashboards sob medida. O código é seu.",
                  "Conte o seu processo")
    vars_ = """.jornal, .b1200, .b300 { --fundo: linear-gradient(160deg, #001f5c, #000f2e); --tinta: #fff; --acento: #fecb00; --acento-texto: #fecb00;
  --sobre-acento: #001f5c; --linha: rgba(254,203,0,.5); --ft: 'Inter'; --ft-peso: 900; --fb: 'Inter'; --fm: 'JetBrains Mono'; --raio: 8px; }"""
    return dict(slug="tech", nome="Cerrado Tech", cor="#003399", css=css + vars_,
                head='<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap">',
                pecas="".join(c) + j + ban)


# =========================================================================== 3. Cerra.AI

def cerraai():
    b = dict(whats=WHATS, email=EMAIL, site="cerradofinancas.com.br/cerraai", insta="@cerra.ai", local=CIDADE,
             qr_tinta="#0d0f0e", qr_papel="#f1ece3")
    url = "https://www.cerradofinancas.com.br/cerraai"
    nome = "Cerra.AI"
    css = """
body { font-family: 'Archivo', sans-serif; }
.graf { background: #0d0f0e; color: #f1ece3; }
.cobre { background: #e2873b; color: #0d0f0e; }
.clara { background: #f1ece3; color: #0d0f0e; }
.cx { font-weight: 900; font-stretch: 125%; text-transform: uppercase; line-height: .92; letter-spacing: -.01em; }
.cx .c { color: #e2873b; }
.mono { font-family: 'JetBrains Mono', monospace; }
.rot { font: 600 5.2pt 'JetBrains Mono', monospace; letter-spacing: .1em; text-transform: uppercase; color: #e2873b; }
.cobre .rot, .clara .rot { color: #0d0f0e; opacity: .7; }
.sub { color: #a39d93; font-size: 6pt; }
.ct { font: 500 6.1pt 'JetBrains Mono', monospace; }
.ct .ico { color: #e2873b; }
.cobre .ct .ico, .clara .ct .ico { color: #0d0f0e; }
.tarja { display: inline-block; background: #e2873b; height: 1.05em; vertical-align: -0.15em; }
.cita { border-left: .7mm solid #e2873b; padding: .8mm 2mm; font: 500 5.6pt 'JetBrains Mono', monospace; background: rgba(226,135,59,.12); }
.lst { list-style: none; display: grid; gap: 1.3mm; font-size: 6.6pt; font-weight: 600; }
.lst li { display: flex; gap: 1.6mm; align-items: baseline; }
.lst li::before { content: ""; width: 1.4mm; height: 1.4mm; background: #e2873b; flex-shrink: 0; }
.cobre .lst li::before { background: #0d0f0e; }
"""
    def marca(t=9):
        return f'<p class="cx" style="font-size:{t}pt">Cerra<span class="c">.AI</span></p>'
    c = []
    c.append(cartao(1, "graf", '<img src="img/cerraai.png" style="position:absolute;height:48mm;right:-14mm;top:50%;transform:translateY(-50%)" alt="">' + s(f"""
      {marca(8)}<div class="cresce"></div>
      <p class="cx" style="font-size:11pt;max-width:48mm">A IA da empresa, <span class="c">dentro da empresa.</span></p>"""),
        "cobre", s(f"""<div class="lin entre">{marca(10).replace('class="c"', 'style="color:#f1ece3"')}<p class="rot">by Cerrado Tech</p></div>
      <div class="cresce" style="display:flex;flex-direction:column;justify-content:center">
      <ul class="lst"><li>Lê PDF (também escaneado), Word, Excel, áudio e vídeo</li><li>Mostra o arquivo e a página da resposta</li>
      <li>Anonimiza o dado pessoal antes do modelo</li><li>Funciona sem internet, depois de instalado</li></ul></div>
      <div class="lin entre fim">{contatos(b)}<div style="width:16mm">{qr(url, "#0d0f0e", "#f1ece3")}</div></div>"""), nome))

    motivo = ('<div class="mono" style="font-size:20pt;line-height:2;border:.4mm solid #e2873b;padding:8mm 12mm">'
              '<p>Cliente: <span class="tarja" style="width:80mm"></span></p><p>CPF: <span class="tarja" style="width:18mm"></span>.'
              '<span class="tarja" style="width:18mm"></span>.<span class="tarja" style="width:18mm"></span>-<span class="tarja" style="width:12mm"></span></p>'
              '<p class="cita" style="font-size:12pt;margin-top:4mm">Trechos consultados: contrato.pdf (p. 2, 5)</p></div>')
    j = jornal('<div class="lin" style="gap:4mm"><img src="img/cerraai.png" style="height:18mm" alt="">' + marca(26) + '</div>',
               "by Cerrado Tech", "A IA da empresa, <em>dentro da empresa.</em>",
               "Um assistente de inteligência artificial que roda no computador da empresa e responde com base nos seus documentos.",
               ["Lê PDF (também escaneado), Word, Excel, imagens, áudio e vídeo", "Mostra o arquivo e a página de onde tirou a informação",
                "Anonimiza o dado pessoal antes de chegar ao modelo", "Funciona sem internet, depois de instalado"],
               motivo, "Demonstração com os seus documentos", b, url)
    ban = banners('<div class="lin" style="gap:10px"><img src="img/cerraai.png" style="height:56px" alt="">' + marca(15) + '</div>',
                  '<div class="lin" style="gap:8px"><img src="img/cerraai.png" style="height:36px" alt="">' + marca(12) + '</div>',
                  "A IA da empresa, <em>dentro da empresa.</em>", "Responde com base nos seus documentos e funciona sem internet.",
                  "Peça uma demonstração")
    vars_ = """.jornal, .b1200, .b300 { --fundo: #0d0f0e; --tinta: #f1ece3; --acento: #e2873b; --acento-texto: #e2873b; --sobre-acento: #0d0f0e;
  --linha: #e2873b; --ft: 'Archivo'; --ft-peso: 900; --ft-larg: 125%; --ft-caixa: uppercase; --ft-esp: -0.01em; --fb: 'Archivo'; --fm: 'JetBrains Mono'; --raio: 0; }
.jornal h1 { font-size: 44pt; } .b1200 .bt { font-size: 22px; } .b300 .bt { font-size: 21px; }"""
    return dict(slug="cerraai", nome="Cerra.AI", cor="#e2873b", css=css + vars_, head="", pecas="".join(c) + j + ban)


# =========================================================================== 4. CerraClass

CORES_CURSOS = ["#ffc83d", "#4cc274", "#7cc4f0", "#ff9f2e", "#b9a3ff", "#f2684f", "#cbe847", "#3fcfbf", "#ff8fb8", "#8fa6ff", "#ff7a5c", "#9ad65a"]


def cadeira(cor):
    return (f'<svg viewBox="0 0 10 13" style="width:100%"><rect x="2" y=".5" width="6" height="5.2" rx="1" fill="{cor}" stroke="#141414" stroke-width=".5"/>'
            f'<rect x=".8" y="6.2" width="8.4" height="2" rx=".6" fill="{cor}" stroke="#141414" stroke-width=".5"/>'
            '<path d="M2 8.2v4.3M8 8.2v4.3" stroke="#141414" stroke-width=".7"/></svg>')


def cerraclass():
    b = dict(whats=WHATS, site="cerraclass.com.br", insta="@cerraclass", local=CIDADE, qr_tinta="#141414", qr_papel="#ffffff")
    url = "https://cerraclass.com.br"
    nome = "CerraClass"
    css = """
body { font-family: 'Bricolage Grotesque', sans-serif; color: #141414; }
.ipe { background: #ffc83d; } .verde { background: #4cc274; } .lilas { background: #b9a3ff; } .branco { background: #fff; } .ceu { background: #7cc4f0; }
.cx { font-weight: 800; font-stretch: 78%; text-transform: uppercase; line-height: .86; letter-spacing: -.01em; }
.selo { background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: .3mm solid #141414; flex-shrink: 0; }
.selo img { width: 70%; }
.etq { display: inline-block; background: #fff; border: .3mm solid #141414; padding: .7mm 2mm; font-weight: 700; font-size: 6pt; transform: rotate(-4deg); box-shadow: .6mm .6mm 0 #141414; }
.tag { font-size: 6.6pt; font-weight: 600; line-height: 1.3; }
.ct { font-size: 6.6pt; font-weight: 600; }
.cadeiras { display: grid; grid-template-columns: repeat(5, 5mm); gap: 1mm 1.6mm; }
.listras { display: flex; }
.listras i { flex: 1; }
.ingresso { position: absolute; inset: calc(var(--sg) + 3mm) calc(var(--sg) + 3mm); background: #fff; border: .3mm solid #141414; display: flex; }
.ingresso .canhoto { width: 22mm; border-left: .4mm dashed #141414; padding: 2.5mm; display: flex; flex-direction: column; justify-content: center; text-align: center; }
.ingresso .corpo { flex: 1; padding: 2.5mm 3mm; display: flex; flex-direction: column; }
.ingresso::before, .ingresso::after { content: ""; position: absolute; right: 20.6mm; width: 3mm; height: 3mm; border-radius: 50%; background: #ffc83d; border: .3mm solid #141414; }
.ingresso::before { top: -1.6mm; } .ingresso::after { bottom: -1.6mm; }
.regua { position: relative; height: 7mm; border-bottom: .4mm solid #141414; display: flex; justify-content: space-between; }
.regua i { width: .3mm; background: #141414; align-self: flex-end; height: 1.6mm; }
.regua i:nth-child(odd) { height: 3mm; }
.cursos { display: grid; grid-template-columns: 1fr 1fr; column-gap: 3mm; margin-top: 1mm; }
.cursos > div { display: flex; flex-direction: column; gap: .3mm; }
.grp { font-weight: 800; text-transform: uppercase; font-size: 4.6pt; letter-spacing: .06em; border-bottom: .3mm solid #141414; padding-bottom: .4mm; margin-bottom: .6mm; }
.cursos p { font-size: 4.6pt; font-weight: 600; line-height: 1.08; display: flex; gap: 1.1mm; align-items: baseline; }
.cursos i { width: 1.2mm; height: 1.2mm; flex-shrink: 0; transform: translateY(-.35mm); }
"""
    def selo(mm):
        return f'<div class="selo" style="width:{mm}mm;height:{mm}mm"><img src="img/cerraclass.png" alt="CerraClass"></div>'
    listras = '<div class="listras fill" style="top:auto;height:calc(var(--sg) + 3mm)">' + "".join(f'<i style="background:{c_}"></i>' for c_ in CORES_CURSOS) + "</div>"
    c = []
    CURSOS_UM_DIA = [("IA na Gestão", "#ffc83d"), ("Excel com IA", "#4cc274"), ("Consultoria Contábil com IA", "#7cc4f0"),
                     ("Consultoria Financeira com IA", "#ff9f2e"), ("Introdução à Análise de Dados", "#b9a3ff"),
                     ("Processos Empresariais BPMN com IA", "#f2684f"), ("Introdução à Automação com IA", "#cbe847")]
    CURSOS_IMERSAO = [("Ciência de Dados Aplicada", "#3fcfbf"), ("IA na Farma", "#ff8fb8"),
                      ("BI e Dashboards com IA", "#8fa6ff"), ("Prototipação de Apps com IA", "#ff7a5c")]

    def lista_cursos(itens):
        return "".join(f'<p><i style="background:{cor}"></i>{escape(t)}</p>' for t, cor in itens)

    # frente: o que é a escola e como funciona; verso: todos os cursos + como agendar (in company ou na escola)
    c.append(cartao(1, "ipe", '<div class="listras fill" style="top:auto;height:calc(var(--sg) + 2.6mm)">'
                    + "".join(f'<i style="background:{c_}"></i>' for c_ in CORES_CURSOS) + "</div>"
                    + s(f"""<div class="lin" style="gap:3.4mm;align-items:center">{selo(20)}<div>
      <p class="cx" style="font-size:21pt">CerraClass</p>
      <p class="tag" style="margin-top:.8mm">Escola de IA e tecnologia · Cuiabá</p></div></div>
      <div class="cresce"></div>
      <p class="cx" style="font-size:13pt;max-width:64mm">Aprenda IA com quem constrói software.</p>
      <p class="tag" style="margin-top:1.6mm;font-size:6.1pt">Cursos presenciais e 100% práticos, no seu notebook, com problemas reais. Turma de até 10 alunos e certificado com validação.</p>
      <div class="lin entre" style="margin-top:1.8mm;align-items:flex-end"><p class="tag" style="font-size:6.2pt"><b>In company</b> no seu time<br>ou <b>na escola</b>, em Cuiabá</p>
      <div class="cadeiras" style="grid-template-columns:repeat(10,3mm);gap:.7mm">{''.join(cadeira(CORES_CURSOS[i + 1]) for i in range(10))}</div></div>"""),
        "branco", listras + s(f"""<div class="lin entre"><div><p class="cx" style="font-size:12pt">CerraClass</p>
      <p class="tag" style="font-size:5.6pt">11 cursos presenciais, em Cuiabá</p></div>{selo(9)}</div>
      <div class="cursos">
      <div><p class="grp">Um dia · sábado, 8h</p>{lista_cursos(CURSOS_UM_DIA)}</div>
      <div><p class="grp">Imersão · 4 encontros, 22h</p>{lista_cursos(CURSOS_IMERSAO)}</div></div>
      <div class="cresce"></div>
      <p class="tag" style="font-size:5.8pt"><b>Na escola</b>, em Cuiabá, ou <b>in company</b> no seu time.</p>
      <div class="lin entre fim" style="margin-top:1mm">{contatos(b, ("whats", "site", "insta"))}<div style="width:10mm;border:.3mm solid #141414">{qr(url, "#141414")}</div></div>"""), nome))

    motivo = f'<div style="display:grid;grid-template-columns:repeat(5,24mm);gap:5mm 8mm">{"".join(cadeira(CORES_CURSOS[i + 1]) for i in range(10))}</div>'
    j = jornal(f'<div class="lin" style="gap:4mm">{selo(20)}<p class="cx" style="font-size:30pt">CerraClass</p></div>',
               "Cursos presenciais", "Aprenda IA com quem <em>constrói software.</em>",
               "Treinamentos presenciais e 100% práticos de Inteligência Artificial e tecnologia, para profissionais e empresas.",
               ["Turma de até 10 alunos", "Você sai com algo funcionando", "Nenhuma linha de código exigida",
                "IA na Prática, IA em Ação Farma, 11 cursos presenciais e turmas in company"],
               motivo, "Agenda e inscrições: cerraclass.com.br", b, url, campos=("whats", "site", "insta", "local"))
    ban = banners(f'<div class="lin" style="gap:10px">{selo(15).replace("15mm", "58px")}<p class="cx" style="font-size:30px">CerraClass</p></div>',
                  f'<div class="lin" style="gap:8px">{selo(10).replace("10mm", "38px")}<p class="cx" style="font-size:22px">CerraClass</p></div>',
                  "Aprenda IA com quem <em>constrói software.</em>", "Cursos presenciais, práticos, em turma de até 10 alunos.",
                  "Veja as turmas")
    vars_ = """.jornal, .b1200, .b300 { --fundo: #ffc83d; --tinta: #141414; --acento: #141414; --acento-texto: #141414; --sobre-acento: #ffc83d;
  --linha: #141414; --ft: 'Bricolage Grotesque'; --ft-peso: 800; --ft-larg: 78%; --ft-caixa: uppercase; --ft-esp: -0.01em; --fb: 'Bricolage Grotesque'; --fm: 'Bricolage Grotesque'; }
.jornal h1 { font-size: 64pt; line-height: .88; } .jornal h1 em { background: #fff; padding: 0 2mm; box-shadow: 1.2mm 1.2mm 0 #141414; }
.b1200 .bt { font-size: 32px; line-height: .9; } .b300 .bt { font-size: 33px; line-height: .88; } .jornal .j-lista li b { font-weight: 800; }"""
    return dict(slug="cerraclass", nome="CerraClass", cor="#ffc83d", css=css + vars_, head="", pecas="".join(c) + j + ban)


# =========================================================================== 5. Crédito

def credito():
    b = dict(whats=WHATS, email=EMAIL, site="cerradofinancas.com.br/credito", insta="@cerradofinancas", local=CIDADE,
             qr_tinta="#111522", qr_papel="#ffffff")
    url = "https://www.cerradofinancas.com.br/credito/"
    nome = "Crédito"
    css = """
body { font-family: 'Schibsted Grotesk', sans-serif; color: #111522; }
.papel { background: #fbfbf8; } .caneta { background: #1f3ae0; color: #fff; }
.t { font-weight: 900; letter-spacing: -.03em; line-height: .95; }
.grifo { background: linear-gradient(transparent 12%, #e6ff3d 12%, #e6ff3d 88%, transparent 88%); padding: 0 .6mm; color: #111522; }
.rubrica { font-family: 'Caveat', cursive; font-weight: 700; color: #1f3ae0; }
.caneta .rubrica { color: #e6ff3d; }
.rot { font-size: 5.4pt; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; color: #1f3ae0; }
.caneta .rot { color: #e6ff3d; }
.ct { font-size: 6.3pt; font-weight: 600; }
.ct .ico { color: #1f3ae0; } .caneta .ct .ico { color: #e6ff3d; }
.miuda { font-size: 4.7pt; line-height: 1.3; color: #6b7080; }
.caneta .miuda { color: rgba(255,255,255,.78); }
.mini { display: flex; align-items: center; gap: 1.4mm; font-weight: 900; font-size: 7.4pt; letter-spacing: -.02em; }
.mini img { height: 6mm; } .mini small { font-weight: 600; color: #6b7080; font-size: 6pt; letter-spacing: 0; }
.caneta .mini small { color: rgba(255,255,255,.75); }
.assina { display: flex; align-items: flex-end; gap: 1.4mm; }
.assina b { font-size: 9pt; color: #1f3ae0; }
.assina span { flex: 1; border-bottom: .3mm solid #111522; position: relative; height: 6mm; }
.assina span .rubrica { position: absolute; left: 3mm; bottom: -.6mm; font-size: 15pt; transform: rotate(-4deg); }
.tab { width: 100%; border-collapse: collapse; font-size: 6pt; }
.tab td { border-bottom: .25mm solid #d6d8de; padding: .9mm .6mm; }
.tab td:last-child { width: 55%; }
.tab .bar { height: 1.6mm; background: #c7cad3; border-radius: 1mm; }
.tab tr.top td { background: #e6ff3d; font-weight: 800; }
.tab tr.top .bar { background: #1f3ae0; }
.par { display: grid; gap: 1.6mm; }
.par p { display: grid; grid-template-columns: 6mm 1fr; font-size: 8pt; font-weight: 800; line-height: 1.15; }
.par b { color: #e6ff3d; }
.qrb { background: #fff; padding: .8mm; }
.serv { display: grid; grid-template-columns: 1fr 1fr; gap: 1.6mm 3.4mm; margin-top: 1.2mm; }
.serv > div { font-size: 4.7pt; line-height: 1.22; }
.serv b { display: block; font-size: 6pt; font-weight: 800; color: #1f3ae0; line-height: 1.1; }
.serv span { display: block; font-size: 4.7pt; line-height: 1.22; color: #3f4555; }
.miuda { font-size: 4.4pt; line-height: 1.25; }
"""
    av = f'<p class="miuda">{escape(AVISO_CREDITO)}</p>'
    mini = '<div class="mini"><img src="img/folinha.png" style="height:5mm" alt="">Cerrado Finanças <small>· Crédito</small></div>'
    c = []
    servicos = [("Empréstimos", "pessoal, capital de giro e com garantia"),
                ("Consignado", "aposentados, pensionistas e servidores; portabilidade e refinanciamento"),
                ("Financiamento", "imóveis, veículos, máquinas e equipamentos"),
                ("Seguros e consórcios", "proteção e planejamento para o seu patrimônio")]
    serv = "".join(f'<div><b>{t}</b><span>{d}</span></div>' for t, d in servicos)

    # frente: o que é o serviço; verso: todos os serviços englobados + como falar com a gente + aviso legal
    c.append(cartao(1, "papel", s(f"""{mini}
      <div class="cresce lin"><div>
      <p class="t" style="font-size:17pt">Crédito e seguros,<br>para pessoa e empresa.</p>
      <p style="font-size:7pt;font-weight:700;margin-top:2mm;line-height:1.3">Empréstimos, consignado, financiamento, seguros e consórcios. <span class="grifo">Uma consulta só, vários bancos comparados.</span></p></div></div>
      <div class="assina"><b>X</b><span><i class="rubrica">Você decide</i></span></div>
      <p class="miuda" style="margin-top:1.2mm">Correspondente bancário em parceria com a LS Intermediação Financeira.</p>"""),
        "papel", s(f"""{mini}
      <p class="rot" style="margin-top:1.2mm">Serviços englobados</p>
      <div class="serv">{serv}</div>
      <div class="cresce"></div>
      <p class="t" style="font-size:8.4pt;margin-top:2mm">Simulação gratuita e <span class="grifo">sem compromisso.</span></p>
      <div class="lin entre fim" style="margin-top:1.4mm">{contatos(b, ("whats", "email", "site"))}<div style="width:10mm">{qr(url, "#111522")}</div></div>
      <div style="margin-top:1.4mm">{av}</div>"""), nome))

    motivo = ('<div style="width:100%"><table class="tab" style="font-size:15pt"><tr><td>Proposta A</td><td><div class="bar" style="width:85%;height:5mm"></div></td></tr>'
              '<tr><td>Proposta B</td><td><div class="bar" style="width:70%;height:5mm"></div></td></tr>'
              '<tr class="top"><td>Proposta C ✓</td><td><div class="bar" style="width:52%;height:5mm"></div></td></tr></table>'
              '<div class="assina" style="margin-top:12mm"><b style="font-size:26pt">X</b><span style="height:18mm"><i class="rubrica" style="font-size:44pt;left:10mm">Você decide</i></span></div></div>')
    j = jornal('<div class="mini" style="font-size:18pt;gap:4mm"><img src="img/folinha.png" style="height:15mm" alt="">Cerrado Finanças <small style="font-size:14pt">· Crédito</small></div>',
               "Crédito multi bancos", "Antes de assinar, <em>compare.</em>",
               "Você faz uma consulta só e nós comparamos as condições de vários bancos.",
               ["Empréstimos pessoais, capital de giro e com garantia",
                "Consignado para aposentados, pensionistas e servidores, com portabilidade e refinanciamento",
                "Financiamento de imóveis, veículos, máquinas e equipamentos", "Seguros e consórcios"],
               motivo, "Simulação gratuita e sem compromisso", b, url, aviso=AVISO_CREDITO)
    ban = banners('<div class="mini" style="font-size:15px;gap:8px"><img src="img/folinha.png" style="height:46px" alt="">Cerrado Finanças <small style="font-size:12px">· Crédito</small></div>',
                  '<div class="mini" style="font-size:13px;gap:7px"><img src="img/folinha.png" style="height:30px" alt="">Cerrado Finanças <small style="font-size:11px">· Crédito</small></div>',
                  "Antes de assinar, <em>compare.</em>", "Uma consulta só, vários bancos comparados.", "Simule grátis", aviso=AVISO_CREDITO)
    vars_ = """.jornal, .b1200, .b300 { --fundo: #fbfbf8; --tinta: #111522; --acento: #1f3ae0; --acento-texto: #1f3ae0; --sobre-acento: #fff;
  --linha: #111522; --ft: 'Schibsted Grotesk'; --ft-peso: 900; --fb: 'Schibsted Grotesk'; --fm: 'Schibsted Grotesk'; --raio: 4px; }
.jornal h1 em, .b1200 .bt em, .b300 .bt em { color: #111522; background: linear-gradient(transparent 14%, #e6ff3d 14%, #e6ff3d 86%, transparent 86%); }
.jornal .j-lista li b { font-weight: 800; } .b1200 .bt { font-size: 25px; } .b1200 { padding-bottom: 10px; } .b300 .bt { font-size: 28px; }"""
    return dict(slug="credito", nome="Crédito", cor="#1f3ae0", css=css + vars_, head="", pecas="".join(c) + j + ban)


# =========================================================================== 6. Contabilidade

def contabilidade():
    b = dict(whats=WHATS, email=EMAIL, site="cerradofinancas.com.br/contabilidade", insta="@cerradofinancas", local=CIDADE,
             qr_tinta="#0c3b2e", qr_papel="#ffffff")
    url = "https://www.cerradofinancas.com.br/contabilidade"
    nome = "Contabilidade"
    css = """
body { font-family: 'Plex Cond', sans-serif; color: #0c3b2e; }
.razao { background: repeating-linear-gradient(transparent 0 3.6mm, #cfe0d4 3.6mm 3.85mm) #f1f6f0; }
.razao.margem::after { content: ""; position: absolute; top: 0; bottom: 0; left: calc(var(--sg) + 7mm); width: .3mm; background: #d23a2c; opacity: .8; }
.tinta { background: #0c3b2e; color: #f1f6f0; }
.t { font-weight: 700; line-height: .95; letter-spacing: -.01em; }
.mono { font-family: 'Plex Mono', monospace; }
.rot { font: 600 5.2pt 'Plex Mono', monospace; letter-spacing: .1em; text-transform: uppercase; color: #d23a2c; }
.tinta .rot { color: #d8efdf; }
.grifo { background: #d8efdf; padding: 0 .6mm; color: #0c3b2e; }
.ct { font: 500 6.2pt 'Plex Mono', monospace; }
.ct .ico { color: #d23a2c; } .tinta .ct .ico { color: #d8efdf; }
.mini { display: flex; align-items: center; gap: 1.4mm; font-weight: 700; font-size: 7.6pt; }
.mini img { height: 6mm; }
.livro { font: 500 6pt 'Plex Mono', monospace; display: grid; gap: .55mm; width: 100%; }
.livro div { display: flex; gap: 1mm; align-items: baseline; }
.livro div::after { content: ""; order: 1; flex: 1; border-bottom: .25mm dotted #0c3b2e; opacity: .5; }
.livro dt { order: 0; color: #d23a2c; } .livro dd { order: 2; }
.razonete { display: grid; grid-template-columns: 1fr 1fr; border-top: .5mm solid currentColor; }
.razonete > div { padding: 1.4mm 2mm 0; }
.razonete > div + div { border-left: .5mm solid currentColor; }
.razonete h4 { font: 600 5.4pt 'Plex Mono', monospace; letter-spacing: .08em; margin-bottom: 1mm; }
.razonete p { font-size: 7.8pt; font-weight: 700; line-height: 1.12; }
.carimbo { display: inline-block; border: .6mm double #d23a2c; color: #d23a2c; font: 600 13pt 'Plex Mono', monospace; padding: .8mm 3mm; transform: rotate(-9deg); letter-spacing: .08em; outline: .35mm solid #d23a2c; outline-offset: .6mm; opacity: .92; }
.escada { display: flex; align-items: flex-end; gap: .8mm; height: 15mm; }
.escada div { flex: 1; background: #0c3b2e; color: #f1f6f0; font: 600 4.9pt 'Plex Mono', monospace; padding: .8mm; display: flex; align-items: flex-start; }
.escada div:last-child { background: #d23a2c; }
"""
    mini = '<div class="mini"><img src="img/folinha.png" alt="">Cerrado Contabilidade</div>'
    livro = ('<dl class="livro">' + "".join(f"<div><dt>{k}</dt><dd>{escape(v)}</dd></div>" for k, v in
             [("WhatsApp", WHATS), ("E-mail", EMAIL), ("Site", b["site"]), ("Instagram", b["insta"])]) + "</dl>")
    c = []
    # ---- os cartões (22/11/2026): o contador responsável (foto, nome e CRC) e o escritório certo para cada tipo de empresa ----
    # Serviços e perfis: contabilidade.html ("Para quem é", serviços); Fator R e a escada: brand/contabilidade/README.md.
    contador = "Renato Rosa"
    crc = "CRC-MT 021719/O-5"
    zap = f'<ul class="ct">{"".join(f"<li>{ico(k)}<span>{escape(v)}</span></li>" for k, v in [("whats", WHATS), ("site", b["site"])])}</ul>'
    css += """
.rt-nome { font-weight: 700; line-height: .98; letter-spacing: -.012em; }
.rt-crc { display: inline-flex; align-items: center; gap: 1.2mm; font: 600 6.2pt 'Plex Mono', monospace; letter-spacing: .04em; border: .3mm solid currentColor; padding: .7mm 1.6mm; border-radius: .6mm; }
.rt-crc b { font-weight: 600; color: #d23a2c; }
.tinta .rt-crc b { color: #fecb00; }
.rt-3x4 { width: 14mm; height: 18mm; flex-shrink: 0; border: .45mm solid #0c3b2e; padding: .7mm; background: #fff; transform: rotate(-2deg); box-shadow: .4mm .6mm 0 rgba(12,59,46,.18); }
.rt-3x4 img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 22%; }
.rt-foto { border-radius: 50%; overflow: hidden; flex-shrink: 0; }
.rt-foto img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 18%; }
.lanc { width: 100%; font-size: 6.9pt; display: grid; gap: .9mm; }
.lanc div { display: flex; align-items: baseline; gap: 1.2mm; }
.lanc div::after { content: ""; order: 1; flex: 1; border-bottom: .25mm dotted #0c3b2e; opacity: .45; }
.lanc span { order: 0; font-weight: 700; }
.lanc em { order: 2; font: 600 5.2pt 'Plex Mono', monospace; font-style: normal; color: #d23a2c; letter-spacing: .06em; }
.perfis { display: grid; grid-template-columns: 1fr 1fr; gap: 1.6mm 3mm; width: 100%; }
.perfis div { display: flex; gap: 1.4mm; align-items: flex-start; }
.perfis i { width: 3mm; height: 3mm; border: .35mm solid #0c3b2e; border-radius: .4mm; flex-shrink: 0; margin-top: .3mm; }
.perfis b { display: block; font-size: 7pt; line-height: 1; white-space: nowrap; }
.perfis small { display: block; font: 500 5.3pt 'Plex Mono', monospace; color: #3d6b58; margin-top: .5mm; line-height: 1.15; }
.perfis4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2mm; margin-top: 3mm; text-align: center; }
.perfis4 div { display: flex; flex-direction: column; align-items: center; }
.perfis4 i { width: 3.2mm; height: 3.2mm; border: .35mm solid #0c3b2e; border-radius: .4mm; margin-bottom: 1.1mm; }
.perfis4 b { font-size: 6.6pt; line-height: 1.05; }
.perfis4 small { font: 500 4.9pt 'Plex Mono', monospace; color: #3d6b58; margin-top: .6mm; line-height: 1.2; }
.lista-emp { flex: 1; display: grid; gap: 1.5mm; }
.lista-emp div { display: flex; align-items: baseline; gap: 1.6mm; border-bottom: .2mm solid rgba(216,239,223,.25); padding-bottom: 1.1mm; }
.lista-emp i { width: 2.8mm; height: 2.8mm; border: .35mm solid #d8efdf; border-radius: .4mm; flex-shrink: 0; align-self: center; }
.lista-emp b { font-size: 7pt; white-space: nowrap; }
.lista-emp small { font: 500 5.2pt 'Plex Mono', monospace; color: #d8efdf; margin-left: auto; white-space: nowrap; }
"""
    # o verso aprovado pelo Renato (22/11): "Qual é a sua empresa?" com caixas para marcar à mão; é o mesmo nas três versões
    verso_empresa = s(f"""<div style="margin-left:5mm;display:flex;flex-direction:column;height:100%"><div class="lin entre"><p class="t" style="font-size:10.5pt">Qual é a sua empresa?</p>{mini}</div>
      <div class="lin" style="gap:3mm;margin-top:2.4mm"><div class="perfis">
        <div><i></i><span><b>MEI</b><small>abertura, DAS e declaração anual</small></span></div>
        <div><i></i><span><b>Prestador de serviço</b><small>Simples Nacional e Fator R</small></span></div>
        <div><i></i><span><b>Saúde</b><small>clínicas e consultórios, Fator R</small></span></div>
        <div><i></i><span><b>Comércio e e-commerce</b><small>notas, ICMS e ST</small></span></div></div>
        <div style="width:13mm;flex-shrink:0">{qr(url, "#0c3b2e")}</div></div>
      <div class="cresce"></div><div class="lin entre fim">{zap}<p class="mono" style="font-size:5.2pt;text-align:right">{escape(contador)}<br>{crc}</p></div></div>""")
    PERFIS = [("MEI", "abertura, DAS e declaração anual"), ("Prestador de serviço", "Simples Nacional e Fator R"),
              ("Saúde", "clínicas e consultórios, Fator R"), ("Comércio e e‑commerce", "notas, ICMS e ST")]  # hífen inseparável
    # verso v2 · centrado, como a frente "Perfil": quatro colunas com a caixa em cima
    verso_colunas = s(f"""<div style="display:flex;flex-direction:column;height:100%">
      <div style="text-align:center"><p class="t lin" style="font-size:10.5pt;justify-content:center;gap:1.6mm"><img src="img/folinha.png" style="height:5.2mm" alt="">Qual é a sua empresa?</p>
        <p class="mono" style="font-size:5.2pt;margin-top:.8mm;color:#3d6b58">{escape(contador)} · {crc}</p></div>
      <div class="perfis4">{"".join(f'<div><i></i><b>{escape(n)}</b><small>{escape(d)}</small></div>' for n, d in PERFIS)}</div>
      <div class="cresce"></div>
      <div class="lin entre fim">{zap}<div style="width:12mm;flex-shrink:0">{qr(url, "#0c3b2e")}</div></div></div>""")
    # verso v3 · verde-tinta, como a frente "Tinta": lista de uma linha por empresa e o QR numa cartela clara
    verso_lista = s(f"""<div class="lin entre" style="align-items:flex-start"><p class="t" style="font-size:10.5pt">Qual é a sua empresa?</p>
        <div class="mini" style="color:#f1f6f0"><img src="img/folinha.png" alt="">Cerrado Contabilidade</div></div>
      <div class="cresce lin" style="gap:3.5mm"><div class="lista-emp">{"".join(f'<div><i></i><b>{escape(n)}</b><small>{escape(d)}</small></div>' for n, d in PERFIS)}</div>
        <div style="width:14mm;flex-shrink:0;background:#f1f6f0;padding:.8mm;border-radius:.6mm">{qr(url, "#0c3b2e", "#f1f6f0")}</div></div>
      <div class="lin entre fim">{zap.replace('class="ct"', 'class="ct" style="color:#f1f6f0"')}<p class="mono" style="font-size:5.2pt;text-align:right;color:#d8efdf">{escape(contador)}<br>{crc}</p></div>""")
    # v1 · "Ficha": a fotinha 3x4 presa na ficha do livro-razão, ao lado do nome e do CRC
    c.append(cartao(1, "razao margem", s(f"""<div style="margin-left:5mm;display:flex;flex-direction:column;height:100%">
      <div class="lin entre"><p class="rot">Contador responsável</p><p class="rot" style="color:#0c3b2e">fl. 01</p></div>
      <div class="cresce lin" style="gap:4.5mm">
        <div class="rt-3x4"><img src="img/renato-foto.jpg" alt=""></div>
        <div><p class="rt-nome" style="font-size:17pt">Renato Rosa</p>
          <p style="font-size:8pt;font-weight:500;margin-top:1.2mm">Contador</p>
          <p style="margin-top:2.4mm"><span class="rt-crc"><b>CRC</b> MT 021719/O-5</span></p></div></div>
      <div class="lin">{mini}</div></div>"""),
        "razao margem", verso_empresa, nome))
    # v2 · "Perfil": composição centrada e simétrica; a fotinha (13 mm) no eixo do nome, nunca solta num canto
    c.append(cartao(2, "razao", s(f"""<div style="display:flex;flex-direction:column;align-items:center;height:100%;text-align:center">
        <div class="rt-foto" style="width:13mm;height:13mm;border:.5mm solid #0c3b2e;outline:.3mm solid #d23a2c;outline-offset:.6mm"><img src="img/renato-foto.jpg" alt=""></div>
        <p class="rt-nome" style="font-size:17pt;margin-top:2.4mm">Renato Rosa</p>
        <p style="font-size:7.6pt;font-weight:500;margin-top:.8mm">Contador</p>
        <p style="margin-top:1.8mm"><span class="rt-crc"><b>CRC</b> MT 021719/O-5</span></p>
        <div class="cresce"></div>{mini}</div>"""),
        "razao", verso_colunas, nome))
    # v3 · "Tinta": fotinha e nome em linha no verde-tinta, com o carimbo EM DIA
    c.append(cartao(3, "tinta", s(f"""<div class="lin entre" style="align-items:flex-start"><p class="rot" style="margin-top:1mm">Contador responsável</p>
        <span class="carimbo" style="font-size:6.4pt;padding:.3mm 1.4mm;color:#fecb00;border-color:#fecb00;outline-color:#fecb00">EM DIA</span></div>
      <div class="cresce lin" style="gap:3.5mm">
        <div class="rt-foto" style="width:13mm;height:13mm;border:.5mm solid #d8efdf"><img src="img/renato-foto.jpg" alt=""></div>
        <div><p class="rt-nome" style="font-size:18pt">Renato Rosa</p>
          <p style="margin-top:2.2mm"><span class="rt-crc"><b>CRC</b> MT 021719/O-5</span></p></div></div>
      <div class="lin entre"><div class="mini" style="color:#f1f6f0"><img src="img/folinha.png" alt="">Cerrado Contabilidade</div><p class="mono" style="font-size:5.4pt;color:#d8efdf">Suporte direto no WhatsApp</p></div>"""),
        "tinta", verso_lista, nome))

    motivo = ('<div class="razonete" style="width:100%;border-top-width:1.2mm"><div style="padding:5mm 7mm 0"><h4 style="font-size:12pt">VOCÊ CUIDA DE</h4>'
              '<p style="font-size:22pt">o seu negócio</p></div><div style="padding:5mm 7mm 0;border-left-width:1.2mm"><h4 style="font-size:12pt">A GENTE CUIDA DE</h4>'
              '<p style="font-size:22pt">impostos, folha e declarações</p></div></div>')
    j = jornal(f'<div class="mini" style="font-size:19pt;gap:4mm"><img src="img/folinha.png" style="height:15mm" alt="">Cerrado Contabilidade</div>',
               "Inteligência fiscal", "Seu contador te ajuda a decidir ou <em>só a pagar imposto?</em>",
               "Burocracia é com a gente, e os seus números viram decisão.",
               ["Abertura de CNPJ rápida e 100% digital", "Gestão tributária: Simples Nacional, notas e declarações em dia",
                "Folha de pagamento e eSocial", "Suporte humano direto no WhatsApp",
                "Migração da contabilidade atual, transparente e digital"],
               motivo, "Fale com a gente pelo WhatsApp", b, url)
    ban = banners('<div class="mini" style="font-size:16px;gap:8px"><img src="img/folinha.png" style="height:46px" alt="">Cerrado Contabilidade</div>',
                  '<div class="mini" style="font-size:14px;gap:7px"><img src="img/folinha.png" style="height:30px" alt="">Cerrado Contabilidade</div>',
                  "Os seus números viram <em>decisão.</em>", "Abertura de CNPJ, impostos, folha e declarações em dia.", "Fale com um contador")
    vars_ = """.jornal, .b1200, .b300 { --fundo: repeating-linear-gradient(transparent 0 9mm, #cfe0d4 9mm 9.3mm) #f1f6f0; --tinta: #0c3b2e; --acento: #0c3b2e; --acento-texto: #d23a2c;
  --sobre-acento: #f1f6f0; --linha: #0c3b2e; --ft: 'Plex Cond'; --ft-peso: 700; --fb: 'Plex Cond'; --fm: 'Plex Mono'; --raio: 2px; }
.b1200, .b300 { --fundo: repeating-linear-gradient(transparent 0 16px, #cfe0d4 16px 17px) #f1f6f0; }"""
    return dict(slug="contabilidade", nome="Contabilidade", cor="#0c3b2e", css=css + vars_, head="", pecas="".join(c) + j + ban)


# =========================================================================== 7. Consultorias

CONSULTORIAS = ["CSC Strategy", "BPO financeiro", "Controladoria estruturada", "Governança, risco e compliance",
                "Planejamento tributário e inovação", "Consultoria GovTech", "Venture building"]


def consultorias():
    b = dict(whats=WHATS, email=EMAIL, site="cerradofinancas.com.br/consultorias", insta="@cerradofinancas", local=CIDADE,
             qr_tinta="#23262b", qr_papel="#ffffff")
    url = "https://www.cerradofinancas.com.br/consultorias"
    nome = "Consultorias"
    css = """
body { font-family: 'Instrument Sans', sans-serif; color: #23262b; }
.vegetal { background: linear-gradient(rgba(35,38,43,.08) .2mm, transparent .2mm) 0 0 / 5mm 5mm, linear-gradient(90deg, rgba(35,38,43,.08) .2mm, transparent .2mm) 0 0 / 5mm 5mm, #f3f0e8; }
.grafite { background: linear-gradient(rgba(243,240,232,.07) .2mm, transparent .2mm) 0 0 / 5mm 5mm, linear-gradient(90deg, rgba(243,240,232,.07) .2mm, transparent .2mm) 0 0 / 5mm 5mm, #23262b; color: #f3f0e8; }
.t { font-family: 'Fraunces', serif; font-weight: 600; line-height: .98; letter-spacing: -.01em; }
.t em { font-weight: 400; font-style: italic; color: #e4570e; }
.mono { font-family: 'DM Mono', monospace; }
.rot { font: 500 5.2pt 'DM Mono', monospace; letter-spacing: .1em; text-transform: uppercase; color: #e4570e; }
.ct { font-size: 6.4pt; }
.ct .ico { color: #e4570e; }
.mini { display: flex; align-items: center; gap: 1.4mm; font: 600 7pt 'Instrument Sans'; }
.mini img { height: 6mm; }
.carimbo { display: grid; grid-template-columns: 1fr auto auto; border: .3mm solid currentColor; font: 500 4.9pt 'DM Mono', monospace; text-transform: uppercase; letter-spacing: .06em; }
.carimbo span { padding: .8mm 1.4mm; } .carimbo span + span { border-left: .3mm solid currentColor; }
.lista7 { list-style: none; font: 500 5.4pt 'DM Mono', monospace; display: grid; grid-template-columns: 1fr 1fr; gap: .7mm 3mm; }
.lista7 b { color: #e4570e; font-weight: 500; margin-right: 1mm; }
.lista11 { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: .8mm 3mm; font: 500 5.2pt 'DM Mono', monospace; align-content: start; }
.lista11 li { display: flex; gap: 1.2mm; align-items: baseline; }
.lista11 b { color: #e4570e; font-weight: 500; }
.cota { position: relative; height: 5mm; display: flex; align-items: center; justify-content: center; }
.cota::before { content: ""; position: absolute; left: 0; right: 0; top: 50%; border-top: .3mm solid #e4570e; }
.cota i { position: absolute; top: 0; bottom: 0; width: .3mm; background: #e4570e; } .cota i:first-child { left: 0; } .cota i:last-child { right: 0; }
.cota span { position: relative; background: #f3f0e8; padding: 0 1.6mm; font: 500 5.4pt 'DM Mono', monospace; color: #e4570e; letter-spacing: .08em; }
.org rect { fill: #f3f0e8; stroke: #23262b; stroke-width: .3; } .org path { stroke: #23262b; stroke-width: .3; fill: none; } .org rect.d { fill: #e4570e; stroke: #e4570e; }
"""
    mini = '<div class="mini"><img src="img/folinha.png" alt="">Cerrado Finanças · Consultoria</div>'
    l7 = '<ul class="lista7">' + "".join(f"<li><b>{i + 1:02d}</b>{escape(n)}</li>" for i, n in enumerate(CONSULTORIAS)) + "</ul>"
    selo_svg = ('<svg viewBox="0 0 100 100" style="width:100%"><defs><path id="circ" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0"/></defs>'
                '<circle cx="50" cy="50" r="48" fill="none" stroke="#e4570e" stroke-width="1.6"/><circle cx="50" cy="50" r="29" fill="none" stroke="#e4570e" stroke-width=".8"/>'
                '<text font-family="DM Mono" font-size="8.6" fill="#e4570e"><textPath href="#circ" textLength="236" lengthAdjust="spacing">DIAGNÓSTICO GRATUITO · DIAGNÓSTICO GRATUITO ·</textPath></text>'
                '<text x="50" y="57" text-anchor="middle" font-family="Fraunces" font-style="italic" font-size="20" fill="#e4570e">grátis</text></svg>')
    org = ('<svg class="org" viewBox="0 0 80 30" style="width:100%"><rect class="d" x="32" y="1" width="16" height="7"/>'
           '<path d="M40 8v5M14 13h52M14 13v4M40 13v4M66 13v4M40 24v3M30 27h20"/>'
           '<rect x="5" y="17" width="18" height="7"/><rect x="31" y="17" width="18" height="7"/><rect x="57" y="17" width="18" height="7"/></svg>')
    c = []
    consultas = [("01", "CSC Strategy"), ("02", "BPO financeiro"), ("03", "Controladoria estruturada"),
                 ("04", "Planejamento tributário e inovação"), ("05", "Governança, risco e compliance"),
                 ("06", "Venture building"), ("07", "Consultoria GovTech"), ("08", "Web3 e blockchain"),
                 ("09", "Engenharia de software"), ("10", "Contabilidade digital"), ("11", "Implementação B2B")]
    l11 = "".join(f"<li><b>{n}</b>{escape(t)}</li>" for n, t in consultas)

    # frente: o que é a consultoria; verso: as 11 linhas + como funciona + diagnóstico gratuito e contato
    c.append(cartao(1, "vegetal", s(f"""{mini}
      <div class="cresce lin"><div><p class="t" style="font-size:17pt">A estrutura da empresa, <em>redesenhada</em></p>
      <p style="font-size:6.4pt;margin-top:2mm;max-width:58mm">Do CSC ao venture building, para empresas e para a gestão pública.</p></div></div>
      <div class="cota"><i></i><span>DIAGNÓSTICO GRATUITO</span><i></i></div>
      <div class="carimbo"><span>Cerrado Finanças · Consultoria</span><span>Prancha 01/11</span><span>{CIDADE}</span></div>"""),
        "grafite", s(f"""<div class="carimbo"><span>O que fazemos</span><span>11 consultorias</span><span>Esc. 1:1</span></div>
      <ul class="lista11 cresce">{l11}</ul>
      <p class="tag" style="font-size:5.4pt"><b>Como funciona:</b> diagnóstico gratuito → roadmap → implantação com o seu time → acompanhamento por indicadores.</p>
      <div class="lin entre fim" style="margin-top:1.4mm">{contatos(b, ("whats", "email", "site"))}<div style="width:10mm">{qr(url, "#23262b")}</div></div>"""), nome))

    motivo = f'<div style="display:flex;gap:16mm;align-items:center;width:100%"><div style="flex:1">{org}</div><div style="width:58mm;transform:rotate(-8deg)">{selo_svg}</div></div>'
    j = jornal('<div class="mini" style="font-size:16pt;gap:4mm"><img src="img/folinha.png" style="height:15mm" alt="">Cerrado Finanças · Consultoria</div>',
               "Prancha 01/07", "Consultorias <em>especializadas</em>",
               "Para empresas e para a gestão pública. Comece pelo diagnóstico gratuito.",
               [escape(n) for n in CONSULTORIAS], motivo, "Agende o diagnóstico gratuito", b, url)
    ban = banners('<div class="mini" style="font-size:15px;gap:8px"><img src="img/folinha.png" style="height:46px" alt="">Cerrado Finanças · Consultoria</div>',
                  '<div class="mini" style="font-size:12px;gap:7px"><img src="img/folinha.png" style="height:30px" alt="">Cerrado Finanças · Consultoria</div>',
                  "Consultorias <em>especializadas</em>", "CSC, BPO financeiro, controladoria, compliance e mais.", "Diagnóstico gratuito")
    vars_ = """.jornal, .b1200, .b300 { --fundo: linear-gradient(rgba(35,38,43,.08) .3mm, transparent .3mm) 0 0 / 10mm 10mm, linear-gradient(90deg, rgba(35,38,43,.08) .3mm, transparent .3mm) 0 0 / 10mm 10mm, #f3f0e8;
  --tinta: #23262b; --acento: #e4570e; --acento-texto: #e4570e; --sobre-acento: #fff; --linha: #23262b; --ft: 'Fraunces'; --ft-peso: 600;
  --em-estilo: italic; --fb: 'Instrument Sans'; --fm: 'DM Mono'; --raio: 0; }
.jornal h1 em, .b1200 .bt em, .b300 .bt em { font-weight: 400; }
.b1200, .b300 { --fundo: linear-gradient(rgba(35,38,43,.08) 1px, transparent 1px) 0 0 / 18px 18px, linear-gradient(90deg, rgba(35,38,43,.08) 1px, transparent 1px) 0 0 / 18px 18px, #f3f0e8; }
.jornal .j-lista { grid-template-columns: 1fr 1fr; gap: 5mm 10mm; }"""
    return dict(slug="consultorias", nome="Consultorias", cor="#e4570e", css=css + vars_, head="", pecas="".join(c) + j + ban)


# =========================================================================== 8. Guia Acadêmico

def guiacademico():
    b = dict(whats=WHATS, site="guiacademico.com.br", insta="@guiacademico", local=CIDADE, qr_tinta="#1e2a44", qr_papel="#ffffff")
    url = "https://guiacademico.com.br"
    nome = "Guia Acadêmico"
    css = """
body { font-family: 'Newsreader', serif; color: #1e2a44; }
.papel { background: #f6f2e9; } .marinho { background: #1e2a44; color: #f6f2e9; }
.t { font-weight: 600; line-height: 1; letter-spacing: -.01em; }
.t em { font-style: italic; font-weight: 400; color: #a8822a; }
.marinho .t em { color: #d9b46a; }
.mono { font-family: 'DM Mono', monospace; }
.rot { font: 500 5pt 'DM Mono', monospace; letter-spacing: .1em; text-transform: uppercase; color: #a8822a; }
.marinho .rot { color: #d9b46a; }
.cab { display: flex; justify-content: space-between; font: 500 4.8pt 'DM Mono', monospace; letter-spacing: .08em; text-transform: uppercase; padding-bottom: 1mm; border-bottom: .5mm double currentColor; }
.ct { font-size: 7pt; }
.ct .ico { color: #a8822a; } .marinho .ct .ico { color: #d9b46a; }
.risco { color: #a8322a; text-decoration: line-through; text-decoration-thickness: .3mm; }
.ins { background: #ecdba8; padding: 0 .6mm; }
.nota { font-size: 5.6pt; line-height: 1.3; border-top: .25mm solid currentColor; padding-top: 1mm; width: 60%; }
.quadro { width: 100%; border-collapse: collapse; font-size: 6pt; border-top: .4mm solid #1e2a44; border-bottom: .4mm solid #1e2a44; }
.quadro td { padding: .7mm 1mm; } .quadro tr + tr td { border-top: .2mm solid #c9bfa8; }
.quadro td:first-child { font: 500 5pt 'DM Mono', monospace; color: #a8822a; text-transform: uppercase; width: 18mm; }
"""
    c = []
    # frente da v2; verso da v2 com o quadro de ferramentas que estava no verso da v5
    c.append(cartao(1, "marinho", '<img src="img/bussola.png" style="position:absolute;height:50mm;right:-12mm;top:50%;transform:translateY(-50%);opacity:.95" alt="">' + s("""
      <p class="rot">Consultoria acadêmica</p><div class="cresce"></div>
      <p class="t" style="font-size:17pt">Guia<br>Acadêmico</p><p class="t" style="font-size:11pt;margin-top:1mm"><em>Seu Mentor</em></p>"""),
        "papel", s(f"""<div class="lin entre"><img src="img/bussola.png" style="height:8mm" alt=""><p class="rot">guiacademico.com.br</p></div>
      <table class="quadro" style="margin-top:1.8mm"><tr><td>Estatística</td><td>STATA, R, Python, SPSS</td></tr>
      <tr><td>Qualitativa</td><td>IRAMUTEQ, NVivo, Atlas.ti</td></tr><tr><td>Formatação</td><td>ABNT, APA, Vancouver</td></tr></table>
      <div class="cresce"></div>
      <div class="lin entre fim">{contatos(b, ("whats", "site", "insta", "local"))}<div style="width:14mm">{qr(url, "#1e2a44")}</div></div>
      <p class="mono" style="font-size:5.4pt;margin-top:1.2mm">Não executamos trabalhos por terceiros: o autor da pesquisa é você.</p>"""), nome))

    motivo = ('<div style="width:100%"><table class="quadro" style="font-size:15pt"><tr><td style="font-size:11pt;width:50mm">Estatística</td><td>STATA, R, Python, SPSS</td></tr>'
              '<tr><td style="font-size:11pt">Qualitativa</td><td>IRAMUTEQ, NVivo, Atlas.ti</td></tr><tr><td style="font-size:11pt">Formatação</td><td>ABNT, APA e Vancouver</td></tr></table>'
              '<p class="nota" style="font-size:12pt;margin-top:8mm;padding-top:2mm"><sup>1</sup> Não executamos trabalhos por terceiros: orientamos, ensinamos, analisamos e revisamos. O autor da pesquisa é você.</p></div>')
    j = jornal('<img src="img/guiacademico.png" style="height:24mm" alt="Guia Acadêmico">', "Consultoria acadêmica",
               "Pesquisa com método, do projeto à <em>análise.</em><sup style='font-size:24pt;color:#a8822a'>1</sup>",
               "Orientação metodológica e análise de dados para quem está no TCC, na especialização, no mestrado ou no doutorado, com o Prof. Renato Rosa (mestre em Contabilidade pela UFPR e doutorando).",
               ["Orientação metodológica", "Análise estatística e qualitativa", "Mineração de dados e IA acadêmica com ética",
                "Formatação ABNT, APA e Vancouver"],
               motivo, "Diagnóstico pelo WhatsApp", b, url, campos=("whats", "site", "insta"))
    ban = banners('<img src="img/guiacademico.png" style="height:70px" alt="Guia Acadêmico">',
                  '<img src="img/guiacademico.png" style="height:46px;align-self:flex-start" alt="Guia Acadêmico">',
                  "Orientação metodológica e <em>análise de dados</em>", "TCC, especialização, mestrado e doutorado. O autor da pesquisa é você.",
                  "Diagnóstico no WhatsApp")
    vars_ = """.jornal, .b1200, .b300 { --fundo: #f6f2e9; --tinta: #1e2a44; --acento: #1e2a44; --acento-texto: #a8822a; --sobre-acento: #f6f2e9;
  --linha: #1e2a44; --ft: 'Newsreader'; --ft-peso: 600; --em-estilo: italic; --fb: 'Newsreader'; --fm: 'DM Mono'; --raio: 0; }
.jornal .j-topo, .jornal .j-base { border-width: 1.4mm; border-style: double; border-left: 0; border-right: 0; }
.jornal .j-topo { border-top: 0; } .jornal .j-base { border-bottom: 0; }
.jornal h1 em, .b1200 .bt em, .b300 .bt em { font-weight: 400; } .b300 .bt { font-size: 25px; } .b1200 .bt { font-size: 26px; }"""
    return dict(slug="guiacademico", nome="Guia Acadêmico", cor="#1e2a44", css=css + vars_, head="", pecas="".join(c) + j + ban)


# =========================================================================== 9. CerraFood

def cerrafood():
    b = dict(whats=WHATS, email=EMAIL, site="cerradofinancas.com.br/cerrafood", insta="@cerradofinancas", local=CIDADE,
             qr_tinta="#0f2a16", qr_papel="#fbf6ea")
    url = "https://www.cerradofinancas.com.br/cerrafood"
    nome = "CerraFood"
    css = """
body { font-family: 'Outfit', sans-serif; }
.mata { background: #0f2a16; color: #f4efe2; } .laranja { background: #f39200; color: #0f2a16; } .papel { background: #fbf6ea; color: #0f2a16; }
.t { font-weight: 800; letter-spacing: -.03em; line-height: .95; text-transform: lowercase; }
.nm { font-weight: 800; letter-spacing: -.03em; line-height: 1; }
.nm span { color: #f39200; }
.laranja .nm span { color: #fbf6ea; }
.mono { font-family: 'DM Mono', monospace; }
.rot { font: 500 5.2pt 'DM Mono', monospace; letter-spacing: .1em; text-transform: uppercase; color: #f39200; }
.laranja .rot, .papel .rot { color: #0f2a16; opacity: .7; }
.ct { font: 500 6.1pt 'DM Mono', monospace; }
.ct .ico { color: #f39200; }
.disco { background: #fbf6ea; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.disco img { width: 66%; }
.comanda { background: #fbf6ea; color: #0f2a16; font: 500 5.7pt/1.5 'DM Mono', monospace; padding: 2.4mm 3mm 3.6mm; position: relative;
  -webkit-mask: conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / 2.2mm 100%; }
.comanda p { white-space: nowrap; }
.comanda hr { border: 0; border-top: .25mm dashed #0f2a16; margin: .8mm 0; }
.comanda .tot { font-weight: 700; display: flex; justify-content: space-between; }
.kds { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.4mm; }
.kds div { border-radius: 1.2mm; padding: 1.4mm; color: #0f2a16; font: 500 5pt 'DM Mono', monospace; }
.kds b { display: block; font: 800 10pt 'Outfit'; margin-top: .6mm; }
"""
    def nm(t, cor_cerra="#f4efe2"):
        return f'<p class="nm" style="font-size:{t}pt;color:{cor_cerra}">Cerra<span>Food</span></p>'
    def disco(mm):
        return f'<div class="disco" style="width:{mm}mm;height:{mm}mm"><img src="img/cerrafood.png" alt=""></div>'
    comanda = """<div class="comanda"><p style="display:flex;justify-content:space-between"><span>CERRAFOOD</span><span>PEDIDO 0001</span></p><hr>
      <p>1x totem e caixa</p><p>1x tela da cozinha</p><p>1x estoque e ficha técnica</p><p>1x entrega e fidelidade</p><hr>
      <p class="tot"><span>COM A SUA MARCA</span><span>✓</span></p></div>"""
    c = []

    motivo = f'<div style="display:flex;gap:14mm;align-items:center"><div style="width:110mm;transform:rotate(-3deg)">{comanda.replace("class=\"comanda\"", "class=\"comanda\" style=\"font-size:13pt;padding:7mm 9mm 10mm;-webkit-mask-size:6mm 100%\"")}</div>{disco(70)}</div>'
    j = jornal(f'<div class="lin" style="gap:4mm">{disco(18)}{nm(30)}</div>', "Gestão de restaurantes",
               "o restaurante inteiro <em>num sistema só.</em>",
               "Pizzaria, hamburgueria, restaurante ou delivery. Do pedido à entrega, com a sua marca: site, app, totem e painel com o seu nome, a sua logo e as suas cores.",
               ["Totem e caixa, com comanda impressa", "Tela da cozinha no lugar do papel", "Ficha técnica com o custo de cada prato",
                "Estoque, entrega, fidelidade e relatórios"],
               motivo, "Agende uma demonstração gratuita", b, url, assinatura=ASSINATURA_TECH)
    ban = banners(f'<div class="lin" style="gap:10px">{disco(15).replace("15mm", "60px")}{nm(20)}{ASSINATURA_TECH}</div>',
                  f'<div class="lin" style="gap:8px">{disco(10).replace("10mm", "40px")}{nm(15)}{ASSINATURA_TECH}</div>',
                  "o restaurante inteiro <em>num sistema só.</em>", "Totem, caixa, cozinha, estoque e entrega com a sua marca.", "Agende uma demonstração")
    vars_ = """.jornal, .b1200, .b300 { --fundo: #0f2a16; --tinta: #f4efe2; --acento: #f39200; --acento-texto: #f39200; --sobre-acento: #0f2a16;
  --linha: rgba(243,146,0,.6); --ft: 'Outfit'; --ft-peso: 800; --ft-caixa: lowercase; --ft-esp: -0.03em; --fb: 'Outfit'; --fm: 'DM Mono'; }
.jornal .ct, .jornal .j-qr { font-family: 'DM Mono'; }"""
    return dict(slug="cerrafood", nome="CerraFood", cor="#f39200", css=css + vars_, head="", pecas="".join(c) + j + ban)


# =========================================================================== Folders (textos dos filmes das frentes e do site)

CSS_FD = """
/* Folder novo (.fd): página cheia, 3D da frente, chamada para o WhatsApp */
.fd .fd-pg { position: absolute; inset: 13mm 13mm 12mm; display: flex; flex-direction: column; }
.fd .j-rot { font-size: 9.5pt; }
.fd-topo { display: flex; justify-content: space-between; align-items: center; gap: 4mm; }
.fd-marca { zoom: .62; }
.fd-hero { flex: 1; min-height: 0; margin: 3mm -13mm; display: flex; align-items: center; justify-content: center; }
.fd-hero img { max-width: 100%; max-height: 100%; object-fit: contain; }
.fd-h1, .fd-h2, .fd-cta-t { font-family: var(--ft); font-weight: var(--ft-peso); font-stretch: var(--ft-larg, 100%); text-transform: var(--ft-caixa, none); letter-spacing: var(--ft-esp, -0.02em); }
.fd-h1 em, .fd-h2 em, .fd-cta-t em { font-style: var(--em-estilo, normal); color: var(--acento-texto); }
.jornal.fd h1.fd-h1 { font-size: 29pt; line-height: 1.12; padding-top: 1.5mm; margin-top: 0; }
.fd-h2 { font-size: 23pt; line-height: 1.03; margin-top: 3mm; }
.fd-sub { font-size: 12.5pt; line-height: 1.35; margin-top: 4mm; opacity: .9; }
.fd-acao { display: flex; align-items: center; gap: 4mm; margin-top: 6mm; }
.fd-btn { display: inline-flex; align-items: center; gap: 2mm; background: var(--acento); color: var(--sobre-acento); font: 700 13pt var(--fb); padding: 3mm 5mm; border-radius: var(--raio, 999px); white-space: nowrap; align-self: flex-start; }
.fd-btn .ico { width: 1.1em; height: 1.1em; }
.fd-mini { font: 500 9pt var(--fm); opacity: .85; line-height: 1.3; }
.fd-cards { flex: 1; min-height: 0; display: grid; grid-auto-rows: 1fr; gap: 3mm; margin-top: 7mm; }
.fd-cards.duas { grid-template-columns: 1fr 1fr; }
.fd-card { display: flex; gap: 3.5mm; align-items: center; padding: 3.5mm 4.5mm; border-radius: 3mm;
  background: color-mix(in srgb, var(--tinta) 7%, transparent); border: .3mm solid color-mix(in srgb, var(--tinta) 16%, transparent); }
.fd-n { font: 600 10pt var(--fm); color: var(--acento-texto); align-self: flex-start; padding-top: .8mm; }
.fd-ct { font: 700 15pt var(--fb); line-height: 1.12; }
.fd-cd { font-size: 11.5pt; line-height: 1.3; opacity: .82; margin-top: 1.2mm; }
.fd-cards.duas .fd-ct { font-size: 12.5pt; }
.fd-cards.duas .fd-card { padding: 3mm 3.5mm; gap: 2.5mm; }
.fd-faixa { margin-top: 5mm; background: var(--acento); color: var(--sobre-acento); font: 700 13pt var(--fb); padding: 4.5mm 5mm; border-radius: 3mm; line-height: 1.25; }
.fd-passos { list-style: none; display: grid; gap: 3.6mm; margin-top: 6mm; }
.fd-passos li { display: flex; gap: 4mm; align-items: center; }
.fd-passos li > b { flex-shrink: 0; width: 9mm; height: 9mm; border-radius: 50%; background: var(--acento); color: var(--sobre-acento);
  display: flex; align-items: center; justify-content: center; font: 700 12pt var(--fb); }
.fd-hero2 { margin-top: 2mm; margin-bottom: 3mm; }
.fd-chips { display: flex; flex-wrap: wrap; gap: 2mm; }
.fd-chips span { border: .35mm solid var(--acento-texto); border-radius: 99mm; padding: 1.5mm 3.6mm; font: 600 9.5pt var(--fb); }
.fd-cta { margin: -16mm -16mm 0; padding: 18mm 16mm 11mm; background: var(--acento); color: var(--sobre-acento); }
.fd-cta .j-rot { color: inherit; opacity: .85; }
.fd-cta-t { font-size: 29pt; line-height: 1.03; margin-top: 3mm; }
.fd-cta-t em { color: inherit; }
.fd-cta-s { font-size: 12.5pt; margin-top: 3mm; line-height: 1.35; opacity: .92; }
.fd-cta .fd-btn { background: var(--sobre-acento); color: var(--acento); margin-top: 6mm; }
.fd-base { display: flex; gap: 6mm; align-items: center; }
.fd-qr { width: 40mm; flex-shrink: 0; text-align: center; font: 500 8.5pt var(--fm); }
.fd-qr .qr { width: 40mm; height: 40mm; margin-bottom: 1.5mm; }
.fd-ctt { min-width: 0; }
.jornal.fd .fd-ctt .ct { font-size: 9.3pt; gap: 3mm; }
.fd-rodape { padding-top: 5mm; border-top: .5mm solid var(--linha); }
.fd-aviso { font-size: 7.5pt; line-height: 1.35; margin-top: 4mm; opacity: .85; }
.fd-assina { position: absolute; right: 0; bottom: -9mm; font-size: 8pt; opacity: .9; }
"""

FOLDER = {
    "institucional": dict(
        sub="Software sob medida, contabilidade inteligente, crédito multi bancos e formação prática.",
        acao="Fale com a gente pelo WhatsApp",
        s_rot="O que fazemos", s_tit="5 frentes, <em>um só parceiro.</em>",
        servicos=[("Fábrica de Software", "ERPs, CRMs, IA offline, e-commerce, dashboards e cyber security"),
                  ("Contabilidade", "abertura de empresa, tributos, folha e eSocial, BPO e BI"),
                  ("Crédito", "empréstimos, consignados, financiamentos, seguros e consórcios"),
                  ("Cursos", "IA na prática, IA na gestão, Excel com IA, dados e automação"),
                  ("Consultorias", "CSC, BPO financeiro, controladoria, tributário, GRC, GovTech e Web3")],
        destaque="Um só parceiro para o seu negócio crescer.",
        p_rot="Uma frente para cada desafio", p_tit="Escolha por onde <em>começar.</em>",
        passos=[("Software feito em torno do seu negócio", "Cerrado Tech"),
                ("Decisão baseada em dados", "Cerrado Contabilidade"),
                ("Antes de assinar, compare", "Crédito multi bancos"),
                ("A arquitetura que sustenta o crescimento", "Consultorias")],
        provas=["B2B e B2G", "100% customizado", "Atendimento humano"],
        cta_rot="Vamos conversar", cta="Um só parceiro para o seu negócio <em>crescer.</em>",
        cta_sub="Fale com a gente pelo WhatsApp."),
    "tech": dict(
        sub="A fábrica de software da Cerrado Finanças &amp; Tech.", acao="Conte o seu processo pelo WhatsApp",
        s_rot="O que construímos", s_tit="Do ERP à <em>Inteligência Artificial.</em>",
        servicos=[("ERPs", "financeiro, estoque e fiscal"), ("CRMs", "funil e follow-ups"), ("IA offline", "os dados ficam em casa"),
                  ("E-commerce e PDV", "integrados ao ERP"), ("Dashboards", "DRE e KPIs no celular")],
        destaque="Integra com SAP®, TOTVS, Power BI, bancos e notas fiscais. Fim da digitação dupla.",
        p_rot="Como trabalhamos", p_tit="Sob medida, <em>do jeito certo.</em>",
        passos=[("Descoberta &amp; Imersão", ""), ("Arquitetura &amp; Prototipação", ""), ("Desenvolvimento Ágil", ""), ("Entrega &amp; Evolução", "")],
        provas=["100% customizado", "B2B e B2G", "O código é seu"],
        cta_rot="Qual software o seu negócio precisa?", cta="Conte o seu processo e desenhamos <em>a solução com você.</em>",
        cta_sub="Sem amarras de fornecedor: o código é seu."),
    "cerraai": dict(
        sub="A IA da empresa, dentro da empresa. 100% local.", acao="Veja com os seus documentos",
        s_rot="Como ele trabalha", s_tit="Lê, protege e <em>mostra a fonte.</em>",
        servicos=[("Lê o que a empresa já tem", "PDF (também escaneado), Word e Excel, imagens, áudio e vídeo"),
                  ("O dado pessoal vira tarja", "Nome, CPF e endereço são anonimizados antes de chegar ao modelo"),
                  ("Responde e mostra de onde tirou", "cada resposta vem com os trechos consultados"),
                  ("Funciona sem internet", "100% local, na estrutura da empresa")],
        destaque="Zero requisições externas.",
        p_rot="100% local", p_tit="Funciona <em>sem internet.</em>",
        passos=[("Zero requisições externas", ""), ("Uma base isolada para cada área", ""), ("Relatório LGPD e auditoria", "")],
        provas=["PDF e escaneados", "Word e Excel", "Áudio e vídeo", "by Cerrado Tech"],
        cta_rot="Cerra.AI", cta="Veja com os <em>seus documentos.</em>", cta_sub="Agende uma demonstração pelo WhatsApp."),
    "cerraclass": dict(
        sub="Cursos presenciais e práticos de IA, em turma de até 10 alunos.", acao="Agenda, valores e inscrições em cerraclass.com.br",
        s_rot="Os cursos", s_tit="11 cursos <em>presenciais.</em>",
        servicos=[(c, "") for c in ["IA na Gestão", "Excel com IA", "Consultoria Contábil com IA", "Consultoria Financeira com IA",
                                    "Introdução à Análise de Dados", "Processos Empresariais BPMN com IA", "Introdução à Automação com IA",
                                    "Ciência de Dados Aplicada", "IA na Farma", "BI e Dashboards com IA", "Prototipação de Apps com IA"]],
        destaque="Pare de só usar IA. Construa com ela.",
        p_rot="Formatos", p_tit="Um curso para <em>cada objetivo.</em>",
        passos=[("IA na Prática", "Para profissionais e empresas que querem construir com IA"),
                ("IA em Ação Farma", "Para propagandistas da indústria farmacêutica"),
                ("In company", "Com os dados e os problemas reais da sua empresa")],
        provas=["10 alunos, no máximo", "100% prático", "Nenhuma linha de código exigida", "Presencial"],
        cta_rot="CerraClass", cta="Pare de só usar IA. <em>Construa com ela.</em>", cta_sub="Agenda, valores e inscrições no site da CerraClass."),
    "credito": dict(
        sub="Vários bancos em uma só consulta, com quem entende de finanças.", acao="Simulação gratuita e sem compromisso",
        s_rot="Produtos", s_tit="Crédito para <em>cada momento.</em>",
        servicos=[("Empréstimos", "pessoal, capital de giro e com garantia"), ("Consignados", "INSS, servidores, portabilidade e refinanciamento"),
                  ("Financiamentos", "imóveis, veículos, máquinas e equipamentos"), ("Seguros e consórcios", "vida, auto, empresa e cartas de consórcio")],
        destaque="Comparamos o custo total, não só a parcela.",
        p_rot="Como funciona", p_tit="Do primeiro contato <em>ao dinheiro na conta.</em>",
        passos=[("Conversa inicial", "quanto você precisa e quanto cabe no orçamento"), ("Simulação em vários bancos", "taxa, prazo e custo total"),
                ("Você escolhe", "opções claras, sem pressão"), ("Contratação acompanhada", "da documentação à liberação")],
        provas=["Uma consulta, vários bancos", "Gratuita e sem compromisso", "Você decide"],
        cta_rot="Simulação", cta="Antes de assinar, <em>compare.</em>", cta_sub="Gratuita e sem compromisso. Você decide."),
    "contabilidade": dict(
        sub="Contabilidade 100% digital, com dados para você tomar decisões.", acao="Agende um diagnóstico da sua contabilidade",
        s_rot="Burocracia é com a gente", s_tit="Do primeiro CNPJ <em>à folha de pagamento.</em>",
        servicos=[("Abertura de CNPJ", "rápida e 100% digital"), ("Gestão tributária", "Simples, notas e declarações"),
                  ("Folha e eSocial", "admissões, férias, 13º e guias"), ("Suporte humano", "direto no WhatsApp")],
        destaque="Do primeiro CNPJ à média empresa, o mesmo contador.",
        p_rot="Além do básico", p_tit="Da planilha ao painel <em>em 4 fases.</em>",
        passos=[("Mapeamento e diagnóstico", ""), ("Saneamento e BPO", ""), ("Automação e integração", ""), ("DRE, EBITDA e metas no celular", "")],
        provas=["Troque de contador sem dor de cabeça", "Você acompanha cada etapa", "CNPJ protegido na troca"],
        cta_rot="Cerrado Contabilidade", cta="Decisão baseada <em>em dados.</em>", cta_sub="Agende um diagnóstico da sua contabilidade."),
    "consultorias": dict(
        sub="Consultorias especializadas para empresas e gestão pública.", acao="Diagnóstico gratuito",
        s_rot="7 pranchas", s_tit="O que a consultoria <em>desenha.</em>",
        servicos=[(c, "") for c in ["BPO financeiro", "Controladoria estruturada", "CSC Strategy", "Governança, risco e compliance",
                                    "Planejamento tributário e inovação", "Venture building", "Consultoria GovTech"]],
        destaque="Estrutura desenhada sob medida, ligada ao centro.",
        p_rot="Como funciona", p_tit="Cada projeto <em>é único.</em>",
        passos=[("Diagnóstico gratuito", "uma sessão para entender o seu caso"), ("Roadmap", "o desenho da estrutura e as prioridades"),
                ("Implantação", "a gente executa junto com o seu time"), ("Acompanhamento", "indicadores para medir o resultado")],
        provas=["Para empresas e gestão pública", "Diagnóstico gratuito", "Sob medida"],
        cta_rot="Diagnóstico gratuito", cta="Tudo começa <em>por uma conversa.</em>", cta_sub="Agende o seu diagnóstico gratuito."),
    "guiacademico": dict(
        sub="Orientação metodológica e análise de dados para TCC, especialização, mestrado e doutorado.", acao="Agende o diagnóstico da pesquisa",
        s_rot="O que fazemos", s_tit="As frentes <em>do Guia.</em>",
        servicos=[("Orientação metodológica", "do problema ao delineamento"), ("Análise estatística", "STATA, R, Python e SPSS"),
                  ("Análise qualitativa", "IRAMUTEQ, NVivo e Atlas.ti"), ("Mineração de dados", "raspagem de bases públicas"),
                  ("IA acadêmica", "uso ético de modelos de linguagem"), ("Formatação e submissão", "ABNT, APA, Vancouver e periódicos")],
        destaque="Você continua sendo o autor da pesquisa.",
        p_rot="Como funciona", p_tit="O <em>protocolo.</em>",
        passos=[("Diagnóstico", "a sua necessidade e a viabilidade técnica"), ("Proposta", "escopo, cronograma de entregas e orçamento"),
                ("Acompanhamento", "sessões técnicas e entregas parciais"), ("Área do Aluno", "os seus arquivos e o andamento")],
        provas=["Prof. Renato Rosa", "Mestre em Contabilidade (UFPR)", "Não executamos trabalhos por terceiros"],
        cta_rot="Guia Acadêmico", cta="Pesquisa com rigor, <em>do projeto à banca.</em>", cta_sub="Agende o diagnóstico da pesquisa."),
    "cerrafood": dict(
        sub="Pizzaria, hamburgueria, restaurante ou delivery.", acao="Demonstração gratuita com o seu cardápio",
        s_rot="O que vem no sistema", s_tit="O restaurante inteiro <em>num sistema só.</em>",
        servicos=[("Tela da cozinha", "a cor mostra quanto o pedido espera"), ("Ficha técnica", "o custo de cada prato, fatia por fatia"),
                  ("White label", "site, app, totem e painel com o seu nome, a sua logo e as suas cores"),
                  ("Entrega por bairro, fidelidade e relatórios", "")],
        destaque="Mudou o preço do ingrediente, o custo do prato é recalculado.",
        p_rot="Como funciona", p_tit="Do pedido à porta, <em>sem anotar nada.</em>",
        passos=[("Totem ou caixa", "o cliente monta o pedido ou o caixa lança"), ("Cozinha", "o pedido aparece na tela, com o tempo de espera"),
                ("Estoque", "os ingredientes saem do estoque sozinhos"), ("Entrega", "o cliente acompanha cada etapa pelo link")],
        provas=["Com a sua marca", "Estoque automático", "Entrega pelo link"],
        cta_rot="CerraFood", cta="Veja o sistema <em>com a sua marca.</em>", cta_sub="Demonstração gratuita, com o seu cardápio e a sua logo."),
}


FRENTES = [institucional, tech, cerraai, cerraclass, credito, contabilidade, consultorias, guiacademico, cerrafood]


def montar_frente(fn):
    f = fn()
    assinatura = ASSINATURA_TECH if f["slug"] == "cerrafood" else ""
    f["pecas"] += folder(f["slug"], dict(ULTIMO_JORNAL), FOLDER[f["slug"]], assinatura)
    return f

JS = """<script>
(function () {
  const q = new URLSearchParams(location.search);
  const tam = q.get('tam');
  if (tam) { const [w, h] = tam.split('x'); document.documentElement.style.setProperty('--w', w + 'mm'); document.documentElement.style.setProperty('--h', h + 'mm'); }
  const p = q.get('p');
  if (p) {
    document.body.classList.add('render');
    document.querySelectorAll('.peca').forEach(e => { if (e.dataset.grupo === p || e.dataset.id === p) e.classList.add('on'); });
  }
})();
</script>"""


def gerar_html(f):
    html = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Formatos · {escape(f["nome"])}</title>
{f["head"]}
<style>{FONTES}{CSS_BASE}{CSS_MOLDES}{CSS_FD}{f["css"]}</style>
</head>
<body>
{f["pecas"]}
{JS}
</body>
</html>
"""
    FONTE.mkdir(parents=True, exist_ok=True)
    caminho = FONTE / f"{f['slug']}.html"
    html = re.sub(r'(<div class="mini"[^>]*><img[^>]*>)(.*?)(</div>)', lambda m: m[1] + '<span>' + m[2] + '</span>' + m[3], html)
    html = html.replace("Cerrado&nbsp;<span", "Cerrado <span")
    html = html.replace(".jornal, .b1200, .b300 {", ".jornal, .folha, .b1200, .b300 {")
    caminho.write_text(html, encoding="utf-8")
    return caminho


# --------------------------------------------------------------------------- render

MM = 96 / 25.4


def medida_exata(pdf: Path, w_mm, h_mm):
    """O Chrome arredonda a página para pixel (94 mm vira 94,2 mm): corta a sobra, que cai na sangria (direita/base)."""
    import pymupdf
    d = pymupdf.open(pdf)
    w, h = w_mm * 72 / 25.4, h_mm * 72 / 25.4
    for pg in d:
        mb = pg.mediabox
        pg.set_mediabox(pymupdf.Rect(mb.x0, mb.y1 - h, mb.x0 + w, mb.y1))
    d.save(pdf.with_suffix(".tmp"), garbage=3, deflate=True)
    d.close()
    pdf.with_suffix(".tmp").replace(pdf)


def impor(origem: Path, destino: Path):
    """Duas folhas A4 deitadas (297 x 210 + 3 mm de sangria): lado de fora 4|1, lado de dentro 2|3."""
    import pymupdf
    src = pymupdf.open(origem)
    pt = 72 / 25.4
    out = pymupdf.open()
    for esq, dir_ in ((3, 0), (1, 2)):
        folha = out.new_page(width=302 * pt, height=216 * pt)
        folha.show_pdf_page(pymupdf.Rect(0, 0, 151 * pt, 216 * pt), src, esq, clip=pymupdf.Rect(0, 0, 151 * pt, 216 * pt))
        folha.show_pdf_page(pymupdf.Rect(151 * pt, 0, 302 * pt, 216 * pt), src, dir_, clip=pymupdf.Rect(3 * pt, 0, 154 * pt, 216 * pt))
    out.save(destino, garbage=3, deflate=True)


def quantizar(png: Path):
    im = Image.open(png).convert("RGB")
    im.quantize(colors=256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.FLOYDSTEINBERG).save(png, optimize=True)


def renderizar(f, caminho, browser):
    from playwright.sync_api import Page  # noqa: F401
    destino = SAIDA / f["slug"]
    destino.mkdir(parents=True, exist_ok=True)
    for velho in destino.iterdir():
        velho.unlink()
    url = caminho.resolve().as_uri()

    def abrir(page, params):
        page.goto(f"{url}?{params}")
        page.evaluate("""async () => { await document.fonts.ready;
          await Promise.all([...document.images].map(i => i.complete ? 1 : new Promise(r => { i.onload = i.onerror = r; }))); }""")

    pdf_page = browser.new_page()
    png300 = browser.new_page(device_scale_factor=300 / 96, viewport={"width": 500, "height": 300})
    for v in range(1, versoes(f) + 1):
        for w, h in TAMANHOS:
            abrir(pdf_page, f"p=cartao-v{v}&tam={w}x{h}")
            pdf_page.pdf(path=str(destino / f"cartao-v{v}-{w}x{h}mm.pdf"), width=f"{w + 2 * SANGRIA}mm",
                         height=f"{h + 2 * SANGRIA}mm", print_background=True, prefer_css_page_size=False)
            medida_exata(destino / f"cartao-v{v}-{w}x{h}mm.pdf", w + 2 * SANGRIA, h + 2 * SANGRIA)
        for lado in ("frente", "verso"):
            abrir(png300, f"p=cartao-v{v}-{lado}&tam=90x50")
            caixa = png300.locator(".peca.on").bounding_box()
            png = destino / f"cartao-v{v}-{lado}.png"
            png300.screenshot(path=str(png), clip={"x": caixa["x"] + SANGRIA * MM, "y": caixa["y"] + SANGRIA * MM,
                                                   "width": 90 * MM, "height": 50 * MM})
            quantizar(png)
    # jornal
    abrir(pdf_page, "p=jornal")
    pdf_page.pdf(path=str(destino / "jornal-255x360mm.pdf"), width="255mm", height="360mm", print_background=True)
    medida_exata(destino / "jornal-255x360mm.pdf", 255, 360)
    # folder: 4 páginas A5 com sangria, + imposição em 2 folhas A4 (fora: 4|1, dentro: 2|3)
    abrir(pdf_page, "p=folder")
    paginas = destino / "folder-paginas-a5.pdf"
    pdf_page.pdf(path=str(paginas), width="154mm", height="216mm", print_background=True)
    medida_exata(paginas, 154, 216)
    impor(paginas, destino / "folder-impressao-a4.pdf")
    fp = browser.new_page(device_scale_factor=1.1, viewport={"width": 700, "height": 900})
    for n in range(1, 5):
        abrir(fp, f"p=folder-p{n}")
        cx = fp.locator(".peca.on").bounding_box()
        fp.screenshot(path=str(destino / f"folder-p{n}.png"), clip={"x": cx["x"] + SANGRIA * MM, "y": cx["y"] + SANGRIA * MM,
                                                                  "width": 148 * MM, "height": 210 * MM})
        quantizar(destino / f"folder-p{n}.png")
    fp.close()
    prev = browser.new_page(device_scale_factor=1.2, viewport={"width": 1000, "height": 1400})
    abrir(prev, "p=jornal")
    prev.locator(".peca.on").screenshot(path=str(destino / "jornal.png"))
    quantizar(destino / "jornal.png")
    # banners
    for esc, suf in ((1, ""), (2, "@2x")):
        bp = browser.new_page(device_scale_factor=esc, viewport={"width": 1300, "height": 400})
        for bid in ("banner-1200x90", "banner-300x250"):
            abrir(bp, f"p={bid}")
            bp.locator(".peca.on").screenshot(path=str(destino / f"{bid}{suf}.png"))
        bp.close()
    for pg in (pdf_page, png300, prev):
        pg.close()
    print(f"  {f['slug']}: {len(list(destino.iterdir()))} arquivos")


def versoes(f):
    """Quantas versões de cartão a frente tem (1 na maioria; a Contabilidade tem 3 e o CerraFood 5)."""
    return len(set(re.findall(r'data-grupo="cartao-v(\d+)"', f["pecas"])))


def indice(lista):
    itens = []
    for f in lista:
        pasta = SAIDA / f["slug"]
        if not pasta.exists():
            continue
        kb = lambda n: round((pasta / n).stat().st_size / 1024)  # noqa: E731
        cartoes = [dict(versao=v, frente=f"cartao-v{v}-frente.png", verso=f"cartao-v{v}-verso.png",
                        pdfs=[dict(nome=f"cartao-v{v}-{w}x{h}mm.pdf", rotulo=f"{str(w / 10).replace('.', ',').replace(',0', '')} x {str(h / 10).replace('.', ',').replace(',0', '')} cm", kb=kb(f"cartao-v{v}-{w}x{h}mm.pdf"))
                              for w, h in TAMANHOS]) for v in range(1, versoes(f) + 1)]
        zipnome = f"{f['slug']}.zip"
        with zipfile.ZipFile(SAIDA / zipnome, "w", zipfile.ZIP_DEFLATED) as z:
            for arq in sorted(pasta.iterdir()):
                z.write(arq, f"{f['slug']}/{arq.name}")
        itens.append(dict(slug=f["slug"], nome=f["nome"], cor=f["cor"], cartoes=cartoes,
                          folder=dict(paginas=[f"folder-p{n}.png" for n in range(1, 5)], pdf="folder-paginas-a5.pdf",
                                      kb=kb("folder-paginas-a5.pdf"), impressao="folder-impressao-a4.pdf", kb_impressao=kb("folder-impressao-a4.pdf")),
                          jornal=dict(previa="jornal.png", pdf="jornal-255x360mm.pdf", kb=kb("jornal-255x360mm.pdf")),
                          banners=[dict(nome=f"banner-{t}.png", x2=f"banner-{t}@2x.png", rotulo=t.replace("x", " x ")) for t in ("1200x90", "300x250")],
                          zip=dict(nome=zipnome, kb=round((SAIDA / zipnome).stat().st_size / 1024))))
    (SAIDA / "formatos.json").write_text(json.dumps(itens, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"formatos.json: {len(itens)} frentes")


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    render = "--render" in sys.argv
    preparar_imagens()
    todas = [montar_frente(fn) for fn in FRENTES]
    alvo = [f for f in todas if not args or f["slug"] in args]
    caminhos = {f["slug"]: gerar_html(f) for f in alvo}
    print(f"HTML: {', '.join(caminhos)}")
    if render:
        from playwright.sync_api import sync_playwright
        with sync_playwright() as p:
            browser = p.chromium.launch()
            for f in alvo:
                renderizar(f, caminhos[f["slug"]], browser)
            browser.close()
        indice(todas)


if __name__ == "__main__":
    main()
