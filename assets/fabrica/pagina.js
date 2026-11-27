// Controlador da /fabrica: texto primeiro, 3D depois. A rolagem escolhe a parada da câmera e o progresso
// da animação de cada objeto (função pura, igual aos filmes); o relógio só toca a abertura e os LEDs.
const raiz = document.documentElement;
const reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------------------------------------------------------------- texto e navegação (funciona sem 3D)
const obs = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("vis"); obs.unobserve(e.target); } }), { threshold: 0.2 });
document.querySelectorAll(".revela").forEach((el) => obs.observe(el));
const topo = document.getElementById("topo");
const trilho = document.querySelector(".trilho");
const linksTrilho = [...trilho.querySelectorAll("a")];
const secSol = document.getElementById("solucoes");
function aoRolar() {
  topo.classList.toggle("solido", scrollY > 40);
  const r = secSol.getBoundingClientRect();
  trilho.classList.toggle("on", r.top < innerHeight * 0.4 && r.bottom > innerHeight * 0.6);
}
addEventListener("scroll", aoRolar, { passive: true });
aoRolar();

// ---------------------------------------------------------------- 3D
const { nivelInicial } = await import("./palco.js");
let nivel = nivelInicial();
if (new URLSearchParams(location.search).get("nivel")) nivel = new URLSearchParams(location.search).get("nivel");
if (nivel === "estatico") {
  raiz.classList.add("sem3d");
} else {
  await Promise.all(["800 20px Inter", "500 20px Inter", "600 20px 'JetBrains Mono'", "500 20px Caveat"].map((f) => document.fonts.load(f).catch(() => 0)));
  iniciar3D().catch((e) => { console.error(e); raiz.classList.add("sem3d"); });
}

