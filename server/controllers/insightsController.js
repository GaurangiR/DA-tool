import { v4 as uuidv4 } from "uuid";
import SharedInsight from "../models/SharedInsight.js";
import genAI from "../config/geminiClient.js";
import sendEmail from "../utils/sendEmail.js";

// POST /api/insights
export const getInsights = async (req, res) => {
  try {
    const { fileName, headers, xAxis, yAxis, data, language } = req.body;
    const languageMap = {
      en: "English",
      hi: "Hindi",
      fr: "French",
      es: "Spanish",
      de: "German",
    };
    const langName = languageMap[language] || "English";

    const userPrompt = `
You are a highly skilled data analyst.
Analyze the dataset titled "${fileName}" with X-axis "${xAxis}" and Y-axis "${yAxis}". Here is the data:
${JSON.stringify(data, null, 2)}

Perform the following tasks:
1. Identify and summarize any clear patterns or trends in the relationship between "${xAxis}" and "${yAxis}".
2. Detect and describe any anomalies or outliers that significantly deviate from the pattern.
3. Provide a concise and practical actionable insight based on the observed trend and data behavior.

Return your response strictly as a JSON array with objects in this format:
[
  { "type": "Trend", "text": "<summary of the observed trend>" },
  { "type": "Anomaly", "text": "<description of any anomalies or outliers>" },
  { "type": "Actionable Insight", "text": "<concise recommendation or action>" }
]

Important: Respond in ${langName}.
`;

    // Generate text with Gemini 2.0 Flash
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(userPrompt);
    let reply = result.response.text();

    // Strip any markdown fences
    reply = reply.replace(/```json|```/g, "").trim();

    // Parse JSON
    let insights = JSON.parse(reply);

    res.status(200).json(insights);
  } catch (err) {
    console.error("AI Insights error:", err);
    res
      .status(500)
      .json({ message: "Failed to generate insights", error: err.message });
  }
};

// POST /api/insights/share
export const shareInsights = async (req, res) => {
  try {
    const { fileName, headers, xAxis, yAxis, data, insights } = req.body;
    const shareId = uuidv4();

    const shared = new SharedInsight({
      shareId,
      fileName,
      headers,
      xAxis,
      yAxis,
      data,
      insights,
    });
    await shared.save();

    const url = `${process.env.CLIENT_URL}/shared/${shareId}`;
    res.status(201).json({ url });
  } catch (error) {
    console.error("Error sharing insight:", error);
    res.status(500).json({ error: "Failed to create shareable link" });
  }
};

export const getSharedInsight = async (req, res) => {
  try {
    const shared = await SharedInsight.findOne({ shareId: req.params.id });
    if (!shared) {
      return res.status(404).json({ error: "Insight not found" });
    }
    res.json(shared);
  } catch (error) {
    console.error("Error fetching shared insight:", error);
    res.status(500).json({ error: "Failed to retrieve shared insight" });
  }
};

export const emailSharedInsight = async (req, res) => {
  try {
    const { email, shareId } = req.body;

    const shared = await SharedInsight.findOne({ shareId });
    if (!shared) {
      return res.status(404).json({ error: "Insight not found" });
    }

    const link = `${process.env.CLIENT_URL}/shared/${shareId}`;

    const formattedInsightsText = shared.insights
      .map((insight) => `• ${insight.type}: ${insight.text}`)
      .join("\n");

    const formattedInsightsHtml = shared.insights
      .map(
        (insight) =>
          `<li><strong>${insight.type}:</strong> ${insight.text}</li>`
      )
      .join("");

    const textMessage = `Hi,

Someone shared AI-generated insights with you via SheetSense.

File: ${shared.fileName}
View Online: ${link}

Here are the insights:
${formattedInsightsText}

Best regards,
SheetSense Team

You received this email because someone used SheetSense to share insights with you.`;

    const htmlMessage = `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <p>Hi,</p>
        <p>Someone shared AI-generated insights with you via <strong>SheetSense</strong>.</p>
        <p>
          <strong>File:</strong> ${shared.fileName}<br>
          <strong>View Online:</strong> <a href="${link}" target="_blank">${link}</a>
        </p>
        <p><strong>Here are the insights:</strong></p>
        <ul>
          ${formattedInsightsHtml}
        </ul>
        <p>Best regards,<br>SheetSense Team</p>
        <hr>
        <small>You received this email because someone used SheetSense to share insights with you.</small>
      </div>
    `;

    await sendEmail({
      to: email,
      subject: "AI Insights Shared with You via SheetSense",
      text: textMessage,
      html: htmlMessage,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Error sending email:", err.message, err.stack);
    res.status(500).json({ error: "Failed to send email" });
  }
};
