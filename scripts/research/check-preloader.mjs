import { chromium } from 'playwright';

const b = await chromium.launch({ headless: true });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto('https://diligent-tetragon-837366.framer.app/', { waitUntil: 'domcontentloaded' });
await p.waitForTimeout(150);
await p.screenshot({ path: 'research/reference/screenshots/desktop/home/preloader-fresh.png' });
const txt = await p.evaluate(() => {
  const el = document.querySelector('[data-framer-name*="MvLoader"]');
  return el ? { html: el.innerHTML.slice(0, 3000), text: el.textContent } : null;
});
console.log('MvLoader:', JSON.stringify(txt, null, 2));
await b.close();
