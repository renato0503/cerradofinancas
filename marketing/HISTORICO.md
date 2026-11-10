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
| 31/10 | `8622f19` | Apresentação institucional ("Prazer, ...") de Cerra.AI, Cerrado Tech, CerraClass e Guia Acadêmico, cada uma na identidade da marca, para fixar no perfil; a agenda passou a começar por elas (31/10) e o Reel sai em 07/11 |
| 31/10 | `0fb3590` | Guia Acadêmico no Facebook: uma arte única por campanha (`facebook.png`, 1080×1350) e legenda de Facebook com o link do WhatsApp clicável; o carrossel animado pode ir como vídeo. Publicado na Central e no ar (GitHub Pages) |
| 30/10 | `359e0d9` | Cerra.AI, extras: glossário da IA local (5), Pergunte ao Cerra.AI (chamada + 2 dúvidas comuns), comparativo com a nuvem, 8 stories interativos, checklist IA e LGPD em PDF e kit de vendas (one-pager e deck) |
| 30/10 | `9a6b5c9` | Guia Acadêmico (consultoria acadêmica) vira a 4ª conta, @guiacademico: identidade "Artigo", 15 campanhas (carrossel de 6, story, carrossel animado, legendas) e mídia kit; datas comemorativas nacionais (6, só post e story); agenda recomeça em 31/10 e passa a repetir o conteúdo quando ele acaba |
| 29/10 | `97484c0`, `619e9f7` | Palestra "Muito Além do Currículo: IA na Prática": versão com setas (`apresentacao.html`) e versão animada com 29 slides (`apresentacao-animada.html`, GSAP + Lottie), publicada em `entregas/2026-10-palestra-carreira-ia/apresentacao/` |
| 28/10 | (esta rodada) | Identidades próprias para Cerra.AI ("Silício local", cobre e grafite) e CerraClass ("Sábado de sala", uma cor por curso); as 14 campanhas refeitas; vídeos novos em HyperFrames (16:9 e 9:16) no lugar dos Reels antigos |
| 02/11 | `ab4c235`, `3be97cb` | Espaço do GitHub Pages: o publicado saiu de ~968 MB para ~370 MB (PNG em 256 cores, MP4 sem áudio em crf 24, .zip refeitos, mídia kit); ferramenta nova `tools/otimizar_publicacoes.py` |
| 02/11 | `b962c8a` | Série "IA da semana" do @cerra.ai: gerador dirigido por dados (`tools/gerar_ia_da_semana.py`), edição 01 no ar (04/11 o post, 10/11 o Reel), fontes conferidas na origem |
| 02/11 | (sem commit) | Estudo de motion design e 3D (`dados/estudo-motion-design.md`): motionmaxxing, bang-motion, dimensional-drawing e img2threejs; catálogo da CerraClass alinhado para 10 alunos no projeto `D:\Dev\CerraClass` (falta publicar) |
| 02/11 | `5926711` | Identidade de movimento por marca (7 marcas) em `brand/movimentos.json` + `brand/MOVIMENTO.md`; o carrossel animado passa a ler a marca pelo nome da campanha (nada de fade, corte em movimento, câmera e grão) |
| 02/11 | `6f4b89e` | Filme 3D do Cerra.AI ("o cobre") e 6 peças re-renderizadas como amostra |
| 02/11 | `c951cf2` | O filme 3D foi reprovado pelo Renato e apagado das entregas (a fonte ficou) |
| 02/11 | `bcaa034` | Correção da virada de página (não mostra mais o verso nem sobrepõe as folhas) e do leque de cópias da lâmina 3D; Contabilidade e Crédito re-renderizados |
| 10/11 | `f6d2d67` | CerraFood (plataforma white label para pizzaria) vira frente no @cerradofinancas: identidade própria "Comanda" (`brand/cerrafood/`), peça global "A plataforma inteira" (8 slides com coreografia), apresentação "Prazer, CerraFood" + série de 10 campanhas (`tools/gerar_cerrafood.py`), carrossel animado, legendas de Instagram, LinkedIn e Facebook, mídia kit. Estreia na agenda em 11/11, um dia sim e outro não, sem mexer no que já foi postado (`ESTREIAS` em `agendar.py`) |
| 10/11 | `a0bada7`, `cee3f36` | Página `cerrafood.html` do site refeita na identidade "Comanda", só com o que o sistema faz (saíram 23%, PIX integrado, multi-loja, ponto, taxa por distância, 7 dias e a seção Enterprise) |

## CerraFood, a plataforma white label para pizzaria (10/11)

O CerraFood é o sistema de pizzaria da Cerrado Tech (totem, caixa, tela da cozinha, ficha técnica, estoque, delivery,
fidelidade, relatórios e equipe), vendido em **white label**: o cliente recebe site, app, totem e painel com o nome, a
logo e as cores dele. O código é o projeto `D:\Dev\NapoleFood`, conferido em 10/11 para cada afirmação.

- **Pedido do Renato:** não citar a primeira implantação. Só as funcionalidades, como produto CerraFood, e deixar claro
  que é white label.
- **Identidade "Comanda":** verde-mata e laranja tirados da logo (a árvore), Outfit + DM Mono. O objeto da marca é a comanda térmica. O selo tracejado "sua
  marca aqui" fica **só na campanha White label** (nas outras ficou fora de contexto, disse o Renato). Guia e lista do que pode e não pode afirmar em
  `brand/cerrafood/README.md`. Movimento: "Kitchen ticket" em `brand/movimentos.json`.
