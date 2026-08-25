"use client";

import { useMemo, useState } from "react";
import type { ContributionDay } from "@/lib/coding/types";

const DAY_MS = 86_400_000;
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

type Cell = { date: string; count: number; level: number };

function isoAddDays(base: Date, days: number) {
  return new Date(base.getTime() + days * DAY_MS);
}

function label(date: string, count: number) {
  const d = new Date(`${date}T00:00:00Z`);
  const pretty = d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  return `${count === 0 ? "No" : count} ${count === 1 ? "submission" : "submissions"} on ${pretty}`;
}

export default function Heatmap({
  days,
  weeks = 53,
  unit = "submissions",
}: {
  days: ContributionDay[];
  weeks?: number;
  unit?: string;
}) {
  const [hover, setHover] = useState<Cell | null>(null);

  const { columns, monthLabels, total, activeDays } = useMemo(() => {
    const byDate = new Map(days.map((d) => [d.date, d]));

    // End on the most recent Saturday so the last column is complete.
    const today = new Date();
    const end = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()),
    );
    end.setUTCDate(end.getUTCDate() + (6 - end.getUTCDay()));
    const start = isoAddDays(end, -(weeks * 7 - 1));

    const cols: Cell[][] = [];
    const labels: { col: number; text: string }[] = [];
    let seenMonth = -1;

    for (let w = 0; w < weeks; w++) {
      const col: Cell[] = [];
      for (let d = 0; d < 7; d++) {
        const day = isoAddDays(start, w * 7 + d);
        const iso = day.toISOString().slice(0, 10);
        const found = byDate.get(iso);
        col.push({ date: iso, count: found?.count ?? 0, level: found?.level ?? 0 });

        if (d === 0) {
          const m = day.getUTCMonth();
          // One label per month. Only the very last column is skipped — it has
          // no room for text. Anything stricter silently drops the current
          // month, which is the one people look for.
          if (m !== seenMonth && w <= weeks - 2) {
            labels.push({ col: w, text: MONTHS[m] });
            seenMonth = m;
          }
        }
      }
      cols.push(col);
    }

    const inRange = days.filter((d) => d.date >= start.toISOString().slice(0, 10));
    return {
      columns: cols,
      monthLabels: labels,
      total: inRange.reduce((a, d) => a + d.count, 0),
      activeDays: inRange.filter((d) => d.count > 0).length,
    };
  }, [days, weeks]);

  // Steps of the ramp defined in globals.css, so both themes are handled there.
  const fill = (level: number) => `var(--hm-${Math.min(Math.max(level, 0), 4)})`;

  return (
    <div>
      {/* Summary — the same facts the tooltip carries, available without hover. */}
      <p className="mb-2.5 text-[13px] text-muted">
        <span className="font-medium text-fg tabular-nums">{total}</span> {unit} across{" "}
        <span className="font-medium text-fg tabular-nums">{activeDays}</span> active{" "}
        {activeDays === 1 ? "day" : "days"} in the past year
      </p>

      <div className="relative">
        {/* Scrolls inside the card on narrow screens rather than squashing the
            cells or pushing the page wide. */}
        <div className="-mx-1 overflow-x-auto px-1 pb-1">
          {/* Block-level so it fills the card, with a px floor that turns on
              horizontal scrolling instead of squashing cells on small screens.
              Using width:100% here would overflow once the grid gaps are added. */}
          <div style={{ minWidth: `max(100%, ${columns.length * 8}px)` }}>
            {/* Month ruler */}
            <div
              className="mb-1 grid gap-[2px]"
              style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0,1fr))` }}
              aria-hidden
            >
              {columns.map((_, i) => {
                const m = monthLabels.find((l) => l.col === i);
                return (
                  <span key={i} className="h-3 font-mono text-[9px] leading-3 text-faint">
                    {m ? m.text : ""}
                  </span>
                );
              })}
            </div>

            {/* Calendar */}
            <div
              role="img"
              aria-label={`Activity heatmap: ${total} ${unit} across ${activeDays} active days in the past year.`}
              className="grid grid-flow-col grid-rows-7 gap-[2px]"
              style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0,1fr))` }}
            >
              {columns.flatMap((col) =>
                col.map((cell) => {
                  const active = cell.count > 0;
                  return (
                    <span
                      key={cell.date}
                      // Only active days are focusable — 365 tab stops would
                      // make keyboard navigation of the page unusable.
                      tabIndex={active ? 0 : -1}
                      aria-label={active ? label(cell.date, cell.count) : undefined}
                      onMouseEnter={() => setHover(cell)}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover(cell)}
                      onBlur={() => setHover(null)}
                      style={{ backgroundColor: fill(cell.level) }}
                      className={`aspect-square w-full rounded-[2px] ring-fg/60 transition-[transform,box-shadow] duration-150 hover:scale-[1.35] hover:ring-1 focus-visible:scale-[1.35] focus-visible:ring-1 ${
                        active ? "cursor-pointer" : ""
                      }`}
                    />
                  );
                }),
              )}
            </div>
          </div>
        </div>

        {/* Tooltip — one node reused, rather than 371 hidden ones. */}
        <div
          role="status"
          aria-live="polite"
          className={`pointer-events-none mt-2 inline-flex items-center rounded-lg border border-line bg-card-2 px-2.5 py-1 font-mono text-[11px] text-fg transition-opacity duration-150 ${
            hover ? "opacity-100" : "opacity-0"
          }`}
        >
          {hover ? label(hover.date, hover.count) : " "}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-1 flex items-center gap-1.5 text-[10px] text-faint">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <span
            key={l}
            aria-hidden
            style={{ backgroundColor: fill(l) }}
            className="h-2.5 w-2.5 rounded-[2px]"
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
