import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function connected() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_LINK);
    console.log("Connected to MongoDB: node-journal");
    return true;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    return false;
  }
}

export default connected;
 