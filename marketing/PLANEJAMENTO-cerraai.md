# Planejamento de conteúdo: Cerra.AI

Aprovado em 28/10/2026 ("ótimo, pode começar") e produzido no mesmo dia.

Fontes:
- o projeto `D:\Dev\Cerra.AI` (README, `docs/FUNCIONALIDADES.md` com o status de cada função e os 3 cenários em
  `profiles/`);
- a página `cerraai.html`;
- a regra 8 do `HISTORICO.md`.

**O problema:** o @cerra.ai só tem conteúdo até 31/10 (1 carrossel e 2 Reels). A meta é postar todo dia.

---

## 1. O que a pessoa e a empresa ganham: os gatilhos de uso

Seis motivos fazem alguém procurar uma IA local. Cada um vira mensagem e série:

| # | Gatilho | A frase que o cliente pensa | A prova no Cerra.AI |
|---|---|---|---|
| 1 | **Sigilo profissional** | "Não posso colar o processo do cliente no ChatGPT." | Roda 100% na máquina, sem nenhuma requisição externa (teste de interface) |
| 2 | **LGPD** | "Se vazar dado de paciente, a responsabilidade é minha." | Anonimiza antes do modelo, minimização de dados (art. 6º, III), auditoria mascarada, direito ao esquecimento com exclusão física |
| 3 | **A equipe já usa IA escondida** | "Meu time cola contrato em qualquer chat da internet." | Uma IA oficial, dentro de casa, com regras e registro de uso |
| 4 | **Informação perdida** | "A resposta está em algum PDF, áudio ou planilha... mas onde?" | Lê PDF, inclusive escaneado (OCR), Word, Excel, PowerPoint, imagem, áudio e vídeo (transcrição), tudo offline |
| 5 | **Confiança na resposta** | "IA inventa. Como eu confiro?" | Mostra de onde veio ("Trechos consultados: contrato.pdf (p. 2, 5)") e diz quando a informação não consta |
| 6 | **Foco e ética por área** | "Não quero uma IA que fale de tudo nem que ensine o errado." | Bases isoladas por área, recusa perguntas fora do tema e tem limites éticos (não orienta sonegação, não muda dose sem o médico, não orienta coação de testemunha) |

---

## 2. Para quem falamos

- **Quem decide:** dono ou sócio de escritório (contábil, advocacia), gestor de clínica, diretor jurídico ou de
  compliance, gestor público e encarregado de dados (DPO).
  - A pergunta dele: "é seguro e me ajuda a cumprir a lei?"
- **Quem usa:** analista, advogado, estagiário, enfermagem, faturamento e servidor.
  - A pergunta dele: "acho a resposta mais rápido?"
- **Quem cuida da TI:** a pergunta dele é "dá trabalho?". O site promete implantação e manutenção pela nossa equipe.

---

## 3. As séries (25 posts)

### Série A: "Na sua área" (9 posts), exemplos de uso por setor

Formato: a dor do setor → a pergunta digitada na tela do Cerra.AI → a resposta com "Trechos consultados" → o que
fica protegido (a tarja) → o que ele **não** faz (limite ético) → chamada para uma demonstração com o caso do cliente.

**Toda peça leva o selo "Exemplo ilustrativo"**: não temos cliente nem case para divulgar.

| # | Área | Exemplo de pergunta (ilustrativo) | Base no projeto |
|---|---|---|---|
| A1 | Escritório de contabilidade | "Quais clientes do Simples estão com DCTFWeb pendente?" + relatório da carteira | Cenário pronto |
| A2 | Advocacia criminal | "Quais prazos vencem nesta semana na carteira?" + contagem do art. 798 do CPP | Cenário pronto |
| A3 | Clínica de oncologia | "Qual é o protocolo da clínica para neutropenia febril?" (e quando acionar o médico) | Cenário pronto |
| A4 | RH e departamento pessoal | "Quantos dias de licença o regulamento interno dá para o casamento?" | Documento de demonstração (`regulamento_rh`) |
| A5 | Gestão pública | "O edital exige atestado de capacidade técnica? Em que item?" | Site (editais, Lei 14.133) |
| A6 | Cartórios | "Qual provimento trata deste ato?" | Site e paper |
| A7 | Jurídico e compliance corporativo | "Este contrato tem multa por rescisão? Em qual cláusula?" | Site (contratos, due diligence) |
| A8 | Saúde e home care | "Qual é o checklist da rotina de cuidado do paciente?" | Site (integração com o CerraCare) |
| A9 | Indústria e operação | "O manual diz qual torque para esta peça?" (segredo industrial que não sai de casa) | Site |

A1 a A3 mostram cenários que já existem. A4 a A9 são usos possíveis: o painel `/admin` cria cenários novos (testado).
O texto diz "pode ser configurado para", nunca "já atende".

### Série B: "Por que local?" (6 posts), os gatilhos

| # | Gancho (rascunho) |
|---|---|
| B1 | Sigilo profissional: "O sigilo do seu cliente cabe num chat da internet?" |
| B2 | LGPD: "A melhor forma de proteger um dado é ele não sair de casa." |
| B3 | IA escondida: "A sua equipe já usa IA. A pergunta é: qual, e com quais dados?" |
| B4 | Sem internet: "Caiu a internet. O Cerra.AI continua respondendo." |
| B5 | Resposta com fonte: "Uma IA que mostra a página de onde tirou a resposta." |
| B6 | Arquivo esquecido: "Aquela reunião gravada também vira resposta." |

