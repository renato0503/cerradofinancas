// Vídeo com IA · v2 "A prova na tela": celular e notebook na mesa de edição rodando os filmes das frentes.
// 0-6 gancho (par de aparelhos, swipe troca de filme) · 6-12 câmera/tripé/claquete caem e somem
// 12-18 os cinco chips entram na tela do notebook · 18-24 a parede de sete aparelhos e os sete objetos 3D
// saindo das telas (20,4-23,4, em câmera lenta) · 24-30 o ingresso do curso · 30 cortina lima (DOM)
import { THREE, V, K, prog, criarPalco, luzes, ambiente, textura, caixaArredondada, carregarImagem, carregarFontes, rodar } from "./palco3d.js";

const { T } = window.TEMPO;
const FUNDO = "#0a0a0f", PAINEL = "#12121a", LIMA = "#d8ff3e";
const PI = Math.PI, TAU = PI * 2;
const N_QUADROS = 22, FPS_TELA = 10;
// a parede encolhe no eixo X (o bloco de texto ocupa a esquerda no 16:9 e a base no 9:16)
const XV = (x) => x * (V ? 0.46 : 0.62);
const HO = (x) => x * (V ? 0.70 : 1);

// as sete frentes: formato nativo (9:16 só em celular, 16:9 só em notebook)
const FRENTES = [
  { slug: "cerraai", cor: "#e2873b", tipo: "celular", pos: [-1.12, 0, 0.62], rot: 0.30, hover: [-2.34, 1.70, 2.60], giro: 0.45, escala: 1.25, incl: 1.05 },
  { slug: "cerrafood", cor: "#f39200", tipo: "celular", pos: [-3.00, 0, -1.70], rot: 0.55, hover: [-1.56, 1.72, 2.60], giro: 0.6, escala: 1.25, incl: 0.85 },
  { slug: "cerraclass", cor: "#ffc83d", tipo: "notebook", pos: [1.22, 0, 0.02], rot: -0.24, hover: [-0.78, 1.70, 2.60], giro: -0.38, escala: 1.25, incl: 0.45 },
  { slug: "guiacademico", cor: "#a8822a", tipo: "celular", pos: [2.95, 0, -1.60], rot: -0.50, hover: [0.00, 1.72, 2.60], giro: -0.6, escala: 1.25, incl: 1.15 },
  { slug: "credito", cor: "#1f3ae0", tipo: "celular", pos: [-2.05, 0, -3.10], rot: 0.42, hover: [0.78, 1.70, 2.60], giro: 0.45, escala: 1.25, incl: 1.2 },
  { slug: "contabilidade", cor: "#0c3b2e", tipo: "notebook", pos: [-0.10, 0, -4.05], rot: 0.04, hover: [1.56, 1.72, 2.60], giro: 0.35, escala: 1.25, incl: 1.2 },
  { slug: "consultoria", cor: "#e4570e", tipo: "notebook", pos: [1.85, 0, -3.15], rot: -0.34, hover: [2.34, 1.70, 2.60], giro: -0.5, escala: 1.25, incl: 1.15 },
];

// ---- geometria base ----
function qa(s, l, r) {
  s.moveTo(-l + r, -l); s.lineTo(l - r, -l); s.quadraticCurveTo(l, -l, l, -l + r);
  s.lineTo(l, l - r); s.quadraticCurveTo(l, l, l - r, l); s.lineTo(-l + r, l);
  s.quadraticCurveTo(-l, l, -l, l - r); s.lineTo(-l, -l + r); s.quadraticCurveTo(-l, -l, -l + r, -l);
}

// ---- objetos 3D das frentes (miniaturas dos objetos aprovados; nada de texto no 3D) ----
const M = {
  cobre: new THREE.MeshStandardMaterial({ color: "#e2873b", metalness: 0.75, roughness: 0.38 }),
  grafite: new THREE.MeshStandardMaterial({ color: "#1b1f1d", roughness: 0.55, metalness: 0.2 }),
  papel: new THREE.MeshStandardMaterial({ color: "#fbfbf6", roughness: 0.9, metalness: 0.02, side: THREE.DoubleSide }),
  tinta: new THREE.MeshStandardMaterial({ color: "#141414", roughness: 0.6, metalness: 0.1 }),
  amarelo: new THREE.MeshStandardMaterial({ color: "#ffc83d", roughness: 0.55, metalness: 0.05 }),
  mata: new THREE.MeshStandardMaterial({ color: "#0f2a16", roughness: 0.5, metalness: 0.15 }),
  laranja: new THREE.MeshStandardMaterial({ color: "#f39200", roughness: 0.45, metalness: 0.1 }),
  azul: new THREE.MeshStandardMaterial({ color: "#1e2a44", roughness: 0.6, metalness: 0.15 }),
  creme: new THREE.MeshStandardMaterial({ color: "#f6f2e9", roughness: 0.85, side: THREE.DoubleSide }),
  ouro: new THREE.MeshStandardMaterial({ color: "#a8822a", roughness: 0.35, metalness: 0.6 }),
  verde: new THREE.MeshStandardMaterial({ color: "#0c3b2e", roughness: 0.7, metalness: 0.05 }),
  caneta: new THREE.MeshStandardMaterial({ color: "#1f3ae0", roughness: 0.35, metalness: 0.45 }),
  fio: new THREE.MeshStandardMaterial({ color: "#23262b", roughness: 0.5, metalness: 0.4 }),
};

