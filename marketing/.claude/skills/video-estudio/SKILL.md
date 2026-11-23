---
name: video-estudio
description: Orquestra a produção de vídeo do estúdio Cerrado sem API paga — decide entre HyperFrames/GSAP/Three.js, Remotion, ffmpeg e modelos locais; encadeia roteiro, storyboard, motion, áudio, legendas, edição, QA e entrega. Use quando o pedido for "fazer um vídeo", "Reel", "comercial", "filme da frente", "carrossel animado", "editar vídeo", "gerar legenda", "voz", "trilha", "analisar referência" ou "vídeo com IA local".
---

# Estúdio de vídeo Cerrado

Biblioteca de vídeo do time de marketing: **só Claude + código + ferramentas locais**. Nenhuma API paga de
terceiros (Seedance, Veo, Kling, Higgsfield, Runway, ElevenLabs, fal.ai, Atlas Cloud). GPU local só quando o
caminho escolhido pedir.

## Onde ficam as coisas (23/11/2026)

| O quê | Onde |
|---|---|
| Fontes das campanhas (carrossel, story, post) | `marketing/conteudo/<entrega>/` |
| Peças finais entregues (PNG, MP4, legendas) | `marketing/entregas/<entrega>/` |
| Estúdio HyperFrames (filmes, coreografias, `ferramentas/`) | `marketing/filmes/` |
| Remotion antigo (só Reels de outubro) | `marketing/filmes/remotion/` |
| Palestras (decks HTML+GSAP e `_modelo/`) | `marketing/palestras/` |
| Entrada do vídeo e canivete | `python tools/video.py` → `video-estudio/scripts/kit.py` |

Versão do pacote: **1.1 (21/11/2026)** — 13 skills + `commands/`, versionadas neste repositório.

## Regra zero

1. **Sem chave de API, sem crédito, sem upload para serviço pago.** Se a receita do repositório depende de um
   modelo na nuvem, adapte a *ideia* (gramática, fluxo, estrutura) e descarte a chamada. Tudo o que é pago é
   substituído por algo grátis ou que roda local; licença "não comercial" também está fora. Tabela de substitutos em
   `references/aprendizados.md` §7 (Remotion só até 3 funcionários → HyperFrames; HeyGen → render local).
2. **A verdade está no código e no que já está no site.** Não invente produto, número, prêmio ou cliente. Crédito
   leva o aviso legal; Cerra.AI não promete o que não está no projeto.
3. **Render determinístico.** Nada de relógio, `Math.random()` sem semente ou estado de rede no quadro. O vídeo é
   função do tempo.
4. **Áudio é opcional, silêncio é aceitável.** A trilha sintética antiga foi reprovada; use som quando ele
   acrescentar e sempre normalize.
5. **Portão de qualidade antes de publicar.** Nenhum MP4 sai sem `qa` + conferência visual de quadros.

## Comece aqui

**Antes de tudo, leia `references/aprendizados.md`** (o que já foi reprovado, o que foi aprovado e o que os vídeos de
referência ensinam) e crie `conteudo/<entrega>/DIRECAO.md` a partir de `references/direcao-modelo.md`. O texto é
aprovado antes de qualquer cena.

Rode de `marketing/` (na raiz do repo, prefixe com `marketing/`):

```bash
python tools/video.py doctor                      # ambiente pronto?
python tools/video.py projeto <nome> --frente tech # cria conteudo/ e entregas/
python tools/video.py demo                        # clipe 9:16 de teste, ponta a ponta
```

- `doctor` diz o que falta (ffmpeg, whisper, voz, GPU, ComfyUI, disco) em uma tela.
- `projeto` cria `briefing.md`, `roteiro.md`, `storyboard.md` e `legenda.txt`; não sobrescreve sem `--forcar`.
- `demo` gera `marketing/.cache/video-demo/demo-9x16.mp4` com voz, SFX, legenda e QA.
- `references/atalhos.md` mapeia pedido → comando → skill em uma página.
- `manifest.json` é o catálogo legível por máquina, se você precisar decidir sem abrir 13 arquivos.

## Mapa de decisão

| Pedido | Caminho | Skill |
|---|---|---|
| Comercial, filme de frente, carrossel animado, peça com 3D | HyperFrames + GSAP (+ Three.js) | `video-render` |
| Peça programática em React, legenda por palavra, episódio | Remotion | `video-render` |
| Cartão, lower third, slide, corte simples, reframe | ffmpeg + CSS/Canvas | `video-edicao` |
| Voz, locução, narração | SAPI local; edge-tts (grátis) se instalado | `video-audio` |
| Legenda, SRT, karaokê | faster-whisper local (CPU ou CUDA) | `video-legendas` |
| Referência para copiar ritmo/estilo | ffmpeg + contato + VIDEO.md | `video-referencia` |
| Vídeo generativo (texto/imagem → vídeo) | ComfyUI local (LTX-Video/Wan) na RTX 4060 | `video-local-ia` |
| Ideia → roteiro → plano de cenas | estrutura de 15/30/60 s | `video-roteiro` + `video-storyboard` |
| Movimento, transição, timing | vocabulário e receitas | `video-motion` |
| Formato, capa, variantes, nome de arquivo | specs por plataforma | `video-entrega` |
| Marca, cor, fonte, o que pode ser dito | guia Cerrado | `video-marca` |
| Conferência final | checklist + `kit.py qa` | `video-qa` |

