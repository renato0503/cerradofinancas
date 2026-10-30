# Cerrado Finanças & Tech — Contexto Completo da Plataforma

## Visão Geral

Site institucional da **Cerrado Finanças e Gestão Empresarial LTDA**, empresa de tecnologia e consultoria financeira sediada em Cuiabá/MT. A plataforma atua em duas frentes:

- **Cerrado Tech** — Fábrica de Software: ERPs, CRMs, IA offline, e-commerce, compliance, dashboards 100% customizados
- **Cerrado Finanças** — Consultoria contábil, BPO financeiro, controladoria, BI e planejamento tributário

Site estático hospedado no **GitHub Pages** com domínio `www.cerradofinancas.com.br`. Fundador/CEO: **Renato de Oliveira Rosa**.

---

## Estrutura Técnica

### Stack do portal
- **HTML5** com **Jekyll/Liquid** (front matter `--- ---`, `{% raw %}{% include %}{% endraw %}`, `{% raw %}{{ relative_url }}{% endraw %}`)
- **CSS3** vanilla com variáveis CSS, glassmorphism, dark mode
- **JavaScript** vanilla (Intersection Observer, menu mobile, FAQ accordion)
- **Google Fonts** — 'Inter' (principal), 'Outfit', 'Poppins', 'Plus Jakarta Sans' (páginas específicas)
- **Phosphor Icons** — A maioria das páginas usa `<i class="ph ph-...">`. CDN: `https://unpkg.com/@phosphor-icons/web`. Efeito 3D com `drop-shadow` CSS nos ícones. Exceção: o `/portfolio/` usa um sprite SVG inline próprio.
- **`_config.yml`** — Só tem a lista `exclude` (ao defini-la, a lista padrão do Jekyll deixa de valer, por isso ela é repetida). Exclui as áreas de trabalho de `marketing/` e os arquivos de documentação (`*.md` da raiz), que antes eram publicados (o `context.md` aparecia em `/context.html`).

### Identidade visual e ícones
- **Logo / folinha:** `img/folinha.png` (1440×1440, limpo: sem halo branco, contorno suavizado) e `img/folinha-hero.png` (recorte sem margem, usado no hero da home e no card de parceria do Crédito).
- **Favicons** gerados da folinha: `favicon.ico` (16/32/48, na raiz), `img/favicon-32.png`, `img/favicon-192.png`, `img/favicon-512.png`, `apple-touch-icon.png` (180, fundo azul) e `site.webmanifest`. Todas as páginas usam o mesmo bloco de 5 tags `<link>`, exceto ChamaLá e GoGym (marcas próprias).
- **LS Intermediação Financeira:** `img/ls-logo.png` (parceira da frente de Crédito).

### Arquivos compartilhados

| Arquivo | Função |
|---------|--------|
| `_includes/header.html` | Header fixo glassmorphism com logo, nav (Início, Fábrica de Software, Contabilidade, Crédito, Cursos) e CTA WhatsApp. CSS inline próprio. |
| `_includes/footer.html` | Footer dark slate com 5 colunas: marca, Nossas Frentes, Ecossistema (Catálogo, Startups, Parceiros, Data Driven), Fale Conosco e CTAs. CSS inline próprio. |
| `css/global.css` | Variáveis CSS (:root), reset, container, seções, botões, tags |
| `css/home.css` | Apenas animações fade-up (.fade-up, .visible, .delay-1 a .delay-3) |
| `css/menu.css` | Estilo alternativo de header (não usado pelos includes principais) |
| `css/footer.css` | Estilo alternativo de footer (não usado pelos includes principais) |
| `css/startups.css` | Estilos da página de startups |
| `css/parceiros.css` | Estilos da página de parceiros |
| `js/main.js` | Menu mobile, animações fade-up (IntersectionObserver), FAQ accordion |

### Paleta de cores
- **Primário**: `#001f5c` (azul escuro) / `#00458b` (contabilidade)
- **Destaque**: `#fecb00` (dourado/amarelo)
- **Verde**: `#006430` / `#3a853d`
- **Bordas**: `#e2e8f0`
- **Texto muted**: `#64748b`

### Vídeos
- `video/video.mp4` — Hero da home (Cerrado Tech)
- `video/cerradotech.mp4` — Hero da página startups
- `video/timelapse.mp4` — Hero da contabilidade

---

## Páginas Principais

### Reposicionamento (out/2026): home vira hub de 4 frentes

