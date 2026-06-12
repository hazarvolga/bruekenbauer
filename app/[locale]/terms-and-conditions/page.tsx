import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { PageShell } from "@/components/motion/MotionProvider";
import { normalizeLocale } from "@/data/localizedContent";
import { setRequestLocale } from "next-intl/server";

const company = "brückenbauer GmbH, Dachsweg 12, 3075 Rüfenacht BE, Switzerland";

const copy = {
  en: {
    label: "Legal information",
    title: "Terms & Conditions",
    updated: "Last updated: 12 June 2026",
    intro:
      "These Terms & Conditions govern the use of the brückenbauer GmbH website and the handling of website-based business inquiries. Separate written agreements, quotations, purchase orders, or supplier terms prevail where expressly agreed.",
    sections: [
      {
        title: "Company Information",
        paragraphs: [
          `${company}. UID: CHE-191.442.645. Managing Director: Dr. Andreas Werthmüller. Business inquiries may be sent to bus.dev@brueckenbauer-gmbh.ch.`,
        ],
      },
      {
        title: "Website Use",
        paragraphs: [
          "The website is provided for general business, technical, and corporate information. Users must not misuse the website, attempt unauthorized access, interfere with security, or submit unlawful, misleading, confidential third-party, or harmful content.",
        ],
      },
      {
        title: "No Binding Offer",
        paragraphs: [
          "Product descriptions, application references, availability statements, lead times, and technical information are non-binding unless expressly confirmed in writing by brückenbauer GmbH.",
          "Submitting a contact request or RFQ through the website is an invitation to start a business discussion and does not create a binding offer, acceptance, supply obligation, or commercial agreement.",
        ],
      },
      {
        title: "Quotations And Orders",
        paragraphs: [
          "Quotations, delivery scopes, technical documentation, prices, delivery dates, and commercial terms become binding only when confirmed in writing by brückenbauer GmbH or in a mutually accepted contractual document.",
          "Customers are responsible for verifying that selected products, systems, or services are suitable for their intended application, operating environment, regulatory requirements, and integration conditions.",
        ],
      },
      {
        title: "Compliance And Export",
        paragraphs: [
          "Users and customers must comply with applicable export control, sanctions, customs, anti-corruption, product safety, and end-use regulations. brückenbauer GmbH may request additional information or decline inquiries where legal, compliance, supply-chain, or ethical risks exist.",
        ],
      },
      {
        title: "Intellectual Property",
        paragraphs: [
          "All website content, design elements, text, graphics, images, logos, and technical presentation formats are protected by intellectual property rights unless otherwise indicated. Use beyond normal website access requires prior written permission.",
        ],
      },
      {
        title: "Third-Party Links",
        paragraphs: [
          "The website may reference third-party websites, suppliers, standards, or external resources. brückenbauer GmbH is not responsible for the availability, accuracy, security, or legal terms of external content.",
        ],
      },
      {
        title: "Liability",
        paragraphs: [
          "The website is provided with reasonable care, but without warranty that all information is complete, current, uninterrupted, error-free, or suitable for a specific purpose.",
          "To the maximum extent permitted by applicable law, brückenbauer GmbH excludes liability for indirect, consequential, incidental, loss-of-profit, loss-of-data, or business interruption damages arising from website use or reliance on website information.",
        ],
      },
      {
        title: "Governing Law",
        paragraphs: [
          "These website terms are governed by Swiss law, excluding conflict-of-law rules. Subject to mandatory legal venues, the courts of the Canton of Bern, Switzerland, shall have jurisdiction.",
        ],
      },
      {
        title: "Changes",
        paragraphs: [
          "brückenbauer GmbH may update these Terms & Conditions when website functionality, business processes, legal requirements, or service structures change. The version date above identifies the current version.",
        ],
      },
    ],
  },
  de: {
    label: "Rechtliche Information",
    title: "Allgemeine Geschäftsbedingungen",
    updated: "Zuletzt aktualisiert: 12. Juni 2026",
    intro:
      "Diese Allgemeinen Geschäftsbedingungen regeln die Nutzung der Website von brückenbauer GmbH und die Behandlung websitebasierter Geschäftsanfragen. Gesonderte schriftliche Vereinbarungen, Angebote, Bestellungen oder Lieferantenbedingungen gehen vor, soweit sie ausdrücklich vereinbart wurden.",
    sections: [
      {
        title: "Unternehmensangaben",
        paragraphs: [
          `${company}. UID: CHE-191.442.645. Geschäftsführer: Dr. Andreas Werthmüller. Geschäftsanfragen können an bus.dev@brueckenbauer-gmbh.ch gesendet werden.`,
        ],
      },
      {
        title: "Website-Nutzung",
        paragraphs: [
          "Die Website dient der allgemeinen geschäftlichen, technischen und unternehmensbezogenen Information. Nutzer dürfen die Website nicht missbrauchen, keinen unbefugten Zugriff versuchen, Sicherheitsfunktionen beeinträchtigen oder rechtswidrige, irreführende, vertrauliche fremde oder schädliche Inhalte übermitteln.",
        ],
      },
      {
        title: "Kein Verbindliches Angebot",
        paragraphs: [
          "Produktbeschreibungen, Anwendungsreferenzen, Verfügbarkeitsangaben, Lieferzeiten und technische Informationen sind unverbindlich, sofern sie nicht ausdrücklich schriftlich durch brückenbauer GmbH bestätigt wurden.",
          "Das Absenden einer Kontaktanfrage oder RFQ über die Website ist eine Einladung zur Aufnahme einer Geschäftsbesprechung und begründet kein verbindliches Angebot, keine Annahme, keine Lieferpflicht und keine kommerzielle Vereinbarung.",
        ],
      },
      {
        title: "Angebote Und Bestellungen",
        paragraphs: [
          "Angebote, Lieferumfänge, technische Dokumentation, Preise, Liefertermine und kommerzielle Bedingungen werden erst verbindlich, wenn sie schriftlich durch brückenbauer GmbH oder in einem beiderseits akzeptierten Vertragsdokument bestätigt wurden.",
          "Kunden sind dafür verantwortlich zu prüfen, ob ausgewählte Produkte, Systeme oder Dienstleistungen für die beabsichtigte Anwendung, Betriebsumgebung, regulatorischen Anforderungen und Integrationsbedingungen geeignet sind.",
        ],
      },
      {
        title: "Compliance Und Export",
        paragraphs: [
          "Nutzer und Kunden müssen geltende Exportkontroll-, Sanktions-, Zoll-, Antikorruptions-, Produktsicherheits- und Endverwendungsregeln einhalten. brückenbauer GmbH kann zusätzliche Informationen anfordern oder Anfragen ablehnen, wenn rechtliche, Compliance-, Lieferketten- oder ethische Risiken bestehen.",
        ],
      },
      {
        title: "Geistiges Eigentum",
        paragraphs: [
          "Alle Website-Inhalte, Designelemente, Texte, Grafiken, Bilder, Logos und technischen Darstellungsformen sind urheber- und kennzeichenrechtlich geschützt, sofern nichts anderes angegeben ist. Eine Nutzung über den normalen Websitezugriff hinaus erfordert vorherige schriftliche Zustimmung.",
        ],
      },
      {
        title: "Links Zu Dritten",
        paragraphs: [
          "Die Website kann auf Websites, Lieferanten, Standards oder externe Ressourcen Dritter verweisen. brückenbauer GmbH ist nicht verantwortlich für Verfügbarkeit, Richtigkeit, Sicherheit oder rechtliche Bedingungen externer Inhalte.",
        ],
      },
      {
        title: "Haftung",
        paragraphs: [
          "Die Website wird mit angemessener Sorgfalt bereitgestellt, jedoch ohne Gewähr dafür, dass alle Informationen vollständig, aktuell, unterbrechungsfrei, fehlerfrei oder für einen bestimmten Zweck geeignet sind.",
          "Soweit gesetzlich zulässig, schließt brückenbauer GmbH die Haftung für mittelbare Schäden, Folgeschäden, Nebenschäden, entgangenen Gewinn, Datenverlust oder Betriebsunterbrechungen aus, die aus der Website-Nutzung oder dem Vertrauen auf Website-Informationen entstehen.",
        ],
      },
      {
        title: "Anwendbares Recht",
        paragraphs: [
          "Diese Website-Bedingungen unterliegen schweizerischem Recht unter Ausschluss kollisionsrechtlicher Regeln. Vorbehaltlich zwingender gesetzlicher Gerichtsstände sind die Gerichte des Kantons Bern, Schweiz, zuständig.",
        ],
      },
      {
        title: "Änderungen",
        paragraphs: [
          "brückenbauer GmbH kann diese Allgemeinen Geschäftsbedingungen aktualisieren, wenn sich Website-Funktionen, Geschäftsprozesse, rechtliche Anforderungen oder Servicestrukturen ändern. Das oben genannte Datum bezeichnet die aktuelle Version.",
        ],
      },
    ],
  },
  fr: {
    label: "Information légale",
    title: "Conditions générales",
    updated: "Dernière mise à jour : 12 juin 2026",
    intro:
      "Ces Conditions générales régissent l'utilisation du site de brückenbauer GmbH et le traitement des demandes commerciales effectuées via le site. Les accords écrits distincts, devis, bons de commande ou conditions fournisseurs prévalent lorsqu'ils sont expressément convenus.",
    sections: [
      {
        title: "Informations Société",
        paragraphs: [
          `${company}. UID : CHE-191.442.645. Directeur général : Dr. Andreas Werthmüller. Les demandes commerciales peuvent être envoyées à bus.dev@brueckenbauer-gmbh.ch.`,
        ],
      },
      {
        title: "Utilisation Du Site",
        paragraphs: [
          "Le site fournit des informations générales commerciales, techniques et institutionnelles. Les utilisateurs ne doivent pas détourner le site, tenter un accès non autorisé, compromettre la sécurité ou soumettre un contenu illicite, trompeur, confidentiel appartenant à des tiers ou nuisible.",
        ],
      },
      {
        title: "Absence D'offre Contraignante",
        paragraphs: [
          "Les descriptions de produits, références d'application, informations de disponibilité, délais et données techniques ne sont pas contraignants sauf confirmation écrite expresse de brückenbauer GmbH.",
          "L'envoi d'une demande de contact ou d'un RFQ via le site constitue une invitation à engager une discussion commerciale et ne crée ni offre contraignante, ni acceptation, ni obligation de fourniture, ni accord commercial.",
        ],
      },
      {
        title: "Devis Et Commandes",
        paragraphs: [
          "Les devis, périmètres de livraison, documents techniques, prix, dates de livraison et conditions commerciales ne deviennent contraignants qu'après confirmation écrite de brückenbauer GmbH ou dans un document contractuel accepté par les deux parties.",
          "Les clients sont responsables de vérifier que les produits, systèmes ou services choisis conviennent à l'application prévue, à l'environnement d'exploitation, aux exigences réglementaires et aux conditions d'intégration.",
        ],
      },
      {
        title: "Conformité Et Export",
        paragraphs: [
          "Les utilisateurs et clients doivent respecter les règles applicables en matière de contrôle des exportations, sanctions, douanes, anticorruption, sécurité des produits et utilisation finale. brückenbauer GmbH peut demander des informations supplémentaires ou refuser des demandes en présence de risques juridiques, de conformité, de chaîne d'approvisionnement ou éthiques.",
        ],
      },
      {
        title: "Propriété Intellectuelle",
        paragraphs: [
          "Tous les contenus du site, éléments de design, textes, graphiques, images, logos et formats de présentation technique sont protégés par des droits de propriété intellectuelle, sauf indication contraire. Toute utilisation au-delà de l'accès normal au site nécessite une autorisation écrite préalable.",
        ],
      },
      {
        title: "Liens Tiers",
        paragraphs: [
          "Le site peut référencer des sites tiers, fournisseurs, normes ou ressources externes. brückenbauer GmbH n'est pas responsable de la disponibilité, de l'exactitude, de la sécurité ou des conditions juridiques des contenus externes.",
        ],
      },
      {
        title: "Responsabilité",
        paragraphs: [
          "Le site est fourni avec un soin raisonnable, sans garantie que toutes les informations soient complètes, actuelles, ininterrompues, exemptes d'erreurs ou adaptées à un objectif spécifique.",
          "Dans la mesure maximale autorisée par la loi applicable, brückenbauer GmbH exclut toute responsabilité pour les dommages indirects, consécutifs, accessoires, pertes de profit, pertes de données ou interruptions d'activité résultant de l'utilisation du site ou de la confiance accordée aux informations du site.",
        ],
      },
      {
        title: "Droit Applicable",
        paragraphs: [
          "Ces conditions du site sont régies par le droit suisse, à l'exclusion des règles de conflit de lois. Sous réserve des fors impératifs, les tribunaux du canton de Berne, Suisse, sont compétents.",
        ],
      },
      {
        title: "Modifications",
        paragraphs: [
          "brückenbauer GmbH peut mettre à jour ces Conditions générales lorsque les fonctionnalités du site, les processus commerciaux, les exigences légales ou les structures de service évoluent. La date ci-dessus identifie la version actuelle.",
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

export default async function TermsAndConditionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const localized = copy[normalizeLocale(locale)];

  return (
    <PageShell className="min-h-screen px-margin-mobile pb-24 pt-32 md:ml-20 md:px-margin-desktop">
      <LegalDocument {...localized} />
    </PageShell>
  );
}
