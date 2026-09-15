# Design System & Theme Guide (Directus Glassmorphism)

UltimateCRM uses a Directus-inspired dark glassmorphism design system defined entirely in `src/assets/main.css` using CSS custom properties.

---

## 🎨 Color Palette & Design Tokens

| Token | Color Code | Usage |
| :--- | :--- | :--- |
| `--bg-dark` | `#0b0f17` | Main page background (deep charcoal/obsidian) |
| `--bg-surface` | `#121826` | Card container & panel surface |
| `--bg-glass` | `rgba(18, 24, 38, 0.75)` | Translucent glass panel background |
| `--border-subtle` | `rgba(255, 255, 255, 0.08)` | 1px border separator |
| `--border-glow` | `rgba(99, 102, 241, 0.3)` | Primary glowing border highlight |
| `--accent-primary` | `#6366f1` | Electric Indigo / Violet primary brand accent |
| `--accent-purple` | `#8b5cf6` | Deep Purple secondary accent |
| `--accent-emerald` | `#10b981` | Revenue won & success states |
| `--accent-amber` | `#f59e0b` | Proposals & warning states |

---

## 💎 Utility Classes

- `.glass-panel`: Applies backdrop blur (`16px`), glass background, and subtle border.
- `.glass-panel-hover`: Adds hover elevation and glowing border highlight.
- `.btn-primary`: Gradient button (`#6366f1` -> `#8b5cf6`) with shadow glow.
- `.badge-[stage]`: Status pills for stages (`badge-lead`, `badge-qualified`, `badge-proposal`, `badge-negotiation`, `badge-won`, `badge-lost`).
