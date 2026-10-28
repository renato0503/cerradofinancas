"""Gera a série das Consultorias da Cerrado Finanças: uma "prancha" por linha de consultoria (7 no total).

Identidade "Planta" (brand/consultoria/marca.css): papel vegetal com grade, traço grafite, um laranja de prancheta,
cotas, o corte antes/depois e o carimbo da prancha no rodapé.

Fonte única do conteúdo: consultorias.html (e a página do produto ligado). Regras: os números do site (50+ projetos,
R$ 2 bi, 12 anos, "até 40%") não entram até o Renato confirmar; a Lei do Bem vale para o Lucro Real e a peça diz
isso; GovTech em tom institucional, sem promessa de contratação. Chamada: "Agendar diagnóstico gratuito".

Uso:
    python tools/gerar_consultorias.py
"""
import json
import re
from datetime import date, timedelta
from html import escape
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
WHATS = "(67) 99351-5206"
FOLHA = "../../../img/folinha-hero.png"
TAGS_BASE = "#CerradoFinancas #Consultoria #GestaoEmpresarial"

# *x* = destaque em itálico laranja
CONSULTORIAS = [
    dict(slug="bpo-financeiro", nome="BPO financeiro", linha="Terceirização de alta performance",
         publico="Para empresas sem time financeiro",
         gancho="A sua diretoria está *conciliando extrato*?",
         capa_sub="A gente assume a operação financeira de ponta a ponta. Você mantém o foco nas vendas e na expansão.",
         sinais=["O sócio fecha o caixa no fim de semana", "Pagar e receber em planilhas soltas",
                 "O extrato não bate com a contabilidade", "Cobrança só quando o caixa aperta"],
         entregas=[("Fechamento contábil", "Todo mês, em dia"), ("Conciliação bancária", "O extrato batendo com os números"),
                   ("Contas a pagar e a receber", "A rotina executada pela nossa equipe"), ("Faturamento", "Notas e cobranças no prazo"),
                   ("Crédito e cobrança", "A gestão de quem deve à empresa"), ("FP&A", "Planejamento e análise financeira")],
         antes=["Planilhas soltas", "Sócio no financeiro", "Extrato sem conciliar", "Cobrança atrasada"],
         hub="BPO Cerrado", depois=["Pagar e receber", "Conciliação", "Faturamento", "Fechamento"],
         cta="Números *limpos e em dia*.", link="cerradofinancas.com.br/consultorias",
         tags="#BPOFinanceiro #Terceirizacao #FinancasEmpresariais"),
    dict(slug="controladoria", nome="Controladoria estruturada", linha="CFO digital para PMEs",
         publico="Para PMEs que querem escalar com segurança",
         gancho="Um *CFO*, sem contratar um CFO.",
         capa_sub="DRE gerencial, orçamento base zero, indicadores e auditoria interna: a arquitetura para crescer sem vazamento de caixa.",
         sinais=["A empresa vende mais e o caixa não acompanha", "Ninguém sabe a margem de cada produto",
                 "O orçamento é o do ano passado, mais um pouco", "As decisões saem do feeling"],
         entregas=[("DRE gerencial", "Detalhada, feita para decidir"), ("Orçamento base zero", "Cada gasto justificado"),
                   ("KPIs", "Painéis de indicadores de alta precisão"), ("Auditoria interna", "Processos rígidos de controle")],
         antes=["Caixa no escuro", "Margem desconhecida", "Orçamento no chute", "Decisão no feeling"],
         hub="Controladoria", depois=["DRE gerencial", "Orçamento base zero", "KPIs", "Auditoria interna"],
         cta="Pare o *vazamento invisível* de caixa.", link="cerradofinancas.com.br/consultorias",
         tags="#Controladoria #CFO #DREGerencial #OrcamentoBaseZero"),
    dict(slug="csc-strategy", nome="CSC Strategy", linha="Centro de Serviços Compartilhados",
         publico="Para grupos empresariais e holdings",
         gancho="Cinco empresas, *cinco jeitos* de pagar conta?",
         capa_sub="Centralizamos os processos financeiros, fiscais e administrativos do grupo num hub único, com o mesmo padrão em todas as unidades.",
         sinais=["Cada unidade tem o seu próprio financeiro", "Os mesmos processos repetidos em cada empresa",
                 "Relatórios que não conversam entre si", "Custo administrativo que cresce junto com o grupo"],
         entregas=[("Desenho do CSC", "Sob medida para o seu grupo"), ("Implementação", "Do hub único ao padrão de cada unidade"),
                   ("Automação processual", "Menos retrabalho e redundância"), ("Padronização total", "Todas as unidades no mesmo padrão"),
                   ("Plataforma CSC Strategy", "Implementação, gestão e escala do centro")],
         antes=["Empresa A", "Empresa B", "Empresa C", "Empresa D"],
         hub="CSC do grupo", depois=["Financeiro", "Fiscal", "Administrativo", "Padrão único"],
         cta="Um grupo, *um padrão*.", link="cerradofinancas.com.br/csc-strategy",
         tags="#CSC #ServicosCompartilhados #Holding #SharedServices"),
    dict(slug="grc", nome="Governança, risco e compliance", linha="GRC e mitigação de riscos",
         publico="Para empresas auditadas e reguladas",
         gancho="Apontamento de auditoria *resolvido e evidenciado*.",
         capa_sub="Workflow 5W2H para cada apontamento, matriz de risco e adequação à LGPD com DPO as a Service.",
         sinais=["O mesmo apontamento volta em toda auditoria", "Ninguém sabe quem responde por cada ação",
                 "Dados pessoais sem mapeamento", "A LGPD ainda é um projeto para depois"],
         entregas=[("Compliance 5W2H", "Com a plataforma CerraPlan"), ("Matriz de risco", "Jurídico, operacional e de execução"),
                   ("DPO as a Service", "Com o Cerrado Privacy"), ("Adequação à LGPD", "Mapeamento de dados com IA e relatórios ROPA e RIPD")],
         antes=["Apontamento sem dono", "Prazo esquecido", "Dados sem mapa", "Risco sem matriz"],
         hub="GRC", depois=["Plano 5W2H", "Responsável e prazo", "Evidência", "Matriz de risco"],
         cta="Risco *mapeado*, ação *evidenciada*.", link="cerradofinancas.com.br/cerraplan",
         tags="#Compliance #GRC #LGPD #Governanca #Auditoria"),
    dict(slug="planejamento-tributario", nome="Planejamento tributário e inovação", linha="Lei do Bem e incentivos fiscais",
         publico="Para empresas que investem em inovação",
         gancho="Inovação também pode *reduzir imposto*.",
         capa_sub="Diagnóstico da carga tributária e apuração de incentivos à inovação, com a Plataforma Lei do Bem cruzando a sua contabilidade com IA.",
         sinais=["A empresa investe em inovação e não usa incentivo", "O regime tributário nunca foi revisto",
                 "Créditos de imposto esquecidos", "Autuação sem uma defesa estruturada"],
         entregas=[("Lei do Bem", "Desoneração de IRPJ e CSLL para quem inova"), ("Mix de tributação", "Simples, Presumido ou Real"),
                   ("Fator R", "Aplicado quando cabe"), ("Recuperação de créditos", "O que foi pago a mais"),
                   ("Contencioso administrativo", "Defesa ativa")],
         nota="A Lei do Bem vale para empresas tributadas pelo Lucro Real.",
         antes=["Regime sem revisão", "Inovação sem incentivo", "Crédito esquecido", "Autuação sem defesa"],
         hub="Planejamento", depois=["Regime certo", "Lei do Bem", "Créditos recuperados", "Defesa estruturada"],
         cta="O imposto certo, *dentro da lei*.", link="cerradofinancas.com.br/leidobem",
         tags="#PlanejamentoTributario #LeiDoBem #IncentivosFiscais #Inovacao"),
    dict(slug="venture-building", nome="Venture building", linha="Criação de startups",
         publico="Para fundadores com uma ideia e sem time técnico",
         gancho="Da ideia ao MVP, *com sócio técnico*.",
         capa_sub="A gente co-cria a startup do zero: a arquitetura financeira, societária e tecnológica para transformar a ideia num negócio rentável.",
         sinais=["A ideia só foi validada na conversa", "Falta quem construa o produto",
                 "O pitch ainda não tem os números", "A rodada de investimento parece longe"],
         entregas=[("MVP", "O produto mínimo viável, construído"), ("Arquitetura societária", "Quem é dono de quê"),
                   ("Pitch deck financeiro", "Com os números que o investidor pergunta"), ("Captação", "Apoio nas rodadas Seed e Series A"),
                   ("Tech partner", "Sócio operacional e tecnológico")],
         antes=["Ideia", "Planilha", "Sem produto", "Sem investidor"],
         hub="Startup", depois=["MVP", "Sociedade", "Pitch deck", "Rodada"],
         cta="Construa *com quem já constrói*.", link="cerradofinancas.com.br/startups",
         tags="#VentureBuilding #Startups #MVP #Empreendedorismo"),
    dict(slug="govtech", nome="Consultoria GovTech", linha="Gestão pública",
         publico="Para prefeituras, câmaras e órgãos públicos",
         gancho="Edital de TI bem escrito é *sistema que funciona*.",
         capa_sub="Apoiamos o setor público na contratação, implementação e gestão de sistemas, com aderência à Nova Lei de Licitações e à LGPD.",
         sinais=["Sistema contratado que ninguém usa", "Edital copiado de outro órgão",
                 "Implantação sem gestão de projeto", "Dúvidas sobre a LGPD nos dados do cidadão"],
         entregas=[("Levantamento de requisitos", "Antes do edital"), ("Avaliação de editais de TI", "Termo de referência sólido"),
                   ("Gestão de projetos", "Com a metodologia PMBOK"), ("Aderência legal", "Lei 14.133/2021 e LGPD"),
                   ("Transformação digital", "Do papel ao sistema")],
         antes=["Edital genérico", "Sistema parado", "Projeto sem gestão", "Dados expostos"],
         hub="Órgão público", depois=["Requisitos", "Edital sólido", "Gestão PMBOK", "LGPD"],
         cta="Tecnologia pública *que entrega*.", link="cerradofinancas.com.br/consultorias",
         tags="#GovTech #GestaoPublica #NovaLeiDeLicitacoes #Prefeituras"),
]