### Série C: "Mostra como faz" (6 posts), tutoriais curtos de uma função cada

| # | Função | Status no projeto |
|---|---|---|
| C1 | Anexar o áudio de uma reunião e perguntar o que foi decidido (transcrição com marca de tempo) | ✅ |
| C2 | PDF escaneado: o OCR lê a página e a resposta cita a página | ✅ |
| C3 | Relatório LGPD em poucos cliques: os dados são anonimizados antes de chegar ao modelo | ✅ |
| C4 | Anonimizar um texto antes de mandar por e-mail (nada é gravado) | ✅ |
| C5 | Uma base por cliente ou por área: o que está num workspace não aparece no outro | ✅ |
| C6 | Direito ao esquecimento: apagar um documento de verdade, do disco | ✅ |

### Série D: "Mitos da IA local" (4 posts), objeções respondidas com honestidade

| # | Mito | Resposta (o que podemos dizer) |
|---|---|---|
| D1 | "IA local precisa de um supercomputador." | Roda numa máquina com placa de vídeo comum; o roteador escolhe o modelo certo para cada pergunta. **Sem promessa de desempenho** em outra máquina |
| D2 | "IA sempre inventa." | Diz quando a informação não consta e mostra a fonte. Revisar continua sendo papel da pessoa (nunca "sempre correto") |
| D3 | "Para ter IA eu preciso de uma equipe de TI." | A implantação e a manutenção ficam com a nossa equipe (está no site) |
| D4 | "IA corporativa é tudo igual." | Comparativo genérico com a IA na nuvem: onde fica o dado, se precisa de internet, se cita a fonte |

---

## 4. Formato e identidade

- **Identidade:** a "Silício local" (cobre e grafite, Archivo, JetBrains Mono), que já existe.
- **Recurso novo:** a **tela do Cerra.AI** em cada post da Série A e da Série C: a pergunta, a resposta e a etiqueta
  "Trechos consultados". Usa `.resposta`, `.cita` e `.tarja`, que já estão no `marca.css`.
- **Peças por campanha:** carrossel de 6, story, carrossel animado (o vídeo padrão) e legendas de Instagram e LinkedIn.
- **Selos:** "Exemplo ilustrativo" em toda a Série A; "Função disponível hoje" na Série C.

## 5. Chamadas

| Série | Chamada |
|---|---|
| A | "Peça uma demonstração com o seu caso" (WhatsApp e `/cerraai`) |
| B | "Salve e mostre para o seu sócio" e "Fale com um especialista" |
| C | "Quer ver ao vivo? Agende uma demonstração" |
| D | "Mande a sua dúvida nos comentários": a pergunta vira post |

## 6. Calendário no @cerra.ai

- **Até 31/10:** o que já existe.
- **De 01/11 a 25/11:** 1 post por dia, alternando as séries (A, B, C, A, D, ...), começando pelos 3 cenários prontos
  (A1 a A3).
- **Para cobrir dezembro sem conteúdo novo:** o carrossel animado de cada campanha sai como **Reel separado**, de 3 a
  5 dias depois do carrossel. Com isso o @cerra.ai fica coberto até o fim de dezembro com 1 a 2 posts por dia,
  dentro da regra. O `agendar.py` trata o Reel como uma postagem a mais, como já faz com o CerraClass.

## 7. O que nunca entra (regra 8)

- Cliente, case ou depoimento.
- Download disponível (o executável não foi publicado).
- Nuvem ou multiusuário.
- Certificação LGPD. O texto diz "ajuda a cumprir".
- "Sempre correto".
- Desempenho medido fora da máquina de teste.
- A Freedom Tier.
- Que as bases dos cenários foram revisadas por especialistas.
- Preço e prazo de implantação.

## 8. Para decidir antes de produzir

1. **Prints da interface real.** Posso usar capturas reais do Cerra.AI rodando (com dados fictícios), ou só a tela
   desenhada?
2. **Áreas além dos 3 cenários** (RH, gestão pública, cartórios, jurídico, home care, indústria). Entram como "pode
   ser configurado para"?
3. **O paper do WESAAC 2026.** Foi aceito ou apresentado? Se sim, "apresentado no WESAAC 2026" é uma boa prova. O paper
   também diz "em uso produtivo na instituição implantadora": isso pode ir para as peças?
4. **A oferta.** Como se contrata: demonstração, instalação na máquina do cliente, mensalidade? Hoje as peças só
   chamam para a demonstração.
5. **LinkedIn.** O Cerra.AI tem página própria no LinkedIn, ou as legendas vão para o perfil da Cerrado Tech?
6. **Reel reaproveitado.** Aprova postar o carrossel animado como Reel separado para cobrir dezembro?

## Decisões tomadas (28/10)

O Renato aprovou o plano sem responder às perguntas da seção 8. Adotei o caminho mais seguro:

1. A tela é desenhada, sem capturas reais.
2. As áreas além dos 3 cenários entram como "cenário configurável".
3. O paper do WESAAC e o "uso produtivo" não entram.
4. A chamada é só para a demonstração.
5. A legenda do LinkedIn é neutra, serve para qualquer perfil.
6. O carrossel animado sai como Reel separado.
