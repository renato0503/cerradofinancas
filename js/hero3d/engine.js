import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { SKY_VERT, SKY_FRAG, LINE_VERT, LINE_FRAG, PLAN_VERT, PLAN_FRAG, LENS, patchModulo, patchChao } from './shaders.js';

export const PAL = [
  { top: '#000a1e', hor: '#001f5c', bot: '#00030a', fog: '#000a1e', sun: '#9bb8ff', sunI: 0.5, env: 0.25, exp: 1.0, bloom: 0.45, edge: '#9cc2ff', grid: '#3f6fc4', gridOp: 1, ground: '#000a1e', inter: 0, stars: 1 },
  { top: '#33465f', hor: '#fecb00', bot: '#6b5440', fog: '#cf9f78', sun: '#ffa45e', sunI: 8.5, env: 0.3, exp: 0.95, bloom: 0.24, edge: '#ffcf9a', grid: '#ffffff', gridOp: 0, ground: '#463927', inter: 1, stars: 0 },
  { top: '#0b0c0d', hor: '#1c1d1e', bot: '#0e0f10', fog: '#141516', sun: '#fff2e2', sunI: 2.7, env: 0.55, exp: 1.0, bloom: 0.28, edge: '#d9b57c', grid: '#fecb00', gridOp: 0.3, ground: '#141516', inter: 0.6, stars: 0.2 },
  { top: '#02050b', hor: '#17253f', bot: '#0a1120', fog: '#0e1729', sun: '#a9bfff', sunI: 0.5, env: 1.0, exp: 1.1, bloom: 0.55, edge: '#ffffff', grid: '#ffffff', gridOp: 0, ground: '#0b0f15', inter: 1.2, stars: 0.8 },
];
const PALC = PAL.map((p) => Object.fromEntries(Object.entries(p).map(([k, v]) => [k, typeof v === 'string' ? new THREE.Color(v) : v])));

function mistura(look) {
  const i = Math.min(PALC.length - 2, Math.max(0, Math.floor(look)));
  const f = Math.min(1, Math.max(0, look - i));
  const a = PALC[i], b = PALC[i + 1], o = {};
  for (const k in a) o[k] = a[k].isColor ? a[k].clone().lerp(b[k], f) : a[k] + (b[k] - a[k]) * f;
  return o;
}

