import User from "../models/User.js";
import FileUpload from "../models/FileUpload.js";

export const getTotalUsers = async (req, res) => {
    try {
        const count = await User.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: "Error fetching total users", error });
    }
};

export const getTotalFiles = async (req, res) => {
    try {
        const count = await FileUpload.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: "Error fetching total files", error });
    }
};
