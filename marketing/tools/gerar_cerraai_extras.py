"""Gera os conteúdos extras do Cerra.AI (pedido do Renato em 30/10), na identidade "Silício local":

- Glossário da IA local (5 carrosséis curtos): modelo local, RAG, OCR, anonimização e trecho consultado;
- Pergunte ao Cerra.AI: a chamada para mandar dúvidas + uma campanha por pergunta de dados/pergunte-cerraai.json;
- Comparativo honesto IA na nuvem × Cerra.AI (inclui onde a nuvem é melhor);
- Stories interativos (8 stories com o lugar do sticker marcado e o texto do sticker nas orientações);
- Checklist "Como usar IA no escritório sem ferir a LGPD" (PDF A4) + o post que divulga;
- Kit de vendas (one-pager A4 e deck 16:9, em PDF), fora da agenda.

Regras (regra 8 do HISTORICO.md): só afirma função marcada ✅ em D:\\Dev\\Cerra.AI\\docs\\FUNCIONALIDADES.md; sem cliente,
case, preço, prazo, nuvem, multiusuário, certificação LGPD, "sempre correto", Freedom Tier ou desempenho medido.
Exemplos de pergunta e resposta levam o selo "Exemplo ilustrativo". O checklist diz que não é parecer jurídico.

Marcação no texto: *x* = cobre, **x** = negrito, {x} = tarja de anonimização.

Uso:
    python tools/gerar_cerraai_extras.py          # HTML das peças + legendas + info.json
    python tools/gerar_cerraai_extras.py --pdf    # também gera os PDFs e as prévias (checklist e kit de vendas)
Depois: exportar.py (carrosséis, stories e deck), animar-carrossel (carrosséis), agendar.py e publicar.py.
"""
import json
import re
import sys
from html import escape
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
LOGO = "../../../img/logo_cerraai-icone.png"
LINK = "cerradofinancas.com.br/cerraai"
WHATS = "(67) 99351-5206"
TAGS_BASE = "#CerraAI #IALocal #IAOffline #LGPD #CerradoTech"
ILUSTRATIVO = "Exemplo ilustrativo"
CSS = '<link rel="stylesheet" href="../../brand/cerraai/marca.css">\n  <link rel="stylesheet" href="../../brand/cerraai/extras.css">'


def marca(texto):
    s = escape(texto)
    s = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", s)
    s = re.sub(r"\*([^*]+)\*", r'<span class="c">\1</span>', s)
    return re.sub(r"\{([^}]+)\}", r'<span class="tarja">\1</span>', s)


def plano(texto):
    return re.sub(r"\{[^}]+\}", "███", texto.replace("**", "").replace("*", ""))


def cabe(texto, base, largura=900):
    """Tamanho em que a maior palavra (caixa alta expandida) cabe na largura."""
    maior = max((len(w) for w in re.split(r"\s+", plano(texto))), default=1)
    return min(base, int(largura / (maior * 0.98)))


def doc(entrega, formato, titulo, corpo):
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
{corpo}  <script src="../../brand/slides.js"></script>
</body>
</html>
"""


def rodape(primeiro=False):
    direita = '<span class="arraste">arraste →</span>' if primeiro else "<span data-pagina></span>"
    return f"""    <div class="rodape">
      <span class="marca"><img src="{LOGO}" alt=""> Cerra.AI <small>by Cerrado Tech</small></span>
      {direita}
    </div>"""


def secao(miolo, classe="", primeiro=False):
    return f'  <section class="slide {classe}">\n{miolo}\n{rodape(primeiro)}\n  </section>\n'


def linhas(itens, estilo=""):
    lis = "".join(f"<li><span>{marca(i)}</span></li>" for i in itens)
    return f'<ul class="linhas"{f" style=\"{estilo}\"" if estilo else ""}>{lis}</ul>'


def tela(ws, eu, ia, cita=None):
    c = f'\n        <span class="cita">Trechos consultados: {escape(cita)}</span>' if cita else ""
    return f"""    <div class="tela">
      <div class="barra"><span>Workspace: <b>{escape(ws)}</b></span><span class="local">local</span></div>
      <div class="corpo">
        <span class="eu">{escape(eu)}</span>
        <span class="ia">{marca(ia)}</span>{c}
      </div>
    </div>"""


EMBLEMA = f'<img class="emblema" data-sangra style="width: 340px; right: -110px; bottom: 150px" src="{LOGO}" alt="">'


def capa(rotulo, titulo, sub, selo=None, base=110):
    s = f'\n    <span class="selo" style="margin-top: auto; margin-bottom: 190px">{escape(selo)}</span>' if selo else ""
    return secao(f"""    <p class="rotulo">{escape(rotulo)}</p>
    <h1 class="mega" style="font-size: {cabe(titulo, base if len(plano(titulo)) <= 34 else 88)}px">{marca(titulo)}</h1>
    <p class="sub" style="margin-top: 40px; max-width: 640px">{marca(sub)}</p>{s}
    {EMBLEMA}""", primeiro=True)


def lista_slide(rotulo, titulo, itens, cobre=False, sub=None):
    extra = f'\n    <p class="sub" style="margin-top: auto; margin-bottom: 190px; font-size: 32px">{marca(sub)}</p>' if sub else ""
    return secao(f"""    <p class="rotulo">{escape(rotulo)}</p>
    <h2 class="titulo" style="font-size: {cabe(titulo, 84 if len(plano(titulo)) <= 30 else 70)}px">{marca(titulo)}</h2>
    {linhas(itens)}{extra}""", "cobre" if cobre else "")


def cta(titulo="Veja com o *seu caso de uso*.", nota="Demonstração com os seus próprios documentos, na sua máquina.", rotulo="Demonstração"):
    return secao(f"""    <p class="rotulo">{escape(rotulo)}</p>
    <h2 class="mega" style="font-size: {cabe(titulo, 100)}px">{marca(titulo)}</h2>
    <p class="sub" style="margin-top: 30px">{escape(nota)}</p>
    <div class="contatos">
      <span class="contato principal">{LINK}</span>
      <span class="contato">WhatsApp {WHATS}</span>
    </div>""", "cobre")


def story_simples(rotulo, titulo, sub, itens=None, entrega="", nome=""):
    lst = linhas(itens, "margin-top: 70px") if itens else ""
    corpo = f"""  <!-- área segura: ~250px livres no topo e na base -->
  <section class="slide story">
    <p class="rotulo">{escape(rotulo)}</p>
    <h1 class="mega" style="font-size: {cabe(titulo, 84 if len(plano(titulo)) > 34 else 100)}px">{marca(titulo)}</h1>
    <p class="sub" style="margin-top: 40px">{marca(sub)}</p>
    {lst}
    <span class="contato principal" style="margin-top: auto; font-family: 'JetBrains Mono', monospace; font-size: 34px; font-weight: 700; align-self: flex-start; background: var(--cobre); color: var(--grafite); padding: 22px 30px; border-radius: 6px">{LINK}</span>
  </section>
