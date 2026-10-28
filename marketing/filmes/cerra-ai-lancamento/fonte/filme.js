// Cerra.AI, lançamento de 30s, minimalista P&B. Uma linha do tempo pausada; tudo é função do tempo.
(function () {
  const V = document.documentElement.classList.contains("vertical");
  const tl = gsap.timeline({ paused: true });

  // Headlines viram palavras (.w) para a revelação palavra por palavra
  document.querySelectorAll(".h").forEach((h) => {
    h.innerHTML = h.textContent.trim().split(/\s+/).map((w) => `<span class="w">${w}</span>`).join(" ");
  });

  // ---- Rastro de eco nos painéis: 3 cópias empilhadas que repetem a entrada atrasadas ----
  const OPAC_ECO = [0.3, 0.16, 0.08];
  const ecos = new Map();
  document.querySelectorAll("[data-eco]").forEach((el) => {
    const grade = document.createElement("div");
    grade.style.cssText = "display:grid";
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
  function entrarPainel(el, t) {
    [el, ...ecos.get(el)].forEach((g, k) => {
      const op = k === 0 ? 1 : Number(g.dataset.op);
      const tk = t + k * 0.05;
      tl.fromTo(g, { opacity: 0, y: V ? 120 : 0, x: V ? 0 : 160, filter: "blur(10px)" },
        { opacity: op, x: 0, y: 0, filter: "blur(0px)", duration: 0.7, ease: "expo.out" }, tk);
      if (k > 0) tl.to(g, { opacity: 0, duration: 0.25 }, tk + 0.4);
    });
  }
  function palavras(sel, t) {
    tl.fromTo(`${sel} .w`, { opacity: 0, filter: "blur(8px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.13, ease: "power2.out", stagger: 0.07 }, t);
  }
  function sairPalavras(sel, t) {
    tl.to(`${sel} .w`, { opacity: 0, filter: "blur(8px)", duration: 0.18, ease: "power2.in", stagger: 0.03 }, t);
  }
  function sairPainel(el, t) {
    tl.to(el, { opacity: 0, y: V ? -80 : 0, x: V ? 0 : -120, filter: "blur(12px)", duration: 0.32, ease: "power3.in" }, t);
  }

  // ---- 0-2,6: abertura com o logo ----
  tl.fromTo("#abre", { opacity: 0, scale: 0.94, filter: "blur(14px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.7, ease: "expo.out" }, 0.2);
  tl.to("#abre", { opacity: 0, scale: 1.06, filter: "blur(14px)", duration: 0.3, ease: "power3.in" }, 2.25);

  // ---- 2,6-7,2: documentos ----
  const p1 = document.querySelector("#cena-1 [data-eco]");
  palavras("#cena-1 .h", 2.75);
  entrarPainel(p1, 3.0);
  tl.fromTo("#cena-1 [data-eco] .arquivos li", { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.3, ease: "expo.out", stagger: 0.15 }, 3.4);
  sairPalavras("#cena-1 .h", 6.75);
  sairPainel(p1, 6.85);

  // ---- 7,2-16,6: conversa; depois a citação em destaque ----
  const conversa = document.getElementById("conversa");
  palavras("#h2a", 7.35);
  tl.set("#h2b .w", { opacity: 0 }, 0);
  entrarPainel(conversa, 7.6);
  tl.fromTo("#b-eu", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: "expo.out" }, 8.6);
  tl.fromTo("#b-ia", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: "expo.out" }, 9.8);
  tl.fromTo("#fontes", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 10.5);
  sairPalavras("#h2a", 11.9);
  palavras("#h2b", 12.4);
  // o resto da conversa se apaga e a citação cresce: a câmera vai até a fonte
  tl.to("#conversa .cab, #conversa .saudacao, #b-eu, #conversa .entrada", { opacity: 0.15, duration: 0.5, ease: "power2.inOut" }, 12.2);
  tl.fromTo("#conversa-wrap", { scale: 1 }, { scale: V ? 1 : 1.12, transformOrigin: V ? "50% 70%" : "100% 70%", duration: 0.9, ease: "power2.inOut" }, 12.2);
  tl.fromTo("#fontes", { scale: 1, color: "#8a8a8a" }, { scale: V ? 1.06 : 1.22, color: "#ffffff", transformOrigin: "0% 50%", duration: 0.7, ease: "expo.out" }, 12.6);
  sairPalavras("#h2b", 16.15);
  sairPainel("#conversa-wrap", 16.2);

  // ---- 16,6-21,2: anonimização ----
  const p4 = document.querySelector("#cena-4 [data-eco]");
  palavras("#cena-4 .h", 16.75);
  entrarPainel(p4, 17.0);
  tl.fromTo("#cena-4 [data-eco] .barra", { scaleX: 0 }, { scaleX: 1, duration: 0.18, ease: "power2.out", stagger: 0.2 }, 18.2);
  sairPalavras("#cena-4 .h", 20.75);
  sairPainel(p4, 20.85);

  // ---- 21,2-25,2: offline ----
  const p5 = document.querySelector("#cena-5 [data-eco]");
  palavras("#cena-5 .h", 21.35);
  entrarPainel(p5, 21.6);
  tl.fromTo("#zero", { opacity: 0, scale: 0.6, filter: "blur(10px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.5, ease: "expo.out", transformOrigin: "0% 100%" }, 22.4);
  sairPalavras("#cena-5 .h", 24.75);
  sairPainel(p5, 24.85);

  // ---- 25,2-27,0: as linhas da interface voam ao centro e formam o emblema ----
  // Destino: o centro do emblema na assinatura (horizontal: 530 px à esquerda; vertical: 145 px acima)
  const alvo = V ? { x: 0, y: -145 } : { x: -530, y: 0 };
  const origens = [[-700, -380, 20], [650, -300, -35], [-500, 320, 60], [720, 360, -15], [-150, -460, 90], [200, 470, 45], [-820, 40, -70], [840, -60, 10]];
  document.querySelectorAll(".estilhaco").forEach((e, i) => {
    const [x, y, r] = origens[i];
    const o = V ? { x: x * 0.5, y: y * 1.7 } : { x, y };
    tl.fromTo(e, { opacity: 0, x: o.x, y: o.y, rotation: r, scale: 1, filter: "blur(10px)" },
      { opacity: 1, filter: "blur(0px)", duration: 0.35, ease: "expo.out" }, 25.25 + i * 0.05);
    tl.to(e, { x: alvo.x, y: alvo.y, rotation: 0, scale: 0.15, duration: 0.6, ease: "power3.in" }, 26.25 + i * 0.03);
    tl.to(e, { opacity: 0, duration: 0.08 }, 26.9);
  });

  // ---- 26,85-30: emblema (cinza → cor), CERRA.AI, tagline ----
  tl.fromTo("#emblema-final", { opacity: 0, scale: 0.3, filter: "grayscale(1) blur(16px)" },
    { opacity: 1, scale: 1, filter: "grayscale(1) blur(0px)", duration: 0.6, ease: "expo.out" }, 26.85);
  tl.to("#emblema-final", { filter: "grayscale(0) blur(0px)", duration: 0.7, ease: "power2.inOut" }, 27.5);
  tl.fromTo("#marca", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.5, ease: "power3.out" }, 27.15);
  palavrasSimples("#tagline", 27.5);
  tl.fromTo("#endereco", { opacity: 0, filter: "blur(8px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.25 }, 27.75);
  function palavrasSimples(sel, t) {
    tl.fromTo(sel, { opacity: 0, filter: "blur(8px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.2, ease: "power2.out" }, t);
  }

  window.__timelines = window.__timelines || {};
  window.__timelines["main"] = tl;
})();
