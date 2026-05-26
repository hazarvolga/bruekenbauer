import { NextResponse } from "next/server";
import { Resend } from "resend";
import * as React from "react";
import { RfqEmailTemplate } from "@/components/email/RfqEmailTemplate";

export interface RfqRequest {
  source: "general" | "product" | "power-family" | "application-sector";
  productSlug: string;
  familySlug: string;
  productGroup: string;
  productFamily: string;
  applicationSector: string;
  monthlyVolume: string;
  leadTime: string;
  name: string;
  email: string;
  company: string;
  notes: string;
}

function generateRef(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `RFQ-${ts}-${rand}`;
}

function validate(body: unknown): body is RfqRequest {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    typeof b.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    typeof b.company === "string" &&
    b.company.trim().length > 0
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON request." }, { status: 400 });
  }

  if (!validate(body)) {
    return NextResponse.json(
      { error: "Missing required fields: name, email, company." },
      { status: 422 }
    );
  }

  const referenceId = generateRef();
  const timestamp = new Date().toISOString();

  // Structured log — always log local record
  console.log(
    JSON.stringify({
      event: "rfq_submitted",
      referenceId,
      timestamp,
      fields: {
        source: body.source,
        productSlug: body.productSlug ? "provided" : "missing",
        familySlug: body.familySlug ? "provided" : "missing",
        productGroup: body.productGroup ? "provided" : "missing",
        productFamily: body.productFamily ? "provided" : "missing",
        applicationSector: body.applicationSector ? "provided" : "missing",
        monthlyVolume: body.monthlyVolume ? "provided" : "missing",
        leadTime: body.leadTime ? "provided" : "missing",
        hasName: Boolean(body.name.trim()),
        hasEmail: Boolean(body.email.trim()),
        hasCompany: Boolean(body.company.trim()),
        notesLength: body.notes?.trim().length ?? 0,
      },
    })
  );

  // Send email if key is provided
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
      const toEmail = process.env.RESEND_TO_EMAIL || "info@brueckenbauer.de";

      await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        subject: `[brückenbauer RFQ] ${body.company} — ${referenceId}`,
        react: React.createElement(RfqEmailTemplate, { request: body, referenceId, timestamp }),
      });
    } catch (err) {
      console.error("Failed to send RFQ email via Resend:", err);
      // Gracefully continue so submitter still gets a success response
    }
  }

  return NextResponse.json({ referenceId, timestamp }, { status: 201 });
}

