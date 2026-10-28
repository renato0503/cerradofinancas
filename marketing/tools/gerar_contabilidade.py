"""Gera a série da Cerrado Contabilidade: "Para quem atendemos" (4 perfis) e "O que fazemos" (6 grupos de serviço).

Identidade própria "Partida dobrada" (brand/contabilidade/marca.css): papel de livro-razão, razonete em T,
escada do crescimento MEI → ME → EPP → Lucro Presumido e carimbo EM DIA.

Regras de copy (ver HISTORICO.md): serviços confirmados pelo Renato em 28/10 (site, Lucro Presumido e a lista da
estratégia). Lucro Real fica de fora até confirmar. Sem números de limite, alíquota ou prazo que mudam por lei; só o
Fator R (6% e 28%, LC 123). Publicidade sóbria (código de ética do CFC): nada de promessa de economia ou de resultado.

Também gera a série educativa "Você sabia?" (VOCE_SABIA), no formato das notas explicativas do balanço.

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
                   ("Alvarás e inscrição municipal", "Tudo regularizado na Prefeitura"), ("DASN-SIMEI", "A declaração anual, mesmo sem faturar"),
                   ("De MEI para ME", "O desenquadramento na hora certa")],
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
                   ("Alvarás e inscrições", "Municipal e estadual, dentro da lei"), ("Certificado digital", "Para emitir nota e assinar"),
                   ("Escolha do regime", "Simples Nacional ou Lucro Presumido")],
         cta="Abra o seu CNPJ *com quem entende*.", tags="#AbrirEmpresa #CNPJ #Empreender"),
    dict(slug="fiscal", serie="O que fazemos", ativos=[0, 1, 2, 3],
         gancho="Seu imposto, apurado *com precisão*.",
         capa_sub="Simples Nacional, Lucro Presumido, notas fiscais e todas as declarações para proteger o seu CNPJ.",
         degrau_titulo="Gestão tributária", degrau_texto="Especialistas em pequenas empresas, e-commerces e profissionais autônomos: cada regime com as suas regras e os seus prazos.",
         voce=["~Guia que chega atrasada~", "~Declaração esquecida~", "~Dúvida sobre o valor~"],
         gente=["Apuração exata", "Declarações no prazo", "CNPJ protegido"],
         servicos=[("Apuração de impostos", "Simples Nacional e Lucro Presumido"), ("Fator R", "Redução para 6% em serviços, quando se aplica"),
                   ("ICMS, ISS e ST", "Comércio, serviço e e-commerce"), ("Obrigações acessórias", "DEFIS, EFD-Reinf e demais"),
                   ("Parcelamento de débitos", "Para colocar o CNPJ em dia")],
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
                   ("eSocial e pró-labore", "Inclusive a retirada dos sócios")],
         cta="Sua equipe cresce, *a burocracia não*.", tags="#DepartamentoPessoal #FolhaDePagamento #eSocial"),
    dict(slug="contabil", serie="O que fazemos", ativos=[1, 2, 3],
         gancho="Balanço e DRE *que você entende*.",
         capa_sub="A contabilidade que mostra onde a empresa está, não só a que cumpre tabela.",
         degrau_titulo="Os números da empresa", degrau_texto="Plano de contas organizado, conciliação bancária e demonstrativos que servem para decidir, não só para guardar na gaveta.",
         voce=["~Números que não batem~", "~Relatório que ninguém lê~", "~Extrato sem conciliação~"],
         gente=["Plano de contas organizado", "Conciliação bancária", "Balanço e DRE claros"],
         servicos=[("Escrituração contábil completa", "Livro diário e razão em dia"), ("Balanço e DRE", "A foto e o filme da empresa"),
                   ("Plano de contas e centros de custo", "Cada gasto no lugar certo"), ("Conciliação bancária", "O extrato batendo com a contabilidade"),
                   ("Distribuição de lucros", "Com lucro apurado e documentado")],
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
    dict(slug="regularizacao", serie="O que fazemos", ativos=[0, 1, 2, 3],
         gancho="CNPJ com ~pendência~? A gente *regulariza*.",
         capa_sub="Débitos, certidões, alterações no contrato e até o encerramento da empresa, com tudo documentado.",
         degrau_titulo="Empresa em ordem", degrau_texto="Certidão negativa abre portas: licitação, financiamento e clientes maiores. A gente levanta as pendências, organiza e acompanha até ficar tudo em dia.",
         voce=["~Certidão positiva~", "~Débito acumulando~", "~Contrato desatualizado~"],
         gente=["Diagnóstico das pendências", "Parcelamento de débitos", "Certidões negativas"],
         servicos=[("Certidões negativas", "Federal, estadual e municipal"), ("Parcelamento de débitos", "Simples Nacional e Receita Federal"),
                   ("Alterações contratuais", "Sócios, endereço, atividade e capital"), ("Baixa de empresa", "O encerramento feito do jeito certo"),
                   ("Certificado digital", "Emissão e renovação")],
         dor=True, rotulos=("Hoje", "Com a gente"),
         cta="Seu CNPJ *de volta em dia*.", tags="#CertidaoNegativa #RegularizacaoDeEmpresa #Parcelamento"),
    dict(slug="socios", serie="O que fazemos", ativos=[1, 2, 3],
         gancho="O que é da empresa e o que é *seu*?",
         capa_sub="Pró-labore, distribuição de lucros e o imposto de renda dos sócios, organizados como deve ser.",
         degrau_titulo="Empresa e sócio, separados", degrau_texto="Misturar a conta da empresa com a conta pessoal confunde o caixa e o imposto. Com pró-labore e distribuição de lucros bem feitos, cada real tem endereço.",
         voce=["~Pix da empresa para casa~", "~Retirada sem registro~", "~IR do sócio no improviso~"],
         gente=["Pró-labore definido", "Lucro apurado e distribuído", "IRPF dos sócios"],
         servicos=[("Pró-labore", "Valor definido, com INSS em dia"), ("Distribuição de lucros", "Com base no lucro apurado"),
                   ("IRPF dos sócios", "A declaração conversando com a da empresa"), ("Escrituração completa", "O que dá segurança às retiradas")],
         dor=True, rotulos=("Sem a gente", "Com a gente"),
         cta="Cada real *no lugar certo*.", tags="#ProLabore #DistribuicaoDeLucros #IRPF #Socios"),
    dict(slug="reforma-tributaria", serie="O que fazemos", ativos=[0, 1, 2, 3],
         gancho="A reforma tributária *já começou*.",
         capa_sub="IBS e CBS vão substituir, aos poucos, PIS, Cofins, ICMS e ISS. A gente acompanha a transição com você.",
         degrau_titulo="Uma transição em etapas", degrau_texto="A mudança vem em fases até 2033 e mexe com preço, nota fiscal e crédito de imposto, inclusive para quem está no Simples Nacional.",
         voce=["Vender e precificar", "Negociar com fornecedores", "Planejar o próximo ano"],
         gente=["Acompanhar cada etapa", "Ajustar notas e cadastros", "Simular o impacto"],
         servicos=[("Diagnóstico do impacto", "O que muda na sua operação"), ("Notas fiscais e cadastros", "Prontos para IBS e CBS"),
                   ("Revisão de preços e contratos", "Com o novo imposto na conta"), ("Simples ou fora dele?", "A escolha que a reforma abre"),
                   ("Acompanhamento contínuo", "Cada fase explicada a tempo")],
         cta="Atravesse a reforma *com quem acompanha*.", tags="#ReformaTributaria #IBS #CBS #Impostos"),
]

# Série educativa "Você sabia?": cada post é uma "nota explicativa", como as do balanço.
# Regras conferidas com a legislação em 28/10/2026; revisar se a lei mudar antes da data de postagem.
VOCE_SABIA = [
    dict(slug="dasn-simei", ativos=[0],
         pergunta="MEI que *não faturou* também declara?",
         capa_sub="Sim. A declaração anual do MEI é obrigatória mesmo com faturamento zero.",
         regra="Todo MEI entrega, uma vez por ano, a DASN-SIMEI com o faturamento do ano anterior. Quem não faturou nada declara zero, e o atraso gera multa.",
         fonte="LC 123/2006 e Resolução CGSN 140/2018",
         pratica=["Vale para todo MEI, com ou sem venda", "Informa o faturamento do ano anterior", "Também informa se houve funcionário"],
         erro=["~Sem venda, sem declaração~", "~Perder o prazo~", "~Declarar no chute~"],
         certo=["Declarar todo ano", "Entregar no prazo", "Conferir com as notas"],
         ajuda=[("DASN-SIMEI entregue", "Todo ano, no prazo"), ("Guias do DAS em dia", "Sem pendência acumulada"), ("Controle do faturamento", "Para saber a hora de crescer")],
         cta="Seu MEI *declarado e em dia*.", tags="#MEI #DASNSIMEI #Microempreendedor"),
    dict(slug="fator-r", ativos=[1, 2],
         pergunta="Empresa de serviço pode pagar *6%* no Simples?",
         capa_sub="Em várias atividades, sim. A regra se chama Fator R e depende da folha de pagamento.",
         regra="Quando a folha, somada ao pró-labore dos sócios, chega a 28% do faturamento dos últimos 12 meses, a atividade sai do Anexo V e passa para o Anexo III, cuja alíquota começa em 6%.",
         fonte="LC 123/2006, art. 18",
         pratica=["Vale para atividades do Anexo V", "A conta é refeita todo mês", "O pró-labore entra na folha"],
         erro=["~Ninguém faz a conta~", "~Sócio sem pró-labore~", "~Anexo V sem saber~"],
         certo=["Cálculo todo mês", "Pró-labore planejado", "Anexo certo na guia"],
         ajuda=[("Cálculo do Fator R", "Mês a mês"), ("Pró-labore planejado", "Dentro da lei"), ("Apuração do Simples", "Com o anexo certo")],
         cta="Faça a conta *com a gente*.", tags="#FatorR #SimplesNacional #PrestadorDeServico"),
    dict(slug="pro-labore", ativos=[1, 2, 3],
         pergunta="Sócio que trabalha na empresa *precisa* de pró-labore?",
         capa_sub="Sim. Tirar dinheiro só como lucro, sem pró-labore, é um dos erros mais comuns.",
         regra="Pró-labore é a remuneração do sócio pelo trabalho e tem contribuição ao INSS. Lucro é outra coisa: só pode ser distribuído quando existe e está apurado na contabilidade.",
         fonte="Lei 8.212/1991 (contribuinte individual)",
         pratica=["Pró-labore todo mês, com INSS", "Lucro com base na contabilidade", "Os dois entram no IR do sócio"],
         erro=["~Retirar sem registrar~", "~Chamar tudo de lucro~", "~Misturar as contas~"],
         certo=["Pró-labore definido", "Lucro apurado", "Conta da empresa separada"],
         ajuda=[("Pró-labore", "Valor e INSS em dia"), ("Distribuição de lucros", "Documentada"), ("IRPF dos sócios", "Batendo com a empresa")],
         cta="Retirada *do jeito certo*.", tags="#ProLabore #DistribuicaoDeLucros #Socios"),
    dict(slug="dirf", ativos=[1, 2, 3],
         pergunta="A *DIRF* acabou. Você sabia?",
         capa_sub="As informações que iam na DIRF agora seguem pelo eSocial e pela EFD-Reinf.",
         regra="A Receita Federal extinguiu a DIRF a partir dos pagamentos de 2025. Retenções de imposto e pagamentos a funcionários e prestadores passam a ser informados mês a mês, no eSocial e na EFD-Reinf.",
         fonte="IN RFB 2.181/2024",
         pratica=["A informação vai todo mês", "O erro aparece mais rápido no cruzamento", "O informe de rendimentos continua"],
         erro=["~Esperar o ano fechar~", "~Retenção sem registro~", "~Reinf esquecida~"],
         certo=["Envio mensal", "Retenções conferidas", "Tudo enviado no mês"],
         ajuda=[("EFD-Reinf", "Enviada todo mês"), ("eSocial", "Folha e retenções"), ("Informes de rendimentos", "Para funcionários e prestadores")],
         cta="Obrigação nova, *rotina em dia*.", tags="#DIRF #EFDReinf #eSocial #ObrigacoesAcessorias"),
    dict(slug="ibs-cbs", ativos=[0, 1, 2, 3],
         pergunta="O que são *IBS e CBS*?",
         capa_sub="São os novos impostos sobre o consumo criados pela reforma tributária.",
         regra="A CBS, federal, substitui PIS e Cofins. O IBS, de estados e municípios, substitui ICMS e ISS. A troca é gradual: começa em 2026, com um ano de teste, e termina em 2033.",
         fonte="EC 132/2023 e LC 214/2025",
         pratica=["2026 é um ano de teste", "A nota fiscal ganha novos campos", "O crédito de imposto vira regra"],
         erro=["~Só vale para empresa grande~", "~Deixar para depois~", "~Ignorar a nota fiscal~"],
         certo=["Entender o impacto agora", "Ajustar os cadastros", "Rever preços com calma"],
         ajuda=[("Diagnóstico do impacto", "Na sua operação"), ("Notas e cadastros", "Prontos para IBS e CBS"), ("Acompanhamento", "Cada fase explicada a tempo")],
         cta="A reforma, *explicada a tempo*.", tags="#ReformaTributaria #IBS #CBS"),
    dict(slug="mei-limite", ativos=[0, 1],
         pergunta="Seu MEI *passou do limite*?",
         capa_sub="Faturou acima do teto do MEI? A empresa precisa sair do MEI e virar microempresa.",
         regra="O MEI tem um limite de faturamento por ano. Passou dele, é preciso pedir o desenquadramento. Quanto antes isso é feito, menor o imposto a acertar.",
         fonte="LC 123/2006, art. 18-A",
         pratica=["A empresa vira ME, em geral no Simples", "Mudam a guia e as declarações", "Dá para contratar e faturar mais"],
         erro=["~Seguir como MEI~", "~Notas acima do teto~", "~Descobrir pela Receita~"],
         certo=["Acompanhar o faturamento", "Desenquadrar na hora", "Planejar o novo regime"],
         ajuda=[("De MEI para ME", "O desenquadramento feito por nós"), ("Simples Nacional", "Com o anexo certo"), ("Controle do faturamento", "Antes de passar do teto")],
         cta="Cresceu? *Suba de degrau*.", tags="#MEI #Desenquadramento #Microempresa"),
    dict(slug="certidao-negativa", ativos=[0, 1, 2, 3],
         pergunta="Para que serve a *certidão negativa*?",
         capa_sub="Ela prova que a empresa não tem débitos. E abre portas que você nem imagina.",
         regra="A certidão negativa de débitos mostra que o CNPJ está em dia com o fisco. Ela é pedida em licitações, financiamentos e contratos com empresas maiores.",
         fonte="Código Tributário Nacional, arts. 205 e 206",
         pratica=["Existem a federal, a estadual e a municipal", "Tem validade e precisa ser renovada", "Débito parcelado não trava a certidão"],
         erro=["~Descobrir na licitação~", "~Certidão vencida~", "~Débito antigo esquecido~"],
         certo=["Consultar antes", "Renovar no prazo", "Parcelar quando precisa"],
         ajuda=[("Certidões negativas", "Emitidas e acompanhadas"), ("Parcelamento de débitos", "Para destravar a certidão"), ("Diagnóstico das pendências", "Antes de virar problema")],
         cta="Certidão *sempre negativa*.", tags="#CertidaoNegativa #Licitacao #CNPJ"),
    dict(slug="cnae", ativos=[0, 1, 2, 3],
         pergunta="O *CNAE* errado pode custar caro?",
         capa_sub="Pode. O código da atividade define o anexo do Simples, as licenças e até se a empresa pode ser MEI.",
         regra="CNAE é o código da atividade da empresa. Ele define em que anexo do Simples Nacional ela paga, quais licenças precisa e se pode ser MEI. Código errado, imposto errado.",
         fonte="LC 123/2006 e Resolução CGSN 140/2018",
         pratica=["É escolhido na abertura", "Pode ser alterado depois", "Uma empresa pode ter vários"],
         erro=["~Copiar de outra empresa~", "~Nota que não bate~", "~Anexo mais caro~"],
         certo=["Estudo da atividade", "CNAE igual à nota", "Anexo correto"],
         ajuda=[("Estudo de CNAE", "Na abertura ou na revisão"), ("Alteração contratual", "Quando a atividade muda"), ("Apuração do Simples", "No anexo certo")],
         cta="O código certo, *desde o início*.", tags="#CNAE #AbrirEmpresa #SimplesNacional"),
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


PREFIXO_SABIA = PREFIXO + "sabia-"
AVISO = "Conteúdo informativo, com base na legislação vigente em outubro de 2026. Cada caso tem detalhes: fale com a gente."


def carrossel_sabia(c, n, entrega):
    s = []
    s.append(slide(f"""    <p class="rotulo">Você sabia? · Notas explicativas</p>
    <div class="nota"><b>Nota nº</b><span>{n:02d}</span></div>
    <h1 class="mega"{' style="font-size: 96px"' if len(plano(c['pergunta'])) > 40 else ''}>{marcar(c['pergunta'])}</h1>
    <p class="sub" style="margin: 40px 0 0">{escape(c['capa_sub'])}</p>
    <div style="margin-top: auto; margin-bottom: 190px">
      <p class="letra-miuda" style="margin-bottom: 18px">Vale para:</p>
      {escada(c['ativos'])}
    </div>""", primeiro=True))

    s.append(slide(f"""    <p class="rotulo">Nota nº {n:02d} · A regra</p>
    <h2 class="titulo">O que diz <span class="marca-verde">a regra</span>.</h2>
    <p class="regra">{escape(inseparavel(c['regra']))}</p>
    <p class="fonte" style="margin-top: auto; margin-bottom: 186px; border-top: 6px double var(--tinta); padding-top: 22px"><b>Base legal:</b> {escape(c['fonte'])}</p>""", ""))

    itens = "\n".join(f'      <li><span>{escape(inseparavel(t))}</span><span class="ok">✓</span></li>' for t in c["pratica"])
    s.append(slide(f"""    <p class="rotulo">Nota nº {n:02d} · Na prática</p>
    <h2 class="titulo">No dia a dia, <span class="marca-verde">fica assim</span>.</h2>
    <ul class="lancamentos">
{itens}
    </ul>""", ""))

    lista = lambda itens: "".join(f"<li>{marcar(inseparavel(i))}</li>" for i in itens)
    s.append(slide(f"""    <p class="rotulo">Nota nº {n:02d} · Erro comum</p>
    <h2 class="titulo">O erro e <span class="marca-verde">o certo</span>.</h2>
    <div class="razonete-topo"><span>O erro comum</span><span>O certo</span></div>
    <div class="razonete dor">
      <div class="col"><ul>{lista(c['erro'])}</ul></div>
      <div class="col"><ul>{lista(c['certo'])}</ul></div>
    </div>
    <p class="saldo"><b>SALDO</b><span>Fazer certo sai <span class="marca-verde">mais barato</span> do que corrigir depois.</span></p>""", ""))

    itens = "\n".join(
        f'      <li><span>{escape(inseparavel(t))}<small>{escape(d)}</small></span><span class="ok">em dia</span></li>'
        for t, d in c["ajuda"])
    s.append(slide(f"""    <p class="rotulo">Como a gente ajuda</p>
    <h2 class="titulo">Na Cerrado, isso já vem <span class="marca-verde">lançado</span>.</h2>
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
      <p class="letra-miuda" style="margin-bottom: 18px">{AVISO}</p>
      {escada(c['ativos'])}
    </div>""", ""))

    cab = CAB.format(entrega=entrega, formato="1080x1350", titulo=f"Carrossel: Você sabia? {escape(plano(c['pergunta']))}")
    return cab + "\n".join(s) + FIM


def story_sabia(c, n, entrega):
    itens = "\n".join(f'      <li><span>{escape(inseparavel(t))}</span><span class="ok">✓</span></li>' for t in c["pratica"])
    cab = CAB.format(entrega=entrega, formato="1080x1920", titulo=f"Story: Você sabia? {escape(plano(c['pergunta']))}")
    return cab + f"""  <!-- área segura: ~250px livres no topo e na base -->
  <section class="slide story">
    <p class="rotulo">Você sabia? · Cerrado Contabilidade</p>
    <div class="nota"><b>Nota nº</b><span>{n:02d}</span></div>
    <h1 class="mega" style="font-size: {88 if len(plano(c['pergunta'])) > 40 else 104}px">{marcar(c['pergunta'])}</h1>
    <p class="regra" style="font-size: 44px; margin: 56px 0">{escape(inseparavel(c['capa_sub']))}</p>
    <ul class="lancamentos compacta">
{itens}
    </ul>
    <span class="contato principal" style="margin-top: auto">{LINK}</span>
  </section>
