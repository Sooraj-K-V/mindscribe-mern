import express from "express";
import { getUserJournals, addUserJournals, updateJournal, deleteJournal } from "../controllers/journalController.js";
import { authenticate } from "../middleware/authMiddleware.js"; // Import authentication middleware

const router = express.Router();

// Get journals only for the logged-in user
router.get("/journals", authenticate, getUserJournals);
router.post("/journals", authenticate, addUserJournals)
router.put("/journal/:journalId", authenticate, updateJournal);
router.delete("/journal/:journalId", authenticate, deleteJournal);

export default router;
 