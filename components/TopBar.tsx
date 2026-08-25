import { profile } from "@/data/profile";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

const socials = [
  { href: profile.links.github, label: "GitHub", Icon: GitHubIcon },
  { href: profile.links.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: profile.links.email, label: "Email", Icon: MailIcon },
];

/** Social cluster. The theme switch is gone — the site is dark-only. */
export default function TopBar() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1 rounded-full border border-line bg-card p-1">
        {socials.map(({ href, label, Icon }) => {
          const external = href.startsWith("http");
          return (
            <a
              key={label}
              href={href}
              aria-label={label}
              title={label}
              {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
              className="grid h-8 w-8 place-items-center rounded-full text-muted transition-all duration-200 hover:bg-card-2 hover:text-fg"
            >
              <Icon width={15} height={15} />
            </a>
          );
        })}
      </div>
    </div>
  );
}
