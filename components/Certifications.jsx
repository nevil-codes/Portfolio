import { certifications } from "@/lib/content";

export default function Certifications() {
  if (!certifications?.length) return null;

  return (
    <section id="certifications" className="py-24 md:py-[88px] border-b border-border">
      <div className="font-mono text-[13px] text-amber mb-3">04 / certifications</div>
      <h2 className="m-0 mb-10 text-[34px] font-semibold tracking-tight">Certifications</h2>
      <div className="flex flex-col gap-4">
        {certifications.map((c) => (
          <a
            key={c.name}
            href={c.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 p-6 bg-surface border border-border rounded-[10px] no-underline text-inherit transition-colors hover:border-amber/40"
          >
            <div className="flex flex-col gap-1">
              <span className="text-base font-semibold text-ink">{c.name}</span>
              <span className="text-sm text-muted">{c.issuer}</span>
            </div>
            <div className="flex items-baseline gap-5">
              <span className="font-mono text-xs text-dim">{c.year}</span>
              <span className="font-mono text-[13px] text-amber">verify →</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
