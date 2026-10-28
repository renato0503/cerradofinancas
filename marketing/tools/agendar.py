"""Monta a agenda de postagens por conta de Instagram e grava as datas nas campanhas.

Regras (pedido do Renato em 28/10):
- **Contas:** são três por enquanto: @cerradofinancas (Cerrado Tech, Contabilidade, Crédito, Consultorias e
  Institucional), @cerra.ai e @cerraclass. A Consultoria acadêmica entra como frente futura, ainda sem conta.
- **Ritmo:** cada conta posta pelo menos 1 vez por dia e no máximo 2 (POR_DIA), enquanto houver conteúdo. Quando o
  conteúdo de uma conta acaba, a agenda mostra o dia como "falta conteúdo".
- **Ordem:** no @cerradofinancas, o lançamento e as campanhas de cada frente saem primeiro. Depois as séries se
  intercalam, sem repetir a mesma frente em dois dias seguidos sempre que der.
- **Vídeos:** no @cerra.ai e no @cerraclass, os vídeos próprios (comercial, lançamento, Reel do curso) viram
  postagens separadas do carrossel.

Grava a data da primeira postagem, a conta e a orientação "Postar em..." no info.json de cada campanha, e escreve
entregas/agenda.json (lido pela aba Agenda da Central). Rode depois dos geradores de série (eles regravam o
info.json com as datas antigas) e antes do publicar.py.

Uso:
    python tools/agendar.py [AAAA-MM-DD]     # início da agenda; padrão: amanhã
"""
import json
import sys
from datetime import date, timedelta
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from publicar import classificar  # noqa: E402

ENTREGAS = Path(__file__).resolve().parent.parent / "entregas"

CONTAS = [
    dict(id="cerradofinancas", nome="Cerrado Finanças", arroba="@cerradofinancas", cor="#001f5c",
         frentes=["institucional", "tech", "contabilidade", "credito", "consultorias"]),
    dict(id="cerraai", nome="Cerra.AI", arroba="@cerra.ai", cor="#e2873b", frentes=["cerraai"]),
    dict(id="cerraclass", nome="CerraClass", arroba="@cerraclass", cor="#ffc83d", frentes=["cerraclass"]),
]
FUTURAS = [dict(nome="Consultoria acadêmica", obs="frente nova, ainda sem conta e sem conteúdo")]
POR_DIA = {"cerradofinancas": 1, "cerraai": 1, "cerraclass": 1}  # mínimo 1, máximo 2
FORA_DA_AGENDA = {"folinha-animada"}  # material de apoio, não é postagem

CARROSSEL = "Carrossel + story"


def conta_de(frente):
    return next(c["id"] for c in CONTAS if frente in c["frentes"])


def campanhas():
    out = []
    for p in sorted(ENTREGAS.iterdir()):
        if p.is_dir() and (p / "info.json").exists() and p.name not in FORA_DA_AGENDA:
            frente, serie = classificar(p.name)
            out.append(dict(pasta=p.name, frente=frente, serie=serie,
                            titulo=json.loads((p / "info.json").read_text(encoding="utf-8"))["titulo"],
                            arquivos={f.name for f in p.iterdir()}))
    return out


def post(c, peca=CARROSSEL, arquivo=None):
    return dict(pasta=c["pasta"], frente=c["frente"], titulo=c["titulo"], peca=peca, arquivo=arquivo)


def fila_financas(cs):
    """Lançamento e campanhas de frente primeiro; depois as séries intercaladas por proporção."""
    por = lambda serie, frente=None: [c for c in cs if c["serie"] == serie and (frente is None or c["frente"] == frente)]
    abertura = por("Lançamento", "institucional") + [c for f in ("tech", "contabilidade", "credito")
                                                     for c in por("Campanha da frente", f)]
    grupos = {
        "tech": por("O que a Cerrado Tech constrói"),
        "contabil": por("Para quem atendemos e o que fazemos"),
        "sabia": por("Você sabia?"),
        "credito": por("Produto a produto"),
        "entenda": por("Antes de assinar, entenda"),
        "consultoria": por("Pranchas das consultorias"),
    }
    # as séries já saem na ordem pensada nos geradores (pela data antiga)
    datas = {p.name: json.loads((p / "info.json").read_text(encoding="utf-8"))["data"] for p in ENTREGAS.iterdir() if (p / "info.json").exists()}
    for g in grupos.values():
        g.sort(key=lambda c: datas[c["pasta"]])
    fila = [post(c) for c in abertura]
    feitos = {g: 0 for g in grupos}
    anterior = fila[-1]["frente"] if fila else None
    while any(feitos[g] < len(grupos[g]) for g in grupos):
        livres = [g for g in grupos if feitos[g] < len(grupos[g]) and not (g == "entenda" and feitos["credito"] < 6)]
        if not livres:
            livres = [g for g in grupos if feitos[g] < len(grupos[g])]
        # o grupo mais "atrasado" em relação ao seu tamanho vai primeiro; evita repetir a frente do dia anterior
        livres.sort(key=lambda g: ((feitos[g] + 0.5) / len(grupos[g]), g))
        escolha = next((g for g in livres if grupos[g][feitos[g]]["frente"] != anterior), livres[0])
        c = grupos[escolha][feitos[escolha]]
        feitos[escolha] += 1
        fila.append(post(c))
        anterior = c["frente"]
    return fila


