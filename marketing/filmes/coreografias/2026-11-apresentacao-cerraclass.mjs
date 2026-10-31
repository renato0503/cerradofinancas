// CerraClass, a sala de aula: energia e peso. A etiqueta cai e quica, os títulos condensados chegam como soco
// (grandes e assentando), as 10 cadeiras se ocupam uma a uma com o contador junto, a foto cai como polaroide.
// Sai caindo; a cor nova sobe como uma lousa.
export default {
  duracoes: [6.4, 6.6, 6.2, 6.4, 6.2, 7.0],
  revela: "baixo",
  saida: { opacity: 0, y: 90, rotation: 3, duration: 0.34, ease: "power3.in", stagger: 0.04 },
  slides: [
    // 1. capa
    (A) => {
      A.revelar(".rodape", 0.1, { dir: "esq", dur: 0.8 });
      A.mover(".etiqueta", 0.25, { opacity: 0, y: -140, rotation: -14 }, { opacity: 1, y: 0, rotation: 0, duration: 0.9, ease: "bounce.out" });
      A.palavras(".mega", 0.7, { y: 0, escala: 1.4, origem: "50% 60%", stagger: 0.09, dur: 0.45, ease: "power4.out" });
      A.surgir(".sub", 1.9, { y: 30 });
      A.pop(".assentos i", 2.4, { de: 0, y: 30, stagger: 0.07, ease: "back.out(3)", dur: 0.4 });
      A.surgir(".legenda-turma", 3.1, { x: -30, y: 0 });
    },
    // 2. o formato (tinta): o contador vai a 10 enquanto as cadeiras se ocupam, as linhas são riscadas no quadro
    (A) => {
      A.mover(".etiqueta", 0, { opacity: 0, y: -120, rotation: -12 }, { opacity: 1, y: 0, rotation: 0, duration: 0.8, ease: "bounce.out" });
      A.palavras(".titulo", 0.3, { y: 0, escala: 1.4, origem: "50% 60%", stagger: 0.08, dur: 0.45, ease: "power4.out" });
      A.surgir(".turma .num", 1.0, { y: 0, escala: 0.6, dur: 0.4, ease: "back.out(2)" });
      A.contar(".turma .num", 1.0, 10, { de: 1, dur: 1.0, ease: "none" });
      A.pop(".turma .assentos i", 1.0, { de: 0, y: 30, stagger: 0.1, ease: "back.out(3)", dur: 0.4 });
      A.surgir(".turma .num small", 2.0, { y: 16 });
      A.revelar(".lista li", 2.4, { dir: "esq", dur: 0.55, stagger: 0.3 });
    },
    // 3. os cursos: cada linha é riscada e o nome do curso chega no soco
    (A) => {
      A.mover(".etiqueta", 0, { opacity: 0, y: -120, rotation: -12 }, { opacity: 1, y: 0, rotation: 0, duration: 0.8, ease: "bounce.out" });
      A.palavras(".titulo", 0.3, { y: 0, escala: 1.4, origem: "50% 60%", stagger: 0.08, dur: 0.45, ease: "power4.out" });
      A.revelar(".lista li", 1.1, { dir: "esq", dur: 0.5, stagger: 0.38 });
      A.surgir(".lista li b", 1.3, { y: 0, escala: 1.4, stagger: 0.38, dur: 0.4, ease: "power4.out" });
    },
    // 4. quem está por trás: a foto cai girando e assenta torta, como polaroide na parede
    (A) => {
      A.mover(".etiqueta", 0, { opacity: 0, y: -120, rotation: -12 }, { opacity: 1, y: 0, rotation: 0, duration: 0.8, ease: "bounce.out" });
      A.mover(".instrutor img", 0.4, { opacity: 0, x: 520, y: -140, rotation: 28, scale: 1.1 }, { opacity: 1, x: 0, y: 0, rotation: -2, scale: 1, duration: 0.9, ease: "back.out(1.4)" });
      A.palavras(".instrutor h3", 1.0, { y: 0, escala: 1.4, stagger: 0.1, dur: 0.45, ease: "power4.out" });
      A.surgir(".instrutor p", 1.4, { x: -30, y: 0 });
      A.revelar(".lista li", 1.9, { dir: "esq", dur: 0.55, stagger: 0.35 });
    },
    // 5. neste perfil
    (A) => {
      A.mover(".etiqueta", 0, { opacity: 0, y: -120, rotation: -12 }, { opacity: 1, y: 0, rotation: 0, duration: 0.8, ease: "bounce.out" });
      A.palavras(".titulo", 0.3, { y: 0, escala: 1.4, origem: "50% 60%", stagger: 0.08, dur: 0.45, ease: "power4.out" });
      A.revelar(".lista li", 1.1, { dir: "esq", dur: 0.5, stagger: 0.36 });
      A.surgir(".lista li b", 1.3, { y: 0, escala: 1.4, stagger: 0.36, dur: 0.4, ease: "power4.out" });
    },
    // 6. siga: a frase-manifesto palavra a palavra, com mais peso; o site salta e pulsa
    (A) => {
      A.mover(".etiqueta", 0, { opacity: 0, y: -120, rotation: -12 }, { opacity: 1, y: 0, rotation: 0, duration: 0.8, ease: "bounce.out" });
      A.palavras(".mega", 0.35, { y: 0, escala: 1.55, origem: "50% 60%", stagger: 0.13, dur: 0.45, ease: "power4.out" });
      A.surgir(".sub", 1.9, { y: 26 });
      A.pop(".contato.principal", 2.5, { de: 0.4, rot: -6, ease: "back.out(2.5)" });
      A.surgir(".contato:not(.principal)", 2.9, { y: 26 });
      A.onda(".contato.principal", 3.4, { scale: 1.05 }, 1.1);
    },
  ],
};
