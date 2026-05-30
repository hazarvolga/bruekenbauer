import type { ApplicationName } from "./applications";
import type { PowerManagementFamily } from "./powerManagement";
import type { Product } from "./products";
import type { ProductGroup } from "./productTaxonomy";

export type SupportedLocale = "en" | "de" | "fr";

export function normalizeLocale(locale?: string): SupportedLocale {
  return locale === "de" || locale === "fr" ? locale : "en";
}

export function localizePath(locale: string, path: string) {
  const normalized = normalizeLocale(locale);
  return normalized === "en" ? path : `/${normalized}${path}`;
}

type ApplicationCopy = {
  name: string;
  summary: string;
  detail: {
    intro: string;
    applications: string[];
    strengthsTitle: string;
    strengths: string[];
  };
};

type ProductGroupCopy = {
  title: string;
  shortDescription: string;
  description: string;
};

type PowerFamilyCopy = {
  label: string;
  summary: string;
  variants?: string[];
  performance?: {
    parameter?: string;
    specification?: string;
  }[];
  sellingPoints?: string[];
  targetApplications?: string[];
};

export const uiCopy = {
  en: {
    industry: {
      applicationSector: "Application sector",
      applicationFields: "Application fields",
      activeSystems: "Active systems",
      supportedPortfolio: "Supported portfolio",
      supportNote:
        "This sector is supported through related sensing, conversion, and power-management portfolio coverage.",
      openDetail: "Open detail dossier",
    },
    product: {
      technicalArchive: "Technical archive",
      requestQuote: "Request Quote",
    },
    power: {
      moduleVariants: "Module variants",
      powerManagement: "Power Management",
      requestQuote: "Request Quote",
      back: "Back to Power Stack",
      keyParameters: "Key performance parameters",
      operatingWindow: "Verified operating window",
      parameter: "Parameter",
      specification: "Specification",
      testStandard: "Test Standard",
      sellingPoints: "Key selling points",
      targetApplications: "Target applications",
    },
  },
  de: {
    industry: {
      applicationSector: "Anwendungsbereich",
      applicationFields: "Anwendungsfelder",
      activeSystems: "Aktive Systeme",
      supportedPortfolio: "Unterstütztes Portfolio",
      supportNote:
        "Dieser Sektor wird über verwandte Sensorik-, Umwandlungs- und Power-Management-Portfolios abgedeckt.",
      openDetail: "Detaildossier öffnen",
    },
    product: {
      technicalArchive: "Technisches Archiv",
      requestQuote: "Anfrage senden",
    },
    power: {
      moduleVariants: "Modulvarianten",
      powerManagement: "Power Management",
      requestQuote: "Anfrage senden",
      back: "Zur Power-Übersicht",
      keyParameters: "Leistungsparameter",
      operatingWindow: "Verifiziertes Betriebsfenster",
      parameter: "Parameter",
      specification: "Spezifikation",
      testStandard: "Prüfstandard",
      sellingPoints: "Zentrale Vorteile",
      targetApplications: "Zielanwendungen",
    },
  },
  fr: {
    industry: {
      applicationSector: "Secteur d'application",
      applicationFields: "Domaines d'application",
      activeSystems: "Systèmes actifs",
      supportedPortfolio: "Portefeuille associé",
      supportNote:
        "Ce secteur est couvert par des portefeuilles associés en détection, conversion et gestion de l'énergie.",
      openDetail: "Ouvrir le dossier détaillé",
    },
    product: {
      technicalArchive: "Archive technique",
      requestQuote: "Demander un devis",
    },
    power: {
      moduleVariants: "Variantes de module",
      powerManagement: "Gestion de l'énergie",
      requestQuote: "Demander un devis",
      back: "Retour au portefeuille power",
      keyParameters: "Paramètres de performance clés",
      operatingWindow: "Fenêtre de fonctionnement vérifiée",
      parameter: "Paramètre",
      specification: "Spécification",
      testStandard: "Norme d'essai",
      sellingPoints: "Arguments clés",
      targetApplications: "Applications cibles",
    },
  },
} as const;

