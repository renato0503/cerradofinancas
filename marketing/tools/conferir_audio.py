# Confere o audio dos videos entregues (Reels e vinheta).
# Extrai o audio de cada MP4, mede pico, RMS, silencios ePossible clip digital.
# Uso: python tools/conferir_audio.py
import json
import math
import os
import struct
import subprocess
import sys
import tempfile
import wave
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
ENTREGAS = RAIZ / "entregas"
FFMPEG = ["npx.cmd", "remotion", "ffmpeg"] if os.name == "nt" else ["npx", "remotion", "ffmpeg"]


def extrair_audio(mp4: Path) -> Path:
    destino = Path(tempfile.gettempdir()) / f"audio_{mp4.stem}.wav"
    subprocess.run(
        FFMPEG + ["-hide_banner", "-y", "-i", str(mp4), "-vn", "-ac", "1", "-ar", "44100", "-f", "wav", str(destino)],
        cwd=RAIZ / "videos",
        capture_output=True,
        check=True,
    )
    return destino


def medir(wav_path: Path):
    w = wave.open(str(wav_path), "rb")
    n, sr, sw = w.getnframes(), w.getframerate(), w.getsampwidth()
    data = w.readframes(n)
    w.close()
    if sw == 2:
        vals = struct.unpack(f"<{len(data)//2}h", data)
        escala = 32768
    else:
        vals = struct.unpack(f"<{len(data)}b", data)
        escala = 128
    if not vals:
        return None
    pico = max(abs(v) for v in vals)
    rms = math.sqrt(sum(v * v for v in vals) / len(vals))
    clipping = sum(1 for v in vals if abs(v) >= escala - 1) / len(vals) * 100

    # silencios: janelas de 0,5s abaixo de -50 dBFS
    janela = int(sr * 0.5)
    silencios = []
    for i in range(0, len(vals), janela):
        bloco = vals[i:i + janela]
        if len(bloco) < janela // 2:
            break
        b_rms = math.sqrt(sum(v * v for v in bloco) / len(bloco))
        if b_rms < escala * 0.003:  # ~ -50 dBFS
            silencios.append(i / sr)
    db = lambda x: 20 * math.log10(x / escala) if x > 0 else -99.0
    return {
        "duracao": round(n / sr, 2),
        "pico_db": round(db(pico), 1),
        "rms_db": round(db(rms), 1),
        "clipping_pct": round(clipping, 3),
        "silencios": silencios,
    }


def main():
    videos = sorted(ENTREGAS.rglob("*.mp4"))
    if not videos:
        print("nenhum MP4 encontrado")
        return
    problemas = 0
    for v in videos:
        wav = extrair_audio(v)
        m = medir(wav)
        os.remove(wav)
        if m is None:
            print(f"{v.name}: SEM AUDIO")
            problemas += 1
            continue
        maior_silencio = 0.0
        if m["silencios"]:
            # maior sequencia continua de silencio
            atual = m["silencios"][0]
            for a, b in zip(m["silencios"], m["silencios"][1:]):
                if b - a <= 0.5:
                    atual = b
                else:
                    maior_silencio = max(maior_silencio, atual - a + 0.5)
                    atual = b
            maior_silencio = max(maior_silencio, atual - m["silencios"][0] + 0.5)
        sinal = "ok"
        if m["pico_db"] > -0.1:
            sinal = "CLIPPING"
        elif m["rms_db"] < -30:
            sinal = "MUTO"
        elif maior_silencio > 2.0:
            sinal = "SILENCIO LONGO"
        if sinal != "ok":
            problemas += 1
        print(
            f"{v.parent.name + '/' + v.name:58} {m['duracao']:6.2f}s pico {m['pico_db']:6.1f}dB "
            f"rms {m['rms_db']:6.1f}dB clip {m['clipping_pct']:5.3f}% "
            f"silencio_max {maior_silencio:4.1f}s  {sinal}"
        )
    print(f"\n{len(videos)} videos conferidos, {problemas} com alerta.")


if __name__ == "__main__":
    main()
