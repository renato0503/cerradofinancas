// Consultorias · "Planta": o organograma como prancha técnica em 3D, sobre o papel vegetal com grade.
// 0-5 o centro se desenha em arame · 5-11 antes (blocos soltos e tortos, em traço) e depois (alinham, ganham
// corpo e o traço laranja liga cada um ao centro) · 11-19 cada uma das 7 consultorias acende
// 19-24 a cota laranja mede a estrutura · 24-27,5 vista de cima: a planta · 27,5 cortina grafite (DOM)
import { THREE, V, K, prog, rng, criarPalco, luzes, ambiente, textura, carregarFontes, rodar } from "./palco3d.js";

const VEGETAL = "#f3f0e8", GRAFITE = "#23262b", LARANJA = "#e4570e";
const PI = Math.PI;

rodar(async () => {
  await carregarFontes(["600 80px Fraunces", "500 30px 'DM Mono'"]);
  const P = criarPalco({ fundo: VEGETAL, fov: V ? 44 : 30, tom: false });
  const { cena, renderer } = P;
  await ambiente(renderer, cena, 0.5);
  luzes(cena, { chave: "#ffffff", recorte: "#ffffff", ceu: "#ffffff", chao: "#8a8678", forca: 0.8, sombra: 9 });

  // papel vegetal com a grade (30 e 150 px viram 0,25 e 1,25 unidade)
  const grade = textura(500, 500, (ctx, w, h) => {
    ctx.fillStyle = VEGETAL; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "rgba(35,38,43,.07)";
    for (let i = 0; i < 5; i++) { ctx.fillRect(i * 100, 0, 2, h); ctx.fillRect(0, i * 100, w, 2); }
    ctx.fillStyle = "rgba(35,38,43,.14)"; ctx.fillRect(0, 0, 4, h); ctx.fillRect(0, 0, w, 4);
  });
  grade.tex.wrapS = grade.tex.wrapT = THREE.RepeatWrapping; grade.tex.repeat.set(48, 48);
  const chao = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.MeshBasicMaterial({ map: grade.tex }));
  chao.rotation.x = -PI / 2; cena.add(chao);
  const sombra = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.ShadowMaterial({ color: GRAFITE, opacity: 0.16 }));
  sombra.rotation.x = -PI / 2; sombra.position.y = 0.002; sombra.receiveShadow = true; cena.add(sombra);

  const matTraco = new THREE.MeshBasicMaterial({ color: GRAFITE });
  const matLaranja = new THREE.MeshBasicMaterial({ color: LARANJA });

  // um bloco da planta: as 12 arestas em traço (que se desenham) e o corpo (que aparece no "depois")
  function bloco(w, h, d, texto, centro = false) {
    const g = new THREE.Group();
    const arestas = [];
    const cantos = [];
    for (const sx of [-1, 1]) for (const sy of [0, 1]) for (const sz of [-1, 1]) cantos.push([sx * w / 2, sy * h, sz * d / 2]);
    for (let a = 0; a < 8; a++) for (let b = a + 1; b < 8; b++) {
      if ([0, 1, 2].filter((k) => cantos[a][k] !== cantos[b][k]).length !== 1) continue;
      const A = new THREE.Vector3(...cantos[a]), B = new THREE.Vector3(...cantos[b]);
      const len = A.distanceTo(B);
      const geo = new THREE.BoxGeometry(0.035, 0.035, len); geo.translate(0, 0, len / 2);
      const m = new THREE.Mesh(geo, matTraco); m.position.copy(A); m.lookAt(B); g.add(m); arestas.push(m);
    }
    const matCorpo = new THREE.MeshStandardMaterial({ color: centro ? GRAFITE : "#fbfaf6", roughness: 0.8, transparent: true, opacity: 0 });
    const corpo = new THREE.Mesh(new THREE.BoxGeometry(w * 0.985, h * 0.985, d * 0.985), matCorpo);
    corpo.position.y = h / 2; corpo.castShadow = true; g.add(corpo);
    const tx = textura(512, Math.round(512 * d / w), (ctx, cw, ch, aceso = 0) => {
      ctx.fillStyle = centro ? GRAFITE : aceso ? LARANJA : "#fbfaf6"; ctx.fillRect(0, 0, cw, ch);
      ctx.fillStyle = centro || aceso ? "#ffffff" : GRAFITE; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      let tam = 96; ctx.font = `600 ${tam}px Fraunces`;
      while (ctx.measureText(texto).width > cw - 50 && tam > 30) { tam -= 4; ctx.font = `600 ${tam}px Fraunces`; }
      ctx.fillText(texto, cw / 2, ch / 2);
    });
    const topo = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.97, d * 0.97), new THREE.MeshBasicMaterial({ map: tx.tex, transparent: true, opacity: 0 }));
    topo.rotation.x = -PI / 2; topo.position.y = h + 0.004; g.add(topo);
    cena.add(g);
    return { g, arestas, corpo, topo, tx, h };
  }

  const hub = bloco(3.0, 1.1, 1.4, "Cerrado Finanças", true);
  hub.g.position.set(0, 0, -2.4);
  const NOMES = ["BPO", "Controladoria", "CSC", "GRC", "Tributário", "Venture", "GovTech"];
  const R = rng(5);
  const areas = NOMES.map((n, i) => {
    const b = bloco(1.24, 0.7, 1.0, n);
    b.depois = [(i - 3) * 1.42, 0, 1.7];
    b.antes = [(R() * 2 - 1) * 5, 0.25 + R() * 0.6, (R() * 2 - 1) * 2.4 + 0.6];
    b.giro = [(R() - 0.5) * 0.5, (R() - 0.5) * 1.6, (R() - 0.5) * 0.5];
    b.i = i;
    return b;
  });

  // o traço do organograma no papel: do centro ao barramento, e do barramento a cada área
  function traco(A, B, t0, dur, mat = matLaranja, esp = 0.06) {
    const a = new THREE.Vector3(...A), b = new THREE.Vector3(...B);
    const len = a.distanceTo(b);
    const geo = new THREE.BoxGeometry(esp, 0.012, len); geo.translate(0, 0, len / 2);
    const m = new THREE.Mesh(geo, mat); m.position.copy(a); m.lookAt(b); cena.add(m);
    return { m, t0, dur };
  }
  const tracos = [traco([0, 0.01, -1.7], [0, 0.01, 0.6], 8.4, 0.4), traco([-4.8, 0.01, 0.6], [4.8, 0.01, 0.6], 8.75, 0.5)];
  areas.forEach((b, i) => tracos.push(traco([b.depois[0], 0.01, 0.6], [b.depois[0], 0.01, 1.2], 9.2 + i * 0.06, 0.25)));

  // a cota: linha de dimensão laranja com as pontas
  tracos.push(traco([-5.4, 0.02, 3.0], [5.4, 0.02, 3.0], 19.6, 0.9, matLaranja, 0.05));
  const pontas = [-5.4, 5.4].map((x) => { const m = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.012, 0.5), matLaranja); m.position.set(x, 0.02, 3.0); cena.add(m); return m; });
  const cotaTx = textura(1024, 128, (ctx, w, h) => { ctx.fillStyle = VEGETAL; ctx.fillRect(w / 2 - 330, 0, 660, h); ctx.fillStyle = LARANJA; ctx.font = "500 64px 'DM Mono'"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("estrutura sob medida", w / 2, h / 2); });
  const cotaTxt = new THREE.Mesh(new THREE.PlaneGeometry(4, 0.5), new THREE.MeshBasicMaterial({ map: cotaTx.tex, transparent: true, opacity: 0 }));
  cotaTxt.rotation.x = -PI / 2; cotaTxt.position.set(0, 0.025, 3.0); cena.add(cotaTxt);

  const CAM = [
    [0, [3.2, 4.6, 3.4]], [4.6, [4.6, 6.2, 6.4], "power2.inOut"],
    [5.4, [6.4, 8.2, 9.6], "power3.inOut"], [10.6, [5.4, 7.6, 9.8], "none"],
    [11.4, [7.0, 5.0, 8.6], "power3.inOut"], [18.6, [3.0, 5.4, 10.0], "none"],
    [19.4, [-4.8, 7.4, 10.6], "power3.inOut"], [23.6, [-3.4, 7.8, 10.8], "none"],
    [24.4, [0, 16.5, 1.2], "power3.inOut"], [27.5, [0, 16.0, 1.0], "none"], [32, [0, 15.8, 1.0], "none"],
  ];
  const ALVO = [[0, [0, 0.5, -2.4]], [4.6, [0, 0.4, -1.4]], [5.4, [0, 0.3, 0.2]], [18.6, [0, 0.3, 0.2]], [19.4, [0, 0.2, 0.6]], [23.6, [0, 0.2, 0.6]], [24.4, [0, 0, 0.4]], [32, [0, 0, 0.4]]];
  const DIST = V ? 1.65 : 1.22;
  // enquanto a fileira das 7 consultorias está em cena a câmera recua: as pontas (BPO e GovTech) cabem no quadro
  const AFASTA = [[0, 1], [10.6, 1], [11.4, 1.32, "power3.inOut"], [23.6, 1.32], [24.4, 1, "power3.inOut"], [32, 1]];

  function desenharArestas(b, t0, dur) {
    return (t) => b.arestas.forEach((m, k) => {
      const p = prog(t, t0 + k * dur * 0.06, t0 + k * dur * 0.06 + dur * 0.4, "power2.inOut");
      m.visible = p > 0; m.scale.z = Math.max(0.001, p);
    });
  }
  const desenhoHub = desenharArestas(hub, 0.4, 2.0);
  const desenhoAreas = areas.map((b, i) => desenharArestas(b, 5.4 + i * 0.12, 1.2));

  return function desenhar(t) {
    desenhoHub(t);
    const cheioHub = prog(t, 2.6, 3.2, "power2.out");
    hub.corpo.material.opacity = cheioHub; hub.topo.material.opacity = cheioHub;
    for (const b of areas) {
      desenhoAreas[b.i](t);
      // antes: soltos e tortos, em traço · depois: alinham num corte duro e ganham corpo
      const u = prog(t, 7.6 + b.i * 0.05, 8.3 + b.i * 0.05, "power3.out");
      b.g.position.set(b.antes[0] + (b.depois[0] - b.antes[0]) * u, b.antes[1] * (1 - u), b.antes[2] + (b.depois[2] - b.antes[2]) * u);
      b.g.rotation.set(b.giro[0] * (1 - u), b.giro[1] * (1 - u), b.giro[2] * (1 - u));
      const cheio = prog(t, 8.3, 8.8, "power2.out");
      b.corpo.material.opacity = cheio; b.topo.material.opacity = cheio;
      // a consultoria acende quando o texto a cita (e fica acesa)
      const aceso = t >= 12.0 + b.i * 0.9 ? 1 : 0;
      b.tx.atualizar(aceso);
      const pulo = prog(t, 12.0 + b.i * 0.9, 12.35 + b.i * 0.9, "power3.out") * (1 - prog(t, 12.35 + b.i * 0.9, 12.8 + b.i * 0.9, "power2.in"));
      b.g.position.y += 0.35 * pulo;
    }
    for (const tr of tracos) { const p = prog(t, tr.t0, tr.t0 + tr.dur, "power2.inOut"); tr.m.visible = p > 0; tr.m.scale.z = Math.max(0.001, p); }
    const pc = prog(t, 19.6, 20.0); pontas.forEach((m) => (m.visible = pc > 0));
    cotaTxt.material.opacity = prog(t, 20.4, 20.8);

    const p = K(t, CAM), a = K(t, ALVO);
    const D = DIST * K(t, AFASTA);
    P.olhar([a[0] + (p[0] - a[0]) * D, a[1] + (p[1] - a[1]) * D, a[2] + (p[2] - a[2]) * D], a);
    if (V) P.enquadrar(0, -0.26); else P.enquadrar(0.21, 0);
    P.render();
  };
});
