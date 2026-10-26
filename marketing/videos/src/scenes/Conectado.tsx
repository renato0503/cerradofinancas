// Payoff (3s): as 4 frentes voam até a folinha e se ligam a ela. "Um só parceiro."
import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Calculator, Code, GraduationCap, HandCoins, IconProps } from "@phosphor-icons/react";
import { Entrada, Palavras, SaidaCena, useRespira } from "../components/Movimento";
import { clamp, theme } from "../theme";

export const CONECTADO = 90;

const CENTRO = { x: 540, y: 760 };
const NOS: { Icone: React.ComponentType<IconProps>; cor: string; nome: string; x: number; y: number }[] = [
  { Icone: Code, cor: theme.frentes.software, nome: "Software", x: 250, y: 470 },
  { Icone: Calculator, cor: theme.frentes.contabil, nome: "Contabilidade", x: 830, y: 470 },
  { Icone: HandCoins, cor: theme.frentes.credito, nome: "Crédito", x: 250, y: 1050 },
  { Icone: GraduationCap, cor: theme.frentes.cursos, nome: "Cursos", x: 830, y: 1050 },
];

export const Conectado: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const folha = spring({ frame, fps, config: theme.spring.bouncy });
  const { escala, flutua } = useRespira(1.4);

  return (
    <AbsoluteFill>
      <SaidaCena duracao={CONECTADO}>
        <AbsoluteFill style={{ fontFamily: theme.fonts.display, color: theme.colors.text }}>
          {/* linhas que ligam cada frente ao centro */}
          <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
            {NOS.map((n, i) => {
              const len = Math.hypot(n.x - CENTRO.x, n.y - CENTRO.y);
              const p = interpolate(frame, [16 + i * 4, 34 + i * 4], [0, 1], { ...clamp, easing: theme.ease.out });
              return (
                <line
                  key={n.nome}
                  x1={n.x} y1={n.y} x2={CENTRO.x} y2={CENTRO.y}
                  stroke={n.cor} strokeWidth={5} strokeLinecap="round" strokeOpacity={0.7}
                  strokeDasharray={len} strokeDashoffset={len * (1 - p)}
                />
              );
            })}
          </svg>

          {NOS.map((n, i) => {
            const p = spring({ frame: frame - 4 - i * 4, fps, config: theme.spring.snappy });
            const dx = (n.x - CENTRO.x) * 0.6;
            const dy = (n.y - CENTRO.y) * 0.6;
            return (
              <div
                key={n.nome}
                style={{
                  position: "absolute", left: n.x - 120, top: n.y - 120, width: 240, height: 240,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12,
                  borderRadius: 48, background: "rgba(0, 20, 60, 0.85)", border: `3px solid ${n.cor}80`,
                  opacity: interpolate(p, [0, 0.5], [0, 1], clamp),
                  transform: `translate(${interpolate(p, [0, 1], [dx, 0])}px, ${interpolate(p, [0, 1], [dy, 0]) + flutua * (i % 2 ? 1 : -1)}px) scale(${interpolate(p, [0, 1], [0.5, 1])})`,
                }}
              >
                <n.Icone size={96} color={n.cor} weight="duotone" />
                <span style={{ fontSize: 30, fontWeight: 800 }}>{n.nome}</span>
              </div>
            );
          })}

          <Img
            src={staticFile("folinha.png")}
            style={{
              position: "absolute", left: CENTRO.x - 170, top: CENTRO.y - 165, width: 340,
              opacity: interpolate(folha, [0, 0.4], [0, 1], clamp),
              transform: `scale(${interpolate(folha, [0, 1], [0.5, 1]) * escala}) translateY(${flutua}px)`,
              filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.55))",
            }}
          />

          <AbsoluteFill style={{ top: 1250, alignItems: "center" }}>
            <Palavras
              texto="Um só parceiro."
              destaque={["Um", "só"]}
              delay={36}
              gap={28}
              style={{ fontSize: 120, fontWeight: 900, letterSpacing: -4, justifyContent: "center" }}
            />
            <Entrada delay={48}>
              <p style={{ marginTop: 26, fontSize: 42, color: theme.colors.textDim, textAlign: "center", maxWidth: 860 }}>
                Tudo conectado: seus números, seu software, seu crédito e sua equipe.
              </p>
            </Entrada>
          </AbsoluteFill>
        </AbsoluteFill>
      </SaidaCena>
    </AbsoluteFill>
  );
};
