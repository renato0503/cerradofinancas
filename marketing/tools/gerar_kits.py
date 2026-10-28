"""Gera o mídia kit de cada frente para a Central de Conteúdos (/marketing/).

Cada kit sai em kits/<slug>/: logos, fontes (woff2 + links para instalar), guia.pdf (o resumo da identidade,
gerado em HTML e impresso com o Chrome headless), exemplos de peças e <slug>.zip com tudo. kits/kits.json é o que
a página lê. O conteúdo vem dos guias em brand/<marca>/README.md; ao mudar uma identidade, atualize aqui também.

Uso:
    python tools/gerar_kits.py
"""
import json
import shutil
import subprocess
import sys
import zipfile
from html import escape
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from exportar import achar_chrome  # noqa: E402

MARKETING = Path(__file__).resolve().parent.parent
RAIZ = MARKETING.parent
KITS = MARKETING / "kits"
FONTES = MARKETING / "brand" / "fontes"
GF = "https://fonts.google.com/specimen/"

KITS_DADOS = [
    dict(slug="institucional", frentes=["institucional", "tech"], nome="Cerrado Finanças & Cerrado Tech",
         apelido="A identidade do site",
         conceito="Azul-marinho e dourado, a mesma identidade do site. Cada frente ou capacidade ganha uma cor de destaque (o \"acento\"), usada no ícone, na pílula do rótulo e no brilho do fundo.",
         cores=[("Azul-marinho", "#001f5c", "fundo e títulos"), ("Azul-noite", "#000f2e", "fim do gradiente"),
                ("Dourado", "#fecb00", "destaque padrão e botão"), ("Verde", "#006430", "apoio"),
                ("Texto", "#0f172a", "texto sobre claro"), ("Cinza", "#64748b", "texto de apoio")],
         fontes=[("Inter", "títulos 900 e texto 400–700", "Inter", [])],
         logos=[("img/folinha-hero.png", "folinha.png", "A folinha: a marca da empresa, em todas as frentes"),
                ("img/logo-tech.png", "cerrado-tech-fundo-claro.png", "Cerrado Tech, sobre fundo claro"),
                ("img/cerradotechhome.png", "cerrado-tech-fundo-escuro.png", "Cerrado Tech, sobre fundo escuro"),
                ("img/logoheader.png", "cerrado-financas.png", "Cerrado Finanças, assinatura horizontal")],
         recursos=["Fundo em gradiente azul com o brilho da cor de destaque no canto",
                   "Pílula do rótulo e ícones Phosphor na cor de destaque",
                   "Cards com ícone, título e uma linha de texto",
                   "Rodapé com a folinha e \"arraste →\" no primeiro slide"],
         regras=["Nada inventado: todo texto sai do site ou das páginas dos produtos",
                 "Sem preço nas peças", "A folinha é a marca da empresa; não distorcer nem recolorir",
                 "Uma cor de destaque por peça"],
         exemplos=["2026-11-tech-erp/carrossel-01.png", "2026-10-lancamento-4-frentes/carrossel-01.png"]),
    dict(slug="cerraai", frentes=["cerraai"], nome="Cerra.AI", apelido="Silício local",
         conceito="O Cerra.AI roda no computador da empresa. A identidade sai do produto: o cobre das trilhas do chip da logo, a tarja de anonimização e a etiqueta de citação da interface.",
         cores=[("Cobre", "#e2873b", "destaque, tarjas, botão"), ("Grafite", "#0d0f0e", "fundo padrão"),
                ("Tinta clara", "#f1ece3", "texto sobre o grafite"), ("Tinta suave", "#a39d93", "texto de apoio")],
         fontes=[("Archivo", "títulos expandidos 900 em caixa alta; texto normal", "Archivo", ["archivo.woff2"]),
                 ("JetBrains Mono", "citações, nomes de arquivo e rótulos técnicos", "JetBrains+Mono", ["jetbrains-mono.woff2"])],
         logos=[("img/logo_cerraai.png", "cerra-ai.png", "Logo completa do Cerra.AI"),
                ("img/logo_cerraai-icone.png", "cerra-ai-icone.png", "Ícone, para fundos escuros"),
                ("img/folinha-hero.png", "folinha.png", "A folinha, quando a peça assina Cerrado Tech")],
         recursos=["A tarja: o dado pessoal vira uma barra cobre",
                   "A etiqueta de citação: \"Trechos consultados: contrato.pdf (p. 2, 5)\"",
                   "O emblema grande sangrando na borda do slide"],
         regras=["Duas cores só: cobre e grafite. Sem gradiente, sem brilho, sem azul ou roxo",
                 "Só afirmar o que o produto faz (ver a página do Cerra.AI)"],
         exemplos=["2026-10-cerra-ai/carrossel-01.png", "2026-10-cerra-ai/story.png"]),
    dict(slug="cerraclass", frentes=["cerraclass"], nome="CerraClass e cursos", apelido="Sábado de sala",
         conceito="Cursos presenciais, práticos, em turma pequena. Cada curso tem uma cor viva do cerrado como fundo, a tinta é sempre quase-preta e a logo vai num selo branco redondo.",
         cores=[("Amarelo-ipê (geral)", "#ffc83d", "CerraClass e IA na Gestão"), ("Tinta", "#141414", "todo o texto"),
                ("Branco", "#ffffff", "etiquetas, ingresso e selo"), ("Excel com IA", "#4cc274", "cor do curso"),
                ("Consultoria Contábil", "#7cc4f0", "cor do curso"), ("Consultoria Financeira", "#ff9f2e", "cor do curso"),
                ("Análise de Dados", "#b9a3ff", "cor do curso"), ("BPMN com IA", "#f2684f", "cor do curso"),
                ("Automação com IA", "#cbe847", "cor do curso"), ("Ciência de Dados", "#3fcfbf", "cor do curso"),
                ("IA na Farma", "#ff8fb8", "cor do curso"), ("BI e Dashboards", "#8fa6ff", "cor do curso"),
                ("Prototipação de Apps", "#ff7a5c", "cor do curso"), ("IA na Prática", "#9ad65a", "cor do curso"),
                ("IA em Ação Farma", "#e7a0f0", "cor do curso")],
         fontes=[("Bricolage Grotesque", "condensada 800 em caixa alta nos títulos; 500–700 no texto", "Bricolage+Grotesque", ["bricolage.woff2"])],
         logos=[("marketing/brand/cerraclass/logo.png", "cerraclass.png", "Logo da CerraClass: sempre dentro de um selo branco redondo")],
         recursos=["As 10 cadeiras da turma", "A régua do dia de aula (08:00 – 17:00)",
                   "O ingresso: o que o aluno leva para casa", "A etiqueta adesiva levemente torta em cada slide"],
         regras=["Turma de até 10 alunos", "Sem preço e sem data nas peças", "Citação só a real do Renato"],
         exemplos=["2026-10-cursos/carrossel-01.png", "2026-10-curso-excel-com-ia/carrossel-01.png"]),
    dict(slug="credito", frentes=["credito"], nome="Crédito", apelido="Antes de assinar",
         conceito="Crédito é o momento antes de assinar um contrato. A identidade é o papel e a caneta desse momento: o comparativo de propostas, a linha de assinatura com a rubrica \"Você decide\", o marca-texto e a letra miúda.",
         cores=[("Branco-papel", "#fbfbf8", "fundo padrão"), ("Azul-caneta", "#1f3ae0", "destaque, rubrica, slide invertido"),
                ("Marca-texto", "#e6ff3d", "só o grifo e o botão"), ("Tinta", "#111522", "texto"), ("Cinza", "#6b7080", "apoio")],
         fontes=[("Schibsted Grotesk", "títulos 900 e texto 500–800", "Schibsted+Grotesk", ["schibsted.woff2"]),
                 ("Caveat", "só na rubrica da assinatura", "Caveat", ["caveat.woff2"])],
         logos=[("img/folinha-hero.png", "folinha.png", "A folinha é a nossa marca no Crédito"),
                ("img/ls-logo.png", "ls-parceira.png", "LS Intermediação Financeira: só em \"Em parceria com\", nunca como a nossa logo")],
         recursos=["O comparativo de propostas, com a melhor linha grifada (sem números)",
                   "A linha de assinatura com o X e a rubrica \"Você decide\"",
                   "As cláusulas para conferir (§ 1 a § 3) no slide azul", "A letra miúda com o aviso legal"],
         regras=["Aviso legal em toda peça e em toda legenda", "Sem taxa, parcela ou prazo inventados",
                 "Nunca \"aprovado\", \"sem consulta\" ou \"dinheiro fácil\"", "Sem nome nem logo de banco"],
         aviso="Cerrado Finanças, em parceria com a LS Intermediação Financeira, atua como correspondente bancário e não é instituição financeira. Crédito sujeito a análise e aprovação. Taxas e condições variam conforme o perfil e a instituição.",
         exemplos=["2026-11-credito-consignado-servidor/carrossel-01.png", "2026-11-credito-fgts/carrossel-05.png"]),
    dict(slug="contabilidade", frentes=["contabilidade"], nome="Cerrado Contabilidade", apelido="Partida dobrada",
         conceito="O material do próprio ofício: o papel do livro-razão, o razonete em T com a linha de saldo, a escada do crescimento MEI → ME → EPP → Lucro Presumido e o carimbo EM DIA.",
         cores=[("Papel", "#f1f6f0", "fundo, com pauta"), ("Pauta", "#cfe0d4", "linhas do papel"),
                ("Tinta verde", "#0c3b2e", "texto, linhas, slide invertido"), ("Verde-claro", "#d8efdf", "marca-texto"),
                ("Vermelho", "#d23a2c", "margem, carimbo e só a dor do cliente")],
         fontes=[("IBM Plex Sans Condensed", "títulos 700 e texto 500", "IBM+Plex+Sans+Condensed", ["plex-cond-500.woff2", "plex-cond-700.woff2"]),
                 ("IBM Plex Mono", "rótulos, colunas e carimbo", "IBM+Plex+Mono", ["plex-mono-500.woff2", "plex-mono-600.woff2"])],
         logos=[("img/folinha-hero.png", "folinha.png", "A folinha + \"Cerrado Contabilidade\" no rodapé")],
         recursos=["O razonete em T: \"Você cuida de\" e \"A gente cuida de\"", "A escada do crescimento com o degrau do post",
                   "Os lançamentos com \"em dia\"", "O carimbo EM DIA", "Na série \"Você sabia?\": a nota explicativa numerada"],
         regras=["Só serviços confirmados (Lucro Real ainda não)", "Sem limites, alíquotas ou prazos que mudam por lei",
                 "Publicidade sóbria (código de ética do CFC): nada de promessa de economia"],
         exemplos=["2026-11-contabil-mei/carrossel-01.png", "2026-11-contabil-sabia-fator-r/carrossel-01.png"]),
    dict(slug="consultoria", frentes=["consultorias"], nome="Consultorias", apelido="Planta",
         conceito="A consultoria desenha a arquitetura da empresa. A identidade é a planta técnica: papel vegetal com grade, traço grafite, um único laranja de prancheta e cada consultoria numerada como uma prancha.",
         cores=[("Vegetal", "#f3f0e8", "fundo, com grade"), ("Grafite", "#23262b", "texto, traço, slide invertido"),
                ("Laranja de prancheta", "#e4570e", "o único destaque")],
         fontes=[("Fraunces", "títulos 600; destaque em itálico laranja", "Fraunces", ["fraunces-400.woff2", "fraunces-600.woff2", "fraunces-400-italic.woff2"]),
                 ("Instrument Sans", "texto 400–600", "Instrument+Sans", ["instrument-sans-400.woff2", "instrument-sans-600.woff2"]),
                 ("DM Mono", "rótulos, cotas e carimbo da prancha", "DM+Mono", ["dm-mono-400.woff2", "dm-mono-500.woff2"])],
         logos=[("img/folinha-hero.png", "folinha.png", "A folinha + \"Cerrado Finanças · Consultoria\"")],
         recursos=["O rodapé como carimbo de prancha (Prancha 03/07)", "A cota laranja com o público",
                   "O organograma em traço", "O corte antes e depois", "O selo \"Diagnóstico gratuito\""],
         regras=["Só o que está na página /consultorias", "Sem os números do site até confirmar",
                 "Lei do Bem: dizer que vale para o Lucro Real", "LinkedIn é a rede principal"],
         exemplos=["2026-11-consultoria-csc-strategy/carrossel-01.png", "2026-11-consultoria-csc-strategy/carrossel-04.png"]),
]

