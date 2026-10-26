# Próximos passos: Cerrado Finanças & Tech

Ponto de partida para retomar o trabalho. Última atualização: 26/10/2026.

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

**Marketing:** 19 campanhas publicadas (lançamento, 4 frentes, 13 cursos, folinha animada). Detalhes em `marketing/HISTORICO.md`.

## Pendências

### Site
- [ ] **`gerar_gamma.py` tem uma API key do Gamma escrita no código.** O arquivo nunca foi commitado; mover a
      chave para variável de ambiente antes de qualquer commit e, se ela já circulou, trocá-la no Gamma.
- [ ] **Sitemap incompleto:** faltam `/portfolio/`, `/iafarma/`, `/iacao/`, `consultorias.html` e as páginas de
      produto e GovTech.
- [ ] Os cards de "Cursos" no site (`/cursos/` e a home) citam só IA na Prática e IA em Ação Farma; o catálogo da
      Cerraclass tem mais 11 cursos presenciais que poderiam aparecer lá.
- [ ] `analyze_pages.py` teve o caminho corrigido para `D:\Dev\cerradofinancas` (projetos migrados de
      `C:\Users\Renato\Documents`); outros scripts antigos podem ter o mesmo problema.

### Marketing
- [ ] Ouvir o áudio dos Reels antes de postar (sons sintetizados, nunca revisados por uma pessoa).
- [ ] Confirmar o tamanho de turma da Cerraclass: as landings dizem 10, o catálogo diz até 15.
- [ ] Espaço no GitHub Pages: `marketing/entregas/` usa ~405 MB de 1 GB (ver `marketing/HISTORICO.md`).

## Como publicar uma mudança

Commit na `main` e `git push`: o GitHub Pages reconstrói o site em 1 a 2 minutos
(acompanhe com `gh run list -R renato0503/cerradofinancas --workflow pages-build-deployment`).
Depois, confira as páginas alteradas no ar (Ctrl+F5 para fugir do cache).
