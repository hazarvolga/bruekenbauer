import * as React from "react";
import { ContactRequest } from "@/app/api/contact/route";

interface ContactEmailTemplateProps {
  request: ContactRequest;
  referenceId: string;
  timestamp: string;
}

export const ContactEmailTemplate: React.FC<ContactEmailTemplateProps> = ({
  request,
  referenceId,
  timestamp,
}) => {
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
        <h1 style={titleStyle}>brüeckenbauer GmbH</h1>
        <p style={subTitleStyle}>INBOUND MESSAGE TRANSMISSION</p>
      </div>

      <table style={metaGridStyle}>
        <tbody>
          <tr>
            <td style={tableHeaderStyle}>REFERENCE ID</td>
            <td style={tableDataStyle}>
              <strong style={{ color: "#ff0000" }}>{referenceId}</strong>
            </td>
          </tr>
          <tr>
            <td style={tableHeaderStyle}>TIMESTAMP</td>
            <td style={tableDataStyle}>{timestamp}</td>
          </tr>
        </tbody>
      </table>

      <h2 style={sectionTitleStyle}>1. SENDER METADATA</h2>
      <table style={metaGridStyle}>
        <tbody>
          <tr>
            <td style={tableHeaderStyle}>CONTACT NAME</td>
            <td style={tableDataStyle}>{request.name}</td>
          </tr>
          <tr>
            <td style={tableHeaderStyle}>EMAIL ADDRESS</td>
            <td style={tableDataStyle}>
              <a href={`mailto:${request.email}`} style={{ color: "#cc5500", textDecoration: "none" }}>
                {request.email}
              </a>
            </td>
          </tr>
          {request.company && (
            <tr>
              <td style={tableHeaderStyle}>COMPANY NAME</td>
              <td style={tableDataStyle}>{request.company}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2 style={sectionTitleStyle}>2. COMMUNICATED CONTENT</h2>
      <div style={messageBoxStyle}>{request.message}</div>

      <div style={footerStyle}>
        SYSTEMS REALISM / INBOUND RELAY LAYER<br />
        © {new Date().getFullYear()} brüeckenbauer GmbH. All rights reserved.
      </div>
    </div>
  );
};
