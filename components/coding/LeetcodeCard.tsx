import Image from "next/image";
import { codingDisplay, codingProfiles } from "@/data/profile";
import type { LeetCodeStats, Result } from "@/lib/coding/types";
import { ArrowUpRightIcon, FlameIcon, LeetCodeIcon } from "../icons";
import Heatmap from "./Heatmap";
import StatTile from "./StatTile";
import Unavailable from "./Unavailable";

/** LeetCode's brand orange — icon tile and the headline figure. */
const LC_ORANGE = "#ffa116";
const DIFFICULTY = [
  { key: "easy", label: "Easy", color: "#00b8a3" },
  { key: "medium", label: "Medium", color: "#ffb800" },
  { key: "hard", label: "Hard", color: "#ff375f" },
] as const;

const nf = new Intl.NumberFormat("en-US");

export default function LeetcodeCard({ result }: { result: Result<LeetCodeStats> }) {
  const profileUrl = "https://leetcode.com/u/kooshant_kumar/";

  if (!result.ok) {
    return (
      <section className="card flex h-full flex-col rounded-2xl p-5" aria-labelledby="lc-h">
        <Header id="lc-h" username="kooshant_kumar" profileUrl={profileUrl} />
        <div className="mt-5">
          <Unavailable service="LeetCode" profileUrl={profileUrl} />
        </div>
      </section>
    );
  }

  const s = result.data;
  const solved = {
    easy: { count: s.easySolved, total: s.easyTotal },
    medium: { count: s.mediumSolved, total: s.mediumTotal },
    hard: { count: s.hardSolved, total: s.hardTotal },
  };

  return (
    <section className="card flex h-full flex-col rounded-2xl p-5" aria-labelledby="lc-h">
      <Header id="lc-h" username={s.username} profileUrl={s.profileUrl} />

      {/* Headline figure */}
      <div className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-line bg-card-2 px-4 py-3.5">
        <div>
          <div
            className="font-mono text-3xl font-semibold leading-none tabular-nums"
            style={{ color: LC_ORANGE }}
          >
            {nf.format(s.totalSolved)}
          </div>
          <div className="mt-1.5 text-[11px] uppercase tracking-wide text-faint">
            Problems Solved
          </div>
        </div>
        {s.streak > 0 ? (
          <div className="flex items-center gap-1.5 rounded-full border border-warn/40 bg-warn/10 px-2.5 py-1 text-[12px] font-medium text-warn">
            <FlameIcon width={13} height={13} />
            {s.streak} day streak
          </div>
        ) : null}
      </div>

      {/* Difficulty breakdown */}
      <div className="mt-4 space-y-2.5">
        {DIFFICULTY.map(({ key, label, color }) => {
          const { count, total } = solved[key];
          const pct = total > 0 ? Math.min(100, (count / total) * 100) : 0;
          return (
            <div key={key}>
              <div className="mb-1 flex items-baseline justify-between gap-2 text-[12px]">
                <span className="font-medium" style={{ color }}>
                  {label}
                </span>
                <span className="font-mono tabular-nums text-muted">
                  <span className="text-fg">{count}</span>
                  {total > 0 ? ` / ${nf.format(total)}` : ""}
                </span>
              </div>
              <div
                className="h-1.5 overflow-hidden rounded-full bg-card-2"
                role="progressbar"
                aria-label={`${label} problems solved`}
                aria-valuenow={count}
                aria-valuemin={0}
                aria-valuemax={total || undefined}
              >
                <span
                  className="block h-full rounded-full"
                  style={{ width: `${Math.max(pct, count > 0 ? 1.5 : 0)}%`, backgroundColor: color }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Secondary stats — contest fields are omitted entirely when unrated. */}
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {s.acceptanceRate !== null ? (
          <StatTile label="Acceptance" value={`${s.acceptanceRate}%`} />
        ) : null}
        {s.activeDays > 0 ? (
          <StatTile label="Active Days" value={s.activeDays} hint="this year" />
        ) : null}
        {s.ranking !== null ? (
          <StatTile label="Global Rank" value={`#${nf.format(s.ranking)}`} />
        ) : null}
        {s.contestRating !== null ? (
          <StatTile
            label="Contest Rating"
            value={nf.format(s.contestRating)}
            hint={`${s.attendedContests} contests`}
          />
        ) : null}
      </div>

      {/* Submission heatmap */}
      {codingDisplay.showLeetcodeHeatmap && s.submissions.length ? (
        <div className="mt-5 flex-1">
          <h4 className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            Submissions
          </h4>
          <Heatmap days={s.submissions} unit="submissions" />
        </div>
      ) : null}
    </section>
  );
}

function Header({
  id,
  username,
  profileUrl,
}: {
  id: string;
  username: string;
  profileUrl: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        {/* White chip, matching the company logos in Experience. */}
        <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-white">
          {codingProfiles.leetcode.logo ? (
            <Image
              src={codingProfiles.leetcode.logo}
              alt=""
              width={40}
              height={40}
              className="h-6 w-6 object-contain"
            />
          ) : (
            <LeetCodeIcon width={21} height={21} style={{ color: LC_ORANGE }} />
          )}
        </span>
        <div className="min-w-0">
          <h3 id={id} className="text-[15px] font-semibold tracking-tight text-fg">
            LeetCode
          </h3>
          <p className="truncate font-mono text-[12px] text-muted">@{username}</p>
        </div>
      </div>
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${username} on LeetCode`}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-line bg-card-2 px-2.5 py-1.5 text-[12px] font-medium text-fg transition-colors hover:border-accent hover:text-accent"
      >
        View
        <ArrowUpRightIcon width={13} height={13} />
      </a>
    </div>
  );
}
