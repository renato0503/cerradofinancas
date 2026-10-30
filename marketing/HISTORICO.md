# Histórico do estúdio de marketing

Registro do que foi produzido, das decisões tomadas e do que ficou pendente. Para o passo a passo
técnico (como exportar, renderizar e publicar), veja o [README](README.md).

**Central de Conteúdos (para o Felipe, do marketing):** https://www.cerradofinancas.com.br/marketing/

---

## Linha do tempo (outubro de 2026)

| Data | Commit | O que foi feito |
|---|---|---|
| 26/10 | `2322dcb` | Estúdio criado em `marketing/`, skills instaladas, primeira campanha (lançamento das 4 frentes: carrossel e story) |
| 26/10 | `e353418` | Central de Conteúdos em `/marketing/`, com prévia, download por peça, `.zip` por campanha e botão de copiar legenda |
| 26/10 | `d5267a1` | Projeto de vídeo (Remotion): Reel do lançamento e folinha animada (vinheta MP4, GIF, WebM transparente, Lottie) |
| 26/10 | `ffafe7b` | Uma campanha por frente: Fábrica de Software, Contabilidade, Crédito, Cursos |
| 26/10 | `a74f8e0` | Cursos com landing própria: IA na Prática e IA em Ação Farma (propagandistas) |
| 26/10 | `b5f715f` | Os 11 cursos presenciais do catálogo da CerraClass, gerados automaticamente dos dados oficiais |
| 26/10 | (esta rodada) | Catálogo dos 11 cursos no site (`/cursos/`), `.zip` sem os vídeos (~115 MB a menos), medição do áudio dos 19 vídeos, sitemap completo |
| 26/10 | (esta rodada) | Campanha do Cerra.AI: carrossel de 7, story, Reel de 15s e legendas |
| 28/10 | (esta rodada) | Agenda refeita por conta de Instagram: @cerradofinancas (Tech, Contabilidade, Crédito, Consultorias, Institucional), @cerra.ai e @cerraclass, de 1 a 2 posts por dia em cada uma (`tools/agendar.py`); a aba Agenda virou calendário com uma coluna por conta e aviso de "falta conteúdo". Consultoria acadêmica listada como frente futura |
| 28/10 | ee4e213 | Central de Marketing reorganizada e mídia kits |
| 28/10 | 7c39780 | Crédito produto a produto (11 campanhas, terças e sextas de 03/11 a 08/12, + 4 educativas "Antes de assinar, entenda" em janeiro) e Consultorias (7 pranchas na identidade nova "Planta", quartas de 04/11 a 16/12); plano de saúde e fiança no `/credito` |
| 28/10 | 42e20f7 | Contabilidade: serviços confirmados nas peças, 3 campanhas novas (Regularização, Sócios, Reforma tributária) e a série educativa "Você sabia?" (8 notas explicativas, sábados de 07/11 a 26/12); DIRF trocada por EFD-Reinf no site |
| 28/10 | ac24cc6 | Série da Cerrado Contabilidade (10 campanhas: 4 "Para quem atendemos" e 6 "O que fazemos") na identidade própria "Partida dobrada", terças e quintas de 03/11 a 03/12 |
| 28/10 | (esta rodada) | Série "O que a Cerrado Tech constrói": 16 campanhas, uma por capacidade do portfólio (carrossel de 6, story, carrossel animado, legendas e data sugerida de 02/11 a 07/12); carrossel animado vira o vídeo padrão |
| 30/10 | (esta rodada) | Guia Acadêmico (consultoria acadêmica) vira a 4ª conta, @guiacademico: identidade "Artigo", 15 campanhas (carrossel de 6, story, carrossel animado, legendas) e mídia kit; datas comemorativas nacionais (6, só post e story); agenda recomeça em 31/10 e passa a repetir o conteúdo quando ele acaba |
| 29/10 | (esta rodada) | Palestra "Muito Além do Currículo: IA na Prática": versão com setas (`apresentacao.html`) e versão animada com 29 slides (`apresentacao-animada.html`, GSAP + Lottie), publicada em `entregas/2026-10-palestra-carreira-ia/apresentacao/` |
| 28/10 | (esta rodada) | Identidades próprias para Cerra.AI ("Silício local", cobre e grafite) e CerraClass ("Sábado de sala", uma cor por curso); as 14 campanhas refeitas; vídeos novos em HyperFrames (16:9 e 9:16) no lugar dos Reels antigos |

