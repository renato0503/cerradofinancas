"""Atualiza a página /marketing/ a partir de entregas/.

Para cada pasta em entregas/ (uma por campanha), gera o pacote <pasta>.zip com
todos os arquivos e escreve entregas/conteudos.json, que a página lê.

Cada pasta precisa de um info.json com "titulo", "data", "descricao" e,
opcionalmente, "orientacoes" (lista de frases). Legendas são os arquivos
legenda-*.txt; o nome depois do hífen vira o nome da rede na página.

Uso:
    python tools/publicar.py
"""
import json
import zipfile
from pathlib import Path

ENTREGAS = Path(__file__).resolve().parent.parent / "entregas"
REDES = {"instagram": "Instagram", "linkedin": "LinkedIn", "whatsapp": "WhatsApp",
         "facebook": "Facebook", "tiktok": "TikTok", "youtube": "YouTube"}
TIPOS = {
    ".png": "imagem", ".jpg": "imagem", ".gif": "imagem",
    ".mp4": "video", ".webm": "video", ".mov": "video",
    ".json": "lottie",
}


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
            if f.suffix != ".zip" and f.name != "info.json":
                z.write(f, f.name)

    return {
        "pasta": pasta.name,
        **info,
        "arquivos": arquivos,
        "legendas": legendas,
        "pacote": {"nome": pacote.name, "kb": round(pacote.stat().st_size / 1024)},
    }


def main():
    campanhas = [
        publicar_pasta(p)
        for p in sorted(ENTREGAS.iterdir(), reverse=True)
        if p.is_dir() and (p / "info.json").exists()
    ]
    campanhas.sort(key=lambda c: c["data"], reverse=True)
    destino = ENTREGAS / "conteudos.json"
    destino.write_text(json.dumps(campanhas, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    for c in campanhas:
        print(f"{c['pasta']}: {len(c['arquivos'])} arquivos, {len(c['legendas'])} legendas, zip {c['pacote']['kb']} KB")


if __name__ == "__main__":
    main()
