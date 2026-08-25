import { Conversation } from "@/models/Conversation";
import { Message } from "@/models/Message";
import mongoose from "mongoose";

export async function findOrCreateConversation(opts: {
  participantIds: string[];
  campaignId?: string | null;
  collaborationId?: string | null;
  firstMessage?: { senderId: string; body: string };
}) {
  const ids = opts.participantIds.map((id) => new mongoose.Types.ObjectId(id)).sort((a, b) => String(a).localeCompare(String(b)));
  const filter: Record<string, unknown> = {
    participantIds: { $all: ids, $size: ids.length },
  };
  if (opts.campaignId) filter.campaignId = new mongoose.Types.ObjectId(opts.campaignId);

  let conversation = await Conversation.findOne(filter);
  if (!conversation) {
    conversation = await Conversation.create({
      participantIds: ids,
      campaignId: opts.campaignId ?? null,
      collaborationId: opts.collaborationId ?? null,
      lastMessage: opts.firstMessage?.body ?? "",
      lastMessageAt: new Date(),
    });
  } else if (opts.collaborationId && !conversation.collaborationId) {
    conversation.collaborationId = new mongoose.Types.ObjectId(opts.collaborationId);
    await conversation.save();
  }

  if (opts.firstMessage) {
    await Message.create({
      conversationId: conversation._id,
      senderId: opts.firstMessage.senderId,
      body: opts.firstMessage.body,
      readBy: [opts.firstMessage.senderId],
    });
    conversation.lastMessage = opts.firstMessage.body;
    conversation.lastMessageAt = new Date();
    await conversation.save();
  }

  return conversation;
}
