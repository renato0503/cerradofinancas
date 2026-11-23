#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Kit local de vídeo do estúdio Cerrado. Sem API paga.

Subcomandos:
  sondar     metadados de um arquivo
  quadros    extrai quadros em tempos dados
  contato    folha de contato (contact sheet)
  cortar     corte preciso com reencode
  juntar     concatena clipes normalizando tamanho/fps/áudio
  enquadrar  adapta para 9x16, 4x5, 1x1 ou 16x9 (corte ou fundo desfocado)
  legendar   transcreve com faster-whisper e gera SRT/ASS (opcional queimar)
  normalizar normaliza loudness para -14 LUFS
  sfx        sintetiza efeito sonoro (whoosh, pop, click, riser, impacto)
  analisar   cortes de cena, silêncios, pretos e loudness em JSON
  qa         confere entrega contra o formato alvo
  tts        voz local (Windows SAPI) ou edge-tts se instalado
  doctor     confere dependências, GPU, fontes e espaço
  projeto    cria a pasta da entrega com briefing/roteiro/storyboard
  demo       gera um clipe de teste de ponta a ponta
"""

import argparse
import importlib.metadata
import importlib.util
import json
import math
import os
import re
import shutil
import subprocess
import sys
import tempfile
import wave

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MARKETING = os.path.normpath(os.path.join(RAIZ, "..", "..", ".."))
FFMPEG = shutil.which("ffmpeg") or "ffmpeg"
FFPROBE = shutil.which("ffprobe") or "ffprobe"

FORMATOS = {
    "9x16": (1080, 1920),
    "4x5": (1080, 1350),
    "1x1": (1080, 1080),
    "16x9": (1920, 1080),
    "4x3": (1440, 1080),
}


def eprint(*a):
    print(*a, file=sys.stderr)


def rodar(cmd, cwd=None):
    p = subprocess.run(cmd, cwd=cwd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if p.returncode != 0:
        eprint("FALHOU:", " ".join(str(c) for c in cmd))
        eprint(p.stderr.decode("utf-8", "replace")[-4000:])
        raise SystemExit(p.returncode)
    return p.stdout.decode("utf-8", "replace"), p.stderr.decode("utf-8", "replace")


def sondar_arquivo(caminho):
    out, _ = rodar([FFPROBE, "-v", "error", "-print_format", "json", "-show_format", "-show_streams", caminho])
    d = json.loads(out)
    v = next((s for s in d.get("streams", []) if s.get("codec_type") == "video"), {})
    a = next((s for s in d.get("streams", []) if s.get("codec_type") == "audio"), {})
    num, den = (v.get("r_frame_rate") or "0/1").split("/")
    fps = round(float(num) / float(den), 3) if float(den) else 0
    dur = d.get("format", {}).get("duration")
    return {
        "arquivo": os.path.abspath(caminho),
        "duracao": round(float(dur), 3) if dur else None,
        "largura": v.get("width"),
        "altura": v.get("height"),
        "fps": fps,
        "codec_video": v.get("codec_name"),
        "pix_fmt": v.get("pix_fmt"),
        "codec_audio": a.get("codec_name"),
        "canais": a.get("channels"),
        "sample_rate": a.get("sample_rate"),
        "bitrate_kbps": round(int(d.get("format", {}).get("bit_rate", 0)) / 1000, 1) if d.get("format", {}).get("bit_rate") else None,
        "tamanho_mb": round(int(d.get("format", {}).get("size", 0)) / 1048576, 2) if d.get("format", {}).get("size") else None,
        "tem_audio": bool(a),
        "tem_video": bool(v),
    }


def cmd_sondar(args):
    print(json.dumps(sondar_arquivo(args.arquivo), ensure_ascii=False, indent=2))


def cmd_quadros(args):
    os.makedirs(args.saida, exist_ok=True)
    tempos = [float(t.strip()) for t in args.tempos.split(",") if t.strip()]
    for i, t in enumerate(tempos, 1):
        destino = os.path.join(args.saida, "q-%02d-%05.2fs.png" % (i, t))
        cmd = [FFMPEG, "-hide_banner", "-loglevel", "error", "-ss", str(t), "-i", args.arquivo, "-frames:v", "1"]
        if args.largura:
            cmd += ["-vf", "scale=%d:-2" % args.largura]
        cmd += ["-y", destino]
        rodar(cmd)
        print(destino)


def cmd_contato(args):
    linhas = args.linhas
    colunas = args.colunas
    cada = args.cada
    if not cada:
        info = sondar_arquivo(args.arquivo)
        total = max(1, (info["duracao"] or 1) / (linhas * colunas))
        cada = total
    filtro = "fps=1/%.3f,scale=%d:-2,tile=%dx%d" % (cada, args.largura, colunas, linhas)
    rodar([FFMPEG, "-hide_banner", "-loglevel", "error", "-i", args.arquivo, "-vf", filtro,
           "-frames:v", "1", "-q:v", "3", "-y", args.saida])
    print(os.path.abspath(args.saida))


def cmd_cortar(args):
    cmd = [FFMPEG, "-hide_banner", "-loglevel", "error", "-ss", str(args.de), "-i", args.arquivo]
    if args.ate is not None:
        cmd += ["-t", str(round(args.ate - args.de, 3))]
    cmd += ["-c:v", "libx264", "-preset", "medium", "-crf", str(args.crf), "-pix_fmt", "yuv420p",
            "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", "-y", args.saida]
    rodar(cmd)
    print(os.path.abspath(args.saida))


def cmd_juntar(args):
    infos = [sondar_arquivo(f) for f in args.arquivos]
    w, h = FORMATOS.get(args.formato, (infos[0]["largura"] or 1920, infos[0]["altura"] or 1080))
    fps = args.fps
    partes_v, partes_a, comentarios = [], [], []
    for i, info in enumerate(infos):
        partes_v.append("[%d:v]scale=%d:%d:force_original_aspect_ratio=decrease,pad=%d:%d:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=%d,format=yuv420p[v%d]" % (i, w, h, w, h, fps, i))
        if info["tem_audio"]:
            partes_a.append("[%d:a]aresample=48000,aformat=channel_layouts=stereo,asetpts=PTS-STARTPTS[a%d]" % (i, i))
        else:
            dur = info["duracao"] or 1
            partes_a.append("anullsrc=channel_layout=stereo:sample_rate=48000,atrim=duration=%.3f,asetpts=PTS-STARTPTS[a%d]" % (dur, i))
    entradas = "".join("[v%d][a%d]" % (i, i) for i in range(len(infos)))
    filtro = ";".join(partes_v + partes_a) + ";" + entradas + "concat=n=%d:v=1:a=1[v][a]" % len(infos)
    cmd = [FFMPEG, "-hide_banner", "-loglevel", "error"]
    for f in args.arquivos:
        cmd += ["-i", f]
    cmd += ["-filter_complex", filtro, "-map", "[v]", "-map", "[a]", "-c:v", "libx264", "-preset", "medium",
            "-crf", str(args.crf), "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k",
            "-movflags", "+faststart", "-y", args.saida]
    rodar(cmd)
    print(os.path.abspath(args.saida))


def cmd_enquadrar(args):
    w, h = FORMATOS[args.formato]
    info = sondar_arquivo(args.arquivo)
    fps = args.fps or (info["fps"] if info["fps"] and info["fps"] >= 24 else 30)
    if args.modo == "corte":
        vf = "scale=%d:%d:force_original_aspect_ratio=increase,crop=%d:%d,setsar=1,fps=%s,format=yuv420p" % (w, h, w, h, fps)
        cmd = [FFMPEG, "-hide_banner", "-loglevel", "error", "-i", args.arquivo, "-vf", vf]
    else:
        filtro = (
            "[0:v]scale=%d:%d:force_original_aspect_ratio=increase,crop=%d:%d,gblur=sigma=30,eq=brightness=-0.10[bg];"
            "[0:v]scale=%d:%d:force_original_aspect_ratio=decrease[fg];"
            "[bg][fg]overlay=(W-w)/2:(H-h)/2,setsar=1,fps=%s,format=yuv420p[v]"
        ) % (w, h, w, h, w, h, fps)
        cmd = [FFMPEG, "-hide_banner", "-loglevel", "error", "-i", args.arquivo, "-filter_complex", filtro, "-map", "[v]"]
    if info["tem_audio"]:
        cmd += ["-map", "0:a", "-c:a", "aac", "-b:a", "192k"]
    else:
        cmd += ["-an"]
    cmd += ["-c:v", "libx264", "-preset", "medium", "-crf", str(args.crf), "-movflags", "+faststart", "-y", args.saida]
    rodar(cmd)
    print(json.dumps({"saida": os.path.abspath(args.saida), "formato": args.formato, "modo": args.modo}, ensure_ascii=False))


def srt_tempo(s):
    ms = int(round(s * 1000))
    h, ms = divmod(ms, 3600000)
    m, ms = divmod(ms, 60000)
    seg, ms = divmod(ms, 1000)
    return "%02d:%02d:%02d,%03d" % (h, m, seg, ms)


def ass_tempo(s):
    cs = int(round(s * 100))
    h, cs = divmod(cs, 360000)
    m, cs = divmod(cs, 6000)
    seg, cs = divmod(cs, 100)
    return "%d:%02d:%02d.%02d" % (h, m, seg, cs)


def escrever_srt(segmentos, caminho):
    with open(caminho, "w", encoding="utf-8", newline="\n") as f:
        for i, seg in enumerate(segmentos, 1):
            f.write("%d\n%s --> %s\n%s\n\n" % (i, srt_tempo(seg["inicio"]), srt_tempo(seg["fim"]), seg["texto"].strip()))


def escrever_ass(segmentos, caminho, largura, altura, karaoke=False):
    cab = """[Script Info]
