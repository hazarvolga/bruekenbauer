# AGENTS.md — AI Working Instructions

Instructions for any AI agent (Claude, Codex, Copilot, etc.) working in this codebase.

## Identity & scope

This is a **cinematic industrial B2B experience** — not a generic corporate site.
Every output must preserve the graphite/macro visual language. No pastel, no rounded-corner SaaS aesthetics.

## Stack baseline

Next.js 15 · React 19 · TypeScript strict · Tailwind CSS 3 · Framer Motion 11 · Node 22 · pnpm · next-themes · tailwind-merge · clsx

Deviate only with `[STACK-OVERRIDE: <reason>]`.

## Before any non-trivial change

1. Read the closest existing pattern in `components/` or `app/`.
2. Read [docs/DESIGN_RULES.md](docs/DESIGN_RULES.md) if touching UI.
3. Read [docs/DATA_MODEL.md](docs/DATA_MODEL.md) if touching data layer.
4. Confirm the change is reversible or state the rollback path.

## Class composition utilities

`lib/utils.ts` exports `cn(...inputs)` — a `clsx` + `twMerge` combination.

```ts
import { cn } from "@/lib/utils";
// Static classes → plain string is fine
// Conditional classes → cn() with object or ternary syntax
// className prop overrides → always pass through cn() to resolve conflicts
```

- Use `cn()` for **any** component that accepts a `className` prop or has conditional classes.
- Object syntax preferred for multi-branch conditions: `cn("base", { "active-class": isActive })`.
- Do **not** use bare template literals or string concat for class composition — `cn()` is the only merge path.

## Theme system (v02)

Themes are managed by **next-themes** (`ThemeProvider` in `app/providers.tsx`):
- `attribute="class"` — adds `.dark` / `.light` to `<html>` (matches CSS token layer).
- `defaultTheme="dark"` — brand default; dark is the SSR baseline.
- `enableSystem` — respects `prefers-color-scheme` on first visit.
- `storageKey="theme"` — persists to localStorage under key `"theme"`.

When reading the active theme in client components, use `useTheme()` from `next-themes`:
```ts
const { resolvedTheme, setTheme } = useTheme();
// resolvedTheme is undefined during SSR — always provide a sensible dark fallback
```

Do **not** manipulate `document.documentElement.classList` or localStorage directly — that's next-themes' job.

## Code rules

- **Server components by default.** `"use client"` requires a one-line comment justification.
- **Token discipline.** Components consume Tailwind classes only — zero raw hex/px/ms. `#`, `px`, or `ms` inside a component = review failure.
- **All interactive components declare all 8 states:** `default · hover · focus-visible · active · disabled · loading · error · empty`.
- **No `any`.** No silent `catch`. Errors are typed and user-readable.
- **Images via `next/image`** with explicit `width`/`height`. Never bare `<img>`.
- **Mutations: append-only.** Never edit an already-merged DB migration.
- **Commit format:** `<scope>: <imperative verb> <object>` — under 60 chars. Enforced by Commitlint.

## Performance budget (per route)

| Metric    | Budget        |
| --------- | ------------- |
| LCP       | < 2.5 s       |
| CLS       | < 0.1         |
| INP       | < 200 ms      |
| JS bundle | < 170 KB gzip |

## Design constraints (non-negotiable)

- Background: `#141313` — never change.
- Primary accent: `warning-red` (#FF0000) — scarce, primary CTA only.
- Font: JetBrains Mono — no decorative display fonts.
- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 px only.
- Motion: ease-out on entries, ease-in on exits. `prefers-reduced-motion` fallback always.
- Glassmorphism: only when backed by real visual depth.

## Directory responsibilities

| Path                  | Purpose                                                    |
| --------------------- | ---------------------------------------------------------- |
| `app/`                | Pages (App Router). One file per route.                    |
| `components/layout/`  | Site chrome — never import business logic.                 |
| `components/motion/`  | Animation primitives — no page-specific logic.             |
| `components/product/` | Product display components.                                |
| `data/`               | Static data — TypeScript only, no external fetch at build. |
| `lib/`                | Pure utilities — no React, no side effects.                |
| `styles/`             | Global CSS — Tailwind directives + custom utilities only.  |
| `e2e/`                | Playwright smoke tests — one spec per major route.         |
| `docs/`               | Living documentation — update on every meaningful change.  |

## What NOT to do

- Do not add UI libraries (shadcn, MUI, Radix, Chakra) — the design system is hand-crafted.
- Do not simplify or "modernise" the visual language.
- Do not add client-side data fetching unless SSR is impossible.
- Do not commit `.env.local` or any secret.
- Do not `git push --force` to `main`.
- Do not run `DROP`, `TRUNCATE`, or mass `DELETE` without explicit user confirmation.

## Testing

After any non-trivial change:

```bash
pnpm typecheck   # must pass — zero errors
pnpm lint        # must pass — zero warnings
pnpm format:check
pnpm test:e2e    # smoke tests green
```

## Docs maintenance

If you add a route → update `docs/ROUTE_MAP.md`.
If you change the data shape → update `docs/DATA_MODEL.md`.
If you make an architecture decision → append to `docs/DECISIONS.md`.
