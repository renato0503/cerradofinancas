# Estudo: github.com/drix10/ai-resources (02/11/2026)

Pedido do Renato: ver o que esse repositório tem de útil para o marketing e para a construção de sites.

## O que é

Um **acervo de notícias de IA**, não um kit de ferramentas: mais de 100 mil "briefings" curtos em Markdown, em 41
categorias, atualizados todo dia desde nov/2024. Cada briefing resume um post (quase sempre do X/Twitter) em 2 ou 3
frases com pontos-chave e o link da fonte. Licença **CC BY 4.0**: pode usar, inclusive comercialmente, **citando a
fonte**. O código do servidor MCP é MIT.

Formas de acesso, nenhuma pede chave:
- **Servidor MCP:** `claude mcp add ai-resources -- npx -y ai-resources-mcp`, com as ferramentas `search_briefings`,
  `latest`, `get_briefing` e `list_categories`.
- **Skill para agentes:** a pasta `skills/ai-news` do repositório. Copiar para `.claude/skills/ai-news/`.
- **API JSON:** `https://blogs.drix10.com/api/articles?q=<palavras>&since=AAAA-MM-DD`.
- **llms.txt e RSS:** `https://blogs.drix10.com/llms.txt`.
- **Páginas por tema:** a pasta `topics/` traz 24 temas, entre eles `video-generation.md`, `mcp.md`, `anthropic.md` e
  `open-weight-models.md`.

Categorias que tocam no nosso trabalho:
- AI for Content Creation and Marketing
- AI Developer Tools
- Devs, Designers, DevRel
- AI Generated Music and Audio
- AI Powered Film and Media
- AI Education
- AI in Enterprise Applications

## O que serve para nós

1. **Pauta para o @cerra.ai, a CerraClass e as palestras (o uso mais útil).** Uma série semanal "IA da semana",
   com 3 notícias que importam para empresas e o que elas mudam na prática, sempre puxando para IA local e LGPD no
   Cerra.AI e para o "aprenda a usar" na CerraClass. A skill `ai-news` ou o MCP buscam as notícias com data e fonte.
   **Regra:** abrir o post original e conferir o número antes de usar. O briefing é resumo de post de rede social,
   não fato verificado, e muita coisa é anúncio de produto. Nada de copiar o texto: reescrever em português e citar
   a fonte.
2. **Radar de ferramentas do estúdio.** O acervo cita ferramentas que já usamos ou avaliamos (contagem de arquivos
   que mencionam cada uma, em 02/11):
   - HyperFrames (20), GSAP (24), Remotion (8), Lottie (2) e Three.js (166);
   - Claude Code (341) e Claude Design (9);
   - Kling (243) e Higgsfield (110).

   Vale uma busca por mês em `topics/video-generation.md` e na categoria Content Creation and Marketing antes de
   escolher ferramenta nova de vídeo, imagem ou voz. O briefing de 16/10, por exemplo, traz o HeyGen Video 1
   acessível por agente, e o HeyGen já aparece na skill `media-use` do estúdio.
3. **Base de demonstração para o Cerra.AI.** É um corpus grande, datado, com fonte e de licença aberta. Serve para
   montar uma demo de RAG ("pergunte sobre as notícias de IA") sem expor dado de cliente, com a citação da fonte em
   cada resposta, que é exatamente o que o Cerra.AI vende. A atribuição CC BY precisa aparecer na demo.
4. **Construção de sites: pouco.** Não há componentes, templates nem código de site. Só notícias sobre ferramentas
   (Framer, Webflow, landing pages), úteis apenas como radar.

## O que não serve

- Não é lista curada: é volume (cerca de 270 arquivos por categoria) e em inglês. Para escolher ferramenta, usar como
  ponto de partida e testar antes.
- Não usar números dos briefings em peça sem abrir a fonte original. O próprio repositório se diz "conferido contra a
  fonte", mas a fonte é um post de rede social.

## Se for adotar

- Instalar a skill só neste projeto: copiar `skills/ai-news` do repositório para `.claude/skills/ai-news/` e conferir o
  `SKILL.md` antes (o repositório foi clonado em 02/11 numa pasta temporária, que não ficou no projeto).
- Criar um gerador `marketing/tools/gerar_ia_da_semana.py` no padrão dos outros (carrossel + story + legendas +
  info.json, na identidade do Cerra.AI). Ele busca na API com `since=` de 7 dias e guarda as fontes no info.json para
  a revisão humana.
