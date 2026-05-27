import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductGrid } from "@/components/product/ProductGrid";
import { PageShell } from "@/components/motion/MotionProvider";
import {
  getLocalizedProducts,
  getProductGroupCopy,
  localizePath,
  normalizeLocale,
} from "@/data/localizedContent";
import { productTaxonomy } from "@/data/productTaxonomy";
import { products } from "@/data/products";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateStaticParams() {
  return productTaxonomy.map((category) => ({ category: category.slug }));
}

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ category: string; locale: string }>;
}) {
  const { category: categorySlug, locale } = await params;
  setRequestLocale(locale);
  const normalizedLocale = normalizeLocale(locale);
  const category = productTaxonomy.find((c) => c.slug === categorySlug);

  if (!category) {
    notFound();
  }

  const filtered = getLocalizedProducts(
    products.filter((p) => p.group === category.name),
    normalizedLocale
  );
  const copy = getProductGroupCopy(normalizedLocale, category.name);
  const t = await getTranslations("ProductsPage");

  return (
    <PageShell className="min-h-screen px-margin-mobile pb-24 pt-32 md:ml-20 md:px-margin-desktop">
      <Link
        href={localizePath(normalizedLocale, "/products")}
        className="font-mono text-label-xs uppercase tracking-[0.18em] text-outline hover:text-warning-red"
      >
        {normalizedLocale === "de"
          ? "Zurück zu Produktgruppen"
          : normalizedLocale === "fr"
            ? "Retour aux groupes de produits"
            : "Back to product groups"}
      </Link>
      <h1 className="mt-6 max-w-5xl font-mono text-headline-lg-mobile uppercase text-on-surface md:text-headline-lg">
        {copy.title}
      </h1>
      <p className="mt-4 max-w-3xl font-mono text-technical-md text-on-surface-variant">
        {copy.description}
      </p>
      <div className="mt-6 font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
        {filtered.length.toString().padStart(2, "0")} {t("items")}
      </div>
      <div className="mt-12">
        <ProductGrid products={filtered} locale={normalizedLocale} />
      </div>
    </PageShell>
  );
}
