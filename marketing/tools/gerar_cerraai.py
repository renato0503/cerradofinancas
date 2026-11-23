"""Gera a série de conteúdo do Cerra.AI (plano em PLANEJAMENTO-cerraai.md): 25 campanhas em 4 séries.

A "Na sua área" (exemplos de uso por setor, sempre com o selo "Exemplo ilustrativo"), B "Por que local?" (os motivos
para usar), C "Mostra como faz" (tutoriais de funções testadas) e D "Mitos da IA local".

Identidade "Silício local" (brand/cerraai/marca.css). O que pode e o que não pode ser afirmado: regra 8 do
HISTORICO.md. Fonte: D:\\Dev\\Cerra.AI (docs/FUNCIONALIDADES.md, profiles/). Sem cliente, case, preço, prazo de
implantação, nuvem, multiusuário, Freedom Tier, certificação LGPD ou "sempre correto".

Marcação no texto: *x* = cobre (títulos), **x** = negrito, {x} = tarja de anonimização.

Uso:
    python tools/gerar_cerraai.py      # depois: exportar, animar-carrossel, agendar.py e publicar.py
"""
import json
import re
from html import escape
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
PREFIXO = "2026-11-cerraai-"
LOGO = "../../../img/logo_cerraai-icone.png"
LINK = "cerradofinancas.com.br/cerraai"
WHATS = "(67) 99351-5206"
TAGS_BASE = "#CerraAI #IALocal #IAOffline #LGPD #CerradoTech"
ILUSTRATIVO = "Exemplo ilustrativo"
FECHO_TELA = ('\n    <p class="sub" style="margin-top: auto; margin-bottom: 190px; font-size: 32px">A fonte vem '
              '<b style="color: var(--cobre)">embaixo da resposta</b>: é só abrir o arquivo na página indicada.</p>')
CONFIGURAVEL = "Cenário configurável: o painel do Cerra.AI cria uma base e regras próprias para a sua área."

SERIES = {"A": "Na sua área", "B": "Por que local?", "C": "Mostra como faz", "D": "Mitos da IA local"}


def cta(titulo="Veja com o *seu caso de uso*.", nota="Demonstração com os seus próprios documentos, na sua máquina."):
    return ("cta", dict(titulo=titulo, nota=nota))


