import mongoose from "mongoose";

const fileUploadSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    headers: [String],
    data: [
      {
        type: Object,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("FileUpload", fileUploadSchema);
