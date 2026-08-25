import Link from "next/link";
import {
  formatFollowers,
  formatInr,
  formatLocation,
  primarySocial,
} from "@/lib/marketplace/constants";
import { avatarFallback } from "@/lib/marketplace/client";

export type CreatorCardData = {
  username: string;
  displayName: string;
  photo?: string;
  bio?: string;
  categories?: string[];
  location?: { locality?: string; city?: string; state?: string };
  socialAccounts?: { platform: string; followers: number; engagementRate: number }[];
  pricing?: { min: number; max: number };
  verified?: boolean;
  match?: number;
};

export function CreatorCard({ creator }: { creator: CreatorCardData }) {
  const social = primarySocial(creator.socialAccounts ?? []);
  return (
    <Link
      href={`/marketplace/creators/${creator.username}`}
      className="group flex flex-col rounded-3xl border border-line bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-sky/40 hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        <Avatar photo={creator.photo} name={creator.displayName} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-semibold text-sky-dark">{creator.displayName}</h3>
            {creator.verified ? (
              <span className="rounded-full bg-sky/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-sky">
                Verified
              </span>
            ) : null}
          </div>
          <p className="mt-0.5 text-sm text-muted">@{creator.username}</p>
          <p className="mt-1 text-sm text-muted">{formatLocation(creator.location) || "India"}</p>
        </div>
        {creator.match != null && creator.match > 0 ? (
          <span className="rounded-full bg-navy px-2.5 py-1 text-xs font-semibold text-white">{creator.match}%</span>
        ) : null}
      </div>
      <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted">{creator.bio || "Creator on Ads House Marketplace."}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {(creator.categories ?? []).slice(0, 3).map((cat) => (
          <span key={cat} className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-sky-dark">
            {cat}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-sm">
        <span className="font-semibold text-sky-dark">
          {social ? `${formatFollowers(social.followers)} · ${social.engagementRate}% ER` : "Socials pending"}
        </span>
        <span className="text-muted">
          {creator.pricing?.min
            ? `${formatInr(creator.pricing.min)} – ${formatInr(creator.pricing.max)}`
            : "Rate on request"}
        </span>
      </div>
    </Link>
  );
}

export function Avatar({ photo, name, size = "md" }: { photo?: string; name: string; size?: "sm" | "md" | "lg" }) {
  const dim = size === "lg" ? "h-20 w-20 text-xl" : size === "sm" ? "h-10 w-10 text-xs" : "h-14 w-14 text-sm";
  if (photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={photo} alt="" className={`${dim} shrink-0 rounded-2xl object-cover`} />
    );
  }
  return (
    <span
      className={`${dim} inline-flex shrink-0 items-center justify-center rounded-2xl bg-sky/10 font-bold text-sky`}
    >
      {avatarFallback(name)}
    </span>
  );
}
