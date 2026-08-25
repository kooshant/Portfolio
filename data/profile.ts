/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE TO UPDATE THE WHOLE SITE.
 *  Every piece of text, link, job and project lives here.
 *  Nothing else needs to be touched for a content change.
 * ─────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Kooshant Kumar",
  /** Shown in the browser tab and on link previews. */
  role: "Data, AI & Software Engineering",
  location: "Gurugram, Haryana, India",
  /** IANA zone — drives the live clock in the footer. */
  timezone: "Asia/Kolkata",
  email: "kushantjangra1234@gmail.com",
  phone: "+91 9911288235",

  /** Path inside /public. Drop your photo there and keep the name, or change it here. */
  photo: "/profile.jpg",
  /**
   * Path inside /public. Points at the file you uploaded. The space has to be
   * percent-encoded as %20 to be a valid URL — renaming the file to
   * `resume.pdf` and setting this to "/resume.pdf" would be tidier.
   */
  resume: "/Kooshant%20resume.pdf",

  links: {
    github: "https://github.com/kooshant",
    linkedin: "https://www.linkedin.com/in/kooshant-kumar-b8193827b",
    email: "mailto:kushantjangra1234@gmail.com",
  },
} as const;

/** Big statement at the top of the page. */
export const hero = {
  badge: "Data · AI · Software",
  tagline:
    "Building end-to-end systems — from the pipelines that move data to the AI and applications that use it.",
  statement:
    "My work covers the whole path data takes — collecting it, cleaning it, and moving it through pipelines people can rely on. On top of that I build AI features and the applications that use them. I'm open to data engineering, AI and software roles.",
  ctaPrimary: { label: "Get in touch", href: "#contact" },
  ctaSecondary: { label: "Resume", href: profile.resume },
};

export const about = {
  paragraphs: [
    "I'm a Computer Science undergraduate at GD Goenka University working towards data engineering. I'm strongest in Python and SQL, with a solid grounding in Data Structures and Algorithms, and most at home in the part of the stack that moves and reshapes data rather than the part that displays it.",
    "Day to day that means Python with Pandas and NumPy, MySQL and MongoDB for storage, and Power BI and Excel for turning results into something readable. Two internships taught me the difference between code that runs and code that ships — one automating data-processing workflows, one delivering a production site to a deadline.",
  ],
  facts: [
    { label: "Degree", value: "B.Tech, Computer Science & Engineering" },
    { label: "University", value: "GD Goenka University, Gurugram" },
    { label: "Duration", value: "2023 – 2027" },
  ],
};

export type Job = {
  role: string;
  company: string;
  location: string;
  period: string;
  /** Badge next to the role, e.g. "Internship". */
  kind: string;
  /** Initials for the logo tile, plus its accent colour. */
  mark: string;
  markColor: string;
  /**
   * Optional real logo. Drop a square PNG/SVG in public/logos/ and set the
   * path here (e.g. "/logos/mirai.png") — it replaces the initials tile.
   */
  logo?: string;
  /** Opens this role expanded by default. */
  active?: boolean;
  points: string[];
  tags: string[];
};

export const experience: Job[] = [
  {
    role: "AI Intern",
    company: "Mirai School of Technology",
    location: "Gurugram, Haryana",
    period: "Jan 2026 – Feb 2026",
    kind: "Internship",
    mark: "MS",
    markColor: "#a78bfa",
    logo: "/mirai_school_of_technology_logo.jpeg",
    /** Opens expanded; no badge is rendered for this. */
    active: true,
    points: [
      "Designed AI-driven workflows using ChatGPT and automation tools, reducing manual effort by 35%.",
      "Automated content generation and data processing tasks, cutting manual effort by approximately 40%.",
      "Applied prompt engineering techniques to enhance output quality and workflow efficiency.",
    ],
    tags: [
      "Prompt Engineering",
      "ChatGPT",
      "Automation",
      "Python",
      "Workflow Design",
    ],
  },
  {
    role: "Web Developer Intern",
    company: "Realty Smartz Pvt. Ltd.",
    location: "Gurugram, Haryana",
    period: "Jul 2025 – Sep 2025",
    kind: "Internship",
    mark: "RS",
    markColor: "#34d399",
    logo: "/realtysmartz_logo.jpeg",
    points: [
      "Optimized website performance, reducing page load time by approximately 30%.",
      "Developed responsive user interfaces using HTML, CSS and JavaScript.",
      "Resolved bugs and supported deployment, contributing to stable production releases.",
    ],
    tags: ["HTML", "CSS", "JavaScript", "Performance", "Responsive UI"],
  },
];

