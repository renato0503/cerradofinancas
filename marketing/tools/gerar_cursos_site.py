# Gera a secao "catalogo" da pagina /cursos/ a partir do catalogo oficial da Cerraclass.
# Fonte dos dados: dados/cerraclass-cursos.json (importar-cerraclass.mjs)
# Uso: python tools/gerar_cursos_site.py
import json
import re
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
DADOS = json.loads((Path(__file__).resolve().parent.parent / "dados" / "cerraclass-cursos.json").read_text(encoding="utf-8"))
PAGINA = RAIZ / "cursos.html"

# Mesma paleta usada nas pecas de marketing (gerar_cursos_cerraclass.py).
CORES = {
    "pres-ia-gestao": "#a78bfa",
    "pres-excel-ia": "#4ade80",
    "pres-consultoria-contabil-ia": "#2dd4bf",
    "pres-consultoria-financeira-ia": "#fbbf24",
    "pres-intro-analise-dados": "#38bdf8",
    "pres-bpmn-ia": "#fb7185",
    "pres-intro-automacao-ia": "#fb923c",
    "pres-ciencia-dados-aplicada": "#818cf8",
    "pres-ia-farma": "#f472b6",
    "pres-bi-dashboards-ia": "#22d3ee",
    "pres-prototipacao-apps-ia": "#e879f9",
}

ICONES = {
    "pres-ia-gestao": "ph-trend-up",
    "pres-excel-ia": "ph-table",
    "pres-consultoria-contabil-ia": "ph-calculator",
    "pres-consultoria-financeira-ia": "ph-bank",
    "pres-intro-analise-dados": "ph-chart-bar",
    "pres-bpmn-ia": "ph-tree-structure",
    "pres-intro-automacao-ia": "ph-lightning",
    "pres-ciencia-dados-aplicada": "ph-flask",
    "pres-ia-farma": "ph-pill",
    "pres-bi-dashboards-ia": "ph-gauge",
    "pres-prototipacao-apps-ia": "ph-device-mobile",
}

GRUPOS = [
    ("um-dia", "Curso de um dia", "Um sábado inteiro, 8h de imersão prática.", "8h · 1 sábado"),
    ("imersao", "Imersão", "Dois fins de semana, 22h de imersão prática.", "22h · 2 sextas + 2 sábados"),
]


def card(curso):
    cor = CORES[curso["id"]]
    icone = ICONES[curso["id"]]
    fmt = DADOS["formatos"][curso["format"]]
    url = f"https://cerraclass.com.br/presencial/{curso['id']}"
    return f"""      <article class="cat-card fade-up">
        <div class="cat-topo">
          <span class="cat-icone" style="background:{cor}1f;color:{cor};"><i class="ph {icone}"></i></span>
          <span class="cat-categoria">{curso['category']}</span>
        </div>
        <h3>{curso['title']}</h3>
        <p>{curso['description']}</p>
        <div class="cat-meta">
          <span><i class="ph ph-clock"></i> {fmt['totalHours']}</span>
          <span><i class="ph ph-calendar-blank"></i> {fmt['summary']}</span>
        </div>
        <a class="cat-link" href="{url}" target="_blank" rel="noopener">Ver na Cerraclass <i class="ph ph-arrow-up-right"></i></a>
      </article>"""


def secao():
    partes = []
    for chave, titulo, sub, badge in GRUPOS:
        cursos = [c for c in DADOS["cursos"] if c["format"] == chave]
        cards = "\n".join(card(c) for c in cursos)
        partes.append(f"""    <div class="cat-grupo fade-up">
      <div class="cat-grupo-topo">
        <h3>{titulo}</h3>
        <span class="cat-grupo-badge">{badge}</span>
      </div>
      <p class="cat-grupo-sub">{sub}</p>
      <div class="cat-grid">
{cards}
      </div>
    </div>""")

    return f"""<!-- ========== CATALOGO DE CURSOS PRESENCIAIS ========== -->
<section class="catalogo-section" id="catalogo">
  <div class="container">
    <div class="section-header fade-up">
      <span class="section-tag">Catálogo Presencial</span>
      <h2>Cursos de IA e tecnologia para a sua equipe</h2>
      <p>Além de IA na Prática e IA em Ação Farma, a Cerraclass tem {len(DADOS['cursos'])} cursos presenciais de um dia e imersões. Turmas de até 10 pessoas, com material e certificado inclusos.</p>
    </div>

{chr(10).join(partes)}

    <div class="cat-rodape fade-up">
      <p><i class="ph ph-info"></i> Datas, valores e inscrição ficam no site da Cerraclass. Turmas abertas sob consulta e também no formato in company.</p>
      <a href="https://cerraclass.com.br/presenciais" target="_blank" rel="noopener" class="btn-curso">Ver o catálogo completo <i class="ph ph-arrow-up-right"></i></a>
    </div>
  </div>
</section>
"""


