import { ArrowUpRightIcon } from "../icons";

/**
 * Shown when an upstream API fails. The profile link still works, so the card
 * stays useful rather than rendering an error.
 */
export default function Unavailable({
  service,
  profileUrl,
}: {
  service: string;
  profileUrl: string;
}) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-xl border border-dashed border-line-2 bg-card-2 px-4 py-6">
      <p className="text-sm text-muted">
        {service} statistics are temporarily unavailable.
      </p>
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-accent"
      >
        View {service} Profile
        <ArrowUpRightIcon width={15} height={15} />
      </a>
    </div>
  );
}
