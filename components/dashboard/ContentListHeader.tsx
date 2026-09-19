"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/marketplace/client";

export function DeleteContentButton({
  href,
  redirectTo,
}: {
  href: string;
  redirectTo: string;
}) {
  const router = useRouter();
  return (
    <button
      type="button"
      className="text-sm font-semibold text-pink"
      onClick={async () => {
        if (!confirm("Delete this item?")) return;
        await api(href, { method: "DELETE" });
        router.push(redirectTo);
        router.refresh();
      }}
    >
      Delete
    </button>
  );
}

export function ContentListHeader({
  title,
  href,
  action,
}: {
  title: string;
  href: string;
  action: string;
}) {
  return (
    <div className="mb-6 flex items-center justify-between gap-3">
      <h1 className="font-display text-3xl font-extrabold text-sky-dark">{title}</h1>
      <Link href={href} className="btn-primary rounded-full px-4 py-2 text-sm font-semibold">
        {action}
      </Link>
    </div>
  );
}
