export const USER_ROLES = ["creator", "business", "agency", "admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const CREATOR_CATEGORIES = [
  "Food",
  "Fashion",
  "Fitness",
  "Gaming",
  "Technology",
  "Finance",
  "Travel",
  "Education",
  "Beauty",
  "Automobile",
  "Real Estate",
  "Business",
  "Comedy",
  "Lifestyle",
  "Parenting",
  "Sports",
  "Music",
] as const;

export const BUSINESS_CATEGORIES = [
  "Restaurant",
  "Cafe",
  "Gym",
  "Retail",
  "Fashion",
  "Beauty",
  "Education",
  "Healthcare",
  "Real Estate",
  "Automobile",
  "Hospitality",
  "Technology",
  "Finance",
  "Other",
] as const;

export const SOCIAL_PLATFORMS = [
  "Instagram",
  "YouTube",
  "Facebook",
  "LinkedIn",
  "X",
  "Snapchat",
] as const;

export const CONTENT_TYPES = ["Reels", "Stories", "Posts", "YouTube videos", "Shorts", "Live"] as const;

export const LANGUAGES = ["Hindi", "English", "Haryanvi", "Punjabi"] as const;

export const AVAILABILITY = ["available", "limited", "unavailable"] as const;

export const CAMPAIGN_STATUSES = ["draft", "open", "closed", "completed"] as const;
export type CampaignStatus = (typeof CAMPAIGN_STATUSES)[number];

export const APPLICATION_STATUSES = [
  "applied",
  "shortlisted",
  "rejected",
  "withdrawn",
  "accepted",
] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const COLLABORATION_STATUSES = ["active", "completed", "cancelled"] as const;
export type CollaborationStatus = (typeof COLLABORATION_STATUSES)[number];

export const FOLLOWER_RANGES = [
  { label: "1K – 10K", min: 1000, max: 10000 },
  { label: "10K – 100K", min: 10000, max: 100000 },
  { label: "100K – 500K", min: 100000, max: 500000 },
  { label: "500K+", min: 500000, max: 10_000_000 },
] as const;

export const PRICE_RANGES = [
  { label: "₹1,000 – ₹5,000", min: 1000, max: 5000 },
  { label: "₹5,000 – ₹20,000", min: 5000, max: 20000 },
  { label: "₹20,000 – ₹1L+", min: 20000, max: 1_000_000 },
] as const;

export const ROHTAK_GEO = { lat: 28.8955, lng: 76.6066 };

export function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 40) || "user"
  );
}

export function formatInr(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatFollowers(value: number) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(value);
}

export function primarySocial<T extends { platform: string; followers: number }>(accounts: T[]) {
  if (!accounts.length) return null;
  return [...accounts].sort((a, b) => b.followers - a.followers)[0];
}

export function formatLocation(location?: {
  locality?: string;
  city?: string;
  state?: string;
  country?: string;
} | null) {
  if (!location) return "";
  return [location.locality, location.city, location.state].filter(Boolean).join(", ");
}