export const productGroupCopies: Record<SupportedLocale, Record<ProductGroup, ProductGroupCopy>> = {
  en: {
    "Temperature Sensors": {
      title: "Temperature Sensors",
      shortDescription:
        "NTC, thermistor, thermocouple, and custom high-temperature sensing assemblies.",
      description:
        "Engineered for extreme precision and harsh environments, our temperature sensing assemblies guarantee reliable thermal management. The portfolio includes high-performance NTCs, thermistors, and thermocouples designed for industrial automation and automotive applications.",
    },
    "Pressure & Flow Sensors": {
      title: "Pressure & Flow Sensors",
      shortDescription:
        "Pressure transmitters, ultrasonic flow meters, gas sensors, gauges, and level telemetry.",
      description:
        "Delivering uncompromising accuracy in fluid and gas measurement, our pressure and flow sensors ensure optimal system control. Featuring advanced pressure transmitters, ultrasonic flow meters, and robust telemetry solutions for critical infrastructure.",
    },
    "Current & Position Sensors": {
      title: "Current & Position Sensors",
      shortDescription:
        "Clamp-on current sensing and rotary, encoder, and potentiometer position platforms.",
      description:
        "Enable precise motion control and energy monitoring with our industrial-grade sensing platforms. We offer high-accuracy clamp-on current sensors, rotary encoders, and potentiometers tailored for demanding mechanical systems.",
    },
    "Electromagnetic Compatibility (EMC)": {
      title: "Electromagnetic Compatibility (EMC)",
      shortDescription:
        "Chokes, filters, inductors, and transformers for controlled electromagnetic behavior.",
      description:
        "Safeguard your electronic infrastructure against interference with our premium EMC solutions. Our comprehensive range of chokes, filters, and inductors ensures stable electromagnetic behavior and strict compliance with global standards.",
    },
    "Power Management": {
      title: "Power Management",
      shortDescription:
        "IGBT, SiC, MOSFET, converter, and power supply components for engineered systems.",
      description:
        "Maximize efficiency and operational safety with our advanced power management components. From robust IGBT and SiC modules to reliable MOSFETs and power supplies, we empower high-load industrial systems and renewable energy applications.",
    },
    Passives: {
      title: "Passives",
      shortDescription: "Resistors, capacitors, MLCC packages, and quartz timing components.",
      description:
        "The foundation of stable circuitry, our passive components offer unmatched reliability under continuous stress. Discover our extensive selection of resistors, MLCC capacitors, and precision quartz timing components for high-end electronics.",
    },
    Electromechanics: {
      title: "Electromechanics",
      shortDescription:
        "Connectors, cables, ventilation, card readers, sockets, and wireless interface hardware.",
      description:
        "Bridging electrical control with robust mechanical execution, our electromechanical components are built for longevity. We supply durable connectors, ventilation hardware, and custom interface solutions that keep complex systems running seamlessly.",
    },
    Acoustics: {
      title: "Acoustics",
      shortDescription:
        "Buzzers, microphones, receivers, speakers, piezos, and magnetic acoustic transducers.",
      description:
        "Ensure clear auditory signaling and feedback with our high-fidelity acoustic components. Our specialized buzzers, microphones, and magnetic transducers deliver superior sound performance for medical, industrial, and consumer applications.",
    },
  },
  de: {
    "Temperature Sensors": {
      title: "Temperatursensoren",
      shortDescription:
        "NTC, Thermistoren, Thermoelemente und kundenspezifische Hochtemperatur-Sensorbaugruppen.",
      description:
        "Unsere Temperatur-Sensorbaugruppen sind auf extreme Präzision und anspruchsvolle Umgebungen ausgelegt. Das Portfolio umfasst leistungsfähige NTCs, Thermistoren und Thermoelemente für Industrieautomation, Automotive und robuste Elektroniksysteme.",
    },
    "Pressure & Flow Sensors": {
      title: "Druck- & Durchflusssensoren",
      shortDescription:
        "Drucktransmitter, Ultraschall-Durchflussmesser, Gassensoren, Messaufnehmer und Füllstands-Telemetrie.",
      description:
        "Unsere Druck- und Durchflusssensoren ermöglichen präzise Messung von Flüssigkeiten und Gasen. Das Portfolio deckt Drucktransmitter, Ultraschall-Durchflussmesser und robuste Telemetrie-Lösungen für kritische Anlagen ab.",
    },
    "Current & Position Sensors": {
      title: "Strom- & Positionssensoren",
      shortDescription:
        "Clamp-on-Stromsensorik sowie rotative, Encoder- und Potentiometer-Positionsplattformen.",
      description:
        "Für präzise Bewegungssteuerung und Energiemonitoring liefern wir industrietaugliche Sensorplattformen, darunter Clamp-on-Stromsensoren, Rotary Encoder und Potentiometer für anspruchsvolle mechanische Systeme.",
    },
    "Electromagnetic Compatibility (EMC)": {
      title: "Elektromagnetische Verträglichkeit (EMV)",
      shortDescription:
        "Drosseln, Filter, Induktivitäten und Transformatoren für kontrolliertes EMV-Verhalten.",
      description:
        "Unsere EMV-Komponenten schützen elektronische Infrastruktur vor Störungen. Drosseln, Filter und Induktivitäten sorgen für stabiles elektromagnetisches Verhalten und unterstützen die Einhaltung relevanter Normen.",
    },
    "Power Management": {
      title: "Power Management",
      shortDescription:
        "IGBT, SiC, MOSFET, Converter und Power-Supply-Komponenten für technische Systeme.",
      description:
        "Unsere Power-Management-Komponenten unterstützen effiziente und sichere Energieumwandlung. Von IGBT- und SiC-Modulen bis zu MOSFETs, Convertern und Power Supplies stärken sie industrielle Hochlastsysteme.",
    },
    Passives: {
      title: "Passive Bauelemente",
      shortDescription: "Widerstände, Kondensatoren, MLCC-Pakete und Quarz-Timing-Komponenten.",
      description:
        "Passive Bauelemente bilden die Grundlage stabiler Schaltungen. Unser Portfolio umfasst Widerstände, MLCC-Kondensatoren und präzise Quarz-Timing-Komponenten für hochwertige Elektronik.",
    },
    Electromechanics: {
      title: "Elektromechanik",
      shortDescription:
        "Steckverbinder, Kabel, Lüftung, Kartenleser, Sockets und drahtlose Schnittstellenhardware.",
      description:
        "Elektromechanische Komponenten verbinden elektrische Steuerung mit robuster Mechanik. Wir liefern langlebige Steckverbinder, Kabel, Lüftungshardware und Schnittstellenlösungen für komplexe Systeme.",
    },
    Acoustics: {
      title: "Akustik",
      shortDescription:
        "Buzzer, Mikrofone, Receiver, Lautsprecher, Piezos und magnetische Akustikwandler.",
      description:
        "Unsere Akustikkomponenten liefern klare Signale und zuverlässiges Feedback für industrielle, medizinische und Consumer-Anwendungen, von Buzzern und Mikrofonen bis zu magnetischen Transducern.",
    },
  },
  fr: {
    "Temperature Sensors": {
      title: "Capteurs de température",
      shortDescription:
        "Assemblages NTC, thermistances, thermocouples et capteurs haute température sur mesure.",
      description:
        "Nos assemblages de capteurs de température sont conçus pour une précision élevée et des environnements exigeants. Le portefeuille comprend des NTC, thermistances et thermocouples pour l'automatisation industrielle, l'automotive et les systèmes électroniques robustes.",
    },
    "Pressure & Flow Sensors": {
      title: "Capteurs de pression et de débit",
      shortDescription:
        "Transmetteurs de pression, débitmètres à ultrasons, capteurs de gaz, jauges et télémétrie de niveau.",
      description:
        "Nos capteurs de pression et de débit assurent une mesure précise des liquides et des gaz. Le portefeuille couvre les transmetteurs de pression, les débitmètres à ultrasons et les solutions de télémétrie pour infrastructures critiques.",
    },
    "Current & Position Sensors": {
      title: "Capteurs de courant et de position",
      shortDescription:
        "Capteurs de courant clamp-on et plateformes de position rotatives, encoder et potentiomètre.",
      description:
        "Pour le contrôle du mouvement et la surveillance de l'énergie, nous fournissons des plateformes de détection industrielles, notamment des capteurs de courant clamp-on, des rotary encoders et des potentiomètres.",
    },
    "Electromagnetic Compatibility (EMC)": {
      title: "Compatibilité électromagnétique (CEM)",
      shortDescription:
        "Selfs, filtres, inductances et transformateurs pour un comportement électromagnétique contrôlé.",
      description:
        "Nos composants CEM protègent l'infrastructure électronique contre les interférences. Les selfs, filtres et inductances assurent un comportement électromagnétique stable et soutiennent la conformité normative.",
    },
    "Power Management": {
      title: "Gestion de l'énergie",
      shortDescription:
        "Composants IGBT, SiC, MOSFET, converters et power supplies pour systèmes techniques.",
      description:
        "Nos composants de gestion de l'énergie soutiennent une conversion efficace et sûre. Des modules IGBT et SiC aux MOSFETs, converters et power supplies, ils renforcent les systèmes industriels à forte charge.",
    },
    Passives: {
      title: "Composants passifs",
      shortDescription: "Résistances, condensateurs, packages MLCC et composants quartz de timing.",
      description:
        "Les composants passifs constituent la base de circuits stables. Notre portefeuille couvre les résistances, condensateurs MLCC et composants quartz de précision pour électronique haut de gamme.",
    },
    Electromechanics: {
      title: "Électromécanique",
      shortDescription:
        "Connecteurs, câbles, ventilation, lecteurs de cartes, sockets et interfaces wireless.",
      description:
        "Les composants électromécaniques relient le contrôle électrique à une exécution mécanique robuste. Nous fournissons connecteurs, câbles, ventilation et interfaces pour systèmes complexes.",
    },
    Acoustics: {
      title: "Acoustique",
      shortDescription:
        "Buzzers, microphones, receivers, haut-parleurs, piezos et transducteurs acoustiques magnétiques.",
      description:
        "Nos composants acoustiques assurent signalisation claire et retour fiable pour applications industrielles, médicales et grand public, des buzzers et microphones aux transducteurs magnétiques.",
    },
  },
};