ScriptType: v4.00+
PlayResX: %d
PlayResY: %d
WrapStyle: 0
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Padrao,Inter,58,&H00FFFFFF,&H0000D7FF,&H00101010,&H80000000,-1,0,0,0,100,100,0,0,1,3,1,2,120,120,%d,1
Style: Pequeno,Inter,40,&H00FFFFFF,&H0000D7FF,&H00101010,&H80000000,0,0,0,0,100,100,0,0,1,2,1,2,120,120,%d,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
""" % (largura, altura, int(altura * 0.10), int(altura * 0.07))
    linhas = []
    for seg in segmentos:
        if karaoke and seg.get("palavras"):
            partes = []
            for p in seg["palavras"]:
                cs = max(1, int(round((p["fim"] - p["inicio"]) * 100)))
                partes.append("{\\k%d}%s" % (cs, p["texto"]))
            texto = " ".join(partes)
        else:
            texto = seg["texto"].replace("\n", "\\N")
        linhas.append("Dialogue: 0,%s,%s,Padrao,,0,0,0,,%s" % (ass_tempo(seg["inicio"]), ass_tempo(seg["fim"]), texto))
    with open(caminho, "w", encoding="utf-8", newline="\n") as f:
        f.write(cab + "\n".join(linhas) + "\n")


def audio_16k(caminho):
    import numpy as np
    temp = tempfile.mkdtemp(prefix="audio-")
    pcm = os.path.join(temp, "audio.f32")
    rodar([FFMPEG, "-hide_banner", "-loglevel", "error", "-i", caminho, "-vn", "-ac", "1",
           "-ar", "16000", "-f", "f32le", "-y", pcm])
    dados = np.fromfile(pcm, dtype="<f4")
    shutil.rmtree(temp, ignore_errors=True)
    return dados


def cmd_legendar(args):
    try:
        from faster_whisper import WhisperModel
    except Exception:
        eprint("faster-whisper não instalado. Rode: python -m pip install faster-whisper")
        raise SystemExit(2)
    dispositivo = args.device
    tipo = "float16" if dispositivo == "cuda" else "int8"
    eprint("decodificando áudio com ffmpeg")
    amostras = audio_16k(args.arquivo)

    def transcrever(dev, ct):
        eprint("carregando modelo %s em %s (%s)" % (args.modelo, dev, ct))
        modelo = WhisperModel(args.modelo, device=dev, compute_type=ct)
        segs, inf = modelo.transcribe(
            amostras, language=args.idioma, vad_filter=True,
            word_timestamps=args.karaoke, beam_size=5,
            condition_on_previous_text=True,
        )
        return list(segs), inf

    try:
        brutos, info = transcrever(dispositivo, tipo)
    except RuntimeError as exc:
        if dispositivo != "cuda":
            raise
        eprint("CUDA indisponível (%s); refazendo na CPU" % str(exc).splitlines()[0])
        brutos, info = transcrever("cpu", "int8")
    segmentos = []
    for s in brutos:
        palavras = []
        if args.karaoke and s.words:
            for p in s.words:
                palavras.append({"inicio": float(p.start), "fim": float(p.end), "texto": p.word.strip()})
        segmentos.append({"inicio": float(s.start), "fim": float(s.end), "texto": s.text.strip(), "palavras": palavras})
    base = os.path.splitext(args.saida)[0]
    os.makedirs(os.path.dirname(os.path.abspath(base)) or ".", exist_ok=True)
    srt = base + ".srt"
    escrever_srt(segmentos, srt)
    print(srt)
    info_v = sondar_arquivo(args.arquivo)
    largura, altura = info_v["largura"] or 1080, info_v["altura"] or 1920
    ass = base + ".ass"
    escrever_ass(segmentos, ass, largura, altura, karaoke=args.karaoke)
    print(ass)
    if args.queimar:
        temp = tempfile.mkdtemp(prefix="legenda-")
        shutil.copy2(ass, os.path.join(temp, "legenda.ass"))
        destino = os.path.abspath(base + "-legenda.mp4")
        cmd = [FFMPEG, "-hide_banner", "-loglevel", "error", "-i", os.path.abspath(args.arquivo),
               "-vf", "ass=legenda.ass", "-c:v", "libx264", "-preset", "medium", "-crf", "18",
               "-pix_fmt", "yuv420p"]
        if info_v["tem_audio"]:
            cmd += ["-c:a", "aac", "-b:a", "192k"]
        else:
            cmd += ["-an"]
        cmd += ["-movflags", "+faststart", "-y", destino]
        rodar(cmd, cwd=temp)
        shutil.rmtree(temp, ignore_errors=True)
        print(destino)
    print(json.dumps({"segmentos": len(segmentos), "idioma": info.language, "duracao": round(info.duration, 2)}, ensure_ascii=False))


def cmd_normalizar(args):
    info = sondar_arquivo(args.arquivo)
    if not info["tem_audio"]:
        raise SystemExit("arquivo sem áudio")
    medicao = "loudnorm=I=%s:TP=-1.5:LRA=11:print_format=json" % args.lufs
    _, err = rodar([FFMPEG, "-hide_banner", "-i", args.arquivo, "-af", medicao, "-f", "null", "-"])
    blocos = re.findall(r"\{[^{}]*\"input_i\"[^{}]*\}", err, re.S)
    filtro = medicao.replace(":print_format=json", "")
    if blocos:
        try:
            m = json.loads(blocos[-1])
            filtro = (
                "loudnorm=I=%s:TP=-1.5:LRA=11:linear=true"
                ":measured_I=%s:measured_TP=%s:measured_LRA=%s:measured_thresh=%s:offset=%s"
            ) % (args.lufs, m["input_i"], m["input_tp"], m["input_lra"], m["input_thresh"], m.get("target_offset", "0.0"))
        except Exception:
            pass
    cmd = [FFMPEG, "-hide_banner", "-loglevel", "error", "-i", args.arquivo, "-af", filtro,
           "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-ac", "2",
           "-movflags", "+faststart", "-y", args.saida]
    rodar(cmd)
    print(os.path.abspath(args.saida))


def envelope(n, ataque, queda):
    a = max(1, int(n * ataque))
    q = max(1, n - a)
    return __import__("numpy").concatenate([
        __import__("numpy").linspace(0, 1, a),
        __import__("numpy").linspace(1, 0, q) ** 2,
    ])[:n]


def synth_sfx(tipo, dur, sr=48000):
    import numpy as np
    n = int(dur * sr)
    t = np.arange(n) / sr
    rng = np.random.default_rng(7)
    if tipo == "whoosh":
        ruido = rng.standard_normal(n)
        suave = np.convolve(ruido, np.ones(48) / 48, mode="same")
        env = np.sin(np.linspace(0, math.pi, n)) ** 2
        sinal = suave * env * 0.9
    elif tipo == "pop":
        f = np.linspace(260, 70, n)
        sinal = np.sin(2 * math.pi * np.cumsum(f) / sr) * envelope(n, 0.02, 0.98) * 0.9
    elif tipo == "click":
        sinal = rng.standard_normal(n) * np.exp(-np.linspace(0, 60, n)) * 0.8
        sinal += np.sin(2 * math.pi * 1400 * t) * np.exp(-np.linspace(0, 25, n)) * 0.5
    elif tipo == "riser":
        ruido = rng.standard_normal(n)
        corte = rng.standard_normal(n)
        crescente = np.linspace(0.05, 0.95, n)
        suave = np.zeros(n)
        acc = 0.0
        for i in range(n):
            acc = (1 - crescente[i]) * acc + crescente[i] * ruido[i]
            suave[i] = acc
        env = np.linspace(0, 1, n) ** 2
        sinal = suave * env * 0.8
    elif tipo == "impacto":
        f = np.linspace(90, 38, n)
        grave = np.sin(2 * math.pi * np.cumsum(f) / sr) * np.exp(-np.linspace(0, 9, n))
        estalo = rng.standard_normal(n) * np.exp(-np.linspace(0, 40, n)) * 0.35
        sinal = (grave * 0.9) + estalo
    else:
        raise SystemExit("tipo inválido: %s" % tipo)
    pico = max(1e-9, float(np.max(np.abs(sinal))))
    return np.clip(sinal / pico * 0.89, -1, 1)


def cmd_sfx(args):
    import numpy as np
    sinal = synth_sfx(args.tipo, args.duracao)
    est = np.column_stack([sinal, sinal])
    dados = (est * 32767).astype("<i2").tobytes()
    with wave.open(args.saida, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(48000)
        w.writeframes(dados)
    print(os.path.abspath(args.saida))


def cmd_analisar(args):
    info = sondar_arquivo(args.arquivo)
    _, err_cena = rodar([FFMPEG, "-hide_banner", "-i", args.arquivo,
                         "-vf", "select='gt(scene,0.35)',metadata=print", "-f", "null", "-"])
    cortes = sorted({round(float(x), 3) for x in re.findall(r"pts_time:([0-9.]+)", err_cena)})
    _, err_sil = rodar([FFMPEG, "-hide_banner", "-i", args.arquivo,
                        "-af", "silencedetect=n=-35dB:d=0.4", "-f", "null", "-"])
    silencios = [{"inicio": float(a), "fim": float(b)} for a, b in
                 re.findall(r"silence_start:\s*([0-9.]+).*?silence_end:\s*([0-9.]+)", err_sil, re.S)]
    _, err_preto = rodar([FFMPEG, "-hide_banner", "-i", args.arquivo,
                          "-vf", "blackdetect=d=0.2:pix_th=0.10", "-f", "null", "-"])
    pretos = [{"inicio": float(a), "fim": float(b)} for a, b in
              re.findall(r"black_start:([0-9.]+)\s+black_end:([0-9.]+)", err_preto)]
    loudness = {}
    if info["tem_audio"]:
        _, err_loud = rodar([FFMPEG, "-hide_banner", "-i", args.arquivo,
                             "-af", "loudnorm=I=-14:TP=-1.5:print_format=json", "-f", "null", "-"])
        blocos = re.findall(r"\{[^{}]*\"input_i\"[^{}]*\}", err_loud, re.S)
        if blocos:
            try:
                loudness = json.loads(blocos[-1])
            except Exception:
                loudness = {}
    resultado = {"info": info, "cortes_cena": cortes, "silencios": silencios,
                 "pretos": pretos, "loudness": loudness}
    texto = json.dumps(resultado, ensure_ascii=False, indent=2)
    if args.saida:
        with open(args.saida, "w", encoding="utf-8") as f:
            f.write(texto)
        print(os.path.abspath(args.saida))
    else:
        print(texto)


def cmd_qa(args):
    info = sondar_arquivo(args.arquivo)
    alvo = FORMATOS.get(args.formato)
    falhas, avisos = [], []
    if alvo:
        if (info["largura"], info["altura"]) != alvo:
            falhas.append("resolução %sx%s, esperado %dx%d" % (info["largura"], info["altura"], alvo[0], alvo[1]))
    if not info["tem_video"]:
        falhas.append("sem trilha de vídeo")
    if not info["tem_audio"] and not args.sem_audio:
        falhas.append("sem áudio")
    if args.sem_audio and info["tem_audio"]:
        avisos.append("tem áudio, mas --sem-audio foi pedido")
    if info["duracao"] and info["duracao"] > args.max:
        falhas.append("duração %.1fs acima do limite %.0fs" % (info["duracao"], args.max))
    if info["fps"] and info["fps"] < 24:
        avisos.append("fps baixo: %s" % info["fps"])
    loudness = {}
    if info["tem_audio"] and not args.sem_audio:
        _, err = rodar([FFMPEG, "-hide_banner", "-i", args.arquivo,
                        "-af", "loudnorm=I=-14:TP=-1.5:print_format=json", "-f", "null", "-"])
        blocos = re.findall(r"\{[^{}]*\"input_i\"[^{}]*\}", err, re.S)
        if blocos:
            try:
                loudness = json.loads(blocos[-1])
                lufs = float(loudness.get("input_i", "nan"))
                if not math.isnan(lufs) and abs(lufs - args.lufs) > 2:
                    falhas.append("loudness %.1f LUFS fora da meta %.1f ±2" % (lufs, args.lufs))
            except Exception:
                pass
    _, err_preto = rodar([FFMPEG, "-hide_banner", "-i", args.arquivo,
                          "-vf", "blackdetect=d=0.3:pix_th=0.10", "-f", "null", "-"])
    pretos = re.findall(r"black_start:([0-9.]+)\s+black_end:([0-9.]+)", err_preto)
    total_preto = sum(float(b) - float(a) for a, b in pretos)
    if total_preto > 0.5:
        falhas.append("preto por %.2fs" % total_preto)
    rel = {"arquivo": info["arquivo"], "formato": args.formato, "ok": not falhas,
           "falhas": falhas, "avisos": avisos, "info": info, "loudness": loudness}
    print(json.dumps(rel, ensure_ascii=False, indent=2))
    if falhas:
        raise SystemExit(1)


def cmd_tts(args):
    texto = args.texto
    if args.arquivo_texto:
        with open(args.arquivo_texto, encoding="utf-8") as f:
            texto = f.read()
    if not texto.strip():
        raise SystemExit("texto vazio")
    destino = os.path.abspath(args.saida)
    os.makedirs(os.path.dirname(destino) or ".", exist_ok=True)
    if args.edge:
        try:
            import edge_tts  # noqa: F401
            mp3 = destino + ".mp3"
            p = subprocess.run([sys.executable, "-m", "edge_tts", "--voice", args.voz_edge,
                                "--text", texto, "--write-media", mp3], capture_output=True)
            if p.returncode != 0:
                eprint(p.stderr.decode("utf-8", "replace"))
                raise SystemExit(p.returncode)
            rodar([FFMPEG, "-hide_banner", "-loglevel", "error", "-i", mp3, "-ar", "48000",
                   "-ac", "2", "-y", destino])
            os.remove(mp3)
            print(destino)
            return
        except ImportError:
            eprint("edge-tts não instalado; usando SAPI local. Para instalar: python -m pip install edge-tts")
    temp = tempfile.mkdtemp(prefix="tts-")
    txt = os.path.join(temp, "texto.txt")
    with open(txt, "w", encoding="utf-8") as f:
        f.write(texto)
    ps = (
        "Add-Type -AssemblyName System.Speech;"
        "$s = New-Object System.Speech.Synthesis.SpeechSynthesizer;"
        "$s.SelectVoice('%s');"
        "$s.Rate = %d;"
        "$s.SetOutputToWaveFile('%s');"
        "$t = Get-Content -LiteralPath '%s' -Raw -Encoding UTF8;"
        "$s.Speak($t);"
        "$s.Dispose();"
    ) % (args.voz, args.velocidade, destino, txt)
    p = subprocess.run(["powershell", "-NoProfile", "-Command", ps], capture_output=True)
    shutil.rmtree(temp, ignore_errors=True)
    if p.returncode != 0:
        eprint(p.stderr.decode("utf-8", "replace"))
        raise SystemExit(p.returncode)
    print(destino)


def _tem_modulo(nome):
    return importlib.util.find_spec(nome) is not None


def _versao_modulo(nome):
    try:
        return importlib.metadata.version(nome)
    except Exception:
        return "?"


def cmd_doctor(args):
    checks = []

    def add(item, ok, detalhe, critico=False):
        checks.append({"item": item, "ok": bool(ok), "detalhe": detalhe, "critico": critico})

    ff = shutil.which("ffmpeg")
    detalhe_ff = "não encontrado"
    enc = b""
    if ff:
        p = subprocess.run([FFMPEG, "-version"], capture_output=True)
        linhas = p.stdout.decode("utf-8", "replace").splitlines()
        detalhe_ff = linhas[0] if linhas else "instalado"
        e = subprocess.run([FFMPEG, "-hide_banner", "-encoders"], capture_output=True)
        enc = e.stdout + e.stderr
    add("ffmpeg", bool(ff), detalhe_ff, True)
    add("ffprobe", bool(shutil.which("ffprobe")), "ok" if shutil.which("ffprobe") else "não encontrado", True)
    add("encoder libx264", b"libx264" in enc, "ok" if b"libx264" in enc else "ausente")
    add("encoder aac", b"aac" in enc, "ok" if b"aac" in enc else "ausente")
    add("python", True, sys.version.split()[0], True)
    add("numpy", _tem_modulo("numpy"), _versao_modulo("numpy") if _tem_modulo("numpy") else "não instalado", True)
    add("faster-whisper", _tem_modulo("faster_whisper"), _versao_modulo("faster-whisper") if _tem_modulo("faster_whisper") else "não instalado")
    add("Pillow", _tem_modulo("PIL"), _versao_modulo("pillow") if _tem_modulo("PIL") else "não instalado")
    add("Playwright", _tem_modulo("playwright"), _versao_modulo("playwright") if _tem_modulo("playwright") else "não instalado")
    node = shutil.which("node")
    add("node", bool(node), subprocess.run([node, "-v"], capture_output=True, text=True).stdout.strip() if node else "não encontrado")
    npm = shutil.which("npm")
    add("npm", bool(npm), subprocess.run([npm, "-v"], capture_output=True, text=True, shell=True).stdout.strip() if npm else "não encontrado")
    hf = os.path.join(MARKETING, "filmes", "node_modules", "hyperframes", "package.json")
    versao_hf = ""
    if os.path.exists(hf):
        try:
            versao_hf = json.load(open(hf, encoding="utf-8")).get("version", "")
        except Exception:
            versao_hf = ""
    add("HyperFrames (filmes/)", bool(versao_hf), versao_hf or "rode npm ci em marketing/filmes")
    ps = (
        "Add-Type -AssemblyName System.Speech;"
        "(New-Object System.Speech.Synthesis.SpeechSynthesizer).GetInstalledVoices() | "
        "ForEach-Object { $_.VoiceInfo.Name + '|' + $_.VoiceInfo.Culture }"
    )
    p = subprocess.run(["powershell", "-NoProfile", "-Command", ps], capture_output=True)
    vozes = [l.strip() for l in p.stdout.decode("utf-8", "replace").splitlines() if l.strip()]
    pt = [v for v in vozes if "pt-BR" in v]
    add("voz pt-BR (SAPI)", bool(pt), "; ".join(pt) if pt else "nenhuma voz pt-BR instalada", True)
    gpu = shutil.which("nvidia-smi")
    detalhe_gpu = "não encontrada"
    if gpu:
        g = subprocess.run([gpu, "--query-gpu=name,memory.total", "--format=csv,noheader"], capture_output=True)
        detalhe_gpu = g.stdout.decode("utf-8", "replace").strip() or "nvidia-smi sem resposta"
    add("GPU NVIDIA", bool(gpu), detalhe_gpu)
    cands = [r"D:\Dev\ComfyUI", os.path.expanduser("~/ComfyUI")]
    comfy = next((c for c in cands if os.path.isdir(c)), "")
    add("ComfyUI (opcional)", bool(comfy), comfy or "não instalado")
    uso = shutil.disk_usage(MARKETING)
    livre = round(uso.free / 1073741824, 1)
    add("espaço em disco", livre >= 2, "%s GB livres" % livre, True)
    cache = os.path.expanduser("~/.cache/huggingface/hub")
    modelos = []
    if os.path.isdir(cache):
        modelos = [d for d in os.listdir(cache) if "faster-whisper" in d]
    add("modelo whisper em cache", bool(modelos), ", ".join(modelos) if modelos else "baixa no primeiro uso")
    falhas = [c for c in checks if c["critico"] and not c["ok"]]
    avisos = [c for c in checks if not c["critico"] and not c["ok"]]
    rel = {"ok": not falhas, "marketing": MARKETING, "falhas": len(falhas), "avisos": len(avisos), "checks": checks}
    if args.json:
        print(json.dumps(rel, ensure_ascii=False, indent=2))
    else:
        for c in checks:
            marca = "ok  " if c["ok"] else ("FALHA" if c["critico"] else "aviso")
            print("[%s] %-26s %s" % (marca, c["item"], c["detalhe"]))
        print("\n%d falha(s), %d aviso(s)" % (len(falhas), len(avisos)))
    if falhas:
        raise SystemExit(1)


def cmd_projeto(args):
    raiz = os.path.abspath(args.raiz) if args.raiz else MARKETING
    slug = re.sub(r"[^a-z0-9-]+", "-", args.nome.lower()).strip("-")
    if not slug:
        raise SystemExit("nome inválido")
    posts = os.path.join(raiz, "conteudo", slug)
    entregas = os.path.join(raiz, "entregas", slug)
    os.makedirs(posts, exist_ok=True)
    os.makedirs(os.path.join(entregas, "qa"), exist_ok=True)
    frente = args.frente
    briefing = """# Briefing — %s

