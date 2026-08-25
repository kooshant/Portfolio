import { Suspense } from "react";
import { getGitHubStats } from "@/lib/coding/github";
import { getLeetCodeStats } from "@/lib/coding/leetcode";
import Reveal from "../Reveal";
import SectionBand from "../SectionBand";
import GithubCard from "./GithubCard";
import LeetcodeCard from "./LeetcodeCard";

/** Matches the real card footprint so nothing shifts when data arrives. */
function CardSkeleton() {
  return (
    <div className="card h-full rounded-2xl p-5" aria-hidden>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 animate-pulse rounded-xl bg-card-2" />
        <div className="space-y-1.5">
          <div className="h-3.5 w-20 animate-pulse rounded bg-card-2" />
          <div className="h-3 w-28 animate-pulse rounded bg-card-2" />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-xl bg-card-2" />
        ))}
      </div>
      <div className="mt-5 space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-6 animate-pulse rounded bg-card-2" />
        ))}
      </div>
      <div className="mt-5 h-24 animate-pulse rounded-xl bg-card-2" />
    </div>
  );
}

/** Both fetchers resolve rather than throw, so one outage can't take the other down. */
async function Cards() {
  const [github, leetcode] = await Promise.all([getGitHubStats(), getLeetCodeStats()]);

  return (
    <>
      <Reveal>
        <GithubCard result={github} />
      </Reveal>
      <Reveal delay={0.08}>
        <LeetcodeCard result={leetcode} />
      </Reveal>
    </>
  );
}

export default function CodingActivity() {
  return (
    <section id="coding" className="scroll-mt-24">
      <SectionBand
        title="Coding Activity"
        aside={
          <span className="font-mono text-xs text-faint">GitHub &amp; LeetCode</span>
        }
      />

      <div className="gutter py-8 sm:py-10">
        <Reveal>
          <p className="max-w-2xl text-[15px] leading-relaxed text-muted">
            Problem solving, open-source work and day-to-day development activity —
            pulled live from my public profiles.
          </p>
        </Reveal>

        <div className="mt-6 grid items-start gap-4 lg:grid-cols-2">
          <Suspense
            fallback={
              <>
                <CardSkeleton />
                <CardSkeleton />
              </>
            }
          >
            <Cards />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
