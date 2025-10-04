import React from "react";
import { motion } from "framer-motion";
import ChartRenderer from "./ChartRenderer";
import { useTranslation } from "react-i18next";

const chartTypes = [
  "bar",
  "line",
  "pie",
  "doughnut",
  "radar",
  "polarArea",
  "scatter",
];

const All2DChartsGrid = ({ fileData, xAxis, yAxis }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
      custom={0.2}
      initial="hidden"
      animate="visible"
    >
      {chartTypes.map((type) => (
        <motion.div
          key={type}
          className="p-4 bg-white rounded shadow"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h3 className="text-center font-semibold mb-2 capitalize">
            {t(`analyze.chartTypes.${type}`)} {t("analyze.chart")}
          </h3>
          <ChartRenderer
            fileData={fileData}
            xAxis={xAxis}
            yAxis={yAxis}
            chartType={type}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default All2DChartsGrid;
