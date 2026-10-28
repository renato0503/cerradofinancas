"""Gera a série "O que a Cerrado Tech constrói": uma campanha por capacidade do portfólio (/portfolio/).

Para cada capacidade: posts/2026-11-tech-<slug>/{carrossel,story}.html e, em entregas/, as legendas
(Instagram e LinkedIn) e o info.json com a data sugerida de postagem. Identidade: a da Cerrado Tech
(brand/carrossel.css, azul e dourado), com uma cor de destaque por capacidade.

Regras de copy: o "na prática" e as entregas vêm do texto do portfólio; os sinais são situações do cliente,
sem números; nada de cliente, case, prazo ou preço inventado. Os passos de "Como trabalhamos" são os da
campanha da Fábrica de Software (já aprovados).

Depois: python tools/exportar.py ... ; node filmes/ferramentas/animar-carrossel.mjs ... ; python tools/publicar.py

Uso:
    python tools/gerar_portfolio_tech.py
"""
import json
import re
from datetime import date, timedelta
from html import escape
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
PREFIXO = "2026-11-tech-"
WHATS = "(67) 99351-5206"
FOLHA = "../../../img/folinha-hero.png"
SITE = "cerradofinancas.com.br"
TAGS_BASE = "#CerradoTech #FabricaDeSoftware #SoftwareSobMedida #Cuiaba #MatoGrosso"

PASSOS = [
    ("Descoberta e imersão", "Mapeamos seus processos, gargalos e oportunidades."),
    ("Arquitetura e protótipo", "Você valida o protótipo antes de qualquer código."),
    ("Desenvolvimento ágil", "Entregas semanais que você testa e ajusta."),
    ("Entrega e evolução", "Treinamento da equipe e melhorias contínuas."),
]

