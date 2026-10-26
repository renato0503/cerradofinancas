// Reels dos cursos presenciais da Cerraclass, gerados de marketing/dados/cerraclass-cursos.json
// (atualize com: node tools/importar-cerraclass.mjs). Mesma cor/ícone dos carrosséis.
import dados from "../../dados/cerraclass-cursos.json";
import type { Campanha } from "./campanhas";

type Curso = (typeof dados.cursos)[number];

// slug do Reel, cor e ícone Phosphor (os mesmos de tools/gerar_cursos_cerraclass.py)
const VISUAL: Record<string, [string, string, string]> = {
  "pres-ia-gestao": ["IaNaGestao", "#a78bfa", "ChartLineUp"],
  "pres-excel-ia": ["ExcelComIa", "#4ade80", "Table"],
  "pres-consultoria-contabil-ia": ["ConsultoriaContabilIa", "#2dd4bf", "Calculator"],
  "pres-consultoria-financeira-ia": ["ConsultoriaFinanceiraIa", "#fbbf24", "Bank"],
  "pres-intro-analise-dados": ["AnaliseDeDados", "#38bdf8", "ChartBar"],
  "pres-bpmn-ia": ["BpmnComIa", "#fb7185", "TreeStructure"],
  "pres-intro-automacao-ia": ["AutomacaoComIa", "#fb923c", "Lightning"],
  "pres-ciencia-dados-aplicada": ["CienciaDeDados", "#818cf8", "Flask"],
  "pres-ia-farma": ["IaNaFarma", "#f472b6", "Pill"],
  "pres-bi-dashboards-ia": ["BiDashboardsIa", "#22d3ee", "Gauge"],
  "pres-prototipacao-apps-ia": ["PrototipacaoAppsIa", "#e879f9", "DeviceMobile"],
};

const campanha = (c: Curso): Campanha => {
  const [, cor, icone] = VISUAL[c.id];
  const imersao = c.format === "imersao";
  const palavras = c.title.split(" ");
  return {
    cor,
    icone,
    kicker: `Cerraclass · ${c.category}`,
    gancho: c.title,
    destaque: palavras.includes("IA") ? ["IA"] : [palavras[palavras.length - 1]],
    sub: c.description,
    blocos: [
      {
        tipo: "lista", kicker: "Para quem é", titulo: "Feito para você",
        itens: c.audience.slice(0, 3).map((a, i) => ({ icone: ["UserCircle", "UsersThree", "Briefcase"][i], titulo: a })),
      },
      {
        tipo: "passos", kicker: "Programa", titulo: imersao ? "4 encontros" : "4 blocos no sábado",
        passos: c.program.slice(0, 4).map((p) => ({ titulo: p.title, texto: p.when.replace(/^Encontro \d · /, "") })),
      },
      {
        tipo: "numeros", kicker: "O formato", titulo: "Presencial, em Cuiabá",
        numeros: [
          { valor: dados.formatos[c.format as "um-dia" | "imersao"].totalHours, legenda: imersao ? "em 2 fins de semana" : "em 1 sábado" },
          { valor: "15", legenda: "alunos por turma" },
          { valor: "100%", legenda: "prático" },
          { valor: String(c.deliverables.length), legenda: "entregáveis prontos" },
        ],
      },
    ],
    fechamento: {
      titulo: "Garanta sua vaga na próxima turma.", destaque: ["próxima", "turma."],
      principal: { icone: "GraduationCap", texto: "cerraclass.com.br" },
      secundario: { icone: "WhatsappLogo", texto: "(67) 99351-5206" },
    },
  };
};

/** { "cursoExcelComIa": Campanha, ... } e a lista [idComposição, chave] para o Root. */
export const CAMPANHAS_CURSOS: Record<string, Campanha> = Object.fromEntries(
  dados.cursos.map((c) => [`curso${VISUAL[c.id][0]}`, campanha(c)]),
);

export const COMPOSICOES_CURSOS = dados.cursos.map((c) => [`ReelCurso${VISUAL[c.id][0]}`, `curso${VISUAL[c.id][0]}`] as const);
