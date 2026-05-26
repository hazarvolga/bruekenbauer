# Design Rules

Non-negotiable visual system constraints. Any PR that violates these fails review.

## Color

| Token                    | Value     | Usage                                                      |
| ------------------------ | --------- | ---------------------------------------------------------- |
| `background` / `surface` | `#141313` | Page & card backgrounds — never change                     |
| `warning-red`            | `#FF0000` | Primary CTA, active state, reticle accents — use sparingly |
| `industrial-silver`      | `#D1D1D1` | Primary headings and labels                                |
| `on-surface-variant`     | `#C4C7C7` | Body copy, secondary labels                                |
| `data-orange`            | `#CC5500` | Metric accents, alert states                               |
| `outline-variant`        | `#444748` | Subtle borders                                             |
| `graphite-muted`         | `#1A1A1A` | Section dividers                                           |

**Rule:** Components consume Tailwind tokens only. Zero raw hex/px/ms in `.tsx` files. `#`, `px`, or `ms` literals = review failure.

## Typography

Single typeface: **JetBrains Mono** (`font-mono` / `font-technical`).
No decorative display or serif fonts.

| Scale token               | Size / line-height                       | Use                        |
| ------------------------- | ---------------------------------------- | -------------------------- |
| `text-label-xs`           | 10px / 12px, tracking 0.1em, weight 700  | Section tags, badges       |
| `text-data-sm`            | 12px / 16px, tracking 0.05em, weight 400 | Captions, coords, HUD data |
| `text-technical-md`       | 16px / 24px, tracking 0.02em, weight 500 | Body copy, descriptions    |
| `text-headline-lg-mobile` | 32px / 40px, weight 600                  | Mobile headings            |
| `text-headline-lg`        | 48px / 56px, weight 600                  | Desktop headings           |
| `text-display-xl`         | clamp(64–120px), lh 0.92, weight 700     | Hero / intro display       |

## Spacing

Scale: **4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 px** only.
Named tokens: `gutter` (24px), `margin-mobile` (20px), `margin-desktop` (64px).
No arbitrary values. No half-steps.

## Component states

Every interactive component declares all 8 states:
`default → hover → focus-visible → active → disabled → loading → error → empty`

`focus-visible` outline: `1px solid #FF0000` (already in `globals.css`).
Missing state = component is not done.

## Motion

- Entries: `ease-out`. Exits: `ease-in`.
- Spring physics: drags, toggles, sheets.
- Cubic-bezier: one-shot transitions.
- `prefers-reduced-motion`: fade-only fallback. Always. No exception.
- No animation without a communication purpose.

Duration tokens: `120ms` (micro) · `200ms` (small) · `320ms` (medium) · `480ms` (large).

## Layout

- Side rail: 80px left offset on `md+` (`md:pl-20`).
- Top nav: 80px height (`pt-20`).
- No centered max-width containers — industrial layouts use full-bleed columns.
- Grid: CSS Grid with `gap-gutter`. No Flexbox grids for page structure.

## Visual motifs

- `.scan-line` — animated horizontal sweep, used inside `MaskedImageFrame`.
- `.reticle-corners` — corner tick marks, applied via Tailwind class.
- `.technical-grid` — subtle dot/line grid background, used on section containers.
- `HUB_ALPHA` badge pattern — uppercase mono label + red dot indicator.

## What to never add

- Pastel or light-mode color palette.
- Rounded corners beyond `rounded` (0.25rem) or `rounded-lg` (0.5rem).
- Drop shadows except `shadow-red-reticle`.
- UI libraries (shadcn, MUI, Radix, Chakra) — design system is hand-crafted.
- Emojis anywhere in the UI.
- Any sentence that survives if you swap the brand name.