## Campanhas publicadas (20)

Cada campanha tem carrossel (6 ou 7 slides, 1080×1350), story (1080×1920), Reel com som (1080×1920)
e legendas para Instagram e LinkedIn, exceto onde indicado.

**Institucional**
- Lançamento das 4 frentes: carrossel de 7, story, Reel de 21s, legendas
- Folinha animada: vinheta MP4 com som, GIF em loop, WebM com fundo transparente, Lottie (entrada e loop)

**Frentes** (Reel de 15s)
- Fábrica de Software: "Seu negócio não cabe num software de prateleira"
- Contabilidade: "Seu contador te ajuda a decidir ou só a pagar imposto?"
- Crédito: "Antes de assinar, compare" (com a LS Intermediação Financeira)
- Cursos (Cerraclass): "Pare de só usar IA. Construa com ela"

**Cursos com landing própria no site** (carrossel de 7, com slide do instrutor)
- IA na Prática (`/iacao/`)
- IA em Ação Farma, para propagandistas (`/iafarma/`)

**Produto** (Reel de 15s)
- Cerra.AI: "E se a IA rodasse no seu computador?" — assistente corporativo 100% local da Cerrado Tech,
  com RAG nos documentos da empresa, OCR e transcrição offline, anonimização e auditoria LGPD e três
  cenários com base própria. Fonte dos textos: `D:\Dev\Cerra.AI` (README, `docs/FUNCIONALIDADES.md`,
  `docs/implementation.md`).

**Cursos presenciais do catálogo CerraClass** (gerados de `dados/cerraclass-cursos.json`)
- Curso de um dia (8h, 1 sábado): IA na Gestão, Excel com IA, Consultoria Contábil com IA,
  Consultoria Financeira com IA, Introdução à Análise de Dados, Processos BPMN com IA, Introdução à Automação com IA
- Imersão (22h, 2 sextas à noite + 2 sábados): Ciência de Dados Aplicada, IA na Farma (farmácias e drogarias),
  BI e Dashboards com IA, Prototipação de Apps com IA

---

## Identidades próprias (28/10)

Cerrado Tech e Cerrado Finanças mantêm a identidade do site (azul `#001f5c` e dourado). **Cerra.AI,
CerraClass (com todos os cursos) e Crédito ganharam identidade própria**, cada uma com guia em `brand/<marca>/README.md`:

- **Cerra.AI, "Silício local":** cobre `#e2873b` + quase-preto `#0d0f0e`, Archivo expandida em caixa alta,
  JetBrains Mono nas citações. Recursos próprios: a tarja de anonimização e a etiqueta "Trechos consultados".
- **CerraClass, "Sábado de sala":** um fundo vivo por curso + tinta quase-preta, Bricolage Grotesque condensada
  em caixa alta. Recursos próprios: as 10 cadeiras da turma, a régua do dia de aula, o ingresso, a etiqueta adesiva.
- **Crédito, "Antes de assinar":** papel branco, azul-caneta `#1f3ae0` e marca-texto `#e6ff3d` só no destaque,
  Schibsted Grotesk + Caveat na rubrica. Recursos próprios: o comparativo de propostas (sem números), a linha de
  assinatura "Você decide" e o aviso legal como letra miúda. **A marca é a folinha**; a LS aparece só como parceira.

