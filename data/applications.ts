import { slugify } from "@/lib/slug";

export const applicationNames = [
  "AEROSPACE & AVIATION",
  "Automotive & Transportation",
  "INDUSTRIAL AUTOMATION",
  "Solar PV & BESS",
  "Home Appliances",
  "Medical & Healthcare",
] as const;

export type ApplicationName = (typeof applicationNames)[number];

const applicationSummaries: Record<ApplicationName, string> = {
  "AEROSPACE & AVIATION":
    "High-stress component resilience for avionics, orbital subsystems, and EMI-sensitive defense assemblies.",
  "Automotive & Transportation":
    "Qualified component supply for vehicle platforms, charging systems, mobility electronics, and transport infrastructure.",
  "INDUSTRIAL AUTOMATION":
    "Precision supply programs for regulated industrial environments with demanding thermal, acoustic, and lifecycle constraints.",
  "Solar PV & BESS":
    "Power conversion, sensing, and thermal-control components for photovoltaic, storage, wind, and grid-support systems.",
  "Home Appliances":
    "Lifecycle-ready component supply for appliance electronics, motor control, sensing, and protected power delivery.",
  "Medical & Healthcare":
    "Traceable component supply for healthcare devices, diagnostic equipment, and regulated electronic assemblies.",
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
  "AEROSPACE & AVIATION": {
    intro:
      "Aerospace and aviation programs place exceptionally strict demands on quality, safety, and traceability. As a specialized distributor, we deliver tested, qualified, and long-term available electronic components for use in extreme environments.",
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
  "INDUSTRIAL AUTOMATION": {
    intro:
      "Modern industrial and building automation plants are connected, automated, and data-driven. Whether sensing, control, drive technology, or communication, powerful electronic components are the foundation for efficiency, safety, and innovation. We deliver robust, long-term available, and quality-tested electronic components for every area of industrial automation.",
    applications: [
      "Automation and control technology",
      "Drive technology and motor control",
      "Industrial communication and IoT",
      "Sensing and measurement technology",
      "Heating, ventilation, and air conditioning (HVAC) integration",
      "Smart metering and energy management",
    ],
    strengthsTitle: "Why our customers trust us",
    strengths: [
      "Industry-proven components from leading manufacturers",
      "Technical consulting for selection and design-in",
      "Long-term availability and obsolescence management",
      "Reliable delivery logistics for series production",
      "Components compliant with industrial and safety standards such as IEC, UL, and ISO 13849",
    ],
  },
  "Solar PV & BESS": {
    intro:
      "Modern energy systems and electromobility transition need reliable electronics. Whether charging infrastructure, solar systems, battery storage, or intelligent grids, modern generation and distribution are based on powerful electronics. As a specialized distributor, we deliver components that meet these exact requirements: robust, durable, and high-performing.",
    applications: [
      "Photovoltaic systems and inverters",
      "Energy storage systems (BESS)",
      "Battery management systems (BMS)",
      "Onboard chargers and charging infrastructure",
      "Off-grid and hybrid grid-support systems",
    ],
    strengthsTitle: "Why customers rely on us",
    strengths: [
      "Components with high temperature and voltage resistance",
      "Broad portfolio of automotive-grade components with AEC-Q certification",
      "Long-term availability for durable energy and mobility systems",
      "Support with prototyping, design-in, and series transition",
    ],
  },
  "Home Appliances": {
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
};

export const applications = applicationNames.map((name, index) => ({
  name,
  slug: slugify(name),
  node: `APP-${String(index + 1).padStart(2, "0")}`,
  summary: applicationSummaries[name],
  heroImage: `/images/industries/${slugify(name)}.webp`,
  detail: applicationDetails[name],
}));
