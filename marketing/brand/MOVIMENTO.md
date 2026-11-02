# Identidade de movimento por marca

Cada marca já tem identidade **visual** (cor, fonte, recursos gráficos) em `brand/<marca>/README.md`.
Falta a identidade de **movimento**: como a marca se mexe. Este arquivo é essa parte, e
`brand/movimentos.json` é a versão que o código consome (`filmes/ferramentas/animar-carrossel.mjs`).

O método vem do [bang-motion](https://github.com/bangtutorial/bang-motion) (MIT): **estilo** (a pele),
**conceito de abertura** (a estrutura) e uma **impressão digital** diferente por vídeo. As curvas vêm das
12 curvas medidas do [motionmaxxing](https://github.com/Tejashmakwana/motionmaxxing) (Apache-2.0):
`softLand` (entrada desacelera), `snapSettle` (encaixe com peso), `accelExit` (saída acelera).

## As regras que valem para todas as marcas

1. **Nada de fade.** O medido é 3.392 entradas por transformação contra 584 fades. Tudo entra se movendo.
2. **A entrada desacelera, a saída acelera.** A mesma coisa na curva errada parece flutuar ou ser jogada.
3. **Nada cresce de zero.** O elemento chega de fora ou maior, e desacelera.
4. **O corte acontece em movimento**, nunca em repouso.
5. **Nenhum quadro morto.** A câmera respira o filme inteiro (a escala e o deslocamento lentos, em
   `camera`), e o grão dá superfície ao fundo (`grao`).
6. **A arte é da marca:** quem vê o vídeo tem que reconhecer a marca sem ler o logo.
7. **Vídeo sem áudio.** A trilha sintetizada foi reprovada; `--com-audio` só volta se o Renato pedir.

## As sete marcas

| Marca | Estilo | Conceito de abertura | Troca | Assinatura |
|---|---|---|---|---|
| **Cerrado Tech** | Cinematic dark | Object relay | desliza (0,42 s) | a fábrica: peças se passando, entrada seca e pesada |
| **Cerrado Contabilidade** | Paper & print | Object metaphor | virada de página | o livro-razão: um objeto (o razonete) que muda de significado |
| **Cerra.AI** | Grainy gradient | Journey inside the UI | corte em movimento | a câmera entra na interface; o cobre é a luz; o grão é mais forte |
| **CerraClass** | Poster color-block | Rhythmic collage | desliza (0,38 s) | a aula: bloco de cor que bate, com leve overshoot de cadeira |
| **Crédito** | Editorial light | Pure typography | virada de página | o contrato no papel; a rubrica se desenha; nunca um número |
| **Guia Acadêmico** | Visual journalism | Claim → how → result | corte em movimento | o artigo: marca-texto, anotação e a fonte citada |
| **Consultorias** | Brutalist mono | Before / after | corte em movimento | a prancha técnica: corte duro, grade que se desloca, um único laranja |

### Por que estas escolhas

- **Cerrado Tech — Cinematic dark / Object relay.** O site é azul quase-preto com dourado; o dourado vira
  **luz**, não cor de preenchimento. A fábrica que se vê na apresentação institucional (peças encaixando) é
  exatamente o conceito "Object relay": uma peça do sistema passa para a seguinte. A entrada é pesada
  (`power4.out`), sem elástico: software não é festa.
- **Cerrado Contabilidade — Paper & print / Object metaphor.** A identidade já é o livro-razão: papel com
  pauta, margem vermelha, razonete e carimbo "EM DIA". O filme é um objeto (o lançamento) que muda de
  significado, e a troca é a **virada de página** — a mesma coisa que o contador faz com o livro. Fundo de
  papel, nunca azul.
- **Cerra.AI — Grainy gradient / Journey inside the UI.** Cobre e silício. "Grainy gradient" é o único estilo
  que dá **brilho dentro do escuro** com grão, que é exatamente o cobre da logo sobre o grafite. O conceito é
  o gesto do próprio produto: a câmera entra no documento até a página citada. O corte é seco, em movimento,
  porque a interface responde rápido. **Aqui o 3D é autorizado** (é arte de marketing, não o site): o
  emblema de cobre como objeto de luz real.
- **CerraClass — Poster color-block / Rhythmic collage.** A identidade já é um bloco de cor por curso e uma
  régua de dia de aula. O filme bate no ritmo da aula: bloco que entra de lado, com o leve overshoot de quem
  arrasta a cadeira. Nunca "tech" roxo/azul: é uma sala de aula.
- **Crédito — Editorial light / Pure typography.** O contrato no papel, com linha de assinatura e letra
  miúda. O filme é tipografia e a rubrica manuscrita (Caveat) que assina no fim. A troca é a virada de
  folha. Regra dura: **nunca um número** (taxa, parcela, prazo).
- **Guia Acadêmico — Visual journalism / Claim → how → result.** A identidade já é o artigo: resumo,
  palavras-chave, numeração de seções, nota de rodapé, marca-texto, revisão riscada em vermelho. "Visual
  journalism" é o que mais se aproxima disso: marca-texto, anotação e **fonte citada**. O corte é em movimento,
  como quem vira a página de um artigo.
- **Consultorias — Brutalist mono / Before / after.** A identidade já é a planta: papel vegetal com grade,
  cotas, organograma e o corte antes/depois. O movimento é de prancha técnica: corte duro, grade que se
  desloca e um único laranja de destaque. Sem gracefully.

## O que cada marca nunca faz

- **Cerrado Tech:** não usa emoji, não usa chip 3D genérico girando, não usa ciano/glow de "IA".
- **Contabilidade:** não usa azul/dourado (é do resto da Cerrado), não usa pizza, não usa "dicas" nem
  promete economia (código de ética do CFC).
- **Cerra.AI:** não usa nuvem, roxo ou ciano de "IA"; não usa cérebro com circuito; não digita letra a
  letra fora do terminal (o terminal é o produto).
- **CerraClass:** não usa eraser nem quadro escolar; não usa "learn English"; não usa roxo "tech".
- **Crédito:** não mostra taxa, parcela nem prazo; não usa escudo dourado; não promete aprovação.
- **Guia Acadêmico:** não usa "limpeza de plágio" nem "garantia de aprovação"; o autor é o aluno.
- **Consultorias:** não usa número de cliente nem case; não usa promessa de resultado.

## Como usar

```
# a peça de feed (carrossel animado) já lê a identidade da marca pelo nome da campanha
node ferramentas/animar-carrossel.mjs ../posts/<entrega>/carrossel.html --render

# os filmes (com coreografia própria) seguem a mesma identidade:
# a coreografia escolhe os movimentos por elemento, mas não pode inventar outra gramática
```

- `brand/movimentos.json` é a fonte: estilo, conceito, `transicao` (desliza | corte | virada),
  `entrada` (transformação, curva, stagger), `camera` (respiro) e `grao`.
- Ao acrescentar uma marca nova, criar a entrada no JSON e o parágrafo neste arquivo.
- Ao trocar a identidade visual de uma marca, revisar também a de movimento: são a mesma coisa vistas de
  dois ângulos.
