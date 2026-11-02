"""Gera a série "IA da semana" do @cerra.ai, na identidade do Cerra.AI ("Silício local").

A pauta vem do acervo público github.com/drix10/ai-resources (licença CC BY 4.0), mas **o texto é
escrito aqui**: o acervo serve para achar o assunto, e cada número usado foi conferido abrindo a fonte
original (o resumo do acervo vem de post de rede social e não é fato verificado).

Como a série é semanal, o gerador é dirigido por dados: cada edição é um JSON em
`marketing/dados/ia_da_semana/AAAAMMDD.json` com a copy já revisada e as fontes. O gerador monta o
carrossel de 6 slides, o story, as legendas (Instagram e LinkedIn) e o `info.json`.

Para abrir uma edição nova:
    1. python tools/gerar_ia_da_semana.py --coletar 2026-11-09
       (baixa os briefings da semana e salva os candidatos em dados/ia_da_semana/candidatos-AAAAMMDD.json)
    2. escolher 3 notícias, **abrir a fonte de cada uma** e escrever o JSON da edição
    3. python tools/gerar_ia_da_semana.py
    4. exportar, verificar, animar o carrossel, agendar e publicar (ver marketing/README.md)

Uso:
    python tools/gerar_ia_da_semana.py                 # gera todas as edições
    python tools/gerar_ia_da_semana.py --coletar 2026-11-09
"""

import json
import re
import urllib.parse
import urllib.request
from html import escape
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
DADOS = RAIZ / "dados" / "ia_da_semana"
API = "https://blogs.drix10.com/api/articles"
WHATS = "(67) 99351-5206"
LINK_WHATS = "https://api.whatsapp.com/send?phone=5567993515206"
LOGO = "../../../img/logo_cerraai-icone.png"
CSS = '<link rel="stylesheet" href="../../brand/cerraai/marca.css">\n  <link rel="stylesheet" href="../../brand/cerraai/extras.css">'
FIM = '  <script src="../../brand/slides.js"></script>\n</body>\n</html>\n'


# ---------------------------------------------------------------- texto

def c(t):
    """Converte o mini-markup: **negrito** e <c>destaque</c>."""
    s = escape(t)
    s = s.replace("&lt;c&gt;", '<span class="c">').replace("&lt;/c&gt;", "</span>")
    s = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", s)
    return s


def cab(entrega, formato, titulo):
    return f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="entrega" content="{entrega}">
  <meta name="formato" content="{formato}">
  <title>{escape(titulo)}</title>
  {CSS}
