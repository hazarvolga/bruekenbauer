import type { Metadata } from "next";
import { PageShell } from "@/components/motion/MotionProvider";
import { normalizeLocale } from "@/data/localizedContent";
import { setRequestLocale } from "next-intl/server";

const copy = {
  en: {
    label: "Legal information",
    title: "Cookie Policy",
    paragraphs: [
      "The website is designed to keep tracking minimal. Essential browser storage may be used for interface preferences such as theme selection and language navigation.",
      "If analytics or additional services are introduced, this page should be updated to reflect the relevant cookies, retention periods, and consent options.",
    ],
  },
  de: {
    label: "Rechtliche Information",
    title: "Cookie-Richtlinie",
    paragraphs: [
      "Die Website ist darauf ausgelegt, Tracking minimal zu halten. Essenzieller Browser-Speicher kann für Oberflächenpräferenzen wie Theme-Auswahl und Sprachnavigation verwendet werden.",
      "Wenn Analytics oder zusätzliche Dienste eingeführt werden, sollte diese Seite um relevante Cookies, Aufbewahrungsfristen und Einwilligungsoptionen ergänzt werden.",
    ],
  },
  fr: {
    label: "Information légale",
    title: "Politique de cookies",
    paragraphs: [
      "Le site est conçu pour limiter le tracking au minimum. Un stockage navigateur essentiel peut être utilisé pour les préférences d'interface telles que le thème et la navigation linguistique.",
      "Si des analytics ou services additionnels sont introduits, cette page devra être mise à jour avec les cookies concernés, les durées de conservation et les options de consentement.",
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

export default async function CookiePolicyPage({ params }: { params: Promise<{ locale: string }> }) {
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
      </div>
    </PageShell>
  );
}
