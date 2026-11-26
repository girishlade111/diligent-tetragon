import { ASSETS } from './assets';
import type { LabExperiment } from '@/types/portfolio';

export const EXPERIMENTS: LabExperiment[] = [
  {
    id: 'variable-type-toy',
    slug: 'variable-type-toy',
    frameCode: 'MV-16 · 01A',
    index: '01',
    takeNumber: 21,
    category: 'Experiment',
    year: '2026',
    tools: ['React', 'Canvas'],
    title: 'Variable type toy',
    tagline: 'Drag to bend a variable font.',
    heroImage: ASSETS.lab.variableTypeToy,
    demoUrl: '/lab/variable-type-toy#interactive-demo',
    sourceUrl: 'https://github.com',
    ideaParagraphs: [
      'Variable fonts have a weight axis that most sites set once and never touch. I wanted to know what happens when the reader holds the axis in their hand.',
      'One weekend, one screen, one rule: drag anywhere and the letters get heavier the further you pull.',
    ],
    buildIntro:
      'A small React component with one animation loop. Pointer distance goes in, an eased weight value comes out, and the text reads it through a CSS variable.',
    buildBullets: [
      'One requestAnimationFrame loop for everything that moves',
      'Weight lives in a CSS variable, not in React state',
      'Works with a mouse, a finger and the arrow keys',
      'Under 4 kB gzipped, no animation library',
    ],
    codeSnippet: `let w = 400, target = 400
addEventListener("pointermove", (e) => {
  target = 100 + (e.clientX / innerWidth) * 800
})
function tick() {
  w += (target - w) * 0.12
  el.style.setProperty("--wght", w.toFixed(0))
  requestAnimationFrame(tick)
}
tick()`,
    learnedIntro:
      'Type reads as alive when it lags the hand by a fraction. Too fast feels like a slider, too slow feels broken.',
    learnedBullets: [
      'Tune the easing before the colours',
      'Test on a cheap phone, not on a laptop',
    ],
    pullQuote: 'Half of the hover states I ship today started as this toy.',
  },
  {
    id: 'ui-sound-kit',
    slug: 'ui-sound-kit',
    frameCode: 'MV-16 · 02A',
    index: '02',
    takeNumber: 22,
    category: 'Side project',
    year: '2025',
    tools: ['Web Audio'],
    title: 'UI sound kit',
    tagline: '48 tiny sounds for interfaces.',
    heroImage: ASSETS.lab.uiSoundKit,
    demoUrl: '/lab/ui-sound-kit#interactive-demo',
    sourceUrl: 'https://github.com',
    ideaParagraphs: [
      'Interfaces are almost always silent, so the few sounds they do make tend to be loud and generic. I wanted a set that sits under the interaction instead of on top of it.',
      'The brief to myself: 48 sounds, none longer than 120 ms, all of them pleasant on the hundredth play.',
    ],
    buildIntro:
      'Every sound is synthesised in the browser with the Web Audio API, so the kit has no audio files at all and each sound can be tuned with three numbers.',
    buildBullets: [
      'Oscillator, filter and envelope per sound, nothing else',
      'Pitch follows the size of the element you touch',
      'Respects reduced-motion and a global mute',
      'Exported as a 2 kB module with a tiny play() function',
    ],
    codeSnippet: `const ctx = new AudioContext()
export function tap(pitch = 660) {
  const o = ctx.createOscillator(), g = ctx.createGain()
  o.frequency.value = pitch
  g.gain.setValueAtTime(0.18, ctx.currentTime)
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09)
  o.connect(g).connect(ctx.destination)
  o.start(); o.stop(ctx.currentTime + 0.1)
}`,
    learnedIntro:
      'Quiet beats clever. The sounds people kept were the ones they stopped noticing after a day.',
    learnedBullets: [
      'Short decays feel faster than short attacks',
      'Always ship a mute that remembers itself',
    ],
    pullQuote: "A good UI sound is one you only miss when it's gone.",
  },
  {
    id: 'shader-gradients',
    slug: 'shader-gradients',
    frameCode: 'MV-16 · 03A',
    index: '03',
    takeNumber: 23,
    category: 'Experiment',
    year: '2025',
    tools: ['WebGL', 'GLSL'],
    title: 'Shader gradients',
    tagline: 'Mesh gradients you can paint.',
    heroImage: ASSETS.lab.shaderGradients,
    demoUrl: '/lab/shader-gradients#interactive-demo',
    sourceUrl: 'https://github.com',
    ideaParagraphs: [
      'Mesh gradients look great in a design file and terrible as exported PNGs. I wanted gradients that stay sharp at any size and can be painted, not just picked.',
      'Four colour points you can drag, a little grain, and a slow drift so the page never looks frozen.',
    ],
    buildIntro:
      'A single fragment shader in WebGL. The colour points are uniforms, the blend is a weighted distance field, and the grain is a cheap hash so it costs nothing to animate.',
    buildBullets: [
      'One full-screen triangle, one shader, no library',
      'Colour points dragged straight on the canvas',
      'Grain added in the shader to hide banding',
      'Falls back to a CSS gradient when WebGL is off',
    ],
    codeSnippet: `precision mediump float;
uniform vec2 p[4]; uniform vec3 c[4];
varying vec2 uv;
void main() {
  vec3 col = vec3(0.0); float t = 0.0;
  for (int i = 0; i < 4; i++) {
    float w = 1.0 / pow(distance(uv, p[i]) + 0.05, 2.0);
    col += c[i] * w; t += w;
  }
  gl_FragColor = vec4(col / t, 1.0);
}`,
    learnedIntro:
      'Banding is the real enemy of gradients. A tiny amount of noise does more for quality than any extra colour stop.',
    learnedBullets: [
      'Add grain before you add colours',
      'Keep a CSS fallback that looks intentional',
    ],
    pullQuote: 'The best gradient is the one nobody calls a gradient.',
  },
  {
    id: 'figma-token-plugin',
    slug: 'figma-token-plugin',
    frameCode: 'MV-16 · 04A',
    index: '04',
    takeNumber: 24,
    category: 'Open source',
    year: '2024',
    tools: ['Figma API', 'TypeScript'],
    title: 'Token sync plugin',
    tagline: 'Keeps Figma and code tokens in sync.',
    heroImage: ASSETS.lab.figmaTokenPlugin,
    demoUrl: '/lab/figma-token-plugin#interactive-demo',
    sourceUrl: 'https://github.com',
    ideaParagraphs: [
      'Every team I worked with had two sets of design tokens: the ones in Figma and the ones in code, slowly drifting apart.',
      'I wanted one button that makes them the same again, in either direction, with a readable diff before anything changes.',
    ],
    buildIntro:
      'A Figma plugin written in TypeScript. It reads local variables, writes a tokens.json in the W3C format and opens a pull request through the GitHub API.',
    buildBullets: [
      'Reads Figma variables and modes, not styles',
      'Shows a diff before writing anything',
      'Opens a pull request instead of pushing to main',
      'Open source, used by eleven teams I know of',
    ],
    codeSnippet: `const vars = await figma.variables.getLocalVariablesAsync()
const tokens = Object.fromEntries(vars.map((v) => [
  v.name.replace(/\\//g, "."),
  { $type: v.resolvedType.toLowerCase(), $value: v.valuesByMode[modeId] }
]))
figma.ui.postMessage({ type: "diff", tokens })`,
    learnedIntro:
      'Sync tools fail on trust, not on code. People only press the button when they can see exactly what it will change.',
    learnedBullets: [
      'Show the diff first, always',
      'Make the safe path the default one',
    ],
    pullQuote: 'A plugin earns its place the day nobody has to ask which file is right.',
  },
  {
    id: 'film-camera-app',
    slug: 'film-camera-app',
    frameCode: 'MV-16 · 05A',
    index: '05',
    takeNumber: 25,
    category: 'Concept',
    year: '2024',
    tools: ['SwiftUI', 'Figma'],
    title: 'Film camera app',
    tagline: 'A camera that makes you wait.',
    heroImage: ASSETS.lab.filmCameraApp,
    demoUrl: '/lab/film-camera-app#interactive-demo',
    sourceUrl: 'https://github.com',
    ideaParagraphs: [
      'Phone cameras made photos instant and, for me, forgettable. I wanted to design a camera that brings the wait back.',
      'You get 24 shots per roll, no preview, and the photos develop one day after you finish the roll.',
    ],
    buildIntro:
      'A SwiftUI concept with a real capture pipeline: photos are stored encrypted until the roll is done, then a background task develops them with a grain and colour profile per film stock.',
    buildBullets: [
      'Three film stocks, each with its own colour curve',
      'No screen preview, only the frame counter',
      'Development runs overnight as a background task',
      'Designed in Figma, prototyped in SwiftUI',
    ],
    codeSnippet: `struct Roll {
  var shots: [Shot] = []
  let size = 24
  var isFull: Bool { shots.count == size }
  var developsAt: Date? {
    isFull ? Calendar.current.date(byAdding: .day, value: 1, to: .now) : nil
  }
}`,
    learnedIntro:
      'Constraints made people care. Testers took fewer photos and kept more of them.',
    learnedBullets: [
      'Removing a feature can be the feature',
      'Design the waiting, not just the result',
    ],
    pullQuote: 'The best moment in the app is the notification that your roll is ready.',
  },
  {
    id: 'motion-cheatsheet',
    slug: 'motion-cheatsheet',
    frameCode: 'MV-16 · 06A',
    index: '06',
    takeNumber: 26,
    category: 'Resource',
    year: '2023',
    tools: ['Framer'],
    title: 'Motion cheatsheet',
    tagline: 'Easing curves you can copy.',
    heroImage: ASSETS.lab.motionCheatsheet,
    demoUrl: '/lab/motion-cheatsheet#interactive-demo',
    sourceUrl: 'https://github.com',
    ideaParagraphs: [
      'I kept rewriting the same easing curves from memory on every project. So I put the ones I trust on one page.',
      'Every curve plays on a small card, with the exact values ready to copy for CSS, Framer and Swift.',
    ],
    buildIntro:
      'A Framer site with one component per curve. The cards are driven by a single data list, so adding a new curve is one line, and the copy button formats it for the tool you pick.',
    buildBullets: [
      'Twelve curves, each with a use case',
      'Copy as CSS, Framer Motion or SwiftUI',
      'Cards replay on hover so you can compare',
      'Built and hosted in Framer',
    ],
    codeSnippet: `export const curves = {
  enter: [0.2, 0.8, 0.2, 1],
  exit:  [0.4, 0,   1,   1],
  move:  [0.65, 0,  0.35, 1],
  spring: { stiffness: 380, damping: 30 },
}`,
    learnedIntro:
      'Most motion problems are timing problems. The right duration fixes more than the perfect curve.',
    learnedBullets: [
      'Enter slower than you exit',
      'Name curves after what they do, not their numbers',
    ],
    pullQuote: 'A shared cheatsheet ended more design-dev arguments than any spec I wrote.',
  },
];

export function getExperimentBySlug(slug: string): LabExperiment | undefined {
  return EXPERIMENTS.find((item) => item.slug === slug);
}
