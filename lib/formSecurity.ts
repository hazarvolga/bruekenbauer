const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const DEFAULT_BODY_LIMIT_BYTES = 32_768;
const TURNSTILE_VERIFY_ENDPOINT = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const globalForRateLimit = globalThis as typeof globalThis & {
  formRateLimits?: Map<string, RateLimitEntry>;
};

const formRateLimits = globalForRateLimit.formRateLimits ?? new Map<string, RateLimitEntry>();
globalForRateLimit.formRateLimits = formRateLimits;

export function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export function checkFormRateLimit(key: string) {
  const now = Date.now();
  const current = formRateLimits.get(key);

  if (!current || current.resetAt <= now) {
    formRateLimits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfter: 0 };
}

export function hasValidJsonContentType(request: Request) {
  return request.headers.get("content-type")?.toLowerCase().includes("application/json") ?? false;
}

export function exceedsBodyLimit(request: Request, maxBytes = 32_768) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  return Number.isFinite(contentLength) && contentLength > maxBytes;
}

export async function readJsonBodyWithLimit(request: Request, maxBytes = DEFAULT_BODY_LIMIT_BYTES) {
  if (exceedsBodyLimit(request, maxBytes)) {
    return { ok: false as const, status: 413, error: "Request body is too large." };
  }

  let rawBody = "";
  try {
    rawBody = await request.text();
  } catch {
    return { ok: false as const, status: 400, error: "Unable to read request body." };
  }

  if (new TextEncoder().encode(rawBody).byteLength > maxBytes) {
    return { ok: false as const, status: 413, error: "Request body is too large." };
  }

  try {
    return { ok: true as const, body: JSON.parse(rawBody) as unknown };
  } catch {
    return { ok: false as const, status: 400, error: "Invalid JSON request." };
  }
}

export function getRequiredResendConfig() {
  const config = {
    apiKey: process.env.RESEND_API_KEY?.trim() || "",
    fromEmail: process.env.RESEND_FROM_EMAIL?.trim() || "",
    toEmailRaw: process.env.RESEND_TO_EMAIL?.trim() || "",
  };

  const missing = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    return { ok: false as const, missing };
  }

  const toEmail = config.toEmailRaw.split(",").map((email) => email.trim()).filter(Boolean);
  if (toEmail.length === 0) {
    return { ok: false as const, missing: ["toEmailRaw"] };
  }

  return {
    ok: true as const,
    apiKey: config.apiKey,
    fromEmail: config.fromEmail,
    toEmail,
  };
}

export async function verifyTurnstileToken(token: unknown, remoteIp?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  const isProduction = process.env.NODE_ENV === "production";

  if (!secret) {
    return {
      ok: !isProduction,
      reason: isProduction ? "missing_turnstile_secret" : "turnstile_disabled_in_dev",
    };
  }

  if (typeof token !== "string" || token.trim().length === 0) {
    return { ok: false, reason: "missing_turnstile_token" };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (remoteIp && remoteIp !== "unknown") {
    body.set("remoteip", remoteIp);
  }

  try {
    const response = await fetch(TURNSTILE_VERIFY_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    const result = (await response.json()) as {
      success?: boolean;
      "error-codes"?: string[];
    };

    return {
      ok: response.ok && result.success === true,
      reason: result["error-codes"]?.join(",") || (response.ok ? "verification_failed" : "verification_unavailable"),
    };
  } catch {
    return { ok: false, reason: "verification_unavailable" };
  }
}

export function isText(value: unknown, maxLength: number, required = false) {
  if (typeof value !== "string" || value.length > maxLength) return false;
  return required ? value.trim().length > 0 : true;
}

export function isEmail(value: unknown) {
  return (
    typeof value === "string" &&
    value.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  );
}
