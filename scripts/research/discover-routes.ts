import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const BASE_URL = 'https://diligent-tetragon-837366.framer.app';

const SEED_ROUTES = [
  '/',
  '/work',
  '/about',
  '/resume',
  '/services',
  '/lab',
  '/writing',
  '/contact',
  '/work/sole-campaign',
  '/work/rouge-packaging',
  '/work/nord-brand-identity',
  '/work/atlas-dev-platform',
  '/work/print-colour-system',
  '/work/type-poster-series',
  '/work/loop-banking-app',
  '/work/pulse-dashboard',
  '/services/product-design',
  '/services/design-systems',
  '/services/front-end-development',
  '/services/brand-and-web',
  '/lab/variable-type-toy',
  '/lab/ui-sound-kit',
  '/lab/shader-gradients',
  '/lab/figma-token-plugin',
  '/lab/film-camera-app',
  '/lab/motion-cheatsheet',
  '/writing/design-in-the-browser',
  '/writing/design-system-that-sticks',
  '/writing/freelance-year-three',
  '/writing/prototype-in-code',
  '/writing/motion-that-means-something',
  '/writing/pricing-design-work',
  '/privacy',
  '/terms',
];

function normalizePath(rawUrl: string): string | null {
  try {
    const u = new URL(rawUrl, BASE_URL);
    if (u.origin !== BASE_URL) return null;
    let p = u.pathname.replace(/\/+$/, '');
    if (!p) p = '/';
    return p;
  } catch {
    return null;
  }
}

async function main() {
  const researchDir = path.resolve(process.cwd(), 'research');
  await fs.mkdir(path.join(researchDir, 'manifests'), { recursive: true });
  await fs.mkdir(path.join(researchDir, 'reference', 'meta'), { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });

  // Check robots.txt and sitemap.xml and 404
  const page = await context.newPage();
  for (const metaPath of ['/robots.txt', '/sitemap.xml', '/__404-probe-check__']) {
    try {
      const resp = await page.goto(`${BASE_URL}${metaPath}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
      const text = await resp?.text();
      await fs.writeFile(
        path.join(researchDir, 'reference', 'meta', metaPath.replace(/\//g, '_').replace(/^_/, '') + '.txt'),
        `STATUS: ${resp?.status()}\nFINAL_URL: ${resp?.url()}\n\n${text ?? ''}`,
        'utf-8'
      );
      console.log(`Checked ${metaPath} -> ${resp?.status()}`);
    } catch (err) {
      console.error(`Failed ${metaPath}:`, err);
    }
  }

  const discovered = new Set<string>(SEED_ROUTES);
  const visited = new Set<string>();
  const queue = [...SEED_ROUTES];
  const externalLinks = new Set<string>();
  const routeRecords: Record<string, unknown>[] = [];

  while (queue.length > 0 && visited.size < 100) {
    const routePath = queue.shift()!;
    if (visited.has(routePath)) continue;
    visited.add(routePath);

    const url = `${BASE_URL}${routePath === '/' ? '' : routePath}`;
    try {
      const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(800);
      const status = resp?.status() ?? null;
      const finalUrl = resp?.url() ?? url;
      const title = await page.title();
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href').catch(() => null);

      const links = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a[href]')).map((a) => ({
          href: a.getAttribute('href') || '',
          text: (a.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 120),
        }));
      });

      const pageInternal: string[] = [];
      const pageExternal: string[] = [];

      for (const l of links) {
        if (!l.href || l.href.startsWith('#') || l.href.startsWith('mailto:') || l.href.startsWith('tel:') || l.href.startsWith('javascript:')) {
          if (l.href.startsWith('mailto:') || l.href.startsWith('tel:')) pageExternal.push(l.href);
          continue;
        }
        const norm = normalizePath(l.href);
        if (norm) {
          pageInternal.push(norm);
          if (!discovered.has(norm)) {
            discovered.add(norm);
            queue.push(norm);
          }
        } else {
          pageExternal.push(l.href);
          externalLinks.add(l.href);
        }
      }

      const meta = await page.evaluate(() => {
        const desc = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
        const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
        const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
        const ogDesc = document.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
        const h1 = (document.querySelector('h1')?.textContent || '').trim().replace(/\s+/g, ' ');
        return { desc, ogTitle, ogImage, ogDesc, h1 };
      });

      routeRecords.push({
        id: routePath === '/' ? 'home' : routePath.slice(1).replace(/\//g, '__'),
        referenceUrl: url,
        canonicalUrl: canonical,
        localPath: routePath,
        title,
        h1: meta.h1,
        description: meta.desc,
        ogTitle: meta.ogTitle,
        ogDescription: meta.ogDescription,
        ogImage: meta.ogImage,
        httpStatus: status,
        redirectTarget: finalUrl !== url ? finalUrl : null,
        internalLinks: Array.from(new Set(pageInternal)),
        externalLinks: Array.from(new Set(pageExternal)),
        discoverySource: SEED_ROUTES.includes(routePath) ? 'seed' : 'crawl',
        inspectionStatus: 'discovered',
        implementationStatus: 'pending',
        verificationStatus: 'pending',
      });

      console.log(`[${status}] ${routePath} -> "${title}" (internal: ${pageInternal.length}, queue: ${queue.length})`);
    } catch (err) {
      console.error(`Error visiting ${routePath}:`, err);
      routeRecords.push({
        id: routePath === '/' ? 'home' : routePath.slice(1).replace(/\//g, '__'),
        referenceUrl: url,
        localPath: routePath,
        httpStatus: null,
        error: String(err),
        inspectionStatus: 'error',
      });
    }
  }

  await browser.close();

  await fs.writeFile(
    path.join(researchDir, 'manifests', 'routes.json'),
    JSON.stringify({ baseUrl: BASE_URL, totalRoutes: routeRecords.length, externalLinks: Array.from(externalLinks), routes: routeRecords }, null, 2),
    'utf-8'
  );
  console.log(`Saved ${routeRecords.length} routes to research/manifests/routes.json`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
