// Palco 3D dos filmes das frentes: Three.js desenhado a partir do tempo do HyperFrames.
// Cada quadro é função pura do tempo t (segundos): nada de relógio, nada de requestAnimationFrame.
// O HyperFrames dispara "hf-seek" a cada quadro; o desenho só começa depois de window.__hf.buildReady.tres.
import * as THREE from "./three.module.min.js";
export { THREE };

const raiz = document.getElementById("root");
export const W = +raiz.dataset.width;
export const H = +raiz.dataset.height;
export const V = H > W; // vertical (9:16)

// ---- tempo e curvas ----
const cacheEase = new Map();
export function ease(nome = "none") {
  if (typeof nome === "function") return nome;
  if (!cacheEase.has(nome)) cacheEase.set(nome, window.gsap ? gsap.parseEase(nome) : (x) => x);
  return cacheEase.get(nome);
}
export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
/** progresso 0..1 de t entre a e b, com easing */
export function prog(t, a, b, e = "none") {
  if (b <= a) return t >= b ? 1 : 0;
  return ease(e)(clamp((t - a) / (b - a)));
}
export const lerp = (a, b, p) => a + (b - a) * p;
function mistura(v0, v1, p) {
  if (Array.isArray(v0)) return v0.map((x, i) => lerp(x, v1[i], p));
  return lerp(v0, v1, p);
}
/** quadros-chave: K(t, [[t0, v0], [t1, v1, "expo.out"], ...]); v pode ser número ou lista */
export function K(t, ks) {
  if (t <= ks[0][0]) return ks[0][1];
  for (let i = 1; i < ks.length; i++) {
    const [t1, v1, e] = ks[i];
    if (t <= t1) {
      const [t0, v0] = ks[i - 1];
      return mistura(v0, v1, prog(t, t0, t1, e || "power2.inOut"));
    }
  }
  return ks[ks.length - 1][1];
}
/** oscilação amortecida (agulha, mola): 0 em t0, assenta em 1 */
export function mola(t, t0, { freq = 2.2, amort = 4.5 } = {}) {
  const x = t - t0;
  if (x <= 0) return 0;
  return 1 - Math.exp(-amort * x) * Math.cos(freq * 2 * Math.PI * x);
}
/** gerador pseudoaleatório com semente (mulberry32) */
export function rng(semente = 1) {
  let a = semente >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---- palco ----
export function criarPalco({ fundo = "#000000", fov = 32, sombras = true, exposicao = 1, tom = true } = {}) {
  const canvas = document.getElementById("tela");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true, alpha: false });
  renderer.setPixelRatio(1);
  renderer.setSize(W, H, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  // tom: false mantém as cores chapadas da marca exatas (fundos de cor viva)
  renderer.toneMapping = tom ? THREE.NeutralToneMapping : THREE.NoToneMapping;
  renderer.toneMappingExposure = exposicao;
  if (sombras) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }
  const cena = new THREE.Scene();
  cena.background = new THREE.Color(fundo);
  const camera = new THREE.PerspectiveCamera(fov, W / H, 0.05, 200);
  /** desloca o enquadramento sem girar a câmera: fx > 0 empurra o objeto para a direita (fração da largura) */
  function enquadrar(fx = 0, fy = 0) {
    camera.setViewOffset(W, H, -fx * W, -fy * H, W, H);
  }
  /** câmera olhando para um alvo */
  function olhar(pos, alvo, rolar = 0) {
    camera.position.set(pos[0], pos[1], pos[2]);
    camera.up.set(Math.sin(rolar), Math.cos(rolar), 0);
    camera.lookAt(alvo[0], alvo[1], alvo[2]);
  }
  window.__palco = { THREE, renderer, cena, camera }; // para as ferramentas de conferência
  return { renderer, cena, camera, enquadrar, olhar, render: () => renderer.render(cena, camera) };
}

/** ambiente de estúdio para reflexos (RoomEnvironment); precisa do import map "three" no cena.html */
export async function ambiente(renderer, cena, intensidade = 0.5) {
  const { RoomEnvironment } = await import("./RoomEnvironment.js");
  const pmrem = new THREE.PMREMGenerator(renderer);
  cena.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  cena.environmentIntensity = intensidade;
}

/** luz de estúdio: chave quente, recorte frio e preenchimento suave; a chave projeta sombra */
export function luzes(cena, { chave = "#fff3e2", recorte = "#dfe8ff", ceu = "#ffffff", chao = "#202020", forca = 1, sombra = 6 } = {}) {
  const hemi = new THREE.HemisphereLight(ceu, chao, 0.9 * forca);
  cena.add(hemi);
  const k = new THREE.DirectionalLight(chave, 2.4 * forca);
  k.position.set(4, 7, 5);
  k.castShadow = true;
  k.shadow.mapSize.set(2048, 2048);
  k.shadow.camera.left = -sombra; k.shadow.camera.right = sombra;
  k.shadow.camera.top = sombra; k.shadow.camera.bottom = -sombra;
  k.shadow.camera.near = 0.5; k.shadow.camera.far = 30;
  k.shadow.radius = 6;
  k.shadow.bias = -0.0004;
  cena.add(k);
  const r = new THREE.DirectionalLight(recorte, 1.1 * forca);
  r.position.set(-6, 3, -4);
  cena.add(r);
  return { hemi, chave: k, recorte: r };
}

