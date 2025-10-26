import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { useFilesContext } from "../../context/FileContext";
import { useLocalFile } from "../../context/LocalFileContext";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "../animations/fadeInUp";
import {
  copyToClipboard,
  exportInsightsTxt,
  exportInsightsPdf,
  shareInsights,
  emailShare,
} from "../useraiinsighs/function";
import FileSelector from "../useraiinsighs/FileSelector";
import InsightControls from "../useraiinsighs/InsightControls";
import ExportShareButtons from "../useraiinsighs/ExportShareButtons";
import EmailInput from "../useraiinsighs/EmailInput";
import InsightList from "../useraiinsighs/InsightList";
import ConfirmModal from "../useraiinsighs/ConfirmModal";
import TrendDetection from "../useraiinsighs/TrendDetection";
import { useTranslation } from "react-i18next";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AIInsights = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const { files, selectedFileId, setSelectedFileId, fileData, fetchFiles } =
    useFilesContext();
  const { localFile } = useLocalFile();

  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [chartType, setChartType] = useState("none");
  const [availableColumns, setAvailableColumns] = useState([]);
  const [payload, setPayload] = useState(null);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shareLink, setShareLink] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState("");
  const [shareId, setShareId] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [explainError, setExplainError] = useState(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    const activeFile = selectedFileId === "local" ? localFile : fileData;
    if (activeFile?.data?.length) {
      setAvailableColumns(activeFile.headers);
      setXAxis("");
      setYAxis("");
      setChartType("none");
      setInsights([]);
      setError("");
    } else {
      setAvailableColumns([]);
    }
  }, [fileData, localFile, selectedFileId]);

  useEffect(() => {
    const activeFile = selectedFileId === "local" ? localFile : fileData;
    if (activeFile) {
      setPayload({
        fileId: selectedFileId,
        data: activeFile.data,
        headers: activeFile.headers,
        xAxis,
        yAxis,
        chartType,
        language: i18n.language,
      });
    }
  }, [selectedFileId, fileData, localFile, xAxis, yAxis, chartType]);

  const handleGenerateInsights = () => {
    if (!confirmed) {
      setShowConfirmModal(true);
      return;
    }
    generateInsights();
  };

  const generateInsights = async () => {
    if (!payload) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${BASE_URL}/api/insights`, payload, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      setInsights(res.data);
    } catch {
      setError(t("aiInsights.fetchError", "Failed to fetch insights. Please try again."));
    } finally {
      setLoading(false);
      setConfirmed(false);
    }
  };

  const handleCopy = (text) => copyToClipboard(text);
  const handleExportTxt = () => exportInsightsTxt(insights);
  const handleExportPdf = () => exportInsightsPdf(insights);

  const handleShare = async () => {
    try {
      await shareInsights(
        insights,
        fileData.fileName,
        sessionStorage.getItem("token"),
        setShareLink,
        setShareId
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEmailShare = async () => {
    try {
      await emailShare(email, shareId, sessionStorage.getItem("token"));
      setEmail("");
      setShowEmailInput(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleProceed = () => {
    setConfirmed(true);
    setShowConfirmModal(false);
    handleGenerateInsights();
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
  };

  const handleExplainInsights = async () => {
    if (!insights || insights.length === 0) return;

    setLoadingExplanation(true);
    setExplainError(null);
    setExplanation("");
    try {
      const response = await axios.post(
        `${BASE_URL}/api/explain`,
        {
          type: "insights",
          data: insights,
          fileData: fileData.data,
          language: i18n.language,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setExplanation(response.data.explanation);
    } catch (error) {
      setExplainError(t("aiInsights.explainError", "Failed to generate explanation. Please try again."));
    } finally {
      setLoadingExplanation(false);
    }
  };

  return (
    <motion.div
      key={i18n.language}
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="container mx-auto p-4 max-w-5xl"
    >
      <FileSelector
        files={files}
        localFile={localFile}
        selectedFileId={selectedFileId}
        setSelectedFileId={setSelectedFileId}
      />

      {availableColumns.length > 0 && (
        <InsightControls
          custom={0.2}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          availableColumns={availableColumns}
          xAxis={xAxis}
          yAxis={yAxis}
          setXAxis={setXAxis}
          setYAxis={setYAxis}
          chartType={chartType}
          setChartType={setChartType}
          onGenerate={handleGenerateInsights}
          loading={loading}
        />
      )}

      {availableColumns.length > 0 && (
        <TrendDetection
          selectedFileId={selectedFileId}
          localFile={localFile}
          fileData={fileData}
          availableColumns={availableColumns}
        />
      )}

      {error && <p className="text-red-600 mt-2">{error}</p>}

      {insights.length > 0 && (
        <>
          <ExportShareButtons
            onExportTxt={handleExportTxt}
            onExportPdf={handleExportPdf}
            onShareLink={handleShare}
            onShowEmail={() => setShowEmailInput((prev) => !prev)}
            onExplainInsights={handleExplainInsights}
            loadingExplanation={loadingExplanation}
          />

          {showEmailInput && (
            <EmailInput
              email={email}
              setEmail={setEmail}
              onSend={handleEmailShare}
            />
          )}

          {shareLink && (
            <p className="mt-4 text-green-700 break-all">
              {t("aiInsights.shareLinkLabel", "Share Link:")}{" "}
              <a
                href={shareLink}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                {shareLink}
              </a>
            </p>
          )}

          <InsightList insights={insights} onCopy={handleCopy} />

          {explainError && <p className="text-red-600 mt-2">{explainError}</p>}

          {explanation && (
            <div className="explanation-box mt-4 p-3 border rounded bg-gray-100 text-gray-800 whitespace-pre-wrap">
              <ReactMarkdown>{explanation}</ReactMarkdown>
            </div>
          )}
        </>
      )}

      <AnimatePresence>
        {showConfirmModal && (
          <ConfirmModal
            onCancel={handleCancel}
            onProceed={handleProceed}
            confirmText={t("aiInsights.confirmText", "Are you sure you want to generate insights?")}
            cancelText={t("aiInsights.cancelText", "Cancel")}
            proceedText={t("aiInsights.proceedText", "Proceed")}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AIInsights;
