"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BrandMark } from "@/components/BrandMark";
import type { AuthUser } from "@/lib/auth";
import { api } from "@/lib/marketplace/client";

export function DashboardShell({ user, children }: { user: AuthUser; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: "/dashboard", label: "Home" },
    { href: "/dashboard/profile", label: "Account" },
    ...(user.role === "admin" ? [{ href: "/dashboard/users", label: "Users" }] : []),
    { href: "/dashboard/campaigns", label: "Campaigns" },
    { href: "/dashboard/applications", label: "Applications" },
    { href: "/dashboard/collaborations", label: "Collaborations" },
    { href: "/dashboard/messages", label: "Messages" },
    { href: "/dashboard/reviews", label: "Reviews" },
    ...(user.role === "agency" ? [{ href: "/dashboard/clients", label: "Clients" }] : []),
  ];

  async function logout() {
    await api("/api/auth/logout", { method: "POST" });
    router.push("/marketplace/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:grid-cols-[220px_1fr] md:px-6">
        <aside className="h-fit rounded-3xl border border-line bg-white p-4">
          <Link href="/marketplace" className="mb-4 block px-2">
            <BrandMark />
          </Link>
          <p className="px-2 text-xs uppercase tracking-wide text-muted">{user.role}</p>
          <p className="px-2 text-sm font-semibold text-sky-dark">{user.name}</p>
          <p className="mb-4 truncate px-2 text-xs text-muted">{user.email}</p>
          <nav className="flex flex-col gap-1">
            {links.map((link) => {
              const active = pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-xl px-3 py-2 text-sm ${active ? "bg-sky/10 font-semibold text-sky" : "text-sky-dark hover:bg-surface"}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-4 space-y-2 border-t border-line pt-4">
            {user.role === "creator" ? (
              <Link href="/marketplace/campaigns" className="block px-3 text-sm text-sky">
                Discover campaigns
              </Link>
            ) : (
              <Link href="/marketplace/creators" className="block px-3 text-sm text-sky">
                Find creators
              </Link>
            )}
            <button type="button" onClick={logout} className="px-3 text-sm font-medium text-pink">
              Sign out
            </button>
          </div>
        </aside>
        <section className="min-w-0 rounded-3xl border border-line bg-white p-5 md:p-8">{children}</section>
      </div>
    </div>
  );
}