export const applicationCopies: Record<
  SupportedLocale,
  Record<ApplicationName, ApplicationCopy>
> = {
  en: {} as Record<ApplicationName, ApplicationCopy>,
  de: {
    "AEROSPACE & AVIATION": {
      name: "Luftfahrt & Raumfahrt",
      summary:
        "Belastbare Komponentenversorgung für Avionik, orbitale Subsysteme und EMI-sensitive Verteidigungsbaugruppen.",
      detail: {
        intro:
          "In der Luft- und Raumfahrt sowie in der zivilen Luftfahrt gelten besonders hohe Anforderungen an Qualität, Sicherheit und Rückverfolgbarkeit. Als spezialisierter Distributor liefern wir geprüfte, qualifizierte und langfristig verfügbare Elektronikkomponenten für extreme Umgebungen.",
        applications: [
          "Avionik und Flugzeugsysteme",
          "Raumfahrttechnik",
          "Zivile und militärische Luftfahrtsysteme",
          "Bodenstationen und Überwachungssysteme",
        ],
        strengthsTitle: "Unsere Stärken für Ihre Mission",
        strengths: [
          "Komponenten mit luftfahrtspezifischen Zulassungen, einschließlich MIL-STD und AS9100",
          "Rückverfolgbare, chargenspezifische Lieferung mit CoC, CoO und Testprotokollen auf Anfrage",
          "Qualifizierte Hersteller und High-Reliability-Komponenten",
          "Langzeitverfügbarkeit und Obsoleszenzmanagement",
          "Verlässliche Supply Chain für Serienfertigung und Sonderbeschaffung",
        ],
      },
    },
    "Automotive & Transportation": {
      name: "Fahrzeugtechnik & Transport",
      summary:
        "Qualifizierte Komponentenversorgung für Fahrzeugplattformen, Ladesysteme, Mobilitätselektronik und Verkehrsinfrastruktur.",
      detail: {
        intro:
          "Die Automobilindustrie wird durch Elektrifizierung, autonomes Fahren, Konnektivität und Effizienz geprägt. Wir liefern geprüfte, AEC-Q-zertifizierte Komponenten für OEMs, Tier-1-Zulieferer und Automotive-Systementwickler.",
        applications: [
          "Karosserieelektronik und Komfortsysteme",
          "Sicherheits- und Fahrerassistenzsysteme (ADAS)",
          "Batteriemanagement und Ladeelektronik",
          "Infotainment und Connectivity",
        ],
        strengthsTitle: "Ihre Vorteile mit uns als Automotive-Partner",
        strengths: [
          "AEC-Q100- und AEC-Q200-zertifizierte Komponenten führender Hersteller",
          "Technische Beratung",
          "Zuverlässige Lieferlogistik für Großserien",
          "Langzeitverfügbarkeit und Obsoleszenzmanagement",
          "Support bei Design-In, Musterbeschaffung und Serienfreigabe",
        ],
      },
    },
    "INDUSTRIAL AUTOMATION": {
      name: "Industrielle Automatisierung",
      summary:
        "Präzise Steuerungs-, Sensorik- und Leistungskomponenten für zukunftsfähige industrielle Umgebungen und intelligente Systeme.",
      detail: {
        intro:
          "Moderne Industrieanlagen und automatisierte Systeme sind vernetzt, hocheffizient und datengetrieben. Ob Sensorik, Steuerungstechnik, Antriebssysteme oder industrielle Kommunikation – wir liefern robuste, langfristig verfügbare und qualitätsgeprüfte Elektronikkomponenten für die Fabrik- und Gebäudeautomation der Zukunft.",
        applications: [
          "Automatisierungs- und Steuerungstechnik",
          "Antriebstechnik und Motorsteuerung",
          "Industriekommunikation und IoT",
          "Sensing- und Messtechnik",
          "Heizungs-, Lüftungs- und Klimatechnik (HVAC) Integration",
          "Zentrale Gebäudeleittechnik (BMS) und Smart Metering",
        ],
        strengthsTitle: "Ihre Vorteile mit uns",
        strengths: [
          "Industrieerprobte Komponenten führender Hersteller",
          "Technische Beratung bei Auswahl und Design-In",
          "Langzeitverfügbarkeit und Obsoleszenzmanagement",
          "Zuverlässige Lieferlogistik für Serienfertigung",
          "Komponenten nach Industrie- und Sicherheitsstandards wie IEC, UL und ISO 13849",
        ],
      },
    },
    "Solar PV & BESS": {
      name: "Solar-PV & BESS",
      summary:
        "Leistungselektronik, Wandlungs- und Sensorikkomponenten für hocheffiziente Photovoltaik- und Energiespeichersysteme.",
      detail: {
        intro:
          "Die globale Energiewende und der Ausbau nachhaltiger Mobilität erfordern absolut verlässliche Leistungselektronik. Ob Solaranlagen, Energiespeichersysteme (BESS), modernste Batteriemanagementsysteme (BMS) oder die zugehörige Ladeinfrastruktur – wir liefern robuste und langlebige Komponenten für anspruchsvolle Umgebungen.",
        applications: [
          "Photovoltaik-Systeme und Wechselrichter",
          "Batterie-Energiespeichersysteme (BESS)",
          "Batteriemanagementsysteme (BMS)",
          "Ladeinfrastruktur und Onboard-Charger",
          "Off-Grid- und intelligente Hybridnetze",
        ],
        strengthsTitle: "Ihre Vorteile auf einen Blick",
        strengths: [
          "Komponenten mit hoher Temperatur- und Spannungsfestigkeit",
          "Komponenten mit AEC-Q-Zertifizierung für raue Umgebungen",
          "Langzeitverfügbarkeit für langlebige Energiespeicher- und Netzinfrastrukturen",
          "Unterstützung bei Prototyping, Design-In und Serienproduktion",
        ],
      },
    },
    "Home Appliances": {
      name: "Haushaltsgeräte",
      summary:
        "Dauerhafte Komponentenversorgung für Appliance-Elektronik, Motorsteuerung, Sensorik und effiziente Stromversorgung.",
      detail: {
        intro:
          "Für die Haushaltsgeräteindustrie liefern wir geprüfte Elektronikkomponenten, die langlebig, kompakt, energieeffizient und normgerecht ausgelegt sind.",
        applications: [
          "Waschmaschinen und Wäschetrockner",
          "Kühl- und Gefriergeräte",
          "Kochfelder, Backöfen und Mikrowellen",
          "Kaffeemaschinen und Kleingeräte",
          "Staubsauger, Luftreiniger und Ventilatoren",
        ],
        strengthsTitle: "Ihre Vorteile auf einen Blick",
        strengths: [
          "Komponenten führender Hersteller mit Fokus auf Home Appliances",
          "Support bei Design, Auswahl und Serienumstellung",
          "Komponenten mit internationalen Zulassungen wie VDE, UL und IEC",
          "Energieeffiziente Lösungen",
          "Zuverlässige Lieferung und langfristige Verfügbarkeit",
        ],
      },
    },
    "Medical & Healthcare": {
      name: "Medizintechnik & Healthcare",
      summary:
        "Rückverfolgbare Komponentenversorgung für Healthcare-Geräte, Diagnostik und regulierte Elektronikbaugruppen.",
      detail: {
        intro:
          "In der Medizintechnik zählt jedes Detail. Elektronikkomponenten müssen höchste Qualitätsstandards erfüllen, langfristig verfügbar und absolut zuverlässig sein.",
        applications: [
          "Diagnostik",
          "Patientenüberwachung",
          "Therapie- und Behandlungssysteme",
          "Labortechnik und Analytiksysteme",
          "Medizinische Wearables und Homecare",
        ],
        strengthsTitle: "Warum Medizintechnik-Kunden auf uns setzen",
        strengths: [
          "Komponenten mit medizinischer Eignung, einschließlich ISO 13485 und YSI400",
          "Zuverlässige Lieferketten und Rückverfolgbarkeit mit CoC und CoO",
          "Langzeitverfügbarkeit für Geräte mit Zulassungszyklen",
          "Individuelle Unterstützung bei Auswahl und Design-In",
        ],
      },
    },
  },
  fr: {
    "AEROSPACE & AVIATION": {
      name: "Aérospatiale & Aviation",
      summary:
        "Résilience des composants pour l'avionique, les sous-systèmes orbitaux et les assemblages de défense sensibles aux EMI.",
      detail: {
        intro:
          "Dans l'aérospatiale, l'aviation civile et la défense, les exigences en matière de qualité, de sécurité et de traçabilité sont particulièrement strictes. Nous fournissons des composants électroniques testés, qualifiés et disponibles à long terme pour des environnements extrêmes.",
        applications: [
          "Avionique et systèmes aéronautiques",
          "Technologies spatiales",
          "Électronique aéronautique civile et militaire",
          "Stations au sol et systèmes de surveillance",
        ],
        strengthsTitle: "Nos atouts pour votre mission",
        strengths: [
          "Composants homologués pour l'aéronautique et le spatial, notamment MIL-STD et AS9100",
          "Livraison traçable et spécifique au lot avec CoC, CoO et rapports de test sur demande",
          "Fabricants qualifiés et composants high-reliability",
          "Disponibilité long terme et gestion de l'obsolescence",
          "Supply chain fiable pour production série et approvisionnement spécial",
        ],
      },
    },
    "Automotive & Transportation": {
      name: "Automotive & Transport",
      summary:
        "Approvisionnement qualifié pour plateformes véhicule, systèmes de charge, électronique de mobilité et infrastructures de transport.",
      detail: {
        intro:
          "L'industrie automotive évolue avec l'électrification, la conduite autonome, la connectivité et l'efficacité. Nous fournissons des composants testés et certifiés AEC-Q pour OEMs, Tier-1 et développeurs de systèmes automotive.",
        applications: [
          "Body electronics et confort systèmes",
          "Systèmes de sécurité et d'aide à la conduite (ADAS)",
          "Batterie management et électronique de charge",
          "Infotainment et connectivité",
        ],
        strengthsTitle: "Vos avantages avec nous comme partenaire automotive",
        strengths: [
          "Composants AEC-Q100 et AEC-Q200 de fabricants leaders",
          "Conseil technique",
          "Logistique fiable pour productions en grande série",
          "Disponibilité long terme et gestion de l'obsolescence",
          "Support design-in, échantillons et validation série",
        ],
      },
    },
    "INDUSTRIAL AUTOMATION": {
      name: "Automatisation industrielle",
      summary:
        "Composants précis de contrôle, de détection et de puissance pour les environnements industriels réglementés et les systèmes intelligents.",
      detail: {
        intro:
          "Les installations industrielles et les systèmes automatisés modernes sont connectés, hautement efficaces et axés sur les données. Qu'il s'agisse de capteurs, de technologie de contrôle, d'entraînement ou de communication industrielle, nous fournissons des composants électroniques robustes, durables et testés pour l'automatisation industrielle et du bâtiment.",
        applications: [
          "Automatisation et technologie de contrôle",
          "Technologie d'entraînement et motor control",
          "Communication industrielle et IoT",
          "Détection et technologie de mesure",
          "Intégration du chauffage, de la ventilation et de la climatisation (HVAC)",
          "Gestion technique du bâtiment (GTB) et compteurs intelligents",
        ],
        strengthsTitle: "Vos avantages avec nous",
        strengths: [
          "Composants éprouvés en industrie de fabricants leaders",
          "Conseil technique pour sélection et design-in",
          "Disponibilité long terme et gestion de l'obsolescence",
          "Logistique fiable pour production série",
          "Composants conformes aux normes industrielles et de sécurité telles que IEC, UL et ISO 13849",
        ],
      },
    },
    "Solar PV & BESS": {
      name: "Solaire PV & BESS",
      summary:
        "Électronique de puissance, composants de conversion et de détection pour les systèmes photovoltaïques et de stockage d'énergie.",
      detail: {
        intro:
          "La transition énergétique mondiale et la mobilité électrique exigent une électronique de puissance extrêmement fiable. Qu'il s'agisse d'installations solaires, de systèmes de stockage par batterie (BESS), de systèmes de gestion de batterie (BMS) ou d'infrastructures de recharge, nous fournissons des composants robustes pour relever ces défis.",
        applications: [
          "Systèmes photovoltaïques et onduleurs",
          "Systèmes de stockage d'énergie par batterie (BESS)",
          "Systèmes de gestion de batterie (BMS)",
          "Infrastructures de recharge et chargeurs embarqués",
          "Systèmes hors réseau et réseaux hybrides intelligents",
        ],
        strengthsTitle: "Vos avantages en un coup d'oeil",
        strengths: [
          "Composants à haute résistance thermique et électrique",
          "Large gamme de composants qualifiés AEC-Q pour environnements sévères",
          "Disponibilité à long terme pour les infrastructures d'énergie et de stockage",
          "Support pour le prototypage, le design-in et la transition vers la série",
        ],
      },
    },
    "Home Appliances": {
      name: "Électroménager",
      summary:
        "Approvisionnement durable pour l'électronique des appareils, le contrôle des moteurs, les capteurs et l'alimentation protégée.",
      detail: {
        intro:
          "Pour l'industrie de l'électroménager, nous proposons des composants électroniques testés, durables, compacts, efficaces énergétiquement et conformes aux normes.",
        applications: [
          "Lave-linge et sèche-linge",
          "Réfrigérateurs et congélateurs",
          "Tables de cuisson, fours et micro-ondes",
          "Machines à café et petits appareils",
          "Aspirateurs, purificateurs d'air et ventilateurs",
        ],
        strengthsTitle: "Vos avantages en un coup d'oeil",
        strengths: [
          "Composants de fabricants leaders spécialisés home appliances",
          "Support pour design, sélection et transition série",
          "Composants avec homologations internationales telles que VDE, UL et IEC",
          "Solutions énergétiquement efficaces",
          "Livraison fiable et disponibilité long terme",
        ],
      },
    },
    "Medical & Healthcare": {
      name: "Médical & Healthcare",
      summary:
        "Approvisionnement traçable pour dispositifs de santé, diagnostic et assemblages électroniques réglementés.",
      detail: {
        intro:
          "En technologie médicale, chaque détail compte. Les composants électroniques doivent répondre aux standards qualité les plus élevés, rester disponibles à long terme et être absolument fiables.",
        applications: [
          "Diagnostic",
          "Surveillance patient",
          "Systèmes de thérapie et de traitement",
          "Technologie de laboratoire et systèmes analytiques",
          "Wearables médicaux et homecare",
        ],
        strengthsTitle: "Pourquoi les clients medtech s'appuient sur nous",
        strengths: [
          "Composants adaptés au médical, notamment ISO 13485 et YSI400",
          "Supply chains fiables et traçabilité avec CoC et CoO",
          "Disponibilité long terme pour dispositifs avec cycles d'homologation",
          "Support individuel pour sélection et design-in",
        ],
      },
    },
  },
};

