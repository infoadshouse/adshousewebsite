import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const conversationSchema = new Schema(
  {
    participantIds: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      required: true,
      index: true,
    },
    campaignId: { type: Schema.Types.ObjectId, ref: "Campaign", default: null },
    collaborationId: { type: Schema.Types.ObjectId, ref: "Collaboration", default: null },
    lastMessage: { type: String, default: "" },
    lastMessageAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

conversationSchema.index({ participantIds: 1, campaignId: 1 });

export type ConversationDoc = InferSchemaType<typeof conversationSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Conversation: Model<ConversationDoc> =
  (mongoose.models.Conversation as Model<ConversationDoc>) ||
  mongoose.model<ConversationDoc>("Conversation", conversationSchema);
