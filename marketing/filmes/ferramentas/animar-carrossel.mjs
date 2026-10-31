// Carrossel animado: transforma um carrossel do estúdio (posts/<entrega>/carrossel.html) num vídeo com a mesma arte.
// Os slides passam como num carrossel (deslizando, com desfoque de movimento) e os elementos de cada slide entram
// em sequência; a trilha marca cada troca. Funciona com qualquer identidade (carrossel.css, cerraai, cerraclass, crédito).
//
// Com uma coreografia em filmes/coreografias/<entrega>.mjs, o vídeo deixa de passar slides: cada slide fica parado,
// os elementos entram um a um com o movimento que a coreografia escolher (palavra por palavra, digitado, desenhado,
// contagem, marca-texto...), saem antes da troca e, quando a cor de fundo muda, o slide novo entra como cortina.
// O vídeo sai SEM áudio (a trilha sintetizada não ficou boa); --com-audio volta a gerar a trilha.
//
// Uso:
//   node ferramentas/animar-carrossel.mjs ../posts/2026-11-tech-erp/carrossel.html [outro.html ...] [--render] [--com-audio] [--clima cobre|pb|sala]
// Gera filmes/carrosseis/<entrega>/ (projeto HyperFrames, fora do git) e, com --render,
// entregas/<entrega>/carrossel-animado.mp4.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, rmSync, existsSync } from "node:fs";
import { join, dirname, resolve, basename, extname } from "node:path";
import { pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { renderizar } from "./trilha.mjs";

const FILMES = resolve(new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const MARKETING = join(FILMES, "..");
const CLI = join(FILMES, "node_modules", "hyperframes", "bin", "hyperframes.mjs");
const PHOSPHOR = join(FILMES, "node_modules", "@phosphor-icons", "web", "src");

const args = process.argv.slice(2);
const renderizarVideo = args.includes("--render");
const comAudio = args.includes("--com-audio");
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

async function montar(arquivoHtml) {
  const html = readFileSync(arquivoHtml, "utf8");
  const pastaHtml = dirname(arquivoHtml);
  const [, W, H] = html.match(/<meta name="formato" content="(\d+)x(\d+)"/);
  const entrega = html.match(/<meta name="entrega" content="([\w-]+)"/)[1];
  const destino = join(FILMES, "carrosseis", entrega);
  const arqCoreo = join(FILMES, "coreografias", `${entrega}.mjs`);
  const coreo = existsSync(arqCoreo) ? (await import(pathToFileURL(arqCoreo).href + `?v=${Date.now()}`)).default : null;
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
    const d = coreo ? coreo.duracoes[i] : duracaoSlide(s, i === total - 1);
    const item = { inicio: t, dur: d };
    t += d;
    return item;
  });
  const duracao = Math.round((t + 0.2) * 100) / 100;

  const quadros = secoes.map((s, i) => {
    let sec = s
      .replace(/<img([^>]*?)src="([^"]+)"/g, (m, antes, src) => /^(https?:|data:)/.test(src) ? m : `<img${antes}src="${ativo(resolve(pastaHtml, src))}"`)
      .replace(/<span data-pagina><\/span>/, `<span class="hf-pag">${i + 1}/${total}</span>`)
      .replace(/<span class="arraste">[\s\S]*?<\/span>/, "<span></span>")
      .replace(/<span>arraste →<\/span>|<span class="arraste">arraste →<\/span>/i, "<span></span>")
      .replace("<section ", `<section id="s${i + 1}" `);
    // O slide aparece quando começa a deslizar para dentro (TRANSICAO antes do seu início) e fica até o
    // próximo terminar de entrar; assim nunca há quadro vazio na troca.
    // Na coreografia o slide aparece um pouco antes do seu início (quando o anterior já esvaziou) e fica por baixo
    // do próximo enquanto a cortina dele passa.
    const { inicio, dur } = tempos[i];
    const aparece = i === 0 ? 0 : inicio - (coreo ? 0.12 : TRANSICAO);
    const some = i === total - 1 ? duracao : inicio + dur + (coreo ? 0.8 : 0);
    return `      <div id="q${i + 1}" class="hf-quadro clip" data-start="${aparece.toFixed(2)}" data-duration="${(some - aparece).toFixed(2)}" data-track-index="1" style="z-index: ${i + 2}" data-layout-allow-overflow data-layout-allow-overlap>
${sec}
      </div>`;
  });

  const script = coreo ? scriptCoreo(coreo, tempos) : `
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
      .hf-quadro { position: absolute; inset: 0; }
      .hf-quadro .slide { position: absolute; left: 0; top: 0; }
      .hf-w, .hf-pag { display: inline-block; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${duracao}" data-width="${W}" data-height="${H}" data-fps="30"${coreo ? "" : ' data-motion-blur="on"'} style="${estiloBody}">
${quadros.join("\n")}
${comAudio ? `      <audio id="trilha" class="clip" data-start="0" data-duration="${duracao}" data-track-index="9" data-volume="1" src="assets/trilha.wav"></audio>
` : ""}    </div>
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
  if (comAudio) writeFileSync(join(destino, "assets", "trilha.wav"), renderizar({ duracao, bpm: 120, clima, musicaEntra: 0, musicaSai: duracao, deixas }));
  console.log(`${entrega}: ${total} slides, ${duracao}s${coreo ? ", coreografia própria" : ""}${comAudio ? "" : ", sem áudio"} → filmes/carrosseis/${entrega}/`);
  return { entrega, destino };
}

// Linha do tempo de uma coreografia. Os movimentos (A.palavras, A.letras, A.revelar...) recebem o seletor dentro do
// slide e o tempo em segundos contado do início do slide. As funções de slide da coreografia vão para a página como
// texto. Da coreografia também vêm a saída (como o conteúdo deixa o slide) e a cortina da troca de cor.
function scriptCoreo(coreo, tempos) {
  const saida = coreo.saida || { opacity: 0, y: -34, duration: 0.36, ease: "power2.in", stagger: 0.04 };
  return `
