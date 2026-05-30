import * as React from "react";
import { RfqRequest } from "@/app/api/rfq/route";

interface RfqEmailTemplateProps {
  request: RfqRequest;
  referenceId: string;
  timestamp: string;
  locale?: string;
}

const translations = {
  en: {
    title: "REQUEST FOR QUOTATION / PROCURE_INQUIRY",
    referenceId: "REFERENCE ID",
    timestamp: "TIMESTAMP",
    inquirySource: "INQUIRY SOURCE",
    submitterProfile: "1. SUBMITTER PROFILE",
    contactName: "CONTACT NAME",
    emailAddress: "EMAIL ADDRESS",
    companyName: "COMPANY NAME",
    technicalSpecs: "2. TECHNICAL SPECIFICATIONS",
    productGroup: "PRODUCT GROUP",
    productFamily: "PRODUCT FAMILY",
    productSlug: "PRODUCT SLUG",
    familySlug: "FAMILY SLUG",
    applicationSector: "APPLICATION SECTOR",
    monthlyVolume: "MONTHLY VOLUME",
    targetLeadTime: "TARGET LEAD TIME",
    additionalNotes: "3. ADDITIONAL REQUIREMENTS / NOTES",
    footerText: "SYSTEMS REALISM / OEM PROCURE SERVICE LAYER",
    allRightsReserved: "All rights reserved.",
    source: {
      general: "GENERAL",
      product: "PRODUCT",
      "power-family": "POWER FAMILY",
      "application-sector": "APPLICATION SECTOR",
    },
  },
  de: {
    title: "ANGEBOTSANFRAGE / BESCHAFFUNGSANFRAGE",
    referenceId: "REFERENZ-ID",
    timestamp: "ZEITSTEMPEL",
    inquirySource: "ANFRAGEQUELLE",
    submitterProfile: "1. PROFIL DES ABSENDERS",
    contactName: "KONTAKTNAME",
    emailAddress: "E-MAIL-ADRESSE",
    companyName: "UNTERNEHMENSNAME",
    technicalSpecs: "2. TECHNISCHE SPEZIFIKATIONEN",
    productGroup: "PRODUKTGRUPPE",
    productFamily: "PRODUKTFAMILIE",
    productSlug: "PRODUKT-SLUG",
    familySlug: "FAMILIEN-SLUG",
    applicationSector: "ANWENDUNGSBEREICH",
    monthlyVolume: "MONATLICHES VOLUMEN",
    targetLeadTime: "ZIEL-LIEFERZEIT",
    additionalNotes: "3. ZUSÄTZLICHE ANFORDERUNGEN / NOTIZEN",
    footerText: "SYSTEMS REALISM / OEM-BESCHAFFUNGSSERVICE-SCHICHT",
    allRightsReserved: "Alle Rechte vorbehalten.",
    source: {
      general: "ALLGEMEIN",
      product: "PRODUKT",
      "power-family": "POWER-FAMILIE",
      "application-sector": "ANWENDUNGSBEREICH",
    },
  },
  fr: {
    title: "DEMANDE DE DEVIS / DEMANDE D'APPROVISIONNEMENT",
    referenceId: "ID DE RÉFÉRENCE",
    timestamp: "HORODATAGE",
    inquirySource: "SOURCE DE LA DEMANDE",
    submitterProfile: "1. PROFIL DU DEMANDEUR",
    contactName: "NOM DU CONTACT",
    emailAddress: "ADRESSE E-MAIL",
    companyName: "NOM DE L'ENTREPRISE",
    technicalSpecs: "2. SPÉCIFICATIONS TECHNIQUES",
    productGroup: "GROUPE DE PRODUITS",
    productFamily: "FAMILLE DE PRODUITS",
    productSlug: "SLUG DU PRODUIT",
    familySlug: "SLUG DE LA FAMILLE",
    applicationSector: "SECTEUR D'APPLICATION",
    monthlyVolume: "VOLUME MENSUEL",
    targetLeadTime: "DÉLAI CIBLE",
    additionalNotes: "3. EXIGENCES SUPPLÉMENTAIRES / NOTES",
    footerText: "SYSTEMS REALISM / COUCHE DE SERVICE D'APPROVISIONNEMENT OEM",
    allRightsReserved: "Tous droits réservés.",
    source: {
      general: "GÉNÉRAL",
      product: "PRODUIT",
      "power-family": "FAMILLE D'ALIMENTATION",
      "application-sector": "SECTEUR D'APPLICATION",
    },
  },
};

