---
name: video-local-ia
description: Gera planos de vídeo com IA rodando offline no ComfyUI (LTX-Video, Wan) na GPU local, sem API paga, e integra os clipes ao fluxo ffmpeg/HyperFrames. Use quando o pedido for "vídeo com IA local", "texto para vídeo", "imagem para vídeo", "ComfyUI", "LTX", "Wan", "gerar no meu computador", "sem pagar API" ou "usar a GPU".
---

# Vídeo generativo local

Caminho opcional. O padrão do estúdio continua sendo código (HyperFrames/Remotion/ffmpeg); IA local entra quando o
plano precisa de imagem orgânica que o código não desenha.

## Quando usar

- Textura orgânica: fumaça, água, tecido, comida, natureza, luz.
- B-roll que não existe no acervo.
- Transição entre dois mundos visuais.
- Protótipo rápido de clima/estilo.

## Quando não usar

- Texto legível, logo, UI de produto, gráfico, dado. IA de difusão erra texto e geometria.
- Rosto de pessoa real, voz, cliente, depoimento.
- Plano longo ou narrativa contínua. Gere 2–5 s e corte.
- Peça institucional que exige exatidão de marca.

## Orçamento na RTX 4060 (8 GB)

| Modelo | Uso | Configuração realista |
|---|---|---|
| LTX-Video 2B (destilado, fp8) | texto/imagem → vídeo rápido | 512–768 px, 2–4 s, 24 fps |
| Wan 2.2 TI2V-5B (GGUF Q4/Q5) | mais qualidade | 480–640 px, 3–5 s, offload |
| SDXL / FLUX.1-schnell | still base para image-to-video | 1024 px, 4–8 steps |

Acima disso, o Windows começa a usar RAM compartilhada e o tempo explode. Não prometa 1080p generativo.

## Fluxo

1. **Still primeiro** (SDXL/FLUX) quando precisa de enquadramento e personagem consistentes.
2. **Image-to-video** com prompt curto de movimento e câmera.
3. **Mesma semente** e mesma referência para planos vizinhos.
4. **Cortar o morphing**: os primeiros e últimos 6–10 frames costumam derreter.
5. **Editar no ffmpeg**:

```bash
python .claude/skills/video-estudio/scripts/kit.py juntar clipe1.mp4 clipe2.mp4 --formato 9x16 --saida cena.mp4
python .claude/skills/video-estudio/scripts/kit.py enquadrar cena.mp4 --formato 9x16 --modo fundo --saida final.mp4
```

6. **Áudio depois**: TTS e SFX em `video-audio`; o modelo não gera áudio.
7. **QA**: `kit.py qa` e contato. Verifique mão, texto, logo e continuidade.

## Prompt para modelo local

Estrutura em inglês, curta e concreta:

```
shot: medium close-up
subject: ceramic coffee cup on a wooden table
action: steam rising slowly
camera: slow push in, static horizon
light: warm morning window light from the left
style: photorealistic, shallow depth of field
negative: text, logo, extra fingers, warped geometry
```

- Uma ação por clipe. Movimento de câmera único.
- Descreva luz e lente; é o que mais muda o resultado.
- Evite adjetivos vazios ("cinematic", "masterpiece") sem dizer o que fazer.
- Para continuidade, repita sujeito, figurino, luz e lente; mude só a ação.

## Limites e ética

- Confira a licença de cada modelo no card do repositório; algumas restringem uso comercial.
- Não gere pessoa real, marca de terceiro ou cena que sugira endosso.
- Não use clipe gerado como prova de produto ou resultado.
- Se o modelo não roda offline na sua máquina, o plano não entra.

## Instalação

`references/comfyui.md` traz instalação, pastas, flags de VRAM, ajustes e diagnóstico.
