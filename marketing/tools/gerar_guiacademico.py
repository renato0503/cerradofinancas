"""Gera a série do Guia Acadêmico (consultoria acadêmica, guiacademico.com.br): um tema de pesquisa por campanha.

Identidade "Artigo" (brand/guiacademico/marca.css): cada peça é diagramada como um artigo de periódico, com cabeça
corrida, resumo, palavras-chave, controle de alterações, quadro com filetes e nota de rodapé.

Fonte do conteúdo: o site do Guia Acadêmico (D:\\Dev\\GuiAcademico\\index.html): serviços, ferramentas, protocolo e
FAQ. Regras: sem preço; sem os números do site (+120 trabalhos, 94% de aprovação, 10+ anos) até o Renato confirmar;
a ética aparece em toda campanha ("Não executamos trabalhos por terceiros": orientação, capacitação, análise de dados
e revisão; o autor é o aluno). Exemplos com números são ilustrativos e a peça diz isso.

Uso:
    python tools/gerar_guiacademico.py
"""
import json
import re
from html import escape
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
SITE = "guiacademico.com.br"
WHATS = "(67) 99351-5206"
ICONE = "../../brand/guiacademico/logo-icone.png"
TAGS_BASE = "#GuiaAcademico #PesquisaCientifica #Mestrado #Doutorado #TCC"
ETICA = ("<b>Não executamos trabalhos por terceiros.</b> Atuamos em orientação metodológica, capacitação técnica, "
         "análise de dados e revisão. O autor da pesquisa é você.")

