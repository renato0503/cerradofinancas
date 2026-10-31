export const SKY_VERT = `varying vec3 vDir;
void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;

export const SKY_FRAG = `uniform vec3 uTop; uniform vec3 uHor; uniform vec3 uBot;
varying vec3 vDir;
void main(){
  float h = vDir.y;
  vec3 c = h > 0.0 ? mix(uHor, uTop, pow(smoothstep(0.0, 0.65, h), 0.7)) : mix(uHor, uBot, smoothstep(0.0, -0.25, h));
  gl_FragColor = vec4(c, 1.0);
}`;

export const LINE_VERT = `attribute vec4 iM0; attribute vec4 iM1; attribute vec4 iM2; attribute vec4 iM3;
varying vec3 vWP;
void main(){
  mat4 m = mat4(iM0, iM1, iM2, iM3);
  vec4 w = m * vec4(position, 1.0);
  vWP = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`;

export const LINE_FRAG = `uniform float uGrow; uniform float uOp; uniform vec3 uCol;
varying vec3 vWP;
void main(){
  if (vWP.y > uGrow + 0.03 || uOp < 0.005) discard;
  float head = 1.0 - smoothstep(0.0, 0.5, uGrow - vWP.y);
  gl_FragColor = vec4(mix(uCol, vec3(1.0), head * 0.8), uOp);
}`;

export const PLAN_VERT = `attribute float aT; attribute float aS;
varying float vT; varying float vS;
void main(){ vT = aT; vS = aS; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;

export const PLAN_FRAG = `uniform float uDraw; uniform float uOp; uniform vec3 uCol;
varying float vT; varying float vS;
void main(){
  float local = clamp((uDraw - vS) / 0.22, 0.0, 1.0);
  if (vT > local || uOp < 0.005) discard;
  float head = smoothstep(local - 0.08, local, vT) * step(local, 0.999);
  gl_FragColor = vec4(mix(uCol, vec3(1.0), head), uOp * (0.75 + head * 0.25));
}`;

export const LENS = {
  uniforms: {
    tDiffuse: { value: null },
    uRes: { value: null },
    uTime: { value: 0 },
    uCA: { value: 0.0018 },
    uVig: { value: 0.55 },
    uGrain: { value: 0.035 },
  },
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: `uniform sampler2D tDiffuse; uniform vec2 uRes; uniform float uTime; uniform float uCA; uniform float uVig; uniform float uGrain;
varying vec2 vUv;
float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void main(){
  vec2 d = vUv - 0.5;
  float r = length(d * vec2(uRes.x / uRes.y, 1.0));
  float ca = uCA * r * r * 4.0;
  vec3 col = vec3(texture2D(tDiffuse, vUv - d * ca).r, texture2D(tDiffuse, vUv).g, texture2D(tDiffuse, vUv + d * ca).b);
  col *= mix(1.0, smoothstep(1.15, 0.32, r), uVig);
  col += (hash(vUv * uRes + fract(uTime) * 91.7) - 0.5) * uGrain;
  gl_FragColor = vec4(col, 1.0);
}`,
};

// Injeta nos materiais padrão do Three o scanner de construção (uGrow), a passagem gesso -> material (uMat) e o grid do chão
export function patchModulo(material, U) {
  material.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, U);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWP;')
      .replace('#include <project_vertex>', `#include <project_vertex>
        vec4 wp4 = vec4(transformed, 1.0);
        #ifdef USE_INSTANCING
          wp4 = instanceMatrix * wp4;
        #endif
        vWP = (modelMatrix * wp4).xyz;`);
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
        varying vec3 vWP;
        uniform float uGrow; uniform float uMat; uniform vec3 uEdge; uniform vec3 uClay;`)
      .replace('#include <clipping_planes_fragment>', '#include <clipping_planes_fragment>\n  if (vWP.y > uGrow) discard;')
      .replace('#include <color_fragment>', `#include <color_fragment>
        diffuseColor.rgb = mix(uClay, diffuseColor.rgb, uMat);`)
      .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\n  roughnessFactor = mix(0.82, roughnessFactor, uMat);')
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        float eg = 1.0 - smoothstep(0.0, 0.16, abs(uGrow - vWP.y));
        totalEmissiveRadiance += uEdge * eg * 3.5 * (1.0 - uMat);`);
  };
  material.customProgramCacheKey = () => 'cerrado-3d-modulo-v1';
  return material;
}

export function patchChao(material, U) {
  material.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, U);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWP;')
      .replace('#include <project_vertex>', '#include <project_vertex>\n  vWP = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWP;\nuniform vec3 uGridCol; uniform float uGridOp;')
      .replace('#include <color_fragment>', `#include <color_fragment>
        vec2 gp = vWP.xz;
        vec2 g1 = abs(fract(gp - 0.5) - 0.5) / fwidth(gp);
        float l1 = 1.0 - min(min(g1.x, g1.y), 1.0);
        vec2 g5 = gp / 5.0;
        vec2 g5f = abs(fract(g5 - 0.5) - 0.5) / fwidth(g5);
        float l5 = 1.0 - min(min(g5f.x, g5f.y), 1.0);
        float fade = 1.0 - smoothstep(30.0, 150.0, length(gp));
        float gl = (l1 * 0.16 + l5 * 0.6) * fade * uGridOp;
        diffuseColor.rgb = mix(diffuseColor.rgb, uGridCol, gl * 0.55);`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        totalEmissiveRadiance += uGridCol * gl * 0.35;`);
  };
  material.customProgramCacheKey = () => 'cerrado-3d-chao-v1';
  return material;
}