- `index.html` — Hub "Cerrado Finanças & Tech": hero, 4 frentes (Fábrica de Software → `fabrica.html`, Contabilidade → `contabilidade.html`, Crédito → `/credito/`, Cursos → `/cursos/`), CTA Consultorias, Ecossistema (Startups, Parceiros, Data Driven), Quem Somos e formulário com seleção de frente.
- `fabrica.html` — A antiga home de software, intacta (estrutura descrita abaixo).
- `credito.html` (permalink `/credito/`) — Correspondente Bancário Multi Bancos em parceria com a LS Intermediação Financeira (@ls.intermedfin): empréstimos, consignados, financiamentos, seguros e consórcios, com CTAs de WhatsApp por produto e aviso legal.
- `cursos.html` (permalink `/cursos/`) — Página da Cerraclass no próprio site: destaques IA na Prática (`/iacao/`) e IA em Ação Farma (`/iafarma/`), seção **Catálogo Presencial** com os 11 cursos do catálogo da CerraClass (7 de um dia, 4 imersões, com link para `https://cerraclass.com.br/presencial/<id>`), método, in company; todos os botões de inscrição levam para https://cerraclass.com.br/. A seção do catálogo é gerada por `marketing/tools/gerar_cursos_site.py` a partir de `marketing/dados/cerraclass-cursos.json` — mexa no gerador, não no HTML.
- `marketing/index.html` (`/marketing/`) — **Central de Conteúdos** para o time de marketing: lê `marketing/entregas/conteudos.json` e mostra cada campanha com prévias, download por peça, `.zip` e legendas com botão de copiar. Tem `noindex` e não aparece no menu nem no sitemap. Só ela e `marketing/entregas/` são publicadas; o resto de `marketing/` é o estúdio de produção (ver `marketing/README.md` e `marketing/HISTORICO.md`). Desde 30/10 a agenda tem 4 contas (@cerradofinancas, @cerra.ai, @cerraclass e @guiacademico), começa em 31/10/2026, repete o conteúdo da conta quando ele acaba e inclui as datas comemorativas nacionais; `marketing/kits/` tem o mídia kit de cada marca, incluindo o do Guia Acadêmico (site próprio em guiacademico.com.br, projeto `D:\Dev\GuiAcademico`).
- `marketing/entregas/2026-10-palestra-carreira-ia/apresentacao/` — apresentação animada da palestra "Muito Além do Currículo" (29 slides, GSAP + Lottie, navegação por setas). É cópia de `marketing/posts/2026-10-palestra-carreira-ia/apresentacao-animada.html` com os caminhos ajustados; não está no sitemap.
- Header: Início, Fábrica de Software, Contabilidade, Crédito, Cursos. Startups/Parceiros/Data Driven saíram do header e ficam no footer (coluna "Ecossistema") e na home.

### 1. `fabrica.html` — Fábrica de Software (antiga home)
**Title:** Cerrado Tech — Fábrica de Software Customizada | ERPs, CRMs, IA e Dashboards

Estrutura:
1. **Hero** com vídeo `video.mp4`, logo `logohome.png`, badge "Fábrica de Software Corporativa", título "O software que o seu negócio realmente precisa", subtítulo sobre software customizado, CTA "Solicitar Proposta"
2. **Faixa de plataformas** — SAP®, TOTVS Protheus, Power BI, ContaAzul, Bling ERP
3. **Categorias de Software** (6 cards clicáveis com ícones Phosphor 3D): ERPs Customizados, CRMs Inteligentes, IA Offline, E-commerce & Vendas, Compliance & Auditoria, Dashboards & Analytics
4. **Pipeline / Metodologia** (4 passos): Descoberta → Arquitetura → Desenvolvimento Ágil → Entrega & Evolução
5. **Comparação** Custom vs Software de Prateleira (cards lado a lado)
6. **Consultorias CTA** (banner azul escuro)
7. **Quem Somos**: Foto + bio do Renato, LinkedIn CTA
   - **Nossa Stack Tecnológica** (6 cards compactos com ícones Phosphor 3D): Cloud, IA Offline, Mobile/PWA, APIs & Integrações, Segurança & LGPD, Blockchain
8. **Formulário de Contato** → FormSubmit.co → `gestor.renatorosa@gmail.com`

### 2. `contabilidade.html` — Cerrado Contabilidade
**Title:** Cerrado Contabilidade | Inteligência Fiscal para PMEs e MEI

