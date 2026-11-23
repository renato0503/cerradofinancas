---
name: video-motion
description: Escolhe, descreve e implementa movimento para vídeo — vocabulário de efeitos, receitas GSAP, duração, easing, stagger, sincronia com batida e transições. Use quando o pedido for "animar", "movimento", "transição", "coreografia", "timing", "easing", "pop in", "typewriter", "punch zoom" ou "deixar mais vivo".
---

# Movimento

Movimento é hierarquia: diz onde olhar e o que mudou. Se tudo se move, nada se destaca.

## Vocabulário

| Família | Efeitos |
|---|---|
| Entrada suave | fade in, slide in, blur in, scale in, mask reveal |
| Entrada com impacto | pop in, punch zoom, stamp, flash, overshoot |
| Texto | typewriter, word reveal, line reveal, text swap, kinetic type |
| Forma | draw-on, morph, bar grow, line grow, wipe, cortina |
| Câmera | push in, pull back, pan, tilt, orbit, parallax, whip pan, shake |
| Troca | corte seco, match cut, wipe, mask, cortina, punch zoom, slide |
| Dados | count-up, gráfico que cresce, destaque que percorre |
| Ambiente | partículas, poeira, grão, luz que varre, reflexo |

## Como escolher

1. **Uma intenção por cena**: revelar, comparar, provar, fechar.
2. **Um movimento dominante por plano**. O resto é apoio discreto.
3. **Entrada rápida, saída mais rápida ainda**: quem sai não rouba atenção.
4. **Stagger** para listas: 0,06–0,12 s entre itens.
5. **Segure o quadro final** 0,6–1,2 s antes do corte; o olho precisa registrar.
6. **Movimento contínuo** só em fundo/3D, com amplitude pequena.
7. **A câmera nunca para** em cena 3D: sempre um push in, pan ou órbita sutil. Câmera parada = slide show. Todo
   objeto com **sombra de contato** no chão; a luz/cor pode mudar por cena para marcar a troca de assunto (LABS).
8. **Texto na palavra falada**: com a locução medida por palavra, cada palavra entra no quadro em que é dita
   (`data-tempos` no institucional v3, `filmes/frente-escritorio/fonte/cena.html`).

## Tempo e easing

| Sensação | Duração | Easing |
|---|---|---|
| clique/resposta | 0,12–0,22 s | power2.out |
| entrada de texto | 0,35–0,55 s | power3.out |
| entrada de bloco | 0,55–0,8 s | expo.out |
| transição de cena | 0,5–0,8 s | power3.inOut |
| ambiente/loop | 4–12 s | sine.inOut |
| impacto | 0,2–0,35 s | back.out(1.6) |

Nunca use `linear` em entrada ou saída; `linear` só em rotação/scroll contínuo.

## Implementação

No HyperFrames, a coreografia usa os helpers de `filmes/frentes-comum/planos.js`:

```js
A.palavras(".titulo", 0.1, { y: 40, stagger: 0.08, ease: "expo.out" });
A.letras(".rotulo", 0.4, { cps: 28 });
A.pop(".selo", 1.2, { de: 0.6, rot: -6 });
A.revelar(".foto", 1.6, { dir: "esq" });
A.contar(".numero", 2.0, 128);
A.continuo(".objeto", 0, { rotate: 12, scale: 1.04 });
```

Fora do HyperFrames, use GSAP puro com `gsap.timeline({ paused: true })` e `timeline.time(t)` para render
determinístico. Nada de `Date.now()`.

## Anti-padrões

- Fade em tudo: o vídeo fica sem relevo.
- Texto que entra e sai antes de ser lido.
- Mais de dois movimentos simultâneos no mesmo elemento.
- Bounce em marca institucional.
- Zoom infinito sem motivo.
- Transição diferente a cada corte (vira demo de plugin).
- Animar `transform` em elemento que o CSS já posiciona (quebra no HyperFrames).

## Referências

- `references/receitas.md` — 30 receitas com duração, easing e código.
- `references/ritmo.md` — tabela de decisão, stagger e sincronia com batida.
- `../video-render/SKILL.md` — como renderizar sem perder determinismo.
