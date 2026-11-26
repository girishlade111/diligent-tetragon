import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const BASE_URL = 'https://diligent-tetragon-837366.framer.app';

async function main() {
  const outDir = path.resolve(process.cwd(), 'research', 'reference', 'interactions');
  const shotDir = path.resolve(process.cwd(), 'research', 'reference', 'screenshots', 'interaction-states');
  await fs.mkdir(outDir, { recursive: true });
  await fs.mkdir(shotDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // 1. Homepage interactions
  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 35000 }).catch(() => {});
  await page.waitForTimeout(800);
  const preloaderText = await page.locator('body').innerText().catch(() => '');
  const skipBtn = page.locator('button:has-text("Skip"), [aria-label*="Skip"], text=/Skip/i').first();
  if (await skipBtn.isVisible({ timeout: 800 }).catch(() => false)) {
    await skipBtn.click().catch(() => {});
    await page.waitForTimeout(1000);
  }
  await page.waitForTimeout(1500);

  // Inspect hero pointer move and backdrop click
  await page.mouse.move(250, 250);
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(shotDir, 'home-hero-light-topleft.png') });
  await page.mouse.move(1100, 500);
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(shotDir, 'home-hero-light-right.png') });

  // Inspect hero DOM structure (giant MARA VOSS wordmark, portrait, backdrop)
  const heroReport = await page.evaluate(() => {
    const heroEls = Array.from(document.querySelectorAll('h1, [data-framer-name*="Hero"], [data-framer-name*="hero"], [data-framer-name*="Portrait"], [data-framer-name*="Backdrop"]'));
    const namedEls = Array.from(document.querySelectorAll('[data-framer-name]')).slice(0, 120).map((el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        name: el.getAttribute('data-framer-name'),
        tag: el.tagName.toLowerCase(),
        rect: { x: Math.round(r.x), y: Math.round(r.y + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) },
        position: cs.position,
        top: cs.top,
        zIndex: cs.zIndex,
        bg: cs.backgroundColor,
        bgImg: cs.backgroundImage?.slice(0, 120),
        overflow: cs.overflow,
      };
    });
    return { heroCount: heroEls.length, namedEls };
  });

  // Try clicking backdrop / portrait area to see if backdrop changes
  const backdropLabelBefore = await page.evaluate(() => document.body.innerText.slice(0, 1500));
  const portraitArea = page.locator('[data-framer-name*="Portrait"], [data-framer-name*="Hero"]').first();
  if (await portraitArea.isVisible().catch(() => false)) {
    await portraitArea.click({ position: { x: 400, y: 300 } }).catch(() => {});
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(shotDir, 'home-hero-backdrop-click1.png') });
    await portraitArea.click({ position: { x: 400, y: 300 } }).catch(() => {});
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(shotDir, 'home-hero-backdrop-click2.png') });
  }
  const backdropLabelAfter = await page.evaluate(() => document.body.innerText.slice(0, 1500));

  // Scroll captures along homepage scroll-pinned sections
  const homeScrollH = await page.evaluate(() => document.documentElement.scrollHeight);
  const scrollSamples: Array<{ y: number; activeTexts: string[] }> = [];
  for (let frac = 0; frac <= 1.0; frac += 0.1) {
    const y = Math.round(homeScrollH * frac);
    await page.evaluate((pos) => window.scrollTo(0, pos), y);
    await page.waitForTimeout(450);
    await page.screenshot({ path: path.join(shotDir, `home-scroll-${Math.round(frac * 100)}.png`) });
    const visibleSample = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('h2, h3, [data-framer-name]'))
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.top >= -50 && r.top <= 900 && r.width > 0 && r.height > 0;
        })
        .slice(0, 20)
        .map((el) => `${el.getAttribute('data-framer-name') || el.tagName}: ${(el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 60)}`);
    });
    scrollSamples.push({ y, activeTexts: visibleSample });
  }

  // 2. Inspect Contact page dropdowns & interactions
  await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(1200);
  const contactDetails = await page.evaluate(() => {
    const namedEls = Array.from(document.querySelectorAll('[data-framer-name]')).map((el) => ({
      name: el.getAttribute('data-framer-name'),
      tag: el.tagName.toLowerCase(),
      text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 100),
    }));
    const inputs = Array.from(document.querySelectorAll('input, select, textarea, button')).map((el) => ({
      tag: el.tagName.toLowerCase(),
      type: el.getAttribute('type'),
      name: el.getAttribute('name'),
      placeholder: el.getAttribute('placeholder'),
      ariaLabel: el.getAttribute('aria-label'),
      text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 120),
      options: el.tagName === 'SELECT' ? Array.from((el as HTMLSelectElement).options).map((o) => o.text) : undefined,
    }));
    return { namedEls: namedEls.slice(0, 150), inputs };
  });

  // 3. Inspect Work page filters & Sheet/List toggle
  await page.goto(`${BASE_URL}/work`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(1200);
  const listBtn = page.locator('button:has-text("List"), [role="button"]:has-text("List"), text=/^List$/i').first();
  if (await listBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
    await listBtn.click().catch(() => {});
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(shotDir, 'work-list-mode.png'), fullPage: true });
  }

  // 4. Inspect About timeline scroll / click
  await page.goto(`${BASE_URL}/about`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(1200);
  const aboutNamed = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('[data-framer-name]')).map((el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        name: el.getAttribute('data-framer-name'),
        tag: el.tagName.toLowerCase(),
        y: Math.round(r.y + window.scrollY),
        h: Math.round(r.height),
        position: cs.position,
        text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80),
      };
    });
  });

  // 5. Inspect Lab filters & hover
  await page.goto(`${BASE_URL}/lab`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(1200);
  const labReport = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('[data-framer-name]')).map((el) => ({
      name: el.getAttribute('data-framer-name'),
      tag: el.tagName.toLowerCase(),
      text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80),
    }));
  });

  await browser.close();

  await fs.writeFile(
    path.join(outDir, 'interactions-report.json'),
    JSON.stringify(
      {
        preloaderText: preloaderText.slice(0, 600),
        backdropChanged: backdropLabelBefore !== backdropLabelAfter,
        heroNamedElements: heroReport,
        homeScrollHeight: homeScrollH,
        scrollSamples,
        contactDetails,
        aboutNamed: aboutNamed.slice(0, 150),
        labNamed: labReport.slice(0, 120),
      },
      null,
      2
    ),
    'utf-8'
  );
  console.log('Interaction inspection complete.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
