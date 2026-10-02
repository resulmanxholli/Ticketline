import { Schema, model, type InferSchemaType } from "mongoose";

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
      enum: ["attendee", "organizer"],
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
