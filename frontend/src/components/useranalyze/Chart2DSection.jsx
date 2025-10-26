import { motion } from "framer-motion";
import axios from "axios";
import ChartRenderer from "./ChartRenderer";
import All2DChartsGrid from "./All2DChartsGrid";
import { Download2DChartButton } from "./ChartDownloadButtons";
import "./chartjs-setup";
import { fadeInUp } from "../animations/fadeInUp";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Chart2DSection({
  fileData,
  xAxis,
  yAxis,
  chartType,
  showAll2D,
  setShowAll2D,
  chartRef,
  fadeUp,
}) {
  const { t } = useTranslation();
  const { token } = useSelector((state) => state.auth);

  const handlePinChart = async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/pinned-charts`,
        {
          title: `${chartType} Chart`,
          type: chartType,
          data: fileData,
          config: { xAxis, yAxis },
          fileName: fileData?.fileName || "Unnamed File",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(t("analyze.pinSuccess"));
    } catch (err) {
      console.error(err);
      alert(t("analyze.pinError"));
    }
  };

  return (
    <>
      {fileData && xAxis && yAxis && (
        <motion.div
          custom={0.2}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mt-4"
        >
          <button
            onClick={() => setShowAll2D((prev) => !prev)}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            {showAll2D ? t("analyze.hideAllCharts") : t("analyze.showAllCharts")}
          </button>
        </motion.div>
      )}

      {showAll2D && xAxis && yAxis && (
        <motion.div variants={fadeUp} custom={0.4} className="mt-6">
          <All2DChartsGrid fileData={fileData} xAxis={xAxis} yAxis={yAxis} />
        </motion.div>
      )}

      {chartType !== "none" && xAxis && yAxis && (
        <motion.div variants={fadeUp} custom={0.4}>
          <div
            className="bg-white p-4 sm:p-6 rounded shadow mb-6 overflow-x-auto"
            ref={chartRef}
          >
            <ChartRenderer
              fileData={fileData}
              xAxis={xAxis}
              yAxis={yAxis}
              chartType={chartType}
            />
          </div>
          <div className="flex gap-4">
            <Download2DChartButton chartRef={chartRef} />
            <button
              onClick={handlePinChart}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
            >
              📌 {t("analyze.pinChart")}
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
