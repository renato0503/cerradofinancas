// O escritório: um ambiente só, com cada objeto no seu lugar (mesas, estante, rack, balcão, armário).
// Devolve as "paradas" da câmera: para cada serviço, o objeto e a pose que o enquadra.
import * as THREE from "three";
import { MAT, caixa, superficie } from "./base.js";
import notebook from "./objetos/notebook.js";
import estoque from "./objetos/estoque.js";
import celular from "./objetos/celular.js";
import servidor from "./objetos/servidor.js";
import maquininha from "./objetos/maquininha.js";
import auditoria from "./objetos/auditoria.js";
import monitor from "./objetos/monitor.js";
import cyber from "./objetos/cyber.js";
import switchRede from "./objetos/switch.js";
import prancheta from "./objetos/prancheta.js";

const H_MESA = 0.75, H_BALCAO = 0.95;
const acoPreto = () => new THREE.MeshStandardMaterial({ color: 0x1c1e22, metalness: 0.2, roughness: 0.6 });

function mesa(w, d) {
  const g = new THREE.Group();
  const tampo = caixa(w, 0.03, d, 0.006, MAT.madeira); tampo.position.y = H_MESA - 0.015; g.add(tampo);
  const m = acoPreto();
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) { const p = caixa(0.04, H_MESA - 0.03, 0.04, 0.004, m); p.position.set(sx * (w / 2 - 0.08), (H_MESA - 0.03) / 2, sz * (d / 2 - 0.06)); g.add(p); }
    const trav = caixa(0.04, 0.04, d - 0.12, 0.004, m); trav.position.set(sx * (w / 2 - 0.08), H_MESA - 0.06, 0); g.add(trav);
  }
  const fundo = caixa(w - 0.16, 0.04, 0.03, 0.004, m); fundo.position.set(0, H_MESA - 0.06, -d / 2 + 0.06); g.add(fundo);
  return g;
}

function balcao(w, d) {
  const g = new THREE.Group();
  const corpo = caixa(w - 0.02, H_BALCAO - 0.08, d - 0.04, 0.006, new THREE.MeshStandardMaterial({ color: 0xe9e6df, roughness: 0.7 }));
  corpo.position.set(0, 0.04 + (H_BALCAO - 0.08) / 2, 0); g.add(corpo);
  const rodape = caixa(w - 0.06, 0.04, d - 0.1, 0.002, acoPreto()); rodape.position.set(0, 0.02, -0.01); g.add(rodape);
  const tampo = caixa(w, 0.04, d, 0.006, MAT.madeira); tampo.position.y = H_BALCAO - 0.02; g.add(tampo);
  for (let i = 0; i < 3; i++) { const r = new THREE.Mesh(new THREE.PlaneGeometry(0.004, H_BALCAO - 0.14), new THREE.MeshStandardMaterial({ color: 0xc9c5bc })); r.position.set(-w / 2 + (i + 1) * w / 4, 0.04 + (H_BALCAO - 0.08) / 2, d / 2 - 0.019); g.add(r); }
  return g;
}

function armario(w, d) {
  const g = new THREE.Group();
  const corpo = caixa(w, H_MESA - 0.03, d, 0.006, new THREE.MeshStandardMaterial({ color: 0x3b4250, roughness: 0.6 }));
  corpo.position.y = (H_MESA - 0.03) / 2; g.add(corpo);
  const tampo = caixa(w + 0.02, 0.03, d + 0.02, 0.005, MAT.madeira); tampo.position.y = H_MESA - 0.015; g.add(tampo);
  for (let i = 0; i < 3; i++) {
    const y = 0.13 + i * 0.22;
    const linha = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.04, 0.004), MAT.plasticoPreto); linha.position.set(0, y + 0.1, d / 2 + 0.0005); g.add(linha);
    const pux = caixa(0.12, 0.012, 0.02, 0.004, MAT.aco); pux.position.set(0, y + 0.04, d / 2 + 0.01); g.add(pux);
  }
  return g;
}

function piso() {
  // concreto escuro que some nas bordas (o fundo é o da página)
  const s = superficie(1024, 1024), c = s.ctx;
  const gr = c.createRadialGradient(512, 512, 120, 512, 512, 512);
  gr.addColorStop(0, "rgba(255,255,255,1)"); gr.addColorStop(0.65, "rgba(255,255,255,.75)"); gr.addColorStop(1, "rgba(255,255,255,0)");
  c.fillStyle = gr; c.fillRect(0, 0, 1024, 1024);
  s.tex.colorSpace = THREE.NoColorSpace;
  const mat = new THREE.MeshStandardMaterial({ color: 0x1a2740, roughness: 0.85, metalness: 0, alphaMap: s.tex, transparent: true, depthWrite: false });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(11, 7), mat);
  m.rotation.x = -Math.PI / 2; m.position.set(-0.4, 0, -0.4); m.receiveShadow = true;
  m.renderOrder = -1;
  return m;
}

