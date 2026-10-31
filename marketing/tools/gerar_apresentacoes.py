"""Gera o post de apresentação institucional ("Prazer, ...") de quatro marcas, cada um na identidade da própria marca:

- Cerra.AI ("Silício local", brand/cerraai/) → @cerra.ai
- Cerrado Tech (identidade do site, brand/carrossel.css) → @cerradofinancas
- CerraClass ("Sábado de sala", brand/cerraclass/) → @cerraclass
- Guia Acadêmico ("Artigo", brand/guiacademico/) → @guiacademico

Cada um: carrossel de 6 + story + legendas (Instagram e LinkedIn) + carrossel animado. São posts para fixar no topo do
perfil. Abrem a agenda: são o primeiro post de cada conta (31/10/2026, quando o Felipe começou), e o carrossel animado
sai como Reel uma semana depois (o tools/agendar.py põe a apresentação na frente da fila de cada conta).

Fontes: home e fabrica.html do site, landings da CerraClass, o projeto Cerra.AI (regra 8 do HISTORICO.md) e o site do
Guia Acadêmico. Sem preço, sem cliente, sem números não confirmados. As credenciais do Renato são as que já estão nas
landings (mestre em Contabilidade pela UFPR, doutorando, ICTI/Itaú Unibanco, fundador da Cerrado Tech).

Uso:
    python tools/gerar_apresentacoes.py      # depois: exportar, verificar, animar-carrossel, agendar.py e publicar.py
"""
import json
import re
from html import escape
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
WHATS = "(67) 99351-5206"
DATA = "2026-10-31"
FOTO = "../../../img/renato.jpg"
FIM = '  <script src="../../brand/slides.js"></script>\n</body>\n</html>\n'


def cab(entrega, formato, titulo, css, extra_head="", body=""):
    return f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="entrega" content="{entrega}">
  <meta name="formato" content="{formato}">
  <title>{escape(titulo)}</title>
  {css}{extra_head}
