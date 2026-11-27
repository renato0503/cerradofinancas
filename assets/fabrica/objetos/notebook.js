// Notebook de alumínio (tamanho real de um 14"): a tampa abre e o ERP se monta na tela.
import * as THREE from "three";
import { MAT, caixa, cilindro, tela, faixa, saida, mola } from "../base.js";
import * as T from "../telas.js";

const LARG = 0.312, PROF = 0.221, ALT_BASE = 0.015, ESP_TAMPA = 0.006;

export function criarNotebook({ desenhoTela = T.erp, abertoFixo = null } = {}) {
  const g = new THREE.Group();

  // base
  const base = caixa(LARG, ALT_BASE, PROF, 0.006, MAT.aluminio);
  base.position.y = ALT_BASE / 2;
  g.add(base);
  // poço do teclado (área escura rebaixada) e teclas em grade: 5 linhas + linha da barra de espaço
  const passo = 0.0192, z0 = -0.083, zPoco = (z0 - 0.011 + z0 + 5 * passo + 0.011) / 2;
  const poco = new THREE.Mesh(new THREE.PlaneGeometry(14 * passo + 0.012, 5 * passo + 0.022 + 0.0005), MAT.grafite);
  poco.rotation.x = -Math.PI / 2; poco.position.set(0, ALT_BASE + 0.0002, zPoco);
  poco.receiveShadow = true;
  g.add(poco);
  const tecla = new THREE.BoxGeometry(0.0158, 0.0016, 0.0152);
  const teclas = new THREE.InstancedMesh(tecla, MAT.plasticoPreto, 14 * 6);
  const mtx = new THREE.Matrix4(), y = ALT_BASE + 0.0009, x = (c) => (c - 6.5) * passo;
  let k = 0;
  for (let l = 0; l < 5; l++) for (let c = 0; c < 14; c++) teclas.setMatrixAt(k++, mtx.makeTranslation(x(c), y, z0 + l * passo));
  for (const c of [0, 1, 2, 3, 10, 11, 12, 13]) teclas.setMatrixAt(k++, mtx.makeTranslation(x(c), y, z0 + 5 * passo));
  teclas.setMatrixAt(k++, new THREE.Matrix4().compose(new THREE.Vector3(0, y, z0 + 5 * passo), new THREE.Quaternion(), new THREE.Vector3(6 * passo / 0.0158 - 0.25, 1, 1)));
  teclas.count = k;
  teclas.castShadow = true;
  g.add(teclas);
  // trackpad
  const track = caixa(0.112, 0.0006, 0.068, 0.0003, MAT.aco);
  track.position.set(0, ALT_BASE + 0.0002, 0.063);
  g.add(track);
  // dobradiça
  const dob = cilindro(0.0045, 0.0045, LARG * 0.78, MAT.grafite);
  dob.rotation.z = Math.PI / 2; dob.position.set(0, ALT_BASE + 0.001, -PROF / 2 + 0.004);
  g.add(dob);

  // tampa (gira em torno da dobradiça)
  const piv = new THREE.Group();
  piv.position.set(0, ALT_BASE + 0.001, -PROF / 2 + 0.003);
  g.add(piv);
  const tampa = caixa(LARG, ESP_TAMPA, PROF - 0.004, 0.004, MAT.aluminio);
  tampa.position.set(0, ESP_TAMPA / 2, (PROF - 0.004) / 2);
  piv.add(tampa);
  const moldura = new THREE.Mesh(new THREE.PlaneGeometry(LARG - 0.006, PROF - 0.01), MAT.vidroPreto);
  moldura.rotation.x = Math.PI / 2; moldura.position.set(0, -0.0001, (PROF - 0.004) / 2);
  piv.add(moldura);
  const telaM = tela(0.288, 0.18, 1280, desenhoTela);
  telaM.rotation.x = Math.PI / 2; telaM.position.set(0, -0.0003, (PROF - 0.004) / 2 + 0.006);
  piv.add(telaM);
  // câmera na moldura
  const cam = new THREE.Mesh(new THREE.CircleGeometry(0.0018, 16), MAT.plasticoCinza);
  cam.rotation.x = Math.PI / 2; cam.position.set(0, -0.0003, PROF - 0.009);
  piv.add(cam);

  function desenhar(p, t, extra) {
    const ang = abertoFixo ?? 108 * mola(faixa(p, 0, 0.3));
    piv.rotation.x = -THREE.MathUtils.degToRad(ang);
    telaM.userData.atualizar(abertoFixo != null ? p : faixa(p, 0.24, 1), extra);
  }
  desenhar(0, 0);
  return { grupo: g, desenhar };
}

export default {
  id: "notebook", nome: "Notebook com o ERP", servico: "Abertura · ERP sob medida",
  criar: () => criarNotebook(),
  vista: { az: 0.35, el: 0.32, folga: 1.05 },
};