# Ordem = ordem sugerida de postagem. *palavra* = destaque na cor da capacidade.
CAPACIDADES = [
    dict(slug="erp", nome="ERP Customizado", sigla="ERP", tecnico="Enterprise Resource Planning",
         cor="#38bdf8", icone="squares-four", emoji="🧩", link="erp-customizado",
         gancho="Sua empresa ainda roda em *várias planilhas*?",
         capa_sub="Um ERP desenhado do jeito do seu negócio junta financeiro, estoque, vendas e produção.",
         pratica="Sistema de gestão integrada: financeiro, estoque, vendas e produção em uma plataforma única, desenhada do jeito do negócio.",
         sinais=[("O mesmo dado digitado duas vezes", "Venda num sistema, estoque em outro, e ninguém confia no número"),
                 ("Fechar o mês é um mutirão", "Contas a pagar, a receber e DRE montados à mão"),
                 ("O sistema de prateleira não serve", "Sua equipe se adapta ao software, e não o contrário")],
         entregas=["Contas a pagar/receber, fluxo de caixa e DRE", "Controle de estoque e produção (PCP)",
                   "Emissão de notas fiscais (NF-e/NFC-e)", "Multi-filial e centros de custo"],
         cta="Quer um ERP do *jeito da sua operação*?",
         tags="#ERP #SistemaDeGestao #GestaoEmpresarial"),
    dict(slug="crm", nome="CRM", sigla="CRM", tecnico="Customer Relationship Management",
         cor="#34d399", icone="users-three", emoji="🤝", link="crm-inteligente",
         gancho="Quantas vendas se perdem por *falta de follow-up*?",
         capa_sub="Um CRM reúne cada contato, proposta e venda em um único painel.",
         pratica="Gestão do relacionamento com clientes: cada contato, proposta e venda em um único painel.",
         sinais=[("Cliente esquecido no meio do funil", "Ninguém lembra de ligar de volta"),
                 ("Histórico espalhado", "Cada vendedor guarda o cliente no próprio celular"),
                 ("Sem visão do time", "Não dá para saber quem vende o quê, nem onde a venda trava")],
         entregas=["Funil e Kanban de vendas", "Histórico completo de cada cliente",
                   "Automação de follow-up e lembretes", "Relatórios de desempenho do time"],
         cta="Quer um CRM que *acompanha o seu funil*?",
         tags="#CRM #Vendas #GestaoComercial"),
    dict(slug="bi", nome="BI & Dashboards", sigla="BI", tecnico="Business Intelligence",
         cor="#fbbf24", icone="chart-pie-slice", emoji="📊", link="dashboards",
         gancho="Você decide com dados ou *no escuro*?",
         capa_sub="BI transforma os dados da empresa em gráficos e indicadores para decidir melhor.",
         pratica="Transforma os dados em gráficos e indicadores para decidir melhor, em vez de trabalhar no escuro.",
         sinais=[("Relatório que chega atrasado", "Quando o número sai, a decisão já passou"),
                 ("Cada área com o seu número", "Vendas, financeiro e operação não batem"),
                 ("Indicador calculado à mão", "Alguém passa o dia montando planilha")],
         entregas=["Painéis de vendas, financeiro e operação", "Indicadores (KPIs) automáticos",
                   "Exportação e compartilhamento de relatórios", "Integração com ERPs e planilhas"],
         cta="Quer ver os seus *indicadores num painel só*?",
         tags="#BI #Dashboards #PowerBI #KPI"),
    dict(slug="automacao", nome="Automação de Processos", sigla="RPA", tecnico="Robotic Process Automation · Workflows",
         cor="#fb923c", icone="robot", emoji="🤖", link="portfolio",
         gancho="Sua equipe ainda faz o que *um robô faria*?",
         capa_sub="Robôs que executam tarefas repetitivas e liberam tempo da equipe para o que importa.",
         pratica="Robôs que executam tarefas repetitivas no seu lugar, liberando tempo da equipe para o que importa.",
         sinais=[("Copiar e colar entre planilhas", "Consolidar os mesmos relatórios toda semana"),
                 ("Mensagens enviadas à mão", "Sempre as mesmas, sempre no mesmo horário"),
                 ("Sistemas que não conversam", "Alguém redigita de um para o outro")],
         entregas=["Consolidação de planilhas e relatórios", "Envio automático de e-mails e mensagens",
                   "Integração entre sistemas legados", "Rotinas agendadas (dias e horários)"],
         cta="Qual tarefa você quer *tirar da mão da equipe*?",
         tags="#Automacao #RPA #Produtividade"),
    dict(slug="chatbots", nome="Chatbots & Assistentes", sigla="LLM", tecnico="Large Language Models",
         cor="#22d3ee", icone="chat-circle-dots", emoji="💬", link="portfolio",
         gancho="Seu cliente chama às 22h. *Quem responde?*",
         capa_sub="Atendimento com IA, 24h, no site e no WhatsApp, treinado no conteúdo da sua empresa.",
         pratica="Atendimento automático com IA, 24h, treinado no conteúdo da empresa.",
         sinais=[("Mensagem sem resposta fora do horário", "O cliente esfria até o dia seguinte"),
                 ("As mesmas perguntas o dia todo", "Preço, horário, prazo, endereço"),
                 ("Lead que ninguém qualifica", "O time gasta tempo com quem não vai comprar")],
         entregas=["Atendimento no site e WhatsApp", "Respostas treinadas no conteúdo do negócio",
                   "Encaminhamento para humano quando necessário", "Qualificação de leads automaticamente"],
         cta="Quer um assistente que *conhece o seu negócio*?",
         tags="#Chatbot #WhatsApp #Atendimento #InteligenciaArtificial"),
    dict(slug="integracoes", nome="Integrações", sigla="API", tecnico="APIs · Webhooks",
         cor="#2dd4bf", icone="plugs-connected", emoji="🔌", link="portfolio",
         gancho="Seus sistemas *não conversam* entre si?",
         capa_sub="Conectamos os seus sistemas para acabar com o retrabalho de digitar duas vezes.",
         pratica="Conecta os seus sistemas entre si para acabar com o retrabalho de digitar duas vezes.",
         sinais=[("O mesmo pedido digitado duas vezes", "No marketplace e no sistema de gestão"),
                 ("Pagamento que não baixa sozinho", "Conciliação manual com banco e meios de pagamento"),
                 ("Dados desencontrados", "Cada sistema com uma versão diferente")],
         entregas=["Integração com SAP®, TOTVS e ERPs", "Mercado Pago, bancos e meios de pagamento",
                   "iFood, WhatsApp e marketplaces", "Sincronização bidirecional em tempo real"],
         cta="Quais sistemas você quer *ligar*?",
         tags="#Integracao #API #ERP #Marketplace"),
    dict(slug="dados", nome="Organização de Dados", sigla="BI self-service", tecnico="Data Organization · Self-service BI",
         cor="#a3e635", icone="database", emoji="🗂️", link="portfolio",
         gancho="Seus dados, organizados *na sua conta*, para a sua equipe usar sozinha.",
         capa_sub="Estruturamos a base para o seu time montar BIs, relatórios e automações sem depender de nós.",
         pratica="Estruturamos os dados na conta do cliente (nuvem, no-code ou planilhas) para que a própria equipe monte BIs, relatórios e automações com dados organizados e confiáveis.",
         plataformas=["AWS", "Google Cloud / BigQuery", "Supabase", "Airtable / Notion", "Google Sheets / Excel"],
         sinais=[("Dados espalhados", "Em planilhas, sistemas e e-mails, sem versão certa"),
                 ("Todo relatório vira um pedido", "A equipe depende de quem montou a base"),
                 ("Números que não fecham", "Respostas diferentes para a mesma pergunta")],
         entregas=["Modelagem e limpeza dos dados espalhados", "Base montada na conta do cliente",
                   "Camada pronta para Power BI, Looker Studio e Excel", "Dicionário de dados, atualização automática e governança",
                   "Treinamento da equipe para manter a base sozinha"],
         cta="Quer dados *seus*, organizados e confiáveis?",
         tags="#Dados #BI #DataDriven #PowerBI"),
    dict(slug="ia-offline", nome="IA Offline & RAG", sigla="RAG", tecnico="Retrieval-Augmented Generation",
         cor="#a78bfa", icone="brain", emoji="🧠", link="ia-offline",
         gancho="Uma IA que responde com os *seus documentos*, sem internet.",
         capa_sub="Assistente que roda localmente, cita a fonte e protege os dados sensíveis (LGPD).",
         pratica="Assistente de IA que responde usando apenas os seus documentos, rodando localmente, sem internet e com proteção LGPD.",
         sinais=[("Documento sensível não pode ir para a nuvem", "Contratos, laudos e dados de clientes"),
                 ("Resposta sem fonte não serve", "Você precisa saber de onde a resposta veio"),
                 ("Manuais que ninguém acha", "A informação existe, mas está enterrada")],
         entregas=["Base de conhecimento da empresa (manuais, normas, contratos)", "Respostas com citação da fonte",
                   "Dados nunca saem da sua infraestrutura", "Mascaramento automático de dados sensíveis"],
         cta="Quer uma IA que *não deixa os dados saírem*?",
         tags="#InteligenciaArtificial #IAOffline #RAG #LGPD"),
    dict(slug="ocr", nome="OCR & Documentos Inteligentes", sigla="OCR", tecnico="Optical Character Recognition",
         cor="#e879f9", icone="scan", emoji="📄", link="portfolio",
         gancho="Papel e PDF que *ninguém consegue pesquisar*?",
         capa_sub="OCR transforma PDFs, fotos e papéis escaneados em texto pesquisável e organizado.",
         pratica="Transforma PDFs, fotos e papéis escaneados em texto pesquisável e organizado.",
         sinais=[("Dados digitados à mão", "Nomes, valores e datas, um por um"),
                 ("Arquivo escaneado vira imagem", "Não dá para buscar uma palavra"),
                 ("Documentos sem ordem", "Cada tipo numa pasta, quando está")],
         entregas=["Leitura automática de documentos", "Extração de dados (nomes, valores, datas)",
                   "Indexação e busca por conteúdo", "Classificação automática por tipo"],
         cta="Quer *pesquisar* o que hoje está no papel?",
         tags="#OCR #GestaoDocumental #Digitalizacao"),
    dict(slug="assinatura", nome="Assinatura Digital", sigla="ICP-Brasil", tecnico="ICP-Brasil · GOV.br",
         cor="#f472b6", icone="signature", emoji="✍️", link="portfolio",
         gancho="Ainda imprime, assina, *escaneia e manda*?",
         capa_sub="Documentos assinados pela internet, com validade jurídica, sem papel e sem deslocamento.",
         pratica="Documentos assinados pela internet com validade jurídica, sem papel e sem deslocamento.",
         sinais=[("Contrato parado esperando assinatura", "Alguém precisa ir até o escritório"),
                 ("Quem assinou e quando?", "Sem trilha, fica difícil comprovar"),
                 ("Aprovação entre várias pessoas", "Cada uma num canal diferente")],
         entregas=["Assinatura com certificado ICP-Brasil A1 e GOV.br", "Trilha de auditoria de quem assinou e quando",
                   "Fluxo de aprovações entre várias pessoas", "Notificação por e-mail e WhatsApp"],
         cta="Quer *assinar pela internet*, com validade jurídica?",
         tags="#AssinaturaDigital #ICPBrasil #GovBr #SemPapel"),
    dict(slug="ecommerce", nome="E-commerce & PWA", sigla="PWA", tecnico="Progressive Web Apps",
         cor="#f87171", icone="storefront", emoji="🛍️", link="ecommerce",
         gancho="Uma loja que funciona como app, *sem loja de aplicativos*.",
         capa_sub="Loja online que abre no celular como um app, com e sem internet.",
         pratica="Loja online que funciona no celular como um app, com e sem internet, sem a burocracia das lojas de aplicativo.",
         sinais=[("Venda só pela conversa", "Pedido anotado à mão e estoque no chute"),
                 ("App em loja de aplicativos", "Aprovação, publicação e atualização para cada mudança"),
                 ("Pagamento conferido à mão", "Comprovante por comprovante")],
         entregas=["Catálogo, carrinho e checkout", "Pagamento PIX, cartão e boleto",
                   "Controle de estoque e pedidos", "Painel administrativo completo"],
         cta="Quer a sua *loja no celular do cliente*?",
         tags="#Ecommerce #PWA #LojaVirtual #VendasOnline"),
    dict(slug="compliance", nome="Compliance & LGPD", sigla="LGPD", tecnico="DPO as a Service",
         cor="#60a5fa", icone="shield-check", emoji="🛡️", link="compliance",
         gancho="Sua empresa consegue *provar* que cumpre a LGPD?",
         capa_sub="Adequação à Lei Geral de Proteção de Dados, com trilhas de auditoria para operações reguladas.",
         pratica="Adequação à Lei Geral de Proteção de Dados e trilhas de auditoria para operações reguladas.",
         sinais=[("Dado pessoal sem controle", "Planilhas com CPF, e-mails e telefones circulando"),
                 ("Quem acessou o quê?", "Sem trilha de acessos e alterações"),
                 ("Auditoria vira correria", "Evidências espalhadas na hora de mostrar")],
         entregas=["Políticas e fluxos de conformidade", "Mascaramento e proteção de dados",
                   "Trilha de auditoria de acessos e alterações", "Painel de riscos e evidências"],
         cta="Quer *conformidade com evidência*?",
         tags="#LGPD #Compliance #ProtecaoDeDados #DPO"),
    dict(slug="machine-learning", nome="Machine Learning & Previsão", sigla="ML", tecnico="Data Science",
         cor="#c084fc", icone="trend-up", emoji="📈", link="portfolio",
         gancho="E se o seu histórico *mostrasse o que vem*?",
         capa_sub="Modelos que aprendem com o histórico da empresa e preveem o que vai acontecer.",
         pratica="Modelos que aprendem com o histórico e preveem o que vai acontecer.",
         sinais=[("Compra de estoque no feeling", "Sobra de um lado, falta do outro"),
                 ("Cliente que some sem aviso", "O churn aparece tarde demais"),
                 ("Inadimplência que surpreende", "O risco poderia ser antecipado")],
         entregas=["Previsão de vendas e demanda", "Predição de churn e inadimplência",
                   "Análise de risco e performance (KPIs)", "Modelos explicáveis para auditoria"],
         cta="Quer *prever* em vez de reagir?",
         tags="#MachineLearning #CienciaDeDados #Previsao"),
    dict(slug="govtech", nome="GovTech & Legal-Tech", sigla="GovTech", tecnico="Lei 14.133 · eSocial · RPPS",
         cor="#4ade80", icone="bank", emoji="🏛️", link="portfolio",
         gancho="Tecnologia para quem *presta contas*.",
         capa_sub="Sistemas para gestão pública, contratações e automação de processos jurídicos e cartorários.",
         pratica="Sistemas para gestão pública, contratações e automação de processos jurídicos e cartorários.",
         sinais=[("Pesquisa de preços feita à mão", "Cotações coletadas uma a uma para a Lei 14.133"),
                 ("Folha pública e previdência", "eSocial e RPPS com regras próprias"),
                 ("Cartório e escritório no papel", "Gestão documental que depende de pastas")],
         entregas=["Compras públicas e pesquisa de preços (PNCP)", "Folha de pagamento pública e previdência",
                   "Gestão documental de cartórios e escritórios", "Conformidade com normas regulatórias"],
         cta="Quer modernizar a *gestão pública* ou o *cartório*?",
         tags="#GovTech #LegalTech #Lei14133 #GestaoPublica"),
    dict(slug="white-label", nome="Produto White-Label", sigla="White-Label", tecnico="Branding próprio",
         cor="#fcd34d", icone="tag", emoji="🏷️", link="portfolio",
         gancho="Venda um sistema *com a sua marca*.",
         capa_sub="Sistemas prontos para você revender com a própria marca: contabilidade, consultoria, educação e outros.",
         pratica="Sistemas prontos que você revende com a própria marca: contabilidade, consultoria, educação e outros.",
         sinais=[("Seu cliente pede tecnologia", "E você não tem uma fábrica de software"),
                 ("Construir do zero não compensa", "Para oferecer o que já existe pronto"),
                 ("Quem dá o suporte?", "Quando o cliente liga, alguém precisa resolver")],
         entregas=["Identidade visual do cliente no produto", "Plano de revenda e margens",
                   "Suporte técnico da Cerrado por trás"],
         cta="Quer ter *o seu próprio produto*?",
         tags="#WhiteLabel #Revenda #SaaS #Parceria"),
    dict(slug="web3", nome="Web3 & Blockchain", sigla="Web3", tecnico="Smart Contracts · Tokens",
         cor="#818cf8", icone="link", emoji="⛓️", link="blockchain",
         gancho="Quando o registro *não pode ser alterado*.",
         capa_sub="Contratos inteligentes, tokens e rastreabilidade para casos que exigem confiança e imutabilidade.",
         pratica="Contratos inteligentes, tokens e rastreabilidade para casos que exigem confiança e imutabilidade.",
         sinais=[("Várias partes no mesmo processo", "E ninguém quer ser o dono do registro"),
                 ("Rastreabilidade exigida", "Saber por onde passou e quem mexeu"),
                 ("Regras que devem rodar sozinhas", "Liberar quando a condição for cumprida")],
         entregas=["Contratos inteligentes (Solidity)", "Tokens e NFTs utilitários", "Rastreabilidade de processos"],
         cta="Tem um caso que *exige imutabilidade*?",
         tags="#Blockchain #Web3 #SmartContracts"),
]


