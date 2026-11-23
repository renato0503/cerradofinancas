"""Atualiza a página /marketing/ a partir de entregas/.

Para cada pasta em entregas/ (uma por campanha), gera o pacote <pasta>.zip com
os arquivos da campanha e escreve entregas/conteudos.json, que a página lê.

O .zip NAO leva os videos (.mp4, .webm, .mov): eles ocupam quase todo o espaco
do repositorio e o time baixa o video direto pela pagina, peça por peça.
Cada pasta precisa de um info.json com "titulo", "data", "descricao" e,
opcionalmente, "orientacoes" (lista de frases). Legendas são os arquivos
legenda-*.txt; o nome depois do hífen vira o nome da rede na página.

Uso:
    python tools/publicar.py
"""
import json
import sys
import zipfile
from pathlib import Path

ENTREGAS = Path(__file__).resolve().parent.parent / "entregas"
REDES = {"instagram": "Instagram", "linkedin": "LinkedIn", "whatsapp": "WhatsApp",
         "facebook": "Facebook", "tiktok": "TikTok", "youtube": "YouTube"}
TIPOS = {
    ".png": "imagem", ".jpg": "imagem", ".gif": "imagem",
    ".mp4": "video", ".webm": "video", ".mov": "video",
    ".json": "lottie",
    ".pdf": "documento",
}
# Frente e série de cada campanha, pelo nome da pasta (sem a data): a primeira regra que casar vale.
# A página agrupa e filtra por elas; ao criar um prefixo novo, acrescente aqui.
REGRAS = [
    ("chamada-tech", "tech", "Chamada 15s"),
    ("chamada-contabilidade", "contabilidade", "Chamada 15s"),
    ("chamada-credito", "credito", "Chamada 15s"),
    ("chamada-consultoria", "consultorias", "Chamada 15s"),
    ("chamada-cerraclass", "cerraclass", "Chamada 15s"),
    ("chamada-cerraai", "cerraai", "Chamada 15s"),
    ("chamada-cerrafood", "cerrafood", "Chamada 15s"),
    ("chamada-guiacademico", "guiacademico", "Chamada 15s"),
    ("chamada-institucional", "institucional", "Chamada 15s"),
    ("apresentacao-cerraai", "cerraai", "Apresentação institucional"),
    ("apresentacao-cerradotech", "tech", "Apresentação institucional"),
    ("apresentacao-cerraclass", "cerraclass", "Apresentação institucional"),
    ("apresentacao-guiacademico", "guiacademico", "Apresentação institucional"),
    ("apresentacao-cerrafood", "cerrafood", "Apresentação institucional"),
    ("cerrafood-", "cerrafood", "Série CerraFood"),
    ("cerraai-ia-da-semana-", "cerraai", "IA da semana"),
    ("cerraai-glossario-", "cerraai", "Glossário da IA local"),
    ("cerraai-pergunte-", "cerraai", "Pergunte ao Cerra.AI"),
    ("cerraai-stories-", "cerraai", "Stories interativos"),
    ("cerraai-comparativo-", "cerraai", "Comparativo"),
    ("cerraai-material-", "cerraai", "Materiais (PDF)"),
    ("guiacademico-", "guiacademico", "Cadernos de método"),
    ("data-", "institucional", "Datas comemorativas"),
    ("tech-", "tech", "O que a Cerrado Tech constrói"),
    ("fabrica-de-software", "tech", "Campanha da frente"),
    ("contabil-sabia-", "contabilidade", "Você sabia?"),
    ("contabil-", "contabilidade", "Para quem atendemos e o que fazemos"),
    ("contabilidade", "contabilidade", "Campanha da frente"),
    ("credito-entenda-", "credito", "Antes de assinar, entenda"),
    ("credito-", "credito", "Produto a produto"),
    ("credito", "credito", "Campanha da frente"),
    ("consultoria-", "consultorias", "Pranchas das consultorias"),
    ("curso-", "cerraclass", "Um curso por campanha"),
    ("cursos", "cerraclass", "Campanha da frente"),
    ("cerraai-", "cerraai", "Série de conteúdo"),
    ("cerra-ai", "cerraai", "Lançamento"),
    ("lancamento-4-frentes", "institucional", "Lançamento"),
    ("folinha-animada", "institucional", "Marca animada"),
]


def classificar(nome):
    tema = nome[8:] if nome[:4].isdigit() and nome[7] == "-" else nome
    for prefixo, frente, serie in REGRAS:
        if tema.startswith(prefixo):
            return frente, serie
    return "institucional", "Avulsa"


# extensoes que ficam de fora do .zip (peso alto, baixa pela pagina)
FORA_DO_ZIP = {".mp4", ".webm", ".mov"}


def publicar_pasta(pasta: Path):
    info = json.loads((pasta / "info.json").read_text(encoding="utf-8"))
    arquivos, legendas = [], []
    for f in sorted(pasta.iterdir()):
        if f.name in ("info.json",) or f.suffix == ".zip":
            continue
        if f.name.startswith("legenda-") and f.suffix == ".txt":
            legendas.append({
                "rede": REDES.get(f.stem.removeprefix("legenda-"), f.stem.removeprefix("legenda-").capitalize()),
                "arquivo": f.name,
                "texto": f.read_text(encoding="utf-8"),
            })
        elif f.suffix.lower() in TIPOS:
            arquivos.append({
                "nome": f.name,
                "tipo": TIPOS[f.suffix.lower()],
                "kb": round(f.stat().st_size / 1024),
            })

    pacote = pasta / f"{pasta.name}.zip"
    with zipfile.ZipFile(pacote, "w", zipfile.ZIP_DEFLATED) as z:
        for f in sorted(pasta.iterdir()):
            if f.suffix != ".zip" and f.name != "info.json" and f.suffix.lower() not in FORA_DO_ZIP:
                z.write(f, f.name)

    frente, serie = classificar(pasta.name)
    serie = info.pop("serie", None) or serie  # o gerador pode informar a série no info.json
    imagens = [a["nome"] for a in arquivos if a["tipo"] == "imagem"]
    capa = next((n for n in imagens if n.startswith("carrossel-01")), imagens[0] if imagens else None)
    return {
        "pasta": pasta.name,
        "frente": frente,
        "serie": serie,
        "capa": capa,
        **info,
        "arquivos": arquivos,
        "legendas": legendas,
        "pacote": {"nome": pacote.name, "kb": round(pacote.stat().st_size / 1024)},
    }


def main(alvos=()):
    if alvos:
        pastas = [ENTREGAS / a for a in alvos]
    else:
        pastas = [p for p in sorted(ENTREGAS.iterdir(), reverse=True)
                  if p.is_dir() and (p / "info.json").exists()]
    campanhas = [publicar_pasta(p) for p in pastas if (p / "info.json").exists()]
    destino = ENTREGAS / "conteudos.json"
    if alvos and destino.exists():
        # publica só as pastas pedidas e mantém as campanhas que já estavam na Central
        atuais = {c["pasta"]: c for c in json.loads(destino.read_text(encoding="utf-8"))}
        atuais.update({c["pasta"]: c for c in campanhas})
        campanhas = list(atuais.values())
    campanhas.sort(key=lambda c: c["data"], reverse=True)
    destino.write_text(json.dumps(campanhas, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    for c in campanhas:
        print(f"{c['pasta']}: {len(c['arquivos'])} arquivos, {len(c['legendas'])} legendas, zip {c['pacote']['kb']} KB")


if __name__ == "__main__":
    main(sys.argv[1:])
