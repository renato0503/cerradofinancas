// Cerrado Tech, a fábrica: as peças se montam. Palavras crescem e encaixam (back.out), os cards chegam como blocos
// e assentam, os ícones giram até o lugar, a mão do "Prazer" acena. Sai encolhendo; a CTA entra em círculo.
export default {
  duracoes: [5.8, 6.2, 6.6, 6.4, 6.8, 7.0],
  revela: "circulo",
  saida: { opacity: 0, scale: 0.9, duration: 0.32, ease: "power2.in", stagger: 0.04 },
  slides: [
    // 1. capa
    (A) => {
      A.revelar(".rodape", 0.1, { dir: "esq", dur: 0.9 });
      A.pop(".kicker", 0.3, { de: 0.5, origem: "0% 50%" });
      A.mover(".kicker i", 0.7, { rotation: 0 }, { rotation: 18, duration: 0.18, ease: "sine.inOut", yoyo: true, repeat: 5, transformOrigin: "70% 90%" });
      A.pop(".logo-produto", 0.5, { de: 0, rot: -90, dur: 0.8, ease: "back.out(1.8)" });
      A.palavras(".capa h1", 0.8, { y: 30, escala: 0.85, origem: "50% 100%", stagger: 0.07, dur: 0.55, ease: "back.out(1.3)" });
      A.surgir(".capa .sub", 2.1, { y: 30 });
    },
    // 2. quem somos: quatro blocos encaixam em grade, cada ícone gira para o lugar
    (A) => {
      A.pop(".kicker", 0, { de: 0.5, origem: "0% 50%" });
      A.palavras(".titulo", 0.25, { y: 30, escala: 0.85, stagger: 0.06, dur: 0.5, ease: "back.out(1.3)" });
      A.mover(".card", 0.9, { opacity: 0, y: 90, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.6)", stagger: { each: 0.18, grid: [2, 2], from: "start" } });
      A.pop(".card i", 1.15, { de: 0, rot: -140, stagger: 0.18, dur: 0.6 });
    },
    // 3. o que construímos: seis módulos, cascata do canto
    (A) => {
      A.pop(".kicker", 0, { de: 0.5, origem: "0% 50%" });
      A.palavras(".titulo", 0.25, { y: 30, escala: 0.85, stagger: 0.06, dur: 0.5, ease: "back.out(1.3)" });
      A.mover(".card", 0.9, { opacity: 0, y: 70, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.7)", stagger: { each: 0.13, grid: [3, 2], from: "start" } });
      A.pop(".card i", 1.1, { de: 0, rot: -140, stagger: 0.13, dur: 0.55 });
    },
    // 4. nasceram aqui: os produtos deslizam da direita, um sob o outro
    (A) => {
      A.pop(".kicker", 0, { de: 0.5, origem: "0% 50%" });
      A.palavras(".titulo", 0.25, { y: 30, escala: 0.85, stagger: 0.08, dur: 0.5, ease: "back.out(1.3)" });
      A.mover(".card", 0.8, { opacity: 0, x: 140 }, { opacity: 1, x: 0, duration: 0.6, ease: "back.out(1.4)", stagger: 0.28 });
      A.pop(".card i", 1.05, { de: 0, rot: -140, stagger: 0.28, dur: 0.55 });
    },
    // 5. quem está por trás: a foto abre de baixo para cima, as credenciais encaixam com o ícone na frente
    (A) => {
      A.pop(".kicker", 0, { de: 0.5, origem: "0% 50%" });
      A.palavras(".titulo", 0.25, { y: 30, escala: 0.85, stagger: 0.06, dur: 0.5, ease: "back.out(1.3)" });
      A.revelar(".instrutor img", 0.9, { dir: "baixo", dur: 0.8 });
      A.mover(".instrutor img", 0.9, { scale: 1.15 }, { scale: 1, duration: 1.4, ease: "power2.out" });
      A.palavras(".instrutor h3", 1.3, { y: 30, escala: 0.85, stagger: 0.08, dur: 0.5, ease: "back.out(1.3)" });
      A.surgir(".instrutor .papel", 1.6, { y: 20 });
      A.surgir(".credenciais li", 2.1, { x: 60, y: 0, stagger: 0.3, ease: "back.out(1.4)" });
      A.pop(".credenciais li i", 2.2, { de: 0, rot: -140, stagger: 0.3 });
    },
    // 6. CTA: a folha brota girando, a pergunta encaixa, os contatos saltam
    (A) => {
      A.pop(".folha", 0, { de: 0, rot: -60, dur: 1.0, ease: "back.out(1.6)" });
      A.palavras(".cta h2", 0.4, { y: 30, escala: 0.85, stagger: 0.07, dur: 0.55, ease: "back.out(1.3)" });
      A.surgir(".cta .sub", 1.6, { y: 24 });
      A.pop(".contato", 2.3, { de: 0.6, stagger: 0.25 });
      A.onda(".contato.principal", 3.2, { scale: 1.04 }, 1.2);
    },
  ],
};
