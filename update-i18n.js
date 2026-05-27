const fs = require('fs');

const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const fr = JSON.parse(fs.readFileSync('messages/fr.json', 'utf8'));

const aboutEn = {
  "label": "Swiss engineering precision",
  "title_1": "We don't just",
  "title_2": "advise",
  "description": "At brückenbauer GmbH, we build bridges - between disciplines, sectors and borders.\nBased in Switzerland since 2022, we combine extensive experience at the intersection of politics, administration, business, and innovation. Thanks to a broad network, we connect local expertise with a global perspective and support our clients in mastering complex challenges and unlocking new potential.\nWe connect, design and empower.",
  "services": {
    "label": "Services",
    "title": "Strategic and operational support",
    "and_more": "And more...",
    "active": "Active",
    "srv_01_title": "Strategic and operational support",
    "srv_01_copy": "We support or manage projects that are geared towards achieving clear goals, and we provide our clients with sound advice.",
    "srv_02_title": "Cooperation and negotiations",
    "srv_02_copy": "We facilitate cooperation with authorities, business partners or other relevant bodies and efficiently bring together complex interests.",
    "srv_03_title": "Business development",
    "srv_03_copy": "We identify growth opportunities, develop business models and support our clients in fully realizing their potential.",
    "srv_04_title": "Strengthening the team",
    "srv_04_copy": "In the short term and for a defined period, we supplement our customers' teams with our know-how to bridge resource gaps or to successfully complete projects."
  },
  "sequence": {
    "label": "Operating sequence",
    "title": "From need definition to long-term support",
    "phase": "Phase",
    "step_1_title": "Understanding your needs",
    "step_1_copy": "We support you in defining your needs and help you finding means and ways to implement your strategy and achieve your goals.",
    "step_2_title": "Action plan",
    "step_2_copy": "We will create a detailed roadmap that includes all phases of the project and the measures to be implemented.",
    "step_3_title": "Delivery and support",
    "step_3_copy": "We provide the necessary support and all related elements. We also advise you on your long-term strategy."
  }
};

const aboutDe = {
  "label": "Swiss engineering precision",
  "title_1": "Wir beraten nicht",
  "title_2": "nur",
  "description": "Wir bei der brückenbauer GmbH bauen Brücken - zwischen Disziplinen, Sektoren und Grenzen.\nSeit 2022 in der Schweiz ansässig, vereinen wir umfangreiche Erfahrung an der Schnittstelle von Politik, Verwaltung, Wirtschaft und Innovation. Dank eines breiten Netzwerks verbinden wir lokale Expertise mit einer globalen Perspektive und unterstützen unsere Kunden dabei, komplexe Herausforderungen zu meistern und neues Potenzial freizusetzen.\nWir verbinden, gestalten und befähigen.",
  "services": {
    "label": "Dienstleistungen",
    "title": "Strategische und operative Unterstützung",
    "and_more": "Und mehr...",
    "active": "Aktiv",
    "srv_01_title": "Strategische und operative Unterstützung",
    "srv_01_copy": "Wir unterstützen oder leiten zielgerichtete Projekte und beraten unsere Kunden fundiert.",
    "srv_02_title": "Kooperation und Verhandlungen",
    "srv_02_copy": "Wir erleichtern die Zusammenarbeit mit Behörden, Geschäftspartnern oder anderen relevanten Stellen und bringen komplexe Interessen effizient zusammen.",
    "srv_03_title": "Business Development",
    "srv_03_copy": "Wir identifizieren Wachstumschancen, entwickeln Geschäftsmodelle und unterstützen unsere Kunden dabei, ihr volles Potenzial auszuschöpfen.",
    "srv_04_title": "Teamverstärkung",
    "srv_04_copy": "Kurzfristig und für einen definierten Zeitraum ergänzen wir die Teams unserer Kunden mit unserem Know-how, um Ressourcenengpässe zu überbrücken oder Projekte erfolgreich abzuschließen."
  },
  "sequence": {
    "label": "Ablauf",
    "title": "Von der Bedarfsermittlung bis zur langfristigen Unterstützung",
    "phase": "Phase",
    "step_1_title": "Bedürfnisse verstehen",
    "step_1_copy": "Wir unterstützen Sie bei der Definition Ihrer Bedürfnisse und helfen Ihnen dabei, Mittel und Wege zu finden, Ihre Strategie umzusetzen und Ihre Ziele zu erreichen.",
    "step_2_title": "Aktionsplan",
    "step_2_copy": "Wir erstellen eine detaillierte Roadmap, die alle Phasen des Projekts und die umzusetzenden Maßnahmen umfasst.",
    "step_3_title": "Lieferung und Support",
    "step_3_copy": "Wir bieten die notwendige Unterstützung und alle damit verbundenen Elemente. Wir beraten Sie auch bei Ihrer langfristigen Strategie."
  }
};

const aboutFr = {
  "label": "Swiss engineering precision",
  "title_1": "Nous ne faisons",
  "title_2": "pas que conseiller",
  "description": "Chez brückenbauer GmbH, nous construisons des ponts - entre les disciplines, les secteurs et les frontières.\nBasés en Suisse depuis 2022, nous combinons une vaste expérience à l'intersection de la politique, de l'administration, des affaires et de l'innovation. Grâce à un vaste réseau, nous relions l'expertise locale à une perspective mondiale et aidons nos clients à maîtriser des défis complexes et à libérer de nouveaux potentiels.\nNous connectons, concevons et autonomisons.",
  "services": {
    "label": "Services",
    "title": "Soutien stratégique et opérationnel",
    "and_more": "Et plus...",
    "active": "Actif",
    "srv_01_title": "Soutien stratégique et opérationnel",
    "srv_01_copy": "Nous soutenons ou gérons des projets visant à atteindre des objectifs clairs et nous fournissons à nos clients des conseils judicieux.",
    "srv_02_title": "Coopération et négociations",
    "srv_02_copy": "Nous facilitons la coopération avec les autorités, les partenaires commerciaux ou d'autres organes pertinents et réunissons efficacement des intérêts complexes.",
    "srv_03_title": "Développement des affaires",
    "srv_03_copy": "Nous identifions les opportunités de croissance, développons des modèles commerciaux et aidons nos clients à réaliser pleinement leur potentiel.",
    "srv_04_title": "Renforcement de l'équipe",
    "srv_04_copy": "À court terme et pour une période définie, nous complétons les équipes de nos clients avec notre savoir-faire pour combler les manques de ressources ou pour mener à bien des projets."
  },
  "sequence": {
    "label": "Séquence opérationnelle",
    "title": "De la définition des besoins au soutien à long terme",
    "phase": "Phase",
    "step_1_title": "Comprendre vos besoins",
    "step_1_copy": "Nous vous aidons à définir vos besoins et vous aidons à trouver des moyens de mettre en œuvre votre stratégie et d'atteindre vos objectifs.",
    "step_2_title": "Plan d'action",
    "step_2_copy": "Nous créerons une feuille de route détaillée qui comprendra toutes les phases du projet et les mesures à mettre en œuvre.",
    "step_3_title": "Livraison et soutien",
    "step_3_copy": "Nous fournissons le soutien nécessaire et tous les éléments connexes. Nous vous conseillons également sur votre stratégie à long terme."
  }
};

en.AboutPage = aboutEn;
de.AboutPage = aboutDe;
fr.AboutPage = aboutFr;

fs.writeFileSync('messages/en.json', JSON.stringify(en, null, 2));
fs.writeFileSync('messages/de.json', JSON.stringify(de, null, 2));
fs.writeFileSync('messages/fr.json', JSON.stringify(fr, null, 2));
