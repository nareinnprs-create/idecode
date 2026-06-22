# OPRAIZ IDECODE — QA Checklist

## Build & Compilation

- [ ] `npm run compile` passes (all 90 packages)
- [ ] `npm run build:browser` succeeds with 0 errors
- [ ] `npm run test:opraiz` runs without failures (except pre-existing cmd timeouts)
- [ ] `npm run lint` passes

## Branding & Visual

- [ ] About dialog shows OPRAIZ logo and gradient text
- [ ] Welcome / Getting Started page shows OPRAIZ logo
- [ ] Preload/loading spinner shows OPRAIZ text
- [ ] Theme selection shows `OPRAIZ IDECODE Dark` / `OPRAIZ IDECODE Light` / `OPRAIZ IDECODE HC` / `OPRAIZ IDECODE HC Light`
- [ ] Default theme is `OPRAIZ IDECODE Dark`
- [ ] Icon theme label reads `OPRAIZ IDECODE Icons`
- [ ] Favicon appears in browser tab (`.svg`)
- [ ] Electron window has app icon (`.png`)

## Themes

- [ ] Dark theme is visually coherent (navy bg, amber accents)
- [ ] Light theme is visually coherent (off-white bg, blue accents)
- [ ] HC Dark theme has sufficient contrast
- [ ] HC Light theme has sufficient contrast
- [ ] Tab active indicator uses brand gradient
- [ ] Activity bar icons are visible (codicon)
- [ ] Status bar uses brand colours
- [ ] Scrollbar thumb uses brand accent

## UI Elements

- [ ] Buttons have 4px border-radius, brand hover state
- [ ] Inputs have focus glow ring
- [ ] Select/dropdown has consistent padding and border
- [ ] Dialogs have consistent border-radius and shadow
- [ ] Editor has proper syntax highlighting

## Custom Title Bar (Electron)

- [ ] Drag panel works for window dragging
- [ ] Minimize/maximize/close buttons work
- [ ] Title bar uses OPRAIZ brand colours on hover
- [ ] Title bar style respects `window.titleBarStyle` preference

## Splash & Preload

- [ ] Splash screen shows OPRAIZ logo (Electron)
- [ ] Preloader shows "OPRAIZ" text with spinning icon
- [ ] Transition from splash to main window is smooth

## Documentation & Config

- [ ] `doc/Publishing.md` has proper OPRAIZ release instructions
- [ ] `doc/BRAND.md` documents the colour palette
- [ ] CI workflow references `opraiz-bot`, `opraiz.ai` URLs
- [ ] `package.json` uses `@opraiz/*` package names
- [ ] CLI runs as `opraiz` / `opraizext`

## Release Candidate

- [ ] All git tags are correct (`v1.0.0`)
- [ ] CHANGELOG has `[Unreleased]` section
- [ ] License headers are EPL-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0
- [ ] GitHub Release is drafted
