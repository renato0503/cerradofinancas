"""Gera as "chamadas" 9:16 (15 s) de cada frente.

Cada vídeo usa um clipe 3D gerado na GPU (Wan 2.2, `ComfyUI`) como fundo do gancho e do fecho, e cartões
tipográficos na identidade da frente no meio. O texto, a logo e o CTA são HTML/PNG — nunca gerados pela IA.

Uso (de marketing/):
    python tools/gerar_chamadas.py tech contabilidade
"""
import json
import shutil
import subprocess
import sys
from pathlib import Path

import base64

from playwright.sync_api import sync_playwright

MARKETING = Path(__file__).resolve().parent.parent
FONTES = MARKETING / "brand" / "fontes"
CONTEUDO = MARKETING / "conteudo" / "2026-11-chamadas"
ENTREGAS = MARKETING / "entregas"

LARG, ALT, FPS = 1080, 1920, 30

DADOS = {
    "tech": dict(
        nome="Cerrado Tech",
        logo=MARKETING.parent / "img" / "folinha-hero.png",
        fonte="Inter",
        fundo="#000f2e", tinta="#ffffff", acento="#fecb00", apoio="#cbd5e1", linha="#1b2f5e",
        transicao="slideleft", transicao_dur=0.42,
        scrim_hook="rgba(0,6,20,.72) 0%,rgba(0,6,20,.28) 40%,rgba(0,6,20,.88) 100%",
        scrim_close="rgba(0,6,20,.45) 0%,rgba(0,6,20,.72) 55%,rgba(0,6,20,.96) 100%",
        cartao="navy",
        kicker="CERRADO TECH · FÁBRICA DE SOFTWARE",
        gancho="Quantas planilhas ainda seguram o seu processo?",
        c2_tit="ERP, CRM e IA offline.", c2_sub="E-commerce, dashboards e integrações, sob medida.",
        c3_tit="Conversa com o que você já usa.", c3_sub="SAP®, TOTVS, Power BI, bancos e notas fiscais.",
        c4_tit="O código é seu.", c4_sub="100% customizado, sem amarras de fornecedor.",
        fecho="Conte o seu processo.",
        botao="WhatsApp (67) 99351-5206",
        site="cerradofinancas.com.br/fabrica",
        legenda_ig=(
            "Quantas planilhas ainda seguram o seu processo?\n\n"
            "ERP, CRM, IA offline, e-commerce e dashboards sob medida — integrados ao que a empresa já usa.\n"
            "O código é seu: sem amarras de fornecedor.\n\n"
            "Conte o seu processo no WhatsApp (67) 99351-5206.\n"
            "cerradofinancas.com.br/fabrica\n\n"
            "#CerradoTech #SoftwareSobMedida #ERP #CRM #IAoffline #Dashboards #Cuiaba #MatoGrosso"
        ),
    ),
    "contabilidade": dict(
        nome="Cerrado Contabilidade",
        logo=MARKETING.parent / "img" / "folinha-hero.png",
        fonte="Plex Cond",
        fundo="#f1f6f0", tinta="#0c3b2e", acento="#0c3b2e", apoio="#3d6b58", linha="#cfe0d4",
        vermelho="#d23a2c",
        transicao="coverleft", transicao_dur=0.6,
        scrim_hook="rgba(241,246,240,.86) 0%,rgba(241,246,240,.60) 40%,rgba(241,246,240,.95) 100%",
        scrim_close="rgba(241,246,240,.60) 0%,rgba(241,246,240,.85) 55%,rgba(241,246,240,.97) 100%",
        cartao="papel",
        kicker="CERRADO CONTABILIDADE · INTELIGÊNCIA FISCAL",
        gancho="Imposto em dia. E a gestão?",
        c2_tit="Abertura, tributos e folha.", c2_sub="Tudo no mesmo lugar, 100% digital.",
        c3_tit="Do MEI à média empresa.", c3_sub="O mesmo contador, do primeiro CNPJ ao Lucro Presumido.",
        c4_tit="Os seus números viram decisão.", c4_sub="BPO financeiro, controladoria e dashboards.",
        fecho="Agende um diagnóstico.",
        botao="WhatsApp (67) 99351-5206",
        site="cerradofinancas.com.br/contabilidade",
        legenda_ig=(
            "Imposto em dia. E a gestão?\n\n"
            "Abertura de CNPJ, tributos, folha e eSocial no mesmo lugar, 100% digital — do MEI à média empresa.\n"
            "BPO financeiro, controladoria e dashboards para os números virarem decisão.\n\n"
            "Agende um diagnóstico no WhatsApp (67) 99351-5206.\n"
            "cerradofinancas.com.br/contabilidade\n\n"
            "#Contabilidade #ContabilidadeDigital #MEI #SimplesNacional #BPOFinanceiro #Controladoria #Cuiaba #MatoGrosso"
        ),
        rodape="Renato Rosa · CRC-MT 021719/O-5",
    ),
}


