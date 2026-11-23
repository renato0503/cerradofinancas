# Aprendizados — o que funcionou, o que foi reprovado e o que os especialistas ensinam

Leia antes de começar qualquer vídeo. Cada linha nasceu de um erro nosso ou de uma referência estudada.
Erro que aparecer duas vezes vira regra aqui. Atualizado em 22/11/2026.

## 1. Regras da casa (nascidas de reprovação)

| Regra | Por quê (o que aconteceu) |
|---|---|
| Escreva e aprove o **texto antes** de fazer o vídeo | Institucional v1/v2 refeitos porque o copy era lista de serviços sem ideia central |
| Uma **ideia central em uma frase**, tirada do site | v3 aprovada: "as frentes conversam entre si" (frase da home), mostrada como corrente de causa e efeito |
| Gancho = **pergunta que o público responde na cabeça** | "Seu contador enxerga o seu sistema?" funcionou; "Uma mesa. Quatro frentes." não dizia nada |
| Logo = **só a folinha, arte oficial, grande** | v2 remodelou a folha em 3D e saiu "torta, diferente da original" |
| Para tamanho na tela use **`img/folinha-hero.png`** | `folinha.png` tem ~67% de margem transparente: numa caixa de 220 px a folha sai com ~70 px ("logo muito pequena") |
| Folinha **≥ 180 px (16:9) / 220 px (9:16)** sempre que o nome aparecer | assinatura pequena no canto não conta como marca |
| **Metáfora concreta**, não literal | maquete com portas e "caixinhas" foi reprovada; objetos que já representam cada frente (monitor, razonete, contrato, cadeiras) foram aprovados |
| **Reaproveite objetos aprovados** dos filmes das frentes | coerência de marca e menos risco |
| Sem cidade/números/claims fora do site | "não precisa falar que é em Cuiabá"; regra de verdade da casa |
| **Enquadramento calculado**, não chutado | 4 rodadas de quadro perdidas; a conta: área visível ≈ 59% da largura no 16:9 com faixa; meia-largura visível ≈ 0,28 × distância (fov 30) |

## 2. Processo (o que os especialistas fazem e nós adotamos)

1. **Guia de direção fixo por peça** (`conteudo/<entrega>/DIRECAO.md`, modelo em `direcao-modelo.md`): paleta, fontes,
   marca, ritmo, o que é proibido. "Sem isso, cada sessão é um freelancer novo que nunca viu o canal." (Factual)
2. **Referência antes de animar.** Sem referência o resultado sai genérico ("AI slop"). Escolha um vídeo cujo estilo
   você quer, decomponha (`video-referencia`) e adapte ao tema. (Felipe Borges, LABS)
3. **Stills de cada cena aprovados antes do render** (P2). Renderize quadros soltos e olhe um por um: texto cortado,
   objeto atravessando outro, câmera dentro da mesa. (Factual, Felipe Borges)
4. **Sincronia por palavra.** Meça a locução palavra por palavra (faster-whisper) e faça o texto e os SFX entrarem
   no quadro exato da fala. (Factual) — implementado no institucional v3 (`data-tempos`).
5. **Biblioteca que acumula.** Cada vídeo usa e melhora componentes do anterior; o segundo vídeo tem que ser mais
   rápido que o primeiro. (Factual, LABS)
6. **Três vídeos para amadurecer um estilo.** Faça um, corrija; faça mais três corrigindo aos poucos; só então
   consolide em skill. (LABS)
7. **Erro que vira regra ou script some.** Ex.: `checar_texto3d.py` (texto 3D cortado), medição de área segura do
   HTML, regra da margem da folinha. (Factual)

## 3. Analisar uma referência direito (LABS)

- **Não** mande o vídeo inteiro pedindo "analise o estilo": o modelo amostra poucos quadros e perde o movimento
  lento (um zoom contínuo vira "câmera parada").
- Extraia **pelo menos 1 quadro por segundo** e, nas cenas-chave, **todos** os quadros de 1–2 s:
  `kit.py contato ref.mp4 --cada 1` e `kit.py quadros ref.mp4 --tempos ...`.
- Transforme o que vê em **números**, não adjetivos:
  - movimento de câmera: início/fim de cada zoom e pan, velocidade, onde há corte (`kit.py analisar` dá os cortes);
  - cor e luz por cena: brilho, contraste, saturação, temperatura (quente/fria), 3–5 cores dominantes;
  - ritmo: duração de cada plano, palavras por segundo, pausas.
- Escreva o resultado como **receita reproduzível** ("zoom começa no personagem, 1,04× em 2 s, revela o grupo atrás")
  no `VIDEO.md`.
- **Áudio da referência**: o YouTube pode baixar a **dublagem automática** no lugar do original. Confira o idioma da
  faixa antes de transcrever (o vídeo da Factual que estudamos veio dublado).

## 4. O que faz um estilo 3D parecer caro (LABS, Felipe Borges)

