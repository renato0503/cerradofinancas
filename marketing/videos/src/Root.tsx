import React from "react";
import { Composition } from "remotion";
import { Reel4Frentes, REEL_DURACAO } from "./Reel4Frentes";
import { FolinhaIntro, FolinhaLoopAlpha, FolinhaLoopGif, INTRO_DURACAO } from "./Folinha";
import { ReelFrente, REEL_FRENTE_DURACAO } from "./ReelFrente";
import { COMPOSICOES_CURSOS } from "./cursosCerraclass";

const FRENTES = [
  ["ReelSoftware", "software"],
  ["ReelContabilidade", "contabilidade"],
  ["ReelCredito", "credito"],
  ["ReelCursos", "cursos"],
  ["ReelIaNaPratica", "iaNaPratica"],
  ["ReelIaFarma", "iaFarma"],
  ...COMPOSICOES_CURSOS,
] as const;

export const Root: React.FC = () => (
  <>
    <Composition id="Reel4Frentes" component={Reel4Frentes} durationInFrames={REEL_DURACAO} fps={30} width={1080} height={1920} />
    <Composition id="FolinhaIntro" component={FolinhaIntro} durationInFrames={INTRO_DURACAO} fps={30} width={1080} height={1080} />
    <Composition id="FolinhaLoopGif" component={FolinhaLoopGif} durationInFrames={90} fps={30} width={480} height={480} />
    <Composition id="FolinhaLoopAlpha" component={FolinhaLoopAlpha} durationInFrames={90} fps={30} width={512} height={512} />
    {FRENTES.map(([id, frente]) => (
      <Composition
        key={id}
        id={id}
        component={ReelFrente}
        defaultProps={{ frente }}
        durationInFrames={REEL_FRENTE_DURACAO}
        fps={30}
        width={1080}
        height={1920}
      />
    ))}
  </>
);
