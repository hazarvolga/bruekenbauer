# Route Map

All App Router routes as of 2026-05-27.

## Locale Strategy

The public site uses `next-intl` with `localePrefix: "as-needed"`.

| Locale  | Public prefix | Example        |
| ------- | ------------- | -------------- |
| English | none          | `/products`    |
| German  | `/de`         | `/de/products` |
| French  | `/fr`         | `/fr/products` |

All page files live under `app/[locale]/`. Middleware maps public URLs to the
correct locale segment.

## Static Routes

| Public route                                      | File                               | Description                                          | Auth   |
| ------------------------------------------------- | ---------------------------------- | ---------------------------------------------------- | ------ |
| `/`, `/de`, `/fr`                                 | `app/[locale]/page.tsx`            | Homepage with cinematic hero and operational metrics | Public |
| `/intro`, `/de/intro`, `/fr/intro`                | `app/[locale]/intro/page.tsx`      | Power Management portfolio entry sequence            | Public |
| `/about`, `/de/about`, `/fr/about`                | `app/[locale]/about/page.tsx`      | Company overview and services                        | Public |
| `/contact`, `/de/contact`, `/fr/contact`          | `app/[locale]/contact/page.tsx`    | Engineering contact form                             | Public |
| `/compliance`, `/de/compliance`, `/fr/compliance` | `app/[locale]/compliance/page.tsx` | Compliance archive                                   | Public |
| `/documents`, `/de/documents`, `/fr/documents`    | `app/[locale]/documents/page.tsx`  | Document library and downloadable PDFs               | Public |
| `/logistics`, `/de/logistics`, `/fr/logistics`    | `app/[locale]/logistics/page.tsx`  | Supply chain and logistics overview                  | Public |
| `/oem-supply`, `/de/oem-supply`, `/fr/oem-supply` | `app/[locale]/oem-supply/page.tsx` | OEM supply and procurement architecture              | Public |

## Products

| Public route                                                                 | File                                        | Description                    |
| ---------------------------------------------------------------------------- | ------------------------------------------- | ------------------------------ |
| `/products`, `/de/products`, `/fr/products`                                  | `app/[locale]/products/page.tsx`            | Product group catalogue        |
| `/products/[category]`, `/de/products/[category]`, `/fr/products/[category]` | `app/[locale]/products/[category]/page.tsx` | Category-filtered product grid |
| `/product/[slug]`, `/de/product/[slug]`, `/fr/product/[slug]`                | `app/[locale]/product/[slug]/page.tsx`      | Individual product detail      |

## Power Management

| Public route                                                                             | File                                            | Description                           |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------- | ------------------------------------- |
| `/power-management/[slug]`, `/de/power-management/[slug]`, `/fr/power-management/[slug]` | `app/[locale]/power-management/[slug]/page.tsx` | PDF-derived power module detail pages |

## Industries

| Public route                                                           | File                                      | Description                           |
| ---------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------- |
| `/industries`, `/de/industries`, `/fr/industries`                      | `app/[locale]/industries/page.tsx`        | Industry vertical overview            |
| `/industries/[slug]`, `/de/industries/[slug]`, `/fr/industries/[slug]` | `app/[locale]/industries/[slug]/page.tsx` | Industry detail and related portfolio |

## Tools

| Public route                                                                 | File                                        | Description                          |
| ---------------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------ |
| `/search`, `/de/search`, `/fr/search`                                        | `app/[locale]/search/page.tsx`              | Technical part finder                |
| `/rfq`, `/de/rfq`, `/fr/rfq`                                                 | `app/[locale]/rfq/page.tsx`                 | RFQ flow                             |
| `/presentation-review`, `/de/presentation-review`, `/fr/presentation-review` | `app/[locale]/presentation-review/page.tsx` | Internal presentation review surface |

## API

API routes are not localized.

| Route          | File                       | Description             |
| -------------- | -------------------------- | ----------------------- |
| `/api/health`  | `app/api/health/route.ts`  | Healthcheck endpoint    |
| `/api/rfq`     | `app/api/rfq/route.ts`     | RFQ submission endpoint |
| `/api/contact` | `app/api/contact/route.ts` | Contact form endpoint   |

## Dynamic Segment Sources

| Segment           | Data source                                 |
| ----------------- | ------------------------------------------- |
| `[locale]`        | `i18n/routing.ts` — `en`, `de`, `fr`        |
| `[category]`      | `data/productTaxonomy.ts` — `productGroups` |
| `[slug]` product  | `data/products.ts` — `slug`                 |
| `[slug]` industry | `data/applications.ts` — `slug`             |
| `[slug]` power    | `data/powerManagement.ts` — `slug`          |

## Adding A New Route

1. Create the route under `app/[locale]/<route>/page.tsx`.
2. Add localized smoke coverage in `e2e/smoke.spec.ts`.
3. Add or update dictionary keys in `messages/en.json`, `messages/de.json`, and `messages/fr.json`.
4. Update this file.
5. If the route uses a new data shape, update `docs/DATA_MODEL.md`.
