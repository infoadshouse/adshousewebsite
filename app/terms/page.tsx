import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Terms of Use",
  description: "Terms for using the Ads House website and submitting a project enquiry.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Terms", path: "/terms" },
          ]),
          webPageSchema({
            name: "Terms of Use",
            description: "Terms for using the Ads House website.",
            path: "/terms",
          }),
        ]}
      />
      <PageHero
        eyebrow="Legal"
        title="Terms of use"
        description="The ground rules for using adshouse.in and sending us a brief."
      />
      <article className="mx-auto max-w-3xl space-y-6 px-5 pb-24 text-muted md:px-8">
        <p>Last updated: 14 August 2026. Operated by {siteConfig.name}, {siteConfig.address.locality}, India.</p>
        <h2 className="font-display text-2xl font-bold text-sky-dark">The website</h2>
        <p>
          Content on this site is for information. Case studies and metrics describe client work;
          they are not a guarantee of the same result for every brand. Rankings on Google cannot be
          sold or guaranteed.
        </p>
        <h2 className="font-display text-2xl font-bold text-sky-dark">Enquiries</h2>
        <p>
          Submitting a form is not a contract. A paid engagement starts only when both sides agree
          scope, fees, and terms in writing. Media spend, stock, and third-party tools are billed as
          agreed in that paperwork.
        </p>
        <h2 className="font-display text-2xl font-bold text-sky-dark">Contact</h2>
        <p>
          <a className="text-sky hover:underline" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
        </p>
      </article>
    </>
  );
}