</head>
<body>
"""


def rodape(p=False):
    d = '<span class="arraste">arraste →</span>' if p else "<span data-pagina></span>"
    return f'    <div class="rodape">\n      <span class="marca"><img src="{LOGO}" alt=""> Cerra.AI <small>by Cerrado Tech</small></span>\n      {d}\n    </div>'


def sec(conteudo, classe="", p=False):
    return f'  <section class="slide {classe}">\n{conteudo}\n{rodape(p)}\n  </section>\n'


def linhas(itens, estilo=""):
    return '<ul class="linhas"' + (f' style="{estilo}"' if estilo else "") + ">" + "".join(
        f"<li><span>{c(i)}</span></li>" for i in itens
    ) + "</ul>"


# ---------------------------------------------------------------- carrossel

def carrossel(d):
    entrega = d["entrega"]
    capa = d["capa"]
    s = [
        sec(f"""    <p class="rotulo">{escape(capa["rotulo"])}</p>
    <h1 class="mega" style="font-size: 104px">{c(capa["titulo"])}</h1>
    <p class="sub" style="margin-top: 36px; max-width: 760px">{c(capa["sub"])}</p>
    <span class="selo" style="margin-top: 44px">{escape(d["periodo"])}</span>
    <img class="emblema" data-sangra style="width: 340px; right: -110px; bottom: 150px" src="{LOGO}" alt="">""", p=True),
    ]

    for n in d["noticias"]:
        s.append(sec(f"""    <p class="rotulo">{escape(n["rotulo"])}</p>
    <h2 class="titulo" style="font-size: 60px">{c(n["titulo"])}</h2>
    <p class="sub" style="font-size: 30px; margin-top: 10px">{c(n["resumo"])}</p>
    {linhas(n["pratica"], "margin-top: 34px; font-size: 31px")}
    <p class="sub" style="margin-top: auto; margin-bottom: 190px; font-size: 26px">{escape(n["fonte"])}</p>"""))

    m = d["muda"]
    s.append(sec(f"""    <p class="rotulo">Leitura da semana</p>
    <h2 class="titulo" style="font-size: 62px">{c(m["titulo"])}</h2>
    {linhas(m["linhas"], "margin-top: 24px; font-size: 31px")}
    <p class="sub" style="margin-top: auto; margin-bottom: 190px; font-size: 25px">{c(m["nota"])}</p>"""))

    cta = d["cta"]
    s.append(sec(f"""    <p class="rotulo">Demonstração</p>
    <h2 class="mega" style="font-size: 96px">{c(cta["titulo"])}</h2>
    <p class="sub" style="margin-top: 30px">{c(cta["sub"])}</p>
    <div class="contatos">
      <span class="contato principal">{escape(cta["link"])}</span>
      <span class="contato">WhatsApp {WHATS}</span>
    </div>""", "cobre"))
    return cab(entrega, "1080x1350", f'Carrossel: {d["edicao"]}') + "\n".join(s) + FIM


def story(d):
    entrega = d["entrega"]
    st = d["story"]
    return cab(entrega, "1080x1920", f'Story: {d["edicao"]}') + f"""  <!-- área segura: ~250px livres no topo e na base -->
  <section class="slide story">
    <p class="rotulo">{escape(d["edicao"])}</p>
    <h1 class="mega" style="font-size: 92px">{c(st["titulo"])}</h1>
    {linhas(st["linhas"], "margin-top: 46px; font-size: 34px")}
    <span class="selo" style="margin-top: 44px">{escape(st["selo"])}</span>
    <span class="contato principal" style="margin-top: auto; font-family: 'JetBrains Mono', monospace; font-size: 32px; font-weight: 700; align-self: flex-start; background: var(--cobre); color: var(--grafite); padding: 22px 30px; border-radius: 6px">{escape(d["cta"]["link"])}</span>
  </section>
