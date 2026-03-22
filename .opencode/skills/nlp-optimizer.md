# nlp-optimizer

## Description
Melhora e expande o sistema de classificação automática de demandas usando NLP e machine learning básico.

## Instructions

### 1. Análise do Sistema Atual
O projeto já possui `classificador.js` com:
- Dicionário de categorias por palavras-chave
- Matching simples por presença de palavras

### 2. Estratégias de Melhoria

#### 2.1 Expansão do Dicionário
```javascript
// Adicionar sinônimos e variações
const EXPANSOES = {
    "buraco": ["depressão", "vala", "risco", "ondulação"],
    "saúde": ["clínica", "atendimento", "ubs", "usf", "samu"],
    // ...
};
```

#### 2.2 Scoring Ponderado
```javascript
// Palavras com peso maior
const PESOS = {
    "urgente": 3,
    "emergência": 3,
    "crítico": 2,
    "faltando": 2
};
```

#### 2.3 Detecção de Urgência
```javascript
function detectarUrgencia(texto) {
    const palavrasUrgentes = ["urgente", "emergência", "crítico", "imediato"];
    const textoLower = texto.toLowerCase();
    return palavrasUrgentes.some(p => textoLower.includes(p));
}
```

#### 2.4 Sugestão de Prioridade
```javascript
function sugerirPrioridade(texto, categoria) {
    let pontos = 0;
    if (detectarUrgencia(texto)) pontos += 2;
    if (["Saúde", "Segurança"].includes(categoria)) pontos += 1;
    return pontos >= 3 ? "Alta" : pontos >= 1 ? "Média" : "Baixa";
}
```

### 3. Implementação

Edite `js/modules/classificador.js`:
1. Adicione método `expandirDicionario()`
2. Implemente scoring com pesos
3. Adicione detecção de sentimentos negativos
4. Calcule urgência automaticamente
5. Exporte funções melhoradas

### 4. Testes
- Testar com mensagens do `sementes.json`
- Verificar classificação de edge cases
- Validar detecção de urgência

## Examples

**Entrada**: "A praça central está completamente abandonada,灯坏了 há mais de um mês e ninguém faz nada!"
**Saída**: Categoria: Segurança, Urgência: Alta, Prioridade: Alta

**Entrada**: "Solicito informações sobre o programa demerde básicas"
**Saída**: Categoria: Assistência Social, Urgência: Baixa

## Triggers

- "melhorar classificação"
- "expandir dicionário"
- "detectar urgência"
- "nlp"
- "machine learning"
