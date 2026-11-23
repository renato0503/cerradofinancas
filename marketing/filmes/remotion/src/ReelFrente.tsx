// Reel 1080×1920 de uma frente (15s a 30fps): gancho + 3 blocos + fechamento.
import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useVideoConfig } from "remotion";
import { CAMPANHAS } from "./campanhas";
import { BgMesh, Grade, Grain, Vignette } from "./components/Camadas";
import { BLOCO, CenaBloco, Fechamento, FECHAMENTO, Gancho, GANCHO } from "./scenes/CenasFrente";
import { clamp, theme } from "./theme";

export const REEL_FRENTE_DURACAO = GANCHO + 3 * BLOCO + FECHAMENTO;

const Som: React.FC<{ em: number; arquivo: string; volume?: number }> = ({ em, arquivo, volume = 0.7 }) => (
  <Sequence from={Math.max(0, em)} layout="none">
    <Audio src={staticFile(`sfx/${arquivo}`)} volume={volume} />
  </Sequence>
);

export const ReelFrente: React.FC<{ frente: keyof typeof CAMPANHAS }> = ({ frente }) => {
  const c = CAMPANHAS[frente];
  const { durationInFrames } = useVideoConfig();
  const inicioBloco = (i: number) => GANCHO + i * BLOCO;
  const inicioFechamento = GANCHO + 3 * BLOCO;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.bg }}>
      <BgMesh cor={c.cor} />

      <Sequence durationInFrames={GANCHO}>
        <Gancho c={c} />
      </Sequence>
      {c.blocos.map((b, i) => (
        <Sequence key={i} from={inicioBloco(i)} durationInFrames={BLOCO}>
          <CenaBloco b={b} cor={c.cor} />
        </Sequence>
      ))}
      <Sequence from={inicioFechamento} durationInFrames={FECHAMENTO}>
        <Fechamento c={c} />
      </Sequence>

      <Grade />
      <Grain />
      <Vignette />

      {/* trilha com fade de saída no fim do Reel; efeitos 2–3 quadros antes do impacto */}
      <Audio
        src={staticFile("sfx/pad.wav")}
        volume={(f) => interpolate(f, [durationInFrames - 40, durationInFrames], [0.22, 0], clamp)}
      />
      {[0, inicioBloco(0), inicioBloco(1), inicioBloco(2), inicioFechamento].map((c0) => (
        <Som key={c0} em={c0 - 3} arquivo="whoosh.wav" volume={0.55} />
      ))}
      <Som em={2} arquivo="pop.wav" volume={0.5} />
      <Som em={18} arquivo="bass.wav" volume={0.6} />
      <Som em={inicioFechamento + 23} arquivo="shimmer.wav" volume={0.6} />
    </AbsoluteFill>
  );
};
