# Identidade Cerrado Contabilidade: "Partida dobrada"

Vale para as peças da Cerrado Contabilidade. Para não se confundir com o resto da Cerrado Finanças
(azul e dourado), a contabilidade usa o material do próprio ofício: o livro-razão.

## A ideia

- **o papel do livro-razão**: fundo verde muito claro, pauta horizontal e a margem vermelha à esquerda;
- **o razonete** (`.razonete`): o "T" do contador. Esquerda: "Você cuida de" (ou "Sem a gente", em vermelho, quando
  é a dor); direita: "A gente cuida de". Fecha com a linha de **saldo** (`.saldo`);
- **a escada do crescimento** (`.escada`): MEI → ME → EPP → Lucro Presumido, com o degrau do post em destaque;
- **os lançamentos** (`.lancamentos`): cada serviço é uma linha do livro, com "em dia" na coluna da direita;
- **o carimbo EM DIA** (`.carimbo`) no fecho.

## Cores

| Papel | Cor | Uso |
|---|---|---|
| Papel | `#f1f6f0` com pauta `#cfe0d4` | fundo |
| Tinta verde | `#0c3b2e` | texto, linhas, degrau ativo, slide invertido (`.slide.tinta`) |
| Verde-claro | `#d8efdf` | marca-texto (`.marca-verde`) |
| Vermelho de lançamento | `#d23a2c` | margem do papel, carimbo e **só** a dor do cliente (`~texto~` no gerador) |

## Tipografia

**IBM Plex Sans Condensed** 700/500 (títulos e texto) e **IBM Plex Mono** 600/500 (rótulos, colunas, carimbo).
Arquivos em `brand/fontes/plex-*.woff2`.

## Marca

A folinha + "Cerrado Contabilidade" no rodapé.

## Regras de conteúdo

- Só serviços confirmados (site `contabilidade.html` e `consultorias.html`) e o Lucro Presumido. Itens a confirmar
  (inscrição estadual, baixa de empresa, IRPF dos sócios, parcelamentos, Lucro Real...) ficam de fora até o OK.
- Sem limites, alíquotas ou prazos nas peças (mudam por lei), exceto o Fator R de 6%, que está no site.
- Publicidade sóbria, conforme o código de ética do CFC: nada de promessa de economia.
- Pendente: nome e CRC do responsável técnico.

Gerador: `tools/gerar_contabilidade.py`.