def logo_data_uri(caminho):
    dados = base64.b64encode(Path(caminho).read_bytes()).decode("ascii")
    tipo = "image/png" if str(caminho).lower().endswith(".png") else "image/jpeg"
    return f"data:{tipo};base64,{dados}"


def fonte_css(nome):
    arquivos = {
        "Inter": ["inter.woff2"],
        "Plex Cond": ["plex-cond-500.woff2", "plex-cond-700.woff2"],
    }[nome]
    out = []
    for a in arquivos:
        peso = "700" if "700" in a else "400 500"
        out.append(f"@font-face{{font-family:'{nome}';src:url('{Path(FONTES / a).as_uri()}') format('woff2');font-weight:{peso};}}")
    return "\n".join(out)


def html(d, kind):
    mono = "font-family:'JetBrains Mono',monospace" if d["fonte"] == "Inter" else "font-family:'Plex Mono',monospace"
    mono += ""
    if d["fonte"] == "Plex Cond":
        mono = "font-family:'Plex Mono',monospace"
    papel = d["cartao"] == "papel"
    fundo = d["fundo"]
    if papel:
        fundo = (
            "repeating-linear-gradient(transparent 0 46px, #cfe0d4 46px 48px) #f1f6f0"
        )
    regua = (
        f"<i style=\"position:absolute;left:150px;top:0;bottom:0;width:3px;background:{d.get('vermelho','#d23a2c')};opacity:.75\"></i>"
        if papel else ""
    )
    sombra = "0 2px 24px rgba(0,0,0,.55)" if not papel else "none"
    base = f"""
    <style>
      html,body{{margin:0;width:{LARG}px;height:{ALT}px;background:transparent;}}
      body{{font-family:'{d['fonte']}',sans-serif;color:{d['tinta']};overflow:hidden}}
      .frame{{position:absolute;inset:0;{'' if kind != 'close' else 'background:transparent;'} }}
      .bg{{position:absolute;inset:0;background:{fundo}}}
      .kicker{{{mono};font-size:26px;letter-spacing:.16em;text-transform:uppercase;color:{d['apoio']}}}
      h1{{font-weight:800;font-size:92px;line-height:1.02;letter-spacing:-.03em;margin:0;text-shadow:{sombra}}}
      .sub{{font-size:42px;line-height:1.3;color:{d['apoio']};max-width:820px}}
      .marca{{display:flex;align-items:center;gap:22px;font-weight:800;font-size:44px;letter-spacing:-.02em}}
      .marca img{{width:230px;height:230px;object-fit:contain}}
      .botao{{display:inline-block;background:{d['acento']};color:{d['fundo'] if not papel else '#f1f6f0'};font-weight:800;font-size:40px;padding:22px 40px;border-radius:999px}}
      .ctt{{font-size:32px;font-weight:600;color:{d['apoio']}}}
      .aviso{{font-size:22px;line-height:1.3;color:{d['apoio']};opacity:.85}}
      .conteudo{{position:absolute;left:120px;right:120px;top:240px;bottom:220px;display:flex;flex-direction:column}}
    </style>"""
    if kind == "hook":
        return f"""<!doctype html><html><head><meta charset="utf-8">{base}
        <style>{fonte_css(d['fonte'])}</style></head><body>
        <div class="bg" style="background:linear-gradient(180deg,{d['scrim_hook']})"></div>
        <div class="conteudo" style="justify-content:flex-start">
          <p class="kicker" style="margin:0 0 26px">{d['kicker']}</p>
          <h1>{d['gancho']}</h1>
        </div></body></html>"""
    if kind == "close":
        return f"""<!doctype html><html><head><meta charset="utf-8">{base}
        <style>{fonte_css(d['fonte'])}</style></head><body>
        <div class="bg" style="background:linear-gradient(180deg,{d['scrim_close']})"></div>
        <div class="conteudo" style="justify-content:flex-end">
          <div class="marca"><img src="{logo_data_uri(d['logo'])}"><span>{d['nome']}</span></div>
          <h1 style="font-size:74px;margin:26px 0 0">{d['fecho']}</h1>
          <p class="ctt" style="margin:26px 0 34px">{d['botao']}<br>{d['site']}</p>
          <div><span class="botao">Falar no WhatsApp</span></div>
          {f'<p class="aviso" style="margin-top:26px">{d["rodape"]}</p>' if d.get('rodape') else ''}
        </div></body></html>"""
    # cartões cheios (c2/c3/c4)
    corpo = {
        "c2": (d["c2_tit"], d["c2_sub"], "01"),
        "c3": (d["c3_tit"], d["c3_sub"], "02"),
        "c4": (d["c4_tit"], d["c4_sub"], "03"),
    }[kind]
    tit, sub, num = corpo
    return f"""<!doctype html><html><head><meta charset="utf-8">{base}
    <style>{fonte_css(d['fonte'])}</style></head><body>
    <div class="bg"></div>{regua}
    <div class="conteudo" style="justify-content:center">
      <p class="kicker" style="margin:0 0 18px">{num} · {d['nome']}</p>
      <h1 style="font-size:84px">{tit}</h1>
      <p class="sub" style="margin-top:34px">{sub}</p>
    </div>
    <p style="position:absolute;left:120px;bottom:220px;margin:0;{mono};font-size:22px;letter-spacing:.16em;text-transform:uppercase;color:{d['apoio']};opacity:.8">{d['site']}</p>
    </body></html>"""