**Vídeos dessas duas marcas agora são HyperFrames** (HTML + GSAP, `filmes/`), feitos a partir de três
modelos de prompt (comercial de produto 15s, lançamento estilo App Store 30s, lançamento minimalista P&B 30s),
sempre em 16:9 e 9:16 (`video-16x9.mp4` e `video-vertical.mp4` em cada campanha). Os Reels antigos do Remotion
dessas campanhas foram removidos. O Remotion (`videos/`) segue para as campanhas de Cerrado Tech e Finanças.

## Série "O que a Cerrado Tech constrói" (28/10)

Fonte única: `tools/gerar_portfolio_tech.py` (toda a copy das 16 capacidades do `/portfolio/`). Estrutura igual em
todas: gancho com a dor do cliente → a sigla traduzida ("ERP, na prática") → 3 sinais de que precisa → o que
entregamos (os itens do portfólio, sem acréscimo) → como trabalhamos (os 4 passos da campanha da Fábrica) → chamada
própria com o link da página certa (ERP, CRM, Dashboards, IA Offline, E-commerce, Compliance e Blockchain têm página;
o resto vai para `/portfolio`). Identidade: a da Cerrado Tech (azul e dourado), uma cor de destaque por capacidade.
Postagem sugerida segunda, quarta e sexta, na ordem do gerador (ERP 02/11 até Web3 07/12), registrada no `info.json`.

## Crédito produto a produto e Consultorias (28/10)

Planejamento em `PLANEJAMENTO-credito-consultorias.md`, aprovado pelo Renato ("pode seguir") sem responder às perguntas
abertas. Ficou o caminho mais seguro em cada uma:
- não citar cidade (a LS fica em Campo Grande e o site diz Cuiabá);
- WhatsApp da Cerrado;
- consignado sem INSS (o INSS fica só no empréstimo pessoal, como no portfólio da LS);
- plano de saúde e odonto incluídos (e no site);
- sem os números das consultorias;
- identidade nova "Planta" e o calendário proposto.

**Crédito** (`tools/gerar_credito.py`, identidade "Antes de assinar"): 11 produtos do portfólio da LS (`PortfolioParceriaLS/`).
Os 6 slides são: capa → para quem é → como usar → comparativo → as três cláusulas para conferir antes de assinar
(slide azul, com § 1 a 3) → CTA com o aviso legal. Há avisos próprios para seguro (intermediação, análise de risco) e
consórcio (não é administradora).
- **Números:** só os do portfólio da LS ("mais de 20 bancos" no consignado, "mais de 30 seguradoras").
- **Bancos:** nenhum nome nem logo.
- **Série educativa "Antes de assinar, entenda":** CET, portabilidade, consórcio ou financiamento, e margem
  consignável. Sai em janeiro de 2027.

**Consultorias** (`tools/gerar_consultorias.py`, identidade "Planta", `brand/consultoria/README.md`): 7 pranchas (BPO,
controladoria, CSC Strategy, GRC, planejamento tributário e Lei do Bem, venture building, GovTech). Os 6 slides são:
capa com organograma → os sinais → o que entregamos → antes e depois → como funciona → diagnóstico gratuito.
O LinkedIn é a rede principal.

## Série da Cerrado Contabilidade (28/10)

Fonte única: `tools/gerar_contabilidade.py`. Posicionamento: "do MEI à média empresa, o mesmo contador".
Série A, "Para quem atendemos": MEI, Simples Nacional, Lucro Presumido, da micro à média. Série B, "O que fazemos":
abertura, fiscal e tributário, departamento pessoal, contábil, consultivo e troca de contador. Identidade própria
("Partida dobrada", `brand/contabilidade/README.md`) para não se confundir com o resto da Cerrado Finanças.
Serviços confirmados pelo Renato em 28/10: os do site, o Lucro Presumido e toda a lista da estratégia (inscrição
estadual, MEI para ME, alterações e baixa, certidões, certificado digital, DASN-SIMEI, ISS, parcelamentos, reforma
tributária, pró-labore, escrituração completa, distribuição de lucros, IRPF dos sócios). Eles entraram nas campanhas
existentes e em três novas: Regularização, Sócios e Reforma tributária (13 no total, terças e quintas até 15/12).
**Série "Você sabia?"** (8 posts, sábados de 07/11 a 26/12, `VOCE_SABIA` no mesmo gerador): cada post é uma "nota
explicativa" numerada (a regra com a base legal, na prática, o erro e o certo, como a gente ajuda). Temas: DASN-SIMEI,
Fator R, pró-labore, fim da DIRF, IBS e CBS, MEI acima do limite, certidão negativa e CNAE. Regras conferidas com a
lei em 28/10/2026, sem valores de limite que mudam. **Pendências:** Lucro Real (não citado até confirmar) e o nome e
CRC do responsável técnico (o Renato pediu para deixar para depois). A página `/contabilidade` trocou a DIRF extinta
por EFD-Reinf e eSocial.