"""
    return doc(entrega, "1080x1920", f"Story: Cerra.AI, {nome}", corpo)


# ============================ Glossário ============================

GLOSSARIO = [
    dict(slug="modelo-local", termo="Modelo local", verbete="substantivo · IA",
         frase="Um modelo de linguagem que roda no computador da empresa, e não no servidor de outra empresa.",
         analogia="É ter o especialista *dentro da sala*, em vez de mandar o documento pelo correio.",
         na_pratica=["A pergunta e os documentos **não saem da máquina**",
                     "Depois de instalado, **funciona sem internet**",
                     "A empresa decide **o que entra e o que fica guardado**"],
         no_cerra=["Um roteador escolhe o modelo **para cada pergunta**: um leve para saudações, um maior para o resto",
                   "O teste de interface confirma **zero requisições externas**",
                   "Os modelos são baixados **uma vez**, na instalação"],
         importa="Sigilo profissional, LGPD e trabalho que *não para quando a internet cai*.",
         tags="#ModeloLocal #LLM"),
    dict(slug="rag", termo="RAG", verbete="sigla em inglês · busca + geração",
         frase="A IA busca nos seus documentos os trechos que respondem à pergunta e só então escreve a resposta.",
         analogia="É uma *prova com consulta*: antes de responder, ela abre os seus arquivos.",
         passos=[("Você envia os documentos", "Para o workspace da sua área ou do seu cliente"),
                 ("Eles viram trechos", "Pedaços de cerca de mil caracteres, cada um com a página de origem"),
                 ("A pergunta busca os trechos", "Os mais parecidos com o que você perguntou"),
                 ("A resposta cita a fonte", "Arquivo e página embaixo da resposta")],
         tela=dict(ws="Documentos da empresa", eu="Quantos dias de férias o regulamento interno permite vender?",
                   ia="Pelo regulamento interno, até **10 dias** podem ser convertidos em abono, mediante pedido ao RH.",
                   cita="regulamento_interno.pdf (p. 14)"),
         no_cerra=["Cada trecho guarda **a página de origem**, para a citação",
                   "Nos cenários, a busca é **híbrida**: por sentido e por palavra exata, com as siglas da área",
                   "Cada workspace tem **a sua base**: um cliente não aparece no outro"],
         importa="A resposta fala da *sua empresa*, não da internet.",
         tags="#RAG #IAGenerativa"),
    dict(slug="ocr", termo="OCR", verbete="sigla em inglês · reconhecimento óptico de caracteres",
         frase="A técnica que transforma a imagem de um texto, como uma página escaneada, em texto de verdade.",
         analogia="PDF escaneado é *uma foto da página*: sem OCR, a IA vê a foto, não as palavras.",
         na_pratica=["Contrato antigo assinado e **escaneado**",
                     "Nota, recibo ou ofício **fotografado** no celular",
                     "Documento que veio **em imagem** por e-mail"],
         no_cerra=["Lê **PDF escaneado** e imagens (PNG, JPG, TIFF, WEBP…)",
                   "Avisa o que fez: **“12 páginas, 3 lidas por OCR”**",
                   "Tudo **offline**: a página não sai da máquina para ser lida"],
         importa="O arquivo esquecido no fundo da pasta *também vira resposta*.",
         tags="#OCR #Digitalizacao"),
    dict(slug="anonimizacao", termo="Anonimização", verbete="substantivo · proteção de dados",
         frase="Trocar os dados que identificam uma pessoa por marcas, antes de o texto seguir adiante.",
         analogia="É passar *a caneta preta* no nome, no CPF e no telefone antes de mostrar o papel.",
         doc_linhas=["Paciente: {Maria Aparecida Souza}", "CPF {123.456.789-00} · Tel. {(65) 99999-0000}", "Diagnóstico registrado em {12/03/2026}"],
         no_cerra=["**Relatório LGPD:** os dados são anonimizados **antes de chegar ao modelo**",
                   "**Anonimizar:** cole um texto ou um arquivo; nada é gravado",
                   "**Minimização:** CPF, RG e telefone só chegam ao modelo se a pergunta pedir"],
         importa="Usar só o dado necessário é *princípio da LGPD* (art. 6º, III).",
         tags="#Anonimizacao #ProtecaoDeDados"),
    dict(slug="trecho-consultado", termo="Trecho consultado", verbete="recurso do Cerra.AI",
         frase="A etiqueta embaixo da resposta que diz de qual arquivo e de qual página veio a informação.",
         analogia="É a *nota de rodapé* da IA.",
         tela=dict(ws="Escritório de Contabilidade", eu="Qual é o prazo de entrega da obrigação do cliente?",
                   ia="Pelo calendário fiscal da carteira, o prazo é o **dia 15**. Confira a página indicada.",
                   cita="calendario_fiscal.pdf (p. 2, 5)"),
         no_cerra=["Mostra **arquivo e página** (ou aba da planilha, ou slide)",
                   "Abriu o arquivo, **conferiu em segundos**",
                   "Se não há trecho que responda, **ele diz que não consta**"],
         importa="Confiar na IA *sem acreditar cegamente* nela.",
         tags="#TrechosConsultados #IAConfiavel"),
]


def glossario(g, n):
    entrega = f"2026-11-cerraai-glossario-{g['slug']}"
    s = [secao(f"""    <p class="rotulo">Glossário da IA local · {n}/{len(GLOSSARIO)}</p>
    <h1 class="mega" style="font-size: {cabe(g['termo'], 130, 880)}px">{escape(g['termo'])}</h1>
    <p class="verbete">{escape(g['verbete'])}</p>
    <p class="definicao">{escape(g['frase'])}</p>
    {EMBLEMA}""", primeiro=True)]
    s.append(secao(f"""    <p class="rotulo">Sem jargão</p>
    <p class="analogia" style="margin-top: auto; margin-bottom: auto">{marca(g['analogia'])}</p>""", "cobre"))
    if g.get("passos"):
        ps = "".join(f'<div class="p"><span class="n">{i:02d}</span><div><b>{escape(b)}</b><span>{escape(t)}</span></div></div>'
                     for i, (b, t) in enumerate(g["passos"], start=1))
        s.append(secao(f"""    <p class="rotulo">Como funciona</p>
    <h2 class="titulo">Em <span class="c">quatro passos</span></h2>
    <div class="passos">{ps}</div>"""))
    if g.get("na_pratica"):
        s.append(lista_slide("Na prática", "Onde isso *aparece*", g["na_pratica"]))
    if g.get("doc_linhas"):
        ls = "<br>\n      ".join(marca(x) for x in g["doc_linhas"])
        s.append(secao(f"""    <p class="rotulo">Na prática</p>
    <h2 class="titulo">O dado vira <span class="c">tarja</span></h2>
    <div class="doc">
      <div class="cab"><span>prontuario_exemplo.pdf</span><span>anonimizado</span></div>
      {ls}
    </div>
    <span class="selo" style="margin-top: 40px">{ILUSTRATIVO}</span>"""))
    if g.get("tela"):
        t = g["tela"]
        s.append(secao(f"""    <p class="rotulo">No Cerra.AI</p>
    <h2 class="titulo" style="font-size: 70px">Pergunta, resposta <span class="c">e fonte</span></h2>
{tela(t['ws'], t['eu'], t['ia'], t['cita'])}
    <span class="selo" style="margin-top: 34px">{ILUSTRATIVO}</span>"""))
    s.append(lista_slide("No Cerra.AI", "Como ele *usa isso*", g["no_cerra"], sub=g["importa"]))
    s.append(cta("Salve. *Mostre para o sócio.*", "Quer ver funcionando? Demonstração com os seus próprios documentos."))
    html = doc(entrega, "1080x1350", f"Carrossel: Cerra.AI, glossário: {g['termo']}", "\n".join(s))
    st = story_simples(f"Glossário da IA local · {n}/{len(GLOSSARIO)}", g["termo"], g["frase"], entrega=entrega, nome=g["termo"])
    ig = f"""Glossário da IA local, {n}/{len(GLOSSARIO)}: {g['termo']}.

