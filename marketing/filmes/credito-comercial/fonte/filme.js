// Crédito, comercial de 15s. Uma linha do tempo pausada; tudo é função do tempo.
(function () {
  const V = document.documentElement.classList.contains("vertical");
  const tl = gsap.timeline({ paused: true });
  const PAPEL = "#fbfbf8", CANETA = "#1f3ae0";

  // ---- Rastro de eco: 3 cópias empilhadas que repetem a entrada atrasadas ----
  const OPAC_ECO = [0.35, 0.2, 0.1];
  const ecos = new Map();
  document.querySelectorAll("[data-eco]").forEach((el) => {
    const grade = document.createElement("div");
    grade.style.cssText = "display:grid;place-items:center";
    el.parentNode.insertBefore(grade, el);
    const copias = OPAC_ECO.map((op) => {
      const c = el.cloneNode(true);
      c.removeAttribute("id");
      c.querySelectorAll("[id]").forEach((x) => x.removeAttribute("id"));
      c.setAttribute("aria-hidden", "true");
      c.removeAttribute("data-eco");
      c.setAttribute("data-layout-ignore", "");
      c.style.gridArea = "1 / 1";
      c.dataset.op = op;
      grade.appendChild(c);
      return c;
    });
    el.style.gridArea = "1 / 1";
    grade.appendChild(el);
    ecos.set(el, copias);
  });
  function entrar(raiz, sel, de, para, t, dur, ease, stagger = 0) {
    [raiz, ...(ecos.get(raiz) || [])].forEach((g, k) => {
      const itens = sel ? g.querySelectorAll(sel) : [g];
      const op = k === 0 ? 1 : Number(g.dataset.op);
      const tk = t + k * 0.045;
      tl.fromTo(itens, { ...de, opacity: 0 }, { ...para, opacity: op, duration: dur, ease, stagger }, tk);
      if (k > 0) tl.to(itens, { opacity: 0, duration: 0.18, stagger }, tk + dur * 0.55);
    });
  }

  // ---- A proposta 3D: lâminas de espessura entre a frente e o verso ----
  document.querySelectorAll("#papel .lamina").forEach((l, i) => gsap.set(l, { z: -5.25 + i * 1.5 }));
  gsap.set("#papel .frente", { z: 6.5 });
  gsap.set("#papel .verso", { z: -6.5, rotationY: 180 });

  tl.set("#fundo", { backgroundColor: PAPEL }, 0);
  tl.set("#folha", { scale: 1, x: 0, y: 0 }, 0);
  tl.set("#papel", { rotationY: 0, rotationX: 0 }, 0);
  tl.set(["#p1", "#p2", "#p3"], { opacity: 0 }, 0);

  // ---- 0-1,45: o ponto de tinta explode ----
  tl.fromTo("#ponto", { scale: 0 }, { scale: 1, duration: 0.35, ease: "back.out(2.2)" }, 0.15);
  tl.to("#ponto", { scale: 0.6, duration: 0.45, ease: "power2.inOut" }, 0.6);
  tl.to("#ponto", { scale: 140, duration: 0.38, ease: "power3.in" }, 1.07);
  tl.set("#fundo", { backgroundColor: CANETA }, 1.45);

  // ---- 1,45-3,6: Antes de assinar, ----
  const frase1 = document.querySelector("#cena-frase1 [data-eco]");
  entrar(frase1, ".palavra", { x: 240, filter: "blur(12px)" }, { x: 0, filter: "blur(0px)" }, 1.5, 0.5, "expo.out", 0.1);
  tl.to("#cena-frase1 .palavra", { x: -280, opacity: 0, filter: "blur(12px)", duration: 0.22, ease: "power3.in", stagger: 0.02 }, 3.36);

  // ---- 3,6-5,2: close no comparativo; a melhor proposta é grifada ----
  tl.set("#fundo", { backgroundColor: PAPEL }, 3.6);
  tl.fromTo("#folha", { opacity: 1, scale: 2.4, x: 120, y: 260 }, { opacity: 1, scale: 1.9, x: 90, y: 200, duration: 1.0, ease: "expo.out" }, 3.6);
  tl.fromTo("#papel", { rotationY: -22, rotationX: 8 }, { rotationY: 8, rotationX: 4, duration: 1.5, ease: "none" }, 3.6);
  tl.fromTo("#grifo-prop", { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: "power2.out" }, 4.3);

  // ---- 5,1-7,8: a proposta recua e gira; "compare." grifado em cima ----
  tl.to("#folha", { scale: V ? 0.8 : 0.62, x: 0, y: V ? 260 : 150, duration: 0.55, ease: "power3.inOut" }, 5.1);
  tl.to("#papel", { rotationY: 8 + 720, rotationX: 0, duration: 5.0, ease: "none" }, 5.1);
  tl.fromTo("#compare", { opacity: 0, y: 60, filter: "blur(12px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45, ease: "expo.out" }, 5.3);
  tl.fromTo("#grifo-compare", { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: "power2.out" }, 5.6);
  tl.to(["#compare", "#grifo-compare"], { opacity: 0, filter: "blur(10px)", duration: 0.2, ease: "power3.in" }, 7.6);

  // ---- 7,8-10,2: cards ao redor da proposta ----
  tl.to("#folha", { scale: V ? 0.7 : 0.55, y: 0, duration: 0.4, ease: "power3.inOut" }, 7.75);
  const c1 = document.querySelector(".card.c1"), c2 = document.querySelector(".card.c2");
  entrar(c1, null, V ? { y: -240, scale: 0.6 } : { x: -320, scale: 0.6 }, { x: 0, y: 0, scale: 1 }, 8.0, 0.55, "back.out(1.6)");
  entrar(c2, null, V ? { y: 240, scale: 0.6 } : { x: 320, scale: 0.6 }, { x: 0, y: 0, scale: 1 }, 8.4, 0.55, "back.out(1.6)");
  tl.to([c1, c2], { scale: 0.85, opacity: 0, filter: "blur(8px)", duration: 0.2, ease: "power3.in" }, 9.95);
  tl.to("#folha", { scale: 0.2, opacity: 0, duration: 0.25, ease: "power3.in" }, 9.95);

  // ---- 10,2-11,6: Simulação gratuita e sem compromisso ----
  tl.set("#fundo", { backgroundColor: CANETA }, 10.2);
  tl.fromTo("#f3", { opacity: 0, scale: 1.1, filter: "blur(10px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.35, ease: "expo.out" }, 10.22);
  tl.to("#f3", { opacity: 0, filter: "blur(10px)", duration: 0.15, ease: "power3.in" }, 11.44);

  // ---- 11,6-12,6: três palavras em corte seco ----
  tl.set("#fundo", { backgroundColor: PAPEL }, 11.6);
  [["#p1", 11.6, 11.93], ["#p2", 11.93, 12.27], ["#p3", 12.27, 12.6]].forEach(([id, a, b]) => {
    tl.fromTo(id, { opacity: 1, scale: 1.18, filter: "blur(6px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.25, ease: "expo.out" }, a);
    tl.set(id, { opacity: 0 }, b - 0.01);
  });

  // ---- 12,6-15: fecho com a folinha, a tagline e o aviso legal ----
  tl.fromTo("#f-marca", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.4, ease: "expo.out" }, 12.6);
  tl.fromTo("#f-tag", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.45, ease: "power3.out" }, 12.7);
  tl.fromTo("#f-zap", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "expo.out" }, 12.85);
  tl.fromTo("#f-aviso", { opacity: 0 }, { opacity: 1, duration: 0.25 }, 12.9);

  window.__timelines = window.__timelines || {};
  window.__timelines["main"] = tl;
})();
