import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { teamPrinciples } from "@/lib/data";
import { breadcrumbSchema } from "@/lib/schema";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  title: "About Ads House | Advertising & Growth Agency in Rohtak, Haryana",
  description:
    "Ads House is a Rohtak-based digital growth agency. We believe attention is rented and preference is owned. Meet the team behind brands, campaigns, and technology that scale Indian businesses.",
  path: "/about",
  image: "/images/about-team.png",
  keywords: [
    "advertising agency Rohtak",
    "about Ads House",
    "digital marketing company India",
    "growth agency Haryana",
  ],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageHero
        eyebrow="About"
        title="We exist to make ambitious Indian brands impossible to ignore — and easy to buy from."
        description="Ads House is a growth agency based in Rohtak, Haryana, working with founders and marketing leaders across India. We combine brand craft with commercial discipline."
        image="/images/about-team.png"
        imageAlt="Ads House team collaborating in the studio"
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 md:grid-cols-2 md:px-8">
        <div>
          <h2 className="font-display text-3xl font-bold text-sky-dark md:text-4xl">Who we are</h2>
          <p className="mt-4 leading-relaxed text-muted">
            We are strategists, designers, media operators, engineers, and filmmakers who refuse to
            treat those jobs as separate companies. Founded in {siteConfig.foundingYear}, Ads House
            grew from campaign work into a full growth stack because clients kept asking us to fix
            the website, the funnel, and the product after the ads started working.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            Today we serve brands in {siteConfig.cities.slice(0, 6).join(", ")}, and nationwide
            campaigns that need to feel local and look premium.
          </p>
        </div>
        <div>
          <h2 className="font-display text-3xl font-bold text-sky-dark md:text-4xl">What we believe</h2>
          <p className="mt-4 leading-relaxed text-muted">
            Attention is rented. Preference is owned. Technology is how you scale both. We do not
            write “innovative solutions tailored to your unique needs.” We write briefs that a CFO
            can measure and a customer can feel.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            Why we exist: too many Indian brands are over-advertised and under-positioned. We are
            here to correct that — with work that looks expensive and performs like it.
          </p>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-3 md:px-8">
          {teamPrinciples.map((item) => (
            <article key={item.title} className="rounded-3xl border border-line bg-card p-8 shadow-sm">
              <h3 className="font-display text-2xl font-bold text-sky-dark">{item.title}</h3>
              <p className="mt-3 text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:px-8">
        <div className="img-zoom relative h-[360px] overflow-hidden rounded-[2rem] border border-line shadow-sm">
          <Image
            src="/images/cta-studio.png"
            alt="Night view of the Ads House studio LED wall"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div>
          <h2 className="font-display text-3xl font-bold text-sky-dark md:text-4xl">How we approach growth</h2>
          <p className="mt-4 leading-relaxed text-muted">
            Diagnose the bottleneck. Build the system. Launch with tracking. Optimise without ego.
            Scale only what the unit economics can carry. That methodology is why retainers last —
            and why we can show ₹ crores of influenced revenue instead of a wall of awards nobody
            asked for.
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
