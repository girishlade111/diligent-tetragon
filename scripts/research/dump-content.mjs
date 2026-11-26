import fs from 'node:fs';
import path from 'node:path';

const outDir = 'research/reference/content';
fs.mkdirSync(outDir, { recursive: true });
const p = JSON.parse(fs.readFileSync('research/manifests/extracted-pages-summary.json', 'utf8'));

for (const [k, v] of Object.entries(p)) {
  const lines = v.textNodes
    .filter(
      (t) =>
        t.text &&
        !t.text.startsWith(':where(.mv)') &&
        !t.text.includes('Get template') &&
        !t.text.includes('Get All-Access') &&
        !t.text.includes('Customization') &&
        !t.text.includes('Made in Framer')
    )
    .map((t) => `[y=${t.y} fs=${t.fontSize}] ${t.text}`);
  fs.writeFileSync(
    path.join(outDir, `${k}.txt`),
    `TITLE: ${v.title}\nURL: ${v.url}\nHEIGHT: ${v.scrollHeight}\n\n${lines.join('\n')}`
  );
}

const css = fs.readFileSync('research/reference/styles/extracted/mv-rules-summary.txt', 'utf8');
const prefixes = new Set();
for (const m of css.matchAll(/\.(mv[a-z0-9_-]*)/g)) {
  prefixes.add(m[1].split('-')[0]);
}
console.log('Content dumped for', Object.keys(p).length, 'pages. CSS prefixes:', Array.from(prefixes).join(', '));
