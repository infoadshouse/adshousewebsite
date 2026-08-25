import { NextResponse } from "next/server";
import { asString, isAuthUser, jsonError, requireApiUser } from "@/lib/marketplace/api";
import { Conversation } from "@/models/Conversation";
import { Message } from "@/models/Message";

export const runtime = "nodejs";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await requireApiUser(request);
  if (!isAuthUser(user)) return user;
  const { id } = await context.params;
  const conversation = await Conversation.findById(id);
  if (!conversation) return jsonError("Conversation not found", 404);
  if (!conversation.participantIds.map(String).includes(user.id)) return jsonError("Not allowed", 403);

  const messages = await Message.find({ conversationId: conversation._id }).sort({ createdAt: 1 }).limit(200).lean();
  await Message.updateMany(
    { conversationId: conversation._id, readBy: { $ne: user.id } },
    { $addToSet: { readBy: user.id } },
  );

  return NextResponse.json({
    ok: true,
    messages: messages.map((m) => ({
      id: String(m._id),
      senderId: String(m.senderId),
      body: m.body,
      createdAt: m.createdAt,
    })),
  });
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await requireApiUser(request);
  if (!isAuthUser(user)) return user;
  const { id } = await context.params;
  const conversation = await Conversation.findById(id);
  if (!conversation) return jsonError("Conversation not found", 404);
  if (!conversation.participantIds.map(String).includes(user.id)) return jsonError("Not allowed", 403);

  const body = await request.json().catch(() => null);
  const text = asString((body as Record<string, unknown> | null)?.body, 4000);
  if (!text) return jsonError("Message is required");

  const message = await Message.create({
    conversationId: conversation._id,
    senderId: user.id,
    body: text,
    readBy: [user.id],
  });
  conversation.lastMessage = text;
  conversation.lastMessageAt = new Date();
  await conversation.save();

  return NextResponse.json({
    ok: true,
    message: {
      id: String(message._id),
      senderId: String(message.senderId),
      body: message.body,
      createdAt: message.createdAt,
    },
  });
}
