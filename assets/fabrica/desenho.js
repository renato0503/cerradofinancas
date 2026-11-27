// Desenho 2D e utilidades de tempo (sem Three.js: o celular usa isto sem baixar o 3D).
export const COR = {
  azul: "#001f5c", azulMedio: "#0b3a8c", azulClaro: "#3b82f6", dourado: "#fecb00",
  verde: "#16a34a", verdeFolha: "#2e9e4f", vermelho: "#dc2626", laranja: "#f59e0b",
  tinta: "#0f172a", cinza: "#64748b", linha: "#e2e8f0", fundoUI: "#f8fafc",
};

// ---------------------------------------------------------------- utilidades de tempo (iguais às dos filmes)
export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const faixa = (p, a, b) => clamp((p - a) / (b - a));           // 0→1 dentro de [a, b]
export const suave = (x) => x * x * (3 - 2 * x);
export const saida = (x) => 1 - Math.pow(1 - x, 3);                     // easeOutCubic
export const mola = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : 1 - Math.cos(x * Math.PI * 2.4) * Math.exp(-x * 6.5)); // assenta com leve repique
export const lerp = (a, b, t) => a + (b - a) * t;

// ---------------------------------------------------------------- desenho de interface (2D)
export const FONTE = "'Inter', system-ui, sans-serif";
export const MONO = "'JetBrains Mono', ui-monospace, monospace";
export const MAO = "'Caveat', cursive";

export function ret(c, x, y, w, h, r, fill, stroke, lw = 2) {
  c.beginPath(); c.roundRect(x, y, w, h, r);
  if (fill) { c.fillStyle = fill; c.fill(); }
  if (stroke) { c.strokeStyle = stroke; c.lineWidth = lw; c.stroke(); }
}

export function txt(c, s, x, y, tam, cor, peso = 500, alinha = "left", fonte = FONTE) {
  c.font = `${peso} ${tam}px ${fonte}`;
  c.fillStyle = cor; c.textAlign = alinha; c.textBaseline = "alphabetic";
  c.fillText(s, x, y);
}

// Texto que encolhe até caber (regra "texto 3D sempre inteiro").
export function txtCabe(c, s, x, y, tam, larguraMax, cor, peso = 600, alinha = "left", fonte = FONTE) {
  let t = tam;
  c.font = `${peso} ${t}px ${fonte}`;
  while (c.measureText(s).width > larguraMax && t > 6) { t -= 1; c.font = `${peso} ${t}px ${fonte}`; }
  c.fillStyle = cor; c.textAlign = alinha; c.textBaseline = "alphabetic";
  c.fillText(s, x, y);
}

export const reais = (v) => "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
