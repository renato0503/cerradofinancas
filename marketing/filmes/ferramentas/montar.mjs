// Monta os dois projetos HyperFrames de um filme a partir das fontes em <filme>/fonte/:
//   <filme>/16x9/index.html (1920x1080) e <filme>/9x16/index.html (1080x1920), cada um com cópia de assets/.
// Em cena.html, {{W}} e {{H}} viram as dimensões e {{CLASSE}} vira "horizontal" ou "vertical";
// filme.css e filme.js entram embutidos (o lint do HyperFrames lê o registro da timeline no próprio HTML).
// Uso: node ferramentas/montar.mjs cerra-ai-comercial [outro-filme ...]
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync } from "node:fs";
import { join } from "node:path";

const raiz = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const versoes = [
  { pasta: "16x9", W: 1920, H: 1080, CLASSE: "horizontal" },
  { pasta: "9x16", W: 1080, H: 1920, CLASSE: "vertical" },
];
const AVISO = "<!-- gerado por ferramentas/montar.mjs a partir de fonte/: edite os arquivos de fonte/ -->";

for (const filme of process.argv.slice(2)) {
  const fonte = join(raiz, filme, "fonte");
  const ler = (f) => readFileSync(join(fonte, f), "utf8");
  const modelo = ler("cena.html")
    .replace('<link rel="stylesheet" href="filme.css" />', () => `<style>\n${ler("filme.css")}</style>`)
    .replace('<script src="filme.js"></script>', () => `<script>\n${ler("filme.js")}</script>`);
  for (const v of versoes) {
    const destino = join(raiz, filme, v.pasta);
    rmSync(join(destino, "assets"), { recursive: true, force: true });
    mkdirSync(destino, { recursive: true });
    cpSync(join(fonte, "assets"), join(destino, "assets"), { recursive: true });
    const html = modelo.replace(/\{\{(W|H|CLASSE)\}\}/g, (_, k) => String(v[k]));
    // o aviso entra depois do doctype para não jogar a página em modo quirks
    writeFileSync(join(destino, "index.html"), html.replace(/^(<!doctype html>)/i, `$1\n${AVISO}`));
    console.log(`${filme}/${v.pasta}/index.html  ${v.W}x${v.H}`);
  }
}
