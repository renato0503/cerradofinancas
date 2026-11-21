// CerraFood · "Comanda / Order journey": a câmera percorre o balcão, como o pedido.
// 0-11,5 a impressora térmica imprime a comanda (o papel sai e se curva) · 11,5-17 as comandas penduradas
// com a cor da espera · 17-22,5 a pizza se abre em fatias (ficha técnica) · 22,5-27 site, app e totem com
// três marcas de exemplo · 27 cortina de papel em círculo (DOM)
import { THREE, V, K, prog, criarPalco, luzes, ambiente, textura, caixaArredondada, carregarFontes, rodar, rng } from "./palco3d.js";

const MATA = "#0f2a16", LARANJA = "#f39200", FOLHA = "#3dbb2f", TOMATE = "#e0472b", PAPEL = "#fbf6ea", AMARELO = "#f3c623";
const PI = Math.PI;

rodar(async () => {
  await carregarFontes(["800 80px Outfit", "500 30px 'DM Mono'", "400 30px 'DM Mono'"]);
  const P = criarPalco({ fundo: MATA, fov: V ? 44 : 30, tom: false });
  const { cena, renderer } = P;
  await ambiente(renderer, cena, 0.5);
  luzes(cena, { chave: "#fff4e0", recorte: "#d8ffd0", ceu: "#ffffff", chao: "#0f2a16", forca: 0.95, sombra: 9 });

  const chao = new THREE.Mesh(new THREE.PlaneGeometry(120, 80), new THREE.MeshBasicMaterial({ color: MATA }));
  chao.rotation.x = -PI / 2; chao.position.x = 10; cena.add(chao);
  const sombra = new THREE.Mesh(new THREE.PlaneGeometry(120, 80), new THREE.ShadowMaterial({ color: "#000000", opacity: 0.35 }));
  sombra.rotation.x = -PI / 2; sombra.position.set(10, 0.002, 0); sombra.receiveShadow = true; cena.add(sombra);
  const lit = (o) => { o.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); return o; };

  // ---- estação 1: a impressora térmica e a comanda ----
  const impressora = new THREE.Group(); cena.add(impressora);
  const matImp = new THREE.MeshStandardMaterial({ color: "#26302a", roughness: 0.5, metalness: 0.2 });
  const corpo = new THREE.Mesh(caixaArredondada(2.0, 1.5, 1.0, 0.22, 0.06), matImp);
  corpo.position.set(0, 0.5, 0); corpo.rotation.x = -PI / 2; impressora.add(corpo);
  const tampa = new THREE.Mesh(caixaArredondada(1.9, 0.9, 0.12, 0.2, 0.04), new THREE.MeshStandardMaterial({ color: "#3a463e", roughness: 0.4 }));
  tampa.rotation.x = -PI / 2; tampa.position.set(0, 1.03, -0.25); impressora.add(tampa);
  const led = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.02, 16), new THREE.MeshBasicMaterial({ color: FOLHA }));
  led.position.set(0.75, 1.02, 0.55); impressora.add(led);
  const fenda = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.03, 0.05), new THREE.MeshBasicMaterial({ color: "#0a0f0b" }));
  fenda.position.set(0, 1.015, 0.28); impressora.add(fenda);
  lit(impressora);

  const LINHAS = [
    ["c", "COMANDA #0427"], ["c", "MESA 07 · BALCÃO"], ["-"],
    ["l", "1x Pizza G meio a meio"], ["l", "   1/2 Calabresa"], ["l", "   1/2 Margherita"], ["l", "   borda: catupiry"],
    ["l", "1x Hambúrguer da casa"], ["l", "2x Refrigerante lata"], ["-"],
    ["l", "Pagamento: PIX"], ["l", "Entrega: pelo link"], ["-"], ["c", "exemplo ilustrativo"], ["x"],
  ];
  const COMP = 2.5; // comprimento total da comanda (unidades)
  const comandaTx = textura(512, 1500, (ctx, w, h) => {
    ctx.fillStyle = PAPEL; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#1e1e1a"; ctx.textBaseline = "middle";
    let y = 80;
    for (const [tipo, txt] of LINHAS) {
      if (tipo === "-") { ctx.font = "400 30px 'DM Mono'"; ctx.fillText("- - - - - - - - - - - - - - - - -", 22, y); }
      else if (tipo === "x") { ctx.fillStyle = "#8a8578"; ctx.font = "400 28px 'DM Mono'"; ctx.fillText("✂ · · · · · · · · · · · · ·", 30, y); }
      else { ctx.font = tipo === "c" ? "500 36px 'DM Mono'" : "400 31px 'DM Mono'"; ctx.textAlign = tipo === "c" ? "center" : "left"; ctx.fillText(txt, tipo === "c" ? w / 2 : 26, y); ctx.textAlign = "left"; }
      y += 92;
    }
  });
  // a fita de papel: geometria refeita a cada quadro (sobe da fenda e se curva para a frente)
  const SEG = 80, LARG = 1.0;
  const fita = new THREE.PlaneGeometry(LARG, 1, 1, SEG);
  // frente impressa e verso liso (o verso nunca mostra o texto ao avesso; regra 18 do HISTORICO)
  const fitaM = new THREE.Mesh(fita, new THREE.MeshStandardMaterial({ map: comandaTx.tex, roughness: 0.85, side: THREE.FrontSide }));
  const versoM = new THREE.Mesh(fita, new THREE.MeshStandardMaterial({ color: "#e9e3d4", roughness: 0.9, side: THREE.BackSide }));
  fitaM.castShadow = true; cena.add(fitaM, versoM);
  const pFita = fita.attributes.position, uvFita = fita.attributes.uv;
  function moldarFita(L) {
    const RAIO = 0.75, RETO = 1.1;
    const AMAX = 0.42 * PI; // a curva para em 75°: o papel nunca passa dos 90°
    for (let j = 0; j <= SEG; j++) {
      const s = (j / SEG) * L; // da fenda até a ponta
      let y, z;
      if (s <= RETO) { y = s; z = 0; }
      else {
        const a = Math.min((s - RETO) / RAIO, AMAX);
        y = RETO + Math.sin(a) * RAIO; z = (1 - Math.cos(a)) * RAIO;
        const resto = s - RETO - a * RAIO;
        if (resto > 0) { y += resto * Math.cos(AMAX); z += resto * Math.sin(AMAX); }
      }
      const v = 1 - (L - s) / COMP;
      for (let k = 0; k < 2; k++) {
        const idx = j * 2 + k; // PlaneGeometry: linhas de cima para baixo; usamos j de baixo para cima
        const i = (SEG - j) * 2 + k;
        pFita.setXYZ(i, (k - 0.5) * LARG, 1.03 + y, 0.28 + z);
        uvFita.setXY(i, k, v);
      }
    }
    pFita.needsUpdate = true; uvFita.needsUpdate = true;
    fita.computeVertexNormals();
  }

  // ---- estação 2: as comandas penduradas na régua da cozinha ----
  const X2 = 7.5;
  const trilho = lit(new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 5.2, 16), new THREE.MeshStandardMaterial({ color: "#c9cfc8", roughness: 0.25, metalness: 0.9 })));
  trilho.rotation.z = PI / 2; trilho.position.set(X2, 3.1, 0); cena.add(trilho);
  for (const sx of [-2.5, 2.5]) { const p = lit(new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 3.1, 12), trilho.material)); p.position.set(X2 + sx, 1.55, 0); cena.add(p); }
  const ESPERAS = [[FOLHA, "08 min", "no tempo"], [AMARELO, "19 min", "atenção"], [TOMATE, "31 min", "atrasado"]];
  const tickets = ESPERAS.map(([cor, min, est], i) => {
    const tx = textura(400, 560, (ctx, w, h) => {
      ctx.fillStyle = PAPEL; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = cor; ctx.fillRect(0, 0, w, 120);
      ctx.fillStyle = cor === AMARELO ? "#1e1e1a" : "#ffffff"; ctx.font = "800 64px Outfit"; ctx.fillText(min, 26, 84);
      ctx.fillStyle = "#1e1e1a"; ctx.font = "500 30px 'DM Mono'"; ctx.fillText(`PEDIDO #04${2 + i}${7 - i}`, 26, 180);
      ctx.font = "400 26px 'DM Mono'"; ctx.fillStyle = "#4a4a42";
      ["1x Pizza G", "1x Porção", "2x Suco"].forEach((l, k) => ctx.fillText(l, 26, 250 + k * 50));
      ctx.fillStyle = cor === AMARELO ? "#8a6d00" : cor; ctx.font = "800 40px Outfit"; ctx.fillText(est, 26, 500);
    });
    const g = new THREE.Group();
    const m = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.68), new THREE.MeshStandardMaterial({ map: tx.tex, roughness: 0.85, side: THREE.DoubleSide }));
    m.position.y = -0.95; m.castShadow = true;
    const prendedor = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.2, 0.12), new THREE.MeshStandardMaterial({ color: "#c9cfc8", metalness: 0.9, roughness: 0.3 }));
    prendedor.position.y = -0.08;
    g.add(m, prendedor); lit(g);
    g.position.set(X2 + (i - 1) * 1.55, 3.05, 0.05); cena.add(g);
    return { g, i };
  });

  // ---- estação 3: a pizza em 8 fatias ----
  const X3 = 15;
  const R = rng(11);
  const matMassa = new THREE.MeshStandardMaterial({ color: "#d99a4e", roughness: 0.8 });
  const matQueijo = new THREE.MeshStandardMaterial({ color: "#f4cf6a", roughness: 0.6 });
  const matMolho = new THREE.MeshStandardMaterial({ color: TOMATE, roughness: 0.6 });
  const matCala = new THREE.MeshStandardMaterial({ color: "#a83a2a", roughness: 0.55 });
  const matFolha = new THREE.MeshStandardMaterial({ color: "#2f8a2a", roughness: 0.6 });
  const tabua = lit(new THREE.Mesh(new THREE.CylinderGeometry(2.25, 2.25, 0.1, 96), new THREE.MeshStandardMaterial({ color: "#8a5a2e", roughness: 0.75 })));
  tabua.position.set(X3, 0.05, 0); cena.add(tabua);
  const fatias = [];
  for (let i = 0; i < 8; i++) {
    const a0 = (i * PI) / 4, da = PI / 4 - 0.012;
    const g = new THREE.Group();
    const massa = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 1.9, 0.14, 24, 1, false, a0, da), matMassa); massa.position.y = 0.07;
    const borda = new THREE.Mesh(new THREE.TorusGeometry(1.84, 0.1, 10, 24, da), matMassa);
    borda.rotation.x = -PI / 2; borda.rotation.z = a0 - PI / 2; borda.position.y = 0.16;
    const molho = new THREE.Mesh(new THREE.CylinderGeometry(1.74, 1.74, 0.03, 24, 1, false, a0, da), matMolho); molho.position.y = 0.155;
    const queijo = new THREE.Mesh(new THREE.CylinderGeometry(1.68, 1.68, 0.04, 24, 1, false, a0, da), matQueijo); queijo.position.y = 0.18;
    g.add(massa, borda, molho, queijo);
    const meio = i < 4; // meio a meio: calabresa numa metade, manjericão na outra
    for (let k = 0; k < 4; k++) {
      const ang = a0 + 0.12 + R() * (da - 0.24), r = 0.45 + R() * 1.05;
      const top = new THREE.Mesh(meio ? new THREE.CylinderGeometry(0.17, 0.17, 0.05, 20) : new THREE.SphereGeometry(0.11, 12, 8), meio ? matCala : matFolha);
      if (!meio) top.scale.set(1.3, 0.35, 0.8);
      top.position.set(Math.sin(ang) * r, 0.22, Math.cos(ang) * r);
      g.add(top);
    }
    lit(g); g.position.set(X3, 0.1, 0); cena.add(g);
    fatias.push({ g, meio: a0 + da / 2, i });
  }

  // ---- estação 4: site, app e totem, cada um com uma marca de exemplo ----
  const X4 = 22.5;
  function tela(nome, cor, larg, alt) {
    return textura(Math.round(larg * 300), Math.round(alt * 300), (ctx, w, h) => {
      ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = cor; ctx.fillRect(0, 0, w, h * 0.2);
      ctx.fillStyle = "#ffffff"; ctx.font = `800 ${Math.round(w / 9)}px Outfit`; ctx.textBaseline = "middle"; ctx.fillText(nome, w * 0.07, h * 0.1);
      ctx.fillStyle = "#eee8da";
      for (let k = 0; k < 4; k++) { const y = h * (0.27 + k * 0.13); ctx.fillRect(w * 0.07, y, w * 0.86, h * 0.1); ctx.fillStyle = cor; ctx.globalAlpha = 0.25; ctx.fillRect(w * 0.07, y, h * 0.1, h * 0.1); ctx.globalAlpha = 1; ctx.fillStyle = "#eee8da"; }
      ctx.fillStyle = cor; const bw = w * 0.86, bh = h * 0.09; ctx.fillRect(w * 0.07, h * 0.85, bw, bh);
      ctx.fillStyle = "#ffffff"; ctx.font = `800 ${Math.round(bh * 0.55)}px Outfit`; ctx.textAlign = "center"; ctx.fillText("Pedir", w / 2, h * 0.85 + bh / 2);
    });
  }
  const matAp = new THREE.MeshStandardMaterial({ color: "#1b1f1c", roughness: 0.35, metalness: 0.4 });
  function aparelho(larg, alt, prof, tx) {
    const g = new THREE.Group();
    const c = new THREE.Mesh(caixaArredondada(larg, alt, prof, Math.min(larg, alt) * 0.08, 0.02), matAp);
    const s = new THREE.Mesh(new THREE.PlaneGeometry(larg * 0.9, alt * 0.92), new THREE.MeshStandardMaterial({ map: tx.tex, roughness: 0.3 }));
    s.position.z = prof / 2 + 0.002;
    g.add(c, s); lit(g); cena.add(g); return g;
  }
  const site = aparelho(2.6, 1.7, 0.08, tela("Seu Restaurante", TOMATE, 2.6, 1.7));
  const app = aparelho(0.95, 1.9, 0.1, tela("Sua Marca", "#1f6feb", 0.95, 1.9));
  const totem = aparelho(1.25, 2.5, 0.16, tela("Seu Nome Aqui", "#7a3cc2", 1.25, 2.5));
  const pe = lit(new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.2, 16), matAp)); cena.add(pe);
  const base = lit(new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.6, 0.08, 32), matAp)); cena.add(base);
  const APS = [
    { g: site, pos: [X4 - 1.55, 1.25, -0.6], rot: 0.35, t0: 23.0 },
    { g: app, pos: [X4 + 0.15, 1.05, 0.7], rot: 0.05, t0: 23.3 },
    { g: totem, pos: [X4 + 1.95, 2.45, -0.2], rot: -0.32, t0: 23.6 },
  ];

  // câmera: trilha ao longo do balcão
  const CAM = [
    [0, [1.8, 2.6, 6.2]], [5, [2.6, 3.6, 7.0], "power2.inOut"], [11.0, [3.0, 4.2, 6.6], "none"],
    [12.0, [X2 + 1.6, 2.6, 8.4], "power3.inOut"], [16.6, [X2 + 2.4, 2.4, 7.8], "none"],
    [17.5, [X3 + 1.4, 5.6, 6.0], "power3.inOut"], [22.2, [X3 + 2.2, 5.0, 5.2], "none"],
    [23.0, [X4 + 0.4, 3.0, 11.0], "power3.inOut"], [27, [X4 + 1.0, 3.0, 10.4], "none"], [32, [X4 + 1.2, 3.0, 10.2], "none"],
  ];
  const ALVO = [
    [0, [0, 1.4, 0.4]], [11.0, [0, 1.6, 0.6]], [12.0, [X2, 2.0, 0]], [16.6, [X2, 2.0, 0]],
    [17.5, [X3, 0.2, 0]], [22.2, [X3, 0.2, 0]], [23.0, [X4, 1.6, 0]], [32, [X4, 1.6, 0]],
  ];
  const DIST = V ? 1.3 : 1;
  const alvoV = new THREE.Vector3();

  return function desenhar(t) {
    // a comanda: imprime em dois tempos (o pedido, depois o pagamento) e balança de leve
    const L = 0.02 + (COMP - 0.02) * (0.55 * prog(t, 0.6, 3.6, "power1.inOut") + 0.45 * prog(t, 5.6, 9.6, "power1.inOut"));
    moldarFita(L);
    led.material.color.set(Math.floor(t * 4) % 2 && t < 9.6 ? LARANJA : FOLHA);
    impressora.position.y = (t > 0.6 && t < 9.6) ? Math.sin(t * 60) * 0.004 : 0; // vibração da impressão

    // as comandas penduradas balançam ao chegar
    for (const k of tickets) {
      const t0 = 12.1 + k.i * 0.35;
      const x = Math.max(0, t - t0);
      k.g.visible = t >= t0;
      k.g.rotation.x = t >= t0 ? 0.5 * Math.exp(-2.4 * x) * Math.cos(5.5 * x) : 0;
      k.g.rotation.z = 0.04 * Math.sin(t * 1.3 + k.i);
    }

    // a pizza: as fatias se afastam do centro e uma sobe (a ficha técnica de uma fatia)
    const abre = prog(t, 18.0, 19.2, "power3.inOut");
    for (const f of fatias) {
      const d = 0.35 * abre;
      const sobe = f.i === 1 ? prog(t, 19.6, 20.6, "back.out(1.15)") : 0;
      f.g.position.set(X3 + Math.sin(f.meio) * (d + 0.5 * sobe), 0.1 + 0.9 * sobe, Math.cos(f.meio) * (d + 0.5 * sobe));
      f.g.rotation.set(0, 0, 0);
      if (sobe) { f.g.rotation.x = 0.25 * sobe; }
    }

    // os aparelhos sobem do balcão e encaixam
    for (const a of APS) {
      const u = prog(t, a.t0, a.t0 + 0.55, "back.out(1.15)");
      a.g.visible = u > 0;
      a.g.position.set(a.pos[0], a.pos[1] - 1.5 * (1 - u), a.pos[2]);
      a.g.rotation.y = a.rot + 0.4 * (1 - u);
      a.g.scale.setScalar(Math.max(0.001, u));
    }
    const ut = prog(t, 23.6, 24.15, "back.out(1.15)");
    pe.visible = base.visible = ut > 0;
    pe.position.set(X4 + 1.95, 0.6 * ut, -0.2); pe.scale.y = Math.max(0.001, ut);
    base.position.set(X4 + 1.95, 0.04, -0.2);

    const p = K(t, CAM), a = K(t, ALVO);
    alvoV.set(a[0], a[1], a[2]);
    // no vertical, a câmera recua a partir do alvo
    P.olhar([a[0] + (p[0] - a[0]) * DIST, a[1] + (p[1] - a[1]) * DIST, a[2] + (p[2] - a[2]) * DIST], a);
    if (V) P.enquadrar(0, -0.26); else P.enquadrar(0.21, 0);
    P.render();
  };
});
