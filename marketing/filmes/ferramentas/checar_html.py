"""Confere se todo texto HTML de um filme aparece inteiro: dentro do quadro e sem nada por cima.

A cada PASSO segundos, para cada texto visível (opacidade efetiva > 0,6), amostra pontos nas linhas do texto
(Range.getClientRects) e acusa quando o ponto sai do quadro ou quando outro elemento com fundo ou com texto
está por cima dele (elementsFromPoint). Ignora problemas mais curtos que MIN_DUR (entradas e saídas).

    python ferramentas/checar_html.py videocomia-tipo videocomia-editor
    python ferramentas/checar_html.py videocomia-tipo --formato 9x16

Complementa o checar_texto3d.py (texto desenhado nos objetos 3D). Sai com 1 se houver problema.
"""
import argparse
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from checar_texto3d import RAIZ, servir, faixas  # noqa: E402

MIN_DUR = 0.6

JS = r"""
async (t) => {
  await window.__hf.buildReady.tres;
  window.__timelines.main.seek(t, false);
  const raiz = document.getElementById('root');
  const W = +raiz.dataset.width, H = +raiz.dataset.height;
  for (const el of raiz.querySelectorAll('[data-start]')) {
    const a = +el.dataset.start, f = a + +(el.dataset.duration || 1e9);
    el.style.visibility = (t >= a && t < f) ? '' : 'hidden';
  }
  if (!document.getElementById('__pe')) { const s = document.createElement('style'); s.id = '__pe'; s.textContent = '#root, #root * { pointer-events: auto !important; }'; document.head.appendChild(s); }
  const efOp = (el) => { let op = 1; for (let e = el; e && e !== document.body; e = e.parentElement) { const cs = getComputedStyle(e); op *= +cs.opacity; if (cs.visibility === 'hidden' || cs.display === 'none') return 0; } return op; };
  const temTexto = (el) => [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
  const cobre = (el) => {
    if (el.id === 'tela' || el.id === 'fundo') return false;
    const cs = getComputedStyle(el);
    const m = cs.backgroundColor.match(/[\d.]+/g);
    const fundo = (m && (m.length < 4 || +m[3] > 0.5)) || cs.backgroundImage !== 'none';
    return (fundo || temTexto(el)) && efOp(el) > 0.3;
  };
  // ponto escondido por máscara (clip-path inset ou overflow hidden de um ancestral) não conta: ainda está entrando
  const mascarado = (el, x, y) => {
    for (let e = el; e && e !== raiz; e = e.parentElement) {
      const cs = getComputedStyle(e), r = e.getBoundingClientRect();
      if (cs.overflow === 'hidden' || cs.overflowY === 'hidden') { if (x < r.left || x > r.right || y < r.top || y > r.bottom) return true; }
      const c = cs.clipPath;
      if (c && c.startsWith('inset(')) {
        const v = c.slice(6, -1).split(/\s+/).slice(0, 4).map((s, i) => s.endsWith('%') ? parseFloat(s) / 100 * ((i % 2) ? r.width : r.height) : parseFloat(s) || 0);
        const [tp, rt, bt, lf] = [v[0], v[1] ?? v[0], v[2] ?? v[0], v[3] ?? v[1] ?? v[0]];
        if (x < r.left + lf || x > r.right - rt || y < r.top + tp || y > r.bottom - bt) return true;
      }
    }
    return false;
  };
  const res = [];
  const vistos = new Set();
  for (const el of raiz.querySelectorAll('*')) {
    if (!temTexto(el) || efOp(el) < 0.6) continue;
    const txt = el.textContent.trim().replace(/\s+/g, ' ').slice(0, 60);
    let fora = 0, coberto = 0, n = 0, por = '';
    for (const no of el.childNodes) {
      if (no.nodeType !== 3 || !no.textContent.trim()) continue;
      const r = document.createRange(); r.selectNodeContents(no);
      for (const q of r.getClientRects()) {
        if (q.width < 2 || q.height < 2) continue;
        for (const fx of [0.08, 0.5, 0.92]) {
          const x = q.left + q.width * fx, y = q.top + q.height * 0.55;
          if (mascarado(el, x, y)) continue;
          n++;
          if (x < 0 || y < 0 || x >= W || y >= H) { fora++; continue; }
          for (const o of document.elementsFromPoint(x, y)) {
            if (o === el || el.contains(o) || o.contains(el)) break;
            if (cobre(o)) { coberto++; por = (o.id ? '#' + o.id : o.className || o.tagName).toString().slice(0, 40); break; }
          }
        }
      }
    }
    if (!n) continue;
    const chave = txt;
    if (vistos.has(chave)) continue; vistos.add(chave);
    res.push({ txt, fora: fora / n, coberto: coberto / n, por });
  }
  return res;
}
"""


def checar(browser, slug, fmt, passo, dur=32.0):
    pasta = RAIZ / f"frente-{slug}" / fmt
    w, h = (1920, 1080) if fmt == "16x9" else (1080, 1920)
    page = browser.new_page(viewport={"width": w, "height": h})
    page.route("**/*", servir(pasta))
    page.goto("http://f.local/index.html?amostras=1", wait_until="domcontentloaded")  # 1 sub-quadro basta para conferir
    page.wait_for_function("window.__hf && window.__hf.buildReady && window.__hf.buildReady.tres && window.__timelines", timeout=60000)
    probs, quem = {}, {}
    t = 0.0
    while t < dur:
        for r in page.evaluate(JS, t):
            for tipo in ("fora", "coberto"):
                if r[tipo] > 0.01:
                    probs.setdefault((r["txt"], tipo), []).append((round(t, 3), r[tipo]))
                    if tipo == "coberto":
                        quem.setdefault(r["txt"], r["por"])
        t += passo
    page.close()
    out = []
    for (txt, tipo), am in probs.items():
        for a, b, pior in faixas(am, passo):
            if b - a >= MIN_DUR:
                out.append((a, b, tipo, pior, txt + (f"  [por {quem.get(txt)}]" if tipo == "coberto" else "")))
    return sorted(out)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("filmes", nargs="+")
    ap.add_argument("--passo", type=float, default=0.25)
    ap.add_argument("--formato", choices=["16x9", "9x16"])
    a = ap.parse_args()
    from playwright.sync_api import sync_playwright
    falhou = False
    with sync_playwright() as p:
        b = p.chromium.launch(args=["--ignore-gpu-blocklist", "--enable-unsafe-swiftshader"])
        for slug in a.filmes:
            for fmt in ([a.formato] if a.formato else ["16x9", "9x16"]):
                achados = checar(b, slug, fmt, a.passo)
                print(f"{slug} {fmt} (HTML): {'ok' if not achados else str(len(achados)) + ' problema(s)'}")
                for ini, fim, tipo, pior, txt in achados:
                    falhou = True
                    print(f"   {ini:5.2f}-{fim:5.2f}s  {'sai do quadro' if tipo == 'fora' else 'coberto':14s} {pior:4.0%}  «{txt}»")
        b.close()
    sys.exit(1 if falhou else 0)


if __name__ == "__main__":
    main()
