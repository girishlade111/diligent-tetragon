import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const LOCAL_BASE = process.env.LOCAL_BASE || 'http://localhost:3000';

async function main() {
  const researchDir = path.resolve(process.cwd(), 'research');
  const routesJson = JSON.parse(await fs.readFile(path.join(researchDir, 'manifests', 'routes.json'), 'utf-8'));
  const routes: Array<{ id: string; localPath: string; httpStatus: number | null }> = routesJson.routes.filter(
    (r: { httpStatus: number | null }) => r.httpStatus === 200
  );

  const browser = await chromium.launch({ headless: true });
  const desktopCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const mobileCtx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });

  const report: Record<string, unknown>[] = [];
  let totalErrors = 0;

  for (const r of routes) {
    const page = await desktopCtx.newPage();
    const consoleErrors: string[] = [];
    const failedAssets: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('response', (resp) => {
      if (resp.status() >= 400 && !resp.url().includes('__404')) {
        failedAssets.push(`${resp.status()} ${resp.url()}`);
      }
    });

    const url = `${LOCAL_BASE}${r.localPath === '/' ? '' : r.localPath}?deterministic=1`;
    const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => null);
    await page.waitForTimeout(300);

    const brokenImgs = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img'))
        .filter((img) => !img.complete || img.naturalWidth === 0)
        .map((img) => img.src);
    });

    const overflowDesktop = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);

    let axeViolations: Array<{ id: string; impact: string | null | undefined; nodes: number }> = [];
    try {
      const axe = await new AxeBuilder({ page }).analyze();
      axeViolations = axe.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length }));
    } catch {
      // ignore
    }

    await page.close();

    const mPage = await mobileCtx.newPage();
    await mPage.goto(url, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => null);
    const overflowMobile = await mPage.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    await mPage.close();

    const status = resp?.status() ?? 0;
    if (status !== 200 || consoleErrors.length > 0 || brokenImgs.length > 0 || overflowDesktop || overflowMobile) {
      totalErrors++;
    }

    report.push({
      path: r.localPath,
      status,
      consoleErrors,
      failedAssets,
      brokenImgs,
      overflowDesktop,
      overflowMobile,
      axeViolations,
    });
    console.log(`[${status}] ${r.localPath} | imgsBroken=${brokenImgs.length} | overflow(D/M)=${overflowDesktop}/${overflowMobile} | axe=${axeViolations.length}`);
  }

  // Test custom 404
  const p404 = await desktopCtx.newPage();
  const r404 = await p404.goto(`${LOCAL_BASE}/non-existent-route-verify-404`, { waitUntil: 'domcontentloaded' });
  const s404 = r404?.status() ?? 0;
  await p404.close();

  await browser.close();
  await fs.mkdir(path.join(researchDir, 'reports'), { recursive: true });
  await fs.writeFile(path.join(researchDir, 'reports', 'route-audit.json'), JSON.stringify({ totalRoutes: routes.length, totalErrors, status404: s404, routes: report }, null, 2));
  console.log(`Audit done: ${routes.length} routes, ${totalErrors} with errors, 404 status=${s404}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
