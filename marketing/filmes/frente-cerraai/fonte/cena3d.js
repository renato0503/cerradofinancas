// Cerra.AI · "Silício local": o chip do emblema em 3D, numa placa grafite.
// 0-5 as trilhas de cobre se desenham até o chip · 5-10,6 os arquivos descem para dentro dele
// 10,6-15,8 a ficha sobe e o dado pessoal vira tarja · 15,8-21,8 as páginas citadas (p. 2 e 5)
// 21,8-26,8 a fronteira da máquina se desenha em volta de tudo · 26,8 cortina cobre (DOM)
import { THREE, V, K, prog, rng, criarPalco, luzes, ambiente, textura, caixaArredondada, carregarFontes, rodar, clamp } from "./palco3d.js";

const COBRE = "#e2873b", GRAFITE = "#0d0f0e", TINTA = "#f1ece3", SUAVE = "#a39d93";
const PI = Math.PI;

rodar(async () => {
  await carregarFontes(["900 80px Archivo", "600 30px 'JetBrains Mono'", "500 30px Archivo"]);
  const P = criarPalco({ fundo: GRAFITE, fov: V ? 46 : 30 });
  const { cena, camera, renderer } = P;
  await ambiente(renderer, cena, 0.55);
  luzes(cena, { chave: "#fff0dc", recorte: "#ffd9b8", ceu: "#fff4e8", chao: "#0d0f0e", forca: 0.9, sombra: 7 });

  const matCobre = new THREE.MeshStandardMaterial({ color: COBRE, metalness: 0.75, roughness: 0.38 });
  const matPlaca = new THREE.MeshStandardMaterial({ color: "#121514", roughness: 0.95, metalness: 0 });
  const matCorpo = new THREE.MeshStandardMaterial({ color: "#1b1f1d", roughness: 0.55, metalness: 0.2 });
  const matFuro = new THREE.MeshStandardMaterial({ color: GRAFITE, roughness: 0.9 });

  // ---- a placa ----
  const placa = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), matPlaca);
  placa.rotation.x = -PI / 2;
  placa.receiveShadow = true;
  cena.add(placa);

  // ---- o chip (o mesmo desenho do emblema: corpo, moldura, núcleo e 3 pinos por lado) ----
  const chip = new THREE.Group();
  cena.add(chip);
  const corpo = new THREE.Mesh(caixaArredondada(1.9, 1.9, 0.3, 0.16, 0.04), matCorpo);
  corpo.rotation.x = -PI / 2; corpo.position.y = 0.15; corpo.castShadow = true; corpo.receiveShadow = true;
  chip.add(corpo);
  const anel = new THREE.Shape();
  const qa = (s, l, r) => { s.moveTo(-l + r, -l); s.lineTo(l - r, -l); s.quadraticCurveTo(l, -l, l, -l + r); s.lineTo(l, l - r); s.quadraticCurveTo(l, l, l - r, l); s.lineTo(-l + r, l); s.quadraticCurveTo(-l, l, -l, l - r); s.lineTo(-l, -l + r); s.quadraticCurveTo(-l, -l, -l + r, -l); };
  qa(anel, 0.74, 0.1);
  const furo = new THREE.Path(); qa(furo, 0.6, 0.06); anel.holes.push(furo);
  const moldura = new THREE.Mesh(new THREE.ExtrudeGeometry(anel, { depth: 0.05, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 2 }), matCobre);
  moldura.rotation.x = -PI / 2; moldura.position.y = 0.3; moldura.castShadow = true;
  chip.add(moldura);
  const nucleo = new THREE.Mesh(caixaArredondada(0.86, 0.86, 0.14, 0.06, 0.025), matCobre);
  nucleo.rotation.x = -PI / 2; nucleo.position.y = 0.33; nucleo.castShadow = true;
  chip.add(nucleo);
  const LADOS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const OFF = [-0.5, 0, 0.5];
  LADOS.forEach(([dx, dz]) => OFF.forEach((o) => {
    const pino = new THREE.Mesh(new THREE.BoxGeometry(dx ? 0.36 : 0.09, 0.06, dz ? 0.36 : 0.09), matCobre);
    pino.position.set(dx * 1.06 + (dz ? o : 0), 0.08, dz * 1.06 + (dx ? o : 0));
    pino.castShadow = true;
    chip.add(pino);
  }));

  // ---- as trilhas: tubos rasos que se desenham (drawRange) e terminam num terminal redondo ----
  const R = rng(7);
  const LIM = 4.9; // tudo termina dentro da fronteira (5,3)
  const trilhas = [];
  function trilha(pontos, t0, dur) {
    const cam = new THREE.CurvePath();
    for (let i = 1; i < pontos.length; i++) cam.add(new THREE.LineCurve3(pontos[i - 1], pontos[i]));
    const seg = 90, rad = 6;
    const g = new THREE.TubeGeometry(cam, seg, 0.03, rad, false);
    const m = new THREE.Mesh(g, matCobre);
    m.castShadow = false; m.receiveShadow = true;
    cena.add(m);
    const fim = pontos[pontos.length - 1];
    const term = new THREE.Group();
    const a = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.05, 24), matCobre);
    const b = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.052, 16), matFuro);
    term.add(a, b);
    term.position.set(fim.x, 0.03, fim.z);
    cena.add(term);
    trilhas.push({ m, g, seg, rad, t0, dur, term });
  }
  const v3 = (x, z) => new THREE.Vector3(x, 0.03, z);
  const limitar = (p) => v3(clamp(p.x, -LIM, LIM), clamp(p.z, -LIM, LIM));
  // 12 trilhas que saem dos pinos
  let n = 0;
  LADOS.forEach(([dx, dz]) => OFF.forEach((o) => {
    const qx = dz ? 1 : 0, qz = dx ? 1 : 0;
    const s = v3(dx * 1.24 + qx * o, dz * 1.24 + qz * o);
    const l1 = 0.35 + R() * 0.9, l2 = 0.5 + R() * 1.2, l3 = 0.6 + R() * 2.4;
    const sg = o === 0 ? (R() > 0.5 ? 1 : -1) : Math.sign(o);
    const p1 = v3(s.x + dx * l1, s.z + dz * l1);
    const p2 = v3(p1.x + (dx + qx * sg) * l2 * 0.7071, p1.z + (dz + qz * sg) * l2 * 0.7071);
    const p3 = limitar(v3(p2.x + dx * l3, p2.z + dz * l3));
    trilha([s, p1, p2, p3], 0.15 + n * 0.09, 1.7);
    n++;
  }));
  // 16 trilhas soltas, mais longe, para encher a placa
  for (let i = 0; i < 16; i++) {
    const [dx, dz] = LADOS[i % 4];
    const qx = dz ? 1 : 0, qz = dx ? 1 : 0;
    const off = (R() * 2 - 1) * 3.6;
    const r0 = 2.0 + R() * 1.4;
    const s = v3(dx * r0 + qx * off, dz * r0 + qz * off);
    const sg = R() > 0.5 ? 1 : -1;
    const l1 = 0.3 + R() * 0.8, l2 = 0.4 + R() * 0.9;
    const p1 = v3(s.x + dx * l1, s.z + dz * l1);
    const p2 = v3(p1.x + (dx + qx * sg) * l2 * 0.7071, p1.z + (dz + qz * sg) * l2 * 0.7071);
    const p3 = limitar(v3(p2.x + dx * 4, p2.z + dz * 4));
    if (Math.max(Math.abs(s.x), Math.abs(s.z)) > LIM - 0.4) continue;
    trilha([s, p1, p2, p3], 0.5 + i * 0.1, 2.0);
  }

  // ---- os arquivos ----
  function pintarDoc(ctx, w, h, tipo, nome) {
    ctx.fillStyle = TINTA; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = COBRE; ctx.fillRect(36, 36, 190, 92);
    ctx.fillStyle = GRAFITE; ctx.font = "900 54px Archivo"; ctx.textBaseline = "middle"; ctx.fillText(tipo, 52, 84);
    ctx.font = "600 26px 'JetBrains Mono'"; ctx.fillStyle = "#3a3a36"; ctx.fillText(nome, 36, 170);
    ctx.fillStyle = "#cfc7b9";
    if (tipo === "MP3") {
      for (let i = 0; i < 26; i++) { const a = 30 + Math.abs(Math.sin(i * 1.7) * 150) + (i % 3) * 20; ctx.fillRect(40 + i * 17, 400 - a / 2, 10, a); }
    } else if (tipo === "XLSX") {
      ctx.strokeStyle = "#cfc7b9"; ctx.lineWidth = 3;
      for (let r = 0; r < 9; r++) { ctx.beginPath(); ctx.moveTo(36, 230 + r * 48); ctx.lineTo(w - 36, 230 + r * 48); ctx.stroke(); }
      for (let c = 0; c < 5; c++) { ctx.beginPath(); ctx.moveTo(36 + c * 110, 230); ctx.lineTo(36 + c * 110, 230 + 8 * 48); ctx.stroke(); }
    } else if (tipo === "JPG") {
      ctx.fillRect(36, 220, w - 72, 330);
      ctx.fillStyle = "#b5ab9a"; ctx.beginPath(); ctx.moveTo(60, 530); ctx.lineTo(200, 340); ctx.lineTo(300, 450); ctx.lineTo(370, 380); ctx.lineTo(w - 60, 530); ctx.fill();
      ctx.beginPath(); ctx.arc(380, 290, 34, 0, 7); ctx.fill();
    } else {
      for (let i = 0; i < 10; i++) ctx.fillRect(36, 230 + i * 40, (i % 4 === 3 ? 260 : w - 72) - (i * 13) % 60, 16);
      if (nome.includes("escaneado")) { ctx.fillStyle = "rgba(60,50,30,.08)"; ctx.fillRect(0, 0, w, h); }
    }
  }
  const DOCS = [["PDF", "contrato.pdf"], ["PDF", "laudo_escaneado.pdf"], ["DOCX", "ata.docx"], ["XLSX", "carteira.xlsx"], ["JPG", "nota.jpg"], ["MP3", "reuniao.mp3"]];
  const matPapel = new THREE.MeshStandardMaterial({ color: "#e6dfd2", roughness: 0.9 });
  const docs = DOCS.map(([tipo, nome], i) => {
    const tx = textura(512, 680, (ctx, w, h) => pintarDoc(ctx, w, h, tipo, nome));
    const topo = new THREE.MeshStandardMaterial({ map: tx.tex, roughness: 0.85 });
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.025, 1.2), [matPapel, matPapel, topo, matPapel, matPapel, matPapel]);
    m.castShadow = true;
    m.visible = false;
    cena.add(m);
    const a = -0.35 + i * 0.36;
    return { m, i, t0: 5.3 + i * 0.6, ini: [Math.sin(a) * 7.5 + 2, 4.2 + (i % 2) * 0.9, -Math.cos(a) * 6 - 1], giro: [(R() - 0.5) * 2.2, (R() - 0.5) * 3, (R() - 0.5) * 2.2] };
  });

  // ---- a ficha (anonimização) ----
  const CAMPOS = [["Nome", "Fulano de Tal"], ["CPF", "000.000.000-00"], ["Endereço", "Rua Exemplo, 100"], ["Telefone", "(00) 00000-0000"]];
  const ficha = textura(900, 1200, (ctx, w, h, tarjas = [0, 0, 0, 0]) => {
    ctx.fillStyle = TINTA; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = GRAFITE; ctx.font = "900 62px Archivo"; ctx.textBaseline = "alphabetic"; ctx.fillText("FICHA DE CADASTRO", 60, 130);
    ctx.fillStyle = "#cfc7b9"; ctx.fillRect(60, 165, w - 120, 6);
    CAMPOS.forEach(([rot, val], i) => {
      const y = 290 + i * 190;
      ctx.font = "600 34px 'JetBrains Mono'"; ctx.fillStyle = "#8a8378"; ctx.fillText(rot.toUpperCase(), 60, y);
      ctx.font = "500 58px Archivo"; ctx.fillStyle = "#1d1d1a"; ctx.fillText(val, 60, y + 82);
      const lw = ctx.measureText(val).width + 24;
      const p = tarjas[i];
      if (p > 0) { ctx.fillStyle = COBRE; ctx.fillRect(48, y + 22, lw * p, 82); }
    });
    ctx.fillStyle = "#cfc7b9";
    for (let i = 0; i < 3; i++) ctx.fillRect(60, 1060 + i * 34, w - 120 - i * 140, 14);
  });
  const fichaM = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 2.0), new THREE.MeshStandardMaterial({ map: ficha.tex, roughness: 0.85 }));
  fichaM.castShadow = true;
  const fichaG = new THREE.Group(); fichaG.add(fichaM); cena.add(fichaG);

  // ---- as páginas citadas (p. 2 e p. 5) ----
  function pagina(numero) {
    return textura(800, 1060, (ctx, w, h, grifo = 0) => {
      ctx.fillStyle = TINTA; ctx.fillRect(0, 0, w, h);
      ctx.font = "600 30px 'JetBrains Mono'"; ctx.fillStyle = "#6f685d"; ctx.textBaseline = "alphabetic";
      ctx.fillText("calendario_fiscal.pdf", 50, 80);
      ctx.fillStyle = GRAFITE; ctx.font = "900 64px Archivo"; ctx.fillText(`p. ${numero}`, 50, 170);
      for (let i = 0; i < 14; i++) {
        const y = 240 + i * 54;
        const larg = w - 100 - ((i * 37) % 120);
        if (i === (numero === 2 ? 5 : 8) && grifo > 0) { ctx.fillStyle = COBRE; ctx.fillRect(40, y - 12, (larg + 20) * grifo, 42); }
        ctx.fillStyle = "#c9c1b2"; ctx.fillRect(50, y, larg, 18);
      }
    });
  }
  const pags = [2, 5].map((num, i) => {
    const tx = pagina(num);
    const m = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.99), new THREE.MeshStandardMaterial({ map: tx.tex, roughness: 0.85 }));
    m.castShadow = true;
    const g = new THREE.Group(); g.add(m); cena.add(g);
    return { g, m, tx, i };
  });

  // ---- a fronteira da máquina: 12 arestas que se desenham ----
  const LADO = 10.6, ALT = 2.4;
  const arestas = [];
  const cantos = [];
  for (const sx of [-1, 1]) for (const sy of [0, 1]) for (const sz of [-1, 1]) cantos.push([sx * LADO / 2, sy * ALT, sz * LADO / 2]);
  const pares = [];
  for (let a = 0; a < 8; a++) for (let b = a + 1; b < 8; b++) {
    const d = [0, 1, 2].filter((k) => cantos[a][k] !== cantos[b][k]);
    if (d.length === 1) pares.push([a, b]);
  }
  pares.sort((p, q) => (cantos[p[0]][1] + cantos[p[1]][1]) - (cantos[q[0]][1] + cantos[q[1]][1]));
  pares.forEach(([a, b], i) => {
    const A = new THREE.Vector3(...cantos[a]), B = new THREE.Vector3(...cantos[b]);
    const len = A.distanceTo(B);
    const g = new THREE.BoxGeometry(0.06, 0.06, len);
    g.translate(0, 0, len / 2);
    const m = new THREE.Mesh(g, matCobre);
    m.position.copy(A);
    m.lookAt(B);
    m.visible = false;
    cena.add(m);
    arestas.push({ m, t0: 22.2 + i * 0.12 });
  });

  const cubo = (s) => new THREE.Mesh(new THREE.BoxGeometry(s, s, s), matCobre);
  const marcos = cantos.map((c, i) => { const m = cubo(0.16); m.position.set(...c); m.visible = false; cena.add(m); return { m, t0: 22.2 + i * 0.08 }; });

  // ---- câmera ----
  const CAM = [
    [0, [0, 14, 0.8]], [4.4, [0, 5.4, 7.4], "power3.inOut"], [5.2, [2.4, 4.4, 6.6]], [10.3, [3.4, 3.7, 5.8], "none"],
    [11.1, [0.9, 2.6, 5.6], "power3.inOut"], [15.5, [1.5, 2.3, 5.0], "none"],
    [16.2, [-1.2, 3.5, 5.8], "power3.inOut"], [21.4, [-0.6, 3.2, 5.2], "none"],
    [22.4, [0, 10.5, 14.5], "power3.inOut"], [26.8, [3.2, 9.4, 13.6], "none"], [32, [3.6, 9.2, 13.2], "none"],
  ];
  const ALVO = [
    [0, [0, 0, 0]], [4.4, [0, 0.2, 0]], [5.2, [0, 0.7, 0]], [10.3, [0, 0.7, 0]],
    [11.1, [0, 1.55, 0.2]], [15.5, [0, 1.55, 0.2]], [16.2, [0, 1.3, 0]], [21.4, [0, 1.3, 0]],
    [22.4, [0, 0.6, 0]], [32, [0, 0.6, 0]],
  ];
  // enquadramento: no 16:9 o objeto vai para a direita do texto; no 9:16, para cima
  const QUADRO = V ? [[0, -0.27], [32, -0.27]] : [[0, 0.2], [32, 0.2]];
  const DIST = V ? 1.25 : 1; // no vertical a câmera recua para caber na largura

  return function desenhar(t) {
    // trilhas e terminais
    for (const tr of trilhas) {
      const p = prog(t, tr.t0, tr.t0 + tr.dur, "power2.inOut");
      tr.g.setDrawRange(0, Math.floor(p * tr.seg) * tr.rad * 6);
      tr.m.visible = p > 0;
      const s = prog(t, tr.t0 + tr.dur - 0.05, tr.t0 + tr.dur + 0.3, "back.out(2)");
      tr.term.visible = s > 0.001;
      tr.term.scale.setScalar(Math.max(0.001, s));
    }
    // o chip sobe da placa
    const sobe = prog(t, 2.6, 3.8, "power4.out");
    chip.position.y = -0.34 + 0.34 * sobe;
    // o núcleo afunda um pouco a cada arquivo que entra
    let pulso = 0;
    docs.forEach((d) => { const x = t - (d.t0 + 1.75); if (x > 0) pulso += Math.exp(-9 * x) * Math.sin(Math.min(x * 30, PI)); });
    nucleo.position.y = 0.33 - 0.05 * pulso;

    // arquivos: chegam em arco, pairam sobre o chip e descem para dentro dele
    for (const d of docs) {
      const u = prog(t, d.t0, d.t0 + 1.3, "power3.out");
      const v = prog(t, d.t0 + 1.3, d.t0 + 1.75, "power3.in");
      d.m.visible = u > 0 && v < 1;
      if (!d.m.visible) continue;
      const pairar = [0, 1.25 + d.i * 0.04, 0];
      const x = d.ini[0] + (pairar[0] - d.ini[0]) * u;
      const z = d.ini[2] + (pairar[2] - d.ini[2]) * u;
      const y = d.ini[1] + (pairar[1] - d.ini[1]) * u + Math.sin(u * PI) * 0.8;
      d.m.position.set(x, y + (0.4 - y) * v, z);
      d.m.rotation.set(d.giro[0] * (1 - u), d.giro[1] * (1 - u) + d.i * 0.07, d.giro[2] * (1 - u));
      d.m.scale.setScalar(1 - 0.85 * v);
    }

    // a ficha: sobe deitada, fica de pé (até -6°, nunca passa dos 90°), recebe as tarjas e volta
    const fs = prog(t, 10.7, 11.6, "power4.out");
    const fd = prog(t, 15.2, 15.8, "power3.in");
    fichaG.visible = fs > 0 && fd < 1;
    fichaG.position.set(0, 0.35 + 1.35 * fs - 1.3 * fd, 0.2);
    fichaM.rotation.x = -PI / 2 + (PI / 2 - 0.1) * fs;
    fichaG.rotation.y = -0.28 * prog(t, 11.2, 15.6, "sine.inOut"); // gira devagar enquanto as tarjas caem
    fichaG.scale.setScalar(0.4 + 0.6 * fs - 0.6 * fd);
    ficha.atualizar(CAMPOS.map((_, i) => Math.round(prog(t, 12.0 + i * 0.45, 12.4 + i * 0.45, "power2.inOut") * 40) / 40));

    // as páginas citadas
    for (const p of pags) {
      const s = prog(t, 16.4 + p.i * 0.35, 17.3 + p.i * 0.35, "power4.out");
      const sai = prog(t, 21.2, 21.8, "power3.in");
      p.g.visible = s > 0 && sai < 1;
      const lado = p.i === 0 ? -1 : 1;
      p.g.position.set(lado * 0.88 + (V ? 0 : 0.35), 0.35 + 1.0 * s - 1.0 * sai, 0.1 - p.i * 0.05);
      p.g.rotation.y = -lado * 0.16 * s;
      p.m.rotation.x = -PI / 2 + (PI / 2 - 0.14) * s;
      p.g.scale.setScalar(Math.max(0.001, 0.5 + 0.5 * s - 0.5 * sai));
      p.tx.atualizar(Math.round(prog(t, 19.0 + p.i * 0.25, 19.6 + p.i * 0.25, "power2.inOut") * 30) / 30);
    }

    // a fronteira
    for (const a of arestas) {
      const p = prog(t, a.t0, a.t0 + 0.55, "power3.inOut");
      a.m.visible = p > 0;
      a.m.scale.set(1, 1, Math.max(0.001, p));
    }
    for (const c of marcos) {
      const p = prog(t, c.t0, c.t0 + 0.35, "back.out(2)");
      c.m.visible = p > 0;
      c.m.scale.setScalar(Math.max(0.001, p));
    }

    // câmera, com um respiro lento
    const pos = K(t, CAM), alvo = K(t, ALVO);
    const resp = Math.sin(t * 0.35) * 0.08;
    P.olhar([pos[0] * DIST + resp, pos[1] * DIST, pos[2] * DIST], alvo);
    const q = K(t, QUADRO);
    if (V) P.enquadrar(0, q); else P.enquadrar(q, 0);
    P.render();
  };
});
