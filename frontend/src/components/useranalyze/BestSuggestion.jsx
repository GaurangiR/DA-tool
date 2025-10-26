import { useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function BestSuggestion({ fileData }) {
  const [suggestion, setSuggestion] = useState(null);

  useEffect(() => {
    const fetchSuggestion = async () => {
      if (
        !fileData ||
        !fileData.headers ||
        fileData.headers.length < 2 ||
        !fileData.data ||
        fileData.data.length === 0
      ) {
        setSuggestion(null);
        return;
      }

      const xAxis = fileData.headers[0];
      const yAxis = fileData.headers[1];
      const sampleData = fileData.data.slice(0, 20); // sample for backend

      try {
        const response = await axios.post(`${BASE_URL}/api/chart-type`, {
          headers: fileData.headers,
          xAxis,
          yAxis,
          sampleData,
        });

        setSuggestion({
          suggestedChart: response.data.chartType,
          alternatives: response.data.alternatives,
          xAxis,
          yAxis,
        });
      } catch (error) {
        console.error("Error fetching chart suggestion:", error);
        setSuggestion(null);
      }
    };

    fetchSuggestion();
  }, [fileData]);

  if (!suggestion) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 p-4 rounded mb-6">
      <h2 className="text-blue-800 font-semibold mb-2">📊 Smart Chart Suggestion</h2>
      <p><strong>Suggested Chart:</strong> {suggestion.suggestedChart}</p>
      <p><strong>X-Axis:</strong> {suggestion.xAxis}</p>
      <p><strong>Y-Axis:</strong> {suggestion.yAxis}</p>
      {suggestion.alternatives && suggestion.alternatives.length > 0 && (
        <p><strong>Alternatives:</strong> {suggestion.alternatives.join(", ")}</p>
      )}
    </div>
  );
}
