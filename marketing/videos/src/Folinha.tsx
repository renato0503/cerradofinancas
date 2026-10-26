// Folinha animada: vinheta com a marca (vídeo), GIF em loop e versão com fundo transparente.
import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Lottie, LottieAnimationData } from "@remotion/lottie";
import entrada from "../public/folinha-entrada.json";
import loop from "../public/folinha-loop.json";
import { BgMesh, Grade, Grain, Vignette } from "./components/Camadas";
import { Entrada, Palavras } from "./components/Movimento";
import { clamp, theme } from "./theme";

export const INTRO_DURACAO = 120;

/** Vinheta 1080×1080: a folha brota, sobe e a marca aparece embaixo. */
export const FolinhaIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const sobe = interpolate(frame, [34, 58], [0, -170], { ...clamp, easing: theme.ease.inOut });
  const saida = interpolate(frame, [durationInFrames - 10, durationInFrames], [0, 1], { ...clamp, easing: theme.ease.in });

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.bg }}>
      <BgMesh />
      <AbsoluteFill
        style={{
          alignItems: "center", justifyContent: "center", fontFamily: theme.fonts.display, color: theme.colors.text,
          opacity: 1 - saida, transform: `scale(${1 - 0.04 * saida})`,
        }}
      >
        <div style={{ width: 560, height: 560, transform: `translateY(${sobe}px)` }}>
          {/* entrada (1,5s) e depois o loop, para a folha nunca ficar parada */}
          <Sequence durationInFrames={45} layout="none">
            <Lottie animationData={entrada as unknown as LottieAnimationData} />
          </Sequence>
          <Sequence from={45} layout="none">
            <Lottie animationData={loop as unknown as LottieAnimationData} loop />
          </Sequence>
        </div>
        <div style={{ position: "absolute", top: 660, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Palavras
            texto="Cerrado Finanças & Tech"
            delay={46}
            gap={22}
            style={{ fontSize: 84, fontWeight: 900, letterSpacing: -2.5, justifyContent: "center" }}
          />
          <Entrada delay={62} y={20}>
            <p
              style={{
                marginTop: 22, fontSize: 30, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase",
                color: theme.colors.primary, textAlign: "center", whiteSpace: "nowrap",
              }}
            >
              Software · Contabilidade · Crédito · Cursos
            </p>
          </Entrada>
        </div>
      </AbsoluteFill>
      <Grade />
      <Grain />
      <Vignette />
      <Sequence from={0} layout="none"><Audio src={staticFile("sfx/whoosh.wav")} volume={0.5} /></Sequence>
      <Sequence from={12} layout="none"><Audio src={staticFile("sfx/bass.wav")} volume={0.6} /></Sequence>
      <Sequence from={59} layout="none"><Audio src={staticFile("sfx/shimmer.wav")} volume={0.45} /></Sequence>
    </AbsoluteFill>
  );
};

/** Loop de 3s sobre o azul da marca (para GIF: WhatsApp, e-mail, apresentações). */
export const FolinhaLoopGif: React.FC = () => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(circle at 50% 40%, ${theme.colors.bgAlt} 0%, ${theme.colors.bg} 75%)`,
      alignItems: "center", justifyContent: "center",
    }}
  >
    <div style={{ width: "88%", height: "88%" }}>
      <Lottie animationData={loop as unknown as LottieAnimationData} loop />
    </div>
  </AbsoluteFill>
);

/** Loop de 3s com fundo transparente (WebM com alfa, para sobrepor em edições). */
export const FolinhaLoopAlpha: React.FC = () => (
  <AbsoluteFill>
    <Lottie animationData={loop as unknown as LottieAnimationData} loop />
  </AbsoluteFill>
);
