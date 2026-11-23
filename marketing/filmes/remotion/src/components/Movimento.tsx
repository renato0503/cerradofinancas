// Entradas, saídas e revelação de texto. Sempre com mola ou curva, nunca linear.
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, theme } from "../theme";

type Mola = keyof typeof theme.spring;

/** Entrada premium: opacidade + subida + escala, juntas. */
export const Entrada: React.FC<{
  delay?: number;
  mola?: Mola;
  y?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ delay = 0, mola = "smooth", y = 40, style, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: theme.spring[mola] });
  return (
    <div
      style={{
        opacity: interpolate(p, [0, 0.6], [0, 1], clamp),
        transform: `translateY(${interpolate(p, [0, 1], [y, 0])}px) scale(${interpolate(p, [0, 1], [0.94, 1])})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Saída da cena: mais rápida que a entrada (10 quadros), sobe e some. */
export const SaidaCena: React.FC<{ duracao: number; children: React.ReactNode }> = ({ duracao, children }) => {
  const frame = useCurrentFrame();
  const ini = duracao - 10;
  const t = interpolate(frame, [ini, duracao], [0, 1], { ...clamp, easing: theme.ease.in });
  return (
    <div
      style={{
        position: "absolute", inset: 0,
        opacity: 1 - t,
        transform: `translateY(${-50 * t}px) scale(${1 - 0.03 * t})`,
        filter: `blur(${6 * t}px)`,
      }}
    >
      {children}
    </div>
  );
};

/** Revelação palavra por palavra, com gap em px (nunca em em perto de tipo grande). */
export const Palavras: React.FC<{
  texto: string;
  delay?: number;
  intervalo?: number;
  gap?: number;
  destaque?: string[];
  corDestaque?: string;
  style?: React.CSSProperties;
}> = ({ texto, delay = 0, intervalo = 3, gap = 22, destaque = [], corDestaque = theme.colors.primary, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "flex", flexWrap: "wrap", columnGap: gap, ...style }}>
      {texto.split(" ").map((palavra, i) => {
        const p = spring({ frame: frame - delay - i * intervalo, fps, config: theme.spring.snappy });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: interpolate(p, [0, 0.5], [0, 1], clamp),
              transform: `translateY(${interpolate(p, [0, 1], [36, 0])}px)`,
              color: destaque.includes(palavra) ? corDestaque : undefined,
            }}
          >
            {palavra}
          </span>
        );
      })}
    </div>
  );
};

/** Micro-movimento para o que fica mais de 2s na tela. */
export const useRespira = (amplitude = 1) => {
  const frame = useCurrentFrame();
  return {
    escala: 1 + Math.sin(frame / 22) * 0.015 * amplitude,
    flutua: Math.sin(frame / 30) * 4 * amplitude,
  };
};
