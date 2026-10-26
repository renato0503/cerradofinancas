"""Gera as campanhas dos cursos presenciais da Cerraclass a partir de dados/cerraclass-cursos.json.

Para cada curso: posts/2026-10-curso-<slug>/{carrossel,story}.html e, em entregas/,
as legendas (Instagram e LinkedIn) e o info.json. Depois rode tools/exportar.py nas peças
e tools/publicar.py. Para atualizar os dados: node tools/importar-cerraclass.mjs

Uso:
    python tools/gerar_cursos_cerraclass.py
"""
import json
from html import escape
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
DADOS = json.loads((RAIZ / "dados" / "cerraclass-cursos.json").read_text(encoding="utf-8"))
PREFIXO = "2026-10-curso-"
DATA = "2026-10-29"

# Diagramação por curso: cor de destaque, ícone Phosphor (equivalente ao Material Icon da CerraClass),
# emoji da legenda e hashtags. O slug "ia-na-farma" evita colidir com a campanha "ia-farma" (propagandistas).
VISUAL = {
    "pres-ia-gestao":                 ("ia-na-gestao", "#a78bfa", "chart-line-up", "📈", "#GestaoEmpresarial #Lideranca #IAnaGestao"),
    "pres-excel-ia":                  ("excel-com-ia", "#4ade80", "table", "📊", "#Excel #Planilhas #ExcelComIA"),
    "pres-consultoria-contabil-ia":   ("consultoria-contabil-ia", "#2dd4bf", "calculator", "🧮", "#Contabilidade #Contador #ConsultoriaContabil"),
    "pres-consultoria-financeira-ia": ("consultoria-financeira-ia", "#fbbf24", "bank", "💰", "#Financas #FluxoDeCaixa #ConsultoriaFinanceira"),
    "pres-intro-analise-dados":       ("analise-de-dados", "#38bdf8", "chart-bar", "🔎", "#AnaliseDeDados #Dados #DataAnalytics"),
    "pres-bpmn-ia":                   ("bpmn-com-ia", "#fb7185", "tree-structure", "🗺️", "#BPMN #Processos #GestaoDeProcessos"),
    "pres-intro-automacao-ia":        ("automacao-com-ia", "#fb923c", "lightning", "⚡", "#Automacao #NoCode #Produtividade"),
    "pres-ciencia-dados-aplicada":    ("ciencia-de-dados", "#818cf8", "flask", "🧪", "#CienciaDeDados #Python #MachineLearning"),
    "pres-ia-farma":                  ("ia-na-farma", "#f472b6", "pill", "💊", "#Farmacia #Drogaria #VarejoFarmaceutico"),
    "pres-bi-dashboards-ia":          ("bi-dashboards-ia", "#22d3ee", "gauge", "📉", "#PowerBI #BI #Dashboards"),
    "pres-prototipacao-apps-ia":      ("prototipacao-apps-ia", "#e879f9", "device-mobile", "📱", "#Apps #Prototipacao #NoCode"),
}
TAGS_BASE = "#Cerraclass #InteligenciaArtificial #CursoPresencial #Cuiaba #MatoGrosso"
WHATS = "(67) 99351-5206"


def formato_txt(c):
    f = DADOS["formatos"][c["format"]]
    return f"{f['label']} · {f['totalHours']} · {f['summary']}"


def titulo_html(titulo, tamanhos=(118, 104, 92)):
    """Destaca 'com IA' (ou a última palavra) na cor do curso e ajusta o tamanho ao comprimento."""
    t = escape(titulo)
    if " com IA" in t:
        t = t.replace(" com IA", ' <span class="acento">com IA</span>')
    elif t.endswith(" IA") or " IA " in t:
        t = t.replace(" IA", ' <span class="acento">IA</span>', 1)
    else:
        partes = t.rsplit(" ", 1)
        t = f'{partes[0]} <span class="acento">{partes[1]}</span>' if len(partes) == 2 else t
    n = len(titulo)
    tam = tamanhos[0] if n <= 16 else tamanhos[1] if n <= 26 else tamanhos[2]
    return t, tam


CABECALHO = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="entrega" content="{entrega}">
  <meta name="formato" content="{formato}">
  <title>{titulo}</title>
  <link rel="stylesheet" href="../../brand/carrossel.css">
  <script src="https://unpkg.com/@phosphor-icons/web@2.1.1"></script>
