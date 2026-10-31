const html = document.documentElement;
const hero = document.getElementById('hero-3d');
const reduzido = matchMedia('(prefers-reduced-motion: reduce)').matches;
const low = matchMedia('(pointer: coarse)').matches || (navigator.hardwareConcurrency || 8) <= 4;
const largo = matchMedia('(min-width: 768px)').matches;

function temWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch (e) { return false; }
}

function estatico() { html.classList.add('hero-estatico'); }

const CDN = 'https://cdn.jsdelivr.net/npm/';
function script(src) {
  return new Promise((ok, erro) => {
    const s = document.createElement('script');
    s.src = CDN + src; s.onload = ok; s.onerror = erro;
    document.head.appendChild(s);
  });
}

async function iniciar() {
  if (!hero || reduzido || !largo || low || !temWebGL()) return estatico();
  html.classList.add('hero-3d-ativo');
  try {
    await script('gsap@3.15.0/dist/gsap.min.js');
    await Promise.all([script('gsap@3.15.0/dist/ScrollTrigger.min.js'), script('lenis@1.3.19/dist/lenis.min.js').catch(() => null)]);
    await document.fonts.ready;
    await new Promise((r) => requestAnimationFrame(r));
    const [{ criarMotor }, { criarEstado, criarHistoria }, { criarCallouts }] = await Promise.all([
      import('./engine.js'), import('./timeline.js'), import('./callouts.js'),
    ]);
    const canvas = document.getElementById('gl');
    const motor = criarMotor(canvas, { low });
    const S = criarEstado();
    const gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);

    if (window.Lenis) {
      const lenis = new window.Lenis({ syncTouch: false });
      lenis.on('scroll', window.ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
    }
    gsap.ticker.lagSmoothing(0);

    const capitulos = document.querySelectorAll('.h3d-indice li');
    criarHistoria(gsap, S, { reduzido, onFase: (f) => capitulos.forEach((c, i) => c.classList.toggle('ativo', i === f)) });
    const callouts = criarCallouts(document.getElementById('h3d-callouts'), motor.ancoras);

    let visivel = true;
    new IntersectionObserver(([e]) => { visivel = e.isIntersecting; motor.setActive(visivel && !document.hidden); }).observe(hero);
    document.addEventListener('visibilitychange', () => motor.setActive(visivel && !document.hidden));
    let espera;
    addEventListener('resize', () => { clearTimeout(espera); espera = setTimeout(() => { motor.resize(); window.ScrollTrigger.refresh(); }, 150); });

    gsap.ticker.add((t) => {
      if (!visivel || document.hidden) return;
      motor.render(S, t);
      callouts(S, motor.camera);
    });
    html.classList.add('hero-3d-pronto');
  } catch (e) {
    console.warn('hero 3D desligado:', e);
    html.classList.remove('hero-3d-ativo');
    estatico();
  }
}

iniciar();
