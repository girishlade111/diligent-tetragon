import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium, Page } from 'playwright';

const BASE_URL = 'https://diligent-tetragon-837366.framer.app';

interface RouteRecord {
  id: string;
  localPath: string;
  referenceUrl: string;
  httpStatus: number | null;
}

async function dismissPreloaderIfAny(page: Page) {
  // Check if preloader skip button exists and click or wait
  const skipBtn = page.locator('button:has-text("Skip"), [aria-label*="Skip"], text=/Skip/i').first();
  if (await skipBtn.isVisible({ timeout: 600 }).catch(() => false)) {
    await skipBtn.click().catch(() => {});
    await page.waitForTimeout(500);
  }
}

async function extractPageTelemetry(page: Page) {
  return page.evaluate(async () => {
    await document.fonts.ready;
    const fonts = Array.from(document.fonts).map((f) => ({
      family: f.family,
      weight: f.weight,
      style: f.style,
      status: f.status,
    }));

    const stylesheets: string[] = [];
    for (const sheet of Array.from(document.styleSheets)) {
      if (sheet.href) stylesheets.push(sheet.href);
    }

    // Extract CSS custom properties from :root / body / Framer containers
    const cssVars: Record<string, string> = {};
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        for (const rule of Array.from(sheet.cssRules || [])) {
          if (rule instanceof CSSStyleRule && (rule.selectorText === ':root' || rule.selectorText === 'body' || rule.selectorText.includes('--token-'))) {
            for (let i = 0; i < rule.style.length; i++) {
              const prop = rule.style[i];
              if (prop.startsWith('--')) {
                cssVars[prop] = rule.style.getPropertyValue(prop).trim();
              }
            }
          }
        }
      } catch {
        // cross-origin sheet
      }
    }

    // Collect images
    const images = Array.from(document.querySelectorAll('img')).map((img) => {
      const rect = img.getBoundingClientRect();
      const cs = getComputedStyle(img);
      return {
        src: img.currentSrc || img.src,
        srcRaw: img.getAttribute('src'),
        srcset: img.getAttribute('srcset'),
        alt: img.alt,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        rect: { x: rect.x, y: rect.y + window.scrollY, width: rect.width, height: rect.height },
        objectFit: cs.objectFit,
        objectPosition: cs.objectPosition,
        borderRadius: cs.borderRadius,
        opacity: cs.opacity,
        mixBlendMode: cs.mixBlendMode,
        filter: cs.filter,
      };
    });

    // Collect CSS background images
    const bgImages: Array<{ selector: string; backgroundImage: string; rect: { width: number; height: number } }> = [];
    for (const el of Array.from(document.querySelectorAll('*'))) {
      const cs = getComputedStyle(el);
      if (cs.backgroundImage && cs.backgroundImage !== 'none' && cs.backgroundImage.includes('url(')) {
        const rect = el.getBoundingClientRect();
        bgImages.push({
          selector: el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(' ').slice(0, 2).join('.') : ''),
          backgroundImage: cs.backgroundImage,
          rect: { width: rect.width, height: rect.height },
        });
      }
    }

    // Collect inline SVGs
    const svgs = Array.from(document.querySelectorAll('svg')).map((svg) => {
      const rect = svg.getBoundingClientRect();
      return {
        viewBox: svg.getAttribute('viewBox'),
        width: rect.width,
        height: rect.height,
        outerHTML: svg.outerHTML.slice(0, 2500),
      };
    });

    // Collect typography samples for visible headings, paragraphs, buttons, nav links
    const typoSamples: Array<Record<string, unknown>> = [];
    const seen = new Set<string>();
    for (const el of Array.from(document.querySelectorAll('h1, h2, h3, h4, p, a, button, header, nav, footer, section'))) {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      const tag = el.tagName.toLowerCase();
      const text = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 100);
      const key = `${tag}|${cs.fontFamily}|${cs.fontSize}|${cs.fontWeight}|${cs.color}|${cs.backgroundColor}`;
      if (seen.has(key) && tag !== 'h1' && tag !== 'h2' && tag !== 'header' && tag !== 'footer') continue;
      seen.add(key);
      typoSamples.push({
        tag,
        text,
        rect: { x: Math.round(rect.x), y: Math.round(rect.y + window.scrollY), w: Math.round(rect.width), h: Math.round(rect.height) },
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        lineHeight: cs.lineHeight,
        letterSpacing: cs.letterSpacing,
        textTransform: cs.textTransform,
        color: cs.color,
        backgroundColor: cs.backgroundColor,
        borderRadius: cs.borderRadius,
        border: cs.border,
        padding: cs.padding,
        gap: cs.gap,
      });
    }

    // Collect full visible text blocks in visual top-to-bottom order
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const textNodes: Array<{ text: string; y: number; x: number; fontSize: string; color: string; fontFamily: string }> = [];
    let node: Node | null;
    while ((node = walker.nextNode())) {
      const txt = (node.textContent || '').trim().replace(/\s+/g, ' ');
      if (!txt) continue;
      const parent = node.parentElement;
      if (!parent) continue;
      const cs = getComputedStyle(parent);
      if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) continue;
      const rect = parent.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      textNodes.push({
        text: txt,
        y: Math.round(rect.y + window.scrollY),
        x: Math.round(rect.x),
        fontSize: cs.fontSize,
        color: cs.color,
        fontFamily: cs.fontFamily,
      });
    }

    // Collect animations
    const animations = document.getAnimations().map((a) => ({
      id: a.id,
      playState: a.playState,
      timing: a.effect?.getComputedTiming(),
    }));

    return {
      url: location.href,
      title: document.title,
      scrollHeight: document.documentElement.scrollHeight,
      scrollWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      fonts,
      stylesheets,
      cssVars,
      images,
      bgImages,
      svgsCount: svgs.length,
      svgs: svgs.slice(0, 40),
      typoSamples,
      textNodes,
      animationsCount: animations.length,
    };
  });
}

