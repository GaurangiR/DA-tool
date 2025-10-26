import genAI from '../config/geminiClient.js';
import { detectDataType, suggestChart } from '../utils/chartUtils.js';

export const suggestChartType = async (req, res) => {
  try {
    const { headers, xAxis, yAxis, sampleData, language } = req.body;

    if (!headers || !xAxis || !yAxis || !sampleData) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const languageMap = {
      en: "English",
      hi: "Hindi",
      fr: "French",
      es: "Spanish",
      de: "German",
    };
    const langName = languageMap[language] || "English";

    // Build Gemini prompt
    const prompt = `
You are a data visualization expert.

Your task is to analyze the dataset sample below and recommend:
1. The most appropriate column for the X-axis
2. The most appropriate column for the Y-axis
3. The best chart type to visualize this relationship

Please respond in ${langName} using ONLY the following JSON format:
{
  "xAxis": "column_name",
  "yAxis": "column_name",
  "chartType": "chart_type_name"
}

Here is a sample of the dataset (first 20 rows):
${JSON.stringify(sampleData.slice(0, 20), null, 2)}

Available headers: ${headers.join(', ')}

Avoid any explanation — just output valid JSON.
`;

    // Use Gemini to generate chart suggestion
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();

      // Try to extract the JSON object from response
      const match = responseText.match(/\{[\s\S]*\}/);
      if (match) {
        const suggestion = JSON.parse(match[0]);
        if (suggestion.xAxis && suggestion.yAxis && suggestion.chartType) {
          return res.json({
            ...suggestion,
            source: "gemini",
          });
        }
      }

      console.warn("Gemini response malformed. Falling back to manual method.");
    } catch (geminiError) {
      console.warn("Gemini suggestion failed:", geminiError.message);
    }

    // Fallback using traditional logic
    const xType = detectDataType(sampleData, xAxis);
    const yType = detectDataType(sampleData, yAxis);
    const fallbackSuggestion = suggestChart(xType, yType);

    return res.json({
      xAxis,
      yAxis,
      chartType: fallbackSuggestion.chartType,
      source: "fallback",
    });

  } catch (error) {
    console.error('Chart suggestion error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