{g['frase']}

Sem jargão: {plano(g['analogia'])}

No Cerra.AI:
{chr(10).join('▪️ ' + plano(i) for i in g['no_cerra'])}

{plano(g['importa'])}

Salve para consultar depois. Demonstração pelo WhatsApp {WHATS}
🔗 {LINK}

{g['tags']} {TAGS_BASE}
"""
    li = f"""Glossário da IA local, {n}/{len(GLOSSARIO)}: {g['termo']}.

{g['frase']} {plano(g['analogia'])}

Como o Cerra.AI, a IA 100% local da Cerrado Tech, usa isso:
{chr(10).join('• ' + plano(i) for i in g['no_cerra'])}

{plano(g['importa'])}

Demonstração com o seu caso de uso: {LINK}
"""
    return entrega, {"carrossel.html": html, "story.html": st}, ig, li, f"Glossário · {g['termo']}", \
        f"Glossário da IA local ({n} de {len(GLOSSARIO)}): {g['termo']}, explicado sem jargão e mostrado no Cerra.AI.", True


# ============================ Pergunte ao Cerra.AI ============================

def pergunte_chamada():
    entrega = "2026-11-cerraai-pergunte-mande-sua-duvida"
    ps = "".join(f'<div class="p"><span class="n">{i:02d}</span><div><b>{escape(b)}</b><span>{escape(t)}</span></div></div>'
                 for i, (b, t) in enumerate([("Comente aqui", "A sua dúvida, do jeito que você perguntaria"),
                                             ("Responda a caixinha", "Nos stories do @cerra.ai"),
                                             ("Mande no WhatsApp", WHATS)], start=1))
    s = [capa("Pergunte ao Cerra.AI", "Mande a sua *dúvida.*", "A gente responde aqui, com a tela do Cerra.AI, num post só para ela."),
         lista_slide("Pode perguntar sobre", "Vale *qualquer dúvida*", [
             "Como uma IA funciona **sem internet**",
             "O que acontece com **os seus documentos**",
             "**LGPD**, anonimização e sigilo profissional",
             "O que o Cerra.AI **não faz**"]),
         secao(f"""    <p class="rotulo">Como mandar</p>
    <h2 class="titulo">Três <span class="c">caminhos</span></h2>
    <div class="passos">{ps}</div>"""),
         lista_slide("Combinado", "O que fica *de fora*", [
             "**Nome** de quem perguntou, a não ser que autorize",
             "**Dado de cliente:** pergunte sem colar documento",
             "**Preço e prazo:** esses a gente conversa direto"], cobre=True),
         cta("A primeira resposta *pode ser a sua.*", "Comente aqui ou chame no WhatsApp.", "Pergunte")]
    html = doc(entrega, "1080x1350", "Carrossel: Pergunte ao Cerra.AI", "\n".join(s))
    st = story_simples("Pergunte ao Cerra.AI", "Mande a sua *dúvida.*", "A resposta vira post. Use a caixinha deste story.", entrega=entrega, nome="Pergunte")
    ig = f"""Pergunte ao Cerra.AI.

Tem dúvida sobre IA local, LGPD ou sobre o que acontece com os seus documentos? Mande aqui nos comentários, na caixinha dos stories ou no WhatsApp {WHATS}. A resposta vira um post, com a tela do Cerra.AI.

Não publicamos o nome de quem perguntou sem autorização, e preço e prazo a gente conversa direto.

🔗 {LINK}

#PergunteAoCerraAI {TAGS_BASE}
"""
    li = f"""Pergunte ao Cerra.AI: a série em que as dúvidas viram post.

IA que roda sem internet, o destino dos documentos, LGPD, anonimização, o que a IA não faz: mande a sua pergunta nos comentários ou pelo WhatsApp {WHATS}. A resposta sai com a tela do Cerra.AI, a IA 100% local da Cerrado Tech.

