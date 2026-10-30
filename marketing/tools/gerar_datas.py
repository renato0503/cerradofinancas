"""Gera os posts de datas comemorativas nacionais do @cerradofinancas (identidade do site: azul, dourado e a folinha).

Regra do Renato (30/10): só datas nacionais; cada data tem só o post estático do feed (Instagram e LinkedIn) e o
story, sem vídeo. A data é fixa: o tools/agendar.py coloca o post no dia (campo "data_fixa" do info.json), ao lado
do post normal da conta, e as datas comemorativas nunca entram na repetição de conteúdo.

Tom: institucional e sóbrio, sem vender nada (Finados e Consciência Negra principalmente).

Uso:
    python tools/gerar_datas.py
"""
import json
from html import escape
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
FOLHA = "../../../img/folinha-hero.png"
MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]

DATAS = [
    dict(slug="finados", data="2026-11-02", nome="Dia de Finados", rotulo="Feriado nacional",
         frase="Hoje é dia de lembrar, com carinho, de quem fez parte da nossa história.",
         legenda="Dia de Finados.\n\nHoje é dia de lembrar, com carinho, de quem fez parte da nossa história.",
         tags="#Finados", sobrio=True),
    dict(slug="proclamacao-da-republica", data="2026-11-15", nome="Proclamação da República", rotulo="Feriado nacional",
         frase="15 de novembro de 1889. Construir um país é trabalho de todos os dias.",
         legenda="15 de novembro: Proclamação da República.\n\nEm 1889, o Brasil se tornou uma república. Construir um país é trabalho de todos os dias, e a gente segue fazendo a nossa parte.",
         tags="#ProclamacaoDaRepublica #15DeNovembro"),
    dict(slug="dia-da-bandeira", data="2026-11-19", nome="Dia da Bandeira", rotulo="Data cívica nacional",
         frase="“Ordem e Progresso”: o lema no centro da bandeira desde 19 de novembro de 1889.",
         legenda="19 de novembro: Dia da Bandeira.\n\nA bandeira republicana foi adotada em 19 de novembro de 1889, com o lema \"Ordem e Progresso\" no centro.",
         tags="#DiaDaBandeira #Brasil"),
    dict(slug="consciencia-negra", data="2026-11-20", nome="Dia Nacional de Zumbi e da Consciência Negra", rotulo="Feriado nacional",
         frase="Um dia para reconhecer a história, a luta e a contribuição da população negra na construção do Brasil.",
         legenda="20 de novembro: Dia Nacional de Zumbi e da Consciência Negra.\n\nUm dia para reconhecer a história, a luta e a contribuição da população negra na construção do Brasil.",
         tags="#ConscienciaNegra #20DeNovembro", sobrio=True),
    dict(slug="natal", data="2026-12-25", nome="Feliz Natal", rotulo="Boas festas",
         frase="Mesa cheia, gente querida por perto e muitos motivos para agradecer.",
         legenda="Feliz Natal!\n\nQue a sua casa tenha mesa cheia, gente querida por perto e muitos motivos para agradecer. Boas festas da equipe Cerrado Finanças & Tech.",
         tags="#FelizNatal #Natal"),
    dict(slug="ano-novo", data="2027-01-01", nome="Feliz 2027", rotulo="Confraternização Universal",
         frase="Obrigado por estar com a gente em 2026. Que o novo ano venha com saúde e bons projetos.",
         legenda="Feliz 2027!\n\nObrigado por estar com a gente em 2026. Que o novo ano venha com saúde, bons projetos e ótimas decisões.",
         tags="#AnoNovo #Feliz2027"),
]

