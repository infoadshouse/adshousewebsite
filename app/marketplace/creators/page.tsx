import { Suspense } from "react";
import { Breadcrumbs } from "@/components/PageHero";
import { CreatorSearch } from "@/components/marketplace/CreatorSearch";
import { SectionEyebrow } from "@/components/ui";
import { tryConnectDb } from "@/lib/db";
import { DEFAULT_CREATOR_QUERY } from "@/lib/marketplace/constants";
import { searchCreators } from "@/lib/marketplace/search-creators";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  title: "Find local influencers in Rohtak",
  description:
    "Search Instagram, YouTube and more creators by city, category, followers, engagement, and budget — starting in Rohtak, Haryana.",
  path: "/marketplace/creators",
  keywords: ["local influencers Rohtak", "find Instagram creators Haryana"],
});

export default async function CreatorsPage() {
  const connected = await tryConnectDb();
  const initialCreators = connected ? await searchCreators(new URLSearchParams(DEFAULT_CREATOR_QUERY)) : [];

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
          <CreatorSearch initialCreators={initialCreators} initialQuery={DEFAULT_CREATOR_QUERY} />
        </Suspense>
      </div>
    </div>
  );
}