{LINK}
"""
    return entrega, {"carrossel.html": html, "story.html": st}, ig, li, "Pergunte ao Cerra.AI · Mande a sua dúvida", \
        "Chamada da série Pergunte ao Cerra.AI: o público manda dúvidas e cada uma vira um post.", True


def pergunte(p):
    entrega = f"2026-11-cerraai-pergunte-{p['slug']}"
    s = [capa(f"Pergunte ao Cerra.AI · {p['origem']}", f"“{p['pergunta']}”", "Arraste para ver a resposta.", base=92)]
    s.append(secao(f"""    <p class="rotulo">A resposta</p>
    <h2 class="mega" style="font-size: {cabe(p['resposta_curta'], 100)}px; margin-top: auto; margin-bottom: auto">{marca(p['resposta_curta'])}</h2>""", "cobre"))
    if p.get("tela"):
        t = p["tela"]
        s.append(secao(f"""    <p class="rotulo">Na tela</p>
    <h2 class="titulo" style="font-size: 70px">Como ele <span class="c">responde</span></h2>
{tela(t['ws'], t['eu'], t['ia'], t.get('cita'))}
    <span class="selo" style="margin-top: 34px">{ILUSTRATIVO}</span>"""))
    if p.get("parede"):
        pal = "".join(f'<span{" class=\"v\"" if i % 2 else ""}>{escape(x)}</span>' for i, x in enumerate(p["parede"]))
        s.append(secao(f"""    <p class="rotulo">Os formatos</p>
    <div class="parede">{pal}</div>
    <p class="sub" style="margin-top: auto; margin-bottom: 190px">E também ODT, HTML, JSON, TIFF, M4A, MKV, MOV…</p>""", "cobre"))
    s.append(lista_slide("Em detalhe", "Como *funciona*", p["itens"], sub=p["fecho"]))
    s.append(cta("Mande *a sua dúvida.*", p["fecho_sub"] + " Comente ou chame no WhatsApp.", "Pergunte ao Cerra.AI"))
    html = doc(entrega, "1080x1350", f"Carrossel: Pergunte ao Cerra.AI, {p['slug']}", "\n".join(s))
    st = story_simples(f"Pergunte ao Cerra.AI · {p['origem']}", f"“{p['pergunta']}”", plano(p["resposta_curta"]) + " Veja no post.",
                       entrega=entrega, nome=p["slug"])
    ig = f"""Pergunte ao Cerra.AI ({p['origem'].lower()}): “{p['pergunta']}”

{plano(p['resposta_curta'])}

{chr(10).join('▪️ ' + plano(i) for i in p['itens'])}

{plano(p['fecho'])} {p['fecho_sub']}

Tem outra dúvida? Comente aqui ou mande no WhatsApp {WHATS}.
🔗 {LINK}

#PergunteAoCerraAI {p['tags']} {TAGS_BASE}
"""
    li = f"""“{p['pergunta']}” ({p['origem'].lower()} sobre o Cerra.AI)

{plano(p['resposta_curta'])}
{chr(10).join('• ' + plano(i) for i in p['itens'])}

{plano(p['fecho'])} {p['fecho_sub']}

Cerra.AI, a IA corporativa 100% local da Cerrado Tech: {LINK}
"""
    return entrega, {"carrossel.html": html, "story.html": st}, ig, li, f"Pergunte ao Cerra.AI · {p['pergunta']}", \
        f"Pergunte ao Cerra.AI ({p['origem'].lower()}): a pergunta e a resposta com a tela do produto.", True


# ============================ Comparativo ============================

CMP1 = [("Onde fica o dado", "No servidor do provedor, fora da empresa", "No computador da empresa"),
        ("Internet", "Precisa, a cada pergunta", "Não precisa, depois de instalado"),
        ("Fonte da resposta", "Depende do serviço", "Arquivo e página, quando usa documento")]
CMP2 = [("Documentos internos", "Depende de enviar ou integrar", "Lê os arquivos do workspace"),
        ("Dado pessoal", "Segue junto com a pergunta", "Anonimização e minimização antes do modelo"),
        ("Foco por área", "Depende do serviço", "Bases isoladas e recusa fora do tema")]


def cmp_html(linhas_):
    cel = '<div class="cab"></div><div class="cab">IA na nuvem</div><div class="cab l">Cerra.AI</div>'
    cel += "".join(f'<div class="crit">{escape(a)}</div><div class="nuvem">{escape(b)}</div><div class="local">{escape(c)}</div>' for a, b, c in linhas_)
    return f'<div class="cmp">{cel}</div>'


def comparativo():
    entrega = "2026-11-cerraai-comparativo-nuvem"
    nota = '\n    <p class="sub" style="margin-top: auto; margin-bottom: 190px; font-size: 28px">Comparação genérica, sem citar nenhum serviço.</p>'
    s = [capa("Comparativo honesto", "IA na nuvem × *Cerra.AI*", "Uma linha por critério. E também onde a nuvem ganha."),
         secao(f"""    <p class="rotulo">O dado e a fonte</p>
    <h2 class="titulo" style="font-size: 72px">Para onde vai <span class="c">o seu documento</span></h2>
    {cmp_html(CMP1)}{nota}"""),
         secao(f"""    <p class="rotulo">Na rotina</p>
    <h2 class="titulo" style="font-size: 72px">Documento interno <span class="c">e dado pessoal</span></h2>
    {cmp_html(CMP2)}{nota}"""),
         lista_slide("Honestidade", "Onde a nuvem *ganha*", [
             "**Modelos maiores** e atualizados com frequência",
             "**Não precisa** de computador com placa de vídeo",
             "**Acesso de qualquer lugar**, para muita gente ao mesmo tempo"], cobre=True),
         lista_slide("Na prática", "Quando usar *cada um*", [
             "**Nuvem:** texto público, sem dado de cliente nem segredo",
             "**Cerra.AI:** contrato, prontuário, processo, carteira de clientes",
             "**Os dois:** muita empresa vai precisar de ambos"]),
         cta()]
    html = doc(entrega, "1080x1350", "Carrossel: Cerra.AI, comparativo com a nuvem", "\n".join(s))
    st = story_simples("Comparativo honesto", "IA na nuvem × *Cerra.AI*", "Onde fica o dado, se precisa de internet, se cita a fonte.",
                       ["Dado: **no computador da empresa**", "Internet: **não precisa**", "Fonte: **arquivo e página**"], entrega, "comparativo")
    tab = "\n".join(f"▪️ {a}: nuvem, {b.lower()}; Cerra.AI, {c[0].lower() + c[1:]}" for a, b, c in CMP1 + CMP2)
    ig = f"""IA na nuvem × Cerra.AI: o comparativo honesto.

