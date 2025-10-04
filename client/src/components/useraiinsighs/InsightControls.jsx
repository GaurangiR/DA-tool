import AxisSelector from "../useranalyze/AxisSelector";
import ChartTypeSelector from "../useranalyze/ChartTypeSelector";
import { motion } from "framer-motion";
import { fadeInUp } from "../animations/fadeInUp";
import { useTranslation } from "react-i18next";

const InsightControls = ({
  availableColumns,
  xAxis,
  yAxis,
  setXAxis,
  setYAxis,
  chartType,
  setChartType,
  onGenerate,
  loading,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <AxisSelector
        custom={0.2}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        headers={availableColumns}
        xAxis={xAxis}
        yAxis={yAxis}
        setXAxis={setXAxis}
        setYAxis={setYAxis}
      />
      <ChartTypeSelector
        custom={0.4}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        chartType={chartType}
        setChartType={setChartType}
      />
      <motion.button
        custom={0.6}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        onClick={onGenerate}
        disabled={!xAxis || !yAxis}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition duration-300"
      >
        {loading ? t("aiInsights.insightControls.generating") : t("aiInsights.insightControls.generate")}
      </motion.button>
    </div>
  );
};

export default InsightControls;
