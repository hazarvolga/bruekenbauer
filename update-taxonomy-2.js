const fs = require('fs');

let file = fs.readFileSync('data/productTaxonomy.ts', 'utf8');

file = file.replace(/,\s+imageDark: "\/images\/products-premium\/dark\/[a-z0-9-]+\.png"/g, '');
file = file.replace(/;\s+imageDark\?: string/g, '');
file = file.replace(/imageDark\?: string;\s+/g, '');

fs.writeFileSync('data/productTaxonomy.ts', file);
