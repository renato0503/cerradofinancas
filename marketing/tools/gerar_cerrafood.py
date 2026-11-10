"""Gera a série do CerraFood (plataforma white label para pizzaria da Cerrado Tech): apresentação + 10 campanhas.

Cada campanha: carrossel de 6 slides (1080×1350), story (1080×1920) e legendas de Instagram, LinkedIn e Facebook.
Identidade "Comanda" (brand/cerrafood/marca.css e README.md).

O que pode e o que não pode ser afirmado está no README da marca. Resumo: só funções que existem no código
(D:\\Dev\\NapoleFood); nenhum cliente, case, número de resultado, preço ou prazo de implantação. Nada de PIX ou cartão
"integrados" (o pagamento é registrado, não processado), NFC-e, iFood, WhatsApp automático, multi-loja, RH/ponto ou
rastreio por GPS. O nome do primeiro cliente não aparece (pedido do Renato em 10/11/2026).

Marcação no texto: *x* = destaque laranja (títulos), **x** = negrito.

Uso:
    python tools/gerar_cerrafood.py      # depois: exportar, verificar, animar-carrossel, agendar.py e publicar.py
"""
import json
import re
from html import escape
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
SIMBOLO = "../../brand/cerrafood/simbolo.png"
LINK = "cerradofinancas.com.br/cerrafood"
WHATS = "(67) 99351-5206"
WHATS_URL = "https://api.whatsapp.com/send?phone=5567993515206"
TAGS_BASE = "#CerraFood #SistemaParaPizzaria #Pizzaria #WhiteLabel #CerradoTech"
ILUSTRATIVO = "Exemplo ilustrativo"
WHITE_LABEL = ("O CerraFood é white label: a sua pizzaria recebe site, app, totem e painel com o seu nome, "
               "a sua logo e as suas cores.")


def cta(titulo="Veja o sistema *com a sua marca.*", nota="Demonstração gratuita, com o seu cardápio e a sua logo."):
    return ("cta", dict(titulo=titulo, nota=nota))


def frase(texto):
    return ("frase", dict(texto=texto))


COMANDA_TOTEM = dict(numero="#0042", canal="Totem", itens=[
    ("1x", "Pizza Grande", "1/2 Calabresa · 1/2 Quatro queijos", "Borda recheada"),
    ("1x", "Refrigerante 2 L", None, None),
], pe="Para viagem · enviado à cozinha")
COMANDA_CAIXA = dict(numero="#0043", canal="Caixa", itens=[
    ("2x", "Pizza Média Margherita", None, "Sem cebola"),
    ("1x", "Suco natural", None, None),
], pe="Pagamento: PIX · registrado")

