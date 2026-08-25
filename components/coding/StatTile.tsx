import type { ReactNode } from "react";

/** Compact figure + label, used across both cards. */
export default function StatTile({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  /** CSS colour for the figure; falls back to the normal foreground. */
  accent?: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-card-2 px-3 py-2.5">
      <div
        className="font-mono text-lg font-semibold leading-none tracking-tight tabular-nums"
        style={accent ? { color: accent } : undefined}
      >
        {value}
      </div>
      <div className="mt-1.5 text-[11px] uppercase tracking-wide text-faint">
        {label}
      </div>
      {hint ? <div className="mt-0.5 text-[11px] text-muted">{hint}</div> : null}
    </div>
  );
}
