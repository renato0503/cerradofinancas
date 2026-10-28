// CerraClass, comercial de 15s por curso. Os textos e a cor vêm das variáveis da composição.
(function () {
  const V = document.documentElement.classList.contains("vertical");
  const PADRAO = {
    titulo: "Excel com IA", cor: "#4cc274", categoria: "Excel & Planilhas",
    formato: "Curso de um dia · 8h", quando: "1 sábado, o dia todo",
    entregavel: "Mini dashboard de vendas pronto para reutilizar",
  };
  const vars = Object.assign({}, PADRAO, (window.__hyperframes && window.__hyperframes.getVariables && window.__hyperframes.getVariables()) || {});
  const TINTA = "#141414", COR = vars.cor;
  document.documentElement.style.setProperty("--cor", COR);

  // Textos do curso; o tamanho do nome se ajusta ao comprimento
  const n = vars.titulo.length;
  const tam = (curto, medio, longo) => (n <= 14 ? curto : n <= 24 ? medio : longo);
  const nome = document.getElementById("nome");
  nome.textContent = vars.titulo;
  nome.style.fontSize = (V ? tam(150, 120, 100) : tam(200, 160, 136)) + "px";
  const tTitulo = document.getElementById("t-titulo");
  tTitulo.textContent = vars.titulo;
  tTitulo.style.fontSize = tam(84, 66, 54) + "px";
  document.getElementById("t-categoria").textContent = vars.categoria;
  document.getElementById("t-formato").textContent = vars.formato;
  document.getElementById("c-entregavel").textContent = vars.entregavel;
  document.getElementById("c-formato").textContent = vars.formato;
  document.getElementById("c-quando").textContent = vars.quando;

  const tl = gsap.timeline({ paused: true });

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

  // ---- Ingresso 3D: lâminas de espessura entre a frente e o verso ----
  const laminas = document.querySelectorAll("#ticket .lamina");
  laminas.forEach((l, i) => gsap.set(l, { z: -5.25 + i * 1.5 }));
  gsap.set("#ticket .frente", { z: 6.5 });
  gsap.set("#ticket .verso", { z: -6.5, rotationY: 180 });

  tl.set("#fundo", { backgroundColor: TINTA }, 0);
  tl.set("#ingresso", { scale: 1, x: 0, y: 0 }, 0);
  tl.set("#ticket", { rotationY: 0, rotationX: 0 }, 0);

  // ---- 0,0-1,45: o ponto na cor do curso explode ----
  tl.fromTo("#ponto", { scale: 0 }, { scale: 1, duration: 0.35, ease: "back.out(2.2)" }, 0.15);
  tl.to("#ponto", { scale: 0.6, duration: 0.45, ease: "power2.inOut" }, 0.6);
  tl.to("#ponto", { scale: 140, duration: 0.38, ease: "power3.in" }, 1.07);
  tl.set("#fundo", { backgroundColor: COR }, 1.45);

  // ---- 1,45-3,6: Pare de só usar IA. ----
  const frase1 = document.querySelector("#cena-frase1 .frase");
  entrar(frase1, ".palavra", { x: 240, filter: "blur(12px)" }, { x: 0, filter: "blur(0px)" }, 1.5, 0.5, "expo.out", 0.08);
  tl.to("#cena-frase1 .palavra", { x: -280, opacity: 0, filter: "blur(12px)", duration: 0.22, ease: "power3.in", stagger: 0.02 }, 3.36);

  // ---- 3,6-5,2: close no ingresso (título e cadeiras), fundo preto ----
  tl.set("#fundo", { backgroundColor: TINTA }, 3.6);
  tl.fromTo("#ingresso", { opacity: 1, scale: 2.6, x: 380, y: 160 }, { opacity: 1, scale: 2.1, x: 300, y: 130, duration: 1.0, ease: "expo.out" }, 3.6);
  tl.fromTo("#ticket", { rotationY: -24, rotationX: 8 }, { rotationY: 10, rotationX: 4, duration: 1.5, ease: "none" }, 3.6);
  tl.to("#ingresso", { x: -260, y: -100, duration: 0.65, ease: "power2.inOut" }, 4.5);

  // ---- 5,1-7,8: o ingresso recua e gira; nome do curso atrás ----
  tl.to("#ingresso", { scale: V ? 0.95 : 0.7, x: 0, y: V ? 220 : 170, duration: 0.55, ease: "power3.inOut" }, 5.15);
  tl.to("#ticket", { rotationY: 10 + 720, rotationX: 0, duration: 5.0, ease: "none" }, 5.1);
  tl.fromTo("#nome", { opacity: 0, scale: 1.25, filter: "blur(12px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.5, ease: "expo.out" }, 5.35);
  tl.to("#nome", { opacity: 0, filter: "blur(10px)", duration: 0.2, ease: "power3.in" }, 7.6);

  // ---- 7,8-10,2: cards saltam ao redor do ingresso ----
  tl.to("#ingresso", { scale: V ? 0.8 : 0.62, y: 0, duration: 0.4, ease: "power3.inOut" }, 7.75);
  const c1 = document.querySelector(".card.c1"), c2 = document.querySelector(".card.c2");
  entrar(c1, null, V ? { y: -240, scale: 0.6 } : { x: -320, scale: 0.6 }, { x: 0, y: 0, scale: 1 }, 8.0, 0.55, "back.out(1.6)");
  entrar(c2, null, V ? { y: 240, scale: 0.6 } : { x: 320, scale: 0.6 }, { x: 0, y: 0, scale: 1 }, 8.4, 0.55, "back.out(1.6)");
  tl.to([c1, c2], { scale: 0.85, opacity: 0, filter: "blur(8px)", duration: 0.2, ease: "power3.in" }, 9.95);
  tl.to("#ingresso", { scale: 0.2, opacity: 0, duration: 0.25, ease: "power3.in" }, 9.95);

  // ---- 10,2-11,6: turma de até 10, cadeiras saltando ----
  tl.set("#fundo", { backgroundColor: COR }, 10.2);
  tl.fromTo("#turma-texto", { opacity: 0, filter: "blur(10px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.25, ease: "power2.out" }, 10.22);
  tl.fromTo("#cena-turma .assentos i", { opacity: 0, y: 80, scale: 0.4 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.8)", stagger: 0.05 }, 10.4);
  tl.to("#cena-turma .texto, #cena-turma .assentos", { opacity: 0, filter: "blur(8px)", duration: 0.15 }, 11.44);

  // ---- 11,6-12,6: três palavras em corte seco ----
  tl.set("#fundo", { backgroundColor: TINTA }, 11.6);
  tl.set(["#p1", "#p2", "#p3"], { opacity: 0 }, 0);
  [["#p1", 11.6, 11.93], ["#p2", 11.93, 12.27], ["#p3", 12.27, 12.6]].forEach(([id, a, b]) => {
    tl.fromTo(id, { opacity: 1, scale: 1.18, filter: "blur(6px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.25, ease: "expo.out" }, a);
    tl.set(id, { opacity: 0 }, b - 0.01);
  });

  // ---- 12,6-15: logo + tagline ----
  tl.set("#fundo", { backgroundColor: COR }, 12.6);
  tl.fromTo("#selo", { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.7, ease: "back.out(1.6)" }, 12.6);
  tl.fromTo("#marca", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.45, ease: "power3.out" }, 12.8);
  tl.fromTo("#tagline", { opacity: 0, filter: "blur(8px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.2, ease: "power2.out" }, 12.95);
  tl.fromTo("#endereco", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "expo.out" }, 13.0);

  window.__timelines = window.__timelines || {};
  window.__timelines["main"] = tl;
})();
