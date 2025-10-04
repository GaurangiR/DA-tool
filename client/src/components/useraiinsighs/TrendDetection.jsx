import React, { useState, useRef } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { exportInsightsPdf, exportInsightsTxt } from "./function";
import ReactMarkdown from "react-markdown";
import { useTranslation } from "react-i18next";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TrendDetection = ({
  selectedFileId,
  localFile,
  fileData,
  availableColumns,
}) => {
  const { t } = useTranslation();
  const [trendColumn, setTrendColumn] = useState("");
  const [dateColumn, setDateColumn] = useState("");
  const [trendResult, setTrendResult] = useState(null);
  const [trendLoading, setTrendLoading] = useState(false);
  const [trendError, setTrendError] = useState(null);
  const chartRef = useRef(null);
  const [explanation, setExplanation] = useState("");
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [explainError, setExplainError] = useState(null);
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const handleDetectTrend = async () => {
    if (!trendColumn) return;
    setTrendLoading(true);
    setTrendError(null);
    setTrendResult(null);
    try {
      const activeFile = selectedFileId === "local" ? localFile : fileData;
      const response = await axios.post(
        `${BASE_URL}/api/trends`,
        { fileData: activeFile.data, language: i18n.language },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setTrendResult(response.data);
    } catch {
      setTrendError(t("aiInsights.trendDetection.errorDetect"));
    } finally {
      setTrendLoading(false);
    }
  };

  const handleExplainTrend = async () => {
    if (!trendResult) return;
    setLoadingExplanation(true);
    setExplainError(null);
    setExplanation("");
    try {
      const response = await axios.post(
        `${BASE_URL}/api/explain`,
        {
          type: "trends",
          data: trendResult,
          fileData: fileData?.data,
          language: i18n.language,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setExplanation(response.data.explanation);
    } catch {
      setExplainError(t("aiInsights.trendDetection.errorExplain"));
    } finally {
      setLoadingExplanation(false);
    }
  };

  const handleExportPdf = () => {
    if (!trendResult) return;
    const chartInstance = chartRef.current;
    let imageDataUrl = null;
    if (chartInstance) {
      imageDataUrl = chartInstance.toBase64Image();
    }
    exportInsightsPdf(
      trendInsightsForExport,
      "trend-summary.pdf",
      imageDataUrl
    );
  };

  const trendInsightsForExport = trendResult
    ? [{ type: "Trend Summary", text: trendResult.summary }]
    : [];

  return (
    <div className="trend-detection-section mt-6 p-4 border rounded shadow bg-gray-50">
      <h3 className="text-blue-800 font-semibold mb-2">
        {t("aiInsights.trendDetection.title")}
      </h3>

      <div className="flex flex-wrap gap-4 items-center mb-4">
        <select
          className="p-2 border rounded"
          value={trendColumn}
          onChange={(e) => setTrendColumn(e.target.value)}
        >
          <option value="">
            {t("aiInsights.trendDetection.selectNumeric")}
          </option>
          {availableColumns
            .filter((col) => {
              const val =
                localFile?.data?.[0]?.[col] || fileData?.data?.[0]?.[col];
              return typeof val === "number";
            })
            .map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
        </select>

        <select
          className="p-2 border rounded"
          value={dateColumn}
          onChange={(e) => setDateColumn(e.target.value)}
        >
          <option value="">{t("aiInsights.trendDetection.selectDate")}</option>
          {availableColumns
            .filter((col) => {
              const val =
                localFile?.data?.[0]?.[col] || fileData?.data?.[0]?.[col];
              return typeof val === "string" && !isNaN(Date.parse(val));
            })
            .map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
        </select>

        <button
          onClick={handleDetectTrend}
          disabled={!trendColumn || trendLoading}
          className="ml-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {trendLoading
            ? t("aiInsights.trendDetection.detecting")
            : t("aiInsights.trendDetection.detectBtn")}
        </button>
      </div>

      {trendError && (
        <p className="text-red-600 font-semibold mb-2">{trendError}</p>
      )}

      {trendResult && (
        <div className="trend-result mt-4">
          <h4 className="font-semibold mb-2 text-gray-800">
            {t("aiInsights.trendDetection.summary")}
          </h4>
          <p className="mb-4 whitespace-pre-wrap">{trendResult.summary}</p>

          <Line
            ref={chartRef}
            data={{
              labels: trendResult.chart.labels,
              datasets: [
                {
                  label: trendResult.chart.label,
                  data: trendResult.chart.data,
                  borderColor: "rgba(75, 192, 192, 1)",
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                  fill: true,
                  tension: 0.3,
                },
                {
                  label: trendResult.chart.regressionLine.label,
                  data: trendResult.chart.regressionLine.data,
                  borderColor: "rgba(255, 99, 132, 1)",
                  borderDash: [5, 5],
                  borderWidth: 2,
                  fill: false,
                  tension: 0.3,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: true },
              },
            }}
          />

          <div className="mt-4 flex gap-4">
            <button
              onClick={handleExportPdf}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {t("aiInsights.trendDetection.downloadPdf")}
            </button>

            <button
              onClick={() =>
                exportInsightsTxt(trendInsightsForExport, "trend-summary.txt")
              }
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              {t("aiInsights.trendDetection.downloadTxt")}
            </button>

            <button
              onClick={handleExplainTrend}
              disabled={loadingExplanation}
              className="ml-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
            >
              {loadingExplanation
                ? t("aiInsights.trendDetection.explaining")
                : t("aiInsights.trendDetection.explain")}
            </button>
          </div>

          {explainError && <p className="text-red-600 mt-2">{explainError}</p>}

          {explanation && (
            <div className="explanation-box mt-4 p-3 border rounded bg-gray-100 text-gray-800 whitespace-pre-wrap">
              <ReactMarkdown>{explanation}</ReactMarkdown>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrendDetection;