function objChip() {
  const g = new THREE.Group();
  const corpo = new THREE.Mesh(caixaArredondada(0.56, 0.56, 0.1, 0.05, 0.015), M.grafite);
  corpo.rotation.x = -PI / 2; corpo.position.y = 0.05; g.add(corpo);
  const anel = new THREE.Shape(); qa(anel, 0.22, 0.03);
  const furo = new THREE.Path(); qa(furo, 0.18, 0.02); anel.holes.push(furo);
  const moldura = new THREE.Mesh(new THREE.ExtrudeGeometry(anel, { depth: 0.02, bevelEnabled: false }), M.cobre);
  moldura.rotation.x = -PI / 2; moldura.position.y = 0.1; g.add(moldura);
  const nucleo = new THREE.Mesh(caixaArredondada(0.24, 0.24, 0.05, 0.02, 0.008), M.cobre);
  nucleo.rotation.x = -PI / 2; nucleo.position.y = 0.11; g.add(nucleo);
  for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) for (const o of [-0.14, 0, 0.14]) {
    const pino = new THREE.Mesh(new THREE.BoxGeometry(dx ? 0.1 : 0.028, 0.02, dz ? 0.1 : 0.028), M.cobre);
    pino.position.set(dx * 0.325 + (dz ? o : 0), 0.02, dz * 0.325 + (dx ? o : 0)); g.add(pino);
  }
  for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) for (const o of [-0.12, 0.12]) {
    const trilha = new THREE.Mesh(new THREE.BoxGeometry(dx ? 0.34 : 0.018, 0.014, dz ? 0.34 : 0.018), M.cobre);
    trilha.position.set(dx * 0.52 + (dz ? o : 0), 0.012, dz * 0.52 + (dx ? o : 0)); g.add(trilha);
  }
  return g;
}

function objIngresso() {
  const g = new THREE.Group();
  const palco = new THREE.Mesh(caixaArredondada(0.74, 0.06, 0.52, 0.05, 0.012), M.amarelo);
  palco.position.y = 0.03; g.add(palco);
  for (let r = 0; r < 2; r++) for (let c = 0; c < 5; c++) {
    const cadeira = new THREE.Group();
    const assento = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.022, 0.09), M.tinta);
    const encosto = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.085, 0.02), M.tinta);
    encosto.position.set(0, 0.045, -0.045); cadeira.add(assento, encosto);
    cadeira.position.set(-0.27 + c * 0.135, 0.06, -0.08 + r * 0.17); g.add(cadeira);
  }
  const ingresso = new THREE.Group();
  const papel = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.4), M.creme);
  ingresso.add(papel);
  const faixa = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.1), M.amarelo);
  faixa.position.set(0, 0.15, 0.002); ingresso.add(faixa);
  for (let i = 0; i < 12; i++) {
    const t = new THREE.Mesh(new THREE.PlaneGeometry(0.02, 0.004), M.tinta);
    t.position.set(-0.26 + i * 0.047, -0.02, 0.002); ingresso.add(t);
  }
  const picote = new THREE.Mesh(new THREE.PlaneGeometry(0.004, 0.4), M.tinta);
  picote.position.set(0.2, 0, 0.002); ingresso.add(picote);
  ingresso.position.set(0, 0.28, 0.02); ingresso.rotation.set(-0.95, 0.12, 0.06); g.add(ingresso);
  return g;
}

function objImpressora() {
  const g = new THREE.Group();
  const corpo = new THREE.Mesh(caixaArredondada(0.52, 0.2, 0.34, 0.05, 0.015), M.mata);
  corpo.position.y = 0.1; g.add(corpo);
  const fenda = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.015, 0.05), M.laranja);
  fenda.position.set(0, 0.2, 0.04); g.add(fenda);
  const p1 = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.16), M.papel);
  p1.position.set(0, 0.27, 0.05); p1.rotation.x = -0.5; g.add(p1);
  const p2 = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.14), M.papel);
  p2.position.set(0, 0.38, 0.11); p2.rotation.x = -1.3; g.add(p2);
  for (let i = 0; i < 4; i++) {
    const linha = new THREE.Mesh(new THREE.BoxGeometry(0.22 - i * 0.02, 0.003, 0.003), M.mata);
    linha.position.set(0, 0.3 + i * 0.03, 0.062 + i * 0.012); linha.rotation.x = -0.5; g.add(linha);
  }
  return g;
}

