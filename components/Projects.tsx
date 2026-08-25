import Image from "next/image";
import { projects, type Project } from "@/data/profile";
import Reveal from "./Reveal";
import SectionBand from "./SectionBand";
import { ArrowUpRightIcon } from "./icons";

/** "Shipped" chip — sits on the artwork, wherever that artwork happens to be. */
function StatusPill({ project }: { project: Project }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-panel/80 px-2.5 py-1 text-[11px] font-medium text-fg backdrop-blur">
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: project.gradient[0] }}
      />
      {project.status}
    </span>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24">
      <SectionBand
        title="Projects"
        aside={
          <span className="font-mono text-xs text-faint">
            {projects.length} shipped
          </span>
        }
      />

      <div className="space-y-4 gutter py-8 sm:py-10">
        {projects.map((project, i) => {
          // A dashboard or diagram has to be read whole; only site screenshots
          // survive the crop the default `cover` treatment applies.
          const contain = project.imageFit === "contain";
          const shotAspect = project.imageAspect ?? 16 / 9;
          const tint = {
            background: `linear-gradient(135deg, ${project.gradient[0]}33, ${project.gradient[1]}22 55%, transparent)`,
          };

          return (
            <Reveal key={project.title} delay={i * 0.07}>
              {/* Two columns from xl up. The page panel runs to 120rem, so a
                  full-width artwork band would be far wider than any screenshot
                  can fill — splitting it gives the image a near-square frame and
                  puts the reading column at a comfortable measure. */}
              <article className="card card-lift group relative overflow-hidden rounded-2xl xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                {/* Artwork panel — real screenshot when there is one, gradient otherwise */}
                <div
                  className={`relative overflow-hidden border-b border-line xl:min-h-[24rem] xl:border-b-0 xl:border-r ${
                    contain ? "flex items-center" : "h-48 sm:h-64 xl:h-auto"
                  }`}
                  style={project.image && !contain ? undefined : tint}
                >
                  {/* Side by side the row height comes from the text, so a
                      16:9 shot can still fall short of it. A blurred copy of
                      itself carries whatever margin is left over. */}
                  {project.image && contain ? (
                    <Image
                      src={project.image}
                      alt=""
                      aria-hidden
                      fill
                      className="scale-125 object-cover opacity-30 blur-2xl"
                      sizes="(max-width: 1280px) 100vw, 50vw"
                    />
                  ) : null}

                  {project.image && contain ? (
                    /* Sized by the shot's own aspect rather than stretched to the
                       row, so it fills its box exactly. Where the text column is
                       the taller of the two, this box centres and the blur behind
                       it carries the rest; where it isn't, it sets the row height
                       and the artwork runs the full height of the card. */
                    <div
                      className="relative w-full"
                      style={{ aspectRatio: shotAspect }}
                    >
                      <Image
                        src={project.image}
                        alt={
                          project.imageAlt ??
                          `Screenshot of the ${project.title} homepage`
                        }
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 1280px) 100vw, 50vw"
                      />
                    </div>
                  ) : project.image ? (
                    <Image
                      src={project.image}
                      alt={
                        project.imageAlt ??
                        `Screenshot of the ${project.title} homepage`
                      }
                      fill
                      // Cropped from the top so the site's nav and hero stay in
                      // frame. The slight base scale trims the browser scrollbar
                      // caught along the right edge of the source screenshot.
                      className="scale-[1.02] object-cover object-top transition-transform duration-500 group-hover:scale-[1.06]"
                      sizes="(max-width: 1280px) 100vw, 50vw"
                    />
                  ) : (
                    <>
                      <div className="bg-grid absolute inset-0 opacity-60" />
                      <div
                        aria-hidden
                        className="absolute -right-10 -top-16 h-52 w-52 rounded-full blur-3xl"
                        style={{ backgroundColor: `${project.gradient[0]}40` }}
                      />
                    </>
                  )}

                  {/* Sheen sweeps across on hover */}
                  <span
                    aria-hidden
                    className="sheen absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  />

                  {/* Softens the cut where a cropped screenshot meets the card
                      body. Only while stacked — side by side, the seam is the border. */}
                  {project.image && !contain ? (
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent xl:hidden"
                    />
                  ) : null}

                  {/* With a screenshot the title moves into the body — overlaying
                      it here collides with the site's own hero headline. */}
                  {project.image ? null : (
                    <div className="absolute inset-0 flex items-end justify-between gap-4 p-5">
                      <h3 className="font-serif text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                        {project.title}
                      </h3>
                      {project.status ? <StatusPill project={project} /> : null}
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-center p-5 sm:p-6 xl:p-8">
                  {project.image ? (
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <h3 className="font-serif text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                        {project.title}
                      </h3>
                      {project.status ? <StatusPill project={project} /> : null}
                    </div>
                  ) : null}

                  <p className="max-w-2xl text-[15px] leading-relaxed text-muted">
                    {project.blurb}
                  </p>

                  {/* Two-up while the card is full width; one column once the
                      card splits and the measure is already narrow. */}
                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-1">
                    {project.points.map((point) => (
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

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <ul className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-lg border border-line bg-card-2 px-2.5 py-1 font-mono text-[11px] text-muted"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>

                    {project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-card-2 px-3 py-1.5 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
                      >
                        View project
                        <ArrowUpRightIcon width={15} height={15} />
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
