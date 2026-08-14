import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Reveal } from "@/components/Reveal";
import { resultMetrics } from "@/lib/data";

const themes = [
  {
    value: "text-[#2563eb]",
    iconWrap: "bg-[#2563eb]",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M2 11.5 6 7.5 8.5 10 14 4" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.2 4H14v3.8" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    chart: (
      <svg className="h-24 w-40" viewBox="0 0 160 96" aria-hidden>
        <defs>
          <linearGradient id="r-blue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 72 C 28 70, 42 64, 58 58 S 92 52, 110 40 S 140 22, 160 8 L 160 96 L 0 96 Z" fill="url(#r-blue)" />
        <path d="M0 72 C 28 70, 42 64, 58 58 S 92 52, 110 40 S 140 22, 160 8" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: "text-[#7c3aed]",
    iconWrap: "bg-[#7c3aed]",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="5.2" stroke="white" strokeWidth="1.6" />
        <circle cx="8" cy="8" r="1.8" fill="white" />
      </svg>
    ),
    chart: (
      <svg className="h-24 w-36" viewBox="0 0 144 96" aria-hidden>
        <defs>
          <linearGradient id="r-bar" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
        {[28, 40, 52, 68, 82].map((h, i) => (
          <rect key={h} x={12 + i * 26} y={90 - h} width="16" height={h} rx="4" fill="url(#r-bar)" opacity={0.55 + i * 0.09} />
        ))}
      </svg>
    ),
  },
  {
    value: "text-[#16a34a]",
    iconWrap: "bg-[#16a34a]",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="5.4" stroke="white" strokeWidth="1.6" />
        <path d="M8 5.2v5.6M6.2 6.6h2.4a1.6 1.6 0 0 1 0 3.2H6.6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    chart: (
      <svg className="h-24 w-40" viewBox="0 0 160 96" aria-hidden>
        <defs>
          <linearGradient id="r-green" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#16a34a" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 78 C 36 74, 52 62, 78 54 S 120 40, 148 18 L 160 10 L 160 96 L 0 96 Z" fill="url(#r-green)" />
        <path d="M0 78 C 36 74, 52 62, 78 54 S 120 40, 148 18 L 156 12" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
        <path d="M146 20 158 8 146 12" fill="none" stroke="#16a34a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: "text-[#ea580c]",
    iconWrap: "bg-[#ea580c]",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M2 4.5 6 8.5 8.5 6 14 12" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.2 12H14V8.2" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    chart: (
      <svg className="h-24 w-40" viewBox="0 0 160 96" aria-hidden>
        <defs>
          <linearGradient id="r-orange" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ea580c" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M8 18 C 40 22, 58 34, 80 48 S 124 74, 152 82 L 152 96 L 8 96 Z" fill="url(#r-orange)" />
        <path d="M8 18 C 40 22, 58 34, 80 48 S 124 74, 152 82" fill="none" stroke="#ea580c" strokeWidth="3" strokeLinecap="round" />
        {[8, 44, 80, 116, 152].map((x, i) => (
          <circle key={x} cx={x} cy={[18, 28, 48, 70, 82][i]} r="3.2" fill="#ea580c" />
        ))}
      </svg>
    ),
  },
  {
    value: "text-[#0ea5e9]",
    iconWrap: "bg-[#0ea5e9]",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="7" cy="7" r="4.4" stroke="white" strokeWidth="1.6" />
        <path d="m10.4 10.4 3.2 3.2" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    chart: (
      <svg className="h-24 w-40" viewBox="0 0 160 96" aria-hidden>
        <path
          d="M4 70 L 22 58 L 38 64 L 54 42 L 72 50 L 90 28 L 108 36 L 128 16 L 148 22 L 160 8"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    value: "text-[#db2777]",
    iconWrap: "bg-[#db2777]",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="6" cy="6" r="2.1" fill="white" />
        <circle cx="10.4" cy="6.4" r="1.7" fill="white" />
        <path d="M2.6 13c.4-2.1 1.8-3.3 3.5-3.3S9.2 10.9 9.6 13H2.6Z" fill="white" />
        <path d="M9.4 10.2c1.1-.2 2.4.6 3 2.2.2.5.3.8.3.8H9.8c-.2-1.2-.6-2.2-.4-3Z" fill="white" />
      </svg>
    ),
    chart: (
      <svg className="h-28 w-28" viewBox="0 0 112 112" aria-hidden>
        <circle cx="56" cy="56" r="38" fill="none" stroke="#fce7f3" strokeWidth="12" />
        <circle
          cx="56"
          cy="56"
          r="38"
          fill="none"
          stroke="#db2777"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 38 * 0.92} ${2 * Math.PI * 38}`}
          transform="rotate(-90 56 56)"
        />
        <text x="56" y="61" textAnchor="middle" fontSize="18" fontWeight="800" fill="#db2777">
          92%
        </text>
      </svg>
    ),
  },
];

export function Results() {
  return (
    <section className="relative overflow-hidden bg-surface py-20 md:py-28">
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-sky">
            Results
            <span className="h-px w-8 bg-sky" />
          </p>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-sky-dark md:text-6xl">
            Good marketing looks creative.
            <br />
            <span className="text-sky">Great marketing moves numbers.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resultMetrics.map((metric, index) => {
            const theme = themes[index];
            return (
              <Reveal key={metric.label} delay={index * 50}>
                <article className="relative min-h-[240px] overflow-hidden rounded-2xl border border-line bg-white p-6 pb-20 shadow-[0_12px_32px_rgba(15,23,42,0.06)] sm:p-7">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-full ${theme.iconWrap}`}>
                    {theme.icon}
                  </span>
                  <p className={`mt-5 font-display text-4xl font-extrabold tracking-tight md:text-5xl ${theme.value}`}>
                    <AnimatedCounter
                      value={metric.value}
                      suffix={metric.suffix}
                      decimals={"decimals" in metric ? metric.decimals : 0}
                    />
                  </p>
                  <h3 className="mt-3 font-bold text-sky-dark">{metric.label}</h3>
                  <p className="mt-1 max-w-[16rem] text-sm text-muted">{metric.detail}</p>
                  <div className="pointer-events-none absolute right-0 bottom-0 opacity-90">{theme.chart}</div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
