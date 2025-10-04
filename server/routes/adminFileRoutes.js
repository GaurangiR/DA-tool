// server/routes/adminFileRoutes.js
import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import {
  listFilesAdmin,
  getFileAdmin,
  deleteFileAdmin,
} from "../controllers/adminFileController.js";

const router = express.Router();

router.use(protect, isAdmin);

router.get("/", listFilesAdmin);
router.get("/:id", getFileAdmin);
router.delete("/:id", deleteFileAdmin);

export default router;