function objBussola() {
  const g = new THREE.Group();
  const face = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.03, 48), M.creme);
  face.position.y = 0.03; g.add(face);
  const aro = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.022, 12, 64), M.azul);
  aro.rotation.x = PI / 2; aro.position.y = 0.05; g.add(aro);
  const norte = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.2, 4), M.ouro);
  norte.rotation.x = PI / 2; norte.position.set(0, 0.06, 0.1); g.add(norte);
  const sul = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.18, 4), M.creme);
  sul.rotation.x = -PI / 2; sul.position.set(0, 0.06, -0.09); g.add(sul);
  const pivo = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.05, 16), M.ouro);
  pivo.position.y = 0.07; g.add(pivo);
  return g;
}

function objRazonete() {
  const g = new THREE.Group();
  const papel = new THREE.Mesh(new THREE.PlaneGeometry(0.74, 0.5), new THREE.MeshStandardMaterial({ color: "#f1f6f0", roughness: 0.9 }));
  papel.rotation.x = -PI / 2; papel.position.y = 0.01; g.add(papel);
  const haste = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.012, 0.3), M.verde);
  haste.position.set(0, 0.03, 0.02); g.add(haste);
  const trave = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.012, 0.025), M.verde);
  trave.position.set(0, 0.03, -0.13); g.add(trave);
  for (let i = 0; i < 4; i++) {
    const degrau = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.04 + i * 0.035, 0.1), M.verde);
    degrau.position.set(-0.26 + i * 0.11, (0.04 + i * 0.035) / 2 + 0.02, 0.22); g.add(degrau);
  }
  const risco = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.008, 0.009), new THREE.MeshStandardMaterial({ color: "#d23a2c" }));
  risco.rotation.y = PI / 4; risco.position.set(-0.2, 0.04, -0.02); g.add(risco);
  return g;
}

function objContrato() {
  const g = new THREE.Group();
  const papel = new THREE.Mesh(new THREE.PlaneGeometry(0.68, 0.46), M.papel);
  papel.rotation.x = -PI / 2; papel.position.y = 0.02; g.add(papel);
  for (let i = 0; i < 7; i++) {
    const linha = new THREE.Mesh(new THREE.BoxGeometry(0.34 - (i % 2) * 0.12, 0.004, 0.006), M.azul);
    linha.position.set(-0.1, 0.026, -0.14 + i * 0.045); g.add(linha);
  }
  const grifo = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.035), new THREE.MeshBasicMaterial({ color: "#e6ff3d" }));
  grifo.rotation.x = -PI / 2; grifo.position.set(0.08, 0.028, 0.12); g.add(grifo);
  const caneta = new THREE.Group();
  const corpo = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.022, 0.34, 14), M.caneta);
  const ponta = new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.07, 14), M.caneta);
  ponta.position.y = 0.2; caneta.add(corpo, ponta);
  caneta.rotation.set(PI / 2, 0, -0.5); caneta.position.set(0.12, 0.09, 0.06); g.add(caneta);
  return g;
}

function objOrganograma() {
  const g = new THREE.Group();
  const prancha = new THREE.Mesh(new THREE.PlaneGeometry(0.72, 0.52), new THREE.MeshStandardMaterial({ color: "#f3f0e8", roughness: 0.9 }));
  prancha.rotation.x = -PI / 2; prancha.position.y = 0.01; g.add(prancha);
  const grade = new THREE.GridHelper(0.68, 8, "#d8d2c4", "#e2ddd1");
  grade.position.y = 0.014; g.add(grade);
  const nos = [[0, 0.28], [-0.24, -0.06], [0, -0.06], [0.24, -0.06], [-0.12, -0.4], [0.12, -0.4]];
  const matNo = new THREE.MeshStandardMaterial({ color: "#23262b", roughness: 0.5, metalness: 0.3 });
  for (const [x, z] of nos) {
    const no = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.03, 0.09), x === 0 && z === 0.28 ? new THREE.MeshStandardMaterial({ color: "#e4570e", roughness: 0.4 }) : matNo);
    no.position.set(x, 0.035, z); g.add(no);
  }
  const liga = (a, b, cor) => {
    const A = new THREE.Vector3(a[0], 0.03, a[1]), B = new THREE.Vector3(b[0], 0.03, b[1]);
    const dir = B.clone().sub(A), meio = A.clone().add(B).multiplyScalar(0.5);
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.012, dir.length()), new THREE.MeshStandardMaterial({ color: cor, roughness: 0.5 }));
    m.position.copy(meio); m.lookAt(B); g.add(m);
  };
  liga(nos[0], nos[1], "#e4570e"); liga(nos[0], nos[2], "#e4570e"); liga(nos[0], nos[3], "#e4570e");
  liga(nos[1], nos[4], "#23262b"); liga(nos[3], nos[5], "#23262b");
  return g;
}

