// Renderiza o comercial de 15s (filmes/cerraclass-curso) para cada curso da CerraClass, nos dois formatos,
// e copia para entregas/2026-10-curso-<slug>/video-vertical.mp4 e video-16x9.mp4.
// Dados: dados/cerraclass-cursos.json (11 cursos do catálogo) + as duas landings (IA na Prática, IA em Ação Farma).
// Cor e slug: os mesmos do carrossel, lidos de VISUAL em tools/gerar_cursos_cerraclass.py.
// Uso: node ferramentas/render-cursos.mjs [slug ...]   (sem argumentos: todos)
import { readFileSync, mkdirSync, copyFileSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

const filmes = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const marketing = join(filmes, "..");
const dados = JSON.parse(readFileSync(join(marketing, "dados", "cerraclass-cursos.json"), "utf8"));
const gerador = readFileSync(join(marketing, "tools", "gerar_cursos_cerraclass.py"), "utf8");
const visual = Object.fromEntries(
  [...gerador.matchAll(/"(pres-[\w-]+)":\s*\("([\w-]+)",\s*"(#[0-9a-f]{6})"/g)].map(([, id, slug, cor]) => [id, { slug, cor }]),
);

const cursos = dados.cursos.map((c) => {
  const f = dados.formatos[c.format];
  return {
    slug: visual[c.id].slug,
    vars: {
      titulo: c.title, cor: visual[c.id].cor, categoria: c.category,
      formato: `${f.label} · ${f.totalHours}`, quando: f.summary, entregavel: c.deliverables[0],
    },
  };
});
// As duas landings feitas à mão (textos das próprias landings, /iacao/ e /iafarma/)
cursos.push(
  { slug: "ia-na-pratica", vars: { titulo: "IA na Prática", cor: "#9ad65a", categoria: "Construir com IA",
    formato: "Imersão presencial · 10h", quando: "Em um único dia", entregavel: "Seus próprios apps funcionando" } },
  { slug: "ia-farma", vars: { titulo: "IA em Ação Farma", cor: "#e7a0f0", categoria: "Propagandistas",
    formato: "Treinamento presencial", quando: "Para propagandistas", entregavel: "Apps, conteúdos e automações de campo" } },
);

const pedidos = process.argv.slice(2);
const env = { ...process.env, HYPERFRAMES_NO_TELEMETRY: "1",
  PATH: `${process.env.PATH};${process.env.LOCALAPPDATA}\\Microsoft\\WinGet\\Links` };
const CLI = join(filmes, "node_modules", "hyperframes", "bin", "hyperframes.mjs");
const saida = join(filmes, "out", "cursos");
mkdirSync(saida, { recursive: true });

for (const c of cursos.filter((x) => !pedidos.length || pedidos.includes(x.slug))) {
  for (const [formato, nome] of [["16x9", "video-16x9.mp4"], ["9x16", "video-vertical.mp4"]]) {
    const mp4 = join(saida, `${c.slug}-${formato}.mp4`);
    // JSON inline: o --variables-file da 0.8.210 falha ("io.readFile is not a function")
    execFileSync(process.execPath, [CLI, "render", "-q", "delivery", "--quiet", "--strict-variables",
      "--variables", JSON.stringify(c.vars), "-o", mp4], { cwd: join(filmes, "cerraclass-curso", formato), env, stdio: ["ignore", "ignore", "inherit"] });
    const entrega = join(marketing, "entregas", `2026-10-curso-${c.slug}`);
    copyFileSync(mp4, join(entrega, nome));
    console.log(`${c.slug} ${formato} → entregas/2026-10-curso-${c.slug}/${nome}`);
  }
}
