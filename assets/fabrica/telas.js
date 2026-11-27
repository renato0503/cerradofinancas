// Interfaces que aparecem nas telas dos objetos. Cada função desenha num canvas a partir do progresso p (0→1).
// Desenho numa "base" fixa (ex.: 1280 x 800) e escala para o tamanho real do canvas.
import { COR, FONTE, MONO, MAO, ret, txt, txtCabe, faixa, saida, clamp, lerp, reais } from "./desenho.js";

function base(c, w, h, bw, bh) { c.setTransform(w / bw, 0, 0, h / bh, 0, 0); }
const aparece = (p, i, ini = 0.08, passo = 0.07, dur = 0.14) => saida(faixa(p, ini + i * passo, ini + i * passo + dur));

function codigoBarras(c, x, y, w, h, semente = 7, cor = "#111") {
  c.fillStyle = cor;
  let px = x, s = semente;
  while (px < x + w) {
    s = (s * 9301 + 49297) % 233280;
    const larg = 1 + (s % 4);
    if ((s >> 3) % 2) c.fillRect(px, y, larg, h);
    px += larg + 1;
  }
}

// ---------------------------------------------------------------- ERP (notebook da abertura e "Monte o seu sistema")
import { MODULOS, MODULOS_PADRAO } from "./modulos.js";
export { MODULOS, MODULOS_PADRAO };

export function erp(c, w, h, p, extra) {
  const BW = 1280, BH = 800;
  base(c, w, h, BW, BH);
  const mods = (extra && extra.modulos && extra.modulos.length ? extra.modulos : MODULOS_PADRAO).filter((k) => MODULOS[k]);
  c.fillStyle = "#05070c"; c.fillRect(0, 0, BW, BH);
  const liga = faixa(p, 0, 0.06);
  if (liga <= 0) return;
  c.globalAlpha = liga;
  c.fillStyle = COR.fundoUI; c.fillRect(0, 0, BW, BH);
  // barra lateral
  const sb = aparece(p, 0, 0.04);
  c.save(); c.translate(lerp(-240, 0, sb), 0);
  c.fillStyle = COR.azul; c.fillRect(0, 0, 230, BH);
  txt(c, "Sua Empresa", 28, 58, 24, "#fff", 800);
  txt(c, "ERP sob medida", 28, 84, 15, "rgba(255,255,255,.6)", 500);
  const menu = ["Painel", ...mods.map((k) => MODULOS[k].menu)];
  menu.forEach((it, i) => {
    const a = aparece(p, i, 0.1, 0.05);
    c.globalAlpha = liga * a;
    if (i === 0) ret(c, 14, 116 + i * 52, 202, 42, 10, "rgba(254,203,0,.16)");
    ret(c, 30, 131 + i * 52, 12, 12, 3, i === 0 ? COR.dourado : "rgba(255,255,255,.45)");
    txt(c, it, 56, 143 + i * 52, 18, i === 0 ? COR.dourado : "#e2e8f0", i === 0 ? 700 : 500);
  });
  c.restore(); c.globalAlpha = liga;
  // topo
  const tp = aparece(p, 1, 0.06);
  c.globalAlpha = liga * tp;
  txt(c, "Painel", 270, 62, 30, COR.tinta, 800);
  txt(c, "Novembro de 2026 · atualizado agora", 270, 90, 16, COR.cinza, 500);
  ret(c, 900, 36, 260, 44, 22, "#fff", COR.linha);
  txt(c, "Buscar…", 926, 64, 16, "#94a3b8", 500);
  c.beginPath(); c.arc(1214, 58, 22, 0, 7); c.fillStyle = COR.azulMedio; c.fill();
  txt(c, "RR", 1214, 65, 16, "#fff", 700, "center");
  // cartões dos módulos (até 8, em grade)
  const n = Math.min(mods.length, 8), cols = n <= 4 ? n : 4, linhas = Math.ceil(n / 4);
  const gx = 270, gw = BW - gx - 40, gap = 18, cw = (gw - gap * (cols - 1)) / cols, ch = linhas > 1 ? 112 : 132;
  mods.slice(0, 8).forEach((k, i) => {
    const a = aparece(p, i, 0.22, 0.06);
    if (a <= 0) return;
    const [rot, val, sub, cor] = MODULOS[k].card;
    const x = gx + (i % 4) * (cw + gap), y = 122 + Math.floor(i / 4) * (ch + 14) + (1 - a) * 24;
    c.globalAlpha = liga * a;
    ret(c, x, y, cw, ch, 14, "#fff", COR.linha);
    ret(c, x, y, 6, ch, 3, cor);
    txtCabe(c, rot, x + 22, y + 36, 16, cw - 36, COR.cinza, 600);
    txtCabe(c, val, x + 22, y + (linhas > 1 ? 72 : 80), linhas > 1 ? 26 : 30, cw - 36, COR.tinta, 800);
    txtCabe(c, sub, x + 22, y + (linhas > 1 ? 98 : 112), 15, cw - 36, cor, 600);
  });
  // gráfico
  const gy = 122 + linhas * (ch + 14) + 10, gh = BH - gy - 36;
  const ag = aparece(p, 0, 0.5, 0, 0.12);
  c.globalAlpha = liga * ag;
  ret(c, 270, gy, 600, gh, 14, "#fff", COR.linha);
  txt(c, "Receitas × despesas", 294, gy + 40, 18, COR.tinta, 700);
  const meses = ["jun", "jul", "ago", "set", "out", "nov"], rec = [62, 70, 66, 78, 84, 92], des = [48, 52, 50, 55, 57, 60];
  const bh = gh - 110, by = gy + gh - 40;
  meses.forEach((mes, i) => {
    const cresce = saida(faixa(p, 0.55 + i * 0.04, 0.75 + i * 0.04));
    const x = 310 + i * 92;
    ret(c, x, by - bh * rec[i] / 100 * cresce, 28, bh * rec[i] / 100 * cresce, 5, COR.azulMedio);
    ret(c, x + 32, by - bh * des[i] / 100 * cresce, 28, bh * des[i] / 100 * cresce, 5, "#cbd5e1");
    txt(c, mes, x + 30, by + 24, 14, COR.cinza, 500, "center");
  });
  // movimentações
  const am = aparece(p, 0, 0.6, 0, 0.12);
  c.globalAlpha = liga * am;
  ret(c, 890, gy, 350, gh, 14, "#fff", COR.linha);
  txt(c, "Últimas movimentações", 914, gy + 40, 18, COR.tinta, 700);
  const mov = [["NF-e 4.318 emitida", "+ R$ 9.840,00", COR.verde], ["Fornecedor · aço", "− R$ 3.215,40", COR.vermelho],
    ["Pix recebido", "+ R$ 1.290,00", COR.verde], ["Folha · adiantamento", "− R$ 18.400,00", COR.vermelho]];
  mov.forEach(([a, v, cor], i) => {
    const ai = aparece(p, i, 0.66, 0.05);
    c.globalAlpha = liga * ai;
    const y = gy + 82 + i * ((gh - 100) / 4);
    txtCabe(c, a, 914, y, 16, 190, COR.tinta, 500);
    txt(c, v, 1218, y, 16, cor, 700, "right");
  });
  c.globalAlpha = 1;
}