const CONSTRUTORES = { cerraai: objChip, cerraclass: objIngresso, cerrafood: objImpressora, guiacademico: objBussola, contabilidade: objRazonete, credito: objContrato, consultoria: objOrganograma };

// ---- aparelhos ----
function telaDe(seqs, { ciclo = 0 } = {}) {
  const mat = new THREE.MeshBasicMaterial({ map: seqs[0].quadros[0], toneMapped: false });
  let atual = -1;
  return {
    mat,
    desenhar(t, fps = FPS_TELA) {
      let src = seqs[0], local = t - src.t0;
      for (const s of seqs) if (t >= s.t0) { src = s; local = t - s.t0; }
      if (src.periodo) local = local % src.periodo;
      const i = Math.min(src.quadros.length - 1, Math.max(0, Math.floor(local * fps)));
      if (i !== atual || mat.map !== src.quadros[i]) { mat.map = src.quadros[i]; atual = i; }
    },
    ciclo,
  };
}

function celular(tela) {
  const g = new THREE.Group();
  const corpo = new THREE.Mesh(caixaArredondada(0.94, 1.84, 0.085, 0.13, 0.02), new THREE.MeshStandardMaterial({ color: "#1b1b26", roughness: 0.25, metalness: 0.65 }));
  corpo.position.y = 0.92; corpo.castShadow = true; corpo.receiveShadow = true; g.add(corpo);
  const vidro = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.6), tela.mat);
  vidro.position.set(0, 0.92, 0.045); g.add(vidro);
  const lente = new THREE.Mesh(new THREE.CircleGeometry(0.018, 16), new THREE.MeshStandardMaterial({ color: "#05050a", roughness: 0.2, metalness: 0.8 }));
  lente.position.set(0, 1.76, 0.046); g.add(lente);
  g.userData.tela = tela;
  return g;
}

function notebook(tela) {
  const g = new THREE.Group();
  const base = new THREE.Mesh(caixaArredondada(2.1, 0.075, 1.44, 0.07, 0.016), new THREE.MeshStandardMaterial({ color: "#1b1b26", roughness: 0.3, metalness: 0.6 }));
  base.position.y = 0.038; base.castShadow = true; base.receiveShadow = true; g.add(base);
  // teclado: grade de teclas, sem texto
  const teclas = new THREE.Group();
  for (let r = 0; r < 5; r++) for (let c = 0; c < 14; c++) {
    const tecla = new THREE.Mesh(new THREE.BoxGeometry(0.108, 0.006, 0.085), new THREE.MeshStandardMaterial({ color: "#2a2a38", roughness: 0.7 }));
    tecla.position.set(-0.84 + c * 0.129, 0.078, -0.44 + r * 0.1); teclas.add(tecla);
  }
  g.add(teclas);
  const trackpad = new THREE.Mesh(caixaArredondada(0.62, 0.005, 0.34, 0.04, 0.004), new THREE.MeshStandardMaterial({ color: "#333342", roughness: 0.4 }));
  trackpad.position.set(0, 0.078, 0.44); g.add(trackpad);
  // tampa inclinada para trás
  const dobradica = new THREE.Group();
  dobradica.position.set(0, 0.075, -0.7); dobradica.rotation.x = -0.19;
  const tampa = new THREE.Mesh(caixaArredondada(2.1, 1.38, 0.06, 0.07, 0.015), new THREE.MeshStandardMaterial({ color: "#1b1b26", roughness: 0.3, metalness: 0.6 }));
  tampa.position.y = 0.69; tampa.castShadow = true; dobradica.add(tampa);
  const vidro = new THREE.Mesh(new THREE.PlaneGeometry(1.96, 1.1), tela.mat);
  vidro.position.set(0, 0.69, 0.033); dobradica.add(vidro);
  g.add(dobradica);
  g.userData.tela = tela;
  g.userData.tampa = dobradica;
  return g;
}

async function sequencia(slug) {
  const quadros = await Promise.all(Array.from({ length: N_QUADROS }, async (_, i) => {
    const img = await carregarImagem(`assets/telas/${slug}/f${String(i + 1).padStart(3, "0")}.webp`);
    const t = new THREE.Texture(img);
    t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; t.needsUpdate = true;
    return t;
  }));
  return { slug, quadros };
}

