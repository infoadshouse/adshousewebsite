import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, ButtonLink } from "@/components/ui";
import { listTestimonials } from "@/lib/content";

export async function Hero() {
  const testimonials = await listTestimonials();
  return (
    <section className="relative overflow-hidden pt-24 md:pt-40">
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-5 pb-10 md:px-8 md:pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-20">
        <div>
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-sky">
            Studio in Rohtak · Work across India
          </p>
          <p className="mb-4 font-display text-xl font-extrabold tracking-[0.16em] text-sky-dark sm:text-2xl lg:text-3xl">
            Ads House
          </p>
          <h1 className="font-display text-[2.15rem] font-extrabold leading-[1.08] tracking-tight text-sky-dark sm:text-5xl lg:text-[4.25rem]">
            Digital marketing & ads agency in India
          </h1>
          <p className="mt-5 font-display text-2xl font-extrabold leading-tight tracking-tight text-sky-dark sm:text-3xl lg:text-4xl">
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
          </p>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-sky-dark md:text-lg">
            We run SEO, Google Ads, Meta ads, branding, and high-performance websites for Indian
            brands nationwide. The team sits in Rohtak, Haryana — in-person when you want it, metro-grade
            work everywhere else.
          </p>
          <p className="mt-3 max-w-xl text-sm md:text-base">
            <Link href="/locations/rohtak" className="font-semibold text-sky hover:underline">
              Ads agency in Rohtak
            </Link>
            <span className="text-sky-dark"> — our only office.</span>
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <ButtonLink href="/contact" className="w-full sm:w-auto">
              Start a Project
              <ArrowIcon />
            </ButtonLink>
            <ButtonLink href="/work" variant="ghost" className="w-full sm:w-auto">
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
              <p className="text-sm font-bold text-sky-dark md:text-white">50+ Brands Trust Us</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted md:text-white/80">
                <span className="tracking-tight text-orange">★★★★★</span>
                <span className="font-semibold text-sky-dark md:text-white">4.9/5</span>
              </p>
            </div>
          </div>
        </div>

        {/* <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
          <Image
            src="/images/heroimage.png"
            alt="Ads House ads agency in India — brand strategy, SEO, Google Ads, and websites"
            width={1200}
            height={1200}
            priority
            className="h-auto w-full object-contain"
          />
        </div> */}
      </div>

      <video
        className="relative w-full md:pointer-events-none md:absolute md:inset-0 md:h-full md:object-cover"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      >
        <source src="/herovedio.mp4" type="video/mp4" />
      </video>
    </section>
  );
}
