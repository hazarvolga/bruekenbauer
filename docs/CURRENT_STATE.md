# Current State

Last updated: 2026-05-27

## What's done

### Application

- Next.js 15 App Router — 18 page route patterns + 3 API routes fully migrated to dynamic i18n prefix matching (`/[locale]/`)
- Multilingual Architecture — Integrated `next-intl` dictionary configuration mapping English (`en`), German (`de`), and French (`fr`)
- Component system: TopNav (with integrated custom `LanguageSwitcher` replacing social links), Footer, SiteChrome, HudMetric, SideRail, TechnicalButton
- Motion primitives: MotionProvider (PageShell), MaskedImageFrame (reverted to pure CSS `background-image` to prevent Next.js image optimization downscaling for maximum high-density retina clarity), StaggerText, Reveals
- Product components: ProductCard, ProductGrid, IndustrySystemsPanel
- RFQ flow: RfqFlow — full API submission with loading/success/error states. Localized keys (labels) and values (group, sector, leadTime, source) in the success registry view for German (DE) and French (FR) locales.
- Contact form: ContactForm — full API submission with loading/success/error states
- Search: SearchClient — debounced (150ms), filters name/partNumber/group/applications, highlight matches, displays full product names alongside part numbers in the results row.
- Compare: URL-based state `?ids=slug-a,slug-b` (max 3), spec union diff with `warning-red` highlights
- Power Management intro: `/intro` uses PDF-derived IGBT, SiC MOSFET, MOSFET, and Converters data
- Power Management detail pages: `/power-management/{igbt,sic,mosfet,converters}` use PDF-derived performance parameters, selling points, and target application links
- Static data layer: products (full catalogue), productTaxonomy (8 groups), applications (9 strategic industry verticals)
- SEO: `app/sitemap.ts` (all static + dynamic routes), `app/robots.ts`, dynamic OG images at `/api/og` using `next/og` & satori, structured B2B JSON-LD schemas (`Product` & `Service`) on `/product/[slug]` and `/industries/[slug]`.
- API routes: `/api/health`, `/api/rfq` (POST), `/api/contact` (POST), `/api/og` (GET - edge runtime dynamic OG images)
- Root Layout: Introduced `app/layout.tsx` to satisfy Next.js 15 routing for root-level pages, resolving not-found.tsx compilation errors.

### DevOps & tooling

- `.gitignore` — covers Next.js, env, OS, Playwright, prototype exports
- `.env.example` — documented env variable contract
- `.nvmrc` — Node 22
- `README.md` — project overview, scripts, structure
- `AGENTS.md` — AI agent working instructions
- `.github/workflows/ci.yml` — quality → build → smoke test + Lighthouse CI (LCP < 2.5s, CLS < 0.1) pipeline
- `.github/PULL_REQUEST_TEMPLATE.md` — checklist-driven PR flow
- `.github/ISSUE_TEMPLATE/` — bug report + feature request forms
- `.github/CODEOWNERS` — all PRs require hazarekiz review
- `renovate.json` — weekly dependency updates, auto-merge patches
- `lh-budget.json` — strict performance and script payload budget for audits
- `playwright.config.ts` + `e2e/smoke.spec.ts` — route smoke tests + CWV + a11y checks
- `Dockerfile` — multi-stage Node 22 Alpine, standalone output, non-root user, healthcheck
- `docker-compose.yml` — local production simulation with resource limits
- `.dockerignore` — minimal context for fast builds
- `next.config.mjs` — `output: "standalone"` for Docker
- `docs/DESIGN_RULES.md` — visual system constraints
- `docs/ROUTE_MAP.md` — full route inventory
- `docs/DATA_MODEL.md` — type definitions and conventions
- `docs/DECISIONS.md` — architecture decision log

### Git status

- GitHub remote ✅ — `hazarvolga/bruekenbauer` (all local commits successfully pushed to origin/main)
- Vercel production ✅ — `https://bruekenbauer.vercel.app`

## What's missing

### High priority

- [ ] CI/Renovate monitoring after GitHub activation

### Medium priority

- [ ] RFQ/Contact API — connect to real destination (CRM, email, n8n webhook). Currently logs to stdout.
- [ ] Compare — add "Compare" entry point on `/product/[slug]` pages

### Low priority

- [ ] Storybook — component isolation and visual regression

## Deployment path

```
Local dev  →  git push main  →  GitHub Actions CI  →  Vercel production deploy
```

Current production alias:

- `https://bruekenbauer.vercel.app`

Coolify remains available as an optional Oracle VPS deployment path if required later.

## API contract

| Route          | Method | Required fields            | Success                          |
| -------------- | ------ | -------------------------- | -------------------------------- |
| `/api/health`  | GET    | —                          | `{ status: "ok" }`               |
| `/api/rfq`     | POST   | `name`, `email`, `company` | `{ referenceId, timestamp }` 201 |
| `/api/contact` | POST   | `name`, `email`, `message` | `{ referenceId, timestamp }` 201 |
