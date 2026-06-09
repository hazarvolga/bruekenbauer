# Product Related Family Panel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a compact, mobile-friendly related product family panel below product detail heroes.

**Architecture:** Use the existing `products` dataset and localized product helper inside the product detail page. Compute up to three products from the same `group`, excluding the current product, then render a compact technical card grid below the hero.

**Tech Stack:** Next.js App Router, React Server Components, TypeScript, Tailwind CSS, `next/image`, existing localized product utilities.

---

### File Structure

- Modify: `app/[locale]/product/[slug]/page.tsx`
  - Keeps hero layout compact.
  - Computes related products from `products`.
  - Renders a related family panel when related products exist.

No new component file is required for first implementation because the panel is tightly scoped to the product detail page and uses only local page data.

### Task 1: Compute Related Products

**Files:**

- Modify: `app/[locale]/product/[slug]/page.tsx`

- [x] **Step 1: Add related product calculation after `labels`**

```tsx
const relatedProducts = products
  .filter((item) => item.group === productSource.group && item.slug !== productSource.slug)
  .slice(0, 3)
  .map((item) => getLocalizedProduct(item, normalizedLocale));
```

- [x] **Step 2: Run typecheck**

Run: `pnpm typecheck`

Expected: PASS. `relatedProducts` should infer localized `Product[]` without adding new types.

### Task 2: Render Related Family Panel

**Files:**

- Modify: `app/[locale]/product/[slug]/page.tsx`

- [x] **Step 1: Add panel after the hero `</section>`**

```tsx
{
  relatedProducts.length > 0 ? (
    <section className="px-margin-mobile pb-24 pt-10 md:px-margin-desktop lg:pl-[calc(theme(spacing.margin-desktop)+theme(spacing.20))]">
      <div className="border-y border-graphite-muted py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
              Related product family
            </span>
            <h2 className="text-headline-sm mt-3 font-mono uppercase text-on-surface">Explore adjacent components</h2>
          </div>
          <p className="max-w-xl font-mono text-data-sm uppercase leading-relaxed text-on-surface-variant">
            Continue through the same engineering category with products that share the current technical context.
          </p>
        </div>

        <div className="mt-8 grid gap-gutter md:grid-cols-3">
          {relatedProducts.map((relatedProduct) => (
            <Link
              key={relatedProduct.slug}
              href={localizePath(normalizedLocale, `/product/${relatedProduct.slug}`)}
              className="group border border-graphite-muted bg-surface-container-low/45 p-4 transition-colors hover:border-industrial-silver hover:bg-surface-container-low/70"
            >
              <div className="relative aspect-[4/3] overflow-hidden border border-graphite-muted bg-surface-container-lowest">
                <Image
                  src={relatedProduct.imageDark ?? relatedProduct.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="object-contain opacity-85 transition-opacity group-hover:opacity-100"
                />
              </div>
              <div className="mt-4 font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
                {relatedProduct.partNumber}
              </div>
              <h3 className="mt-2 font-mono text-technical-md uppercase text-industrial-silver">
                {relatedProduct.name}
              </h3>
              <p className="mt-3 font-mono text-data-sm uppercase leading-relaxed text-on-surface-variant">
                {relatedProduct.summary}
              </p>
              <span className="mt-5 inline-flex font-mono text-label-xs uppercase tracking-[0.16em] text-outline transition-colors group-hover:text-warning-red">
                View product -&gt;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  ) : null;
}
```

- [x] **Step 2: Run lint and typecheck**

Run:

```bash
pnpm lint
pnpm typecheck
```

Expected: both PASS.

### Task 3: Visual Verification

**Files:**

- Verify: `app/[locale]/product/[slug]/page.tsx`

- [x] **Step 1: Check desktop**

Open:

```text
http://localhost:3000/product/chip-ntc-thermistors
http://localhost:3000/product/pressure-sensors-transmitters
```

Expected:

- Hero image remains compact and fully visible.
- Hero copy is top aligned.
- Related panel appears below the hero.
- Cards do not create horizontal overflow.

- [x] **Step 2: Check mobile**

Use a mobile viewport around `390x844`.

Expected:

- Hero image stacks above copy.
- Related product cards stack in one column.
- Tap targets remain comfortable.
- No horizontal scrolling appears.

### Task 4: Commit

**Files:**

- Commit: `app/[locale]/product/[slug]/page.tsx`
- Commit: `docs/superpowers/plans/2026-06-09-product-related-family-panel.md`

- [x] **Step 1: Commit implementation**

```bash
git add 'app/[locale]/product/[slug]/page.tsx' docs/superpowers/plans/2026-06-09-product-related-family-panel.md
git commit -m "feat: add related product family panel"
```

Expected: commit succeeds with only product detail page and plan file staged.

### Self-Review

- Spec coverage: related products, same-group filtering, desktop grid, mobile stacked behavior, and validation are covered.
- Placeholder scan: no placeholder steps remain.
- Type consistency: all product fields exist on `Product`; route helpers already exist in the page.
