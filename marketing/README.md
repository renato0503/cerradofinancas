# Estúdio de conteúdo: Cerrado Finanças & Tech

Posts, carrosséis, stories, vídeos e animações da marca.

**Central de Marketing (para o time de marketing):** https://www.cerradofinancas.com.br/marketing/
A página tem cinco abas (a quinta, **Formatos**, traz cartões, folder, jornal e banners de cada frente):
- **Agenda:** o que sai em cada dia, da semana atual em diante. O acervo com as datas passadas fica no fim.
- **Por frente:** as campanhas de cada marca, agrupadas por série.
- **Mídia kits:** logos, cores, fontes e o guia em PDF de cada frente.
- **Como usar:** o passo a passo para postar e o que é cada arquivo.

Cada campanha abre numa janela com orientações, peças, pacote .zip e legendas. Dá para mandar o link direto para
alguém: `#c=<pasta>`.

Só a página (`index.html`), `entregas/`, `kits/` e `formatos/` são publicadas. As áreas de trabalho
(`conteudo/`, `filmes/`, `palestras/`, `propostas/`, `brand/`, `tools/`, `dados/`, `.claude/`) ficam fora do site pelo
`_config.yml` da raiz. **Ao criar uma pasta nova aqui, acrescente-a no `exclude` do `_config.yml`.**
A página tem `noindex` e não aparece no menu nem no sitemap.

## Estrutura

Seis grupos, na ordem em que se procura: **post**, **vídeo**, **palestra**, **proposta**, **marca** e **ferramentas**.

| Pasta | O que vai nela |
|---|---|
| `index.html` | **Publicado.** A Central de Marketing (Agenda, Por frente, Mídia kits, Formatos, Como usar) |
| `entregas/AAAA-MM-tema/` | **Publicado.** Peça final de cada campanha: PNG, MP4, `legenda-<rede>.txt`, `info.json` e o `.zip`; aqui também ficam `conteudos.json` e `agenda.json` |
| `kits/` | **Publicado.** Mídia kit de cada frente (logos, fontes, guia.pdf, exemplos e .zip), gerado por `tools/gerar_kits.py` |
| `formatos/` | **Publicado.** Cartões, folder, jornal e banners por frente, gerado por `tools/gerar_formatos.py` |
| `conteudo/AAAA-MM-tema/` | **1 · post.** Fontes de cada campanha: `carrossel.html`, `story.html`, `post.html`, `facebook.html` |
| `conteudo/2026-11-formatos/` | Fontes HTML das artes de impressão (lidas por `tools/gerar_formatos.py`) |
| `filmes/` | **2 · vídeo.** Estúdio HyperFrames: `<filme>/` (16:9 e 9:16), `coreografias/`, `frentes-comum/`, `ferramentas/` |
| `filmes/remotion/` | Projeto Remotion antigo (Reels de outubro, `scripts/gerar-sfx.mjs`); não abrir peça nova nele |
| `filmes/carrosseis/`, `filmes/out/` | **Gerados** (não versionados): projeto HyperFrames de cada carrossel animado e os renders |
| `palestras/<palestra>/` | **3 · palestra.** Deck HTML+GSAP offline, PDFs, artes, vídeos, `REGISTRO.md` e `_modelo/` (modelo de slidedeck) |
| `propostas/` | **4 · proposta.** Propostas comerciais e o briefing de parceiros (uso interno, nunca publicar) |
| `brand/` | **5 · marca.** `tokens.css` e `carrossel.css` (Cerrado Tech/Finanças), uma pasta por marca (com README), `fontes/`, `slides.js` e `folinha/` (Lottie) |
| `tools/` | **6 · ferramentas.** `exportar.py` (HTML → PNG), `publicar.py` (.zip + `conteudos.json`), `agendar.py` e os `gerar_*.py` |
| `dados/` | **6 · dados.** Catálogo da CerraClass, estudos e JSONs de insumo |
| `.claude/` | Skills e comandos usados dentro desta pasta |

As imagens da marca vêm do site, sem cópia: `../img/folinha-hero.png`, `../img/ls-logo.png` etc.

## Fluxo de uma campanha