GUIA = """<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8"><title>Mídia kit: {nome}</title>
<style>
{fontfaces}
@page {{ size: A4; margin: 0; }}
* {{ box-sizing: border-box; margin: 0; padding: 0; }}
body {{ font-family: 'Inter', system-ui, sans-serif; color: #111; -webkit-print-color-adjust: exact; print-color-adjust: exact; }}
.pagina {{ width: 210mm; height: 297mm; padding: 16mm 15mm; page-break-after: always; display: flex; flex-direction: column; gap: 9mm; overflow: hidden; }}
.cab {{ display: flex; align-items: center; gap: 7mm; padding-bottom: 7mm; border-bottom: 1.2mm solid {cor1}; }}
.cab img {{ height: 24mm; width: auto; max-width: 60mm; object-fit: contain; }}
.cab small {{ font-size: 9pt; letter-spacing: .14em; text-transform: uppercase; color: #666; font-weight: 700; }}
.cab h1 {{ font-family: {fonte_titulo}; font-size: 28pt; line-height: 1.05; }}
.cab em {{ font-style: normal; color: {cor1}; }}
h2 {{ font-size: 9pt; letter-spacing: .14em; text-transform: uppercase; color: #666; font-weight: 800; margin-bottom: 3.5mm; }}
p.conceito {{ font-size: 12.5pt; line-height: 1.5; }}
.cores {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(42mm, 1fr)); gap: 3mm; }}
.cor {{ border: .3mm solid #ddd; border-radius: 2mm; overflow: hidden; }}
.cor i {{ display: block; height: 15mm; }}
.cor div {{ padding: 2mm 2.5mm; font-size: 8pt; line-height: 1.35; }}
.cor b {{ display: block; font-size: 9pt; }}
.fonte {{ padding: 3.5mm 0; border-top: .3mm solid #ddd; }}
.fonte .amostra {{ font-size: 24pt; line-height: 1.1; font-weight: 700; }}
.fonte small {{ display: block; font-size: 9pt; color: #555; margin-top: 1.5mm; }}
ul {{ padding-left: 5mm; font-size: 10.5pt; line-height: 1.55; }}
.duas {{ display: grid; grid-template-columns: 1fr 1fr; gap: 8mm; }}
.logos {{ display: grid; grid-template-columns: repeat(2, 1fr); gap: 4mm; }}
.logo {{ border: .3mm solid #ddd; border-radius: 2mm; padding: 4mm; text-align: center; font-size: 8.5pt; color: #444; }}
.logo span {{ display: flex; align-items: center; justify-content: center; height: 26mm; margin-bottom: 2.5mm; border-radius: 1.5mm; }}
.logo img {{ max-height: 22mm; max-width: 70mm; object-fit: contain; }}
.aviso {{ font-size: 9pt; line-height: 1.5; border-left: 1.2mm solid {cor1}; padding: 2mm 0 2mm 4mm; background: #f6f6f6; }}
.exemplos {{ display: grid; grid-template-columns: 1fr 1fr; gap: 5mm; }}
.exemplos img {{ width: 100%; max-height: 95mm; object-fit: contain; object-position: top; border-radius: 1.5mm; border: .3mm solid #ddd; }}
.pe {{ margin-top: auto; font-size: 8pt; color: #888; display: flex; justify-content: space-between; }}
</style></head><body>
<section class="pagina">
  <div class="cab"><img src="logos/{logo1}" alt=""><div><small>Mídia kit · Cerrado Finanças</small><h1>{nome}<br><em>"{apelido}"</em></h1></div></div>
  <div><h2>A ideia</h2><p class="conceito">{conceito}</p></div>
  <div><h2>Cores</h2><div class="cores">{cores}</div></div>
  <div><h2>Tipografia</h2>{fontes}</div>
  <div class="pe"><span>Fontes para instalar: veja fontes/LINKS.txt</span><span>1/2</span></div>
</section>
<section class="pagina">
  <div><h2>Logos</h2><div class="logos">{logos}</div></div>
  <div class="duas"><div><h2>Recursos gráficos</h2><ul>{recursos}</ul></div><div><h2>Regras</h2><ul>{regras}</ul></div></div>
  {aviso}
  <div><h2>Exemplos</h2><div class="exemplos">{exemplos}</div></div>
  <div class="pe"><span>Peças prontas: cerradofinancas.com.br/marketing</span><span>2/2</span></div>
</section>
</body></html>
"""


