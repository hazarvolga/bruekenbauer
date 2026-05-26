import type { ApplicationName } from "./applications";

export type PowerManagementSlug = "igbt" | "sic" | "mosfet" | "converters";

export type PowerManagementFamily = {
  slug: PowerManagementSlug;
  name: string;
  label: string;
  image: string;
  summary: string;
  variants: string[];
  performance: {
    parameter: string;
    specification: string;
    standard: string;
  }[];
  sellingPoints: string[];
  targetApplications: {
    label: string;
    applicationName: ApplicationName;
  }[];
};

export const powerManagementMetrics = [
  "Voltage Classes: 650 V / 1200 V",
  "Current Ratings: 10 A to 600 A",
  "Standards: IEC / JEDEC / UL",
];

export const powerManagementStandards = [
  "IEC 60747-2",
  "IEC 60747-9",
  "JEDEC JESD51",
  "JEDEC JESD22",
  "JEDEC JESD95",
  "IEC 62368-1",
  "UL 62368-1",
  "CISPR 32",
];

export const powerManagementFamilies: PowerManagementFamily[] = [
  {
    slug: "igbt",
    name: "IGBT",
    label: "Insulated Gate Bipolar Transistor",
    image: "/images/products-premium/dark/igbt.png",
    summary:
      "High-density switching modules for industrial drives, automotive systems, renewable energy, and appliance platforms.",
    variants: ["Half Bridge", "3 Phase Bridge", "SiC Module"],
    performance: [
      {
        parameter: "Voltage Classes",
        specification: "650 V, 1200 V",
        standard: "IEC 60747-2",
      },
      {
        parameter: "Current Ratings",
        specification: "10 A to 600 A",
        standard: "IEC 60747-2 / JEDEC JESD51",
      },
      {
        parameter: "Switching Frequency",
        specification: "High switching speeds for efficient IGBT circuits",
        standard: "IEC 60747-2 dynamic switching test",
      },
      {
        parameter: "Power Loss",
        specification: "Minimal switching losses for high efficiency",
        standard: "IEC 60747-2 / JEDEC JESD51",
      },
      {
        parameter: "Materials",
        specification: "High-quality materials for long service life and reliability",
        standard: "JEDEC JESD22 reliability tests",
      },
    ],
    sellingPoints: [
      "High Power Density",
      "Reliability",
      "Wide Application Range",
      "Low Losses",
      "Ease of Use",
    ],
    targetApplications: [
      { label: "Industrial Drives", applicationName: "Industrial" },
      { label: "Automotive", applicationName: "Automotive & Transportation" },
      { label: "Renewable Energy", applicationName: "Renewable Energy" },
      { label: "Home Appliances", applicationName: "Home Appliances & White Goods" },
    ],
  },
  {
    slug: "sic",
    name: "SiC MOSFET",
    label: "Silicon carbide switching architecture",
    image: "/images/products-premium/dark/sic.png",
    summary:
      "Thermally resilient silicon-carbide devices for compact, efficient, high-frequency power conversion.",
    variants: ["Half Bridge", "Power Diodes", "3 Phase"],
    performance: [
      {
        parameter: "Low on-resistance",
        specification: "Minimizes conduction losses and increases application efficiency",
        standard: "JEDEC JESD236",
      },
      {
        parameter: "High switching frequencies",
        specification: "Enable smaller and lighter designs",
        standard: "JEDEC JESD24 / IEC 60747-9",
      },
      {
        parameter: "Low switching losses",
        specification: "Reduce heat generation and improve energy efficiency",
        standard: "IEC 60747-9 / JEDEC JESD24",
      },
      {
        parameter: "High breakdown voltage",
        specification: "Ensures safe and reliable operation",
        standard: "IEC 60747-9 / JEDEC JESD29",
      },
      {
        parameter: "High operating temperature",
        specification: "Suitable for use in demanding environments",
        standard: "JEDEC JESD22-A103 / JESD22-A108",
      },
    ],
    sellingPoints: [
      "Higher Efficiency",
      "Improved Thermal Performance",
      "Smaller and Lighter Designs",
      "Faster Switching Times",
    ],
    targetApplications: [
      { label: "E-mobility", applicationName: "E-Mobility & Battery Management" },
      { label: "Industrial Automation", applicationName: "Industrial" },
      { label: "Renewable Energy", applicationName: "Renewable Energy" },
      { label: "Power Electronics", applicationName: "Industrial" },
    ],
  },
  {
    slug: "mosfet",
    name: "MOSFET",
    label: "Metal-oxide-semiconductor field-effect transistor",
    image: "/images/products-premium/dark/mosfet.png",
    summary:
      "Discrete and bare-die MOSFET options for scalable low and medium power switching designs.",
    variants: ["Rectifiers", "MOSFET Modules", "Power Diodes"],
    performance: [
      {
        parameter: "Voltage range - Discrete",
        specification: "20 V to 45 V",
        standard: "IEC 60747-2",
      },
      {
        parameter: "Package types - Discrete",
        specification: "Depending on the model, e.g. TO-220 or TO-252",
        standard: "JEDEC JESD95",
      },
      {
        parameter: "Voltage range - Bare-Die",
        specification: "30 V to 45 V",
        standard: "JESD22-A108 / IEC 60747-9",
      },
      {
        parameter: "Compact design - Bare-Die",
        specification: "Ideal for space-constrained applications",
        standard: "JEDEC JESD95",
      },
    ],
    sellingPoints: [
      "High Switching Speed",
      "High Efficiency",
      "Scalability",
      "Low Drive Power",
      "Good Thermal Stability",
      "Efficient at low/medium power and high frequency",
    ],
    targetApplications: [
      { label: "Drive Technology", applicationName: "Industrial" },
      { label: "Welding Technology", applicationName: "Industrial" },
      { label: "Wind Turbines", applicationName: "Renewable Energy" },
      { label: "Power Electronics", applicationName: "Industrial" },
      { label: "Photovoltaic Systems", applicationName: "Renewable Energy" },
    ],
  },
  {
    slug: "converters",
    name: "Converters",
    label: "Regulated power interfaces",
    image: "/images/products-premium/dark/converters.png",
    summary: "AC/DC, DC/DC, power supply, and plug converter options for protected power delivery.",
    variants: ["AC/DC", "DC/DC", "Power Supply", "Plug Converters"],
    performance: [
      {
        parameter: "Output Voltage Accuracy",
        specification: "Maintains stable output across input voltage and load range",
        standard: "IEC 62368-1 / UL 62368-1 / IEC 61204-3",
      },
      {
        parameter: "Efficiency",
        specification: "High energy conversion efficiency",
        standard: "IEC 62301 / EN 50563",
      },
      {
        parameter: "Ripple and Noise",
        specification: "Low output ripple and noise for sensitive loads",
        standard: "CISPR 32 / EN 55032",
      },
      {
        parameter: "Short-Circuit Protection",
        specification: "Prevents damage under shorted output conditions",
        standard: "IEC 62368-1 / UL 62368-1",
      },
      {
        parameter: "Overload Protection",
        specification: "Safely handles overcurrent events",
        standard: "IEC 62368-1 / UL 62368-1",
      },
    ],
    sellingPoints: [
      "Broad Industry Coverage",
      "Flexible Product Range",
      "High Reliability and Safety",
      "Optimized for Sensitive Loads",
      "Energy Efficiency and Protection",
    ],
    targetApplications: [
      { label: "Photovoltaic Energy Storage", applicationName: "Renewable Energy" },
      { label: "Railway Transportation", applicationName: "Automotive & Transportation" },
      { label: "Industrial Control and ICT", applicationName: "Industrial" },
      { label: "Medical Applications", applicationName: "Medical & Healthcare" },
      { label: "LED Lighting Applications", applicationName: "Building Automation" },
    ],
  },
];
