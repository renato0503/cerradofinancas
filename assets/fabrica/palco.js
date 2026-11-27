// Palco 3D único da /fabrica: um canvas, luz de estúdio, sombra real e níveis de qualidade.
// Renderiza só quando algo muda (pedirQuadro) e para quando a aba some.
import * as THREE from "three";
import { RoomEnvironment } from "./vendor/RoomEnvironment.js";

export function nivelInicial() {
  const reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const gl = (() => { try { const c = document.createElement("canvas"); return c.getContext("webgl2") || c.getContext("webgl"); } catch { return null; } })();
  if (!gl || reduz) return "estatico";
  const toque = matchMedia("(pointer: coarse)").matches;
  const mem = navigator.deviceMemory || 8, nucleos = navigator.hardwareConcurrency || 8;
  if (toque || mem <= 4 || nucleos <= 4 || innerWidth < 820) return "leve";
  return "completo";
}

export function criarPalco(canvas, { nivel = "completo", fundo = null, exposicao = 1.0 } = {}) {
  const leve = nivel === "leve";
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !leve, alpha: fundo === null, powerPreference: "high-performance", preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, leve ? 1.25 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = exposicao;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = leve ? THREE.PCFShadowMap : THREE.PCFSoftShadowMap;

  const cena = new THREE.Scene();
  if (fundo !== null) cena.background = new THREE.Color(fundo);
  const pmrem = new THREE.PMREMGenerator(renderer);
  cena.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  cena.environmentIntensity = 0.75;

  // luz principal (janela) + preenchimento frio + contraluz dourada
  const chave = new THREE.DirectionalLight(0xffffff, 2.1);
  chave.position.set(2.2, 3.4, 2.0);
  chave.castShadow = true;
  chave.shadow.mapSize.set(leve ? 1024 : 2048, leve ? 1024 : 2048);
  chave.shadow.bias = -0.0004; chave.shadow.normalBias = 0.02;
  const sc = chave.shadow.camera; sc.left = -1.2; sc.right = 1.2; sc.top = 1.2; sc.bottom = -1.2; sc.near = 0.5; sc.far = 10;
  cena.add(chave, chave.target);
  const preench = new THREE.DirectionalLight(0xcfe0ff, 0.5); preench.position.set(-3, 1.5, 1);
  const contra = new THREE.DirectionalLight(0xf1f5ff, 0.35); contra.position.set(-1.5, 2, -3);
  cena.add(preench, contra);

  // chão que só recebe sombra (o fundo é o da página)
  const chao = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.ShadowMaterial({ opacity: 0.28 }));
  chao.rotation.x = -Math.PI / 2; chao.receiveShadow = true;
  cena.add(chao);

  const camera = new THREE.PerspectiveCamera(32, 1, 0.01, 50);

  let pedido = false, desenhar = null, visivel = true;
  function tamanho() {
    const w = canvas.clientWidth || innerWidth, h = canvas.clientHeight || innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    pedirQuadro();
  }
  function quadro() {
    pedido = false;
    if (desenhar) desenhar();
    renderer.render(cena, camera);
  }
  function pedirQuadro() { if (!pedido && visivel) { pedido = true; requestAnimationFrame(quadro); } }
  document.addEventListener("visibilitychange", () => { visivel = !document.hidden; if (visivel) pedirQuadro(); });
  new ResizeObserver(tamanho).observe(canvas);
  tamanho();

  // Enquadra um objeto: câmera olhando o centro, distância pelo tamanho da caixa.
  function enquadrar(obj, { az = 0.6, el = 0.35, folga = 1.25, alvoY = null } = {}) {
    const caixa = new THREE.Box3().setFromObject(obj);
    const c = caixa.getCenter(new THREE.Vector3()), s = caixa.getSize(new THREE.Vector3());
    const raio = s.length() / 2;
    const fov = THREE.MathUtils.degToRad(camera.fov);
    const fovMin = camera.aspect < 1 ? 2 * Math.atan(Math.tan(fov / 2) * camera.aspect) : fov;
    const d = (raio * folga) / Math.sin(fovMin / 2);
    const alvo = new THREE.Vector3(c.x, alvoY ?? c.y, c.z);
    camera.position.set(alvo.x + d * Math.sin(az) * Math.cos(el), alvo.y + d * Math.sin(el), alvo.z + d * Math.cos(az) * Math.cos(el));
    camera.lookAt(alvo);
    chave.target.position.copy(alvo);
    const k = Math.max(raio * 1.6, 0.4); sc.left = -k; sc.right = k; sc.top = k; sc.bottom = -k; sc.updateProjectionMatrix();
    chave.position.set(alvo.x + 2.2, alvo.y + 3.4, alvo.z + 2.0);
  }

  return { renderer, cena, camera, chao, chave, nivel, pedirQuadro, enquadrar, set desenhar(f) { desenhar = f; } };
}
