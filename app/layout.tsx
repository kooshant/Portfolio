import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display serif for the name and section headlines.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const title = `${profile.name} — ${profile.role}`;
const description =
  "Computer Science undergraduate working across data engineering, AI and software — Python, SQL, streaming pipelines and the applications built on top of them. Portfolio, experience and coding activity.";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kooshant.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    profile.name,
    "Data Engineer",
    "Data Engineering",
    "AI Engineer",
    "Machine Learning",
    "Software Engineer",
    "SQL",
    "Python",
    "Pandas",
    "ETL",
    "Portfolio",
    "Gurugram",
  ],
  authors: [{ name: profile.name, url: profile.links.github }],
  creator: profile.name,
  openGraph: {
    type: "profile",
    title,
    description,
    siteName: profile.name,
    images: [{ url: profile.photo, alt: profile.name }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [profile.photo],
  },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
};

export const viewport: Viewport = {
  themeColor: "#08080b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // Pinned to dark. This attribute is what actually locks it: without it the
      // `prefers-color-scheme: light` rules in globals.css would still hand the
      // light palette to anyone whose OS is set to light mode.
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <head>
        {/* Scroll-reveal elements are server-rendered at opacity:0. Without JS
            nothing would ever reveal them, so show everything up front. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full bg-bg text-fg">{children}</body>
    </html>
  );
}
