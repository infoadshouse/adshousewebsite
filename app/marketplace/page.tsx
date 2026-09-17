import { Breadcrumbs } from "@/components/PageHero";
import { ButtonLink, SectionEyebrow } from "@/components/ui";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Creator Marketplace | Local influencers in Rohtak",
  description:
    "Find the right influencer for the right business, in the right location. Ads House Marketplace connects creators, businesses, and agencies across India — starting in Rohtak.",
  path: "/marketplace",
  keywords: ["influencer marketplace India", "local influencers Rohtak"],
});

export default function MarketplacePage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Marketplace", href: "/marketplace" },
        ]}
      />
      <section className="relative overflow-hidden bg-white pb-16">
        <div className="hero-blob -left-16 top-10 h-64 w-64 bg-sky/15" />
        <div className="hero-blob right-0 top-24 h-72 w-72 bg-purple/10" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <SectionEyebrow>Creator & local marketing marketplace</SectionEyebrow>
          <h1 className="max-w-4xl font-display text-[1.85rem] font-extrabold tracking-tight text-sky-dark sm:text-4xl md:text-6xl">
            Find the right influencer for the right business, in the right location.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Discover Rohtak and Haryana creators by city, niche, followers, budget, and reach. Post a campaign.
            Apply. Collaborate. Ads House can also run it for you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/marketplace/creators">Find creators</ButtonLink>
            <ButtonLink href="/marketplace/campaigns" variant="ghost">
              Browse campaigns
            </ButtonLink>
            <ButtonLink href="/marketplace/register" variant="ghost">
              Join the marketplace
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-3 md:px-8">
          <RoleCard
            title="Creators"
            body="Build a professional profile, get discovered by local brands, and apply to campaigns around you."
            href="/marketplace/register?role=creator"
            cta="Join as creator"
          />
          <RoleCard
            title="Businesses"
            body="Search food, fitness, fashion and more. Filter by Rohtak, followers, engagement, and budget."
            href="/marketplace/register?role=business"
            cta="Join as business"
          />
          <RoleCard
            title="Agencies"
            body="Manage clients and campaigns in one place. Ads House is the first agency on the platform."
            href="/marketplace/agencies/ads-house"
            cta="See Ads House"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <SectionEyebrow>How it works</SectionEyebrow>
        <h2 className="mb-8 font-display text-3xl font-extrabold text-sky-dark md:text-4xl">
          A two-sided loop, not a directory.
        </h2>
        <ol className="grid gap-4 md:grid-cols-4">
          {[
            "Create a creator, business, or agency profile",
            "Search and filter by location, niche, and budget",
            "Post or apply to campaigns, then chat",
            "Collaborate, complete, and review",
          ].map((step, i) => (
            <li key={step} className="rounded-3xl border border-line bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky">0{i + 1}</p>
              <p className="mt-3 font-medium text-sky-dark">{step}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

function RoleCard({
  title,
  body,
  href,
  cta,
}: {
  title: string;
  body: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-sm">
      <h2 className="font-display text-2xl font-bold text-sky-dark">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>
      <ButtonLink href={href} className="mt-6">
        {cta}
      </ButtonLink>
    </div>
  );
}
