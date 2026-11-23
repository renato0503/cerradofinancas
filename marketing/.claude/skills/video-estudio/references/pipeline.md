# Pipeline de vídeo — fases e artefatos

## 0. Briefing (5 linhas)

```
Frente:        tech | contabilidade | credito | cursos | cerraai | cerrafood | guiacademico | institucional
Objetivo:      lançar | explicar | vender | recrutar | institucional
Público:       quem assiste e o que já sabe
Peça:          Reel/Short 9:16 | feed 4:5 | YouTube 16:9 | story | carrossel animado
Duração:       15 | 21 | 30 | 45 | 60 s
CTA:           WhatsApp | site | inscrição | nenhum
Restrições:    o que não pode ser afirmado; assets obrigatórios
```

Se o pedido não trouxer isso, assuma o padrão da campanha e registre a suposição no começo da resposta.

## 1. Roteiro

- Uma intenção por batida. Em 15 s cabem 4 batidas; em 30 s, 6; em 60 s, 9.
- Gancho nos primeiros 1,5 s (pergunta, contradição, número, cena).
- Prova no meio (tela, produto, dado, depoimento).
- CTA no fim, curto e específico. Sem "saiba mais" genérico.
- Saída: texto por cena, com duração alvo e locução opcional.

## 2. Storyboard

Tabela obrigatória por plano:

| # | tempo | plano | câmera/movimento | texto na tela | áudio | asset |
|---|---|---|---|---|---|---|
| 1 | 0,0–2,0 | logo + promessa | push in lento | 6 palavras | whoosh | `img/folinha-hero.png` |

Regras: um movimento dominante por plano; troca de cor vale por corte; nada de dois textos competindo.

## 3. Prova de movimento

Antes do render completo:

```bash
python .claude/skills/video-estudio/scripts/kit.py quadros out/previa.mp4 --tempos 0.5,2,4 --saida previa/
```

ou

```bash
npx hyperframes snapshot filme.html --at 1.2 --out previa.png
```

Critério: o quadro parado já conta a história? Se não, o problema é composição, não animação.

## 4. Montagem

- **HyperFrames** para peças com HTML/CSS/GSAP/Three.js. Determinismo: tudo em função do tempo.
- **Remotion** para React/TSX e legenda por palavra.
- **ffmpeg** para corte, reframe, concat, legenda queimada e normalização.
- Fontes, ícones e imagens **locais** (sem CDN no render).

## 5. Áudio

1. Voz local: `kit.py tts` (SAPI pt-BR Maria) ou edge-tts se instalado.
2. SFX: `kit.py sfx` (whoosh, pop, click, riser, impacto).
3. Música: só se houver faixa com licença clara; nunca trilha sintética fraca por padrão.
4. Mix: voz dominante, SFX 12 a 18 dB abaixo, `kit.py normalizar` no final.

## 6. Legenda

- `kit.py legendar` com faster-whisper; `--karaoke` para palavra por palavra; `--queimar` para o MP4 final.
- Revisar nomes próprios (Cerra.AI, CerraClass, Guia Acadêmico, Cuiabá).
- Em 9:16, legenda no terço inferior, longe dos botões da plataforma.

## 7. Render e QA

- Formatos: 16:9 1920×1080 e 9:16 1080×1920; feed 4:5 1080×1350.
- `kit.py qa arquivo.mp4 --formato 9x16` tem que passar.
- Contato visual: `kit.py contato` e leitura dos quadros.
- Entregar em `entregas/<entrega>/` com legendas `.txt` por plataforma.

## Convenção de nomes

```
<entrega>/<peca>-<formato>[-<variante>].<ext>
2026-11-cerrafood-plataforma/reel-9x16.mp4
2026-11-cerrafood-plataforma/carrossel-animado.mp4
2026-11-cerrafood-plataforma/legenda-instagram.txt
```

## Critérios de aceite

- [ ] A promessa aparece antes de 2 s.
- [ ] A marca aparece ao menos duas vezes (abertura e fecho).
- [ ] Todo texto é legível a 30 cm do celular.
- [ ] Nenhum quadro com letreiro cortado, elemento fora da área segura ou pixelizado.
- [ ] Áudio sem estouro e com voz inteligível.
- [ ] CTA e aviso legal corretos para a frente.
- [ ] `kit.py qa` sem falhas.
