import Link from "next/link";
import { ThemedProductImage } from "@/components/product/ThemedProductImage";
import type { Metadata } from "next";
import { PageShell } from "@/components/motion/MotionProvider";
import { applications } from "@/data/applications";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Application Sectors | brüeckenbauer GmbH",
  description:
    "Customized electronic component application sectors for aerospace, automotive, e-mobility, industrial automation, medical, HVAC, renewable energy, and building systems.",
};

export default function IndustriesPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = useTranslations("IndustriesPage");

  return (
    <PageShell className="min-h-screen px-margin-mobile pb-24 pt-32 md:ml-20 md:px-margin-desktop">
      <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
        {t("label")}
      </span>
      <h1 className="mt-5 max-w-5xl font-mono text-headline-lg-mobile uppercase text-on-surface md:text-display-xl">
        {t("title")}
      </h1>
      <section className="mt-10 grid gap-gutter border-y border-graphite-muted py-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
            {t("section_label")}
          </div>
          <h2 className="mt-4 max-w-md font-mono text-headline-lg-mobile uppercase text-industrial-silver md:text-headline-lg">
            {t("section_title")}
          </h2>
        </div>
        <div className="min-w-0 lg:col-span-7 lg:col-start-6">
          <p className="max-w-none font-mono text-technical-md uppercase leading-normal text-on-surface-variant">
            {t("description")}
          </p>
          <div className="mt-6 border-l border-warning-red pl-5 font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
            {t("in_use_label")}
          </div>
        </div>
      </section>
      <div className="mt-12 grid gap-gutter md:grid-cols-2 xl:grid-cols-4">
        {applications.map((app, index) => (
          <Link
            key={app.slug}
            href={`/industries/${app.slug}`}
            className="reticle-corners group relative min-h-[340px] overflow-hidden border border-graphite-muted bg-surface-container-low/40 p-6 transition-all duration-500 ease-out hover:border-warning-red hover:bg-surface-container-low/65"
          >
            <div className="relative z-10 transition-transform duration-700 ease-out group-hover:-translate-y-8">
              <div className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red transition-opacity duration-500 ease-out group-hover:opacity-0">
                {app.node}
              </div>
              <h2 className="mt-5 font-mono text-technical-md uppercase text-industrial-silver">
                {app.name}
              </h2>
              <p className="mt-5 font-mono text-data-sm uppercase text-outline">{app.summary}</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-28 overflow-hidden transition-all duration-700 ease-out group-hover:h-36">
              <ThemedProductImage
                src={app.heroImage}
                alt=""
                sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
              />
            </div>
            <span className="absolute bottom-4 right-5 z-10 font-mono text-data-sm text-outline">
              {String(index + 1).padStart(2, "0")}
            </span>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
