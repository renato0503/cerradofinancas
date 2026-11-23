# Mix — cadeia e correções

## Ordem

1. **Limpar voz**: corte silêncio inicial/final, remover respiro forte, nivelar.
2. **SFX**: alinhar no frame do evento; cortar ataque se competir com a voz.
3. **Música** (se houver): baixar para -26 a -22 LUFS.
4. **Ducking**: música cai 6–10 dB quando a voz entra.
5. **Master**: `loudnorm` para -14 LUFS, TP -1,5.

## ffmpeg útil

Normalizar o arquivo final:

```bash
ffmpeg -i filme.mp4 -af "loudnorm=I=-14:TP=-1.5:LRA=11" -c:v copy -c:a aac -b:a 192k -movflags +faststart filme-final.mp4
```

Medir loudness sem alterar:

```bash
ffmpeg -i filme.mp4 -af "loudnorm=I=-14:TP=-1.5:print_format=json" -f null -
```

Juntar voz e SFX com volumes diferentes:

```bash
ffmpeg -i voz.wav -i whoosh.wav -filter_complex "[0:a]volume=1.0[v];[1:a]volume=0.22[s];[v][s]amix=inputs=2:duration=longest:normalize=0[a]" -map "[a]" mix.wav
```

Ducking simples por volume (sem sidechain):

```bash
ffmpeg -i musica.wav -i voz.wav -filter_complex "[0:a]volume=0.18[m];[m][1:a]sidechaincompress=threshold=0.04:ratio=6:attack=20:release=400[a]" -map "[a]" mix.wav
```

## Diagnóstico

| Sintoma | Correção |
|---|---|
| voz abafada | cortar abaixo de 90 Hz; realce suave em 3 kHz |
| voz estridente | de-esser ou corte em 6–8 kHz |
| SFX estoura | reduzir 6 dB e normalizar de novo |
| música cobre a voz | baixar 4 dB e ativar ducking |
| final baixo | loudnorm; conferir se o pico não limita |
| bom no fone, ruim no celular | testar em mono e em volume 50% |

## Regras

- Não use compressor pesado em locução sintética; ela já é uniforme.
- Não normalize cada arquivo isolado; normalize o mix final.
- Deixe 0,3 s de silêncio no começo e 0,5 s no fim.
- Se o vídeo é mudo de propósito, não invente áudio ruim para "preencher".
