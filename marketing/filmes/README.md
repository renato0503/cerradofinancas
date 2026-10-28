# Filmes (HyperFrames): Cerra.AI e CerraClass

Vídeos em HTML + GSAP renderizados com [HyperFrames](https://github.com/heygen-com/hyperframes)
(a base do hypit). Cada filme sai em **16:9 (1920×1080)** e **9:16 (1080×1920)**, 30 fps, com trilha.
Os Reels antigos do Remotion (`../videos/`) continuam valendo para Cerrado Tech e Cerrado Finanças.

| Filme | Duração | Prompt de referência |
|---|---|---|
| `cerra-ai-comercial` | 15s | comercial de produto: duas cores, caixa alta, produto 3D girando, eco e desfoque |
| `cerra-ai-lancamento` | 30s | lançamento minimalista P&B, palavra por palavra, interface do produto |
| `cerraclass-curso` | 15s | comercial de produto (o ingresso do curso em 3D), um render por curso via variáveis |
| `cerraclass-lancamento` | 30s | lançamento estilo App Store: iPhone 3D, brilho colorido, cards saltando |

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