</head>
<body{body}>
"""


# ======================= Cerra.AI =======================

def cerraai():
    entrega = "2026-11-apresentacao-cerraai"
    logo = "../../../img/logo_cerraai-icone.png"
    link = "cerradofinancas.com.br/cerraai"
    css = '<link rel="stylesheet" href="../../brand/cerraai/marca.css">\n  <link rel="stylesheet" href="../../brand/cerraai/extras.css">'

    def c(t):
        s = escape(t)
        s = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", s)
        return re.sub(r"\*([^*]+)\*", r'<span class="c">\1</span>', s)

    def rod(p=False):
        d = '<span class="arraste">arraste →</span>' if p else "<span data-pagina></span>"
        return f'    <div class="rodape">\n      <span class="marca"><img src="{logo}" alt=""> Cerra.AI <small>by Cerrado Tech</small></span>\n      {d}\n    </div>'

    def sec(m, cl="", p=False):
        return f'  <section class="slide {cl}">\n{m}\n{rod(p)}\n  </section>\n'

    def lin(itens):
        return '<ul class="linhas">' + "".join(f"<li><span>{c(i)}</span></li>" for i in itens) + "</ul>"

    s = [
        sec(f"""    <p class="rotulo">Prazer, Cerra.AI</p>
    <h1 class="mega" style="font-size: 96px">A IA da empresa, <span class="c">dentro da empresa.</span></h1>
    <p class="sub" style="margin-top: 40px; max-width: 640px">Um assistente de inteligência artificial que roda no computador da empresa e responde com base nos seus documentos.</p>
    <img class="emblema" data-sangra style="width: 340px; right: -110px; bottom: 150px" src="{logo}" alt="">""", p=True),
        sec(f"""    <p class="rotulo">O que ele faz</p>
    <h2 class="titulo" style="font-size: 76px">Lê, responde <span class="c">e mostra a fonte</span></h2>
    {lin(["Lê **PDF (também escaneado)**, Word, Excel, imagens, áudio e vídeo",
          "Responde com o **arquivo e a página** de onde tirou a informação",
          "**Anonimiza** o dado pessoal antes de chegar ao modelo",
          "Funciona **sem internet**, depois de instalado"])}"""),
        sec(f"""    <p class="rotulo">Na tela</p>
    <h2 class="titulo" style="font-size: 70px">Pergunte <span class="c">como falaria</span></h2>
    <div class="tela">
      <div class="barra"><span>Workspace: <b>Escritório de Contabilidade</b></span><span class="local">local</span></div>
      <div class="corpo">
        <span class="eu">Qual é o prazo de entrega da obrigação do cliente?</span>
        <span class="ia">Pelo calendário fiscal da carteira, o prazo é o <b>dia 15</b>. Confira a página indicada.</span>
        <span class="cita">Trechos consultados: calendario_fiscal.pdf (p. 2, 5)</span>
      </div>
    </div>
    <span class="selo" style="margin-top: 34px">Exemplo ilustrativo</span>"""),
        sec(f"""    <p class="rotulo">Para quem</p>
    <h2 class="titulo" style="font-size: 76px">Uma base <span class="c">para cada área</span></h2>
    <div class="cenarios">
      <div class="item"><h3>Contabilidade</h3><p>Carteira de clientes, obrigações e relatório da carteira.</p></div>
      <div class="item"><h3>Oncologia</h3><p>Protocolos da clínica, sem mudar dose sem o médico.</p></div>
      <div class="item"><h3>Advocacia penal</h3><p>Prazos e andamentos, com limites éticos.</p></div>
      <div class="item"><h3>A sua área</h3><p>Cenário configurável, com base e regras próprias.</p></div>
    </div>"""),
        sec(f"""    <p class="rotulo">Neste perfil</p>
    <h2 class="titulo" style="font-size: 76px">O que você <span class="c">vai ver aqui</span></h2>
    {lin(["**Glossário da IA local:** RAG, OCR, anonimização, sem jargão",
          "**Pergunte ao Cerra.AI:** a sua dúvida vira post",
          "**Materiais gratuitos:** o checklist de IA e LGPD em PDF",
          "**Comparativos honestos** com a IA na nuvem"])}""", "cobre"),
        sec(f"""    <p class="rotulo">Siga</p>
    <h2 class="mega" style="font-size: 88px">Veja com <span class="c">os seus documentos.</span></h2>
    <p class="sub" style="margin-top: 30px">Demonstração na sua máquina. Implantação e manutenção pela equipe da Cerrado Tech.</p>
    <div class="contatos">
      <span class="contato principal">{link}</span>
      <span class="contato">WhatsApp {WHATS}</span>
    </div>""", "cobre"),
    ]
    car = cab(entrega, "1080x1350", "Carrossel: apresentação Cerra.AI", css) + "\n".join(s) + FIM
    st = cab(entrega, "1080x1920", "Story: apresentação Cerra.AI", css) + f"""  <!-- área segura: ~250px livres no topo e na base -->
  <section class="slide story">
    <p class="rotulo">Prazer, Cerra.AI</p>
    <h1 class="mega" style="font-size: 96px">A IA da empresa, <span class="c">dentro da empresa.</span></h1>
    <p class="sub" style="margin-top: 40px">Responde com base nos seus documentos, mostra a fonte e não envia nada para fora.</p>
    {lin(["Lê PDF, Word, Excel, áudio e vídeo", "Mostra **arquivo e página**", "Funciona **sem internet**"])}
    <span class="contato principal" style="margin-top: auto; font-family: 'JetBrains Mono', monospace; font-size: 34px; font-weight: 700; align-self: flex-start; background: var(--cobre); color: var(--grafite); padding: 22px 30px; border-radius: 6px">{link}</span>
  </section>
""" + FIM
    ig = f"""Prazer, Cerra.AI: a IA da empresa, dentro da empresa.

Um assistente de inteligência artificial que roda no computador da empresa e responde com base nos seus documentos:
▪️ Lê PDF (também escaneado), Word, Excel, imagens, áudio e vídeo
▪️ Mostra o arquivo e a página de onde tirou a informação
▪️ Anonimiza o dado pessoal antes de chegar ao modelo
▪️ Funciona sem internet, depois de instalado

