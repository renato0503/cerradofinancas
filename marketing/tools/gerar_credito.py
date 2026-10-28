"""Gera a série do Crédito produto a produto e a série educativa "Antes de assinar, entenda".

Identidade "Antes de assinar" (brand/credito/marca.css): papel, azul-caneta, marca-texto, comparativo de propostas
sem números, linha de assinatura "Você decide" e o aviso legal como letra miúda.

Fonte única do conteúdo: o portfólio da LS Intermediação Financeira (PortfolioParceriaLS/) e a página credito.html.
Regras (HISTORICO.md, regra 3): aviso legal de correspondente bancário em toda peça; nada de "aprovado", "sem
consulta" ou "dinheiro fácil"; sem taxa nem parcela; os únicos números são os do portfólio da LS ("mais de 30
seguradoras" e "mais de 20 bancos" no consignado); sem logos nem nomes de bancos; sem cidade (a decidir).

Uso:
    python tools/gerar_credito.py
"""
import json
import re
from datetime import date, timedelta
from html import escape
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
WHATS = "(67) 99351-5206"
LINK = "cerradofinancas.com.br/credito"
FOLHA = "../../../img/folinha-hero.png"
LS = "../../../img/ls-logo.png"
AVISO = ("Cerrado Finanças, em parceria com a LS Intermediação Financeira, atua como correspondente bancário e não é "
         "instituição financeira. Crédito sujeito a análise e aprovação. Taxas e condições variam conforme o perfil e a instituição.")
AVISO_SEGURO = ("Cerrado Finanças, em parceria com a LS Intermediação Financeira, faz a intermediação e não é seguradora nem "
                "operadora. Contratação sujeita a análise de risco e aceitação. Valores conforme cotação.")
AVISO_CONSORCIO = ("Cerrado Finanças, em parceria com a LS Intermediação Financeira, faz a intermediação e não é administradora "
                   "de consórcio. Cartas sujeitas à disponibilidade; valores sujeitos a alteração.")
TAGS_BASE = "#CerradoFinancas #Credito #CorrespondenteBancario #LSIntermediacao"

PROPOSTA = ("Proposta", "Custo total")

