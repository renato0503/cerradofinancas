// Auditoria de verdade: pasta-arquivo, relatório na mesa, lupa passando e carimbo "CONFORME".
import * as THREE from "three";
import { MAT, caixa, cilindro, tela, etiqueta, txt, txtCabe, faixa, saida, suave, ret, FONTE, MONO } from "../base.js";

function relatorio(c, w, h, p) {
  const BW = 630, BH = 891; c.setTransform(w / BW, 0, 0, h / BH, 0, 0);
  c.fillStyle = "#fbfaf6"; c.fillRect(0, 0, BW, BH);
  txt(c, "RELATÓRIO DE CONFORMIDADE", 48, 82, 30, "#111", 800, "left", FONTE);
  txt(c, "LGPD · trilha de auditoria · gestão de riscos", 48, 116, 19, "#444", 500, "left", FONTE);
  c.fillStyle = "#111"; c.fillRect(48, 136, BW - 96, 3);
  const itens = ["Base legal de cada tratamento", "Registro de acessos (trilha imutável)", "Contratos com operadores", "Plano de resposta a incidentes", "Matriz de riscos atualizada"];
  itens.forEach((s, i) => {
    const y = 196 + i * 64;
    ret(c, 48, y - 26, 32, 32, 6, null, "#111", 3);
    const ok = faixa(p, 0.06 + i * 0.08, 0.12 + i * 0.08);
    if (ok > 0) { c.strokeStyle = "#16a34a"; c.lineWidth = 6; c.lineCap = "round"; c.beginPath(); c.moveTo(54, y - 10); c.lineTo(62, y - 2); if (ok > 0.5) c.lineTo(76, y - 22); c.stroke(); }
    txt(c, s, 100, y, 24, "#111", 500, "left", FONTE);
  });
  for (let i = 0; i < 9; i++) { c.fillStyle = "#cfcfc9"; c.fillRect(48, 540 + i * 30, BW - 96 - (i % 4) * 60, 10); }
  txt(c, "Responsável: Controladoria", 48, 850, 18, "#444", 600, "left", MONO);
  // marca do carimbo (aparece quando o carimbo toca o papel)
  const m = faixa(p, 0.6, 0.62);
  if (m > 0) {
    c.save(); c.translate(400, 700); c.rotate(-0.16); c.globalAlpha = 0.85 * m;
    c.strokeStyle = "#c81e1e"; c.lineWidth = 8; c.strokeRect(-150, -52, 300, 104);
    c.lineWidth = 3; c.strokeRect(-140, -42, 280, 84);
    txt(c, "CONFORME", 0, 16, 56, "#c81e1e", 900, "center", FONTE);
    c.restore();
  }
}

