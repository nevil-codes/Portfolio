import { stack } from "@/lib/content";

export default function Stack() {
  return (
    <section id="stack" className="py-24 md:py-[88px] border-b border-border">
      <div className="font-mono text-[13px] text-amber mb-3">02 / stack</div>
      <h2 className="m-0 mb-10 text-[34px] font-semibold tracking-tight">Technologies</h2>
      <div className="flex flex-col gap-7">
        {stack.map((g) => (
          <div key={g.label} className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 items-baseline">
            <div className="font-mono text-[13px] text-dim">{g.label}</div>
            <div className="flex flex-wrap gap-2">
              {g.items.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[13px] text-ink bg-surface border border-border px-3 py-1.5 rounded-md"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
