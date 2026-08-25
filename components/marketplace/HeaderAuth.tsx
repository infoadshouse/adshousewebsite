"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/marketplace/client";

type Me = { id: string; name: string; email: string; role: string };

export function HeaderAuth() {
  const [user, setUser] = useState<Me | null | undefined>(undefined);

  useEffect(() => {
    api<{ user: Me | null }>("/api/auth/me")
      .then((data) => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  if (user === undefined) {
    return (
      <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-muted">…</span>
    );
  }

  if (user) {
    return (
      <Link
        href="/dashboard"
        className="text-[12px] font-bold uppercase tracking-[0.16em] text-sky-dark hover:text-sky"
      >
        {user.name.split(" ")[0]} · Dashboard
      </Link>
    );
  }

  return (
    <Link
      href="/marketplace/login"
      className="text-[12px] font-bold uppercase tracking-[0.16em] text-sky-dark hover:text-sky"
    >
      Sign in
    </Link>
  );
}
