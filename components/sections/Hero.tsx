import Image from "next/image";
import { ArrowIcon, ButtonLink } from "@/components/ui";
import { testimonials } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-32 md:pt-40">
      <div className="hero-blob -left-24 top-16 h-72 w-72 bg-pink/25" />
      <div className="hero-blob right-0 top-32 h-80 w-80 bg-sky/20" />
      <div className="hero-blob bottom-0 left-1/3 h-64 w-64 bg-purple/15" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-20">
        <div>
          <p className="mb-5 inline-flex items-center rounded-full bg-sky/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-sky">
            Digital growth agency · India
          </p>
          <h1 className="font-display text-[2.75rem] font-extrabold leading-[1.05] tracking-tight text-sky-dark sm:text-6xl lg:text-[4.25rem]">
            We Build <span className="text-gradient">Brands.</span>
            <br />
            <span className="relative inline-block">
              We Drive <span className="text-gradient">Growth.</span>
              <svg
                className="absolute -bottom-2 left-0 w-full text-sky"
                viewBox="0 0 320 14"
                fill="none"
                aria-hidden
              >
                <defs>
                  <linearGradient id="wave" x1="0" x2="320" y1="0" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#f97316" />
                    <stop offset="0.45" stopColor="#7c3aed" />
                    <stop offset="1" stopColor="#2563eb" />
                  </linearGradient>
                </defs>
                <path
                  d="M2 9 C 40 2, 70 13, 110 8 S 180 2, 220 9 280 14, 318 7"
                  stroke="url(#wave)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Ads House combines branding, advertising, technology, and digital strategy to turn
            ambitious Indian businesses into growth stories. Your brand deserves more than
            impressions. It deserves impact.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/contact">
              Start a Project
              <ArrowIcon />
            </ButtonLink>
            <ButtonLink href="/work" variant="ghost">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-sky/30 text-sky">
                <svg className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
                  <path d="M3.2 1.6v8.8L10.4 6 3.2 1.6Z" />
                </svg>
              </span>
              Explore Our Work
            </ButtonLink>
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <div className="flex -space-x-3">
              {testimonials.map((person) => (
                <span
                  key={person.name}
                  className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-white shadow-sm"
                >
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </span>
              ))}
              <span className="relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-sky text-[10px] font-bold text-white shadow-sm">
                50+
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-sky-dark">50+ Brands Trust Us</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted">
                <span className="tracking-tight text-orange">★★★★★</span>
                <span className="font-semibold text-sky-dark">4.9/5</span>
              </p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
          <Image
            src="/images/heroimage.png"
            alt="Ads House growth system — brand strategy, performance campaigns, and digital products"
            width={1200}
            height={1200}
            priority
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
