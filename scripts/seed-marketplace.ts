import bcrypt from "bcryptjs";
import { readFileSync } from "fs";
import mongoose from "mongoose";
import { AgencyClient } from "../models/AgencyClient";
import { AgencyProfile } from "../models/AgencyProfile";
import { BusinessProfile } from "../models/BusinessProfile";
import { Campaign } from "../models/Campaign";
import { InfluencerProfile } from "../models/InfluencerProfile";
import { User } from "../models/User";

function loadEnvFile(path: string, override = false) {
  let text = "";
  try {
    text = readFileSync(path, "utf8");
  } catch {
    return;
  }
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq < 1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (override || !process.env[key]) process.env[key] = value;
  }
}

loadEnvFile(".env", true);
loadEnvFile(".env.local", true);

const DEMO_PASSWORD = "Demo@12345";
const ROHTAK = {
  country: "India",
  state: "Haryana",
  district: "Rohtak",
  city: "Rohtak",
};

const localities: Record<string, { locality: string; lng: number; lat: number }> = {
  "model-town": { locality: "Model Town", lng: 76.6066, lat: 28.8955 },
  "sector-1": { locality: "Sector 1", lng: 76.58, lat: 28.89 },
  "sector-2": { locality: "Sector 2", lng: 76.595, lat: 28.885 },
  "civil-lines": { locality: "Civil Lines", lng: 76.585, lat: 28.9 },
};

