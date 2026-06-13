import { RfqFlow } from "@/components/rfq/RfqFlow";
import { PageShell } from "@/components/motion/MotionProvider";
import type { Metadata } from "next";
import { normalizeLocale } from "@/data/localizedContent";
import { images } from "@/lib/assets";
import { resolveRfqContext } from "@/lib/rfqContext";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{
    product?: string;
    productSlug?: string;
    familySlug?: string;
    applicationSector?: string;
  }>;
};

const metadataCopy = {
  en: {
    title: "Request for Quotation (RFQ) — brückenbauer GmbH",
    description: "Submit product, application, volume, lead-time, and project requirements for a focused quotation.",
  },
  de: {
    title: "Angebotsanfrage (RFQ) — brückenbauer GmbH",
    description: "Übermitteln Sie Produkt-, Anwendungs-, Volumen-, Lieferzeit- und Projektanforderungen für ein fokussiertes Angebot.",
  },
  fr: {
    title: "Demande de devis (RFQ) — brückenbauer GmbH",
    description: "Transmettez les exigences produit, application, volume, délai et projet pour un devis ciblé.",
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

export default async function RfqPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const query = await searchParams;
  const initialContext = resolveRfqContext({
    productSlug: query?.productSlug,
    familySlug: query?.familySlug,
    applicationSector: query?.applicationSector,
    legacyProduct: query?.product,
  });

  return (
    <PageShell className="relative min-h-screen overflow-x-hidden px-margin-mobile pb-24 pt-32 md:ml-20 md:px-margin-desktop">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.16] mix-blend-normal grayscale dark:opacity-25 dark:mix-blend-luminosity"
        style={{ backgroundImage: `url(${images.inquiry})` }}
      />
      <div className="absolute inset-0 bg-background/90 dark:bg-background/80" />
      <div className="relative z-10">
        <RfqFlow initialContext={initialContext} locale={locale} />
      </div>
    </PageShell>
  );
}