# *x* = destaque em itálico com marca-texto; ¹ no texto vira chamada de nota (a nota vai em "nota")
TEMAS = [
    dict(slug="lancamento", nome="O Guia Acadêmico", rubrica="Apresentação",
         gancho="Sua pesquisa precisa de *um mentor*, não de um atalho.",
         resumo="Orientação metodológica e análise de dados para quem está no TCC, na especialização, no mestrado ou no doutorado. Você escreve; a gente orienta, ensina e revisa.",
         chaves=["orientação", "análise de dados", "metodologia", "ética"],
         t_lista="Onde a pesquisa costuma *travar*",
         lista=["Um problema de pesquisa amplo demais", "O método escolhido depois da coleta",
                "Dados que ninguém sabe analisar", "A formatação deixada para a última semana"],
         t_rev="Do tema ao *plano*",
         rot=("Ideia inicial", "Pergunta de pesquisa"),
         antes="Quero pesquisar sobre IA na educação.",
         depois="Como professores do ensino médio da rede pública usam IA generativa no planejamento das aulas?",
         explica="Um tema vira pesquisa quando ganha recorte: quem, onde e o quê.",
         t_quadro="As frentes do Guia",
         quadro=[("Orientação metodológica", "Do problema ao delineamento quali, quanti ou misto"),
                 ("Análise estatística", "STATA, R, Python e SPSS"),
                 ("Análise qualitativa", "IRAMUTEQ, NVivo e Atlas.ti"),
                 ("Mineração de dados", "Raspagem de bases públicas"),
                 ("IA acadêmica", "Uso ético de modelos de linguagem"),
                 ("Formatação e submissão", "ABNT, APA, Vancouver e periódicos")],
         ajuda=["Diagnóstico da sua pesquisa", "Proposta com escopo e cronograma", "Acompanhamento com entregas parciais e revisões"],
         cta="Pesquisa com *rigor*, do projeto à banca.",
         tags="#OrientacaoAcademica #Metodologia #AnaliseDeDados"),
    dict(slug="problema-de-pesquisa", nome="Problema de pesquisa", rubrica="Metodologia",
         gancho="Tema não é *problema de pesquisa*.",
         resumo="Boa parte dos projetos trava no primeiro passo: um assunto amplo, sem pergunta e sem recorte. Veja como transformar o tema numa pergunta que os dados conseguem responder.",
         chaves=["problema de pesquisa", "objetivos", "recorte", "projeto"],
         t_lista="Sinais de que ainda é *só um tema*",
         lista=["Cabe em qualquer lugar e em qualquer época", "Não dá para responder com dados",
                "Os objetivos repetem o título", "A justificativa fala só da importância do assunto"],
         t_rev="O mesmo assunto, *com recorte*",
         rot=("Tema", "Problema de pesquisa"),
         antes="O impacto da tecnologia nas empresas.",
         depois="A adoção de um sistema de gestão (ERP) reduziu o prazo do fechamento contábil em pequenas empresas de Mato Grosso entre 2020 e 2025?",
         explica="Objeto, população, lugar e tempo definidos: agora dá para responder com dados.",
         t_quadro="Do tema ao projeto",
         quadro=[("Tema", "O assunto amplo"), ("Problema", "A pergunta que a pesquisa responde"),
                 ("Objetivo geral", "O que será feito para responder"),
                 ("Objetivos específicos", "As etapas, com verbos de ação"),
                 ("Justificativa", "Por que a resposta importa, e para quem")],
         ajuda=["Lapidar a pergunta junto com você", "Alinhar objetivos, método e dados", "Revisar a coerência do projeto antes da qualificação"],
         cta="Uma boa pergunta é *metade da pesquisa*.",
         tags="#ProjetoDePesquisa #ProblemaDePesquisa #Metodologia"),
    dict(slug="estatistica", nome="Análise estatística", rubrica="Análise quantitativa",
         gancho="p < 0,05 não é *conclusão*.",
         resumo="Significância estatística indica que um efeito provavelmente existe, não que ele seja grande ou importante. Interpretar o resultado é diferente de rodar o teste.",
         chaves=["valor-p", "tamanho de efeito", "regressão", "inferência"],
         t_lista="Erros comuns *na análise*",
         lista=["Escolher o teste depois de ver o resultado", "Ignorar os pressupostos do teste",
                "Reportar só o valor-p, sem o tamanho de efeito", "Tratar correlação como causa"],
         t_rev="Como *relatar* um resultado",
         rot=("Versão 1", "Versão revisada"),
         antes="Os resultados foram significativos (p = 0,03), comprovando a hipótese.",
         depois="O efeito foi estatisticamente significativo (p = 0,03) e de magnitude pequena (d = 0,21)¹; os dados são compatíveis com a hipótese, sem estabelecer causalidade.",
         explica="Um teste não “comprova” hipótese: relata-se o efeito, o tamanho e os limites.",
         nota="d de Cohen, uma medida de tamanho de efeito. Exemplo ilustrativo.",
         t_quadro="Análises que orientamos",
         quadro=[("Regressões", "Múltipla, logística e multinomial"),
                 ("Painel e séries temporais", "Econometria aplicada"),
                 ("ANOVA e MANOVA", "Comparação entre grupos"),
                 ("Fatorial e SEM", "Construtos e modelos estruturais"),
                 ("Ferramentas", "STATA, R, Python, SPSS e EViews")],
         ajuda=["Script comentado em R, STATA ou Python", "Sessões para você entender cada passo", "Interpretação que você consegue defender na banca"],
         cta="Resultado que você *sabe explicar*.",
         tags="#Estatistica #AnaliseDeDados #STATA #RStats #Econometria"),
    dict(slug="qualitativa", nome="Análise qualitativa", rubrica="Análise qualitativa",
         gancho="Entrevista transcrita ainda *não é análise*.",
         resumo="Pesquisa qualitativa tem método: categorias, codificação e critérios de validade. Sem isso, o capítulo de resultados vira uma colagem de falas.",
         chaves=["análise de conteúdo", "codificação", "categorias", "triangulação"],
         t_lista="Onde a análise *se perde*",
         lista=["Falas citadas sem categorias que as organizem", "O método não declarado no texto",
                "Codificação sem um livro de códigos", "Uma única fonte, sem triangulação"],
         t_rev="A fala que vira *evidência*",
         rot=("Versão 1", "Versão revisada"),
         antes="Os entrevistados disseram que gostam do programa.",
         depois="Na categoria “percepção de utilidade”, 9 das 12 falas associam o programa à redução de retrabalho (E3, E7, E11)¹.",
         explica="A fala vira evidência quando entra numa categoria e pode ser rastreada.",
         nota="E3, E7, E11: códigos dos entrevistados. Exemplo ilustrativo.",
         t_quadro="Métodos e ferramentas",
         quadro=[("Análise de conteúdo", "Bardin: pré-análise, exploração e tratamento"),
                 ("Grounded theory", "Codificação aberta, axial e seletiva"),
                 ("Delineamentos", "Fenomenologia, estudo de caso, análise do discurso"),
                 ("Software", "IRAMUTEQ, NVivo, Atlas.ti e MAXQDA")],
         ajuda=["Montar o livro de códigos com você", "Rodar e interpretar no software", "Revisar a validade: triangulação e validação por pares"],
         cta="Das falas às *categorias*.",
         tags="#PesquisaQualitativa #Bardin #NVivo #IRAMUTEQ"),
    dict(slug="web-scraping", nome="Mineração de dados", rubrica="Mineração e web scraping",
         gancho="Os seus dados já estão *na internet*.",
         resumo="Diários oficiais, portais de transparência, bases da CAPES e da SciELO: muita pesquisa depende de dados públicos que ninguém quer copiar à mão, página por página.",
         chaves=["web scraping", "dados públicos", "Python", "reprodutibilidade"],
         t_lista="Quando a coleta *trava a pesquisa*",
         lista=["Copiar e colar centenas de páginas", "Planilhas com formatos misturados",
                "Uma coleta que ninguém consegue refazer", "Desistir do tema por falta de dados"],
         t_rev="A coleta como *parte do método*",
         rot=("Coleta manual", "Coleta com script"),
         antes="Copiar edital por edital do diário oficial, durante meses.",
         depois="Um script coleta, padroniza e salva os editais; a coleta pode ser refeita e conferida pela banca.",
         explica="O código entra no método: qualquer pessoa consegue reproduzir a base.",
         t_quadro="Da fonte ao dataset",
         quadro=[("Fontes", "Portais acadêmicos, diários oficiais e bases do governo"),
                 ("Coleta", "APIs, JSON, XML e páginas HTML"),
                 ("Tratamento", "Limpeza e padronização da base"),
                 ("Ferramentas", "Python: Requests, BeautifulSoup, Scrapy, Playwright")],
         nota="A coleta respeita os termos de uso de cada fonte e a LGPD.",
         ajuda=["Definir a fonte e o que coletar", "Script documentado e base limpa", "Ensinar você a rodar a coleta de novo"],
         cta="Dados públicos, *coleta reprodutível*.",
         tags="#WebScraping #Python #DadosAbertos #CienciaDeDados"),
    dict(slug="ia-academica", nome="IA acadêmica", rubrica="IA acadêmica",
         gancho="A IA *inventa* referências. Quem assina é você.",
         resumo="Modelos de linguagem ajudam a ler, organizar e revisar, mas podem criar citações que não existem. Usar IA na pesquisa exige método e conferência.",
         chaves=["IA generativa", "revisão de literatura", "ética", "NLP"],
         t_lista="Usos que *comprometem* a pesquisa",
         lista=["Citar referências do chatbot sem conferir", "Entregar texto gerado como se fosse seu",
                "Subir dados sigilosos em serviços abertos", "Não declarar o uso quando a instituição exige"],
         t_rev="O pedido *bem feito*",
         rot=("Pedido vago", "Pedido com método"),
         antes="Escreva a minha revisão de literatura sobre evasão escolar.",
         depois="Organize os achados destes 20 artigos que eu selecionei por método, amostra e resultado, indicando a página de cada trecho.",
         explica="A IA trabalha sobre as suas fontes, e você confere cada trecho.",
         t_quadro="IA a serviço da pesquisa",
         quadro=[("Revisão de literatura", "Triagem e organização de PDFs"),
                 ("Extração", "Achados, métodos e amostras de um corpus"),
                 ("NLP", "Topic modeling, classificação e sentimento"),
                 ("Ferramentas", "spaCy, Hugging Face e Gensim")],
         ajuda=["Mentoria prática de IA acadêmica", "Fluxos com fonte e página conferíveis", "Uso alinhado às regras da sua instituição"],
         cta="IA como *ferramenta*, não como autora.",
         tags="#IAAcademica #InteligenciaArtificial #RevisaoDeLiteratura #EticaEmPesquisa"),
    dict(slug="abnt", nome="Formatação ABNT", rubrica="Formatação",
         gancho="Formatação errada *rouba a atenção* do conteúdo.",
         resumo="Citação fora da norma, sumário digitado à mão, referência incompleta: a banca nota antes de chegar ao seu argumento.",
         chaves=["ABNT", "referências", "citações", "normalização"],
         t_lista="O que a banca *nota primeiro*",
         lista=["Sumário digitado à mão", "Citação longa sem recuo",
                "Referências incompletas ou fora de ordem", "Figuras sem número e sem fonte"],
         t_rev="Uma referência, *elemento por elemento*",
         rot=("Como chega", "Como a norma pede"),
         antes="Silva – Metodologia científica, editora X",
         depois="SOBRENOME, Nome. Título: subtítulo. 2. ed. Cidade: Editora, ano.",
         explica="A NBR 6023 define a ordem e a pontuação de cada elemento da referência.",
         t_quadro="Normas e entregas",
         quadro=[("ABNT", "NBR 14724, 6023 e 10520"),
                 ("Outras normas", "APA, Vancouver e as regras de cada periódico"),
                 ("Automação", "Sumário, listas e numeração automáticos"),
                 ("Tradução técnica", "Inglês e português")],
         ajuda=["Revisão da formatação do trabalho inteiro", "Modelo do documento com estilos prontos", "Ensinar a manter tudo automático"],
         cta="Forma certa, *conteúdo em destaque*.",
         tags="#ABNT #NormasABNT #Formatacao #TCC"),
    dict(slug="banca", nome="Preparação para a banca", rubrica="Defesa",
         gancho="Na banca, quem *defende* é você.",
         resumo="Preparar a defesa é treinar a explicação do método e dos resultados, antecipar as perguntas e montar slides que sustentam o argumento.",
         chaves=["defesa", "banca", "apresentação", "slides"],
         t_lista="O que *complica* a defesa",
         lista=["Slides com parágrafos inteiros", "Não saber explicar a escolha do método",
                "Resultados longe da pergunta de pesquisa", "Ser surpreendido por limitações óbvias"],
         t_rev="Um slide, *uma ideia*",
         rot=("Slide de resultados", "Slide revisado"),
         antes="Tabela com 40 linhas e todos os coeficientes do modelo.",
         depois="“H1: efeito positivo e pequeno”, com um gráfico desse único resultado.",
         explica="A tabela completa fica no texto; o slide mostra o achado.",
         t_quadro="Roteiro de uma defesa",
         quadro=[("Problema e objetivo", "Em um ou dois slides"),
                 ("Método", "Por que este, e não outro"),
                 ("Resultados", "Um achado por slide"),
                 ("Limitações", "Antes que a banca aponte"),
                 ("Contribuição", "O que muda com a sua pesquisa")],
         ajuda=["Revisão dos slides", "Simulação de banca com perguntas", "Treino da explicação do método"],
         cta="Chegue à banca *seguro do que fez*.",
         tags="#Defesa #Banca #Dissertacao #Tese"),
    dict(slug="etica", nome="Mentoria ética", rubrica="Ética",
         gancho="Ter orientação *não é* plágio.",
         resumo="Existe uma diferença clara entre coautoria indevida e mentoria ética. O Guia Acadêmico orienta, ensina, analisa e revisa: o autor da pesquisa é você.",
         chaves=["ética", "autoria", "mentoria", "sigilo"],
         t_lista="O que o Guia *faz*",
         lista=["Orientação metodológica", "Capacitação técnica nas ferramentas",
                "Análise de dados com script comentado", "Revisão estrutural e de formatação"],
         t_rev="Onde fica *a linha*",
         rot=("Não fazemos", "Fazemos"),
         antes="Escrever o trabalho para você entregar como seu.",
         depois="Orientar, ensinar e revisar, para que você escreva e defenda o próprio trabalho.",
         explica="Você é o autor; nós somos o suporte técnico para garantir o rigor científico.",
         t_quadro="Sigilo e autoria",
         quadro=[("Acordo de sigilo", "NDA digital sobre o tema e os dados"),
                 ("LGPD", "Dados tratados conforme a lei"),
                 ("Autoria", "O trabalho é seu, do começo ao fim")],
         ajuda=["Diagnóstico do que você precisa aprender", "Sessões técnicas e revisões", "Sigilo sobre o seu tema e os seus dados"],
         cta="Você é o autor. *A gente orienta*.",
         tags="#EticaEmPesquisa #IntegridadeAcademica #Mentoria"),
    dict(slug="revisao-sistematica", nome="Revisão sistemática", rubrica="Revisão de literatura",
         gancho="Revisão sistemática tem *protocolo*.",
         resumo="Diferente da revisão narrativa, a sistemática define antes a pergunta, as bases, os termos de busca e os critérios de inclusão, e qualquer pessoa consegue refazer a busca.",
         chaves=["revisão sistemática", "PRISMA", "protocolo", "meta-análise"],
         t_lista="Quando ainda *não é sistemática*",
         lista=["Busca só no Google Acadêmico", "Critérios de inclusão definidos depois",
                "Nenhum registro do que saiu em cada etapa", "Uma revisão narrativa com outro nome"],
         t_rev="A busca que *se pode conferir*",
         rot=("Versão 1", "Versão revisada"),
         antes="Foram encontrados vários artigos sobre o tema.",
         depois="A busca em três bases retornou 412 registros; após a triagem, 27 estudos foram incluídos (fluxograma PRISMA)¹.",
         explica="Cada número do fluxograma pode ser conferido por quem lê.",
         nota="PRISMA 2020: diretriz para relatar revisões sistemáticas. Exemplo ilustrativo.",
         t_quadro="Etapas da revisão",
         quadro=[("Protocolo", "Pergunta, bases, termos e critérios"),
                 ("Registro", "PROSPERO, quando a área pede"),
                 ("Relato", "Diretriz PRISMA e fluxograma"),
                 ("Síntese", "Narrativa ou meta-análise"),
                 ("Mapeamento", "VOSviewer: redes de autores e termos")],
         ajuda=["Montar o protocolo e as buscas", "Organizar a triagem dos estudos", "Revisar o relato pelo PRISMA"],
         cta="Uma busca que *qualquer um refaz*.",
         tags="#RevisaoSistematica #PRISMA #MetaAnalise #RevisaoDeLiteratura"),
    dict(slug="tamanho-da-amostra", nome="Tamanho da amostra", rubrica="Desenho da pesquisa",
         gancho="Quantas pessoas precisam *responder*?",
         resumo="O tamanho da amostra depende da população, da margem de erro, do nível de confiança e da análise prevista. “Quanto mais, melhor” não é critério.",
         chaves=["amostragem", "margem de erro", "nível de confiança", "poder estatístico"],
         t_lista="Como a amostra *costuma* ser definida",
         lista=["Um número que “parece bastante”", "Sem prever a taxa de resposta",
                "Conveniência tratada como representativa", "Cálculo feito depois da coleta"],
         t_rev="O número *com a conta*",
         rot=("Versão 1", "Versão revisada"),
         antes="Aplicamos o questionário a 50 alunos.",
         depois="Com população de 1.200 alunos, 95% de confiança e 5% de margem de erro, a amostra mínima é de 292 respondentes¹.",
         explica="Com a conta declarada, a banca discute o método, não o número.",
         nota="Cálculo para proporções com correção para população finita. Exemplo ilustrativo.",
         t_quadro="O que entra no cálculo",
         quadro=[("População", "Quantas pessoas existem no grupo estudado"),
                 ("Nível de confiança", "Em geral, 95%"),
                 ("Margem de erro", "Quanto o resultado pode variar"),
                 ("Análise prevista", "Cada teste ou modelo pede um tamanho"),
                 ("Ferramentas", "G*Power, R e fórmulas declaradas")],
         ajuda=["Calcular a amostra com você", "Justificar o cálculo no texto", "Planejar a coleta com folga para não respostas"],
         cta="Amostra *justificada*, não chutada.",
         tags="#Amostragem #Estatistica #Metodologia #Questionario"),
    dict(slug="questionario", nome="Questionário e escalas", rubrica="Instrumento de coleta",
         gancho="Questionário bom se *valida* antes de aplicar.",
         resumo="Escalas do tipo Likert medem o que não se vê, como satisfação ou confiança. Para isso, o instrumento precisa de validade e de confiabilidade.",
         chaves=["Likert", "validação", "confiabilidade", "análise fatorial"],
         t_lista="Problemas que *invalidam* respostas",
         lista=["Perguntas com duas ideias ao mesmo tempo", "Uma escala diferente em cada bloco",
                "Nenhum teste piloto antes da coleta", "Escala estrangeira traduzida sem adaptação"],
         t_rev="Uma pergunta, *uma ideia*",
         rot=("Versão 1", "Versão revisada"),
         antes="O atendimento foi rápido e educado?",
         depois="1. O atendimento foi rápido.\n2. O atendente foi educado.",
         explica="Com duas ideias numa pergunta, ninguém sabe o que a resposta mede.",
         t_quadro="Como validar o instrumento",
         quadro=[("Validade de conteúdo", "Avaliação por especialistas"),
                 ("Confiabilidade", "Alfa de Cronbach e confiabilidade composta"),
                 ("Validade de construto", "Análise fatorial exploratória e confirmatória"),
                 ("Modelagem", "SEM e PLS-SEM (SmartPLS)"),
                 ("Adaptação", "Tradução e retrotradução")],
         ajuda=["Revisar as perguntas e a escala", "Planejar o piloto", "Rodar e interpretar a validação"],
         cta="Medir *o que você quer medir*.",
         tags="#Questionario #EscalaLikert #SmartPLS #Psicometria"),
    dict(slug="cronograma", nome="Cronograma de pesquisa", rubrica="Planejamento",
         gancho="O TCC não atrasa no fim. *Atrasa no começo*.",
         resumo="Sem etapas e prazos curtos, o trabalho se acumula nas últimas semanas. Um cronograma realista divide a pesquisa em entregas que cabem na sua rotina.",
         chaves=["cronograma", "planejamento", "prazos", "rotina"],
         t_lista="Por que o prazo *escapa*",
         lista=["Só existe o prazo da entrega final", "A coleta marcada para o último mês",
                "Nenhuma folga para a revisão do orientador", "Escrever tudo para revisar depois"],
         t_rev="Metas que *cabem na semana*",
         rot=("Plano vago", "Plano em etapas"),
         antes="Novembro: fazer o TCC.",
         depois="Semana 1: problema e objetivos. Semana 2: dez artigos-chave fichados. Semana 3: instrumento de coleta.",
         explica="Meta semanal, pequena e verificável: dá para saber se o projeto está em dia.",
         t_quadro="As etapas de um cronograma",
         quadro=[("Projeto", "Problema, objetivos e método"),
                 ("Referencial", "Leitura e fichamento"),
                 ("Coleta", "Com folga para imprevistos"),
                 ("Análise", "E escrita dos resultados"),
                 ("Revisão", "Orientador, formatação e banca")],
         ajuda=["Um cronograma realista feito com você", "Metas semanais e acompanhamento", "Ajustes conforme a sua rotina"],
         cta="Entregue *no prazo*, sem virar noites.",
         tags="#Cronograma #TCC #Produtividade #VidaAcademica"),
    dict(slug="comite-de-etica", nome="Comitê de Ética", rubrica="Ética em pesquisa",
         gancho="Pesquisa com pessoas passa pelo *Comitê de Ética*.",
         resumo="Entrevistas, questionários e dados de participantes exigem, em regra, a aprovação de um Comitê de Ética em Pesquisa (CEP), pela Plataforma Brasil, antes da coleta.",
         chaves=["CEP", "Plataforma Brasil", "TCLE", "ética em pesquisa"],
         t_lista="O que *atrasa* a aprovação",
         lista=["Coletar dados antes do parecer", "Termo de consentimento genérico",
                "Cronograma sem o prazo de análise do CEP", "Faltar a anuência da instituição da coleta"],
         t_rev="A ordem *certa*",
         rot=("Ordem invertida", "Ordem certa"),
         antes="Aplicar o questionário na semana que vem e submeter ao comitê depois.",
         depois="Submeter na Plataforma Brasil, receber o parecer de aprovação e só então começar a coleta.",
         explica="Dado coletado antes da aprovação pode não ser aceito na pesquisa.",
         t_quadro="O que a submissão envolve",
         quadro=[("Normas", "Resoluções CNS 466/2012 e 510/2016"),
                 ("Plataforma Brasil", "Onde o projeto é submetido"),
                 ("TCLE", "O termo de consentimento livre e esclarecido"),
                 ("Documentos", "Projeto, instrumentos, cronograma e anuências")],
         ajuda=["Organizar a documentação", "Revisar o TCLE e os instrumentos", "Ajustar o cronograma à análise do comitê"],
         cta="Coleta *aprovada* antes de começar.",
         tags="#ComiteDeEtica #PlataformaBrasil #EticaEmPesquisa #CEP"),
    dict(slug="como-funciona", nome="Como funciona a mentoria", rubrica="Protocolo de atendimento",
         gancho="Como funciona a *mentoria*.",
         resumo="Um processo em três etapas, com escopo claro, entregas parciais e sigilo sobre o seu tema e os seus dados. Você acompanha tudo pela Área do Aluno.",
         chaves=["diagnóstico", "proposta", "acompanhamento", "Área do Aluno"],
         t_lista="O protocolo, *passo a passo*",
         lista=["Diagnóstico: a sua necessidade e a viabilidade técnica", "Proposta: escopo, cronograma de entregas e orçamento",
                "Execução: acompanhamento com entregas parciais", "Área do Aluno: arquivos e andamento do projeto"],
         t_rev="Mentoria *com método*",
         rot=("Sem protocolo", "Com protocolo"),
         antes="Mandar o arquivo e esperar a resposta.",
         depois="Diagnóstico, proposta com cronograma e entregas parciais que você acompanha pela Área do Aluno.",
         explica="Você sabe o que vai receber, quando e por quê.",
         t_quadro="Para quem é",
         quadro=[("Graduação", "TCC, do projeto à banca"), ("Especialização", "Artigo e trabalho final"),
                 ("Mestrado", "Dissertação e análises"), ("Doutorado", "Tese, artigos e submissão")],
         ajuda=["Diagnóstico da sua pesquisa", "Proposta personalizada", "Acompanhamento até a entrega"],
         cta="Comece pelo *diagnóstico*.",
         tags="#Mentoria #OrientacaoAcademica #PosGraduacao"),
]


