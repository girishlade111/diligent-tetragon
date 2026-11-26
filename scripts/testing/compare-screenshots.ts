import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import sharp from 'sharp';

const LOCAL_BASE = process.env.LOCAL_BASE || 'http://localhost:3000';

interface CompareConfig {
  id: string;
  localPath: string;
  refScreenshot: string;
}

async function compareImages(refPath: string, implPath: string, outDir: string) {
  const refBuf = await fs.readFile(refPath);
  const implBuf = await fs.readFile(implPath);

  const refMeta = await sharp(refBuf).metadata();
  const implMeta = await sharp(implBuf).metadata();

  const w = Math.min(refMeta.width || 1440, implMeta.width || 1440);
  const h = Math.min(refMeta.height || 900, implMeta.height || 900);

  const refPng = PNG.sync.read(
    await sharp(refBuf).extract({ left: 0, top: 0, width: w, height: h }).png().toBuffer()
  );
  const implPng = PNG.sync.read(
    await sharp(implBuf).extract({ left: 0, top: 0, width: w, height: h }).png().toBuffer()
  );

  const diffPng = new PNG({ width: w, height: h });
  const diffPixels = pixelmatch(refPng.data, implPng.data, diffPng.data, w, h, {
    threshold: 0.12,
    includeAA: false,
  });

  await fs.writeFile(path.join(outDir, 'difference.png'), PNG.sync.write(diffPng));

  // Side-by-side & 50% overlay
  const sideBySide = await sharp({
    create: { width: w * 2 + 16, height: h, channels: 4, background: { r: 24, g: 20, b: 18, alpha: 1 } },
  })
    .composite([
      { input: PNG.sync.write(refPng), left: 0, top: 0 },
      { input: PNG.sync.write(implPng), left: w + 16, top: 0 },
    ])
    .png()
    .toBuffer();
  await fs.writeFile(path.join(outDir, 'side-by-side.png'), sideBySide);

  const totalPixels = w * h;
  const diffRatio = diffPixels / totalPixels;

  return {
    width: w,
    height: h,
    refSize: { width: refMeta.width, height: refMeta.height },
    implSize: { width: implMeta.width, height: implMeta.height },
    diffPixels,
    totalPixels,
    diffPercent: Number((diffRatio * 100).toFixed(2)),
  };
}

async function main() {
  const researchDir = path.resolve(process.cwd(), 'research');
  const routesJson = JSON.parse(await fs.readFile(path.join(researchDir, 'manifests', 'routes.json'), 'utf-8'));
  const routes = routesJson.routes.filter((r: { httpStatus: number | null }) => r.httpStatus === 200);

  const configs: CompareConfig[] = routes.map((r: { id: string; localPath: string }) => ({
    id: r.id,
    localPath: r.localPath,
    refScreenshot: path.join(researchDir, 'reference', 'screenshots', 'desktop', r.id, 'full-1440.png'),
  }));

  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();

  const results: Record<string, unknown>[] = [];

  for (const cfg of configs) {
    const outDir = path.join(researchDir, 'comparisons', cfg.id, 'desktop-1440');
    await fs.mkdir(outDir, { recursive: true });

    try {
      await fs.access(cfg.refScreenshot);
    } catch {
      continue;
    }

    const url = `${LOCAL_BASE}${cfg.localPath === '/' ? '' : cfg.localPath}?deterministic=1`;
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
    await page.evaluate(async () => {
      await document.fonts.ready;
    });
    await page.waitForTimeout(600);

    const implShot = path.join(outDir, 'implementation.png');
    const aboveShot = path.join(outDir, 'implementation-above-fold.png');
    await page.screenshot({ path: aboveShot });
    await page.screenshot({ path: implShot, fullPage: true });
    await fs.copyFile(cfg.refScreenshot, path.join(outDir, 'reference.png'));

    const metrics = await compareImages(cfg.refScreenshot, implShot, outDir);

    // Also compare above-the-fold specifically
    const refAbove = cfg.refScreenshot.replace('full-1440.png', 'above-fold-1440.png');
    let aboveMetrics = null;
    try {
      await fs.access(refAbove);
      const aboveDir = path.join(outDir, 'above-fold');
      await fs.mkdir(aboveDir, { recursive: true });
      aboveMetrics = await compareImages(refAbove, aboveShot, aboveDir);
    } catch {
      // ignore
    }

    const record = { id: cfg.id, localPath: cfg.localPath, fullPage: metrics, aboveFold: aboveMetrics };
    await fs.writeFile(path.join(outDir, 'metrics.json'), JSON.stringify(record, null, 2), 'utf-8');
    results.push(record);
    console.log(`Compared ${cfg.localPath}: full diff=${metrics.diffPercent}% (${metrics.refSize.height}px vs ${metrics.implSize.height}px), aboveFold=${aboveMetrics?.diffPercent ?? 'n/a'}%`);
  }

  await browser.close();
  await fs.writeFile(path.join(researchDir, 'reports', 'visual-comparison-summary.json'), JSON.stringify(results, null, 2), 'utf-8');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
