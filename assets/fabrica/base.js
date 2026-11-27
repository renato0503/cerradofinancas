// Base comum dos objetos 3D da /fabrica: paleta, materiais reais, formas arredondadas, telas e etiquetas em canvas.
// Unidades em metros (tamanho real dos objetos). Tudo é função pura do progresso: nada de estado escondido.
import * as THREE from "three";
import { RoundedBoxGeometry } from "./vendor/RoundedBoxGeometry.js";

export const COR = {
  azul: "#001f5c", azulMedio: "#0b3a8c", azulClaro: "#3b82f6", dourado: "#fecb00",
  verde: "#16a34a", verdeFolha: "#2e9e4f", vermelho: "#dc2626", laranja: "#f59e0b",
  tinta: "#0f172a", cinza: "#64748b", linha: "#e2e8f0", fundoUI: "#f8fafc",
};

const cacheMat = new Map();
function m(nome, fn) { if (!cacheMat.has(nome)) cacheMat.set(nome, fn()); return cacheMat.get(nome); }
const std = (o) => new THREE.MeshStandardMaterial(o);

// Materiais de objetos reais (cores e acabamentos medidos "a olho" de produtos comuns).
export const MAT = {
  get aluminio() { return m("aluminio", () => std({ color: 0xc4c8cf, metalness: 0.85, roughness: 0.38 })); },
  get grafite() { return m("grafite", () => std({ color: 0x2a2d33, metalness: 0.35, roughness: 0.5 })); },
  get plasticoPreto() { return m("pp", () => std({ color: 0x1a1c20, metalness: 0.0, roughness: 0.55 })); },
  get plasticoCinza() { return m("pc", () => std({ color: 0x3a3e45, metalness: 0.0, roughness: 0.6 })); },
  get plasticoBranco() { return m("pb", () => std({ color: 0xeceae5, metalness: 0.0, roughness: 0.5 })); },
  get borracha() { return m("bo", () => std({ color: 0x111214, roughness: 0.9 })); },
  get aco() { return m("aco", () => std({ color: 0xa3a9b1, metalness: 1, roughness: 0.3 })); },
  get acoPintado() { return m("acp", () => std({ color: 0x2f4a6d, metalness: 0.5, roughness: 0.5 })); },
  get latao() { return m("la", () => std({ color: 0xd2a63a, metalness: 1, roughness: 0.28 })); },
  get cromado() { return m("cr", () => std({ color: 0xe5e7ea, metalness: 1, roughness: 0.12 })); },
  get papelao() { return m("pa", () => std({ color: 0xb98c57, roughness: 0.92 })); },
  get papel() { return m("papel", () => std({ color: 0xf8f7f2, roughness: 0.95 })); },
  get madeira() { return m("ma", () => std({ map: texMadeira(), roughness: 0.65 })); },
  get vidroPreto() { return m("vp", () => std({ color: 0x07080a, metalness: 0.2, roughness: 0.12 })); },
  get vidro() { return m("vi", () => new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0, roughness: 0.03, transmission: 1, thickness: 0.004, ior: 1.5, transparent: true, opacity: 0.35 })); },
  get hardboard() { return m("hb", () => std({ color: 0x8b5a2b, roughness: 0.8 })); },
};

export function corMat(hex, o = {}) {
  return m("c" + hex + JSON.stringify(o), () => std({ color: hex, roughness: 0.5, metalness: 0, ...o }));
}

// Material que acende (LED), com intensidade controlada por objeto.
export function led(hex) {
  return new THREE.MeshStandardMaterial({ color: 0x111111, emissive: new THREE.Color(hex), emissiveIntensity: 0, roughness: 0.4 });
}

export function sombra(o) {
  o.traverse((x) => { if (x.isMesh) { x.castShadow = true; x.receiveShadow = true; } });
  return o;
}

// Caixa com cantos arredondados (o que separa "objeto real" de "caixa de computador gráfico").
export function caixa(w, h, d, raio, mat) {
  const r = Math.min(raio, w / 2 - 1e-4, h / 2 - 1e-4, d / 2 - 1e-4);
  const g = new RoundedBoxGeometry(w, h, d, 3, Math.max(r, 1e-4));
  const mesh = new THREE.Mesh(g, mat);
  mesh.castShadow = mesh.receiveShadow = true;
  return mesh;
}

export function cilindro(rt, rb, h, mat, seg = 32) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat);
  mesh.castShadow = mesh.receiveShadow = true;
  return mesh;
}

// Cabo (tubo) passando por pontos.
export function cabo(pontos, raio, mat, seg = 64) {
  const curva = new THREE.CatmullRomCurve3(pontos.map((p) => new THREE.Vector3(...p)));
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curva, seg, raio, 12, false), mat);
  mesh.castShadow = mesh.receiveShadow = true;
  return mesh;
}

// ---------------------------------------------------------------- canvas → textura
export function superficie(pxW, pxH) {
  const canvas = document.createElement("canvas");
  canvas.width = pxW; canvas.height = pxH;
  const ctx = canvas.getContext("2d");
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return { canvas, ctx, tex, w: pxW, h: pxH };
}

// Tela de aparelho: plano que brilha sozinho (não depende da luz da cena) com um desenho por progresso.
export function tela(larg, alt, pxW, desenhar, { papel = false } = {}) {
  const pxH = Math.round(pxW * alt / larg);
  const s = superficie(pxW, pxH);
  const mat = papel ? new THREE.MeshStandardMaterial({ map: s.tex, roughness: 0.92 })
    : new THREE.MeshBasicMaterial({ map: s.tex, toneMapped: false });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(larg, alt), mat);
  if (papel) mesh.receiveShadow = true;
  let ultimo = null;
  mesh.userData.atualizar = (p, extra) => {
    const chave = (Math.round(p * 400) / 400) + "|" + JSON.stringify(extra ?? null);
    if (chave === ultimo) return;
    ultimo = chave;
    s.ctx.save(); desenhar(s.ctx, s.w, s.h, p, extra); s.ctx.restore();
    s.tex.needsUpdate = true;
  };
  return mesh;
}

// Etiqueta impressa (papel com texto), usada em caixas, cabos e documentos.
export function etiqueta(larg, alt, pxW, desenhar, matBase) {
  const pxH = Math.round(pxW * alt / larg);
  const s = superficie(pxW, pxH);
  desenhar(s.ctx, s.w, s.h);
  s.tex.needsUpdate = true;
  const mat = new THREE.MeshStandardMaterial({ map: s.tex, roughness: 0.9, ...(matBase || {}) });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(larg, alt), mat);
  mesh.receiveShadow = true;
  return mesh;
}

function texMadeira() {
  const s = superficie(1024, 512);
  const c = s.ctx;
  c.fillStyle = "#9a7350"; c.fillRect(0, 0, 1024, 512);
  for (let i = 0; i < 140; i++) {
    const y = (i * 37.7) % 512, a = 0.04 + ((i * 13) % 7) / 90;
    c.strokeStyle = `rgba(${60 + (i % 3) * 10},${38 + (i % 4) * 6},20,${a})`;
    c.lineWidth = 1 + (i % 4);
    c.beginPath(); c.moveTo(0, y);
    for (let x = 0; x <= 1024; x += 32) c.lineTo(x, y + Math.sin(x / 140 + i) * 5);
    c.stroke();
  }
  s.tex.wrapS = s.tex.wrapT = THREE.RepeatWrapping;
  s.tex.needsUpdate = true;
  return s.tex;
}

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
