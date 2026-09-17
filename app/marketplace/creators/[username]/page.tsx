import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/PageHero";
import { Avatar } from "@/components/marketplace/CreatorCard";
import { ButtonLink, SectionEyebrow } from "@/components/ui";
import { tryConnectDb } from "@/lib/db";
import {
  formatFollowers,
  formatInr,
  formatLocation,
  primarySocial,
} from "@/lib/marketplace/constants";
import { profilePageSchema } from "@/lib/schema";
import { createMetadata } from "@/lib/seo";
import { InfluencerProfile } from "@/models/InfluencerProfile";
import { Review } from "@/models/Review";
import { CollaborateButton } from "@/components/marketplace/CollaborateButton";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ username: string }> };

export async function generateMetadata({ params }: Props) {
  const { username } = await params;
  const connected = await tryConnectDb();
  if (!connected) return createMetadata({ title: "Creator not found", description: "This creator profile is unavailable.", path: `/marketplace/creators/${username}`, noIndex: true });
  const creator = await InfluencerProfile.findOne({ username: username.toLowerCase() }).lean();
  if (!creator) return createMetadata({ title: "Creator not found", description: "This creator profile is unavailable.", path: `/marketplace/creators/${username}`, noIndex: true });
  return createMetadata({
    title: `${creator.displayName} | ${formatLocation(creator.location) || "Creator"}`,
    description: creator.bio || `${creator.displayName} on Ads House Marketplace`,
    path: `/marketplace/creators/${creator.username}`,
  });
}

export default async function CreatorProfilePage({ params }: Props) {
  const { username } = await params;
  const connected = await tryConnectDb();
  if (!connected) notFound();
  const creator = await InfluencerProfile.findOne({ username: username.toLowerCase() }).lean();
  if (!creator) notFound();
  const reviews = await Review.find({ toUserId: creator.userId }).sort({ createdAt: -1 }).limit(10).lean();
  const social = primarySocial(creator.socialAccounts ?? []);

  return (
    <div className="pb-16">
      <JsonLd
        data={profilePageSchema({
          name: creator.displayName,
          description: creator.bio || `${creator.displayName} on Ads House Marketplace`,
          path: `/marketplace/creators/${creator.username}`,
          image: creator.photo || undefined,
          location: formatLocation(creator.location) || undefined,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Marketplace", href: "/marketplace" },
          { name: "Creators", href: "/marketplace/creators" },
          { name: creator.displayName, href: `/marketplace/creators/${creator.username}` },
        ]}
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[1.2fr_0.8fr] md:px-8">
        <div>
          <div className="flex items-start gap-5">
            <Avatar photo={creator.photo} name={creator.displayName} size="lg" />
            <div>
              <SectionEyebrow>{(creator.categories ?? [])[0] || "Creator"}</SectionEyebrow>
              <h1 className="font-display text-4xl font-extrabold text-sky-dark">{creator.displayName}</h1>
              <p className="mt-1 text-muted">
                @{creator.username} · {formatLocation(creator.location)}
              </p>
              {creator.verified ? (
                <p className="mt-2 text-sm font-semibold text-sky">Verified creator</p>
              ) : null}
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{creator.bio}</p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <Stat
              label="Followers"
              value={social ? `${formatFollowers(social.followers)} ${social.platform}` : "—"}
            />
            <Stat label="Engagement" value={social ? `${social.engagementRate}%` : "—"} />
            <Stat
              label="Pricing"
              value={
                creator.pricing?.min
                  ? `${formatInr(creator.pricing.min)} – ${formatInr(creator.pricing.max)}`
                  : "On request"
              }
            />
            <Stat label="Travels" value={`Within ${creator.serviceRadiusKm} km`} />
          </dl>
          <div className="mt-8">
            <h2 className="font-semibold text-sky-dark">Audience</h2>
            <p className="mt-2 text-sm text-muted">
              {formatLocation(creator.audienceLocation) || "Not specified"}
              {creator.audienceLocation?.note ? ` — ${creator.audienceLocation.note}` : ""}
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {creator.languages?.map((lang) => (
              <span key={lang} className="rounded-full bg-surface px-3 py-1 text-xs">
                {lang}
              </span>
            ))}
            {creator.contentTypes?.map((type) => (
              <span key={type} className="rounded-full border border-line px-3 py-1 text-xs">
                {type}
              </span>
            ))}
          </div>
          {reviews.length ? (
            <div className="mt-10">
              <h2 className="font-display text-2xl font-bold text-sky-dark">Reviews</h2>
              <ul className="mt-4 space-y-4">
                {reviews.map((review) => (
                  <li key={String(review._id)} className="rounded-2xl border border-line p-4">
                    <p className="text-sm font-semibold text-sky-dark">
                      {"★".repeat(review.rating)}{" "}
                      <span className="font-normal text-muted">from {review.fromRole}</span>
                    </p>
                    <p className="mt-2 text-sm text-muted">{review.comment}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        <aside className="h-fit rounded-3xl border border-line bg-white p-6 shadow-sm">
          <h2 className="font-display text-xl font-bold text-sky-dark">Collaborate</h2>
          <p className="mt-2 text-sm text-muted">
            Message {creator.displayName.split(" ")[0]} about a campaign, or invite them from your dashboard.
          </p>
          <div className="mt-6 space-y-3">
            <CollaborateButton userId={String(creator.userId)} />
            <ButtonLink href="/marketplace/login" variant="ghost" className="w-full">
              Sign in to apply via campaigns
            </ButtonLink>
            <Link href="/marketplace/campaigns" className="block text-center text-sm text-sky">
              See open campaigns
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface p-4">
      <dt className="text-xs uppercase tracking-wide text-muted">{label}</dt>
      <dd className="mt-1 font-semibold text-sky-dark">{value}</dd>
    </div>
  );
}
