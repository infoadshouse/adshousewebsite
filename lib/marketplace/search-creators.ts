import { asNumber } from "@/lib/marketplace/api";
import { matchScore } from "@/lib/marketplace/scoring";
import { InfluencerProfile } from "@/models/InfluencerProfile";

export type CreatorSearchResult = {
  id: string;
  username: string;
  displayName: string;
  photo?: string;
  bio?: string;
  categories?: string[];
  languages?: string[];
  location?: { locality?: string; city?: string; state?: string };
  audienceLocation?: { city?: string; state?: string; note?: string };
  serviceRadiusKm?: number;
  socialAccounts?: { platform: string; followers: number; engagementRate: number }[];
  pricing?: { min: number; max: number };
  contentTypes?: string[];
  availability?: string;
  verified?: boolean;
  portfolio?: { title?: string; url?: string }[];
  match: number;
};

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function serializeCreator(creator: Record<string, unknown> & { _id: unknown; userId: unknown }) {
  return {
    id: String(creator._id),
    username: creator.username as string,
    displayName: creator.displayName as string,
    photo: creator.photo as string | undefined,
    bio: creator.bio as string | undefined,
    categories: creator.categories as string[] | undefined,
    languages: creator.languages as string[] | undefined,
    location: creator.location as CreatorSearchResult["location"],
    audienceLocation: creator.audienceLocation as CreatorSearchResult["audienceLocation"],
    serviceRadiusKm: creator.serviceRadiusKm as number | undefined,
    socialAccounts: creator.socialAccounts as CreatorSearchResult["socialAccounts"],
    pricing: creator.pricing as CreatorSearchResult["pricing"],
    contentTypes: creator.contentTypes as string[] | undefined,
    availability: creator.availability as string | undefined,
    verified: creator.verified as boolean | undefined,
    portfolio: creator.portfolio as CreatorSearchResult["portfolio"],
  };
}

export async function searchCreators(searchParams: URLSearchParams): Promise<CreatorSearchResult[]> {
  const city = searchParams.get("city")?.trim() || "";
  const state = searchParams.get("state")?.trim() || "";
  const district = searchParams.get("district")?.trim() || "";
  const locality = searchParams.get("locality")?.trim() || "";
  const category = searchParams.get("category")?.trim() || "";
  const platform = searchParams.get("platform")?.trim() || "";
  const q = searchParams.get("q")?.trim() || "";
  const audienceCity = searchParams.get("audienceCity")?.trim() || "";
  const followersMin = searchParams.get("followersMin") ? asNumber(searchParams.get("followersMin")) : undefined;
  const followersMax = searchParams.get("followersMax") ? asNumber(searchParams.get("followersMax")) : undefined;
  const engagementMin = searchParams.get("engagementMin") ? asNumber(searchParams.get("engagementMin")) : undefined;
  const priceMin = searchParams.get("priceMin") ? asNumber(searchParams.get("priceMin")) : undefined;
  const priceMax = searchParams.get("priceMax") ? asNumber(searchParams.get("priceMax")) : undefined;
  const lat = searchParams.get("lat") ? asNumber(searchParams.get("lat"), Number.NaN) : Number.NaN;
  const lng = searchParams.get("lng") ? asNumber(searchParams.get("lng"), Number.NaN) : Number.NaN;
  const radiusKm = searchParams.get("radiusKm") ? asNumber(searchParams.get("radiusKm")) : 0;

  const filter: Record<string, unknown> = {};

  if (Number.isFinite(lat) && Number.isFinite(lng) && radiusKm > 0) {
    filter["location.geo"] = {
      $near: {
        $geometry: { type: "Point", coordinates: [lng, lat] },
        $maxDistance: radiusKm * 1000,
      },
    };
  } else {
    if (city) filter["location.city"] = new RegExp(`^${escapeRegex(city)}$`, "i");
    if (state) filter["location.state"] = new RegExp(`^${escapeRegex(state)}$`, "i");
    if (district) filter["location.district"] = new RegExp(`^${escapeRegex(district)}$`, "i");
    if (locality) filter["location.locality"] = new RegExp(`^${escapeRegex(locality)}$`, "i");
  }

  if (category) filter.categories = category;
  if (audienceCity) filter["audienceLocation.city"] = new RegExp(escapeRegex(audienceCity), "i");
  if (q) {
    filter.$or = [
      { displayName: new RegExp(escapeRegex(q), "i") },
      { username: new RegExp(escapeRegex(q), "i") },
      { bio: new RegExp(escapeRegex(q), "i") },
    ];
  }
  if (platform) filter["socialAccounts.platform"] = platform;
  if (followersMin != null || followersMax != null) {
    filter["socialAccounts.followers"] = {
      ...(followersMin != null ? { $gte: followersMin } : {}),
      ...(followersMax != null ? { $lte: followersMax } : {}),
    };
  }
  if (engagementMin != null) filter["socialAccounts.engagementRate"] = { $gte: engagementMin };
  if (priceMin != null || priceMax != null) {
    if (priceMax != null) filter["pricing.min"] = { $lte: priceMax };
    if (priceMin != null) filter["pricing.max"] = { $gte: priceMin };
  }

  const creators = await InfluencerProfile.find(filter).limit(60).lean();
  return creators
    .map((creator) => ({
      ...serializeCreator(creator as unknown as Record<string, unknown> & { _id: unknown; userId: unknown }),
      match: matchScore(creator, {
        city,
        district,
        state,
        category,
        platform,
        followersMin,
        followersMax,
        priceMin,
        priceMax,
      }),
    }))
    .sort((a, b) => b.match - a.match);
}
