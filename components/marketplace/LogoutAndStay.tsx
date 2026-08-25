"use client";

import { useState } from "react";
import { api } from "@/lib/marketplace/client";

export function LogoutAndStay() {
  const [pending, setPending] = useState(false);

  async function signOut() {
    setPending(true);
    try {
      await api("/api/auth/logout", { method: "POST" });
      window.location.assign("/marketplace/login");
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={signOut}
      disabled={pending}
      className="inline-flex w-full items-center justify-center rounded-full border border-line px-6 py-3 text-sm font-semibold text-sky-dark"
    >
      {pending ? "Signing out…" : "Sign out and use another account"}
    </button>
  );
}
