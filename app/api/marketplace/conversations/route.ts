import { NextResponse } from "next/server";
import { isAuthUser, jsonError, oid, requireApiUser } from "@/lib/marketplace/api";
import { findOrCreateConversation } from "@/lib/marketplace/chat";
import { Conversation } from "@/models/Conversation";
import { User } from "@/models/User";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const user = await requireApiUser(request);
  if (!isAuthUser(user)) return user;
  const conversations = await Conversation.find({ participantIds: user.id })
    .sort({ lastMessageAt: -1 })
    .lean();

  const otherIds = conversations
    .flatMap((c) => c.participantIds.map((id) => String(id)))
    .filter((id) => id !== user.id);
  const users = await User.find({ _id: { $in: otherIds } }).lean();
  const userMap = new Map(users.map((u) => [String(u._id), u]));

  return NextResponse.json({
    ok: true,
    conversations: conversations.map((c) => {
      const otherId = c.participantIds.map(String).find((id) => id !== user.id);
      const other = otherId ? userMap.get(otherId) : null;
      return {
        id: String(c._id),
        campaignId: c.campaignId ? String(c.campaignId) : null,
        collaborationId: c.collaborationId ? String(c.collaborationId) : null,
        lastMessage: c.lastMessage,
        lastMessageAt: c.lastMessageAt,
        other: other ? { id: String(other._id), name: other.name, role: other.role } : null,
      };
    }),
  });
}

export async function POST(request: Request) {
  const user = await requireApiUser(request);
  if (!isAuthUser(user)) return user;
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return jsonError("Invalid body");
  const data = body as Record<string, unknown>;
  const participantId = String(data.participantId ?? "");
  if (!oid(participantId) || participantId === user.id) return jsonError("Invalid participant");

  const conversation = await findOrCreateConversation({
    participantIds: [user.id, participantId],
    campaignId: data.campaignId ? String(data.campaignId) : null,
  });

  return NextResponse.json({ ok: true, conversationId: String(conversation._id) });
}
