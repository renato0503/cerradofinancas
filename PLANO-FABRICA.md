# Plano de implementação: nova /fabrica (Cerrado Tech)

Criado em 26/11/2026. Documento interno (no `exclude` do `_config.yml`), não é publicado.

## Objetivo

Página **totalmente nova** em `cerradofinancas.com.br/fabrica`. Ela deve impressionar com 3D, animação e transições,
**sem deixar de ser funcional** e abrindo bem no PC e no celular. O 3D usa a mesma tecnologia dos filmes HyperFrames
(Three.js + GSAP + linha do tempo), só que comandado pela **rolagem e pelo toque**, e não pelo relógio do vídeo.

## Regras do Renato (não negociáveis)

- **Objetos 3D originais e reais**, modelados do zero (sem modelo baixado), nada abstrato e "sem sentido".
- Cada objeto representa um serviço e **fica no lugar dele** dentro de um escritório real, nada solto nem aleatório.
- Telas dos objetos com **sistemas de verdade feitos pela fábrica** (CerraFood como white label, sem citar cliente).
- Texto escrito no 3D **sempre inteiro e legível** (regra dos filmes). O texto importante fica em HTML.
- Marca é a **folinha**, grande. Só "Renato Rosa", com foto pequena.
- Sem som. Só ferramentas grátis ou locais.
- O hero 3D do portfólio foi reprovado em 31/10. Por isso **nada vai para o ar sem aprovação em cada portão**.

## O que entra

| # | Item | Fase |
|---|---|---|
| 1 | Telas com os nossos produtos reais | F1–F3 |
| 2 | "Monte o seu sistema": escolhe módulos, a tela se monta e o WhatsApp abre com a lista | F3 |
| 3 | Um escritório só, com a câmera andando entre os objetos pela rolagem | F2 |
| 4 | Tocar ou clicar no objeto abre o serviço; girar com o dedo | F3 |
| 5 | Objetos viram acervo do marketing (filmes, chamadas, folders) | F5 |
| 6 | Medição (cliques, rolagem) e imagem de compartilhamento | F3 (imagem) / F6 (medição) |
| 7 | Teste com pessoas de fora em celulares delas | F4 |

## Os objetos (um por serviço)

| Serviço (página) | Objeto | Animação | Tela mostra |
|---|---|---|---|
| Abertura | Notebook aberto na mesa | Tampa abre, a tela se monta módulo a módulo | ERP: financeiro, estoque, fiscal |
| ERP (`erp-customizado.html`) | Prateleira de estoque com caixas etiquetadas + impressora de NF | Caixa sai, o estoque baixa, a NF é impressa | Tela de estoque |
| CRM (`crm-inteligente.html`) | Celular | Mensagem chega, vira card e anda no funil | Conversa + funil |
| IA offline (`ia-offline.html`) | Servidor em rack, cabo de internet desconectado à vista | LEDs piscam, entra o contrato, sai o resumo | Cerra.AI respondendo com a página da fonte |
| E-commerce (`ecommerce.html`) | Maquininha de cartão, caixa de envio, sacola | Pagamento aprovado, etiqueta impressa e colada | Comanda/pedido (CerraFood white label) |
| Compliance (`compliance.html`) | Pasta-arquivo, documentos, carimbo, lupa | A lupa passa e o carimbo "CONFORME" desce | — |
| Dashboards (`dashboards.html`) | Monitor + tablet | Gráficos crescem; o mesmo painel aparece no tablet | DRE, EBITDA, metas (painel Gov) |
| Cyber (`cyberseguranca.html`) | Notebook com terminal + cadeado físico no cabo de rede | Relatório CWE/OWASP aparece e o cadeado fecha | Terminal |
| Integrações | Switch de rede com cabos RJ45 (SAP, TOTVS, Bling, Power BI, banco) | Cabo encaixa, o LED acende | — |
| Como trabalhamos | Prancheta com rascunho a lápis | O rascunho vira a tela real em 4 passos | Wireframe → sistema |

Escritório: mesa (notebook, celular, prancheta, maquininha), estante (estoque, pasta-arquivo), canto técnico
(rack, switch) e parede (monitor). Luz de estúdio, sombra real, cores da Tech (azul `#001f5c`, dourado `#fecb00`,
verde da folinha).

## Arquitetura técnica

- **Onde:** worktree novo `D:\Dev\cerradofinancas-fabrica`, branch `fabrica-nova`. O `main` e o site no ar ficam
  intocados até a F5.
- **Página:** `fabrica.html` nova, **HTML estático** com cabeçalho e rodapé próprios (folinha). Sem includes Liquid,
  então dá para ver localmente com um servidor simples, sem Jekyll.
- **Arquivos:** `assets/fabrica/`
  - `vendor/`: `three.module.min.js` (r170, o mesmo dos filmes), `gsap.min.js` + `ScrollTrigger.min.js`, tudo hospedado no próprio site.
  - `palco.js`: um único canvas fixo, renderer, luzes, sombras, níveis de qualidade, pausa quando não visível.
  - `objetos/*.js`: um arquivo por objeto, **função pura do tempo/progresso** (`desenhar(p)`), igual aos filmes.
    É essa mesma biblioteca que vai para o acervo do marketing.
  - `telas/`: interfaces desenhadas em canvas (nítidas e leves) a partir das telas reais dos produtos.
  - `roteiro.json`: batidas da câmera por seção (progresso 0–1), o equivalente ao `timeline.json` dos filmes.
  - `pagina.js`: rolagem (ScrollTrigger), "Monte o seu sistema", clique e toque nos objetos, transições.
