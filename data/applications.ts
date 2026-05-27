import { slugify } from "@/lib/slug";

export const applicationNames = [
  "Aerospace & Defense",
  "Automotive & Transportation",
  "Building Automation",
  "E-Mobility & Battery Management",
  "Home Appliances & White Goods",
  "HVAC",
  "Industrial",
  "Medical & Healthcare",
  "Renewable Energy",
] as const;

export type ApplicationName = (typeof applicationNames)[number];

const applicationSummaries: Record<ApplicationName, string> = {
  "Aerospace & Defense":
    "High-stress component resilience for avionics, orbital subsystems, and EMI-sensitive defense assemblies.",
  "Automotive & Transportation":
    "Qualified component supply for vehicle platforms, charging systems, mobility electronics, and transport infrastructure.",
  "Building Automation":
    "Control, sensing, and power component programs for connected buildings and monitored facility systems.",
  "E-Mobility & Battery Management":
    "Power conversion, sensing, and thermal-control components for electric mobility and battery architectures.",
  "Home Appliances & White Goods":
    "Lifecycle-ready component supply for appliance electronics, motor control, sensing, and protected power delivery.",
  HVAC: "Reliable sensing, conversion, and control components for heating, ventilation, air conditioning, and energy systems.",
  Industrial:
    "Precision supply programs for regulated industrial environments with demanding thermal, acoustic, and lifecycle constraints.",
  "Medical & Healthcare":
    "Traceable component supply for healthcare devices, diagnostic equipment, and regulated electronic assemblies.",
  "Renewable Energy":
    "Power electronics, conversion, and sensing components for photovoltaic, storage, wind, and grid-support systems.",
};

const applicationDetails: Record<
  ApplicationName,
  {
    intro: string;
    applications: string[];
    strengthsTitle: string;
    strengths: string[];
  }
