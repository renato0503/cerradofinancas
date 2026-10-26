// Cenas genéricas dos Reels por frente, alimentadas por campanhas.ts.
import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import * as Phosphor from "@phosphor-icons/react";
import type { IconProps } from "@phosphor-icons/react";
import type { Bloco, Campanha } from "../campanhas";
import { Entrada, Palavras, SaidaCena, useRespira } from "../components/Movimento";
import { clamp, theme } from "../theme";

export const GANCHO = 75;
export const BLOCO = 90;
export const FECHAMENTO = 105;

const Icone: React.FC<{ nome: string } & IconProps> = ({ nome, ...props }) => {
  const C = (Phosphor as unknown as Record<string, React.ComponentType<IconProps>>)[nome];
  return C ? <C {...props} /> : null;
};

const corpo: React.CSSProperties = { fontFamily: theme.fonts.display, color: theme.colors.text };

const Kicker: React.FC<{ cor: string; texto: string; delay?: number }> = ({ cor, texto, delay = 0 }) => (
  <Entrada delay={delay} y={20} style={{ alignSelf: "flex-start" }}>
    <span
      style={{
        display: "inline-block", fontSize: 30, fontWeight: 800, letterSpacing: 4, textTransform: "uppercase",
        color: cor, background: `${cor}24`, border: `3px solid ${cor}66`, padding: "14px 28px", borderRadius: 999,
      }}
    >
      {texto}
    </span>
  </Entrada>
);

// ---------------------------------------------------------------- gancho

