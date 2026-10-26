// Renderiza os Reels de todos os cursos presenciais da Cerraclass (um por vez).
// Uso: npm run render:cursos-presenciais
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const dados = JSON.parse(readFileSync(new URL("../../dados/cerraclass-cursos.json", import.meta.url)));
const fonte = readFileSync(new URL("../src/cursosCerraclass.ts", import.meta.url), "utf-8");
for (const c of dados.cursos) {
  // slug = primeiro item da tupla em VISUAL: "pres-x": ["Slug", ...]
  const marca = `"${c.id}": ["`;
  const ini = fonte.indexOf(marca) + marca.length;
  const slug = fonte.slice(ini, fonte.indexOf('"', ini));
  console.log(`→ ReelCurso${slug}`);
  execSync(`npx remotion render src/index.ts ReelCurso${slug} out/reel-curso-${c.id.replace(/^pres-/, "")}.mp4 --codec h264 --crf 16 --overwrite`, { stdio: "ignore" });
}
