"use client";

import { Footer } from "@/components/Footer";
import { usePathname } from "next/navigation";

export function FooterGate() {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard")) return null;
  return <Footer />;
}