export const Gancho: React.FC<{ c: Campanha }> = ({ c }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tile = spring({ frame, fps, config: theme.spring.bouncy });
  const { escala, flutua } = useRespira();
  return (
    <AbsoluteFill>
      <SaidaCena duracao={GANCHO}>
        <AbsoluteFill style={{ ...corpo, alignItems: "center", paddingTop: 450, textAlign: "center" }}>
          <div
            style={{
              width: 200, height: 200, borderRadius: 54, display: "flex", alignItems: "center", justifyContent: "center",
              background: `${c.cor}29`, border: `4px solid ${c.cor}80`,
              opacity: interpolate(tile, [0, 0.4], [0, 1], clamp),
              transform: `scale(${interpolate(tile, [0, 1], [0.3, 1]) * escala}) rotate(${interpolate(tile, [0, 1], [-30, 0])}deg) translateY(${flutua}px)`,
            }}
          >
            <Icone nome={c.icone} size={120} color={c.cor} weight="duotone" />
          </div>
          <div style={{ marginTop: 50, display: "flex", justifyContent: "center" }}>
            <Kicker cor={c.cor} texto={c.kicker} delay={8} />
          </div>
          <Palavras
            texto={c.gancho}
            destaque={c.destaque}
            corDestaque={c.cor}
            delay={16}
            gap={26}
            style={{ marginTop: 44, fontSize: 112, fontWeight: 900, letterSpacing: -4, lineHeight: 1.04, justifyContent: "center", maxWidth: 940 }}
          />
          <Entrada delay={36}>
            <p style={{ marginTop: 36, fontSize: 46, color: theme.colors.textDim, maxWidth: 880 }}>{c.sub}</p>
          </Entrada>
          {c.parceriaLS && (
            <Entrada delay={44}>
              <div style={{ marginTop: 50, display: "flex", alignItems: "center", gap: 24, fontSize: 30, color: theme.colors.textDim, textAlign: "left" }}>
                <Img src={staticFile("ls-logo.png")} style={{ height: 110, borderRadius: 18, border: "2px solid rgba(254,203,0,0.35)" }} />
                <div>
                  Em parceria com
                  <div style={{ color: theme.colors.text, fontWeight: 800, fontSize: 36 }}>LS Intermediação Financeira</div>
                </div>
              </div>
            </Entrada>
          )}
        </AbsoluteFill>
      </SaidaCena>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- blocos

const Cabecalho: React.FC<{ cor: string; kicker: string; titulo: string }> = ({ cor, kicker, titulo }) => (
  <>
    <Kicker cor={cor} texto={kicker} />
    <Palavras texto={titulo} delay={6} gap={26} style={{ marginTop: 34, fontSize: 100, fontWeight: 900, letterSpacing: -3.5, lineHeight: 1.04 }} />
  </>
);

const cartao: React.CSSProperties = {
  background: theme.colors.surface, border: `2px solid ${theme.colors.surfaceBorder}`, borderRadius: 32,
};

const Lista: React.FC<{ b: Extract<Bloco, { tipo: "lista" }>; cor: string }> = ({ b, cor }) => (
  <div style={{ marginTop: 60, display: "flex", flexDirection: "column", gap: 24 }}>
    {b.itens.map((it, i) => (
      <Entrada key={it.titulo} delay={22 + i * 5} mola="snappy" y={34}>
        <div style={{ ...cartao, display: "flex", alignItems: "center", gap: 30, padding: "30px 36px" }}>
          <Icone nome={it.icone} size={72} color={cor} weight="duotone" />
          <div>
            <div style={{ fontSize: 44, fontWeight: 800 }}>{it.titulo}</div>
            {it.texto && <div style={{ fontSize: 32, color: theme.colors.textDim, marginTop: 4 }}>{it.texto}</div>}
          </div>
        </div>
      </Entrada>
    ))}
  </div>
);

const Passos: React.FC<{ b: Extract<Bloco, { tipo: "passos" }>; cor: string }> = ({ b, cor }) => (
  <div style={{ marginTop: 64, display: "flex", flexDirection: "column", gap: 34 }}>
    {b.passos.map((p, i) => (
      <Entrada key={p.titulo} delay={22 + i * 6} mola="snappy" y={34}>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <span
            style={{
              width: 104, height: 104, borderRadius: 30, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
              background: cor, color: theme.colors.bgAlt, fontSize: 52, fontWeight: 900,
            }}
          >
            {i + 1}
          </span>
          <div>
            <div style={{ fontSize: 48, fontWeight: 800 }}>{p.titulo}</div>
            <div style={{ fontSize: 34, color: theme.colors.textDim, marginTop: 4 }}>{p.texto}</div>
          </div>
        </div>
      </Entrada>
    ))}
  </div>
);

const Contraste: React.FC<{ b: Extract<Bloco, { tipo: "contraste" }>; cor: string }> = ({ b, cor }) => {
  const vermelho = "#fb7185";
  const coluna = (lado: "ruim" | "bom", inicio: number) => {
    const dados = b[lado];
    const c = lado === "ruim" ? vermelho : cor;
    return (
      <Entrada delay={inicio} style={{ flex: 1 }}>
        <div style={{ borderRadius: 32, padding: "40px 32px", background: `${c}14`, border: `3px solid ${c}66`, height: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 40, fontWeight: 900, color: c }}>
            <Icone nome={lado === "ruim" ? "XCircle" : "CheckCircle"} size={46} weight="bold" color={c} />
            {dados.rotulo}
          </div>
          <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 28 }}>
            {dados.itens.map((t, i) => (
              <Entrada key={t} delay={inicio + 6 + i * 5} y={20} mola="snappy">
                <div style={{ display: "flex", gap: 14, fontSize: 36, lineHeight: 1.3 }}>
                  <Icone nome={lado === "ruim" ? "X" : "Check"} size={40} weight="bold" color={c} style={{ flexShrink: 0, marginTop: 2 }} />
                  {t}
                </div>
              </Entrada>
            ))}
          </div>
        </div>
      </Entrada>
    );
  };
  return (
    <div style={{ marginTop: 64, display: "flex", gap: 24 }}>
      {coluna("ruim", 20)}
      {coluna("bom", 38)}
    </div>
  );
};

