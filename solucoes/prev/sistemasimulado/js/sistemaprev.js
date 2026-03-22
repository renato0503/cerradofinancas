/* =====================================================
   CERRADOPREV - SISTEMA SIMULADO JAVASCRIPT
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    updateTime();
    setInterval(updateTime, 1000);
    initMobileMenu();
    initTabs();
    initModals();
    initFilters();
    initChat();
    initSimulator();
    initConcessaoForm();
    initPericiaAI();
}

function updateTime() {
    const timeEl = document.getElementById('current-time');
    if (timeEl) {
        const now = new Date();
        const options = { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric',
            hour: '2-digit', 
            minute: '2-digit' 
        };
        timeEl.textContent = now.toLocaleDateString('pt-BR', options);
    }
}

function initMobileMenu() {
    const toggle = document.getElementById('mobile-toggle');
    const sidebar = document.getElementById('sidebar');
    
    if (toggle && sidebar) {
        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
        
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        });
    }
}

function navigateTo(page) {
    const content = document.getElementById('page-content');
    const breadcrumb = document.querySelector('.breadcrumb-current');
    
    const pageNames = {
        'dashboard': 'Dashboard',
        'concessoes': 'Concessões',
        'arrecadacao': 'Arrecadação',
        'comprev': 'COMPREV',
        'pericia': 'Perícia Médica',
        'portaldoservidor': 'Portal do Servidor',
        'compliance': 'Compliance',
        'financeiro': 'Financeiro',
        'atuarial': 'Atuarial',
        'configuracoes': 'Configurações'
    };
    
    if (breadcrumb) {
        breadcrumb.textContent = pageNames[page] || page;
    }
    
    if (content) {
        content.innerHTML = '<div class="loading"><div class="spinner"></div><p>Carregando...</p></div>';
        
        fetch(`pages/${page}.html`)
            .then(response => response.text())
            .then(html => {
                content.innerHTML = html;
                initComponents();
                window.scrollTo(0, 0);
            })
            .catch(error => {
                content.innerHTML = `
                    <div class="alert alert-danger">
                        <div class="alert-icon">⚠️</div>
                        <div class="alert-content">
                            <div class="alert-title">Erro ao Carregar</div>
                            <div class="alert-message">Não foi possível carregar a página ${page}. Verifique se o arquivo existe.</div>
                        </div>
                    </div>
                `;
            });
    }
    
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    const activeItem = document.querySelector(`[data-page="${page}"]`);
    if (activeItem) activeItem.classList.add('active');
    
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('open');
}

function initTabs() {
    document.querySelectorAll('.tabs').forEach(tabContainer => {
        const buttons = tabContainer.querySelectorAll('.tab-btn');
        const parent = tabContainer.closest('.card');
        
        if (parent) {
            const contents = parent.querySelectorAll('.tab-content');
            
            buttons.forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    buttons.forEach(b => b.classList.remove('active'));
                    contents.forEach(c => c.classList.remove('active'));
                    
                    btn.classList.add('active');
                    if (contents[index]) contents[index].classList.add('active');
                });
            });
        }
    });
}

function initModals() {
    document.querySelectorAll('[data-modal]').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.dataset.modal;
            openModal(modalId);
        });
    });
    
    document.querySelectorAll('.modal-close, .modal-cancel').forEach(btn => {
        btn.addEventListener('click', closeModals);
    });
    
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModals();
        });
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
}

function closeModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.classList.remove('active');
    });
}

function initFilters() {
    const filterInputs = document.querySelectorAll('.filters-bar input, .filters-bar select');
    
    filterInputs.forEach(input => {
        input.addEventListener('change', () => {
            applyFilters();
        });
    });
}

function applyFilters() {
    console.log('Filtros aplicados');
}

function initChat() {
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    
    if (chatInput && chatSend) {
        chatSend.addEventListener('click', sendChatMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendChatMessage();
        });
    }
}

function sendChatMessage() {
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    
    if (!chatInput || !chatMessages || !chatInput.value.trim()) return;
    
    const message = chatInput.value.trim();
    addChatMessage('user', message);
    chatInput.value = '';
    
    setTimeout(() => {
        const response = getBotResponse(message);
        addChatMessage('bot', response);
    }, 1000);
}

function addChatMessage(type, message) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${type}`;
    
    const avatar = type === 'bot' ? '🤖' : '👤';
    const avatarClass = type === 'bot' ? 'bg-primary' : 'bg-accent';
    
    msgDiv.innerHTML = `
        <div class="chat-message-avatar ${avatarClass}">${avatar}</div>
        <div class="chat-message-content">${message}</div>
    `;
    
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(message) {
    const lower = message.toLowerCase();
    
    if (lower.includes('aposentadoria') || lower.includes('aposent')) {
        return 'De acordo com a EC 103/2019, a aposentadoria por idade exige 65 anos (homens) ou 62 anos (mulheres) com 15 anos de contribuição. Para aposentadoria especial do magistério, o tempo mínimo é 25 anos. Posso ajudar com mais alguma dúvida?';
    }
    
    if (lower.includes('pensão') || lower.includes('pensao')) {
        return 'A pensão por morte será devida ao dependente do segurado que falecer, sendo seu valor equivalente a uma cota familiar de 50% do valor do benefício, acrescida de 10% por dependente, limitada a 100%.';
    }
    
    if (lower.includes('contribui') || lower.includes('alíquota')) {
        return 'As alíquotas de contribuição são: Servidor: 11% e Ente Público: 14% sobre a remuneração de contribuição. A taxa de administração não pode exceder 2% do valor total das contribuições.';
    }
    
    if (lower.includes('crp') || lower.includes('certificado')) {
        return 'O Certificado de Regularidade Previdenária (CRP) é emitido pela SPREV e deve ser renovado a cada 3 anos. Sua validade pode ser consultada no portal do MPS. O CRP é requisito para transferências voluntárias.';
    }
    
    if (lower.includes('comprev') || lower.includes('compensação')) {
        return 'O COMPREV é o sistema de compensação entre o RGPS e RPPS. Permite que o segurado requisite a contagem de tempo de contribuição de um regime para outro. O requerimento deve ser feito via sistema eletrônico.';
    }
    
    return 'Entendi sua dúvida! Para responder com precisão, preciso de mais detalhes. Em geral, recomendo consultar a legislação vigente ou falar com um Especialista do CerradoPrev. Posso ajudar com mais alguma questão?';
}

function initSimulator() {
    const runBtn = document.getElementById('run-simulator');
    if (runBtn) {
        runBtn.addEventListener('click', runPrevSimulation);
    }
}

function runPrevSimulation() {
    const consoleEl = document.getElementById('sim-console');
    const statusEl = document.getElementById('sim-status');
    const btn = document.getElementById('run-simulator');
    
    if (!consoleEl || !statusEl) return;
    
    btn.disabled = true;
    btn.innerHTML = '⏳ Processando...';
    
    const steps = [
        { text: 'Conectando ao COMPREV...', type: '', delay: 0 },
        { text: 'Validando dados do servidor...', type: '', delay: 800 },
        { text: 'Verificando tempo de contribuição: 25 anos', type: 'success', delay: 1600 },
        { text: 'Aplicando regras EC 103/2019...', type: '', delay: 2400 },
        { text: 'Validando paridade e integralidade...', type: 'success', delay: 3200 },
        { text: 'Gerando memória de cálculo...', type: '', delay: 4000 },
        { text: 'Emitindo portaria de concessão...', type: 'success', delay: 4800 },
        { text: '✅ CONCESSÃO APROVADA - Aposentadoria por Idade com Paridade', type: 'success', delay: 5600 }
    ];
    
    consoleEl.innerHTML = '';
    
    steps.forEach((step, index) => {
        setTimeout(() => {
            const line = document.createElement('div');
            line.className = `console-line ${step.type}`;
            line.textContent = step.text;
            consoleEl.appendChild(line);
            
            if (index === 2 || index === 4) {
                statusEl.textContent = 'Processando...';
                statusEl.className = 'badge badge-warning';
            }
            
            if (index === 6) {
                statusEl.textContent = 'Finalizando...';
                statusEl.className = 'badge badge-info';
            }
            
            if (index === 7) {
                statusEl.textContent = 'Aprovado';
                statusEl.className = 'badge badge-success';
                btn.disabled = false;
                btn.innerHTML = '🔄 Novo Cálculo';
            }
            
            consoleEl.scrollTop = consoleEl.scrollHeight;
        }, step.delay);
    });
}

function initConcessaoForm() {
    const form = document.getElementById('concessao-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            submitConcessao();
        });
    }
}

function submitConcessao() {
    const btn = document.querySelector('#modal-concessao .btn-primary');
    if (btn) {
        btn.innerHTML = '⏳ Salvando...';
        btn.disabled = true;
        
        setTimeout(() => {
            closeModals();
            btn.innerHTML = '💾 Salvar';
            btn.disabled = false;
            
            showToast('Requerimento salvo com sucesso!', 'success');
            
            const tableBody = document.querySelector('tbody');
            if (tableBody) {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>#${Math.floor(Math.random() * 1000)}</td>
                    <td>Novo Servidor</td>
                    <td>00000-0</td>
                    <td>Aposentadoria</td>
                    <td>${new Date().toLocaleDateString('pt-BR')}</td>
                    <td><span class="badge badge-pending">⏳ Análise</span></td>
                    <td>
                        <div class="table-actions">
                            <button class="btn-table view">👁️ Ver</button>
                            <button class="btn-table edit">✏️ Editar</button>
                        </div>
                    </td>
                `;
                tableBody.prepend(newRow);
            }
        }, 1500);
    }
}

function initPericiaAI() {
    const analyzeBtn = document.getElementById('analyze-pericia');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', analyzeAtestado);
    }
}

function analyzeAtestado() {
    const resultEl = document.getElementById('pericia-result');
    const confidenceEl = document.getElementById('pericia-confidence');
    const btn = document.getElementById('analyze-pericia');
    
    if (!resultEl || !btn) return;
    
    btn.innerHTML = '⏳ Analisando com IA...';
    btn.disabled = true;
    
    setTimeout(() => {
        const cids = [
            { cid: 'J44.9', desc: 'Doença Pulmonar Obstrutiva Crônica', conf: 94 },
            { cid: 'M54.5', desc: 'Lombalgia', conf: 78 },
            { cid: 'I10', desc: 'Hipertensão Arterial', conf: 65 }
        ];
        
        const best = cids[Math.floor(Math.random() * cids.length)];
        
        resultEl.innerHTML = `
            <div class="pericia-suggestion">
                <h4>🤖 CID Sugerido</h4>
                <div class="cid-code">${best.cid}</div>
                <p class="cid-desc">${best.desc}</p>
                <div class="confidence-bar">
                    <div class="confidence-label">
                        <span>Confiança</span>
                        <strong>${best.conf}%</strong>
                    </div>
                    <div class="progress">
                        <div class="progress-bar success" style="width: ${best.conf}%"></div>
                    </div>
                </div>
                <div class="mt-2 d-flex gap-1">
                    <button class="btn btn-success btn-sm" onclick="confirmCID('${best.cid}')">✅ Validar e Emitir Laudo</button>
                    <button class="btn btn-secondary btn-sm" onclick="initPericiaAI()">🔄 Analisar Novamente</button>
                </div>
            </div>
        `;
        
        btn.innerHTML = '🔍 Analisar com IA';
        btn.disabled = false;
    }, 2500);
}

function confirmCID(cid) {
    showToast(`LaudoEmitido com CID ${cid}!`, 'success');
    
    const resultEl = document.getElementById('pericia-result');
    if (resultEl) {
        resultEl.innerHTML = `
            <div class="alert alert-success">
                <div class="alert-icon">✅</div>
                <div class="alert-content">
                    <div class="alert-title">Laudo Emitido com Sucesso</div>
                    <div class="alert-message">CID ${cid} validado e laudo assinado digitalmente.</div>
                </div>
            </div>
        `;
    }
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    container.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function initComponents() {
    initTabs();
    initModals();
    initFilters();
    initChat();
    initSimulator();
    initConcessaoForm();
    initPericiaAI();
}

function exportTable(tableId, format) {
    showToast(`Exportando tabela em ${format.toUpperCase()}...`, 'info');
    setTimeout(() => {
        showToast(`Tabela exportada com sucesso!`, 'success');
    }, 1500);
}

function openSimulatorPage() {
    navigateTo('concessoes');
}

function openNewRequerimento() {
    openModal('modal-concessao');
}
