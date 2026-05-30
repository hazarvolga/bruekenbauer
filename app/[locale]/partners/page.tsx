import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/motion/MotionProvider";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Strategic Partners — brückenbauer GmbH",
  description: "Collaborations in advanced AI products, microelectronics, and electric devices.",
};

export default async function PartnersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "PartnersPage" });

  const partners = [
    {
      id: "CENSRAY",
      name: "Censray",
      logo: "/images/partners/censray.jpeg",
      aspect: "853/334",
    },
    {
      id: "IYAKSH",
      name: "Iyaksh",
      logo: "/images/partners/iyaksh.jpeg",
      aspect: "1118/462",
    },
  ];

  return (
    <PageShell className="min-h-screen px-margin-mobile pb-24 pt-32 md:ml-20 md:px-margin-desktop">
      <div className="max-w-6xl">
        <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
          {t("label")}
        </span>
        
        <div className="mt-8 space-y-10">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="reticle-corners group relative overflow-hidden border border-graphite-muted bg-surface-container-low/40 p-1.5 transition-all duration-300 hover:border-warning-red hover:bg-surface-container-low/60 w-full max-w-[480px]"
            >
              <div 
                className="relative w-full overflow-hidden bg-white shadow-inner"
                style={{ aspectRatio: partner.aspect }}
              >
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  fill
                  className="object-contain p-0 grayscale transition-all duration-500 group-hover:grayscale-0"
                  priority={partner.id === "CENSRAY"}
                />
              </div>
            </div>
          ))}
        </div>

        <h1 className="mt-16 font-mono text-headline-lg-mobile uppercase text-on-surface md:text-headline-lg max-w-4xl leading-tight">
          {t("title")}
        </h1>
      </div>
    </PageShell>
  );
}