CAMPANHAS = [
    # ---------------- Apresentação ----------------
    dict(pasta="2026-11-apresentacao-cerrafood", nome="Prazer, CerraFood", tags="#GestaoDePizzaria #Delivery",
         slides=[
             ("capa", dict(rotulo="Prazer, CerraFood", titulo="A pizzaria inteira *num sistema só.*",
                           sub="Do pedido no totem à pizza na porta. E com a **sua marca**, não a nossa.")),
             ("linhas", dict(rotulo="O problema", titulo="Pizzaria não para *para procurar papel.*", itens=[
                 "Pedido anotado à mão e **comanda que se perde**",
                 "Ingrediente que acaba **no meio do sábado**",
                 "Pizza vendida **sem saber quanto custou**"])),
             ("fluxo", dict(rotulo="Como funciona", titulo="Do pedido à porta, *sem anotar nada.*", estacoes=[
                 ("Totem ou caixa", "O cliente monta a pizza ou o caixa lança o pedido"),
                 ("Cozinha", "O pedido aparece na tela, com o tempo de espera"),
                 ("Estoque", "Os ingredientes saem do estoque sozinhos"),
                 ("Entrega", "O cliente acompanha cada etapa pelo link")])),
             ("aparelhos", dict(rotulo="White label", titulo="Tudo com *a sua marca.*",
                                sub="Site, app, totem e painel com o seu nome, a sua logo e as suas cores.")),
             ("linhas", dict(rotulo="No sistema", titulo="O que vem *junto*", itens=[
                 "**Totem e caixa**, com comanda impressa",
                 "**Tela da cozinha** no lugar do papel",
                 "**Ficha técnica** com o custo de cada pizza",
                 "**Estoque, entrega, fidelidade** e relatórios"])),
             cta(),
         ]),
    # ---------------- Série ----------------
    dict(pasta="2026-11-cerrafood-sua-marca", nome="White label", tags="#Marca #Branding #Delivery",
         slides=[
             ("capa", dict(rotulo="White label", titulo="O cliente vê *a sua pizzaria.* Não a gente.",
                           sub="O CerraFood sai inteiro com o seu nome: do site à comanda impressa.")),
             ("aparelhos", dict(rotulo="Uma plataforma, várias marcas", titulo="O mesmo sistema, *a cara de cada um.*",
                                sub="Cada pizzaria com a própria logo e as próprias cores.", selo=ILUSTRATIVO)),
             ("linhas", dict(rotulo="O que leva a sua marca", titulo="Sua marca *de ponta a ponta.*", itens=[
                 "**Site** de pedidos com o seu nome",
                 "**App** que o cliente instala pelo navegador, sem loja de aplicativos",
                 "**Totem** e **comanda impressa** com a sua identidade",
                 "**Painel** da equipe com a sua logo e as suas cores"])),
             ("linhas", dict(rotulo="Por que importa", titulo="O cliente é seu. *O cadastro também.*", itens=[
                 "Os **pedidos e o cadastro** dos clientes ficam com a sua pizzaria",
                 "Os **pontos de fidelidade** levam o seu nome",
                 "Quem pede **lembra de você**, não do sistema"])),
             frase("A tecnologia é nossa. *A marca é sua.*"),
             cta(),
         ]),
    dict(pasta="2026-11-cerrafood-cozinha", nome="Tela da cozinha", tags="#Cozinha #KDS #Restaurante",
         slides=[
             ("capa", dict(rotulo="Cozinha", titulo="Chega de *comanda perdida* no balcão.",
                           sub="Os pedidos aparecem numa tela da cozinha, na ordem e com o tempo de espera.")),
             ("kds", dict(rotulo="Tela da cozinha", titulo="Cada pedido *na tela, uma vez.*")),
             ("passos", dict(rotulo="Como funciona", titulo="Três toques, *do pedido ao pronto.*", passos=[
                 ("O pedido chega", "Do totem ou do caixa, direto para a tela"),
                 ("Iniciar preparo", "Um toque e o pedido muda de coluna"),
                 ("Pronto", "Caixa e entrega veem na mesma hora")])),
             ("linhas", dict(rotulo="A cor avisa", titulo="O tempo de espera *muda a cor.*", itens=[
                 "**Verde:** até 15 minutos de espera",
                 "**Amarelo:** de 15 a 25 minutos, atenção",
                 "**Vermelho:** passou de 25 minutos, olhe primeiro"])),
             frase("Menos grito, *mais pizza no forno.*"),
             cta(),
         ]),
    dict(pasta="2026-11-cerrafood-totem", nome="Totem de autoatendimento", tags="#Autoatendimento #Totem #Delivery",
         slides=[
             ("capa", dict(rotulo="Autoatendimento", titulo="O cliente *monta a pizza* sozinho.",
                           sub="No totem do balcão ou pelo QR Code, sem esperar o caixa.")),
             ("monta", dict(rotulo="No totem", titulo="Tamanho, sabores *e borda.*")),
             ("linhas", dict(rotulo="Meio a meio", titulo="Meio a meio *sem conta de cabeça.*", itens=[
                 "Até **quantos sabores** o tamanho permitir",
                 "O preço segue **a regra da casa**: pelo sabor mais caro ou pela média",
                 "O total aparece **antes de confirmar**"])),
             ("comanda", dict(rotulo="Confirmou", titulo="Confirmou, *a cozinha já sabe.*", comanda=COMANDA_TOTEM,
                              sub="O pedido ganha número na hora e vai para a tela da cozinha. Sem internet, o totem avisa e **guarda o carrinho**.")),
             frase("A fila anda *enquanto o caixa atende.*"),
             cta(),
         ]),
    dict(pasta="2026-11-cerrafood-ficha-tecnica", nome="Ficha técnica e custo", tags="#CustoDaPizza #FichaTecnica #Margem",
         slides=[
             ("capa", dict(rotulo="Custo real", titulo="Quanto custa *a sua calabresa?*",
                           sub="Com a ficha técnica, o sistema calcula o custo de cada pizza pelos ingredientes.")),
             ("linhas", dict(rotulo="O problema", titulo="Preço no chute é *margem no escuro.*", itens=[
                 "O queijo sobe e **o preço fica igual**",
                 "O sabor que mais vende **pode ser o que menos dá lucro**",
                 "Ninguém sabe **quanto vai** em cada sabor"])),
             ("custo", dict(rotulo="Ficha técnica", titulo="Cada pizza *em fatias de custo.*")),
             ("passos", dict(rotulo="Como funciona", titulo="O custo *sai sozinho.*", passos=[
                 ("Cadastre os ingredientes", "Com o custo e a unidade de cada um"),
                 ("Monte a ficha técnica", "Quanto de cada ingrediente vai em cada sabor"),
                 ("Veja o custo de cada pizza", "Refeito quando o preço de um ingrediente muda")])),
             frase("Preço bom é preço *com o custo na mão.*"),
             cta(),
         ]),
    dict(pasta="2026-11-cerrafood-estoque", nome="Estoque automático", tags="#Estoque #ControleDeEstoque #Desperdicio",
         slides=[
             ("capa", dict(rotulo="Estoque", titulo="Acabou a muçarela *no sábado à noite?*",
                           sub="Cada venda baixa os ingredientes do estoque. Sozinha.")),
             ("passos", dict(rotulo="Como funciona", titulo="Vendeu, *baixou, avisou.*", passos=[
                 ("Vendeu", "A pizza sai pelo totem ou pelo caixa"),
                 ("Baixou", "A ficha técnica tira cada ingrediente do estoque"),
                 ("Avisou", "Abaixo do mínimo, o sistema alerta a gerência")])),
             ("linhas", dict(rotulo="O estoque que conta a verdade", titulo="Sem *“acho que tem”.*", itens=[
                 "Baixa **automática** a cada pedido confirmado",
                 "**Alerta** quando um ingrediente fica abaixo do mínimo",
                 "Venda sem estoque **aparece**, em vez de sumir"])),
             ("linhas", dict(rotulo="Cancelou?", titulo="Cancelou, *volta pro estoque.*", itens=[
                 "Pedido cancelado **devolve** os ingredientes",
                 "Toda entrada e saída fica **registrada**",
                 "A compra acontece **antes** de faltar"])),
             frase("Faltar ingrediente *não é surpresa.* É aviso."),
             cta(),
         ]),
    dict(pasta="2026-11-cerrafood-caixa", nome="Frente de caixa", tags="#PDV #FrenteDeCaixa #FechamentoDeCaixa",
         slides=[
             ("capa", dict(rotulo="Frente de caixa", titulo="O caixa *fecha certinho.*",
                           sub="Abertura, sangria, suprimento e fechamento com conferência, num caixa feito para pizzaria.")),
             ("comanda", dict(rotulo="No balcão", titulo="Pedido no balcão, *comanda na mão.*", comanda=COMANDA_CAIXA,
                              sub="Impressora térmica USB, ligada direto no navegador. Se ela falhar, **a venda não para**.")),
             ("passos", dict(rotulo="O dia do caixa", titulo="Do troco inicial *à conferência.*", passos=[
                 ("Abre o caixa", "Com o valor inicial em dinheiro"),
                 ("Registra o dia", "Vendas, sangrias e suprimentos"),
                 ("Fecha e confere", "O esperado contra o contado, com a diferença à vista")])),
             ("linhas", dict(rotulo="Cada venda no lugar", titulo="Cada pagamento *no seu lugar.*", itens=[
                 "**PIX, cartão e dinheiro** registrados em cada venda",
                 "**Sangria e suprimento** lançados no caixa do dia",
                 "Diferença alta no fechamento **pede confirmação**"])),
             frase("Fim de noite *sem conta no papel de pão.*"),
             cta(),
         ]),
    dict(pasta="2026-11-cerrafood-delivery", nome="Delivery", tags="#Delivery #Entregas #PizzaDelivery",
         slides=[
             ("capa", dict(rotulo="Delivery", titulo="O cliente *acompanha o pedido* sem ligar.",
                           sub="Taxa por bairro, painel do entregador e o status de cada pedido pelo link.")),
             ("fluxo", dict(rotulo="Pelo link do pedido", titulo="Etapa por etapa, *na tela do cliente.*", estacoes=[
                 ("Confirmado", "A pizzaria recebeu o pedido"),
                 ("Preparando", "A pizza entrou na cozinha"),
                 ("Saiu para entrega", "O entregador marcou a saída"),
                 ("Entregue", "Pedido concluído")])),
             ("passos", dict(rotulo="Como funciona", titulo="Do forno *à porta.*", passos=[
                 ("Taxa por bairro", "Taxa e tempo de entrega definidos por região"),
                 ("Painel do entregador", "No celular, pelo navegador, sem instalar app"),
                 ("Cliente informado", "O status muda na hora, para todo mundo")])),
             ("linhas", dict(rotulo="WhatsApp por link", titulo="WhatsApp *sem robô.*", itens=[
                 "O entregador **avisa o cliente** com um toque",
                 "O cliente **chama a loja** já com o número do pedido",
                 "Nenhuma mensagem **automática** em nome da pizzaria"])),
             frase("Menos *“cadê minha pizza?”* no telefone."),
             cta(),
         ]),
    dict(pasta="2026-11-cerrafood-fidelidade", nome="Fidelidade", tags="#Fidelidade #ProgramaDePontos #CRM",
         slides=[
             ("capa", dict(rotulo="Fidelidade", titulo="Quem pede sempre *merece ser lembrado.*",
                           sub="Pontos por real gasto e níveis de cliente, com o nome da sua pizzaria.")),
             ("niveis", dict(rotulo="Níveis de cliente", titulo="Do Bronze *à Platina.*")),
             ("linhas", dict(rotulo="Pontos", titulo="Cada pedido *vira ponto.*", itens=[
                 "**Pontos** a cada real gasto, quando o pedido é confirmado",
                 "**Cancelou?** Os pontos voltam",
                 "O saldo de cada cliente **no cadastro**"])),
             ("linhas", dict(rotulo="Cadastro de clientes", titulo="Conheça *quem pede.*", itens=[
                 "**Quem** mais pede e o **histórico** de pedidos",
                 "**Quando** foi o último pedido",
                 "Quanto cada cliente **já gastou**"])),
             frase("O melhor cliente *é o que volta.*"),
             cta(),
         ]),
    dict(pasta="2026-11-cerrafood-relatorios", nome="Relatórios", tags="#GestaoFinanceira #Relatorios #DRE",
         slides=[
             ("capa", dict(rotulo="Relatórios", titulo="A noite acabou. *Quanto sobrou?*",
                           sub="Faturamento, resultado e o que mais vende, em gráficos que qualquer um entende.")),
             ("abc", dict(rotulo="Curva ABC", titulo="Quem *puxa a venda.*",
                          sub="A curva ABC separa os sabores que mais faturam dos que quase não saem.")),
             ("mapa", dict(rotulo="Mapa de calor", titulo="Os horários *que lotam.*",
                           sub="Dias e horas com mais pedidos: escala e compra no tamanho certo.")),
             ("linhas", dict(rotulo="Resultado", titulo="O resultado *do mês.*", itens=[
                 "**DRE:** receita, custos e resultado",
                 "Períodos de **hoje, 7, 30 e 90 dias**",
                 "Vendas exportadas em **planilha (CSV)**"])),
             frase("Decidir *com número*, não com palpite."),
             cta(),
         ]),
    dict(pasta="2026-11-cerrafood-equipe", nome="Equipe e acessos", tags="#GestaoDeEquipe #Seguranca #Restaurante",
         slides=[
             ("capa", dict(rotulo="Equipe", titulo="Cada um *no seu papel.*",
                           sub="O caixa vê o caixa, a cozinha vê a cozinha. A gerência vê tudo.")),
             ("perfis", dict(rotulo="Perfis de acesso", titulo="Um perfil *para cada função.*", perfis=[
                 ("Administrador", "Tudo, inclusive a equipe"),
                 ("Gerente", "Caixa, cardápio, estoque e relatórios"),
                 ("Caixa", "Vendas e o caixa do dia"),
                 ("Cozinha", "A tela de pedidos"),
                 ("Entregador", "As entregas"),
                 ("Totem", "Só o cardápio, para o cliente")])),
             ("linhas", dict(rotulo="Acesso", titulo="Saiu da equipe, *saiu do sistema.*", itens=[
                 "Funcionário desativado **perde o acesso**",
                 "Cada pessoa entra com **o próprio login**",
                 "Telas **bloqueadas** para quem não é do setor"])),
             ("linhas", dict(rotulo="Auditoria", titulo="Tudo *fica registrado.*", itens=[
                 "**Quem** mudou o quê, e **quando**",
                 "Alterações com o **antes e o depois**",
                 "Cada mudança de status do pedido **com hora**"])),
             frase("Confiança na equipe, *controle no sistema.*"),
             cta(),
         ]),
]


