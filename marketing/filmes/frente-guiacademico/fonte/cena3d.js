// Guia Acadêmico · "Artigo": a bússola da logo em 3D, sobre o papel.
// 0-5 a bússola assenta e a agulha oscila até o norte · 5-12,5 a agulha aponta cada frente do Guia
// 12,5-19 os quatro cadernos do protocolo caem empilhados · 19-24,5 vista de cima, a agulha firme no norte
// 24,5-27,5 a câmera contorna · 27,5 cortina de papel (DOM)
import { THREE, V, K, prog, mola, criarPalco, luzes, ambiente, textura, caixaArredondada, carregarFontes, rodar } from "./palco3d.js";

const PAPEL = "#f6f2e9", AZUL = "#1e2a44", OURO = "#a8822a", OURO_CLARO = "#d9b46a", CANETA = "#a8322a";
const PI = Math.PI;
const SETORES = ["Método", "Estatística", "Qualitativa", "Mineração", "IA ética", "Formatação"];

rodar(async () => {
  await carregarFontes(["600 80px Newsreader", "italic 400 60px Newsreader", "500 30px 'DM Mono'"]);
  const P = criarPalco({ fundo: PAPEL, fov: V ? 44 : 30, tom: false });
  const { cena, renderer } = P;
  await ambiente(renderer, cena, 0.5);
  luzes(cena, { chave: "#fffaf0", recorte: "#e8ecf8", ceu: "#ffffff", chao: "#8a7f6a", forca: 0.85, sombra: 7 });

  // o papel: cor exata da marca, com a sombra por cima
  const chao = new THREE.Mesh(new THREE.PlaneGeometry(90, 90), new THREE.MeshBasicMaterial({ color: PAPEL }));
  chao.rotation.x = -PI / 2; cena.add(chao);
  const sombra = new THREE.Mesh(new THREE.PlaneGeometry(90, 90), new THREE.ShadowMaterial({ color: "#3a3020", opacity: 0.22 }));
  sombra.rotation.x = -PI / 2; sombra.position.y = 0.002; sombra.receiveShadow = true; cena.add(sombra);

  // ---- a bússola ----
  const bussola = new THREE.Group(); cena.add(bussola);
  const matAzul = new THREE.MeshStandardMaterial({ color: AZUL, roughness: 0.45, metalness: 0.2 });
  const matOuro = new THREE.MeshStandardMaterial({ color: OURO_CLARO, roughness: 0.32, metalness: 0.85 });
  const caixa = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.06, 0.34, 96), matAzul);
  caixa.position.y = 0.17; caixa.castShadow = true; bussola.add(caixa);
  const aro = new THREE.Mesh(new THREE.TorusGeometry(1.98, 0.085, 24, 128), matOuro);
  aro.rotation.x = PI / 2; aro.position.y = 0.36; aro.castShadow = true; bussola.add(aro);
  const argola = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.06, 16, 48), matOuro);
  argola.position.set(0, 0.36, -2.24); argola.castShadow = true; bussola.add(argola);

  const mostrador = textura(1400, 1400, (ctx, w, h) => {
    const c = w / 2;
    ctx.fillStyle = PAPEL; ctx.beginPath(); ctx.arc(c, c, c, 0, 7); ctx.fill();
    ctx.save(); ctx.translate(c, c);
    // graduação: 72 traços, os de 30° mais longos
    for (let i = 0; i < 72; i++) {
      ctx.save(); ctx.rotate((i * 5 * PI) / 180);
      ctx.fillStyle = AZUL; const longo = i % 6 === 0;
      ctx.fillRect(-2, -c + 26, 4, longo ? 46 : 22);
      ctx.restore();
    }
    // os setores das frentes, a cada 60°
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    SETORES.forEach((s, i) => {
      ctx.save(); ctx.rotate((i * 60 * PI) / 180);
      ctx.fillStyle = OURO; ctx.beginPath(); ctx.moveTo(0, -c + 100); ctx.lineTo(-18, -c + 132); ctx.lineTo(18, -c + 132); ctx.fill();
      ctx.fillStyle = AZUL; ctx.font = "600 64px Newsreader"; ctx.fillText(s, 0, -c + 190);
      ctx.restore();
    });
    // a rosa dos ventos ao centro, em filete
    ctx.strokeStyle = "rgba(30,42,68,.35)"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(0, 0, c - 290, 0, 7); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, c - 310, 0, 7); ctx.stroke();
    ctx.fillStyle = "rgba(168,130,42,.18)";
    for (let i = 0; i < 4; i++) { ctx.save(); ctx.rotate(i * PI / 2 + PI / 4); ctx.beginPath(); ctx.moveTo(0, -c + 330); ctx.lineTo(-40, 0); ctx.lineTo(40, 0); ctx.fill(); ctx.restore(); }
    ctx.fillStyle = CANETA; ctx.font = "italic 400 70px Newsreader"; ctx.fillText("N", 0, -c + 300 - 0);
    ctx.restore();
  });
  const face = new THREE.Mesh(new THREE.CircleGeometry(1.9, 128), new THREE.MeshStandardMaterial({ map: mostrador.tex, roughness: 0.8 }));
  face.rotation.x = -PI / 2; face.position.y = 0.345; face.receiveShadow = true; bussola.add(face);

  // a agulha: metade dourada (norte) e metade marinho, planas e chanfradas
  function metade(comp, cor) {
    const s = new THREE.Shape(); s.moveTo(-0.15, 0); s.lineTo(0, comp); s.lineTo(0.15, 0); s.lineTo(-0.15, 0);
    const g = new THREE.ExtrudeGeometry(s, { depth: 0.04, bevelEnabled: true, bevelThickness: 0.015, bevelSize: 0.015, bevelSegments: 2 });
    const m = new THREE.Mesh(g, cor); m.rotation.x = -PI / 2; m.castShadow = true; return m;
  }
  const agulha = new THREE.Group();
  // a ponta para antes do anel de rótulos: a agulha aponta a frente sem cobrir o nome dela
  agulha.add(metade(1.18, new THREE.MeshStandardMaterial({ color: OURO, roughness: 0.3, metalness: 0.8 })));
  agulha.add(metade(-0.95, matAzul));
  const pino = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.12, 32), matOuro);
  pino.position.y = 0.04; agulha.add(pino);
  agulha.position.y = 0.42; bussola.add(agulha);

  // ---- os cadernos do protocolo ----
  const ETAPAS = [["3.1", "Diagnóstico"], ["3.2", "Proposta"], ["3.3", "Acompanhamento"], ["3.4", "Área do Aluno"]];
  const matPapel = new THREE.MeshStandardMaterial({ color: "#eee8da", roughness: 0.9 });
  const cadernos = ETAPAS.map(([n, nome], i) => {
    const tx = textura(800, 1080, (ctx, w, h) => {
      ctx.fillStyle = i % 2 ? "#fbf8f1" : "#f3eee2"; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = AZUL; ctx.font = "500 30px 'DM Mono'"; ctx.fillText("Cadernos de método", 60, 90);
      ctx.fillRect(60, 112, w - 120, 5); ctx.fillRect(60, 124, w - 120, 2);
      ctx.fillStyle = OURO; ctx.font = "600 230px Newsreader"; ctx.fillText(n, 50, 400);
      ctx.fillStyle = AZUL; ctx.font = "600 84px Newsreader"; ctx.fillText(nome, 60, 540);
      ctx.fillStyle = "rgba(30,42,68,.2)";
      for (let k = 0; k < 8; k++) ctx.fillRect(60, 620 + k * 46, w - 120 - (k * 53) % 160, 12);
    });
    const topo = new THREE.MeshStandardMaterial({ map: tx.tex, roughness: 0.85 });
    const m = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.09, 2.84), [matPapel, matPapel, topo, matPapel, matPapel, matPapel]);
    m.castShadow = true; m.receiveShadow = true;
    cena.add(m);
    return { m, i, t0: 13.4 + i * 0.9, rot: [0.18, -0.12, 0.06, -0.04][i], dx: [0.1, -0.08, 0.06, 0][i] };
  });
  const PILHA = [3.9, 0, 0.4];

  // ---- a agulha: oscila até o norte, depois aponta as frentes (graus no sentido horário) ----
  const ALVOS = [[0.9, 0, 150], [6.0, 0], [6.9, 60], [7.8, 120], [8.7, 180], [9.6, 240], [10.5, 300], [12.0, 360]];
  function angulo(t) {
    let a = ALVOS[0][2];
    let ant = a;
    for (const [ti, alvo] of ALVOS) {
      if (t < ti) break;
      a = ant + (alvo - ant) * mola(t, ti, { freq: 1.6, amort: 3.6 });
      ant = alvo;
    }
    return a;
  }

  const CAM = [
    [0, [0.5, 3.6, 7.2]], [4.6, [0, 5.6, 6.0], "power2.inOut"], [5.4, [0, 7.4, 2.6], "power3.inOut"], [12.2, [0.4, 7.6, 2.2], "none"],
    [13.0, [5.8, 8.0, 10.2], "power3.inOut"], [18.8, [6.6, 8.4, 9.6], "none"], // recuada: a bússola inteira fora da coluna de texto
    [19.6, [0, 8.6, 0.6], "power3.inOut"], [24.3, [0, 8.0, 0.5], "none"],
    [25.0, [-5.6, 4.8, 6.6], "power3.inOut"], [32, [-6.6, 4.6, 5.2], "none"],
  ];
  const ALVO = [[0, [0, 0.3, 0]], [12.2, [0, 0.3, 0]], [13.0, [1.6, 0.4, 0.3]], [18.8, [1.6, 0.4, 0.3]], [19.6, [0, 0.3, 0]], [24.3, [0, 0.3, 0]], [25.0, [1.0, 0.4, 0]], [32, [1.0, 0.4, 0]]];
  const DIST = V ? 1.3 : 1;

  return function desenhar(t) {
    // a bússola chega inclinada e assenta no papel
    const s = prog(t, 0.2, 1.4, "power4.out");
    bussola.position.y = 1.4 * (1 - s);
    bussola.rotation.set(-0.5 * (1 - s), 0.6 * (1 - s), 0.2 * (1 - s));
    agulha.rotation.y = -(angulo(t) * PI) / 180;
    for (const c of cadernos) {
      const u = prog(t, c.t0, c.t0 + 0.6, "power4.out");
      c.m.visible = u > 0;
      c.m.position.set(PILHA[0] + c.dx, 0.05 + c.i * 0.1 + 3.2 * (1 - u), PILHA[2]);
      c.m.rotation.set(0.3 * (1 - u), c.rot + 0.5 * (1 - u), 0);
    }
    const p = K(t, CAM), a = K(t, ALVO);
    P.olhar([p[0] * DIST, p[1] * DIST, p[2] * DIST], a);
    if (V) P.enquadrar(0, -0.26); else P.enquadrar(0.21, 0);
    P.render();
  };
});
