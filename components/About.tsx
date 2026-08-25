import { about } from "@/data/profile";
import Reveal from "./Reveal";
import SectionBand from "./SectionBand";
import { GraduationIcon } from "./icons";

export default function About() {
  return (
    <section id="about" className="scroll-mt-24">
      <SectionBand title="About" />

      <div className="grid gap-8 gutter py-8 sm:py-10 md:grid-cols-[1.4fr_1fr] md:gap-12">
        <div className="space-y-4">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <p className="text-[15px] leading-relaxed text-muted">{p}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <dl className="card rounded-2xl p-5">
            <div className="flex items-center gap-2 text-accent">
              <GraduationIcon width={16} height={16} />
              <p className="font-mono text-xs uppercase tracking-[0.16em]">Education</p>
            </div>
            <div className="mt-5 space-y-4">
              {about.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[11px] uppercase tracking-wide text-faint">
                    {fact.label}
                  </dt>
                  <dd className="mt-0.5 text-sm font-medium text-fg">{fact.value}</dd>
                </div>
              ))}
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
