import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { productTaxonomy } from "@/data/productTaxonomy";
import { applications } from "@/data/applications";
import { powerManagementFamilies } from "@/data/powerManagement";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brueckenbauer.de";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: BASE_URL, priority: 1.0, changeFrequency: "weekly" },
  { url: `${BASE_URL}/products`, priority: 0.9, changeFrequency: "weekly" },
  { url: `${BASE_URL}/industries`, priority: 0.9, changeFrequency: "weekly" },
  { url: `${BASE_URL}/about`, priority: 0.7, changeFrequency: "monthly" },
  { url: `${BASE_URL}/contact`, priority: 0.8, changeFrequency: "monthly" },
  { url: `${BASE_URL}/rfq`, priority: 0.8, changeFrequency: "monthly" },
  { url: `${BASE_URL}/oem-supply`, priority: 0.7, changeFrequency: "monthly" },
  { url: `${BASE_URL}/logistics`, priority: 0.6, changeFrequency: "monthly" },
  { url: `${BASE_URL}/compliance`, priority: 0.6, changeFrequency: "monthly" },
  { url: `${BASE_URL}/documents`, priority: 0.5, changeFrequency: "monthly" },
  { url: `${BASE_URL}/search`, priority: 0.7, changeFrequency: "weekly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/product/${p.slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  const categoryRoutes: MetadataRoute.Sitemap = productTaxonomy.map((c) => ({
    url: `${BASE_URL}/products/${c.slug}`,
    priority: 0.8,
    changeFrequency: "weekly",
  }));

  const industryRoutes: MetadataRoute.Sitemap = applications.map((a) => ({
    url: `${BASE_URL}/industries/${a.slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  const powerManagementRoutes: MetadataRoute.Sitemap = powerManagementFamilies.map((family) => ({
    url: `${BASE_URL}/power-management/${family.slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  return [
    ...staticRoutes,
    ...productRoutes,
    ...categoryRoutes,
    ...industryRoutes,
    ...powerManagementRoutes,
  ];
}