// cria o objeto, coloca no lugar e devolve a parada
function colocar(g, def, pos, rotY = 0, vistaExtra = {}) {
  const inst = def.criar();
  inst.grupo.position.set(...pos);
  inst.grupo.rotation.y = rotY;
  g.add(inst.grupo);
  return { id: def.id, def, inst, rotY, vista: { ...def.vista, ...vistaExtra } };
}

export function criarEscritorio() {
  const raiz = new THREE.Group();
  raiz.add(piso());
  const g = new THREE.Group();
  raiz.add(g);
  // mesa principal (abertura): notebook, prancheta e celular
  const mA = mesa(1.5, 0.75); g.add(mA);
  // mesa do analista (esquerda): monitor e notebook de segurança
  const mB = mesa(1.9, 0.75); mB.position.set(-2.05, 0, -0.25); g.add(mB);
  // armário de arquivo (frente à esquerda): auditoria
  const arm = armario(0.95, 0.5); arm.position.set(-3.55, 0, 0.75); arm.rotation.y = 0.35; g.add(arm);
  // balcão de vendas (direita)
  const bal = balcao(1.3, 0.6); bal.position.set(2.55, 0, 0.75); bal.rotation.y = -0.35; g.add(bal);

  const paradas = {
    notebook: colocar(g, notebook, [0, H_MESA, 0.02], 0, { az: 0.0, el: 0.3, folga: 1.0 }),
    prancheta: colocar(g, prancheta, [-0.48, H_MESA, 0.05], 0.35),
    celular: colocar(g, celular, [0.5, H_MESA, -0.08], -0.35),
    monitor: colocar(g, monitor, [-2.35, H_MESA, -0.35], 0.1),
    cyber: colocar(g, cyber, [-1.6, H_MESA, 0.0], 0.05, { az: 0.35 }),
    estoque: colocar(g, estoque, [-1.0, 0, -1.75], 0.15),
    servidor: colocar(g, servidor, [1.75, 0, -1.95], -0.3, { az: -0.05, el: 0.3 }),
    auditoria: colocar(g, auditoria, [-3.5, H_MESA, 0.8], 0.35, { el: 0.55 }),
    maquininha: colocar(g, maquininha, [2.55, H_BALCAO, 0.75], -0.35),
  };
  // o switch fica em cima do rack (onde ele fica de verdade)
  const rack = paradas.servidor.inst.grupo;
  const sw = switchRede.criar(); sw.grupo.position.set(0, 12 * 0.0445 + 0.1 + 0.03, -0.06); rack.add(sw.grupo);
  paradas.switch = { id: "switch", def: switchRede, inst: sw, rotY: -0.3, vista: switchRede.vista };
  // visão geral do escritório (fecho da página)
  paradas.escritorio = { id: "escritorio", inst: { grupo: g, desenhar() {} }, rotY: 0, vista: { az: 0.2, el: 0.36, folga: 0.62 } };

  return { grupo: raiz, paradas };
}

// Pose da câmera que enquadra uma parada dentro da área útil da tela (a fração fw x fh onde o texto não cobre).
const _caixa = new THREE.Box3(), _c = new THREE.Vector3(), _s = new THREE.Vector3();
export function pose(parada, camera, fw = 1, fh = 1) {
  const v = parada.vista;
  _caixa.setFromObject(parada.inst.grupo);
  _caixa.getCenter(_c); _caixa.getSize(_s);
  const raio = _s.length() / 2;
  const tv = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
  const tMin = Math.min(tv * fh, tv * camera.aspect * fw);
  const d = (raio * (v.folga ?? 1.1)) / Math.sin(Math.atan(tMin));
  const az = (v.az ?? 0.4) + parada.rotY, el = v.el ?? 0.3;
  const alvo = _c.clone();
  const pos = new THREE.Vector3(alvo.x + d * Math.sin(az) * Math.cos(el), alvo.y + d * Math.sin(el), alvo.z + d * Math.cos(az) * Math.cos(el));
  return { pos, alvo };
}
