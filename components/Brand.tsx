import type { ReactNode } from "react";
import { brandPaths } from "./brandPaths";

/**
 * Category glyphs for the marks Simple Icons doesn't ship (Microsoft, OpenAI
 * and Oracle brands are excluded there for trademark reasons). Drawn rather
 * than approximated from memory, so nothing pretends to be an official logo.
 */
const glyphs: Record<string, ReactNode> = {
  // Coffee cup + steam
  java: (
    <>
      <path d="M9.2 3c0 1.1-1.3 1.6-1.3 2.7S9.2 7.2 9.2 8.2" />
      <path d="M12.9 2.4c0 1.3-1.5 1.9-1.5 3.1s1.5 1.9 1.5 2.7" />
      <path d="M5 10.6h11v3.6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4Z" />
      <path d="M16 11.6h1.4a2 2 0 0 1 0 4H16" />
      <path d="M4.2 20.8h13.4" />
    </>
  ),
  // Bar chart
  powerbi: (
    <>
      <rect x="3.6" y="12" width="4.3" height="8.2" rx="1.2" />
      <rect x="9.9" y="7.6" width="4.3" height="12.6" rx="1.2" />
      <rect x="16.2" y="3.6" width="4.3" height="16.6" rx="1.2" />
    </>
  ),
  // Spreadsheet grid
  excel: (
    <>
      <rect x="3.4" y="4.2" width="17.2" height="15.6" rx="2.2" />
      <path d="M3.4 9.4h17.2M3.4 14.6h17.2M9.9 4.2v15.6" />
    </>
  ),
  // Code brackets
  vscode: (
    <>
      <path d="M8.8 6.6 3.8 12l5 5.4" />
      <path d="M15.2 6.6 20.2 12l-5 5.4" />
      <path d="M13.4 4.3 10.6 19.7" />
    </>
  ),
  // Sparkles — the common stand-in for an AI assistant
  chatgpt: (
    <>
      <path d="M10 3.2c.45 4.3 2.6 6.45 6.9 6.9-4.3.45-6.45 2.6-6.9 6.9-.45-4.3-2.6-6.45-6.9-6.9 4.3-.45 6.45-2.6 6.9-6.9Z" />
      <path d="M17.6 14.2c.22 2.1 1.28 3.16 3.4 3.4-2.12.22-3.18 1.28-3.4 3.4-.22-2.12-1.28-3.18-3.4-3.4 2.12-.24 3.18-1.3 3.4-3.4Z" />
    </>
  ),
  // Terminal prompt
  codex: (
    <>
      <rect x="2.6" y="4.4" width="18.8" height="15.2" rx="2.4" />
      <path d="m7 10.2 3 2.6-3 2.6" />
      <path d="M12.6 15.4h4.6" />
    </>
  ),
};

export default function Brand({
  name,
  size = 16,
  className,
  fallback,
}: {
  name?: string;
  size?: number;
  className?: string;
  /** Shown when the slug has no glyph — e.g. a two-letter mark. */
  fallback?: ReactNode;
}) {
  if (!name) return <>{fallback}</>;

  // Official single-path marks render filled.
  const path = brandPaths[name];
  if (path) {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="currentColor"
        aria-hidden
        className={className}
      >
        <path d={path} />
      </svg>
    );
  }

  // Drawn glyphs render stroked; the weight is tuned to sit alongside the
  // filled marks without looking lighter at 16px.
  const glyph = glyphs[name];
  if (!glyph) return <>{fallback}</>;

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {glyph}
    </svg>
  );
}
