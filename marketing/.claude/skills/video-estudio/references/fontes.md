# Raio-X do tópico `ai-video` (80 repositórios)

Levantamento feito em 21/11/2026 a partir da listagem pública do tópico. **Não copiamos código**: aproveitamos
fluxo, gramática, estrutura de arquivo e ideias. Antes de copiar qualquer arquivo, confira a licença no repositório.

Legenda:

- **A — adotar**: vira skill, script ou formato nosso.
- **B — adaptar**: a ideia entra, a implementação (modelo pago, app macOS, SaaS) não.
- **C — consultar**: biblioteca de prompts, estilos ou referência visual.
- **E — GPU local**: só faz sentido rodando offline na máquina.
- **D — fora**: depende de API paga, crédito de nuvem ou serviço externo.

## A — adotados

| Repositório | O que entra |
|---|---|
| `Vincentwei1021/video-shotcraft` | Cartas de plano, previews de movimento, sincronia com batida, export. Base das receitas de `video-motion`. |
| `Vincentwei1021/anything2explainer` | Estrutura de explicador: tópico → narração → legenda → barra de capítulos, tudo desenhado em código. |
| `JuneYaooo/rea-video` | Decomposição quadro a quadro e o formato aberto `VIDEO.md`. Base de `video-referencia`. |
| `haidrrrry/claude-remotion-skill` | Remotion para motion graphics, B-roll, legendas e sound design. |
| `joeseesun/qiaomu-cut-skill` | Governança de mídia, legenda bilíngue, render reproduzível. |
| `talsiach/take-one` | Ciclo ideia → script → visual → edição → sala de revisão. A revisão é etapa, não retrabalho. |
| `xeronsh/KomaSlate` | Storyboard não destrutivo, retake por plano e diff de versão. |
| `Yuuhann1999/agent-storyboard` | Storyboard local-first; adaptado de MCP para arquivos Markdown/JSON no repositório. |
| `jnMetaCode/ai-shortfilm-prompts` | 21 gêneros e estrutura de 5 estágios para prompt cinematográfico. |
| `sitor-ai/frametell` | Explicador com diretor-agente e material do usuário. |
| `pireel/pireel` | Editor com timeline, cortes, B-roll e export; conceito de operação por agente. |
| `digitalsamba/claude-code-video-toolkit` | Orquestração script → voz → música → clipes → render; trocamos os modelos pagos por locais. |
| `hassancs91/claude-faceless-shorts-creator` | Shorts sem rosto, legenda exata por palavra, biblioteca de SFX. |
| `rushindrasinha/youtube-shorts-pipeline` | Pipeline notícia → roteiro → visual → voz → legenda. |
| `jipraks/yt-short-clipper` | Reframe 9:16 com rastreio de rosto e legenda palavra a palavra. |
| `liyupi/ai-promo-video-maker` | Fluxo de promo: pesquisa → estilos → captura 4K → batida → narração → QA. ElevenLabs trocado por TTS local. |
| `raojiacui/prompt-lens` | Engenharia reversa de prompt, análise de áudio/fala e corte por instrução. |

## B — adaptados

| Repositório | O que entra (sem o que é pago) |
|---|---|
| `hypit-ai/hypit` | "Clonar" um viral como **workflow**: trocar fala, B-roll e gerar variantes. Nunca rosto/voz de terceiro sem autorização. |
| `lemomo-ai/lemo-opuscar` | Catálogo de estilos de filme em código; a skill já está instalada. |
| `openfilm/openfilm` | Agente que opera um editor e deixa o resultado editável. |
| `dramaclaw/dramaclaw` | Pipeline roteiro → filme, com papéis de produção. |
| `zenstory-ai/drama-skills` | Novela → roteiro → visual → storyboard → prompt → edição. |
| `edenfunf/reelmimic` | Clonagem de ritmo, planos e transições de uma referência (sem copiar conteúdo protegido). |
| `HaD0Yun/CozyClay` | Previs 3D antes de produzir; blockout de câmera. |
| `Alisa0808/vox-director` | Estilo paper-collage, executado localmente (sem Atlas Cloud). |
| `oil-oil/oil-motion` | Animação por scroll/mouse — útil no site, não no MP4. |
| `Agents365-ai/video-podcast-maker` | Asset engine + Remotion + TTS local. |
| `869413421/ai-moive-studio` | Canvas infinito e workflow editável. |
| `shijue-aid/aid-studio` | Diretor/previsão e múltiplos estágios. |
| `HeyChengC/vibe-knowledge-film` | Ritmo de vídeo de conhecimento e decomposição de hit. |
| `HeyChengC/wallstreet-explainer` | Linguagem visual financeira, busca de imagem, mixagem. |
| `alecm20/story-flicks` | História → vídeo em ferramenta simples. |
| `xuanyustudio/LocalMiniDrama` | Pipeline local/offline de短剧 e gestão de projeto. |
| `shuyu-labs/BigBanana-AI-Director` | Script → asset → keyframe; continuidade de personagem. |
| `glanderness/BeefTV` | Canvas com nós e materiais. |
| `Ebony-Vinyl/EAC-design-world` | HTML → vídeo, multi-trilha e canvas de design. |
| `Blizaine/Maestro` | Director mode local (WanGP) para planejar cenas. |
| `Lanqiao-Luca/ai-video-marker` | Pixel art, animação em camadas, ponte com Blender. |
| `VelornLabs/velorn` | Timeline real dirigida por agente local. |
| `Agions/dramaxis` | Multiagente com timeline e portões de qualidade. |
| `YeJe-cpu/SeeCut` | Talking-head → corte automático com ritmo. |
| `aqm857886159/Nomi` | Workbench MCP + ComfyUI local; projeto fica na máquina. |
| `ersinkoc/AI-Video-Factory` | Fábrica multilíngue com agentes que escrevem, planejam e revisam. |
| `yi1108/printfilm` | Estrutura de campanha e短剧. |
| `ChenShuo2004/cs-board` | Whiteboard animation local com TTS. |
| `receptron/mulmocast-cli` | Podcast/slides com TTS e lip-sync. |
| `eternityspring/reelbench-skills` | Notas de análise de plano e ferramentas. |
| `omnichar/OmniChar` | Ficha única de personagem (rosto, corpo, figurino, voz) para continuidade. |
| `qianshuixia/shrimpreel` | Só a ideia de landing/variantes por tema; geração via fal.ai fica de fora. |
| `WhiteTowerAI/ohmygame` | Referência de estúdio/canvas; não é vídeo. |

