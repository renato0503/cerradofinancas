# bug-fixer

## Description
Sistema estruturado para identificar, analisar e corrigir bugs no projeto EloEleitoral de forma eficiente.

## Instructions

### Fase 1: Identificação
1. Identifique o arquivo/componente com problema
2. Descreva o comportamento esperado vs atual
3. Reproduza o erro localmente

### Fase 2: Análise
1. Use `grep` para buscar padrões relacionados
2. Verifique arquivos de mesmo módulo
3. Analise dependências e imports
4. Teste em isolamento se possível

### Fase 3: Correção
1. Aplique a correção mínima necessária
2. Evite refatorações não relacionadas
3. Mantenha compatibilidade com dados existentes

### Fase 4: Verificação
1. Teste o cenário do bug
2. Verifique casos relacionados
3. Confirme que não quebrou outras funcionalidades

## Estrutura de Bug Report

```
## Bug: [Título Descritivo]
**Severidade**: Crítica/Alta/Média/Baixa
**Arquivo**: [caminho/arquivo.js]
**Linha**: [número]

### Descrição
[Comportamento observedo]

### Comportamento Esperado
[O que deveria acontecer]

### Passos para Reproduzir
1. Vá para...
2. Clique em...
3. Observe...

### Solução Aplicada
[Código da correção]
```

## Padrões Comuns de Bugs

### localStorage
- Verificar se chave existe antes de usar
- Tratar dados nulos/vazios com defaults
- Sincronizar entre múltiplas abas

### Eventos DOM
- Verificar se elemento existe antes de vincular
- Remover listeners duplicados
- Usar delegação de eventos quando possível

### Assíncronia
- Tratar erros com try/catch
- Verificar estado antes de atualizar UI
- Evitar race conditions com async/await

### CSS
- Verificar especificidade
- Testar em diferentes navegadores
- Garantir responsividade

## Examples

**Entrada**: "Bug: botão de excluir não funciona no painel"
**Processo**:
1. Localiza `painel.html` e scripts relacionados
2. Identifica que evento não está vinculado
3. Adiciona listener correto
4. Testa funcionalidade

**Entrada**: "Erro ao carregar demandas do localStorage"
**Processo**:
1. Verifica `storage.js`
2. Adiciona verificação de dados nulos
3. Implementa fallback para array vazio

## Triggers

- "bug"
- "erro"
- "não funciona"
- "corrigir"
- "problema em"
- "falha ao"
