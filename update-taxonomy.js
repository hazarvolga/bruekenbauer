const fs = require('fs');

const file = fs.readFileSync('data/productTaxonomy.ts', 'utf8');

const updated = file.replace(
  /"\/images\/product-groups\/([a-z0-9-]+)\.png"/g,
  '"/images/product-groups-premium/dark/$1.webp"'
);

fs.writeFileSync('data/productTaxonomy.ts', updated);