function loc(key: keyof typeof localities) {
  const spot = localities[key];
  return {
    ...ROHTAK,
    locality: spot.locality,
    geo: { type: "Point" as const, coordinates: [spot.lng, spot.lat] as [number, number] },
  };
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Set MONGODB_URI in .env.local");
  if (!process.env.AUTH_SECRET) {
    console.warn("AUTH_SECRET is not set — add it to .env.local before signing in.");
  }

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 20000 });
  const host = uri.replace(/^mongodb(\+srv)?:\/\//, "").replace(/.*@/, "").split("/")[0].split(",")[0];
  console.log(`Seeding MongoDB at ${host}`);
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);

  await Promise.all([
    User.deleteMany({ email: /@demo\.adshouse\.in$|agency@adshouse\.in$|admin@adshouse\.in$/ }),
    InfluencerProfile.deleteMany({ username: { $in: demoCreators.map((c) => c.username) } }),
    BusinessProfile.deleteMany({ slug: { $in: ["abc-restaurant", "pulse-gym"] } }),
    AgencyProfile.deleteMany({ slug: "ads-house" }),
    AgencyClient.deleteMany({ name: { $in: ["ABC Restaurant", "Pulse Gym Rohtak"] } }),
    Campaign.deleteMany({ title: { $in: ["New Cafe Launch – Rohtak", "Gym Launch Promo – Rohtak"] } }),
  ]);

  const adminUser = await User.create({
    email: "admin@adshouse.in",
    passwordHash,
    name: "Ads House Admin",
    role: "admin",
  });
  void adminUser;

  const agencyUser = await User.create({
    email: "agency@adshouse.in",
    passwordHash,
    name: "Ads House",
    role: "agency",
  });
  const agency = await AgencyProfile.create({
    userId: agencyUser._id,
    name: "Ads House",
    slug: "ads-house",
    about:
      "Ads House is Rohtak’s digital marketing and ads agency. We run influencer campaigns for local businesses that don’t want to manage creators themselves — briefing, shortlisting, collaboration, and reporting.",
    website: "https://www.adshouse.in",
    location: loc("model-town"),
    isPlatformAgency: true,
  });

  const clientAbc = await AgencyClient.create({
    agencyId: agency._id,
    agencyUserId: agencyUser._id,
    name: "ABC Restaurant",
    category: "Restaurant",
    location: loc("model-town"),
    notes: "Family restaurant launching a new cafe counter. Needs food creators in Rohtak.",
  });
  const clientGym = await AgencyClient.create({
    agencyId: agency._id,
    agencyUserId: agencyUser._id,
    name: "Pulse Gym Rohtak",
    category: "Gym",
    location: loc("civil-lines"),
    notes: "New gym membership push. Fitness and lifestyle creators.",
  });

  for (const creator of demoCreators) {
    const user = await User.create({
      email: creator.email,
      passwordHash,
      name: creator.displayName,
      role: "creator",
    });
    await InfluencerProfile.create({
      userId: user._id,
      displayName: creator.displayName,
      username: creator.username,
      bio: creator.bio,
      languages: creator.languages,
      categories: creator.categories,
      audienceLocation: creator.audienceLocation,
      serviceRadiusKm: creator.serviceRadiusKm,
      socialAccounts: creator.socialAccounts,
      pricing: creator.pricing,
      contentTypes: creator.contentTypes,
      availability: creator.availability as "available" | "limited" | "unavailable",
      verified: creator.verified,
      location: loc(creator.localityKey),
    });
  }

  const restaurantUser = await User.create({
    email: "abc@demo.adshouse.in",
    passwordHash,
    name: "ABC Restaurant",
    role: "business",
  });
  await BusinessProfile.create({
    userId: restaurantUser._id,
    name: "ABC Restaurant",
    slug: "abc-restaurant",
    category: "Restaurant",
    about: "Neighbourhood restaurant in Rohtak looking for food creators for a cafe launch.",
    location: loc("model-town"),
  });

  const gymUser = await User.create({
    email: "gym@demo.adshouse.in",
    passwordHash,
    name: "Pulse Gym",
    role: "business",
  });
  await BusinessProfile.create({
    userId: gymUser._id,
    name: "Pulse Gym",
    slug: "pulse-gym",
    category: "Gym",
    about: "Training studio in Civil Lines, Rohtak. Looking for fitness creators.",
    location: loc("civil-lines"),
  });

  await Campaign.create({
    createdByUserId: agencyUser._id,
    agencyId: agency._id,
    agencyClientId: clientAbc._id,
    title: "New Cafe Launch – Rohtak",
    description:
      "Need 10 micro influencers who create food or lifestyle content. Audience should be primarily in Rohtak. Instagram Reels preferred. Show the new cafe menu, interiors, and a tasting visit.",
    location: loc("model-town"),
    categories: ["Food", "Lifestyle"],
    platforms: ["Instagram"],
    followerMin: 5000,
    followerMax: 50000,
    budget: 50000,
    creatorCount: 10,
    durationDays: 15,
    status: "open",
  });

  await Campaign.create({
    createdByUserId: gymUser._id,
    businessId: (await BusinessProfile.findOne({ slug: "pulse-gym" }))!._id,
    title: "Gym Launch Promo – Rohtak",
    description:
      "Pulse Gym is looking for 5 fitness creators with 10K–100K followers. Content: gym tour, workout reel, membership CTA. Audience in Rohtak and nearby Haryana.",
    location: loc("civil-lines"),
    categories: ["Fitness"],
    platforms: ["Instagram", "YouTube"],
    followerMin: 10000,
    followerMax: 100000,
    budget: 25000,
    creatorCount: 5,
    durationDays: 15,
    status: "open",
  });

  void clientGym;

  console.log("Marketplace seed complete.");
  console.log("Admin login:    admin@adshouse.in / Demo@12345");
  console.log("Creator login:  rahul@demo.adshouse.in / Demo@12345");
  console.log("Business login: abc@demo.adshouse.in / Demo@12345");
  console.log("Agency login:   agency@adshouse.in / Demo@12345");
  await mongoose.disconnect();
}