CAMPANHAS = [
    # ---------------- A · Na sua área ----------------
    dict(slug="contabilidade", serie="A", nome="Escritório de contabilidade", tags="#Contabilidade #EscritorioContabil",
         slides=[
             ("capa", dict(rotulo="Na sua área · Contabilidade", titulo="A carteira inteira, *numa pergunta.*",
                           sub="Para o escritório de contabilidade que tem centenas de obrigações e não pode expor o dado do cliente.", selo=ILUSTRATIVO)),
             ("linhas", dict(rotulo="O dia a dia", titulo="Onde o *tempo vai embora*", itens=[
                 "Conferir, cliente por cliente, o que está **pendente**",
                 "Achar a regra certa no meio de **planilhas e PDFs**",
                 "Responder o cliente sem **mandar o dado dele** para fora"])),
             ("tela", dict(rotulo="A pergunta", titulo="Pergunte *como falaria.*", ws="Escritório de Contabilidade",
                           eu="Quais clientes do Simples estão com obrigação atrasada este mês?",
                           ia="Pelos documentos da carteira, **3 clientes** têm pendência: {Cliente 1} (DCTFWeb), {Cliente 2} (PGDAS-D) e {Cliente 3} (eSocial).",
                           cita="carteira_clientes.xlsx (aba Pendências)")),
             ("doc", dict(rotulo="O que fica protegido", titulo="O relatório sai *anonimizado.*", arquivo="relatorio_carteira.md", pag="LGPD",
                          linhas=["Cliente: {Padaria Exemplo Ltda}", "CNPJ {12.345.678/0001-00}", "Sócio: {Nome do Sócio} · CPF {123.456.789-00}"],
                          itens=["**Relatório da carteira** com os dados mascarados antes de chegar ao modelo",
                                 "Uma base **só do escritório**, separada das outras"])),
             ("linhas", dict(cobre=True, rotulo="O que ele não faz", titulo="Limites *que vêm de fábrica.*", itens=[
                 "**Não orienta** sonegação, caixa dois ou nota fria",
                 "**Não inventa** lei nem prazo: se não consta, ele diz",
                 "**Recusa** pergunta fora do tema do escritório"])),
             cta(),
         ]),
    dict(slug="advocacia-criminal", serie="A", nome="Escritório de advocacia criminal", tags="#Advocacia #DireitoPenal #Advogados",
         slides=[
             ("capa", dict(rotulo="Na sua área · Advocacia criminal", titulo="Os prazos da semana, *sem abrir pasta por pasta.*",
                           sub="Para o escritório que lida com sigilo, processo e prazo que não perdoa.", selo=ILUSTRATIVO)),
             ("linhas", dict(rotulo="O dia a dia", titulo="O que *pesa na rotina*", itens=[
                 "Prazos espalhados em **andamentos e PDFs**",
                 "O **sigilo do cliente** não pode ir para qualquer chat",
                 "Peças que exigem achar **a página certa** do processo"])),
             ("tela", dict(rotulo="A pergunta", titulo="Pergunte *como falaria.*", ws="Escritório de Advocacia Penal",
                           eu="Quais prazos vencem nesta semana na carteira?",
                           ia="Pelos andamentos, **2 prazos** vencem: resposta à acusação de {Cliente 1} e memoriais de {Cliente 2}. Confira a contagem no processo.",
                           cita="andamentos_outubro.pdf (p. 3, 7)")),
             ("doc", dict(rotulo="O que fica protegido", titulo="Nome e processo *viram tarja.*", arquivo="andamentos_outubro.pdf", pag="p. 3",
                          linhas=["Réu: {Nome do Cliente}", "Processo nº {0000000-00.2026.8.11.0000}", "Vítima: {Nome da Vítima}"],
                          itens=["**Relatório de prazos e audiências** com os nomes anonimizados",
                                 "A base do escritório **não cruza** com nenhuma outra"])),
             ("linhas", dict(cobre=True, rotulo="O que ele não faz", titulo="A ética *vem junto.*", itens=[
                 "**Não orienta** coagir testemunha nem destruir prova",
                 "**Explica o caminho lícito:** contradita, reperguntas, prova em contrário",
                 "**Recusa** pergunta fora do direito penal"])),
             cta(),
         ]),
    dict(slug="oncologia", serie="A", nome="Clínica de oncologia", tags="#Oncologia #Saude #ClinicaMedica",
         slides=[
             ("capa", dict(rotulo="Na sua área · Oncologia", titulo="O protocolo da clínica, *na hora que precisa.*",
                           sub="Para a equipe que trabalha com dado de paciente e protocolo que precisa estar à mão.", selo=ILUSTRATIVO)),
             ("linhas", dict(rotulo="O dia a dia", titulo="O que *não pode esperar*", itens=[
                 "Achar o **protocolo interno** no meio de muitos arquivos",
                 "Dado de paciente é **dado sensível** pela LGPD",
                 "Enfermagem, farmácia e faturamento com **dúvidas diferentes**"])),
             ("tela", dict(rotulo="A pergunta", titulo="Pergunte *como falaria.*", ws="Clínica de Oncologia",
                           eu="Qual é o protocolo da clínica para febre em paciente em quimioterapia?",
                           ia="Pelo protocolo interno, **é urgência:** avaliação imediata e aviso ao médico responsável, antes de qualquer outra conduta.",
                           cita="protocolo_neutropenia.pdf (p. 2)")),
             ("doc", dict(rotulo="O que fica protegido", titulo="O paciente *vira rótulo.*", arquivo="atendimentos_outubro.xlsx", pag="aba 1",
                          linhas=["Paciente: {Nome da Paciente}", "Prontuário {000123} · CNS {000 0000 0000 0000}", "Telefone {(65) 99999-0000}"],
                          itens=["**Relatório de atendimentos** agregado, sem listar pacientes",
                                 "CPF, CNS e telefone só chegam ao modelo **se a pergunta pedir**"])),
             ("linhas", dict(cobre=True, rotulo="O que ele não faz", titulo="Quem decide *é o médico.*", itens=[
                 "**Não muda** dose, droga ou intervalo sem prescrição",
                 "**Diante de urgência**, orienta avaliação imediata primeiro",
                 "**Não substitui** o julgamento clínico"])),
             cta(),
         ]),
    dict(slug="rh", serie="A", nome="RH e departamento pessoal", tags="#RH #DepartamentoPessoal #GestaoDePessoas",
         slides=[
             ("capa", dict(rotulo="Na sua área · RH", titulo="O regulamento interno *responde sozinho.*",
                           sub="Para o RH que responde as mesmas dúvidas todo dia e guarda dado de colaborador.", selo=ILUSTRATIVO)),
             ("linhas", dict(rotulo="O dia a dia", titulo="A mesma pergunta, *de novo*", itens=[
                 "Férias, licenças e benefícios: **as dúvidas se repetem**",
                 "A resposta está num **regulamento de muitas páginas**",
                 "Ficha de colaborador é **dado pessoal**"])),
             ("tela", dict(rotulo="A pergunta", titulo="Pergunte *como falaria.*", ws="Políticas de RH",
                           eu="Quantos dias de licença paternidade a política da empresa dá?",
                           ia="A política prevê **5 dias úteis**, que podem chegar a **20 dias** pelo Programa Empresa Cidadã, com o curso de orientação.",
                           cita="politica_ferias_licencas.pdf (item 4.2)", nota="Documento fictício de demonstração.")),
             ("linhas", dict(rotulo="Por que funciona", titulo="Uma base *só do RH.*", itens=[
                 "Os documentos do RH ficam **num workspace isolado**",
                 "A resposta **cita o item** do regulamento",
                 "Se a política **não fala** do assunto, ele avisa"])),
             ("linhas", dict(cobre=True, rotulo="Para a sua área", titulo="Configurado *para o seu RH.*", itens=[
                 "**Cenário configurável:** escopo, palavras-chave e limites",
                 "**Anonimiza** nome, CPF e PIS em relatórios",
                 "**Roda na sua máquina:** a ficha do colaborador não sai"])),
             cta(),
         ]),
    dict(slug="gestao-publica", serie="A", nome="Gestão pública", tags="#GestaoPublica #Licitacao #GovTech",
         slides=[
             ("capa", dict(rotulo="Na sua área · Gestão pública", titulo="O edital inteiro, *item por item.*",
                           sub="Para o órgão público que analisa editais e processos e trata dados do cidadão.", selo=ILUSTRATIVO)),
             ("linhas", dict(rotulo="O dia a dia", titulo="Páginas *que ninguém tem tempo* de ler", itens=[
                 "Editais e termos de referência **longos**",
                 "Processos administrativos com **muitos anexos**",
                 "Dado do cidadão sob a **LGPD**"])),
             ("tela", dict(rotulo="A pergunta", titulo="Pergunte *como falaria.*", ws="Licitações",
                           eu="O edital exige atestado de capacidade técnica? Em qual item?",
                           ia="Sim. O edital pede **atestado de capacidade técnica** compatível com o objeto, no item de habilitação técnica.",
                           cita="edital_pregao_eletronico.pdf (p. 14)")),
             ("linhas", dict(rotulo="Por que funciona", titulo="Rastreável *do começo ao fim.*", itens=[
                 "Toda resposta **mostra a página** de onde veio",
                 "Uso registrado em **auditoria** com os dados mascarados",
                 "**Roda dentro do órgão**, sem enviar o processo para fora"])),
             ("linhas", dict(cobre=True, rotulo="O que ele não faz", titulo="Apoia, *não decide.*", itens=[
                 "**Não substitui** a comissão nem o parecer jurídico",
                 "**Não inventa** exigência que o edital não tem",
                 "**Cenário configurável** para a rotina do órgão"])),
             cta(),
         ]),
    dict(slug="cartorios", serie="A", nome="Cartórios", tags="#Cartorio #Notarial #Registro",
         slides=[
             ("capa", dict(rotulo="Na sua área · Cartórios", titulo="O manual de atos, *a uma pergunta.*",
                           sub="Para a serventia que segue provimentos, manuais e guarda documentos de muita gente.", selo=ILUSTRATIVO)),
             ("linhas", dict(rotulo="O dia a dia", titulo="Muita regra, *muito documento*", itens=[
                 "Provimentos e **manuais internos** que mudam",
                 "Escreventes novos com **as mesmas dúvidas**",
                 "Documentos pessoais de **todos os usuários**"])),
             ("tela", dict(rotulo="A pergunta", titulo="Pergunte *como falaria.*", ws="Manual de atos",
                           eu="Quais documentos o manual pede para uma escritura de compra e venda?",
                           ia="Pelo manual interno, o checklist tem **documentos das partes, do imóvel e as certidões** listadas na seção de escrituras.",
                           cita="manual_atos_notariais.pdf (p. 22)")),
             ("doc", dict(rotulo="O que fica protegido", titulo="Os dados *das partes* ficam em casa.", arquivo="minuta_escritura.docx", pag="p. 1",
                          linhas=["Outorgante: {Nome da Parte}", "CPF {123.456.789-00} · RG {1234567}", "Matrícula {00.000}"],
                          itens=["**Anonimizar** um texto antes de compartilhar, sem gravar nada",
                                 "**Exclusão física** do documento quando pedirem"])),
             ("linhas", dict(cobre=True, rotulo="Para a sua área", titulo="Configurado *para a serventia.*", itens=[
                 "**Cenário configurável** com o vocabulário do cartório",
                 "**Não substitui** a qualificação do tabelião",
                 "**Roda na serventia**, sem internet"])),
             cta(),
         ]),
    dict(slug="juridico-corporativo", serie="A", nome="Jurídico e compliance corporativo", tags="#Juridico #Compliance #Contratos",
         slides=[
             ("capa", dict(rotulo="Na sua área · Jurídico corporativo", titulo="A cláusula certa, *em segundos.*",
                           sub="Para o jurídico e o compliance que revisam contratos e não podem expor a estratégia da empresa.", selo=ILUSTRATIVO)),
             ("linhas", dict(rotulo="O dia a dia", titulo="Contrato *demais*, tempo *de menos*", itens=[
                 "Centenas de **contratos e aditivos**",
                 "Due diligence com **milhares de páginas**",
                 "Informação **estratégica e confidencial**"])),
             ("tela", dict(rotulo="A pergunta", titulo="Pergunte *como falaria.*", ws="Contratos de fornecedores",
                           eu="Este contrato tem multa por rescisão antecipada?",
                           ia="Sim. A **cláusula de rescisão** prevê multa proporcional ao período restante, com aviso prévio por escrito.",
                           cita="contrato_fornecedor.pdf (p. 6)")),
             ("linhas", dict(rotulo="Por que funciona", titulo="Cada área, *a sua base.*", itens=[
                 "Contratos, políticas e auditoria em **bases separadas**",
                 "A resposta **aponta a página** para conferir",
                 "O documento **não sai** da empresa"])),
             ("linhas", dict(cobre=True, rotulo="O que ele não faz", titulo="Acelera, *não assina.*", itens=[
                 "**Não substitui** a revisão do advogado",
                 "**Diz quando não consta** no contrato",
                 "**Cenário configurável** para o seu jurídico"])),
             cta(),
         ]),
    dict(slug="home-care", serie="A", nome="Saúde e home care", tags="#HomeCare #Saude #Cuidadores",
         slides=[
             ("capa", dict(rotulo="Na sua área · Home care", titulo="O procedimento certo, *na casa do paciente.*",
                           sub="Para a equipe de cuidado que precisa do procedimento à mão e lida com dado de saúde.", selo=ILUSTRATIVO)),
             ("linhas", dict(rotulo="O dia a dia", titulo="Cuidado *que não pode errar*", itens=[
                 "Procedimentos e rotinas em **vários documentos**",
                 "Equipe em **plantões diferentes**",
                 "Dado de saúde é **sensível** pela LGPD"])),
             ("tela", dict(rotulo="A pergunta", titulo="Pergunte *como falaria.*", ws="Procedimentos de cuidado",
                           eu="Qual é o checklist da rotina da manhã?",
                           ia="Pelo procedimento interno, a rotina tem **sinais vitais, higiene, medicação conferida e registro** do que foi feito.",
                           cita="procedimentos_home_care.pdf (p. 4)")),
             ("linhas", dict(rotulo="Por que funciona", titulo="Simples *para quem cuida.*", itens=[
                 "Pergunta em **linguagem do dia a dia**",
                 "Resposta com **a fonte** para conferir",
                 "**Funciona sem internet**"])),
             ("linhas", dict(cobre=True, rotulo="O que ele não faz", titulo="Quem prescreve *é o profissional.*", itens=[
                 "**Não muda** medicação sem prescrição",
                 "**Em urgência**, orienta acionar o responsável",
                 "**Cenário configurável** para a sua equipe"])),
             cta(),
         ]),
    dict(slug="industria", serie="A", nome="Indústria e operação", tags="#Industria #Manutencao #Operacao",
         slides=[
             ("capa", dict(rotulo="Na sua área · Indústria", titulo="O manual da máquina, *no chão de fábrica.*",
                           sub="Para a operação que depende de manual técnico e não pode deixar o segredo industrial sair.", selo=ILUSTRATIVO)),
             ("linhas", dict(rotulo="O dia a dia", titulo="A resposta *está no manual*", itens=[
                 "Manuais técnicos de **centenas de páginas**",
                 "Procedimentos gravados em **vídeo e áudio**",
                 "Processo e fórmula são **segredo industrial**"])),
             ("tela", dict(rotulo="A pergunta", titulo="Pergunte *como falaria.*", ws="Manuais da linha 2",
                           eu="Qual é o torque de aperto do flange no manual da linha 2?",
                           ia="O manual indica o **torque de aperto** do flange na tabela de montagem, com a sequência em cruz.",
                           cita="manual_linha2.pdf (p. 41)")),
             ("linhas", dict(rotulo="Por que funciona", titulo="Lê *o que a fábrica tem.*", itens=[
                 "PDF escaneado com **OCR offline**",
                 "Vídeo de treinamento **transcrito na máquina**",
                 "**Funciona sem internet**, até no chão de fábrica"])),
             ("linhas", dict(cobre=True, rotulo="Para a sua área", titulo="O segredo *fica em casa.*", itens=[
                 "**Zero requisições externas**",
                 "**Bases separadas** por linha ou por área",
                 "**Cenário configurável** para a sua operação"])),
             cta(),
         ]),
    # ---------------- B · Por que local? ----------------
    dict(slug="sigilo", serie="B", nome="Sigilo profissional", tags="#SigiloProfissional #Advocacia #Contabilidade",
         slides=[
             ("capa", dict(rotulo="Por que local? · Sigilo", titulo="O sigilo do cliente *cabe num chat da internet?*",
                           sub="Advogado, contador e médico têm dever de sigilo. A IA precisa respeitar isso.")),
             ("linhas", dict(rotulo="O risco", titulo="Colar é *enviar.*", itens=[
                 "Ao colar um documento num chat da internet, ele **sai do seu ambiente**",
                 "Você **não controla** onde ele fica guardado",
                 "O dever de sigilo **continua sendo seu**"])),
             ("versus", dict(rotulo="A diferença", titulo="Onde *o dado fica*", linhas=[
                 ("Sai do ambiente", "Fica na sua máquina"), ("Depende de internet", "Funciona offline"),
                 ("Uma conversa só", "Base separada por cliente")])),
             ("linhas", dict(rotulo="No Cerra.AI", titulo="Sigilo *por arquitetura.*", itens=[
                 "**Zero requisições externas**, conferido em teste",
                 "**Base isolada** para cada cliente ou área",
                 "**Auditoria** com o conteúdo mascarado"])),
             ("frase", dict(texto="Sigilo não é *configuração.* É onde o dado *fica.*")),
             cta(),
         ]),
    dict(slug="lgpd", serie="B", nome="LGPD", tags="#LGPD #ProtecaoDeDados #DPO",
         slides=[
             ("capa", dict(rotulo="Por que local? · LGPD", titulo="O dado mais protegido *é o que não sai de casa.*",
                           sub="A LGPD pede que você trate só o necessário. O Cerra.AI foi desenhado assim.")),
             ("linhas", dict(rotulo="O que a lei pede", titulo="Menos dado, *menos risco.*", itens=[
                 "**Minimização:** tratar só o dado necessário (art. 6º, III)",
                 "**Segurança:** proteger contra acesso indevido",
                 "**Eliminação:** apagar quando o titular pedir"])),
             ("doc", dict(rotulo="Antes do modelo", titulo="Anonimiza *primeiro.*", arquivo="contrato_locacao.pdf", pag="p. 1",
                          linhas=["Locatário: {Nome Fictício}", "CPF {123.456.789-00}", "E-mail {nome@exemplo.com}"],
                          itens=["CPF, RG, telefone e e‑mail **só chegam ao modelo se a pergunta pedir**"])),
             ("linhas", dict(rotulo="No Cerra.AI", titulo="LGPD *no dia a dia.*", itens=[
                 "**Relatório LGPD** com os dados anonimizados",
                 "**Auditoria** que não guarda dado pessoal em texto claro",
                 "**Direito ao esquecimento:** o documento sai do disco"])),
             ("frase", dict(texto="Ajuda a cumprir a LGPD *sem tirar o dado* de casa.")),
             cta(),
         ]),
    dict(slug="ia-escondida", serie="B", nome="A IA que a equipe já usa", tags="#ShadowAI #GestaoDeTI #Compliance",
         slides=[
             ("capa", dict(rotulo="Por que local? · A equipe", titulo="A sua equipe já usa IA. *Qual, e com quais dados?*",
                           sub="Proibir não resolve. Dar uma IA segura, dentro de casa, resolve.")),
             ("linhas", dict(rotulo="O que acontece", titulo="A IA *que ninguém vê*", itens=[
                 "Contrato colado num **chat qualquer**",
                 "Planilha de cliente enviada para **resumir**",
                 "Sem registro de **quem usou o quê**"])),
             ("versus", dict(rotulo="A diferença", titulo="IA escondida *x IA oficial*", linhas=[
                 ("Cada um usa uma", "Uma IA da empresa"), ("Sem regra", "Escopo e limites por área"),
                 ("Sem registro", "Auditoria de uso")])),
             ("linhas", dict(rotulo="No Cerra.AI", titulo="Uma IA *com regras.*", itens=[
                 "**Recusa** pergunta fora do tema da área",
                 "**Limites éticos** por cenário",
                 "**Registro** de uso com os dados mascarados"])),
             ("frase", dict(texto="Dê à equipe *a IA certa* antes que ela escolha *a errada.*")),
             cta(),
         ]),
    dict(slug="offline", serie="B", nome="Funciona sem internet", tags="#Offline #Continuidade #TI",
         slides=[
             ("capa", dict(rotulo="Por que local? · Offline", titulo="Caiu a internet. *O Cerra.AI continua.*",
                           sub="Depois de instalado, ele roda inteiro na máquina, sem depender de conexão.")),
             ("linhas", dict(rotulo="O risco", titulo="Quando a IA *depende de fora*", itens=[
                 "Internet instável **para o trabalho**",
                 "Serviço de fora fora do ar, **trabalho parado**",
                 "Dado sensível **trafegando** na rede"])),
             ("versus", dict(rotulo="A diferença", titulo="Na nuvem *x na máquina*", linhas=[
                 ("Precisa de internet", "Funciona offline"), ("Dado trafega", "Dado fica"), ("Depende do serviço de fora", "Roda na sua máquina")])),
             ("linhas", dict(rotulo="No Cerra.AI", titulo="Testado *sem internet.*", itens=[
                 "**Documentos, áudio e interface** testados com a internet bloqueada",
                 "**OCR e transcrição** também offline",
                 "**Fontes e telas** servidas pelo próprio app"])),
             ("frase", dict(texto="A IA *mais disponível* é a que mora *na sua máquina.*")),
             cta(),
         ]),
    dict(slug="fonte", serie="B", nome="Resposta com fonte", tags="#IA #Confianca #RAG",
         slides=[
             ("capa", dict(rotulo="Por que local? · Confiança", titulo="Uma IA que mostra *a página da resposta.*",
                           sub="Confiar não é acreditar. É conferir em segundos.")),
             ("linhas", dict(rotulo="O problema", titulo="Resposta *sem fonte*", itens=[
                 "A IA responde com **segurança**, mesmo errada",
                 "Você **não sabe** de onde veio",
                 "Conferir vira **outro trabalho**"])),
             ("tela", dict(rotulo="No Cerra.AI", titulo="A fonte *embaixo de tudo.*", ws="Contratos",
                           eu="Qual é o prazo de aviso prévio do contrato?",
                           ia="O contrato prevê **aviso prévio por escrito**, na cláusula de rescisão.",
                           cita="contrato.pdf (p. 2, 5)")),
             ("linhas", dict(rotulo="E quando não está lá?", titulo="Ele *diz que não consta.*", itens=[
                 "Norma e dado da empresa **só pelos documentos**",
                 "Se não está na base, **ele avisa**",
                 "Revisar continua **com você**, agora em segundos"])),
             ("frase", dict(texto="A resposta *e a prova*, na mesma tela.")),
             cta(),
         ]),
    dict(slug="arquivos-esquecidos", serie="B", nome="Arquivos esquecidos", tags="#GestaoDoConhecimento #Documentos #Produtividade",
         slides=[
             ("capa", dict(rotulo="Por que local? · Conhecimento", titulo="Aquela reunião gravada *também responde.*",
                           sub="O que a empresa sabe está em PDF, planilha, áudio e vídeo. O Cerra.AI lê tudo.")),
             ("linhas", dict(rotulo="O problema", titulo="O que a empresa sabe *e não acha*", itens=[
                 "Reuniões gravadas que **ninguém revê**",
                 "PDFs **escaneados** que a busca não lê",
                 "Planilhas com **abas e mais abas**"])),
             ("parede", dict(rotulo="Entra o que você tem", palavras=["PDF", "Word", "Excel", "PPT", "Imagem", "Áudio", "Vídeo", "CSV"])),
             ("linhas", dict(rotulo="No Cerra.AI", titulo="Tudo *vira resposta.*", itens=[
                 "**OCR offline** para PDF escaneado e imagem",
                 "**Transcrição** de áudio e vídeo, com a marca de tempo",
                 "Cada trecho guarda **o arquivo e a página**"])),
             ("frase", dict(texto="O conhecimento da empresa, *finalmente pesquisável.*")),
             cta(),
         ]),
    # ---------------- C · Mostra como faz ----------------
    dict(slug="audio-reuniao", serie="C", nome="Perguntar a uma reunião gravada", tags="#Produtividade #Reunioes #Transcricao",
         slides=[
             ("capa", dict(rotulo="Mostra como faz · 1", titulo="Pergunte *a uma reunião gravada.*",
                           sub="Envie o áudio ou o vídeo e pergunte o que foi decidido.", selo="Função disponível hoje", ok=True)),
             ("passos", dict(rotulo="Passo a passo", titulo="Em *três passos*", passos=[
                 ("Anexe o arquivo", "MP3, WAV, M4A, MP4 e outros, pelo clipe"),
                 ("Ele transcreve na máquina", "Em português, com a marca de tempo"),
                 ("Pergunte", "\"O que ficou decidido sobre o orçamento?\"")])),
             ("tela", dict(rotulo="O resultado", titulo="A resposta *com o minuto.*", ws="Reuniões da diretoria",
                           eu="O que ficou decidido sobre o orçamento?",
                           ia="Ficou decidido **revisar o orçamento** na próxima reunião, com a área financeira apresentando os números.",
                           cita="reuniao_diretoria.mp4 ([00:12:30])", nota="Exemplo ilustrativo.")),
             ("linhas", dict(rotulo="Bom saber", titulo="O que *acontece por trás*", itens=[
                 "A transcrição roda **no processador da máquina**",
                 "**Nada é enviado** para fora",
                 "O texto entra na **base do workspace**"])),
             ("linhas", dict(cobre=True, rotulo="Por que importa", titulo="Ninguém *precisa rever* a reunião.", itens=[
                 "**Decisões** encontradas em segundos",
                 "**Novos na equipe** se atualizam rápido",
                 "**Treinamentos gravados** viram consulta"])),
             cta(titulo="Quer ver *ao vivo?*", nota="Agende uma demonstração com um áudio seu."),
         ]),
    dict(slug="pdf-escaneado", serie="C", nome="PDF escaneado", tags="#OCR #Documentos #Digitalizacao",
         slides=[
             ("capa", dict(rotulo="Mostra como faz · 2", titulo="PDF escaneado *também conta.*",
                           sub="Papel digitalizado vira texto pesquisável, com a página na resposta.", selo="Função disponível hoje", ok=True)),
             ("passos", dict(rotulo="Passo a passo", titulo="Em *três passos*", passos=[
                 ("Anexe o PDF", "Com texto ou escaneado, até 200 MB"),
                 ("O OCR lê as páginas", "Automático nas páginas sem texto"),
                 ("Pergunte", "A resposta cita a página")])),
             ("doc", dict(rotulo="O que ele faz", titulo="Da imagem *ao texto.*", arquivo="contrato_digitalizado.pdf", pag="p. 3",
                          linhas=["CLÁUSULA 7ª · DO PRAZO", "O presente contrato vigorará", "pelo prazo de doze meses..."],
                          itens=["**Lê acentos** do português", "**Não inventa** texto em página ilegível"])),
             ("linhas", dict(rotulo="Bom saber", titulo="Ao terminar, *um resumo*", itens=[
                 "Quantas páginas, **quantas lidas por OCR**",
                 "Reenviar o arquivo **substitui** a versão antiga",
                 "Arquivo sem texto legível **dá aviso claro**"])),
             ("linhas", dict(cobre=True, rotulo="Por que importa", titulo="O arquivo morto *volta a falar.*", itens=[
                 "**Contratos antigos** pesquisáveis", "**Documentos assinados** em papel", "**Tudo offline**"])),
             cta(titulo="Quer ver *ao vivo?*", nota="Agende uma demonstração com um PDF seu."),
         ]),
    dict(slug="relatorio-lgpd", serie="C", nome="Relatório LGPD", tags="#LGPD #Relatorios #Anonimizacao",
         slides=[
             ("capa", dict(rotulo="Mostra como faz · 3", titulo="Um relatório *sem dado pessoal.*",
                           sub="O Relatório LGPD anonimiza os documentos antes de eles chegarem ao modelo.", selo="Função disponível hoje", ok=True)),
             ("passos", dict(rotulo="Passo a passo", titulo="Em *três passos*", passos=[
                 ("Abra o Relatório LGPD", "Na barra lateral do workspace"),
                 ("Escolha o tipo", "Carteira, prazos, atendimentos, folha..."),
                 ("Receba a tabela", "Com a contagem do que foi mascarado")])),
             ("doc", dict(rotulo="O resultado", titulo="Nomes *viram rótulos.*", arquivo="relatorio.md", pag="LGPD",
                          linhas=["[PESSOA_1] · prazo em 3 dias", "[PESSOA_2] · audiência dia 12", "Mascarados: 14 nomes, 9 CPFs"],
                          itens=["**Copiar** ou **baixar** o relatório em .md"])),
             ("linhas", dict(rotulo="Bom saber", titulo="Cada área, *os seus relatórios*", itens=[
                 "**Contabilidade:** carteira e folha", "**Advocacia:** carteira, prazos e audiências",
                 "**Oncologia:** atendimentos e toxicidades"])),
             ("linhas", dict(cobre=True, rotulo="Por que importa", titulo="Gestão *sem exposição.*", itens=[
                 "**Relatórios gerenciais** sem dado pessoal", "**A base de referência** não entra", "**Roda na máquina**"])),
             cta(titulo="Quer ver *ao vivo?*", nota="Agende uma demonstração do Relatório LGPD."),
         ]),
    dict(slug="anonimizar", serie="C", nome="Anonimizar um texto", tags="#Anonimizacao #LGPD #Privacidade",
         slides=[
             ("capa", dict(rotulo="Mostra como faz · 4", titulo="Anonimize *antes de enviar.*",
                           sub="Cole um texto ou envie um arquivo: o Cerra.AI devolve a versão sem dado pessoal.", selo="Função disponível hoje", ok=True)),
             ("passos", dict(rotulo="Passo a passo", titulo="Em *três passos*", passos=[
                 ("Abra Anonimizar", "Na barra lateral"), ("Cole o texto ou envie o arquivo", "Qualquer formato aceito pelo upload"),
                 ("Copie o resultado", "Pronto para compartilhar")])),
             ("doc", dict(rotulo="O resultado", titulo="Pronto *para compartilhar.*", arquivo="email_cliente.txt", pag="anonimizado",
                          linhas=["Prezado {Nome do Cliente},", "segue o cálculo do CPF {123.456.789-00}", "Contato: {(65) 99999-0000}"],
                          itens=["**Nada é indexado** nem gravado"])),
             ("linhas", dict(rotulo="Quando usar", titulo="No *dia a dia*", itens=[
                 "Antes de mandar um caso para **um colega de fora**", "Para montar **material de treinamento**",
                 "Para pedir ajuda **sem expor** o cliente"])),
             ("linhas", dict(cobre=True, rotulo="Por que importa", titulo="Privacidade *em um clique.*", itens=[
                 "**Nome, CPF, RG, processo, telefone, e-mail**", "**Roda na máquina**", "**Sem cadastro**"])),
             cta(titulo="Quer ver *ao vivo?*", nota="Agende uma demonstração com um texto seu."),
         ]),
    dict(slug="workspaces", serie="C", nome="Uma base por cliente", tags="#Organizacao #SegurancaDaInformacao #Workspaces",
         slides=[
             ("capa", dict(rotulo="Mostra como faz · 5", titulo="Uma base *por cliente.*",
                           sub="O que está num workspace nunca aparece na resposta do outro.", selo="Função disponível hoje", ok=True)),
             ("passos", dict(rotulo="Passo a passo", titulo="Em *três passos*", passos=[
                 ("Crie o workspace", "\"+ Novo Workspace\" e o nome"), ("Escolha um cenário, se quiser", "Já nasce com base e regras"),
                 ("Envie os documentos", "Eles ficam só naquela base")])),
             ("tela", dict(rotulo="O resultado", titulo="Cada base *no seu lugar.*", ws="Cliente B",
                           eu="Qual é o valor do contrato do Cliente A?",
                           ia="Essa informação **não consta** nos documentos deste workspace.", cita="nenhum trecho deste workspace", nota="Exemplo ilustrativo.")),
             ("linhas", dict(rotulo="Bom saber", titulo="Isolamento *de verdade*", itens=[
                 "Cada workspace tem **a sua base vetorial**", "Excluir um workspace **apaga os documentos** dele",
                 "Só **o administrador** exclui"])),
             ("linhas", dict(cobre=True, rotulo="Por que importa", titulo="Nenhum cliente *vaza para o outro.*", itens=[
                 "**Escritórios** com muitos clientes", "**Áreas** que não podem se misturar", "**Projetos** confidenciais"])),
             cta(titulo="Quer ver *ao vivo?*", nota="Agende uma demonstração com dois workspaces."),
         ]),
    dict(slug="esquecimento", serie="C", nome="Direito ao esquecimento", tags="#LGPD #DireitoAoEsquecimento #Privacidade",
         slides=[
             ("capa", dict(rotulo="Mostra como faz · 6", titulo="Apagar *é apagar de verdade.*",
                           sub="Quando o titular pede, o documento sai da base e do disco.", selo="Função disponível hoje", ok=True)),
             ("passos", dict(rotulo="Passo a passo", titulo="Em *dois passos*", passos=[
                 ("Ache o documento", "No painel de documentos do workspace"), ("Remova", "Clique no ✕ e confirme")])),
             ("linhas", dict(rotulo="O que acontece", titulo="A base *é refeita.*", itens=[
                 "A base do workspace é **refeita sem os trechos** do arquivo",
                 "O texto **não fica** em nenhum arquivo do disco",
                 "A exclusão fica **registrada na auditoria**"])),
             ("versus", dict(rotulo="A diferença", titulo="Esconder *x apagar*", linhas=[
                 ("Some da lista", "Sai do disco"), ("O texto continua guardado", "O texto não fica"), ("Sem registro", "Auditoria")])),
             ("linhas", dict(cobre=True, rotulo="Por que importa", titulo="O pedido do titular, *cumprido.*", itens=[
                 "**LGPD:** eliminação quando pedirem", "**Testado** em rotina própria", "**Na sua máquina**"])),
             cta(titulo="Quer ver *ao vivo?*", nota="Agende uma demonstração da exclusão."),
         ]),
    # ---------------- D · Mitos ----------------
    dict(slug="mito-supercomputador", serie="D", nome="Mito: precisa de supercomputador", tags="#IALocal #Mitos #TI",
         slides=[
             ("mito", dict(rotulo="Mitos da IA local · 1", mito="IA local precisa de um supercomputador.")),
             ("linhas", dict(rotulo="A verdade", titulo="Roda *numa máquina comum.*", itens=[
                 "Foi medido numa máquina com **placa de vídeo de 8 GB**",
                 "Um **roteador** escolhe o modelo certo para cada pergunta",
                 "Saudações vão para o **modelo leve**, o resto para o intermediário"])),
             ("linhas", dict(rotulo="Como", titulo="Inteligência *na escolha.*", itens=[
                 "Se um modelo falhar, a resposta **cai para um menor**", "Os modelos ficam **carregados e prontos**",
                 "Um **monitor** mostra o desempenho ao vivo"])),
             ("linhas", dict(cobre=True, rotulo="O que não prometemos", titulo="Honestidade *técnica.*", itens=[
                 "O desempenho **depende da máquina**", "A gente **mede no seu ambiente** antes", "Sem número que não testamos"])),
             ("frase", dict(texto="Não é sobre a maior máquina. *É sobre a escolha certa.*")),
             cta(titulo="Veja *na sua máquina.*", nota="A demonstração mostra o desempenho no seu ambiente."),
         ]),
    dict(slug="mito-inventa", serie="D", nome="Mito: IA sempre inventa", tags="#IA #Confianca #Mitos",
         slides=[
             ("mito", dict(rotulo="Mitos da IA local · 2", mito="Toda IA inventa resposta.")),
             ("linhas", dict(rotulo="A verdade", titulo="Ele *mostra a fonte.*", itens=[
                 "Norma e dado da empresa **só pelos documentos**", "Toda resposta traz **arquivo e página**",
                 "Se não consta, **ele diz que não consta**"])),
             ("tela", dict(rotulo="Na prática", titulo="Quando *não está lá*", ws="Políticas internas",
                           eu="Qual é o salário do diretor financeiro?",
                           ia="Essa informação **não consta** nos documentos deste workspace.", cita="nenhum trecho encontrado", nota="Exemplo ilustrativo.")),
             ("linhas", dict(cobre=True, rotulo="O que não prometemos", titulo="Nenhuma IA *é infalível.*", itens=[
                 "**Revisar** continua sendo papel da pessoa", "A diferença é **conferir em segundos**", "Sem promessa de \"sempre certo\""])),
             ("frase", dict(texto="Confiar *é poder conferir.*")),
             cta(),
         ]),
    dict(slug="mito-ti", serie="D", nome="Mito: precisa de equipe de TI", tags="#TI #Implantacao #Mitos",
         slides=[
             ("mito", dict(rotulo="Mitos da IA local · 3", mito="Para ter IA própria, eu preciso de uma equipe de TI.")),
             ("linhas", dict(rotulo="A verdade", titulo="A gente *cuida disso.*", itens=[
                 "A **implantação** fica com a equipe da Cerrado Tech", "A **manutenção** também", "Sua TI **não fica sobrecarregada**"])),
             ("passos", dict(rotulo="Como começa", titulo="Do primeiro contato *ao uso*", passos=[
                 ("Demonstração", "Com o seu caso de uso"), ("Implantação", "Na sua máquina, com a nossa equipe"),
                 ("Uso e suporte", "A equipe acompanha")])),
             ("linhas", dict(cobre=True, rotulo="Para quem usa", titulo="Simples *como um chat.*", itens=[
                 "**Pergunta** em linguagem do dia a dia", "**Clipe** para anexar arquivos", "**Painel** para o administrador"])),
             ("frase", dict(texto="Você usa. *A gente mantém.*")),
             cta(),
         ]),
    dict(slug="mito-tudo-igual", serie="D", nome="Mito: IA é tudo igual", tags="#IACorporativa #Mitos #Seguranca",
         slides=[
             ("mito", dict(rotulo="Mitos da IA local · 4", mito="IA corporativa é tudo igual.")),
             ("versus", dict(rotulo="A verdade", titulo="Compare *três perguntas*", linhas=[
                 ("Onde fica o dado?", "Na sua máquina"), ("Precisa de internet?", "Não"), ("Mostra a fonte?", "Arquivo e página")])),
             ("linhas", dict(rotulo="E mais", titulo="O que *faz diferença*", itens=[
                 "**Bases separadas** por cliente ou área", "**Anonimização** antes do modelo", "**Limites éticos** por cenário"])),
             ("linhas", dict(cobre=True, rotulo="Para escolher", titulo="Pergunte *ao fornecedor.*", itens=[
                 "**Para onde** vai o meu documento?", "**Como eu confiro** a resposta?", "**Como eu apago** um dado?"])),
             ("frase", dict(texto="Não é tudo igual. *Pergunte onde o dado fica.*")),
             cta(),
         ]),
]

