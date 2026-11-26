# Mara Voss Portfolio Reconstruction Report

## 01. Executive Summary
Standalone Next.js 15, React 19, and TypeScript reconstruction of `https://diligent-tetragon-837366.framer.app/` implemented in workspace root with zero Framer runtime dependencies and zero external iframes. All 36 routes (34 baseline routes plus discovered `/uses` and `/404`) plus `/api/contact`, `/api/newsletter`, `/api/resume-pdf`, `/sitemap.xml`, and `/robots.txt` pass static typecheck, Vitest unit checks, ESLint, production build (`next build`), E2E functional checks, and 34-route Playwright + `axe-core` audit against production `next start`.

## 02. Target Architecture & Stack
- Framework: Next.js `15.5.29` (App Router, SSG + Route Handlers)
- UI & Language: React `19`, TypeScript `strict` (`tsc --noEmit`)
- Validation & APIs: `zod`, pure TypeScript A4 `%PDF-1.4` binary generator
- Styling: Tokenized CSS layers (`src/styles/tokens.css`, `src/styles/globals.css`, `src/styles/components.css`)
- Verification Tooling: Vitest `3.x`, Playwright `1.51.0`, `@axe-core/playwright`, `pixelmatch`, `sharp`, `pngjs`

## 03. Verified Route Inventory (36 Routes + Endpoints)
- Main pages (12): `/`, `/work`, `/about`, `/resume`, `/services`, `/lab`, `/writing`, `/uses`, `/contact`, `/privacy`, `/terms`, `/404` (+ Next.js `not-found.tsx`)
- Case studies (8): `/work/sole-campaign`, `/work/rouge-packaging`, `/work/nord-brand-identity`, `/work/atlas-dev-platform`, `/work/print-colour-system`, `/work/type-poster-series`, `/work/loop-banking-app`, `/work/pulse-dashboard`
- Service details (4): `/services/product-design`, `/services/design-systems`, `/services/front-end-development`, `/services/brand-and-web`
- Lab details (6): `/lab/variable-type-toy`, `/lab/ui-sound-kit`, `/lab/shader-gradients`, `/lab/figma-token-plugin`, `/lab/film-camera-app`, `/lab/motion-cheatsheet`
- Writing articles (6): `/writing/design-in-the-browser`, `/writing/design-system-that-sticks`, `/writing/freelance-year-three`, `/writing/prototype-in-code`, `/writing/motion-that-means-something`, `/writing/pricing-design-work`
- Backend & metadata routes: `POST /api/contact`, `POST /api/newsletter`, `GET /api/resume-pdf`, `/sitemap.xml`, `/robots.txt`

## 04. Design System & Typography Extraction
- Display/body fonts: `Mona Sans` and `Mona Sans Variable` (`200..900`, `75%..125%` stretch) self-hosted from extracted WOFF2 files in `public/assets/fonts/`.
- Technical/timecode font: `Chivo Mono` (`300..700`, normal + italic) self-hosted in `public/assets/fonts/`.
- Palette tokens (`src/styles/tokens.css`): `--mv-bone: #f1ece4`, `--mv-clay: #e6ded1`, `--mv-fog: #ddd4c8`, `--mv-stone: #575049`, `--mv-ink: #141210`, `--mv-night: #171311`, `--mv-pine: #231d19`, `--mv-near-black: #100d0c`, `--mv-brass: #ff5b2e`, `--mv-brass-ink: #b5320e`, `--mv-cloud: #ffffff`, `--mv-cut-mat: #1f4d3b`.
- Service lighting gel tokens: `#FF5A3C`, `#FFC94A`, `#3DDC97`, `#6C8CFF`.

## 05. Asset Discovery & Local Hosting
- Extracted 127 assets (119 images + 8 WOFF2 fonts) deduplicated to 48 visual assets and 8 WOFF2 font files under `public/assets/`.
- Mapped all typed asset references through `src/content/assets.ts` and `research/manifests/assets.json`.
- Zero broken images verified across all 34 audited routes in `check-routes.ts`.

## 06. Layout Shell & Navigation
- `src/components/layout/SiteHeader.tsx`: Fixed adaptive light/dark route header (`is-light-route` vs `is-dark-route`), translucent blurred pill navigation (`Work`, `About`, `Résumé`, `Writing`, `Contact`), `Hire me` action button, and accessible mobile `Menu` dialog drawer (`Escape` + toggle close).
- `src/components/layout/SiteFooter.tsx`: Dark wrap-up footer featuring interactive snap `Clapperboard` slate keyed per route `takeNumber` (`1..36`), three link columns (`Work`, `Pages`, `Elsewhere`), legal links, live `BerlinClock`, and smooth `Back to top` control.