Estrutura:
1. **Hero** com vídeo `timelapse.mp4`, logo `logo.png`, badge "Consultoria Estratégica & Inteligência de Dados", CTA "Agendar Diagnóstico"
2. **Faixa de plataformas** — SAP, TOTVS, Power BI, ContaAzul, Bling
3. **Stats** — 100% Digital, Rápido, Humano
4. **Serviços Integrados** (3 cards): Abertura de CNPJ, Gestão Tributária (Simples/Fator R), Folha de Pagamento/eSocial
5. **Público-Alvo** (3 cards): Prestadores de Serviço, Profissionais da Saúde, Comércio/E-commerce
6. **Jornada da Maturidade** (carrossel 4 fases): Mapeamento, Saneamento/BPO, Automação, Inteligência Executiva/BI
7. **Atuação 360º** (carrossel): Destravamento ERP, Dashboards BI, Controladoria BPO, Mentoria
8. **Banner PME/MEI** + CTA WhatsApp
9. **Consultorias CTA**
10. **Ecossistema Cross-sell** (Status VIP, descontos em BI/BPO)
11. **Renato** + LinkedIn
12. **Formulário de Contato**
13. **Migração Contábil CTA** — "Troque de contador sem dor de cabeça"

### 3. `solucoes.html` — Fábrica de Software e B2B
Catálogo completo de soluções. Carrosséis separados para:
- **B2G (GovTech)**: GovDash, Mobility, Edu, GovRH, Prev, Privacy, Social, Docs
- **B2B (Corporativo)**: Cerraflow, CerraBI, Blockchain, CerraPlan, Cartór.IO, EloEleitoral, Lei do Bem, Broker Logístico, CerraZap, CerraFood, CerraLoan, CerraCare, Cerraliance, CerraCarryOver, SolarCRM, Cerra.AI, Prof.Synergeia, CerradoBakery

### 4. `startups.html` — Portfólio de Startups
Venture Builder com 5 startups: GoGym (fitness), MTData (govtech dados), PataMed (veterinária), Global Ready (certificação internacional), ChamaLá (serviços locais). Hero com vídeo `cerradotech.mp4`.

### 5. `parceiros.html` — Programa de Parceiros
Programa de afiliados com calculadora de comissões interativa (7 categorias de serviço) e tabela de comissões.

### 6. `data-driven.html` — Blog/Artigos
Manifesto "Somos Data Driven" + 8 artigos sobre controladoria, tecnologia e estratégia fiscal.

### 7. `consultorias.html` — Consultorias
11 linhas de consultoria em cards: CSC Strategy, BPO Financeiro, Controladoria, Planejamento Tributário, Governança/GRC, Venture Building, GovTech, Web3/Blockchain, Engenharia de Software, Contabilidade Digital, Implementação B2B.

### 8. `obrigado.html` — Pós-formulário
Página standalone de confirmação após envio de formulário. Sem header/footer.

---

## Páginas de Produto (6 novas — Cerrado Tech)

Todas seguem o mesmo template: Hero com ícone Phosphor + badge "Fábrica de Software" + CTA WhatsApp, 6 cards de diferenciais, metodologia 4 passos, seção "Explore Também" com links para as outras 5 soluções.

| Página | Arquivo | Cor |
|--------|---------|-----|
| ERPs Customizados | `erp-customizado.html` | Azul `#0284c7` |
| CRMs Inteligentes | `crm-inteligente.html` | Dourado `#ca8a04` |
| IA Offline | `ia-offline.html` | Roxo `#7c3aed` |
| E-commerce & Vendas | `ecommerce.html` | Verde `#16a34a` |
| Compliance & Auditoria | `compliance.html` | Vermelho `#e11d48` |
| Dashboards & Analytics | `dashboards.html` | Laranja `#ea580c` |

---

## Páginas GovTech (B2G — Gestão Pública)

| Página | Arquivo | Descrição |
|--------|---------|-----------|
| GovDash | `govdash.html` | BI municipal com alertas LRF |
| Mobility | `mobility.html` | Gestão de frotas governamentais |
| Edu | `edu.html` | Gestão escolar com IA anti-evasão |
| GovRH | `govrh.html` | Folha de pagamento pública com eSocial |
| Prev | `prev.html` | Hub RPPS integrado ao COMPREV |
| Privacy | `privacy.html` | DPO as a Service e LGPD |
| Social | `social.html` | Prontuário SUAS com CadÚnico |
| Docs | `docs.html` | Paperless com OCR e IA documental |

---

## Páginas B2B (Mercado Privado)