def destacar(texto):
    t = re.sub(r"\*([^*]+)\*", r"<em>\1</em>", escape(texto))
    return t.replace("¹", '<sup class="ref">1</sup>').replace("\n", "<br>")


def plano(texto):
    return texto.replace("*", "").replace("¹", "")


CAB = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="entrega" content="{entrega}">
  <meta name="formato" content="{formato}">
  <title>{titulo}</title>
  <link rel="stylesheet" href="../../brand/guiacademico/marca.css">
</head>
<body>
"""
FIM = """  <script src="../../brand/slides.js"></script>
</body>
</html>
"""


def cabeca(n):
    return f'    <div class="cabeca"><span>Guia Acadêmico</span><span>Cadernos de método</span><span><b>nº {n:02d}</b></span></div>'


def rodape(primeiro=False):
    direita = "<span>arraste →</span>" if primeiro else "<span>p. <span data-pagina></span></span>"
    return f"""    <div class="rodape">
      <span class="marca"><img src="{ICONE}" alt=""> Guia Acadêmico <small>Seu mentor</small></span>
      {direita}
    </div>"""


def slide(miolo, n, classe="", primeiro=False):
    return f'  <section class="slide {classe}">\n{cabeca(n)}\n{miolo}\n{rodape(primeiro)}\n  </section>\n'


def nota(t):
    return f'    <p class="nota-rodape"><sup>1</sup>{escape(t["nota"])}</p>' if t.get("nota") else '    <div class="respiro"></div>'


def carrossel(t, n, entrega):
    grande = len(plano(t["gancho"])) > 40
    s = [slide(f"""    <p class="rubrica">§ {n} · {escape(t['rubrica'])}</p>
    <h1 class="mega"{' style="font-size: 100px"' if grande else ''}>{destacar(t['gancho'])}</h1>
    <div class="resumo"><span class="lbl">Resumo</span><p>{escape(t['resumo'])}</p></div>
    <p class="chaves"><b>Palavras-chave:</b> {escape('; '.join(t['chaves']))}.</p>
    <img class="bussola" src="{ICONE}" alt="" data-sangra>
    <div class="respiro"></div>""", n, primeiro=True)]

    itens = "\n".join(f"      <li><span>{n}.{i}</span>{escape(x)}</li>" for i, x in enumerate(t["lista"], start=1))
    s.append(slide(f"""    <p class="rubrica">1 · Introdução</p>
    <h2 class="titulo">{destacar(t['t_lista'])}</h2>
    <ul class="secoes">
{itens}
    </ul>
    <div class="respiro"></div>""", n))

    s.append(slide(f"""    <p class="rubrica">2 · Na prática</p>
    <h2 class="titulo">{destacar(t['t_rev'])}</h2>
    <div class="revisao{' compacta' if len(t['antes'] + t['depois']) > 190 else ''}">
      <div class="versao antes"><span class="rot">{escape(t['rot'][0])}</span><p>{destacar(t['antes'])}</p></div>
      <div class="versao depois"><span class="rot">{escape(t['rot'][1])}</span><p>{destacar(t['depois'])}</p></div>
    </div>
    <p class="explica">{escape(t['explica'])}</p>
{nota(t)}""", n))

    linhas = "\n".join(f'      <div class="linha"><b>{escape(a)}</b><span>{escape(b)}</span></div>' for a, b in t["quadro"])
    s.append(slide(f"""    <p class="rubrica">3 · Método</p>
    <h2 class="titulo">{destacar(t['t_quadro'])}</h2>
    <p class="quadro-tit"><b>Quadro {n}</b> · {escape(plano(t['t_quadro']))}</p>
    <div class="quadro">
{linhas}
    </div>
    <p class="fonte">Fonte: Guia Acadêmico ({SITE}).</p>
    <div class="respiro"></div>""", n))

    passos = "\n".join(f"      <li><span>{i:02d}</span>{escape(x)}</li>" for i, x in enumerate(t["ajuda"], start=1))
    s.append(slide(f"""    <p class="rubrica">4 · Nota do orientador</p>
    <h2 class="titulo">Como o Guia Acadêmico <em>ajuda</em></h2>
    <ul class="passos">
{passos}
    </ul>
    <p class="autor">Você continua sendo o autor da pesquisa.</p>""", n, "tinta"))

    s.append(slide(f"""    <span class="selo">Diagnóstico da pesquisa</span>
    <h2 class="mega" style="font-size: 96px">{destacar(t['cta'])}</h2>
    <div class="contatos">
      <span class="contato principal">Agendar diagnóstico</span>
      <span class="contato">{SITE}</span>
      <span class="contato">WhatsApp {WHATS}</span>
    </div>
    <p class="etica">{ETICA}</p>""", n))
    return CAB.format(entrega=entrega, formato="1080x1350", titulo=f"Carrossel: Guia Acadêmico, {escape(t['nome'])}") + "\n".join(s) + FIM


def story(t, n, entrega):
    itens = "\n".join(f"      <li><span>{n}.{i}</span>{escape(x)}</li>" for i, x in enumerate(t["lista"][:3], start=1))
    return CAB.format(entrega=entrega, formato="1080x1920", titulo=f"Story: Guia Acadêmico, {escape(t['nome'])}") + f"""  <!-- área segura: ~250px livres no topo e na base -->
  <section class="slide story">
{cabeca(n)}
    <p class="rubrica">§ {n} · {escape(t['rubrica'])}</p>
    <h1 class="mega" style="font-size: {88 if len(plano(t['gancho'])) > 40 else 100}px">{destacar(t['gancho'])}</h1>
    <ul class="secoes" style="margin-top: 56px">
{itens}
    </ul>
    <span class="selo" style="margin: auto 0 26px">Diagnóstico da pesquisa</span>
    <span class="contato principal" style="align-self: flex-start; background: var(--tinta); color: var(--papel); padding: 20px 32px">{SITE}</span>
    <img class="bussola" src="{ICONE}" alt="" data-sangra style="bottom: 200px; right: -120px; width: 440px">
  </section>
