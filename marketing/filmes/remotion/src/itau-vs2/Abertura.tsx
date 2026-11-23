// Vinheta de abertura da apresentação Pipeline Global Estudos (12 s, sem áudio).
// Coreografia: as 69 esteiras sobem em onda, o tubo do pipeline se desenha, as 8 estações acendem uma a uma,
// os quatro grupos (medir, explicar, antecipar e simular, governar) aparecem palavra a palavra, a câmera recua
// e o título entra com blur in; as marcas Itaú e ICTi fecham com pop in. O último quadro casa com o slide 1.
import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { tema } from "./tema";

const W = 1920;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

function rng(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const r = rng(11);
const ALTURAS = Array.from({ length: 69 }, () => 70 + r() * 210);

// o tubo: uma onda suave atravessando a tela
const yTubo = (x: number) => 470 + 64 * Math.sin((x / W) * Math.PI * 2 * 1.1 + 0.5);
const PONTOS = Array.from({ length: 241 }, (_, i) => { const x = -40 + (i / 240) * (W + 80); return [x, yTubo(x)] as const; });
const CAMINHO = "M" + PONTOS.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L");
const COMPRIMENTO = PONTOS.reduce((s, p, i) => (i ? s + Math.hypot(p[0] - PONTOS[i - 1][0], p[1] - PONTOS[i - 1][1]) : 0), 0);
const NOS = Array.from({ length: 8 }, (_, i) => { const x = 250 + i * 203; return { x, y: yTubo(x) }; });
const GRUPOS = [
  { nome: "Medir", de: 0, ate: 1 },
  { nome: "Explicar", de: 2, ate: 4 },
  { nome: "Antecipar e simular", de: 5, ate: 6 },
  { nome: "Governar", de: 7, ate: 7 },
];

const Fundo: React.FC = () => {
  const f = useCurrentFrame();
  const a = Math.sin(f / 60) * 40;
  return (
    <AbsoluteFill style={{ background: tema.cor.noite }}>
      <AbsoluteFill style={{ background: `radial-gradient(1100px 700px at ${70 + a / 10}% 30%, ${tema.cor.noite2} 0%, transparent 70%)` }} />
      <AbsoluteFill style={{ background: `radial-gradient(900px 500px at ${20 - a / 12}% 90%, rgba(236,112,0,.13) 0%, transparent 70%)` }} />
    </AbsoluteFill>
  );
};

const Grao: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,.55) 100%)" }} />
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.07, mixBlendMode: "overlay" }}>
        <filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={f % 12} /></filter>
        <rect width="100%" height="100%" filter="url(#g)" />
      </svg>
    </AbsoluteFill>
  );
};

const Fontes: React.FC = () => (
  <style>{`
    @font-face { font-family: VS2Inter; src: url(${staticFile("fontes/inter-latin-wght-normal.woff2")}) format('woff2'); font-weight: 100 900; }
    @font-face { font-family: VS2Mono; src: url(${staticFile("fontes/jetbrains-mono-latin-700-normal.woff2")}) format('woff2'); font-weight: 700; }
  `}</style>
);

// palavra a palavra: opacidade + subida + blur
const Palavras: React.FC<{ texto: string; inicio: number; passo?: number; estilo?: React.CSSProperties; destaque?: number[] }> = ({ texto, inicio, passo = 4, estilo, destaque = [] }) => {
  const f = useCurrentFrame();
  return (
    <span style={estilo}>
      {texto.split(" ").map((p, i) => {
        const t = interpolate(f, [inicio + i * passo, inicio + i * passo + 18], [0, 1], { ...clamp, easing: tema.ease.out });
        return (
          <span key={i} style={{ display: "inline-block", marginRight: "0.26em", opacity: t, transform: `translateY(${(1 - t) * 40}px)`, filter: `blur(${(1 - t) * 12}px)`, color: destaque.includes(i) ? tema.cor.laranja : undefined }}>{p}</span>
        );
      })}
    </span>
  );
};