## Guia Acadêmico, a consultoria acadêmica (30/10)

A frente "Consultoria acadêmica", que aparecia como "em breve" na agenda, é o **Guia Acadêmico**
(guiacademico.com.br, projeto em `D:\Dev\GuiAcademico`, Firebase). Virou a 4ª conta da agenda, **@guiacademico**
(o perfil ainda precisa ser criado ou confirmado), com 1 post por dia.

- **Identidade "Artigo"** (`brand/guiacademico/`): cada peça é um artigo de periódico, com cabeça corrida, resumo,
  palavras-chave, controle de alterações, quadro com filetes e nota de rodapé. Azul-marinho e dourado da bússola da
  logo. Guia completo em `brand/guiacademico/README.md`; mídia kit em `kits/guiacademico/`.
- **Série "Cadernos de método"** (`tools/gerar_guiacademico.py`, 15 campanhas `2026-11-guiacademico-*`): apresentação,
  problema de pesquisa, estatística, qualitativa, web scraping, IA acadêmica, ABNT, banca, ética, revisão
  sistemática, tamanho da amostra, questionário, cronograma, Comitê de Ética e como funciona. Cada uma tem carrossel
  de 6, story, carrossel animado (Reel, 4 posts depois do carrossel) e legendas de Instagram e LinkedIn.
- **Regras:** ética em toda peça ("não executamos trabalhos por terceiros"), sem preço e sem os números do site até o
  Renato confirmar; exemplos com número dizem que são ilustrativos.
- **Site:** o `index.html` do Guia foi refeito na mesma identidade (mesmo conteúdo, formulários e login por CPF).
  Correções: o botão de agendar apontava para `[LINK_CALENDLY]` (agora abre o WhatsApp); o material gratuito dizia
  "enviado para o seu e-mail" sem enviar nada (agora é pedido pelo WhatsApp); o FAQ abria sozinho ao rolar (a
  animação de entrada e o FAQ usavam a mesma classe). Backup da versão anterior não foi para o repositório; o
  histórico do git do projeto tem a original. Publicado em 30/10 com `firebase deploy --only hosting --account comercial@cerradofinancas.com.br` (o projeto
  `guiacademicostorage` é dessa conta, não da gestor.renatorosa).

## Datas comemorativas e repetição da agenda (30/10)

Pedidos do Renato em 30/10:
- **Datas comemorativas:** só as nacionais, com post estático (feed do Instagram e LinkedIn) e story, **sem vídeo**.
  `tools/gerar_datas.py` gera as de Finados, Proclamação da República, Dia da Bandeira, Consciência Negra, Natal e
  Ano-Novo (`AAAA-MM-data-*`), no @cerradofinancas, na identidade do site (Finados e Consciência Negra em tom sóbrio).
  O agendador põe cada uma no dia fixo, além do post normal.
- **Repetição:** quando uma conta fica sem post novo, a agenda repete os posts dela desde o mais antigo, na mesma
  ordem, até o fim da agenda. Datas comemorativas nunca se repetem. Na Central, aparecem como "(repetição)".
- **Início:** o Felipe ainda não tinha começado; a agenda inteira recomeça em **sábado, 31/10/2026**
  (`python tools/agendar.py 2026-10-31`).