export const RfqEmailTemplate: React.FC<RfqEmailTemplateProps> = ({
  request,
  referenceId,
  timestamp,
  locale = "en",
}) => {
  // Normalize locale to en, de, fr
  const lang = (locale === "de" || locale === "fr" ? locale : "en") as "en" | "de" | "fr";
  const copy = translations[lang];

  // Resolve localized source display string
  const sourceKey = request.source || "general";
  const localizedSource = copy.source[sourceKey] || sourceKey.toUpperCase();

  const containerStyle: React.CSSProperties = {
    fontFamily: 'JetBrains Mono, Menlo, Monaco, Consolas, "Courier New", monospace',
    backgroundColor: "#141313",
    color: "#d1d1d1",
    padding: "40px",
    maxWidth: "600px",
    margin: "0 auto",
    border: "1px solid #444748",
  };

  const headerStyle: React.CSSProperties = {
    borderBottom: "2px solid #ff0000",
    paddingBottom: "20px",
    marginBottom: "30px",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "20px",
    fontWeight: 600,
    color: "#d1d1d1",
    margin: "0 0 10px 0",
    letterSpacing: "0.05em",
  };

  const subTitleStyle: React.CSSProperties = {
    fontSize: "12px",
    color: "#ff0000",
    margin: 0,
    letterSpacing: "0.1em",
    fontWeight: "bold",
  };

  const metaGridStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "30px",
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: "12px",
    fontWeight: 700,
    color: "#ff0000",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    borderBottom: "1px solid #444748",
    paddingBottom: "8px",
    marginBottom: "15px",
    marginTop: "30px",
  };

  const tableHeaderStyle: React.CSSProperties = {
    fontSize: "10px",
    textTransform: "uppercase",
    color: "#c4c7c7",
    padding: "8px 0",
    textAlign: "left",
    borderBottom: "1px solid #1a1a1a",
    width: "35%",
  };

  const tableDataStyle: React.CSSProperties = {
    fontSize: "12px",
    color: "#d1d1d1",
    padding: "8px 0",
    borderBottom: "1px solid #1a1a1a",
  };

  const notesBoxStyle: React.CSSProperties = {
    backgroundColor: "#1c1b1b",
    border: "1px solid #444748",
    padding: "20px",
    fontSize: "12px",
    color: "#c4c7c7",
    lineHeight: "1.6",
    whiteSpace: "pre-wrap",
  };

  const footerStyle: React.CSSProperties = {
    marginTop: "40px",
    paddingTop: "20px",
    borderTop: "1px solid #444748",
    fontSize: "10px",
    color: "#c4c7c7",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>brückenbauer GmbH</h1>
        <p style={subTitleStyle}>{copy.title}</p>
      </div>

      <table style={metaGridStyle}>
        <tbody>
          <tr>
            <td style={tableHeaderStyle}>{copy.referenceId}</td>
            <td style={tableDataStyle}>
              <strong style={{ color: "#ff0000" }}>{referenceId}</strong>
            </td>
          </tr>
          <tr>
            <td style={tableHeaderStyle}>{copy.timestamp}</td>
            <td style={tableDataStyle}>{timestamp}</td>
          </tr>
          <tr>
            <td style={tableHeaderStyle}>{copy.inquirySource}</td>
            <td style={tableDataStyle}>{localizedSource}</td>
          </tr>
        </tbody>
      </table>

      <h2 style={sectionTitleStyle}>{copy.submitterProfile}</h2>
      <table style={metaGridStyle}>
        <tbody>
          <tr>
            <td style={tableHeaderStyle}>{copy.contactName}</td>
            <td style={tableDataStyle}>{request.name}</td>
          </tr>
          <tr>
            <td style={tableHeaderStyle}>{copy.emailAddress}</td>
            <td style={tableDataStyle}>
              <a
                href={`mailto:${request.email}`}
                style={{ color: "#cc5500", textDecoration: "none" }}
              >
                {request.email}
              </a>
            </td>
          </tr>
          <tr>
            <td style={tableHeaderStyle}>{copy.companyName}</td>
            <td style={tableDataStyle}>{request.company}</td>
          </tr>
        </tbody>
      </table>

      <h2 style={sectionTitleStyle}>{copy.technicalSpecs}</h2>
      <table style={metaGridStyle}>
        <tbody>
          {request.productGroup && (
            <tr>
              <td style={tableHeaderStyle}>{copy.productGroup}</td>
              <td style={tableDataStyle}>{request.productGroup}</td>
            </tr>
          )}
          {request.productFamily && (
            <tr>
              <td style={tableHeaderStyle}>{copy.productFamily}</td>
              <td style={tableDataStyle}>{request.productFamily}</td>
            </tr>
          )}
          {request.productSlug && (
            <tr>
              <td style={tableHeaderStyle}>{copy.productSlug}</td>
              <td style={tableDataStyle}>{request.productSlug}</td>
            </tr>
          )}
          {request.familySlug && (
            <tr>
              <td style={tableHeaderStyle}>{copy.familySlug}</td>
              <td style={tableDataStyle}>{request.familySlug}</td>
            </tr>
          )}
          {request.applicationSector && (
            <tr>
              <td style={tableHeaderStyle}>{copy.applicationSector}</td>
              <td style={tableDataStyle}>{request.applicationSector}</td>
            </tr>
          )}
          {request.monthlyVolume && (
            <tr>
              <td style={tableHeaderStyle}>{copy.monthlyVolume}</td>
              <td style={tableDataStyle}>{request.monthlyVolume}</td>
            </tr>
          )}
          {request.leadTime && (
            <tr>
              <td style={tableHeaderStyle}>{copy.targetLeadTime}</td>
              <td style={tableDataStyle}>{request.leadTime}</td>
            </tr>
          )}
        </tbody>
      </table>

      {request.notes && (
        <>
          <h2 style={sectionTitleStyle}>{copy.additionalNotes}</h2>
          <div style={notesBoxStyle}>{request.notes}</div>
        </>
      )}

      <div style={footerStyle}>
        {copy.footerText}
        <br />© {new Date().getFullYear()} brückenbauer GmbH. {copy.allRightsReserved}
      </div>
    </div>
  );
};
