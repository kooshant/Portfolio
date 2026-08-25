import { codingProfiles, codingDisplay } from "@/data/profile";
import type {
  ContributionDay,
  GitHubStats,
  LanguageSlice,
  Repository,
  Result,
} from "./types";

/**
 * All requests are unauthenticated public REST calls — no token is used or
 * needed, so nothing secret can leak to the client. The unauthenticated rate
 * limit is 60/hour per IP, which the ISR window below keeps us far beneath.
 */
const REVALIDATE = codingDisplay.revalidateSeconds;

const gh = (path: string) =>
  fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    next: { revalidate: REVALIDATE },
  });

type GhUser = {
  public_repos: number;
  followers: number;
  following: number;
};

type GhRepo = {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  html_url: string;
  fork: boolean;
  languages_url: string;
};

/** Rounds percentages so they still sum to 100 after truncation. */
function toPercentages(totals: Record<string, number>): LanguageSlice[] {
  const sum = Object.values(totals).reduce((a, b) => a + b, 0);
  if (sum === 0) return [];

  const raw = Object.entries(totals)
    .map(([name, bytes]) => ({ name, bytes, exact: (bytes / sum) * 100 }))
    .sort((a, b) => b.exact - a.exact);

  const withFloor = raw.map((r) => ({ ...r, percent: Math.floor(r.exact) }));
  let remainder = 100 - withFloor.reduce((a, r) => a + r.percent, 0);

  // Hand the leftover points to the largest fractional parts.
  const byFraction = [...withFloor].sort(
    (a, b) => (b.exact - Math.floor(b.exact)) - (a.exact - Math.floor(a.exact)),
  );
  for (const item of byFraction) {
    if (remainder <= 0) break;
    item.percent += 1;
    remainder -= 1;
  }

  return withFloor
    .filter((r) => r.percent > 0)
    .map(({ name, percent, bytes }) => ({ name, percent, bytes }));
}

/** Trailing-year contribution calendar. Failure here is non-fatal. */
async function fetchContributions(
  username: string,
): Promise<{ total: number; days: ContributionDay[] }> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
      { next: { revalidate: REVALIDATE } },
    );
    if (!res.ok) return { total: 0, days: [] };

    const json = (await res.json()) as {
      total?: Record<string, number>;
      contributions?: ContributionDay[];
    };
    const days = Array.isArray(json.contributions) ? json.contributions : [];
    const total =
      json.total && typeof json.total.lastYear === "number"
        ? json.total.lastYear
        : days.reduce((a, d) => a + (d.count || 0), 0);

    return { total, days };
  } catch {
    return { total: 0, days: [] };
  }
}

export async function getGitHubStats(): Promise<Result<GitHubStats>> {
  const { username, profileUrl } = codingProfiles.github;

  try {
    const [userRes, reposRes] = await Promise.all([
      gh(`/users/${encodeURIComponent(username)}`),
      gh(`/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`),
    ]);

    if (!userRes.ok) return { ok: false, error: `GitHub user request failed (${userRes.status})` };

    const user = (await userRes.json()) as GhUser;
    const allRepos = reposRes.ok ? ((await reposRes.json()) as GhRepo[]) : [];
    const owned = allRepos.filter((r) => !r.fork);

    // Language bytes across owned repos — a handful of extra calls, cached for
    // the full revalidate window.
    const totals: Record<string, number> = {};
    const languageResults = await Promise.all(
      owned.slice(0, 20).map(async (repo) => {
        try {
          const res = await fetch(repo.languages_url, {
            headers: { Accept: "application/vnd.github+json" },
            next: { revalidate: REVALIDATE },
          });
          return res.ok ? ((await res.json()) as Record<string, number>) : {};
        } catch {
          return {};
        }
      }),
    );
    for (const result of languageResults) {
      for (const [lang, bytes] of Object.entries(result)) {
        totals[lang] = (totals[lang] ?? 0) + bytes;
      }
    }

    const contributions = await fetchContributions(username);

    const repositoriesList: Repository[] = owned
      .slice(0, codingDisplay.maxRepos)
      .map((r) => ({
        name: r.name,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        forks: r.forks_count,
        updated: r.updated_at,
        url: r.html_url,
      }));

    return {
      ok: true,
      data: {
        username,
        profileUrl,
        repositories: user.public_repos ?? owned.length,
        followers: user.followers ?? 0,
        following: user.following ?? 0,
        stars: owned.reduce((a, r) => a + (r.stargazers_count || 0), 0),
        forks: owned.reduce((a, r) => a + (r.forks_count || 0), 0),
        contributions: contributions.days.length ? contributions.total : null,
        contributionDays: contributions.days,
        languages: toPercentages(totals).slice(0, codingDisplay.maxLanguages),
        repositoriesList,
      },
    };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}
