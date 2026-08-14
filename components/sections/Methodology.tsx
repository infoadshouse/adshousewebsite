import { Reveal } from "@/components/Reveal";
import { methodology } from "@/lib/data";

const themes = [
  {
    value: "text-[#2563eb]",
    wrap: "bg-[#dbeafe] text-[#2563eb]",
    rule: "bg-[#2563eb]",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="11" cy="11" r="6.2" stroke="currentColor" strokeWidth="1.8" />
        <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: "text-[#7c3aed]",
    wrap: "bg-[#f3e8ff] text-[#7c3aed]",
    rule: "bg-[#7c3aed]",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M7 8.5 12 6l5 2.5v7L12 18l-5-2.5v-7Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M12 6v12M7 8.5l5 2.5 5-2.5" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    ),
  },
  {
    value: "text-[#e11d48]",
    wrap: "bg-[#ffe4e6] text-[#e11d48]",
    rule: "bg-[#e11d48]",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12.6 4c3.2 1.7 6 6 6.6 9.8-2.3-.5-4.7-1.8-6.6-3.7-1.9-1.9-3.2-4.2-3.7-6.4.9-.4 2.2-.8 3.7.3Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="m9.2 14.8-3 3.2M14.8 14.8l3 3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: "text-[#0d9488]",
    wrap: "bg-[#ccfbf1] text-[#0d9488]",
    rule: "bg-[#0d9488]",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 16.5 9 11l3.5 3.5L20 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14.5 7H20v5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: "text-[#ca8a04]",
    wrap: "bg-[#fef9c3] text-[#ca8a04]",
    rule: "bg-[#eab308]",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 19h16M7 16V11m5 5V8m5 8v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="m14 6.5 3-2.5 3 2.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function Methodology() {
  return (
    <section className="relative overflow-hidden bg-surface py-20 md:py-28">
      <div className="hero-blob -right-16 top-0 h-72 w-72 bg-purple/20" />
      <div className="hero-blob right-24 top-8 h-56 w-56 bg-sky/15" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-sky">
            The growth methodology
          </p>
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-sky-dark md:text-5xl">
            Discover. Build. Launch. Optimize. Scale
            <span className="text-sky">.</span>
          </h2>
          <p className="mt-4 text-lg text-muted">
            We do not sell isolated services. We install a growth system that keeps compounding after
            the first campaign.
          </p>
          <span className="mt-5 block h-[3px] w-28 rounded-full bg-gradient-to-r from-sky to-purple" />
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-5">
          {methodology.map((item, index) => {
            const theme = themes[index];
            return (
              <Reveal key={item.step} delay={index * 80} className="relative">
                {index < methodology.length - 1 ? (
                  <span
                    className="pointer-events-none absolute top-10 -right-3 z-10 hidden h-6 w-6 items-center justify-center rounded-full border border-line bg-white text-slate-400 md:flex"
                    aria-hidden
                  >
                    <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                      <path d="M4 2.5 8 6 4 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                ) : null}
                <article className="h-full rounded-2xl border border-line bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-full ${theme.wrap}`}>
                    {theme.icon}
                  </span>
                  <p className={`mt-5 font-display text-2xl font-extrabold ${theme.value}`}>{item.step}</p>
                  <h3 className="mt-2 font-display text-xl font-bold text-sky-dark">{item.title}</h3>
                  <span className={`mt-3 block h-1 w-10 rounded-full ${theme.rule}`} />
                  <p className="mt-4 text-sm leading-relaxed text-muted">{item.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