## Como foi feito, passo a passo (30/10)

Registro técnico da rodada do Guia Acadêmico, das datas comemorativas e da agenda nova, para repetir ou ajustar depois.

**1. Fontes do conteúdo.** Tudo saiu do site do Guia (`D:\Dev\GuiAcademico\index.html`): serviços, ferramentas,
protocolo de atendimento e FAQ. O `MARKETING_ARSENAL.md` do projeto foi lido, mas os posts antigos de "limpeza de plágio"
e as artes antigas (pasta `GuiAcademico/` na raiz do cerradofinancas, com "garantia de aprovação") ficaram de fora por
conflitarem com a regra de ética do próprio site.

**2. Marca e fontes.** A bússola foi recortada do `logo3d.png` do projeto (pelo canal alfa, com limiar 20) em
`brand/guiacademico/logo.png` e `logo-icone.png`. A Newsreader (400, 400 itálico, 600, 600 itálico) foi baixada do
fontsource 5.2.10 pelo jsDelivr para `brand/fontes/`. A identidade está em `brand/guiacademico/marca.css` e no README.

**3. Gerador da série.** `tools/gerar_guiacademico.py` tem os 15 temas na lista `TEMAS` (gancho, resumo, palavras-chave,
lista, antes e depois, quadro, como ajuda, CTA e hashtags). Ele grava `posts/2026-11-guiacademico-<tema>/carrossel.html`
e `story.html`, as legendas e o `info.json` em `entregas/`. A data do `info.json` só guarda a ordem; a data real vem
do agendador. Ajustes feitos depois do `verificar.py`:
- a bússola da capa encostava no resumo: ficou menor e mais para baixo (`.bussola`: 400px, `bottom: -120px`);
- o texto justificado abria buracos (o Chrome não hifeniza português): passou a alinhado à esquerda;
- o slide "Na prática" estourava quando o antes e depois somam mais de 190 caracteres: ganha a classe `compacta`.

**4. Exportar e vídeos.** `python tools/exportar.py posts/2026-11-guiacademico-*/carrossel.html .../story.html`
(105 PNGs) e, em `filmes/`, `node ferramentas/animar-carrossel.mjs <carrossel.html> --render --clima pb`. Com os 15
de uma vez, o render travou no 4º (código 3221226505, o navegador do HyperFrames caiu); a solução foi rodar um por
um, com uma segunda tentativa se falhar. Cada vídeo tem uns 4 MB.

**5. Datas comemorativas.** `tools/gerar_datas.py` (lista `DATAS`) gera `post.html` e `story.html` na identidade do
site e o `info.json` com `data_fixa`. Os anéis decorativos viraram `::before`/`::after`, porque como elementos o
`verificar.py` acusava sobreposição com o texto (falso positivo).

**6. Agendador** (`tools/agendar.py`):
- conta `guiacademico` em `CONTAS` e `POR_DIA`; `FUTURAS` ficou vazia;
- `fila_guiacademico`: a apresentação primeiro, depois os temas na ordem do gerador, com o carrossel animado de cada
  tema como Reel 4 posts depois;
- campanhas com `data_fixa` saem da fila e entram no dia fixo (`"fixa": true`);
- o fim da agenda é o último dia de conteúdo novo de qualquer conta (ou a última data fixa); a conta que acaba antes
  repete a própria fila desde o começo (`"repeticao": true`, peça com "(repetição)");
- repetições e datas fixas não reescrevem o "Postar em…" do `info.json`; o `agenda.json` ganhou `novos_ate` por conta.
- `tools/publicar.py`: prefixos `guiacademico-` (frente `guiacademico`, série "Cadernos de método") e `data-`
  (institucional, "Datas comemorativas").

**7. Central** (`index.html`): a grade da agenda usa `--contas` (número de colunas vem do `agenda.json`); frente
`guiacademico` em `FRENTES`; o cartão de cada conta mostra "conteúdo novo até…, depois repete"; textos de "Como usar"
e da introdução da agenda falam das 4 contas e da repetição. Mídia kit: entrada nova em `KITS_DADOS`
(`tools/gerar_kits.py`), gerada sozinha (`gerar(k)` só para ela e junção no `kits.json`), para não regravar os PDFs e
zips dos outros kits.