export type Project = {
  title: string;
  blurb: string;
  points: string[];
  tags: string[];
  href?: string;
  featured?: boolean;
  status?: string;
  /**
   * Screenshot in /public. When set it replaces the gradient artwork.
   * Use a wide shot of the homepage — it's cropped from the top.
   */
  image?: string;
  /**
   * How `image` sits in the artwork panel.
   *   "cover"   — default. Fills a short band, cropped from the top. Right for
   *               site screenshots, where only the nav and hero need to show.
   *   "contain" — whole frame visible in a 16:9 panel, tinted by `gradient`
   *               behind the letterbox. Right for dashboards and diagrams,
   *               which lose their meaning the moment they're cropped.
   */
  imageFit?: "cover" | "contain";
  /** Overrides the default "Screenshot of the … homepage" alt text. */
  imageAlt?: string;
  /**
   * Width ÷ height of a "contain" screenshot. The artwork panel takes this
   * shape, so the shot fills it exactly instead of letterboxing. Defaults to
   * 16/9; set it whenever the source isn't that.
   */
  imageAspect?: number;
  /** Artwork colours. Used alone when `image` isn't set, as the tint behind a
   *  "contain" image otherwise. */
  gradient: [string, string];
};

export const projects: Project[] = [
  {
    title: "Realty Smartz Global",
    blurb:
      "A fully responsive real-estate platform with dynamic property listings and a PHP-backed enquiry pipeline, built and customised to the company's branding and business requirements.",
    points: [
      "Built the full responsive front end in HTML, CSS and JavaScript.",
      "Implemented dynamic property listing functionality to improve user interaction.",
      "Integrated a PHP-based contact form for handling user inquiries and backend processing.",
      "Customised components to align with business requirements and branding.",
    ],
    tags: ["HTML", "CSS", "JavaScript", "PHP", "Responsive Design"],
    href: "https://realtysmartzglobal.com",
    featured: true,
    status: "Shipped",
    image: "/realtysmartz-home.png",
    gradient: ["#34d399", "#0ea5e9"],
  },
  {
    title: "Spotify Real-Time Data Analysis Pipeline",
    blurb:
      "An automated near-real-time streaming pipeline that carries continuously generated Spotify events from ingestion through to business-ready datasets, built on a Bronze\u2013Silver\u2013Gold architecture and containerised end to end.",
    points: [
      "Built the streaming pipeline with Python, Kafka, MinIO, Airflow, Snowflake and dbt on a Bronze\u2013Silver\u2013Gold architecture.",
      "Processed continuously generated Spotify events from ingestion to cleaned, business-ready datasets using Kafka streaming and dbt transformations.",
      "Connected the Snowflake Gold layer to Power BI via DirectQuery for an interactive analytics dashboard.",
      "Containerised the entire pipeline with Docker for reproducible, automated execution.",
    ],
    tags: [
      "Python",
      "Kafka",
      "MinIO",
      "Airflow",
      "Snowflake",
      "dbt",
      "Docker",
      "Power BI",
    ],
    featured: true,
    status: "Shipped",
    image: "/spotify-dashboard.png",
    imageFit: "contain",
    // 1313 × 741.
    imageAspect: 1313 / 741,
    imageAlt:
      "Power BI dashboard for the Spotify pipeline: play, song, user and sales totals, a world map of listens, device and action donut charts, and a bar chart of the top artists by total plays.",
    gradient: ["#1db954", "#a855f7"],
  },
];

/**
 * Flat skill list. `group` powers the filter chips; `color` tints the tile.
 * `icon` selects a glyph from components/Brand.tsx; `mark` is the two-letter
 * fallback drawn only if that slug has no glyph.
 */
export type Skill = {
  name: string;
  /** Fallback glyph slug in components/Brand.tsx, used when `image` is unset. */
  icon: string;
  /** Two-letter last resort, drawn only if neither `image` nor `icon` resolves. */
  mark: string;
  color: string;
  group: SkillGroup;
  /**
   * Real logo in /public/icons. Takes priority over `icon`.
   * Five entries have no file yet — Pandas, Power BI, Excel, VS Code and
   * ChatGPT — so those fall back to the drawn glyphs.
   */
  image?: string;
  /**
   * For single-ink logos only. Every tile shares one background, so a
   * monochrome mark would vanish on one theme — this flips it on that theme.
   *   "on-dark"  — a WHITE single-ink mark (ChatGPT, Cursor, Copilot)
   *   "on-light" — a BLACK single-ink mark (GitHub)
   *   "lift"     — a dark MULTI-COLOUR mark (Pandas). Inverting would wreck its
   *                hues, so it's brightened on dark instead of flipped.
   * Leave unset for full-colour logos that read on both.
   */
  ink?: "on-dark" | "on-light" | "lift";
};
export type SkillGroup =
  "Languages" | "Data" | "Databases" | "Analytics" | "Tools";

