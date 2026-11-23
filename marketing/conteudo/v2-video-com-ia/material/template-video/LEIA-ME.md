# Template de vídeo — 15 segundos

Cena 9:16 pronta para trocar o conteúdo. Funciona **offline**, sem instalar nada:
abra `cena.html` no Chrome e ela roda sozinha em loop de 15 segundos.

## 1. Trocar o conteúdo (caminho A)

1. Abra `dados.js` em qualquer editor de texto (até o Bloco de Notas serve).
2. Troque `marca`, `titulo`, `subtitulo`, `problema`, `prova`, `cta`, `cor` e `fundo`.
3. Salve e recarregue `cena.html` no navegador.
4. Use o botão **Reiniciar (15s)** para ver do começo.

Campos:

| Campo | O que é |
|---|---|
| `marca` | Nome no topo |
| `titulo` | Frase da primeira cena |
| `subtitulo` | Apoio da primeira cena |
| `problema` | Frase da segunda cena |
| `prova` | Frase da terceira cena |
| `cta` | Chamada da última cena |
| `cor` | Cor de destaque (hex) |
| `fundo` | Cor de fundo (hex) |
| `duracao` | Segundos (padrão 15) |

## 2. Exportar o vídeo

O template é uma **cena em HTML**. Para virar MP4, escolha um caminho:

- **HyperFrames (recomendado):** abra a pasta no HyperFrames e renderize a composição.
- **Gravação de tela:** abra `cena.html` em tela cheia, grave em 1080×1920 com OBS ou CapCut e recorte.
- **CapCut (caminho só clicar):** monte a mesma cena usando as cores e os textos como guia.

O arquivo final deve sair em **1080×1920, 30 fps, H.264**.

## 3. Trocar a logo

No `cena.html`, dentro de `<div class="topo">`, troque o texto da marca por uma imagem:

```html
<b><img src="logo.png" alt="" style="height:46px"></b>
```

Coloque `logo.png` na mesma pasta.

## 4. O que este template não faz

- Não gera avatar nem voz (isso é no HeyGen).
- Não transforma vídeo real (isso é no Genjutsu).
- Não publica sozinho.

Ele resolve a **cena de texto animada** — a parte que mais trava quem não edita.

## 5. Checklist antes de exportar

- [ ] O gancho aparece no primeiro segundo.
- [ ] A fonte está legível no celular.
- [ ] A cor de destaque tem contraste com o fundo.
- [ ] A chamada final tem uma ação só.
- [ ] O arquivo saiu em 1080×1920.