{tab}

E onde a nuvem ganha: modelos maiores, sem precisar de placa de vídeo e com acesso de qualquer lugar. Texto público vai bem na nuvem; contrato, prontuário e dado de cliente pedem IA local.

(Comparação genérica, sem citar nenhum serviço.)

Demonstração pelo WhatsApp {WHATS}
🔗 {LINK}

#IANaNuvem #Comparativo {TAGS_BASE}
"""
    li = f"""IA na nuvem ou IA local? Um comparativo honesto, critério por critério.

{tab.replace('▪️', '•')}

A nuvem ganha em tamanho de modelo, em não exigir hardware e no acesso de qualquer lugar. O Cerra.AI ganha quando o documento não pode sair da empresa. Comparação genérica, sem citar nenhum serviço.

{LINK}
"""
    return entrega, {"carrossel.html": html, "story.html": st}, ig, li, "Comparativo · IA na nuvem × Cerra.AI", \
        "Comparativo honesto, critério por critério, incluindo onde a nuvem é melhor.", True


# ============================ Stories interativos ============================

STORIES = [
    ("Enquete", "A sua equipe já cola *contrato* em chat da internet?", "Sim, às vezes · Acho que não", False),
    ("Quiz", "A IA local precisa de *internet* para responder?", "Sim · Não, depois de instalada (certa) · Só às vezes", True),
    ("Caixinha", "Que documento você *perguntaria* a uma IA, se ele não saísse da empresa?", "Caixinha de perguntas aberta", False),
    ("Slider", "Quanto te preocupa um *vazamento* de dado de cliente?", "Slider de emoji 😬", True),
    ("Enquete", "Você confere *a fonte* quando a IA responde?", "Sempre · Quase nunca", False),
    ("Quiz", "O que é *OCR*?", "Um tipo de IA · Ler o texto de uma imagem (certa) · Um formato de arquivo", True),
    ("Caixinha", "Pergunte ao *Cerra.AI*: mande a sua dúvida.", "Caixinha: a resposta vira post", False),
    ("Enquete", "Prefere ver o Cerra.AI funcionando *em vídeo* ou *ao vivo*?", "Vídeo · Ao vivo", True),
]


def stories_interativos():
    entrega = "2026-11-cerraai-stories-interativos"
    secs = []
    for i, (tipo, pergunta, opcoes, cobre) in enumerate(STORIES, start=1):
        secs.append(f"""  <section class="slide story{' cobre' if cobre else ''}">
    <p class="rotulo">Cerra.AI · {escape(tipo)} {i}/{len(STORIES)}</p>
    <h1 class="mega" style="font-size: {cabe(pergunta, 92 if len(plano(pergunta)) > 40 else 104)}px">{marca(pergunta)}</h1>
    <div class="sticker"><b>Sticker: {escape(tipo)}</b><span>Cole aqui o sticker do Instagram e apague esta caixa</span></div>
    <span class="contato principal" style="margin-top: auto; font-family: 'JetBrains Mono', monospace; font-size: 30px; font-weight: 700; align-self: flex-start; padding: 18px 26px; border-radius: 6px">@cerra.ai</span>
  </section>
""")
    html = doc(entrega, "1080x1920", "Stories interativos: Cerra.AI", "".join(secs))
    guia = "\n".join(f"Story {i} ({tipo}): {plano(p)} → {op}" for i, (tipo, p, op, _) in enumerate(STORIES, start=1))
    texto = f"""Stories interativos do @cerra.ai: um por dia, entre os carrosséis.

Como postar: suba o stories-0N.png, adicione o sticker indicado em cima da caixa tracejada (o sticker cobre a caixa) e use o texto abaixo.

{guia}

Respostas da caixinha que forem dúvidas viram post da série Pergunte ao Cerra.AI (dados/pergunte-cerraai.json).
"""
    return entrega, {"stories.html": html}, texto, texto, "Stories interativos · enquetes, quiz e caixinhas", \
        "8 stories com enquete, quiz, caixinha e slider, com o lugar do sticker marcado.", False


# ============================ Checklist LGPD ============================

CHECKLIST = [
    ("Antes de usar", [
        ("Mapeie os dados pessoais", "que aparecem nos documentos: de clientes, pacientes, funcionários.", "LGPD, art. 5º, I"),
        ("Defina a finalidade", "para que a IA vai ser usada, por escrito.", "art. 6º, I (finalidade)"),
        ("Identifique a base legal", "para tratar esses dados; dados de saúde e outros sensíveis têm regras próprias.", "arts. 7º e 11"),
        ("Saiba para onde o texto vai", "se a ferramenta envia para servidores fora do país, é transferência internacional.", "art. 33"),
    ]),
    ("Na hora de usar", [
        ("Envie só o necessário", "tire nome, CPF e endereço quando não forem precisos para a pergunta.", "art. 6º, III (necessidade)"),
        ("Anonimize antes de colar", "dado anonimizado deixa de ser dado pessoal para a LGPD.", "art. 12"),
        ("Separe as bases", "por cliente, por área ou por processo, para um não aparecer no outro.", "art. 6º, VII (segurança)"),
        ("Confira a fonte da resposta", "antes de usar num parecer, numa peça ou num laudo.", "boa prática"),
    ]),
    ("Para a empresa", [
        ("Tenha uma política de uso de IA", "quais ferramentas podem ser usadas e que dados podem entrar nelas.", "art. 50 (boas práticas)"),
        ("Registre o uso", "quem usou, quando e em qual base, sem expor o dado no registro.", "arts. 6º, X e 37"),
        ("Atenda aos pedidos dos titulares", "acesso, correção e eliminação, com exclusão de verdade.", "art. 18"),
        ("Envolva o encarregado (DPO)", "e avalie o relatório de impacto quando o tratamento for de alto risco.", "arts. 38 e 41"),
    ]),
]

AJUDA = [
    "Roda **100% no computador da empresa**: o texto não vai para servidor externo (item 4)",
    "**Anonimiza** texto e arquivo e faz **minimização** de CPF, RG e telefone no chat (itens 5 e 6)",
    "**Workspaces isolados** por cliente ou área (item 7)",
    "**Trechos consultados:** arquivo e página embaixo da resposta (item 8)",
    "**Auditoria** com os dados mascarados e **exclusão de documento** do disco (itens 10 e 11)",
]


def b(texto):
    return re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", escape(texto))


def checklist_html():
    topo = f"""<div class="topo"><span class="marca"><img src="../../../img/logo_cerraai-icone.png" alt=""> Cerra.AI</span><span>Checklist · IA e LGPD</span></div>"""
    n, partes = 0, []
    for titulo, itens in CHECKLIST:
        lis = ""
        for nome, desc, lei in itens:
            n += 1
            lis += f'<li><span><b>{n}. {escape(nome)}:</b> {escape(desc)}<span class="lei">{escape(lei)}</span></span></li>'
        partes.append((titulo, lis))
    rod = lambda p: f'<div class="rodape-a4"><span>{LINK}</span><span>{p}/2</span></div>'
    ajuda = "".join(f"<li>{b(x)}</li>" for x in AJUDA)
    return f"""<!DOCTYPE html>
