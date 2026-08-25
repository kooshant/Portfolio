import { certifications } from "@/data/profile";
import Reveal from "./Reveal";
import SectionBand from "./SectionBand";
import { ArrowUpRightIcon, BadgeIcon } from "./icons";

export default function Certifications() {
  return (
    <section id="certifications" className="scroll-mt-24">
      <SectionBand
        title="Credentials"
        aside={
          <span className="font-mono text-xs text-faint">
            {certifications.length} verified
          </span>
        }
      />

      <ul className="gutter grid gap-3 py-8 sm:grid-cols-2 sm:py-10 xl:grid-cols-4">
        {certifications.map((cert, i) => {
          // A "#" href means the credential URL hasn't been filled in yet —
          // render a plain card instead of a link that goes nowhere.
          const linked = Boolean(cert.href && cert.href !== "#");

          const inner = (
            <>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-warn/35 bg-warn/10 text-warn">
                <BadgeIcon width={17} height={17} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                  {cert.kind}
                </span>
                <span className="mt-1 block text-sm font-medium leading-snug text-fg">
                  {cert.title}
                </span>
                <span className="mt-1 block text-xs text-muted">{cert.issuer}</span>
              </span>
              {linked ? (
                <ArrowUpRightIcon
                  width={16}
                  height={16}
                  className="mt-0.5 shrink-0 text-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              ) : null}
            </>
          );

          return (
            <Reveal as="li" key={cert.title} delay={i * 0.05}>
              {linked ? (
                <a
                  href={cert.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="card card-lift group flex h-full items-start gap-3.5 rounded-2xl p-4"
                >
                  {inner}
                </a>
              ) : (
                <div className="card flex h-full items-start gap-3.5 rounded-2xl p-4">
                  {inner}
                </div>
              )}
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