export const productDossiers: Record<SupportedLocale, Partial<Record<string, string>>> = {
  en: {},
  de: {
    "chip-ntc-thermistors":
      "Kompakte Chip-NTC- und Thermistor-Plattformen für Temperaturmessung bis +250C.",
    "waterproof-temperature-sensors":
      "Wasserdichte Temperaturfühler für geschützte Messung in Industrie- und Appliance-Umgebungen.",
    thermistors: "Thermistoren mit enger Widerstandstoleranz für hochgenaue Temperaturregelung.",
    "custom-temperature-sensors":
      "Kundenspezifische Temperatur-Sensorbaugruppen für Hochtemperatur-Betriebsbereiche.",
    "microchip-thermistors":
      "YSI400-kompatible Microchip-Thermistoren für kompakte Elektronikbaugruppen.",
    "custom-thermocouples":
      "Kundenspezifische Thermoelement-Konfigurationen für High-Reliability-Thermal-Instrumentation.",
    "pressure-sensors-transmitters":
      "Drucksensor- und Transmitter-Familien für Prozess-, Maschinen- und Fluidsysteme.",
    "ultrasonic-flow-meters":
      "Kontaktlose Ultraschall-Durchflussmessmodule für kontrollierte Medienpfade.",
    "level-transmitters": "Füllstands-Transmitter für Prozessbehälter und industrielle Systeme.",
    "gas-sensors": "Gas-Sensorik für Sauerstoff, CO2, Methan, Propan, Ammoniak und weitere Gase.",
    "flow-meters-switches":
      "Durchflussmesser- und Schalterlösungen für überwachte Flüssigkeits- und Gassysteme.",
    "strain-gauges":
      "Statische und dynamische Dehnungsmess-Elemente für präzise mechanische Sensorik.",
    "current-sensors": "Clamp-on-, Busbar- und PCB-Mount-Stromsensorik für Leistungselektronik.",
    "position-sensors":
      "Rotary Position-, Encoder- und Potentiometer-Plattformen für kontrollierte Bewegungssysteme.",
    chokes: "Lineare, gesättigte und Speicher-Drosseln zur EMV-Kontrolle in kompakten Baugruppen.",
    filters:
      "Ein- bis dreiphasige und kombinierte Filter für Print-, Inlet- und industrielle EMV-Schnittstellen.",
    inductors:
      "Magnetische, sekundäre und unipolare Induktivitäten für Power- und Signalkonditionierung.",
    transformers: "Flyback-, EE/ETD-, Hochfrequenz-, SMD- und THT-Transformer-Familien.",
    igbt: "Half-Bridge-, Three-Phase-Bridge- und SiC-Moduloptionen für Power-Management-Stacks.",
    sic: "SiC-Half-Bridge-, Power-Diode- und Three-Phase-Optionen für effiziente Power Conversion.",
    mosfet: "MOSFET-Module, Rectifier und Power-Diode-Optionen für Switching-Architekturen.",
    converters:
      "AC/DC-, DC/DC-, Power-Supply- und Plug-Converter-Optionen für geregelte Power Interfaces.",
    resistors: "Thin-Film-, Thick-Film- und Präzisionswiderstände für elektronische Baugruppen.",
    "film-capacitors":
      "X-Film-, Y-Film-Poly- und RC-Kondensatoren für passive Filterung und Suppression.",
    "mlcc-capacitors": "MLCC-, Aluminium- und Entstörkondensator-Optionen.",
    "quartz-crystals":
      "SMD-, THT- und Oszillator-Quarz-Timing-Komponenten für stabile elektronische Systeme.",
    connectors: "Push-pull-, Y-Circ-P-, High-Speed-SPE- und RJ45-Industriesteckverbinder.",
    cables: "Ribbon-, Y-Cable-, IP55- und kundenspezifische Kabellösungen für Industriebaugruppen.",
    ventilators: "Radial-, Axial-, Array- und MagLev-Lüftungsoptionen für Thermal Management.",
    "card-readers":
      "Memory-Card-, SIM-Card- und Compact-Flash-Reader-Interfaces für Embedded Systems.",
    "test-sockets": "Custom Y-ETI-, Open-Module-, BLT- und COM-Test-Socket-Plattformen.",
    wireless: "RF-, Outdoor-, GNSS-, Adapter- und Connector-Wireless-Interface-Hardware.",
    buzzers: "Piezo-, Self-Drive- und Transducer-Buzzer-Plattformen für akustische Signalisierung.",
    "magnetic-types": "Magnetische Transducer-, Buzzer- und SMD-Akustikkomponenten.",
    microphones: "Omni-direktionale, uni-direktionale und Noise-Canceling-Mikrofonoptionen.",
    piezos: "Piezo-Akustikelemente mit Feedback- und Non-Feedback-Konfigurationen.",
    receivers: "Dynamische und Piezo-Receiver für kompakte akustische Ausgangsbaugruppen.",
    speakers: "Mylar-, Loud- und SMD-Speaker-Optionen für kompakte Elektronikprodukte.",
  },
  fr: {
    "chip-ntc-thermistors":
      "Plateformes compactes Chip NTC et thermistances pour mesure de température jusqu'à +250C.",
    "waterproof-temperature-sensors":
      "Sondes de température étanches pour mesure protégée en environnements industriels et appliance.",
    thermistors:
      "Thermistances à tolérance de résistance serrée pour contrôle thermique haute précision.",
    "custom-temperature-sensors":
      "Assemblages de capteurs de température sur mesure pour enveloppes de fonctionnement haute température.",
    "microchip-thermistors":
      "Thermistances microchip compatibles YSI400 pour assemblages électroniques compacts.",
    "custom-thermocouples":
      "Configurations de thermocouples sur mesure pour instrumentation thermique high-reliability.",
    "pressure-sensors-transmitters":
      "Familles de capteurs et transmetteurs de pression pour process, machines et systèmes fluides.",
    "ultrasonic-flow-meters":
      "Modules de mesure de débit ultrasonique sans contact pour chemins de médias contrôlés.",
    "level-transmitters":
      "Transmetteurs de niveau liquide pour cuves de process et systèmes industriels.",
    "gas-sensors":
      "Options de détection de gaz pour oxygène, CO2, méthane, propane, ammoniac et autres gaz.",
    "flow-meters-switches":
      "Solutions de débitmètres et switches pour systèmes liquides et gazeux surveillés.",
    "strain-gauges":
      "Éléments de jauge de contrainte statique et dynamique pour détection mécanique précise.",
    "current-sensors":
      "Capteurs de courant clamp-on, busbar mount et PCB mount pour électronique de puissance.",
    "position-sensors":
      "Plateformes rotary position, encoder et potentiomètre pour systèmes de mouvement contrôlé.",
    chokes: "Selfs linéaires, saturées et de stockage pour contrôle CEM dans assemblages compacts.",
    filters:
      "Filtres une à trois phases et composés pour interfaces print, inlet et CEM industrielles.",
    inductors:
      "Options d'inductances magnétiques, secondaires et unipolaires pour conditionnement power et signal.",
    transformers: "Familles de transformateurs flyback, EE/ETD, haute fréquence, SMD et THT.",
    igbt: "Options half bridge, three-phase bridge et module SiC pour stacks de power management.",
    sic: "Options SiC half-bridge, power diode et three-phase pour conversion de puissance efficace.",
    mosfet: "Modules MOSFET, rectifiers et options power diode pour architectures switching.",
    converters:
      "Options AC/DC, DC/DC, power supply et plug converter pour interfaces de puissance régulées.",
    resistors:
      "Options de résistances thin film, thick film et précision pour assemblages électroniques.",
    "film-capacitors":
      "Options de condensateurs X film, Y film poly et RC pour filtrage passif et suppression.",
    "mlcc-capacitors": "Options de condensateurs MLCC, aluminium et suppression d'interférences.",
    "quartz-crystals":
      "Composants quartz SMD, THT et oscillateurs pour timing électronique stable.",
    connectors: "Connecteurs industriels push-pull, Y-Circ P, high-speed SPE et RJ45.",
    cables: "Solutions ribbon, Y-cable, IP55 et câbles personnalisés pour assemblages industriels.",
    ventilators:
      "Options de ventilation radiale, axiale, arrays et MagLev pour thermal management.",
    "card-readers":
      "Interfaces lecteurs memory card, SIM card et Compact Flash pour systèmes embedded.",
    "test-sockets": "Plateformes custom Y-ETI, open module, BLT et COM test socket.",
    wireless: "Hardware d'interface wireless RF, outdoor, GNSS, adaptateur et connecteurs.",
    buzzers: "Plateformes buzzers piezo, self-drive et transducer pour signalisation acoustique.",
    "magnetic-types": "Composants acoustiques magnetic transducer, buzzer et SMD.",
    microphones: "Options de microphones omni-directionnels, uni-directionnels et noise-canceling.",
    piezos: "Éléments acoustiques piezo avec configurations feedback et non-feedback.",
    receivers:
      "Options receiver dynamique et piezo pour assemblages de sortie acoustique compacts.",
    speakers: "Options mylar, loud et SMD speaker pour produits électroniques compacts.",
  },
};

