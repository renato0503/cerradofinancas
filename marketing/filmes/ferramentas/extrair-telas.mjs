// Extrai as telas dos filmes aprovados para o filme "Vídeo com IA · a prova na tela".
// Cada tela é um trecho curto do MP4 em frames WebP numerados (o cena3d troca a textura por tempo).
// Uso: node ferramentas/extrair-telas.mjs [--forca]   (de marketing/filmes)
// Entra em out/frente-<slug>-<formato>.mp4, sai em frente-videocomia-v2/fonte/assets/telas/<slug>/.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const raiz = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const saida = join(raiz, "frente-videocomia-v2", "fonte", "assets", "telas");
const FPS = 10;

// trecho escolhido no ROTEIRO.md: o momento em que o objeto 3D da frente está na tela
const TELAS = [
  { slug: "cerraai", arquivo: "frente-cerraai-9x16.mp4", de: 6.0, w: 432, h: 768 },
  { slug: "cerrafood", arquivo: "frente-cerrafood-9x16.mp4", de: 7.0, w: 432, h: 768 },
  { slug: "credito", arquivo: "frente-credito-9x16.mp4", de: 7.4, w: 432, h: 768 },
  { slug: "guiacademico", arquivo: "frente-guiacademico-9x16.mp4", de: 5.6, w: 432, h: 768 },
  { slug: "cerraclass", arquivo: "frente-cerraclass-16x9.mp4", de: 19.2, w: 768, h: 432 },
  { slug: "consultoria", arquivo: "frente-consultoria-16x9.mp4", de: 8.4, w: 768, h: 432 },
  { slug: "contabilidade", arquivo: "frente-contabilidade-16x9.mp4", de: 4.6, w: 768, h: 432 },
];
const DUR = 2.2;

const forca = process.argv.includes("--forca");
const manifesto = {};

for (const t of TELAS) {
  const origem = join(raiz, "out", t.arquivo);
  if (!existsSync(origem)) {
    console.error(`falta ${origem} — renderize os filmes das frentes primeiro`);
    process.exit(1);
  }
  const destino = join(saida, t.slug);
  if (existsSync(destino)) rmSync(destino, { recursive: true, force: true });
  mkdirSync(destino, { recursive: true });
  // -ss antes do -i: corte rápido e preciso o bastante para 10 fps
  execFileSync("ffmpeg", [
    "-hide_banner", "-loglevel", "error", "-ss", String(t.de), "-t", String(DUR), "-i", origem,
    "-vf", `fps=${FPS},scale=${t.w}:${t.h}:flags=lanczos`,
    // libwebp (quadro a quadro), não libwebp_anim: o encoder animado ignora o padrão de nomes
    "-c:v", "libwebp", "-q:v", "65", join(destino, "f%03d.webp"),
  ], { stdio: "inherit" });
  const frames = readdirSync(destino).filter((f) => f.endsWith(".webp")).sort();
  manifesto[t.slug] = { n: frames.length, w: t.w, h: t.h, de: t.de, dur: DUR, fps: FPS };
  console.log(`${t.slug}: ${frames.length} quadros ${t.w}x${t.h}`);
}

writeFileSync(join(saida, "manifest.json"), JSON.stringify(manifesto, null, 2) + "\n");
console.log(`ok: ${saida}`);
