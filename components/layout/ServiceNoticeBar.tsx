import type { ServiceAccessStatus } from "@/lib/serviceControl";

const noticeCopy = {
  en: {
    notice: "Service renewal window active",
    grace: "Service renewal grace period active",
    body: "This website remains available while the current service term is being renewed.",
  },
  de: {
    notice: "Serviceverlängerung aktiv",
    grace: "Kulanzzeitraum für Serviceverlängerung aktiv",
    body: "Diese Website bleibt verfügbar, während die aktuelle Serviceperiode verlängert wird.",
  },
  fr: {
    notice: "Fenêtre de renouvellement active",
    grace: "Période de grâce de renouvellement active",
    body: "Ce site reste disponible pendant le renouvellement de la période de service actuelle.",
  },
};

type Locale = keyof typeof noticeCopy;

function normalizeLocale(locale: string): Locale {
  return locale === "de" || locale === "fr" ? locale : "en";
}

export function ServiceNoticeBar({
  locale,
  status,
}: {
  locale: string;
  status: ServiceAccessStatus;
}) {
  if (status.phase !== "notice" && status.phase !== "grace") return null;

  const copy = noticeCopy[normalizeLocale(locale)];

  return (
    <div className="border-b border-data-orange/60 bg-surface px-margin-mobile py-3 font-mono text-data-sm text-on-surface-variant md:ml-20 md:px-gutter">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <span className="text-label-xs uppercase tracking-wider text-data-orange">
          {status.phase === "grace" ? copy.grace : copy.notice}
        </span>
        <span>{copy.body}</span>
      </div>
    </div>
  );
}