| Página | Arquivo | Descrição |
|--------|---------|-----------|
| Cerraflow | `cerraflow.html` | CRM com Embedded Finance |
| CerraBI | `cerrabi.html` | BI White-Label para contabilidade |
| Blockchain | `blockchain.html` | Consultoria Web3/Solidity |
| CerraPlan | `cerraplan.html` | 5W2H com compliance |
| Cartór.IO | `chatcartorio.html` | IA para cartórios |
| EloEleitoral | `eloeleitoral.html` | CRM político com heat maps |
| Lei do Bem | `leidobem.html` | Diagnóstico fiscal com IA |
| Broker Logístico | `brokerlogistico.html` | ERP logístico mobile |
| CerraZap | `cerrazap.html` | Bot WhatsApp para vendas |
| CerraFood | `cerrafood.html` | ERP para pizzarias |
| CerraLoan | `cerraloan.html` | Microcrédito |
| CSC Strategy | `csc-strategy.html` | CSC implementation |
| MTData | `mtdata.html` | Dados turismo MT |
| Global Ready | `globalready.html` | Certificação B2B internacional |
| CerraCare | `cerracare.html` | Prontuário eletrônico e gestão de cuidadoras (PWA mobile-first) |
| Cerraliance | `cerraliance.html` | Compliance e auditoria cidadã para órgãos públicos |
| CerraCarryOver | `cerracarryover.html` | Controle de grãos para traders agrícolas (PWA) |
| SolarCRM | `solarcrm.html` | CRM solar com dimensionamento, proposta PDF e Kanban |
| Cerra.AI | `cerraai.html` | Assistente IA offline para cartórios com RAG e mascaramento LGPD |
| Prof.Synergeia | `profsynergeia.html` | Gestão de orientações de projetos estudantis (EdTech) |
| CerradoBakery | `cerradobakery.html` | Gestão inteligente para padarias com fichas técnicas e BI |

---

## Startups

| Página | Arquivo | Descrição |
|--------|---------|-----------|
| GoGym | `gogym.html` | E-commerce suplementos |
| ChamaLá | `chamala.html` | Super App serviços Cuiabá |
| PataMed | `patamed.html` | Telemedicina veterinária |

---

## Simuladores (standalone, sem header/footer)

| Produto | Caminho |
|---------|---------|
| GovRH | `solucoes/govrh/simuladorrh.html` |
| Edu | `solucoes/edu/simuladoredu.html` |
| Docs | `solucoes/docs/simuladordocs.html` |
| Mobility | `solucoes/mobility/simuladormobility.html` |
| Privacy | `solucoes/privacy/simuladorprivacy.html` |
| Social | `solucoes/social/simuladorsocial.html` |
| Prev | `solucoes/prev/sistemasimulado/index.html` (+ 10 subpáginas) |

---

## Como o site é construído

### Padrão de página com header/footer:
{% raw %}
```html
---
---
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>...</title>
  <meta name="description" content="...">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32.png">
  <link rel="icon" type="image/png" sizes="192x192" href="/img/favicon-192.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <link href="https://fonts.googleapis.com/css2?family=Inter:...">
  <link rel="stylesheet" href="css/global.css">
  <link rel="stylesheet" href="css/menu.css">
  <link rel="stylesheet" href="css/footer.css">
  <script src="https://unpkg.com/@phosphor-icons/web"></script>
  <style>/* CSS inline da página */</style>
</head>
<body>
  {% include header.html titulo="..." %}
  <!-- conteúdo da página -->
  {% include footer.html %}
  <script src="js/main.js"></script>
  <script>
    // IntersectionObserver para fade-up
  </script>
</body>
</html>
```
{% endraw %}

### Ícones
Todas as páginas usam **Phosphor Icons** via CDN (`unpkg.com/@phosphor-icons/web`). SVGs inline foram substituídos por `<i class="ph ph-nome-icone"></i>`. Efeito 3D aplicado via CSS: `filter: drop-shadow()` nos ícones e `transform: scale() rotate()` no hover dos cards.

### Formulários
Todos usam **FormSubmit.co** com POST para `gestor.renatorosa@gmail.com` e redirecionam para `obrigado.html`.

### WhatsApp
CTAs apontam para `https://api.whatsapp.com/send?phone=5567993515206`.

### Sitemap e indexação
`sitemap.xml` na raiz lista as 51 páginas públicas (frentes, categorias de software, GovTech, B2B, startups e as landings `/iacao/`, `/iafarma/`, `/portfolio/`). Ficam de fora, de propósito:
- `/marketing/` e `obrigado.html` — têm `noindex, nofollow`.
- Documentos internos (`README.md`, `context.md`, `PROXIMOS_PASSOS.md`, `marketing/README.md`, `marketing/HISTORICO.md`) — excluídos no `_config.yml`, não viram página.

### Segredos
Chaves de API **nunca** no código. `gerar_gamma.py` (fora do git, no `.gitignore`) lê `GAMMA_API_KEY` do ambiente; use `.env` (também ignorado) a partir do `.env.example`.

### Deploy
GitHub Pages com Jekyll. Domínio customizado: `www.cerradofinancas.com.br` (CNAME). Commit e push direto na branch `main`.