def destacar(texto):
    """*palavra* vira <span class="acento">palavra</span>; o resto é escapado."""
    partes = re.split(r"\*([^*]+)\*", texto)
    return "".join(f'<span class="acento">{escape(p)}</span>' if i % 2 else escape(p) for i, p in enumerate(partes))


def inseparavel(texto):
    """Hífen dentro de palavra (NF-e, e-mail) vira hífen inseparável para não quebrar a linha ali."""
    return re.sub(r"(?<=\w)-(?=\w)", "‑", texto)


def plano(texto):
    return texto.replace("*", "")


def datas_sugeridas(n, inicio=date(2026, 11, 2)):
    """Segunda, quarta e sexta, a partir da primeira segunda de novembro."""
    dias, d = [], inicio
    while len(dias) < n:
        if d.weekday() in (0, 2, 4):
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
  <link rel="stylesheet" href="../../brand/carrossel.css">
  <script src="https://unpkg.com/@phosphor-icons/web@2.1.1"></script>
</head>
<body style="--acento: {cor}">
"""
FIM = """  <script src="../../brand/slides.js"></script>
</body>
</html>
"""


def rodape(primeiro=False):
    direita = '<span class="arraste">Arraste <i class="ph-bold ph-arrow-right"></i></span>' if primeiro else "<span data-pagina></span>"
    return f"""    <div class="rodape">
      <span class="marca"><img src="{FOLHA}" alt=""> Cerrado Tech</span>
      {direita}
    </div>"""


def slide(miolo, classe="", primeiro=False):
    return f'  <section class="slide {classe}">\n{miolo}\n{rodape(primeiro)}\n  </section>\n'


def carrossel(c, entrega):
    s = []
    s.append(slide(f"""    <span class="kicker"><i class="ph-bold ph-{c['icone']}"></i> Cerrado Tech constrói</span>
    <span class="icone-frente"><i class="ph-duotone ph-{c['icone']}"></i></span>
    <h1>{destacar(c['gancho'])}</h1>
    <p class="sub">{escape(c['capa_sub'])}</p>""", "capa", primeiro=True))

    extra = ""
    if c.get("plataformas"):
        chips = "".join(f"<span>{escape(p)}</span>" for p in c["plataformas"])
        extra = f'\n    <p class="chips-titulo">Na conta do cliente</p>\n    <div class="chips">{chips}</div>'
    n = len(c["sigla"])
    tam = 230 if n <= 4 else 150 if n <= 8 else 118
    s.append(slide(f"""    <span class="kicker"><i class="ph-bold ph-book-open-text"></i> {escape(c['nome'])}, na prática</span>
    <p style="font-size: {tam}px; font-weight: 900; line-height: .9; letter-spacing: -0.04em; color: var(--acento); margin: 10px 0 26px">{escape(c['sigla'])}</p>
    <h2 class="titulo">{escape(c['tecnico'])}</h2>
    <p class="sub" style="font-size: 44px; line-height: 1.32; color: #fff">{escape(c['pratica'])}</p>{extra}""", ""))

    cards = "\n".join(
        f'      <div class="card"><i class="ph-duotone ph-warning-circle"></i><div><h3>{escape(inseparavel(t))}</h3><p>{escape(inseparavel(d))}</p></div></div>'
        for t, d in c["sinais"])
    s.append(slide(f"""    <span class="kicker"><i class="ph-bold ph-magnifying-glass"></i> Sinais de que você precisa</span>
    <h2 class="titulo">Você se reconhece?</h2>
    <div class="grade uma compacta">
{cards}
    </div>
    <p class="sub" style="margin-top: 44px">Se você se reconheceu em pelo menos um, vale uma conversa.</p>""", ""))

    compacta = " compacta" if len(c["entregas"]) > 4 else ""
    itens = "\n".join(
        f'      <div class="card"><i class="ph-duotone ph-check-circle"></i><div><h3>{escape(inseparavel(e))}</h3></div></div>'
        for e in c["entregas"])
    s.append(slide(f"""    <span class="kicker"><i class="ph-bold ph-package"></i> O que entregamos</span>
    <h2 class="titulo">{escape(c['nome'])}, sob medida</h2>
    <div class="grade uma{compacta}">
{itens}
    </div>""", ""))

    passos = "\n".join(
        f'      <div class="passo"><span class="n">{i + 1}</span><div><h3>{escape(t)}</h3><p>{escape(d)}</p></div></div>'
        for i, (t, d) in enumerate(PASSOS))
    s.append(slide(f"""    <span class="kicker"><i class="ph-bold ph-path"></i> Como trabalhamos</span>
    <h2 class="titulo">Sem atalhos, sem surpresas</h2>
    <div class="passos">
{passos}
    </div>""", ""))

    s.append(slide(f"""    <img class="folha" src="{FOLHA}" alt="" style="width: 230px">
    <h2>{destacar(c['cta'])}</h2>
    <p class="sub">Conte o seu processo e desenhamos a solução com você.</p>
    <div class="contatos">
      <span class="contato principal" style="font-size: 38px; white-space: nowrap"><i class="ph-bold ph-globe"></i> {SITE}/{c['link']}</span>
      <span class="contato"><i class="ph-bold ph-whatsapp-logo"></i> {WHATS}</span>
    </div>""", "cta"))

    cab = CAB.format(entrega=entrega, formato="1080x1350", titulo=f"Carrossel: {escape(c['nome'])}", cor=c["cor"])
    return cab + "\n".join(s) + FIM


def story(c, entrega):
    cards = "\n".join(
        f'      <div class="card"><i class="ph-duotone ph-check-circle"></i><div><h3>{escape(inseparavel(e))}</h3></div></div>'
        for e in c["entregas"][:3])
    cab = CAB.format(entrega=entrega, formato="1080x1920", titulo=f"Story: {escape(c['nome'])}", cor=c["cor"])
    return cab + f"""  <!-- área segura: ~250px livres no topo e na base -->
  <section class="slide story">
    <span class="kicker"><i class="ph-bold ph-{c['icone']}"></i> Cerrado Tech · {escape(c['nome'])}</span>
    <h1>{destacar(c['gancho'])}</h1>
    <p class="sub">{escape(c['capa_sub'])}</p>
    <div class="grade uma">
{cards}
    </div>
    <span class="contato principal"><i class="ph-bold ph-globe"></i> {SITE}/{c['link']}</span>
  </section>