- **Peças:** peça global "A plataforma inteira" (8 slides, ilustrações e coreografia própria em
  `filmes/coreografias/2026-11-cerrafood-plataforma.mjs`, gerada por `tools/gerar_cerrafood_plataforma.py`), apresentação
  (6 slides) + 10 campanhas de 6 slides: sua marca (white label), cozinha, totem, ficha técnica,
  estoque, caixa, delivery, fidelidade, relatórios e equipe. Cada uma com story, carrossel animado e legendas de
  Instagram, LinkedIn e Facebook (com o link do WhatsApp). Telas e gráficos com o selo "Exemplo ilustrativo".
- **Página do site com afirmações sem base:** `cerrafood.html` promete "ticket médio 23% maior", PIX integrado,
  multi-loja, ponto digital, taxa por distância e "implementação em 7 dias", e nada disso está confirmado. As peças não
  usam essas afirmações. **Página refeita em 10/11** (commit `a0bada7`): mesma identidade "Comanda", 9 módulos conferidos no código e o white label explicado.
- **Agenda:** a frente estreou com a agenda já correndo desde 31/10. `ESTREIAS` em `agendar.py` encaixa o CerraFood a
  partir de 11/11 na fila do @cerradofinancas, alternando com os posts que já estavam lá, sem mudar nada do que veio
  antes. Conferido: os 45 posts até 10/11, em todas as contas, ficaram iguais. Calendário do CerraFood: 11/11
  apresentação (fixar no perfil), 13/11 peça global, 15/11 white label, 17/11 cozinha, 19/11 totem, 21/11 Reel da
  apresentação, 23/11 ficha técnica, 25/11 Reel da global, 27/11 estoque e assim por diante, até 19/12 (o carrossel
  animado de cada campanha sai como Reel quatro posts depois do carrossel).

### A peça global "A plataforma inteira" (10/11)

Pedido do Renato: "um global do CerraFood, que sirva para apresentar a plataforma toda de uma vez, com 8 imagens de
carrossel, com motion, animações, imagens e transições". Pasta `2026-11-cerrafood-plataforma` (série "Visão geral").

- **Gerador próprio:** `tools/gerar_cerrafood_plataforma.py` (carrossel, story, legendas e info.json) e o CSS extra
  `brand/cerrafood/plataforma.css`. Os 8 slides: capa, white label, totem e caixa, cozinha, custo e estoque, entrega,
  gestão e demonstração.
- **Imagens:** ilustrações vetoriais feitas para a peça, sem foto de cliente: a pizza vista de cima (SVG gerado por
  `pizza_svg()`, com calabresa, manjericão e azeitona como elementos separados para animar), o meio a meio em duas
  metades, os aparelhos em três marcas de exemplo, a comanda, a tela da cozinha, as barras de estoque, o caminho da
  caixa de pizza até a porta e o mapa de calor.
- **Coreografia:** `filmes/coreografias/2026-11-cerrafood-plataforma.mjs` (54 s). A pizza entra girando e as
  coberturas caem uma a uma; os aparelhos sobem e as barras se pintam; as metades se juntam e a comanda sai da
  impressora (revelar "cima" com `steps(14)`); os cartões caem nas colunas e os timers correm (`contar`); as barras de
  estoque enchem e baixam com a venda; a caixa anda pelo caminho; os níveis crescem e o mapa acende em onda. A troca
  de cor abre em **círculo** (a pizza).
- **Duas armadilhas da coreografia, para não repetir:** (1) as funções de slide são copiadas como texto para a página,
  então **constante de fora da função não existe lá** (o `PIZZA` deu `ReferenceError` e o render travou); escreva o
  valor dentro da função. (2) `A.letras` em elemento `display: flex` (o `.rotulo` da marca, `.celular .status`)
  separa as letras, porque cada letra vira item do flex com o `gap`; nesses, use `A.revelar`.

### O selo "sua marca aqui" (10/11)

Na primeira versão o selo tracejado estava na capa, no CTA e no story de **todas** as peças. O Renato não entendeu
("ficou fora de contexto") e pediu para deixar **só na campanha que trata do white label**. Agora ele aparece só em
`2026-11-cerrafood-sua-marca` (função `sua_marca()` no gerador) e na seção White label da página do site. A peça global
e as outras 10 campanhas foram refeitas e re-renderizadas sem ele.

### A página do site (10/11)

`cerrafood.html` foi refeita na mesma identidade (verde-mata, laranja, Outfit + DM Mono, a pizza em SVG e a comanda),
com o header e o footer do site. Seções: hero, os 6 problemas, como funciona, white label (o único lugar com o selo),
os 9 módulos (só o que está no código), a vitrine com a tela da cozinha e a comanda, tecnologia e a demonstração.
Animações: as coberturas caem na pizza, a comanda imprime e os timers correm quando a vitrine aparece, as seções
sobem ao rolar; com "reduzir movimento" a página fica parada. O `og:image` é a capa da peça global. O símbolo da logo
foi para `img/cerrafood-simbolo.png` (o `marketing/brand/` não é publicado). Conferido no ar e num celular de 390 px,
sem rolagem lateral.

### Como foi publicado (10/11)

