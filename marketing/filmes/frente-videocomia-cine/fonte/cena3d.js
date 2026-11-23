// Vídeo com IA · "Cinema": um plano-sequência por um estúdio escuro, com linguagem de câmera de verdade.
// - Motion blur real: cada quadro é a média de N sub-quadros espalhados no tempo do obturador.
// - Foco e desfoque reais: a cada sub-quadro a câmera sai de um ponto diferente da abertura da lente e mira o
//   ponto de foco (o que está na distância de foco fica nítido; o resto vira bokeh). Rack focus = mudar o foco.
// - Câmera: macro, dolly, travelling, grua e chicotes (whip pan) com rampa de velocidade entre as cenas.
// - Acabamento: bloom no lima, aberração cromática nas bordas, vinheta, grão, névoa de profundidade.
// Regra da casa: texto 3D só aparece inteiro (checar_texto3d.py) e a faixa de baixo é das legendas HTML.
//
// 0-4,5 título "VÍDEO / COM IA" (macro → revelação com varredura de luz) · 4,5-11 as 5 etapas (travelling)
// 11,4-18 as 3 entregas (grua) e o celular · 18,6-24 os 3 caminhos (voo para a frente) · 24-27,4 a regra
// (foco entra no "confere") · 27,4 clarão · 27,6-32 a chamada
import { THREE, W, H, V, K, prog, rng, textura, caixaArredondada, carregarFontes, ambiente, rodar } from "./palco3d.js";
import { EffectComposer } from "./jsm/postprocessing/EffectComposer.js";
import { UnrealBloomPass } from "./jsm/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "./jsm/postprocessing/ShaderPass.js";
import { OutputPass } from "./jsm/postprocessing/OutputPass.js";
import { TTFLoader } from "./jsm/loaders/TTFLoader.js";
import { Font } from "./jsm/loaders/FontLoader.js";
import { TextGeometry } from "./jsm/geometries/TextGeometry.js";

const PI = Math.PI;
const N = Math.max(1, +(new URLSearchParams(location.search).get("amostras") || 24)); // sub-quadros por quadro
const OBTURADOR = 0.9 / 30; // segundos de exposição (um pouco menos que um quadro: rastro longo nos chicotes)
const LIMA = "#d8ff3e", FUNDO = "#06060a";
const CORES = ["#d8ff3e", "#6b8cff", "#ff6b57", "#b06bff", "#3ee0cf"];
const FOV = V ? 50 : 32;
const TAN = Math.tan((FOV * PI) / 360), ASP = W / H;
// distância para enquadrar um objeto w x h com folga m (no formato atual)
const distPara = (w, h, m = 1.4) => Math.max((h * m) / 2 / TAN, (w * m) / 2 / (TAN * ASP));
const DESLOC_Y = V ? 0.1 : 0.075; // a imagem sobe um pouco: a faixa de baixo fica livre para as legendas

const halton = (i, b) => { let f = 1, r = 0; while (i > 0) { f /= b; r += f * (i % b); i = Math.floor(i / b); } return r; };

