import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import fileRoutes from "./routes/fileRoutes.js";
import insightsRoutes from "./routes/insightsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import adminUserRoutes from "./routes/adminUserRoutes.js";
import adminFileRoutes from "./routes/adminFileRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import trendsRoutes from "./routes/trendsRoutes.js";
import explainRoutes from "./routes/explainRoutes.js";
import pinnedChartsRoutes from './routes/pinnedCharts.js';
import chartSuggestionsRoutes from './routes/chartSuggestions.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/files", fileRoutes);

app.use("/api/insights", insightsRoutes);

app.use("/api/chat", chatRoutes);

app.use("/api/trends", trendsRoutes);

app.use("/api/explain", explainRoutes);

app.use('/api/pinned-charts', pinnedChartsRoutes);

app.use('/api/chart-type', chartSuggestionsRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/admin/users", adminUserRoutes);

app.use("/api/admin/files", adminFileRoutes);

// Health check route
app.get("/health", (req, res) => {
  console.log("🩺 Health check at:", new Date().toLocaleString());
  res.status(200).send("OK");
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => console.error("MongoDB connection failed:", error));
