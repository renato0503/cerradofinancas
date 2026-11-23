---
name: video-audio
description: Gera e mixa áudio de vídeo sem API paga — locução pt-BR com voz local (SAPI) ou edge-tts gratuita, SFX sintetizados, normalização em -14 LUFS e correção de pronúncia. Use quando o pedido for "voz", "locução", "narração", "áudio do vídeo", "trilha", "efeito sonoro", "mixar", "deixar o áudio bom" ou "o áudio está baixo".
---

# Áudio

Áudio ruim derruba vídeo bom. O padrão do estúdio é **voz limpa + poucos SFX + silêncio quando não soma**. A
trilha sintética antiga foi reprovada e não volta por padrão.

## Voz local

```bash
python .claude/skills/video-estudio/scripts/kit.py tts --texto "Seu ERP não é o problema." --saida voz.wav
python .claude/skills/video-estudio/scripts/kit.py tts --arquivo-texto roteiro.txt --velocidade 2 --saida voz.wav
```

- Voz padrão: `Microsoft Maria Desktop` (pt-BR, offline).
- `--velocidade` vai de -10 a 10; use 0 a 3. Voz acelerada para "caber" é o erro mais comum.
- `--edge` usa `pt-BR-FranciscaNeural` se `edge-tts` estiver instalado (grátis, exige rede). Sem instalar, cai
  sozinho para SAPI.
- Ouça o arquivo inteiro. Voz sintética erra pontuação e nomes.

## Direção de voz

- Frase curta, ponto final no lugar de vírgula.
- Marque pausa com linha em branco ou `...` (não com vírgula).
- Números por extenso quando a leitura importa: "cento e vinte e oito" em vez de "128".
- Siglas: escreva como se fala na primeira ocorrência (`Cerra.AI` → "Cerra A I").
- Nome próprio: ajuste a grafia fonética no texto da locução, não no texto da tela.

## SFX

```bash
python .claude/skills/video-estudio/scripts/kit.py sfx --tipo whoosh --saida whoosh.wav
python .claude/skills/video-estudio/scripts/kit.py sfx --tipo impacto --duracao 0.8 --saida impacto.wav
```

Tipos: `whoosh` (troca), `pop` (entrada), `click` (UI), `riser` (tensão), `impacto` (fecho). Use no máximo 1 SFX
a cada 2 s; nunca por cima da palavra falada.

## Mix

```bash
python .claude/skills/video-estudio/scripts/kit.py normalizar filme.mp4 --saida filme-final.mp4
python .claude/skills/video-estudio/scripts/kit.py qa filme-final.mp4 --formato 9x16
```

Metas:

- Loudness integrado **-14 LUFS** (±2).
- True peak ≤ **-1,5 dBTP**.
- Voz 6 a 10 dB acima do fundo.
- SFX 12 a 18 dB abaixo da voz.
- Nada de clipping; nada de silêncio absoluto no começo.

## Música

Só entre se houver faixa com licença clara e documentada. Registre autor, fonte e licença na pasta da entrega.
Sem licença, o caminho é silêncio ou SFX.

## Referências

- `references/mix.md` — cadeia de processamento, ducking e correções.
- `references/locucao.md` — como adaptar roteiro para ser falado.