def renderizar_pngs(slug, d):
    pasta = CONTEUDO / slug
    pasta.mkdir(parents=True, exist_ok=True)
    caminhos = {}
    with sync_playwright() as p:
        nav = p.chromium.launch()
        pg = nav.new_page(viewport={"width": LARG, "height": ALT}, device_scale_factor=1)
        for kind in ("hook", "c2", "c3", "c4", "close"):
            arquivo = pasta / f"{kind}.html"
            arquivo.write_text(html(d, kind), encoding="utf-8")
            pg.goto(arquivo.as_uri())
            pg.wait_for_timeout(250)
            pg.evaluate("async () => { await document.fonts.ready; await Promise.all([...document.images].map(i => i.complete ? 1 : new Promise(r => { i.onload = i.onerror = r; }))); }")
            destino = pasta / f"{kind}.png"
            pg.screenshot(path=str(destino), omit_background=(kind in ("hook", "close")))
            caminhos[kind] = destino
        nav.close()
    return caminhos


def ff(args):
    r = subprocess.run(["ffmpeg", "-v", "error", "-y", *map(str, args)], capture_output=True, text=True)
    if r.returncode != 0:
        raise SystemExit(f"ffmpeg falhou:\n{r.stderr[-3000:]}")


def montar(slug, d, pngs, clipe):
    pasta = CONTEUDO / slug
    trab = pasta / "_trab"
    trab.mkdir(exist_ok=True)
    dur = {"s1": 3.8, "s2": 3.4, "s3": 3.4, "s4": 2.6, "s5": 4.4}
    t = d["transicao_dur"]

    # S1: clipe 3D + gancho
    ff(["-stream_loop", "-1", "-i", clipe, "-loop", "1", "-i", pngs["hook"], "-t", dur["s1"],
        "-filter_complex",
        f"[0:v]scale=-2:{ALT},crop={LARG}:{ALT},fps={FPS},"
        f"zoompan=z='1+0.0012*on':x='(iw-iw/zoom)/2':y='(ih-ih/zoom)/2':d=1:s={LARG}x{ALT}:fps={FPS},setsar=1[bg];"
        f"[bg][1:v]overlay=0:0:format=auto,format=yuv420p[v]",
        "-map", "[v]", "-r", FPS, "-c:v", "libx264", "-crf", "20", "-preset", "medium", trab / "s1.mp4"])

    # S5: último quadro do clipe, câmera continua, + fecho
    ultimo = trab / "ultimo.png"
    ff(["-sseof", "-0.2", "-i", clipe, "-frames:v", "1", ultimo])
    ff(["-loop", "1", "-i", ultimo, "-loop", "1", "-i", pngs["close"], "-t", dur["s5"],
        "-filter_complex",
        f"[0:v]scale=-2:{ALT},crop={LARG}:{ALT},"
        f"zoompan=z='1.02+0.0016*on':x='(iw-iw/zoom)/2':y='(ih-ih/zoom)/2':d=1:s={LARG}x{ALT}:fps={FPS},setsar=1[bg];"
        f"[bg][1:v]overlay=0:0:format=auto,format=yuv420p[v]",
        "-map", "[v]", "-r", FPS, "-c:v", "libx264", "-crf", "20", "-preset", "medium", trab / "s5.mp4"])

    # cartões cheios com zoom lento
    for k in ("s2", "s3", "s4"):
        origem = pngs["c" + k[-1]] if k != "s4" else pngs["c4"]
        ff(["-loop", "1", "-i", origem, "-t", dur[k],
            "-vf", f"scale={LARG*2}:{ALT*2},zoompan=z='1+0.0005*on':x='(iw-iw/zoom)/2':y='(ih-ih/zoom)/2':d=1:s={LARG}x{ALT}:fps={FPS},format=yuv420p",
            "-r", FPS, "-c:v", "libx264", "-crf", "20", "-preset", "medium", trab / f"{k}.mp4"])

    # encadeia com xfade
    entradas = []
    for k in ("s1", "s2", "s3", "s4", "s5"):
        entradas += ["-i", trab / f"{k}.mp4"]
    acumulado = dur["s1"]
    filtro = ""
    anterior = "[0:v]"
    for i, k in enumerate(("s2", "s3", "s4", "s5"), start=1):
        offset = acumulado - t
        saida = f"[x{i}]"
        filtro += f"{anterior}[{i}:v]xfade=transition={d['transicao']}:duration={t}:offset={offset:.3f}{saida};"
        anterior = saida
        acumulado = acumulado - t + dur[k]
    filtro = filtro.rstrip(";") + f";{anterior}format=yuv420p[v]"

    destino = ENTREGAS / f"2026-11-chamada-{slug}"
    destino.mkdir(parents=True, exist_ok=True)
    ff([*entradas, "-filter_complex", filtro, "-map", "[v]", "-r", FPS,
        "-c:v", "libx264", "-crf", "21", "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
        destino / "video-9x16.mp4"])

    # capa = quadro do gancho
    ff(["-i", destino / "video-9x16.mp4", "-ss", "0.6", "-frames:v", "1", destino / "capa-9x16.png"])

    (destino / "info.json").write_text(json.dumps({
        "titulo": d["gancho"],
        "data": "2026-11-23",
        "descricao": d["fecho"],
        "serie": "Chamada 15s",
        "orientacoes": [
            "Vídeo mudo: o texto na tela é a mensagem.",
            "9:16 para Reels, Stories e TikTok; exporte o 16:9 do mesmo projeto quando for para o site.",
        ],
    }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (destino / "legenda-instagram.txt").write_text(d["legenda_ig"] + "\n", encoding="utf-8")
    return destino


def main():
    slugs = sys.argv[1:] or ["tech", "contabilidade"]
    for slug in slugs:
        d = DADOS[slug]
        origem = MARKETING / "conteudo" / "2026-11-chamadas" / slug / "elemento.mp4"
        if not origem.exists():
            raise SystemExit(f"falta o clipe 3D em {origem} (gere com wan_t2v.py)")
        pngs = renderizar_pngs(slug, d)
        destino = montar(slug, d, pngs, origem)
        print(f"{slug}: {destino}")


if __name__ == "__main__":
    main()
