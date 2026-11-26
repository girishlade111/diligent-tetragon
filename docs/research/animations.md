# Animation & Motion Architecture

All motion timings, keyframes, and `prefers-reduced-motion` fallbacks were extracted from the reference stylesheet rules (`research/reference/styles/extracted/by-prefix/*.css`) and interactive browser inspection.

## Core Timing Curves
- `--ease-out-expo`: `cubic-bezier(0.2, 0.8, 0.2, 1)`
- `--ease-curtain`: `cubic-bezier(0.7, 0, 0.2, 1)` (used for `.mv-fill` curtain wipes and vertical text rolls)
- `--ease-spring`: `cubic-bezier(0.34, 1.56, 0.64, 1)` (button spring press + clapperboard snap)

## Scene-by-Scene Motion Behavior
1. **Studio Intro Slate (`CinematicPreloader`)**: Session-once full-screen countdown (`1..24` at 24 fps timing), dismissible immediately via click (`Skip intro`) or keyboard (`Escape` / `Enter` / `Space`).
2. **Portrait Hero (`PortraitHero`)**: Pointer and keyboard (`ArrowUp/Down/Left/Right`) studio lamp moves radial spotlight (`--lx`, `--ly`), dynamically offsetting silhouette shadow (`--sx`, `--sy`) and rim light mask over `maraCutout`.
3. **Darkroom Safelight (`AboutSafelightIntro`)**: Scroll-linked `--dev` ratio (`0.0..1.0`) progressively transitions red/inverted safelight photo filter and receding developer bath wave into a positive color studio portrait.
4. **Services Gels (`ServicesGelSection`)**: Hovering/focusing rows or clicking gel chips (`#FF5A3C`, `#FFC94A`, `#3DDC97`, `#6C8CFF`) blends multiply color gels over the grayscale studio monitor photograph.
5. **Toolkit Tags (`DesignCodeToolkit`)**: Top-pinned hanging equipment tags trigger damped `mvkt-swing` oscillation on pointer interaction.
6. **End Credits (`CareerCreditsSection`)**: Scroll-driven `TC 00:00:00:00` timecode counter synced with pulsing recording indicator.
7. **Reduced Motion**: Global `@media (prefers-reduced-motion: reduce)` rule clamps all transitions/animations to `0.01ms` and disables scroll-locked preloader overlays.
