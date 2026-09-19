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
    "SEO agency in India",
    "Google Ads agency in India",
    "Meta Ads agency in India",
    "ads agency in Rohtak",
    "digital marketing agency in Rohtak",
    "SEO agency in Rohtak",
    "Google Ads agency in Rohtak",
  ],
} as const;

export const defaultTitle = "Ads House | Ads Agency in India | Digital Marketing";

/**
 * Absolute URL for canonicals, schema, and the XML sitemap.
 * Homepage uses a trailing slash so it matches Google Search Console
 * (property + URL Inspection are https://www.adshouse.in/) and browser-resolved `/` links.
 */
export function canonicalUrl(path = "/"): string {
  const origin = siteConfig.url.replace(/\/$/, "");
  if (!path || path === "/") return `${origin}/`;
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

export function absoluteMediaUrl(path: string) {
  if (!path) return `${siteConfig.url}/images/hero-visual.png`;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return canonicalUrl(path);
}

export function googleMapsSearchUrl() {
  return `https://www.google.com/maps/search/?api=1&query=${siteConfig.geo.latitude},${siteConfig.geo.longitude}`;
}

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
