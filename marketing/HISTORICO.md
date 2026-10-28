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
| 26/10 | (esta rodada) | Catálogo dos 11 cursos no site (`/cursos/`), `.zip` sem os vídeos (~115 MB a menos), medição do áudio dos 19 vídeos, sitemap completo |
| 26/10 | (esta rodada) | Campanha do Cerra.AI: carrossel de 7, story, Reel de 15s e legendas |
| 28/10 | (esta rodada) | Contabilidade: serviços confirmados nas peças, 3 campanhas novas (Regularização, Sócios, Reforma tributária) e a série educativa "Você sabia?" (8 notas explicativas, sábados de 07/11 a 26/12); DIRF trocada por EFD-Reinf no site |
| 28/10 | ac24cc6 | Série da Cerrado Contabilidade (10 campanhas: 4 "Para quem atendemos" e 6 "O que fazemos") na identidade própria "Partida dobrada", terças e quintas de 03/11 a 03/12 |
| 28/10 | (esta rodada) | Série "O que a Cerrado Tech constrói": 16 campanhas, uma por capacidade do portfólio (carrossel de 6, story, carrossel animado, legendas e data sugerida de 02/11 a 07/12); carrossel animado vira o vídeo padrão |
| 28/10 | (esta rodada) | Identidades próprias para Cerra.AI ("Silício local", cobre e grafite) e CerraClass ("Sábado de sala", uma cor por curso); as 14 campanhas refeitas; vídeos novos em HyperFrames (16:9 e 9:16) no lugar dos Reels antigos |

## Campanhas publicadas (20)

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

**Produto** (Reel de 15s)
- Cerra.AI: "E se a IA rodasse no seu computador?" — assistente corporativo 100% local da Cerrado Tech,
  com RAG nos documentos da empresa, OCR e transcrição offline, anonimização e auditoria LGPD e três
  cenários com base própria. Fonte dos textos: `D:\Dev\Cerra.AI` (README, `docs/FUNCIONALIDADES.md`,
  `docs/implementation.md`).

**Cursos presenciais do catálogo CerraClass** (gerados de `dados/cerraclass-cursos.json`)
- Curso de um dia (8h, 1 sábado): IA na Gestão, Excel com IA, Consultoria Contábil com IA,
  Consultoria Financeira com IA, Introdução à Análise de Dados, Processos BPMN com IA, Introdução à Automação com IA
- Imersão (22h, 2 sextas à noite + 2 sábados): Ciência de Dados Aplicada, IA na Farma (farmácias e drogarias),
  BI e Dashboards com IA, Prototipação de Apps com IA

---

## Identidades próprias (28/10)

Cerrado Tech e Cerrado Finanças mantêm a identidade do site (azul `#001f5c` e dourado). **Cerra.AI,
CerraClass (com todos os cursos) e Crédito ganharam identidade própria**, cada uma com guia em `brand/<marca>/README.md`:

- **Cerra.AI, "Silício local":** cobre `#e2873b` + quase-preto `#0d0f0e`, Archivo expandida em caixa alta,
  JetBrains Mono nas citações. Recursos próprios: a tarja de anonimização e a etiqueta "Trechos consultados".
- **CerraClass, "Sábado de sala":** um fundo vivo por curso + tinta quase-preta, Bricolage Grotesque condensada
  em caixa alta. Recursos próprios: as 10 cadeiras da turma, a régua do dia de aula, o ingresso, a etiqueta adesiva.
- **Crédito, "Antes de assinar":** papel branco, azul-caneta `#1f3ae0` e marca-texto `#e6ff3d` só no destaque,
  Schibsted Grotesk + Caveat na rubrica. Recursos próprios: o comparativo de propostas (sem números), a linha de
  assinatura "Você decide" e o aviso legal como letra miúda. **A marca é a folinha**; a LS aparece só como parceira.

**Vídeos dessas duas marcas agora são HyperFrames** (HTML + GSAP, `filmes/`), feitos a partir de três
modelos de prompt (comercial de produto 15s, lançamento estilo App Store 30s, lançamento minimalista P&B 30s),
sempre em 16:9 e 9:16 (`video-16x9.mp4` e `video-vertical.mp4` em cada campanha). Os Reels antigos do Remotion
dessas campanhas foram removidos. O Remotion (`videos/`) segue para as campanhas de Cerrado Tech e Finanças.