# *x* = grifo de marca-texto
PRODUTOS = [
    dict(slug="consignado-servidor", rotulo="Consignado do servidor",
         gancho="Servidor, o seu consignado *cabe melhor* em outro banco?",
         capa_sub="Parcela descontada direto na folha. A gente compara as propostas de mais de 20 bancos e financeiras.",
         publico=[("Prefeitura de Campo Grande", "Servidores municipais"), ("Governo de Mato Grosso do Sul", "Servidores estaduais"),
                  ("SIAPE", "Servidores federais"), ("Forças Armadas", "Militares")],
         modal_titulo="Três jeitos de *usar*",
         modal=[("Contrato novo", "Crédito com parcela descontada em folha"), ("Refinanciamento", "Reorganize o contrato que você já tem"),
                ("Portabilidade", "Leve a dívida para um banco com condição melhor")],
         confira=[("O CET", "O custo total, não só a taxa de juros"), ("A sua margem", "Quanto da folha ainda fica livre"),
                  ("O prazo", "Parcela menor nem sempre sai mais barato")],
         cta="Simule o seu *consignado*.", msg="Olá! Sou servidor e gostaria de simular um consignado.",
         tags="#Consignado #ServidorPublico #SIAPE #CampoGrande #MatoGrossoDoSul"),
    dict(slug="consignado-clt", rotulo="Consignado CLT",
         gancho="Carteira assinada também tem *consignado*.",
         capa_sub="A parcela sai direto do salário, e a gente compara as propostas antes de você assinar.",
         publico=[("Trabalhador CLT", "Com carteira assinada"), ("Empresa privada", "Desconto direto na folha"),
                  ("Quem tem dívida cara", "Como cartão e cheque especial")],
         modal_titulo="Três jeitos de *usar*",
         modal=[("Contrato novo", "Crédito com parcela descontada do salário"), ("Refinanciamento", "Reorganize o contrato que você já tem"),
                ("Portabilidade", "Leve a dívida para um banco com condição melhor")],
         confira=[("O CET", "O custo total, não só a taxa de juros"), ("Quanto cabe no salário", "A parcela com folga no mês"),
                  ("Se mudar de emprego", "Pergunte o que acontece com o contrato")],
         cta="Simule o seu *consignado CLT*.", msg="Olá! Tenho carteira assinada e gostaria de simular um consignado.",
         tags="#ConsignadoCLT #CarteiraAssinada #Consignado"),
    dict(slug="portabilidade", rotulo="Portabilidade e refinanciamento",
         gancho="A sua parcela pode *mudar de banco*.",
         capa_sub="Já tem consignado? A gente procura um banco com condição melhor para levar o seu contrato.",
         publico=[("Servidor", "Municipal, estadual, federal e militar"), ("Trabalhador CLT", "Com consignado em folha"),
                  ("Quem paga há tempo", "E quer rever o contrato")],
         modal_titulo="Ficar, trocar ou *refinanciar*",
         modal=[("Portabilidade", "O contrato vai para outro banco"), ("Refinanciamento", "Novo prazo ou novo valor no mesmo contrato"),
                ("Lado a lado", "As três opções comparadas antes da decisão")],
         confira=[("O saldo devedor", "Quanto falta pagar hoje"), ("O novo CET", "Se o custo total cai de verdade"),
                  ("O novo prazo", "Prazo maior pode custar mais no fim")],
         cta="Compare o *seu contrato*.", msg="Olá! Já tenho consignado e gostaria de comparar portabilidade ou refinanciamento.",
         tags="#Portabilidade #Refinanciamento #Consignado"),
    dict(slug="emprestimo-pessoal", rotulo="Empréstimo pessoal",
         gancho="Antes do primeiro *sim*, compare.",
         capa_sub="Empréstimo pessoal para correntista, beneficiário do INSS e servidor público, com as propostas lado a lado.",
         publico=[("Correntista", "De banco"), ("Beneficiário do INSS", "Aposentado ou pensionista"),
                  ("Servidor público", "Municipal, estadual e federal")],
         modal_titulo="Para que *serve*",
         modal=[("Organizar as contas", "Juntar dívidas numa parcela só"), ("Um projeto", "Reforma, curso ou viagem"),
                ("Um imprevisto", "Sem fila de banco")],
         confira=[("O CET", "O custo total, não só a taxa de juros"), ("A parcela no orçamento", "Com folga para o resto do mês"),
                  ("Seguro embutido", "Só se você pediu")],
         cta="Simule o seu *empréstimo*.", msg="Olá! Gostaria de simular um empréstimo pessoal.",
         tags="#EmprestimoPessoal #Emprestimo #INSS"),
    dict(slug="fgts", rotulo="Antecipação do FGTS",
         gancho="O seu FGTS pode virar *dinheiro agora*.",
         capa_sub="Para quem optou pelo saque-aniversário: antecipe os saques dos próximos anos, sem parcela no seu orçamento.",
         publico=[("Optante do saque-aniversário", "Com saldo no FGTS"), ("Contas ativas e inativas", "Todo o saldo conta"),
                  ("Quem quer evitar parcela", "O pagamento sai do próprio FGTS")],
         modal_titulo="Como *funciona*",
         modal=[("Você antecipa", "Os saques-aniversário dos próximos anos"), ("Sem parcela mensal", "O banco recebe direto do FGTS, uma vez por ano"),
                ("Dinheiro na conta", "Depois da aprovação do banco")],
         confira=[("O que você abre mão", "No saque-aniversário, a demissão não libera o saldo"), ("O CET", "A antecipação também tem juros"),
                  ("Quantos anos antecipar", "Menos anos, menos custo")],
         cta="Simule a *antecipação*.", msg="Olá! Sou optante do saque-aniversário e gostaria de simular a antecipação do FGTS.",
         tags="#FGTS #SaqueAniversario #AntecipacaoFGTS"),
    dict(slug="credito-com-garantia", rotulo="Crédito com garantia",
         gancho="Imóvel ou carro quitado pode *baixar o custo* do crédito.",
         capa_sub="O bem fica como garantia e continua com você. Com garantia, o banco costuma oferecer condição melhor.",
         publico=[("Imóvel", "Em seu nome e quitado"), ("Veículo", "Em seu nome e quitado"),
                  ("Pessoa física ou empresa", "Para um projeto, capital de giro ou dívidas")],
         modal_titulo="Por que pode *sair mais barato*",
         modal=[("Menos risco para o banco", "A garantia reduz o risco da operação"), ("Prazo maior", "Parcela que cabe no mês"),
                ("Você continua usando", "O imóvel ou o carro segue com você")],
         confira=[("O risco", "Sem pagar, a garantia pode ser executada"), ("O CET", "Avaliação e registro entram no custo"),
                  ("A finalidade", "Crédito mais barato também pede plano")],
         cta="Simule o crédito *com garantia*.", msg="Olá! Gostaria de simular um crédito com garantia de imóvel ou veículo.",
         tags="#CreditoComGarantia #HomeEquity #CapitalDeGiro"),
    dict(slug="financiamento-imovel", rotulo="Financiamento de imóvel",
         gancho="Da cidade à fazenda: *compare* antes de financiar.",
         capa_sub="Casa, apartamento, chácara, fazenda ou terreno. A gente leva o seu projeto a vários bancos.",
         publico=[("Casa e apartamento", "Para morar ou investir"), ("Chácara e fazenda", "Imóvel rural"),
                  ("Terreno", "Para construir depois")],
         modal_titulo="O que a gente *compara*",
         modal=[("Taxa e CET", "O custo total do financiamento"), ("Entrada e prazo", "O que cabe no seu planejamento"),
                ("Amortização", "Como a parcela muda ao longo do tempo")],
         confira=[("O custo total", "Seguros e tarifas entram na conta"), ("A entrada", "Quanto você precisa ter"),
                  ("A documentação", "A do imóvel e a sua, em ordem")],
         cta="Simule o seu *financiamento*.", msg="Olá! Gostaria de simular um financiamento de imóvel.",
         tags="#FinanciamentoImobiliario #CasaPropria #ImovelRural"),
    dict(slug="financiamento-veiculo", rotulo="Financiamento de veículo",
         gancho="Carro novo? A taxa *também se compara*.",
         capa_sub="Carro, moto ou caminhão: as propostas de vários bancos antes de você fechar na loja.",
         publico=[("Carro", "Novo ou seminovo"), ("Moto", "Para o dia a dia ou o trabalho"),
                  ("Caminhão", "Para quem vive da estrada")],
         modal_titulo="O que a gente *compara*",
         modal=[("Taxa e CET", "O custo total do financiamento"), ("Entrada e prazo", "O que cabe no seu mês"),
                ("A proposta da loja", "Comparada com as outras")],
         confira=[("O CET", "Tarifas e seguros embutidos"), ("A entrada", "Quanto mais, menos juros"),
                  ("O valor final", "Quanto o veículo custa no fim")],
         cta="Compare *antes de fechar*.", msg="Olá! Gostaria de simular um financiamento de veículo.",
         tags="#FinanciamentoDeVeiculo #CarroNovo #Caminhao"),
    dict(slug="consorcio", rotulo="Consórcio", tipo="consorcio",
         gancho="Planejar a compra *sem juros* de financiamento.",
         capa_sub="Imóvel, carro, moto, caminhão ou máquina: no consórcio, você paga a taxa de administração, não juros.",
         publico=[("Imóvel", "Casa, apartamento, construção e reforma"), ("Auto", "Carro e moto"),
                  ("Pesados", "Caminhão, máquinas e equipamentos")],
         modal_titulo="Como *funciona*",
         modal=[("Parcela mensal", "Você entra num grupo"), ("Contemplação", "Por sorteio ou por lance"),
                ("Carta de crédito", "Para comprar o bem à vista")],
         confira=[("A taxa de administração", "É o custo do consórcio"), ("O prazo", "Não há data certa para ser contemplado"),
                  ("O reajuste", "A carta e a parcela podem ser corrigidas")],
         cta="Simule o seu *consórcio*.", msg="Olá! Gostaria de simular um consórcio.",
         tags="#Consorcio #ConsorcioImobiliario #ConsorcioDeVeiculos"),
    dict(slug="consorcio-servicos", rotulo="Consórcio de serviços e energia solar", tipo="consorcio",
         gancho="Lente dental e energia solar também têm *consórcio*.",
         capa_sub="Estética, odontologia, móveis planejados e energia solar, planejados sem juros de financiamento.",
         publico=[("Estética e harmonização", "Inclusive cirurgia plástica"), ("Odontologia", "Lentes de contato dentais e implantes"),
                  ("Móveis planejados", "Para a casa nova"), ("Energia solar", "Em casa ou na empresa")],
         modal_titulo="Como *funciona*",
         modal=[("Parcela mensal", "Você entra num grupo"), ("Contemplação", "Por sorteio ou por lance"),
                ("Carta de crédito", "Para pagar o serviço à vista")],
         confira=[("A taxa de administração", "É o custo do consórcio"), ("O prazo", "Não há data certa para ser contemplado"),
                  ("O que a carta cobre", "Confira antes com o profissional")],
         cta="O sonho *planejado*.", msg="Olá! Gostaria de simular um consórcio de serviços ou de energia solar.",
         tags="#ConsorcioDeServicos #EnergiaSolar #LentesDeContatoDental"),
    dict(slug="seguros-e-saude", rotulo="Seguros e planos de saúde", tipo="seguro",
         gancho="Mais de 30 seguradoras *numa cotação só*.",
         capa_sub="Seguro auto, residencial, vida e fiança, e plano de saúde e odontológico para você ou para a sua empresa.",
         publico=[("Auto", "Carro, moto, caminhão e frota"), ("Residencial e fiança", "Para quem mora e para quem aluga"),
                  ("Vida", "Para proteger a família"), ("Saúde e odonto", "Para você ou para a empresa, individual ou coletivo")],
         modal_titulo="Para a sua *empresa*",
         modal=[("Seguro de frota", "Para os veículos da empresa"), ("Plano de saúde coletivo", "Benefício para a equipe"),
                ("Seguro fiança", "Para o aluguel do ponto")],
         confira=[("A cobertura", "O que está e o que não está incluído"), ("A franquia", "Quanto você paga num sinistro"),
                  ("A carência", "Quando o plano começa a valer")],
         cta="Cote o seu *seguro*.", msg="Olá! Gostaria de cotar um seguro ou plano de saúde.",
         tags="#Seguros #PlanoDeSaude #SeguroAuto #PlanoOdontologico"),
]

