import type { RfqRequest } from "@/app/api/rfq/route";
import { products } from "@/data/products";
import { powerManagementFamilies } from "@/data/powerManagement";

export type RfqInitialContext = Partial<
  Pick<
    RfqRequest,
    | "source"
    | "productSlug"
    | "familySlug"
    | "productGroup"
    | "productFamily"
    | "applicationSector"
    | "leadTime"
    | "notes"
  >
>;

export type RfqContextParams = {
  productSlug?: string;
  familySlug?: string;
  applicationSector?: string;
  legacyProduct?: string;
};

export function resolveRfqContext(params: RfqContextParams): RfqInitialContext | undefined {
  const explicitFamilySlug = params.familySlug;
  const explicitProductSlug = params.productSlug;
  const legacyProduct = params.legacyProduct;

  if (explicitFamilySlug) {
    const powerFamily = powerManagementFamilies.find(
      (family) => family.slug === explicitFamilySlug
    );
    if (powerFamily) return resolvePowerFamily(powerFamily, params.applicationSector);
  }

  if (explicitProductSlug) {
    const product = products.find((item) => item.slug === explicitProductSlug);
    if (product) return resolveProduct(product, params.applicationSector);
  }

  if (legacyProduct) {
    const product = products.find((item) => item.slug === legacyProduct);
    if (product) return resolveProduct(product, params.applicationSector);

    const powerFamily = powerManagementFamilies.find((family) => family.slug === legacyProduct);
    if (powerFamily) return resolvePowerFamily(powerFamily, params.applicationSector);
  }

  if (params.applicationSector) {
    return {
      source: "application-sector",
      applicationSector: params.applicationSector,
    };
  }

  return undefined;
}

function resolvePowerFamily(
  powerFamily: (typeof powerManagementFamilies)[number],
  applicationSector?: string
): RfqInitialContext {
  return {
    source: "power-family",
    familySlug: powerFamily.slug,
    productGroup: "Power Management",
    productFamily: powerFamily.name,
    applicationSector: applicationSector ?? powerFamily.targetApplications[0]?.applicationName,
    notes: `${powerFamily.name} / ${powerFamily.label}`,
  };
}

function resolveProduct(
  product: (typeof products)[number],
  applicationSector?: string
): RfqInitialContext {
  return {
    source: "product",
    productSlug: product.slug,
    productGroup: product.group,
    productFamily: product.name,
    applicationSector: applicationSector ?? product.applications[0],
    leadTime: product.leadTime,
    notes: `${product.partNumber} / ${product.name}`,
  };
}
