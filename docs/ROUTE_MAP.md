# Route Map

All App Router routes as of 2026-05-19.

## Static routes

| Route         | File                      | Description                                             | Auth   |
| ------------- | ------------------------- | ------------------------------------------------------- | ------ |
| `/`           | `app/page.tsx`            | Homepage — HUD metrics, cinematic hero image, nav cards | Public |
| `/intro`      | `app/intro/page.tsx`      | Immersive animated intro sequence                       | Public |
| `/about`      | `app/about/page.tsx`      | Company overview                                        | Public |
| `/contact`    | `app/contact/page.tsx`    | Contact form / RFQ entry                                | Public |
| `/compliance` | `app/compliance/page.tsx` | REACH / RoHS / compliance docs                          | Public |
| `/documents`  | `app/documents/page.tsx`  | Technical archive / document library                    | Public |
| `/logistics`  | `app/logistics/page.tsx`  | Supply chain and logistics overview                     | Public |
| `/oem-supply` | `app/oem-supply/page.tsx` | Bulk procurement and OEM architecture                   | Public |

## Products

| Route                  | File                               | Description                    |
| ---------------------- | ---------------------------------- | ------------------------------ |
| `/products`            | `app/products/page.tsx`            | Full product catalogue grid    |
| `/products/[category]` | `app/products/[category]/page.tsx` | Category-filtered product grid |
| `/product/[slug]`      | `app/product/[slug]/page.tsx`      | Individual product detail      |

## Power Management

| Route                      | File                                   | Description                           |
| -------------------------- | -------------------------------------- | ------------------------------------- |
| `/power-management/[slug]` | `app/power-management/[slug]/page.tsx` | PDF-derived power module detail pages |

## Industries

| Route                | File                             | Description                           |
| -------------------- | -------------------------------- | ------------------------------------- |
| `/industries`        | `app/industries/page.tsx`        | Industry vertical overview            |
| `/industries/[slug]` | `app/industries/[slug]/page.tsx` | Industry detail — applications, specs |

## Tools

| Route     | File                  | Description                                    |
| --------- | --------------------- | ---------------------------------------------- |
| `/search` | `app/search/page.tsx` | Technical part finder with predictive matching |
| `/rfq`    | `app/rfq/page.tsx`    | RFQ multi-step flow                            |

## API

| Route         | File                      | Description                                            |
| ------------- | ------------------------- | ------------------------------------------------------ |
| `/api/health` | `app/api/health/route.ts` | Docker / Coolify healthcheck — returns `{status:"ok"}` |

## Dynamic segment sources

| Segment             | Data source                                         |
| ------------------- | --------------------------------------------------- |
| `[category]`        | `data/productTaxonomy.ts` — `categories` array      |
| `[slug]` (product)  | `data/products.ts` — `slug` field via `lib/slug.ts` |
| `[slug]` (industry) | `data/applications.ts` — `slug` field               |
| `[slug]` (power)    | `data/powerManagement.ts` — `slug` field            |

## Adding a new route

1. Create `app/<route>/page.tsx`.
2. Add a row to this file.
3. Add a smoke test entry in `e2e/smoke.spec.ts`.
4. If the route uses a new data segment, document it in `docs/DATA_MODEL.md`.
