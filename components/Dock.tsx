"use client";

import { useEffect, useState } from "react";
import { sections } from "@/data/profile";
import {
  BriefcaseIcon,
  FolderIcon,
  HomeIcon,
  LayersIcon,
  MailIcon,
  TerminalIcon,
} from "./icons";

const iconFor = {
  home: HomeIcon,
  experience: BriefcaseIcon,
  projects: FolderIcon,
  coding: TerminalIcon,
  stack: LayersIcon,
  contact: MailIcon,
} as const;

/** Floating pill nav pinned to the bottom of the viewport. */
export default function Dock() {
  const [active, setActive] = useState<string>("home");
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      // `inset-x-0` makes this bar span the full viewport even though only the
      // centred pill is visible, so without pointer-events-none it swallows
      // every hover and click in a strip across the bottom of the page.
      // Pointer events are re-enabled on the pill itself below.
      className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-4"
    >
      <div className="pointer-events-auto flex items-center gap-1 rounded-2xl border border-line bg-panel/85 p-1.5 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.85)] backdrop-blur-xl">
        {sections.map(({ id, label }) => {
          const Icon = iconFor[id];
          const isActive = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              aria-label={label}
              aria-current={isActive ? "true" : undefined}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(id)}
              onBlur={() => setHovered(null)}
              className={`relative grid h-10 w-10 place-items-center rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-card-2 text-fg"
                  : "text-faint hover:bg-card hover:text-fg"
              }`}
            >
              <Icon width={17} height={17} />

              {/* Active underline */}
              <span
                aria-hidden
                className={`absolute -bottom-0.5 h-0.5 rounded-full bg-accent transition-all duration-300 ${
                  isActive ? "w-4 opacity-100" : "w-0 opacity-0"
                }`}
              />

              {/* Tooltip */}
              <span
                aria-hidden
                className={`pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-line bg-card px-2.5 py-1 text-xs text-fg shadow-lg transition-all duration-200 ${
                  hovered === id
                    ? "translate-y-0 opacity-100"
                    : "translate-y-1 opacity-0"
                }`}
              >
                {label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
