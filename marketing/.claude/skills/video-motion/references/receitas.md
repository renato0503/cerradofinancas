# Receitas de movimento

Todas assumem uma timeline pausada (`const tl = gsap.timeline({ paused: true })`) e render por `tl.time(t)`.
Durações em segundos; `ease` é o padrão da receita.

## Entradas

**1. Fade in** — 0,4 s, `power2.out`
```js
tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, t);
```

**2. Slide in** — 0,55 s, `power3.out`
```js
tl.fromTo(el, { x: -80, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.55 }, t);
```

**3. Blur in** — 0,5 s, `power2.out`
```js
tl.fromTo(el, { filter: "blur(18px)", autoAlpha: 0 }, { filter: "blur(0px)", autoAlpha: 1, duration: 0.5 }, t);
```

**4. Scale in** — 0,45 s, `expo.out`
```js
tl.fromTo(el, { scale: 0.92, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.45 }, t);
```

**5. Mask reveal** — 0,6 s, `power3.inOut`
```js
tl.fromTo(el, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.6 }, t);
```

**6. Pop in** — 0,32 s, `back.out(1.7)`
```js
tl.fromTo(el, { scale: 0.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.32, ease: "back.out(1.7)" }, t);
```

**7. Punch zoom** — 0,28 s, `power4.out`
```js
tl.fromTo(el, { scale: 1.25, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.28, ease: "power4.out" }, t);
```

**8. Stamp** — 0,22 s, `power4.in`
```js
tl.fromTo(el, { scale: 1.8, autoAlpha: 0, rotate: -8 }, { scale: 1, autoAlpha: 1, rotate: -4, duration: 0.22 }, t);
```

**9. Flash** — 0,18 s, `none`
```js
tl.fromTo(flash, { autoAlpha: 0.85 }, { autoAlpha: 0, duration: 0.18 }, t);
```

## Texto

**10. Typewriter** — cps 26–34
```js
A.letras(".rotulo", t, { cps: 28 });
```

**11. Word reveal**
```js
A.palavras(".titulo", t, { y: 36, stagger: 0.07, ease: "expo.out" });
```

**12. Line reveal** — 0,5 s, `expo.out`
```js
tl.fromTo(el, { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: "expo.out" }, t);
```

**13. Text swap** — 0,35 s
```js
tl.to(a, { yPercent: -100, duration: 0.3 }, t).fromTo(b, { yPercent: 100 }, { yPercent: 0, duration: 0.35 }, t + 0.12);
```

**14. Kinetic type** — stagger com rotação
```js
tl.fromTo(".k", { y: 50, rotate: 6, autoAlpha: 0 }, { y: 0, rotate: 0, autoAlpha: 1, stagger: 0.05, duration: 0.4 }, t);
```

**15. Marca-texto** — 0,5 s, `power2.inOut`
```js
tl.fromTo(el, { backgroundSize: "0% 100%" }, { backgroundSize: "100% 100%", duration: 0.5 }, t);
```

**16. Contador**
```js
A.contar(".numero", t, 128);
```

## Forma e gráfico

**17. Draw-on SVG** — 0,8 s, `power2.inOut`
```js
tl.fromTo(path, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8 }, t);
```

**18. Bar grow** — 0,7 s, `expo.out`
```js
tl.fromTo(".barra", { scaleY: 0 }, { scaleY: 1, transformOrigin: "bottom", duration: 0.7, stagger: 0.08 }, t);
```

**19. Wipe** — 0,55 s, `power3.inOut`
```js
tl.fromTo(el, { xPercent: -100 }, { xPercent: 0, duration: 0.55 }, t);
```

**20. Cortina de cor** — 0,6 s
```js
tl.fromTo(cortina, { scaleY: 0, transformOrigin: "top" }, { scaleY: 1, duration: 0.35 }, t)
  .to(cortina, { scaleY: 0, transformOrigin: "bottom", duration: 0.35 }, t + 0.4);
```

**21. Morph** — 0,45 s
```js
tl.to(forma, { attr: { d: novoCaminho }, duration: 0.45 }, t);
```

## Câmera e cena

**22. Push in** — plano inteiro
```js
tl.fromTo(palco, { scale: 1 }, { scale: 1.05, duration: dur, ease: "none" }, 0);
```

**23. Pull back** — 0,8 s, `power2.out`
```js
tl.fromTo(palco, { scale: 1.08 }, { scale: 1, duration: 0.8 }, t);
```

**24. Pan** — 0,9 s, `power2.inOut`
```js
tl.fromTo(cena, { x: 0 }, { x: -120, duration: 0.9 }, t);
```

**25. Parallax**
```js
tl.to(".fundo", { y: -30, duration: dur, ease: "none" }, 0).to(".frente", { y: -90, duration: dur, ease: "none" }, 0);
```

**26. Whip pan** — 0,22 s
```js
tl.to(cena, { x: -220, filter: "blur(14px)", autoAlpha: 0, duration: 0.22, ease: "power3.in" }, t)
  .fromTo(proxima, { x: 220, filter: "blur(14px)", autoAlpha: 0 }, { x: 0, filter: "blur(0px)", autoAlpha: 1, duration: 0.3 }, t + 0.18);
```

**27. Shake** — 0,3 s
```js
tl.to(el, { keyframes: [{ x: -8 }, { x: 8 }, { x: -5 }, { x: 0 }], duration: 0.3 }, t);
```

**28. Match cut** — corte seco no mesmo ponto focal
```js
tl.set(cenaB, { autoAlpha: 1 }, t).set(cenaA, { autoAlpha: 0 }, t);
```

**29. Split screen**
```js
tl.fromTo(esq, { xPercent: -100 }, { xPercent: 0, duration: 0.5 }, t).fromTo(dir, { xPercent: 100 }, { xPercent: 0, duration: 0.5 }, t);
```

**30. Rack focus** — 0,8 s
```js
tl.to(fundo, { filter: "blur(12px)", duration: 0.8 }, t).to(frente, { filter: "blur(0px)", duration: 0.8 }, t);
```

## Ambiente

**31. Partículas**
```js
tl.fromTo(".poeira", { y: 20, autoAlpha: 0 }, { y: -40, autoAlpha: 0.5, stagger: 0.02, duration: 3, ease: "none" }, 0);
```

**32. Luz que varre**
```js
tl.fromTo(brilho, { xPercent: -120 }, { xPercent: 120, duration: 0.9, ease: "power2.inOut" }, t);
```

**33. Grão/scanline**
```js
tl.to(grao, { x: 6, y: -4, duration: 0.12, repeat: -1, ease: "steps(2)" }, 0);
```

**34. Glitch** — 0,18 s
```js
tl.to(el, { keyframes: [{ x: 4, skewX: 6 }, { x: -4, skewX: -6 }, { x: 0, skewX: 0 }], duration: 0.18 }, t);
```

**35. Sticker**
```js
tl.fromTo(el, { scale: 0, rotate: 12, autoAlpha: 0 }, { scale: 1, rotate: -4, autoAlpha: 1, duration: 0.35, ease: "back.out(2)" }, t);
```

## Cuidados

- `autoAlpha` em vez de `opacity` (inclui visibility).
- Não anime `transform` em elemento que o CSS já usa para layout; posicione com flex.
- Em 3D, anime a câmera ou o grupo, não cada malha.
- Render: `tl.time(t, false)`; nunca `tl.play()`.
- Repita a receita no máximo duas vezes seguidas; varie.
