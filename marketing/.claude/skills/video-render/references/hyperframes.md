# HyperFrames — notas de campo

## O que é

Renderizador de vídeo a partir de HTML. Cada quadro é o navegador em um instante do tempo; a animação é GSAP.
É a base do `filmes/` e do carrossel animado.

## Estrutura de um filme

```
filme/
  index.html          # palco, CSS, imports
  cena3d.js           # Three.js (opcional)
  coreografia.mjs     # timeline GSAP
  assets/             # fontes, ícones, imagens locais
```

O `montar.mjs` embute CSS, fontes, imagens e ícones para o render não depender de rede.

## Determinismo

- `gsap.timeline({ paused: true })` e `tl.time(t, false)`.
- Three.js: função pura do tempo; `hf-seek` informa o instante.
- Nada de `Date.now()`, `performance.now()`, `setTimeout` ou `Math.random()` sem semente.
- Renderize com `--concurrency 1` quando houver 3D.

## Comandos úteis

```bash
npx hyperframes snapshot filme.html --at 1.2 --out q.png
npx hyperframes render filme.html --out out.mp4 --fps 30 --crf 20
npx hyperframes render filme.html --out out-9x16.mp4 --width 1080 --height 1920
```

Confira a versão em `filmes/package.json` (0.8.210). Não atualize no meio de uma campanha.

## 3D

- Three.js fixado em 0.170.0.
- `RoomEnvironment` via import map `three`.
- Fundo chapado: `toneMapping = NoToneMapping`; chão `MeshBasicMaterial` + plano de sombra.
- Papel não dobra além de 90°.
- Texto 3D sempre inteiro: nada cortado pela borda, escondido atrás de objeto ou da coluna HTML. Use
  `python ferramentas/checar_texto3d.py` a cada 0,25 s.
- Objeto que sai de cena some antes da câmera sair; não deixe letreiro cortado no canto.

## Carrossel animado

```bash
node ferramentas/animar-carrossel.mjs ../conteudo/<entrega>/carrossel.html
node ferramentas/animar-carrossel.mjs ../conteudo/<entrega>/carrossel.html --render
```

- 1080×1350, 30 fps, mudo por padrão.
- 3 a 5 s por slide conforme o texto.
- Slides deslizam colados; itens entram em sequência.
- `--com-audio` reativa a trilha sintética (reprovada; use só se melhorar).

## Coreografia própria

`coreografias/<entrega>.mjs` define `duracoes`, `revela`, `saida`, `fixos` e uma função por slide. Helpers em
`frentes-comum/planos.js`:

| Helper | Efeito |
|---|---|
| `A.palavras` | palavra por palavra |
| `A.letras` | typewriter |
| `A.surgir` | fade/slide |
| `A.pop` | pop com overshoot |
| `A.revelar` | mask/draw-on |
| `A.contar` | número |
| `A.marcar` | marca-texto |
| `A.mover` | fromTo livre |
| `A.continuo` | lento até o fim |
| `A.onda` | vai e volta |

## Armadilhas

- `.hf-quadro` é o embrulho do slide; `.quadro` colide com o Guia Acadêmico.
- CSS não pode ter `transform` no que o GSAP anima.
- Caminho absoluto quebra a montagem; sempre relativo.
- Fonte do sistema muda o layout entre máquinas; embuta.
- Áudio fora da timeline do vídeo dessincroniza; normalize depois.
