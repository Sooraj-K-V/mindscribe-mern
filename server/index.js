import express from "express";
import dotenv from "dotenv";
import connected from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import journalRoutes from "./routes/journalRoutes.js";
import emailRoutes from "./routes/emailRoutes.js"

const app = express();

dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // Parses form data

const corsOptions = {
  origin: 'http://localhost:5173',  // Allow only requests from your React app
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow specific HTTP methods
  credentials: true,  // Allow credentials (cookies, headers) to be sent
};

app.use(cors(corsOptions));  // Apply CORS configuration

app.get("/", (re, res) => {
  res.json({ name: "Sooraj" });
});

//routes
app.use("/api/user", userRoutes);
app.use("/api/user", journalRoutes);
app.use("/api/auth", authRoutes);

//mail route
app.use("/api/email", emailRoutes)

async function startServer() {
  const isConnected = await connected(); // Await the database connection result

  if (!isConnected) {
    console.log("DB connection error! Server not starting.");
    return;
  } else console.log("Connected to db");

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}
startServer();
