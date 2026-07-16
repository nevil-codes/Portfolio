import { social, site } from "@/lib/content";

const links = [
  { href: social.github, label: "github" },
  { href: social.linkedin, label: "linkedin" },
  { href: social.leetcode, label: "leetcode" },
  { href: social.hackerrank, label: "hackerrank" },
];

export default function Footer() {
  return (
    <footer id="contact" className="pt-24 md:pt-[88px] pb-16">
      <div className="font-mono text-[13px] text-amber mb-3">06 / contact</div>
      <h2 className="m-0 mb-6 text-[44px] font-semibold tracking-tight">Let&apos;s talk.</h2>
      <a
        href={`mailto:${social.email}`}
        className="font-mono text-lg text-amber no-underline hover:underline"
      >
        {social.email}
      </a>
      <div className="flex flex-wrap gap-6 mt-12 pt-6 border-t border-border items-center">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[13px] text-muted no-underline hover:text-ink transition-colors"
          >
            {l.label}
          </a>
        ))}
        <span className="ml-auto font-mono text-xs text-dim">
          © {new Date().getFullYear()} {site.name}
        </span>
      </div>
    </footer>
  );
}