<html lang="pt-BR" class="impresso">
<head><meta charset="UTF-8"><title>Checklist: IA no escritório e LGPD</title>{CSS}</head>
<body>
<section class="folha">
  {topo}
  <h1>Como usar IA no escritório <span class="c">sem ferir a LGPD</span></h1>
  <p class="lead">Doze cuidados para usar inteligência artificial com documentos de clientes, pacientes e funcionários. Marque o que a sua equipe já faz.</p>
  <h2><i>1</i> {partes[0][0]}</h2><ul class="check">{partes[0][1]}</ul>
  <h2><i>2</i> {partes[1][0]}</h2><ul class="check">{partes[1][1]}</ul>
  {rod(1)}
</section>
<section class="folha">
  {topo}
  <h2 style="margin-top: 10mm"><i>3</i> {partes[2][0]}</h2><ul class="check">{partes[2][1]}</ul>
  <div class="caixa">
    <h3>Onde o Cerra.AI ajuda</h3>
    <p style="margin-bottom: 3mm">O Cerra.AI é a IA da Cerrado Tech que roda no computador da empresa. Ele ajuda a cumprir estes itens; não substitui a política, o encarregado nem a análise jurídica.</p>
    <ul>{ajuda}</ul>
  </div>
  <div class="contato-a4"><span>Agende uma demonstração</span><span>{LINK}</span><span>WhatsApp {WHATS}</span></div>
  <p class="aviso">Material educativo, de caráter geral, elaborado pela Cerrado Tech com base na Lei nº 13.709/2018 (LGPD) em outubro de 2026. Não é parecer jurídico: cada caso deve ser avaliado com o encarregado de dados e a assessoria jurídica da empresa.</p>
  {rod(2)}
</section>
</body>
</html>
"""


def checklist_post():
    entrega = "2026-11-cerraai-material-checklist-lgpd"
    itens = [nome for _, xs in CHECKLIST for nome, _, _ in xs]
    s = [capa("Material gratuito", "IA no escritório *sem ferir a LGPD.*", "Um checklist de 12 itens, em PDF, para a sua equipe usar IA com documentos de clientes."),
         lista_slide("Antes de usar", "Os primeiros *cuidados*", itens[:4]),
         lista_slide("Na hora de usar", "No *dia a dia*", itens[4:8]),
         lista_slide("Para a empresa", "Regras *da casa*", itens[8:], sub="Material educativo. *Não é parecer jurídico.*"),
         cta("Quer o *checklist?*", "Comente CHECKLIST ou peça pelo WhatsApp: a gente manda o PDF.", "Material gratuito")]
    html = doc(entrega, "1080x1350", "Carrossel: Cerra.AI, checklist LGPD", "\n".join(s))
    st = story_simples("Material gratuito", "IA no escritório *sem ferir a LGPD.*", "Checklist de 12 itens em PDF. Peça pelo WhatsApp.",
                       itens[:3], entrega, "checklist")
    lista_txt = "\n".join(f"{i}. {x}" for i, x in enumerate(itens, start=1))
    ig = f"""Como usar IA no escritório sem ferir a LGPD: um checklist de 12 itens, em PDF, grátis.

{lista_txt}

Comente CHECKLIST ou peça pelo WhatsApp {WHATS} que a gente manda o PDF.

Material educativo, não é parecer jurídico.

#ChecklistLGPD #ProtecaoDeDados {TAGS_BASE}
"""
    li = f"""Sua equipe já usa IA com documentos de clientes? Preparamos um checklist de 12 itens para fazer isso sem ferir a LGPD: finalidade, base legal, minimização, anonimização, bases separadas, registro de uso, direitos dos titulares e o papel do encarregado.

Peça o PDF gratuito pelo WhatsApp {WHATS} ou nos comentários.

Material educativo, não é parecer jurídico. Cerra.AI, a IA 100% local da Cerrado Tech: {LINK}
"""
    return entrega, {"carrossel.html": html, "story.html": st}, ig, li, "Material · Checklist IA e LGPD (PDF)", \
        "Checklist em PDF \"Como usar IA no escritório sem ferir a LGPD\" (isca para a demonstração) e o post que divulga.", True


# ============================ Kit de vendas ============================

def onepager_html():
    topo = f"""<div class="topo"><span class="marca"><img src="../../../img/logo_cerraai-icone.png" alt=""> Cerra.AI</span><span>by Cerrado Tech</span></div>"""
    blocos = [
        ("O que ele faz", ["Lê PDF (também escaneado), Word, Excel, PowerPoint, imagens, áudio e vídeo",
                           "Responde com base nos seus documentos, com arquivo e página da fonte",
                           "Diz quando a informação não consta",
                           "Anonimiza textos e gera o Relatório LGPD com os dados mascarados"]),
        ("O que ele protege", ["Roda 100% no computador da empresa, sem requisições externas",
                               "Funciona sem internet depois de instalado",
                               "Bases isoladas por cliente ou área",
                               "Auditoria com os dados mascarados e exclusão de documento do disco"]),
        ("Para quem", ["Cenários prontos: escritório de contabilidade, clínica de oncologia e advocacia penal",
                       "Outras áreas: cenário configurável no painel, com base, regras e limites éticos próprios",
                       "Recusa perguntas fora do tema da área"]),
        ("O que ele não é", ["Não é um serviço na nuvem",
                             "Não substitui a revisão do profissional que assina",
                             "Não certifica a empresa na LGPD: ajuda a cumprir"]),
    ]
    grade = "".join(f'<div class="bloco"><h3>{escape(t)}</h3><ul>{"".join(f"<li>{escape(x)}</li>" for x in xs)}</ul></div>' for t, xs in blocos)
    return f"""<!DOCTYPE html>
