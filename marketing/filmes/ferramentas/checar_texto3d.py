"""Confere se todo texto escrito nos objetos 3D dos filmes das frentes aparece inteiro.

Para cada filme (16x9 e 9x16) e a cada PASSO segundos, procura as malhas com textura de texto
(o palco3d.js marca as texturas em que houve fillText) e acusa quando o texto:
  - sai do quadro (corte na borda),
  - fica escondido atrás de outro objeto 3D (raios da câmera até pontos da face com o texto),
  - fica atrás do bloco de texto HTML do plano ativo.

    python ferramentas/checar_texto3d.py                    # todos os filmes, os dois formatos
    python ferramentas/checar_texto3d.py contabilidade      # só um
    python ferramentas/checar_texto3d.py credito --passo 0.5

Sai com código 1 se houver problema que dure mais que MIN_DUR (entradas e saídas rápidas são ignoradas).
Pré-requisito: npm run montar:frentes (gera frente-*/16x9 e 9x16).
"""
import argparse
import mimetypes
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[1]
GSAP = RAIZ.parent / "palestras" / "2026-10-palestra-carreira-ia" / "apresentacao" / "vendor" / "gsap.min.js"
MIN_DUR = 0.6     # segundos: problema mais curto que isso é transição
LIM_FORA = 0.02   # fração da etiqueta fora do quadro
LIM_OCULTO = 0.12 # fração dos pontos da face escondidos
LIM_HTML = 0.04   # fração da etiqueta atrás do texto HTML

