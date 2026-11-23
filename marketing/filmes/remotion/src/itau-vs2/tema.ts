// Tema único da vinheta: azul-noite + laranja Itaú. Nada de cor ou curva inline nos componentes.
import { Easing } from "remotion";

export const tema = {
  cor: {
    noite: "#050c1f",
    noite2: "#0b1a3f",
    laranja: "#ff7a1a",
    itau: "#ec7000",
    ouro: "#ffc06a",
    branco: "#f3f6fd",
    cinza: "#b3bfd8",
    apagado: "#8996b3",
    vidro: "#16254a",
    vidroBorda: "rgba(255,255,255,.14)",
  },
  fonte: { texto: "VS2Inter, sans-serif", mono: "VS2Mono, monospace" },
  ease: {
    out: Easing.bezier(0.16, 1, 0.3, 1),
    inOut: Easing.bezier(0.83, 0, 0.17, 1),
    in: Easing.bezier(0.7, 0, 0.84, 0),
  },
  mola: {
    viva: { damping: 14, stiffness: 160, mass: 0.6 },
    macia: { damping: 20, stiffness: 90, mass: 1 },
  },
};