export const powerFamilyCopies: Record<
  SupportedLocale,
  Partial<Record<string, PowerFamilyCopy>>
> = {
  en: {},
  de: {
    igbt: {
      label: "Insulated Gate Bipolar Transistor",
      summary:
        "Hochdichte Switching-Module für Industrieantriebe, Automotive-Systeme, erneuerbare Energien und Appliance-Plattformen.",
      variants: ["Half Bridge", "3 Phase Bridge", "SiC Module"],
      performance: [
        undefined,
        undefined,
        { specification: "Hohe Schaltgeschwindigkeiten für effiziente IGBT-Schaltungen" },
        { specification: "Minimale Schaltverluste für hohe Effizienz" },
        { specification: "Hochwertige Materialien für lange Lebensdauer und Zuverlässigkeit" },
      ].map((item) => item ?? {}),
      sellingPoints: [
        "Hohe Leistungsdichte",
        "Zuverlässigkeit",
        "Breiter Anwendungsbereich",
        "Geringe Verluste",
        "Einfache Integration",
      ],
      targetApplications: [
        "Industrial Drives",
        "Automotive",
        "Solar PV & BESS",
        "Haushaltsgeräte",
      ],
    },
    sic: {
      label: "Siliziumkarbid-Schaltarchitektur",
      summary:
        "Thermisch belastbare Silicon-Carbide-Devices für kompakte, effiziente und hochfrequente Power Conversion.",
      variants: ["Half Bridge", "Power Diodes", "3 Phase"],
      sellingPoints: [
        "Höhere Effizienz",
        "Verbesserte thermische Performance",
        "Kleinere und leichtere Designs",
        "Schnellere Schaltzeiten",
      ],
      targetApplications: [
        "BESS & Energiespeicher",
        "Industrielle Automatisierung",
        "Solar-PV",
        "Leistungselektronik",
      ],
    },
    mosfet: {
      label: "Metal-oxide-semiconductor field-effect transistor",
      summary:
        "Diskrete und Bare-Die-MOSFET-Optionen für skalierbare Low- und Medium-Power-Switching-Designs.",
      variants: ["Rectifiers", "MOSFET Modules", "Power Diodes"],
      sellingPoints: [
        "Hohe Schaltgeschwindigkeit",
        "Hohe Effizienz",
        "Skalierbarkeit",
        "Geringe Ansteuerleistung",
        "Gute thermische Stabilität",
        "Effizient bei Low/Medium Power und hoher Frequenz",
      ],
      targetApplications: [
        "Antriebstechnik",
        "Schweißtechnik",
        "BESS-Systeme",
        "Leistungselektronik",
        "Solar-PV-Systeme",
      ],
    },
    converters: {
      label: "Geregelte Power Interfaces",
      summary:
        "AC/DC-, DC/DC-, Power-Supply- und Plug-Converter-Optionen für geschützte Stromversorgung.",
      variants: ["AC/DC", "DC/DC", "Power Supply", "Plug Converters"],
      sellingPoints: [
        "Breite Branchenabdeckung",
        "Flexibles Produktspektrum",
        "Hohe Zuverlässigkeit und Sicherheit",
        "Optimiert für sensible Lasten",
        "Energieeffizienz und Schutzfunktionen",
      ],
      targetApplications: [
        "Photovoltaik & Speicher",
        "Schienenverkehr",
        "Industrielle Steuerung & IKT",
        "Medizinische Anwendungen",
        "Industrielle Beleuchtung",
      ],
    },
  },
  fr: {
    igbt: {
      label: "Insulated Gate Bipolar Transistor",
      summary:
        "Modules de commutation haute densité pour entraînements industriels, systèmes automotive, énergies renouvelables et plateformes appliance.",
      variants: ["Half Bridge", "3 Phase Bridge", "SiC Module"],
      performance: [
        {},
        {},
        { specification: "Vitesses de commutation élevées pour circuits IGBT efficaces" },
        { specification: "Pertes de commutation minimales pour haute efficacité" },
        { specification: "Matériaux de haute qualité pour durée de vie et fiabilité" },
      ],
      sellingPoints: [
        "Forte densité de puissance",
        "Fiabilité",
        "Large champ d'application",
        "Faibles pertes",
        "Intégration facilitée",
      ],
      targetApplications: [
        "Industrial Drives",
        "Automotive",
        "Solaire PV & BESS",
        "Électroménager",
      ],
    },
    sic: {
      label: "Architecture de commutation silicon-carbide",
      summary:
        "Dispositifs silicon-carbide thermiquement robustes pour conversion de puissance compacte, efficace et haute fréquence.",
      variants: ["Half Bridge", "Power Diodes", "3 Phase"],
      sellingPoints: [
        "Efficacité supérieure",
        "Performance thermique améliorée",
        "Designs plus compacts et légers",
        "Temps de commutation plus rapides",
      ],
      targetApplications: [
        "BESS & Stockage d'énergie",
        "Automatisation industrielle",
        "Solaire PV",
        "Électronique de puissance",
      ],
    },
    mosfet: {
      label: "Metal-oxide-semiconductor field-effect transistor",
      summary:
        "Options MOSFET discrètes et bare-die pour designs de commutation low et medium power évolutifs.",
      variants: ["Rectifiers", "MOSFET Modules", "Power Diodes"],
      sellingPoints: [
        "Vitesse de commutation élevée",
        "Haute efficacité",
        "Scalabilité",
        "Faible puissance de commande",
        "Bonne stabilité thermique",
        "Efficace en low/medium power et haute fréquence",
      ],
      targetApplications: [
        "Technologie d'entraînement",
        "Technologie de soudage",
        "Systèmes BESS",
        "Électronique de puissance",
        "Systèmes Solaire PV",
      ],
    },
    converters: {
      label: "Interfaces de puissance régulées",
      summary: "Options AC/DC, DC/DC, power supply et plug converter pour alimentation protégée.",
      variants: ["AC/DC", "DC/DC", "Power Supply", "Plug Converters"],
      sellingPoints: [
        "Couverture sectorielle étendue",
        "Gamme produit flexible",
        "Fiabilité et sécurité élevées",
        "Optimisé pour charges sensibles",
        "Efficacité énergétique et protection",
      ],
      targetApplications: [
        "Photovoltaïque & Stockage",
        "Transport ferroviaire",
        "Contrôle industriel & TIC",
        "Applications médicales",
        "Éclairage industriel",
      ],
    },
  },
};

