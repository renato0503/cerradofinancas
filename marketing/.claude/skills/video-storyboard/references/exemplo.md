# Exemplo — 30 s, CerraFood, 9:16

Objetivo: mostrar o fluxo do pedido. Sem locução; texto + SFX.

| # | tempo | plano | câmera | texto | áudio | asset |
|---|---|---|---|---|---|---|
| 1 | 0,0–2,2 | comanda saindo da impressora | push in 4% | "O pedido chegou." | som de impressora | 3D `impressora` |
| 2 | 2,2–4,8 | comanda na cozinha | tilt down | "A cozinha viu." | whoosh | 3D `comanda` |
| 3 | 4,8–8,0 | tela do caixa | slide lateral | "O caixa registrou." | click | captura `caixa.png` |
| 4 | 8,0–12,0 | ficha técnica | mask reveal | "Sem perder a receita." | pop | captura `ficha.png` |
| 5 | 12,0–16,5 | estoque caindo | barra descendo | "O estoque baixou." | click | gráfico em código |
| 6 | 16,5–21,0 | entrega no mapa | pan | "A entrega saiu." | whoosh | mapa em código |
| 7 | 21,0–25,5 | cliente e fidelidade | pop | "E o cliente voltou." | pop | 3D `selo` |
| 8 | 25,5–30,0 | logo + CTA | cortina | "Sua marca. Nossa plataforma." | impacto | logo |

## Decisões

- Um movimento por plano.
- Troca de cor entre blocos (cozinha, caixa, entrega) com cortina.
- Texto de 3–5 palavras.
- Nenhuma locução: o som é funcional (impressora, click, whoosh).
- Fecho com marca e CTA, 1 s parado.

## Correspondência no HyperFrames

```js
A.surgir(".comanda", 0.1, { y: 30 });
A.revelar(".ficha", 0.2, { dir: "esq" });
A.contar(".estoque", 0.3, 12);
A.pop(".selo", 0.1, { de: 0.5 });
```

## O que não fazer

- Mostrar os oito módulos ao mesmo tempo.
- Texto técnico ("white label", "API") sem tradução.
- Música épica em vídeo de operação.
- Plano de 6 s sem evolução.