# Ordem de postagem: começa pelos cenários prontos e alterna as séries
ORDEM = ["contabilidade", "sigilo", "audio-reuniao", "advocacia-criminal", "mito-supercomputador", "lgpd", "oncologia",
         "pdf-escaneado", "ia-escondida", "rh", "mito-inventa", "relatorio-lgpd", "gestao-publica", "offline", "anonimizar",
         "juridico-corporativo", "mito-ti", "fonte", "cartorios", "workspaces", "home-care", "arquivos-esquecidos",
         "mito-tudo-igual", "esquecimento", "industria"]


def marca(texto):
    s = escape(texto)
    s = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", s)
    s = re.sub(r"\*([^*]+)\*", r'<span class="c">\1</span>', s)
    return re.sub(r"\{([^}]+)\}", r'<span class="tarja">\1</span>', s)


def plano(texto):
    return re.sub(r"\{[^}]+\}", "███", texto.replace("**", "").replace("*", ""))


def cabe(texto, base, largura=900):
    """Tamanho de fonte em que a maior palavra (caixa alta expandida) cabe na largura do slide."""
    maior = max((len(w) for w in re.split(r"\s+", plano(texto))), default=1)
    return min(base, int(largura / (maior * 0.98)))


def inseparavel(texto):
    return re.sub(r"(?<=\w)-(?=\w)", "‑", texto)


