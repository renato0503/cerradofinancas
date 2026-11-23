---
name: video-edicao
description: Edita vídeo com ffmpeg — corte preciso, concatenação, reframe 9:16/4:5, speed ramp, transições, overlay, legenda queimada, normalização e proxy. Use quando o pedido for "cortar", "juntar vídeos", "deixar vertical", "tirar o áudio", "acelerar", "transição", "enquadrar para Reels", "comprimir" ou "editar sem abrir editor".
---

# Edição com ffmpeg

Editor de verdade é timeline; ffmpeg é bisturi. Use ffmpeg para operações determinísticas, reprodutíveis e
scriptáveis. Para composição criativa, prefira HyperFrames/Remotion.

## Operações do kit

```bash
K="python .claude/skills/video-estudio/scripts/kit.py"
$K sondar entrada.mp4
$K cortar entrada.mp4 --de 1.2 --ate 8.5 --saida corte.mp4
$K juntar a.mp4 b.mp4 --formato 9x16 --saida junto.mp4
$K enquadrar entrada.mp4 --formato 9x16 --modo fundo --saida vertical.mp4
$K normalizar entrada.mp4 --saida final.mp4
$K legendar final.mp4 --saida legenda --queimar
$K qa final.mp4 --formato 9x16
```

## Escolhas

- **Corte**: reencode (`libx264 -crf 18`) para precisão de frame. `-c copy` só quando o corte cai em keyframe.
- **Reframe**: `corte` para encher o quadro; `fundo` para manter o enquadramento original com fundo desfocado.
- **Concat**: `juntar` normaliza resolução, fps e áudio — evita o clássico "áudio dessincronizou".
- **Transição**: `xfade` para 0,3–0,5 s; nunca em todas as junções.
- **Velocidade**: `setpts` para vídeo e `atempo` para áudio (0,5–2,0; encadeie fora disso).
- **Silêncio**: `silenceremove` para limpar respiro; não corte pausa dramática.

## Regras

1. Nunca reencode duas vezes sem necessidade; encadeie filtros em uma passada.
2. Preserve `yuv420p` e `+faststart` para compatibilidade.
3. Áudio final em AAC 192 kbps, 48 kHz, estéreo.
4. Trabalhe com cópia; nunca sobrescreva o original.
5. Nomeie com formato e versão: `reel-9x16-v2.mp4`.
6. Confira com `qa` e contato antes de entregar.

## Quando não usar ffmpeg

- Texto animado, 3D, gráficos e coreografia → HyperFrames/Remotion.
- Correção de cor criativa → editor ou LUT consistente.
- Mixagem complexa com ducking → cadeia dedicada em `video-audio`.

## Referências

- `references/ffmpeg.md` — comandos prontos para cada operação.
- `../video-entrega/references/plataformas.md` — bitrate, resolução e duração por destino.
