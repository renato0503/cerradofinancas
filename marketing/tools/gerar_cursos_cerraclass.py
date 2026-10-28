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

# Diagramação por curso: fundo próprio (cor do cerrado, identidade CerraClass "Sábado de sala"),
# emoji da legenda e hashtags. O slug "ia-na-farma" evita colidir com a campanha "ia-farma" (propagandistas).
VISUAL = {
    "pres-ia-gestao":                 ("ia-na-gestao", "#ffc83d", "📈", "#GestaoEmpresarial #Lideranca #IAnaGestao"),
    "pres-excel-ia":                  ("excel-com-ia", "#4cc274", "📊", "#Excel #Planilhas #ExcelComIA"),
    "pres-consultoria-contabil-ia":   ("consultoria-contabil-ia", "#7cc4f0", "🧮", "#Contabilidade #Contador #ConsultoriaContabil"),
    "pres-consultoria-financeira-ia": ("consultoria-financeira-ia", "#ff9f2e", "💰", "#Financas #FluxoDeCaixa #ConsultoriaFinanceira"),
    "pres-intro-analise-dados":       ("analise-de-dados", "#b9a3ff", "🔎", "#AnaliseDeDados #Dados #DataAnalytics"),
    "pres-bpmn-ia":                   ("bpmn-com-ia", "#f2684f", "🗺️", "#BPMN #Processos #GestaoDeProcessos"),
    "pres-intro-automacao-ia":        ("automacao-com-ia", "#cbe847", "⚡", "#Automacao #NoCode #Produtividade"),
    "pres-ciencia-dados-aplicada":    ("ciencia-de-dados", "#3fcfbf", "🧪", "#CienciaDeDados #Python #MachineLearning"),
    "pres-ia-farma":                  ("ia-na-farma", "#ff8fb8", "💊", "#Farmacia #Drogaria #VarejoFarmaceutico"),
    "pres-bi-dashboards-ia":          ("bi-dashboards-ia", "#8fa6ff", "📉", "#PowerBI #BI #Dashboards"),
    "pres-prototipacao-apps-ia":      ("prototipacao-apps-ia", "#ff7a5c", "📱", "#Apps #Prototipacao #NoCode"),
}
TAGS_BASE = "#CerraClass #InteligenciaArtificial #CursoPresencial #Cuiaba #MatoGrosso"
WHATS = "(67) 99351-5206"
TURMA = "Turma de até 10 alunos"


def formato_partes(c):
    f = DADOS["formatos"][c["format"]]
    return [f["label"], f["totalHours"], f["summary"]]


def formato_txt(c):
    return " · ".join(formato_partes(c))


def formato_html(c):
    return '<div class="formato">' + "".join(f"<span>{escape(t)}</span>" for t in formato_partes(c)) + "</div>"


def tamanho_titulo(titulo, tamanhos=(190, 150, 124)):
    n = len(titulo)
    return tamanhos[0] if n <= 14 else tamanhos[1] if n <= 24 else tamanhos[2]


CABECALHO = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="entrega" content="{entrega}">
  <meta name="formato" content="{formato}">
  <title>{titulo}</title>
  <link rel="stylesheet" href="../../brand/cerraclass/marca.css">
