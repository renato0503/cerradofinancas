// Vinheta de abertura da apresentação ICPO (12 s, sem áudio, tema claro).
// Coreografia: os 4 indicadores sobem como barras (stagger), deslizam e encolhem até o centro,
// viram um anel segmentado pelos pesos enquanto o contador vai a 0,685 (o exemplo do estudo),
// o anel sobe e encolhe, o título entra palavra a palavra e as marcas Itaú e ICTi fecham com pop in.
import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { tema } from "./tema";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const XS = [660, 860, 1060, 1260];
const BASE = 800, ALT = 380;
const CX = 960, CY = 470, R = 150, CIRC = 2 * Math.PI * R;
const CONTRIB = [0.28, 0.21, 0.12, 0.075];

const Fontes: React.FC = () => (
  <style>{`
    @font-face { font-family: ICPOInter; src: url(${staticFile("fontes/inter-latin-wght-normal.woff2")}) format('woff2'); font-weight: 100 900; }
    @font-face { font-family: ICPOMono; src: url(${staticFile("fontes/jetbrains-mono-latin-700-normal.woff2")}) format('woff2'); font-weight: 700; }
  `}</style>
);

const Fundo: React.FC = () => {
  const f = useCurrentFrame();
  const a = Math.sin(f / 70) * 4;
  return (
    <AbsoluteFill style={{ background: tema.cor.fundo }}>
      <AbsoluteFill style={{ background: `radial-gradient(900px 600px at ${78 + a}% 85%, #ffe4d1 0%, rgba(255,228,209,0) 70%)` }} />
      <AbsoluteFill style={{ background: `radial-gradient(700px 500px at ${15 - a}% 10%, #eef1f5 0%, rgba(238,241,245,0) 70%)` }} />
    </AbsoluteFill>
  );
};

const Grao: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, transparent 60%, rgba(29,39,50,.08) 100%)" }} />
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.05, mixBlendMode: "multiply" }}>
        <filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={f % 12} /></filter>
        <rect width="100%" height="100%" filter="url(#g)" />
      </svg>
    </AbsoluteFill>
  );
};

const Palavras: React.FC<{ texto: string; inicio: number; passo?: number; destaque?: number[] }> = ({ texto, inicio, passo = 4, destaque = [] }) => {
  const f = useCurrentFrame();
  return (
    <>
      {texto.split(" ").map((p, i) => {
        const t = interpolate(f, [inicio + i * passo, inicio + i * passo + 18], [0, 1], { ...clamp, easing: tema.ease.out });
        return <span key={i} style={{ display: "inline-block", marginRight: "0.26em", opacity: t, transform: `translateY(${(1 - t) * 36}px)`, filter: `blur(${(1 - t) * 10}px)`, color: destaque.includes(i) ? tema.cor.laranja : undefined }}>{p}</span>;
      })}
    </>
  );
};

