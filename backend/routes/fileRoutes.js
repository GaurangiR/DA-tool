import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";
import { uploadFile, getUserFiles, getSingleFile, deleteFile, downloadFile, } from "../controllers/fileController.js";

const router = express.Router();

router.post("/upload", protect, upload.single("file"), uploadFile);

router.get("/user", protect, getUserFiles);

router.get("/", protect, getUserFiles);

router.get("/:id/download", protect, downloadFile);

router.get("/:id", protect, getSingleFile);

router.delete("/:id", protect, deleteFile);


export default router;
