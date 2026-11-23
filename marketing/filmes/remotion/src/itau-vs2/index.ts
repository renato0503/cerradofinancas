// Entrada própria da vinheta Pipeline Global VS2 (Itaú/ICTi). Não usa o Root da Cerrado.
// Render: npx remotion render src/itau-vs2/index.ts AberturaVS2 <saida.mp4> --public-dir=<pasta da apresentação>
import { registerRoot } from "remotion";
import { RootVS2 } from "./Root";

registerRoot(RootVS2);
