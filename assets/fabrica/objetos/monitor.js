// Monitor de 27" com o painel executivo (DRE, EBITDA, metas) e tablet com o GovDash da prefeitura.
import * as THREE from "three";
import { MAT, caixa, cilindro, tela } from "../base.js";
import * as T from "../telas.js";

export default {
  id: "monitor", nome: "Monitor e tablet com painéis", servico: "Dashboards e BI",
  vista: { az: 0.4, el: 0.12, folga: 0.95 },
  criar() {
    const g = new THREE.Group();
    // monitor: painel fino, pescoço e base de alumínio
    const W = 0.613, H = 0.355;
    const mon = new THREE.Group();
    const painel = caixa(W + 0.012, H + 0.014, 0.012, 0.004, MAT.plasticoPreto); mon.add(painel);
    const corcova = caixa(0.3, 0.2, 0.03, 0.02, MAT.plasticoPreto); corcova.position.z = -0.018; mon.add(corcova);
    const tm = tela(W, H, 1600, T.painel); tm.position.z = 0.0062; mon.add(tm);
    const queixo = caixa(W + 0.012, 0.018, 0.012, 0.004, MAT.plasticoPreto); queixo.position.y = -H / 2 - 0.012; mon.add(queixo);
    mon.position.set(-0.08, 0.13 + H / 2 + 0.04, 0);
    g.add(mon);
    const pesc = caixa(0.06, 0.2, 0.022, 0.006, MAT.aluminio); pesc.position.set(-0.08, 0.13, -0.05); pesc.rotation.x = 0.12; g.add(pesc);
    const base = caixa(0.24, 0.012, 0.18, 0.02, MAT.aluminio); base.position.set(-0.08, 0.006, -0.03); g.add(base);
    // tablet em capa com apoio, de pé na mesa à direita
    const tab = new THREE.Group();
    const corpo = caixa(0.25, 0.174, 0.0065, 0.012, MAT.aluminio); tab.add(corpo);
    const vidro = caixa(0.246, 0.17, 0.0006, 0.011, MAT.vidroPreto); vidro.position.z = 0.0033; tab.add(vidro);
    const tt = tela(0.232, 0.162, 1024, T.govdash); tt.position.z = 0.0038; tab.add(tt);
    const capa = caixa(0.25, 0.12, 0.004, 0.01, new THREE.MeshStandardMaterial({ color: 0x0b3a8c, roughness: 0.7 }));
    capa.position.set(0, -0.02, -0.05); capa.rotation.x = 0.85; tab.add(capa);
    tab.rotation.x = -0.32; tab.position.set(0.36, 0.083, 0.08); tab.rotation.y = -0.35;
    g.add(tab);
    function desenhar(p) { tm.userData.atualizar(p); tt.userData.atualizar(Math.max(0, p - 0.05)); }
    desenhar(0);
    return { grupo: g, desenhar };
  },
};
