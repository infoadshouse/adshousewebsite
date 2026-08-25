import { Reveal } from "@/components/Reveal";
import { methodology } from "@/lib/data";

const themes = [
  {
    value: "text-[#2563eb]",
    panel: "bg-[#dbeafe]",
    rule: "bg-[#2563eb]",
    art: <DiscoverArt />,
  },
  {
    value: "text-[#7c3aed]",
    panel: "bg-[#efe6ff]",
    rule: "bg-[#7c3aed]",
    art: <BuildArt />,
  },
  {
    value: "text-[#e11d48]",
    panel: "bg-[#ffe4e6]",
    rule: "bg-[#e11d48]",
    art: <LaunchArt />,
  },
  {
    value: "text-[#0d9488]",
    panel: "bg-[#d1faf4]",
    rule: "bg-[#0d9488]",
    art: <OptimizeArt />,
  },
  {
    value: "text-[#ca8a04]",
    panel: "bg-[#fef3c7]",
    rule: "bg-[#eab308]",
    art: <ScaleArt />,
  },
];

export function Methodology() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="pointer-events-none absolute -right-10 top-0 h-80 w-80 rounded-full bg-purple/15 blur-3xl" />
      <div className="pointer-events-none absolute right-32 top-8 h-56 w-56 rounded-full bg-sky/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-sky">
            The growth methodology
          </p>
          <h2 className="font-display text-[2rem] font-extrabold leading-[1.15] tracking-tight text-sky-dark sm:text-4xl md:text-5xl">
            Discover. Build. Launch. Optimize. Scale.
            <span className="ml-1.5 inline-block h-2.5 w-2.5 -translate-y-1 rounded-sm bg-sky align-middle md:h-3 md:w-3 md:-translate-y-1.5" />
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            We do not sell isolated services. We install a growth system that keeps compounding after
            the first campaign.
          </p>
          <span className="mt-5 block h-[3px] w-24 rounded-full bg-gradient-to-r from-sky to-purple" />
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {methodology.map((item, index) => {
            const theme = themes[index];
            return (
              <Reveal key={item.step} delay={index * 80} className="relative h-full">
                {index < methodology.length - 1 ? (
                  <span
                    className="pointer-events-none absolute top-19 -right-6 z-20 hidden h-7 w-7 items-center justify-center rounded-full border border-line bg-white text-slate-300 shadow-sm lg:flex"
                    aria-hidden
                  >
                    <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M4 2.5 8 6 4 9.5"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                ) : null}
                <article className="flex h-full flex-col rounded-[1.35rem] border border-line bg-white p-3.5 pb-6 shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
                  <div
                    className={`flex h-[132px] items-center justify-center overflow-hidden rounded-[1.1rem] ${theme.panel}`}
                  >
                    {theme.art}
                  </div>
                  <div className="px-2.5 pt-4">
                    <p className={`font-display text-[1.65rem] font-extrabold leading-none ${theme.value}`}>
                      {item.step}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-bold tracking-tight text-sky-dark">
                      {item.title}
                    </h3>
                    <span className={`mt-3 block h-[3px] w-9 rounded-full ${theme.rule}`} />
                    <p className="mt-3 text-[13px] leading-relaxed text-muted">{item.body}</p>
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

function DiscoverArt() {
  return (
    <svg viewBox="0 0 180 130" className="h-[108px] w-[148px]" aria-hidden>
      <ellipse cx="90" cy="112" rx="48" ry="7" fill="#93c5fd" opacity="0.45" />
      <rect x="46" y="28" width="72" height="78" rx="8" fill="#bfdbfe" />
      <rect x="42" y="24" width="72" height="78" rx="8" fill="#fff" />
      <rect x="54" y="36" width="36" height="5" rx="2.5" fill="#bfdbfe" />
      <rect x="54" y="46" width="48" height="4" rx="2" fill="#dbeafe" />
      <rect x="54" y="54" width="40" height="4" rx="2" fill="#dbeafe" />
      <rect x="58" y="86" width="8" height="8" rx="1.5" fill="#93c5fd" />
      <rect x="70" y="78" width="8" height="16" rx="1.5" fill="#60a5fa" />
      <rect x="82" y="70" width="8" height="24" rx="1.5" fill="#2563eb" />
      <circle cx="118" cy="58" r="22" fill="#93c5fd" opacity="0.35" />
      <circle cx="118" cy="58" r="18" fill="#fff" />
      <circle cx="118" cy="58" r="13" fill="#dbeafe" />
      <circle cx="118" cy="58" r="13" fill="none" stroke="#2563eb" strokeWidth="4" />
      <rect x="128" y="74" width="7" height="22" rx="3.5" fill="#1d4ed8" transform="rotate(42 131 85)" />
      <circle cx="112" cy="52" r="4" fill="#fff" opacity="0.7" />
    </svg>
  );
}

function BuildArt() {
  return (
    <svg viewBox="0 0 180 130" className="h-[108px] w-[148px]" aria-hidden>
      <ellipse cx="90" cy="114" rx="50" ry="7" fill="#d8b4fe" opacity="0.45" />
      <rect x="38" y="22" width="88" height="58" rx="8" fill="#ddd6fe" />
      <rect x="34" y="18" width="88" height="58" rx="8" fill="#fff" />
      <circle cx="46" cy="30" r="3.2" fill="#f87171" />
      <circle cx="56" cy="30" r="3.2" fill="#fbbf24" />
      <circle cx="66" cy="30" r="3.2" fill="#34d399" />
      <rect x="44" y="40" width="68" height="28" rx="4" fill="#f3e8ff" />
      <path d="M70 86h28l-6 18H76Z" fill="#c4b5fd" />
      <rect x="48" y="78" width="28" height="28" rx="4" fill="#7c3aed" />
      <rect x="50" y="80" width="24" height="8" rx="2" fill="#a78bfa" />
      <rect x="84" y="70" width="28" height="28" rx="4" fill="#f97316" />
      <rect x="86" y="72" width="24" height="8" rx="2" fill="#fdba74" />
      <rect x="104" y="86" width="24" height="24" rx="4" fill="#eab308" />
      <rect x="106" y="88" width="20" height="7" rx="2" fill="#fde68a" />
    </svg>
  );
}

function LaunchArt() {
  return (
    <svg viewBox="0 0 180 130" className="h-[108px] w-[148px]" aria-hidden>
      <ellipse cx="90" cy="114" rx="50" ry="7" fill="#fda4af" opacity="0.45" />
      <rect x="28" y="30" width="70" height="52" rx="7" fill="#fecdd3" />
      <rect x="24" y="26" width="70" height="52" rx="7" fill="#fff" />
      <rect x="32" y="36" width="54" height="32" rx="4" fill="#fff1f2" />
      <path d="M38 58c8-10 16-14 24-4 6 8 14 6 20-2" stroke="#e11d48" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <rect x="48" y="78" width="22" height="6" rx="3" fill="#e11d48" />
      <g transform="translate(102 18) rotate(-18)">
        <path d="M18 8c10 14 10 32 0 46-8-12-16-22 0-46Z" fill="#fb7185" />
        <path d="M18 8c8 12 8 28 0 40-6-10-12-18 0-40Z" fill="#e11d48" />
        <rect x="14" y="22" width="8" height="16" rx="2" fill="#fff" opacity="0.35" />
        <path d="M10 50h16l-8 14Z" fill="#fb923c" />
        <path d="M12 50h12l-6 10Z" fill="#fbbf24" />
      </g>
      <circle cx="138" cy="88" r="16" fill="#fff" stroke="#e11d48" strokeWidth="3" />
      <circle cx="138" cy="88" r="8" fill="#ffe4e6" stroke="#fb7185" strokeWidth="2" />
      <circle cx="138" cy="88" r="3" fill="#e11d48" />
    </svg>
  );
}

function OptimizeArt() {
  return (
    <svg viewBox="0 0 180 130" className="h-[108px] w-[148px]" aria-hidden>
      <ellipse cx="90" cy="114" rx="50" ry="7" fill="#5eead4" opacity="0.4" />
      <rect x="30" y="22" width="92" height="62" rx="8" fill="#99f6e4" />
      <rect x="26" y="18" width="92" height="62" rx="8" fill="#fff" />
      <rect x="36" y="30" width="34" height="22" rx="4" fill="#ccfbf1" />
      <rect x="40" y="44" width="8" height="4" rx="1" fill="#2dd4bf" />
      <rect x="50" y="40" width="8" height="8" rx="1" fill="#0d9488" />
      <rect x="60" y="36" width="6" height="12" rx="1" fill="#14b8a6" />
      <rect x="76" y="30" width="32" height="22" rx="4" fill="#f0fdfa" />
      <path d="M82 44c6-8 10-8 16 0 4 6 8 4 12-2" stroke="#0d9488" strokeWidth="2" fill="none" />
      <rect x="36" y="56" width="72" height="14" rx="3" fill="#ccfbf1" />
      <rect x="42" y="61" width="28" height="4" rx="2" fill="#5eead4" />
      <circle cx="128" cy="78" r="20" fill="#fff" />
      <circle cx="128" cy="78" r="14" fill="#ccfbf1" />
      <circle cx="128" cy="78" r="14" fill="none" stroke="#0f766e" strokeWidth="4" />
      <rect x="138" y="94" width="6" height="18" rx="3" fill="#115e59" transform="rotate(40 141 103)" />
      <circle cx="122" cy="72" r="3.5" fill="#fff" opacity="0.75" />
    </svg>
  );
}

function ScaleArt() {
  return (
    <svg viewBox="0 0 180 130" className="h-[108px] w-[148px]" aria-hidden>
      <ellipse cx="90" cy="114" rx="50" ry="7" fill="#fcd34d" opacity="0.45" />
      <rect x="58" y="78" width="14" height="24" rx="3" fill="#fde68a" />
      <rect x="76" y="62" width="14" height="40" rx="3" fill="#fbbf24" />
      <rect x="94" y="42" width="14" height="60" rx="3" fill="#eab308" />
      <path d="M108 40l18-16" stroke="#ca8a04" strokeWidth="4" strokeLinecap="round" />
      <path d="M114 24h16v14" stroke="#ca8a04" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="40" cy="48" r="16" fill="#fef9c3" stroke="#eab308" strokeWidth="3" />
      <path d="M40 32a16 16 0 0 1 0 32M28 48h24" stroke="#ca8a04" strokeWidth="1.6" />
      <path d="M32 40h16M32 56h16" stroke="#ca8a04" strokeWidth="1.2" opacity="0.7" />
      <path d="M132 52c8 0 14 4 14 10s-4 8-10 8h-8c-4 8-12 12-12 4 0-10 6-22 16-22Z" fill="#f59e0b" />
      <rect x="128" y="60" width="8" height="14" rx="2" fill="#fde68a" />
      <path d="M34 88h22l4 12H32Z" fill="none" stroke="#ca8a04" strokeWidth="2.4" strokeLinejoin="round" />
      <circle cx="40" cy="104" r="3" fill="#ca8a04" />
      <circle cx="52" cy="104" r="3" fill="#ca8a04" />
    </svg>
  );
}