export const skillGroups: SkillGroup[] = [
  "Languages",
  "Data",
  "Databases",
  "Analytics",
  "Tools",
];

export const skills: Skill[] = [
  {
    name: "Python",
    icon: "python",
    mark: "Py",
    color: "#3776ab",
    group: "Languages",
    image: "/icons/python.png",
  },
  {
    name: "Java",
    icon: "java",
    mark: "Jv",
    color: "#f89820",
    group: "Languages",
    image: "/icons/java.png",
  },
  {
    name: "JavaScript",
    icon: "javascript",
    mark: "JS",
    color: "#f7df1e",
    group: "Languages",
    image: "/icons/javascript.png",
  },
  {
    name: "HTML",
    icon: "html5",
    mark: "H5",
    color: "#e34f26",
    group: "Languages",
    image: "/icons/html5.png",
  },
  {
    name: "CSS",
    icon: "css",
    mark: "C3",
    color: "#1572b6",
    group: "Languages",
    image: "/icons/css3.png",
  },

  {
    name: "Pandas",
    icon: "pandas",
    mark: "Pd",
    color: "#9b59b6",
    group: "Data",
    image: "/icons/pandas.png",
    ink: "lift",
  },
  {
    name: "NumPy",
    icon: "numpy",
    mark: "Np",
    color: "#4dabcf",
    group: "Data",
    image: "/icons/numpy.png",
  },

  {
    name: "MySQL",
    icon: "mysql",
    mark: "My",
    color: "#00758f",
    group: "Databases",
    image: "/icons/mysql.png",
  },
  {
    name: "MongoDB",
    icon: "mongodb",
    mark: "Mg",
    color: "#47a248",
    group: "Databases",
    image: "/icons/mongodb.png",
  },

  {
    name: "Power BI",
    icon: "powerbi",
    mark: "BI",
    color: "#f2c811",
    group: "Analytics",
    image: "/icons/powerbi.png",
  },
  {
    name: "Excel",
    icon: "excel",
    mark: "Xl",
    color: "#217346",
    group: "Analytics",
    image: "/icons/excel.png",
  },

  {
    name: "Git",
    icon: "git",
    mark: "Gt",
    color: "#f05032",
    group: "Tools",
    image: "/icons/git.png",
  },
  {
    name: "GitHub",
    icon: "github",
    mark: "GH",
    color: "#8b949e",
    group: "Tools",
    image: "/icons/github.png",
    ink: "on-light",
  },
  {
    name: "VS Code",
    icon: "vscode",
    mark: "VS",
    color: "#007acc",
    group: "Tools",
    image: "/icons/vscode.png",
  },
  {
    name: "PyCharm",
    icon: "pycharm",
    mark: "PC",
    color: "#21d789",
    group: "Tools",
    image: "/icons/pycharm.png",
  },
  {
    name: "ChatGPT",
    icon: "chatgpt",
    mark: "GP",
    color: "#10a37f",
    group: "Tools",
    image: "/icons/chatgpt.png",
    ink: "on-dark",
  },
  {
    name: "Copilot",
    icon: "githubcopilot",
    mark: "Cp",
    color: "#a78bfa",
    group: "Tools",
    image: "/icons/copilot.png",
    ink: "on-dark",
  },
  {
    name: "Cursor",
    icon: "cursor",
    mark: "Cu",
    color: "#e5e7eb",
    group: "Tools",
    image: "/icons/cursor.png",
    ink: "on-dark",
  },
  {
    name: "Claude",
    icon: "claude",
    mark: "Cl",
    color: "#d97757",
    group: "Tools",
    image: "/icons/claude.png",
  },
  {
    name: "Codex",
    icon: "codex",
    mark: "Cx",
    color: "#22d3ee",
    group: "Tools",
    image: "/icons/codex.png",
  },
];

export type Certification = {
  title: string;
  issuer: string;
  href?: string;
  /** Short tag shown above the title. */
  kind: string;
};

/**
 * Ordered by relevance to the data engineering positioning, so the strongest
 * credential is read first. Every href was checked and resolves.
 */
