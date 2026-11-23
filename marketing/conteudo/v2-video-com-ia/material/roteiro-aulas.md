# Roteiro de aulas — Vídeo com IA

> Para o instrutor, o diretor de gravação e os parceiros de produção.
> Cada módulo abaixo serve para a **maratona ao vivo** e para a **videoaula gravada**.
> Duração total: 8h ao vivo ou ~4h de vídeo + exercícios.

## Antes de gravar / entrar ao vivo

- [ ] Contas criadas e logadas: ChatGPT, Claude, Gemini, HeyGen, Higgsfield.
- [ ] Template de vídeo baixado e testado (`dados.js` + render).
- [ ] 3 cenas de Genjutsu **pré-renderizadas** (não dependa da fila ao vivo).
- [ ] 1 vídeo de celular de exemplo (4–30s) e 1 imagem de referência.
- [ ] Trilha e SFX licenciados na pasta do projeto.
- [ ] Slides abertos em `material/slides.html` (`?s=1`…).
- [ ] Apostila enviada ou disponível para download.
- [ ] Moderador com perguntas fixadas e link do suporte.

## Estrutura do dia

| Horário | Bloco | O que acontece |
|---|---|---|
| 08:00–08:20 | Abertura | Promessa, combinados e os três caminhos |
| 08:20–09:10 | Módulo 1 | O mapa do vídeo com IA |
| 09:10–10:00 | Módulo 2 | Roteiro em 15 minutos |
| 10:00–10:15 | Intervalo | — |
| 10:15–11:30 | Módulo 3 | Apresentador, voz e legendas |
| 11:30–12:00 | Plantão 1 | Dúvidas e revisão de roteiros |
| 12:00–13:00 | Almoço | — |
| 13:00–14:15 | Módulo 4 | Vídeo por código com modelo pronto |
| 14:15–15:15 | Módulo 5 | Realismo com Genjutsu |
| 15:15–15:30 | Intervalo | — |
| 15:30–16:30 | Módulo 6 | Corte final e publicação |
| 16:30–17:00 | Projeto final | Brief, checklist e próximos passos |

---

## Módulo 0 · Abertura (20 min)

**Objetivo:** reduzir o medo e deixar claro o que a pessoa leva.

Fala:
- “Você não vai sair sabendo editar como um profissional. Vai sair com um vídeo publicado e um processo para repetir.”
- “Tem três caminhos. Se você nunca editou, fique no A. Se já mexe com ferramentas, vá para o B. Quem programa pode ir ao C.”
- “A IA erra. A gente confere.”

Tela: slide 1 e 2. Mostrar a pasta do kit e onde ficam os arquivos.

Checkpoint: ninguém precisa instalar nada para começar.

---

## Módulo 1 · O mapa (50 min)

**Objetivo:** entender que IA não elimina o processo, só acelera.

Fala:
- As cinco etapas: ideia, roteiro, imagem, montagem, publicação.
- O que a IA faz bem × o que continua sendo decisão humana.
- Limites: rosto, voz, direitos, informação.

Tela: slide 4 (timeline) e slide 5.

Exercício rápido (5 min): peça no chat “qual etapa você mais trava hoje?”. Use as respostas para conduzir o resto do dia.

Erro comum: prometer que a IA “faz tudo sozinha”. Corrija na hora.

---

## Módulo 2 · Roteiro (50 min)

**Objetivo:** cada pessoa sai com um roteiro de 15s.

Fala:
- Estrutura: gancho (0–3s), problema (3–8s), prova (8–13s), chamada (13–15s).
- Gancho é a parte mais importante. Teste três antes de escolher.
- Roteiro bom é curto: 40 palavras cabem em 15 segundos.

Tela: slide 6 e 7. Faça um roteiro ao vivo com um negócio sugerido pelo chat.

Exercício (15 min):
1. Preencher o quadro da apostila (negócio, público, objetivo, ação).
2. Rodar o prompt de roteiro.
3. Cortar para 40 palavras.

Checkpoint: leia em voz alta em 15 segundos. Se passar, corte.

---

