# ffmpeg — comandos prontos

## Inspecionar

```bash
ffprobe -v error -show_entries format=duration,size:stream=codec_name,width,height,r_frame_rate -of json entrada.mp4
```

## Cortar

```bash
ffmpeg -ss 1.2 -i entrada.mp4 -t 7.3 -c:v libx264 -crf 18 -c:a aac -b:a 192k -movflags +faststart corte.mp4
```

Corte sem reencode (só em keyframe):

```bash
ffmpeg -ss 1.2 -i entrada.mp4 -t 7.3 -c copy corte.mp4
```

## Concatenar

```bash
ffmpeg -i a.mp4 -i b.mp4 -filter_complex \
"[0:v]scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30[v0];\
 [1:v]scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30[v1];\
 [0:a]aresample=48000[a0];[1:a]aresample=48000[a1];\
 [v0][a0][v1][a1]concat=n=2:v=1:a=1[v][a]" -map "[v]" -map "[a]" -c:v libx264 -crf 18 -c:a aac saida.mp4
```

## Vertical (9:16)

Encher o quadro:

```bash
ffmpeg -i entrada.mp4 -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1" -c:v libx264 -crf 18 -c:a copy vertical.mp4
```

Fundo desfocado:

```bash
ffmpeg -i entrada.mp4 -filter_complex \
"[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,gblur=sigma=30,eq=brightness=-0.10[bg];\
 [0:v]scale=1080:1920:force_original_aspect_ratio=decrease[fg];\
 [bg][fg]overlay=(W-w)/2:(H-h)/2[v]" -map "[v]" -map 0:a -c:v libx264 -crf 18 -c:a aac vertical.mp4
```

## Quadrado e 4:5

```bash
ffmpeg -i entrada.mp4 -vf "scale=1080:1080:force_original_aspect_ratio=increase,crop=1080:1080" -c:v libx264 -crf 18 -c:a copy quadrado.mp4
ffmpeg -i entrada.mp4 -vf "scale=1080:1350:force_original_aspect_ratio=increase,crop=1080:1350" -c:v libx264 -crf 18 -c:a copy feed.mp4
```

## Transição

```bash
ffmpeg -i a.mp4 -i b.mp4 -filter_complex \
"[0:v][1:v]xfade=transition=fade:duration=0.4:offset=4.6[v];[0:a][1:a]acrossfade=d=0.4[a]" \
-map "[v]" -map "[a]" -c:v libx264 -crf 18 -c:a aac transicao.mp4
```

Tipos: `fade`, `wipeleft`, `wiperight`, `slideleft`, `circleopen`, `pixelize`.

## Velocidade

```bash
ffmpeg -i entrada.mp4 -filter_complex "[0:v]setpts=0.5*PTS[v];[0:a]atempo=2.0[a]" -map "[v]" -map "[a]" rapido.mp4
ffmpeg -i entrada.mp4 -filter_complex "[0:v]setpts=2.0*PTS[v];[0:a]atempo=0.5[a]" -map "[v]" -map "[a]" lento.mp4
```

## Remover silêncio

```bash
ffmpeg -i voz.wav -af "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.2" voz-limpa.wav
```

## Overlay

```bash
ffmpeg -i base.mp4 -i logo.png -filter_complex "[0:v][1:v]overlay=W-w-40:40" -c:a copy com-logo.mp4
```

## Legenda

```bash
ffmpeg -i entrada.mp4 -vf "ass=legenda.ass" -c:v libx264 -crf 18 -c:a aac final.mp4
```

No Windows, rode com o `.ass` no diretório atual para evitar escape de caminho.

## Comprimir

```bash
ffmpeg -i entrada.mp4 -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k -movflags +faststart leve.mp4
```

## Proxy

```bash
ffmpeg -i entrada.mp4 -vf scale=960:-2 -c:v libx264 -crf 28 -preset veryfast -an proxy.mp4
```

## Extrair áudio / remover áudio

```bash
ffmpeg -i entrada.mp4 -vn -c:a pcm_s16le audio.wav
ffmpeg -i entrada.mp4 -an -c:v copy mudo.mp4
```

## Contato

```bash
ffmpeg -i entrada.mp4 -vf "fps=1/2,scale=320:-2,tile=4x3" -frames:v 1 contato.jpg
```