# ---------------- HTML ----------------
def marca(texto):
    s = escape(texto)
    s = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", s)
    return re.sub(r"\*([^*]+)\*", r'<span class="c">\1</span>', s)


def plano(texto):
    return texto.replace("**", "").replace("*", "")


def cabe(texto, base, largura=900):
    """Tamanho em que a maior palavra cabe na largura (Outfit 800: ~0,6 em por letra)."""
    maior = max((len(w) for w in plano(texto).split()), default=1)
    return min(base, int(largura / (maior * 0.6)))


CAB = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="entrega" content="{entrega}">
  <meta name="formato" content="{formato}">
  <title>{titulo}</title>
  <link rel="stylesheet" href="../../brand/cerrafood/marca.css">
</head>
<body>
"""
FIM = """  <script src="../../brand/slides.js"></script>
</body>
</html>
"""


def rodape(primeiro):
    direita = '<span class="arraste">arraste →</span>' if primeiro else "<span data-pagina></span>"
    return f"""    <div class="rodape">
      <span class="marca"><span class="selo-logo"><img src="{SIMBOLO}" alt=""></span><span class="nome">Cerra<span class="food">Food</span></span><small>by Cerrado Tech</small></span>
      {direita}
    </div>"""


def lista(itens, estilo=""):
    lis = "".join(f"<li><span>{marca(i)}</span></li>" for i in itens)
    return f'<ul class="linhas"{f" style=\"{estilo}\"" if estilo else ""}>{lis}</ul>'


def titulo_h2(t, d=None):
    tam = cabe(t, 88 if len(plano(t)) > 30 else 100)
    return f'<h2 class="titulo" style="font-size: {tam}px">{marca(t)}</h2>'


def comanda_html(c):
    linhas = []
    for q, nome, detalhe, obs in c["itens"]:
        linhas.append(f'<div class="it"><span class="q">{escape(q)}</span><span>{escape(nome)}</span></div>')
        if detalhe:
            linhas.append(f'<div class="obs">{escape(detalhe)}</div>')
        if obs:
            linhas.append(f'<div class="obs">obs: {escape(obs)}</div>')
    return f"""<div class="comanda">
      <div class="cab"><span>PEDIDO {escape(c['numero'])}</span><span class="canal">{escape(c['canal'])}</span></div>
      <div class="sep"></div>
      {''.join(linhas)}
      <div class="sep"></div>
      <div class="pe">{escape(c['pe'])}</div>
    </div>"""


APARELHOS = [  # marcas de exemplo: nomes genéricos, nenhuma pizzaria real
    ("Site", "Sua Pizzaria", "#e0472b", "#fff"),
    ("App", "Sua Marca", "#1f4fd1", "#fff"),
    ("Totem", "Seu Nome Aqui", "#111111", "#f39200"),
]


def aparelhos_html():
    out = []
    for i, (tipo, nome, cor, ct) in enumerate(APARELHOS):
        alto = " alto" if i == 1 else ""
        out.append(f"""<div class="aparelho{alto}" style="--c: {cor}; --ct: {ct}">
        <div class="barra">{escape(nome)}</div>
        <div class="corpo"><div class="item"><i></i><span></span></div><div class="item"><i></i><span class="curta"></span></div><div class="item"><i></i><span></span></div><div class="botao">Pedir</div></div>
        <span class="tipo">{tipo}</span>
      </div>""")
    return '<div class="aparelhos">' + "".join(out) + "</div>"


def kds_html():
    colunas = [
        ("Confirmado", [("#0051", "2 min", "", "1 Grande ½ Calabresa ½ Frango", "Iniciar preparo"),
                        ("#0052", "17 min", "atencao", "2 Médias Margherita", "Iniciar preparo")]),
        ("Preparando", [("#0048", "27 min", "atraso", "1 Família Portuguesa", "Pronto"),
                        ("#0050", "9 min", "", "1 Broto Chocolate", "Pronto")]),
        ("Pronto", [("#0047", "12 min", "", "1 Grande Quatro queijos", None)]),
    ]
    cols = []
    for titulo, cards in colunas:
        cs = "".join(
            f'<div class="card {cls}"><span class="n"><span>{n}</span><span class="t">{t}</span></span><p>{escape(txt)}</p>'
            + (f'<span class="acao">{acao}</span>' if acao else "") + "</div>"
            for n, t, cls, txt, acao in cards)
        cols.append(f'<div class="col"><h4>{titulo}</h4>{cs}</div>')
    return '<div class="kds">' + "".join(cols) + "</div>"


def slide_html(tipo, d, primeiro, sm=""):
    """Rótulo e título no alto; o conteúdo (.base) ancorado embaixo, logo acima do rodapé.
    sm: o selo "sua marca aqui", só na campanha do white label."""
    classe = ""
    t = d.get("titulo", "")
    cab = f"""    <p class="rotulo">{escape(d.get('rotulo', ''))}</p>
    {titulo_h2(t)}"""
    selo = f'<span class="selo">{escape(d["selo"])}</span>' if d.get("selo") else ""
    ilustr = f'<span class="selo">{ILUSTRATIVO}</span>'
    corpo = None
    if tipo == "capa":
        miolo = f"""    <div class="topo"><p class="rotulo">{escape(d['rotulo'])}</p>{sm}</div>
    <h1 class="mega" style="font-size: {cabe(t, 112 if len(plano(t)) > 34 else 124)}px">{marca(t)}</h1>
    <p class="sub" style="margin-top: 44px; max-width: 540px">{marca(d['sub'])}</p>
    <div class="emblema" data-sangra><img src="{SIMBOLO}" alt=""></div>"""
    elif tipo == "linhas":
        corpo = lista(d["itens"])
    elif tipo == "passos":
        corpo = '<div class="passos">' + "".join(
            f'<div class="p"><span class="n">{i:02d}</span><div><b>{escape(b)}</b><span>{escape(s)}</span></div></div>'
            for i, (b, s) in enumerate(d["passos"], start=1)) + "</div>"
    elif tipo == "fluxo":
        corpo = '<div class="fluxo">' + "".join(
            f'<div class="e"><span class="bola">{i:02d}</span><div><b>{escape(b)}</b><span>{escape(s)}</span></div></div>'
            for i, (b, s) in enumerate(d["estacoes"], start=1)) + "</div>"
    elif tipo == "aparelhos":
        classe = "papel"
        cab += f"""
    <p class="sub">{marca(d['sub'])}</p>"""
        corpo = aparelhos_html() + selo
    elif tipo == "kds":
        corpo = kds_html() + ('<div class="legenda-kds"><span style="--c: var(--folha)">no tempo</span>'
                              '<span style="--c: var(--laranja)">atenção</span><span style="--c: var(--tomate)">atrasado</span></div>') + ilustr
    elif tipo == "monta":
        corpo = """<div class="monta">
      <span class="etapa">1 · Tamanho</span>
      <div class="opcoes"><span class="op">Média</span><span class="op on">Grande</span><span class="op">Família</span></div>
      <span class="etapa">2 · Sabores (até 2)</span>
      <div class="meio"><span class="disco"></span><p>Metade <b>Calabresa</b><br>Metade <b>Quatro queijos</b></p></div>
      <span class="etapa">3 · Borda</span>
      <div class="opcoes"><span class="op">Tradicional</span><span class="op on">Recheada</span></div>
    </div>""" + ilustr
    elif tipo == "comanda":
        corpo = comanda_html(d["comanda"]) + f'<p class="sub">{marca(d["sub"])}</p>'
    elif tipo == "custo":
        fatias = [("Massa", "var(--laranja)"), ("Queijo", "var(--folha)"), ("Molho", "var(--tomate)"),
                  ("Recheio", "#f2c14e"), ("Embalagem", "var(--creme-suave)")]
        lis = "".join(f'<li style="--c: {c}">{n}</li>' for n, c in fatias)
        corpo = (f'<div class="custo"><div class="pizza"></div><ul>{lis}<li class="total">= custo da pizza</li></ul></div>'
                 '<p class="sub">Cada fatia é um ingrediente da ficha técnica. Somadas, dão <b>o custo de cada sabor e tamanho</b>.</p>' + ilustr)
    elif tipo == "abc":
        barras = [("A", "Calabresa", 100), ("A", "Margherita", 84), ("B", "Frango", 56), ("B", "Portuguesa", 42), ("C", "Doce de leite", 20)]
        cor = {"A": "var(--laranja)", "B": "#f2c14e", "C": "var(--creme-suave)"}
        corpo = ('<div class="abc">' + "".join(
            f'<div class="b"><span class="letra">{l}</span><span class="barra" style="--w: {w}%; --c: {cor[l]}">{n if w > 30 else ""}</span></div>'
            for l, n, w in barras) + "</div>" + f'<p class="sub">{marca(d["sub"])}</p>' + ilustr)
    elif tipo == "mapa":
        dias = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]
        horas = ["18h", "19h", "20h", "21h", "22h", "23h"]
        base = [.12, .25, .3, .2, .1, .05]
        peso = [.4, .45, .55, .8, 1, 1, .85]
        cel = '<span></span>' + "".join(f'<span class="h">{h}</span>' for h in horas)
        for i, dia in enumerate(dias):
            cel += f'<span class="d">{dia}</span>' + "".join(
                f'<span class="q" style="--o: {max(.1, min(1, b * 3.2 * peso[i])):.2f}"></span>' for b in base)
        corpo = f'<div class="mapa">{cel}</div><p class="sub">{marca(d["sub"])}</p>' + ilustr
    elif tipo == "niveis":
        ns = [("Bronze", "#cd8a4b", "300px"), ("Prata", "#c9cdd1", "390px"), ("Ouro", "#f2c14e", "480px"), ("Platina", "#e8ecef", "570px")]
        corpo = ('<div class="niveis">' + "".join(f'<div class="n" style="--c: {c}; --h: {h}"><b>{n}</b></div>' for n, c, h in ns) + "</div>"
                 '<p class="sub">Quanto mais o cliente pede, mais ele sobe de nível. <b>Os benefícios de cada nível são definidos pela pizzaria.</b></p>')
    elif tipo == "perfis":
        corpo = '<div class="perfis">' + "".join(f'<div class="pf"><b>{escape(n)}</b><span>{escape(s)}</span></div>' for n, s in d["perfis"]) + "</div>"
    elif tipo == "frase":
        classe = "laranja"
        miolo = f"""    <p class="rotulo">Em uma frase</p>
    <h2 class="mega" style="font-size: {cabe(d['texto'], 124)}px; margin-top: auto; margin-bottom: auto">{marca(d['texto'])}</h2>"""
    elif tipo == "cta":
        classe = "laranja"
        miolo = f"""    <div class="topo"><p class="rotulo">Demonstração</p>{sm}</div>
    <h2 class="mega" style="font-size: {cabe(d['titulo'], 116)}px">{marca(d['titulo'])}</h2>
    <div class="base">
      <p class="sub">{escape(d['nota'])}</p>
      <span class="contato principal">{LINK}</span>
      <span class="contato">WhatsApp {WHATS}</span>
    </div>"""
    else:
        raise ValueError(tipo)
    if corpo is not None:
        miolo = cab + f"""
    <div class="base">{corpo}</div>"""
    return f'  <section class="slide {classe}">\n{miolo}\n{rodape(primeiro)}\n  </section>\n'


def sua_marca(c):
    """O selo "sua marca aqui" só entra na campanha do white label (pedido do Renato em 10/11)."""
    return '<span class="suamarca">Sua marca aqui</span>' if c["pasta"].endswith("-sua-marca") else ""


def carrossel(c):
    corpo = "\n".join(slide_html(t, d, i == 0, sua_marca(c)) for i, (t, d) in enumerate(c["slides"]))
    return CAB.format(entrega=c["pasta"], formato="1080x1350", titulo=f"Carrossel: CerraFood, {escape(c['nome'])}") + corpo + FIM


def story(c):
    _, d = c["slides"][0]
    itens = next((x["itens"] for tt, x in c["slides"] if tt == "linhas"), None)
    if itens is None:
        itens = [f"**{b}:** {s}" for b, s in next(x for tt, x in c["slides"] if tt in ("passos", "fluxo")).get("passos", [])]
    return CAB.format(entrega=c["pasta"], formato="1080x1920", titulo=f"Story: CerraFood, {escape(c['nome'])}") + f"""  <!-- área segura: ~250px livres no topo e na base -->
  <section class="slide story">
    <div class="topo"><p class="rotulo">{escape(d['rotulo'])}</p>{sua_marca(c)}</div>
    <h1 class="mega" style="font-size: {cabe(d['titulo'], 118)}px">{marca(d['titulo'])}</h1>
    <p class="sub" style="margin-top: 48px">{marca(d['sub'])}</p>
    <div class="base">{lista(itens[:3])}<span class="contato principal">{LINK}</span></div>
  </section>
