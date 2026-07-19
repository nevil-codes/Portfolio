"use client";

import { useState } from "react";
import { resumeUrl, site } from "@/lib/content";

const links = [
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#about", label: "About" },
  { href: "#certifications", label: "Certifications" },
  { href: "#writing", label: "Writing" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-[100] bg-bg/85 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-5 sm:px-8 md:px-12 py-5">
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="font-mono text-sm font-semibold text-ink tracking-wide no-underline"
        >
          {site.domain}
          <span className="text-amber">.{site.domainTld}</span>
        </a>

        <div className="hidden md:flex items-center gap-7">
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

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          className="md:hidden font-mono text-[13px] text-muted border border-border-strong rounded-md px-3 py-1.5 hover:text-ink hover:border-amber transition-colors"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col gap-1 px-5 sm:px-8 pb-5 border-t border-border">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-sm text-muted no-underline hover:text-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href={resumeUrl}
            onClick={() => setOpen(false)}
            className="mt-2 text-center font-mono text-[13px] text-amber no-underline border border-amber/30 rounded-md px-3.5 py-2 hover:bg-amber hover:text-bg transition-colors"
          >
            Resume →
          </a>
        </div>
      )}
    </nav>
  );
}