// ---------------------------------------------------------------- Estoque (tablet preso na estante)
export function estoque(c, w, h, p) {
  const BW = 1024, BH = 640;
  base(c, w, h, BW, BH);
  c.fillStyle = COR.fundoUI; c.fillRect(0, 0, BW, BH);
  c.fillStyle = COR.azul; c.fillRect(0, 0, BW, 84);
  txt(c, "Estoque · Almoxarifado A", 32, 54, 30, "#fff", 800);
  const saiu = p >= 0.42;
  const linhas = [["CX-1042", "Parafuso sextavado M8 · cx 500", 24, 10], ["CX-0877", "Arruela lisa 8 mm · cx 1000", 61, 15],
    ["CX-2210", "Porca M8 zincada · cx 500", 9, 12], ["CX-3105", "Bucha nylon 10 mm · cx 200", 37, 10]];
  txt(c, "SKU", 32, 130, 18, COR.cinza, 700); txt(c, "Produto", 190, 130, 18, COR.cinza, 700);
  txt(c, "Saldo", 860, 130, 18, COR.cinza, 700, "right"); txt(c, "Mín.", 990, 130, 18, COR.cinza, 700, "right");
  linhas.forEach(([sku, prod, saldo, min], i) => {
    const y = 150 + i * 92;
    const destaque = i === 0 && p > 0.3;
    ret(c, 18, y, BW - 36, 80, 12, destaque ? "rgba(254,203,0,.22)" : "#fff", destaque ? COR.dourado : COR.linha, destaque ? 3 : 2);
    txt(c, sku, 32, y + 50, 22, COR.tinta, 700, "left", MONO);
    txtCabe(c, prod, 190, y + 50, 22, 560, COR.tinta, 500);
    const s = i === 0 && saiu ? saldo - 1 : saldo;
    txt(c, String(s), 860, y + 52, 30, s < min ? COR.vermelho : COR.tinta, 800, "right");
    txt(c, String(min), 990, y + 50, 22, COR.cinza, 500, "right");
  });
  const a = saida(faixa(p, 0.45, 0.6));
  if (a > 0) {
    c.globalAlpha = a;
    ret(c, 18, BH - 74 + (1 - a) * 30, BW - 36, 58, 12, COR.verde);
    txt(c, "✓ Saída registrada · NF-e 4.318 · CX-1042 (−1)", 40, BH - 36 + (1 - a) * 30, 22, "#fff", 700);
    c.globalAlpha = 1;
  }
}

