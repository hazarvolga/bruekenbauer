import { slugify } from "@/lib/slug";

export const productGroups = [
  "Temperature Sensors",
  "Pressure & Flow Sensors",
  "Current & Position Sensors",
  "Electromagnetic Compatibility (EMC)",
  "Power Management",
  "Passives",
  "Electromechanics",
  "Acoustics",
] as const;

export type ProductGroup = (typeof productGroups)[number];

const categoryMeta: Record<
  ProductGroup,
  { description: string; image: string }
> = {
  "Temperature Sensors": {
    description: "NTC, thermistor, thermocouple, and custom high-temperature sensing assemblies.",
    image: "/images/product-groups-premium/dark/temperature-sensors-cover.webp",
  },
  "Pressure & Flow Sensors": {
    description:
      "Pressure transmitters, ultrasonic flow meters, gas sensors, gauges, and level telemetry.",
    image: "/images/product-groups-premium/dark/pressure-flow-sensors-cover.webp",
  },
  "Current & Position Sensors": {
    description:
      "Clamp-on current sensing and rotary, encoder, and potentiometer position platforms.",
    image: "/images/product-groups-premium/dark/current-position-sensors-cover.webp",
  },
  "Electromagnetic Compatibility (EMC)": {
    description:
      "Chokes, filters, inductors, and transformers for controlled electromagnetic behavior.",
    image: "/images/product-groups-premium/dark/emc-components-cover.webp",
  },
  "Power Management": {
    description:
      "IGBT, SiC, MOSFET, converter, and power supply components for engineered systems.",
    image: "/images/product-groups-premium/dark/power-management-cover.webp",
  },
  Passives: {
    description: "Resistors, capacitors, MLCC packages, and quartz timing components.",
    image: "/images/product-groups-premium/dark/passives-cover.webp",
  },
  Electromechanics: {
    description:
      "Connectors, cables, ventilation, card readers, sockets, and wireless interface hardware.",
    image: "/images/product-groups-premium/dark/electromechanics-cover.webp",
  },
  Acoustics: {
    description:
      "Buzzers, microphones, receivers, speakers, piezos, and magnetic acoustic transducers.",
    // No premium dark asset for acoustics — light cover used for both modes
    image: "/images/product-groups-premium/dark/acoustics-cover.webp",
  },
};

export const productTaxonomy = productGroups.map((name) => ({
  name,
  slug: slugify(name),
  code: name
    .replace(/[()&]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .toUpperCase(),
  ...categoryMeta[name],
}));
