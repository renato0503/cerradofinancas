// Cerra.AI, "silício local": tudo tem cara de terminal. Rótulos digitados, títulos em varredura da esquerda (rápido e
// preciso, power4), listas desenhadas como uma leitura de linha, a tela do produto abrindo e o chat digitado de verdade.
// Sai varrendo para a esquerda; a cor cobre entra como barra de carregamento (da esquerda).
export default {
  duracoes: [5.8, 6.0, 8.2, 6.0, 6.0, 7.0],
  revela: "esq",
  saida: { opacity: 0, x: -70, duration: 0.3, ease: "power4.in", stagger: 0.035 },
  slides: [
    // 1. capa
    (A) => {
      A.revelar(".rodape", 0.1, { dir: "esq", dur: 1.0 });
      A.letras(".rotulo", 0.3, { cps: 28 });
      A.palavras(".mega", 0.75, { x: -40, y: 0, stagger: 0.07, dur: 0.5, ease: "power4.out" });
      A.mover(".emblema", 1.0, { opacity: 0, x: 260, rotation: 35 }, { opacity: 1, x: 0, rotation: 0, duration: 1.2, ease: "power4.out" });
      A.onda(".emblema", 2.3, { y: -16 }, 2.2);
      A.surgir(".sub", 2.0, { y: 0, x: -24, dur: 0.6 });
    },
    // 2. o que ele faz: cada linha é "lida" da esquerda para a direita
    (A) => {
      A.letras(".rotulo", 0, { cps: 34 });
      A.palavras(".titulo", 0.3, { x: -40, y: 0, stagger: 0.07, dur: 0.5, ease: "power4.out" });
      A.revelar(".linhas li", 1.1, { dir: "esq", dur: 0.7, stagger: 0.42, ease: "power4.inOut" });
      A.pop(".linhas li b", 1.5, { de: 0.85, stagger: 0.42, ease: "back.out(3)", dur: 0.4 });
    },
    // 3. na tela: a janela abre, a pergunta é digitada, a resposta chega palavra a palavra e a fonte aparece por último
    (A) => {
      A.letras(".rotulo", 0, { cps: 34 });
      A.palavras(".titulo", 0.3, { x: -40, y: 0, stagger: 0.08, dur: 0.5, ease: "power4.out" });
      A.mover(".tela", 0.9, { opacity: 0, y: 70, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power4.out" });
      A.surgir(".tela .barra > span", 1.3, { y: -12, stagger: 0.15, dur: 0.4 });
      A.pop(".tela .eu", 1.9, { de: 0.5, origem: "100% 100%", ease: "back.out(1.7)", dur: 0.45 });
      A.letras(".tela .eu", 2.1, { cps: 40 });
      A.revelar(".tela .ia", 3.6, { dir: "cima", dur: 0.4 });
      A.palavras(".tela .ia", 3.7, { y: 10, stagger: 0.05, dur: 0.3 });
      A.revelar(".tela .cita", 4.9, { dir: "esq", dur: 0.6, ease: "power4.inOut" });
      A.pop(".selo", 5.6, { de: 0.8, dur: 0.4 });
    },
    // 4. para quem: os cenários entram em varredura, o nome primeiro e a descrição depois
    (A) => {
      A.letras(".rotulo", 0, { cps: 34 });
      A.palavras(".titulo", 0.3, { x: -40, y: 0, stagger: 0.07, dur: 0.5, ease: "power4.out" });
      A.revelar(".cenarios .item", 1.0, { dir: "esq", dur: 0.6, stagger: 0.42, ease: "power4.inOut" });
      A.surgir(".cenarios p", 1.35, { x: -20, y: 0, stagger: 0.42, dur: 0.5 });
    },
    // 5. neste perfil (cobre)
    (A) => {
      A.letras(".rotulo", 0, { cps: 34 });
      A.palavras(".titulo", 0.25, { x: -40, y: 0, stagger: 0.07, dur: 0.5, ease: "power4.out" });
      A.revelar(".linhas li", 1.0, { dir: "esq", dur: 0.7, stagger: 0.42, ease: "power4.inOut" });
    },
    // 6. siga: o endereço é digitado dentro do botão
    (A) => {
      A.letras(".rotulo", 0, { cps: 30 });
      A.palavras(".mega", 0.3, { x: -50, y: 0, stagger: 0.08, dur: 0.55, ease: "power4.out" });
      A.surgir(".sub", 1.5, { x: -24, y: 0 });
      A.revelar(".contato.principal", 2.2, { dir: "esq", dur: 0.5, ease: "power4.inOut" });
      A.letras(".contato.principal", 2.5, { cps: 34 });
      A.surgir(".contato:not(.principal)", 3.6, { x: -24, y: 0 });
    },
  ],
};
