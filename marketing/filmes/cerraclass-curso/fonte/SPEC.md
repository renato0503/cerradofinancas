# CerraClass: comercial de 15s por curso (modelo com variáveis)

GOAL:    quem assiste sabe qual é o curso, que é presencial, prático, em turma de até 10, e onde se inscrever.
OUTPUT:  HyperFrames, 1920x1080 (16x9/) e 1080x1920 (9x16/), 30 fps; um render por curso (ferramentas/render-cursos.mjs)
TIME:    15 s x 30 = 450 quadros; 120 BPM, compasso de 2 s
LOOK:    duas cores: o fundo do curso (var cor, o mesmo do carrossel) e quase-preto #141414; branco só no ingresso.
         Display: Bricolage Grotesque 800, largura 78%, caixa alta, 120-260 px.
         Produto: o ingresso do curso, 760x440, com 8 camadas de espessura (12 px), frente branca e verso na cor do curso com a logo.
MOTION:  entradas expo.out 0,5 s; saídas power3.in 0,2 s; chicote com desfoque de 12 px; eco de 3 cópias;
         molas back.out(1.6) nos cards e nas cadeiras (posição e escala, nunca opacidade).
SHOTS:   0,0-1,45   ponto na cor do curso explode e cobre a tela
         1,45-3,6   FRASE 1 "Pare de só usar IA." palavra por palavra
         3,6-5,2    close no ingresso: título e cadeiras (fundo preto)
         5,2-7,8    FRASE 2 = nome do curso atrás do ingresso girando
         7,8-10,2   cards: "Você sai com" + primeiro entregável / formato do curso
         10,2-11,6  FRASE 3 "Turma de até 10 alunos" com as 10 cadeiras saltando
         11,6-12,6  PRESENCIAL. PRÁTICO. EM CUIABÁ.
         12,6-15,0  logo CerraClass + "Construa com ela." + cerraclass.com.br
BANNED:  preço, data de turma, citação inventada, gradiente, glow, logo no canto.
FATOS:   nome, formato e entregável vêm de dados/cerraclass-cursos.json (e das landings, para IA na Prática e IA em Ação Farma).