// ---------------------------------------------------------------- CRM (celular)
export function crm(c, w, h, p) {
  const BW = 390, BH = 844;
  base(c, w, h, BW, BH);
  c.fillStyle = "#fff"; c.fillRect(0, 0, BW, BH);
  // barra de status
  txt(c, "9:41", 32, 34, 16, COR.tinta, 700);
  ret(c, 322, 22, 28, 13, 3, null, COR.tinta, 1.5); c.fillStyle = COR.tinta; c.fillRect(325, 25, 18, 7);
  const fase = faixa(p, 0.42, 0.52);
  // --- conversa
  c.globalAlpha = 1 - fase;
  c.fillStyle = COR.azul; c.fillRect(0, 50, BW, 76);
  c.beginPath(); c.arc(44, 88, 20, 0, 7); c.fillStyle = "#cbd5e1"; c.fill();
  txt(c, "DA", 44, 94, 15, COR.azul, 800, "center");
  txt(c, "Distribuidora Andrade", 76, 84, 18, "#fff", 700);
  txt(c, "cliente novo · Cuiabá", 76, 106, 13, "rgba(255,255,255,.7)", 500);
  c.fillStyle = "#eef2f7"; c.fillRect(0, 126, BW, BH - 126);
  const balao = (i, ini, lado, linhas, cor, corTxt) => {
    const a = saida(faixa(p, ini, ini + 0.08));
    if (a <= 0) return;
    const y = 160 + i * 128 + (1 - a) * 20, bw = 270, bh = 28 + linhas.length * 24;
    const x = lado === "d" ? BW - bw - 18 : 18;
    c.globalAlpha = (1 - fase) * a;
    ret(c, x, y, bw, bh, 16, cor);
    linhas.forEach((l, j) => txt(c, l, x + 16, y + 34 + j * 24, 16, corTxt, 500));
  };
  balao(0, 0.04, "e", ["Bom dia! Preciso de orçamento", "para 200 unidades do item 4."], "#fff", COR.tinta);
  balao(1, 0.16, "d", ["Recebido! Já abri a sua", "proposta. Retorno em 1 hora."], COR.azulMedio, "#fff");
  const ok = saida(faixa(p, 0.27, 0.35));
  if (ok > 0) {
    c.globalAlpha = (1 - fase) * ok;
    ret(c, 60, 430, BW - 120, 46, 23, "rgba(254,203,0,.25)", COR.dourado);
    txt(c, "+ Lead criado no funil", BW / 2, 460, 16, COR.tinta, 700, "center");
  }
  // --- funil
  if (fase > 0) {
    c.globalAlpha = fase;
    c.fillStyle = "#fff"; c.fillRect(0, 50, BW, BH - 50);
    txt(c, "Funil de vendas", 24, 96, 26, COR.tinta, 800);
    txt(c, "R$ 1,2 mi em propostas", 24, 122, 15, COR.cinza, 500);
    const etapas = [["Lead", 7], ["Proposta", 5], ["Negociação", 4], ["Fechado", 2]];
    const pos = lerp(0, 2, saida(faixa(p, 0.55, 0.92)));
    etapas.forEach(([nome, qtd], i) => {
      const y = 150 + i * 160;
      ret(c, 18, y, BW - 36, 146, 14, "#f8fafc", COR.linha);
      txt(c, nome, 34, y + 32, 17, COR.tinta, 700);
      txt(c, String(qtd + (Math.round(pos) === i ? 1 : 0)), BW - 34, y + 32, 15, COR.cinza, 700, "right");
      ret(c, 34, y + 50, BW - 68, 34, 8, "#e2e8f0");
    });
    const yCard = 150 + pos * 160 + 92;
    ret(c, 30, yCard, BW - 60, 48, 10, COR.azulMedio);
    txt(c, "Distribuidora Andrade", 46, yCard + 30, 15, "#fff", 700);
    txt(c, "R$ 38.400", BW - 46, yCard + 30, 15, COR.dourado, 800, "right");
  }
  c.globalAlpha = 1;
}

