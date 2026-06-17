import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageShell } from "@/components/motion/MotionProvider";
import { normalizeLocale } from "@/data/localizedContent";
import { getTranslations, setRequestLocale } from "next-intl/server";

const sidebarCopy = {
  en: {
    title: "Corporate Registry",
    address: "Address",
    representation: "Representation",
    managingDirector: "Managing Director",
    directContacts: "Direct Contacts",
    registry: "Registry",
    canton: "Canton Bern",
    country: "Switzerland",
  },
  de: {
    title: "Handelsregister",
    address: "Adresse",
    representation: "Vertretung",
    managingDirector: "Geschäftsführer",
    directContacts: "Direkte Kontakte",
    registry: "Register",
    canton: "Kanton Bern",
    country: "Schweiz",
  },
  fr: {
    title: "Registre de l'entreprise",
    address: "Adresse",
    representation: "Représentation",
    managingDirector: "Directeur général",
    directContacts: "Contacts directs",
    registry: "Registre",
    canton: "Canton de Berne",
    country: "Suisse",
  },
};

const metadataCopy = {
  en: {
    title: "Contact — brückenbauer GmbH",
    description: "Direct contact channel for procurement, technical, and partnership inquiries.",
  },
  de: {
    title: "Kontakt — brückenbauer GmbH",
    description: "Direkter Kontaktkanal für Beschaffung, technische Anfragen und Partnerschaften.",
  },
  fr: {
    title: "Contact — brückenbauer GmbH",
    description: "Canal de contact direct pour les demandes d'approvisionnement, techniques et partenariats.",
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

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ContactPage" });
  const sidebar = sidebarCopy[normalizeLocale(locale)];

  return (
    <PageShell className="min-h-screen px-margin-mobile pb-12 pt-32 md:ml-20 md:px-margin-desktop">
      <div className="mx-auto grid w-full max-w-[1600px] gap-gutter lg:grid-cols-[minmax(0,1fr)_400px]">
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
              {sidebar.title}
            </h2>
            
            <div className="space-y-6 text-technical-md">
              <div>
                <span className="text-label-xs text-outline uppercase block tracking-wider">{sidebar.address}</span>
                <p className="text-industrial-silver font-semibold mt-1">
                  brückenbauer GmbH<br />
                  Dachsweg 12<br />
                  3075 Rüfenacht BE<br />
                  {sidebar.country}
                </p>
              </div>

              <div>
                <span className="text-label-xs text-outline uppercase block tracking-wider">{sidebar.representation}</span>
                <p className="text-industrial-silver font-semibold mt-1">
                  Dr. Andreas Werthmüller<br />
                  <span className="text-warning-red text-label-xs tracking-wider block mt-0.5">{sidebar.managingDirector}</span>
                </p>
              </div>

              <div>
                <span className="text-label-xs text-outline uppercase block tracking-wider">{sidebar.directContacts}</span>
                <p className="text-industrial-silver font-semibold mt-1">
                  Tel. <a href="tel:+41762224554" className="text-industrial-silver hover:text-warning-red transition-colors">+41 (0)76 222 45 54</a><br />
                  <a href="mailto:bus.dev@brueckenbauer-gmbh.ch" className="text-warning-red hover:underline mt-1 block">bus.dev@brueckenbauer-gmbh.ch</a>
                </p>
              </div>

              <div className="border-t border-graphite-muted pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-outline uppercase block tracking-wider">UID</span>
                    <span className="text-industrial-silver text-data-sm block mt-1 font-semibold">CHE-191.442.645</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-outline uppercase block tracking-wider">{sidebar.registry}</span>
                    <span className="text-industrial-silver text-data-sm block mt-1 font-semibold">{sidebar.canton}</span>
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