ENTENDA = [
    dict(slug="cet", pergunta="A taxa de juros *não é* o custo do empréstimo.",
         capa_sub="O número que importa se chama CET, o Custo Efetivo Total.",
         conceito="O CET soma tudo o que você paga no contrato: juros, tarifas, impostos como o IOF, seguros e outros encargos. Pelas regras do Banco Central, ele precisa ser informado antes da contratação.",
         itens_titulo="O que entra *no CET*",
         itens=[("Juros", "O preço do dinheiro"), ("Tarifas", "De cadastro e de serviços"), ("IOF", "O imposto sobre a operação"),
                ("Seguros", "Quando fazem parte do contrato")],
         confira=[("Peça o CET por escrito", "Antes de assinar"), ("Compare CET com CET", "Não taxa com taxa"),
                  ("Olhe o valor total", "Quanto você paga no fim")],
         cta="Compare o *custo total*.", tags="#CET #EducacaoFinanceira #Emprestimo"),
    dict(slug="portabilidade", pergunta="Portabilidade é *um direito seu*.",
         capa_sub="Você pode levar o seu empréstimo para outro banco com condição melhor.",
         conceito="Pelas regras do Banco Central, você pode transferir a dívida para outra instituição. O banco de origem não pode impedir a transferência, mas pode fazer uma contraproposta.",
         itens_titulo="Como *funciona*",
         itens=[("Você pede a proposta", "Num banco com condição melhor"), ("O novo banco quita", "A dívida no banco antigo"),
                ("Você segue pagando", "Agora no novo contrato")],
         confira=[("O novo CET", "Precisa ser menor de verdade"), ("O prazo", "Não aumentar sem perceber"),
                  ("A contraproposta", "Compare também a do seu banco")],
         cta="Veja se *vale trocar*.", tags="#Portabilidade #EducacaoFinanceira #Consignado"),
    dict(slug="consorcio-ou-financiamento", pergunta="Consórcio ou financiamento: *qual faz sentido*?",
         capa_sub="Os dois ajudam a comprar um bem, mas funcionam de jeitos muito diferentes.",
         conceito="No financiamento, você recebe o bem agora e paga juros. No consórcio, você paga a taxa de administração e recebe a carta de crédito quando é contemplado, por sorteio ou por lance.",
         itens_titulo="A pergunta *certa*",
         itens=[("Precisa agora?", "O financiamento entrega já"), ("Pode esperar?", "O consórcio não cobra juros"),
                ("Tem um lance?", "Ele pode antecipar a contemplação")],
         confira=[("O custo total", "Juros ou taxa de administração"), ("O seu prazo", "Quando você precisa do bem"),
                  ("O reajuste", "Como a parcela é corrigida")],
         cta="Compare *os dois caminhos*.", tags="#Consorcio #Financiamento #EducacaoFinanceira"),
    dict(slug="margem-consignavel", pergunta="Margem consignável: *usar tudo* é o erro.",
         capa_sub="É o limite do salário ou do benefício que pode ir para parcelas de consignado.",
         conceito="A margem consignável é a parte da renda que pode ser comprometida com parcelas descontadas em folha. O limite é definido por lei e pelo convênio de cada órgão ou empresa.",
         itens_titulo="Onde *olhar*",
         itens=[("O contracheque", "Mostra a margem disponível"), ("O convênio", "Cada órgão tem a sua regra"),
                ("A margem livre", "É folga para imprevistos")],
         confira=[("Quanto sobra", "Depois da parcela"), ("Outros descontos", "Que já estão na folha"),
                  ("O CET", "Mesmo no consignado, compare")],
         cta="Use a margem *com folga*.", tags="#MargemConsignavel #Consignado #EducacaoFinanceira"),
]

