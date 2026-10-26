# Histórico do estúdio de marketing

Registro do que foi produzido, das decisões tomadas e do que ficou pendente. Para o passo a passo
técnico (como exportar, renderizar e publicar), veja o [README](README.md).

**Central de Conteúdos (para o Felipe, do marketing):** https://www.cerradofinancas.com.br/marketing/

---

## Linha do tempo (outubro de 2026)

| Data | Commit | O que foi feito |
|---|---|---|
| 26/10 | `2322dcb` | Estúdio criado em `marketing/`, skills instaladas, primeira campanha (lançamento das 4 frentes: carrossel e story) |
| 26/10 | `e353418` | Central de Conteúdos em `/marketing/`, com prévia, download por peça, `.zip` por campanha e botão de copiar legenda |
| 26/10 | `d5267a1` | Projeto de vídeo (Remotion): Reel do lançamento e folinha animada (vinheta MP4, GIF, WebM transparente, Lottie) |
| 26/10 | `ffafe7b` | Uma campanha por frente: Fábrica de Software, Contabilidade, Crédito, Cursos |
| 26/10 | `a74f8e0` | Cursos com landing própria: IA na Prática e IA em Ação Farma (propagandistas) |
| 26/10 | `b5f715f` | Os 11 cursos presenciais do catálogo da CerraClass, gerados automaticamente dos dados oficiais |

## Campanhas publicadas (19)

Cada campanha tem carrossel (6 ou 7 slides, 1080×1350), story (1080×1920), Reel com som (1080×1920)
e legendas para Instagram e LinkedIn, exceto onde indicado.

**Institucional**
- Lançamento das 4 frentes: carrossel de 7, story, Reel de 21s, legendas
- Folinha animada: vinheta MP4 com som, GIF em loop, WebM com fundo transparente, Lottie (entrada e loop)

**Frentes** (Reel de 15s)
- Fábrica de Software: "Seu negócio não cabe num software de prateleira"
- Contabilidade: "Seu contador te ajuda a decidir ou só a pagar imposto?"
- Crédito: "Antes de assinar, compare" (com a LS Intermediação Financeira)
- Cursos (Cerraclass): "Pare de só usar IA. Construa com ela"

**Cursos com landing própria no site** (carrossel de 7, com slide do instrutor)
- IA na Prática (`/iacao/`)
- IA em Ação Farma, para propagandistas (`/iafarma/`)

**Cursos presenciais do catálogo CerraClass** (gerados de `dados/cerraclass-cursos.json`)
- Curso de um dia (8h, 1 sábado): IA na Gestão, Excel com IA, Consultoria Contábil com IA,
  Consultoria Financeira com IA, Introdução à Análise de Dados, Processos BPMN com IA, Introdução à Automação com IA
- Imersão (22h, 2 sextas à noite + 2 sábados): Ciência de Dados Aplicada, IA na Farma (farmácias e drogarias),
  BI e Dashboards com IA, Prototipação de Apps com IA

---

## Decisões e regras de conteúdo

Valem para todas as próximas campanhas.

1. **Nada inventado.** Todo texto sai do site, das landings ou do catálogo da CerraClass. Citações só se forem
   reais (a do Renato vem da landing `/iacao/`: "Hoje, a barreira não é mais saber escrever código, é saber
   fazer a pergunta certa e estruturar o problema."). Uma citação criada para o slide de Farma foi trocada pela real.
2. **Sem preço e sem data nas peças.** Peças circulam por muito tempo; valores e agenda ficam no site da
   Cerraclass. Os cursos do catálogo são "sob consulta". Pode-se dizer que o pacote para grupos sai mais barato por pessoa.
3. **Crédito sempre com aviso legal** de correspondente bancário: "não é instituição financeira; crédito sujeito
   a análise e aprovação; taxas e condições variam". Está no CTA do carrossel, no story, no Reel e na legenda.
4. **Tamanho de turma:** as landings de IA na Prática e IA em Ação Farma falam em **10 pessoas**; o catálogo da
   CerraClass fala em **até 15 alunos**. Cada campanha segue a fonte do seu curso. *Pendente confirmar com o Renato.*
5. **IA na Farma ≠ IA em Ação Farma.** A primeira é a imersão para farmácias e drogarias (estoque, atendimento,
   conformidade); a segunda é o curso de um dia para propagandistas da indústria. Pastas diferentes
   (`curso-ia-na-farma` e `curso-ia-farma`).
6. **Cores:** azul `#001f5c` de fundo, dourado `#fecb00` só no elemento principal (botão do CTA). Cada frente e
   cada curso tem uma cor de destaque própria (definida em `VISUAL` no gerador e em `videos/src/theme.ts`).
7. **Logo:** a folinha (`../img/folinha-hero.png`) foi limpa (sem halo, contorno suave) e é a marca em todas as
   peças. Nos stories dos cursos presenciais ela foi retirada para caber o selo de formato.

## Como garantimos a qualidade

- Toda peça estática passa por `tools/verificar.py`, que acusa conteúdo invadindo o rodapé ou fora da área
  segura do story (250px no topo e na base). Foi testado com um caso propositalmente quebrado.
- Todo vídeo é conferido extraindo quadros dos momentos-chave (`npx remotion ffmpeg -ss ...`) e olhando
  cada um com as linhas da zona segura.
- Depois de publicar, conferimos que os arquivos de `entregas/` respondem no site e que as áreas de trabalho
  (código, skills, fontes) **não** são publicadas (dão 404).

## Pendências e próximos passos

- [ ] **Ouvir o áudio dos Reels** antes de postar. Os sons são sintetizados por código e nunca foram ouvidos por uma pessoa.
- [ ] **Confirmar o tamanho de turma** (10 ou 15) e alinhar as peças se necessário.
- [ ] Atualizar as campanhas dos cursos quando o catálogo da CerraClass mudar (sequência no README).
- [ ] Ideias de campanhas futuras: promoção de consignado, cases de clientes da Fábrica, depoimentos de alunos,
      turmas com data definida (aí sim com data, em peça de vida curta), conteúdo educativo de contabilidade.
- [ ] Skills instaladas e ainda não usadas: `threejs-*` (3D) e `lemo-opuscar` (curtas cinematográficos, pesado).
- [ ] **Espaço no GitHub Pages:** o limite é 1 GB por site e `entregas/` já usa cerca de **405 MB** (19 campanhas),
      metade disso por causa dos `.zip`, que repetem os arquivos de cada campanha. No ritmo atual o limite chega
      em cerca de 25 novas campanhas. Opções: tirar os vídeos do `.zip`, gerar o `.zip` só para campanhas novas ou
      mover vídeos antigos para outro armazenamento (Google Drive, Firebase Storage).
