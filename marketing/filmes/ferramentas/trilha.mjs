// Sintetiza a trilha completa de um filme (música + efeitos) em WAV estéreo 16-bit, sem downloads.
// Lê <filme>/fonte/trilha.json: { "duracao": 15, "bpm": 120, "clima": "cobre"|"pb"|"sala", "deixas": [{ "t": 1.2, "som": "whoosh" }] }
// e grava <filme>/fonte/assets/trilha.wav. Determinístico: o mesmo arquivo a cada execução.
// Uso: node ferramentas/trilha.mjs cerra-ai-comercial [outro-filme ...]
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const SR = 44100;

function ruidoCom(semente) {
  let s = semente;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return (s / 4294967296) * 2 - 1;
  };
}

// Instrumentos: cada um devolve amostras mono a partir de t (segundos desde o ataque)
const ruidoKick = ruidoCom(11);
const kick = (t) => {
  const f = 48 + 110 * Math.exp(-t * 38);
  return (Math.sin(2 * Math.PI * f * t) * Math.exp(-t * 7) + ruidoKick() * Math.exp(-t * 400) * 0.25) * 0.95;
};
const ruidoHat = ruidoCom(23);
let hatHp = 0, hatPrev = 0;
const hat = (t) => {
  const n = ruidoHat();
  hatHp = 0.92 * (hatHp + n - hatPrev);
  hatPrev = n;
  return hatHp * Math.exp(-t * 55) * 0.22;
};
const ruidoClap = ruidoCom(37);
const clap = (t) => {
  const env = Math.exp(-t * 22) * (t < 0.03 ? 0.6 + 0.4 * Math.sin(t * 900) : 1);
  return ruidoClap() * env * 0.3;
};
const saw = (f, t) => 2 * ((f * t) % 1) - 1;
const baixo = (f) => (t) => {
  const env = Math.min(1, t / 0.005) * Math.exp(-t * 5);
  return (Math.sin(2 * Math.PI * f * t) * 0.7 + saw(f, t) * 0.18) * env * 0.55;
};
const pluck = (f) => (t) => {
  const env = Math.min(1, t / 0.003) * Math.exp(-t * 9);
  return (Math.sin(2 * Math.PI * f * t) + 0.35 * Math.sin(2 * Math.PI * f * 2 * t) + 0.12 * Math.sin(2 * Math.PI * f * 3 * t)) * env * 0.16;
};
const marimba = (f) => (t) => {
  const env = Math.min(1, t / 0.002) * Math.exp(-t * 7);
  return (Math.sin(2 * Math.PI * f * t) + 0.25 * Math.sin(2 * Math.PI * f * 4 * t) * Math.exp(-t * 30)) * env * 0.2;
};

// Efeitos
const ruidoFx = ruidoCom(1337);
const efeitos = {
  whoosh: { dur: 0.45, fn: (() => { let lp = 0, bp = 0; return (t, d) => {
    const env = Math.sin(Math.PI * Math.min(1, t / d)) ** 2;
    const corte = 0.02 + 0.2 * Math.sin(Math.PI * t / d);
    lp += corte * (ruidoFx() - lp); bp += corte * (lp - bp);
    return (lp - bp) * env * 2.4; }; })() },
  riser: { dur: 1.0, fn: (() => { let lp = 0; return (t, d) => {
    const x = t / d; const corte = 0.01 + 0.35 * x * x;
    lp += corte * (ruidoFx() - lp);
    return (ruidoFx() - lp) * x * x * 0.5; }; })() },
  impacto: { dur: 1.4, fn: (t) => {
    const f = 42 + 70 * Math.exp(-t * 18);
    return (Math.sin(2 * Math.PI * f * t) * Math.exp(-t * 2.6) + ruidoFx() * Math.exp(-t * 14) * 0.35) * 0.9; } },
  pop: { dur: 0.16, fn: (t) => {
    const f = 880 * Math.exp(-t * 22) + 260;
    return Math.sin(2 * Math.PI * f * t) * Math.exp(-t * 28) * 0.55; } },
  tique: { dur: 0.05, fn: (t) => Math.sin(2 * Math.PI * 2400 * t) * Math.exp(-t * 120) * 0.35 },
  brilho: { dur: 1.8, fn: (t) => {
    const notas = [1318.5, 1661.2, 1975.5, 2637];
    const env = Math.min(1, t / 0.03) * Math.exp(-t * 2.2);
    return notas.reduce((s, f, k) => s + Math.sin(2 * Math.PI * f * t + k) * (0.6 - k * 0.1), 0) * env * 0.14; } },
};

