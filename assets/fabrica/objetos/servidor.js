// Rack de servidores dentro da empresa, com o cabo da internet desconectado à vista.
// A gaveta-console está aberta com o Cerra.AI respondendo a partir dos documentos da casa.
import * as THREE from "three";
import * as B from "../base.js";
import { MAT, caixa, cilindro, cabo, tela, etiqueta, led, txt, faixa, saida, FONTE, MONO } from "../base.js";
import * as T from "../telas.js";

const U = 0.0445, LARG = 0.6, PROF = 0.6, ALT = 12 * U + 0.1, VAO = 0.4826; // 19" entre trilhos

export default {
  id: "servidor", nome: "Servidor da IA offline", servico: "IA offline · Cerra.AI",
  vista: { az: 0.55, el: 0.16, folga: 0.95 },
  criar() {
    const g = new THREE.Group();
    // estrutura do rack (preta), com pés
    const pret = MAT.plasticoPreto;
    const pintura = new THREE.MeshStandardMaterial({ color: 0x1b1d21, metalness: 0.05, roughness: 0.7 });
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      const c = caixa(0.03, ALT, 0.03, 0.003, pintura); c.position.set(sx * (LARG / 2 - 0.015), ALT / 2 + 0.03, sz * (PROF / 2 - 0.015)); g.add(c);
      const pe = cilindro(0.018, 0.022, 0.03, pret); pe.position.set(sx * (LARG / 2 - 0.03), 0.015, sz * (PROF / 2 - 0.03)); g.add(pe);
    }
    for (const y of [0.04, ALT + 0.02]) {
      const t = caixa(LARG, 0.02, PROF, 0.003, pintura); t.position.y = y; g.add(t);
    }
    // trilhos frontais com furação
    for (const sx of [-1, 1]) {
      const tr = caixa(0.016, ALT - 0.04, 0.01, 0.001, MAT.aco); tr.position.set(sx * (VAO / 2 + 0.008), ALT / 2 + 0.03, PROF / 2 - 0.05); g.add(tr);
    }
    const leds = [];
    let y = 0.07;
    const equip = (alt, cor, fn) => { const e = caixa(VAO, alt * U - 0.002, PROF - 0.12, 0.003, cor); e.position.set(0, y + alt * U / 2, -0.01); g.add(e); fn && fn(e, alt * U); y += alt * U; return e; };
    // 2 servidores 2U com baias de disco e LEDs
    for (let s = 0; s < 2; s++) {
      equip(2, MAT.grafite, (e, h) => {
        const fz = (PROF - 0.12) / 2 + 0.0005;
        for (let i = 0; i < 8; i++) {
          const b = caixa(0.042, h - 0.022, 0.003, 0.002, MAT.plasticoCinza); b.position.set(-0.17 + i * 0.047, -0.002, fz); e.add(b);
          const l = new THREE.Mesh(new THREE.CircleGeometry(0.0022, 12), led(i % 3 === 2 ? 0xf59e0b : 0x22c55e));
          l.position.set(-0.17 + i * 0.047 + 0.014, h / 2 - 0.016, fz + 0.002); e.add(l); leds.push([l, i * 1.7 + s * 3]);
        }
        const nome = etiqueta(0.07, 0.016, 280, (c, w, hh) => { c.fillStyle = "#1c1f24"; c.fillRect(0, 0, w, hh); txt(c, s ? "IA-02" : "IA-01", 10, 46, 40, "#cbd5e1", 700, "left", MONO); });
        nome.position.set(0.2, h / 2 - 0.016, fz + 0.002); e.add(nome);
      });
    }
    // switch 1U com cabos
    equip(1, MAT.plasticoPreto, (e, h) => {
      const fz = (PROF - 0.12) / 2 + 0.0005;
      for (let i = 0; i < 12; i++) {
        const porta = caixa(0.013, 0.011, 0.004, 0.001, MAT.borracha); porta.position.set(-0.15 + i * 0.019, 0, fz); e.add(porta);
        const l = new THREE.Mesh(new THREE.CircleGeometry(0.0016, 10), led(0x22c55e)); l.position.set(-0.15 + i * 0.019, 0.011, fz + 0.002); e.add(l); leds.push([l, i * 0.9]);
      }
    });
    // gaveta-console 1U puxada para fora, com tela levantada
    const cy = y + U / 2; y += U;
    const zFrente = PROF / 2;
    const gaveta = caixa(VAO - 0.01, 0.018, 0.4, 0.003, pintura); gaveta.position.set(0, cy, zFrente + 0.12); g.add(gaveta);
    const tec = caixa(0.38, 0.004, 0.14, 0.002, MAT.plasticoPreto); tec.position.set(0, cy + 0.011, zFrente + 0.2); g.add(tec);
    const tp = caixa(0.07, 0.002, 0.045, 0.001, MAT.plasticoCinza); tp.position.set(0, cy + 0.012, zFrente + 0.295); g.add(tp);
    const piv = new THREE.Group(); piv.position.set(0, cy + 0.01, zFrente + 0.03); g.add(piv);
    const tampa = caixa(VAO - 0.02, 0.012, 0.3, 0.003, pintura); tampa.position.set(0, 0.006, 0.15); piv.add(tampa);
    const tt = tela(0.4, 0.25, 1280, T.cerraai); tt.rotation.x = Math.PI / 2; tt.position.set(0, -0.0005, 0.15); piv.add(tt);
    piv.rotation.x = -THREE.MathUtils.degToRad(98);
    // 2U de espaço vazio com tampa cega + 1U organizador
    equip(2, MAT.grafite);
    // roteador de internet no chão, ao lado do rack: antenas, LEDs e a porta WAN vazia
    const rot = new THREE.Group();
    const rc = caixa(0.22, 0.035, 0.15, 0.012, MAT.plasticoBranco); rc.position.y = 0.0175; rot.add(rc);
    [-0.08, 0.08].forEach((x, i) => { const an = cilindro(0.006, 0.007, 0.16, MAT.plasticoBranco); an.position.set(x, 0.1, -0.07); an.rotation.z = i ? -0.15 : 0.15; rot.add(an); });
    const rLeds = [];
    ["POWER", "WI-FI", "INTERNET"].forEach((n, i) => { const l = new THREE.Mesh(new THREE.CircleGeometry(0.0028, 12), led(i === 2 ? 0xef4444 : 0x22c55e)); l.rotation.x = -Math.PI / 2; l.position.set(-0.05 + i * 0.04, 0.0352, 0.045); rot.add(l); rLeds.push(l); });
    const rotulo = etiqueta(0.14, 0.014, 700, (c, w, h) => { c.fillStyle = "#eceae5"; c.fillRect(0, 0, w, h); ["POWER", "WI-FI", "INTERNET"].forEach((n, i) => txt(c, n, w / 2 + (i - 1) * 0.04 / 0.14 * w, 52, 40, "#334155", 700, "center", FONTE)); });
    rotulo.rotation.x = -Math.PI / 2; rotulo.position.set(-0.01, 0.0352, 0.06); rot.add(rotulo);
    const wan = caixa(0.016, 0.013, 0.004, 0.001, MAT.plasticoPreto); wan.position.set(0.05, 0.018, -0.0752); rot.add(wan);
    rot.position.set(LARG / 2 + 0.25, 0, 0.12); rot.rotation.y = Math.PI * 0.85;
    g.add(rot);
    // cabo da internet: sai do switch, desce pela lateral e termina SOLTO no chão, perto do roteador
    const azul = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.55 });
    const yS = 0.07 + 4 * U + U / 2, xS = -0.15 + 11 * 0.019, zS = PROF / 2 - 0.06 + 0.005;
    const fim = [LARG / 2 + 0.11, 0.006, 0.2];
    g.add(cabo([[xS, yS, zS], [xS + 0.03, yS - 0.01, zS + 0.06], [LARG / 2 + 0.03, yS - 0.1, zS + 0.07], [LARG / 2 + 0.06, 0.05, 0.27], [LARG / 2 + 0.08, 0.006, 0.24], fim], 0.003, azul));
    const plug = new THREE.Group();
    const pv = caixa(0.012, 0.009, 0.02, 0.001, MAT.vidro); pv.position.x = 0.012; pv.rotation.y = Math.PI / 2; plug.add(pv);
    const pc = caixa(0.016, 0.012, 0.014, 0.003, azul); pc.rotation.y = Math.PI / 2; plug.add(pc);
    plug.position.set(fim[0] + 0.006, 0.007, fim[2] - 0.01); plug.rotation.y = 0.5; g.add(plug);
    // etiqueta amarela presa no cabo, perto do plugue
    const tag = etiqueta(0.1, 0.042, 440, (c, w, h) => {
      c.fillStyle = "#fecb00"; c.fillRect(0, 0, w, h);
      B.txtCabe(c, "INTERNET", 20, 78, 66, w - 40, "#001f5c", 900, "left", FONTE);
      B.txtCabe(c, "desconectada", 20, 158, 56, w - 40, "#001f5c", 700, "left", FONTE);
    }, { side: THREE.DoubleSide });
    tag.position.set(LARG / 2 + 0.07, 0.05, 0.27); tag.rotation.set(-0.2, -0.6, 0); g.add(tag);

    function desenhar(p, t = 0) {
      tt.userData.atualizar(p);
      leds.forEach(([l, fase]) => { l.material.emissiveIntensity = 1.2 + 2.2 * (Math.sin(t * 6 + fase * 2.3) > 0.2 ? 1 : 0); });
      rLeds[0].material.emissiveIntensity = 2.5; rLeds[1].material.emissiveIntensity = 2.5;
      rLeds[2].material.emissiveIntensity = Math.sin(t * 3) > 0 ? 3 : 0.3; // internet: vermelho piscando (sem conexão)
    }
    desenhar(0, 0);
    return { grupo: g, desenhar };
  },
};
