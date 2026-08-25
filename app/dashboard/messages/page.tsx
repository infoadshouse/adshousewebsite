import { Suspense } from "react";
import { MessagesInbox } from "@/components/dashboard/MessagesInbox";
import { requireUser } from "@/lib/auth";

export default async function MessagesPage() {
  await requireUser();
  return (
    <div>
      <h1 className="mb-6 font-display text-3xl font-extrabold text-sky-dark">Messages</h1>
      <Suspense>
        <MessagesInbox />
      </Suspense>
    </div>
  );
}
