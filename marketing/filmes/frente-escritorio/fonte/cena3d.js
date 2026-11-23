// Institucional v3 "tudo conversa": quatro ilhas, uma por frente, com os objetos dos filmes das frentes.
// Tech = monitor com painel · Contabilidade = razonete "T" com lançamentos · Crédito = contrato e caneta · CerraClass = cadeiras.
// 0-3     close no monitor (o "sistema")                       · 3-8,8 plano aberto: cada ilha longe da outra
// 8,8-11,4 as ilhas deslizam para a mesma fileira; a CerraClass sobe
// 11,4-21,6 o fio dourado passa de ilha em ilha, junto com cada elo falado; cada objeto faz a sua ação
// 21,6-25 o fio fecha o circuito (CerraClass → Tech) e a câmera recua · 25 cortina azul (DOM)
// Tudo é função pura do tempo t. Nenhum texto escrito no 3D.
import { THREE, V, K, prog, mola, criarPalco, luzes, ambiente, chaoDeSombra, textura, caixaArredondada, rodar } from "./palco3d.js";

const FUNDO = "#eef2f8", AZUL = "#001f5c", AZUL2 = "#00458b", OURO = "#fecb00", VERDE = "#1f8a3c", CANETA = "#1d3fbf";
const PI = Math.PI;