A outra IA tinha mudanças não commitadas em `agendar.py`, `publicar.py` e `HISTORICO.md`, além das 25 campanhas do
Cerra.AI ainda paradas. Para não publicar o trabalho dela:
1. `git worktree add --detach` numa pasta limpa; cópia só dos arquivos do CerraFood; as trocas nos três arquivos
   compartilhados reaplicadas à mão (só os trechos do CerraFood).
2. `agendar.py 2026-10-31` na cópia limpa, conferindo que o passado não mudou.
3. `conteudos.json` atualizado sem o `publicar.py` inteiro: `publicar_pasta()` só nas 12 pastas novas e, nas antigas,
   só `data`, `orientacoes` e `conta` relidos do `info.json` (os .zip das outras campanhas não foram refeitos).
4. Os PNG e MP4 novos encolhidos com as funções do `otimizar_publicacoes.py` (que sozinho só mexe em arquivo já
   versionado): de 68 MB para 22 MB.
5. Commit e push da cópia limpa; na pasta principal, cópia dos arquivos gerados e `git reset --mixed` no commit novo,
   o que deixou de diferença só as mudanças da outra IA.
6. O mídia kit: `gerar_kits.py` refaz **todos** os kits; os outros foram restaurados com `git checkout` e só a entrada
   do CerraFood entrou no `kits.json`.

## Campanhas publicadas (20)

> **Panorama em 30/10/2026:** a Central tem **112 campanhas** publicadas: Contabilidade 22, Cerrado Tech 17, Crédito 16,
> Guia Acadêmico 15, CerraClass 14, Cerra.AI 13, Institucional 8 (lançamento, folinha e 6 datas comemorativas) e
> Consultorias 7. A lista abaixo é a primeira leva (26/10); as séries seguintes estão nas seções de cada data.

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
  de 6, story, carrossel animado (Reel, 4 posts depois do carrossel) e legendas de Instagram e LinkedIn — e, desde
  31/10, a arte única e a legenda de Facebook (ver a seção própria abaixo).
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

## Apresentações institucionais (31/10)

Um post "Prazer, ..." por marca, para **fixar no topo do perfil**, cada um na identidade da própria marca
(`tools/gerar_apresentacoes.py`, pastas `2026-11-apresentacao-<marca>`): carrossel de 6, story, legendas e carrossel
animado.

| Marca | Conta | Identidade | Roteiro do carrossel |
|---|---|---|---|
| Cerra.AI | @cerra.ai | Silício local | o que é → o que faz → a tela (exemplo ilustrativo) → para quem → o que tem no perfil → demonstração |
| Cerrado Tech | @cerradofinancas | a do site | o que é → quem somos → o que construímos → produtos do ecossistema (Cerra.AI, GovTech, CerraClass, venture builder) → quem está por trás → CTA |
| CerraClass | @cerraclass | Sábado de sala | o que é → turma de até 10 → os cursos → quem está por trás → o que tem no perfil → CTA |
| Guia Acadêmico | @guiacademico | Artigo | "nº 00": resumo → quem orienta (Figura 1) → as frentes (Quadro 0) → protocolo → os Cadernos de método → diagnóstico e ética |

