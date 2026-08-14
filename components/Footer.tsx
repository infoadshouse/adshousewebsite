import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { services } from "@/lib/data";
import { locations } from "@/lib/locations";
import { navLinks, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative mt-8 bg-navy pb-24 text-white md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 lg:grid-cols-5 md:px-8">
        <div>
          <BrandMark variant="light" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/80">
            A digital marketing agency in Rohtak, Haryana. SEO, Google Ads, branding, and websites
            that turn attention into revenue.
          </p>
          <p className="mt-4 text-sm text-white">
            {siteConfig.address.locality}, {siteConfig.address.region}, {siteConfig.address.countryName}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">Explore</p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/80 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">Services</p>
          <ul className="mt-4 space-y-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-sm text-white/80 hover:text-white"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">Locations</p>
          <ul className="mt-4 space-y-2">
            {locations.map((location) => (
              <li key={location.slug}>
                <Link
                  href={`/locations/${location.slug}`}
                  className="text-sm text-white/80 hover:text-white"
                >
                  {location.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <a href={`mailto:${siteConfig.email}`} className="break-all hover:text-white">
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a href={siteConfig.phoneHref} className="hover:text-white">
                {siteConfig.phone}
              </a>
            </li>
            <li>
              {siteConfig.address.locality}, {siteConfig.address.region} {siteConfig.address.postalCode}
              <br />
              {siteConfig.address.countryName}
            </li>
          </ul>
          <div className="mt-5 flex gap-4 text-sm">
            <a href={siteConfig.social.instagram} className="text-white/80 hover:text-white" rel="noreferrer" target="_blank">
              Instagram
            </a>
            <a href={siteConfig.social.linkedin} className="text-white/80 hover:text-white" rel="noreferrer" target="_blank">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-white/70 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} Ads House. All rights reserved. Made in India.</p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link href="/feed.xml" className="hover:text-white">
              RSS
            </Link>
            <span>Digital marketing agency · Rohtak</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
