import { NextResponse } from "next/server";
import { Resend } from "resend";
import * as React from "react";
import { ContactEmailTemplate } from "@/components/email/ContactEmailTemplate";
import {
  checkFormRateLimit,
  exceedsBodyLimit,
  getClientIp,
  hasValidJsonContentType,
  isEmail,
  isText,
} from "@/lib/formSecurity";

export interface ContactRequest {
  name: string;
  email: string;
  company: string;
  phone?: string;
  message: string;
  locale?: string;
  website?: string;
}

function generateRef(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `MSG-${ts}-${rand}`;
}

function validate(body: unknown): body is ContactRequest {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    isText(b.name, 120, true) &&
    isEmail(b.email) &&
    isText(b.company, 200) &&
    (b.phone === undefined || isText(b.phone, 50)) &&
    isText(b.message, 5000, true) &&
    (b.locale === undefined || isText(b.locale, 5)) &&
    (b.website === undefined || isText(b.website, 200))
  );
}

export async function POST(request: Request) {
  if (!hasValidJsonContentType(request)) {
    return NextResponse.json({ error: "Content-Type must be application/json." }, { status: 415 });
  }
  if (exceedsBodyLimit(request)) {
    return NextResponse.json({ error: "Request body is too large." }, { status: 413 });
  }

  const rateLimit = checkFormRateLimit(`contact:${getClientIp(request)}`);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON request." }, { status: 400 });
  }

  if (!validate(body)) {
    return NextResponse.json(
      { error: "Missing required fields: name, email, message." },
      { status: 422 }
    );
  }

  const referenceId = generateRef();
  const timestamp = new Date().toISOString();

  if (body.website?.trim()) {
    return NextResponse.json({ referenceId, timestamp }, { status: 201 });
  }

  // Structured log — always log local record
  console.log(
    JSON.stringify({
      event: "contact_submitted",
      referenceId,
      timestamp,
      fields: {
        hasName: Boolean(body.name.trim()),
        hasEmail: Boolean(body.email.trim()),
        hasCompany: Boolean(body.company?.trim()),
        hasPhone: Boolean(body.phone?.trim()),
        messageLength: body.message.trim().length,
      },
    })
  );

  // Send email if key is provided
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
      const toEmailRaw = process.env.RESEND_TO_EMAIL || "info@brueckenbauer.de";
      const toEmail = toEmailRaw.split(",").map((e) => e.trim());
      const locale = body.locale || "en";
      const subjectPrefix = locale === "de" ? "Kontakt" : "Contact";

      await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        subject: `[brückenbauer ${subjectPrefix}] ${body.name} (${body.company || "N/A"}) — ${referenceId}`,
        react: React.createElement(ContactEmailTemplate, { request: body, referenceId, timestamp, locale }),
      });
    } catch (err) {
      console.error("Failed to send Contact email via Resend:", err);
      // Gracefully continue so submitter still gets a success response
    }
  }

  return NextResponse.json({ referenceId, timestamp }, { status: 201 });
}
