import { Composition } from "remotion";
import { AberturaVS2 } from "./Abertura";

export const RootVS2 = () => (
  <Composition id="AberturaVS2" component={AberturaVS2} durationInFrames={360} fps={30} width={1920} height={1080} />
);
