"""Monta a agenda de postagens por conta de Instagram e grava as datas nas campanhas.

Regras (pedido do Renato em 28/10):
- **Contas:** @cerradofinancas (Cerrado Tech, Contabilidade, Crédito, Consultorias e Institucional), @cerra.ai,
  @cerraclass e, desde 30/10, @guiacademico (a consultoria acadêmica).
- **Início:** o Felipe começa a postar em 31/10/2026; rode com essa data para manter a ordem.
- **Repetição (30/10):** quando uma conta fica sem post novo, a agenda repete os posts dela desde o mais antigo,
  na mesma ordem, até o fim da agenda. As datas comemorativas nunca se repetem.
- **Datas comemorativas (30/10):** só as nacionais, com post estático e story, sem vídeo (tools/gerar_datas.py).
  Saem no dia fixo (campo "data_fixa" do info.json), ao lado do post normal da conta.
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
    dict(id="guiacademico", nome="Guia Acadêmico", arroba="@guiacademico", cor="#1e2a44", frentes=["guiacademico"]),
]
FUTURAS = []
POR_DIA = {"cerradofinancas": 1, "cerraai": 1, "cerraclass": 1, "guiacademico": 1}  # mínimo 1, máximo 2
FORA_DA_AGENDA = {"folinha-animada", "2026-11-cerraai-material-kit-vendas"}  # material de apoio, não é postagem

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


def data_fixa(pasta):
    return json.loads((ENTREGAS / pasta / "info.json").read_text(encoding="utf-8")).get("data_fixa")


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
    """A campanha de lançamento (carrossel e os 2 comerciais) e depois a série de conteúdo, na ordem do gerador.
    O carrossel animado de cada campanha da série sai como Reel separado, quatro posts depois do carrossel."""
    datas = {p.name: json.loads((p / "info.json").read_text(encoding="utf-8"))["data"] for p in ENTREGAS.iterdir() if (p / "info.json").exists()}
    lancamento = [c for c in cs if c["serie"] == "Lançamento"]
    serie = sorted((c for c in cs if c["serie"] != "Lançamento"), key=lambda c: datas[c["pasta"]])
    fila = []
    for c in lancamento:
        fila.append(post(c))
        for peca, arq in (("Reel: comercial", "video-vertical.mp4"), ("Reel: lançamento", "video-lancamento-vertical.mp4")):
            if arq in c["arquivos"]:
                fila.append(post(c, peca, arq))
    reels = [post(c, "Reel: carrossel animado", "carrossel-animado.mp4") for c in serie if "carrossel-animado.mp4" in c["arquivos"]]
    atraso = 4
    for i, c in enumerate(serie):
        fila.append(post(c, "Stories interativos (1 por dia)") if "-stories-" in c["pasta"] else post(c))
        if i >= atraso and i - atraso < len(reels):
            fila.append(reels[i - atraso])
    fila += reels[max(0, len(serie) - atraso):]
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


def fila_guiacademico(cs):
    """A apresentação primeiro e depois os temas, na ordem do gerador. O carrossel animado de cada tema sai como Reel
    separado, quatro posts depois do carrossel."""
    datas = {p.name: json.loads((p / "info.json").read_text(encoding="utf-8"))["data"] for p in ENTREGAS.iterdir() if (p / "info.json").exists()}
    ordem = sorted(cs, key=lambda c: (not c["pasta"].endswith("-lancamento"), datas[c["pasta"]]))
    reels = [post(c, "Reel: carrossel animado", "carrossel-animado.mp4") for c in ordem if "carrossel-animado.mp4" in c["arquivos"]]
    fila, atraso = [], 4
    for i, c in enumerate(ordem):
        fila.append(post(c))
        if i >= atraso and i - atraso < len(reels):
            fila.append(reels[i - atraso])
    return fila + reels[max(0, len(ordem) - atraso):]


def distribuir(fila, inicio, por_dia):
    out, d = [], inicio
    for i in range(0, len(fila), por_dia):
        for p in fila[i:i + por_dia]:
            out.append({**p, "data": d.isoformat()})
        d += timedelta(days=1)
    return out


def main():
    inicio = date.fromisoformat(sys.argv[1]) if len(sys.argv) > 1 else date.today() + timedelta(days=1)
    todas = campanhas()
    fixas = [c for c in todas if data_fixa(c["pasta"])]
    cs = [c for c in todas if not data_fixa(c["pasta"])]
    filas = {
        "cerradofinancas": fila_financas([c for c in cs if conta_de(c["frente"]) == "cerradofinancas"]),
        "cerraai": fila_cerraai([c for c in cs if conta_de(c["frente"]) == "cerraai"]),
        "cerraclass": fila_cerraclass([c for c in cs if conta_de(c["frente"]) == "cerraclass"]),
        "guiacademico": fila_guiacademico([c for c in cs if conta_de(c["frente"]) == "guiacademico"]),
    }
    novos = {}
    for conta, fila in filas.items():
        assert 1 <= POR_DIA[conta] <= 2
        novos[conta] = distribuir(fila, inicio, POR_DIA[conta])
    fim = max([p["data"] for ps in novos.values() for p in ps] + [data_fixa(c["pasta"]) for c in fixas])
    posts = []
    for conta, ps in novos.items():
        fila = filas[conta]
        # sem post novo: repete a fila da conta desde o post mais antigo, até o fim da agenda
        if fila and ps[-1]["data"] < fim:
            prox = date.fromisoformat(ps[-1]["data"]) + timedelta(days=1)
            vagas = ((date.fromisoformat(fim) - prox).days + 1) * POR_DIA[conta]
            reps = [{**fila[i % len(fila)], "peca": fila[i % len(fila)]["peca"] + " (repetição)", "repeticao": True} for i in range(vagas)]
            ps = ps + distribuir(reps, prox, POR_DIA[conta])
        posts += [{**p, "conta": conta} for p in ps]
    # datas comemorativas: no dia fixo, além do post normal da conta
    for c in fixas:
        if data_fixa(c["pasta"]) >= inicio.isoformat():
            posts.append({**post(c, "Data comemorativa: post + story"), "data": data_fixa(c["pasta"]),
                          "conta": conta_de(c["frente"]), "fixa": True})

    # cada campanha: data da primeira postagem, conta e a orientação de quando postar
    por_pasta = {}
    for p in sorted(posts, key=lambda p: p["data"]):
        if not p.get("repeticao") and not p.get("fixa"):
            por_pasta.setdefault(p["pasta"], []).append(p)
    for pasta, ps in por_pasta.items():
        arq = ENTREGAS / pasta / "info.json"
        info = json.loads(arq.read_text(encoding="utf-8"))
        conta = next(c for c in CONTAS if c["id"] == ps[0]["conta"])
        quando = "; ".join(f"{date.fromisoformat(p['data']).strftime('%d/%m')} ({p['peca'].lower()})" for p in ps) if len(ps) > 1 \
            else date.fromisoformat(ps[0]["data"]).strftime("%d/%m")
        info["data"] = ps[0]["data"]
        info["conta"] = conta["arroba"]
        info["orientacoes"] = [f"Postar em {quando} no {conta['arroba']} (agenda de 30/10, a partir de 31/10: de 1 a 2 posts por dia em cada conta)."] + \
            [o for o in info.get("orientacoes", []) if not o.startswith("Postar em")]
        arq.write_text(json.dumps(info, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    agenda = {
        "inicio": inicio.isoformat(), "fim": fim, "por_dia": POR_DIA,
        "contas": [{k: c[k] for k in ("id", "nome", "arroba", "cor", "frentes")} for c in CONTAS],
        "futuras": FUTURAS,
        "novos_ate": {conta: ps[-1]["data"] for conta, ps in novos.items() if ps},
        "posts": sorted(posts, key=lambda p: (p["data"], p["conta"])),
    }
    (ENTREGAS / "agenda.json").write_text(json.dumps(agenda, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    for conta, fila in filas.items():
        ultimo = date.fromisoformat(novos[conta][-1]["data"])
        print(f"{conta}: {len(fila)} posts novos, {POR_DIA[conta]}/dia, de {inicio.strftime('%d/%m')} a {ultimo.strftime('%d/%m')}; depois repete")
    print(f"datas comemorativas: {len(fixas)}")
    print(f"agenda até {date.fromisoformat(fim).strftime('%d/%m/%Y')}")


if __name__ == "__main__":
    main()
