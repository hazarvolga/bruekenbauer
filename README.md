# brüeckenbauer GmbH — Industrial Narrative Experience

Cinematic B2B web experience for strategic electronics and semiconductor procurement.
Built on Next.js 15 App Router with a graphite/macro visual language.

## Stack

| Layer           | Technology                   |
| --------------- | ---------------------------- |
| Framework       | Next.js 15 (App Router)      |
| Language        | TypeScript 5 (strict)        |
| Styling         | Tailwind CSS 3 (token-based) |
| Animation       | Framer Motion 11             |
| Runtime         | Node.js 22                   |
| Package manager | pnpm                         |

## Prerequisites

- Node.js 22 (`nvm use` with `.nvmrc`)
- pnpm (`npm i -g pnpm`)

## Quick start

```bash
cp .env.example .env.local
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command             | Description                  |
| ------------------- | ---------------------------- |
| `pnpm dev`          | Start dev server (Turbopack) |
| `pnpm build`        | Production build             |
| `pnpm start`        | Serve production build       |
| `pnpm lint`         | ESLint (zero warnings)       |
| `pnpm typecheck`    | TypeScript check (no emit)   |
| `pnpm format`       | Prettier write               |
| `pnpm format:check` | Prettier check (CI)          |
| `pnpm test:e2e`     | Playwright smoke tests       |

## Project structure

```
app/                    Next.js App Router pages
  layout.tsx            Root layout (SiteChrome wrapper)
  page.tsx              Homepage
  [route]/page.tsx      Feature pages
components/
  layout/               Chrome — TopNav, Footer, SiteChrome, HudMetric
  motion/               MotionProvider, Reveals (masked frames, stagger text)
  product/              ProductCard, ProductGrid, IndustrySystemsPanel
  rfq/                  RfqFlow
data/                   Static data layer (products, taxonomy, applications)
lib/                    Utilities (assets, motion config, slugs)
styles/                 globals.css (Tailwind base + custom utilities)
docs/                   Developer documentation
e2e/                    Playwright smoke tests
```

## Design system

Tokens live in `tailwind.config.ts`. Components consume Tailwind classes backed by semantic tokens only — no raw hex or px values in component code. See [docs/DESIGN_RULES.md](docs/DESIGN_RULES.md).

## Deployment

Docker-based via Coolify. See [docs/CURRENT_STATE.md](docs/CURRENT_STATE.md) and the `Dockerfile` at root.

## Documentation

- [docs/DESIGN_RULES.md](docs/DESIGN_RULES.md) — Visual system constraints
- [docs/ROUTE_MAP.md](docs/ROUTE_MAP.md) — Page inventory
- [docs/DATA_MODEL.md](docs/DATA_MODEL.md) — Data layer
- [docs/CURRENT_STATE.md](docs/CURRENT_STATE.md) — What's done, what's next
- [docs/DECISIONS.md](docs/DECISIONS.md) — Architecture decision log
- [AGENTS.md](AGENTS.md) — AI agent working instructions
