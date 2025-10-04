import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  exportInsightsPdf,
  exportInsightsTxt,
} from "../useraiinsighs/function";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import * as XLSX from "xlsx";
import { useFilesContext } from "../../context/FileContext";
import { useLocalFile } from "../../context/LocalFileContext";
import { useTranslation } from "react-i18next";
import ChartRenderer from "../useranalyze/ChartRenderer";
import { fadeInUp } from "../animations/fadeInUp";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ChatWithFile = () => {
  const {
    files,
    selectedFileId,
    setSelectedFileId,
    fileData,
    fetchFiles,
  } = useFilesContext();
  const { localFile, setLocalFile } = useLocalFile();
  const activeFile = selectedFileId === "local" ? localFile : fileData;
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { t, i18n } = useTranslation();

  const answerSection = answer.match(/## Answer([\s\S]*?)##/i)?.[1]?.trim();
  const chartsSection = answer.match(/## Suggested Charts([\s\S]*?)##/i)?.[1]?.trim();
  const tipSection = answer.match(/## Exploration Tip([\s\S]*)/i)?.[1]?.trim();

  const extractChartSuggestions = (chartsText) => {
    const chartRegex =
      /\d+\.\s*Chart type:\s*(.+?)\s*[\n\r]+Variables to plot:\s*(.+?)\s*[\n\r]+.*?:\s*(.+)/gi;
    const matches = [...chartsText.matchAll(chartRegex)];
    return matches.map(([, type, variables, reason]) => {
      const [y, x] = variables.split(" vs ").map((v) => v.trim());
      return {
        chartType: type.toLowerCase(),
        xAxis: x,
        yAxis: y,
        reason,
      };
    });
  };

  const chartSuggestions = chartsSection ? extractChartSuggestions(chartsSection) : [];

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    setQuestion("");
    setAnswer("");
    setError("");
  }, [selectedFileId]);

  const isLocal = selectedFileId === "local";
  const activeData = isLocal ? localFile : fileData;

  const handleLocalFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

        if (jsonData.length === 0) {
          setError("Selected file is empty or invalid.");
          return;
        }

        const parsed = {
          data: jsonData,
          headers: Object.keys(jsonData[0]),
          fileName: file.name,
        };

        setLocalFile(parsed);
        setSelectedFileId("local");
        setError("");
      } catch (err) {
        setError("Failed to parse the Excel file.");
      }
    };

    reader.onerror = () => setError("Failed to read the file.");
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async () => {
    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    if (!activeData || !activeData.data || activeData.data.length === 0) {
      setError("No data to analyze. Please select or upload a valid file.");
      return;
    }

    setLoading(true);
    setAnswer("");
    setError("");

    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.post(
        `${BASE_URL}/api/chat/chat`,
        {
          question: question.trim(),
          fileData: activeData.data.slice(0, 100),
          language: i18n.language,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAnswer(res.data.answer);
    } catch (err) {
      setError("Failed to get a response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getInsightsArray = (answerText) => [
    {
      type: "AI Response",
      text: answerText,
    },
  ];

  return (
<motion.div
  key={i18n.language}
  initial="hidden"
  animate="visible"
  variants={fadeInUp}
  className="max-w-5xl mx-auto px-4 sm:px-8 py-8 text-gray-800"
>
      <h1 className="text-3xl font-bold mb-8">{t("chatWithFile.title")}</h1>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            {t("chatWithFile.selectOrUpload")}
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            value={selectedFileId}
            onChange={(e) => setSelectedFileId(e.target.value)}
          >
            <option value="">{t("chatWithFile.chooseFile")}</option>
            {localFile?.data && (
              <option value="local">
                (Local) {localFile.fileName || "Unnamed Local File"}
              </option>
            )}
            {files.map((file) => (
              <option key={file._id} value={file._id}>
                {file.fileName || "Unnamed File"}
              </option>
            ))}
          </select>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleLocalFileChange}
            className="mt-3 block w-full text-sm text-gray-500 file:cursor-pointer
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {t("chatWithFile.askQuestion")}
          </label>
          <textarea
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={t("chatWithFile.placeholder")}
            disabled={!activeData?.data?.length}
          />
        </div>

        {error && <p className="text-red-600">{t(error)}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading || !question.trim() || !activeData?.data?.length}
          className={`w-full py-3 px-6 text-white font-semibold rounded-md transition-colors cursor-pointer ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              {t("chatWithFile.thinking")}
            </div>
          ) : (
            t("chatWithFile.ask")
          )}
        </button>

        {answer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-6 bg-white border border-gray-200 rounded-md shadow-md mt-4"
          >
            <h2 className="text-2xl font-semibold mb-4 text-blue-800 flex items-center gap-2">
              🤖 AI Response
            </h2>

            <div className="text-gray-700 leading-relaxed space-y-4">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-3">{children}</p>,
                  h2: ({ children }) => (
                    <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">
                      {children}
                    </h2>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-3">{children}</ul>
                  ),
                  li: ({ children }) => <li className="mb-1">{children}</li>,
                  code: ({ children }) => (
                    <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-sm">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-gray-900 text-white p-4 rounded-md text-sm overflow-auto">
                      {children}
                    </pre>
                  ),
                }}
              >
                {answer}
              </ReactMarkdown>
            </div>

            {chartSuggestions.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-3 text-blue-700">
                  📊 Suggested Charts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {chartSuggestions.map((chart, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-xl shadow-sm bg-blue-50"
                    >
                      <p className="mb-2 text-sm text-gray-600">
                        <strong>{chart.chartType.toUpperCase()}</strong>:{" "}
                        {chart.reason}
                      </p>
                      <ChartRenderer
                        fileData={activeData}
                        xAxis={chart.xAxis}
                        yAxis={chart.yAxis}
                        chartType={chart.chartType}
                        isSmall={true}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tipSection && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-3 text-blue-700">
                  💡 Exploration Tip
                </h2>
                <p className="text-gray-700">{tipSection}</p>
              </div>
            )}

            <div className="mt-6 flex gap-4 flex-wrap">
              <button
                onClick={() =>
                  exportInsightsPdf(getInsightsArray(answer), "chat_response.pdf")
                }
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
              >
                📄 Download PDF
              </button>
              <button
                onClick={() =>
                  exportInsightsTxt(getInsightsArray(answer), "chat_response.txt")
                }
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 cursor-pointer"
              >
                📝 Download TXT
              </button>
            </div>
          </motion.div>
        )}
      </div>
</motion.div>
  );
};

export default ChatWithFile;
