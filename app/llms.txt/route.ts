import { NextResponse } from "next/server";
import { insights } from "@/lib/data";
import { siteConfig } from "@/lib/site";

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
- Studio: ${siteConfig.address.locality}, ${siteConfig.address.region}, India
- Founded: ${siteConfig.foundingYear}
- Email: ${siteConfig.email}
- Phone: ${siteConfig.phone}

## Services
- Brand building: ${siteConfig.url}/services/brand-building
- Performance marketing: ${siteConfig.url}/services/performance-marketing
- SEO: ${siteConfig.url}/services/seo
- Marketing strategy: ${siteConfig.url}/services/marketing-strategy
- Web development: ${siteConfig.url}/services/web-development
- Custom software: ${siteConfig.url}/services/custom-software
- Creative and content: ${siteConfig.url}/services/creative-content

## Primary location
- Digital marketing agency in Rohtak: ${siteConfig.url}/locations/rohtak

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
