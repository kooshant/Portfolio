"use client";

import { useState } from "react";
import Image from "next/image";
import { skillGroups, skills, type SkillGroup } from "@/data/profile";
import Brand from "./Brand";
import Reveal from "./Reveal";
import SectionBand from "./SectionBand";

type Filter = SkillGroup | "All";
const filters: Filter[] = ["All", ...skillGroups];

export default function Stack() {
  const [filter, setFilter] = useState<Filter>("All");

  return (
    <section id="stack" className="scroll-mt-24">
      <SectionBand
        title="Stack"
        aside={
          <span className="font-mono text-xs text-faint">{skills.length} tools</span>
        }
      />

      <div className="gutter py-8 sm:py-10">
        <Reveal>
          {/* Segmented control: one recessed track, the active chip lifts out of it. */}
          <div
            role="group"
            aria-label="Filter stack by category"
            className="inline-flex flex-wrap gap-1 rounded-2xl border border-line bg-bg-soft p-1"
          >
            {filters.map((f) => {
              const isActive = filter === f;
              const count =
                f === "All" ? skills.length : skills.filter((s) => s.group === f).length;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={isActive}
                  className={`group relative inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[13px] font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-accent text-bg shadow-[0_6px_18px_-8px_var(--color-accent)]"
                      : "text-muted hover:bg-card hover:text-fg"
                  }`}
                >
                  {f}
                  <span
                    className={`rounded-md px-1.5 py-px font-mono text-[10px] tabular-nums transition-colors ${
                      isActive
                        ? "bg-bg/25 text-bg"
                        : "bg-card-2 text-faint group-hover:text-muted"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <ul className="mt-6 grid grid-cols-4 gap-2.5 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10">
          {skills.map((skill) => {
            const shown = filter === "All" || skill.group === filter;
            return (
              <li
                key={skill.name}
                // Filtering collapses rather than unmounts, so the grid reflows
                // smoothly instead of snapping.
                className={`transition-all duration-300 ${
                  shown
                    ? "scale-100 opacity-100"
                    : "pointer-events-none hidden scale-95 opacity-0"
                }`}
              >
                {/* Every tile is identical — one card, no per-brand chip. The
                    logo sits directly on it, name centred underneath. */}
                <div className="card card-lift flex h-full flex-col items-center justify-center gap-2 rounded-xl px-2 py-3.5">
                  <span aria-hidden className="grid h-7 w-7 place-items-center">
                    {skill.image ? (
                      <Image
                        src={skill.image}
                        alt=""
                        width={56}
                        height={56}
                        className={`h-7 w-7 object-contain ${
                          skill.ink ? `logo-${skill.ink}` : ""
                        }`}
                      />
                    ) : (
                      <span style={{ color: skill.color }}>
                        <Brand name={skill.icon} size={24} fallback={skill.mark} />
                      </span>
                    )}
                  </span>
                  <span className="w-full truncate text-center font-mono text-[10.5px] font-medium leading-tight text-muted">
                    {skill.name}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