PASSOS = [("Conversa inicial", "Quanto você precisa e quanto cabe no orçamento"),
          ("Simulação em vários bancos", "Comparamos taxa, prazo e custo total"),
          ("Você escolhe", "Opções claras, a decisão é sua, sem pressão"),
          ("Contratação acompanhada", "Cuidamos da documentação até a liberação")]


def grifar(texto):
    return re.sub(r"\*([^*]+)\*", r'<span class="grifo">\1</span>', escape(texto))


def azul(texto):
    return re.sub(r"\*([^*]+)\*", r'<span class="azul">\1</span>', escape(texto))


def plano(texto):
    return texto.replace("*", "")


def inseparavel(texto):
    return re.sub(r"(?<=\w)-(?=\w)", "‑", texto)


def datas(n, dias, inicio):
    out, d = [], inicio
    while len(out) < n:
        if d.weekday() in dias:
            out.append(d)
        d += timedelta(days=1)
    return out


CAB = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="entrega" content="{entrega}">
  <meta name="formato" content="{formato}">
  <title>{titulo}</title>
  <link rel="stylesheet" href="../../brand/credito/marca.css">
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
      <span class="marca"><img src="{FOLHA}" alt=""> Cerrado Finanças <small>Crédito</small></span>
      {direita}
    </div>"""


def slide(miolo, classe="", primeiro=False):
    return f'  <section class="slide {classe}">\n{miolo}\n{rodape(primeiro)}\n  </section>\n'


def pauta(itens):
    return "\n".join(f"      <li><b>{escape(inseparavel(b))}</b><span>{escape(inseparavel(s))}</span></li>" for b, s in itens)


def clausulas(itens, rotulo="§"):
    return "\n".join(
        f'      <div class="c"><span class="n">{rotulo} {i}</span><div><b>{escape(inseparavel(b))}</b><span>{escape(inseparavel(s))}</span></div></div>'
        for i, (b, s) in enumerate(itens, start=1))


def assinatura(legenda="assinatura do contratante", estilo=""):
    return f"""    <div class="assinatura"{f' style="{estilo}"' if estilo else ''}>
      <span class="x">X</span>
      <div class="traco"><span class="rubrica">Você decide</span><span class="legenda">{legenda}</span></div>
    </div>"""


def aviso(c):
    return {"seguro": AVISO_SEGURO, "consorcio": AVISO_CONSORCIO}.get(c.get("tipo"), AVISO)


def comparativo(c):
    tipo = c.get("tipo")
    cab, nome, titulo = {
        "seguro": (("Seguradora", "Preço e cobertura"), "Seguradora", "Comparamos *preço e cobertura*, não só o preço."),
        "consorcio": (("Administradora", "Taxa de administração"), "Administradora", "Comparamos as *cartas* de várias administradoras."),
    }.get(tipo, (PROPOSTA, "Banco", "Comparamos o *custo total*, não só a parcela."))
    larguras = [100, 62, 84, 92]
    linhas = "\n".join(
        f'      <div class="linha{" melhor" if i == 1 else ""}"><span>{nome} {i + 1}'
        f'{" <span class=\"selo-escolha\">melhor opção</span>" if i == 1 else ""}</span><span class="barra" style="width: {w}%"></span></div>'
        for i, w in enumerate(larguras))
    return f"""    <p class="rotulo">Uma consulta, várias propostas</p>
    <h2 class="titulo">{azul(titulo)}</h2>
    <div class="comparativo">
      <div class="cab"><span>{cab[0]}</span><span>{cab[1]}</span></div>
{linhas}
    </div>
    <p class="letra-miuda" style="margin-top: 40px">Ilustração. Condições variam conforme o perfil e a instituição.</p>"""


def parceria(estilo="margin-top: auto; margin-bottom: 170px"):
    return f"""    <div class="parceria" style="{estilo}">
      <img src="{LS}" alt="LS Intermediação Financeira">
      <p>Em parceria com<b>LS Intermediação Financeira</b></p>
    </div>"""


def cta_slide(c):
    return slide(f"""    <p class="rotulo">Simulação gratuita</p>
    <h2 class="mega" style="font-size: 116px">{grifar(c['cta'])}</h2>
    <div class="contatos">
      <span class="contato principal">WhatsApp {WHATS}</span>
      <span class="contato">{LINK}</span>
    </div>
{assinatura("sem pressão: a decisão é sua", "margin-top: 80px")}
    <p class="letra-miuda" style="margin-top: auto; margin-bottom: 170px">{escape(aviso(c))}</p>""")


def carrossel(c, entrega):
    s = [slide(f"""    <p class="rotulo">{escape(c['rotulo'])}</p>
    <h1 class="mega" style="font-size: {112 if len(plano(c['gancho'])) > 42 else 128}px">{grifar(c['gancho'])}</h1>
    <p class="sub" style="margin-top: 40px">{escape(inseparavel(c['capa_sub']))}</p>
{assinatura()}
{parceria()}""", primeiro=True)]
    s.append(slide(f"""    <p class="rotulo">Para quem é</p>
    <h2 class="titulo">Feito para <span class="azul">quem</span>?</h2>
    <ul class="pauta{' compacta' if len(c['publico']) > 3 else ''}">
{pauta(c['publico'])}
    </ul>
    <p class="fecho">Você fala com uma pessoa só. <span class="azul">A gente fala com os bancos.</span></p>"""))
    s.append(slide(f"""    <p class="rotulo">{escape(c['rotulo'])}</p>
    <h2 class="titulo">{azul(c['modal_titulo'])}</h2>
    <ul class="pauta">
{pauta(c['modal'])}
    </ul>"""))
    s.append(slide(comparativo(c)))
    s.append(slide(f"""    <p class="rotulo">Antes de assinar, confira</p>
    <h2 class="titulo">Três cláusulas que <span class="azul">valem ouro</span>.</h2>
    <div class="clausulas">
{clausulas(c['confira'])}
    </div>
    <p class="fecho">Na dúvida, pergunte: a gente explica <span class="azul">cada linha</span> do contrato.</p>""", "caneta"))
    s.append(cta_slide(c))
    return CAB.format(entrega=entrega, formato="1080x1350", titulo=f"Carrossel: Crédito, {escape(c['rotulo'])}") + "\n".join(s) + FIM


def story(c, entrega, rotulo):
    titulo = c.get("gancho") or c["pergunta"]
    return CAB.format(entrega=entrega, formato="1080x1920", titulo=f"Story: Crédito, {escape(plano(titulo))}") + f"""  <!-- área segura: ~250px livres no topo e na base -->
  <section class="slide story">
    <p class="rotulo">{escape(rotulo)}</p>
    <h1 class="mega" style="font-size: {100 if len(plano(titulo)) > 42 else 118}px">{grifar(titulo)}</h1>
    <p class="sub" style="margin-top: 40px">{escape(inseparavel(c['capa_sub']))}</p>
{assinatura()}
{parceria("margin-top: 110px")}
    <div class="contatos" style="margin-top: auto">
      <span class="contato principal">WhatsApp {WHATS}</span>
      <span class="letra-miuda">{escape(aviso(c))}</span>
    </div>
  </section>
