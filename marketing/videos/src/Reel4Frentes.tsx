// Reel 1080×1920 do lançamento das 4 frentes (21s a 30fps).
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Calculator, Code, GraduationCap, HandCoins } from "@phosphor-icons/react";
import { BgMesh, Grade, Grain, Vignette } from "./components/Camadas";
import { Abertura, ABERTURA } from "./scenes/Abertura";
import { Frente, FRENTE, FrenteProps } from "./scenes/Frente";
import { Conectado, CONECTADO } from "./scenes/Conectado";
import { Cta, CTA } from "./scenes/Cta";
import { theme } from "./theme";

const FRENTES: FrenteProps[] = [
  {
    numero: "01", cor: theme.frentes.software, Icone: Code, kicker: "Cerrado Tech",
    titulo: "Fábrica de Software", descricao: "ERPs, CRMs, IA e dashboards construídos em torno do seu processo.",
    itens: ["ERPs e CRMs sob medida", "Inteligência Artificial", "Empresas e gestão pública"],
  },
  {
    numero: "02", cor: theme.frentes.contabil, Icone: Calculator, kicker: "Cerrado Contabilidade",
    titulo: "Contabilidade", descricao: "100% digital, para decidir com números reais.",
    itens: ["Abertura de CNPJ", "Gestão tributária", "BPO e controladoria"],
  },
  {
    numero: "03", cor: theme.frentes.credito, Icone: HandCoins, kicker: "Multi bancos",
    titulo: "Crédito", descricao: "Comparamos vários bancos para achar a melhor condição.",
    itens: ["Empréstimos e consignados", "Financiamentos", "Seguros e consórcios"], parceria: true,
  },
  {
    numero: "04", cor: theme.frentes.cursos, Icone: GraduationCap, kicker: "Cerraclass",
    titulo: "Cursos", descricao: "IA e tecnologia na prática, com quem constrói software.",
    itens: ["IA na Prática", "Turmas de até 10 pessoas", "Treinamento in company"],
  },
];

const INICIO_FRENTES = ABERTURA;
const INICIO_CONECTADO = INICIO_FRENTES + FRENTES.length * FRENTE;
const INICIO_CTA = INICIO_CONECTADO + CONECTADO;
export const REEL_DURACAO = INICIO_CTA + CTA;

const Som: React.FC<{ em: number; arquivo: string; volume?: number }> = ({ em, arquivo, volume = 0.7 }) => (
  <Sequence from={Math.max(0, em)} layout="none">
    <Audio src={staticFile(`sfx/${arquivo}`)} volume={volume} />
  </Sequence>
);

export const Reel4Frentes: React.FC = () => {
  const cortes = [0, ...FRENTES.map((_, i) => INICIO_FRENTES + i * FRENTE), INICIO_CONECTADO, INICIO_CTA];
  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.bg }}>
      <BgMesh />

      <Sequence durationInFrames={ABERTURA}>
        <Abertura />
      </Sequence>
      {FRENTES.map((f, i) => (
        <Sequence key={f.numero} from={INICIO_FRENTES + i * FRENTE} durationInFrames={FRENTE}>
          <Frente {...f} />
        </Sequence>
      ))}
      <Sequence from={INICIO_CONECTADO} durationInFrames={CONECTADO}>
        <Conectado />
      </Sequence>
      <Sequence from={INICIO_CTA} durationInFrames={CTA}>
        <Cta />
      </Sequence>

      <Grade />
      <Grain />
      <Vignette />

      {/* Trilha e efeitos: o som começa 2–3 quadros antes do impacto visual */}
      <Audio src={staticFile("sfx/pad.wav")} volume={0.22} />
      {cortes.map((c) => <Som key={`w${c}`} em={c - 3} arquivo="whoosh.wav" volume={0.55} />)}
      {FRENTES.map((_, i) => <Som key={`p${i}`} em={INICIO_FRENTES + i * FRENTE + 4} arquivo="pop.wav" volume={0.5} />)}
      <Som em={28} arquivo="bass.wav" />
      <Som em={INICIO_CONECTADO + 34} arquivo="bass.wav" volume={0.6} />
      <Som em={INICIO_CTA + 27} arquivo="shimmer.wav" volume={0.6} />
    </AbsoluteFill>
  );
};