export const AberturaICPO: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = (seg: number) => Math.round(seg * fps);

  const junta = interpolate(f, [s(2.6), s(4.2)], [0, 1], { ...clamp, easing: tema.ease.inOut }); // barras deslizam para o centro
  const anel = interpolate(f, [s(4.0), s(6.6)], [0, 1], { ...clamp, easing: tema.ease.out });
  const sobe = interpolate(f, [s(7.2), s(8.4)], [0, 1], { ...clamp, easing: tema.ease.inOut });
  const valor = 0.685 * anel;
  const sairBarras = interpolate(f, [s(3.6), s(4.4)], [1, 0], clamp);

  return (
    <AbsoluteFill style={{ fontFamily: tema.fonte.texto, color: tema.cor.tinta }}>
      <Fontes />
      <Fundo />

      {/* barras dos 4 indicadores e as curvas até o centro */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: 1 - sobe }}>
        <line x1={560} x2={1360} y1={BASE} y2={BASE} stroke="#b9c2cc" strokeWidth={2} opacity={Math.max(0, 1 - junta * 2)} />
        {tema.kpi.map((k, i) => {
          const sp = spring({ frame: f - 6 - i * 5, fps, config: tema.mola.macia });
          const h = ALT * k.h * sp * (1 - junta);
          const x = XS[i] + (CX - XS[i]) * junta;
          return (
            <g key={k.nome}>
              <rect x={x - 46 * (1 - junta * .6)} y={BASE - h - junta * (BASE - CY - 40)} width={92 * (1 - junta * .6)} height={h} rx={8} fill={k.cor} opacity={sairBarras} />
              <text x={XS[i]} y={BASE + 46} textAnchor="middle" fontSize={30} fontWeight={700} fill={tema.cor.tinta} opacity={sp * Math.max(0, 1 - junta * 3)}>{k.nome}</text>
              <text x={XS[i]} y={BASE - ALT * k.h * sp - 18} textAnchor="middle" fontSize={26} fontFamily={tema.fonte.mono} fontWeight={700} fill={tema.cor.cinza} opacity={sp * Math.max(0, 1 - junta * 3)}>{k.peso}</text>
            </g>
          );
        })}
      </svg>

      {/* o anel do ICPO: segmentos pelos pesos, contador até 0,685 */}
      <AbsoluteFill style={{ transform: `translateY(${-sobe * 235}px) scale(${1 - sobe * 0.5})`, transformOrigin: `${CX}px ${CY}px` }}>
        <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
          <circle cx={CX} cy={CY} r={R} fill="none" stroke={tema.cor.fio} strokeWidth={34} opacity={anel > 0 ? 1 : 0} />
          {CONTRIB.map((v, k) => {
            const ini = CONTRIB.slice(0, k).reduce((a, b) => a + b, 0);
            const vis = Math.max(0, Math.min(v, valor - ini));
            return <circle key={k} cx={CX} cy={CY} r={R} fill="none" stroke={tema.kpi[k].cor} strokeWidth={34} strokeDasharray={`${vis * CIRC} ${CIRC}`} strokeDashoffset={-ini * CIRC} transform={`rotate(-90 ${CX} ${CY})`} />;
          })}
          <circle cx={CX} cy={CY} r={R - 40} fill={tema.cor.papel} opacity={anel > 0 ? 1 : 0} style={{ filter: "drop-shadow(0 10px 24px rgba(29,39,50,.10))" }} />
          <text x={CX} y={CY - 18} textAnchor="middle" fontFamily={tema.fonte.mono} fontWeight={700} fontSize={26} fill={tema.cor.esc} opacity={anel}>ICPO</text>
          <text x={CX} y={CY + 42} textAnchor="middle" fontWeight={800} fontSize={68} fill={tema.cor.tinta} opacity={anel} style={{ fontVariantNumeric: "tabular-nums" }}>{valor.toFixed(3).replace(".", ",")}</text>
        </svg>
      </AbsoluteFill>

      {/* título e marcas */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", flexDirection: "column", paddingBottom: 170 }}>
        <div style={{ fontSize: 150, fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 1 }}>
          <Palavras texto="ICPO" inicio={s(7.8)} destaque={[0]} />
        </div>
        <div style={{ fontSize: 46, fontWeight: 600, color: tema.cor.cinza, marginTop: 20 }}>
          <Palavras texto="Índice Composto de Performance Operacional" inicio={s(8.3)} passo={3} />
        </div>
        <Marcas inicio={s(9.4)} />
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
  const resp = 1 + Math.sin(f / 18) * 0.012;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 30, marginTop: 50, height: 100 }}>
      <Img src={staticFile("img/itau.svg")} style={{ height: 92, width: 92, opacity: a, transform: `scale(${(0.6 + 0.4 * a) * resp})` }} />
      <div style={{ width: 2, height: 64, background: tema.cor.fio, opacity: a }} />
      <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: b, transform: `scale(${0.7 + 0.3 * b})` }}>
        <Img src={staticFile("img/icti.svg")} style={{ height: 64 }} />
        <div>
          <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>ICTi</div>
          <div style={{ fontSize: 19, color: tema.cor.cinza, fontWeight: 500, marginTop: 4 }}>Instituto de Ciência e Tecnologia Itaú</div>
        </div>
      </div>
    </div>
  );
};
