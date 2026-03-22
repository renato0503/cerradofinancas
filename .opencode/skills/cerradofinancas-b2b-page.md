# cerradofinancas-b2b-page

## Description
Cria novas páginas de apps B2B para a plataforma CerradoFinancas seguindo o padrão estrutural e visual estabelecido.

## Context

O projeto é um site Jekyll estático com páginas B2B SaaS auto-contidas (não usa layout wrapper Jekyll). Toda página B2B segue o MESMO padrão estrutural.

### Estrutura Padrão de uma Página B2B

```
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Nome] | Cerrado Tech</title>
    <meta name="description" content="[descrição]">
    <link rel="icon" type="image/png" href="{{ '/img/folinha.png' | relative_url }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ '/css/global.css' | relative_url }}">
    <link rel="stylesheet" href="{{ '/css/menu.css' | relative_url }}">
    <link rel="stylesheet" href="{{ '/css/footer.css' | relative_url }}">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
            padding-top: 80px;
            background-color: #020617;
            color: #ffffff;
            line-height: 1.6;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .fade-up { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.2s; }

        /* --- HERO --- */
        .xxx-hero {
            background: linear-gradient(135deg, #020617 0%, #[cor-secundaria] 100%);
            padding: 120px 0 100px;
            position: relative;
            overflow: hidden;
            border-bottom: 2px solid #[cor-acento];
        }
        .xxx-hero::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: radial-gradient(circle at 70% 30%, rgba([cor-acento-hex], 0.15) 0%, transparent 60%);
            pointer-events: none;
        }
        .xxx-hero-grid { display: flex; align-items: center; gap: 60px; position: relative; z-index: 2; }
        @media (max-width: 992px) { .xxx-hero-grid { flex-direction: column; text-align: center; } }
        .xxx-text { flex: 1.2; }
        .app-branding { display: flex; flex-direction: column; align-items: flex-start; margin-bottom: 30px; }
        @media (max-width: 992px) { .app-branding { align-items: center; } }
        .app-big-icon { width: 120px; height: 120px; border-radius: 28px; display: flex; align-items: center; justify-content: center; box-shadow: 0 20px 40px rgba(0,0,0,0.6); margin-bottom: 20px; border: 1px solid rgba([cor-acento-hex], 0.4); overflow: hidden; }
        .app-big-icon img { width: 100%; height: 100%; object-fit: cover; }
        .xxx-badge { background: rgba([cor-acento-hex], 0.1); color: [cor-acento-bright]; border: 1px solid rgba([cor-acento-hex], 0.4); padding: 8px 16px; border-radius: 50px; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: inline-block; margin-bottom: 20px; }
        .xxx-text h1 { font-size: clamp(2.2rem, 5vw, 3.8rem); font-weight: 900; line-height: 1.1; margin-bottom: 20px; letter-spacing: -1px; }
        .xxx-text h1 span { color: #[cor-acento]; }
        .xxx-text p { font-size: 1.15rem; color: #cbd5e1; margin-bottom: 40px; line-height: 1.7; max-width: 600px; }
        .btn-[nome] { background: #[cor-acento]; color: #ffffff; padding: 16px 32px; border-radius: 12px; font-weight: 800; font-size: 1.1rem; text-decoration: none; display: inline-flex; align-items: center; gap: 10px; transition: all 0.3s ease; box-shadow: 0 10px 25px rgba([cor-acento-hex], 0.3); border: none; }
        .btn-[nome]:hover { filter: brightness(1.1); transform: translateY(-3px); box-shadow: 0 15px 35px rgba([cor-acento-hex], 0.5); }
        .xxx-visual { flex: 0.8; display: flex; justify-content: center; }

        /* --- SECTIONS --- */
        .features-section { padding: 100px 0; background: #0b0f19; border-top: 1px solid #1e293b; }
        .sec-title { text-align: center; margin-bottom: 60px; }
        .sec-title h2 { font-size: 2.5rem; font-weight: 900; color: #fff; margin-bottom: 15px; }
        .sec-title p { font-size: 1.15rem; color: #94a3b8; max-width: 700px; margin: 0 auto; }
        .f-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
        .f-card { background: #0f172a; border: 1px solid #1e293b; padding: 40px 30px; border-radius: 24px; transition: 0.3s; }
        .f-card:hover { transform: translateY(-5px); border-color: #[cor-acento]; box-shadow: 0 10px 30px rgba([cor-acento-hex], 0.1); }
        .fc-icon { width: 50px; height: 50px; background: #1e293b; color: [cor-acento-bright]; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; font-size: 1.5rem; border: 1px solid #334155; }
        .f-card h3 { font-size: 1.3rem; font-weight: 800; color: #fff; margin-bottom: 15px; }
        .f-card p { font-size: 1.05rem; color: #94a3b8; line-height: 1.6; margin: 0; }

        .cta-bottom { background: linear-gradient(135deg, #[cor-acento] 0%, #[cor-acento-dark] 100%); padding: 80px 0; text-align: center; color: #fff; }
        .cta-bottom h2 { font-size: 2.5rem; font-weight: 900; margin-bottom: 20px; }
        .cta-bottom p { font-size: 1.15rem; color: rgba(255,255,255,0.8); margin-bottom: 40px; max-width: 600px; margin-left: auto; margin-right: auto; }
    </style>
</head>
<body>
{% include header.html titulo="Cerrado Tech" %}

<!-- HERO SECTION -->
<section class="xxx-hero">
    <div class="container">
        <div class="xxx-hero-grid">
            <div class="xxx-text fade-up">
                <div class="app-branding">
                    <div class="app-big-icon">
                        <img src="img/[logo-app].png" alt="[Nome] Logo">
                    </div>
                    <div class="xxx-badge">[Categoria]</div>
                </div>
                <h1>[Headline Principal]</h1>
                <p>[Subheadline descritivo]</p>
                <div class="btn-group fade-up delay-1">
                    <a href="#" class="btn-[nome]">CTA Principal</a>
                </div>
            </div>
            <div class="xxx-visual fade-up delay-2">
                <!-- Mockup visual ou imagem do produto -->
            </div>
        </div>
    </div>
</section>

<!-- FEATURES / CONTENT SECTIONS -->
<!-- ... seguir padrão de seções com sec-title + grid/cards ... -->

<!-- CTA SECTION -->
<section class="cta-bottom">
    <div class="container fade-up">
        <h2>[CTA Headline]</h2>
        <p>[CTA Description]</p>
        <a href="#" class="btn-[nome]" style="background: #ffffff; color: #[cor-acento];">CTA Text</a>
    </div>
</section>

{% include footer.html %}
<script src="{{ '/js/main.js' | relative_url }}"></script>
<script>
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
</script>
</body>
</html>
```

