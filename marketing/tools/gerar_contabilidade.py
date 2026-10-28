"""Gera a série da Cerrado Contabilidade: "Para quem atendemos" (4 perfis) e "O que fazemos" (6 grupos de serviço).

Identidade própria "Partida dobrada" (brand/contabilidade/marca.css): papel de livro-razão, razonete em T,
escada do crescimento MEI → ME → EPP → Lucro Presumido e carimbo EM DIA.

Regras de copy (ver HISTORICO.md): só serviços confirmados no site (contabilidade.html, consultorias.html) e o Lucro
Presumido (confirmado pelo Renato). Itens ainda não confirmados (inscrição estadual, baixa de empresa, IRPF dos sócios,
parcelamentos, Lucro Real etc.) ficam de fora. Sem números de limite, alíquota ou prazo, exceto o Fator R de 6%
que já está no site. Publicidade sóbria (código de ética do CFC): nada de promessa de economia ou de resultado.

Uso:
    python tools/gerar_contabilidade.py
"""
import json
import re
from datetime import date, timedelta
from html import escape
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
PREFIXO = "2026-11-contabil-"
WHATS = "(67) 99351-5206"
FOLHA = "../../../img/folinha-hero.png"
LINK = "cerradofinancas.com.br/contabilidade"
TAGS_BASE = "#CerradoContabilidade #Contabilidade #ContabilidadeDigital #CerradoFinancas #Cuiaba #MatoGrosso"

DEGRAUS = [("MEI", "Microempreendedor"), ("ME", "Microempresa"), ("EPP", "Pequena empresa"), ("Presumido", "Lucro Presumido")]

COMO_FUNCIONA = [
    ("100% digital e em nuvem", "Sem papelada e sem precisar sair de casa"),
    ("Suporte humano no WhatsApp", "Fala direto com quem cuida da sua empresa"),
    ("Troca de contador sem dor de cabeça", "A migração é transparente e acompanhada"),
    ("Dados para decidir", "Não só guias: números para você gerir o negócio"),
]