(function () {
  var tl = gsap.timeline({ paused: true });
  var TEMPOS = ${JSON.stringify(tempos)}, REVELA = ${JSON.stringify(coreo.revela || "baixo")};
  var SAIDA = ${JSON.stringify(saida)};
  var FIXOS = ${JSON.stringify(coreo.fixos || [".rodape"])};
  var SLIDES = [${coreo.slides.map((f) => f.toString()).join(",\n")}];
  var TODO = "inset(-20% -20% -20% -20%)";
  var INICIO = { esq: "inset(-20% 120% -20% -20%)", dir: "inset(-20% -20% -20% 120%)", cima: "inset(-20% -20% 120% -20%)", baixo: "inset(120% -20% -20% -20%)" };
  var CORTINA = { esq: "inset(0% 100% 0% 0%)", dir: "inset(0% 0% 0% 100%)", cima: "inset(0% 0% 100% 0%)", baixo: "inset(100% 0% 0% 0%)", circulo: "circle(0% at 50% 50%)" };

  // Quebra o texto em palavras (span.hf-w, inline-block), preservando span, em e b de dentro; ícone conta como palavra
  function palavrasDe(el) {
    if (el.__p) return el.__p;
    var lista = [];
    (function andar(no) {
      Array.prototype.slice.call(no.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\\s+)/).forEach(function (pedaco) {
            if (!pedaco) return;
            if (/^\\s+$/.test(pedaco)) { frag.appendChild(document.createTextNode(pedaco)); return; }
            var w = document.createElement("span"); w.className = "hf-w"; w.textContent = pedaco; frag.appendChild(w); lista.push(w);
          });
          no.replaceChild(frag, n);
        } else if (n.nodeType === 1 && (n.tagName === "I" || n.tagName === "IMG")) lista.push(n);
        else if (n.nodeType === 1 && n.tagName !== "BR") andar(n);
      });
    })(el);
    return (el.__p = lista);
  }
  // Quebra em letras (span inline: o layout não muda, só a visibilidade)
  function letrasDe(el) {
    if (el.__l) return el.__l;
    var lista = [];
    (function andar(no) {
      Array.prototype.slice.call(no.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          Array.from(n.textContent).forEach(function (c) {
            var sp = document.createElement("span"); sp.textContent = c; frag.appendChild(sp); lista.push(sp);
          });
          no.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName === "I") lista.push(n);
        else if (n.nodeType === 1) andar(n);
      });
    })(el);
    return (el.__l = lista);
  }

  function api(s, t0, fim) {
    function els(sel) {
      if (typeof sel !== "string") return sel.length !== undefined ? Array.prototype.slice.call(sel) : [sel];
      var r = Array.prototype.slice.call(s.querySelectorAll(sel));
      if (!r.length) console.warn("coreografia: nada para " + sel + " em " + s.id);
      return r;
    }
    var A = {
      s: s, tl: tl, t0: t0, els: els,
      // palavra por palavra: cada palavra sobe (y), pode girar (rot) ou crescer (escala)
      palavras: function (sel, t, o) {
        o = o || {}; var ws = [];
        els(sel).forEach(function (e) { ws = ws.concat(palavrasDe(e)); });
        tl.fromTo(ws, { opacity: 0, x: o.x || 0, y: o.y == null ? 46 : o.y, rotation: o.rot || 0, scale: o.escala || 1, transformOrigin: o.origem || "50% 100%" },
          { opacity: 1, x: 0, y: 0, rotation: 0, scale: 1, duration: o.dur || 0.6, ease: o.ease || "power3.out", stagger: o.stagger || 0.06 }, t0 + t);
        return ws;
      },
      // digitado: letra por letra (cps = letras por segundo)
      letras: function (sel, t, o) {
        o = o || {}; var cs = [];
        els(sel).forEach(function (e) { cs = cs.concat(letrasDe(e)); });
        tl.fromTo(cs, { opacity: 0 }, { opacity: 1, duration: 0.01, ease: "none", stagger: 1 / (o.cps || 32) }, t0 + t);
        return cs;
      },
      // aparece deslocado e assenta
      surgir: function (sel, t, o) {
        o = o || {};
        tl.fromTo(els(sel), { opacity: 0, x: o.x || 0, y: o.y == null ? 36 : o.y, scale: o.escala || 1, rotation: o.rot || 0 },
          { opacity: o.op == null ? 1 : o.op, x: 0, y: 0, scale: 1, rotation: 0, duration: o.dur || 0.6, ease: o.ease || "power3.out", stagger: o.stagger || 0.1 }, t0 + t);
      },
      // salta do pequeno ao tamanho certo, passando um pouco do ponto
      pop: function (sel, t, o) {
        o = o || {};
        tl.fromTo(els(sel), { opacity: 0, scale: o.de == null ? 0.3 : o.de, rotation: o.rot || 0, y: o.y || 0, transformOrigin: o.origem || "50% 50%" },
          { opacity: 1, scale: 1, rotation: o.rotFim || 0, y: 0, duration: o.dur || 0.55, ease: o.ease || "back.out(2.2)", stagger: o.stagger || 0.08 }, t0 + t);
      },
      // desenhado: uma máscara abre o elemento numa direção (esq, dir, cima, baixo)
      revelar: function (sel, t, o) {
        o = o || {};
        tl.fromTo(els(sel), { clipPath: INICIO[o.dir || "esq"] },
          { clipPath: TODO, duration: o.dur || 0.8, ease: o.ease || "power3.inOut", stagger: o.stagger || 0.12 }, t0 + t);
      },
      // número contando até o valor final
      contar: function (sel, t, ate, o) {
        o = o || {};
        els(sel).forEach(function (e) {
          var no = Array.prototype.find.call(e.childNodes, function (n) { return n.nodeType === 3 && n.textContent.trim(); });
          var obj = { v: o.de || 0 };
          tl.fromTo(obj, { v: o.de || 0 }, { v: ate, duration: o.dur || 1, ease: o.ease || "power2.out",
            onUpdate: function () { no.textContent = String(Math.round(obj.v)); } }, t0 + t);
        });
      },
      // marca-texto passando da esquerda para a direita (fundo em gradiente)
      marcar: function (sel, t, o) {
        o = o || {};
        var es = els(sel);
        es.forEach(function (e) { e.style.backgroundRepeat = "no-repeat"; });
        tl.fromTo(es, { backgroundSize: "0% 100%" }, { backgroundSize: "100% 100%", duration: o.dur || 0.8, ease: o.ease || "power2.inOut", stagger: 0.2 }, t0 + t);
      },
      // qualquer outro movimento: de -> para
      mover: function (sel, t, de, para) { tl.fromTo(els(sel), de, Object.assign({ duration: 0.7, ease: "power3.out" }, para), t0 + t); },
      // movimento lento e contínuo até o fim do slide (girar, aproximar, deslizar)
      continuo: function (sel, t, para) { tl.to(els(sel), Object.assign({ ease: "none", duration: Math.max(0.5, fim - (t0 + t)) }, para), t0 + t); },
      // vai e volta suave até o fim do slide (flutuar, pulsar)
      onda: function (sel, t, para, periodo) {
        var p = periodo || 1.6, n = Math.max(1, Math.floor((fim - (t0 + t)) / p) - 1);
        tl.to(els(sel), Object.assign({ ease: "sine.inOut", duration: p / 2, yoyo: true, repeat: n % 2 ? n : n + 1 }, para), t0 + t);
      },
    };
    return A;
  }

  for (var i = 0; i < TEMPOS.length; i++) {
    var s = document.getElementById("s" + (i + 1));
    var T = TEMPOS[i].inicio, t0 = T;
    if (i > 0) {
      var ant = document.getElementById("s" + i);
      // o conteúdo do anterior sai do jeito da marca; o que é fixo (rodapé, cabeçalho) fica
      var sai = Array.prototype.filter.call(ant.children, function (el) {
        return !FIXOS.some(function (f) { return el.matches(f); });
      });
      tl.to(sai, Object.assign({}, SAIDA), T - 0.12 - (SAIDA.duration || 0.36) - (SAIDA.stagger || 0.04) * (sai.length - 1));
      // mesma cor de fundo: o slide novo só assume (o rodapé é idêntico); cor nova: entra como cortina
      var ca = getComputedStyle(ant), cs = getComputedStyle(s);
      var mudaCor = ca.backgroundColor !== cs.backgroundColor || ca.backgroundImage !== cs.backgroundImage;
      if (mudaCor) {
        var fimCortina = REVELA === "circulo" ? "circle(150% at 50% 50%)" : "inset(0% 0% 0% 0%)";
        tl.fromTo(s, { clipPath: CORTINA[REVELA] }, { clipPath: fimCortina, duration: 0.62, ease: "power3.inOut" }, T - 0.12);
        t0 = T + 0.3;
      }
      var pag = s.querySelector(".hf-pag");
      if (pag && !mudaCor) tl.fromTo(pag, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, T);
    }
    SLIDES[i](api(s, t0, T + TEMPOS[i].dur));
  }
  window.__timelines = window.__timelines || {};
  window.__timelines["main"] = tl;
})();`;
}

const env = { ...process.env, HYPERFRAMES_NO_TELEMETRY: "1",
  PATH: `${process.env.PATH};${process.env.LOCALAPPDATA}\\Microsoft\\WinGet\\Links` };
for (const p of pecas) {
  const { entrega, destino } = await montar(resolve(p));
  if (renderizarVideo) {
    const mp4 = join(MARKETING, "entregas", entrega, "carrossel-animado.mp4");
    execFileSync(process.execPath, [CLI, "render", "-q", "delivery", "--quiet", "-o", mp4], { cwd: destino, env, stdio: ["ignore", "ignore", "inherit"] });
    console.log(`  → entregas/${entrega}/carrossel-animado.mp4`);
  }
}
