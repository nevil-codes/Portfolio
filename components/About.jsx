import { education, about } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-[88px] border-b border-border">
      <div className="font-mono text-[13px] text-amber mb-3">03 / about</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="m-0 mb-5 text-[34px] font-semibold tracking-tight">About</h2>
          <p className="m-0 text-base leading-[1.7] text-muted">{about.text}</p>
        </div>
        <div>
          <h3 className="m-0 mb-5 font-mono text-sm font-medium text-dim uppercase tracking-wider">
            Education
          </h3>
          <div className="flex flex-col gap-5">
            {education.map((e) => (
              <div
                key={e.degree}
                className="flex flex-col gap-1 pl-4 border-l-2 border-border-strong"
              >
                <span className="text-base font-semibold">{e.degree}</span>
                <span className="text-sm text-muted">{e.school}</span>
                <span className="font-mono text-xs text-dim">{e.years}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
