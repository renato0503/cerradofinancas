# CerraClass: lançamento de 30s, estilo App Store

GOAL:    ver o catálogo da CerraClass funcionando no celular e sair com: 11 cursos presenciais em Cuiabá, um sábado ou
         uma imersão, projeto pronto no fim, turma de até 10.
OUTPUT:  HyperFrames, 1920x1080 (16x9/) e 1080x1920 (9x16/), 30 fps
TIME:    30 s x 30 = 900 quadros; 120 BPM
LOOK:    fundo #0f0f0f com três brilhos de cor dos cursos (amarelo-ipê #ffc83d, verde #4cc274, coral #ff7a5c) a 35%, desfoque 140 px
         (pedido explícito do prompt). Headline Bricolage 800 condensada, caixa alta, 110 px; a palavra-chave em amarelo-ipê.
         iPhone em CSS 3D (400x820, raio 64, 6 placas de espessura), girado -16° em Y e 5° em X, flutuando.
         Telas do app na identidade CerraClass: fundo branco, Bricolage, cores dos cursos.
OBJECTS: telas: catálogo, categorias, página do curso (Excel com IA) com a régua do sábado, "Você sai com", turma de até 10.
         Conteúdo real do catálogo (dados/cerraclass-cursos.json).
MOTION:  troca de tela com desfoque (8 px, 0,2 s); zoom na tela 0,6 s power2.inOut; cards saltam do celular com back.out(1.6);
         headline palavra por palavra (blur 8 → 0, 0,07 s).
SHOTS:   0,0-5,6    "11 cursos presenciais em Cuiabá." + catálogo
         5,6-10,4   "Escolha pelo que você quer construir." + categorias
         10,4-15,2  "Um sábado ou uma imersão." + página do curso, zoom na régua
         15,2-20,0  "Você sai com o projeto pronto." + 3 cards saltam do celular
         20,0-24,6  "Turma de até 10 alunos." + cadeiras e 3 cards de inclusos
         24,6-27,2  cinco celulares em leque
         27,2-30,0  logo CerraClass + "Pare de só usar IA. Construa com ela." + cerraclass.com.br
BANNED:  preço, data, depoimento inventado, número de alunos formados, logo no canto.