// ---------------------------------------------------------------- Cerra.AI (console do rack)
export function cerraai(c, w, h, p) {
  const BW = 1280, BH = 720;
  base(c, w, h, BW, BH);
  c.fillStyle = "#0b1220"; c.fillRect(0, 0, BW, BH);
  // lateral de documentos
  c.fillStyle = "#111a2e"; c.fillRect(0, 0, 330, BH);
  txt(c, "Cerra.AI", 28, 56, 30, "#fff", 800);
  txt(c, "Documentos da empresa", 28, 108, 15, "#94a3b8", 600);
  const docs = [["PDF", "Contrato_fornecedor_2026.pdf"], ["DOC", "Manual_de_compras.docx"], ["XLS", "Pedidos_outubro.xlsx"], ["MP3", "Reuniao_10-11.mp3"]];
  docs.forEach(([t, n], i) => {
    const y = 128 + i * 64, ativo = i === 0 && p > 0.1;
    ret(c, 18, y, 294, 52, 10, ativo ? "rgba(254,203,0,.14)" : "rgba(255,255,255,.04)", ativo ? COR.dourado : null);
    ret(c, 30, y + 12, 44, 28, 6, ["#dc2626", "#2563eb", "#16a34a", "#9333ea"][i]);
    txt(c, t, 52, y + 32, 12, "#fff", 800, "center");
    txtCabe(c, n, 86, y + 33, 15, 214, "#e2e8f0", 500);
  });
  ret(c, 18, BH - 66, 294, 44, 22, "rgba(22,163,74,.15)", "#16a34a");
  c.beginPath(); c.arc(42, BH - 44, 6, 0, 7); c.fillStyle = "#22c55e"; c.fill();
  txt(c, "Offline · nada sai da empresa", 58, BH - 38, 14, "#bbf7d0", 700);
  // conversa
  const q = saida(faixa(p, 0.08, 0.18));
  if (q > 0) {
    c.globalAlpha = q;
    ret(c, 720, 60 + (1 - q) * 16, 520, 64, 16, COR.azulMedio);
    txt(c, "Qual a multa por atraso na entrega?", 744, 100 + (1 - q) * 16, 19, "#fff", 600);
  }
  const pensando = faixa(p, 0.2, 0.34);
  if (pensando > 0 && pensando < 1) {
    c.globalAlpha = 1;
    for (let i = 0; i < 3; i++) {
      const b = 0.5 + 0.5 * Math.sin(pensando * 20 - i);
      c.beginPath(); c.arc(400 + i * 22, 180, 7, 0, 7); c.fillStyle = `rgba(148,163,184,${0.4 + b * 0.6})`; c.fill();
    }
  }
  const resp = "Multa de 2% ao mês sobre o valor do pedido, limitada a 10% do total. Vale a partir do 1º dia útil de atraso.";
  const k = Math.round(resp.length * faixa(p, 0.34, 0.74));
  if (k > 0) {
    c.globalAlpha = 1;
    ret(c, 370, 160, 700, 190, 16, "#16213a");
    const pal = resp.slice(0, k).split(" "), lin = [];
    let atual = "";
    c.font = `500 21px ${FONTE}`;
    pal.forEach((pw) => { const t = atual ? atual + " " + pw : pw; if (c.measureText(t).width > 640) { lin.push(atual); atual = pw; } else atual = t; });
    lin.push(atual);
    lin.forEach((l, i) => txt(c, l, 396, 204 + i * 32, 21, "#f1f5f9", 500));
  }
  const cit = saida(faixa(p, 0.76, 0.86));
  if (cit > 0) {
    c.globalAlpha = cit;
    ret(c, 396, 300, 470, 38, 19, "rgba(254,203,0,.16)", COR.dourado);
    txt(c, "Fonte: Contrato_fornecedor_2026.pdf · pág. 12", 416, 325, 15, COR.dourado, 700);
  }
  // página citada
  const pg = saida(faixa(p, 0.84, 0.98));
  if (pg > 0) {
    c.globalAlpha = pg;
    ret(c, 370, 380, 700, 300, 12, "#f8fafc");
    txt(c, "Cláusula 8 · Penalidades", 400, 424, 20, COR.tinta, 800);
    for (let i = 0; i < 7; i++) ret(c, 400, 446 + i * 30, i === 2 ? 560 : 620 - (i % 3) * 60, 12, 6, "#cbd5e1");
    ret(c, 392, 498, 640, 44, 6, "rgba(254,203,0,.35)");
    txt(c, "8.3 Multa de 2% a.m., limitada a 10%…", 404, 527, 17, COR.tinta, 700);
  }
  c.globalAlpha = 1;
}