""" + FIM


def legendas_sabia(c, n):
    pratica = "\n".join(f"✔️ {p}" for p in c["pratica"])
    erros = "\n".join(f"❌ {plano(e)}" for e in c["erro"])
    ig = f"""Você sabia? Nota nº {n:02d}

{plano(c['pergunta'])}
{c['capa_sub']}

{c['regra']}

Na prática:
{pratica}

Erros comuns:
{erros}

Base: {c['fonte']}.
{AVISO}

{plano(c['cta'])} WhatsApp {WHATS}
🔗 {LINK}

#VoceSabia {c['tags']} {TAGS_BASE}
"""
    li = f"""Você sabia? {plano(c['pergunta'])}

{c['capa_sub']} {c['regra']}

Na prática:
{pratica}

Base: {c['fonte']}. {AVISO}

{plano(c['cta'])} {LINK}
"""
    return ig, li


def sabados(n, inicio=date(2026, 11, 7)):
    return [inicio + timedelta(weeks=k) for k in range(n)]


def gravar(entrega, carrossel_html, story_html, ig, li, info):
    post, ent = RAIZ / "posts" / entrega, RAIZ / "entregas" / entrega
    post.mkdir(parents=True, exist_ok=True)
    ent.mkdir(parents=True, exist_ok=True)
    (post / "carrossel.html").write_text(carrossel_html, encoding="utf-8")
    (post / "story.html").write_text(story_html, encoding="utf-8")
    (ent / "legenda-instagram.txt").write_text(ig, encoding="utf-8")
    (ent / "legenda-linkedin.txt").write_text(li, encoding="utf-8")
    (ent / "info.json").write_text(json.dumps(info, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main():
    for n, (c, d) in enumerate(zip(VOCE_SABIA, sabados(len(VOCE_SABIA))), start=1):
        entrega = PREFIXO_SABIA + c["slug"]
        ig, li = legendas_sabia(c, n)
        info = {
            "titulo": f"Você sabia? Nota nº {n:02d} · {plano(c['pergunta'])}",
            "data": d.isoformat(),
            "descricao": f"Série educativa da Cerrado Contabilidade, \"Você sabia?\" ({n} de {len(VOCE_SABIA)}), no formato das notas explicativas do balanço.",
            "orientacoes": [
                f"Postar em {d.strftime('%d/%m')} (sugestão: a série educativa sai aos sábados).",
                "Carrossel: postar os 6 PNGs na ordem (carrossel-01 a 06) no Instagram e no LinkedIn.",
                "Carrossel animado (carrossel-animado.mp4, 1080×1350, com som): os mesmos slides em vídeo, para Reels e feed.",
                f"Story: adicionar o sticker de link para https://www.{LINK}",
                f"Regra conferida com a legislação em 28/10/2026 ({c['fonte']}). Se a lei mudar antes da data, revisar antes de postar.",
                "Legendas prontas abaixo, uma para cada rede.",
            ],
        }
        gravar(entrega, carrossel_sabia(c, n, entrega), story_sabia(c, n, entrega), ig, li, info)
        print(f"S{n}. {d.strftime('%d/%m')}  {entrega}")

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
                "Legendas prontas abaixo, uma para cada rede.",
            ],
        }
        (ent / "info.json").write_text(json.dumps(info, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"{n:2d}. {d.strftime('%d/%m')}  {entrega}")


if __name__ == "__main__":
    main()
