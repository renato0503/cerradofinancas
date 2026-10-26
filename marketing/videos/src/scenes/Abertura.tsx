// Gancho (0–2,5s): a folinha brota e "Agora somos 4 frentes." entra em cima dela.
import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Lottie, LottieAnimationData } from "@remotion/lottie";
import entrada from "../../public/folinha-entrada.json";
import { Entrada, Palavras, SaidaCena } from "../components/Movimento";
import { clamp, theme } from "../theme";

export const ABERTURA = 75;

export const Abertura: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - 30, fps, config: theme.spring.bouncy });
  const brilho = interpolate(frame, [34, 50], [0, 1], { ...clamp, easing: theme.ease.out });

  return (
    <AbsoluteFill>
      <SaidaCena duracao={ABERTURA}>
        <AbsoluteFill style={{ alignItems: "center", paddingTop: 330, fontFamily: theme.fonts.display, color: theme.colors.text }}>
          <div style={{ width: 460, height: 460 }}>
            <Lottie animationData={entrada as unknown as LottieAnimationData} />
          </div>

          <Palavras
            texto="Agora somos"
            delay={18}
            gap={28}
            style={{ marginTop: 30, fontSize: 124, fontWeight: 900, letterSpacing: -4, lineHeight: 1.05, justifyContent: "center" }}
          />

          <div
            style={{
              fontSize: 156, fontWeight: 900, letterSpacing: -5, lineHeight: 1.05,
              color: theme.colors.primary,
              opacity: interpolate(pop, [0, 0.4], [0, 1], clamp),
              transform: `scale(${interpolate(pop, [0, 1], [0.7, 1])}) translateY(${interpolate(pop, [0, 1], [30, 0])}px)`,
              textShadow: `0 0 ${60 * brilho}px ${theme.colors.glow}, 0 0 ${120 * brilho}px rgba(254,203,0,0.2)`,
            }}
          >
            4 frentes.
          </div>

          <Entrada delay={46}>
            <p style={{ marginTop: 34, fontSize: 46, fontWeight: 500, color: theme.colors.textDim, textAlign: "center" }}>
              Um só parceiro para o seu negócio crescer.
            </p>
          </Entrada>
        </AbsoluteFill>
      </SaidaCena>
    </AbsoluteFill>
  );
};
