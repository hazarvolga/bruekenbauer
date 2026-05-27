const fs = require('fs');

const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const fr = JSON.parse(fs.readFileSync('messages/fr.json', 'utf8'));

const contactEn = {
  "label": "Supplier Inquiry",
  "title": "Engineering Contact"
};

const contactDe = {
  "label": "Lieferantenanfrage",
  "title": "Engineering Kontakt"
};

const contactFr = {
  "label": "Demande de fournisseur",
  "title": "Contact Ingénierie"
};

en.ContactPage = contactEn;
de.ContactPage = contactDe;
fr.ContactPage = contactFr;

fs.writeFileSync('messages/en.json', JSON.stringify(en, null, 2));
fs.writeFileSync('messages/de.json', JSON.stringify(de, null, 2));
fs.writeFileSync('messages/fr.json', JSON.stringify(fr, null, 2));
