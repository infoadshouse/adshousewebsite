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
  points: { title: string; body: string }[];
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
  { name: "Velora", className: "tracking-[0.22em] font-light" },
  { name: "NexPay", className: "font-extrabold tracking-tight" },
  { name: "Lumora", className: "font-semibold tracking-tight" },
  { name: "BiteKart", className: "font-bold lowercase tracking-tight text-[#1d4ed8]" },
  { name: "Learnly", className: "font-extrabold tracking-wide" },
  { name: "Northstar", className: "font-black tracking-tight text-[#e11d48]" },
] as const;

export const resultMetrics = [
  { value: 187, suffix: "%", label: "Avg. qualified lead lift", detail: "Across repositioned D2C brands in 90 days." },
  { value: 6.4, suffix: "x", label: "Peak campaign ROAS", detail: "Paid media for a fintech app launch.", decimals: 1 },
  { value: 240, suffix: "%", label: "Revenue growth", detail: "Skincare brand, 12-month growth partnership." },
  { value: 41, suffix: "%", label: "Lower CAC", detail: "Food brand after creative + funnel rebuild." },
  { value: 3.2, suffix: "x", label: "Organic traffic", detail: "Edtech SEO programme, 8 months.", decimals: 1 },
  { value: 92, suffix: "%", label: "Client retention", detail: "Brands that stay beyond the first campaign." },
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
      "Ads House is a brand building agency in India. We create positioning, identity systems, and brand strategy that help Indian businesses stand out and command premium pricing.",
    intro:
      "Most Indian brands are louder than they are clearer. We fix that. Brand building at Ads House is commercial work: category positioning, visual identity, verbal identity, and a story the market can repeat. If it does not help you win deals, raise prices, or earn loyalty, it is decoration.",
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
  },
  {
    slug: "performance-marketing",
    title: "Performance Marketing",
    short: "Media that buys customers, not just clicks.",
    outcome: "Predictable pipeline from Google, Meta, and high-intent Indian demand.",
    image: "/images/service-performance.png",
    icon: "▲",
    h1: "Performance Marketing Agency in India",
    seoTitle: "Performance Marketing Agency in India",
    seoDescription:
      "Hire a performance marketing agency in India. Ads House runs Google Ads, Meta ads, and conversion campaigns that lower CAC and grow revenue across Indian metros.",
    intro:
      "India is one of the most competitive paid-media markets in the world. Cheap traffic is easy. Profitable traffic is a craft. We plan, buy, and creative-test campaigns around unit economics — CAC, ROAS, LTV — so every rupee has a job.",
    points: [
      {
        title: "Google Ads & Performance Max",
        body: "Search, Shopping, YouTube, and Demand Gen built around high-intent Indian queries and clean conversion tracking.",
      },
      {
        title: "Meta & quick-commerce ads",
        body: "Creative-led acquisition on Instagram, Facebook, and emerging commerce placements — tested weekly, not quarterly.",
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
    seoTitle: "SEO Agency in India | Rohtak & Pan-India",
    seoDescription:
      "Ads House is an SEO agency in India, based in Rohtak. Technical SEO, content clusters, local SEO, and Google Business Profile work that ranks and converts.",
    intro:
      "SEO in India is not a US playbook with rupees swapped in. Queries are bilingual, competition is ruthless, and a slow website is invisible. Ads House builds search architecture for Google.in: commercial keyword clusters, Core Web Vitals, schema, local pack visibility for Rohtak and other cities, and content that a practitioner could have written. If it does not create pipeline, it is a hobby.",
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
      "Ads House builds marketing strategy for Indian brands: positioning, channel mix, offers, and 90-day growth roadmaps that connect brand, performance, and product.",
    intro:
      "Strategy is not a 90-slide workshop. It is a set of choices: who you serve, what you say, where you show up, and what you will not do. We build marketing strategy that sales, product, and founders can run without us in the room.",
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
      "Ads House builds fast, SEO-ready websites for Indian brands using Next.js. Conversion-focused web development for agencies, D2C, SaaS, and service businesses.",
    intro:
      "A website is not a brochure. It is your hardest-working salesperson. We design and engineer sites on Next.js with server-side rendering, Core Web Vitals discipline, and SEO architecture built for Google.in — then we wire every page to a conversion goal.",
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
      "Custom software development in India by Ads House: CRMs, booking engines, dashboards, and digital products engineered to grow with your marketing.",
    intro:
      "Campaigns stall when the product or the ops stack cannot keep up. We build the software around the growth motion — lead systems, client portals, booking engines, dashboards — so marketing is not pouring demand into a leaky bucket.",
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
      "Ads House is a creative and content agency in India producing campaign films, performance ads, social content, and brand stories that convert.",
    intro:
      "Creative is not a moodboard. In paid social, creative is the targeting. We produce brand films, statics, UGC-style ads, and always-on content with a simple brief: stop the thumb, then move the number.",
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
    ],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "velora-fashion",
    client: "Velora",
    industry: "Fashion / D2C",
    location: "Mumbai",
    title: "From invisible boutique to a lead-generating fashion house",
    challenge:
      "A premium Indian fusion label had a beautiful product and a website that nobody could find. Paid ads sent traffic to a slow catalogue. Qualified enquiries were stuck.",
    solution:
      "We repositioned Velora as occasion-wear with a point of view, rebuilt the site on Next.js, and launched a creative-led Meta + Google campaign with lookbooks that actually converted.",
    result: "Qualified leads up 187% in 90 days. Return rate down. Average order value up.",
    metric: "+187%",
    metricLabel: "qualified leads",
    image: "/images/work-fashion.png",
    year: "2026",
    services: ["Brand Building", "Web Development", "Performance Marketing"],
    stats: [
      { label: "Qualified leads", value: "+187%" },
      { label: "Site conversion", value: "2.1% → 4.8%" },
      { label: "Paid ROAS", value: "4.6x" },
    ],
    story: [
      "Velora had craft. The market could not see it. Search ranked generic saree aggregators. Social looked like every other festive dump of product flat-lays.",
      "We tightened positioning around modern occasion-wear for working women in metros, rebuilt information architecture around occasions not SKUs, and shot a campaign that felt like cinema, not a catalogue.",
      "Performance creative and a faster site did the rest. The same media budget started producing sales conversations instead of bounce.",
    ],
  },
  {
    slug: "nexpay-fintech",
    client: "NexPay",
    industry: "Fintech",
    location: "Bengaluru",
    title: "A fintech launch that paid for itself in week six",
    challenge:
      "A new payments product needed users in a category owned by giants. The founder was burning cash on broad awareness with no activation loop.",
    solution:
      "We rebuilt the acquisition funnel around one job-to-be-done, launched high-intent search plus YouTube, and shipped an onboarding flow the ads could honestly promise.",
    result: "6.4x ROAS at peak. Cost per activated user down 53%.",
    metric: "6.4x",
    metricLabel: "campaign ROAS",
    image: "/images/work-fintech.png",
    year: "2026",
    services: ["Marketing Strategy", "Performance Marketing", "Custom Software"],
    stats: [
      { label: "Peak ROAS", value: "6.4x" },
      { label: "CPA drop", value: "-53%" },
      { label: "Activation rate", value: "+38%" },
    ],
    story: [
      "Fintech in India is noisy and distrust-heavy. We stopped selling 'the future of payments' and started selling a specific outcome for a specific merchant.",
      "Creative led with proof and speed. Landing pages matched the promise. Onboarding was shortened from 14 fields to the minimum the product actually needed.",
      "Once unit economics worked in Bengaluru and Hyderabad, we scaled lookalikes without letting creative fatigue kill the account.",
    ],
  },
  {
    slug: "lumora-skincare",
    client: "Lumora",
    industry: "Beauty / D2C",
    location: "Delhi NCR",
    title: "A skincare brand that stopped discounting its way to growth",
    challenge:
      "Lumora was addicted to 40% off. Revenue existed. Margin and brand equity did not. Repeat purchase was weak.",
    solution:
      "We rebuilt the brand story around clinical-luxe Indian botanicals, created a content engine, and shifted acquisition from coupon-led to proof-led creative.",
    result: "Revenue +240% in 12 months with fewer discount days.",
    metric: "+240%",
    metricLabel: "revenue growth",
    image: "/images/work-skincare.png",
    year: "2026",
    services: ["Brand Building", "Creative & Content", "Performance Marketing"],
    stats: [
      { label: "Revenue", value: "+240%" },
      { label: "Repeat rate", value: "+29%" },
      { label: "Discount days", value: "-44%" },
    ],
    story: [
      "Discounting had trained the Lumora audience to wait. We changed the story, the packaging language, and the ads so the product felt worth full price.",
      "UGC-style routines, dermatologist proof, and a quieter, more premium site replaced screaming sale banners.",
      "Paid media was restructured around first-purchase profitability plus a CRM sequence that earned the second order.",
    ],
  },
  {
    slug: "bitekart-food",
    client: "BiteKart",
    industry: "Food / QSR",
    location: "Pune",
    title: "Lower CAC without starving the kitchens",
    challenge:
      "A fast-growing cloud kitchen network was paying too much for every order. Creative was generic. The website and app store pages leaked intent.",
    solution:
      "We rebuilt local campaign structure city by city, shot food that looked craveable, and fixed conversion on landing pages and WhatsApp ordering.",
    result: "Customer acquisition cost down 41% while order volume grew.",
    metric: "-41%",
    metricLabel: "customer acquisition cost",
    image: "/images/work-food.png",
    year: "2026",
    services: ["Performance Marketing", "Creative & Content", "Web Development"],
    stats: [
      { label: "CAC", value: "-41%" },
      { label: "Order volume", value: "+62%" },
      { label: "App CVR", value: "+33%" },
    ],
    story: [
      "National ads were wasting spend in cities where BiteKart had no density. We flipped to geo-true campaigns and menu-led creative.",
      "Photography did the heavy lifting. If the food does not look inevitable, no amount of bidding will save the account.",
      "A faster ordering path on mobile closed the leak between craving and checkout.",
    ],
  },
  {
    slug: "learnly-edtech",
    client: "Learnly",
    industry: "Edtech",
    location: "Hyderabad",
    title: "Organic demand that no longer depended on ads alone",
    challenge:
      "Learnly's paid pipeline was expensive and seasonal. Organic search was an afterthought. Category keywords were owned by giants.",
    solution:
      "We built a topic cluster strategy around career outcomes, rewrote programme pages, and paired SEO with YouTube explainers and a faster site.",
    result: "Organic traffic 3.2x in eight months. Demo requests from search became a real channel.",
    metric: "3.2x",
    metricLabel: "organic traffic",
    image: "/images/work-edtech.png",
    year: "2026",
    services: ["Marketing Strategy", "Web Development", "Creative & Content"],
    stats: [
      { label: "Organic traffic", value: "3.2x" },
      { label: "Keyword page-one", value: "86" },
      { label: "Demo from SEO", value: "+214%" },
    ],
    story: [
      "Edtech SEO in India is a long game against well-funded incumbents. We did not chase every keyword. We chased intent that converts to a counselling call.",
      "Programme pages were rebuilt around outcomes, faculty proof, and placement narratives. Blog clusters supported those pages instead of living as orphan traffic.",
      "Technical SEO and SSR made the content eligible to rank. The content made it worth ranking.",
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Ananya Mehta",
    role: "Founder",
    company: "Velora",
    quote:
      "We did not need another agency that 'posted content'. We needed a partner who could reposition us and then prove it in the numbers. Qualified leads nearly doubled in a quarter.",
    result: "+187% qualified leads",
    image: "/images/testimonial-1.png",
  },
  {
    name: "Rohan Iyer",
    role: "CEO",
    company: "NexPay",
    quote:
      "Ads House treated unit economics as the brief. The launch creative was sharp, the funnel was honest, and we hit a ROAS we could take to the board.",
    result: "6.4x peak ROAS",
    image: "/images/testimonial-2.png",
  },
  {
    name: "Sara Kapoor",
    role: "CMO",
    company: "Lumora",
    quote:
      "They broke our discount addiction and grew revenue anyway. That is the difference between a media buyer and a growth partner.",
    result: "+240% revenue in 12 months",
    image: "/images/testimonial-3.png",
  },
];

export const insights: Insight[] = [
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
    q: "Which is the best digital marketing agency in India?",
    a: "The best agency is the one that can move your numbers — leads, CAC, ROAS, revenue — not the one with the longest service list. Ads House is a Rohtak-based growth agency serving brands across India with branding, SEO, performance marketing, web, and software in one team.",
  },
  {
    q: "Is Ads House a digital marketing agency in Rohtak?",
    a: "Yes. Ads House is headquartered in Rohtak, Haryana — our only office. We work with local businesses across Haryana and with brands across India from this studio.",
  },
  {
    q: "What services does Ads House offer?",
    a: "Brand building, SEO, performance marketing (Google Ads and Meta ads), marketing strategy, website development, custom software, and creative & content. We operate as an end-to-end growth partner, not a single-channel vendor.",
  },
  {
    q: "How much does a digital marketing agency in India cost?",
    a: "Retainers typically start where there is enough scope to affect revenue — strategy plus execution. Media spend is separate. We scope after a discovery call so you are not buying a generic package that does not fit.",
  },
  {
    q: "Do you work with startups and D2C brands?",
    a: "Yes. A large share of our work is D2C, fintech, edtech, and founder-led companies — run from our Rohtak studio, including national campaigns.",
  },
  {
    q: "Can you build an SEO-optimised website?",
    a: "Yes. We build Next.js websites with server-side rendering, schema markup, Core Web Vitals, and content models designed to rank on Google India.",
  },
  {
    q: "Do you offer SEO and Google Ads from Rohtak?",
    a: "Yes. SEO and Google Ads are core services. Local businesses in Rohtak and Haryana, and national brands, get the same technical and media discipline.",
  },
  {
    q: "Which cities does Ads House serve?",
    a: "Our office is in Rohtak, Haryana. From this studio we run campaigns for local businesses and for brands across India.",
  },
  {
    q: "How soon can we start a project?",
    a: "Most engagements begin within two weeks of kickoff. Share your goals via the Start a Project form and we will respond with next steps.",
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
