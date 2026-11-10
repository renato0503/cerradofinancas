# Identidade CerraFood: "Comanda"

Vale para todas as peças do CerraFood, a plataforma white label para pizzaria da Cerrado Tech
(carrossel, story, carrossel animado). Criada em 10/11/2026. Gerador: `tools/gerar_cerrafood.py`.

## A ideia

O CerraFood é **white label**: a pizzaria recebe site, app, totem e painel com o nome, a logo e as cores
**dela**. Por isso a identidade tem dois recursos que nenhuma outra marca da Cerrado usa:

- **o espaço "sua marca aqui"** (`.suamarca`): um selo tracejado, vazio, onde entraria a logo do cliente. **Só na
  campanha "White label"** (`2026-11-cerrafood-sua-marca`): nas outras ficou fora de contexto (Renato, 10/11);
- **a comanda térmica** (`.comanda`): o papel que o próprio sistema imprime, com letra de impressora e picote.

## Cores (da logo, a árvore)

| Papel | Cor | Uso |
|---|---|---|
| Verde-mata | `#0f2a16` | fundo padrão |
| Laranja | `#f39200` | o "Food" da logo: destaque, slide "Em uma frase" e CTA |
| Verde-folha | `#3dbb2f` | "pronto", "no tempo" (tela da cozinha) |
| Tomate | `#e0472b` | "atrasado" (tela da cozinha) e molho; nunca fundo |
| Papel | `#fbf6ea` | comanda, totem e o slide claro (`.papel`) dos aparelhos |
| Creme | `#f4efe2` | texto sobre o verde-mata |

## Tipografia

- **Outfit** 800 (geométrica arredondada, como o nome na logo): títulos, em caixa baixa.
- **Outfit** 400 e 600: texto.
- **DM Mono**: rótulos, comanda e números. Não tem o glifo "½": escrever "1/2".

## Logo

A original (`img/cerrafood.png`) vem em fundo branco. `python tools/recortar_logo_cerrafood.py` gera
`brand/cerrafood/simbolo.png` (a árvore) e `logo.png` (árvore + nome), com transparência. O "Cerra" é verde-escuro e
some no fundo verde-mata: nas peças, a árvore vai **sempre dentro de um selo ou disco de papel**, e o nome é
escrito em texto ("Cerra" creme + "Food" laranja).

## Componentes (`marca.css`)

`.mega`, `.titulo`, `.rotulo`, `.sub`, `.base` (bloco de conteúdo ancorado acima do rodapé), `.linhas`, `.passos`,
`.fluxo` (o caminho do pedido), `.aparelhos` (site, app e totem em três marcas de exemplo), `.kds` (tela da cozinha),
`.monta` (montagem da pizza no totem), `.comanda`, `.custo` (pizza em fatias de custo), `.abc`, `.mapa` (mapa de
calor), `.niveis` (fidelidade), `.perfis` (equipe), `.selo` ("Exemplo ilustrativo"), `.emblema` (disco com a árvore,
sangrando na capa), `.slide.laranja` e `.slide.papel`.

## Movimento

`brand/movimentos.json`, entrada `cerrafood`: "Kitchen ticket" / "Order journey". A comanda sai da impressora: entra
de baixo e encaixa curto (`back.out(1.15)`), troca deslizando (0,4 s).

## O que pode e o que não pode afirmar

Fonte: o código do sistema (`D:\Dev\NapoleFood`, conferido em 10/11/2026).

**Pode:** totem de autoatendimento e QR Code; montagem com tamanho, sabores (até o máximo do tamanho) e borda;
meio a meio pela regra da casa (sabor mais caro ou média); caixa com abertura, sangria, suprimento e fechamento com
conferência (diferença alta pede confirmação); registro de PIX, cartão e dinheiro; impressora térmica USB pelo
navegador, sem travar a venda; tela da cozinha com cor por espera (verde até 15 min, amarelo até 25, vermelho
depois); ficha técnica com custo recalculado quando o ingrediente muda; baixa automática de estoque, alerta de
mínimo, devolução no cancelamento; taxa e tempo de entrega por bairro; painel do entregador no navegador;
acompanhamento do pedido pelo link; WhatsApp **por link** (a pessoa envia); pontos por real gasto e níveis
(Bronze, Prata, Ouro, Platina); cadastro de clientes; DRE, curva ABC, mapa de calor, períodos de hoje/7/30/90 dias e
exportação em CSV; perfis de acesso e auditoria; app instalável pelo navegador (PWA); white label (nome, logo, cores).

**Não pode:** nome de cliente ou da primeira implantação (pedido do Renato em 10/11), case, número de resultado
("ticket médio 23% maior"), preço, prazo de implantação ("7 dias"); PIX ou cartão **integrados** (o pagamento é
registrado, não processado); NFC-e; iFood; WhatsApp automático ou robô (a integração com a Meta saiu do projeto
em 10/11); multi-loja, RH, ponto e escala (desligados); rastreio por GPS ("rastreio" é o status pelo link);
funcionamento offline (só o totem avisa e guarda o carrinho); exportação em PDF.

Telas, comandas, gráficos e marcas dos aparelhos são **exemplos ilustrativos** e levam o selo.
