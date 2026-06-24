import Link from "next/link";
import Image from "next/image";
import { PageShell } from "@/components/motion/MotionProvider";
import { getProductGroupCopy, localizePath } from "@/data/localizedContent";
import { productTaxonomy } from "@/data/productTaxonomy";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ProductsPage");

  return (
    <PageShell className="min-h-screen px-margin-mobile pb-24 pt-32 md:ml-20 md:px-margin-desktop">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="mb-12">
          <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
            {t("label")}
          </span>
          <h1 className="mt-4 max-w-5xl font-mono text-[38px] uppercase leading-[1.12] text-industrial-silver sm:text-[56px] md:text-[72px] lg:text-[84px]">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-3xl font-mono text-technical-md leading-relaxed text-on-surface-variant">
            {t("description")}
          </p>
        </div>
        <nav
          className="grid grid-cols-1 gap-gutter md:grid-cols-2 xl:grid-cols-3"
          aria-label={t("category_label")}
        >
          {productTaxonomy.map((category) => {
            const copy = getProductGroupCopy(locale, category.name);
            return (
              <Link
                key={category.slug}
                href={localizePath(locale, `/products/${category.slug}`)}
                aria-label={`${t("explore_category")}: ${copy.title}`}
                className="reticle-corners group relative flex min-h-full flex-col overflow-hidden border border-graphite-muted bg-surface-container-low/50 p-6 backdrop-blur-xl transition-colors hover:border-industrial-silver hover:bg-surface-container-low/75 focus-visible:border-warning-red focus-visible:outline-none"
              >
                <div className="relative mb-6 aspect-[4/3] overflow-hidden border border-graphite-muted bg-surface-container-lowest">
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="(min-width: 1800px) 500px, (min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="scale-[0.98] object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
                  />
                </div>
                <span className="font-mono text-label-xs uppercase tracking-[0.16em] text-warning-red">
                  {t("category_label")}
                </span>
                <h2 className="product-card-title mt-3 break-words font-mono uppercase text-on-surface">
                  {copy.title}
                </h2>
                <p className="mt-4 break-words font-mono text-[12px] leading-relaxed text-on-surface-variant md:text-data-sm">
                  {copy.shortDescription}
                </p>
                <span className="mt-6 inline-flex w-fit items-center border border-graphite-muted px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-industrial-silver transition-colors group-hover:border-warning-red group-hover:text-warning-red">
                  {t("explore_category")} <span aria-hidden="true">-&gt;</span>
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </PageShell>
  );
}