async function main() {
  const researchDir = path.resolve(process.cwd(), 'research');
  const routesJson = JSON.parse(await fs.readFile(path.join(researchDir, 'manifests', 'routes.json'), 'utf-8'));
  const routes: RouteRecord[] = routesJson.routes.filter((r: RouteRecord) => r.httpStatus === 200);

  const browser = await chromium.launch({ headless: true });

  // 1. Desktop 1440x900 pass across all routes
  const desktopCtx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await desktopCtx.newPage();

  const fontUrls = new Set<string>();
  const mediaUrls = new Set<string>();

  page.on('response', (resp) => {
    const u = resp.url();
    const ct = resp.headers()['content-type'] || '';
    if (ct.includes('font') || /\.(woff2?|ttf|otf)(\?|$)/i.test(u)) {
      fontUrls.add(u);
    }
    if (ct.includes('image') || ct.includes('video') || ct.includes('audio') || u.includes('framerusercontent.com/images') || u.includes('framerusercontent.com/assets')) {
      mediaUrls.add(u);
    }
  });

  for (const route of routes) {
    const safeId = route.id;
    const outDir = path.join(researchDir, 'reference', 'pages', safeId);
    const shotDir = path.join(researchDir, 'reference', 'screenshots', 'desktop', safeId);
    await fs.mkdir(outDir, { recursive: true });
    await fs.mkdir(shotDir, { recursive: true });

    try {
      await page.goto(route.referenceUrl, { waitUntil: 'networkidle', timeout: 35000 }).catch(() => {});
      await page.waitForTimeout(1000);

      // Capture preloader on home before dismissing
      if (route.localPath === '/') {
        await page.screenshot({ path: path.join(shotDir, 'preloader.png') });
      }

      await dismissPreloaderIfAny(page);
      await page.waitForTimeout(1800);

      // Scroll through page to trigger lazy images and scroll reveals
      const totalH = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y <= totalH; y += 700) {
        await page.evaluate((pos) => window.scrollTo(0, pos), y);
        await page.waitForTimeout(180);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(600);

      // Above the fold
      await page.screenshot({ path: path.join(shotDir, 'above-fold-1440.png') });
      // Full page
      await page.screenshot({ path: path.join(shotDir, 'full-1440.png'), fullPage: true });

      const telemetry = await extractPageTelemetry(page);
      const html = await page.content();
      await fs.writeFile(path.join(outDir, 'telemetry-1440.json'), JSON.stringify(telemetry, null, 2), 'utf-8');
      await fs.writeFile(path.join(outDir, 'rendered.html'), html, 'utf-8');

      console.log(`Captured [1440] ${route.localPath} (h=${telemetry.scrollHeight}, imgs=${telemetry.images.length}, textNodes=${telemetry.textNodes.length})`);
    } catch (err) {
      console.error(`Error capturing ${route.localPath}:`, err);
    }
  }

  await desktopCtx.close();

  // 2. Mobile 390x844 pass on key representative pages + all main pages
  const mobileRoutes = routes.filter((r) =>
    ['/', '/work', '/about', '/resume', '/services', '/lab', '/writing', '/contact', '/work/sole-campaign', '/services/product-design', '/lab/variable-type-toy', '/writing/design-in-the-browser', '/privacy', '/terms'].includes(r.localPath)
  );
  const mobileCtx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const mPage = await mobileCtx.newPage();

  for (const route of mobileRoutes) {
    const shotDir = path.join(researchDir, 'reference', 'screenshots', 'mobile', route.id);
    await fs.mkdir(shotDir, { recursive: true });
    try {
      await mPage.goto(route.referenceUrl, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
      await mPage.waitForTimeout(1200);
      await dismissPreloaderIfAny(mPage);
      await mPage.waitForTimeout(1500);
      await mPage.screenshot({ path: path.join(shotDir, 'above-fold-390.png') });
      await mPage.screenshot({ path: path.join(shotDir, 'full-390.png'), fullPage: true });
      const mTelemetry = await extractPageTelemetry(mPage);
      await fs.writeFile(path.join(researchDir, 'reference', 'pages', route.id, 'telemetry-390.json'), JSON.stringify(mTelemetry, null, 2), 'utf-8');
      console.log(`Captured [390] ${route.localPath} (h=${mTelemetry.scrollHeight}, w=${mTelemetry.scrollWidth})`);
    } catch (err) {
      console.error(`Error mobile ${route.localPath}:`, err);
    }
  }

  await mobileCtx.close();
  await browser.close();

  await fs.writeFile(
    path.join(researchDir, 'manifests', 'discovered-network-urls.json'),
    JSON.stringify({ fonts: Array.from(fontUrls), media: Array.from(mediaUrls) }, null, 2),
    'utf-8'
  );
  console.log(`Discovered ${fontUrls.size} font URLs and ${mediaUrls.size} media URLs.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
