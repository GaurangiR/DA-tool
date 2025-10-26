import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getPinnedCharts,
  pinChart,
  unpinChart,
} from "../controllers/pinnedController.js";

const router = express.Router();

router.get("/", protect, getPinnedCharts);
router.post("/", protect, pinChart);
router.delete("/:id", protect, unpinChart);

export default router;
