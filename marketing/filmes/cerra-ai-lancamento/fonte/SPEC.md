# Cerra.AI: lançamento de 30s (minimalista P&B)

GOAL:    entender em 30 s o que o Cerra.AI faz, vendo a interface: responde a partir dos documentos da empresa,
         cita a fonte, mascara dados pessoais e funciona offline, no computador da empresa.
OUTPUT:  HyperFrames, 1920x1080 (16x9/) e 1080x1920 (9x16/), 30 fps
TIME:    30 s x 30 = 900 quadros; 100 BPM (18 quadros por tempo)
LOOK:    fundo preto #000, tinta branca #fff, cinzas #8a8a8a e #2a2a2a para a interface; sem cor até a logo final.
         Headlines: Archivo 800, largura 100%, 104 px (vertical 92 px), -2% de tracking, revelação palavra por palavra.
         Interface: painéis #0e0e0e com borda #2a2a2a e raio 18 px, Archivo 30-34 px, JetBrains Mono nas citações.
OBJECTS: os rótulos reais da interface do Cerra.AI (static/index.html e app.js): "Documentos Vetorizados", "Espaço Local · ChromaDB",
         "Como posso auxiliar sua organização hoje?", "Escreva uma pergunta ou anexe arquivos...", "Trechos consultados: arquivo (p. N)",
         "Anonimizar", "Modo Offline", "Processamento Local".
MOTION:  palavra: blur 8 px → 0 e opacidade 0 → 1 em 0,13 s, 0,07 s entre palavras, sem deslocamento;
         painéis entram com expo.out 0,7 s e rastro de eco (3 cópias a 0,05 s); saídas com desfoque 0,3 s; nenhum corte seco.
SHOTS:   0,0-2,6    logo de abertura em P&B, sai em desfoque
         2,6-7,2    "Sua empresa tem documentos que não podem sair dela." + lista Documentos Vetorizados
         7,2-12,2   "O Cerra.AI responde a partir deles." + conversa
         12,2-16,6  "Toda resposta mostra de onde veio." + a mesma conversa ampliada na citação
         16,6-21,2  "Dados pessoais são mascarados antes do modelo." + tarjas sobre CPF, RG, telefone
         21,2-25,2  "Funciona offline. Zero requisições externas." + status Modo Offline
         25,2-27,0  as linhas da interface voam ao centro e formam o emblema
         27,0-30,0  emblema em cor + CERRA.AI + "A IA que roda no seu computador" + endereço
BANNED:  cor antes da logo, glow, partículas, cortes secos, dashboard inventado, números de desempenho.
FATOS:   regra 8 do HISTORICO. Exemplos de arquivo e de pergunta são ilustrativos (não são de cliente).
