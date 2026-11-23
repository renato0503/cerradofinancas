# Limites do estúdio sem API paga

## O que temos na máquina

| Item | Situação |
|---|---|
| ffmpeg / ffprobe | 9.0.2 full build, com libx264 e aac |
| Node / npm | 24.14 / 11.12 |
| Python | 3.12.10 |
| faster-whisper | 1.2.1 (legenda local) |
| Playwright + Pillow + PyMuPDF | instalados (quadros, PDF, peças) |
| HyperFrames | 0.8.210 em `filmes/` |
| GPU | RTX 4060 Laptop, 8 GB de VRAM |
| Voz local | Microsoft Maria Desktop (pt-BR), via SAPI |
| CUDA para whisper | **não configurado**: falta `cublas64_12.dll`; o kit cai para CPU sozinho |

## Regras

1. **Nada de API paga.** Sem Seedance, Veo, Kling, Runway, Higgsfield, ElevenLabs, fal.ai, Atlas, MuAPI.
2. **Modelo local só se couber em 8 GB.** Prefira 512–768 px, 3–5 s por clipe, com quantização e offload.
3. **Voz sintética é opcional.** SAPI resolve locução simples; não clone voz de pessoa real.
4. **Não depender de rede no render.** Baixe fontes, ícones e modelos antes; renderize offline.
5. **Licença importa.** Remotion é gratuito para pessoa física e empresas pequenas; confirme antes de escalar.
   HyperFrames é Apache 2.0; Three.js e GSAP têm licenças próprias (GSAP é gratuito no uso padrão atual).

## O que dá para fazer bem

- Motion graphics, tipografia cinética, gráficos, mapas, diagramas, UI animada.
- 3D real em Three.js/WebGL (objetos, produto, globo, cena de marca).
- Corte, reframe, concatenação, speed ramp, transições e legendas via ffmpeg.
- Locução pt-BR offline e SFX sintetizados.
- Explicador de 30–90 s inteiramente desenhado em código.
- Análise de referência: cortes, silêncios, pretos, loudness, contato.
- Carrossel animado e peça vertical a partir do HTML da campanha.

## O que não dá (ou não vale a pena)

- Apresentador humano fotorrealista com lip-sync perfeito em 1080p, offline, em 8 GB.
- Vídeo generativo longo, 4K, consistente por muitos planos.
- Clonagem de rosto ou voz de terceiros.
- Texto legível dentro de vídeo gerado por difusão (nasce torto); texto vai em camada HTML/ffmpeg.
- "Clonar" um viral copiando conteúdo protegido; copiamos ritmo, estrutura e linguagem.
- Trilha musical autoral convincente por síntese simples; se precisar, use faixa com licença.

## Desempenho esperado (ordem de grandeza)

| Tarefa | Tempo |
|---|---|
| Render HyperFrames 1080p, 30 s | 1–4 min |
| Render Three.js 1080p, 32 s | 3–10 min |
| Legenda whisper `small` em CPU, 1 min de áudio | 1–3 min |
| Legenda whisper `tiny` em CPU | ~15–30 s por minuto |
| Reframe/encode ffmpeg 1080×1920, 30 s | 20–60 s |
| ComfyUI LTX-Video 2B, 5 s em 512p | 2–8 min (quando configurado) |

## Como habilitar GPU (opcional)

Para whisper em CUDA: instalar o CUDA Runtime 12 com cuBLAS e cuDNN compatíveis com o Python 3.12, ou usar o
Python embutido do ComfyUI (que já traz as DLLs). O kit detecta a falha e continua na CPU, sem quebrar o fluxo.

Para vídeo generativo local: instalar ComfyUI em `D:\Dev\ComfyUI`, baixar LTX-Video 2B (fp8) ou Wan 2.2 TI2V-5B
quantizado, e seguir `video-local-ia`. Sem isso, o caminho padrão é código (HyperFrames/Remotion/ffmpeg).
