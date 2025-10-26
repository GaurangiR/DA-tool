import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { explainContent } from "../controllers/explainController.js";

const router = express.Router();

router.post("/", protect, explainContent);

export default router;