""" + FIM


# ---------------------------------------------------------------- legendas

def legenda_instagram(d):
    linhas_ = [
        f"{d['edicao']} · {d['periodo']}",
        "",
        d["capa"]["sub"],
        "",
    ]
    for i, n in enumerate(d["noticias"], start=1):
        linhas_.append(f"{i}️⃣ {re.sub(r'<[^>]+>', '', n['titulo'])}")
        linhas_.append(re.sub(r"<[^>]+>", "", n["resumo"]))
        linhas_.append("")
    linhas_ += [
        "O que isso muda na sua empresa:",
        *[re.sub(r"<[^>]+>", "", l).replace("**", "") for l in d["muda"]["linhas"]],
        "",
        "🔎 Fontes (confere a original antes de repassar):",
        *[f"· {n['fonte'].replace('Fonte: ', '')} — {n['url']}" for n in d["noticias"]],
        "",
        "Esta série resume o que foi publicado na semana e confere a fonte original antes de usar. "
        "Resumo de anúncio não é fato verificado.",
        "",
        f"Demonstração com os seus documentos: WhatsApp {WHATS}",
        f"🔗 {d['cta']['link']}",
        "",
        "#CerraAI #IALocal #IAOffline #InteligenciaArtificial #LGPD #CerradoTech",
    ]
    return "\n".join(linhas_) + "\n"


def legenda_linkedin(d):
    linhas_ = [
        f"{d['edicao']} — {d['periodo']}",
        "",
        d["capa"]["sub"],
        "",
    ]
    for i, n in enumerate(d["noticias"], start=1):
        linhas_.append(f"{i}. {re.sub(r'<[^>]+>', '', n['titulo'])}")
        linhas_.append(re.sub(r"<[^>]+>", "", n["resumo"]))
        linhas_.append("")
    linhas_ += [
        "O que isso muda na prática:",
        *[re.sub(r"<[^>]+>", "", l).replace("**", "") for l in d["muda"]["linhas"]],
        "",
        "Fontes (confira a original):",
        *[f"· {n['fonte'].replace('Fonte: ', '')} — {n['url']}" for n in d["noticias"]],
        "",
        "Série " + d["edicao"] + ": toda semana, o que mudou na IA e o que muda dentro da empresa. "
        "O texto é conferido na fonte original antes de publicar.",
        "",
        f"Demonstração: {d['cta']['link']}",
    ]
    return "\n".join(linhas_) + "\n"


# ---------------------------------------------------------------- coletar

def coletar(semana):
    """Baixa os briefings da semana como candidatos (só pauta; o texto é escrito à mão)."""
    DADOS.mkdir(parents=True, exist_ok=True)
    url = f"{API}?since={semana}&limit=200"
    with urllib.request.urlopen(url, timeout=60) as r:
        itens = json.loads(r.read().decode("utf-8"))["items"]
    saida = {
        "semana": semana,
        "aviso": "Pauta apenas. Antes de usar, abrir a fonte original e conferir o número.",
        "itens": [
            {
                "data": i["date"],
                "categoria": i["category"],
                "titulo": i["title"],
                "descricao": i["description"],
                "slug": i["slug"],
                "fontes": i.get("sources", []),
            }
            for i in itens
        ],
    }
    arquivo = DADOS / f"candidatos-{semana}.json"
    arquivo.write_text(json.dumps(saida, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"{arquivo} ({len(itens)} briefings)")


# ---------------------------------------------------------------- main

def main():
    import argparse

    ap = argparse.ArgumentParser()
    ap.add_argument("--coletar", metavar="AAAA-MM-DD", help="baixa os briefings da semana como pauta")
    args = ap.parse_args()
    if args.coletar:
        coletar(args.coletar)
        return

    for arquivo in sorted(DADOS.glob("????-??-??.json")):
        d = json.loads(arquivo.read_text(encoding="utf-8"))
        entrega = d["entrega"]
        post, ent = RAIZ / "posts" / entrega, RAIZ / "entregas" / entrega
        post.mkdir(parents=True, exist_ok=True)
        ent.mkdir(parents=True, exist_ok=True)
        (post / "carrossel.html").write_text(carrossel(d), encoding="utf-8")
        (post / "story.html").write_text(story(d), encoding="utf-8")
        (ent / "legenda-instagram.txt").write_text(legenda_instagram(d), encoding="utf-8")
        (ent / "legenda-linkedin.txt").write_text(legenda_linkedin(d), encoding="utf-8")
        info = {
            "titulo": f'{d["edicao"]} · {d["titulo"]}',
            "data": d["data"],
            "descricao": (
                f'Série "{d["edicao"]}" do {d["conta"]}: 3 notícias da semana de IA, cada uma com a fonte '
                "conferida, e a leitura do que muda dentro da empresa. Pauta no acervo público ai-resources "
                "(CC BY 4.0), texto reescrito e fontes conferidas na origem."
            ),
            "orientacoes": [
                "Postar no " + d["conta"] + ".",
                "Carrossel: carrossel-01 a 06, na ordem. No LinkedIn, os PNGs como documento.",
                "A legenda traz os links das fontes. Conferir a fonte original antes de repostar.",
                "Carrossel animado (carrossel-animado.mp4) vira o Reel da semana.",
            ],
            "conta": d["conta"],
            "serie": "IA da semana",
        }
        (ent / "info.json").write_text(json.dumps(info, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(entrega)


if __name__ == "__main__":
    main()