Aqui você vai ver o glossário da IA local, a série Pergunte ao Cerra.AI, comparativos honestos e materiais gratuitos.

Demonstração com os seus documentos: WhatsApp {WHATS}
🔗 {link}

#CerraAI #IALocal #IAOffline #LGPD #CerradoTech
"""
    li = f"""Prazer, Cerra.AI.

A Cerrado Tech desenvolveu um assistente de IA que roda 100% no computador da empresa: lê os documentos do escritório (inclusive PDF escaneado, áudio e vídeo), responde citando arquivo e página e anonimiza o dado pessoal antes de chegar ao modelo. Sem enviar nada para fora e sem depender de internet.

Cenários prontos para contabilidade, oncologia e advocacia penal; outras áreas por cenário configurável.

Demonstração com os seus documentos: {link}
"""
    return entrega, "Cerra.AI", car, st, ig, li, "@cerra.ai"


# ======================= Cerrado Tech =======================

def cerradotech():
    entrega = "2026-11-apresentacao-cerradotech"
    css = '<link rel="stylesheet" href="../../brand/carrossel.css">'
    head = '\n  <script src="https://unpkg.com/@phosphor-icons/web@2.1.1"></script>'
    body = ' style="--acento: #38bdf8"'
    rod = lambda p=False: f"""    <div class="rodape">
      <span class="marca"><img src="../../../img/folinha-hero.png" alt=""> Cerrado Tech</span>
      {'<span class="arraste">Arraste <i class="ph-bold ph-arrow-right"></i></span>' if p else '<span data-pagina></span>'}
    </div>"""
    card = lambda ic, t, p: f'<div class="card"><i class="ph-duotone ph-{ic}"></i><h3>{t}</h3><p>{p}</p></div>'
    card1 = lambda ic, t, p: f'<div class="card"><i class="ph-duotone ph-{ic}"></i><div><h3>{t}</h3><p>{p}</p></div></div>'
    s = [
        f"""  <section class="slide capa">
    <span class="kicker"><i class="ph-bold ph-hand-waving"></i> Prazer, Cerrado Tech</span>
    <img class="logo-produto" src="../../../img/cerradotechhome.png" alt="Cerrado Tech">
    <h1>Software feito em torno do <span class="acento">seu negócio.</span></h1>
    <p class="sub">A fábrica de software da Cerrado Finanças &amp; Tech: ERPs, CRMs, IA e dashboards para empresas e para a gestão pública.</p>
{rod(True)}
  </section>
""",
        f"""  <section class="slide">
    <span class="kicker"><i class="ph-bold ph-compass"></i> Quem somos</span>
    <h2 class="titulo">Sob medida, do jeito certo</h2>
    <div class="grade">
      {card("puzzle-piece", "100% customizado", "Cada função nasce de uma necessidade real")}
      {card("buildings", "B2B e B2G", "Mercado privado e gestão pública")}
      {card("key", "O código é seu", "Sem amarras de fornecedor")}
      {card("plugs-connected", "Integra", "SAP®, TOTVS, Power BI, bancos e NF")}
    </div>
{rod()}
  </section>
""",
        f"""  <section class="slide">
    <span class="kicker"><i class="ph-bold ph-cube"></i> O que construímos</span>
    <h2 class="titulo">Do ERP à Inteligência Artificial</h2>
    <div class="grade compacta">
      {card("squares-four", "ERPs", "Financeiro, estoque e fiscal")}
      {card("crosshair", "CRMs", "Funil e follow-ups")}
      {card("cpu", "IA offline", "Os dados ficam em casa")}
      {card("storefront", "E-commerce e PDV", "Integrados ao ERP")}
      {card("shield-check", "Compliance", "LGPD e auditoria")}
      {card("chart-bar", "Dashboards", "DRE e KPIs no celular")}
    </div>
{rod()}
  </section>
