# Data Model

Static data layer — TypeScript only, no external fetch at build time.
All data lives in `data/` and is imported directly into server components.

## Types

### `Product` — `data/products.ts`

```ts
type Product = {
  slug: string; // URL segment: /product/[slug]
  partNumber: string; // Internal reference code e.g. "SCV-TMP-001"
  name: string; // Display name
  group: ProductGroup; // Taxonomy category (see below)
  applications: ApplicationName[]; // Industry verticals
  status: "Optimal" | "Critical Low" | "Allocation" | "Prototype";
  stock: string; // Human-readable availability
  leadTime: string; // e.g. "12 days"
  image: string; // /images/products/<slug>-ai.png
  dossier: string; // One-line technical description
  specs: Record<string, string>; // Key-value spec pairs
};
```

### `ProductGroup` — `data/productTaxonomy.ts`

```
"Temperature Sensors"
"Pressure & Flow Sensors"
"Current & Position Sensors"
"Electromagnetic Compatibility (EMC)"
"Power Management"
"Passives"
"Electromechanics"
"Acoustics"
```

Each group maps to a `categoryMeta` record with `description` and `image` fields.
Slugs are derived via `slugify()` from `lib/slug.ts`.

### `ApplicationName` — `data/applications.ts`

Industry verticals used to filter products:

```
"Industrial" | "Automotive & Transportation" | "E-Mobility & Battery Management" |
"Aerospace & Defense" | "Medical & Healthcare" | "Building Automation" |
"Home Appliances & White Goods" | "HVAC" | "Renewable Energy"
```

Each application maps to a record with `name`, `slug`, `node`, `summary`, `heroImage`, and `detail`.
Industry detail pages and overview cards use optimized WebP `heroImage` assets. Full-size generated PNG sources are archived under `asset-sources/images/industries/` and excluded from Vercel deployment.

### `PowerManagementFamily` — `data/powerManagement.ts`

Normalized Power Management portfolio data extracted from the source PDF pages 5-9.
Used by `/intro` as a product-led technical entry sequence.

```ts
type PowerManagementFamily = {
  slug: "igbt" | "sic" | "mosfet" | "converters";
  name: string;
  label: string;
  image: string;
  summary: string;
  variants: string[];
  performance: {
    parameter: string;
    specification: string;
    standard: string;
  }[];
  sellingPoints: string[];
  targetApplications: {
    label: string;
    applicationName: ApplicationName;
  }[];
};
```

## Relationships

```
Product ──── group ────────▶ ProductGroup (taxonomy)
Product ──── applications ─────────────▶ ApplicationName[] (industry filter)
PowerManagementFamily ────────────────▶ Product image assets + PDF-derived technical data
PowerManagementFamily.targetApplications ─▶ ApplicationName internal industry routes
```

## Slug generation

`lib/slug.ts` — `slugify(str)` lowercases and replaces spaces/special chars with hyphens.
Used for both product and industry route segments.

## Image conventions

| Asset type           | Path pattern                                     |
| -------------------- | ------------------------------------------------ |
| Product images       | `/public/images/products/<slug>-ai.png`          |
| Product group covers | `/public/images/product-groups-premium/dark/<slug>-cover.webp` |
| Industry images      | `/public/images/industries/<slug>.webp`          |
| Source PNG archive   | `/asset-sources/images/...`                      |
| Page heroes          | `/public/images/generated/<page>.webp`           |

All images served via `next/image` with explicit dimensions.

## Adding a product

1. Add entry to `products` array in `data/products.ts`.
2. Ensure `group` maps to an existing `ProductGroup`.
3. Add product image to `/public/images/products/`.
4. Slug is automatically derived — verify uniqueness.

## Adding a product group

1. Add to `productGroups` const array in `data/productTaxonomy.ts`.
2. Add `categoryMeta` entry with `description` and `image`.
3. Add cover image to `/public/images/product-groups/`.
4. Update this file.

## Adding an industry/application

1. Add to `ApplicationName` union and `applications` array in `data/applications.ts`.
2. Add image to `/public/images/industries/`.
3. Add smoke test entry in `e2e/smoke.spec.ts` for the new `/industries/[slug]` route.
4. Update `docs/ROUTE_MAP.md`.
