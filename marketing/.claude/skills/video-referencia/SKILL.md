---
name: video-referencia
description: Desmonta um vídeo de referência em planos, ritmo, paleta, tipografia, áudio e intenção; classifica o que é filmado, gerado por IA ou feito em código e escreve um VIDEO.md com o plano de recriação original. Use quando o pedido for "analisar referência", "por que esse Reel funciona", "copiar o estilo", "decompor vídeo", "fazer igual a este", "reverse video" ou "VIDEO.md".
---

# Referência

O objetivo não é copiar o vídeo; é entender **por que ele funciona** e refazer com identidade própria.

## Limite

- Pode: estudar ritmo, estrutura, enquadramento, paleta, tipografia, tipo de transição.
- Não pode: reusar trecho, áudio, rosto, voz ou roteiro protegido; nem recriar peça de concorrente como se fosse
  original.
- Se a referência for de pessoa real, não clone rosto nem voz.

## Passo a passo

1. **Baixar/localizar** o arquivo. Trabalhe offline.
2. **Metadados**:
   ```bash
   python .claude/skills/video-estudio/scripts/kit.py sondar ref.mp4
   ```
3. **Mapa visual**:
   ```bash
   python .claude/skills/video-estudio/scripts/kit.py contato ref.mp4 --saida ref-contato.jpg --cada 1 --linhas 4 --colunas 5
   python .claude/skills/video-estudio/scripts/kit.py analisar ref.mp4 --saida ref-analise.json
   ```
4. **Fala**: `kit.py legendar ref.mp4 --saida ref --modelo small`. Vídeo do YouTube: confira se a faixa baixada não é
   a **dublagem automática** (idioma diferente do original); se for, baixe a faixa original.
   - Não peça "analise o estilo" com o vídeo inteiro: o modelo amostra poucos quadros e perde movimento lento. Use
     **≥ 1 quadro por segundo** no contato e **todos os quadros** de 1–2 s nas cenas-chave (`kit.py quadros`).
   - Descreva em **números** (início/fim e escala de cada zoom, cortes, brilho/contraste/saturação, temperatura de
     cor por cena, palavras por segundo), não em adjetivos. Ver `video-estudio/references/aprendizados.md` §3.
5. **Planos**: use `cortes_cena` do JSON; se faltar, reduza o limiar para 0.25 e confira no contato.
6. **Classificar cada plano** com evidência: filmado (grão, óptica, movimento de mão), IA (artefato, morfing,
   texto torto), código (tipografia perfeita, geometria, movimento de timeline), motion (2D/3D).
7. **Medir ritmo**: duração média de plano, cortes nos primeiros 3 s, tempo até a promessa, tempo até o CTA.
8. **Extrair gramática**: 3 a 5 cores dominantes, 2 tipografias, tipo de transição, uso de som.
9. **Escrever `VIDEO.md`** com o formato de `references/video-md.md`.
10. **Recriar** com `video-roteiro` + `video-storyboard` + `video-motion`, citando o que foi mantido e o que mudou.

## O que medir

| Métrica | Como | Leitura |
|---|---|---|
| Gancho | fala/ação nos 1,5 s | segura sem contexto? |
| Plano médio | duração / nº de planos | <1,5 s = energia; >3 s = respiro |
| Cortes/10 s | contagem | 6–10 é típico em Reel |
| Provas | tela, dado, demo | quantas antes do CTA |
| CTA | segundo em que aparece | antes do fim? |
| Cor | 3 dominantes | marca ou genérico? |
| Texto | palavras por plano | >6 = difícil no celular |
| Áudio | voz/SFX/música | o que carrega a informação |

## Saída

`conteudo/<entrega>/VIDEO.md` com: ficha técnica, mapa de planos, ritmo, gramática visual, áudio, o que copiar (princípio)
e o que NÃO copiar (conteúdo), e o plano de recriação.

## Referências

- `references/video-md.md` — esquema e exemplo preenchido.