1. Crie as peças em `conteudo/AAAA-MM-tema/`. Cada HTML declara
   `<meta name="entrega" content="AAAA-MM-tema">` e `<meta name="formato" content="1080x1350">`,
   e cada slide é um elemento `class="slide"`. Abra no navegador para revisar (os slides aparecem empilhados).
2. Verifique e exporte: `python tools/verificar.py ...` (acusa estouro de rodapé, de área segura e sobreposição de
   ícone/logo sobre texto) e `python tools/exportar.py conteudo/AAAA-MM-tema/carrossel.html conteudo/AAAA-MM-tema/story.html`
   (some `conteudo/AAAA-MM-tema/facebook.html` nas campanhas do Guia Acadêmico, que têm a arte única de Facebook).
3. Em `entregas/AAAA-MM-tema/`, crie o `info.json` (`titulo`, `data`, `descricao`, `orientacoes`)
   e as legendas `legenda-instagram.txt`, `legenda-linkedin.txt`, `legenda-facebook.txt` etc. Vídeos e GIFs finais também vão aqui.
4. **Carrossel animado (padrão de vídeo desde 28/10):**
   `cd filmes && node ferramentas/animar-carrossel.mjs ../conteudo/AAAA-MM-tema/carrossel.html --render`
   grava `entregas/AAAA-MM-tema/carrossel-animado.mp4` (mesma arte, slides deslizando, com trilha).
   Comerciais HyperFrames (`filmes/`) só quando pedidos, como vídeo extra.
5. Agende: `python tools/agendar.py 2026-10-31` (o Felipe começou a postar em 31/10; mantenha essa data para não
   embaralhar a ordem). Ele distribui as postagens pelas quatro contas (@cerradofinancas, @cerra.ai, @cerraclass e
   @guiacademico), de 1 a 2 por dia em cada conta (`POR_DIA`). Quando o conteúdo novo de uma conta acaba, ele repete
   os posts dela desde o mais antigo, até o fim da agenda. Grava a data e a conta no `info.json` de cada campanha e
   escreve `entregas/agenda.json`. Rode depois de qualquer gerador de série, porque eles regravam as datas antigas.
   **Cerra.AI, extras:** `python tools/gerar_cerraai_extras.py --pdf` (glossário, Pergunte ao Cerra.AI, comparativo,
   stories interativos, checklist LGPD e kit de vendas). Pergunta real nova: acrescente em `dados/pergunte-cerraai.json`
   e rode de novo. PDF entra na Central como documento.
   **CerraFood:** `python tools/gerar_cerrafood.py` (apresentação + série) e `python tools/gerar_cerrafood_plataforma.py`
   (a peça global, com coreografia em `filmes/coreografias/`); identidade em `brand/cerrafood/README.md`.
   Uma frente que estreia com a agenda já correndo entra em `ESTREIAS` no `agendar.py`, para não mudar o passado.
   **Apresentações institucionais:** `python tools/gerar_apresentacoes.py` (uma por marca; o agendador põe cada uma
   como primeiro post da conta e o Reel uma semana depois).
   **Datas comemorativas:** só as nacionais, só post estático e story (sem vídeo), geradas por
   `tools/gerar_datas.py` (lista `DATAS`). Saem no dia fixo (`data_fixa` no `info.json`), além do post normal da
   conta, e nunca entram na repetição. Ao virar o ano, acrescente as datas do ano novo na lista.
6. Publique: `python tools/publicar.py`, depois commit e push. A página atualiza sozinha.
   **Atenção:** `publicar.py` varre todas as pastas de `entregas/`; se houver campanha de outra pessoa ainda sem
   commit no disco, ela entra na Central. Nesse caso, atualize só as suas pastas (um merge em `entregas/conteudos.json`
   com `publicar_pasta()`, como em 31/10 no Guia Acadêmico) ou gere numa cópia limpa (`git worktree`).
   A frente e a série saem do nome da pasta (`REGRAS` em `publicar.py`). Um prefixo novo precisa entrar lá, senão
   a campanha cai em "Institucional · Avulsa".
7. Mudou uma identidade (cor, fonte, logo)? Atualize `KITS_DADOS` em `tools/gerar_kits.py` e rode o gerador.

## Remotion antigo e folinha animada (`filmes/remotion/`)

