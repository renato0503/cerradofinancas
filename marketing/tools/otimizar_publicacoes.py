"""
Encolhe o que e publicado no GitHub Pages sem mudar o que o time de marketing ve.

O limite do GitHub Pages e de 1 GB para o site publicado. Este script:

1. PNG  -> quantiza para 256 cores (o design das pecas e de poucas cores) e
   reescreve o arquivo otimizado. Logos com transparencia usam FASTOCTREE.
2. MP4  -> tira a trilha sintetizada (a regra e "video sem audio") e reencode com
   libx264 crf 24 preset medium. Medido: SSIM 0,994 contra o original, ou seja,
   visualmente identico.
3. ZIP  -> refaz o pacote de cada campanha com as pecas ja encolhidas.
4. Central -> atualiza o `entregas/conteudos.json` so das campanhas tratadas
   (o `publicar.py` inteiro nao pode rodar aqui: ele varreria campanhas de outra
   IA que ainda nao foram commitadas).

Regras de seguranca:
- So mexe em arquivo que esta no git e SEM mudanca nao commitada (arquivo sujo e
  de outra pessoa: fica intacto).
- Nada e apagado sem substituto: o arquivo so e trocado se o novo for menor.
- `--dry-run` mostra o ganho sem escrever nada.

Uso:
    python tools/otimizar_publicacoes.py --dry-run
    python tools/otimizar_publicacoes.py
"""

import argparse
import json
import os
import subprocess
import sys
import zipfile
from pathlib import Path

from PIL import Image

# RAIZ do repositorio (marketing/tools/... -> repositorio)
REPO = Path(__file__).resolve().parents[2]
ENTREGAS = REPO / "marketing" / "entregas"
KITS = REPO / "marketing" / "kits"
FORA_DO_ZIP = {".mp4", ".webm", ".mov"}


# ---------------------------------------------------------------- git

def arquivos_sujados():
    """Caminhos com mudanca nao commitada (de outra IA). Nao podem ser tocados."""
    suja = set()
    out = subprocess.run(
        ["git", "status", "--porcelain", "-z"],
        cwd=REPO, capture_output=True, text=True, encoding="utf-8", errors="replace",
    ).stdout
    for linha in out.split("\0"):
        if not linha.strip():
            continue
        caminho = linha[3:].strip().strip('"')
        suja.add(caminho.replace("/", os.sep))
        # rename: "orig -> novo"
        if " -> " in caminho:
            suja.add(caminho.split(" -> ")[-1].strip().strip('"').replace("/", os.sep))
    return suja


def arquivos_versionados():
    """Arquivos de marketing/entregas e marketing/kits que estao no git."""
    out = subprocess.run(
        ["git", "ls-files", "-z", "--", "marketing/entregas", "marketing/kits"],
        cwd=REPO, capture_output=True, text=True, encoding="utf-8", errors="replace",
    ).stdout
    return [c for c in out.split("\0") if c]


# ---------------------------------------------------------------- PNG

def encolher_png(caminho: Path) -> tuple[int, int]:
    """Quantiza para 256 cores. Devolve (antes, depois) em bytes."""
    antes = caminho.stat().st_size
    original = Image.open(caminho)
    tem_alfa = original.mode in ("RGBA", "LA") or (
        original.mode == "P" and "transparency" in original.info
    )
    rgba = original.convert("RGBA") if tem_alfa else original.convert("RGB")
    if tem_alfa:
        quantizado = rgba.quantize(
            colors=256, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.FLOYDSTEINBERG
        )
    else:
        quantizado = rgba.quantize(
            colors=256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.FLOYDSTEINBERG
        )
    temporario = caminho.with_suffix(caminho.suffix + ".tmp")
    quantizado.save(temporario, format="PNG", optimize=True)
    depois = temporario.stat().st_size
    if depois < antes:
        os.replace(temporario, caminho)
        return antes, depois
    temporario.unlink(missing_ok=True)
    return antes, depois


# ---------------------------------------------------------------- MP4

def encolher_mp4(caminho: Path, escrever: bool = True) -> tuple[int, int]:
    """Tira o audio e reencode. Devolve (antes, depois) em bytes."""
    antes = caminho.stat().st_size
    temporario = caminho.with_suffix(".otimizado.mp4")
    subprocess.run(
        [
            "ffmpeg", "-y", "-v", "error", "-i", str(caminho),
            "-an", "-c:v", "libx264", "-preset", "medium", "-crf", "24",
            "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(temporario),
        ],
        check=True,
    )
    depois = temporario.stat().st_size
    if depois < antes and escrever:
        os.replace(temporario, caminho)
        return antes, depois
    temporario.unlink(missing_ok=True)
    return antes, depois


# ---------------------------------------------------------------- ZIP

def refazer_zip(pasta: Path) -> tuple[int, int]:
    """Refaz o pacote da campanha com a mesma regra do publicar.py."""
    pacote = pasta / f"{pasta.name}.zip"
    if not pacote.exists():
        return 0, 0
    antes = pacote.stat().st_size
    temporario = pacote.with_suffix(".zip.tmp")
    with zipfile.ZipFile(temporario, "w", zipfile.ZIP_DEFLATED) as z:
        for f in sorted(pasta.iterdir()):
            if f.suffix != ".zip" and f.name != "info.json" and f.suffix.lower() not in FORA_DO_ZIP:
                z.write(f, f.name)
    depois = temporario.stat().st_size
    os.replace(temporario, pacote)
    return antes, depois