CAB = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="entrega" content="{entrega}">
  <meta name="formato" content="{formato}">
  <title>{titulo}</title>
  <link rel="stylesheet" href="../../brand/cerraai/marca.css">
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
      <span class="marca"><img src="{LOGO}" alt=""> Cerra.AI <small>by Cerrado Tech</small></span>
      {direita}
    </div>"""


def lista(itens, estilo=""):
    lis = "".join(f"<li><span>{marca(inseparavel(i))}</span></li>" for i in itens)
    return f'<ul class="linhas"{f" style=\"{estilo}\"" if estilo else ""}>{lis}</ul>'


def slide_html(tipo, d, primeiro):
    classe = "cobre" if d.get("cobre") or tipo == "frase" else ""
    t = d.get("titulo", "")
    tam = lambda base, limite: f' style="font-size: {base}px"' if len(plano(t)) > limite else ""
    if tipo == "capa":
        selo = f'<span class="selo{" ok" if d.get("ok") else ""}" style="margin-top: auto; margin-bottom: 190px">{escape(d["selo"])}</span>' if d.get("selo") else ""
        miolo = f"""    <p class="rotulo">{escape(d['rotulo'])}</p>
    <h1 class="mega" style="font-size: {cabe(t, 92 if len(plano(t)) > 34 else 118)}px">{marca(t)}</h1>
    <p class="sub" style="margin-top: 40px; max-width: 620px">{marca(d['sub'])}</p>
    {selo}
    <img class="emblema" data-sangra style="width: 340px; right: -110px; bottom: 150px" src="{LOGO}" alt="">"""
    elif tipo == "mito":
        miolo = f"""    <p class="rotulo">{escape(d['rotulo'])}</p>
    <span class="carimbo">Mito</span>
    <h1 class="mega" style="font-size: {cabe(d['mito'], 84 if len(d['mito']) > 40 else 100)}px">“{escape(d['mito'])}”</h1>
    <p class="sub" style="margin-top: auto; margin-bottom: 190px">Arraste para ver <span style="color: var(--cobre)">a verdade</span>.</p>
    <img class="emblema" data-sangra style="width: 340px; right: -110px; bottom: 150px" src="{LOGO}" alt="">"""
    elif tipo == "linhas":
        miolo = f"""    <p class="rotulo">{escape(d['rotulo'])}</p>
    <h2 class="titulo"{tam(72, 30)}>{marca(t)}</h2>
    {lista(d['itens'])}"""
    elif tipo == "tela":
        nota = f'<p class="selo" style="margin-top: 34px">{escape(d["nota"])}</p>' if d.get("nota") else ""
        nota += FECHO_TELA
        miolo = f"""    <p class="rotulo">{escape(d['rotulo'])}</p>
    <h2 class="titulo"{tam(72, 30)}>{marca(t)}</h2>
    <div class="tela">
      <div class="barra"><span>Workspace: <b>{escape(d['ws'])}</b></span><span class="local">local</span></div>
      <div class="corpo">
        <span class="eu">{escape(d['eu'])}</span>
        <span class="ia">{marca(d['ia'])}</span>
        <span class="cita">Trechos consultados: {escape(d['cita'])}</span>
      </div>
    </div>
    {nota}"""
    elif tipo == "doc":
        linhas = "<br>\n      ".join(marca(x) for x in d["linhas"])
        miolo = f"""    <p class="rotulo">{escape(d['rotulo'])}</p>
    <h2 class="titulo"{tam(72, 30)}>{marca(t)}</h2>
    <div class="doc">
      <div class="cab"><span>{escape(d['arquivo'])}</span><span>{escape(d['pag'])}</span></div>
      {linhas}
    </div>
    {lista(d['itens'], 'margin-top: 48px')}"""
    elif tipo == "versus":
        celulas = '<div class="cab">IA na nuvem</div><div class="cab">Cerra.AI</div>' if d["rotulo"] != "A verdade" or "Compare" not in t \
            else '<div class="cab">Pergunta</div><div class="cab">Cerra.AI</div>'
        if "Esconder" in t:
            celulas = '<div class="cab">Exclusão comum</div><div class="cab">Cerra.AI</div>'
        if "escondida" in t:
            celulas = '<div class="cab">IA escondida</div><div class="cab">Cerra.AI</div>'
        celulas += "".join(f"<div>{escape(a)}</div><div>{escape(b)}</div>" for a, b in d["linhas"])
        miolo = f"""    <p class="rotulo">{escape(d['rotulo'])}</p>
    <h2 class="titulo"{tam(72, 30)}>{marca(t)}</h2>
    <div class="versus">{celulas}</div>
    <p class="sub" style="margin-top: auto; margin-bottom: 190px; font-size: 30px">Comparação genérica, sem citar nenhum serviço.</p>"""
    elif tipo == "passos":
        ps = "".join(f'<div class="p"><span class="n">{i:02d}</span><div><b>{escape(b)}</b><span>{escape(s)}</span></div></div>'
                     for i, (b, s) in enumerate(d["passos"], start=1))
        miolo = f"""    <p class="rotulo">{escape(d['rotulo'])}</p>
    <h2 class="titulo"{tam(72, 30)}>{marca(t)}</h2>
    <div class="passos">{ps}</div>"""
    elif tipo == "parede":
        palavras = "".join(f'<span{" class=\"v\"" if i % 2 else ""}>{escape(p)}</span>' for i, p in enumerate(d["palavras"]))
        classe = "cobre"
        miolo = f"""    <p class="rotulo">{escape(d['rotulo'])}</p>
    <div class="parede">{palavras}</div>
    <p class="sub" style="margin-top: auto; margin-bottom: 190px">E tudo é convertido em texto <b>na sua máquina</b>.</p>"""
    elif tipo == "frase":
        miolo = f"""    <p class="rotulo">Em uma frase</p>
    <h2 class="mega" style="font-size: {cabe(d['texto'], 96)}px; margin-top: auto; margin-bottom: auto">{marca(d['texto'])}</h2>"""
    elif tipo == "cta":
        classe = "cobre"
        miolo = f"""    <p class="rotulo">Demonstração</p>
    <h2 class="mega" style="font-size: {cabe(d['titulo'], 100)}px">{marca(d['titulo'])}</h2>
    <p class="sub" style="margin-top: 30px">{escape(d['nota'])}</p>
    <div class="contatos">
      <span class="contato principal">{LINK}</span>
      <span class="contato">WhatsApp {WHATS}</span>
    </div>"""
    else:
        raise ValueError(tipo)
    return f'  <section class="slide {classe}">\n{miolo}\n{rodape(primeiro)}\n  </section>\n'


def carrossel(c, entrega):
    corpo = "\n".join(slide_html(t, d, i == 0) for i, (t, d) in enumerate(c["slides"]))
    return CAB.format(entrega=entrega, formato="1080x1350", titulo=f"Carrossel: Cerra.AI, {escape(c['nome'])}") + corpo + FIM


def gancho(c):
    t, d = c["slides"][0]
    return d.get("titulo") or d.get("mito")


def story(c, entrega):
    t, d = c["slides"][0]
    titulo = d.get("titulo") or f"“{d['mito']}” *Mito.*"
    sub = d.get("sub") or "Veja a verdade no post."
    primeira_lista = next((x for tt, x in c["slides"] if tt == "linhas"), None)
    itens = lista(primeira_lista["itens"], "margin-top: 70px") if primeira_lista else ""
    return CAB.format(entrega=entrega, formato="1080x1920", titulo=f"Story: Cerra.AI, {escape(c['nome'])}") + f"""  <!-- área segura: ~250px livres no topo e na base -->
  <section class="slide story">
    <p class="rotulo">{escape(d['rotulo'])}</p>
    <h1 class="mega" style="font-size: {cabe(titulo, 84 if len(plano(titulo)) > 34 else 100)}px">{marca(titulo)}</h1>
    <p class="sub" style="margin-top: 40px">{marca(sub)}</p>
    {itens}
    <span class="contato principal" style="margin-top: auto; font-family: 'JetBrains Mono', monospace; font-size: 34px; font-weight: 700; align-self: flex-start; background: var(--cobre); color: var(--grafite); padding: 22px 30px; border-radius: 6px">{LINK}</span>
  </section>
