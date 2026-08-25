import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const messageSchema = new Schema(
  {
    conversationId: { type: Schema.Types.ObjectId, ref: "Conversation", required: true, index: true },
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    body: { type: String, required: true },
    readBy: { type: [{ type: Schema.Types.ObjectId, ref: "User" }], default: [] },
  },
  { timestamps: true },
);

messageSchema.index({ conversationId: 1, createdAt: 1 });

export type MessageDoc = InferSchemaType<typeof messageSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Message: Model<MessageDoc> =
  (mongoose.models.Message as Model<MessageDoc>) ||
  mongoose.model<MessageDoc>("Message", messageSchema);
