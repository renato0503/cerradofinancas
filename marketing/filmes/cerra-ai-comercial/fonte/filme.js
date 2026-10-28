// Cerra.AI, comercial de 15s. Uma linha do tempo pausada; tudo é função do tempo (sem relógio, sem aleatório).
(function () {
  const V = document.documentElement.classList.contains("vertical");
  const tl = gsap.timeline({ paused: true });
  const COBRE = "#e2873b", PRETO = "#0d0f0e";

  // ---- Rastro de eco: 3 cópias empilhadas no mesmo lugar, que repetem a entrada atrasadas ----
  const OPAC_ECO = [0.35, 0.2, 0.1];
  const ecos = new Map();
  document.querySelectorAll("[data-eco]").forEach((el) => {
    const grade = document.createElement("div");
    grade.style.cssText = "display:grid;place-items:center";
    el.parentNode.insertBefore(grade, el);
    const copias = OPAC_ECO.map((op) => {
      const c = el.cloneNode(true);
      c.removeAttribute("id");
      c.querySelectorAll("[id]").forEach((n) => n.removeAttribute("id"));
      c.setAttribute("aria-hidden", "true");
      c.removeAttribute("data-eco");
      c.setAttribute("data-layout-ignore", "");
      c.style.gridArea = "1 / 1";
      c.dataset.op = op;
      grade.appendChild(c);
      return c;
    });
    el.style.gridArea = "1 / 1";
    grade.appendChild(el); // o original fica por cima das cópias
    ecos.set(el, copias);
  });

  // Entrada com eco: o original vai a opacidade 1; cada cópia segue 0,045 s depois e some ao pousar
  function entrar(raiz, sel, de, para, t, dur, ease, stagger = 0) {
    [raiz, ...(ecos.get(raiz) || [])].forEach((g, k) => {
      const itens = sel ? g.querySelectorAll(sel) : [g];
      const op = k === 0 ? 1 : Number(g.dataset.op);
      const tk = t + k * 0.045;
      tl.fromTo(itens, { ...de, opacity: 0 }, { ...para, opacity: op, duration: dur, ease, stagger }, tk);
      if (k > 0) tl.to(itens, { opacity: 0, duration: 0.18, stagger }, tk + dur * 0.55);
    });
  }

  // ---- Produto 3D: 16 camadas da logo, 2 px de distância, miolo escurecido para virar a borda ----
  const camadas = document.querySelectorAll("#moeda img");
  camadas.forEach((img, i) => {
    const z = (i - (camadas.length - 1) / 2) * 2;
    const borda = i > 0 && i < camadas.length - 1;
    gsap.set(img, { z, filter: borda ? "brightness(0.42) sepia(0.6)" : "none" });
  });

  // ---- 0,0-1,45: o ponto nasce, recua e explode cobrindo a tela ----
  tl.set("#fundo", { backgroundColor: PRETO }, 0);
  // linha de base dos elementos que recebem mais de um fromTo
  tl.set("#produto", { scale: 1, x: 0, y: 0 }, 0);
  tl.set("#moeda", { rotationY: 0 }, 0);
  tl.fromTo("#ponto", { scale: 0 }, { scale: 1, duration: 0.35, ease: "back.out(2.2)" }, 0.15);
  tl.to("#ponto", { scale: 0.6, duration: 0.45, ease: "power2.inOut" }, 0.6);
  tl.to("#ponto", { scale: 140, duration: 0.38, ease: "power3.in" }, 1.07);
  tl.set("#fundo", { backgroundColor: COBRE }, 1.45);

  // ---- 1,45-3,7: frase 1, palavra por palavra em chicote ----
  const frase1 = document.querySelector("#cena-frase1 .frase");
  entrar(frase1, ".palavra", { x: 240, filter: "blur(12px)" }, { x: 0, filter: "blur(0px)" }, 1.5, 0.5, "expo.out", 0.06);
  tl.to("#cena-frase1 .palavra", { x: -280, opacity: 0, filter: "blur(12px)", duration: 0.22, ease: "power3.in", stagger: 0.02 }, 3.42);

  // ---- 3,7-5,5: close no chip, fundo preto ----
  tl.set("#fundo", { backgroundColor: PRETO }, 3.7);
  tl.fromTo("#produto", { opacity: 1, scale: 3.4, x: -150, y: 40 }, { opacity: 1, scale: 2.6, x: -112, y: 34, duration: 1.0, ease: "expo.out" }, 3.7);
  tl.fromTo("#moeda", { rotationY: -38 }, { rotationY: 14, duration: 1.6, ease: "none" }, 3.7);

  // ---- 5,3-8,0: o produto recua e gira; frase 2 atrás dele ----
  const escalaGiro = V ? 1.15 : 1;
  tl.to("#produto", { scale: escalaGiro, x: 0, y: 0, duration: 0.55, ease: "power3.inOut" }, 5.3);
  tl.to("#moeda", { rotationY: 14 + 540, duration: 5.0, ease: "none" }, 5.3);
  tl.fromTo("#f2-a", { y: -160, opacity: 0, filter: "blur(10px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.55, ease: "expo.out" }, 5.55);
  tl.fromTo("#f2-b", { y: 160, opacity: 0, filter: "blur(10px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.55, ease: "expo.out" }, 5.65);
  tl.to(["#f2-a", "#f2-b"], { opacity: 0, filter: "blur(10px)", duration: 0.2, ease: "power3.in" }, 7.85);

  // ---- 8,0-10,4: cards de benefício saltam ao redor do produto ----
  tl.to("#produto", { scale: V ? 0.95 : 0.85, duration: 0.4, ease: "power3.inOut" }, 7.95);
  const c1 = document.querySelector(".card.c1"), c2 = document.querySelector(".card.c2");
  const deC1 = V ? { y: -220, scale: 0.6 } : { x: -320, scale: 0.6 };
  const deC2 = V ? { y: 220, scale: 0.6 } : { x: 320, scale: 0.6 };
  entrar(c1, null, deC1, { x: 0, y: 0, scale: 1 }, 8.2, 0.55, "back.out(1.5)");
  entrar(c2, null, deC2, { x: 0, y: 0, scale: 1 }, 8.6, 0.55, "back.out(1.5)");
  tl.to([c1, c2], { scale: 0.85, opacity: 0, filter: "blur(8px)", duration: 0.2, ease: "power3.in" }, 10.12);

  // ---- 10,35-11,6: íris cobre abre do centro do produto; frase 3 ----
  tl.fromTo("#iris", { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(75% at 50% 50%)", duration: 0.3, ease: "power3.in" }, 10.35);
  tl.set("#produto", { opacity: 0 }, 10.66);
  tl.fromTo("#f3", { opacity: 0, scale: 1.12, filter: "blur(10px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.35, ease: "expo.out" }, 10.6);
  tl.to("#f3", { opacity: 0, filter: "blur(10px)", duration: 0.15, ease: "power3.in" }, 11.44);

  // ---- 11,6-12,6: três palavras em corte seco ----
  [["#p1", 11.6, 11.93], ["#p2", 11.93, 12.27], ["#p3", 12.27, 12.6]].forEach(([id, a, b]) => {
    tl.fromTo(id, { opacity: 1, scale: 1.18, filter: "blur(6px)" }, { scale: 1, filter: "blur(0px)", duration: 0.25, ease: "expo.out" }, a);
    tl.set(id, { opacity: 0 }, b - 0.01);
  });
  tl.set(["#p1", "#p2", "#p3"], { opacity: 0 }, 0);

  // ---- 12,6-15: o produto assenta na vaga da assinatura; CERRA.AI em wipe ----
  // Vaga: horizontal, 300 px à esquerda de um bloco de texto de 1040 px (centro da vaga a -548 px);
  // vertical, 314 px acima de um bloco de 300 px (centro da vaga a -170 px)
  const vaga = V ? { x: 0, y: -170 } : { x: -548, y: 0 };
  tl.fromTo("#produto", { opacity: 1, scale: 0.8, x: vaga.x, y: vaga.y }, { opacity: 1, scale: 0.484, x: vaga.x, y: vaga.y, duration: 0.9, ease: "expo.out" }, 12.6);
  tl.fromTo("#moeda", { rotationY: 200 }, { rotationY: 360, duration: 1.1, ease: "expo.out" }, 12.6);
  tl.fromTo("#marca", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.45, ease: "power3.out" }, 12.85);
  tl.fromTo("#tagline", { opacity: 0, filter: "blur(8px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.2, ease: "power2.out" }, 12.95);
  tl.fromTo("#endereco", { opacity: 0, filter: "blur(8px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.2, ease: "power2.out" }, 13.0);

  window.__timelines = window.__timelines || {};
  window.__timelines["main"] = tl;
})();
