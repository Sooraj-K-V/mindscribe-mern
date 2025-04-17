import express from "express"
import { authenticate } from "../middleware/authMiddleware.js"

const router = express.Router();

router.get("/protected", authenticate, (req, res) => {
    res.json({
        message: "This is a protected route",
        user: req.user, // assuming `req.user` is set in your middleware
    });
});

export default router;