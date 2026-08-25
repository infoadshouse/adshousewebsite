import Link from "next/link";
import { ChatThread } from "@/components/dashboard/ChatThread";
import { requireUser } from "@/lib/auth";

export default async function MessageThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  return (
    <div>
      <Link href="/dashboard/messages" className="text-sm text-sky">
        ← All messages
      </Link>
      <h1 className="mb-4 mt-2 font-display text-3xl font-extrabold text-sky-dark">Chat</h1>
      <ChatThread conversationId={id} userId={user.id} />
    </div>
  );
}
