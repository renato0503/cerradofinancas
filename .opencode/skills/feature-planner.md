# feature-planner

## Description
Planeja e estrutura novas funcionalidades para o EloEleitoral, desde a concepção até a implementação.

## Instructions

### 1. Levantamento de Requisitos
1. Entenda a necessidade do usuário
2. Defina o escopo da funcionalidade
3. Identifique dependências existentes
4. Estime complexidade (1-5)

### 2. Estruturação
Siga a arquitetura do projeto:

```
[FEATURE]/
├── [feature].html      (página principal)
├── css/[feature].css    (estilos específicos)
└── js/
    ├── modules/
    │   └── db-[feature].js
    └── pages/
        └── [feature]-controller.js
```

### 3. Checklist de Implementação

**HTML**
- [ ] Estrutura semântica (header, main, footer)
- [ ] Acessibilidade (labels, roles)
- [ ] Classes CSS consistentes
- [ ] Mobile-first responsive

**CSS**
- [ ] Variáveis CSS do projeto
- [ ] Componentes reutilizáveis
- [ ] Responsividade
- [ ] Estados (hover, active, disabled)

**JavaScript**
- [ ] Módulo DB para persistência
- [ ] Controller com lifecycle
- [ ] Eventos DOM vinculados
- [ ] Error handling

**Integração**
- [ ] Menu atualizado (se necessário)
- [ ] Links funcionais
- [ ] Navegação consistente

### 4. Template de Feature

```markdown
## Feature: [Nome]

### Descrição
[Uma frase explicando a funcionalidade]

### Motivação
[Por que isso é necessário? Qual problema resolve?]

### Arquivos a Criar/Modificar
- `pasta/arquivo.ext` - [o que muda aqui]

### Implementação

#### Passo 1: [Tarefa]
[Detalhes da implementação]

#### Passo 2: [Tarefa]
[Detalhes da implementação]

### Testes
- [ ] Testar cenário 1
- [ ] Testar cenário 2
- [ ] Testar edge cases

### Riscos
- [ ] Risco 1 e mitigação
```

## Categorias de Features

### Pages (Novas páginas)
- Requer: HTML, CSS, Controller JS
- Adicionar ao menu se aplicável
- Incluir em navegação

### Modules (Módulos reutilizáveis)
- Requer: JS modular
- Exportar funções claramente
- Documentar API

### Components (Componentes UI)
- Requer: CSS + possivelmente JS
- Tornar configurável
- Testar em diferentes contextos

### Integrations (Integrações externas)
- APIs, Webhooks, etc
- Tratar erros de conexão
- Documentar credenciais

## Examples

**Entrada**: "Adicionar sistema de tags nas demandas"
**Output**:
```
Feature: Sistema de Tags para Demandas

### Arquivos
- css/demandas.css - Adicionar estilos de tag
- js/modules/storage.js - Adicionar campo tags
- js/pages/demandas-controller.js - Lógica de tags

### Implementação
1. Adicionar seletor de tags no form
2. Permitir múltiplas tags por demanda
3. Filtrar demandas por tag
4. Mostrar tags na listagem
```

## Triggers

- "nova funcionalidade"
- "adicionar recurso"
- "implementar"
- "criar feature"
- "melhorar"
- "expandir"