| campo | valor |
|---|---|
| Frente | %s |
| Objetivo | %s |
| Público | %s |
| Peça | %s |
| Duração | %s |
| CTA | %s |
| Restrições | %s |

## Decisões

- Formato de entrega:
- Legenda:
- Áudio:
- Referência:
""" % (slug, frente, args.objetivo, args.publico, args.formato, args.duracao, args.cta, args.restricoes)
    roteiro = """# Roteiro — %s

| cena | tempo | texto na tela | locução | intenção |
|---|---|---|---|---|
| 1 | 0,0–2,0 |  |  | gancho |
| 2 | 2,0–6,0 |  |  | problema |
| 3 | 6,0–12,0 |  |  | solução |
| 4 | 12,0–18,0 |  |  | prova |
| 5 | 18,0–21,0 |  |  | CTA |

## Ganchos testados

1.
2.
3.
""" % slug
    storyboard = """# Storyboard — %s

| # | tempo | plano | câmera | texto | áudio | asset |
|---|---|---|---|---|---|---|
| 1 | 0,0–2,0 |  | push in |  | whoosh |  |
| 2 | 2,0–6,0 |  | slide lateral |  | voz |  |
| 3 | 6,0–12,0 |  | máscara |  | voz |  |
| 4 | 12,0–18,0 |  | contínuo |  | pop |  |
| 5 | 18,0–21,0 |  | cortina |  | impacto |  |

