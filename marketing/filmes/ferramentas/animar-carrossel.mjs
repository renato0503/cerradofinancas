// Carrossel animado: transforma um carrossel do estúdio (posts/<entrega>/carrossel.html) num vídeo com a mesma arte.
// Os slides passam como num carrossel (deslizando, com desfoque de movimento) e os elementos de cada slide entram
// em sequência; a trilha marca cada troca. Funciona com qualquer identidade (carrossel.css, cerraai, cerraclass, crédito).
//
// Uso:
//   node ferramentas/animar-carrossel.mjs ../posts/2026-11-tech-erp/carrossel.html [outro.html ...] [--render] [--clima cobre|pb|sala]
// Gera filmes/carrosseis/<entrega>/ (projeto HyperFrames, fora do git) e, com --render,
// entregas/<entrega>/carrossel-animado.mp4.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, rmSync, existsSync } from "node:fs";
import { join, dirname, resolve, basename, extname } from "node:path";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { renderizar } from "./trilha.mjs";

const FILMES = resolve(new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const MARKETING = join(FILMES, "..");
const CLI = join(FILMES, "node_modules", "hyperframes", "bin", "hyperframes.mjs");
const PHOSPHOR = join(FILMES, "node_modules", "@phosphor-icons", "web", "src");

const args = process.argv.slice(2);
const renderizarVideo = args.includes("--render");
const clima = args.includes("--clima") ? args[args.indexOf("--clima") + 1] : "cobre";
const pecas = args.filter((a, i) => a.endsWith(".html") && args[i - 1] !== "--clima");

// Tempo de leitura de cada slide: base + um pouco por item, dentro de [3,0; 5,0] s; o último segura mais
const TRANSICAO = 0.55;
function duracaoSlide(html, ultimo) {
  const texto = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const palavras = texto.split(" ").length;
  const d = 1.6 + palavras * 0.075;
  return Math.min(ultimo ? 5.5 : 5.0, Math.max(ultimo ? 4.5 : 3.0, d));
}

function montar(arquivoHtml) {
  const html = readFileSync(arquivoHtml, "utf8");
  const pastaHtml = dirname(arquivoHtml);
  const [, W, H] = html.match(/<meta name="formato" content="(\d+)x(\d+)"/);
  const entrega = html.match(/<meta name="entrega" content="([\w-]+)"/)[1];
  const destino = join(FILMES, "carrosseis", entrega);
  // limpa só o que é gerado (apagar a pasta inteira falha no Windows se algum processo estiver nela)
  rmSync(join(destino, "assets"), { recursive: true, force: true });
  rmSync(join(destino, "index.html"), { force: true });
  mkdirSync(join(destino, "assets"), { recursive: true });

  // Copia um arquivo para assets/ com nome estável e devolve o caminho relativo
  const copiados = new Map();
  function ativo(caminhoAbs) {
    if (copiados.has(caminhoAbs)) return copiados.get(caminhoAbs);
    const h = createHash("md5").update(caminhoAbs).digest("hex").slice(0, 6);
    const nome = `${basename(caminhoAbs, extname(caminhoAbs))}-${h}${extname(caminhoAbs)}`;
    copyFileSync(caminhoAbs, join(destino, "assets", nome));
    copiados.set(caminhoAbs, `assets/${nome}`);
    return `assets/${nome}`;
  }

  // CSS: @import locais embutidos, @import remotos removidos (Inter já vem no HyperFrames), url() copiados
  function lerCss(caminho) {
    let css = readFileSync(caminho, "utf8");
    // nos ícones, só o woff2 (o Chrome do render não precisa de woff, ttf e svg)
    if (caminho.startsWith(PHOSPHOR)) {
      css = css.replace(/src:[^;]+;/g, (m) => { const w = m.match(/url\([^)]*\.woff2[^)]*\)\s*format\(["']woff2["']\)/); return w ? `src: ${w[0]};` : m; });
    }
    css = css.replace(/@import url\(['"]?([^'")]+)['"]?\);?/g, (_, alvo) =>
      /^https?:/.test(alvo) ? "" : lerCss(resolve(dirname(caminho), alvo)));
    return css.replace(/url\(['"]?([^'")]+)['"]?\)/g, (m, alvo) => {
      if (/^(data:|https?:|#)/.test(alvo)) return m;
      const abs = resolve(dirname(caminho), alvo.split(/[?#]/)[0]);
      return existsSync(abs) ? `url('${ativo(abs)}')` : m;
    });
  }
  let css = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)">/g)].map(([, h]) => lerCss(resolve(pastaHtml, h))).join("\n");

  // Ícones Phosphor locais (o carrossel carrega do unpkg)
  if (/phosphor-icons/.test(html)) {
    for (const peso of ["regular", "bold", "duotone", "fill"]) {
      if (peso === "regular" ? / ph ph-|"ph ph-/.test(html) : html.includes(`ph-${peso}`)) css += "\n" + lerCss(join(PHOSPHOR, peso, "style.css"));
    }
  }

  const estiloBody = (html.match(/<body style="([^"]*)"/) || [])[1] || "";
  const secoes = [...html.matchAll(/<section class="slide[\s\S]*?<\/section>/g)].map((m) => m[0]);
  const total = secoes.length;

  // Linha do tempo: início e duração de cada slide
  let t = 0;
  const tempos = secoes.map((s, i) => {
    const d = duracaoSlide(s, i === total - 1);
    const item = { inicio: t, dur: d };
    t += d;
    return item;
  });
  const duracao = Math.round((t + 0.2) * 100) / 100;

  const quadros = secoes.map((s, i) => {
    let sec = s
      .replace(/<img([^>]*?)src="([^"]+)"/g, (m, antes, src) => /^(https?:|data:)/.test(src) ? m : `<img${antes}src="${ativo(resolve(pastaHtml, src))}"`)
      .replace(/<span data-pagina><\/span>/, `<span>${i + 1}/${total}</span>`)
      .replace(/<span class="arraste">[\s\S]*?<\/span>/, "<span></span>")
      .replace(/<span>arraste →<\/span>|<span class="arraste">arraste →<\/span>/i, "<span></span>")
      .replace("<section ", `<section id="s${i + 1}" `);
    // O slide aparece quando começa a deslizar para dentro (TRANSICAO antes do seu início) e fica até o
    // próximo terminar de entrar; assim nunca há quadro vazio na troca.
    const { inicio, dur } = tempos[i];
    const aparece = i === 0 ? 0 : inicio - TRANSICAO;
    const some = i === total - 1 ? duracao : inicio + dur;
    return `      <div id="q${i + 1}" class="quadro clip" data-start="${aparece.toFixed(2)}" data-duration="${(some - aparece).toFixed(2)}" data-track-index="1" style="z-index: ${i + 2}" data-layout-allow-overflow data-layout-allow-overlap>
${sec}
      </div>`;
  });

  const script = `
(function () {
  var tl = gsap.timeline({ paused: true });
  var W = ${W}, TEMPOS = ${JSON.stringify(tempos)}, TRANS = ${TRANSICAO};
  // Grupos (grades, listas, passos, contatos, chips) animam os filhos um a um; o resto anima inteiro
  function blocos(slide) {
    var lista = [];
    Array.prototype.forEach.call(slide.children, function (el) {
      if (el.classList.contains("rodape")) return;
      var cs = getComputedStyle(el);
      var grupo = el.children.length >= 2 && (el.tagName === "UL" || el.tagName === "OL" ||
        ((cs.display === "flex" || cs.display === "grid") && !/^(H1|H2|H3|P|SPAN)$/.test(el.tagName) && el.textContent.trim().length > 0 && el.children.length <= 8));
      if (grupo) Array.prototype.forEach.call(el.children, function (c) { lista.push(c); });
      else lista.push(el);
    });
    return lista;
  }
  for (var i = 0; i < TEMPOS.length; i++) {
    var s = document.getElementById("s" + (i + 1));
    var t0 = TEMPOS[i].inicio;
    // entrada do slide: desliza da direita (o primeiro já começa no lugar)
    if (i > 0) {
      tl.fromTo(s, { x: W }, { x: 0, duration: TRANS, ease: "power3.inOut" }, t0 - TRANS);
      var anterior = document.getElementById("s" + i);
      // o anterior anda junto, colado no novo, como num carrossel de verdade (sem faixa vazia entre os dois)
      tl.to(anterior, { x: -W, duration: TRANS, ease: "power3.inOut" }, t0 - TRANS);
    } else {
      tl.set(s, { x: 0 }, 0);
    }
    var itens = blocos(s);
    tl.fromTo(itens, { opacity: 0, y: 46, filter: "blur(8px)" },
      // os itens começam a entrar enquanto o slide ainda desliza, para a troca não chegar vazia
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.55, ease: "expo.out", stagger: 0.09 }, i > 0 ? t0 - 0.3 : 0.25);
  }
  window.__timelines = window.__timelines || {};
  window.__timelines["main"] = tl;
})();`;

  const index = `<!doctype html>
<!-- gerado por ferramentas/animar-carrossel.mjs a partir de ${basename(pastaHtml)}/carrossel.html: não edite aqui -->
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${W}, height=${H}" />
    <title>Carrossel animado: ${entrega}</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
${css}
      html, body { margin: 0 !important; padding: 0 !important; width: ${W}px; height: ${H}px; overflow: hidden; display: block !important; background: #000; }
      #root { position: relative; width: ${W}px; height: ${H}px; overflow: hidden; ${estiloBody} }
      .quadro { position: absolute; inset: 0; }
      .quadro .slide { position: absolute; left: 0; top: 0; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${duracao}" data-width="${W}" data-height="${H}" data-fps="30" data-motion-blur="on" style="${estiloBody}">
${quadros.join("\n")}
      <audio id="trilha" class="clip" data-start="0" data-duration="${duracao}" data-track-index="9" data-volume="1" src="assets/trilha.wav"></audio>
    </div>
    <script>${script}
    </script>
  </body>
</html>
`;
  writeFileSync(join(destino, "index.html"), index);

  // Trilha: whoosh em cada troca, pop na entrada dos itens, brilho no último slide
  const deixas = [{ t: 0.25, som: "pop", ganho: 0.6 }];
  tempos.slice(1).forEach(({ inicio }, k) => {
    deixas.push({ t: Math.max(0.05, inicio - TRANSICAO * 0.8), som: "whoosh", ganho: 0.7 });
    deixas.push({ t: inicio + 0.1, som: "pop", ganho: 0.45 });
    if (k === tempos.length - 2) deixas.push({ t: inicio + 0.2, som: "brilho" });
  });
  writeFileSync(join(destino, "assets", "trilha.wav"), renderizar({ duracao, bpm: 120, clima, musicaEntra: 0, musicaSai: duracao, deixas }));
  console.log(`${entrega}: ${total} slides, ${duracao}s → filmes/carrosseis/${entrega}/`);
  return { entrega, destino };
}

const env = { ...process.env, HYPERFRAMES_NO_TELEMETRY: "1",
  PATH: `${process.env.PATH};${process.env.LOCALAPPDATA}\\Microsoft\\WinGet\\Links` };
for (const p of pecas) {
  const { entrega, destino } = montar(resolve(p));
  if (renderizarVideo) {
    const mp4 = join(MARKETING, "entregas", entrega, "carrossel-animado.mp4");
    execFileSync(process.execPath, [CLI, "render", "-q", "delivery", "--quiet", "-o", mp4], { cwd: destino, env, stdio: ["ignore", "ignore", "inherit"] });
    console.log(`  → entregas/${entrega}/carrossel-animado.mp4`);
  }
}
