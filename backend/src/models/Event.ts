import { Schema, model, type InferSchemaType } from "mongoose";

const eventSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    venue: { type: String, required: true , trim: true},
    startsAt: { type: Date, required: true },
    status: {
      type: String,
      enum: ["draft", "published", "cancelled"],
      default: "draft",
    },
    capacity: { type: Number, required: true, min: 1 },
    seatsTaken: { type: Number, required: true, min: 0, default: 0 },
  },
  {
    timestamps: true,
  },
);

export type Event = InferSchemaType<typeof eventSchema>;

export const EventModel = model("Event", eventSchema);
