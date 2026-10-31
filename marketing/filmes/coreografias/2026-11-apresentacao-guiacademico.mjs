// Guia Acadêmico, "Artigo": um periódico sendo composto. Calmo e preciso: os fios do cabeçalho são desenhados, a
// rubrica é datilografada, o título assenta devagar e o marca-texto passa sobre a palavra-chave; o quadro é impresso
// linha a linha; a bússola gira lenta; o selo é carimbado. Sai só apagando; a folha nova vira da direita.
export default {
  duracoes: [7.4, 6.8, 7.8, 6.6, 6.6, 8.6],
  revela: "dir",
  fixos: [".rodape", ".cabeca", ".respiro"],
  saida: { opacity: 0, y: -14, duration: 0.45, ease: "power1.in", stagger: 0.03 },
  slides: [
    // 1. capa
    (A) => {
      A.revelar(".cabeca", 0.1, { dir: "esq", dur: 1.1, ease: "power2.inOut" });
      A.revelar(".rodape", 0.1, { dir: "esq", dur: 1.1, ease: "power2.inOut" });
      A.letras(".rubrica", 0.6, { cps: 26 });
      A.palavras(".mega", 1.1, { y: 22, stagger: 0.12, dur: 0.9, ease: "power2.out" });
      A.marcar(".mega em", 1.9, { dur: 0.9 });
      A.revelar(".resumo", 2.6, { dir: "cima", dur: 0.9, ease: "power2.inOut" });
      A.surgir(".chaves", 3.4, { y: 14, dur: 0.8, ease: "power2.out" });
      A.mover(".bussola", 1.0, { opacity: 0, rotation: -120, scale: 0.8 }, { opacity: 0.13, rotation: 0, scale: 1, duration: 2.0, ease: "power2.out" });
      A.continuo(".bussola", 3.0, { rotation: 12 });
    },
    // 2. quem orienta: a foto revela de cima como uma prova impressa, a legenda é datilografada
    (A) => {
      A.letras(".rubrica", 0, { cps: 30 });
      A.palavras(".titulo", 0.3, { y: 22, stagger: 0.12, dur: 0.9, ease: "power2.out" });
      A.marcar(".titulo em", 0.9, { dur: 0.8 });
      A.revelar("figure img", 1.0, { dir: "cima", dur: 1.1, ease: "power2.inOut" });
      A.continuo("figure img", 1.0, { scale: 1.04 });
      A.letras("figcaption", 2.0, { cps: 40 });
      A.revelar(".secoes li", 1.5, { dir: "esq", dur: 0.8, stagger: 0.4, ease: "power2.inOut" });
    },
    // 3. as frentes: o quadro é impresso de cima para baixo, linha a linha
    (A) => {
      A.letras(".rubrica", 0, { cps: 30 });
      A.palavras(".titulo", 0.3, { y: 22, stagger: 0.12, dur: 0.9, ease: "power2.out" });
      A.marcar(".titulo em", 0.9, { dur: 0.7 });
      A.surgir(".quadro-tit", 1.1, { y: 10, dur: 0.6, ease: "power2.out" });
      A.revelar(".quadro", 1.4, { dir: "cima", dur: 2.2, ease: "power1.inOut" });
      A.surgir(".quadro .linha", 1.45, { x: -16, y: 0, stagger: 0.3, dur: 0.6, ease: "power2.out" });
      A.surgir(".fonte", 3.6, { y: 0, dur: 0.6 });
    },
    // 4. o protocolo: cada etapa é traçada, com o número antes do texto
    (A) => {
      A.letras(".rubrica", 0, { cps: 30 });
      A.palavras(".titulo", 0.3, { y: 22, stagger: 0.12, dur: 0.9, ease: "power2.out" });
      A.marcar(".titulo em", 0.8, { dur: 0.7 });
      A.revelar(".secoes li", 1.1, { dir: "esq", dur: 0.8, stagger: 0.45, ease: "power2.inOut" });
      A.pop(".secoes li span", 1.15, { de: 0.4, stagger: 0.45, ease: "back.out(2)", dur: 0.5 });
    },
    // 5. os Cadernos (tinta): os círculos são desenhados, o fio do autor cresce
    (A) => {
      A.letras(".rubrica", 0, { cps: 30 });
      A.palavras(".titulo", 0.3, { y: 22, stagger: 0.12, dur: 0.9, ease: "power2.out" });
      A.pop(".passos li span", 1.1, { de: 0, rot: -90, stagger: 0.45, ease: "back.out(1.8)", dur: 0.7 });
      A.surgir(".passos li", 1.2, { x: -24, y: 0, stagger: 0.45, dur: 0.7, ease: "power2.out" });
      A.revelar(".autor", 3.0, { dir: "esq", dur: 1.1, ease: "power2.inOut" });
    },
    // 6. siga: o selo é carimbado, o título assenta com o marca-texto em "rigor", a nota de ética fecha
    (A) => {
      A.mover(".selo", 0.1, { opacity: 0, scale: 2.2, rotation: -10 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.45, ease: "power4.in" });
      A.mover(".selo", 0.55, { x: -3 }, { x: 0, duration: 0.25, ease: "elastic.out(1, 0.3)" });
      A.palavras(".mega", 0.6, { y: 22, stagger: 0.1, dur: 0.9, ease: "power2.out" });
      A.marcar(".mega em", 1.6, { dur: 0.8 });
      A.revelar(".contato.principal", 2.3, { dir: "esq", dur: 0.7, ease: "power2.inOut" });
      A.surgir(".contato:not(.principal)", 2.8, { y: 12, stagger: 0.2, dur: 0.7, ease: "power2.out" });
      A.surgir(".etica", 3.3, { y: 0, dur: 1.0, ease: "power1.out" });
    },
  ],
};
