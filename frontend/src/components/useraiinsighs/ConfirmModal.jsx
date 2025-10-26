import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const ConfirmModal = ({ onCancel, onProceed }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="fixed inset-0 backdrop-blur-md z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-lg font-semibold mb-4 text-red-600">
          ⚠️ {t("aiInsights.dataPrivacyWarning.title")}
        </h2>
        <p className="text-gray-700 mb-4">{t("aiInsights.dataPrivacyWarning.message")}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            {t("aiInsights.buttons.cancel")}
          </button>
          <button
            onClick={onProceed}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            {t("aiInsights.buttons.proceed")}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConfirmModal;
