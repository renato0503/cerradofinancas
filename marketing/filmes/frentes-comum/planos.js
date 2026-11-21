// Tipografia dos filmes das frentes: uma linha do tempo GSAP lida dos atributos do HTML.
// Cada .plano é um clip (data-start/data-duration). Dentro dele, cada elemento com data-entra
// entra no tempo data-t (segundos contados do início do plano). Perto do fim, o conteúdo sai por máscara.
// O estilo da marca vem de window.ESTILO (ease, dur, stagger, desloc, saida).
(function () {
  const E = Object.assign(
    { ease: "power4.out", dur: 0.6, stagger: 0.05, desloc: 40, saida: 0.38, saidaEase: "power3.in", rot: 0 },
    window.ESTILO || {}
  );
  const tl = gsap.timeline({ paused: true });

  // quebra o texto em palavras dentro de máscaras, preservando <em>, <mark>, <b> etc.
  function quebrar(el, classe) {
    const nos = [];
    const andar = (n) => n.childNodes.forEach((c) => (c.nodeType === 3 ? nos.push(c) : c.nodeType === 1 && c.tagName !== "BR" && !c.hasAttribute("data-inteiro") ? andar(c) : null));
    andar(el);
    nos.forEach((no) => {
      const partes = no.textContent.split(/(\s+)/);
      const frag = document.createDocumentFragment();
      partes.forEach((p) => {
        if (!p) return;
        if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(" ")); return; }
        const m = document.createElement("span");
        m.className = "pm";
        const i = document.createElement("span");
        i.className = classe;
        i.textContent = p;
        m.appendChild(i);
        frag.appendChild(m);
      });
      no.replaceWith(frag);
    });
    // elementos inteiros (ícones, selos) dentro do texto também entram como uma "palavra"
    el.querySelectorAll("[data-inteiro]").forEach((x) => x.classList.add(classe));
  }
  function letras(el) {
    const txt = el.textContent;
    el.textContent = "";
    [...txt].forEach((ch) => {
      const s = document.createElement("span");
      s.className = "pl";
      s.textContent = ch;
      el.appendChild(s);
    });
  }

  const num = (v, d) => (v === undefined || v === "" ? d : +v);

  document.querySelectorAll(".plano").forEach((plano) => {
    const ini = +plano.dataset.start;
    const fim = ini + +plano.dataset.duration;
    plano.querySelectorAll("[data-entra]").forEach((el) => {
      const t = ini + num(el.dataset.t, 0);
      const tipo = el.dataset.entra;
      const dur = num(el.dataset.dur, E.dur);
      const ez = el.dataset.ease || E.ease;
      const st = num(el.dataset.stagger, E.stagger);
      if (tipo === "palavras") {
        quebrar(el, "pp");
        tl.fromTo(el.querySelectorAll(".pp"), { yPercent: 115, rotate: E.rot }, { yPercent: 0, rotate: 0, duration: dur, ease: ez, stagger: st }, t);
      } else if (tipo === "letras") {
        letras(el);
        const cps = num(el.dataset.cps, 38);
        el.querySelectorAll(".pl").forEach((s, i) => tl.fromTo(s, { opacity: 0 }, { opacity: 1, duration: 0.01, ease: "none" }, t + i / cps));
      } else if (tipo === "lista") {
        // cada filho entra por máscara de baixo, em sequência
        const filhos = [...el.children];
        tl.fromTo(filhos, { clipPath: "inset(0% 0% 100% 0%)", y: E.desloc * 0.6 }, { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: dur, ease: ez, stagger: num(el.dataset.stagger, 0.14) }, t);
      } else if (tipo === "revelar") {
        const dir = el.dataset.dir || "esq";
        const de = { esq: "inset(0% 100% 0% 0%)", dir: "inset(0% 0% 0% 100%)", cima: "inset(0% 0% 100% 0%)", baixo: "inset(100% 0% 0% 0%)" }[dir];
        tl.fromTo(el, { clipPath: de }, { clipPath: "inset(0% 0% 0% 0%)", duration: dur, ease: ez }, t);
      } else if (tipo === "subir") {
        tl.fromTo(el, { clipPath: "inset(0% 0% 100% 0%)", y: E.desloc }, { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: dur, ease: ez }, t);
      } else if (tipo === "pop") {
        tl.fromTo(el, { scale: 0, rotate: num(el.dataset.rot, -6) }, { scale: 1, rotate: num(el.dataset.rotFim, 0), duration: dur, ease: el.dataset.ease || "back.out(1.7)" }, t);
      } else if (tipo === "linha") {
        tl.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: dur, ease: ez, transformOrigin: el.dataset.origem || "0% 50%" }, t);
      } else if (tipo === "marcar") {
        tl.fromTo(el, { backgroundSize: "0% 100%" }, { backgroundSize: "100% 100%", duration: num(el.dataset.dur, 0.5), ease: "power2.inOut" }, t);
      } else if (tipo === "riscar") {
        tl.fromTo(el, { backgroundSize: "0% 3px" }, { backgroundSize: "100% 3px", duration: num(el.dataset.dur, 0.45), ease: "power2.inOut" }, t);
      } else if (tipo === "contar") {
        const ate = +el.dataset.ate;
        const o = { v: num(el.dataset.de, 0) };
        el.textContent = String(o.v);
        tl.to(o, { v: ate, duration: dur, ease: "none", onUpdate: () => (el.textContent = String(Math.round(o.v))) }, t);
      } else if (tipo === "carimbo") {
        tl.fromTo(el, { scale: 2.4, rotate: num(el.dataset.rot, -14), opacity: 0 }, { scale: 1, rotate: num(el.dataset.rotFim, -8), opacity: 1, duration: 0.32, ease: "power4.in" }, t);
      }
    });
    // saída: o conteúdo sobe por máscara antes do fim do plano (planos com data-fica não saem)
    if (!plano.hasAttribute("data-fica")) {
      const conteudo = plano.querySelector(".conteudo") || plano;
      tl.fromTo(conteudo, { clipPath: "inset(-20% -20% -20% -20%)", y: 0 }, { clipPath: "inset(-20% -20% 120% -20%)", y: -E.desloc, duration: E.saida, ease: E.saidaEase, immediateRender: false }, fim - E.saida - 0.02);
    }
  });

  // movimentos próprios do filme (cortinas, contadores), definidos em window.EXTRAS(tl) no cena.html
  if (typeof window.EXTRAS === "function") window.EXTRAS(tl);

  window.__timelines = window.__timelines || {};
  window.__timelines["main"] = tl;
})();
