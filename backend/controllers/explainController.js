import genAI from "../config/geminiClient.js";

export const explainContent = async (req, res) => {
  try {
    const { type, data, fileData, language } = req.body;

    const languageMap = {
      en: "English",
      hi: "Hindi",
      fr: "French",
      es: "Spanish",
      de: "German",
    };

    const langName = languageMap[language] || "English";

    if (!type || !["insights", "trends"].includes(type)) {
      return res.status(400).json({ error: "Invalid or missing 'type'." });
    }

    if (!data) {
      return res.status(400).json({ error: "Missing data to explain." });
    }

    if (!fileData || !Array.isArray(fileData) || fileData.length === 0) {
      return res.status(400).json({ error: "No file data provided." });
    }

    let prompt = "";

    if (type === "insights") {
      prompt = `
You are a helpful assistant explaining data insights to a beginner.
Given these insights extracted from a dataset, explain in simple and clear language what they mean so someone new to data analysis can understand.

Here are the insights:
${JSON.stringify(data, null, 2)}

The dataset has these columns: ${Object.keys(fileData[0]).join(", ")}.

Respond in ${langName}. Make sure your explanation is beginner-friendly and avoids technical jargon.
      `;
    } else if (type === "trends") {
      prompt = `
You are a helpful assistant explaining trend analysis results to someone new to data analysis.

Here is the trend summary:
${data.summary}

The trend analysis was done on these columns: ${Object.keys(fileData[0]).join(
        ", "
      )}.

Explain what this trend means in simple terms a beginner can understand.
Respond in ${langName}. Keep the explanation concise and easy to follow.
      `;
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const explanation = response.text();

    return res.status(200).json({ explanation });
  } catch (error) {
    console.error("Explain content error:", error.message);
    return res.status(500).json({ error: "Failed to generate explanation." });
  }
};
