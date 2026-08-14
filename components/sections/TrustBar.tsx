import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Reveal } from "@/components/Reveal";
import { stats, trustedBrands } from "@/lib/data";

const icons = {
  rocket: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3c4 2 7 7 7 11-2.2-.4-4.4-1.6-6.2-3.4C11 8.8 9.8 6.6 9.4 4.4 10.8 3.5 11.5 3.2 12 3Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9.5 14.5 6 18m8.5-3.5L18 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="14.2" cy="8.2" r="1.2" fill="currentColor" />
    </svg>
  ),
  chart: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 19h16M7 16V9m5 7V5m5 11v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  people: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="16" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 19c.6-3 2.6-4.8 5-4.8s4.4 1.8 5 4.8M14 14.4c1.8-.2 3.6 1.1 4.4 3.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  trophy: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 5h8v4a4 4 0 0 1-8 0V5Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 7H5.5A2.5 2.5 0 0 0 8 10.2M16 7h2.5A2.5 2.5 0 0 1 16 10.2M12 13v3m-3 3h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
};

export function TrustBar() {
  return (
    <section aria-label="Proof">
      <div className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.28em] text-muted">
            Trusted by growing brands
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-14">
            {trustedBrands.map((brand) => (
              <span
                key={brand.name}
                className={`text-xl text-slate-400 transition hover:text-sky-dark md:text-2xl ${brand.className}`}
              >
                {brand.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 70}>
              <article className="rounded-[1.4rem] border border-line bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky/10 text-sky">
                  {icons[stat.icon]}
                </span>
                <p className="mt-5 font-display text-3xl font-extrabold tracking-tight text-sky-dark md:text-4xl">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={"prefix" in stat ? stat.prefix : ""}
                    suffix={stat.suffix}
                    decimals={"decimals" in stat ? stat.decimals : 0}
                  />
                </p>
                <h3 className="mt-2 text-sm font-bold text-sky-dark">{stat.label}</h3>
                <p className="mt-1 text-sm text-muted">{stat.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
