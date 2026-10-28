# Identidade Consultorias: "Planta"

Vale para as peças das Consultorias da Cerrado Finanças (`/consultorias`). A consultoria "desenha a arquitetura que
sustenta o crescimento" (frase do site), então a identidade é a planta técnica.

## A ideia

- **o papel vegetal:** off-white com grade fina a cada 30px, grade forte a cada 150px e a moldura da prancha;
- **o rodapé como carimbo de prancha** (`.rodape`): a marca, "Prancha 03/07" e a página, em células;
- **a cota** (`.cota`): a linha de dimensão laranja com o público no meio;
- **o organograma em traço** (`.organo`): o hub em cima e as áreas embaixo, na capa, no fecho e na story;
- **o corte antes/depois** (`.corte`): "antes" em blocos tracejados e tortos, "depois" ligado ao hub;
- **as entregas como pranchas** (`.entregas`), com marcas de canto;
- **as etapas** (`.etapas`, slide `.grafite`) e o **selo** "Diagnóstico gratuito" (`.selo`).

## Cores

| Papel | Cor | Uso |
|---|---|---|
| Vegetal | `#f3f0e8` | fundo, com grade grafite a 7% e 13% |
| Grafite | `#23262b` | texto, traço, hub, slide invertido (`.slide.grafite`) |
| Laranja de prancheta | `#e4570e` | o único destaque: palavra em itálico, cota, selo, botão |

## Tipografia

**Fraunces** 600 nos títulos, com o destaque em **itálico 400 laranja** (`*palavra*` no gerador).
**Instrument Sans** 400/600 no texto e **DM Mono** 400/500 nos rótulos, cotas e carimbo.
Arquivos em `brand/fontes/` (fontsource 5.3.0, subconjunto latin).

## Marca

A folinha + "Cerrado Finanças · Consultoria".

## Regras de conteúdo

- Só o que está em `consultorias.html` e na página do produto ligado.
- Os números do site (50+ projetos, R$ 2 bi assessorados, 12 anos, "até 40% de redução") ficam fora até o Renato
  confirmar que podem ir para anúncio.
- Lei do Bem: a peça diz que vale para empresas no Lucro Real.
- GovTech: tom institucional, Lei 14.133/2021 e LGPD, sem promessa de contratação.
- Chamada: "Agendar diagnóstico gratuito". O LinkedIn é a rede principal.

Gerador: `tools/gerar_consultorias.py`.
