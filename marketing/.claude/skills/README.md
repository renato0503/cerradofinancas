# Skills do estúdio de marketing

Catálogo completo (para que serve cada skill, onde usamos, repositório de origem, licença, bibliotecas e scripts):
**`marketing/README.md`, seção "Skills e repositórios (apresentações e vídeos)"**.

## Onde ficam as coisas (23/11/2026)

- Fontes das campanhas: `marketing/conteudo/<entrega>/` (antes `posts/`).
- Peças finais publicadas: `marketing/entregas/<entrega>/`.
- Estúdio de vídeo: `marketing/filmes/` (HyperFrames); Remotion antigo em `marketing/filmes/remotion/`.
- Palestras: `marketing/palestras/` (decks HTML+GSAP e `_modelo/`).
- Entrada do vídeo: `python tools/video.py` (de `marketing/`), que roda `video-estudio/scripts/kit.py`.

## Pacote de vídeo (versão 1.1 · 21/11/2026)

Biblioteca de produção de vídeo **sem API paga**. Orquestrador `video-estudio` + 12 especialistas, versionados
neste repositório junto com os comandos `/video` e `/video-qa`:

| Skill | Para quê |
|---|---|
| `video-estudio` | Decide o caminho e encadeia o pipeline; dono do `kit.py` |
| `video-roteiro` | Gancho, estrutura por duração, locução |
| `video-storyboard` | Plano a plano, com prova de movimento |
| `video-motion` | Vocabulário, receitas GSAP, ritmo |
| `video-render` | HyperFrames e Remotion, determinístico |
| `video-audio` | Voz local, SFX, mix em -14 LUFS |
| `video-legendas` | faster-whisper, SRT/ASS, karaokê |
| `video-edicao` | ffmpeg: corte, concat, reframe, transição |
| `video-referencia` | Decompor referência em `VIDEO.md` |
| `video-entrega` | Formatos, capa, variantes, nomes |
| `video-local-ia` | ComfyUI/LTX/Wan opcional na GPU |
| `video-marca` | Identidade e o que cada frente pode afirmar |
| `video-qa` | Portões automáticos e checklist manual |

Entrada curta: `python tools/video.py` (de `marketing/`), com `doctor`, `projeto` e `demo`. Canivete:
`video-estudio/scripts/kit.py` (ffmpeg + faster-whisper + SAPI). Mapa de atalhos em
`video-estudio/references/atalhos.md`; catálogo por máquina em `video-estudio/manifest.json`; comandos `/video` e
`/video-qa` em `.claude/commands/`. Raio-X dos 80 repositórios do tópico `ai-video` em
`video-estudio/references/fontes.md`.

## O que já existia

Vídeo = `hyperframes` + `gsap-*`; 3D = `threejs-*`; palestras = HTML + GSAP offline; `remotion-motion-graphics`
só nos vídeos antigos; `wiggle` e `lemo-opuscar` instaladas mas não usadas.