""" + FIM


def legendas(t):
    lista = "\n".join(f"• {x}" for x in t["lista"])
    quadro = "\n".join(f"▸ {a}: {b[0].lower() + b[1:]}" for a, b in t["quadro"])
    ajuda = "\n".join(f"{i}. {x}" for i, x in enumerate(t["ajuda"], start=1))
    etica = "Não executamos trabalhos por terceiros: atuamos em orientação metodológica, capacitação técnica, análise de dados e revisão. O autor da pesquisa é você."
    li = f"""{plano(t['gancho'])}

{t['resumo']}

{plano(t['t_lista'])}:
{lista}

Na prática: "{plano(t['antes'])}" → "{plano(t['depois'])}"
{t['explica']}

{plano(t['t_quadro'])}:
{quadro}

Como o Guia Acadêmico ajuda:
{ajuda}

{etica}

{plano(t['cta'])} Agende o diagnóstico: {SITE}

{t['tags']} {TAGS_BASE}
"""
    ig = f"""{plano(t['gancho'])}

{t['resumo']}

{plano(t['t_lista'])}:
{lista}

{etica}

{plano(t['cta'])} Diagnóstico pelo WhatsApp {WHATS}
🔗 {SITE}

{t['tags']} {TAGS_BASE}
"""
    return ig, li


def main():
    for n, t in enumerate(TEMAS, start=1):
        entrega = f"2026-11-guiacademico-{t['slug']}"
        post, ent = RAIZ / "posts" / entrega, RAIZ / "entregas" / entrega
        post.mkdir(parents=True, exist_ok=True)
        ent.mkdir(parents=True, exist_ok=True)
        (post / "carrossel.html").write_text(carrossel(t, n, entrega), encoding="utf-8")
        (post / "story.html").write_text(story(t, n, entrega), encoding="utf-8")
        ig, li = legendas(t)
        (ent / "legenda-instagram.txt").write_text(ig, encoding="utf-8")
        (ent / "legenda-linkedin.txt").write_text(li, encoding="utf-8")
        arq = ent / "info.json"
        antigo = json.loads(arq.read_text(encoding="utf-8")) if arq.exists() else {}
        info = {
            "titulo": f"Guia Acadêmico · {t['nome']}",
            # a data real vem do tools/agendar.py; aqui só a ordem da série
            "data": antigo.get("data", f"2026-11-{n:02d}"),
            "descricao": f"Série do Guia Acadêmico, consultoria acadêmica (caderno {n} de {len(TEMAS)}), na identidade própria \"Artigo\".",
            "orientacoes": [o for o in antigo.get("orientacoes", []) if o.startswith("Postar em")] + [
                "Carrossel: no Instagram, na ordem (carrossel-01 a 06); no LinkedIn, subir os 6 PNGs como documento.",
                "Carrossel animado (carrossel-animado.mp4, 1080×1350, com som): os mesmos slides em vídeo, postado como Reel em outro dia.",
                f"Story: adicionar o sticker de link para https://{SITE}",
                "Legendas prontas abaixo. Nada de preço nem dos números do site nas respostas aos comentários.",
            ],
        }
        arq.write_text(json.dumps(info, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"{n:2d}. {entrega}")


if __name__ == "__main__":
    main()
