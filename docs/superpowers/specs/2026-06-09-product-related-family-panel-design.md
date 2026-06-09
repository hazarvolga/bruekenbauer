# Product Related Family Panel Design

## Context

Product detail pages were made more compact by removing the forced viewport-height hero and showing product imagery in a square, contained frame. This improved the hero but leaves a visually empty area below the first fold on desktop.

The empty area should become a useful next-step panel that helps visitors continue browsing adjacent products in the same product group.

## Recommended Design

Add a compact related-products panel below the product hero.

The panel should show products from the same `group` as the current product, excluding the current product. It should use existing product data from `data/products.ts`, localized through `getLocalizedProduct`, so it stays consistent across EN, DE, and FR without adding a new data model.

## UX Behavior

Desktop:

- Place the panel directly under the hero section.
- Use a restrained technical label such as `RELATED PRODUCT FAMILY`.
- Show up to 3 related products in a dense grid.
- Each card should include a small product image, part number, product name, short summary, and a `VIEW PRODUCT ->` style link.
- Keep the panel lower priority than the RFQ CTA.

Mobile:

- Stack cards in one column.
- Use compact images and generous tap targets.
- Avoid horizontal scroll because it is less accessible and easier to miss.

## Visual Direction

Use the existing industrial dossier language:

- graphite/dark surface background
- thin borders
- mono typography
- red hover accents
- no nested decorative cards beyond the repeated product cards

The panel should feel like a technical archive continuation, not a marketing block.

## Data Rules

- Related products are selected by `product.group`.
- Exclude the active product by `slug`.
- Limit the visible list to 3 products for first implementation.
- If a group has no related products, hide the panel.

## Validation

- Run `pnpm lint`.
- Run `pnpm typecheck`.
- Verify `/product/chip-ntc-thermistors` and `/product/pressure-sensors-transmitters` in the browser on desktop.
- Check mobile width to confirm cards stack cleanly and no horizontal overflow appears.