""" + FIM


def carrossel_entenda(c, n, entrega):
    s = [slide(f"""    <p class="rotulo">Antes de assinar, entenda · Cláusula {n}</p>
    <h1 class="mega" style="font-size: {108 if len(plano(c['pergunta'])) > 38 else 124}px">{grifar(c['pergunta'])}</h1>
    <p class="sub" style="margin-top: 40px">{escape(c['capa_sub'])}</p>
{assinatura("leia antes de assinar")}""", primeiro=True)]
    s.append(slide(f"""    <p class="rotulo">Cláusula {n} · O que é</p>
    <h2 class="titulo">Em <span class="azul">bom português</span>.</h2>
    <p class="sub" style="color: var(--tinta); font-size: 48px; line-height: 1.3">{escape(inseparavel(c['conceito']))}</p>
    <div style="margin-top: auto; margin-bottom: 170px">
{assinatura("leia antes de assinar", "margin: 0 0 70px")}
      <p class="letra-miuda">Conteúdo informativo, com base nas regras vigentes em outubro de 2026.</p>
    </div>"""))
    s.append(slide(f"""    <p class="rotulo">Cláusula {n} · Na prática</p>
    <h2 class="titulo">{azul(c['itens_titulo'])}</h2>
    <ul class="pauta">
{pauta(c['itens'])}
    </ul>"""))
    s.append(slide(f"""    <p class="rotulo">Antes de assinar, confira</p>
    <h2 class="titulo">Três perguntas <span class="azul">para fazer</span>.</h2>
    <div class="clausulas">
{clausulas(c["confira"])}
    </div>
    <p class="fecho">Se a resposta não vier clara, <span class="azul">não assine ainda</span>.</p>""", "caneta"))
    s.append(slide(f"""    <p class="rotulo">Como a gente ajuda</p>
    <h2 class="titulo">Do primeiro contato <span class="azul">à assinatura</span></h2>
    <div class="clausulas">
{clausulas(PASSOS, "Passo")}
    </div>"""))
    s.append(cta_slide(c))
    return CAB.format(entrega=entrega, formato="1080x1350", titulo=f"Carrossel: Antes de assinar, entenda {n}") + "\n".join(s) + FIM


def legendas(c):
    publico = "\n".join(f"• {b}: {s[0].lower() + s[1:]}" for b, s in c["publico"])
    confira = "\n".join(f"✍️ {b}: {s[0].lower() + s[1:]}" for b, s in c["confira"])
    ig = f"""{plano(c['gancho'])}