```
cd filmes/remotion
npm install            # primeira vez (node_modules fica fora do git)
npm run sfx            # gera os efeitos sonoros em public/sfx/
npm run studio         # editor visual no navegador
npm run render:reel    # out/reel-4-frentes.mp4
npm run render:intro   # out/folinha-intro.mp4
npm run render:gif     # out/folinha-loop.gif
npm run render:alpha   # out/folinha-loop.webm (fundo transparente)
npm run render:frentes # out/reel-software|contabilidade|credito|cursos.mp4
npm run render:cerra-ai # out/reel-cerra-ai.mp4
```

Depois de renderizar, copie os arquivos finais de `filmes/remotion/out/` para `entregas/<campanha>/` e rode `tools/publicar.py`.
Tema (cores, curvas, molas) em `filmes/remotion/src/theme.ts`; cenas em `filmes/remotion/src/scenes/`.
Os Reels por frente são guiados por dados: edite `filmes/remotion/src/campanhas.ts` (gancho, 3 blocos dos tipos
lista/passos/contraste/numeros e fechamento). Peças estáticas usam os componentes de `brand/carrossel.css`.
A animação Lottie da folinha é gerada por `python brand/folinha/gerar_lottie.py`
(grava em `entregas/folinha-animada/`; copie os .json para `filmes/remotion/public/` se mudar).

Formatos usados:
- Feed (Instagram/LinkedIn): **1080×1350**
- Facebook: **1080×1350** numa arte única (`facebook.png`), no lugar do carrossel, ou o `carrossel-animado.mp4` como
  vídeo. A legenda do Facebook (`legenda-facebook.txt`) sempre traz o link do WhatsApp
  `https://api.whatsapp.com/send?phone=5567993515206`, que o Facebook transforma em link clicável.
- Stories / status / Reels: **1080×1920**, com cerca de 250px livres no topo e na base

## Logo do produto (Cerra.AI)

A logo original (`img/logo_cerraai.png`) vem num quadro preto opaco. Para entrar nas peças, o fundo é
removido por flood fill e o resultado (com transparência) fica em `img/logo_cerraai-icone.png`:

```
python tools/recortar_logo_cerraai.py
```

O script também copia a versão limpa para `filmes/remotion/public/cerraai.png`, usada no Reel.
No Reel, uma campanha pode usar a logo no lugar do ícone: campo `logo` em `filmes/remotion/src/campanhas.ts`.

## Cursos presenciais da Cerraclass (geração automática)

As campanhas dos cursos presenciais saem do catálogo oficial do projeto CerraClass:

```
node tools/importar-cerraclass.mjs          # copia o catálogo para dados/cerraclass-cursos.json
python tools/gerar_cursos_cerraclass.py     # carrossel, story, legendas e info.json de cada curso
python tools/exportar.py conteudo/2026-10-curso-*/carrossel.html conteudo/2026-10-curso-*/story.html
python tools/verificar.py conteudo/2026-10-curso-*/carrossel.html conteudo/2026-10-curso-*/story.html
cd videos && npm run render:cursos-presenciais   # Reels; depois copie para entregas/<curso>/reel.mp4
python tools/publicar.py
```

Cor, ícone e hashtags de cada curso ficam em `VISUAL` (no gerador e em `filmes/remotion/src/cursosCerraclass.ts`).
`tools/verificar.py` acusa qualquer conteúdo que invada o rodapé ou saia da área segura do story.

## Catálogo de cursos no site (`/cursos/`)

A seção "Catálogo Presencial" da página `/cursos/` é gerada do mesmo catálogo:

```
python tools/gerar_cursos_site.py    # atualiza a seção em ../../cursos.html
```

Os textos vêm do catálogo oficial (nada escrito à mão). Cada card abre a página do curso na Cerraclass
(`https://cerraclass.com.br/presencial/<id>`).

## Conferência do áudio dos vídeos

```
python tools/conferir_audio.py
```

Extrai a trilha de cada MP4 de `entregas/` e mede pico, RMS, clipping e silêncios. Não substitui a escuta:
serve para pegar áudio faltando, corte ou distorção.

## Tamanho do repositório (limite de 1 GB do GitHub Pages)