export const certifications: Certification[] = [
  {
    title: "Data Engineering on AWS – Foundations",
    issuer: "AWS",
    kind: "Certification",
    href: "https://drive.google.com/file/d/1d7zC4mv1VXywzSYXkPPDiKUrcclJ6J5K/view",
  },
  {
    title: "GenAI Powered Data Analytics Job Simulation",
    issuer: "Forage",
    kind: "Simulation",
    href: "https://drive.google.com/file/d/1HGP2t1nA7s8T09Ky-7iiysgMP-MGCavW/view",
  },
  {
    title: "Oracle Certified AI Foundations Associate",
    issuer: "Oracle",
    kind: "Certification",
    href: "https://drive.google.com/file/d/14KalD9E0Y1eZtw0uMd1KFD29hbBFzo-u/view",
  },
  {
    title: "Azure Cognitive Services: Computer Vision App",
    issuer: "Coursera",
    kind: "Guided Project",
    href: "https://www.coursera.org/account/accomplishments/verify/PZ2BQ2D5QZNG",
  },
  {
    title: "DebugArena Coding Contest",
    issuer: "HackerRank",
    kind: "Contest",
    href: "https://drive.google.com/file/d/14rVUHyVKjwgb-nVGdKxs0P28DyMUwQ1s/view",
  },
  {
    title: "Nexify'26 Hackathon",
    issuer: "Alta School of Technology × Sushant University",
    kind: "Hackathon",
    href: "https://drive.google.com/file/d/1qVEHWIfSsYQq7RwhJGWlvtekcKwRFh7c/view",
  },
];

/**
 * ── CODING PROFILES ──────────────────────────────────────────
 *  The only place usernames are defined. Everything in the
 *  Coding Activity section derives its URLs and API calls from here.
 * ─────────────────────────────────────────────────────────────
 */
export const codingProfiles = {
  github: {
    username: "kooshant",
    profileUrl: "https://github.com/kooshant",
    /** Logo shown on the card header, same white chip as the company logos. */
    logo: "/icons/github.png",
  },
  leetcode: {
    username: "kooshant_kumar",
    profileUrl: "https://leetcode.com/u/kooshant_kumar/",
    /**
     * No LeetCode file was in your icons folder, so the card falls back to the
     * drawn mark in components/icons.tsx. Drop a `leetcode.png` into
     * public/icons and set it here to use the real one.
     */
    logo: undefined as string | undefined,
  },
} as const;

/**
 * Display switches for the Coding Activity section. All data is fetched live
 * either way — these only control what gets shown.
 */
export const codingDisplay = {
  /**
   * How long cached GitHub/LeetCode responses stay fresh, in seconds.
   *
   * Keep this comfortably above ~2 minutes. GitHub's unauthenticated API allows
   * 60 requests/hour per IP and one regeneration spends roughly 6 of them
   * (user + repos + one per repo for languages). Vercel's serverless IPs are
   * shared, so a tight interval risks a 403 — which degrades the card to
   * "temporarily unavailable". One hour leaves a wide margin.
   *
   * Must be kept in sync with `revalidate` in app/page.tsx — a compile-time
   * guard there fails the build if they diverge. `as const` is what makes that
   * check meaningful.
   */
  revalidateSeconds: 3_600 as const,

  /**
   * Hides a stat when its value is 0 (followers, stars, forks).
   * Set to false to always show them, zeros included.
   */
  hideEmptyStats: true,

  /**
   * The GitHub contribution calendar. Off because the `kooshant` account
   * currently has 1 contribution in the trailing year, so the graph renders as
   * an near-empty grid — which reads worse than not showing it. Flip to true
   * once you're committing regularly; the component is built and live.
   */
  showGithubContributions: false,

  /** LeetCode submission heatmap — real data, 34 active days in the past year. */
  showLeetcodeHeatmap: true,

  maxRepos: 4,
  maxLanguages: 5,
};

/**
 * ── TOP LANGUAGES ────────────────────────────────────────────
 *  "github"  — measured live from the byte counts of your public repos.
 *              Honest, but right now it reports CSS 46% / HTML 23% because
 *              your portfolio repo dominates, which buries Python.
 *  "manual"  — the curated list below: what you actually build with.
 *              Shown as "Primary Languages" so it never claims to be
 *              measured repo data.
 * ─────────────────────────────────────────────────────────────
 */
export const codingLanguages = {
  source: "manual" as "github" | "manual",

  /**
   * Self-declared emphasis for AI/ML and data work — edit these freely.
   * Every entry here is a language already listed in your resume's skills
   * section; nothing has been added that you don't actually use.
   * Percentages are relative weighting, not measured output.
   */
  manual: [
    { name: "Python", percent: 46 },
    { name: "SQL", percent: 20 },
    { name: "Java", percent: 14 },
    { name: "JavaScript", percent: 12 },
    { name: "HTML/CSS", percent: 8 },
  ],
};

export const contact = {
  heading: "Have a role, a project, or an idea worth building?",
  body: "I'm looking for data engineering opportunities where I can keep shipping — pipelines, SQL, and getting messy data into usable shape. If you're hiring interns or new grads, or just want to talk about a build, my inbox is open.",
};

/** Drives both the floating dock and scroll-spy. */
export const sections = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "coding", label: "Coding" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
] as const;
