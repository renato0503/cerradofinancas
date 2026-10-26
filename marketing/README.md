# Estúdio de conteúdo: Cerrado Finanças & Tech

Posts, carrosséis, stories, vídeos e animações da marca. A pasta é versionada no git,
mas **não é publicada** no site: o `_config.yml` da raiz a exclui do build do GitHub Pages.

## Estrutura

| Pasta | O que vai nela |
|---|---|
| `brand/` | `tokens.css` (cores e fonte da marca) e `slides.js` (controle de slides para exportação) |
| `posts/AAAA-MM-tema/` | Um post ou carrossel por pasta: `carrossel.html`, `legenda.md` e `out/` com os PNGs |
| `stories/` | Peças verticais 1080×1920 para Stories e status do WhatsApp |
| `videos/` | Projetos Remotion (Reels 1080×1920) |
| `animacoes/` | Logos e ícones animados (Lottie, GIF, MP4) |
| `tools/` | `exportar.py`, que transforma HTML em PNG |
| `.claude/skills/` | Skills usadas pelo Claude dentro desta pasta |

As imagens da marca vêm do site, sem cópia: `../img/folinha-hero.png`, `../img/ls-logo.png` etc.

## Exportar peças para PNG

```
python tools/exportar.py posts/2026-10-lancamento-4-frentes/carrossel.html
python tools/exportar.py stories/2026-10-lancamento-4-frentes.html
```

Cada peça declara o tamanho em `<meta name="formato" content="1080x1350">`, e cada slide é um
elemento `class="slide"`. Para revisar, abra o HTML no navegador: todos os slides aparecem empilhados.

Formatos usados:
- Feed (Instagram/LinkedIn): **1080×1350**
- Stories / status / Reels: **1080×1920**, com cerca de 250px livres no topo e na base

## Skills instaladas (`.claude/skills/`)

| Skill | Para quê |
|---|---|
| `remotion-motion-graphics` | Vídeos e Reels em código (Remotion) |
| `text-to-lottie` | Animações Lottie (logo, ícones, loaders) |
| `wiggle` | Logo estático → animação GIF/MP4 |
| `gsap-*` | Animações web com GSAP |
| `animate`, `emil-design-eng`, `review-animations` etc. | Critério de motion design (curvas, tempos, revisão) |
| `threejs-*` | Cenas 3D (uso pontual) |
| `lemo-opuscar` | Curtas cinematográficos em código (pesado: baixa uma biblioteca na primeira execução) |

Origem: zips em `D:\Dev\*-main.zip`, com as licenças de cada skill dentro da própria pasta.

## Peças prontas

- **2026-10 · Lançamento das 4 frentes**: carrossel de 7 slides (`posts/2026-10-lancamento-4-frentes/`), story (`stories/`) e legendas para Instagram e LinkedIn.
