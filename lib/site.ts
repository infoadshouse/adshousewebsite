export const siteConfig = {
  name: "Ads House",
  legalName: "Ads House",
  tagline: "Growth. By Design.",
  description:
    "Ads House is a digital marketing and ads agency in India. SEO, Google Ads, Meta ads, branding, websites, software, and an Influencer Marketplace — from our studio in Rohtak, Haryana.",
  url: "https://www.adshouse.in",
  domain: "adshouse.in",
  locale: "en_IN",
  language: "en-IN",
  email: "info.adshouse@gmail.com",
  phone: "+91 8708892875",
  phoneHref: "tel:+918708892875",
  whatsapp: "https://wa.me/918708892875",
  foundingYear: 2026,
  contentUpdated: "2026-09-17",
  alternateNames: ["Adshouse", "adshouse.in"],
  address: {
    street: "",
    locality: "Rohtak",
    region: "Haryana",
    postalCode: "124001",
    country: "IN",
    countryName: "India",
  },
  geo: {
    latitude: 28.8955,
    longitude: 76.6066,
  },
  hours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const,
    opens: "10:00",
    closes: "19:00",
    timezone: "Asia/Kolkata",
  },
  social: {
    instagram: "https://www.instagram.com/adshouse.in/",
    linkedin: "https://www.linkedin.com/company/ads_house",
    x: "https://x.com/adshouserohtak",
    threads: "https://www.threads.com/@adshouse.in",
    youtube: "https://www.youtube.com/@adshouse",
  },
  twitterHandle: "@adshouserohtak",
  cities: ["Rohtak"],
  keywords: [
    "Ads House",
    "ads agency in India",
    "digital marketing agency in India",
    "performance marketing agency India",
    "SEO agency India",
    "Google Ads agency India",
  ],
} as const;

export const defaultTitle = "Ads House | Ads Agency in India | Digital Marketing";

export function postalAddress() {
  const { street, locality, region, postalCode, country } = siteConfig.address;
  return {
    "@type": "PostalAddress" as const,
    ...(street ? { streetAddress: street } : {}),
    addressLocality: locality,
    addressRegion: region,
    postalCode,
    addressCountry: country,
  };
}

export function officeAddressLines() {
  const { street, locality, region, postalCode, countryName } = siteConfig.address;
  return [
    ...(street ? [street] : []),
    `${locality}, ${region} ${postalCode}`,
    countryName,
  ];
}

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/locations", label: "Office" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;