def fundo_logo(arquivo):
    """Logos com texto branco precisam de fundo escuro na prévia."""
    return "#1d2433" if "escuro" in arquivo or "icone" in arquivo else "#f2f2f2"


def gerar(k):
    pasta = KITS / k["slug"]
    shutil.rmtree(pasta, ignore_errors=True)
    for sub in ("logos", "fontes", "exemplos"):
        (pasta / sub).mkdir(parents=True)

    for origem, nome, _ in k["logos"]:
        shutil.copyfile(RAIZ / origem, pasta / "logos" / nome)
    faces, links = [], []
    for nome, uso, gf, arquivos in k["fontes"]:
        links.append(f"{nome}: {GF}{gf}  ({uso})")
        for a in arquivos:
            shutil.copyfile(FONTES / a, pasta / "fontes" / a)
            peso = next((p for p in ("700", "600", "500", "400") if p in a), "100 900")
            estilo = "italic" if "italic" in a else "normal"
            faces.append(f"@font-face {{ font-family: '{nome}'; src: url('fontes/{a}') format('woff2'); font-weight: {peso}; font-style: {estilo}; }}")
    if k["fontes"][0][3] == []:
        faces.append("@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');")
    (pasta / "fontes" / "LINKS.txt").write_text(
        "Para instalar no computador ou no Canva, baixe as fontes no Google Fonts (gratuitas):\n\n" + "\n".join(links)
        + "\n\nOs arquivos .woff2 desta pasta são os mesmos usados nas peças (servem para web).\n", encoding="utf-8")

    exemplos = []
    for i, e in enumerate(k["exemplos"], start=1):
        origem = MARKETING / "entregas" / e
        nome = f"exemplo-{i}{origem.suffix}"
        shutil.copyfile(origem, pasta / "exemplos" / nome)
        exemplos.append(f"exemplos/{nome}")

    fonte_titulo = f"'{k['fontes'][0][0]}', sans-serif"
    html = GUIA.format(
        nome=escape(k["nome"]), apelido=escape(k["apelido"]), conceito=escape(k["conceito"]),
        cor1=k["cores"][1][1] if k["slug"] in ("credito", "contabilidade", "consultoria") else k["cores"][0][1],
        fonte_titulo=fonte_titulo, fontfaces="\n".join(faces), logo1=k["logos"][0][1],
        cores="".join(f'<div class="cor"><i style="background:{h}"></i><div><b>{escape(n)}</b>{h.upper()}<br>{escape(u)}</div></div>' for n, h, u in k["cores"]),
        fontes="".join(f'<div class="fonte"><div class="amostra" style="font-family:\'{escape(n)}\'">{escape(n)}: Aa Bb Cc 123</div><small>{escape(u)}</small></div>' for n, u, _, _ in k["fontes"]),
        logos="".join(f'<div class="logo"><span style="background:{fundo_logo(a)}"><img src="logos/{a}" alt=""></span>{escape(u)}</div>' for _, a, u in k["logos"]),
        recursos="".join(f"<li>{escape(r)}</li>" for r in k["recursos"]),
        regras="".join(f"<li>{escape(r)}</li>" for r in k["regras"]),
        aviso=f'<div><h2>Aviso legal (obrigatório)</h2><p class="aviso">{escape(k["aviso"])}</p></div>' if k.get("aviso") else "",
        exemplos="".join(f'<img src="{e}" alt="">' for e in exemplos))
    guia_html = pasta / "guia.html"
    guia_html.write_text(html, encoding="utf-8")
    subprocess.run([achar_chrome(), "--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--virtual-time-budget=6000",
                    f"--print-to-pdf={pasta / 'guia.pdf'}", guia_html.resolve().as_uri()],
                   capture_output=True, check=True)
    guia_html.unlink()

    (pasta / "LEIA-ME.txt").write_text(
        f"Mídia kit: {k['nome']} (\"{k['apelido']}\")\n\n"
        "guia.pdf     o resumo da identidade: cores, fontes, logos, recursos e regras\n"
        "logos/       os arquivos de logo em PNG transparente\n"
        "fontes/      as fontes das peças e o link para instalar cada uma (LINKS.txt)\n"
        "exemplos/    peças prontas para referência\n\n"
        "Cores:\n" + "\n".join(f"  {n}: {h.upper()} ({u})" for n, h, u in k["cores"]) + "\n", encoding="utf-8")

    zipado = KITS / f"{k['slug']}.zip"
    with zipfile.ZipFile(zipado, "w", zipfile.ZIP_DEFLATED) as z:
        for f in sorted(pasta.rglob("*")):
            if f.is_file():
                z.write(f, f"midia-kit-{k['slug']}/{f.relative_to(pasta).as_posix()}")
    return {
        "slug": k["slug"], "frentes": k["frentes"], "nome": k["nome"], "apelido": k["apelido"], "conceito": k["conceito"],
        "cores": [{"nome": n, "hex": h, "uso": u} for n, h, u in k["cores"]],
        "fontes": [{"nome": n, "uso": u, "link": GF + gf} for n, u, gf, _ in k["fontes"]],
        "logos": [{"arquivo": f"{k['slug']}/logos/{a}", "uso": u, "fundo": fundo_logo(a)} for _, a, u in k["logos"]],
        "guia": f"{k['slug']}/guia.pdf",
        "zip": {"nome": zipado.name, "kb": round(zipado.stat().st_size / 1024)},
    }


def main():
    KITS.mkdir(exist_ok=True)
    saida = [gerar(k) for k in KITS_DADOS]
    (KITS / "kits.json").write_text(json.dumps(saida, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    for k in saida:
        print(f"{k['slug']}: {k['zip']['kb']} KB")


if __name__ == "__main__":
    main()
