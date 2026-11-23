---
description: Produz um vídeo do briefing à entrega usando o pacote video-estudio
argument-hint: "[frente] [objetivo] [duração] [formato]"
---

Use a skill `video-estudio` e as especialistas que ela indicar.

Pedido: $ARGUMENTS

Procedimento:

1. Extraia frente, objetivo, público, formato, duração e CTA. O que faltar e mudar o resultado, pergunte; o resto,
   assuma e declare.
2. Rode `python tools/video.py doctor` se for a primeira vez na sessão ou se algo falhar.
3. Crie a pasta com `python tools/video.py projeto <nome> --frente <frente>`.
4. Preencha `briefing.md`, `roteiro.md` e `storyboard.md` na pasta criada.
5. Mostre 3 ganchos e o storyboard antes de renderizar.
6. Produza os quadros de prova, depois o vídeo, a legenda e o áudio.
7. Rode `python tools/video.py qa <arquivo> --formato <formato>` e o checklist manual.
8. Entregue em `entregas/<nome>/` com capa, `.srt` e nomes no padrão.

Não use API paga. Não invente claim. Não clone rosto ou voz de terceiro. Não commite nada sem pedir.
