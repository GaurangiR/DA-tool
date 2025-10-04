import mongoose from 'mongoose';

const pinnedChartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  type: String,
  config: Object,
  data: Object,
  fileName: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('PinnedChart', pinnedChartSchema);