""",
        f"""  <section class="slide">
    <span class="kicker"><i class="ph-bold ph-rocket-launch"></i> Produtos do ecossistema</span>
    <h2 class="titulo">Nasceram aqui</h2>
    <div class="grade uma">
      {card1("cpu", "Cerra.AI", "IA 100% local que responde com a fonte de cada informação")}
      {card1("bank", "GovTech", "GovDash, Edu, GovRH e Docs para a gestão pública")}
      {card1("student", "CerraClass", "Cursos práticos de IA com quem constrói software")}
      {card1("lightbulb", "Venture builder", "Produtos próprios que viram startups")}
    </div>
{rod()}
  </section>
""",
        f"""  <section class="slide">
    <span class="kicker"><i class="ph-bold ph-user"></i> Quem está por trás</span>
    <h2 class="titulo">Engenharia com visão de negócio</h2>
    <div class="instrutor">
      <img src="{FOTO}" alt="Renato de Oliveira Rosa">
      <div><h3>Renato Rosa</h3><p class="papel">CEO e arquiteto de soluções</p></div>
    </div>
    <ul class="credenciais">
      <li><i class="ph-bold ph-graduation-cap"></i> Mestre em Contabilidade (UFPR) e doutorando em algoritmos e compliance</li>
      <li><i class="ph-bold ph-brain"></i> Bolsista ICTI / Itaú Unibanco em Dados e Machine Learning</li>
      <li><i class="ph-bold ph-code"></i> Do MVP ao scale-up: software, BI e processos</li>
    </ul>
{rod()}
  </section>
""",
        f"""  <section class="slide cta">
    <img class="folha" src="../../../img/folinha-hero.png" alt="">
    <h2>Qual software o seu negócio <span class="acento">precisa?</span></h2>
    <p class="sub">Conte o seu processo e desenhamos a solução com você.</p>
    <div class="contatos">
      <span class="contato principal"><i class="ph-bold ph-globe"></i> cerradofinancas.com.br/fabrica</span>
      <span class="contato"><i class="ph-bold ph-whatsapp-logo"></i> {WHATS}</span>
    </div>
{rod()}
  </section>
""",
    ]
    car = cab(entrega, "1080x1350", "Carrossel: apresentação Cerrado Tech", css, head, body) + "".join(s) + FIM
    st = cab(entrega, "1080x1920", "Story: apresentação Cerrado Tech", css, head, body) + f"""  <!-- área segura: ~250px livres no topo e na base -->
  <section class="slide story">
    <img class="folha" src="../../../img/folinha-hero.png" alt="">
    <span class="kicker"><i class="ph-bold ph-hand-waving"></i> Prazer, Cerrado Tech</span>
    <h1 style="font-size: 88px">Software feito em torno do <span class="acento">seu negócio.</span></h1>
    <p class="sub">ERPs, CRMs, IA e dashboards para empresas e para a gestão pública.</p>
    <div class="grade uma">
      {card1("puzzle-piece", "100% customizado", "Cada função nasce de uma necessidade real")}
      {card1("key", "O código é seu", "Sem amarras de fornecedor")}
      {card1("cpu", "IA que fica em casa", "Inclusive offline, com o Cerra.AI")}
    </div>
    <span class="contato principal"><i class="ph-bold ph-globe"></i> cerradofinancas.com.br</span>
  </section>
""" + FIM
    ig = f"""Prazer, Cerrado Tech: software feito em torno do seu negócio.

Somos a fábrica de software da Cerrado Finanças & Tech. Construímos ERPs, CRMs, IA (inclusive offline), e-commerce, compliance e dashboards, para empresas e para a gestão pública.

▪️ 100% customizado: cada função nasce de uma necessidade real
▪️ O código é seu, sem amarras de fornecedor
▪️ Integra com SAP®, TOTVS, Power BI, bancos e notas fiscais

Daqui nasceram o Cerra.AI, as soluções GovTech, a CerraClass e as startups do nosso venture builder.

Conte o seu processo: WhatsApp {WHATS}
🔗 cerradofinancas.com.br/fabrica

#CerradoTech #FabricaDeSoftware #SoftwareSobMedida #ERP #GovTech
"""
    li = f"""Prazer, Cerrado Tech.

Somos a fábrica de software da Cerrado Finanças & Tech: ERPs, CRMs, Inteligência Artificial (inclusive offline), e-commerce, compliance e dashboards, construídos em torno do processo de cada cliente, no mercado privado e na gestão pública. O código é do cliente, sem amarras de fornecedor.

