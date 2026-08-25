import { Suspense } from "react";
import { Breadcrumbs } from "@/components/PageHero";
import { CreatorSearch } from "@/components/marketplace/CreatorSearch";
import { SectionEyebrow } from "@/components/ui";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Find local influencers | Ads House Marketplace",
  description:
    "Search Instagram, YouTube and more creators by city, category, followers, engagement, and budget — starting in Rohtak, Haryana.",
  path: "/marketplace/creators",
});

export default function CreatorsPage() {
  return (
    <div className="pb-16">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Marketplace", href: "/marketplace" },
          { name: "Creators", href: "/marketplace/creators" },
        ]}
      />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionEyebrow>Advanced search</SectionEyebrow>
        <h1 className="mb-8 font-display text-4xl font-extrabold text-sky-dark">Local creators</h1>
        <Suspense fallback={<p className="text-muted">Loading search…</p>}>
          <CreatorSearch />
        </Suspense>
      </div>
    </div>
  );
}
