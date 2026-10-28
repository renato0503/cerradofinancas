# Próximos passos: Cerrado Finanças & Tech

Ponto de partida para retomar o trabalho. Última atualização: 28/10/2026.

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

**Marketing:** 20 campanhas publicadas (lançamento, 4 frentes, 13 cursos, folinha animada e Cerra.AI). Detalhes em `marketing/HISTORICO.md`.
Em 28/10, Cerra.AI e CerraClass (com os cursos) ganharam **identidade visual própria** e vídeos novos em
HyperFrames (16:9 e 9:16); Cerrado Tech e Cerrado Finanças seguem com a identidade do site.

## Pendências

### Site
- [ ] **Trocar a chave da API do Gamma**, caso ela tenha circulado. A chave saiu do código (agora vem de
      `GAMMA_API_KEY`) e `gerar_gamma.py` entrou no `.gitignore`, mas a chave antiga continua válida no Gamma.
- [ ] `analyze_pages.py` teve o caminho corrigido para `D:\Dev\cerradofinancas` (projetos migrados de
      `C:\Users\Renato\Documents`); outros scripts antigos podem ter o mesmo problema.
- [ ] `/iacao/` ainda mostra preço (R$ 300 individual / R$ 1.800 equipe) enquanto `/iafarma/` ficou "sob consulta".
      Decidir se os dois ficam igual.
- [ ] No catálogo da CerraClass, "turma de no máximo 15 alunos" ainda diz 15. A decisão é 10 — alinhar lá
      (o site e as peças já dizem 10).

### Marketing
- [ ] Ouvir o áudio dos Reels antes de postar (sons sintetizados, nunca revisados por uma pessoa).
      Medido em 26/10 com `marketing/tools/conferir_audio.py`: os 19 vídeos têm trilha, sem clipping e sem
      silêncio longo. O nível está baixo (RMS ≈ -28 dBFS) — vale ouvir e decidir se sobe o volume.
- [ ] Ajustar o catálogo da CerraClass para 10 alunos por turma (ver acima).
- [ ] Ouvir as trilhas novas dos vídeos HyperFrames (sintetizadas por `marketing/filmes/ferramentas/trilha.mjs`; volume já medido, escuta pendente).
- [ ] **Falta conteúdo para manter 1 post por dia:** o @cerra.ai só tem posts até 31/10 (1 carrossel e 2 Reels) e
      o @cerraclass, até 25/11. O @cerradofinancas está coberto até 30/12 com 1 por dia. Ver a aba Agenda da Central.
- [ ] Consultoria acadêmica: definir a conta (Instagram próprio ou @cerradofinancas) e criar a identidade e o conteúdo.
- [ ] Crédito: decidir a cidade do atendimento presencial (a LS fica em Campo Grande-MS; o `/credito` diz Cuiabá),
      se o consignado do INSS continua no site (o portfólio da LS lista o INSS só no empréstimo pessoal) e se as peças
      usam o WhatsApp da LS. As peças hoje não citam cidade e usam o WhatsApp da Cerrado.
- [ ] Consultorias: confirmar se os números do site (50+ projetos, R$ 2 bi, 12 anos, "até 40%") podem ir para anúncio.
- [ ] Contabilidade: confirmar se atendem Lucro Real (as peças ainda não citam) e, quando houver, incluir o nome e
      o CRC do responsável técnico. A série "Você sabia?" foi conferida com a lei em 28/10/2026; revisar se algo mudar
      antes da data de cada post.

## Como publicar uma mudança

Commit na `main` e `git push`: o GitHub Pages reconstrói o site em 1 a 2 minutos
(acompanhe com `gh run list -R renato0503/cerradofinancas --workflow pages-build-deployment`).
Depois, confira as páginas alteradas no ar (Ctrl+F5 para fugir do cache).
