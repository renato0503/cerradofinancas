# Plataformas — números práticos

Os limites mudam; confira a central de ajuda da plataforma antes de publicar uma campanha grande.

| Plataforma | Proporção | Resolução | Duração | Bitrate vídeo | Áudio | Capa |
|---|---|---|---|---|---|---|
| Instagram Reels | 9:16 | 1080×1920 | até 90 s | 8–12 Mbps | AAC 128–192k | frame ou 1080×1920 |
| Instagram feed | 4:5 | 1080×1350 | até 60 s | 8–10 Mbps | AAC 128k | 1080×1350 |
| Stories | 9:16 | 1080×1920 | até 60 s por peça | 6–10 Mbps | AAC 128k | — |
| TikTok | 9:16 | 1080×1920 | 15 s–10 min | 8–12 Mbps | AAC 128k | frame |
| YouTube Shorts | 9:16 | 1080×1920 | até 3 min | 10–12 Mbps | AAC 192k | 1080×1920 |
| YouTube | 16:9 | 1920×1080 | livre | 12–16 Mbps | AAC 192k | 1280×720 |
| LinkedIn | 1:1 / 4:5 / 16:9 | 1080 | 15 s–10 min | 8–10 Mbps | AAC 128k | frame |
| Site hero | 16:9 | 1920×1080 | 8–20 s | 4–6 Mbps | mudo | poster PNG |

## Áreas seguras (9:16)

- Topo: 220 px (nome/perfil).
- Base: 220–320 px (legenda, botões, música).
- Direita: 120 px (ações).
- Texto essencial no centro, entre 220 e 1600 px de altura.

## Loudness

- Meta: **-14 LUFS** integrado, true peak **-1,5 dBTP**.
- Plataformas normalizam para baixo; entregar mais alto que -12 perde dinâmica.
- Teste no celular em volume 50%.

## Legendas

- Reels/TikTok/Shorts: queimada.
- YouTube: SRT (permite edição e tradução).
- LinkedIn: queimada, fonte maior que o padrão de desktop.
- Sempre entregue o `.srt` mesmo quando queimar.

## Codificação recomendada

```bash
ffmpeg -i master.mp4 -c:v libx264 -profile:v high -level 4.2 -preset slow -crf 18 \
  -pix_fmt yuv420p -c:a aac -b:a 192k -ar 48000 -ac 2 -movflags +faststart final.mp4
```

Para arquivo leve de site:

```bash
ffmpeg -i master.mp4 -c:v libx264 -preset slow -crf 24 -an -movflags +faststart hero.mp4
ffmpeg -i master.mp4 -c:v libvpx-vp9 -crf 32 -b:v 0 -an hero.webm
```

## Metadados

- Título e descrição com a promessa, não com "vídeo novo".
- Primeira linha da legenda repete o gancho.
- Hashtags só quando houver estratégia; não polua.
- Link do WhatsApp quando a peça for de conversão.
- Marque @ls.intermedfin em peças de crédito.