O `.zip` de cada campanha **não** leva os vídeos (`.mp4`, `.webm`, `.mov`): o time baixa o vídeo direto na
Central de Conteúdos. Sem isso, `entregas/` passou de 400 MB. Se o limite apertar de novo, mover os vídeos
antigos para outro armazenamento (Google Drive, Firebase Storage).

## Skills e repositórios (apresentações e vídeos)

Catálogo para pessoas e agentes de IA. As skills ficam em `marketing/.claude/skills/` (escopo só desta pasta; o
site não as enxerga) e cada uma traz a licença na própria pasta. Levantamento de 13/11/2026, revisado em 23/11/2026
(depois da reorganização das pastas e com o pacote de vídeo versionado).

### O que usamos hoje, em uma linha

Vídeo = **HyperFrames + GSAP** (`filmes/`), com a entrada `python tools/video.py` e as 13 skills `video-*`;
3D = **Three.js** dentro do HyperFrames; palestras = **HTML + GSAP offline** (`palestras/`), com PNG/PDF pelo
**Playwright**. O Remotion (`filmes/remotion/`) ficou só nos vídeos antigos.

### Pacote de vídeo (21/11/2026)

Biblioteca de produção **sem API paga**: só Claude, código, ffmpeg e, quando fizer sentido, GPU local. Orquestrador
`video-estudio` + 12 especialistas, com o canivete `video-estudio/scripts/kit.py`.

| Skill | Para quê |
|---|---|
| `video-estudio` | Decide o caminho e encadeia roteiro → storyboard → prova → render → QA → entrega |
| `video-roteiro` | Gancho, estrutura de 15/21/30/60 s, locução pt-BR |
| `video-storyboard` | Tabela de planos, área segura, prova de movimento |
| `video-motion` | Vocabulário, 35 receitas GSAP, easing, stagger, batida |
| `video-render` | HyperFrames e Remotion, determinismo, diagnóstico |
| `video-audio` | Voz local (SAPI/edge-tts), SFX, mix em -14 LUFS |
| `video-legendas` | faster-whisper, SRT/ASS, karaokê, queimar |
| `video-edicao` | ffmpeg: corte, concat, reframe, transição, proxy |
| `video-referencia` | Decompor referência em `VIDEO.md` |
| `video-entrega` | Formatos, capa, variantes, nomes, `.zip` |
| `video-local-ia` | ComfyUI/LTX/Wan opcional na RTX 4060 (8 GB) |
| `video-marca` | Paleta, fonte, tom e o que cada frente pode afirmar |
| `video-qa` | Portões automáticos (`kit.py qa`) e checklist manual |

O raio-X dos 80 repositórios do tópico `ai-video` — o que adotamos, adaptamos, só consultamos e o que fica de fora
por exigir API paga — está em `video-estudio/references/fontes.md`. Limites de hardware e o que não dá para fazer
offline em `video-estudio/references/limites.md`.

Uso por comando, a partir de `marketing/`:

```bash
python tools/video.py doctor                       # o que falta no ambiente
python tools/video.py projeto <nome> --frente tech  # briefing, roteiro e storyboard
python tools/video.py demo                         # clipe 9:16 de teste, com QA
```

O mapa "pedido → comando → skill" está em `video-estudio/references/atalhos.md`; o catálogo legível por máquina
em `video-estudio/manifest.json`. Há também os comandos `/video` e `/video-qa` em `.claude/commands/`.

### Skills

