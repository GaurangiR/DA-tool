import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useFilesContext } from "../../context/FileContext";
import { useLocalFile } from "../../context/LocalFileContext";
import { fadeInUp } from "../animations/fadeInUp";
import { useTranslation } from "react-i18next";

import FileAndAxisSelectors from "../useranalyze/FileAndAxisSelectors";
import SaveToDashboardButton from "../useranalyze/SaveToDashboardButton";
import Chart2DSection from "../useranalyze/Chart2DSection";
import Chart3DSection from "../useranalyze/Chart3DSection";
import BestSuggestion from "../useranalyze/BestSuggestion";

function Analyze() {
  const { t, i18n } = useTranslation();
  const { token } = useSelector((state) => state.auth);
  const {
    files,
    selectedFileId,
    setSelectedFileId,
    fileData,
    setFileData,
    fetchFiles,
  } = useFilesContext();

  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [chartType, setChartType] = useState("none");
  const [selected3DChartType, setSelected3DChartType] = useState("none");
  const chartRef = useRef();
  const canvasRef = useRef(null);
  const { localFile } = useLocalFile();
  const [isSaved, setIsSaved] = useState(false);
  const isLocalFile = selectedFileId === "local";
  const [showAll2D, setShowAll2D] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    if (localFile) {
      setFileData(localFile);
      setSelectedFileId("local");
      setXAxis("");
      setYAxis("");
      setChartType("none");
      setSelected3DChartType("none");
      setIsSaved(false);
    }
  }, [localFile]);

  useEffect(() => {
    if (!selectedFileId) {
      setFileData(null);
      setXAxis("");
      setYAxis("");
      setChartType("none");
      setSelected3DChartType("none");
    }
  }, [selectedFileId]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isLocalFile) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isLocalFile]);

  return (
    <motion.div
      key={i18n.language}
      className="p-4 sm:p-6 lg:p-10"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <motion.h1
        className="text-2xl font-bold mb-6 text-[#2E3C43]"
        custom={0.1}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        {t("analyze.title")}
      </motion.h1>

      <FileAndAxisSelectors
        files={files}
        selectedFileId={selectedFileId}
        setSelectedFileId={setSelectedFileId}
        localFile={localFile}
        fileData={fileData}
        xAxis={xAxis}
        yAxis={yAxis}
        setXAxis={setXAxis}
        setYAxis={setYAxis}
        chartType={chartType}
        setChartType={setChartType}
        fadeUp={fadeInUp}
      />

      {selectedFileId === "local" && (
        <motion.div variants={fadeInUp} custom={0.4}>
          <SaveToDashboardButton
            localFile={localFile}
            setFileData={setFileData}
            setSelectedFileId={setSelectedFileId}
            fetchFiles={fetchFiles}
            isSaved={isSaved}
            setIsSaved={setIsSaved}
          />
        </motion.div>
      )}

      {fileData && (
        <>
          <BestSuggestion fileData={fileData} />

          <Chart2DSection
            fileData={fileData}
            xAxis={xAxis}
            yAxis={yAxis}
            chartType={chartType}
            showAll2D={showAll2D}
            setShowAll2D={setShowAll2D}
            chartRef={chartRef}
            fadeUp={fadeInUp}
          />

          <Chart3DSection
            fileData={fileData}
            xAxis={xAxis}
            yAxis={yAxis}
            selected3DChartType={selected3DChartType}
            setSelected3DChartType={setSelected3DChartType}
            canvasRef={canvasRef}
            fadeUp={fadeInUp}
          />
        </>
      )}
    </motion.div>
  );
}

export default Analyze;
