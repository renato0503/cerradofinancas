// Controlador da /fabrica: texto primeiro, 3D depois. A rolagem escolhe a parada da câmera e o progresso
// da animação de cada objeto (função pura, igual aos filmes); o relógio só toca a abertura e os LEDs.
import { MODULOS, MODULOS_PADRAO } from "./modulos.js";

const raiz = document.documentElement;
const reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;
const ponteiroFino = matchMedia("(pointer: fine)").matches;
const WHATS = "5567993515206";

// ---------------------------------------------------------------- texto e navegação (funciona sem 3D)
const obs = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("vis"); obs.unobserve(e.target); } }), { threshold: 0.15 });
document.querySelectorAll(".revela").forEach((el) => obs.observe(el));
const topo = document.getElementById("topo");
const trilho = document.querySelector(".trilho");
const linksTrilho = [...trilho.querySelectorAll("a")];
const inicioSol = document.getElementById("solucoes"), fimSol = document.getElementById("monte");
function aoRolar() {
  topo.classList.toggle("solido", scrollY > 40);
  const a = inicioSol.getBoundingClientRect(), b = fimSol.getBoundingClientRect();
  trilho.classList.toggle("on", a.top < innerHeight * 0.4 && b.bottom > innerHeight * 0.6);
}
addEventListener("scroll", aoRolar, { passive: true });
aoRolar();

// Monte o seu sistema: a escolha vira a lista do WhatsApp, o campo do formulário e a tela do notebook
const caixas = [...document.querySelectorAll(".modulos input")];
const linkMonte = document.getElementById("monte-whats");
const campoModulos = document.getElementById("form-modulos");
let modulos = [...MODULOS_PADRAO];
function aoEscolher() {
  modulos = caixas.filter((c) => c.checked).map((c) => c.value);
  const nomes = modulos.map((k) => MODULOS[k].menu);
  const texto = nomes.length
    ? `Olá! Quero uma proposta de sistema sob medida com: ${nomes.join(", ")}.`
    : "Olá! Quero uma proposta de software sob medida.";
  linkMonte.href = `https://api.whatsapp.com/send?phone=${WHATS}&text=${encodeURIComponent(texto)}`;
  campoModulos.value = nomes.join(", ");
  window.dispatchEvent(new Event("fabrica:modulos"));
}
caixas.forEach((c) => c.addEventListener("change", aoEscolher));
aoEscolher();

// comparador prateleira × sob medida
const comp = document.getElementById("comparador");
if (comp) {
  const pega = document.createElement("span"); pega.className = "pega"; pega.textContent = "⇆"; pega.setAttribute("aria-hidden", "true"); comp.append(pega);
  const div = comp.querySelector(".divisoria");
  div.addEventListener("input", () => comp.style.setProperty("--corte", div.value + "%"));
}