## Série "O que a Cerrado Tech constrói" (28/10)

Fonte única: `tools/gerar_portfolio_tech.py` (toda a copy das 16 capacidades do `/portfolio/`). Estrutura igual em
todas: gancho com a dor do cliente → a sigla traduzida ("ERP, na prática") → 3 sinais de que precisa → o que
entregamos (os itens do portfólio, sem acréscimo) → como trabalhamos (os 4 passos da campanha da Fábrica) → chamada
própria com o link da página certa (ERP, CRM, Dashboards, IA Offline, E-commerce, Compliance e Blockchain têm página;
o resto vai para `/portfolio`). Identidade: a da Cerrado Tech (azul e dourado), uma cor de destaque por capacidade.
Postagem sugerida segunda, quarta e sexta, na ordem do gerador (ERP 02/11 até Web3 07/12), registrada no `info.json`.

## Série da Cerrado Contabilidade (28/10)

Fonte única: `tools/gerar_contabilidade.py`. Posicionamento: "do MEI à média empresa, o mesmo contador".
Série A, "Para quem atendemos": MEI, Simples Nacional, Lucro Presumido, da micro à média. Série B, "O que fazemos":
abertura, fiscal e tributário, departamento pessoal, contábil, consultivo e troca de contador. Identidade própria
("Partida dobrada", `brand/contabilidade/README.md`) para não se confundir com o resto da Cerrado Finanças.
Serviços confirmados pelo Renato em 28/10: os do site, o Lucro Presumido e toda a lista da estratégia (inscrição
estadual, MEI para ME, alterações e baixa, certidões, certificado digital, DASN-SIMEI, ISS, parcelamentos, reforma
tributária, pró-labore, escrituração completa, distribuição de lucros, IRPF dos sócios). Eles entraram nas campanhas
existentes e em três novas: Regularização, Sócios e Reforma tributária (13 no total, terças e quintas até 15/12).
**Série "Você sabia?"** (8 posts, sábados de 07/11 a 26/12, `VOCE_SABIA` no mesmo gerador): cada post é uma "nota
explicativa" numerada (a regra com a base legal, na prática, o erro e o certo, como a gente ajuda). Temas: DASN-SIMEI,
Fator R, pró-labore, fim da DIRF, IBS e CBS, MEI acima do limite, certidão negativa e CNAE. Regras conferidas com a
lei em 28/10/2026, sem valores de limite que mudam. **Pendências:** Lucro Real (não citado até confirmar) e o nome e
CRC do responsável técnico (o Renato pediu para deixar para depois). A página `/contabilidade` trocou a DIRF extinta
por EFD-Reinf e eSocial.

## Decisões e regras de conteúdo

Valem para todas as próximas campanhas.

