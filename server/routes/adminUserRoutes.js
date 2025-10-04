import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import {
  listUsers,
  updateUser,
  deleteUser,
} from "../controllers/adminUserController.js";

const router = express.Router();

router.use(protect, isAdmin);

router.get("/", listUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
