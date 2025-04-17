import mongoose from "mongoose";

const journalSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

export default mongoose.model("Journal", journalSchema);
 