import { unsplashPortraits, unsplashWork } from "@/lib/unsplash";

export type Service = {
  slug: string;
  title: string;
  short: string;
  outcome: string;
  image: string;
  icon: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  intent: string;
  points: { title: string; body: string }[];
  delivery: { step: string; title: string; body: string }[];
  faqs: { q: string; a: string }[];
};

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  location: string;
  title: string;
  challenge: string;
  solution: string;
  result: string;
  metric: string;
  metricLabel: string;
  image: string;
  year: string;
  services: string[];
  stats: { label: string; value: string }[];
  story: string[];
};

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  location: string;
  quote: string;
  result: string;
  image: string;
};

export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  seoDescription: string;
  content: string[];
};

export const stats = [
  { value: 12, suffix: "+", label: "Brands Scaled", detail: "From Startups to Growing Companies", icon: "rocket" },
  { value: 6.4, suffix: "x", label: "Avg. ROAS Delivered", detail: "Performance That Speaks", decimals: 1, icon: "chart" },
  { value: 8, suffix: "+", label: "Experts in House", detail: "Strategists, Creatives & Engineers", icon: "people" },
  { value: 1, prefix: "₹", suffix: "Cr+", label: "Revenue Influenced", detail: "Real Impact. Real Growth.", icon: "trophy" },
] as const;

export const trustedBrands = [
  { name: "House of Aari", className: "tracking-[0.12em] font-light" },
  { name: "Malik Dental", className: "font-extrabold tracking-tight" },
  { name: "Grain & Glow", className: "font-semibold tracking-tight" },
  { name: "Yadav Buildtech", className: "font-bold tracking-tight text-[#1d4ed8]" },
  { name: "BrightPath", className: "font-extrabold tracking-wide" },
  { name: "Oven & Oak", className: "font-black tracking-tight text-[#e11d48]" },
] as const;

export const resultMetrics = [
  { value: 64, suffix: "%", label: "New-patient enquiry lift", detail: "Clinic search + landing pages in Sonipat." },
  { value: 2.1, suffix: "x", label: "Boutique appointments", detail: "Rohtak occasion-wear, Maps and search ads.", decimals: 1 },
  { value: 41, suffix: "", label: "Site visits / month", detail: "Faridabad housing projects after page rebuild." },
  { value: 38, suffix: "%", label: "Repeat order rate", detail: "Gurugram kitchen brand after offer rebuild." },
  { value: 72, suffix: "%", label: "Counselling form lift", detail: "Panipat coaching centre, exam-season search." },
  { value: 29, suffix: "%", label: "Weekend covers", detail: "Ghaziabad restaurant, Maps and menu ads." },
] as const;

export const methodology = [
  {
    step: "01",
    title: "Discover",
    body: "We audit the brand, the market, the numbers, and the real reason growth has stalled. No decks for the sake of decks.",
  },
  {
    step: "02",
    title: "Build",
    body: "Positioning, identity, offers, funnels, websites, and product experiences get built as one system — not six disconnected workstreams.",
  },
  {
    step: "03",
    title: "Launch",
    body: "Campaigns go live with tracking, creative testing, and a conversion path that is ready on day one. India is too competitive to launch half-built.",
  },
  {
    step: "04",
    title: "Optimize",
    body: "We kill what underperforms, scale what converts, and report in business language: leads, CAC, ROAS, revenue — not vanity reach.",
  },
  {
    step: "05",
    title: "Scale",
    body: "Once the engine works, we add channels, markets, and product lines. Growth becomes a repeatable operating system.",
  },
] as const;

export const industries = [
  "D2C & Consumer",
  "Fashion & Lifestyle",
  "Fintech",
  "Healthcare",
  "Edtech",
  "Real Estate",
  "SaaS",
  "Food & QSR",
  "BFSI",
  "Automobile",
] as const;

