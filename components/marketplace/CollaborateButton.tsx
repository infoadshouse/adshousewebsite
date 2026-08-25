"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/marketplace/client";

export function CollaborateButton({ userId }: { userId: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function start() {
    setPending(true);
    setError("");
    try {
      const data = await api<{ conversationId: string }>("/api/marketplace/conversations", {
        method: "POST",
        json: { participantId: userId },
      });
      router.push(`/dashboard/messages/${data.conversationId}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not start chat";
      if (message.includes("Sign in")) router.push("/marketplace/login?next=/dashboard/messages");
      else setError(message);
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={start}
        disabled={pending}
        className="btn-primary inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold disabled:opacity-60"
      >
        {pending ? "Opening chat…" : "Message creator"}
      </button>
      {error ? <p className="mt-2 text-sm text-pink">{error}</p> : null}
    </div>
  );
}