JS_CHECAR = r"""
async (t) => {
  await window.__hf.buildReady.tres;
  const tl = window.__timelines && window.__timelines.main;
  if (tl) tl.seek(t, false);
  window.dispatchEvent(new CustomEvent('hf-seek', { detail: { time: t } }));
  const { THREE, cena, camera } = window.__palco;
  const raiz = document.getElementById('root');
  const W = +raiz.dataset.width, H = +raiz.dataset.height;
  cena.updateMatrixWorld(true);
  camera.updateMatrixWorld(true);

  // camada HTML: só os clipes do tempo t ficam visíveis (como no HyperFrames); o teste de cobertura
  // usa elementsFromPoint (pointer-events ligado à força) e conta o que estiver na frente do canvas
  for (const el of raiz.querySelectorAll('[data-start]')) {
    if (el.id === 'tela') continue;
    const ini = +el.dataset.start, fim = ini + +(el.dataset.duration || 1e9);
    el.style.visibility = (t >= ini && t < fim) ? '' : 'hidden';
  }
  if (!document.getElementById('__pe')) { const s = document.createElement('style'); s.id = '__pe'; s.textContent = '#root, #root * { pointer-events: auto !important; }'; document.head.appendChild(s); }
  const tela = document.getElementById('tela');
  const efOp = (el) => { let op = 1; for (let e = el; e && e !== document.body; e = e.parentElement) { const cs = getComputedStyle(e); op *= +cs.opacity; if (cs.visibility === 'hidden') return 0; } return op; };
  const cobre = (el) => {
    const cs = getComputedStyle(el);
    const fundo = cs.backgroundColor.match(/[\d.]+/g);
    const temFundo = (fundo && (fundo.length < 4 || +fundo[3] > 0.5)) || cs.backgroundImage !== 'none';
    const temTexto = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
    return (temFundo || temTexto) && efOp(el) > 0.3;
  };
  const coberto = (sx, sy) => {
    if (sx < 0 || sy < 0 || sx >= W || sy >= H) return false;
    for (const el of document.elementsFromPoint(sx, sy)) { if (el === tela) return false; if (el !== raiz && cobre(el)) return true; }
    return false;
  };

  const visivel = (o) => { for (let e = o; e; e = e.parent) if (!e.visible) return false; return true; };
  const mats = (m) => Array.isArray(m.material) ? m.material : [m.material];
  const opaco = (m) => mats(m).some(x => x && !x.isShadowMaterial && (x.opacity ?? 1) > 0.05 && x.visible !== false);
  const malhas = [];
  cena.traverse(o => { if (o.isMesh && visivel(o) && opaco(o)) malhas.push(o); });

  const ray = new THREE.Raycaster();
  const res = [];
  for (const m of malhas) {
    const ms = mats(m);
    const iTex = ms.findIndex(x => x && x.map && x.map.userData && x.map.userData.textos && (x.opacity ?? 1) > 0.15);
    const letras3d = iTex < 0 && m.userData.textos; // letras extrudadas (TextGeometry): a frente fica em z = max
    if (iTex < 0 && !letras3d) continue;
    const textos = letras3d ? m.userData.textos.join(' / ') : [...ms[iTex].map.userData.textos].join(' / ');
    const g = m.geometry; if (!g.boundingBox) g.computeBoundingBox();
    const bb = g.boundingBox;
    // pontos da face com o texto (local)
    let pts = [];
    const L = (a, b, u) => a + (b - a) * u;
    // pontos nas palavras: cada fillText guardou a sua caixa (fração do canvas, y para baixo)
    const cxs = letras3d ? [[0.04, 0.1, 0.96, 0.9]] : (ms[iTex].map.userData.caixas || [[0.08, 0.12, 0.92, 0.88]]);
    const k = (a) => Math.min(1, Math.max(0, a));
    const uvs = [];
    for (const c of cxs) for (const [fu, fv] of [[0.12, 0.5], [0.5, 0.5], [0.88, 0.5], [0.5, 0.2], [0.5, 0.8]])
      uvs.push([k(L(c[0], c[2], fu)), k(1 - L(c[1], c[3], fv))]);
    const ext = new THREE.Vector3(); bb.getSize(ext);
    const plano = letras3d || g.type === 'PlaneGeometry' || g.type === 'CircleGeometry' || g.type === 'ShapeGeometry' || ext.z < 1e-4;
    const deitado = !plano && ext.y < 1e-4;
    for (const [u, v] of uvs) {
      if (plano) pts.push(new THREE.Vector3(L(bb.min.x, bb.max.x, u), L(bb.min.y, bb.max.y, v), letras3d ? bb.max.z : (bb.min.z + bb.max.z) / 2));
      else if (deitado) pts.push(new THREE.Vector3(L(bb.min.x, bb.max.x, u), bb.max.y, L(bb.min.z, bb.max.z, 1 - v)));
      else if (g.type === 'BoxGeometry' && Array.isArray(m.material)) {
        const eixo = Math.floor(iTex / 2), lado = iTex % 2 ? bb.min : bb.max;
        if (eixo === 0) pts.push(new THREE.Vector3(lado.x, L(bb.min.y, bb.max.y, v), L(bb.min.z, bb.max.z, u)));
        if (eixo === 1) pts.push(new THREE.Vector3(L(bb.min.x, bb.max.x, u), lado.y, L(bb.min.z, bb.max.z, 1 - v)));
        if (eixo === 2) pts.push(new THREE.Vector3(L(bb.min.x, bb.max.x, u), L(bb.min.y, bb.max.y, v), lado.z));
      } else pts.push(new THREE.Vector3(L(bb.min.x, bb.max.x, u), bb.max.y, L(bb.min.z, bb.max.z, 1 - v)));
    }
    const mundo = pts.map(p => p.clone().applyMatrix4(m.matrixWorld));
    // retângulo na tela
    let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9, atras = false;
    for (const p of mundo) {
      const q = p.clone().project(camera);
      if (q.z > 1 || q.z < -1) atras = true;
      const sx = (q.x + 1) / 2 * W, sy = (1 - q.y) / 2 * H;
      x0 = Math.min(x0, sx); x1 = Math.max(x1, sx); y0 = Math.min(y0, sy); y1 = Math.max(y1, sy);
    }
    const area = Math.max(1, (x1 - x0) * (y1 - y0));
    if (area < 400) continue; // pequeno demais para ler
    const ix0 = Math.max(x0, 0), iy0 = Math.max(y0, 0), ix1 = Math.min(x1, W), iy1 = Math.min(y1, H);
    const dentro = Math.max(0, ix1 - ix0) * Math.max(0, iy1 - iy0);
    const fora = atras ? 1 : 1 - dentro / area;
    if (fora > 0.97) continue; // fora de cena (a câmera ainda não chegou ou já saiu)
    // atrás do HTML (texto, painel ou cortina na frente do canvas)
    let cob = 0, nPts = 0;
    for (const p of mundo) {
      const q = p.clone().project(camera);
      const sx = (q.x + 1) / 2 * W, sy = (1 - q.y) / 2 * H;
      if (sx < 0 || sy < 0 || sx >= W || sy >= H) continue;
      nPts++; if (coberto(sx, sy)) cob++;
    }
    const html = nPts ? cob / nPts : 0;
    // escondido por outro objeto
    let ocultos = 0, total = 0, por = '';
    const cam = new THREE.Vector3(); camera.getWorldPosition(cam);
    for (const p of mundo) {
      const q = p.clone().project(camera);
      if (Math.abs(q.x) > 1 || Math.abs(q.y) > 1) continue;
      total++;
      const dir = p.clone().sub(cam); const dist = dir.length(); dir.normalize();
      ray.set(cam, dir); ray.far = dist - 0.02;
      const hit = ray.intersectObjects(malhas, false).find(h => h.object !== m && opaco(h.object) && !(mats(h.object).every(x => x.transparent && (x.opacity ?? 1) < 0.5)));
      if (hit) { ocultos++; const tx = mats(hit.object).map(x => x.map && x.map.userData.textos ? [...x.map.userData.textos].join('/') : '').join(''); por = hit.object.geometry.type + (tx ? ':' + tx : '') + '@' + hit.object.position.toArray().map(v => v.toFixed(1)).join(','); }
    }
    const oculto = total ? ocultos / total : 0;
    res.push({ textos, por, fora: +fora.toFixed(3), oculto: +oculto.toFixed(3), html: +html.toFixed(3) });
  }
  return res;
}
"""


