// Fonte única de cores, curvas, molas e fontes. Nada disso vai inline nos componentes.
import { Easing } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
});

export const theme = {
  colors: {
    bg: "#000f2e",
    bgAlt: "#001f5c",
    primary: "#fecb00", // dourado da marca: no máximo um elemento por quadro
    accent: "#2563eb",
    text: "#f8fafc",
    textDim: "#cbd5e1",
    glow: "rgba(254, 203, 0, 0.45)",
    surface: "rgba(255, 255, 255, 0.07)",
    surfaceBorder: "rgba(255, 255, 255, 0.14)",
  },
  // Cor de destaque de cada frente (a mesma do carrossel)
  frentes: {
    software: "#38bdf8",
    contabil: "#4ade80",
    credito: "#fecb00",
    cursos: "#a78bfa",
  },
  fonts: {
    display: fontFamily,
    body: fontFamily,
  },
  ease: {
    out: Easing.bezier(0.16, 1, 0.3, 1),
    inOut: Easing.bezier(0.83, 0, 0.17, 1),
    in: Easing.bezier(0.7, 0, 0.84, 0),
  },
  spring: {
    snappy: { damping: 14, stiffness: 160, mass: 0.6 },
    smooth: { damping: 20, stiffness: 90, mass: 1 },
    bouncy: { damping: 11, stiffness: 170, mass: 0.7 },
  },
} as const;

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
