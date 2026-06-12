# Equal-Width CTA Groups Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every two- and three-action CTA group a vertical, full-width stack while preserving button variant hierarchy and all single-action behavior.

**Architecture:** Add a focused `TechnicalButtonGroup` layout component that owns vertical spacing and full-width child behavior. Replace only the four approved grouped CTA surfaces, reusing `TechnicalButton` for prominent actions and retaining compact footer styling inside the shared group layout.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, next-intl, Browser plugin.

---

### Task 1: Add the shared CTA group layout

**Files:**
- Create: `components/layout/TechnicalButtonGroup.tsx`
- Modify: `components/layout/TechnicalButton.tsx`

- [ ] **Step 1: Confirm the current component contract**

Run:

```bash
rg -n "TechnicalButton|flex flex-wrap gap-[34]" app components --glob '*.tsx'
```

Expected: grouped uses are visible on the homepage, About page, Industries page, and Footer; single-button form and product uses are also visible but remain out of scope.

- [ ] **Step 2: Add the shared group component**

Create `components/layout/TechnicalButtonGroup.tsx`:

```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function TechnicalButtonGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid w-full gap-3 [&>*]:w-full", className)}>
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Allow button labels to wrap safely**

Update the `base` class in `components/layout/TechnicalButton.tsx`:

```tsx
const base =
  "inline-flex min-h-11 items-center justify-center gap-3 whitespace-normal border px-6 py-3 text-center font-mono text-label-xs uppercase tracking-[0.16em] transition-colors active:scale-[0.98]";
```

Expected: standalone buttons keep intrinsic width, while buttons inside `TechnicalButtonGroup` inherit full width from the group selector.

- [ ] **Step 4: Run static verification**

Run:

```bash
pnpm lint
pnpm typecheck
```

Expected: both commands exit successfully.

- [ ] **Step 5: Commit the shared component**

```bash
git add components/layout/TechnicalButton.tsx components/layout/TechnicalButtonGroup.tsx
git commit -m "feat: add equal-width CTA group layout"
```

### Task 2: Convert the approved CTA groups

**Files:**
- Modify: `app/[locale]/page.tsx`
- Modify: `app/[locale]/about/page.tsx`
- Modify: `app/[locale]/industries/page.tsx`
- Modify: `components/layout/Footer.tsx`

- [ ] **Step 1: Convert the homepage group**

Import `TechnicalButtonGroup` and replace the homepage wrapper:

```tsx
<TechnicalButtonGroup className="mt-10 max-w-xl">
  <TechnicalButton href="/products">{t("cta.explore_products")}</TechnicalButton>
  <TechnicalButton href="/rfq" variant="ghost">
    {t("cta.initiate_rfq")}
  </TechnicalButton>
</TechnicalButtonGroup>
```

- [ ] **Step 2: Convert the About three-action group**

Import `TechnicalButtonGroup` and replace the existing flex wrapper:

```tsx
<TechnicalButtonGroup className="md:w-72">
  <TechnicalButton href="/contact">{t("cta.contact")}</TechnicalButton>
  <TechnicalButton href="/rfq" variant="ghost">
    {t("cta.rfq")}
  </TechnicalButton>
  <TechnicalButton href="/contact" variant="ghost">
    {t("cta.consultation")}
  </TechnicalButton>
</TechnicalButtonGroup>
```

Expected: the copy column keeps available space and the CTA column uses a stable desktop width.

- [ ] **Step 3: Convert the Industries two-action group**

Import `TechnicalButton` and `TechnicalButtonGroup`, then replace the two manual links:

```tsx
<TechnicalButtonGroup className="lg:w-64">
  <TechnicalButton href={localizePath(locale, "/contact")}>
    {t("cta_contact")}
  </TechnicalButton>
  <TechnicalButton href={localizePath(locale, "/rfq")} variant="ghost">
    {t("cta_rfq")}
  </TechnicalButton>
</TechnicalButtonGroup>
```

- [ ] **Step 4: Convert the Footer group**

Import `TechnicalButtonGroup` and wrap the existing Documents and Contact links:

```tsx
<TechnicalButtonGroup className="sm:w-48">
  <Link
    href={localizePath(normalizedLocale, "/documents")}
    className="inline-flex min-h-11 w-full items-center justify-center border border-graphite-muted px-3 py-2 text-center text-on-surface-variant transition-colors hover:border-warning-red hover:text-warning-red"
  >
    {copy.documents}
  </Link>
  <Link
    href={localizePath(normalizedLocale, "/contact")}
    className="inline-flex min-h-11 w-full items-center justify-center border border-graphite-muted px-3 py-2 text-center text-on-surface-variant transition-colors hover:border-warning-red hover:text-warning-red"
  >
    {copy.contactLink}
  </Link>
</TechnicalButtonGroup>
```

- [ ] **Step 5: Confirm no approved group still uses a wrapping row**

Run:

```bash
rg -n -C 3 "TechnicalButton" 'app/[locale]/page.tsx' 'app/[locale]/about/page.tsx' 'app/[locale]/industries/page.tsx' components/layout/Footer.tsx
```

Expected: all four approved surfaces use `TechnicalButtonGroup`; unrelated single CTA uses remain unchanged.

- [ ] **Step 6: Run static verification**

Run:

```bash
pnpm lint
pnpm typecheck
git diff --check
```

Expected: all commands exit successfully.

- [ ] **Step 7: Commit the surface conversions**

```bash
git add 'app/[locale]/page.tsx' 'app/[locale]/about/page.tsx' 'app/[locale]/industries/page.tsx' components/layout/Footer.tsx
git commit -m "fix: equalize grouped CTA widths"
```

### Task 3: Validate responsive and localized behavior

**Files:**
- Modify only if QA exposes a defect in the files from Tasks 1-2.

- [ ] **Step 1: Start the local application**

Run:

```bash
pnpm exec next dev --port 3013
```

Expected: Next.js reports ready at `http://localhost:3013`.

- [ ] **Step 2: Verify the desktop layouts**

Use Browser with viewport `1440x900` and inspect:

```text
/
/about
/industries
```

For each CTA group, evaluate the direct action bounding boxes and verify:

```text
all widths in the group are equal
all actions are vertically stacked
labels are centered and unclipped
documentElement.scrollWidth equals documentElement.clientWidth
```

- [ ] **Step 3: Verify tablet and mobile layouts**

Repeat the same routes at:

```text
768x1024
390x844
```

Expected: CTA groups remain vertical and full width, with no horizontal overflow or label clipping.

- [ ] **Step 4: Verify German and French labels**

Inspect:

```text
/de
/de/about
/de/industries
/fr
/fr/about
/fr/industries
```

Expected: long translated labels wrap within equal-width buttons without changing group alignment.

- [ ] **Step 5: Verify interaction and console health**

Click one CTA on the homepage and confirm navigation to its expected route. Read Browser console logs with `error` and `warn` levels.

Expected: navigation succeeds and there are no relevant runtime errors or framework overlays.

- [ ] **Step 6: Run production verification**

Run:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Expected: all commands exit successfully and the production build completes.

- [ ] **Step 7: Commit any QA-only correction**

If QA required a correction:

```bash
git add components/layout/TechnicalButton.tsx components/layout/TechnicalButtonGroup.tsx 'app/[locale]/page.tsx' 'app/[locale]/about/page.tsx' 'app/[locale]/industries/page.tsx' components/layout/Footer.tsx
git commit -m "fix: polish responsive CTA groups"
```

If no correction was required, do not create an empty commit.
