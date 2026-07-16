import { resumeUrl, site } from "@/lib/content";

const links = [
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#about", label: "About" },
  { href: "#certifications", label: "Certifications" },
  { href: "#writing", label: "Writing" },
];

export default function Nav() {
  return (
    <nav className="sticky top-0 z-[100] flex items-center justify-between px-12 py-5 bg-bg/85 backdrop-blur-md border-b border-border">
      <a
        href="#top"
        className="font-mono text-sm font-semibold text-ink tracking-wide no-underline"
      >
        {site.domain}<span className="text-amber">.{site.domainTld}</span>
      </a>
      <div className="flex items-center gap-7">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-sm text-muted no-underline hover:text-ink transition-colors"
          >
            {l.label}
          </a>
        ))}
        <a
          href={resumeUrl}
          className="font-mono text-[13px] text-amber no-underline border border-amber/30 rounded-md px-3.5 py-1.5 hover:bg-amber hover:text-bg transition-colors"
        >
          Resume →
        </a>
      </div>
    </nav>
  );
}
