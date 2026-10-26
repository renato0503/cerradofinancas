# Estúdio de conteúdo: Cerrado Finanças & Tech

Posts, carrosséis, stories, vídeos e animações da marca.

**Central de Conteúdos (para o time de marketing):** https://www.cerradofinancas.com.br/marketing/
Só a página (`index.html`) e a pasta `entregas/` são publicadas. As áreas de trabalho
(`posts/`, `videos/`, `tools/`, `brand/`, `animacoes/`, `.claude/`) ficam fora do site pelo
`_config.yml` da raiz. **Ao criar uma pasta nova aqui, acrescente-a no `exclude` do `_config.yml`.**
A página tem `noindex` e não aparece no menu nem no sitemap.

## Estrutura

| Pasta | O que vai nela |
|---|---|
| `brand/` | `tokens.css` (cores e fonte da marca) e `slides.js` (controle de slides para exportação) |
| `posts/AAAA-MM-tema/` | Fontes de uma campanha: `carrossel.html`, `story.html` etc. |
| `entregas/AAAA-MM-tema/` | **Publicado.** Arquivos finais, `legenda-<rede>.txt`, `info.json` e o `.zip` |
| `videos/` | Projetos Remotion (Reels 1080×1920) |
| `animacoes/` | Logos e ícones animados (Lottie, GIF, MP4) |
| `tools/` | `exportar.py` (HTML → PNG em `entregas/`) e `publicar.py` (gera .zip e `conteudos.json`) |
| `.claude/skills/` | Skills usadas pelo Claude dentro desta pasta |

As imagens da marca vêm do site, sem cópia: `../img/folinha-hero.png`, `../img/ls-logo.png` etc.

## Fluxo de uma campanha

1. Crie as peças em `posts/AAAA-MM-tema/`. Cada HTML declara
   `<meta name="entrega" content="AAAA-MM-tema">` e `<meta name="formato" content="1080x1350">`,
   e cada slide é um elemento `class="slide"`. Abra no navegador para revisar (os slides aparecem empilhados).
2. Exporte: `python tools/exportar.py posts/AAAA-MM-tema/carrossel.html posts/AAAA-MM-tema/story.html`
3. Em `entregas/AAAA-MM-tema/`, crie o `info.json` (`titulo`, `data`, `descricao`, `orientacoes`)
   e as legendas `legenda-instagram.txt`, `legenda-linkedin.txt` etc. Vídeos e GIFs finais também vão aqui.
4. Publique: `python tools/publicar.py`, depois commit e push. A página atualiza sozinha.

## Vídeos e folinha animada (`videos/`, Remotion)

```
cd videos
npm install            # primeira vez (node_modules fica fora do git)
npm run sfx            # gera os efeitos sonoros em public/sfx/
npm run studio         # editor visual no navegador
npm run render:reel    # out/reel-4-frentes.mp4
npm run render:intro   # out/folinha-intro.mp4
npm run render:gif     # out/folinha-loop.gif
npm run render:alpha   # out/folinha-loop.webm (fundo transparente)
npm run render:frentes # out/reel-software|contabilidade|credito|cursos.mp4
```

Depois de renderizar, copie os arquivos finais de `videos/out/` para `entregas/<campanha>/` e rode `tools/publicar.py`.
Tema (cores, curvas, molas) em `videos/src/theme.ts`; cenas em `videos/src/scenes/`.
Os Reels por frente são guiados por dados: edite `videos/src/campanhas.ts` (gancho, 3 blocos dos tipos
lista/passos/contraste/numeros e fechamento). Peças estáticas usam os componentes de `brand/carrossel.css`.
A animação Lottie da folinha é gerada por `python animacoes/folinha/gerar_lottie.py`
(grava em `entregas/folinha-animada/`; copie os .json para `videos/public/` se mudar).

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

- **2026-10 · Lançamento das 4 frentes**: carrossel de 7 slides, story, Reel de 21s e legendas para Instagram e LinkedIn.
- **2026-10 · Uma campanha por frente** (Software, Contabilidade, Crédito, Cursos): carrossel de 6 slides, story, Reel de 15s e legendas.
- **2026-10 · Folinha animada**: vinheta MP4, GIF em loop, WebM transparente e Lottie (entrada e loop).
