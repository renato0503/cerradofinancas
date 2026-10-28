# Identidade Crédito: "Antes de assinar"

Vale para as peças do Crédito (correspondente bancário multi bancos da Cerrado Finanças, em parceria com
a LS Intermediação Financeira). O resto da Cerrado Finanças e da Cerrado Tech segue a identidade do site.

## A ideia

Crédito é o momento antes de assinar um contrato. A identidade é o papel e a caneta desse momento:

- **o comparativo de propostas** (`.comparativo`): linhas de bancos com a barra do custo total; a melhor
  opção é grifada. **Sem números**: nunca inventar taxa, parcela ou quantidade de bancos;
- **a linha de assinatura** (`.assinatura`): o "X", o traço e a rubrica manuscrita "Você decide";
- **o marca-texto** (`.grifo`): só na palavra que importa ("compare", "gratuita") ou na melhor proposta;
- **a letra miúda** (`.letra-miuda`): o aviso legal como cláusula de contrato, legível, em toda peça.

## Cores

| Papel | Cor | Uso |
|---|---|---|
| Branco-papel | `#fbfbf8` | fundo padrão |
| Azul-caneta | `#1f3ae0` | destaque, rubrica, slide invertido (`.slide.caneta`), botões |
| Marca-texto | `#e6ff3d` | só o grifo e o botão principal |
| Tinta | `#111522` | texto |

## Tipografia

**Schibsted Grotesk** 900 (títulos, -3,5% de tracking, caixa normal) e 500-800 no texto.
**Caveat** só na rubrica da assinatura. Arquivos em `brand/fontes/`.

## Marca

A marca é a **folinha da Cerrado Finanças** (rodapé e fecho dos vídeos). A **LS é parceira**: aparece
só em "Em parceria com" (com o logo dela, como parceira) e no aviso legal; nunca como a nossa logo.

## Aviso legal (obrigatório)

"Cerrado Finanças, em parceria com a LS Intermediação Financeira, atua como correspondente bancário e
não é instituição financeira. Crédito sujeito a análise e aprovação. Taxas e condições variam conforme o
perfil e a instituição." No story e no vídeo pode ir a versão curta.

## Série produto a produto

`tools/gerar_credito.py` gera as 11 campanhas de produto e as 4 da série "Antes de assinar, entenda". A fonte é o
portfólio da LS (`PortfolioParceriaLS/`). Recursos novos:
- `.pauta.compacta`, para listas de 4 itens;
- `.fecho`, a frase no pé do slide;
- as cláusulas com "§ 1" a "§ 3" no slide azul.

Seguro e consórcio têm aviso legal próprio. Nunca usar nome ou logo de banco.

## Vídeo

`filmes/credito-comercial` (15s, 16:9 e 9:16): a proposta de crédito em 3D, com o comparativo e a assinatura.
