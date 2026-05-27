import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductGrid } from "@/components/product/ProductGrid";
import { PageShell } from "@/components/motion/MotionProvider";
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
  const category = productTaxonomy.find((c) => c.slug === categorySlug);

  if (!category) {
    notFound();
  }

  const filtered = products.filter((p) => p.group === category.name);
  const tDesc = await getTranslations("ProductDescriptions");
  const tTitles = await getTranslations("CategoryTitles");

  return (
    <PageShell className="min-h-screen px-margin-mobile pb-24 pt-32 md:ml-20 md:px-margin-desktop">
      <Link
        href="/products"
        className="font-mono text-label-xs uppercase tracking-[0.18em] text-outline hover:text-warning-red"
      >
        Back to product groups
      </Link>
      <h1 className="mt-6 max-w-5xl font-mono text-headline-lg-mobile uppercase text-on-surface md:text-headline-lg">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {tTitles(category.slug as any)}
      </h1>
      <p className="mt-4 max-w-3xl font-mono text-technical-md text-on-surface-variant">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {tDesc(category.slug as any)}
      </p>
      <div className="mt-6 font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
        {filtered.length.toString().padStart(2, "0")} portfolio items
      </div>
      <div className="mt-12">
        <ProductGrid products={filtered} />
      </div>
    </PageShell>
  );
}
