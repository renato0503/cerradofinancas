# Filmes (HyperFrames): Cerra.AI e CerraClass

Vídeos em HTML + GSAP renderizados com [HyperFrames](https://github.com/heygen-com/hyperframes)
(a base do hypit). Cada filme sai em **16:9 (1920×1080)** e **9:16 (1080×1920)**, 30 fps, com trilha.
Os Reels antigos do Remotion (`remotion/`) continuam valendo para Cerrado Tech e Cerrado Finanças.

## Antes de começar

O pacote de vídeo do estúdio (`video-estudio` + 12 especialistas) mora em `../.claude/skills/`, e a entrada é
`python tools/video.py` (rodando de `marketing/`): `doctor`, `projeto`, `demo`, `qa`… O mapa "pedido → comando →
skill" está em `../.claude/skills/video-estudio/references/atalhos.md`. Fontes das campanhas em
`../conteudo/<entrega>/` e peças finais em `../entregas/<entrega>/`. O Remotion antigo fica em `remotion/` e não
recebe peça nova.

| Filme | Duração | Prompt de referência |
|---|---|---|
| `cerra-ai-comercial` | 15s | comercial de produto: duas cores, caixa alta, produto 3D girando, eco e desfoque |
| `cerra-ai-lancamento` | 30s | lançamento minimalista P&B, palavra por palavra, interface do produto |
| `cerraclass-curso` | 15s | comercial de produto (o ingresso do curso em 3D), um render por curso via variáveis |
| `cerraclass-lancamento` | 30s | lançamento estilo App Store: iPhone 3D, brilho colorido, cards saltando |

## Carrossel animado (o padrão de toda campanha nova)

`node ferramentas/animar-carrossel.mjs ../conteudo/<entrega>/carrossel.html [--render] [--clima cobre|pb|sala]`
lê o carrossel do estúdio (qualquer identidade), embute o CSS, as fontes, as imagens e os ícones Phosphor locais,
monta `carrosseis/<entrega>/` (fora do git) e, com `--render`, grava `entregas/<entrega>/carrossel-animado.mp4`
(1080×1350). Cada slide fica de 3 a 5 s conforme o texto; os slides deslizam colados, como num carrossel, e os
elementos entram em sequência. A trilha tem whoosh em cada troca.

## Como pedir uma mudança de movimento

Descreva o **elemento + o efeito + o tempo (s) + o ritmo (easing)**, por exemplo: "título com slide in em 0,4 s e
ease out; itens com stagger de 0,15 s; fecho com punch zoom no produto". O vocabulário:

- **Entradas suaves:** fade in, slide in e blur in.
- **Entradas com impacto:** pop in, scale up e stagger.
- **Ritmo:** ease in-out, overshoot e bounce.
- **Texto:** typewriter, word reveal e text swap.
- **Formas:** draw-on, morph e bar grow.
- **Transições:** mask reveal, wipe e punch zoom.

Hoje o carrossel animado usa slide in (power3.inOut, 0,55 s) na troca de slide, e blur in com stagger de 0,09 s
(expo.out) nos itens.

**Sem áudio (31/10):** a trilha sintetizada (`trilha.mjs`) não ficou boa, então o carrossel animado sai mudo por padrão.
`--com-audio` volta a gerar a trilha.

## Coreografia própria (31/10)

Quando existe `coreografias/<entrega>.mjs`, o vídeo não passa slides: cada slide fica parado, os elementos entram um a
um, o conteúdo sai antes da troca e o rodapé (e o cabeçalho, se a marca tiver) fica no lugar. Quando a cor de fundo
muda, o slide novo entra como cortina. A coreografia define:

- `duracoes`: os segundos de cada slide.
- `revela`: a cortina da troca de cor (`esq`, `dir`, `cima`, `baixo` ou `circulo`).
- `saida`: como o conteúdo deixa o slide (as propriedades do GSAP).
- `fixos`: o que não sai na troca (o padrão é `.rodape`).
- `slides`: uma função por slide, com os movimentos. O tempo é contado do início do slide.

| Movimento | O que faz |
|---|---|
| `A.palavras(sel, t, {x, y, rot, escala, stagger, ease})` | word reveal: palavra por palavra |
| `A.letras(sel, t, {cps})` | typewriter: letra por letra |
| `A.surgir(sel, t, {x, y, escala, op})` | fade/slide in |
| `A.pop(sel, t, {de, rot, origem})` | pop in com overshoot |
| `A.revelar(sel, t, {dir})` | mask reveal / draw-on numa direção |
| `A.contar(sel, t, ate)` | contagem do número |
| `A.marcar(sel, t)` | marca-texto passando (fundo em gradiente) |
| `A.mover(sel, t, de, para)` | qualquer `fromTo` |
| `A.continuo(sel, t, para)` | movimento lento até o fim do slide (girar, aproximar) |
| `A.onda(sel, t, para, periodo)` | vai e volta (flutuar, pulsar) |

As quatro apresentações institucionais têm cada uma o movimento da sua marca:

- **Cerra.AI:** terminal. Rótulos digitados, varredura da esquerda, chat digitado e cortina cobre.
- **Cerrado Tech:** fábrica. Peças encaixando, ícones girando e CTA em círculo.
- **CerraClass:** sala de aula. Etiqueta que quica, título em soco, cadeiras com contagem até 10 e polaroide.
- **Guia Acadêmico:** periódico. Fios desenhados, marca-texto, quadro impresso, carimbo e virada de página.

O embrulho de cada slide no projeto gerado é `.hf-quadro`. Antes era `.quadro` e quebrava o quadro do Guia Acadêmico,
que usa a mesma classe.

## Filmes 3D das frentes (11/11)

Um filme por frente (32 s, 16:9 e 9:16, sem áudio) que conta tudo sobre ela, com um objeto 3D real em **Three.js**
(WebGL de verdade, não camadas de CSS: o 3D por camadas foi reprovado duas vezes, ver regra 18 do HISTORICO).
A tela é dividida: uma faixa chapada na cor da marca guarda o texto (GSAP) e o 3D ocupa o resto.

| Frente | Pasta | O objeto 3D | O que o filme conta |
|---|---|---|---|
| Cerra.AI | `frente-cerraai` | o chip do emblema, trilhas de cobre que se desenham | lê os arquivos, anonimiza (tarja), responde com a fonte, 100% local |
| Cerrado Tech | `frente-tech` | blocos dos sistemas em volta do cubo dourado "você" | o que constrói, integra, sob medida, produtos do ecossistema |
| CerraClass | `frente-cerraclass` | as 10 cadeiras da turma e o ingresso | formato (contagem até 10), os 11 cursos (o chão muda de cor), turmas, citação real |
| Guia Acadêmico | `frente-guiacademico` | a bússola da logo; a agulha aponta cada serviço | as 6 frentes, o protocolo 3.1-3.4, a nota do orientador (ética), quem orienta |
| CerraFood | `frente-cerrafood` | impressora térmica, comandas da cozinha, pizza em fatias, aparelhos | o fluxo do pedido, a cor da espera, ficha técnica, white label |
| Contabilidade | `frente-contabilidade` | o razonete "T", a escada MEI→Lucro Presumido, barras, carimbo EM DIA | serviços, para quem, 4 fases, troca de contador |
| Crédito | `frente-credito` | contrato, caneta que marca os vistos e assina, barras sem números | comparativo, produtos, como funciona, aviso legal completo |
| Consultorias | `frente-consultoria` | o organograma em arame que ganha corpo | antes/depois, as 7 pranchas, etapas, diagnóstico gratuito |

```
npm run montar:frentes            # gera frente-*/16x9 e 9x16 (fora do git)
npm run render:frentes            # renderiza os 16 MP4 em out/frente-<slug>-<formato>.mp4 (crf 24, sem áudio)
bash ferramentas/render-frentes.sh credito   # só uma frente
```

- **Fonte de cada filme:** `frente-<slug>/fonte/cena.html` (os planos de texto, com `data-entra`), `filme.css` e
  `cena3d.js` (a cena). O comum fica em `frentes-comum/`: `palco3d.js` (palco, luz, quadros-chave `K()`, `prog()`,
  `mola()`, texturas em canvas com as fontes da marca) e `planos.js` (a linha do tempo GSAP lida dos atributos:
  `palavras`, `letras`, `lista`, `subir`, `revelar`, `pop`, `marcar`, `riscar`, `contar`, `carimbo`).
- **Determinismo:** o 3D é função pura do tempo (`hf-seek`); nada de relógio. Three.js 0.170.0 fixado no
  `package.json`, copiado para `assets/` pelo montador, com o `RoomEnvironment` (import map "three").
- **Cores exatas:** fundos chapados usam `tom: false` (sem tone mapping) e chão `MeshBasicMaterial` + um plano de
  sombra, senão o amarelo/papel sai desbotado.
- **Cuidados:** papel nunca dobra além de 90° (a comanda do CerraFood para em 75° e tem verso liso); CSS não pode ter
  `transform` em elemento que o GSAP anima (as posições usam flex).

### Texto 3D sempre inteiro (regra desde 21/11)

Tudo o que está **escrito** nos objetos 3D (rótulos, etiquetas, contrato, ingresso, mostrador) tem de aparecer inteiro:
nada cortado pela borda do quadro, escondido atrás de outro objeto ou da coluna de texto HTML. O que não é do trecho
atual **some** antes de a câmera sair (não fica letreiro cortado no canto).

```
python ferramentas/checar_texto3d.py                 # confere os 8 filmes nos dois formatos (a cada 0,25 s)
python ferramentas/checar_texto3d.py tech --formato 9x16
python ferramentas/quadros.py tech 16x9 6.8,14,26 saida.png   # quadros soltos, sem renderizar o vídeo
```

- O `palco3d.js` marca as texturas em que houve `fillText` e guarda a caixa de cada palavra; o checador projeta os
  pontos das palavras na tela, lança raios da câmera até eles e usa `elementsFromPoint` para o HTML. Acusa o que
  dura mais de 0,6 s (entradas e saídas rápidas ficam de fora). Texto inteiro coberto (pela cortina final) não conta.
- Rodar **antes de todo render** e só renderizar com "ok" nos 16. Texto que colide dentro da própria textura (ex.: o
  título do ingresso no "Nº 10") o checador não vê: título em canvas encolhe até caber (`measureText`).
- Correções de 21/11: Contabilidade (placas de mesa "Você cuida de" / "A gente cuida de" sobre a barra do T, tiras
  maiores, ficha atrás do texto dos degraus, câmera recuada); Crédito (contrato e rótulos dos bancos somem fora do
  trecho, câmera recua no fim); Tech (fios translúcidos, alturas em arquibancada, produtos são os blocos de trás);
  Guia Acadêmico (agulha mais curta que o anel de rótulos); Consultorias (câmera recua na fileira das 7); CerraClass
  (título do ingresso cabe antes do picote).

## Estrutura de um filme

```
<filme>/fonte/cena.html   marcação, com {{W}}, {{H}} e {{CLASSE}} (horizontal/vertical)
<filme>/fonte/filme.css   estilo (a classe .vertical rearranja para 9:16)
<filme>/fonte/filme.js    a linha do tempo GSAP
<filme>/fonte/SPEC.md     o roteiro em números (cores, fontes, tempos de cada plano)
<filme>/fonte/trilha.json música e efeitos (clima, BPM, deixas)
<filme>/16x9/ e 9x16/     projetos HyperFrames GERADOS (fora do git)
```

Edite sempre `fonte/`. `16x9/` e `9x16/` são recriados pelo montador.

## Passo a passo

Requisitos: Node 22+ e FFmpeg (`winget install Gyan.FFmpeg`).

```
cd marketing/filmes
npm install                                   # primeira vez
npm run trilhas                               # gera fonte/assets/trilha.wav de cada filme
npm run montar                                # gera 16x9/ e 9x16/ a partir de fonte/
cd cerra-ai-comercial/16x9
npx hyperframes check                         # lint + layout; corrigir todo erro
npx hyperframes snapshot --at 2,5,9           # quadros para conferir
npx hyperframes preview                       # editor no navegador
npx hyperframes render -q delivery -o ../../out/cerra-ai-comercial-16x9.mp4
```

Cursos: `npm run render:cursos` (ou `node ferramentas/render-cursos.mjs excel-com-ia`) renderiza os
13 cursos nos dois formatos e já copia para `entregas/2026-10-curso-<slug>/video-16x9.mp4` e
`video-vertical.mp4`. Textos e cores vêm de `dados/cerraclass-cursos.json` e de `VISUAL` no gerador.

Depois: copiar os vídeos dos lançamentos para `entregas/` e rodar `python tools/publicar.py`.
Telemetria do HyperFrames desligada com `HYPERFRAMES_NO_TELEMETRY=1`.

## Cuidados aprendidos

- No `fromTo`, uma propriedade que só aparece no "de" é ignorada: repita `x`/`y` no "para".
- As cópias de eco ficam antes do original no DOM: selecione o original por `[data-eco]`, nunca pela classe.
- `--variables-file` da 0.8.210 falha; o render dos cursos passa o JSON inline.
- Não pode haver dois HTML raiz num projeto: por isso cada formato é um projeto (`16x9/`, `9x16/`).
- Sempre conferir o MP4 final (quadros com `ffmpeg` e volume com `volumedetect`), não só a prévia.