// cartões da stack inclinam com o mouse
if (ponteiroFino && !reduz) document.querySelectorAll(".inclina").forEach((el) => {
  el.addEventListener("pointermove", (e) => {
    const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(6px)`;
  });
  el.addEventListener("pointerleave", () => { el.style.transform = ""; });
});

// ---------------------------------------------------------------- 3D
const { nivelInicial } = await import("./nivel.js");
let nivel = new URLSearchParams(location.search).get("nivel") || nivelInicial();
if (nivel === "estatico") {
  raiz.classList.add("sem3d");
} else {
  // o texto aparece primeiro; o 3D entra depois da carga (no nível leve, quando o navegador estiver livre)
  if (document.readyState !== "complete") await new Promise((r) => addEventListener("load", r, { once: true }));
  if (nivel === "leve") await new Promise((r) => {
    // no celular, o pôster segura a abertura; o 3D entra no primeiro gesto ou depois de alguns segundos
    let feito = false;
    const vai = () => { if (feito) return; feito = true; ["scroll", "touchstart", "pointerdown"].forEach((ev) => removeEventListener(ev, vai)); r(); };
    ["scroll", "touchstart", "pointerdown"].forEach((ev) => addEventListener(ev, vai, { passive: true, once: true }));
    setTimeout(() => (window.requestIdleCallback || setTimeout)(vai, { timeout: 2000 }), 3500);
  });
  await Promise.all(["800 20px Inter", "500 20px Inter", "600 20px 'JetBrains Mono'", "500 20px Caveat"].map((f) => document.fonts.load(f).catch(() => 0)));
  iniciar3D().catch((e) => { console.error(e); raiz.classList.add("sem3d"); });
}

async function iniciar3D() {
  const THREE = await import("three");
  const { criarPalco } = await import("./palco.js");
  const { escalaTelas, medindo } = await import("./base.js");
  if (nivel === "leve") escalaTelas(0.6);
  const { criarEscritorio, pose } = await import("./escritorio.js");
  const canvas = document.getElementById("palco");
  const palco = criarPalco(canvas, { nivel, comChao: false, exposicao: 1.0 });
  const { camera, renderer, cena, chave } = palco;
  const esc = criarEscritorio();
  cena.add(esc.grupo);
  // o que aparece na abertura já nasce pronto (a mesa principal e a estante ao fundo)
  ["notebook", "prancheta", "celular", "estoque"].forEach((id) => esc.garantir(id));
  const sc = chave.shadow.camera; sc.left = -1.8; sc.right = 1.8; sc.top = 1.8; sc.bottom = -1.8; sc.far = 12; sc.updateProjectionMatrix();

  // paradas na ordem da página
  const secoes = [...document.querySelectorAll("[data-parada]")].map((el) => ({
    el, id: el.dataset.parada, par: esc.paradas[el.dataset.parada],
    link: el.querySelector(".mais")?.getAttribute("href") || null,
  }));
  const OBJETOS = new Set(["notebook", "estoque", "celular", "servidor", "maquininha", "auditoria", "monitor", "cyber", "switch", "prancheta", "notebook-monte"]);

  // layout: no PC o objeto fica à direita do texto; no celular, na parte de cima
  let layout = null, poses = [];
  function calcularLayout() {
    const w = innerWidth, h = innerHeight;
    layout = w > 820 ? { pc: true, fw: 0.56, fh: 1, sx: 0.42, sy: 0.02, folga: 1.05 } : { pc: false, fw: 1, fh: 0.42, sx: 0, sy: 0.58, folga: 1.05 };
    poses = [];
  }
  // pose de uma parada, calculada na primeira vez que é pedida (cria o objeto se preciso; mede tudo "aberto")
  function poseDe(k) {
    if (poses[k]) return poses[k];
    const s = secoes[k], pc = layout.pc;
    esc.garantir(s.id);
    if (s.id !== "escritorio") { medindo(true); s.par.inst.desenhar(1, 0); medindo(false); }
    const extra = s.id === "notebook" ? { folga: pc ? 1.35 : 1.15, el: 0.34, az: pc ? 0.22 : 0.08 } : {};
    const vista = { ...s.par.vista, ...extra };
    if (s.id === "escritorio") poses[k] = { ...pose({ ...s.par, vista }, camera, 1, 1), sx: 0, sy: pc ? 0 : 0.1 };
    else {
      vista.folga = (vista.folga ?? 1.1) * layout.folga;
      poses[k] = { ...pose({ ...s.par, vista }, camera, layout.fw, layout.fh), sx: layout.sx, sy: layout.sy };
    }
    return poses[k];
  }
  calcularLayout();
  addEventListener("resize", () => { calcularLayout(); acordar(); });

  // desloca a imagem para a área livre (sem cobrir o texto)
  const desloc = { x: poseDe(0).sx, y: poseDe(0).sy };
  function projetar() {
    camera.updateProjectionMatrix();
    camera.projectionMatrix.elements[8] -= desloc.x; camera.projectionMatrix.elements[9] -= desloc.y;
    camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
  }
  palco.desenhar = projetar;

  // câmera suavizada + giro do usuário (arrastar) que volta sozinho ao soltar
  const camPos = poseDe(0).pos.clone(), camAlvo = poseDe(0).alvo.clone();
  const desejoPos = new THREE.Vector3(), desejoAlvo = new THREE.Vector3();
  const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
  const giro = { yaw: 0, pitch: 0, alvoYaw: 0, alvoPitch: 0, ativo: false };
  if (ponteiroFino) addEventListener("pointermove", (e) => { mouse.x = e.clientX / innerWidth - 0.5; mouse.y = e.clientY / innerHeight - 0.5; acordar(); }, { passive: true });

  const t0 = performance.now();
  const DUR_ABERTURA = reduz ? 0 : 3.4;
  const suave = (x) => x * x * (3 - 2 * x);
  const clamp = (x) => Math.min(1, Math.max(0, x));

  let estado = { i: 0, f: 0, prog: [] };
  function estadoRolagem() {
    const vh = innerHeight, meio = vh / 2;
    const centros = secoes.map((s) => { const r = s.el.getBoundingClientRect(); return { r, c: r.top + r.height / 2 - meio }; });
    let i = 0;
    while (i < centros.length - 1 && centros[i + 1].c <= 0) i++;
    let f = 0;
    if (i < centros.length - 1 && centros[i].c <= 0) f = clamp(-centros[i].c / (centros[i + 1].c - centros[i].c));
    const fv = suave(clamp((f - 0.22) / 0.56));
    const prog = centros.map(({ r }) => clamp((vh * 0.85 - r.top) / (vh * 0.85 + r.height * 0.15)));
    return { i, f: fv, prog };
  }
  const progDe = (id) => { const k = secoes.findIndex((s) => s.id === id); return k < 0 ? 1 : estado.prog[k]; };

  let ativo = false, ultimo = performance.now(), atual = -1, amostras = [], baixou = false;
  const dicaGiro = Object.assign(document.createElement("div"), { className: "dica-giro", textContent: ponteiroFino ? "Arraste para girar · clique no objeto para abrir" : "Arraste de lado para girar" });
  document.body.append(dicaGiro);
  let jaGirou = false;

  function quadro(agora) {
    const dt = Math.min(0.05, (agora - ultimo) / 1000); ultimo = agora;
    const t = (agora - t0) / 1000;
    estado = estadoRolagem();
    const { i, f } = estado;
    const a = poseDe(i), b = poseDe(Math.min(i + 1, secoes.length - 1));
    // prepara com antecedência o objeto da parada seguinte à próxima (um por quadro, sem travar)
    const adiante = secoes[Math.min(i + 2, secoes.length - 1)];
    if (adiante && !adiante.par.inst) esc.garantir(adiante.id);
    desejoPos.lerpVectors(a.pos, b.pos, f); desejoAlvo.lerpVectors(a.alvo, b.alvo, f);
    desejoPos.y += Math.sin(f * Math.PI) * 0.35;
    const kd = reduz ? 1 : 1 - Math.exp(-dt * 5.5);
    desloc.x += (a.sx + (b.sx - a.sx) * f - desloc.x) * kd; desloc.y += (a.sy + (b.sy - a.sy) * f - desloc.y) * kd;
    // giro do usuário em torno do alvo (volta ao centro quando solta)
    if (!giro.ativo) { giro.alvoYaw *= Math.exp(-dt * 3); giro.alvoPitch *= Math.exp(-dt * 3); }
    giro.yaw += (giro.alvoYaw - giro.yaw) * Math.min(1, dt * 10); giro.pitch += (giro.alvoPitch - giro.pitch) * Math.min(1, dt * 10);
    const rel = new THREE.Vector3().subVectors(desejoPos, desejoAlvo);
    const esf = new THREE.Spherical().setFromVector3(rel);
    esf.theta += giro.yaw; esf.phi = Math.min(Math.PI * 0.49, Math.max(0.15, esf.phi - giro.pitch));
    rel.setFromSpherical(esf); desejoPos.copy(desejoAlvo).add(rel);
    // mouse: leve paralaxe
    mouse.sx += (mouse.x - mouse.sx) * Math.min(1, dt * 4); mouse.sy += (mouse.y - mouse.sy) * Math.min(1, dt * 4);
    const dist = desejoPos.distanceTo(desejoAlvo);
    const dir = new THREE.Vector3().subVectors(desejoAlvo, desejoPos).normalize();
    const lado = new THREE.Vector3().crossVectors(dir, camera.up).normalize();
    desejoPos.addScaledVector(lado, -mouse.sx * dist * 0.05).addScaledVector(camera.up, mouse.sy * dist * 0.03);
    camPos.lerp(desejoPos, kd); camAlvo.lerp(desejoAlvo, kd);
    camera.position.copy(camPos); camera.lookAt(camAlvo);
    projetar();
    chave.target.position.copy(camAlvo); chave.position.set(camAlvo.x + 2.2, camAlvo.y + 3.4, camAlvo.z + 2.0);
    // animações: cada objeto com o progresso da sua seção (o notebook toca a abertura e mostra os módulos escolhidos)
    // só atualiza o que está perto da câmera (o resto fica parado no último estado)
    const perto = new Set();
    for (let k = Math.max(0, i - 1); k <= Math.min(secoes.length - 1, i + 2); k++) perto.add(secoes[k].par.alias || secoes[k].id);
    if (i <= 1) ["prancheta", "celular"].forEach((id) => perto.add(id));
    for (const id of perto) {
      const par = esc.paradas[id];
      if (!par || !par.inst || id === "escritorio") continue;
      if (id === "notebook") par.inst.desenhar(DUR_ABERTURA ? clamp(t / DUR_ABERTURA) : 1, t, { modulos });
      else par.inst.desenhar(progDe(id), t);
    }
    renderer.render(cena, camera);
    // parada atual: trilho, dica de giro
    const idx = f > 0.5 ? i + 1 : i;
    if (idx !== atual) {
      atual = idx;
      const id = secoes[idx]?.id;
      linksTrilho.forEach((l) => l.classList.toggle("atual", l.dataset.alvo === id));
      dicaGiro.classList.toggle("on", !jaGirou && OBJETOS.has(id) && id !== "notebook");
    }
    if (!baixou && amostras.length < 90) { amostras.push(dt); if (amostras.length === 90) { const m = amostras.reduce((x, y) => x + y) / 90; if (m > 0.03) { renderer.setPixelRatio(1); baixou = true; } } }
    const movendo = t < DUR_ABERTURA + 0.2 || camPos.distanceToSquared(desejoPos) > 1e-7 || camAlvo.distanceToSquared(desejoAlvo) > 1e-7 || Math.abs(giro.yaw) > 1e-4 || Math.abs(giro.pitch) > 1e-4 || Math.abs(desloc.x - b.sx) > 1e-4;
    const vivo = t < DUR_ABERTURA + 0.2 || ["servidor", "monitor", "cyber", "switch"].includes(secoes[idx]?.id);
    if ((movendo || vivo) && !document.hidden) requestAnimationFrame(quadro); else ativo = false;
  }
  function acordar() { if (!ativo && !document.hidden) { ativo = true; ultimo = performance.now(); requestAnimationFrame(quadro); } }
  addEventListener("scroll", acordar, { passive: true });
  addEventListener("fabrica:modulos", acordar);
  document.addEventListener("visibilitychange", acordar);

  // ---------------- tocar e girar: arrastar gira a câmera; toque/clique no objeto abre o serviço
  const IGNORAR = "a, button, input, textarea, label, select, .cartao, .consult, .pessoa, .stack, .comparador, .fim > div, .topo, .trilho, .hero-txt, .sol-cab, .compara header";
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  function objetoSob(x, y) {
    const s = secoes[atual];
    if (!s || !OBJETOS.has(s.id) || !s.par.inst) return null;
    ndc.set((x / innerWidth) * 2 - 1, -(y / innerHeight) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    return ray.intersectObject(s.par.inst.grupo, true).length ? s : null;
  }
  let arr = null;
  addEventListener("pointerdown", (e) => {
    if (e.button !== 0 || e.target.closest(IGNORAR)) return;
    arr = { x: e.clientX, y: e.clientY, t: performance.now(), yaw: giro.alvoYaw, pitch: giro.alvoPitch, moveu: false, tipo: e.pointerType };
  });
  addEventListener("pointermove", (e) => {
    if (!arr) {
      if (ponteiroFino && !e.target.closest(IGNORAR)) raiz.classList.toggle("sobre-objeto", !!objetoSob(e.clientX, e.clientY));
      return;
    }
    const dx = e.clientX - arr.x, dy = e.clientY - arr.y;
    if (!arr.moveu && Math.hypot(dx, dy) > 6) {
      // no toque, só o arrasto de lado gira (o de cima para baixo continua rolando a página)
      if (arr.tipo !== "mouse" && Math.abs(dy) > Math.abs(dx)) { arr = null; return; }
      arr.moveu = true; giro.ativo = true; raiz.classList.add("pegando");
      if (!jaGirou) { jaGirou = true; dicaGiro.classList.remove("on"); }
    }
    if (arr.moveu) {
      giro.alvoYaw = Math.max(-0.9, Math.min(0.9, arr.yaw - dx * 0.006));
      giro.alvoPitch = arr.tipo === "mouse" ? Math.max(-0.3, Math.min(0.3, arr.pitch + dy * 0.003)) : 0;
      acordar();
    }
  });
  function soltar(e) {
    if (!arr) return;
    if (!arr.moveu && performance.now() - arr.t < 500) {
      const s = objetoSob(e.clientX, e.clientY);
      if (s && s.link) location.href = s.link;
      else if (s && s.id === "notebook") document.getElementById("solucoes").scrollIntoView({ behavior: reduz ? "auto" : "smooth" });
    }
    arr = null; giro.ativo = false; raiz.classList.remove("pegando"); acordar();
  }
  addEventListener("pointerup", soltar);
  addEventListener("pointercancel", () => { arr = null; giro.ativo = false; raiz.classList.remove("pegando"); });

  // compila os shaders sem travar a página e só então mostra o 3D (aparece com fade)
  if (renderer.compileAsync) await renderer.compileAsync(cena, camera);
  acordar();
  raiz.classList.add("com3d");
  window.__fabrica = { palco, esc, poses: () => poses, nivel, objetoSob, atual: () => secoes[atual]?.id };
}
