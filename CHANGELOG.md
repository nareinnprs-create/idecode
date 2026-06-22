# Changelog

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
