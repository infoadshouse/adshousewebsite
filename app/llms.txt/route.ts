import { NextResponse } from "next/server";
import { insights } from "@/lib/data";
import { officeAddressLines, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const items = insights
    .map(
      (post) => `## [${post.title}](${siteConfig.url}/insights/${post.slug})
- Date: ${post.date}
- Category: ${post.category}
- Summary: ${post.seoDescription}`,
    )
    .join("\n\n");

  const body = `# ${siteConfig.name}

> ${siteConfig.description}

- Website: ${siteConfig.url}
- Also known as: ${siteConfig.alternateNames.join(", ")}
- Studio: ${officeAddressLines().join(", ")}
- Founded: ${siteConfig.foundingYear}
- Email: ${siteConfig.email}
- Phone: ${siteConfig.phone}

## About
Ads House is a digital marketing and ads agency in India. We run SEO, Google Ads, Meta ads, branding, websites, and an influencer marketplace. The studio is in Rohtak, Haryana; clients are nationwide.

## Services
- Brand building: ${siteConfig.url}/services/brand-building
- Performance marketing: ${siteConfig.url}/services/performance-marketing
- SEO: ${siteConfig.url}/services/seo
- Marketing strategy: ${siteConfig.url}/services/marketing-strategy
- Web development: ${siteConfig.url}/services/web-development
- Custom software: ${siteConfig.url}/services/custom-software
- Creative and content: ${siteConfig.url}/services/creative-content
- Influencer marketplace: ${siteConfig.url}/services/influencer-marketplace

## Marketplace
- Creator marketplace: ${siteConfig.url}/marketplace
- Find creators: ${siteConfig.url}/marketplace/creators
- Campaigns: ${siteConfig.url}/marketplace/campaigns
- Ads House agency on marketplace: ${siteConfig.url}/marketplace/agencies/ads-house

## Primary location
- Studio in Rohtak: ${siteConfig.url}/locations/rohtak

## Insights
${items}

## Optional
- Contact: ${siteConfig.url}/contact
- Work: ${siteConfig.url}/work
`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
