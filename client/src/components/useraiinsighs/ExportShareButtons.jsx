import { motion } from "framer-motion";
import { fadeInUp } from "../animations/fadeInUp";
import { useTranslation } from "react-i18next";

const ExportShareButtons = ({
  onExportTxt,
  onExportPdf,
  onShareLink,
  onShowEmail,
  onExplainInsights,
  loadingExplanation,
}) => {
  const { t } = useTranslation();

  return (
    <div className="mt-6 flex flex-wrap gap-4 animate-fade-in-up">
      <motion.button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        custom={0.2}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        onClick={onExportTxt}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {t("aiInsights.exportShare.exportTxt")}
      </motion.button>
      <motion.button
        className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
        custom={0.3}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        onClick={onExportPdf}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {t("aiInsights.exportShare.exportPdf")}
      </motion.button>
      <motion.button
        className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
        custom={0.4}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        onClick={onShareLink}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {t("aiInsights.exportShare.shareLink")}
      </motion.button>
      <motion.button
        className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition"
        custom={0.5}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        onClick={onShowEmail}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {t("aiInsights.exportShare.emailLink")}
      </motion.button>
      <motion.button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
        custom={0.6}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        onClick={onExplainInsights}
        disabled={loadingExplanation}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {loadingExplanation
          ? t("aiInsights.exportShare.explaining")
          : t("aiInsights.exportShare.explainInsights")}
      </motion.button>
    </div>
  );
};

export default ExportShareButtons;
