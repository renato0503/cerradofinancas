// Integrações: switch de rede de 24 portas; cada cabo (SAP, TOTVS, Bling, Power BI, banco) encaixa e o LED acende.
import * as THREE from "three";
import { MAT, caixa, cabo, etiqueta, led, txt, txtCabe, faixa, mola, FONTE, MONO } from "../base.js";

const SISTEMAS = [["SAP", 0x2563eb], ["TOTVS", 0x0ea5e9], ["Bling", 0x16a34a], ["Power BI", 0xf59e0b], ["Banco", 0xdc2626]];

export default {
  id: "switch", nome: "Switch com as integrações", servico: "Integrações · SAP, TOTVS, bancos, BI",
  vista: { az: 0.3, el: 0.4, folga: 1.0 },
  criar() {
    const g = new THREE.Group();
    const W = 0.44, H = 0.044, D = 0.25;
    const sw = caixa(W, H, D, 0.003, MAT.grafite); sw.position.y = H / 2 + 0.004; g.add(sw);
    for (const sx of [-1, 1]) { const pe = caixa(0.03, 0.004, 0.03, 0.001, MAT.borracha); pe.position.set(sx * 0.17, 0.002, 0.08); g.add(pe); }
    const frente = etiqueta(W - 0.004, H - 0.006, 1600, (c, w, h) => {
      c.fillStyle = "#24282e"; c.fillRect(0, 0, w, h);
      txt(c, "24 portas · gigabit", 40, 70, 36, "#94a3b8", 600, "left", MONO);
      txt(c, "SUA EMPRESA", 40, 120, 34, "#e2e8f0", 800, "left", FONTE);
    }, { roughness: 0.6 });
    frente.position.set(0, H / 2 + 0.004, D / 2 + 0.0004); g.add(frente);
    const portas = [], leds = [];
    for (let l = 0; l < 2; l++) for (let i = 0; i < 12; i++) {
      const x = -0.06 + i * 0.0185 + Math.floor(i / 6) * 0.008, y = 0.004 + H / 2 + (l ? -0.009 : 0.009);
      const porta = caixa(0.0145, 0.0125, 0.004, 0.0008, MAT.plasticoPreto); porta.position.set(x, y, D / 2 + 0.0005); g.add(porta);
      const ld = new THREE.Mesh(new THREE.PlaneGeometry(0.003, 0.0018), led(0x22c55e)); ld.position.set(x + 0.005, y + (l ? -0.0078 : 0.0078), D / 2 + 0.0026); g.add(ld);
      portas.push(new THREE.Vector3(x, y, D / 2)); leds.push(ld);
    }
    // cabos: plugue + capa colorida + bandeirinha com o nome do sistema
    const cabos = SISTEMAS.map(([nome, cor], k) => {
      const porta = portas[k * 2 + (k > 2 ? 3 : 0)];
      const mat = new THREE.MeshStandardMaterial({ color: cor, roughness: 0.5 });
      const plug = new THREE.Group();
      const vidro = caixa(0.0115, 0.0095, 0.018, 0.0008, MAT.vidro); vidro.position.z = 0.002; plug.add(vidro);
      const capa = caixa(0.014, 0.012, 0.02, 0.003, mat); capa.position.z = 0.019; plug.add(capa);
      const chao = -porta.y + 0.003;
      const fio = cabo([[0, 0, 0.028], [0, -0.002, 0.06], [0, chao * 0.7, 0.1], [(k - 2) * 0.03, chao, 0.16], [(k - 2) * 0.08, chao, 0.3]], 0.0028, mat);
      plug.add(fio);
      const flag = etiqueta(0.06, 0.022, 360, (c, w, h) => { c.fillStyle = "#fff"; c.fillRect(0, 0, w, h); c.fillStyle = "#" + cor.toString(16).padStart(6, "0"); c.fillRect(0, 0, 18, h); txtCabe(c, nome, w / 2 + 9, 94, 80, w - 50, "#0f172a", 800, "center", FONTE); }, { side: THREE.DoubleSide });
      flag.position.set(0.032, -0.004, 0.06); flag.rotation.y = -Math.PI / 2 + 0.3; plug.add(flag);
      g.add(plug);
      return { plug, porta, led: leds[k * 2 + (k > 2 ? 3 : 0)] };
    });
    function desenhar(p, t = 0) {
      cabos.forEach(({ plug, porta, led: ld }, k) => {
        const e = mola(faixa(p, 0.08 + k * 0.15, 0.24 + k * 0.15));
        plug.position.set(porta.x, porta.y, porta.z - 0.009 + (1 - e) * 0.07);
        ld.material.emissiveIntensity = e > 0.97 ? 2.5 + (Math.sin(t * 9 + k * 2) > 0.3 ? 1.5 : 0) : 0;
      });
      leds.forEach((l, i) => { if (!cabos.some((c) => c.led === l)) l.material.emissiveIntensity = 0; });
    }
    desenhar(0, 0);
    return { grupo: g, desenhar };
  },
};
