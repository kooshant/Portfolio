import { profile } from "@/data/profile";
import LocalTime from "./LocalTime";

export default function Footer() {
  return (
    <footer className="stripes gutter border-t border-line py-7">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-muted">
            Built with curiosity by{" "}
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="font-medium text-fg underline decoration-line-2 underline-offset-4 transition-colors hover:decoration-accent"
            >
              {profile.name}
            </a>
          </p>
          <p className="mt-1 font-mono text-xs text-faint">
            © {new Date().getFullYear()} · All rights reserved
          </p>
        </div>

        <LocalTime />
      </div>
    </footer>
  );
}
