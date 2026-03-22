# code-generator

## Description
Gera templates de código para diferentes linguagens e frameworks basedo nas melhores práticas do projeto EloEleitoral.

## Instructions

1. **Identifique a linguagem/framework**
   - HTML/CSS para estruturas de página
   - JavaScript ES6+ para lógica
   - CSS Modules para estilos

2. **Verifique padrões existentes**
   - Analise arquivos similares no projeto
   - Mantenha consistência com código existente
   - Use componentes/funções utilitárias já disponíveis

3. **Selecione o template adequado**
   - Página completa: template de página HTML
   - Módulo JS: template de controller/module
   - Componente CSS: template de estilo

4. **Personalize o template**
   - Substitua placeholders com nomes específicos
   - Adapte imports de dependências
   - Inclua documentação inline se necessário

5. **Valide o código gerado**
   - Verifique sintaxe
   - Confirme que não duplica código existente
   - Teste integração com módulos existentes

## Templates Disponíveis

### Template: Página HTML
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Título — EloEleitoral</title>
    <link rel="stylesheet" href="css/global.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/[PAGE].css">
</head>
<body>
    <header class="[PAGE]-header">
        <div class="container">
            <h1>Título</h1>
        </div>
    </header>

    <main class="container">
        <div class="card">
            <!-- Conteúdo -->
        </div>
    </main>

    <script type="module" src="js/pages/[PAGE]-controller.js"></script>
</body>
</html>
```

### Template: Controller JS
```javascript
// js/pages/[NAME]-controller.js

import { DB } from '../modules/storage.js';

async function inicializar() {
    // 1. Carregar dados
    // 2. Renderizar interface
    // 3. Vincular eventos
}

document.addEventListener('DOMContentLoaded', inicializar);
```

### Template: Módulo CSS
```css
/* css/[PAGE].css */

.[PAGE]-header {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%);
    color: white;
    padding: 2rem 0;
    margin-bottom: 2rem;
}
```

### Template: Módulo DB
```javascript
// js/modules/db-[MODULE].js

const STORAGE_[MODULE] = 'elo_[module]_v1';

export const DB_[MODULE] = {
    obterTodos: () => {
        return JSON.parse(localStorage.getItem(STORAGE_[MODULE])) || [];
    },
    salvar: (item) => {
        let items = DB_[MODULE].obterTodos();
        const novo = { id: String(Date.now()), dataCriacao: new Date().toISOString(), ...item };
        items.unshift(novo);
        localStorage.setItem(STORAGE_[MODULE], JSON.stringify(items));
        return novo;
    },
    excluir: (id) => {
        let items = DB_[MODULE].obterTodos();
        localStorage.setItem(STORAGE_[MODULE], JSON.stringify(items.filter(i => i.id !== id)));
    }
};
```

## Examples

**Entrada**: "Crie um controller para gerenciar eleitores"
**Saída**: Gera `js/pages/eleitores-controller.js` com template completo

**Entrada**: "Template de página para adicionar membro na equipe"
**Saída**: Gera HTML com header, form e script para `equipe.html`

## Triggers

- "criar página"
- "gerar controller"
- "template de"
- "crie um novo módulo"
- "gerar código para"
