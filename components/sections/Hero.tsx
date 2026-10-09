import { MediaCover } from "@/components/MediaCover";
import Link from "next/link";
import { ArrowIcon, ButtonLink } from "@/components/ui";
import { listTestimonials } from "@/lib/content";

export async function Hero() {
  const testimonials = await listTestimonials();
  return (
    <section className="relative isolate overflow-hidden pt-28 md:pt-40">
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover brightness-[0.42] contrast-125 saturate-[0.35] sepia-[0.55]"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      >
        <source src="/herovedio.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#080808]/92 via-[#080808]/80 to-[#080808]/58 md:via-[#080808]/64 md:to-[#080808]/24" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#080808]/50 via-transparent to-[#080808]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_48%_40%_at_88%_36%,rgba(212,175,55,0.24),transparent_62%)]" />
      <div className="hero-blob -left-16 top-24 h-72 w-72 bg-sky/20" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-16 md:px-8 md:pb-24">
        <div className="max-w-3xl">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-sky">
            Studio in Rohtak · Work across India
          </p>
          <p className="mb-4 font-display text-3xl tracking-[0.18em] text-[#e8d5a3] sm:text-4xl lg:text-5xl">
            Ads House
          </p>
          <h1 className="font-display text-[2.6rem] leading-[0.95] text-[var(--text)] sm:text-6xl lg:text-[5.2rem]">
            Digital marketing & ads agency in India
          </h1>
          <p className="mt-5 font-display text-3xl leading-tight text-[var(--text)] sm:text-4xl lg:text-5xl">
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
                    <stop stopColor="#f6e7c1" />
                    <stop offset="0.5" stopColor="#d4af37" />
                    <stop offset="1" stopColor="#8d6b1f" />
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
          </p>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-[var(--text)]/80 md:text-lg">
            We run SEO, Google Ads, Meta ads, branding, and high-performance websites for Indian
            brands nationwide. The team sits in Rohtak, Haryana — in-person when you want it, metro-grade
            work everywhere else.
          </p>
          <p className="mt-3 max-w-xl text-sm md:text-base">
            <Link href="/locations/rohtak" className="font-semibold text-sky hover:underline">
              Ads agency in Rohtak
            </Link>
            <span className="text-[var(--text)]/70"> — our only office.</span>
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <ButtonLink href="/contact" className="w-full sm:w-auto">
              Start a Project
              <ArrowIcon />
            </ButtonLink>
            <ButtonLink href="/work" variant="ghost" className="w-full sm:w-auto">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-sky/40 text-sky">
                <svg className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
                  <path d="M3.2 1.6v8.8L10.4 6 3.2 1.6Z" />
                </svg>
              </span>
              Explore Our Work
            </ButtonLink>
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <div className="flex -space-x-3">
              {testimonials.slice(0, 5).map((person) => (
                <span
                  key={person.name}
                  className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-[#d4af37]/70 shadow-sm"
                >
                  <MediaCover src={person.image} alt={person.name} sizes="44px" />
                </span>
              ))}
              <span className="relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#d4af37]/70 bg-sky text-[10px] font-bold shadow-sm">
                50+
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text)]">50+ Brands Trust Us</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted">
                <span className="tracking-tight text-sky">★★★★★</span>
                <span className="font-semibold text-[var(--text)]">4.9/5</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
