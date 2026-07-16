import { projects, social } from "@/lib/content";

export default function Projects() {
  return (
    <section id="work" className="py-24 md:py-[88px] border-b border-border">
      <div className="font-mono text-[13px] text-amber mb-3">01 / work</div>
      <h2 className="m-0 mb-10 text-[34px] font-semibold tracking-tight">Selected projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-3 p-7 bg-surface border border-border rounded-[10px] no-underline text-inherit transition-colors hover:border-amber/40"
          >
            <div className="flex justify-between items-baseline gap-3">
              <span className="font-mono text-[15px] font-semibold text-ink">{p.name}</span>
              <span className="font-mono text-xs text-amber whitespace-nowrap">{p.lang}</span>
            </div>
            <p className="m-0 text-sm leading-relaxed text-muted">{p.desc}</p>
            <span className="font-mono text-xs text-dim">{p.meta}</span>
          </a>
        ))}
      </div>
      <a
        href={social.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-7 font-mono text-[13px] text-muted no-underline hover:text-amber transition-colors"
      >
        all repos on github →
      </a>
    </section>
  );
}
