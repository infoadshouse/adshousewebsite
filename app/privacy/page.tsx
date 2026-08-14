import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: `How Ads House collects, uses, and protects enquiry data on ${siteConfig.url.replace("https://", "")}.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Privacy", path: "/privacy" },
          ]),
          webPageSchema({
            name: "Privacy Policy",
            description: "Ads House privacy policy for website visitors and project enquiries.",
            path: "/privacy",
          }),
        ]}
      />
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        description="How we handle the information you share when you visit Ads House or start a project."
      />
      <article className="mx-auto max-w-3xl space-y-6 px-5 pb-24 text-muted md:px-8">
        <p>Last updated: 14 August 2026. Controller: {siteConfig.name}, {siteConfig.address.locality}, {siteConfig.address.region}, India.</p>
        <h2 className="font-display text-2xl font-bold text-sky-dark">What we collect</h2>
        <p>
          If you submit the project form, we collect your name, work email, phone, company, service
          interest, budget range, and the brief you write. Server logs may include IP address and
          browser type for security. If analytics is enabled, we use aggregated traffic data.
        </p>
        <h2 className="font-display text-2xl font-bold text-sky-dark">How we use it</h2>
        <p>
          Enquiry data is used only to respond to your request, scope work, and — if we partner —
          deliver the engagement. We do not sell personal data. We do not run third-party ad
          retargeting from this form unless you later agree in a paid media brief.
        </p>
        <h2 className="font-display text-2xl font-bold text-sky-dark">Contact</h2>
        <p>
          Questions:{" "}
          <a className="text-sky hover:underline" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>{" "}
          or {siteConfig.phone}.
        </p>
      </article>
    </>
  );
}
