import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Reveal } from "@/components/Reveal";
import { stats, trustedBrands } from "@/lib/data";

const tones = {
  rocket: {
    value: "text-[#7c3aed]",
    iconWrap: "bg-[#f3e8ff] text-[#7c3aed]",
  },
  chart: {
    value: "text-sky",
    iconWrap: "bg-[#dbeafe] text-sky",
  },
  people: {
    value: "text-[#7c3aed]",
    iconWrap: "bg-[#f3e8ff] text-[#7c3aed]",
  },
  trophy: {
    value: "text-orange",
    iconWrap: "bg-[#ffedd5] text-orange",
  },
} as const;

const icons = {
  rocket: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.8 2.4c2.8 1.6 5.4 5.6 6 9.2-2.1-.5-4.4-1.8-6.2-3.6-1.8-1.8-3-4-3.5-6.1.9-.5 2.2-1 3.7.5Z" />
      <path d="M9.2 10.2c1.9 1.9 4.1 3.2 6.3 3.7-.4 1.4-1.3 2.8-2.6 3.8-2.2-1.2-4.2-3.1-5.6-5.6 1-.7 1.4-1.3 1.9-1.9Z" opacity=".85" />
      <path d="M8.2 15.2 5 18.4M15.8 15.2 19 18.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  chart: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 19h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 16V10m5 6V7m5 9v-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M14 6.5 17 4l3 2.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  people: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="8.5" cy="8" r="2.6" />
      <circle cx="15.8" cy="8.6" r="2.2" />
      <path d="M3.4 18.2c.5-2.8 2.4-4.4 5.1-4.4s4.6 1.6 5.1 4.4H3.4Z" />
      <path d="M13.2 13.9c1.6-.2 3.4.8 4.3 3.1.3.7.4 1.2.4 1.2h-3.4c-.3-1.7-1-3.2-1.3-4.3Z" />
    </svg>
  ),
  trophy: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 4.8h8v4.2a4 4 0 0 1-8 0V4.8Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 6.6H5.6A2.4 2.4 0 0 0 8 10M16 6.6h2.4A2.4 2.4 0 0 1 16 10" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 13v2.6m-3.2 3.2h6.4M8.8 18.8h6.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
};

export function TrustBar() {
  return (
    <section className="bg-white py-10 md:py-14" aria-label="Proof">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-5 rounded-2xl border border-line bg-white px-5 py-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] md:flex-row md:items-center md:gap-8 md:px-7">
          <div className="shrink-0 md:border-r md:border-line md:pr-8">
            <p className="text-[11px] font-bold uppercase leading-tight tracking-[0.18em] text-slate-500">
              Trusted by
              <br />
              growing brands
            </p>
          </div>
          <div className="flex flex-1 flex-wrap items-center justify-between gap-x-8 gap-y-3">
            {trustedBrands.map((brand) => (
              <span
                key={brand.name}
                className={`text-[1.15rem] text-slate-700 md:text-[1.35rem] ${brand.className}`}
              >
                {brand.name}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => {
            const tone = tones[stat.icon];
            return (
              <Reveal key={stat.label} delay={index * 70}>
                <article className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
                  <span
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${tone.iconWrap}`}
                  >
                    {icons[stat.icon]}
                  </span>
                  <div className="min-w-0">
                    <p className={`font-display text-[1.85rem] font-extrabold leading-none tracking-tight ${tone.value}`}>
                      <AnimatedCounter
                        value={stat.value}
                        prefix={"prefix" in stat ? stat.prefix : ""}
                        suffix={stat.suffix}
                        decimals={"decimals" in stat ? stat.decimals : 0}
                      />
                    </p>
                    <h3 className="mt-1.5 text-sm font-bold text-sky-dark">{stat.label}</h3>
                    <p className="mt-0.5 text-xs text-muted">{stat.detail}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
