import { codingProfiles, codingDisplay } from "@/data/profile";
import type { ContributionDay, LeetCodeStats, Result } from "./types";

/**
 * LeetCode's public GraphQL endpoint. Only data already visible on a public
 * profile page is requested — no credentials, no session cookie, one cached
 * request per revalidate window rather than per visitor.
 */
const ENDPOINT = "https://leetcode.com/graphql";

/**
 * `userCalendar` only returns a single calendar year, but the heatmap window is
 * 53 weeks and therefore straddles two. Both are aliased here and merged below,
 * otherwise last year's portion of the grid renders blank.
 */
const QUERY = `
query publicProfile($username: String!, $year: Int, $prevYear: Int) {
  allQuestionsCount { difficulty count }
  matchedUser(username: $username) {
    username
    profile { ranking }
    submitStatsGlobal {
      acSubmissionNum { difficulty count submissions }
      totalSubmissionNum { difficulty count submissions }
    }
    current: userCalendar(year: $year) { submissionCalendar streak totalActiveDays }
    previous: userCalendar(year: $prevYear) { submissionCalendar }
  }
  userContestRanking(username: $username) {
    rating
    globalRanking
    attendedContestsCount
  }
}`;

type Bucket = { difficulty: string; count: number; submissions: number };

type Payload = {
  data?: {
    allQuestionsCount?: { difficulty: string; count: number }[];
    matchedUser?: {
      username: string;
      profile?: { ranking?: number | null };
      submitStatsGlobal?: {
        acSubmissionNum?: Bucket[];
        totalSubmissionNum?: Bucket[];
      };
      current?: {
        submissionCalendar?: string | null;
        streak?: number | null;
        totalActiveDays?: number | null;
      } | null;
      previous?: { submissionCalendar?: string | null } | null;
    } | null;
    userContestRanking?: {
      rating?: number | null;
      globalRanking?: number | null;
      attendedContestsCount?: number | null;
    } | null;
  };
};

const pick = (buckets: Bucket[] | undefined, difficulty: string) =>
  buckets?.find((b) => b.difficulty === difficulty);

/** LeetCode returns {unixSeconds: count}; merge the years and date the cells. */
function toDays(...raws: (string | null | undefined)[]): ContributionDay[] {
  const parsed: Record<string, number> = {};
  for (const raw of raws) {
    if (!raw) continue;
    try {
      for (const [k, v] of Object.entries(JSON.parse(raw) as Record<string, number>)) {
        parsed[k] = (parsed[k] ?? 0) + v;
      }
    } catch {
      // Skip a malformed year rather than losing the whole calendar.
    }
  }

  const counts = Object.values(parsed).filter((n) => Number.isFinite(n));
  const max = counts.length ? Math.max(...counts) : 0;

  return Object.entries(parsed)
    .map(([seconds, count]) => {
      const date = new Date(Number(seconds) * 1000);
      if (Number.isNaN(date.getTime())) return null;
      // Scale intensity to this user's own busiest day so a sparse calendar
      // still shows contrast instead of one flat colour.
      const level = count <= 0 ? 0 : Math.min(4, Math.ceil((count / (max || 1)) * 4));
      return {
        date: date.toISOString().slice(0, 10),
        count,
        level,
      };
    })
    .filter((d): d is ContributionDay => d !== null)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export async function getLeetCodeStats(): Promise<Result<LeetCodeStats>> {
  const { username, profileUrl } = codingProfiles.leetcode;

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: {
          username,
          year: new Date().getUTCFullYear(),
          prevYear: new Date().getUTCFullYear() - 1,
        },
      }),
      next: { revalidate: codingDisplay.revalidateSeconds },
    });

    if (!res.ok) return { ok: false, error: `LeetCode request failed (${res.status})` };

    const json = (await res.json()) as Payload;
    const user = json.data?.matchedUser;
    if (!user) return { ok: false, error: "LeetCode profile not found" };

    const ac = user.submitStatsGlobal?.acSubmissionNum;
    const totals = user.submitStatsGlobal?.totalSubmissionNum;
    const catalogue = json.data?.allQuestionsCount ?? [];
    const catalogueFor = (d: string) =>
      catalogue.find((c) => c.difficulty === d)?.count ?? 0;

    const acAll = pick(ac, "All");
    const totalAll = pick(totals, "All");
    const accepted = acAll?.count ?? 0;
    const attempted = totalAll?.submissions ?? 0;

    const contest = json.data?.userContestRanking;

    return {
      ok: true,
      data: {
        username,
        profileUrl,
        totalSolved: accepted,
        easySolved: pick(ac, "Easy")?.count ?? 0,
        mediumSolved: pick(ac, "Medium")?.count ?? 0,
        hardSolved: pick(ac, "Hard")?.count ?? 0,
        easyTotal: catalogueFor("Easy"),
        mediumTotal: catalogueFor("Medium"),
        hardTotal: catalogueFor("Hard"),
        ranking: typeof user.profile?.ranking === "number" ? user.profile.ranking : null,
        acceptanceRate:
          attempted > 0 ? Math.round((accepted / attempted) * 1000) / 10 : null,
        // Null for accounts that have never entered a rated contest — rendered
        // as omitted rather than as a zero.
        contestRating:
          typeof contest?.rating === "number" ? Math.round(contest.rating) : null,
        contestGlobalRanking:
          typeof contest?.globalRanking === "number" ? contest.globalRanking : null,
        attendedContests: contest?.attendedContestsCount ?? 0,
        streak: user.current?.streak ?? 0,
        activeDays: user.current?.totalActiveDays ?? 0,
        submissions: toDays(
          user.previous?.submissionCalendar,
          user.current?.submissionCalendar,
        ),
      },
    };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}