ETAPAS = [("Diagnóstico gratuito", "Uma sessão para entender o seu caso"),
          ("Roadmap", "O desenho da estrutura e as prioridades"),
          ("Implantação", "A gente executa junto com o seu time"),
          ("Acompanhamento", "Indicadores para medir o resultado")]


def destacar(texto):
    return re.sub(r"\*([^*]+)\*", r"<em>\1</em>", escape(texto))


def plano(texto):
    return texto.replace("*", "")


def inseparavel(texto):
    return re.sub(r"(?<=\w)-(?=\w)", "‑", texto)


def quartas(n, inicio=date(2026, 11, 4)):
    return [inicio + timedelta(weeks=k) for k in range(n)]


CAB = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="entrega" content="{entrega}">
  <meta name="formato" content="{formato}">
  <title>{titulo}</title>
  <link rel="stylesheet" href="../../brand/consultoria/marca.css">
</head>
<body>
"""
FIM = """  <script src="../../brand/slides.js"></script>
</body>
</html>
"""


def rodape(n, primeiro=False):
    direita = "<span>arraste →</span>" if primeiro else "<span data-pagina></span>"
    return f"""    <div class="rodape">
      <span class="marca"><img src="{FOLHA}" alt=""> Cerrado Finanças <small>Consultoria</small></span>
      <span>Prancha {n:02d}/{len(CONSULTORIAS):02d}</span>
      {direita}
    </div>"""


def slide(miolo, n, classe="", primeiro=False):
    return f'  <section class="slide {classe}">\n{miolo}\n{rodape(n, primeiro)}\n  </section>\n'


def carrossel(c, n, entrega):
    galhos = "".join(f'<div class="galho"><span>{escape(x)}</span></div>' for x in c["depois"])
    s = [slide(f"""    <p class="rotulo">Prancha {n:02d} · <b>{escape(c['nome'])}</b></p>
    <h1 class="mega"{' style="font-size: 100px"' if len(plano(c['gancho'])) > 42 else ''}>{destacar(c['gancho'])}</h1>
    <p class="sub" style="margin-top: 40px">{escape(inseparavel(c['capa_sub']))}</p>
    <div class="organo" style="margin-top: auto">
      <span class="topo">{escape(c['hub'])}</span><span class="tronco"></span>
      <div class="galhos">{galhos}</div>
    </div>
    <div class="cota" style="margin: 56px 0 190px"><span>{escape(c['publico'])}</span></div>""", n, primeiro=True)]

    itens = "\n".join(f"      <li>{escape(inseparavel(x))}</li>" for x in c["sinais"])
    s.append(slide(f"""    <p class="rotulo">Os sinais</p>
    <h2 class="titulo">Se a sua empresa <em>se reconhece</em> aqui…</h2>
    <ul class="sinais">
{itens}
    </ul>
    <p class="sub" style="margin-top: auto; margin-bottom: 190px; color: var(--grafite)">…está na hora de redesenhar a estrutura.</p>""", n))

    ent = c["entregas"]
    blocos = "\n".join(
        f'      <div class="e{" larga" if len(ent) % 2 and i == len(ent) - 1 else ""}"><b>{escape(inseparavel(t))}</b><span>{escape(inseparavel(d))}</span></div>'
        for i, (t, d) in enumerate(ent))
    nota = f'\n    <p class="nota" style="margin-top: 34px">{escape(c["nota"])}</p>' if c.get("nota") else ""
    s.append(slide(f"""    <p class="rotulo">{escape(c['nome'])} · {escape(c['linha'])}</p>
    <h2 class="titulo">O que <em>entregamos</em>.</h2>
    <div class="entregas">
{blocos}
    </div>{nota}
    <div class="cota" style="margin-top: auto; margin-bottom: 190px"><span>{escape(c['publico'])}</span></div>""", n))

    antes = "".join(f'<div class="bloco">{escape(x)}</div>' for x in c["antes"])
    depois = "".join(f'<div class="bloco">{escape(x)}</div>' for x in c["depois"])
    s.append(slide(f"""    <p class="rotulo">A planta</p>
    <h2 class="titulo">Antes e <em>depois</em>.</h2>
    <div class="corte">
      <div class="antes"><h3>Antes</h3>{antes}</div>
      <div class="depois"><h3>Depois</h3><div class="hub">{escape(c['hub'])}</div><div class="ramo">{depois}</div></div>
    </div>
    <div class="cota" style="margin-top: auto; margin-bottom: 190px"><span>Estrutura desenhada sob medida</span></div>""", n))

    etapas = "\n".join(
        f'      <div class="et"><span class="n">Etapa {i}</span><div><b>{escape(t)}</b><span>{escape(d)}</span></div></div>'
        for i, (t, d) in enumerate(ETAPAS, start=1))
    s.append(slide(f"""    <p class="rotulo">Como funciona</p>
    <h2 class="titulo">Cada projeto é <em>único</em>.</h2>
    <div class="etapas">
{etapas}
    </div>
    <p class="sub" style="margin-top: auto; margin-bottom: 190px; color: var(--vegetal); font-family: 'Fraunces', serif; font-size: 46px">Tudo começa por uma conversa: <em style="color: var(--laranja)">o diagnóstico é gratuito</em>.</p>""", n, "grafite"))

    s.append(slide(f"""    <span class="selo">Diagnóstico gratuito</span>
    <h2 class="mega" style="font-size: 104px">{destacar(c['cta'])}</h2>
    <div class="contatos">
      <span class="contato principal">Agendar diagnóstico</span>
      <span class="contato">{c['link']}</span>
      <span class="contato">WhatsApp {WHATS}</span>
    </div>
    <div class="organo" style="margin-top: auto">
      <span class="topo">{escape(c['hub'])}</span><span class="tronco"></span>
      <div class="galhos">{galhos}</div>
    </div>
    <p class="nota" style="margin: 40px 0 190px">Consultoria desenhada sob medida para o seu caso.</p>""", n))
    return CAB.format(entrega=entrega, formato="1080x1350", titulo=f"Carrossel: Consultoria, {escape(c['nome'])}") + "\n".join(s) + FIM


def story(c, n, entrega):
    galhos = "".join(f'<div class="galho"><span>{escape(x)}</span></div>' for x in c["depois"])
    itens = "\n".join(f"      <li>{escape(inseparavel(x))}</li>" for x in c["sinais"][:3])
    return CAB.format(entrega=entrega, formato="1080x1920", titulo=f"Story: Consultoria, {escape(c['nome'])}") + f"""  <!-- área segura: ~250px livres no topo e na base -->
  <section class="slide story">
    <p class="rotulo">Prancha {n:02d} · <b>{escape(c['nome'])}</b></p>
    <h1 class="mega" style="font-size: {92 if len(plano(c['gancho'])) > 42 else 104}px">{destacar(c['gancho'])}</h1>
    <ul class="sinais" style="margin-top: 60px">
{itens}
    </ul>
    <div class="organo" style="margin-top: auto; margin-bottom: 60px">
      <span class="topo">{escape(c['hub'])}</span><span class="tronco"></span>
      <div class="galhos">{galhos}</div>
    </div>
    <span class="selo" style="margin: 0 0 26px">Diagnóstico gratuito</span>
    <span class="contato principal" style="align-self: flex-start; font-family: 'DM Mono', monospace; background: var(--laranja); color: #fff; padding: 18px 30px; font-size: 32px">{c['link']}</span>
  </section>
