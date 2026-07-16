import { writing } from "@/lib/content";

export default function Writing() {
  return (
    <section id="writing" className="py-24 md:py-[88px] border-b border-border">
      <div className="font-mono text-[13px] text-amber mb-3">05 / writing</div>
      <h2 className="m-0 mb-4 text-[34px] font-semibold tracking-tight">Writing</h2>
      <p className="m-0 font-mono text-sm text-dim">{writing.emptyNote}</p>
    </section>
  );
}
