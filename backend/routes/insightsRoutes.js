import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getInsights,
  shareInsights,
  getSharedInsight,
  emailSharedInsight,
} from "../controllers/insightsController.js";

const router = express.Router();

router.post("/", protect, getInsights);

router.post("/share", protect, shareInsights);

router.get("/shared/:id", getSharedInsight);

router.post("/email", emailSharedInsight);


export default router;
