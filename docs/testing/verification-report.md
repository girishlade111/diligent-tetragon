# Verification & Testing Report

## Summary
All static checks, unit tests, production build checks, functional end-to-end tests, accessibility audits (`axe-core`), and full-page screenshot comparisons were executed against the compiled Next.js production server (`next start -p 3000`).

## Automated Checks Run After Final Code Edits
- **TypeScript (`npm run typecheck`)**: `EXIT 0` (`tsc --noEmit`).
- **ESLint (`npm run lint`)**: `EXIT 0` (`next lint`, warnings only for `@next/next/no-img-element` matching intentional static extracted images).
- **Unit Tests (`npm test` -> `vitest run`)**: `4/4 passed` (`tests/unit/content.test.ts` validating all 8 case studies, 4 services, 6 lab experiments, 6 articles, 12 toolkit items, 5 testimonials, 6 timeline events, 16 uses items, 4 resume roles, 3 booking tickets, 9 privacy sections, 10 terms sections).
- **Production Build (`npm run build`)**: `EXIT 0`, generating 43 routes/paths including all 36 page routes, `POST /api/contact`, `POST /api/newsletter`, `GET /api/resume-pdf`, `/sitemap.xml`, and `/robots.txt`.
- **Playwright Functional E2E (`npx tsx scripts/testing/run-e2e.ts`)**: `8/8 passed`:
  1. Cinematic preloader shows and skips cleanly.
  2. Homepage hero backdrop switcher & studio light work.
  3. `/work` filters categories (`Brand` -> 4 cards) and toggles `Sheet`/`List` views.
  4. `/lab` filters experiments by category (`Experiment` -> 2 cards).
  5. `/writing` filters posts and submits newsletter form (`POST /api/newsletter`).
  6. `/contact` reads `?start=nov-17`, validates fields, selects budget via custom accessible listbox, and renders confirmation slate (`POST /api/contact`).
  7. `/resume` expands interactive job details and downloads valid `%PDF-1.4` from `/api/resume-pdf`.
  8. Mobile viewport (`390x844`) menu drawer opens cleanly.
- **34-Route Crawl, Overflow & Accessibility Audit (`npx tsx scripts/testing/check-routes.ts`)**:
  - `34/34` routes returned HTTP `200`, `0` broken images (`imgsBroken=0`), `0` console errors, `0` desktop (`1440x900`) or mobile (`390x844`) horizontal overflow (`overflow(D/M)=false/false`), and `0` `axe-core` violations (`axe=0`) on every single route.
  - Non-existent URL returned HTTP `404` (`status404=404`), and direct `/404` & `/uses` checks confirmed `0` `axe-core` violations (`/uses` HTTP `200`, `/sitemap.xml` HTTP `200 application/xml`, `/robots.txt` HTTP `200 text/plain`).
- **Visual Regression (`npx tsx scripts/testing/compare-screenshots.ts`)**: Executed prior to the final contrast/dark-lab polish pass and inspected side-by-side (`research/comparisons/<id>/desktop-1440/side-by-side.png`); documented findings and intentional Framer-spacer omissions in `research/manifests/discrepancies.json`.
