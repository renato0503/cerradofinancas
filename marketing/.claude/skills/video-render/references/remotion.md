# Remotion — quando e como

## Quando usar

- Composição em React/TSX que precisa de estado, mapas e componentes reutilizáveis.
- Legenda por palavra e séries com muitos episódios.
- Peça em que o time já tem componentes React.

Para peça única com 3D pesado, HyperFrames costuma ser mais direto.

## Estrutura mínima

```tsx
import { AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate } from "remotion";

export const Filme = ({ titulo }: { titulo: string }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: "#001f5c" }}>
      <h1 style={{ opacity: op, color: "#fff" }}>{titulo}</h1>
      <Audio src={staticFile("audio/voz.wav")} />
    </AbsoluteFill>
  );
};
```

```ts
import { Composition } from "remotion";
export const RemotionRoot = () => (
  <Composition id="Filme" component={Filme} durationInFrames={900} fps={30} width={1080} height={1920}
    defaultProps={{ titulo: "Cerrado" }} />
);
```

## Regras

- `useCurrentFrame()` sempre; nunca `Date.now()`.
- `staticFile()` para mídia; nada de URL remota no render.
- `interpolate` com `extrapolateRight: "clamp"` para não estourar.
- Áudio separado do visual; `kit.py normalizar` no arquivo final.
- Imagens com `Img` do Remotion para carregar antes do quadro.

## Render

```bash
npx remotion render Filme out/filme.mp4 --codec=h264 --crf=18
npx remotion still Filme out/quadro.png --frame=30
npx remotion render Filme out/filme.mp4 --props='{"titulo":"Cerra.AI"}'
```

## Legenda

- Gere SRT com `video-legendas` e importe via `@remotion/captions` ou parse próprio.
- Para karaokê, use os `words` do faster-whisper e destaque por `frame`.
- Fonte local via `@remotion/google-fonts` só se baixar; prefira `@fontsource`.

## Licença

Remotion é gratuito para pessoa física e empresas com até 3 funcionários; acima disso exige licença comercial.
Confirme a situação antes de usar em cliente. HyperFrames é Apache 2.0.
