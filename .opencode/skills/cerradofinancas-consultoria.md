# cerradofinancas-consultoria

## Description
Cria e gerencia páginas de serviços de consultoria para a CerradoFinancas, incluindo landing pages completas e a página central de consultorias.

## Context

A CerradoFinancas oferece 11 linhas de consultoria. Cada uma pode ter:
1. **Card na página central** (`consultorias.html`) - sempre atualizado
2. **Landing page dedicada** - para consultorias mais complexas/amplas (ex: CSC Strategy)

### Estrutura da Página de Consultorias

Cada consultoria segue este modelo de card:

```html
<div class="cons-card fade-up" style="--accent-color: #[COR]; --accent-bg: rgba([COR], 0.1);">
    <div class="cons-icon-wrap">
        <div class="cons-icon">
            <!-- SVG icon -->
        </div>
    </div>
    <div class="cons-content">
        <h3>[Nome da Consultoria]</h3>
        <div class="cons-what">[Label: o que é]</div>
        <p class="cons-deliver">[O que entregamos - bold/italic]</p>
        <p>[Descrição adicional]</p>
        <div class="cons-tags">
            <span class="cons-tag">[Pilar 1]</span>
            <span class="cons-tag">[Pilar 2]</span>
            <span class="cons-tag">[Pilar 3]</span>
            <span class="cons-tag">[Pilar 4]</span>
        </div>
    </div>
    <div class="cons-action">
        <a href="[DESTINO]" class="btn-cons">[Texto] →</a>
    </div>
</div>
```

### As 11 Consultorias e seus Destinos

| # | Nome | Destino |
|---|------|---------|
| 1 | CSC Strategy | `/csc-strategy.html` (landing page) |
| 2 | BPO Financeiro | WhatsApp |
| 3 | Controladoria Estruturada | WhatsApp |
| 4 | Planejamento Tributário | WhatsApp |
| 5 | Governança, Risco e Compliance | WhatsApp |
| 6 | Venture Building | `/startups.html` |
| 7 | Consultoria GovTech | WhatsApp |
| 8 | Web3 e Blockchain | `/blockchain.html` |
| 9 | Engenharia de Software | WhatsApp |
| 10 | Contabilidade Digital | WhatsApp |
| 11 | Ecossistema Cerrado Tech | `/solucoes.html` |

### Conteúdo de Cada Consultoria

**Modelo padrão:**
```
Nome: [Nome da Consultoria]
O que é: [Uma frase descrevendo o serviço]
O que entregamos: [Descrição do resultado]
Pilares: [4 tags separadas por pipe]
```

### Cores por Consultoria

| Nome | Cor Hex | Cor Bright |
|------|---------|-------------|
| CSC Strategy | #fecb00 | #facc15 |
| BPO Financeiro | #10b981 | #34d399 |
| Controladoria | #0ea5e9 | #38bdf8 |
| Planejamento Tributário | #8b5cf6 | #a78bfa |
| Governança & GRC | #f59e0b | #fbbf24 |
| Venture Building | #ec4899 | #f472b6 |
| Consultoria GovTech | #06b6d4 | #22d3ee |
| Web3 & Blockchain | #6366f1 | #818cf8 |
| Engenharia de Software | #14b8a6 | #2dd4bf |
| Contabilidade Digital | #84cc16 | #a3e635 |
| Ecossistema Cerrado Tech | #f97316 | #fb923c |

## Como Atualizar a Página de Consultorias

### Adicionar nova consultoria
1. Ler `consultorias.html` atual
2. Adicionar novo card antes do `<!-- CTA -->`
3. Manter consistência de cores e estilo
4. Verificar que texto não tem caracteres especiais/estrangeiros misturados
5. Commit: `feat: add [Nome] to consultorias page`

### Criar landing page de consultoria
1. Criar arquivo `[nome-slug].html` na raiz
2. Usar padrão B2B com tema da consultoria
3. Incluir seções: Hero, O Problema, Solução, Como Funciona, Para Quem, CTA
4. Adicionar link na página central de consultorias
5. Adicionar no menu se aplicável

### Template de Landing para Consultoria

```
## Seções Obrigatórias:
1. Hero: Headline de impacto + mockup/ilustração
2. O que é: Explicação clara do serviço
3. O que entregamos: Lista de resultados tangíveis
4. Pilares/Features: 3-6 cards com ícones
5. Para quem: Perfis ideais (grid de cards)
6. Como funciona: Timeline ou steps (3-4 passos)
7. CTA: Botão WhatsApp ou formulário

## Elementos Visuais:
- Ícones SVG inline (não emojis)
- Mockups em CSS (não imagens pesadas)
- Gradientes sutis com radial-gradient
- Borda colorida na lateral dos cards
```

## Examples

**Entrada**: "Atualize a consultoria de BPO Financeiro com novo conteúdo"
**Processo**:
1. Identifica card atual em consultorias.html
2. Substitui conteúdo mantendo estrutura
3. Verifica link WhatsApp
4. Commit

**Entrada**: "Crie uma landing page para Consultoria de M&A"
**Processo**:
1. Define cor: #f59e0b (dourado)
2. Cria arquivo `ma.html` ou `governanca-ma.html`
3. Segue template de consultoria
4. Adiciona card em consultorias.html com link para nova página
5. Commit e push

**Entrada**: "A consultoria de Lei do Bem tem texto errado, corrija"
**Processo**:
1. Localiza consultoria em consultorias.html
2. Substitui texto mantendo tags e estrutura
3. Verifica formatação
4. Commit

## Triggers

- "atualizar consultoria"
- "nova consultoria"
- "criar landing de consultoria"
- "corrigir conteúdo de consultoria"
- "adicionar serviço de consultoria"
- "página de consultorias"
