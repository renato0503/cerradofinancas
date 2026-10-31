export function criarEstado() {
  return {
    draw: 0, grow: -0.6, mat: 0, look: 0, explode: 0, callouts: 0, grid: 1, line: 0, plan: 1,
    cx: -18, cy: 22, cz: 26, tx: 0, ty: 2, tz: 0,
    roll: 0, handheld: 0.5, parallax: 0.9,
  };
}

// 0–12 blueprint · 12–38 volume · 38–58 matéria · 58–80 anatomia · 80–100 produto
export const FASES = [0, 12, 38, 58, 80, 100];

export function criarHistoria(gsap, S, { reduzido = false, onFase } = {}) {
  const cam = (t, d, c, a) => tl.to(S, { cx: c[0], cy: c[1], cz: c[2], tx: a[0], ty: a[1], tz: a[2], duration: d, ease: 'power2.inOut' }, t);
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: '#hero-3d', start: 'top top', end: 'bottom bottom', scrub: reduzido ? true : 1.15,
      onUpdate: (st) => {
        const p = st.progress * 100;
        let f = 0;
        for (let i = 1; i < FASES.length - 1; i++) if (p >= FASES[i] - 2) f = i;
        onFase && onFase(f);
      },
    },
  });
  tl.to({}, { duration: 100 }, 0);

  tl.to(S, { draw: 1, duration: 11, ease: 'power1.inOut' }, 0);

  tl.to(S, { grow: 9.3, duration: 24, ease: 'power1.inOut' }, 12);
  tl.to(S, { line: 1, duration: 6 }, 12);
  tl.to(S, { plan: 0.35, duration: 14 }, 18);
  cam(12, 26, [-24, 14, 24], [-7, 3.5, 2]);

  tl.to(S, { mat: 1, duration: 16, ease: 'power1.inOut' }, 38);
  tl.to(S, { look: 1, duration: 18, ease: 'power1.inOut' }, 38);
  tl.to(S, { line: 0.25, plan: 0, grid: 0, duration: 12 }, 40);
  cam(38, 20, [27, 8, 33], [-4, 4, 3]);

  tl.to(S, { explode: 1, duration: 14, ease: 'power2.inOut' }, 58);
  tl.to(S, { look: 2, line: 0.55, duration: 12, ease: 'power1.inOut' }, 58);
  tl.to(S, { callouts: 1, duration: 6 }, 64);
  cam(58, 22, [-26, 13, 27], [-8, 4.5, 3]);

  tl.to(S, { callouts: 0, duration: 4 }, 80);
  tl.to(S, { explode: 0, duration: 12, ease: 'power2.inOut' }, 81);
  tl.to(S, { look: 3, line: 0.9, duration: 14, ease: 'power1.inOut' }, 80);
  cam(80, 20, [4, 9, 36], [-7, 4, 0]);

  return tl;
}