CSS = """
    /* ============= CATALOGO DE CURSOS ============= */
    .catalogo-section {
      padding: 100px 0;
      background: #fff;
    }

    .cat-grupo { margin-bottom: 56px; }

    .cat-grupo-topo {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 6px;
    }

    .cat-grupo-topo h3 {
      font-size: 1.5rem;
      font-weight: 800;
      color: #001f5c;
    }

    .cat-grupo-badge {
      background: #f1f5f9;
      color: #475569;
      font-size: 0.82rem;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: 50px;
    }

    .cat-grupo-sub {
      color: #64748b;
      font-size: 0.97rem;
      margin-bottom: 24px;
    }

    .cat-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 22px;
    }

    .cat-card {
      background: #fff;
      border: 1px solid #e2e8f0;
      border-radius: 18px;
      padding: 26px 24px;
      display: flex;
      flex-direction: column;
      transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    }

    .cat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 16px 32px rgba(0, 31, 92, 0.07);
      border-color: #cbd5e1;
    }

    .cat-topo {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }

    .cat-icone {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 1.35rem;
      flex-shrink: 0;
    }

    .cat-categoria {
      font-size: 0.74rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #64748b;
    }

    .cat-card h3 {
      font-size: 1.2rem;
      font-weight: 800;
      color: #001f5c;
      margin-bottom: 8px;
    }

    .cat-card > p {
      color: #475569;
      font-size: 0.92rem;
      line-height: 1.6;
      margin-bottom: 16px;
      flex-grow: 1;
    }

    .cat-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 8px 16px;
      margin-bottom: 18px;
    }

    .cat-meta span {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.84rem;
      font-weight: 600;
      color: #334155;
    }

    .cat-meta i { color: #94a3b8; }

    .cat-link {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      color: #001f5c;
      font-weight: 700;
      font-size: 0.9rem;
      text-decoration: none;
    }

    .cat-link:hover { color: #6d28d9; }

    .cat-rodape {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 18px;
      padding: 28px 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 22px;
      flex-wrap: wrap;
    }

    .cat-rodape p {
      color: #475569;
      font-size: 0.95rem;
      line-height: 1.6;
      margin: 0;
      max-width: 640px;
    }

    .cat-rodape p i { color: #6d28d9; margin-right: 6px; }

    @media (max-width: 980px) {
      .cat-grid { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 640px) {
      .cat-grid { grid-template-columns: 1fr; }
    }
"""


def aplicar():
    html = PAGINA.read_text(encoding="utf-8")

    if "<!-- ========== CATALOGO DE CURSOS PRESENCIAIS ========== -->" in html:
        html = re.sub(
            r"<!-- ========== CATALOGO DE CURSOS PRESENCIAIS ========== -->.*?</section>\n",
            secao(),
            html,
            flags=re.S,
        )
    else:
        marca = "<!-- ========== MÉTODO ========== -->"
        html = html.replace(marca, secao() + "\n" + marca, 1)

    if "/* ============= CATALOGO DE CURSOS ============= */" not in html:
        html = html.replace("    /* ============= MÉTODO ============= */", CSS.strip("\n") + "\n\n    /* ============= MÉTODO ============= */", 1)

    PAGINA.write_text(html, encoding="utf-8")
    print(f"cursos.html atualizado com {len(DADOS['cursos'])} cursos do catalogo")


if __name__ == "__main__":
    aplicar()
