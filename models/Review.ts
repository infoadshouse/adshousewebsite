import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const reviewSchema = new Schema(
  {
    collaborationId: { type: Schema.Types.ObjectId, ref: "Collaboration", required: true, index: true },
    fromUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    toUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fromRole: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, default: "" },
  },
  { timestamps: true },
);

reviewSchema.index({ collaborationId: 1, fromUserId: 1 }, { unique: true });

export type ReviewDoc = InferSchemaType<typeof reviewSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Review: Model<ReviewDoc> =
  (mongoose.models.Review as Model<ReviewDoc>) ||
  mongoose.model<ReviewDoc>("Review", reviewSchema);