## 07. Homepage Reconstruction (10 Film Frames)
- Hero (`PortraitHero.tsx`): Full-viewport studio hero with 3 backdrops (`Clay`, `Brass`, `Night`), silhouette mask shadow + rim light driven by pointer drag and keyboard arrows (`Light`), and layered `MARA VOSS` display lockup.
- `AboutSafelightIntro.tsx`: Scroll-reactive darkroom negative/safelight print developing `0%..100%` with stats (`9 years`, `40+ products shipped`, `Berlin, working worldwide`).
- `SelectedWorkContactSheet.tsx`: Split layout combining Roll 07 8-frame contact sheet, grease-pencil active ring, preview loupe, click/keyboard frame switching, and lightbox enlargement modal.
- `ServicesGelSection.tsx`: Four service rows paired with sticky grayscale monitor and multiply lighting gels (`#FF5A3C`, `#FFC94A`, `#3DDC97`, `#6C8CFF`).
- `WorkflowCallSheet.tsx`: Pine surface production call sheet (`NO. 026`), 3 binder holes, 4 interactive stages (`Brief`, `Explore`, `Build`, `Ship`), checkmarks, split-flap timing pills, and monitor panel.
- `DesignCodeToolkit.tsx`: Recessed tray with 12 swing-on-interact tool tags and discipline filters (`Design 06`, `Code 06`).
- `CareerCreditsSection.tsx`: Viewfinder end-credits frame with Work, Education, Awards, and scroll-linked `TC MM:SS:FF` 24fps timecode.
- `TestimonialsBoard.tsx`: Five rotated taped clipping cards (`05 / 05`) with grayscale portraits.
- `LabFilmReel.tsx`: 16 mm horizontal sprocketed strip (`MV-16 · 01A..06A`) with step navigation controls.
- `WritingNotebookPreview.tsx`: Ruled paper notebook sheet with brass margin line and hover cover preview card.

## 08. Case Studies, Services, Lab & Writing Detail Implementations
- `src/app/work/page.tsx` & `src/app/work/[slug]/page.tsx`: Category filtering (`All 08`, `Brand 04`, `Web 01`, `Editorial 01`, `Product 02`), `Sheet`/`List` mode toggle, dark hero call sheets, brief, bullet contributions, design-to-code split panels, metric cards, client quote, and Next Project band.
- `src/app/services/page.tsx` & `src/app/services/[slug]/page.tsx`: Light gel-pack hero, 4 service cards with 5 deliverables each, Rate Card (`Project`, `Retainer`, `Sprint`), and detail views with project links and 3 FAQs.
- `src/app/lab/page.tsx` & `src/app/lab/[slug]/page.tsx`: Studio 3200K spotlight hero, 6 category filters, MV-16 cards, dark case layout, camera report slate, code snippets, and live interactive sandboxes (`LabInteractiveDemo.tsx`).
- `src/app/writing/page.tsx` & `src/app/writing/[slug]/page.tsx`: Notebook index with topic filters, tilted cover card, article prose with pull quotes, and functional newsletter form.

## 09. Special Routes (`/about`, `/resume`, `/uses`, `/contact`, `/privacy`, `/terms`, `/404`)
- `/about`: Clay studio portrait card, 6-frame `Roll 01` career timeline (`2012..2026`), 3 principles, 3 offset polaroids, and `Currently` card.
- `/resume`: `Print` action (`window.print()` with `@page A4 portrait` rules), `Download PDF` serving `%PDF-1.4` stream from `/api/resume-pdf`, and expandable job history rows.
- `/uses`: Hero clapperboard (`Take 03`) and 24x19 cm green self-healing cutting mat (`#1f4d3b`) tracking pointer `cm` coordinates over 16 tool cards across 4 groups.
- `/contact`: `No. 0142` booking sheet reading `?start=` query tickets, custom ARIA `combobox`/`listbox` dropdowns for Budget & Timeline (no native `<select>`), multi-select service toggles, Zod validation, honeypot field, clapperboard confirmation slate, and 5 sidebar cards with live `Europe/Berlin` clock (`showSeconds`, `showZone`).
- `/privacy` & `/terms`: Sticky table of contents with scroll-linked read percentage indicator.
- `/404` & `not-found.tsx`: Burnt film frame `401..407` gate returning HTTP `404`.

## 10. Motion, Timings & Preloader Architecture
- Session-once `CinematicPreloader` counting 24 fps leader frames with click (`Skip intro`) and keyboard (`Escape`/`Enter`/`Space`) dismissal.
- `?deterministic=1` query mode and `@media (prefers-reduced-motion: reduce)` disable intro curtains, freeze `BerlinClock` (`18:22 CET`), and clamp all transition/animation durations to `0.01ms`.
- Full animation manifest stored in `research/manifests/animations.json`.

## 11. Backend Adapters & Form Endpoints
- `POST /api/contact` (`src/app/api/contact/route.ts`): Zod validation + honeypot guard returning structured local `demonstration-adapter` confirmation (`referenceId: MV-2026-XXXX`).
- `POST /api/newsletter` (`src/app/api/newsletter/route.ts`): Zod email validation + honeypot guard returning local `demonstration-adapter` subscription status.
- `GET /api/resume-pdf` (`src/app/api/resume-pdf/route.ts`): Generates downloadable A4 `application/pdf` (`Mara-Voss-Resume-2026.pdf`).

