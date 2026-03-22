# analytics-enhancer

## Description
Expande as capacidades analíticas do painel com métricas avançadas, KPIs customizáveis e insights automatizados.

## Instructions

### 1. Métricas Atuais
O projeto usa Chart.js com:
- Gráfico de bairros (barras)
- Gráfico de categorias (rosca)

### 2. Novas Métricas a Adicionar

#### 2.1 Indicadores Temporais
```javascript
function calcularTendencia(dados) {
  const hoje = new Date();
  const seteDias = dados.filter(d => {
    const dataDemanda = new Date(d.data);
    return (hoje - dataDemanda) < 7 * 24 * 60 * 60 * 1000;
  });
  
  return {
    ultimaSemana: seteDias.length,
    mediaDiaria: (seteDias.length / 7).toFixed(1),
    comparacaoSemanaAnterior: calcularComparacao(dados)
  };
}
```

#### 2.2 Tempo Médio de Resposta
```javascript
function tempoMedioResposta(dados) {
  const resolvidas = dados.filter(d => 
    d.status === 'Respondida' || d.status === 'Encerrada'
  );
  
  const tempos = resolvidas.map(d => {
    const inicio = new Date(d.data);
    const resposta = d.dataResposta ? new Date(d.dataResposta) : new Date();
    return (resposta - inicio) / (1000 * 60 * 60 * 24); // dias
  });
  
  return (tempos.reduce((a, b) => a + b, 0) / tempos.length).toFixed(1);
}
```

#### 2.3 NPS Simples
```javascript
function calcularNPS(dados) {
  const positivos = dados.filter(d => d.status === 'Encerrada').length;
  const total = dados.filter(d => d.status !== 'Nova').length;
  return total > 0 ? Math.round((positivos / total) * 100) : 0;
}
```

#### 2.4 Heatmap de Urgência
```javascript
function gerarHeatmapUrgencia(dados) {
  const mapa = {};
  dados.forEach(d => {
    const key = `${d.bairro}-${d.categoria}`;
    mapa[key] = (mapa[key] || 0) + (d.prioridade === 'Alta' ? 3 : d.prioridade === 'Média' ? 2 : 1);
  });
  return mapa;
}
```

### 3. Insights Automatizados

```javascript
// js/modules/insights.js
export function gerarInsights(dados) {
  const insights = [];
  
  // Insight de bairro crítico
  const bairros = agregar(dados, 'bairro');
  const bairroPior = Object.entries(bairros).sort((a, b) => b[1] - a[1])[0];
  if (bairroPior[1] > dados.length * 0.3) {
    insights.push({
      tipo: 'alerta',
      mensagem: `${bairroPior[0]} concentra ${bairroPior[1]} demandas (${Math.round(bairroPior[1]/dados.length*100)}%)`
    });
  }
  
  // Insight de categoria crescente
  // ...
  
  return insights;
}
```

### 4. Dashboard Template

```html
<div class="analytics-grid">
  <div class="kpi-card">
    <span class="kpi-label">TMA</span>
    <span class="kpi-value" id="tma">0</span>
    <span class="kpi-unit">dias</span>
  </div>
  
  <div class="kpi-card">
    <span class="kpi-label">NPS</span>
    <span class="kpi-value" id="nps">0</span>
    <span class="kpi-unit">%</span>
  </div>
  
  <div class="insight-card">
    <div class="insight-icon">💡</div>
    <div class="insight-text" id="insight-principal"></div>
  </div>
</div>
```

## Triggers

- "métricas"
- "analytics"
- "insights"
- "dashboard avançado"
- "kpis"
