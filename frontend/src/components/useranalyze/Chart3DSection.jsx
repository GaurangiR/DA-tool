import { motion } from "framer-motion";
import ThreeDChart from "./ThreeDChart";
import ThreeDChartSelector from "./ThreeDChartSelector";
import { Download3DChartButton } from "./ChartDownloadButtons";
import { fadeInUp } from "../animations/fadeInUp";
import { useTranslation } from "react-i18next";

export default function Chart3DSection({
  fileData,
  xAxis,
  yAxis,
  selected3DChartType,
  setSelected3DChartType,
  canvasRef,
  fadeUp,
}) {
  const { t } = useTranslation();

  return (
    <motion.section
      variants={fadeInUp}
      custom={0.2}
      className="mt-6 bg-white shadow-md rounded-lg p-4 space-y-4"
    >
      <h2 className="text-lg font-semibold text-gray-800">
        {t("analyze.chart3DOptions")}
      </h2>

      <ThreeDChartSelector
        selected3DChartType={selected3DChartType}
        setSelected3DChartType={setSelected3DChartType}
      />

      {selected3DChartType !== "none" && xAxis && yAxis && (
        <div>
          <div className="w-full overflow-x-auto">
            <ThreeDChart
              fileData={fileData}
              xAxis={xAxis}
              yAxis={yAxis}
              selected3DChartType={selected3DChartType}
              canvasRef={canvasRef}
            />
          </div>
          <Download3DChartButton canvasRef={canvasRef} />
        </div>
      )}
    </motion.section>
  );
}
