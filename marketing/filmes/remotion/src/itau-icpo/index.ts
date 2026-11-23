// Entrada própria da vinheta ICPO (Itaú/ICTi). Não usa o Root da Cerrado.
// Render: npx remotion render src/itau-icpo/index.ts AberturaICPO <saida.mp4> --public-dir=<pasta da apresentação>
import { registerRoot } from "remotion";
import { RootICPO } from "./Root";

registerRoot(RootICPO);