## 12. Visual Comparison & Discrepancy Resolution
- Executed full-page and above-the-fold `pixelmatch` comparisons across 34 reference routes (`scripts/testing/compare-screenshots.ts`).
- Resolved discrepancies logged in `research/manifests/discrepancies.json`:
  - `DISC-01`: Centered `MARA VOSS` hero wordmark lockup (`/`: `aboveFold` diff reduced `43.45% -> 36.6%`).
  - `DISC-02`: Corrected `/services` hero from dark to light bone surface (`aboveFold` diff reduced `64.29% -> 29.09%`).
  - `DISC-03`: Matched dark surfaces on `/work/[slug]` hero (`rouge-packaging` `aboveFold` reduced `53.04% -> 15.49%`) and `/lab/[slug]` pages (`shader-gradients` `aboveFold` reduced `41.33% -> 7.56%`; final contrast adjustment on `.mv-lt .mv-eb` applied after that comparison run).
  - `DISC-04`: Switched gallery images from lazy to eager loading so all images decode immediately (`imgsBroken=0`).
  - `DISC-05`: Fixed WCAG 2.2 AA contrast tokens, button rest overlay opacity, semantic list markup, and scrollable code-panel focusability (`axe=0` on all audited routes).
- Structural differences kept intentionally: omitted Framer promo badges (`Get template`, `Get All-Access`, `Made in Framer`) and condensed excessive Framer pinned scroll spacers (`/` `12482px` vs `19133px`; `/about` `8423px` vs `11438px`).

## 13. Verification Results (Latest Post-Edit Runs)
- `npm run lint`: EXIT 0 (warnings only for `@next/next/no-img-element` on intentional extracted `<img>` elements).
- `npm run typecheck`: EXIT 0 (`tsc --noEmit`).
- `npm test`: EXIT 0 (`tests/unit/content.test.ts`: 4/4 passed).
- `npm run build`: EXIT 0 (43 static/SSG/API routes compiled cleanly).
- `npx tsx scripts/testing/run-e2e.ts` (against production `next start -p 3000`): 8/8 passed (preloader skip, hero backdrop & studio light keyboard control, `/work` filters & Sheet/List toggle, `/lab` category filter, `/writing` filter & newsletter POST, `/contact` custom listbox + validation + submit slate, `/resume` accordion + `%PDF-1.4` download, mobile menu drawer).
- `npx tsx scripts/testing/check-routes.ts`: `34/34` reference-mapped routes returned HTTP `200`, `0` broken images, `0` console errors, `0` desktop (`1440x900`) or mobile (`390x844`) horizontal overflow, and `0` `axe-core` violations (`axe=0` on all 34 routes); non-existent URL returned HTTP `404`.
- Direct checks: `/uses` HTTP `200` (`axe` 0 violations), `/404` HTTP `404` (`axe` 0 violations), `/sitemap.xml` HTTP `200 application/xml`, `/robots.txt` HTTP `200 text/plain`.

## 14. Key Source & Content Files Created
- Config & Types: `src/config/site.ts`, `src/types/portfolio.ts`, `src/types/global.d.ts`, `vitest.config.ts`, `.eslintrc.json`
- Styles: `src/styles/tokens.css`, `src/styles/globals.css`, `src/styles/components.css`
- Content Modules: `src/content/{assets,articles,booking,experiments,legal,projects,resume,services,testimonials,timeline,tools,uses}.ts`
- Layout & Shared: `src/components/layout/{SiteHeader,SiteFooter,CinematicPreloader,PageTransition}.tsx`, `src/components/shared/{ArrowButton,BerlinClock,BookingTickets,CallSheet,Clapperboard,ClipboardEmail,ContactCTA,FramePill,OnAirSign}.tsx`
- Homepage & Subpages: `src/components/home/*.tsx`, `src/components/pages/*.tsx`, `src/app/**`

## 15. Documentation & Research Artifacts Produced
- `README.md`
- `docs/research/route-inventory.md`
- `docs/research/visual-system.md`
- `docs/research/animations.md`
- `docs/implementation/architecture.md`
- `docs/testing/verification-report.md`
- `research/manifests/animations.json`
- `research/manifests/discrepancies.json`
- `research/reports/route-audit.json`
- `research/reports/e2e-report.json`
- `research/reports/visual-comparison-summary.json`

## 16. Known Constraints & Assumptions
- `POST /api/contact` and `POST /api/newsletter` intentionally operate via local Zod-validated demonstration adapters without transmitting to upstream external form endpoints (`siteConfig.isDemonstrationMode = true`).
- `Booking a 20-min intro call` links to configurable `NEXT_PUBLIC_BOOKING_CALENDAR_URL` with fallback `mailto:hello@maravoss.design?subject=Intro%20call`.
- Original photography, typography, and brand names are reproduced from the supplied reference target strictly inside this local workspace reconstruction; redistribution remains subject to upstream media/font rights.

## 17. Commands to Run Locally
- Install dependencies: `npm install`
- Verify types & lint: `npm run lint && npm run typecheck`
- Run unit tests: `npm test`
- Build & serve production app: `npm run build && npm run start`
- Run automated browser verification (while `npm run start` runs): `npx tsx scripts/testing/run-e2e.ts` and `npx tsx scripts/testing/check-routes.ts`