Do ecossistema nasceram o Cerra.AI, as soluções GovTech (GovDash, Edu, GovRH e Docs), a CerraClass e as startups do nosso venture builder.

Liderança: Renato Rosa, CEO e arquiteto de soluções, mestre em Contabilidade (UFPR) e doutorando em algoritmos e compliance.

cerradofinancas.com.br/fabrica
"""
    return entrega, "Cerrado Tech", car, st, ig, li, "@cerradofinancas"


# ======================= CerraClass =======================

def cerraclass():
    entrega = "2026-11-apresentacao-cerraclass"
    css = '<link rel="stylesheet" href="../../brand/cerraclass/marca.css">'
    body = ' style="--campo: #ffc83d"'
    rod = lambda p=False: f"""    <div class="rodape">
      <span class="marca"><span class="selo"><img src="../../brand/cerraclass/logo.png" alt=""></span> CerraClass</span>
      <span>{'arraste →' if p else '<span data-pagina></span>'}</span>
    </div>"""
    assentos = "<i></i>" * 10
    s = [
        f"""  <section class="slide capa">
    <span class="etiqueta">Prazer, CerraClass</span>
    <h1 class="mega" style="font-size: 150px">Aprenda IA com quem constrói software.</h1>
    <p class="sub" style="margin-top: 44px">Treinamentos presenciais e 100% práticos de Inteligência Artificial e tecnologia, para profissionais e empresas.</p>
    <div class="turma mini">
      <div class="assentos">{assentos}</div>
      <span class="legenda-turma">Turma de até<br>10 alunos</span>
    </div>
{rod(True)}
  </section>
""",
        f"""  <section class="slide tinta">
    <span class="etiqueta">O formato</span>
    <h2 class="titulo">Turma pequena, mão na massa</h2>
    <div class="turma">
      <span class="num">10<small>alunos,<br>no máximo</small></span>
      <div class="assentos">{assentos}</div>
    </div>
    <ul class="lista compacta" style="margin-top: 60px">
      <li>100% prático: você sai com algo funcionando</li>
      <li>Nenhuma linha de código exigida</li>
      <li>Presencial, com acompanhamento de perto</li>
    </ul>
{rod()}
  </section>
""",
        f"""  <section class="slide">
    <span class="etiqueta">Os cursos</span>
    <h2 class="titulo">Um curso para cada objetivo</h2>
    <ul class="lista dupla">
      <li><b>IA na Prática</b><span>Para profissionais e empresas que querem construir com IA</span></li>
      <li><b>IA em Ação Farma</b><span>Para propagandistas da indústria farmacêutica</span></li>
      <li><b>11 cursos presenciais</b><span>De Excel com IA a Ciência de Dados</span></li>
      <li><b>In company</b><span>Com os dados e os problemas reais da sua empresa</span></li>
    </ul>
{rod()}
  </section>
""",
        f"""  <section class="slide">
    <span class="etiqueta">Quem está por trás</span>
    <div class="instrutor">
      <img src="{FOTO}" alt="Renato Rosa">
      <div><h3>Renato Rosa</h3><p>Dados, IA e Software</p></div>
    </div>
    <ul class="lista compacta">
      <li>Mestre em Contabilidade (UFPR) e doutorando em algoritmos e compliance</li>
      <li>Bolsista ICTI / Itaú Unibanco em Dados e Machine Learning</li>
      <li>Fundador da Cerrado Tech, fábrica de software</li>
    </ul>
{rod()}
  </section>
""",
        f"""  <section class="slide">
    <span class="etiqueta">Neste perfil</span>
    <h2 class="titulo">O que você vai ver aqui</h2>
    <ul class="lista dupla">
      <li><b>Cada curso</b><span>Para quem é, o que aprende e o que leva para casa</span></li>
      <li><b>O antes e o depois</b><span>O que muda na rotina de quem aprende a construir</span></li>
      <li><b>Ferramentas</b><span>As IAs e os apps que usamos em sala</span></li>
      <li><b>Turmas</b><span>Quando abrir inscrição, o aviso sai aqui</span></li>
    </ul>
{rod()}
  </section>
