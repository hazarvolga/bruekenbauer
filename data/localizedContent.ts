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
    "Aerospace & Defense": {
      name: "Luft- und Raumfahrt & Verteidigung",
      summary:
        "Belastbare Komponentenversorgung für Avionik, orbitale Subsysteme und EMI-sensitive Verteidigungsbaugruppen.",
      detail: {
        intro:
          "In Luft- und Raumfahrt sowie Verteidigung gelten besonders hohe Anforderungen an Qualität, Sicherheit und Rückverfolgbarkeit. Als spezialisierter Distributor liefern wir geprüfte, qualifizierte und langfristig verfügbare Elektronikkomponenten für extreme Umgebungen.",
        applications: [
          "Avionik und Flugzeugsysteme",
          "Raumfahrttechnik",
          "Verteidigungselektronik und militärische Systeme",
          "Bodenstationen und Überwachungssysteme",
        ],
        strengthsTitle: "Unsere Stärken für Ihre Mission",
        strengths: [
          "Komponenten mit militärischen und luftfahrtspezifischen Zulassungen, einschließlich MIL-STD und AS9100",
          "Rückverfolgbare, chargenspezifische Lieferung mit CoC, CoO und Testprotokollen auf Anfrage",
          "Qualifizierte Hersteller und High-Reliability-Komponenten",
          "Langzeitverfügbarkeit und Obsoleszenzmanagement",
          "Verlässliche Supply Chain für Serienfertigung und Sonderbeschaffung",
        ],
      },
    },
    "Automotive & Transportation": {
      name: "Automotive & Transport",
      summary:
        "Qualifizierte Komponentenversorgung für Fahrzeugplattformen, Ladesysteme, Mobilitätselektronik und Verkehrsinfrastruktur.",
      detail: {
        intro:
          "Die Automobilindustrie wird durch Elektrifizierung, autonomes Fahren, Konnektivität und Effizienz geprägt. Wir liefern geprüfte, AEC-Q-zertifizierte Komponenten für OEMs, Tier-1-Zulieferer und Automotive-Systementwickler.",
        applications: [
          "Antriebs- und Leistungselektronik",
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
    "Building Automation": {
      name: "Gebäudeautomation",
      summary:
        "Steuerungs-, Sensorik- und Leistungskomponenten für vernetzte Gebäude und überwachte Facility-Systeme.",
      detail: {
        intro:
          "Intelligente Gebäude erfordern Energieeffizienz, Vernetzung, Nachhaltigkeit und Komfort. Wir liefern passende Elektronikkomponenten für leistungsfähige und zukunftssichere Automationslösungen in Gebäuden aller Art.",
        applications: [
          "Heizungs-, Lüftungs- und Klimatechnik (HVAC)",
          "Smart Metering und Energiemanagement",
          "Intelligente Lichtsteuerung",
          "Zugangskontrolle und Sicherheitssysteme",
          "Zentrale Gebäudeleittechnik (BMS)",
        ],
        strengthsTitle: "Warum Kunden uns vertrauen",
        strengths: [
          "Große Auswahl industrietauglicher Komponenten führender Hersteller",
          "Beratung für Systemintegration und Applikationsdesign",
          "Schnelle Verfügbarkeit und langfristige Lieferfähigkeit",
          "Technischer Support",
          "Zuverlässige Logistik und projektbezogene Sonderbeschaffung",
        ],
      },
    },
    "E-Mobility & Battery Management": {
      name: "E-Mobility & Batteriemanagement",
      summary:
        "Leistungswandlung, Sensorik und thermische Steuerung für Elektromobilität und Batteriearchitekturen.",
      detail: {
        intro:
          "Elektromobilität verändert die Art, wie wir uns bewegen. Ob Ladeinfrastruktur, Onboard-Systeme oder Batteriemanagement: Elektronische Komponenten sind das Herz jeder E-Mobility-Anwendung.",
        applications: [
          "Ladeinfrastruktur (AC und DC Charging)",
          "Batteriemanagementsysteme (BMS)",
          "Onboard-Charger und Inverter",
          "Telematik und Kommunikation",
          "Fahrzeuginterne Steuerung und Peripherie",
        ],
        strengthsTitle: "Warum E-Mobility-Kunden auf uns setzen",
        strengths: [
          "Breites Portfolio automobiltauglicher Komponenten mit AEC-Q-Zertifizierung",
          "Langzeitverfügbarkeit und zuverlässige Lieferketten",
          "Support bei Prototyping, Design-In und Serienumstellung",
          "Qualifizierte innovative Hersteller und High-Reliability-Komponenten",
        ],
      },
    },
    "Home Appliances & White Goods": {
      name: "Haushaltsgeräte & White Goods",
      summary:
        "Lifecycle-fähige Komponentenversorgung für Appliance-Elektronik, Motorsteuerung, Sensorik und geschützte Stromversorgung.",
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
    HVAC: {
      name: "HVAC",
      summary:
        "Zuverlässige Sensorik, Umwandlungs- und Steuerungskomponenten für Heizungs-, Lüftungs-, Klima- und Energiesysteme.",
      detail: {
        intro:
          "Moderne HVAC-Systeme müssen effizient, vernetzt und zuverlässig arbeiten, ob in Wohngebäuden, Industrieanlagen oder kommerziellen Immobilien.",
        applications: [
          "Heizsysteme und Wärmepumpen",
          "Lüftungstechnik und Luftqualitätssysteme",
          "Kälte- und Klimatechnik",
          "Regel- und Steuerungssysteme",
          "Energieeffizienz und Smart Control",
        ],
        strengthsTitle: "Ihre Vorteile mit uns als Partner",
        strengths: [
          "Vielseitiges Portfolio für HVAC-Anwendungen",
          "Komponenten mit industrietauglicher Qualität und Lebensdauer",
          "Technischer Applikationssupport und Auswahlberatung",
          "Flexible Logistiklösungen und Langzeitverfügbarkeit",
        ],
      },
    },
    Industrial: {
      name: "Industrie",
      summary:
        "Präzise Versorgungsprogramme für regulierte industrielle Umgebungen mit anspruchsvollen thermischen, akustischen und Lifecycle-Anforderungen.",
      detail: {
        intro:
          "Moderne Industrieanlagen sind vernetzt, automatisiert und datengetrieben. Wir liefern robuste, langfristig verfügbare und qualitätsgeprüfte Elektronikkomponenten für industrielle Automatisierung.",
        applications: [
          "Automatisierungs- und Steuerungstechnik",
          "Antriebstechnik und Motorsteuerung",
          "Industriekommunikation und IoT",
          "Sensorik und Messtechnik",
          "Stromversorgung und Energieverteilung",
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
    "Renewable Energy": {
      name: "Erneuerbare Energien",
      summary:
        "Leistungselektronik, Umwandlungs- und Sensorikkomponenten für Photovoltaik, Speicher, Wind und Grid-Support-Systeme.",
      detail: {
        intro:
          "Die Energiewende braucht zuverlässige Elektronik. Ob Solar- und Windkraftanlagen, Batteriespeicher oder intelligente Netze: moderne Energieerzeugung basiert auf leistungsfähiger Elektronik.",
        applications: [
          "Photovoltaik-Systeme",
          "Windkraftanlagen",
          "Energiespeicher und Batteriesysteme",
          "Smart Grid und Energieverteilung",
          "Off-Grid- und Hybridsysteme",
        ],
        strengthsTitle: "Ihre Vorteile auf einen Blick",
        strengths: [
          "Komponenten mit hoher Temperatur- und Spannungsfestigkeit",
          "Langzeitverfügbarkeit für langlebige Energiesysteme",
          "Technische Beratung für Design-In und Systemintegration",
          "Zuverlässige Lieferketten für Serienprojekte",
        ],
      },
    },
  },
  fr: {
    "Aerospace & Defense": {
      name: "Aérospatial & Défense",
      summary:
        "Résilience des composants pour l'avionique, les sous-systèmes orbitaux et les assemblages de défense sensibles aux EMI.",
      detail: {
        intro:
          "Dans l'aérospatial et la défense, les exigences en matière de qualité, de sécurité et de traçabilité sont particulièrement strictes. Nous fournissons des composants électroniques testés, qualifiés et disponibles à long terme pour des environnements extrêmes.",
        applications: [
          "Avionique et systèmes aéronautiques",
          "Technologies spatiales",
          "Électronique de défense et systèmes militaires",
          "Stations au sol et systèmes de surveillance",
        ],
        strengthsTitle: "Nos atouts pour votre mission",
        strengths: [
          "Composants avec homologations militaires et aéronautiques, notamment MIL-STD et AS9100",
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
          "Électronique de traction et de puissance",
          "Électronique de carrosserie et systèmes de confort",
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
    "Building Automation": {
      name: "Automatisation du bâtiment",
      summary:
        "Programmes de composants de contrôle, détection et puissance pour bâtiments connectés et systèmes de facility monitoring.",
      detail: {
        intro:
          "Les bâtiments intelligents exigent efficacité énergétique, connectivité, durabilité et confort utilisateur. Nous fournissons les composants électroniques adaptés à des solutions d'automatisation puissantes et pérennes.",
        applications: [
          "Chauffage, ventilation et climatisation (HVAC)",
          "Smart metering et gestion de l'énergie",
          "Contrôle d'éclairage intelligent",
          "Contrôle d'accès et systèmes de sécurité",
          "Systèmes centraux de gestion du bâtiment (BMS)",
        ],
        strengthsTitle: "Pourquoi nos clients nous font confiance",
        strengths: [
          "Large choix de composants industriels de fabricants leaders",
          "Conseil pour intégration système et design d'application",
          "Disponibilité rapide et capacité d'approvisionnement long terme",
          "Support technique",
          "Logistique fiable et approvisionnement spécial par projet",
        ],
      },
    },
    "E-Mobility & Battery Management": {
      name: "E-Mobility & Gestion batterie",
      summary:
        "Conversion de puissance, détection et contrôle thermique pour mobilité électrique et architectures batterie.",
      detail: {
        intro:
          "L'électromobilité transforme la mobilité. Infrastructure de charge, systèmes embarqués ou batterie management: les composants électroniques sont au coeur de chaque application e-mobility.",
        applications: [
          "Infrastructure de charge (AC et DC charging)",
          "Systèmes de batterie management (BMS)",
          "Onboard chargers et inverters",
          "Télématique et communication",
          "Contrôle embarqué et périphérie véhicule",
        ],
        strengthsTitle: "Pourquoi les clients e-mobility s'appuient sur nous",
        strengths: [
          "Large portefeuille de composants automotive-grade avec certification AEC-Q",
          "Disponibilité long terme et supply chains fiables",
          "Support prototypage, design-in et transition série",
          "Fabricants innovants qualifiés et composants high-reliability",
        ],
      },
    },
    "Home Appliances & White Goods": {
      name: "Électroménager & White Goods",
      summary:
        "Approvisionnement lifecycle-ready pour électronique d'appareils, motor control, détection et power delivery protégé.",
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
    HVAC: {
      name: "HVAC",
      summary:
        "Composants fiables de détection, conversion et contrôle pour chauffage, ventilation, climatisation et systèmes énergétiques.",
      detail: {
        intro:
          "Les systèmes HVAC modernes doivent fonctionner efficacement, de manière connectée et fiable, dans les bâtiments résidentiels, sites industriels et immeubles commerciaux.",
        applications: [
          "Systèmes de chauffage et pompes à chaleur",
          "Technologie de ventilation et qualité de l'air",
          "Réfrigération et climatisation",
          "Systèmes de régulation et de contrôle",
          "Efficacité énergétique et smart control",
        ],
        strengthsTitle: "Vos avantages avec nous comme partenaire",
        strengths: [
          "Portefeuille polyvalent pour applications HVAC",
          "Composants de qualité industrielle et longue durée de vie",
          "Support applicatif technique et conseil de sélection",
          "Solutions logistiques flexibles et disponibilité long terme",
        ],
      },
    },
    Industrial: {
      name: "Industrie",
      summary:
        "Programmes d'approvisionnement précis pour environnements industriels régulés avec contraintes thermiques, acoustiques et lifecycle exigeantes.",
      detail: {
        intro:
          "Les installations industrielles modernes sont connectées, automatisées et data-driven. Nous fournissons des composants électroniques robustes, disponibles à long terme et testés qualité pour l'automatisation industrielle.",
        applications: [
          "Automatisation et technologie de contrôle",
          "Technologie d'entraînement et motor control",
          "Communication industrielle et IoT",
          "Détection et technologie de mesure",
          "Alimentation et distribution d'énergie",
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
    "Renewable Energy": {
      name: "Énergies renouvelables",
      summary:
        "Électronique de puissance, conversion et détection pour photovoltaïque, stockage, éolien et systèmes grid-support.",
      detail: {
        intro:
          "La transition énergétique exige une électronique fiable. Solaire, éolien, stockage batterie ou smart grids: la production et la distribution d'énergie modernes reposent sur une électronique puissante et efficace.",
        applications: [
          "Systèmes photovoltaïques",
          "Éoliennes",
          "Stockage d'énergie et systèmes batterie",
          "Smart grid et distribution d'énergie",
          "Systèmes off-grid et hybrides",
        ],
        strengthsTitle: "Vos avantages en un coup d'oeil",
        strengths: [
          "Composants à forte résistance thermique et tension",
          "Disponibilité long terme pour systèmes énergétiques durables",
          "Conseil technique pour design-in et intégration système",
          "Supply chains fiables pour projets série",
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
        "Erneuerbare Energien",
        "Home Appliances",
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
        "E-Mobility",
        "Industrial Automation",
        "Erneuerbare Energien",
        "Power Electronics",
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
        "Drive Technology",
        "Welding Technology",
        "Wind Turbines",
        "Power Electronics",
        "Photovoltaic Systems",
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
        "Photovoltaic Energy Storage",
        "Railway Transportation",
        "Industrial Control and ICT",
        "Medical Applications",
        "LED Lighting Applications",
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
        "Énergies renouvelables",
        "Home Appliances",
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
        "E-Mobility",
        "Industrial Automation",
        "Énergies renouvelables",
        "Power Electronics",
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
        "Drive Technology",
        "Welding Technology",
        "Wind Turbines",
        "Power Electronics",
        "Photovoltaic Systems",
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
        "Photovoltaic Energy Storage",
        "Railway Transportation",
        "Industrial Control and ICT",
        "Medical Applications",
        "LED Lighting Applications",
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
