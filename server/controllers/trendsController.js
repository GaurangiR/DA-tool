import genAI from "../config/geminiClient.js";
import { linearRegression, getTrendDirection } from "../utils/stats.js";

export const detectTrend = async (req, res) => {
  try {
    const { fileData, language } = req.body;

    const languageMap = {
      en: "English",
      hi: "Hindi",
      fr: "French",
      es: "Spanish",
      de: "German",
    };
    const langName = languageMap[language] || "English";

    if (!fileData || !Array.isArray(fileData) || fileData.length === 0) {
      return res.status(400).json({ error: "No file data provided." });
    }

    const sample = fileData[0];

    // Identify numeric and date columns
    const numericKeys = Object.keys(sample).filter(
      (key) => typeof sample[key] === "number"
    );
    const dateKeys = Object.keys(sample).filter(
      (key) =>
        typeof sample[key] === "string" && !isNaN(Date.parse(sample[key]))
    );

    if (numericKeys.length === 0) {
      return res
        .status(400)
        .json({ error: "No numeric columns found for trend detection." });
    }

    const trendCol = numericKeys[0];
    const dateCol = dateKeys[0] || null;

    // Create points for regression
    const points = fileData.map((row, index) => {
      const x = dateCol ? new Date(row[dateCol]).getTime() : index;
      return { x, y: row[trendCol] };
    });

    const x = points.map((p) => p.x);
    const y = points.map((p) => p.y);

    // Fallback regression
    const { slope, intercept, rSquared } = linearRegression(x, y);
    const fallbackTrend = getTrendDirection(slope);

    // Gemini AI prompt
    const prompt = `
You are a data analyst AI. Analyze the following dataset column "${trendCol}" and provide a concise trend summary that a beginner can understand.

Here are 30 sample data points:
${JSON.stringify(points.slice(0, 30))}

Simple regression analysis shows:
- Slope: ${slope.toFixed(2)}
- Intercept: ${intercept.toFixed(2)}
- R-squared: ${rSquared.toFixed(3)}

This indicates a(n) "${fallbackTrend}" trend.

Respond in ${langName}. Format your answer like this:
"The data shows a [increasing/decreasing/stable] trend in ${trendCol} over time."

Use beginner-friendly language and keep it short and clear.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    // Prepare chart data
    const labels = dateCol
      ? fileData.map((row) => row[dateCol])
      : points.map((_, i) => `Row ${i + 1}`);

    const predicted = x.map((xi) => slope * xi + intercept);
    const chart = {
      labels,
      data: y,
      label: trendCol,
      regressionLine: {
        data: predicted,
        label: "Trend Line",
      },
    };

    return res.status(200).json({
      summary,
      chart,
    });
  } catch (err) {
    console.error("Trend detection error:", err.message);
    return res.status(500).json({ error: "Failed to detect trend." });
  }
};
