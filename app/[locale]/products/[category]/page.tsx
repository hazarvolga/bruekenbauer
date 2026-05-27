import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductGrid } from "@/components/product/ProductGrid";
import { PageShell } from "@/components/motion/MotionProvider";
import { productTaxonomy } from "@/data/productTaxonomy";
import { products } from "@/data/products";

export function generateStaticParams() {
  return productTaxonomy.map((category) => ({ category: category.slug }));
}

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = productTaxonomy.find((item) => item.slug === categorySlug);
  if (!category) notFound();
  const filtered = products.filter((product) => product.group === category.name);

  return (
    <PageShell className="min-h-screen px-margin-mobile pb-24 pt-32 md:ml-20 md:px-margin-desktop">
      <Link
        href="/products"
        className="font-mono text-label-xs uppercase tracking-[0.18em] text-outline hover:text-warning-red"
      >
        Back to product groups
      </Link>
      <h1 className="mt-6 max-w-5xl font-mono text-headline-lg-mobile uppercase text-on-surface md:text-headline-lg">
        {category.name}
      </h1>
      <p className="mt-4 max-w-3xl font-mono text-technical-md text-on-surface-variant">
        {category.description}
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