- **Agenda (pedido do Renato):** a agenda **começa pelas apresentações**: o "Prazer, ..." é o primeiro post de cada
  conta (31/10) e o resto da fila andou um dia. O carrossel animado sai como Reel uma semana depois (07/11). No
  `agendar.py`, as campanhas com `-apresentacao-` no nome entram na frente da fila da conta (rótulo "Apresentação:
  carrossel + story (fixar no perfil)") e o Reel entra 7 posts depois.
- **Fatos:** só o que está no site, nas landings e no projeto Cerra.AI. As credenciais do Renato são as que já estão
  publicadas nas landings (mestre em Contabilidade pela UFPR, doutorando em algoritmos e compliance, ICTI/Itaú
  Unibanco, fundador da Cerrado Tech). Dois ajustes na revisão: a CerraClass diz "Quem está por trás" (e não "Quem
  ensina", porque não é certo que o Renato dá todos os cursos), e o Cerra.AI não promete a série "Mostra como faz",
  que ainda não foi publicada.
- **Como foi feito:** gerador → `exportar.py` → `verificar.py` (um título estourava no Cerra.AI; reduzido) → revisão das
  4 folhas de contato → `animar-carrossel.mjs` (trilhas: cobre no Cerra.AI e na Cerrado Tech, sala na CerraClass,
  pb no Guia) → agenda e Central na cópia limpa (worktree), como nas rodadas anteriores.
- **Vídeos refeitos (31/10, pedido do Renato):** alguns vídeos estavam quebrados, e no Guia o quadro "As frentes"
  desmontava porque o embrulho de cada slide também usava a classe `.quadro`. Além disso, os vídeos só passavam os
  slides. Agora cada um tem uma **coreografia própria da marca** (`filmes/coreografias/<entrega>.mjs`): cada slide
  fica parado, cada elemento entra com o seu movimento e o conteúdo sai antes da troca.
  - **Cerra.AI:** terminal. Rótulos digitados, varredura da esquerda, chat digitado e cortina cobre.
  - **Cerrado Tech:** peças encaixando e ícones girando.
  - **CerraClass:** etiqueta que quica, título em soco, cadeiras com contagem até 10 e polaroide.
  - **Guia Acadêmico:** fios desenhados, marca-texto, quadro impresso linha a linha, carimbo e virada de página.

  Os vídeos saem **sem áudio**, porque a trilha sintetizada ficou ruim (`--com-audio` reativa). Cada um tem de 39 a
  44 s. Conferidos com `hyperframes snapshot` antes do render e com os quadros do MP4 depois. Commit `8b77cd3`.

## Guia Acadêmico no Facebook (31/10)

Pedido do Renato: o Guia Acadêmico também posta no Facebook, com **uma arte única** no lugar do carrossel (ou o vídeo) e
uma legenda própria. O link do WhatsApp tem de entrar inteiro
(`https://api.whatsapp.com/send?phone=5567993515206`), porque é a URL completa que o Facebook transforma em link
clicável — o número solto não vira.

**O que foi gerado (16 campanhas)**
- As **15 campanhas dos Cadernos de método** (`2026-11-guiacademico-*`), por `tools/gerar_guiacademico.py`.
- A **apresentação institucional** (`2026-11-apresentacao-guiacademico`), por `tools/gerar_apresentacoes.py` (só o
  Guia ganhou Facebook; as outras três marcas ficaram como estavam).
- Em cada uma: `posts/<campanha>/facebook.html` (fonte), `entregas/<campanha>/facebook.png` (1080×1350) e
  `entregas/<campanha>/legenda-facebook.txt`. Os `.zip` de cada campanha foram refeitos e passaram a incluir os dois.

**A arte** (`facebook.html` → `facebook.png`, 1080×1350)
- A identidade "Artigo": cabeça corrida com o número do caderno, rubrica de seção, gancho em destaque com marca-texto,
  resumo, palavras-chave, o selo "Diagnóstico da pesquisa", o botão do WhatsApp, a caixa da ética e o rodapé com a
  bússola e o site.
- **Sem** a bússola como marca d'água da capa do carrossel: nesta arte ela encostaria no texto e o `verificar.py`
  acusaria sobreposição. A bússola aparece só no rodapé.
- O gancho escolhe o corpo pelo tamanho (108, 96, 84, 72 ou 64 px; o menor é para os ganchos com mais de 62
  caracteres). O resumo ficou em 38 px e as palavras-chave em 30 px para caber sem aperto.
- O rodapé desta peça leva "Guia Acadêmico · Seu mentor" à esquerda e `guiacademico.com.br` à direita (não usa o
  contador de página do carrossel, que não faria sentido numa arte só).
- A classe `.slide.fb` (e `.fb .resumo`, `.fb .chaves`, `.fb .fb-cta`, `.fb .etica`) está em
  `brand/guiacademico/marca.css`. A ética fica 160 px acima da base, livres do rodapé.

**A legenda** (`legenda-facebook.txt`)
- Gancho, resumo, a lista "onde trava" do carrossel (o Facebook não tem swipe, então o conteúdo vai no texto), a ética
  e a chamada com o **link completo do WhatsApp**; depois o site (`https://guiacademico.com.br`) e as hashtags.
- Sem preço e sem os números do site, como no resto da série. A apresentação institucional tem legenda própria
  ("Prazer, Guia Acadêmico").

**Central de Conteúdos**
- `publicar.py` já reconhece a rede `facebook` (mapa `REDES`), então o card "Facebook" com o botão de copiar aparece
  sozinho em cada campanha, ao lado de Instagram e LinkedIn, junto do `facebook.png` na grade de peças.
- O hub foi atualizado **só nas 16 campanhas do Guia**, com um merge em `entregas/conteudos.json` usando
  `publicar_pasta()` (mesmo formato do `publicar.py`) — e não com `publicar.py` inteiro, porque havia 25 campanhas
  `2026-11-cerraai-*` de outra IA no disco, ainda sem commit, que entrariam na Central sem querer. O total continuou
  em 116 campanhas.

**Conferência e publicação**
- `tools/verificar.py` nas 16 peças: todas **OK** (sem estouro de rodapé, sem sobreposição). A revisão visual
  com os PNGs pegou dois ajustes: o rodapé estava faltando na primeira versão da arte, e a caixa da ética encostava
  no rodapé; a legenda do site saiu do bloco de chamada (o site já está no rodapé) e a margem inferior foi a 160 px.
- Commit `0fb3590` na `main` (88 arquivos, só o Guia; o trabalho da outra IA ficou intacto e fora do commit) e push.
  O GitHub Pages construiu; conferido no ar: `facebook.png` responde 200 e o `conteudos.json` lista
  "Facebook, Instagram, LinkedIn".

**Pendências**
- Confirmar (ou criar) a página do Guia Acadêmico no Facebook; as peças já estão na Central.
- As legendas de Instagram (telefone escrito) e LinkedIn (só o site) não têm o link do WhatsApp. Só a do Facebook usa
  a URL completa; decidir se padroniza as outras.

## Cerra.AI: os extras (30/10)

Pedido do Renato depois de ver as sugestões. Gerador próprio, `tools/gerar_cerraai_extras.py`, separado do
`gerar_cerraai.py` da outra IA (as 25 campanhas dela, `2026-11-cerraai-*` do planejamento, continuam paradas, sem vídeo
e fora da agenda). CSS próprio em `brand/cerraai/extras.css`, com a tela do produto copiada, para não depender das
mudanças não commitadas da outra IA no `marca.css`.

| Peça | Pasta(s) | O que tem |
|---|---|---|
| Glossário da IA local | `2026-11-cerraai-glossario-*` (5) | Modelo local, RAG, OCR, anonimização e trecho consultado: verbete, "sem jargão", na prática ou na tela, como o Cerra.AI usa, CTA |
| Pergunte ao Cerra.AI | `2026-11-cerraai-pergunte-*` (3) | A chamada ("mande a sua dúvida") e 2 dúvidas comuns ("ele inventa?", "quais arquivos lê?") |
| Comparativo | `2026-11-cerraai-comparativo-nuvem` | 6 critérios em duas tabelas, **onde a nuvem ganha** e quando usar cada um |
| Stories interativos | `2026-11-cerraai-stories-interativos` | 8 stories (enquete, quiz, caixinha, slider) com a caixa tracejada onde vai o sticker; o texto de cada sticker está na legenda |
| Checklist LGPD | `2026-11-cerraai-material-checklist-lgpd` | `checklist-ia-lgpd.pdf` (2 páginas A4, 12 itens com o artigo da LGPD) + carrossel e story que divulgam ("comente CHECKLIST") |
| Kit de vendas | `2026-11-cerraai-material-kit-vendas` | `one-pager.pdf` (A4) e `deck.pdf` (8 slides 16:9) para mandar depois da conversa; **fora da agenda** |

- **Perguntas reais:** entram em `dados/pergunte-cerraai.json` (com a origem: comentário, caixinha ou WhatsApp, sem nome
  sem autorização) e o gerador cria uma campanha por pergunta. As duas primeiras são marcadas "Dúvida comum".
- **Regras seguidas:** só funções ✅ do `docs/FUNCIONALIDADES.md` do Cerra.AI; exemplos de tela com o selo "Exemplo
  ilustrativo"; sem preço, prazo, cliente, nuvem ou certificação ("ajuda a cumprir a LGPD"); o checklist diz que não é
  parecer jurídico. Artigos citados no checklist conferidos: 5º I, 6º I, III, VII e X, 7º, 11, 12, 18, 33, 37, 38, 41 e 50.
  O item "confira a fonte" ficou como "boa prática", sem artigo.
- **Como foi feito:** `python tools/gerar_cerraai_extras.py --pdf` gera os HTML, as legendas, os `info.json` e, com
  `--pdf`, os PDFs e as prévias pelo Chromium do Playwright (A4 com `page.pdf(format="A4")`; o deck em 1920×1080).
  Depois `exportar.py` (carrosséis, stories e deck), `verificar.py` (só o deck acusou o emblema perto do título;
  ajustado) e `animar-carrossel.mjs --clima cobre` um por um nos 10 carrosséis.
- **Central:** `publicar.py` reconhece `.pdf` (tipo "documento") e a Central mostra um cartão "PDF · Abrir o documento";
  séries novas nas `REGRAS`; o kit de vendas está em `FORA_DA_AGENDA`. No @cerra.ai, a fila passou a usar o carrossel
  animado como Reel 4 posts depois (o mesmo texto que a outra IA já tinha escrito na cópia dela) e os stories
  interativos aparecem como "Stories interativos (1 por dia)".

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

## Espaço do GitHub Pages (02/11)

O publicado tinha crescido para ~968 MB (limite de 1 GB). A solução foi encolher os arquivos, sem mexer no
que o time de marketing vê:

| O quê | Antes | Depois | Como |
|---|---|---|---|
| PNG das peças | 197 MB | 81 MB | quantização para 256 cores (o design tem poucas cores); logos com transparência usam FASTOCTREE |
| MP4 | 522 MB | 179 MB | trilha sintetizada removida (a regra é vídeo sem áudio) e reencode em libx264 crf 24, preset medium |
| .zip das campanhas | 161 MB | 59 MB | refeitos com as peças já encolhidas |
| mídia kits | 31 MB | 18 MB | idem |
| **publicado total** | **~968 MB** | **~370 MB** | |

- **Medido, não estimado:** SSIM 0,9937 entre o MP4 original e o reencodado (visualmente idêntico) e diferença
  média de 0,42 por canal entre o PNG original e o quantizado. A comparação visual lado a lado não mostrou
  diferença perceptível.
- **Ferramenta:** `tools/otimizar_publicacoes.py`. Ela só mexe em arquivo **versionado e sem mudança não
  commitada** (ou seja, não encosta no trabalho de outra pessoa), só troca o arquivo quando o novo é menor,
  refaz o .zip de cada campanha e atualiza o `conteudos.json` **só das campanhas tratadas** — o `publicar.py`
  inteiro não pode rodar junto, porque ele varreria as campanhas de outra IA que ainda não foram commitadas.
- **O `.git` continua com ~1,4 GB** de histórico. Reduzir isso exigiria reescrever o histórico, o que não é
  recomendado com duas IAs no mesmo repositório.
- **A Central mostra os tamanhos novos** (o `conteudos.json` foi atualizado com os KB de cada peça).

## "IA da semana", no @cerra.ai (02/11)

Série semanal aprovada pelo Renato, com a pauta no acervo público `github.com/drix10/ai-resources` (CC BY 4.0)
e o **texto escrito aqui**. Regra da série: *resumo de anúncio não é fato verificado* — todo número usado foi
conferido abrindo a fonte original, e a fonte aparece na peça e na legenda.

- **Gerador dirigido por dados:** `tools/gerar_ia_da_semana.py` + `dados/ia_da_semana/AAAAMMDD.json` (uma
  edição por arquivo). `--coletar AAAA-MM-DD` baixa os briefings da semana como pauta; a copy é escrita à mão.
- **Edição 01** (`2026-11-cerraai-ia-da-semana-01`, semana de 02 a 08/11), 6 slides na identidade do Cerra.AI:
  1. capa; 2. Anthropic, "Agentic Backdoors via Pretraining Poisoning" (arXiv:2610.37741, 27/10): envenenar
  0,1% do pré-treino planta backdoor de execução remota, ~92% de taxa de sucesso no modelo de 4B;
  3. Mistral Large 4 (06/10): 1 trilhão de parâmetros, 52 bilhões ativos, pesos abertos no fim de outubro;
  4. Google DeepMind, PlanAssist (31/10): até 58% menos tempo de análise, mais de 70% dos relatórios gerados
  aprovados sem edição, 12 conselhos a mais, decisão final com o servidor;
  5. a leitura da semana (o que muda na empresa); 6. CTA.
  Com story, legendas de Instagram e LinkedIn e carrossel animado **sem áudio** (29,4 s).
- **Na agenda:** 04/11 o post e 10/11 o Reel do @cerra.ai; as campanhas seguintes da conta andaram 2 dias.
- **Sem número inventado:** nada de preço, prazo, cliente ou "{x}% mais rápido" sem fonte.

## Motion design e 3D: o que pode entrar (02/11)

Estudo de quatro repositórios pedido pelo Renato ("movimentações mais interessantes e personalizadas nos vídeos
e elementos 3D também"), em `dados/estudo-motion-design.md`. Resumo:

- **motionmaxxing** (Apache-2.0): o runtime `motion.js` (12 curvas medidas, seek-safe) e o `hero3d` (logo
  extrudado em Three.js) são o que interessa; os portões G0–G5 dão critério objetivo de revisão. **Mas a
  lista "never ship" dele proíbe o carrossel de feed** (marca no canto, contador, rodapé): vale para os filmes,
  não para as ~110 peças de feed.
- **bang-motion** (MIT): é o formato para declarar a **identidade de movimento** de cada marca (10 estilos,
  19 conceitos, 6 estilos de explainer e o passo de "style brief" com 3 candidatos). Falta escrever
  `brand/<marca>/movimento.md` e tirar o fade da troca de slide.
- **dimensional-drawing** (MIT): desenha a anatomia de um componente como folha técnica e a anima — é o
  formato certo para o **vídeo do white-label** da Cerrado Tech (`2026-11-tech-white-label`), que ainda não
  foi produzido.
- **img2threejs** (Apache-2.0): radar. Nosso produto é software; o logo 3D já é resolvido pelo `hero3d`.

Pendências: aprovação do Renato para 3D em vídeo (o hero 3D do site foi reprovado e não volta lá sem pedido
explícito) e os 3 candidatos de conceito de cada marca antes de qualquer render.

## Identidade de movimento por marca (02/11)

Cada marca já tinha identidade **visual**. Agora também tem identidade de **movimento**, com o método do
bang-motion (estilo + conceito de abertura + curvas) e as curvas medidas do motionmaxxing.

| Marca | Estilo | Conceito | Troca |
|---|---|---|---|
| Cerrado Tech | Cinematic dark | Object relay | desliza |
| Cerrado Contabilidade | Paper & print | Object metaphor | virada de página |
| Cerra.AI | Grainy gradient | Journey inside the UI | corte em movimento |
| CerraClass | Poster color-block | Rhythmic collage | desliza |
| Crédito | Editorial light | Pure typography | virada de página |
| Guia Acadêmico | Visual journalism | Claim → how → result | corte em movimento |
| Consultorias | Brutalist mono | Before / after | corte em movimento |

- **Fonte única:** `brand/movimentos.json` (estilo, conceito, `transicao`, `entrada`, `camera`, `grao`).
  Guia com o raciocínio em `brand/MOVIMENTO.md`, incluindo o que cada marca nunca faz.
- **No carrossel animado** (`filmes/ferramentas/animar-carrossel.mjs`): a marca sai do nome da campanha.
  Antes, todas as peças usavam o mesmo movimento (deslize da direita + entrada com fade e blur). Agora:
  **nada de fade** (entrada só por transformação), **corte em movimento** (o slide novo entra por cima e o
  anterior termina na hora), **câmera que respira** (escala e deslocamento lentos no filme inteiro) e
  **grão de superfície**. A virada de página é CSS 3D (rotateY com perspectiva no palco).
- **Amostra re-renderizada** (uma peça por marca, para conferir o resultado): Cerrado Tech (ERP),
  Contabilidade (abertura), CerraClass (IA na Gestão), Crédito (portabilidade), Guia Acadêmico (ABNT),
  Consultoria (GRC) e a edição 01 da "IA da semana" (Cerra.AI).
- **Correção da virada de página (02/11, commit `bcaa034`):** a primeira versão da virada rodava a folha
  anterior até **-102°**. Passando dos 90°, aparecia o **verso do papel com o texto ao avesso**, e as duas
  folhas ficavam sobrepostas na tela — o Renato reprovou ("ficou ruim"). Agora a folha **nova** entra girando
  em torno da margem esquerda (até 72°, nunca cruza os 90°) e a anterior fica atrás, só escurecendo
  (`brightness(0.74)`). Sem verso, sem sobreposição. Contabilidade e Crédito re-renderizados e no ar.

## "O cobre": o primeiro filme 3D do estúdio (02/11) — reprovado, corrigido, aguardando aval

> **Estado em 02/11:** o Renato reprovou a primeira versão ("ficou muito feio" — a folha, ao dobrar, virava um
> leque de folhas na tela) e mandou apagar as peças publicadas (commit `c951cf2`; a campanha saiu da Central).
> A causa e a correção estão abaixo (commit `bcaa034`). O filme novo está renderizado em `filmes/out/`, **ainda
> não publicado**: espera o aval do Renato. A fonte editável fica em `filmes/cerraai-cobre/fonte/` (não é
> publicada). Se ele continuar achando ruim, a decisão é apagar a fonte e deixar o 3D de lado — fazer 3D de
> verdade aqui exigiria WebGL (Three.js), que é outro trabalho.

### O que foi feito

`marketing/filmes/cerraai-cobre/` — 12 s, 16:9 e 9:16, sem áudio. A folha de cobre do Cerra.AI levita
sobre as trilhas do chip; a luz atravessa a superfície; a marca assenta.

- **3D em CSS**: a lâmina tem cópias em `translateZ` (daí a borda de cobre), o palco tem perspectiva
  (`perspective: 1500px`) e o objeto gira em `rotationX/rotationY`; a luz é um gradiente que varre em
  `mix-blend-mode: screen`, e o grão dá superfície ao fundo.
- **Identidade do Cerra.AI** ("Grainy gradient"): chega de maior e desacelera (`power4.out`), o fim é
  menor que o começo e a câmera recua no último terço.
- **Erro da primeira versão:** a espessura eram **16 cópias a 3 px** (48 px de profundidade). Ao dobrar a
  folha, cada cópia projetava numa posição diferente e apareciam dez folhas em leque. **Correção:** 9 cópias
  a 1,1 px (≈10 px de profundidade, leem-se como espessura) e a lâmina chega com inclinação discreta
  (`rotationX` 24° → 15°, `rotationY` −19° → −9°) em vez de dobrar. A profundidade vem da espessura, da luz
  e da perspectiva, não do giro.
- **Publicação (quando aprovado):** `entregas/2026-11-cerraai-cobre-3d/` com os dois formatos, na frente
  Cerra.AI, série "Filme 3D"; o `.zip` da campanha fica sem os vídeos, como manda a regra.
- O `hyperframes check` passa sem erro (o aviso de `fromTo` sem linha de base foi corrigido com
  `immediateRender: false`).

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
10. **Datas comemorativas (30/10):** só as nacionais, só post estático e story, **sem vídeo**, no @cerradofinancas,
    no dia fixo e fora da repetição. Tom sóbrio em Finados e Consciência Negra.
11. **Agenda (30/10):** começa em **31/10/2026** (quando o Felipe começou); de 1 a 2 posts por dia por conta; quando o
    conteúdo novo de uma conta acaba, os posts dela se repetem desde o mais antigo. Rodar `agendar.py 2026-10-31`.
12. **Guia Acadêmico:** ética em toda peça ("não executamos trabalhos por terceiros"; o autor é o aluno); sem preço e sem
    os números do site até confirmar; nada de "garantia de aprovação" (estava nas artes antigas) nem "limpeza de plágio".
13. **Pergunta "real" é real.** Na série Pergunte ao Cerra.AI, só entra pergunta que chegou de verdade, com a origem;
    as que antecipamos ficam marcadas como "Dúvida comum".
14. **Commit com outra IA trabalhando no repositório:** nunca `git add -A`. Quando um arquivo compartilhado (como
    `agendar.py`) tem mudanças não commitadas de outra pessoa, gerar e commitar numa cópia limpa (`git worktree`), depois
    aplicar o mesmo patch na pasta principal e `git reset --mixed <commit>` (passo a passo em "Como foi feito").
15. **Facebook (31/10):** o Guia Acadêmico posta uma arte única (`facebook.png`, 1080×1350) no lugar do carrossel, ou o
    `carrossel-animado.mp4` como vídeo. A legenda do Facebook sempre traz o link
    `https://api.whatsapp.com/send?phone=5567993515206` (URL completa, para virar clicável), além do site.
16. **"IA da semana" (02/11):** a pauta vem do acervo público ai-resources (CC BY 4.0), mas o texto é escrito aqui.
    Todo número usado foi conferido **abrindo a fonte original**; a fonte vai na peça e na legenda. Resumo de
    anúncio não é fato verificado. A copy de cada edição vive em `dados/ia_da_semana/AAAAMMDD.json`.
17. **Espaço do GitHub Pages (02/11):** antes de gerar uma leva grande de peças, rodar
    `python tools/otimizar_publicacoes.py` (PNG em 256 cores, MP4 sem áudio em crf 24, .zip refeito). A Central
    mostra o tamanho novo.
18. **Virada de página e 3D (02/11, depois de duas reprovações):** nada de girar a folha além de 90° — o verso
    do papel aparece com o texto ao avesso. Na virada, a folha nova entra até 72° e a anterior só escurece
    atrás. E, em 3D por camadas, a espessura tem que ser **fina** (poucas cópias, ~1 px): com 16 cópias a 3 px
    a folha vira um leque na tela. Conferir sempre com quadros extraídos em volta da transição, não só no meio
    do slide.
19. **CerraFood (10/11):** é white label; nunca citar a primeira implantação (nome, fotos, resultados). Só o que está
    no código do sistema (lista em `brand/cerrafood/README.md`). Telas e gráficos com o selo "Exemplo ilustrativo". O
    selo "sua marca aqui" só nas peças sobre white label.
20. **Frente que estreia com a agenda correndo (10/11):** entra em `ESTREIAS` no `agendar.py`, com a data de estreia,
    para não reordenar o que o Felipe já postou.

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

- [ ] **CerraFood:** a página e as peças falam em "pedido pelo celular"/app instalável; no sistema essa parte ainda
      está em andamento (fase F4 do projeto). Rever quando a F2 e a F4 forem publicadas, e acrescentar PIX integrado,
      NFC-e e iFood **só** quando estiverem prontos.
- [ ] **Agenda do @cerra.ai:** quando as 25 campanhas paradas da outra IA forem publicadas e o `agendar.py` rodar de
      novo, os posts de 04/11 a 10/11 do @cerra.ai mudam de data (já postados pelo Felipe). Pôr o Cerra.AI em
      `ESTREIAS` ou fixar o passado antes de rodar.
- [ ] O deploy do GitHub Pages de 09/11 **falhou** (o de 10/11 passou). Ver o motivo se voltar a acontecer.

- [ ] **Ouvir o áudio dos Reels** antes de postar. Os sons são sintetizados por código e nunca foram ouvidos por uma pessoa.
- [x] **Alinhar o catálogo da CerraClass para 10 alunos** por turma. Feito em 02/11 nos 5 textos do projeto
      `D:\Dev\CerraClass` e publicado (o projeto Firebase `cerraclass` é da conta `gestor.renatorosa@gmail.com`).
- [ ] **Re-renderizar as ~104 campanhas** com a nova gramática de movimento (`animar-carrossel.mjs --render`,
      uma por vez), depois `python tools/otimizar_publicacoes.py`. Só 7 peças foram re-renderizadas como amostra.
- [ ] **Filme 3D do Cerra.AI ("o cobre")**: corrigido e renderizado em `filmes/out/`, esperando o aval do Renato.
      Se aprovar, publicar como `entregas/2026-11-cerraai-cobre-3d/` e rodar `tools/publicar.py`; se não, apagar
      `filmes/cerraai-cobre/` e deixar o 3D de lado (fazer 3D de verdade exigiria WebGL/Three.js).
- [ ] **Aplicar a gramática de movimento aos filmes** (`cerra-ai-comercial`, `cerra-ai-lancamento`,
      `cerraclass-curso`, `cerraclass-lancamento`, `credito-comercial`) e às 4 apresentações, que ainda usam o
      movimento antigo.
- [ ] **Guia Acadêmico:** confirmar o perfil @guiacademico e os números do site; dizer se a logo antiga (capelo e livros,
      pasta `GuiAcademico/` na raiz) ainda vale; confirmar/criar a página do Facebook (as peças e a legenda já estão na
      Central, com o link do WhatsApp clicável).
- [ ] **Legendas por rede:** só a do Facebook usa a URL completa do WhatsApp (`https://api.whatsapp.com/send?phone=...`).
      A do Instagram ainda escreve só o telefone e a do LinkedIn só o site; decidir se padronizam (no LinkedIn a URL
      vira clique; no Instagram, não).
- [ ] **Cerra.AI:** publicar ou não as 25 campanhas paradas da outra IA; levar as perguntas reais para
      `dados/pergunte-cerraai.json`.
- [ ] Atualizar as campanhas dos cursos quando o catálogo da CerraClass mudar (sequência no README).
- [ ] Ideias de campanhas futuras: promoção de consignado, cases de clientes da Fábrica, depoimentos de alunos,
      turmas com data definida (aí sim com data, em peça de vida curta), conteúdo educativo de contabilidade.
- [ ] Skills instaladas e ainda não usadas: `threejs-*` (3D) e `lemo-opuscar` (curtas cinematográficos, pesado).
- [x] **ESPAÇO NO GITHUB PAGES (resolvido em 02/11):** o publicado somava ~968 MB de 1 GB. Passou a ~370 MB:
      PNG quantizados em 256 cores (197 → 81 MB), MP4 sem a trilha e reencode em crf 24 (522 → 179 MB), .zip
      refeitos (161 → 59 MB) e mídia kit (31 → 18 MB). Ferramenta: `tools/otimizar_publicacoes.py`. O `.git`
      continua com ~1,4 GB de histórico; reduzir isso exigiria reescrever o histórico (não recomendado com
      duas IAs no mesmo repositório).
- [ ] Histórico do espaço no GitHub Pages: o limite é 1 GB por site. `entregas/` usava ~405 MB (19 campanhas) e foi
      reduzida para **~290 MB** em 26/10 (e voltou a ~425 MB em 28/10, com a série da Cerrado Tech e os vídeos novos): o `.zip` de cada campanha passou a levar só as imagens e as legendas,
      não os vídeos (o time baixa o vídeo direto na Central de Conteúdos). Os `.zip` caíram de 198 MB para 84 MB.
      Se apertar o limite de novo, o próximo passo é mover os vídeos antigos para outro armazenamento
      (Google Drive, Firebase Storage) e deixar no repositório só as peças estáticas.
