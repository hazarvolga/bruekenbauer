import { NextResponse } from "next/server";
import { Resend } from "resend";
import * as React from "react";
import { RfqEmailTemplate } from "@/components/email/RfqEmailTemplate";
import {
  checkFormRateLimit,
  getClientIp,
  getRequiredResendConfig,
  hasValidJsonContentType,
  isEmail,
  isText,
  readJsonBodyWithLimit,
} from "@/lib/formSecurity";

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
  locale?: string;
  website?: string;
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
    isText(b.source, 30, true) &&
    isText(b.productSlug, 160) &&
    isText(b.familySlug, 160) &&
    isText(b.productGroup, 160, true) &&
    isText(b.productFamily, 200, true) &&
    isText(b.applicationSector, 200, true) &&
    isText(b.monthlyVolume, 30, true) &&
    isText(b.leadTime, 100, true) &&
    isText(b.name, 120, true) &&
    isEmail(b.email) &&
    isText(b.company, 200, true) &&
    isText(b.notes, 5000) &&
    (b.locale === undefined || isText(b.locale, 5)) &&
    (b.website === undefined || isText(b.website, 200))
  );
}

export async function POST(request: Request) {
  if (!hasValidJsonContentType(request)) {
    return NextResponse.json({ error: "Content-Type must be application/json." }, { status: 415 });
  }

  const rateLimit = checkFormRateLimit(`rfq:${getClientIp(request)}`);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } }
    );
  }

  const parsed = await readJsonBodyWithLimit(request);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: parsed.status });
  }
  const body = parsed.body;
  const referenceId = generateRef();
  const timestamp = new Date().toISOString();

  if (
    typeof body === "object" &&
    body !== null &&
    typeof (body as Record<string, unknown>).website === "string" &&
    (body as Record<string, string>).website.trim()
  ) {
    return NextResponse.json({ referenceId, timestamp }, { status: 201 });
  }

  if (!validate(body)) {
    return NextResponse.json(
      { error: "Missing required fields: name, email, company." },
      { status: 422 }
    );
  }

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

  const resendConfig = getRequiredResendConfig();
  if (!resendConfig.ok) {
    console.error("RFQ delivery disabled: missing Resend configuration", {
      referenceId,
      missing: resendConfig.missing,
    });
    return NextResponse.json(
      { error: "Form delivery is temporarily unavailable." },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(resendConfig.apiKey);
    const locale = body.locale || "en";

    let subject = `[brückenbauer RFQ] ${body.company} — ${referenceId}`;
    if (locale === "de") {
      subject = `[brückenbauer Angebotsanfrage] ${body.company} — ${referenceId}`;
    } else if (locale === "fr") {
      subject = `[brückenbauer Demande d'offre] ${body.company} — ${referenceId}`;
    }

    const result = await resend.emails.send({
      from: resendConfig.fromEmail,
      to: resendConfig.toEmail,
      subject,
      react: React.createElement(RfqEmailTemplate, { request: body, referenceId, timestamp, locale }),
    });

    if (result && typeof result === "object" && "error" in result && result.error) {
      throw new Error(String(result.error));
    }
  } catch (err) {
    console.error("Failed to send RFQ email via Resend:", { referenceId, err });
    return NextResponse.json(
      { error: "Unable to deliver form at this time." },
      { status: 502 }
    );
  }

  return NextResponse.json({ referenceId, timestamp }, { status: 201 });
}