# *palavra* = destaque (marca-texto verde); ~palavra~ = vermelho (a dor)
SERIE = [
    # ---------- Série A: para quem atendemos ----------
    dict(slug="mei", serie="Para quem atendemos", ativos=[0],
         gancho="MEI também merece um *contador de verdade*.",
         capa_sub="A gente cuida da formalização, das guias e das declarações. Você cuida de vender.",
         degrau_titulo="O primeiro degrau", degrau_texto="Microempreendedor individual: o começo formal do negócio, com CNPJ e nota fiscal. E quando o MEI crescer, você sobe de degrau com o mesmo contador.",
         voce=["Atender os clientes", "Vender e entregar", "Planejar o crescimento"],
         gente=["Formalização e CNPJ", "Guias e declarações em dia", "Orientação para crescer"],
         servicos=[("Formalização e gestão de MEI", "Do CNPJ às declarações"), ("Estudo de CNAE", "A atividade certa desde o início"),
                   ("Alvarás e inscrição municipal", "Tudo regularizado na Prefeitura"), ("Declarações em dia", "Sem esquecer prazo")],
         cta="Seu MEI *em dia*, do jeito certo.", tags="#MEI #Microempreendedor #CNPJ"),
    dict(slug="simples-nacional", serie="Para quem atendemos", ativos=[1, 2],
         gancho="Você paga o ~DAS~ certo ou só paga?",
         capa_sub="No Simples Nacional, a alíquota depende de como a empresa está enquadrada. A gente confere.",
         degrau_titulo="Micro e pequena empresa", degrau_texto="O Simples Nacional reúne os impostos numa guia só. Atividade e enquadramento bem feitos fazem diferença no valor da guia.",
         voce=["Emitir e receber", "Cuidar da equipe", "Fazer o caixa girar"],
         gente=["Apuração exata do DAS", "Fator R, quando se aplica", "Notas e declarações"],
         servicos=[("Apuração do Simples Nacional", "O DAS mensal calculado com precisão"), ("Fator R", "Redução da alíquota para 6% em serviços, quando se aplica"),
                   ("Notas fiscais", "Emissão e controle"), ("Obrigações acessórias", "DEFIS e demais declarações em dia"),
                   ("Folha e eSocial", "Para quando a equipe crescer")],
         cta="Descubra se você está *pagando o certo*.", tags="#SimplesNacional #FatorR #DAS #PequenaEmpresa"),
    dict(slug="lucro-presumido", serie="Para quem atendemos", ativos=[3],
         gancho="Cresceu? O regime *cresce junto*.",
         capa_sub="Para quem saiu do Simples ou tem no Lucro Presumido a opção mais vantajosa.",
         degrau_titulo="Lucro Presumido", degrau_texto="Mais apurações e mais declarações, com a mesma tranquilidade. A escolha do regime vem de um estudo da sua operação, não de achismo.",
         voce=["Tocar a operação", "Liderar a equipe", "Decidir investimentos"],
         gente=["Apuração dos impostos", "Obrigações acessórias", "Balanço e DRE"],
         servicos=[("Apuração do Lucro Presumido", "Impostos calculados e guias em dia"), ("Obrigações acessórias", "Declarações entregues no prazo"),
                   ("Folha e eSocial", "Admissões, férias, 13º e guias"), ("Balanço e DRE", "A empresa em números claros"),
                   ("Planejamento tributário", "O regime certo para a sua operação")],
         cta="O *Presumido* é para a sua empresa?", tags="#LucroPresumido #PlanejamentoTributario #Impostos"),
    dict(slug="micro-a-media", serie="Para quem atendemos", ativos=[0, 1, 2, 3],
         gancho="Do *primeiro CNPJ* à média empresa, o mesmo contador.",
         capa_sub="A empresa cresce, o regime muda, e você não precisa recomeçar com outro escritório.",
         degrau_titulo="Toda a escada", degrau_texto="MEI, microempresa, pequena empresa no Simples Nacional e Lucro Presumido. A cada degrau, a contabilidade se adapta ao tamanho da empresa.",
         voce=["Fazer a empresa crescer", "Contratar", "Abrir novas frentes"],
         gente=["A troca de regime", "Folha que cresce junto", "Controladoria e BI"],
         servicos=[("MEI", "Formalização e declarações"), ("Simples Nacional", "DAS, Fator R e obrigações"),
                   ("Lucro Presumido", "Apuração e declarações"), ("Média empresa", "Controladoria, BPO financeiro e painéis em Power BI")],
         cta="Em qual degrau está a *sua empresa*?", tags="#Empreendedorismo #GestaoEmpresarial #PME"),
    # ---------- Série B: o que fazemos ----------
    dict(slug="abertura", serie="O que fazemos", ativos=[0, 1, 2, 3],
         gancho="Vai abrir o seu *primeiro CNPJ*?",
         capa_sub="Contrato social, Junta Comercial, Receita Federal e Prefeitura: a gente cuida de tudo.",
         degrau_titulo="Para qualquer degrau", degrau_texto="Do MEI à empresa no Lucro Presumido. Estudamos a sua atividade para escolher o CNAE certo e você começar na menor carga tributária possível.",
         voce=["A ideia do negócio", "Os primeiros clientes", "O ponto ou o site"],
         gente=["Contrato social e registros", "Estudo de CNAE", "Alvarás e inscrição"],
         servicos=[("Abertura de empresa", "Contrato social, Junta, Receita e Prefeitura"), ("Estudo de CNAE", "A atividade certa para pagar o justo"),
                   ("Alvarás e inscrição municipal", "Funcionando dentro da lei"), ("Escolha do regime", "Simples Nacional ou Lucro Presumido")],
         cta="Abra o seu CNPJ *com quem entende*.", tags="#AbrirEmpresa #CNPJ #Empreender"),
    dict(slug="fiscal", serie="O que fazemos", ativos=[0, 1, 2, 3],
         gancho="Seu imposto, apurado *com precisão*.",
         capa_sub="Simples Nacional, Lucro Presumido, notas fiscais e todas as declarações para proteger o seu CNPJ.",
         degrau_titulo="Gestão tributária", degrau_texto="Especialistas em pequenas empresas, e-commerces e profissionais autônomos: cada regime com as suas regras e os seus prazos.",
         voce=["~Guia que chega atrasada~", "~Declaração esquecida~", "~Dúvida sobre o valor~"],
         gente=["Apuração exata", "Declarações no prazo", "CNPJ protegido"],
         servicos=[("Apuração de impostos", "Simples Nacional e Lucro Presumido"), ("Fator R", "Redução para 6% em serviços, quando se aplica"),
                   ("Notas fiscais, ICMS e ST", "Comércio e e-commerce legalizados"), ("Obrigações acessórias", "DEFIS e demais declarações"),
                   ("Planejamento tributário", "Pagar o justo, dentro da lei")],
         dor=True, rotulos=("Sem a gente", "Com a gente"),
         cta="Imposto em dia e *sem susto*.", tags="#Impostos #GestaoTributaria #NotaFiscal"),
    dict(slug="departamento-pessoal", serie="O que fazemos", ativos=[1, 2, 3],
         gancho="Contratou? A *burocracia* fica com a gente.",
         capa_sub="Admissão, holerites, férias, 13º, guias de INSS e FGTS e o eSocial, tudo em dia.",
         degrau_titulo="A equipe cresce", degrau_texto="A partir do primeiro funcionário, a folha vira rotina. A gente assume a parte burocrática para você cuidar das pessoas.",
         voce=["Escolher quem contratar", "Liderar o time", "Reconhecer quem faz bem"],
         gente=["Admissão e rescisão", "Holerites, férias e 13º", "INSS, FGTS e eSocial"],
         servicos=[("Folha de pagamento", "Holerites todo mês"), ("Admissão e rescisão", "Do primeiro ao último dia"),
                   ("Férias e 13º", "Calculados e no prazo"), ("Guias de INSS e FGTS", "Geradas em dia"),
                   ("Transmissão ao eSocial", "Sem pendência no governo")],
         cta="Sua equipe cresce, *a burocracia não*.", tags="#DepartamentoPessoal #FolhaDePagamento #eSocial"),
    dict(slug="contabil", serie="O que fazemos", ativos=[1, 2, 3],
         gancho="Balanço e DRE *que você entende*.",
         capa_sub="A contabilidade que mostra onde a empresa está, não só a que cumpre tabela.",
         degrau_titulo="Os números da empresa", degrau_texto="Plano de contas organizado, conciliação bancária e demonstrativos que servem para decidir, não só para guardar na gaveta.",
         voce=["~Números que não batem~", "~Relatório que ninguém lê~", "~Extrato sem conciliação~"],
         gente=["Plano de contas organizado", "Conciliação bancária", "Balanço e DRE claros"],
         servicos=[("Balanço patrimonial", "A foto da empresa"), ("DRE", "Receitas, custos e resultado"),
                   ("Plano de contas e centros de custo", "Cada gasto no lugar certo"), ("Conciliação bancária", "O extrato batendo com a contabilidade")],
         dor=True, rotulos=("Sem a gente", "Com a gente"),
         cta="Quer entender *os seus números*?", tags="#Balanco #DRE #ContabilidadeConsultiva"),
    dict(slug="consultivo", serie="O que fazemos", ativos=[2, 3],
         gancho="Seu contador te mostra *onde está o lucro*?",
         capa_sub="Controladoria externa, BPO financeiro e painéis em Power BI para quem quer gerir com dados.",
         degrau_titulo="Além da contabilidade", degrau_texto="A Cerrado é uma consultoria completa: cliente da contabilidade tem condição especial para BPO financeiro e painéis de BI.",
         voce=["Decidir para onde ir", "Negociar", "Investir"],
         gente=["Controladoria e DRE gerencial", "BPO financeiro", "Painéis em Power BI"],
         servicos=[("Controladoria externa", "DRE gerencial, orçamento e indicadores"), ("BPO financeiro", "Conciliações e rotina financeira"),
                   ("Dashboards em Power BI", "DRE, EBITDA e metas no celular"), ("Integração com o seu ERP", "SAP®, TOTVS, ContaAzul e Bling"),
                   ("Planejamento tributário", "Estratégia, não só apuração")],
         cta="Decisão baseada *em dados*.", tags="#Controladoria #BPOFinanceiro #PowerBI"),
    dict(slug="troca-de-contador", serie="O que fazemos", ativos=[0, 1, 2, 3],
         gancho="Insatisfeito com o ~contador atual~?",
         capa_sub="Fazemos toda a migração de forma transparente e digital, com o seu CNPJ protegido.",
         degrau_titulo="Troca sem dor de cabeça", degrau_texto="Você acompanha cada etapa da transição e as obrigações seguem em dia durante toda a troca.",
         voce=["~Resposta que demora~", "~Guia errada~", "~Só aparece para cobrar~"],
         gente=["Atendimento no WhatsApp", "Apuração conferida", "Dados para decidir"],
         servicos=[("Transparente", "Você acompanha cada etapa da transição"), ("100% digital", "Sem papelada e sem precisar sair de casa"),
                   ("CNPJ protegido", "Obrigações em dia durante toda a troca"), ("Diagnóstico da sua contabilidade", "Para começar sabendo onde está")],
         dor=True, rotulos=("Hoje", "Com a gente"),
         cta="Troque de contador *sem dor de cabeça*.", tags="#TrocarDeContador #MigracaoContabil"),
]


