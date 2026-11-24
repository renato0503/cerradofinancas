# Direção — Vídeo com IA · "A prova na tela" (36 s, 16:9 + 9:16, mudo + SFX)

Guia lido antes de qualquer cena. Se uma cena contraria uma linha daqui, a cena muda.
Identidade: `conteudo/v2-video-com-ia/identidade/README.md` ("Mesa de edição").

## A ideia em uma frase

Os melhores filmes do estúdio são **nossos**, rodando num celular e num notebook; o 3D deles é
**código** — e isso se aprende na maratona **Vídeo com IA** (`cerraclass.com.br/video-ia`, 1 dia ao
vivo, replay 7 dias). Fonte: landing `conteudo/v2-video-com-ia/campanha/pagina-de-vendas.html` e
`filmes/out/frente-*` (os 14 aprovados em 23/11).

## Marca

- Marca-mãe só no fecho: selo branco redondo com a logo CerraClass (`assets/logo.png`).
- Paleta: fundo `#0a0a0f`, painel `#12121a`, borda `#2b2b3a`; lima `#d8ff3e` (ação, CTA, playhead),
  azul `#6b8cff` (roteiro), coral `#ff6b57` (atenção), violeta `#b06bff` (código), ciano `#3ee0cf` (áudio).
- Tipografia: Outfit 700/800 (título), Instrument Sans 400/600 (texto), DM Mono 400/500 (rótulo/chip).
  Nenhuma outra.
- Traço repetido em todo plano: **a lâmina lima do playhead**.

## Texto

- Público: quem produz conteúdo e times de marketing; quem nunca editou e quer escalar.
- ≤ 6 palavras por texto de tela. Frase curta, verbo no imperativo, "você" sempre.
- Só frases com fonte (landing, identidade, filmes). Proibido: número de alunos, renda, "sem esforço",
  preço, data, logo oficial de ferramenta.
- Prometer processo, não milagre: "um dia", "você sai com o seu".

## Ritmo

- 6 planos de 6 s. Promessa antes de 2 s. Algo novo a cada ~2 s. CTA nos últimos 6 s; 1 s de quadro final.
- Câmera nunca parada; um movimento dominante por plano; corte em movimento; nada de fade.
- Contraste de velocidade: whip-pan de ~0,3 s e slow motion de 0,5× na hora do impacto.

## Visual / 3D

- Herói único: **o par celular + notebook** (mesa de edição, estúdio escuro, grade discreta).
- Os outros 5 aparelhos entram só no plano 4 (a parede), cada um no **formato nativo** (9:16 em
  celular, 16:9 em notebook), sem recorte nem esticamento.
- Cada tela roda um trecho real de 2 s dos filmes aprovados (`assets/telas/<slug>/`).
- Momento-herói: **os 7 elementos 3D dos filmes saem das telas** e flutuam em constelação (20,4–23,4 s).
  São os objetos aprovados: chip (Cerra.AI), ingresso + cadeiras (CerraClass), impressora + comanda
  (CerraFood), bússola (Guia Acadêmico), razonete + escada (Contabilidade), contrato + caneta (Crédito),
  organograma em arame (Consultorias).
- Texto escrito no 3D só em textura de tela; `checar_texto3d.py` tem de sair "ok".

## Referência

Os 14 vídeos de `filmes/out/frente-{cerraai,cerraclass,cerrafood,consultoria,contabilidade,credito,guiacademico}-{16x9,9x16}.mp4`
(benchmark registrado em `filmes/README.md`, seção "Referência de qualidade").

## Processo

1. Texto aprovado (este arquivo + `ROTEIRO.md`) → 2. telas extraídas → 3. stills de cada plano →
4. render → 5. QA (`checar_texto3d.py`, `quadros.py`, `video.py qa`). Sem áudio de trilha: só SFX locais.