const demoCreators = [
  {
    email: "rahul@demo.adshouse.in",
    displayName: "Rahul Sharma",
    username: "rahulsharma.food",
    localityKey: "model-town" as const,
    bio: "Food creator covering Rohtak cafes, street food, and homestyle thalis.",
    languages: ["Hindi", "English", "Haryanvi"],
    categories: ["Food"],
    audienceLocation: { country: "India", state: "Haryana", city: "Rohtak", note: "Mostly Rohtak + nearby towns" },
    serviceRadiusKm: 40,
    socialAccounts: [
      {
        platform: "Instagram",
        handle: "@rahulsharma.food",
        url: "https://instagram.com/rahulsharma.food",
        followers: 52000,
        avgViews: 18000,
        avgLikes: 2400,
        engagementRate: 6.8,
      },
    ],
    pricing: { min: 5000, max: 12000, currency: "INR" },
    contentTypes: ["Reels", "Stories", "Posts"],
    availability: "available",
    verified: true,
  },
  {
    email: "priya@demo.adshouse.in",
    displayName: "Priya Malik",
    username: "priyamalik.style",
    localityKey: "sector-1" as const,
    bio: "Fashion and lifestyle from Haryana — boutique hauls, festive looks, local brands.",
    languages: ["Hindi", "English"],
    categories: ["Fashion", "Lifestyle"],
    audienceLocation: { country: "India", state: "Haryana", city: "Rohtak", note: "Women 18–34 in Haryana" },
    serviceRadiusKm: 50,
    socialAccounts: [
      {
        platform: "Instagram",
        handle: "@priyamalik.style",
        url: "https://instagram.com/priyamalik.style",
        followers: 38000,
        avgViews: 12000,
        avgLikes: 1900,
        engagementRate: 5.4,
      },
    ],
    pricing: { min: 4000, max: 9000, currency: "INR" },
    contentTypes: ["Reels", "Stories"],
    availability: "available",
    verified: false,
  },
  {
    email: "amit@demo.adshouse.in",
    displayName: "Amit Hooda",
    username: "amithooda.fit",
    localityKey: "civil-lines" as const,
    bio: "Fitness coach and gym content. Transformations, form checks, and local gym tours.",
    languages: ["Hindi", "Haryanvi"],
    categories: ["Fitness"],
    audienceLocation: { country: "India", state: "Haryana", city: "Rohtak", note: "Men 18–35 Rohtak" },
    serviceRadiusKm: 30,
    socialAccounts: [
      {
        platform: "Instagram",
        handle: "@amithooda.fit",
        url: "https://instagram.com/amithooda.fit",
        followers: 41000,
        avgViews: 15000,
        avgLikes: 2100,
        engagementRate: 7.1,
      },
      {
        platform: "YouTube",
        handle: "Amit Hooda Fit",
        url: "https://youtube.com/@amithoodafit",
        followers: 12000,
        avgViews: 8000,
        avgLikes: 420,
        engagementRate: 4.2,
      },
    ],
    pricing: { min: 6000, max: 14000, currency: "INR" },
    contentTypes: ["Reels", "YouTube videos"],
    availability: "available",
    verified: true,
  },
  {
    email: "neha@demo.adshouse.in",
    displayName: "Neha Goyal",
    username: "nehagoyal.life",
    localityKey: "sector-2" as const,
    bio: "Lifestyle vlogs, cafes, and day-in-the-life around Rohtak.",
    languages: ["Hindi", "English"],
    categories: ["Lifestyle", "Food"],
    audienceLocation: { country: "India", state: "Delhi", city: "Delhi", note: "70% audience in Delhi NCR" },
    serviceRadiusKm: 100,
    socialAccounts: [
      {
        platform: "Instagram",
        handle: "@nehagoyal.life",
        url: "https://instagram.com/nehagoyal.life",
        followers: 28000,
        avgViews: 9000,
        avgLikes: 1100,
        engagementRate: 4.9,
      },
    ],
    pricing: { min: 3000, max: 7000, currency: "INR" },
    contentTypes: ["Reels", "Stories", "Posts"],
    availability: "limited",
    verified: false,
  },
  {
    email: "karan@demo.adshouse.in",
    displayName: "Karan Singh",
    username: "karansingh.comedy",
    localityKey: "model-town" as const,
    bio: "Haryanvi comedy sketches and local brand bits.",
    languages: ["Hindi", "Haryanvi"],
    categories: ["Comedy", "Lifestyle"],
    audienceLocation: { country: "India", state: "Haryana", city: "Rohtak", note: "Haryana-wide" },
    serviceRadiusKm: 80,
    socialAccounts: [
      {
        platform: "Instagram",
        handle: "@karansingh.comedy",
        url: "https://instagram.com/karansingh.comedy",
        followers: 75000,
        avgViews: 32000,
        avgLikes: 4800,
        engagementRate: 5.8,
      },
    ],
    pricing: { min: 8000, max: 18000, currency: "INR" },
    contentTypes: ["Reels", "Shorts"],
    availability: "available",
    verified: true,
  },
  {
    email: "simran@demo.adshouse.in",
    displayName: "Simran Kaur",
    username: "simrankaur.beauty",
    localityKey: "model-town" as const,
    bio: "Makeup, skincare, and salon recs for Rohtak.",
    languages: ["Hindi", "Punjabi", "English"],
    categories: ["Beauty"],
    audienceLocation: { country: "India", state: "Haryana", city: "Rohtak", note: "Women 16–30" },
    serviceRadiusKm: 25,
    socialAccounts: [
      {
        platform: "Instagram",
        handle: "@simrankaur.beauty",
        url: "https://instagram.com/simrankaur.beauty",
        followers: 33000,
        avgViews: 11000,
        avgLikes: 1700,
        engagementRate: 6.1,
      },
    ],
    pricing: { min: 3500, max: 8000, currency: "INR" },
    contentTypes: ["Reels", "Stories"],
    availability: "available",
    verified: false,
  },
  {
    email: "vikram@demo.adshouse.in",
    displayName: "Vikram Dahiya",
    username: "vikramdahiya.travel",
    localityKey: "sector-1" as const,
    bio: "Weekend trips from Rohtak — Haryana, Himachal, and Rajasthan roads.",
    languages: ["Hindi", "English"],
    categories: ["Travel"],
    audienceLocation: { country: "India", state: "Haryana", city: "Rohtak", note: "Travel-curious 20–40" },
    serviceRadiusKm: 120,
    socialAccounts: [
      {
        platform: "Instagram",
        handle: "@vikramdahiya.travel",
        url: "https://instagram.com/vikramdahiya.travel",
        followers: 19000,
        avgViews: 7000,
        avgLikes: 680,
        engagementRate: 4.3,
      },
      {
        platform: "YouTube",
        handle: "Vikram Travels",
        url: "https://youtube.com/@vikramtravels",
        followers: 8600,
        avgViews: 4200,
        avgLikes: 210,
        engagementRate: 3.1,
      },
    ],
    pricing: { min: 2500, max: 6000, currency: "INR" },
    contentTypes: ["Reels", "YouTube videos"],
    availability: "available",
    verified: false,
  },
  {
    email: "anjali@demo.adshouse.in",
    displayName: "Anjali Verma",
    username: "anjaliverma.edu",
    localityKey: "sector-2" as const,
    bio: "Education and career tips for Haryana students. Exam prep and college life.",
    languages: ["Hindi", "English"],
    categories: ["Education"],
    audienceLocation: { country: "India", state: "Haryana", city: "Rohtak", note: "Students 16–24" },
    serviceRadiusKm: 40,
    socialAccounts: [
      {
        platform: "Instagram",
        handle: "@anjaliverma.edu",
        url: "https://instagram.com/anjaliverma.edu",
        followers: 22000,
        avgViews: 6500,
        avgLikes: 900,
        engagementRate: 5.2,
      },
      {
        platform: "YouTube",
        handle: "Anjali Studies",
        url: "https://youtube.com/@anjalistudies",
        followers: 15000,
        avgViews: 5000,
        avgLikes: 310,
        engagementRate: 3.8,
      },
    ],
    pricing: { min: 2000, max: 5500, currency: "INR" },
    contentTypes: ["Reels", "YouTube videos"],
    availability: "available",
    verified: false,
  },
];

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