**8. Commit sem levar o trabalho da outra IA.** O `agendar.py` e o `publicar.py` tinham alterações não commitadas da
outra IA (série do Cerra.AI), e as campanhas `2026-11-cerraai-*` dela ainda não estavam publicadas. Por isso:
1. `git worktree add --detach <scratchpad>/wt HEAD` (uma cópia limpa do último commit);
2. cópia dos meus arquivos para lá e o mesmo patch do agendador aplicado no `agendar.py`/`publicar.py` do commit;
3. `agendar.py 2026-10-31` e `publicar.py` rodados lá (assim o `agenda.json` e o `conteudos.json` não citam as campanhas
   não publicadas); os `.zip` das campanhas antigas voltaram ao commitado com `git checkout`;
4. commit e push de lá (`9a6b5c9`); na pasta principal, o mesmo patch aplicado por cima das mudanças da outra IA, os
   arquivos gerados copiados de volta e `git reset --mixed 9a6b5c9`. Resultado: o `git status` da pasta principal
   mostra só o trabalho da outra IA, intacto; o worktree foi removido.

**9. Site do Guia Acadêmico.** O `index.html` foi reescrito com o mesmo conteúdo, os mesmos ids e scripts (login por
CPF, cadastro, menu, modal) e o CSS novo na identidade "Artigo" (Newsreader e DM Mono pelo Google Fonts, `bussola.png`
e `favicon.png` novos). Testado com Playwright em 1440px e 390px. O deploy foi feito só depois de comparar os outros
arquivos com os do ar (iguais). O projeto Firebase é da conta comercial@cerradofinancas.com.br, adicionada pelo Renato
com `firebase login:add`; deploy: `firebase deploy --only hosting --account comercial@cerradofinancas.com.br`.

## Palestra "Muito Além do Currículo: IA na Prática" (29/10)

Palestra do Renato em 29/10/2026, às 14h30. Pasta de trabalho: `posts/2026-10-palestra-carreira-ia/`.

| Arquivo | O que é |
|---|---|
| `slides.html` | Original, 22 slides em sequência (vira PNG/PDF). Outra IA também mexe nele |
| `apresentacao.html` | Os mesmos 22 slides em modo apresentação: setas ← →, espaço, Home/End, F (tela cheia), clique e swipe |
| `apresentacao-animada.html` | **A versão usada na palestra:** 29 slides com transições e animações |

**Online:** https://www.cerradofinancas.com.br/marketing/entregas/2026-10-palestra-carreira-ia/apresentacao/ (aceita `#N` no fim para abrir no slide N).

**Como a versão animada funciona**
- Bibliotecas copiadas em `vendor/` (GSAP 3.14.2 com SplitText e DrawSVG, lottie-web 5.13.0), sem depender de CDN.
  A folinha animada (Lottie de `entregas/folinha-animada/`) foi convertida em `vendor/folinha-*.js`, porque
  `file://` bloqueia a leitura de JSON.
- Transição por slide com `data-transicao`: `cortina`, `mascara`, `zoom` ou deslize (padrão). Quem prefere
  movimento reduzido no sistema vê só fade.
- Entrada dos elementos montada em `montarEntrada()`: títulos linha a linha (SplitText), cartões em sequência,
  traços de SVG desenhados (DrawSVG), contador 2026 → 2036 no slide da frase final.
- Ao imprimir (Ctrl+P), todos os slides saem visíveis, um por página.

**Slides novos ou refeitos na versão animada (em relação ao original de 22)**
0. 1 · Capa sem data e horário, com o nome "Prof. Renato Rosa" em destaque numa placa dourada junto à foto.
1. 5 · Sonhos; 6 · Tudo conta (experiências, cursos e vida pessoal no mesmo gráfico de pontos); 8 · Como contar
   a sua história (fato → aprendizado → ponte).
