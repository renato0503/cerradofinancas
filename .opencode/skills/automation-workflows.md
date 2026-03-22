# automation-workflows

## Description
Cria fluxos de automação para follow-up de demandas, templates de resposta e agendamento de notificações.

## Instructions

### 1. Sistema de Templates de Resposta

#### 1.1 Template Manager
```javascript
// js/modules/template-manager.js
const TEMPLATES = {
  agradecimento: {
    titulo: "Agradecimento",
    mensagem: "Olá, {nome}! Recebemos sua demanda sobre {categoria} e estamos trabalhando para solucioná-la. Em breve entraremos em contato."
  },
  retorno: {
    titulo: "Retorno com Solução",
    mensagem: "Olá, {nome}! Gostaríamos de informar que sua demanda sobre {categoria} foi {status}. Qualquer dúvida, estamos à disposição."
  },
  pendencia: {
    titulo: "Demanda em Análise",
    mensagem: "Olá, {nome}! Sua demanda sobre {categoria} está sendo analisada pela nossa equipe. Previsão de retorno: {prazo}."
  }
};

export function aplicarTemplate(nomeTemplate, dados) {
  const template = TEMPLATES[nomeTemplate];
  if (!template) return '';
  
  let mensagem = template.mensagem;
  Object.entries(dados).forEach(([key, value]) => {
    mensagem = mensagem.replace(new RegExp(`{${key}}`, 'g'), value);
  });
  return mensagem;
}
```

### 2. Sistema de Follow-up

#### 2.1 Queue de Follow-up
```javascript
// js/modules/followup-manager.js
const STORAGE_FOLLOWUP = 'elo_followup_v1';

export const FollowupManager = {
  agendar: (demanda, diasApos) => {
    const followups = this.obterPendentes();
    const dataAgenda = new Date();
    dataAgenda.setDate(dataAgenda.getDate() + diasApos);
    
    followups.push({
      id: demanda.id,
      nome: demanda.nome,
      telefone: demanda.contato,
      dataAgendada: dataAgenda.toISOString(),
      tentativas: 0
    });
    
    localStorage.setItem(STORAGE_FOLLOWUP, JSON.stringify(followups));
  },
  
  obterPendentes: () => {
    return JSON.parse(localStorage.getItem(STORAGE_FOLLOWUP)) || [];
  },
  
  processarPendentes: () => {
    const hoje = new Date();
    const pendentes = FollowupManager.obterPendentes();
    
    pendentes.forEach(f => {
      if (new Date(f.dataAgendada) <= hoje) {
        // Disparar notificação/ação
        FollowupManager.executar(f);
      }
    });
  }
};
```

### 3. Workflows Automáticos

```javascript
// js/modules/workflow-engine.js
const WORKFLOWS = [
  {
    nome: "Auto-classificação",
    trigger: "demanda.criada",
    acoes: ["classificarDemanda", "definirPrioridade", "notificarEquipe"]
  },
  {
    nome: "Follow-up 7 dias",
    trigger: "demanda.status=Nova",
    acoes: ["agendarFollowup:7", "enviarMensagemOla"]
  },
  {
    nome: "Escalonamento",
    trigger: "demanda.prioridade=Alta",
    acoes: ["notificarUrgente", "destacarPainel"]
  },
  {
    nome: "Encerramento",
    trigger: "demanda.status=Encerrada",
    acoes: ["enviarPesquisaSatisfacao", " arquivar"]
  }
];

export function executarWorkflow(trigger, dados) {
  const workflows = WORKFLOWS.filter(w => w.trigger === trigger);
  workflows.forEach(w => {
    w.acoes.forEach(acao => executarAcao(acao, dados));
  });
}
```

### 4. Mensagens Agendadas

```javascript
// js/modules/message-queue.js
export function agendarMensagem(mensagem, data, destino) {
  const fila = JSON.parse(localStorage.getItem('fila_mensagens') || '[]');
  fila.push({
    id: Date.now(),
    mensagem,
    dataEnvio: data.toISOString(),
    destino,
    status: 'agendada'
  });
  localStorage.setItem('fila_mensagens', JSON.stringify(fila));
}

export function processarFila() {
  const fila = JSON.parse(localStorage.getItem('fila_mensagens') || '[]');
  const agora = new Date();
  
  fila.forEach(item => {
    if (new Date(item.dataEnvio) <= agora && item.status === 'agendada') {
      abrirWhatsApp(item.destino, item.mensagem);
      item.status = 'enviada';
    }
  });
  
  localStorage.setItem('fila_mensagens', JSON.stringify(fila));
}
```

## Triggers

- "automação"
- "follow-up"
- "template de mensagem"
- "workflow"
- "agendar"