<html lang="pt-BR" class="impresso">
<head><meta charset="UTF-8"><title>Cerra.AI: one-pager</title>{CSS}</head>
<body>
<section class="folha">
  {topo}
  <h1>A IA da empresa, <span class="c">dentro da empresa.</span></h1>
  <p class="lead">O Cerra.AI é um assistente de inteligência artificial que roda no computador da empresa. Ele lê os documentos do escritório e responde mostrando de onde tirou cada informação, sem enviar nada para fora.</p>
  <div class="grade2" style="margin-top: 8mm">{grade}</div>
  <div class="caixa">
    <h3>Como começa</h3>
    <ul>
      <li>Uma demonstração com os seus próprios documentos, na sua máquina</li>
      <li>Implantação e manutenção pela equipe da Cerrado Tech</li>
    </ul>
  </div>
  <div class="contato-a4"><span>Agende a demonstração</span><span>{LINK}</span><span>WhatsApp {WHATS}</span></div>
  <div class="rodape-a4"><span>Cerra.AI · Cerrado Tech</span><span>{LINK}</span></div>
</section>
</body>
</html>
"""


def deck():
    entrega = "2026-11-cerraai-material-kit-vendas"
    def sl(miolo, classe=""):
        return f'  <section class="slide deck {classe}">\n{miolo}\n{rodape()}\n  </section>\n'
    cards = lambda xs: "".join(f'<div class="card"><h3>{escape(t)}</h3><p>{escape(p)}</p></div>' for t, p in xs)
    s = [
        sl(f"""    <p class="rotulo">Apresentação</p>
    <h1 class="mega" style="margin-top: 60px; font-size: 104px">A IA da empresa,<br><span class="c">dentro da empresa.</span></h1>
    <p class="sub" style="margin-top: 50px; max-width: 1100px">Cerra.AI: assistente de inteligência artificial que roda no computador da empresa e responde com base nos seus documentos.</p>
    <img class="emblema" data-sangra style="width: 400px; right: -100px; bottom: 120px" src="{LOGO}" alt="">"""),
        sl(f"""    <p class="rotulo">O problema</p>
    <h2 class="titulo">Três situações <span class="c">de todo escritório</span></h2>
    <div class="colunas3">{cards([("Sigilo", "O documento do cliente não pode ir para um chat da internet."), ("IA escondida", "A equipe já usa IA por conta própria, sem regra e sem registro."), ("Informação perdida", "A resposta está em algum PDF, planilha ou áudio, mas onde?")])}</div>"""),
        sl(f"""    <p class="rotulo">Como funciona</p>
    <h2 class="titulo">Do documento <span class="c">à resposta com fonte</span></h2>
    <div class="colunas3">{cards([("1 · Envia", "Os documentos vão para o workspace da área ou do cliente, no computador da empresa."), ("2 · Pergunta", "Em português, como falaria. A IA busca os trechos certos nos documentos."), ("3 · Confere", "A resposta mostra arquivo e página. Se não consta, ele diz.")])}</div>"""),
        sl(f"""    <p class="rotulo">Na tela</p>
    <div class="colunas">
      <div><h2 class="titulo" style="font-size: 76px">Pergunta, resposta <span class="c">e fonte</span></h2>
      <p class="sub">Toda resposta baseada em documento traz os <b style="color: var(--cobre)">trechos consultados</b>: arquivo e página.</p>
      <span class="selo" style="margin-top: 30px">{ILUSTRATIVO}</span></div>
{tela("Escritório de Contabilidade", "Qual é o prazo de entrega da obrigação do cliente?", "Pelo calendário fiscal da carteira, o prazo é o **dia 15**. Confira a página indicada.", "calendario_fiscal.pdf (p. 2, 5)")}
    </div>"""),
        sl(f"""    <p class="rotulo">Proteção de dados</p>
    <h2 class="titulo">Ajuda a <span class="c">cumprir a LGPD</span></h2>
    <div class="colunas">
      {linhas(["**100% local:** zero requisições externas", "**Anonimização** de texto e arquivo", "**Minimização:** CPF e telefone só se a pergunta pedir"])}
      {linhas(["**Relatório LGPD** com dados mascarados", "**Auditoria** com os dados mascarados", "**Exclusão** de documento do disco"])}
    </div>"""),
        sl(f"""    <p class="rotulo">Áreas</p>
    <h2 class="titulo">Uma base <span class="c">para cada área</span></h2>
    <div class="colunas3">{cards([("Contabilidade", "Cenário pronto: carteira de clientes, obrigações e relatório da carteira."), ("Oncologia", "Cenário pronto: protocolos da clínica, sem mudar dose sem o médico."), ("Advocacia penal", "Cenário pronto: prazos e andamentos, com limites éticos.")])}</div>
    <p class="sub" style="margin-top: 40px">Outras áreas: <b style="color: var(--cobre)">cenário configurável</b> no painel, com base, regras e limites próprios.</p>"""),
        sl(f"""    <p class="rotulo">Com transparência</p>
    <h2 class="titulo">O que ele <span class="c">não é</span></h2>
    <div class="colunas3">{cards([("Não é nuvem", "Roda no computador da empresa; precisa de uma máquina com placa de vídeo."), ("Não decide sozinho", "A revisão continua com o profissional que assina."), ("Não certifica", "Ajuda a cumprir a LGPD, não emite certificação.")])}</div>""", "cobre"),
        sl(f"""    <p class="rotulo">Próximo passo</p>
    <h2 class="mega" style="font-size: 110px">Veja com <span class="c">os seus documentos.</span></h2>
    <p class="sub" style="margin-top: 40px">Demonstração na sua máquina. Implantação e manutenção pela equipe da Cerrado Tech.</p>
    <div class="contatos"><span class="contato principal">{LINK}</span><span class="contato">WhatsApp {WHATS}</span></div>""", "cobre"),
    ]
    return entrega, doc(entrega, "1920x1080", "Deck: Cerra.AI", "".join(s))


# ============================ Saída ============================

def gravar(entrega, pecas, ig, li, titulo, descricao, carrossel, data, orient_extra=()):
    post, ent = RAIZ / "posts" / entrega, RAIZ / "entregas" / entrega
    post.mkdir(parents=True, exist_ok=True)
    ent.mkdir(parents=True, exist_ok=True)
    for nome, html in pecas.items():
        (post / nome).write_text(html, encoding="utf-8")
    (ent / "legenda-instagram.txt").write_text(ig, encoding="utf-8")
    (ent / "legenda-linkedin.txt").write_text(li, encoding="utf-8")
    arq = ent / "info.json"
    antigo = json.loads(arq.read_text(encoding="utf-8")) if arq.exists() else {}
    orient = [o for o in antigo.get("orientacoes", []) if o.startswith("Postar em")]
    if carrossel:
        orient += ["Carrossel: no Instagram, na ordem; no LinkedIn, os PNGs como documento.",
                   "Carrossel animado (carrossel-animado.mp4): os mesmos slides em vídeo, postado como Reel em outro dia.",
                   f"Story: sticker de link para https://www.{LINK}"]
    orient += list(orient_extra)
    info = {"titulo": f"Cerra.AI · {titulo}", "data": antigo.get("data", data), "descricao": descricao, "orientacoes": orient}
    arq.write_text(json.dumps(info, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(entrega)


def gerar_pdfs():
    """Checklist e one-pager em PDF A4 (com prévia PNG) e o deck em PDF 16:9, pelo Chromium do Playwright."""
    from playwright.sync_api import sync_playwright
    kit = RAIZ / "entregas" / "2026-11-cerraai-material-kit-vendas"
    chk = RAIZ / "entregas" / "2026-11-cerraai-material-checklist-lgpd"
    with sync_playwright() as p:
        nav = p.chromium.launch()
        pg = nav.new_page(viewport={"width": 794, "height": 1123}, device_scale_factor=2)
        for fonte, destino, previa in ((RAIZ / "posts/2026-11-cerraai-material-checklist-lgpd/checklist.html", chk / "checklist-ia-lgpd.pdf", chk / "checklist-pagina"),
                                       (RAIZ / "posts/2026-11-cerraai-material-kit-vendas/onepager.html", kit / "one-pager.pdf", kit / "one-pager")):
            pg.goto(fonte.resolve().as_uri()); pg.wait_for_timeout(800)
            pg.pdf(path=str(destino), format="A4", print_background=True)
            folhas = pg.query_selector_all(".folha")
            for i, f in enumerate(folhas, start=1):
                f.screenshot(path=f"{previa}{'-' + str(i) if len(folhas) > 1 else ''}.png")
            print(" ", destino.name)
        pg = nav.new_page(viewport={"width": 1920, "height": 1080})
        pg.goto((RAIZ / "posts/2026-11-cerraai-material-kit-vendas/deck.html").resolve().as_uri() + "?pdf=1"); pg.wait_for_timeout(800)
        pg.add_style_tag(content="html, body { background: #000 !important; padding: 0 !important; gap: 0 !important; } .slide { break-after: page; } @page { size: 1920px 1080px; margin: 0; }")
        pg.pdf(path=str(kit / "deck.pdf"), width="1920px", height="1080px", print_background=True)
        print("  deck.pdf")
        nav.close()


def main():
    ordem = []
    for i, g in enumerate(GLOSSARIO):
        ordem.append(glossario(g, i + 1))
    ordem.insert(1, pergunte_chamada())
    ordem.insert(2, comparativo())
    ordem.insert(4, stories_interativos())
    ordem.insert(6, checklist_post())
    perguntas = json.loads((RAIZ / "dados" / "pergunte-cerraai.json").read_text(encoding="utf-8"))["perguntas"]
    for k, p in enumerate(perguntas):
        ordem.insert(7 + 2 * k, pergunte(p))
    # a data só guarda a ordem da série; a data real vem do tools/agendar.py
    for n, item in enumerate(ordem, start=1):
        entrega, pecas, ig, li, titulo, desc, car = item
        extra = ()
        if "stories-interativos" in entrega:
            extra = ("Um story por dia, nos dias sem story de campanha: stories-01 a stories-08. O texto de cada sticker está na legenda abaixo.",)
        if "checklist" in entrega:
            extra = ("O PDF (checklist-ia-lgpd.pdf) vai para quem comentar CHECKLIST ou pedir no WhatsApp. Link direto: "
                     "https://www.cerradofinancas.com.br/marketing/entregas/2026-11-cerraai-material-checklist-lgpd/checklist-ia-lgpd.pdf",)
        gravar(entrega, pecas, ig, li, titulo, desc, car, f"2026-11-{n + 2:02d}", extra)
    # materiais que não são post
    (RAIZ / "posts/2026-11-cerraai-material-checklist-lgpd/checklist.html").write_text(checklist_html(), encoding="utf-8")
    entrega, deck_html = deck()
    pasta = RAIZ / "posts" / entrega
    pasta.mkdir(parents=True, exist_ok=True)
    (pasta / "deck.html").write_text(deck_html, encoding="utf-8")
    (pasta / "onepager.html").write_text(onepager_html(), encoding="utf-8")
    roteiro = f"""Kit de vendas do Cerra.AI: para mandar depois da conversa ou da demonstração.

one-pager.pdf: uma página A4 com o que é, o que faz, o que protege, para quem e como começa.
deck.pdf: 8 slides 16:9 para conduzir a demonstração (problema, como funciona, tela, LGPD, áreas, o que ele não é, próximo passo).

Mensagem sugerida para o WhatsApp:
"Obrigado pela conversa! Segue o resumo do Cerra.AI, a IA que roda no computador da empresa e responde com a fonte de cada informação. Quando quiser, marcamos a demonstração com os seus próprios documentos."

Sem preço e sem prazo nos materiais: isso é tratado na conversa.
"""
    gravar(entrega, {}, roteiro, roteiro, "Kit de vendas (one-pager e deck)",
           "Material comercial: one-pager A4 e deck de 8 slides, para mandar depois da conversa. Não é post.", False, "2026-11-30",
           ("Não é post: fica fora da agenda.", "one-pager.pdf e deck.pdf; as prévias em PNG mostram o conteúdo."))
    if "--pdf" in sys.argv:
        gerar_pdfs()


if __name__ == "__main__":
    main()