// ---------------------------------------------------------------- Maquininha de cartão
export function maquininha(c, w, h, p) {
  const BW = 320, BH = 240;
  base(c, w, h, BW, BH);
  c.fillStyle = "#f8fafc"; c.fillRect(0, 0, BW, BH);
  txt(c, "Crédito à vista", BW / 2, 40, 18, COR.cinza, 600, "center");
  txt(c, "R$ 189,90", BW / 2, 92, 42, COR.tinta, 800, "center");
  if (p < 0.25) txt(c, "Aproxime ou insira o cartão", BW / 2, 160, 17, COR.azulMedio, 600, "center");
  else if (p < 0.5) {
    const a = (p - 0.25) * 40;
    c.lineWidth = 7; c.strokeStyle = COR.azulMedio; c.beginPath(); c.arc(BW / 2, 160, 26, a, a + 4.2); c.stroke();
    txt(c, "Processando…", BW / 2, 218, 16, COR.cinza, 600, "center");
  } else {
    const s = saida(faixa(p, 0.5, 0.6));
    c.beginPath(); c.arc(BW / 2, 158, 30 * s, 0, 7); c.fillStyle = COR.verde; c.fill();
    c.strokeStyle = "#fff"; c.lineWidth = 7; c.lineCap = "round";
    c.beginPath(); c.moveTo(BW / 2 - 13, 158); c.lineTo(BW / 2 - 3, 169); c.lineTo(BW / 2 + 15, 147); c.globalAlpha = s; c.stroke();
    txt(c, "APROVADO", BW / 2, 220, 22, COR.verde, 800, "center");
  }
  c.globalAlpha = 1;
}

// Comprovante e etiqueta de envio (papel impresso, estático)
export function etiquetaEnvio(c, w, h) {
  const BW = 600, BH = 400;
  base(c, w, h, BW, BH);
  c.fillStyle = "#fbfbf8"; c.fillRect(0, 0, BW, BH);
  c.strokeStyle = "#111"; c.lineWidth = 4; c.strokeRect(14, 14, BW - 28, BH - 28);
  txt(c, "SUA MARCA", 36, 66, 30, "#111", 900);
  txt(c, "Pedido #0427 · entrega expressa", 36, 98, 18, "#333", 600);
  c.fillRect(14, 116, BW - 28, 3);
  txt(c, "DESTINATÁRIO", 36, 150, 15, "#555", 700);
  txt(c, "Maria Souza", 36, 182, 24, "#111", 700);
  txt(c, "Av. Historiador Rubens de Mendonça, 1000", 36, 210, 17, "#111", 500);
  txt(c, "CEP 78050-000 · Cuiabá/MT", 36, 236, 17, "#111", 500);
  codigoBarras(c, 36, 268, 400, 80, 11);
  txt(c, "BR 0427 7805 0000", 236, 372, 16, "#111", 600, "center", MONO);
}

export function danfe(c, w, h) {
  const BW = 420, BH = 600;
  base(c, w, h, BW, BH);
  c.fillStyle = "#fbfbf8"; c.fillRect(0, 0, BW, BH);
  c.strokeStyle = "#222"; c.lineWidth = 2; c.strokeRect(10, 10, BW - 20, BH - 20);
  txt(c, "DANFE", 24, 46, 26, "#111", 900);
  txt(c, "Documento auxiliar da NF-e", 24, 68, 13, "#333", 500);
  txt(c, "Nº 000.004.318 · Série 1", 24, 92, 15, "#111", 700);
  codigoBarras(c, 24, 108, 372, 46, 5);
  c.fillRect(10, 168, BW - 20, 2);
  txt(c, "DESCRIÇÃO", 24, 194, 12, "#444", 700); txt(c, "QTD", 300, 194, 12, "#444", 700); txt(c, "VALOR", 396, 194, 12, "#444", 700, "right");
  [["Parafuso sextav. M8 cx500", "1", "189,90"], ["Arruela lisa 8 mm cx1000", "2", "96,40"], ["Porca M8 zincada cx500", "1", "74,10"]].forEach(([d, q, v], i) => {
    txt(c, d, 24, 222 + i * 26, 13, "#111", 500); txt(c, q, 306, 222 + i * 26, 13, "#111", 500); txt(c, v, 396, 222 + i * 26, 13, "#111", 600, "right");
  });
  c.fillRect(10, 310, BW - 20, 2);
  txt(c, "VALOR TOTAL", 24, 340, 14, "#111", 700); txt(c, "R$ 456,80", 396, 340, 18, "#111", 900, "right");
  for (let i = 0; i < 8; i++) { c.fillStyle = "#c9c9c4"; c.fillRect(24, 372 + i * 24, 372 - (i % 3) * 70, 8); }
}

