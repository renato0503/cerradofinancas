// Conteúdo dos Reels por frente. Cada Reel = gancho + 3 blocos + fechamento.
// Ícones pelo nome do Phosphor (https://phosphoricons.com), ex.: "Code", "HandCoins".
import { theme } from "./theme";
import { CAMPANHAS_CURSOS } from "./cursosCerraclass";

export type Item = { icone: string; titulo: string; texto?: string };

export type Bloco =
  | { tipo: "lista"; kicker: string; titulo: string; itens: Item[] }
  | { tipo: "passos"; kicker: string; titulo: string; passos: { titulo: string; texto: string }[] }
  | { tipo: "contraste"; kicker: string; titulo: string; ruim: { rotulo: string; itens: string[] }; bom: { rotulo: string; itens: string[] } }
  | { tipo: "numeros"; kicker: string; titulo: string; numeros: { valor: string; legenda: string }[] };

export type Campanha = {
  cor: string;
  icone: string;
  kicker: string;
  gancho: string;          // título do gancho
  destaque: string[];      // palavras do gancho na cor da frente
  sub: string;
  parceriaLS?: boolean;
  blocos: [Bloco, Bloco, Bloco];
  fechamento: { titulo: string; destaque: string[]; principal: { icone: string; texto: string }; secundario: { icone: string; texto: string }; aviso?: string };
};

const WHATS = { icone: "WhatsappLogo", texto: "(67) 99351-5206" };
const SITE = { icone: "Globe", texto: "cerradofinancas.com.br" };

