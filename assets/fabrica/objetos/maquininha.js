// Venda no balcão e na loja online: maquininha aprova o cartão, a etiqueta de envio sai e é colada na caixa.
import * as THREE from "three";
import { MAT, caixa, cilindro, cabo, tela, etiqueta, txt, txtCabe, faixa, saida, mola, FONTE } from "../base.js";
import * as T from "../telas.js";

function cartao() {
  return etiqueta(0.0856, 0.054, 512, (c, w, h) => {
    const gr = c.createLinearGradient(0, 0, w, h); gr.addColorStop(0, "#0b3a8c"); gr.addColorStop(1, "#001f5c");
    c.fillStyle = gr; c.fillRect(0, 0, w, h);
    c.fillStyle = "#d9b44a"; c.beginPath(); c.roundRect(52, 120, 76, 58, 10); c.fill();
    c.strokeStyle = "#a8862f"; c.lineWidth = 2; c.strokeRect(70, 132, 40, 34);
    txt(c, "•••• •••• •••• 4318", 52, 240, 34, "#fff", 600, "left", FONTE);
    txt(c, "CLIENTE", 52, 292, 22, "rgba(255,255,255,.8)", 600, "left", FONTE);
  }, { roughness: 0.35 });
}

export default {
  id: "maquininha", nome: "Maquininha e envio", servico: "E-commerce e PDV",
  vista: { az: 0.5, el: 0.42, folga: 1.0 },
  criar() {
    const g = new THREE.Group();
    // --- maquininha deitada na mesa, levemente inclinada sobre a base
    const maq = new THREE.Group();
    const corpo = caixa(0.078, 0.032, 0.175, 0.012, MAT.plasticoPreto); corpo.position.y = 0.016; maq.add(corpo);
    const topo = caixa(0.072, 0.004, 0.165, 0.01, MAT.plasticoCinza); topo.position.y = 0.032; maq.add(topo);
    const tt = tela(0.058, 0.044, 480, T.maquininha); tt.rotation.x = -Math.PI / 2; tt.position.set(0, 0.0345, -0.045); maq.add(tt);
    // teclado 4 x 3 + linha de cores
    for (let l = 0; l < 4; l++) for (let c = 0; c < 3; c++) {
      const k = caixa(0.018, 0.003, 0.011, 0.002, MAT.plasticoBranco); k.position.set((c - 1) * 0.022, 0.0345, 0.012 + l * 0.015); maq.add(k);
    }
    [0xdc2626, 0xf59e0b, 0x16a34a].forEach((cor, i) => { const k = caixa(0.018, 0.003, 0.011, 0.002, new THREE.MeshStandardMaterial({ color: cor, roughness: 0.5 })); k.position.set((i - 1) * 0.022, 0.0345, 0.074); maq.add(k); });
    // bobina do comprovante saindo por trás
    const bob = etiqueta(0.056, 0.06, 300, (c, w, h) => { c.fillStyle = "#fafaf7"; c.fillRect(0, 0, w, h); for (let i = 0; i < 9; i++) { c.fillStyle = "#bdbdb8"; c.fillRect(20, 26 + i * 34, w - 40 - (i % 3) * 50, 9); } }, { side: THREE.DoubleSide });
    bob.position.set(0, 0.045, -0.095); bob.rotation.x = -0.35; maq.add(bob);
    maq.position.set(-0.05, 0, 0.12); maq.rotation.y = 0.35;
    g.add(maq);
    // cartão entrando pela frente
    const cart = cartao(); cart.material.side = THREE.DoubleSide;
    const cartG = new THREE.Group(); cartG.add(cart); cart.rotation.set(-Math.PI / 2, 0, Math.PI / 2);
    maq.add(cartG);
    // --- caixa de envio (papelão) com a etiqueta caindo e colando
    const cxW = 0.26, cxH = 0.13, cxD = 0.19;
    const cx = caixa(cxW, cxH, cxD, 0.004, MAT.papelao); cx.position.set(0.12, cxH / 2, -0.1); cx.rotation.y = -0.25; g.add(cx);
    const fita = new THREE.Mesh(new THREE.PlaneGeometry(0.05, cxD + 0.002), new THREE.MeshStandardMaterial({ color: 0xc9a46a, roughness: 0.35 }));
    fita.rotation.x = -Math.PI / 2; fita.position.set(-0.09, cxH / 2 + 0.0007, 0); cx.add(fita);
    const et = etiqueta(0.15, 0.1, 900, T.etiquetaEnvio);
    et.rotation.x = -Math.PI / 2; cx.add(et);
    // --- sacola de papel da loja
    const sac = new THREE.Group();
    const kraft = new THREE.MeshStandardMaterial({ color: 0x001f5c, roughness: 0.85, side: THREE.DoubleSide });
    const sW = 0.2, sH = 0.24, sD = 0.1;
    [[0, sD / 2, 0], [0, -sD / 2, Math.PI]].forEach(([x, z, r]) => { const f = new THREE.Mesh(new THREE.PlaneGeometry(sW, sH), kraft); f.position.set(x, sH / 2, z); f.rotation.y = r; f.castShadow = true; sac.add(f); });
    [[sW / 2, Math.PI / 2], [-sW / 2, -Math.PI / 2]].forEach(([x, r]) => { const f = new THREE.Mesh(new THREE.PlaneGeometry(sD, sH), kraft); f.position.set(x, sH / 2, 0); f.rotation.y = r; f.castShadow = true; sac.add(f); });
    const fundo = new THREE.Mesh(new THREE.PlaneGeometry(sW, sD), kraft); fundo.rotation.x = -Math.PI / 2; fundo.position.y = 0.001; sac.add(fundo);
    const marca = etiqueta(0.12, 0.05, 480, (c, w, h) => { c.fillStyle = "#001f5c"; c.fillRect(0, 0, w, h); txtCabe(c, "SUA MARCA", w / 2, 125, 110, w - 40, "#fecb00", 900, "center", FONTE); }, { roughness: 0.85 });
    marca.position.set(0, sH * 0.6, sD / 2 + 0.0008); sac.add(marca);
    const corda = new THREE.MeshStandardMaterial({ color: 0xfecb00, roughness: 0.7 });
    [-1, 1].forEach((s) => sac.add(cabo([[-0.05, sH - 0.01, s * sD / 2 * 0.98], [-0.035, sH + 0.07, s * sD / 2 * 0.98], [0.035, sH + 0.07, s * sD / 2 * 0.98], [0.05, sH - 0.01, s * sD / 2 * 0.98]], 0.0025, corda, 32)));
    sac.position.set(-0.22, 0, -0.16); sac.rotation.y = 0.45;
    g.add(sac);

    function desenhar(p) {
      // cartão: entra no leitor da frente (0 → 0,25)
      const e = saida(faixa(p, 0.0, 0.22));
      cartG.position.set(0, 0.012, 0.0875 + 0.043 - 0.03 + (1 - e) * 0.06);
      tt.userData.atualizar(p);
      // etiqueta: desce da "impressora" e assenta na tampa com leve repique (0,55 → 0,9)
      const d = mola(faixa(p, 0.55, 0.9));
      et.position.set(0.04, cxH / 2 + 0.0012 + (1 - d) * 0.18, 0.0);
      et.rotation.z = (1 - d) * 0.5;
      et.visible = p > 0.5;
    }
    desenhar(0);
    return { grupo: g, desenhar };
  },
};
