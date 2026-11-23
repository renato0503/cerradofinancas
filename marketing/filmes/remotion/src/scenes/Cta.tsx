// CTA (3,5s): pergunta, site em destaque (único brilho dourado) e WhatsApp. Calmo, sem saída:
// é o último quadro que fica na tela.
import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Globe, WhatsappLogo } from "@phosphor-icons/react";
import { Entrada, Palavras, useRespira } from "../components/Movimento";
import { clamp, theme } from "../theme";

export const CTA = 105;

export const Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pill = spring({ frame: frame - 30, fps, config: theme.spring.bouncy });
  const pulso = 0.6 + 0.4 * Math.sin(frame / 10);
  const { escala, flutua } = useRespira();

  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 380, fontFamily: theme.fonts.display, color: theme.colors.text }}>
      <Entrada mola="bouncy">
        <Img
          src={staticFile("folinha.png")}
          style={{ width: 260, transform: `scale(${escala}) translateY(${flutua}px)`, filter: "drop-shadow(0 26px 40px rgba(0,0,0,0.5))" }}
        />
      </Entrada>

      <Palavras
        texto="Por onde você quer começar?"
        delay={8}
        gap={26}
        style={{ marginTop: 60, fontSize: 112, fontWeight: 900, letterSpacing: -4, lineHeight: 1.05, justifyContent: "center", maxWidth: 940, textAlign: "center" }}
      />

      <div
        style={{
          marginTop: 80, display: "flex", alignItems: "center", gap: 20,
          background: theme.colors.primary, color: theme.colors.bgAlt,
          fontSize: 56, fontWeight: 800, padding: "34px 60px", borderRadius: 999,
          opacity: interpolate(pill, [0, 0.4], [0, 1], clamp),
          transform: `scale(${interpolate(pill, [0, 1], [0.6, 1])})`,
          boxShadow: `0 0 ${70 * pulso}px ${theme.colors.glow}, 0 0 ${140 * pulso}px rgba(254,203,0,0.2)`,
        }}
      >
        <Globe size={64} weight="bold" />
        cerradofinancas.com.br
      </div>

      <Entrada delay={44}>
        <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 16, fontSize: 48, fontWeight: 700, color: theme.colors.textDim }}>
          <WhatsappLogo size={56} weight="bold" color="#4ade80" />
          (67) 99351-5206
        </div>
      </Entrada>
    </AbsoluteFill>
  );
};