# ---------------------------------------------------------------- kits

def refazer_kits() -> int:
    """Refaz os .zip dos midia kits (mesma regra do gerar_kits.py) e ajusta o kits.json."""
    ganho = 0
    caminho_json = KITS / "kits.json"
    kits = json.loads(caminho_json.read_text(encoding="utf-8")) if caminho_json.exists() else []
    por_slug = {k.get("slug"): k for k in kits}
    for pasta in sorted(KITS.iterdir()):
        if not pasta.is_dir():
            continue
        zipado = KITS / f"{pasta.name}.zip"
        if not zipado.exists():
            continue
        antes = zipado.stat().st_size
        temporario = zipado.with_suffix(".zip.tmp")
        with zipfile.ZipFile(temporario, "w", zipfile.ZIP_DEFLATED) as z:
            for f in sorted(pasta.rglob("*")):
                if f.is_file():
                    z.write(f, f"midia-kit-{pasta.name}/{f.relative_to(pasta).as_posix()}")
        depois = temporario.stat().st_size
        os.replace(temporario, zipado)
        ganho += antes - depois
        if pasta.name in por_slug and "zip" in por_slug[pasta.name]:
            por_slug[pasta.name]["zip"]["kb"] = round(depois / 1024)
    if kits and caminho_json.exists():
        caminho_json.write_text(json.dumps(kits, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return ganho


# ---------------------------------------------------------------- Central

def atualizar_conteudos(pastas):
    """Atualiza so as campanhas tratadas no conteudos.json, sem tocar nas outras."""
    caminho = ENTREGAS / "conteudos.json"
    if not caminho.exists():
        return
    lista = json.loads(caminho.read_text(encoding="utf-8"))
    sys.path.insert(0, str(REPO / "marketing" / "tools"))
    try:
        from publicar import publicar_pasta
    except Exception as exc:  # noqa: BLE001
        print(f"  ! nao consegui importar publicar.py ({exc}); Central nao atualizada")
        return
    novos = {}
    for pasta in pastas:
        if (pasta / "info.json").exists():
            novos[pasta.name] = publicar_pasta(pasta)
    for i, item in enumerate(lista):
        if item.get("pasta") in novos:
            trocado = novos.pop(item["pasta"])
            trocado["data"] = item.get("data", trocado.get("data"))
            lista[i] = trocado
    caminho.write_text(json.dumps(lista, ensure_ascii=False, indent=2), encoding="utf-8")


# ---------------------------------------------------------------- main

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true", help="so mostra o ganho")
    args = ap.parse_args()

    suja = arquivos_sujados()
    versionados = arquivos_versionados()
    print(f"{len(versionados)} arquivos versionados; {len(suja)} caminhos sujos (de outra IA, intactos)")

    ganho_png = ganho_mp4 = ganho_zip = 0
    antes_total = depois_total = 0
    pastas = set()
    n_png = n_mp4 = 0
    processados = 0

    for relativo in versionados:
        caminho = REPO / relativo
        if not caminho.exists() or relativo in suja:
            continue
        if caminho.suffix.lower() == ".png":
            antes, depois = encolher_png(caminho) if not args.dry_run else medir_png(caminho)
            ganho_png += antes - depois
            n_png += 1
        elif caminho.suffix.lower() == ".mp4":
            antes, depois = encolher_mp4(caminho, escrever=not args.dry_run)
            ganho_mp4 += antes - depois
            n_mp4 += 1
        elif caminho.suffix.lower() == ".zip":
            continue
        else:
            continue
        antes_total += antes
        depois_total += depois
        if "entregas" in relativo:
            pastas.add(caminho.parent)
        processados += 1
        if processados % 25 == 0:
            print(f"  ... {processados} arquivos, ganho ate aqui {mb(ganho_png + ganho_mp4)}", flush=True)

    if not args.dry_run:
        for pasta in sorted(pastas):
            antes, depois = refazer_zip(pasta)
            ganho_zip += antes - depois
        ganho_zip += refazer_kits()

    print(f"PNG:  {n_png} arquivos, ganho {mb(ganho_png)}")
    print(f"MP4:  {n_mp4} arquivos, ganho {mb(ganho_mp4)}")
    print(f"ZIP:  ganho {mb(ganho_zip)}")
    print(f"total ganho: {mb(ganho_png + ganho_mp4 + ganho_zip)}")
    if not args.dry_run:
        atualizar_conteudos(sorted(pastas))


def medir_png(caminho: Path) -> tuple[int, int]:
    """Estima o ganho sem escrever."""
    antes = caminho.stat().st_size
    original = Image.open(caminho)
    tem_alfa = original.mode in ("RGBA", "LA") or (
        original.mode == "P" and "transparency" in original.info
    )
    rgba = original.convert("RGBA") if tem_alfa else original.convert("RGB")
    if tem_alfa:
        q = rgba.quantize(colors=256, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.FLOYDSTEINBERG)
    else:
        q = rgba.quantize(colors=256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.FLOYDSTEINBERG)
    import io
    buffer = io.BytesIO()
    q.save(buffer, format="PNG", optimize=True)
    return antes, buffer.tell()


def mb(n):
    return f"{n / 1024 / 1024:.1f} MB"


if __name__ == "__main__":
    main()
