// Sintetiza o kit de efeitos sonoros em WAV 16-bit, sem downloads (determinístico).
// Uso: npm run sfx  →  public/sfx/*.wav
import { writeFileSync, mkdirSync } from "node:fs";

const SR = 44100;
const pasta = new URL("../public/sfx/", import.meta.url);
mkdirSync(pasta, { recursive: true });

// Ruído pseudoaleatório com semente fixa: o mesmo som a cada execução
let semente = 1337;
const ruido = () => {
  semente = (semente * 1664525 + 1013904223) % 4294967296;
  return (semente / 4294967296) * 2 - 1;
};

function salvar(nome, amostras) {
  const dados = Buffer.alloc(amostras.length * 2);
  amostras.forEach((v, i) => dados.writeInt16LE(Math.round(Math.max(-1, Math.min(1, v)) * 32767), i * 2));
  const cab = Buffer.alloc(44);
  cab.write("RIFF", 0); cab.writeUInt32LE(36 + dados.length, 4); cab.write("WAVE", 8);
  cab.write("fmt ", 12); cab.writeUInt32LE(16, 16); cab.writeUInt16LE(1, 20); cab.writeUInt16LE(1, 22);
  cab.writeUInt32LE(SR, 24); cab.writeUInt32LE(SR * 2, 28); cab.writeUInt16LE(2, 32); cab.writeUInt16LE(16, 34);
  cab.write("data", 36); cab.writeUInt32LE(dados.length, 40);
  writeFileSync(new URL(nome, pasta), Buffer.concat([cab, dados]));
  console.log(`public/sfx/${nome}  ${(amostras.length / SR).toFixed(2)}s`);
}

const gerar = (seg, fn) => Array.from({ length: Math.round(seg * SR) }, (_, i) => fn(i / SR, seg));

// Whoosh: ruído passa-banda que sobe e desce, envelope em sino
{
  let lp = 0, bp = 0;
  salvar("whoosh.wav", gerar(0.45, (t, d) => {
    const env = Math.sin(Math.PI * Math.min(1, t / d)) ** 2;
    const corte = 0.02 + 0.18 * Math.sin(Math.PI * t / d);
    lp += corte * (ruido() - lp);
    bp += corte * (lp - bp);
    return (lp - bp) * env * 2.2;
  }));
}

// Pop: seno com queda de afinação, ataque curtíssimo
salvar("pop.wav", gerar(0.16, (t) => {
  const f = 880 * Math.exp(-t * 22) + 220;
  return Math.sin(2 * Math.PI * f * t) * Math.exp(-t * 28) * 0.7;
}));

// Batida grave: seno 55 Hz com clique inicial
salvar("bass.wav", gerar(0.9, (t) => {
  const f = 55 + 60 * Math.exp(-t * 30);
  return (Math.sin(2 * Math.PI * f * t) * Math.exp(-t * 4.5) + ruido() * Math.exp(-t * 300) * 0.3) * 0.9;
}));

// Brilho: acorde agudo com cauda longa, para o CTA
salvar("shimmer.wav", gerar(1.6, (t) => {
  const notas = [1318.5, 1661.2, 1975.5, 2637];
  const env = Math.min(1, t / 0.04) * Math.exp(-t * 2.4);
  return notas.reduce((s, f, k) => s + Math.sin(2 * Math.PI * f * t + k) * (0.6 - k * 0.1), 0) * env * 0.16;
}));

// Trilha: pad de senos levemente desafinados (Dó maior com nona), 22s, fade in/out
salvar("pad.wav", gerar(22, (t, d) => {
  const notas = [130.81, 196.0, 261.63, 329.63, 293.66];
  const env = Math.min(1, t / 2.5) * Math.min(1, (d - t) / 2.5);
  const tremolo = 0.85 + 0.15 * Math.sin(2 * Math.PI * 0.25 * t);
  const som = notas.reduce((s, f, k) =>
    s + Math.sin(2 * Math.PI * f * t) + Math.sin(2 * Math.PI * f * 1.003 * t + k), 0);
  return som / (notas.length * 2) * env * tremolo * 0.5;
}));
