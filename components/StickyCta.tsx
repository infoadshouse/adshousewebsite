"use client";

import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";

export function StickyCta() {
  const pathname = usePathname();
  if (pathname === "/contact" || pathname.startsWith("/dashboard")) return null;

  return (
    <a
      href={siteConfig.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full text-[#1a1408] shadow-[0_14px_36px_rgba(212,175,55,0.38)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(212,175,55,0.5)] md:bottom-8 md:right-8"
      style={{
        background: "linear-gradient(145deg, #f8edd2 0%, #e4c56a 42%, #d4af37 68%, #8d6b1f 100%)",
      }}
    >
      <span className="sr-only">WhatsApp</span>
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.41a10.1 10.1 0 0 0 4.65 1.12h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2Zm5.76 13.95c-.24.68-1.4 1.3-1.95 1.38-.5.07-1.13.1-1.82-.11-.42-.13-.95-.31-1.64-.6-2.88-1.24-4.76-4.14-4.9-4.33-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09 1-2.37.24-.26.64-.38.85-.38.21 0 .42 0 .6.01.19.01.45-.07.7.54.26.64.87 2.2.95 2.36.08.16.13.35.03.56-.1.21-.16.34-.31.53-.16.18-.33.41-.47.55-.16.16-.32.33-.14.64.19.31.83 1.37 1.78 2.22 1.23 1.09 2.26 1.43 2.58 1.59.32.16.51.13.7-.08.19-.21.8-.93 1.01-1.25.21-.32.42-.26.7-.16.29.1 1.84.87 2.16 1.03.32.16.53.24.61.37.08.13.08.75-.16 1.43Z" />
      </svg>
    </a>
  );
}
