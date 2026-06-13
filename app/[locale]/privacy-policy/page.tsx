import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { PageShell } from "@/components/motion/MotionProvider";
import { normalizeLocale } from "@/data/localizedContent";
import { setRequestLocale } from "next-intl/server";

const company = "brückenbauer GmbH, Dachsweg 12, 3075 Rüfenacht BE, Switzerland";

const copy = {
  en: {
    label: "Legal information",
    title: "Privacy Policy",
    updated: "Last updated: 13 June 2026",
    intro:
      "This Privacy Policy explains how brückenbauer GmbH handles personal data submitted through this website, contact forms, RFQ workflows, email communication, and related business interactions.",
    sections: [
      {
        title: "Controller",
        paragraphs: [
          `${company} is responsible for the processing described in this policy. The company can be contacted at bus.dev@brueckenbauer-gmbh.ch for privacy and data protection matters.`,
        ],
      },
      {
        title: "Applicable Framework",
        paragraphs: [
          "Processing is designed to follow the Swiss Federal Act on Data Protection and, where applicable, the EU General Data Protection Regulation for visitors, contacts, and business partners located in the European Economic Area.",
        ],
      },
      {
        title: "Data We Process",
        paragraphs: [
          "We may process business contact details, company details, telephone number, email address, inquiry content, RFQ information, product or application interests, project notes, language preference, timestamps, technical log data, and communication metadata.",
          "We do not request special categories of personal data through the website and ask users not to submit confidential personal information that is not required for a business inquiry.",
        ],
      },
      {
        title: "Purposes And Legal Bases",
        paragraphs: [
          "Personal data is processed to respond to inquiries, evaluate technical and commercial requirements, prepare quotations, coordinate supplier or partner communication, operate and secure the website, keep business records, and comply with legal obligations.",
          "Depending on the context, the legal basis is pre-contractual or contractual necessity, legitimate business interests, compliance with legal obligations, or consent where a consent-based service is introduced.",
        ],
      },
      {
        title: "Consent-Based Website Analytics",
        paragraphs: [
          "If a visitor accepts analytics, Google Analytics 4 is used to understand aggregate visits, approximate visitor countries, traffic sources, popular pages, and successful Contact or RFQ submissions. The legal basis is consent, and Google Analytics remains disabled until that consent is given.",
          "Analytics data may be processed by Google as a service provider and may involve international processing subject to Google's applicable contractual and transfer safeguards. Visitors can withdraw or change consent at any time through Cookie Settings in the footer.",
        ],
      },
      {
        title: "Recipients And Processors",
        paragraphs: [
          "Data may be shared with internal staff, email and hosting providers, IT service providers, logistics or technical partners, and professional advisers where this is necessary for the inquiry or a lawful business purpose.",
          "brückenbauer GmbH does not sell personal data. Processors are expected to handle data only under appropriate contractual, technical, and organizational safeguards.",
        ],
      },
      {
        title: "International Transfers",
        paragraphs: [
          "If service providers or project partners process data outside Switzerland, the EEA, or countries recognized as providing adequate protection, appropriate safeguards such as contractual protections or recognized transfer mechanisms are used where required.",
        ],
      },
      {
        title: "Retention",
        paragraphs: [
          "Personal data is retained only for as long as necessary for the relevant business purpose, legal retention duties, dispute prevention, security, and audit needs. Inquiry and RFQ records may be kept for the duration needed to manage the project and related commercial documentation.",
        ],
      },
      {
        title: "Your Rights",
        paragraphs: [
          "Depending on applicable law, individuals may request access, correction, deletion, restriction, portability, objection to processing, withdrawal of consent, and information about how their data is used.",
          "Requests can be sent to bus.dev@brueckenbauer-gmbh.ch. Individuals may also contact the competent supervisory authority, including the Swiss Federal Data Protection and Information Commissioner where applicable.",
        ],
      },
      {
        title: "Security And Automation",
        paragraphs: [
          "We apply reasonable technical and organizational measures to protect personal data against unauthorized access, loss, misuse, and alteration. No solely automated decision-making with legal or similarly significant effects is used through this website.",
        ],
      },
      {
        title: "Updates",
        paragraphs: [
          "This policy may be updated when website functionality, service providers, legal requirements, or business processes change. The version date above identifies the current version.",
        ],
      },
    ],
  },
  de: {
    label: "Rechtliche Information",
    title: "Datenschutzerklärung",
    updated: "Zuletzt aktualisiert: 13. Juni 2026",
    intro:
      "Diese Datenschutzerklärung erläutert, wie brückenbauer GmbH personenbezogene Daten verarbeitet, die über diese Website, Kontaktformulare, RFQ-Prozesse, E-Mail-Kommunikation und damit verbundene Geschäftsinteraktionen übermittelt werden.",
    sections: [
      {
        title: "Verantwortliche Stelle",
        paragraphs: [
          `${company} ist für die in dieser Erklärung beschriebene Verarbeitung verantwortlich. Für Datenschutzfragen ist das Unternehmen unter bus.dev@brueckenbauer-gmbh.ch erreichbar.`,
        ],
      },
      {
        title: "Anwendbarer Rahmen",
        paragraphs: [
          "Die Verarbeitung ist am Schweizer Bundesgesetz über den Datenschutz ausgerichtet und, soweit anwendbar, an der EU-Datenschutz-Grundverordnung für Besucher, Kontakte und Geschäftspartner im Europäischen Wirtschaftsraum.",
        ],
      },
      {
        title: "Verarbeitete Daten",
        paragraphs: [
          "Wir können geschäftliche Kontaktdaten, Unternehmensdaten, Telefonnummer, E-Mail-Adresse, Anfrageinhalte, RFQ-Informationen, Produkt- oder Anwendungsinteressen, Projektnotizen, Spracheinstellung, Zeitstempel, technische Protokolldaten und Kommunikationsmetadaten verarbeiten.",
          "Über die Website werden keine besonderen Kategorien personenbezogener Daten angefordert. Nutzer sollten keine vertraulichen personenbezogenen Informationen übermitteln, die für eine geschäftliche Anfrage nicht erforderlich sind.",
        ],
      },
      {
        title: "Zwecke Und Rechtsgrundlagen",
        paragraphs: [
          "Personenbezogene Daten werden verarbeitet, um Anfragen zu beantworten, technische und kommerzielle Anforderungen zu bewerten, Angebote vorzubereiten, Lieferanten- oder Partnerkommunikation zu koordinieren, die Website zu betreiben und zu sichern, Geschäftsunterlagen zu führen und rechtliche Pflichten zu erfüllen.",
          "Je nach Kontext beruht die Verarbeitung auf vorvertraglicher oder vertraglicher Notwendigkeit, berechtigten Geschäftsinteressen, gesetzlichen Pflichten oder Einwilligung, wenn ein einwilligungsbasierter Dienst eingeführt wird.",
        ],
      },
      {
        title: "Einwilligungsbasierte Website-Analyse",
        paragraphs: [
          "Wenn ein Besucher Analytics akzeptiert, wird Google Analytics 4 eingesetzt, um aggregierte Besuche, ungefähre Herkunftsländer, Zugriffsquellen, beliebte Seiten sowie erfolgreiche Kontakt- oder RFQ-Übermittlungen zu verstehen. Rechtsgrundlage ist die Einwilligung; Google Analytics bleibt bis zu deren Erteilung deaktiviert.",
          "Analysedaten können von Google als Dienstleister verarbeitet werden und eine internationale Verarbeitung unter den anwendbaren vertraglichen und Übermittlungsgarantien von Google umfassen. Besucher können ihre Einwilligung jederzeit über die Cookie-Einstellungen im Footer widerrufen oder ändern.",
        ],
      },
      {
        title: "Empfänger Und Auftragsbearbeiter",
        paragraphs: [
          "Daten können an interne Mitarbeitende, E-Mail- und Hostinganbieter, IT-Dienstleister, Logistik- oder Technikpartner sowie professionelle Berater weitergegeben werden, soweit dies für die Anfrage oder einen rechtmäßigen Geschäftszweck erforderlich ist.",
          "brückenbauer GmbH verkauft keine personenbezogenen Daten. Auftragsbearbeiter sollen Daten nur auf Grundlage geeigneter vertraglicher, technischer und organisatorischer Schutzmaßnahmen verarbeiten.",
        ],
      },
      {
        title: "Internationale Übermittlungen",
        paragraphs: [
          "Wenn Dienstleister oder Projektpartner Daten außerhalb der Schweiz, des EWR oder von Staaten mit anerkannt angemessenem Schutz verarbeiten, werden soweit erforderlich geeignete Schutzmaßnahmen wie vertragliche Garantien oder anerkannte Übermittlungsmechanismen eingesetzt.",
        ],
      },
      {
        title: "Aufbewahrung",
        paragraphs: [
          "Personenbezogene Daten werden nur so lange aufbewahrt, wie es für den jeweiligen Geschäftszweck, gesetzliche Aufbewahrungspflichten, Streitprävention, Sicherheit und Prüfzwecke erforderlich ist. Anfrage- und RFQ-Daten können für die Dauer gespeichert werden, die zur Projektabwicklung und zugehörigen Geschäftsunterlagen notwendig ist.",
        ],
      },
      {
        title: "Ihre Rechte",
        paragraphs: [
          "Je nach anwendbarem Recht können betroffene Personen Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch gegen Verarbeitung, Widerruf einer Einwilligung und Informationen über die Nutzung ihrer Daten verlangen.",
          "Anfragen können an bus.dev@brueckenbauer-gmbh.ch gesendet werden. Betroffene Personen können sich außerdem an die zuständige Aufsichtsbehörde wenden, einschließlich des Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten, soweit anwendbar.",
        ],
      },
      {
        title: "Sicherheit Und Automatisierung",
        paragraphs: [
          "Wir setzen angemessene technische und organisatorische Maßnahmen ein, um personenbezogene Daten vor unbefugtem Zugriff, Verlust, Missbrauch und Veränderung zu schützen. Über diese Website findet keine ausschließlich automatisierte Entscheidungsfindung mit rechtlicher oder ähnlich erheblicher Wirkung statt.",
        ],
      },
      {
        title: "Aktualisierungen",
        paragraphs: [
          "Diese Erklärung kann aktualisiert werden, wenn sich Website-Funktionen, Dienstleister, rechtliche Anforderungen oder Geschäftsprozesse ändern. Das oben genannte Datum bezeichnet die aktuelle Version.",
        ],
      },
    ],
  },
  fr: {
    label: "Information légale",
    title: "Politique de confidentialité",
    updated: "Dernière mise à jour : 13 juin 2026",
    intro:
      "Cette politique de confidentialité explique comment brückenbauer GmbH traite les données personnelles transmises via ce site, les formulaires de contact, les parcours RFQ, les communications par e-mail et les interactions commerciales associées.",
    sections: [
      {
        title: "Responsable Du Traitement",
        paragraphs: [
          `${company} est responsable des traitements décrits dans cette politique. L'entreprise peut être contactée à bus.dev@brueckenbauer-gmbh.ch pour toute question relative à la confidentialité et à la protection des données.`,
        ],
      },
      {
        title: "Cadre Applicable",
        paragraphs: [
          "Le traitement est conçu conformément à la Loi fédérale suisse sur la protection des données et, le cas échéant, au Règlement général sur la protection des données de l'UE pour les visiteurs, contacts et partenaires commerciaux situés dans l'Espace économique européen.",
        ],
      },
      {
        title: "Données Traitées",
        paragraphs: [
          "Nous pouvons traiter les coordonnées professionnelles, les informations d'entreprise, le numéro de téléphone, l'adresse e-mail, le contenu des demandes, les informations RFQ, les intérêts produits ou applications, les notes de projet, la préférence linguistique, les horodatages, les journaux techniques et les métadonnées de communication.",
          "Nous ne demandons pas de catégories particulières de données personnelles via le site et invitons les utilisateurs à ne pas transmettre d'informations personnelles confidentielles qui ne seraient pas nécessaires à une demande commerciale.",
        ],
      },
      {
        title: "Finalités Et Bases Juridiques",
        paragraphs: [
          "Les données personnelles sont traitées pour répondre aux demandes, évaluer les exigences techniques et commerciales, préparer des devis, coordonner la communication avec les fournisseurs ou partenaires, exploiter et sécuriser le site, conserver des documents commerciaux et respecter les obligations légales.",
          "Selon le contexte, la base juridique est la nécessité précontractuelle ou contractuelle, les intérêts commerciaux légitimes, le respect d'obligations légales ou le consentement lorsqu'un service fondé sur le consentement est introduit.",
        ],
      },
      {
        title: "Analyse Du Site Fondée Sur Le Consentement",
        paragraphs: [
          "Si un visiteur accepte Analytics, Google Analytics 4 est utilisé pour comprendre les visites agrégées, les pays d'origine approximatifs, les sources de trafic, les pages populaires et les envois réussis des formulaires Contact ou RFQ. La base juridique est le consentement et Google Analytics reste désactivé jusqu'à son obtention.",
          "Les données analytiques peuvent être traitées par Google en tant que prestataire et impliquer un traitement international soumis aux garanties contractuelles et de transfert applicables de Google. Les visiteurs peuvent retirer ou modifier leur consentement à tout moment via les Paramètres des cookies dans le footer.",
        ],
      },
      {
        title: "Destinataires Et Sous-Traitants",
        paragraphs: [
          "Les données peuvent être partagées avec le personnel interne, les fournisseurs d'e-mail et d'hébergement, les prestataires informatiques, les partenaires logistiques ou techniques et les conseillers professionnels lorsque cela est nécessaire pour la demande ou un objectif commercial licite.",
          "brückenbauer GmbH ne vend pas de données personnelles. Les sous-traitants sont tenus de traiter les données uniquement avec des garanties contractuelles, techniques et organisationnelles appropriées.",
        ],
      },
      {
        title: "Transferts Internationaux",
        paragraphs: [
          "Si des prestataires ou partenaires de projet traitent des données en dehors de la Suisse, de l'EEE ou de pays reconnus comme offrant une protection adéquate, des garanties appropriées, telles que des protections contractuelles ou des mécanismes de transfert reconnus, sont utilisées lorsque cela est requis.",
        ],
      },
      {
        title: "Conservation",
        paragraphs: [
          "Les données personnelles sont conservées uniquement pendant la durée nécessaire à l'objectif commercial concerné, aux obligations légales de conservation, à la prévention des litiges, à la sécurité et aux besoins d'audit. Les dossiers de demande et RFQ peuvent être conservés pendant la durée nécessaire à la gestion du projet et de la documentation commerciale associée.",
        ],
      },
      {
        title: "Vos Droits",
        paragraphs: [
          "Selon le droit applicable, les personnes concernées peuvent demander l'accès, la rectification, l'effacement, la limitation, la portabilité, l'opposition au traitement, le retrait du consentement et des informations sur l'utilisation de leurs données.",
          "Les demandes peuvent être envoyées à bus.dev@brueckenbauer-gmbh.ch. Les personnes concernées peuvent également contacter l'autorité de contrôle compétente, y compris le Préposé fédéral suisse à la protection des données et à la transparence lorsque cela s'applique.",
        ],
      },
      {
        title: "Sécurité Et Automatisation",
        paragraphs: [
          "Nous appliquons des mesures techniques et organisationnelles raisonnables pour protéger les données personnelles contre l'accès non autorisé, la perte, l'abus et l'altération. Aucune décision entièrement automatisée produisant des effets juridiques ou similaires significatifs n'est utilisée via ce site.",
        ],
      },
      {
        title: "Mises À Jour",
        paragraphs: [
          "Cette politique peut être mise à jour lorsque les fonctionnalités du site, les prestataires, les exigences légales ou les processus commerciaux évoluent. La date ci-dessus identifie la version actuelle.",
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

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const localized = copy[normalizeLocale(locale)];

  return (
    <PageShell className="min-h-screen px-margin-mobile pb-24 pt-32 md:ml-20 md:px-margin-desktop">
      <LegalDocument {...localized} />
    </PageShell>
  );
}