## Módulo 3 · Apresentador, voz e legendas (75 min)

**Objetivo:** produzir um vídeo de 30s com avatar.

Fala:
- Avatar serve para conteúdo recorrente e institucional; não para depoimento real.
- Frases curtas e pausas melhoram a boca e a voz.
- Sempre revise legenda: nome, número e marca.

Tela: slide 8 e 9. Demonstre o caminho completo no HeyGen.

Exercício (30 min):
1. Escolher avatar e voz.
2. Colar o roteiro.
3. Gerar, baixar e ativar legenda.
4. Revisar e regravar se necessário.

Checkpoint: vídeo de 30s com legenda legível no celular.

Plano B: se a conta travar, use a gravação da demonstração e siga para o corte com o arquivo de exemplo.

---

## Módulo 4 · Vídeo por código (75 min)

**Objetivo:** entender o modelo “template + dados = vídeo” e gerar uma variação.

Fala:
- Por que código: repetir 10 vezes sem refazer a arte.
- HyperFrames (HTML + GSAP) e Remotion (React): o mesmo princípio.
- O agente escreve a cena; você revisa.

Tela: slide 10 e 11. Demonstre o caminho B (editar `dados.js` e renderizar) e mostre o caminho C (pedido ao agente).

Exercício (30 min):
- Caminho B: trocar textos, cor e logo; renderizar.
- Caminho A (sem terminal): montar a mesma cena no CapCut usando os assets.
- Caminho C: pedir uma variação ao agente e revisar o diff.

Checkpoint: um MP4 de 15s renderizado (ou projeto no CapCut).

Erro comum: tentar ensinar React para a turma inteira. Não. Mostre o resultado e deixe o código para quem quiser.

---

## Módulo 5 · Realismo com Genjutsu (60 min)

**Objetivo:** transformar um vídeo de celular em cena realista.

Fala:
- Video-to-video mantém movimento, câmera e tempo.
- Motion transfer troca personagem/cenário; object swap troca produto.
- Fila gratuita pode levar horas: use as cenas prontas.

Tela: slide 12 e 13. Mostre antes/depois lado a lado.

Exercício (25 min):
1. Escolher um vídeo de 4–30s.
2. Subir 1–8 imagens de referência.
3. Escrever o prompt de cena.
4. Comparar e escolher a melhor versão.

Checkpoint: a cena mantém o movimento original? Mãos e bordas estão corretas?

---

## Módulo 6 · Corte e publicação (60 min)

**Objetivo:** publicar o vídeo.

Fala:
- Gancho no primeiro segundo.
- Corte pausas; áudio na frente do corte bonito.
- Exporte 9:16, 16:9 e 1:1; guarde o projeto.

Tela: slide 14 e 15. Demonstre o corte no CapCut ou DaVinci.

Exercício (30 min):
1. Importar vídeo, trilha e legenda.
2. Cortar e legendar.
3. Exportar 9:16.
4. Preencher o checklist de publicação.

Checkpoint: o vídeo abre e toca no celular sem corte de áudio.

---

## Módulo 7 · Projeto final (30 min)

**Objetivo:** fechar com entrega e próximo passo.

Fala:
- Escolha um negócio real.
- O critério é clareza, ritmo, coerência e responsabilidade.
- Publique hoje. O resto é iteração.

Tela: slide 16 e 17.

Entrega: link do vídeo + checklist preenchido na área do participante.

---

## Plantões ao vivo (pós-curso)

- 1 encontro de 60 min por semana, durante 4 semanas.
- Pauta: dúvidas, revisão de vídeos enviados e uma demonstração nova.
- Gravar e disponibilizar por 7 dias.

## Perguntas que sempre aparecem

- **“Preciso pagar?”** Não para acompanhar. Créditos pagos aceleram a geração.
- **“Meu notebook roda?”** Navegador sim; DaVinci pede GPU; CapCut é a alternativa.
- **“Vou aparecer?”** Não. Avatar e cena gerada resolvem.
- **“Posso usar música do Instagram?”** Depende do uso. Para anuncio, use biblioteca licenciada.
