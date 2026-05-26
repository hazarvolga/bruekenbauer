# Architecture Decisions

Append-only log. One entry per meaningful decision.
Format: `## YYYY-MM-DD — <title>`

---

## 2026-05-19 — Next.js App Router over Pages Router

**Context:** Greenfield project, targeting Next.js 15.
**Decision:** App Router (RSC by default).
**Consequences:** Server components eliminate client bundle weight for data-display pages. `"use client"` required only for Framer Motion animation wrappers (MotionProvider, Reveals). Streaming and Suspense available for future async data routes.

---

## 2026-05-19 — Static data layer in TypeScript files

**Context:** Product catalogue and industry data are maintained manually; no CMS required at launch.
**Decision:** TypeScript arrays in `data/` — no external fetch, no CMS, no database.
**Consequences:** Zero network latency on builds. Type safety end-to-end. Migration path: replace `data/products.ts` exports with `fetch()` calls or a DB query when CMS integration is needed. No component changes required.

---

## 2026-05-19 — JetBrains Mono as sole typeface

**Context:** Cinematic industrial aesthetic — mono type reinforces technical/HUD language.
**Decision:** Single typeface, zero font mixing.
**Consequences:** Consistent visual weight across all surfaces. Subset + preload required to avoid flash. Max 1 weight per load (no bold italic variants needed). TODO: migrate from CSS variable to `next/font/local` for optimal loading.

---

## 2026-05-19 — Tailwind CSS with hand-crafted token layer

**Context:** Custom design language — no off-the-shelf component library fits.
**Decision:** Tailwind extended with semantic color, spacing, and typography tokens. No UI library (shadcn, MUI, Radix).
**Consequences:** Full design control. Zero override battles. Requires discipline: all components use token classes only — never raw hex/px/ms. Enforced by code review checklist and AGENTS.md.

---

## 2026-05-19 — Framer Motion for all animation

**Context:** Complex entry animations (masked reveals, stagger, parallax) needed.
**Decision:** Framer Motion 11. All animated components are `"use client"` wrappers around RSC content.
**Consequences:** Animation logic isolated in `components/motion/`. RSC data fetching unaffected. `prefers-reduced-motion` handled in `motion.config.ts` and applied via `MotionProvider`.

---

## 2026-05-19 — Docker standalone output via Coolify

**Context:** Self-hosted deployment on Coolify.
**Decision:** `output: "standalone"` in `next.config.mjs`. Multi-stage Dockerfile with Node 22 Alpine, non-root user, healthcheck endpoint.
**Consequences:** Minimal container image. `/api/health` required for Docker healthcheck. Static assets served directly from `.next/static` — consider CDN in front of Coolify for production.

---

## 2026-05-19 — pnpm as package manager

**Context:** `pnpm-lock.yaml` present from project init.
**Decision:** pnpm throughout. `corepack enable pnpm` in Dockerfile.
**Consequences:** Faster installs, strict dependency isolation. CI must run `pnpm install --frozen-lockfile`. Renovate configured for pnpm.

---

## 2026-05-26 — Single Premium Image Strategy for Multi-Theme Stability

**Context:** Originally, different images were planned for light and dark modes. However, generating light and dark variants of the same component introduced composition and rendering mismatches, which breaks catalog consistency on theme switch.
**Decision:** Standardize on a single, high-fidelity premium image (originally created as the dark variant) for both light and dark modes.
**Consequences:** Complete visual consistency during theme transitions. Eliminates composition mismatches. `ThemedProductImage` will fallback dynamically to the premium `darkSrc` in both light and dark modes, completely eradicating the old low-quality AI images.

