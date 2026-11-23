// Uma frente por cena (3s): número + ícone → título → descrição → itens em sequência → pausa → saída.
import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CheckCircle, IconProps } from "@phosphor-icons/react";
import { Entrada, Palavras, SaidaCena, useRespira } from "../components/Movimento";
import { clamp, theme } from "../theme";

export const FRENTE = 90;

export type FrenteProps = {
  numero: string;
  cor: string;
  Icone: React.ComponentType<IconProps>;
  kicker: string;
  titulo: string;
  descricao: string;
  itens: string[];
  parceria?: boolean;
};

export const Frente: React.FC<FrenteProps> = ({ numero, cor, Icone, kicker, titulo, descricao, itens, parceria }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const num = spring({ frame, fps, config: theme.spring.smooth });
  const icone = spring({ frame: frame - 6, fps, config: theme.spring.bouncy });
  const { escala, flutua } = useRespira();

  return (
    <AbsoluteFill>
      {/* brilho da cor da frente, entra com a cena */}
      <div
        style={{
          position: "absolute", width: 1200, height: 1200, borderRadius: "50%", top: -380, right: -460,
          background: `radial-gradient(circle, ${cor}40, transparent 60%)`, filter: "blur(40px)",
          opacity: interpolate(frame, [0, 20], [0, 1], { ...clamp, easing: theme.ease.out }),
        }}
      />
      <SaidaCena duracao={FRENTE}>
        <AbsoluteFill style={{ padding: "330px 90px 0", fontFamily: theme.fonts.display, color: theme.colors.text }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span
              style={{
                fontSize: 230, fontWeight: 900, lineHeight: 0.8, letterSpacing: -10,
                color: "transparent", WebkitTextStroke: `4px ${cor}`,
                opacity: interpolate(num, [0, 0.5], [0, 1], clamp),
                transform: `translateX(${interpolate(num, [0, 1], [-90, 0])}px)`,
              }}
            >
              {numero}
            </span>
            <div
              style={{
                width: 190, height: 190, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center",
                background: `${cor}29`, border: `4px solid ${cor}73`,
                opacity: interpolate(icone, [0, 0.4], [0, 1], clamp),
                transform: `scale(${interpolate(icone, [0, 1], [0.4, 1]) * escala}) rotate(${interpolate(icone, [0, 1], [-25, 0])}deg) translateY(${flutua}px)`,
              }}
            >
              <Icone size={112} color={cor} weight="duotone" />
            </div>
          </div>

          <Entrada delay={12} y={24}>
            <p style={{ marginTop: 110, fontSize: 32, fontWeight: 800, letterSpacing: 5, textTransform: "uppercase", color: cor }}>
              {kicker}
            </p>
          </Entrada>

          <Palavras
            texto={titulo}
            delay={16}
            gap={30}
            style={{ marginTop: 18, fontSize: 132, fontWeight: 900, letterSpacing: -4.5, lineHeight: 1.0 }}
          />

          <Entrada delay={28}>
            <p style={{ marginTop: 40, fontSize: 44, lineHeight: 1.4, color: theme.colors.textDim, maxWidth: 880 }}>{descricao}</p>
          </Entrada>

          <div style={{ marginTop: 56, display: "flex", flexDirection: "column", gap: 26 }}>
            {itens.map((item, i) => (
              <Entrada key={item} delay={36 + i * 5} y={30} mola="snappy">
                <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 44, fontWeight: 700 }}>
                  <CheckCircle size={48} color={cor} weight="bold" />
                  {item}
                </div>
              </Entrada>
            ))}
          </div>

          {parceria && (
            <Entrada delay={48}>
              <div style={{ marginTop: 56, display: "flex", alignItems: "center", gap: 28, fontSize: 32, color: theme.colors.textDim }}>
                <Img
                  src={staticFile("ls-logo.png")}
                  style={{
                    height: 130, borderRadius: 20, border: "2px solid rgba(254,203,0,0.35)",
                    transform: `scale(${interpolate(frame, [48, FRENTE], [1, 1.06], { ...clamp, easing: theme.ease.inOut })})`,
                  }}
                />
                <div>
                  Em parceria com
                  <div style={{ color: theme.colors.text, fontWeight: 800, fontSize: 38, marginTop: 4 }}>LS Intermediação Financeira</div>
                </div>
              </div>
            </Entrada>
          )}
        </AbsoluteFill>
      </SaidaCena>
    </AbsoluteFill>
  );
};