// ---------------------------------------------------------------- Painel executivo (monitor)
export function painel(c, w, h, p) {
  const BW = 1600, BH = 900;
  base(c, w, h, BW, BH);
  c.fillStyle = "#0b1220"; c.fillRect(0, 0, BW, BH);
  txt(c, "Painel executivo", 48, 78, 40, "#fff", 800);
  txt(c, "Novembro de 2026 · dados do ERP, do banco e do CRM", 48, 114, 19, "#94a3b8", 500);
  const kpis = [["Receita líquida", 1.84, "R$ %s mi", "+9% no ano", COR.verde], ["EBITDA", 18.4, "%s%", "margem", COR.dourado],
    ["Margem bruta", 41.2, "%s%", "meta 40%", COR.verde], ["Meta comercial", 86, "%s%", "faltam 14%", COR.azulClaro]];
  kpis.forEach(([rot, v, fmt, sub, cor], i) => {
    const a = saida(faixa(p, 0.05 + i * 0.06, 0.25 + i * 0.06));
    const x = 48 + i * 384;
    c.globalAlpha = 0.3 + 0.7 * a;
    ret(c, x, 150, 360, 150, 16, "#111a2e");
    txt(c, rot, x + 26, 194, 19, "#94a3b8", 600);
    const val = (v * a).toLocaleString("pt-BR", { minimumFractionDigits: v < 10 ? 2 : 1, maximumFractionDigits: v < 10 ? 2 : 1 });
    txt(c, fmt.replace("%s", val), x + 26, 252, 44, "#fff", 800);
    txt(c, sub, x + 26, 284, 17, cor, 700);
  });
  c.globalAlpha = 1;
  // DRE em cascata
  ret(c, 48, 330, 900, 520, 16, "#111a2e");
  txt(c, "DRE do mês (R$ mil)", 76, 378, 22, "#fff", 700);
  const dre = [["Receita", 1840, 0, COR.azulClaro], ["Impostos", -235, 1840, COR.vermelho], ["CMV", -847, 1605, COR.vermelho],
    ["Despesas", -420, 758, COR.vermelho], ["EBITDA", 338, 0, COR.dourado]];
  const esc = 360 / 1840, by = 800;
  dre.forEach(([n, v, ini, cor], i) => {
    const g = saida(faixa(p, 0.3 + i * 0.07, 0.5 + i * 0.07));
    const x = 96 + i * 168, topo = v >= 0 ? ini + v : ini, alt = Math.abs(v) * esc * g;
    const yTopo = by - topo * esc;
    ret(c, x, v >= 0 ? by - ini * esc - alt : yTopo, 110, Math.max(alt, 1), 6, cor);
    c.globalAlpha = g;
    txt(c, (v > 0 ? "" : "−") + Math.abs(v).toLocaleString("pt-BR"), x + 55, (v >= 0 ? by - ini * esc - alt : yTopo) - 12, 18, "#e2e8f0", 700, "center");
    c.globalAlpha = 1;
    txt(c, n, x + 55, by + 32, 17, "#94a3b8", 600, "center");
  });
  // linha do EBITDA em 12 meses
  ret(c, 972, 330, 580, 520, 16, "#111a2e");
  txt(c, "EBITDA · 12 meses", 1000, 378, 22, "#fff", 700);
  const serie = [11, 12.5, 12, 13.8, 14.1, 13.6, 15.2, 16, 15.7, 17.1, 17.9, 18.4];
  const k = faixa(p, 0.45, 0.95) * (serie.length - 1);
  c.strokeStyle = COR.dourado; c.lineWidth = 5; c.lineJoin = "round"; c.beginPath();
  serie.forEach((v, i) => {
    if (i > k + 1) return;
    let vv = v, xx = 1010 + i * 46;
    if (i > k) { const f = k - (i - 1); vv = lerp(serie[i - 1], v, f); xx = 1010 + (i - 1 + f) * 46; }
    const y = 790 - (vv - 8) * 30;
    i === 0 ? c.moveTo(xx, y) : c.lineTo(xx, y);
  });
  c.stroke();
}