| Skill | Para que serve | Onde usamos |
|---|---|---|
| `hyperframes` | Vídeo a partir de HTML, quadro a quadro | Carrossel animado, comerciais, filmes das frentes |
| `hyperframes-cli` | CLI: `snapshot --at`, render, `remove-background` | Conferir quadro antes de renderizar; recorte das fotos da palestra |
| `hyperframes-registry` | ~450 blocos prontos (transições, títulos, legendas, gráficos) | Consulta quando falta um efeito |
| `media-use` | Mídia para o vídeo (som, ícone, logo, imagem) | Apoio; áudio desligado desde 31/10 |
| `gsap-core`, `gsap-timeline`, `gsap-plugins`, `gsap-utils`, `gsap-performance` | GSAP oficial: easing, stagger, timeline, SplitText, DrawSVG | Coreografia dos vídeos e transições das palestras |
| `gsap-scrolltrigger`, `gsap-react`, `gsap-frameworks` | GSAP com rolagem e frameworks | Pouco usadas (são do site) |
| `threejs-*` (13: fundamentals, geometry, materials, lighting, textures, shaders, postprocessing, animation, interaction, loaders, asset-pipeline, performance, react-three-fiber) | 3D em WebGL | Filmes 3D das frentes; globo da palestra de cibersegurança |
| `remotion-motion-graphics` | Vídeo em React (Remotion) | Primeiros Reels (lançamento e por frente) |
| `text-to-lottie` | Cria/corrige Lottie JSON | Folinha animada |
| `animation-vocabulary` | Glossário de motion (nome certo de cada efeito) | Base do dicionário de motion (pop in, wipe, punch zoom...) |
| `animate`, `improve-animations`, `review-animations`, `find-animation-opportunities`, `animation-performance`, `emil-design-eng` | Critério de motion (Emil Kowalski): se anima, como, revisão, desempenho | Auditoria e acabamento das animações e palestras |
| `wiggle` | Logo parado → GIF/MP4/Lottie | Instalada, **não usada** (Lottie cobriu) |
| `lemo-opuscar` | 59 estilos de curta em código | Instalada, **não usada** (pesada; parte dos assets CC BY 4.0) |
| `apple-design`, `design-taste-frontend`, `prototype`, `pick-ui-library`, `break-ui`, `mobile-native`, `ask-sonner` | Design de interface | Não entram em vídeo/apresentação (são do site) |

### Repositórios das skills

"Na skill" = o endereço está escrito nos arquivos da skill. "Deduzido" = autor confirmado no LICENSE, nome do
repositório deduzido do zip original (`D:\Dev\*-main.zip`, já removidos); confira no navegador antes de citar fora.

| Repositório | Autor | Skills | Licença | Endereço |
|---|---|---|---|---|
| `github.com/heygen-com/hyperframes` | HeyGen | hyperframes, hyperframes-cli, hyperframes-registry, media-use | Apache 2.0 | Na skill |
| `github.com/greensock/gsap-skills` | GreenSock | gsap-* (8) | MIT | Deduzido |
| `github.com/emilkowalski/skills` | Emil Kowalski | animate, improve-/review-/find-animation(-opportunities), animation-performance, animation-vocabulary, emil-design-eng, apple-design, prototype, pick-ui-library, break-ui, mobile-native, ask-sonner | MIT | Deduzido |
| `github.com/CloudAI-X/threejs-skills` | CloudAI-X | threejs-* (13) | MIT | Deduzido |
| `github.com/haidrrrry/claude-remotion-skill` | haidrrrry | remotion-motion-graphics | MIT | Deduzido |
| `github.com/diffusionstudio/lottie` | Diffusion Studio | text-to-lottie | ver LICENSE da pasta | Deduzido |
| `github.com/talknerdytome-labs/wiggle-claude-skill` | talknerdytome-labs | wiggle | Apache 2.0 | Na skill |
| `github.com/lemomo-ai/lemo-opuscar` | LemoLab | lemo-opuscar | MIT | Na skill |
| `github.com/Leonxlnx/taste-skill` | Leonxlnx | design-taste-frontend | MIT | Na skill |

### Ferramentas (bibliotecas que o nosso código usa)

| Repositório | Versão | Onde | Para que serve |
|---|---|---|---|
| `heygen-com/hyperframes` | 0.8.210 | `filmes/package.json` | Render dos vídeos |
| `greensock/GSAP` | — | `filmes/`, `palestras/` | Animação |
| `mrdoob/three.js` | 0.170.0 | `filmes/` | 3D dos filmes e do globo |
| `remotion-dev/remotion` | 4.0.539 | `filmes/remotion/package.json` | Projeto de vídeo antigo |
| `airbnb/lottie-web` | 5.13 | `filmes/remotion/`, palestras | Toca o Lottie da folinha |
| `microsoft/playwright` (Python) | — | `tools/*.py` | PNG e PDF de peças e palestras |
| `phosphor-icons`, `fontsource` | 2.1 / 5.3 | `filmes/package.json` | Ícones e fontes locais (offline) |

### Projetos e scripts internos

