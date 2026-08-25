import { contact, profile } from "@/data/profile";
import Reveal from "./Reveal";
import SectionBand from "./SectionBand";
import {
  ArrowRightIcon,
  FileIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
} from "./icons";

const channels = [
  { label: "GitHub", href: profile.links.github, Icon: GitHubIcon },
  { label: "LinkedIn", href: profile.links.linkedin, Icon: LinkedInIcon },
  { label: "Mail", href: profile.links.email, Icon: MailIcon },
  { label: "Call", href: `tel:${profile.phone.replace(/\s+/g, "")}`, Icon: PhoneIcon },
  { label: "Resume", href: profile.resume, Icon: FileIcon },
];

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24">
      <SectionBand title="Contact" />

      <div className="space-y-4 gutter py-8 sm:py-10">
        {/* Channel row */}
        <Reveal>
          <ul className="card grid grid-cols-2 gap-2 rounded-2xl p-3 sm:grid-cols-5">
            {channels.map(({ label, href, Icon }) => {
              const external = href.startsWith("http");
              return (
                <li key={label}>
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noreferrer noopener" }
                      : {})}
                    className="group flex items-center justify-center gap-2 rounded-xl border border-line bg-card-2 px-3 py-3 text-sm font-medium text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-fg"
                  >
                    <Icon
                      width={16}
                      height={16}
                      className="transition-colors group-hover:text-accent"
                    />
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>

        {/* Next-step card */}
        <Reveal delay={0.08}>
          <div className="card relative overflow-hidden rounded-2xl p-6 sm:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-accent/15 blur-3xl"
            />

            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              Next step
            </p>
            <h3 className="mt-3 max-w-2xl font-serif text-2xl font-semibold leading-tight tracking-tight text-fg sm:text-3xl">
              {contact.heading}
            </h3>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
              {contact.body}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={profile.links.email}
                className="group inline-flex items-center gap-2 rounded-xl bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-12px_rgba(167,139,250,0.8)]"
              >
                Email me
                <ArrowRightIcon
                  width={16}
                  height={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-xl border border-line-2 bg-card-2 px-5 py-2.5 text-sm font-medium text-fg transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                <FileIcon width={16} height={16} />
                Resume
              </a>
            </div>

            <p className="mt-7 font-mono text-xs text-faint">{profile.email}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