- **Rolagem:** rolagem nativa (sem sequestrar o scroll), animações presas à rolagem por *scrub*. Só a seção dos
  serviços fica presa à tela, por no máximo ~250vh no PC. O celular tem enquadramento vertical próprio (como as versões
  9:16 dos filmes).
- **Níveis de qualidade** (decididos ao abrir e corrigidos pelo FPS dos primeiros 2 s):
  1. **Completo** (PC com boa GPU): todos os objetos, sombras reais, pixel ratio até 1,5.
  2. **Leve** (celular, GPU fraca): menos detalhe, sombra pintada, pixel ratio até 1,25, só os objetos da seção atual.
  3. **Estático** (sem WebGL ou "reduzir movimento"): imagens tiradas da própria cena, sem animação.
     A página continua 100% usável.
- **Transições:** wipe, stagger, draw-on e contadores (dicionário de motion). View Transitions API entre a /fabrica e as
  páginas de serviço, e em navegador sem suporte a troca é a normal.
- **Funcional:** todo o conteúdo em HTML (SEO e leitor de tela), os 7 links de serviço, o formulário atual
  (FormSubmit) e o WhatsApp (67) 99351-5206. O "Monte o seu sistema" usa caixas de seleção acessíveis: a escolha
  monta a tela do notebook e gera o link do WhatsApp com a lista e preenche o formulário.
- **Orçamento de peso:** página inteira abaixo de 1,5 MB no celular (bibliotecas ~300 KB comprimidas, telas em WebP
  < 100 KB cada). Nenhum vídeo MP4 (o GitHub Pages está perto de 1 GB).

## Fases e portões de aprovação

### F0 · Base técnica
- Worktree, bibliotecas no próprio site, `palco.js` com luz de estúdio e os três níveis.
- **Mostruário local** (`mostruario.html`, não publicado): cada objeto girando sozinho, e uma ferramenta Playwright que
  gera prancha PNG e vídeo de giro.
- Checador de texto 3D adaptado do `checar_texto3d.py`.

### F1 · Mostruário dos objetos → **PORTÃO 1**
- Modelar os 10 objetos e as telas com os sistemas reais.
- Entrega para o Renato: prancha com todos + vídeo curto de cada um girando (GPU NVIDIA).
- **Renato aprova, corta ou pede ajuste objeto por objeto.** Nada de página antes disso.

### F2 · Escritório + protótipo → **PORTÃO 2**
- Montar o escritório com os objetos aprovados e escrever o `roteiro.json` da câmera.
- Funcionando: abertura (notebook) + seção dos serviços, no PC (1440×900) e no celular (390×844).
- Entrega: link local + vídeo de tela dos dois formatos.
- **Renato aprova o conceito em movimento.** Se reprovar, volta à F2 sem ter gasto a página inteira.

### F3 · Página completa
- Todas as seções:
  1. Abertura.
  2. Serviços.
  3. Integrações.
  4. Cyber.
  5. Como trabalhamos.
  6. Prateleira × Sob medida (comparador arrastável).
  7. Consultorias.
  8. Quem somos e stack.
  9. Contato.
- "Monte o seu sistema", clicar ou tocar e girar com o dedo, View Transitions.
- SEO: título, descrição, dados estruturados (schema.org `Service`), imagem de compartilhamento gerada do 3D.

### F4 · Verificação → **PORTÃO 3**
- Navegadores: Chrome, Edge, Firefox e WebKit (Safari), no PC e no celular simulado.
- **Lighthouse no celular:** Desempenho ≥ 85, LCP < 2,5 s, CLS < 0,05, Acessibilidade ≥ 95.
- GPU NVIDIA e Intel, CPU 4× mais lenta, "reduzir movimento", sem WebGL.
- Formulário, WhatsApp e todos os links testados. Peso da página conferido.
- **Teste com o Felipe + 1–2 pessoas** nos celulares delas (pelo menos um aparelho simples). O que travar ou confundir
  é corrigido.
- **Renato aprova a versão final.**

### F5 · Publicação
- Commit só dos arquivos da página, `fabrica.html` trocada (a antiga fica no histórico do git), sitemap atualizado.
- Registros: `context.md`, `PROXIMOS_PASSOS.md`, `marketing/HISTORICO.md`.
- Acervo: biblioteca `objetos/` documentada para os filmes e as peças do marketing usarem.

### F6 · Depois do ar (opcional)
- Medição: cliques em "Solicitar proposta" e WhatsApp, profundidade de rolagem, comparação com a página antiga.

## Riscos e como evitar

| Risco | Prevenção |
|---|---|
| Conceito reprovado depois de muito trabalho (como o hero do portfólio) | Portões 1 e 2 antes da página inteira |
| Celular travar ou esquentar | Nível leve, renderiza só quando algo muda, pausa fora da tela, FPS medido |
| iPhone/Safari sem memória para WebGL | Texturas pequenas, um canvas só, nível estático como garantia |
| Texto 3D ilegível no celular | Texto importante em HTML; checador de texto 3D |
| Google não ler o conteúdo | Todo texto em HTML, o 3D é só camada visual |
| Estourar o 1 GB do GitHub Pages | Sem vídeo; orçamento de 1,5 MB |
| Outra IA mexendo no repositório | Worktree próprio; commit só dos meus arquivos |

## Decisões pendentes

1. **Quais sistemas podem aparecer nas telas.** Proposta: CerraFood (white label), Cerra.AI e painel Gov. Confirmar no
   Portão 1.
2. Os textos atuais serão encurtados. Reescrita maior só se o Renato pedir.
