import genAI from "../config/geminiClient.js";

export const chatWithData = async (req, res) => {
  try {
    const { question, fileData, language } = req.body;
    const parsedData = typeof fileData === "string" ? JSON.parse(fileData) : fileData;
    const languageMap = {
      en: "English",
      hi: "Hindi",
      fr: "French",
      es: "Spanish",
      de: "German",
    };

    const langName = languageMap[language] || "English";

    if (!question || !fileData) {
      return res.status(400).json({ error: "Missing question or file data" });
    }

    const prompt = `
You are a helpful data analyst. You are given a user's question and a table of data.

Question: ${question}

Data:
${JSON.stringify(parsedData.slice(0, 20))}

Your task is to:
1. Answer the user's question clearly in plain English.
2. Suggest up to 3 charts that would best visualize the data, based on the question and dataset.
   - For each chart, include:
     - Chart type (e.g., bar, line, pie, scatter)
     - Variables to plot (e.g., "Sales vs Date")
     - One sentence on why this chart is useful
3. Provide one bonus data exploration tip to further understand the data.

Respond in Markdown format with clear headers: 
## Answer
... your main response ...

## Suggested Charts
1. ...

## Exploration Tip
... something the user might explore next ...
`;


    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();
    console.log("Received fileData with", fileData.length, "rows");

    return res.status(200).json({ answer: responseText });
  } catch (error) {
    console.error("Gemini chat error:", error);
    return res.status(500).json({ error: "Failed to analyze data" });
  }
};