</head>
<body style="--campo: {cor}">
"""
RODAPE_PECA = """  <script src="../../brand/slides.js"></script>
</body>
</html>
"""
LOGO = "../../brand/cerraclass/logo.png"


def rodape(primeiro=False):
    direita = "<span>arraste →</span>" if primeiro else "<span data-pagina></span>"
    return f"""    <div class="rodape">
      <span class="marca"><span class="selo"><img src="{LOGO}" alt=""></span> CerraClass</span>
      {direita}
    </div>"""


def slide(conteudo, classe="", primeiro=False):
    return f'  <section class="slide {classe}">\n{conteudo}\n{rodape(primeiro)}\n  </section>\n'


def bloco_regua(p):
    quando = p["when"]
    if "·" in quando:  # "Encontro 1 · Sexta · 19:00 – 22:00"
        _, dia, hora = [x.strip() for x in quando.split("·")]
        return f'<span class="hora"><small>{escape(dia)}</small>{escape(hora)}</span>'
    return f'<span class="hora">{escape(quando)}</span>'


def carrossel(c, entrega, cor):
    s = []
    s.append(slide(f"""    <span class="etiqueta">Curso presencial · {escape(c['category'])}</span>
    <h1 class="mega" style="font-size: {tamanho_titulo(c['title'])}px">{escape(c['title'])}</h1>
    <p class="sub" style="margin: 44px 0 48px">{escape(c['description'])}</p>
    {formato_html(c)}
    <div class="turma mini">
      <div class="assentos">{'<i></i>' * 10}</div>
      <span class="legenda-turma">Turma de até<br>10 alunos</span>
    </div>""", "capa", primeiro=True))

    itens = "\n".join(f"      <li>{escape(a)}</li>" for a in c["audience"][:4])
    s.append(slide(f"""    <span class="etiqueta">Para quem é</span>
    <h2 class="titulo">Feito para você que é</h2>
    <ul class="lista">
{itens}
    </ul>"""))

    itens = "\n".join(f"      <li>{escape(o)}</li>" for o in c["outcomes"][:5])
    s.append(slide(f"""    <span class="etiqueta">O que você vai aprender</span>
    <h2 class="titulo">Na prática, do início ao fim</h2>
    <ul class="lista compacta">
{itens}
    </ul>"""))

    blocos = "\n".join(
        f'      <div class="bloco">{bloco_regua(p)}<span class="nome">{escape(p["title"])}</span></div>'
        for p in c["program"][:4])
    rotulo = "4 encontros" if c["format"] == "imersao" else "Um sábado, 4 blocos"
    s.append(slide(f"""    <span class="etiqueta">Programa</span>
    <h2 class="titulo">{rotulo}</h2>
    <div class="regua">
{blocos}
    </div>"""))

    entregas = "\n".join(f"        <li>{escape(d)}</li>" for d in c["deliverables"][:4])
    ferramentas = " / ".join(escape(t) for t in c["tools"][:6])
    s.append(slide(f"""    <span class="etiqueta">Você sai com</span>
    <h2 class="titulo">Material pronto para usar</h2>
    <div class="ticket">
      <ul>
{entregas}
      </ul>
    </div>
    <p class="ferramentas"><b>Ferramentas</b> {ferramentas}</p>"""))

    s.append(slide(f"""    <span class="etiqueta">Presencial, em Cuiabá</span>
    <div class="turma">
      <span class="num">10<small>alunos,<br>no máximo</small></span>
      <div class="assentos">{'<i></i>' * 10}</div>
    </div>
    <ul class="lista compacta" style="margin-top: 64px">
      <li>Certificado impresso com QR Code de validação</li>
      <li>Material didático físico e coffee break</li>
      <li>Arquivos, prompts e modelos usados em aula para levar</li>
      <li>Grupo de suporte no WhatsApp depois do curso</li>
    </ul>""", "tinta"))

    s.append(slide(f"""    <span class="etiqueta">Inscrições abertas</span>
    <h2 class="mega" style="font-size: 132px">Garanta sua vaga na próxima turma</h2>
    <div class="contatos">
      <span class="contato principal">cerraclass.com.br</span>
      <span class="contato">WhatsApp {WHATS}</span>
    </div>
    <img class="logo-grande" data-sangra src="{LOGO}" alt="">"""))

    cab = CABECALHO.format(entrega=entrega, formato="1080x1350", titulo=f"Carrossel: {escape(c['title'])}", cor=cor)
    return cab + "\n".join(s) + RODAPE_PECA


def story(c, entrega, cor):
    cab = CABECALHO.format(entrega=entrega, formato="1080x1920", titulo=f"Story: {escape(c['title'])}", cor=cor)
    return cab + f"""  <!-- área segura: ~250px livres no topo e na base -->
  <section class="slide story">
    <span class="etiqueta">CerraClass · {escape(c['category'])}</span>
    <h1 class="mega" style="font-size: {tamanho_titulo(c['title'], (140, 116, 100))}px">{escape(c['title'])}</h1>
    <p class="sub" style="margin: 40px 0 44px">{escape(c['description'])}</p>
    {formato_html(c)}
    <ul class="lista compacta" style="margin-top: 56px">
      <li><b>Você sai com:</b> {escape(c['deliverables'][0])}</li>
      <li><b>Certificado</b> impresso com QR Code</li>
    </ul>
    <div class="turma" style="margin-top: 70px">
      <span class="num">10<small>alunos,<br>no máximo</small></span>
      <div class="assentos" style="width: 520px">{'<i></i>' * 10}</div>
    </div>
    <span class="contato principal" style="margin-top: auto">cerraclass.com.br</span>
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
📍 Presencial em Cuiabá, turma de até 10 alunos
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

Turmas de até 10 alunos em Cuiabá, com certificado e nota fiscal para empresas.
Inscrições: {link}
"""
    return ig, li


def main():
    gerados = []
    for c in DADOS["cursos"]:
        slug, cor, emoji, tags = VISUAL[c["id"]]
        entrega = PREFIXO + slug
        pasta_post = RAIZ / "posts" / entrega
        pasta_entrega = RAIZ / "entregas" / entrega
        pasta_post.mkdir(parents=True, exist_ok=True)
        pasta_entrega.mkdir(parents=True, exist_ok=True)

        (pasta_post / "carrossel.html").write_text(carrossel(c, entrega, cor), encoding="utf-8")
        (pasta_post / "story.html").write_text(story(c, entrega, cor), encoding="utf-8")

        ig, li = legendas(c, emoji, tags)
        (pasta_entrega / "legenda-instagram.txt").write_text(ig, encoding="utf-8")
        (pasta_entrega / "legenda-linkedin.txt").write_text(li, encoding="utf-8")
        info = {
            "titulo": f"Curso {c['title']}",
            "data": DATA,
            "descricao": f"{c['description']} {formato_txt(c)}. Campanha gerada a partir do catálogo oficial da Cerraclass.",
            "orientacoes": [
                "Carrossel: postar os 7 PNGs na ordem (carrossel-01 a 07) no Instagram e no LinkedIn.",
                "Vídeo (15s, com som): versão vertical para Reels, TikTok e Shorts; versão 16:9 para LinkedIn e YouTube.",
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