{c['capa_sub']}

Para quem é:
{publico}

Antes de assinar, confira:
{confira}

Você fala com uma pessoa só, e a gente compara as propostas para você enxergar o custo total. A simulação é gratuita e sem compromisso. Você decide.

{plano(c['cta'])} WhatsApp {WHATS}
🔗 {LINK}

{aviso(c)}

{c['tags']} {TAGS_BASE}
"""
    li = f"""{plano(c['gancho'])}

{c['capa_sub']} Como também somos contabilidade e consultoria financeira, olhamos se a parcela cabe no caixa antes de você assinar.

Antes de assinar, confira:
{confira}

Simulação gratuita: {LINK}

{aviso(c)}
"""
    return ig, li


def legendas_entenda(c, n):
    itens = "\n".join(f"• {b}: {s[0].lower() + s[1:]}" for b, s in c["itens"])
    confira = "\n".join(f"✍️ {b}: {s[0].lower() + s[1:]}" for b, s in c["confira"])
    ig = f"""Antes de assinar, entenda. Cláusula {n}

{plano(c['pergunta'])}
{c['capa_sub']}

{c['conceito']}

{plano(c['itens_titulo'])}:
{itens}

Três perguntas para fazer:
{confira}

Conteúdo informativo, com base nas regras vigentes em outubro de 2026.
{plano(c['cta'])} Simulação gratuita: WhatsApp {WHATS}
🔗 {LINK}