2. 7 · Hard skills e soft skills ("nem tudo se aprende na escola").
3. 9 · "A minha virada" refeito para aplicar os três passos do slide 8 (ERP na Europa → sistema pronto não é
   resultado → controladoria).
4. 15 · "Do papel à IA: cinco degraus": digitalizar, automatizar, script, RPA e automação por IA, com o mesmo
   exemplo (a nota fiscal) em todos e a regra de bolso no fim.
5. 21 · Mundo corporativo: cultura, gestão de projetos, ágil, plano de ação (5W2H), matriz RACI e sprints.
6. 22 · "Eu nunca vendi tecnologia" redesenhado (aspas, tags riscadas, selo); trocou de lugar com o slide do
   mundo corporativo.
7. 23 · Cerrado Tech com a logo, o que o escritório faz, tipos de software e áreas atendidas (saiu o bloco
   "Local-first + PWA").
8. 24 · Cerra.AI com a logo.
9. 27 · Ecossistema: CAIM descrito como "IDE que roda no celular".
10. 28 · Frase final sozinha e centralizada; 29 · "Obrigado!" com os QR codes.

**Para republicar depois de mexer na versão animada:** a cópia online fica em
`entregas/2026-10-palestra-carreira-ia/apresentacao/`, com os caminhos ajustados (CSS e `slides.js` da marca,
logos e QR codes copiados para dentro da pasta, porque `brand/` e `posts/` não vão para o site). Copie o
`apresentacao-animada.html` para lá como `index.html` trocando `../../brand/` pelos arquivos locais e
`../../../img/` por `../../../../img/`, e publique.

**Pendências da palestra:** os slides novos ainda não entraram em `slides.html`, `apresentacao.html` nem nos
PNGs; o rótulo "Projeto" do QR do CAIM; confirmar o texto do slide 9; os pontos do slide 6 são exemplos genéricos.

## Decisões e regras de conteúdo

Valem para todas as próximas campanhas.

