// Copia o catálogo de cursos presenciais da CerraClass para dados/cerraclass-cursos.json.
// Fonte: D:\Dev\CerraClass\src\constants\presencialCourses.ts e presencialCourseContent.ts
// Uso (Node 22.6+, que lê TypeScript): node tools/importar-cerraclass.mjs [caminho-da-cerraclass]
import { writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";

const raiz = process.argv[2] ?? "D:/Dev/CerraClass";
const constantes = path.join(raiz, "src", "constants");
const cursos = await import(pathToFileURL(path.join(constantes, "presencialCourses.ts")).href);
const conteudo = await import(pathToFileURL(path.join(constantes, "presencialCourseContent.ts")).href);

const dados = {
  fonte: "CerraClass/src/constants (presencialCourses.ts + presencialCourseContent.ts)",
  formatos: cursos.FORMAT_INFO,
  inclusos: conteudo.PRESENCIAL_INCLUDES,
  levar: conteudo.PRESENCIAL_BRING,
  cursos: cursos.PRESENCIAL_COURSES.map((c) => ({ ...c, ...conteudo.PRESENCIAL_CONTENT[c.id] })),
};

const destino = new URL("../dados/cerraclass-cursos.json", import.meta.url);
writeFileSync(destino, JSON.stringify(dados, null, 2) + "\n");
console.log(`${dados.cursos.length} cursos → dados/cerraclass-cursos.json`);