def marcar(texto):
    """*x* = destaque verde; ~x~ = vermelho; resto escapado."""
    out = escape(texto)
    out = re.sub(r"\*([^*]+)\*", r'<span class="marca-verde">\1</span>', out)
    return re.sub(r"~([^~]+)~", r'<span class="vermelho">\1</span>', out)


def plano(texto):
    return texto.replace("*", "").replace("~", "")


def inseparavel(texto):
    return re.sub(r"(?<=\w)-(?=\w)", "‑", texto)


def datas_sugeridas(n, inicio=date(2026, 11, 3)):
    """Terças e quintas (a série da Cerrado Tech sai segunda, quarta e sexta)."""
    dias, d = [], inicio
    while len(dias) < n:
        if d.weekday() in (1, 3):
            dias.append(d)
        d += timedelta(days=1)
    return dias


CAB = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="entrega" content="{entrega}">
  <meta name="formato" content="{formato}">
  <title>{titulo}</title>
  <link rel="stylesheet" href="../../brand/contabilidade/marca.css">
</head>
<body>
"""
FIM = """  <script src="../../brand/slides.js"></script>
</body>
</html>
"""


def rodape(primeiro=False):
    direita = "<span>arraste →</span>" if primeiro else "<span data-pagina></span>"
    return f"""    <div class="rodape">
      <span class="marca"><img src="{FOLHA}" alt=""> Cerrado Contabilidade</span>
      {direita}
    </div>"""


def slide(miolo, classe="", primeiro=False):
    return f'  <section class="slide {classe}">\n{miolo}\n{rodape(primeiro)}\n  </section>\n'


def escada(ativos, grande=False):
    degraus = "".join(
        f'<div class="degrau{" ativo" if i in ativos else ""}"><b>{escape(s)}</b><small>{escape(n)}</small></div>'
        for i, (s, n) in enumerate(DEGRAUS))
    return f'<div class="escada{" grande" if grande else ""}">{degraus}</div>'


def carrossel(c, entrega):
    s = []
    s.append(slide(f"""    <p class="rotulo">Cerrado Contabilidade · {escape(c['serie'])}</p>
    <h1 class="mega">{marcar(c['gancho'])}</h1>
    <p class="sub" style="margin: 40px 0 0">{escape(c['capa_sub'])}</p>
    <div style="margin-top: auto; margin-bottom: 190px">{escada(c['ativos'])}</div>""", primeiro=True))

    esq, dir_ = c.get("rotulos", ("Você cuida de", "A gente cuida de"))
    lista = lambda itens: "".join(f"<li>{marcar(inseparavel(i))}</li>" for i in itens)
    s.append(slide(f"""    <p class="rotulo">Partida dobrada</p>
    <h2 class="titulo">Cada um cuida <span class="marca-verde">do que sabe</span>.</h2>
    <div class="razonete-topo"><span>{escape(esq)}</span><span>{escape(dir_)}</span></div>
    <div class="razonete{' dor' if c.get('dor') else ''}" style="margin-bottom: 40px">
      <div class="col"><ul>{lista(c['voce'])}</ul></div>
      <div class="col"><ul>{lista(c['gente'])}</ul></div>
    </div>
    <p class="saldo"><b>SALDO</b><span>Você no seu negócio, e a burocracia <span class="marca-verde">com a gente</span>.</span></p>""", ""))

    compacta = " compacta" if len(c["servicos"]) > 4 else ""
    itens = "\n".join(
        f'      <li><span>{escape(inseparavel(t))}<small>{escape(inseparavel(d))}</small></span><span class="ok">em dia</span></li>'
        for t, d in c["servicos"])
    s.append(slide(f"""    <p class="rotulo">O que fazemos</p>
    <h2 class="titulo">No livro, <span class="marca-verde">tudo lançado</span>.</h2>
    <ul class="lancamentos{compacta}">
{itens}
    </ul>""", ""))

    s.append(slide(f"""    <p class="rotulo">A escada do crescimento</p>
    <h2 class="titulo">{escape(c['degrau_titulo'])}</h2>
    <p class="sub" style="color: var(--tinta); margin-bottom: 60px">{escape(c['degrau_texto'])}</p>
    <div style="margin-top: auto; margin-bottom: 190px">{escada(c['ativos'], grande=True)}</div>""", ""))

    itens = "\n".join(
        f'      <li><span>{escape(t)}<small>{escape(d)}</small></span><span class="ok">✓</span></li>'
        for t, d in COMO_FUNCIONA)
    s.append(slide(f"""    <p class="rotulo">Como funciona</p>
    <h2 class="titulo">Contabilidade de <span class="marca-verde">gente para gente</span>.</h2>
    <ul class="lancamentos">
{itens}
    </ul>""", "tinta"))

    s.append(slide(f"""    <span class="carimbo">EM DIA</span>
    <h2 class="mega" style="font-size: 120px">{marcar(c['cta'])}</h2>
    <div class="contatos">
      <span class="contato principal">{LINK}</span>
      <span class="contato">WhatsApp {WHATS}</span>
    </div>
    <div style="margin-top: auto; margin-bottom: 180px">
      <p class="letra-miuda" style="margin-bottom: 18px">Atendemos MEI, Simples Nacional e Lucro Presumido, da micro à média empresa.</p>
      {escada(c['ativos'])}
    </div>""", ""))

    cab = CAB.format(entrega=entrega, formato="1080x1350", titulo=f"Carrossel: Contabilidade, {escape(plano(c['gancho']))}")
    return cab + "\n".join(s) + FIM


def story(c, entrega):
    itens = "\n".join(
        f'      <li><span>{escape(inseparavel(t))}</span><span class="ok">em dia</span></li>' for t, _ in c["servicos"][:3])
    cab = CAB.format(entrega=entrega, formato="1080x1920", titulo=f"Story: Contabilidade, {escape(plano(c['gancho']))}")
    return cab + f"""  <!-- área segura: ~250px livres no topo e na base -->
  <section class="slide story">
    <p class="rotulo">Cerrado Contabilidade</p>
    <h1 class="mega" style="font-size: 104px">{marcar(c['gancho'])}</h1>
    <div style="margin: 56px 0">{escada(c['ativos'])}</div>
    <ul class="lancamentos compacta">
{itens}
    </ul>
    <span class="contato principal" style="margin-top: auto">{LINK}</span>
  </section>
