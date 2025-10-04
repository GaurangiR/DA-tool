import express from "express";
import { getTotalUsers, getTotalFiles } from "../controllers/adminController.js";
import { protect, isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/total-users", protect, isAdmin, getTotalUsers);
router.get("/total-files", protect, isAdmin, getTotalFiles);

export default router;