""",
        f"""  <section class="slide">
    <span class="etiqueta">Siga</span>
    <h2 class="mega" style="font-size: 132px">Pare de só usar IA. Construa com ela.</h2>
    <p class="sub" style="margin-top: 36px">Agenda, valores e inscrições no site da CerraClass.</p>
    <div class="contatos">
      <span class="contato principal">cerraclass.com.br</span>
      <span class="contato">WhatsApp {WHATS}</span>
    </div>
{rod()}
  </section>
""",
    ]
    car = cab(entrega, "1080x1350", "Carrossel: apresentação CerraClass", css, body=body) + "".join(s) + FIM
    st = cab(entrega, "1080x1920", "Story: apresentação CerraClass", css, body=body) + f"""  <!-- área segura: ~250px livres no topo e na base -->
  <section class="slide story">
    <span class="etiqueta">Prazer, CerraClass</span>
    <h1 class="mega" style="font-size: 150px">Aprenda IA com quem constrói software.</h1>
    <ul class="lista compacta" style="margin-top: 50px">
      <li>Presencial e 100% prático</li>
      <li>Turma de até 10 alunos</li>
      <li>Nenhuma linha de código exigida</li>
    </ul>
    <span class="contato principal" style="margin-top: auto; align-self: flex-start">cerraclass.com.br</span>
  </section>
""" + FIM
    ig = f"""Prazer, CerraClass: aprenda IA com quem constrói software.

Treinamentos presenciais e 100% práticos de Inteligência Artificial e tecnologia, para profissionais e empresas.
✏️ Turma de até 10 alunos
✏️ Você sai com algo funcionando
✏️ Nenhuma linha de código exigida

Cursos: IA na Prática, IA em Ação Farma, 11 cursos presenciais (de Excel com IA a Ciência de Dados) e turmas in company.

Agenda, valores e inscrições: cerraclass.com.br
WhatsApp {WHATS}

#CerraClass #CursoDeIA #InteligenciaArtificial #Capacitacao
"""
    li = f"""Prazer, CerraClass.

A CerraClass oferece treinamentos presenciais e 100% práticos de Inteligência Artificial e tecnologia, em turmas de até 10 alunos, com quem constrói software todos os dias na Cerrado Tech. Nenhuma linha de código é exigida: o objetivo é sair da sala com uma ferramenta funcionando.

Cursos: IA na Prática, IA em Ação Farma, 11 cursos presenciais e turmas in company, com os dados e problemas reais da empresa.

