# Legendas — Vídeo com IA (campanha massificada)

Peças: `carrossel.html` (10 slides), `story.html` (4), `post-unico.html`, `pagina-de-vendas.html`.
Sem preço e sem data. CTA sempre para WhatsApp e `cerraclass.com.br/video-ia`.

## Instagram

Seu primeiro vídeo com IA em um dia.

Roteiro, apresentador virtual, vídeo por código, cenas realistas e corte. Sem estúdio, sem equipe e sem saber programar.

É para quem nunca editou e para quem já produz conteúdo e quer escalar. Cada módulo tem três caminhos: só clicar, modelo pronto e com código. Você escolhe até onde ir.

Você sai com:
- um Reel de 15s renderizado;
- uma cena realista a partir do seu celular;
- um vídeo com apresentador virtual;
- biblioteca de prompts, template e checklist de direitos.

Ao vivo, com replay por 7 dias.

Vagas e datas no link da bio ou no WhatsApp (67) 99351-5206.

#VídeoComIA #InteligênciaArtificial #MarketingDigital #CriaçãoDeConteúdo #CerraClass #Cuiabá

## LinkedIn

Produzir vídeo ainda é caro, lento ou amador na maioria das empresas. A IA mudou isso — mas quase ninguém ensina o processo completo.

Na maratona **Vídeo com IA**, um dia de produção real:

- roteiro e gancho com assistentes de IA;
- apresentador virtual, voz e legendas no HeyGen;
- vídeo por código com HyperFrames e Remotion, inclusive em lote;
- realismo com Higgsfield Genjutsu (motion transfer e object swap);
- corte final, direitos de imagem e LGPD.

Cada módulo tem o caminho “só clicar”, o “modelo pronto” e o “com código”. Serve para quem nunca editou e para times de marketing que precisam escalar.

A pessoa sai com um Reel renderizado, uma cena realista feita a partir do próprio celular e um kit para repetir a produção.

Ao vivo, com replay por 7 dias.

Informações: https://cerraclass.com.br/video-ia ou WhatsApp (67) 99351-5206.

#VídeoComIA #IA #MarketingDigital #ComunicaçãoCorporativa #CerraClass

## Facebook

Seu próximo vídeo não precisa de estúdio. Em um dia você aprende a criar vídeos realistas e corporativos com IA: roteiro, apresentador virtual, cenas e corte final.

Ao vivo, com replay por 7 dias, sem precisar saber programar. Vagas pelo WhatsApp: https://api.whatsapp.com/send?phone=5567993515206

Mais em https://cerraclass.com.br/video-ia

## YouTube (descrição)

Nesta maratona você aprende o processo completo de um vídeo com IA: roteiro, avatar, voz, legenda, vídeo por código e realismo com Genjutsu. Sem estúdio, sem equipe e sem programar.

Capítulos:
00:00 Abertura e combinados
08:00 O mapa do vídeo com IA
25:00 Roteiro em 15 minutos
55:00 Apresentador, voz e legendas
02:00:00 Vídeo por código com modelo pronto
03:15:00 Realismo com Genjutsu
04:15:00 Corte final e publicação
05:30:00 Projeto final

Material e kit: https://cerraclass.com.br/video-ia
WhatsApp: (67) 99351-5206

## Stories (sequência)

1. “Seu primeiro vídeo com IA em um dia.” + toque no link.
2. “4 blocos: roteiro, avatar, código e realismo.”
3. “As ferramentas: ChatGPT, HeyGen, HyperFrames, Remotion, Genjutsu.”
4. “Ao vivo, replay 7 dias. Garanta seu lugar.”

## Roteiro de Reel (20s) — para parceiros

| Tempo | Imagem | Texto na tela | Narração |
|---|---|---|---|
| 0–3s | Mão segurando celular; corte para cena gerada | “Seu vídeo não precisa de estúdio.” | “Seu próximo vídeo não precisa de estúdio.” |
| 3–7s | Tela de prompt com roteiro | “Roteiro em 15 min” | “A IA escreve o roteiro com você.” |
| 7–12s | Avatar falando + legenda | “Avatar e voz” | “Um apresentador virtual, sem gravar nada.” |
| 12–16s | Timeline com clipes | “Vídeo por código” | “Um template gera o Reel. Até em lote.” |
| 16–20s | Antes/depois do Genjutsu | “Celular vira cinema” | “E o seu vídeo de celular vira cena de cinema.” |
| Fecho | Logo Vídeo com IA + CTA | “Ao vivo · 1 dia · replay 7 dias” | “Garanta seu lugar.” |

## Como exportar

A partir de `marketing/`:

```
python tools/verificar.py conteudo/v2-video-com-ia/campanha/carrossel.html conteudo/v2-video-com-ia/campanha/story.html conteudo/v2-video-com-ia/campanha/post-unico.html
python tools/exportar.py conteudo/v2-video-com-ia/campanha/carrossel.html conteudo/v2-video-com-ia/campanha/story.html conteudo/v2-video-com-ia/campanha/post-unico.html
```

`exportar.py` grava em `entregas/pecas-video-com-ia-massa/`. As PNGs também podem ser geradas direto na pasta `campanha/` (foi o que fizemos na v1).
