# Mara Voss — Product Designer & Developer Portfolio

Standalone Next.js 15, React 19, and TypeScript reconstruction of the Mara Voss portfolio (`https://diligent-tetragon-837366.framer.app/`), rebuilt with zero Framer runtime dependencies and zero external iframes.

## Route Inventory (36 Routes + API Endpoints)

- **Main Pages**: `/`, `/work`, `/about`, `/resume`, `/services`, `/lab`, `/writing`, `/uses`, `/contact`, `/privacy`, `/terms`, `/404` (custom `not-found.tsx`).
- **Work Case Studies (8)**: `/work/sole-campaign`, `/work/rouge-packaging`, `/work/nord-brand-identity`, `/work/atlas-dev-platform`, `/work/print-colour-system`, `/work/type-poster-series`, `/work/loop-banking-app`, `/work/pulse-dashboard`.
- **Services (4)**: `/services/product-design`, `/services/design-systems`, `/services/front-end-development`, `/services/brand-and-web`.
- **Lab Experiments (6)**: `/lab/variable-type-toy`, `/lab/ui-sound-kit`, `/lab/shader-gradients`, `/lab/figma-token-plugin`, `/lab/film-camera-app`, `/lab/motion-cheatsheet`.
- **Writing Essays (6)**: `/writing/design-in-the-browser`, `/writing/design-system-that-sticks`, `/writing/freelance-year-three`, `/writing/prototype-in-code`, `/writing/motion-that-means-something`, `/writing/pricing-design-work`.
- **APIs & Metadata**: `POST /api/contact`, `POST /api/newsletter`, `GET /api/resume-pdf`, `/sitemap.xml`, `/robots.txt`.

## Architecture & Interactive Systems

- **Studio Intro & Hero (`PortraitHero`, `CinematicPreloader`)**: Session-once studio slate intro with keyboard/click skip; full-viewport hero with 3 backdrops (`Clay`, `Brass`, `Night`), interactive pointer/keyboard lighting mask silhouette shadow/rim-light, and layered `MARA VOSS` display typography.
- **Scroll & Film-Inspired Sections**: Darkroom safelight development (`AboutSafelightIntro`), interactive Roll 07 contact sheet with lightbox (`SelectedWorkContactSheet`), four-gel studio viewer (`ServicesGelSection`), three-hole punched production call sheet (`WorkflowCallSheet`), swingable 12-tool kit tray (`DesignCodeToolkit`), 24 fps credits scroll (`CareerCreditsSection`), taped testimonial clippings (`TestimonialsBoard`), 16 mm film reel (`LabFilmReel`), ruled studio notebook (`WritingNotebookPreview`), ON AIR availability tickets (`ContactCTA`), and interactive clapperboard footer (`SiteFooter`) with live `Europe/Berlin` clock.
- **Special Pages**: Printable A4 résumé + real PDF generation (`/resume`), interactive A2 green cutting mat (`/uses`), studio lighting lab archive + live interactive sandboxes (`/lab/*`), booking sheet with accessible ARIA listbox dropdowns and Zod validation (`/contact`).

## Development & Verification

```bash
npm install
npm run typecheck
npm run lint
npm test
npm run build
npm run start
```

Automated Playwright verification (run against `http://localhost:3000` preview):
```bash
npx tsx scripts/testing/run-e2e.ts
npx tsx scripts/testing/check-routes.ts
npx tsx scripts/testing/compare-screenshots.ts
```

Research, extracted manifests, and verification reports live under `docs/` and `research/`.

## Demonstration Adapter Notice

`POST /api/contact` and `POST /api/newsletter` run against local Zod-validated demonstration adapters (`siteConfig.isDemonstrationMode = true`) rather than submitting test data to third-party endpoints.