1. **Nada inventado.** Todo texto sai do site, das landings ou do catálogo da CerraClass. Citações só se forem
   reais (a do Renato vem da landing `/iacao/`: "Hoje, a barreira não é mais saber escrever código, é saber
   fazer a pergunta certa e estruturar o problema."). Uma citação criada para o slide de Farma foi trocada pela real.
2. **Sem preço e sem data nas peças.** Peças circulam por muito tempo; valores e agenda ficam no site da
   Cerraclass. Os cursos do catálogo são "sob consulta". Pode-se dizer que o pacote para grupos sai mais barato por pessoa.
3. **Crédito sempre com aviso legal** de correspondente bancário (também no fecho do vídeo): "não é instituição financeira; crédito sujeito
   a análise e aprovação; taxas e condições variam". Está no CTA do carrossel, no story, no Reel e na legenda.
4. **Tamanho de turma:** **até 10 alunos por turma** em tudo (decidido em 26/10, confirmado em 28/10; os 11 cursos
   do catálogo foram regerados com 10). As landings de IA na Prática e
   IA em Ação Farma e o site já dizem 10; o catálogo da CerraClass ainda diz "até 15 alunos" — alinhar lá.
5. **IA na Farma ≠ IA em Ação Farma.** A primeira é a imersão para farmácias e drogarias (estoque, atendimento,
   conformidade); a segunda é o curso de um dia para propagandistas da indústria. Pastas diferentes
   (`curso-ia-na-farma` e `curso-ia-farma`).
6. **Cores:** azul `#001f5c` de fundo, dourado `#fecb00` só no elemento principal (botão do CTA), nas peças
   de Cerrado Tech e Cerrado Finanças. Cerra.AI e CerraClass seguem as próprias identidades (ver acima).
7. **Logo:** a folinha (`../img/folinha-hero.png`) foi limpa (sem halo, contorno suave) e é a marca da empresa em
   todas as peças (rodapé). Nos stories dos cursos presenciais ela foi retirada para caber o selo de formato.
   A campanha do Cerra.AI usa a **logo do produto** (`img/logo_cerraai-icone.png`), recortada do fundo preto
   original por `tools/recortar_logo_cerraai.py`; no Reel, a logo entra no lugar da folinha (campo `logo`
   em `videos/src/campanhas.ts`).
8. **Cerra.AI:** o texto vem do próprio projeto (`D:\Dev\Cerra.AI`). Pode afirmar: 100% local, zero requisições
   externas, RAG com citação de arquivo e página, OCR e transcrição offline, anonimização e relatório LGPD,
   auditoria mascarada, bases isoladas e os três cenários (Contabilidade, Oncologia, Advocacia Penal).
   **Não pode afirmar:** download disponível (o executável existe mas não foi publicado), cliente ou case,
   produto em nuvem ou multiusuário, certificação LGPD, "sempre correto", desempenho fora da máquina medida
   (RTX 4060 8 GB), a Freedom Tier como diferencial, nem que as bases dos cenários já foram revisadas por
   especialistas (ainda não). As peças comparam com "IA na nuvem" só em termos genéricos (o dado sai do
   ambiente, precisa de internet).

9. **Vídeo padrão = carrossel animado.** Toda campanha nova sai com `carrossel-animado.mp4`, feito do próprio
   carrossel. Comerciais especiais são extras (ex.: `video-extra-app-*.mp4` da CerraClass). O que já está feito fica.

## Como garantimos a qualidade

- Toda peça estática passa por `tools/verificar.py`, que acusa conteúdo invadindo o rodapé, fora da área
  segura do story (250px no topo e na base), palavra vazando do bloco e ícone/logo sobreposto a texto. Foi testado com um caso propositalmente quebrado.
- Todo vídeo é conferido extraindo quadros dos momentos-chave (`npx remotion ffmpeg -ss ...`) e olhando
  cada um com as linhas da zona segura.
- O áudio dos vídeos é medido por `tools/conferir_audio.py`: extrai a trilha, mede pico, RMS, clipping e
  silêncios. Em 26/10 os 19 vídeos passaram (trilha presente, sem clipping, sem silêncio longo), com RMS
  em torno de -28 dBFS — baixo, mas dentro do que o Instagram normaliza. **A escuta continua pendente:**
  a medição não diz se o som combina com a imagem.
- Depois de publicar, conferimos que os arquivos de `entregas/` respondem no site e que as áreas de trabalho
  (código, skills, fontes) **não** são publicadas (dão 404).

## Pendências e próximos passos

- [ ] **Ouvir o áudio dos Reels** antes de postar. Os sons são sintetizados por código e nunca foram ouvidos por uma pessoa.
- [ ] **Alinhar o catálogo da CerraClass para 10 alunos** por turma (hoje diz 15).
- [ ] Atualizar as campanhas dos cursos quando o catálogo da CerraClass mudar (sequência no README).
- [ ] Ideias de campanhas futuras: promoção de consignado, cases de clientes da Fábrica, depoimentos de alunos,
      turmas com data definida (aí sim com data, em peça de vida curta), conteúdo educativo de contabilidade.
- [ ] Skills instaladas e ainda não usadas: `threejs-*` (3D) e `lemo-opuscar` (curtas cinematográficos, pesado).
- [ ] **Espaço no GitHub Pages:** o limite é 1 GB por site. `entregas/` usava ~405 MB (19 campanhas) e foi
      reduzida para **~290 MB** em 26/10 (e voltou a ~425 MB em 28/10, com a série da Cerrado Tech e os vídeos novos): o `.zip` de cada campanha passou a levar só as imagens e as legendas,
      não os vídeos (o time baixa o vídeo direto na Central de Conteúdos). Os `.zip` caíram de 198 MB para 84 MB.
      Se apertar o limite de novo, o próximo passo é mover os vídeos antigos para outro armazenamento
      (Google Drive, Firebase Storage) e deixar no repositório só as peças estáticas.
