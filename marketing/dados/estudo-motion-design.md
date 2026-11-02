# Estudo: ferramentas de motion design e 3D (02/11/2026)

Pedido do Renato: ver o que estes quatro repositórios podem resolver no estúdio — "movimentações mais
interessantes e personalizadas nos vídeos e elementos 3D também", e "definir as identidades visuais".

| Repositório | O que é | Licença | Veredito |
|---|---|---|---|
| [motionmaxxing](https://github.com/Tejashmakwana/motionmaxxing) | Skill de motion design: curvas medidas, runtime GSAP seek-safe, 3D de verdade, portões de revisão | Apache-2.0 | **Adotar o runtime e os portões** (não as regras de layout) |
| [bang-motion](https://github.com/bangtutorial/bang-motion) | Skill de motion design com **menus**: 10 estilos × 19 conceitos de abertura × 6 estilos de explainer, e um passo de "style brief" com 3 candidatos | MIT | **Adotar como método para definir a identidade de movimento de cada marca** |
| [dimensional-drawing](https://github.com/enesozturk/dimensional-drawing) | Desenha a anatomia de um componente de interface como folha técnica (estilo Apple) e anima a folha em ~10 s | MIT | **Adotar para o vídeo do white-label da Cerrado Tech** |
| [img2threejs](https://github.com/img2threejs/img2threejs) | Reconstrói o objeto de uma foto como modelo Three.js procedural, com portões de qualidade | Apache-2.0 | **Não usar agora** (radar) |

---

## motionmaxxing — o runtime e a régua

O que tem dentro (vale mais que o README):

- `runtime/motion.js`: um script sobre GSAP, sem build, **seek-safe** (todo quadro é função pura do
  tempo) com **12 curvas medidas** (`softLand`, `snapSettle`, `accelExit`…), além de palavras, digitação,
  cursor, contagem, câmera, smear e `hero3d` (Three.js: logo extrudado de SVG, com luz e profundidade).
- `references/motion.md`, `type.md`, `transitions.md`: as leis do ofício com a medição de trás.
- `scripts/look.py` e `scripts/lint.mjs`: portões G0–G5 que rodam sobre o render (quadro morto, tempo de
  card final, "page chrome") e imprimem os números.
- `scripts/brand.mjs`: captura a identidade de um site (cores, fontes, logo, telas) — o mesmo que a gente
  já tem em `brand/`.

**O que serve para a gente**

1. **As curvas medidas.** Hoje a coreografia usa `power3.inOut` e `expo.out` em todo lugar. As 12 curvas
   medidas dão variety sem inventar: entrada desacelera, saída acelera, e "nada cresce de zero" (chega
   de fora ou maior, desacelera).
2. **O `hero3d` resolve o "elemento 3D"** que o Renato pediu: um objeto Three.js (o logo extrudado, uma
   placa, um cartão) com luz e profundidade, no mesmo relógio do resto do filme — sem exportar arquivo.
3. **Os portões G2/G3** (sem quadro morto, card final curto) dá um critério **objetivo** para revisar os
   vídeos, no lugar do "achei que ficou bom".

**O que não serve (atenção)**

A lista "never ship" do skill proíbe exatamente o que o **carrossel de feed** do Instagram é: nome da
marca no canto, contador "01/06", tarja de rodapé, título à esquerda e card à direita. Ou seja: **o
motionmaxxing não pode ser aplicado ao carrossel de feed**. Ele vale para os **filmes** (o comercial do
Cerra.AI, o lançamento da CerraClass, os vídeos extras e o white-label). O `lint.mjs` reprovaria 100% das
~110 peças de feed.

## bang-motion — a identidade de movimento por marca

O que tem dentro:

- **10 direções de estilo** (Cinematic dark, Poster color-block, Editorial light, Paper & print, Retro,
  Brutalist mono, Pastel playful, Luxury dark, Flat pop with photos, Grainy gradient), com fundo,
  tipografia, movimento-assinatura e para que serve cada uma.
- **19 conceitos de abertura** (One continuous shot, Pure typography, Problem → gone, Journey inside the
  UI, Logo as stage, Living UI ecosystem, Claim → how → result…) com princípios e menus de aberturas,
  transições e finais.
- **6 estilos de explainer**, cada um com um starter próprio.
- Um **passo de style brief**: 3 candidatos de conceito, uma recomendação, a impressão digital da
  estrutura e uma paleta em que **cada cor diz a origem**. E a regra de que **cada vídeo tem que ter uma
  impressão digital diferente do anterior** — é o antídoto direto contra "todo vídeo parece igual".

**Como usar na prática, para a gente**

As nossas marcas já têm identidade **visual** (`brand/<marca>/README.md`: cor, fonte, recursos). O que
falta é a identidade de **movimento**. O bang-motion dá o formato para declarar isso, uma vez por marca:

```
brand/<marca>/movimento.md
  Estilo (entre os 10) + por que
  Conceito de abertura (entre os 19) + por que
  Curvas: entrada, saída, de acordo com as 12 medidas
  Câmera: o que ela faz (drift, push, follow)
  Transições: a gramática da marca
  Tipografia em movimento: como a marca fala
  Som: o que entra e o que fica em silêncio
  O que esta marca nunca faz
```

Com isso, `filmes/coreografias/` deixa de ser "um vídeo por campanha" e passa a ser "a mesma marca se
movendo". É o que o Renato pediu: movimentações **personalizadas**.

**Melhorias que o bang-motion traz para o nosso fluxo atual**

- A regra **"a cena começa já se movendo e o corte acontece em movimento"** (nunca fade) elimina o
  defeito mais visível dos nossos vídeos: a transição em fade entre slides.
- **Fundo que nunca fica parado** (grão, luz, respiração) e **um sujeito que atravessa a cena** tiram o
  aspecto de "apresentação que desliza".
- **Verificação de quadro** (`snap.mjs`, `?debug=1`) antes de entregar: confere os segundos-chave em
  vez de confiar na memória.

## dimensional-drawing — o desenho do white-label

Este é o achado mais direto para um pedido específico do Renato: o **vídeo do sistema/app white-label da
Cerrado Tech** (campanha `2026-11-tech-white-label`).

A ideia do repositório é a das folhas técnicas da Apple para acessórios: uma folha com a anatomia do
componente (paddings, gaps, raios, camadas, posição no viewport), **monocromática**, com **variáveis em
vez de números** (`S1`, `R2`, `H1 = 2·S1 + H3`) e **nunca inventando valor** (`[TBD]`). E há uma segunda
skill que **anima a folha**: close no cabeçalho → volta para a planta → as camadas se levantam na vista
explodida → volta para a folha completa, com as linhas se desenhando.

Para o white-label isso é melhor que um vídeo de "tela do produto": mostra a **arquitetura** — que é
exatamente o que se vende quando o cliente quer o software com a marca dele.

Como usar: a folha é gerada a partir do componente real (o white-label da Cerrado Tech é a tela de login
com a marca do cliente), em monocromático + a cor da marca, e a animação de ~10 s vira o filme.

## img2threejs — radar, não agora

Reconstroi em código o objeto de uma foto, com portões de qualidade e saída em TypeScript. É impressionante,
mas:

- o nosso produto é **software**: não há objeto físico para reconstruir;
- o logo 3D (que é o que seria útil) já está no `hero3d` do motionmaxxing, e em SVG;
- o pipeline tem ~90 módulos Python e exige agente com leitura de imagem.

Guardar como radar: se um dia entrarem no catálogo **produtos físicos** ou **hardware** (mesa digital,
terminal de pagamento, totem), aí sim vale. Licença Apache-2.0, uso comercial liberado.

---

## O que fazer com isso (plano)

1. **Declarar a identidade de movimento de cada marca** (`brand/<marca>/movimento.md`), no formato do
   style brief do bang-motion: 3 conceitos candidatos, 1 escolhido, curva, câmera, transição, som.
   Começar pelo **Cerra.AI** (cobre e grafite pede "Cinematic dark" ou "Grainy gradient") e pelo
   **white-label da Cerrado Tech**.
2. **Tirar o fade da troca de slide** nos vídeos: corte em movimento, cena que começa já em movimento.
3. **Assumir o `motion.js` do motionmaxxing** no lugar do GSAP direto: curvas medidas, `hero3d` para o
   logo, e o quadro como função pura do tempo (dá para depurar e renderizar quadro a quadro).
4. **Rodar os portões G2/G3** (`look.py`) em todo filme entregue, e anotar os números no `NOTE.md`.
5. **Fazer a folha dimensional do white-label** e animá-la: vira o filme da campanha
   `2026-11-tech-white-label` (a ser produzido).

### O que precisa do Renato

- **3D em vídeo**: o hero 3D foi reprovado no site (hero do `/portfolio/`, commit `7f72762`) e não deve
  voltar lá sem pedido explícito. Em vídeo, a proposta é o logo/marca como objeto de luz real dentro da
  cena. Precisa de aval.
- **Qual conceito por marca**: os 3 candidatos de cada `movimento.md` saem para aprovação antes de
  qualquer render.
- **Custo**: os portões e o runtime são scripts livres (Apache-2.0/MIT); renderizar em 4K e com `--grain`
  leva mais tempo de CPU. O padrão continua 1080×1350 e 1080×1920.

### Licenças

- motionmaxxing: Apache-2.0 (mesma do HyperFrames). GSAP embutido segue a licença da GreenSock; Three.js
  é MIT; a fonte Inter é SIL OFL 1.1.
- bang-motion: MIT.
- dimensional-drawing: MIT.
- img2threejs: Apache-2.0.

Uso comercial permitido em todos os quatro. Se for copiar código para dentro do `marketing/filmes/`,
manter os avisos de licença junto.