| Caminho | Para que serve |
|---|---|
| `filmes/` | Estúdio principal de vídeo (HyperFrames + GSAP + Three.js) |
| `filmes/ferramentas/animar-carrossel.mjs` | `carrossel.html` → `carrossel-animado.mp4` (1080×1350, mudo; `--com-audio` reativa) |
| `filmes/coreografias/<entrega>.mjs` | Coreografia por elemento e por marca |
| `filmes/frentes-comum/`, `montar-frentes.mjs`, `render-frentes.sh` | Motor 3D comum e render dos 8 filmes das frentes |
| `filmes/ferramentas/trilha.mjs` | Trilha sintética (desativada) |
| `filmes/remotion/` | Projeto Remotion (Reels antigos, `scripts/gerar-sfx.mjs`) |
| `brand/folinha/gerar_lottie.py` | Lottie da folinha |
| `palestras/<palestra>/` + `gerar_slides.py` | Palestras HTML+GSAP offline; o script gera o `index.html` dos textos |
| `tools/exportar.py` → `tools/publicar.py` | Exporta PNG e publica na Central de Marketing |

## Peças prontas

- **2026-10 · Lançamento das 4 frentes**: carrossel de 7 slides, story, Reel de 21s e legendas para Instagram e LinkedIn.
- **2026-10 · Uma campanha por frente** (Software, Contabilidade, Crédito, Cursos): carrossel de 6 slides, story, Reel de 15s e legendas.
- **2026-10 · Cursos da Cerraclass**: IA na Prática e IA em Ação Farma (feitos à mão) e os 11 cursos presenciais do catálogo, gerados a partir dos dados da CerraClass.
- **2026-10 · Folinha animada**: vinheta MP4, GIF em loop, WebM transparente e Lottie (entrada e loop).
- **2026-10 · Cerra.AI**: carrossel de 7 slides, story, Reel de 15s e legendas. O texto vem do projeto
  `D:\Dev\Cerra.AI` — o que pode e o que não pode ser afirmado está na regra 8 do `HISTORICO.md`.
- **2026-11 · Guia Acadêmico**: 15 cadernos de método (carrossel, story, carrossel animado e legendas) e, desde 31/10,
  uma arte única de Facebook (`facebook.png`) com legenda própria e o link do WhatsApp clicável.
- **2026-11 · CerraFood** (white label de gestão de restaurantes, identidade "Comanda"): peça global "A plataforma inteira" (8 slides,
  carrossel animado com coreografia própria), apresentação "Prazer, CerraFood" e 10 campanhas (sua marca, cozinha,
  totem, ficha técnica, estoque, caixa, delivery, fidelidade, relatórios e equipe), cada uma com story, carrossel
  animado e legendas de Instagram, LinkedIn e Facebook. Na agenda do @cerradofinancas desde 11/11.
- **2026-11 · Peças da equipe** (fora da agenda, série "Equipe"): Talita Marques, Felipe Borges, Renato Rosa e Camila
  Anjos, post e story com foto em arco, no estilo comum `brand/anuncio-equipe.css`. Para uma pessoa nova, ver
  "Peças da equipe" no `HISTORICO.md`.

## Formatos para impressão e site (aba "Formatos" da Central)

Cartões de visita, folder, anúncio de jornal e banners de site de cada frente, gerados por um script só:

```
python tools/gerar_formatos.py --render                 # todas as frentes
python tools/gerar_formatos.py --render cerraai credito # só algumas
```

- **Fontes:** `conteudo/2026-11-formatos/<frente>.html` (abrir no navegador mostra todas as peças com a linha de corte
  tracejada em rosa) e `conteudo/2026-11-formatos/img/` (logos recortadas e reduzidas, para o PDF ficar leve).
- **Saída publicada:** `formatos/<frente>/`, `formatos/<frente>.zip` e `formatos/formatos.json`, que a aba lê.
  A pasta `formatos/` **é publicada** (não está no `exclude`). Não passa pelo `publicar.py` nem pela agenda.