""" + FIM


def legendas(c):
    servicos = "\n".join(f"✅ {t}: {d[0].lower() + d[1:] if not d[:2].isupper() else d}" for t, d in c["servicos"])
    perfis = " → ".join(DEGRAUS[i][1] for i in c["ativos"]) if len(c["ativos"]) < 4 else "MEI, microempresa, pequena empresa e Lucro Presumido"
    ig = f"""{plano(c['gancho'])}

{c['capa_sub']}

{c['degrau_texto']}

O que a Cerrado Contabilidade faz:
{servicos}

Atendemos {perfis}. 100% digital, com suporte humano direto no WhatsApp. E se você quer trocar de contador, a migração é transparente e acompanhada.

{plano(c['cta'])} Fale com a gente: WhatsApp {WHATS}
🔗 {LINK}

{c['tags']} {TAGS_BASE}
"""
    li = f"""{plano(c['gancho'])}

{c['capa_sub']} {c['degrau_texto']}

Na prática, a Cerrado Contabilidade entrega:
{servicos}

Atendemos MEI, empresas do Simples Nacional e do Lucro Presumido, da microempresa à média empresa, com atendimento 100% digital e humano.

{plano(c['cta'])} {LINK}
"""
    return ig, li


def main():
    datas = datas_sugeridas(len(SERIE))
    for n, (c, d) in enumerate(zip(SERIE, datas), start=1):
        entrega = PREFIXO + c["slug"]
        post, ent = RAIZ / "posts" / entrega, RAIZ / "entregas" / entrega
        post.mkdir(parents=True, exist_ok=True)
        ent.mkdir(parents=True, exist_ok=True)
        (post / "carrossel.html").write_text(carrossel(c, entrega), encoding="utf-8")
        (post / "story.html").write_text(story(c, entrega), encoding="utf-8")
        ig, li = legendas(c)
        (ent / "legenda-instagram.txt").write_text(ig, encoding="utf-8")
        (ent / "legenda-linkedin.txt").write_text(li, encoding="utf-8")
        info = {
            "titulo": f"Contabilidade · {plano(c['gancho'])}",
            "data": d.isoformat(),
            "descricao": f"Série da Cerrado Contabilidade, \"{c['serie']}\" ({n} de {len(SERIE)}). Identidade própria \"Partida dobrada\".",
            "orientacoes": [
                f"Postar em {d.strftime('%d/%m')} (sugestão: a série sai terça e quinta; a da Cerrado Tech, segunda, quarta e sexta).",
                "Carrossel: postar os 6 PNGs na ordem (carrossel-01 a 06) no Instagram e no LinkedIn.",
                "Carrossel animado (carrossel-animado.mp4, 1080×1350, com som): os mesmos slides em vídeo, para Reels e feed.",
                f"Story: adicionar o sticker de link para https://www.{LINK}",
                "Antes de postar: confirmar com o responsável técnico (nome e CRC) se a peça deve levar o registro, conforme o código de ética do CFC.",
                "Legendas prontas abaixo, uma para cada rede.",
            ],
        }
        (ent / "info.json").write_text(json.dumps(info, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"{n:2d}. {d.strftime('%d/%m')}  {entrega}")


if __name__ == "__main__":
    main()
