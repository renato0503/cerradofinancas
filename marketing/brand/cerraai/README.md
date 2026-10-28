# Identidade Cerra.AI: "Silício local"

Vale para todas as peças do Cerra.AI (carrossel, story, vídeos). Cerrado Tech e Cerrado Finanças
continuam com a identidade do site (azul e dourado, `brand/tokens.css`).

## A ideia

O Cerra.AI roda no computador da empresa. A identidade sai do próprio produto:

- **o cobre** das trilhas da logo (o chip dentro da folha);
- **a tarja de anonimização**: o dado pessoal vira uma barra cobre (`.tarja`);
- **a etiqueta de citação**, no formato real da interface: `Trechos consultados: contrato.pdf (p. 2, 5)` (`.cita`).

## Cores

| Papel | Cor | Uso |
|---|---|---|
| Cobre | `#e2873b` | destaque, campos inteiros, tarjas, botão principal |
| Quase-preto (grafite) | `#0d0f0e` | fundo padrão e tinta sobre o cobre |
| Tinta clara | `#f1ece3` | texto corrido sobre o grafite |
| Tinta suave | `#a39d93` | texto de apoio |

São **duas cores**: cobre e grafite. Sem gradiente, sem brilho, sem azul ou roxo.

## Tipografia

- **Archivo** expandida (largura 125%), peso 900, **caixa alta**: títulos.
- **Archivo** normal: texto corrido.
- **JetBrains Mono**: citações, nomes de arquivo, rótulos técnicos.

Arquivos das fontes em `brand/fontes/` (servidos localmente, sem Google Fonts).

## Componentes (`marca.css`)

`.mega`, `.titulo`, `.rotulo`, `.sub`, `.tarja`, `.cita`, `.doc` (trecho de documento), `.resposta`,
`.linhas`, `.rota` (nuvem x local), `.parede` (tipos de arquivo), `.cenarios`, `.emblema` (logo grande
sangrando na borda; use `data-sangra` para o verificador ignorar), `.slide.cobre` (slide com fundo cobre).

## Vídeos

Em `filmes/cerra-ai-comercial` (15s) e `filmes/cerra-ai-lancamento` (30s, minimalista P&B; a cor só
entra na logo final). O emblema 3D é a logo real em camadas empilhadas.

## O que pode e o que não pode afirmar

Ver a regra 8 do `HISTORICO.md` (100% local, zero requisições externas, offline, RAG com citação,
OCR e transcrição offline, anonimização e auditoria; nada de download, cliente, nuvem, certificação).
