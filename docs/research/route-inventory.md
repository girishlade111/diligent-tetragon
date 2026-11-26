# Verified Route Inventory (36 Routes + APIs)

Source: Direct Playwright & HTTP probe of `https://diligent-tetragon-837366.framer.app/sitemap.xml`, `robots.txt`, and link crawl (`research/manifests/routes.json`).

## Main Pages (10 routes + `/404`)
| # | Route | Title | Take # |
|---|---|---|---|
| 1 | `/` | Mara Voss — Product Designer & Developer Portfolio | 1 |
| 2 | `/work` | Work — case studies in product design, brand and front-end | 2 |
| 3 | `/about` | About — Mara Voss, product designer & developer in Berlin | 3 |
| 4 | `/resume` | Résumé — Mara Voss, product designer & developer \| CV | 4 |
| 5 | `/services` | Services — product design, design systems, front-end development | 5 |
| 6 | `/lab` | Lab — experiments and side projects | 6 |
| 7 | `/writing` | Writing — notes on design and code | 7 |
| 8 | `/contact` | Contact — hire Mara Voss for product design and development | 8 |
| 33 | `/privacy` | Privacy policy | 33 |
| 34 | `/terms` | Terms of use | 34 |
| 35 | `/uses` | Uses — the hardware, software and tools I work with (discovered via `sitemap.xml`) | 35 |
| 36 | `/404` | Page not found (also mapped to Next.js `not-found.tsx`) | 36 |

## Project Case Studies (8 routes)
| Take # | Route | Client | Category | Outcome |
|---|---|---|---|---|
| 9 | `/work/sole-campaign` | Sole Supply | Brand · Campaign | +64% launch-week sales |
| 10 | `/work/rouge-packaging` | Maison Rouge | Brand · Packaging | 1 in 5 visitors used the configurator |
| 11 | `/work/nord-brand-identity` | Nord Coffee | Brand · Identity | Stocked in 40 cafés in year one |
| 12 | `/work/atlas-dev-platform` | Atlas Cloud | Web · Front-end | Docs load 3× faster |
| 13 | `/work/print-colour-system` | Studio Chroma | Brand · Colour system | One palette for screen and print |
| 14 | `/work/type-poster-series` | Violet Magazine | Editorial · Art direction | Issue 12 sold out |
| 15 | `/work/loop-banking-app` | Loop Bank | Product · Mobile app | 4.7★ on the App Store |
| 16 | `/work/pulse-dashboard` | Pulse Analytics | Product · Design system | 140 components, 1 source |

## Service Detail Pages (4 routes)
| Take # | Route | Title | Gel Token |
|---|---|---|---|
| 17 | `/services/product-design` | Product design | `#FF5A3C` |
| 18 | `/services/design-systems` | Design systems | `#FFC94A` |
| 19 | `/services/front-end-development` | Front-end development | `#3DDC97` |
| 20 | `/services/brand-and-web` | Brand & web | `#6C8CFF` |

## Lab Detail Pages (6 routes)
| Take # | Route | Title | Category | Year |
|---|---|---|---|---|
| 21 | `/lab/variable-type-toy` | Variable type toy | Experiment | 2026 |
| 22 | `/lab/ui-sound-kit` | UI sound kit | Side project | 2025 |
| 23 | `/lab/shader-gradients` | Shader gradients | Experiment | 2025 |
| 24 | `/lab/figma-token-plugin` | Token sync plugin | Open source | 2024 |
| 25 | `/lab/film-camera-app` | Film camera app | Concept | 2024 |
| 26 | `/lab/motion-cheatsheet` | Motion cheatsheet | Resource | 2023 |

## Writing Detail Pages (6 routes)
| Take # | Route | Title | Category | Reading Time |
|---|---|---|---|---|
| 27 | `/writing/design-in-the-browser` | Why I design in the browser now | Process | 6 min |
| 28 | `/writing/design-system-that-sticks` | A design system that people actually use | Systems | 8 min |
| 29 | `/writing/freelance-year-three` | Year three as an independent | Notes | 5 min |
| 30 | `/writing/prototype-in-code` | Prototype in code, not in slides | Process | 7 min |
| 31 | `/writing/motion-that-means-something` | Motion that means something | Craft | 6 min |
| 32 | `/writing/pricing-design-work` | How I price design and build work | Notes | 9 min |

## Functional API & SEO Endpoints
- `POST /api/contact` — Validates booking sheet fields with Zod and records brief via demonstration adapter.
- `POST /api/newsletter` — Validates studio letter subscription email via demonstration adapter.
- `GET /api/resume-pdf` — Generates a valid A4 `PDF-1.4` download (`Mara-Voss-Resume-2026.pdf`).
- `GET /sitemap.xml` & `GET /robots.txt` — Dynamic Next.js App Router metadata routes covering all 36 routes.
