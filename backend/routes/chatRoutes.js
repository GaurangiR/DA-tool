import express from "express";
import { chatWithData } from "../controllers/chatController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/chat", protect, chatWithData);

export default router;
