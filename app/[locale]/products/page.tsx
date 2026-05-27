import Link from "next/link";
import { PageShell } from "@/components/motion/MotionProvider";
import { ThemedProductImage } from "@/components/product/ThemedProductImage";
import { productTaxonomy } from "@/data/productTaxonomy";
import { products } from "@/data/products";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ProductsPage");
  const tShortDesc = await getTranslations("ProductShortDescriptions");
  const tTitles = await getTranslations("CategoryTitles");

  return (
    <PageShell className="min-h-screen px-margin-mobile pb-24 pt-32 md:ml-20 md:px-margin-desktop">
      <div className="mb-12">
        <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
          {t("label")}
        </span>
        <h1 className="mt-4 font-mono text-headline-lg-mobile uppercase text-industrial-silver sm:text-headline-lg md:text-display-xl">
          {t("title")}
        </h1>
        <p className="mt-6 max-w-3xl font-mono text-technical-md text-on-surface-variant">
          {t("description")}
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
                darkSrc={(category as Record<string, string>).imageDark}
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
                {t("items")}
              </span>
            </div>
            <h2 className="product-card-title mt-4 break-words font-mono uppercase text-on-surface">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {tTitles(category.slug as any)} 
            </h2>
            <p className="mt-4 font-mono text-data-sm text-on-surface-variant">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {tShortDesc(category.slug as any)}
            </p>
          </Link>
        ))}
      </nav>
    </PageShell>
  );
}
