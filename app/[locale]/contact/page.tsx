import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageShell } from "@/components/motion/MotionProvider";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Engineering Contact — brückenbauer GmbH",
  description: "Direct contact channel for procurement, technical, and partnership inquiries.",
};

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ContactPage" });

  return (
    <PageShell className="min-h-screen px-margin-mobile pb-24 pt-32 md:ml-20 md:px-margin-desktop">
      <div className="grid gap-gutter lg:grid-cols-[1fr_400px]">
        <div>
          <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
            {t("label")}
          </span>
          <h1 className="mt-5 font-mono text-headline-lg-mobile uppercase text-on-surface md:text-headline-lg">
            {t("title")}
          </h1>
          <ContactForm locale={locale} />
        </div>
        
        <div className="lg:pt-20">
          <div className="reticle-corners relative border border-graphite-muted bg-surface-container-low/40 p-8 font-mono">
            <h2 className="text-label-xs uppercase tracking-[0.18em] text-warning-red mb-6 border-b border-graphite-muted pb-4">
              Corporate Registry
            </h2>
            
            <div className="space-y-6 text-technical-md">
              <div>
                <span className="text-label-xs text-outline uppercase block tracking-wider">Address</span>
                <p className="text-industrial-silver font-semibold mt-1">
                  brückenbauer GmbH<br />
                  Dachsweg 12<br />
                  3075 Rüfenacht BE<br />
                  Switzerland
                </p>
              </div>

              <div>
                <span className="text-label-xs text-outline uppercase block tracking-wider">Representation</span>
                <p className="text-industrial-silver font-semibold mt-1">
                  Dr. Andreas Werthmüller<br />
                  <span className="text-warning-red text-label-xs tracking-wider block mt-0.5">Managing Director</span>
                </p>
              </div>

              <div>
                <span className="text-label-xs text-outline uppercase block tracking-wider">Direct Contacts</span>
                <p className="text-industrial-silver font-semibold mt-1">
                  Tel. <a href="tel:+41762224554" className="text-industrial-silver hover:text-warning-red transition-colors">+41 (0)76 222 45 54</a><br />
                  <a href="mailto:werand@bluewin.ch" className="text-warning-red hover:underline mt-1 block">werand@bluewin.ch</a>
                </p>
              </div>

              <div className="border-t border-graphite-muted pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-outline uppercase block tracking-wider">UID</span>
                    <span className="text-industrial-silver text-data-sm block mt-1 font-semibold">CHE-191.442.645</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-outline uppercase block tracking-wider">Registry</span>
                    <span className="text-industrial-silver text-data-sm block mt-1 font-semibold">Canton Bern</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
