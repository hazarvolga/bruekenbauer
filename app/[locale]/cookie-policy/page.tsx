import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { PageShell } from "@/components/motion/MotionProvider";
import { normalizeLocale } from "@/data/localizedContent";
import { setRequestLocale } from "next-intl/server";

const copy = {
  en: {
    label: "Legal information",
    title: "Cookie Policy",
    updated: "Last updated: 13 June 2026",
    intro:
      "This Cookie Policy explains how brückenbauer GmbH uses cookies and similar browser storage on this website. The site is designed to keep tracking minimal and to use only what is needed for a stable professional experience.",
    sections: [
      {
        title: "What Cookies Are",
        paragraphs: [
          "Cookies are small text files stored by a browser. Similar technologies such as local storage may also be used to remember interface settings or improve technical operation.",
        ],
      },
      {
        title: "Strictly Necessary Storage",
        paragraphs: [
          "The website may use essential technical storage required for page delivery, security, routing, localization, form operation, and stable navigation. These items are necessary for the requested service and do not require consent where applicable law allows an exemption.",
        ],
      },
      {
        title: "Preference Storage",
        paragraphs: [
          "The website may remember interface preferences such as selected theme and language navigation. The theme preference is stored in the browser under the key theme. Locale routing may use language-related browser state, including framework-managed locale behavior.",
        ],
      },
      {
        title: "Google Analytics 4",
        paragraphs: [
          "With the user's consent, this website uses Google Analytics 4 to measure aggregate visits, visitor countries, traffic sources, popular pages, and successful Contact or RFQ submissions. Google Analytics is not loaded before analytics consent is given.",
          "Google Analytics may use cookies and similar identifiers and may process technical information such as device and browser data, approximate location, referral source, page interactions, and timestamps. The website uses measurement ID G-RKKZZGQ7TT.",
          "No Meta Pixel, LinkedIn Insight Tag, advertising personalization, remarketing, or behavioral advertising tools are used on this website.",
        ],
      },
      {
        title: "Third-Party Services",
        paragraphs: [
          "Contact and RFQ forms may be processed through service providers used for secure email delivery and website operation. Such providers may process technical metadata necessary to deliver the requested communication or maintain service security.",
          "Cloudflare Turnstile may be loaded on Contact and RFQ forms as a strictly security-related bot-protection service. It is not used for advertising personalization or behavioral marketing.",
        ],
      },
      {
        title: "Managing Cookies",
        paragraphs: [
          "Users can reject analytics when first visiting the website and can reopen Cookie Settings from the footer to change their choice. Cookies and browser storage can also be deleted or blocked through browser settings. Blocking necessary storage may affect navigation, localization, forms, or interface preferences.",
        ],
      },
      {
        title: "Consent",
        paragraphs: [
          "Where non-essential cookies or similar technologies require consent, they should be disabled until the user has received clear information and made a free, specific, informed, and unambiguous choice.",
        ],
      },
      {
        title: "Updates",
        paragraphs: [
          "This policy may be updated when website functionality, providers, analytics configuration, or legal requirements change. The version date above identifies the current version.",
        ],
      },
    ],
  },
  de: {
    label: "Rechtliche Information",
    title: "Cookie-Richtlinie",
    updated: "Zuletzt aktualisiert: 13. Juni 2026",
    intro:
      "Diese Cookie-Richtlinie erläutert, wie brückenbauer GmbH Cookies und vergleichbaren Browser-Speicher auf dieser Website verwendet. Die Website ist darauf ausgelegt, Tracking minimal zu halten und nur das zu nutzen, was für eine stabile professionelle Nutzung erforderlich ist.",
    sections: [
      {
        title: "Was Cookies Sind",
        paragraphs: [
          "Cookies sind kleine Textdateien, die vom Browser gespeichert werden. Vergleichbare Technologien wie Local Storage können ebenfalls eingesetzt werden, um Oberflächeneinstellungen zu speichern oder den technischen Betrieb zu verbessern.",
        ],
      },
      {
        title: "Unbedingt Erforderlicher Speicher",
        paragraphs: [
          "Die Website kann essenziellen technischen Speicher verwenden, der für Seitenauslieferung, Sicherheit, Routing, Lokalisierung, Formularfunktion und stabile Navigation erforderlich ist. Diese Elemente sind für den angeforderten Dienst notwendig und bedürfen keiner Einwilligung, soweit das anwendbare Recht eine Ausnahme zulässt.",
        ],
      },
      {
        title: "Präferenzspeicher",
        paragraphs: [
          "Die Website kann Oberflächenpräferenzen wie ausgewähltes Theme und Sprachnavigation speichern. Die Theme-Präferenz wird im Browser unter dem Schlüssel theme gespeichert. Locale-Routing kann sprachbezogenen Browserzustand einschließlich frameworkverwalteter Locale-Funktionen verwenden.",
        ],
      },
      {
        title: "Google Analytics 4",
        paragraphs: [
          "Mit Einwilligung des Nutzers verwendet diese Website Google Analytics 4, um aggregierte Besuche, Herkunftsländer, Zugriffsquellen, beliebte Seiten sowie erfolgreiche Kontakt- oder RFQ-Übermittlungen zu messen. Google Analytics wird vor Erteilung der Analytics-Einwilligung nicht geladen.",
          "Google Analytics kann Cookies und vergleichbare Kennungen einsetzen und technische Informationen wie Geräte- und Browserdaten, ungefähren Standort, Verweisquelle, Seiteninteraktionen und Zeitstempel verarbeiten. Die Website verwendet die Mess-ID G-RKKZZGQ7TT.",
          "Auf dieser Website werden kein Meta Pixel, kein LinkedIn Insight Tag, keine personalisierte Werbung, kein Remarketing und keine verhaltensbasierte Werbung eingesetzt.",
        ],
      },
      {
        title: "Dienste Dritter",
        paragraphs: [
          "Kontakt- und RFQ-Formulare können über Dienstleister verarbeitet werden, die für sichere E-Mail-Zustellung und Websitebetrieb eingesetzt werden. Solche Anbieter können technische Metadaten verarbeiten, die zur Zustellung der angeforderten Kommunikation oder zur Aufrechterhaltung der Servicesicherheit erforderlich sind.",
          "Cloudflare Turnstile kann auf Kontakt- und RFQ-Formularen als strikt sicherheitsbezogener Bot-Schutzdienst geladen werden. Es wird nicht für personalisierte Werbung oder verhaltensbasiertes Marketing eingesetzt.",
        ],
      },
      {
        title: "Cookies Verwalten",
        paragraphs: [
          "Nutzer können Analytics beim ersten Besuch ablehnen und ihre Auswahl über die Cookie-Einstellungen im Footer später ändern. Cookies und Browser-Speicher können außerdem über die Browsereinstellungen gelöscht oder blockiert werden. Das Blockieren notwendiger Speicherfunktionen kann Navigation, Lokalisierung, Formulare oder Oberflächenpräferenzen beeinträchtigen.",
        ],
      },
      {
        title: "Einwilligung",
        paragraphs: [
          "Soweit nicht essenzielle Cookies oder vergleichbare Technologien eine Einwilligung erfordern, sollten sie deaktiviert bleiben, bis der Nutzer klare Informationen erhalten und eine freie, spezifische, informierte und eindeutige Entscheidung getroffen hat.",
        ],
      },
      {
        title: "Aktualisierungen",
        paragraphs: [
          "Diese Richtlinie kann aktualisiert werden, wenn sich Website-Funktionen, Anbieter, Analytics-Konfigurationen oder rechtliche Anforderungen ändern. Das oben genannte Datum bezeichnet die aktuelle Version.",
        ],
      },
    ],
  },
  fr: {
    label: "Information légale",
    title: "Politique de cookies",
    updated: "Dernière mise à jour : 13 juin 2026",
    intro:
      "Cette Politique de cookies explique comment brückenbauer GmbH utilise les cookies et technologies similaires de stockage navigateur sur ce site. Le site est conçu pour limiter le tracking au minimum et n'utiliser que ce qui est nécessaire à une expérience professionnelle stable.",
    sections: [
      {
        title: "Définition Des Cookies",
        paragraphs: [
          "Les cookies sont de petits fichiers texte stockés par le navigateur. Des technologies similaires, telles que le stockage local, peuvent aussi être utilisées pour mémoriser les réglages d'interface ou améliorer le fonctionnement technique.",
        ],
      },
      {
        title: "Stockage Strictement Nécessaire",
        paragraphs: [
          "Le site peut utiliser un stockage technique essentiel nécessaire à la livraison des pages, à la sécurité, au routage, à la localisation, au fonctionnement des formulaires et à la stabilité de la navigation. Ces éléments sont nécessaires au service demandé et ne requièrent pas de consentement lorsque le droit applicable prévoit une exemption.",
        ],
      },
      {
        title: "Stockage Des Préférences",
        paragraphs: [
          "Le site peut mémoriser des préférences d'interface telles que le thème sélectionné et la navigation linguistique. La préférence de thème est stockée dans le navigateur sous la clé theme. Le routage localisé peut utiliser un état navigateur lié à la langue, y compris le comportement de locale géré par le framework.",
        ],
      },
      {
        title: "Google Analytics 4",
        paragraphs: [
          "Avec le consentement de l'utilisateur, ce site utilise Google Analytics 4 afin de mesurer les visites agrégées, les pays d'origine, les sources de trafic, les pages les plus consultées et les envois réussis des formulaires Contact ou RFQ. Google Analytics n'est pas chargé avant l'obtention du consentement analytique.",
          "Google Analytics peut utiliser des cookies et des identifiants similaires et traiter des informations techniques telles que les données de l'appareil et du navigateur, la localisation approximative, la source de référence, les interactions avec les pages et les horodatages. Le site utilise l'identifiant de mesure G-RKKZZGQ7TT.",
          "Aucun Meta Pixel, LinkedIn Insight Tag, outil de personnalisation publicitaire, de remarketing ou de publicité comportementale n'est utilisé sur ce site.",
        ],
      },
      {
        title: "Services Tiers",
        paragraphs: [
          "Les formulaires de contact et RFQ peuvent être traités par des prestataires utilisés pour l'envoi sécurisé d'e-mails et l'exploitation du site. Ces prestataires peuvent traiter des métadonnées techniques nécessaires à l'acheminement de la communication demandée ou au maintien de la sécurité du service.",
          "Cloudflare Turnstile peut être chargé sur les formulaires Contact et RFQ comme service de protection anti-bot strictement lié à la sécurité. Il n'est pas utilisé pour la personnalisation publicitaire ou le marketing comportemental.",
        ],
      },
      {
        title: "Gestion Des Cookies",
        paragraphs: [
          "Les utilisateurs peuvent refuser Analytics lors de leur première visite et modifier ensuite leur choix via les Paramètres des cookies dans le footer. Les cookies et le stockage navigateur peuvent également être supprimés ou bloqués via les paramètres du navigateur. Le blocage du stockage nécessaire peut affecter la navigation, la localisation, les formulaires ou les préférences d'interface.",
        ],
      },
      {
        title: "Consentement",
        paragraphs: [
          "Lorsque des cookies ou technologies similaires non essentiels nécessitent un consentement, ils doivent rester désactivés jusqu'à ce que l'utilisateur ait reçu une information claire et formulé un choix libre, spécifique, éclairé et non ambigu.",
        ],
      },
      {
        title: "Mises À Jour",
        paragraphs: [
          "Cette politique peut être mise à jour lorsque les fonctionnalités du site, les prestataires, la configuration analytics ou les exigences légales évoluent. La date ci-dessus identifie la version actuelle.",
        ],
      },
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
    description: localized.intro,
  };
}

export default async function CookiePolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const localized = copy[normalizeLocale(locale)];

  return (
    <PageShell className="min-h-screen px-margin-mobile pb-24 pt-32 md:ml-20 md:px-margin-desktop">
      <LegalDocument {...localized} />
    </PageShell>
  );
}