export const services: Service[] = [
  {
    slug: "brand-building",
    title: "Brand Building",
    short: "Identity that people remember — and pay a premium for.",
    outcome: "A brand system that makes you look inevitable in your category.",
    image: "/images/service-brand.png",
    icon: "✦",
    h1: "Brand Building Agency in India",
    seoTitle: "Brand Building Agency in India",
    seoDescription:
      "Positioning, identity systems, and brand strategy for Indian businesses that need to stand out and charge more.",
    intro:
      "Most Indian brands are louder than they are clearer. We fix that. Brand building at Ads House is commercial work: category positioning, visual identity, verbal identity, and a story the market can repeat. If it does not help you win deals, raise prices, or earn loyalty, it is decoration.",
    intent:
      "This page is for Indian brands looking for a brand building or branding agency — positioning, identity, and a launch, not a logo-only package.",
    points: [
      {
        title: "Category positioning",
        body: "We define the space you can own in India — not a generic 'innovative solutions' claim that ten competitors already use.",
      },
      {
        title: "Identity systems",
        body: "Logo, colour, type, packaging, and digital language designed to work on a billboard in BKC and a Reels ad in Indore.",
      },
      {
        title: "Brand narrative",
        body: "A story your sales team, website, and campaigns can all tell without sounding like three different companies.",
      },
      {
        title: "Go-to-market launch",
        body: "New brands and rebrands do not sit in a PDF. We launch them into the market with campaigns that prove the positioning.",
      },
    ],
    faqs: [
      {
        q: "How long does brand building take?",
        a: "A focused identity and positioning sprint typically takes 4–8 weeks. A full rebrand with website and launch campaign runs 10–16 weeks.",
      },
      {
        q: "Do you work with startups or only established brands?",
        a: "Both. We work with funded startups, D2C founders, and established companies that have outgrown an amateur brand.",
      },
    ],
    delivery: [
      { step: "01", title: "Discover", body: "We audit the category, competitors, and the language buyers already use — then name the space you can own." },
      { step: "02", title: "Build", body: "Positioning, identity, and verbal system get designed as one kit: logo through campaign language." },
      { step: "03", title: "Launch", body: "The brand goes live on the site, ads, and sales materials together so the market hears one story." },
      { step: "04", title: "Optimize", body: "We test messaging in ads and sales calls and tighten what people actually repeat." },
      { step: "05", title: "Scale", body: "The system extends to packaging, hiring, and new product lines without a second brand appearing." },
    ],
  },
  {
    slug: "performance-marketing",
    title: "Performance Marketing",
    short: "Media that buys customers, not just clicks.",
    outcome: "Predictable pipeline from Google, Meta, and high-intent Indian demand.",
    image: "/images/service-performance.png",
    icon: "▲",
    h1: "Ads Agency for Google Ads & Meta in India",
    seoTitle: "Google Ads & Meta Ads Agency in India",
    seoDescription:
      "Google Ads, Meta ads, and social media campaigns for Indian brands — planned around CAC, ROAS, and revenue.",
    intro:
      "India is one of the most competitive paid-media markets in the world. Cheap traffic is easy. Profitable traffic is a craft. We plan, buy, and creative-test Google Ads, Meta ads, and social campaigns around unit economics — CAC, ROAS, LTV — so every rupee has a job.",
    intent:
      "This page is for Google Ads, Meta ads, and social media marketing in India — campaigns planned around CAC, ROAS, and revenue, not a 30-posts package.",
    points: [
      {
        title: "Google Ads & Performance Max",
        body: "Search, Shopping, YouTube, and Demand Gen built around high-intent Indian queries and clean conversion tracking.",
      },
      {
        title: "Meta ads & social media marketing",
        body: "Instagram, Facebook, and Reels acquisition plus always-on social creative — tested weekly, not a posting package. This is the social media marketing work Indian brands usually mean when they ask for SMM.",
      },
      {
        title: "Funnel & landing pages",
        body: "Ads do not convert on weak pages. We rebuild the path from click to lead to sale.",
      },
      {
        title: "Measurement that CFOs trust",
        body: "UTMs, server-side tracking, and reporting that maps spend to revenue — not just platform-reported ROAS.",
      },
    ],
    faqs: [
      {
        q: "What is a realistic ROAS in India?",
        a: "It depends on margin, AOV, and category. We set targets from your unit economics, then work the account until the numbers hold — not until a vanity dashboard looks green.",
      },
      {
        q: "What is the minimum ad spend you manage?",
        a: "We typically partner with brands investing ₹2 lakh+ per month in media, so there is enough volume to learn and scale.",
      },
      {
        q: "Do you also rebuild landing pages?",
        a: "Yes. Weak pages waste media. Funnel and landing-page work sits inside the same engagement as the ads.",
      },
      {
        q: "Do you run social media marketing, or only Google Ads?",
        a: "Both. Meta ads, Instagram/Facebook creative, and social campaigns sit in the same performance programme as Google Ads. We do not sell a 30-posts package with no conversion job.",
      },
    ],
    delivery: [
      { step: "01", title: "Discover", body: "We map unit economics, tracking gaps, and which channels can actually buy customers in your category." },
      { step: "02", title: "Build", body: "Account structure, conversion tracking, landing pages, and a creative test grid — before spend ramps." },
      { step: "03", title: "Launch", body: "Search, Performance Max, and Meta go live with UTMs and a path from click to lead." },
      { step: "04", title: "Optimize", body: "Weekly: kill waste, scale winners, refresh hooks. Reporting is leads, CAC, ROAS — not vanity reach." },
      { step: "05", title: "Scale", body: "New geos, products, and incrementality tests once the engine is profitable." },
    ],
  },
  {
    slug: "seo",
    title: "SEO",
    short: "Organic demand that compounds after the ads pause.",
    outcome: "Page-one visibility for the queries that become leads and revenue.",
    image: "/images/insight-seo.png",
    icon: "⌕",
    h1: "SEO Agency in India",
    seoTitle: "SEO Agency in India",
    seoDescription:
      "Technical SEO, content clusters, local SEO, and Google Business Profile work for Indian brands — planned to rank and convert.",
    intro:
      "SEO in India is not a US playbook with rupees swapped in. Queries are bilingual, competition is ruthless, and a slow website is invisible. Ads House builds search architecture for Google.in: commercial keyword clusters, Core Web Vitals, schema, local pack visibility for Rohtak and other cities, and content that a practitioner could have written. If it does not create pipeline, it is a hobby.",
    intent:
      "This page is for brands searching an SEO agency in India: technical SEO, content, and local-pack work meant to produce enquiries — not vanity traffic.",
    points: [
      {
        title: "Technical SEO & Core Web Vitals",
        body: "Server-rendered pages, crawl budget, canonicals, schema, and performance so Google can actually rank you — Next.js is our default for marketing sites.",
      },
      {
        title: "Keyword clusters that convert",
        body: "We map high-intent Indian queries to service, city, comparison, and proof pages. Ranking for 'marketing' is a trophy. Ranking for 'digital marketing agency in Rohtak' is a pipeline.",
      },
      {
        title: "Local SEO & Google Business Profile",
        body: "NAP consistency, local pages, reviews strategy, and map-pack work for agencies, clinics, coaches, and service businesses in Haryana and beyond.",
      },
      {
        title: "Content systems, not blog spam",
        body: "Topic clusters, internal linking, and landing pages written to rank and to book a call. AI filler is easy to spot. We do not ship it.",
      },
    ],
    faqs: [
      {
        q: "How long does SEO take in India?",
        a: "Meaningful movement on competitive terms usually takes 4–9 months. Local Rohtak and long-tail commercial queries can move faster when the site and Google Business Profile are clean.",
      },
      {
        q: "Do you guarantee #1 on Google?",
        a: "No honest SEO agency does. We commit to the architecture, the content system, and the measurement. Rankings follow relevance, technical health, and authority — not a contract clause.",
      },
      {
        q: "Is SEO still worth it versus Google Ads?",
        a: "Paid search rents the click. SEO owns more of the demand over time. Most growing Indian brands need both: ads for harvest now, SEO so CAC does not stay rented forever.",
      },
    ],
    delivery: [
      { step: "01", title: "Discover", body: "Indexation, Core Web Vitals, keyword map, and Google Business Profile — we find what is blocking pipeline, not just traffic." },
      { step: "02", title: "Build", body: "Templates, schema, internal links, and cluster pages built for Google.in, including bilingual query patterns." },
      { step: "03", title: "Launch", body: "Priority URLs go live with measurement. Local pack work starts where maps actually drive calls." },
      { step: "04", title: "Optimize", body: "We refresh pages that rank, cut crawl waste, and expand clusters that convert." },
      { step: "05", title: "Scale", body: "New commercial clusters, digital PR, and city pages only when there is real proof — never doorway templates." },
    ],
  },
  {
    slug: "marketing-strategy",
    title: "Marketing Strategy",
    short: "The plan before the spend. The reason after the results.",
    outcome: "A growth roadmap your team can actually execute.",
    image: "/images/service-strategy.png",
    icon: "◎",
    h1: "Marketing Strategy Agency in India",
    seoTitle: "Marketing Strategy Agency in India",
    seoDescription:
      "Positioning, channel mix, offers, and 90-day growth roadmaps that connect brand, performance, and product.",
    intro:
      "Strategy is not a 90-slide workshop. It is a set of choices: who you serve, what you say, where you show up, and what you will not do. We build marketing strategy that sales, product, and founders can run without us in the room.",
    intent:
      "This page is for marketing strategy in India — channel mix, offer, and a 90-day plan sales can run, not a slide deck that dies in Drive.",
    points: [
      {
        title: "Growth diagnostics",
        body: "We find the real bottleneck — offer, positioning, funnel, creative, product, or channel mix — before recommending spend.",
      },
      {
        title: "Channel architecture",
        body: "SEO, paid, social, partnerships, and CRM sequenced for Indian buying cycles, festivals, and regional demand.",
      },
      {
        title: "Offer & pricing narrative",
        body: "Campaigns fail when the offer is weak. We sharpen packaging, pricing story, and proof.",
      },
      {
        title: "90-day operating plans",
        body: "Clear owners, weekly experiments, and KPIs that leadership can review in 15 minutes.",
      },
    ],
    faqs: [
      {
        q: "Can you work with an in-house marketing team?",
        a: "Yes. Many of our strongest retainers are strategy-plus-execution partnerships with internal teams who need senior direction.",
      },
      {
        q: "Is this a workshop or an operating plan?",
        a: "Both exist. The useful output is a 90-day plan with owners and KPIs — not a 90-slide deck that never ships.",
      },
      {
        q: "Do you then run the ads and SEO?",
        a: "Usually yes. Strategy without execution is how plans die. We can stay in the room for media, SEO, and the site.",
      },
    ],
    delivery: [
      { step: "01", title: "Discover", body: "We name the bottleneck: offer, positioning, funnel, creative, product, or channel mix — before recommending spend." },
      { step: "02", title: "Build", body: "Channel architecture, offer narrative, and a 90-day operating plan sales and product can run." },
      { step: "03", title: "Launch", body: "The first experiments go live with owners, not a slide that says 'Q3'." },
      { step: "04", title: "Optimize", body: "Weekly reviews in business language. We drop work that does not move the chosen number." },
      { step: "05", title: "Scale", body: "When the plan holds, we add channels and markets without rewriting the strategy every quarter." },
    ],
  },
  {
    slug: "web-development",
    title: "Web Development",
    short: "Websites that load fast, rank, and convert.",
    outcome: "A high-performance site that sells while you sleep.",
    image: "/images/service-web.png",
    icon: "◈",
    h1: "Website Development Company in India",
    seoTitle: "Website Development Company in India",
    seoDescription:
      "Fast, SEO-ready Next.js websites for Indian brands — conversion-focused development for D2C, SaaS, and service businesses.",
    intro:
      "A website is not a brochure. It is your hardest-working salesperson. We design and engineer sites on Next.js with server-side rendering, Core Web Vitals discipline, and SEO architecture built for Google.in — then we wire every page to a conversion goal.",
    intent:
      "This page is for Next.js marketing websites in India that need to rank, load, and convert — not a brochure template with a contact form.",
    points: [
      {
        title: "SSR & Core Web Vitals",
        body: "Server-rendered pages, image optimisation, and performance budgets so Google and customers both stay.",
      },
      {
        title: "SEO architecture",
        body: "Clean URLs, schema, internal linking, and content models that can rank for Indian search demand.",
      },
      {
        title: "Conversion design",
        body: "Proof, offers, and CTAs placed like a growth team designed them — because one did.",
      },
      {
        title: "CMS-ready publishing",
        body: "Case studies, blogs, and landing pages your team can ship without waiting on developers.",
      },
    ],
    faqs: [
      {
        q: "Do you only build on Next.js?",
        a: "Next.js is our default for marketing sites that need SEO and speed. We also ship headless storefronts and custom stacks when the product requires it.",
      },
      {
        q: "Will the site be editable by our team?",
        a: "Yes. Case studies, insights, and landing pages are built so marketing can publish without waiting on engineering for every change.",
      },
      {
        q: "Do you handle SEO on the new site?",
        a: "Technical SEO, schema, and internal linking are part of the build. Content clusters can sit in the same programme.",
      },
    ],
    delivery: [
      { step: "01", title: "Discover", body: "We map conversion goals, crawl issues, and the pages that actually need to rank or sell." },
      { step: "02", title: "Build", body: "Next.js, Core Web Vitals budgets, schema, and a content model your team can publish into." },
      { step: "03", title: "Launch", body: "Redirects, analytics, and proof on every money page — not a brochure that goes live empty." },
      { step: "04", title: "Optimize", body: "We watch CWV, conversion, and indexation, then iterate templates that underperform." },
      { step: "05", title: "Scale", body: "New landing pages and locales reuse the system instead of starting another website." },
    ],
  },
  {
    slug: "custom-software",
    title: "Custom Software",
    short: "Products and internal tools that scale the operation.",
    outcome: "Software that turns your process into an advantage.",
    image: "/images/service-software.png",
    icon: "▣",
    h1: "Custom Software Development Agency in India",
    seoTitle: "Custom Software Development in India",
    seoDescription:
      "CRMs, booking engines, dashboards, and digital products engineered to grow with your marketing.",
    intro:
      "Campaigns stall when the product or the ops stack cannot keep up. We build the software around the growth motion — lead systems, client portals, booking engines, dashboards — so marketing is not pouring demand into a leaky bucket.",
    intent:
      "This page is for custom software that supports growth in India: funnels, portals, and tools tied to the same commercial brief as the ads.",
    points: [
      {
        title: "Growth-aligned products",
        body: "We spec software from the customer journey, not from a feature wishlist.",
      },
      {
        title: "Dashboards & CRMs",
        body: "Internal tools that show pipeline, campaign ROI, and operations in one place.",
      },
      {
        title: "Integrations",
        body: "Ads platforms, WhatsApp, payment gateways, and Indian logistics or CRM stacks connected cleanly.",
      },
      {
        title: "MVP to scale",
        body: "Ship a sharp first version, then iterate with real usage data from Indian users.",
      },
    ],
    faqs: [
      {
        q: "Is this a software company or an agency?",
        a: "We are a growth agency with a product engineering bench. Software is how we make marketing compound — not a separate IT shop.",
      },
      {
        q: "What is a typical first build?",
        a: "Lead systems, client portals, booking engines, and dashboards that show pipeline and campaign ROI in one place.",
      },
      {
        q: "Will you integrate ads platforms and WhatsApp?",
        a: "Yes. Indian stacks — payment gateways, WhatsApp, ads platforms, logistics or CRM — are part of the spec, not an afterthought.",
      },
    ],
    delivery: [
      { step: "01", title: "Discover", body: "We spec software from the customer journey and the leak in ops — not from a feature wishlist." },
      { step: "02", title: "Build", body: "A sharp MVP: CRM, portal, or dashboard wired to the same metrics marketing already reports." },
      { step: "03", title: "Launch", body: "Real users in India, real data, integrations that do not drop leads into a spreadsheet." },
      { step: "04", title: "Optimize", body: "We iterate on usage, not on unused modules. What operators skip, we cut." },
      { step: "05", title: "Scale", body: "The product grows with campaign volume so marketing is not pouring demand into a leaky bucket." },
    ],
  },
  {
    slug: "creative-content",
    title: "Creative & Content",
    short: "Work people stop for. Then act on.",
    outcome: "A content engine that feeds brand and performance.",
    image: "/images/service-creative.png",
    icon: "◈",
    h1: "Creative & Content Agency in India",
    seoTitle: "Creative Agency in India",
    seoDescription:
      "Campaign films, performance ads, social content, and brand stories made to stop the thumb and move a number.",
    intro:
      "Creative is not a moodboard. In paid social, creative is the targeting. We produce brand films, statics, UGC-style ads, and always-on content with a simple brief: stop the thumb, then move the number.",
    intent:
      "This page is for creative and content in India that brand and performance can both use — films, statics, and social assets with a conversion job.",
    points: [
      {
        title: "Performance creative",
        body: "Ad variations designed for testing: hooks, offers, and proof that Meta and YouTube can actually scale.",
      },
      {
        title: "Brand films & campaigns",
        body: "High-craft campaign films for launches, festive moments, and category takeovers.",
      },
      {
        title: "Social & Reels systems",
        body: "Always-on content calendars that sound like the brand, not like a template page.",
      },
      {
        title: "SEO content",
        body: "Articles and landing pages written to rank on Google India and to convert the traffic they earn.",
      },
    ],
    faqs: [
      {
        q: "Do you shoot in-house?",
        a: "We lead creative direction and production with a trusted India-wide network of directors, studios, and editors.",
      },
      {
        q: "Is this for brand films or performance ads?",
        a: "Both. Performance creative is the targeting on paid social; brand films still need a commercial job. We brief both that way.",
      },
      {
        q: "Can you feed SEO as well as ads?",
        a: "Yes. Articles and landing pages written to rank on Google India sit in the same content system as social and films.",
      },
    ],
    delivery: [
      { step: "01", title: "Discover", body: "We pull hooks, offers, and proof from the actual account — not from a moodboard." },
      { step: "02", title: "Build", body: "A test grid for ads plus brand films or social systems with a voice the market can recognise." },
      { step: "03", title: "Launch", body: "Creative goes live with the media plan, so we learn which hooks scale in week one." },
      { step: "04", title: "Optimize", body: "Winners get variants. Losers get killed. The calendar is a test plan, not a posting package." },
      { step: "05", title: "Scale", body: "Always-on content and festive campaigns reuse the system instead of reinventing the brand each quarter." },
    ],
  },
  {
    slug: "influencer-marketplace",
    title: "Influencer Marketplace",
    short: "Local creators and campaigns — matched by city, niche, and budget.",
    outcome: "The right influencer for the right business, in the right location.",
    image: "/images/service-marketplace.png",
    icon: "◉",
    h1: "Influencer Marketplace for Ads in India",
    seoTitle: "Influencer Marketplace | Local Creator Ads",
    seoDescription:
      "Find local influencers by city, niche, followers, and budget. Post campaigns, apply, collaborate — or hire Ads House to run them.",
    intro:
      "Paid search and Meta ads are not the only way to buy attention in India. Local creators move footfall, orders, and trust — if you can find the right ones. Ads House Marketplace is our two-sided platform for influencer ads: businesses and agencies post campaigns; creators apply by location, niche, and budget; everyone collaborates in one place. Prefer not to manage it yourself? Hire Ads House as the agency on the platform.",
    intent:
      "This page is for influencer marketing in India: find creators by city and niche, or hire Ads House to run the campaign.",
    points: [
      {
        title: "Local creator discovery",
        body: "Search influencers by city, niche, followers, engagement, platforms, and budget — starting with Rohtak and Haryana, built to scale across India.",
      },
      {
        title: "Campaign board",
        body: "Post open campaigns with clear briefs, location, and creator requirements. Creators apply; you shortlist and accept in one workflow.",
      },
      {
        title: "Collaborate & review",
        body: "Messaging, collaborations, and reviews keep briefs, deliverables, and reputation on the platform — not lost in WhatsApp threads.",
      },
      {
        title: "Ads House managed campaigns",
        body: "Do not want to brief and coordinate creators yourself? Hire Ads House to run influencer ads end-to-end for your brand or clients.",
      },
    ],
    faqs: [
      {
        q: "Is the marketplace separate from agency services?",
        a: "It is a product of Ads House, listed alongside our agency services. You can self-serve on the marketplace or hire Ads House to manage influencer campaigns for you.",
      },
      {
        q: "Who can join?",
        a: "Creators, businesses, and agencies. Creators build profiles and apply to campaigns. Businesses and agencies post campaigns and hire talent. Ads House is the featured agency on the platform.",
      },
      {
        q: "Where does it work today?",
        a: "Discovery is strongest around Rohtak and Haryana first, with national reach as more creators and brands join. Location filters are core to how matching works.",
      },
    ],
    delivery: [
      { step: "01", title: "Discover", body: "We match the brief to city, niche, followers, and budget — or you search the directory yourself." },
      { step: "02", title: "Build", body: "Open campaigns with a clear brief, location, and creator requirements. Creators apply in one workflow." },
      { step: "03", title: "Launch", body: "Shortlist, accept, and brief without losing the thread in WhatsApp." },
      { step: "04", title: "Optimize", body: "Collaborations and reviews stay on the platform so the next hire is easier." },
      { step: "05", title: "Scale", body: "Repeat in new cities, or hire Ads House to run influencer ads end-to-end." },
    ],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "house-of-aari",
    client: "House of Aari",
    industry: "Boutique / occasion wear",
    location: "Rohtak",
    title: "A Rohtak boutique that started getting appointment bookings",
    challenge:
      "The store had festive stock and Instagram photos. Google showed a half-empty Business Profile. Walk-ins were relatives, not buyers who had already chosen a collection.",
    solution:
      "We rebuilt Maps, wrote collection pages for occasions that actually had inventory, and ran search ads only on those lines. WhatsApp booking replaced 'price?' DMs.",
    result: "Store appointments more than doubled in 90 days without adding a second outlet.",
    metric: "2.1x",
    metricLabel: "store appointments",
    image: unsplashWork.fashion,
    year: "2026",
    services: ["Brand Building", "Web Development", "Performance Marketing"],
    stats: [
      { label: "Appointments", value: "2.1x" },
      { label: "Maps calls", value: "+48%" },
      { label: "Paid ROAS", value: "3.4x" },
    ],
    story: [
      "House of Aari did not need a national fashion campaign. It needed Rohtak and nearby towns to find the right lehenga before they took a bus to a mall.",
      "We matched ads to stock. If a colour was gone, the ad came down. The site showed fabric and stitching, not a generic catalogue dump.",
      "The same media budget started producing named appointments instead of screenshot bargains.",
    ],
  },
  {
    slug: "malik-dental-care",
    client: "Malik Dental Care",
    industry: "Clinic",
    location: "Sonipat",
    title: "A Sonipat clinic that stopped relying on neighbour referrals alone",
    challenge:
      "Patients arrived through word of mouth. Search listed three other clinics first. The old site hid fees and treatment names parents actually type.",
    solution:
      "Treatment pages, honest fee ranges, and Google Ads around implants, braces, and kids' dentistry. The front desk got WhatsApp forms they could answer the same day.",
    result: "New-patient enquiries up 64% with a landing page the receptionist could actually use.",
    metric: "+64%",
    metricLabel: "new-patient enquiries",
    image: unsplashWork.dental,
    year: "2026",
    services: ["Web Development", "Performance Marketing", "Marketing Strategy"],
    stats: [
      { label: "Enquiries", value: "+64%" },
      { label: "Call from Maps", value: "+31%" },
      { label: "Form-to-visit", value: "41%" },
    ],
    story: [
      "Local healthcare search is messy. We ranked for the treatments Malik Dental wants, not every keyword a Delhi chain already owns.",
      "The page answered 'how much' and 'how long' before the call. That cut no-shows from curiosity traffic.",
      "Ads paused on Sundays when the chair was empty on purpose — spend followed clinic hours.",
    ],
  },
  {
    slug: "grain-and-glow-kitchen",
    client: "Grain & Glow Kitchen",
    industry: "D2C pantry",
    location: "Gurugram",
    title: "A Gurugram kitchen brand that escaped coupon hunters",
    challenge:
      "Trial packs were selling. Repeat was not. Broad Meta ads trained people to wait for 40% off.",
    solution:
      "We killed the widest audiences, rebuilt the offer around a 7-day pantry trial, and sent first-time buyers a sequence that earned the second jar without another coupon.",
    result: "Repeat orders reached 38% while discount days dropped.",
    metric: "38%",
    metricLabel: "repeat order rate",
    image: unsplashWork.kitchen,
    year: "2025",
    services: ["Performance Marketing", "Creative & Content", "Brand Building"],
    stats: [
      { label: "Repeat rate", value: "38%" },
      { label: "CAC", value: "-22%" },
      { label: "Discount days", value: "-40%" },
    ],
    story: [
      "D2C food in Gurugram is expensive traffic. We sold a habit, not a festival hamper.",
      "Creative showed actual meals, not lifestyle fluff. PDPs loaded fast on mid-range Androids.",
      "Once the second order stuck, lookalikes finally had a profitable seed.",
    ],
  },
  {
    slug: "yadav-buildtech",
    client: "Yadav Buildtech",
    industry: "Real estate",
    location: "Faridabad",
    title: "Faridabad project pages that produced site visits, not brochure downloads",
    challenge:
      "The website was a PDF in disguise. Ads sent people to a home page with every tower at once. Sales still asked 'which project?' on every call.",
    solution:
      "One page per project, map pins, inventory that matched the site, and walk-in campaigns with a form the CRM actually opened.",
    result: "About 41 qualified site visits a month from search and local ads.",
    metric: "41",
    metricLabel: "site visits / month",
    image: unsplashWork.building,
    year: "2026",
    services: ["Web Development", "Performance Marketing", "Marketing Strategy"],
    stats: [
      { label: "Site visits", value: "41/mo" },
      { label: "Cost per visit", value: "-27%" },
      { label: "Form quality", value: "+35%" },
    ],
    story: [
      "Housing ads fail when the landing page lies about possession or price. We showed what was actually for sale in Faridabad.",
      "Sales got names, project, and preferred time — not a spreadsheet of random numbers.",
      "Spend followed towers with inventory. Finished inventory stopped stealing the budget.",
    ],
  },
  {
    slug: "brightpath-coaching",
    client: "BrightPath Coaching",
    industry: "Coaching",
    location: "Panipat",
    title: "Exam-season search that filled the counsellor calendar",
    challenge:
      "Parents search in a panic. BrightPath was buying every competitor keyword in Haryana and still missing the courses they actually run.",
    solution:
      "A page per course, ads timed to board and entrance calendars, and a counselling form that asked class and target exam up front.",
    result: "Counselling form fills up 72% in the peak window without doubling spend.",
    metric: "+72%",
    metricLabel: "counselling form fills",
    image: unsplashWork.coaching,
    year: "2025",
    services: ["Performance Marketing", "Web Development", "Creative & Content"],
    stats: [
      { label: "Form fills", value: "+72%" },
      { label: "Show-up rate", value: "68%" },
      { label: "Wasted keywords", value: "-51%" },
    ],
    story: [
      "Panipat parents do not want a national edtech brand. They want a centre they can visit after school.",
      "We wrote like a counsellor, not a ranking mill. Faculty and batch timings sat above the fold.",
      "Ads ramped before forms opened and cooled when batches were full.",
    ],
  },
  {
    slug: "oven-and-oak",
    client: "Oven & Oak",
    industry: "Restaurant",
    location: "Ghaziabad",
    title: "Weekend covers that no longer depended on luck",
    challenge:
      "Weekends were feast or empty. Influencer blasts filled the kitchen on the wrong night. Maps photos were dark and three years old.",
    solution:
      "Fresh menu photography, an offer calendar the kitchen could cook, and Maps plus search instead of a one-off creator dump.",
    result: "Weekend covers up 29% with creator posts only when the pass could take them.",
    metric: "+29%",
    metricLabel: "weekend covers",
    image: unsplashWork.restaurant,
    year: "2026",
    services: ["Creative & Content", "Performance Marketing", "Marketing Strategy"],
    stats: [
      { label: "Weekend covers", value: "+29%" },
      { label: "Maps photos views", value: "3.1x" },
      { label: "No-show on offers", value: "-18%" },
    ],
    story: [
      "A Ghaziabad dining room dies when ads promise a menu the chef did not prep.",
      "We synced offers with kitchen load. Creators came after the photos and the calendar were honest.",
      "Maps did more for weekday lunches than another reel ever did.",
    ],
  },
  {
    slug: "niva-botanics",
    client: "Niva Botanics",
    industry: "Skincare / D2C",
    location: "Noida",
    title: "Noida botanicals that grew without another 40% off sale",
    challenge:
      "Revenue existed because of discounts. Margin and repeat did not. The site looked like a sale banner with a product somewhere underneath.",
    solution:
      "A quieter brand story, proof-led ads, and a PDP that explained the routine. Search carried the high-intent buyers; Meta stopped leading with strikethrough prices.",
    result: "Monthly revenue up 54% with fewer discount days.",
    metric: "+54%",
    metricLabel: "monthly revenue",
    image: unsplashWork.skincare,
    year: "2025",
    services: ["Brand Building", "Performance Marketing", "Creative & Content"],
    stats: [
      { label: "Revenue", value: "+54%" },
      { label: "Repeat", value: "+21%" },
      { label: "Discount days", value: "-36%" },
    ],
    story: [
      "Noida D2C skincare buyers have seen every 'clean' claim. We showed batch notes and a routine, not a festival countdown.",
      "The first purchase had to be profitable enough to fund the second. Coupons became a win-back, not the homepage.",
      "Once full-price creative worked, we stopped teaching the audience to wait.",
    ],
  },
  {
    slug: "hooda-autohaus",
    client: "Hooda Autohaus",
    industry: "Automobile",
    location: "Bahadurgarh",
    title: "Test-drives with a name and a model, not 'price?' on WhatsApp",
    challenge:
      "Car buyers compare three yards. Listings were thin. The site was a phone number on a white page. Walk-ins asked for cars that had already sold.",
    solution:
      "Live stock pages, service-camp ads, and a form that captured model and timeline before the yard called back.",
    result: "About 18 extra test-drives a month from search and listings.",
    metric: "18",
    metricLabel: "extra test-drives / month",
    image: unsplashWork.cars,
    year: "2026",
    services: ["Web Development", "Performance Marketing", "Creative & Content"],
    stats: [
      { label: "Test-drives", value: "+18/mo" },
      { label: "Wrong-stock calls", value: "-44%" },
      { label: "Listing clicks", value: "+62%" },
    ],
    story: [
      "Bahadurgarh yards lose deals when the car in the ad is gone. We synced inventory weekly.",
      "Service camps filled the workshop on slow weekdays. New-car ads ran when the floor had the colour.",
      "Sales stopped quoting into a void. They knew the model before they dialled.",
    ],
  },
  {
    slug: "papertrail-co",
    client: "Papertrail Co.",
    industry: "Stationery / D2C",
    location: "Greater Noida",
    title: "Catalogue ads that stopped paying for mobile bounces",
    challenge:
      "Stationery looks cheap to advertise until you see ROAS. Collection pages crawled. Brand and catalogue campaigns were one messy ad set.",
    solution:
      "We split brand from catalogue, compressed images, and rebuilt collection filters so a teacher could find notebooks in two taps.",
    result: "3.8x blended ROAS on Meta after the funnel stopped leaking.",
    metric: "3.8x",
    metricLabel: "blended Meta ROAS",
    image: unsplashWork.stationery,
    year: "2025",
    services: ["Performance Marketing", "Web Development", "Creative & Content"],
    stats: [
      { label: "Meta ROAS", value: "3.8x" },
      { label: "Mobile bounce", value: "-24%" },
      { label: "AOV", value: "+17%" },
    ],
    story: [
      "Greater Noida school-run buyers shop on the phone in a hurry. Slow grids killed the cart.",
      "Catalogue ads pointed at in-stock SKUs. Brand ads told a short story and stepped out of the way.",
      "Once mobile converted, we could raise spend without lighting money on bounce.",
    ],
  },
  {
    slug: "fitlane-studio",
    client: "FitLane Studio",
    industry: "Fitness",
    location: "Jhajjar",
    title: "Trial bookings in a 4 km radius, not a viral reel",
    challenge:
      "The gym wanted reach. What it needed was trials from people who could actually drive over after work.",
    solution:
      "Pin-drop ads, a one-screen landing page, and WhatsApp scripts for the front desk. Memberships followed the trials.",
    result: "47 trial bookings in the first month of local ads.",
    metric: "47",
    metricLabel: "trial bookings in month one",
    image: unsplashWork.gym,
    year: "2026",
    services: ["Performance Marketing", "Web Development", "Marketing Strategy"],
    stats: [
      { label: "Trials", value: "47" },
      { label: "Show-up", value: "61%" },
      { label: "Trial to member", value: "34%" },
    ],
    story: [
      "Jhajjar does not need a national fitness influencer. It needs a map pack and a page that loads on 4G.",
      "We excluded Delhi interest targeting that looked cheap and never walked in.",
      "The desk messaged the same day. Speed closed more trials than another shoot.",
    ],
  },
  {
    slug: "dahiya-atelier",
    client: "Dahiya Atelier",
    industry: "Interiors",
    location: "Rewari",
    title: "Homeowners who had already seen the work before they called",
    challenge:
      "Leads were relatives of relatives. The portfolio lived on a Drive link. SEO was an afterthought.",
    solution:
      "Project stories with rooms, budgets, and Rewari / Dharuhera context, plus a site that loaded like a magazine instead of a PDF.",
    result: "Nine inbound project briefs a quarter from people who already understood the style.",
    metric: "9",
    metricLabel: "inbound briefs / quarter",
    image: unsplashWork.interior,
    year: "2025",
    services: ["Brand Building", "Web Development", "Marketing Strategy"],
    stats: [
      { label: "Inbound briefs", value: "9/qtr" },
      { label: "Close rate", value: "+19 pts" },
      { label: "Organic visits", value: "2.4x" },
    ],
    story: [
      "Interior SEO is slow and worth it. We wrote like a site visit, not a keyword list.",
      "Homeowners arrived with a room in mind. Discovery calls got shorter.",
      "Ads only amplified finished projects. The site did the selling.",
    ],
  },
  {
    slug: "routepack-freight",
    client: "RoutePack Freight",
    industry: "Logistics",
    location: "Palwal",
    title: "RFQs from shippers, not student resumes",
    challenge:
      "The fleet sat idle while LinkedIn and Google sent intern applications. Pages talked about 'end-to-end solutions' and said nothing a procurement manager could use.",
    solution:
      "Lane pages, honest coverage, and search plus LinkedIn aimed at shippers who already move freight through Palwal and the Yamuna Expressway.",
    result: "14 sales-ready RFQs in 60 days.",
    metric: "14",
    metricLabel: "sales-ready RFQs in 60 days",
    image: unsplashWork.freight,
    year: "2026",
    services: ["Marketing Strategy", "Web Development", "Performance Marketing"],
    stats: [
      { label: "RFQs", value: "14" },
      { label: "Junk applications", value: "-70%" },
      { label: "Time to first reply", value: "<4h" },
    ],
    story: [
      "B2B search around NCR freight is boring until a truck is idle. We wrote lanes, not slogans.",
      "LinkedIn stopped looking like a campus hire post.",
      "Sales finally got tonnage and destination in the first email.",
    ],
  },
  {
    slug: "little-loom",
    client: "Little Loom",
    industry: "Kidswear",
    location: "Meerut",
    title: "First checkouts that the workshop could actually fulfil",
    challenge:
      "Photos were fine. Size guides were not. Celebrity-style creators drove orders the unit could not stitch on time.",
    solution:
      "Honest size charts, retargeting that did not nag, and local parent creators in Meerut and nearby towns — not metro celebrity accounts.",
    result: "First-time checkout rate up 81% with fewer returns from wrong sizes.",
    metric: "+81%",
    metricLabel: "first-time checkout rate",
    image: unsplashWork.kidswear,
    year: "2025",
    services: ["Creative & Content", "Performance Marketing", "Web Development"],
    stats: [
      { label: "Checkout rate", value: "+81%" },
      { label: "Size returns", value: "-33%" },
      { label: "Fulfilment lag", value: "-2.5 days" },
    ],
    story: [
      "Meerut kidswear dies on COD returns. We made size the hero of the PDP.",
      "Creators were parents in the same climate and festive calendar.",
      "Ads paused when the cutting table was behind. Growth followed capacity.",
    ],
  },
  {
    slug: "verma-associates",
    client: "Verma Associates",
    industry: "CA / professional services",
    location: "Bhiwadi",
    title: "A CA firm that stopped looking like a visiting card",
    challenge:
      "Founders who needed GST and startup filings could not tell the firm apart from a print ad. Every call started with the basics.",
    solution:
      "Service pages for GST, company formation, and MSME filings, plus quiet search ads for Bhiwadi and the industrial belt.",
    result: "Retained client enquiries up 33%, with callers who already knew the service.",
    metric: "+33%",
    metricLabel: "retained client enquiries",
    image: unsplashWork.office,
    year: "2026",
    services: ["Web Development", "Performance Marketing", "Brand Building"],
    stats: [
      { label: "Enquiries", value: "+33%" },
      { label: "Qualified calls", value: "+28%" },
      { label: "Time per intro call", value: "-12 min" },
    ],
    story: [
      "Professional services around the NCR industrial belt still hide behind clipart. We wrote like a partner, not a banner.",
      "Search captured intent that was already going to a Delhi firm by default.",
      "Partners spent the first call on the file, not on explaining what a CA does.",
    ],
  },
  {
    slug: "sipstreet",
    client: "SipStreet",
    industry: "Beverages / retail",
    location: "Manesar",
    title: "Tasting counters that filled before spend scaled",
    challenge:
      "The drink died in distributor decks. Retailers had no story to repeat. The website did not take wholesale enquiries.",
    solution:
      "A brand line retailers could say in one breath, a wholesale form, and city-wise ads that filled Manesar and Gurugram tasting counters first.",
    result: "22 new retail counters in four months without a national blitz.",
    metric: "22",
    metricLabel: "new retail counters in 4 months",
    image: unsplashWork.drinks,
    year: "2025",
    services: ["Brand Building", "Performance Marketing", "Creative & Content"],
    stats: [
      { label: "New counters", value: "22" },
      { label: "Wholesale leads", value: "31" },
      { label: "Tasting sell-through", value: "+44%" },
    ],
    story: [
      "A Manesar beverage brand does not win Delhi overnight. It wins the next kirana and the next gym cafe.",
      "We gave distributors a one-line story and a page that took orders.",
      "Ads followed counters that already had stock. Empty shelves never got traffic.",
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Kirti Aggarwal",
    role: "Founder",
    company: "House of Aari",
    location: "Rohtak",
    quote:
      "We were posting pretty pictures and hoping walk-ins would follow. Ads House rebuilt the Google Business profile, ran search ads on the collections that actually had stock, and the boutique started getting appointment bookings instead of random DMs.",
    result: "2.1x store appointments in 90 days",
    image: unsplashPortraits.kirti,
  },
  {
    name: "Deepak Malik",
    role: "Owner",
    company: "Malik Dental Care",
    location: "Sonipat",
    quote:
      "Patients used to find us through a neighbour. Now the clinic ranks for the treatments we want, the landing page answers fee questions, and the front desk gets WhatsApp enquiries we can actually convert.",
    result: "+64% new-patient enquiries",
    image: unsplashPortraits.deepak,
  },
  {
    name: "Neha Bansal",
    role: "Co-founder",
    company: "Grain & Glow Kitchen",
    location: "Gurugram",
    quote:
      "D2C food is unforgiving on CAC. They killed the broad ads, rebuilt the offer around trial packs, and we finally saw repeat orders instead of one-time coupon hunters.",
    result: "38% repeat order rate",
    image: unsplashPortraits.neha,
  },
  {
    name: "Arjun Yadav",
    role: "Director",
    company: "Yadav Buildtech",
    location: "Faridabad",
    quote:
      "Our site looked like a PDF. Ads House turned project pages into lead engines — location pages, walk-in campaigns, and a form that our sales team actually follows up. Site visits from ads are no longer a guess.",
    result: "41 qualified site visits / month",
    image: unsplashPortraits.arjun,
  },
  {
    name: "Pooja Saini",
    role: "Centre head",
    company: "BrightPath Coaching",
    location: "Panipat",
    quote:
      "Parents search in a panic before board exams. They wrote pages for each course, tightened Google Ads around exam dates, and our counsellor calendar filled without us buying every competitor keyword.",
    result: "+72% counselling form fills",
    image: unsplashPortraits.pooja,
  },
  {
    name: "Imran Qureshi",
    role: "Owner",
    company: "Oven & Oak",
    location: "Ghaziabad",
    quote:
      "Weekend covers were luck. Maps, menu photos, and a simple offer calendar did more than a food influencer blast. We still do creator posts — but only when the kitchen can take the load.",
    result: "+29% weekend covers",
    image: unsplashPortraits.imran,
  },
];

export const insights: Insight[] = [
  {
    slug: "digital-marketing-agency-in-india",
    title: "How to hire a digital marketing agency in India",
    excerpt:
      "What Indian founders should ask before signing a retainer — and how to tell a growth partner from a package vendor.",
    date: "2026-09-17",
    readTime: "8 min",
    category: "Agency",
    image: "/images/about-team.png",
    seoDescription:
      "How to hire a digital marketing agency in India: SEO, Google Ads, Meta, branding, and websites. Questions that separate a growth partner from a package.",
    content: [
      "Search 'digital marketing agency in India' and you will get the same list: SEO, Google Ads, social media, 'guaranteed ranking'. Most of those pages were written to rank, not to run an account. The hire is too expensive to get wrong.",
      "Start with the bottleneck, not the service menu. If people cannot find you, you need SEO or paid search — and a page that converts. If they find you and do not enquire, you need the website and the offer. If enquiries exist and revenue is thin, you may need positioning, not more ads. Ads House diagnoses that before we sell a retainer.",
      "Ask to see measurement. A serious ads agency in India should talk in leads, CAC, ROAS, and revenue — and show how tracking is set up. Vanity dashboards (reach, likes, 'traffic up 200%' with no conversions) are how retainers quietly die.",
      "Ask who does the work. Many vendors outsource ads to a nameless media buyer and SEO to a content mill. You want a team that can sit with you — our studio is in Rohtak, Haryana — and still buy Google and Meta at metro quality for brands anywhere in India.",
      "Do not buy '#1 on Google guaranteed'. Google does not sell positions to agencies. What you can buy is technical SEO, honest content, a Google Business Profile that matches your NAP, and paid search that harvests demand while organic compounds.",
      "If you want a digital marketing agency in India that treats growth as a system — brand, SEO, ads, and the website together — start a project with Ads House. Campaigns run nationwide. Kickoffs can happen in Rohtak when you want the team in the room.",
    ],
  },
  {
    slug: "social-media-marketing-india",
    title: "Social media marketing in India: Meta ads, not posting packages",
    excerpt:
      "What SMM should mean for Indian brands in 2026 — acquisition creative, tracking, and a conversion job. Not 30 posts and a boost.",
    date: "2026-09-16",
    readTime: "7 min",
    category: "Performance",
    image: "/images/service-performance.png",
    seoDescription:
      "Social media marketing in India: Meta ads, Instagram, Facebook, and Reels with a CAC job. How Ads House runs SMM versus a posting package.",
    content: [
      "When an Indian founder asks for social media marketing, they usually mean one of two jobs: buy customers on Instagram and Facebook, or look busy on the grid. Those are not the same retainer. Ads House runs the first.",
      "Meta ads are social media marketing with a number. Creative in the first second is the targeting. We test UGC-style hooks, product proof, founder, and offer — then kill losers weekly. Always-on organic creative supports the ads; it is not a substitute for them.",
      "A posting package with no conversion event is a mood. If the pixel is broken, the landing page is slow, or the offer is unclear, more Reels will not save the account. We fix the path from click to lead before we scale spend.",
      "Google Ads still harvests high-intent search. Social creates and retargets. The two sit in the same performance programme at Ads House so blended CAC is honest. If a vendor only sells '30 posts + stories', they are not running SMM as acquisition.",
      "This is the work on our Google Ads and Meta ads service page. If you want social media marketing in India that a CFO can read, start a project — from the Rohtak studio, for brands nationwide.",
    ],
  },
  {
    slug: "ads-agency-in-rohtak",
    title: "Ads agency in Rohtak: what the studio actually does",
    excerpt:
      "How a Rohtak ads agency should work — and how to tell a growth partner from a posting package.",
    date: "2026-08-18",
    readTime: "7 min",
    category: "Local",
    image: "/images/service-performance.png",
    seoDescription:
      "What an ads agency in Rohtak should actually run: Google Ads, Meta ads, SEO, branding, and a site that converts — not a posting package.",
    content: [
      "If you searched for an ads agency in Rohtak and landed here, you want someone who can buy customers — not boost a Facebook post. Ads House is based in Rohtak. We run Google Ads, Meta ads, SEO, brand, and the website as one system, reported in leads, CAC, and ROAS.",
      "An ads agency in this market should land demand on a page that converts. Creative, tracking, landing pages, and reporting have to sit together. Isolated 'social media packages' do not.",
      "Local businesses in Rohtak, Hisar, Sonipat, and the NCR belt often hire the first vendor who promises '#1 on Google'. We will tell you if you need Google Ads this month, local SEO and a Google Business Profile, a faster website, or a clearer offer — before you spend.",
      "What we actually run: Google Search and Performance Max for high-intent queries, Meta ads for demand and retargeting, SEO so you are not rented forever, and brand work so the ads do not look like every other Haryana carousel. Websites are built on Next.js so they can rank and load.",
      "There are similarly named firms in other cities. If the NAP does not say Rohtak, Haryana, it is not this studio. Instagram is @adshouse.in; LinkedIn is Ads House.",
      "To hire us, start a project on this site or call the Rohtak studio. Bring the number you need to move. We will tell you whether ads, SEO, or the website is the first lever — then we run it.",
    ],
  },
  {
    slug: "rank-on-google-india-2026",
    title: "How Indian brands actually rank on Google in 2026",
    excerpt:
      "Search in India is not a US playbook with rupees swapped in. Here is the architecture we use to earn page-one demand.",
    date: "2026-06-12",
    readTime: "8 min",
    category: "SEO",
    image: "/images/insight-seo.png",
    seoDescription:
      "Learn how Indian brands rank on Google in 2026: E-E-A-T, Core Web Vitals, Hindi and English intent, local SEO, and content systems that convert.",
    content: [
      "Google India is not a smaller version of Google US. The queries are bilingual, the competition is ruthless, and a slow website is invisible. If you want to rank as a digital marketing agency, a D2C brand, or a local service business, you need an architecture built for this market.",
      "First, pick commercial intent, not vanity keywords. Ranking for 'marketing' is a trophy. Ranking for 'performance marketing agency Mumbai' or 'best serum for pigmentation in humidity' is a pipeline. We map keyword clusters to pages that can win — service pages, city pages, comparison pages, and proof-heavy case studies.",
      "Second, earn E-E-A-T the Indian way. That means named experts, real project metrics in ₹, client logos with permission, office and GST-era trust signals, and content that a practitioner could have written. AI-generated filler is easy to spot and easier for Google to ignore.",
      "Third, technical SEO is table stakes. Server-side rendering, canonical tags, XML sitemaps, schema markup (Organization, FAQ, Service, Article), image compression, and Core Web Vitals are how you stay eligible. Next.js is our default because it lets us ship HTML that Google can read on first request.",
      "Fourth, language and location. Many high-intent users search in English with Indian modifiers. Others search in Hindi or Hinglish. Local pack visibility still matters for agencies and service businesses in Mumbai, Delhi NCR, Bengaluru, and Pune. NAP consistency, Google Business Profile, and city-specific pages are not optional.",
      "Fifth, content has to convert. A blog that ranks but never books a call is a hobby. Every article on Ads House sites ends with a specific next step, internal links to service and work pages, and proof. That is how SEO becomes a growth channel instead of a publishing chore.",
      "If you want a partner who treats SEO as revenue infrastructure — not blog spam — start a project with Ads House. We build the site, the schema, the content system, and the measurement in one programme.",
    ],
  },
  {
    slug: "brand-building-beats-discounting",
    title: "Why brand building beats discounting for Indian D2C",
    excerpt:
      "Sale culture trains customers to wait. Brand building trains them to prefer you. The P&L notices the difference.",
    date: "2026-04-28",
    readTime: "6 min",
    category: "Brand",
    image: "/images/insight-brand.png",
    seoDescription:
      "Why Indian D2C brands should invest in brand building instead of endless discounts. Positioning, creative, and pricing power from Ads House.",
    content: [
      "Indian D2C grew up on coupons. Festive sales, flash deals, influencer codes — they work until they become the only reason anyone buys. Then you do not have a brand. You have a discount habit with a logo.",
      "Brand building is how you escape that loop. It is not a pretty colour palette. It is a reason to pay full price: a point of view, a product story, proof, and consistent creative that makes alternatives feel like a downgrade.",
      "The brands we scale at Ads House usually need three shifts. One: positioning that a customer can repeat. Two: packaging and site design that look like the price. Three: performance creative that leads with desire and proof, not 40% off.",
      "Does brand work slower than ads? The identity sprint is weeks, not years. The compounding happens when paid media, packaging, and CRM all say the same premium thing. That is when CAC stops inflating every festive season.",
      "If your growth only happens when you slash price, the market does not prefer you. It prefers the deal. We help Indian founders reverse that.",
    ],
  },
  {
    slug: "performance-marketing-playbook-d2c-india",
    title: "The performance marketing playbook we use for Indian D2C",
    excerpt:
      "Creative is targeting. Tracking is strategy. Here is how we buy customers profitably on Google and Meta in India.",
    date: "2026-03-09",
    readTime: "7 min",
    category: "Performance",
    image: "/images/insight-performance.png",
    seoDescription:
      "A practical performance marketing playbook for Indian D2C: Google Ads, Meta ads, creative testing, CAC, ROAS, and conversion tracking.",
    content: [
      "Performance marketing in India fails in predictable ways: broad targeting, weak creative, broken pixels, landing pages that take six seconds, and reports that celebrate CTR while CAC quietly dies.",
      "Our playbook starts with unit economics. What can you pay for a customer and still win? If you cannot answer that, you are not ready for scale — you are ready for a strategy sprint.",
      "Next, we rebuild the conversion path. Ads cannot rescue a slow checkout, a confusing offer, or a page that does not match the promise. We align headline, proof, and primary action before we increase budget.",
      "Creative testing is the growth lever. In Meta especially, the hook in the first second is the targeting. We ship batches of ads — UGC, product cinema, founder, proof, offer — and kill losers on a weekly cadence.",
      "On Google, we harvest intent. Search for high-intent terms, Shopping or feed where relevant, YouTube for demand creation that still has a conversion job. Performance Max is a tool, not a strategy.",
      "Measurement has to survive iOS and messy platform ROAS. We use clean UTMs, server-side where possible, and a simple scorecard: spend, CAC, MER, contribution margin. Founders should not need a media degree to know if it is working.",
      "This is the work Ads House does every week for Indian D2C, fintech, food, and education brands. If you want media that buys customers, start a project.",
    ],
  },
  {
    slug: "digital-marketing-agency-in-rohtak",
    title: "How to hire a digital marketing agency in Rohtak (and not get a package)",
    excerpt:
      "Rohtak has no shortage of 'SEO + 30 posts' vendors. Here is how founders should actually evaluate a growth partner in Haryana.",
    date: "2026-07-18",
    readTime: "7 min",
    category: "Local",
    image: "/images/about-team.png",
    seoDescription:
      "How to choose a digital marketing agency in Rohtak, Haryana: SEO, Google Ads, branding, websites, and the questions that separate a growth partner from a package vendor.",
    content: [
      "Search 'digital marketing agency in Rohtak' and you will find the same promise on twenty sites: SEO, Google Ads, social media, 'guaranteed ranking'. Most of those pages were written to rank, not to run an account. If you are a founder in Rohtak, Hisar, Sonipat, or the NCR belt, the hire is too expensive to get wrong.",
      "Start with the bottleneck, not the service list. If nobody can find you on Google Maps, you need local SEO and a Google Business Profile that matches your NAP — not 30 Instagram posts. If people find you and do not enquire, you need the website and the offer. If enquiries exist and sales are thin, you may need positioning, not more ads. Ads House diagnoses that before we sell a retainer.",
      "Ask to see measurement. A serious agency in Rohtak should talk in leads, CAC, ROAS, and revenue — and show how tracking is set up. Vanity dashboards (reach, likes, 'traffic up 200%' with no conversions) are how retainers quietly die.",
      "Ask who actually does the work. Many local vendors outsource ads to a nameless media buyer and SEO to a content mill. You want a team that can sit in Rohtak, understand the operation, and still buy Google and Meta at the same quality as a metro agency.",
      "Do not buy '#1 on Google guaranteed'. Google does not sell positions to agencies. What you can buy is technical SEO, honest content, local pack hygiene, and paid search that harvests demand while organic compounds.",
      "If you want a digital marketing agency in Rohtak that treats growth as a system — brand, SEO, ads, and the website together — start a project with Ads House. We are based here. We also run pan-India campaigns from this studio.",
    ],
  },
  {
    slug: "seo-vs-google-ads-india",
    title: "SEO vs Google Ads in India: what to fund first",
    excerpt:
      "Rent the click or own the query? Most Indian brands need both — but not in the same week, and not with the same brief.",
    date: "2026-05-21",
    readTime: "6 min",
    category: "SEO",
    image: "/images/service-performance.png",
    seoDescription:
      "SEO vs Google Ads in India: when to invest in organic search, when to buy traffic, and how Ads House sequences both for CAC and pipeline.",
    content: [
      "Indian founders often treat SEO and Google Ads as rival religions. They are not. One owns demand over time. The other rents it this week. The mistake is funding the wrong one for the stage you are in.",
      "Fund Google Ads first when the offer is proven, tracking works, and you need pipeline before organic can compound — launches, seasonal peaks, high-CPC categories where page-one is owned by giants. Ads House will not scale spend until the landing page and conversion event are honest.",
      "Fund SEO first when you already have some demand, a site that can rank (speed, SSR, crawlable HTML), and a category with searchable intent you can win — local services in Rohtak and Haryana, specialised B2B, programme pages, product education. SEO is slower and cheaper per lead once it works.",
      "The compounding model: use ads to learn which queries convert, then build SEO pages for those terms. Use SEO content to lower blended CAC so you are not rented forever. That is the sequence we run for D2C, edtech, and service brands.",
      "If a vendor tells you to pick only one forever, they are selling the service they have, not the mix you need. Start a project and we will tell you which lever moves first.",
    ],
  },
  {
    slug: "google-ads-agency-india-brief",
    title: "What a good Google Ads agency in India actually does",
    excerpt:
      "Account structure, creative, tracking, and unit economics. Not a weekly screenshot of CTR.",
    date: "2026-02-14",
    readTime: "7 min",
    category: "Performance",
    image: "/images/work-fintech.png",
    seoDescription:
      "What to expect from a Google Ads agency in India: account structure, Performance Max, tracking, CAC, and how Ads House runs paid search.",
    content: [
      "Hiring a Google Ads agency in India should not feel like buying a mystery box. You should know what happens to the account in week one, what 'good' looks like in month three, and which numbers the agency is willing to put next to their name.",
      "Week one is hygiene: conversion tracking that a CFO would trust, search terms that match intent, negatives for the junk India always throws at a new account, and a landing page that matches the ad. If those are broken, more budget is vandalism.",
      "Structure follows intent. High-intent search campaigns harvest. YouTube and Demand Gen create. Performance Max is a tool, not a strategy — we use it when feed, creative, and conversion quality can support it, not because the platform UI suggested it.",
      "Reporting is spend, CAC or CPA, MER, and contribution — not CTR theatre. Indian auctions are noisy. We kill queries and ads on a weekly cadence and tell you why in business language.",
      "Ads House runs Google Ads as part of performance marketing, not as a silo. Creative, the website, and SEO share the same brief. That is how paid search stops fighting the rest of the brand.",
    ],
  },
  {
    slug: "local-seo-india-google-business-profile",
    title: "Local SEO in India: winning the map pack from Rohtak to the metros",
    excerpt:
      "Google Business Profile, NAP consistency, and city pages — the unglamorous work that still sends walk-ins and calls.",
    date: "2026-01-20",
    readTime: "6 min",
    category: "SEO",
    image: "/images/service-web.png",
    seoDescription:
      "Local SEO in India: Google Business Profile, NAP, reviews, and city pages. How Ads House helps Rohtak and metro service businesses rank in the map pack.",
    content: [
      "For clinics, coaches, dealerships, restaurants, and agencies, the local pack is the real homepage. Ranking #4 on a blue link while a competitor owns the map is how you lose the phone call in Rohtak, Gurugram, and Pune alike.",
      "Google Business Profile is not a listing you 'set and forget'. Categories, services, photos, Q&A, products, and review responses are ranking and conversion inputs. The name, address, and phone on the profile must match the website footer and the door. That NAP consistency is still table stakes in 2026.",
      "City pages only help when they are real. A paragraph swapped with a city name is a doorway page and Google treats it like one. Ads House writes location pages around actual service area, industries, and how we work in that market — then links them from the site like a human would.",
      "Reviews are earned, not schema-faked. Do not put a 4.9 aggregate rating in structured data if you cannot show the reviews. Ask happy clients. Reply to the rest. In Haryana as in Mumbai, trust is local.",
      "If you want local SEO that is tied to a website that can rank and a Google profile that can convert, that is a core Ads House programme — starting with our own city, Rohtak, and the markets we serve across India.",
    ],
  },
];

export const faqs = [
  {
    q: "What is Ads House?",
    a: "Ads House is a digital marketing and ads agency in India. We run SEO, Google Ads, Meta ads, branding, websites, and an influencer marketplace. The studio is in Rohtak, Haryana.",
  },
  {
    q: "What services do you offer?",
    a: "Brand building, SEO, performance marketing, marketing strategy, website development, custom software, creative & content, and the Influencer Marketplace. We operate as an end-to-end growth partner, not a single-channel vendor.",
  },
  {
    q: "Who do you work with?",
    a: "Indian brands nationwide — D2C, services, startups, and founder-led companies. In-person briefings happen in Rohtak when useful; campaigns run across India.",
  },
  {
    q: "What is the Influencer Marketplace?",
    a: "A platform to find local influencers by city, niche, followers, and budget — then post campaigns, apply, and collaborate. Businesses can self-serve or hire Ads House to run influencer ads.",
  },
  {
    q: "How much does a digital marketing retainer cost?",
    a: "Retainers typically start where there is enough scope to affect revenue — strategy plus execution. Media spend is separate. We scope after a discovery call so you are not buying a generic package.",
  },
  {
    q: "Do you work with startups and D2C brands?",
    a: "Yes. A large share of our work is D2C, fintech, edtech, and founder-led companies — including national campaigns.",
  },
  {
    q: "Can you build an SEO-optimised website?",
    a: "Yes. We build Next.js websites with server-side rendering, schema markup, Core Web Vitals, and content models designed to rank on Google India.",
  },
  {
    q: "Where are you based?",
    a: "The office is in Rohtak, Haryana. If you want an ads agency, SEO agency, Google Ads agency, or Meta ads agency in Rohtak, that is this studio. The same team runs digital marketing for brands across India.",
  },
  {
    q: "How soon can we start a project?",
    a: "Most engagements begin within two weeks of kickoff. Share your goals via the Start a Project form and we will respond with next steps.",
  },
];

export const serviceHubFaqs = [
  {
    q: "Are you only a Rohtak agency?",
    a: "No. Ads House is a digital marketing and ads agency in India. Rohtak is the studio where the team sits. Campaigns, SEO, and websites run for brands nationwide.",
  },
  {
    q: "Can we hire you for one service only?",
    a: "Yes. Many retainers start with ads, SEO, or the website. We still diagnose the bottleneck so a single service is not asked to fix a different problem.",
  },
  {
    q: "How do you price the work?",
    a: "Scope first, then a retainer or project fee. Media spend, production, and third-party tools are billed separately. We do not sell generic packages.",
  },
  {
    q: "Do you replace an in-house team?",
    a: "Sometimes we are the team. Often we sit with yours: strategy, media, and engineering direction while internal marketers keep day-to-day ownership.",
  },
  {
    q: "What do you need before kickoff?",
    a: "Access to ads accounts and analytics, the current site, and the number you need to move. A written brief beats a long pitch deck.",
  },
];

export const teamPrinciples = [
  {
    title: "Outcomes over output",
    body: "We do not sell hours of posting. We sell movement in the numbers that keep a business alive.",
  },
  {
    title: "One team, one P&L",
    body: "Brand, media, product, and engineering sit in the same argument. That is how campaigns and websites stop contradicting each other.",
  },
  {
    title: "India-native instincts",
    body: "Festive calendars, regional nuance, UPI checkout, WhatsApp intent, metro vs Bharat demand — we plan for the country we work in.",
  },
];

export function getService(slug: string) {
  return services.find((item) => item.slug === slug);
}

export function getCaseStudy(slug: string) {
  return caseStudies.find((item) => item.slug === slug);
}

export function getInsight(slug: string) {
  return insights.find((item) => item.slug === slug);
}
