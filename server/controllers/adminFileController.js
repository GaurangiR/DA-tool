// server/controllers/adminFileController.js
import FileUpload from "../models/FileUpload.js";
import User from "../models/User.js";

// GET /api/admin/files
export const listFilesAdmin = async (req, res) => {
  try {
    const files = await FileUpload
      .find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch files", error: err.message });
  }
};

// GET /api/admin/files/:id
export const getFileAdmin = async (req, res) => {
  try {
    const file = await FileUpload
      .findById(req.params.id)
      .populate("user", "name email");
    if (!file) return res.status(404).json({ message: "File not found" });
    res.json(file);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch file", error: err.message });
  }
};

// DELETE /api/admin/files/:id
export const deleteFileAdmin = async (req, res) => {
  try {
    const file = await FileUpload.findByIdAndDelete(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });
    res.json({ message: "File deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete file", error: err.message });
  }
};
