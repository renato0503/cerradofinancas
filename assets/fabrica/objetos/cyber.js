// Cyber security: notebook rodando a revisão de segurança e um cadeado de latão que se fecha no cabo de rede.
import * as THREE from "three";
import { MAT, caixa, cilindro, cabo, faixa, mola } from "../base.js";
import * as T from "../telas.js";
import { criarNotebook } from "./notebook.js";

export default {
  id: "cyber", nome: "Revisão de segurança", servico: "Cyber security e pentest",
  vista: { az: 0.5, el: 0.36, folga: 1.0 },
  criar() {
    const g = new THREE.Group();
    const nb = criarNotebook({ desenhoTela: T.terminal, abertoFixo: 104 });
    nb.grupo.rotation.y = 0.15;
    g.add(nb.grupo);
    // cabo de rede saindo da lateral do notebook e indo para a direita
    const amarelo = new THREE.MeshStandardMaterial({ color: 0xfecb00, roughness: 0.5 });
    const pts = [[0.16, 0.008, -0.02], [0.2, 0.004, 0.0], [0.26, 0.004, 0.06], [0.33, 0.004, 0.08], [0.42, 0.004, 0.04]];
    g.add(cabo(pts, 0.0032, amarelo));
    // cadeado: corpo de latão com fechadura + arco de aço que desce envolvendo o cabo
    const cad = new THREE.Group();
    const corpo = caixa(0.05, 0.042, 0.016, 0.006, MAT.latao); corpo.position.y = 0.021; cad.add(corpo);
    const fech = cilindro(0.0055, 0.0055, 0.002, MAT.aco); fech.rotation.x = Math.PI / 2; fech.position.set(0, 0.016, 0.0085); cad.add(fech);
    const fenda = caixa(0.0016, 0.006, 0.001, 0.0003, MAT.plasticoPreto); fenda.position.set(0, 0.016, 0.0096); cad.add(fenda);
    const arco = new THREE.Group();
    const curva = new THREE.Mesh(new THREE.TorusGeometry(0.0155, 0.0042, 16, 32, Math.PI), MAT.cromado); curva.position.y = 0.03; arco.add(curva);
    [-1, 1].forEach((s) => { const h = cilindro(0.0042, 0.0042, 0.03, MAT.cromado); h.position.set(s * 0.0155, 0.015, 0); arco.add(h); });
    arco.position.y = 0.032;
    cad.add(arco);
    // deitado sobre a mesa, com o arco passando por cima do cabo
    cad.rotation.set(-Math.PI / 2 + 0.25, 0, 0.5);
    cad.position.set(0.3, 0.012, 0.11);
    g.add(cad);
    // chave ao lado
    const chave = new THREE.Group();
    const cab = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.003, 24), MAT.latao); chave.add(cab);
    const furo = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.0035, 16), MAT.plasticoPreto); furo.position.x = -0.004; chave.add(furo);
    const lam = caixa(0.03, 0.002, 0.006, 0.0008, MAT.latao); lam.position.x = 0.025; chave.add(lam);
    [0.018, 0.026, 0.034].forEach((x, i) => { const d = caixa(0.003, 0.002, 0.003 + i * 0.001, 0.0005, MAT.latao); d.position.set(x, 0, -0.004); chave.add(d); });
    chave.position.set(0.38, 0.0016, 0.16); chave.rotation.y = 0.8;
    chave.traverse((x) => { if (x.isMesh) x.castShadow = true; });
    g.add(chave);
    function desenhar(p, t) {
      nb.desenhar(faixa(p, 0, 0.8), t);
      // o arco começa aberto (alto e girado) e fecha com estalo no fim
      const f = mola(faixa(p, 0.8, 0.95));
      arco.position.y = 0.032 + (1 - f) * 0.014;
      arco.rotation.y = (1 - f) * Math.PI * 0.5;
    }
    desenhar(0, 0);
    return { grupo: g, desenhar };
  },
};