</head>
<body style="--acento: {cor}">
"""
RODAPE_PECA = """  <script src="../../brand/slides.js"></script>
</body>
</html>
"""
FOLHA = "../../../img/folinha-hero.png"


def rodape(primeiro=False):
    direita = '<span class="arraste">Arraste <i class="ph-bold ph-arrow-right"></i></span>' if primeiro else "<span data-pagina></span>"
    return f"""    <div class="rodape">
      <span class="marca"><img src="{FOLHA}" alt=""> Cerraclass</span>
      {direita}
    </div>"""


def slide(conteudo, classe="", primeiro=False):
    return f'  <section class="slide {classe}">\n{conteudo}\n{rodape(primeiro)}\n  </section>\n'


def carrossel(c, entrega, cor, icone):
    titulo, tam = titulo_html(c["title"])
    s = []
    s.append(slide(f"""    <span class="kicker"><i class="ph-bold ph-graduation-cap"></i> Cerraclass · {escape(c['category'])}</span>
    <span class="icone-frente"><i class="ph-duotone ph-{icone}"></i></span>
    <h1 style="font-size: {tam}px">{titulo}</h1>
    <p class="sub">{escape(c['description'])}</p>
    <span class="formato"><i class="ph-bold ph-calendar-check"></i> {escape(formato_txt(c))}</span>""", "capa", primeiro=True))

    icones_publico = ["user-circle", "users-three", "briefcase", "student"]
    cards = "\n".join(
        f'      <div class="card"><i class="ph-duotone ph-{icones_publico[i % 4]}"></i><div><h3>{escape(a)}</h3></div></div>'
        for i, a in enumerate(c["audience"][:4]))
    s.append(slide(f"""    <span class="kicker"><i class="ph-bold ph-target"></i> Para quem é</span>
    <h2 class="titulo">Feito para você que é...</h2>
    <div class="grade uma compacta">
{cards}
    </div>""", ""))

    itens = "\n".join(f'      <li><i class="ph-bold ph-check-circle"></i> {escape(o)}</li>' for o in c["outcomes"][:5])
    s.append(slide(f"""    <span class="kicker"><i class="ph-bold ph-lightbulb"></i> O que você vai aprender</span>
    <h2 class="titulo">Na prática, do início ao fim</h2>
    <ul class="checklist">
{itens}
    </ul>""", ""))

    passos = "\n".join(
        f'      <div class="passo"><span class="n">{i + 1}</span><div><h3>{escape(p["title"])}</h3><p>{escape(p["when"])}</p></div></div>'
        for i, p in enumerate(c["program"][:4]))
    rotulo = "4 encontros" if c["format"] == "imersao" else "4 blocos no sábado"
    s.append(slide(f"""    <span class="kicker"><i class="ph-bold ph-list-numbers"></i> Programa</span>
    <h2 class="titulo">{rotulo}</h2>
    <div class="passos" style="gap: 50px">
{passos}
    </div>""", ""))

    entregas = "\n".join(f'      <li><i class="ph-bold ph-package"></i> {escape(d)}</li>' for d in c["deliverables"][:5])
    chips = "".join(f"<span>{escape(t)}</span>" for t in c["tools"][:6])
    s.append(slide(f"""    <span class="kicker"><i class="ph-bold ph-package"></i> Você sai com</span>
    <h2 class="titulo">Material pronto para usar</h2>
    <ul class="checklist">
{entregas}
    </ul>
    <p class="chips-titulo">Ferramentas</p>
    <div class="chips">{chips}</div>""", ""))

    s.append(slide("""    <span class="kicker"><i class="ph-bold ph-gift"></i> Incluso na vaga</span>
    <h2 class="titulo">Presencial, em Cuiabá</h2>
    <div class="grade">
      <div class="card"><i class="ph-duotone ph-users-three"></i><h3>Até 15 alunos</h3><p>Atenção de perto em cada exercício</p></div>
      <div class="card"><i class="ph-duotone ph-certificate"></i><h3>Certificado</h3><p>Impresso, com QR Code de validação</p></div>
      <div class="card"><i class="ph-duotone ph-book-open"></i><h3>Material e coffee</h3><p>Material físico, arquivos e prompts</p></div>
      <div class="card"><i class="ph-duotone ph-whatsapp-logo"></i><h3>Suporte depois</h3><p>Grupo no WhatsApp após o curso</p></div>
    </div>""", ""))

    s.append(slide(f"""    <img class="folha" src="{FOLHA}" alt="">
    <h2>Garanta sua vaga na <span class="acento">próxima turma</span></h2>
    <p class="sub">{escape(formato_txt(c))}</p>
    <div class="contatos">
      <span class="contato principal"><i class="ph-bold ph-graduation-cap"></i> cerraclass.com.br</span>
      <span class="contato"><i class="ph-bold ph-whatsapp-logo"></i> {WHATS}</span>
    </div>""", "cta"))

    cab = CABECALHO.format(entrega=entrega, formato="1080x1350", titulo=f"Carrossel: {escape(c['title'])}", cor=cor)
    return cab + "\n".join(s) + RODAPE_PECA


def story(c, entrega, cor, icone):
    titulo, tam = titulo_html(c["title"], (100, 90, 80))
    cards = [
        ("target", "Para quem", c["audience"][0]),
        ("package", "Você sai com", c["deliverables"][0]),
        ("users-three", "Turma de até 15 alunos", "Certificado com QR Code"),
    ]
    cards_html = "\n".join(
        f'      <div class="card"><i class="ph-duotone ph-{i}"></i><div><h3>{escape(t)}</h3><p>{escape(d)}</p></div></div>'
        for i, t, d in cards)
    cab = CABECALHO.format(entrega=entrega, formato="1080x1920", titulo=f"Story: {escape(c['title'])}", cor=cor)
    return cab + f"""  <!-- área segura: ~250px livres no topo e na base -->
  <section class="slide story">
    <span class="kicker"><i class="ph-bold ph-{icone}"></i> Cerraclass · {escape(c['category'])}</span>
    <h1 style="font-size: {tam}px">{titulo}</h1>
    <p class="sub">{escape(c['description'])}</p>
    <span class="formato"><i class="ph-bold ph-calendar-check"></i> {escape(formato_txt(c))}</span>
    <div class="grade uma">
{cards_html}
    </div>
    <span class="contato principal"><i class="ph-bold ph-graduation-cap"></i> cerraclass.com.br</span>
  </section>
