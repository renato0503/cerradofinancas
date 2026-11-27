# Estúdio da nova /fabrica

Uso interno (no `exclude` do `_config.yml`). Plano completo em `PLANO-FABRICA.md`.

## Arquivos

- `assets/fabrica/base.js`: materiais reais, caixas arredondadas, telas e etiquetas em canvas, utilidades de tempo.
- `assets/fabrica/telas.js`: as interfaces desenhadas nas telas.
  - ERP (com os módulos do "Monte o seu sistema").
  - Estoque.
  - CRM.
  - Cerra.AI.
  - Maquininha.
  - Painel executivo.
  - GovDash.
  - Terminal de segurança.
  - Prancheta.
- `assets/fabrica/palco.js`: o palco 3D. Tem um canvas, luz de estúdio, sombra e os níveis `completo`, `leve` e `estatico`.
- `assets/fabrica/objetos/*.js`: um objeto por arquivo, em tamanho real (metros).
  - Cada arquivo exporta `{ id, nome, servico, vista, criar() }`.
  - `criar()` devolve `{ grupo, desenhar(p, t) }`.
  - `p` (0 → 1) é o progresso da animação. É função pura, igual aos filmes HyperFrames.
  - `t` é o tempo, usado só para LEDs piscando.

| Objeto | Serviço |
|---|---|
| notebook | abertura e ERP |
| estoque | ERP: estoque e fiscal |
| celular | CRM |
| servidor | IA offline |
| maquininha | e-commerce e PDV |
| auditoria | compliance |
| monitor | dashboards |
| cyber | cyber security |
| switch | integrações |
| prancheta | como trabalhamos |

## Ver e capturar

O mostruário precisa de servidor local por causa dos módulos ES:

```
python -m http.server 8080          # na raiz do worktree
# abrir http://localhost:8080/fabrica-estudio/mostruario.html
```

Para gerar a prancha e os vídeos de giro:

```
python fabrica-estudio/capturar.py              # todos: out/prancha.png + out/giro-<id>.mp4
python fabrica-estudio/capturar.py servidor --so-prancha
```

A captura força a GPU NVIDIA.

Regra: texto escrito no 3D sempre inteiro. Use `txtCabe`, que encolhe o texto até ele caber.
