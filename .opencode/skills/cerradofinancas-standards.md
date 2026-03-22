# cerradofinancas-standards

## Description
Mantém consistência de código, estilo e processo em todo o projeto CerradoFinancas / Cerrado Tech. Serve como referência rápida para padrões estabelecidos.

## Padrões de Código

### HTML

#### Meta Tags Obrigatórias (head)
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>[Pagina] | Cerrado Tech</title>
<meta name="description" content="[descricao unica de ate 160 chars]">
<link rel="icon" type="image/png" href="{{ '/img/folinha.png' | relative_url }}">
```

#### Fonts
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
```

#### CSS Links
```html
<link rel="stylesheet" href="{{ '/css/global.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/css/menu.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/css/footer.css' | relative_url }}">
```

#### Estrutura de Página
```html
<body>
{% include header.html titulo="Cerrado Tech" %}

<main-content>

{% include footer.html %}

<script src="{{ '/js/main.js' | relative_url }}"></script>
<script>
    document.addEventListener("DOMContentLoaded", function() {
        // IntersectionObserver para animações
    });
</script>
</body>
```

### CSS

#### Variáveis de Tema (CSS Custom Properties)
```css
:root {
    --primary: #0F172A;
    --primary-light: #1E293B;
    --secondary: #D4AF37; /* Gold */
    --accent: #10B981; /* Emerald 500 */
    --danger: #EF4444;
    --surface: #FFFFFF;
    --surface-alt: #F8FAFC;
    --bg: #F1F5F9;
    --text-main: #0F172A;
    --text-muted: #64748B;
    --border: #E2E8F0;
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 20px;
    --radius-full: 9999px;
}
```

#### Breakpoints Responsivos
```css
/* Mobile first */
@media (max-width: 600px) { /* celular */ }
@media (max-width: 768px) { /* tablet */ }
@media (max-width: 992px) { /* laptop */ }
@media (max-width: 1200px) { /* desktop */ }
```

#### Animações
```css
.fade-up {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-up.visible {
    opacity: 1;
    transform: translateY(0);
}
.delay-1 { transition-delay: 0.1s; }
.delay-2 { transition-delay: 0.2s; }
```

### JavaScript

#### IntersectionObserver (Fade-up)
```js
document.addEventListener("DOMContentLoaded", function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
});
```

#### Carousel Genérico
```js
function scrollCarousel(trackId, direction) {
    const track = document.getElementById(trackId);
    const scrollAmount = 324 * direction;
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}
```

### Git / Commits

#### Formato de Mensagem
```
tipo: descrição curta

- detalhe 1
- detalhe 2
```

#### Tipos
```
feat: nova funcionalidade ou página
fix: correção de bug
style: ajuste visual (CSS)
refactor: reorganização sem mudança de comportamento
docs: documentação
chore: manutenção geral
```

#### Exemplo
```bash
git add .
git commit -m "feat: add CerraBI page and integrate into B2B showcase

- Create cerrabi.html landing page with 7 sections
- Add CerraBI card to solucoes.html B2B carousel
- Theme: emerald green matching BI/finance branding"
git push
```

## Estrutura de Arquivos

```
cerradofinancas/
├── index.html              # Homepage principal
├── solucoes.html           # Vitrine B2B/GovTech
├── consultorias.html       # Página central de consultorias
├── data-driven.html        # Blog/artigos
├── contabilidade.html      # Serviços contábeis
├── parceiros.html          # Programa de parceiros
├── privacidade.html        # Política de privacidade
├── startups.html           # Venture building
│
├── cerrabi.html           # BI/FP&A B2B
├── cerraflow.html         # CRM B2B
├── cerraplan.html         # 5W2H B2B
├── blockchain.html        # Web3 B2B
├── chatcartorio.html      # WhatsApp IA B2B
├── brokerlogistico.html    # Logística B2B
├── eloeleitoral.html      # Eleitoral B2B
├── leidobem.html          # Tributário B2B
├── csc-strategy.html      # CSC SaaS
│
├── _includes/
│   ├── header.html        # Header padrão
│   └── footer.html        # Footer padrão
│
├── css/
│   ├── global.css         # Variáveis e resets
│   ├── menu.css           # Header/nav
│   └── footer.css         # Footer styles
│
├── js/
│   └── main.js            # Scripts globais
│
└── img/
    ├── logo.png           # Logo Cerrado Finanças
    ├── folinha.png        # Favicon
    ├── cerrabi.png        # Logos dos apps
    ├── cerraflow.png
    ├── ...
    └── cscstrategy.png    # Imagens de produtos
```

## Links e Navegação

### Links Internos
```html
<a href="/solucoes.html">Soluções</a>
<a href="/consultorias.html">Consultorias</a>
<a href="/index.html#contato">Contato</a>
```

### Links WhatsApp
```html
<!-- Direto para conversa -->
<a href="https://api.whatsapp.com/send?phone=5567993515206" target="_blank">

<!-- Com mensagem pré-definida -->
<a href="https://api.whatsapp.com/send?phone=5567993515206&text=Olá! Vim pelo site." target="_blank">
```

## Checklist de Qualidade

### Antes de Commitar
- [ ] Código formatação consistente (indentação 4 espaços ou tabs)
- [ ] Sem console.log ou debugger
- [ ] Sem dados sensíveis (senhas, tokens)
- [ ] Imagens otimizadas
- [ ] Links funcionando
- [ ] Responsivo em mobile (testar 375px)
- [ ] Animações suaves (sem lag)

### Antes de Publicar
- [ ] Testar em Chrome, Firefox, Safari
- [ ] Validar HTML (sem tags quebradas)
- [ ] Verificar accessibility (alt text em imagens)
- [ ] Lighthouse score aceitável (>80)
- [ ] Imagens com dimensões corretas
- [ ] Meta tags completas

## Cores por Seção/Tipo

| Uso | Cor | Hex |
|-----|-----|-----|
| Texto principal (dark bg) | branco | #ffffff |
| Texto secundário | slate | #94a3b8 |
| Texto muted | slate escuro | #64748b |
| Borda/subdivisão | slate | #1e293b |
| Background escuro | slate muito escuro | #020617 |
| Background seção alt | slate escuro | #0b0f19 |
| Accent padrão | dourado | #fecb00 |
| Accent verde | emerald | #10b981 |
| Accent cyan | sky | #0ea5e9 |
| Accent roxo | violet | #8b5cf6 |
| Accent rosa | pink | #ec4899 |
| Accent laranja | orange | #f97316 |

## FAQ Rápido

**P: Adicionei uma imagem em img/, não aparece.**
R: Verificar: nome correto (case-sensitive), extensão (.png/.jpg), path no src.

**P: Fade-up não funciona.**
R: Verificar: classe `.fade-up` no elemento, IntersectionObserver no JS, CSS `.visible` definido.

**P: Header fix overlap no conteúdo.**
R: body precisa de `padding-top: 80px` para compensar header fixo.

**P: Mudança no CSS não reflete.**
R: Ctrl+F5 (hard refresh) ou verificar se há cache.

**P: Include Jekyll não funciona localmente.**
R: Jekyll precisa ser servido com `jekyll serve`. Arquivos HTML diretos no browser não processam includes.

## Triggers

- "padrão do projeto"
- "como fazer"
- "convenção"
- "estrutura"
- "estilo"
- " checklist"
- "antes de commitar"
- "referência"
- "onde fica"
