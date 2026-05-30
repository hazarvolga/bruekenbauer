import * as React from "react";
import { ContactRequest } from "@/app/api/contact/route";

interface ContactEmailTemplateProps {
  request: ContactRequest;
  referenceId: string;
  timestamp: string;
  locale?: string;
}

const translations = {
  en: {
    title: "INBOUND MESSAGE TRANSMISSION",
    referenceId: "REFERENCE ID",
    timestamp: "TIMESTAMP",
    senderMetadata: "1. SENDER METADATA",
    contactName: "CONTACT NAME",
    emailAddress: "EMAIL ADDRESS",
    companyName: "COMPANY NAME",
    phoneNumber: "PHONE NUMBER",
    communicatedContent: "2. COMMUNICATED CONTENT",
    footerText: "SYSTEMS REALISM / INBOUND RELAY LAYER",
    allRightsReserved: "All rights reserved.",
  },
  de: {
    title: "EINGEHENDE NACHRICHTENÜBERTRAGUNG",
    referenceId: "REFERENZ-ID",
    timestamp: "ZEITSTEMPEL",
    senderMetadata: "1. ABSENDER-METADATEN",
    contactName: "KONTAKTNAME",
    emailAddress: "E-MAIL-ADRESSE",
    companyName: "UNTERNEHMENSNAME",
    phoneNumber: "TELEFONNUMMER",
    communicatedContent: "2. ÜBERMITTELTER INHALT",
    footerText: "SYSTEMS REALISM / EINGEHENDE RELAIS-SCHICHT",
    allRightsReserved: "Alle Rechte vorbehalten.",
  },
  fr: {
    title: "TRANSMISSION DU MESSAGE ENTRANT",
    referenceId: "ID DE RÉFÉRENCE",
    timestamp: "HORODATAGE",
    senderMetadata: "1. MÉTADONNÉES DE L'EXPÉDITEUR",
    contactName: "NOM DU CONTACT",
    emailAddress: "ADRESSE E-MAIL",
    companyName: "NOM DE L'ENTREPRISE",
    phoneNumber: "NUMÉRO DE TÉLÉPHONE",
    communicatedContent: "2. CONTENU COMMUNIQUÉ",
    footerText: "SYSTEMS REALISM / COUCHE DE RELAIS ENTRANT",
    allRightsReserved: "Tous droits réservés.",
  },
};

export const ContactEmailTemplate: React.FC<ContactEmailTemplateProps> = ({
  request,
  referenceId,
  timestamp,
  locale = "en",
}) => {
  // Normalize locale to en, de, fr
  const lang = (locale === "de" || locale === "fr" ? locale : "en") as "en" | "de" | "fr";
  const copy = translations[lang];

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

  const messageBoxStyle: React.CSSProperties = {
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
        </tbody>
      </table>

      <h2 style={sectionTitleStyle}>{copy.senderMetadata}</h2>
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
          {request.company && (
            <tr>
              <td style={tableHeaderStyle}>{copy.companyName}</td>
              <td style={tableDataStyle}>{request.company}</td>
            </tr>
          )}
          {request.phone && (
            <tr>
              <td style={tableHeaderStyle}>{copy.phoneNumber}</td>
              <td style={tableDataStyle}>{request.phone}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2 style={sectionTitleStyle}>{copy.communicatedContent}</h2>
      <div style={messageBoxStyle}>{request.message}</div>

      <div style={footerStyle}>
        {copy.footerText}
        <br />© {new Date().getFullYear()} brückenbauer GmbH. {copy.allRightsReserved}
      </div>
    </div>
  );
};
