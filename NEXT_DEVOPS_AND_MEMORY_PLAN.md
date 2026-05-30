# BRUECKENBAUER — DevOps & Agent Memory Plan

Last updated: 2026-05-19
Status: **Phase 3 active.** GitHub + Vercel production deploy complete. Power Management PDF data is now converted into intro and detail product-led site pages.

---

## Permanent Constraints (never negotiate)

- Preserve the cinematic graphite/macro industrial design language. No pastel. No rounded SaaS.
- Do not reference the source brand name (portfolio PDF origin) anywhere in the public site.
- Product images are AI-generated graphite/macro assets — do not replace with stock photography.
- Source PDF data may be used, but source brand/logos must not appear in public UI.
- PDF page 4 Strategic Industries maps to site industries; keep Automotive and E-Mobility split, and include HVAC as its own industry.
- Industry detail pages: synchronized left active-system list + right product dossier scroll panel.
- Custom scroll rails replace default browser scrollbars — intentional, do not revert.
- `"use client"` requires a one-line justification comment. Server components by default.
- Token discipline: zero raw hex/px/ms in component code. Review failure otherwise.
- Run full typecheck/build only at the end of a stable phase, not after every visual tweak.

---

## DevOps Audit — 2026-05-19

### ✅ Present

**Application**

- Next.js 15 App Router — 18 page route patterns + 3 API routes
- TypeScript strict · Tailwind CSS 3 (token-based) · Framer Motion 11
- Static data layer: products, productTaxonomy, applications
- `next.config.mjs` — `output: "standalone"` for Docker

**Config**

- `.gitignore` — Next.js, env, OS, Playwright, prototype exports
- `.env.example` — documented env contract
- `.nvmrc` — Node 22
- `pnpm-lock.yaml` — pnpm as package manager

**Code quality**

- ESLint (Next Core Web Vitals + TypeScript strict, zero warnings)
- `prettier` + `prettier-plugin-tailwindcss` (class sorting)
- `commitlint` — conventional commits with scope enforcement
- `husky` — pre-commit (lint-staged) + commit-msg (commitlint) hooks
- `lint-staged` — runs ESLint + Prettier on staged files only
- Scripts: `dev`, `build`, `start`, `lint`, `typecheck`, `format`, `format:check`, `test:e2e`, `prepare`

**GitHub DevOps**

- `.github/workflows/ci.yml` — quality → build → smoke (3-job pipeline)
- `.github/PULL_REQUEST_TEMPLATE.md` — checklist-driven
- `.github/ISSUE_TEMPLATE/bug_report.yml`
- `.github/ISSUE_TEMPLATE/feature_request.yml`
- `.github/CODEOWNERS` — all PRs require hazarekiz review
- `renovate.json` — weekly deps, auto-merge patches, manual review for core packages

**Testing**

- `playwright.config.ts` — Chromium, `pnpm start` webserver
- `e2e/smoke.spec.ts` — all 13 routes (200 + title), CWV (CLS < 0.1), a11y (main landmark, focus-visible)

**Deployment**

- `Dockerfile` — multi-stage Alpine, non-root user, healthcheck
- `docker-compose.yml` — local prod simulation, resource limits (512M RAM)
- `.dockerignore` — minimal build context

**Documentation**

- `README.md` — setup, scripts, structure
- `AGENTS.md` — AI agent working instructions (constraints, rules, directory map)
- `docs/DESIGN_RULES.md` — visual system constraints
- `docs/ROUTE_MAP.md` — full route inventory
- `docs/DATA_MODEL.md` — TypeScript types + image conventions + add-X guides
- `docs/CURRENT_STATE.md` — done/pending/deployment path
- `docs/DECISIONS.md` — architecture decision log (7 ADRs)

### ✅ Shipped (Phase 2 — 2026-05-19)

- `git init` ✅ — first two commits staged
- `pnpm install` + husky + playwright ✅
- Font loading ✅ — `JetBrains_Mono` via `next/font/google`, `--font-jetbrains` var on `<html>`
- `sitemap.xml` + `robots.txt` ✅ — `app/sitemap.ts` + `app/robots.ts` (full route coverage)
- Search functionality ✅ — `SearchClient` debounce 150ms, multi-field filter, highlight, empty state
- Compare page ✅ — `?ids=slug-a,slug-b,slug-c` URL state, spec union diff, `warning-red` diff highlight
- RFQ API ✅ — `POST /api/rfq` — validated, ref ID, structured log
- Contact API ✅ — `POST /api/contact` — validated, ref ID, structured log
- `RfqFlow` + `ContactForm` ✅ — loading / success / error states wired to real API endpoints
- lint-staged `--no-warn-ignored` ✅ — suppresses next-env.d.ts false-positive warning

### ✅ Shipped (Phase 3 — 2026-05-19)

- GitHub remote ✅ — `hazarvolga/bruekenbauer`, `main` pushed and tracking `origin/main`
- Vercel production ✅ — project `hazarvolgas-projects/bruekenbauer`, alias `https://bruekenbauer.vercel.app`
- Power Management intro ✅ — `/intro` now uses PDF-derived Power Management data and horizontal product rows
- Power Management data module ✅ — `data/powerManagement.ts` stores IGBT, SiC MOSFET, MOSFET, and Converters data
- Power Management detail pages ✅ — `/power-management/{igbt,sic,mosfet,converters}` use PDF key performance parameters, key selling points, and target applications
- Strategic Industries alignment ✅ — `HVAC` added to `data/applications.ts`; Automotive and E-Mobility remain separate internal industries
- Vercel build warning fix ✅ — `@next/eslint-plugin-next` explicit devDependency

