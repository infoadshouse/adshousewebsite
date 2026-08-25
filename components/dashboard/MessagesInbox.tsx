"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/marketplace/client";

type Conversation = {
  id: string;
  lastMessage: string;
  lastMessageAt: string;
  other: { id: string; name: string; role: string } | null;
};

export function MessagesInbox() {
  const router = useRouter();
  const params = useSearchParams();
  const [rows, setRows] = useState<Conversation[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const withUser = params.get("with");
    const campaign = params.get("campaign");
    if (withUser) {
      api<{ conversationId: string }>("/api/marketplace/conversations", {
        method: "POST",
        json: { participantId: withUser, campaignId: campaign },
      })
        .then((data) => router.replace(`/dashboard/messages/${data.conversationId}`))
        .catch((err: Error) => setError(err.message));
      return;
    }
    api<{ conversations: Conversation[] }>("/api/marketplace/conversations")
      .then((data) => setRows(data.conversations))
      .catch((err: Error) => setError(err.message));
  }, [params, router]);

  if (error) return <p className="text-pink">{error}</p>;

  return (
    <ul className="space-y-2">
      {rows.map((row) => (
        <li key={row.id}>
          <Link href={`/dashboard/messages/${row.id}`} className="block rounded-2xl border border-line p-4 hover:border-sky/40">
            <p className="font-semibold text-sky-dark">{row.other?.name ?? "Conversation"}</p>
            <p className="truncate text-sm text-muted">{row.lastMessage}</p>
          </Link>
        </li>
      ))}
      {rows.length === 0 ? <p className="text-muted">No messages yet. Apply or collaborate to start a thread.</p> : null}
    </ul>
  );
}