rodar(async () => {
  await carregarFontes(["500 40px 'DM Mono'", "800 80px 'Outfit'", "600 30px 'Instrument Sans'"]);
  const seqs = {};
  await Promise.all(FRENTES.map(async (f) => { seqs[f.slug] = await sequencia(f.slug); }));

  const P = criarPalco({ fundo: FUNDO, fov: V ? 46 : 32, tom: true, exposicao: 1.05 });
  const { cena, renderer, camera } = P;
  await ambiente(renderer, cena, 0.32);
  const L = luzes(cena, { chave: "#ffffff", recorte: "#9fb2ff", ceu: "#cfd6ff", chao: "#0a0a0f", forca: 0.72, sombra: 9 });
  L.chave.position.set(2.4, 9, 5.5);
  // preenchimento da frente: separa os objetos flutuantes do fundo escuro
  const luzFrente = new THREE.PointLight("#ffffff", 34, 16, 2);
  luzFrente.position.set(0.9, 2.9, 4.6); cena.add(luzFrente);

  // piso chapado + grade + sombra de contato
  const chao = new THREE.Mesh(new THREE.PlaneGeometry(160, 160), new THREE.MeshBasicMaterial({ color: FUNDO }));
  chao.rotation.x = -PI / 2; cena.add(chao);
  const grade = new THREE.GridHelper(70, 140, "#1e1e2a", "#15151e");
  grade.position.y = 0.001; cena.add(grade);
  const sombra = new THREE.Mesh(new THREE.PlaneGeometry(70, 70), new THREE.ShadowMaterial({ color: "#000000", opacity: 0.5 }));
  sombra.rotation.x = -PI / 2; sombra.position.y = 0.003; sombra.receiveShadow = true; cena.add(sombra);

  // poça de luz sob os aparelhos: o piso chapado ganha volume sem virar gradiente
  const poco = textura(512, 512, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, "rgba(150,170,255,0.18)"); g.addColorStop(0.55, "rgba(110,130,220,0.055)"); g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  });
  const luzPiso = new THREE.Mesh(new THREE.PlaneGeometry(13, 9), new THREE.MeshBasicMaterial({ map: poco.tex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  luzPiso.rotation.x = -PI / 2; luzPiso.position.set(0, 0.006, 0.6); cena.add(luzPiso);

  // ---- os sete aparelhos
  const aparelhos = [];
  const telaHeroi = telaDe([
    { quadros: seqs.cerraai.quadros, t0: 0, periodo: 2.2 },
    { quadros: seqs.cerrafood.quadros, t0: 2.2, periodo: 2.2 },
    { quadros: seqs.credito.quadros, t0: 4.4, periodo: 2.2 },
    { quadros: seqs.guiacademico.quadros, t0: 6.6, periodo: 2.2 },
    { quadros: seqs.cerraai.quadros, t0: 8.8, periodo: 2.2 },
    { quadros: seqs.cerrafood.quadros, t0: 11.0, periodo: 2.2 },
    { quadros: seqs.credito.quadros, t0: 13.2, periodo: 2.2 },
    { quadros: seqs.guiacademico.quadros, t0: 15.4, periodo: 2.2 },
    { quadros: seqs.cerraai.quadros, t0: 17.6, periodo: 2.2 },
    { quadros: seqs.cerrafood.quadros, t0: 19.8, periodo: 2.2 },
    { quadros: seqs.credito.quadros, t0: 22.0, periodo: 2.2 },
    { quadros: seqs.guiacademico.quadros, t0: 24.2, periodo: 2.2 },
    { quadros: seqs.cerraai.quadros, t0: 26.4, periodo: 2.2 },
    { quadros: seqs.cerrafood.quadros, t0: 28.6, periodo: 2.2 },
    { quadros: seqs.credito.quadros, t0: 30.8, periodo: 2.2 },
  ]);

  const HEROIS = ["cerraai", "cerraclass"];
  const ORDEM = { cerrafood: 0, guiacademico: 1, credito: 2, contabilidade: 3, consultoria: 4 };
  FRENTES.forEach((f) => {
    const tela = f.slug === "cerraai" ? telaHeroi : telaDe([{ quadros: seqs[f.slug].quadros, t0: f.slug === "cerraclass" ? 0 : 19.2, periodo: 2.2 }]);
    const g = f.tipo === "celular" ? celular(tela) : notebook(tela);
    g.position.set(XV(f.pos[0]), 0, f.pos[2]);
    g.rotation.y = f.rot;
    cena.add(g);
    const obj = CONSTRUTORES[f.slug]();
    obj.position.set(XV(f.pos[0]), 1.2, f.pos[2]);
    obj.scale.setScalar(0.001);
    cena.add(obj);
    const heroi = HEROIS.includes(f.slug);
    aparelhos.push({ ...f, g, tela, obj, heroi, extra: !heroi, aparece: 18.8 + (ORDEM[f.slug] || 0) * 0.12, quadros: seqs[f.slug].quadros });
  });

  // flash da tela do notebook quando cada chip encaixa
  const nb = aparelhos.find((a) => a.slug === "cerraclass");
  const flashMat = new THREE.MeshBasicMaterial({ color: LIMA, transparent: true, opacity: 0, depthWrite: false });
  const flash = new THREE.Mesh(new THREE.PlaneGeometry(1.96, 1.1), flashMat);
  flash.position.set(0, 0.69, 0.037); nb.g.userData.tampa.add(flash);

  // ---- os cinco chips (sem texto: o nome está no HTML e acende junto)
  const CORES = ["#d8ff3e", "#6b8cff", "#ff6b57", "#b06bff", "#3ee0cf"];
  const chips = [];
  for (let i = 0; i < 5; i++) {
    const mat = new THREE.MeshStandardMaterial({ color: CORES[i], emissive: CORES[i], emissiveIntensity: 0.5, roughness: 0.35, metalness: 0.1 });
    const m = new THREE.Mesh(caixaArredondada(0.42, 0.3, 0.1, 0.06, 0.02), mat);
    m.castShadow = true;
    const g = new THREE.Group(); g.add(m); cena.add(g);
    chips.push({ g, m, mat, t0: T("virada.chips." + i) });
  }

  // ---- o que cai no plano 2: câmera, tripé e claquete
  const queda = new THREE.Group();
  const matCam = new THREE.MeshStandardMaterial({ color: "#181a1f", roughness: 0.5, metalness: 0.3 });
  function montarCamera(x, z, escala, giro) {
    const g = new THREE.Group();
    const corpo = new THREE.Mesh(caixaArredondada(0.34, 0.24, 0.18, 0.04, 0.012), matCam);
    corpo.position.y = 0.14; g.add(corpo);
    const lente = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.095, 0.16, 20), new THREE.MeshStandardMaterial({ color: "#0b0c10", roughness: 0.3, metalness: 0.6 }));
    lente.rotation.x = PI / 2; lente.position.set(0, 0.14, 0.16); g.add(lente);
    const anel = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.012, 8, 24), M.cobre);
    anel.position.set(0, 0.14, 0.24); g.add(anel);
    const visor = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.06, 0.04), matCam);
    visor.position.set(0, 0.29, -0.02); g.add(visor);
    g.position.set(x, 0, z); g.scale.setScalar(escala); g.rotation.y = giro;
    return g;
  }
  const cam = montarCamera(-0.35, 0.2, 0.9, 0.3);
  const tripe = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    const perna = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.016, 1.0, 8), matCam);
    const a = (i / 3) * TAU;
    perna.position.set(Math.cos(a) * 0.12, 0.5, Math.sin(a) * 0.12);
    perna.rotation.set(Math.sin(a) * 0.1, 0, -Math.cos(a) * 0.1);
    tripe.add(perna);
  }
  const cabeca = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 0.1), matCam);
  cabeca.position.y = 1.02; tripe.add(cabeca);
  tripe.position.set(1.0, 0, 0.55); tripe.scale.setScalar(0.85);
  const claquete = new THREE.Group();
  const tabua = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.3, 0.03), matCam);
  const listra = textura(256, 64, (ctx, w, h) => {
    ctx.fillStyle = "#f4f4f7"; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#141414";
    for (let i = 0; i < 8; i++) { ctx.save(); ctx.translate(i * 40, 0); ctx.rotate(0.5); ctx.fillRect(0, -40, 16, 160); ctx.restore(); }
  });
  const faixa = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.08), new THREE.MeshBasicMaterial({ map: listra.tex }));
  faixa.position.set(0, 0.05, 0.017); claquete.add(tabua, faixa);
  claquete.position.set(-1.0, 0.1, -0.2); claquete.rotation.y = -0.4; claquete.scale.setScalar(0.8);
  for (const o of [cam, tripe, claquete]) { o.traverse((x) => { if (x.isMesh) { x.castShadow = true; x.receiveShadow = true; } }); queda.add(o); }
  queda.scale.setScalar(1.55);
  cena.add(queda);

  // ---- o ingresso do curso (plano 5)
  const ingresso = new THREE.Group();
  const papel = new THREE.Mesh(new THREE.PlaneGeometry(0.86, 0.54), M.creme);
  ingresso.add(papel);
  const tarja = new THREE.Mesh(new THREE.PlaneGeometry(0.86, 0.14), new THREE.MeshStandardMaterial({ color: "#141414", roughness: 0.6 }));
  tarja.position.set(0, 0.2, 0.002); ingresso.add(tarja);
  const listraAmarela = new THREE.Mesh(new THREE.PlaneGeometry(0.86, 0.035), M.amarelo);
  listraAmarela.position.set(0, 0.13, 0.003); ingresso.add(listraAmarela);
  for (let i = 0; i < 14; i++) {
    const d = new THREE.Mesh(new THREE.PlaneGeometry(0.03, 0.006), M.tinta);
    d.position.set(-0.34 + i * 0.052, -0.06, 0.003); ingresso.add(d);
  }
  const corte = new THREE.Mesh(new THREE.PlaneGeometry(0.005, 0.54), M.tinta);
  corte.position.set(0.28, 0, 0.003); ingresso.add(corte);
  ingresso.scale.setScalar(0.001); nb.g.userData.tampa.add(ingresso);

  // ---- ondas dos toques
  const ondas = [0, 1, 2].map(() => {
    const m = new THREE.Mesh(new THREE.RingGeometry(0.9, 1, 40), new THREE.MeshBasicMaterial({ color: LIMA, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false }));
    m.rotation.x = -PI / 2; cena.add(m); return m;
  });

  // ---- câmera
  const CAM = [
    [0, [-0.55, 1.5, 4.0]], [0.95, [-0.5, 1.48, 3.95]], [1.24, [0.45, 2.35, 7.3], "power4.out"], [6, [0.3, 2.28, 6.8], "power2.inOut"],
    [6.01, [3.4, 0.62, 6.2], "none"], [7.4, [-1.7, 0.72, 6.0], "power2.inOut"], [9.4, [-1.5, 0.82, 5.8], "power2.inOut"], [9.85, [0.7, 1.5, 5.0], "power3.out"],
    [12, [0.0, 5.9, 1.5], "power3.inOut"], [13.5, [0.6, 4.8, 3.2], "power2.inOut"], [14.7, [5.6, 2.4, 4.8], "power2.inOut"], [15.5, [2.9, 1.75, 2.7], "power2.inOut"], [16.0, [1.55, 1.6, 2.35], "power4.out"], [16.9, [1.5, 1.62, 2.3], "power1.inOut"],
    [18, [0.6, 1.5, 5.9], "power2.inOut"], [19.1, [0.7, 1.85, 6.8], "power2.inOut"],
    [20.3, [-1.74, 2.30, 7.4], "power2.inOut"], [20.72, [-0.96, 2.30, 7.4]], [21.14, [-0.18, 2.30, 7.4]],
    [21.56, [0.60, 2.30, 7.4]], [21.98, [1.38, 2.30, 7.4]], [22.40, [2.16, 2.30, 7.4]], [22.82, [2.94, 2.30, 7.4]],
    [23.40, [0.9, 3.15, 8.6], "power2.inOut"], [23.85, [0.95, 3.2, 8.5], "power1.inOut"], [23.96, [2.2, 1.78, 3.7], "none"],
    [24, [2.2, 1.78, 3.7], "power2.inOut"], [26.2, [1.35, 1.72, 3.2], "power2.inOut"], [27.8, [0.95, 1.5, 2.25], "power3.out"], [28.6, [1.0, 1.52, 2.15], "power1.inOut"], [30, [1.1, 1.6, 2.6], "power1.inOut"],
    [30.01, [0.9, 2.35, 6.7], "none"], [36, [1.0, 2.38, 6.5], "none"],
  ];
  const ALVO = [
    [0, [-1.12, 1.05, 0.62]], [0.95, [-1.1, 1.02, 0.6]], [1.24, [0, 1.0, 0], "power4.out"], [6, [0, 1.0, 0]],
    [6.01, [0.1, 1.2, 0]], [9.4, [0.15, 1.35, 0]], [9.85, [0, 1.5, 0], "power3.out"],
    [12, [0, 0, 0.55]], [13.5, [0, 0, 0.55]], [14.7, [0, 0.9, 0]], [15.5, [0.85, 0.95, 0.1]], [16.0, [0.80, 1.0, 0.05]], [16.9, [0.80, 1.02, 0.05]],
    [18, [0, 1.3, 0]], [19.1, [0, 1.5, 0]],
    [20.3, [-3.09, 1.72, 2.6], "power2.inOut"], [20.72, [-2.31, 1.72, 2.6]], [21.14, [-1.53, 1.72, 2.6]],
    [21.56, [-0.75, 1.72, 2.6]], [21.98, [0.03, 1.72, 2.6]], [22.40, [0.81, 1.72, 2.6]], [22.82, [1.59, 1.72, 2.6]],
    [23.40, [0.1, 1.75, 0.7], "power2.inOut"], [23.85, [0.1, 1.75, 0.7], "power1.inOut"], [23.96, [0.85, 1.05, 0.1], "none"],
    [24, [0.85, 1.05, 0.1]], [26.2, [0.85, 1.0, 0.1]], [27.8, [0.9, 1.02, 0.35]], [28.6, [0.9, 1.02, 0.35]], [30, [0.8, 1.02, 0.2]],
    [30.01, [0, 1.2, 0]], [36, [0, 1.2, 0]],
  ];
  const DIST = V ? 0.8 : 1;
  // tempo "percebido": anda mais devagar entre t0 e t0+dur (câmera lenta)
  const lento = (t, t0, dur, fator) => (t <= t0 ? t : t <= t0 + dur ? t0 + (t - t0) * fator : t0 + dur * fator + (t - (t0 + dur)));

  return function desenhar(t) {
    const naProva = t >= T("prova.entra") - 0.2;

    aparelhos.forEach((a, i) => {
      // os cinco de trás entram na parede no plano 4
      const entra = a.extra ? prog(t, a.aparece, a.aparece + 0.7, "expo.out") : 1;
      a.g.visible = entra > 0.002;
      a.g.scale.setScalar(Math.max(0.001, entra));
      a.g.position.y = -0.35 * (1 - entra);
      a.tela.desenhar(t, t > 20.4 && t < 22.0 ? 5 : FPS_TELA);
    });

    // chips: voam da esquerda para dentro da tela do notebook e acendem a trilha
    chips.forEach((c, i) => {
      const q = prog(t, c.t0, c.t0 + 0.72, "power3.out");
      const dentro = t > c.t0 + 0.72;
      c.g.visible = q > 0.001 && !dentro;
      const x = -5.6 + 6.4 * q;
      const y = 0.95 + i * 0.2 + Math.sin(q * PI) * 0.9;
      const z = 2.6 - 2.5 * q;
      c.g.position.set(x, y, z);
      c.g.rotation.set(q * 0.6, -q * 1.2, q * 0.4);
      c.g.scale.setScalar(1 - 0.62 * q);
      c.g.traverse((o) => { if (o.isMesh) o.material.emissiveIntensity = 0.5 + 0.5 * Math.sin(q * PI); });
      c.mat.emissiveIntensity = 0.5;
    });
    // a tela do notebook acende na cor de cada chip que encaixa
    let fCor = null, fOp = 0;
    chips.forEach((c, i) => {
      const u = prog(t, c.t0 + 0.6, c.t0 + 1.05, "power2.out");
      const o = t > c.t0 + 0.55 && u < 1 ? 0.38 * (1 - u) : 0;
      if (o > fOp) { fOp = o; fCor = CORES[i]; }
    });
    if (fCor) flashMat.color.set(fCor);
    flashMat.opacity = fOp;

    // o que cai no plano 2 (com rampa de câmera lenta)
    const tl = lento(t, 7.4, 0.8, 0.3);
    const qd = prog(tl, 7.5, 8.9, "power1.in");
    queda.visible = t > T("mito.entra") && qd < 1.6;
    queda.position.y = 2.0 - 3.6 * qd;
    queda.rotation.z = -0.35 * qd; queda.rotation.x = 0.22 * qd;

    // as sete miniaturas saem das telas, uma por vez, e ficam em fila na frente da parede
    aparelhos.forEach((a, i) => {
      const t0 = T("prova.objetos") + i * 0.42 - 0.18;
      const tFim = T("prova.fim");
      const volta = prog(t, tFim - 0.3 + i * 0.03, tFim + i * 0.03, "power2.in");
      const u = prog(t, t0, t0 + 0.95, "expo.out") * (1 - volta);
      const ox = HO(a.hover[0]), oy = a.hover[1], oz = a.hover[2];
      const sx = XV(a.pos[0]), sz = a.pos[2];
      a.obj.visible = u > 0.001;
      a.obj.position.set(sx + (ox - sx) * u, 1.05 + (oy - 1.05) * u, sz + (oz - sz) * u);
      a.obj.scale.setScalar(Math.max(0.001, u * a.escala * (V ? 0.62 : 1)));
      a.obj.rotation.y = 0.22 * Math.sin(t * 0.55 + i);
      a.obj.rotation.x = a.incl + Math.sin(t * 0.7 + i) * 0.05;
      a.obj.rotation.z = Math.sin(t * 0.9 + i) * 0.07;
      if (u > 0.7) a.obj.position.y += Math.sin(t * 0.8 + i * 1.7) * 0.06;
    });

    // o ingresso do curso carimba no vidro do notebook
    const qi = prog(t, T("curso.ingresso"), T("curso.ingresso") + 0.45, "power4.out");
    ingresso.visible = t > T("curso.ingresso");
    // o ingresso é carimbado no vidro do notebook (filho da tampa, então acompanha o aparelho)
    ingresso.position.set(0.45, 0.40, 0.07);
    ingresso.scale.setScalar(Math.max(0.001, 0.52 * (0.05 + 0.95 * qi) * (1 + 0.12 * (1 - qi))));
    ingresso.rotation.set(0, 0, -0.07 + 0.07 * qi);

    // ondas dos toques (celular e trackpad)
    const toques = [
      { t0: T("virada.toque"), x: XV(-1.12), z: 0.62, y: 1.0 },
      { t0: T("virada.toque") + 0.3, x: XV(1.22), z: 0.45, y: 0.09 },
      { t0: T("virada.toque") + 0.55, x: XV(1.22), z: 0.45, y: 0.09 },
    ];
    ondas.forEach((o, i) => {
      const tp = toques[i], u = prog(t, tp.t0, tp.t0 + 0.6, "power2.out");
      o.visible = t > tp.t0 && u < 1;
      o.position.set(tp.x, tp.y + 0.01, tp.z);
      o.scale.setScalar(0.02 + 0.34 * u);
      o.material.opacity = 0.5 * (1 - u);
    });

    const p = K(t, CAM), a = K(t, ALVO);
    P.olhar([p[0] * DIST, p[1] * DIST, p[2] * DIST], [a[0] * (V ? 0.9 : 1), a[1], a[2]]);
    if (V) P.enquadrar(0, -0.17); else P.enquadrar(0.12, 0);
    P.render();
  };
});