def fila_cerraai(cs):
    fila = []
    for c in cs:
        fila.append(post(c))
        for peca, arq in (("Reel: comercial", "video-vertical.mp4"), ("Reel: lançamento", "video-lancamento-vertical.mp4")):
            if arq in c["arquivos"]:
                fila.append(post(c, peca, arq))
    return fila


def fila_cerraclass(cs):
    geral = [c for c in cs if c["serie"] == "Campanha da frente"]
    ordem = ["ia-na-pratica", "ia-farma", "ia-na-gestao", "excel-com-ia", "consultoria-contabil-ia", "consultoria-financeira-ia",
             "analise-de-dados", "bpmn-com-ia", "automacao-com-ia", "ciencia-de-dados", "ia-na-farma", "bi-dashboards-ia",
             "prototipacao-apps-ia"]
    pos = lambda c: next((i for i, s in enumerate(ordem) if c["pasta"].endswith("curso-" + s)), len(ordem))
    cursos = sorted((c for c in cs if c["serie"] != "Campanha da frente"), key=pos)
    fila = [post(c) for c in geral]
    for c in geral:
        if "video-extra-app-vertical.mp4" in c["arquivos"]:
            fila.append(post(c, "Reel: o app da CerraClass", "video-extra-app-vertical.mp4"))
    # carrossel do curso num dia, o Reel do mesmo curso dois dias depois
    reels = [post(c, "Reel do curso", "video-vertical.mp4") for c in cursos if "video-vertical.mp4" in c["arquivos"]]
    carrosseis = [post(c) for c in cursos]
    for i, p in enumerate(carrosseis):
        fila.append(p)
        if i >= 1 and i - 1 < len(reels):
            fila.append(reels[i - 1])
    fila += reels[max(0, len(carrosseis) - 1):]
    return fila


def distribuir(fila, inicio, por_dia):
    out, d = [], inicio
    for i in range(0, len(fila), por_dia):
        for p in fila[i:i + por_dia]:
            out.append({**p, "data": d.isoformat()})
        d += timedelta(days=1)
    return out


def main():
    inicio = date.fromisoformat(sys.argv[1]) if len(sys.argv) > 1 else date.today() + timedelta(days=1)
    cs = campanhas()
    filas = {
        "cerradofinancas": fila_financas([c for c in cs if conta_de(c["frente"]) == "cerradofinancas"]),
        "cerraai": fila_cerraai([c for c in cs if conta_de(c["frente"]) == "cerraai"]),
        "cerraclass": fila_cerraclass([c for c in cs if conta_de(c["frente"]) == "cerraclass"]),
    }
    posts = []
    for conta, fila in filas.items():
        assert 1 <= POR_DIA[conta] <= 2
        for p in distribuir(fila, inicio, POR_DIA[conta]):
            posts.append({**p, "conta": conta})
    fim = max(p["data"] for p in posts)

    # cada campanha: data da primeira postagem, conta e a orientação de quando postar
    por_pasta = {}
    for p in sorted(posts, key=lambda p: p["data"]):
        por_pasta.setdefault(p["pasta"], []).append(p)
    for pasta, ps in por_pasta.items():
        arq = ENTREGAS / pasta / "info.json"
        info = json.loads(arq.read_text(encoding="utf-8"))
        conta = next(c for c in CONTAS if c["id"] == ps[0]["conta"])
        quando = "; ".join(f"{date.fromisoformat(p['data']).strftime('%d/%m')} ({p['peca'].lower()})" for p in ps) if len(ps) > 1 \
            else date.fromisoformat(ps[0]["data"]).strftime("%d/%m")
        info["data"] = ps[0]["data"]
        info["conta"] = conta["arroba"]
        info["orientacoes"] = [f"Postar em {quando} no {conta['arroba']} (agenda de 28/10: de 1 a 2 posts por dia em cada conta)."] + \
            [o for o in info.get("orientacoes", []) if not o.startswith("Postar em")]
        arq.write_text(json.dumps(info, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    agenda = {
        "inicio": inicio.isoformat(), "fim": fim, "por_dia": POR_DIA,
        "contas": [{k: c[k] for k in ("id", "nome", "arroba", "cor", "frentes")} for c in CONTAS],
        "futuras": FUTURAS,
        "posts": sorted(posts, key=lambda p: (p["data"], p["conta"])),
    }
    (ENTREGAS / "agenda.json").write_text(json.dumps(agenda, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    for conta, fila in filas.items():
        dias = -(-len(fila) // POR_DIA[conta])
        ultimo = inicio + timedelta(days=dias - 1)
        print(f"{conta}: {len(fila)} posts, {POR_DIA[conta]}/dia, de {inicio.strftime('%d/%m')} a {ultimo.strftime('%d/%m')}")
    print(f"agenda até {date.fromisoformat(fim).strftime('%d/%m/%Y')}")


if __name__ == "__main__":
    main()
