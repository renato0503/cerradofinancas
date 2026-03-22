# documentation-generator

## Description
Gera e mantém documentação para o projeto EloEleitoral seguindo padrões consistentes.

## Instructions

### Tipos de Documentação

#### 1. README.md (Raiz do projeto)
```
# Nome do Projeto

## Visão Geral
[2-3 frases sobre o projeto]

## Tecnologias
- [Tech 1]: [Uso]
- [Tech 2]: [Uso]

## Estrutura de Diretórios
```
/pasta
├── arquivo.ext
└── subpasta/
```

## Como Começar
1. Passo 1
2. Passo 2

## Funcionalidades
- Funcionalidade 1
- Funcionalidade 2

## Autor
```

#### 2. DOCUMENTATION.md (Docs técnicas)
```
# Título

## Visão Geral
[Contexto e propósito]

## Arquitetura
[Diagrama ou explicação]

## Componentes
### Componente 1
[Descrição e uso]

## Fluxo de Dados
[Explicação do fluxo]

## Exemplos
[Código de exemplo]
```

#### 3. API Docs (Para módulos)
```javascript
/**
 * @module nomeModulo
 * @description O que o módulo faz
 */

/**
 * Função para...
 * @param {tipo} nome - Descrição
 * @returns {tipo} O que retorna
 */
```

### Regras de Documentação

1. **Clareza**: Escreva para alguém que não conhece o projeto
2. **Concisão**: Mantenha documentação curta e focada
3. **Atualização**: Documente mudanças junto com código
4. **Exemplos**: Sempre inclua exemplos práticos
5. **Manutenção**: Revise docs periodicamente

### Checklist de Documentação

- [ ] Nome do projeto
- [ ] Descrição clara
- [ ] Tecnologias listadas
- [ ] Estrutura de pastas
- [ ] Como instalar/rodar
- [ ] Funcionalidades principais
- [ ] Screenshots (se aplicável)
- [ ] Contribuição
- [ ] Contato/License

## Templates

### Template: README para nova página
```markdown
# [Nome da Página]

Página para [finalidade].

## Funcionalidades
- Lista de features

## Estrutura
- HTML: `[pagina].html`
- CSS: `css/[pagina].css`
- Controller: `js/pages/[pagina]-controller.js`

## Uso
[Como usar esta página]
```

### Template: Changelog
```markdown
# Changelog

## [Versão] - [Data]
### Adicionado
- Feature 1
- Feature 2

### Modificado
- Arquivo X - [mudança]

### Corrigido
- Bug Y - [correção]
```

## Examples

**Entrada**: "Documente o módulo de storage"
**Output**: Gera `js/modules/README.md` com documentação da API

**Entrada**: "Crie documentação para a página de demandas"
**Output**: Gera `docs/demandas.md` com todas as informações

## Triggers

- "documentar"
- "criar documentação"
- "gerar docs"
- "escreva o readme"
- "crie um changelog"