### Paleta de Cores por Tema

| Tema | Accent | Accent Bright | Accent Dark | Background Alt |
|------|--------|--------------|-------------|---------------|
| Verde (BI/Finance) | #10b981 | #34d399 | #059669 | #064e3b |
| Cyan (CRM/Tech) | #0ea5e9 | #38bdf8 | #0284c7 | #082f49 |
| Roxo (Blockchain/IA) | #8b5cf6 | #a78bfa | #7c3aed | #1e1b4b |
| Azul (GovTech) | #0284c7 | #38bdf8 | #0369a1 | #082f49 |
| dourado (Padrão) | #fecb00 | #facc15 | #d97706 | #064e3b |

### Checklist de Publicação

1. Criar página `[nome].html` na raiz do projeto
2. Adicionar logo em `img/[nome].png`
3. Adicionar tema CSS em `solucoes.html` (seção B2B):
   - `.theme-[nome] .btn-card-plat { background: [cor]; color: #fff; border: none; }`
   - `.theme-[nome] .btn-card-plat:hover { background: [cor-dark]; }`
4. Adicionar card no carrossel B2B de `solucoes.html` com:
   - Ícone/logo SVG
   - Nome, categoria, descrição
   - Tags
   - Link para página
5. Commit com mensagem: `feat: add [Nome] page and integrate into B2B showcase`
6. Push para origin/main

## Examples

**Entrada**: "Crie uma página para o app CerraFaturas"
**Processo**:
1. Define tema: verde (#10b981) - finanças
2. Estrutura hero com mockup de nota fiscal
3. Seções: Problema, Como Funciona, Features, Pricing, CTA
4. Adiciona card em solucoes.html com link para a página
5. Commit e push

**Entrada**: "Quero adicionar o app X na vitrine de B2B"
**Processo**:
1. Verifica se página existe, se não, cria
2. Adiciona CSS theme em solucoes.html
3. Insere card no carrossel B2BTrack
4. Confirma que logo existe em img/

## Triggers

- "nova página b2b"
- "criar app"
- "adicionar plataforma"
- "criar landing page"
- "adicionar ao showcase"
- "integrar na vitrine"
- "publicar produto"
