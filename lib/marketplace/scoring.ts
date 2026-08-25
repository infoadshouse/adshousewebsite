type ScoredCreator = {
  categories?: string[];
  location?: { city?: string; district?: string; state?: string; country?: string };
  audienceLocation?: { city?: string; state?: string };
  socialAccounts?: { followers: number; engagementRate: number; platform: string }[];
  pricing?: { min: number; max: number } | null;
};

type SearchPrefs = {
  city?: string;
  district?: string;
  state?: string;
  category?: string;
  platform?: string;
  followersMin?: number;
  followersMax?: number;
  priceMin?: number;
  priceMax?: number;
};

function overlapRange(aMin: number, aMax: number, bMin: number, bMax: number) {
  return aMin <= bMax && bMin <= aMax;
}

export function matchScore(creator: ScoredCreator, prefs: SearchPrefs) {
  let score = 0;

  const city = creator.location?.city?.toLowerCase();
  const district = creator.location?.district?.toLowerCase();
  const state = creator.location?.state?.toLowerCase();
  const prefCity = prefs.city?.toLowerCase();
  const prefDistrict = prefs.district?.toLowerCase();
  const prefState = prefs.state?.toLowerCase();
  const audienceCity = creator.audienceLocation?.city?.toLowerCase();

  if (prefCity && (city === prefCity || audienceCity === prefCity)) score += 30;
  else if (prefDistrict && district === prefDistrict) score += 20;
  else if (prefState && state === prefState) score += 10;

  if (prefs.category && creator.categories?.includes(prefs.category)) score += 25;

  const primary = [...(creator.socialAccounts ?? [])].sort((a, b) => b.followers - a.followers)[0];
  if (primary) {
    if (prefs.platform && primary.platform === prefs.platform) score += 8;
    const followersOk =
      prefs.followersMin == null ||
      prefs.followersMax == null ||
      (primary.followers >= prefs.followersMin && primary.followers <= prefs.followersMax);
    if (followersOk && (prefs.followersMin != null || prefs.followersMax != null)) score += 15;
    const engagement = Math.min(primary.engagementRate ?? 0, 10);
    score += Math.round((engagement / 10) * 15);
  }

  const overlap =
    creator.pricing &&
    prefs.priceMin != null &&
    prefs.priceMax != null &&
    overlapRange(creator.pricing.min, creator.pricing.max, prefs.priceMin, prefs.priceMax);
  if (overlap) {
    score += 15;
  }

  return Math.min(100, score);
}
