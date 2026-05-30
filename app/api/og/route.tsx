import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "brückenbauer";
    const subtitle = searchParams.get("subtitle") || "High-Reliability B2B Industrial Components";
    const label = searchParams.get("label") || "ENGINEERING DOSSIER";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#080808",
            border: "12px solid #ff0000",
            padding: "60px 80px",
            justifyContent: "space-between",
            fontFamily: "monospace",
          }}
        >
          {/* Top Row: Reticle style corners / branding */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              borderBottom: "1px solid #222222",
              paddingBottom: "20px",
            }}
          >
            <span style={{ fontSize: "16px", color: "#ff0000", fontWeight: "bold", letterSpacing: "0.2em" }}>
              {label.toUpperCase()}
            </span>
            <span style={{ fontSize: "16px", color: "#a0a0a0", letterSpacing: "0.1em" }}>
              BRUECKENBAUER.COM
            </span>
          </div>

          {/* Middle Row: Big Bold Brutalist Header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "40px",
              marginBottom: "40px",
            }}
          >
            <h1
              style={{
                fontSize: "64px",
                fontWeight: "900",
                color: "#ffffff",
                margin: 0,
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                lineHeight: "1.1",
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: "24px",
                color: "#888888",
                marginTop: "20px",
                marginRight: 0,
                marginBottom: 0,
                marginLeft: 0,
                lineHeight: "1.4",
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Bottom Row: Metadata Grid / Industrial Accents */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid #222222",
              paddingTop: "20px",
            }}
          >
            <div style={{ display: "flex", gap: "40px" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "12px", color: "#666666" }}>ORIGIN</span>
                <span style={{ fontSize: "14px", color: "#cccccc", marginTop: "4px" }}>SWITZERLAND</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "12px", color: "#666666" }}>STATUS</span>
                <span style={{ fontSize: "14px", color: "#ff0000", marginTop: "4px" }}>ACTIVE</span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #444444",
                padding: "8px 16px",
                fontSize: "14px",
                color: "#aaaaaa",
              }}
            >
              [ RETICLE ENGAGED ]
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Image generation failed";
    return new Response(`Failed to generate the image: ${errorMsg}`, {
      status: 500,
    });
  }
}