export function getApplicationCopy(
  locale: string,
  application: { name: ApplicationName; summary: string; detail: ApplicationCopy["detail"] }
) {
  const normalized = normalizeLocale(locale);
  return (
    applicationCopies[normalized][application.name] ?? {
      name: application.name,
      summary: application.summary,
      detail: application.detail,
    }
  );
}

export function getLocalizedProduct<T extends Product>(product: T, locale: string): T {
  const normalized = normalizeLocale(locale);
  return {
    ...product,
    dossier: productDossiers[normalized][product.slug] ?? product.dossier,
  };
}

export function getLocalizedProducts<T extends Product>(products: T[], locale: string): T[] {
  return products.map((product) => getLocalizedProduct(product, locale));
}

export function getProductGroupCopy(locale: string, group: ProductGroup) {
  const normalized = normalizeLocale(locale);
  return productGroupCopies[normalized][group] ?? productGroupCopies.en[group];
}

export function getPowerFamilyCopy<T extends PowerManagementFamily>(family: T, locale: string): T {
  const normalized = normalizeLocale(locale);
  const copy = powerFamilyCopies[normalized][family.slug];
  if (!copy) return family;

  return {
    ...family,
    label: copy.label ?? family.label,
    summary: copy.summary ?? family.summary,
    variants: copy.variants ?? family.variants,
    performance: family.performance.map((item, index) => ({
      ...item,
      parameter: copy.performance?.[index]?.parameter ?? item.parameter,
      specification: copy.performance?.[index]?.specification ?? item.specification,
    })),
    sellingPoints: copy.sellingPoints ?? family.sellingPoints,
    targetApplications: family.targetApplications.map((item, index) => ({
      ...item,
      label: copy.targetApplications?.[index] ?? item.label,
    })),
  };
}
