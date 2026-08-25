# Portfolio

Personal portfolio for Kooshant Kumar, a Computer Science undergraduate working
across data engineering, AI and software. A single-page site whose Coding
Activity section reports real GitHub and LeetCode figures, fetched server-side
and cached, with no API keys and no backend of its own.

Live: [kooshant-portfolio.vercel.app](https://kooshant-portfolio.vercel.app)

## What's in it

- **One content file.** Every string, job, project, skill and certificate lives
  in `data/profile.ts`. Components hold no copy. Adding a project means adding
  one object to an array — the layout, the animation and the artwork colours all
  follow from it.
- **Live coding activity** pulled from GitHub's REST API and LeetCode's public
  GraphQL endpoint, both on the server. No token is used or needed, so nothing
  secret can reach the browser, and the page ships as static HTML with the
  numbers already in it.
- **A LeetCode submission heatmap** — a year of real activity, laid out by ISO
  week with month labels measured off the grid rather than positioned by hand.
- **Project cards that adapt to the screenshot they're given.** A website shot
  fills its panel cropped from the top, so the nav and hero stay in frame. A
  dashboard is sized by its own aspect ratio instead, because cropping a chart
  destroys the thing it was included to show.
- **A floating dock** that tracks the section you're in with an
  `IntersectionObserver`, not a scroll handler, so it costs nothing per frame.
- **Experience accordions** — any role expands; the ones marked `active` in the
  data start open.
- **A stack filter** as a segmented control, with per-category counts computed
  from the data rather than written down, so they can't drift from what's shown.
- **Stack tiles with real logos and no icon dependency at runtime.** Sixteen
  Simple Icons paths are inlined into a TypeScript file; six brands excluded
  there for trademark reasons get honest category glyphs instead of lookalikes
  drawn from memory.
- **A live local clock** in the footer, in the author's timezone, through
  `useSyncExternalStore` with a snapshot that's stable within a minute — so
  React's identity check stays quiet between ticks.
- **Dark theme, locked.** Deleting a toggle would not have been enough; the lock
  is a `data-theme` attribute the light-mode rules are written to lose against.
- **Reduced motion honoured throughout.** Scroll reveals render their final
  state immediately rather than animating to it, and the CSS animations are
  disabled at the media query.
- **A no-JavaScript fallback.** Reveal wrappers are server-rendered at
  `opacity: 0`; a `<noscript>` style un-hides them, so the page is readable
  without hydration instead of blank.

## Stack

**Frontend** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript ·
Tailwind CSS v4 · Framer Motion · deployed on Vercel

No backend, no database, no icon library, no analytics.

Tailwind v4 is configured CSS-first. There is no `tailwind.config.js`; the design
tokens live in an `@theme` block inside `app/globals.css`.

## Layout

```
Portfolio/
├── app/
│   ├── layout.tsx        fonts, SEO metadata, dark-theme lock, no-JS fallback
│   ├── page.tsx          stacks the sections inside one rounded panel
│   └── globals.css       colour tokens, @theme, .gutter, .card, animations
├── components/           one file per section, plus shared UI
│   ├── coding/           GitHub and LeetCode cards, heatmap, stat tiles
│   ├── Brand.tsx         category glyphs for brands with no usable logo
│   ├── brandPaths.ts     inlined Simple Icons paths
│   └── icons.tsx         inline SVG icons
├── lib/coding/           GitHub and LeetCode fetching, kept out of components
├── data/profile.ts       ← all content lives here
├── icons/                source artwork, not served
└── public/               photo, resume, project shots, logos, served icons
```

`icons/` at the project root holds the original downloads. Next can't serve
static files from outside `public/`, so the ones in use are copied into
`public/icons/`. The root folder also carries Airflow, Kafka, Spark, Hadoop,
Docker, PostgreSQL, DBeaver and Azure SQL, ready to be promoted as the stack
grows.

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Nothing needs configuring to start. There is no `.env`, no key and no service to
sign up for — the GitHub and LeetCode calls are anonymous, and if either fails
the section says so and the rest of the page is unaffected.

## Checks before committing

```bash
npx tsc --noEmit && npm run build
```

The build is the meaningful check: `app/page.tsx` carries a compile-time guard
that fails it if the ISR window and `codingDisplay.revalidateSeconds` ever drift
apart, and that mismatch is invisible at runtime.

## Adding a project

```ts
{
  title: "Project name",
  blurb: "One or two sentences.",
  points: ["Bullet.", "Bullet."],
  tags: ["Python", "SQL"],
  href: "https://example.com",       // optional — adds the "View project" button
  status: "Shipped",
  image: "/screenshot.png",          // optional — a file in public/
  gradient: ["#34d399", "#0ea5e9"],  // artwork colours when there is no image
}
```

`imageFit` decides how a screenshot sits in the card:

- **`"cover"`** (default) — website screenshots. Fills the panel, cropped from
  the top.
- **`"contain"`** — dashboards, diagrams, charts. Keeps the whole frame. Add
  `imageAspect: width / height` taken from the file's real dimensions, and an
  `imageAlt` describing what the image shows rather than what it is.

A `"contain"` shot is sized by its own aspect ratio rather than stretched to the
row, so it fills its box exactly. Where the text column ends up taller, a
blurred copy of the screenshot carries the remainder instead of leaving it bare.

## Adding a stack tile

```ts
{ name: "Airflow", icon: "airflow", mark: "Af", color: "#017cee",
  group: "Data", image: "/icons/airflow.png" }
```

Artwork resolves in three steps, first match wins, so a tile can never render
blank: `image` (a PNG in `public/icons/`), then `icon` (an inlined brand path or
a drawn glyph), then `mark` (two letters).

Set `ink` only for single-ink logos, which would otherwise vanish against one
theme: `"on-dark"` for white marks, `"on-light"` for black ones. Multi-colour
marks use `"lift"` instead — inverting them destroys their hues.

## Deploying

Vercel, root directory unchanged, no build configuration.

Set `NEXT_PUBLIC_SITE_URL` to the site's own origin so Open Graph images and
canonical URLs resolve absolutely. It's inlined at build time, so changing it
needs a redeploy, not just an environment edit.

## Notes

Every fetcher returns `{ ok: true, data } | { ok: false, error }` rather than
throwing. A failed call renders "statistics are temporarily unavailable" plus a
working profile link; nothing else on the page notices. Percentages, ratings and
counts are null-guarded, so `undefined`, `NaN` and `[object Object]` can't reach
the DOM.

Two caches sit in front of the APIs, which is usually the answer when the
figures look stuck. The page is revalidated hourly and _lazily_ — after the
window expires the next visitor still gets the stale page while regeneration
runs behind them. Next's fetch cache also lives in `.next/cache` and survives
rebuilds, so `npm run build` alone will happily reuse an old response. To force
fresh data locally:

```bash
rm -rf .next/cache && npm run build && npm start
```

On Vercel, redeploy with "use existing build cache" unchecked.

An hour is deliberate rather than lazy. GitHub's anonymous API allows 60
requests per hour per IP and one regeneration spends about six of them; Vercel's
serverless IPs are shared between tenants, so a tight interval risks a 403 and
degrades the card to unavailable. Genuinely per-visitor data would mean fetching
from the client, which hands that rate limit to every visitor and buys nothing
on a portfolio.

`codingDisplay` chooses what is shown; it never invents anything.
`showGithubContributions` is off because a sparse year renders as a near-empty
grid, which reads worse than an absent section — the component itself is
finished. `hideEmptyStats` drops stats sitting at zero. Contest Rating is
omitted on its own whenever LeetCode returns `null` for it, and appears the
moment there's a rated contest to report.

`codingLanguages.source` switches between a curated list headed **Primary
Languages** and live repo byte counts headed **Repo Language Mix**. The headings
differ because the claims do: one is about focus, the other about measurement,
and a portfolio repo skews the measured one toward CSS until there are enough
substantive repos to balance it.

Replacing an image's contents without changing its filename is unreliable —
Next's optimizer caches per URL and the dev server holds variants in memory, so
the old bytes can keep being served. Give an edited screenshot a new name and
update the path.

Built by Kooshant Kumar.