// ---------------------------------------------------------------- GovDash (tablet): o mesmo jeito de painel, para prefeituras
export function govdash(c, w, h, p) {
  const BW = 1024, BH = 768;
  base(c, w, h, BW, BH);
  c.fillStyle = "#f1f5f9"; c.fillRect(0, 0, BW, BH);
  c.fillStyle = COR.azul; c.fillRect(0, 0, BW, 92);
  txt(c, "GovDash", 36, 58, 32, "#fff", 800);
  txt(c, "Prefeitura · visão geral", 210, 58, 20, "rgba(255,255,255,.75)", 500);
  ret(c, 36, 124, BW - 72, 300, 18, "#fff", COR.linha);
  txt(c, "Despesa de pessoal (LRF) ÷ receita corrente líquida", 64, 172, 22, COR.tinta, 700);
  const v = 51.3 * saida(faixa(p, 0.1, 0.7));
  const x0 = 64, larg = BW - 200, y = 240;
  ret(c, x0, y, larg, 40, 20, "#e2e8f0");
  const corB = v < 48.6 ? COR.verde : v < 51.3 ? COR.laranja : "#ea580c";
  ret(c, x0, y, larg * v / 60, 40, 20, corB);
  [[48.6, "alerta"], [51.3, "prudencial"], [54, "máximo"]].forEach(([lim, nome]) => {
    const x = x0 + larg * lim / 60;
    c.fillStyle = COR.tinta; c.fillRect(x - 1.5, y - 14, 3, 68);
    txt(c, `${lim.toLocaleString("pt-BR")}% ${nome}`, x, y + 84, 15, COR.cinza, 600, "center");
  });
  txt(c, v.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + "%", BW - 64, 395, 54, COR.tinta, 900, "right");
  const sec = [["Saúde", 92], ["Educação", 78], ["Infraestrutura", 64], ["Gabinete", 40]];
  sec.forEach(([n, val], i) => {
    const g = saida(faixa(p, 0.4 + i * 0.08, 0.65 + i * 0.08));
    const x = 36 + i * 244;
    ret(c, x, 456, 224, 270, 16, "#fff", COR.linha);
    txt(c, n, x + 20, 494, 19, COR.tinta, 700);
    ret(c, x + 20, 700 - 170 * val / 100 * g, 60, 170 * val / 100 * g, 6, COR.azulMedio);
    ret(c, x + 92, 700 - 170 * (val - 12) / 100 * g, 60, 170 * (val - 12) / 100 * g, 6, "#93c5fd");
  });
}

// ---------------------------------------------------------------- Terminal (cyber security)
export function terminal(c, w, h, p) {
  const BW = 1280, BH = 800;
  base(c, w, h, BW, BH);
  c.fillStyle = "#0a0e14"; c.fillRect(0, 0, BW, BH);
  c.fillStyle = "#151b26"; c.fillRect(0, 0, BW, 48);
  ["#ef4444", "#f59e0b", "#22c55e"].forEach((cor, i) => { c.beginPath(); c.arc(28 + i * 26, 24, 8, 0, 7); c.fillStyle = cor; c.fill(); });
  txt(c, "revisao-seguranca — app.suaempresa.com.br", BW / 2, 31, 16, "#94a3b8", 500, "center", MONO);
  const L = [
    ["$ ", "#22c55e", "revisar --codigo --dependencias --rotas", "#e2e8f0"],
    ["[código]  ", "#60a5fa", "35 regras para código gerado por IA · 4 alertas", "#e2e8f0"],
    ["[SCA]     ", "#60a5fa", "214 dependências · 3 versões com CVE conhecida", "#e2e8f0"],
    ["[rotas]   ", "#60a5fa", "37 rotas descobertas no bundle · 2 sem autenticação", "#e2e8f0"],
    ["[ALTA]    ", "#ef4444", "CWE-639 · IDOR em /api/pedidos/{id}", "#fecaca"],
    ["[MÉDIA]   ", "#f59e0b", "OWASP A05 · cabeçalhos de segurança ausentes", "#fde68a"],
    ["[ok]      ", "#22c55e", "teste ativo autorizado · ROE assinado", "#e2e8f0"],
    ["✔ ", "#22c55e", "Relatório com evidências gerado · retest agendado", "#bbf7d0"],
  ];
  const total = faixa(p, 0.02, 0.85) * L.length;
  L.forEach(([pre, cp, resto, cr], i) => {
    if (total <= i) return;
    const f = clamp(total - i);
    const s = (pre + resto).slice(0, Math.max(1, Math.round((pre + resto).length * f)));
    const y = 104 + i * 62;
    c.font = `600 24px ${MONO}`;
    c.fillStyle = cp; c.textAlign = "left"; c.fillText(s.slice(0, pre.length), 40, y);
    const wp = c.measureText(pre).width;
    c.fillStyle = cr; c.fillText(s.slice(pre.length), 40 + wp, y);
  });
  if (Math.floor(p * 60) % 2 === 0) { c.fillStyle = "#e2e8f0"; c.fillRect(40, 104 + Math.min(L.length, Math.ceil(total)) * 62 - 22, 13, 26); }
}

