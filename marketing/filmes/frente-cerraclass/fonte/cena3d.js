// CerraClass · "Sábado de sala": a sala com as 10 cadeiras da turma.
// 0-5 a primeira cadeira cai · 5-11 as outras nove entram uma a uma (com a contagem até 10 no texto)
// 11-19 o chão bate na cor de cada um dos 11 cursos · 19-24 o ingresso sobe sobre a turma
// 24-27,5 a câmera desce até a primeira fila · 27,5 cortina tinta (DOM)
import { THREE, V, K, prog, criarPalco, luzes, ambiente, textura, caixaArredondada, carregarFontes, rodar } from "./palco3d.js";

const AMARELO = "#ffc83d", TINTA = "#141414", PAPEL = "#ffffff";
const PI = Math.PI;

rodar(async () => {
  await carregarFontes(["800 80px 'Bricolage Grotesque'", "600 30px 'Bricolage Grotesque'"]);
  const P = criarPalco({ fundo: AMARELO, fov: V ? 44 : 30, tom: false });
  const { cena, renderer } = P;
  await ambiente(renderer, cena, 0.45);
  const L = luzes(cena, { chave: "#ffffff", recorte: "#ffffff", ceu: "#ffffff", chao: "#806010", forca: 0.8, sombra: 9 });
  L.chave.shadow.radius = 2; // sombra chapada, de pôster

  // chão na cor exata da marca (sem luz) e, por cima, um plano que só recebe a sombra chapada
  const matChao = new THREE.MeshBasicMaterial({ color: AMARELO });
  const chao = new THREE.Mesh(new THREE.PlaneGeometry(90, 90), matChao);
  chao.rotation.x = -PI / 2; cena.add(chao);
  const sombra = new THREE.Mesh(new THREE.PlaneGeometry(90, 90), new THREE.ShadowMaterial({ color: "#7a4a00", opacity: 0.35 }));
  sombra.rotation.x = -PI / 2; sombra.position.y = 0.002; sombra.receiveShadow = true; cena.add(sombra);

  // a cadeira escolar: assento, encosto, quatro pernas e a prancheta à direita
  const matCad = new THREE.MeshStandardMaterial({ color: TINTA, roughness: 0.45, metalness: 0.05 });
  const matPerna = new THREE.MeshStandardMaterial({ color: "#3a3a3a", roughness: 0.3, metalness: 0.7 });
  function cadeira() {
    const g = new THREE.Group();
    const assento = new THREE.Mesh(caixaArredondada(0.86, 0.8, 0.08, 0.12, 0.025), matCad);
    assento.rotation.x = -PI / 2; assento.position.y = 0.82; g.add(assento);
    const encosto = new THREE.Mesh(caixaArredondada(0.86, 0.5, 0.07, 0.14, 0.025), matCad);
    encosto.position.set(0, 1.42, -0.38); encosto.rotation.x = -0.12; g.add(encosto);
    for (const sx of [-1, 1]) {
      const haste = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.7, 10), matPerna);
      haste.position.set(sx * 0.36, 1.12, -0.37); g.add(haste);
      for (const sz of [-1, 1]) {
        const p = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.8, 10), matPerna);
        p.position.set(sx * 0.36, 0.4, sz * 0.33); g.add(p);
      }
    }
    const prancheta = new THREE.Mesh(caixaArredondada(0.5, 0.62, 0.05, 0.12, 0.02), matCad);
    prancheta.rotation.x = -PI / 2; prancheta.position.set(0.58, 1.12, 0.12); g.add(prancheta);
    const suporte = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.32, 8), matPerna);
    suporte.position.set(0.5, 0.96, 0.12); g.add(suporte);
    g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    cena.add(g);
    return g;
  }
  // duas filas de cinco, viradas para a câmera
  const cadeiras = [];
  for (let i = 0; i < 10; i++) {
    const fila = Math.floor(i / 5), col = i % 5;
    const g = cadeira();
    const pos = [(col - 2) * 1.7, 0, fila * 2.0 - 1.0];
    // a ordem de entrada: a primeira cadeira é a do meio da frente
    cadeiras.push({ g, pos, i });
  }
  const ordem = [7, 6, 8, 5, 9, 2, 1, 3, 0, 4];
  ordem.forEach((idx, k) => { cadeiras[idx].t0 = k === 0 ? 0.5 : 5.2 + (k) * 0.4; });

  // o ingresso: um papel com picote nas pontas
  const ticketTx = textura(1024, 440, (ctx, w, h) => {
    ctx.fillStyle = PAPEL; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = TINTA;
    ctx.font = "600 34px 'Bricolage Grotesque'"; ctx.fillText("CERRACLASS · INGRESSO", 70, 90);
    // tudo à esquerda do picote (x = 800): o título encolhe até caber, nunca encosta no "Nº 10"
    const cabe = (txt, peso, tam, y) => { ctx.font = `${peso} ${tam}px 'Bricolage Grotesque'`; while (ctx.measureText(txt).width > 690) { tam -= 2; ctx.font = `${peso} ${tam}px 'Bricolage Grotesque'`; } ctx.fillText(txt, 70, y); };
    cabe("SÁBADO DE SALA", 800, 104, 225);
    cabe("08:00 – 17:00  ·  turma de até 10 alunos", 600, 38, 320);
    ctx.setLineDash([14, 12]); ctx.lineWidth = 5; ctx.strokeStyle = TINTA;
    ctx.beginPath(); ctx.moveTo(800, 30); ctx.lineTo(800, h - 30); ctx.stroke();
    ctx.font = "800 64px 'Bricolage Grotesque'"; ctx.save(); ctx.translate(920, h / 2); ctx.rotate(-PI / 2); ctx.textAlign = "center"; ctx.fillText("Nº 10", 0, 22); ctx.restore();
  });
  const forma = new THREE.Shape();
  const TW = 3.4, TH = 1.46, n = 0.2;
  forma.moveTo(-TW / 2, -TH / 2); forma.lineTo(TW / 2, -TH / 2); forma.lineTo(TW / 2, -n);
  forma.absarc(TW / 2, 0, n, -PI / 2, PI / 2, true); forma.lineTo(TW / 2, TH / 2); forma.lineTo(-TW / 2, TH / 2); forma.lineTo(-TW / 2, n);
  forma.absarc(-TW / 2, 0, n, PI / 2, -PI / 2, true); forma.lineTo(-TW / 2, -TH / 2);
  const geoT = new THREE.ShapeGeometry(forma, 24);
  // UV a partir da posição, para a textura cobrir o ingresso inteiro
  const uv = geoT.attributes.uv, pos = geoT.attributes.position;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, pos.getX(i) / TW + 0.5, pos.getY(i) / TH + 0.5);
  const ticket = new THREE.Mesh(geoT, new THREE.MeshStandardMaterial({ map: ticketTx.tex, roughness: 0.7, side: THREE.DoubleSide }));
  ticket.castShadow = true;
  const ticketG = new THREE.Group(); ticketG.add(ticket); cena.add(ticketG);

  const CURSOS = window.CURSOS, T0 = window.CURSO_T0, PASSO = window.CURSO_PASSO;
  const cor = new THREE.Color();

  const CAM = [
    [0, [3.2, 6.5, 9.5]], [5, [4.2, 7.5, 11.5], "power2.inOut"], [11, [5.6, 8.4, 12.5], "power2.inOut"],
    [19, [-5.5, 9.5, 12.5], "none"], [19.6, [0.5, 5.6, 9.6], "power3.inOut"], [24, [1.2, 5.2, 9.0], "none"],
    [24.6, [2.6, 2.2, 6.2], "power3.inOut"], [27.5, [3.2, 2.0, 5.6], "none"], [32, [3.4, 2.0, 5.4], "none"],
  ];
  const ALVO = [[0, [0, 0.8, -0.4]], [11, [0, 0.8, 0]], [19.6, [0, 1.8, 0.2]], [24, [0, 1.8, 0.2]], [24.6, [0, 1.0, 1.0]], [32, [0, 1.0, 1.0]]];
  const DIST = V ? 1.3 : 1;

  return function desenhar(t) {
    for (const c of cadeiras) {
      const u = prog(t, c.t0, c.t0 + 0.55, "back.out(1.35)");
      const q = prog(t, c.t0, c.t0 + 0.35, "power3.in");
      c.g.visible = t >= c.t0;
      c.g.position.set(c.pos[0], 3.2 * (1 - q), c.pos[2]);
      c.g.scale.setScalar(Math.max(0.001, 0.6 + 0.4 * u));
      c.g.rotation.y = (1 - u) * 0.6 + (c.i % 2 ? 0.05 : -0.05);
    }
    // a cor do curso no chão e no fundo
    let hex = "#ffc83d";
    if (t >= T0 && t < 19) hex = CURSOS[Math.min(CURSOS.length - 1, Math.floor((t - T0) / PASSO))][1];
    cor.set(hex);
    matChao.color.copy(cor); cena.background.copy(cor);

    // o ingresso sobe e se inclina (até 24°, nunca vira)
    const s = prog(t, 19.3, 20.3, "back.out(1.35)");
    const d = prog(t, 23.7, 24.3, "power3.in");
    ticketG.visible = s > 0 && d < 1;
    ticketG.position.set(0, 1.6 + 1.2 * s + 3 * d, 0.6);
    ticket.rotation.set(-0.42 * (1 - s) - 0.2, 0.15 * Math.sin(t * 0.8), -0.06 + 0.12 * (1 - s));
    ticketG.scale.setScalar(Math.max(0.001, s));

    const p = K(t, CAM), a = K(t, ALVO);
    P.olhar([p[0] * DIST, p[1] * DIST, p[2] * DIST], a);
    if (V) P.enquadrar(0, -0.26); else P.enquadrar(0.21, 0);
    P.render();
  };
});
