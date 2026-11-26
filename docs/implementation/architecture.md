# Application Architecture

## Framework & Stack
- **Next.js 15.3** (App Router, Static Site Generation via `generateStaticParams`, Route Handlers for APIs, dynamic `sitemap.ts` and `robots.ts`).
- **React 19 + TypeScript** (`strict: true`, path alias `@/* -> src/*`).
- **Styling Architecture**: Pure token-driven CSS system (`src/styles/tokens.css`, `src/styles/globals.css`, `src/styles/components.css`) using self-hosted `Mona Sans` and `Chivo Mono` WOFF2 font faces.

## Directory Structure
- `src/app/` — All 36 routes plus `api/contact`, `api/newsletter`, `api/resume-pdf`, `sitemap.ts`, `robots.ts`, `not-found.tsx`.
- `src/components/layout/` — `SiteHeader` (adaptive light/dark hero contrast + mobile `MENU` drawer), `SiteFooter` (interactive `Clapperboard` + per-route Take number + live `BerlinClock`), `CinematicPreloader` (session-once + skip), `PageTransition`.
- `src/components/shared/` — `ArrowButton`, `FramePill`, `BerlinClock`, `ClipboardEmail`, `OnAirSign`, `BookingTickets`, `Clapperboard`, `ContactCTA`, `CallSheet`.
- `src/components/home/` — `PortraitHero`, `AboutSafelightIntro`, `SelectedWorkContactSheet`, `ServicesGelSection`, `WorkflowCallSheet`, `DesignCodeToolkit`, `CareerCreditsSection`, `TestimonialsBoard`, `LabFilmReel`, `WritingNotebookPreview`.
- `src/components/pages/` — `WorkCollectionClient`, `AboutPageClient`, `ResumeSheetClient`, `ServicesOverviewClient`, `LabArchiveClient`, `LabInteractiveDemo`, `WritingNotebookClient`, `UsesCuttingMatClient`, `ContactBookingClient`, `LegalDocumentClient`, `BurntFilm404View`.
- `src/content/` — Strongly typed content modules matching the extracted reference copy verbatim.

## Interactive Verification & Deterministic Test Mode
To guarantee reproducible automated screenshot audits without breaking live behavior:
- `?deterministic=1` (or `prefers-reduced-motion: reduce`) pins live `BerlinClock` (`18:22 CET`), pins scroll-scrubbed timelines to initial state, and bypasses the introductory preloader slate.
- External submission handlers (`POST /api/contact`, `POST /api/newsletter`) run locally against Zod validation and explicit demonstration adapters so no test submissions hit upstream owner endpoints.
