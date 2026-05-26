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
  { description: string; image: string; imageDark?: string }
> = {
  "Temperature Sensors": {
    description: "NTC, thermistor, thermocouple, and custom high-temperature sensing assemblies.",
    image: "/images/product-groups/temperature-sensors-cover.png",
    imageDark: "/images/products-premium/dark/chip-ntc-thermistors.png",
  },
  "Pressure & Flow Sensors": {
    description:
      "Pressure transmitters, ultrasonic flow meters, gas sensors, gauges, and level telemetry.",
    image: "/images/product-groups/pressure-flow-sensors-cover.png",
    imageDark: "/images/products-premium/dark/pressure-sensors-transmitters.png",
  },
  "Current & Position Sensors": {
    description:
      "Clamp-on current sensing and rotary, encoder, and potentiometer position platforms.",
    image: "/images/product-groups/current-position-sensors-cover.png",
    imageDark: "/images/products-premium/dark/current-sensors.png",
  },
  "Electromagnetic Compatibility (EMC)": {
    description:
      "Chokes, filters, inductors, and transformers for controlled electromagnetic behavior.",
    image: "/images/product-groups/emc-components-cover.png",
    imageDark: "/images/products-premium/dark/filters.png",
  },
  "Power Management": {
    description:
      "IGBT, SiC, MOSFET, converter, and power supply components for engineered systems.",
    image: "/images/product-groups/power-management-cover.png",
    imageDark: "/images/products-premium/dark/mosfet.png",
  },
  Passives: {
    description: "Resistors, capacitors, MLCC packages, and quartz timing components.",
    image: "/images/product-groups/passives-cover.png",
    imageDark: "/images/products-premium/dark/mlcc-capacitors.png",
  },
  Electromechanics: {
    description:
      "Connectors, cables, ventilation, card readers, sockets, and wireless interface hardware.",
    image: "/images/product-groups/electromechanics-cover.png",
    imageDark: "/images/products-premium/dark/connectors.png",
  },
  Acoustics: {
    description:
      "Buzzers, microphones, receivers, speakers, piezos, and magnetic acoustic transducers.",
    // No premium dark asset for acoustics — light cover used for both modes
    image: "/images/product-groups/acoustics-cover.png",
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
