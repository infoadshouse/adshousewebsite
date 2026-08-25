export const DEMO_PASSWORD = "Demo@12345";

export const DEMO_ACCOUNTS = [
  {
    role: "admin" as const,
    label: "Admin",
    email: "admin@adshouse.in",
    name: "Ads House Admin",
    description: "Platform overview, users, and all campaigns",
  },
  {
    role: "creator" as const,
    label: "Creator",
    email: "rahul@demo.adshouse.in",
    name: "Rahul Sharma",
    description: "Food creator in Rohtak — apply to campaigns",
  },
  {
    role: "business" as const,
    label: "Business",
    email: "abc@demo.adshouse.in",
    name: "ABC Restaurant",
    description: "Local restaurant — post campaigns and shortlist",
  },
] as const;
