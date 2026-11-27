// Smartphone num suporte de mesa: a mensagem do cliente chega, vira lead e anda no funil de vendas.
import * as THREE from "three";
import { MAT, caixa, cilindro, tela } from "../base.js";
import * as T from "../telas.js";

const W = 0.0716, H = 0.1475, E = 0.0078;

export function criarCelular({ desenho = T.crm } = {}) {
  const fone = new THREE.Group();
  const aro = caixa(W, H, E, 0.009, MAT.aluminio); fone.add(aro);
  const vidro = caixa(W - 0.0012, H - 0.0012, 0.0008, 0.0085, MAT.vidroPreto); vidro.position.z = E / 2 - 0.0002; fone.add(vidro);
  const t = tela(W - 0.0055, H - 0.0055, 600, desenho); t.position.z = E / 2 + 0.0003; fone.add(t);
  // ilha da câmera frontal
  const ilha = caixa(0.02, 0.0055, 0.0003, 0.0027, MAT.plasticoPreto); ilha.position.set(0, H / 2 - 0.0085, E / 2 + 0.0005); fone.add(ilha);
  // traseira: módulo de câmeras
  const trasM = caixa(0.03, 0.03, 0.0016, 0.007, MAT.grafite); trasM.position.set(-W / 2 + 0.021, H / 2 - 0.021, -E / 2 - 0.0006); fone.add(trasM);
  [[-0.007, 0.007], [-0.007, -0.007], [0.007, 0]].forEach(([x, y]) => {
    const l = cilindro(0.0048, 0.0048, 0.0016, MAT.vidroPreto); l.rotation.x = Math.PI / 2;
    l.position.set(-W / 2 + 0.021 + x, H / 2 - 0.021 + y, -E / 2 - 0.0016); fone.add(l);
  });
  // botões laterais
  [[0.02, 0.014], [-0.005, 0.014], [0.03, 0.022]].forEach(([y, h], i) => {
    const b = caixa(0.0012, h, 0.003, 0.0005, MAT.aluminio);
    b.position.set(i < 2 ? -W / 2 - 0.0004 : W / 2 + 0.0004, y, 0); fone.add(b);
  });
  return { fone, t };
}

export default {
  id: "celular", nome: "Celular com o CRM", servico: "CRM · funil de vendas",
  vista: { az: 0.3, el: 0.12, folga: 1.15 },
  criar() {
    const g = new THREE.Group();
    // suporte de alumínio (base + encosto inclinado + aba)
    const sup = new THREE.Group();
    const base = caixa(0.08, 0.005, 0.09, 0.002, MAT.aluminio); base.position.set(0, 0.0025, 0); sup.add(base);
    const encosto = caixa(0.07, 0.11, 0.004, 0.002, MAT.aluminio);
    encosto.position.set(0, 0.055, -0.005); encosto.rotation.x = -0.28; sup.add(encosto);
    const aba = caixa(0.07, 0.012, 0.004, 0.0015, MAT.aluminio); aba.position.set(0, 0.035, 0.028); aba.rotation.x = -0.28; sup.add(aba);
    const apoio = caixa(0.07, 0.004, 0.014, 0.0015, MAT.aluminio); apoio.position.set(0, 0.03, 0.021); apoio.rotation.x = -0.28; sup.add(apoio);
    const borr = caixa(0.075, 0.002, 0.08, 0.001, MAT.borracha); borr.position.y = -0.0005; sup.add(borr);
    g.add(sup);
    const { fone, t } = criarCelular();
    fone.rotation.x = -0.28;
    fone.position.set(0, 0.034 + Math.cos(0.28) * H / 2, 0.021 - Math.sin(0.28) * H / 2 + 0.002);
    g.add(fone);
    function desenhar(p) { t.userData.atualizar(p); }
    desenhar(0);
    return { grupo: g, desenhar };
  },
};
