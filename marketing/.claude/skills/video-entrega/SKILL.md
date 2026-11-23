---
name: video-entrega
description: Prepara a entrega final de vídeo — formatos por plataforma, codec, bitrate, capa, variantes, nomes de arquivo, pastas e metadados. Use quando o pedido for "entregar", "exportar para Reels", "versão para YouTube", "capa", "thumbnail", "variantes", "qual formato", "comprimir para o site" ou "organizar a entrega".
---

# Entrega

Entrega boa é a que o time acha, baixa e publica sem perguntar nada.

## Matriz rápida

| Destino | Formato | Duração | Legenda | Áudio |
|---|---|---|---|---|
| Reels / Shorts / TikTok | 9:16 1080×1920 | 15–60 s | queimada | -14 LUFS |
| Feed Instagram | 4:5 1080×1350 | 15–45 s | queimada | -14 LUFS |
| Story | 9:16 | 7–15 s por peça | queimada | opcional |
| YouTube | 16:9 1920×1080 | conforme roteiro | SRT | -14 LUFS |
| LinkedIn | 1:1 ou 4:5 | 15–60 s | queimada | -14 LUFS |
| Site (hero) | 16:9 1920×1080 | 8–20 s | nenhuma | mudo por padrão |
| Apresentação | 16:9 | conforme | sem | opcional |

## Codificação

```bash
ffmpeg -i master.mp4 -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p \
  -c:a aac -b:a 192k -ar 48000 -ac 2 -movflags +faststart entrega.mp4
```

- H.264 + AAC para compatibilidade universal.
- `+faststart` para começar a tocar antes do download.
- Master em CRF 18; versões leves em CRF 23.
- WebM/VP9 só quando o site pedir; mantenha o MP4 ao lado.

## Nomes e pastas

```
entregas/<entrega>/
  reel-9x16.mp4
  reel-9x16-capa.png
  feed-4x5.mp4
  youtube-16x9.mp4
  legenda-instagram.srt
  legenda-youtube.srt
  legenda-instagram.txt
  capa.png
  story-9x16.mp4
  entrega.zip
```

- Tudo minúsculo, com hífen, sem acento.
- Versão só quando houver mudança real: `-v2`.
- O `.zip` não leva MP4 pesado; o time baixa na Central.

## Capa

- 9:16: 1080×1920; 4:5: 1080×1350; 16:9: 1280×720.
- Rosto/produto grande, texto ≤ 6 palavras, contraste alto.
- Não use frame com transição ou blur.
- Teste em miniatura de 120 px de largura.

## Variantes

Para campanha, entregue:
1. versão principal;
2. variante de gancho (primeiros 2 s diferentes);
3. versão sem locução (só texto + SFX) para feed mudo;
4. capa alternativa.

## Checklist

- [ ] resolução, fps e duração conferidos com `kit.py sondar`
- [ ] `kit.py qa` sem falha (`--sem-audio` para hero mudo)
- [ ] loudness -14 LUFS, pico ≤ -1,5 dBTP
- [ ] legenda revisada e arquivo `.srt` incluído
- [ ] capa exportada
- [ ] aviso legal da frente presente
- [ ] nomes e pastas no padrão
- [ ] contato visual dos primeiros e últimos quadros

## Referências

- `references/plataformas.md` — números por plataforma e observações.
