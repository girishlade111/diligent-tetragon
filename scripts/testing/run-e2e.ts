import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const BASE = process.env.LOCAL_BASE || 'http://localhost:3000';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const results: Array<{ name: string; status: 'passed' | 'failed'; detail?: string }> = [];

  async function runTest(name: string, fn: () => Promise<void>) {
    try {
      await fn();
      results.push({ name, status: 'passed' });
      console.log(`PASS: ${name}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      results.push({ name, status: 'failed', detail: msg });
      console.error(`FAIL: ${name} -> ${msg}`);
    }
  }

  // 1. Preloader render & skip button
  await runTest('Cinematic preloader shows and skips cleanly', async () => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
    const pre = page.getByTestId('cinematic-preloader');
    await pre.waitFor({ state: 'visible', timeout: 3000 });
    await page.getByTestId('preloader-skip').click();
    await pre.waitFor({ state: 'hidden', timeout: 2000 });
    await ctx.close();
  });

  // 2. Hero backdrop switcher + lighting studio controls
  await runTest('Homepage hero backdrop switcher & studio light work', async () => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/?deterministic=1`, { waitUntil: 'networkidle' });
    const hero = page.getByTestId('portrait-hero');
    await page.getByTestId('backdrop-night').click();
    const cls = await hero.getAttribute('class');
    assert(cls?.includes('is-bd-night'), `Expected night backdrop, got: ${cls}`);
    const lamp = page.getByTestId('hero-studio-lamp');
    await lamp.focus();
    await page.keyboard.press('ArrowLeft');
    const styleAttr = await hero.getAttribute('style');
    assert(styleAttr?.includes('--lx:'), 'Expected lamp CSS custom property update');
    await ctx.close();
  });

  // 3. Work page category filtering & Sheet/List presentation toggle
  await runTest('/work filters categories and toggles Sheet/List views', async () => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/work?deterministic=1`, { waitUntil: 'networkidle' });
    await page.getByTestId('work-filter-brand').click();
    const count = await page.locator('[data-testid="work-sheet-view"] a').count();
    assert.equal(count, 4, `Expected 4 Brand projects, got ${count}`);
    await page.getByTestId('work-mode-list').click();
    const listVisible = await page.getByTestId('work-list-view').isVisible();
    assert(listVisible, 'Expected list view to be visible');
    await ctx.close();
  });

  // 4. Lab category filters
  await runTest('/lab filters experiments by category', async () => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/lab?deterministic=1`, { waitUntil: 'networkidle' });
    await page.getByTestId('lab-filter-experiment').click();
    const cards = await page.locator('.mvli-grid .mvli-card').count();
    assert.equal(cards, 2, `Expected 2 Experiment items, got ${cards}`);
    await ctx.close();
  });

  // 5. Writing category filter + newsletter subscription
  await runTest('/writing filters posts and submits newsletter form', async () => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/writing?deterministic=1`, { waitUntil: 'networkidle' });
    await page.getByTestId('writing-filter-systems').click();
    await page.getByTestId('newsletter-email-input').fill('test@example.com');
    await page.getByTestId('newsletter-submit-btn').click();
    const status = await page.getByTestId('newsletter-status').textContent();
    assert(status?.includes('Subscribed'), `Expected newsletter confirmation, got: ${status}`);
    await ctx.close();
  });

  // 6. Contact form custom listbox dropdown + validation + slate confirmation
  await runTest('/contact validates inputs, selects budget via custom listbox, and submits', async () => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/contact?start=nov-17&deterministic=1`, { waitUntil: 'networkidle' });
    const banner = await page.getByTestId('selected-start-banner').textContent();
    assert(banner?.includes('Nov 17'), 'Expected preselected start window Nov 17');

    await page.getByTestId('contact-name').fill('Alex Mercer');
    await page.getByTestId('contact-email').fill('alex@example.com');
    await page.getByTestId('contact-budget').click();
    await page.getByRole('option', { name: '€15k–€40k' }).click();
    await page.getByTestId('contact-brief').fill('Product design sprint and React component system build.');
    await page.locator('[data-testid="contact-booking-form"] button[type="submit"]').click();
    const conf = page.getByTestId('contact-confirmation');
    await conf.waitFor({ state: 'visible', timeout: 5000 });
    const confText = await conf.textContent();
    assert(confText?.includes('Brief received'), 'Expected confirmation slate');
    await ctx.close();
  });

  // 7. Resume interactive accordion + PDF endpoint check
  await runTest('/resume expands job details and serves valid PDF download', async () => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/resume?deterministic=1`, { waitUntil: 'networkidle' });
    const toggle = page.getByTestId('resume-toggle-loop-bank');
    assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
    await toggle.click();
    assert.equal(await toggle.getAttribute('aria-expanded'), 'true');

    const pdfResp = await page.request.get(`${BASE}/api/resume-pdf`);
    assert.equal(pdfResp.status(), 200);
    const pdfHead = (await pdfResp.body()).subarray(0, 8).toString('utf8');
    assert(pdfHead.startsWith('%PDF-1.4'), `Expected valid PDF header, got ${pdfHead}`);
    await ctx.close();
  });

  // 8. Desktop navbar links & CTA switch pages cleanly
  await runTest('Desktop navbar links and Hire me CTA navigate between routes', async () => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/?deterministic=1`, { waitUntil: 'networkidle' });

    const navTargets: Array<[string, string]> = [
      ['Work', '/work'],
      ['About', '/about'],
      ['Résumé', '/resume'],
      ['Writing', '/writing'],
      ['Contact', '/contact'],
    ];

    for (const [label, expectedPath] of navTargets) {
      await page.getByTestId('site-header').getByRole('link', { name: label }).click();
      await page.waitForURL(`**${expectedPath}`, { timeout: 10000 });
      assert.equal(new URL(page.url()).pathname, expectedPath);
    }

    await page.getByTestId('site-header').locator('.mv-brand').click();
    await page.waitForURL(`${BASE}/`, { timeout: 10000 });
    assert.equal(new URL(page.url()).pathname, '/');

    await page.getByTestId('site-header').getByRole('link', { name: 'Hire me' }).click();
    await page.waitForURL('**/contact', { timeout: 10000 });
    assert.equal(new URL(page.url()).pathname, '/contact');
    await ctx.close();
  });

  // 9. Mobile drawer open, route navigation & close
  await runTest('Mobile viewport menu drawer opens and switches pages cleanly', async () => {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/?deterministic=1`, { waitUntil: 'networkidle' });

    for (const [label, expectedPath] of [
      ['Work', '/work'],
      ['Services', '/services'],
      ['Lab', '/lab'],
      ['Home', '/'],
    ]) {
      await page.getByTestId('mobile-menu-toggle').click();
      await page.getByTestId('mobile-nav-drawer').waitFor({ state: 'visible', timeout: 3000 });
      await page
        .getByTestId('mobile-nav-drawer')
        .getByRole('link', { name: new RegExp(`^${label}`, 'i') })
        .first()
        .click();
      await page.waitForURL(`**${expectedPath}`, { timeout: 10000 });
      assert.equal(new URL(page.url()).pathname, expectedPath);
    }
    await ctx.close();
  });

  await browser.close();
  await fs.mkdir(path.resolve(process.cwd(), 'research', 'reports'), { recursive: true });
  await fs.writeFile(
    path.resolve(process.cwd(), 'research', 'reports', 'e2e-report.json'),
    JSON.stringify(
      {
        passed: results.filter((r) => r.status === 'passed').length,
        failed: results.filter((r) => r.status === 'failed').length,
        results,
      },
      null,
      2
    )
  );

  const failed = results.filter((r) => r.status === 'failed');
  if (failed.length > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