> = {
  "Aerospace & Defense": {
    intro:
      "Aerospace and defense programs place exceptionally strict demands on quality, safety, and traceability. As a specialized distributor, we deliver tested, qualified, and long-term available electronic components for use in extreme environments.",
    applications: [
      "Avionics and aircraft systems",
      "Space technology",
      "Defense electronics and military systems",
      "Ground stations and surveillance systems",
    ],
    strengthsTitle: "Our strengths for your mission",
    strengths: [
      "Components with military and aerospace-specific approvals, including MIL-STD and AS9100",
      "Traceable, lot-specific delivery with CoC, CoO, and test reports on request",
      "Qualified manufacturers and high-reliability components",
      "Long-term availability and obsolescence management",
      "Reliable supply chain for series production and special procurement",
    ],
  },
  "Automotive & Transportation": {
    intro:
      "The automotive industry is being reshaped by electrification, autonomous driving, connectivity, and efficiency. Electronics play a central role. As an experienced distributor, we supply tested, AEC-Q-certified components for OEMs, Tier 1 suppliers, and automotive system developers with a focus on quality, availability, and future-ready technology.",
    applications: [
      "Drive and power electronics",
      "Body electronics and comfort systems",
      "Safety and driver assistance systems (ADAS)",
      "Battery management and charging electronics",
      "Infotainment and connectivity",
    ],
    strengthsTitle: "Your advantages with us as an automotive partner",
    strengths: [
      "AEC-Q100 and AEC-Q200 certified components from leading manufacturers",
      "Technical consulting",
      "Reliable delivery logistics for high-volume series production",
      "Long-term availability and obsolescence management",
      "Support with design-in, sample procurement, and series release",
    ],
  },
  "Building Automation": {
    intro:
      "The requirements for intelligent buildings are growing steadily, with energy efficiency, connectivity, sustainability, and user comfort at the center. As an experienced distributor, we supply the right electronic components for powerful and future-proof automation solutions in every type of building.",
    applications: [
      "Heating, ventilation, and air conditioning (HVAC)",
      "Smart metering and energy management",
      "Intelligent lighting control",
      "Access control and security systems",
      "Central building management systems (BMS)",
    ],
    strengthsTitle: "Why our customers trust us",
    strengths: [
      "Broad selection of industry-ready components from leading manufacturers",
      "Competent consulting for system integration and application design",
      "Fast availability and long-term supply capability",
      "Technical support",
      "Reliable logistics and project-specific special procurement",
    ],
  },
  "E-Mobility & Battery Management": {
    intro:
      "Electromobility is revolutionizing the way we move. Whether charging infrastructure, onboard systems, or battery management, electronic components are at the heart of every e-mobility application. As a specialized distributor, we offer a broad portfolio of high-quality components precisely matched to this demanding industry.",
    applications: [
      "Charging infrastructure (AC and DC charging)",
      "Battery management systems (BMS)",
      "Onboard chargers and inverters",
      "Telematics and communication",
      "In-vehicle control and peripherals",
    ],
    strengthsTitle: "Why e-mobility customers rely on us",
    strengths: [
      "Broad portfolio of automotive-grade components with AEC-Q certification",
      "Long-term availability and reliable supply chains",
      "Support with prototyping, design-in, and series transition",
      "Qualified innovative manufacturers and high-reliability components",
    ],
  },
  "Home Appliances & White Goods": {
    intro:
      "As an experienced distributor, we offer a broad portfolio of tested electronic components developed specifically for the requirements of the home appliance industry: durable, compact, energy-efficient, and standards-compliant.",
    applications: [
      "Washing machines and tumble dryers",
      "Refrigerators and freezers",
      "Cooktops, ovens, and microwaves",
      "Coffee machines and small appliances",
      "Vacuum cleaners, air purifiers, and fans",
    ],
    strengthsTitle: "Your advantages at a glance",
    strengths: [
      "Components from leading manufacturers specialized in home appliances",
      "Support with design, selection, and series transition",
      "Components with international approvals such as VDE, UL, and IEC",
      "Energy-efficient solutions",
      "Reliable delivery and long-term availability",
    ],
  },
  HVAC: {
    intro:
      "Modern HVAC systems must operate efficiently, reliably, and in connected environments, whether in residential buildings, industrial plants, or commercial properties. Our high-quality electronic components are precisely matched to heating, ventilation, and air conditioning requirements.",
    applications: [
      "Heating systems and heat pumps",
      "Ventilation technology and air quality systems",
      "Refrigeration and air conditioning technology",
      "Regulation and control systems",
      "Energy efficiency and smart control",
    ],
    strengthsTitle: "Your advantages with us as a partner",
    strengths: [
      "Versatile portfolio for HVAC applications",
      "Components with industrial-grade quality and service life",
      "Technical application support and selection consulting",
      "Flexible logistics solutions and long-term availability",
    ],
  },
  Industrial: {
    intro:
      "Modern industrial plants are connected, automated, and data-driven. Whether sensing, control, drive technology, or industrial communication, powerful electronic components are the foundation for efficiency, safety, and innovation. As an experienced distributor, we deliver robust, long-term available, and quality-tested electronic components for every area of industrial automation.",
    applications: [
      "Automation and control technology",
      "Drive technology and motor control",
      "Industrial communication and IoT",
      "Sensing and measurement technology",
      "Power supply and energy distribution",
    ],
    strengthsTitle: "Your advantages with us",
    strengths: [
      "Industry-proven components from leading manufacturers",
      "Technical consulting for selection and design-in",
      "Long-term availability and obsolescence management",
      "Reliable delivery logistics for series production",
      "Components compliant with industrial and safety standards such as IEC, UL, and ISO 13849",
    ],
  },
  "Medical & Healthcare": {
    intro:
      "In medical technology, every detail matters. Electronic components must meet the highest quality standards, remain available over the long term, and be absolutely reliable, especially for patient-near devices, diagnostic systems, and medical wearables. As a specialized distributor, we support you with tested components, technical know-how, and a clear understanding of regulatory requirements.",
    applications: [
      "Diagnostics",
      "Patient monitoring",
      "Therapy and treatment systems",
      "Laboratory technology and analytical systems",
      "Medical wearables and homecare",
    ],
    strengthsTitle: "Why medical technology customers rely on us",
    strengths: [
      "Components suitable for medical applications, including ISO 13485 and YSI400",
      "Reliable supply chains and traceability with CoC and CoO",
      "Long-term availability for devices with approval cycles",
      "Individual support with selection and design-in",
    ],
  },
  "Renewable Energy": {
    intro:
      "The energy transition needs reliable electronics. Whether solar and wind power systems, battery storage, or intelligent grids, modern energy generation and distribution are based on powerful and efficient electronics. As a specialized distributor, we deliver components that meet these exact requirements: robust, durable, high-performing, and available.",
    applications: [
      "Photovoltaic systems",
      "Wind power systems",
      "Energy storage and battery systems",
      "Smart grid and energy distribution",
      "Off-grid and hybrid systems",
    ],
    strengthsTitle: "Your advantages at a glance",
    strengths: [
      "Components with high temperature and voltage resistance",
      "Long-term availability for durable energy systems",
      "Technical consulting for design-in and system integration",
      "Reliable supply chains for series projects",
    ],
  },
};

export const applications = applicationNames.map((name, index) => ({
  name,
  slug: slugify(name),
  node: `APP-${String(index + 1).padStart(2, "0")}`,
  summary: applicationSummaries[name],
  heroImage: `/images/industries/${slugify(name)}.webp`,
  detail: applicationDetails[name],
}));
