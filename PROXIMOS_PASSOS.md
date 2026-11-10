# Próximos passos: Cerrado Finanças & Tech

Ponto de partida para retomar o trabalho. Última atualização: 10/11/2026.

**Vai continuar em outra IA?** Leia a seção [Passagem para outra IA](#passagem-para-outra-ia-021126) no fim deste arquivo:
ela tem o resumo do que foi feito, o que falta e um prompt pronto para colar.

## Onde está cada registro

| Arquivo | Conteúdo |
|---|---|
| [`context.md`](context.md) | Como o site é construído: páginas, includes, identidade visual, padrões, deploy |
| [`marketing/README.md`](marketing/README.md) | Passo a passo do estúdio de conteúdo: exportar, verificar, renderizar vídeos, publicar |
| [`marketing/HISTORICO.md`](marketing/HISTORICO.md) | O que foi produzido em marketing, decisões de conteúdo e pendências |

Nenhum desses arquivos é publicado no site (estão no `exclude` do `_config.yml`).

## O que foi feito (outubro de 2026)

**Site**
- Reposicionamento: a home virou hub das 4 frentes (Fábrica de Software, Contabilidade, Crédito, Cursos).
  A antiga home de software está em `fabrica.html`.
- Novas páginas: `/credito/` (correspondente bancário multi bancos com a LS Intermediação Financeira)
  e `/cursos/` (Cerraclass, com links para cerraclass.com.br).
- Header só com as 4 frentes; Startups, Parceiros e Data Driven foram para o footer e para a home.
- Folinha como logo do hub, favicon, ícone de app (iPhone/Android) em todas as páginas; recorte da folinha limpo.
- Central de Conteúdos em `/marketing/` para o Felipe (marketing) baixar as peças.
- Sitemap completo: as 51 páginas públicas estão listadas (antes faltavam portfolio, iacao, iafarma,
  consultorias e as páginas de produto/GovTech).
- `/cursos/` passou a listar os **11 cursos presenciais** do catálogo da Cerraclass (7 de um dia e
  4 imersões), com link para a página de cada curso no site da Cerraclass.
- `/iafarma/` sem data nem preço: "próxima turma sob consulta". A data fixa (13/09) já tinha passado.
- `gerar_gamma.py` sem chave no código: a chave vem da variável de ambiente `GAMMA_API_KEY`
  (`.env`, ignorado pelo git).

**Marketing:** **112 campanhas** publicadas na Central em 30/10 (Contabilidade 22, Cerrado Tech 17, Crédito 16, Guia Acadêmico 15, CerraClass 14, Cerra.AI 13, Institucional 8, Consultorias 7). Detalhes em `marketing/HISTORICO.md`.
Em 28/10, Cerra.AI e CerraClass (com os cursos) ganharam **identidade visual própria** e vídeos novos em
HyperFrames (16:9 e 9:16); Cerrado Tech e Cerrado Finanças seguem com a identidade do site.

**30/10:**
- **Guia Acadêmico** (consultoria acadêmica) virou a 4ª conta, @guiacademico: identidade "Artigo", 15 campanhas,
  mídia kit, e o site guiacademico.com.br refeito na mesma identidade e publicado (Firebase, conta
  comercial@cerradofinancas.com.br).
- **Datas comemorativas** nacionais (6, até 01/01/2027) e **agenda** recomeçando em 31/10, com repetição do conteúdo
  quando ele acaba.
- **Cerra.AI, extras:** glossário (5), Pergunte ao Cerra.AI (3), comparativo com a nuvem, 8 stories interativos,
  checklist IA e LGPD em PDF e kit de vendas (one-pager e deck). O @cerra.ai tem conteúdo novo até 23/11.

**31/10:** apresentação institucional ("Prazer, ...") de Cerra.AI, Cerrado Tech, CerraClass e Guia Acadêmico,
cada uma na identidade da marca, para fixar no topo de cada perfil. A agenda começa por elas (31/10) e o Reel sai em 07/11.
Também em 31/10, o **Guia Acadêmico ganhou o post de Facebook**: uma arte única (`facebook.png`, 1080×1350) no lugar do
carrossel, ou o `carrossel-animado.mp4` como vídeo, e uma legenda própria (`legenda-facebook.txt`) com o link do
WhatsApp inteiro (`https://api.whatsapp.com/send?phone=5567993515206`), que o Facebook transforma em link clicável.
Vale para as 15 campanhas dos Cadernos de método e para a apresentação; a Central já mostra a peça e o card "Facebook".
Detalhes em `marketing/HISTORICO.md`.

**31/10 a 02/11 (sessão do Renato com o Claude):**
- **Vídeos institucionais refeitos** (`8b77cd3`, `dadf112`):
  - O que mudou: o carrossel animado das 4 apresentações ("Prazer, ...") deixou de só passar slides. Agora cada
    elemento entra com o seu movimento, numa coreografia própria de cada marca, em `marketing/filmes/coreografias/`.
  - Áudio: os vídeos saem **sem áudio**, porque a trilha sintetizada foi reprovada. `--com-audio` reativa.
  - Correção: o quadro do Guia Acadêmico desmontava por causa de um conflito com a classe `.quadro`, já corrigido.
  - Como usar: `marketing/filmes/README.md`, seção "Coreografia própria".
- **`/portfolio/` refeito, só com o Sob Demanda:**
  - `7f1f4e1`: saiu "Software por segmento". Entraram:
    - as 16 capacidades com filtro por área, cada uma com "na prática", exemplo e "você recebe";
    - "monte a sua solução", com a lista enviada pelo WhatsApp;
    - linha do tempo do projeto e perguntas frequentes.
  - `5be33f7`: modelo comercial em destaque, com 3 etapas ligadas e um gráfico ilustrativo.
  - `d55bf65`: hero 3D (Three.js) feito a partir de um briefing do Renato. Foi **reprovado** ("ficou uma bela
    bosta") e revertido em `7f72762`. Não refazer 3D nesta página sem pedido explícito.
  - `7f72762`: ícones trocados pelos **Phosphor duotone** inline (MIT), com os mesmos ids do sprite.
- **Estudo do repositório github.com/drix10/ai-resources** (02/11): `marketing/dados/estudo-ai-resources.md`.
  É um acervo de notícias de IA com fonte (CC BY 4.0). Serve como pauta "IA da semana" para o Cerra.AI e a CerraClass,
  como radar de ferramentas e como base de demonstração de RAG. Para construir sites, quase nada.
- **02/11 (terceira rodada):**
  - **Identidade de movimento por marca:** cada marca ganhou estilo, conceito de abertura, curvas,
    tipo de troca, câmera e grão. Fonte única em `marketing/brand/movimentos.json`, guia em
    `marketing/brand/MOVIMENTO.md`. O carrossel animado (`filmes/ferramentas/animar-carrossel.mjs`) já lê
    essa configuração pelo nome da campanha: nada de fade, corte em movimento, câmera que respira.
    Seis vídeos re-renderizados como amostra (uma peça por marca).
  - **3D nas artes de marketing:** o filme do Cerra.AI "o cobre" (12 s, 16:9 e 9:16) foi **reprovado** na
    primeira versão e apagado das entregas (`c951cf2`): a folha virava um leque de folhas ao dobrar (eram 16
    cópias a 3 px em `translateZ`). **Corrigido em `bcaa034`:** 9 cópias a 1,1 px e inclinação discreta, sem
    dobrar. Está renderizado em `marketing/filmes/out/cerraai-cobre-16x9.mp4` e `-9x16.mp4`, **não publicado**,
    esperando o aval do Renato. Se ele não gostar, apagar `marketing/filmes/cerraai-cobre/` e parar por aqui.
  - **Virada de página corrigida (`bcaa034`):** a folha anterior rodava até -102° e mostrava o verso do papel
    ao avesso, com as duas folhas sobrepostas. Agora a folha nova entra até 72° e a anterior escurece atrás.
    Contabilidade e Crédito re-renderizados e no ar.
  - **Site da CerraClass publicado** com "10 alunos por turma" (o projeto fica na conta
    `gestor.renatorosa@gmail.com`, não na comercial).
- **02/11 (sessão do Renato com outra IA):**
  - **Espaço do GitHub Pages resolvido:** o publicado saiu de **~968 MB para ~370 MB** (limite de 1 GB).
    Ferramenta nova `marketing/tools/otimizar_publicacoes.py`: PNG quantizado em 256 cores (197 MB → 81 MB),
    MP4 sem a trilha sintetizada e reencode em libx264 crf 24 (SSIM 0,994; 522 MB → 179 MB), .zip refeitos
    (161 MB → 59 MB) e mídia kit (31 MB → 18 MB). A Central foi atualizada com os tamanhos novos.
    Commits `ab4c235` e `3be97cb`.
  - **Série "IA da semana" no @cerra.ai** (aprovada pelo Renato): gerador dirigido por dados
    (`marketing/tools/gerar_ia_da_semana.py` + `marketing/dados/ia_da_semana/AAAAMMDD.json`).
    Edição 01 publicada (04/11 o post, 10/11 o Reel): Anthropic (envenenamento de 0,1% do pré-treino),
    Mistral Large 4 (1 trilhão de parâmetros com pesos abertos) e Google DeepMind (PlanAssist).
    Todo número foi conferido abrindo a fonte original. Commit `b962c8a`.
  - **Estudo de motion design e 3D** (02/11): `marketing/dados/estudo-motion-design.md` — motionmaxxing,
    bang-motion, dimensional-drawing e img2threejs, com o que serve e o que não serve para a gente.
  - **Catálogo da CerraClass alinhado para 10 alunos**: corrigidos os 5 textos do projeto `D:\Dev\CerraClass`
    (`presencialCourseContent.ts`, `CursoPresencial.tsx`, `Landing.tsx` e `Presenciais.tsx`) e reimportado o
    catálogo para `marketing/dados/cerraclass-cursos.json`. O site da CerraClass ainda **não foi publicado**
    (o `firebase login` está expirado): é preciso `firebase login --reauth` e
    `firebase deploy --only hosting --account comercial@cerradofinancas.com.br` em `D:\Dev\CerraClass`.

**Palestra "Muito Além do Currículo: IA na Prática" (29/10):** versão animada com 29 slides
(`marketing/posts/2026-10-palestra-carreira-ia/apresentacao-animada.html`), online em
https://www.cerradofinancas.com.br/marketing/entregas/2026-10-palestra-carreira-ia/apresentacao/. Detalhes em `marketing/HISTORICO.md`.

## O que foi feito (novembro de 2026)

**CerraFood, a plataforma white label para pizzaria (10/11).** Commits `f6d2d67`, `a0bada7` e `cee3f36`.
- **Marketing:** identidade própria "Comanda" (`marketing/brand/cerrafood/`), peça global "A plataforma inteira"
  (8 slides com ilustrações e carrossel animado com coreografia própria), apresentação "Prazer, CerraFood" e 10
  campanhas, uma por módulo. Cada uma tem story, carrossel animado e legendas de Instagram, LinkedIn e Facebook. Há
  também um mídia kit. Tudo na Central, na agenda do @cerradofinancas de 11/11 a 19/12, um dia sim e outro não, sem
  mudar o que já tinha sido postado.
- **Site:** `cerrafood.html` refeita na mesma identidade e só com o que o sistema faz. Saíram as afirmações sem
  base: "ticket médio 23% maior", PIX integrado, multi-loja, ponto digital, taxa por distância, "implementação em 7
  dias" e a seção Enterprise.
- **Regras:** nunca citar a primeira implantação (o código fica em `D:\Dev\NapoleFood`); só o que está no código; o
  selo "sua marca aqui" só nas peças sobre white label. Detalhes, calendário e o passo a passo da publicação em
  `marketing/HISTORICO.md` (seção "CerraFood"); o que pode e não pode afirmar em `marketing/brand/cerrafood/README.md`.

## Pendências

### Site
- [ ] **CerraFood:** acrescentar PIX integrado, NFC-e, iFood ou multi-loja na página e nas peças **só** quando o
      sistema tiver essas partes publicadas (hoje não tem).
- [ ] **Trocar a chave da API do Gamma**, caso ela tenha circulado. A chave saiu do código (agora vem de
      `GAMMA_API_KEY`) e `gerar_gamma.py` entrou no `.gitignore`, mas a chave antiga continua válida no Gamma.
- [ ] `analyze_pages.py` teve o caminho corrigido para `D:\Dev\cerradofinancas` (projetos migrados de
      `C:\Users\Renato\Documents`); outros scripts antigos podem ter o mesmo problema.
- [ ] `/iacao/` ainda mostra preço (R$ 300 individual / R$ 1.800 equipe) enquanto `/iafarma/` ficou "sob consulta".
      Decidir se os dois ficam igual.
- [ ] No catálogo da CerraClass, "turma de no máximo 15 alunos" ainda diz 15. A decisão é 10 — alinhar lá
      (o site e as peças já dizem 10).

### Marketing
- [ ] **Agenda do @cerra.ai:** quando as 25 campanhas paradas da outra IA forem publicadas, rodar o `agendar.py` muda
      as datas de posts do @cerra.ai já postados (04/11 a 10/11). Antes, pôr o Cerra.AI em `ESTREIAS` no `agendar.py`
      (como foi feito com o CerraFood) ou fixar o passado.
- [ ] O deploy do GitHub Pages de 09/11 **falhou** (o de 10/11 passou). Ver o motivo se voltar a acontecer.
- [ ] **Espaço do GitHub Pages: RESOLVIDO em 02/11** (de ~968 MB para ~370 MB). Antes da próxima leva grande de
      vídeos, rodar `python tools/otimizar_publicacoes.py` (a ferramenta só mexe em arquivo versionado e sem
      mudança de outra IA) e refazer os .zip. O `.git` continua com ~1,4 GB de histórico: para reduzir isso de
      verdade seria preciso reescrever o histórico, o que não é recomendado com duas IAs no mesmo repositório.
- [x] **Publicar o site da CerraClass** com o texto "10 alunos por turma": o `firebase login` estava expirado.
      **FEITO em 02/11:** o projeto `cerraclass` fica na conta **gestor.renatorosa@gmail.com** (é o "current"
      do `.firebaserc`, com 30 projetos), não na comercial. Deploy com `firebase deploy --only hosting` na conta
      padrão; conferido no ar: "Máximo de 10 alunos por turma". A conta comercial@cerradofinancas.com.br é a do
      projeto **guiacademicostorage** (Guia Acadêmico) e continua com credenciais expiradas.
- [ ] **"IA da semana":** a edição 01 saiu em 04/11. Para a edição 02, rodar
      `python tools/gerar_ia_da_semana.py --coletar 2026-11-09`, escolher 3 notícias **abrindo a fonte
      original**, escrever o JSON da edição e rodar o gerador. A regra: resumo de anúncio não é fato
      verificado; nunca usar número sem abrir a fonte.
- [ ] **Identidade de movimento por marca** (plano em `marketing/dados/estudo-motion-design.md`): escrever
      `brand/<marca>/movimento.md` no formato do "style brief" do bang-motion (estilo, conceito, curvas,
      câmera, transições, som) e tirar o fade da troca de slide. Começar pelo Cerra.AI e pelo white-label.
- [ ] **3D em vídeo:** o `hero3d` do motionmaxxing resolve o logo como objeto de luz real. O hero 3D foi
      reprovado no site (`/portfolio/`, commit `7f72762`) e não volta lá sem pedido explícito. Precisa de aval.
- [ ] Ouvir o áudio dos Reels antes de postar (sons sintetizados, nunca revisados por uma pessoa).
      Medido em 26/10 com `marketing/tools/conferir_audio.py`: os 19 vídeos têm trilha, sem clipping e sem
      silêncio longo. O nível está baixo (RMS ≈ -28 dBFS) — vale ouvir e decidir se sobe o volume.
- [ ] Ajustar o catálogo da CerraClass para 10 alunos por turma (ver acima).
- [ ] Ouvir as trilhas novas dos vídeos HyperFrames (sintetizadas por `marketing/filmes/ferramentas/trilha.mjs`; volume já medido, escuta pendente).
- [ ] **Conteúdo novo acaba antes do fim da agenda** em algumas contas (ver a aba Agenda da Central). Desde 30/10 a
      agenda repete os posts da conta desde o mais antigo quando o conteúdo novo acaba, então nenhum dia fica vazio,
      mas o ideal é produzir mais peças para as contas que entram em repetição cedo.
- [ ] Palestra: levar os slides novos da versão animada para `slides.html`, `apresentacao.html` e os PNGs;
      ao mudar a versão animada, atualizar também a cópia online (passo a passo em `marketing/HISTORICO.md`).
- [ ] **Re-renderizar as ~104 campanhas com a nova gramática de movimento.** Agora o `animar-carrossel.mjs`
      lê `brand/movimentos.json` pelo nome da campanha, mas só 6 peças foram re-renderizadas (uma por marca,
      como amostra). Para as outras: `node ferramentas/animar-carrossel.mjs ../posts/<entrega>/carrossel.html --render`,
      uma por vez (o render trava se forem várias no mesmo comando). Depois, `python tools/otimizar_publicacoes.py`
      para encolher os MP4.
- [ ] **3D nas artes:** a primeira tentativa (folha em CSS 3D, `filmes/cerraai-cobre/`) foi **reprovada**;
  a segunda (sem o leque de cópias) está renderizada em `filmes/out/` e **espera o aval do Renato**. Se ele
  aprovar, publicar como `entregas/2026-11-cerraai-cobre-3d/` (frente Cerra.AI, série "Filme 3D") e rodar
  `tools/publicar.py`. Se não, apagar a fonte. Não refazer 3D em CSS sem essa definição.
- [ ] **Identidade de movimento por marca:** as sete marcas já estão declaradas em `brand/MOVIMENTO.md`.
      Falta aplicar a gramática às quatro **apresentações** (que têm coreografia própria) e aos filmes
      comerciais (`cerra-ai-comercial`, `cerra-ai-lancamento`, `cerraclass-curso`, `cerraclass-lancamento`,
      `credito-comercial`), que ainda usam o movimento antigo.
- [ ] **Guia Acadêmico:** criar o perfil @guiacademico no Instagram (o nome foi usado na agenda e precisa ser
      confirmado); confirmar se os números do site (+120 trabalhos, 94% de aprovação, 10+ anos) podem ir para as
      peças. O site novo foi publicado em 30/10; o projeto Firebase (`guiacademicostorage`) é da conta
      comercial@cerradofinancas.com.br: `firebase deploy --only hosting --account comercial@cerradofinancas.com.br`.
      Confirmar (ou criar) também a página do Guia Acadêmico no Facebook: a arte e a legenda já estão na Central.
- [ ] **Legendas por rede:** só a do Facebook usa a URL completa do WhatsApp; a do Instagram ainda escreve só o
      telefone e a do LinkedIn só o site. Padronizar se fizer sentido (no LinkedIn a URL vira clique; no Instagram, não).
- [ ] **Cerra.AI:** as 25 campanhas do planejamento (`2026-11-cerraai-*` da outra IA) estão prontas em PNG, mas sem
      vídeo, fora da agenda e sem commit; decidir se publica. Respostas reais da caixinha e dos comentários vão para
      `marketing/dados/pergunte-cerraai.json`. Nos stories interativos, o sticker é posto à mão no Instagram.
- [ ] Datas comemorativas de 2027: acrescentar em `marketing/tools/gerar_datas.py` (hoje vão até 01/01/2027).
- [ ] Crédito: decidir a cidade do atendimento presencial (a LS fica em Campo Grande-MS; o `/credito` diz Cuiabá),
      se o consignado do INSS continua no site (o portfólio da LS lista o INSS só no empréstimo pessoal) e se as peças
      usam o WhatsApp da LS. As peças hoje não citam cidade e usam o WhatsApp da Cerrado.
- [ ] Consultorias: confirmar se os números do site (50+ projetos, R$ 2 bi, 12 anos, "até 40%") podem ir para anúncio.
- [ ] Contabilidade: confirmar se atendem Lucro Real (as peças ainda não citam) e, quando houver, incluir o nome e
      o CRC do responsável técnico. A série "Você sabia?" foi conferida com a lei em 28/10/2026; revisar se algo mudar
      antes da data de cada post.

### Portfólio e vídeos (de 31/10 a 02/11)
- [ ] **`/portfolio/`: o Renato revisar os textos novos.** Ninguém revisou ainda os que eu escrevi:
      - o exemplo de entrega e a lista "você recebe" de cada uma das 16 capacidades;
      - as 5 perguntas frequentes;
      - os dois benefícios do bloco da sala de formação, "Equipe capacitada" e "Clientes mais bem atendidos". Eles
        substituíram o trecho que falava da receita da própria Cerrado Tech.
      - **Conferência de 02/11 (feita por outra IA, sem alteração):** os 16 exemplos estão marcados como
        "Exemplo", nenhum número, preço, cliente ou prazo aparece nos textos novos, e as FAQ não afirmam nada
        que não esteja no site. Dois pontos para o Renato decidir: o compromisso de "código é seu, sem amarras de fornecedor"
        (na FAQ "O código e os dados ficam com quem?") e "hospedagem" na mensalidade do modelo comercial.
- [ ] **`/portfolio/`: a página é editada direto no `portfolio.html`.** O script que a gerou ficou numa pasta temporária
      e não existe mais. As descrições das 16 capacidades também estão em `marketing/tools/gerar_portfolio_tech.py`
      (série "O que a Cerrado Tech constrói"): ao mudar uma, mudar a outra.
- [ ] **Carrossel animado das outras campanhas:** só as 4 apresentações têm coreografia própria. As outras ~110 usam o
      movimento genérico antigo e ainda **têm áudio**. Se o Renato pedir, re-renderizar sem áudio, com
      `node ferramentas/animar-carrossel.mjs ../posts/<entrega>/carrossel.html --render`, uma por vez.
      O espaço do GitHub Pages deixou de ser o travão (agora há folga); o custo é o tempo de render.
- [ ] **IA da semana (opcional):** **FEITO em 02/11** — o Renato aprovou e a edição 01 já está na agenda
      (04/11). O gerador é `marketing/tools/gerar_ia_da_semana.py`; o passo a passo está no topo das Pendências
      de Marketing.

## Como publicar uma mudança

Commit na `main` e `git push`: o GitHub Pages reconstrói o site em 1 a 2 minutos
(acompanhe com `gh run list -R renato0503/cerradofinancas --workflow pages-build-deployment`).
Depois, confira as páginas alteradas no ar (Ctrl+F5 para fugir do cache).

## Passagem para outra IA (02/11/26)

### O que foi feito nesta sessão (de 31/10 a 02/11)
Está resumido acima, em "O que foi feito", no bloco "31/10 a 02/11". Os detalhes estão em:
- `marketing/HISTORICO.md`, na seção "Apresentações institucionais (31/10)": vídeos refeitos, coreografia e sem áudio.
- `marketing/filmes/README.md`, na seção "Coreografia própria": como fazer um vídeo coreografado.
- `context.md`, no `/portfolio/`: estrutura atual da página.
- `marketing/dados/estudo-ai-resources.md`: estudo do repositório de notícias de IA.

### O que falta
1. A lista "Portfólio e vídeos (de 31/10 a 02/11)", em Pendências, logo acima.
2. As pendências de Site e de Marketing que já existiam. As mais urgentes:
   - publicar o site da CerraClass com "10 alunos por turma" (falta `firebase login --reauth`);
   - confirmar o @guiacademico e os números do site;
   - decidir se publica as 25 campanhas do Cerra.AI que estão paradas;
   - a identidade de movimento de cada marca (plano em `marketing/dados/estudo-motion-design.md`).

### Sessão de 02/11 (segunda rodada)
- **Espaço do GitHub Pages resolvido** (de ~968 MB para ~370 MB), com a ferramenta
  `marketing/tools/otimizar_publicacoes.py`. Rodar de novo depois de cada leva grande.
- **Série "IA da semana" aprovada e publicada** (edição 01 no ar, na agenda do @cerra.ai).
- **Estudo de motion design e 3D** escrito (`marketing/dados/estudo-motion-design.md`).
- **Catálogo da CerraClass alinhado para 10 alunos** no projeto `D:\Dev\CerraClass`; falta publicar.

### Regras que valem sempre (aprendidas com o Renato)
- **Outra IA usa este repositório ao mesmo tempo.** Nunca `git add -A` nem `git add .`: adicione arquivo por arquivo,
  só os seus. Se a outra IA tiver mudanças sem commit no mesmo arquivo, faça o commit num worktree limpo. O passo a
  passo está na memória "commit só dos meus arquivos" e no `marketing/HISTORICO.md`.
- Commit na `main` + `git push` publica no ar em 1 a 2 minutos (GitHub Pages). Depois confira a página no ar.
- Só são publicados: as páginas do site, `marketing/index.html`, `marketing/entregas/` e `marketing/kits/`. Um .md
  novo na raiz **vai para o ar** se não estiver no `exclude` do `_config.yml`.
- Vídeos **sem áudio**. Movimento pensado por elemento e por marca, nunca só "passar slides".
- Não inventar números, preços, clientes ou depoimentos. Exemplo ilustrativo vai marcado como "Exemplo".
- Responder ao Renato em português, direto. Ele aprova vendo o resultado no ar ou nas capturas.
- Antes de entregar, testar no navegador (Playwright) em desktop e celular e conferir o console.

### Prompt para colar na outra IA

```
Você vai continuar o trabalho no repositório D:\Dev\cerradofinancas (site cerradofinancas.com.br, Jekyll no GitHub
Pages, e o estúdio de marketing em marketing/). Antes de qualquer coisa, leia nesta ordem:
1. PROXIMOS_PASSOS.md, inteiro, principalmente "Passagem para outra IA (02/11/26)" e as Pendências;
2. context.md (como o site é feito);
3. marketing/README.md e marketing/HISTORICO.md (estúdio de conteúdo, agenda e regras);
4. marketing/filmes/README.md, se o trabalho envolver vídeo.

Regras:
- Outra IA mexe neste repositório ao mesmo tempo. Nunca rode git add -A nem git add .; adicione só os
  arquivos que você criou ou alterou. Se um arquivo seu também tiver mudanças da outra IA sem commit, faça o commit
  num worktree limpo e aplique a mesma mudança na cópia principal.
- Commit na main + push publica o site em 1 a 2 minutos; confira a página no ar depois.
- Vídeos sem áudio. Animação pensada elemento por elemento, na identidade de cada marca.
- Não invente números, preços, clientes nem depoimentos. Exemplo ilustrativo vai marcado como "Exemplo".
- Teste no navegador (desktop e celular) antes de entregar.
- Ao terminar cada pedido, atualize PROXIMOS_PASSOS.md (feito e pendente) e, se for marketing,
  marketing/HISTORICO.md.

Onde parei: entregues nesta sessão a **série "IA da semana" do @cerra.ai** (edição 01 no ar, 04/11), o
**espaço do GitHub Pages resolvido** (~968 MB → ~370 MB, `marketing/tools/otimizar_publicacoes.py`) e a
**identidade de movimento das 7 marcas** (`brand/movimentos.json` + `brand/MOVIMENTO.md`, aplicada ao
carrossel animado). Corrigi a virada de página (mostrava o verso do papel) e o leque de cópias do filme 3D.
O filme 3D do Cerra.AI ("o cobre") está renderizado em `marketing/filmes/out/` e **espera o aval do Renato**
antes de publicar; se ele não gostar, apagar `marketing/filmes/cerraai-cobre/`. O `/portfolio/` continua como
estava (o hero 3D foi reprovado e revertido, não refaça). Para continuar: re-renderizar as ~104 campanhas com
a nova gramática e seguir as pendências de "Portfólio e vídeos (de 31/10 a 02/11)".
```
