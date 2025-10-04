import mongoose from "mongoose";

const sharedInsightSchema = new mongoose.Schema({
  shareId: { type: String, required: true, unique: true },
  fileName: { type: String, required: true },
  headers: [String],
  xAxis: String,
  yAxis: String,
  data: [{}],
  insights: [{}],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("SharedInsight", sharedInsightSchema);
