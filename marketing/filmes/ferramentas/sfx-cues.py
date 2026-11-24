"""Monta a trilha de efeitos de um filme a partir de um JSON de deixas.

    python ferramentas/sfx-cues.py <cues.json> <saida.wav>

O JSON tem a pasta dos wav (gerados por `tools/video.py sfx`), a duração e as deixas:
    { "base": "../../out/sfx", "duration": 36, "cues": [ { "t": 0.35, "tipo": "impacto", "g": 0.9 } ] }

Só efeitos: nada de música (regra da casa). O pico sai em -6 dBFS para o HyperFrames normalizar.
"""
import json
import sys
import wave
from pathlib import Path

import numpy as np

SR = 48000

cues = json.load(open(sys.argv[1], encoding="utf-8"))
base = Path(sys.argv[1]).resolve().parent / cues["base"]
saida = sys.argv[2]
n = int(round(float(cues["duration"]) * SR))
mix = np.zeros((n, 2), dtype=np.float32)

for c in cues["cues"]:
    with wave.open(str(base / f'{c["tipo"]}.wav'), "rb") as w:
        assert w.getframerate() == SR and w.getnchannels() == 2, "sfx precisa ser 48 kHz estéreo"
        d = np.frombuffer(w.readframes(w.getnframes()), dtype="<i2").astype(np.float32).reshape(-1, 2) / 32768.0
    i = max(0, int(round(float(c["t"]) * SR)))
    fim = min(n, i + len(d))
    mix[i:fim] += d[: fim - i] * float(c.get("g", 1.0))

pico = float(np.max(np.abs(mix))) or 1.0
mix *= 0.5 / pico  # -6 dBFS
with wave.open(saida, "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes((mix * 32767).astype("<i2").tobytes())
print(saida)
