"use client";

import Image from "next/image";
import { useState } from "react";
import { experience, type Job } from "@/data/profile";
import Reveal from "./Reveal";
import SectionBand from "./SectionBand";
import { ChevronDownIcon } from "./icons";

export default function Experience() {
  // Roles marked `active` start expanded.
  const [open, setOpen] = useState<number[]>(
    experience.map((j, i) => (j.active ? i : -1)).filter((i) => i >= 0),
  );

  const toggle = (i: number) =>
    setOpen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  return (
    <section id="experience" className="scroll-mt-24">
      <SectionBand
        title="Experience"
        aside={
          <span className="font-mono text-xs text-faint">
            {experience.length} roles
          </span>
        }
      />

      <div className="space-y-3 gutter py-8 sm:py-10">
        {experience.map((job, i) => (
          <Reveal key={`${job.company}-${job.period}`} delay={i * 0.07}>
            <JobCard job={job} isOpen={open.includes(i)} onToggle={() => toggle(i)} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function JobCard({
  job,
  isOpen,
  onToggle,
}: {
  job: Job;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = `job-${job.company.replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <article className="card overflow-hidden rounded-2xl">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full items-center gap-4 p-4 text-left sm:p-5"
      >
        {/* Logo tile */}
        {job.logo ? (
          // These logos ship on an opaque white ground, so the chip stays white
          // in both themes rather than glaring as a bright square on the dark card.
          <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-white">
            <Image
              src={job.logo}
              alt={`${job.company} logo`}
              width={96}
              height={96}
              className="h-full w-full object-contain"
            />
          </span>
        ) : (
          <span
            aria-hidden
            className="tile grid h-12 w-12 shrink-0 place-items-center rounded-xl border text-sm font-semibold"
            style={{ "--tile": job.markColor } as React.CSSProperties}
          >
            {job.mark}
          </span>
        )}

        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <span className="text-[15px] font-semibold tracking-tight text-fg sm:text-base">
              {job.role}
            </span>
            <span className="rounded-md border border-line bg-card-2 px-1.5 py-0.5 text-[11px] text-muted">
              {job.kind}
            </span>
          </span>
          <span className="mt-1 block truncate text-[13px] text-muted">
            {job.company} · {job.location}
          </span>
        </span>

        <span className="hidden shrink-0 font-mono text-xs text-faint sm:block">
          {job.period}
        </span>

        <span
          aria-hidden
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line text-muted transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ChevronDownIcon width={15} height={15} />
        </span>
      </button>

      {/* Grid-rows trick animates to auto height without measuring. */}
      <div
        id={panelId}
        className={`grid transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-line px-4 pb-5 pt-4 sm:px-5">
            <p className="mb-4 font-mono text-xs text-faint sm:hidden">{job.period}</p>

            <ul className="space-y-2.5">
              {job.points.map((point) => (
                <li
                  key={point}
                  className="relative pl-5 text-sm leading-relaxed text-muted"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-[0.55em] h-1.5 w-1.5 rounded-full bg-accent/70"
                  />
                  {point}
                </li>
              ))}
            </ul>

            <ul className="mt-5 flex flex-wrap gap-2">
              {job.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-lg border border-line bg-card-2 px-2.5 py-1 font-mono text-[11px] text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
