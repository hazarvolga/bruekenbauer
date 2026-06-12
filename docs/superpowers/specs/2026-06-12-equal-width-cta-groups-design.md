# Equal-Width CTA Groups Design

Date: 2026-06-12
Status: Approved visual direction

## Goal

Remove perceived imbalance from two- and three-action CTA groups by making every action in a group use the same full available width.

## Selected Direction

Option C: vertical, full-width CTA groups.

- Two- and three-action groups stack vertically at every viewport size.
- Every action fills the width of the CTA group container.
- Primary and secondary visual hierarchy remains controlled by button variant, not width.
- Groups keep a consistent `12px` gap between actions.
- Button labels remain centered and may wrap without changing group alignment.

## Scope

Apply the grouped CTA behavior to:

- Homepage: Explore Products / Initiate RFQ
- About: Contact / RFQ / Consultation
- Industries: Contact / RFQ
- Footer: Documents / Contact

Keep existing behavior for:

- Single CTA buttons
- Form submit and reset buttons
- Product Request Quote actions
- Header and mobile navigation controls
- Language, theme, carousel, chip, and filter controls

## Component Approach

Add a shared `TechnicalButtonGroup` layout component. It provides a vertical grid and applies full-width behavior to its direct action children. Continue using `TechnicalButton` for primary and ghost variants.

Convert the Industries CTA links to `TechnicalButton` so the same visual and accessibility contract is used across all prominent CTA groups. Footer actions retain their compact footer styling but share the same equal-width vertical layout rule.

## Responsive Behavior

- Mobile: full container width, vertical stack.
- Tablet: full container width, vertical stack.
- Desktop: vertical stack constrained by the CTA area's existing layout width.
- Parent sections keep their current content hierarchy and spacing.

## Verification

- Compare widths of every button in each affected group.
- Test English, German, and French labels for wrapping and equal dimensions.
- Verify desktop at `1440x900`, tablet at `768x1024`, and mobile at `390x844`.
- Confirm no horizontal overflow, clipped labels, layout shift, or console errors.
- Run `pnpm lint`, `pnpm typecheck`, and `pnpm build`.
