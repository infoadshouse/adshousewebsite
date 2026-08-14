"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function StickyCta() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:inset-x-auto md:bottom-8 md:right-8 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
      <Link
        href="/contact"
        className="btn-primary flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-lg md:w-auto"
      >
        Start a Project
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