""" + FIM


def legendas(c):
    t0, d0 = c["slides"][0]
    abertura = plano(gancho(c)) if t0 != "mito" else f"Mito: “{d0['mito']}”"
    blocos = []
    for t, d in c["slides"][1:]:
        if t == "linhas":
            blocos.append(plano(d["titulo"]) + "\n" + "\n".join(f"▪️ {plano(i)}" for i in d["itens"]))
        elif t == "tela":
            blocos.append(f"Exemplo: “{d['eu']}”\n→ {plano(d['ia'])}\n(Trechos consultados: {d['cita']})")
        elif t == "passos":
            blocos.append("Passo a passo:\n" + "\n".join(f"{i}. {b}: {s}" for i, (b, s) in enumerate(d["passos"], start=1)))
        elif t == "frase":
            blocos.append(plano(d["texto"]))
    selo = f"\n({ILUSTRATIVO}.)" if c["serie"] == "A" else ""
    config = f"\n{CONFIGURAVEL}" if c["slug"] in ("rh", "gestao-publica", "cartorios", "juridico-corporativo", "home-care", "industria") else ""
    ig = f"""{abertura}

{plano(d0.get('sub', 'Arraste para ver a verdade.'))}{selo}

{chr(10).join(blocos[:3])}
{config}
O Cerra.AI é a IA da Cerrado Tech que roda 100% no seu computador: sem enviar documentos para fora, com a fonte de cada resposta e anonimização antes do modelo.

