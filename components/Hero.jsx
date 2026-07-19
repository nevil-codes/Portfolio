import { social, hero } from "@/lib/content";
import Photo from "./Photo";

export default function Hero() {
  return (
    <header className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-10 md:gap-16 items-center py-16 md:py-[88px] border-b border-border">
      <div className="flex flex-col gap-6 order-2 md:order-1">
        <div className="font-mono text-sm text-amber">{hero.kicker}</div>
        <h1 className="m-0 text-4xl sm:text-5xl md:text-[60px] font-semibold leading-[1.05] tracking-tight">
          {hero.heading}
        </h1>
        <p className="m-0 text-base sm:text-lg md:text-[19px] leading-relaxed text-muted max-w-[480px]">
          {hero.intro}
        </p>
        <div className="flex flex-wrap gap-3 mt-2">
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[13px] font-semibold text-bg bg-amber no-underline px-5 py-[11px] rounded-md hover:bg-amber-light transition-colors"
          >
            GitHub →
          </a>
          <a
            href={`mailto:${social.email}`}
            className="font-mono text-[13px] text-ink border border-border-strong no-underline px-5 py-[11px] rounded-md hover:border-amber hover:text-amber transition-colors"
          >
            Email me
          </a>
        </div>
      </div>
      <div className="order-1 md:order-2">
        <Photo />
      </div>
    </header>
  );
}