rodar(async () => {
  const P = criarPalco({ fundo: FUNDO, fov: V ? 40 : 30, tom: false });
  const { cena, renderer } = P;
  await ambiente(renderer, cena, 0.5);
  luzes(cena, { chave: "#fff7ec", recorte: "#d8e4ff", ceu: "#ffffff", chao: "#9aa8c2", forca: 0.8, sombra: 12 });
  chaoDeSombra(cena, { tamanho: 80, opacidade: 0.13, y: 0 });

  const mat = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.5, metalness: 0, ...o });
  const lit = (o) => { o.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); return o; };
  const matOuro = mat(OURO, { roughness: 0.3, metalness: 0.55 });

  // ---------- ilha: disco branco com a borda na cor da frente ----------
  function ilha(cor) {
    const g = new THREE.Group();
    const base = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.42, 0.22, 72), mat("#ffffff", { roughness: 0.6 })); base.position.y = 0.11;
    const aro = new THREE.Mesh(new THREE.CylinderGeometry(1.43, 1.45, 0.08, 72), mat(cor, { roughness: 0.4 })); aro.position.y = 0.04;
    g.add(base, aro); lit(g); cena.add(g);
    const topo = new THREE.Group(); topo.position.y = 0.22; g.add(topo);
    return { g, topo };
  }

  // ---------- Tech: monitor com painel (barras que crescem; sem texto) ----------
  const tech = ilha(AZUL);
  const painel = textura(800, 480, (ctx, w, h, p = 0.35) => {
    ctx.fillStyle = "#0b1f4d"; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#14306e"; ctx.fillRect(0, 0, w, 54);
    for (let i = 0; i < 3; i++) { ctx.fillStyle = ["#ff6b6b", OURO, "#4cd47a"][i]; ctx.beginPath(); ctx.arc(30 + i * 30, 27, 9, 0, 2 * PI); ctx.fill(); }
    const alts = [0.35, 0.55, 0.42, 0.7, 0.62, 0.85, 0.78];
    alts.forEach((a, i) => {
      const hh = (h - 150) * a * p;
      ctx.fillStyle = i === alts.length - 1 ? OURO : "#4f7de0";
      ctx.fillRect(60 + i * 100, h - 50 - hh, 62, hh);
    });
    ctx.strokeStyle = "rgba(255,255,255,.25)"; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(40, h - 48); ctx.lineTo(w - 40, h - 48); ctx.stroke();
    ctx.strokeStyle = "#7fe0a0"; ctx.lineWidth = 6; ctx.beginPath();
    alts.forEach((a, i) => { const x = 91 + i * 100, y = h - 50 - (h - 150) * a * p - 26; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.stroke();
  });
  const monitor = new THREE.Group();
  const moldura = new THREE.Mesh(caixaArredondada(1.72, 1.08, 0.07, 0.06, 0.02), mat("#151a24", { roughness: 0.3 })); moldura.position.y = 1.32;
  const tela = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.96), new THREE.MeshBasicMaterial({ map: painel.tex })); tela.position.set(0, 1.32, 0.04);
  const haste = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.62, 16), mat("#9aa3b5", { metalness: 0.8, roughness: 0.3 })); haste.position.y = 0.48;
  const pe = new THREE.Mesh(caixaArredondada(0.6, 0.36, 0.04, 0.08, 0.01), mat("#9aa3b5", { metalness: 0.8, roughness: 0.3 })); pe.rotation.x = -PI / 2; pe.position.y = 0.2;
  const teclado = new THREE.Mesh(caixaArredondada(1.0, 0.3, 0.04, 0.04, 0.01), mat("#e4e8f0")); teclado.rotation.x = -PI / 2; teclado.position.set(0, 0.04, 0.62);
  monitor.add(moldura, tela, haste, pe, teclado); lit(monitor); tela.castShadow = false;
  monitor.position.set(0, 0, -0.2); tech.topo.add(monitor);

  // ---------- Contabilidade: o razonete "T" e os lançamentos ----------
  const cont = ilha(AZUL2);
  const razo = new THREE.Group();
  const matT = mat(AZUL2, { roughness: 0.45 });
  const barraH = new THREE.Mesh(caixaArredondada(2.0, 0.14, 0.14, 0.05, 0.02), matT); barraH.position.y = 1.7;
  const barraV = new THREE.Mesh(caixaArredondada(0.14, 1.5, 0.14, 0.05, 0.02), matT); barraV.position.y = 0.95;
  const fundoT = new THREE.Mesh(caixaArredondada(2.1, 1.55, 0.05, 0.06, 0.01), mat("#ffffff", { roughness: 0.7 })); fundoT.position.set(0, 1.0, -0.12);
  razo.add(fundoT, barraH, barraV);
  const lanc = []; // fichas: débito (azul) à esquerda, crédito (verde) à direita
  for (let i = 0; i < 6; i++) {
    const lado = i % 2 ? 1 : -1, linha = Math.floor(i / 2);
    const f = new THREE.Mesh(caixaArredondada(0.78, 0.2, 0.06, 0.05, 0.015), mat(lado < 0 ? "#3d6fd6" : "#2fa35a", { roughness: 0.4 }));
    f.userData.casa = [lado * 0.5, 1.38 - linha * 0.34, 0.02]; f.userData.t0 = 14.15 + i * 0.22;
    razo.add(f); lanc.push(f);
  }
  lit(razo); razo.position.z = -0.25; cont.topo.add(razo);

  // ---------- Crédito: o contrato (linhas, sem texto) e a caneta que dá o visto e assina ----------
  const cred = ilha(OURO);
  const CW = 600, CH = 820;
  const contrato = textura(CW, CH, (ctx, w, h, visto = 0, ass = 0) => {
    ctx.fillStyle = "#fbfaf6"; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#1b2a55"; ctx.fillRect(50, 60, 300, 28);
    ctx.fillStyle = "#d6dbe7"; for (let k = 0; k < 9; k++) ctx.fillRect(50, 130 + k * 42, w - 100 - (k % 3) * 70, 12);
    ctx.strokeStyle = "#1b2a55"; ctx.lineWidth = 4; ctx.strokeRect(50, 540, 44, 44);
    ctx.fillStyle = "#d6dbe7"; ctx.fillRect(110, 556, 300, 12);
    ctx.fillStyle = "#1b2a55"; ctx.fillRect(70, 730, w - 140, 4);
    ctx.strokeStyle = CANETA; ctx.lineCap = "round"; ctx.lineJoin = "round";
    if (visto > 0) { ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(58, 562); const p = Math.min(1, visto / 0.4); ctx.lineTo(58 + 14 * p, 562 + 16 * p); if (visto > 0.4) { const q = (visto - 0.4) / 0.6; ctx.lineTo(72 + 34 * q, 578 - 50 * q); } ctx.stroke(); }
    if (ass > 0) { // rubrica: uma onda que se desenha
      ctx.lineWidth = 7; ctx.beginPath();
      const n = Math.floor(80 * ass);
      for (let i = 0; i <= n; i++) { const u = i / 80, x = 110 + u * 360, y = 705 - 26 * Math.sin(u * PI * 5) * (1 - u * 0.5) - 10 * u; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
      ctx.stroke();
    }
  });
  const prancha = new THREE.Group();
  const apoio = new THREE.Mesh(caixaArredondada(1.5, 1.9, 0.08, 0.06, 0.02), mat("#7a5232", { roughness: 0.55 }));
  const papel = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 1.78), new THREE.MeshStandardMaterial({ map: contrato.tex, roughness: 0.85 })); papel.position.z = 0.05;
  prancha.add(apoio, papel); lit(prancha);
  prancha.rotation.x = -1.05; prancha.position.set(0, 0.62, 0.05); cred.topo.add(prancha);
  const cavalete = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.5, 0.5), mat("#e4e8f0")); cavalete.position.set(0, 0.25, -0.25); lit(cavalete); cred.topo.add(cavalete);
  // caneta (a mesma do filme do Crédito): a origem do grupo é a ponta
  const caneta = new THREE.Group(); const corpoC = new THREE.Group(); caneta.add(corpoC);
  const azulC = mat(CANETA, { roughness: 0.3, metalness: 0.25 }), prata = mat("#d8dbe4", { roughness: 0.25, metalness: 0.95 });
  const pontaC = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.13, 20), prata); pontaC.rotation.x = PI; pontaC.position.y = 0.065; corpoC.add(pontaC);
  const tuboC = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.1, 24), azulC); tuboC.position.y = 0.68; corpoC.add(tuboC);
  const tampaC = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.3, 24), mat("#13226f", { roughness: 0.3 })); tampaC.position.y = 1.35; corpoC.add(tampaC);
  corpoC.rotation.set(-0.5, 0, 0.4); lit(caneta); cred.topo.add(caneta);
  // ponto do contrato (pixels) → posição local na ilha
  const pxL = (x, y) => { const v = new THREE.Vector3((x / CW - 0.5) * 1.3, -(y / CH - 0.5) * 1.78, 0.07); v.applyEuler(prancha.rotation).add(prancha.position); return v; };

  // ---------- CerraClass: três cadeiras escolares (as do filme da CerraClass) ----------
  const curs = ilha(VERDE);
  const matCad = mat("#1c1f26", { roughness: 0.45 }), matPerna = mat("#8a8f99", { roughness: 0.3, metalness: 0.7 });
  function cadeira() {
    const g = new THREE.Group();
    const assento = new THREE.Mesh(caixaArredondada(0.86, 0.8, 0.08, 0.12, 0.025), matCad); assento.rotation.x = -PI / 2; assento.position.y = 0.82; g.add(assento);
    const encosto = new THREE.Mesh(caixaArredondada(0.86, 0.5, 0.07, 0.14, 0.025), matCad); encosto.position.set(0, 1.42, -0.38); encosto.rotation.x = -0.12; g.add(encosto);
    for (const sx of [-1, 1]) {
      const h = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.7, 10), matPerna); h.position.set(sx * 0.36, 1.12, -0.37); g.add(h);
      for (const sz of [-1, 1]) { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.8, 10), matPerna); p.position.set(sx * 0.36, 0.4, sz * 0.33); g.add(p); }
    }
    const pr = new THREE.Mesh(caixaArredondada(0.5, 0.62, 0.05, 0.12, 0.02), mat(VERDE, { roughness: 0.45 })); pr.rotation.x = -PI / 2; pr.position.set(0.58, 1.12, 0.12); g.add(pr);
    const su = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.32, 8), matPerna); su.position.set(0.5, 0.96, 0.12); g.add(su);
    lit(g); g.scale.setScalar(0.62); curs.topo.add(g); return g;
  }
  const cadeiras = [[-0.62, 0.1, 0.25], [0.62, 0.1, -0.25], [0, -0.55, 0]].map(([x, z, ry], i) => { const c = cadeira(); c.userData = { x, z, ry, t0: 19.3 + i * 0.28 }; return c; });

  // ---------- posições: separadas (o problema) e na mesma fileira (a solução) ----------
  const ILHAS = [tech, cont, cred, curs];
  const LONGE = [[-2.3, 2.3], [4.0, 0.5], [0.7, -3.6], [0, -12]];
  const FILA = [[-4.5, 0], [-1.5, 0], [1.5, 0], [4.5, 0]];

  // ---------- o fio dourado: Tech → Contabilidade → Crédito → CerraClass, e o arco que fecha o circuito ----------
  const matFio = mat(OURO, { roughness: 0.25, metalness: 0.6, emissive: "#7a5c00" });
  const fios = [];
  function fio(a, b, t0, dur, alto = 1.3, atras = 0) {
    const A = new THREE.Vector3(FILA[a][0], 0.3, 0.9), B = new THREE.Vector3(FILA[b][0], 0.3, 0.9);
    const M1 = A.clone().lerp(B, 0.25), M2 = A.clone().lerp(B, 0.75);
    M1.y += alto; M2.y += alto; M1.z -= atras; M2.z -= atras;
    const curva = new THREE.CubicBezierCurve3(A, M1, M2, B);
    const geo = new THREE.TubeGeometry(curva, 96, 0.035, 10, false);
    const m = new THREE.Mesh(geo, matFio); cena.add(m);
    const luz = new THREE.Mesh(new THREE.SphereGeometry(0.09, 20, 14), new THREE.MeshBasicMaterial({ color: "#fff3b0" })); cena.add(luz);
    fios.push({ m, geo, curva, t0, dur, luz });
  }
  fio(0, 1, 13.95, 0.75); fio(1, 2, 16.5, 0.75); fio(2, 3, 19.05, 0.75);
  fio(3, 0, 21.75, 1.1, 3.2, 2.6); // o circuito fecha por trás

  // ---------- câmera ----------
  const fx = (i) => FILA[i][0];
  const CAM = [
    [0, [-0.1, 2.4, 6.4]], [2.9, [-0.5, 2.3, 5.7], "sine.inOut"],
    [4.0, [0.55, 9.6, 17.2], "power3.inOut"], [8.6, [0.55, 9.3, 16.7], "sine.inOut"],
    [10.6, [0.0, 9.0, 21.0], "power3.inOut"], [11.2, [0.0, 8.8, 20.6], "sine.inOut"],
    [11.9, [fx(0) + 2.2, 3.4, 6.6], "power3.inOut"], [13.9, [fx(0) + 2.6, 3.3, 6.4], "sine.inOut"],
    [14.5, [fx(1) + 2.2, 3.4, 6.6], "power3.inOut"], [16.45, [fx(1) + 2.6, 3.3, 6.4], "sine.inOut"],
    [17.05, [fx(2) + 2.2, 3.6, 6.4], "power3.inOut"], [19.0, [fx(2) + 2.6, 3.5, 6.2], "sine.inOut"],
    [19.6, [fx(3) + 2.2, 3.4, 6.6], "power3.inOut"], [21.4, [fx(3) + 2.6, 3.3, 6.4], "sine.inOut"],
    [23.6, [2.0, 9.4, 20.8], "power2.inOut"], [30, [1.6, 9.2, 21.4], "none"],
  ];
  const ALVO = [
    [0, [-2.3, 1.3, 2.1]], [2.9, [-2.3, 1.35, 2.1]], [4.0, [0.55, 0.8, 0]], [8.6, [0.55, 0.8, 0]], [10.6, [0, 1.0, 0]], [11.2, [0, 1.0, 0]],
    [11.9, [fx(0), 1.0, 0]], [13.9, [fx(0), 1.0, 0]], [14.5, [fx(1), 1.0, 0]], [16.45, [fx(1), 1.0, 0]],
    [17.05, [fx(2), 0.8, 0]], [19.0, [fx(2), 0.8, 0]], [19.6, [fx(3), 0.9, 0]], [21.4, [fx(3), 0.9, 0]],
    [23.6, [0, 1.3, 0]], [30, [0, 1.3, 0]],
  ];
  const DIST = V ? 1.75 : 1;

  return function desenhar(t) {
    // ilhas: aparecem (Tech e Contabilidade já no gancho; Crédito no "Banco"; CerraClass na virada) e deslizam para a fileira
    const surge = [prog(t, 0, 0.5, "expo.out"), prog(t, 5.3, 5.8, "expo.out"), prog(t, 7.45, 7.95, "expo.out"), prog(t, 9.4, 10.2, "expo.out")];
    const junta = prog(t, 8.9, 10.6, "power3.inOut");
    ILHAS.forEach((il, i) => {
      const [x0, z0] = LONGE[i], [x1, z1] = FILA[i];
      const j = i === 3 ? 1 : junta; // a CerraClass já nasce na fileira
      il.g.position.set(x0 + (x1 - x0) * j, 0, z0 + (z1 - z0) * j);
      const s = Math.max(0.001, surge[i] * (t > 0.5 && i === 0 ? 1 : 1));
      il.g.scale.setScalar(s);
      il.g.visible = surge[i] > 0.001;
      il.g.rotation.y = (1 - j) * (i === 1 ? -0.5 : i === 2 ? 0.35 : 0.3);
    });
    // Tech: as barras do painel crescem no elo 1 (11,6-12,8); antes, painel em repouso
    painel.atualizar(Math.round((0.35 + 0.65 * prog(t, 11.6, 12.8, "power2.out")) * 40) / 40);
    // Contabilidade: os lançamentos entram no T (14,15+)
    for (const f of lanc) {
      const u = prog(t, f.userData.t0, f.userData.t0 + 0.4, "power3.out");
      const [x, y, z] = f.userData.casa;
      f.position.set(x, y + 0.9 * (1 - u), z + 0.5 * (1 - u)); f.scale.setScalar(Math.max(0.001, u)); f.visible = u > 0.001;
    }
    // Crédito: a caneta desce, dá o visto (16,9-17,3) e rubrica (17,5-18,4), depois descansa
    const visto = prog(t, 16.9, 17.3, "power1.inOut"), ass = prog(t, 17.5, 18.4, "power1.inOut");
    contrato.atualizar(Math.round(visto * 20) / 20, Math.round(ass * 40) / 40);
    let alvoC;
    if (t < 16.9) alvoC = pxL(60, 560).add(new THREE.Vector3(0.35, 0.9 * (1 - prog(t, 16.55, 16.9, "power2.out")) + 0.02, 0.1));
    else if (t < 17.3) { const p = visto; alvoC = p < 0.4 ? pxL(58 + 14 * p / 0.4, 562 + 16 * p / 0.4) : pxL(72 + 34 * (p - 0.4) / 0.6, 578 - 50 * (p - 0.4) / 0.6); }
    else if (t < 17.5) alvoC = pxL(106, 528).lerp(pxL(110, 705), prog(t, 17.3, 17.5));
    else if (t < 18.4) { const u = ass; alvoC = pxL(110 + u * 360, 705 - 26 * Math.sin(u * PI * 5) * (1 - u * 0.5) - 10 * u); }
    else alvoC = pxL(470, 690).add(new THREE.Vector3(0.15, 0.5 * prog(t, 18.4, 18.8, "power2.out"), 0.1));
    caneta.position.copy(alvoC);
    // CerraClass: as cadeiras entram uma a uma (19,3+)
    for (const c of cadeiras) {
      const u = prog(t, c.userData.t0, c.userData.t0 + 0.45, "back.out(1.3)");
      c.position.set(c.userData.x, 0.0, c.userData.z); c.rotation.y = c.userData.ry;
      c.scale.setScalar(Math.max(0.001, 0.62 * u)); c.visible = u > 0.001;
    }
    // o fio: draw-on e a luz que percorre; depois que o circuito fecha, a luz corre em todos
    for (const f of fios) {
      const p = prog(t, f.t0, f.t0 + f.dur, "power2.inOut");
      f.geo.setDrawRange(0, Math.floor(p * 96) * 10 * 6);
      f.m.visible = p > 0;
      const correndo = t > 22.9 ? ((t - 22.9) * 0.55) % 1 : null;
      f.luz.visible = (p > 0 && p < 1) || correndo !== null;
      f.curva.getPointAt(Math.min(1, correndo !== null ? correndo : p), f.luz.position);
    }

    const pos = K(t, CAM), alvo = K(t, ALVO);
    P.olhar([alvo[0] + (pos[0] - alvo[0]) * DIST, alvo[1] + (pos[1] - alvo[1]) * DIST, alvo[2] + (pos[2] - alvo[2]) * DIST], alvo);
    if (V) P.enquadrar(0, 0.11); else P.enquadrar(0.2, 0);
    P.render();
  };
});
