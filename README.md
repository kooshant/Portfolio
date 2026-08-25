# Kooshant Kumar — Portfolio

Personal portfolio site — single page, dark theme.

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Framer Motion

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

Also: `npm run build`, `npm start`, `npm run lint`.

## Editing the content

All site content lives in [`data/profile.ts`](data/profile.ts). No component
needs to be touched for a content change.

| To change                          | Edit                     |
| ---------------------------------- | ------------------------ |
| Name, role, email, links, timezone | `profile`                |
| Badge, tagline, statement, buttons | `hero`                   |
| About paragraphs, education        | `about`                  |
| Jobs                               | `experience`             |
| Projects                           | `projects`               |
| Stack tiles and filter groups      | `skills` / `skillGroups` |
| Certifications                     | `certifications`         |
| GitHub / LeetCode usernames        | `codingProfiles`         |
| Closing pitch                      | `contact`                |
| Dock items                         | `sections`               |

Adding a job or project means adding one object to an array.

## Adding a project

```ts
{
  title: "Project name",
  blurb: "One or two sentences.",
  points: ["Bullet.", "Bullet."],
  tags: ["Python", "SQL"],
  href: "https://example.com",       // optional — adds the "View project" button
  status: "Shipped",
  image: "/screenshot.png",          // optional — file in public/
  gradient: ["#34d399", "#0ea5e9"],  // artwork colours when there is no image
}
```

`imageFit` controls how a screenshot sits in the card:

- **`"cover"`** (default) — website screenshots. Fills the panel, cropped from the top.
- **`"contain"`** — dashboards and diagrams, where cropping would lose meaning.
  Add `imageAspect: width / height` from the file's real dimensions, and
  `imageAlt` describing what it shows.

## Coding Activity

GitHub and LeetCode stats are fetched server-side from public endpoints — no API
keys needed. Usernames are set in `codingProfiles`.

Numbers are cached for an hour, and Next's fetch cache survives rebuilds. To
force fresh data locally:

```bash
rm -rf .next/cache && npm run build && npm start
```

On Vercel, redeploy with "use existing build cache" unchecked.

## Structure

```
app/          layout (fonts, SEO, theme), page, global styles
components/   one file per section, plus coding/ for the stats cards
lib/coding/   GitHub + LeetCode fetching
data/         profile.ts — all site content
public/       photo, resume PDF, project screenshots, logos, icons
```

## Deploy

1. Push to GitHub.
2. Import at [vercel.com/new](https://vercel.com/new) and deploy — no config needed.
3. Set `NEXT_PUBLIC_SITE_URL` to the deployed URL so link previews resolve.
