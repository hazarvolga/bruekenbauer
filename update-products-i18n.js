const fs = require('fs');

const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const fr = JSON.parse(fs.readFileSync('messages/fr.json', 'utf8'));

const productsEn = {
  "label": "Component Portfolio 2025",
  "title": "Product Groups",
  "description": "Upper-category archive from the component portfolio. Select a dossier group to inspect product-level parts, imagery, and technical metadata.",
  "items": "items"
};

const productsDe = {
  "label": "Komponentenportfolio 2025",
  "title": "Produktgruppen",
  "description": "Archiv der Hauptkategorien aus dem Komponentenportfolio. Wählen Sie eine Dossiergruppe, um Bauteile auf Produktebene, Bildmaterial und technische Metadaten zu prüfen.",
  "items": "Artikel"
};

const productsFr = {
  "label": "Portefeuille de composants 2025",
  "title": "Groupes de produits",
  "description": "Archives des catégories supérieures du portefeuille de composants. Sélectionnez un groupe de dossiers pour inspecter les pièces au niveau du produit, les images et les métadonnées techniques.",
  "items": "articles"
};

en.ProductsPage = productsEn;
de.ProductsPage = productsDe;
fr.ProductsPage = productsFr;

fs.writeFileSync('messages/en.json', JSON.stringify(en, null, 2));
fs.writeFileSync('messages/de.json', JSON.stringify(de, null, 2));
fs.writeFileSync('messages/fr.json', JSON.stringify(fr, null, 2));
