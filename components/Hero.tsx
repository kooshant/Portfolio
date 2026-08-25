import Image from "next/image";
import { hero, profile } from "@/data/profile";
import Reveal from "./Reveal";
import TopBar from "./TopBar";
import { ArrowRightIcon, FileIcon, MapPinIcon, SparkIcon } from "./icons";

/** Decorative sparkles scattered around the name. */
const sparks = [
  { top: "-6%", left: "-3%", size: 13, delay: "0s" },
  { top: "8%", left: "38%", size: 9, delay: "0.7s" },
  { top: "-12%", left: "72%", size: 11, delay: "1.4s" },
  { top: "78%", left: "-5%", size: 10, delay: "2.1s" },
  { top: "88%", left: "46%", size: 8, delay: "1s" },
  { top: "70%", left: "80%", size: 12, delay: "0.3s" },
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden gutter pb-14 pt-5 sm:pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-fade absolute inset-0" />
        <div className="absolute -top-40 left-1/3 h-[24rem] w-[38rem] rounded-full bg-accent/12 blur-[130px]" />
        <div className="absolute -right-20 top-20 h-[18rem] w-[22rem] rounded-full bg-accent-2/8 blur-[120px]" />
      </div>

      <TopBar />

      {/* Past xl the portrait column is a fixed width pinned to the right edge,
          so it doesn't float mid-canvas with dead space on both sides. */}
      <div className="mt-10 grid items-center gap-10 md:mt-14 md:grid-cols-[1.3fr_1fr] md:gap-14 xl:grid-cols-[1fr_26rem] xl:gap-16">
        {/* ── Copy ── */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-xs font-medium text-muted">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              {hero.badge}
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="relative mt-5 inline-block">
              {sparks.map((s, i) => (
                <SparkIcon
                  key={i}
                  className="twinkle absolute text-accent"
                  style={{
                    top: s.top,
                    left: s.left,
                    width: s.size,
                    height: s.size,
                    animationDelay: s.delay,
                  }}
                />
              ))}
              <h1 className="font-serif text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-fg sm:text-6xl lg:text-[4.2rem]">
                {profile.name}
              </h1>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-5 max-w-xl text-xl font-semibold leading-snug tracking-tight text-fg sm:text-2xl xl:max-w-3xl xl:text-[1.75rem]">
              {hero.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-5 max-w-xl border-l-2 border-accent/50 pl-4 text-[15px] leading-relaxed text-muted xl:max-w-2xl xl:text-base">
              {hero.statement}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={hero.ctaPrimary.href}
                className="group inline-flex items-center gap-2 rounded-xl bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-12px_rgba(167,139,250,0.8)]"
              >
                {hero.ctaPrimary.label}
                <ArrowRightIcon
                  width={16}
                  height={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>
              <a
                href={hero.ctaSecondary.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-xl border border-line-2 bg-card px-5 py-2.5 text-sm font-medium text-fg transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                <FileIcon width={16} height={16} />
                {hero.ctaSecondary.label}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.36}>
            <p className="mt-7 inline-flex items-center gap-2 text-sm text-faint">
              <MapPinIcon width={15} height={15} />
              {profile.location}
            </p>
          </Reveal>
        </div>

        {/* ── Portrait ── */}
        <Reveal delay={0.15} y={24} className="order-first md:order-none">
          <div className="float-y relative mx-auto w-52 sm:w-64 md:w-full md:max-w-[19rem] xl:max-w-none">
            <div
              aria-hidden
              className="absolute -inset-4 -z-10 rounded-[2.25rem] bg-gradient-to-br from-accent/30 via-accent-2/10 to-transparent blur-2xl"
            />
            <div className="card relative aspect-square overflow-hidden rounded-[1.75rem] p-1.5">
              <div className="relative h-full w-full overflow-hidden rounded-[1.4rem]">
                <Image
                  src={profile.photo}
                  alt={`Portrait of ${profile.name}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 260px, (max-width: 1280px) 304px, 368px"
                  // Portrait source in a square frame: anchor to the top so the
                  // crop takes from below the shoulders, never off the head.
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