cerraclass.com.br
"""
    return entrega, "CerraClass", car, st, ig, li, "@cerraclass"


# ======================= Guia Acadêmico =======================

def guiacademico():
    entrega = "2026-11-apresentacao-guiacademico"
    icone = "../../brand/guiacademico/logo-icone.png"
    css = '<link rel="stylesheet" href="../../brand/guiacademico/marca.css">'
    cabeca = '    <div class="cabeca"><span>Guia Acadêmico</span><span>Cadernos de método</span><span><b>nº 00</b></span></div>'
    rod = lambda p=False: f"""    <div class="rodape">
      <span class="marca"><img src="{icone}" alt=""> Guia Acadêmico <small>Seu mentor</small></span>
      {'<span>arraste →</span>' if p else '<span>p. <span data-pagina></span></span>'}
    </div>"""
    sec = lambda m, cl="", p=False: f'  <section class="slide {cl}">\n{cabeca}\n{m}\n{rod(p)}\n  </section>\n'
    s = [
        sec(f"""    <p class="rubrica">§ 0 · Apresentação</p>
    <h1 class="mega">Prazer, <em>Guia Acadêmico</em>.</h1>
    <div class="resumo"><span class="lbl">Resumo</span><p>Consultoria acadêmica de orientação metodológica e análise de dados, para quem está no TCC, na especialização, no mestrado ou no doutorado.</p></div>
    <p class="chaves"><b>Palavras-chave:</b> mentoria; metodologia; análise de dados; ética.</p>
    <img class="bussola" src="{icone}" alt="" data-sangra>
    <div class="respiro"></div>""", p=True),
        sec(f"""    <p class="rubrica">1 · Quem orienta</p>
    <h2 class="titulo">Prof. <em>Renato Rosa</em></h2>
    <div style="display: grid; grid-template-columns: 330px 1fr; gap: 40px; align-items: start">
      <figure><img src="{FOTO}" alt="Prof. Renato Rosa" style="width: 330px; height: 400px; object-fit: cover; border: 1px solid var(--filete); box-shadow: 10px 10px 0 var(--papel-escuro)">
      <figcaption class="fonte" style="margin-top: 22px; font-style: normal"><b style="color: var(--tinta)">Figura 1.</b> Doutorando e consultor sênior.</figcaption></figure>
      <ul class="secoes">
        <li><span>1.1</span>Mestre em Contabilidade (UFPR)</li>
        <li><span>1.2</span>Doutorando em algoritmos e compliance</li>
        <li><span>1.3</span>Bolsista ICTI / Itaú Unibanco em Dados e Machine Learning</li>
      </ul>
    </div>
    <div class="respiro"></div>"""),
        sec(f"""    <p class="rubrica">2 · O que fazemos</p>
    <h2 class="titulo">As <em>frentes</em> do Guia</h2>
    <p class="quadro-tit"><b>Quadro 0</b> · Serviços de consultoria acadêmica</p>
    <div class="quadro">
      <div class="linha"><b>Orientação metodológica</b><span>Do problema ao delineamento</span></div>
      <div class="linha"><b>Análise estatística</b><span>STATA, R, Python e SPSS</span></div>
      <div class="linha"><b>Análise qualitativa</b><span>IRAMUTEQ, NVivo e Atlas.ti</span></div>
      <div class="linha"><b>Mineração de dados</b><span>Raspagem de bases públicas</span></div>
      <div class="linha"><b>IA acadêmica</b><span>Uso ético de modelos de linguagem</span></div>
      <div class="linha"><b>Formatação e submissão</b><span>ABNT, APA, Vancouver e periódicos</span></div>
    </div>
    <p class="fonte">Fonte: guiacademico.com.br.</p>
    <div class="respiro"></div>"""),
        sec(f"""    <p class="rubrica">3 · Como funciona</p>
    <h2 class="titulo">O <em>protocolo</em></h2>
    <ul class="secoes">
      <li><span>3.1</span>Diagnóstico: a sua necessidade e a viabilidade técnica</li>
      <li><span>3.2</span>Proposta: escopo, cronograma de entregas e orçamento</li>
      <li><span>3.3</span>Acompanhamento: sessões técnicas e entregas parciais</li>
      <li><span>3.4</span>Área do Aluno: os seus arquivos e o andamento</li>
    </ul>
    <div class="respiro"></div>"""),
        sec("""    <p class="rubrica">4 · Neste perfil</p>
    <h2 class="titulo">Os <em>Cadernos de método</em></h2>
    <ul class="passos">
      <li><span>01</span>Problema de pesquisa, amostra e questionário</li>
      <li><span>02</span>Estatística, análise qualitativa e revisão sistemática</li>
      <li><span>03</span>ABNT, Comitê de Ética, banca e IA com ética</li>
    </ul>
    <p class="autor">Você continua sendo o autor da pesquisa.</p>""", "tinta"),
        sec(f"""    <span class="selo">Diagnóstico da pesquisa</span>
    <h2 class="mega" style="font-size: 96px">Pesquisa com <em>rigor</em>, do projeto à banca.</h2>
    <div class="contatos">
      <span class="contato principal">Agendar diagnóstico</span>
      <span class="contato">guiacademico.com.br</span>
      <span class="contato">WhatsApp {WHATS}</span>
    </div>
    <p class="etica"><b>Não executamos trabalhos por terceiros.</b> Atuamos em orientação metodológica, capacitação técnica, análise de dados e revisão. O autor da pesquisa é você.</p>"""),
    ]
    car = cab(entrega, "1080x1350", "Carrossel: apresentação Guia Acadêmico", css) + "\n".join(s) + FIM
    st = cab(entrega, "1080x1920", "Story: apresentação Guia Acadêmico", css) + f"""  <!-- área segura: ~250px livres no topo e na base -->
  <section class="slide story">
{cabeca}
    <p class="rubrica">§ 0 · Apresentação</p>
    <h1 class="mega">Prazer, <em>Guia Acadêmico</em>.</h1>
    <ul class="secoes" style="margin-top: 56px">
      <li><span>0.1</span>Orientação metodológica</li>
      <li><span>0.2</span>Análise de dados quanti e quali</li>
      <li><span>0.3</span>Do projeto à banca, com ética</li>
    </ul>
    <span class="selo" style="margin: auto 0 26px">Diagnóstico da pesquisa</span>
    <span class="contato principal" style="align-self: flex-start; background: var(--tinta); color: var(--papel); padding: 20px 32px">guiacademico.com.br</span>
    <img class="bussola" src="{icone}" alt="" data-sangra style="bottom: 200px; right: -120px; width: 440px">
  </section>
