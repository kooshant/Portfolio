/** Shapes shared by the fetchers and the UI. */

export type ContributionDay = {
  /** ISO date, e.g. "2026-04-16". */
  date: string;
  count: number;
  /** 0–4, GitHub's own intensity buckets. */
  level: number;
};

export type LanguageSlice = {
  name: string;
  /** Whole-number percent, already rounded and summing to ~100. */
  percent: number;
  bytes: number;
};

export type Repository = {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  updated: string;
  url: string;
};

export type GitHubStats = {
  username: string;
  profileUrl: string;
  repositories: number;
  followers: number;
  following: number;
  stars: number;
  forks: number;
  /** Contributions in the trailing year; null when the endpoint is unreachable. */
  contributions: number | null;
  contributionDays: ContributionDay[];
  languages: LanguageSlice[];
  repositoriesList: Repository[];
};

export type LeetCodeStats = {
  username: string;
  profileUrl: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  easyTotal: number;
  mediumTotal: number;
  hardTotal: number;
  ranking: number | null;
  /** Percent, one decimal. */
  acceptanceRate: number | null;
  /** null when the account has never entered a rated contest. */
  contestRating: number | null;
  contestGlobalRanking: number | null;
  attendedContests: number;
  streak: number;
  activeDays: number;
  submissions: ContributionDay[];
};

/**
 * Every fetcher returns this instead of throwing, so a failed upstream call can
 * never render `undefined` into the page or take the rest of the site down.
 */
export type Result<T> = { ok: true; data: T } | { ok: false; error: string };
