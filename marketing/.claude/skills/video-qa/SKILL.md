---
name: video-qa
description: Confere vídeo antes de publicar — resolução, proporção, fps, duração, áudio, loudness, pretos, área segura, legenda e claims — com comandos automáticos e checklist manual. Use quando o pedido for "conferir vídeo", "QA", "revisar antes de publicar", "está no formato", "o áudio está certo", "passar no controle de qualidade" ou "por que a peça foi reprovada".
---

# QA de vídeo

Nenhum MP4 sai sem passar por aqui. O automático pega formato; o olho pega vergonha.

## Automático

```bash
K="python .claude/skills/video-estudio/scripts/kit.py"
$K sondar final.mp4
$K qa final.mp4 --formato 9x16
$K qa hero.mp4 --formato 16x9 --sem-audio
$K analisar final.mp4 --saida qa/analise.json
$K contato final.mp4 --saida qa/contato.jpg --cada 1 --linhas 4 --colunas 5
```

`qa` falha (código 1) quando:

- resolução não bate com o formato;
- não há vídeo ou áudio;
- duração passa do limite (`--max`, padrão 90 s);
- loudness fora de ±2 LUFS da meta;
- preto acumulado acima de 0,5 s;
- fps abaixo de 24 (aviso).

## Manual (obrigatório)

1. **Primeiro quadro**: a promessa aparece antes de 2 s?
2. **Último quadro**: marca + CTA legíveis?
3. **Contato**: algum quadro parece slide parado, cortado ou borrado?
4. **Texto**: cabe na área segura? duas linhas no máximo?
5. **Logo**: sem distorção, contraste e respiro?
6. **Cor**: a frente está reconhecível sem ler?
7. **Áudio**: voz inteligível no celular, sem estouro, SFX não cobre fala?
8. **Legenda**: nomes próprios, números e sincronia?
9. **Claims**: tudo tem fonte? aviso legal presente?
10. **Arquivo**: nome, pasta, `.srt`, capa e `.zip`?

## Portões

| Portão | Quando | Critério |
|---|---|---|
| P1 — roteiro | antes de animar | promessa, prova e CTA claros |
| P2 — quadro | antes do render | 2–3 quadros aprovados |
| P3 — render | depois do MP4 | `qa` + contato |
| P4 — publicação | antes de subir | manual completo |

Reprovou em P1/P2: volta para roteiro/storyboard. Reprovou em P3: corrige render. Reprovou em P4: não publica.

## Relatório

```
ARQUIVO: reel-9x16.mp4
FORMATO: 1080x1920, 30 fps, 21,0 s
AUTOMÁTICO: ok (0 falhas, 1 aviso)
MANUAL: 9/10 — legenda do plano 4 com duas linhas longas
DECISÃO: corrigir legenda e reexportar
```

## Referências

- `references/checklist.md` — checklist imprimível e critérios de reprovação.
- `../video-entrega/SKILL.md` — formatos e nomes.
