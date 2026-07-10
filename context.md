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
- **Phosphor Icons** / **Lucide Icons** (páginas específicas)

### Arquivos compartilhados

| Arquivo | Função |
|---------|--------|
| `_includes/header.html` | Header fixo glassmorphism com logo, nav desktop/mobile e CTA WhatsApp. CSS inline próprio. |
| `_includes/footer.html` | Footer premium dark slate com 4 colunas, links, contato e CTAs. CSS inline próprio. |
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

### 1. `index.html` — Home (Cerrado Tech — Fábrica de Software)
**Title:** Cerrado Tech — Fábrica de Software Customizada | ERPs, CRMs, IA e Dashboards

Estrutura:
1. **Hero** com vídeo `video.mp4`, logo `logo-tech.png`, badge "Fábrica de Software Corporativa", título "O software que o seu negócio realmente precisa", subtítulo sobre software customizado, CTA "Solicitar Proposta"
2. **Faixa de plataformas** — SAP®, TOTVS Protheus, Power BI, ContaAzul, Bling ERP
3. **Categorias de Software** (6 cards clicáveis): ERPs Customizados, CRMs Inteligentes, IA Offline, E-commerce & Vendas, Compliance & Auditoria, Dashboards & Analytics
4. **Pipeline / Metodologia** (4 passos): Descoberta → Arquitetura → Desenvolvimento Ágil → Entrega & Evolução
5. **Comparação** Custom vs Software de Prateleira (cards lado a lado)
6. **Consultorias CTA** (banner azul escuro)
7. **Quem Somos**: Foto + bio do Renato, LinkedIn CTA
   - **Nossa Stack Tecnológica** (6 cards compactos): Cloud, IA Offline, Mobile/PWA, APIs & Integrações, Segurança & LGPD, Blockchain
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
- **B2B (Corporativo)**: Cerraflow, CerraBI, Blockchain, CerraPlan, Cartór.IO, EloEleitoral, Lei do Bem, Broker Logístico, CerraZap, CerraFood, CerraLoan

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

Todas seguem o mesmo template: Hero com ícone + badge "Fábrica de Software" + CTA WhatsApp, 6 cards de diferenciais, metodologia 4 passos, seção "Explore Também" com links para as outras 5 soluções.

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
  <link rel="icon" type="image/png" href="img/logo.png">
  <link href="https://fonts.googleapis.com/css2?family=Inter:...">
  <link rel="stylesheet" href="css/global.css">
  <link rel="stylesheet" href="css/menu.css">
  <link rel="stylesheet" href="css/footer.css">
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

### Formulários
Todos usam **FormSubmit.co** com POST para `gestor.renatorosa@gmail.com` e redirecionam para `obrigado.html`.

### WhatsApp
CTAs apontam para `https://api.whatsapp.com/send?phone=5567993515206`.

### Deploy
GitHub Pages com Jekyll. Domínio customizado: `www.cerradofinancas.com.br` (CNAME). Commit e push direto na branch `main`.
