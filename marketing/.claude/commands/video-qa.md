---
description: Confere um vídeo antes de publicar, com QA automático e checklist manual
argument-hint: "<arquivo.mp4> [formato]"
---

Use a skill `video-qa`.

Arquivo: $ARGUMENTS

1. Rode `python tools/video.py sondar <arquivo>`.
2. Rode `python tools/video.py qa <arquivo> --formato <formato>` (use `--sem-audio` para hero mudo).
3. Gere contato: `python tools/video.py contato <arquivo> --saida qa/contato.jpg`.
4. Gere análise: `python tools/video.py analisar <arquivo> --saida qa/analise.json`.
5. Faça o checklist manual de `video-qa/references/checklist.md`.
6. Devolva o relatório no formato:

```
ARQUIVO:
FORMATO:
AUTOMÁTICO:
MANUAL:
DECISÃO:
```

Não conserte o vídeo sem antes dizer o que falhou e por quê.
