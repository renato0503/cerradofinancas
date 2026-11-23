// Vídeo com IA · "Mesa de edição": uma timeline de verdade, deitada no chão do estúdio.
// 0-5 a timeline vazia recebe o primeiro clipe e a agulha (playhead) lima
// 5-11 as cinco trilhas (ideia, roteiro, imagem, montagem, publicação) recebem seus clipes
// 11-18 a agulha percorre a timeline; cada clipe que ela toca acende e pula
// 18-24 o celular sobe do fim da timeline com o vídeo renderizado · 24-27,5 a câmera chega no celular
// 27,5 cortina lima (DOM)
import { THREE, V, K, prog, criarPalco, luzes, ambiente, textura, caixaArredondada, placa, carregarFontes, rodar } from "./palco3d.js";

const FUNDO = "#0a0a0f", PAINEL = "#171722", LIMA = "#d8ff3e";
const CORES = ["#d8ff3e", "#6b8cff", "#ff6b57", "#b06bff", "#3ee0cf"];
const NOMES = ["01 IDEIA", "02 ROTEIRO", "03 IMAGEM", "04 MONTAGEM", "05 PUBLICAÇÃO"];
const PI = Math.PI;

// trilhas ao longo de X, empilhadas em Z; clipes como [início, comprimento]
const TRILHA_LEN = 10.5, TRILHA_X0 = -TRILHA_LEN / 2, PASSO_Z = 0.95;
const CLIPES = [
  [[-4.6, 1.2], [-1.0, 1.6]],
  [[-3.2, 2.2], [0.6, 1.4]],
  [[-4.2, 1.4], [-2.4, 1.0], [1.4, 2.0]],
  [[-2.0, 3.0], [2.4, 1.6]],
  [[3.0, 1.6]],
];
const AGULHA_DE = -4.9, AGULHA_ATE = 4.9, VARRE_INI = 11.4, VARRE_FIM = 17.6;