""" + FIM


def legendas(c):
    _, d0 = c["slides"][0]
    blocos = []
    for t, d in c["slides"][1:]:
        if t == "linhas":
            blocos.append(plano(d["titulo"]) + "\n" + "\n".join(f"🍕 {plano(i)}" for i in d["itens"]))
        elif t in ("passos", "fluxo"):
            pares = d.get("passos") or d.get("estacoes")
            blocos.append(plano(d["titulo"]) + "\n" + "\n".join(f"{i}. {b}: {s}" for i, (b, s) in enumerate(pares, start=1)))
        elif t == "frase":
            blocos.append(plano(d["texto"]))
    abertura = plano(d0["titulo"])
    corpo = "\n\n".join(blocos[:3])
    ig = f"""{abertura}

{plano(d0['sub'])}

{corpo}

{WHITE_LABEL}

Agende uma demonstração gratuita: WhatsApp {WHATS}
🔗 {LINK}

{c['tags']} {TAGS_BASE}
"""
    li = f"""{abertura}

{plano(d0['sub'])}

{chr(10).join(blocos[:2])}

CerraFood, da Cerrado Tech: plataforma white label para pizzaria, com totem, caixa, tela da cozinha, ficha técnica, estoque, delivery, fidelidade e relatórios. {WHITE_LABEL}

