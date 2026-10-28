# Cerra.AI: comercial de 15s

GOAL:    quem assiste sai sabendo uma coisa: o Cerra.AI é uma IA que roda no computador da empresa, e o documento não sai dali.
OUTPUT:  HyperFrames, 1920x1080 (index.html) e 1080x1920 (vertical.html), 30 fps
TIME:    15 s x 30 = 450 quadros; 120 BPM, 15 quadros por tempo, compasso de 2 s
LOOK:    duas cores: cobre #e2873b e quase-preto #0d0f0e, sempre em campos chapados, sem gradiente, sem brilho.
         Display: Archivo 900, largura 125%, caixa alta, -1,5% de tracking, 120-170 px.
         Produto: o emblema real do Cerra.AI (assets/emblema.png) com 16 camadas empilhadas a 2 px = 30 px de espessura.
OBJECTS: o emblema (folha + gavião + chip), visto de frente, de lado e no close do chip.
MOTION:  entradas expo.out 0,5 s; saídas power3.in 0,2 s (40% da entrada); chicote horizontal com desfoque de 12 px;
         rastro de eco: 3 cópias a 0,04 s, opacidade 0,35/0,2/0,1; giro do emblema linear.
SHOTS:   0,0-1,45   ponto cobre nasce no centro e explode até cobrir a tela (riser + impacto; a música entra no impacto)
         1,45-3,7   FRASE 1 em preto sobre cobre, palavra por palavra em chicote: "Seus documentos não saem da sua máquina."
         3,7-5,5    close no chip do emblema em fundo preto, o emblema gira 50° (impacto grave)
         5,5-8,0    FRASE 2 com o emblema girando à frente: "Roda no seu computador."
         8,0-10,4   dois cards cobre saltam ao redor do emblema: "Zero requisições externas" / "Arquivo e página em toda resposta"
         10,35-11,6 íris cobre abre do centro do emblema; FRASE 3 em preto: "Funciona offline."
         11,6-12,6  três palavras em corte seco: LOCAL. PRIVADO. AUDITÁVEL.
         12,6-15,0  o emblema assenta, CERRA.AI entra em wipe, tagline e endereço
BANNED:  fundo azul/roxo, gradiente, glow, partículas, cards de vidro, logo no canto, texto se mexendo enquanto é lido.
QA:      0,9 (ponto), 2,6 (frase 1 completa), 4,6 (close), 7,0 (frase 2), 9,6 (cards), 11,3 (frase 3), 12,9 (palavra 3), 14,6 (logo).
FATOS:   tudo vem das peças aprovadas (HISTORICO, regra 8): 100% local, zero requisições externas, offline,
         citação de arquivo e página, anonimização e auditoria. Sem download, sem cliente, sem certificação.
