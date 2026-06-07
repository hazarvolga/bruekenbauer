import type { Metadata } from "next";
import { PageShell } from "@/components/motion/MotionProvider";
import { normalizeLocale } from "@/data/localizedContent";
import { setRequestLocale } from "next-intl/server";

const copy = {
  en: {
    label: "Legal information",
    title: "Privacy Policy",
    paragraphs: [
      "brückenbauer GmbH processes business contact information only to respond to inquiries, evaluate technical requirements, and coordinate professional communication.",
      "Typical information may include name, company, business email, telephone number, project context, and technical notes submitted through the website.",
      "For privacy questions, contact",
    ],
  },
  de: {
    label: "Rechtliche Information",
    title: "Datenschutzerklärung",
    paragraphs: [
      "brückenbauer GmbH verarbeitet geschäftliche Kontaktdaten ausschließlich zur Beantwortung von Anfragen, zur Bewertung technischer Anforderungen und zur Koordination professioneller Kommunikation.",
      "Typische Informationen können Name, Unternehmen, geschäftliche E-Mail-Adresse, Telefonnummer, Projektkontext und technische Hinweise umfassen, die über die Website übermittelt werden.",
      "Für Datenschutzfragen kontaktieren Sie",
    ],
  },
  fr: {
    label: "Information légale",
    title: "Politique de confidentialité",
    paragraphs: [
      "brückenbauer GmbH traite les informations de contact professionnelles uniquement pour répondre aux demandes, évaluer les exigences techniques et coordonner la communication professionnelle.",
      "Les informations typiques peuvent inclure le nom, l'entreprise, l'e-mail professionnel, le numéro de téléphone, le contexte du projet et les notes techniques soumises via le site.",
      "Pour toute question relative à la confidentialité, contactez",
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

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
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
