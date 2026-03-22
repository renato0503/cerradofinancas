# cerradofinancas-landing-review

## Description
Revisa e melhora landing pages existentes do projeto CerradoFinancas, identificando inconsistências de layout, estilo, conteúdo e UX.

## Context

O projeto usa Jekyll com páginas HTML estáticas auto-contidas. O padrão visual é:
- **Fundo**: #020617 (dark) ou #f8fafc (light)
- **Container**: max-width 1200px
- **Animações**: fade-up com IntersectionObserver
- **Header**: include `_includes/header.html` com glassmorphism fixo
- **Footer**: include `_includes/footer.html` com fundo #0f172a

### Problemas Comuns a Identificar

#### 1. Layout Inconsistente
- [ ] Container width diferente do padrão (verificar 1000px vs 1200px)
- [ ] Background colors misturados (dark vs light)
- [ ] Padding inconsistente entre seções
- [ ] Responsividade quebrada

#### 2. Estilo Visual
- [ ] Cores de tema divergentes do padrão
- [ ] Fontes não-Inter ou não carregadas
- [ ] Estilos inline excessivos vs CSS classes
- [ ] Animações fade-up faltando ou mal configuradas

#### 3. Conteúdo
- [ ] Textos truncados ou placeholder
- [ ] Caracteres especiais/estrangeiros misturados (chinês, árabe, etc)
- [ ] Links quebrados ou pointing para lugar errado
- [ ] Descrições genéricas não customizadas

#### 4. UX/Conversão
- [ ] CTAs ausentes ou genéricos
- [ ] Hierarquia de informação confusa
- [ ] Navegação inconsistente com outras páginas
- [ ] Mobile experience negligenciada

## Processo de Revisão

### Passo 1: Análise Visual (Ler o arquivo)
```
1. Identificar o tipo da página:
   - B2B App (tema dark, hero com logo)
   - Consultoria (tema dark, card list)
   - Institucional (pode ser tema light)
   - Artigos/Blog (geralmente light)
   
2. Verificar estrutura básica:
   - <head> com meta tags completas?
   - CSS inline ou link para global.css?
   - Header e Footer incluídos?
   - Scripts de animação presentes?
```

### Passo 2: Checklist de Consistência

| Elemento | Padrão | Verificar |
|----------|--------|-----------|
| Container | max-width: 1200px | Padding consistente? |
| Body bg | #020617 (dark) | Escuro ou claro? |
| Hero | padding-top: 120px | Consistente? |
| Sections | padding: 100px 0 | Alterna bg? |
| Fade-up | IntersectionObserver | presente? |
| Header | include header.html | glassmorphism? |
| Footer | include footer.html | presente? |
| CTA | border-radius: 12px | consistente? |

### Passo 3: Correções Típicas

**Container muito estreito:**
```css
.container { max-width: 1000px; } /* MUDAR PARA */
.container { max-width: 1200px; }
```

**Background misturado:**
```css
/* Se página B2B: */
body { background-color: #020617; }
/* Se página light manter branco, mas verificar se cards也跟着变黑 */
```

**Animações faltando:**
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

**Textos com sujeira:**
- Buscar padrões: `grep` para caracteres não-portugues
- Verificar se textos vieram de copy-paste de tradutor automático
- Substituir por português limpo

### Passo 4: Melhoria de Conversão

Adicionar CTA quando ausente:
```html
<section style="background: linear-gradient(135deg, #fecb00 0%, #d97706 100%); padding: 80px 0; text-align: center;">
    <div class="container">
        <h2 style="font-size: 2.5rem; font-weight: 900; color: #0f172a;">Título</h2>
        <p style="font-size: 1.15rem; margin-bottom: 40px;">Descrição</p>
        <a href="https://wa.me/5567993515206" style="display: inline-flex; background: #0f172a; color: #fff; padding: 16px 32px; border-radius: 12px; font-weight: 800; text-decoration: none;">CTA</a>
    </div>
</section>
```

## Examples

**Entrada**: "A página de consultorias está com texto estranho"
**Processo**:
1. Abre `consultorias.html`
2. Usa grep para buscar caracteres especiais
3. Identifica textos com caracteres chineses/árabes
4. Substitui por texto em português limpo
5. Verifica estrutura dos cards
6. Commit

**Entrada**: "O data-driven.html parece menor que as outras páginas"
**Processo**:
1. Abre arquivo e verifica container width (1000px)
2. Verifica body background (light #f1f5f9)
3. Ajusta container para 1200px
4. Converte para tema dark (#020617)
5. Atualiza cores de cards e textos para tema escuro
6. Adiciona CTA de consultorias
7. Commit

**Entrada**: "Revise todas as páginas B2B"
**Processo**:
1. Lista todas as páginas: cerraflow, cerraplan, cerrabi, blockchain, chatcartorio, etc.
2. Para cada uma:
   - Verifica container width
   - Verifica animações fade-up
   - Verifica cores do tema
   - Verifica links de CTA
3. Corrige inconsistências
4. Commit consolidado ou commits individuais

## Triggers

- "revisar página"
- "corrigir layout"
- "melhorar landing page"
- "está diferente das outras"
- "padronizar"
- "consistência"
- "texto estranho"
- "caracteres estranhos"