### ✅ Shipped (Phase 4 — 2026-05-27)

- Multilingual i18n Routing ✅ — Dynamic route prefixing (`/[locale]/`) via `next-intl` fully configured with English (`en`), German (`de`), and French (`fr`) dictionaries.
- Custom LanguageSwitcher ✅ — Replaced top-navigation social media links with a high-fidelity Brutalist `EN | DE | FR` language switcher.
- Hero Image Quality Restoration ✅ — Reverted `MaskedImageFrame` to raw CSS `background-image: url(...)` with `bg-cover` to bypass Next.js downscaling and ensure pixel-perfect resolution on high-density retina displays.

### ✅ Shipped (Phase 5 — 2026-05-30)

- Dynamic OG Image Generation ✅ — `/api/og` route handler implemented using Satori and `next/og` producing dark industrial brutalist images dynamically.
- Structured JSON-LD Data Schemas ✅ — Embedded `<script type="application/ld+json">` of type `Product` on `/product/[slug]` and `Service` on `/industries/[slug]`.
- Lighthouse CI Performance Budget ✅ — Integrated `lhci` checking into the GitHub Actions pipeline, enforcing `LCP < 2.5s` and `CLS < 0.1` budgets.
- Next.js 15 Root Layout Resolution ✅ — Configured `app/layout.tsx` to safely resolve compilation errors for root-level static pages.
- Multilingual RFQ success registry view ✅ — Fully translated both keys and values in German and French on the final B2B RFQ success detail dashboard.
- Full product names in Search Results ✅ — Enhanced `SearchClient` rows to present full product names with debounced term highlights.

### ❌ Still missing

**High priority (next session)**

- [ ] Decide production target — Vercel is live; Coolify remains optional if Oracle VPS deployment becomes preferred

**Medium priority**

- [ ] RFQ/Contact API — connect to real destination (CRM, email, n8n webhook); currently stdout only
- [ ] Compare entry point — "Compare" link on `/product/[slug]` pages

**Low priority**

- [ ] Storybook — component isolation and visual regression
- [ ] Graphify / codebase-memory-mcp — evaluate after repo is stable on GitHub

---

## Immediate Next Steps (ordered)

```bash
# 1. Install new devDependencies + activate tooling
cd /path/to/stitch_industrial_narrative_experience
pnpm install
pnpm exec playwright install chromium
git init
pnpm exec husky          # activates pre-commit + commit-msg hooks

# 2. Verify quality gates pass
pnpm typecheck           # must be zero errors
pnpm lint                # must be zero warnings
pnpm format:check        # must be clean

# 3. Production build
pnpm build               # verifies standalone output works

# 4. Smoke tests (requires build first)
pnpm test:e2e

# 5. First commit
git add -A
git commit -m "chore(config): initial devops scaffolding"

# 6. Push to GitHub and enable Renovate + CI
```

---

## Completed Product Phase: Power Management Details

One reusable detail template now covers:

- `/power-management/igbt`
- `/power-management/sic`
- `/power-management/mosfet`
- `/power-management/converters`

PDF pages 6-9 are represented as `Key Performance Parameters`, `Key Selling Points`, and `Target Applications`.
Target application labels preserve PDF wording and link to internal `/industries/[slug]` routes.
Page 4 Strategic Industries remains the canonical application taxonomy reference.

Mapping rule:

- Automotive and E-Mobility stay separate internally.
- HVAC is a first-class internal industry.
- PDF labels such as `Power Electronics`, `Drive Technology`, and `Industrial Automation` map to `/industries/industrial`.
- PDF labels such as `Photovoltaic Systems` and `Photovoltaic Energy Storage` map to `/industries/renewable-energy`.

## Session After Next: Search + Compare

Both `/search` and `/compare` are UI shells. Implementation order:

**Search (`/search`)**

1. Import `products` from `data/products.ts` in the page component.
2. Add `"use client"` wrapper for input state.
3. Filter by `name`, `partNumber`, `group`, `applications` on `onChange`.
4. Debounce at 150ms. No external API needed.

**Compare (`/compare`)**

1. URL-based state: `/compare?ids=slug-a,slug-b,slug-c` (max 3).
2. `ProductCard` already exists — reuse in comparison grid.
3. Highlight differing spec values in red (`warning-red`).

---

## Agent Memory Requirements

Every agent working in this codebase must internalize:

- Design language is non-negotiable. Read `docs/DESIGN_RULES.md` before any UI change.
- Data shape changes require updating `docs/DATA_MODEL.md`.
- New routes require updating `docs/ROUTE_MAP.md` and `e2e/smoke.spec.ts`.
- Architecture decisions require an entry in `docs/DECISIONS.md`.
- Commit format: `<scope>: <imperative verb> <object>` — under 60 chars. Scopes enforced by commitlint.
- Performance budget: LCP < 2.5s · CLS < 0.1 · INP < 200ms · JS < 170KB gzip.

---

## Tool Evaluation

| Tool                | Status            | Notes                                                                       |
| ------------------- | ----------------- | --------------------------------------------------------------------------- |
| Graphify            | Deferred          | Evaluate after GitHub repo is stable. Useful for code graph + agent memory. |
| GitNexus            | Deferred          | After GitHub setup. Candidate for dependency mapping.                       |
| codebase-memory-mcp | Deferred          | Evaluate after stable CI + docs.                                            |
| Zep / Graphiti      | Not applicable    | Runtime AI memory — not relevant for this static frontend.                  |
| `@vercel/og`        | Next session      | OG image generation — high priority for SEO.                                |
| Lighthouse CI       | Next CI iteration | Add as 4th job to `.github/workflows/ci.yml`.                               |
