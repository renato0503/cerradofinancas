# Estilo de legenda

## Preset padrão do kit

- Fonte: Inter (embutida quando possível).
- Corpo: 58 px em 1920 de altura (9:16).
- Peso: 700; contorno 3 px em `#101010`; sombra 1 px.
- Alinhamento: centro, margem inferior de 10% da altura.
- Máximo: 2 linhas.

## Presets por contexto

| Contexto | Corpo | Cor | Fundo | Uso |
|---|---|---|---|---|
| Reel/TikTok | 58–64 px | branco | contorno | padrão |
| Institucional | 46–52 px | branco | faixa azul `#001f5c` 70% | tech/contabilidade |
| Crédito | 50 px | branco | faixa `#00458b` | aviso legal legível |
| CerraClass | 56 px | branco | faixa amarela `#fecb00` com texto azul | cursos |
| CerraFood | 54 px | branco | faixa verde `#0f2a16` | restaurante |
| Guia Acadêmico | 52 px | azul | papel `#f7f1e3` | periódico |

## Área segura

- 9:16 1080×1920: laterais 120 px, topo 220 px, base 220 px.
- 4:5 1080×1350: laterais 90 px, topo 140 px, base 160 px.
- 16:9 1920×1080: laterais 160 px, base 120 px.
- Não coloque legenda atrás de botão, nome de usuário ou barra de progresso.

## Correções comuns

- **Duas linhas longas**: quebre no sentido, não no meio de "Cerra.AI".
- **Legenda adiantada**: aumente o início em 0,1–0,2 s.
- **Legenda atrasada**: reduza o fim; nunca acelere a fala.
- **Nome próprio errado**: ajuste no SRT/ASS, não no whisper.
- **Texto ilegível sobre claro**: contorno mais grosso ou faixa.

## ASS manual

O kit gera o `.ass` com os estilos `Padrao` e `Pequeno`. Para editar:

```
Style: Destaque,Inter,64,&H00FFFFFF,&H00FECB00,&H00101010,&H80000000,-1,0,0,0,100,100,0,0,1,3,1,2,120,120,190,1
Dialogue: 0,0:00:02.00,0:00:04.00,Destaque,,0,0,0,,{\k30}Seu {\k45}ERP
```

As cores no ASS são `&HAABBGGRR` (azul e vermelho invertidos em relação ao hex).
