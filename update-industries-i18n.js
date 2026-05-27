const fs = require('fs');

const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const fr = JSON.parse(fs.readFileSync('messages/fr.json', 'utf8'));

const industriesEn = {
  "label": "Application sectors",
  "title": "Application Sectors",
  "section_label": "Our application sectors",
  "section_title": "Customized applications",
  "description": "Electronic components for every application - reliable, versatile, and individually developed. From idea to series production, we deliver the right components for every application. As a reliable distributor of high-quality electronic components, we offer more than an extensive portfolio. We understand the requirements of diverse industries and support our customers with suitable solutions - quickly, competently, and with maximum supply reliability.",
  "in_use_label": "Our solutions are used in"
};

const industriesDe = {
  "label": "Anwendungsbereiche",
  "title": "Anwendungsbereiche",
  "section_label": "Unsere Anwendungsbereiche",
  "section_title": "Maßgeschneiderte Anwendungen",
  "description": "Elektronische Komponenten für jede Anwendung - zuverlässig, vielseitig und individuell entwickelt. Von der Idee bis zur Serienproduktion liefern wir die passenden Komponenten für jede Anwendung. Als zuverlässiger Distributor für hochwertige elektronische Bauteile bieten wir mehr als nur ein umfangreiches Portfolio. Wir verstehen die Anforderungen unterschiedlichster Branchen und unterstützen unsere Kunden mit passenden Lösungen – schnell, kompetent und mit maximaler Versorgungssicherheit.",
  "in_use_label": "Unsere Lösungen kommen zum Einsatz in"
};

const industriesFr = {
  "label": "Secteurs d'application",
  "title": "Secteurs d'application",
  "section_label": "Nos secteurs d'application",
  "section_title": "Applications sur mesure",
  "description": "Des composants électroniques pour chaque application - fiables, polyvalents et développés individuellement. De l'idée à la production en série, nous fournissons les composants adaptés à chaque application. En tant que distributeur fiable de composants électroniques de haute qualité, nous offrons plus qu'un vaste portefeuille. Nous comprenons les exigences de diverses industries et soutenons nos clients avec des solutions adaptées - rapidement, avec compétence et avec une fiabilité d'approvisionnement maximale.",
  "in_use_label": "Nos solutions sont utilisées dans"
};

en.IndustriesPage = industriesEn;
de.IndustriesPage = industriesDe;
fr.IndustriesPage = industriesFr;

fs.writeFileSync('messages/en.json', JSON.stringify(en, null, 2));
fs.writeFileSync('messages/de.json', JSON.stringify(de, null, 2));
fs.writeFileSync('messages/fr.json', JSON.stringify(fr, null, 2));
