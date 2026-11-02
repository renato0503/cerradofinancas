// Cerra.AI, "o cobre": 12s de lâmina de cobre em 3D (CSS 3D), na identidade "Grainy gradient".
// Uma linha do tempo pausada; tudo é função do tempo (sem relógio, sem aleatório).
// Curvas: softLand (entrada desacelera), snapSettle (encaixe com peso), accelExit (saída acelera).
(function () {
  const V = document.documentElement.classList.contains("vertical");
  const tl = gsap.timeline({ paused: true });
  const COBRE = "#e2873b";

  // ---- Trilhas do chip: linhas de cobre que ligam uma a uma em direção ao centro ----
  const trilhas = document.querySelector("#trilhas");
  const ROTAS = [
    { x: 16, y: 26, w: 26, h: 0 },
    { x: 42, y: 22, w: 0, h: 24 },
    { x: 58, y: 26, w: 26, h: 0 },
    { x: 16, y: 44, w: 0, h: 22 },
    { x: 84, y: 24, w: 0, h: 40 },
    { x: 16, y: 62, w: 22, h: 0 },
    { x: 38, y: 62, w: 0, h: 18 },
    { x: 62, y: 60, w: 22, h: 0 },
    { x: 24, y: 36, w: 12, h: 0 },
    { x: 68, y: 34, w: 16, h: 0 },
  ];
  const elTrilhas = ROTAS.map((r) => {
    const d = document.createElement("div");
    d.className = r.h ? "trilha vertical" : "trilha";
    d.style.left = r.x + "%";
    d.style.top = r.y + "%";
    if (r.h) { d.style.setProperty("--h", r.h + "%"); d.style.height = r.h + "%"; }
    else d.style.width = r.w + "%";
    trilhas.appendChild(d);
    return d;
  });

  // ---- A lâmina: a folha com espessura (as cópias em translateZ viram a borda de cobre) ----
  const lamina = document.querySelector("#lamina");
  const base = lamina.querySelector("img");
  const COPIAS = 16;
  const camadas = [base];
  for (let i = 1; i < COPIAS; i++) {
    const c = base.cloneNode(true);
    c.removeAttribute("id");
    c.setAttribute("aria-hidden", "true");
    c.setAttribute("data-layout-ignore", "");
    lamina.appendChild(c);
    camadas.push(c);
  }
  camadas.forEach((img, i) => {
    const z = -i * 3;
    const miolo = i > 0 && i < COPIAS - 1;
    gsap.set(img, {
      xPercent: -50, yPercent: -50, z,
      filter: miolo ? `brightness(${0.30 + (i / COPIAS) * 0.4}) sepia(.55)` : "none",
    });
  });

  // ---- 0,0-2,6: o cobre acende, trilha por trilha ----
  tl.set("#fundo", { opacity: 1 }, 0);
  tl.fromTo(elTrilhas, { opacity: 0, scaleX: 0, scaleY: 0 },
    { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.55, ease: "power3.out", stagger: 0.11 }, 0.35);
  tl.fromTo("#luz", { opacity: 0 }, { opacity: 0.35, duration: 0.8, ease: "power2.out" }, 1.9);

  // ---- 2,2-4,4: a lâmina se levanta (chega de maior e desacelera) ----
  tl.fromTo("#objeto",
    { rotationX: 76, rotationY: -64, y: 74, scale: 1.3 },
    { rotationX: 54, rotationY: -26, y: 0, scale: 1, duration: 2.2, ease: "power4.out" }, 2.2);
  tl.fromTo("#lamina", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "none" }, 2.2);

  // ---- 3,4-5,4: a luz atravessa a superfície ----
  tl.fromTo("#luz", { xPercent: -46, opacity: 0.45 },
    { xPercent: 46, opacity: 0.45, immediateRender: false, duration: 2.0, ease: "power2.inOut" }, 3.4);
  tl.to("#luz", { opacity: 0.22, duration: 1.2, ease: "power2.inOut" }, 5.6);

  // ---- 5,4-6,6: a marca assenta, palavra por palavra (sem fade: entra se movendo) ----
  const marca = document.querySelector("#marca");
  tl.fromTo(marca, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.5, ease: "power3.out" }, 5.4);
  tl.fromTo(".wordmark span", { y: 46, scale: 1.06 },
    { y: 0, scale: 1, duration: 0.62, ease: "power4.out", stagger: 0.08 }, 5.5);
  tl.fromTo(".assinatura", { x: -26, clipPath: "inset(0 100% 0 0)" },
    { x: 0, clipPath: "inset(0 0% 0 0)", duration: 0.55, ease: "power3.out" }, 6.05);

  // ---- 7,6-12: a câmera recua (o fim é menor que o começo) e as trilhas baixam ----
  tl.to("#objeto", { rotationY: -18, rotationX: 50, scale: 0.92, duration: 3.4, ease: "power2.inOut" }, 7.6);
  tl.to(elTrilhas, { opacity: 0.32, duration: 2.2, ease: "power2.inOut" }, 7.8);
  tl.to("#luz", { opacity: 0.16, duration: 2.2, ease: "power2.inOut" }, 7.8);
  tl.to("#palco", { x: V ? 0 : -12, y: V ? -14 : 0, duration: 4.0, ease: "none" }, 7.6);

  // ---- Grão: a película nunca fica parada ----
  tl.fromTo("#grao", { backgroundPosition: "0px 0px" },
    { backgroundPosition: "46px 34px", duration: 12, ease: "steps(16)" }, 0);

  window.__timelines = window.__timelines || {};
  window.__timelines["main"] = tl;
})();
