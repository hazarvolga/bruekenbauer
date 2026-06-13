const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

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
