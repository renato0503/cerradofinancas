---
name: video-storyboard
description: Transforma roteiro em storyboard por plano — tabela com tempo, enquadramento, câmera, texto na tela, áudio e asset, com prova de movimento antes do render. Use quando o pedido for "storyboard", "decupagem", "plano de cenas", "shoot list", "quadro a quadro" ou "como dividir o vídeo".
---

# Storyboard por plano

O storyboard é o contrato entre roteiro e render. Se o plano não pode ser executado com os assets que existem,
ele não entra.

## Formato obrigatório

| # | tempo | plano | câmera | texto | áudio | asset |
|---|---|---|---|---|---|---|
| 1 | 0,0–2,0 | logo no centro | push in 4% | "O software que..." | whoosh + voz | `img/folinha-hero.png` |
| 2 | 2,0–5,0 | tela dividida | slide lateral | 3 bullets | voz | `img/tela-erp.png` |

Campos:

- **tempo**: início e fim em segundos, somando a duração alvo.
- **plano**: o que o olho vê primeiro (objeto, pessoa, tela, texto, gráfico).
- **câmera**: um movimento dominante (`push in`, `pan`, `tilt`, `orbit`, `corte seco`, `cortina`).
- **texto**: no máximo 6 palavras por plano; o resto é locução.
- **áudio**: voz, SFX, silêncio. Música só com motivo.
- **asset**: caminho real no repositório ou "criar em código".

## Regras de decupagem

1. **Um movimento por plano.** Se precisa de dois, são dois planos.
2. **Corte a cada 1,5–3 s** em peça curta; plano de 5 s só se houver evolução interna.
3. **Texto e imagem não competem.** Quando entra texto, a imagem estabiliza.
4. **Troca de cor vale por corte.** Use cortina quando a mudança de bloco é narrativa.
5. **Área segura**: 9:16 com 120 px laterais e 220 px no topo/base; 4:5 com 90 px laterais.
6. **Fecho**: marca + CTA. Sem créditos rolando em Reel.

## Prova de movimento

Antes do render completo, gere 2–3 quadros:

```bash
python .claude/skills/video-estudio/scripts/kit.py quadros previa.mp4 --tempos 0.5,2,4 --saida previa/
```

ou, no HyperFrames:

```bash
npx hyperframes snapshot filme.html --at 1.2 --out previa.png
```

Pergunta de aprovação: **o quadro parado já vende a ideia?** Se não, ajuste composição, contraste ou texto antes
de animar.

## Continuidade

- Mesma família tipográfica e mesma paleta do começo ao fim.
- O logo não muda de posição sem motivo.
- Personagem/objeto 3D mantém escala e ângulo entre planos.
- Se usar IA local para um plano, gere o mesmo enquadramento e a mesma luz nos vizinhos.

## Saída

Salve o storyboard em Markdown na pasta da entrega (`conteudo/<entrega>/storyboard.md`) e use os tempos como
`data-entra` no HyperFrames. O storyboard é a fonte da coreografia, não um anexo.

## Referências

- `references/exemplo.md` — storyboard completo de 30 s no padrão Cerrado.
- `../video-motion/references/receitas.md` — movimento disponível para cada plano.
