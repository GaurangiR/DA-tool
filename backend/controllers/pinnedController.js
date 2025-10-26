import PinnedChart from "../models/PinnedChart.js";

// Get all pinned charts for the authenticated user
export const getPinnedCharts = async (req, res) => {
  try {
    const charts = await PinnedChart.find({ userId: req.user.id });
    res.json(charts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pinned charts" });
  }
};

// Pin a new chart for the authenticated user
export const pinChart = async (req, res) => {
  try {
    const { title, type, data, config, fileName } = req.body;
    const newChart = new PinnedChart({
      userId: req.user.id,
      title,
      type,
      data,
      config,
      fileName,
    });
    await newChart.save();
    res.status(201).json({ message: "Chart pinned", chart: newChart });
  } catch (error) {
    res.status(500).json({ message: "Failed to pin chart" });
  }
};

// Unpin a chart by ID
export const unpinChart = async (req, res) => {
  try {
    await PinnedChart.findByIdAndDelete(req.params.id);
    res.json({ message: "Chart unpinned" });
  } catch (error) {
    res.status(500).json({ message: "Failed to unpin chart" });
  }
};
