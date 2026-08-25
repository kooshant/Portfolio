import type { ReactNode } from "react";

/** Full-bleed hatched band that titles each section. */
export default function SectionBand({
  title,
  aside,
}: {
  title: string;
  aside?: ReactNode;
}) {
  return (
    <div className="stripes gutter flex items-center justify-between gap-4 border-y border-line py-4">
      <h2 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">
        {title}
      </h2>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  );
}
