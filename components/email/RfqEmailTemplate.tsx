import * as React from "react";
import { RfqRequest } from "@/app/api/rfq/route";

interface RfqEmailTemplateProps {
  request: RfqRequest;
  referenceId: string;
  timestamp: string;
}

export const RfqEmailTemplate: React.FC<RfqEmailTemplateProps> = ({
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
    textTransform: "uppercase",
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
        <p style={subTitleStyle}>REQUEST FOR QUOTATION / PROCURE_INQUIRY</p>
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
          <tr>
            <td style={tableHeaderStyle}>INQUIRY SOURCE</td>
            <td style={{ ...tableDataStyle, textTransform: "uppercase" }}>{request.source}</td>
          </tr>
        </tbody>
      </table>

      <h2 style={sectionTitleStyle}>1. SUBMITTER PROFILE</h2>
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
          <tr>
            <td style={tableHeaderStyle}>COMPANY NAME</td>
            <td style={tableDataStyle}>{request.company}</td>
          </tr>
        </tbody>
      </table>

      <h2 style={sectionTitleStyle}>2. TECHNICAL SPECIFICATIONS</h2>
      <table style={metaGridStyle}>
        <tbody>
          {request.productGroup && (
            <tr>
              <td style={tableHeaderStyle}>PRODUCT GROUP</td>
              <td style={tableDataStyle}>{request.productGroup}</td>
            </tr>
          )}
          {request.productFamily && (
            <tr>
              <td style={tableHeaderStyle}>PRODUCT FAMILY</td>
              <td style={tableDataStyle}>{request.productFamily}</td>
            </tr>
          )}
          {request.productSlug && (
            <tr>
              <td style={tableHeaderStyle}>PRODUCT SLUG</td>
              <td style={tableDataStyle}>{request.productSlug}</td>
            </tr>
          )}
          {request.familySlug && (
            <tr>
              <td style={tableHeaderStyle}>FAMILY SLUG</td>
              <td style={tableDataStyle}>{request.familySlug}</td>
            </tr>
          )}
          {request.applicationSector && (
            <tr>
              <td style={tableHeaderStyle}>APPLICATION SECTOR</td>
              <td style={tableDataStyle}>{request.applicationSector}</td>
            </tr>
          )}
          {request.monthlyVolume && (
            <tr>
              <td style={tableHeaderStyle}>MONTHLY VOLUME</td>
              <td style={tableDataStyle}>{request.monthlyVolume}</td>
            </tr>
          )}
          {request.leadTime && (
            <tr>
              <td style={tableHeaderStyle}>TARGET LEAD TIME</td>
              <td style={tableDataStyle}>{request.leadTime}</td>
            </tr>
          )}
        </tbody>
      </table>

      {request.notes && (
        <>
          <h2 style={sectionTitleStyle}>3. ADDITIONAL REQUIREMENTS / NOTES</h2>
          <div style={notesBoxStyle}>{request.notes}</div>
        </>
      )}

      <div style={footerStyle}>
        SYSTEMS REALISM / OEM PROCURE SERVICE LAYER<br />
        © {new Date().getFullYear()} brückenbauer GmbH. All rights reserved.
      </div>
    </div>
  );
};
