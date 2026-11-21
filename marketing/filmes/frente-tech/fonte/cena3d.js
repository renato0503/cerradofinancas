// Cerrado Tech · "Fábrica / Object relay": o seu negócio é o cubo dourado; os sistemas chegam em volta dele.
// 0-5 o cubo dourado cai no centro da base · 5-11 oito blocos chegam um a um e encaixam (ERP, CRM, IA...)
// 11-17 as conexões se desenham e os pacotes passam · 17-22,5 cada bloco cresce até a sua altura (sob medida)
// 22,5-27 quatro blocos sobem e viram os produtos do ecossistema · 27 cortina azul (DOM)
import { THREE, V, K, prog, rng, criarPalco, luzes, ambiente, textura, caixaArredondada, carregarFontes, rodar } from "./palco3d.js";

const NOITE = "#000f2e", AZUL = "#001f5c", AZUL2 = "#003399", DOURADO = "#fecb00";
const PI = Math.PI;

rodar(async () => {
  await carregarFontes(["800 80px Inter", "600 30px Inter"]);
  const P = criarPalco({ fundo: NOITE, fov: V ? 44 : 30 });
  const { cena, renderer } = P;
  await ambiente(renderer, cena, 0.6);
  luzes(cena, { chave: "#fff5e0", recorte: "#7fa2ff", ceu: "#dfe8ff", chao: "#000814", forca: 1.0, sombra: 7 });

  // base: uma laje escura com a grade da fábrica
  const chao = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.MeshStandardMaterial({ color: "#04173f", roughness: 0.9 }));
  chao.rotation.x = -PI / 2; chao.receiveShadow = true; cena.add(chao);
  const grade = new THREE.GridHelper(40, 32, "#16357a", "#0b2558");
  grade.position.y = 0.002; cena.add(grade);
  const laje = new THREE.Mesh(caixaArredondada(4.4, 4.4, 0.16, 0.18, 0.03), new THREE.MeshStandardMaterial({ color: "#0a2a6b", roughness: 0.55, metalness: 0.2 }));
  laje.rotation.x = -PI / 2; laje.position.y = 0.08; laje.receiveShadow = true; cena.add(laje);

  // rótulo do topo de cada bloco (texto branco sobre azul; o dourado leva tinta azul)
  function rotulo(texto, dourado) {
    return textura(512, 512, (ctx, w, h, txt = texto) => {
      ctx.fillStyle = dourado ? DOURADO : AZUL2; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = dourado ? "rgba(0,31,92,.25)" : "rgba(255,255,255,.18)"; ctx.lineWidth = 6; ctx.strokeRect(34, 34, w - 68, h - 68);
      ctx.fillStyle = dourado ? AZUL : "#ffffff";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      let tam = 150; ctx.font = `800 ${tam}px Inter`;
      while (ctx.measureText(txt).width > w - 110 && tam > 40) { tam -= 6; ctx.font = `800 ${tam}px Inter`; }
      ctx.fillText(txt, w / 2, h / 2 + 6);
    });
  }
  const matAzul = new THREE.MeshStandardMaterial({ color: AZUL2, roughness: 0.35, metalness: 0.25 });
  const matOuro = new THREE.MeshStandardMaterial({ color: DOURADO, roughness: 0.3, metalness: 0.55 });
  function bloco(texto, dourado, alt = 0.7) {
    const g = new THREE.Group();
    const corpo = new THREE.Mesh(caixaArredondada(1.08, 1.08, 1, 0.12, 0.05), dourado ? matOuro : matAzul);
    corpo.rotation.x = -PI / 2; corpo.castShadow = true; corpo.receiveShadow = true;
    const corpoG = new THREE.Group(); corpoG.add(corpo); corpoG.scale.y = alt; corpoG.position.y = alt / 2;
    const tx = rotulo(texto, dourado);
    const topo = new THREE.Mesh(new THREE.PlaneGeometry(0.98, 0.98), new THREE.MeshStandardMaterial({ map: tx.tex, roughness: 0.5 }));
    topo.rotation.x = -PI / 2; topo.position.y = alt + 0.003;
    g.add(corpoG, topo);
    cena.add(g);
    return { g, corpoG, topo, tx, alt };
  }

  // o seu negócio
  const ouro = bloco("VOCÊ", true, 1.1);
  // os oito sistemas em volta
  const NOMES = ["ERP", "CRM", "IA", "BI", "PDV", "LGPD", "OCR", "API"];
  // os produtos são os blocos de trás (vistos da câmera final): ao subir, não escondem nenhum rótulo
  const PRODUTOS = { 0: "Venture", 1: "Cerra.AI", 2: "GovTech", 3: "CerraClass" };
  const CASAS = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];
  // arquibancada: quanto mais longe da câmera, mais alto (nenhum topo esconde o rótulo de outro)
  const ALTURAS = [2.3, 2.0, 1.6, 1.0, 0.8, 0.9, 1.3, 1.9];
  const PASSO = 1.32;
  const R = rng(3);
  const blocos = NOMES.map((n, i) => {
    const b = bloco(n, false, 0.7);
    const [cx, cz] = CASAS[i];
    b.casa = [cx * PASSO, cz * PASSO];
    b.t0 = 5.5 + i * 0.6;
    b.de = [7 + R() * 2, 3.5 + R() * 1.5, -3 + i * 0.5];
    b.i = i;
    return b;
  });

  // conexões: arcos entre os topos (centro → cada bloco e o anel externo)
  // fio translúcido: passa por cima dos rótulos sem esconder as letras
  const matLink = new THREE.MeshStandardMaterial({ color: "#9fb8ff", roughness: 0.4, metalness: 0.1, transparent: true, opacity: 0.42, depthWrite: false });
  const links = [];
  function arco(a, b, t0, h = 0.9) {
    const A = new THREE.Vector3(a[0], 0.8, a[1]), B = new THREE.Vector3(b[0], 0.8, b[1]);
    const M = A.clone().add(B).multiplyScalar(0.5); M.y += h;
    const curva = new THREE.QuadraticBezierCurve3(A, M, B);
    const seg = 48, rad = 6;
    const g = new THREE.TubeGeometry(curva, seg, 0.028, rad, false);
    const m = new THREE.Mesh(g, matLink); m.castShadow = false; cena.add(m);
    const pac = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.09, 0.09), new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.3, transparent: true, opacity: 0.45, depthWrite: false }));
    cena.add(pac);
    links.push({ m, g, seg, rad, t0, curva, pac, fase: R() });
  }
  blocos.forEach((b, i) => arco([0, 0], b.casa, 11.3 + i * 0.12, 0.9));
  blocos.forEach((b, i) => arco(b.casa, blocos[(i + 1) % 8].casa, 12.2 + i * 0.1, 0.45));

  // câmera
  const CAM = [
    [0, [6.5, 5.2, 8.5]], [5, [5.2, 5.6, 7.4], "power2.inOut"], [11, [7.2, 6.2, 6.4], "power2.inOut"],
    [17, [-3.5, 7.6, 8.4], "power2.inOut"], [17.6, [7.6, 4.6, 8.6], "power3.inOut"], [22.4, [8.4, 4.2, 7.2], "none"],
    [23.2, [-5.6, 5.4, 8.6], "power3.inOut"], [27, [-6.2, 5.6, 7.6], "none"], [32, [-6.4, 5.8, 7.2], "none"],
  ];
  const ALVO = [[0, [0, 0.6, 0]], [17.6, [0, 1.0, 0]], [22.4, [0, 1.1, 0]], [23.2, [0, 1.6, 0]], [32, [0, 1.6, 0]]];
  const DIST = V ? 1.32 : 1;

  return function desenhar(t) {
    // o cubo dourado cai seco e assenta (leve achatamento no impacto)
    const q = prog(t, 0.6, 1.35, "power4.in");
    const imp = t > 1.35 ? Math.exp(-10 * (t - 1.35)) * Math.sin(Math.min((t - 1.35) * 26, PI)) : 0;
    ouro.g.position.y = 0.16 + 7 * (1 - q);
    ouro.g.scale.set(1 + 0.12 * imp, 1 - 0.18 * imp, 1 + 0.12 * imp);
    ouro.g.visible = t > 0.55;

    // os blocos chegam em arco e encaixam com um giro de meia volta
    for (const b of blocos) {
      const u = prog(t, b.t0, b.t0 + 0.95, "power4.out");
      b.g.visible = u > 0;
      const x = b.de[0] + (b.casa[0] - b.de[0]) * u;
      const z = b.de[2] + (b.casa[1] - b.de[2]) * u;
      const y = b.de[1] * (1 - u) + Math.sin(u * PI) * 1.5 + 0.16; // arco alto: passa por cima do VOCÊ
      b.g.position.set(x, y, z);
      b.g.rotation.y = (1 - u) * PI;
      // sob medida: cada bloco cresce até a sua altura
      const cres = prog(t, 17.6 + b.i * 0.18, 18.6 + b.i * 0.18, "power4.out");
      const volta = prog(t, 22.5, 23.4, "power3.inOut");
      const alt = 0.7 + (ALTURAS[b.i] - 0.7) * cres * (1 - volta);
      b.corpoG.scale.y = alt; b.corpoG.position.y = alt / 2; b.topo.position.y = alt + 0.003;
      // os produtos do ecossistema sobem
      if (PRODUTOS[b.i]) {
        const s = prog(t, 23.2 + Object.keys(PRODUTOS).indexOf(String(b.i)) * 0.3, 24.2 + Object.keys(PRODUTOS).indexOf(String(b.i)) * 0.3, "power4.out");
        // sobe e se afasta do centro (não cobre o VOCÊ nem os blocos de trás)
        b.g.position.y += 1.0 * s;
        b.g.position.x += b.casa[0] * 0.3 * s; b.g.position.z += b.casa[1] * 0.3 * s;
        b.g.rotation.x = -0.18 * s * Math.sign(b.casa[1] || 0.0001);
        b.g.rotation.z = 0.18 * s * Math.sign(b.casa[0] || 0.0001);
        b.tx.atualizar(s > 0.35 ? PRODUTOS[b.i] : NOMES[b.i]);
      }
    }

    // conexões e pacotes
    const some = prog(t, 22.4, 23.0, "power2.in");
    for (const l of links) {
      const p = prog(t, l.t0, l.t0 + 0.8, "power2.inOut") * (1 - some);
      l.g.setDrawRange(0, Math.floor(p * l.seg) * l.rad * 6);
      l.m.visible = p > 0;
      const ativo = t > l.t0 + 0.8 && some < 1;
      l.pac.visible = ativo;
      if (ativo) l.curva.getPoint(((t - l.t0) * 0.6 + l.fase) % 1, l.pac.position);
    }
    // na fase das alturas as conexões descansam; voltam a passar pacotes só na fase 3
    for (const l of links) if (t > 17.2) { l.m.visible = false; l.pac.visible = false; }

    const pos = K(t, CAM), alvo = K(t, ALVO);
    P.olhar([pos[0] * DIST, pos[1] * DIST, pos[2] * DIST], alvo);
    if (V) P.enquadrar(0, -0.26); else P.enquadrar(0.2, 0);
    P.render();
  };
});