def servir(pasta: Path):
    def rota(route):
        url = route.request.url
        if "gsap" in url and "jsdelivr" in url:
            return route.fulfill(status=200, body=GSAP.read_bytes(), headers={"Content-Type": "text/javascript"})
        if not url.startswith("http://f.local/"):
            return route.fulfill(status=404, body="")
        arq = pasta / url.split("http://f.local/", 1)[1].split("?")[0]
        if not arq.is_file():
            return route.fulfill(status=404, body="")
        tipo = "text/javascript" if arq.suffix in (".js", ".mjs") else (mimetypes.guess_type(arq.name)[0] or "application/octet-stream")
        route.fulfill(status=200, body=arq.read_bytes(), headers={"Content-Type": tipo})
    return rota


def abrir(browser, pasta: Path, w, h):
    page = browser.new_page(viewport={"width": w, "height": h})
    page.route("**/*", servir(pasta))
    page.goto("http://f.local/index.html?amostras=1", wait_until="domcontentloaded")  # 1 sub-quadro basta para conferir
    page.wait_for_function("window.__hf && window.__hf.buildReady && window.__hf.buildReady.tres && window.__palco", timeout=60000)
    page.evaluate("() => window.__hf.buildReady.tres")
    return page


def faixas(amostras, passo):
    """agrupa [(t, problema)] em faixas contínuas de tempo"""
    out, ini, ant, pior = [], None, None, None
    for t, p in amostras:
        if ini is not None and t - ant <= passo + 1e-6:
            ant, pior = t, max(pior, p)
            continue
        if ini is not None:
            out.append((ini, ant + passo, pior))
        ini, ant, pior = t, t, p
    if ini is not None:
        out.append((ini, ant + passo, pior))
    return out


def checar(browser, slug, formato, passo, dur=32.0):
    pasta = RAIZ / f"frente-{slug}" / formato
    w, h = (1920, 1080) if formato == "16x9" else (1080, 1920)
    page = abrir(browser, pasta, w, h)
    probs = {}  # (texto, tipo) -> [(t, valor)]
    quem = {}
    t = 0.0
    while t < dur:
        for r in page.evaluate(JS_CHECAR, t):
            for tipo, lim in (("fora", LIM_FORA), ("oculto", LIM_OCULTO), ("html", LIM_HTML)):
                if r[tipo] > lim and not (tipo != "fora" and r[tipo] > 0.97):  # inteiro escondido = não aparece, não é corte
                    probs.setdefault((r["textos"], tipo), []).append((round(t, 3), r[tipo]))
                    if tipo == "oculto":
                        quem.setdefault(r["textos"], r["por"])
        t += passo
    page.close()
    achados = []
    for (txt, tipo), amostras in probs.items():
        for a, b, pior in faixas(amostras, passo):
            if b - a >= MIN_DUR:
                achados.append((a, b, tipo, pior, txt + (f'  [por {quem.get(txt)}]' if tipo == 'oculto' else '')))
    return sorted(achados)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("filmes", nargs="*")
    ap.add_argument("--passo", type=float, default=0.25)
    ap.add_argument("--formato", choices=["16x9", "9x16"])
    a = ap.parse_args()
    slugs = a.filmes or sorted(p.name[7:] for p in RAIZ.glob("frente-*") if (p / "16x9" / "index.html").exists())
    formatos = [a.formato] if a.formato else ["16x9", "9x16"]
    from playwright.sync_api import sync_playwright
    nomes = {"fora": "sai do quadro", "oculto": "escondido por objeto", "html": "atrás do texto HTML"}
    falhou = False
    with sync_playwright() as p:
        browser = p.chromium.launch(args=["--ignore-gpu-blocklist", "--enable-unsafe-swiftshader"])
        for slug in slugs:
            for fmt in formatos:
                achados = checar(browser, slug, fmt, a.passo)
                print(f"{slug} {fmt}: {'ok' if not achados else str(len(achados)) + ' problema(s)'}")
                for ini, fim, tipo, pior, txt in achados:
                    falhou = True
                    print(f"   {ini:5.2f}-{fim:5.2f}s  {nomes[tipo]:22s} {pior:4.0%}  «{txt[:110]}»")
        browser.close()
    sys.exit(1 if falhou else 0)


if __name__ == "__main__":
    main()
