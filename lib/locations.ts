export type LocationPage = {
  slug: string;
  name: string;
  state: string;
  region: string;
  isHq: boolean;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string;
  market: string;
  approach: string;
  industries: string[];
  nearby: string[];
  faqs: { q: string; a: string }[];
};

export const locations: LocationPage[] = [
  {
    slug: "rohtak",
    name: "Rohtak",
    state: "Haryana",
    region: "Rohtak, Haryana",
    isHq: true,
    seoTitle: "Ads House | Ads Agency in Rohtak, Haryana",
    seoDescription:
      "Ads House is an ads agency and digital marketing agency in Rohtak, Haryana. Hire Ads House (adshouse.in) for SEO, Google Ads, Meta ads, branding, and websites.",
    h1: "Ads House — Ads Agency in Rohtak",
    intro:
      "Ads House is headquartered in Rohtak — our only office. If you searched ads agency in Rohtak, Ads House agency, or digital marketing Ads House, you get a full growth team: SEO, Google Ads, Meta ads, brand building, and website development from this studio for companies across Rohtak, Haryana, and the rest of India.",
    market:
      "Rohtak businesses compete in two markets at once. Local search still decides who gets the clinic appointment, the coaching enquiry, the real-estate walk-in, and the wedding-season order. National search and paid social decide who scales beyond the ring road. Most agencies here sell posts and packages. We sell pipeline: ranked pages, tracked ads, and a site that converts the click.",
    approach:
      "From Rohtak we can sit with founders in person, audit the actual operation, and still buy media and ship Next.js sites at metro quality. That combination is rare in Haryana. Campaigns are measured in leads, CAC, and ROAS — not likes. Nearby cities we regularly support include Hisar, Sonipat, Panipat, Jhajjar, Bahadurgarh, and Bhiwani.",
    industries: [
      "Education & coaching",
      "Healthcare & clinics",
      "Real estate",
      "Retail & D2C",
      "Automobile & dealerships",
      "Manufacturing & B2B",
    ],
    nearby: ["Hisar", "Sonipat", "Panipat", "Jhajjar", "Bahadurgarh", "Bhiwani"],
    faqs: [
      {
        q: "Is Ads House an ads agency in Rohtak?",
        a: "Yes. Ads House (adshouse.in) is an ads agency in Rohtak, Haryana — our only office — offering Google Ads, Meta ads, SEO, branding, web development, and custom software.",
      },
      {
        q: "Is Ads House the same as Adshouse or ads house agency?",
        a: "Yes. Ads House, Adshouse, ads house, Ads House agency, and adshouse.in are the same digital marketing agency in Rohtak.",
      },
      {
        q: "Do you only work with Rohtak companies?",
        a: "No. Rohtak is our only office and home base. We run campaigns and websites for brands across India from this studio.",
      },
      {
        q: "What digital marketing services are available in Rohtak?",
        a: "SEO, Google Ads and Meta ads, brand identity, marketing strategy, high-performance websites, creative content, and custom software — scoped as one growth system.",
      },
    ],
  },
];

export function getLocation(slug: string) {
  return locations.find((item) => item.slug === slug);
}
