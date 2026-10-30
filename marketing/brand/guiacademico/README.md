# Identidade Guia Acadêmico: "Artigo"

Vale para as peças do Guia Acadêmico (consultoria acadêmica, guiacademico.com.br, conta @guiacademico) e, desde
30/10/2026, para o próprio site (D:\Dev\GuiAcademico\index.html). O Guia orienta pesquisa científica, então cada peça é
diagramada como um artigo de periódico.

## A ideia

- **a cabeça corrida** (`.cabeca`): "Guia Acadêmico · Cadernos de método · nº 03", com filete duplo embaixo;
- **a rubrica de seção** (`.rubrica`): "§ 3 · Análise quantitativa", "1 · Introdução", "2 · Na prática"…;
- **resumo e palavras-chave** na capa (`.resumo`, `.chaves`);
- **as subseções numeradas** (`.secoes`): 3.1, 3.2…;
- **o controle de alterações** (`.revisao`): a versão riscada em vermelho de caneta e a revisada com filete dourado;
- **o quadro com filetes** (`.quadro`), com "Quadro 3 · …" em cima e "Fonte: …" embaixo, como tabela de artigo;
- **a nota de rodapé** (`.nota-rodape`): chamada ¹ no texto e a nota acima do rodapé (exemplos ilustrativos dizem isso aqui);
- **a nota do orientador** (`.slide.tinta`): o slide invertido em azul-marinho, sempre com "Você continua sendo o autor";
- **a bússola** da logo como marca d'água sangrando na borda (`.bussola`).

## Cores

| Papel | Cor | Uso |
|---|---|---|
| Papel | `#f6f2e9` | fundo |
| Azul-marinho | `#1e2a44` | texto, filetes, slide invertido, botão |
| Dourado | `#a8822a` | rubricas, números, selo |
| Dourado claro | `#d9b46a` | destaque sobre o azul, filete do resumo |
| Marca-texto | `#ecdba8` | o sublinhado largo da palavra em destaque |
| Caneta | `#a8322a` | só no riscado da revisão |

## Tipografia

**Newsreader** 600 nos títulos e 400 no texto, com a palavra em destaque em **itálico 400 com marca-texto**
(`*palavra*` no gerador). **DM Mono** 400/500 nas rubricas, números de seção, cabeça e rodapé.
Arquivos em `brand/fontes/` (fontsource 5.2.10, subconjunto latin). No site, as duas vêm do Google Fonts.

## Marca

`logo.png` (bússola + "Guia Acadêmico · Seu Mentor", fundo transparente) e `logo-icone.png` (só a bússola), recortados
de `D:\Dev\GuiAcademico\logo3d.png`. O rodapé das peças usa a bússola + "Guia Acadêmico · Seu mentor".

## Regras de conteúdo

- **Ética em toda peça:** "Não executamos trabalhos por terceiros". O Guia orienta, capacita, analisa dados e revisa;
  o autor é o aluno. Nada de "fazemos o seu TCC", "limpeza de plágio" ou parecido.
- **Sem preço** nas peças (o site tem a tabela) e **sem os números do site** (+120 trabalhos, 94% de aprovação,
  10+ anos) até o Renato confirmar.
- Exemplo com número é ilustrativo e a nota de rodapé diz isso.
- Fatos conferidos em 30/10/2026: NBR 6023 (referências), 10520 (citações) e 14724 (trabalhos acadêmicos);
  Resoluções CNS 466/2012 e 510/2016 e Plataforma Brasil; PRISMA 2020; o cálculo de 292 respondentes
  (N = 1.200, 95%, 5%, correção para população finita).

## Gerador

`tools/gerar_guiacademico.py` (15 temas em `TEMAS`) → `posts/2026-11-guiacademico-<tema>/` → exportar, verificar e
`filmes/ferramentas/animar-carrossel.mjs --clima pb` → `tools/agendar.py 2026-10-31` → `tools/publicar.py`.
