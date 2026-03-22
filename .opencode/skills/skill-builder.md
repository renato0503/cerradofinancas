# skill-builder

## Description
Guia completo para criar novas skills para o sistema opencode. Use esta skill sempre que precisar criar uma nova skill personalizada.

## Instructions

Ao criar uma nova skill, siga este formato padrão:

```markdown
# nome-da-skill

## Description
Descrição curta do que a skill faz (1-2 frases).

## Instructions
1. Passo 1 da skill
2. Passo 2 da skill
3. Passo 3 da skill

## Examples
Exemplo de uso ou entrada/saída esperada.

## Triggers
- Quando o usuário pede para criar uma nova skill
- Quando precisa de um template de skill
```

### Regras para criar skills:

1. **Nome**: Use kebab-case (minusculo-com-hifens)
2. **Description**: Máximo 2 frases
3. **Instructions**: Seja específico e sequencial
4. **Examples**: Inclua exemplos práticos
5. **Triggers**: Liste quando usar esta skill

### Categorias de skills:

- **development**: Geração de código, refatoração
- **documentation**: Criação/atualização de docs
- **analysis**: Análise de código ou arquitetura
- **automation**: Tarefas repetitivas
- **template**: Geração de templates

### Checklist de criação:

- [ ] Nome descritivo e único
- [ ] Description clara e concisa
- [ ] Instructions detalhadas passo a passo
- [ ] Examples funcionais
- [ ] Triggers precisos
- [ ] Salvar em `.opencode/skills/`

### Passo a passo para criar uma skill:

1. Identifique o problema ou necessidade
2. Defina o nome e categoria
3. Escreva a description
4. Detalhe as instructions
5. Adicione examples relevantes
6. Defina os triggers
7. Salve em `.opencode/skills/slug.md`
8. Teste a skill

## Examples

**Entrada**: "Crie uma skill para gerar componentes React"

**Saída**: Cria arquivo `.opencode/skills/react-component.md` com estrutura completa

## Triggers

- "criar skill"
- "nova skill"
- "crie uma skill para"
- "como criar skill"
- "template de skill"
