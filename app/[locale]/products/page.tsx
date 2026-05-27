import Link from "next/link";
import { PageShell } from "@/components/motion/MotionProvider";
import { ThemedProductImage } from "@/components/product/ThemedProductImage";
import { productTaxonomy } from "@/data/productTaxonomy";
import { products } from "@/data/products";

export default function ProductsPage() {
  return (
    <PageShell className="min-h-screen px-margin-mobile pb-24 pt-32 md:ml-20 md:px-margin-desktop">
      <div className="mb-12">
        <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
          Component Portfolio 2025
        </span>
        <h1 className="mt-4 font-mono text-headline-lg-mobile uppercase text-industrial-silver sm:text-headline-lg md:text-display-xl">
          Product Groups
        </h1>
        <p className="mt-6 max-w-3xl font-mono text-technical-md text-on-surface-variant">
          Upper-category archive from the component portfolio. Select a dossier group to inspect
          product-level parts, imagery, and technical metadata.
        </p>
      </div>
      <nav
        className="grid grid-cols-1 gap-gutter md:grid-cols-2 xl:grid-cols-4"
        aria-label="Product categories"
      >
        {productTaxonomy.map((category) => (
          <Link
            key={category.slug}
            href={`/products/${category.slug}`}
            className="reticle-corners group relative overflow-hidden border border-graphite-muted bg-surface-container-low/50 p-5 backdrop-blur-xl transition-colors hover:border-industrial-silver focus-visible:border-warning-red focus-visible:outline-none"
          >
            <div className="relative mb-6 aspect-[4/3] overflow-hidden border border-graphite-muted bg-surface-container-lowest">
              <ThemedProductImage
                src={category.image}
                darkSrc={category.imageDark}
                alt=""
                sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-102"
              />
            </div>
            <div className="flex items-center justify-between gap-4 font-mono text-label-xs uppercase tracking-[0.16em] text-warning-red">
              <span>{category.code}</span>
              <span>
                {products
                  .filter((product) => product.group === category.name)
                  .length.toString()
                  .padStart(2, "0")}{" "}
                items
              </span>
            </div>
            <h2 className="product-card-title mt-4 break-words font-mono uppercase text-on-surface">
              {category.name}
            </h2>
            <p className="mt-4 font-mono text-data-sm uppercase text-on-surface-variant">
              {category.description}
            </p>
          </Link>
        ))}
      </nav>
    </PageShell>
  );
}