## Pipeline

1. **Briefing** — frente, objetivo, público, duração, formato, CTA, restrições de verdade. Se faltar, pergunte só
   o que muda o resultado.
2. **Roteiro** — uma frase por batida; o CTA é uma cena, não um rodapé. Ver `video-roteiro`.
3. **Storyboard** — tabela de planos com tempo, enquadramento, movimento, texto, áudio e asset. Ver `video-storyboard`.
4. **Prova de movimento** — 2 a 3 quadros com `kit.py quadros` ou `npx hyperframes snapshot --at`. Aprovar antes
   de renderizar o filme inteiro.
5. **Montagem** — HTML/CSS + GSAP no `filmes/` (ou Remotion); dados, fontes e ícones locais.
6. **Áudio e legenda** — voz local, SFX, mix em -14 LUFS; legenda queimada quando o formato pedir.
7. **Render e QA** — 16:9 e 9:16 quando aplicável; `kit.py qa`; contato e inspeção; entrega em `entregas/`.

## Kit local

O canivete é `tools/video.py` (atalho estável) ou `scripts/kit.py` (dentro da skill). Rode a partir de
`marketing/`:

```bash
python tools/video.py doctor
python tools/video.py projeto <nome> --frente tech
python tools/video.py demo
python tools/video.py sondar video.mp4
python tools/video.py quadros video.mp4 --tempos 1,3,5 --saida q/
python tools/video.py contato video.mp4 --saida contato.jpg
python tools/video.py cortar video.mp4 --de 0.5 --ate 8 --saida corte.mp4
python tools/video.py juntar a.mp4 b.mp4 --formato 9x16 --saida junto.mp4
python tools/video.py enquadrar video.mp4 --formato 9x16 --modo fundo --saida v.mp4
python tools/video.py legendar video.mp4 --saida base --device cuda --karaoke --queimar
python tools/video.py normalizar video.mp4 --saida norm.mp4
python tools/video.py sfx --tipo whoosh --saida whoosh.wav
python tools/video.py analisar video.mp4 --saida analise.json
python tools/video.py qa video.mp4 --formato 9x16
python tools/video.py tts --texto "..." --saida voz.wav
```

`doctor` e `projeto` têm `--json`; `demo` imprime o JSON do QA e falha se o clipe não passar. Dependências já
instaladas: ffmpeg, `faster-whisper`, Pillow, Playwright. Opcionais: `edge-tts` (voz neural gratuita), ComfyUI
(vídeo local). Nada além disso é obrigatório.

## Onde as coisas vivem

- `filmes/` — HyperFrames, coreografias, cenas 3D, renders.
- `conteudo/<entrega>/` — HTML-fonte das peças e carrosséis.
- `entregas/<entrega>/` — o que o time baixa (MP4, PNG, legendas, ZIP).
- `brand/` — identidade; `dados/` — catálogos e fatos.
- `tools/` — publicação, agenda, formatos e verificação.
- `../video/` — vídeos de hero do site (não são peças de campanha).

## Portões de qualidade

- Resolução e proporção exatas do destino; H.264, `yuv420p`, `+faststart`, 30 fps (24 ou 60 só com motivo).
- Texto dentro da área segura (9:16: 1080×1920, margem de 120 px nas laterais e 220 px no topo/base).
- Nada de letreiro cortado no 3D; nada de alegação sem fonte.
- Áudio entre -16 e -12 LUFS (meta -14), pico ≤ -1,5 dBTP; sem clipping.
- Legenda legível no celular: corpo ≥ 42 px em 1080 de largura, contraste alto, no máximo 2 linhas.
- Primeiro segundo tem que segurar; o último tem que fechar com CTA ou marca.

## Referências

- `references/aprendizados.md` — regras nascidas de reprovação, processo dos especialistas (Factual, Felipe Borges,
  LABS), como analisar referência, fórmula de roteiro curto. Leia primeiro.
- `references/direcao-modelo.md` — modelo do guia de direção por peça (`conteudo/<entrega>/DIRECAO.md`).
- `references/atalhos.md` — pedido → comando → skill, em uma página.
- `references/pipeline.md` — fases, artefatos e critérios de aceite.
- `references/fontes.md` — raio-X dos 80 repositórios do tópico `ai-video`: o que adotamos, adaptamos, só
  consultamos e o que fica de fora por exigir API paga.
- `references/limites.md` — o que dá e o que não dá sem nuvem; orçamento de VRAM da RTX 4060 (8 GB).
- `manifest.json` — catálogo curto e legível por máquina (skills, comandos, formatos, metas).
