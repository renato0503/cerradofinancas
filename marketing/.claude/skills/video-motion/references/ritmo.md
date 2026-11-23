# Ritmo, easing e sincronia

## Tabela de decisão

| O que entra | Efeito padrão | Alternativa | Evitar |
|---|---|---|---|
| Logo | fade + scale 0,96→1 em 0,6 s | mask reveal | girar 360° |
| Título | word reveal, 0,45 s | typewriter | bounce |
| Subtítulo | fade + y 16 px, 0,35 s | blur in | letra por letra |
| Lista | stagger 0,08 s | bar grow | todos juntos |
| Número | count-up 0,8 s | punch zoom | count-up infinito |
| Produto/tela | push in 4% em 6 s | parallax | zoom 2× |
| Prova/dado | destaque percorrendo | stamp | piscar |
| Fecho/CTA | pop + hold 1 s | cortina | fade lento |

## Easing

- `power1.out` — microinteração discreta.
- `power2.out` — padrão de interface.
- `power3.out` — entrada de texto e blocos.
- `expo.out` — entrada cinematográfica, rápida e freando.
- `back.out(1.4–1.8)` — selo, sticker, CTA. Nunca em marca séria.
- `sine.inOut` — loop e ambiente.
- `power3.inOut` — troca de cena.

## Stagger

```
itens: 6 → 0,06 s (ritmo vivo)
itens: 6 → 0,10 s (institucional)
palavras: 8 → 0,05 s (energia)
letras: 20 → 0,02 s ou cps 26–34
```

Regra: o último item entra antes de 60% da duração do plano.

## Batida

Se houver música com BPM conhecido:

```
batida = 60 / BPM
corte a cada 2 ou 4 batidas
impacto no downbeat
```

Sem música, marque o ritmo pela fala: corte no fim da frase, não no meio da palavra.

## Segurar

- Entrada + leitura + respiro. Um título de 4 palavras precisa de ~1,2 s parado.
- Antes de corte, 6 a 12 frames de estabilidade.
- No fecho, 1 s com marca e CTA legíveis.

## Movimento contínuo

Use no máximo 3% de deslocamento por segundo em fundo. Rotação contínua: 6–12° no plano inteiro. Partículas:
poucas, pequenas, fora do texto.

## Acessibilidade e export

- Em página web, respeite `prefers-reduced-motion`.
- Em vídeo, não use flash acima de 3 Hz.
- Contraste do texto sobre movimento: fundo estável ou faixa sólida atrás.
