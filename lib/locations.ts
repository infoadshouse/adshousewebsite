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
    seoTitle: "Digital Marketing Agency in Rohtak, Haryana",
    seoDescription:
      "Ads House is a digital marketing agency in Rohtak, Haryana. SEO, Google Ads, Meta ads, branding, and websites for local businesses and pan-India brands.",
    h1: "Digital Marketing Agency in Rohtak",
    intro:
      "Ads House is headquartered in Rohtak. If you are searching for a digital marketing agency in Rohtak, Haryana, you get a full growth team — not a freelancer who disappears after a logo, and not a Delhi retainer that treats Haryana as a satellite. We run SEO, Google Ads, Meta ads, brand building, and website development from this studio for companies across Rohtak, the NCR belt, and the rest of India.",
    market:
      "Rohtak businesses compete in two markets at once. Local search still decides who gets the clinic appointment, the coaching enquiry, the real-estate walk-in, and the wedding-season order. National search and paid social decide who scales beyond the ring road. Most agencies here sell posts and packages. We sell pipeline: ranked pages, tracked ads, and a site that converts the click.",
    approach:
      "From Rohtak we can sit with founders in person, audit the actual operation, and still buy media and ship Next.js sites at metro quality. That combination is rare in Haryana. Campaigns are measured in leads, CAC, and ROAS — not likes. Nearby cities we regularly support include Hisar, Sonipat, Panipat, Jhajjar, Bahadurgarh, Bhiwani, and Gurugram.",
    industries: [
      "Education & coaching",
      "Healthcare & clinics",
      "Real estate",
      "Retail & D2C",
      "Automobile & dealerships",
      "Manufacturing & B2B",
    ],
    nearby: ["Hisar", "Sonipat", "Panipat", "Jhajjar", "Bahadurgarh", "Bhiwani", "Gurugram"],
    faqs: [
      {
        q: "Is Ads House a digital marketing agency in Rohtak?",
        a: "Yes. Ads House is based in Rohtak, Haryana, and offers SEO, Google Ads, Meta ads, branding, web development, and custom software for local and national brands.",
      },
      {
        q: "Do you only work with Rohtak companies?",
        a: "No. Rohtak is home base. We run campaigns and websites for teams in Delhi NCR, Mumbai, Bengaluru, Hyderabad, Pune, and other Indian cities.",
      },
      {
        q: "What digital marketing services are available in Rohtak?",
        a: "SEO, Google Ads and Meta ads, brand identity, marketing strategy, high-performance websites, creative content, and custom software — scoped as one growth system.",
      },
    ],
  },
  {
    slug: "delhi-ncr",
    name: "Delhi NCR",
    state: "Delhi",
    region: "Delhi NCR",
    isHq: false,
    seoTitle: "Digital Marketing Agency in Delhi NCR",
    seoDescription:
      "Hire Ads House as your digital marketing agency in Delhi NCR. Performance marketing, SEO, branding, and conversion websites for Gurugram, Noida, and Delhi brands.",
    h1: "Digital Marketing Agency in Delhi NCR",
    intro:
      "Delhi NCR is one of the most expensive attention markets in India. Ads House works with Gurugram startups, Noida D2C brands, and Delhi service companies that need a growth partner who understands NCR CPCs — and still runs a tighter operation than a bloated agency floor in Cyber City.",
    market:
      "Search in NCR is bilingual, festive-heavy, and crowded with funded competitors. Generic 'best digital marketing company in Delhi' pages do not win here. Category positioning, landing-page speed, and creative that survives auction pressure do. We plan Google Ads, SEO, and Meta around unit economics that NCR founders actually live with.",
    approach:
      "Strategy workshops and shoots happen in the NCR when the brief needs it. Media, SEO, and engineering run as one programme from our Rohtak HQ so you are not paying Delhi overhead for production work that does not need a Gurugram pincode. Typical NCR briefs: SaaS demand gen, D2C acquisition, real estate, healthcare, and BFSI.",
    industries: ["SaaS", "D2C", "Real estate", "BFSI", "Healthcare", "Edtech"],
    nearby: ["Gurugram", "Noida", "Ghaziabad", "Faridabad", "Delhi"],
    faqs: [
      {
        q: "Do you work as a digital marketing agency for Delhi NCR brands?",
        a: "Yes. We serve Gurugram, Noida, Delhi, and Faridabad teams with performance marketing, SEO, branding, and websites — with on-site time when the work requires it.",
      },
      {
        q: "Why hire a Rohtak-based agency for NCR work?",
        a: "You get senior attention and metro-grade output without an inflated Delhi retainer. NCR media buying still happens on the same Google and Meta auctions. The difference is the team that runs them.",
      },
    ],
  },
  {
    slug: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    region: "Mumbai",
    isHq: false,
    seoTitle: "Digital Marketing Agency in Mumbai",
    seoDescription:
      "Ads House is a digital marketing and advertising partner for Mumbai brands. Brand building, performance ads, SEO, and websites built to convert in India's toughest market.",
    h1: "Digital Marketing Agency in Mumbai",
    intro:
      "Mumbai brands do not need more noise. They need a digital marketing agency that can hold its own against category leaders in BKC, Lower Parel, and Andheri — on craft and on numbers. Ads House works with fashion, D2C, BFSI, and founder-led companies who want campaigns that look expensive and still pay back.",
    market:
      "Mumbai search intent is premium, impatient, and comparison-heavy. Fashion, finance, food, and entertainment all auction against each other. We build brand systems that survive a South Bombay glance, then feed them with Google Ads, Meta creative, and SEO pages that rank for commercial queries — not vanity thought leadership.",
    approach:
      "Production and brand films can be Mumbai-based. Performance, SEO architecture, and Next.js engineering stay in one growth stack so the landing page matches the film. If you have been through two 'creative shops' and a media buyer who never talked, this is the model that fixes it.",
    industries: ["Fashion & lifestyle", "BFSI", "D2C", "Food & QSR", "Entertainment", "Real estate"],
    nearby: ["Navi Mumbai", "Thane", "Pune"],
    faqs: [
      {
        q: "Can Ads House run campaigns for Mumbai companies?",
        a: "Yes. We plan and buy Google and Meta campaigns for Mumbai brands, rebuild conversion websites, and handle brand and content with Mumbai production partners when needed.",
      },
      {
        q: "Do you understand Mumbai media costs?",
        a: "Mumbai CPCs are among the highest in India. We set bids and creative tests from your unit economics, not from a national average that quietly burns cash.",
      },
    ],
  },
  {
    slug: "bengaluru",
    name: "Bengaluru",
    state: "Karnataka",
    region: "Bengaluru",
    isHq: false,
    seoTitle: "Digital Marketing Agency in Bengaluru",
    seoDescription:
      "Digital marketing agency for Bengaluru startups and product companies. Ads House runs SEO, Google Ads, product-led sites, and growth strategy for Indian tech brands.",
    h1: "Digital Marketing Agency in Bengaluru",
    intro:
      "Bengaluru already has more agencies than parking. Ads House is the partner for product companies that want marketing tied to activation, not just MQLs. We work with fintech, SaaS, and consumer-tech teams who need search, paid, and a site that does not embarrass the product.",
    market:
      "Bengaluru queries skew English, comparison-led, and sceptical. 'Book a demo' pages leak because they were designed like brochures. We rebuild the funnel: SEO for high-intent terms, Google Ads for harvest, product-led creative for Meta and YouTube, and engineering for onboarding that the ads can honestly promise.",
    approach:
      "We speak product and P&L. Sprint cadence, experiment logs, and CAC payback — not a monthly PDF of impressions. Bengaluru retainers usually combine performance marketing, SEO, and web or product engineering.",
    industries: ["SaaS", "Fintech", "Consumer tech", "Edtech", "D2C", "B2B services"],
    nearby: ["Hyderabad", "Chennai", "Mysuru"],
    faqs: [
      {
        q: "Do you work with Bengaluru startups?",
        a: "Yes. A large share of our product and fintech work is with Bengaluru teams. We run paid acquisition, SEO, and conversion websites alongside your in-house marketers.",
      },
      {
        q: "Can you work with our in-house growth team?",
        a: "That is a common model in Bengaluru. We take the channels or the site your team cannot cover, and we report in the same language as your board deck.",
      },
    ],
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    region: "Hyderabad",
    isHq: false,
    seoTitle: "Digital Marketing Agency in Hyderabad",
    seoDescription:
      "Ads House is a digital marketing agency serving Hyderabad brands in edtech, healthcare, IT, and D2C — SEO, Google Ads, branding, and high-converting websites.",
    h1: "Digital Marketing Agency in Hyderabad",
    intro:
      "Hyderabad is no longer a 'tier-2 media' afterthought. Edtech, healthcare, IT services, and D2C brands here compete nationally. Ads House runs SEO, performance marketing, and brand systems for Hyderabad companies that have outgrown a local vendor and do not want a generic national package.",
    market:
      "Telugu-plus-English search, counselling-led edtech funnels, and healthcare trust signals all need different creative and landing pages. We map that intent instead of dumping every rupee into broad Performance Max.",
    approach:
      "Programme pages, faculty proof, clinic trust, and B2B service SEO are typical Hyderabad builds. Paid media supports the pages that can convert. We travel for kickoffs and shoots; weekly optimisation is remote and documented.",
    industries: ["Edtech", "Healthcare", "IT services", "D2C", "Real estate", "Manufacturing"],
    nearby: ["Bengaluru", "Vijayawada", "Warangal"],
    faqs: [
      {
        q: "Is Ads House available as a digital marketing agency in Hyderabad?",
        a: "Yes. We serve Hyderabad brands with SEO, Google Ads, Meta ads, branding, and website development, with on-site workshops when the brief needs it.",
      },
    ],
  },
  {
    slug: "pune",
    name: "Pune",
    state: "Maharashtra",
    region: "Pune",
    isHq: false,
    seoTitle: "Digital Marketing Agency in Pune",
    seoDescription:
      "Digital marketing agency for Pune brands. Ads House delivers SEO, Google Ads, automotive and manufacturing content, D2C performance, and conversion websites.",
    h1: "Digital Marketing Agency in Pune",
    intro:
      "Pune sits between manufacturing discipline and consumer-brand energy. Ads House works with automobile, industrial, education, and D2C companies that need a digital marketing agency which can write for engineers and still ship ads that sell.",
    market:
      "Pune search mixes B2B RFQs, campus and coaching intent, food delivery, and national D2C. We do not treat it as a cheaper Mumbai. Channel mix, language, and proof (plants, OEM logos, delivery radius) are built for how Pune actually buys.",
    approach:
      "Typical work: product-page SEO for manufacturers, performance creative for food and consumer, and websites that load fast on mobile networks. Mumbai and Pune accounts often share a brand system with geo-true campaigns.",
    industries: ["Automobile", "Manufacturing", "Education", "Food & QSR", "D2C", "IT services"],
    nearby: ["Mumbai", "Nashik", "Kolhapur"],
    faqs: [
      {
        q: "Do you handle digital marketing for Pune companies?",
        a: "Yes. We run SEO, paid media, branding, and web development for Pune teams, including manufacturers and consumer brands that sell beyond Maharashtra.",
      },
    ],
  },
  {
    slug: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    region: "Chennai",
    isHq: false,
    seoTitle: "Digital Marketing Agency in Chennai",
    seoDescription:
      "Ads House supports Chennai brands with digital marketing: SEO, Google Ads, bilingual content, automotive and healthcare campaigns, and conversion-focused websites.",
    h1: "Digital Marketing Agency in Chennai",
    intro:
      "Chennai rewards patience, proof, and Tamil-plus-English communication. Ads House is a digital marketing partner for automotive, healthcare, education, and industrial brands that need national reach without sounding like a North-India template.",
    market:
      "Search behaviour in Tamil Nadu is bilingual. Ignoring Tamil intent leaves demand on the table. We plan SEO clusters, YouTube, and paid search with that split in mind, and we keep landing pages culturally specific — not translated last-minute.",
    approach:
      "Brand language, testimonials, and creative get a Chennai pass. Media and technical SEO stay in the same operating system as our other metros so reporting stays comparable.",
    industries: ["Automobile", "Healthcare", "Education", "Manufacturing", "IT", "Retail"],
    nearby: ["Coimbatore", "Bengaluru", "Hyderabad"],
    faqs: [
      {
        q: "Can you run Tamil and English campaigns for Chennai?",
        a: "Yes. We plan bilingual SEO and ads where the data shows Tamil or English intent, instead of forcing one language across the account.",
      },
    ],
  },
  {
    slug: "ahmedabad",
    name: "Ahmedabad",
    state: "Gujarat",
    region: "Ahmedabad",
    isHq: false,
    seoTitle: "Digital Marketing Agency in Ahmedabad",
    seoDescription:
      "Digital marketing agency for Ahmedabad and Gujarat brands. Ads House runs SEO, Google Ads, D2C and jewellery/fashion campaigns, and high-converting websites.",
    h1: "Digital Marketing Agency in Ahmedabad",
    intro:
      "Gujarat businesses are commercially sharp. They do not buy 'awareness packages'. Ads House works as a digital marketing agency for Ahmedabad founders who want SEO, Google Ads, and brand work tied to orders, dealers, and festival peaks.",
    market:
      "Textiles, jewellery, chemicals, D2C, and real estate dominate high-intent search. Festive calendars (Navratri, Diwali, wedding season) are not optional line items — they are the P&L. We build creative and inventory around those spikes instead of a flat monthly plan copied from a US playbook.",
    approach:
      "Dealer-location pages, catalogue SEO, and performance creative for WhatsApp-led closing are common Ahmedabad builds. We report in contribution margin language.",
    industries: ["D2C", "Jewellery & fashion", "Chemicals & B2B", "Real estate", "Education", "Food"],
    nearby: ["Surat", "Vadodara", "Rajkot"],
    faqs: [
      {
        q: "Do you work with Ahmedabad D2C and manufacturing brands?",
        a: "Yes. We handle SEO, paid media, branding, and websites for Gujarat companies selling locally and across India.",
      },
    ],
  },
  {
    slug: "kolkata",
    name: "Kolkata",
    state: "West Bengal",
    region: "Kolkata",
    isHq: false,
    seoTitle: "Digital Marketing Agency in Kolkata",
    seoDescription:
      "Ads House is a digital marketing partner for Kolkata brands. SEO, Google Ads, cultural brand building, education and D2C campaigns, and conversion websites.",
    h1: "Digital Marketing Agency in Kolkata",
    intro:
      "Kolkata brands that travel nationally still need to feel local. Ads House runs digital marketing for education, culture-led consumer, healthcare, and D2C companies who want search and ads without losing the city's voice.",
    market:
      "Bengali-plus-English queries, Puja-season demand, and education counselling cycles shape the calendar. We do not paste a Mumbai festive plan onto Kolkata. Content, creative, and SEO clusters follow how Eastern India actually searches and buys.",
    approach:
      "Brand films and social can be produced with Kolkata crews. SEO, Google Ads, and the website remain one system so Puja spikes do not land on a slow page.",
    industries: ["Education", "Healthcare", "D2C", "Culture & media", "Retail", "Real estate"],
    nearby: ["Howrah", "Durgapur", "Bhubaneswar"],
    faqs: [
      {
        q: "Can Ads House handle digital marketing for Kolkata companies?",
        a: "Yes. We plan SEO, paid campaigns, branding, and websites for Kolkata and East India brands, including bilingual intent where it converts.",
      },
    ],
  },
];

export function getLocation(slug: string) {
  return locations.find((item) => item.slug === slug);
}
