import { Schema, model, type InferSchemaType } from "mongoose";

export const ROLES = ["attendee", "organizer", "admin"] as const;
export type Role = (typeof ROLES)[number];

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ROLES,
      default: "attendee",
    },
  },
  { timestamps: true },
);

userSchema.set("toJSON", {
  transform(_doc, ret) {
    const { passwordHash: _passwordHash, ...safe } = ret;
    return safe;
  },
});

export type User = InferSchemaType<typeof userSchema>;

export const UserModel = model("User", userSchema);
