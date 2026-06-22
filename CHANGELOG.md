# Changelog

## [Unreleased]

### UI/UX Overhaul
- Custom OPRAIZ IDECODE themes (dark, light, high-contrast) with brand colors
- Redesigned application shell, sidebar, status bar, menus, and dialogs
- OPRAIZ branding across all UI components
- New splash screen, loading animation, and favicon
- Polished logo, Electron app icons, and view icons

### Infrastructure
- Fixed CI workflows: all 7 workflows updated from `master` to `main`
- Fixed `lerna.json` publish config: `push`, `gitTagVersion` enabled
- Replaced `eclipse-theia-bot` with `opraiz-bot` in publish CI
- Fixed electron splash screen: added missing `opraiz-logo.svg`
- Removed old Eclipse Theia logo from electron resources
- Renamed all Playwright test files from `theia-*` to `opraiz-*`
- Updated `.vscode/settings.json`, `configs/license-check-config.json`
- Updated `devfile.yaml` to reference OPRAIZ repository

### Rebranding
- Rewrote `NOTICE.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`
- Updated `doc/Developing.md`, `doc/Plugin-API.md`, `doc/runtime-policy.md`
- Updated `packages/core/README.md` with OPRAIZ branding
- Updated `examples/playwright/package.json` URLs
- Fixed all CI workflow references (Theia → OPRAIZ IDECODE)
- Filled empty `## Website` section in `README.md`

## v1.0.0 (2026-06-22)

Initial release of **OPRAIZ IDECODE** — forked from Eclipse Theia.

### Rebranding
- Renamed all `@theia/*` packages to `@opraiz/*`
- Updated all user-facing "Theia" / "Eclipse Theia" strings to "OPRAIZ IDECODE"
- Updated theme names, about dialog, macOS menu, welcome page, AI/MCP/Copilot branding
- Updated CLI binaries (`theia` → `opraiz`, `theiaext` → `opraizext`, etc.)
- Version bumped to `1.0.0`
- New logo at `logo/opraiz-logo.svg`

### Build System
- `npm run compile` — 90/90 packages succeed
- `npm run build:browser` — 0 errors, browser + node bundles generated
- `npm run test:opraiz` — all unit tests pass

### Platform Support
- Windows (with native module fallbacks for machines without VS Build Tools / Python)
  - `drivelist`: WMI PowerShell fallback when native `.node` file unavailable
  - `@vscode/windows-ca-certs`: gracefully handled as external in esbuild
- Linux, macOS: full native support via compiled C++ addons
- esbuild spawn fixed for paths with spaces on Windows

### Infrastructure
- Clean git history on `github.com/nareinnprs-create/idecode`
- CI/CD workflow updated (`master` → `main`)
- `patch-package` integrated for `node_modules` patches (`@lumino/widgets`, `drivelist`)
