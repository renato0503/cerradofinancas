// Como trabalhamos: prancheta com o rascunho a lápis que vira a tela de verdade, e os 4 passos marcados à caneta.
import * as THREE from "three";
import { MAT, caixa, cilindro, tela } from "../base.js";
import * as T from "../telas.js";

export default {
  id: "prancheta", nome: "Prancheta do projeto", servico: "Como trabalhamos · 4 passos",
  vista: { az: 0.25, el: 0.85, folga: 0.95 },
  criar() {
    const g = new THREE.Group();
    const placa = caixa(0.235, 0.004, 0.33, 0.008, MAT.hardboard); placa.position.y = 0.002; g.add(placa);
    const papel = tela(0.21, 0.28, 840, T.prancheta, { papel: true });
    papel.rotation.x = -Math.PI / 2; papel.position.set(0, 0.0043, 0.012); g.add(papel);
    // prendedor metálico
    const clip = caixa(0.1, 0.008, 0.035, 0.003, MAT.cromado); clip.position.set(0, 0.008, -0.145); g.add(clip);
    const mola = cilindro(0.006, 0.006, 0.07, MAT.aco); mola.rotation.z = Math.PI / 2; mola.position.set(0, 0.011, -0.158); g.add(mola);
    // lápis amarelo sextavado
    const lap = new THREE.Group();
    const corpo = cilindro(0.0038, 0.0038, 0.15, new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.5 }), 6); lap.add(corpo);
    const madeira = new THREE.Mesh(new THREE.ConeGeometry(0.0038, 0.016, 6), new THREE.MeshStandardMaterial({ color: 0xe8c39e, roughness: 0.8 })); madeira.position.y = -0.083; madeira.rotation.x = Math.PI; lap.add(madeira);
    const ponta = new THREE.Mesh(new THREE.ConeGeometry(0.0012, 0.005, 12), MAT.grafite); ponta.position.y = -0.0895; ponta.rotation.x = Math.PI; lap.add(ponta);
    const anel = cilindro(0.004, 0.004, 0.01, MAT.aco); anel.position.y = 0.08; lap.add(anel);
    const borr = cilindro(0.0038, 0.0038, 0.009, new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.8 })); borr.position.y = 0.089; lap.add(borr);
    lap.traverse((x) => { if (x.isMesh) x.castShadow = true; });
    lap.rotation.set(0, 0, Math.PI / 2); lap.rotation.order = "YXZ"; lap.rotation.y = 0.5;
    lap.position.set(0.17, 0.004, 0.05);
    g.add(lap);
    // caneta azul
    const can = new THREE.Group();
    const cc = cilindro(0.0045, 0.0045, 0.14, MAT.plasticoBranco); can.add(cc);
    const tampa = cilindro(0.0048, 0.0048, 0.045, new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.4 })); tampa.position.y = 0.05; can.add(tampa);
    const pino = caixa(0.002, 0.035, 0.004, 0.0008, new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.4 })); pino.position.set(0, 0.045, 0.006); can.add(pino);
    can.traverse((x) => { if (x.isMesh) x.castShadow = true; });
    can.rotation.order = "YXZ"; can.rotation.set(0, -0.3, Math.PI / 2);
    can.position.set(0.19, 0.0046, -0.06);
    g.add(can);
    function desenhar(p) { papel.userData.atualizar(p); }
    desenhar(0);
    return { grupo: g, desenhar };
  },
};
