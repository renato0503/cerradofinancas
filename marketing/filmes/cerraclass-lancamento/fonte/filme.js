// CerraClass, lançamento de 30s no estilo App Store. Uma linha do tempo pausada; tudo é função do tempo.
(function () {
  const V = document.documentElement.classList.contains("vertical");
  const tl = gsap.timeline({ paused: true });

  // Headlines viram palavras; a palavra-chave (<em>) fica em amarelo-ipê
  document.querySelectorAll(".headline h2").forEach((h) => {
    const partes = [];
    h.childNodes.forEach((n) => {
      const chave = n.nodeName === "EM";
      n.textContent.trim().split(/\s+/).filter(Boolean).forEach((w) => partes.push(`<span class="w${chave ? " chave" : ""}">${w}</span>`));
    });
    h.innerHTML = partes.join(" ");
  });

  // Celulares do leque: cópias do iPhone principal, cada uma mostrando uma tela
  const modelo = document.getElementById("iphone");
  document.querySelectorAll(".leque").forEach((slot) => {
    const c = modelo.cloneNode(true);
    c.removeAttribute("id");
    c.querySelectorAll(".tela-app").forEach((t) => { if (t.id !== slot.dataset.tela) t.remove(); });
    c.querySelectorAll("[id]").forEach((x) => x.removeAttribute("id"));
    c.style.position = "absolute";
    slot.appendChild(c);
  });
  // Espessura: as placas ficam atrás do corpo
  document.querySelectorAll(".iphone").forEach((ph) => {
    ph.querySelectorAll(".placa").forEach((p, i) => gsap.set(p, { z: -2 - i * 2 }));
  });

  // Posições por formato
  const BASE = V ? { x: 0, y: 290, scale: 1.05 } : { x: 430, y: 0, scale: 1 };
  const ZOOM = V ? { x: 0, y: 160, scale: 1.4 } : { x: 380, y: -130, scale: 1.5 };

  function mostrar(h, t) {
    tl.fromTo(`${h} .w`, { opacity: 0, filter: "blur(8px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.14, ease: "power2.out", stagger: 0.07 }, t);
  }
  function esconder(h, t) {
    tl.to(`${h} .w`, { opacity: 0, filter: "blur(8px)", duration: 0.18, ease: "power2.in", stagger: 0.025 }, t);
  }
  function trocar(de, para, t) {
    tl.to(de, { opacity: 0, filter: "blur(8px)", duration: 0.2, ease: "power2.in" }, t);
    tl.fromTo(para, { opacity: 0, scale: 1.05, filter: "blur(8px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.3, ease: "expo.out" }, t + 0.12);
  }
  function saltar(id, dx, dy, t) {
    tl.fromTo(id, { opacity: 0, x: BASE.x, y: BASE.y, scale: 0.2, filter: "blur(10px)" },
      { opacity: 1, x: BASE.x + dx, y: BASE.y + dy, scale: 1, filter: "blur(0px)", duration: 0.6, ease: "back.out(1.6)" }, t);
  }
  function recolher(ids, t) {
    tl.to(ids, { opacity: 0, scale: 0.8, filter: "blur(10px)", duration: 0.22, ease: "power3.in" }, t);
  }

  // ---- linhas de base ----
  tl.set(".headline .w", { opacity: 0 }, 0);
  tl.set(["#t2", "#t3", "#t4", "#t5"], { opacity: 0 }, 0);
  tl.set(".card", { opacity: 0 }, 0);

  // ---- brilhos: entram e derivam devagar o filme todo ----
  tl.fromTo(".brilho", { opacity: 0 }, { opacity: 0.35, duration: 1.2, ease: "power2.out" }, 0);
  tl.fromTo("#b1", { x: 0, y: 0 }, { x: -260, y: 120, duration: 30, ease: "none" }, 0);
  tl.fromTo("#b2", { x: 0, y: 0 }, { x: 180, y: -160, duration: 30, ease: "none" }, 0);
  tl.fromTo("#b3", { x: 0, y: 0 }, { x: 220, y: -80, duration: 30, ease: "none" }, 0);

  // ---- o iPhone sobe e flutua ----
  tl.fromTo("#palco", { opacity: 0, x: BASE.x, y: BASE.y + 900, scale: BASE.scale }, { opacity: 1, y: BASE.y, duration: 1.2, ease: "expo.out" }, 0.3);
  tl.fromTo("#iphone", { rotationY: -40, rotationX: 10 }, { rotationY: -16, rotationX: 5, duration: 1.4, ease: "expo.out" }, 0.3);
  tl.fromTo("#iphone", { y: 0 }, { y: -16, duration: 2, ease: "sine.inOut", yoyo: true, repeat: 10 }, 1.6);

  // ---- 0-5,6: catálogo ----
  mostrar("#h1", 0.7);
  tl.fromTo("#t1 .lista-cursos li", { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.35, ease: "expo.out", stagger: 0.12 }, 1.2);
  esconder("#h1", 5.3);

  // ---- 5,6-10,4: categorias ----
  trocar("#t1", "#t2", 5.5);
  tl.to("#iphone", { rotationY: -8, duration: 1.2, ease: "power2.inOut" }, 5.5);
  mostrar("#h2", 5.75);
  tl.fromTo("#t2 .chips span", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)", stagger: 0.08 }, 6.2);
  esconder("#h2", 10.1);

  // ---- 10,4-15,2: página do curso, zoom na régua ----
  trocar("#t2", "#t3", 10.3);
  mostrar("#h3", 10.55);
  tl.to("#iphone", { rotationY: 0, rotationX: 0, duration: 0.6, ease: "power2.inOut" }, 11.8);
  tl.to("#palco", { x: ZOOM.x, y: ZOOM.y, scale: ZOOM.scale, duration: 0.6, ease: "power2.inOut" }, 12.0);
  tl.fromTo("#regua-app .bl", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3, ease: "expo.out", stagger: 0.18 }, 12.4);
  tl.to("#palco", { x: BASE.x, y: BASE.y, scale: BASE.scale, duration: 0.6, ease: "power2.inOut" }, 14.4);
  tl.to("#iphone", { rotationY: -16, rotationX: 5, duration: 0.6, ease: "power2.inOut" }, 14.4);
  esconder("#h3", 14.9);

  // ---- 15,2-20,0: você sai com; cards saltam do celular ----
  trocar("#t3", "#t4", 15.1);
  mostrar("#h4", 15.35);
  const P = V ? [[-310, -250], [310, 0], [-300, 260]] : [[-330, -250], [330, -40], [-290, 230]];
  saltar("#card-a", P[0][0], P[0][1], 16.6);
  saltar("#card-b", P[1][0], P[1][1], 16.9);
  saltar("#card-c", P[2][0], P[2][1], 17.2);
  recolher(["#card-a", "#card-b", "#card-c"], 19.55);
  esconder("#h4", 19.7);

  // ---- 20,0-24,6: turma de até 10 ----
  trocar("#t4", "#t5", 19.9);
  mostrar("#h5", 20.15);
  tl.fromTo("#t5 .assentos-app i", { opacity: 0, y: 20, scale: 0.4 }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(2)", stagger: 0.05 }, 20.5);
  saltar("#card-d", P[0][0], P[0][1], 21.6);
  saltar("#card-e", P[1][0], P[1][1], 21.9);
  saltar("#card-f", P[2][0], P[2][1], 22.2);
  recolher(["#card-d", "#card-e", "#card-f"], 24.05);
  esconder("#h5", 24.15);
  tl.to("#palco", { opacity: 0, scale: BASE.scale * 0.9, filter: "blur(10px)", duration: 0.2, ease: "power2.in" }, 24.4);

  // ---- 24,6-27,4: cinco celulares em leque ----
  const LX = V ? [-330, -165, 0, 165, 330] : [-600, -300, 0, 300, 600];
  const LY = V ? [60, 15, 0, 15, 60] : [70, 20, 0, 20, 70];
  const LR = [-14, -7, 0, 7, 14];
  const LS = V ? 0.5 : 0.75;
  document.querySelectorAll(".leque").forEach((s, i) => {
    tl.fromTo(s, { opacity: 0, x: 0, y: 120, rotation: 0, scale: LS * 0.8, filter: "blur(10px)" },
      { opacity: 1, x: LX[i], y: LY[i], rotation: LR[i], scale: LS, filter: "blur(0px)", duration: 0.75, ease: "back.out(1.2)" }, 24.6 + Math.abs(i - 2) * 0.06);
    tl.to(s, { y: LY[i] + 500, opacity: 0, filter: "blur(12px)", duration: 0.35, ease: "power3.in" }, 26.95 + Math.abs(i - 2) * 0.03);
  });

  // ---- 27,2-30: logo + tagline ----
  tl.fromTo("#selo", { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.7, ease: "back.out(1.6)" }, 27.2);
  tl.fromTo("#marca", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.45, ease: "power3.out" }, 27.35);
  tl.fromTo("#tagline", { opacity: 0, filter: "blur(8px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.25, ease: "power2.out" }, 27.55);
  tl.fromTo("#endereco", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "expo.out" }, 27.7);

  window.__timelines = window.__timelines || {};
  window.__timelines["main"] = tl;
})();