{AVISO}

#AntesDeAssinar {c['tags']} {TAGS_BASE}
"""
    li = f"""Antes de assinar, entenda: {plano(c['pergunta'])}

{c['capa_sub']} {c['conceito']}

Três perguntas para fazer:
{confira}

{plano(c['cta'])} {LINK}

{AVISO}
"""
    return ig, li


def gravar(entrega, carrossel_html, story_html, ig, li, info):
    post, ent = RAIZ / "posts" / entrega, RAIZ / "entregas" / entrega
    post.mkdir(parents=True, exist_ok=True)
    ent.mkdir(parents=True, exist_ok=True)
    (post / "carrossel.html").write_text(carrossel_html, encoding="utf-8")
    (post / "story.html").write_text(story_html, encoding="utf-8")
    (ent / "legenda-instagram.txt").write_text(ig, encoding="utf-8")
    (ent / "legenda-linkedin.txt").write_text(li, encoding="utf-8")
    (ent / "info.json").write_text(json.dumps(info, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def orientacoes(d, extra):
    return [
        f"Postar em {d.strftime('%d/%m')} à noite no Instagram (sugestão: o Crédito sai terça e sexta).",
        "Carrossel: postar os 6 PNGs na ordem (carrossel-01 a 06) no Instagram e no LinkedIn.",
        "Carrossel animado (carrossel-animado.mp4, 1080×1350, com som): os mesmos slides em vídeo, para Reels e feed.",
        f"Story: adicionar o sticker de link para https://www.{LINK}",
        "O aviso legal precisa aparecer na legenda também (já está nas legendas prontas).",
        *extra,
        "Legendas prontas abaixo, uma para cada rede.",
    ]


def main():
    for n, (c, d) in enumerate(zip(PRODUTOS, datas(len(PRODUTOS), (1, 4), date(2026, 11, 3))), start=1):
        entrega = f"2026-11-credito-{c['slug']}"
        ig, li = legendas(c)
        info = {
            "titulo": f"Crédito · {c['rotulo']}",
            "data": d.isoformat(),
            "descricao": f"Série do Crédito produto a produto ({n} de {len(PRODUTOS)}), na identidade \"Antes de assinar\", com a LS Intermediação Financeira.",
            "orientacoes": orientacoes(d, []),
        }
        gravar(entrega, carrossel(c, entrega), story(c, entrega, c["rotulo"]), ig, li, info)
        print(f"{n:2d}. {d.strftime('%d/%m')}  {entrega}")

    for n, (c, d) in enumerate(zip(ENTENDA, datas(len(ENTENDA), (1, 4), date(2027, 1, 5))), start=1):
        entrega = f"2027-01-credito-entenda-{c['slug']}"
        ig, li = legendas_entenda(c, n)
        info = {
            "titulo": f"Antes de assinar, entenda {n} · {plano(c['pergunta'])}",
            "data": d.isoformat(),
            "descricao": f"Série educativa do Crédito, \"Antes de assinar, entenda\" ({n} de {len(ENTENDA)}).",
            "orientacoes": orientacoes(d, ["Conteúdo conferido com as regras em 28/10/2026; se algo mudar antes da data, revisar antes de postar."]),
        }
        gravar(entrega, carrossel_entenda(c, n, entrega), story(c, entrega, f"Antes de assinar, entenda · Cláusula {n}"), ig, li, info)
        print(f"E{n}. {d.strftime('%d/%m/%Y')}  {entrega}")


if __name__ == "__main__":
    main()