// ---------------------------------------------------------------- Prancheta: rascunho a lápis → tela de verdade
export function prancheta(c, w, h, p) {
  const BW = 840, BH = 1120;
  base(c, w, h, BW, BH);
  c.fillStyle = "#fbfaf5"; c.fillRect(0, 0, BW, BH);
  // pauta clara
  c.strokeStyle = "rgba(59,130,246,.12)"; c.lineWidth = 2;
  for (let y = 120; y < BH; y += 44) { c.beginPath(); c.moveTo(0, y); c.lineTo(BW, y); c.stroke(); }
  const lapis = "rgba(60,60,64,.82)";
  txt(c, "Sistema de pedidos · ideia", 60, 96, 52, lapis, 600, "left", MAO);
  // rascunho: moldura de tela + blocos (traço tremido)
  const tremido = (x, y, ww, hh, sem) => {
    c.strokeStyle = lapis; c.lineWidth = 3; c.beginPath();
    const pts = [[x, y], [x + ww, y], [x + ww, y + hh], [x, y + hh], [x, y]];
    pts.forEach(([a, b], i) => { const j = Math.sin(sem + i * 1.7) * 3; i ? c.lineTo(a + j, b - j) : c.moveTo(a + j, b + j); });
    c.stroke();
  };
  const X = 60, Y = 150, W = 720, H = 560;
  tremido(X, Y, W, H, 1);
  tremido(X + 20, Y + 20, 150, H - 40, 2);
  [0, 1, 2].forEach((i) => tremido(X + 195 + i * 175, Y + 24, 155, 90, 3 + i));
  tremido(X + 195, Y + 140, 505, 250, 7);
  tremido(X + 195, Y + 410, 505, 120, 8);
  txt(c, "menu", X + 60, Y + 70, 34, lapis, 500, "left", MAO);
  txt(c, "gráfico de vendas", X + 330, Y + 270, 38, lapis, 500, "left", MAO);
  txt(c, "pedidos do dia", X + 340, Y + 480, 36, lapis, 500, "left", MAO);
  // a tela de verdade entra por cima, da esquerda para a direita
  const wipe = saida(faixa(p, 0.15, 0.75));
  if (wipe > 0) {
    c.save(); c.beginPath(); c.rect(X, Y, W * wipe, H); c.clip();
    ret(c, X, Y, W, H, 10, "#f8fafc", COR.linha);
    c.fillStyle = COR.azul; c.fillRect(X, Y, 170, H);
    for (let i = 0; i < 5; i++) ret(c, X + 20, Y + 40 + i * 56, 130, 30, 8, i === 0 ? "rgba(254,203,0,.4)" : "rgba(255,255,255,.18)");
    [0, 1, 2].forEach((i) => { ret(c, X + 195 + i * 175, Y + 24, 155, 90, 10, "#fff", COR.linha); ret(c, X + 210 + i * 175, Y + 80, 90, 18, 5, [COR.verde, COR.azulClaro, COR.laranja][i]); });
    ret(c, X + 195, Y + 140, 505, 250, 10, "#fff", COR.linha);
    [60, 90, 75, 120, 150, 175].forEach((v, i) => ret(c, X + 230 + i * 76, Y + 365 - v, 40, v, 5, COR.azulMedio));
    ret(c, X + 195, Y + 410, 505, 120, 10, "#fff", COR.linha);
    for (let i = 0; i < 3; i++) ret(c, X + 215, Y + 432 + i * 32, 465, 20, 5, "#e2e8f0");
    c.restore();
    c.fillStyle = COR.dourado; c.fillRect(X + W * wipe - 3, Y - 10, 6, H + 20);
  }
  // os 4 passos, marcados à caneta azul
  const passos = ["Descoberta e imersão", "Arquitetura e protótipo", "Desenvolvimento ágil", "Entrega e evolução"];
  passos.forEach((s, i) => {
    const y = 790 + i * 80;
    txt(c, `0${i + 1}`, 70, y, 40, lapis, 600, "left", MAO);
    txt(c, s, 140, y, 42, lapis, 500, "left", MAO);
    const ok = saida(faixa(p, 0.2 + i * 0.18, 0.3 + i * 0.18));
    if (ok > 0) {
      c.strokeStyle = "#1d4ed8"; c.lineWidth = 6; c.lineCap = "round"; c.beginPath();
      const x0 = 690, y0 = y - 16;
      c.moveTo(x0, y0);
      const meio = Math.min(ok * 2, 1);
      c.lineTo(x0 + 14 * meio, y0 + 16 * meio);
      if (ok > 0.5) { const f = (ok - 0.5) * 2; c.lineTo(x0 + 14 + 32 * f, y0 + 16 - 40 * f); }
      c.stroke();
    }
  });
}