export const CAMPANHAS: Record<string, Campanha> = {
  software: {
    cor: theme.frentes.software, icone: "Code", kicker: "Fábrica de Software",
    gancho: "Seu negócio não cabe num software de prateleira.", destaque: ["prateleira."],
    sub: "Construímos o sistema em torno do seu processo.",
    blocos: [
      {
        tipo: "contraste", kicker: "A diferença", titulo: "Prateleira ou sob medida?",
        ruim: { rotulo: "Prateleira", itens: ["Funções que você nunca usa", "Sua equipe se adapta", "Ajuste vira projeto à parte"] },
        bom: { rotulo: "Sob medida", itens: ["Feito para o seu processo", "O sistema se adapta", "O código é seu"] },
      },
      {
        tipo: "lista", kicker: "O que construímos", titulo: "Do ERP à IA",
        itens: [
          { icone: "SquaresFour", titulo: "ERPs e CRMs", texto: "Integrados com SAP®, TOTVS e bancos" },
          { icone: "Cpu", titulo: "IA offline", texto: "Seus dados não saem de casa" },
          { icone: "ChartBar", titulo: "Dashboards e BI", texto: "Números em tempo real" },
          { icone: "Bank", titulo: "GovTech", texto: "Soluções para a gestão pública" },
        ],
      },
      {
        tipo: "passos", kicker: "Como trabalhamos", titulo: "Sem atalhos, sem surpresas",
        passos: [
          { titulo: "Descoberta", texto: "Imersão no seu processo" },
          { titulo: "Protótipo", texto: "Você valida antes do código" },
          { titulo: "Sprints semanais", texto: "Entregas que você testa" },
          { titulo: "Evolução", texto: "Treinamento e melhorias" },
        ],
      },
    ],
    fechamento: { titulo: "Qual software o seu negócio precisa?", destaque: ["precisa?"], principal: SITE, secundario: WHATS },
  },

  contabilidade: {
    cor: theme.frentes.contabil, icone: "Calculator", kicker: "Cerrado Contabilidade",
    gancho: "Seu contador te ajuda a decidir?", destaque: ["decidir?"],
    sub: "Contabilidade 100% digital, com dados para decidir.",
    blocos: [
      {
        tipo: "lista", kicker: "Burocracia é com a gente", titulo: "Do CNPJ à folha",
        itens: [
          { icone: "RocketLaunch", titulo: "Abertura de CNPJ", texto: "Rápida e 100% digital" },
          { icone: "Receipt", titulo: "Gestão tributária", texto: "Simples Nacional e declarações" },
          { icone: "Users", titulo: "Folha e eSocial", texto: "Férias, 13º e guias" },
          { icone: "WhatsappLogo", titulo: "Suporte humano", texto: "Direto no WhatsApp" },
        ],
      },
      {
        tipo: "lista", kicker: "Para quem é", titulo: "Especialistas no seu negócio",
        itens: [
          { icone: "Laptop", titulo: "Prestadores PJ", texto: "Tributação otimizada" },
          { icone: "Stethoscope", titulo: "Saúde", texto: "Fator R para reduzir a alíquota" },
          { icone: "Storefront", titulo: "Comércio e e-commerce", texto: "ICMS, ST e notas em dia" },
        ],
      },
      {
        tipo: "passos", kicker: "Além do básico", titulo: "Da planilha ao painel",
        passos: [
          { titulo: "Diagnóstico", texto: "Contas e custos organizados" },
          { titulo: "BPO", texto: "Base de dados confiável" },
          { titulo: "Automação", texto: "Fim da digitação dupla" },
          { titulo: "BI executivo", texto: "DRE e metas no celular" },
        ],
      },
    ],
    fechamento: { titulo: "Decisão baseada em dados.", destaque: ["dados."], principal: WHATS, secundario: SITE },
  },

  credito: {
    cor: theme.frentes.credito, icone: "HandCoins", kicker: "Crédito multi bancos",
    gancho: "Antes de assinar, compare.", destaque: ["compare."],
    sub: "Vários bancos em uma só consulta.", parceriaLS: true,
    blocos: [
      {
        tipo: "lista", kicker: "Produtos", titulo: "Crédito para cada momento",
        itens: [
          { icone: "Money", titulo: "Empréstimos", texto: "Pessoal e capital de giro" },
          { icone: "IdentificationCard", titulo: "Consignados", texto: "INSS, servidores e portabilidade" },
          { icone: "HouseLine", titulo: "Financiamentos", texto: "Imóveis, veículos e máquinas" },
          { icone: "ShieldCheck", titulo: "Seguros e consórcios", texto: "Cotação em várias empresas" },
        ],
      },
      {
        tipo: "passos", kicker: "Como funciona", titulo: "Do contato ao dinheiro na conta",
        passos: [
          { titulo: "Conversa", texto: "Quanto cabe no seu orçamento" },
          { titulo: "Simulação", texto: "Vários bancos comparados" },
          { titulo: "Você escolhe", texto: "Sem pressão" },
          { titulo: "Contratação", texto: "Acompanhada até a liberação" },
        ],
      },
      {
        tipo: "lista", kicker: "Por que com a Cerrado", titulo: "Quem entende de finanças",
        itens: [
          { icone: "Scales", titulo: "Comparação real", texto: "Olhando o custo total" },
          { icone: "ChartPieSlice", titulo: "Visão do caixa", texto: "A parcela precisa caber" },
          { icone: "ChatsCircle", titulo: "Atendimento humano", texto: "Do início ao fim" },
        ],
      },
    ],
    fechamento: {
      titulo: "Simulação gratuita e sem compromisso.", destaque: ["gratuita"], principal: WHATS,
      secundario: { icone: "Globe", texto: "cerradofinancas.com.br/credito" },
      aviso: "Em parceria com a LS Intermediação Financeira. Correspondente bancário, não é instituição financeira. Crédito sujeito a análise e aprovação.",
    },
  },

  cursos: {
    cor: theme.frentes.cursos, icone: "GraduationCap", kicker: "Cerraclass",
    gancho: "Pare de só usar IA. Construa com ela.", destaque: ["Construa"],
    sub: "Treinamentos presenciais e 100% práticos.",
    blocos: [
      {
        tipo: "numeros", kicker: "O formato", titulo: "Turma pequena, mão na massa",
        numeros: [
          { valor: "até 10", legenda: "pessoas por turma" },
          { valor: "100%", legenda: "prático" },
          { valor: "10h", legenda: "de imersão" },
          { valor: "0", legenda: "código exigido" },
        ],
      },
      {
        tipo: "lista", kicker: "O que você aprende", titulo: "Ferramentas de quem constrói",
        itens: [
          { icone: "Code", titulo: "IDE Antigravity", texto: "Sua oficina digital" },
          { icone: "Sparkle", titulo: "Claude, Gemini e ChatGPT", texto: "No seu dia a dia" },
          { icone: "AppWindow", titulo: "Apps e automações", texto: "Fim do trabalho repetitivo" },
        ],
      },
      {
        tipo: "contraste", kicker: "O que muda", titulo: "De usuário a construtor",
        ruim: { rotulo: "Antes", itens: ["Refém de ferramentas", "Tarefas repetitivas", "Tudo espalhado"] },
        bom: { rotulo: "Depois", itens: ["Autonomia", "Tempo de volta", "Organização"] },
      },
    ],
    fechamento: {
      titulo: "Garanta sua vaga na próxima turma.", destaque: ["próxima", "turma."],
      principal: { icone: "GraduationCap", texto: "cerraclass.com.br" }, secundario: WHATS,
    },
  },

  // ---------------------------------------------------------------- cursos da Cerraclass

  iaNaPratica: {
    cor: theme.frentes.cursos, icone: "Lightning", kicker: "Cerraclass · IA na Prática",
    gancho: "Saia da sala com seus próprios apps funcionando.", destaque: ["apps"],
    sub: "10h de imersão presencial, sem saber programar.",
    blocos: [
      {
        tipo: "lista", kicker: "Você se reconhece?", titulo: "Usa IA, mas ainda depende dos outros?",
        itens: [
          { icone: "Files", titulo: "Bagunça digital", texto: "Arquivos espalhados por todo lado" },
          { icone: "HourglassMedium", titulo: "Dependência", texto: "Esperando o TI para ter seu app" },
          { icone: "ChatDots", titulo: "Uso superficial", texto: "Só pedindo textos para a IA" },
        ],
      },
      {
        tipo: "lista", kicker: "O que você constrói", titulo: "Nada de dicas de prompt",
        itens: [
          { icone: "AppWindow", titulo: "Apps sob medida", texto: "Ferramentas para a sua rotina" },
          { icone: "Books", titulo: "Base de conhecimento", texto: "A IA acha seus arquivos" },
          { icone: "Robot", titulo: "Automações reais", texto: "O trabalho pesado na máquina" },
          { icone: "Sparkle", titulo: "IA consultora", texto: "Claude, Gemini e ChatGPT" },
        ],
      },
      {
        tipo: "numeros", kicker: "O formato", titulo: "Um dia que muda a sua semana",
        numeros: [
          { valor: "10", legenda: "vagas por turma" },
          { valor: "10h", legenda: "de imersão" },
          { valor: "100%", legenda: "prático" },
          { valor: "0", legenda: "código exigido" },
        ],
      },
    ],
    fechamento: {
      titulo: "Garanta sua vaga. São só 10.", destaque: ["10."],
      principal: { icone: "GraduationCap", texto: "cerraclass.com.br" }, secundario: WHATS,
    },
  },

  iaFarma: {
    cor: "#2dd4bf", icone: "Pill", kicker: "Cerraclass · IA em Ação Farma",
    gancho: "Propagandista, a IA trabalha com você.", destaque: ["com", "você."],
    sub: "Apps, conteúdos e automações para a rotina de campo.",
    blocos: [
      {
        tipo: "lista", kicker: "A sua semana", titulo: "Tarefas que a IA faz com você",
        itens: [
          { icone: "NotePencil", titulo: "Comentários de visita", texto: "Depois de cada médico" },
          { icone: "Files", titulo: "Materiais espalhados", texto: "Entre e-mail e WhatsApp" },
          { icone: "Repeat", titulo: "Tarefas repetitivas", texto: "Toda semana, o mesmo padrão" },
        ],
      },
      {
        tipo: "lista", kicker: "IAs no campo", titulo: "Claude, Gemini e ChatGPT na rotina",
        itens: [
          { icone: "Image", titulo: "Folder a partir de fotos", texto: "Arte pronta para o grupo" },
          { icone: "ChatText", titulo: "Comentário de visita", texto: "Estruturado pela IA" },
          { icone: "UsersFour", titulo: "Treino por perfil", texto: "Para cada tipo de médico" },
          { icone: "Stethoscope", titulo: "Médico virtual", texto: "Simule antes da visita" },
        ],
      },
      {
        tipo: "contraste", kicker: "O que muda", titulo: "Mais campo, menos planilha",
        ruim: { rotulo: "Antes", itens: ["Fila esperando ajuda", "Horas no repetitivo", "Treino sem parceiro"] },
        bom: { rotulo: "Depois", itens: ["Você mesmo constrói", "Tempo de campo", "Médico virtual"] },
      },
    ],
    fechamento: {
      titulo: "Turmas de 10 pessoas. Por método.", destaque: ["10"],
      principal: { icone: "GraduationCap", texto: "cerraclass.com.br" }, secundario: WHATS,
    },
  },
  ...CAMPANHAS_CURSOS,
};