""" + RODAPE_PECA


def legendas(c, emoji, tags):
    link = f"cerraclass.com.br/presencial/{c['id']}"
    aprende = "\n".join(f"✅ {o}" for o in c["outcomes"][:4])
    publico = "\n".join(f"• {a}" for a in c["audience"])
    ig = f"""{emoji} {c['title']}: {c['headline']}

O que você vai aprender:
{aprende}

Para quem é:
{publico}

📅 {formato_txt(c)}
📍 Presencial em Cuiabá, turma de até 15 alunos
🎓 Certificado com QR Code, material físico e coffee break inclusos

Inscrições: 🔗 {link}
💬 WhatsApp {WHATS}

{tags} {TAGS_BASE}
"""
    programa = "\n".join(f"{i + 1}. {p['title']}" for i, p in enumerate(c["program"]))
    entregas = "\n".join(f"• {d}" for d in c["deliverables"])
    li = f"""{c['about'][0]}

Curso presencial "{c['title']}", da Cerraclass ({formato_txt(c)}). Programa:
{programa}

Cada participante sai com:
{entregas}

Turmas de até 15 alunos em Cuiabá, com certificado e nota fiscal para empresas.
Inscrições: {link}
"""
    return ig, li


def main():
    gerados = []
    for c in DADOS["cursos"]:
        slug, cor, icone, emoji, tags = VISUAL[c["id"]]
        entrega = PREFIXO + slug
        pasta_post = RAIZ / "posts" / entrega
        pasta_entrega = RAIZ / "entregas" / entrega
        pasta_post.mkdir(parents=True, exist_ok=True)
        pasta_entrega.mkdir(parents=True, exist_ok=True)

        (pasta_post / "carrossel.html").write_text(carrossel(c, entrega, cor, icone), encoding="utf-8")
        (pasta_post / "story.html").write_text(story(c, entrega, cor, icone), encoding="utf-8")

        ig, li = legendas(c, emoji, tags)
        (pasta_entrega / "legenda-instagram.txt").write_text(ig, encoding="utf-8")
        (pasta_entrega / "legenda-linkedin.txt").write_text(li, encoding="utf-8")
        info = {
            "titulo": f"Curso {c['title']}",
            "data": DATA,
            "descricao": f"{c['description']} {formato_txt(c)}. Campanha gerada a partir do catálogo oficial da Cerraclass.",
            "orientacoes": [
                "Carrossel: postar os 7 PNGs na ordem (carrossel-01 a 07) no Instagram e no LinkedIn.",
                "Reel (1080×1920, 15s, com som): Instagram Reels, TikTok e YouTube Shorts.",
                f"Story: adicionar o sticker de link para https://{'cerraclass.com.br/presencial/' + c['id']}",
                "Valor sob consulta: as peças não citam preço nem data de turma.",
            ],
        }
        (pasta_entrega / "info.json").write_text(json.dumps(info, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        gerados.append((entrega, len(ig)))
    for e, n in gerados:
        print(f"{e}  (legenda IG: {n} caracteres)")


if __name__ == "__main__":
    main()
