// Vídeos com IA na Prática — CerraClass, 18s.
// Movimento contínuo: um orb passageiro, cenas que se sobrepõem e uma cortina que
// vira a assinatura. Sem marca própria: só CerraClass.
(function () {
  const V = document.documentElement.classList.contains("vertical");

  // Hook palavra por palavra
  const hook = document.getElementById("hook");
  const palavras = hook.textContent.trim().split(/\s+/);
  hook.innerHTML = palavras.map((p) => `<span class="palavra">${p}</span>`).join(" ");

  // Onda do avatar
  const onda = document.getElementById("onda");
  for (let i = 0; i < 46; i++) onda.appendChild(document.createElement("i"));

  const tl = gsap.timeline({ paused: true });

  // Estado inicial
  tl.set(".bloco", { opacity: 0 }, 0);
  tl.set("#cena-hook", { opacity: 1 }, 0);
  tl.set("#cortina", { scale: 0 }, 0);
  tl.set("#cena-marca", { opacity: 0 }, 0);

  // Empurrão lento e constante no palco
  tl.fromTo("#palco", { scale: 1 }, { scale: 1.03, duration: 18, ease: "none" }, 0);

  // Fundo vivo: o orb atravessa a tela sem parar
  tl.fromTo("#orb",
    { x: V ? -210 : -320, y: V ? -160 : -80, scale: 1, rotation: 0 },
    { x: V ? 240 : 360, y: V ? 210 : 120, scale: 1.3, rotation: 55, duration: 18, ease: "none" },
    0);

  // ---------- 0,0–3,6 · gancho ----------
  tl.fromTo("#hook .palavra",
    { y: 90, opacity: 0, filter: "blur(14px)" },
    { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.95, ease: "expo.out", stagger: 0.055 },
    0.18);
  tl.fromTo("#hook-sub",
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.75, ease: "expo.out" },
    0.9);
  tl.fromTo("#cena-hook",
    { scale: 1.04 },
    { scale: 1, duration: 3.4, ease: "none" },
    0);

  tl.to("#hook .palavra",
    { y: -70, opacity: 0, filter: "blur(10px)", duration: 0.45, ease: "power2.in", stagger: 0.02 },
    3.1);
  tl.to("#hook-sub",
    { y: -30, opacity: 0, duration: 0.35, ease: "power2.in" },
    3.1);
  tl.to("#cena-hook", { opacity: 0, duration: 0.25 }, 3.5);

  // ---------- 3,5–7,1 · roteiro ----------
  tl.to("#cena-roteiro", { opacity: 1, duration: 0.35 }, 3.5);
  tl.fromTo("#cena-roteiro .et",
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, ease: "expo.out" },
    3.55);
  tl.fromTo("#rot-titulo",
    { y: 70, opacity: 0, filter: "blur(10px)" },
    { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "expo.out" },
    3.6);
  tl.fromTo("#prompt-card",
    { y: 250, scale: 0.92, rotation: -3, opacity: 0 },
    { y: 0, scale: 1, rotation: 0, opacity: 1, duration: 0.95, ease: "expo.out" },
    3.8);
  tl.fromTo("#cena-roteiro .chips span",
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, ease: "expo.out", stagger: 0.08 },
    4.45);

  tl.to("#cena-roteiro .et, #rot-titulo, #prompt-card, #cena-roteiro .chips span",
    { y: -50, opacity: 0, filter: "blur(8px)", duration: 0.4, ease: "power2.in", stagger: 0.03 },
    6.3);
  tl.to("#cena-roteiro", { opacity: 0, duration: 0.25 }, 6.85);

  // ---------- 7,0–10,4 · avatar ----------
  tl.to("#cena-avatar", { opacity: 1, duration: 0.35 }, 6.75);
  tl.fromTo("#cena-avatar .et",
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, ease: "expo.out" },
    6.6);
  tl.fromTo("#av-titulo",
    { y: 70, opacity: 0, filter: "blur(10px)" },
    { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "expo.out" },
    6.85);
  tl.fromTo("#avatar-card",
    { y: 140, scale: 0.94, opacity: 0 },
    { y: 0, scale: 1, opacity: 1, duration: 0.9, ease: "expo.out" },
    6.95);
  tl.fromTo("#bolha",
    { scale: 0.4, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.8, ease: "expo.out" },
    7.0);
  tl.fromTo("#onda i",
    { scaleY: 0.15, opacity: 0 },
    { scaleY: 1, opacity: 1, duration: 0.65, ease: "expo.out", stagger: 0.014 },
    7.05);
  tl.fromTo("#cena-avatar .chips span",
    { y: 24, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.45, ease: "expo.out", stagger: 0.08 },
    7.65);

  tl.to("#cena-avatar .et, #av-titulo, #avatar-card, #cena-avatar .chips span",
    { y: -50, opacity: 0, filter: "blur(8px)", duration: 0.4, ease: "power2.in", stagger: 0.03 },
    9.55);
  tl.to("#cena-avatar", { opacity: 0, duration: 0.25 }, 9.95);

  // ---------- 10,3–14,0 · realismo ----------
  tl.to("#cena-real", { opacity: 1, duration: 0.35 }, 9.95);
  tl.fromTo("#cena-real .et",
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, ease: "expo.out" },
    10.0);
  tl.fromTo("#real-titulo",
    { y: 70, opacity: 0, filter: "blur(10px)" },
    { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "expo.out" },
    10.05);
  tl.fromTo("#split .antes",
    { x: -180, opacity: 0, rotation: -2 },
    { x: 0, opacity: 1, rotation: 0, duration: 0.9, ease: "expo.out" },
    10.15);
  tl.fromTo("#split .depois",
    { x: 180, opacity: 0, rotation: 2 },
    { x: 0, opacity: 1, rotation: 0, duration: 0.9, ease: "expo.out" },
    10.15);
  tl.fromTo("#cena-real .chips span",
    { y: 28, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, ease: "expo.out", stagger: 0.08 },
    10.75);

  tl.to("#cena-real .et, #real-titulo, #split, #cena-real .chips span",
    { y: -50, opacity: 0, filter: "blur(8px)", duration: 0.4, ease: "power2.in", stagger: 0.03 },
    13.15);
  tl.to("#cena-real", { opacity: 0, duration: 0.25 }, 13.6);

  // ---------- 14,0–16,1 · o dia ----------
  tl.to("#cena-info", { opacity: 1, duration: 0.35 }, 13.55);
  tl.fromTo("#cena-info .et",
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, ease: "expo.out" },
    13.6);
  tl.fromTo("#info-titulo",
    { y: 70, opacity: 0, filter: "blur(10px)" },
    { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "expo.out" },
    13.65);
  tl.fromTo("#turma",
    { y: 90, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: "expo.out" },
    13.75);
  tl.fromTo("#assentos i",
    { y: 80, scale: 0.35, opacity: 0 },
    { y: 0, scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)", stagger: 0.045 },
    13.95);
  tl.fromTo("#cena-info .chips span",
    { y: 24, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.45, ease: "expo.out", stagger: 0.08 },
    14.5);

  tl.to("#cena-info .et, #info-titulo, #turma, #assentos, #cena-info .chips span",
    { y: -40, opacity: 0, filter: "blur(8px)", duration: 0.35, ease: "power2.in", stagger: 0.025 },
    15.85);
  tl.to("#cena-info", { opacity: 0, duration: 0.25 }, 16.15);

  // ---------- 16,0–18,0 · cortina e assinatura ----------
  tl.fromTo("#cortina",
    { scale: 0 },
    { scale: 2.5, duration: 1.0, ease: "power3.inOut" },
    15.9);
  tl.to("#cena-marca", { opacity: 1, duration: 0.3 }, 16.2);
  tl.fromTo("#selo",
    { scale: 0.3, rotation: -40, opacity: 0 },
    { scale: 1, rotation: 0, opacity: 1, duration: 0.9, ease: "back.out(1.5)" },
    16.25);
  tl.fromTo("#marca-nome",
    { clipPath: "inset(0 100% 0 0)" },
    { clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "power3.out" },
    16.4);
  tl.fromTo("#curso-nome",
    { y: 28, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.55, ease: "expo.out" },
    16.65);
  tl.fromTo("#link-final",
    { y: 24, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, ease: "expo.out" },
    16.85);
  tl.fromTo("#whats-final",
    { y: 18, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.45, ease: "expo.out" },
    16.97);
  tl.to("#cena-marca", { scale: 1.02, duration: 2.0, ease: "none" }, 16.25);

  window.__timelines = window.__timelines || {};
  window.__timelines["main"] = tl;
})();