## Prova de movimento

- [ ] quadro 1
- [ ] quadro 2
- [ ] quadro 3
""" % slug
    legenda = """%s

# hashtags

# CTA
""" % slug
    arquivos = {
        "briefing.md": briefing,
        "roteiro.md": roteiro,
        "storyboard.md": storyboard,
        "legenda.txt": legenda,
    }
    criados, existentes = [], []
    for nome_arq, texto in arquivos.items():
        destino = os.path.join(posts, nome_arq)
        if os.path.exists(destino) and not args.forcar:
            existentes.append(destino)
            continue
        with open(destino, "w", encoding="utf-8", newline="\n") as f:
            f.write(texto)
        criados.append(destino)
    rel = {
        "nome": slug,
        "conteudo": posts,
        "entregas": entregas,
        "criados": criados,
        "existentes": existentes,
        "proximo": [
            "preencher conteudo/%s/briefing.md" % slug,
            "python tools/video.py demo",
            "python tools/video.py doctor",
        ],
    }
    if args.json:
        print(json.dumps(rel, ensure_ascii=False, indent=2))
    else:
        print("projeto: %s" % slug)
        print("fonte:   %s" % posts)
        print("entrega: %s" % entregas)
        for c in criados:
            print("criado:  %s" % c)
        for c in existentes:
            print("mantido: %s" % c)


def _rodar_kit(*args):
    cmd = [sys.executable, os.path.abspath(__file__)] + list(args)
    p = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace")
    if p.returncode != 0:
        eprint(p.stdout)
        eprint(p.stderr)
        raise SystemExit(p.returncode)
    return p.stdout


def cmd_demo(args):
    base = os.path.abspath(args.saida) if args.saida else os.path.join(MARKETING, ".cache", "video-demo")
    os.makedirs(base, exist_ok=True)
    voz = os.path.join(base, "voz.wav")
    pop = os.path.join(base, "pop.wav")
    whoosh = os.path.join(base, "whoosh.wav")
    bruto = os.path.join(base, "bruto.mp4")
    final = os.path.join(base, "demo-9x16.mp4")
    _rodar_kit("tts", "--texto", args.texto, "--saida", voz)
    _rodar_kit("sfx", "--tipo", "pop", "--saida", pop)
    _rodar_kit("sfx", "--tipo", "whoosh", "--saida", whoosh)
    dur = (sondar_arquivo(voz)["duracao"] or 3.0) + 1.0
    filtro = (
        "[1:a]aformat=channel_layouts=stereo,volume=1.0[v];"
        "[2:a]aformat=channel_layouts=stereo,adelay=300|300,volume=0.32[p];"
        "[3:a]aformat=channel_layouts=stereo,adelay=1500|1500,volume=0.24[w];"
        "[v][p][w]amix=inputs=3:duration=longest:normalize=0[a]"
    )
    rodar([FFMPEG, "-hide_banner", "-loglevel", "error",
           "-f", "lavfi", "-i", "color=c=0x001f5c:s=1080x1920:d=%.3f:r=30" % dur,
           "-i", voz, "-i", pop, "-i", whoosh,
           "-filter_complex", filtro, "-map", "0:v", "-map", "[a]",
           "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
           "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-ac", "2", "-shortest", "-y", bruto])
    entrada = bruto
    if not args.sem_legenda:
        _rodar_kit("legendar", bruto, "--modelo", args.modelo, "--saida", os.path.join(base, "legenda"), "--queimar")
        entrada = os.path.join(base, "legenda-legenda.mp4")
    _rodar_kit("normalizar", entrada, "--saida", final)
    qa_txt = _rodar_kit("qa", final, "--formato", "9x16")
    try:
        qa = json.loads(qa_txt)
    except Exception:
        qa = {"ok": None, "bruto": qa_txt}
    rel = {"ok": qa.get("ok"), "saida": final, "bruto": bruto, "qa": qa}
    print(json.dumps(rel, ensure_ascii=False, indent=2))
    if qa.get("ok") is False:
        raise SystemExit(1)


def main():
    p = argparse.ArgumentParser(description="Kit local de vídeo (sem API paga)")
    sub = p.add_subparsers(dest="cmd", required=True)

    s = sub.add_parser("sondar"); s.add_argument("arquivo"); s.set_defaults(f=cmd_sondar)

    s = sub.add_parser("quadros"); s.add_argument("arquivo"); s.add_argument("--tempos", required=True)
    s.add_argument("--saida", required=True); s.add_argument("--largura", type=int); s.set_defaults(f=cmd_quadros)

    s = sub.add_parser("contato"); s.add_argument("arquivo"); s.add_argument("--saida", required=True)
    s.add_argument("--cada", type=float); s.add_argument("--linhas", type=int, default=3)
    s.add_argument("--colunas", type=int, default=5); s.add_argument("--largura", type=int, default=360)
    s.set_defaults(f=cmd_contato)

    s = sub.add_parser("cortar"); s.add_argument("arquivo"); s.add_argument("--de", type=float, default=0)
    s.add_argument("--ate", type=float); s.add_argument("--saida", required=True)
    s.add_argument("--crf", type=int, default=18); s.set_defaults(f=cmd_cortar)

    s = sub.add_parser("juntar"); s.add_argument("arquivos", nargs="+"); s.add_argument("--saida", required=True)
    s.add_argument("--formato", choices=list(FORMATOS), default="16x9"); s.add_argument("--fps", type=int, default=30)
    s.add_argument("--crf", type=int, default=18); s.set_defaults(f=cmd_juntar)

    s = sub.add_parser("enquadrar"); s.add_argument("arquivo"); s.add_argument("--formato", choices=list(FORMATOS), required=True)
    s.add_argument("--modo", choices=["corte", "fundo"], default="corte"); s.add_argument("--saida", required=True)
    s.add_argument("--fps", type=int); s.add_argument("--crf", type=int, default=18); s.set_defaults(f=cmd_enquadrar)

    s = sub.add_parser("legendar"); s.add_argument("arquivo"); s.add_argument("--saida", required=True)
    s.add_argument("--modelo", default="small"); s.add_argument("--idioma", default="pt")
    s.add_argument("--device", choices=["cpu", "cuda"], default="cpu")
    s.add_argument("--karaoke", action="store_true"); s.add_argument("--queimar", action="store_true")
    s.set_defaults(f=cmd_legendar)

    s = sub.add_parser("normalizar"); s.add_argument("arquivo"); s.add_argument("--saida", required=True)
    s.add_argument("--lufs", default="-14"); s.set_defaults(f=cmd_normalizar)

    s = sub.add_parser("sfx"); s.add_argument("--tipo", choices=["whoosh", "pop", "click", "riser", "impacto"], required=True)
    s.add_argument("--duracao", type=float, default=0.6); s.add_argument("--saida", required=True); s.set_defaults(f=cmd_sfx)

    s = sub.add_parser("analisar"); s.add_argument("arquivo"); s.add_argument("--saida"); s.set_defaults(f=cmd_analisar)

    s = sub.add_parser("qa"); s.add_argument("arquivo"); s.add_argument("--formato", choices=list(FORMATOS), default="9x16")
    s.add_argument("--lufs", type=float, default=-14); s.add_argument("--max", type=float, default=90)
    s.add_argument("--sem-audio", action="store_true"); s.set_defaults(f=cmd_qa)

    s = sub.add_parser("tts"); s.add_argument("--texto", default=""); s.add_argument("--arquivo-texto")
    s.add_argument("--voz", default="Microsoft Maria Desktop"); s.add_argument("--voz-edge", default="pt-BR-FranciscaNeural")
    s.add_argument("--velocidade", type=int, default=0); s.add_argument("--edge", action="store_true")
    s.add_argument("--saida", required=True); s.set_defaults(f=cmd_tts)

    s = sub.add_parser("doctor"); s.add_argument("--json", action="store_true"); s.set_defaults(f=cmd_doctor)

    s = sub.add_parser("projeto"); s.add_argument("nome"); s.add_argument("--frente", default="institucional")
    s.add_argument("--objetivo", default=""); s.add_argument("--publico", default="")
    s.add_argument("--formato", default="9x16"); s.add_argument("--duracao", default="21s")
    s.add_argument("--cta", default=""); s.add_argument("--restricoes", default="")
    s.add_argument("--raiz"); s.add_argument("--forcar", action="store_true"); s.add_argument("--json", action="store_true")
    s.set_defaults(f=cmd_projeto)

    s = sub.add_parser("demo"); s.add_argument("--saida"); s.add_argument("--modelo", default="tiny")
    s.add_argument("--sem-legenda", action="store_true")
    s.add_argument("--texto", default="Demonstração do kit de vídeo do Cerrado. Sem API paga.")
    s.set_defaults(f=cmd_demo)

    args = p.parse_args()
    args.f(args)


if __name__ == "__main__":
    main()
