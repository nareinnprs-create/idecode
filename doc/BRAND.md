# OPRAIZ IDECODE Brand Palette

## Primary Colors

| Token | Hex | Usage |
|---|---|---|
| `--opraiz-brand-primary` | `#f0a030` | Primary accent amber/gold — buttons, links, active indicators, gradient start |
| `--opraiz-brand-secondary` | `#60a5fa` | Secondary accent blue — selection highlights, secondary actions, gradient end |

## Dark Theme

| Token | Hex | Usage |
|---|---|---|
| `--theia-editor-background` | `#1a1b2e` | Editor background (deep navy) |
| `--theia-sideBar-background` | `#16172a` | Sidebar/activity bar background |
| `--theia-titleBar-activeBackground` | `#232438` | Title bar / menu bar background |
| `--theia-menu-background` | `#232438` | Menu/tooltip background |
| `--theia-foreground` | `#cccccc` | Default text (light gray on dark) |
| `--theia-input-background` | `#2a2b40` | Input/textarea background |

## Light Theme

| Token | Hex | Usage |
|---|---|---|
| `--theia-editor-background` | `#f8f9fa` | Editor background (off-white) |
| `--theia-sideBar-background` | `#f0f1f3` | Sidebar background |
| `--theia-titleBar-activeBackground` | `#e8e9eb` | Title bar background |
| `--theia-menu-background` | `#ffffff` | Menu background |
| `--theia-foreground` | `#1a1b2e` | Default text (dark on light) |
| `--theia-input-background` | `#ffffff` | Input background |

## High Contrast Themes

- **HC Dark**: Uses the same palette with maximum contrast ratios (`AAA` WCAG).
- **HC Light**: High-contrast light variant with pure black text and white backgrounds.

## Gradient

The brand gradient goes from `#f0a030` (top-left) to `#60a5fa` (bottom-right). Used for:
- Logo mark
- Splash/preload animation
- Button primary hover states (via `color-mix`)

## CSS Custom Properties

Defined in `packages/core/src/browser/style/index.css`:

```
--opraiz-brand-primary: #f0a030
--opraiz-brand-secondary: #60a5fa
--opraiz-brand-gradient: linear-gradient(135deg, #f0a030, #60a5fa)
--opraiz-brand-radius-sm: 4px
--opraiz-brand-radius-lg: 12px
--opraiz-brand-shadow-sm: 0 1px 3px rgba(0,0,0,0.12)
--opraiz-brand-shadow-lg: 0 8px 24px rgba(0,0,0,0.18)
--opraiz-brand-font: "Inter", "Helvetica Neue", Arial, sans-serif
--opraiz-brand-transition: 0.15s ease
```

## Typography

- **UI Font**: Inter (primary), Helvetica Neue (fallback), Arial (fallback), sans-serif
- **Code Font**: Source Code Pro (primary), Fira Code (fallback), monospace
- **Headings**: 600-700 weight, tighter letter-spacing
- **Body**: 400 weight, standard letter-spacing

## Iconography

- Activity bar / sidebar icons: **Codicon** font icons (standard VS Code codepoints)
- Brand icon "O" mark: Rounded rectangle (`border-radius: 16px`) with amber→blue gradient, white "O" letter
- Application icon: 256x256 PNG with same brand mark
