/**
 * Liquid aurora backdrop for the hero — a small WebGL fragment shader
 * (domain-warped fbm noise mapped onto the --aurora-* token stops).
 *
 * - Reads colours from CSS custom properties so tokens stay the source of truth.
 * - Renders at reduced resolution and pauses when off-screen or tab hidden.
 * - Honours prefers-reduced-motion by drawing a single still frame.
 * - Falls back to the CSS gradient already on the container if WebGL is absent,
 *   or if the first frame comes out near-black (see `looksBroken`).
 *
 * Precision: the noise hash needs 32-bit floats. Many phone GPUs implement
 * `mediump` as 16-bit, which collapses the hash to ~0 and renders the aurora as
 * its darkest stop (near-black). So the shader asks for `highp` when available.
 */

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;
uniform vec3 c1; uniform vec3 c2; uniform vec3 c3; uniform vec3 c4;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x),
             mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = r * p * 2.02; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y);
  float t = uTime * 0.045;
  p += (uPointer - 0.5) * 0.18;

  vec2 q = vec2(fbm(p * 1.4 + t), fbm(p * 1.4 - t + 3.1));
  vec2 r = vec2(fbm(p * 1.6 + 2.2 * q + vec2(1.7, 9.2) + t * 1.3),
                fbm(p * 1.6 + 2.2 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p * 1.2 + 2.6 * r);

  // Ribbon bands, like aurora curtains folding over each other.
  float band = clamp((f - 0.25) * 1.9 + 0.22 * sin(3.0 * (p.x + r.y) + t * 6.0), 0.0, 1.0);

  vec3 col = mix(c4, c3, smoothstep(0.0, 0.35, band));
  col = mix(col, c2, smoothstep(0.30, 0.65, band));
  col = mix(col, c1, smoothstep(0.62, 0.95, band) * (0.6 + 0.4 * q.x));

  // Keep the lower-left calmer so the monumental type stays legible.
  float vignette = smoothstep(1.35, 0.15, length(uv - vec2(0.75, 0.7)));
  col = mix(c4 * 0.55, col, 0.45 + 0.55 * vignette);
  col *= 0.84 + 0.06 * hash(gl_FragCoord.xy + uTime); // depth + film grain

  gl_FragColor = vec4(col, 1.0);
}
`;

/** Resolve a CSS colour token (hex, rgb(), oklch…) to linear 0–1 RGB via the browser. */
function readRgb(name: string): [number, number, number] {
  const probe = document.createElement('span');
  probe.style.color = `var(${name})`;
  probe.style.display = 'none';
  document.body.appendChild(probe);
  const m = getComputedStyle(probe).color.match(/[\d.]+/g);
  probe.remove();
  if (!m || m.length < 3) return [0, 0, 0];
  return [Number(m[0]) / 255, Number(m[1]) / 255, Number(m[2]) / 255];
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? 'shader');
  return s;
}

/**
 * Reads the first rendered frame back and reports whether it is essentially black,
 * which is what a GPU without enough float precision produces. A healthy frame has
 * a mean channel value around 110-120; a precision-collapsed one is ~24.
 */
function looksBroken(gl: WebGLRenderingContext, canvas: HTMLCanvasElement) {
  const w = canvas.width, h = canvas.height;
  const px = new Uint8Array(w * h * 4);
  gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, px);
  let sum = 0;
  for (let i = 0; i < px.length; i += 4) sum += px[i] + px[i + 1] + px[i + 2];
  return sum / ((px.length / 4) * 3) < 45;
}

export function mountAurora(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false });
  if (!gl) return;

  let prog: WebGLProgram;
  try {
    prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  } catch {
    return;
  }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const u = (n: string) => gl.getUniformLocation(prog, n);
  const uRes = u('uRes'), uTime = u('uTime'), uPointer = u('uPointer');
  (['--aurora-1', '--aurora-2', '--aurora-3', '--aurora-4'] as const).forEach((name, i) => {
    gl.uniform3fv(u(`c${i + 1}`), readRgb(name));
  });

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scale = 0.5; // render at half resolution; the texture is soft by design
  const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2) * scale;
    canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr));
    canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uRes, canvas.width, canvas.height);
  };

  let raf = 0;
  let visible = true;
  const start = performance.now() - 40_000; // start mid-flow, not at t=0

  const draw = (now: number) => {
    pointer.x += (pointer.tx - pointer.x) * 0.03;
    pointer.y += (pointer.ty - pointer.y) * 0.03;
    // Keep the time uniform small so float precision never degrades on long visits.
    gl.uniform1f(uTime, ((now - start) / 1000) % 1200);
    gl.uniform2f(uPointer, pointer.x, pointer.y);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const loop = (now: number) => {
    draw(now);
    raf = requestAnimationFrame(loop);
  };

  const run = () => {
    cancelAnimationFrame(raf);
    if (reduce.matches) draw(performance.now());
    else if (visible && !document.hidden) raf = requestAnimationFrame(loop);
  };

  resize();
  draw(performance.now());
  if (looksBroken(gl, canvas)) return; // leave the CSS fallback visible
  canvas.dataset.ready = 'true';
  run();

  new ResizeObserver(() => { resize(); if (reduce.matches) draw(performance.now()); }).observe(canvas);
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; run(); }).observe(canvas);
  document.addEventListener('visibilitychange', run);
  reduce.addEventListener('change', run);
  window.addEventListener('pointermove', (e) => {
    pointer.tx = e.clientX / window.innerWidth;
    pointer.ty = 1 - e.clientY / window.innerHeight;
  }, { passive: true });
}