""" + FIM


def legendas(c):
    link = f"{SITE}/{c['link']}"
    entregas = "\n".join(f"✅ {e}" for e in c["entregas"])
    # só a primeira letra da descrição vai para minúscula (siglas como DRE e SAP ficam como estão)
    def junta(d):
        return d if d[:2].isupper() else d[0].lower() + d[1:]
    sinais = "\n".join(f"• {t}: {junta(d)}" for t, d in c["sinais"])
    ig = f"""{plano(c['gancho'])} {c['emoji']}

{c['nome']} ({c['tecnico']}), na prática: {junta(c['pratica'])}

Sinais de que você precisa:
{sinais}

O que entregamos:
{entregas}

Como trabalhamos: descoberta, protótipo validado antes de qualquer código, entregas semanais e evolução contínua. E se a sua necessidade não estiver no portfólio, a gente constrói.

{plano(c['cta'])} Conte o seu processo no WhatsApp {WHATS}
🔗 {link}

{c['tags']} {TAGS_BASE}
"""
    li = f"""{c['nome']} | {c['tecnico']}

{c['pratica']}

Sinais de que a sua operação precisa disso:
{sinais}

O que a Cerrado Tech entrega:
{entregas}

Trabalhamos em quatro etapas: descoberta e imersão nos processos, arquitetura e protótipo validado antes do código, desenvolvimento com entregas semanais e evolução contínua com treinamento da equipe.

