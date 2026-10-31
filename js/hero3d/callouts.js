export const CALLOUTS = [
  ['01', 'API', 'Integrações e ERPs'],
  ['02', 'IA', 'RAG, agentes e automação'],
  ['03', 'DADOS', 'BI, dashboards e compliance'],
  ['04', 'MOBILE', 'PWA e offline-first'],
  ['05', 'CORE', 'Regras de negócio'],
  ['06', 'CLOUD', 'Implantação e escala'],
];

export function criarCallouts(raiz, ancoras) {
  const els = CALLOUTS.map(([n, t, d]) => {
    const el = document.createElement('div');
    el.className = 'h3d-callout';
    el.innerHTML = `<span class="h3d-callout__ponto"></span><span class="h3d-callout__linha"></span><div class="h3d-callout__card"><b>${n} · ${t}</b><span>${d}</span></div>`;
    raiz.appendChild(el);
    return el;
  });
  const clamp01 = (v) => Math.min(1, Math.max(0, v));

  return function atualizar(S, camera) {
    const W = innerWidth, H = innerHeight;
    const itens = els.map((el, i) => {
      const p = ancoras[i]().project(camera);
      return { el, i, x: (p.x + 1) / 2 * W, y: (1 - p.y) / 2 * H, atras: p.z > 1 };
    });
    // empurra para cima os que ficariam sobrepostos (do mais baixo para o mais alto)
    const lado = (it) => (it.x > W * 0.55 ? 'dir' : 'esq');
    ['dir', 'esq'].forEach((l) => {
      const grupo = itens.filter((it) => lado(it) === l).sort((a, b) => b.y - a.y);
      let limite = Infinity;
      grupo.forEach((it) => { it.cy = Math.min(it.y - 70, limite - 64); limite = it.cy; });
      // se o mais alto passou do menu, desce o grupo inteiro
      const topo = grupo.length ? grupo[grupo.length - 1].cy : 0;
      if (topo < 120) grupo.forEach((it) => { it.cy += 120 - topo; });
    });
    itens.forEach((it) => {
      const op = it.atras ? 0 : clamp01(S.callouts * 1.35 - it.i * 0.05);
      const l = lado(it);
      const dx = l === 'dir' ? 70 : -70, dy = it.cy - it.y;
      it.el.style.opacity = op;
      it.el.style.visibility = op > 0.01 ? 'visible' : 'hidden';
      it.el.dataset.lado = l;
      it.el.style.transform = `translate3d(${it.x.toFixed(1)}px, ${it.y.toFixed(1)}px, 0)`;
      it.el.style.setProperty('--dx', dx + 'px');
      it.el.style.setProperty('--dy', dy.toFixed(1) + 'px');
      it.el.style.setProperty('--len', Math.hypot(dx, dy).toFixed(1) + 'px');
      it.el.style.setProperty('--ang', Math.atan2(dy, dx) + 'rad');
    });
  };
}
