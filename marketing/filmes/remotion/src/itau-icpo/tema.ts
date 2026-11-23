// Tema da vinheta ICPO: fundo claro, tinta escura, laranja Itaú (#FF6200).
import { Easing } from "remotion";

export const tema = {
  cor: { fundo: "#f6f5f2", papel: "#ffffff", tinta: "#1d2732", cinza: "#4f5e6e", apagado: "#8794a2", fio: "#e3e5e8", laranja: "#ff6200", esc: "#a94100" },
  kpi: [
    { nome: "Sucesso", peso: "35%", cor: "#ff6200", h: 0.8 },
    { nome: "SLA", peso: "30%", cor: "#1d2732", h: 0.7 },
    { nome: "Lead time", peso: "20%", cor: "#6b8bb0", h: 0.6 },
    { nome: "Custo", peso: "15%", cor: "#d9a066", h: 0.5 },
  ],
  fonte: { texto: "ICPOInter, sans-serif", mono: "ICPOMono, monospace" },
  ease: {
    out: Easing.bezier(0.16, 1, 0.3, 1),
    inOut: Easing.bezier(0.83, 0, 0.17, 1),
    in: Easing.bezier(0.7, 0, 0.84, 0),
  },
  mola: { viva: { damping: 14, stiffness: 160, mass: 0.6 }, macia: { damping: 20, stiffness: 90, mass: 1 } },
};
