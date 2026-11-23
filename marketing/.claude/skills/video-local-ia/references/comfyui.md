# ComfyUI local — instalação e ajustes

Status no estúdio: **não instalado** em 21/11/2026. Este guia é para quando o Renato decidir ligar o caminho.

## Instalação

1. Instale o ComfyUI em `D:\Dev\ComfyUI` (build portátil para Windows, com Python embutido).
2. Abra `run_nvidia_gpu.bat` uma vez para validar a GPU.
3. Instale o ComfyUI-Manager para baixar nós.
4. Coloque os modelos nas pastas:

```
ComfyUI/
  models/
    checkpoints/        # SDXL, FLUX
    diffusion_models/   # LTX-Video, Wan
    text_encoders/      # T5, CLIP
    vae/
    loras/
    upscale_models/
```

## Modelos sugeridos para 8 GB

| Função | Modelo | Tamanho aproximado |
|---|---|---|
| Still rápido | SDXL base ou FLUX.1-schnell fp8 | 6–12 GB |
| Vídeo rápido | LTX-Video 2B distilled fp8 | 4–7 GB |
| Vídeo com mais corpo | Wan 2.2 TI2V-5B GGUF Q4/Q5 | 4–6 GB |
| Upscale | Real-ESRGAN x2 | 64 MB |

Baixe de fontes oficiais do projeto; confira licença e hash.

## Flags de VRAM

```bat
python main.py --lowvram
python main.py --normalvram
python main.py --reserve-vram 1.0
```

- 8 GB: comece com `--lowvram`.
- Feche navegador com muitas abas e o HyperFrames durante a geração.
- Se der OOM, reduza resolução antes de reduzir passos.

## Ajustes que importam

| Parâmetro | Faixa | Observação |
|---|---|---|
| Resolução | 512×768 ou 768×512 | 9:16 = 512×896 |
| Frames | 49–97 (2–4 s a 24 fps) | acima de 121 estoura |
| Steps | 4–8 (destilado) / 20–30 (base) | destilado perde detalhe |
| CFG | 1.0–3.5 | alto queima a imagem |
| Seed | fixa por plano | continuidade |
| Sampler | euler / dpmpp_2m | evite exóticos |

## Fluxo recomendado

1. `Load Checkpoint` (SDXL/FLUX) → `KSampler` → `Save Image` para o still.
2. `Load Image` → `LTX-Video`/`Wan` image-to-video → `Save Video`.
3. Gere 3–5 s, 24 fps.
4. No ffmpeg, corte 0,2 s do começo e do fim, normalize o fps para 30 e una.

## Diagnóstico

| Sintoma | Causa | Correção |
|---|---|---|
| OOM | resolução/frames altos | reduzir para 512, 49 frames, `--lowvram` |
| Vídeo preto | VAE errado | conferir VAE do modelo |
| Morphing | prompt com duas ações | uma ação por clipe |
| Texto torto | limitação do modelo | texto só em camada HTML |
| Muito lento | offload | menos frames, resolução menor |
| Costura visível | planos diferentes | mesma seed/referência e corte no movimento |

## Integração

Os clipes gerados são insumo, não entrega. Passe por `video-edicao` (corte/reframe), `video-audio` (voz/SFX),
`video-legendas` (se houver fala) e `video-qa`.

Nunca deixe o ComfyUI baixando modelo durante um render de campanha; baixe antes e renderize offline.
