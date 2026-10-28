# Identidade CerraClass: "Sábado de sala"

Vale para todas as peças da CerraClass e dos cursos (carrosséis, stories, vídeos). Cerrado Tech e
Cerrado Finanças continuam com a identidade do site (azul e dourado, `brand/tokens.css`).

## A ideia

Cursos presenciais, práticos, em turma pequena, em Cuiabá. A identidade sai daí:

- **as 10 cadeiras da turma** (`.assentos`): a turma é de até 10 alunos;
- **a régua do dia de aula** (`.regua`): 08:00 – 17:00 no sábado, ou os 4 encontros da imersão;
- **o ingresso** (`.ticket`): o que você leva para casa;
- **a etiqueta adesiva** (`.etiqueta`): rótulo de cada slide, levemente torto, com sombra chapada.

## Cores

Cada curso tem **um fundo próprio**, uma cor viva do cerrado. A tinta é sempre quase-preta `#141414`;
branco só nas etiquetas, no ticket e no selo da logo.

| Curso | Fundo |
|---|---|
| CerraClass (geral), IA na Gestão | `#ffc83d` amarelo-ipê |
| Excel com IA | `#4cc274` |
| Consultoria Contábil com IA | `#7cc4f0` |
| Consultoria Financeira com IA | `#ff9f2e` |
| Introdução à Análise de Dados | `#b9a3ff` |
| Processos Empresariais BPMN com IA | `#f2684f` |
| Introdução à Automação com IA | `#cbe847` |
| Ciência de Dados Aplicada | `#3fcfbf` |
| IA na Farma (farmácias e drogarias) | `#ff8fb8` |
| BI e Dashboards com IA | `#8fa6ff` |
| Prototipação de Apps com IA | `#ff7a5c` |
| IA na Prática | `#9ad65a` |
| IA em Ação Farma (propagandistas) | `#e7a0f0` |

A tabela dos 11 cursos do catálogo vive em `VISUAL` (`tools/gerar_cursos_cerraclass.py`); o vídeo lê de lá.
Um slide por carrossel usa o inverso (`.slide.tinta`: fundo preto, texto na cor do curso).

## Tipografia

**Bricolage Grotesque**: condensada (largura 78%), peso 800, **caixa alta** nos títulos; peso 500-700
no texto. Arquivo em `brand/fontes/bricolage.woff2`.

## Logo

A logo da CerraClass (`brand/cerraclass/logo.png`, recortada de `CerraClass/public/cerraclass_semfundo.png`)
vai sempre dentro de um **selo branco redondo** (`.selo`), porque os fundos são coloridos.

## Regras de conteúdo

Turma de **até 10 alunos**. Sem preço e sem data nas peças. Citação só a real do Renato.

## Vídeos

`filmes/cerraclass-curso` (15s por curso, modelo com variáveis) e `filmes/cerraclass-lancamento`
(30s, estilo App Store, com as telas do catálogo no iPhone).