function aleatorio(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const LENTE = { focal: 35, sensorW: 36, sensorH: 24 };
function fovPara(asp) {
  const sw = asp >= 1 ? LENTE.sensorW : LENTE.sensorH;
  const sh = asp >= 1 ? LENTE.sensorH : LENTE.sensorW;
  const fit = sw / sh > asp ? { w: sh * asp, h: sh } : { w: sw, h: sw / asp };
  return 2 * Math.atan(fit.h / 2 / LENTE.focal) * 180 / Math.PI;
}

// As camadas do "produto": de baixo para cima, com a cor de cada uma no material final
const CAMADAS = [
  { nome: 'CLOUD', cor: '#0a2f8a', alt: 1.5 },
  { nome: 'CORE', cor: '#0d45c4', alt: 2.1 },
  { nome: 'DADOS', cor: '#1a5cf0', alt: 1.8 },
  { nome: 'MOBILE', cor: '#3b82f6', alt: 1.4 },
];
const OURO = new THREE.Color('#fecb00');

function montarModulos() {
  const r = aleatorio(20261031);
  const mods = [];
  let y = 0;
  CAMADAS.forEach((cam, li) => {
    const passo = 3.0 - li * 0.25;
    for (let gx = -1; gx <= 1; gx++) {
      for (let gz = -1; gz <= 1; gz++) {
        if (li >= 2 && Math.abs(gx) + Math.abs(gz) === 2 && r() < 0.6) continue;
        if (li === 3 && gx === 0 && gz === 0) continue;
        const sx = passo * (0.72 + r() * 0.24), sz = passo * (0.72 + r() * 0.24);
        const sy = cam.alt * (0.82 + r() * 0.3);
        const p = new THREE.Vector3(gx * passo + (r() - 0.5) * 0.25, y + sy / 2, gz * passo + (r() - 0.5) * 0.25);
        const dir = new THREE.Vector3(gx + (r() - 0.5) * 0.6, (li - 1.4) * 1.25, gz + (r() - 0.5) * 0.6).normalize();
        const cor = new THREE.Color(cam.cor);
        if (r() < 0.16) cor.copy(OURO);
        mods.push({ camada: li, base: p, tam: new THREE.Vector3(sx, sy, sz), dir, dist: 1.8 + r() * 2.6,
          eixo: new THREE.Vector3(r() - 0.5, r() - 0.5, r() - 0.5).normalize(), ang: (r() - 0.5) * 0.9, cor });
      }
    }
    y += cam.alt + 0.18;
  });
  return { mods, altura: y };
}

function textoRotulo(txt) {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 128;
  const g = c.getContext('2d');
  g.font = '700 64px "JetBrains Mono", ui-monospace, monospace';
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillStyle = '#9cc2ff';
  g.fillText(txt, 256, 64);
  g.strokeStyle = 'rgba(156,194,255,.6)'; g.lineWidth = 3;
  g.strokeRect(8, 8, 496, 112);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function criarMotor(canvas, { low = false } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance', preserveDrawingBuffer: false });
  let dprMax = low ? 1.25 : 1.6, dpr = Math.min(devicePixelRatio, dprMax);
  renderer.setPixelRatio(dpr);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000a1e, 40, 220);
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);

  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const U = {
    uGrow: { value: -1 }, uMat: { value: 0 },
    uEdge: { value: new THREE.Color('#9cc2ff') }, uClay: { value: new THREE.Color('#dfe6f5') },
    uGridCol: { value: new THREE.Color('#3f6fc4') }, uGridOp: { value: 1 },
  };

  const skyMat = new THREE.ShaderMaterial({ vertexShader: SKY_VERT, fragmentShader: SKY_FRAG, side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: { uTop: { value: new THREE.Color() }, uHor: { value: new THREE.Color() }, uBot: { value: new THREE.Color() } } });
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(400, 32, 16), skyMat));

  const chaoMat = patchChao(new THREE.MeshStandardMaterial({ color: 0x000a1e, roughness: 0.95, metalness: 0 }), U);
  const chao = new THREE.Mesh(new THREE.PlaneGeometry(240, 240), chaoMat);
  chao.rotation.x = -Math.PI / 2;
  chao.receiveShadow = true;
  scene.add(chao);

  const { mods, altura } = montarModulos();
  const N = mods.length;
  const caixa = new THREE.BoxGeometry(1, 1, 1);
  const modMat = patchModulo(new THREE.MeshStandardMaterial({ roughness: 0.42, metalness: 0.12, color: 0xffffff }), U);
  const modulos = new THREE.InstancedMesh(caixa, modMat, N);
  modulos.castShadow = true; modulos.receiveShadow = true;
  modulos.frustumCulled = false;
  mods.forEach((m, i) => modulos.setColorAt(i, m.cor));
  scene.add(modulos);

  const arestas = new THREE.InstancedBufferGeometry();
  const eg = new THREE.EdgesGeometry(caixa);
  arestas.setAttribute('position', eg.getAttribute('position'));
  const iM = [0, 1, 2, 3].map(() => new THREE.InstancedBufferAttribute(new Float32Array(N * 4), 4));
  iM.forEach((a, k) => { a.setUsage(THREE.DynamicDrawUsage); arestas.setAttribute('iM' + k, a); });
  arestas.instanceCount = N;
  const lineMat = new THREE.ShaderMaterial({ vertexShader: LINE_VERT, fragmentShader: LINE_FRAG, transparent: true, depthWrite: false,
    uniforms: { uGrow: U.uGrow, uOp: { value: 0 }, uCol: { value: new THREE.Color('#9cc2ff') } } });
  const linhas = new THREE.LineSegments(arestas, lineMat);
  linhas.frustumCulled = false;
  scene.add(linhas);

  // Planta: o contorno de cada módulo da base, a moldura e os eixos, desenhados do centro para fora
  const pPos = [], pT = [], pS = [];
  const seg = (a, b) => {
    const mid = Math.hypot((a[0] + b[0]) / 2, (a[1] + b[1]) / 2);
    const s = Math.min(1, mid / 22) * 0.78;
    pPos.push(a[0], 0.03, a[1], b[0], 0.03, b[1]); pT.push(0, 1); pS.push(s, s);
  };
  mods.filter((m) => m.camada === 0).forEach((m) => {
    const x0 = m.base.x - m.tam.x / 2, x1 = m.base.x + m.tam.x / 2, z0 = m.base.z - m.tam.z / 2, z1 = m.base.z + m.tam.z / 2;
    seg([x0, z0], [x1, z0]); seg([x1, z0], [x1, z1]); seg([x1, z1], [x0, z1]); seg([x0, z1], [x0, z0]);
  });
  [7, 11, 16].forEach((q) => { seg([-q, -q], [q, -q]); seg([q, -q], [q, q]); seg([q, q], [-q, q]); seg([-q, q], [-q, -q]); });
  seg([-22, 0], [22, 0]); seg([0, -22], [0, 22]);
  for (let k = -16; k <= 16; k += 4) { seg([k, -17.2], [k, -16.4]); seg([-17.2, k], [-16.4, k]); }
  const planGeo = new THREE.BufferGeometry();
  planGeo.setAttribute('position', new THREE.Float32BufferAttribute(pPos, 3));
  planGeo.setAttribute('aT', new THREE.Float32BufferAttribute(pT, 1));
  planGeo.setAttribute('aS', new THREE.Float32BufferAttribute(pS, 1));
  const planMat = new THREE.ShaderMaterial({ vertexShader: PLAN_VERT, fragmentShader: PLAN_FRAG, transparent: true, depthWrite: false,
    uniforms: { uDraw: { value: 0 }, uOp: { value: 1 }, uCol: { value: new THREE.Color('#9cc2ff') } } });
  scene.add(new THREE.LineSegments(planGeo, planMat));

  const rotulos = [['API', 13.5, -4], ['CORE', -13.5, 4], ['IA', 4, 13.5], ['DADOS', -4, -13.5], ['MOBILE', 13.5, 9], ['CLOUD', -13.5, -9]].map(([t, x, z], k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(4, 1), new THREE.MeshBasicMaterial({ map: textoRotulo(t), transparent: true, depthWrite: false, fog: false }));
    m.rotation.x = -Math.PI / 2; m.position.set(x, 0.05, z); m.userData.at = 0.35 + k * 0.08;
    scene.add(m);
    return m;
  });

  function pontos(n, raio, tam, cor, aditivo, seed) {
    const r = aleatorio(seed), pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const u = r() * 2 - 1, th = r() * Math.PI * 2, rr = raio * (aditivo ? Math.cbrt(r()) : 1);
      const s = Math.sqrt(1 - u * u);
      pos.set([Math.cos(th) * s * rr, Math.abs(u) * rr * (aditivo ? 0.6 : 1) + (aditivo ? 1 : 0), Math.sin(th) * s * rr], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ size: tam, color: cor, transparent: true, depthWrite: false, sizeAttenuation: aditivo, fog: false,
      blending: aditivo ? THREE.AdditiveBlending : THREE.NormalBlending });
    const p = new THREE.Points(g, mat);
    scene.add(p);
    return p;
  }
  const estrelas = pontos(low ? 700 : 1200, 300, 1.6, 0xcfe0ff, false, 7);
  const poeira = pontos(low ? 250 : 500, 26, 0.08, 0xfecb00, true, 11);

  const hemi = new THREE.HemisphereLight(0x3a5a96, 0x050a14, 0.5);
  scene.add(hemi);
  const sol = new THREE.DirectionalLight(0xffffff, 1);
  sol.position.set(26, 34, 18);
  sol.castShadow = true;
  sol.shadow.mapSize.set(low ? 1024 : 4096, low ? 1024 : 4096);
  Object.assign(sol.shadow.camera, { left: -26, right: 26, top: 26, bottom: -26, near: 1, far: 120 });
  sol.shadow.bias = -0.0003; sol.shadow.normalBias = 0.04; sol.shadow.radius = 2;
  scene.add(sol, sol.target);
  const internas = [[-2, 2.5, 1.5], [2, 5, -1.5], [0, 7.2, 0.5]].map((p) => {
    const l = new THREE.PointLight(0xfecb00, 0, 12, 2);
    l.position.set(...p);
    scene.add(l);
    return l;
  });

  const rt = new THREE.WebGLRenderTarget(2, 2, { type: THREE.HalfFloatType, samples: low ? 0 : 4 });
  const composer = new EffectComposer(renderer, rt);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.4, 0.55, 1.6);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());
  const lente = new ShaderPass(LENS);
  lente.uniforms.uRes.value = new THREE.Vector2(1, 1);
  composer.addPass(lente);

  let W = 1, H = 1;
  function resize() {
    W = canvas.clientWidth || innerWidth; H = canvas.clientHeight || innerHeight;
    renderer.setSize(W, H, false);
    composer.setPixelRatio(dpr);
    composer.setSize(W, H);
    bloom.resolution.set(W / 2, H / 2);
    lente.uniforms.uRes.value.set(W * dpr, H * dpr);
    camera.aspect = W / H;
    camera.fov = fovPara(camera.aspect);
    camera.updateProjectionMatrix();
  }
  resize();

  const ptr = { x: 0, y: 0, sx: 0, sy: 0 };
  addEventListener('pointermove', (e) => { ptr.x = (e.clientX / innerWidth) * 2 - 1; ptr.y = (e.clientY / innerHeight) * 2 - 1; }, { passive: true });

  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), pos = new THREE.Vector3(), alvo = new THREE.Vector3();
  const atual = mods.map(() => new THREE.Vector3());

  function atualizarModulos(S, t) {
    for (let i = 0; i < N; i++) {
      const m = mods[i];
      const e = S.explode * (0.85 + 0.15 * Math.sin(t * 0.6 + i));
      pos.copy(m.base).addScaledVector(m.dir, m.dist * e);
      q.setFromAxisAngle(m.eixo, m.ang * S.explode);
      m4.compose(pos, q, m.tam);
      modulos.setMatrixAt(i, m4);
      atual[i].copy(pos);
      const el = m4.elements;
      for (let k = 0; k < 4; k++) iM[k].array.set(el.slice(k * 4, k * 4 + 4), i * 4);
    }
    modulos.instanceMatrix.needsUpdate = true;
    iM.forEach((a) => (a.needsUpdate = true));
  }

  let ativo = true, tempos = [], ultimo = performance.now();
  function adaptar() {
    const agora = performance.now();
    tempos.push(agora - ultimo); ultimo = agora;
    if (tempos.length < 45) return;
    const media = tempos.reduce((a, b) => a + b, 0) / tempos.length;
    tempos = [];
    const novo = media > 26 ? Math.max(0.75, dpr - 0.2) : media < 13 ? Math.min(dprMax, devicePixelRatio, dpr + 0.1) : dpr;
    if (Math.abs(novo - dpr) > 0.01) { dpr = novo; renderer.setPixelRatio(dpr); resize(); }
  }

  function render(S, t) {
    if (!ativo) return;
    const P = mistura(S.look);
    skyMat.uniforms.uTop.value.copy(P.top); skyMat.uniforms.uHor.value.copy(P.hor); skyMat.uniforms.uBot.value.copy(P.bot);
    scene.fog.color.copy(P.fog);
    chaoMat.color.copy(P.ground);
    U.uGridCol.value.copy(P.grid); U.uGridOp.value = P.gridOp * S.grid;
    U.uEdge.value.copy(P.edge); U.uGrow.value = S.grow; U.uMat.value = S.mat;
    lineMat.uniforms.uOp.value = S.line; lineMat.uniforms.uCol.value.copy(P.edge);
    planMat.uniforms.uDraw.value = S.draw; planMat.uniforms.uOp.value = S.plan;
    rotulos.forEach((r) => { r.material.opacity = S.plan * Math.min(1, Math.max(0, (S.draw - r.userData.at) / 0.15)); r.visible = r.material.opacity > 0.01; });
    sol.color.copy(P.sun); sol.intensity = P.sunI;
    sol.castShadow = S.grow > 8.4;
    hemi.intensity = 0.5;
    scene.environmentIntensity = P.env;
    renderer.toneMappingExposure = P.exp;
    bloom.strength = P.bloom;
    internas.forEach((l) => (l.intensity = P.inter * S.mat * 18));
    estrelas.material.opacity = P.stars * 0.85;
    poeira.material.opacity = 0.35 + S.mat * 0.4;
    poeira.rotation.y = t * 0.02;
    modMat.emissive.copy(OURO).multiplyScalar(0.06 * P.inter * S.mat);

    atualizarModulos(S, t);

    ptr.sx += (ptr.x - ptr.sx) * 0.04; ptr.sy += (ptr.y - ptr.sy) * 0.04;
    const resp = Math.sin(t * 0.5) * 0.05 * S.handheld;
    camera.position.set(S.cx + ptr.sx * 0.45 * S.parallax, S.cy + resp - ptr.sy * 0.25 * S.parallax, S.cz);
    alvo.set(S.tx + ptr.sx * 0.9 * S.parallax, S.ty - ptr.sy * 0.45 * S.parallax, S.tz);
    camera.lookAt(alvo);
    camera.rotation.z += Math.sin(t) * 0.0015 + S.roll;
    lente.uniforms.uTime.value = t;
    composer.render();
    adaptar();
  }

  // Âncoras dos callouts: o topo de um módulo de cada camada
  function ancora(i) {
    const m = mods[i];
    return () => new THREE.Vector3(atual[i].x, atual[i].y + m.tam.y / 2, atual[i].z);
  }
  const porCamada = (li, k = 0) => { const l = mods.map((m, i) => [m, i]).filter(([m]) => m.camada === li); return l[k % l.length][1]; };
  const ancoras = [ancora(porCamada(2, 1)), ancora(porCamada(3, 0)), ancora(porCamada(2, 4)), ancora(porCamada(3, 2)), ancora(porCamada(1, 4)), ancora(porCamada(0, 2))];

  renderer.compile(scene, camera);

  return {
    render, resize, camera, scene, altura, ancoras,
    setActive(v) { ativo = v; },
  };
}
