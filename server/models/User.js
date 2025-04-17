import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    journals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Journal" }], // References user's journal entries
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
 