const Numeros: React.FC<{ b: Extract<Bloco, { tipo: "numeros" }>; cor: string }> = ({ b, cor }) => (
  <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
    {b.numeros.map((n, i) => (
      <Entrada key={n.valor} delay={22 + i * 5} mola="bouncy" y={30}>
        <div style={{ ...cartao, padding: "44px 36px" }}>
          <div style={{ fontSize: 112, fontWeight: 900, letterSpacing: -4, lineHeight: 1, color: cor }}>{n.valor}</div>
          <div style={{ fontSize: 36, color: theme.colors.textDim, marginTop: 14 }}>{n.legenda}</div>
        </div>
      </Entrada>
    ))}
  </div>
);

export const CenaBloco: React.FC<{ b: Bloco; cor: string }> = ({ b, cor }) => (
  <AbsoluteFill>
    <SaidaCena duracao={BLOCO}>
      <AbsoluteFill style={{ ...corpo, padding: "420px 90px 0", display: "flex", flexDirection: "column" }}>
        <Cabecalho cor={cor} kicker={b.kicker} titulo={b.titulo} />
        {b.tipo === "lista" && <Lista b={b} cor={cor} />}
        {b.tipo === "passos" && <Passos b={b} cor={cor} />}
        {b.tipo === "contraste" && <Contraste b={b} cor={cor} />}
        {b.tipo === "numeros" && <Numeros b={b} cor={cor} />}
      </AbsoluteFill>
    </SaidaCena>
  </AbsoluteFill>
);

// ---------------------------------------------------------------- fechamento (sem saída: é o último quadro)

export const Fechamento: React.FC<{ c: Campanha }> = ({ c }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pill = spring({ frame: frame - 26, fps, config: theme.spring.bouncy });
  const pulso = 0.6 + 0.4 * Math.sin(frame / 10);
  const { escala, flutua } = useRespira();
  const f = c.fechamento;
  return (
    <AbsoluteFill style={{ ...corpo, alignItems: "center", paddingTop: 440, textAlign: "center" }}>
      <Entrada mola="bouncy">
        <Img
          src={staticFile("folinha.png")}
          style={{ width: 240, transform: `scale(${escala}) translateY(${flutua}px)`, filter: "drop-shadow(0 26px 40px rgba(0,0,0,0.5))" }}
        />
      </Entrada>
      <Palavras
        texto={f.titulo}
        destaque={f.destaque}
        corDestaque={c.cor}
        delay={6}
        gap={26}
        style={{ marginTop: 56, fontSize: 104, fontWeight: 900, letterSpacing: -4, lineHeight: 1.04, justifyContent: "center", maxWidth: 960 }}
      />
      <div
        style={{
          marginTop: 70, display: "flex", alignItems: "center", gap: 18,
          background: theme.colors.primary, color: theme.colors.bgAlt, fontSize: 52, fontWeight: 800,
          padding: "32px 56px", borderRadius: 999,
          opacity: interpolate(pill, [0, 0.4], [0, 1], clamp),
          transform: `scale(${interpolate(pill, [0, 1], [0.6, 1])})`,
          boxShadow: `0 0 ${70 * pulso}px ${theme.colors.glow}, 0 0 ${140 * pulso}px rgba(254,203,0,0.2)`,
        }}
      >
        <Icone nome={f.principal.icone} size={60} weight="bold" />
        {f.principal.texto}
      </div>
      <Entrada delay={40}>
        <div style={{ marginTop: 36, display: "flex", alignItems: "center", gap: 14, fontSize: 42, fontWeight: 700, color: theme.colors.textDim }}>
          <Icone nome={f.secundario.icone} size={50} weight="bold" color={c.cor} />
          {f.secundario.texto}
        </div>
      </Entrada>
      {f.aviso && (
        <Entrada delay={48}>
          <p style={{ marginTop: 44, fontSize: 26, lineHeight: 1.45, color: "#94a3b8", maxWidth: 860 }}>{f.aviso}</p>
        </Entrada>
      )}
    </AbsoluteFill>
  );
};
