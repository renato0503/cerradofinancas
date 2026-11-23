# VÍDEO COM IA — pacote da campanha massificada

Curso de um dia, ao vivo, para 10.000+ pessoas. Identidade própria ("Mesa de edição"), separada
da CerraClass presencial. Tudo que está aqui é derivado do mesmo sistema visual.

## Estrutura

```
v2-video-com-ia/
├── identidade/          # tokens.css, slides.js e o guia da marca
├── campanha/            # peças de feed, story, post e landing + PNGs
└── material/            # apostila, slides, roteiro, kit, checklist e template
```

## O que usar

| Preciso de... | Arquivo |
|---|---|
| Regra visual e tom de voz | `identidade/README.md` |
| Cores, fontes e componentes | `identidade/tokens.css` |
| Carrossel de lançamento (10 slides) | `campanha/carrossel.html` + `carrossel-01..10.png` |
| Stories (4) | `campanha/story.html` + `story-01..04.png` |
| Post único | `campanha/post-unico.html` + `post-unico.png` |
| Página de inscrição | `campanha/pagina-de-vendas.html` |
| Legendas por rede | `campanha/legendas.md` |
| Apostila do participante | `material/apostila.html` + `material/apostila.pdf` |
| Deck do instrutor (16:9) | `material/slides.html` |
| Roteiro de aulas | `material/roteiro-aulas.md` |
| Ferramentas e custos | `material/kit-ferramentas.md` |
| Checklist de produção | `material/checklist-producao.md` |
| Template de cena 15s | `material/template-video/` |
| Briefing de parceiros | `../briefing-parceiros.md` + `../briefing-parceiros.pdf` |

## Exportar as peças

A partir de `marketing/`:

```
python tools/verificar.py conteudo/v2-video-com-ia/campanha/carrossel.html conteudo/v2-video-com-ia/campanha/story.html conteudo/v2-video-com-ia/campanha/post-unico.html
python tools/exportar.py conteudo/v2-video-com-ia/campanha/carrossel.html conteudo/v2-video-com-ia/campanha/story.html conteudo/v2-video-com-ia/campanha/post-unico.html
```

As PNGs também podem ser geradas direto na pasta `campanha/` (foi o que fizemos). O `exportar.py`
grava em `entregas/pecas-video-com-ia-massa/`.

## Gerar os PDFs

```
chrome --headless --no-pdf-header-footer --print-to-pdf=material/apostila.pdf material/apostila.html
chrome --headless --no-pdf-header-footer --print-to-pdf=../briefing-parceiros.pdf ../briefing-parceiros.html
```

## Regras

- Sem preço e sem data nas peças até a decisão final.
- Toda peça de vídeo com rosto gerado por IA leva aviso.
- Não usar logo oficial de ferramenta; usar os chips do sistema.
- Não prometer renda, resultado ou "sem esforço".
- O briefing de parceiros é a fonte da verdade para papéis e prazos.