export const AberturaVS2: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = (seg: number) => Math.round(seg * fps);

  // recuo de câmera: o pipeline encolhe e desce para dar lugar ao título
  const recuo = interpolate(f, [s(6.6), s(8)], [0, 1], { ...clamp, easing: tema.ease.inOut });
  const desenho = interpolate(f, [s(0.4), s(2.6)], [0, 1], { ...clamp, easing: tema.ease.inOut });
  const pulso = ((f - s(2.6)) / s(2.2)) % 1;

  return (
    <AbsoluteFill style={{ fontFamily: tema.fonte.texto, color: tema.cor.branco }}>
      <Fontes />
      <Fundo />

      {/* mundo do pipeline */}
      <AbsoluteFill style={{ transform: `translateY(${recuo * 250}px) scale(${1 - recuo * 0.22})`, opacity: 1 - recuo * 0.55, transformOrigin: "50% 60%" }}>
        {/* as 69 esteiras */}
        <svg width={W} height={1080} style={{ position: "absolute", inset: 0 }}>
          {ALTURAS.map((h0, i) => {
            const sp = spring({ frame: f - i * 0.55, fps, config: tema.mola.macia });
            const h = h0 * sp * (1 + Math.sin(f / 22 + i * 0.7) * 0.025);
            const x = 66 + i * 26;
            return (
              <g key={i}>
                <rect x={x} y={1010 - h} width={18} height={h} rx={2} fill={tema.cor.vidro} stroke={tema.cor.vidroBorda} strokeWidth={1} />
                <rect x={x} y={1010 - h - 4} width={18} height={4} rx={1} fill={h0 > 220 ? tema.cor.laranja : h0 > 150 ? tema.cor.ouro : tema.cor.cinza} opacity={sp} />
              </g>
            );
          })}
          <line x1={0} x2={W} y1={1011} y2={1011} stroke="rgba(255,255,255,.18)" strokeWidth={2} />
        </svg>

        {/* o tubo */}
        <svg width={W} height={1080} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
          <defs>
            <filter id="brilho" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="9" /></filter>
          </defs>
          <path d={CAMINHO} fill="none" stroke={tema.cor.laranja} strokeWidth={22} strokeLinecap="round" opacity={0.35} filter="url(#brilho)" strokeDasharray={COMPRIMENTO} strokeDashoffset={COMPRIMENTO * (1 - desenho)} />
          <path d={CAMINHO} fill="none" stroke={tema.cor.laranja} strokeWidth={7} strokeLinecap="round" strokeDasharray={COMPRIMENTO} strokeDashoffset={COMPRIMENTO * (1 - desenho)} />
          {f > s(2.6) && [0, 0.5].map((k) => {
            const u = (pulso + k) % 1, x = -40 + u * (W + 80);
            return <circle key={k} cx={x} cy={yTubo(x)} r={9} fill="#fff4e6" filter="url(#brilho)" />;
          })}
          {NOS.map((n, i) => {
            const ini = s(2.3) + i * 7;
            const sp = spring({ frame: f - ini, fps, config: tema.mola.viva });
            const luz = interpolate(f, [ini, ini + 10, ini + 30], [0, 1.6, 1], clamp);
            return (
              <g key={i} transform={`translate(${n.x} ${n.y}) scale(${sp})`}>
                <circle r={34 * (1 + 0.04 * Math.sin(f / 10 + i))} fill={tema.cor.noite} stroke={tema.cor.laranja} strokeWidth={5} />
                <circle r={46} fill="none" stroke={tema.cor.laranja} strokeWidth={2} opacity={0.35 * luz} />
                <text y={10} textAnchor="middle" fontFamily={tema.fonte.mono} fontWeight={700} fontSize={27} fill={tema.cor.branco}>{String(i + 1).padStart(2, "0")}</text>
              </g>
            );
          })}
        </svg>

        {/* os quatro grupos */}
        {GRUPOS.map((g, i) => {
          const ini = s(3.6) + i * 9;
          const sai = interpolate(f, [s(6.3), s(6.65)], [1, 0], { ...clamp, easing: tema.ease.in });
          const x0 = NOS[g.de].x, x1 = NOS[g.ate].x;
          const t = interpolate(f, [ini, ini + 16], [0, 1], { ...clamp, easing: tema.ease.out });
          return (
            <div key={g.nome} style={{ position: "absolute", left: x0 - 60, width: x1 - x0 + 120, top: 250, textAlign: "center", opacity: sai }}>
              <div style={{ height: 3, background: tema.cor.laranja, transform: `scaleX(${t})`, transformOrigin: "left", marginBottom: 16 }} />
              <Palavras texto={g.nome.toUpperCase()} inicio={ini + 4} passo={3} estilo={{ fontFamily: tema.fonte.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.12em", color: tema.cor.ouro }} />
            </div>
          );
        })}
      </AbsoluteFill>

      {/* título e marcas */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", paddingBottom: 120 }}>
        <Marcas inicio={s(9)} />
        <div style={{ fontSize: 128, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, marginTop: 46 }}>
          <Palavras texto="Pipeline Global Estudos" inicio={s(7.4)} passo={5} destaque={[2]} />
        </div>
      </AbsoluteFill>

      <Grao />
    </AbsoluteFill>
  );
};

const Marcas: React.FC<{ inicio: number }> = ({ inicio }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = spring({ frame: f - inicio, fps, config: tema.mola.viva });
  const b = spring({ frame: f - inicio - 6, fps, config: tema.mola.viva });
  const linha = interpolate(f, [inicio + 3, inicio + 15], [0, 1], { ...clamp, easing: tema.ease.out });
  const resp = 1 + Math.sin(f / 18) * 0.012;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 34, height: 130 }}>
      <Img src={staticFile("img/itau.svg")} style={{ height: 124, width: 124, opacity: a, transform: `scale(${(0.6 + 0.4 * a) * resp}) translateY(${(1 - a) * 20}px)` }} />
      <div style={{ width: 2, height: 84, background: "rgba(255,255,255,.2)", transform: `scaleY(${linha})` }} />
      <div style={{ display: "flex", alignItems: "center", gap: 18, opacity: b, transform: `scale(${0.7 + 0.3 * b}) translateY(${(1 - b) * 20}px)` }}>
        <Img src={staticFile("img/icti.svg")} style={{ height: 86 }} />
        <div>
          <div style={{ fontSize: 58, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>ICTi</div>
          <div style={{ fontSize: 22, color: tema.cor.cinza, fontWeight: 500, marginTop: 6 }}>Instituto de Ciência e Tecnologia Itaú</div>
        </div>
      </div>
    </div>
  );
};
