import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { services } from "@/lib/data";
import { navLinks, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative mt-8 bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-1">
          <BrandMark variant="light" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/80">
            A growth agency in India. We build brands, launch campaigns, and engineer the digital
            systems that turn attention into revenue.
          </p>
          <p className="mt-4 text-sm text-white">
            {siteConfig.address.locality}, {siteConfig.address.countryName}
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
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a href={siteConfig.phoneHref} className="hover:text-white">
                {siteConfig.phone}
              </a>
            </li>
            <li>
              {siteConfig.address.locality}, {siteConfig.address.region}
              <br />
              {siteConfig.address.countryName}
            </li>
          </ul>
          <div className="mt-5 flex gap-4 text-sm">
            <a href={siteConfig.social.instagram} className="text-white/80 hover:text-white">
              Instagram
            </a>
            <a href={siteConfig.social.linkedin} className="text-white/80 hover:text-white">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-white/70 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} Ads House. All rights reserved. Made in India.</p>
          <p>Digital marketing agency · Rohtak · Pan-India</p>
        </div>
      </div>
    </footer>
  );
}
