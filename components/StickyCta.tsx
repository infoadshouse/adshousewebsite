"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function StickyCta() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 md:bottom-8 md:right-8">
      <Link
        href="/contact"
        className="btn-primary flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-lg"
      >
        Start a Project
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
