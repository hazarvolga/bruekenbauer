export type ServiceAccessMode = "perpetual" | "timed" | "maintenance";
export type ServiceAccessPhase = "active" | "notice" | "grace" | "maintenance";

export type ServiceAccessStatus = {
  mode: ServiceAccessMode;
  phase: ServiceAccessPhase;
  checkedAt: string;
  paidUntil: string | null;
  noticeStartsAt: string | null;
  graceEndsAt: string | null;
};

const DAY_MS = 24 * 60 * 60 * 1000;
const DEFAULT_PAYMENT_DEADLINE = "2026-07-01T23:59:59+03:00";

function normalizeMode(value: string | undefined): ServiceAccessMode {
  const mode = value?.trim().toLowerCase();

  if (!mode) return "timed";
  if (mode === "maintenance") return "maintenance";
  if (mode === "timed") return "timed";

  return "perpetual";
}

function parseDays(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function parseDate(value: string | undefined) {
  if (!value?.trim()) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function getServiceAccessStatus(now = new Date()): ServiceAccessStatus {
  const mode = normalizeMode(process.env.SERVICE_ACCESS_MODE);
  const checkedAt = now.toISOString();
  const paidUntil =
    parseDate(process.env.SERVICE_PAID_UNTIL) ?? parseDate(DEFAULT_PAYMENT_DEADLINE);
  const noticeDays = parseDays(process.env.SERVICE_NOTICE_DAYS, 3);
  const graceDays = parseDays(process.env.SERVICE_GRACE_DAYS, 0);
  const noticeStartsAt = paidUntil ? new Date(paidUntil.getTime() - noticeDays * DAY_MS) : null;
  const graceEndsAt = paidUntil ? new Date(paidUntil.getTime() + graceDays * DAY_MS) : null;
  const baseStatus = {
    mode,
    checkedAt,
    paidUntil: paidUntil?.toISOString() ?? null,
    noticeStartsAt: noticeStartsAt?.toISOString() ?? null,
    graceEndsAt: graceEndsAt?.toISOString() ?? null,
  };

  if (mode === "maintenance") {
    return { ...baseStatus, phase: "maintenance" };
  }

  if (mode === "perpetual" || !paidUntil) {
    return { ...baseStatus, phase: "active" };
  }

  if (graceEndsAt && now > graceEndsAt) {
    return { ...baseStatus, phase: "maintenance" };
  }

  if (now > paidUntil) {
    return { ...baseStatus, phase: "grace" };
  }

  if (noticeStartsAt && now >= noticeStartsAt) {
    return { ...baseStatus, phase: "notice" };
  }

  return { ...baseStatus, phase: "active" };
}

export function isServiceInMaintenance(status = getServiceAccessStatus()) {
  return status.phase === "maintenance";
}