async function iniciar3D() {
  const THREE = await import("three");
  const { criarPalco } = await import("./palco.js");
  const { criarEscritorio, pose } = await import("./escritorio.js");
  const canvas = document.getElementById("palco");
  const palco = criarPalco(canvas, { nivel, comChao: false, exposicao: 1.0 });
  const { camera, renderer, cena, chave } = palco;
  const esc = criarEscritorio();
  cena.add(esc.grupo);
  const sc = chave.shadow.camera; sc.left = -1.8; sc.right = 1.8; sc.top = 1.8; sc.bottom = -1.8; sc.far = 12; sc.updateProjectionMatrix();

  // paradas na ordem da página
  const secoes = [...document.querySelectorAll("[data-parada]")].map((el) => ({ el, id: el.dataset.parada, par: esc.paradas[el.dataset.parada] }));
  const todas = Object.values(esc.paradas);

  // layout: no PC o objeto fica à direita do texto; no celular, na metade de cima
  let layout = null, poses = [];
  function calcularPoses() {
    const w = innerWidth, h = innerHeight, pc = w > 820;
    layout = pc ? { fw: 0.56, fh: 1, sx: 0.42, sy: 0.02, folga: 1.05 } : { fw: 1, fh: 0.42, sx: 0, sy: 0.58, folga: 1.05 };
    todas.forEach((p) => p.inst.desenhar(1, 0)); // poses medidas com tudo aberto
    poses = secoes.map((s) => {
      const extra = s.id === "notebook" ? { folga: pc ? 1.35 : 1.15, el: 0.34, az: pc ? 0.22 : 0.08 } : {};
      const vista = { ...s.par.vista, ...extra };
      // visão geral do fim: centralizada atrás do cartão de contato
      if (s.id === "escritorio") return { ...pose({ ...s.par, vista }, camera, 1, 1), sx: 0, sy: pc ? 0 : 0.1 };
      vista.folga = (vista.folga ?? 1.1) * layout.folga;
      return { ...pose({ ...s.par, vista }, camera, layout.fw, layout.fh), sx: layout.sx, sy: layout.sy };
    });
  }
  calcularPoses();
  addEventListener("resize", () => { calcularPoses(); acordar(); });

  // desloca a imagem para a área livre (sem cobrir o texto)
  const desloc = { x: 0, y: 0 };
  function projetar() {
    camera.updateProjectionMatrix();
    camera.projectionMatrix.elements[8] -= desloc.x; camera.projectionMatrix.elements[9] -= desloc.y;
    camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
  }
  palco.desenhar = projetar;
  // estado suavizado da câmera
  const camPos = poses[0].pos.clone(), camAlvo = poses[0].alvo.clone();
  desloc.x = poses[0].sx; desloc.y = poses[0].sy;
  const desejoPos = new THREE.Vector3(), desejoAlvo = new THREE.Vector3();
  const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
  if (matchMedia("(pointer: fine)").matches) addEventListener("pointermove", (e) => { mouse.x = e.clientX / innerWidth - 0.5; mouse.y = e.clientY / innerHeight - 0.5; acordar(); }, { passive: true });

  const t0 = performance.now();
  const DUR_ABERTURA = reduz ? 0 : 3.4;
  const suave = (x) => x * x * (3 - 2 * x);
  const clamp = (x) => Math.min(1, Math.max(0, x));

  function estadoRolagem() {
    const vh = innerHeight, meio = vh / 2;
    // índice contínuo s: entre a seção cujo centro já passou do meio da tela e a próxima
    const centros = secoes.map((s) => { const r = s.el.getBoundingClientRect(); return { r, c: r.top + r.height / 2 - meio }; });
    let i = 0;
    while (i < centros.length - 1 && centros[i + 1].c <= 0) i++;
    let f = 0;
    if (i < centros.length - 1 && centros[i].c <= 0) f = clamp(-centros[i].c / (centros[i + 1].c - centros[i].c));
    // a câmera descansa enquanto o cartão está no centro e viaja no meio do caminho
    const fv = suave(clamp((f - 0.22) / 0.56));
    // progresso de cada objeto: começa quando a seção entra e termina antes de ela sair
    const prog = centros.map(({ r }) => clamp((vh * 0.85 - r.top) / (vh * 0.85 + r.height * 0.15)));
    return { i, f: fv, prog };
  }

  let ativo = false, ultimo = performance.now(), atual = -1, amostras = [], baixou = false;
  function quadro(agora) {
    const dt = Math.min(0.05, (agora - ultimo) / 1000); ultimo = agora;
    const t = (agora - t0) / 1000;
    const { i, f, prog } = estadoRolagem();
    // pose desejada (interpolada) + leve arco para cima na viagem
    const a = poses[i], b = poses[Math.min(i + 1, poses.length - 1)];
    desejoPos.lerpVectors(a.pos, b.pos, f); desejoAlvo.lerpVectors(a.alvo, b.alvo, f);
    const kd = reduz ? 1 : 1 - Math.exp(-dt * 5.5);
    desloc.x += (a.sx + (b.sx - a.sx) * f - desloc.x) * kd; desloc.y += (a.sy + (b.sy - a.sy) * f - desloc.y) * kd;
    desejoPos.y += Math.sin(f * Math.PI) * 0.35;
    // mouse: pequeno deslocamento lateral
    mouse.sx += (mouse.x - mouse.sx) * Math.min(1, dt * 4); mouse.sy += (mouse.y - mouse.sy) * Math.min(1, dt * 4);
    const dist = desejoPos.distanceTo(desejoAlvo);
    const dir = new THREE.Vector3().subVectors(desejoAlvo, desejoPos).normalize();
    const lado = new THREE.Vector3().crossVectors(dir, camera.up).normalize();
    desejoPos.addScaledVector(lado, -mouse.sx * dist * 0.06).addScaledVector(camera.up, mouse.sy * dist * 0.04);
    const k = reduz ? 1 : 1 - Math.exp(-dt * 5.5);
    camPos.lerp(desejoPos, k); camAlvo.lerp(desejoAlvo, k);
    camera.position.copy(camPos); camera.lookAt(camAlvo);
    projetar();
    // sombra acompanha o foco
    chave.target.position.copy(camAlvo); chave.position.set(camAlvo.x + 2.2, camAlvo.y + 3.4, camAlvo.z + 2.0);
    // animações
    secoes.forEach((s, k2) => {
      const p = s.id === "notebook" ? (DUR_ABERTURA ? clamp(t / DUR_ABERTURA) : 1) : prog[k2];
      s.par.inst.desenhar(p, t);
    });
    esc.paradas.switch.inst.desenhar(prog[secoes.findIndex((s) => s.id === "servidor")], t);
    esc.paradas.prancheta.inst.desenhar(1, t);
    renderer.render(cena, camera);
    // trilho: parada atual
    const idx = f > 0.5 ? i + 1 : i;
    if (idx !== atual) { atual = idx; linksTrilho.forEach((l) => l.classList.toggle("atual", l.dataset.alvo === secoes[idx]?.id)); }
    // desempenho: se a média dos primeiros quadros for ruim, baixa a resolução uma vez
    if (!baixou && amostras.length < 90) { amostras.push(dt); if (amostras.length === 90) { const m = amostras.reduce((x, y) => x + y) / 90; if (m > 0.03) { renderer.setPixelRatio(1); baixou = true; } } }
    // continua enquanto a câmera se move, a abertura toca ou há LEDs na tela
    const movendo = camPos.distanceToSquared(desejoPos) > 1e-7 || camAlvo.distanceToSquared(desejoAlvo) > 1e-7;
    const vivo = t < DUR_ABERTURA + 0.2 || ["servidor", "monitor", "cyber"].includes(secoes[idx]?.id);
    if ((movendo || vivo) && !document.hidden) requestAnimationFrame(quadro); else ativo = false;
  }
  function acordar() { if (!ativo && !document.hidden) { ativo = true; ultimo = performance.now(); requestAnimationFrame(quadro); } }
  addEventListener("scroll", acordar, { passive: true });
  document.addEventListener("visibilitychange", acordar);
  acordar();
  raiz.classList.add("com3d");
  window.__fabrica = { palco, esc, poses, nivel };
}