- **A câmera nunca para**: sempre um movimento sutil (push in, pan, órbita lenta). Parado = slide show.
- **Sombra de contato**: todo objeto projeta sombra no chão.
- **A luz acompanha a cena** e a cor muda por cena (quente/fria) para marcar a troca de assunto.
- **Cena de verdade** (objeto com volume, luz, sombra, câmera), não forma chapada fingindo 3D. Para converter um
  motion 2D em 3D: manter roteiro, texto e ritmo; trocar formas planas por objetos com volume; adicionar câmera.
- Estilo marcante = poucos traços repetidos em tudo (ex.: contorno grosso tipo quadrinho, luz quente). Defina os
  seus no `DIRECAO.md` e repita em toda cena.

## 5. Fórmula de roteiro curto (LABS, aplicada ao nosso caso)

1. **Gancho absurdo ou pergunta específica**, resumido numa frase fácil ("um porco quase começou uma guerra";
   "seu contador enxerga o seu sistema?"). Muitas vezes começa com "E se…?".
2. **Ancoragem**: o dado concreto logo depois (lugar, ano, situação reconhecível).
3. **Escalada**: o problema piora em 2–3 frases curtas.
4. **Virada/explicação só no fim**: a curiosidade segura até o último segundo.
5. Texto enxuto (o exemplo dele tem **86 palavras**), narração ágil **quase sem pausas**. Na nossa voz SAPI, meça a
   duração antes; se não couber, corte palavra (nunca acelere).

## 6. Voz e áudio

- Padrão da casa: voz local SAPI (Maria) via `kit.py tts`; normalizar em -14 LUFS e pico ≤ -1,5 dBTP medido no MP4
  final (o AAC passa do alvo do loudnorm: aplicar -0,35 dB no fim).
- **A investigar (não testado)**: Piper (voz neural local, pt-BR) como sucessor da SAPI; VoiceBox, clonagem de voz
  local e grátis (citado pela LABS) — só com autorização expressa do dono da voz. ElevenLabs e similares: fora
  (pagos; ver §7).

## 7. Regra: tudo o que é pago vira grátis ou local (decisão do Renato, 22/11/2026)

Nenhuma peça depende de serviço pago, assinatura, crédito ou licença comercial paga. Preferência: **local** >
**grátis online** > nada. Antes de adotar uma ferramenta, confira a licença (código **e** pesos/vozes do modelo):
"grátis para uso não comercial" não serve, porque a empresa usa comercialmente.

| Pago | Status | Substituto |
|---|---|---|
| Gamma (apresentações, API com chave) | `gerar_gamma.py` + `.env.example` na raiz ainda existem | HTML próprio: `marketing/palestras/_modelo/modelo.html` + `tools/gerar_apresentacoes.py` (palestras ENBRA, Itaú e ICPO já foram feitas assim) |
| Remotion (grátis só até 3 funcionários; a equipe tem 4+) | `marketing/filmes/remotion/` (reels de outubro) | **HyperFrames** (Apache-2.0) em `filmes/`. Não abrir peça nova em Remotion |
| HeyGen (render em nuvem, TTS, avatar) | aparece nas skills `hyperframes*` e `media-use` | render local; ignorar `--cloud`, avatar e TTS da HeyGen |
| ElevenLabs e afins (voz) | não usado | SAPI Maria (`kit.py tts`, local); evoluir para **Piper** (neural, offline, voz pt-BR — conferir a licença da voz). Coqui XTTS: **não** (licença não comercial). Clonagem (ex.: VoiceBox) só com autorização do dono da voz |
| Vídeo generativo (Veo, Kling, Runway, Seedance, fal.ai) | não usado | ComfyUI local + **Wan 2.x** (Apache-2.0); LTX-Video: conferir a licença dos pesos |
| Música | não usada | faixa CC0/CC-BY com autor e licença registrados; geração local a investigar (MusicGen **não**: pesos CC-BY-NC) |
| SFX | — | `kit.py sfx` (sintetizado, local) |
| edge-tts | grátis, mas online (Microsoft) | permitido; preferir local |

## 8. Riscos de plataforma (Factual)

- O YouTube pune conteúdo **repetitivo/inautêntico** (regra renomeada em jul/2025), não o uso de código ou IA.
  Ferramenta que faz um vídeo em 2 h faz o mesmo vídeo para todo mundo: o que diferencia é critério, fato checado e
  cortar a cena bonita que não explica nada.

## Fontes estudadas

| Vídeo | Canal | O que tiramos |
|---|---|---|
| "Animação 3D foi resolvida…" (`v0abDAHbSl8`) | Factual | guia de estilo fixo, autoconferência por print, sincronia por palavra, biblioteca, risco de conteúdo genérico |
| "O Claude agora cria vídeos 3D…" (`kqB_IFcQfAg`) | Felipe Borges · Fala IA! | cena 3D de verdade, referência contra AI slop, 2D → 3D, still antes de animar |
| "Fiz 10 vídeos virais no Claude em 10 minutos" (`qvFERA5avmc`) | LABS | câmera nunca para, referência quadro a quadro em números, fórmula do gancho absurdo, dublagem automática, 3 vídeos para amadurecer |

Transcrições feitas localmente (faster-whisper) em 22/11/2026; não guardamos o conteúdo dos vídeos, só as lições.
Partes de venda (skills pagas, comunidades, ElevenLabs) foram ignoradas.
