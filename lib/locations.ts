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
  localOffers: { id: string; title: string; body: string; href: string }[];
  faqs: { q: string; a: string }[];
};

export const locationHubFaqs = [
  {
    q: "Can I visit the Rohtak studio?",
    a: "Yes. The office is in Rohtak, Haryana. Book a kickoff or workshop through the contact form so someone is on site to meet you.",
  },
  {
    q: "What happens in an in-person briefing?",
    a: "We walk through the offer, the funnel, tracking, and the number you need to move. You leave with a diagnosis — not a generic package.",
  },
  {
    q: "Do I need to be in Haryana to hire you?",
    a: "No. Rohtak is our only office and where the team sits. Campaigns, SEO, and websites are run from here for brands across India.",
  },
];

export const locations: LocationPage[] = [
  {
    slug: "rohtak",
    name: "Rohtak",
    state: "Haryana",
    region: "Rohtak, Haryana",
    isHq: true,
    seoTitle: "Ads Agency in Rohtak | SEO, Google Ads, Digital Marketing",
    seoDescription:
      "Ads House is a digital marketing and ads agency in Rohtak, Haryana: SEO, Google Ads, Meta ads, branding, and websites. Our only office — local firms and pan-India brands.",
    h1: "Ads agency in Rohtak — our only office",
    intro:
      "Ads House is headquartered in Rohtak. If you want to sit with the team that will run SEO, Google Ads, Meta ads, brand, and the website, this is the studio. Work ships from here for companies in Rohtak, across Haryana, and the rest of India.",
    market:
      "Rohtak businesses compete in two markets at once. Local search still decides who gets the clinic appointment, the coaching enquiry, the real-estate walk-in, and the wedding-season order. National search and paid social decide who scales beyond the ring road. Most vendors here sell posts and packages. We sell pipeline: ranked pages, tracked ads, and a site that converts the click.",
    approach:
      "From Rohtak we can sit with founders in person, audit the actual operation, and still buy media and ship Next.js sites at metro quality. Campaigns are measured in leads, CAC, and ROAS — not likes. Nearby cities we regularly support include Hisar, Sonipat, Panipat, Jhajjar, Bahadurgarh, and Bhiwani.",
    industries: [
      "Education & coaching",
      "Healthcare & clinics",
      "Real estate",
      "Retail & D2C",
      "Automobile & dealerships",
      "Manufacturing & B2B",
    ],
    nearby: ["Hisar", "Sonipat", "Panipat", "Jhajjar", "Bahadurgarh", "Bhiwani"],
    localOffers: [
      {
        id: "digital-marketing",
        title: "Digital marketing agency in Rohtak",
        href: "/services",
        body: "Brand, SEO, ads, and the website as one programme for Rohtak operators — coaching, clinics, real estate, retail, and manufacturers who need pipeline, not a posting package.",
      },
      {
        id: "seo",
        title: "SEO agency in Rohtak",
        href: "/services/seo",
        body: "Local pack and Google.in pages for Rohtak queries, plus national SEO from the same studio. Technical SEO, content, and a Google Business Profile that matches this NAP.",
      },
      {
        id: "google-ads",
        title: "Google Ads agency in Rohtak",
        href: "/services/performance-marketing",
        body: "Search and Performance Max for high-intent Haryana and India queries, with tracking a founder can read. Brief in person here; the account is run to CAC and leads.",
      },
      {
        id: "meta-ads",
        title: "Meta Ads agency in Rohtak",
        href: "/services/performance-marketing",
        body: "Instagram, Facebook, and Reels acquisition from this office — creative tests, not 30 posts. The same performance team that runs Google Ads.",
      },
    ],
    faqs: [
      {
        q: "Where is the Ads House office?",
        a: "Rohtak, Haryana, PIN 124001. It is our only office. Phone and email are on the contact page; share a brief before you drop in so the right person is available.",
      },
      {
        q: "What are studio hours?",
        a: "Monday to Saturday, 10:00–19:00 IST. Kickoffs can be in person here or remote.",
      },
      {
        q: "Which nearby cities do you serve from Rohtak?",
        a: "Hisar, Sonipat, Panipat, Jhajjar, Bahadurgarh, and Bhiwani are regular service areas. The same team also runs national campaigns from this studio.",
      },
      {
        q: "Are you an SEO and Google Ads agency in Rohtak?",
        a: "Yes. SEO, Google Ads, and Meta ads are run from this studio for Rohtak businesses and for brands across India. Local work can be briefed in person; national work is the same team.",
      },
      {
        q: "Can we brief in person?",
        a: "Yes. Book through the contact form. In-person briefs work well for local operators who want the team to see the business, not just the ads account.",
      },
    ],
  },
];

export function getLocation(slug: string) {
  return locations.find((item) => item.slug === slug);
}