""" + FIM


def legendas(c):
    sinais = "\n".join(f"• {x}" for x in c["sinais"])
    entregas = "\n".join(f"▸ {t}: {d[0].lower() + d[1:]}" for t, d in c["entregas"])
    nota = f"\n{c['nota']}\n" if c.get("nota") else ""
    li = f"""{plano(c['gancho'])}

{c['capa_sub']}

Sinais de que está na hora de redesenhar a estrutura:
{sinais}

O que a Cerrado Finanças entrega em {c['nome']}:
{entregas}
{nota}
Como funciona: diagnóstico gratuito, roadmap, implantação junto com o seu time e acompanhamento por indicadores. Cada projeto é desenhado sob medida.

{plano(c['cta'])} Agende o diagnóstico: {c['link']}

{c['tags']} {TAGS_BASE}
"""
    ig = f"""{plano(c['gancho'])}

{c['capa_sub']}

Se a sua empresa se reconhece aqui:
{sinais}
{nota}
{plano(c['cta'])} Diagnóstico gratuito pelo WhatsApp {WHATS}
🔗 {c['link']}

{c['tags']} {TAGS_BASE}
"""
    return ig, li


def main():
    for n, (c, d) in enumerate(zip(CONSULTORIAS, quartas(len(CONSULTORIAS))), start=1):
        entrega = f"2026-11-consultoria-{c['slug']}"
        post, ent = RAIZ / "posts" / entrega, RAIZ / "entregas" / entrega
        post.mkdir(parents=True, exist_ok=True)
        ent.mkdir(parents=True, exist_ok=True)
        (post / "carrossel.html").write_text(carrossel(c, n, entrega), encoding="utf-8")
        (post / "story.html").write_text(story(c, n, entrega), encoding="utf-8")
        ig, li = legendas(c)
        (ent / "legenda-linkedin.txt").write_text(li, encoding="utf-8")
        (ent / "legenda-instagram.txt").write_text(ig, encoding="utf-8")
        info = {
            "titulo": f"Consultoria · {c['nome']}",
            "data": d.isoformat(),
            "descricao": f"Série das Consultorias da Cerrado Finanças (prancha {n} de {len(CONSULTORIAS)}), na identidade própria \"Planta\".",
            "orientacoes": [
                f"Postar em {d.strftime('%d/%m')} de manhã, primeiro no LinkedIn (a série sai às quartas; o público é decisor de empresa e gestor público).",
                "Carrossel: no LinkedIn, subir os 6 PNGs como documento ou carrossel; no Instagram, na ordem (carrossel-01 a 06).",
                "Carrossel animado (carrossel-animado.mp4, 1080×1350, com som): os mesmos slides em vídeo.",
                f"Story: adicionar o sticker de link para https://www.{c['link']}",
                "Legendas prontas abaixo: a do LinkedIn é a principal.",
            ],
        }
        (ent / "info.json").write_text(json.dumps(info, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"{n}. {d.strftime('%d/%m')}  {entrega}")


if __name__ == "__main__":
    main()