/** chão que só recebe sombra (a cor do fundo continua chapada) */
export function chaoDeSombra(cena, { tamanho = 40, opacidade = 0.22, y = 0 } = {}) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(tamanho, tamanho), new THREE.ShadowMaterial({ opacity: opacidade }));
  m.rotation.x = -Math.PI / 2;
  m.position.y = y;
  m.receiveShadow = true;
  cena.add(m);
  return m;
}

// ---- texturas desenhadas em canvas (com as fontes da marca) ----
export function textura(w, h, pintar) {
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d");
  const tex = new THREE.CanvasTexture(canvas);
  // marca as texturas que têm texto escrito (o checar_texto3d.py confere se esse texto aparece inteiro)
  for (const f of ["fillText", "strokeText"]) {
    const orig = ctx[f].bind(ctx);
    ctx[f] = (txt, x, y, ...r) => {
      const s = String(txt).trim();
      if (s) {
        (tex.userData.textos ||= new Set()).add(s);
        // onde as letras ficam no canvas (com alinhamento e transformação), em fração da textura
        const m = ctx.measureText(txt), T = ctx.getTransform();
        const cx = [x - m.actualBoundingBoxLeft, x + m.actualBoundingBoxRight], cy = [y - m.actualBoundingBoxAscent, y + m.actualBoundingBoxDescent];
        const c = tex.userData.caixa ||= [1e9, 1e9, -1e9, -1e9];
        const uma = [1e9, 1e9, -1e9, -1e9];
        for (const px of cx) for (const py of cy) {
          const q = T.transformPoint(new DOMPoint(px, py));
          for (const k of [c, uma]) { k[0] = Math.min(k[0], q.x / w); k[1] = Math.min(k[1], q.y / h); k[2] = Math.max(k[2], q.x / w); k[3] = Math.max(k[3], q.y / h); }
        }
        const lista = tex.userData.caixas ||= [];
        if (lista.length < 60) lista.push(uma);
      }
      return orig(txt, x, y, ...r);
    };
  }
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  let assinatura = null;
  function atualizar(...args) {
    const chave = JSON.stringify(args);
    if (chave === assinatura) return; // só redesenha quando muda
    assinatura = chave;
    ctx.clearRect(0, 0, w, h);
    pintar(ctx, w, h, ...args);
    tex.needsUpdate = true;
  }
  atualizar();
  return { tex, atualizar, canvas, ctx };
}

/** garante as fontes da marca antes de desenhar texto em canvas: ["900 40px Archivo", ...] */
export async function carregarFontes(lista) {
  await Promise.all(lista.map((f) => document.fonts.load(f).catch(() => null)));
}

/** imagem local (logo) como textura; espera carregar */
export function carregarImagem(src) {
  return new Promise((ok, erro) => {
    const img = new Image();
    img.onload = () => ok(img);
    img.onerror = erro;
    img.src = src;
  });
}

// ---- geometrias ----
/** caixa com cantos arredondados (extrusão de um retângulo arredondado), centrada na origem */
export function caixaArredondada(w, h, d, r = 0.08, bisel = 0.03, segs = 4) {
  const s = new THREE.Shape();
  const x = -w / 2 + bisel, y = -h / 2 + bisel, ww = w - 2 * bisel, hh = h - 2 * bisel;
  const rr = Math.max(0.001, Math.min(r, ww / 2, hh / 2));
  s.moveTo(x + rr, y);
  s.lineTo(x + ww - rr, y); s.quadraticCurveTo(x + ww, y, x + ww, y + rr);
  s.lineTo(x + ww, y + hh - rr); s.quadraticCurveTo(x + ww, y + hh, x + ww - rr, y + hh);
  s.lineTo(x + rr, y + hh); s.quadraticCurveTo(x, y + hh, x, y + hh - rr);
  s.lineTo(x, y + rr); s.quadraticCurveTo(x, y, x + rr, y);
  const g = new THREE.ExtrudeGeometry(s, {
    depth: Math.max(0.001, d - 2 * bisel), bevelEnabled: bisel > 0, bevelThickness: bisel, bevelSize: bisel,
    bevelSegments: segs, curveSegments: 10,
  });
  g.translate(0, 0, -(d - 2 * bisel) / 2);
  g.computeVertexNormals();
  return g;
}

/** plano com uma textura numa face (para papéis, telas e etiquetas) */
export function placa(w, h, tex, { cor = "#ffffff", dupla = false, rugosidade = 0.85 } = {}) {
  const mat = new THREE.MeshStandardMaterial({ map: tex || null, color: cor, roughness: rugosidade, metalness: 0, side: dupla ? THREE.DoubleSide : THREE.FrontSide, transparent: !!tex });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  return m;
}

// ---- execução ----
/** monta a cena (async) e liga o desenho ao hf-seek. montar() devolve desenhar(t). */
export function rodar(montar) {
  window.__hf = window.__hf || {};
  window.__hf.buildReady = window.__hf.buildReady || {};
  let desenhar = null;
  let ultimo = 0;
  window.addEventListener("hf-seek", (e) => {
    ultimo = e.detail.time;
    if (desenhar) desenhar(ultimo);
  });
  window.__hf.buildReady.tres = (async () => {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    desenhar = await montar();
    desenhar(ultimo);
  })();
}