export default {
  id: "auditoria", nome: "Auditoria e carimbo", servico: "Compliance e auditoria",
  vista: { az: 0.35, el: 0.6, folga: 1.0 },
  criar() {
    const g = new THREE.Group();
    // pasta-arquivo (tipo AZ): duas capas de papelão revestido, lombada com etiqueta e furo, folhas aparecendo
    const pastaAZ = (corHex, titulo) => {
      const p = new THREE.Group();
      const rev = new THREE.MeshStandardMaterial({ color: corHex, roughness: 0.55 });
      const ESP = 0.075, ALTP = 0.32, PRO = 0.285;
      [-1, 1].forEach((s) => { const capa = caixa(0.003, ALTP, PRO, 0.0012, rev); capa.position.set(s * (ESP / 2 - 0.0015), ALTP / 2, 0); p.add(capa); });
      const lomb = caixa(ESP, ALTP, 0.004, 0.0015, rev); lomb.position.set(0, ALTP / 2, -PRO / 2 + 0.002); p.add(lomb);
      const folhas = caixa(ESP - 0.016, ALTP - 0.012, PRO - 0.02, 0.001, MAT.papel); folhas.position.set(0, ALTP / 2 - 0.004, 0.006); p.add(folhas);
      const rot = etiqueta(0.05, 0.15, 260, (c, w, h) => { c.fillStyle = "#fbfaf6"; c.fillRect(0, 0, w, h); c.strokeStyle = "#94a3b8"; c.lineWidth = 3; c.strokeRect(6, 6, w - 12, h - 12); c.save(); c.translate(w / 2, h / 2); c.rotate(-Math.PI / 2); txtCabe(c, titulo, 0, 22, 62, h - 60, "#001f5c", 900, "center", FONTE); c.restore(); });
      rot.rotation.y = Math.PI; rot.position.set(0, 0.2, -PRO / 2 - 0.0002); p.add(rot);
      const furo = new THREE.Mesh(new THREE.TorusGeometry(0.013, 0.0028, 12, 32), MAT.aco); furo.position.set(0, 0.07, -PRO / 2 - 0.001); p.add(furo);
      const fundo = new THREE.Mesh(new THREE.CircleGeometry(0.012, 24), MAT.plasticoPreto); fundo.rotation.y = Math.PI; fundo.position.set(0, 0.07, -PRO / 2 - 0.0006); p.add(fundo);
      return p;
    };
    const pasta = pastaAZ(0x0b3a8c, "AUDITORIA 2026"); pasta.position.set(-0.22, 0, -0.12); pasta.rotation.y = Math.PI + 0.12; g.add(pasta);
    const pasta2 = pastaAZ(0x334155, "CONTRATOS"); pasta2.position.set(-0.305, 0, -0.13); pasta2.rotation.y = Math.PI + 0.12; g.add(pasta2);
    const pasta3 = pastaAZ(0x166534, "LGPD"); pasta3.position.set(-0.39, 0, -0.14); pasta3.rotation.y = Math.PI + 0.12; g.add(pasta3);
    // pilha de folhas + relatório por cima
    for (let i = 0; i < 6; i++) { const f = caixa(0.21, 0.0012, 0.297, 0.0003, MAT.papel); f.position.set(0.02 + i * 0.0015, 0.0006 + i * 0.0012, 0.02 - i * 0.002); f.rotation.y = 0.05 - i * 0.012; g.add(f); }
    const doc = tela(0.21, 0.297, 630, relatorio, { papel: true });
    doc.rotation.x = -Math.PI / 2; doc.rotation.z = 0.02; doc.position.set(0.025, 0.0084, 0.02); g.add(doc);
    // lupa
    const lupa = new THREE.Group();
    const aro = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.0045, 16, 64), MAT.grafite); aro.rotation.x = -Math.PI / 2; lupa.add(aro);
    const lente = new THREE.Mesh(new THREE.CircleGeometry(0.044, 48), MAT.vidro); lente.rotation.x = -Math.PI / 2; lupa.add(lente);
    const cabo = cilindro(0.007, 0.009, 0.11, new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.5 })); cabo.rotation.z = Math.PI / 2; cabo.position.x = 0.1; lupa.add(cabo);
    g.add(lupa);
    // carimbo de madeira
    const carimbo = new THREE.Group();
    const borr = caixa(0.07, 0.008, 0.035, 0.001, new THREE.MeshStandardMaterial({ color: 0x7f1d1d, roughness: 0.9 })); borr.position.y = 0.004; carimbo.add(borr);
    const bloco = caixa(0.075, 0.018, 0.04, 0.003, MAT.madeira); bloco.position.y = 0.017; carimbo.add(bloco);
    const haste = cilindro(0.008, 0.01, 0.05, MAT.madeira); haste.position.y = 0.05; carimbo.add(haste);
    const bola = new THREE.Mesh(new THREE.SphereGeometry(0.019, 32, 16), MAT.madeira); bola.position.y = 0.085; bola.castShadow = true; carimbo.add(bola);
    g.add(carimbo);
    // almofada de tinta
    const alm = caixa(0.1, 0.012, 0.065, 0.004, MAT.grafite); alm.position.set(0.22, 0.006, 0.17); g.add(alm);
    const tinta = new THREE.Mesh(new THREE.PlaneGeometry(0.088, 0.054), new THREE.MeshStandardMaterial({ color: 0x7f1d1d, roughness: 0.6 })); tinta.rotation.x = -Math.PI / 2; tinta.position.set(0.22, 0.0122, 0.17); g.add(tinta);

    // posições: o carimbo sai da almofada, desce no relatório e volta
    const sobreDoc = new THREE.Vector3(0.025 + 0.044, 0, 0.02 + 0.065), naAlm = new THREE.Vector3(0.22, 0.012, 0.17);
    function desenhar(p) {
      // lupa passa da esquerda para a direita sobre a lista (0 → 0,48)
      const l = suave(faixa(p, 0.0, 0.48));
      lupa.position.set(-0.03 + l * 0.12, 0.05 + Math.sin(l * Math.PI) * 0.01, -0.06 + l * 0.07);
      lupa.rotation.y = -0.4 + l * 0.2;
      // carimbo: sobe da almofada (0,45), vai até o documento, desce (0,6), sobe (0,7) e volta (0,9)
      const ida = suave(faixa(p, 0.45, 0.56)), desce = faixa(p, 0.56, 0.6), sobe = faixa(p, 0.62, 0.7), volta = suave(faixa(p, 0.72, 0.92));
      const pos = naAlm.clone().lerp(sobreDoc, ida).lerp(naAlm, volta);
      const ALTO = 0.09, MESA = 0.0085, ALM = 0.012;
      let alt = ALM + (ALTO - ALM) * ida;
      if (p >= 0.56) alt = ALTO - (ALTO - MESA) * desce;
      if (p >= 0.62) alt = MESA + (ALTO - MESA) * sobe;
      if (p >= 0.72) alt = ALTO - (ALTO - ALM) * volta;
      carimbo.position.set(pos.x, alt, pos.z);
      carimbo.rotation.y = -0.16;
      doc.userData.atualizar(p);
    }
    desenhar(0);
    return { grupo: g, desenhar };
  },
};
