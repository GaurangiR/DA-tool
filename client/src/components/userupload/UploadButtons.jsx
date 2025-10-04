import { motion } from "framer-motion";
import { fadeInUp } from "../animations/fadeInUp";
import { useTranslation } from "react-i18next";

function UploadButtons({ onAnalyze, onUpload }) {
  const { t } = useTranslation();

  return (
    <motion.div
      custom={0.2}
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="flex gap-2 mt-4"
    >
      <button
        onClick={onAnalyze}
        className="w-full bg-[#007ea7] text-white py-2 rounded-xl shadow-md hover:bg-[#009dc4] transition duration-200"
      >
        {t("upload.analyzeWithoutSaving")}
      </button>
      <button
        onClick={onUpload}
        className="w-full bg-green-600 text-white py-2 rounded-xl shadow-md hover:bg-green-700 transition duration-200"
      >
        {t("upload.uploadToServer")}
      </button>
    </motion.div>
  );
}

export default UploadButtons;
