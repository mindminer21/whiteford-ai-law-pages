export function usd(value: number, opts: { compact?: boolean; cents?: boolean } = {}) {
  if (!Number.isFinite(value)) return "—";
  if (opts.compact && Math.abs(value) >= 1_000_000) {
    const m = value / 1_000_000;
    return `$${m.toLocaleString("en-US", { maximumFractionDigits: m >= 100 ? 0 : m >= 10 ? 1 : 2 })}M`;
  }
  if (opts.compact && Math.abs(value) >= 10_000) {
    return `$${(value / 1000).toLocaleString("en-US", { maximumFractionDigits: 0 })}K`;
  }
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: opts.cents ? 2 : 0,
    maximumFractionDigits: opts.cents ? (Math.abs(value) > 0 && Math.abs(value) < 0.01 ? 6 : 4) : 0,
  });
}

export function pct(fraction: number, digits = 1) {
  if (!Number.isFinite(fraction)) return "—";
  return `${(fraction * 100).toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })}%`;
}

export function int(value: number) {
  if (!Number.isFinite(value)) return "—";
  return Math.round(value).toLocaleString("en-US");
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** Formats YYYY-MM-DD as "March 5, 2026" without time-zone drift. */
export function longDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

/** Adds calendar days to a YYYY-MM-DD date. */
export function addDays(iso: string, days: number) {
  const date = new Date(`${iso}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/** Adds calendar months to a YYYY-MM-DD date, clamping to the month's last day. */
export function addMonths(iso: string, months: number) {
  const [y, m, d] = iso.split("-").map(Number);
  const target = new Date(Date.UTC(y, m - 1 + months, 1, 12));
  const lastDay = new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0, 12)).getUTCDate();
  target.setUTCDate(Math.min(d, lastDay));
  return target.toISOString().slice(0, 10);
}

export function weekday(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" });
}

export function daysBetween(fromIso: string, toIso: string) {
  const a = new Date(`${fromIso}T12:00:00Z`).getTime();
  const b = new Date(`${toIso}T12:00:00Z`).getTime();
  return Math.round((b - a) / 86_400_000);
}