{plano(c['cta'])} Conte o seu processo: {link}
"""
    return ig, li


def main():
    datas = datas_sugeridas(len(CAPACIDADES))
    total = len(CAPACIDADES)
    for n, (c, d) in enumerate(zip(CAPACIDADES, datas), start=1):
        entrega = PREFIXO + c["slug"]
        pasta_post = RAIZ / "posts" / entrega
        pasta_ent = RAIZ / "entregas" / entrega
        pasta_post.mkdir(parents=True, exist_ok=True)
        pasta_ent.mkdir(parents=True, exist_ok=True)
        (pasta_post / "carrossel.html").write_text(carrossel(c, entrega), encoding="utf-8")
        (pasta_post / "story.html").write_text(story(c, entrega), encoding="utf-8")
        ig, li = legendas(c)
        (pasta_ent / "legenda-instagram.txt").write_text(ig, encoding="utf-8")
        (pasta_ent / "legenda-linkedin.txt").write_text(li, encoding="utf-8")
        info = {
            "titulo": f"Cerrado Tech · {c['nome']}",
            "data": d.isoformat(),
            "descricao": f"Série \"O que a Cerrado Tech constrói\" ({n} de {total}): {c['nome']} ({c['tecnico']}). {c['pratica']}",
            "orientacoes": [
                f"Postar em {d.strftime('%d/%m')} (sugestão: a série sai segunda, quarta e sexta, na ordem da numeração).",
                "Carrossel: postar os 6 PNGs na ordem (carrossel-01 a 06) no Instagram e no LinkedIn.",
                "Carrossel animado (carrossel-animado.mp4, 1080×1350, com som): os mesmos slides em vídeo, para Reels e feed. Pode usar a legenda do Instagram.",
                f"Story: adicionar o sticker de link para https://www.{SITE}/{c['link']}",
                "Legendas prontas abaixo, uma para cada rede.",
            ],
        }
        (pasta_ent / "info.json").write_text(json.dumps(info, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"{n:2d}. {d.strftime('%d/%m')}  {entrega}  (legenda IG: {len(ig)} caracteres)")


if __name__ == "__main__":
    main()
