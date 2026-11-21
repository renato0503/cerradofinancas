// Crédito · "Antes de assinar": a mesa com o contrato e a caneta azul.
// 0-5 o contrato na mesa e a caneta chega · 5-11 o comparativo: quatro barras de custo total, a melhor grifada
// (sem números) · 11-16,5 os quatro produtos assentam na mesa · 16,5-22,5 a caneta marca cada etapa no contrato
// 22,5-27 a caneta assina "Você decide" · 27 cortina azul-caneta (DOM)
import { THREE, V, K, prog, criarPalco, luzes, ambiente, textura, caixaArredondada, carregarFontes, rodar } from "./palco3d.js";

const PAPEL = "#fbfbf8", CANETA = "#1f3ae0", GRIFO = "#e6ff3d", TINTA = "#111522";
const PI = Math.PI;

rodar(async () => {
  await carregarFontes(["900 80px 'Schibsted Grotesk'", "500 30px 'Schibsted Grotesk'", "700 80px Caveat"]);
  const P = criarPalco({ fundo: "#eef0f5", fov: V ? 44 : 30, tom: false });
  const { cena, renderer } = P;
  await ambiente(renderer, cena, 0.55);
  luzes(cena, { chave: "#ffffff", recorte: "#e3e8ff", ceu: "#ffffff", chao: "#8890a8", forca: 0.85, sombra: 9 });

  const mesa = new THREE.Mesh(new THREE.PlaneGeometry(120, 80), new THREE.MeshBasicMaterial({ color: "#eef0f5" }));
  mesa.rotation.x = -PI / 2; mesa.position.x = 10; cena.add(mesa);
  const sombra = new THREE.Mesh(new THREE.PlaneGeometry(120, 80), new THREE.ShadowMaterial({ color: "#1a2050", opacity: 0.2 }));
  sombra.rotation.x = -PI / 2; sombra.position.set(10, 0.002, 0); sombra.receiveShadow = true; cena.add(sombra);
  const lit = (o) => { o.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); return o; };

  // ---- o contrato (textura viva: os vistos e a rubrica se desenham) ----
  const CW = 1200, CH = 1700, PW = 2.4, PH = 3.4;
  const CLAUS = ["Conversa inicial", "Simulação em vários bancos", "Você escolhe", "Contratação acompanhada"];
  const BOX = (i) => [120, 560 + i * 165];
  const ASS = { x0: 190, x1: 900, y: 1370 };
  const contrato = textura(CW, CH, (ctx, w, h, vistos = [0, 0, 0, 0], ass = 0) => {
    ctx.fillStyle = PAPEL; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = TINTA; ctx.font = "900 78px 'Schibsted Grotesk'"; ctx.fillText("Proposta de crédito", 90, 170);
    ctx.font = "500 36px 'Schibsted Grotesk'"; ctx.fillStyle = "#5d6274"; ctx.fillText("Simulação em vários bancos · custo total", 92, 240);
    ctx.fillStyle = "#dfe1ea"; ctx.fillRect(90, 290, w - 180, 4);
    for (let k = 0; k < 3; k++) ctx.fillRect(90, 350 + k * 40, w - 180 - k * 160, 14);
    CLAUS.forEach((c, i) => {
      const [bx, by] = BOX(i);
      ctx.strokeStyle = TINTA; ctx.lineWidth = 5; ctx.strokeRect(bx - 30, by - 30, 60, 60);
      ctx.fillStyle = CANETA; ctx.font = "900 40px 'Schibsted Grotesk'"; ctx.fillText(`§ ${i + 1}`, bx + 60, by + 14);
      ctx.fillStyle = TINTA; ctx.font = "900 52px 'Schibsted Grotesk'"; ctx.fillText(c, bx + 150, by + 16);
      const p = vistos[i];
      if (p > 0) {
        ctx.strokeStyle = CANETA; ctx.lineWidth = 12; ctx.lineCap = "round"; ctx.beginPath();
        const a = [bx - 22, by + 2], b = [bx - 4, by + 22], c2 = [bx + 34, by - 34];
        ctx.moveTo(...a);
        if (p < 0.4) ctx.lineTo(a[0] + (b[0] - a[0]) * p / 0.4, a[1] + (b[1] - a[1]) * p / 0.4);
        else { ctx.lineTo(...b); const q = (p - 0.4) / 0.6; ctx.lineTo(b[0] + (c2[0] - b[0]) * q, b[1] + (c2[1] - b[1]) * q); }
        ctx.stroke();
      }
    });
    // a linha de assinatura, o X e a rubrica
    ctx.fillStyle = TINTA; ctx.font = "900 70px 'Schibsted Grotesk'"; ctx.fillText("X", 100, ASS.y);
    ctx.fillRect(ASS.x0 - 20, ASS.y + 18, w - 300, 4);
    ctx.font = "500 30px 'Schibsted Grotesk'"; ctx.fillStyle = "#5d6274"; ctx.fillText("assinatura do contratante", ASS.x0, ASS.y + 64);
    if (ass > 0) {
      ctx.save(); ctx.beginPath(); ctx.rect(ASS.x0 - 20, ASS.y - 160, (ASS.x1 - ASS.x0 + 60) * ass, 220); ctx.clip();
      ctx.fillStyle = CANETA; ctx.font = "700 150px Caveat"; ctx.fillText("Você decide", ASS.x0, ASS.y);
      ctx.restore();
    }
    ctx.fillStyle = "#8a8fa0"; ctx.font = "500 24px 'Schibsted Grotesk'";
    ctx.fillText("Crédito sujeito a análise e aprovação. Taxas e condições variam conforme o perfil e a instituição.", 90, h - 90);
  });
  const folha = lit(new THREE.Mesh(new THREE.BoxGeometry(PW, 0.02, PH), [
    new THREE.MeshStandardMaterial({ color: PAPEL }), new THREE.MeshStandardMaterial({ color: PAPEL }),
    new THREE.MeshStandardMaterial({ map: contrato.tex, roughness: 0.85 }), new THREE.MeshStandardMaterial({ color: PAPEL }),
    new THREE.MeshStandardMaterial({ color: PAPEL }), new THREE.MeshStandardMaterial({ color: PAPEL }),
  ]));
  folha.position.y = 0.01; folha.rotation.y = 0.04; cena.add(folha);
  folha.material.forEach((m) => (m.transparent = true));
  const px2w = (x, y) => new THREE.Vector3((x / CW - 0.5) * PW, 0.03, (y / CH - 0.5) * PH).applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.04);

  // ---- a caneta: a origem do grupo é a ponta ----
  const caneta = new THREE.Group(); cena.add(caneta);
  const corpoC = new THREE.Group(); caneta.add(corpoC);
  const azul = new THREE.MeshStandardMaterial({ color: CANETA, roughness: 0.3, metalness: 0.25 });
  const prata = new THREE.MeshStandardMaterial({ color: "#d8dbe4", roughness: 0.25, metalness: 0.95 });
  const ponta = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.22, 24), prata); ponta.rotation.x = PI; ponta.position.y = 0.11; corpoC.add(ponta);
  const bico = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.05, 0.3, 24), prata); bico.position.y = 0.37; corpoC.add(bico);
  const tubo = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 1.9, 32), azul); tubo.position.y = 1.47; corpoC.add(tubo);
  const tampaC = new THREE.Mesh(new THREE.CylinderGeometry(0.092, 0.092, 0.5, 32), new THREE.MeshStandardMaterial({ color: "#13226f", roughness: 0.3 })); tampaC.position.y = 2.3; corpoC.add(tampaC);
  const clipe = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.6, 0.03), prata); clipe.position.set(0, 2.2, 0.11); corpoC.add(clipe);
  lit(caneta);
  corpoC.rotation.set(-0.55, 0, 0.35); // inclinada, como na mão

  // ---- o comparativo: quatro barras de custo total, sem números ----
  const X2 = 7.5;
  const ALT = [2.4, 1.3, 2.0, 2.2];
  const matBarra = new THREE.MeshStandardMaterial({ color: "#c9cfe6", roughness: 0.45 });
  const barras = ALT.map((a, i) => {
    const g = new THREE.Group();
    const m = lit(new THREE.Mesh(caixaArredondada(0.8, 0.8, 1, 0.06, 0.025), i === 1 ? azul : matBarra));
    m.rotation.x = -PI / 2; g.add(m);
    g.position.set(X2 - 1.65 + i * 1.1, 0, 0); cena.add(g);
    const tx = textura(512, 160, (ctx, w, h) => { ctx.fillStyle = TINTA; ctx.font = "900 72px 'Schibsted Grotesk'"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(`Banco ${i + 1}`, w / 2, h / 2); });
    const rot = new THREE.Mesh(new THREE.PlaneGeometry(1.05, 0.33), new THREE.MeshBasicMaterial({ map: tx.tex, transparent: true }));
    rot.rotation.x = -PI / 2; rot.position.set(X2 - 1.65 + i * 1.1, 0.01, 0.85); cena.add(rot);
    return { g, m, a, rot, t0: 5.6 + i * 0.3 };
  });
  const grifo = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.42), new THREE.MeshBasicMaterial({ color: GRIFO }));
  grifo.rotation.x = -PI / 2; grifo.position.set(X2 - 0.55, 0.006, 0.85); cena.add(grifo);
  const melhorTx = textura(700, 140, (ctx, w, h) => { ctx.fillStyle = CANETA; ctx.font = "700 96px Caveat"; ctx.textBaseline = "middle"; ctx.fillText("melhor opção", 10, h / 2); });
  const melhor = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 0.36), new THREE.MeshBasicMaterial({ map: melhorTx.tex, transparent: true }));
  melhor.rotation.x = -PI / 2; melhor.position.set(X2 - 0.2, 0.01, 1.35); cena.add(melhor);

  // ---- os produtos: quatro fichas que assentam na mesa ----
  const X3 = 15;
  const PRODS = [["Empréstimos", "pessoal, capital de giro e com garantia"], ["Consignados", "INSS, servidores e portabilidade"], ["Financiamentos", "imóveis, veículos e máquinas"], ["Seguros e consórcios", "vida, auto, empresa e cartas"]];
  const fichas = PRODS.map(([t1, t2], i) => {
    const tx = textura(900, 560, (ctx, w, h) => {
      ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = CANETA; ctx.fillRect(0, 0, 18, h);
      ctx.fillStyle = TINTA; ctx.font = "900 84px 'Schibsted Grotesk'"; ctx.fillText(t1, 60, 200);
      ctx.fillStyle = "#5d6274"; ctx.font = "500 40px 'Schibsted Grotesk'"; ctx.fillText(t2, 62, 290);
      ctx.fillStyle = "#dfe1ea"; for (let k = 0; k < 3; k++) ctx.fillRect(62, 360 + k * 46, w - 160 - k * 120, 12);
    });
    const branco = new THREE.MeshStandardMaterial({ color: "#ffffff" });
    const m = lit(new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.03, 1.5), [branco, branco, new THREE.MeshStandardMaterial({ map: tx.tex, roughness: 0.8 }), branco, branco, branco]));
    cena.add(m);
    return { m, pos: [X3 - 1.3 + (i % 2) * 2.6, 0.02, -0.85 + Math.floor(i / 2) * 1.7], rot: [0.05, -0.04, -0.03, 0.06][i], t0: 11.5 + i * 0.45 };
  });

  // ---- o caminho da caneta (em pixels do contrato; altura em unidades) ----
  const tVisto = (i) => 17.3 + i * 1.1;
  function pontaCaneta(t) {
    // repouso no canto do contrato, depois os vistos, depois a assinatura
    const desc = [900, 300, 1.3];
    if (t < 16.6) {
      const chega = prog(t, 0.8, 2.2, "power3.out");
      return [desc[0] + 300 * (1 - chega), desc[1] - 200 * (1 - chega), desc[2] + 2.0 * (1 - chega) + 0.06 * Math.sin(t * 1.4)];
    }
    for (let i = 0; i < 4; i++) {
      const t0 = tVisto(i);
      if (t < t0 + 0.9) {
        const de = i === 0 ? desc : [BOX(i - 1)[0] + 30, BOX(i - 1)[1] - 30, 0.35];
        const [bx, by] = BOX(i);
        const u = prog(t, t0 - 0.6, t0, "power2.inOut");
        const x = de[0] + (bx - 22 - de[0]) * u, y = de[1] + (by - de[1]) * u;
        const altura = (i === 0 ? de[2] : 0.35) * (1 - u);
        if (t < t0) return [x, y, altura + Math.sin(u * PI) * 0.25];
        const v = prog(t, t0, t0 + 0.35, "power1.inOut"); // o traço do visto
        const vx = v < 0.4 ? -22 + 18 * v / 0.4 : -4 + 38 * (v - 0.4) / 0.6;
        const vy = v < 0.4 ? 2 + 20 * v / 0.4 : 22 - 56 * (v - 0.4) / 0.6;
        const sobe = prog(t, t0 + 0.4, t0 + 0.9, "power2.out");
        return [bx + vx, by + vy, 0.35 * sobe];
      }
    }
    const fimV = [BOX(3)[0] + 30, BOX(3)[1] - 30, 0.35];
    if (t < 23.3) {
      const u = prog(t, 22.0, 23.3, "power2.inOut");
      return [fimV[0] + (ASS.x0 - fimV[0]) * u, fimV[1] + (ASS.y - 40 - fimV[1]) * u, 0.35 * (1 - u) + Math.sin(u * PI) * 0.3];
    }
    const s = prog(t, 23.3, 25.3, "power1.inOut");
    if (t < 25.3) return [ASS.x0 + (ASS.x1 - ASS.x0) * s, ASS.y - 40 - 50 * Math.sin(s * 26) * (0.6 + 0.4 * Math.sin(s * 7)), 0.0];
    const sai = prog(t, 25.3, 26.4, "power3.out");
    return [ASS.x1 + 120 * sai, ASS.y - 40 - 250 * sai, 1.2 * sai];
  }

  const CAM = [
    [0, [1.8, 6.4, 6.2]], [4.6, [2.4, 5.6, 5.6], "none"],
    [5.4, [X2 + 2.6, 4.8, 7.6], "power3.inOut"], [10.6, [X2 + 3.2, 4.4, 7.0], "none"],
    [11.4, [X3 + 1.4, 8.8, 7.0], "power3.inOut"], [16.0, [X3 + 1.8, 8.4, 6.4], "none"],
    [16.9, [1.6, 5.4, 4.6], "power3.inOut"], [21.8, [1.2, 5.6, 4.4], "none"],
    [22.8, [2.6, 3.4, 4.6], "power3.inOut"], [27, [3.0, 3.2, 4.2], "none"], [32, [3.2, 3.2, 4.0], "none"],
  ];
  const ALVO = [[0, [0, 0, 0]], [4.6, [0, 0, 0]], [5.4, [X2, 0.9, 0.2]], [10.6, [X2, 0.9, 0.2]], [11.4, [X3, 0, 0]], [16.0, [X3, 0, 0]], [16.9, [-0.1, 0, -0.2]], [21.8, [-0.1, 0, -0.2]], [22.8, [0, 0, 1.0]], [32, [0, 0, 1.0]]];
  const DIST = V ? 1.3 : 1;
  // no fim a câmera recua para o contrato caber inteiro no quadro
  const AFASTA = [[0, 1], [21.8, 1], [22.8, 1.24, "power3.inOut"], [32, 1.24]];

  return function desenhar(t) {
    // o contrato: vistos e rubrica
    const vistos = [0, 1, 2, 3].map((i) => Math.round(prog(t, tVisto(i), tVisto(i) + 0.35) * 20) / 20);
    contrato.atualizar(vistos, Math.round(prog(t, 23.3, 25.3, "power1.inOut") * 60) / 60);
    // a caneta
    const [cx, cy, alt] = pontaCaneta(t);
    const pw = px2w(cx, cy);
    caneta.position.set(pw.x, pw.y + Math.max(0, alt), pw.z);
    // as barras sobem; a melhor ganha o grifo
    for (const b of barras) {
      const u = prog(t, b.t0, b.t0 + 0.8, "power3.out");
      const h = Math.max(0.01, b.a * u);
      b.m.scale.z = h; b.g.position.y = h / 2;
    }
    const gr = prog(t, 7.2, 7.8, "power2.inOut");
    grifo.scale.x = Math.max(0.001, gr); grifo.position.x = X2 - 0.55 - 0.55 * (1 - gr);
    // texto 3D só aparece inteiro: o que fica para trás quando a câmera muda de trecho some antes
    const sai = 1 - prog(t, 10.6, 11.1);
    melhor.material.opacity = prog(t, 7.7, 8.2) * sai;
    barras.forEach((b) => (b.rot.material.opacity = sai));
    const folhaOp = 1 - prog(t, 4.9, 5.4) + prog(t, 16.4, 16.9);
    folha.material.forEach((m) => (m.opacity = Math.min(1, folhaOp)));
    folha.visible = folhaOp > 0.01; folha.castShadow = folhaOp > 0.5;
    // as fichas dos produtos caem e assentam
    for (const f of fichas) {
      const u = prog(t, f.t0, f.t0 + 0.6, "power3.out");
      f.m.visible = u > 0;
      f.m.position.set(f.pos[0], f.pos[1] + 2.2 * (1 - u), f.pos[2] - 0.6 * (1 - u));
      f.m.rotation.set(-0.5 * (1 - u), f.rot, 0);
    }
    const p = K(t, CAM), a = K(t, ALVO), D = DIST * K(t, AFASTA);
    P.olhar([a[0] + (p[0] - a[0]) * D, a[1] + (p[1] - a[1]) * D, a[2] + (p[2] - a[2]) * D], a);
    if (V) P.enquadrar(0, -0.26); else P.enquadrar(0.21, 0);
    P.render();
  };
});