## C — consulta (prompts, estilos, referência)

| Repositório | Uso |
|---|---|
| `LearnPrompt/awesome-seedance` | Templates de prompt e casos. |
| `YouMind-OpenLab/awesome-seedance-2-prompts` | Estilos e prompts. |
| `ai-boost/awesome-image-video-prompts` | Prompt com resultado real ao lado. |
| `Evolink-AI/awesome-seedance-2.5-guides` | Guia e assets oficiais. |
| `Evolink-AI/GPT-Image-2-Seedance-2.5-Workflow` | Imagem → vídeo. |
| `guanmo-ai/awesome-ai-motion` | Referências de motion e making-of. |
| `yihui-dev/awesome-opus5-5-videos` | Prompts e remakes. |
| `athemeroy/awesome-claude-5-5-videos` | Workflows e evidências. |
| `JuneYaooo/awesome-ai-media-cn` | 150+ projetos de mídia. |
| `rockbenben/img-prompt` | Tradução de tags para prompt. |
| `cclank/lanshu-awesome-ai-video-kit` | 411 prompts, 7 skills, metodologia. |
| `cclank/lanshu-create-ai-presenter-video` | Apresentador verificado — só com imagem autorizada. |
| `OSideMedia/higgsfield-ai-prompt-skill` | Cinema, atuação, continuidade. |
| `liyue-aigc/seedance-2-5-video-director` | Direção de prompt e personagem. |
| `rediumvex/ai-video-generator-claude` | 10 skills de prompt por nicho. |
| `zhanghao123vip/ai-manju-skills` | 21 gêneros de漫剧. |
| `A-cat-with-carrots/OnlyShot` | Pipeline de短剧 em 5 passos. |
| `NarratorAI-Studio/narrator-ai-cli-skill` | Narração e commentary. |

## E — GPU local (opcional)

| Repositório | Uso na RTX 4060 8 GB |
|---|---|
| `JGRFW/comfyui-AICG3D` | Fluxos longos no ComfyUI; usar versões quantizadas. |
| `Carasibana/ComfyUI-H3-FaceRefine` | Refino de rosto por frame; pesado, usar em trechos. |
| `mrbizarro/Phosphene` | Excelente referência de app offline, mas é macOS/Apple Silicon. |
| `Blizaine/Maestro` | Instalação via Pinokio; útil como referência de director mode. |
| `aqm857886159/Nomi` | Ponte MCP para ComfyUI local. |

## D — fora (API paga / nuvem)

| Repositório | Motivo |
|---|---|
| `SamurAIGPT/Seedance-2.5-API` | API paga do Seedance. |
| `GTAI-1/flow-mcp` | Consome créditos do Google Flow. |
| `ffroliva/gflow-cli` | Veo/Imagen via Flow. |
| `timoncool/videosos` | Modelos via fal/runware. |
| `palmier-io/palmier-pro` | Editor macOS + Seedance. |
| `miyakooy/TensorsLab-Vison` | Serviço externo. |
| `Anil-matcha/open-genjutsu` | Recasting com Seedance e rosto de terceiro. |
| `qianshuixia/shrimpreel` | Geração via fal.ai. |

## O que fica de aprendizado

1. **Código vence modelo**: os projetos mais úteis desenham cada quadro (Remotion, HTML, Canvas, WebGL). É o que já
   fazemos com HyperFrames.
2. **O diferencial é o fluxo**: existem dezenas de "geradores"; poucos têm roteiro, plano, prova, QA e entrega.
3. **Prompt de modelo não é roteiro**: as bibliotecas de Seedance/Veo ajudam a descrever câmera e luz, mas não
   substituem narrativa.
4. **Local-first é vantagem**: projeto, material e chave ficam na máquina. Nossa versão usa ffmpeg + faster-whisper
   + ComfyUI opcional.
5. **O que não fazemos**: clonar rosto/voz de pessoas reais, copiar filme alheio quadro a quadro, prometer
   resultado de modelo que não roda offline.
