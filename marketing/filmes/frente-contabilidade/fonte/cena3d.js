// Cerrado Contabilidade · "Partida dobrada": o livro-razão em 3D. A câmera anda pelo papel pautado.
// 0-11 o razonete "T" sobe do papel e os lançamentos encaixam no lado "A gente cuida de"
// 11-17 a escada MEI → ME → EPP → Lucro Presumido cresce e a ficha sobe degrau a degrau
// 17-22,5 as barras das 4 fases sobem · 22,5-27 o carimbo bate "EM DIA" · 27 cortina tinta (DOM)
import { THREE, V, K, prog, criarPalco, luzes, ambiente, textura, caixaArredondada, carregarFontes, rodar } from "./palco3d.js";

const PAPEL = "#f1f6f0", PAUTA = "#cfe0d4", TINTA = "#0c3b2e", CLARO = "#d8efdf", VERMELHO = "#d23a2c";
const PI = Math.PI;

rodar(async () => {
  await carregarFontes(["700 80px 'Plex Cond'", "600 30px 'Plex Mono'", "500 30px 'Plex Cond'"]);
  const P = criarPalco({ fundo: PAPEL, fov: V ? 44 : 30, tom: false });
  const { cena, renderer } = P;
  await ambiente(renderer, cena, 0.5);
  luzes(cena, { chave: "#ffffff", recorte: "#e6fff0", ceu: "#ffffff", chao: "#6f8a7c", forca: 0.85, sombra: 9 });

  // o papel pautado (cor exata, sem luz) e a margem vermelha
  const pauta = textura(256, 256, (ctx, w, h) => { ctx.fillStyle = PAPEL; ctx.fillRect(0, 0, w, h); ctx.fillStyle = PAUTA; ctx.fillRect(0, h - 10, w, 10); });
  pauta.tex.wrapS = pauta.tex.wrapT = THREE.RepeatWrapping; pauta.tex.repeat.set(1, 120);
  const chao = new THREE.Mesh(new THREE.PlaneGeometry(120, 80), new THREE.MeshBasicMaterial({ map: pauta.tex }));
  chao.rotation.x = -PI / 2; chao.position.x = 10; cena.add(chao);
  const margem = new THREE.Mesh(new THREE.PlaneGeometry(0.06, 80), new THREE.MeshBasicMaterial({ color: VERMELHO }));
  margem.rotation.x = -PI / 2; margem.position.set(-4.2, 0.003, 0); cena.add(margem);
  const sombra = new THREE.Mesh(new THREE.PlaneGeometry(120, 80), new THREE.ShadowMaterial({ color: "#0c3b2e", opacity: 0.22 }));
  sombra.rotation.x = -PI / 2; sombra.position.set(10, 0.004, 0); sombra.receiveShadow = true; cena.add(sombra);
  const lit = (o) => { o.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); return o; };

  const matTinta = new THREE.MeshStandardMaterial({ color: TINTA, roughness: 0.5, metalness: 0.05 });
  const matClaro = new THREE.MeshStandardMaterial({ color: CLARO, roughness: 0.6 });

  // ---- o razonete: o "T" do contador, deitado no papel e em relevo ----
  const razonete = new THREE.Group(); cena.add(razonete);
  const barraT = lit(new THREE.Mesh(caixaArredondada(5.2, 0.2, 0.3, 0.06, 0.02), matTinta));
  barraT.position.set(0, 0.15, -1.6); razonete.add(barraT);
  const hasteT = lit(new THREE.Mesh(caixaArredondada(0.2, 4.0, 0.3, 0.06, 0.02), matTinta));
  hasteT.rotation.x = -PI / 2; hasteT.position.set(0, 0.15, 0.4); razonete.add(hasteT);
  function etiqueta(txt, cor, larg = 1024, alt = 160, tam = 84) {
    return textura(larg, alt, (ctx, w, h) => { ctx.fillStyle = cor; ctx.font = `700 ${tam}px 'Plex Cond'`; ctx.textBaseline = "middle"; ctx.textAlign = "center"; ctx.fillText(txt, w / 2, h / 2); });
  }
  // os títulos das duas colunas: placas de mesa que se levantam em cima da barra do T
  const PL_W = 2.45, PL_H = 0.74;
  function placa(txt, fundo, letra, x) {
    const tx = textura(1024, 310, (ctx, w, h) => {
      ctx.fillStyle = fundo; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = letra; ctx.globalAlpha = 0.35; ctx.lineWidth = 6; ctx.strokeRect(22, 22, w - 44, h - 44); ctx.globalAlpha = 1;
      ctx.fillStyle = letra; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      let tam = 150; ctx.font = `700 ${tam}px 'Plex Cond'`;
      while (ctx.measureText(txt).width > w - 110) { tam -= 4; ctx.font = `700 ${tam}px 'Plex Cond'`; }
      ctx.fillText(txt, w / 2, h / 2 + 6);
    });
    const lado = new THREE.MeshStandardMaterial({ color: fundo, roughness: 0.55, transparent: true });
    const frente = new THREE.MeshStandardMaterial({ map: tx.tex, roughness: 0.6, transparent: true });
    const m = lit(new THREE.Mesh(new THREE.BoxGeometry(PL_W, PL_H, 0.07), [lado, lado, lado, lado, frente, lado]));
    m.geometry.translate(0, PL_H / 2, 0); // gira pela aresta de baixo, como placa de mesa
    const g = new THREE.Group(); g.position.set(x, 0.3, -1.6); g.add(m); razonete.add(g);
    return { g, mats: [lado, frente] };
  }
  const rotEsq = placa("Você cuida de", VERMELHO, "#fff6f2", -1.33);
  const rotDir = placa("A gente cuida de", TINTA, PAPEL, 1.33);
  // os lançamentos: tiras de papel que deslizam para o lado direito
  const ITENS = ["Abertura de CNPJ", "Gestão tributária", "Folha e eSocial", "Suporte humano"];
  const tiras = ITENS.map((txt, i) => {
    const tx = textura(1024, 200, (ctx, w, h) => {
      ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = TINTA; let tam = 98; ctx.font = `700 ${tam}px 'Plex Cond'`;
      while (ctx.measureText(txt).width > w - 262 - 36 - 34) { tam -= 2; ctx.font = `700 ${tam}px 'Plex Cond'`; } // nunca encosta no "em dia"
      ctx.textBaseline = "middle"; ctx.fillText(txt, 36, h / 2 + 4);
      ctx.fillStyle = CLARO; ctx.fillRect(w - 262, 40, 236, 120); ctx.fillStyle = TINTA; ctx.font = "600 56px 'Plex Mono'"; ctx.textAlign = "center"; ctx.fillText("em dia", w - 144, h / 2 + 2);
    });
    const lado = matClaro.clone(); lado.transparent = true;
    const face = new THREE.MeshStandardMaterial({ map: tx.tex, roughness: 0.8, transparent: true });
    const m = lit(new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.05, 0.5), [lado, lado, face, lado, lado, lado]));
    cena.add(m);
    return { m, mats: [lado, face], t0: 6.0 + i * 0.55, z: -1.15 + i * 0.62 };
  });
  // a dor do lado esquerdo: o que fica só com você (traços vermelhos que somem quando a gente assume)
  const dores = [0, 1, 2, 3].map((i) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 0.07), new THREE.MeshBasicMaterial({ color: VERMELHO }));
    m.rotation.x = -PI / 2; m.position.set(-1.35, 0.012, -1.15 + i * 0.62); cena.add(m); return m;
  });

  // ---- a escada do crescimento ----
  const X2 = 8;
  const DEGRAUS = ["MEI", "ME", "EPP", "Lucro Presumido"];
  const degraus = DEGRAUS.map((txt, i) => {
    const alt = 0.45 * (i + 1);
    const g = new THREE.Group();
    const corpoG = new THREE.Group();
    const c = lit(new THREE.Mesh(caixaArredondada(1.5, 1.6, 1, 0.08, 0.03), i === 3 ? matTinta : matClaro));
    c.rotation.x = -PI / 2; corpoG.add(c); g.add(corpoG);
    const tx = textura(512, 520, (ctx, w, h) => {
      ctx.fillStyle = i === 3 ? TINTA : "#ffffff"; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = i === 3 ? PAPEL : TINTA; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      let tam = 150; ctx.font = `700 ${tam}px 'Plex Cond'`;
      // o texto fica na metade da frente do degrau; a ficha pula pela metade de trás (nunca em cima das letras)
      if (txt.length > 4) { ctx.font = "700 92px 'Plex Cond'"; ctx.fillText("Lucro", w / 2, h * 0.6); ctx.fillText("Presumido", w / 2, h * 0.6 + 100); }
      else ctx.fillText(txt, w / 2, h * 0.7);
    });
    const topo = new THREE.Mesh(new THREE.PlaneGeometry(1.42, 1.52), new THREE.MeshStandardMaterial({ map: tx.tex, roughness: 0.7, transparent: true }));
    topo.rotation.x = -PI / 2; g.add(topo);
    g.position.set(X2 - 2.25 + i * 1.5, 0, 0); cena.add(g);
    return { g, corpoG, topo, alt, t0: 11.6 + i * 0.5 };
  });
  const ficha = lit(new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.14, 40), new THREE.MeshStandardMaterial({ color: VERMELHO, roughness: 0.4 })));
  cena.add(ficha);

  // ---- as barras das 4 fases ----
  const X3 = 15.5;
  const ALT_B = [0.8, 1.5, 2.3, 3.2];
  const barras = ALT_B.map((a, i) => {
    const g = new THREE.Group();
    const m = lit(new THREE.Mesh(caixaArredondada(0.9, 0.9, 1, 0.08, 0.03), i === 3 ? matTinta : new THREE.MeshStandardMaterial({ color: ["#9fd2b0", "#6fb88a", "#3f8f62"][i], roughness: 0.55 })));
    m.rotation.x = -PI / 2; g.add(m);
    g.position.set(X3 - 1.8 + i * 1.2, 0, 0); cena.add(g);
    return { g, a, t0: 17.9 + i * 0.6 };
  });
  const numTx = [1, 2, 3, 4].map((n) => etiqueta(String(n), TINTA, 256, 256, 160));
  const nums = numTx.map((tx, i) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.7), new THREE.MeshBasicMaterial({ map: tx.tex, transparent: true })); m.rotation.x = -PI / 2; m.position.set(X3 - 1.8 + i * 1.2, 0.01, 1.0); cena.add(m); return m; });

  // ---- o carimbo EM DIA ----
  const X4 = 22.5;
  const carimbo = new THREE.Group(); cena.add(carimbo);
  const madeira = new THREE.MeshStandardMaterial({ color: "#7a4b2a", roughness: 0.6 });
  const cabo = lit(new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.3, 1.1, 32), madeira)); cabo.position.y = 1.0; carimbo.add(cabo);
  const bola = lit(new THREE.Mesh(new THREE.SphereGeometry(0.42, 32, 16), madeira)); bola.position.y = 1.7; carimbo.add(bola);
  const sapata = lit(new THREE.Mesh(caixaArredondada(2.6, 1.2, 0.36, 0.08, 0.03), madeira)); sapata.rotation.x = -PI / 2; sapata.position.y = 0.32; carimbo.add(sapata);
  const borracha = lit(new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.1, 1.0), new THREE.MeshStandardMaterial({ color: VERMELHO, roughness: 0.8 }))); borracha.position.y = 0.08; carimbo.add(borracha);
  const marcaTx = textura(1024, 440, (ctx, w, h) => {
    ctx.strokeStyle = VERMELHO; ctx.lineWidth = 22; ctx.strokeRect(30, 30, w - 60, h - 60);
    ctx.lineWidth = 6; ctx.strokeRect(62, 62, w - 124, h - 124);
    ctx.fillStyle = VERMELHO; ctx.font = "700 220px 'Plex Cond'"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("EM DIA", w / 2, h / 2 + 10);
  });
  const marca = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.03), new THREE.MeshBasicMaterial({ map: marcaTx.tex, transparent: true, opacity: 0 }));
  marca.rotation.x = -PI / 2; marca.rotation.z = 0.12; marca.position.set(X4, 0.012, 0.3); cena.add(marca);

  const CAM = [
    [0, [0, 9.5, 3.2]], [4.6, [2.6, 6.6, 6.4], "power2.inOut"], [10.6, [3.2, 6.0, 6.0], "none"],
    [11.6, [X2 + 3.4, 6.2, 10.6], "power3.inOut"], [16.6, [X2 + 4.2, 5.8, 9.8], "none"],
    [17.6, [X3 + 3.6, 5.4, 10.4], "power3.inOut"], [22.2, [X3 + 4.2, 5.0, 9.6], "none"],
    [23.0, [X4 + 2.6, 5.4, 6.4], "power3.inOut"], [27, [X4 + 3.2, 5.0, 5.8], "none"], [32, [X4 + 3.4, 5.0, 5.6], "none"],
  ];
  const ALVO = [[0, [0, 0, -0.1]], [10.6, [0, 0, -0.1]], [11.6, [X2, 0.8, 0]], [16.6, [X2, 0.8, 0]], [17.6, [X3, 1.4, 0]], [22.2, [X3, 1.4, 0]], [23.0, [X4, 0.5, 0.2]], [32, [X4, 0.5, 0.2]]];
  const DIST = V ? 1.3 : 1;
  const AFASTA = [[0, V ? 1.22 : 1.2], [10.6, V ? 1.22 : 1.2], [11.6, 1, "power3.inOut"]];

  // janela de cada trecho: o texto 3D some antes de a câmera sair (nenhum letreiro fica cortado no canto do quadro)
  const some = (t, fim) => 1 - prog(t, fim - 0.9, fim - 0.4, "power1.in");

  return function desenhar(t) {
    // o razonete sobe do papel
    const r = prog(t, 0.4, 1.6, "power3.out");
    razonete.position.y = -0.35 * (1 - r);
    // as placas se levantam (a da direita logo depois) e somem antes de a câmera sair
    [rotEsq, rotDir].forEach((pl, i) => {
      const u = prog(t, 1.3 + i * 0.35, 2.2 + i * 0.35, "back.out(1.8)");
      pl.g.rotation.x = -PI / 2 + (PI / 2 - 0.3) * u;
      pl.g.visible = u > 0;
      const o = some(t, 11.6); pl.mats.forEach((x) => (x.opacity = o));
    });
    dores.forEach((d, i) => { const a = prog(t, 2.0 + i * 0.15, 2.4 + i * 0.15, "power2.out"); const s = prog(t, 6.2 + i * 0.55, 6.6 + i * 0.55, "power2.in"); d.scale.x = Math.max(0.001, a * (1 - s)); d.visible = a * (1 - s) > 0; });
    for (const tr of tiras) {
      const u = prog(t, tr.t0, tr.t0 + 0.6, "power3.out");
      tr.m.visible = u > 0;
      tr.m.position.set(1.4 + 3.5 * (1 - u), 0.03 + 0.6 * Math.sin(u * PI) * (1 - u), tr.z);
      tr.m.rotation.y = 0.3 * (1 - u);
      const o = some(t, 11.6); tr.mats.forEach((x) => (x.opacity = o)); tr.m.castShadow = o > 0.5;
    }
    // a escada
    for (const d of degraus) {
      const u = prog(t, d.t0, d.t0 + 0.6, "power3.out");
      const h = Math.max(0.01, d.alt * u);
      d.corpoG.scale.z = 1; d.corpoG.children[0].scale.z = h; d.corpoG.position.y = h / 2;
      d.topo.position.y = h + 0.003;
      d.topo.material.opacity = some(t, 17.6);
    }
    // a ficha sobe degrau a degrau (cada pulo é um arco)
    let fx = X2 - 2.25, fy = 0.45 + 0.07;
    for (let i = 0; i < 4; i++) {
      const p = prog(t, 13.8 + i * 0.6, 14.3 + i * 0.6, "power2.inOut");
      if (i === 0) { fx = X2 - 2.25; fy = degraus[0].alt * prog(t, 11.6, 12.2, "power3.out") + 0.07; }
      if (p > 0 && i > 0) { fx = X2 - 2.25 + (i - 1 + p) * 1.5; fy = degraus[i - 1].alt + (degraus[i].alt - degraus[i - 1].alt) * p + Math.sin(p * PI) * 0.5 + 0.07; }
    }
    ficha.position.set(fx, fy, -0.42); ficha.visible = t > 11.6;
    // as barras
    for (const b of barras) {
      const u = prog(t, b.t0, b.t0 + 0.7, "power3.out");
      const h = Math.max(0.01, b.a * u);
      b.g.children[0].scale.z = h; b.g.position.y = h / 2;
    }
    nums.forEach((n, i) => (n.material.opacity = prog(t, barras[i].t0, barras[i].t0 + 0.3) * some(t, 23.0)));
    // o carimbo desce, bate e sobe; a marca fica no papel
    const desce = prog(t, 23.4, 24.0, "power4.in");
    const sobe = prog(t, 24.25, 25.0, "power3.out");
    carimbo.position.set(X4, 3.2 * (1 - desce) + 2.2 * sobe, 0.3);
    carimbo.rotation.y = 0.12;
    marca.material.opacity = t >= 24.0 ? 0.92 : 0;

    const p = K(t, CAM), a = K(t, ALVO), D = DIST * K(t, AFASTA);
    P.olhar([a[0] + (p[0] - a[0]) * D, a[1] + (p[1] - a[1]) * D, a[2] + (p[2] - a[2]) * D], a);
    if (V) P.enquadrar(0, -0.26); else P.enquadrar(0.21, 0);
    P.render();
  };
});