Demonstração: https://www.{LINK}
"""
    fb = f"""{abertura}

{plano(d0['sub'])}

{corpo}

{WHITE_LABEL}

Fale com a gente no WhatsApp: {WHATS_URL}
Saiba mais: https://www.{LINK}
"""
    return ig, li, fb


def main():
    for n, c in enumerate(CAMPANHAS):
        post, ent = RAIZ / "posts" / c["pasta"], RAIZ / "entregas" / c["pasta"]
        post.mkdir(parents=True, exist_ok=True)
        ent.mkdir(parents=True, exist_ok=True)
        (post / "carrossel.html").write_text(carrossel(c), encoding="utf-8")
        (post / "story.html").write_text(story(c), encoding="utf-8")
        ig, li, fb = legendas(c)
        (ent / "legenda-instagram.txt").write_text(ig, encoding="utf-8")
        (ent / "legenda-linkedin.txt").write_text(li, encoding="utf-8")
        (ent / "legenda-facebook.txt").write_text(fb, encoding="utf-8")
        apresentacao = n == 0
        info = {
            "titulo": f"CerraFood · {c['nome']}",
            "serie": "Apresentação institucional" if apresentacao else "Série CerraFood",
            "data": f"2026-11-{11 + n:02d}",
            "descricao": ("Apresentação do CerraFood, a plataforma white label para pizzaria da Cerrado Tech. Fixar no perfil."
                          if apresentacao else
                          f"Série do CerraFood (plataforma white label para pizzaria): {c['nome'].lower()}. Identidade \"Comanda\"."),
            "orientacoes": [
                f"Carrossel: postar os {len(c['slides'])} PNGs na ordem (carrossel-01 a {len(c['slides']):02d}).",
                "Carrossel animado (carrossel-animado.mp4, sem áudio): sai como Reel separado, na data da agenda.",
                f"Story: adicionar o sticker de link para https://www.{LINK}",
                "Telas, comandas e gráficos são exemplos ilustrativos: não citar cliente nem resultado.",
                "Legendas prontas abaixo, uma para cada rede (a do Facebook já traz o link do WhatsApp).",
            ],
        }
        (ent / "info.json").write_text(json.dumps(info, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"{n:2d}. {c['pasta']}")


if __name__ == "__main__":
    main()
