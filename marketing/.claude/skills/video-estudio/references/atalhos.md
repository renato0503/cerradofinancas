# Atalhos — pedido → comando → skill

Rode de `marketing/`. Se estiver na raiz do repositório, troque `tools/video.py` por
`marketing/tools/video.py` e `conteudo/` por `marketing/conteudo/`.

## Começar

| Pedido | Comando | Lê depois |
|---|---|---|
| "o ambiente está pronto?" | `python tools/video.py doctor` | — |
| "criar um vídeo do zero" | `python tools/video.py projeto <nome> --frente tech` | `conteudo/<nome>/briefing.md` |
| "me mostra um exemplo funcionando" | `python tools/video.py demo` | `demo-9x16.mp4` |
| "não sei por onde começar" | esta página | `SKILL.md` do `video-estudio` |

## Produzir

| Pedido | Comando | Skill |
|---|---|---|
| "roteiro de 21 s" | — | `video-roteiro` |
| "decupagem" | — | `video-storyboard` |
| "animar / transição" | — | `video-motion` |
| "renderizar HyperFrames" | `npm run …` em `filmes/` | `video-render` |
| "voz / locução" | `tools/video.py tts --texto "..." --saida voz.wav` | `video-audio` |
| "efeito sonoro" | `tools/video.py sfx --tipo whoosh --saida whoosh.wav` | `video-audio` |
| "legenda / SRT" | `tools/video.py legendar filme.mp4 --saida out/legenda` | `video-legendas` |
| "legenda palavra por palavra" | `… --karaoke` | `video-legendas` |
| "queimar legenda" | `… --queimar` | `video-legendas` |
| "deixar vertical" | `tools/video.py enquadrar filme.mp4 --formato 9x16 --saida v.mp4` | `video-edicao` |
| "cortar" | `tools/video.py cortar filme.mp4 --de 1 --ate 8 --saida c.mp4` | `video-edicao` |
| "juntar" | `tools/video.py juntar a.mp4 b.mp4 --formato 9x16 --saida j.mp4` | `video-edicao` |
| "áudio baixo" | `tools/video.py normalizar filme.mp4 --saida final.mp4` | `video-audio` |
| "analisar referência" | `tools/video.py analisar ref.mp4 --saida ref.json` | `video-referencia` |
| "conferir antes de publicar" | `tools/video.py qa final.mp4 --formato 9x16` | `video-qa` |
| "capa / formatos" | — | `video-entrega` |
| "vídeo com IA local" | — | `video-local-ia` |
| "o que pode ser dito" | — | `video-marca` |

## Fluxo mínimo

```
doctor → projeto → roteiro → storyboard → 2 quadros → render → legenda → normalizar → qa → entrega
```

## Quando algo falha

| Sintoma | Primeiro comando |
|---|---|
| comando não existe | `python tools/video.py doctor` |
| ffmpeg estranho | `ffmpeg -version` |
| legenda não gera | `doctor`; se whisper ausente, `python -m pip install faster-whisper` |
| CUDA falha | ignorar: o kit cai para CPU |
| voz não sai | `doctor`; conferir `Microsoft Maria Desktop` |
| render quebrou | `video-render`, seção "Quando quebra" |
| MP4 não abre | `sondar` e `qa` |
| loudness fora | `normalizar` de novo; conferir se o áudio tem fala |

## Regra de ouro

Se o pedido não muda decisão (frente, objetivo, público, formato, duração, CTA), **não pergunte**: assuma o padrão
da campanha, registre a suposição e siga. Pergunte só o que muda o resultado.
