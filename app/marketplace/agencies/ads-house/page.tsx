import { Breadcrumbs } from "@/components/PageHero";
import { ButtonLink, SectionEyebrow } from "@/components/ui";
import { tryConnectDb } from "@/lib/db";
import { formatLocation } from "@/lib/marketplace/constants";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { AgencyProfile } from "@/models/AgencyProfile";

export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  title: "Run influencer campaigns on Ads House Marketplace",
  description:
    "Ads House manages influencer campaigns for businesses that don't want to brief, shortlist, and coordinate creators themselves.",
  path: "/marketplace/agencies/ads-house",
});

export default async function AdsHouseAgencyPage() {
  const connected = await tryConnectDb();
  const agency = connected ? await AgencyProfile.findOne({ slug: "ads-house" }).lean() : null;

  return (
    <div className="pb-16">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Marketplace", href: "/marketplace" },
          { name: "Ads House", href: "/marketplace/agencies/ads-house" },
        ]}
      />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionEyebrow>Platform agency</SectionEyebrow>
        <h1 className="font-display text-4xl font-extrabold text-sky-dark md:text-5xl">
          {agency?.name ?? "Ads House"}
        </h1>
        <p className="mt-2 text-muted">
          {formatLocation(agency?.location) || `${siteConfig.address.locality}, ${siteConfig.address.region}`}
        </p>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">
          {agency?.about ||
            "Let Ads House run your influencer campaign: briefing, creator shortlists, collaboration, and reporting — while you stay focused on the business."}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/contact">Hire Ads House</ButtonLink>
          <ButtonLink href="/marketplace/campaigns" variant="ghost">
            See campaigns we manage
          </ButtonLink>
          <ButtonLink href="/marketplace/register?role=agency" variant="ghost">
            Join as an agency
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