1. **Nada inventado.** Todo texto sai do site, das landings ou do catálogo da CerraClass. Citações só se forem
   reais (a do Renato vem da landing `/iacao/`: "Hoje, a barreira não é mais saber escrever código, é saber
   fazer a pergunta certa e estruturar o problema."). Uma citação criada para o slide de Farma foi trocada pela real.
2. **Sem preço e sem data nas peças.** Peças circulam por muito tempo; valores e agenda ficam no site da
   Cerraclass. Os cursos do catálogo são "sob consulta". Pode-se dizer que o pacote para grupos sai mais barato por pessoa.
3. **Crédito sempre com aviso legal** de correspondente bancário (também no fecho do vídeo): "não é instituição financeira; crédito sujeito
   a análise e aprovação; taxas e condições variam". Está no CTA do carrossel, no story, no Reel e na legenda.
4. **Tamanho de turma:** **até 10 alunos por turma** em tudo (decidido em 26/10, confirmado em 28/10; os 11 cursos
   do catálogo foram regerados com 10). As landings de IA na Prática e
   IA em Ação Farma e o site já dizem 10; o catálogo da CerraClass ainda diz "até 15 alunos" — alinhar lá.
5. **IA na Farma ≠ IA em Ação Farma.** A primeira é a imersão para farmácias e drogarias (estoque, atendimento,
   conformidade); a segunda é o curso de um dia para propagandistas da indústria. Pastas diferentes
   (`curso-ia-na-farma` e `curso-ia-farma`).
6. **Cores:** azul `#001f5c` de fundo, dourado `#fecb00` só no elemento principal (botão do CTA), nas peças
   de Cerrado Tech e Cerrado Finanças. Cerra.AI e CerraClass seguem as próprias identidades (ver acima).
7. **Logo:** a folinha (`../img/folinha-hero.png`) foi limpa (sem halo, contorno suave) e é a marca da empresa em
   todas as peças (rodapé). Nos stories dos cursos presenciais ela foi retirada para caber o selo de formato.
   A campanha do Cerra.AI usa a **logo do produto** (`img/logo_cerraai-icone.png`), recortada do fundo preto
   original por `tools/recortar_logo_cerraai.py`; no Reel, a logo entra no lugar da folinha (campo `logo`
   em `videos/src/campanhas.ts`).
8. **Cerra.AI:** o texto vem do próprio projeto (`D:\Dev\Cerra.AI`). Pode afirmar: 100% local, zero requisições
   externas, RAG com citação de arquivo e página, OCR e transcrição offline, anonimização e relatório LGPD,
   auditoria mascarada, bases isoladas e os três cenários (Contabilidade, Oncologia, Advocacia Penal).
   **Não pode afirmar:** download disponível (o executável existe mas não foi publicado), cliente ou case,
   produto em nuvem ou multiusuário, certificação LGPD, "sempre correto", desempenho fora da máquina medida
   (RTX 4060 8 GB), a Freedom Tier como diferencial, nem que as bases dos cenários já foram revisadas por
   especialistas (ainda não). As peças comparam com "IA na nuvem" só em termos genéricos (o dado sai do
   ambiente, precisa de internet).

9. **Vídeo padrão = carrossel animado.** Toda campanha nova sai com `carrossel-animado.mp4`, feito do próprio
   carrossel. Comerciais especiais são extras (ex.: `video-extra-app-*.mp4` da CerraClass). O que já está feito fica.

## Como garantimos a qualidade

- Toda peça estática passa por `tools/verificar.py`, que acusa conteúdo invadindo o rodapé, fora da área
  segura do story (250px no topo e na base), palavra vazando do bloco e ícone/logo sobreposto a texto. Foi testado com um caso propositalmente quebrado.
- Todo vídeo é conferido extraindo quadros dos momentos-chave (`npx remotion ffmpeg -ss ...`) e olhando
  cada um com as linhas da zona segura.
- O áudio dos vídeos é medido por `tools/conferir_audio.py`: extrai a trilha, mede pico, RMS, clipping e
  silêncios. Em 26/10 os 19 vídeos passaram (trilha presente, sem clipping, sem silêncio longo), com RMS
  em torno de -28 dBFS — baixo, mas dentro do que o Instagram normaliza. **A escuta continua pendente:**
  a medição não diz se o som combina com a imagem.
- Depois de publicar, conferimos que os arquivos de `entregas/` respondem no site e que as áreas de trabalho
  (código, skills, fontes) **não** são publicadas (dão 404).

## Pendências e próximos passos

- [ ] **Ouvir o áudio dos Reels** antes de postar. Os sons são sintetizados por código e nunca foram ouvidos por uma pessoa.
- [ ] **Alinhar o catálogo da CerraClass para 10 alunos** por turma (hoje diz 15).
- [ ] Atualizar as campanhas dos cursos quando o catálogo da CerraClass mudar (sequência no README).
- [ ] Ideias de campanhas futuras: promoção de consignado, cases de clientes da Fábrica, depoimentos de alunos,
      turmas com data definida (aí sim com data, em peça de vida curta), conteúdo educativo de contabilidade.
- [ ] Skills instaladas e ainda não usadas: `threejs-*` (3D) e `lemo-opuscar` (curtas cinematográficos, pesado).
- [ ] **Espaço no GitHub Pages:** o limite é 1 GB por site. `entregas/` usava ~405 MB (19 campanhas) e foi
      reduzida para **~290 MB** em 26/10 (e voltou a ~425 MB em 28/10, com a série da Cerrado Tech e os vídeos novos): o `.zip` de cada campanha passou a levar só as imagens e as legendas,
      não os vídeos (o time baixa o vídeo direto na Central de Conteúdos). Os `.zip` caíram de 198 MB para 84 MB.
      Se apertar o limite de novo, o próximo passo é mover os vídeos antigos para outro armazenamento
      (Google Drive, Firebase Storage) e deixar no repositório só as peças estáticas.
