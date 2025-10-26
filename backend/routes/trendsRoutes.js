import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { detectTrend } from "../controllers/trendsController.js";

const router = express.Router();

// POST /api/trends
router.post("/", protect, detectTrend);

export default router;
