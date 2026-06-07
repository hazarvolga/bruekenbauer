import type { Metadata } from "next";
import { PageShell } from "@/components/motion/MotionProvider";
import { normalizeLocale } from "@/data/localizedContent";
import { setRequestLocale } from "next-intl/server";

const copy = {
  en: {
    label: "Legal information",
    title: "Terms & Conditions",
    paragraphs: [
      "Website content is provided for general business and technical orientation. Specific availability, commercial terms, lead times, and compliance documentation are confirmed individually for each inquiry.",
      "No binding offer is created by submitting an inquiry through the website. Commercial agreements require written confirmation by brückenbauer GmbH.",
      "For commercial questions, contact",
    ],
  },
  de: {
    label: "Rechtliche Information",
    title: "Allgemeine Geschäftsbedingungen",
    paragraphs: [
      "Die Website-Inhalte dienen der allgemeinen geschäftlichen und technischen Orientierung. Verfügbarkeit, kommerzielle Bedingungen, Lieferzeiten und Compliance-Dokumentation werden für jede Anfrage individuell bestätigt.",
      "Durch das Absenden einer Anfrage über die Website entsteht kein verbindliches Angebot. Kommerzielle Vereinbarungen erfordern eine schriftliche Bestätigung durch brückenbauer GmbH.",
      "Für kommerzielle Fragen kontaktieren Sie",
    ],
  },
  fr: {
    label: "Information légale",
    title: "Conditions générales",
    paragraphs: [
      "Le contenu du site fournit une orientation commerciale et technique générale. La disponibilité, les conditions commerciales, les délais et la documentation de conformité sont confirmés individuellement pour chaque demande.",
      "La soumission d'une demande via le site ne constitue pas une offre contraignante. Les accords commerciaux nécessitent une confirmation écrite de brückenbauer GmbH.",
      "Pour les questions commerciales, contactez",
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localized = copy[normalizeLocale(locale)];

  return {
    title: `${localized.title} | brückenbauer GmbH`,
    description: localized.paragraphs[0],
  };
}

export default async function TermsAndConditionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const localized = copy[normalizeLocale(locale)];

  return (
    <PageShell className="min-h-screen px-margin-mobile pb-24 pt-32 md:ml-20 md:px-margin-desktop">
      <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
        {localized.label}
      </span>
      <h1 className="mt-5 max-w-4xl font-mono text-headline-lg-mobile uppercase text-on-surface md:text-headline-lg">
        {localized.title}
      </h1>
      <div className="mt-10 max-w-3xl space-y-6 border border-graphite-muted bg-surface-container-low/45 p-6 font-mono text-technical-md leading-relaxed text-on-surface-variant md:p-8">
        <p>{localized.paragraphs[0]}</p>
        <p>{localized.paragraphs[1]}</p>
        <p>
          {localized.paragraphs[2]}{" "}
          <a className="text-warning-red hover:underline" href="mailto:bus.dev@brueckenbauer-gmbh.ch">
            bus.dev@brueckenbauer-gmbh.ch
          </a>
          .
        </p>
      </div>
    </PageShell>
  );
}
