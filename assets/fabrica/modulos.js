// Módulos do "Monte o seu sistema" (sem dependências: a página lê isto antes de baixar o 3D).
export const MODULOS = {
  financeiro: { menu: "Financeiro", card: ["Saldo em caixa", "R$ 248.390,00", "+12% no mês", "#16a34a"] },
  vendas: { menu: "Vendas", card: ["Vendas do mês", "R$ 412.870,00", "86% da meta", "#3b82f6"] },
  estoque: { menu: "Estoque", card: ["Estoque crítico", "3 itens", "repor até sexta", "#f59e0b"] },
  fiscal: { menu: "Fiscal", card: ["NF-e emitidas hoje", "47", "0 rejeitadas", "#16a34a"] },
  crm: { menu: "CRM", card: ["Propostas abertas", "18", "R$ 1,2 mi no funil", "#3b82f6"] },
  loja: { menu: "Loja online", card: ["Pedidos online", "126", "hoje", "#3b82f6"] },
  paineis: { menu: "Painéis", card: ["EBITDA", "18,4%", "margem no mês", "#16a34a"] },
  ia: { menu: "Cerra.AI", card: ["Cerra.AI", "Pergunte aos documentos", "offline", "#fecb00"] },
  rh: { menu: "Pessoas", card: ["Folha de pagamento", "42 pessoas", "fecha dia 30", "#64748b"] },
};
export const MODULOS_PADRAO = ["financeiro", "vendas", "estoque", "fiscal"];
