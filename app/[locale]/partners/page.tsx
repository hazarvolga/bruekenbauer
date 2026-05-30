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
      tagline: "Advanced AI Acceleration & Compute Systems",
      desc: t("censray_desc"),
      specs: {
        domain: "Edge AI / Neural Processing Units",
        founded: "2023",
        status: "Strategic Alliance",
        focus: "AI computing, deep learning accelerators, high-density silicon architectures",
      },
    },
    {
      id: "IYAKSH",
      name: "Iyaksh",
      logo: "/images/partners/iyaksh.jpeg",
      tagline: "High-Performance Power & Electrical Engineering",
      desc: t("iyaksh_desc"),
      specs: {
        domain: "Power Conversion / Grid Peripherals",
        founded: "2021",
        status: "Technology Partner",
        focus: "Heavy industrial power grids, high-voltage switching, battery monitoring",
      },
    },
  ];

  return (
    <PageShell className="min-h-screen px-margin-mobile pb-24 pt-32 md:ml-20 md:px-margin-desktop">
      <div className="max-w-6xl">
        <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
          {t("label")}
        </span>
        <h1 className="mt-5 font-mono text-headline-lg-mobile uppercase text-on-surface md:text-headline-lg max-w-4xl leading-tight">
          {t("title")}
        </h1>
        
        <div className="mt-16 space-y-12">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="reticle-corners relative border border-graphite-muted bg-surface-container-low/40 p-8 font-mono transition-all duration-300 hover:border-warning-red hover:bg-surface-container-low/60"
            >
              <div className="grid gap-8 lg:grid-cols-[200px_1fr]">
                <div className="flex flex-col items-center justify-start gap-4">
                  <div className="relative aspect-square w-full max-w-[160px] overflow-hidden border border-graphite-muted bg-surface p-2 shadow-inner">
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      fill
                      className="object-contain p-2 grayscale transition-all duration-300 hover:grayscale-0"
                    />
                  </div>
                  <span className="text-[10px] text-outline uppercase tracking-wider">
                    {partner.id} // SYSTEM COOPERATIVE
                  </span>
                </div>
                
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-graphite-muted pb-4">
                      <h2 className="text-display-sm uppercase text-on-surface">
                        {partner.name}
                      </h2>
                      <span className="text-technical-sm font-semibold text-warning-red uppercase tracking-wider">
                        {partner.tagline}
                      </span>
                    </div>
                    
                    <p className="mt-6 text-technical-md leading-relaxed text-industrial-silver">
                      {partner.desc}
                    </p>
                  </div>
                  
                  <div className="mt-8 border-t border-graphite-muted pt-6">
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
                      <div>
                        <span className="text-[9px] text-outline uppercase block tracking-wider">Domain</span>
                        <span className="text-on-surface text-technical-sm block mt-1 font-semibold">
                          {partner.specs.domain}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] text-outline uppercase block tracking-wider">Alliance Origin</span>
                        <span className="text-on-surface text-technical-sm block mt-1 font-semibold">
                          {partner.specs.founded}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] text-outline uppercase block tracking-wider">Alliance Status</span>
                        <span className="text-warning-red text-technical-sm block mt-1 font-semibold uppercase tracking-wider">
                          {partner.specs.status}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] text-outline uppercase block tracking-wider">Core Alignment</span>
                        <span className="text-on-surface text-technical-sm block mt-1 font-semibold">
                          {partner.specs.focus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