""" + FIM
    ig = f"""Prazer, Guia Acadêmico.

Consultoria acadêmica de orientação metodológica e análise de dados para quem está no TCC, na especialização, no mestrado ou no doutorado, com o Prof. Renato Rosa (mestre em Contabilidade pela UFPR e doutorando).

O que fazemos: orientação metodológica, análise estatística (STATA, R, Python, SPSS), análise qualitativa (IRAMUTEQ, NVivo, Atlas.ti), mineração de dados, IA acadêmica com ética e formatação ABNT, APA e Vancouver.

Neste perfil, os Cadernos de método: um tema de pesquisa por post.

Não executamos trabalhos por terceiros: orientamos, ensinamos, analisamos e revisamos. O autor da pesquisa é você.

Diagnóstico pelo WhatsApp {WHATS}
🔗 guiacademico.com.br

#GuiaAcademico #PesquisaCientifica #Mestrado #Doutorado #TCC #Metodologia
"""
    li = f"""Prazer, Guia Acadêmico.

Consultoria acadêmica de orientação metodológica e análise de dados, do projeto à banca, para graduação, especialização, mestrado e doutorado. À frente, o Prof. Renato Rosa: mestre em Contabilidade (UFPR), doutorando em algoritmos e compliance e bolsista ICTI / Itaú Unibanco em Dados e Machine Learning.

Protocolo: diagnóstico, proposta com cronograma e acompanhamento com entregas parciais, com sigilo e conformidade com a LGPD. Não executamos trabalhos por terceiros: o autor da pesquisa é o aluno.

guiacademico.com.br
"""
    return entrega, "Guia Acadêmico", car, st, ig, li, "@guiacademico"


def main():
    for f in (cerraai, cerradotech, cerraclass, guiacademico):
        entrega, nome, car, st, ig, li, conta = f()
        post, ent = RAIZ / "posts" / entrega, RAIZ / "entregas" / entrega
        post.mkdir(parents=True, exist_ok=True)
        ent.mkdir(parents=True, exist_ok=True)
        (post / "carrossel.html").write_text(car, encoding="utf-8")
        (post / "story.html").write_text(st, encoding="utf-8")
        (ent / "legenda-instagram.txt").write_text(ig, encoding="utf-8")
        (ent / "legenda-linkedin.txt").write_text(li, encoding="utf-8")
        info = {
            "titulo": f"Apresentação institucional · {nome}",
            "data": DATA,
            "descricao": f"Post de apresentação do {nome} (\"Prazer, {nome}\"), para fixar no topo do perfil {conta}.",
            "orientacoes": [
                f"É o primeiro post do {conta}: fixar no topo do perfil.",
                "Carrossel: carrossel-01 a 06, na ordem. No LinkedIn, os PNGs como documento.",
                "Carrossel animado (carrossel-animado.mp4): o Reel da apresentação, uma semana depois (está na agenda).",
                "Story: também vale guardar nos destaques como \"Quem somos\".",
            ],
        }
        (ent / "info.json").write_text(json.dumps(info, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(entrega)


if __name__ == "__main__":
    main()
