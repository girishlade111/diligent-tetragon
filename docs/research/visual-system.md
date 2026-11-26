# Extracted Design & Visual System

## Typography
- Display & Body: `Mona Sans` / `Mona Sans Variable` (`font-weight: 200..900`, `font-stretch: 75%..125%`), self-hosted WOFF2 under `/assets/fonts/`.
- Technical / Timecode / Slate Metadata: `Chivo Mono` (`300..700`, normal + italic), self-hosted WOFF2 under `/assets/fonts/`.

## Palette Tokens (`src/styles/tokens.css`)
- Surface Light: `--mv-bone: #f1ece4`, `--mv-clay: #e6ded1`, `--mv-fog: #ddd4c8`, `--mv-warm-card: #fbf9f6`, `--mv-light-paper: #fcfbf9`, `--mv-cloud: #ffffff`
- Surface Dark: `--mv-night: #171311`, `--mv-pine: #231d19`, `--mv-near-black: #100d0c`, `--mv-code-bg: #161820`
- Accent & Signal: `--mv-brass: #ff5b2e`, `--mv-status-green: #3ddc84`, `--mv-sign-red: #e0231b`, `--mv-amber-film: #f2923a`, `--mv-cut-mat: #1f4d3b`
- Service Gels: `#FF5A3C` (Product design), `#FFC94A` (Design systems), `#3DDC97` (Front-end development), `#6C8CFF` (Brand & web)

## Film & Studio UI Language
1. **Eyebrow Pills (`.mv-eb`)**: Monospace uppercase frame tags (`FRAME 01 — About` .. `FRAME 10 — Contact`) with live/brass indicator dots.
2. **Arrow Roll Buttons (`.mv-btn`)**: Clip-path curtain wipe hover transition + vertical text roll + diagonal double arrow swap (`ArrowButton.tsx`).
3. **Contact Sheets & Film Strips**: `MV 400TX` and `MV-16 · 7222` sprockets, frame counters (`01A..08A`), grease-pencil active rings, and enlargeable lightbox preview.
4. **Physical Print Props**: Rotated taped paper testimonial clippings, three-hole punched call sheets, A4 printable résumé sheet (`PROOF 01`), ruled notebook margin lines, and a 24×19 cm green self-healing cutting mat (`/uses`).
5. **Production Hardware**: Flickering `ON AIR · Studio 1 · Rec` neon sign, three perforated admission start tickets (`Nov 17`, `Dec 1`, `Jan 12`), and interactive snap clapperboard footer synced per route Take number (`1..36`).
