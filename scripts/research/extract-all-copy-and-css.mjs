import fs from 'node:fs/promises';
import path from 'node:path';

async function main() {
  const researchDir = path.resolve(process.cwd(), 'research');
  const pagesDir = path.join(researchDir, 'reference', 'pages');
  const dirs = await fs.readdir(pagesDir);

  const cssOutDir = path.join(researchDir, 'reference', 'styles', 'extracted');
  await fs.mkdir(cssOutDir, { recursive: true });

  // Extract inline <style> blocks containing custom .mv styles from home, work, about, resume, services, lab, writing, contact, uses, 404
  const customCssSeen = new Set();
  const customCssChunks = [];
  const pageTextSummaries = {};

  for (const dir of dirs) {
    const htmlPath = path.join(pagesDir, dir, 'rendered.html');
    const telPath = path.join(pagesDir, dir, 'telemetry-1440.json');
    try {
      const html = await fs.readFile(htmlPath, 'utf-8');
      const styleMatches = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
      for (const m of styleMatches) {
        const css = m[1].trim();
        if (css.includes('.mv') || css.includes('--mv') || css.includes('Mona Sans') || css.includes('@keyframes')) {
          if (!customCssSeen.has(css)) {
            customCssSeen.add(css);
            customCssChunks.push(`/* === FROM ${dir} === */\n${css}`);
          }
        }
      }

      const tel = JSON.parse(await fs.readFile(telPath, 'utf-8'));
      pageTextSummaries[dir] = {
        url: tel.url,
        title: tel.title,
        scrollHeight: tel.scrollHeight,
        images: tel.images.map((i) => ({ src: i.src, alt: i.alt, w: Math.round(i.rect.width), h: Math.round(i.rect.height), filter: i.filter })),
        textNodes: tel.textNodes,
      };
    } catch (e) {
      console.warn(`Skip ${dir}:`, e.message);
    }
  }

  await fs.writeFile(path.join(cssOutDir, 'framer-custom-styles.css'), customCssChunks.join('\n\n'), 'utf-8');
  await fs.writeFile(path.join(researchDir, 'manifests', 'extracted-pages-summary.json'), JSON.stringify(pageTextSummaries, null, 2), 'utf-8');
  console.log(`Extracted ${customCssChunks.length} custom CSS blocks and ${Object.keys(pageTextSummaries).length} page summaries.`);
}

main().catch(console.error);
