// Estante de aço do almoxarifado com caixas etiquetadas, tablet do estoque e impressora que solta a NF-e.
import * as THREE from "three";
import { MAT, caixa, tela, etiqueta, faixa, saida, txt, MONO, FONTE } from "../base.js";
import * as T from "../telas.js";

const L = 0.9, P = 0.4, A = 1.2;

function rotuloCaixa(sku, nome, semente) {
  return etiqueta(0.12, 0.075, 480, (c, w, h) => {
    c.fillStyle = "#fbfbf6"; c.fillRect(0, 0, w, h);
    txt(c, sku, 18, 62, 50, "#111", 800, "left", MONO);
    txt(c, nome, 18, 100, 24, "#222", 600, "left", FONTE);
    c.fillStyle = "#111"; let x = 18, s = semente;
    while (x < w - 18) { s = (s * 9301 + 49297) % 233280; const lg = 2 + (s % 5); if ((s >> 3) % 2) c.fillRect(x, 130, lg, 120 - 30); x += lg + 2; }
    txt(c, "QTD 500 UN", w - 18, 290, 22, "#111", 700, "right", MONO);
  });
}

export default {
  id: "estoque", nome: "Estoque com nota fiscal", servico: "ERP · estoque, fiscal e produção",
  vista: { az: 0.45, el: 0.18, folga: 1.0 },
  criar() {
    const g = new THREE.Group();
    // estrutura: 4 colunas em cantoneira perfurada + 4 prateleiras (furos numa instância só)
    const furos = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.008, 0.016), MAT.plasticoPreto, 4 * 28);
    const mf = new THREE.Matrix4(), qf = new THREE.Quaternion(), um = new THREE.Vector3(1, 1, 1);
    let nf = 0;
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      const col = caixa(0.035, A, 0.035, 0.002, MAT.acoPintado);
      col.position.set(sx * (L / 2 - 0.0175), A / 2, sz * (P / 2 - 0.0175));
      g.add(col);
      qf.setFromAxisAngle(new THREE.Vector3(0, 1, 0), sz < 0 ? Math.PI : 0);
      for (let i = 0; i < 28; i++) furos.setMatrixAt(nf++, mf.compose(new THREE.Vector3(sx * (L / 2 - 0.0175), 0.06 + i * 0.04, sz * (P / 2) + sz * 0.0002), qf, um));
    }
    g.add(furos);
    const alturas = [0.06, 0.42, 0.78, 1.16];
    alturas.forEach((y) => {
      const pr = caixa(L - 0.01, 0.02, P - 0.01, 0.002, MAT.acoPintado);
      pr.position.set(0, y, 0);
      g.add(pr);
    });
    // caixas de papelão com etiquetas
    const itens = [
      [0.42, -0.22, 0.3, 0.22, 0.26, "CX-0877", "Arruela lisa 8 mm", 3],
      [0.42, 0.14, 0.32, 0.24, 0.27, "CX-2210", "Porca M8 zincada", 9],
      [0.07, -0.25, 0.28, 0.2, 0.27, "CX-3105", "Bucha nylon 10 mm", 13],
      [0.07, 0.08, 0.3, 0.26, 0.28, "CX-4471", "Abraçadeira 200 mm", 21],
      [0.78, -0.2, 0.3, 0.22, 0.27, "CX-5120", "Fita isolante 19 mm", 17],
    ];
    itens.forEach(([y, x, w, h, d, sku, nome, s]) => {
      const cx = caixa(w, h, d, 0.004, MAT.papelao);
      cx.position.set(x, y + 0.01 + h / 2, 0.01);
      const r = rotuloCaixa(sku, nome, s);
      r.position.set(0, 0.02, d / 2 + 0.0005); cx.add(r);
      const fita = new THREE.Mesh(new THREE.PlaneGeometry(w + 0.001, 0.045), new THREE.MeshStandardMaterial({ color: 0xc9a46a, roughness: 0.35 }));
      fita.rotation.x = -Math.PI / 2; fita.position.y = h / 2 + 0.0006; cx.add(fita);
      g.add(cx);
    });
    // a caixa que sai (CX-1042)
    const saiW = 0.28, saiH = 0.24, saiD = 0.27;
    const sai = caixa(saiW, saiH, saiD, 0.004, MAT.papelao);
    const rs = rotuloCaixa("CX-1042", "Parafuso sextavado M8", 5);
    rs.position.set(0, 0.02, saiD / 2 + 0.0005); sai.add(rs);
    const fita = new THREE.Mesh(new THREE.PlaneGeometry(saiW + 0.001, 0.045), new THREE.MeshStandardMaterial({ color: 0xc9a46a, roughness: 0.35 }));
    fita.rotation.x = -Math.PI / 2; fita.position.y = saiH / 2 + 0.0006; sai.add(fita);
    const saiBase = new THREE.Vector3(0.2, 0.78 + 0.01 + saiH / 2, 0.01);
    g.add(sai);
    // tablet do estoque preso na coluna da direita
    const tab = new THREE.Group();
    const corpo = caixa(0.25, 0.165, 0.008, 0.008, MAT.plasticoPreto);
    tab.add(corpo);
    const tt = tela(0.236, 0.148, 1024, T.estoque);
    tt.position.z = 0.0042; tab.add(tt);
    const braco = caixa(0.02, 0.02, 0.06, 0.004, MAT.aco); braco.position.set(-0.11, 0, -0.03); tab.add(braco);
    tab.position.set(L / 2 + 0.12, 0.98, P / 2 - 0.02);
    tab.rotation.y = -0.35;
    g.add(tab);
    // impressora de nota fiscal no topo
    const imp = new THREE.Group();
    const ic = caixa(0.36, 0.13, 0.3, 0.02, MAT.plasticoBranco); ic.position.y = 0.065; imp.add(ic);
    const tampaI = caixa(0.34, 0.012, 0.18, 0.006, MAT.plasticoCinza); tampaI.position.set(0, 0.134, -0.04); imp.add(tampaI);
    const fenda = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.008), MAT.plasticoPreto); fenda.position.set(0, 0.1, 0.1505); imp.add(fenda);
    const painelI = caixa(0.07, 0.03, 0.004, 0.003, MAT.plasticoPreto); painelI.position.set(0.12, 0.11, 0.151); imp.add(painelI);
    const ledI = new THREE.Mesh(new THREE.CircleGeometry(0.004, 16), new THREE.MeshBasicMaterial({ color: 0x22c55e }));
    ledI.position.set(0.1, 0.11, 0.1535); imp.add(ledI);
    // folha da NF-e saindo (desliza para fora da fenda)
    const folha = etiqueta(0.21, 0.297, 600, T.danfe);
    folha.material.side = THREE.DoubleSide;
    folha.rotation.x = Math.PI; // texto voltado para cima, com o topo junto da impressora
    const folhaPiv = new THREE.Group(); folhaPiv.position.set(0, 0.1, 0.15); imp.add(folhaPiv);
    folhaPiv.add(folha);
    imp.position.set(-0.12, 1.17, 0.0);
    g.add(imp);

    function desenhar(p) {
      const s = saida(faixa(p, 0.05, 0.38));
      sai.position.set(saiBase.x, saiBase.y + Math.sin(s * Math.PI) * 0.015, saiBase.z + s * 0.24);
      tt.userData.atualizar(faixa(p, 0, 1));
      const f = saida(faixa(p, 0.45, 0.95));
      // a folha sai inclinada para a frente e cai um pouco por cima da borda
      folhaPiv.rotation.x = 1.2 + f * 0.32;
      folha.position.set(0, -0.297 / 2 + f * 0.27, 0);
      folha.visible = f > 0.01;
    }
    desenhar(0);
    return { grupo: g, desenhar };
  },
};
