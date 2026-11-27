# Próximos passos: Cerrado Finanças & Tech

Ponto de partida para retomar o trabalho. Última atualização: 27/11/2026.

**Vai continuar em outra IA?** Leia a seção [Passagem para outra IA](#passagem-para-outra-ia-021126) no fim deste arquivo:
ela tem o resumo do que foi feito, o que falta e um prompt pronto para colar.

## Onde está cada registro

| Arquivo | Conteúdo |
|---|---|
| [`context.md`](context.md) | Como o site é construído: páginas, includes, identidade visual, padrões, deploy |
| [`marketing/README.md`](marketing/README.md) | Passo a passo do estúdio de conteúdo: exportar, verificar, renderizar vídeos, publicar |
| [`marketing/HISTORICO.md`](marketing/HISTORICO.md) | O que foi produzido em marketing, decisões de conteúdo e pendências |

Nenhum desses arquivos é publicado no site (estão no `exclude` do `_config.yml`).

## Sessão de 26 e 27/11/2026 (nova /fabrica com escritório 3D)

**Pronto e publicado no site:**
- **O que é:** a `fabrica.html` foi refeita do zero com um escritório 3D de **objetos reais** modelados em código.
  São notebook, estante, celular, rack, maquininha, pastas, monitor, cadeado, switch e prancheta, e a rolagem leva a
  câmera de um serviço a outro.
- **Processo:** plano em `PLANO-FABRICA.md`, com portões aprovados pelo Renato (objetos → conceito em movimento →
  página).
- **Lighthouse:** celular 99, PC 91, Acessibilidade, Boas práticas e SEO 100.
- **Testes:** Chrome, Firefox e Safari (WebKit), a 60 fps.
- **Onde está:** código em `assets/fabrica/`, estúdio e testes em `fabrica-estudio/`. Estrutura no `context.md`.
- **Transições:** o `css/global.css` ganhou `@view-transition` (transição suave entre páginas).

**Próximo:**
- [ ] Felipe e 1–2 pessoas testarem no celular (agora no ar) e anotar o que travar ou confundir.
- [ ] Opcional: medir cliques em proposta e WhatsApp e a profundidade da rolagem (F6 do plano).
- [ ] Opcional: usar os objetos 3D (`assets/fabrica/objetos/`) nos filmes e peças do marketing.

## Sessão de 25/11/2026 (cartões de visita em 8,6 x 4,8 cm)

**Pronto, com commit (`486c92d`), falta o push:** os cartões de visita ganharam o terceiro tamanho, **8,6 x 4,8 cm**
(86 x 48 mm + 3 mm de sangria), ao lado de 9 x 5 e 8,8 x 4,8 cm. São 10 cartões, frente e verso, em
`marketing/formatos/<frente>/cartao-vN-86x48mm.pdf`, já listados na aba Formatos e nos zips. Tamanhos em `TAMANHOS`
no `marketing/tools/gerar_formatos.py`. Detalhes em `marketing/HISTORICO.md`.

## Sessão de 23/11/2026 (arquitetura de motion)

**Pronto, sem commit:** estudo dos 20 repositórios de motion graphics incorporado ao estúdio (kit 1.2: `revisar`,
`pops`, `ritmo`, `palavras`, `som`; `filmes/frentes-comum/tempo.js`; 6 skills novas com licença). Regra em
`marketing/.claude/skills/video-estudio/references/motion-arquitetura.md`; detalhes em `marketing/HISTORICO.md`.

**Próximo:** usar a arquitetura no próximo filme da frente (batidas em `timeline.json` primeiro, `tempo.js`, revisão
por batida até notas ≥ 8). Opcional: corrigir os 3 defeitos que o `pops` achou no `cerra-ai-comercial`.

## Sessão de 21 e 22/11/2026 (institucional, cartões da Contabilidade, conhecimento de vídeo)

**Pronto e publicado no site**
- **Cartões da Contabilidade** com o contador responsável (Renato Rosa, CRC-MT 021719/O-5): 3 versões (Ficha, Perfil,
  Tinta) no lugar das 5 antigas, verso "Qual é a sua empresa?" em 3 layouts. Commit `08d62e8`.
- **Aba Formatos sem imagem velha do cache:** links com `?v=<versão>`. Commit `a8fbf3c`.

**Pronto, mas sem commit (decidir se publica)**
- **Vídeo institucional v3** "Seu contador enxerga o seu sistema?" em `marketing/entregas/2026-11-escritorio/`:
  `institucional-16x9.mp4` (4,5 MB), `reel-9x16.mp4` (4,3 MB, legenda karaokê), `story-9x16.mp4` (1,9 MB), legendas,
  capas, QA e `RELATORIO.md`. Aprovado pelo Renato ("ficou legal"). Fontes: `marketing/conteudo/2026-11-escritorio/`
  (DIRECAO, roteiro, storyboard, áudio, `trab/`) e `marketing/filmes/frente-escritorio/fonte/`. Refazer tudo:
  `bash conteudo/2026-11-escritorio/trab/refazer.sh` (de `marketing/`). Histórico das 3 versões em `marketing/HISTORICO.md`.
- **Conhecimento de vídeo:** `marketing/.claude/skills/video-estudio/references/aprendizados.md` e `direcao-modelo.md`,
  mais ajustes nas skills `video-estudio`, `video-referencia`, `video-roteiro` e `video-motion`. As 13 skills
  `video-*` inteiras ainda **não estão no git** (`marketing/.claude/skills/video-*`, não versionadas).

**Pendências**
- [ ] **Publicar o institucional na Central:** criar `marketing/entregas/2026-11-escritorio/info.json` (título, data,
      descrição), acrescentar a regra do prefixo `escritorio` em `REGRAS` do `tools/publicar.py`, rodar
      `python tools/publicar.py`, conferir a Central e o espaço do GitHub Pages (~11 MB de vídeo), commitar só a pasta.
- [ ] **Commitar as skills de vídeo** (`marketing/.claude/skills/video-*`) e as fontes do institucional
      (`marketing/conteudo/2026-11-escritorio/`, `marketing/filmes/frente-escritorio/fonte/`); `filmes/frente-*/16x9` e
      `9x16` são gerados (não versionar).
- [ ] **Foto do escritório:** `img/escritorio.jpeg` tem o ✦ de edição do Gemini; confirmar se é foto real ou
      fotografar o espaço. Com mídia real, ela entra no plano 2 do institucional (3,3–7,4 s).
- [ ] **Regra "só grátis ou local":** decidir (1) quantos funcionários a empresa tem — se forem 4+, o Remotion exige
      licença paga e os reels de `marketing/filmes/remotion/` não devem ser reaproveitados (migrar para HyperFrames);
      (2) remover ou marcar como descontinuado `gerar_gamma.py` e `GAMMA_API_KEY` em `.env.example`; (3) testar a voz
      local **Piper** (pt-BR, conferir licença da voz) no lugar da SAPI.
- [ ] **Kit de vídeo (`marketing/.claude/skills/video-estudio/scripts/kit.py`):** levar as correções de legenda que
      fiz à mão (deixa por frase, `\k` medido de início a início, início preso à fala, MarginV 260, Inter TTF 700
      gerada do woff2 — scripts em `marketing/conteudo/2026-11-escritorio/trab/legenda_v3.py`) e criar os comandos
      `movimento` (zoom/pan/cortes) e `cor` (brilho, contraste, saturação por cena) para analisar referências.
- [ ] **Logo do site:** a marca agora é só a folinha, mas o header (`img/logoheader.png`) e o footer (`img/logo.png`)
      ainda usam o losango roxo antigo.
- [x] **CerraFood:** ficou sem cartão de visita desde 22/11 (`3e76d54`); só a Contabilidade tem mais de um (3).
- [ ] **Reorganizar as pastas de `marketing/`** (pedido do Renato, para outra IA): ver a seção abaixo.

### Reorganizar as pastas de marketing (prompt para outra IA)

Levantamento de 22/11: 162 pastas soltas em `entregas/`; 155 nomes iguais em `conteudo/` (fonte) e `entregas/`
(publicado); palestras em até 3 lugares (`palestras/`, `entregas/2026-11-palestra-enbra…`, `palestras/2026-11-palestra-enbra-transformacao-digital-ia/artes/`,
`conteudo/2026-10-palestra-carreira-ia`); peças da equipe com dois nomes (`camila_anjos` × `camila-anjos`,
`felipe_borges` × `felipe-marketing`, `renato_rosa` × `renato-rosa`); dois sistemas de vídeo (`filmes/` e `filmes/remotion/`).
**Resolvido em 23/11:** a organização sem apagar nada foi feita (seção do fim). `marketing/conteudo` e
`marketing/palestras` já estão no `exclude` do `_config.yml`, então commitá-las não publica nada.

Prompt para colar:

```text
Tarefa: organizar as pastas de marketing do repositório D:\Dev\cerradofinancas (site Jekyll no GitHub Pages).
Objetivo: fácil de navegar, nada duplicado, nenhuma coisa com dois caminhos. Separar com clareza: (1) post/carrossel
de Instagram, (2) vídeo, (3) palestra/apresentação, (4) proposta comercial, (5) marca e kits, (6) ferramentas e dados.

Regras: não mova nada antes de eu aprovar um plano (inventário + árvore proposta + tabela de → para + arquivos de
código/páginas a ajustar + o que seria apagado e por quê). Outra IA trabalha no repo em paralelo: nunca `git add -A`,
use `git mv`, não mexa em arquivo modificado por outra sessão sem perguntar, não commite sem eu pedir. Nada é apagado
sem estar na lista aprovada; duplicata só sai com hash (md5) igual. `marketing/entregas/` é publicada: a Central
(`marketing/index.html`) lê `entregas/conteudos.json`, gerado por `python marketing/tools/publicar.py` (agrupa pelo
prefixo do nome da pasta, ver REGRAS); a aba Formatos lê `marketing/formatos/formatos.json` (gerado por
`tools/gerar_formatos.py`). Pasta nova em marketing/ precisa entrar no `exclude` do `_config.yml` se não for pública.
GitHub Pages está perto de 1 GB: não duplique MP4. Atualize marketing/README.md, marketing/HISTORICO.md e
PROXIMOS_PASSOS.md no fim.

Contexto já levantado está em PROXIMOS_PASSOS.md, seção "Reorganizar as pastas de marketing". Refaça a varredura de
duplicatas (md5 de arquivos > 20 KB, ignorando node_modules, .claude e .hyperframes) e informe os MB desperdiçados.
Fora do escopo: `video/` da raiz (hero do site) e `PortfolioParceriaLS/`.
Depois da aprovação: execute em etapas, rode os geradores e o publicar.py, confira a Central e me mostre o git status
final sem commitar.
```

## O que foi feito (outubro de 2026)

**Site**
- Reposicionamento: a home virou hub das 4 frentes (Fábrica de Software, Contabilidade, Crédito, Cursos).
  A antiga home de software está em `fabrica.html`.
- Novas páginas: `/credito/` (correspondente bancário multi bancos com a LS Intermediação Financeira)
  e `/cursos/` (Cerraclass, com links para cerraclass.com.br).
- Header só com as 4 frentes; Startups, Parceiros e Data Driven foram para o footer e para a home.
- Folinha como logo do hub, favicon, ícone de app (iPhone/Android) em todas as páginas; recorte da folinha limpo.
- Central de Conteúdos em `/marketing/` para o Felipe (marketing) baixar as peças.
- Sitemap completo: as 51 páginas públicas estão listadas (antes faltavam portfolio, iacao, iafarma,
  consultorias e as páginas de produto/GovTech).
- `/cursos/` passou a listar os **11 cursos presenciais** do catálogo da Cerraclass (7 de um dia e
  4 imersões), com link para a página de cada curso no site da Cerraclass.
- `/iafarma/` sem data nem preço: "próxima turma sob consulta". A data fixa (13/09) já tinha passado.
- `gerar_gamma.py` sem chave no código: a chave vem da variável de ambiente `GAMMA_API_KEY`
  (`.env`, ignorado pelo git).

**Marketing:** **112 campanhas** publicadas na Central em 30/10 (Contabilidade 22, Cerrado Tech 17, Crédito 16, Guia Acadêmico 15, CerraClass 14, Cerra.AI 13, Institucional 8, Consultorias 7). Detalhes em `marketing/HISTORICO.md`.
Em 28/10, Cerra.AI e CerraClass (com os cursos) ganharam **identidade visual própria** e vídeos novos em
HyperFrames (16:9 e 9:16); Cerrado Tech e Cerrado Finanças seguem com a identidade do site.

**30/10:**
- **Guia Acadêmico** (consultoria acadêmica) virou a 4ª conta, @guiacademico: identidade "Artigo", 15 campanhas,
  mídia kit, e o site guiacademico.com.br refeito na mesma identidade e publicado (Firebase, conta
  comercial@cerradofinancas.com.br).
- **Datas comemorativas** nacionais (6, até 01/01/2027) e **agenda** recomeçando em 31/10, com repetição do conteúdo
  quando ele acaba.
- **Cerra.AI, extras:** glossário (5), Pergunte ao Cerra.AI (3), comparativo com a nuvem, 8 stories interativos,
  checklist IA e LGPD em PDF e kit de vendas (one-pager e deck). O @cerra.ai tem conteúdo novo até 23/11.

**31/10:** apresentação institucional ("Prazer, ...") de Cerra.AI, Cerrado Tech, CerraClass e Guia Acadêmico,
cada uma na identidade da marca, para fixar no topo de cada perfil. A agenda começa por elas (31/10) e o Reel sai em 07/11.
Também em 31/10, o **Guia Acadêmico ganhou o post de Facebook**: uma arte única (`facebook.png`, 1080×1350) no lugar do
carrossel, ou o `carrossel-animado.mp4` como vídeo, e uma legenda própria (`legenda-facebook.txt`) com o link do
WhatsApp inteiro (`https://api.whatsapp.com/send?phone=5567993515206`), que o Facebook transforma em link clicável.
Vale para as 15 campanhas dos Cadernos de método e para a apresentação; a Central já mostra a peça e o card "Facebook".
Detalhes em `marketing/HISTORICO.md`.

**31/10 a 02/11 (sessão do Renato com o Claude):**
- **Vídeos institucionais refeitos** (`8b77cd3`, `dadf112`):
  - O que mudou: o carrossel animado das 4 apresentações ("Prazer, ...") deixou de só passar slides. Agora cada
    elemento entra com o seu movimento, numa coreografia própria de cada marca, em `marketing/filmes/coreografias/`.
  - Áudio: os vídeos saem **sem áudio**, porque a trilha sintetizada foi reprovada. `--com-audio` reativa.
  - Correção: o quadro do Guia Acadêmico desmontava por causa de um conflito com a classe `.quadro`, já corrigido.
  - Como usar: `marketing/filmes/README.md`, seção "Coreografia própria".
- **`/portfolio/` refeito, só com o Sob Demanda:**
  - `7f1f4e1`: saiu "Software por segmento". Entraram:
    - as 16 capacidades com filtro por área, cada uma com "na prática", exemplo e "você recebe";
    - "monte a sua solução", com a lista enviada pelo WhatsApp;
    - linha do tempo do projeto e perguntas frequentes.
  - `5be33f7`: modelo comercial em destaque, com 3 etapas ligadas e um gráfico ilustrativo.
  - `d55bf65`: hero 3D (Three.js) feito a partir de um briefing do Renato. Foi **reprovado** ("ficou uma bela
    bosta") e revertido em `7f72762`. Não refazer 3D nesta página sem pedido explícito.
  - `7f72762`: ícones trocados pelos **Phosphor duotone** inline (MIT), com os mesmos ids do sprite.
- **Estudo do repositório github.com/drix10/ai-resources** (02/11): `marketing/dados/estudo-ai-resources.md`.
  É um acervo de notícias de IA com fonte (CC BY 4.0). Serve como pauta "IA da semana" para o Cerra.AI e a CerraClass,
  como radar de ferramentas e como base de demonstração de RAG. Para construir sites, quase nada.
- **02/11 (terceira rodada):**
  - **Identidade de movimento por marca:** cada marca ganhou estilo, conceito de abertura, curvas,
    tipo de troca, câmera e grão. Fonte única em `marketing/brand/movimentos.json`, guia em
    `marketing/brand/MOVIMENTO.md`. O carrossel animado (`filmes/ferramentas/animar-carrossel.mjs`) já lê
    essa configuração pelo nome da campanha: nada de fade, corte em movimento, câmera que respira.
    Seis vídeos re-renderizados como amostra (uma peça por marca).
  - **3D nas artes de marketing:** o filme do Cerra.AI "o cobre" (12 s, 16:9 e 9:16) foi **reprovado** na
    primeira versão e apagado das entregas (`c951cf2`): a folha virava um leque de folhas ao dobrar (eram 16
    cópias a 3 px em `translateZ`). **Corrigido em `bcaa034`:** 9 cópias a 1,1 px e inclinação discreta, sem
    dobrar. Está renderizado em `marketing/filmes/out/cerraai-cobre-16x9.mp4` e `-9x16.mp4`, **não publicado**,
    esperando o aval do Renato. Se ele não gostar, apagar `marketing/filmes/cerraai-cobre/` e parar por aqui.
  - **Virada de página corrigida (`bcaa034`):** a folha anterior rodava até -102° e mostrava o verso do papel
    ao avesso, com as duas folhas sobrepostas. Agora a folha nova entra até 72° e a anterior escurece atrás.
    Contabilidade e Crédito re-renderizados e no ar.
  - **Site da CerraClass publicado** com "10 alunos por turma" (o projeto fica na conta
    `gestor.renatorosa@gmail.com`, não na comercial).
- **02/11 (sessão do Renato com outra IA):**
  - **Espaço do GitHub Pages resolvido:** o publicado saiu de **~968 MB para ~370 MB** (limite de 1 GB).
    Ferramenta nova `marketing/tools/otimizar_publicacoes.py`: PNG quantizado em 256 cores (197 MB → 81 MB),
    MP4 sem a trilha sintetizada e reencode em libx264 crf 24 (SSIM 0,994; 522 MB → 179 MB), .zip refeitos
    (161 MB → 59 MB) e mídia kit (31 MB → 18 MB). A Central foi atualizada com os tamanhos novos.
    Commits `ab4c235` e `3be97cb`.
  - **Série "IA da semana" no @cerra.ai** (aprovada pelo Renato): gerador dirigido por dados
    (`marketing/tools/gerar_ia_da_semana.py` + `marketing/dados/ia_da_semana/AAAAMMDD.json`).
    Edição 01 publicada (04/11 o post, 10/11 o Reel): Anthropic (envenenamento de 0,1% do pré-treino),
    Mistral Large 4 (1 trilhão de parâmetros com pesos abertos) e Google DeepMind (PlanAssist).
    Todo número foi conferido abrindo a fonte original. Commit `b962c8a`.
  - **Estudo de motion design e 3D** (02/11): `marketing/dados/estudo-motion-design.md` — motionmaxxing,
    bang-motion, dimensional-drawing e img2threejs, com o que serve e o que não serve para a gente.
  - **Catálogo da CerraClass alinhado para 10 alunos**: corrigidos os 5 textos do projeto `D:\Dev\CerraClass`
    (`presencialCourseContent.ts`, `CursoPresencial.tsx`, `Landing.tsx` e `Presenciais.tsx`) e reimportado o
    catálogo para `marketing/dados/cerraclass-cursos.json`. O site da CerraClass ainda **não foi publicado**
    (o `firebase login` está expirado): é preciso `firebase login --reauth` e
    `firebase deploy --only hosting --account comercial@cerradofinancas.com.br` em `D:\Dev\CerraClass`.

**Palestra "Muito Além do Currículo: IA na Prática" (29/10):** versão animada com 29 slides
(`marketing/conteudo/2026-10-palestra-carreira-ia/apresentacao-animada.html`), online em
https://www.cerradofinancas.com.br/marketing/entregas/2026-10-palestra-carreira-ia/apresentacao/. Detalhes em `marketing/HISTORICO.md`.

## O que foi feito (novembro de 2026)

**Reformulação do site como vitrine: fase 0, protótipo (12/11).** Em construção na branch `reformulacao-vitrine`,
num worktree separado (`D:\Dev\cerradofinancas-vitrine`); o `main` não foi tocado. Nada publicado, nada commitado.
- **Conceito "casa de marcas":** estrutura Cerrado (azul, dourado, folinha) e cada produto com a própria identidade no miolo.
- **Decisões do Renato:** do `site_3d/`, aproveitar só os elementos, não o conceito. As 5 startups saem.
  Os 8 módulos GovTech viram um produto só, o **Cerrado Gov**. Guia Acadêmico e CerraClass ficam fora, e a
  CerraClass aparece só como menção com link para cerraclass.com.br. Os filmes 3D das frentes foram **aprovados**.
- **O que existe:**
  - `_data/produtos.yml`, o catálogo e fonte única, com 28 itens;
  - `_layouts/v2.html` e `_includes/v2/` (header com mega-menu, footer, cartão, ícones);
  - `assets/v2/`: CSS, JS, fontes locais, GSAP 3.13 vindo do `site_3d`, loops de 10 s recortados dos filmes
    das frentes e fotos da equipe em WebP;
  - páginas `/v2/`, `/v2/produtos/` (filtros com FLIP) e `/v2/cerraai/` (ficha na identidade "Silício local"), todas com `noindex`.
- **Pré-visualizar sem Jekyll:** o build em liquidjs e o servidor ficaram no scratchpad da sessão. Para refazer,
  use `npx liquidjs` ou rode o Jekyll.
- **Falta:**
  - o aval do Renato no protótipo;
  - a página unificada do Cerrado Gov (hoje o cartão aponta para `govdash.html`);
  - redirecionar `/cursos/`, `/iacao/`, `/iafarma/` e `startups.html`;
  - migrar as demais páginas para o layout v2 (fases 1 a 5 do plano).

**Cyber Security na Fábrica de Software (12/11).** Commits `b7ffaa9` (página + oferta) e `2987518`
(header revertido ao original — o menu **não** foi alterado).
- **Página nova:** [`cyberseguranca.html`](cyberseguranca.html) — Cyber Security & Pentest, com
  hero, 6 diferenciais (IA local/air-gapped, ROE assinado, análise de código vibecodado, dependências
  por versão, teste do que está no ar, relatório CISO/técnico), 3 ofertas (passiva, ativa assistida,
  correção & retest), metodologia em 5 passos, seção de **escopo explícito** (sem DoS, força bruta,
  persistência ou alteração de dados) e CTA por WhatsApp.
- **`fabrica.html`:** card "Cyber Security & Pentest" na grade de soluções + faixa de destaque
  (`.cyber-band`) entre as soluções e a metodologia, com 4 selos e dois CTAs.
- **Menu:** tentativa de incluir o item no header foi **revertida** a pedido do Renato; o acesso se dá
  pelo card, pela faixa e pelo sitemap.
- **`sitemap.xml`:** entrada nova com prioridade 0.8. Deploy do GitHub Pages conferido em produção
  (página 200 OK, card e faixa presentes).
- **Regra aprendida:** não alterar `_includes/header.html` sem pedido explícito.

**CerraFood, a plataforma white label de gestão de restaurantes (10/11).** Commits `f6d2d67`, `a0bada7`, `cee3f36` e
`466a054`;
no mesmo dia, reposicionado de "sistema para pizzaria" para **restaurantes em geral** (pizzaria, hamburgueria,
restaurante e delivery): textos, exemplos (X-Burguer, parmegiana, prato executivo) e ilustrações (hambúrguer e prato
feito ao lado da pizza) nas peças e na página.
- **Marketing:** identidade própria "Comanda" (`marketing/brand/cerrafood/`), peça global "A plataforma inteira"
  (8 slides com ilustrações e carrossel animado com coreografia própria), apresentação "Prazer, CerraFood" e 10
  campanhas, uma por módulo. Cada uma tem story, carrossel animado e legendas de Instagram, LinkedIn e Facebook. Há
  também um mídia kit. Tudo na Central, na agenda do @cerradofinancas de 11/11 a 19/12, um dia sim e outro não, sem
  mudar o que já tinha sido postado.
- **Site:** `cerrafood.html` refeita na mesma identidade e só com o que o sistema faz. Saíram as afirmações sem
  base: "ticket médio 23% maior", PIX integrado, multi-loja, ponto digital, taxa por distância, "implementação em 7
  dias" e a seção Enterprise.
- **Regras:** nunca citar a primeira implantação (o código fica em `D:\Dev\NapoleFood`); só o que está no código; o
  selo "sua marca aqui" só nas peças sobre white label. Detalhes, calendário e o passo a passo da publicação em
  `marketing/HISTORICO.md` (seção "CerraFood"); o que pode e não pode afirmar em `marketing/brand/cerrafood/README.md`.

**Peças da equipe (10/11), fora da agenda.** Post e story de Talita Marques (Consultora Comercial), Felipe Borges
(Marketing), Renato Rosa (Consultor Técnico e Proprietário) e Camila Anjos (Especialista Contábil), na identidade
institucional, com a foto em arco (`marketing/brand/anuncio-equipe.css`). Estão na Central em "Institucional ·
Equipe" para a equipe postar quando quiser. Commits `466a054`, `d2ac000` e `9223395`. Passo a passo para uma pessoa
nova em `marketing/HISTORICO.md`, seção "Peças da equipe".

**Filmes 3D das frentes (11/11), aguardando aval.** Um filme de 32 s por frente (Cerra.AI, Cerrado Tech,
CerraClass, Guia Acadêmico, CerraFood, Contabilidade, Crédito e Consultorias), em 16:9 e 9:16, sem áudio, cada um
com um objeto 3D próprio em Three.js (chip de cobre, blocos da fábrica, cadeiras da turma, bússola, impressora
térmica e pizza, razonete e escada, caneta que assina, organograma em arame) e o roteiro tirado só das peças
aprovadas. Fonte em `marketing/filmes/frente-*/fonte/`, MP4 em `marketing/filmes/out/frente-*.mp4` (fora do git,
**não publicados**). Como fazer e refazer: `marketing/filmes/README.md`, seção "Filmes 3D das frentes".

**Sessão de 11 e 12/11/2026 (Renato com o Claude): filmes 3D e duas palestras.** Nada foi commitado.
- **Filmes 3D das frentes** (8 filmes, 32 s, 16:9 e 9:16, Three.js no HyperFrames): `marketing/filmes/frente-*`, MP4 em
  `marketing/filmes/out/`. Aguardam aval; detalhes em `marketing/filmes/README.md` e no `marketing/HISTORICO.md`.
- **Palestra ENBRA v3**, "IA na empresa: o dado sai ou fica em casa?" (29 slides, demonstração do Cerra.AI ao vivo):
  `marketing/palestras/2026-11-palestra-enbra-transformacao-digital-ia/` (v1 e v2 em `anteriores/`). Registro em
  `REGISTRO-v3.md`; link privado https://claude.ai/artifact/QSEkRtFs9d9mn9DWKYhfzV.
- **Palestra "Segurança Cibernética e Soberania Tecnológica" v2** para a ADESG-MT (13/11/2026, 19h, Faculdade FAIPE;
  39 slides com globo 3D): `marketing/palestras/2026-11-palestra-ciberseguranca-soberania/`. Registro em `REGISTRO-v2.md`;
  link privado https://claude.ai/artifact/8vBwVS1zkFia3icPZMoxXM.
- **Para continuar:** ler o `REGISTRO-*.md` da pasta; os textos da palestra ADESG ficam em `apresentacao-v2/gerar_slides.py`.

**Apresentação "Pipeline Global Estudos" (Pipeline Global VS2, Itaú / ICTi), 16/11/2026.** Nada commitado nem publicado.
- 39 slides didáticos (selos de evidência, analogias, notas por clique, uma ficha com pergunta e resultado esperado por frente), 3D próprio (69 colunas + tubo com 8 anéis, sem
  partículas) e vinheta Remotion: `marketing/palestras/2026-11-itau-pipeline-global-vs2/`. 100% Itaú/ICTi, sem nada da Cerrado.
  Apresentadores: Renato Rosa e Ian Barreiro. Conteúdo: documento de apoio v2 (status 16/11/2026) e, no DiD, o artigo de resultados da Aceleração. Logo do ICTi vetorizada.
- Arquivo para enviar: `marketing/palestras/2026-11-itau-pipeline-global-vs2/pipeline-global-estudos.html` (único, offline; refazer com `montar_unico.py`).
- **Para continuar:** ler `marketing/palestras/2026-11-itau-pipeline-global-vs2/REGISTRO.md`.

**Apresentação ICPO (Itaú / ICTi), 19/11/2026.** Nada commitado nem publicado.
- Apresentação independente sobre o Índice Composto de Performance Operacional: 28 slides, os 12 gráficos do estudo,
  explicação didática, 3D claro próprio, vinheta Remotion. Pasta `marketing/palestras/apresentacao_indice_ICPO/`.
- Entregas: `ICPO_apresentacao.html` (único, offline, 3,4 MB) e `ICPO_apresentacao.pdf` (leve, 2,2 MB).
- **Para continuar:** ler `marketing/palestras/apresentacao_indice_ICPO/REGISTRO.md`.

## Pendências

### Palestra ADESG-MT (13/11, 19h, FAIPE)
- [ ] Antes de sair: atualizar Nvidia, Binance, Smart Sampa e PL 2338 em
      `marketing/palestras/2026-11-palestra-ciberseguranca-soberania/apresentacao-v2/gerar_slides.py`, rodar o gerador e o verificador.
- [ ] Ensaiar com a NVIDIA forçada no Chrome; levar o PDF de contingência.

### Apresentação ICPO
- [ ] Confirmar apresentadores (Renato Rosa e Ian Barreiro) e validar os grupos de ação do G11.

### Apresentação Itaú VS2
- [ ] Atualizar o andamento dos testes da Target Factory com a responsável (slides 6, 7, 10 e 37) e rodar `montar_unico.py`.
- [ ] Abrir o HTML único no notebook do Itaú antes do dia (se o 3D for bloqueado, segue sem o fundo).
- [ ] Ensaiar com a NVIDIA forçada no Chrome; PDF de contingência em `marketing/palestras/2026-11-itau-pipeline-global-vs2/apresentacao.pdf`.

### Palestra ENBRA v3
- [ ] **Gravar a demonstração do Cerra.AI** (3 min) e salvar em
      `marketing/palestras/2026-11-palestra-enbra-transformacao-digital-ia/apresentacao-v3/video/demo-cerraai.mp4` (plano B, tecla V).
- [ ] Na véspera: conferir se houve decisão nova no caso NYT × OpenAI (slide 09) e ensaiar com a RTX 4060 forçada no Chrome.

### Marketing: filmes 3D
- [ ] **Aval do Renato nos 16 vídeos** (`marketing/filmes/out/frente-*.mp4`). Aprovados, criar
      `entregas/2026-11-filme-<frente>/` (ou pôr o vídeo na campanha da apresentação de cada marca), com `info.json`
      e legendas, rodar `tools/otimizar_publicacoes.py`, `tools/publicar.py` (com a regra de não varrer pastas de
      outra IA) e conferir o espaço do GitHub Pages (~4 MB por vídeo, ~64 MB os 16).

### Site
- [ ] **CerraFood:** acrescentar PIX integrado, NFC-e, iFood ou multi-loja na página e nas peças **só** quando o
      sistema tiver essas partes publicadas (hoje não tem).
- [ ] **Trocar a chave da API do Gamma**, caso ela tenha circulado. A chave saiu do código (agora vem de
      `GAMMA_API_KEY`) e `gerar_gamma.py` entrou no `.gitignore`, mas a chave antiga continua válida no Gamma.
- [ ] `analyze_pages.py` teve o caminho corrigido para `D:\Dev\cerradofinancas` (projetos migrados de
      `C:\Users\Renato\Documents`); outros scripts antigos podem ter o mesmo problema.
- [ ] `/iacao/` ainda mostra preço (R$ 300 individual / R$ 1.800 equipe) enquanto `/iafarma/` ficou "sob consulta".
      Decidir se os dois ficam igual.
- [ ] No catálogo da CerraClass, "turma de no máximo 15 alunos" ainda diz 15. A decisão é 10 — alinhar lá
      (o site e as peças já dizem 10).

### Marketing
- [ ] **Peça da Camila Anjos:** trocar por um retrato mais nítido, se houver, e confirmar se ela é nova no
      time (o rótulo hoje é "Nosso time").
- [ ] **Agenda do @cerra.ai:** quando as 25 campanhas paradas da outra IA forem publicadas, rodar o `agendar.py` muda
      as datas de posts do @cerra.ai já postados (04/11 a 10/11). Antes, pôr o Cerra.AI em `ESTREIAS` no `agendar.py`
      (como foi feito com o CerraFood) ou fixar o passado.
- [ ] O deploy do GitHub Pages de 09/11 **falhou** (o de 10/11 passou). Ver o motivo se voltar a acontecer.
- [ ] **Espaço do GitHub Pages: RESOLVIDO em 02/11** (de ~968 MB para ~370 MB). Antes da próxima leva grande de
      vídeos, rodar `python tools/otimizar_publicacoes.py` (a ferramenta só mexe em arquivo versionado e sem
      mudança de outra IA) e refazer os .zip. O `.git` continua com ~1,4 GB de histórico: para reduzir isso de
      verdade seria preciso reescrever o histórico, o que não é recomendado com duas IAs no mesmo repositório.
- [x] **Publicar o site da CerraClass** com o texto "10 alunos por turma": o `firebase login` estava expirado.
      **FEITO em 02/11:** o projeto `cerraclass` fica na conta **gestor.renatorosa@gmail.com** (é o "current"
      do `.firebaserc`, com 30 projetos), não na comercial. Deploy com `firebase deploy --only hosting` na conta
      padrão; conferido no ar: "Máximo de 10 alunos por turma". A conta comercial@cerradofinancas.com.br é a do
      projeto **guiacademicostorage** (Guia Acadêmico) e continua com credenciais expiradas.
- [ ] **"IA da semana":** a edição 01 saiu em 04/11. Para a edição 02, rodar
      `python tools/gerar_ia_da_semana.py --coletar 2026-11-09`, escolher 3 notícias **abrindo a fonte
      original**, escrever o JSON da edição e rodar o gerador. A regra: resumo de anúncio não é fato
      verificado; nunca usar número sem abrir a fonte.
- [ ] **Identidade de movimento por marca** (plano em `marketing/dados/estudo-motion-design.md`): escrever
      `brand/<marca>/movimento.md` no formato do "style brief" do bang-motion (estilo, conceito, curvas,
      câmera, transições, som) e tirar o fade da troca de slide. Começar pelo Cerra.AI e pelo white-label.
- [ ] **3D em vídeo:** o `hero3d` do motionmaxxing resolve o logo como objeto de luz real. O hero 3D foi
      reprovado no site (`/portfolio/`, commit `7f72762`) e não volta lá sem pedido explícito. Precisa de aval.
- [ ] Ouvir o áudio dos Reels antes de postar (sons sintetizados, nunca revisados por uma pessoa).
      Medido em 26/10 com `marketing/tools/conferir_audio.py`: os 19 vídeos têm trilha, sem clipping e sem
      silêncio longo. O nível está baixo (RMS ≈ -28 dBFS) — vale ouvir e decidir se sobe o volume.
- [ ] Ajustar o catálogo da CerraClass para 10 alunos por turma (ver acima).
- [ ] Ouvir as trilhas novas dos vídeos HyperFrames (sintetizadas por `marketing/filmes/ferramentas/trilha.mjs`; volume já medido, escuta pendente).
- [ ] **Conteúdo novo acaba antes do fim da agenda** em algumas contas (ver a aba Agenda da Central). Desde 30/10 a
      agenda repete os posts da conta desde o mais antigo quando o conteúdo novo acaba, então nenhum dia fica vazio,
      mas o ideal é produzir mais peças para as contas que entram em repetição cedo.
- [ ] Palestra: levar os slides novos da versão animada para `slides.html`, `apresentacao.html` e os PNGs;
      ao mudar a versão animada, atualizar também a cópia online (passo a passo em `marketing/HISTORICO.md`).
- [ ] **Re-renderizar as ~104 campanhas com a nova gramática de movimento.** Agora o `animar-carrossel.mjs`
      lê `brand/movimentos.json` pelo nome da campanha, mas só 6 peças foram re-renderizadas (uma por marca,
      como amostra). Para as outras: `node ferramentas/animar-carrossel.mjs ../conteudo/<entrega>/carrossel.html --render`,
      uma por vez (o render trava se forem várias no mesmo comando). Depois, `python tools/otimizar_publicacoes.py`
      para encolher os MP4.
- [ ] **3D nas artes:** a primeira tentativa (folha em CSS 3D, `filmes/cerraai-cobre/`) foi **reprovada**;
  a segunda (sem o leque de cópias) está renderizada em `filmes/out/` e **espera o aval do Renato**. Se ele
  aprovar, publicar como `entregas/2026-11-cerraai-cobre-3d/` (frente Cerra.AI, série "Filme 3D") e rodar
  `tools/publicar.py`. Se não, apagar a fonte. Não refazer 3D em CSS sem essa definição.
- [ ] **Identidade de movimento por marca:** as sete marcas já estão declaradas em `brand/MOVIMENTO.md`.
      Falta aplicar a gramática às quatro **apresentações** (que têm coreografia própria) e aos filmes
      comerciais (`cerra-ai-comercial`, `cerra-ai-lancamento`, `cerraclass-curso`, `cerraclass-lancamento`,
      `credito-comercial`), que ainda usam o movimento antigo.
- [ ] **Guia Acadêmico:** criar o perfil @guiacademico no Instagram (o nome foi usado na agenda e precisa ser
      confirmado); confirmar se os números do site (+120 trabalhos, 94% de aprovação, 10+ anos) podem ir para as
      peças. O site novo foi publicado em 30/10; o projeto Firebase (`guiacademicostorage`) é da conta
      comercial@cerradofinancas.com.br: `firebase deploy --only hosting --account comercial@cerradofinancas.com.br`.
      Confirmar (ou criar) também a página do Guia Acadêmico no Facebook: a arte e a legenda já estão na Central.
- [ ] **Legendas por rede:** só a do Facebook usa a URL completa do WhatsApp; a do Instagram ainda escreve só o
      telefone e a do LinkedIn só o site. Padronizar se fizer sentido (no LinkedIn a URL vira clique; no Instagram, não).
- [ ] **Cerra.AI:** as 25 campanhas do planejamento (`2026-11-cerraai-*` da outra IA) estão prontas em PNG, mas sem
      vídeo, fora da agenda e sem commit; decidir se publica. Respostas reais da caixinha e dos comentários vão para
      `marketing/dados/pergunte-cerraai.json`. Nos stories interativos, o sticker é posto à mão no Instagram.
- [ ] Datas comemorativas de 2027: acrescentar em `marketing/tools/gerar_datas.py` (hoje vão até 01/01/2027).
- [ ] Crédito: decidir a cidade do atendimento presencial (a LS fica em Campo Grande-MS; o `/credito` diz Cuiabá),
      se o consignado do INSS continua no site (o portfólio da LS lista o INSS só no empréstimo pessoal) e se as peças
      usam o WhatsApp da LS. As peças hoje não citam cidade e usam o WhatsApp da Cerrado.
- [ ] Consultorias: confirmar se os números do site (50+ projetos, R$ 2 bi, 12 anos, "até 40%") podem ir para anúncio.
- [ ] Contabilidade: confirmar se atendem Lucro Real (as peças ainda não citam) e, quando houver, incluir o nome e
      o CRC do responsável técnico. A série "Você sabia?" foi conferida com a lei em 28/10/2026; revisar se algo mudar
      antes da data de cada post.

### Portfólio e vídeos (de 31/10 a 02/11)
- [ ] **`/portfolio/`: o Renato revisar os textos novos.** Ninguém revisou ainda os que eu escrevi:
      - o exemplo de entrega e a lista "você recebe" de cada uma das 16 capacidades;
      - as 5 perguntas frequentes;
      - os dois benefícios do bloco da sala de formação, "Equipe capacitada" e "Clientes mais bem atendidos". Eles
        substituíram o trecho que falava da receita da própria Cerrado Tech.
      - **Conferência de 02/11 (feita por outra IA, sem alteração):** os 16 exemplos estão marcados como
        "Exemplo", nenhum número, preço, cliente ou prazo aparece nos textos novos, e as FAQ não afirmam nada
        que não esteja no site. Dois pontos para o Renato decidir: o compromisso de "código é seu, sem amarras de fornecedor"
        (na FAQ "O código e os dados ficam com quem?") e "hospedagem" na mensalidade do modelo comercial.
- [ ] **`/portfolio/`: a página é editada direto no `portfolio.html`.** O script que a gerou ficou numa pasta temporária
      e não existe mais. As descrições das 16 capacidades também estão em `marketing/tools/gerar_portfolio_tech.py`
      (série "O que a Cerrado Tech constrói"): ao mudar uma, mudar a outra.
- [ ] **Carrossel animado das outras campanhas:** só as 4 apresentações têm coreografia própria. As outras ~110 usam o
      movimento genérico antigo e ainda **têm áudio**. Se o Renato pedir, re-renderizar sem áudio, com
      `node ferramentas/animar-carrossel.mjs ../conteudo/<entrega>/carrossel.html --render`, uma por vez.
      O espaço do GitHub Pages deixou de ser o travão (agora há folga); o custo é o tempo de render.
- [ ] **IA da semana (opcional):** **FEITO em 02/11** — o Renato aprovou e a edição 01 já está na agenda
      (04/11). O gerador é `marketing/tools/gerar_ia_da_semana.py`; o passo a passo está no topo das Pendências
      de Marketing.

## Como publicar uma mudança

Commit na `main` e `git push`: o GitHub Pages reconstrói o site em 1 a 2 minutos
(acompanhe com `gh run list -R renato0503/cerradofinancas --workflow pages-build-deployment`).
Depois, confira as páginas alteradas no ar (Ctrl+F5 para fugir do cache).

## Passagem para outra IA (02/11/26)

### O que foi feito nesta sessão (de 31/10 a 02/11)
Está resumido acima, em "O que foi feito", no bloco "31/10 a 02/11". Os detalhes estão em:
- `marketing/HISTORICO.md`, na seção "Apresentações institucionais (31/10)": vídeos refeitos, coreografia e sem áudio.
- `marketing/filmes/README.md`, na seção "Coreografia própria": como fazer um vídeo coreografado.
- `context.md`, no `/portfolio/`: estrutura atual da página.
- `marketing/dados/estudo-ai-resources.md`: estudo do repositório de notícias de IA.

### O que falta
1. A lista "Portfólio e vídeos (de 31/10 a 02/11)", em Pendências, logo acima.
2. As pendências de Site e de Marketing que já existiam. As mais urgentes:
   - publicar o site da CerraClass com "10 alunos por turma" (falta `firebase login --reauth`);
   - confirmar o @guiacademico e os números do site;
   - decidir se publica as 25 campanhas do Cerra.AI que estão paradas;
   - a identidade de movimento de cada marca (plano em `marketing/dados/estudo-motion-design.md`).

### Sessão de 02/11 (segunda rodada)
- **Espaço do GitHub Pages resolvido** (de ~968 MB para ~370 MB), com a ferramenta
  `marketing/tools/otimizar_publicacoes.py`. Rodar de novo depois de cada leva grande.
- **Série "IA da semana" aprovada e publicada** (edição 01 no ar, na agenda do @cerra.ai).
- **Estudo de motion design e 3D** escrito (`marketing/dados/estudo-motion-design.md`).
- **Catálogo da CerraClass alinhado para 10 alunos** no projeto `D:\Dev\CerraClass`; falta publicar.

### Regras que valem sempre (aprendidas com o Renato)
- **Outra IA usa este repositório ao mesmo tempo.** Nunca `git add -A` nem `git add .`: adicione arquivo por arquivo,
  só os seus. Se a outra IA tiver mudanças sem commit no mesmo arquivo, faça o commit num worktree limpo. O passo a
  passo está na memória "commit só dos meus arquivos" e no `marketing/HISTORICO.md`.
- Commit na `main` + `git push` publica no ar em 1 a 2 minutos (GitHub Pages). Depois confira a página no ar.
- Só são publicados: as páginas do site, `marketing/index.html`, `marketing/entregas/` e `marketing/kits/`. Um .md
  novo na raiz **vai para o ar** se não estiver no `exclude` do `_config.yml`.
- Vídeos **sem áudio**. Movimento pensado por elemento e por marca, nunca só "passar slides".
- Não inventar números, preços, clientes ou depoimentos. Exemplo ilustrativo vai marcado como "Exemplo".
- Responder ao Renato em português, direto. Ele aprova vendo o resultado no ar ou nas capturas.
- Antes de entregar, testar no navegador (Playwright) em desktop e celular e conferir o console.

### Prompt para colar na outra IA

```
Você vai continuar o trabalho no repositório D:\Dev\cerradofinancas (site cerradofinancas.com.br, Jekyll no GitHub
Pages, e o estúdio de marketing em marketing/). Antes de qualquer coisa, leia nesta ordem:
1. PROXIMOS_PASSOS.md, inteiro, principalmente "Passagem para outra IA (02/11/26)" e as Pendências;
2. context.md (como o site é feito);
3. marketing/README.md e marketing/HISTORICO.md (estúdio de conteúdo, agenda e regras);
4. marketing/filmes/README.md, se o trabalho envolver vídeo.

Regras:
- Outra IA mexe neste repositório ao mesmo tempo. Nunca rode git add -A nem git add .; adicione só os
  arquivos que você criou ou alterou. Se um arquivo seu também tiver mudanças da outra IA sem commit, faça o commit
  num worktree limpo e aplique a mesma mudança na cópia principal.
- Commit na main + push publica o site em 1 a 2 minutos; confira a página no ar depois.
- Vídeos sem áudio. Animação pensada elemento por elemento, na identidade de cada marca.
- Não invente números, preços, clientes nem depoimentos. Exemplo ilustrativo vai marcado como "Exemplo".
- Teste no navegador (desktop e celular) antes de entregar.
- Ao terminar cada pedido, atualize PROXIMOS_PASSOS.md (feito e pendente) e, se for marketing,
  marketing/HISTORICO.md.

Onde parei: entregues nesta sessão a **série "IA da semana" do @cerra.ai** (edição 01 no ar, 04/11), o
**espaço do GitHub Pages resolvido** (~968 MB → ~370 MB, `marketing/tools/otimizar_publicacoes.py`) e a
**identidade de movimento das 7 marcas** (`brand/movimentos.json` + `brand/MOVIMENTO.md`, aplicada ao
carrossel animado). Corrigi a virada de página (mostrava o verso do papel) e o leque de cópias do filme 3D.
O filme 3D do Cerra.AI ("o cobre") está renderizado em `marketing/filmes/out/` e **espera o aval do Renato**
antes de publicar; se ele não gostar, apagar `marketing/filmes/cerraai-cobre/`. O `/portfolio/` continua como
estava (o hero 3D foi reprovado e revertido, não refaça). Para continuar: re-renderizar as ~104 campanhas com
a nova gramática e seguir as pendências de "Portfólio e vídeos (de 31/10 a 02/11)".
```

## Organização das pastas de marketing (23/11/26)

Feito, sem apagar nada: `posts/` → `conteudo/`, `videos/` → `filmes/remotion/`, `Palestras/` → `palestras/`
(com `_modelo/` e as artes do ENBRA dentro do evento), `peças_publicitarias/` dividida entre
`propostas/briefing-parceiros/` e `conteudo/v2-video-com-ia/`, `animacoes/folinha/` → `brand/folinha/`.

- `_config.yml`: `marketing/conteudo` e `marketing/palestras` no `exclude`; `peças_publicitarias`/`animacoes` fora.
- `marketing/.gitignore`: `filmes/remotion/out|public/sfx`.
- Ferramentas e skills atualizadas; `agendar.py` manteve a chave `posts` do `agenda.json`.
- Verificado: `tools/gerar_formatos.py` regerou os HTML de `conteudo/2026-11-formatos/`; `py_compile` em todos os
  `.py`; a Central não mudou.
- **Pendente:** 27 campanhas novas em `entregas/` (`2026-11-cerraai-*`) sem `.zip`/`conteudos.json` — rodar
  `python tools/publicar.py` quando fecharem.
- Versionado: 13 skills `video-*`, `.claude/skills/README.md` e `.claude/commands/video{,-qa}.md`. Docs de vídeo (`filmes/README.md`, `video-estudio/SKILL.md`, `skills/README.md`) com o mapa novo.

## Chamadas 15s — reprovadas; retomar pelos filmes (23/11/26)

A série “Chamada 15s” (nove frentes, no ar) foi **reprovada**: clipe Wan de 2 s em loop + cartões parados + `xfade`
virou slide deck. Os arquivos ficam como registro em `entregas/2026-11-chamada-*`; não refazer nesse molde.

**A base certa é o filme da frente** (`filmes/frente-*`, 32 s, 16:9 + 9:16 do mesmo `cena.html`). Para a versão
curta (15–20 s):
1. Escolher 3 planos do filme (gancho + prova central + fecho).
2. Encurtar `cena.html` e `cena3d.js` para ~18 s, reescrevendo os `data-start` e o tempo da ação 3D (cena viva, sem
   congelar entre planos).
3. Uma câmera contínua; troca de plano na gramática da marca; ≤ 3 cartões de ≤ 6 palavras; CTA como plano.
4. Se usar Wan, que seja textura/objeto **dentro** da cena 3D — nunca vídeo de fundo chapado.
5. `node ferramentas/montar-frentes.mjs <slug>`, `bash ferramentas/render-frentes.sh <slug>`, QA e entrega em
   `entregas/2026-11-<nome>/`; publicar com `tools/publicar.py <pasta>`.
6. Ler antes: `.claude/skills/video-estudio/references/estrategia-filmes.md` e `aprendizados.md` §9.

**Piloto aprovado (23/11), com ressalva:** `entregas/2026-11-filme-tech-v2/` — Cerrado Tech v2, 32 s, 16:9 e 9:16,
mudo. Cena nova ("a oficina": motor de três engrenagens + 8 objetos inventados no trilho), tempos em
`filmes/frente-tech-v2/fonte/timeline.json`, direção em `conteudo/2026-11-filme-tech-v2/DIRECAO.md`, revisão por
batida em `filmes/out/revisao-v2i/`. QA dos dois formatos: ok (`--sem-audio`). Na segunda passada, rótulos reduzidos e afastados (altura por objeto), câmera larga recuada no 16:9, 9:16 com fov 30→44 no gancho e produtos menos espalhados, piso com `FogExp2` (sem linha de horizonte), painel do 9:16 com gradiente de 320 px e cortina em 26,8 s (o `pops` de 26,8 s sumiu; o de 4,93 s é a máscara do gancho, declarada). Se aprovar, repetir o molde para as
outras frentes, duas por vez, nesta ordem: Contabilidade, Crédito, Consultorias, CerraClass, Cerra.AI, CerraFood,
Guia Acadêmico, Institucional.
**Aviso de manutenção:** `tempo.js` contém a string `</script>` no comentário de cabeçalho; o
`montar-frentes.mjs` agora escapa isso ao embutir (`</script` → `<\/script`). Se mexer no `tempo.js`, mantenha o escape.

## Contabilidade v2 — stopped by the Renato for breaking the brand (23/11/26)

The **copy is approved** (6 lines): "Quanto sobrou este mês?" / "Nota. Folha. Guia. Extrato." / "Nada entra de um
lado só." / "Os dois lados batem." + "O mês fecha." / "O fechamento é o começo." / "Decisão baseada em dados, não em
intuição." (site line) + CTA.

The **concept is approved too**: "O lançamento" — a gold coin falls, bounces and splits into two halves; each of the
four closing documents (nota, folha, guia, extrato) releases its own pair; the halves stack into two mirrored
columns tied by a thread per entry; the top pair meets in the centre and fuses, a brass ring locks, and the coin
falls drawing the result line. Each element is a real input of the monthly close — that was the fix after the Tech
pilot ("elementos aleatórios demais").

**Why it stopped:** the scene was built in the Cerrado Tech palette (azul-tinta #07162b, ouro, latão). The
Contabilidade identity is **"Partida dobrada"**: paper #f1f6f0 with pauta #cfe0d4, tinta verde #0c3b2e,
verde-claro #d8efdf, red #d23a2c only on the margin and the pain; IBM Plex Cond + Plex Mono (fonts are already
right). Rule now in prendizados.md §15: read rand/<frente>/README.md + kits/<frente>/LEIA-ME.txt +
rand/tokens.css **before** modelling.

**Full handoff:** marketing/conteudo/2026-11-filme-contabilidade-v2/ESTADO.md (approved copy table, what is on
disk, commands, open technical issues: left column hidden behind the 42% text panel, documents with no anchor —
idea: a brass paper spike — vertical never rendered, review/QA/delivery pending).

**Next session, in order:** (1) re-plan the scene in "Partida dobrada"; (2) fix the 16:9 composition (shift the 3D
group +0.45 and shorten the result line); (3) render 9:16 with its own camera plan; (4) review per beat, QA, deliver
in entregas/2026-11-filme-contabilidade-v2/ with DIRECAO.md; (5) then the next frentes (Crédito, Consultorias,
CerraClass, Cerra.AI, CerraFood, Guia Acadêmico, Institucional) — two at a time, each starting from the brand file.
## Filme do curso "Vídeo com IA" (23/11/26) — feito e aprovado

O Renato aprovou ("esse vídeo ficou bom"). O que existe agora, e por onde continuar.

**Feito nesta sessão**

- **Benchmark dos vídeos:** os 14 melhores filmes (7 frentes × 16:9 e 9:16) viraram a seção "Referência de qualidade
  (23/11/2026)" em `marketing/filmes/README.md`, com o que define o nível e como conferir um candidato. A Cerrado Tech
  (`frente-tech-v2`) e o Escritório (`frente-escritorio`) ficaram **fora** da lista até aval.
- **Filme novo:** `marketing/filmes/frente-videocomia-v2/` — 36 s, 6 planos, 16:9 e 9:16 do mesmo fonte, mudo com
  efeitos locais. Anuncia a maratona Vídeo com IA, mostra as sete telas com os filmes reais (formato nativo) e, no
  plano 4, os sete objetos 3D das frentes saindo das telas em fila. Roteiro e direção em
  `marketing/conteudo/2026-11-filme-videocomia/` (`DIRECAO.md`, `ROTEIRO.md`).
- **Ferramentas:** `filmes/ferramentas/extrair-telas.mjs` (telas dos filmes → WebP, commitadas em
  `fonte/assets/telas/`), `filmes/ferramentas/sfx-cues.py` + `fonte/sfx.json` (faixa de efeitos; o wav é gerado e
  ignorado pelo git). `checar_texto3d.py` passou a ler a duração do filme (não mais 32 s fixo).
- **Entrega:** `marketing/entregas/2026-11-filme-videocomia/`, publicada na Central (`publicar.py`, frente
  CerraClass, série "Filme da frente"). QA ok nos dois arquivos.
- **Registros:** `marketing/HISTORICO.md` (seção "Filme do curso Vídeo com IA"), `marketing/filmes/README.md`,
  `marketing/README.md` (Peças prontas) e `context.md`.

**Por que nenhuma IA de imagem**

Os quatro modelos da tabela são de imagem; não reproduzem os nossos filmes e são APIs pagas (regra "só grátis ou
local"). As telas saem dos MP4s reais e os objetos 3D são código Three.js. Se um dia precisar de still (capa,
poster), a escolha registrada é Nano Banana 2.1 (1K ≈ US$ 0,034; melhor texto pt-BR e edição com referências) e, para
rascunho barato, Grok Imagine 2.0 (US$ 0,04).

**Pendências e próximos passos**

1. **Comitar** a entrega e o filme (nada foi comitado; ver `git status`).
2. **Agenda:** o filme está na Central, mas não na agenda de publicações (`tools/agendar.py`) — decidir data e conta.
3. **Versão curta (15–20 s):** o caminho aprovado é encurtar o filme, mantendo 3 planos (gancho, a fila dos objetos,
   fecho) — ver `video-estudio/references/estrategia-filmes.md`.
4. **Reaproveitar o padrão:** a "fila de objetos 3D" do plano 4 (câmera passando um a um) serve para as outras
   frentes; o `extrair-telas.mjs` + `sfx-cues.py` servem para qualquer peça que mostre tela de produto.
5. **Avaliar Tech v2 e Escritório** para entrarem (ou não) na lista de referência de qualidade.
6. Se o filme for para o site, avaliar uma versão sem o aviso de curso na tela (a mesma cena serve de prova de
   portfólio em `/portfolio/`).