rodar(async () => {
  await carregarFontes(["500 40px 'DM Mono'", "800 80px 'Outfit'", "600 30px 'Instrument Sans'"]);
  const P = criarPalco({ fundo: FUNDO, fov: V ? 44 : 30, tom: true, exposicao: 1.05 });
  const { cena, renderer } = P;
  await ambiente(renderer, cena, 0.35);
  const L = luzes(cena, { chave: "#ffffff", recorte: "#9fb2ff", ceu: "#cfd6ff", chao: "#0a0a0f", forca: 0.75, sombra: 8 });
  L.chave.position.set(3, 9, 6);

  // chão chapado na cor do estúdio + grade (a mesma "grade de estúdio" das peças) + sombra
  const chao = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), new THREE.MeshBasicMaterial({ color: FUNDO }));
  chao.rotation.x = -PI / 2; cena.add(chao);
  const grade = new THREE.GridHelper(60, 120, "#1e1e2a", "#16161f");
  grade.position.y = 0.001; cena.add(grade);
  const sombra = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.ShadowMaterial({ color: "#000000", opacity: 0.5 }));
  sombra.rotation.x = -PI / 2; sombra.position.y = 0.003; sombra.receiveShadow = true; cena.add(sombra);

  // as cinco trilhas e os rótulos em mono à esquerda
  const matTrilha = new THREE.MeshStandardMaterial({ color: PAINEL, roughness: 0.6, metalness: 0.1 });
  const zDe = (i) => (i - 2) * PASSO_Z;
  const rotulos = [];
  NOMES.forEach((nome, i) => {
    const tr = new THREE.Mesh(caixaArredondada(TRILHA_LEN, 0.74, 0.08, 0.1, 0.02), matTrilha);
    tr.rotation.x = -PI / 2; tr.position.set(0, 0.04, zDe(i)); tr.receiveShadow = true; cena.add(tr);
    const tx = textura(512, 96, (ctx, w, h) => {
      ctx.font = "500 46px 'DM Mono'"; ctx.fillStyle = CORES[i]; ctx.textBaseline = "middle"; ctx.textAlign = "right";
      ctx.fillText(nome, w - 10, h / 2);
    });
    const r = placa(2.4, 0.45, tx.tex);
    r.rotation.x = -PI / 2; r.position.set(TRILHA_X0 - 1.35, 0.02, zDe(i)); cena.add(r);
    rotulos.push(r);
  });

  // os clipes: blocos arredondados na cor da trilha, cada um com o próprio material (para acender)
  const clipes = [];
  CLIPES.forEach((lista, i) => lista.forEach(([x0, len], j) => {
    const mat = new THREE.MeshStandardMaterial({ color: CORES[i], roughness: 0.35, metalness: 0.05, emissive: CORES[i], emissiveIntensity: 0 });
    const m = new THREE.Mesh(caixaArredondada(len - 0.08, 0.56, 0.18, 0.1, 0.035), mat);
    m.rotation.x = -PI / 2; m.castShadow = true; m.receiveShadow = true;
    const g = new THREE.Group(); g.add(m); cena.add(g);
    const primeiro = i === 0 && j === 0;
    clipes.push({ g, mat, x: x0 + len / 2, x0, x1: x0 + len, z: zDe(i), t0: primeiro ? 0.7 : 5.6 + i * 0.45 + j * 0.14 });
  }));

  // a agulha (playhead): lâmina lima de pé, atravessando as trilhas, com a cabeça triangular
  const matAgulha = new THREE.MeshStandardMaterial({ color: LIMA, emissive: LIMA, emissiveIntensity: 0.55, roughness: 0.3 });
  const agulha = new THREE.Group();
  // a lâmina é um véu translúcido (senão vira um muro na frente da câmera); a borda de cima é sólida
  const matVeu = new THREE.MeshBasicMaterial({ color: LIMA, transparent: true, opacity: 0.16, depthWrite: false, side: THREE.DoubleSide });
  const lamina = new THREE.Mesh(new THREE.PlaneGeometry(5.0, 1.1), matVeu);
  lamina.rotation.y = PI / 2; lamina.position.y = 0.55; agulha.add(lamina);
  const trilho = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.07, 5.0), matAgulha);
  trilho.position.y = 1.1; agulha.add(trilho);
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.03, 5.0), matAgulha);
  base.position.y = 0.3; agulha.add(base);
  const cabeca = new THREE.Mesh(new THREE.ConeGeometry(0.26, 0.42, 3), matAgulha);
  cabeca.rotation.x = PI; cabeca.rotation.y = PI / 2; cabeca.position.set(0, 1.3, 2.5); agulha.add(cabeca);
  trilho.castShadow = true; cabeca.castShadow = true;
  cena.add(agulha);

  // o celular com o vídeo pronto: corpo escuro arredondado e a tela desenhada em canvas
  const celular = new THREE.Group();
  const corpo = new THREE.Mesh(caixaArredondada(1.36, 2.6, 0.12, 0.2, 0.035), new THREE.MeshStandardMaterial({ color: "#1b1b26", roughness: 0.25, metalness: 0.6 }));
  corpo.castShadow = true; celular.add(corpo);
  const tela = textura(540, 1040, (ctx, w, h, p = 0) => {
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#1d2350"); g.addColorStop(0.55, "#3a1f5c"); g.addColorStop(1, "#0f2b33");
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    // "REC" e o tempo, no alto
    ctx.fillStyle = "#ff6b57"; ctx.beginPath(); ctx.arc(52, 64, 13, 0, 2 * PI); ctx.fill();
    ctx.font = "500 30px 'DM Mono'"; ctx.fillStyle = "#ffffff"; ctx.fillText("REC  00:" + String(Math.round(p * 15)).padStart(2, "0"), 78, 75);
    ctx.textAlign = "right"; ctx.fillText("9:16", w - 36, 75); ctx.textAlign = "left";
    // o play no centro
    ctx.fillStyle = "rgba(216,255,62,.16)"; ctx.beginPath(); ctx.arc(w / 2, h * 0.42, 110, 0, 2 * PI); ctx.fill();
    ctx.fillStyle = LIMA; ctx.beginPath(); ctx.moveTo(w / 2 - 34, h * 0.42 - 52); ctx.lineTo(w / 2 + 58, h * 0.42); ctx.lineTo(w / 2 - 34, h * 0.42 + 52); ctx.closePath(); ctx.fill();
    // a legenda (o curso ensina a revisar)
    ctx.font = "800 54px 'Outfit'"; ctx.fillStyle = "#ffffff"; ctx.textAlign = "center";
    ctx.fillText("Seu vídeo,", w / 2, h * 0.68); ctx.fillStyle = LIMA; ctx.fillText("pronto.", w / 2, h * 0.68 + 62);
    ctx.textAlign = "left";
    // barra de progresso
    ctx.fillStyle = "rgba(255,255,255,.22)"; ctx.fillRect(40, h - 70, w - 80, 8);
    ctx.fillStyle = LIMA; ctx.fillRect(40, h - 70, (w - 80) * p, 8);
  });
  const tela3d = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 2.31), new THREE.MeshBasicMaterial({ map: tela.tex, toneMapped: false }));
  tela3d.position.z = 0.062; celular.add(tela3d);
  cena.add(celular);
  const CEL = [3.4, 0, 0.3];

  // câmera: [t, posição] e [t, alvo]; em 9:16 ela recua (DIST) e o objeto sobe (enquadrar)
  const CAM = [
    [0, [5.5, 7.5, 9.0]], [5, [6.5, 8.6, 10.5], "power2.inOut"], [11, [4.0, 9.4, 9.0], "power2.inOut"],
    [18, [-1.0, 6.4, 9.8], "power2.inOut"], [24, [1.4, 3.6, 7.6], "power2.inOut"], [27.5, [2.6, 2.3, 5.6], "power3.inOut"],
    [32, [2.8, 2.2, 5.3], "none"],
  ];
  const ALVO = [[0, [-0.8, 0, 0]], [11, [0, 0, 0]], [18, [1.0, 0.6, 0]], [24, [2.6, 1.2, 0.3]], [27.5, [3.3, 1.35, 0.3]], [32, [3.4, 1.35, 0.3]]];
  const DIST = V ? 1.32 : 1;

  return function desenhar(t) {
    // agulha: aparece em 1,2s, estaciona no início, varre de 11,4 a 17,6 e fica no fim
    // ... e recolhe para o chão quando o celular sobe (18-18,5)
    const ag = prog(t, 1.2, 1.8, "back.out(1.6)") * (1 - prog(t, 18.0, 18.5, "power3.in"));
    agulha.scale.set(1, Math.max(0.001, ag), 1);
    agulha.visible = t >= 1.2 && ag > 0.002;
    const ax = AGULHA_DE + (AGULHA_ATE - AGULHA_DE) * prog(t, VARRE_INI, VARRE_FIM, "none");
    agulha.position.x = ax;

    for (const c of clipes) {
      const q = prog(t, c.t0, c.t0 + 0.32, "power3.in");
      const u = prog(t, c.t0 + 0.28, c.t0 + 0.6, "back.out(2)");
      c.g.visible = t >= c.t0;
      // acende quando a agulha está em cima (durante a varredura) e guarda um brilho depois
      const sobre = t > VARRE_INI && ax >= c.x0 && ax <= c.x1;
      const passou = t > VARRE_INI && ax > c.x1;
      const pulo = sobre ? Math.sin(prog(ax, c.x0, c.x1) * PI) * 0.16 : 0;
      c.mat.emissiveIntensity = sobre ? 0.75 : passou ? 0.22 : 0.0;
      c.g.position.set(c.x, 0.17 + 2.6 * (1 - q) + pulo, c.z);
      c.g.scale.set(1, 1, Math.max(0.001, 0.75 + 0.25 * u));
    }

    // celular: sobe de dentro do chão no fim da timeline (sem virar além de ~20°)
    const s = prog(t, 18.3, 19.4, "expo.out");
    celular.visible = s > 0.001;
    celular.position.set(CEL[0], -1.4 + 2.75 * s, CEL[2]);
    celular.rotation.set(-0.05, -0.32 + 0.12 * prog(t, 19.4, 27.5, "sine.inOut"), 0.04 * (1 - s));
    tela.atualizar(Math.round(prog(t, 19.4, 31, "none") * 50) / 50);

    const p = K(t, CAM), a = K(t, ALVO);
    P.olhar([p[0] * DIST, p[1] * DIST, p[2] * DIST], a);
    if (V) P.enquadrar(0, -0.26); else P.enquadrar(0.21, 0);
    P.render();
  };
});