Peça uma demonstração com o seu caso: WhatsApp {WHATS}
🔗 {LINK}

{c['tags']} {TAGS_BASE}
"""
    li = f"""{abertura}

{plano(d0.get('sub', ''))}{selo}

{chr(10).join(blocos[:2])}
{config}
Cerra.AI, da Cerrado Tech: IA corporativa 100% local, com RAG nos documentos da empresa, citação de arquivo e página, OCR e transcrição offline, anonimização e auditoria LGPD.

Demonstração com o seu caso de uso: {LINK}
"""
    return ig, li


def main():
    por_slug = {c["slug"]: c for c in CAMPANHAS}
    assert sorted(ORDEM) == sorted(por_slug), set(ORDEM) ^ set(por_slug)
    for n, slug in enumerate(ORDEM, start=1):
        c = por_slug[slug]
        entrega = PREFIXO + slug
        post, ent = RAIZ / "conteudo" / entrega, RAIZ / "entregas" / entrega
        post.mkdir(parents=True, exist_ok=True)
        ent.mkdir(parents=True, exist_ok=True)
        (post / "carrossel.html").write_text(carrossel(c, entrega), encoding="utf-8")
        (post / "story.html").write_text(story(c, entrega), encoding="utf-8")
        ig, li = legendas(c)
        (ent / "legenda-instagram.txt").write_text(ig, encoding="utf-8")
        (ent / "legenda-linkedin.txt").write_text(li, encoding="utf-8")
        orient = [
            "Carrossel: postar os 6 PNGs na ordem (carrossel-01 a 06).",
            "Carrossel animado (carrossel-animado.mp4, 1080×1350, com som): sai como Reel separado, na data indicada na agenda.",
            f"Story: adicionar o sticker de link para https://www.{LINK}",
        ]
        if c["serie"] == "A":
            orient.append("Exemplo ilustrativo: não citar cliente. O selo já está na arte e na legenda.")
        orient.append("Legendas prontas abaixo, uma para cada rede.")
        info = {
            "titulo": f"Cerra.AI · {c['nome']}",
            "serie": SERIES[c["serie"]],
            "data": f"2026-11-{n:02d}",
            "descricao": f"Série de conteúdo do Cerra.AI, \"{SERIES[c['serie']]}\". Identidade \"Silício local\".",
            "orientacoes": orient,
        }
        (ent / "info.json").write_text(json.dumps(info, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"{n:2d}. {SERIES[c['serie']]:<18} {entrega}")


if __name__ == "__main__":
    main()
