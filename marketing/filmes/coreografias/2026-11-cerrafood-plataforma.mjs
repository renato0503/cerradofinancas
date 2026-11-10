// CerraFood, a plataforma inteira: o pedido percorre o restaurante. A pizza entra girando e as coberturas caem, o prato chega e o hambúrguer se monta;
// os aparelhos sobem com a marca de cada um; o totem monta o meio a meio (as metades se juntam) e a comanda sai da
// impressora; na cozinha os cartões caem nas colunas e os timers correm; as barras de estoque enchem e baixam com a
// venda; a caixa da pizza anda pelo caminho até a porta; os níveis crescem e o mapa de calor acende em onda.
// A troca de cor abre em círculo (a pizza). O conteúdo sai subindo, como a comanda puxada.

export default {
  duracoes: [6.2, 6.4, 7.4, 6.8, 6.8, 7.0, 6.6, 6.8],
  revela: "circulo",
  saida: { opacity: 0, y: -60, duration: 0.32, ease: "power3.in", stagger: 0.03 },
  slides: [
    // 1. capa: a pizza chega girando, as coberturas caem, o título encaixa
    (A) => {
      A.revelar(".rodape", 0.1, { dir: "esq", dur: 0.9 });
      A.revelar(".topo .rotulo", 0.2, { dir: "esq", dur: 0.6 });
      A.mover(".pizza-capa", 0.3, { opacity: 0, x: 520, rotation: -150 }, { opacity: 1, x: 0, rotation: 0, duration: 1.4, ease: "power4.out" });
      A.mover(".pizza-capa .corte", 1.4, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out", stagger: 0.05 });
      A.mover(".pizza-capa .cob", 1.6, { opacity: 0, scale: 2.4, y: -40, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, y: 0, duration: 0.42, ease: "back.out(2)", stagger: 0.045 });
      A.continuo(".pizza-capa .giro", 3.0, { rotation: 22, svgOrigin: "200 200" });
      // o prato desliza para a mesa e cada porção cai no prato; o hambúrguer se monta de baixo para cima
      A.mover(".prato-capa", 1.2, { opacity: 0, x: -260, rotation: -30 }, { opacity: 1, x: 0, rotation: 0, duration: 0.9, ease: "power4.out" });
      A.mover(".prato-capa .item", 1.9, { opacity: 0, scale: 1.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)", stagger: 0.12 });
      A.mover(".hamb-capa .camada", 2.2, { opacity: 0, y: -160 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.6)", stagger: { each: 0.12, from: "end" } });
      A.onda(".hamb-capa", 3.6, { y: -10 }, 1.8);
      A.palavras(".mega", 0.7, { y: 50, stagger: 0.07, dur: 0.5, ease: "back.out(1.5)" });
      A.surgir(".sub", 2.2, { y: 26 });
    },
    // 2. white label (papel): os aparelhos sobem, cada barra se pinta com a cor da marca, os itens aparecem
    (A) => {
      A.revelar(".rotulo", 0, { dir: "esq", dur: 0.6 });
      A.palavras(".titulo", 0.25, { y: 46, stagger: 0.07, dur: 0.5, ease: "back.out(1.5)" });
      A.surgir(".sub", 1.1, { y: 22 });
      A.mover(".aparelho", 1.3, { opacity: 0, y: 260, rotation: 5 }, { opacity: 1, y: 0, rotation: 0, duration: 0.8, ease: "back.out(1.3)", stagger: 0.18 });
      A.revelar(".aparelho .barra", 1.9, { dir: "esq", dur: 0.6, stagger: 0.18 });
      A.pop(".aparelho .item i", 2.4, { de: 0, rot: -120, stagger: 0.05, dur: 0.45 });
      A.revelar(".aparelho .item span", 2.5, { dir: "esq", dur: 0.4, stagger: 0.05 });
      A.pop(".aparelho .botao", 3.2, { de: 0.5, stagger: 0.15 });
      A.onda(".aparelho.alto", 3.9, { y: -14 }, 1.6);
      A.pop(".selo", 3.7, { de: 0.8 });
    },
    // 3. totem: as opções saltam, as metades se juntam, "Confirmar" pulsa e a comanda sai da impressora
    (A) => {
      A.revelar(".rotulo", 0, { dir: "esq", dur: 0.6 });
      A.palavras(".titulo", 0.25, { y: 46, stagger: 0.07, dur: 0.5, ease: "back.out(1.5)" });
      A.mover(".monta", 0.9, { opacity: 0, y: 140 }, { opacity: 1, y: 0, duration: 0.7, ease: "power4.out" });
      A.surgir(".totem-topo", 1.2, { y: -14 });
      A.pop(".monta .op", 1.4, { de: 0.6, stagger: 0.08 });
      A.mover(".metade-a", 2.0, { opacity: 0, x: -140, rotation: -40, svgOrigin: "100 100" }, { opacity: 1, x: 0, rotation: 0, duration: 0.6, ease: "power4.out" });
      A.mover(".metade-b", 2.3, { opacity: 0, x: 140, rotation: 40, svgOrigin: "100 100" }, { opacity: 1, x: 0, rotation: 0, duration: 0.6, ease: "power4.out" });
      A.surgir(".meio p", 2.5, { x: -24, y: 0 });
      A.pop(".monta .total b", 3.0, { de: 0.6 });
      A.mover(".monta .total b", 3.6, { scale: 1 }, { scale: 0.9, duration: 0.12, ease: "power2.in", yoyo: true, repeat: 1, immediateRender: false });
      A.revelar(".comanda", 3.9, { dir: "cima", dur: 1.4, ease: "steps(14)" });
      A.mover(".comanda", 3.9, { y: -60 }, { y: 0, duration: 1.4, ease: "steps(14)" });
      A.pop(".base > .selo", 5.6, { de: 0.8 });
    },
    // 4. cozinha: a tela acende, os cartões caem nas colunas, os timers correm, o atrasado pulsa
    (A) => {
      A.revelar(".rotulo", 0, { dir: "esq", dur: 0.6 });
      A.palavras(".titulo", 0.25, { y: 46, stagger: 0.07, dur: 0.5, ease: "back.out(1.5)" });
      A.revelar(".kds-moldura", 0.9, { dir: "cima", dur: 0.6 });
      A.letras(".kds h4", 1.3, { cps: 40 });
      A.mover(".kds .card", 1.6, { opacity: 0, y: -90 }, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.6)", stagger: 0.14 });
      const timers = [[1, 2, 2], [1, 3, 17], [2, 2, 27], [2, 3, 9], [3, 2, 12]];
      for (const [col, card, min] of timers) {
        A.contar(`.kds .col:nth-child(${col}) .card:nth-child(${card}) .m`, 2.1, min, { de: Math.max(0, min - 6), dur: 2.6, ease: "none" });
      }
      A.onda(".kds .card.atraso", 3.0, { scale: 1.04 }, 0.9);
      A.surgir(".legenda-kds span", 3.6, { y: 18, stagger: 0.14 });
    },
    // 5. custo e estoque: a pizza de custo gira para o lugar, as barras enchem e depois baixam com a venda
    (A) => {
      A.revelar(".rotulo", 0, { dir: "esq", dur: 0.6 });
      A.palavras(".titulo", 0.25, { y: 46, stagger: 0.07, dur: 0.5, ease: "back.out(1.5)" });
      A.pop(".custo-estoque .pizza", 0.9, { de: 0, rot: -160, dur: 1.0, ease: "back.out(1.4)" });
      A.surgir(".rotulo-pizza", 1.7, { y: 16 });
      A.surgir(".estoque .nome", 1.2, { x: 30, y: 0, stagger: 0.14 });
      A.mover(".estoque .nivel i", 1.4, { scaleX: 0 }, { scaleX: 1.25, duration: 0.9, ease: "power3.out", stagger: 0.14 });
      A.mover(".estoque .nivel i", 3.1, { scaleX: 1.25 }, { scaleX: 1, duration: 0.7, ease: "power2.inOut", stagger: 0.08, immediateRender: false });
      A.pop(".alerta", 3.9, { de: 0, rot: -10 });
      A.onda(".alerta", 4.5, { scale: 1.08 }, 0.8);
      A.revelar(".legenda-baixa", 4.2, { dir: "esq", dur: 0.8 });
      A.pop(".base > .selo", 5.0, { de: 0.8 });
    },
    // 6. entrega (papel): o caminho se desenha, as etapas acendem, a caixa anda até a 3ª e o celular sobe
    (A) => {
      A.revelar(".rotulo", 0, { dir: "esq", dur: 0.6 });
      A.palavras(".titulo", 0.25, { y: 46, stagger: 0.07, dur: 0.5, ease: "back.out(1.5)" });
      A.mover(".paradas", 0.9, { backgroundSize: "0px 6px" }, { backgroundSize: "772px 6px", duration: 2.0, ease: "none" });
      A.pop(".parada .ponto", 1.0, { de: 0, stagger: 0.5 });
      A.surgir(".parada b", 1.2, { y: 16, stagger: 0.5 });
      A.mover(".caixa-pizza", 1.0, { opacity: 0, x: -440 }, { opacity: 1, x: 0, duration: 1.7, ease: "power2.inOut" });
      A.onda(".caixa-pizza", 2.8, { y: -8 }, 0.7);
      A.mover(".celular", 2.7, { opacity: 0, y: 280, rotation: -4 }, { opacity: 1, y: 0, rotation: 0, duration: 0.8, ease: "back.out(1.3)" });
      A.letras(".celular .url", 3.3, { cps: 40 });
      A.revelar(".celular .status", 3.9, { dir: "esq", dur: 0.7 });
      A.surgir(".celular .info", 4.6, { y: 12 });
      A.pop(".celular .zap", 5.0, { de: 0.7 });
    },
    // 7. gestão: os níveis crescem do chão, o mapa de calor acende em onda, os módulos saltam
    (A) => {
      A.revelar(".rotulo", 0, { dir: "esq", dur: 0.6 });
      A.palavras(".titulo", 0.25, { y: 46, stagger: 0.07, dur: 0.5, ease: "back.out(1.5)" });
      A.letras(".gestao h4", 0.9, { cps: 40 });
      A.mover(".gestao .niveis .n", 1.1, { scaleY: 0 }, { scaleY: 1, duration: 0.7, ease: "back.out(1.3)", stagger: 0.15 });
      A.surgir(".gestao .mapa .h, .gestao .mapa .d", 1.2, { y: 0, x: -8, stagger: 0.02, dur: 0.3 });
      A.mover(".gestao .mapa .q", 1.4, { scale: 0 }, { scale: 1, duration: 0.35, ease: "back.out(2)", stagger: { each: 0.025, grid: [7, 6], from: "start" } });
      A.pop(".chip", 3.0, { de: 0.5, stagger: 0.12 });
      A.pop(".base > .selo", 4.0, { de: 0.8 });
    },
    // 8. CTA (laranja): o endereço é digitado, a pizza gira no canto
    (A) => {
      A.revelar(".topo .rotulo", 0, { dir: "esq", dur: 0.6 });
      A.palavras(".mega", 0.3, { y: 50, stagger: 0.08, dur: 0.55, ease: "back.out(1.5)" });
      A.mover(".pizza-mini", 0.6, { opacity: 0, x: 420, rotation: -140 }, { opacity: 1, x: 0, rotation: 0, duration: 1.2, ease: "power4.out" });
      A.continuo(".pizza-mini .giro", 1.8, { rotation: 40, svgOrigin: "200 200" });
      A.surgir(".base .sub", 2.1, { y: 22 });
      A.revelar(".contato.principal", 2.6, { dir: "esq", dur: 0.5, ease: "power4.inOut" });
      A.letras(".contato.principal", 2.9, { cps: 36 });
      A.surgir(".contato:not(.principal)", 4.0, { x: -24, y: 0 });
    },
  ],
};