CSS = """
  .slide { position: relative; width: 1080px; height: 1350px; overflow: hidden; color: #fff; display: flex; flex-direction: column;
    justify-content: center; align-items: center; text-align: center; padding: 0 110px;
    background: radial-gradient(circle at 50% 38%, #0a3a8f 0%, var(--azul) 45%, var(--azul-noite) 100%); }
  .slide.story { height: 1920px; padding: 250px 110px; }
  .slide.sobrio { background: radial-gradient(circle at 50% 38%, #1d2a44 0%, #111a2c 60%, #0b111d 100%); }
  .slide::before, .slide::after { content: ''; position: absolute; border-radius: 50%; top: 50%; left: 50%; transform: translate(-50%, -54%); pointer-events: none; }
  .slide::before { width: 900px; height: 900px; border: 2px solid rgba(254, 203, 0, .16); }
  .slide::after { width: 1180px; height: 1180px; border: 2px solid rgba(254, 203, 0, .08); }
  .sobrio::before, .sobrio::after { border-color: rgba(255, 255, 255, .08); }
  .rotulo { position: relative; font-size: 26px; font-weight: 800; letter-spacing: .22em; text-transform: uppercase; color: var(--dourado); }
  .sobrio .rotulo { color: #cbd5e1; }
  .dia { position: relative; font-size: 250px; font-weight: 900; line-height: .9; letter-spacing: -10px; margin-top: 26px; }
  .mes { position: relative; font-size: 44px; font-weight: 700; letter-spacing: .3em; text-transform: uppercase; color: var(--dourado); margin-top: 6px; }
  .sobrio .mes { color: #cbd5e1; }
  .nome { position: relative; font-size: 76px; font-weight: 900; line-height: 1.04; letter-spacing: -2.5px; margin-top: 54px; max-width: 860px; }
  .nome.longo { font-size: 62px; }
  .traco { position: relative; width: 120px; height: 6px; background: var(--dourado); border-radius: 3px; margin: 44px 0 40px; }
  .sobrio .traco { background: #cbd5e1; height: 3px; }
  .frase { position: relative; font-size: 38px; line-height: 1.38; color: var(--texto-suave); max-width: 820px; }
  .assina { position: absolute; bottom: 70px; left: 0; right: 0; display: flex; justify-content: center; align-items: center; gap: 16px; font-size: 28px; font-weight: 700; }
  .story .assina { bottom: 260px; }
  .assina img { width: 64px; }
"""


def peca(d, story, entrega):
    a, m, dia = map(int, d["data"].split("-"))
    classes = "slide" + (" story" if story else "") + (" sobrio" if d.get("sobrio") else "")
    longo = " longo" if len(d["nome"]) > 30 else ""
    formato = "1080x1920" if story else "1080x1350"
    return f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="entrega" content="{entrega}">
  <meta name="formato" content="{formato}">
  <title>{'Story' if story else 'Post'}: {escape(d['nome'])}</title>
  <link rel="stylesheet" href="../../brand/tokens.css">
  <style>{CSS}</style>
</head>
<body>
  <section class="{classes}">
    <p class="rotulo">{escape(d['rotulo'])}</p>
    <p class="dia">{dia:02d}</p>
    <p class="mes">{MESES[m - 1]}</p>
    <h1 class="nome{longo}">{escape(d['nome'])}</h1>
    <span class="traco"></span>
    <p class="frase">{escape(d['frase'])}</p>
    <div class="assina"><img src="{FOLHA}" alt=""> Cerrado Finanças &amp; Tech</div>
  </section>
  <script src="../../brand/slides.js"></script>
</body>
</html>
"""


def main():
    for d in DATAS:
        entrega = f"{d['data'][:7]}-data-{d['slug']}"
        post, ent = RAIZ / "posts" / entrega, RAIZ / "entregas" / entrega
        post.mkdir(parents=True, exist_ok=True)
        ent.mkdir(parents=True, exist_ok=True)
        (post / "post.html").write_text(peca(d, False, entrega), encoding="utf-8")
        (post / "story.html").write_text(peca(d, True, entrega), encoding="utf-8")
        texto = f"{d['legenda']}\n\n{d['tags']} #CerradoFinancas\n"
        (ent / "legenda-instagram.txt").write_text(texto, encoding="utf-8")
        (ent / "legenda-linkedin.txt").write_text(texto, encoding="utf-8")
        info = {
            "titulo": f"Data comemorativa · {d['nome']}",
            "data": d["data"],
            "data_fixa": d["data"],
            "descricao": "Data comemorativa nacional: só post estático (feed) e story, sem vídeo.",
            "orientacoes": [
                f"Postar no dia {d['data'][8:]}/{d['data'][5:7]} no @cerradofinancas e no LinkedIn, além do post normal do dia.",
                "Feed: post.png (1080×1350). Story: story.png.",
                "Não entra na repetição de conteúdo da agenda.",
            ],
        }
        (ent / "info.json").write_text(json.dumps(info, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(entrega)


if __name__ == "__main__":
    main()