- **Por frente (9: institucional, tech, cerraai, cerraclass, credito, contabilidade, consultorias, guiacademico,
  cerrafood):**
  - 1 cartão de visita na maioria das frentes (5 na Contabilidade e no CerraFood), sempre com frente e verso:
    `cartao-vN-90x50mm.pdf` e `cartao-vN-88x48mm.pdf` (2 páginas,
    3 mm de sangria por lado, área segura de 4 mm), mais `cartao-vN-frente.png`/`-verso.png` (prévia em 300 dpi);
  - folder de 4 páginas A5 (folha A4 dobrada): `folder-paginas-a5.pdf` (as 4 páginas em ordem, com sangria) e
    `folder-impressao-a4.pdf` (2 folhas já imposicionadas: lado de fora 4|1, lado de dentro 2|3), mais `folder-pN.png`;
  - anúncio de jornal 25,5 x 36 cm: `jornal-255x360mm.pdf` + `jornal.png`;
  - banners de site: `banner-1200x90.png` e `banner-300x250.png`, em 1x e `@2x`.
- **Folder (refeito em 21/11):** capa com o 3D da frente e o botão do WhatsApp, "o que fazemos" em cartões, "como
  funciona" em passos + segundo 3D + diferenciais, e contracapa com bloco de chamada, QR grande e contatos. Textos no
  dicionário `FOLDER` (só filmes das frentes e site). O 3D vem de `python tools/gerar_stills3d.py [frentes]`, que tira
  quadros das cenas Three.js dos filmes (`filmes/frente-*`, montados) com fundo transparente para
  `conteudo/2026-11-formatos/img/3d-<frente>-1/2.png`; rodar antes do `gerar_formatos.py --render` quando a cena mudar.
- **Como renderiza:** Playwright (Chromium) imprime o PDF de cada peça; o Chrome arredonda a página para pixel
  (94 mm vira 94,2 mm), por isso `medida_exata()` corta a sobra, que cai na sangria. A imposição do folder é feita com
  PyMuPDF (`impor()`).
- **Textos:** só o que já está no site, nas legendas das apresentações institucionais e nos guias de marca. Crédito leva
  o aviso legal em toda peça. Os cartões são institucionais (sem nome de pessoa); um cartão por pessoa do time é só
  acrescentar nome e cargo na frente.
- **Cores:** os PDFs saem em RGB; a gráfica converte para CMYK. Pedir prova de cor antes de rodar a tiragem.

## Chamadas 15s por frente (`entregas/2026-11-chamada-<frente>/`)

Reels de **9:16, 15 s e mudos**, um por frente, para Instagram, Stories e TikTok. Cada peça tem um **elemento 3D
novo**, gerado na GPU (Wan 2.2 TI2V-5B no ComfyUI local, em `D:\Dev\ComfyUI`), e o copy em cartões HTML/PNG — a IA
não desenha texto, logo nem aviso legal.

- **Fonte:** `conteudo/2026-11-chamadas/<frente>/` — `elemento.mp4` (clipe do Wan), `hook/c2/c3/c4/close.html` e os
  PNGs; os intermediários de ffmpeg ficam em `_trab/` (fora do git).
- **Gerador:** `python tools/gerar_chamadas.py <frente> [<frente> ...]`, de `marketing/` — renderiza os cartões com
  Playwright e compõe com ffmpeg (gancho e fecho sobre o clipe; três cartões no meio; transição da marca).
- **Por frente:** o dicionário `DADOS` no topo do gerador (paleta, fontes, copy, transição, scrims, aviso legal e
  rótulo do botão). Frente nova = entrada nova + `elemento.mp4`.
- **Clipe novo na GPU:** `python D:\Dev\ComfyUI\wan_t2v.py <slug> D:\Dev\ComfyUI\prompts\<slug>.json`
  (text-to-video, 512×896, 49 quadros, 24 fps; ~2–3 min na RTX 4060 com `--lowvram`). Depois copie para
  `conteudo/2026-11-chamadas/<slug>/elemento.mp4`.
- **Publicação:** `python tools/publicar.py 2026-11-chamada-<frente>` publica só essa campanha, com a série
  **“Chamada 15s”**.
- **QA:** `python tools/video.py qa <arquivo> --formato 9x16`. O portão marca “sem áudio” como falha; nos vídeos
  mudos isso é esperado.
- **Feitas:** Tech, Contabilidade, Crédito, Consultorias, CerraClass e Cerra.AI. **Faltam:** Guia Acadêmico,
  CerraFood e Institucional, e a versão 16:9 de todas.