// Climas: padrão de bateria e harmonia por compasso (16 semicolcheias)
const CLIMAS = {
  // Cerra.AI comercial: eletrônico seco em lá menor, bumbo em todos os tempos
  cobre: {
    kick: [0, 4, 8, 12], hat: [2, 6, 10, 14], clap: [4, 12],
    baixo: [[0, 55], [3, 55], [6, 65.41], [8, 55], [11, 49], [14, 49]],
    pluck: [[0, 440], [2, 523.25], [4, 659.25], [6, 523.25], [8, 392], [10, 523.25], [12, 587.33], [14, 523.25]],
  },
  // Cerra.AI lançamento P&B: mínimo, pulso grave e tique
  pb: {
    kick: [0, 8], hat: [4, 12], clap: [],
    baixo: [[0, 41.2], [8, 41.2], [10, 49]],
    pluck: [[0, 659.25], [6, 493.88], [12, 587.33]],
  },
  // CerraClass: alegre em dó maior, palmas no 2 e no 4, marimba
  sala: {
    kick: [0, 6, 8, 11], hat: [2, 6, 10, 14], clap: [4, 12],
    baixo: [[0, 65.41], [6, 65.41], [8, 87.31], [11, 98], [14, 98]],
    marimba: [[0, 523.25], [3, 659.25], [6, 783.99], [8, 698.46], [10, 880], [12, 783.99], [14, 659.25]],
  },
};

export function renderizar(cfg) {
  const n = Math.round(cfg.duracao * SR);
  const musica = new Float32Array(n);
  const fx = new Float32Array(n);
  const clima = CLIMAS[cfg.clima];
  const semi = 60 / cfg.bpm / 4;
  const compasso = semi * 16;
  const soma = (buf, inicio, dur, fn, ganho = 1) => {
    const i0 = Math.round(inicio * SR);
    const len = Math.round(dur * SR);
    for (let i = 0; i < len && i0 + i < n; i++) if (i0 + i >= 0) buf[i0 + i] += fn(i / SR, dur) * ganho;
  };
  // Silêncio musical antes da entrada (ex.: a abertura com o ponto) e no final (logo)
  const entra = cfg.musicaEntra ?? 0;
  const sai = cfg.musicaSai ?? cfg.duracao;
  for (let c = 0; c * compasso < cfg.duracao; c++) {
    const base = c * compasso;
    const acorde = c % 4 === 3 ? 0.89 : 1; // leve mudança de altura no 4º compasso
    for (const s of clima.kick) soma(musica, base + s * semi, 0.5, kick);
    for (const s of clima.hat) soma(musica, base + s * semi, 0.12, hat);
    for (const s of clima.clap || []) soma(musica, base + s * semi, 0.25, clap);
    for (const [s, f] of clima.baixo) soma(musica, base + s * semi, 0.5, baixo(f * acorde));
    for (const [s, f] of clima.pluck || []) soma(musica, base + s * semi, 0.4, pluck(f * acorde));
    for (const [s, f] of clima.marimba || []) soma(musica, base + s * semi, 0.5, marimba(f * acorde));
  }
  // Recorta a música para a janela [entra, sai] com rampas curtas
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const g = Math.max(0, Math.min(1, (t - entra) / 0.05, (sai - t) / 0.6));
    musica[i] *= g;
  }
  for (const d of cfg.deixas) {
    const e = efeitos[d.som];
    if (!e) throw new Error(`som desconhecido: ${d.som}`);
    const inicio = d.som === "riser" ? d.t - e.dur : d.t; // o riser termina na deixa
    soma(fx, inicio, e.dur, e.fn, d.ganho ?? 1);
  }
  // Mix estéreo com leve abertura e limitador suave
  const out = Buffer.alloc(n * 4);
  let pico = 0;
  const l = new Float32Array(n), r = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const m = musica[i] * 0.8, f = fx[i];
    l[i] = Math.tanh((m + f * 0.95) * 1.1);
    r[i] = Math.tanh((m * 0.97 + f) * 1.1);
    pico = Math.max(pico, Math.abs(l[i]), Math.abs(r[i]));
  }
  const norm = 0.89 / pico; // pico em -1 dBFS
  for (let i = 0; i < n; i++) {
    out.writeInt16LE(Math.round(l[i] * norm * 32767), i * 4);
    out.writeInt16LE(Math.round(r[i] * norm * 32767), i * 4 + 2);
  }
  const cab = Buffer.alloc(44);
  cab.write("RIFF", 0); cab.writeUInt32LE(36 + out.length, 4); cab.write("WAVE", 8);
  cab.write("fmt ", 12); cab.writeUInt32LE(16, 16); cab.writeUInt16LE(1, 20); cab.writeUInt16LE(2, 22);
  cab.writeUInt32LE(SR, 24); cab.writeUInt32LE(SR * 4, 28); cab.writeUInt16LE(4, 32); cab.writeUInt16LE(16, 34);
  cab.write("data", 36); cab.writeUInt32LE(out.length, 40);
  return Buffer.concat([cab, out]);
}

const raiz = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
// Só roda como linha de comando; importado (ex.: animar-carrossel.mjs), expõe renderizar()
const comoCli = process.argv[1] && import.meta.url.endsWith(process.argv[1].replaceAll("\\", "/").split("/").pop());
for (const filme of comoCli ? process.argv.slice(2) : []) {
  const cfg = JSON.parse(readFileSync(join(raiz, filme, "fonte", "trilha.json"), "utf8"));
  mkdirSync(join(raiz, filme, "fonte", "assets"), { recursive: true });
  writeFileSync(join(raiz, filme, "fonte", "assets", "trilha.wav"), renderizar(cfg));
  console.log(`${filme}/fonte/assets/trilha.wav  ${cfg.duracao}s  ${cfg.bpm} BPM  ${cfg.deixas.length} efeitos`);
}
