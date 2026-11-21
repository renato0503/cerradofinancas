"""Gera as artes de impressão e de site de cada frente (aba "Formatos" da Central de Marketing).

Por frente:
- 5 versões de cartão de visita, frente e verso, em PDF vetorial para a gráfica, nos dois tamanhos pedidos:
  9 x 5 cm e 8,8 x 4,8 cm, cada um com 3 mm de sangria por lado (96 x 56 mm e 94 x 54 mm). PNG de prévia (300 dpi).
- Anúncio de jornal 25,5 x 36 cm (PDF + PNG de prévia).
- Banners de site 1200 x 90 e 300 x 250 (PNG em 1x e 2x).

Fontes (HTML) em posts/2026-11-formatos/<frente>.html; abrir no navegador mostra todas as peças com a linha de corte
tracejada. Saída publicada em formatos/<frente>/ + formatos/<frente>.zip + formatos/formatos.json (a página lê).

Textos: só o que já está no site, nas legendas institucionais e nos guias de marca (nada inventado, sem preço).
Crédito leva o aviso legal em toda peça. Cartões são institucionais (sem nome de pessoa).

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
FONTE = MARKETING / "posts" / "2026-11-formatos"
SAIDA = MARKETING / "formatos"
IMG = FONTE / "img"

WHATS = "(67) 99351-5206"
EMAIL = "comercial@cerradofinancas.com.br"
CIDADE = "Cuiabá · MT"
AVISO_CREDITO = ("Cerrado Finanças, em parceria com a LS Intermediação Financeira, atua como correspondente bancário e "
                 "não é instituição financeira. Crédito sujeito a análise e aprovação. Taxas e condições variam conforme "
                 "o perfil e a instituição.")
TAMANHOS = [(90, 50), (88, 48)]
SANGRIA = 3

# --------------------------------------------------------------------------- imagens (cópias leves para o PDF)

LOGOS = {
    "folinha": (RAIZ / "img/folinha-hero.png", 500),
    "logo-tech": (RAIZ / "img/logo-tech.png", 900),
    "cerraai": (RAIZ / "img/logo_cerraai-icone.png", 700),
    "cerraclass": (MARKETING / "brand/cerraclass/logo.png", 600),
    "cerrafood": (MARKETING / "brand/cerrafood/simbolo.png", 700),
    "guiacademico": (MARKETING / "brand/guiacademico/logo.png", 900),
    "bussola": (MARKETING / "brand/guiacademico/logo-icone.png", 600),
}


def preparar_imagens():
    IMG.mkdir(parents=True, exist_ok=True)
    for nome, (origem, lado) in LOGOS.items():
        destino = IMG / f"{nome}.png"
        if destino.exists() and destino.stat().st_mtime > origem.stat().st_mtime:
            continue
        im = Image.open(origem).convert("RGBA")
        im = im.crop(im.getchannel("A").point(lambda a: 255 if a > 8 else 0).getbbox())
        im.thumbnail((lado, lado), Image.LANCZOS)
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
.b300 { background: var(--fundo); color: var(--tinta); font-family: var(--fb); padding: 18px 18px 16px; display: flex; flex-direction: column; }
.b300 .bt { font-family: var(--ft); font-weight: var(--ft-peso); font-stretch: var(--ft-larg, 100%); text-transform: var(--ft-caixa, none);
  font-size: 27px; line-height: 1.02; letter-spacing: var(--ft-esp, -0.01em); margin-top: 14px; }
.b300 .bt em { font-style: var(--em-estilo, normal); color: var(--acento-texto); }
.b300 .bs { font-size: 12.5px; line-height: 1.35; margin-top: 7px; opacity: .88; }
.b300 .cta { align-self: flex-start; margin-top: auto; flex-shrink: 0; font-size: 14px; padding: 10px 16px; }
.b300 .av { font-size: 7.2px; line-height: 1.25; opacity: .78; margin-top: 7px; }
"""


def jornal(marca, rotulo, titulo, sub, itens, motivo, cta, b, url, aviso="", campos=("whats", "email", "site", "insta")):
    lista = "".join(f"<li><b>{i + 1:02d}</b><span>{t}</span></li>" for i, t in enumerate(itens))
    av = f'<p class="j-aviso">{escape(aviso)}</p>' if aviso else ""
    return peca("jornal", "jornal", f"""<div class="j">
  <div class="j-topo">{marca}<span class="j-rot">{rotulo}</span></div>
  <h1>{titulo}</h1>
  <p class="j-sub">{sub}</p>
  <ul class="j-lista">{lista}</ul>
  <div class="j-motivo">{motivo}</div>
  <div class="j-base">
    <div><p class="j-cta">{cta}</p>{contatos(b, campos)}</div>
    <div class="j-qr">{qr(url, b["qr_tinta"], b["qr_papel"])}aponte a câmera</div>
  </div>{av}
</div>""", "Jornal · 25,5 x 36 cm") + folder(marca, rotulo, titulo, sub, lista, motivo, cta, b, url, av, campos)


