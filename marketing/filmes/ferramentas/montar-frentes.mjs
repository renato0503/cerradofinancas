// Monta os filmes 3D das frentes (Three.js + GSAP) a partir de frente-<slug>/fonte/:
//   frente-<slug>/16x9/index.html (1920x1080) e frente-<slug>/9x16/index.html (1080x1920).
// Em cena.html, {{W}}, {{H}} e {{CLASSE}} viram as dimensões e "horizontal"/"vertical".
// base.css + filme.css e planos.js entram embutidos (o lint lê o registro da timeline no próprio HTML).
// assets/ recebe: fonte/assets/*, cena3d.js, frentes-comum/palco3d.js, o three.module.min.js fixado (0.170.0)
// e o RoomEnvironment.js (que importa "three": o cena.html declara o import map).
// Uso: node ferramentas/montar-frentes.mjs cerraai tech ... (sem argumento: todas as frente-*)
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const raiz = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const comum = join(raiz, "frentes-comum");
const three = join(raiz, "node_modules", "three", "build", "three.module.min.js");
const sala = join(raiz, "node_modules", "three", "examples", "jsm", "environments", "RoomEnvironment.js");
const versoes = [
  { pasta: "16x9", W: 1920, H: 1080, CLASSE: "horizontal" },
  { pasta: "9x16", W: 1080, H: 1920, CLASSE: "vertical" },
];
const AVISO = "<!-- gerado por ferramentas/montar-frentes.mjs a partir de fonte/: edite os arquivos de fonte/ -->";

let slugs = process.argv.slice(2);
if (!slugs.length) slugs = readdirSync(raiz).filter((d) => d.startsWith("frente-")).map((d) => d.slice(7));

for (const slug of slugs) {
  const pasta = join(raiz, `frente-${slug}`);
  const fonte = join(pasta, "fonte");
  const ler = (f) => readFileSync(join(fonte, f), "utf8");
  const css = readFileSync(join(comum, "base.css"), "utf8") + "\n" + ler("filme.css");
  const modelo = ler("cena.html")
    .replace('<link rel="stylesheet" href="filme.css" />', () => `<style>\n${css}</style>`)
    .replace('<script src="planos.js"></script>', () => `<script>\n${readFileSync(join(comum, "planos.js"), "utf8")}</script>`);
  for (const v of versoes) {
    const destino = join(pasta, v.pasta);
    rmSync(join(destino, "assets"), { recursive: true, force: true });
    mkdirSync(join(destino, "assets"), { recursive: true });
    if (existsSync(join(fonte, "assets"))) cpSync(join(fonte, "assets"), join(destino, "assets"), { recursive: true });
    cpSync(join(fonte, "cena3d.js"), join(destino, "assets", "cena3d.js"));
    cpSync(join(comum, "palco3d.js"), join(destino, "assets", "palco3d.js"));
    cpSync(three, join(destino, "assets", "three.module.min.js"));
    cpSync(sala, join(destino, "assets", "RoomEnvironment.js"));
    const html = modelo.replace(/\{\{(W|H|CLASSE)\}\}/g, (_, k) => String(v[k]));
    writeFileSync(join(destino, "index.html"), html.replace(/^(<!doctype html>)/i, `$1\n${AVISO}`));
    console.log(`frente-${slug}/${v.pasta}/index.html  ${v.W}x${v.H}`);
  }
}
