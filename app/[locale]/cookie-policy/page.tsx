import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { PageShell } from "@/components/motion/MotionProvider";
import { normalizeLocale } from "@/data/localizedContent";
import { setRequestLocale } from "next-intl/server";

const copy = {
  en: {
    label: "Legal information",
    title: "Cookie Policy",
    updated: "Last updated: 12 June 2026",
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
        title: "Analytics And Marketing",
        paragraphs: [
          "At the current version, the website is not configured with advertising cookies or behavioral marketing tracking. If analytics, remarketing, embedded media tracking, or comparable non-essential services are introduced, this policy and the consent mechanism should be updated before activation.",
        ],
      },
      {
        title: "Third-Party Services",
        paragraphs: [
          "Contact and RFQ forms may be processed through service providers used for secure email delivery and website operation. Such providers may process technical metadata necessary to deliver the requested communication or maintain service security.",
        ],
      },
      {
        title: "Managing Cookies",
        paragraphs: [
          "Users can delete or block cookies and browser storage through their browser settings. Blocking necessary storage may affect navigation, localization, forms, or interface preferences.",
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
    updated: "Zuletzt aktualisiert: 12. Juni 2026",
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
        title: "Analytics Und Marketing",
        paragraphs: [
          "In der aktuellen Version ist die Website nicht mit Werbe-Cookies oder verhaltensbasiertem Marketing-Tracking konfiguriert. Wenn Analytics, Remarketing, eingebettetes Medien-Tracking oder vergleichbare nicht essenzielle Dienste eingeführt werden, sollten diese Richtlinie und der Einwilligungsmechanismus vor Aktivierung aktualisiert werden.",
        ],
      },
      {
        title: "Dienste Dritter",
        paragraphs: [
          "Kontakt- und RFQ-Formulare können über Dienstleister verarbeitet werden, die für sichere E-Mail-Zustellung und Websitebetrieb eingesetzt werden. Solche Anbieter können technische Metadaten verarbeiten, die zur Zustellung der angeforderten Kommunikation oder zur Aufrechterhaltung der Servicesicherheit erforderlich sind.",
        ],
      },
      {
        title: "Cookies Verwalten",
        paragraphs: [
          "Nutzer können Cookies und Browser-Speicher über die Browsereinstellungen löschen oder blockieren. Das Blockieren notwendiger Speicherfunktionen kann Navigation, Lokalisierung, Formulare oder Oberflächenpräferenzen beeinträchtigen.",
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
    updated: "Dernière mise à jour : 12 juin 2026",
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
        title: "Analytics Et Marketing",
        paragraphs: [
          "Dans la version actuelle, le site n'est pas configuré avec des cookies publicitaires ou un suivi marketing comportemental. Si des analytics, du remarketing, du tracking de médias intégrés ou des services non essentiels comparables sont introduits, cette politique et le mécanisme de consentement devront être mis à jour avant activation.",
        ],
      },
      {
        title: "Services Tiers",
        paragraphs: [
          "Les formulaires de contact et RFQ peuvent être traités par des prestataires utilisés pour l'envoi sécurisé d'e-mails et l'exploitation du site. Ces prestataires peuvent traiter des métadonnées techniques nécessaires à l'acheminement de la communication demandée ou au maintien de la sécurité du service.",
        ],
      },
      {
        title: "Gestion Des Cookies",
        paragraphs: [
          "Les utilisateurs peuvent supprimer ou bloquer les cookies et le stockage navigateur via les paramètres de leur navigateur. Le blocage du stockage nécessaire peut affecter la navigation, la localisation, les formulaires ou les préférences d'interface.",
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