def folder(marca, rotulo, titulo, sub, lista, motivo, cta, b, url, av, campos):
    """Folder de 4 páginas A5 (A4 dobrada ao meio): capa, quem somos, o que fazemos, contracapa."""
    def pg(n, corpo, rot):
        return (f'<section class="peca jornal folha" data-grupo="folder" data-id="folder-p{n}" data-rotulo="Folder · página {n} · {rot}">'
                f'<div class="j">{corpo}</div><i class="corte"></i></section>\n')
    return (pg(1, f"""<div class="j-topo"><span></span><span class="j-rot">{rotulo}</span></div>
  <div class="j-motivo"><div style="zoom:1.5">{marca}</div></div><h1>{titulo}</h1>""", "capa") +
            pg(2, f"""<p class="j-rot">Quem somos</p><p class="j-sub">{sub}</p>
  <div class="j-motivo"><div style="zoom:.58;width:172%;display:flex;justify-content:center">{motivo}</div></div><p class="j-cta">{cta}</p>""", "quem somos") +
            pg(3, f"""<p class="j-rot">O que fazemos</p><ul class="j-lista">{lista}</ul><div class="cresce"></div>
  <div class="j-topo" style="border:0;padding:0">{marca}</div>""", "o que fazemos") +
            pg(4, f"""<div class="j-topo">{marca}</div><div class="cresce"></div>
  <p class="j-cta">{cta}</p>{contatos(b, campos)}
  <div class="j-qr" style="margin-top:10mm">{qr(url, b["qr_tinta"], b["qr_papel"])}aponte a câmera</div>{av}""", "contracapa"))


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
    # v1 clássico
    c.append(cartao(1, "az", s(f"""<div class="cresce lin" style="flex-direction:column;justify-content:center;text-align:center;gap:2mm">
      <img src="img/folinha.png" style="height:15mm" alt=""><p class="nome" style="font-size:15pt">Cerrado <span>Finanças</span></p>
      <p class="tag" style="opacity:.85">Um só parceiro para o seu negócio crescer</p></div>"""),
        "branco", f'<i class="fill" style="bottom:auto;height:calc(var(--sg) + 1.6mm);background:#fecb00"></i>' + s(f"""
      <div class="mini"><img src="img/folinha.png" alt="">Cerrado Finanças</div>
      <div class="cresce lin entre fim"><div>{contatos(b, ("whats", "email", "site", "insta", "local"))}</div>
      <div style="width:17mm">{qr(url, "#001f5c")}</div></div>"""), nome))
    # v2 folinha sangrando
    c.append(cartao(2, "noite", """<img src="img/folinha.png" style="position:absolute;height:44mm;right:-8mm;bottom:-6mm;opacity:.95" alt="">""" + s("""
      <p class="rot">Finanças &amp; Tech</p><div class="cresce"></div>
      <p class="nome" style="font-size:17pt">Cerrado<br><span>Finanças</span></p>
      <i style="display:block;width:9mm;height:.7mm;background:#fecb00;margin:2.2mm 0 1.6mm"></i>
      <p class="tag" style="max-width:40mm;opacity:.85">Um só parceiro para o seu negócio crescer</p>"""),
        "az", s(f"""<p class="rot">Nossas frentes</p>
      <div class="pilulas" style="margin-top:1.6mm">{''.join(f'<span>{f}</span>' for f in frentes)}</div>
      <div class="cresce"></div><div class="lin entre fim">{contatos(b, ("whats", "email", "site"))}
      <div class="qrbox" style="width:14mm">{qr(url, "#001f5c")}</div></div>"""), nome))
    # v3 faixa dourada lateral
    c.append(cartao(3, "branco", '<i class="fill" style="right:auto;width:calc(var(--sg) + 9mm);background:#fecb00"></i>'
                    '<img src="img/folinha.png" style="position:absolute;left:calc(var(--sg) + 1.5mm);top:50%;transform:translateY(-50%);width:13mm" alt="">'
                    + s(f"""<div style="margin-left:13mm" class="cresce lin"><div>
      <p class="rot">Finanças &amp; Tech</p><p class="nome" style="font-size:16pt;color:#001f5c;margin-top:1.2mm">Cerrado <span>Finanças</span></p>
      <p class="tag" style="margin-top:2mm;color:#475569">{" · ".join(frentes)}</p></div></div>"""),
        "az", s(f"""<div class="mini"><img src="img/folinha.png" alt="">Cerrado <span style="color:#fecb00">Finanças</span></div>
      <div class="cresce lin entre fim">{contatos(b, ("whats", "email", "site", "insta"))}
      <div class="qrbox" style="width:16mm">{qr(url, "#001f5c")}</div></div>"""), nome))
    # v4 tipográfico dourado
    c.append(cartao(4, "ouro", s("""<p class="rot" style="color:#001f5c">Cerrado Finanças &amp; Tech</p>
      <p class="nome cresce" style="font-size:15.5pt;margin-top:2mm;color:#001f5c">Um só parceiro para o seu negócio crescer.</p>
      <div class="lin entre fim"><p class="tag" style="font-weight:700">Software · Contabilidade · Crédito · Cursos · Consultorias</p>
      <img src="img/folinha.png" style="height:9mm" alt=""></div>"""),
        "noite", s(f"""<div class="lin entre"><div class="mini"><img src="img/folinha.png" alt="">Cerrado <span style="color:#fecb00">Finanças</span></div><p class="rot">{CIDADE}</p></div>
      <div class="cresce lin entre fim">{contatos(b, ("whats", "email", "site", "insta"))}
      <div class="qrbox" style="width:16mm">{qr(url, "#001f5c")}</div></div>"""), nome))
    # v5 dividido
    c.append(cartao(5, "az", '<i class="fill" style="right:auto;width:calc(var(--sg) + 28mm);background:#fecb00"></i>'
                    '<img src="img/folinha.png" style="position:absolute;left:calc(var(--sg) + 5mm);top:50%;transform:translateY(-50%);width:18mm" alt="">'
                    + s("""<div class="cresce lin" style="margin-left:28mm"><div>
      <p class="nome" style="font-size:15pt">Cerrado<br><span>Finanças</span></p>
      <p class="rot" style="margin-top:2mm">Finanças &amp; Tech</p></div></div>"""),
        "branco", '<i class="fill" style="top:auto;height:calc(var(--sg) + 7.5mm);background:#001f5c"></i>' + s(f"""
      <div class="lin entre" style="align-items:flex-start">{contatos(b, ("whats", "email", "insta", "local"))}
      <div style="width:15mm">{qr(url, "#001f5c")}</div></div><div class="cresce"></div>
      <p style="font-size:7pt;font-weight:800;color:#fecb00;position:relative;top:2.6mm">cerradofinancas.com.br</p>"""), nome))
    # v6 frente da v2 + verso da v4 com tudo o que o escritório faz (serviços tirados das páginas do site)
    servicos = [
        ("Fábrica de Software", "ERPs, CRMs, IA offline, e-commerce, dashboards e cyber security"),
        ("Contabilidade", "abertura de empresa, tributos, folha e eSocial, BPO e BI"),
        ("Crédito", "empréstimos, consignados, financiamentos, seguros e consórcios"),
        ("Cursos", "IA na prática, IA na gestão, Excel com IA, dados e automação"),
        ("Consultorias", "CSC, BPO financeiro, controladoria, tributário, GRC, GovTech e Web3"),
    ]
    lista_sv = "".join(f'<div class="sv"><b>{t}</b><span>{d}</span></div>' for t, d in servicos)
    c.append(cartao(6, "noite", """<img src="img/folinha.png" style="position:absolute;height:44mm;right:-8mm;bottom:-6mm;opacity:.95" alt="">""" + s("""
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
"""
    c = []
    c.append(cartao(1, "noite", circuito("#fecb00") + s("""<div class="cresce lin" style="justify-content:center;gap:3mm">
      <img src="img/folinha.png" style="height:15mm" alt=""><div><p class="nome" style="font-size:16pt">Cerrado <span>Tech</span></p>
      <p class="rot" style="margin-top:1.4mm">// fábrica de software</p></div></div>
      <p class="tag" style="text-align:center;opacity:.8">Software feito em torno do seu negócio</p>"""),
        "branco", s(f"""<img src="img/logo-tech.png" style="height:9mm;align-self:flex-start" alt="Cerrado Tech">
      <div class="cresce lin entre fim">{contatos(b)}<div style="width:16mm">{qr(url, "#001f5c")}</div></div>"""), nome))
    c.append(cartao(2, "branco", s("""<div class="cresce lin" style="justify-content:center">
      <img src="img/logo-tech.png" style="width:52mm" alt="Cerrado Tech"></div>
      <p class="rot" style="text-align:center">// software feito em torno do seu negócio</p>"""),
        "az", s(f"""<p class="tag" style="font-weight:800;font-size:6.8pt">ERPs · CRMs · IA · E-commerce · Compliance · Dashboards</p>
      <p class="rot" style="margin-top:1mm">para empresas e para a gestão pública</p>
      <div class="cresce lin entre fim">{contatos(b, ("whats", "email", "site"))}<div class="qrbox" style="width:14mm">{qr(url, "#001f5c")}</div></div>"""), nome))
    c.append(cartao(3, "noite", s("""<div class="lin entre"><div class="mini"><img src="img/folinha.png" alt="">Cerrado <span style="color:#fecb00">Tech</span></div>
      <p class="rot">fabrica.js</p></div>
      <div class="cresce lin"><div class="codigo">
      <p><span class="f">fabrica</span>.de(<span class="t">"software"</span>)</p>
      <p>&nbsp;&nbsp;.<span class="f">sobMedida</span>()</p>
      <p>&nbsp;&nbsp;.<span class="f">integraCom</span>([<span class="t">"SAP®"</span>, <span class="t">"TOTVS"</span>, <span class="t">"Power BI"</span>])</p>
      <p>&nbsp;&nbsp;.<span class="f">entrega</span>({ <span class="k">codigo</span>: <span class="t">"é seu"</span> })</p></div></div>"""),
        "noite", s(f"""<p class="rot">// contato</p><div class="cresce lin entre" style="align-items:center">{contatos_mono(b, ("whats", "email", "site", "insta"))}
      <div class="qrbox" style="width:15mm">{qr(url, "#001f5c")}</div></div>"""), nome))
    c.append(cartao(4, "ouro", s("""<p class="rot" style="color:#001f5c">// Cerrado Tech</p>
      <p class="nome cresce lin" style="font-size:21pt;color:#001f5c">O código é seu.</p>
      <div class="lin entre fim"><p class="tag" style="font-weight:700">100% customizado, sem amarras de fornecedor</p>
      <img src="img/folinha.png" style="height:9mm" alt=""></div>"""),
        "noite", circuito("#fecb00", .35) + s(f"""<div class="mini"><img src="img/folinha.png" alt="">Cerrado <span style="color:#fecb00">Tech</span></div>
      <div class="cresce lin entre fim">{contatos(b)}<div class="qrbox" style="width:16mm">{qr(url, "#001f5c")}</div></div>"""), nome))
    c.append(cartao(5, "az", s("""<p class="rot">// por que sob medida</p><div class="cresce lin"><div class="n3">
      <p><b>01</b>100% customizado: cada função nasce de uma necessidade real</p>
      <p><b>02</b>O código é seu, sem amarras de fornecedor</p>
      <p><b>03</b>Integra com SAP®, TOTVS, Power BI, bancos e notas fiscais</p></div></div>"""),
        "branco", s(f"""<img src="img/logo-tech.png" style="height:9mm;align-self:flex-start" alt="Cerrado Tech">
      <div class="cresce lin entre fim">{contatos(b, ("whats", "email", "site", "local"))}<div style="width:16mm">{qr(url, "#001f5c")}</div></div>"""), nome))

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
"""
    def marca(t=9):
        return f'<p class="cx" style="font-size:{t}pt">Cerra<span class="c">.AI</span></p>'
    c = []
    c.append(cartao(1, "graf", s(f"""<div class="cresce lin" style="flex-direction:column;justify-content:center;gap:2mm;text-align:center">
      <img src="img/cerraai.png" style="height:17mm" alt="">{marca(15)}<p class="rot" style="color:#a39d93">by Cerrado Tech</p></div>"""),
        "graf", s(f"""<div class="lin entre"><p class="rot">IA local · offline</p><img src="img/cerraai.png" style="height:6mm" alt=""></div>
      <div class="cresce lin entre fim">{contatos(b)}<div style="width:16mm">{qr(url, "#0d0f0e", "#f1ece3")}</div></div>"""), nome))
    c.append(cartao(2, "graf", '<img src="img/cerraai.png" style="position:absolute;height:48mm;right:-14mm;top:50%;transform:translateY(-50%)" alt="">' + s(f"""
      {marca(8)}<div class="cresce"></div>
      <p class="cx" style="font-size:11pt;max-width:48mm">A IA da empresa, <span class="c">dentro da empresa.</span></p>"""),
        "cobre", s(f"""<div class="lin entre">{marca(10).replace('class="c"', 'style="color:#f1ece3"')}<p class="rot">by Cerrado Tech</p></div>
      <div class="cresce lin entre fim">{contatos(b)}<div style="width:16mm">{qr(url, "#0d0f0e", "#f1ece3")}</div></div>"""), nome))
    c.append(cartao(3, "graf", s(f"""<p class="rot">Anonimização</p>
      <div class="cresce lin"><div class="mono" style="font-size:7.4pt;line-height:1.9">
      <p>Cliente: <span class="tarja" style="width:24mm"></span></p><p>CPF: <span class="tarja" style="width:5.5mm"></span>.<span class="tarja" style="width:5.5mm"></span>.<span class="tarja" style="width:5.5mm"></span>-<span class="tarja" style="width:3.6mm"></span></p></div></div>
      <p class="cx" style="font-size:7.4pt">Anonimiza o dado pessoal <span class="c">antes de chegar ao modelo.</span></p>"""),
        "graf", s(f"""<div class="lin entre">{marca(9)}<img src="img/cerraai.png" style="height:6mm" alt=""></div>
      <p class="cita" style="margin-top:1.8mm">Trechos consultados: cartao.pdf (p. 1)</p>
      <div class="cresce lin entre fim">{contatos(b, ("whats", "email", "site"))}<div style="width:14mm">{qr(url, "#0d0f0e", "#f1ece3")}</div></div>"""), nome))
    c.append(cartao(4, "cobre", s(f"""<div class="lin entre">{marca(8).replace('class="c"', 'style="color:#f1ece3"')}<img src="img/cerraai.png" style="height:7mm" alt=""></div>
      <p class="cx cresce lin" style="font-size:16pt">Funciona sem internet.</p>
      <p class="rot">depois de instalado · roda no computador da empresa</p>"""),
        "graf", s(f"""<p class="rot">Demonstração com os seus documentos</p>
      <div class="cresce lin entre fim">{contatos(b)}<div style="width:16mm">{qr(url, "#0d0f0e", "#f1ece3")}</div></div>"""), nome))
    c.append(cartao(5, "graf", s(f"""<div class="lin entre">{marca(9)}<img src="img/cerraai.png" style="height:7mm" alt=""></div>
      <div class="cresce lin"><ul class="lst">
      <li>Lê PDF (também escaneado), Word, Excel, áudio e vídeo</li><li>Mostra o arquivo e a página da resposta</li>
      <li>Anonimiza o dado pessoal antes do modelo</li><li>Funciona sem internet, depois de instalado</li></ul></div>"""),
        "clara", s(f"""<div class="lin entre"><img src="img/cerraai.png" style="height:9mm" alt="">{marca(11).replace('class="c"', 'style="color:#e2873b"')}</div>
      <div class="cresce lin entre fim">{contatos(b)}<div style="width:16mm">{qr(url, "#0d0f0e", "#f1ece3")}</div></div>"""), nome))

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
"""
    def selo(mm):
        return f'<div class="selo" style="width:{mm}mm;height:{mm}mm"><img src="img/cerraclass.png" alt="CerraClass"></div>'
    listras = '<div class="listras fill" style="top:auto;height:calc(var(--sg) + 3mm)">' + "".join(f'<i style="background:{c_}"></i>' for c_ in CORES_CURSOS) + "</div>"
    c = []
    c.append(cartao(1, "ipe", s(f"""<div class="cresce lin" style="gap:3mm">{selo(19)}<div>
      <p class="cx" style="font-size:22pt">CerraClass</p><p class="tag" style="margin-top:1mm">Cursos presenciais de IA e tecnologia</p></div></div>
      <div><span class="etq">Turma de até 10 alunos</span></div>"""),
        "branco", listras + s(f"""<div class="lin entre"><p class="cx" style="font-size:11pt">CerraClass</p>{selo(8)}</div>
      <div class="cresce lin entre" style="align-items:center">{contatos(b, ("whats", "site", "insta", "local"))}<div style="width:15mm">{qr(url, "#141414")}</div></div>"""), nome))
    c.append(cartao(2, "ipe", s(f"""<div class="lin entre" style="align-items:flex-start"><div>
      <p class="cx" style="font-size:16pt">Turma de<br>até 10 alunos</p><p class="tag" style="margin-top:1.4mm">Aula presencial e 100% prática</p></div>{selo(10)}</div>
      <div class="cresce"></div><div class="cadeiras">{''.join(cadeira(CORES_CURSOS[i + 1]) for i in range(10))}</div>"""),
        "verde", s(f"""<div class="lin entre"><p class="cx" style="font-size:11pt">CerraClass</p>{selo(8)}</div>
      <div class="cresce lin entre fim">{contatos(b, ("whats", "site", "insta", "local"))}<div style="width:16mm;border:.3mm solid #141414">{qr(url, "#141414")}</div></div>"""), nome))
    c.append(cartao(3, "ipe", f"""<div class="ingresso"><div class="corpo">
      <p class="tag" style="font-size:5.4pt;letter-spacing:.14em">INGRESSO · CURSO PRESENCIAL</p>
      <p class="cx cresce lin" style="font-size:15pt">Aprenda IA com quem constrói software</p>
      <p class="tag" style="font-size:5.8pt">Você sai com algo funcionando</p></div>
      <div class="canhoto"><div style="width:11mm;margin:0 auto 1.4mm">{selo(11)}</div><p class="cx" style="font-size:7pt">Até 10<br>alunos</p></div></div>""",
        "ipe", s(f"""<div class="lin entre"><p class="cx" style="font-size:12pt">CerraClass</p><span class="etq">Nenhuma linha de código exigida</span></div>
      <div class="cresce lin entre fim">{contatos(b, ("whats", "site", "insta"))}<div style="width:16mm;border:.3mm solid #141414">{qr(url, "#141414")}</div></div>"""), nome))
    c.append(cartao(4, "lilas", s("""<p class="tag" style="font-size:5.6pt;letter-spacing:.14em">UM DIA DE AULA</p>
      <p class="cx" style="font-size:15pt;margin-top:1.4mm">Nenhuma linha de código exigida</p><div class="cresce"></div>
      <div class="lin entre cx" style="font-size:8pt"><span>08:00</span><span>17:00</span></div>
      <div class="regua">""" + "<i></i>" * 19 + """</div>"""),
        "branco", s(f"""<div class="lin" style="gap:2.4mm">{selo(11)}<div><p class="cx" style="font-size:12pt">CerraClass</p>
      <p class="tag" style="font-size:5.8pt">Treinamentos presenciais e práticos</p></div></div>
      <div class="cresce lin entre fim">{contatos(b, ("whats", "site", "insta"))}<div style="width:15mm">{qr(url, "#141414")}</div></div>"""), nome))
    c.append(cartao(5, "branco", '<div class="listras fill" style="right:auto;width:calc(var(--sg) + 26mm)">' + "".join(f'<i style="background:{c_}"></i>' for c_ in CORES_CURSOS) + "</div>"
                    + s("""<div class="cresce lin" style="margin-left:27mm"><div><p class="cx" style="font-size:14.5pt">Aprenda IA com quem constrói software</p>
      <p class="tag" style="margin-top:1.8mm">Uma cor para cada curso: de Excel com IA a Ciência de Dados</p></div></div>"""),
        "ipe", s(f"""<div class="lin" style="gap:2.4mm">{selo(12)}<p class="cx" style="font-size:15pt">CerraClass</p></div>
      <div class="cresce lin entre fim">{contatos(b, ("whats", "site", "insta", "local"))}<div style="width:15mm;border:.3mm solid #141414">{qr(url, "#141414")}</div></div>"""), nome))

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
"""
    av = f'<p class="miuda">{escape(AVISO_CREDITO)}</p>'
    mini = '<div class="mini"><img src="img/folinha.png" alt="">Cerrado Finanças <small>· Crédito</small></div>'
    c = []
    c.append(cartao(1, "papel", s(f"""{mini}<p class="t cresce lin" style="font-size:15.5pt">Antes de assinar,&nbsp;<span class="grifo">compare.</span></p>
      <div class="assina"><b>X</b><span><i class="rubrica">Você decide</i></span></div>"""),
        "papel", s(f"""<div class="lin entre" style="align-items:flex-start">{contatos(b, ("whats", "email", "site", "insta"))}<div style="width:14mm">{qr(url, "#111522")}</div></div>
      <div class="cresce"></div>{av}"""), nome))
    c.append(cartao(2, "caneta", s(f"""{mini}<div class="cresce lin"><div><p class="t" style="font-size:26pt">Crédito</p>
      <p style="font-size:7.4pt;font-weight:700;margin-top:1.6mm">Uma consulta só. <span class="grifo">Vários bancos comparados.</span></p></div></div>
      <p class="rot">Empréstimos · Consignado · Financiamentos · Seguros · Consórcios</p>"""),
        "papel", s(f"""<div class="lin entre" style="align-items:flex-start">{contatos(b, ("whats", "email", "site", "insta"))}<div style="width:14mm">{qr(url, "#111522")}</div></div>
      <div class="cresce"></div>{av}"""), nome))
    c.append(cartao(3, "papel", s(f"""<div class="lin entre">{mini}<p class="rot">Comparativo</p></div>
      <div class="cresce lin"><table class="tab"><tr><td>Proposta A</td><td><div class="bar" style="width:85%"></div></td></tr>
      <tr><td>Proposta B</td><td><div class="bar" style="width:70%"></div></td></tr>
      <tr class="top"><td>Proposta C ✓</td><td><div class="bar" style="width:52%"></div></td></tr></table></div>
      <p class="t" style="font-size:9pt">Nós comparamos. <span class="rubrica" style="font-size:12pt;letter-spacing:0">Você escolhe.</span></p>"""),
        "caneta", s(f"""<div class="lin entre" style="align-items:flex-start">{contatos(b, ("whats", "email", "site", "insta"))}<div class="qrb" style="width:14mm">{qr(url, "#111522")}</div></div>
      <div class="cresce"></div>{av}"""), nome))
    c.append(cartao(4, "caneta", s(f"""{mini}<div class="cresce lin"><div class="par">
      <p><b>§ 1</b>Uma consulta só.</p><p><b>§ 2</b>Vários bancos comparados.</p><p><b>§ 3</b>Você escolhe, sem pressão.</p></div></div>
      <p class="rot">Simulação gratuita e sem compromisso</p>"""),
        "papel", s(f"""<div class="lin entre" style="align-items:flex-start">{contatos(b, ("whats", "email", "site", "insta"))}<div style="width:14mm">{qr(url, "#111522")}</div></div>
      <div class="cresce"></div>{av}"""), nome))
    c.append(cartao(5, "papel", '<i class="fill" style="right:auto;width:calc(var(--sg) + 2.4mm);background:#1f3ae0"></i>' + s(f"""{mini}
      <ul style="list-style:none;font-size:7.2pt;font-weight:700;line-height:1.5;margin-top:2mm" class="cresce">
      <li>Empréstimos e capital de giro</li><li>Consignado, portabilidade e refinanciamento</li><li><span class="grifo">Financiamento</span> de imóveis e veículos</li><li>Seguros e consórcios</li></ul>
      <p class="rot">Simulação gratuita e sem compromisso</p>"""),
        "papel", s(f"""<div class="lin entre" style="align-items:flex-start">{contatos(b, ("whats", "email", "site"))}<div style="width:13mm">{qr(url, "#111522")}</div></div>
      <div class="cresce"></div><div class="assina" style="margin:1mm 0 1.6mm"><b>X</b><span><i class="rubrica" style="font-size:12pt">Você decide</i></span></div>{av}"""), nome))

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
    c.append(cartao(1, "razao margem", s(f"""<div style="margin-left:5mm" class="cresce lin"><div>
      <p class="rot">Livro-razão · fl. 01</p><p class="t" style="font-size:16pt;margin-top:1.4mm">Cerrado<br>Contabilidade</p>
      <p style="font-size:7pt;font-weight:500;margin-top:1.6mm">Inteligência fiscal para PMEs e MEI</p></div></div>"""),
        "razao", s(f"""<div class="lin entre">{mini}<p class="rot">Contatos</p></div>
      <div class="cresce lin" style="gap:3mm">{livro}<div style="width:15mm;flex-shrink:0">{qr(url, "#0c3b2e")}</div></div>"""), nome))
    c.append(cartao(2, "razao", s(f"""{mini}<div class="cresce lin"><div class="razonete" style="width:100%">
      <div><h4>VOCÊ CUIDA DE</h4><p>o seu negócio</p></div>
      <div><h4>A GENTE CUIDA DE</h4><p>impostos, folha e declarações</p></div></div></div>
      <p class="rot">Saldo: tudo em dia</p>"""),
        "tinta", s(f"""<div class="lin entre"><p class="t" style="font-size:10pt">Cerrado Contabilidade</p><img src="img/folinha.png" style="height:6mm" alt=""></div>
      <div class="cresce lin entre fim">{contatos(b)}<div style="width:16mm">{qr(url, "#0c3b2e")}</div></div>"""), nome))
    c.append(cartao(3, "razao", s(f"""{mini}<div class="cresce lin entre"><div>
      <p class="t" style="font-size:14pt">Sua empresa</p><p style="font-size:6.6pt;font-weight:500;margin-top:1.2mm;max-width:38mm">Simples Nacional, notas, folha e declarações</p></div>
      <span class="carimbo">EM DIA</span></div><p class="rot">Abertura de CNPJ 100% digital</p>"""),
        "razao", s(f"""<div class="lin entre">{mini}<span class="carimbo" style="font-size:6pt;padding:.3mm 1.4mm">EM DIA</span></div>
      <div class="cresce lin" style="gap:3mm">{livro}<div style="width:15mm;flex-shrink:0">{qr(url, "#0c3b2e")}</div></div>"""), nome))
    c.append(cartao(4, "razao", s(f"""<div class="lin entre">{mini}<p class="rot">Crescimento</p></div>
      <p class="t" style="font-size:10pt;margin-top:1.6mm">Do MEI ao Lucro Presumido</p><div class="cresce"></div>
      <div class="escada"><div style="height:30%">MEI</div><div style="height:50%">ME</div><div style="height:72%">EPP</div><div style="height:100%">LUCRO PRESUMIDO</div></div>"""),
        "tinta", s(f"""<div class="lin entre"><p class="t" style="font-size:10pt">Cerrado Contabilidade</p><img src="img/folinha.png" style="height:6mm" alt=""></div>
      <div class="cresce lin entre fim">{contatos(b)}<div style="width:16mm">{qr(url, "#0c3b2e")}</div></div>"""), nome))
    c.append(cartao(5, "tinta", s(f"""<div class="lin entre"><p class="rot">Cerrado Contabilidade</p><img src="img/folinha.png" style="height:6mm" alt=""></div>
      <p class="t cresce lin" style="font-size:16pt">Os seus números viram&nbsp;<span class="grifo">decisão.</span></p>
      <p class="mono" style="font-size:5.6pt">Suporte humano direto no WhatsApp</p>"""),
        "razao margem", s(f"""<div style="margin-left:5mm" class="cresce lin" ><div style="width:100%"><p class="t" style="font-size:10pt;margin-bottom:2mm">Cerrado Contabilidade</p>
      <div class="lin" style="gap:3mm">{livro}<div style="width:14mm;flex-shrink:0">{qr(url, "#0c3b2e")}</div></div></div></div>"""), nome))

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
    c.append(cartao(1, "vegetal", s(f"""{mini}<div class="cresce lin"><p class="t" style="font-size:17pt">Consultorias <em>especializadas</em></p></div>
      <div class="carimbo"><span>Cerrado Finanças · Consultoria</span><span>Prancha 01/07</span><span>Esc. 1:1</span></div>"""),
        "vegetal", s(f"""<p class="rot">O que fazemos</p><div style="margin-top:1.4mm">{l7}</div><div class="cresce"></div>
      <div class="lin entre fim">{contatos(b, ("whats", "email", "site"))}<div style="width:12mm">{qr(url, "#23262b")}</div></div>"""), nome))
    c.append(cartao(2, "vegetal", s(f"""{mini}<div class="cresce lin"><p class="t" style="font-size:16pt">A estrutura da empresa, <em>redesenhada</em></p></div>
      <div class="cota"><i></i><span>DIAGNÓSTICO GRATUITO</span><i></i></div>"""),
        "grafite", s(f"""<div class="lin entre"><p class="t" style="font-size:10pt">Consultorias <em>especializadas</em></p><img src="img/folinha.png" style="height:6mm" alt=""></div>
      <div class="cresce lin entre fim">{contatos(b)}<div style="width:16mm">{qr(url, "#23262b")}</div></div>"""), nome))
    c.append(cartao(3, "vegetal", s(f"""<div class="lin entre"><p class="rot">Organograma · corte</p><p class="rot" style="color:#23262b">Prancha 03</p></div>
      <div class="cresce lin" style="gap:4mm"><div style="width:34mm">{org}</div><p class="t" style="font-size:11pt">Quem responde por <em>cada ação</em></p></div>
      {mini}"""),
        "vegetal", s(f"""<div class="carimbo" style="margin-bottom:2mm"><span>Contato</span><span>Prancha 03/07</span><span>{CIDADE}</span></div>
      <div class="cresce lin entre fim">{contatos(b)}<div style="width:16mm">{qr(url, "#23262b")}</div></div>"""), nome))
    c.append(cartao(4, "grafite", s(f"""<div class="lin entre"><p class="rot">7 consultorias</p><img src="img/folinha.png" style="height:6mm" alt=""></div>
      <div class="cresce lin">{l7.replace('class="lista7"', 'class="lista7" style="font-size:5.9pt;gap:1.1mm 3mm"')}</div>
      <p class="t" style="font-size:9pt">Consultorias <em>especializadas</em></p>"""),
        "vegetal", s(f"""{mini}<div class="cresce lin entre fim">{contatos(b)}<div style="width:16mm">{qr(url, "#23262b")}</div></div>"""), nome))
    c.append(cartao(5, "vegetal", s(f"""<div class="cresce lin entre" style="gap:3mm"><div>
      <p class="rot">Cerrado Finanças</p><p class="t" style="font-size:15pt;margin-top:1.4mm">Consultorias <em>especializadas</em></p>
      <p style="font-size:6.2pt;margin-top:2mm">Do CSC ao venture building</p></div>
      <div style="width:22mm;flex-shrink:0;transform:rotate(-8deg)">{selo_svg}</div></div>"""),
        "grafite", s(f"""{mini}<div class="cresce lin entre fim">{contatos(b)}<div style="width:16mm">{qr(url, "#23262b")}</div></div>"""), nome))

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
    c.append(cartao(1, "papel", s(f"""<div class="cab"><span>Guia Acadêmico</span><span>Consultoria acadêmica</span></div>
      <div class="cresce lin" style="justify-content:center"><img src="img/guiacademico.png" style="height:24mm" alt="Guia Acadêmico"></div>"""),
        "papel", s(f"""<div class="cab"><span>Resumo</span><span>nº 01</span></div>
      <p style="font-size:7pt;line-height:1.3;margin-top:1.4mm">Orientação metodológica e análise de dados para TCC, especialização, mestrado e doutorado.</p>
      <div class="cresce lin entre fim">{contatos(b, ("whats", "site", "insta"))}<div style="width:14mm">{qr(url, "#1e2a44")}</div></div>"""), nome))
    c.append(cartao(2, "marinho", '<img src="img/bussola.png" style="position:absolute;height:50mm;right:-12mm;top:50%;transform:translateY(-50%);opacity:.95" alt="">' + s("""
      <p class="rot">Consultoria acadêmica</p><div class="cresce"></div>
      <p class="t" style="font-size:17pt">Guia<br>Acadêmico</p><p class="t" style="font-size:11pt;margin-top:1mm"><em>Seu Mentor</em></p>"""),
        "papel", s(f"""<div class="lin entre"><img src="img/bussola.png" style="height:8mm" alt=""><p class="rot">guiacademico.com.br</p></div>
      <div class="cresce lin entre fim">{contatos(b, ("whats", "site", "insta", "local"))}<div style="width:16mm">{qr(url, "#1e2a44")}</div></div>"""), nome))
    c.append(cartao(3, "papel", s(f"""<div class="cab"><span>Revisão · controle de alterações</span><span>p. 1</span></div>
      <div class="cresce lin"><p class="t" style="font-size:14pt;line-height:1.15">O autor da pesquisa é <span class="risco">a consultoria</span> <span class="ins">você.</span></p></div>
      <p class="mono" style="font-size:5.4pt">Não executamos trabalhos por terceiros.</p>"""),
        "papel", s(f"""<div class="lin entre"><img src="img/guiacademico.png" style="height:11mm" alt="Guia Acadêmico"><div style="width:15mm">{qr(url, "#1e2a44")}</div></div>
      <div class="cresce"></div>{contatos(b, ("whats", "site", "insta"))}"""), nome))
    c.append(cartao(4, "papel", s(f"""<p class="rot">Guia Acadêmico · Seu Mentor</p>
      <div class="cresce lin"><p class="t" style="font-size:13pt">Orientação metodológica e <em>análise de dados</em></p></div>
      <p style="font-size:6.4pt"><b class="mono" style="font-size:5pt;color:#a8822a">PALAVRAS-CHAVE:</b> TCC; especialização; mestrado; doutorado.</p>"""),
        "marinho", s(f"""<div class="lin entre"><p class="t" style="font-size:11pt">Guia Acadêmico <em>· Seu Mentor</em></p><img src="img/bussola.png" style="height:8mm" alt=""></div>
      <div class="cresce lin entre fim">{contatos(b, ("whats", "site", "insta"))}<div style="width:16mm">{qr(url, "#1e2a44")}</div></div>"""), nome))
    c.append(cartao(5, "papel", s(f"""<div class="cab"><span>Guia Acadêmico</span><span>Seu Mentor</span></div>
      <div class="cresce lin"><p class="t" style="font-size:12.5pt;line-height:1.1">Orientamos, ensinamos, analisamos e <em>revisamos.</em><sup style="font-size:7pt;color:#a8822a">1</sup></p></div>
      <p class="nota"><sup>1</sup> Não executamos trabalhos por terceiros. O autor da pesquisa é você.</p>"""),
        "papel", s(f"""<table class="quadro"><tr><td>Estatística</td><td>STATA, R, Python, SPSS</td></tr>
      <tr><td>Qualitativa</td><td>IRAMUTEQ, NVivo, Atlas.ti</td></tr><tr><td>Formatação</td><td>ABNT, APA, Vancouver</td></tr></table>
      <div class="cresce lin entre fim">{contatos(b, ("whats", "site", "insta"))}<div style="width:13mm">{qr(url, "#1e2a44")}</div></div>"""), nome))

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
    c.append(cartao(1, "mata", s(f"""<div class="cresce lin" style="gap:3.4mm">{disco(20)}<div>{nm(17)}
      <p style="font-size:6.6pt;margin-top:1.4mm;opacity:.85">Gestão de restaurantes com a sua marca</p></div></div>
      <p class="rot">Pizzaria · hamburgueria · restaurante · delivery</p>"""),
        "papel", s(f"""<div class="lin entre">{nm(10, "#0f2a16")}<div style="border:.3mm solid #0f2a16;border-radius:50%">{disco(7)}</div></div>
      <div class="cresce lin entre fim">{contatos(b)}<div style="width:16mm">{qr(url, "#0f2a16", "#fbf6ea")}</div></div>"""), nome))
    c.append(cartao(2, "mata", s(f"""<div class="cresce lin" style="gap:3mm"><div style="width:44mm;flex-shrink:0;transform:rotate(-3deg);font-size:0">{comanda.replace('class="comanda"', 'class="comanda" style="font-size:5.1pt"')}</div>
      <div><p class="t" style="font-size:11pt">do pedido à porta, <span style="color:#f39200">sem anotar nada.</span></p></div></div>"""),
        "mata", s(f"""<div class="lin entre">{nm(11)}{disco(8)}</div>
      <div class="cresce lin entre fim">{contatos(b)}<div style="width:16mm">{qr(url, "#0f2a16", "#fbf6ea")}</div></div>"""), nome))
    c.append(cartao(3, "papel", s(f"""<div class="lin entre">{nm(9, "#0f2a16")}<p class="rot">Tela da cozinha</p></div>
      <div class="cresce lin"><div class="kds" style="width:100%">
      <div style="background:#3dbb2f">MESA 4<b>06:12</b></div><div style="background:#f5c542">DELIVERY<b>18:40</b></div><div style="background:#e0472b;color:#fbf6ea">BALCÃO<b>27:05</b></div></div></div>
      <p class="t" style="font-size:10pt">a cozinha sem papel.</p>"""),
        "mata", s(f"""<div class="lin entre">{nm(11)}{disco(8)}</div>
      <div class="cresce lin entre fim">{contatos(b)}<div style="width:16mm">{qr(url, "#0f2a16", "#fbf6ea")}</div></div>"""), nome))
    c.append(cartao(4, "laranja", s(f"""<div class="lin entre">{nm(9, "#0f2a16")}{disco(8)}</div>
      <p class="t cresce lin" style="font-size:15pt">o restaurante inteiro num sistema só.</p>
      <p class="rot">Site · app · totem · painel</p>"""),
        "mata", s(f"""<p class="rot">Agende uma demonstração gratuita</p>
      <div class="cresce lin entre fim">{contatos(b)}<div style="width:16mm">{qr(url, "#0f2a16", "#fbf6ea")}</div></div>"""), nome))
    c.append(cartao(5, "mata", f'<div class="disco" style="position:absolute;width:52mm;height:52mm;left:-16mm;top:50%;transform:translateY(-50%)"><img src="img/cerrafood.png" alt=""></div>'
                    + s(f"""<div class="cresce lin" style="margin-left:34mm"><div>{nm(15)}
      <ul class="mono" style="list-style:none;font-size:6pt;line-height:1.6;margin-top:2mm;opacity:.9"><li>pizzaria</li><li>hamburgueria</li><li>restaurante</li><li>delivery</li></ul></div></div>"""),
        "papel", s(f"""<p class="t" style="font-size:9pt">com o seu nome, a sua logo e as suas cores.</p>
      <div class="cresce lin entre fim">{contatos(b)}<div style="width:16mm">{qr(url, "#0f2a16", "#fbf6ea")}</div></div>"""), nome))

    motivo = f'<div style="display:flex;gap:14mm;align-items:center"><div style="width:110mm;transform:rotate(-3deg)">{comanda.replace("class=\"comanda\"", "class=\"comanda\" style=\"font-size:13pt;padding:7mm 9mm 10mm;-webkit-mask-size:6mm 100%\"")}</div>{disco(70)}</div>'
    j = jornal(f'<div class="lin" style="gap:4mm">{disco(18)}{nm(30)}</div>', "Gestão de restaurantes",
               "o restaurante inteiro <em>num sistema só.</em>",
               "Pizzaria, hamburgueria, restaurante ou delivery. Do pedido à entrega, com a sua marca: site, app, totem e painel com o seu nome, a sua logo e as suas cores.",
               ["Totem e caixa, com comanda impressa", "Tela da cozinha no lugar do papel", "Ficha técnica com o custo de cada prato",
                "Estoque, entrega, fidelidade e relatórios"],
               motivo, "Agende uma demonstração gratuita", b, url)
    ban = banners(f'<div class="lin" style="gap:10px">{disco(15).replace("15mm", "60px")}{nm(20)}</div>',
                  f'<div class="lin" style="gap:8px">{disco(10).replace("10mm", "40px")}{nm(15)}</div>',
                  "o restaurante inteiro <em>num sistema só.</em>", "Totem, caixa, cozinha, estoque e entrega com a sua marca.", "Agende uma demonstração")
    vars_ = """.jornal, .b1200, .b300 { --fundo: #0f2a16; --tinta: #f4efe2; --acento: #f39200; --acento-texto: #f39200; --sobre-acento: #0f2a16;
  --linha: rgba(243,146,0,.6); --ft: 'Outfit'; --ft-peso: 800; --ft-caixa: lowercase; --ft-esp: -0.03em; --fb: 'Outfit'; --fm: 'DM Mono'; }
.jornal .ct, .jornal .j-qr { font-family: 'DM Mono'; }"""
    return dict(slug="cerrafood", nome="CerraFood", cor="#f39200", css=css + vars_, head="", pecas="".join(c) + j + ban)


FRENTES = [institucional, tech, cerraai, cerraclass, credito, contabilidade, consultorias, guiacademico, cerrafood]

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
<style>{FONTES}{CSS_BASE}{CSS_MOLDES}{f["css"]}</style>
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
    """Quantas versões de cartão a frente tem (5 na maioria; o institucional tem uma 6ª)."""
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
    todas = [fn() for fn in FRENTES]
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
