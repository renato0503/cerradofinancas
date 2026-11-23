import { Composition } from "remotion";
import { AberturaICPO } from "./Abertura";

export const RootICPO = () => (
  <Composition id="AberturaICPO" component={AberturaICPO} durationInFrames={360} fps={30} width={1920} height={1080} />
);
