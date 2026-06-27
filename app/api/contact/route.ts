import { NextResponse } from "next/server";
import { Resend } from "resend";
import * as React from "react";
import { ContactEmailTemplate } from "@/components/email/ContactEmailTemplate";
import {
  checkFormRateLimit,
  getClientIp,
  getRequiredResendConfig,
  hasValidJsonContentType,
  isEmail,
  isText,
  readJsonBodyWithLimit,
  verifyTurnstileToken,
} from "@/lib/formSecurity";

export interface ContactRequest {
  name: string;
  email: string;
  company: string;
  phone?: string;
  message: string;
  locale?: string;
  website?: string;
  turnstileToken?: string;
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
    (b.website === undefined || isText(b.website, 200)) &&
    (b.turnstileToken === undefined || isText(b.turnstileToken, 4096))
  );
}

export async function POST(request: Request) {
  if (!hasValidJsonContentType(request)) {
    return NextResponse.json({ error: "Content-Type must be application/json." }, { status: 415 });
  }

  const rateLimit = checkFormRateLimit(`contact:${getClientIp(request)}`);
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
      { error: "Missing required fields: name, email, message." },
      { status: 422 }
    );
  }

  const turnstile = await verifyTurnstileToken(body.turnstileToken, getClientIp(request));
  if (!turnstile.ok) {
    console.error("Contact Turnstile verification failed", {
      referenceId,
      reason: turnstile.reason,
    });
    return NextResponse.json(
      { error: "Bot verification failed. Please refresh and try again." },
      { status: 403 }
    );
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

  const resendConfig = getRequiredResendConfig();
  if (!resendConfig.ok) {
    console.error("Contact delivery disabled: missing Resend configuration", {
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
    const subjectPrefix = locale === "de" ? "Kontakt" : "Contact";

    const result = await resend.emails.send({
      from: resendConfig.fromEmail,
      to: resendConfig.toEmail,
      subject: `[brückenbauer ${subjectPrefix}] ${body.name} (${body.company || "N/A"}) — ${referenceId}`,
      react: React.createElement(ContactEmailTemplate, {
        request: body,
        referenceId,
        timestamp,
        locale,
      }),
    });

    if (result && typeof result === "object" && "error" in result && result.error) {
      throw new Error(String(result.error));
    }
  } catch (err) {
    console.error("Failed to send Contact email via Resend:", { referenceId, err });
    return NextResponse.json({ error: "Unable to deliver form at this time." }, { status: 502 });
  }

  return NextResponse.json({ referenceId, timestamp }, { status: 201 });
}
