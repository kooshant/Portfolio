import Image from "next/image";
import { codingDisplay, codingLanguages, codingProfiles } from "@/data/profile";
import type { GitHubStats, Result } from "@/lib/coding/types";
import { ArrowUpRightIcon, ForkIcon, GitHubIcon, StarIcon } from "../icons";
import Heatmap from "./Heatmap";
import StatTile from "./StatTile";
import Unavailable from "./Unavailable";

/** Brand colours for the language bars; anything else falls back to the accent. */
const LANG_COLOR: Record<string, string> = {
  Python: "#3776ab",
  SQL: "#00758f",
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Java: "#f89820",
  HTML: "#e34f26",
  "HTML/CSS": "#e34f26",
  CSS: "#1572b6",
  Jupyter: "#f37626",
  "Jupyter Notebook": "#f37626",
  PHP: "#777bb4",
  Shell: "#89e051",
  SCSS: "#c6538c",
};

function timeAgo(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export default function GithubCard({ result }: { result: Result<GitHubStats> }) {
  const profileUrl = "https://github.com/kooshant";

  if (!result.ok) {
    return (
      <section className="card flex h-full flex-col rounded-2xl p-5" aria-labelledby="gh-h">
        <Header id="gh-h" username="kooshant" profileUrl={profileUrl} />
        <div className="mt-5">
          <Unavailable service="GitHub" profileUrl={profileUrl} />
        </div>
      </section>
    );
  }

  const s = result.data;
  const show = (n: number) => !codingDisplay.hideEmptyStats || n > 0;

  // The heading distinguishes the two sources: "Primary" is self-declared
  // emphasis, "Repo Language Mix" is measured from actual repo bytes.
  const useManual = codingLanguages.source === "manual";
  const languages = useManual
    ? codingLanguages.manual.map((l) => ({ ...l, bytes: 0 }))
    : s.languages;
  const languagesHeading = useManual ? "Primary Languages" : "Repo Language Mix";

  return (
    <section className="card flex h-full flex-col rounded-2xl p-5" aria-labelledby="gh-h">
      <Header id="gh-h" username={s.username} profileUrl={s.profileUrl} />

      {/* Stats */}
      <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        <StatTile label="Repositories" value={s.repositories} />
        {show(s.stars) ? <StatTile label="Stars" value={s.stars} /> : null}
        {show(s.forks) ? <StatTile label="Forks" value={s.forks} /> : null}
        {show(s.followers) ? <StatTile label="Followers" value={s.followers} /> : null}
        {s.contributions !== null && codingDisplay.showGithubContributions ? (
          <StatTile label="Contributions" value={s.contributions} hint="past year" />
        ) : null}
        {languages.length ? (
          <StatTile label="Languages" value={languages.length} />
        ) : null}
      </div>

      {/* Contribution calendar — off by default, see codingDisplay. */}
      {codingDisplay.showGithubContributions && s.contributionDays.length ? (
        <div className="mt-5">
          <h4 className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            Contributions
          </h4>
          <Heatmap days={s.contributionDays} unit="contributions" />
        </div>
      ) : null}

      {/* Languages */}
      {languages.length ? (
        <div className="mt-5">
          <h4 className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            {languagesHeading}
          </h4>
          <ul className="space-y-2">
            {languages.map((lang) => (
              <li key={lang.name} className="flex items-center gap-3">
                <span className="w-20 shrink-0 truncate text-[13px] text-fg">
                  {lang.name}
                </span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-card-2">
                  <span
                    className="block h-full rounded-full"
                    style={{
                      width: `${lang.percent}%`,
                      backgroundColor: LANG_COLOR[lang.name] ?? "var(--color-accent)",
                    }}
                  />
                </span>
                <span className="w-9 shrink-0 text-right font-mono text-[11px] tabular-nums text-muted">
                  {lang.percent}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Repositories */}
      {s.repositoriesList.length ? (
        <div className="mt-5 flex-1">
          <h4 className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            Recent Repositories
          </h4>
          <ul className="space-y-2">
            {s.repositoriesList.map((repo) => (
              <li key={repo.name}>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl border border-line bg-card-2 px-3 py-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50"
                >
                  <div className="flex items-center gap-2">
                    <span className="truncate font-mono text-[13px] font-medium text-fg">
                      {repo.name}
                    </span>
                    <ArrowUpRightIcon
                      width={13}
                      height={13}
                      className="shrink-0 text-faint transition-colors group-hover:text-accent"
                    />
                  </div>
                  {repo.description ? (
                    <p className="mt-1 line-clamp-2 text-[12px] leading-snug text-muted">
                      {repo.description}
                    </p>
                  ) : null}
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-faint">
                    {repo.language ? (
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          aria-hidden
                          className="h-2 w-2 rounded-full"
                          style={{
                            backgroundColor:
                              LANG_COLOR[repo.language] ?? "var(--color-accent)",
                          }}
                        />
                        {repo.language}
                      </span>
                    ) : null}
                    {repo.stars > 0 ? (
                      <span className="inline-flex items-center gap-1">
                        <StarIcon width={11} height={11} /> {repo.stars}
                      </span>
                    ) : null}
                    {repo.forks > 0 ? (
                      <span className="inline-flex items-center gap-1">
                        <ForkIcon width={11} height={11} /> {repo.forks}
                      </span>
                    ) : null}
                    <span>Updated {timeAgo(repo.updated)}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
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
      <div className="flex items-center gap-3">
        {/* White chip, matching the company logos in Experience. */}
        <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-white">
          {codingProfiles.github.logo ? (
            <Image
              src={codingProfiles.github.logo}
              alt=""
              width={40}
              height={40}
              className="h-6 w-6 object-contain"
            />
          ) : (
            <GitHubIcon width={20} height={20} className="text-[#181717]" />
          )}
        </span>
        <div className="min-w-0">
          <h3 id={id} className="text-[15px] font-semibold tracking-tight text-fg">
            GitHub
          </h3>
          <p className="truncate font-mono text-[12px] text-muted">@{username}</p>
        </div>
      </div>
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${username} on GitHub`}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-line bg-card-2 px-2.5 py-1.5 text-[12px] font-medium text-fg transition-colors hover:border-accent hover:text-accent"
      >
        View
        <ArrowUpRightIcon width={13} height={13} />
      </a>
    </div>
  );
}
