---
name: video-render
description: Renderiza vídeo a partir de HTML/CSS/GSAP/Three.js com HyperFrames ou de React com Remotion, em 16:9 e 9:16, de forma determinística e com prova de quadros. Use quando o pedido for "renderizar", "gerar o MP4", "exportar o filme", "HyperFrames", "Remotion", "filme da frente", "carrossel animado" ou "por que o render quebrou".
---

# Render

Duas rotas, uma regra: **o quadro é função do tempo**. Se o render usa relógio, aleatório sem semente ou rede,
ele não é reproduzível e não serve.

## Escolha

| Situação | Rota |
|---|---|
| Peça de campanha, 3D, HTML já existente, carrossel animado | **HyperFrames** (`filmes/`) |
| React/TSX, legenda por palavra, série de episódios | **Remotion** (`filmes/remotion/`) |
| Cartão/lower third/corte rápido | ffmpeg (`video-edicao`) |
| Protótipo de movimento em 5 min | HTML + GSAP no navegador, depois HyperFrames |

## HyperFrames (padrão do estúdio)

```bash
cd marketing/filmes
npm ci
node ferramentas/montar.mjs cerra-ai-comercial          # monta o projeto em pastas fora do git
node ferramentas/render-cursos.mjs                       # um render por curso
node ferramentas/animar-carrossel.mjs ../conteudo/<entrega>/carrossel.html --render
npm run montar:frentes
npm run render:frentes
```

Conferir antes de renderizar:

```bash
npx hyperframes snapshot filme.html --at 1.2 --out previa.png
python ferramentas/quadros.py tech 16x9 6.8,14,26 saida.png
python ferramentas/checar_texto3d.py tech --formato 9x16
```

Checklist de render:

- [ ] fontes e ícones locais (sem CDN)
- [ ] imagens com caminho relativo correto após a montagem
- [ ] timeline pausada e dirigida por `tl.time(t)`
- [ ] `hf-seek` no 3D; nenhum `requestAnimationFrame` com relógio
- [ ] CSS sem `transform` em elemento animado
- [ ] primeiro e último quadro conferidos
- [ ] `crf 18–24`, `yuv420p`, `+faststart`, 30 fps

## Remotion

```bash
cd marketing/filmes/remotion
npm ci
npx remotion render <CompositionId> out/video.mp4 --codec=h264 --crf=18
npx remotion still <CompositionId> out/quadro.png --frame=30
```

- Composition com `durationInFrames` e `fps` explícitos.
- `useCurrentFrame()` no lugar de tempo real.
- Áudio com `<Audio>` e `staticFile()`.
- Licença: gratuita para pessoa física e empresa pequena; confirme antes de escalar.

## Formatos

- 16:9 — 1920×1080
- 9:16 — 1080×1920
- 4:5 — 1080×1350 (feed)
- 1:1 — 1080×1080 (quando a plataforma pedir)

O mesmo projeto deve gerar os dois formatos sem duplicar conteúdo: reposicione a coluna de texto e a câmera 3D.

## Depois do render

```bash
python .claude/skills/video-estudio/scripts/kit.py sondar out/filme.mp4
python .claude/skills/video-estudio/scripts/kit.py qa out/filme.mp4 --formato 9x16
python .claude/skills/video-estudio/scripts/kit.py contato out/filme.mp4 --saida contato.jpg
```

Abra o contato. Se algum quadro parecer slide parado, falta movimento ou contraste — não é problema de encoder.

## Quando quebra

| Sintoma | Causa provável |
|---|---|
| tela preta | asset não montado, caminho absoluto, fonte ausente |
| 3D some | WebGL indisponível no Chromium do render; use `--use-gl=angle` ou renderize no HyperFrames com GPU |
| texto cortado | área segura ou `overflow`; conferir `checar_texto3d.py` |
| movimento errado | elemento com `transform` no CSS competindo com GSAP |
| render lento | resolução/fps altos, sombras e post-processing no 3D |
| áudio dessincronizado | timeline de áudio separada; normalizar e reencaixar no fim |

## Referências

- `references/hyperframes.md` — estrutura, comandos, `hf-seek`, 3D e armadilhas.
- `references/remotion.md` — composição, mídia, legenda e licença.
