"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { navLinks, siteConfig } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-white text-sky-dark transition-shadow duration-300 ${
          scrolled || open ? "border-b border-line shadow-sm" : "border-b border-transparent"
        }`}
      >
        <div className="hidden border-b border-line bg-surface md:block">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 md:px-8">
            <div className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-muted">
              <a href={siteConfig.phoneHref} className="inline-flex items-center gap-2 hover:text-sky">
                <IconCircle>
                  <PhoneIcon />
                </IconCircle>
                <span className="whitespace-nowrap">{siteConfig.phone}</span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex min-w-0 max-w-full items-center gap-2 hover:text-sky"
              >
                <IconCircle>
                  <MailIcon />
                </IconCircle>
                <span className="truncate">{siteConfig.email}</span>
              </a>
            </div>
            <div className="flex items-center gap-3">
              <SocialLink href={siteConfig.social.instagram} label="Instagram">
                <InstagramIcon />
              </SocialLink>
              <SocialLink href={siteConfig.social.linkedin} label="LinkedIn">
                <LinkedInIcon />
              </SocialLink>
              <SocialLink href={siteConfig.social.x} label="X">
                <XIcon />
              </SocialLink>
              <SocialLink href={siteConfig.social.threads} label="Threads">
                <ThreadsIcon />
              </SocialLink>
              <SocialLink href={siteConfig.social.youtube} label="YouTube">
                <YouTubeIcon />
              </SocialLink>
            </div>
          </div>
        </div>

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 md:h-20 md:px-8">
          <Link href="/" className="relative z-50 min-w-0" aria-label="Ads House home">
            <BrandMark priority />
          </Link>

          <nav className="hidden items-center gap-3 lg:flex xl:gap-6" aria-label="Primary">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative pb-1 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors xl:text-[12px] xl:tracking-[0.18em] ${
                    active ? "text-sky-dark" : "text-muted hover:text-sky"
                  }`}
                >
                  {link.label}
                  {active ? (
                    <span className="absolute inset-x-0 -bottom-0.5 h-px bg-sky" />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="hidden shrink-0 lg:block">
            <Link
              href="/contact"
              className="btn-primary inline-flex items-center rounded-full px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.16em]"
            >
              Get in Touch
            </Link>
          </div>

          <button
            type="button"
            className="relative z-50 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-5 bg-sky-dark transition ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span className={`block h-0.5 w-5 bg-sky-dark transition ${open ? "opacity-0" : ""}`} />
              <span
                className={`block h-0.5 w-5 bg-sky-dark transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </header>

      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-40 overflow-y-auto bg-white px-5 pb-10 pt-20 md:pt-36 lg:hidden"
        >
          <nav className="flex flex-col" aria-label="Mobile">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`border-b border-line py-4 text-2xl font-semibold tracking-tight ${
                    active ? "text-sky" : "text-sky-dark"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-8 space-y-3 text-sm text-muted">
            <a href={siteConfig.phoneHref} className="flex items-center gap-3 break-all hover:text-sky">
              <IconCircle>
                <PhoneIcon />
              </IconCircle>
              {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 break-all hover:text-sky">
              <IconCircle>
                <MailIcon />
              </IconCircle>
              {siteConfig.email}
            </a>
          </div>
          <div className="mt-6 flex gap-4">
            <SocialLink href={siteConfig.social.instagram} label="Instagram">
              <InstagramIcon />
            </SocialLink>
            <SocialLink href={siteConfig.social.linkedin} label="LinkedIn">
              <LinkedInIcon />
            </SocialLink>
            <SocialLink href={siteConfig.social.x} label="X">
              <XIcon />
            </SocialLink>
            <SocialLink href={siteConfig.social.threads} label="Threads">
              <ThreadsIcon />
            </SocialLink>
            <SocialLink href={siteConfig.social.youtube} label="YouTube">
              <YouTubeIcon />
            </SocialLink>
          </div>
          <Link
            href="/contact"
            className="btn-primary mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-4 text-sm font-bold uppercase tracking-[0.16em]"
          >
            Get in Touch
          </Link>
        </div>
      ) : null}
    </>
  );
}

function IconCircle({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-sky text-sky">
      {children}
    </span>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="inline-flex h-9 w-9 items-center justify-center text-sky transition hover:text-sky-dark"
    >
      {children}
    </a>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.2 2.4c.3-.3.8-.4 1.2-.2l1.8 1c.4.2.6.6.5 1.1L6.4 6c1.2 2 2.6 3.4 4.6 4.6l1.7-.3c.4-.1.9.1 1.1.5l1 1.8c.2.4.1.9-.2 1.2l-1 1c-.4.4-1 .5-1.5.3C7.6 13.8 2.2 8.4 1.1 3.9c-.2-.6 0-1.2.3-1.5l1.8-1Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2" y="3.5" width="12" height="9" rx="1.4" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3 4.5 8 8.4 13 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2.2" y="2.2" width="11.6" height="11.6" rx="3.2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="8" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="11.4" cy="4.6" r="0.7" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M3.6 6.4h2.1v7H3.6v-7Zm1-3.3c.7 0 1.2.5 1.2 1.2S5.3 5.5 4.6 5.5 3.4 5 3.4 4.3s.5-1.2 1.2-1.2ZM7.2 6.4h2v1c.4-.7 1.2-1.2 2.3-1.2 2.1 0 2.5 1.4 2.5 3.2v4h-2.1V10c0-1.1 0-2.5-1.5-2.5s-1.7 1.2-1.7 2.4v3.5H7.2v-7Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M9.4 6.8 14.2 1.5h-1.1L8.9 6l-3.4-4.5H2l5.1 6.7L2 14.5h1.1L7.3 9l3.7 5.5H14L9.4 6.8Zm-1.5 1.7-.5-.7-4-5.4h1.7l3.2 4.4.5.7 4.2 5.7h-1.7L7.9 8.5Z" />
    </svg>
  );
}

function ThreadsIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M11.18 7.05c-.12-2.05-1.24-3.32-3.3-3.32-2.36 0-3.72 1.74-3.72 4.62s1.36 4.62 3.72 4.62c1.66 0 2.7-.77 3.2-1.96.2.64.27 1.35.27 1.96 0 3.07-1.74 4.63-4.3 4.63-1.26 0-2.37-.36-3.26-.97l-.56 1.35c1.05.7 2.34 1.1 3.82 1.1 3.3 0 5.57-1.97 5.57-5.9V8c.82.55 1.45 1.4 1.8 2.38l1.42-.5c-.48-1.4-1.4-2.52-2.57-3.2.07-.55.1-1.1 0-1.66h-1.47c.08.36.12.74.12 1.12 0 .36-.03.7-.1.98h-.64Zm-3.3 5.5c-1.6 0-2.52-1.26-2.52-3.35s.92-3.35 2.52-3.35c1.55 0 2.3.98 2.5 2.24-.7.28-1.18.86-1.18 1.54 0 .72.55 1.4 1.26 1.57-.36.82-1.1 1.35-2.58 1.35Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="1.5" y="4" width="13" height="8" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 6.4 10.2 8 7 9.6V6.4Z" fill="currentColor" />
    </svg>
  );
}
