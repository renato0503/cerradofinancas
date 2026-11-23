---
name: video-legendas
description: Transcreve e legenda vídeo localmente com faster-whisper, gera SRT e ASS, faz karaokê por palavra e queima a legenda no MP4. Use quando o pedido for "legenda", "subtitle", "SRT", "transcrever", "fechar legenda", "legenda palavra por palavra", "queimar legenda" ou "o vídeo precisa de legenda".
---

# Legendas

Legenda é parte da edição, não anexo. Em 9:16, ela é o texto principal para quem assiste sem som.

## Comando

```bash
python .claude/skills/video-estudio/scripts/kit.py legendar filme.mp4 --saida out/legenda
python .claude/skills/video-estudio/scripts/kit.py legendar filme.mp4 --saida out/legenda --karaoke
python .claude/skills/video-estudio/scripts/kit.py legendar filme.mp4 --saida out/legenda --queimar
python .claude/skills/video-estudio/scripts/kit.py legendar filme.mp4 --saida out/legenda --device cuda
```

Saídas: `.srt`, `.ass` e, com `--queimar`, `-legenda.mp4`.

- Modelo padrão `small`; use `tiny` para rascunho e `medium` quando o áudio for difícil.
- `--device cuda` só funciona com cuBLAS/cuDNN; se falhar, o kit refaz na CPU.
- O áudio é decodificado pelo ffmpeg antes do whisper (evita dependência do PyAV).

## Revisão obrigatória

1. Nomes próprios: Cerra.AI, CerraClass, CerraFood, Guia Acadêmico, Cuiabá, Renato Rosa.
2. Números e siglas: "128" e "cento e vinte e oito" não são a mesma coisa na tela.
3. Quebra de linha: no máximo 2 linhas, 32–38 caracteres por linha em 9:16.
4. Sincronia: legenda não pode adiantar a fala em mais de 0,2 s.
5. Sentido: whisper erra pontuação; ajuste para não mudar a promessa.

## Estilo

- Corpo 52–60 px em 1080 de largura; peso 600/700; contorno escuro de 2–3 px.
- Branco com contorno, ou faixa sólida da marca com texto claro.
- Posição: centro inferior, margem de 220 px na base em 9:16 (fora dos botões).
- Destaque karaokê na cor de acento da frente; nunca duas cores competindo.
- Sem sombra pesada, sem degradê no texto.

## Onde usar

- **Queimada**: Reels, Shorts, TikTok, stories.
- **SRT separado**: YouTube (permite correção e tradução).
- **ASS**: quando precisa de estilo e karaokê.
- **Sem legenda**: peça institucional longa com boa locução e volume.

## Referências

- `references/estilo.md` — presets ASS, área segura e correções comuns.
- `references/plataformas.md` — limites e recomendações por plataforma.
