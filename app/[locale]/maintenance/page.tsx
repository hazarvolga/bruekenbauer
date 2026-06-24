import type { Metadata } from "next";
import { PageShell } from "@/components/motion/MotionProvider";
import { routing } from "@/i18n/routing";
import { getServiceAccessStatus } from "@/lib/serviceControl";
import { setRequestLocale } from "next-intl/server";

const maintenanceCopy = {
  en: {
    title: "Service Maintenance",
    heading: "Website temporarily in maintenance mode",
    body: "This digital service is currently paused for maintenance or service renewal. Direct business contact remains available.",
    email: "Direct email",
    phone: "Direct phone",
    status: "Maintenance status",
  },
  de: {
    title: "Servicewartung",
    heading: "Website vorübergehend im Wartungsmodus",
    body: "Dieser digitale Service ist derzeit wegen Wartung oder Serviceverlängerung pausiert. Der direkte Geschäftskontakt bleibt verfügbar.",
    email: "Direkte E-Mail",
    phone: "Direktes Telefon",
    status: "Wartungsstatus",
  },
  fr: {
    title: "Maintenance du service",
    heading: "Site temporairement en mode maintenance",
    body: "Ce service numérique est actuellement suspendu pour maintenance ou renouvellement de service. Le contact commercial direct reste disponible.",
    email: "E-mail direct",
    phone: "Téléphone direct",
    status: "Statut de maintenance",
  },
};

type Locale = keyof typeof maintenanceCopy;

function normalizeLocale(locale: string): Locale {
  return locale === "de" || locale === "fr" ? locale : "en";
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = maintenanceCopy[normalizeLocale(locale)];

  return {
    title: `${copy.title} | brückenbauer GmbH`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function MaintenancePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = maintenanceCopy[normalizeLocale(locale)];
  const status = getServiceAccessStatus();

  return (
    <PageShell className="min-h-screen px-margin-mobile pb-12 pt-32 md:ml-20 md:px-margin-desktop">
      <div className="grid max-w-4xl gap-8 border border-outline-variant bg-surface-container-low/60 p-8 font-mono">
        <p className="text-label-xs uppercase tracking-wider text-warning-red">{copy.title}</p>
        <div>
          <h1 className="text-headline-lg-mobile uppercase text-on-surface md:text-headline-lg">
            {copy.heading}
          </h1>
          <p className="mt-6 max-w-3xl text-technical-md text-on-surface-variant">{copy.body}</p>
        </div>
        <div className="grid gap-4 text-data-sm uppercase tracking-wider text-outline md:grid-cols-3">
          <div className="border border-outline-variant p-4">
            <span className="block text-label-xs text-outline">{copy.status}</span>
            <span className="mt-2 block text-warning-red">{status.phase}</span>
          </div>
          <a
            href="mailto:bus.dev@brueckenbauer-gmbh.ch"
            className="border border-outline-variant p-4 text-on-surface-variant transition-colors duration-200 hover:border-warning-red hover:text-warning-red"
          >
            {copy.email}
          </a>
          <a
            href="tel:+41762224554"
            className="border border-outline-variant p-4 text-on-surface-variant transition-colors duration-200 hover:border-warning-red hover:text-warning-red"
          >
            {copy.phone}
          </a>
        </div>
      </div>
    </PageShell>
  );
}
