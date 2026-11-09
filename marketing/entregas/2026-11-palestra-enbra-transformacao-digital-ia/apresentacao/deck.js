// Motor da palestra: batidas por clique, transições, palco 3D e janela do apresentador.
// Atributos nos slides: data-cena (3D), data-t (transição), data-bloco, data-alvo (minuto).
// Atributos nos elementos: data-fx (efeito), data-b (clique em que entra), data-sai (clique em que sai), data-d (atraso).
(function () {
  'use strict';
  gsap.registerPlugin(SplitText, DrawSVGPlugin);
  const params = new URLSearchParams(location.search);
  const captura = params.has('captura');
  const semMov = captura || matchMedia('(prefers-reduced-motion: reduce)').matches;
  const raiz = document.getElementById('palco'); // só recebe a escala da janela, escrita em ajustar()
  const quadro = document.getElementById('quadro'); // camada dos efeitos: tremor e zoom seco
  const slides = [...document.querySelectorAll('.slide')];
  const total = slides.length;
  const cortina = document.getElementById('cortina');
  const canvas = document.getElementById('gl');
  const cromo = document.getElementById('cromo');
  document.documentElement.classList.add('js');

  let atual = -1, batida = 0, splits = [], tls = [], palco = null, trocaId = 0;

  const numBatidas = s => [...s.querySelectorAll('[data-b],[data-sai]')].reduce((m, e) => Math.max(m, +(e.dataset.b || 0), +(e.dataset.sai || 0)), 0);

  // ---------- efeitos ----------
  function fmt(valor, modelo) {
    const m = modelo.match(/^([^\d−-]*[−-]?)([\d.]*)(,(\d+))?(.*)$/s);
    if (!m) return modelo;
    const dec = (m[4] || '').length;
    const [int, frac] = Math.abs(valor).toFixed(dec).split('.');
    const milhar = modelo.includes('.') ? int.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : int;
    return m[1] + milhar + (dec ? ',' + frac : '') + m[5];
  }
  const numero = t => parseFloat(t.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
  const FX = {
    sobe: (tl, e, p) => tl.fromTo(e, { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: .55, ease: 'power3.out' }, p),
    blur: (tl, e, p) => tl.fromTo(e, { autoAlpha: 0, filter: 'blur(16px)' }, { autoAlpha: 1, filter: 'blur(0px)', duration: .7, ease: 'power2.out', clearProps: 'filter' }, p),
    pop: (tl, e, p) => tl.fromTo(e, { autoAlpha: 0, scale: .82 }, { autoAlpha: 1, scale: 1, duration: .5, ease: 'back.out(1.8)' }, p),
    carimbo: (tl, e, p) => tl.fromTo(e, { autoAlpha: 0, scale: 1.9, rotate: -6 }, { autoAlpha: 1, scale: 1, rotate: -3, duration: .24, ease: 'power4.in' }, p),
    soco: (tl, e, p) => {
      tl.fromTo(e, { autoAlpha: 0, scale: 1.5 }, { autoAlpha: 1, scale: 1, duration: .32, ease: 'expo.out' }, p);
      if (!semMov) { tl.fromTo(quadro, { x: 0 }, { keyframes: { x: [-10, 8, -5, 3, 0] }, duration: .3, ease: 'none' }, p + .04); tl.set(quadro, { clearProps: 'transform' }, p + .36); }
    },
    linha: (tl, e, p) => tl.fromTo(e, { autoAlpha: 1, scaleX: 0 }, { scaleX: 1, duration: .5, ease: 'power2.inOut' }, p),
    barra: (tl, e, p) => tl.fromTo(e, { autoAlpha: 1, scaleX: 0 }, { scaleX: 1, duration: .9, ease: 'power3.out' }, p),
    traco: (tl, e, p) => {
      gsap.set(e, { autoAlpha: 1 });
      const caminhos = e.querySelectorAll('path,line,circle,polyline');
      tl.fromTo(caminhos, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.1, ease: 'power2.inOut', stagger: .06 }, p);
    },
    palavras: (tl, e, p) => {
      const s = SplitText.create(e, { type: 'words', wordsClass: 'pl' }); splits.push(s);
      gsap.set(e, { autoAlpha: 1 });
      tl.fromTo(s.words, { autoAlpha: 0, y: 44, filter: 'blur(10px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .6, ease: 'power3.out', stagger: .055 }, p);
    },
    conta: (tl, e, p) => {
      const final = e.dataset.txt || (e.dataset.txt = e.textContent.trim());
      const o = { v: e.dataset.de ? numero(e.dataset.de) : 0 }, alvo = numero(final);
      gsap.set(e, { autoAlpha: 1 });
      e.textContent = fmt(o.v, final);
      tl.to(o, { v: alvo, duration: +(e.dataset.dur || 1.4), ease: 'power2.out', onUpdate() { e.textContent = fmt(o.v, final); }, onComplete() { e.textContent = final; } }, p);
    },
  };

  function limpar(s) {
    tls.forEach(t => t.kill()); tls = [];
    gsap.killTweensOf(quadro); gsap.set(quadro, { clearProps: 'transform' });
    splits.forEach(x => x.revert()); splits = [];
    const els = s.querySelectorAll('[data-fx],[data-sai]');
    gsap.killTweensOf(els);
    els.forEach(e => { gsap.killTweensOf(e); if (e.dataset.txt) e.textContent = e.dataset.txt; });
    gsap.set(els, { clearProps: 'transform,opacity,visibility,filter' });
  }

  function montar(s, alvo, instantaneo) {
    limpar(s);
    const fx = [...s.querySelectorAll('[data-fx]')];
    gsap.set(fx.filter(e => !['linha', 'barra'].includes(e.dataset.fx)), { autoAlpha: 0 });
    gsap.set(fx.filter(e => ['linha', 'barra'].includes(e.dataset.fx)), { scaleX: 0, autoAlpha: 1 });
    fx.filter(e => ['linha', 'barra'].includes(e.dataset.fx)).forEach(e => { gsap.set(e, { transformOrigin: 'left center' }); });
    for (let n = 0; n <= alvo; n++) {
      const tl = gsap.timeline({ paused: true });
      const grupo = fx.filter(e => +(e.dataset.b || 0) === n);
      grupo.forEach((e, i) => (FX[e.dataset.fx] || FX.sobe)(tl, e, (n === 0 ? .25 : .05) + i * .1 + parseFloat(e.dataset.d || 0)));
      s.querySelectorAll(`[data-sai="${n}"]`).forEach(e => tl.to(e, { autoAlpha: 0, duration: .3, ease: 'power2.in' }, 0));
      tls.push(tl);
      if (n < alvo || instantaneo || semMov) tl.progress(1); else tl.play();
    }
  }

  // ---------- transições ----------
  function transicao(tipo, trocar, dir) {
    if (semMov || tipo === 'corte') { trocar(); return; }
    if (tipo === 'cortina') {
      gsap.killTweensOf(cortina);
      gsap.timeline()
        .set(cortina, { display: 'block', scaleX: 0, transformOrigin: dir > 0 ? 'left' : 'right' })
        .to(cortina, { scaleX: 1, duration: .32, ease: 'power3.in' })
        .add(trocar)
        .set(cortina, { transformOrigin: dir > 0 ? 'right' : 'left' })
        .to(cortina, { scaleX: 0, duration: .36, ease: 'power3.out' })
        .set(cortina, { display: 'none' });
      return;
    }
    if (tipo === 'soco') { trocar(); gsap.fromTo(quadro, { scale: 1.05 }, { scale: 1, duration: .35, ease: 'expo.out', clearProps: 'transform' }); return; }
    trocar(); // voo: a câmera 3D faz a viagem; o DOM entra pelos efeitos
  }

  function renderizar(i, b, dir) {
    const s = slides[i];
    slides.forEach(x => x.classList.toggle('ativo', x === s));
    montar(s, b, false);
    cromo.classList.toggle('oculto', s.hasAttribute('data-sem-cromo'));
    if (palco) palco.cena(s.dataset.cena, b);
    atualizaCromo(); atualizaApresentador();
  }

  function ir(i, b, dir) {
    i = Math.max(0, Math.min(total - 1, i));
    const anterior = atual;
    atual = i; batida = b || 0;
    history.replaceState(null, '', '#' + (i + 1));
    const s = slides[i];
    if (anterior === i) { renderizar(i, batida, dir); return; }
    const tipo = s.dataset.t || 'voo';
    if (tipo === 'voo' && anterior >= 0 && !semMov) {
      const velho = slides[anterior], token = ++trocaId;
      gsap.to(velho, { autoAlpha: 0, duration: .22, ease: 'power2.in', onComplete() { gsap.set(velho, { clearProps: 'opacity,visibility' }); if (token === trocaId) renderizar(i, batida, dir); } });
      return;
    }
    trocaId++;
    if (anterior >= 0) gsap.set(slides[anterior], { clearProps: 'opacity,visibility' });
    transicao(tipo, () => renderizar(i, batida, dir), dir);
  }

  function avancar() { const n = numBatidas(slides[atual]); if (batida < n) ir(atual, batida + 1, 1); else if (atual < total - 1) ir(atual + 1, 0, 1); }
  function voltar() { if (batida > 0) ir(atual, batida - 1, -1); else if (atual > 0) ir(atual - 1, numBatidas(slides[atual - 1]), -1); }

  // ---------- cromo ----------
  const fio = document.getElementById('fio'), pag = document.getElementById('pag');
  const atualizaCromo = () => { fio.style.width = ((atual + 1) / total * 100) + '%'; pag.textContent = String(atual + 1).padStart(2, '0') + ' / ' + total; };
  const marcas = document.getElementById('marcas');
  let bl = null; slides.forEach((s, i) => { if (s.dataset.bloco !== bl) { bl = s.dataset.bloco; const m = document.createElement('i'); m.style.left = (i / total * 100) + '%'; marcas.appendChild(m); } });

  // ---------- escala ----------
  let escala = 1;
  function ajustar() {
    escala = Math.min(innerWidth / 1920, innerHeight / 1080);
    raiz.style.transform = `translate(-50%,-50%) scale(${escala})`;
    if (palco) palco.ajustar(Math.min(1.25, escala));
  }

  // ---------- janela do apresentador ----------
  let jan = null, inicio = null;
  const titulo = s => { if (!s) return 'Fim'; const t = s.querySelector('h1,h2,.voz'); return t ? t.textContent.replace(/\s+/g, ' ').trim() : ''; };
  function abrir() {
    if (jan && !jan.closed) { jan.focus(); return; }
    jan = open('', 'apresentador', 'width=1080,height=720');
    if (!jan) return;
    inicio = inicio || Date.now();
    jan.document.write(`<!doctype html><meta charset=utf-8><title>Apresentador</title><style>
      body{margin:0;background:#050b1e;color:#e8eeff;font:21px/1.5 Inter,system-ui,sans-serif;padding:26px 34px}
      #top{display:flex;justify-content:space-between;align-items:baseline;gap:20px;font-variant-numeric:tabular-nums}
      #relogio{font:700 54px/1 'JetBrains Mono',monospace;color:#fecb00}#meta{color:#9aa8c4;font-size:18px}
      #n{font-weight:700}#tit{font-size:28px;font-weight:800;margin:16px 0 12px;line-height:1.2}
      #notas p{margin:0 0 10px;padding:6px 14px;border-left:4px solid #1c2c56;color:#b8c4dc}
      #notas p.ag{border-color:#fecb00;color:#fff;background:#0e1b3f}#notas p.ja{opacity:.42}
      #prox{margin-top:18px;color:#9aa8c4;font-size:18px;border-top:1px solid #1c2c56;padding-top:12px}
      #teclas{margin-top:8px;color:#6e7c9a;font-size:15px}</style>
      <div id=top><div><span id=n></span> · <span id=clq></span></div><div id=meta></div><div id=relogio>00:00</div></div>
      <div id=tit></div><div id=notas></div><div id=prox></div>
      <div id=teclas>→ avança · ← volta · R zera o tempo · B tela preta · D liga/desliga 3D · número + Enter pula para o slide</div>`);
    jan.document.close();
    jan.document.addEventListener('keydown', teclas);
    atualizaApresentador();
  }
  function atualizaApresentador() {
    if (!jan || jan.closed) return;
    const d = jan.document, s = slides[atual], nt = s.querySelector('.notas');
    d.getElementById('n').textContent = 'Slide ' + (atual + 1) + ' de ' + total;
    d.getElementById('clq').textContent = 'clique ' + batida + ' de ' + numBatidas(s);
    d.getElementById('tit').textContent = titulo(s);
    const box = d.getElementById('notas'); box.innerHTML = nt ? nt.innerHTML : '';
    box.querySelectorAll('p').forEach(p => { const b = +(p.dataset.b || 0); p.className = b === batida ? 'ag' : (b < batida ? 'ja' : ''); });
    const ag = box.querySelector('p.ag'); if (ag) ag.scrollIntoView({ block: 'center' });
    d.getElementById('prox').textContent = 'Próximo slide: ' + titulo(slides[atual + 1]);
    d.getElementById('meta').textContent = 'alvo ao fim deste slide: ' + (s.dataset.alvo || '?') + ' min';
  }
  setInterval(() => {
    if (!jan || jan.closed || !inicio) return;
    const seg = Math.floor((Date.now() - inicio) / 1000);
    jan.document.getElementById('relogio').textContent = String(Math.floor(seg / 60)).padStart(2, '0') + ':' + String(seg % 60).padStart(2, '0');
  }, 1000);

  // ---------- controles ----------
  let buffer = '', bufT;
  function teclas(e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (/^[0-9]$/.test(e.key)) { buffer += e.key; clearTimeout(bufT); bufT = setTimeout(() => buffer = '', 2500); e.preventDefault(); return; }
    if (e.key === 'Enter' && buffer) { ir(parseInt(buffer, 10) - 1, 0, 1); buffer = ''; e.preventDefault(); return; }
    switch (e.key) {
      case 'ArrowRight': case 'ArrowDown': case 'PageDown': case ' ': avancar(); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp': case 'Backspace': voltar(); break;
      case 'Home': ir(0, 0, 1); break;
      case 'End': ir(total - 1, 0, 1); break;
      case 'p': case 'P': abrir(); break;
      case 'r': case 'R': inicio = Date.now(); break;
      case 'b': case 'B': document.body.classList.toggle('preto'); break;
      case 'd': case 'D': if (palco) palco.ligar(!palco.ligado); break;
      case 'f': case 'F': document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen(); break;
      default: return;
    }
    e.preventDefault();
  }
  document.addEventListener('keydown', teclas);
  document.addEventListener('click', e => { if (e.target.closest('a')) return; e.clientX > innerWidth * .25 ? avancar() : voltar(); });
  let x0 = null;
  document.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) dx < 0 ? avancar() : voltar(); x0 = null; });
  let tCursor; document.addEventListener('mousemove', () => { document.documentElement.classList.remove('sem-cursor'); clearTimeout(tCursor); tCursor = setTimeout(() => document.documentElement.classList.add('sem-cursor'), 2000); });
  addEventListener('resize', ajustar);
  addEventListener('hashchange', () => { const h = parseInt(location.hash.slice(1), 10); if (h && h - 1 !== atual) ir(h - 1, 0, 1); });

  // ---------- início ----------
  async function iniciar() {
    await Promise.all(['900 400px Inter', '400 90px "Instrument Serif"', 'italic 400 90px "Instrument Serif"', '500 22px "JetBrains Mono"'].map(f => document.fonts.load(f, 'Aé0')));
    await document.fonts.ready;
    ajustar();
    if (!params.has('no3d')) {
      try { palco = Palco3D.criar(canvas, { instantaneo: captura }); }
      catch (err) { console.warn('3D indisponível; seguindo sem o palco.', err); canvas.style.display = 'none'; palco = null; }
    } else canvas.style.display = 'none';
    ajustar();
    const pedido = parseInt(params.get('s'), 10) || parseInt(location.hash.slice(1), 10) || 1;
    const b = params.has('b') ? parseInt(params.get('b'), 10) : (captura ? numBatidas(slides[pedido - 1]) : 0);
    ir(pedido - 1, b, 1);
    window.deck = { ir, avancar, voltar, numBatidas: i => numBatidas(slides[i]), total, palco, estado: () => ({ atual, batida }) };
    if (captura) { if (palco) palco.renderizarAgora(); }
    window.deckPronto = true;
  }
  iniciar();
})();
