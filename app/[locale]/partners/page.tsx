import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/motion/MotionProvider";
import { normalizeLocale } from "@/data/localizedContent";
import { getTranslations, setRequestLocale } from "next-intl/server";

const metadataCopy = {
  en: {
    title: "Strategic Partners — brückenbauer GmbH",
    description: "Collaborations in advanced AI products, microelectronics, and electric devices.",
  },
  de: {
    title: "Strategische Partner — brückenbauer GmbH",
    description: "Kooperationen in fortschrittlichen KI-Produkten, Mikroelektronik und elektrischen Geräten.",
  },
  fr: {
    title: "Partenaires stratégiques — brückenbauer GmbH",
    description: "Collaborations autour des produits IA avancés, de la microélectronique et des dispositifs électriques.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metadataCopy[normalizeLocale(locale)];
}

export default async function PartnersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "PartnersPage" });

  const partners = [
    {
      id: "CENSRAY",
      name: "Censray",
      logo: "/images/partners/censray.jpeg",
      type: t("technology_partner"),
      description: t("censray_desc"),
    },
    {
      id: "IYAKSH",
      name: "iYAKSH Robotics",
      logo: "/images/partners/iyaksh.jpeg",
      type: t("innovation_partner"),
      description: t("iyaksh_desc"),
    },
    {
      id: "SUNTEK",
      name: "Suntek",
      logo: "/images/partners/suntek-logo.jpeg",
      type: t("strategic_partner"),
      description: t("suntek_desc"),
    },
  ];

  return (
    <PageShell className="min-h-screen px-margin-mobile pb-24 pt-32 md:ml-20 md:px-margin-desktop">
      <div className="max-w-6xl">
        <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
          {t("label")}
        </span>
        <h1 className="mt-6 max-w-4xl font-mono text-headline-lg-mobile uppercase leading-tight text-on-surface md:text-headline-lg">
          {t("title")}
        </h1>
        <p className="mt-6 max-w-3xl font-mono text-technical-md leading-relaxed text-on-surface-variant">
          {t("intro")}
        </p>

        <div className="mt-12 grid gap-gutter lg:grid-cols-3">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="reticle-corners group relative overflow-hidden border border-graphite-muted bg-surface-container-low/45 p-6 transition-colors duration-300 hover:border-industrial-silver hover:bg-surface-container-low/70"
            >
              <div className="relative aspect-[16/7] w-full overflow-hidden border border-graphite-muted bg-white shadow-inner">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  fill
                  className="object-contain p-6 grayscale transition-all duration-500 group-hover:grayscale-0"
                  priority={partner.id === "CENSRAY"}
                />
              </div>
              <div className="mt-6 flex flex-col items-start gap-3 border-b border-graphite-muted pb-4 xl:flex-row xl:items-center xl:justify-between xl:gap-4">
                <h2 className="font-mono text-technical-md uppercase text-industrial-silver">
                  {partner.name}
                </h2>
                <span className="shrink-0 border border-warning-red/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-warning-red">
                  {partner.type}
                </span>
              </div>
              <p className="mt-5 font-mono text-data-sm uppercase leading-relaxed text-on-surface-variant">
                {partner.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