rodar(async () => {
  await carregarFontes(["900 120px Outfit", "800 120px Outfit", "500 40px 'DM Mono'", "600 40px 'Instrument Sans'"]);
  const fonte = await new Promise((ok, erro) => new TTFLoader().load("assets/fonts/outfit-800.ttf", (j) => ok(new Font(j)), undefined, erro));

  // ---------------------------------------------------------------- renderizador e pós
  const canvas = document.getElementById("tela");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, preserveDrawingBuffer: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(1);
  renderer.setSize(W, H, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.autoClear = false;
  const cena = new THREE.Scene();
  cena.background = new THREE.Color(FUNDO);
  cena.fog = new THREE.FogExp2(FUNDO, 0.034);
  const camera = new THREE.PerspectiveCamera(FOV, ASP, 0.05, 400);
  window.__palco = { THREE, renderer, cena, camera };
  await ambiente(renderer, cena, 0.3);

  const rt = (depth = true) => new THREE.WebGLRenderTarget(W, H, { type: THREE.HalfFloatType, depthBuffer: depth });
  const amostra = rt(), acum = rt(false);
  const quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const quad = (mat) => { const s = new THREE.Scene(); s.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat)); return s; };
  const somaMat = new THREE.MeshBasicMaterial({ map: amostra.texture, transparent: true, opacity: 1 / N, blending: THREE.AdditiveBlending, depthTest: false, depthWrite: false, toneMapped: false });
  const somaCena = quad(somaMat);
  const copiaCena = quad(new THREE.MeshBasicMaterial({ map: acum.texture, depthTest: false, depthWrite: false, toneMapped: false }));

  const composer = new EffectComposer(renderer, rt());
  composer.setPixelRatio(1);
  composer.setSize(W, H);
  const bloom = new UnrealBloomPass(new THREE.Vector2(W, H), 0.5, 0.6, 0.95);
  const grade = new ShaderPass({
    uniforms: { tDiffuse: { value: null }, uTempo: { value: 0 }, uRes: { value: new THREE.Vector2(W, H) } },
    vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
    fragmentShader: `uniform sampler2D tDiffuse; uniform float uTempo; uniform vec2 uRes; varying vec2 vUv;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233)) + uTempo * 7.13) * 43758.5453); }
      void main(){
        vec2 c = vUv - 0.5; float r2 = dot(c, c);
        vec2 off = c * 0.004 * (0.3 + r2 * 2.5);
        vec3 col = vec3(texture2D(tDiffuse, vUv + off).r, texture2D(tDiffuse, vUv).g, texture2D(tDiffuse, vUv - off).b);
        col *= 1.0 - smoothstep(0.12, 0.62, r2) * 0.6;
        col += (hash(floor(vUv * uRes / 2.0)) - 0.5) * 0.012;
        gl_FragColor = vec4(max(col, 0.0), 1.0);
      }`,
  });
  composer.addPass(bloom);
  composer.addPass(grade);
  composer.addPass(new OutputPass());

  // ---------------------------------------------------------------- cenário comum
  const chao = new THREE.Mesh(new THREE.PlaneGeometry(500, 120), new THREE.MeshStandardMaterial({ color: "#0b0b12", roughness: 0.34, metalness: 0.55 }));
  chao.rotation.x = -PI / 2; chao.position.set(70, 0, -20); chao.receiveShadow = true; cena.add(chao);
  const grade3d = new THREE.GridHelper(500, 250, "#2a3310", "#16180f");
  grade3d.position.set(70, 0.002, -20); grade3d.material.transparent = true; grade3d.material.opacity = 0.55; cena.add(grade3d);
  cena.add(new THREE.HemisphereLight("#9aa3ff", "#050508", 0.32));
  const chave = new THREE.DirectionalLight("#fff6ea", 1.5);
  chave.castShadow = true; chave.shadow.mapSize.set(2048, 2048);
  Object.assign(chave.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9, near: 0.5, far: 40 });
  chave.shadow.bias = -0.0004; chave.shadow.radius = 5;
  cena.add(chave, chave.target);
  const recorte = new THREE.DirectionalLight("#b8c4ff", 0.9); cena.add(recorte, recorte.target);

  // poeira no ar: fora de foco vira bokeh
  const pontoTx = textura(64, 64, (ctx, w, h) => { const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, "rgba(255,255,240,1)"); g.addColorStop(0.4, "rgba(255,255,230,.5)"); g.addColorStop(1, "rgba(255,255,220,0)"); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); });
  const R = rng(11), NP = 3200, pp = new Float32Array(NP * 3);
  for (let i = 0; i < NP; i++) { pp[i * 3] = -14 + R() * 170; pp[i * 3 + 1] = 0.2 + R() * 9; pp[i * 3 + 2] = -26 + R() * 40; }
  const poeiraG = new THREE.BufferGeometry(); poeiraG.setAttribute("position", new THREE.BufferAttribute(pp, 3));
  const poeira = new THREE.Points(poeiraG, new THREE.PointsMaterial({ size: 0.05, map: pontoTx.tex, color: "#fff4d6", transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true }));
  cena.add(poeira);

  // ---------------------------------------------------------------- ajudantes
  function texto3d(str, size, mats) {
    const g = new TextGeometry(str, { font: fonte, size, depth: size * 0.3, curveSegments: 8, bevelEnabled: true, bevelThickness: size * 0.035, bevelSize: size * 0.022, bevelSegments: 4 });
    g.computeBoundingBox();
    const bb = g.boundingBox;
    g.translate(-(bb.min.x + bb.max.x) / 2, 0, -bb.max.z); // centrado em x, linha de base em y = 0, frente em z = 0
    g.computeBoundingBox();
    const m = new THREE.Mesh(g, mats);
    m.castShadow = true; m.receiveShadow = true;
    m.userData.textos = [str];
    m.userData.larg = bb.max.x - bb.min.x;
    return m;
  }
  const matLetra = (cor, lado, brilho = 0.3) => [
    new THREE.MeshStandardMaterial({ color: cor, emissive: cor, emissiveIntensity: brilho, roughness: 0.28, metalness: 0.25 }),
    new THREE.MeshStandardMaterial({ color: lado, roughness: 0.32, metalness: 0.7 }),
  ];
  // placa com texto desenhado em canvas (autoiluminada para ler sempre)
  function placaTx(w, h, px, pintar, { corpo = "#101018", raio = 0.1 } = {}) {
    const g = new THREE.Group();
    const caixa = new THREE.Mesh(caixaArredondada(w, h, 0.12, raio, 0.025), new THREE.MeshStandardMaterial({ color: corpo, roughness: 0.35, metalness: 0.5 }));
    caixa.castShadow = true; caixa.receiveShadow = true; g.add(caixa);
    const tx = textura(px, Math.round((px * h) / w), pintar);
    const face = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.06, h - 0.06), new THREE.MeshStandardMaterial({ map: tx.tex, emissive: "#ffffff", emissiveMap: tx.tex, emissiveIntensity: 0.3, roughness: 0.6, transparent: true }));
    face.position.z = 0.062; g.add(face);
    return { g, face, tx };
  }
  const cabe = (ctx, txt, peso, tam, fam, larg) => { ctx.font = `${peso} ${tam}px ${fam}`; while (ctx.measureText(txt).width > larg && tam > 10) { tam -= 2; ctx.font = `${peso} ${tam}px ${fam}`; } return tam; };

  // ---------------------------------------------------------------- 1. título
  const X1 = 0;
  const tit = new THREE.Group(); tit.position.x = X1; cena.add(tit);
  const mTit = matLetra(LIMA, "#55620f", 0.32);
  const SZ1 = 1.5;
  const l1 = texto3d("VÍDEO", SZ1, mTit), l2 = texto3d("COM IA", SZ1, mTit);
  l2.position.set(0, 0.02, 0); l1.position.set(0, SZ1 * 1.02, 0);
  tit.add(l1, l2);
  const TIT_W = Math.max(l1.userData.larg, l2.userData.larg), TIT_H = SZ1 * 2.35;
  const D1 = distPara(TIT_W, TIT_H, 1.42);
  const varre = new THREE.SpotLight("#f4ffd0", 60, 18, 0.32, 0.6, 1.4);
  varre.castShadow = false; cena.add(varre, varre.target);

  // ---------------------------------------------------------------- 2. as cinco etapas (lajes)
  const LW = 2.3, LH = 3.3, ESP2 = V ? 3.8 : 6.2, X2 = 16; // vizinha fica inteira fora do quadro
  const NOMES = ["Ideia", "Roteiro", "Imagem", "Montagem", "Publicação"];
  const lajes = NOMES.map((nome, i) => {
    const p = placaTx(LW, LH, 700, (ctx, w, h) => {
      ctx.fillStyle = "rgba(10,10,16,0.0)"; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = CORES[i]; ctx.fillRect(56, 70, 120, 12);
      ctx.font = "500 92px 'DM Mono'"; ctx.fillText(`0${i + 1}`, 56, 190);
      ctx.fillStyle = "#f4f4f7"; const tam = cabe(ctx, nome, 900, 150, "Outfit", w - 112);
      ctx.textBaseline = "alphabetic"; ctx.fillText(nome, 56, h - 90);
      ctx.fillStyle = "rgba(244,244,247,.55)"; ctx.font = "500 34px 'DM Mono'"; ctx.fillText("ETAPA", 56, h - 110 - tam);
    }, { corpo: "#0f0f17" });
    p.g.position.set(X2 + i * ESP2, LH / 2 + 0.04, 0); cena.add(p.g);
    // aro de luz na cor da etapa (atrás da laje: vira brilho com o bloom)
    const aro = new THREE.Mesh(new THREE.PlaneGeometry(LW + 0.14, LH + 0.14), new THREE.MeshBasicMaterial({ color: new THREE.Color(CORES[i]).multiplyScalar(2.4) }));
    aro.position.set(0, 0, -0.08); p.g.add(aro);
    const luz = new THREE.PointLight(CORES[i], 18, 7, 1.6); luz.position.set(0, 0.6, -1.2); p.g.add(luz);
    return p;
  });
  const D2 = distPara(LW, LH, 1.5);

  // ---------------------------------------------------------------- 3. as três entregas (grua) e o celular
  const X3 = X2 + 4 * ESP2 + 16, CW = 2.5, CH = 1.45, ESP3 = V ? 4.4 : 3.6, Y3 = 1.3;
  const ENTREGAS = [["Roteiro de 15 segundos", "gancho, problema, prova e chamada"], ["Vídeo com apresentador", "avatar, voz e legenda"], ["Vídeo pronto para postar", "9:16, cortado e revisado"]];
  const cartoes = ENTREGAS.map(([a, b], i) => {
    const p = placaTx(CW, CH, 900, (ctx, w, h) => {
      ctx.fillStyle = LIMA; ctx.font = "500 40px 'DM Mono'"; ctx.fillText(`ENTREGA 0${i + 1}`, 50, 84);
      ctx.fillStyle = "#f4f4f7"; cabe(ctx, a, 800, 86, "Outfit", w - 100); ctx.fillText(a, 50, 230);
      ctx.fillStyle = "#a2a2b4"; cabe(ctx, b, 500, 40, "'DM Mono'", w - 100); ctx.fillText(b, 50, 310);
    }, { corpo: "#12121c", raio: 0.12 });
    p.g.position.set(X3, Y3 + i * ESP3, 0.6); cena.add(p.g);
    const aro = new THREE.Mesh(new THREE.PlaneGeometry(CW + 0.1, CH + 0.1), new THREE.MeshBasicMaterial({ color: new THREE.Color(LIMA).multiplyScalar(1.6) }));
    aro.position.z = -0.08; p.g.add(aro);
    return p;
  });
  const D3 = distPara(CW, CH, 1.45);
  const XC = X3 + (V ? 4 : 6.5); // o celular
  const cel = new THREE.Group(); cel.position.set(XC, 0, 0); cena.add(cel);
  const PW = 1.9, PH = 3.8;
  const corpoCel = new THREE.Mesh(caixaArredondada(PW, PH, 0.2, 0.26, 0.04), new THREE.MeshStandardMaterial({ color: "#16161f", roughness: 0.25, metalness: 0.85 }));
  corpoCel.position.y = PH / 2 + 0.05; corpoCel.castShadow = true; cel.add(corpoCel);
  const telaTx = textura(540, 1080, (ctx, w, h, p = 0, ok = 0) => {
    const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, "#23234a"); g.addColorStop(1, "#0c0c14"); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = LIMA; ctx.beginPath(); ctx.arc(w / 2, h * 0.38, 92, 0, PI * 2); ctx.fill();
    ctx.fillStyle = "#0a0a0f"; ctx.beginPath(); ctx.moveTo(w / 2 - 28, h * 0.38 - 44); ctx.lineTo(w / 2 + 48, h * 0.38); ctx.lineTo(w / 2 - 28, h * 0.38 + 44); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "#f4f4f7"; ctx.textAlign = "center"; ctx.font = "800 64px Outfit"; ctx.fillText("Seu vídeo,", w / 2, h * 0.6); ctx.fillText("pronto.", w / 2, h * 0.6 + 74);
    ctx.fillStyle = "#2b2b3a"; ctx.fillRect(90, h * 0.76, w - 180, 14); ctx.fillStyle = LIMA; ctx.fillRect(90, h * 0.76, (w - 180) * p, 14);
    ctx.font = "500 30px 'DM Mono'"; ctx.fillStyle = "#a2a2b4"; ctx.fillText(ok ? "9:16 · REVISADO" : `RENDER ${Math.round(p * 100)}%`, w / 2, h * 0.76 + 70);
    if (ok) { ctx.fillStyle = LIMA; ctx.beginPath(); ctx.arc(w - 96, 120, 58, 0, PI * 2); ctx.fill(); ctx.strokeStyle = "#0a0a0f"; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(w - 124, 120); ctx.lineTo(w - 102, 144); ctx.lineTo(w - 64, 96); ctx.stroke(); }
  });
  const telaCel = new THREE.Mesh(new THREE.PlaneGeometry(PW - 0.16, PH - 0.2), new THREE.MeshStandardMaterial({ map: telaTx.tex, emissive: "#ffffff", emissiveMap: telaTx.tex, emissiveIntensity: 0.22, roughness: 0.45 }));
  telaCel.position.set(0, PH / 2 + 0.05, 0.102); cel.add(telaCel);
  const luzCel = new THREE.PointLight(LIMA, 6, 6, 1.6); luzCel.position.set(0, 0.4, -1.0); // atrás: contorno, sem lavar a tela cel.add(luzCel);
  const DC = distPara(PW, PH, 1.35);

  // ---------------------------------------------------------------- 4. três caminhos (voo para a frente)
  const X4 = XC + 22, LADO = V ? 3.2 : 2.6, PASSO4 = 8;
  const CAMINHOS = [["A", "Só clicar", "Nunca editou? Comece aqui.", LIMA], ["B", "Modelo pronto", "Troque texto e cor, e renderize.", "#6b8cff"], ["C", "Com código", "Peça a cena ao agente e revise.", "#ff6b57"]];
  const letras = CAMINHOS.map(([l, a, b, cor], i) => {
    const g = new THREE.Group();
    const x = X4 + (i === 1 ? LADO : i === 2 ? LADO + 10 : -LADO), z = -i * PASSO4; // C nunca fica atrás do A
    g.position.set(x, 0, z); cena.add(g);
    const m = texto3d(l, 2.2, matLetra(cor, "#24242e", 0.35)); m.position.set(0, 1.3, -0.25); g.add(m);
    const p = placaTx(2.9, 0.92, 900, (ctx, w, h) => {
      ctx.fillStyle = "#f4f4f7"; ctx.textAlign = "center"; cabe(ctx, a, 800, 84, "Outfit", w - 80); ctx.fillText(a, w / 2, 120);
      ctx.fillStyle = "#a2a2b4"; cabe(ctx, b, 500, 38, "'DM Mono'", w - 80); ctx.fillText(b, w / 2, 210);
    }, { corpo: "#12121c" });
    p.g.position.set(0, 0.5, 0.6); g.add(p.g);
    return { g, x, z };
  });
  const D4 = distPara(3.0, 3.3, 1.45);

  // ---------------------------------------------------------------- 5. a regra (o foco entra no "confere")
  const X5 = X4 + (V ? 26 : 46); // longe o bastante para o "C" dos caminhos não entrar no plano
  const regra = new THREE.Group(); regra.position.x = X5; cena.add(regra);
  const LINHAS5 = V ? [["A IA ERRA.", "#f4f4f7"], ["A GENTE", LIMA], ["CONFERE.", LIMA]] : [["A IA ERRA.", "#f4f4f7"], ["A GENTE CONFERE.", LIMA]];
  const SZ5 = V ? 0.92 : 1.0;
  let larg5 = 0;
  LINHAS5.forEach(([s, cor], i) => {
    const m = texto3d(s, SZ5, matLetra(cor, cor === LIMA ? "#55620f" : "#4a4a58", cor === LIMA ? 0.32 : 0.18));
    m.position.set(0, (LINHAS5.length - 1 - i) * SZ5 * 1.12 + 0.05, 0); regra.add(m); larg5 = Math.max(larg5, m.userData.larg);
  });
  const H5 = LINHAS5.length * SZ5 * 1.12;
  const D5 = distPara(larg5, H5, 1.38);

  // ---------------------------------------------------------------- 6. a chamada
  const X6 = X5 + 26;
  const fecho = new THREE.Group(); fecho.position.x = X6; cena.add(fecho);
  const LINHAS6 = V ? [["TRANSFORME", "#f4f4f7"], ["IDEIAS EM", "#f4f4f7"], ["VÍDEOS", LIMA], ["COM IA.", LIMA]] : [["TRANSFORME IDEIAS EM", "#f4f4f7"], ["VÍDEOS COM IA.", LIMA]];
  const SZ6 = V ? 0.78 : 0.82;
  let larg6 = 0;
  LINHAS6.forEach(([s, cor], i) => {
    const m = texto3d(s, SZ6, matLetra(cor, cor === LIMA ? "#55620f" : "#4a4a58", cor === LIMA ? 0.34 : 0.2));
    m.position.set(0, (LINHAS6.length - 1 - i) * SZ6 * 1.12 + 0.05, 0); fecho.add(m); larg6 = Math.max(larg6, m.userData.larg);
  });
  const H6txt = LINHAS6.length * SZ6 * 1.12;
  const logoImg = await new Promise((ok) => { const im = new Image(); im.onload = () => ok(im); im.src = "assets/logo.png"; });
  const logoTx = new THREE.Texture(logoImg); logoTx.colorSpace = THREE.SRGBColorSpace; logoTx.needsUpdate = true;
  const disco = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.12, 64), [
    new THREE.MeshStandardMaterial({ color: LIMA, emissive: LIMA, emissiveIntensity: 0.4, metalness: 0.4, roughness: 0.3 }),
    new THREE.MeshStandardMaterial({ map: logoTx, color: "#ffffff", roughness: 0.5 }),
    new THREE.MeshStandardMaterial({ color: "#ffffff" }),
  ]);
  disco.rotation.x = PI / 2; disco.position.set(0, H6txt + 0.95, 0); disco.castShadow = true; fecho.add(disco);
  const H6 = H6txt + 1.7;
  const D6 = distPara(larg6, H6, 1.35);

  // ---------------------------------------------------------------- câmera: tomadas [t, [pos], [alvo], abertura, ease]
  const yC1 = TIT_H / 2 + 0.1;
  const tomadas = [
    // 1. voo rasante pela poeira: o título já está inteiro lá no fundo, fora de foco; a câmera acelera e o foco entra
    [0, [X1 + 0.5, 0.55, D1 + 16], [X1, yC1, 0], 0.11],
    [0.4, [X1 + 0.45, 0.6, D1 + 15], [X1, yC1, 0], 0.11, "power1.in"],
    [3.0, [X1 + 0.35, yC1 + 0.35, D1 + 0.4], [X1, yC1, 0], 0.05, "expo.inOut"],
    [4.45, [X1 - 0.1, yC1 + 0.3, D1 - 0.55], [X1, yC1, 0], 0.045, "none"],
  ];
  // 2. travelling pelas lajes, parando em cada uma
  for (let i = 0; i < 5; i++) {
    const t0 = 5.2 + i * 1.12, x = X2 + i * ESP2;
    tomadas.push([t0, [x + 0.25, LH / 2 + 0.35, D2], [x, LH / 2 + 0.05, 0], 0.07, i === 0 ? "expo.inOut" : "expo.inOut"]);
    tomadas.push([t0 + 0.6, [x - 0.12, LH / 2 + 0.3, D2 - 0.3], [x, LH / 2 + 0.05, 0], 0.07, "none"]);
  }
  // 3. grua subindo pelas entregas e chicote para o celular
  [11.4, 13.35, 15.3].forEach((t0, i) => {
    const y = Y3 + i * ESP3;
    tomadas.push([t0, [X3 - 0.3, y + 0.25, 0.6 + D3], [X3, y, 0.6], 0.06, "expo.inOut"]);
    tomadas.push([t0 + 1.25, [X3 + 0.25, y + 0.1, 0.6 + D3 - 0.25], [X3, y, 0.6], 0.06, "none"]);
  });
  tomadas.push([17.15, [XC - 0.6, PH / 2 + 0.4, DC + 0.3], [XC, PH / 2 + 0.05, 0], 0.05, "expo.inOut"]);
  tomadas.push([18.0, [XC + 0.5, PH / 2 + 0.25, DC - 0.5], [XC, PH / 2 + 0.05, 0], 0.05, "none"]);
  // 4. voo para a frente pelos caminhos
  letras.forEach((L, i) => {
    const t0 = [18.65, 20.4, 22.15][i];
    tomadas.push([t0, [L.x + 0.3, 1.85, L.z + D4], [L.x, 1.6, L.z], 0.06, "expo.inOut"]);
    tomadas.push([t0 + 1.25, [L.x - 0.2, 1.8, L.z + D4 - 0.45], [L.x, 1.6, L.z], 0.06, "none"]);
  });
  // 5. a regra
  const yC5 = H5 / 2;
  tomadas.push([24.1, [X5 + 0.6, yC5 + 0.4, D5 + 0.8], [X5, yC5, 0], 0.05, "expo.inOut"]);
  tomadas.push([27.35, [X5 - 0.2, yC5 + 0.2, D5 - 0.4], [X5, yC5, 0], 0.05, "none"]);
  // 6. a chamada
  const yC6 = H6 / 2;
  tomadas.push([27.75, [X6 - 0.8, yC6 + 0.9, D6 + 2.2], [X6, yC6, 0], 0.05, "expo.out"]);
  tomadas.push([32, [X6 + 0.2, yC6 + 0.3, D6 + 0.1], [X6, yC6, 0], 0.045, "power1.out"]);
  const CAM = tomadas.map(([t, p, a, ab, e]) => (e ? [t, [...p, ...a, ab], e] : [t, [...p, ...a, ab]]));

  // foco: segue o alvo; na regra começa perto (tudo borrado) e entra no texto aos ~24,9 s
  function focoExtra(t, distAlvo) {
    if (t < 2.6) { const f = prog(t, 1.2, 2.5, "power2.inOut"); return { foco: 2.4 + (distAlvo - 2.4) * f, ab: 1 }; } // abre na poeira, foca no título
    const f = prog(t, 24.75, 25.35, "expo.out");
    const naRegra = t > 24.1 && t < 27.4;
    if (!naRegra) return { foco: distAlvo, ab: 1 };
    return { foco: 3.2 + (distAlvo - 3.2) * f, ab: 2.0 - 1.0 * f };
  }

  // ---------------------------------------------------------------- estado da cena num instante
  const v = new THREE.Vector3(), vAlvo = new THREE.Vector3(), dir = new THREE.Vector3(), dirX = new THREE.Vector3(), dirY = new THREE.Vector3(), UP = new THREE.Vector3(0, 1, 0);
  function estado(t) {
    // título: varredura de luz da esquerda para a direita
    const s = prog(t, 0.3, 3.4, "power2.inOut");
    varre.position.set(X1 - 7 + 14 * s, 4.2, 5); varre.target.position.set(X1 - 3 + 6 * s, 1.2, 0);
    varre.intensity = 70 * (1 - prog(t, 4.2, 4.8));
    tit.position.y = 0;
    // lajes: cada uma acende quando a câmera chega
    lajes.forEach((p, i) => { const a = prog(t, 5.0 + i * 1.12, 5.4 + i * 1.12); p.face.material.emissiveIntensity = 0.12 + 0.22 * a; });
    // celular: render enche e confere
    const pr = Math.round(prog(t, 15.6, 17.4, "power1.inOut") * 100) / 100;
    telaTx.atualizar(pr, t > 17.45 ? 1 : 0);
    cel.rotation.y = -0.18 + 0.12 * prog(t, 16.6, 18.4, "power2.out");
    // letras A B C: leve rotação de vitrine
    letras.forEach((L, i) => { L.g.rotation.y = 0.12 * Math.sin(t * 0.6 + i); });
    fecho.children.forEach((m) => { if (m === disco) disco.rotation.z = 0.25 * Math.sin(t * 0.8); });
    poeira.position.set(Math.sin(t * 0.21) * 0.25, Math.sin(t * 0.37) * 0.12, 0);

    const c = K(t, CAM);
    // câmera na mão: tremor sutil, determinístico
    const tr = 0.012;
    const px = c[0] + tr * Math.sin(t * 7.1) + tr * 0.6 * Math.sin(t * 13.7);
    const py = c[1] + tr * Math.sin(t * 6.3 + 1) + tr * 0.5 * Math.sin(t * 11.9);
    const pz = c[2] + tr * Math.sin(t * 5.2 + 2);
    v.set(px, py, pz); vAlvo.set(c[3], c[4], c[5]);
    // luzes seguem a câmera para a sombra cobrir a cena atual
    chave.target.position.copy(vAlvo); chave.position.set(vAlvo.x + 4, 9, vAlvo.z + 7);
    recorte.target.position.copy(vAlvo); recorte.position.set(vAlvo.x - 6, 4, vAlvo.z - 6);
    const dAlvo = v.distanceTo(vAlvo);
    const fx = focoExtra(t, dAlvo);
    // rolamento leve nos chicotes (quanto mais rápido, mais inclina)
    return { pos: v.clone(), alvo: vAlvo.clone(), foco: fx.foco, ab: c[6] * fx.ab };
  }

  function lente(cam, k) {
    dir.subVectors(cam.alvo, cam.pos).normalize();
    dirX.crossVectors(dir, UP).normalize();
    dirY.crossVectors(dirX, dir).normalize();
    const pf = cam.pos.clone().addScaledVector(dir, cam.foco);
    const r = k === 0 ? 0 : cam.ab * Math.sqrt((k + 0.5) / N), a = k * 2.399963;
    camera.position.copy(cam.pos).addScaledVector(dirX, r * Math.cos(a)).addScaledVector(dirY, r * Math.sin(a));
    camera.up.set(0, 1, 0);
    camera.lookAt(pf);
    const jx = k === 0 ? 0 : halton(k + 1, 2) - 0.5, jy = k === 0 ? 0 : halton(k + 1, 3) - 0.5;
    camera.setViewOffset(W, H, jx, jy + H * DESLOC_Y, W, H);
    camera.updateMatrixWorld();
  }

  return function desenhar(t) {
    renderer.setRenderTarget(acum);
    renderer.setClearColor(0x000000, 0);
    renderer.clear();
    for (let k = N - 1; k >= 0; k--) {
      const ts = Math.max(0, t - OBTURADOR * (k / N));
      lente(estado(ts), k);
      renderer.setRenderTarget(amostra);
      renderer.setClearColor(FUNDO, 1);
      renderer.clear();
      renderer.render(cena, camera);
      renderer.setRenderTarget(acum);
      renderer.render(somaCena, quadCam);
    }
    renderer.setRenderTarget(composer.readBuffer);
    renderer.clear();
    renderer.render(copiaCena, quadCam);
    grade.uniforms.uTempo.value = Math.floor(t * 15) / 15;
    composer.render();
  };
});
