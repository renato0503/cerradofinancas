// Nível de qualidade do 3D (sem dependências: decide antes de baixar o Three.js).
export function nivelInicial() {
  const reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;
  // checagem barata (criar um contexto WebGL só para testar custa caro no celular); se falhar depois, a página cai na versão estática
  const gl = "WebGLRenderingContext" in window;
  if (!gl || reduz) return "estatico";
  const toque = matchMedia("(pointer: coarse)").matches;
  const mem = navigator.deviceMemory || 8, nucleos = navigator.hardwareConcurrency || 8;
  if (toque || mem <= 4 || nucleos <= 4 || innerWidth < 820) return "leve";
  return "completo";
}
